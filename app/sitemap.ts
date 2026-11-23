import type {MetadataRoute} from 'next';
import {site} from '../lib/site';
import {listPublished} from '../lib/cv-accounts';
export const dynamic='force-dynamic';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
  const d=new Date(site.updated);
  const pages=[['/',1],['/find-jobs/',.9],['/post-job/',.8],['/cv/',.8],['/companies/',.6],['/company-builder/',.6]].map(([p,priority])=>({url:site.url+p,lastModified:d,changeFrequency:'weekly' as const,priority:priority as number}));
  const cvs=(await listPublished()).map(c=>({url:`${site.url}/p/${c.username}/`,lastModified:new Date(c.updatedAt),changeFrequency:'monthly' as const,priority:.5}));
  return [...pages,...cvs];
}
