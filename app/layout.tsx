import type { Metadata, Viewport } from 'next';
import './globals.css';
import Pwa from './pwa';
import {site} from '../lib/site';
import {JsonLd,orgSchema,websiteSchema} from '../lib/seo';
const verification:Metadata['verification']={};
if(process.env.GOOGLE_SITE_VERIFICATION)verification.google=process.env.GOOGLE_SITE_VERIFICATION;
if(process.env.BING_SITE_VERIFICATION)verification.other={'msvalidate.01':process.env.BING_SITE_VERIFICATION};
export const metadata: Metadata = { metadataBase:new URL(site.url), title: 'Hirestaff | Your next job? Think bigger.', description: 'Explore opportunities, build evidence of your skills and compare the real-life value of an offer. A new career and hiring experience built for Pakistan.', manifest: '/manifest.webmanifest', appleWebApp: { capable: true, title: 'Hirestaff', statusBarStyle: 'default' }, verification, other:{'geo.region':'PK-IS','geo.placename':'Islamabad'} };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#f34e25' };
export default function Layout({children}:{children:React.ReactNode}) { return <html lang="en"><body><JsonLd data={[orgSchema(),websiteSchema()]}/>{children}<Pwa/></body></html> }
