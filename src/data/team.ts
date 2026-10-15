// Meet the Team content. Source: the About Us page of the team's Google Site
// (sites.google.com/view/seattlesolvers/about-us), scraped 2026-09-26. Names, roles and
// lines are as listed there, with only typos and dashes fixed. Update this file each season.

// "Our Mission", verbatim.
export const mission =
  'The purpose of the Seattle Solvers shall be to learn new skills, promote STEM in our communities through programs involving engineering and other technical skills, and most importantly, have fun!';

// From the Google Site's Sponsors page.
export const studentLed = 'Our team is fully student-led, and we fundraise 100% of our money.';

// photo is left out for a placeholder: the card shows the name's initial until the photo
// and roles arrive.
export type Student = {
  name: string;
  roles: string[];
  photo?: string;
};

// Current students: the captain first, then the order the Google Site lists them, then the newer members. Roles as the
// team set them on 2026-09-27.
export const students: Student[] = [
  {
    name: 'Ishaan',
    roles: ['Team Captain', 'Outreach Lead', 'Design Team', 'Finance Team'],
    photo: '/images/team/ishaan.webp',
  },
  {
    name: 'Arush',
    roles: ['Programming Lead', 'Finance Co-Lead'],
    photo: '/images/team/arush.webp',
  },
  {
    name: 'Sarannya',
    roles: ['Build Team', 'Outreach Team'],
    photo: '/images/team/sarannya.webp',
  },
  {
    name: 'Viraj',
    roles: ['CAD Lead', 'Outreach Team'],
    photo: '/images/team/viraj.webp',
  },
  {
    name: 'Erin',
    roles: ['Build Team', 'Finance Team', 'Outreach Team'],
    photo: '/images/team/erin.webp',
  },
  {
    name: 'Aarav',
    roles: ['Build Lead', 'Outreach Team'],
    photo: '/images/team/aarav.webp',
  },
  {
    name: 'Uthkarsh',
    roles: ['Design Team', 'Outreach Team', 'Build Team'],
    photo: '/images/team/uthkarsh.webp',
  },
  // The newer members below are not on the Google Site yet. Their photos and roles come from the team's live
  // site (seattlesolvers.com, 2026-09-27), with its role names mapped to this page's: Mechanical (CAD) is the
  // Design Team, Mechanical (Build) the Build Team; its "First Year" tag is not a role and is left out.
  {
    name: 'Vihaan',
    roles: ['Design Team', 'Programming Team', 'Outreach Team'],
    photo: '/images/team/vihaan.webp',
  },
  {
    name: 'Kabir',
    roles: ['Finance Co-Lead', 'Build Team'],
    photo: '/images/team/kabir.webp',
  },
  {
    name: 'George',
    roles: ['Programming Team', 'Finance Team'],
    photo: '/images/team/george.webp',
  },
  // Placeholder: add the photo when it is in.
  { name: 'Sanjay', roles: ['Design Team', 'Build Team', 'Outreach Team'] },
  {
    name: 'Brandon',
    roles: ['Finance Team', 'Programming Team'],
    photo: '/images/team/brandon.webp',
  },
];

// Former students. Roles are the ones they held on the team.
export const alumni: Student[] = [
  {
    name: 'Ajay',
    roles: ['Programming Co-Lead', 'Finance Lead'],
    photo: '/images/team/ajay.webp',
  },
  // Photo and roles from the team (2026-09-27); the CAD team is this page's Design Team.
  {
    name: 'Anthony',
    roles: ['Design Team', 'Outreach Team'],
    photo: '/images/team/anthony.webp',
  },
];

// team: the FIRST team shown beside the name on the Google Site, with its link when it has one.
// role: the mentoring or coaching role. lines: the rest of the entry, in the site's order.
// photo is left out for a placeholder, as with students.
export type Adult = {
  name: string;
  team?: { label: string; href?: string };
  role: string;
  lines: string[];
  photo?: string;
};

export const mentors: Adult[] = [
  {
    name: 'Aakarsh',
    team: { label: 'FRC 1294', href: 'https://www.packofparts.org/' },
    role: 'Outreach and PR Mentor',
    lines: [
      'Alumnus of FRC Team 1294, Pack of Parts',
      'Former President + Captain',
      'FIRST WA DEI Committee Chair',
      'Student at UPenn',
    ],
    photo: '/images/team/mentors/aakarsh.webp',
  },
  {
    name: 'Anish',
    team: { label: 'FTC 16700', href: 'https://jaybots.org/' },
    role: 'Software/Finance Mentor',
    lines: [
      'Alumnus of FTC Team 16700, Jaybots',
      'Former Captain + Programming Lead',
      'Excelsior Region’s Dean’s List Finalist',
      'Student at Stanford University',
    ],
    photo: '/images/team/mentors/anish.webp',
  },
  {
    name: 'Sanchit',
    team: { label: 'FRC 1294', href: 'https://www.packofparts.org/' },
    role: 'CAD/Design Mentor',
    lines: ['Alumnus of FRC Team 1294, Pack of Parts', 'Student at Purdue University'],
    photo: '/images/team/mentors/sanchit.webp',
  },
  {
    name: 'Aarsh',
    team: { label: 'FTC 12869', href: 'https://voyager6plus.weebly.com/' },
    role: 'Team Management Mentor',
    lines: [
      'Alumnus and co-captain of FTC Team 12869, Voyager 6+',
      'NorCal Dean’s List Semi-Finalist',
      'Student at UIUC',
    ],
    photo: '/images/team/mentors/aarsh.webp',
  },
  {
    name: 'Aaditya',
    team: { label: 'FRC 1294', href: 'https://www.packofparts.org/' },
    role: 'Software/Vision Mentor',
    lines: [
      'Alumnus of FRC Team 1294, Pack of Parts, former Software Lead',
      'Currently conducting CV/Robotics research at college',
    ],
    photo: '/images/team/mentors/aaditya.webp',
  },
  {
    name: 'Kai',
    team: { label: 'FTC 23383', href: 'https://ftcscout.org/teams/23383' },
    role: 'Awards/Team Management/Media Mentor',
    lines: [
      'Washington FIRST Tech Challenge Dean’s List Semi-Finalist (2023)',
      'WCI Executive Board',
      'Alumnus of FTC Team 23383, R-\u2060COURT and FRC 2147, CHUCK',
      'Student at Western Washington University',
    ],
    photo: '/images/team/mentors/kai.webp',
  },
  {
    // The Google Site repeated Aaditya's lines here by mistake; the team gave Devyn's own on 2026-09-27.
    name: 'Devyn',
    team: { label: 'FTC 14343', href: 'https://ftc14343.org/' },
    role: 'Software/Strategy Mentor',
    lines: ['Programming Lead of FTC Team 14343'],
    photo: '/images/team/mentors/devyn.webp',
  },
  {
    name: 'Spencer',
    role: 'Hardware/Team Management Mentor',
    lines: ['Robotics System Engineer at Amazon Robotics'],
    photo: '/images/team/mentors/spencer.webp',
  },
  {
    name: 'Win',
    role: 'Mentor',
    lines: ['Tool Design Engineer at Boeing'],
    photo: '/images/team/mentors/win.webp',
  },
  {
    // Moved over from the alumni on 2026-10-14.
    name: 'Saket',
    team: { label: 'FTC 23511' },
    role: 'CAD/Design Mentor',
    lines: ['Alumnus of FTC Team 23511, Seattle Solvers', 'Former Captain + Design/CAD Lead'],
    photo: '/images/team/mentors/saket.webp',
  },
  {
    name: 'Rowan',
    team: { label: 'FRC 1778', href: 'https://www.chillout1778.org/' },
    role: 'Programming/Design/CAD Mentor',
    lines: ['Alumnus of FRC Team 1778, Chill Out and FTC 3805, Atomic Robotics', 'Founder of WCI'],
    photo: '/images/team/mentors/rowan.webp',
  },
];

export const coaches: Adult[] = [
  {
    name: 'Zheng',
    role: 'Head Coach',
    lines: ['Software Coach'],
    photo: '/images/team/coach/zheng.webp',
  },
  {
    name: 'Raghu',
    role: 'Head Coach',
    lines: [],
    photo: '/images/team/coach/raghu.webp',
  },
];
