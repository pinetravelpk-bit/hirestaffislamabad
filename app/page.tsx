import Home from './next/home';
import {meta,JsonLd,faqSchema} from '../lib/seo';
import {homeFaqs} from '../lib/content/faq';
export const metadata=meta({title:'Hirestaff Islamabad | Jobs in Islamabad, Free CV & Free Job Posting',description:'Find jobs in Islamabad, Rawalpindi and across Pakistan. Post a job for free, build a free CV, and read local guides on pay, hiring and careers. Your next job? Think bigger.',path:'/'});
export default function Page(){return <><JsonLd data={[faqSchema('/',homeFaqs)]}/><Home/></>}
