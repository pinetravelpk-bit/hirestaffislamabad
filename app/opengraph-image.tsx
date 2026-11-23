import {ImageResponse} from 'next/og';
export const size={width:1200,height:630};
export const contentType='image/png';
export const alt='Hire Staff Islamabad – maids, cooks, drivers, nannies and care staff in Islamabad';
export default function Image(){
  return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',background:'#f7f5ef',padding:'64px 72px',fontFamily:'sans-serif',color:'#242420'}}>
    <div style={{display:'flex',alignItems:'center',fontSize:44,fontWeight:800,letterSpacing:-2}}>hirestaff<div style={{width:26,height:26,background:'#f34e25',transform:'rotate(45deg)',marginLeft:14,borderRadius:4}}/><span style={{fontSize:20,letterSpacing:4,marginLeft:18,color:'#646c59'}}>ISLAMABAD.PK</span></div>
    <div style={{display:'flex',flexDirection:'column'}}>
      <div style={{fontSize:76,fontWeight:800,letterSpacing:-3,lineHeight:1.02}}>Hire staff in Islamabad.</div>
      <div style={{fontSize:76,fontWeight:800,letterSpacing:-3,lineHeight:1.02,color:'#c34020'}}>Properly checked.</div>
      <div style={{fontSize:30,color:'#4b5243',marginTop:26}}>Maids · Cooks · Drivers · Nannies · Elderly care · Guards · Office staff</div>
    </div>
    <div style={{display:'flex',justifyContent:'space-between',fontSize:24,color:'#646c59'}}><span>Islamabad & Rawalpindi</span><span>hirestaffislamabad.pk</span></div>
  </div>,size);
}
