import SeoContent from '../../components/seo-content';
import PostJob from '../job-board/post';
import {meta} from '../../lib/seo';
export const metadata=meta({title:'Post a Job for Free | Hirestaff Islamabad',description:'Post a job for free in Islamabad and across Pakistan. No listing fee, no card required. Describe the role, pay and how to apply.',path:'/post-job/'});
export default function Page(){return <><PostJob/><SeoContent page="post-job" path="/post-job/"/></>}
