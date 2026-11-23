import {ImageResponse} from 'next/og';
import {readAccount} from '../../../lib/cv-accounts';
import {initials,parseSkills} from '../../builders/model';
import {site} from '../../../lib/site';
export const size={width:1200,height:630};
export const contentType='image/png';
export const alt='CV preview';
export default async function Image({params}:{params:Promise<{username:string}>}){
  const {username}=await params;const a=await readAccount(username);const cv=a?.published?a.cv:null;
  const accent=cv?.accent||'#c34020';const skills=cv?parseSkills(cv.skills).slice(0,5).map(s=>s.name):[];
  return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',background:'#f7f5ef',fontFamily:'sans-serif',color:'#242420'}}>
    <div style={{width:380,background:accent,display:'flex',alignItems:'center',justifyContent:'center'}}>
      {cv?.photo?<img src={cv.photo} width={260} height={260} style={{borderRadius:130,border:'8px solid #fff'}}/>:<div style={{width:260,height:260,borderRadius:130,border:'8px solid #fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:110,fontWeight:800,color:'#fff'}}>{initials(cv?.name||'CV')}</div>}
    </div>
    <div style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'center',padding:'0 60px'}}>
      <div style={{fontSize:24,letterSpacing:4,color:'#646c59'}}>CURRICULUM VITAE</div>
      <div style={{fontSize:72,fontWeight:800,lineHeight:1.05,marginTop:16,letterSpacing:-2}}>{cv?.name||'CV not found'}</div>
      {cv?.headline&&<div style={{fontSize:34,marginTop:14,color:accent}}>{cv.headline}</div>}
      {cv?.city&&<div style={{fontSize:26,marginTop:12,color:'#646c59'}}>{cv.city}</div>}
      <div style={{display:'flex',flexWrap:'wrap',marginTop:28}}>{skills.map(s=><div key={s} style={{fontSize:22,padding:'8px 16px',background:'#fff',border:'2px solid #ddd',borderRadius:10,marginRight:10,marginBottom:10}}>{s}</div>)}</div>
      <div style={{fontSize:22,color:'#646c59',marginTop:20}}>{`${site.url.replace(/^https?:\/\//,'')}/p/${username}`}</div>
    </div>
  </div>,size);
}
