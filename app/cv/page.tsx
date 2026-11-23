import CVBuilder from '../builders/cv';
import {meta,JsonLd} from '../../lib/seo';
import {abs} from '../../lib/site';
export const metadata=meta({title:'Free CV Maker Pakistan – Download CV PDF | Hirestaff Islamabad',description:'Build a professional CV for free and download it as a PDF — no watermark, no sign-up. Three templates, English or Roman Urdu.',path:'/cv/'});
export default function Page(){return <><JsonLd data={[{'@type':'WebApplication',name:'Hirestaff Free CV Builder',url:abs('/cv/'),applicationCategory:'BusinessApplication',operatingSystem:'Web browser',offers:{'@type':'Offer',price:'0',priceCurrency:'PKR'}}]}/><CVBuilder/></>}
