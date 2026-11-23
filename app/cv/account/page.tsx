import AccountDashboard from '../../builders/account';
import {meta} from '../../../lib/seo';
import {site,whatsappLink} from '../../../lib/site';
export const metadata=meta({title:'My CV page – sign in | Hirestaff Islamabad',description:'Sign in to edit, hide or share your online CV page.',path:'/cv/account/',noindex:true});
export default function Page(){return <AccountDashboard help={whatsappLink('Hi, I forgot the password for my CV page. My username is: ')||`mailto:${site.email}?subject=CV%20page%20password`}/>}
