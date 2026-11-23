import {Shell,Crumbs,Hero} from '../../components/site';
import RequestForm from '../../components/request-form';
import {services} from '../../lib/services';
import {areas} from '../../lib/areas';
import {site,telLink,whatsappLink,abs} from '../../lib/site';
import {meta,JsonLd,breadcrumb,webPage} from '../../lib/seo';
const title='Contact Hire Staff Islamabad – Phone, WhatsApp & Email';
const description='Contact Hire Staff Islamabad to hire staff or find a job in Islamabad and Rawalpindi. Call, WhatsApp or email us, or send a request online.';
export const metadata=meta({title,description,path:'/contact/'});
export default function Page(){const wa=whatsappLink('Assalam o Alaikum, I would like to hire staff.');return <Shell>
  <JsonLd data={[{...webPage({path:'/contact/',title,description}),'@type':'ContactPage',mainEntity:{'@id':abs('/#organization')}},breadcrumb([['Contact','/contact/']])]}/>
  <Crumbs items={[['Contact','/contact/']]}/>
  <Hero kicker="CONTACT" title="Talk to us." answer={`Reach ${site.name} by ${site.phone?'phone, ':''}${wa?'WhatsApp, ':''}email or the request form. We serve households and businesses across Islamabad and Rawalpindi${site.hours?'':', and reply during working hours'}.`}/>
  <section className="hs-section nx-container hs-two" style={{paddingTop:10}}>
    <div className="hs-panel"><h2>{site.name}</h2>
      <address className="hs-footer" style={{fontStyle:'normal',fontSize:17,lineHeight:2}}>
        {site.street&&<>{site.street}<br/></>}{site.locality}, {site.region}{site.postalCode?' '+site.postalCode:''}, Pakistan<br/>
        {site.phone&&<>Phone: <a href={telLink()}>{site.phone}</a><br/></>}
        {wa&&<>WhatsApp: <a href={wa} rel="nofollow">+{site.whatsapp}</a><br/></>}
        Email: <a href={'mailto:'+site.email}>{site.email}</a><br/>
        {site.hours&&<>Hours: {site.hours}<br/></>}
        {site.gbp&&<a href={site.gbp}>View on Google Maps</a>}
      </address>
      <p className="hs-note">Service area: Islamabad Capital Territory (all sectors, DHA, Bahria Town, Gulberg Greens, Bani Gala, Chak Shahzad) and Rawalpindi.</p>
    </div>
    <RequestForm services={services.map(s=>({slug:s.slug,plural:s.plural}))} areas={areas.map(a=>({slug:a.slug,name:a.name}))} whatsapp={site.whatsapp} email={site.email}/>
  </section></Shell>}
