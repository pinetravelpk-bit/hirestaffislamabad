// Central business details. Contact values come from environment variables so that
// only real, verified details are published (they also feed LocalBusiness schema).
const env=(k:string)=>(process.env[k]||'').trim();

export const site={
  name:'Hire Staff Islamabad',
  shortName:'Hirestaff',
  legalName:env('NEXT_PUBLIC_LEGAL_NAME')||'Hire Staff Islamabad',
  url:(env('NEXT_PUBLIC_SITE_URL')||'https://hirestaffislamabad.pk').replace(/\/$/,''),
  tagline:'Domestic, care and office staff for homes and businesses in Islamabad and Rawalpindi',
  description:'Hire Staff Islamabad helps families and businesses hire maids, cooks, drivers, nannies, elderly care attendants, security guards, office boys and other staff in Islamabad and Rawalpindi. Job seekers can find work and build a free CV.',
  phone:env('NEXT_PUBLIC_PHONE'),            // e.g. +92 300 1234567
  whatsapp:env('NEXT_PUBLIC_WHATSAPP').replace(/\D/g,''), // digits with country code, e.g. 923001234567
  email:env('NEXT_PUBLIC_EMAIL')||'info@hirestaffislamabad.pk',
  street:env('NEXT_PUBLIC_STREET_ADDRESS'),
  locality:env('NEXT_PUBLIC_ADDRESS_LOCALITY')||'Islamabad',
  region:'Islamabad Capital Territory',
  postalCode:env('NEXT_PUBLIC_POSTAL_CODE'),
  country:'PK',
  hours:env('NEXT_PUBLIC_OPENING_HOURS'), // schema.org format, e.g. "Mo-Sa 09:00-19:00"
  gbp:env('NEXT_PUBLIC_GBP_URL'),          // Google Business Profile / Maps URL
  sameAs:env('NEXT_PUBLIC_SAME_AS').split(',').map(s=>s.trim()).filter(Boolean),
  geo:{lat:33.6844,lng:73.0479}, // Islamabad city centre (service-area business)
  founded:env('NEXT_PUBLIC_FOUNDED'),
  updated:'2026-11-22',
  indexing:env('SITE_INDEXING')!=='false',
};

export const hasAddress=()=>Boolean(site.street);
export const whatsappLink=(text:string)=>site.whatsapp?`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`:'';
export const telLink=()=>site.phone?`tel:${site.phone.replace(/[^\d+]/g,'')}`:'';
export const abs=(path='/')=>site.url+(path.startsWith('/')?path:'/'+path);
