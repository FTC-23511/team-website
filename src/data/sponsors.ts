// Sponsors pages content. Sources: the team's Google Site (Sponsors, Become A Sponsor and Donate
// pages, scraped 2026-09-26) and the 2026 sponsorship package (pages 4 and 5; revised 2026-09-26, the copy
// served from public/documents/). Keep every claim traceable to those.
// The logo wall itself comes from `sponsorTiers` in ./home.

import { donate, emails } from './site';

// Google Site, Sponsors page intro (verbatim).
export const sponsorsIntro =
  'Our team is fully student-led and we fundraise 100% of our money. A special thanks to our sponsors who allow us to compete and grow!';

// Google Site, Sponsors page: the Platinum and Diamond sponsors' own paragraphs (verbatim, in this site's comma
// and season-name style), keyed by the sponsor name used in `sponsorTiers`. `visit` is the "Check out their
// website" line, with its link; the link text names where it goes instead of "their website".
type Visit = { before: string; link: string; href: string; after: string };
export const sponsorStories: Record<string, { story: string; visit: Visit }> = {
  'Gene Haas Foundation': {
    story: 'The Gene Haas Foundation has been supporting the team since 2024, providing us with a monetary grant.',
    visit: {
      before: 'Check out ',
      link: 'the Haas CNC website',
      href: 'https://www.haascnc.com/index.html',
      after: ', which includes large manufacturing machines, tooling, and more!',
    },
  },
  'Amazon Robotics': {
    story:
      'Amazon Robotics has supported us for the 2025-26 season, DECODE, with not just monetary means, but an industry mentor as well!',
    visit: {
      before: 'Check out ',
      link: 'the Amazon Robotics news page',
      href: 'https://www.aboutamazon.com/news/tag/robotics',
      after: ' for the latest on Amazon Robotics’ most recent activity.',
    },
  },
  FRCTees: {
    story: 'FRCTees has given us a discount on our custom designed DECODE team jackets and apparel!',
    visit: {
      before: 'Check out ',
      link: 'the FRCTees shop',
      href: 'https://frctees.com/',
      after: ' to see all of their custom apparel options!',
    },
  },
};

// Google Site, Sponsors page, under the Silver tier (verbatim, split around the code and the link).
export const fabworksCode = {
  sponsor: 'Fabworks',
  code: 'FTC23511',
  href: 'https://www.fabworks.com/',
};

// Sponsorship contact (Google Site "Become A Sponsor" page and the PDF).
export const emailUs = {
  label: 'Email us',
  address: emails.business,
  href: `mailto:${emails.business}?subject=${encodeURIComponent('Sponsoring Seattle Solvers')}`,
};

// The PDF embedded on the Google Site's Become A Sponsor page. Update `meta` if the file is replaced.
export const sponsorshipPackage = {
  label: 'Sponsorship package (PDF)',
  href: '/documents/sponsorship-package-2026.pdf',
  meta: '5 pages, 3 MB',
};

// PDF page 5, "Sponsorship Tiers & Benefits". Ranges are written with "to" rather than a dash.
export type TierId = 'bronze' | 'silver' | 'gold' | 'diamond' | 'platinum' | 'presenting';
export const tiers: { id: TierId; name: string; from: string; to: string }[] = [
  { id: 'bronze', name: 'Bronze', from: '$100', to: 'to $249' },
  { id: 'silver', name: 'Silver', from: '$250', to: 'to $499' },
  { id: 'gold', name: 'Gold', from: '$500', to: 'to $999' },
  { id: 'diamond', name: 'Diamond', from: '$1,000', to: 'to $1,999' },
  { id: 'platinum', name: 'Platinum', from: '$2,000', to: 'to $4,999' },
  { id: 'presenting', name: 'Presenting', from: '$5,000', to: 'and up' },
];

// PDF page 5, the full benefits table: 14 rows by 6 tiers.
// `from`: included from that tier upward (every row in the PDF is cumulative).
// `detail`: included only in the tiers listed, each with the PDF's qualifier.
// `onRequest`: the PDF's "*" footnote. `customizable`: the PDF's "(customizable**)" footnote.
// `kind: 'logo'` draws the logo size as a growing plate.
export type Benefit = {
  label: string;
  onRequest?: boolean;
  customizable?: boolean;
  kind?: 'logo';
  from?: TierId;
  detail?: Partial<Record<TierId, string>>;
};
export const benefits: Benefit[] = [
  { label: 'Thank you letter signed by team', from: 'bronze' },
  { label: 'Bi-monthly newsletter with updates', from: 'bronze' },
  {
    label: 'Your logo on our website, team apparel, and robot',
    kind: 'logo',
    detail: { bronze: 'Small', silver: 'Small', gold: 'Medium', diamond: 'Medium', platinum: 'Large', presenting: 'Extra large' },
  },
  { label: 'Invitation to local events and competitions', from: 'silver' },
  { label: 'Shoutout on our social media', from: 'silver' },
  { label: 'Permission to use our logo, pictures, and other materials for promotional purposes', from: 'gold' },
  { label: 'Team apparel', onRequest: true, detail: { diamond: '3 total', platinum: '5 total', presenting: '7 total' } },
  { label: 'Paragraph written about you on our website', customizable: true, from: 'diamond' },
  { label: 'Custom plaque with thank you message', onRequest: true, from: 'diamond' },
  { label: 'Thanked during judging presentations', from: 'platinum' },
  { label: 'Poster with logo and description', customizable: true, from: 'platinum' },
  { label: 'Highlighted in team engineering portfolio', from: 'presenting' },
  { label: 'Exclusive presenting sponsor page on website and all social media', from: 'presenting' },
  { label: 'Dedicated 6 × 3 ft banner with logo', customizable: true, from: 'presenting' },
];

// The PDF's two footnotes under the table. The second one ends by pointing to the email address.
export const benefitNotes = {
  onRequest: { mark: '*', text: 'Team apparel and the custom plaque are given upon request of the sponsoring group via email.' },
  customizable: { mark: '**', text: 'Customizable content is created by the team by default. Email us to make changes to it!' },
};

// Whether a tier gets a benefit, and the PDF's qualifier if there is one.
export function benefitFor(b: Benefit, tier: TierId): { included: boolean; detail?: string } {
  if (b.detail) {
    const detail = b.detail[tier];
    return detail ? { included: true, detail } : { included: false };
  }
  const order = tiers.map((t) => t.id);
  return { included: !!b.from && order.indexOf(tier) >= order.indexOf(b.from) };
}

// What each tier adds to the one before it: new benefits, and bigger qualifiers on existing ones.
export function tierAdds(tier: TierId) {
  const i = tiers.findIndex((t) => t.id === tier);
  const prev = i > 0 ? tiers[i - 1].id : null;
  return benefits
    .map((b) => ({ benefit: b, now: benefitFor(b, tier), before: prev ? benefitFor(b, prev) : null }))
    .filter(({ now, before }) => now.included && (!before || !before.included || before.detail !== now.detail))
    .map(({ benefit, now }) => ({ benefit, detail: now.detail }));
}

// PDF page 4, "Why Sponsor Us?" and "Advertise Your Brand".
export const whySponsor = {
  lede: 'By sponsoring our team, you are directly investing in the next generation of engineers.',
  points: [
    {
      icon: 'ph:student',
      title: 'Zero membership fees',
      body: 'We charge zero membership fees so that any motivated student can join, regardless of family income.',
    },
    {
      icon: 'ph:wrench',
      title: 'Where your support goes',
      body: 'We rely entirely on sponsors like you and grants to cover robot parts, event travel, tools, outreach supplies, and registration fees.',
    },
    {
      icon: 'ph:t-shirt',
      title: 'Advertise your brand',
      body: 'In return for supporting our team, your logo will be advertised and marketed on all team apparel, social media, our robot, and more.',
    },
  ],
  // Google Site, Become A Sponsor page (verbatim).
  remember:
    'Remember, your contribution supports youth robotics worldwide, as our team works to help underserved communities, near and afar.',
};

// PDF page 4, "Social Media".
export const reach = {
  headline: { value: '100,000+', label: 'Reached digitally', note: 'Unique individuals' },
  figures: [
    { value: '13,000+', label: 'Website visits', note: 'Team website' },
    { value: '400+', label: 'Discord members', note: 'Team public Discord server' },
    { value: '200+', label: 'YouTube subscribers', note: 'YouTube channel' },
    { value: '50,000+', label: 'YouTube views', note: 'YouTube channel' },
    { value: '100,000+', label: 'Instagram viewers', note: 'Last 3 months' },
  ],
  source: 'From our 2026 sponsorship package',
};

// PDF page 5, "Interested in sponsoring our team?"
export const howToSponsor = {
  steps: [
    { title: 'Email us', body: 'Send us an email at' },
    {
      title: 'We reply',
      body: 'We will reply with our thanks and instructions on how to sponsor us via check, or another payment method you prefer.',
    },
  ],
  note: 'We appreciate any way you help, whether it is an in-kind or monetary sponsorship.',
};

// Donate page lede: the Google Site's contribution line (Become A Sponsor page), without "Remember,".
export const donateLede =
  'Give any amount online. Your contribution supports youth robotics worldwide, as our team works to help underserved communities, near and afar.';

// Google Site, Donate page: Hack Club first ("preferred"), then Give Lively. A no-break space keeps each
// service's name on one line when a label wraps.
export const donateOptions = [
  { name: 'Hack Club HCB', label: 'Donate with Hack Club', href: donate.hcb, host: 'hcb.hackclub.com', preferred: true },
  { name: 'Give Lively', label: 'Donate with Give Lively', href: donate.giveLively, host: 'secure.givelively.org', preferred: false },
];

// The PDF (page 4) and the Google Site (Become A Sponsor page).
export const taxNote = {
  status: 'We are a nonprofit 501(c)(3) organization.',
  deductible: 'All contributions are 100% tax deductible.',
};
