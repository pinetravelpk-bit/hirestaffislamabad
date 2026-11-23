'use client';
import {Header,Icon} from '../../next/ui';
import {CVSheet,printCV} from '../../builders/cv';
import {ShareLinks} from '../../builders/online';
import type {CV} from '../../builders/model';
import '../../next/next.css';
import '../../builders/builders.css';

export default function PublicCV({cv,url}:{cv:CV;url:string}){
  return <div className="nx hb-app oc-public">
    <Header/>
    <main className="nx-container" style={{maxWidth:980,paddingBlock:28}}>
      <div className="oc-public-bar">
        <div><p className="nx-kicker" style={{margin:0}}>ONLINE CV</p><h1 style={{margin:'6px 0 0',fontSize:'clamp(28px,4vw,44px)'}}>{cv.name}</h1>{cv.headline&&<p style={{margin:'4px 0 0',color:'#5d6551'}}>{cv.headline}</p>}</div>
        <div className="hb-wrap"><button className="nx-btn nx-dark" onClick={printCV}><Icon name="download"/>Download / print</button><a className="nx-btn nx-outline" href="/cv/">Make your own CV</a></div>
      </div>
      <ShareLinks url={url} name={cv.name}/>
      <div className="hb-preview oc-public-sheet"><CVSheet cv={cv}/></div>
      <p className="nx-note">Created with the free CV builder on Hirestaff Islamabad. <a href="/cv/">Build yours →</a></p>
    </main>
  </div>;
}
