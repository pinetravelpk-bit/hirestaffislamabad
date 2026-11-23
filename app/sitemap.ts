import type {MetadataRoute} from 'next';
import {site} from '../lib/site';
export default function sitemap():MetadataRoute.Sitemap{
  const d=new Date(site.updated);
  return [['/',1],['/find-jobs/',.9],['/post-job/',.8],['/cv/',.8],['/companies/',.6],['/company-builder/',.6]].map(([p,priority])=>({url:site.url+p,lastModified:d,changeFrequency:'weekly' as const,priority:priority as number}));
}
