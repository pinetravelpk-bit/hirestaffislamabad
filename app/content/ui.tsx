import {Fragment} from 'react';
import {Header, MobileNav, Logo, Icon} from '../next/ui';
import type {Block, Faq, Source} from '../../lib/content/types';
import {titleFor} from '../../lib/content/links';
import '../next/next.css';
import './content.css';

// Inline marks: [text](href) and **bold**
export function T({children}: {children: string}) {
  const out: React.ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0, m: RegExpExecArray | null, k = 0;
  while ((m = re.exec(children))) {
    if (m.index > last) out.push(children.slice(last, m.index));
    if (m[1]) {
      const ext = /^https?:/.test(m[2]);
      out.push(<a key={k++} href={m[2]} {...(ext ? {rel: 'noopener', target: '_blank'} : {})}>{m[1]}</a>);
    } else if (m[3]) out.push(<strong key={k++}>{m[3]}</strong>);
    else out.push(<em key={k++}>{m[4]}</em>);
    last = re.lastIndex;
  }
  if (last < children.length) out.push(children.slice(last));
  return <>{out}</>;
}
export const plain = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*?([^*]+)\*\*?/g, '$1');

export function Shell({children}: {children: React.ReactNode}) {
  return <div className="nx ct"><Header/><main>{children}</main><SiteFooter/><MobileNav active=""/></div>;
}

export function SiteFooter() {
  return <footer className="nx-footer nx-container">
    <div><Logo/><p>Jobs, free CVs and free job posting for Islamabad, Rawalpindi and the rest of Pakistan.</p></div>
    <div><strong>Job seekers</strong><a href="/find-jobs/">Find jobs</a><a href="/cv/">Free CV maker</a><a href="/jobs-in-islamabad/">Jobs in Islamabad</a><a href="/jobs-in-rawalpindi/">Jobs in Rawalpindi</a><a href="/blog/">Career guides</a></div>
    <div><strong>Employers</strong><a href="/post-job/">Post a job for free</a><a href="/manage-jobs/">Manage job posts</a><a href="/company-builder/">Create company profile</a><a href="/blog/how-to-hire-staff-in-islamabad/">Hiring guide</a><a href="/blog/hiring-domestic-staff-islamabad-law/">Domestic staff &amp; the law</a></div>
    <div><strong>Hirestaff Islamabad</strong><a href="/about/">About &amp; editorial policy</a><a href="/faq/">FAQ</a><a href="/blog/minimum-wage-islamabad-rawalpindi-2026/">Minimum wage 2026</a><a href="/blog/feed.xml">RSS feed</a></div>
    <p className="nx-footer-note">HirestaffIslamabad.pk · Serving Islamabad Capital Territory and Rawalpindi · Never pay a fee to apply for a job.</p>
  </footer>;
}

export function Crumbs({items}: {items: [string, string][]}) {
  return <nav aria-label="Breadcrumb" className="ct-crumbs"><ol>{items.map(([label, href], i) =>
    <li key={href}>{i < items.length - 1 ? <a href={href}>{label}</a> : <span aria-current="page">{label}</span>}</li>)}</ol></nav>;
}

export function Hero({kicker, title, lead, meta}: {kicker: string; title: string; lead?: string; meta?: React.ReactNode}) {
  return <header className="ct-hero"><p className="nx-kicker"><Icon name="spark"/> {kicker}</p><h1>{title}</h1>{lead && <p className="ct-lead">{lead}</p>}{meta && <div className="ct-meta">{meta}</div>}</header>;
}

export function Answer({children, label = 'Quick answer'}: {children: string; label?: string}) {
  return <section className="ct-answer" aria-label={label}><strong>{label}</strong><p><T>{children}</T></p></section>;
}

export function Takeaways({items}: {items: string[]}) {
  return <section className="ct-takeaways" aria-label="Key points"><strong>Key points</strong><ul>{items.map(t => <li key={t}><Icon name="check"/><span><T>{t}</T></span></li>)}</ul></section>;
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export function Blocks({blocks}: {blocks: Block[]}) {
  return <>{blocks.map(b => <section key={b.h2} className="ct-block">
    <h2 id={slug(b.h2)}>{b.h2}</h2>
    {b.p?.map(p => <p key={p}><T>{p}</T></p>)}
    {b.list && <ul>{b.list.map(l => <li key={l}><T>{l}</T></li>)}</ul>}
    {b.steps && <ol className="ct-steps">{b.steps.map(l => <li key={l}><T>{l}</T></li>)}</ol>}
    {b.table && <div className="ct-table"><table>{b.table.caption && <caption>{b.table.caption}</caption>}<thead><tr>{b.table.head.map(h => <th key={h} scope="col">{h}</th>)}</tr></thead><tbody>{b.table.rows.map(r => <tr key={r.join('|')}>{r.map((c, i) => i === 0 ? <th key={i} scope="row"><T>{c}</T></th> : <td key={i}><T>{c}</T></td>)}</tr>)}</tbody></table></div>}
    {b.after?.map(p => <p key={p}><T>{p}</T></p>)}
  </section>)}</>;
}

export function Toc({blocks}: {blocks: {h2: string}[]}) {
  return <nav className="ct-toc" aria-label="On this page"><strong>On this page</strong><ol>{blocks.map(b => <li key={b.h2}><a href={'#' + slug(b.h2)}>{b.h2}</a></li>)}<li><a href="#faq">Frequently asked questions</a></li></ol></nav>;
}

export function Faqs({faqs, title = 'Frequently asked questions', id = 'faq'}: {faqs: Faq[]; title?: string; id?: string}) {
  return <section className="ct-faq" id={id}><h2>{title}</h2>{faqs.map(([q, a]) => <details key={q}><summary>{q}<Icon name="plus"/></summary><p><T>{a}</T></p></details>)}</section>;
}

export function Sources({items}: {items: Source[]}) {
  return <section className="ct-sources"><h2>Sources</h2><ul>{items.map(s => <li key={s.url}><a href={s.url} rel="noopener" target="_blank">{s.label}</a></li>)}</ul><p className="nx-note">Facts were checked on the date shown above. Laws and wage notifications change — confirm with the official notification before acting.</p></section>;
}

export function Related({paths, title = 'Read next'}: {paths: string[]; title?: string}) {
  return <section className="ct-related"><h2>{title}</h2><div>{paths.map(p => <a key={p} href={p}><span>{titleFor(p)}</span><Icon name="plus"/></a>)}</div></section>;
}

export function Cta({employer = false}: {employer?: boolean}) {
  return <aside className="ct-cta">{employer
    ? <><div><strong>Hiring in Islamabad or Rawalpindi?</strong><p>Post your vacancy for free — no listing fee, no card.</p></div><a className="nx-btn nx-dark" href="/post-job/">Post a job free</a></>
    : <><div><strong>Ready to apply?</strong><p>Make a clean CV in minutes, then browse open roles.</p></div><span><a className="nx-btn nx-dark" href="/cv/">Free CV maker</a><a className="nx-btn nx-outline" href="/find-jobs/">Find jobs</a></span></>}</aside>;
}

export const fmtDate = (d: string) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'});
export {Fragment};
