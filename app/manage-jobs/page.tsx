import {ManageJobs} from '../job-board/pages';
import {meta} from '../../lib/seo';
export const metadata=meta({title:'Manage job posts',description:'Manage your job posts.',path:'/manage-jobs/',noindex:true});
export default function Page(){return <ManageJobs/>}
