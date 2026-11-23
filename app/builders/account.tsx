'use client';
import {useEffect,useState} from 'react';
import {Header} from '../next/ui';
import {restoreCV,type CV} from './model';
import {CVSheet} from './sheet';
import {ShareLinks,CopyButton} from './online';
import {BuilderNav} from './shared';
import '../next/next.css';import './builders.css';import './templates.css';

type Acc={username:string;createdAt:string;updatedAt:string;published:boolean;views:number;cv:CV};
const post=async(url:string,method:string,body?:unknown)=>{const r=await fetch(url,{method,headers:{'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body)});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.error||'Something went wrong.');return d};

export default function AccountDashboard({help}:{help:string}){
  const [state,setState]=useState<'loading'|'out'|'in'>('loading'),[acc,setAcc]=useState<Acc|null>(null),[url,setUrl]=useState(''),[msg,setMsg]=useState(''),[err,setErr]=useState(''),[busy,setBusy]=useState(false);
  const [u,setU]=useState(''),[p,setP]=useState(''),[cur,setCur]=useState(''),[next,setNext]=useState(''),[delPw,setDelPw]=useState(''),[confirmDel,setConfirmDel]=useState(false);
  async function load(){const d=await fetch('/api/cv/account/',{cache:'no-store'}).then(r=>r.json()).catch(()=>({signedIn:false}));if(d.signedIn){setAcc({...d.account,cv:restoreCV(d.account.cv)});setUrl(d.url);setState('in')}else setState('out')}
  useEffect(()=>{load()},[]);
  const run=(f:()=>Promise<void>)=>async()=>{setBusy(true);setErr('');setMsg('');try{await f()}catch(e){setErr(e instanceof Error?e.message:'Something went wrong.')}finally{setBusy(false)}};
  const login=run(async()=>{await post('/api/cv/session/','POST',{username:u,password:p});setP('');await load()});
  const logout=run(async()=>{await post('/api/cv/session/','DELETE');setAcc(null);setState('out')});
  const toggle=run(async()=>{const d=await post('/api/cv/account/','PUT',{published:!acc!.published});setAcc({...acc!,published:d.account.published});setMsg(d.account.published?'Your page is visible again.':'Your page is hidden. Only you can see it here.')});
  const changePw=run(async()=>{if(next.length<8)throw new Error('New password must be at least 8 characters.');await post('/api/cv/password/','POST',{current:cur,next});setCur('');setNext('');setMsg('Password changed. Other devices are signed out.')});
  const del=run(async()=>{await post('/api/cv/account/','DELETE',{password:delPw});localStorage.removeItem('hirestaff-cv-v1');setAcc(null);setState('out');setConfirmDel(false);setMsg('Your CV page was deleted.')});

  return <div className="nx hb-app hb-account"><Header studio/><div className="nx-container hb-account-wrap">
    {state==='loading'&&<p className="nx-note">Loading…</p>}
    {state==='out'&&<form className="hb-login" onSubmit={e=>{e.preventDefault();login()}}>
      <p className="nx-kicker">YOUR ONLINE CV</p><h1>Sign in to your CV page</h1><p>Use the username and password you got when you created your page.</p>
      <label className="nx-field">Username<input value={u} onChange={e=>setU(e.target.value.toLowerCase())} autoComplete="username" required autoCapitalize="none"/></label>
      <label className="nx-field">Password<input type="password" value={p} onChange={e=>setP(e.target.value)} autoComplete="current-password" required/></label>
      {err&&<p className="hb-error" role="alert">{err}</p>}{msg&&<p className="hb-ok" role="status">{msg}</p>}
      <button className="nx-btn nx-dark nx-full" disabled={busy}>{busy?'Signing in…':'Sign in'}</button>
      <p className="nx-note">No page yet? <a href="/cv/">Build your free CV</a> and press “Create my CV page”. Forgot your password? <a href={help} target="_blank" rel="noopener">Contact us</a>.</p>
    </form>}
    {state==='in'&&acc&&<div className="hb-dash">
      <div className="hb-dash-main">
        <p className="nx-kicker">MY CV PAGE</p><h1>Hi {acc.cv.name.split(' ')[0]||acc.username} 👋</h1>
        <div className="hb-dash-link"><span className={'hb-dot '+(acc.published?'':'warn')}/><a href={url} target="_blank" rel="noopener">{url.replace(/^https?:\/\//,'')}</a><CopyButton text={url} label="Copy link"/></div>
        <div className="hb-stats"><div><b>{acc.views||0}</b><span>page views</span></div><div><b>{acc.published?'Live':'Hidden'}</b><span>visibility</span></div><div><b>{new Date(acc.updatedAt).toLocaleDateString()}</b><span>last updated</span></div></div>
        {err&&<p className="hb-error" role="alert">{err}</p>}{msg&&<p className="hb-ok" role="status">{msg}</p>}
        <div className="hb-wrap"><a className="nx-btn nx-dark" href="/cv/">Edit my CV & design</a><a className="nx-btn nx-outline" href={url} target="_blank" rel="noopener">View page</a><a className="nx-btn nx-outline" href={url+'?print=1'} target="_blank" rel="noopener">Download PDF</a><button className="nx-btn nx-outline" disabled={busy} onClick={toggle}>{acc.published?'Hide page':'Make page visible'}</button></div>
        <section className="hb-card"><h2>Market your CV</h2><p>Share your link wherever employers look. Every share brings more views.</p><ShareLinks url={url} name={acc.cv.name} headline={acc.cv.headline}/>
          <ul className="hb-tips"><li>Add the link to your WhatsApp status and “About”.</li><li>Put it in your LinkedIn “Contact info → Website” and Facebook bio.</li><li>Paste it in job applications and emails instead of attaching files.</li><li>Print it on your visiting card — it always shows your latest CV.</li></ul></section>
        <section className="hb-card"><h2>Change password</h2><form onSubmit={e=>{e.preventDefault();changePw()}}><div className="hb-grid2"><label className="nx-field">Current password<input type="password" value={cur} onChange={e=>setCur(e.target.value)} autoComplete="current-password" required/></label><label className="nx-field">New password<input type="password" value={next} minLength={8} onChange={e=>setNext(e.target.value)} autoComplete="new-password" required/></label></div><button className="nx-btn nx-outline" disabled={busy}>Update password</button></form></section>
        <section className="hb-card hb-danger"><h2>Account</h2><div className="hb-wrap"><button className="nx-btn nx-outline" onClick={logout} disabled={busy}>Sign out</button>{!confirmDel?<button className="nx-text-button" onClick={()=>setConfirmDel(true)}>Delete my page permanently</button>:<form className="hb-wrap" onSubmit={e=>{e.preventDefault();del()}}><input type="password" placeholder="Your password" value={delPw} onChange={e=>setDelPw(e.target.value)} required/><button className="nx-btn nx-dark" disabled={busy}>Delete forever</button><button type="button" className="nx-text-button" onClick={()=>setConfirmDel(false)}>Cancel</button></form>}</div></section>
      </div>
      <aside className="hb-dash-preview"><CVSheet cv={acc.cv}/></aside>
    </div>}
  </div><BuilderNav active="cv"/></div>;
}
