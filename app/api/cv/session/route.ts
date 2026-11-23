import {verifyLogin,setSession,clearSession,sameOrigin,clientIp,rateLimited,json} from '../../../../lib/cv-accounts';
export const dynamic='force-dynamic';
export async function POST(req:Request){
  if(!await sameOrigin())return json({error:'Request blocked.'},403);
  let body:{username?:unknown;password?:unknown};try{body=await req.json()}catch{return json({error:'Invalid request.'},400)}
  const u=typeof body.username==='string'?body.username.trim().toLowerCase():'',p=typeof body.password==='string'?body.password:'';
  const ip=await clientIp();
  if(rateLimited('login:'+ip,20,900e3)||rateLimited('login-user:'+u,10,900e3))return json({error:'Too many attempts. Wait 15 minutes and try again.'},429);
  const a=u&&p?await verifyLogin(u,p):null;
  if(!a)return json({error:'Username or password is not correct.'},401);
  await setSession(a);return json({ok:true,username:a.username});
}
export async function DELETE(){if(!await sameOrigin())return json({error:'Request blocked.'},403);await clearSession();return json({ok:true})}
