import {notFound} from 'next/navigation';
import {Shell,Crumbs,Hero,Faqs,Cta,Cards} from '../../../../components/site';
import RequestForm from '../../../../components/request-form';
import {Icon} from '../../../next/ui';
import {services,serviceBySlug,coreServices} from '../../../../lib/services';
import {areas,areaBySlug} from '../../../../lib/areas';
import {site,abs} from '../../../../lib/site';
import {meta,JsonLd,breadcrumb,faqSchema,webPage} from '../../../../lib/seo';

export const dynamicParams=false;
export function generateStaticParams(){return coreServices.flatMap(s=>areas.map(a=>({slug:s.slug,area:a.slug})))}
const t=(s:NonNullable<ReturnType<typeof serviceBySlug>>,a:NonNullable<ReturnType<typeof areaBySlug>>)=>({
  title:`${s.plural} in ${a.name}, ${a.city} – Hire ${s.name.toLowerCase()}`,
  description:`Hire ${s.plural.toLowerCase()} in ${a.name}, ${a.city}. Live-in, live-out or part-time, CNIC & references collected. Free to request.`});
export async function generateMetadata({params}:{params:Promise<{slug:string;area:string}>}){const p=await params;const s=serviceBySlug(p.slug),a=areaBySlug(p.area);if(!s||!a||!s.core)return {};const x=t(s,a);return meta({...x,path:`/services/${s.slug}/${a.slug}/`})}

export default async function Page({params}:{params:Promise<{slug:string;area:string}>}){
  const p=await params;const s=serviceBySlug(p.slug),a=areaBySlug(p.area);if(!s||!a||!s.core)notFound();
  const {title,description}=t(s,a);const path=`/services/${s.slug}/${a.slug}/`;
  const nearby=a.nearby.map(areaBySlug).filter(Boolean);
  const live=a.kind==='Housing society'||a.kind==='Suburb';
  const faqs:[string,string][]=[
    [`How do I hire ${/^[aeiou]/i.test(s.name)?'an':'a'} ${s.name.toLowerCase()} in ${a.name}?`,`Share your requirement — duties, hours, live-in or live-out, salary and start date — through the request form or WhatsApp. We shortlist ${s.plural.toLowerCase()} for ${a.name}, collect CNIC and references, and arrange interviews and a trial before you decide.`],
    [`Do you provide live-in ${s.plural.toLowerCase()} in ${a.name}?`,live?`Yes. In ${a.name} live-in arrangements are common because of entry rules and distances. Mention the accommodation you provide and the weekly day off.`:`Yes, live-in and live-out ${s.plural.toLowerCase()} are both available in ${a.name}. For live-out staff, agree timings and transport.`],
    ...s.faqs.filter(([q])=>!/live-in/i.test(q)).slice(0,2),
  ];
  return <Shell>
    <JsonLd data={[webPage({path,title,description}),breadcrumb([['Services','/services/'],[s.plural,`/services/${s.slug}/`],[a.name,path]]),
      {'@type':'Service',name:`${s.plural} in ${a.name}`,serviceType:s.plural,description,provider:{'@id':abs('/#organization')},areaServed:{'@type':'Place',name:`${a.name}, ${a.city}`,containedInPlace:{'@type':'City',name:a.city}}},faqSchema(faqs)]}/>
    <Crumbs items={[['Services','/services/'],[s.plural,`/services/${s.slug}/`],[a.name,path]]}/>
    <Hero kicker={`${a.kind.toUpperCase()} · ${a.city.toUpperCase()}`} title={`${s.plural} in ${a.name}`} em={a.city} answer={`To hire ${/^[aeiou]/i.test(s.name)?'an':'a'} ${s.name.toLowerCase()} in ${a.name}, ${a.city}, share the duties, hours, live-in or live-out arrangement, salary and start date. Hire Staff Islamabad shortlists ${s.plural.toLowerCase()} for ${a.name}, collects CNIC and references, and arranges interviews and a trial before you decide.`}/>
    <section className="hs-section nx-container hs-two">
      <div>
        <h2 className="hs-h2">Hiring in {a.name}: what to plan for</h2>
        <p className="hs-lead">{a.note}</p>
        {a.landmarks.length>0&&<p className="hs-lead">Common reference points: {a.landmarks.join(', ')}.</p>}
        <h2 className="hs-h2" style={{marginTop:36}}>What a {s.name.toLowerCase()} does</h2>
        <ul className="hs-list">{s.duties.map(d=><li key={d}><Icon name="check"/>{d}</li>)}</ul>
        <h2 className="hs-h2" style={{marginTop:36}}>Arrangements</h2>
        <div className="hs-arr">{s.arrangements.map(([n,d])=><div key={n}><strong>{n}</strong><p>{d}</p></div>)}</div>
        <h2 className="hs-h2" style={{marginTop:36}}>How we shortlist</h2>
        <ul className="hs-list">{s.checks.map(d=><li key={d}><Icon name="shield"/>{d}</li>)}</ul>
        <p className="hs-note">{s.boundary} <a href={`/services/${s.slug}/`}>Full guide to hiring {s.plural.toLowerCase()} →</a></p>
      </div>
      <aside><div style={{position:'sticky',top:20}}><h2 style={{fontSize:26,margin:'0 0 12px'}}>Request {s.plural.toLowerCase()} in {a.name}</h2><RequestForm services={services.map(x=>({slug:x.slug,plural:x.plural}))} areas={areas.map(x=>({slug:x.slug,name:x.name}))} whatsapp={site.whatsapp} email={site.email} defaultService={s.slug} defaultArea={a.slug}/></div></aside>
    </section>
    <Faqs faqs={faqs}/>
    <section className="hs-section nx-container"><h2 className="hs-h2">Nearby areas</h2><div className="hs-chips">{nearby.map(n=><a key={n!.slug} href={`/services/${s.slug}/${n!.slug}/`}>{s.plural} in {n!.name}</a>)}<a href={`/areas/${a.slug}/`}>All staff in {a.name}</a></div>
      <h2 className="hs-h2" style={{marginTop:36}}>Other staff in {a.name}</h2><Cards items={coreServices.filter(x=>x.slug!==s.slug).map(x=>({href:`/services/${x.slug}/${a.slug}/`,title:`${x.plural} in ${a.name}`,text:x.description}))}/></section>
    <Cta title={`Hire ${s.plural.toLowerCase()} in ${a.name}.`}/>
  </Shell>;
}
