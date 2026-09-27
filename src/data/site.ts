export type NavLink = { label: string; href: string; external?: boolean };
export type NavItem = NavLink & { children?: NavLink[] };

export const team = {
  name: 'Seattle Solvers',
  number: '23511',
  program: 'FIRST Tech Challenge',
  place: 'Sammamish, Washington',
  mission: 'STEM for all',
};

// The site's structure. A parent with children opens a dropdown; its own href is only used to mark it active.
export const nav: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About',
    href: '/about/',
    children: [
      { label: 'Meet the Team', href: '/about/team/' },
      { label: 'Awards', href: '/about/awards/' },
      { label: 'Newsletters', href: '/about/newsletters/' },
      { label: 'Join the Team', href: '/apply/' },
    ],
  },
  { label: 'Impact', href: '/impact/' },
  {
    label: 'Robots',
    href: '/robots/',
    children: [
      { label: 'DECODE', href: '/robots/decode-2025-26/' },
      { label: 'INTO THE DEEP', href: '/robots/into-the-deep-2024-25/' },
    ],
  },
  {
    label: 'Resources',
    href: '/resources/',
    children: [
      { label: 'Overview', href: '/resources/' },
      { label: 'SolversLib Docs', href: 'https://docs.seattlesolvers.com', external: true },
      { label: 'Designs', href: '/resources/designs/' },
      { label: 'Portfolios', href: '/resources/portfolios/' },
      { label: 'Videos & Workshops', href: '/resources/videos/' },
    ],
  },
  { label: 'Classes', href: '/classes/' },
  {
    label: 'Sponsors',
    href: '/sponsors/',
    children: [
      { label: 'Our Sponsors', href: '/sponsors/' },
      { label: 'Become a Sponsor', href: '/sponsors/become-a-sponsor/' },
      { label: 'Donate', href: '/sponsors/donate/' },
    ],
  },
  { label: 'Contact', href: '/contact/' },
];

export const socials = [
  { label: 'Instagram', href: 'https://www.instagram.com/ftc23511/', icon: 'ph:instagram-logo' },
  { label: 'YouTube', href: 'https://www.youtube.com/@ftc23511', icon: 'ph:youtube-logo' },
  { label: 'Discord', href: 'https://discord.gg/dJbSWcXsUp', icon: 'ph:discord-logo' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ftc23511/', icon: 'ph:linkedin-logo' },
];

export const linktree = 'https://linktr.ee/ftc23511';

// The team's addresses and what each one is for (Google Site, Contact Us page).
export const emails = {
  team: 'team@seattlesolvers.com',
  business: 'business@seattlesolvers.com',
  mechanical: 'mechanical@seattlesolvers.com',
  software: 'software@seattlesolvers.com',
};

// Competition team recruiting (Google Site, Contact Us page, 2026-09-26): closed for 2026-27, opening again in
// May 2027 for the 2027-28 season. When applications open, set `open: true` and paste the form's link into `form`.
export const recruiting = {
  open: false,
  closedSeason: '2026-27',
  nextSeason: '2027-28',
  opens: 'May 2027',
  form: '',
};

/** Applications are open only when the status says so and there is a form to send people to. */
export const recruitingOpen = recruiting.open && !!recruiting.form;

export const donate = {
  hcb: 'https://hcb.hackclub.com/donations/start/ftc23511',
  giveLively: 'https://secure.givelively.org/donate/washington-first-robotics/ftc-23511',
};

// One label per intent, used everywhere on the page.
export const cta = { sponsor: { label: 'Sponsor us', href: '/sponsors/become-a-sponsor/' } };
