import {FindJobs} from '../job-board/pages';
import {meta,JsonLd,webPage,breadcrumb} from '../../lib/seo';
const title='Jobs in Islamabad & Rawalpindi – Domestic, Care & Office Jobs';
const description='Find current jobs in Islamabad and Rawalpindi: maid, cook, driver, nanny, caregiver, security guard, office and other jobs posted by employers. Free to apply.';
export const metadata=meta({title,description,path:'/find-jobs/'});
export default function Page(){return <><JsonLd data={[webPage({path:'/find-jobs/',title,description,speakable:false}),breadcrumb([['Find jobs','/find-jobs/']])]}/><FindJobs/></>}
