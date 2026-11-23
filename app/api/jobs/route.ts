import {openJobs,summary} from '../../../lib/jobs';
const json=(b:unknown,status=200)=>Response.json(b,{status,headers:{'Cache-Control':'public, max-age=60'}});
export function GET(req:Request){
  const u=new URL(req.url),p=u.searchParams;
  if(p.get('mine')||p.get('company'))return json({jobs:[],total:0,hasMore:false});
  const q=(p.get('q')||'').toLowerCase().slice(0,100),city=(p.get('city')||'').toLowerCase().slice(0,100),type=p.get('type')||'',mode=p.get('mode')||'';
  const page=Math.max(1,Math.min(100,parseInt(p.get('page')||'1')||1)),size=12;
  const list=openJobs().filter(r=>{const j=r.job;return (!q||[j.title,j.companyName,j.description,j.requirements,j.sector].join(' ').toLowerCase().includes(q))&&(!city||(j.city+' '+j.area).toLowerCase().includes(city))&&(!type||j.type===type)&&(!mode||j.mode===mode)})
    .sort((a,b)=>(b.publishedAt||'').localeCompare(a.publishedAt||''));
  return json({jobs:list.slice((page-1)*size,page*size).map(summary),total:list.length,hasMore:page*size<list.length});
}
export function POST(){return Response.json({error:'Online publishing is reviewed by our team. Use “Send to Hire Staff Islamabad” to submit this vacancy free.'},{status:403})}
