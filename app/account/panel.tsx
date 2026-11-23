'use client';
import {useEffect,useState} from 'react';
import {Header} from '../next/ui';
import {account,ShareLinks} from '../builders/online';
import '../next/next.css';
import '../builders/builders.css';
import '../builders/designs.css';

type S=Awaited<ReturnType<typeof account>>;
export default function AccountPage(){
  const [s,setS]=useState<S|null>(null),[err,setErr]=useState(''),[ok,setOk]=useState(''),[busy,setBusy]=useState(false);
  const [login,setLogin]=useState({username:'',password:''}),[pw,setPw]=useState({current:'',next:''}),[del,setDel]=useState('');
  useEffect(()=>{account().then(setS).catch(e=>setErr(e.message))},[]);
  const run=async(p:Record<string,unknown>)=>{setBusy(true);setErr('');setOk('');try{const r=await account(p);setS(r);if(r.message)setOk(r.message);return r}catch(e){setErr(e instanceof Error?e.message:'Error')}finally{setBusy(false)}};
  const url=s?.user?`${location.origin}/cv/${s.user.username}/`:'';
  return <div className="nx hb-app"><Header/><main className="nx-container" style={{maxWidth:720,paddingBlock:36}}>
    <p className="nx-kicker">YOUR ACCOUNT</p><h1 style={{fontSize:'clamp(32px,5vw,52px)',margin:'0 0 20px'}}>Manage your online CV.</h1>
    {!s?<p>{err||'Loading…'}</p>:!s.user?<section className="oc-panel"><h3>Log in</h3>
      <form onSubmit={e=>{e.preventDefault();run({action:'login',...login})}}>
        <label className="nx-field">Username<input value={login.username} autoComplete="username" onChange={e=>setLogin({...login,username:e.target.value.toLowerCase()})} required/></label>
        <label className="nx-field">Password<input type="password" value={login.password} autoComplete="current-password" onChange={e=>setLogin({...login,password:e.target.value})} required/></label>
        <button className="nx-btn nx-dark nx-full" disabled={busy}>Log in</button></form>
      <p className="nx-note">No account yet? <a href="/cv/">Build your CV</a> and create one in the Design step.</p></section>
    :<>
      <section className="oc-panel"><h3>Your CV link</h3>
        {s.cv?<><div className="oc-link">🔗 <a href={url} target="_blank" rel="noopener">{url}</a></div><ShareLinks url={url} name={s.user.username}/>
          <label className="oc-toggle"><input type="checkbox" checked={s.cv.published} onChange={e=>run({action:'settings',published:e.target.checked,showContact:s.cv!.showContact})}/>Public — anyone with the link can view</label>
          <label className="oc-toggle"><input type="checkbox" checked={s.cv.showContact} onChange={e=>run({action:'settings',published:s.cv!.published,showContact:e.target.checked})}/>Show phone & email</label>
          <p className="nx-note">{s.cv.views} views · last saved {new Date(s.cv.updated).toLocaleString()}</p></>
        :<p>You have not published a CV yet.</p>}
        <div className="hb-wrap"><a className="nx-btn nx-dark" href="/cv/">Edit my CV</a><button className="nx-btn nx-outline" onClick={()=>run({action:'logout'})}>Log out</button></div></section>
      <section className="oc-panel"><h3>Change password</h3><form onSubmit={e=>{e.preventDefault();run({action:'password',...pw}).then(()=>setPw({current:'',next:''}))}}>
        <label className="nx-field">Current password<input type="password" autoComplete="current-password" value={pw.current} onChange={e=>setPw({...pw,current:e.target.value})} required/></label>
        <label className="nx-field">New password<input type="password" autoComplete="new-password" minLength={8} value={pw.next} onChange={e=>setPw({...pw,next:e.target.value})} required/></label>
        <button className="nx-btn nx-dark" disabled={busy}>Change password</button></form></section>
      <section className="oc-panel"><h3>Delete account</h3><p className="nx-note">Permanently deletes your account and online CV. Your browser draft is not affected.</p>
        <form onSubmit={e=>{e.preventDefault();if(confirm('Delete your account and online CV permanently?'))run({action:'remove',password:del})}}>
        <label className="nx-field">Password<input type="password" autoComplete="current-password" value={del} onChange={e=>setDel(e.target.value)} required/></label>
        <button className="nx-btn nx-outline" disabled={busy}>Delete my account</button></form></section>
    </>}
    {err&&s&&<p className="oc-err" role="alert">{err}</p>}{ok&&<p className="oc-ok" role="status">{ok}</p>}
  </main></div>;
}
