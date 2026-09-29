# seattlesolvers.com

The website for Seattle Solvers, FTC Team #23511. It's a static [Astro](https://astro.build) site: every page is
built ahead of time, and almost everything you'd want to change each season lives in the data files in
`src/data/`, not in the page code.

- `PRODUCT.md`: what the site is for, where each fact comes from, and the decisions still open.
- `DESIGN.md`: the design system (colors, type, components, the rules). Read it before changing how anything looks.

## Running it

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # writes the site to dist/
npm run preview   # serves dist/ to check the real build
npm run check     # type-checks every page and data file
```

## Where things live

| Page | Content |
| --- | --- |
| Home | `src/data/home.ts` (stats, hero photos, sponsor logos by tier) |
| Meet the Team | `src/data/team.ts` |
| Awards | `src/data/awards.ts` |
| Newsletters | `src/data/newsletters.ts` |
| Join the Team (`/apply`) | `src/data/apply.ts`, plus `recruiting` in `src/data/site.ts` |
| Outreach | `src/data/impact.ts`, `src/data/testimonials.ts` |
| Robot season pages | `src/data/robots.ts` (one route serves every season) |
| Resources, Designs, Portfolios | `src/data/resources.ts` |
| Videos & Workshops | `src/data/videos.ts` |
| Classes, Class Policies | `src/data/classes.ts` |
| Plate Manufacturing (Services menu) | `src/pages/services/plate-manufacturing.astro` |
| Sponsors, Become a Sponsor, Donate | `src/data/sponsors.ts`, logos in `src/data/home.ts`, the PDF in `public/documents/` |
| Contact | `src/data/contact.ts`, addresses in `src/data/site.ts` |
| Nav, footer, socials, donate links | `src/data/site.ts` |

Each data file starts with a comment saying where its facts came from. Keep it that way: if you can't point to a
source (the team's own documents, FTCScout, the sponsorship package), it doesn't go on the site.

## Common updates

**A new season.** Add the season's awards at the top of `ftcSeasons` in `awards.ts` first, then add the season at
the top of `seasons` in `robots.ts` (its log reads results from `awards.ts` by event name, so the two can't drift),
then add the route to the Robots menu in `site.ts` as its first entry (the home page's old `/#robots` link and the
404 page follow that entry), and point the `/robots` redirect in `astro.config.mjs` at it. Event dates and cities
come from FTCScout. The season's CAD and portfolios go at the top of `designSeasons` and `portfolioSeasons` in
`resources.ts`, and its videos in `videos.ts`; the Resources page counts them by itself.

**Class sessions.** Add them to the course in `classes.ts` as ISO dates (`2027-07-19`). The Classes page works out
by itself whether sign-up is open: while a session is still ahead it shows the sign-up form, and once every session
has started it switches to the interest form, even on an old deploy.

**Recruiting.** When applications open, set `recruiting.open` to `true` in `site.ts` and paste the form link into
`recruiting.form`. The Apply button appears on Join the Team. Update the seasons and dates there too.

**A newsletter.** Add it at the top of `issues` in `newsletters.ts` with its Canva link and a cover image. The
newest issue is featured automatically.

**Sponsors.** Logos and tiers are in `sponsorTiers` in `home.ts`; the Sponsors page and the home logo wall both read
from it. When the sponsorship package changes, replace `public/documents/sponsorship-package-2026.pdf` (keep it
around 3 MB; Canva's full-quality export is too heavy for the web) and update `sponsors.ts` to match.

**Team members.** `team.ts`. A student without a photo yet shows their initial until the photo is added.

## Images

Photos ship as `.webp` under `public/images/<area>/`, sized for how big they appear (portraits are 600 × 800).
Every image has a `.webp.json` next to it that says where it came from, so the next person knows it's ours to use:

```json
{ "prompt": "Origin: <where it came from and what was done to it>", "createdAt": "2026-09-27T00:00:00.000Z" }
```

Photos show in their own colors. The yellow duotone is kept for the Meet the Team portraits (color on hover) and
the home page's hero and "Who we are" photos; that's all done in CSS, so always upload photos in normal color.

## Deploying

`npm run build` produces a plain static site in `dist/`. It is hosted on Vercel (the team's `software@` account),
connected to this repository: every push to `main` publishes the site, and every other branch gets its own preview
link. The site lives at `www.seattlesolvers.com`; `seattlesolvers.com`, `seattlesolvers.org` and
`www.seattlesolvers.org` redirect there with the path kept (redirect domains in the Vercel project). Both domains'
DNS is on Cloudflare (the `solvers.seattle@` account) with these records set to DNS only (grey cloud): A records
`216.198.79.1` and `64.29.17.1` on the bare domain, and a CNAME on `www` to the `vercel-dns-017.com` name Vercel
gives the project. Addresses have no trailing slash (`/about/team`): each page is built as its own file, `vercel.json` serves it at
the clean address, and a slashed link (`/about/team/`) redirects to it. Internal links are written without the slash.
`astro.config.mjs` sets the site address (used for the sitemap, canonical links and link previews: the `SITE_URL`
environment variable, which Vercel sets to `https://www.seattlesolvers.com` for production builds, else the
project's production domain) and the redirects:
menu parents without a page of their own (`/about`, `/robots`), Outreach's old address (`/impact/outreach`, now at
`/impact`), and the old Google Site's paths, which the
sponsorship package still links to.

The spinning dot robot on the home page is built from the robot's STL by `tools/pointcloud/` (see its README).
