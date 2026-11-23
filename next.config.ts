import type {NextConfig} from 'next';
const noindex=['/studio/:path*','/manage-jobs/:path*','/job/:path*','/company/:path*','/companies/:path*','/company-builder/:path*','/api/:path*'];
const config:NextConfig={
  output:'standalone',
  trailingSlash:true,
  poweredByHeader:false,
  images:{unoptimized:true},
  async headers(){return [
    {source:'/:path*',headers:[
      {key:'X-Content-Type-Options',value:'nosniff'},
      {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
      {key:'Strict-Transport-Security',value:'max-age=63072000; includeSubDomains; preload'},
      {key:'X-Frame-Options',value:'SAMEORIGIN'},
      {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=(), payment=()'},
    ]},
    ...noindex.map(source=>({source,headers:[{key:'X-Robots-Tag',value:'noindex, follow'}]})),
    {source:'/:file(icon-192.png|icon-512.png|icon.svg|hero.webp)',headers:[{key:'Cache-Control',value:'public, max-age=31536000, immutable'}]},
  ]},
  async redirects(){return [
    {source:'/platform/:path*',destination:'/',permanent:true},
    {source:'/classic/:path*',destination:'/',permanent:true},
    {source:'/browse/:path*',destination:'/areas/',permanent:true},
    {source:'/cities/:path*',destination:'/areas/',permanent:true},
    {source:'/categories/:path*',destination:'/services/',permanent:true},
    {source:'/jobs/:path*',destination:'/find-jobs/',permanent:true},
    {source:'/vision.html',destination:'/about/',permanent:true},
    {source:'/new-features.html',destination:'/about/',permanent:true},
  ]},
};
export default config;
