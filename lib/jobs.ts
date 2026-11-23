import raw from '../data/jobs.json';
import {normalizeJob,type Job,type JobRecord,type JobSummary} from '../app/job-board/model';

type Stored={id:string;publishedAt?:string;closed?:boolean;job:Partial<Job>};
const PK=5*3600000;
const expired=(d:string)=>!!d&&Date.parse(d+'T23:59:59Z')-PK<Date.now();

export function allJobs():JobRecord[]{
  return (raw as Stored[]).filter(j=>j&&/^[a-z0-9-]{3,80}$/.test(j.id)).map(j=>{
    const job=normalizeJob(j.job);const status=j.closed?'closed':expired(job.deadline)?'expired':'published';
    const at=j.publishedAt||new Date().toISOString().slice(0,10);
    return {id:j.id,job,status,storedStatus:'published',version:1,isOwner:false,createdAt:at,updatedAt:at,publishedAt:at,company:null} as JobRecord;
  });
}
export const openJobs=()=>allJobs().filter(j=>j.status==='published');
export const jobById=(id:string)=>allJobs().find(j=>j.id===id);
export function summary(r:JobRecord):JobSummary{const j=r.job;return {id:r.id,title:j.title,companyName:j.companyName,companyId:'',city:j.city,area:j.area,sector:j.sector,type:j.type,mode:j.mode,salaryMin:j.salaryMin,salaryMax:j.salaryMax,currency:j.currency,payPeriod:j.payPeriod,deadline:j.deadline,status:r.status,createdAt:r.createdAt,publishedAt:r.publishedAt||r.createdAt}}
