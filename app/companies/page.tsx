import SeoContent from '../../components/seo-content';
import {CompanyDirectory} from '../builders/company';
import {meta} from '../../lib/seo';
export const metadata=meta({title:'Companies Hiring in Pakistan | Hirestaff Islamabad',description:'Browse company profiles of employers hiring in Islamabad and across Pakistan.',path:'/companies/'});
export default function Page(){return <><CompanyDirectory/><SeoContent page="companies" path="/companies/"/></>}
