import {suggestUsername,validUsername,readAccount,json} from '../../../../lib/cv-accounts';
export const dynamic='force-dynamic';
/** ?name=Ayesha Khan → suggestion; ?check=ayesha-khan → availability */
export async function GET(req:Request){
  const p=new URL(req.url).searchParams,check=(p.get('check')||'').trim().toLowerCase();
  if(check)return json({username:check,valid:validUsername(check),available:validUsername(check)&&!(await readAccount(check))});
  return json({username:await suggestUsername((p.get('name')||'').slice(0,80))});
}
