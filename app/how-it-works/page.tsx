import {Shell,Crumbs,Hero,Faqs,Cta} from '../../components/site';
import {meta,JsonLd,breadcrumb,webPage,faqSchema} from '../../lib/seo';
import {generalFaqs} from '../../lib/guides';
const title='How It Works – Hiring Staff Through Hire Staff Islamabad';
const description='Our hiring process for domestic, care and office staff in Islamabad: brief, shortlist with CNIC and references, interview, trial and written agreement.';
export const metadata=meta({title,description,path:'/how-it-works/'});
const steps:[string,string][]=[
['Share your brief','Tell us the role, duties, hours, live-in or live-out, area, salary range and start date. We help you turn “all-round help” into a clear job description.'],
['We shortlist candidates','We match candidates to the brief, not just the job title. For shortlisted candidates we collect the CNIC, current address and previous-employer contacts, and speak to references where available.'],
['You interview','Meet candidates at your home or office, ideally with another family member or colleague present. We share our notes so you know what to ask.'],
['Trial','A short paid trial — a cooking test, supervised childcare, a road test or a trial shift — shows how the person actually works.'],
['Agree terms in writing','Duties, hours, salary and payment date, weekly day off, leave, notice period and (for live-in staff) accommodation and meals.'],
['Start and follow up','We check in after the first weeks. Register domestic staff with your local police station as a sensible safety step.'],
];
export default function Page(){const faqs=generalFaqs.slice(2,6);return <Shell>
  <JsonLd data={[webPage({path:'/how-it-works/',title,description}),breadcrumb([['How it works','/how-it-works/']]),faqSchema(faqs),{'@type':'HowTo',name:'How to hire staff through Hire Staff Islamabad',step:steps.map(([n,t],i)=>({'@type':'HowToStep',position:i+1,name:n,text:t}))}]}/>
  <Crumbs items={[['How it works','/how-it-works/']]}/>
  <Hero kicker="OUR PROCESS" title="How hiring works" em="with Hire Staff Islamabad." answer="You share a brief, we shortlist candidates against it and collect CNIC and references, you interview and take a paid trial, and both sides agree duties, salary, day off and notice in writing before the start date."/>
  <section className="hs-section nx-container"><ol className="hs-steps">{steps.map(([n,t])=><li key={n}><strong>{n}</strong><p>{t}</p></li>)}</ol></section>
  <Faqs faqs={faqs}/><Cta/></Shell>}
