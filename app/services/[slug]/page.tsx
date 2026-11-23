import {notFound} from 'next/navigation';
import {Shell,Crumbs,Hero,Faqs,Cta,Cards} from '../../../components/site';
import RequestForm from '../../../components/request-form';
import {Icon} from '../../next/ui';
import {services,serviceBySlug} from '../../../lib/services';
import {areas} from '../../../lib/areas';
import {guides} from '../../../lib/guides';
import {site,abs} from '../../../lib/site';
import {meta,JsonLd,breadcrumb,faqSchema,webPage} from '../../../lib/seo';

export const dynamicParams=false;
export function generateStaticParams(){return services.map(s=>({slug:s.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const s=serviceBySlug((await params).slug);return s?meta({title:s.title,description:s.description,path:`/services/${s.slug}/`}):{}}

export default async function Page({params}:{params:Promise<{slug:string}>}){
  const s=serviceBySlug((await params).slug);if(!s)notFound();
  const path=`/services/${s.slug}/`;
  const popular=areas.filter(a=>a.common.includes(s.slug));
  const others=areas.filter(a=>!a.common.includes(s.slug));
  const related=services.filter(x=>x.group===s.group&&x.slug!==s.slug).slice(0,3);
  const serviceLd={'@type':'Service','@id':abs(path)+'#service',name:`${s.plural} in Islamabad`,alternateName:[s.urdu,s.roman],serviceType:s.plural,description:s.description,provider:{'@id':abs('/#organization')},
    areaServed:[{'@type':'City',name:'Islamabad'},{'@type':'City',name:'Rawalpindi'}],audience:{'@type':'Audience',audienceType:s.group==='Business staff'?'Businesses':'Households'},
    hasOfferCatalog:{'@type':'OfferCatalog',name:s.plural,itemListElement:s.arrangements.map(([n,d])=>({'@type':'Offer',itemOffered:{'@type':'Service',name:`${n} ${s.name.toLowerCase()}`,description:d}}))}};
  const howTo={'@type':'HowTo',name:`How to hire a ${s.name.toLowerCase()} in Islamabad`,step:[...s.brief.map((b,i)=>({'@type':'HowToStep',position:i+1,name:'Define: '+b,text:b})),{'@type':'HowToStep',position:s.brief.length+1,name:'Interview, trial and written agreement',text:'Interview shortlisted candidates, take a trial where useful and agree duties, salary, day off and notice in writing.'}]};
  return <Shell>
    <JsonLd data={[webPage({path,title:s.title,description:s.description}),breadcrumb([['Services','/services/'],[s.plural,path]]),serviceLd,howTo,faqSchema(s.faqs)]}/>
    <Crumbs items={[['Services','/services/'],[s.plural,path]]}/>
    <Hero kicker={s.group.toUpperCase()+' · ISLAMABAD & RAWALPINDI'} title={`Hire ${/^[aeiou]/i.test(s.name)?'an':'a'} ${s.name.toLowerCase()}`} em="in Islamabad." answer={s.answer}>
      <p className="hs-urdu" lang="ur">{s.urdu} — اسلام آباد اور راولپنڈی</p>
    </Hero>
    <section className="hs-section nx-container hs-two">
      <div>
        <p className="hs-lead">{s.intro}</p>
        <h2 className="hs-h2">What a {s.name.toLowerCase()} does</h2>
        <ul className="hs-list">{s.duties.map(d=><li key={d}><Icon name="check"/>{d}</li>)}</ul>
        <h2 className="hs-h2" style={{marginTop:40}}>Ways to hire</h2>
        <div className="hs-arr">{s.arrangements.map(([n,d])=><div key={n}><strong>{n}</strong><p>{d}</p></div>)}</div>
        <h2 className="hs-h2" style={{marginTop:40}}>What to tell us</h2>
        <ul className="hs-list">{s.brief.map(d=><li key={d}><Icon name="proof"/>{d}</li>)}</ul>
        <h2 className="hs-h2" style={{marginTop:40}}>How we shortlist</h2>
        <ul className="hs-list">{s.checks.map(d=><li key={d}><Icon name="shield"/>{d}</li>)}</ul>
        <p className="hs-note"><strong>Good to know:</strong> {s.boundary}</p>
      </div>
      <aside><div style={{position:'sticky',top:20}}><h2 style={{fontSize:26,margin:'0 0 12px'}}>Request {s.plural.toLowerCase()}</h2><RequestForm services={services.map(x=>({slug:x.slug,plural:x.plural}))} areas={areas.map(a=>({slug:a.slug,name:a.name}))} whatsapp={site.whatsapp} email={site.email} defaultService={s.slug}/></div></aside>
    </section>
    <section className="hs-section hs-band"><div className="nx-container">
      <h2 className="hs-h2">{s.plural} by area</h2>
      <p className="hs-lead">Most requested in these areas:</p>
      <div className="hs-chips">{popular.map(a=><a key={a.slug} href={s.core?`/services/${s.slug}/${a.slug}/`:`/areas/${a.slug}/`}>{s.plural} in {a.name}</a>)}</div>
      <p className="hs-lead" style={{marginTop:22}}>Also available in:</p>
      <div className="hs-chips">{others.map(a=><a key={a.slug} href={s.core?`/services/${s.slug}/${a.slug}/`:`/areas/${a.slug}/`}>{a.name}</a>)}</div>
    </div></section>
    <Faqs faqs={s.faqs} title={`${s.plural} in Islamabad: questions`}/>
    {related.length>0&&<section className="hs-section nx-container"><h2 className="hs-h2">Related staff</h2><Cards items={related.map(r=>({href:`/services/${r.slug}/`,title:r.plural,text:r.description}))}/></section>}
    <section className="hs-section nx-container" style={{paddingTop:0}}><h2 className="hs-h2">Hiring guides</h2><Cards items={guides.slice(0,3).map(g=>({href:`/guides/${g.slug}/`,title:g.title,text:g.description}))}/></section>
    <Cta title={`Need ${s.plural.toLowerCase()}?`}/>
  </Shell>;
}
