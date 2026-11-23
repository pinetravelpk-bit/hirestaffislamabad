import {CompanyPage} from '../builders/company';
import {meta} from '../../lib/seo';
export const metadata=meta({title:'Company profile',description:'Employer profile.',path:'/company/',noindex:true});
export default function Page(){return <CompanyPage/>}
