import {notFound} from 'next/navigation';
import {Shell,Crumbs,Hero,Cards,Cta,Faqs} from '../../../components/site';
import RequestForm from '../../../components/request-form';
import {services,serviceBySlug} from '../../../lib/services';
import {areas,areaBySlug} from '../../../lib/areas';
import {site,abs} from '../../../lib/site';
import {meta,JsonLd,breadcrumb,webPage,faqSchema} from '../../../lib/seo';
export const dynamicParams=false;
export function generateStaticParams(){return areas.map(a=>({slug:a.slug}))}
const t=(a:NonNullable<ReturnType<typeof areaBySlug>>)=>({title:`Hire Staff in ${a.name}, ${a.city} – Maids, Cooks, Drivers & More`,description:`Hire maids, cooks, drivers, nannies, care attendants and other staff in ${a.name}, ${a.city}. Live-in or live-out, with CNIC & references collected.`});
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const a=areaBySlug((await params).slug);return a?meta({...t(a),path:`/areas/${a.slug}/`}):{}}
export default async function Page({params}:{params:Promise<{slug:string}>}){
  const a=areaBySlug((await params).slug);if(!a)notFound();
  const {title,description}=t(a);const path=`/areas/${a.slug}/`;
  const top=a.common.map(serviceBySlug).filter(Boolean) as NonNullable<ReturnType<typeof serviceBySlug>>[];
  const rest=services.filter(s=>!a.common.includes(s.slug));
  const nearby=a.nearby.map(areaBySlug).filter(Boolean);
  const link=(s:{slug:string;core:boolean})=>s.core?`/services/${s.slug}/${a.slug}/`:`/services/${s.slug}/`;
  const faqs:[string,string][]=[
    [`Which staff are most requested in ${a.name}?`,`In ${a.name}, families and businesses most often ask us for ${top.map(s=>s.plural.toLowerCase()).join(', ')}.`],
    [`Do you serve all of ${a.name}?`,`Yes. Tell us your street or block privately when you request staff so we can plan travel or live-in arrangements.`],
    ['How quickly can staff start?','With a clear brief a shortlist is usually ready within a few working days; you interview and take a trial before confirming the start date.'],
  ];
  return <Shell>
    <JsonLd data={[webPage({path,title,description}),breadcrumb([['Areas','/areas/'],[a.name,path]]),faqSchema(faqs),{'@type':'Place','@id':abs(path)+'#place',name:`${a.name}, ${a.city}`,containedInPlace:{'@type':'City',name:a.city,containedInPlace:{'@type':'Country',name:'Pakistan'}}}]}/>
    <Crumbs items={[['Areas','/areas/'],[a.name,path]]}/>
    <Hero kicker={`${a.kind.toUpperCase()} · ${a.city.toUpperCase()}`} title={`Hire staff in ${a.name}`} em={a.city} answer={`Hire Staff Islamabad helps households and businesses in ${a.name}, ${a.city} hire ${top.map(s=>s.plural.toLowerCase()).join(', ')} and other staff. ${a.note.split('. ')[0]}.`}/>
    <section className="hs-section nx-container hs-two">
      <div>
        <h2 className="hs-h2">Hiring in {a.name}</h2>
        <p className="hs-lead">{a.note}</p>
        {a.landmarks.length>0&&<p className="hs-lead">Reference points: {a.landmarks.join(', ')}.</p>}
        <h2 className="hs-h2" style={{marginTop:36}}>Most requested in {a.name}</h2>
        <Cards items={top.map(s=>({href:link(s),title:`${s.plural} in ${a.name}`,text:s.description,tag:s.urdu}))}/>
      </div>
      <aside><div style={{position:'sticky',top:20}}><h2 style={{fontSize:26,margin:'0 0 12px'}}>Request staff in {a.name}</h2><RequestForm services={services.map(x=>({slug:x.slug,plural:x.plural}))} areas={areas.map(x=>({slug:x.slug,name:x.name}))} whatsapp={site.whatsapp} email={site.email} defaultArea={a.slug}/></div></aside>
    </section>
    <section className="hs-section hs-band"><div className="nx-container"><h2 className="hs-h2">All staff available in {a.name}</h2><div className="hs-chips">{rest.map(s=><a key={s.slug} href={link(s)}>{s.plural}</a>)}</div>
      {nearby.length>0&&<><h2 className="hs-h2" style={{marginTop:36}}>Nearby areas</h2><div className="hs-chips">{nearby.map(n=><a key={n!.slug} href={`/areas/${n!.slug}/`}>Staff in {n!.name}</a>)}</div></>}</div></section>
    <Faqs faqs={faqs}/>
    <Cta title={`Hire staff in ${a.name}.`}/>
  </Shell>;
}
