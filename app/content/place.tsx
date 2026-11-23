import {JsonLd, breadcrumbSchema, webPageSchema, faqSchema, cities} from '../../lib/seo';
import {abs} from '../../lib/site';
import {placeBySlug} from '../../lib/content/places';
import {roles} from '../../lib/content/roles';
import {posts} from '../../lib/content/blog';
import {Shell, Crumbs, Hero, Answer, Blocks, Faqs, Sources, Cta, T} from './ui';

export function PlacePage({slug}: {slug: string}) {
  const p = placeBySlug(slug);
  const path = `/${p.slug}/`;
  const crumbs: [string, string][] = [['Home', '/'], [`Jobs in ${p.city}`, path]];
  const city = p.city === 'Islamabad' ? cities.islamabad : cities.rawalpindi;
  return <Shell>
    <JsonLd data={[
      {...webPageSchema({path, title: p.title, description: p.description, updated: '2026-11-23', type: 'CollectionPage', about: [city]}),
        mainEntity: {'@type': 'ItemList', name: `Job types in ${p.city}`, itemListElement: roles.map((r, i) => ({'@type': 'ListItem', position: i + 1, name: `${r.plural} in Islamabad`, url: abs(`/jobs-in-islamabad/${r.slug}/`)}))}},
      breadcrumbSchema(crumbs),
      faqSchema(path, p.faqs),
    ]}/>
    <div className="ct-wrap">
      <Crumbs items={crumbs}/>
      <Hero kicker={`LOCAL GUIDE · ${p.city.toUpperCase()}`} title={p.title} lead={p.intro[0]}/>
      <div className="ct-chips"><a href="/find-jobs/">Search open jobs</a><a href="/cv/">Free CV maker</a><a href="/post-job/">Post a job free</a><a href={p.city === 'Islamabad' ? '/jobs-in-rawalpindi/' : '/jobs-in-islamabad/'}>Jobs in {p.city === 'Islamabad' ? 'Rawalpindi' : 'Islamabad'}</a></div>
      <div className="ct-article" style={{maxWidth: 900}}>
        <Answer>{p.answer}</Answer>
        {p.intro.slice(1).map(t => <p key={t}><T>{t}</T></p>)}
        <h2 className="ct-section-title">Browse jobs by type</h2>
        <div className="ct-grid">{roles.map(r => <a key={r.slug} className="ct-card" href={`/jobs-in-islamabad/${r.slug}/`}><small>Role guide</small><h3>{r.plural}</h3><p>{r.description.split('. ')[0]}.</p><span>Duties · requirements · pay</span></a>)}</div>
        <h2 className="ct-section-title">Main job areas in {p.city}</h2>
        <div className="ct-areas">{p.areas.map(a => <div key={a.name}><strong>{a.name}</strong><span>{a.note}</span></div>)}</div>
        <Blocks blocks={p.body}/>
        <Cta/>
        <Faqs faqs={p.faqs}/>
        {p.sources && <Sources items={p.sources}/>}
        <section className="ct-related"><h2>Guides for {p.city}</h2><div>{posts.slice(0, 6).map(b => <a key={b.slug} href={`/blog/${b.slug}/`}><span>{b.title.split(':')[0]}</span></a>)}</div></section>
      </div>
    </div>
  </Shell>;
}
