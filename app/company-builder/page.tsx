import SeoContent from '../../components/seo-content';
import CompanyBuilder from '../builders/company';
import {meta} from '../../lib/seo';
export const metadata=meta({title:'Free Company Profile Builder | Hirestaff Islamabad',description:'Create a free company profile with logo, culture, benefits and open roles to attract candidates in Pakistan.',path:'/company-builder/'});
export default function Page(){return <><CompanyBuilder/><SeoContent page="company-builder" path="/company-builder/"/></>}
