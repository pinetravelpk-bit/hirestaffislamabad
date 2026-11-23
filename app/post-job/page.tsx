import PostJob from '../job-board/post';
import {meta,JsonLd,webPage,breadcrumb} from '../../lib/seo';
const title='Post a Job for Free in Islamabad – Free Job Posting';
const description='Post a job for free in Islamabad and Rawalpindi. Describe the role, pay and how to apply, preview it, and send it to our team for publishing. No fee.';
export const metadata=meta({title,description,path:'/post-job/'});
export default function Page(){return <><JsonLd data={[webPage({path:'/post-job/',title,description,speakable:false}),breadcrumb([['Post a job','/post-job/']])]}/><PostJob/></>}
