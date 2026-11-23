import {Shell,Crumbs,Hero,Cards,Cta} from '../../components/site';
import {guides} from '../../lib/guides';
import {meta,JsonLd,breadcrumb,webPage} from '../../lib/seo';
const title='Hiring Guides for Domestic & Office Staff in Islamabad';
const description='Practical guides for hiring maids, cooks, drivers, nannies and caregivers in Islamabad: checklists, interview questions, agreements and live-in vs live-out.';
export const metadata=meta({title,description,path:'/guides/'});
export default function Page(){return <Shell>
  <JsonLd data={[webPage({path:'/guides/',title,description}),breadcrumb([['Guides','/guides/']])]}/>
  <Crumbs items={[['Guides','/guides/']]}/>
  <Hero kicker="HIRING GUIDES" title="Hire well." em="Employ fairly." answer="These guides cover the practical steps of hiring household and office staff in Islamabad: writing a brief, checking CNIC and references, interviewing, choosing live-in or live-out, and agreeing terms in writing."/>
  <section className="hs-section nx-container"><Cards items={guides.map(g=>({href:`/guides/${g.slug}/`,title:g.title,text:g.description}))}/></section>
  <Cta/></Shell>}
