import {Shell,Crumbs,Hero} from '../../components/site';
import {meta} from '../../lib/seo';
import {site} from '../../lib/site';
export const metadata=meta({title:'Privacy Policy',description:'How Hire Staff Islamabad handles personal information from employers and job seekers.',path:'/privacy/'});
export default function Page(){return <Shell><Crumbs items={[['Privacy','/privacy/']]}/><Hero kicker="PRIVACY" title="Privacy policy" answer="We collect only the information needed to respond to your enquiry or to match candidates with employers, and we do not sell personal data."/>
<section className="hs-section nx-container hs-prose" style={{paddingTop:10}}>
<h2>What we collect</h2><p>When you send a request we receive what you choose to share: your name, phone number, area and requirement. Job seekers may share work history and identity documents during shortlisting.</p>
<h2>How we use it</h2><p>To respond to you, to shortlist candidates and to introduce candidates to employers who have a matching vacancy. Candidate CNIC details are shared with an employer only when an interview is arranged.</p>
<h2>On this website</h2><p>The CV builder and job-post drafts are saved in your own browser (local storage) and are not uploaded to us unless you send them. The request form opens WhatsApp or your email app; nothing is stored on our server.</p>
<h2>Your choices</h2><p>Ask us at {site.email} to see, correct or delete information you have shared with us.</p></section></Shell>}
