'use client';
// Online CV page: publish modal, status bar and share buttons used by the builder, dashboard and public page.
import {useEffect,useState} from 'react';
import type {CV} from './model';

export type OnlineState={checked:boolean;signedIn:boolean;username?:string;url?:string;published?:boolean};

export async function saveOnline(cv:CV){try{const r=await fetch('/api/cv/account/',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({cv})});return r.ok}catch{return false}}

async function copy(text:string){try{await navigator.clipboard.writeText(text);return true}catch{const t=document.createElement('textarea');t.value=text;document.body.appendChild(t);t.select();const ok=document.execCommand('copy');t.remove();return ok}}

export function CopyButton({text,label='Copy'}:{text:string;label?:string}){const [done,setDone]=useState(false);return <button type="button" className="hb-copy" onClick={async()=>{if(await copy(text)){setDone(true);setTimeout(()=>setDone(false),1600)}}}>{done?'Copied ✓':label}</button>}

export function ShareLinks({url,name,headline}:{url:string;name:string;headline?:string}){
  const text=`${name}${headline?' – '+headline:''} | My CV: ${url}`;const e=encodeURIComponent;
  const links=[['WhatsApp',`https://wa.me/?text=${e(text)}`,'#25d366'],['Facebook',`https://www.facebook.com/sharer/sharer.php?u=${e(url)}`,'#1877f2'],['LinkedIn',`https://www.linkedin.com/sharing/share-offsite/?url=${e(url)}`,'#0a66c2'],['X',`https://twitter.com/intent/tweet?text=${e(text)}`,'#111'],['Email',`mailto:?subject=${e('CV – '+name)}&body=${e(text)}`,'#6b6b6b']];
  const [canShare,setCanShare]=useState(false);useEffect(()=>setCanShare(typeof navigator!=='undefined'&&!!navigator.share),[]);
  return <div className="hb-share">{links.map(([l,h,c])=><a key={l} href={h} target="_blank" rel="noopener noreferrer" style={{background:c}}>{l}</a>)}<CopyButton text={url} label="Copy link"/>{canShare&&<button type="button" className="hb-copy" onClick={()=>navigator.share({title:`${name} – CV`,text,url}).catch(()=>{})}>More…</button>}</div>;
}

export function OnlineBar({online,saveState,onPublish}:{online:OnlineState;saveState:string;onPublish:()=>void}){
  if(!online.checked)return null;
  if(!online.signedIn)return <div className="hb-online nx-container"><div><strong>Get your own CV web page — free.</strong><span>A link you can share on WhatsApp, LinkedIn or anywhere, plus a username & password to update it any time.</span></div><div className="hb-wrap"><button className="nx-btn nx-dark" onClick={onPublish}>Create my CV page</button><a className="nx-text-button" href="/cv/account/">Sign in</a></div></div>;
  return <div className="hb-online is-live nx-container"><div><strong>Signed in as {online.username}{online.published===false&&' · page hidden'}</strong><span>{saveState==='saving'?'Saving…':saveState==='error'?'Not saved — retrying when you edit again':'All changes are live on '}{saveState!=='saving'&&saveState!=='error'&&<a href={online.url} target="_blank" rel="noopener">{online.url?.replace(/^https?:\/\//,'')}</a>}</span></div><div className="hb-wrap"><a className="nx-btn nx-outline" href={online.url} target="_blank" rel="noopener">View page</a><a className="nx-btn nx-dark" href="/cv/account/">Dashboard</a></div></div>;
}

export function PublishModal({cv,close,done}:{cv:CV;close:()=>void;done:(o:OnlineState)=>void}){
  const [username,setUsername]=useState(''),[avail,setAvail]=useState<null|boolean>(null),[agree,setAgree]=useState(true),[busy,setBusy]=useState(false),[error,setError]=useState(''),[result,setResult]=useState<null|{username:string;password:string;url:string}>(null);
  useEffect(()=>{fetch('/api/cv/username/?name='+encodeURIComponent(cv.name)).then(r=>r.json()).then(d=>{setUsername(d.username);setAvail(true)}).catch(()=>{})},[cv.name]);
  useEffect(()=>{if(!username){setAvail(null);return}const t=setTimeout(()=>fetch('/api/cv/username/?check='+encodeURIComponent(username)).then(r=>r.json()).then(d=>setAvail(d.available)).catch(()=>{}),350);return ()=>clearTimeout(t)},[username]);
  async function create(){setBusy(true);setError('');try{const r=await fetch('/api/cv/account/',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({cv,username})});const d=await r.json();if(!r.ok)throw new Error(d.error||'Could not create your page.');setResult(d);done({checked:true,signedIn:true,username:d.username,url:d.url,published:true})}catch(e){setError(e instanceof Error?e.message:'Could not create your page.')}finally{setBusy(false)}}
  const details=result?`My CV page: ${result.url}\nUsername: ${result.username}\nPassword: ${result.password}\nSign in: ${location.origin}/cv/account/`:'';
  return <div className="hb-modal-backdrop" onClick={e=>{if(e.target===e.currentTarget&&!busy)close()}}><div className="hb-modal hb-publish" role="dialog" aria-modal="true" aria-labelledby="pub-title">
    {!result?<>
      <h2 id="pub-title">Your CV, online.</h2>
      <p>We’ll create a public page for your CV and give you a username and password so you can edit it, hide it or share it from any phone.</p>
      <label className="nx-field">Choose your link<div className="hb-url-input"><span>{typeof location!=='undefined'?location.host:''}/p/</span><input value={username} maxLength={30} autoFocus onChange={e=>setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,''))} aria-describedby="pub-avail"/></div></label>
      <p id="pub-avail" className={'hb-avail '+(avail===false?'bad':avail?'good':'')}>{avail===null?' ':avail?'✓ Available':'✗ Taken or not allowed — 3–30 letters, numbers or dashes'}</p>
      <label className="nx-checkbox"><input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)}/>Anyone with the link can see my CV (name, contact details and photo I added). I can hide or delete it any time.</label>
      {error&&<p className="hb-error" role="alert">{error}</p>}
      <div className="hb-wrap"><button className="nx-btn nx-outline" onClick={close} disabled={busy}>Not now</button><button className="nx-btn nx-dark" onClick={create} disabled={busy||!agree||avail===false||!username}>{busy?'Creating…':'Create my page'}</button></div>
    </>:<>
      <h2 id="pub-title">Your page is live 🎉</h2>
      <p><strong>Save these details now</strong> — the password is shown only once. Use them at <b>/cv/account/</b> to edit your CV later.</p>
      <dl className="hb-creds"><div><dt>Page link</dt><dd><a href={result.url} target="_blank" rel="noopener">{result.url}</a><CopyButton text={result.url}/></dd></div><div><dt>Username</dt><dd><code>{result.username}</code><CopyButton text={result.username}/></dd></div><div><dt>Password</dt><dd><code>{result.password}</code><CopyButton text={result.password}/></dd></div></dl>
      <CopyButton text={details} label="Copy all login details"/>
      <h3 className="hb-share-title">Share it</h3><ShareLinks url={result.url} name={cv.name} headline={cv.headline}/>
      <div className="hb-wrap"><a className="nx-btn nx-outline" href={result.url} target="_blank" rel="noopener">Open my page</a><a className="nx-btn nx-dark" href="/cv/account/">Go to my dashboard</a><button className="nx-text-button" onClick={close}>Keep editing</button></div>
    </>}
  </div></div>;
}
