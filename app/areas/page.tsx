import {Shell,Crumbs,Hero,Cards,Cta} from '../../components/site';
import {islamabadAreas,rawalpindiAreas,areas} from '../../lib/areas';
import {meta,JsonLd,breadcrumb,webPage} from '../../lib/seo';
import {abs} from '../../lib/site';
const title='Areas We Serve – Islamabad Sectors, DHA, Bahria Town & Rawalpindi';
const description='Hire domestic and office staff across Islamabad sectors (E, F, G, I, D), DHA Islamabad, Bahria Town, Gulberg Greens, Bani Gala and Rawalpindi.';
export const metadata=meta({title,description,path:'/areas/'});
export default function Page(){
  return <Shell>
    <JsonLd data={[webPage({path:'/areas/',title,description}),breadcrumb([['Areas','/areas/']]),{'@type':'ItemList',itemListElement:areas.map((a,i)=>({'@type':'ListItem',position:i+1,url:abs(`/areas/${a.slug}/`),name:`Staff in ${a.name}`}))}]}/>
    <Crumbs items={[['Areas','/areas/']]}/>
    <Hero kicker="SERVICE AREAS" title="Staff across Islamabad" em="and Rawalpindi." answer="Hire Staff Islamabad serves every Islamabad sector — E, F, G, I and D sectors and Blue Area — plus DHA Islamabad, Bahria Town and Bahria Enclave, Gulberg Greens, Bani Gala, Chak Shahzad, PWD, B-17 and Rawalpindi areas including Saddar, Chaklala Scheme 3 and Satellite Town."/>
    <section className="hs-section nx-container"><h2 className="hs-h2">Islamabad</h2><Cards items={islamabadAreas.map(a=>({href:`/areas/${a.slug}/`,title:`Staff in ${a.name}`,text:a.note.split('. ')[0]+'.',tag:a.kind}))}/></section>
    <section className="hs-section nx-container"><h2 className="hs-h2">Rawalpindi</h2><Cards items={rawalpindiAreas.map(a=>({href:`/areas/${a.slug}/`,title:`Staff in ${a.name}`,text:a.note.split('. ')[0]+'.',tag:a.kind}))}/></section>
    <Cta/>
  </Shell>;
}
