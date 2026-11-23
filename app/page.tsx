import {Shell,Faqs,Cta,Cards} from '../components/site';
import RequestForm from '../components/request-form';
import {Icon} from './next/ui';
import {JobPostingPromo} from './job-board/pages';
import {services,groups} from '../lib/services';
import {areas,islamabadAreas,rawalpindiAreas} from '../lib/areas';
import {generalFaqs,guides} from '../lib/guides';
import {site} from '../lib/site';
import {meta,JsonLd,faqSchema,webPage} from '../lib/seo';

const title='Hire Staff in Islamabad – Maids, Cooks, Drivers, Nannies & Care Staff';
const description='Hire maids, cooks, drivers, nannies, elderly care, chowkidars and office staff in Islamabad & Rawalpindi. CNIC & references collected. Free to request.';
export const metadata=meta({title,description,path:'/'});

export default function Home(){
  const faqs=generalFaqs.slice(0,6);
  return <Shell>
    <JsonLd data={[webPage({path:'/',title,description}),faqSchema(faqs)]}/>
    <section className="hs-home-hero nx-container">
      <div>
        <p className="nx-kicker"><Icon name="spark"/> STAFFING FOR HOMES & BUSINESSES · ISLAMABAD</p>
        <h1>Hire staff in Islamabad.<br/><em>The right person, properly checked.</em></h1>
        <p className="hs-answer">Hire Staff Islamabad helps families and businesses in Islamabad and Rawalpindi hire maids, cooks, drivers, nannies, elderly care attendants, chowkidars and office staff. Share your requirement, we shortlist candidates against it, collect CNIC and references, and arrange interviews and a trial before you decide.</p>
        <div className="hs-actions"><a className="nx-btn nx-dark" href="/request-staff/">Request staff <Icon name="plus"/></a><a className="nx-btn nx-outline" href="/find-jobs/">I’m looking for a job</a></div>
        <div className="hs-trust"><span><Icon name="shield"/>CNIC & references collected</span><span><Icon name="location"/>All Islamabad sectors, DHA & Bahria</span><span><Icon name="check"/>Live-in, live-out & part-time</span><span><Icon name="proof"/>Free CV maker for job seekers</span></div>
      </div>
      <RequestForm services={services.map(s=>({slug:s.slug,plural:s.plural}))} areas={areas.map(a=>({slug:a.slug,name:a.name}))} whatsapp={site.whatsapp} email={site.email} compact/>
    </section>

    <section className="hs-section hs-band"><div className="nx-container">
      <div className="nx-section-title"><div><p className="nx-kicker">STAFF WE PLACE</p><h2>Who do you need<br/><em>at home or at work?</em></h2></div><p>Every role has its own brief, checks and trial. Choose a service to see duties, arrangements and what to ask.</p></div>
      {groups.map(g=><div key={g} style={{marginBottom:28}}><h3 style={{fontSize:20,margin:'0 0 12px'}}>{g}</h3><Cards items={services.filter(s=>s.group===g).map(s=>({href:`/services/${s.slug}/`,title:s.plural,text:s.answer.split('. ')[0]+'.',tag:s.urdu}))}/></div>)}
    </div></section>

    <section className="hs-section nx-container">
      <div className="nx-section-title"><div><p className="nx-kicker">HOW IT WORKS</p><h2>From requirement<br/><em>to first day.</em></h2></div><p>A clear process protects both the family or business and the employee.</p></div>
      <ol className="hs-steps">
        <li><strong>Share your brief</strong><p>Role, duties, hours, live-in or live-out, area, salary and start date.</p></li>
        <li><strong>We shortlist</strong><p>Candidates matched to the brief; CNIC and previous-employer references collected.</p></li>
        <li><strong>Interview & trial</strong><p>You meet candidates and take a paid trial day, cooking test or road test.</p></li>
        <li><strong>Agree in writing</strong><p>Duties, salary, day off and notice written down before the start date.</p></li>
      </ol>
      <p className="nx-note"><a href="/how-it-works/">Read the full process →</a></p>
    </section>

    <section className="hs-section hs-band"><div className="nx-container">
      <div className="nx-section-title"><div><p className="nx-kicker">LOCAL TO YOU</p><h2>Every sector of Islamabad.<br/><em>And Rawalpindi.</em></h2></div><p>Local knowledge matters: gate passes in DHA and Bahria, transport for live-out staff, staff quarters in older sectors.</p></div>
      <h3>Islamabad</h3><div className="hs-chips">{islamabadAreas.map(a=><a key={a.slug} href={`/areas/${a.slug}/`}>Staff in {a.name}</a>)}</div>
      <h3 style={{marginTop:24}}>Rawalpindi</h3><div className="hs-chips">{rawalpindiAreas.map(a=><a key={a.slug} href={`/areas/${a.slug}/`}>Staff in {a.name}</a>)}</div>
    </div></section>

    <JobPostingPromo/>

    <section className="hs-section nx-container">
      <div className="nx-section-title"><div><p className="nx-kicker">FOR JOB SEEKERS</p><h2>Looking for work<br/><em>in Islamabad?</em></h2></div><p>Domestic, care and office jobs. Build a professional CV for free and download it as a PDF.</p></div>
      <Cards items={[{href:'/find-jobs/',title:'Find jobs',text:'Browse current vacancies from employers in Islamabad and Rawalpindi.',tag:'Jobs'},{href:'/cv/',title:'Free CV maker',text:'Create a clean CV in English or Roman Urdu and download a PDF — no watermark, no fee.',tag:'Free'},{href:'/request-staff/',title:'Register for work',text:'Send us your details and the work you do. We never charge candidates to be introduced to an employer.',tag:'Free'}]}/>
    </section>

    <section className="hs-section hs-band"><div className="nx-container">
      <div className="nx-section-title"><div><p className="nx-kicker">HIRING GUIDES</p><h2>Hire with confidence.</h2></div><p>Practical, local advice for employers in Islamabad.</p></div>
      <Cards items={guides.map(g=>({href:`/guides/${g.slug}/`,title:g.title,text:g.description}))}/>
    </div></section>

    <Faqs faqs={faqs}/>
    <Cta/>
  </Shell>;
}
