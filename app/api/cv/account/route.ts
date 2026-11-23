import {createAccount,currentAccount,updateAccount,deleteAccount,checkPassword,clearSession,setSession,suggestUsername,validUsername,generatePassword,passwordProblem,readAccount,toPublic,sameOrigin,clientIp,rateLimited,json} from '../../../../lib/cv-accounts';
import {restoreCV} from '../../../builders/model';
import {abs} from '../../../../lib/site';
export const dynamic='force-dynamic';

/** The signed-in person's account and CV. */
export async function GET(){const a=await currentAccount();return json(a?{signedIn:true,account:toPublic(a),url:abs(`/p/${a.username}/`)}:{signedIn:false})}

/** Create an online CV page. Returns the username and a generated password (shown once). */
export async function POST(req:Request){
  if(!await sameOrigin())return json({error:'Request blocked.'},403);
  if(rateLimited('create:'+await clientIp(),8,3600e3))return json({error:'Too many new pages from this connection. Try again in an hour.'},429);
  let body:{cv?:unknown;username?:unknown;password?:unknown};try{body=await req.json()}catch{return json({error:'Invalid request.'},400)}
  const cv=restoreCV(body.cv);
  if(cv.name.trim().length<2)return json({error:'Add your full name to the CV first.'},400);
  let username=typeof body.username==='string'?body.username.trim().toLowerCase():'';
  if(username){if(!validUsername(username))return json({error:'Username: 3–30 letters, numbers or dashes (no dash at the start or end).'},400);if(await readAccount(username))return json({error:'That username is taken. Try another.'},409)}
  else username=await suggestUsername(cv.name);
  const password=typeof body.password==='string'&&body.password?body.password:generatePassword();
  const problem=passwordProblem(password);if(problem)return json({error:problem},400);
  try{const a=await createAccount(username,password,cv);await setSession(a);return json({username,password,url:abs(`/p/${username}/`),account:toPublic(a)},201)}
  catch(e){return (e as NodeJS.ErrnoException)?.code==='EEXIST'?json({error:'That username was just taken. Try another.'},409):json({error:'Could not save your page. Please try again.'},500)}
}

/** Save the CV and/or visibility. */
export async function PUT(req:Request){
  if(!await sameOrigin())return json({error:'Request blocked.'},403);
  const a=await currentAccount();if(!a)return json({error:'Please sign in again.'},401);
  let body:{cv?:unknown;published?:unknown};try{body=await req.json()}catch{return json({error:'Invalid request.'},400)}
  if(body.cv!==undefined&&restoreCV(body.cv).name.trim().length<2)return json({error:'Your CV needs a name.'},400);
  await updateAccount(a,{cv:body.cv!==undefined?restoreCV(body.cv):undefined,published:typeof body.published==='boolean'?body.published:undefined});
  return json({ok:true,account:toPublic(a)});
}

/** Permanently delete the page (password required). */
export async function DELETE(req:Request){
  if(!await sameOrigin())return json({error:'Request blocked.'},403);
  const a=await currentAccount();if(!a)return json({error:'Please sign in again.'},401);
  let body:{password?:unknown};try{body=await req.json()}catch{body={}}
  if(typeof body.password!=='string'||!checkPassword(body.password,a))return json({error:'Password is not correct.'},403);
  await deleteAccount(a);await clearSession();return json({ok:true});
}
