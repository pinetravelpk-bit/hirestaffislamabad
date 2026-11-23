import {Shell,Crumbs,Hero,Cards,Cta,Faqs} from '../../components/site';
import {services,groups} from '../../lib/services';
import {meta,JsonLd,breadcrumb,webPage,faqSchema} from '../../lib/seo';
import {abs} from '../../lib/site';
import {generalFaqs} from '../../lib/guides';

const title='Staffing Services in Islamabad – Domestic, Care & Office Staff';
const description='All staff we help you hire in Islamabad and Rawalpindi: maids, cooks, drivers, nannies, elderly care, patient care, chowkidars, cleaners, office boys and more.';
export const metadata=meta({title,description,path:'/services/'});

export default function Page(){
  const faqs=generalFaqs.slice(2,6);
  return <Shell>
    <JsonLd data={[webPage({path:'/services/',title,description}),breadcrumb([['Services','/services/']]),faqSchema(faqs),{'@type':'ItemList',itemListElement:services.map((s,i)=>({'@type':'ListItem',position:i+1,url:abs(`/services/${s.slug}/`),name:s.plural}))}]}/>
    <Crumbs items={[['Services','/services/']]}/>
    <Hero kicker="STAFFING SERVICES" title="Staff for every home" em="and workplace in Islamabad." answer="Hire Staff Islamabad helps you hire domestic staff (maids, cooks, drivers, gardeners, helpers), care staff (nannies, babysitters, elderly and patient care attendants, tutors) and business staff (security guards, cleaners, office boys, receptionists) across Islamabad and Rawalpindi."/>
    {groups.map(g=><section key={g} className="hs-section nx-container" style={{paddingBlock:28}}><h2 className="hs-h2">{g}</h2><Cards items={services.filter(s=>s.group===g).map(s=>({href:`/services/${s.slug}/`,title:s.plural,text:s.description,tag:s.urdu}))}/></section>)}
    <Faqs faqs={faqs}/>
    <Cta/>
  </Shell>;
}
