import type {MetadataRoute} from 'next';
import {site} from '../lib/site';
import {getDb} from '../lib/db';
export const dynamic='force-dynamic';
export default function sitemap():MetadataRoute.Sitemap{
  const d=new Date(site.updated);
  const pages=[['/',1],['/find-jobs/',.9],['/post-job/',.8],['/cv/',.8],['/companies/',.6],['/company-builder/',.6]].map(([p,priority])=>({url:site.url+p,lastModified:d,changeFrequency:'weekly' as const,priority:priority as number}));
  let cvs:MetadataRoute.Sitemap=[];
  try{cvs=(getDb().prepare('SELECT u.username,c.updated FROM cvs c JOIN users u ON u.id=c.user_id WHERE c.published=1 ORDER BY c.updated DESC LIMIT 5000').all() as {username:string;updated:string}[]).map(r=>({url:`${site.url}/cv/${r.username}/`,lastModified:new Date(r.updated),changeFrequency:'monthly' as const,priority:.5}))}catch{}
  return [...pages,...cvs];
}
