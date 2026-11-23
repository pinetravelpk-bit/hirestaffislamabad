import {notFound} from 'next/navigation';
import {meta, JsonLd, breadcrumbSchema, webPageSchema, faqSchema, cities} from '../../../lib/seo';
import {roles, roleBySlug} from '../../../lib/content/roles';
import {Shell, Crumbs, Hero, Answer, Faqs, Related, Cta, T} from '../../content/ui';

export const dynamicParams = false;
export function generateStaticParams() { return roles.map(r => ({role: r.slug})); }
export async function generateMetadata({params}: {params: Promise<{role: string}>}) {
  const r = roleBySlug((await params).role);
  if (!r) return {};
  return meta({title: r.plural.length > 22 ? `${r.plural} in Islamabad | Hirestaff` : `${r.plural} in Islamabad – Pay & How to Apply`, description: r.description, path: `/jobs-in-islamabad/${r.slug}/`});
}

const List = ({title, items}: {title: string; items: string[]}) => <section className="ct-block"><h2>{title}</h2><ul>{items.map(i => <li key={i}><T>{i}</T></li>)}</ul></section>;

export default async function Page({params}: {params: Promise<{role: string}>}) {
  const r = roleBySlug((await params).role);
  if (!r) notFound();
  const path = `/jobs-in-islamabad/${r.slug}/`;
  const crumbs: [string, string][] = [['Home', '/'], ['Jobs in Islamabad', '/jobs-in-islamabad/'], [r.plural, path]];
  const others = roles.filter(x => x.slug !== r.slug).slice(0, 6).map(x => `/jobs-in-islamabad/${x.slug}/`);
  return <Shell>
    <JsonLd data={[
      webPageSchema({path, title: r.title, description: r.description, updated: '2026-11-23', about: [{'@type': 'Occupation', name: r.name, occupationLocation: [cities.islamabad, cities.rawalpindi], responsibilities: r.duties.join('; '), qualifications: r.requirements.join('; ')}]}),
      breadcrumbSchema(crumbs),
      faqSchema(path, r.faqs),
    ]}/>
    <div className="ct-wrap">
      <Crumbs items={crumbs}/>
      <Hero kicker="ROLE GUIDE · ISLAMABAD & RAWALPINDI" title={r.title}/>
      <div className="ct-chips"><a href="/find-jobs/">Search {r.plural.toLowerCase()}</a><a href="/cv/">Make a CV</a><a href="/post-job/">Hire a {r.name.split(' /')[0].toLowerCase()}</a></div>
      <div className="ct-layout">
        <article className="ct-article">
          <Answer>{r.answer}</Answer>
          <List title="What the job involves" items={r.duties}/>
          <List title="What employers usually ask for" items={r.requirements}/>
          <section className="ct-block"><h2>Pay in Islamabad</h2>{r.pay.map(p => <p key={p}><T>{p}</T></p>)}<p><a href="/blog/minimum-wage-islamabad-rawalpindi-2026/">Minimum wage rules for Islamabad and Rawalpindi</a></p></section>
          <List title="Where these jobs are" items={r.where}/>
          <div className="ct-two">
            <List title="Tips for job seekers" items={r.seekerTips}/>
            <List title="Tips for employers" items={r.employerTips}/>
          </div>
          <Cta/>
          <Faqs faqs={r.faqs}/>
          <Related paths={[...(r.related || []), ...others].slice(0, 8)} title="Related guides and roles"/>
        </article>
        <aside className="ct-side">
          <div className="ct-side-card"><strong>Looking for work?</strong><p>Browse current vacancies in Islamabad and Rawalpindi.</p><a className="nx-btn nx-dark nx-full" href="/find-jobs/">Find jobs</a></div>
          <div className="ct-side-card"><strong>Hiring?</strong><p>Post your {r.name.toLowerCase()} vacancy free.</p><a className="nx-btn nx-outline nx-full" href="/post-job/">Post a job free</a></div>
        </aside>
      </div>
    </div>
  </Shell>;
}
