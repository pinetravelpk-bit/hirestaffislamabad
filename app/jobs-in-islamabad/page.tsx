import {meta} from '../../lib/seo';
import {placeBySlug} from '../../lib/content/places';
import {PlacePage} from '../content/place';
const p = placeBySlug('jobs-in-islamabad');
export const metadata = meta({title: 'Jobs in Islamabad 2026 – Vacancies, Salaries & Areas', description: p.description, path: '/jobs-in-islamabad/'});
export default function Page() { return <PlacePage slug="jobs-in-islamabad"/>; }
