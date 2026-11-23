import {site, abs} from '../../../lib/site';
import {sortedPosts} from '../../../lib/content/blog';
export const dynamic = 'force-static';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export function GET() {
  const items = sortedPosts().map(p => `<item><title>${esc(p.title)}</title><link>${abs(`/blog/${p.slug}/`)}</link><guid isPermaLink="true">${abs(`/blog/${p.slug}/`)}</guid><pubDate>${new Date(p.published + 'T09:00:00+05:00').toUTCString()}</pubDate><category>${esc(p.category)}</category><description>${esc(p.answer)}</description></item>`).join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(site.name)} — Guides</title><link>${abs('/blog/')}</link><atom:link href="${abs('/blog/feed.xml')}" rel="self" type="application/rss+xml"/><description>Career and hiring guides for Islamabad and Rawalpindi.</description><language>en-pk</language>${items}</channel></rss>`;
  return new Response(xml, {headers: {'Content-Type': 'application/rss+xml; charset=utf-8'}});
}
