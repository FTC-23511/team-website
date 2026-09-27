// Contact page content. Source: the Contact Us page of the team's Google Site
// (sites.google.com/view/seattlesolvers/contact-us-offseason, scraped 2026-09-27). Class questions go to the business
// inbox, as every class page on the Google Site says. Keep each line traceable to those pages.
import { emails, socials, linktree } from './site';

// "We prefer to communicate over email" and "we are also most active in our team's public Discord server for quick
// questions or conversations."
export const lede = 'Email is the best way to reach us. For a quick question, come find us on Discord.';

export const inboxes = [
  {
    address: emails.team,
    title: 'General questions',
    body: 'For general communication with the team.',
  },
  {
    address: emails.business,
    title: 'Sponsorships, classes, and outreach',
    body: 'Sponsorship details, class questions, outreach initiatives, and any other financial topic.',
  },
  {
    address: emails.mechanical,
    title: 'Mechanical subteam',
    body: 'Technical questions for the students who design and build our robots.',
  },
  {
    address: emails.software,
    title: 'Software subteam',
    body: 'Technical questions for the students who program our robots.',
  },
];

// The Discord invite from the site's socials. Member count: sponsorship package, page 4 ("Team Public Discord
// Server, 400+ members").
const discordLink = socials.find((s) => s.label === 'Discord')!;
export const discord = {
  href: discordLink.href,
  members: '400+',
};

// "Contacting us over other social media platforms most likely will lead to a longer response time, as we prefer
// to communicate over email."
export const elsewhere = {
  note: 'We read messages on social media too, but email gets you a faster answer.',
  links: [
    ...socials.filter((s) => s.label !== 'Discord'),
    { label: 'Linktree', href: linktree, icon: 'ph:link-simple' },
  ],
};
