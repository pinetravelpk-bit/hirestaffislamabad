import {site,abs} from './site';
import {services} from './services';
import {areas} from './areas';
import {guides,generalFaqs} from './guides';
export function llms(full:boolean){
  const L:string[]=[];
  L.push(`# ${site.name}`,'',`> ${site.description}`,'');
  L.push('## Key facts',`- Business type: staffing / employment agency (domestic, care and business staff)`,`- Service area: Islamabad Capital Territory (all sectors, DHA Islamabad, Bahria Town, Gulberg Greens, Bani Gala, Chak Shahzad, PWD, B-17) and Rawalpindi`,`- Website: ${site.url}`,`- Email: ${site.email}`);
  if(site.phone)L.push(`- Phone: ${site.phone}`);
  if(site.whatsapp)L.push(`- WhatsApp: +${site.whatsapp}`);
  if(site.street)L.push(`- Address: ${site.street}, ${site.locality}, Pakistan`);
  L.push('- Process: brief → shortlist (CNIC and references collected) → interview → paid trial → written agreement','- Job seekers: free CV maker and job board; candidates are never charged to be introduced to an employer','- Employers: free job posting (reviewed before publishing)','');
  L.push('## Services');services.forEach(s=>L.push(`- [${s.plural} in Islamabad](${abs(`/services/${s.slug}/`)}): ${full?s.answer:s.description}`));
  L.push('','## Areas');areas.forEach(a=>L.push(`- [Staff in ${a.name}, ${a.city}](${abs(`/areas/${a.slug}/`)})${full?': '+a.note:''}`));
  L.push('','## Guides');guides.forEach(g=>L.push(`- [${g.title}](${abs(`/guides/${g.slug}/`)}): ${full?g.answer:g.description}`));
  L.push('','## Tools',`- [Free CV maker](${abs('/cv/')}): build and download a CV PDF, no sign-up`,`- [Find jobs](${abs('/find-jobs/')})`,`- [Post a job free](${abs('/post-job/')})`,`- [Request staff](${abs('/request-staff/')})`,`- [Contact](${abs('/contact/')})`);
  if(full){
    L.push('','## FAQs');generalFaqs.forEach(([q,a])=>L.push(`### ${q}`,a,''));
    services.forEach(s=>{L.push(`## ${s.plural} — details`,s.intro,'','Duties:',...s.duties.map(d=>'- '+d),'','Arrangements:',...s.arrangements.map(([n,d])=>`- ${n}: ${d}`),'','Good to know: '+s.boundary,'');s.faqs.forEach(([q,a])=>L.push(`### ${q}`,a,''))});
  }
  L.push('',`Last updated: ${site.updated}`);
  return L.join('\n');
}
