import {Shell,Crumbs,Hero,Faqs,Cta} from '../../components/site';
import {meta,JsonLd,breadcrumb,webPage,faqSchema} from '../../lib/seo';
import {generalFaqs} from '../../lib/guides';
import {services} from '../../lib/services';
const title='FAQs – Hiring Staff in Islamabad';
const description='Answers to common questions about hiring maids, cooks, drivers, nannies, caregivers and office staff in Islamabad and Rawalpindi with Hire Staff Islamabad.';
export const metadata=meta({title,description,path:'/faqs/'});
export default function Page(){const svc=services.flatMap(s=>s.faqs.slice(0,1));const all=[...generalFaqs,...svc];return <Shell>
  <JsonLd data={[webPage({path:'/faqs/',title,description}),breadcrumb([['FAQs','/faqs/']]),faqSchema(all)]}/>
  <Crumbs items={[['FAQs','/faqs/']]}/>
  <Hero kicker="FAQS" title="Questions," em="answered." answer="The most common questions families, businesses and job seekers ask us about hiring staff in Islamabad and Rawalpindi: process, timing, checks, fees, areas and job seeker registration."/>
  <Faqs faqs={generalFaqs} title="About our service"/>
  <Faqs faqs={svc} title="About specific roles"/>
  <Cta/></Shell>}
