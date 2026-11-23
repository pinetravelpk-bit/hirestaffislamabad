import crypto from 'node:crypto';
import {cookies} from 'next/headers';
import {getDb} from './db';

export const COOKIE='hs_session';
const DAY=86400000;
const reserved=new Set(['admin','api','account','login','logout','signup','register','new','edit','settings','hirestaff','support','help','about','cv','jobs','www','root']);

export function validUsername(u:string){return /^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$/.test(u)&&!u.includes('--')&&!reserved.has(u)}
export function hashPassword(p:string){const salt=crypto.randomBytes(16);const h=crypto.scryptSync(p,salt,64,{N:16384,r:8,p:1});return `scrypt$${salt.toString('base64')}$${h.toString('base64')}`}
export function checkPassword(p:string,stored:string){const [,s,h]=stored.split('$');if(!s||!h)return false;const a=crypto.scryptSync(p,Buffer.from(s,'base64'),64,{N:16384,r:8,p:1});const b=Buffer.from(h,'base64');return a.length===b.length&&crypto.timingSafeEqual(a,b)}
const tokenHash=(t:string)=>crypto.createHash('sha256').update(t).digest('hex');

export async function createSession(userId:number){
  const token=crypto.randomBytes(32).toString('base64url');
  getDb().prepare('INSERT INTO sessions(token,user_id,expires) VALUES(?,?,?)').run(tokenHash(token),userId,Date.now()+60*DAY);
  (await cookies()).set(COOKIE,token,{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production'&&process.env.INSECURE_COOKIES!=='1',path:'/',maxAge:60*86400});
}
export async function currentUser():Promise<{id:number;username:string}|null>{
  const t=(await cookies()).get(COOKIE)?.value;if(!t)return null;
  const db=getDb();db.prepare('DELETE FROM sessions WHERE expires<?').run(Date.now());
  const r=db.prepare('SELECT u.id,u.username FROM sessions s JOIN users u ON u.id=s.user_id WHERE s.token=?').get(tokenHash(t)) as {id:number;username:string}|undefined;
  return r?{id:Number(r.id),username:String(r.username)}:null;
}
export async function endSession(){const c=await cookies();const t=c.get(COOKIE)?.value;if(t)getDb().prepare('DELETE FROM sessions WHERE token=?').run(tokenHash(t));c.delete(COOKIE)}

// Basic protections for JSON endpoints
export function sameOrigin(req:Request){const o=req.headers.get('origin');if(!o)return true;try{return new URL(o).host===(req.headers.get('x-forwarded-host')||req.headers.get('host'))}catch{return false}}
const hits=new Map<string,number[]>();
export function limited(req:Request,key:string,max=10,windowMs=600000){const ip=(req.headers.get('x-real-ip')||req.headers.get('x-forwarded-for')||'').split(',')[0].trim()||'local';const k=key+':'+ip;const now=Date.now();const arr=(hits.get(k)||[]).filter(t=>now-t<windowMs);arr.push(now);hits.set(k,arr);return arr.length>max}
export const json=(b:unknown,status=200)=>Response.json(b,{status,headers:{'Cache-Control':'private, no-store'}});
export async function body(req:Request){try{return await req.json() as Record<string,unknown>}catch{return {}}}
