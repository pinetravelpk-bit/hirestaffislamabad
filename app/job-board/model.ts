import {webURL} from '../builders/model';
export const jobTypes=['Full-time','Part-time','Contract','Temporary','Internship'];
export const workModes=['On-site','Hybrid','Remote'];
export const sectors=['Corporate','Domestic','Skilled & technical','Hospitality','Retail & service','Other'];
export const currencies=['PKR','USD','AED','SAR'];
export type Job={title:string;companyName:string;companyId:string;sector:string;city:string;area:string;type:string;mode:string;salaryMin:string;salaryMax:string;currency:string;payPeriod:string;vacancies:string;experience:string;description:string;requirements:string;benefits:string;applyMethod:'url'|'email';applyUrl:string;applyEmail:string;deadline:string};
export type JobStatus='draft'|'published'|'closed'|'expired';
export type JobRecord={id:string;job:Job;status:JobStatus;storedStatus:string;version:number;isOwner:boolean;createdAt:string;updatedAt:string;publishedAt?:string;company?:{id:string;name:string;logo:string}|null};
export type JobSummary={id:string;title:string;companyName:string;companyId:string;city:string;area:string;sector:string;type:string;mode:string;salaryMin:string;salaryMax:string;currency:string;payPeriod:string;deadline:string;status:JobStatus;createdAt:string;publishedAt:string};
export const defaultDeadline=()=>new Date(Date.now()+30*86400000+18000000).toISOString().slice(0,10);
export const emptyJob:Job={title:'',companyName:'',companyId:'',sector:'Corporate',city:'',area:'',type:'Full-time',mode:'On-site',salaryMin:'',salaryMax:'',currency:'PKR',payPeriod:'month',vacancies:'1',experience:'',description:'',requirements:'',benefits:'',applyMethod:'url',applyUrl:'',applyEmail:'',deadline:''};
const str=(v:unknown,max=250)=>typeof v==='string'?v.slice(0,max).trim():'';
const option=(v:unknown,values:string[],fallback:string)=>values.includes(String(v))?String(v):fallback;
export function normalizeJob(value:unknown):Job{const j=value&&typeof value==='object'?value as Partial<Job>:{};return {
 title:str(j.title,160),companyName:str(j.companyName,250),companyId:/^[a-f0-9-]{36}$/.test(String(j.companyId))?String(j.companyId):'',
 sector:option(j.sector,sectors,'Corporate'),city:str(j.city,120),area:str(j.area,200),type:option(j.type,jobTypes,'Full-time'),mode:option(j.mode,workModes,'On-site'),
 salaryMin:str(j.salaryMin,20),salaryMax:str(j.salaryMax,20),currency:option(j.currency,currencies,'PKR'),payPeriod:option(j.payPeriod,['hour','day','month','year'],'month'),vacancies:str(j.vacancies,10)||'1',experience:str(j.experience,160),
 description:str(j.description,8000),requirements:str(j.requirements,5000),benefits:str(j.benefits,3000),applyMethod:j.applyMethod==='email'?'email':'url',applyUrl:str(j.applyUrl,1500),applyEmail:str(j.applyEmail,250),deadline:str(j.deadline,10)
}}
export function closingTime(date:string):number{if(!/^\d{4}-\d{2}-\d{2}$/.test(date))return NaN;const [y,m,d]=date.split('-').map(Number);const value=new Date(Date.UTC(y,m-1,d));if(value.toISOString().slice(0,10)!==date)return NaN;return Date.parse(date+'T23:59:59+05:00')}
export function jobErrors(j:Job,now=Date.now()):string[]{const errors:string[]=[];
 if(j.title.length<3)errors.push('Add a job title of at least 3 characters.');
 if(j.companyName.length<2)errors.push('Add your company or employer name.');
 if(j.city.length<2)errors.push('Add the job location or remote hiring region.');
 if(j.description.length<80)errors.push('Describe the role in at least 80 characters.');
 if(j.requirements.length<20)errors.push('Add requirements in at least 20 characters.');
 if([j.salaryMin,j.salaryMax].some(v=>v&&(!Number.isFinite(Number(v))||Number(v)<=0||Number(v)>1000000000)))errors.push('Enter a salary amount between 1 and 1,000,000,000, or leave it blank.');
 if(j.salaryMin&&j.salaryMax&&Number(j.salaryMin)>Number(j.salaryMax))errors.push('Maximum salary must be at least the minimum salary.');
 if(!Number.isInteger(Number(j.vacancies))||Number(j.vacancies)<1||Number(j.vacancies)>1000)errors.push('Vacancies must be a whole number between 1 and 1,000.');
 if(j.applyMethod==='url'&&!webURL(j.applyUrl))errors.push('Add a complete https:// or http:// application URL.');
 if(j.applyMethod==='email'&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(j.applyEmail))errors.push('Add a valid application email.');
 const close=closingTime(j.deadline);if(!Number.isFinite(close)||close<now)errors.push('Choose a valid closing date, today or later.');
 return errors;
}
export function jobStatus(status:string,expiresAt:number,now=Date.now()):JobStatus{return status==='published'&&expiresAt<now?'expired':status as JobStatus}
export function salaryLabel(j:Pick<Job,'salaryMin'|'salaryMax'|'currency'|'payPeriod'>){const n=(s:string)=>Number(s).toLocaleString('en-PK');if(!j.salaryMin&&!j.salaryMax)return 'Salary not disclosed';return j.currency+' '+(j.salaryMin&&j.salaryMax?n(j.salaryMin)+'–'+n(j.salaryMax):j.salaryMin?'from '+n(j.salaryMin):'up to '+n(j.salaryMax))+' / '+j.payPeriod}
export function dateText(value:string){if(!value)return '';const d=new Date(value+'T12:00:00+05:00');return Number.isNaN(d.getTime())?'':d.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric',timeZone:'Asia/Karachi'})}
export function applicationURL(j:Job){return j.applyMethod==='email'?'mailto:'+encodeURIComponent(j.applyEmail)+'?subject='+encodeURIComponent('Application: '+j.title):webURL(j.applyUrl)}
export async function jobsRequest(url:string,options?:RequestInit){const r=await fetch(url,options);let b;try{b=await r.json()}catch{throw new Error('Cloud job posting is available on the hosted site. Your draft stays on this device.')}if(!r.ok)throw new Error(b.error||'The request could not be completed.');return b}
