import type {MetadataRoute} from 'next';
import {site} from '../lib/site';
export default function robots():MetadataRoute.Robots{
  if(!site.indexing)return {rules:[{userAgent:'*',disallow:'/'}]};
  const ai=['GPTBot','OAI-SearchBot','ChatGPT-User','ClaudeBot','Claude-SearchBot','Claude-User','anthropic-ai','PerplexityBot','Perplexity-User','Google-Extended','Applebot-Extended','Bingbot','CCBot','Amazonbot','meta-externalagent','DuckAssistBot','cohere-ai','YouBot','MistralAI-User'];
  const disallow=['/api/','/manage-jobs/','/job/','/company/','/studio/'];
  return {rules:[{userAgent:'*',allow:'/',disallow},...ai.map(a=>({userAgent:a,allow:'/',disallow}))],sitemap:`${site.url}/sitemap.xml`,host:site.url};
}
