export type Area={
  slug:string;
  name:string;
  city:'Islamabad'|'Rawalpindi';
  kind:'Sector'|'Housing society'|'Commercial area'|'Suburb';
  nearby:string[];        // neighbouring areas (slugs)
  landmarks:string[];     // well-known public places, used for orientation only
  note:string;            // local hiring note
  common:string[];        // service slugs most requested here
};

export const areas:Area[]=[
{slug:'f-6',name:'F-6',city:'Islamabad',kind:'Sector',nearby:['f-7','g-6','e-7'],landmarks:['Supermarket (Markaz F-6)','Kohsar Market'],
note:'F-6 has many older family homes and embassy-area residences where long-serving live-in staff are common. Be clear about guest service, driving for diplomatic or official events and the language you expect at home.',common:['maids','cooks','drivers','elderly-care']},
{slug:'f-7',name:'F-7',city:'Islamabad',kind:'Sector',nearby:['f-6','f-8','e-7'],landmarks:['Jinnah Super Market','Gol Market'],
note:'F-7 combines family homes with offices and shops around Jinnah Super. Households often need a driver for school and market runs; businesses look for office boys, receptionists and cleaners for daytime shifts.',common:['drivers','maids','office-boys','receptionists']},
{slug:'f-8',name:'F-8',city:'Islamabad',kind:'Sector',nearby:['f-7','f-10','g-8'],landmarks:['F-8 Markaz','Islamabad district courts area'],
note:'F-8 is close to courts and offices, so many households have working parents who need dependable nannies, cooks and drivers with fixed morning start times.',common:['nannies','cooks','drivers','office-boys']},
{slug:'f-10',name:'F-10',city:'Islamabad',kind:'Sector',nearby:['f-11','f-8','g-10'],landmarks:['F-10 Markaz'],
note:'F-10 households range from family homes to apartments around the Markaz. For apartments, mention building entry rules and whether live-in accommodation is available, as many staff here are live-out.',common:['maids','cooks','babysitters','elderly-care']},
{slug:'f-11',name:'F-11',city:'Islamabad',kind:'Sector',nearby:['f-10','e-11','g-11'],landmarks:['F-11 Markaz'],
note:'F-11 has many newer homes and apartment buildings. Live-out staff need a clear transport plan — tell us if you provide pick-up or a travel allowance.',common:['maids','drivers','nannies','cooks']},
{slug:'e-7',name:'E-7',city:'Islamabad',kind:'Sector',nearby:['f-6','f-7'],landmarks:['Margalla Hills foothills'],
note:'E-7 has large houses at the foot of the Margalla Hills where households typically employ several staff — housekeeper, cook, driver, mali and chowkidar. Defining who supervises whom avoids friction.',common:['maids','cooks','drivers','gardeners','security-guards']},
{slug:'e-11',name:'E-11',city:'Islamabad',kind:'Sector',nearby:['f-11','g-11','d-12'],landmarks:['E-11 Markaz'],
note:'E-11 is largely apartments and private housing schemes. Many households hire part-time maids and babysitters; for live-in roles, confirm that the building allows resident staff.',common:['maids','babysitters','cooks','drivers']},
{slug:'d-12',name:'D-12',city:'Islamabad',kind:'Sector',nearby:['e-11','f-11'],landmarks:['Margalla Avenue'],
note:'D-12 is a newer, quieter sector away from main bus routes. Live-in staff are often preferred; if staff are live-out, agree a transport allowance.',common:['maids','gardeners','security-guards','drivers']},
{slug:'g-6',name:'G-6',city:'Islamabad',kind:'Sector',nearby:['f-6','g-7','blue-area'],landmarks:['Aabpara Market','Lal Masjid area'],
note:'G-6 is a central, older sector near Aabpara with government housing and small businesses. Part-time domestic help and office support staff are commonly requested.',common:['maids','office-boys','cleaners','helpers']},
{slug:'g-7',name:'G-7',city:'Islamabad',kind:'Sector',nearby:['g-6','g-8'],landmarks:['Sitara Market'],
note:'G-7 has a mix of government and private housing. Families often look for a part-time maid or cook with set hours that fit around office timings.',common:['maids','cooks','helpers']},
{slug:'g-8',name:'G-8',city:'Islamabad',kind:'Sector',nearby:['g-9','f-8','g-7'],landmarks:['PIMS hospital area','G-8 Markaz'],
note:'G-8 is next to the PIMS hospital area, so patient attendants and elderly care for families recovering at home are frequent needs. Share the discharge plan when you request care staff.',common:['patient-care','elderly-care','maids','cooks']},
{slug:'g-9',name:'G-9',city:'Islamabad',kind:'Sector',nearby:['g-8','g-10','g-11'],landmarks:['Karachi Company (G-9 Markaz)'],
note:'G-9 is a busy residential and commercial sector around Karachi Company. Shops and offices hire helpers, cleaners and office boys; homes look for maids and cooks.',common:['maids','helpers','office-boys','cleaners']},
{slug:'g-10',name:'G-10',city:'Islamabad',kind:'Sector',nearby:['g-9','g-11','f-10'],landmarks:['G-10 Markaz'],
note:'G-10 households commonly hire live-out maids and cooks. Agree start and finish times that fit public transport if staff commute.',common:['maids','cooks','tutors','babysitters']},
{slug:'g-11',name:'G-11',city:'Islamabad',kind:'Sector',nearby:['g-10','f-11','e-11','g-13'],landmarks:['G-11 Markaz'],
note:'G-11 has many apartments and family homes; part-time maids, home tutors and babysitters are frequent requests.',common:['maids','tutors','babysitters','cooks']},
{slug:'g-13',name:'G-13',city:'Islamabad',kind:'Sector',nearby:['g-11','g-14','i-8'],landmarks:['Kashmir Highway access'],
note:'G-13 is a large residential sector off Kashmir Highway. Families often want live-in staff because of the distance from older sectors; specify the room and facilities you provide.',common:['maids','drivers','cooks','nannies']},
{slug:'g-14',name:'G-14',city:'Islamabad',kind:'Sector',nearby:['g-13','b-17'],landmarks:['Kashmir Highway'],
note:'G-14 is a developing sector with newer homes. Chowkidars and malis are common requests alongside live-in maids.',common:['maids','security-guards','gardeners']},
{slug:'i-8',name:'I-8',city:'Islamabad',kind:'Sector',nearby:['g-8','h-8','g-13'],landmarks:['I-8 Markaz'],
note:'I-8 is a popular family sector with good access to the Expressway and Faizabad. Many households combine a maid with a family driver for school runs.',common:['maids','drivers','cooks','nannies']},
{slug:'blue-area',name:'Blue Area',city:'Islamabad',kind:'Commercial area',nearby:['g-6','f-6','f-7'],landmarks:['Jinnah Avenue'],
note:'Blue Area is Islamabad’s central business district along Jinnah Avenue. Offices here hire receptionists, office boys, cleaners and building security on fixed shifts.',common:['receptionists','office-boys','cleaners','security-guards']},
{slug:'dha-islamabad',name:'DHA Islamabad',city:'Islamabad',kind:'Housing society',nearby:['bahria-town','gulberg-greens'],landmarks:['GT Road / Expressway access'],
note:'DHA Islamabad requires gate entry for domestic staff. Tell us the phase, whether you will arrange gate passes, and whether the role is live-in or daily — daily staff need transport into the society.',common:['maids','cooks','drivers','security-guards','gardeners']},
{slug:'bahria-town',name:'Bahria Town',city:'Rawalpindi',kind:'Housing society',nearby:['dha-islamabad','pwd'],landmarks:['Bahria Town Phase 7 & 8','Bahria Enclave'],
note:'Bahria Town (Phases 1–8) and Bahria Enclave have strict entry rules and long internal distances, so live-in staff are the most common arrangement. Mention the phase and whether accommodation is separate from the main house.',common:['maids','cooks','drivers','nannies','elderly-care']},
{slug:'gulberg-greens',name:'Gulberg Greens',city:'Islamabad',kind:'Housing society',nearby:['dha-islamabad','bani-gala'],landmarks:['Islamabad Expressway'],
note:'Gulberg Greens has farmhouses and large plots. Households often need a team: mali, chowkidar, driver and housekeeper. Clarify accommodation and who is in charge on the property.',common:['gardeners','security-guards','drivers','maids']},
{slug:'bani-gala',name:'Bani Gala',city:'Islamabad',kind:'Suburb',nearby:['gulberg-greens','chak-shahzad'],landmarks:['Rawal Lake area'],
note:'Bani Gala homes are spread out with limited public transport, so live-in staff and a driver are usually needed. Mention road access and accommodation in your brief.',common:['maids','gardeners','security-guards','drivers']},
{slug:'chak-shahzad',name:'Chak Shahzad',city:'Islamabad',kind:'Suburb',nearby:['bani-gala','park-road'],landmarks:['National Agricultural Research Centre area','Farmhouses'],
note:'Chak Shahzad is known for farmhouses. Malis, chowkidars and caretakers are the most common requests; describe the land size and livestock or orchards, if any.',common:['gardeners','security-guards','helpers']},
{slug:'pwd',name:'PWD Society',city:'Islamabad',kind:'Housing society',nearby:['bahria-town','dha-islamabad'],landmarks:['Islamabad Expressway'],
note:'PWD Society and nearby Police Foundation are family neighbourhoods off the Expressway. Part-time and live-out maids are common; agree timings that suit Expressway traffic.',common:['maids','cooks','babysitters']},
{slug:'b-17',name:'B-17 (Multi Gardens)',city:'Islamabad',kind:'Housing society',nearby:['g-14','g-13'],landmarks:['GT Road'],
note:'B-17 (Multi Gardens) is a growing society on GT Road. Live-in arrangements are common because of distance; mention accommodation and the weekly day off.',common:['maids','security-guards','gardeners']},
{slug:'saddar-rawalpindi',name:'Saddar, Rawalpindi',city:'Rawalpindi',kind:'Commercial area',nearby:['chaklala','satellite-town'],landmarks:['Saddar Bazaar'],
note:'Saddar is Rawalpindi’s main commercial district. Shops and offices hire helpers, office boys and cleaners; nearby homes hire maids and cooks.',common:['helpers','office-boys','cleaners','maids']},
{slug:'chaklala',name:'Chaklala Scheme 3',city:'Rawalpindi',kind:'Housing society',nearby:['saddar-rawalpindi','satellite-town'],landmarks:['Chaklala Scheme 3'],
note:'Chaklala Scheme 3 is a settled family area. Maids, cooks and elderly care attendants are common requests; mention if you prefer staff who live nearby.',common:['maids','cooks','elderly-care','drivers']},
{slug:'satellite-town',name:'Satellite Town',city:'Rawalpindi',kind:'Housing society',nearby:['saddar-rawalpindi','chaklala'],landmarks:['Commercial Market'],
note:'Satellite Town is a dense, central Rawalpindi neighbourhood around Commercial Market. Part-time maids and home tutors are frequently requested.',common:['maids','tutors','cooks']},
];

export const areaBySlug=(slug:string)=>areas.find(a=>a.slug===slug);
export const islamabadAreas=areas.filter(a=>a.city==='Islamabad');
export const rawalpindiAreas=areas.filter(a=>a.city==='Rawalpindi');
