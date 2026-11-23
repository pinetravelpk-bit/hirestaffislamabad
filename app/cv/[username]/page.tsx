import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {getDb} from '../../../lib/db';
import {restoreCV,type CV} from '../../builders/model';
import {site,abs} from '../../../lib/site';
import {JsonLd} from '../../../lib/seo';
import PublicCV from './public';

export const runtime='nodejs';
export const dynamic='force-dynamic';

function load(username:string,count=false):{cv:CV;showContact:boolean;updated:string}|null{
  if(!/^[a-z0-9-]{3,30}$/.test(username))return null;
  const db=getDb();
  const r=db.prepare('SELECT c.user_id,c.data,c.show_contact,c.updated FROM cvs c JOIN users u ON u.id=c.user_id WHERE u.username=? AND c.published=1').get(username) as {user_id:number;data:string;show_contact:number;updated:string}|undefined;
  if(!r)return null;
  if(count)db.prepare('UPDATE cvs SET views=views+1 WHERE user_id=?').run(r.user_id);
  const cv=restoreCV(JSON.parse(r.data));const show=!!r.show_contact;
  if(!show){cv.email='';cv.phone=''}
  return {cv,showContact:show,updated:r.updated};
}

export async function generateMetadata({params}:{params:Promise<{username:string}>}):Promise<Metadata>{
  const {username}=await params;const d=load(username);if(!d)return {title:'CV not found | Hirestaff Islamabad',robots:{index:false}};
  const {cv}=d;const title=`${cv.name}${cv.headline?' – '+cv.headline:''} | CV on Hirestaff Islamabad`;
  const description=(cv.summary||`${cv.name}'s professional CV${cv.city?' — '+cv.city:''}.`).slice(0,155);
  return {title:{absolute:title},description,alternates:{canonical:abs(`/cv/${username}/`)},
    openGraph:{type:'profile',title,description,url:abs(`/cv/${username}/`),siteName:site.name,images:cv.photo?[]:[{url:abs('/opengraph-image/')}]},
    twitter:{card:'summary',title,description}};
}

export default async function Page({params}:{params:Promise<{username:string}>}){
  const {username}=await params;const d=load(username,true);if(!d)notFound();
  const {cv}=d;const url=abs(`/cv/${username}/`);
  const person:Record<string,unknown>={'@type':'Person',name:cv.name,jobTitle:cv.headline||undefined,description:cv.summary||undefined,url,
    address:cv.city?{'@type':'PostalAddress',addressLocality:cv.city}:undefined,knowsLanguage:cv.languages||undefined,
    knowsAbout:cv.skills?cv.skills.split(',').map(s=>s.replace(/[\s:]+\d{1,3}%?$/,'').trim()).filter(Boolean):undefined,
    alumniOf:cv.education.filter(e=>e.organisation).map(e=>({'@type':'EducationalOrganization',name:e.organisation})),
    worksFor:cv.experience.filter(e=>e.current&&e.organisation).map(e=>({'@type':'Organization',name:e.organisation})),
    sameAs:cv.website?[cv.website]:undefined};
  return <><JsonLd data={[{'@type':'ProfilePage',url,dateModified:d.updated,mainEntity:person}]}/><PublicCV cv={cv} url={url}/></>;
}
