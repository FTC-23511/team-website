# Share image

`og.html` is the source of `public/og/default.jpg`, the picture link previews show for every page. It uses the
site's own fonts (from `node_modules`), the white logo and the Cypher stipple poster from `public/`.

To re-render it after a change: open `og.html` in a browser at exactly 1200 × 630 (for example with Playwright:
`page.setViewportSize({ width: 1200, height: 630 })`), take a screenshot, save it as a JPEG around quality 88 at
`public/og/default.jpg`, and update `default.jpg.json` next to it. If the words change, update `imageAlt` in
`src/layouts/Base.astro` to match.
