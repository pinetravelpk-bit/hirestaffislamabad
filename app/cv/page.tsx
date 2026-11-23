import CVBuilder from '../builders/cv';
import {meta,JsonLd,webPage,breadcrumb} from '../../lib/seo';
import {abs} from '../../lib/site';
const title='Free CV Maker Pakistan – Create & Download a CV PDF';
const description='Make a professional CV for free and download it as a PDF — no sign-up, no watermark. English or Roman Urdu, three templates, saved on your device.';
export const metadata=meta({title,description,path:'/cv/'});
export default function Page(){return <><JsonLd data={[webPage({path:'/cv/',title,description,speakable:false}),breadcrumb([['Free CV maker','/cv/']]),{'@type':'WebApplication',name:'Hirestaff Free CV Maker',url:abs('/cv/'),applicationCategory:'BusinessApplication',operatingSystem:'Any (web browser)',offers:{'@type':'Offer',price:'0',priceCurrency:'PKR'},featureList:['Three CV templates','Direct PDF download without watermark','English and Roman Urdu','Saved locally on your device','JSON backup and import'],provider:{'@id':abs('/#organization')}}]}/><CVBuilder/></>}
