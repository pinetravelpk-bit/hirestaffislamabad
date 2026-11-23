import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {readAccount,countView,clientIp,currentAccount} from '../../../lib/cv-accounts';
import {CVSheet} from '../../builders/sheet';
import {JsonLd} from '../../../lib/seo';
import {abs,site} from '../../../lib/site';
import {webURL,parseSkills} from '../../builders/model';
import {PublicActions} from './actions';
import '../../builders/builders.css';import '../../builders/templates.css';import './public.css';
export const dynamic='force-dynamic';
type P={params:Promise<{username:string}>};

async function load(username:string){const a=await readAccount(username);if(!a)return null;if(a.published)return a;const me=await currentAccount();return me?.username===a.username?a:null}

export async function generateMetadata({params}:P):Promise<Metadata>{
  const {username}=await params;const a=await load(username);if(!a)return {title:'CV not found',robots:{index:false}};
  const cv=a.cv,url=abs(`/p/${a.username}/`),title=`${cv.name}${cv.headline?' – '+cv.headline:''} | CV`;
  const description=(cv.summary||`${cv.name}'s CV${cv.city?' – '+cv.city:''}. ${parseSkills(cv.skills).slice(0,6).map(s=>s.name).join(', ')}`).replace(/\s+/g,' ').slice(0,160);
  return {title:{absolute:title},description,alternates:{canonical:url},robots:a.published&&site.indexing?{index:true,follow:true}:{index:false,follow:false},
    openGraph:{type:'profile',url,title,description,siteName:site.name},twitter:{card:'summary_large_image',title,description}};
}

export default async function Page({params,searchParams}:P&{searchParams:Promise<{print?:string}>}){
  const {username}=await params;const a=await load(username);if(!a)notFound();
  const cv=a.cv,url=abs(`/p/${a.username}/`),autoPrint=(await searchParams).print==='1';
  if(a.published)await countView(a,await clientIp());
  const phone=cv.phone.replace(/[^\d+]/g,''),wa=phone.replace(/^\+/,'').replace(/^0(3\d{9})$/,'92$1');
  const person:Record<string,unknown>={'@type':'Person',name:cv.name,url,jobTitle:cv.headline||undefined,description:cv.summary||undefined,address:cv.city?{'@type':'PostalAddress',addressLocality:cv.city}:undefined,knowsLanguage:cv.languages?cv.languages.split(',').map(s=>s.trim()).filter(Boolean):undefined,knowsAbout:parseSkills(cv.skills).map(s=>s.name),sameAs:webURL(cv.website)?[webURL(cv.website)]:undefined};
  return <div className="cvp">
    <JsonLd data={[{'@type':'ProfilePage',url,dateModified:a.updatedAt,mainEntity:person}]}/>
    <header className="cvp-bar"><a href="/" className="cvp-logo">hirestaff<i/></a><a href="/cv/" className="cvp-cta">Make your free CV page</a></header>
    {!a.published&&<p className="cvp-hidden">This page is hidden. Only you can see it. Turn it on from your <a href="/cv/account/">dashboard</a>.</p>}
    <PublicActions url={url} name={cv.name} headline={cv.headline} email={cv.email} phone={phone} whatsapp={/^\d{11,15}$/.test(wa)?wa:''} autoPrint={autoPrint}/>
    <main className="cvp-paper"><CVSheet cv={cv}/></main>
    <footer className="cvp-foot">CV page made free with <a href="/cv/">Hirestaff CV Builder</a> · <a href="/find-jobs/">Find jobs</a> · <a href="/cv/account/">Owner sign in</a></footer>
  </div>;
}
