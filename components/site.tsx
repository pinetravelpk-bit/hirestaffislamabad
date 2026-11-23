import {Header,MobileNav,Icon,Logo} from '../app/next/ui';
import {services} from '../lib/services';
import {areaBySlug} from '../lib/areas';
import {site,telLink,whatsappLink} from '../lib/site';
import '../app/next/next.css';
import './site.css';

export function Footer(){
  const wa=whatsappLink('Assalam o Alaikum, I would like to hire staff.');
  return <footer className="nx-footer nx-container hs-footer">
    <div><Logo/><p>{site.tagline}.</p>
      <address className="hs-nap">
        <strong>{site.name}</strong><br/>
        {site.street?<>{site.street}<br/></>:null}{site.locality}, {site.region}, Pakistan<br/>
        {site.phone&&<><a href={telLink()}>{site.phone}</a><br/></>}
        {wa&&<><a href={wa} rel="nofollow">WhatsApp us</a><br/></>}
        <a href={'mailto:'+site.email}>{site.email}</a>
      </address>
    </div>
    <div><strong>Hire staff</strong>{services.slice(0,8).map(s=><a key={s.slug} href={`/services/${s.slug}/`}>{s.plural}</a>)}<a href="/services/">All services</a></div>
    <div><strong>Islamabad & Rawalpindi</strong>{['dha-islamabad','bahria-town','f-7','f-11','g-11','e-11','i-8'].map(a=><a key={a} href={`/areas/${a}/`}>Staff in {areaBySlug(a)?.name}</a>)}<a href="/areas/">All areas</a></div>
    <div><strong>Company</strong><a href="/about/">About us</a><a href="/how-it-works/">How it works</a><a href="/request-staff/">Request staff</a><a href="/find-jobs/">Find jobs</a><a href="/cv/">Free CV maker</a><a href="/post-job/">Post a job free</a><a href="/guides/">Hiring guides</a><a href="/faqs/">FAQs</a><a href="/contact/">Contact</a><a href="/privacy/">Privacy</a><a href="/terms/">Terms</a></div>
    <p className="nx-footer-note">© {new Date().getFullYear()} {site.name} · hirestaffislamabad.pk · Serving Islamabad Capital Territory and Rawalpindi.</p>
  </footer>;
}

export function Shell({children}:{children:React.ReactNode}){
  return <div className="nx hs-page"><a className="hs-skip" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/><MobileNav/></div>;
}

export function Crumbs({items}:{items:[string,string][]}){
  return <nav aria-label="Breadcrumb" className="hs-crumbs nx-container"><ol><li><a href="/">Home</a></li>{items.map(([n,h],i)=><li key={h}>{i===items.length-1?<span aria-current="page">{n}</span>:<a href={h}>{n}</a>}</li>)}</ol></nav>;
}

export function Hero({kicker,title,em,answer,children}:{kicker:string;title:string;em?:string;answer:string;children?:React.ReactNode}){
  return <section className="hs-hero nx-container"><p className="nx-kicker"><Icon name="spark"/> {kicker}</p><h1>{title}{em&&<><br/><em>{em}</em></>}</h1><p className="hs-answer">{answer}</p>{children}<p className="hs-updated">Last updated: <time dateTime={site.updated}>{new Date(site.updated).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}</time></p></section>;
}

export function Faqs({faqs,title='Frequently asked questions'}:{faqs:[string,string][];title?:string}){
  if(!faqs.length)return null;
  return <section className="hs-section nx-container" id="faqs"><h2>{title}</h2><div className="hs-faqs">{faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div></section>;
}

export function Cta({title='Tell us who you need.',text='Share your requirement and we will shortlist suitable candidates in Islamabad or Rawalpindi.'}:{title?:string;text?:string}){
  const wa=whatsappLink('Assalam o Alaikum, I would like to hire staff.');
  return <section className="nx-final hs-cta"><div className="nx-container"><span className="nx-big-star"><Icon name="spark"/></span><p className="nx-kicker">HIRE STAFF IN ISLAMABAD</p><h2>{title}</h2><p className="hs-cta-text">{text}</p><div className="hs-actions"><a href="/request-staff/" className="nx-btn nx-dark">Request staff <Icon name="plus"/></a>{wa&&<a href={wa} className="nx-btn hs-light" rel="nofollow">WhatsApp</a>}{site.phone&&<a href={telLink()} className="nx-btn hs-light">Call {site.phone}</a>}</div></div></section>;
}

export function Cards({items}:{items:{href:string;title:string;text:string;tag?:string}[]}){
  return <div className="hs-cards">{items.map(i=><a key={i.href} href={i.href} className="hs-card">{i.tag&&<span className="nx-tag">{i.tag}</span>}<h3>{i.title}</h3><p>{i.text}</p><span className="hs-more">Learn more <Icon name="plus"/></span></a>)}</div>;
}
