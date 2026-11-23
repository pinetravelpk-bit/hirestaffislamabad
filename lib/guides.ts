export type Guide={slug:string;title:string;description:string;answer:string;sections:{h:string;p?:string;list?:string[]}[];faqs:[string,string][]};

export const guides:Guide[]=[
{slug:'how-to-hire-domestic-staff-islamabad',title:'How to Hire Domestic Staff in Islamabad: A Step-by-Step Checklist',
description:'A practical checklist for hiring a maid, cook, driver or nanny in Islamabad: write the brief, check CNIC and references, interview, trial and sign an agreement.',
answer:'To hire domestic staff in Islamabad safely: write a clear brief (duties, hours, salary, day off), shortlist candidates, check the CNIC and call previous employers, interview in person, run a paid trial day, sign a simple written agreement, and register the employee with your local police station.',
sections:[
{h:'1. Write the job brief',p:'List the duties, working hours, weekly day off, whether the job is live-in or live-out, the salary, and what is not included. A written brief is the single best way to avoid disputes later.'},
{h:'2. Shortlist and check identity',list:['Ask for the original CNIC and keep a copy','Note the permanent and current address','Ask for two previous employers you can call','Check that experience matches your brief, not just the title']},
{h:'3. Interview and trial',p:'Interview in person with another family member present. For cooks, nannies and drivers, a short paid trial (a cooking trial, supervised childcare, a road test) shows far more than an interview.'},
{h:'4. Agree terms in writing',list:['Duties and hours','Salary, payment date and increments','Day off and annual leave','Notice period from both sides','Accommodation and meals for live-in staff']},
{h:'5. Register and onboard',p:'Many Islamabad families register domestic staff with the local police station (tenant/servant registration). Explain house rules on the first day and review how things are going after the first month.'},
],
faqs:[['Is police registration of domestic staff required in Islamabad?','Islamabad Police encourage residents to register domestic employees and tenants. It is a sensible safety step; ask your local police station or use the Islamabad Police online services for the current process.'],['How much notice should domestic staff give?','Agree it in writing — many households use two weeks to one month from either side.']]},

{slug:'live-in-vs-live-out-staff',title:'Live-in vs Live-out Staff: Which Is Right for Your Home?',
description:'Compare live-in and live-out domestic staff in Islamabad: costs, accommodation, hours, privacy and which roles suit each arrangement.',
answer:'Live-in staff stay at your home and suit early starts, late finishes, elderly care and homes far from public transport, but need a private room, meals and protected rest hours. Live-out staff come for set hours, give the family more privacy and suit cleaning, cooking and daytime childcare.',
sections:[
{h:'When live-in works best',list:['Elderly or patient care with night needs','Newborn care','Homes in Bahria Town, DHA, Bani Gala and other areas with limited transport','Families with very early or late schedules']},
{h:'When live-out works best',list:['Daily cleaning and laundry','Lunch and dinner cooking','Daytime childcare while parents work','Apartments without staff quarters']},
{h:'What live-in staff need',p:'A private, lockable room with ventilation, access to a bathroom, meals, clear rest hours (including uninterrupted sleep) and a weekly day off. Write these into the agreement.'},
{h:'Cost differences',p:'Live-in salaries are not automatically lower: accommodation and meals are a benefit, but the role usually covers longer availability. Agree the hours that count as work and pay overtime for extra duties.'},
],faqs:[['Do live-in staff get a day off?','Yes. A weekly day off and annual leave should be agreed in writing.']]},

{slug:'domestic-staff-agreement-checklist',title:'Domestic Staff Employment Agreement Checklist (Pakistan)',
description:'What to include in a written agreement with a maid, cook, driver, nanny or caregiver in Pakistan: duties, hours, salary, leave, notice and house rules.',
answer:'A domestic staff agreement in Pakistan should state the employee’s name and CNIC, job title and duties, working hours, salary and payment date, weekly day off and annual leave, accommodation and meals if live-in, probation and notice periods, and how disputes or concerns are raised.',
sections:[
{h:'Essential clauses',list:['Names and CNIC numbers of employer and employee','Job title and list of duties','Working hours and rest periods','Monthly salary, payment date and method','Weekly day off and annual/festival leave','Probation period and notice period','Accommodation, meals and uniform (if any)','Confidentiality and house rules']},
{h:'Keep it simple and fair',p:'Write in a language the employee understands (Urdu where needed), read it together, give them a copy and keep one yourself. Pay on time and keep a simple salary record signed by both sides.'},
{h:'Minimum wage',p:'Pakistan’s federal and provincial governments notify a minimum wage that is revised in the budget each year. Check the current Islamabad Capital Territory notification when agreeing pay.'},
],faqs:[['Should the agreement be in Urdu?','If the employee is more comfortable reading Urdu, provide an Urdu version or read it through together so the terms are understood.']]},

{slug:'questions-to-ask-when-hiring-a-maid',title:'20 Questions to Ask When Interviewing a Maid, Cook or Nanny',
description:'Interview questions for hiring domestic staff in Islamabad: experience, routine, references, safety and expectations, for maids, cooks, nannies and drivers.',
answer:'When interviewing domestic staff, ask about previous employers and why they left, a typical day in their last job, the tasks they are confident doing, their availability and day off, how they handle emergencies, and their salary expectations — then confirm the answers with references.',
sections:[
{h:'Experience and references',list:['Where have you worked before, and for how long?','Why did you leave your last job?','Can I call your previous employer?','Describe a normal day in your last job.']},
{h:'Skills for the role',list:['Maid: Which cleaning tasks do you do daily and weekly?','Cook: Which dishes do you cook most often? Can you cook for guests?','Nanny: What ages have you cared for? How do you settle a crying baby?','Driver: Which cars have you driven? Manual or automatic?']},
{h:'Availability and expectations',list:['Live-in or live-out?','Preferred day off?','Expected salary?','Any health conditions that affect the work?','When can you start?']},
{h:'Safety',list:['What would you do in a medical emergency?','Who would you call if something went wrong at home?','Are you comfortable with house rules on visitors and phones?']},
],faqs:[]},
];

export const guideBySlug=(slug:string)=>guides.find(g=>g.slug===slug);

export const generalFaqs:[string,string][]=[
['What is Hire Staff Islamabad?','Hire Staff Islamabad is a staffing service for Islamabad and Rawalpindi. We help households and businesses hire maids, cooks, drivers, nannies, elderly care attendants, chowkidars, office staff and more, and help job seekers find work and build a free CV.'],
['Which areas do you cover?','All Islamabad sectors (E, F, G, I, D and B sectors), DHA Islamabad, Bahria Town and Bahria Enclave, Gulberg Greens, Bani Gala, Chak Shahzad, PWD and Rawalpindi areas including Saddar, Chaklala and Satellite Town.'],
['How does the hiring process work?','You share a brief (role, duties, hours, salary, live-in or live-out). We shortlist candidates, collect CNIC and references, and arrange interviews. You meet candidates, take a trial where useful, and agree terms in writing before the start date.'],
['How long does it take to hire staff?','With a clear brief, a shortlist is usually ready within a few working days. Specialist roles (newborn nannies, continental chefs, dementia care) can take longer.'],
['Do you check staff before introducing them?','We collect each shortlisted candidate’s CNIC and contact previous employers where available. We also recommend that you verify the CNIC yourself, call references, and register staff with your local police station.'],
['What are your fees?','Fees depend on the role and arrangement and are agreed with you in writing before we start. Ask us for a quote with your brief.'],
['Can job seekers register for free?','Yes. Job seekers can build a free CV on this website and browse jobs. We never ask candidates for a fee to be introduced to an employer.'],
['Can employers post a job for free?','Yes. Employers can submit a vacancy free of charge through the Post a Job form; our team reviews it before it appears on the job board.'],
];
