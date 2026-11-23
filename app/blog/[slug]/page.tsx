import {notFound} from 'next/navigation';
import {articleMeta, JsonLd, breadcrumbSchema, webPageSchema, articleSchema, faqSchema, stripMarks} from '../../../lib/seo';
import {posts, postBySlug} from '../../../lib/content/blog';
import {Shell, Crumbs, Hero, Answer, Takeaways, Blocks, Toc, Faqs, Sources, Related, Cta, fmtDate} from '../../content/ui';
import type {Post} from '../../../lib/content/types';

export const dynamicParams = false;
export function generateStaticParams() { return posts.map(p => ({slug: p.slug})); }

export async function generateMetadata({params}: {params: Promise<{slug: string}>}) {
  const p = postBySlug((await params).slug);
  if (!p) return {};
  return articleMeta({title: p.seoTitle || p.title, description: p.description, path: `/blog/${p.slug}/`, published: p.published, updated: p.updated});
}

const words = (p: Post) => [p.answer, ...p.takeaways, ...p.body.flatMap(b => [b.h2, ...(b.p || []), ...(b.list || []), ...(b.steps || []), ...(b.after || []), ...(b.table?.rows.flat() || [])]), ...p.faqs.flat()]
  .join(' ').split(/\s+/).length;

export default async function Page({params}: {params: Promise<{slug: string}>}) {
  const p = postBySlug((await params).slug);
  if (!p) notFound();
  const path = `/blog/${p.slug}/`;
  const crumbs: [string, string][] = [['Home', '/'], ['Guides', '/blog/'], [p.title.split(':')[0], path]];
  const employer = p.category === 'Employers';
  return <Shell>
    <JsonLd data={[
      webPageSchema({path, title: p.title, description: p.description, updated: p.updated}),
      articleSchema({...p, words: words(p)}),
      breadcrumbSchema(crumbs),
      faqSchema(path, p.faqs),
    ]}/>
    <div className="ct-wrap">
      <Crumbs items={crumbs}/>
      <Hero kicker={p.category.toUpperCase()} title={p.title} meta={<>
        <span>By the Hirestaff Islamabad editorial team</span>
        <span>Published <time dateTime={p.published}>{fmtDate(p.published)}</time></span>
        <span>Updated <time dateTime={p.updated}>{fmtDate(p.updated)}</time></span>
      </>}/>
      <div className="ct-layout">
        <article className="ct-article">
          <Answer>{p.answer}</Answer>
          <Takeaways items={p.takeaways}/>
          <Blocks blocks={p.body}/>
          <Cta employer={employer}/>
          <Faqs faqs={p.faqs}/>
          {p.sources && <Sources items={p.sources}/>}
          {p.related && <Related paths={p.related}/>}
        </article>
        <aside className="ct-side">
          <Toc blocks={p.body}/>
          <div className="ct-side-card">{employer
            ? <><strong>Hiring now?</strong><p>Post your vacancy free — no listing fee.</p><a className="nx-btn nx-dark nx-full" href="/post-job/">Post a job free</a></>
            : <><strong>Need a CV?</strong><p>Build a clean one-page CV and download a PDF.</p><a className="nx-btn nx-dark nx-full" href="/cv/">Free CV maker</a></>}</div>
        </aside>
      </div>
      <p className="nx-note">This guide is general information, not legal advice. {stripMarks('Facts checked on ' + fmtDate(p.updated) + '.')}</p>
    </div>
  </Shell>;
}
