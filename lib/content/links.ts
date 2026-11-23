import {posts} from './blog';
import {roles} from './roles';
import {places} from './places';

// Registry of indexable content pages (used for titles, sitemap and llms.txt).
export type PageInfo = {path: string; title: string; description: string; updated: string; priority: number};
const U = '2026-11-23';

export const contentPages = (): PageInfo[] => [
  ...places.map(p => ({path: `/${p.slug}/`, title: `Jobs in ${p.city}`, description: p.description, updated: U, priority: .9})),
  ...roles.map(r => ({path: `/jobs-in-islamabad/${r.slug}/`, title: `${r.plural} in Islamabad`, description: r.description, updated: U, priority: .7})),
  {path: '/blog/', title: 'Career & hiring guides', description: 'Guides for job seekers and employers in Islamabad and Rawalpindi.', updated: U, priority: .8},
  ...posts.map(p => ({path: `/blog/${p.slug}/`, title: p.title, description: p.description, updated: p.updated, priority: .7})),
  {path: '/about/', title: 'About Hirestaff Islamabad', description: 'Who we are, what we do and how we write and check our guides.', updated: U, priority: .5},
  {path: '/faq/', title: 'Frequently asked questions', description: 'Answers about jobs, CVs, posting jobs and pay in Islamabad and Rawalpindi.', updated: U, priority: .6},
];

const fixed: Record<string, string> = {
  '/': 'Hirestaff Islamabad home', '/find-jobs/': 'Find jobs', '/post-job/': 'Post a job for free', '/cv/': 'Free CV maker',
  '/companies/': 'Companies hiring', '/company-builder/': 'Create a company profile',
};
export function titleFor(path: string) {
  if (fixed[path]) return fixed[path];
  const p = contentPages().find(x => x.path === path);
  if (!p) return path;
  return p.path.startsWith('/blog/') && p.path !== '/blog/' ? p.title.split(':')[0] : p.title;
}
