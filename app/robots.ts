import type {MetadataRoute} from 'next';
import {site} from '../lib/site';
export default function robots():MetadataRoute.Robots{
  if(!site.indexing)return {rules:[{userAgent:'*',disallow:'/'}]};
  const disallow=['/api/','/manage-jobs/'];
  const ai=['GPTBot','OAI-SearchBot','ChatGPT-User','ClaudeBot','Claude-SearchBot','PerplexityBot','Google-Extended','Applebot-Extended','Bingbot','CCBot'];
  return {rules:[{userAgent:'*',allow:'/',disallow},...ai.map(a=>({userAgent:a,allow:'/',disallow}))],sitemap:`${site.url}/sitemap.xml`,host:site.url};
}
