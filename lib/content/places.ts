import type {Place} from './types';
import {facts, pkr, wageSources} from './facts';

export const places: Place[] = [
{
  slug: 'jobs-in-islamabad', city: 'Islamabad',
  title: 'Jobs in Islamabad: where to look, who is hiring and what they pay',
  description: `Find jobs in Islamabad — office, domestic, driver, sales, IT and more. Area-by-area guide (Blue Area, markaz, I-9/I-10), minimum wage ${pkr(facts.ictMinWage)}, and free CV and job posting.`,
  answer: `Islamabad’s jobs are concentrated in Blue Area (corporate offices), the commercial markaz of each sector (retail, clinics, small offices), the I-9 and I-10 Industrial Areas (manufacturing and warehouses) and the H-12 area (tech and universities). The minimum wage for unskilled full-time work is ${pkr(facts.ictMinWage)} per month from ${facts.ictMinWageFrom}. You can search vacancies, make a CV and post jobs free on Hirestaff.`,
  intro: [
    'Islamabad Capital Territory is home to the federal government, international organisations, banks, telecoms, software houses and thousands of households that employ drivers, cooks and helpers. Together with Rawalpindi it forms one labour market — many people live in one city and work in the other.',
    'Use this page as a starting point: browse by role, see where each kind of job is located, and check pay rules before you accept or make an offer.',
  ],
  areas: [
    {name: 'Blue Area', note: 'Banks, telecom, consultancies and corporate head offices along Jinnah Avenue.'},
    {name: 'F-6, F-7 and F-8', note: 'Super Market, Jinnah Super, Centaurus area: retail, restaurants, clinics, offices.'},
    {name: 'F-10, F-11 and E-11', note: 'Markaz offices, schools, restaurants and many households.'},
    {name: 'G-9, G-10, G-11 and G-13', note: 'Karachi Company market, academies, shops and services.'},
    {name: 'I-8, I-9 and I-10', note: 'I-8 Markaz offices; Industrial Areas for factories, warehouses, printing.'},
    {name: 'H-8, H-9, H-11 and H-12', note: 'Universities, hospitals and the technology park area.'},
    {name: 'G-5, G-6 and Diplomatic Enclave', note: 'Government, international organisations, security and drivers.'},
    {name: 'DHA, Bahria Town, Gulberg Greens, B-17', note: 'Schools, retail, real estate, security and household staff.'},
  ],
  body: [
    {h2: 'Pay and your rights in Islamabad', p: [
      `The notified minimum wage for unskilled adult workers in Islamabad Capital Territory is **${pkr(facts.ictMinWage)} per month** from ${facts.ictMinWageFrom}, up from ${pkr(facts.ictMinWagePrev)}. Separate rates apply to skilled, semi-skilled, part-time and domestic workers. Read the full [minimum wage guide](/blog/minimum-wage-islamabad-rawalpindi-2026/).`,
      'Household staff — maids, cooks, drivers, nannies — are covered by the ICT Domestic Workers Act 2022, and child domestic labour is banned in Islamabad. See [hiring domestic staff lawfully](/blog/hiring-domestic-staff-islamabad-law/).',
    ]},
    {h2: 'How to get hired faster in Islamabad', steps: [
      'Choose two or three target roles and the areas you can reach daily.',
      'Make a one-page CV with your phone/WhatsApp and area — try the [free CV maker](/cv/).',
      'Apply every working day on [Find jobs](/find-jobs/), company pages and through referrals.',
      'Prepare for interviews with our [common questions guide](/blog/job-interview-tips-pakistan/).',
      'Never pay a fee to get a job — see [fake job warning signs](/blog/fake-job-scams-pakistan/).',
    ]},
    {h2: 'For employers hiring in Islamabad', p: [
      'Adverts that show the area, salary range and hours get more relevant applicants. [Post a job for free](/post-job/) and follow our [hiring guide](/blog/how-to-hire-staff-in-islamabad/).',
    ]},
  ],
  faqs: [
    ['What is the minimum salary in Islamabad in 2026?', `${pkr(facts.ictMinWage)} per month for unskilled adult full-time workers, effective ${facts.ictMinWageFrom}.`],
    ['Which jobs are most in demand in Islamabad?', 'Common openings include drivers, cooks and household staff, receptionists and office assistants, sales and customer support, teachers, accountants and software developers.'],
    ['Where can I post a job in Islamabad for free?', 'On Hirestaff Islamabad — posting a job is free with no listing fee and no card required.'],
    ['Can I work in Islamabad and live in Rawalpindi?', 'Yes, many people do. The Metrobus Red Line connects Saddar (Rawalpindi) with Pak Secretariat (Islamabad).'],
  ],
  sources: [wageSources[0]],
},
{
  slug: 'jobs-in-rawalpindi', city: 'Rawalpindi',
  title: 'Jobs in Rawalpindi: areas, in-demand roles and commuting to Islamabad',
  description: `Find jobs in Rawalpindi — retail, wholesale, drivers, teachers, call centres and more. Area guide (Saddar, Committee Chowk, Murree Road, Chaklala), Punjab minimum wage and commuting tips.`,
  answer: `Rawalpindi’s main job areas are Saddar, Raja Bazaar and Committee Chowk (trade and retail), Murree Road and Satellite Town (shops, education, offices), Chaklala and Peshawar Road (logistics and workshops), plus Bahria Town and DHA. Rawalpindi follows Punjab’s minimum wage, last notified at ${pkr(facts.punjabMinWage)} per month, and many residents commute to Islamabad on the Metrobus.`,
  intro: [
    'Rawalpindi is a major trading city and, with Islamabad, part of one twin-city job market. It offers a large share of retail, wholesale, transport, education and service jobs, and is home to many people who work in Islamabad.',
  ],
  areas: [
    {name: 'Saddar', note: 'Retail, banks, clinics and the Metrobus Red Line terminus.'},
    {name: 'Raja Bazaar and Committee Chowk', note: 'Wholesale trade, shops, sales and delivery.'},
    {name: 'Murree Road and Satellite Town', note: 'Commercial Market, restaurants, academies and offices.'},
    {name: 'Chaklala and Peshawar Road', note: 'Logistics, workshops and cantonment services.'},
    {name: 'Westridge and Tench Bhatta', note: 'Local retail, schools and services.'},
    {name: 'Bahria Town and DHA', note: 'Schools, retail, real estate, security and household staff.'},
  ],
  body: [
    {h2: 'Pay rules in Rawalpindi', p: [
      `Rawalpindi is in Punjab, so the Punjab minimum wage applies — ${pkr(facts.punjabMinWage)} per month for 26 working days (Rs 1,538.46 per day), as notified in ${facts.punjabMinWageNotified}. Check whether a newer Punjab notification has been issued. If you work in Islamabad, the Islamabad rate (${pkr(facts.ictMinWage)}) applies instead.`,
      'Household workers in Rawalpindi are covered by the Punjab Domestic Workers Act 2019.',
    ]},
    {h2: 'Commuting from Rawalpindi to Islamabad', list: [
      'The **Metrobus Red Line** runs from Saddar along Murree Road to Faizabad and Pak Secretariat.',
      'From Faiz Ahmad Faiz station the **Orange Line** goes to Islamabad International Airport.',
      'Allow extra time at peak hours on Murree Road and the Islamabad Expressway.',
    ], after: ['More detail in [where the jobs are in Islamabad and Rawalpindi](/blog/where-the-jobs-are-islamabad-rawalpindi/).']},
    {h2: 'Popular roles in Rawalpindi', p: [
      'Retail and sales staff, delivery riders and drivers, teachers and academy tutors, call-centre agents, accountants for trading businesses, and household staff. Browse role guides below — the advice applies in both cities.',
    ]},
  ],
  faqs: [
    ['What is the minimum wage in Rawalpindi?', `Rawalpindi follows Punjab’s minimum wage, last notified at ${pkr(facts.punjabMinWage)} per month in ${facts.punjabMinWageNotified}.`],
    ['Is it easy to commute from Rawalpindi to Islamabad for work?', 'Yes for many routes — the Metrobus Red Line links Saddar to Pak Secretariat via Faizabad, with connections to the airport and other lines.'],
    ['Where are most shop and trading jobs in Rawalpindi?', 'Saddar, Raja Bazaar, Committee Chowk and the Commercial Market in Satellite Town.'],
  ],
  sources: [wageSources[1], {label: 'Wikipedia — Rawalpindi–Islamabad Metrobus', url: 'https://en.wikipedia.org/wiki/Rawalpindi%E2%80%93Islamabad_Metrobus'}],
},
];
export const placeBySlug = (s: string) => places.find(p => p.slug === s)!;
