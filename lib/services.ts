export type Service={
  slug:string;
  name:string;          // singular role name
  plural:string;
  urdu:string;          // Urdu name, used in visible text and schema alternateName
  roman:string;         // common Roman Urdu search phrase
  group:'Home staff'|'Care staff'|'Business staff';
  keyword:string;       // primary search phrase
  title:string;         // meta title (<= ~60 chars)
  description:string;   // meta description (<= ~155 chars)
  answer:string;        // 40–60 word direct answer (answer-engine snippet)
  intro:string;
  duties:string[];
  arrangements:[string,string][];
  brief:string[];       // what to tell us
  checks:string[];      // how candidates are shortlisted
  boundary:string;      // what the role is not
  faqs:[string,string][];
  core:boolean;         // gets a page for every area
};

const checks=[
  'CNIC copy and current address collected before an interview is arranged',
  'Previous employer references contacted where the candidate has worked before',
  'Experience matched against your written brief, not just the job title',
  'Interview with you, followed by an agreed paid trial day where appropriate',
];

export const services:Service[]=[
{slug:'maids',name:'Maid',plural:'Maids',urdu:'ماسی / گھریلو ملازمہ',roman:'maid chahiye Islamabad',group:'Home staff',
keyword:'Maid in Islamabad',title:'Hire a Maid in Islamabad – Live-in & Part-time Maids',
description:'Hire a maid in Islamabad or Rawalpindi: live-in, full-day or part-time maids for cleaning, laundry and kitchen help, matched to your home and routine.',
answer:'To hire a maid in Islamabad, write down the daily duties, working hours, whether the maid will live in, the weekly day off and the monthly salary you offer. Hire Staff Islamabad shortlists maids against that brief, collects CNIC and references, and arranges interviews and a trial day before you decide.',
intro:'A good maid makes a household run smoothly, but “all house work” is not a job description. Most problems after hiring come from unclear duties, hours and days off. We help you write a clear brief first, then shortlist maids whose experience actually matches it.',
duties:['Daily sweeping, mopping, dusting and bathroom cleaning','Laundry, ironing and folding','Kitchen help: washing dishes, cutting vegetables, keeping the kitchen clean','Making beds, tidying rooms and weekly deep-cleaning tasks','Helping with guests and events by prior agreement'],
arrangements:[['Live-in','Stays at your home with a private room, meals, agreed rest hours and a weekly day off.'],['Full-day (live-out)','Arrives in the morning and leaves in the evening, usually 8–10 hours.'],['Part-time','A few hours a day or on set days for cleaning, laundry or kitchen work.']],
brief:['Size of the house (rooms, floors, bathrooms) and number of family members','Exact daily duties, and which duties are not included','Working hours, weekly day off and annual leave','Live-in or live-out, and the accommodation provided','Monthly salary, overtime and any increment after probation'],
checks,boundary:'A maid is not a nanny, cook or caregiver by default. If you need childcare, full cooking or elderly care as well, say so — it changes who is suitable and what a fair salary is.',
faqs:[['How quickly can I get a maid in Islamabad?','When the brief is clear, shortlisting usually takes a few working days. Live-in roles and specific requirements (language, experience with infants, no-smoking homes) can take longer.'],['Do you provide live-in maids?','Yes. Live-in maids need a private, lockable room, meals, rest hours and a weekly day off. These terms should be written into the agreement.'],['What documents should I keep for a maid?','Keep a copy of the CNIC, a recent photograph, emergency contact, references and a signed agreement stating duties, hours, salary and notice period. Many families also register domestic staff with their local police station.'],['Can a maid also cook?','Some maids can cook simple daily meals. If cooking is a main duty, hire a cook or state the menu clearly so the salary reflects the work.']],core:true},

{slug:'cooks',name:'Cook',plural:'Cooks & Chefs',urdu:'باورچی',roman:'cook chahiye Islamabad',group:'Home staff',
keyword:'Cook in Islamabad',title:'Hire a Cook in Islamabad – Home Cooks & Chefs',
description:'Hire a home cook or chef in Islamabad and Rawalpindi for Pakistani, continental or Chinese cooking. Live-in or live-out cooks, assessed with a cooking trial.',
answer:'To hire a cook in Islamabad, list the number of people, daily meals, cuisines (Pakistani, continental, Chinese, baking), kitchen duties and hours. Hire Staff Islamabad shortlists cooks with matching experience and arranges a practical cooking trial so you can judge taste, hygiene and timing before hiring.',
intro:'Cooks are hired on taste, hygiene and reliability — none of which shows on a CV. We shortlist cooks by the cuisines and workload you describe and recommend a practical trial with a menu you choose.',
duties:['Preparing breakfast, lunch and dinner to an agreed menu','Pakistani, continental, Chinese and BBQ cooking depending on experience','Baking, desserts and guest or event cooking by agreement','Kitchen hygiene, food storage and cleaning cooking surfaces','Preparing a grocery list; buying groceries only if agreed'],
arrangements:[['Live-in cook','Lives on the premises; meal service times and rest hours agreed in writing.'],['Live-out cook','Comes daily for set meals, typically morning to evening.'],['Part-time / event cook','For dinners, events or batch cooking on fixed days.']],
brief:['Household size and daily meals','Cuisines and typical dishes you expect','Dietary needs and allergies (from the family or doctor)','Who buys groceries and who approves spending','Whether dishwashing and kitchen cleaning are included'],
checks,boundary:'A cook should not be expected to plan clinical diets or take on unlimited cleaning. Medical diet instructions must come from your doctor or nutritionist.',
faqs:[['Can I take a cooking trial before hiring?','Yes. We recommend a paid trial with two or three dishes your family eats regularly, judged on taste, hygiene and timing.'],['Do you have cooks for continental and Chinese food?','Yes, we shortlist cooks by the cuisines you specify. Specialist chefs (continental, Chinese, baking) take longer to find than cooks for Pakistani home food.'],['Does a cook also clean the kitchen?','Usually the cook keeps cooking surfaces clean and stores food properly. Full dishwashing and kitchen deep-cleaning should be agreed upfront.']],core:true},

{slug:'drivers',name:'Driver',plural:'Drivers',urdu:'ڈرائیور',roman:'driver chahiye Islamabad',group:'Home staff',
keyword:'Driver in Islamabad',title:'Hire a Driver in Islamabad – Family & Company Drivers',
description:'Hire a family or company driver in Islamabad and Rawalpindi with a valid licence. School runs, office commutes and out-of-city trips, with references checked.',
answer:'To hire a driver in Islamabad, specify the vehicle (manual or automatic), daily routes such as school runs or office commutes, working hours, out-of-city travel and salary. Hire Staff Islamabad shortlists drivers with a valid driving licence and references, and you should take a road test before confirming.',
intro:'A driver spends time with your family and your vehicle every day. We shortlist drivers whose licence, driving experience and references fit your routes and working hours, and we recommend a road test on your actual car.',
duties:['School pick-up and drop-off and family errands','Office commutes and business meetings','Out-of-city trips (Murree, Lahore, Peshawar) by agreement','Basic vehicle care: fuel, cleaning, tyre pressure and service reminders','Keeping a fuel and mileage log if required'],
arrangements:[['Family driver','Day shift with school runs and family errands.'],['Company / executive driver','Office hours with meetings and airport runs.'],['Live-in driver','Stays on the premises for early or late duties; rest hours agreed.']],
brief:['Vehicle type and transmission (manual/automatic)','Typical daily routes and start/finish times','Out-of-city travel and night driving','Fuel arrangements and overtime pay','Whether the driver also does errands or household work'],
checks:['Driving licence seen and its category and validity checked',...checks.slice(0,3),'Road test on your vehicle before confirming'],
boundary:'A driver is not a security guard. If you need protection duties, hire a trained guard from a licensed security company.',
faqs:[['What should I check before hiring a driver?','See the original driving licence, CNIC and references, take a road test on your own car and agree overtime for late or out-of-city duties in writing.'],['Do you provide drivers for automatic cars?','Yes. Tell us the vehicle and transmission so we only shortlist drivers who regularly drive that type of car.'],['Can a driver also do household errands?','Many family drivers do errands like grocery runs. Agree the list of errands upfront so the workload is clear.']],core:true},

{slug:'nannies',name:'Nanny',plural:'Nannies & Babysitters',urdu:'آیا / نینی',roman:'aaya chahiye Islamabad',group:'Care staff',
keyword:'Nanny in Islamabad',title:'Hire a Nanny or Babysitter in Islamabad',
description:'Hire an experienced nanny, aaya or babysitter in Islamabad and Rawalpindi for newborns, toddlers and school-age children. Live-in or day nannies.',
answer:'To hire a nanny in Islamabad, describe the children’s ages, daily routine, feeding and sleep needs, hours and whether the nanny lives in. Hire Staff Islamabad shortlists nannies with experience for that age group, collects CNIC and references, and arranges supervised trial days before you decide.',
intro:'Childcare needs trust and a good routine. We shortlist nannies by the age of your children and the help you need, and we strongly recommend supervised trial days so you can see how they interact with your child.',
duties:['Feeding, bathing, dressing and changing','Following the child’s sleep and play routine','Preparing simple meals and sterilising bottles','Supervising homework and play for school-age children','Keeping the children’s rooms, clothes and toys tidy'],
arrangements:[['Live-in nanny','Stays with the family, with her own room, rest hours and a weekly day off.'],['Day nanny','Fixed daytime hours while parents work.'],['Babysitter','Evenings or occasional hours by arrangement.']],
brief:['Number and ages of children','Daily routine: feeding, naps, school runs','Hours, overnight duties and weekly day off','Language you want spoken with your child','Whether any household work is expected (keep it limited)'],
checks:[...checks.slice(0,2),'Experience with your child’s age group (newborn, toddler, school age)','Supervised trial days with a parent at home'],
boundary:'A nanny is not a nurse or a full-time maid. Medical care for a child must follow your paediatrician’s advice; heavy household cleaning should not be combined with caring for a young child.',
faqs:[['Do you have nannies for newborn babies?','Yes. Tell us the baby’s age and whether you need night care so we shortlist nannies with newborn experience.'],['Should a nanny also do house cleaning?','Light tidying related to the children is normal. Full house cleaning distracts from childcare and is better handled by a maid.'],['How do I check a nanny?','Speak to previous families, keep a CNIC copy, and have the nanny work with a parent at home for the first few days.']],core:true},

{slug:'elderly-care',name:'Elderly care attendant',plural:'Elderly Care Attendants',urdu:'بزرگوں کی دیکھ بھال',roman:'elderly care Islamabad',group:'Care staff',
keyword:'Elderly care in Islamabad',title:'Elderly Care at Home in Islamabad – Care Attendants',
description:'Home care attendants for elderly parents in Islamabad and Rawalpindi: help with daily routines, mobility, meals and medicine reminders. Live-in or shifts.',
answer:'Elderly care at home in Islamabad is usually arranged through a trained care attendant who helps with bathing, dressing, mobility, meals, medicine reminders and companionship. Hire Staff Islamabad shortlists live-in or shift attendants matched to your parent’s condition; clinical tasks such as injections need a qualified nurse.',
intro:'Most families would rather their parents stay at home than move to a care home. A dependable attendant makes that possible. We match attendants to your parent’s mobility, condition and routine — and tell you honestly when a nurse is needed instead.',
duties:['Help getting up, dressing, bathing and toileting with dignity','Safe walking, transfers and wheelchair support','Meals, hydration and medicine reminders as prescribed','Companionship, walks and accompanying to appointments','Reporting changes in health to the family'],
arrangements:[['Live-in attendant','24-hour presence with agreed rest hours and a weekly relief arrangement.'],['Day or night shift','12-hour shifts when family members cover the rest of the day.'],['Attendant + visiting nurse','Attendant for daily care, nurse visits for clinical tasks.']],
brief:['Your parent’s age, condition and mobility (walking, wheelchair, bed-bound)','Whether there is dementia, stroke recovery or diabetes','Gender preference for the attendant','Shift pattern and relief for days off','Any clinical tasks (these need a nurse)'],
checks:[...checks.slice(0,2),'Experience with the condition you describe (dementia, stroke, bed-bound care)','Trial shift with a family member present'],
boundary:'Care attendants are not nurses. Injections, IV lines, wound dressing and catheter care require a qualified nurse — see Patient care & home nursing.',
faqs:[['Is a care attendant the same as a nurse?','No. An attendant helps with daily living and companionship. Clinical tasks must be done by a qualified nurse.'],['Can I get a female attendant for my mother?','Yes. State your gender preference in the brief and we only shortlist accordingly.'],['Do you provide 24-hour care?','A live-in attendant can provide round-the-clock presence with rest hours. For intensive care, two shift attendants are safer than one person working 24 hours.']],core:true},

{slug:'patient-care',name:'Patient care attendant',plural:'Patient Care & Home Nursing',urdu:'مریض کی دیکھ بھال',roman:'patient attendant Islamabad',group:'Care staff',
keyword:'Patient care at home Islamabad',title:'Patient Care & Home Nursing Staff in Islamabad',
description:'Patient attendants and home nursing staff in Islamabad and Rawalpindi for post-surgery, stroke and bed-bound patients. Shift or live-in, matched to the care plan.',
answer:'For patient care at home in Islamabad, share the diagnosis, the doctor’s care plan, mobility and the shift pattern. Hire Staff Islamabad shortlists patient attendants for daily care and helps you find qualified nursing staff for clinical tasks, always following the treating doctor’s instructions.',
intro:'After a hospital stay, recovery at home needs the right mix of help. We shortlist patient attendants for personal care and, where the care plan needs it, nursing staff with relevant qualifications.',
duties:['Personal care, turning and positioning for bed-bound patients','Feeding support, including as directed by the care team','Monitoring and recording vital signs if trained','Medicine reminders exactly as prescribed','Coordination with family and the treating doctor'],
arrangements:[['12-hour shifts','Day or night shifts, often two attendants covering 24 hours.'],['Live-in','For stable long-term care with agreed rest hours.'],['Short-term','Post-surgery recovery for a few weeks.']],
brief:['Diagnosis and the doctor’s written care plan','Mobility and any equipment at home (hospital bed, oxygen)','Clinical tasks needed, if any','Shift pattern and start date','Gender preference'],
checks:['Training certificates seen where nursing tasks are required',...checks.slice(0,3)],
boundary:'We do not provide medical advice. All clinical decisions stay with the treating doctor; staff follow the written care plan.',
faqs:[['Do you provide qualified nurses?','Where the care plan needs clinical tasks we shortlist candidates with nursing qualifications and ask to see their certificates. Daily personal care can be handled by a trained attendant.'],['Can I hire for just a few weeks after surgery?','Yes. Short-term arrangements are common after surgery; agree the expected duration and notice period upfront.']],core:false},

{slug:'babysitters',name:'Babysitter',plural:'Babysitters',urdu:'بچوں کی دیکھ بھال',roman:'babysitter Islamabad',group:'Care staff',
keyword:'Babysitter in Islamabad',title:'Babysitters in Islamabad – Part-time Childcare',
description:'Part-time and evening babysitters in Islamabad for working parents. Tell us the hours and children’s ages and we shortlist suitable, referenced babysitters.',
answer:'A babysitter in Islamabad is usually hired for a few hours a day, evenings or school pick-up time. Share the children’s ages, days and hours, and whether you need pick-up from school. Hire Staff Islamabad shortlists referenced babysitters for those hours, and you meet them with your children first.',
intro:'For working parents who need cover after school, in the evenings or on set days, a part-time babysitter is often a better fit than a full-time nanny.',
duties:['After-school supervision and homework help','Evening and weekend childcare','Simple snacks and meals for children','Play, reading and age-appropriate activities'],
arrangements:[['After school','A few hours each weekday afternoon.'],['Evenings','When parents work late or go out.'],['Weekends','Set weekend hours.']],
brief:['Children’s ages','Days and hours','School pick-up or not','Language and activities you prefer'],
checks:checks.slice(0,3),boundary:'A babysitter is for supervised childcare during agreed hours, not household work.',
faqs:[['What is the difference between a nanny and a babysitter?','A nanny usually works full-time with the family’s routine; a babysitter covers shorter, set hours.']],core:false},

{slug:'security-guards',name:'Security guard',plural:'Security Guards & Chowkidars',urdu:'چوکیدار / سیکیورٹی گارڈ',roman:'chowkidar chahiye Islamabad',group:'Business staff',
keyword:'Security guard in Islamabad',title:'Security Guards & Chowkidars in Islamabad',
description:'Hire a chowkidar or security guard for your home, office or site in Islamabad and Rawalpindi. Day and night shifts. Armed guards via licensed companies only.',
answer:'To hire a chowkidar or security guard in Islamabad, state the property, day or night shift, gate and visitor duties, and whether armed security is needed. Hire Staff Islamabad shortlists unarmed chowkidars with references; armed guards must be deployed through a licensed private security company.',
intro:'For most homes and small offices, a reliable, referenced chowkidar on a clear shift is what is needed. We shortlist unarmed guards for gate, visitor and night-watch duties.',
duties:['Gate control and visitor logging','Night watch and property rounds','Receiving deliveries and parcels','Reporting incidents to the owner and, where needed, the police'],
arrangements:[['Night chowkidar','Night shift for homes and plazas.'],['Day guard','Office or site hours.'],['Two-shift cover','Day and night guards for 24-hour cover.']],
brief:['Property type and size','Shift timing and handover','Visitor and delivery procedure','Accommodation for the guard, if any'],
checks:checks.slice(0,3),boundary:'We do not supply armed guards. Armed security must be provided by a security company licensed by the Ministry of Interior.',
faqs:[['Do you provide armed guards?','No. Armed guards must be deployed through a licensed private security company. We provide unarmed chowkidars and gatekeepers.'],['Should I register my chowkidar with the police?','Yes, it is recommended to register household and building staff with your local police station using their CNIC.']],core:true},

{slug:'gardeners',name:'Gardener',plural:'Gardeners (Mali)',urdu:'مالی',roman:'mali chahiye Islamabad',group:'Home staff',
keyword:'Gardener in Islamabad',title:'Hire a Gardener (Mali) in Islamabad',
description:'Hire a mali / gardener in Islamabad and Rawalpindi for lawn care, plants, pruning and seasonal planting. Daily, weekly or part-time visits.',
answer:'A gardener (mali) in Islamabad is commonly hired for a few visits a week or a few hours a day. Tell us the lawn and garden size, plant types and visit schedule. Hire Staff Islamabad shortlists malis with experience in Islamabad’s seasons and references from previous homes.',
intro:'Islamabad’s hot summers, monsoon and cold winters each need different garden care. A mali with local experience keeps lawns and plants healthy all year.',
duties:['Lawn mowing, watering and edging','Pruning, hedge trimming and weeding','Seasonal planting and potting','Composting and fertilising','Keeping garden tools and area clean'],
arrangements:[['Part-time','Two or three visits a week.'],['Daily','A few hours each morning.'],['Full-time','For large houses, farmhouses and institutions.']],
brief:['Garden and lawn size','Plants, kitchen garden or pots','Visit days and hours','Tools and supplies provided'],
checks:checks.slice(0,3),boundary:'A mali looks after the garden; tree felling and electrical or plumbing work in the garden need specialists.',
faqs:[['How often should a mali visit?','For most houses, two to three visits a week are enough outside peak summer, when daily watering is needed.']],core:false},

{slug:'cleaners',name:'Cleaner',plural:'Cleaners & Janitorial Staff',urdu:'صفائی کا عملہ',roman:'cleaning staff Islamabad',group:'Business staff',
keyword:'Cleaning staff in Islamabad',title:'Cleaners & Janitorial Staff in Islamabad',
description:'Office, clinic and building cleaners in Islamabad and Rawalpindi. Daily janitorial staff for offices, schools and plazas, by shift.',
answer:'Offices, clinics and buildings in Islamabad hire cleaners on daily shifts for floors, washrooms, pantries and waste. Tell us the area in square feet, number of washrooms, shift timing and staff count. Hire Staff Islamabad shortlists janitorial staff with references and can provide a replacement process agreed in writing.',
intro:'Clean premises matter to staff, clients and patients. We shortlist cleaning staff for offices, clinics, schools and plazas based on area, footfall and shift.',
duties:['Floors, desks and common areas','Washroom and pantry cleaning and restocking','Waste collection and disposal','Window and glass cleaning at reachable heights'],
arrangements:[['Daily shift','Morning or evening cleaning before/after office hours.'],['Full-day','Continuous cleaning in high-footfall premises.']],
brief:['Area size and number of floors','Washrooms and pantries','Shift timing','Who supplies cleaning materials'],
checks:checks.slice(0,3),boundary:'Work at height, facade cleaning and pest control need specialist contractors.',
faqs:[['Do you provide cleaners for offices?','Yes, for offices, clinics, schools and plazas in Islamabad and Rawalpindi.']],core:false},

{slug:'office-boys',name:'Office boy',plural:'Office Boys & Tea Boys',urdu:'آفس بوائے',roman:'office boy job Islamabad',group:'Business staff',
keyword:'Office boy in Islamabad',title:'Hire an Office Boy in Islamabad',
description:'Hire an office boy / tea boy in Islamabad and Rawalpindi for tea service, errands, filing, photocopies and keeping the office tidy.',
answer:'To hire an office boy in Islamabad, list the duties (tea and refreshments, errands, photocopying, filing, cleaning), office hours and whether a motorcycle is needed for errands. Hire Staff Islamabad shortlists office boys with references and experience in similar offices.',
intro:'An office boy keeps a small office running — refreshments, errands and paperwork. We shortlist candidates who fit your office hours and duties.',
duties:['Tea, coffee and refreshments for staff and visitors','Bank, courier and utility errands','Photocopying, scanning and filing','Keeping the office and pantry tidy'],
arrangements:[['Office hours','Standard working day, Monday to Friday or Saturday.']],
brief:['Office size and staff count','Duties and errands','Whether he needs a motorcycle and licence','Office hours and salary'],
checks:checks.slice(0,3),boundary:'Cash-handling errands should have clear limits and receipts.',
faqs:[['Can an office boy run bank errands?','Many do. Agree limits for cash handling and ask for receipts for every errand.']],core:false},

{slug:'receptionists',name:'Receptionist',plural:'Receptionists & Front Desk',urdu:'ریسپشنسٹ',roman:'receptionist job Islamabad',group:'Business staff',
keyword:'Receptionist in Islamabad',title:'Hire a Receptionist in Islamabad',
description:'Receptionists and front-desk staff for offices, clinics and showrooms in Islamabad. Shortlisted for communication, computer skills and presentation.',
answer:'To hire a receptionist in Islamabad, describe the front-desk duties (calls, visitors, appointments, basic computer work), languages needed and office hours. Hire Staff Islamabad shortlists candidates and you can test call handling and basic computer skills in the interview.',
intro:'The front desk is the first impression of your office or clinic. We shortlist receptionists for communication, reliability and the software skills you need.',
duties:['Greeting visitors and managing the front desk','Answering calls and taking messages','Appointment booking and calendars','Basic data entry, email and MS Office'],
arrangements:[['Full-time','Office hours.'],['Shift','Clinics and showrooms with evening hours.']],
brief:['Type of office or clinic','Languages (English, Urdu)','Software used','Hours and salary'],
checks:['Education and certificates seen',...checks.slice(1,3)],boundary:'Receptionists handle the front desk; accounting and HR work need separate roles.',
faqs:[['Do you place receptionists for clinics?','Yes, for clinics, offices, showrooms and schools.']],core:false},

{slug:'helpers',name:'Helper',plural:'General Helpers & Houseboys',urdu:'ہیلپر',roman:'helper chahiye Islamabad',group:'Home staff',
keyword:'Helper in Islamabad',title:'Hire a Helper or Houseboy in Islamabad',
description:'General helpers and houseboys in Islamabad and Rawalpindi for cleaning, errands, lifting, guest service and support around the home or shop.',
answer:'A general helper or houseboy in Islamabad supports the household or a small business with cleaning, errands, lifting and serving guests. List the duties and hours clearly; Hire Staff Islamabad shortlists helpers with references and agrees the role in writing.',
intro:'Some homes and shops need an all-round helper. The key is to agree which tasks are included so the job stays fair and manageable.',
duties:['Cleaning and outdoor washing','Errands and grocery runs','Serving guests','Lifting and shifting','Car washing'],
arrangements:[['Live-in','Stays on the premises.'],['Day','Fixed daily hours.']],
brief:['List of tasks','Hours and day off','Live-in or live-out','Salary'],checks:checks.slice(0,3),
boundary:'A helper is not a substitute for a trained cook, driver or caregiver.',
faqs:[['What is a houseboy?','A male helper who handles cleaning, errands and guest service in a home.']],core:false},

{slug:'tutors',name:'Home tutor',plural:'Home Tutors',urdu:'ہوم ٹیوٹر',roman:'home tutor Islamabad',group:'Care staff',
keyword:'Home tutor in Islamabad',title:'Home Tutors in Islamabad – O/A Level, Matric, FSc',
description:'Find a home tutor in Islamabad and Rawalpindi for primary, Matric, FSc, O and A Level subjects. Matched by subject, level and schedule.',
answer:'To find a home tutor in Islamabad, specify the class or level (primary, Matric, FSc, O/A Level), subjects, board, days and timing. Hire Staff Islamabad shortlists tutors with relevant qualifications and teaching experience, and a trial class helps you judge the fit.',
intro:'Good tutoring depends on subject knowledge and the ability to explain. We match tutors by level, subject and board, and recommend a trial class.',
duties:['Subject teaching and homework help','Exam preparation and past papers','Progress updates to parents'],
arrangements:[['Home tuition','At your home on set days.'],['Online','For older students, by agreement.']],
brief:['Class, board and subjects','Days and timings','Tutor gender preference','Fee per month'],
checks:['Education certificates seen',...checks.slice(1,3),'Trial class before confirming'],
boundary:'Tutors support learning; they cannot guarantee exam results.',
faqs:[['Do you have tutors for O and A Levels?','Yes. Tell us the subjects and exam series so we shortlist suitable tutors.']],core:false},
];

export const serviceBySlug=(slug:string)=>services.find(s=>s.slug===slug);
export const coreServices=services.filter(s=>s.core);
export const groups=['Home staff','Care staff','Business staff'] as const;
