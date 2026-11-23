import type {Post} from './types';
import {facts, pkr, perDay, wageSources} from './facts';

const ict = pkr(facts.ictMinWage), pun = pkr(facts.punjabMinWage);
const ictDay = perDay(facts.ictMinWage).toLocaleString('en-PK'), ictHour = (perDay(facts.ictMinWage) / 8).toFixed(2);
const punDay = perDay(facts.punjabMinWage).toLocaleString('en-PK'), punHour = (perDay(facts.punjabMinWage) / 8).toFixed(2);

export const posts: Post[] = [
{
  slug: 'how-to-find-a-job-in-islamabad',
  title: 'How to find a job in Islamabad in 2026: a step-by-step plan',
  seoTitle: 'How to Find a Job in Islamabad (2026 Step-by-Step Guide)',
  description: 'A practical, step-by-step plan to find a job in Islamabad or Rawalpindi in 2026: where vacancies are posted, how to apply, what to put on your CV and how to avoid scams.',
  category: 'Job seekers', published: '2026-11-23', updated: '2026-11-23',
  keywords: ['jobs in Islamabad', 'how to find a job in Islamabad', 'Islamabad jobs 2026', 'Rawalpindi jobs', 'naukri Islamabad'],
  answer: 'To find a job in Islamabad, decide on two or three target roles, prepare a one-page CV and a short WhatsApp-friendly cover message, then apply daily through job boards, company career pages and referrals. Focus on business hubs such as Blue Area, the I-9/I-10 Industrial Area and sector markaz, and never pay anyone a fee to apply.',
  takeaways: [
    'Pick a focus: two or three job titles you can prove you can do.',
    'A one-page CV with a phone number, area and recent experience beats a long one.',
    'Apply every working day — 5 to 10 tailored applications a week is a good pace.',
    'Use your network: many Islamabad jobs are filled through referrals.',
    'A real employer never asks you to pay to apply, train or be interviewed.',
  ],
  body: [
    {h2: 'Step 1: Decide what you are looking for', p: [
      'Employers in Islamabad receive many applications for every advertised role, so a vague search (“any job”) usually fails. Write down two or three job titles that match your experience — for example *office assistant*, *receptionist* and *data entry operator* — and the areas you can realistically reach each day.',
      'Think about commute early. Moving between Rawalpindi and Islamabad at rush hour can take more than an hour each way; the [Metrobus Red Line](/blog/where-the-jobs-are-islamabad-rawalpindi/) between Saddar and Pak Secretariat makes some routes easier.',
    ]},
    {h2: 'Step 2: Prepare a CV that gets read', p: [
      'Most recruiters spend less than a minute on a first read. Keep your CV to one page (two if you have 8+ years of experience), put your phone/WhatsApp number and area at the top, and list your most recent job first with three or four achievements.',
      'You can make one in a few minutes with the [free Hirestaff CV maker](/cv/) — it downloads as a PDF with no watermark. Our [CV guide for Pakistan](/blog/how-to-write-a-cv-pakistan/) explains each section.',
    ]},
    {h2: 'Step 3: Know where Islamabad jobs are posted', list: [
      '**Job boards:** [Hirestaff Islamabad](/find-jobs/) and other national job sites.',
      '**Company career pages and LinkedIn:** most offices in Blue Area, the IT parks and large employers post here first.',
      '**Referrals:** tell former colleagues, teachers and family exactly which role you want.',
      '**Walk-in and notice boards:** common for shop, restaurant, security and warehouse roles in markaz and industrial areas.',
      '**Government jobs:** only apply through the official department website or the newspaper advert it links to.',
    ]},
    {h2: 'Step 4: Apply properly — every day', steps: [
      'Read the whole advert and note the deadline, required experience and how to apply.',
      'Change the top of your CV (your summary) to match the role.',
      'Send a short message: who you are, the role, one reason you fit, and your availability.',
      'Name your file clearly, for example *Ayesha-Khan-Receptionist-CV.pdf*.',
      'Keep a simple list of where you applied and follow up politely after 5–7 working days.',
    ]},
    {h2: 'Step 5: Prepare for the interview', p: [
      'Expect questions about your experience, why you want the role, your salary expectation and your notice period. Practise answers out loud in the language the employer uses — often a mix of Urdu and English. See our [interview tips](/blog/job-interview-tips-pakistan/).',
    ]},
    {h2: 'Step 6: Check pay and terms before you accept', p: [
      `For full-time work in Islamabad Capital Territory, the notified minimum wage for unskilled workers is **${ict} per month** from ${facts.ictMinWageFrom}. In Rawalpindi (Punjab) the latest notified figure we found is ${pun}. Ask for the offer in writing: salary, working hours, days off, probation and notice period. Read [minimum wage in Islamabad and Rawalpindi](/blog/minimum-wage-islamabad-rawalpindi-2026/) for details.`,
    ]},
    {h2: 'Stay safe from fake job offers', p: [
      'If someone asks for a registration, training, medical or visa fee before you are hired, walk away. Read the full list of warning signs in [how to spot fake job offers in Pakistan](/blog/fake-job-scams-pakistan/).',
    ]},
  ],
  faqs: [
    ['Which areas of Islamabad have the most jobs?', 'Office jobs cluster in Blue Area along Jinnah Avenue and in sector markaz such as F-6, F-7, F-10, G-9 and I-8. Manufacturing, warehouse and workshop jobs are concentrated in the I-9 and I-10 Industrial Areas, and many tech roles are near the H-12 university and technology park area.'],
    ['How long does it take to find a job in Islamabad?', 'It varies by role and experience. Entry-level candidates who apply every working day with a tailored CV usually start getting interview calls within a few weeks; specialised or senior roles can take longer.'],
    ['Can I find a job in Islamabad without experience?', 'Yes. Look for trainee, internship, call-centre, retail, receptionist and office-assistant roles, highlight education, languages and computer skills, and include any volunteer or freelance work on your CV.'],
    ['Is it free to apply for jobs on Hirestaff Islamabad?', 'Yes. Applying is free and posting a job is free. Hirestaff never asks job seekers for money.'],
  ],
  related: ['/blog/how-to-write-a-cv-pakistan/', '/blog/job-interview-tips-pakistan/', '/jobs-in-islamabad/', '/blog/fake-job-scams-pakistan/'],
},
{
  slug: 'minimum-wage-islamabad-rawalpindi-2026',
  title: `Minimum wage in Islamabad and Rawalpindi (2026): ${ict} explained`,
  seoTitle: 'Minimum Wage Islamabad 2026: PKR 40,700 | Rawalpindi Rate',
  description: `Islamabad’s minimum wage is ${ict} per month from ${facts.ictMinWageFrom}. See the daily and hourly equivalents, the Rawalpindi (Punjab) rate and what employers and workers should check.`,
  category: 'Pay & law', published: '2026-11-23', updated: '2026-11-23',
  keywords: ['minimum wage Islamabad 2026', 'minimum wage Pakistan 2026', 'Rawalpindi minimum wage', 'ICT minimum wage', '40700 minimum wage'],
  answer: `The minimum wage in Islamabad Capital Territory is ${ict} per month for unskilled adult workers, effective ${facts.ictMinWageFrom} (notified ${facts.ictMinWageNotified}), up from ${pkr(facts.ictMinWagePrev)}. Rawalpindi follows Punjab’s rate, which was last notified at ${pun} per month in ${facts.punjabMinWageNotified}.`,
  takeaways: [
    `Islamabad (ICT): **${ict} / month** from ${facts.ictMinWageFrom}.`,
    `That is about **PKR ${ictDay} per day** (26 working days) or **PKR ${ictHour} per hour** for an 8-hour day.`,
    `Rawalpindi (Punjab): **${pun} / month** — Rs 1,538.46 per day, Rs 192.31 per hour.`,
    'Separate rates are notified for skilled, semi-skilled, part-time and domestic workers.',
    'Minimum wage is a floor: paying more is allowed, paying less is not.',
  ],
  body: [
    {h2: 'Current minimum wage rates', table: {caption: `Checked ${facts.checked}. Daily and hourly figures for Islamabad are our calculation (monthly ÷ 26 days ÷ 8 hours).`, head: ['Area', 'Per month', 'Per day (26 days)', 'Per hour (8-hour day)', 'Effective'], rows: [
      ['Islamabad Capital Territory', ict, 'PKR ' + ictDay, 'PKR ' + ictHour, facts.ictMinWageFrom],
      ['Rawalpindi (Punjab)', pun, 'PKR ' + punDay, 'PKR ' + punHour, 'Notified ' + facts.punjabMinWageNotified],
    ]}, after: [
      'These are the headline rates for unskilled adult workers. The federal notification for Islamabad also sets separate rates for skilled, semi-skilled, part-time and domestic workers, so check the category that applies to the job.',
    ]},
    {h2: 'Which rate applies to me?', list: [
      '**Where you work decides the rate**, not where you live. Someone living in Rawalpindi and working in Blue Area is covered by the Islamabad rate.',
      '**Full-time unskilled work** (helpers, cleaners, office boys, general labour) uses the headline monthly figure.',
      '**Skilled and semi-skilled** work has its own notified rates, which are higher.',
      '**Part-time and hourly** work has separate rates — agree hours in writing.',
      '**Domestic workers** in Islamabad are covered by a separately notified rate and by the [ICT Domestic Workers Act 2022](/blog/hiring-domestic-staff-islamabad-law/).',
    ]},
    {h2: 'How to calculate daily and hourly pay', p: [
      `Pakistani minimum-wage notifications are usually based on 26 working days a month and an 8-hour day. For Islamabad: ${ict} ÷ 26 = about PKR ${ictDay} per day, and ÷ 8 = about PKR ${ictHour} per hour. Punjab’s notification states Rs 1,538.46 per day and Rs 192.31 per hour directly.`,
      'If a worker is paid less than the minimum for the hours they actually work, the shortfall is the difference per day multiplied by the days worked.',
    ]},
    {h2: 'What employers in Islamabad should do', steps: [
      'Check every full-time salary is at or above the rate for the worker’s category.',
      'Put pay, hours, weekly off-day and notice period in a written appointment letter.',
      'Pay on a fixed date and keep a record (bank transfer or signed receipt).',
      'Review salaries each July, when new rates usually take effect after the federal budget.',
    ]},
    {h2: 'What workers should check', list: [
      'Your offer letter states a monthly salary, not just “depends on work”.',
      'Deductions for food or accommodation are agreed in advance — Punjab’s notification allows only limited, mutually agreed deductions.',
      'You are paid for overtime if you regularly work beyond agreed hours.',
    ]},
  ],
  faqs: [
    ['What is the minimum wage in Islamabad in 2026?', `${ict} per month for unskilled adult workers, effective ${facts.ictMinWageFrom}. It was notified on ${facts.ictMinWageNotified}.`],
    ['What was the previous minimum wage in Islamabad?', `${pkr(facts.ictMinWagePrev)} per month, in force from 1 July 2024 until the 2026 increase.`],
    ['Is the minimum wage the same in Rawalpindi and Islamabad?', `No. Islamabad’s rate is set by the federal government (${ict}); Rawalpindi follows Punjab’s rate, last notified at ${pun} in ${facts.punjabMinWageNotified}. Check whether Punjab has issued a newer notification.`],
    ['Does the minimum wage apply to maids and drivers?', 'In Islamabad, domestic workers are covered by a separately notified domestic-worker rate and by the ICT Domestic Workers Act 2022. Drivers employed by a business are covered by the general rates for their skill category.'],
  ],
  sources: wageSources,
  related: ['/blog/hiring-domestic-staff-islamabad-law/', '/blog/how-to-hire-staff-in-islamabad/', '/jobs-in-islamabad/', '/jobs-in-rawalpindi/'],
},
{
  slug: 'how-to-write-a-cv-pakistan',
  title: 'How to write a CV in Pakistan that gets interview calls (with format)',
  seoTitle: 'How to Write a CV in Pakistan (Format + Free CV Maker)',
  description: 'A simple CV format for jobs in Pakistan: what to include, what to leave out, one-page layout, examples for freshers and experienced staff, and a free CV maker.',
  category: 'Job seekers', published: '2026-11-23', updated: '2026-11-23',
  keywords: ['CV format Pakistan', 'how to make CV', 'CV for job in Islamabad', 'fresh graduate CV Pakistan', 'free CV maker'],
  answer: 'A good CV for jobs in Pakistan fits on one page and has six parts: name and contact (phone/WhatsApp, email, area), a two-line summary, work experience with achievements (newest first), education, skills and languages. Save it as a PDF named with your name and the role, and tailor the summary for each job.',
  takeaways: [
    'One page for most candidates; two only with long, relevant experience.',
    'Put phone/WhatsApp and your area (e.g. G-11, Islamabad) at the top.',
    'Show results: numbers, responsibilities, tools — not just duties.',
    'You do not need a photo, CNIC number, father’s name or religion on a private-sector CV.',
    'Send as PDF; make one in minutes with the [free CV maker](/cv/).',
  ],
  body: [
    {h2: 'The CV format that works', steps: [
      '**Header:** full name, job title you want, phone/WhatsApp, email, area and city.',
      '**Summary (2–3 lines):** your experience in years, main skills and the role you are applying for.',
      '**Work experience:** job title, employer, city, dates; then 2–4 bullet points with results.',
      '**Education:** highest qualification first, institution and year. Add grades only if strong.',
      '**Skills:** software, tools, driving licence class, typing speed, certifications.',
      '**Languages:** Urdu, English, Punjabi, Pashto etc. and your level.',
    ]},
    {h2: 'Write achievements, not duties', p: [
      'Compare “Responsible for reception” with “Handled 60+ visitors and 100 calls a day; cut appointment no-shows by confirming bookings on WhatsApp.” The second shows what you actually achieved.',
    ], list: [
      '**Sales:** targets met, monthly sales value, new clients.',
      '**Admin/office:** files managed, processes improved, time saved.',
      '**Driver:** years accident-free, routes known, licence class.',
      '**Accounts:** software (QuickBooks, Excel, Tally), reconciliations, payroll size.',
    ]},
    {h2: 'CV tips for freshers', list: [
      'Lead with education, final-year project and internships.',
      'Add volunteer work, freelance gigs and society roles — they show responsibility.',
      'List practical skills: MS Office, Google Sheets, social media, Canva, basic coding.',
    ]},
    {h2: 'What to leave out', list: [
      'CNIC number, father’s name, religion, marital status and full home address (area is enough).',
      'A photo, unless the employer specifically asks for one.',
      '“References available on request” — just share them when asked.',
      'Fancy fonts, colours and tables that break when printed or scanned.',
    ]},
    {h2: 'Sending your CV', p: [
      'Save as PDF and name the file *Firstname-Lastname-Role-CV.pdf*. When applying by WhatsApp or email, add a 3–4 line message with the role title, one reason you fit and when you can start.',
    ]},
  ],
  faqs: [
    ['Should I add a photo to my CV in Pakistan?', 'Only if the employer asks. Most private employers judge your CV on experience and skills; a photo is not required.'],
    ['How long should a CV be?', 'One page is ideal for freshers and most roles. Use two pages only if you have long, relevant experience.'],
    ['Can I make a CV in Roman Urdu?', 'For most office jobs use English. For household and driving roles a simple English or Roman Urdu CV is acceptable — the Hirestaff CV maker supports both.'],
    ['Is the Hirestaff CV maker free?', 'Yes. It is free, needs no sign-up and downloads a PDF with no watermark.'],
  ],
  related: ['/cv/', '/blog/job-interview-tips-pakistan/', '/blog/how-to-find-a-job-in-islamabad/'],
},
{
  slug: 'job-interview-tips-pakistan',
  title: 'Job interview tips for Pakistan: common questions and how to answer',
  seoTitle: 'Job Interview Tips Pakistan: Common Questions & Answers',
  description: 'How to prepare for a job interview in Islamabad or Rawalpindi: the questions you will be asked, sample answers, what to wear, salary talk and follow-up.',
  category: 'Job seekers', published: '2026-11-23', updated: '2026-11-23',
  keywords: ['interview tips Pakistan', 'interview questions and answers', 'job interview Islamabad', 'tell me about yourself answer'],
  answer: 'Prepare by researching the employer, practising answers to five common questions (tell me about yourself, why this job, strengths, a problem you solved, salary expectation), and bringing two printed CVs and original documents. Arrive 10–15 minutes early, answer with short real examples, and send a thank-you message the same day.',
  takeaways: [
    'Research the company and re-read the job advert the night before.',
    'Use short, real examples: situation, what you did, result.',
    'Know your expected salary range and your notice period.',
    'Carry two printed CVs, CNIC and original certificates.',
    'Follow up with a polite message within 24 hours.',
  ],
  body: [
    {h2: 'Common interview questions and how to answer', table: {head: ['Question', 'How to answer'], rows: [
      ['Tell me about yourself.', 'In 45 seconds: current/last role, years of experience, two key skills, and why you are applying here.'],
      ['Why do you want this job?', 'Link something specific about the role or company to your skills or goals.'],
      ['What are your strengths and weaknesses?', 'One strength with an example; one real weakness and what you are doing to improve it.'],
      ['Tell me about a problem you solved.', 'Situation → action you took → measurable result.'],
      ['What salary do you expect?', 'Give a researched range and say you are flexible for the right role.'],
      ['When can you join?', 'State your notice period honestly.'],
    ]}},
    {h2: 'Before the interview', steps: [
      'Confirm time, address and the interviewer’s name; plan your route and leave extra time for traffic.',
      'Prepare documents: two printed CVs, CNIC, original degrees, experience letters, driving licence if relevant.',
      'Practise answers aloud in the language the employer is likely to use — often a mix of Urdu and English.',
      'Prepare two questions to ask: what success looks like in 3 months, and the team you would join.',
    ]},
    {h2: 'On the day', list: [
      'Dress neatly: simple formal or shalwar kameez with a clean jacket is fine for most offices.',
      'Greet everyone politely, including reception and security staff.',
      'Keep your phone on silent and out of sight.',
      'Do not criticise a previous employer — explain why you want to move forward instead.',
    ]},
    {h2: 'Talking about salary', p: [
      `Research the going rate for the role and remember the legal floor: in Islamabad the minimum wage for unskilled full-time work is ${ict} per month. Ask what is included — transport, meals, overtime, medical — before you compare offers.`,
    ]},
    {h2: 'After the interview', p: [
      'Send a short thank-you message by email or WhatsApp the same day. If you have not heard back by the date they gave, follow up once, politely.',
    ]},
  ],
  faqs: [
    ['What should I bring to a job interview in Pakistan?', 'Two printed CVs, your CNIC, original educational certificates, experience letters and any licence or certification the job needs.'],
    ['How do I answer “tell me about yourself”?', 'Keep it under a minute: your current or last role, years of experience, two relevant skills and why you are interested in this specific job.'],
    ['Is it OK to ask about salary in the first interview?', 'It is fine if the interviewer raises it or near the end of the interview. Give a researched range rather than a single number.'],
  ],
  related: ['/blog/how-to-write-a-cv-pakistan/', '/blog/how-to-find-a-job-in-islamabad/', '/find-jobs/'],
},
{
  slug: 'how-to-hire-staff-in-islamabad',
  title: 'How to hire staff in Islamabad: a practical guide for employers',
  seoTitle: 'How to Hire Staff in Islamabad: Employer Guide 2026',
  description: 'Write a job ad that attracts the right people, screen and interview fairly, verify candidates and make a lawful offer in Islamabad and Rawalpindi. Post your job free.',
  category: 'Employers', published: '2026-11-23', updated: '2026-11-23',
  keywords: ['hire staff Islamabad', 'how to hire employees Pakistan', 'post a job free Pakistan', 'job advert template', 'recruitment Islamabad'],
  answer: 'To hire staff in Islamabad, write a clear job advert with the salary range, location, hours and how to apply; post it on job boards and your own channels; shortlist against 3–5 must-have criteria; interview with the same questions for every candidate; check references and CNIC; then confirm the offer in a written appointment letter that meets the minimum wage.',
  takeaways: [
    'Adverts that state a salary range and area get more relevant applicants.',
    'Decide 3–5 must-have criteria before reading CVs.',
    'Ask every candidate the same core questions and score answers.',
    'Verify CNIC, references and, for sensitive roles, police character certificate.',
    `Offer in writing at or above the legal minimum (${ict}/month in Islamabad).`,
  ],
  body: [
    {h2: 'Write a job advert people respond to', list: [
      '**Job title** people search for (e.g. “Receptionist”, not “Front Office Ambassador”).',
      '**Location:** sector or area (e.g. Blue Area, I-9 Industrial Area, Saddar Rawalpindi).',
      '**Salary range** and benefits (transport, meals, overtime, medical).',
      '**Hours, days and type:** full-time, part-time, shift, on-site/remote.',
      '**Must-haves** (max 5) and nice-to-haves.',
      '**How to apply** and the deadline.',
    ], after: ['You can [post a job on Hirestaff for free](/post-job/) — no listing fee and no card required.']},
    {h2: 'Shortlist fairly and quickly', steps: [
      'Screen CVs against your must-haves only; do not reject for photo, age or family details.',
      'Phone-screen the top 10–15 for 10 minutes: availability, salary expectation, commute.',
      'Invite 4–6 to interview; give a practical task where possible (typing test, sample email, driving test).',
    ]},
    {h2: 'Interview with a scorecard', p: [
      'Use the same 5–6 questions for everyone and score each answer from 1 to 5. Include one question about a real past situation (“Tell me about a time you…”) and one practical task. This reduces bias and makes the final decision easier to explain.',
    ]},
    {h2: 'Verify before you offer', list: [
      'Check the CNIC and keep a copy with consent.',
      'Call at least two references, ideally previous supervisors.',
      'Check certificates and licences for roles that need them.',
      'For drivers, guards and household staff, ask for a police character certificate.',
    ]},
    {h2: 'Make a lawful written offer', p: [
      `Put salary, hours, weekly off, probation, notice period and duties in an appointment letter. Full-time pay must be at least the notified minimum wage — ${ict} per month for unskilled workers in Islamabad, and ${pun} in Rawalpindi (Punjab). See [minimum wage 2026](/blog/minimum-wage-islamabad-rawalpindi-2026/).`,
    ]},
    {h2: 'Hiring household staff?', p: [
      'Maids, cooks, nannies and drivers working in a home in Islamabad are covered by the ICT Domestic Workers Act 2022. Read our [guide to hiring domestic staff lawfully](/blog/hiring-domestic-staff-islamabad-law/).',
    ]},
  ],
  faqs: [
    ['Is it free to post a job on Hirestaff Islamabad?', 'Yes. Posting a job is free, with no listing fee and no card required.'],
    ['What should a job advert in Pakistan include?', 'Job title, location, salary range, hours, must-have requirements, how to apply and a deadline.'],
    ['Do I need to give an appointment letter?', 'Yes — a written appointment letter with pay, hours, leave and notice period protects both sides and is expected under Pakistani labour law; for domestic workers in Islamabad it is required by the ICT Domestic Workers Act 2022.'],
  ],
  related: ['/post-job/', '/blog/hiring-domestic-staff-islamabad-law/', '/blog/minimum-wage-islamabad-rawalpindi-2026/', '/company-builder/'],
},
{
  slug: 'fake-job-scams-pakistan',
  title: 'Fake job offers in Pakistan: 10 warning signs and how to stay safe',
  seoTitle: 'Fake Job Scams in Pakistan: 10 Warning Signs (2026)',
  description: 'How to spot a fake job offer in Islamabad and across Pakistan: fee requests, too-good salaries, WhatsApp-only recruiters, fake overseas jobs — and what to do if you are targeted.',
  category: 'Job seekers', published: '2026-11-23', updated: '2026-11-23',
  keywords: ['fake jobs Pakistan', 'job scam Islamabad', 'job fraud warning signs', 'overseas job scam Pakistan'],
  answer: 'A job offer is likely fake if you are asked to pay any fee (registration, training, medical, uniform or visa) before being hired, if the salary is far above normal for little work, if there is no real company address or interview, or if you are pressured to decide immediately. Genuine employers never charge you to apply.',
  takeaways: [
    'Never pay to apply, train, be interviewed or “secure” a job.',
    'Check the company exists: address, website, landline, LinkedIn page.',
    'Overseas jobs should go through licensed Overseas Employment Promoters.',
    'Do not share bank OTPs, passwords or original documents.',
    'Report suspicious adverts to the platform where you saw them.',
  ],
  body: [
    {h2: '10 warning signs of a fake job', steps: [
      'They ask for money — registration, training, uniform, medical, security deposit or visa fee.',
      'Salary is unusually high for basic work, or you are “selected” without an interview.',
      'The recruiter only uses WhatsApp or a personal Gmail and avoids calls or meetings.',
      'There is no verifiable office address, website or landline.',
      'They pressure you: “only 2 seats left, pay today”.',
      'The job description is vague — “data entry from home, earn per click”.',
      'You are asked for bank login details, OTP codes or your ATM card.',
      'You must buy a product or starter kit to begin.',
      'The interview location keeps changing or is a private residence.',
      'Overseas offers that promise a visa within days without a licensed promoter.',
    ]},
    {h2: 'How to check an employer', list: [
      'Search the company name with “scam” or “fraud”.',
      'Look for a real address you can visit and a landline number.',
      'Check the recruiter’s profile and the company page on LinkedIn.',
      'For overseas jobs, confirm the agent is a licensed Overseas Employment Promoter with the Bureau of Emigration & Overseas Employment.',
    ]},
    {h2: 'If you have been targeted', steps: [
      'Stop all payments and do not share more documents.',
      'Save screenshots, phone numbers and payment receipts.',
      'If money was taken through a bank or wallet, contact the provider immediately.',
      'Report online fraud to the National Cyber Crime Investigation Agency (NCCIA, which took over the FIA Cyber Crime Wing’s role) and report the advert to the job platform.',
    ]},
    {h2: 'How Hirestaff keeps job seekers safe', p: [
      'Applying through Hirestaff is always free. Adverts that ask candidates for money break our rules and are removed. If you see one, report it to us at the email shown in the footer.',
    ]},
  ],
  faqs: [
    ['Is it normal to pay a fee for a job in Pakistan?', 'No. Legitimate employers do not charge candidates to apply, interview or train. Any upfront fee is a major red flag.'],
    ['How can I check if an overseas job is real?', 'Ask for the promoter’s licence number and verify it with the Bureau of Emigration & Overseas Employment before paying anything or handing over your passport.'],
    ['Where do I report a job scam?', 'Report it to the platform where you saw the advert and, for online fraud, to the National Cyber Crime Investigation Agency (NCCIA). Contact your bank immediately if you paid money.'],
  ],
  related: ['/blog/how-to-find-a-job-in-islamabad/', '/find-jobs/', '/faq/'],
},
{
  slug: 'hiring-domestic-staff-islamabad-law',
  title: 'Hiring a maid, cook, driver or nanny in Islamabad: what the law requires',
  seoTitle: 'Hiring Domestic Staff in Islamabad: Law & Checklist',
  description: 'A plain-language guide to hiring household staff in Islamabad under the ICT Domestic Workers Act 2022: appointment letters, leave, minimum age, pay and verification.',
  category: 'Employers', published: '2026-11-23', updated: '2026-11-23',
  keywords: ['hire maid Islamabad', 'domestic workers act Islamabad', 'driver for home Islamabad', 'cook job Islamabad', 'domestic staff verification'],
  answer: 'In Islamabad, household staff are protected by the ICT Domestic Workers Act 2022, which requires an appointment letter and entitles workers to leave and regulated working conditions. Child domestic labour is banned in Islamabad. Agree pay (at or above the notified rate), hours, weekly off and duties in writing, and verify CNIC, references and a police character certificate.',
  takeaways: [
    'The ICT Domestic Workers Act 2022 covers maids, cooks, drivers, nannies and caregivers working in homes in Islamabad.',
    'Give a written appointment letter stating pay, hours, days off and duties.',
    'Child domestic labour has been banned in Islamabad since 2020 — hire adults only.',
    'Pay at least the notified rate and pay on a fixed date.',
    'Verify CNIC, references and a police character certificate before the first day.',
  ],
  body: [
    {h2: 'What the law says (in plain language)', p: [
      'The **Islamabad Capital Territory Domestic Workers Act 2022** was signed into law in October 2022 to regulate the employment of domestic workers and protect their rights. Among other things, domestic workers must be issued an appointment letter and are entitled to leave.',
      'Separately, the federal government added **child domestic labour** to the prohibited occupations under the Employment of Children Act 1991 for Islamabad through a gazette notification in 2020. Employing children as household help in Islamabad is illegal.',
      'Rawalpindi is in Punjab, where the Punjab Domestic Workers Act 2019 applies.',
    ]},
    {h2: 'Checklist before hiring', steps: [
      'Write down the duties, hours, live-in or live-out, weekly off-day and salary.',
      'Interview in person and, for cooks and drivers, do a short practical trial (paid).',
      'Check the CNIC, keep a copy with consent, and confirm the person is an adult.',
      'Call at least two previous employers.',
      'Ask for a police character certificate.',
      'Sign an appointment letter — one copy each.',
    ]},
    {h2: 'What to put in the appointment letter', list: [
      'Names and CNIC numbers of employer and worker; start date.',
      'Role and main duties (cleaning, cooking, driving, childcare, elder care).',
      'Monthly salary, payment date and method; any food or accommodation provided.',
      'Daily hours, weekly off-day, annual and sick leave.',
      'Probation period and notice period for both sides.',
    ]},
    {h2: 'Pay', p: [
      `Islamabad notifies a separate minimum rate for domestic workers alongside the general rate (${ict} per month for unskilled full-time workers from ${facts.ictMinWageFrom}). Live-in staff often receive food and accommodation in addition to salary — agree in writing what is provided and never use it to push pay below the legal minimum.`,
    ]},
    {h2: 'Respect and safety', list: [
      'Do not hold a worker’s CNIC or other original documents.',
      'Provide a safe place to rest and access to a phone.',
      'Pay on time and keep a record.',
      'Any abuse of a domestic worker is a crime — report it to the police (15).',
    ]},
  ],
  faqs: [
    ['Do I need to give my maid an appointment letter in Islamabad?', 'Yes. The ICT Domestic Workers Act 2022 requires domestic workers to be issued an appointment letter.'],
    ['Can I hire a child as a domestic worker in Islamabad?', 'No. Child domestic labour has been prohibited in Islamabad Capital Territory since 2020 under the Employment of Children Act 1991.'],
    ['Does the same law apply in Rawalpindi?', 'No. Rawalpindi is in Punjab, where the Punjab Domestic Workers Act 2019 applies. The principles — written terms, fair pay, leave, no child labour — are similar.'],
    ['How do I verify a driver or maid?', 'Check the CNIC, call previous employers, request a police character certificate and, for drivers, check the licence and do a supervised test drive.'],
  ],
  sources: [
    {label: 'Dawn — President assents to Islamabad Domestic Workers Bill (Oct 2022)', url: 'https://www.dawn.com/news/1716436'},
    {label: 'Dawn — Child domestic labour banned in Islamabad (Aug 2020)', url: 'https://www.dawn.com/news/1572655/child-domestic-labour-banned-in-islamabad'},
    {label: 'WageIndicator — Domestic workers in Pakistan', url: 'https://wageindicator.org/en-pk/work-in-pakistan/labour-law/domestic-workers-in-pakistan/'},
    wageSources[0],
  ],
  related: ['/jobs-in-islamabad/maid-housekeeper/', '/jobs-in-islamabad/driver/', '/jobs-in-islamabad/cook/', '/blog/how-to-hire-staff-in-islamabad/'],
},
{
  slug: 'where-the-jobs-are-islamabad-rawalpindi',
  title: 'Where the jobs are in Islamabad and Rawalpindi: business areas and commuting',
  seoTitle: 'Where Are the Jobs in Islamabad & Rawalpindi? Area Guide',
  description: 'A local guide to the main employment areas of Islamabad and Rawalpindi — Blue Area, sector markaz, I-9/I-10 Industrial Area, H-12, Saddar — and how to commute by Metrobus.',
  category: 'Local guide', published: '2026-11-23', updated: '2026-11-23',
  keywords: ['jobs Blue Area Islamabad', 'I-9 industrial area jobs', 'Saddar Rawalpindi jobs', 'Islamabad metro bus commute', 'jobs near me Islamabad'],
  answer: 'In Islamabad, office and corporate jobs concentrate in Blue Area along Jinnah Avenue and in sector markaz (F-6, F-7, F-10, G-9, I-8); factory, warehouse and workshop jobs are in the I-9 and I-10 Industrial Areas; tech and research roles cluster around H-12. In Rawalpindi, Saddar, Committee Chowk and Murree Road are the main commercial areas. The Metrobus Red Line links Saddar with Pak Secretariat.',
  takeaways: [
    'Blue Area: banks, telecoms, consultancies and corporate offices.',
    'Sector markaz: retail, restaurants, clinics, schools, small offices.',
    'I-9 / I-10 Industrial Area: manufacturing, warehouses, printing, workshops.',
    'Saddar and Murree Road, Rawalpindi: retail, wholesale, services and transport.',
    'Plan your commute: the Metrobus network covers Saddar–Pak Secretariat, the airport, Bhara Kahu and Koral.',
  ],
  body: [
    {h2: 'Islamabad’s main employment areas', table: {head: ['Area', 'Typical jobs'], rows: [
      ['Blue Area (Jinnah Avenue)', 'Banking, telecom, consultancy, corporate admin, reception, accounts, sales'],
      ['Sector markaz (F-6, F-7, F-10, F-11, G-9, G-11, I-8)', 'Retail, restaurants, salons, pharmacies, clinics, schools, small offices'],
      ['I-9 and I-10 Industrial Areas', 'Manufacturing, warehouse, printing, packaging, workshops, drivers'],
      ['H-12 and H-9 (universities and technology parks)', 'Software, research, teaching, admin, internships'],
      ['G-5, G-6 and the Diplomatic Enclave area', 'Government, international organisations, security, drivers'],
      ['DHA, Bahria Town, Gulberg Greens', 'Schools, retail, real estate, household staff, security'],
    ]}},
    {h2: 'Rawalpindi’s main employment areas', table: {head: ['Area', 'Typical jobs'], rows: [
      ['Saddar', 'Retail, wholesale, banks, clinics, transport'],
      ['Raja Bazaar and Committee Chowk', 'Wholesale trade, shops, sales, delivery'],
      ['Murree Road and Satellite Town (Commercial Market)', 'Retail, restaurants, education, offices'],
      ['Chaklala and Peshawar Road', 'Logistics, workshops, cantonment services'],
      ['Bahria Town and DHA (Rawalpindi side)', 'Retail, schools, security, household staff'],
    ]}},
    {h2: 'Commuting between Rawalpindi and Islamabad', list: [
      '**Metrobus Red Line:** Saddar (Rawalpindi) to Pak Secretariat (Islamabad) along Murree Road, Faizabad and Jinnah Avenue.',
      '**Orange Line:** from the Peshawar Morr / Faiz Ahmad Faiz area to Islamabad International Airport, useful for airport and western-sector jobs.',
      '**Green and Blue Lines:** connect Bhara Kahu and Koral with PIMS, where they meet the Red Line.',
      'Factor peak-hour traffic on the Islamabad Expressway, Murree Road and Kashmir Highway into your daily travel time.',
    ]},
    {h2: 'Tips for searching locally', list: [
      'Search by area: “receptionist Blue Area”, “driver I-9”, “sales Saddar Rawalpindi”.',
      'For shop and restaurant jobs, visit markets in the morning before rush hours.',
      'When comparing offers, include travel time and cost — a nearer job at slightly lower pay can be worth more.',
    ]},
  ],
  faqs: [
    ['Where are most office jobs in Islamabad?', 'Blue Area along Jinnah Avenue has the highest concentration of corporate offices, followed by the commercial markaz of each sector.'],
    ['Is there public transport between Rawalpindi and Islamabad?', 'Yes. The Metrobus Red Line runs between Saddar in Rawalpindi and Pak Secretariat in Islamabad, with Orange, Green and Blue lines connecting the airport, Bhara Kahu and Koral.'],
    ['Where can I find factory jobs in Islamabad?', 'The I-9 and I-10 Industrial Areas have most of Islamabad’s manufacturing, warehouse and workshop employers.'],
  ],
  sources: [
    {label: 'Wikipedia — Rawalpindi–Islamabad Metrobus', url: 'https://en.wikipedia.org/wiki/Rawalpindi%E2%80%93Islamabad_Metrobus'},
    {label: 'Dawn — Green and Blue Line metro services inaugurated (2022)', url: 'https://www.dawn.com/news/1698735'},
  ],
  related: ['/jobs-in-islamabad/', '/jobs-in-rawalpindi/', '/blog/how-to-find-a-job-in-islamabad/'],
},
];

export const postBySlug = (s: string) => posts.find(p => p.slug === s);
export const sortedPosts = () => [...posts].sort((a, b) => b.published.localeCompare(a.published));
