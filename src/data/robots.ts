// Robot season pages (/robots/<slug>), one entry per FTC season, newest first. Sources:
// - The Robots pages and the Designs page of the team's Google Site (sites.google.com/view/seattlesolvers), fetched
//   2026-09-27. Robot paragraphs keep the site's wording, with typos, units and dashes fixed.
// - FTCScout (api.ftcscout.org, team 23511) for every event's date, city and type.
// - src/data/awards.ts for every result, looked up by event name so the two pages can never disagree.
// - The team's code repositories (github.com/FTC-23511), which build on SolversLib.
// Every line must trace to one of these. Never add a spec, date or result from memory.
//
// New season: add it at the top of `seasons`, add its events to awards.ts first, add the route to the Robots menu
// in site.ts, point the /robots redirect in astro.config.mjs at it, and put its images in public/images/robots with
// a provenance sidecar.
import { ftcSeasons, headline, ordinal, type Award } from './awards';

export type Img = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** A transparent cutout: it stands on the ground instead of filling a frame. */
  cutout?: boolean;
  /** object-position for framed photos. */
  focus?: string;
  /** A narrower copy of the same photo, for a photo drawn small (a gallery thumbnail on phones). */
  small?: { src: string; width: number };
};

/** Running text: plain strings and inline links. A link to a sponsor is marked `sponsored` (rel="sponsored"). */
export type Seg = string | { text: string; href: string; sponsored?: boolean };
export type Para = Seg[];

export type Spec = { label: string; value: string; note?: string };
export type Revision = { part: string; before: string; after: string };
export type Link = { label: string; href: string };

type Results = { awards: Award[]; peak?: boolean };

export type Stop =
  | {
      kind: 'robot';
      when: string;
      title: string;
      /** Where this version first competed, when the sources say. */
      debut?: string;
      paras: Para[];
      image?: Img;
      revisions?: Revision[];
      /** Column names for the revision table when it compares two robots rather than two versions of one. */
      compare?: { from: string; to: string };
    }
  | {
      kind: 'event';
      when: string;
      name: string;
      place: string;
      /** FTCScout event type, shown for scrimmages and offseason events. */
      type?: string;
      awards: Award[];
      peak?: boolean;
      /** A standing beyond the awards list (the Worlds division rank). */
      standing?: string;
      photos?: Img[];
      links?: Link[];
    }
  | {
      kind: 'play';
      when: string;
      title: string;
      events: { date: string; name: string; place: string; type?: string }[];
      photos?: Img[];
    };

export type Season = {
  /** Matches the season id in awards.ts, so /about/awards#<id> is its record. */
  id: string;
  slug: string;
  game: string;
  years: string;
  lede: string;
  /** The page's meta and share description, about 150 characters. */
  description: string;
  robot: { name: string; summary: string; image: Img; specs: Spec[] };
  links: { cad: Link; code: Link; portfolio: Link };
  /** An optional line under "The season", only for a fact the log itself does not show. */
  logLede?: string;
  log: Stop[];
  watchTitle: string;
  offseason?: {
    name: string;
    when: string;
    paras: Para[];
    image: Img;
    specs: Spec[];
    cad: Link;
  };
};

// Results come from awards.ts. A renamed event there breaks the build here instead of silently dropping awards.
function results(seasonId: string, event: string): Results {
  const season = ftcSeasons.find((s) => s.id === seasonId);
  const found = season?.events.find((e) => e.name === event);
  if (!found) throw new Error(`robots.ts: no event "${event}" in the ${seasonId} season of awards.ts`);
  return { awards: found.awards, peak: found.peak };
}

// Fabworks and Polymaker sponsor the team, so links to them are sponsored links, as on the Sponsors page.
const fabworks = { text: 'Fabworks', href: 'https://www.fabworks.com/', sponsored: true };
const code = (repo: string): Link => ({ label: 'Code on GitHub', href: `https://github.com/FTC-23511/${repo}` });

const decodeCad = 'https://cad.onshape.com/documents/c021b03986672773c2100272/w/74f0a8f10b4c93fb8fe556c1/e/b8bffd930c2a2d8248794936';
const riptideCad = 'https://cad.onshape.com/documents/ae5ff79658ff2a51ece82558/w/1babafd80652d7e5216f214c/e/548f3b6bbedc29b9264b1a15';
const riptideV1Cad = 'https://cad.onshape.com/documents/ae5ff79658ff2a51ece82558/v/eb31d6681e7584ab4326fb14/e/548f3b6bbedc29b9264b1a15';
const riptideV2Cad = 'https://cad.onshape.com/documents/ae5ff79658ff2a51ece82558/v/63650f682aa53d3cffd4ad5d/e/548f3b6bbedc29b9264b1a15';
const interleaguePortfolio =
  'https://www.canva.com/design/DAGY8EZALfE/znY18nG2HqCDUeB0mAGrEA/view?utm_content=DAGY8EZALfE&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=hd49d90ddbf';
const statesPortfolio =
  'https://www.canva.com/design/DAGd_C6BLaM/KG5ukG30SibLLGbNXHeKkg/view?utm_content=DAGd_C6BLaM&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h1e20e3fef7';

export const seasons: Season[] = [
  {
    id: 'decode',
    slug: 'decode-2025-26',
    game: 'DECODE',
    years: '2025-26',
    // Cypher ranked 1st at the State Championship and qualified us for Worlds (FTCScout; the Worlds portfolio, page 9:
    // "rank 1st at the state championship and qualify for worlds"), and it is the robot that played in Houston (the
    // team, 2026-09-27). Enigma was built for Worlds alongside it (Worlds portfolio, pages 9 to 14, and the judging
    // banners).
    lede: 'Cypher, our first robot on coaxial swerve, took us to the World Championship in Houston, where we won the Inspire Award, 2nd Place. For Worlds we also built a second robot, Enigma.',
    description:
      'Cypher, the DECODE 2025-26 swerve robot of Seattle Solvers, FTC Team #23511, that played the World Championship, and Enigma, a second robot built for it.',
    robot: {
      name: 'Cypher',
      // Designs page, "Cypher".
      summary:
        'Cypher can reliably rapid fire from anywhere on the field, with a turret, an adjustable hood, and a tilt park mechanism.',
      image: {
        src: '/images/robots/cypher-v2.webp',
        alt: 'CAD render of Cypher v2: a turreted launcher above a swerve chassis with Voronoi-cut aluminum side plates and a blue 23511 number plate, a green and a purple game ball beside it',
        width: 1064,
        height: 1100,
        cutout: true,
      },
      specs: [
        { label: 'Drivetrain', value: 'Coaxial swerve', note: 'Our first season on swerve' },
        { label: 'Footprint', value: '14 × 14.5\u00a0in' },
        { label: 'Weight', value: 'About 25\u00a0lb' },
        // The Google Site says "fully aluminum chassis"; the Washington competitions portfolio (pages 10 and 11) settles
        // it: a carbon fiber bellypan with pocketed aluminum side plates.
        { label: 'Chassis', value: 'Aluminum and carbon fiber', note: 'Carbon fiber bellypan, aluminum plates by Fabworks' },
        { label: 'Turret', value: 'Up to 300°' },
        { label: 'Launcher', value: 'Adjustable hood' },
        // The team (2026-09-27): Pinpoint odometry on v1, an OctoQuad in the upgrade Cypher took to Worlds.
        { label: 'Localization', value: 'Pinpoint, then OctoQuad', note: 'OctoQuad came with the Worlds upgrade' },
        { label: 'Code', value: 'Java', note: 'Built on SolversLib' },
      ],
    },
    links: {
      cad: { label: 'Onshape CAD', href: decodeCad },
      code: code('Decode-2026'),
      portfolio: { label: 'Worlds portfolio', href: 'https://canva.link/23511worlds2026port' },
    },
    log: [
      {
        kind: 'robot',
        when: 'Fall 2025',
        title: 'Cypher v1',
        paras: [
          [
            'Cypher was our first robot of the season. It had a pivoting intake with compliant and vectored wheels, a turret with 270° of rotation, and an adjustable launcher. A ramp carried the balls from the intake to the launcher, Pinpoint odometry tracked its position, and a Limelight camera handled relocalization.',
          ],
          [
            'Like last year, we built a custom chassis, now with swerve: pocketed aluminum side plates on a carbon fiber bellypan. Thanks to ',
            fabworks,
            ' it stayed light (about 25\u00a0lb) and compact (14 × 14.5\u00a0in). Use the code FTC23511 at checkout for 5% off at Fabworks.',
          ],
          ['Every subsystem is in ', { text: 'our public CAD', href: decodeCad }, '.'],
        ],
        image: {
          src: '/images/robots/cypher-v1.webp',
          alt: 'Cypher v1 on a DECODE field: a yellow turret and launcher above the swerve chassis, a blue 23511 plate on the front and the pivoting intake with gray rollers at right',
          width: 1200,
          height: 1166,
          focus: '50% 55%',
        },
      },
      {
        kind: 'play',
        when: 'Oct to Nov 2025',
        title: 'League play',
        events: [
          { date: 'Oct 18', name: 'Rookie Rumble', place: 'Bothell', type: 'Scrimmage' },
          { date: 'Nov 2', name: 'Brattain League Meet 1', place: 'Redmond' },
          { date: 'Nov 23', name: 'Brattain League Meet 2', place: 'Redmond' },
        ],
        // The team's own photos: the first is dated November 23, 2025 (League Meet 2); the second is the same gym.
        photos: [
          {
            src: '/images/robots/league-meet-team.webp',
            alt: 'The Seattle Solvers in their black and yellow jackets around Cypher, in a gym with green padding on the wall',
            width: 1000,
            height: 751,
          },
          {
            src: '/images/robots/league-team-coaches.webp',
            alt: 'The team and two coaches gathered around Cypher, one student holding the robot up in front of them',
            width: 1000,
            height: 786,
          },
        ],
      },
      {
        kind: 'event',
        when: 'Dec 14, 2025',
        name: 'Washington State Tesla League Tournament',
        place: 'Issaquah',
        ...results('decode', 'Washington State Tesla League Tournament'),
      },
      {
        kind: 'event',
        when: 'Jan 18, 2026',
        name: 'Washington State Capek Super Qualifier',
        place: 'Maple Valley',
        ...results('decode', 'Washington State Capek Super Qualifier'),
        photos: [
          {
            src: '/images/home/decode-awards.webp',
            alt: 'Cypher on the field behind four award plaques from the Tesla League Tournament and the Capek Super Qualifier',
            width: 1280,
            height: 1066,
          },
        ],
      },
      {
        kind: 'robot',
        // Every v2 change (fixed intake, counterrollers, two Axon MINI+ servos, 300° turret) is already in the
        // Washington competitions portfolio written for the State Championship, so v2 raced by the end of January.
        when: 'Jan 2026',
        title: 'Cypher v2',
        paras: [
          ['Our second iteration upgraded its subsystems, with a redone launcher, turret, and intake.'],
        ],
        // The table carries the changes and the team's reasons for them (Google Site, "Cypher v2").
        revisions: [
          { part: 'Intake', before: 'Pivoting, with compliant and vectored wheels', after: 'Fixed, for reliability' },
          { part: 'Launcher', before: 'Adjustable launcher', after: 'Redone, with counterrollers to cut backspin' },
          { part: 'Turret', before: '270° of rotation', after: 'Two Axon MINI+ servos for speed, up to 300°' },
        ],
      },
      {
        kind: 'event',
        when: 'Jan 31, 2026',
        name: 'Washington State Championship',
        place: 'Seattle',
        ...results('decode', 'Washington State Championship'),
      },
      {
        kind: 'robot',
        // Worlds portfolio (pages 9 to 14) and the Worlds judging banners. The February and March 2026 newsletter,
        // "v2 Robot Upgrades", has Enigma on its cover.
        when: 'Feb to Apr 2026',
        title: 'Enigma',
        paras: [
          [
            'For the World Championship, we built a second robot, Enigma. Worlds plays ten qualification matches instead of the six at States, so the ranking points for sorting and parking would count for more, and Enigma was designed to complete every part of the game.',
          ],
          [
            'It traded swerve for a simpler mecanum drivetrain on a single HTD3 belt, and added a spindexer that sorts balls only when it needs to, so rapid fire keeps its speed the rest of the time. A power take-off lets a drive motor lift the whole robot on linear rails to park, and the launcher gained four counterrollers and 96\u00a0mm steel ring flywheels for accuracy from the far zone.',
          ],
          [
            'In the end, Cypher was the robot we played in Houston, upgraded for Worlds with an OctoQuad for localization. Both robots are in ',
            { text: 'our Worlds portfolio', href: 'https://canva.link/23511worlds2026port' },
            '.',
          ],
        ],
        // The Worlds portfolio's cover photo: only Enigma has the rail lift, so this is Enigma whatever its sign color.
        image: {
          src: '/images/robots/enigma.webp',
          alt: 'Enigma raised on its linear-rail lift outdoors under a flowering cherry tree: a silver truss frame and yellow gears up top, a green intake roller and a purple ball at its base',
          width: 1000,
          height: 1133,
        },
        compare: { from: 'Cypher', to: 'Enigma' },
        revisions: [
          { part: 'Drivetrain', before: 'Coaxial swerve', after: 'Mecanum on a single HTD3 belt' },
          { part: 'Sorting', before: 'None, so driving time came first', after: 'A spindexer that can be bypassed' },
          { part: 'Intake', before: 'Fixed', after: 'Pivoting and three balls wide' },
          { part: 'Parking', before: 'Tilt park', after: 'Power take-off lift on linear rails' },
          // A soft hyphen (U+00AD) lets the long word break on the narrowest phones instead of widening the table.
          {
            part: 'Launcher',
            before: 'Counterrollers and 76\u00a0mm flywheels',
            after: 'Four counter\u00adrollers and 96\u00a0mm steel flywheels',
          },
        ],
      },
      {
        kind: 'event',
        when: 'Apr 29 to May 2, 2026',
        name: 'FIRST World Championship, Lovelace Division',
        place: 'Houston',
        ...results('decode', 'FIRST World Championship, Lovelace Division'),
        standing: `Ranked ${ordinal(headline.divisionRank).value}${ordinal(headline.divisionRank).suffix} in the ${headline.division}`,
        // Cypher played Worlds (the team, 2026-09-27). Its sign is red here because a robot carries its alliance's color
        // match by match.
        photos: [
          {
            src: '/images/robots/worlds-cypher-field2.webp',
            alt: 'Cypher up close on Lovelace Field 2 in Houston, a blue 23511 alliance sign on its Voronoi-cut side plate and a purple ball in its turret',
            width: 1600,
            height: 1067,
            focus: '40% 55%',
          },
          {
            src: '/images/robots/worlds-field.webp',
            alt: 'Cypher, with a red 23511 alliance sign and its green roller intake, on Lovelace Field 2 at the FIRST World Championship, green and purple balls on the tiles, and an announcer and a volunteer behind the wall',
            width: 1568,
            height: 1045,
            focus: '45% 55%',
          },
          {
            src: '/images/robots/worlds-drive-team.webp',
            alt: 'The Seattle Solvers drive team in yellow and black at the field edge in Houston, Cypher on the tiles in front of them',
            width: 1400,
            height: 933,
            focus: '55% 60%',
            small: { src: '/images/robots/worlds-drive-team-600.webp', width: 600 },
          },
          {
            src: '/images/robots/worlds-pit.webp',
            alt: 'Team members in yellow jerseys working on Cypher on the floor of their Houston pit, a second robot on the table behind them, beside a Design Philosophy slide and an Iterations board',
            width: 1400,
            height: 933,
            small: { src: '/images/robots/worlds-pit-600.webp', width: 600 },
          },
          {
            src: '/images/robots/worlds-stands.webp',
            alt: 'Seattle Solvers members in the stands at the World Championship, one holding a 23511 team sign',
            width: 931,
            height: 701,
            focus: '50% 70%',
          },
        ],
        links: [{ label: 'Worlds portfolio', href: 'https://canva.link/23511worlds2026port' }],
      },
      {
        kind: 'event',
        when: 'Jul 11, 2026',
        name: 'West Coast Invitational',
        place: 'Bonney Lake',
        type: 'Offseason',
        awards: [],
      },
    ],
    watchTitle: 'DECODE on video',
  },
  {
    id: 'into-the-deep',
    slug: 'into-the-deep-2024-25',
    game: 'INTO THE DEEP',
    years: '2024-25',
    lede: 'Riptide was our first robot on a fully aluminum chassis. Across two versions it won the Innovate and Think Awards, then the Design Award, 2nd Place, at the Washington State Championship.',
    description:
      'Riptide, the INTO THE DEEP 2024-25 robot of Seattle Solvers, FTC Team #23511, on our first fully aluminum chassis. It won the Innovate and Think Awards.',
    robot: {
      name: 'Riptide',
      // Designs page, "Riptide", minus its level 3 ascent: the robot page says that was not working by States.
      summary: 'Riptide could complete sample or specimen cycles, with an active intake on fast linear slides.',
      image: {
        src: '/images/robots/riptide-v2.webp',
        alt: 'Riptide v2: black spray-painted Voronoi side plates, a blue 23511 plate, googly eyes on the front and sponsor stickers across the bumper',
        width: 915,
        height: 1100,
        cutout: true,
      },
      specs: [
        { label: 'Footprint', value: '12.25 × 11.5\u00a0in' },
        { label: 'Weight', value: 'About 23\u00a0lb' },
        { label: 'Chassis', value: 'Fully aluminum', note: 'Our first, made with Fabworks' },
        { label: 'Slides', value: 'BWTLink' },
        { label: 'Intake', value: 'Active intake', note: 'After a claw on a virtual four-bar' },
        { label: 'Autonomous', value: '5 specimen, 6 sample', note: 'With Pinpoint odometry' },
        { label: 'Ascent', value: 'Level 2', note: 'Two Axon MAX+ servos' },
        { label: 'Code', value: 'Java', note: 'Built on SolversLib' },
      ],
    },
    links: {
      cad: { label: 'Onshape CAD', href: riptideCad },
      code: code('Into-the-Deep-2025'),
      portfolio: { label: 'States portfolio', href: statesPortfolio },
    },
    log: [
      {
        kind: 'robot',
        when: 'Fall 2024',
        title: 'Riptide v1',
        paras: [
          [
            'Our first custom robot of the season was Riptide. Its intake was a claw on a virtual four-bar that could grab samples from the inside or the outside, and a simple deposit arm and claw scored them, both riding on ',
            { text: 'BWTLink slides', href: 'https://bwtlink.com/' },
            '. We later changed the intake to our first active intake of the season, keeping the rest of the robot the same.',
          ],
          [
            'Thanks to ',
            fabworks,
            ' and their machining, it stayed light (about 23\u00a0lb) and compact (12.25 × 11.5\u00a0in). Use the code FTC23511 at checkout for 5% off at Fabworks.',
          ],
          [
            'The details are in our ',
            { text: 'Interleague engineering portfolio', href: interleaguePortfolio },
            ' and in the ',
            { text: 'version history of our public CAD', href: riptideV1Cad },
            '.',
          ],
        ],
        image: {
          src: '/images/robots/riptide-v1.webp',
          alt: 'Render of Riptide v1: bare aluminum Voronoi side plates over gold 3D-printed panels, two black linear slides rising from the chassis and a blue 23511 plate',
          width: 703,
          height: 870,
          cutout: true,
        },
      },
      {
        kind: 'play',
        when: 'Oct to Nov 2024',
        title: 'League play',
        events: [
          { date: 'Oct 5', name: 'League Meet 0', place: 'Woodinville', type: 'Scrimmage' },
          { date: 'Nov 3', name: 'Brattain League Meet 1', place: 'Redmond' },
          { date: 'Nov 24', name: 'Brattain League Meet 2', place: 'Redmond' },
        ],
      },
      {
        kind: 'event',
        when: 'Dec 8, 2024',
        name: 'Washington State Pasteur Interleague',
        place: 'Mill Creek',
        ...results('into-the-deep', 'Washington State Pasteur Interleague'),
        photos: [
          {
            src: '/images/awards/riptide-trophies.webp',
            alt: 'Riptide between its Pasteur Interleague Finalist Alliance and Innovate Award trophies',
            width: 1200,
            height: 1200,
          },
        ],
      },
      {
        kind: 'robot',
        when: 'Jan 5, 2025',
        title: 'Riptide v2',
        debut: 'First played at the High Definition Invitational in Bellevue',
        paras: [
          [
            'Our second robot of the season kept the archetype of Riptide v1. The smaller intake and longer deposit transferred samples faster, and could intake and score specimens from both sides. It also got a new look: spray-painted aluminum plates and ',
            {
              text: 'PolyMax PLA',
              href: 'https://us.polymaker.com/products/polymax-pla?variant=39574348398649',
              sponsored: true,
            },
            ' for our 3D-printed parts.',
          ],
          [
            'Together with the move to ',
            {
              text: 'Pinpoint and swingarm odometry',
              href: 'https://www.gobilda.com/swingarm-odometry-pack-2-pods-1-pinpoint-computer/',
            },
            ', that let us push our autonomous programs to ',
            { text: '5 specimens', href: 'https://www.youtube.com/shorts/cxpzRtRNa-k' },
            ' and ',
            { text: '6 samples', href: 'https://www.youtube.com/shorts/Mk8ygZ1XQMw' },
            '.',
          ],
          [
            'Finally, a servo hang on two ',
            { text: 'Axon MAX+ servos', href: 'https://axon-robotics.com/products/max' },
            ' reached the level 2 ascent. We planned a level 3 ascent with a gearbox shifting mechanism, but it was not working by States.',
          ],
          [
            'The details are in our ',
            { text: 'States engineering portfolio', href: statesPortfolio },
            ' and in the ',
            { text: 'version history of our public CAD', href: riptideV2Cad },
            '.',
          ],
        ],
        revisions: [
          { part: 'Slides', before: 'BWTLink slides', after: 'Faster slides' },
          { part: 'Intake', before: 'A claw on a virtual four-bar, later an active intake', after: 'A new, smaller intake' },
          { part: 'Deposit', before: 'A simple arm and claw', after: 'A new, longer deposit' },
        ],
      },
      {
        kind: 'event',
        when: 'Jan 12, 2025',
        name: 'Washington State Capek Semifinals',
        place: 'Maple Valley',
        ...results('into-the-deep', 'Washington State Capek Semifinals'),
        photos: [
          {
            src: '/images/awards/think-trophy.webp',
            alt: 'The 2024-25 Capek Semifinal Think Award trophy, held in a hand',
            width: 640,
            height: 1280,
          },
        ],
      },
      {
        kind: 'event',
        when: 'Feb 1, 2025',
        name: 'Washington State Championship',
        place: 'Seattle',
        ...results('into-the-deep', 'Washington State Championship'),
      },
      {
        kind: 'event',
        when: 'Jun 1, 2025',
        name: 'West Coast Invitational',
        place: 'Renton',
        type: 'Offseason',
        ...results('into-the-deep', 'West Coast Invitational'),
      },
    ],
    watchTitle: 'Riptide on video',
    offseason: {
      name: 'Octonaut',
      when: 'Offseason 2025',
      paras: [
        [
          'Octonaut is our robot for the offseason before DECODE, built for INTO THE DEEP gameplay. It runs an Octocanum drivetrain, also called a butterfly drive: eight wheels that toggle between standard wheels and omnidirectional mecanum wheels, a design attempted by fewer than a hundred teams over the years.',
        ],
        [
          'Carbon fiber plates save weight, and a power take-off for the level 3 ascent shares its servos with the Octocanum pods.',
        ],
      ],
      image: {
        src: '/images/robots/octonaut.webp',
        alt: 'CAD render of Octonaut: a black carbon fiber box chassis with gold 3D-printed parts, and a tall tower with hooks carrying an arm with a yellow claw at its tip',
        width: 847,
        height: 1100,
        cutout: true,
      },
      specs: [
        { label: 'Drivetrain', value: 'Octocanum', note: 'Eight wheels, two modes' },
        { label: 'Footprint', value: '13.5 × 12\u00a0in' },
        { label: 'Plates', value: 'Carbon fiber' },
        { label: 'Ascent', value: 'Level 3 PTO', note: 'Shares the pod servos' },
      ],
      cad: {
        label: 'Onshape CAD',
        // The "Full" assembly, so the link opens the whole robot (the Google Site's link opens the Deposit Parts studio).
        href: 'https://cad.onshape.com/documents/0de3d3af3bd67458ea1fe009/w/54323539c351deda1ef6c002/e/1ad69e77cfc705ebdfa04360',
      },
    },
  },
];

/** The next newer and next older seasons, for the pager. */
export function neighbors(slug: string) {
  const i = seasons.findIndex((s) => s.slug === slug);
  return { newer: i > 0 ? seasons[i - 1] : undefined, older: i >= 0 ? seasons[i + 1] : undefined };
}
