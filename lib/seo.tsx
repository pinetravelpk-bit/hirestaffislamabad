import type {Metadata} from 'next';
import {site,abs,hasAddress} from './site';
import {services} from './services';
import {areas} from './areas';

export function meta({title,description,path,noindex=false,image}:{title:string;description:string;path:string;noindex?:boolean;image?:string}):Metadata{
  const url=abs(path);
  const img=image||abs('/opengraph-image/');
  return {
    title:{absolute:title.includes(site.name)?title:`${title} | ${site.name}`},
    description,
    alternates:{canonical:url},
    robots:noindex||!site.indexing?{index:false,follow:true}:{index:true,follow:true,'max-image-preview':'large','max-snippet':-1,'max-video-preview':-1},
    openGraph:{type:'website',url,title,description,siteName:site.name,locale:'en_PK',images:[{url:img,width:1200,height:630,alt:title}]},
    twitter:{card:'summary_large_image',title,description,images:[img]},
  };
}

const orgId=abs('/#organization');
const webId=abs('/#website');

export function organizationSchema(){
  const address:Record<string,string>={'@type':'PostalAddress',addressLocality:site.locality,addressRegion:site.region,addressCountry:site.country};
  if(site.street)address.streetAddress=site.street;
  if(site.postalCode)address.postalCode=site.postalCode;
  const o:Record<string,unknown>={
    '@type':['EmploymentAgency','LocalBusiness'],
    '@id':orgId,name:site.name,legalName:site.legalName,url:site.url,
    logo:abs('/icon-512.png'),image:abs('/opengraph-image/'),
    description:site.description,slogan:site.tagline,email:site.email,
    address,
    geo:{'@type':'GeoCoordinates',latitude:site.geo.lat,longitude:site.geo.lng},
    areaServed:[
      {'@type':'City',name:'Islamabad',sameAs:'https://en.wikipedia.org/wiki/Islamabad'},
      {'@type':'City',name:'Rawalpindi',sameAs:'https://en.wikipedia.org/wiki/Rawalpindi'},
      ...areas.map(a=>({'@type':'Place',name:`${a.name}, ${a.city}`})),
    ],
    knowsAbout:services.map(s=>s.plural),
    knowsLanguage:['en','ur'],
    priceRange:'Fees agreed in writing',
    hasOfferCatalog:{'@type':'OfferCatalog',name:'Staffing services',itemListElement:services.map(s=>({'@type':'Offer',itemOffered:{'@id':abs(`/services/${s.slug}/#service`)}}))},
  };
  if(site.phone)o.telephone=site.phone;
  if(site.hours)o.openingHours=site.hours;
  if(site.founded)o.foundingDate=site.founded;
  const same=[...site.sameAs,site.gbp].filter(Boolean);
  if(same.length)o.sameAs=same;
  if(site.phone||site.whatsapp)o.contactPoint=[{'@type':'ContactPoint',contactType:'customer service',telephone:site.phone||('+'+site.whatsapp),email:site.email,areaServed:'PK',availableLanguage:['English','Urdu']}];
  if(!hasAddress())o['@type']=['EmploymentAgency']; // service-area business without a public storefront
  return o;
}

export function websiteSchema(){
  return {'@type':'WebSite','@id':webId,url:site.url,name:site.name,alternateName:['Hirestaff','HireStaff Islamabad','hirestaffislamabad.pk'],inLanguage:'en-PK',publisher:{'@id':orgId},
    potentialAction:{'@type':'SearchAction',target:{'@type':'EntryPoint',urlTemplate:abs('/find-jobs/?q={search_term_string}')},'query-input':'required name=search_term_string'}};
}

export function breadcrumb(items:[string,string][]){
  return {'@type':'BreadcrumbList',itemListElement:[['Home','/'],...items].map(([name,path],i)=>({'@type':'ListItem',position:i+1,name,item:abs(path)}))};
}

export function faqSchema(faqs:[string,string][]){
  return {'@type':'FAQPage',mainEntity:faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
}

export function webPage({path,title,description,speakable=true}:{path:string;title:string;description:string;speakable?:boolean}){
  const p:Record<string,unknown>={'@type':'WebPage','@id':abs(path)+'#webpage',url:abs(path),name:title,description,isPartOf:{'@id':webId},about:{'@id':orgId},inLanguage:'en-PK',dateModified:site.updated};
  if(speakable)p.speakable={'@type':'SpeakableSpecification',cssSelector:['h1','.hs-answer']};
  return p;
}

export function JsonLd({data}:{data:Record<string,unknown>|Record<string,unknown>[]}){
  const graph=Array.isArray(data)?data:[data];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\\u003c')}}/>;
}
