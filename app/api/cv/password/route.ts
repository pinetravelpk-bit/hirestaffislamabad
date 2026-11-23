import {currentAccount,checkPassword,setPassword,setSession,passwordProblem,sameOrigin,json} from '../../../../lib/cv-accounts';
export const dynamic='force-dynamic';
export async function POST(req:Request){
  if(!await sameOrigin())return json({error:'Request blocked.'},403);
  const a=await currentAccount();if(!a)return json({error:'Please sign in again.'},401);
  let body:{current?:unknown;next?:unknown};try{body=await req.json()}catch{return json({error:'Invalid request.'},400)}
  if(typeof body.current!=='string'||!checkPassword(body.current,a))return json({error:'Current password is not correct.'},403);
  const problem=passwordProblem(body.next);if(problem)return json({error:problem},400);
  await setPassword(a,body.next as string);await setSession(a);return json({ok:true});
}
