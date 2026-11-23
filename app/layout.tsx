import type {Metadata,Viewport} from 'next';
import './globals.css';
import Pwa from './pwa';
import {site} from '../lib/site';
import {JsonLd,organizationSchema,websiteSchema} from '../lib/seo';

const verification:Metadata['verification']={};
if(process.env.GOOGLE_SITE_VERIFICATION)verification.google=process.env.GOOGLE_SITE_VERIFICATION;
if(process.env.BING_SITE_VERIFICATION)verification.other={'msvalidate.01':process.env.BING_SITE_VERIFICATION};

export const metadata:Metadata={
  metadataBase:new URL(site.url),
  title:{default:'Hire Staff in Islamabad – Maids, Cooks, Drivers & Nannies | Hire Staff Islamabad',template:'%s | Hire Staff Islamabad'},
  description:site.description,
  applicationName:site.name,
  authors:[{name:site.name,url:site.url}],
  creator:site.name,publisher:site.name,
  category:'Employment agency',
  manifest:'/manifest.webmanifest',
  icons:{icon:[{url:'/icon.svg',type:'image/svg+xml'},{url:'/icon-192.png',sizes:'192x192'}],apple:'/icon-192.png'},
  appleWebApp:{capable:true,title:'Hirestaff',statusBarStyle:'default'},
  formatDetection:{telephone:true},
  verification,
  other:{'geo.region':'PK-IS','geo.placename':'Islamabad','geo.position':`${site.geo.lat};${site.geo.lng}`,ICBM:`${site.geo.lat}, ${site.geo.lng}`},
};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#f34e25'};

export default function Layout({children}:{children:React.ReactNode}){
  return <html lang="en-PK"><head><link rel="alternate" type="text/plain" href="/llms.txt" title="LLM summary"/></head><body><JsonLd data={[organizationSchema(),websiteSchema()]}/>{children}<Pwa/></body></html>;
}
