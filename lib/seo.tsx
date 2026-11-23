import type {Metadata} from 'next';
import {site,abs} from './site';

export function meta({title,description,path,noindex=false}:{title:string;description:string;path:string;noindex?:boolean}):Metadata{
  const url=abs(path),img=abs('/opengraph-image/');
  return {title:{absolute:title},description,alternates:{canonical:url},
    robots:noindex||!site.indexing?{index:false,follow:true}:{index:true,follow:true,'max-image-preview':'large','max-snippet':-1},
    openGraph:{type:'website',url,title,description,siteName:site.name,locale:'en_PK',images:[{url:img,width:1200,height:630,alt:title}]},
    twitter:{card:'summary_large_image',title,description,images:[img]}};
}
export function orgSchema(){
  const o:Record<string,unknown>={'@type':'Organization','@id':abs('/#organization'),name:site.name,alternateName:['Hirestaff','hirestaffislamabad.pk'],url:site.url,logo:abs('/icon-512.png'),description:site.description,email:site.email,
    address:{'@type':'PostalAddress',addressLocality:site.locality,addressRegion:site.region,addressCountry:'PK',...(site.street?{streetAddress:site.street}:{})},
    areaServed:[{'@type':'City',name:'Islamabad'},{'@type':'City',name:'Rawalpindi'},{'@type':'Country',name:'Pakistan'}]};
  o.slogan=site.tagline;o.knowsAbout=['Jobs in Islamabad','Jobs in Rawalpindi','Recruitment','CV writing','Minimum wage in Pakistan','Domestic staff hiring'];
  o.contactPoint=[{'@type':'ContactPoint',contactType:'customer support',email:site.email,areaServed:'PK',availableLanguage:['English','Urdu'],...(site.phone?{telephone:site.phone}:{})}];
  if(site.street){o['@type']=['Organization','LocalBusiness'];o.geo={'@type':'GeoCoordinates',latitude:site.geo.lat,longitude:site.geo.lng};if(site.hours)o.openingHours=site.hours;if(site.postalCode)(o.address as Record<string,unknown>).postalCode=site.postalCode;}
  if(site.phone)o.telephone=site.phone;
  const same=[...site.sameAs,site.gbp].filter(Boolean);if(same.length)o.sameAs=same;
  return o;
}
export function websiteSchema(){
  return {'@type':'WebSite','@id':abs('/#website'),url:site.url,name:site.name,inLanguage:'en-PK',publisher:{'@id':abs('/#organization')},
    potentialAction:{'@type':'SearchAction',target:{'@type':'EntryPoint',urlTemplate:abs('/find-jobs/?q={search_term_string}')},'query-input':'required name=search_term_string'}};
}
export function JsonLd({data}:{data:Record<string,unknown>[]}){
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@graph':data}).replace(/</g,'\\u003c')}}/>;
}

// ---- Content schema helpers (AEO / GEO) ----
export const stripMarks=(s:string)=>s.replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').replace(/\*\*?([^*]+)\*\*?/g,'$1');
export function breadcrumbSchema(items:[string,string][]){
  return {'@type':'BreadcrumbList','@id':abs(items[items.length-1][1])+'#breadcrumb',itemListElement:items.map(([name,path],i)=>({'@type':'ListItem',position:i+1,name,item:abs(path)}))};
}
export function faqSchema(path:string,faqs:[string,string][]){
  return {'@type':'FAQPage','@id':abs(path)+'#faq',mainEntity:faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:stripMarks(a)}}))};
}
export function webPageSchema({path,title,description,updated,type='WebPage',about}:{path:string;title:string;description:string;updated?:string;type?:string;about?:Record<string,unknown>[]}){
  return {'@type':type,'@id':abs(path)+'#webpage',url:abs(path),name:title,description,inLanguage:'en-PK',isPartOf:{'@id':abs('/#website')},publisher:{'@id':abs('/#organization')},breadcrumb:{'@id':abs(path)+'#breadcrumb'},
    ...(updated?{dateModified:updated}:{}),...(about?{about}:{}),
    speakable:{'@type':'SpeakableSpecification',cssSelector:['h1','.ct-answer p']}};
}
export function articleSchema(p:{slug:string;title:string;description:string;published:string;updated:string;keywords:string[];category:string;words:number}){
  const url=abs(`/blog/${p.slug}/`);
  return {'@type':'BlogPosting','@id':url+'#article',headline:p.title,description:p.description,url,mainEntityOfPage:{'@id':url+'#webpage'},
    datePublished:p.published,dateModified:p.updated,inLanguage:'en-PK',articleSection:p.category,keywords:p.keywords.join(', '),wordCount:p.words,
    image:abs('/opengraph-image/'),author:{'@type':'Organization','@id':abs('/#organization'),name:site.name,url:abs('/about/')},publisher:{'@id':abs('/#organization')},
    isAccessibleForFree:true,spatialCoverage:[{'@type':'City',name:'Islamabad'},{'@type':'City',name:'Rawalpindi'}]};
}
export const cities={
  islamabad:{'@type':'City',name:'Islamabad',containedInPlace:{'@type':'AdministrativeArea',name:'Islamabad Capital Territory'},geo:{'@type':'GeoCoordinates',latitude:33.6844,longitude:73.0479}},
  rawalpindi:{'@type':'City',name:'Rawalpindi',containedInPlace:{'@type':'AdministrativeArea',name:'Punjab'},geo:{'@type':'GeoCoordinates',latitude:33.5651,longitude:73.0169}},
};
export function articleMeta({title,description,path,published,updated}:{title:string;description:string;path:string;published:string;updated:string}):Metadata{
  const m=meta({title,description,path});
  return {...m,openGraph:{...m.openGraph,type:'article',publishedTime:published,modifiedTime:updated,section:'Careers'} as Metadata['openGraph']};
}
