// Newsletters page content. Source: the Newsletters page of the team's Google Site
// (sites.google.com/view/seattlesolvers/about-us/newsletters, scraped 2026-09-27): each issue's Canva link and its
// topic line, with typos fixed. Covers are page 1 of each design, captured from its public Canva view on
// 2026-09-27 (public/images/newsletters, each with a provenance sidecar).
//
// New issue: add it at the top of `issues` (newest first) with its Canva share link, then save page 1 of the design
// as public/images/newsletters/<yyyy-mm>.webp (880px wide) and a 360px-wide copy as <yyyy-mm>-360.webp
// (`coverSmall`, used once the issue moves to the back issues). The newest issue is featured automatically.

export type Issue = {
  /** The months it covers, as the team titles it. */
  period: string;
  /** Season it belongs to on the Google Site. */
  season: string;
  /** The topic line, split into its items (the site's "and more!" is left off). */
  topics: string[];
  href: string;
  /** Page 1 of the issue. Shown beside its own title and topics, so it is decorative (empty alt). */
  cover: string;
  /** A 360px-wide copy of the cover, for the smaller back-issue slots. */
  coverSmall?: string;
};

// The Google Site: "Our team produces a newsletter reflecting and summarizing our progress every two months." The
// archive shows monthly issues through summer 2025 and two-month issues from October, so the page states no cadence.
export const intro =
  'Our newsletter is where we write up what the team has been working on: the robot, SolversLib, our classes, outreach, and competitions.';

export const issues: Issue[] = [
  {
    period: 'February + March 2026',
    season: 'Winter 2025-26',
    topics: ['Worlds preparations', 'v2 robot upgrades', 'New sponsors'],
    href: 'https://canva.link/yaq5b2u3yhb14f3',
    cover: '/images/newsletters/2026-02.webp',
    coverSmall: '/images/newsletters/2026-02-360.webp',
  },
  {
    period: 'December 2025 + January 2026',
    season: 'Winter 2025-26',
    topics: ['Season and Worlds update', 'Advanced software', 'Fundraising'],
    href: 'https://www.canva.com/design/DAG9Ob7MbLg/DwEKcc4wMai9JV1r-5aJlQ/view?utm_content=DAG9Ob7MbLg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h56db84f87b',
    cover: '/images/newsletters/2025-12.webp',
    coverSmall: '/images/newsletters/2025-12-360.webp',
  },
  {
    period: 'October + November 2025',
    season: 'Fall 2025',
    topics: ['Launcher redesign', 'SolversLib Visualizer', 'FUN Robotics interview'],
    href: 'https://www.canva.com/design/DAGymSc4tKs/5LZpdY1irqhm7U9VOB145Q/view?utm_content=DAGymSc4tKs&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h3f6a284e14',
    cover: '/images/newsletters/2025-10.webp',
    coverSmall: '/images/newsletters/2025-10-360.webp',
  },
  {
    period: 'September 2025',
    season: 'Fall 2025',
    topics: ['Kickoff', 'Cypher', 'SolversLib updates', 'Salmon Days'],
    href: 'https://www.canva.com/design/DAG0f0thObA/bbGVBlMN_NzEGQY4VnQO7w/view?utm_content=DAG0f0thObA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h47c677a926',
    cover: '/images/newsletters/2025-09.webp',
    coverSmall: '/images/newsletters/2025-09-360.webp',
  },
  {
    period: 'August 2025',
    season: 'Summer 2025',
    topics: ['Our offseason bot', 'SolversLib updates', 'The new Solvers FLL team'],
    href: 'https://www.canva.com/design/DAGxsQyVvCo/2goPhuIAQoaVMOhYoo8Qqg/view?utm_content=DAGxsQyVvCo&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h8151bf8a77',
    cover: '/images/newsletters/2025-08.webp',
    coverSmall: '/images/newsletters/2025-08-360.webp',
  },
  {
    period: 'July 2025',
    season: 'Summer 2025',
    topics: ['Swerve', 'Multiuse chassis', 'LEGO robotics classes'],
    href: 'https://www.canva.com/design/DAGu9SFQJxA/ouQequy275NTYQxLOGFynA/view?utm_content=DAGu9SFQJxA&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h5279d7c96f',
    cover: '/images/newsletters/2025-07.webp',
    coverSmall: '/images/newsletters/2025-07-360.webp',
  },
];

/** Back issues grouped by season, newest season first, in the order they appear in `issues`. */
export function bySeason(list: Issue[]) {
  const groups: { season: string; issues: Issue[] }[] = [];
  for (const issue of list) {
    const group = groups.find((g) => g.season === issue.season);
    if (group) group.issues.push(issue);
    else groups.push({ season: issue.season, issues: [issue] });
  }
  return groups;
}
