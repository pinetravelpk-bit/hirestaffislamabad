import {notFound} from 'next/navigation';
import {Shell,Crumbs,Hero,Faqs,Cta,Cards} from '../../../components/site';
import {Icon} from '../../next/ui';
import {guides,guideBySlug} from '../../../lib/guides';
import {coreServices} from '../../../lib/services';
import {site,abs} from '../../../lib/site';
import {meta,JsonLd,breadcrumb,webPage,faqSchema} from '../../../lib/seo';
export const dynamicParams=false;
export function generateStaticParams(){return guides.map(g=>({slug:g.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const g=guideBySlug((await params).slug);return g?{...meta({title:g.title,description:g.description,path:`/guides/${g.slug}/`}),openGraph:{type:'article'}}:{}}
export default async function Page({params}:{params:Promise<{slug:string}>}){
  const g=guideBySlug((await params).slug);if(!g)notFound();const path=`/guides/${g.slug}/`;
  return <Shell>
    <JsonLd data={[webPage({path,title:g.title,description:g.description}),breadcrumb([['Guides','/guides/'],[g.title,path]]),
      {'@type':'Article',headline:g.title,description:g.description,mainEntityOfPage:abs(path),datePublished:'2026-11-22',dateModified:site.updated,author:{'@type':'Organization','@id':abs('/#organization'),name:site.name},publisher:{'@id':abs('/#organization')},image:abs('/opengraph-image/'),inLanguage:'en-PK'},
      ...(g.faqs.length?[faqSchema(g.faqs)]:[])]}/>
    <Crumbs items={[['Guides','/guides/'],[g.title,path]]}/>
    <Hero kicker="HIRING GUIDE" title={g.title} answer={g.answer}/>
    <article className="hs-section nx-container hs-prose" style={{paddingTop:10}}>
      {g.sections.map(s=><section key={s.h}><h2>{s.h}</h2>{s.p&&<p>{s.p}</p>}{s.list&&<ul className="hs-list">{s.list.map(l=><li key={l}><Icon name="check"/>{l}</li>)}</ul>}</section>)}
      <p className="hs-note">This guide is general information for employers in Islamabad and Rawalpindi, not legal advice. Check current government notifications (for example, minimum wage) before agreeing terms.</p>
    </article>
    <Faqs faqs={g.faqs}/>
    <section className="hs-section nx-container"><h2 className="hs-h2">Hire staff</h2><Cards items={coreServices.map(s=>({href:`/services/${s.slug}/`,title:s.plural,text:s.description}))}/></section>
    <Cta/>
  </Shell>;
}
