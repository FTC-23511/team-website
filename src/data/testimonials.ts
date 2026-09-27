// Testimonials, verbatim (apostrophes set typographically), from the live seattlesolvers.com as of 2026-09-27: its
// "What Teams Say" carousel and "In Their Words" section. The two quotes from Tom are separate testimonials from the
// same person; the page stacks them under one attribution. The first entry is set large. Never add a
// quote that the team has not received in writing.

export type Testimonial = {
  quote: string;
  name: string;
  /** The speaker's team, when the source gives one. */
  team?: { label: string; href: string };
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'Seattle Solvers’ mentorship was an important part of our success in initial competitions as they helped design our first shooter and walked us through the tricky programming that came along with it.',
    name: 'Ishaan K.',
    team: { label: 'Droid Force, FTC 23849', href: 'https://ftcscout.org/teams/23849' },
  },
  {
    quote:
      'Solvers helped revive a dying swerve movement and showed me that even in FTC, so much more is possible. Seeing a group of fellow HS students accomplishing so much with complex mechanisms and software normally not seen in FTC inspired me to do the same, and allowed me to win awards and make worlds.',
    name: 'Tom',
  },
  {
    quote:
      'I didn’t know about swerve until I saw the work done on swerve. The CAD broadened my horizons on what was possible in FTC. Solvers has started the swerve journeys of many teams, reviving swerve when it was fading into obscurity.',
    name: 'Tom',
  },
];
