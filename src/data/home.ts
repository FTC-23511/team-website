// Home page content. Sources: the team's Google Site (scraped 2026-09-26), the 2026 sponsorship
// package, and FTCScout. Keep claims traceable to those.
import { students } from './team';
import { headline, ordinal } from './awards';

// Quick stats on the home page. Sources, as of 2026-09-26:
// - members: the current students on the Meet the Team page (src/data/team.ts), counted live.
// - awards: 17 FTC and FLL awards counted in the 2026 sponsorship package, plus the Inspire Award
//   2nd place at the 2026 FIRST World Championship (Lovelace Division) recorded on FTCScout.
// - worlds: the Awards page's lead (`headline` in src/data/awards.ts): FTCScout FTCCMP1LOVE, the 2026
//   Lovelace Division, lists team 23511 at Inspire placement 2. Its year is the end of headline.date.
// - opr: FTCScout 2025-26 quick stats, total OPR rank 263 of 8,368 teams. Shown as a percentile,
//   (8,368 - 263) / 8,368 = 96.9%, the same convention as the sponsorship package's "Rank / Percentile".
// suffix: a placing's ordinal ending, set small after the numeral and read out as "2nd place".
const worlds = ordinal(headline.place);
export const stats: { value: string; suffix?: string; label: string; note: string }[] = [
  { value: String(students.length), label: 'Team members', note: 'Middle and high school students' },
  { value: '18', label: 'Awards', note: 'FTC and FIRST LEGO League' },
  { value: worlds.value, suffix: worlds.suffix, label: headline.award, note: `${headline.event}, ${headline.date.slice(-4)}` },
  { value: '96.9%', label: 'OPR percentile', note: '263rd of 8,368 teams, 2025-26' },
];

// Home hero background slideshow: the team's own photos (from the "top area photos" folder).
// focus is the object-position that keeps people in view as the hero crops each photo.
export const heroSlides = [
  { src: '/images/home/hero/slide-2.webp', w: 1920, h: 1273, focus: '35% 45%' },
  { src: '/images/home/hero/slide-3.webp', w: 1920, h: 1279, focus: '45% 65%' },
  { src: '/images/home/hero/slide-4.webp', w: 1920, h: 1281, focus: '65% 50%' },
  { src: '/images/home/hero/slide-5.webp', w: 1194, h: 806, focus: '50% 50%' },
];

// href is empty when the team's site gives no link for that sponsor.
// compact: a square or round mark that needs less padding to match the others' visual weight.
// caption: the mark has no name in it, so the name is printed under it.
// ratio: the logo file's width / height, used to size every mark by visual area.
// opaque: the logo carries its own background, so on the dark ground it just goes gray.
// darkMono: how the monochrome mark reads on the dark ground. Default inverts dark artwork to light;
//   'plain' keeps artwork that is already light (just gray), 'silhouette' makes a mid-tone wordmark white.
// grow: on the Sponsors page only, how much larger than its tier's size the logo is drawn (the team's call,
//   2026-09-27: Gene Haas Foundation half again as large, Amazon Robotics 35% larger).
export type Sponsor = {
  name: string;
  logo: string;
  href: string;
  ratio: number;
  compact?: boolean;
  caption?: boolean;
  opaque?: boolean;
  darkMono?: 'plain' | 'silhouette';
  grow?: number;
};
export const sponsorTiers: { tier: string; size: 'xl' | 'l' | 'm' | 's'; sponsors: Sponsor[] }[] = [
  {
    tier: 'Platinum',
    size: 'xl',
    sponsors: [{ name: 'Gene Haas Foundation', logo: '/images/sponsors/gene-haas-foundation.webp', href: 'https://ghaasfoundation.org/content/ghf/en/home.html', compact: true, ratio: 1.0, grow: 1.5 }],
  },
  {
    tier: 'Diamond',
    size: 'l',
    sponsors: [
      { name: 'Amazon Robotics', logo: '/images/sponsors/amazon-robotics.svg', href: 'https://www.aboutamazon.com/news/tag/robotics', ratio: 3.214, grow: 1.35 },
      { name: 'FRCTees', logo: '/images/sponsors/frctees.webp', href: 'https://frctees.com/', ratio: 5.0 },
    ],
  },
  {
    tier: 'Gold',
    size: 'm',
    sponsors: [
      { name: 'FIRST Washington', logo: '/images/sponsors/first-washington.webp', href: 'https://firstwa.org/', ratio: 5.039 },
      { name: 'Polymaker', logo: '/images/sponsors/polymaker.webp', href: 'https://polymaker.com/', ratio: 3.699, darkMono: 'plain' },
      { name: 'Onshape', logo: '/images/sponsors/onshape.webp', href: 'https://www.onshape.com/en/', ratio: 4.491 },
      { name: 'Brown Bear Car Wash', logo: '/images/sponsors/brown-bear-car-wash.webp', href: 'https://brownbear.com/', compact: true, ratio: 1.05, opaque: true },
      // 2976.org showed "Deployment Paused" on 2026-09-27, so the plate stays unlinked until the site is back.
      { name: 'Spartabots FRC 2976', logo: '/images/sponsors/spartabots-2976.webp', href: '', compact: true, ratio: 0.858 },
      { name: 'CodeWiz', logo: '/images/sponsors/codewiz.webp', href: '', compact: true, ratio: 0.774 },
      { name: 'Pack of Parts FRC 1294', logo: '/images/sponsors/pack-of-parts-1294.webp', href: 'https://www.packofparts.org/', compact: true, ratio: 1.102 },
      { name: 'Learner Labs', logo: '/images/sponsors/learner-labs.webp', href: 'https://learnerlabs.app/', ratio: 2.949 },
    ],
  },
  {
    tier: 'Silver',
    size: 's',
    sponsors: [
      { name: 'Swyft Robotics', logo: '/images/sponsors/swyft-robotics.webp', href: 'https://swyftrobotics.com/', ratio: 4.812, darkMono: 'silhouette' },
      { name: 'Ag-Grid Energy', logo: '/images/sponsors/ag-grid-energy.webp', href: 'https://aggridenergy.com/', ratio: 3.184, darkMono: 'silhouette' },
      { name: 'Fabworks', logo: '/images/sponsors/fabworks.webp', href: 'https://www.fabworks.com/', ratio: 6.507 },
      { name: 'AoPS Academy Bellevue', logo: '/images/sponsors/aops-academy-bellevue.webp', href: 'https://aopsacademy.org/campus/bellevue', compact: true, ratio: 1.053 },
    ],
  },
  {
    tier: 'Bronze',
    size: 's',
    sponsors: [{ name: 'Tektite', logo: '/images/sponsors/tektite.webp', href: 'https://tektitebiz.com/', compact: true, caption: true, ratio: 0.644 }],
  },
];
