import {JobDetail} from '../job-board/pages';
import {meta} from '../../lib/seo';
export const metadata=meta({title:'Job opportunity',description:'Job details.',path:'/job/',noindex:true});
export default function Page(){return <JobDetail/>}
