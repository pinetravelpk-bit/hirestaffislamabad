// Online CV pages: accounts, password hashing, sessions and file storage.
// Data lives OUTSIDE the release folder (releases are replaced on every deploy):
//   CV_DATA_DIR env  →  /var/lib/hirestaffislamabad/cv (production)  →  ./.data/cv (dev)
import {promises as fs,mkdirSync,readFileSync,writeFileSync,existsSync} from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {cookies,headers} from 'next/headers';
import {restoreCV,type CV} from '../app/builders/model';

export type Account={username:string;hash:string;salt:string;createdAt:string;updatedAt:string;published:boolean;views:number;cv:CV};
export type PublicAccount=Omit<Account,'hash'|'salt'>;

const DIR=process.env.CV_DATA_DIR||(process.env.NODE_ENV==='production'?'/var/lib/hirestaffislamabad/cv':path.join(process.cwd(),'.data','cv'));
const USERS=path.join(DIR,'users');
export const COOKIE='hs_cv_session';
const SESSION_DAYS=30;

function ensureDir(){mkdirSync(USERS,{recursive:true,mode:0o700})}
function secret():string{
  if(process.env.CV_SESSION_SECRET&&process.env.CV_SESSION_SECRET.length>=32)return process.env.CV_SESSION_SECRET;
  ensureDir();const f=path.join(DIR,'.secret');
  if(existsSync(f))return readFileSync(f,'utf8').trim();
  const s=crypto.randomBytes(48).toString('hex');writeFileSync(f,s,{mode:0o600});return s;
}

/* ---------- usernames ---------- */
const RESERVED=new Set(['admin','administrator','api','app','cv','p','login','logout','account','accounts','dashboard','settings','support','help','hirestaff','hirestaffislamabad','root','system','null','undefined','www','mail','jobs','job','company','companies','about','contact','privacy','terms','static','next','_next']);
export const USERNAME_RE=/^[a-z0-9](?:[a-z0-9-]{1,28})[a-z0-9]$/;
export function validUsername(u:string){return USERNAME_RE.test(u)&&!u.includes('--')&&!RESERVED.has(u)}
export function slugify(s:string){return s.normalize('NFKD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'').slice(0,24).replace(/-+$/,'')}
const file=(u:string)=>{if(!validUsername(u))throw new Error('bad username');return path.join(USERS,u+'.json')};

export async function suggestUsername(base:string){
  ensureDir();let b=slugify(base);if(b.length<3)b=(b+'-cv').replace(/^-/,'');if(b.length<3||!validUsername(b))b='cv-'+crypto.randomInt(1000,9999);
  if(!existsSync(file(b)))return b;
  for(let i=2;i<200;i++){const c=`${b.slice(0,26)}-${i}`;if(validUsername(c)&&!existsSync(file(c)))return c}
  return `${b.slice(0,20)}-${crypto.randomInt(10000,99999)}`;
}

/* ---------- passwords ---------- */
export function generatePassword(){const a='abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';let s='';for(let i=0;i<10;i++)s+=a[crypto.randomInt(a.length)];return s}
function hashPassword(pw:string,salt=crypto.randomBytes(16).toString('hex')){return {salt,hash:crypto.scryptSync(pw,salt,64,{N:16384,r:8,p:1}).toString('hex')}}
function checkPassword(pw:string,a:Account){const h=Buffer.from(hashPassword(pw,a.salt).hash,'hex'),s=Buffer.from(a.hash,'hex');return h.length===s.length&&crypto.timingSafeEqual(h,s)}
export const passwordProblem=(pw:unknown)=>typeof pw!=='string'||pw.length<8?'Password must be at least 8 characters.':pw.length>200?'Password is too long.':'';

/* ---------- storage ---------- */
export async function readAccount(u:string):Promise<Account|null>{
  if(!validUsername(u))return null;
  try{const a=JSON.parse(await fs.readFile(file(u),'utf8')) as Account;a.cv=restoreCV(a.cv);return a}catch{return null}
}
async function write(a:Account){ensureDir();const f=file(a.username),tmp=f+'.'+crypto.randomBytes(4).toString('hex')+'.tmp';await fs.writeFile(tmp,JSON.stringify(a),{mode:0o600});await fs.rename(tmp,f)}
export const toPublic=({hash:_h,salt:_s,...rest}:Account):PublicAccount=>rest;

export async function createAccount(username:string,password:string,cv:CV){
  ensureDir();const {hash,salt}=hashPassword(password),now=new Date().toISOString();
  const a:Account={username,hash,salt,createdAt:now,updatedAt:now,published:true,views:0,cv:restoreCV(cv)};
  // 'wx' fails if the username was taken in the meantime
  const f=file(username);await fs.writeFile(f,JSON.stringify(a),{mode:0o600,flag:'wx'});return a;
}
export async function updateAccount(a:Account,patch:Partial<Pick<Account,'cv'|'published'>>){
  if(patch.cv)a.cv=restoreCV(patch.cv);if(typeof patch.published==='boolean')a.published=patch.published;
  a.updatedAt=new Date().toISOString();await write(a);return a;
}
export async function setPassword(a:Account,pw:string){Object.assign(a,hashPassword(pw));a.updatedAt=new Date().toISOString();await write(a)}
export async function deleteAccount(a:Account){await fs.rm(file(a.username),{force:true})}
export async function verifyLogin(u:string,pw:string){const a=await readAccount(u.trim().toLowerCase());if(!a){hashPassword(pw);return null}return checkPassword(pw,a)?a:null}
export {checkPassword};

const viewed=new Map<string,number>();
export async function countView(a:Account,ip:string){const k=a.username+'|'+ip,now=Date.now();if((viewed.get(k)||0)>now)return;viewed.set(k,now+6*3600e3);if(viewed.size>20000)viewed.clear();a.views=(a.views||0)+1;try{await write(a)}catch{}}

export async function listPublished(){
  try{ensureDir();const names=(await fs.readdir(USERS)).filter(f=>f.endsWith('.json')).slice(0,5000);
    const out:{username:string;updatedAt:string}[]=[];
    for(const n of names){const a=await readAccount(n.slice(0,-5));if(a?.published&&a.cv.name)out.push({username:a.username,updatedAt:a.updatedAt})}
    return out}catch{return []}
}

/* ---------- sessions (signed cookie, no server state) ---------- */
// Token = username.expiry.passwordFingerprint.hmac — changing the password signs out every device.
const sign=(v:string)=>crypto.createHmac('sha256',secret()).update(v).digest('base64url');
const fp=(a:Account)=>a.hash.slice(0,12);
export function sessionToken(a:Account){const v=`${a.username}.${Date.now()+SESSION_DAYS*864e5}.${fp(a)}`;return v+'.'+sign(v)}
export async function setSession(a:Account){(await cookies()).set(COOKIE,sessionToken(a),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:SESSION_DAYS*86400})}
export async function clearSession(){(await cookies()).set(COOKIE,'',{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'lax',path:'/',maxAge:0})}
export async function currentAccount():Promise<Account|null>{
  const t=(await cookies()).get(COOKIE)?.value;if(!t)return null;
  const parts=t.split('.');if(parts.length!==4)return null;
  const [u,exp,f,sig]=parts,v=`${u}.${exp}.${f}`,good=Buffer.from(sign(v)),given=Buffer.from(sig);
  if(good.length!==given.length||!crypto.timingSafeEqual(good,given)||Number(exp)<Date.now())return null;
  const a=await readAccount(u);return a&&fp(a)===f?a:null;
}

/* ---------- request helpers ---------- */
export async function clientIp(){const h=await headers();return (h.get('x-real-ip')||h.get('x-forwarded-for')?.split(',')[0]||'local').trim()}
/** Blocks cross-site form posts: the Origin (when sent) must match the Host. */
export async function sameOrigin(){const h=await headers();const o=h.get('origin');if(!o)return true;try{return new URL(o).host===(h.get('x-forwarded-host')||h.get('host'))}catch{return false}}
const buckets=new Map<string,{n:number;reset:number}>();
export function rateLimited(key:string,max:number,windowMs:number){const now=Date.now(),b=buckets.get(key);if(!b||b.reset<now){buckets.set(key,{n:1,reset:now+windowMs});if(buckets.size>50000)buckets.clear();return false}b.n++;return b.n>max}
export const json=(b:unknown,status=200)=>Response.json(b,{status,headers:{'Cache-Control':'no-store'}});
