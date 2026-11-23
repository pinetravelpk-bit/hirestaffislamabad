'use client';
import {useEffect,useState} from 'react';
import {ShareLinks} from '../../builders/online';
export function PublicActions({url,name,headline,email,phone,whatsapp,autoPrint}:{url:string;name:string;headline:string;email:string;phone:string;whatsapp:string;autoPrint:boolean}){
  const [share,setShare]=useState(false);
  useEffect(()=>{if(autoPrint)setTimeout(()=>window.print(),600)},[autoPrint]);
  return <div className="cvp-actions">
    <div className="cvp-row">
      {whatsapp&&<a className="cvp-btn wa" href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`Hi ${name.split(' ')[0]}, I saw your CV on Hirestaff.`)}`} target="_blank" rel="noopener">WhatsApp</a>}
      {phone&&<a className="cvp-btn" href={`tel:${phone}`}>Call</a>}
      {email&&<a className="cvp-btn" href={`mailto:${email}?subject=${encodeURIComponent('Regarding your CV')}`}>Email</a>}
      <button className="cvp-btn" onClick={()=>window.print()}>Download PDF</button>
      <button className="cvp-btn dark" onClick={()=>setShare(!share)} aria-expanded={share}>Share</button>
    </div>
    {share&&<ShareLinks url={url} name={name} headline={headline}/>}
  </div>;
}
