import {site,abs} from '../../lib/site';
import {posts} from '../../lib/content/blog';
import {roles} from '../../lib/content/roles';
import {places} from '../../lib/content/places';
import {allSiteFaqs} from '../../lib/content/faq';
import {stripMarks as s} from '../../lib/seo';
import type {Block} from '../../lib/content/types';
export const dynamic='force-static';
const blocks=(b:Block[])=>b.flatMap(x=>[`### ${x.h2}`,...(x.p||[]).map(s),...(x.list||[]).map(l=>'- '+s(l)),...(x.steps||[]).map((l,i)=>`${i+1}. ${s(l)}`),
  ...(x.table?[`| ${x.table.head.join(' | ')} |`,`|${x.table.head.map(()=>'---').join('|')}|`,...x.table.rows.map(r=>`| ${r.map(s).join(' | ')} |`)]:[]),...(x.after||[]).map(s),'']);
const faqs=(f:[string,string][])=>['### FAQ',...f.flatMap(([q,a])=>[`Q: ${q}`,`A: ${s(a)}`,''])];
export function GET(){
  const out=[`# ${site.name} — full guide text`,`Source: ${site.url} · Contact: ${site.email}`,'',
    ...places.flatMap(p=>[`## ${p.title}`,`URL: ${abs(`/${p.slug}/`)}`,'',s(p.answer),'',...p.intro.map(s),'',...p.areas.map(a=>`- ${a.name}: ${a.note}`),'',...blocks(p.body),...faqs(p.faqs)]),
    ...posts.flatMap(p=>[`## ${p.title}`,`URL: ${abs(`/blog/${p.slug}/`)} · Updated ${p.updated}`,'',s(p.answer),'',...p.takeaways.map(t=>'- '+s(t)),'',...blocks(p.body),...faqs(p.faqs),...(p.sources?['Sources:',...p.sources.map(x=>`- ${x.label}: ${x.url}`),'']:[])]),
    ...roles.flatMap(r=>[`## ${r.title}`,`URL: ${abs(`/jobs-in-islamabad/${r.slug}/`)}`,'',s(r.answer),'','Duties:',...r.duties.map(d=>'- '+d),'Requirements:',...r.requirements.map(d=>'- '+d),'Pay:',...r.pay.map(s),'Where:',...r.where.map(d=>'- '+d),'',...faqs(r.faqs)]),
    '## Site FAQ',...faqs(allSiteFaqs)];
  return new Response(out.join('\n'),{headers:{'Content-Type':'text/plain; charset=utf-8'}});
}
