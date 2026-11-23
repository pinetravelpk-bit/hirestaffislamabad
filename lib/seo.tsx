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
