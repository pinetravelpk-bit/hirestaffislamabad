import {site,abs} from '../../lib/site';
export const dynamic='force-static';
export function GET(){return new Response([`# ${site.name}`,'',`> ${site.description}`,'','## Pages',`- [Find jobs](${abs('/find-jobs/')}): current vacancies in Islamabad and across Pakistan`,`- [Post a job for free](${abs('/post-job/')}): no listing fee`,`- [Free CV builder](${abs('/cv/')}): build and download a CV PDF`,`- [Companies](${abs('/companies/')})`,`- [Company profile builder](${abs('/company-builder/')})`,'',`Contact: ${site.email}`].join('\n'),{headers:{'Content-Type':'text/plain; charset=utf-8'}})}
