// CV renderer shared by the builder preview, template thumbnails and public CV pages.
// No hooks or browser APIs, so it renders on the server for /p/<username>/ (SEO + fast first paint).
import type {CSSProperties,ReactNode} from 'react';
import {CV,CVEntry,dateRange,parseSkills,listItems,initials,webURL,templateInfo} from './model';

type Cfg={layout:'single'|'left'|'right'|'orbit';photo:'side'|'head'|null;name:'head'|'side';skills:'plain'|'bars'|'dots'|'chips'};
const cfg:Record<string,Cfg>={
  modern:{layout:'single',photo:null,name:'head',skills:'plain'},
  classic:{layout:'single',photo:null,name:'head',skills:'plain'},
  compact:{layout:'single',photo:null,name:'head',skills:'plain'},
  chips:{layout:'single',photo:null,name:'head',skills:'chips'},
  midnight:{layout:'left',photo:'side',name:'head',skills:'bars'},
  sunrise:{layout:'left',photo:'side',name:'side',skills:'dots'},
  sand:{layout:'left',photo:'head',name:'head',skills:'dots'},
  ribbon:{layout:'left',photo:'side',name:'head',skills:'bars'},
  atlas:{layout:'left',photo:null,name:'head',skills:'bars'},
  timeline:{layout:'right',photo:'side',name:'head',skills:'bars'},
  split:{layout:'right',photo:'head',name:'head',skills:'bars'},
  orbit:{layout:'orbit',photo:'head',name:'head',skills:'bars'},
};

const paths:Record<string,ReactNode>={
  phone:<path d="M5 3h4l2 5-3 2a11 11 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z"/>,
  mail:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
  pin:<><path d="M12 21s7-6.3 7-12a7 7 0 0 0-14 0c0 5.7 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></>,
  web:<><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></>,
};
const Ico=({n}:{n:string})=><svg className="cv-ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{paths[n]}</svg>;

function Photo({cv}:{cv:CV}){return <div className="cv-photo">{cv.photo?<img src={cv.photo} alt={cv.name?`Photo of ${cv.name}`:'Profile photo'}/>:<span aria-hidden="true">{initials(cv.name||'Your Name')}</span>}</div>}

function Name({cv,split}:{cv:CV;split?:boolean}){
  const n=(cv.name||'Your name').trim();const i=n.lastIndexOf(' ');
  return <div className="cv-name"><h2>{split&&i>0?<>{n.slice(0,i)} <b>{n.slice(i+1)}</b></>:n}</h2><h3>{cv.headline||'Your professional headline'}</h3></div>;
}

function Contact({cv}:{cv:CV}){
  const site=webURL(cv.website);
  const rows=[cv.phone&&['phone',cv.phone,`tel:${cv.phone.replace(/[^\d+]/g,'')}`],cv.email&&['mail',cv.email,`mailto:${cv.email}`],cv.city&&['pin',cv.city,''],cv.website&&['web',cv.website.replace(/^https?:\/\//,'').replace(/\/$/,''),site]].filter(Boolean) as [string,string,string][];
  if(!rows.length)return null;
  return <section className="cv-contact"><h4>Contact</h4><ul>{rows.map(([i,t,href])=><li key={i}><Ico n={i}/>{href?<a href={href}>{t}</a>:<span>{t}</span>}</li>)}</ul></section>;
}

function Skills({cv,mode}:{cv:CV;mode:Cfg['skills']}){
  const list=parseSkills(cv.skills);if(!list.length)return null;
  const anyLevel=list.some(s=>s.level!==null);
  if(mode==='plain')return <section><h4>Skills</h4><p>{list.map(s=>s.name).join(', ')}</p></section>;
  if(mode==='chips'||!anyLevel)return <section><h4>Skills</h4><ul className="cv-chips">{list.map((s,i)=><li key={i}>{s.name}</li>)}</ul></section>;
  return <section><h4>Skills</h4><ul className={'cv-skills cv-skills-'+mode}>{list.map((s,i)=><li key={i}><span>{s.name}</span>{s.level!==null&&(mode==='dots'
    ?<i className="cv-dots" aria-label={`${Math.round(s.level/20)} out of 5`}>{[1,2,3,4,5].map(d=><b key={d} className={d<=Math.round(s.level!/20)?'on':''}/>)}</i>
    :<i className="cv-bar" aria-label={`${s.level}%`}><b style={{width:s.level+'%'}}/></i>)}</li>)}</ul></section>;
}

const Entry=(e:CVEntry)=><article key={e.id}><h3>{e.title||'Role or qualification'}</h3><p className="cv-meta">{[e.organisation,e.location].filter(Boolean).join(' · ')}{dateRange(e)&&<span className="cv-date">{dateRange(e)}</span>}</p>{e.details&&<ul>{e.details.split('\n').filter(x=>x.trim()).map((x,i)=><li key={i}>{x.replace(/^\s*[-•]\s*/,'')}</li>)}</ul>}</article>;

function blocks(cv:CV):Record<string,ReactNode>{
  const s:Record<string,ReactNode>={
    profile:cv.summary?<section key="profile"><h4>Profile</h4><p>{cv.summary}</p></section>:null,
    experience:cv.experience.length?<section key="experience" className="cv-entries"><h4>Experience</h4>{cv.experience.map(Entry)}</section>:null,
    education:cv.education.length?<section key="education" className="cv-entries"><h4>Education</h4>{cv.education.map(Entry)}</section>:null,
    projects:cv.projects.length?<section key="projects"><h4>Selected projects</h4>{cv.projects.map(p=><article key={p.id}><h3>{p.title||'Project title'}</h3>{p.url&&<p className="cv-meta">{p.url}</p>}{p.details&&<p>{p.details}</p>}</article>)}</section>:null,
    certifications:cv.certifications?<section key="certifications"><h4>Certifications & achievements</h4><p className="hb-preline">{cv.certifications}</p></section>:null,
    languages:cv.languages?<section key="languages"><h4>Languages</h4><ul className="cv-list">{listItems(cv.languages).map((l,i)=><li key={i}>{l}</li>)}</ul></section>:null,
    interests:cv.interests?<section key="interests"><h4>Interests</h4><ul className="cv-list">{listItems(cv.interests).map((l,i)=><li key={i}>{l}</li>)}</ul></section>:null,
  };
  return s;
}

export function CVSheet({cv}:{cv:CV}){
  const t=templateInfo(cv.template).id,c=cfg[t]||cfg.modern;
  const b=blocks(cv);
  const empty=!cv.summary&&!cv.experience.length&&!cv.education.length;
  const placeholder=empty&&<div className="cv-placeholder"><p>Your story starts here.<br/>Fill in your details to make this CV yours.</p></div>;
  const style={'--cv-accent':cv.accent} as CSSProperties;
  const cls=`cv-sheet cv-${t}`+(c.layout!=='single'?` cv-designer cv-layout-${c.layout}`:'');

  if(c.layout==='single'){
    return <div className="cv-frame"><div className={cls} style={style} aria-label="CV"><header><h2>{cv.name||'Your name'}</h2><h3>{cv.headline||'Your professional headline'}</h3>
      <p className="cv-contactline">{[cv.city,cv.email,cv.phone,cv.website].filter(Boolean).join(' · ')||'Your contact information'}</p></header>
      {b.profile}{b.experience}{b.education}<Skills cv={cv} mode={c.skills}/>{b.projects}{b.certifications}{b.languages}{b.interests}{placeholder}</div></div>;
  }
  if(c.layout==='orbit'){
    return <div className="cv-frame"><div className={cls} style={style} aria-label="CV"><header className="cv-head"><Photo cv={cv}/><Name cv={cv} split/></header>
      <div className="cv-cols"><div>{b.profile}<Contact cv={cv}/>{b.languages}</div><div>{b.education}<Skills cv={cv} mode={c.skills}/>{b.interests}</div><div>{b.experience}{b.projects}{b.certifications}</div></div>{placeholder}</div></div>;
  }
  const head=c.name==='head'&&<header className="cv-head">{c.photo==='head'&&<Photo cv={cv}/>}<Name cv={cv} split={t!=='atlas'}/></header>;
  return <div className="cv-frame"><div className={cls} style={style} aria-label="CV">
    {head}
    <aside className="cv-side">{c.photo==='side'&&<Photo cv={cv}/>}{c.name==='side'&&<Name cv={cv}/>}<Contact cv={cv}/><Skills cv={cv} mode={c.skills}/>{b.languages}{b.interests}{t==='timeline'||t==='split'?b.certifications:null}</aside>
    <main className="cv-main">{b.profile}{b.experience}{b.education}{b.projects}{t==='timeline'||t==='split'?null:b.certifications}{placeholder}</main>
  </div></div>;
}
