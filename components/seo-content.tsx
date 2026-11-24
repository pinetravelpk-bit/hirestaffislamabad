import {content} from '../lib/content';
import {site,abs} from '../lib/site';
import {JsonLd} from '../lib/seo';
import './seo-content.css';

export default function SeoContent({page,path,wrap=true}:{page:keyof typeof content|string;path:string;wrap?:boolean}){
  const c=content[page];if(!c)return null;
  const ld=[
    {'@type':'WebPage','@id':abs(path)+'#webpage',url:abs(path),name:c.title,description:c.answer,inLanguage:'en-PK',dateModified:site.updated,isPartOf:{'@id':abs('/#website')},about:{'@id':abs('/#organization')},speakable:{'@type':'SpeakableSpecification',cssSelector:['.sc-title','.sc-answer']}},
    {'@type':'FAQPage',mainEntity:c.faqs.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))},
    {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:abs('/')},...(path==='/'?[]:[{'@type':'ListItem',position:2,name:c.title,item:abs(path)}])]},
  ];
  const body=<section className="sc nx-container" aria-labelledby={'sc-'+page}>
    <JsonLd data={ld}/>
    <p className="nx-kicker">{c.kicker}</p>
    <h2 className="sc-title" id={'sc-'+page}>{c.title}</h2>
    <p className="sc-answer"><strong>Quick answer: </strong>{c.answer}</p>
    <div className="sc-body">
      {c.blocks.map(b=><div className="sc-block" key={b.h}>
        <h3>{b.h}</h3>
        {b.p?.map((t,i)=><p key={i}>{t}</p>)}
        {b.list&&<ul>{b.list.map(t=><li key={t}>{t}</li>)}</ul>}
        {b.table&&<table><tbody>{b.table.map(([k,v])=><tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}</tbody></table>}
      </div>)}
    </div>
    <h3 className="sc-faq-title">Frequently asked questions</h3>
    <div className="sc-faqs">{c.faqs.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
    <p className="sc-updated">Last updated: <time dateTime={site.updated}>{new Date(site.updated).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'})}</time> · Hirestaff Islamabad, Islamabad Capital Territory, Pakistan</p>
  </section>;
  return wrap?<div className="nx sc-wrap">{body}</div>:body;
}
