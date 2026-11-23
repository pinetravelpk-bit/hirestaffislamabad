import {meta} from '../../lib/seo';
import {placeBySlug} from '../../lib/content/places';
import {PlacePage} from '../content/place';
const p = placeBySlug('jobs-in-rawalpindi');
export const metadata = meta({title: 'Jobs in Rawalpindi 2026 – Areas, Salaries & Commute', description: p.description, path: '/jobs-in-rawalpindi/'});
export default function Page() { return <PlacePage slug="jobs-in-rawalpindi"/>; }
