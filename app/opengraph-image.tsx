import {ImageResponse} from 'next/og';
export const size={width:1200,height:630};
export const contentType='image/png';
export const alt='Hirestaff Islamabad – Your next job? Think bigger.';
export default function Image(){
  return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',background:'#f7f5ef',padding:'64px 72px',fontFamily:'sans-serif',color:'#242420'}}>
    <div style={{display:'flex',alignItems:'center',fontSize:44,fontWeight:800,letterSpacing:-2}}>hirestaff<div style={{width:26,height:26,background:'#f34e25',transform:'rotate(45deg)',marginLeft:14,borderRadius:4}}/><span style={{fontSize:20,letterSpacing:4,marginLeft:18,color:'#646c59'}}>ISLAMABAD.PK</span></div>
    <div style={{display:'flex',flexDirection:'column'}}><div style={{fontSize:96,fontWeight:800,letterSpacing:-4,lineHeight:1}}>Your next job?</div><div style={{fontSize:96,fontWeight:800,letterSpacing:-4,lineHeight:1,color:'#c34020'}}>Think bigger.</div></div>
    <div style={{display:'flex',justifyContent:'space-between',fontSize:26,color:'#646c59'}}><span>Find jobs · Free CV · Post a job free</span><span>hirestaffislamabad.pk</span></div>
  </div>,size);
}
