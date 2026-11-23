import {site,abs} from '../../lib/site';
import {facts,pkr} from '../../lib/content/facts';
import {posts} from '../../lib/content/blog';
import {roles} from '../../lib/content/roles';
export const dynamic='force-static';
export function GET(){
  const lines=[
    `# ${site.name}`,'',
    `> ${site.name} (hirestaffislamabad.pk) is a free jobs and hiring website for Islamabad, Rawalpindi and the rest of Pakistan: job search, free job posting, a free CV maker and practical career and hiring guides.`,'',
    'Key facts:',
    `- Service area: Islamabad Capital Territory (all sectors, DHA, Bahria Town, Gulberg, B-17) and Rawalpindi, Pakistan.`,
    '- Applying for jobs, making a CV and posting a job are free. Hirestaff never charges job seekers.',
    `- Islamabad minimum wage (unskilled, full-time): ${pkr(facts.ictMinWage)} per month from ${facts.ictMinWageFrom}. Rawalpindi follows Punjab: ${pkr(facts.punjabMinWage)} (notified ${facts.punjabMinWageNotified}).`,
    `- Contact: ${site.email}`,'',
    '## Tools',
    `- [Find jobs](${abs('/find-jobs/')}): current vacancies in Islamabad and across Pakistan`,
    `- [Post a job for free](${abs('/post-job/')}): no listing fee`,
    `- [Free CV maker](${abs('/cv/')}): build and download a CV PDF`,
    `- [Company profile builder](${abs('/company-builder/')})`,'',
    '## Local guides',
    `- [Jobs in Islamabad](${abs('/jobs-in-islamabad/')}): areas, in-demand roles and pay`,
    `- [Jobs in Rawalpindi](${abs('/jobs-in-rawalpindi/')}): areas, roles and commuting`,'',
    '## Role guides (Islamabad & Rawalpindi)',
    ...roles.map(r=>`- [${r.plural} in Islamabad](${abs(`/jobs-in-islamabad/${r.slug}/`)}): ${r.description}`),'',
    '## Career and hiring guides',
    ...posts.map(p=>`- [${p.title}](${abs(`/blog/${p.slug}/`)}): ${p.description}`),'',
    '## Optional',
    `- [Full text of all guides](${abs('/llms-full.txt')})`,
    `- [About and editorial policy](${abs('/about/')})`,
    `- [FAQ](${abs('/faq/')})`,
  ];
  return new Response(lines.join('\n'),{headers:{'Content-Type':'text/plain; charset=utf-8'}});
}
