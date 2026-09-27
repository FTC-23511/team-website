// Videos by and about the team. Titles, channels and ids are checked against YouTube's own oEmbed data
// (2026-09-27); `title` is the shown title, cleaned of the channel's " | " suffixes, and `original` is the
// title exactly as YouTube lists it (used for the player's accessible name). Thumbnails live in
// public/images/videos, each with a provenance sidecar.
//
// New video: add it here with its id from the YouTube URL, then download its thumbnail
// (https://i.ytimg.com/vi/<id>/maxresdefault.jpg) into public/images/videos as webp.

export type VideoKind = 'Feature' | 'Workshop' | 'Autonomous' | 'Reveal';

export type Video = {
  id: string;
  title: string;
  original: string;
  channel: string;
  kind: VideoKind;
  /** One line of context, from the video itself. */
  note?: string;
  thumb: string;
  /** A 480px-wide copy of the thumbnail for small previews (the /resources hub strip). */
  thumbSmall?: string;
  /** How far down the thumbnail the play ring sits, in percent (default 50), for a still whose title fills the middle. */
  playAt?: number;
  /** YouTube Shorts are vertical. */
  vertical?: boolean;
  /** The season robot page it belongs to, if any. */
  season?: 'decode' | 'into-the-deep';
};

export const channel = { label: 'YouTube channel', href: 'https://www.youtube.com/@ftc23511' };

export const videos: Video[] = [
  {
    id: '3FkFxwGTW1k',
    title: 'Cypher CAD release',
    original: 'Cypher CAD Release | 23511 Seattle Solvers',
    channel: 'RoboFTC',
    kind: 'Reveal',
    thumb: '/images/videos/cypher-cad-release.webp',
    thumbSmall: '/images/videos/cypher-cad-release-480.webp',
    season: 'decode',
  },
  {
    id: 'GFXoEtIMY48',
    title: 'Behind the Bot: our DECODE robot',
    original: '23511 Seattle Solvers | Behind the Bot | FTC DECODE Robot',
    channel: 'FUN Robotics Network',
    kind: 'Feature',
    thumb: '/images/videos/behind-the-bot.webp',
    thumbSmall: '/images/videos/behind-the-bot-480.webp',
    season: 'decode',
  },
  {
    id: 'LoU7EZCF1cM',
    title: 'DECODE coaxial swerve and transfer',
    original: 'DECODE Coaxial Swerve and Impressive Transfer Process | 23511 Seattle Solvers | FTC OA Show',
    channel: 'FUN Robotics Network',
    kind: 'Feature',
    note: 'On The FTC Open Alliance Show.',
    thumb: '/images/videos/oa-show-coaxial-swerve.webp',
    thumbSmall: '/images/videos/oa-show-coaxial-swerve-480.webp',
    season: 'decode',
  },
  {
    id: '3-PtN01V_ls',
    title: 'Tackling complex designs through planning',
    original: 'Tackling Complex Designs Through Planning - Multichassis & Swerve | Inspire Across the Globe 2025',
    channel: 'Seattle Solvers',
    kind: 'Workshop',
    note: 'Multichassis and swerve, for Inspire Across the Globe 2025.',
    thumb: '/images/videos/complex-designs-planning.webp',
    // Below the "By: FTC 23511 - Seattle Solvers" line, between the swerve module and the chassis.
    playAt: 62,
  },
  {
    id: 'RGAbCn9sYp0',
    title: 'Fundraising workshop',
    original: 'Fundraising Workshop - Tips and Tricks to Fundraise Sustainably',
    channel: 'Seattle Solvers',
    kind: 'Workshop',
    note: 'Tips and tricks to fundraise sustainably, at the Washington Brickcon Kickoff.',
    thumb: '/images/videos/fundraising-workshop.webp',
    // The title card fills the middle; below it the still is plain yellow.
    playAt: 82,
  },
  {
    id: 'cxpzRtRNa-k',
    title: '5 specimen autonomous',
    original: '5 specimen autonomous | FTC 23511',
    channel: 'Seattle Solvers',
    kind: 'Autonomous',
    thumb: '/images/videos/auto-5-specimen.webp',
    vertical: true,
    season: 'into-the-deep',
  },
  {
    id: 'Mk8ygZ1XQMw',
    title: '6 sample autonomous',
    original: '6 sample autonomous | FTC 23511',
    channel: 'Seattle Solvers',
    kind: 'Autonomous',
    thumb: '/images/videos/auto-6-sample.webp',
    vertical: true,
    season: 'into-the-deep',
  },
];

export const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
