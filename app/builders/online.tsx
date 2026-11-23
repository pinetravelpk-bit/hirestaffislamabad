'use client';
import {useEffect,useState} from 'react';
import type {CV} from './model';

type State={user:{username:string}|null;cv:{published:boolean;showContact:boolean;views:number;updated:string}|null;error?:string;message?:string;data?:unknown};

export async function account(payload?:Record<string,unknown>,query=''):Promise<State>{
  const r=await fetch('/api/account/'+query,payload?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}:{cache:'no-store'});
  let b:State;try{b=await r.json()}catch{throw new Error('Online CVs are available on the live website.')}
  if(!r.ok)throw new Error(b.error||'Something went wrong. Please try again.');return b;
}

export function ShareLinks({url,name}:{url:string;name:string}){
  const [copied,setCopied]=useState(false);const t=encodeURIComponent(`${name||'My'} CV: ${url}`),u=encodeURIComponent(url);
  return <div className="oc-share">
    <a href={`https://wa.me/?text=${t}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
    <a href={`https://www.facebook.com/sharer/sharer.php?u=${u}`} target="_blank" rel="noopener noreferrer">Facebook</a>
    <a href={`https://twitter.com/intent/tweet?text=${t}`} target="_blank" rel="noopener noreferrer">X</a>
    <a href={`mailto:?subject=${encodeURIComponent((name||'My')+' CV')}&body=${t}`}>Email</a>
    <button type="button" onClick={async()=>{try{await navigator.clipboard.writeText(url);setCopied(true);setTimeout(()=>setCopied(false),2000)}catch{}}}>{copied?'Copied ✓':'Copy link'}</button>
  </div>;
}

export default function OnlineCV({cv,onLoad}:{cv:CV;onLoad:(data:unknown)=>void}){
  const [s,setS]=useState<State|null>(null),[mode,setMode]=useState<'register'|'login'>('register'),[f,setF]=useState({username:'',password:''});
  const [busy,setBusy]=useState(false),[err,setErr]=useState(''),[ok,setOk]=useState('');
  useEffect(()=>{account().then(setS).catch(e=>setErr(e.message))},[]);
  const run=async(p:Record<string,unknown>,msg='')=>{setBusy(true);setErr('');setOk('');try{const r=await account(p);setS(r);if(msg)setOk(msg);return r}catch(e){setErr(e instanceof Error?e.message:'Error')}finally{setBusy(false)}};
  const url=s?.user?`${location.origin}/cv/${s.user.username}/`:'';
  return <section className="oc-panel" id="online-cv">
    <h3>Your online CV page</h3>
    {!s?<p className="nx-note">{err||'Checking your account…'}</p>:!s.user?<>
      <p className="nx-note" style={{marginTop:0}}>Create a free account to save your CV online, get your own link (hirestaffislamabad.pk/cv/your-name) and share it anywhere.</p>
      <div className="oc-tabs"><button aria-pressed={mode==='register'} onClick={()=>setMode('register')}>Create account</button><button aria-pressed={mode==='login'} onClick={()=>setMode('login')}>Log in</button></div>
      <form onSubmit={async e=>{e.preventDefault();const r=await run({action:mode,...f});if(r?.user&&mode==='register'&&cv.name.trim())await run({action:'save',cv},'Account created and your CV is online!');else if(r?.user)setOk(mode==='login'?'Welcome back!':'Account created.')}}>
        <label className="nx-field">Username {mode==='register'&&<small>(your link: /cv/{f.username||'your-name'})</small>}<input value={f.username} autoComplete="username" onChange={e=>setF({...f,username:e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,'')})} maxLength={30} required placeholder="e.g. ayesha-khan"/></label>
        <label className="nx-field">Password<input type="password" value={f.password} autoComplete={mode==='register'?'new-password':'current-password'} onChange={e=>setF({...f,password:e.target.value})} minLength={8} required placeholder="At least 8 characters"/></label>
        <button className="nx-btn nx-dark nx-full" disabled={busy}>{busy?'Please wait…':mode==='register'?'Create account & publish CV':'Log in'}</button>
      </form>
      <p className="nx-note">Keep your username and password safe — you need them to edit your CV later.</p>
    </>:<>
      <p className="nx-note" style={{marginTop:0}}>Logged in as <strong>{s.user.username}</strong> · <a href="/account/">Manage account</a> · <button className="nx-text-button" onClick={()=>run({action:'logout'})}>Log out</button></p>
      {s.cv&&<><div className="oc-link">🔗 <a href={url} target="_blank" rel="noopener">{url}</a></div><ShareLinks url={url} name={cv.name}/>
        <label className="oc-toggle"><input type="checkbox" checked={s.cv.published} onChange={e=>run({action:'settings',published:e.target.checked,showContact:s.cv!.showContact})}/>Public — anyone with the link can view</label>
        <label className="oc-toggle"><input type="checkbox" checked={s.cv.showContact} onChange={e=>run({action:'settings',published:s.cv!.published,showContact:e.target.checked})}/>Show phone & email on my online CV</label>
        <p className="nx-note">{s.cv.views} views · last saved {new Date(s.cv.updated).toLocaleString()}</p></>}
      <div className="hb-wrap"><button className="nx-btn nx-dark" disabled={busy} onClick={()=>run({action:'save',cv,published:s.cv?.published??true,showContact:s.cv?.showContact??true},'Saved. Your online CV is updated.')}>{busy?'Saving…':s.cv?'Save changes online':'Publish my CV online'}</button>
      {s.cv&&<button className="nx-btn nx-outline" disabled={busy} onClick={async()=>{setBusy(true);try{const r=await account(undefined,'?cv=1');if(r.data)onLoad(r.data)}catch(e){setErr(e instanceof Error?e.message:'Error')}finally{setBusy(false)}}}>Load saved version</button>}</div>
    </>}
    {err&&s&&<p className="oc-err" role="alert">{err}</p>}{ok&&<p className="oc-ok" role="status">{ok}</p>}
  </section>;
}
