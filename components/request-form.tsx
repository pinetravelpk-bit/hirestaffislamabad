'use client';
import {useState} from 'react';
import {Icon} from '../app/next/ui';

type Props={services:{slug:string;plural:string}[];areas:{slug:string;name:string}[];whatsapp:string;email:string;defaultService?:string;defaultArea?:string;compact?:boolean};

export default function RequestForm({services,areas,whatsapp,email,defaultService='',defaultArea='',compact=false}:Props){
  const [f,setF]=useState({who:'',service:defaultService,area:defaultArea,arrangement:'',start:'',name:'',phone:'',details:''});
  const [error,setError]=useState('');const [sent,setSent]=useState('');
  const set=(k:keyof typeof f)=>(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>setF({...f,[k]:e.target.value});
  const svc=services.find(s=>s.slug===f.service)?.plural||f.service;const ar=areas.find(a=>a.slug===f.area)?.name||f.area;
  const text=()=>f.who==='job'
    ?`Assalam o Alaikum, I am looking for a job.\nWork: ${svc||'-'}\nArea: ${ar||'-'}\nName: ${f.name}\nPhone: ${f.phone}\n${f.details}`
    :`Assalam o Alaikum, I want to hire staff.\nStaff needed: ${svc||'-'}\nArea: ${ar||'-'}\nArrangement: ${f.arrangement||'-'}\nStart: ${f.start||'-'}\nName: ${f.name}\nPhone: ${f.phone}\nDetails: ${f.details}`;
  function submit(channel:'wa'|'email'){
    if(!f.who){setError('Please choose whether you are hiring or looking for a job.');return}
    if(f.name.trim().length<2||f.phone.replace(/\D/g,'').length<10){setError('Please add your name and a phone number we can call back.');return}
    setError('');
    const url=channel==='wa'&&whatsapp?`https://wa.me/${whatsapp}?text=${encodeURIComponent(text())}`:`mailto:${email}?subject=${encodeURIComponent(f.who==='job'?'Job enquiry':'Staff request: '+(svc||'staff'))}&body=${encodeURIComponent(text())}`;
    window.open(url,'_blank','noopener');setSent('Your message is ready in '+(channel==='wa'?'WhatsApp':'your email app')+'. Press send to reach our team.');
  }
  return <form className={'hs-form'+(compact?' compact':'')} onSubmit={e=>{e.preventDefault();submit(whatsapp?'wa':'email')}} aria-label="Request staff or find a job">
    <fieldset className="hs-who"><legend>I am…</legend>
      <label className={f.who==='hire'?'on':''}><input type="radio" name="who" value="hire" checked={f.who==='hire'} onChange={set('who')}/>Hiring staff</label>
      <label className={f.who==='job'?'on':''}><input type="radio" name="who" value="job" checked={f.who==='job'} onChange={set('who')}/>Looking for a job</label>
    </fieldset>
    <div className="hs-grid2">
      <label className="nx-field">{f.who==='job'?'Work I am looking for':'Staff needed'}<select value={f.service} onChange={set('service')}><option value="">Choose…</option>{services.map(s=><option key={s.slug} value={s.slug}>{s.plural}</option>)}<option value="Other">Other</option></select></label>
      <label className="nx-field">Area<select value={f.area} onChange={set('area')}><option value="">Choose…</option>{areas.map(a=><option key={a.slug} value={a.slug}>{a.name}</option>)}<option value="Other">Other</option></select></label>
    </div>
    {f.who!=='job'&&!compact&&<div className="hs-grid2">
      <label className="nx-field">Arrangement<select value={f.arrangement} onChange={set('arrangement')}><option value="">Choose…</option><option>Live-in</option><option>Live-out (full day)</option><option>Part-time</option><option>Shift</option></select></label>
      <label className="nx-field">Start date<input type="date" value={f.start} onChange={set('start')}/></label>
    </div>}
    <div className="hs-grid2">
      <label className="nx-field">Your name<input autoComplete="name" value={f.name} onChange={set('name')} maxLength={80} required/></label>
      <label className="nx-field">Phone / WhatsApp<input type="tel" autoComplete="tel" inputMode="tel" placeholder="03xx xxxxxxx" value={f.phone} onChange={set('phone')} maxLength={20} required/></label>
    </div>
    {!compact&&<label className="nx-field">Details (duties, hours, salary)<textarea rows={3} value={f.details} onChange={set('details')} maxLength={1200} placeholder="e.g. Live-in maid for a family of 4 in F-11, cleaning and laundry, Sunday off"/></label>}
    {error&&<p className="jp-errors" role="alert">{error}</p>}
    <div className="hs-actions">{whatsapp?<><button className="nx-btn nx-dark" type="submit"><Icon name="spark"/>Send on WhatsApp</button><button type="button" className="nx-btn nx-outline" onClick={()=>submit('email')}>Send by email</button></>:<button className="nx-btn nx-dark" type="submit"><Icon name="spark"/>Send request</button>}</div>
    {sent&&<p className="jp-success" role="status">{sent}</p>}
    <p className="nx-note">Free to request. We use your details only to respond to this enquiry.</p>
  </form>;
}
