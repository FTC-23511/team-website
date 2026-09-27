// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// The address that canonical links, share previews (og:url, og:image), the sitemap and robots.txt use. On Vercel it is
// the project's production domain, so link previews always load from where the site is live: the vercel.app address
// now, the team's own domain once it is attached. SITE_URL overrides it; local builds fall back to www.
const production = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site = process.env.SITE_URL || (production ? `https://${production}` : 'https://www.seattlesolvers.com');

export default defineConfig({
  site,
  // Addresses have no trailing slash (/about/team): each page is built as a file (about/team.html), which Vercel serves
  // at the clean address (cleanUrls in vercel.json) and redirects the slashed form to (trailingSlash: false).
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [icon(), sitemap()],
  redirects: {
    // Menu parents without a page of their own send visitors to their first page.
    '/about': '/about/team',
    '/robots': '/robots/decode-2025-26',
    '/services': '/classes',
    // Outreach used to have its own address under Impact.
    '/impact/outreach': '/impact',
    // The Google Site's paths. The sponsorship package links to three of them, and old shared links use the rest.
    '/home': '/',
    '/about-us': '/about/team',
    '/about-us/awards': '/about/awards',
    '/about-us/newsletters': '/about/newsletters',
    '/about-us/outreach-events': '/impact',
    '/impact/outreach-events': '/impact',
    '/outreach-events': '/impact',
    '/resources/cad-designs': '/resources/designs',
    '/resources/documents': '/resources/portfolios',
    '/classes/intro-classes': '/classes',
    '/classes/advanced-classes': '/classes',
    '/classes-backend/interest-form': '/classes',
    '/classes-backend/intro-class-signup': '/classes',
    '/classes-backend/org-policies': '/classes/policies',
    '/support-us': '/sponsors',
    '/support-us/sponsors': '/sponsors',
    '/support-us/sponsorship': '/sponsors/become-a-sponsor',
    '/support-us/donate': '/sponsors/donate',
    '/contact-us-offseason': '/contact',
  },
  devToolbar: { enabled: false },
});
