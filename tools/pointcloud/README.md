# Point cloud for the home hero

`build_cloud.py` turns a robot STL (exported from Onshape) into `public/models/cypher.bin`, the dots
the home page draws. Run it again when a new season's robot should take over the hero.

```sh
python3 -m venv .venv && .venv/bin/pip install numpy trimesh scipy
.venv/bin/python tools/pointcloud/build_cloud.py ~/Downloads/Robot.stl public/models/cypher.bin
```

It prints the dot count and the STL bounds. Put the bounds (`LO`, `EXT`) into
`src/scripts/cypher.ts` and the count into `POINTS` in `src/components/CypherHero.astro`, then
regenerate the fallback poster `public/models/cypher-poster-dark.webp` from the page and re-crop
`public/images/home/hero-poster.webp` from it, following the steps in that
image's `.webp.json` note.

Tuning: the two optional arguments are the edge and surface grid sizes in millimetres (defaults
2.0 and 6.0). Smaller values mean more dots and a bigger file; about 170,000 dots (680 KB) is the
current budget. Two passes keep busy areas calm: the drivetrain band is sampled on coarser grids
(`BANDS`), and crowded 16 mm cells are thinned (`DECLUTTER_CAP`).
