import {Shell,Crumbs,Hero} from '../../components/site';
import {meta} from '../../lib/seo';
import {site} from '../../lib/site';
export const metadata=meta({title:'Terms of Use',description:'Terms of use for the Hire Staff Islamabad website, job board and free CV builder.',path:'/terms/'});
export default function Page(){return <Shell><Crumbs items={[['Terms','/terms/']]}/><Hero kicker="TERMS" title="Terms of use" answer={`These terms cover use of the ${site.name} website, job board and free tools. Service terms for staffing (fees, trial and replacement arrangements) are agreed separately in writing with each client.`}/>
<section className="hs-section nx-container hs-prose" style={{paddingTop:10}}>
<h2>Information on this site</h2><p>Guides are general information, not legal advice. Check current government notifications before agreeing employment terms.</p>
<h2>Job listings</h2><p>Vacancies are supplied by employers and reviewed before publication. Never pay anyone to apply for a job listed here; report suspicious listings to {site.email}.</p>
<h2>Employment relationship</h2><p>The employer and employee are responsible for their own agreement, salary payments and conduct. We recommend written agreements and police registration of domestic staff.</p>
<h2>Free tools</h2><p>The CV builder is provided free of charge as-is. Keep a backup of your CV; browser data can be cleared.</p></section></Shell>}
