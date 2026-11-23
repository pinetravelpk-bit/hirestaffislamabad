import {meta, JsonLd, breadcrumbSchema, webPageSchema, faqSchema} from '../../lib/seo';
import {siteFaqs, allSiteFaqs} from '../../lib/content/faq';
import {Shell, Crumbs, Hero, Faqs, Cta} from '../content/ui';

const path = '/faq/';
const title = 'Frequently asked questions';
const description = 'Answers about finding jobs, free CVs, posting jobs, minimum wage and hiring household staff in Islamabad and Rawalpindi.';
export const metadata = meta({title: 'FAQ – Jobs, CVs & Hiring in Islamabad | Hirestaff Islamabad', description, path});

export default function Page() {
  const crumbs: [string, string][] = [['Home', '/'], ['FAQ', path]];
  return <Shell>
    <JsonLd data={[webPageSchema({path, title, description, updated: '2026-11-23'}), breadcrumbSchema(crumbs), faqSchema(path, allSiteFaqs)]}/>
    <div className="ct-wrap">
      <Crumbs items={crumbs}/>
      <Hero kicker="HELP" title={title} lead={description}/>
      <div className="ct-article">
        {siteFaqs.map(g => <Faqs key={g.group} id={g.group.toLowerCase().replace(/[^a-z]+/g, '-')} title={g.group} faqs={g.items}/>)}
        <Cta/>
      </div>
    </div>
  </Shell>;
}
