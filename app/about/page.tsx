import {meta, JsonLd, breadcrumbSchema, webPageSchema} from '../../lib/seo';
import {site, telLink, whatsappLink} from '../../lib/site';
import {Shell, Crumbs, Hero, Answer, Blocks} from '../content/ui';

const path = '/about/';
const title = 'About Hirestaff Islamabad';
const description = 'Hirestaff Islamabad is a free jobs, CV and hiring website for Islamabad and Rawalpindi. Learn what we offer, the areas we serve and how we research and update our guides.';
export const metadata = meta({title: 'About Hirestaff Islamabad – Jobs & Hiring in the Twin Cities', description, path});

export default function Page() {
  const crumbs: [string, string][] = [['Home', '/'], ['About', path]];
  const wa = whatsappLink('Hello Hirestaff Islamabad'), tel = telLink();
  return <Shell>
    <JsonLd data={[webPageSchema({path, title, description, updated: '2026-11-23', type: 'AboutPage'}), breadcrumbSchema(crumbs)]}/>
    <div className="ct-wrap">
      <Crumbs items={crumbs}/>
      <Hero kicker="ABOUT US" title="A free place to find work and hire well in Islamabad and Rawalpindi"/>
      <article className="ct-article">
        <Answer label="In short">{`${site.name} (hirestaffislamabad.pk) helps people in Islamabad, Rawalpindi and across Pakistan find jobs, make a free CV and post vacancies for free. We publish practical guides on pay, hiring and job safety, checked against official notifications and reputable news sources.`}</Answer>
        <Blocks blocks={[
          {h2: 'What you can do here', list: [
            '[Find jobs](/find-jobs/) posted by employers, and apply directly to them.',
            'Make a [free CV](/cv/) and download it as a PDF — no sign-up, no watermark.',
            '[Post a job for free](/post-job/) and create a [company profile](/company-builder/).',
            'Read [career and hiring guides](/blog/) for the twin cities.',
          ]},
          {h2: 'Areas we serve', p: ['All sectors of Islamabad Capital Territory — including Blue Area, F, E, G, H and I sectors, DHA, Bahria Town, Gulberg Greens and B-17 — and Rawalpindi, including Saddar, Satellite Town, Chaklala, Westridge and Bahria Town. Jobs elsewhere in Pakistan and remote roles are welcome too.']},
          {h2: 'Our promises to job seekers', list: [
            'Applying is always free. We never charge candidates.',
            'Adverts that ask candidates for money are removed.',
            'Your CV is built in your browser; you decide where to send it.',
          ]},
          {h2: 'How we write and check our guides', list: [
            'Guides are written by the Hirestaff Islamabad editorial team for local job seekers and employers.',
            'Facts about wages and labour law are checked against government notifications and reputable news reporting, and each guide lists its sources and the date it was last checked.',
            'When a rule changes — for example a new minimum-wage notification — we update the affected pages and the “Updated” date.',
            'Guides are general information, not legal advice. For a specific dispute, contact the labour department or a lawyer.',
            `Spotted an error? Email us at [${site.email}](mailto:${site.email}).`,
          ]},
          {h2: 'Interactive Studio', p: ['The [Studio](/studio/) is an interactive concept for exploring career paths and comparing offers. Its jobs and profiles are fictional samples and are clearly labelled; the job board, CV maker and job posting are the working parts of the site.']},
        ]}/>
        <section className="ct-block"><h2>Contact</h2><ul>
          <li>Email: <a href={`mailto:${site.email}`}>{site.email}</a></li>
          {tel && <li>Phone: <a href={tel}>{site.phone}</a></li>}
          {wa && <li>WhatsApp: <a href={wa} rel="noopener" target="_blank">Message us</a></li>}
          <li>Service area: {site.locality}, {site.region} and Rawalpindi, Pakistan{site.street ? ` · ${site.street}` : ''}</li>
        </ul></section>
      </article>
    </div>
  </Shell>;
}
