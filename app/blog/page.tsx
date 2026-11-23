import {meta, JsonLd, breadcrumbSchema, webPageSchema} from '../../lib/seo';
import {abs} from '../../lib/site';
import {sortedPosts} from '../../lib/content/blog';
import {Shell, Crumbs, Hero, fmtDate} from '../content/ui';

const path = '/blog/';
const title = 'Career and hiring guides for Islamabad & Rawalpindi';
const description = 'Practical guides for job seekers and employers in Islamabad and Rawalpindi: finding a job, CVs, interviews, minimum wage 2026, hiring staff lawfully and avoiding job scams.';
export const metadata = {...meta({title: 'Career & Hiring Guides – Islamabad & Rawalpindi', description, path}),
  alternates: {canonical: abs(path), types: {'application/rss+xml': abs('/blog/feed.xml')}}};

export default function Page() {
  const list = sortedPosts();
  const crumbs: [string, string][] = [['Home', '/'], ['Guides', path]];
  return <Shell>
    <JsonLd data={[
      {...webPageSchema({path, title, description, type: 'CollectionPage'}), mainEntity: {'@type': 'ItemList', itemListElement: list.map((p, i) => ({'@type': 'ListItem', position: i + 1, url: abs(`/blog/${p.slug}/`), name: p.title}))}},
      breadcrumbSchema(crumbs),
    ]}/>
    <div className="ct-wrap">
      <Crumbs items={crumbs}/>
      <Hero kicker="HIRESTAFF GUIDES" title={title} lead="Clear, checked advice for finding work and hiring well in the twin cities — written for Pakistan, updated when the rules change."/>
      <div className="ct-chips">{['Job seekers', 'Employers', 'Pay & law', 'Local guide'].map(c => <a key={c} href={'#' + c.toLowerCase().replace(/[^a-z]+/g, '-')}>{c}</a>)}</div>
      {(['Job seekers', 'Employers', 'Pay & law', 'Local guide'] as const).map(cat => {
        const items = list.filter(p => p.category === cat);
        return items.length ? <section key={cat} id={cat.toLowerCase().replace(/[^a-z]+/g, '-')}>
          <h2 className="ct-section-title">{cat}</h2>
          <div className="ct-grid">{items.map(p => <a key={p.slug} className="ct-card" href={`/blog/${p.slug}/`}>
            <small>{p.category}</small><h3>{p.title}</h3><p>{p.description}</p><span>Updated {fmtDate(p.updated)}</span></a>)}</div>
        </section> : null;
      })}
    </div>
  </Shell>;
}
