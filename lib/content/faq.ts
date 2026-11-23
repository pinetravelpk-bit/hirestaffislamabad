import type {Faq} from './types';
import {facts, pkr} from './facts';

export const siteFaqs: {group: string; items: Faq[]}[] = [
  {group: 'About Hirestaff Islamabad', items: [
    ['What is Hirestaff Islamabad?', 'Hirestaff Islamabad (hirestaffislamabad.pk) is a jobs and hiring website for Islamabad, Rawalpindi and the rest of Pakistan. Job seekers can search vacancies and make a free CV; employers can post jobs and create a company profile for free.'],
    ['Which areas does Hirestaff cover?', 'Islamabad Capital Territory (all sectors, DHA, Bahria Town, Gulberg, B-17 and surrounding areas) and Rawalpindi, plus jobs elsewhere in Pakistan and remote roles.'],
    ['Is Hirestaff free?', 'Yes. Searching and applying for jobs is free, the CV maker is free, and posting a job is free with no listing fee and no card required.'],
  ]},
  {group: 'For job seekers', items: [
    ['How do I apply for a job on Hirestaff?', 'Open a vacancy on [Find jobs](/find-jobs/) and follow the employer’s instructions — usually their website, email or WhatsApp. Applications go directly to the employer.'],
    ['How do I make a CV for free?', 'Use the [free CV maker](/cv/): fill in your details, choose a template and download a PDF — no sign-up and no watermark.'],
    ['Will anyone ask me to pay for a job?', 'Genuine employers never charge candidates. If anyone asks for a registration, training, medical or visa fee, do not pay and report the advert. See [fake job warning signs](/blog/fake-job-scams-pakistan/).'],
    ['What is the minimum wage in Islamabad?', `${pkr(facts.ictMinWage)} per month for unskilled adult full-time workers from ${facts.ictMinWageFrom}. Rawalpindi follows Punjab’s rate (${pkr(facts.punjabMinWage)}). [Full guide](/blog/minimum-wage-islamabad-rawalpindi-2026/).`],
  ]},
  {group: 'For employers', items: [
    ['How do I post a job?', 'Go to [Post a job](/post-job/), describe the role, salary, location and how to apply, and publish. It is free.'],
    ['Can I hire household staff through Hirestaff?', 'Yes — you can advertise for drivers, cooks, maids, nannies and caregivers. In Islamabad, household staff are covered by the ICT Domestic Workers Act 2022; read [our guide](/blog/hiring-domestic-staff-islamabad-law/).'],
    ['What should my job advert include?', 'Job title, area, salary range, hours, must-have requirements, how to apply and a deadline. See the [hiring guide](/blog/how-to-hire-staff-in-islamabad/).'],
  ]},
];
export const allSiteFaqs = siteFaqs.flatMap(g => g.items);

// Shown in the homepage FAQ and mirrored in its FAQPage schema.
export const homeFaqs: [string, string][] = [
  ['Is Hirestaff Islamabad free?', 'Yes. Searching and applying for jobs, making a CV and posting a job are all free. Hirestaff never charges job seekers.'],
  ['Which areas do you cover?', 'All of Islamabad Capital Territory — Blue Area, F, E, G, H and I sectors, DHA, Bahria Town, Gulberg and B-17 — plus Rawalpindi, the rest of Pakistan and remote roles.'],
  ['What is the minimum wage in Islamabad in 2026?', `${pkr(facts.ictMinWage)} per month for unskilled full-time adult workers, from ${facts.ictMinWageFrom}. Rawalpindi follows Punjab’s rate of ${pkr(facts.punjabMinWage)}.`],
  ['Is this a working job marketplace?', 'Free job posting, account-owned company profiles and the CV builder are available. Find Jobs shows employer-posted vacancies; applications go to their website or email. The separate Studio remains an interactive concept with fictional jobs and device-only data.'],
  ['What makes the radar different?', 'Each fit score breaks down skills, salary, location and work mode. You can inspect gaps and change priorities. It is not a prediction of hiring success.'],
  ['Does a passport verify my skills?', 'Work samples are self-submitted and labelled. Completing a practice task does not award a verified credential.'],
];
