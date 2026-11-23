// Facts reused across pages. Update here when a new notification is issued.
export const facts = {
  ictMinWage: 40700,          // PKR / month, unskilled, ICT, effective 1 July 2026 (notified 19 Aug 2026)
  ictMinWagePrev: 37000,      // PKR / month, from 1 July 2024
  ictMinWageFrom: '1 July 2026',
  ictMinWageNotified: '19 August 2026',
  punjabMinWage: 40000,       // PKR / month, Punjab (Rawalpindi), notified September 2025
  punjabMinWageNotified: 'September 2025',
  workingDays: 26,
  checked: '23 November 2026',
};
export const pkr = (n: number) => 'PKR ' + n.toLocaleString('en-PK');
export const perDay = (m: number) => Math.round((m / facts.workingDays) * 100) / 100;

export const wageSources = [
  {label: 'WageIndicator — Minimum wage increased in Islamabad from 1 July 2026', url: 'https://wageindicator.org/ai/work/minimum-wage/updates/2026/minimum-wage-increased-in-islamabad-pakistan-from-01-july-2026-august-20-2026/'},
  {label: 'Dawn — Punjab notifies Rs40,000 minimum wage (Sept 2025)', url: 'https://www.dawn.com/news/1940817'},
  {label: 'Business Recorder — Punjab increases minimum wage to Rs40,000', url: 'https://www.brecorder.com/news/amp/40382017'},
];
