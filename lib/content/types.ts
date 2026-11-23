// Content model for guides, local pages and role pages.
// Strings support two inline marks: [text](/path) links and **bold**.

export type Block = {
  h2: string;
  p?: string[];
  list?: string[];
  steps?: string[];
  table?: {head: string[]; rows: string[][]; caption?: string};
  after?: string[]; // paragraphs after the list/table
};

export type Faq = [question: string, answer: string];
export type Source = {label: string; url: string};

export type Post = {
  slug: string;
  title: string;          // H1 and <title>
  seoTitle?: string;      // optional shorter <title>
  description: string;    // meta description
  category: 'Job seekers' | 'Employers' | 'Pay & law' | 'Local guide';
  published: string;      // YYYY-MM-DD
  updated: string;        // YYYY-MM-DD
  answer: string;         // 40–60 word direct answer shown first (AEO)
  takeaways: string[];
  body: Block[];
  faqs: Faq[];
  sources?: Source[];
  related?: string[];     // site paths
  keywords: string[];
};

export type Role = {
  slug: string;           // /jobs-in-islamabad/{slug}/
  name: string;           // e.g. "Driver"
  plural: string;         // e.g. "Driver jobs"
  title: string;
  description: string;
  answer: string;
  duties: string[];
  requirements: string[];
  pay: string[];
  where: string[];
  seekerTips: string[];
  employerTips: string[];
  faqs: Faq[];
  related?: string[];
};

export type Place = {
  slug: string;           // jobs-in-islamabad
  city: string;
  title: string;
  description: string;
  answer: string;
  intro: string[];
  areas: {name: string; note: string}[];
  body: Block[];
  faqs: Faq[];
  sources?: Source[];
};
