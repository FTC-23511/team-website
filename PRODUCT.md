# Product

## Platform

web

## Stack

Delegated: Astro, static-first. Content (seasons, awards, sponsors, roster, classes, resources) lives in Markdown/JSON content collections so future members can update it each season without touching layout code. Deploy on Vercel for first-class Astro support and per-branch preview deploys that other members can review. Add server endpoints only where a feature needs one; nothing on the site needs a server today.

## Users

**Primary: sponsors and donors.** These are companies and individuals deciding whether to fund a student-led FTC team that is 100% sponsor-funded with no membership fees. They need to see quickly that the team is credible and has real impact, then find a clear way to give.

The site also serves these audiences, because it replaces everything the current site does:

- **Parents** enrolling grades 4–7 kids in the team's LEGO robotics classes.
- **Middle and high school students** in the Sammamish area deciding whether to apply to the competition team.
- **The FTC community:** other teams coming for SolversLib, robot CAD, engineering portfolios, workshop videos, and mentorship.

## Product Purpose

This is the public home of Seattle Solvers, FTC Team #23511, and a full replacement for the current seattlesolvers.com. It carries over every page and feature the current site has.

Success means two things:

- A sponsor lands, sees verified proof of results and reach, and knows exactly how to give.
- Every existing job still works: class enrollment, team applications, open resources, and contact. (The old site's member check-in tool was dropped on the team's request, 2026-09-27.)

## Positioning

These are facts about Seattle Solvers that another FTC team could not truthfully claim:

- **Inspire Award, 2nd Place, at the 2025–26 FIRST World Championship (Houston).** The team describes it as "the highest award ever earned by a Washington FTC team." The team also ranked 32nd in the world by OPR as of early February 2026 (263rd of 8,368 at season end), in its third season.
- **Maintainer of SolversLib,** an open-source FTC programming library and actively maintained fork of FTCLib that other teams build on. It has docs at docs.seattlesolvers.com and is hosted on the Dairy Foundation repository.
- **Its own LEGO robotics curriculum** for grades 4–7, based on FIRST LEGO League, run as paid classes that also fund the team.
- **Outreach:** year-round mentoring of other FIRST teams, community STEM events, and a pilot program in rural India.
- **Funding:** student-led, 100% sponsor-funded, no membership fees. Mission line: "STEM for all."

## Operating Context

- **FTC season cycle.** Each season brings a new robot, CAD, awards, portfolio, and sponsor list, so the site gets a content refresh every year. Past seasons include Into the Deep (2024–25) and DECODE (2025–26), and the team also has an offseason program.
- **Rotating maintainers.** Maintainers change as students graduate, so content editing must not depend on one person.
- **Donation paths:** HCB (Hack Club), WA FIRST Boosters, and direct email.
- **Class enrollment** runs through JotForm: $300 per summer session and $250 per school-year session, at Intro and Advanced levels, paid by PayPal inside the form. A separate JotForm interest form notifies families when classes open. Sessions live in `src/data/classes.ts` with their dates; the Classes page offers sign-up only while a listed session is still ahead (checked again in the browser, so a stale deploy never advertises a past session) and offers the interest form otherwise.
- **Team applications** open each May through the team's own form. Recruiting for 2026-27 is closed and reopens in May 2027 for 2027-28; `recruiting` in `src/data/site.ts` holds the status and, when applications open, the form link that switches on the Apply button on Join the Team.
- **Contact:** team@seattlesolvers.com is preferred for detailed questions and Discord for quick ones. The team also uses Instagram, YouTube, LinkedIn, and Linktree.
- **SolversLib documentation** is a separate site at docs.seattlesolvers.com. This site links to it and does not host it.

## Capabilities and Constraints

Everything in this list must carry over from the current site:

- **Home** with an interactive CAD viewer of the current robot.
- **About:** team introduction, plus students, mentors, coaches, and alumni.
- **The Robot:** engineering showcase for the current season's robot.
- **Seasons and awards history** across FTC and FIRST LEGO League.
- **Classes:** LEGO robotics for grades 4–7 at Intro and Advanced levels, the enrollment period (Summer 2026, now finished; no later term announced), and class policies.
- **Apply:** a competition team application and a class application.
- **Support Us / Sponsors:** tiered sponsorship with recognition levels, current sponsor logos, and donation paths.
- **Contact:** email, Discord, and social links.
- **Resources:** SolversLib and a link to its docs, robot CAD, full engineering portfolios, and workshop videos.
- **Testimonials** from the community.

Every capability above is built (2026-09-27): Home, Meet the Team, Awards, Newsletters, Join the Team, Outreach (with the testimonials), the two robot season pages, Resources (hub, Designs, Portfolios, Videos & Workshops), Classes and Class Policies, the three Sponsors pages, Contact and a 404. Sponsor tiers and perks come from the sponsorship package, the awards from the Google Site and FTCScout, and the roster from the Google Site plus the live site. The live site's own data (inline in its page script) was the source for the newer members, the testimonials and the video list.

Open decisions:

- **Old links (resolved).** The old site's hash routes (`/#classes`, `/#apply-team`, `/#class-policies` and the rest) forward from the home page to the page that replaced each view. `/about`, `/robots` and `/impact` redirect to their first page.
- **Plate manufacturing.** The current site announces a custom plate manufacturing service as forthcoming. It is not launched and is not presented anywhere. The live site's "Intro to Engineering Design & Manufacturing" class (coming Summer 2027) is also left out until the team confirms it; the interest form already lists "Intro to Custom Manufacturing".
- **Hosting cutover.** The domain's current host and the DNS cutover plan are undecided. The build targets `https://www.seattlesolvers.com` (canonical links, share links, the sitemap and robots.txt all come from `site` in `astro.config.mjs`), because the apex already redirects to www. Serving from the apex instead only means changing `site`.
- **The robot at Worlds.** The Worlds portfolio (in Drive) says the team built a second robot, Enigma (belted mecanum, bypassable spindexer, power take-off lift), for the World Championship, and on April 6 called the competing robot "not yet final". The evidence since points to Cypher playing Houston: FUN Robotics Network's "Behind the Bot" episode (published 2026-05-12) says the team "finishes the DECODE season as 4th in the Lovelace Division and 2nd Inspire Award recipient" and walks through the swerve drive; its match footage shows 23511 beside playoff partner 21239 (FTCScout lists that alliance at Worlds); its swerve robot has the same green-center intake as the site's own Lovelace Field 2 photo; and the Houston pit photo shows that robot on the floor while a mecanum robot with rails sits on the table. The DECODE page is written to hold either way: Cypher qualified the team for Worlds, and a second robot, Enigma, was built for it. The Worlds photos stay unnamed (a robot's number sign takes its alliance color each match), and the Enigma stop uses the portfolio's cover photo, where the rail lift identifies it. Confirm with the team which robot played in Houston, then name it in the Worlds stop.
- **Cypher v2 timing.** Dated January 2026 on the DECODE page: every v2 change is already in the Washington competitions portfolio written for States (January 31). The February and March newsletter's "v2 robot upgrades" is about Enigma (it is on the cover).
- **Conflicting claims between sources.** These need the team's confirmation. The home page uses the Google Site awards list and the sponsorship PDF's newer figures:
  - Resolved: both Inspire Award 2nd places are real. FTCScout records one at the Washington State Tesla League Tournament (December 2025) and one at the FIRST World Championship, Lovelace Division (Houston, April 29 to May 2, 2026), where the team also ranked 4th in the division.
  - Event and award names: the 2025-26 events are FTC Events' names ("Tesla League Tournament", "Capek Super Qualifier") with the Google Site's "Washington State" prefix. "FIRST Leadership Award Finalist" (Saket) is how FTC Events lists the honor (FTCScout's award type is still DeansListFinalist) and how the Worlds portfolio names it; the Google Site's awards list does not include it.
  - Alliance at the 2024-25 State Championship: the Google Site says "4th Alliance Partner". FTC Events lists the team on the alliance seeded 5th, which finished 4th of 6. The site keeps the Google Site's wording; if the team meant the seed, it should read "5th Alliance Partner", and if it meant the finish, "Alliance Partner, 4th of 6 alliances".
  - Cypher's chassis: the Google Site calls the robot fully aluminum; the Washington competitions portfolio describes a carbon fiber bellypan with aluminum side plates (made by Fabworks). The DECODE page follows the portfolio.
  - OPR standing: the sponsorship PDF shows 32nd (99.57th percentile) as of early February 2026; by season end FTCScout ranks the same OPR 263rd of 8,368. The home page uses the season-end figure (96.9% OPR percentile).
  - Years active: "three seasons" (Google Site home) against "over 5 years" (sponsorship PDF).
  - Students taught in classes: "over 70" (Google Site About) against "100+" (sponsorship PDF).
  - Award count: the home page counts 18 (17 in the earlier package plus the Worlds award); the package revised on 2026-09-26 says "17 awards ... including the Inspire 2 Award at the Houston World Championship".
  - Advanced class grades: the Google Site says it is "designed for 3rd-6th graders" (and once calls it "Intermediate"), while the program is for grades 4 to 7. The Classes page shows the Intro prerequisite and no grade band for Advanced.
  - Riptide's ascent: the Designs page lists "L3 Ascent capability" for the CAD; the robot page says level 3 was not working by States. Designs keeps its wording; the Into the Deep page says level 2.
- **Worth confirming.** The one-line subteam descriptions on Join the Team are summaries built from site facts. Spartabots' site (2976.org) showed "Deployment Paused" on 2026-09-27, so its Gold logo is shown without a link until the site is back.
- **Newsletter cadence.** The archive ends with the February + March 2026 issue. The Newsletters page no longer promises a schedule; the sponsorship package still lists a "bi-monthly newsletter" as a sponsor benefit. Ask whether later issues exist (add them at the top of `issues` in `newsletters.ts`) or whether the newsletter has paused.
- **Roster still to fill (2026-09-27).** Vihaan, Kabir and George now have photos and roles from the live site (its role names mapped to Meet the Team's: Mechanical (CAD) as Design Team, Mechanical (Build) as Build Team), and Sanjay has roles but no photo. The team set the current roles on 2026-09-27 (Ishaan first as captain, Arush as Programming Lead and Finance Co-Lead, Kabir as Finance Co-Lead, Brandon on the Finance and Programming Teams, Erin on the Build Team, Aarav off Programming, Saket as a former Team Captain, Ajay as a former Finance Lead) and gave Anthony's photo and roles (Design and Outreach Teams; the CAD team is the Design Team here) and Devyn's line (Programming Lead of FTC Team 14343; the Google Site had repeated Aaditya's lines under him). Brandon still has no photo. The live site also lists mentors Rowan and Zaiden, coach Raghu and alumnus Harshit, who are not on the Google Site and are not added. The home "Team members" readout counts the current students on Meet the Team, placeholders included. George's live-site photo is cropped to head and shoulders, leaving out the award plaque (it shows his full name) and the bills he is holding; the roster otherwise uses first names only.
- **Sponsorship package file.** The PDF's Author field is set to "Seattle Solvers, FTC Team #23511" (Canva had written a student's full name there), and its Canva design IDs are removed from the keywords.

## Brand Commitments

- Name: **Seattle Solvers**, **FTC Team #23511**, Sammamish, Washington.
- Described as a student-led team with members from middle and high schools across the area.
- Mission line: "STEM for all."
- Team email: team@seattlesolvers.com.
- Logo: the "Logo with Name" artwork from the 23511 Logos folder, used unmodified (`public/brand/logo-name.png`; the white version, `logo-name-white.png`, on dark grounds and in the footer). The wordless bulb (`public/favicon.svg`, vector source in `public/brand/mark.svg`) is the favicon.
- Type (the team's rule, 2026-09-26): modern fonts only. Orbitron for headings, Inter for body text, never a serif.
- Palettes on Coolors (coolors.co/u/seattle_solvers): Solvers Light Theme and Solvers Dark Theme.
- Sponsorship contact: business@seattlesolvers.com.

## Evidence on Hand

**Primary content source (per the team, 2026-09-26):** the Google Site at sites.google.com/view/seattlesolvers, plus the sponsorship package (tiers, benefits, reach figures, 501(c)(3) status). The package was revised on 2026-09-26 ("bi-monthly" newsletter, Worlds Inspire 2 in the intro); its 3 MB web copy is `public/documents/sponsorship-package-2026.pdf`, recompressed from the 21 MB original with the pages unchanged. Also used: the Worlds portfolio (Drive) and the Washington competitions portfolio (Canva) for the robots' story, FTCScout for every event's date and city, YouTube's own data for video titles, and the public Canva views for newsletter and portfolio covers. Competition results: FTCScout (api.ftcscout.org, team 23511). Robot CAD: `~/Downloads/Cypher.stl`, turned into `public/models/cypher.bin` by `tools/pointcloud/build_cloud.py`.

The items below were taken from the live seattlesolvers.com on 2026-09-26. Carry them over verbatim, and re-confirm the figures with the team before launch.

- **Awards:** Inspire Award, 2nd Place at the FIRST World Championship · Houston (2025–26), described as "the highest award ever earned by a Washington FTC team" (not used on the site yet; the team should confirm it before it is). The live site's "32nd in the world" was an early-February OPR rank, so the site shows the season-end percentile instead.
- **Current sponsors:** Gene Haas Foundation, Amazon Robotics, FRCTees, FIRST Washington, Onshape, Polymaker, Brown Bear Car Wash, Learner Labs, Code Wiz, Pack of Parts, SWYFT, AG-GRID Energy, Fabworks, and AoPS Academy.
- **Testimonials** (verbatim, with attribution):
  - "Solvers helped revive a dying swerve movement and showed me that even in FTC, so much more is possible. Seeing a group of fellow HS students accomplishing so much with complex mechanisms and software normally not seen in FTC inspired me to do the same, and allowed me to win awards and make worlds." — Tom
  - "Seattle Solvers' mentorship was an important part of our success in initial competitions as they helped design our first shooter and walked us through the tricky programming that came along with it." — Ishaan K. · Droid Force, FTC 23849
  - "I didn't know about swerve until I saw the work done on swerve. The CAD broadened my horizons on what was possible in FTC. Solvers has started the swerve journeys of many teams, reviving swerve when it was fading into obscurity." — Tom (the live site's testimonial carousel, 2026-09-27)
- **Open-source work:** SolversLib (sibling repo `../SolversLib`, docs in `../SolversLib-Docs`) and season robot code (`../Decode-2026`, `../Into-the-Deep-2025`, `../Offseason-2026`).
- **Other outreach claims on the current site:** mentoring 10 FIRST teams year-round, a curriculum "used by schools around the world," elementary school STEM events, farmers' market demos, and the rural India pilot. Confirm the figures before reusing them.

Still missing, and must not be fabricated:

- Brandon's and Sanjay's photos.
- Usage metrics for SolversLib, such as downloads or adopting teams.
- Any other testimonials.
- Photos and logos beyond those taken from the Google Site, the live site and the team's Canva documents.

## Product Principles

1. **Proof before the ask.** A sponsor meets verified results and reach before being asked for money, and every claim traces to a real source.
2. **Giving is always one step away.** From any page, a visitor can reach the real donation and sponsorship paths without searching.
3. **Every audience still finds its door.** Sponsors come first, but parents, applicants, FTC teams, and members reach classes, applications, and resources directly. Nothing the current site does is lost.
4. **Maintainable by next year's roster.** Seasonal content changes (robot, awards, sponsors, classes) happen in content files, not layout code.
5. **Member data stays private.** The roster uses first names only, and nothing personal is published.
