// Resources pages content (/resources and its Designs, Portfolios, and Videos & Workshops pages). Sources:
// - The Resources, Designs and Documents pages of the team's Google Site (scraped 2026-09-27).
// - The 2026 sponsorship package: the SolversLib line and "14,500+ visits", and "35,000+ part usages by other teams".
// - The SolversLib README ("An updated and maintained fork of FTCLib", hosted on the Dairy Foundation) and the
//   SolversLib docs' installation page (the org.solverslib:core dependency).
// - GitHub (github.com/FTC-23511) and each Canva design's own title, both checked 2026-09-27.
// Every line must trace to one of these. Videos live in ./videos, and each season's code link in ./robots.
//
// New season: add its designs and portfolios at the top of `designSeasons` and `portfolioSeasons`. The hub
// works out its counts and how many seasons each row covers from these lists.

import { seasons } from './robots';
import { videos, type Video } from './videos';

export type Link = { label: string; href: string };

/** An image and its size. `small` is a narrower copy of the same file for small previews (the hub's strips). */
export type Picture = {
  src: string;
  width: number;
  height: number;
  alt: string;
  small?: { src: string; width: number };
};

// Google Site, Resources page.
export const openSource = {
  statement: 'We are an Open Alliance team, and our CAD, code, build threads, and portfolios are all open source.',
  openAlliance: { label: 'Open Alliance', href: 'https://ftcopenalliance.org/teams/23511' },
  github: { label: 'GitHub', href: 'https://github.com/FTC-23511' },
};

// SolversLib, the team's programming library. Its documentation is a separate site that we only link to.
export const solversLib = {
  // README and the sponsorship package ("Open Alliance", page 2).
  summary: 'An updated and maintained fork of FTCLib',
  purpose:
    'It is easy to use, and made to give newer teams the bug fixes and extra features that high-level teams develop themselves.',
  swerve: 'It is currently the only public library to support swerve for FTC.',
  visits: '14,500+',
  // `code`: a name you type, set in mono.
  facts: [
    { label: 'Dependency', value: 'org.solverslib:core', code: true },
    { label: 'Led by', value: 'FTC 23511, Seattle Solvers' },
    { label: 'Hosted on', value: 'Dairy Foundation', href: 'https://repo.dairy.foundation/#/releases/org/solverslib/core' },
    { label: 'Docs', value: 'docs.seattlesolvers.com', href: 'https://docs.seattlesolvers.com' },
  ],
  docs: { label: 'Read the docs', href: 'https://docs.seattlesolvers.com' },
  links: [
    { label: 'Source on GitHub', href: 'https://github.com/FTC-23511/SolversLib' },
    { label: 'Quickstart', href: 'https://github.com/FTC-23511/SolversLib-Quickstart' },
    { label: 'Visualizer', href: 'https://github.com/FTC-23511/SolversLib-Visualizer' },
  ],
};

// The closing ask on the Resources hub (Google Site, Sponsors page intro).
export const fundraising =
  'Our team is fully student-led and we fundraise 100% of our money. Our sponsors are what allow us to compete and grow.';

// Each season's robot code, public on GitHub. The links are the robot pages' own (./robots), kept in one place.
export const robotCode = seasons.map((s) => ({
  repo: s.links.code.href.replace('https://github.com/', ''),
  season: s.game,
  years: s.years,
  href: s.links.code.href,
}));

// ---------------------------------------------------------------------------------------------------------
// Designs: the Google Site Designs page, in its order. Descriptions are the site's own, with typos fixed.
// `image` is a transparent render shown on the light drawing plate.
// Year ranges in the descriptions use a non-breaking hyphen (U+2011) so "2024-25" never splits across lines.

export type Design = {
  name: string;
  description: string[];
  href: string;
  image: Picture;
  robot?: { name: string; href: string };
  /** The season's full robot, drawn largest in its group. */
  lead?: boolean;
  /** One of the renders in the /resources hub's Designs strip (give it a `small` image). */
  preview?: boolean;
};

export type DesignSeason = { id: string; game: string; years: string; designs: Design[] };

export const partUsages = '35,000+';

export const designSeasons: DesignSeason[] = [
  {
    id: 'decode',
    game: 'DECODE',
    years: '2025-26',
    designs: [
      {
        name: 'Cypher',
        lead: true,
        preview: true,
        description: [
          'Our robot for the DECODE 2025‑26 season.',
          'A 14 × 14.5 inch robot featuring coaxial swerve that can reliably rapid fire from anywhere on the field. It has a turret with 300 degrees of rotation, an adjustable hood, and a tilt park mechanism.',
        ],
        href: 'https://cad.onshape.com/documents/c021b03986672773c2100272/w/e693f3949bf6e50777651f00/e/b8bffd930c2a2d8248794936',
        image: {
          src: '/images/resources/design-cypher.webp',
          width: 1379,
          height: 1400,
          alt: 'CAD render of Cypher: a swerve robot with a latticed aluminum frame, a turret-mounted launcher, the 23511 number plate, and two game balls',
          small: { src: '/images/resources/design-cypher-480.webp', width: 480 },
        },
        robot: { name: 'Cypher', href: '/robots/decode-2025-26/' },
      },
      {
        name: 'Solvers Shooter',
        preview: true,
        description: [
          'Our open-sourced shooter for the DECODE 2025‑26 season.',
          'This customizable launcher is powered by 2 motors for the main flywheel, belted to counterrollers to eliminate backspin. An adjustable hood allows for angled shots and rapid firing.',
        ],
        href: 'https://cad.onshape.com/documents/c021b03986672773c2100272/w/e693f3949bf6e50777651f00/e/72a3538754485ef6bd6ac801',
        image: {
          src: '/images/resources/design-solvers-shooter.webp',
          width: 753,
          height: 666,
          alt: 'CAD render of the Solvers Shooter: a flywheel launcher inside a latticed frame, with a "Customizable!" tag',
          small: { src: '/images/resources/design-solvers-shooter-480.webp', width: 480 },
        },
      },
      {
        name: 'Electronic Cases',
        description: [
          'Our modular 3D-printed electronic cases help prevent wiring disconnections and protect your hubs against ESD (electrostatic discharge).',
          'Available for a variety of devices, including Servo Hubs, Control and Expansion Hubs, Pinpoint, and cameras.',
        ],
        // The B1 workspace, like Cypher's and the Shooter's links: the Google Site's link opens a workspace without this tab.
        href: 'https://cad.onshape.com/documents/c021b03986672773c2100272/w/e693f3949bf6e50777651f00/e/3aa36cb0c41651ad87fb9864',
        image: {
          src: '/images/resources/design-electronics-cases.webp',
          width: 926,
          height: 377,
          alt: 'CAD render of two yellow 3D-printed cases, one around a camera and one around a control hub',
        },
      },
    ],
  },
  {
    id: 'into-the-deep',
    game: 'INTO THE DEEP',
    years: '2024-25',
    designs: [
      {
        name: 'Riptide',
        lead: true,
        preview: true,
        description: [
          'Our robot for the INTO THE DEEP 2024‑25 season.',
          'A 12.25 × 11.5 inch robot able to complete sample or specimen cycles, with an active intake and level 3 ascent capability.',
        ],
        href: 'https://cad.onshape.com/documents/ae5ff79658ff2a51ece82558/w/1babafd80652d7e5216f214c/e/548f3b6bbedc29b9264b1a15',
        image: {
          src: '/images/resources/design-riptide.webp',
          width: 1027,
          height: 1027,
          alt: 'CAD render of Riptide: a black aluminum robot with a claw on an arm, a slide system, and the 23511 number plate',
          small: { src: '/images/resources/design-riptide-480.webp', width: 480 },
        },
        robot: { name: 'Riptide', href: '/robots/into-the-deep-2024-25/' },
      },
      {
        name: 'Solvers Claw',
        description: [
          'Our open-sourced claws for the INTO THE DEEP 2024‑25 season.',
          'The intake claw can grab a sample from either the inside or the outside, and has a wrist and a color sensor for automated rejection of the wrong color.',
        ],
        href: 'https://cad.onshape.com/documents/1c128ca169fe30eeb09acb36/w/48d3d3a7c87b50dc03cf4462/e/936cb1734f091fbe3f39750a?configuration=List_JL4N66W3G85Pwc%3DOffset_Sonic_Hub&renderMode=0&uiState=67ea1b9dee01c868998a4190',
        image: {
          src: '/images/resources/design-solvers-claw.webp',
          width: 532,
          height: 800,
          alt: 'CAD render of the Solvers Claw: an orange 3D-printed claw and wrist with a servo on top, holding a yellow sample',
        },
      },
      {
        name: 'Octonaut',
        description: [
          'Our offseason robot heading into 2025‑26, made for INTO THE DEEP gameplay.',
          'A 13.5 × 12 inch robot on an Octocanum (butterfly) drivetrain, with carbon fiber plates to save weight. A PTO for level 3 ascent shares the same servos as the Octocanum pods.',
        ],
        // The document's "Full" assembly, like Cypher's and Riptide's links (the Google Site links a part studio).
        href: 'https://cad.onshape.com/documents/0de3d3af3bd67458ea1fe009/w/54323539c351deda1ef6c002/e/1ad69e77cfc705ebdfa04360',
        // The robot page's file, trimmed flush to the render: the plate's padding gives it its margin.
        image: {
          src: '/images/robots/octonaut.webp',
          width: 847,
          height: 1100,
          alt: 'CAD render of Octonaut: a black carbon fiber robot with a tall arm on an Octocanum drivetrain',
        },
      },
    ],
  },
];

// ---------------------------------------------------------------------------------------------------------
// Portfolios: the Google Site Documents page, plus the Worlds portfolio and judging banners the team links from the
// current seattlesolvers.com. Award names match ./awards. `cover` is the document's own first page.

export type PortfolioAward = { title: string; event: string };

export type PortfolioDoc = {
  title: string;
  /** The document's title exactly as Canva lists it. */
  source: string;
  kind: 'Engineering portfolio' | 'Judging banners';
  note?: string;
  href: string;
  awards: PortfolioAward[];
  cover?: Picture;
};

export type PortfolioSeason = {
  id: string;
  game: string;
  years: string;
  docs: PortfolioDoc[];
  /** A season whose editions share one cover shows it once, beside the list. */
  sharedCover?: Picture;
};

// Google Site, Documents page.
export const portfoliosLede =
  'We open-source the engineering portfolio from every competition we attend. Each 15-page document is a close look at our robot, our outreach, and the season as a whole.';

export const portfolioSeasons: PortfolioSeason[] = [
  {
    id: 'decode',
    game: 'DECODE',
    years: '2025-26',
    docs: [
      {
        title: 'World Championship portfolio',
        source: 'FTC 23511 | Worlds DECODE Portfolio | Public',
        kind: 'Engineering portfolio',
        note: 'The portfolio we took to Houston.',
        href: 'https://canva.link/23511worlds2026port',
        awards: [{ title: 'Inspire Award, 2nd Place', event: 'FIRST World Championship, Lovelace Division' }],
        cover: {
          src: '/images/resources/portfolio-worlds-2026.webp',
          width: 800,
          height: 1036,
          alt: 'Cover of the Worlds DECODE portfolio: Enigma raised on its lift rails among cherry blossoms, framed by team photos, over the sponsor logos',
          small: { src: '/images/resources/portfolio-worlds-2026-360.webp', width: 360 },
        },
      },
      {
        title: 'Washington competitions portfolio',
        source: 'FTC 23511 | Engineering Portfolio | Public',
        kind: 'Engineering portfolio',
        href: 'https://www.canva.com/design/DAHAkUqqtCA/EbwzWXhiqSZSVpFG4em5sw/view',
        awards: [
          { title: 'Inspire Award, 2nd Place', event: 'Washington State Tesla League Tournament' },
          { title: 'Sustain Award Winner', event: 'Washington State Capek Super Qualifier' },
          { title: 'Think Award, 2nd Place', event: 'Washington State Championship' },
        ],
        cover: {
          src: '/images/resources/portfolio-washington-2025-26.webp',
          width: 800,
          height: 1035,
          alt: 'Cover of the 2025-26 engineering portfolio: a render of Cypher with two game balls over the sponsor logos',
          small: { src: '/images/resources/portfolio-washington-2025-26-360.webp', width: 360 },
        },
      },
      {
        title: 'World Championship judging banners',
        source: 'Worlds Banners Public 2025-26 | FTC 23511',
        kind: 'Judging banners',
        note: 'The banners we presented at judging in Houston.',
        href: 'https://canva.link/23511-worlds-banners-decode',
        awards: [],
        cover: {
          src: '/images/resources/portfolio-worlds-banners.webp',
          width: 760,
          height: 1140,
          alt: 'The Robot Design judging banner comparing Cypher and Enigma subsystem by subsystem, with KPI charts and wiring notes',
        },
      },
    ],
  },
  {
    id: 'into-the-deep',
    game: 'INTO THE DEEP',
    years: '2024-25',
    sharedCover: {
      src: '/images/resources/portfolio-into-the-deep.webp',
      width: 800,
      height: 1036,
      alt: 'Cover of the INTO THE DEEP engineering portfolio: "Riptide" in gold script over a line drawing of the robot',
      small: { src: '/images/resources/portfolio-into-the-deep-360.webp', width: 360 },
    },
    docs: [
      {
        title: 'Pasteur Interleague edition',
        source: 'Interleagues - FTC 23511 | INTO THE DEEP | Engineering Portfolio',
        kind: 'Engineering portfolio',
        href: 'https://www.canva.com/design/DAGY8EZALfE/znY18nG2HqCDUeB0mAGrEA/view',
        awards: [{ title: 'Innovate Award Winner', event: 'Washington State Pasteur Interleague' }],
      },
      {
        title: 'Capek Semifinals edition',
        source: 'Semis - FTC 23511 | INTO THE DEEP | Engineering Portfolio',
        kind: 'Engineering portfolio',
        href: 'https://www.canva.com/design/DAGcAUdop48/NkEVdb4sa3dMUJkOmJ2XIA/view',
        awards: [{ title: 'Think Award Winner', event: 'Washington State Capek Semifinals' }],
      },
      {
        title: 'Washington State Championship edition',
        source: 'States - FTC 23511 | INTO THE DEEP | Engineering Portfolio',
        kind: 'Engineering portfolio',
        href: 'https://www.canva.com/design/DAGd_C6BLaM/KG5ukG30SibLLGbNXHeKkg/view',
        awards: [{ title: 'Design Award, 2nd Place', event: 'Washington State Championship' }],
      },
    ],
  },
];

// ---------------------------------------------------------------------------------------------------------
// Videos & Workshops: every video in ./videos, grouped by what it is. A group's `sub` says only what its cards
// can't: who made the videos, or which robot is in them.

export type VideoGroup = { id: string; title: string; sub?: string; videos: Video[]; layout: 'lead' | 'pair' | 'shorts' };

export const videoGroups: VideoGroup[] = [
  {
    id: 'features',
    title: 'Robot features',
    sub: 'Cypher, our DECODE robot, as covered by RoboFTC and the FUN Robotics Network.',
    videos: videos.filter((v) => v.kind === 'Reveal' || v.kind === 'Feature'),
    layout: 'lead',
  },
  {
    id: 'workshops',
    title: 'Workshops',
    videos: videos.filter((v) => v.kind === 'Workshop'),
    layout: 'pair',
  },
  {
    id: 'autonomous',
    title: 'Autonomous',
    sub: 'Riptide v2, our INTO THE DEEP robot.',
    videos: videos.filter((v) => v.kind === 'Autonomous'),
    layout: 'shorts',
  },
];

// Counts for the hub's index, always derived from the data above.
export const counts = {
  designs: designSeasons.reduce((n, s) => n + s.designs.length, 0),
  portfolios: portfolioSeasons.reduce((n, s) => n + s.docs.filter((d) => d.kind === 'Engineering portfolio').length, 0),
  videos: videos.length,
};
