import {notFound} from 'next/navigation';
import {Shell,Crumbs,Hero,Cta} from '../../../components/site';
import {allJobs,jobById} from '../../../lib/jobs';
import {applicationURL,salaryLabel,dateText} from '../../job-board/model';
import {site,abs} from '../../../lib/site';
import {meta,JsonLd,breadcrumb} from '../../../lib/seo';

export function generateStaticParams(){return allJobs().map(j=>({id:j.id}))}
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const r=jobById((await params).id);if(!r)return {};const j=r.job;
  return meta({title:`${j.title} job in ${j.area?j.area+', ':''}${j.city}`,description:`${j.title} – ${j.type}, ${j.companyName}, ${j.city}. ${j.description.slice(0,110)}`,path:`/vacancies/${r.id}/`,noindex:r.status!=='published'})}

export default async function Page({params}:{params:Promise<{id:string}>}){
  const r=jobById((await params).id);if(!r)notFound();const j=r.job;const path=`/vacancies/${r.id}/`;
  const emp:Record<string,string>={'Full-time':'FULL_TIME','Part-time':'PART_TIME','Contract':'CONTRACTOR','Temporary':'TEMPORARY','Internship':'INTERN'};
  const posting:Record<string,unknown>={'@type':'JobPosting',title:j.title,description:`<p>${j.description}</p><p>${j.requirements}</p>${j.benefits?`<p>${j.benefits}</p>`:''}`,datePosted:r.publishedAt,validThrough:j.deadline?j.deadline+'T23:59:59+05:00':undefined,
    employmentType:emp[j.type]||'OTHER',hiringOrganization:{'@type':'Organization',name:j.companyName,sameAs:site.url},identifier:{'@type':'PropertyValue',name:site.name,value:r.id},directApply:false,
    jobLocation:{'@type':'Place',address:{'@type':'PostalAddress',addressLocality:j.city,streetAddress:j.area||undefined,addressRegion:/rawalpindi/i.test(j.city)?'Punjab':'Islamabad Capital Territory',addressCountry:'PK'}},
    industry:j.sector,experienceRequirements:j.experience||undefined,totalJobOpenings:Number(j.vacancies)||1};
  if(j.mode==='Remote'){posting.jobLocationType='TELECOMMUTE';posting.applicantLocationRequirements={'@type':'Country',name:'Pakistan'}}
  if(j.salaryMin||j.salaryMax)posting.baseSalary={'@type':'MonetaryAmount',currency:j.currency,value:{'@type':'QuantitativeValue',minValue:Number(j.salaryMin)||undefined,maxValue:Number(j.salaryMax)||undefined,unitText:j.payPeriod.toUpperCase()}};
  const open=r.status==='published';
  return <Shell>
    <JsonLd data={[breadcrumb([['Find jobs','/find-jobs/'],[j.title,path]]),...(open?[posting]:[])]}/>
    <Crumbs items={[['Find jobs','/find-jobs/'],[j.title,path]]}/>
    <Hero kicker={`${j.type.toUpperCase()} · ${j.city.toUpperCase()}`} title={j.title} em={j.companyName} answer={`${j.title} (${j.type}, ${j.mode}) in ${j.area?j.area+', ':''}${j.city}. ${salaryLabel(j)?'Salary: '+salaryLabel(j)+'. ':''}${j.deadline?'Apply by '+dateText(j.deadline)+'.':''}`}/>
    <section className="hs-section nx-container hs-prose" style={{paddingTop:10}}>
      {!open&&<p className="hs-answer">Applications for this vacancy are closed.</p>}
      <h2>About the job</h2><p style={{whiteSpace:'pre-line'}}>{j.description}</p>
      <h2>Requirements</h2><p style={{whiteSpace:'pre-line'}}>{j.requirements}</p>
      {j.benefits&&<><h2>Benefits</h2><p style={{whiteSpace:'pre-line'}}>{j.benefits}</p></>}
      {j.experience&&<p><strong>Experience:</strong> {j.experience}</p>}
      <p><strong>Vacancies:</strong> {j.vacancies}</p>
      {open&&<p><a className="nx-btn nx-dark" href={applicationURL(j)} rel="noopener noreferrer">{j.applyMethod==='email'?'Apply by email':'Apply now'}</a></p>}
      <p className="hs-note">Never pay anyone to apply for a job. Report suspicious requests to {site.email}.</p>
    </section>
    <Cta title="Hiring too?" text="Post a vacancy free, or ask us to shortlist candidates for you."/>
  </Shell>;
}
