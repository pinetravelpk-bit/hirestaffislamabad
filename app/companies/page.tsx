import {CompanyDirectory} from '../builders/company';
import {meta} from '../../lib/seo';
export const metadata=meta({title:'Companies hiring in Islamabad',description:'Employer profiles.',path:'/companies/',noindex:true});
export default function Page(){return <CompanyDirectory/>}
