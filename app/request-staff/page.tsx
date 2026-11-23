import {Shell,Crumbs,Hero} from '../../components/site';
import RequestForm from '../../components/request-form';
import {services} from '../../lib/services';
import {areas} from '../../lib/areas';
import {site} from '../../lib/site';
import {meta,JsonLd,breadcrumb,webPage} from '../../lib/seo';
const title='Request Staff in Islamabad – Free Staff Request Form';
const description='Tell us the staff you need in Islamabad or Rawalpindi — maid, cook, driver, nanny, caregiver, guard or office staff. Free to request; we reply on WhatsApp or phone.';
export const metadata=meta({title,description,path:'/request-staff/'});
export default function Page(){return <Shell>
  <JsonLd data={[webPage({path:'/request-staff/',title,description}),breadcrumb([['Request staff','/request-staff/']])]}/>
  <Crumbs items={[['Request staff','/request-staff/']]}/>
  <Hero kicker="FREE TO REQUEST" title="Tell us who you need." answer="Fill in the role, area, arrangement and your contact number. Your request opens in WhatsApp or email so it reaches our team directly; we call back to understand the brief and start shortlisting. Job seekers can use the same form to register for work."/>
  <section className="nx-container" style={{maxWidth:760,paddingBottom:70}}><RequestForm services={services.map(s=>({slug:s.slug,plural:s.plural}))} areas={areas.map(a=>({slug:a.slug,name:a.name}))} whatsapp={site.whatsapp} email={site.email}/></section>
</Shell>}
