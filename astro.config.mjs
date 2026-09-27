// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // The apex redirects to www, so canonical links, share links, the sitemap and robots.txt all name www.
  site: 'https://www.seattlesolvers.com',
  // Every page is a folder (about/team/index.html), so every URL and every internal link ends in a slash.
  trailingSlash: 'always',
  integrations: [icon(), sitemap()],
  redirects: {
    // Menu parents without a page of their own send visitors to their first page.
    '/about': '/about/team/',
    '/robots': '/robots/decode-2025-26/',
    '/impact': '/impact/outreach/',
    // The Google Site's paths. The sponsorship package links to three of them, and old shared links use the rest.
    '/home': '/',
    '/about-us': '/about/team/',
    '/about-us/awards': '/about/awards/',
    '/about-us/newsletters': '/about/newsletters/',
    '/about-us/outreach-events': '/impact/outreach/',
    '/impact/outreach-events': '/impact/outreach/',
    '/outreach-events': '/impact/outreach/',
    '/resources/cad-designs': '/resources/designs/',
    '/resources/documents': '/resources/portfolios/',
    '/classes/intro-classes': '/classes/',
    '/classes/advanced-classes': '/classes/',
    '/classes-backend/interest-form': '/classes/',
    '/classes-backend/intro-class-signup': '/classes/',
    '/classes-backend/org-policies': '/classes/policies/',
    '/support-us': '/sponsors/',
    '/support-us/sponsors': '/sponsors/',
    '/support-us/sponsorship': '/sponsors/become-a-sponsor/',
    '/support-us/donate': '/sponsors/donate/',
    '/contact-us-offseason': '/contact/',
  },
  devToolbar: { enabled: false },
});
