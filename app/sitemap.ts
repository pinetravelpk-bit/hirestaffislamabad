import type {MetadataRoute} from 'next';
import {site} from '../lib/site';
import {contentPages} from '../lib/content/links';
export default function sitemap():MetadataRoute.Sitemap{
  const d=new Date(site.updated);
  const core=([['/',1],['/find-jobs/',.9],['/post-job/',.8],['/cv/',.8],['/companies/',.6],['/company-builder/',.6]] as [string,number][]).map(([p,priority])=>({url:site.url+p,lastModified:d,changeFrequency:'weekly' as const,priority}));
  const content=contentPages().map(p=>({url:site.url+p.path,lastModified:new Date(p.updated),changeFrequency:'monthly' as const,priority:p.priority}));
  return [...core,...content];
}
