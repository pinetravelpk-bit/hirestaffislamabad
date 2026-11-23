'use client';
import {CV,CVEntry,dateRange,skillList} from './model';
import './designs.css';

const lines=(s:string)=>s.split('\n').map(x=>x.replace(/^\s*[-•]\s*/,'').trim()).filter(Boolean);
const split=(name:string)=>{const p=(name||'Your Name').trim().split(/\s+/);return p.length>1?[p.slice(0,-1).join(' '),p[p.length-1]]:[p[0],'']};

function Photo({cv,cls='ds-photo'}:{cv:CV;cls?:string}){
  return <div className={cls}>{cv.photo?<img src={cv.photo} alt={cv.name||'Profile photo'}/>:<span aria-hidden="true">{(cv.name||'?').trim().split(/\s+/).map(w=>w[0]).slice(0,2).join('').toUpperCase()}</span>}</div>;
}
function Contact({cv,icons=true}:{cv:CV;icons?:boolean}){
  const rows:[string,string][]=([['☎',cv.phone],['✉',cv.email],['⌂',cv.city],['⊕',cv.website.replace(/^https?:\/\//,'')]] as [string,string][]).filter(r=>r[1]);
  if(!rows.length)return null;
  return <ul className="ds-contact">{rows.map(([i,v])=><li key={i}>{icons&&<b aria-hidden="true">{i}</b>}<span>{v}</span></li>)}</ul>;
}
function Entries({items,timeline=false,dates='inline'}:{items:CVEntry[];timeline?:boolean;dates?:'inline'|'side'}){
  return <div className={'ds-entries'+(timeline?' ds-tl':'')+(dates==='side'?' ds-side-dates':'')}>{items.map(e=><article key={e.id}>
    {dates==='side'&&<div className="ds-date">{dateRange(e)}</div>}
    <div><h5>{e.title||'Title'}</h5><p className="ds-meta">{[e.organisation,e.location,dates==='inline'?dateRange(e):''].filter(Boolean).join(' · ')}</p>
    {e.details&&<ul>{lines(e.details).map((x,i)=><li key={i}>{x}</li>)}</ul>}</div></article>)}</div>;
}
function Skills({cv,style='bar'}:{cv:CV;style?:'bar'|'dots'|'chips'}){
  const list=skillList(cv.skills);if(!list.length)return null;
  if(style==='chips')return <div className="ds-chips">{list.map(s=><span key={s.name}>{s.name}</span>)}</div>;
  return <ul className={'ds-skills ds-'+style}>{list.map(s=><li key={s.name}><span>{s.name}</span>{style==='bar'?<i><b style={{width:s.level+'%'}}/></i>:<em>{[1,2,3,4,5].map(n=><b key={n} className={n<=Math.round(s.level/20)?'on':''}/>)}</em>}</li>)}</ul>;
}
function H({children}:{children:React.ReactNode}){return <h4 className="ds-h">{children}</h4>}
function Extras({cv}:{cv:CV}){
  return <>{cv.projects.length>0&&<section><H>Projects</H><div className="ds-entries">{cv.projects.map(p=><article key={p.id}><div><h5>{p.title||'Project'}</h5>{p.url&&<p className="ds-meta">{p.url.replace(/^https?:\/\//,'')}</p>}{p.details&&<p>{p.details}</p>}</div></article>)}</div></section>}
  {cv.certifications&&<section><H>Certifications</H><ul className="ds-list">{lines(cv.certifications).map((x,i)=><li key={i}>{x}</li>)}</ul></section>}</>;
}
const Langs=({cv}:{cv:CV})=>cv.languages?<section><H>Languages</H><p>{cv.languages}</p></section>:null;
const Summary=({cv,title='Profile'}:{cv:CV;title?:string})=>cv.summary?<section><H>{title}</H><p>{cv.summary}</p></section>:null;
const Exp=({cv,...o}:{cv:CV;timeline?:boolean;dates?:'inline'|'side'})=>cv.experience.length?<section><H>Work experience</H><Entries items={cv.experience} {...o}/></section>:null;
const Edu=({cv,...o}:{cv:CV;timeline?:boolean;dates?:'inline'|'side'})=>cv.education.length?<section><H>Education</H><Entries items={cv.education} {...o}/></section>:null;

export function DesignSheet({cv}:{cv:CV}){
  const [first,last]=split(cv.name);
  const style={'--a':cv.accent} as React.CSSProperties;
  const t=cv.template;
  const name=<h2 className="ds-name">{first} <strong>{last}</strong></h2>;
  const role=<p className="ds-role">{cv.headline||'Your professional headline'}</p>;
  let body:React.ReactNode;
  if(t==='executive')body=<div className="ds-grid ds-g-side">
    <aside className="ds-dark"><Photo cv={cv}/><div className="ds-ribbon">{name}{role}</div><Summary cv={cv} title="About"/><section><H>Contact</H><Contact cv={cv}/></section><Langs cv={cv}/></aside>
    <main>{cv.skills&&<section><H>Professional skills</H><Skills cv={cv}/></section>}<Edu cv={cv} timeline/><Exp cv={cv} timeline/><Extras cv={cv}/></main></div>;
  else if(t==='slate')body=<div className="ds-grid ds-g-side">
    <aside className="ds-dark"><Photo cv={cv}/><section><H>Contact me</H><Contact cv={cv}/></section><Edu cv={cv}/><Langs cv={cv}/></aside>
    <main><header className="ds-head">{name}{role}</header><Summary cv={cv} title="About me"/><Exp cv={cv} timeline/>{cv.skills&&<section><H>Skills</H><Skills cv={cv}/></section>}<Extras cv={cv}/></main></div>;
  else if(t==='orbit')body=<div className="ds-orbit">
    <header><div className="ds-band"/><Photo cv={cv}/>{name}{role}</header>
    <div className="ds-cols3"><div><Summary cv={cv} title="About me"/><section><H>Contact info</H><Contact cv={cv}/></section><Langs cv={cv}/></div>
    <div><Edu cv={cv}/><Extras cv={cv}/></div><div><Exp cv={cv}/>{cv.skills&&<section><H>Skills</H><Skills cv={cv}/></section>}</div></div></div>;
  else if(t==='teal')body=<div className="ds-teal">
    <div className="ds-topbar"><Contact cv={cv}/></div><header className="ds-head">{name}{role}{cv.summary&&<p className="ds-lead">{cv.summary}</p>}</header>
    <div className="ds-grid ds-g-2"><div><Edu cv={cv}/>{cv.skills&&<section><H>Key skills</H><Skills cv={cv}/></section>}<Langs cv={cv}/></div><div><Exp cv={cv}/><Extras cv={cv}/></div></div></div>;
  else if(t==='arc')body=<div className="ds-grid ds-g-side">
    <aside className="ds-color"><Photo cv={cv}/>{name}{role}<section><H>Contact me</H><Contact cv={cv} icons={false}/></section><Edu cv={cv}/><Langs cv={cv}/></aside>
    <main><Summary cv={cv}/><Exp cv={cv} dates="side"/>{cv.skills&&<section><H>Skills</H><Skills cv={cv} style="dots"/></section>}<Extras cv={cv}/></main></div>;
  else if(t==='timeline')body=<div className="ds-single">
    <header className="ds-head ds-split"><div>{name}{role}</div><Photo cv={cv}/></header><Contact cv={cv}/><Summary cv={cv}/>
    <Exp cv={cv} timeline dates="side"/><Edu cv={cv} timeline dates="side"/>{cv.skills&&<section><H>Skills</H><Skills cv={cv} style="chips"/></section>}<Langs cv={cv}/><Extras cv={cv}/></div>;
  else if(t==='bold')body=<div className="ds-bold">
    <header><Photo cv={cv}/><div>{name}{role}<Contact cv={cv}/></div></header>
    <div className="ds-grid ds-g-2b"><div><Summary cv={cv} title="Profile"/><Exp cv={cv}/><Extras cv={cv}/></div><div><Edu cv={cv}/>{cv.skills&&<section><H>Skills</H><Skills cv={cv}/></section>}<Langs cv={cv}/></div></div></div>;
  else body=<div className="ds-single ds-elegant">
    <header>{name}{role}<Contact cv={cv} icons={false}/></header><Summary cv={cv}/><Exp cv={cv} dates="side"/><Edu cv={cv} dates="side"/>{cv.skills&&<section><H>Skills</H><Skills cv={cv} style="chips"/></section>}<Langs cv={cv}/><Extras cv={cv}/></div>;
  return <div className={'ds-sheet ds-'+t} style={style} aria-label="CV preview">{body}</div>;
}
