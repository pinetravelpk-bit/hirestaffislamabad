import CompanyBuilder from '../builders/company';
import {meta} from '../../lib/seo';
export const metadata=meta({title:'Free company profile builder',description:'Create a company profile for hiring in Pakistan.',path:'/company-builder/',noindex:true});
export default function Page(){return <CompanyBuilder/>}
