import {Shell,Crumbs,Hero,Cta} from '../../components/site';
import {meta,JsonLd,breadcrumb,webPage} from '../../lib/seo';
import {site,abs} from '../../lib/site';
const title='About Hire Staff Islamabad';
const description='Hire Staff Islamabad is a local staffing service helping homes and businesses in Islamabad and Rawalpindi hire domestic, care and office staff fairly.';
export const metadata=meta({title,description,path:'/about/'});
export default function Page(){return <Shell>
  <JsonLd data={[{...webPage({path:'/about/',title,description}),'@type':'AboutPage',mainEntity:{'@id':abs('/#organization')}},breadcrumb([['About','/about/']])]}/>
  <Crumbs items={[['About','/about/']]}/>
  <Hero kicker="ABOUT US" title="Local hiring," em="done properly." answer={`${site.name} is a staffing service for Islamabad and Rawalpindi. We help families hire maids, cooks, drivers, nannies and care attendants, help businesses hire guards, cleaners, office boys and receptionists, and help job seekers find work with a free CV maker.`}/>
  <section className="hs-section nx-container hs-prose">
    <h2>What we believe</h2>
    <p>Good hiring starts with a clear brief and ends with a written agreement. In between, both the employer and the employee deserve honesty: about the duties, the hours, the salary and the day off.</p>
    <h2>What we do</h2>
    <p>We shortlist candidates against your requirement, collect CNIC and reference details, arrange interviews and trials, and help you agree fair terms. We cover every Islamabad sector, DHA, Bahria Town, Gulberg Greens, Bani Gala and Rawalpindi.</p>
    <h2>For job seekers</h2>
    <p>Candidates never pay us to be introduced to an employer. You can build a free, professional CV on this website and browse current vacancies.</p>
  </section><Cta/></Shell>}
