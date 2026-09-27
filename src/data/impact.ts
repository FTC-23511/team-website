// Impact / Outreach Initiatives page content. Sources: the team's Google Site (scraped 2026-09-26) and
// "Sponsorship Package - FTC 23511, 2026.pdf" (pages 2-3). Every figure and claim traces to one of those;
// keep it that way when editing.

export type Link = { label: string; href: string; external?: boolean };

export const header = {
  title: 'Outreach Initiatives',
  // Sponsorship package, "More Than Just Robots".
  lede: 'Our team is about more than robots. We work to make STEM easier to reach for everyone, by sharing what we learn and bringing robotics to new communities.',
};

// Reach readout. Sponsorship package stat callouts: "10,000+ introduced to FIRST",
// "200+ teams impacted by our programs", "SolversLib - 14,500+ visits". The first item is set largest.
export const reach = [
  { value: '10,000+', label: 'People introduced to FIRST' },
  { value: '200+', label: 'Teams impacted by our programs' },
  { value: '14,500+', label: 'SolversLib visits' },
];

// The three programs, each with one figure from the sponsorship package. Classes use the package's
// "100+" (the older About Us page says "over 70"). Community Outreach carries "1,500+ showcased to live"
// so that no figure repeats the reach readout above it.
export const programs: {
  title: string;
  body: string;
  value: string;
  unit: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  links: Link[];
}[] = [
  {
    title: 'LEGO Robotics Classes',
    body: 'Our own curriculum, built from our FIRST LEGO League years, for kids entering grades 4 to 7.',
    value: '100+',
    unit: 'Students taught',
    image: '/images/home/classes.webp',
    alt: 'Three kids building a LEGO robot at a class table',
    width: 1400,
    height: 1050,
    links: [{ label: 'Classes', href: '/classes' }],
  },
  {
    title: 'Open-Source Engineering',
    body: 'As an Open Alliance team, we publish our CAD, code, and portfolios for others to learn from. We also maintain SolversLib, currently the only public library to support swerve for FTC.',
    value: '35,000+',
    unit: 'CAD part uses by other teams',
    image: '/images/home/cypher-cad.webp',
    alt: 'CAD render of Cypher v2 with two game balls',
    width: 1100,
    height: 1210,
    links: [
      { label: 'SolversLib docs', href: 'https://docs.seattlesolvers.com', external: true },
      { label: 'GitHub', href: 'https://github.com/FTC-23511', external: true },
      { label: 'Open Alliance', href: 'https://ftcopenalliance.org/teams/23511', external: true },
    ],
  },
  {
    title: 'Community Outreach',
    body: 'We take our robot to festivals, schools, and public events, and meet with nearby city councils and local state representatives to help everyone get access to STEM education.',
    value: '1,500+',
    unit: 'Reached at live showcases',
    image: '/images/home/salmon-days.webp',
    alt: 'A team member showing a young child the robot at the Salmon Days festival',
    width: 1000,
    height: 1333,
    links: [{ label: 'Community events', href: '#events' }],
  },
];

// The RISE School pilot. Sponsorship package, "Teaching"; the school's link is from the About Us page.
export const rise = {
  statement: 'We piloted our full-year curriculum at a school in Tamil Nadu, India, and trained the teachers who now run the class.',
  detail: 'We wrote it for rural schools around the world that don’t yet offer STEM education, and we’re looking to expand the program in the coming years.',
  home: 'Sammamish, Washington',
  school: { name: 'RISE School', href: 'https://www.indiarise.net/', place: 'Samiyandipudhur, Tamil Nadu, India' },
  visit: 'Summer 2025',
  days: '10',
  teachers: '2',
};

// Outreach Events page (a hidden page on the Google Site), in the site's order, one photo per event.
// Descriptions are the site's own, with its typos fixed. span: columns out of 12 on wide screens; each
// run of three entries fills one row (4 + 3 + 5, then 5 + 3 + 4), and the 3-column slots suit portrait photos.
export const events: {
  name: string;
  body: string;
  image: string;
  alt: string;
  width: number;
  height: number;
  span: 3 | 4 | 5;
  focus?: string;
}[] = [
  {
    name: 'VegFest',
    body: 'Our team attended VegFest, a vegetarian food festival.',
    image: '/images/impact/vegfest.webp',
    alt: 'Team members and visitors at the Seattle Solvers tent, under the team banner, at VegFest',
    width: 1100,
    height: 619,
    span: 4,
    focus: '32% 50%',
  },
  {
    name: 'Salmon Days',
    body: 'We attended Salmon Days, a festival celebrating the salmon’s migration.',
    image: '/images/impact/salmon-days.webp',
    alt: 'A team member helps a young girl drive the robot on an outdoor demo field at Salmon Days',
    width: 1100,
    height: 1467,
    span: 3,
    focus: '50% 18%',
  },
  {
    name: 'CodeWiz',
    body: 'Our team visited CodeWiz to showcase our robot to students and interest them in FIRST.',
    image: '/images/impact/codewiz.webp',
    alt: 'A boy drives the robot with a controller while other kids watch at CodeWiz',
    width: 1100,
    height: 825,
    span: 5,
    focus: '50% 30%',
  },
  {
    name: 'STEM Kit Expo',
    body: 'We collaborated with FTC Team 14343, FTC Team 19745, and FRC Team 1899 to showcase our robot and promote the mission of FIRST.',
    image: '/images/impact/stem-kit-expo.webp',
    alt: 'Seattle Solvers members with students in green team hoodies, gathered behind three robots at the STEM Kit Expo',
    width: 1100,
    height: 727,
    span: 5,
  },
  {
    name: 'Samantha Smith Elementary STEM Night',
    body: 'We attended the STEM night at Samantha Smith Elementary School to spread STEM and FIRST to students.',
    image: '/images/impact/stem-night.webp',
    alt: 'A team member points to the robot while students and parents look on in a covered school walkway',
    width: 1100,
    height: 1467,
    span: 3,
    focus: '50% 28%',
  },
  {
    name: 'Community Garage Sale',
    body: 'The team hosts an annual garage sale to raise funds and introduce the community to FIRST and STEM.',
    image: '/images/impact/garage-sale.webp',
    alt: 'The robot on a foam-tile demo field set up on a driveway, with team members and sale tables behind it',
    width: 1100,
    height: 825,
    span: 4,
    focus: '50% 40%',
  },
];
