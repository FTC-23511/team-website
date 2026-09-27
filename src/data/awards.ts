// Awards page content, arranged by season. Sources:
// - The Awards page of the team's Google Site, sites.google.com/view/seattlesolvers/about-us/awards (scraped 2026-09-26).
// - FTCScout data for team 23511: the World Championship award, the Lovelace Division rank and every event's dates.
// - FTC Events (ftc-events.firstinspires.org) for official names: 2025-26 renamed the league tournaments ("Interleague"
//   became "League Tournament", "Semifinals" became "Super Qualifier") and the Dean's List Award (now the FIRST
//   Leadership Award), which the team's own Worlds portfolio and Google Site Documents page also use.
// - "Sponsorship Package - FTC 23511, 2026.pdf".
// Every line must trace to one of these. Never add an award from memory.
//
// The home page counts "18 awards" (17 in the sponsorship package plus the World Championship award).
// This page also lists alliance results and a FIRST Leadership Award honor, so it deliberately shows no running total.
//
// New season: add it at the top of `ftcSeasons` and list its events in the order they happened, with
// judged awards before alliance results inside an event. The page lays seasons out by position: the newest
// gets the night-panel timeline, the one before it the photo ledger, and older seasons compact strips.

export type Award = {
  title: string;
  /** Individual honors only: the student's first name, as the team's own site gives it. */
  recipient?: string;
};

export type AwardEvent = {
  name: string;
  awards: Award[];
  /** The season's peak, drawn as a filled node on the timeline. */
  peak?: boolean;
};

export type Photo = { src: string; alt: string; width: number; height: number };

export type FtcSeason = {
  /** Anchor id on the page. */
  id: string;
  game: string;
  years: string;
  robot?: { name: string; href: string };
  events: AwardEvent[];
  photos: Photo[];
};

/** The page's lead: the 2025-26 World Championship result (FTCScout, team 23511). The home page's third readout is
 * built from it too (home.ts), taking the year from the end of `date`. */
export const headline = {
  award: 'Inspire Award',
  place: 2,
  event: 'FIRST World Championship',
  division: 'Lovelace Division',
  city: 'Houston',
  // FTCScout and FTC Events: the division played April 29 to May 2, and its playoffs were decided on May 2.
  date: 'April 29 to May 2, 2026',
  divisionRank: 4,
};

export const ftcSeasons: FtcSeason[] = [
  {
    id: 'decode',
    game: 'DECODE',
    years: '2025-26',
    robot: { name: 'Cypher', href: '/robots/decode-2025-26/' },
    events: [
      {
        name: 'Washington State Tesla League Tournament',
        awards: [{ title: 'Inspire Award, 2nd Place' }, { title: 'Finalist Alliance Captain' }],
      },
      {
        name: 'Washington State Capek Super Qualifier',
        awards: [{ title: 'Sustain Award Winner' }, { title: 'Winning Alliance Partner' }],
      },
      {
        name: 'Washington State Championship',
        awards: [
          { title: 'Think Award, 2nd Place' },
          { title: '1st Alliance Captain' },
          { title: 'FIRST Leadership Award Finalist', recipient: 'Saket' },
        ],
      },
      {
        name: 'FIRST World Championship, Lovelace Division',
        awards: [{ title: 'Inspire Award, 2nd Place' }],
        peak: true,
      },
    ],
    // The season's plaques with Cypher, then the team's own photo of the team with Cypher (2026-09-27).
    photos: [
      {
        src: '/images/home/decode-awards.webp',
        alt: 'Cypher, our first DECODE robot, on the field behind four award plaques from the Tesla League Tournament and the Capek Super Qualifier',
        width: 1280,
        height: 1066,
      },
      {
        src: '/images/awards/decode-team.webp',
        alt: 'The Seattle Solvers in their black and yellow jackets with Cypher in front of them, in a gym at a competition',
        width: 1400,
        height: 1050,
      },
    ],
  },
  {
    id: 'into-the-deep',
    game: 'INTO THE DEEP',
    years: '2024-25',
    robot: { name: 'Riptide', href: '/robots/into-the-deep-2024-25/' },
    events: [
      {
        name: 'Washington State Pasteur Interleague',
        awards: [{ title: 'Innovate Award Winner' }, { title: 'Finalist Alliance Partner' }],
      },
      { name: 'Washington State Capek Semifinals', awards: [{ title: 'Think Award Winner' }] },
      {
        name: 'Washington State Championship',
        awards: [{ title: 'Design Award, 2nd Place' }, { title: '4th Alliance Partner' }],
      },
      { name: 'West Coast Invitational', awards: [{ title: 'Finalist Alliance Partner' }] },
    ],
    photos: [
      {
        src: '/images/awards/riptide-trophies.webp',
        alt: 'Riptide, the INTO THE DEEP robot, between its Pasteur Interleague Finalist Alliance and Innovate Award trophies',
        width: 1200,
        height: 1200,
      },
      {
        src: '/images/awards/think-trophy.webp',
        alt: 'The 2024-25 Capek Semifinal Think Award trophy, held in a hand',
        width: 640,
        height: 1280,
      },
    ],
  },
  {
    id: 'centerstage',
    game: 'Centerstage',
    years: '2023-24',
    events: [
      {
        name: 'Washington State Hawking Interleague',
        awards: [{ title: 'Motivate Award, 3rd Place' }, { title: 'Finalist Alliance Captain' }],
      },
    ],
    photos: [
      {
        src: '/images/awards/centerstage-robot.webp',
        alt: "The team's Centerstage robot, with its 23511 number plate, beside a trophy",
        width: 461,
        height: 352,
      },
    ],
  },
];

/** FIRST LEGO League, before FTC, as Team #52689. Oldest first. */
export const fll = {
  team: '52689',
  awards: [
    { title: 'Best Robot Game', game: 'Cargo Connect', years: '2021-22', event: 'Washington State Bellevue Qualifier' },
    { title: 'Champions Award Finalist', game: 'Superpowered', years: '2022-23', event: 'Washington State Bellevue Qualifier' },
    { title: 'Best Robot Design', game: 'Superpowered', years: '2022-23', event: 'Washington State Semifinals' },
    { title: 'Innovation Project Finalist', game: 'Superpowered', years: '2022-23', event: 'Washington State Championship' },
  ],
  photo: {
    src: '/images/awards/fll-trophies.webp',
    alt: 'Four FIRST LEGO League trophies and plaques on a shelf, from the 2021-22 and 2022-23 seasons',
    width: 1200,
    height: 619,
  },
};

/** "2nd", "4th": split so the suffix can be set small beside an instrument numeral. */
export function ordinal(n: number): { value: string; suffix: string } {
  const tens = n % 100;
  const ones = n % 10;
  const suffix = tens >= 11 && tens <= 13 ? 'th' : ones === 1 ? 'st' : ones === 2 ? 'nd' : ones === 3 ? 'rd' : 'th';
  return { value: String(n), suffix };
}
