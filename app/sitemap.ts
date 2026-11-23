import type {MetadataRoute} from 'next';
import {site} from '../lib/site';
import {services,coreServices} from '../lib/services';
import {areas} from '../lib/areas';
import {guides} from '../lib/guides';
import {openJobs} from '../lib/jobs';
export default function sitemap():MetadataRoute.Sitemap{
  const d=new Date(site.updated);
  const u=(path:string,priority:number,changeFrequency:'daily'|'weekly'|'monthly'='weekly',lastModified=d)=>({url:site.url+path,lastModified,changeFrequency,priority});
  return [
    u('/',1,'weekly'),u('/services/',.9),u('/areas/',.9),u('/request-staff/',.9,'monthly'),u('/find-jobs/',.8,'daily'),u('/cv/',.8,'monthly'),u('/post-job/',.7,'monthly'),
    u('/how-it-works/',.6,'monthly'),u('/about/',.5,'monthly'),u('/contact/',.7,'monthly'),u('/faqs/',.6,'monthly'),u('/guides/',.6,'monthly'),u('/privacy/',.2,'monthly'),u('/terms/',.2,'monthly'),
    ...services.map(s=>u(`/services/${s.slug}/`,.9)),
    ...areas.map(a=>u(`/areas/${a.slug}/`,.8)),
    ...coreServices.flatMap(s=>areas.map(a=>u(`/services/${s.slug}/${a.slug}/`,.6,'monthly'))),
    ...guides.map(g=>u(`/guides/${g.slug}/`,.6,'monthly')),
    ...openJobs().map(j=>u(`/vacancies/${j.id}/`,.7,'daily',new Date(j.publishedAt||site.updated))),
  ];
}
