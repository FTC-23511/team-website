"""Turn a robot STL into the hero's packed point cloud (public/models/<name>.bin).

Dots come from two sources:
  * feature edges (dihedral angle > 25 degrees), thinned onto a grid so screw threads can't dominate,
  * a sparse surface haze, weighted toward surfaces visible from outside the robot.
Each dot is packed into a uint32: x 10 bits | y 10 bits | z 10 bits | category 2 bits (0 surface haze,
1 feature edge, 2 team-number outline), in shuffled order so any prefix of the file is an even subset
(phones request a prefix).

Usage:  python build_cloud.py <robot.stl> <out.bin> [edge_voxel_mm=2.0] [surface_voxel_mm=6.0]
Needs:  numpy, trimesh, scipy   (python -m venv .venv && .venv/bin/pip install numpy trimesh scipy)
After:  copy the printed LO/EXT into src/scripts/cypher.ts and the count into CypherHero.astro.
"""
import sys
import numpy as np
import trimesh

src, out = sys.argv[1], sys.argv[2]
EDGE_VOXEL = float(sys.argv[3]) if len(sys.argv) > 3 else 2.0
SURF_VOXEL = float(sys.argv[4]) if len(sys.argv) > 4 else 6.0
rng = np.random.default_rng(23511)

mesh = trimesh.load(src, process=True)
lo, hi = mesh.bounds

# Feature edges, sampled every 0.9 mm.
sel = mesh.face_adjacency_angles > np.radians(25)
E = mesh.face_adjacency_edges[sel]
ang = mesh.face_adjacency_angles[sel]
p0, p1 = mesh.vertices[E[:, 0]], mesh.vertices[E[:, 1]]
elen = np.linalg.norm(p1 - p0, axis=1)
cum = np.concatenate([[0], np.cumsum(elen)])
tpos = (np.arange(int(cum[-1] / 0.9)) + rng.random()) * 0.9
ei = np.clip(np.searchsorted(cum, tpos, side='right') - 1, 0, len(E) - 1)
epts = p0[ei] + (p1[ei] - p0[ei]) * ((tpos - cum[ei]) / np.maximum(elen[ei], 1e-9))[:, None]
eang = ang[ei]

# Dense surface samples double as the occluders for the visibility pass.
spts, _ = trimesh.sample.sample_surface(mesh, 4_000_000, seed=23511)

# Exterior exposure: orthographic point-splat depth buffers from 42 directions, including below.
dirs = trimesh.creation.icosphere(subdivisions=1).vertices
dirs /= np.linalg.norm(dirs, axis=1, keepdims=True)
PIX, TOL = 1.6, 3.0
center = (lo + hi) / 2
R = np.linalg.norm(hi - lo) / 2 + 5
G = int(np.ceil(2 * R / PIX))
occ, eocc = spts - center, epts - center
s_vis = np.zeros(len(spts), np.uint8)
e_vis = np.zeros(len(epts), np.uint8)
for d in dirs:
    a = np.array([0, 0, 1.0]) if abs(d[2]) < 0.9 else np.array([1.0, 0, 0])
    u = np.cross(d, a); u /= np.linalg.norm(u)
    v = np.cross(d, u)
    cell = lambda q: (np.clip((q @ u + R) / PIX, 0, G - 1).astype(np.int32) * G
                      + np.clip((q @ v + R) / PIX, 0, G - 1).astype(np.int32))
    zb = np.full(G * G, np.inf, np.float32)
    sc, sd = cell(occ), R - occ @ d
    np.minimum.at(zb, sc, sd.astype(np.float32))
    s_vis += sd <= zb[sc] + TOL
    e_vis += (R - eocc @ d) <= zb[cell(eocc)] + TOL * 1.3

def voxel_pick(pts, keep, voxel, weight):
    idx = np.flatnonzero(keep)
    q = np.floor((pts[idx] - lo) / voxel).astype(np.int64)
    key = (q[:, 0] * 1_000_003 + q[:, 1]) * 1_000_033 + q[:, 2]
    order = np.lexsort((-(weight[idx] + rng.random(len(idx)) * 1e-3), key))
    k = key[order]
    return idx[order[np.concatenate([[True], k[1:] != k[:-1]])]]

n = len(dirs)
# The drivetrain (the lowest ~quarter of the robot) packs motors, gears, belts, and swerve modules
# into one band. Sample it on coarser grids so its outlines stay crisp but it is no denser than the rest.
H = hi[2] - lo[2]
BANDS = [(0.0, 0.22, 1.5), (0.22, 0.3, 1.2), (0.3, 1.01, 1.0)]  # (from, to, grid multiplier) in height

def banded_pick(pts, keep, voxel, weight):
    zn = (pts[:, 2] - lo[2]) / H
    return np.concatenate([voxel_pick(pts, keep & (zn >= a) & (zn < b), voxel * m, weight) for a, b, m in BANDS])

# Team-number plates: the "23511" cut into a plate on each side of the robot (mm, STL axes). Edge dots
# inside these boxes are the digit outlines: every raw 0.9 mm sample is kept so the digits read as solid
# lines, and they get their own category so the site can draw them in a pale cream.
# Only the plates' outer faces (|y| = 173.3): parts just inside the plates share the digits' x and z.
NUMBER_BOXES = [((-70, 170, 151), (162, 177, 209)), ((-70, -177, 151), (162, -170, 209))]

def in_numbers(pts):
    m = np.zeros(len(pts), bool)
    for (x0, y0, z0), (x1, y1, z1) in NUMBER_BOXES:
        m |= (pts[:, 0] >= x0) & (pts[:, 0] <= x1) & (pts[:, 1] >= y0) & (pts[:, 1] <= y1) & (pts[:, 2] >= z0) & (pts[:, 2] <= z1)
    return m

e_sel = banded_pick(epts, (e_vis > 0) | (rng.random(len(epts)) < 0.25), EDGE_VOXEL, e_vis / n + eang / np.pi)
e_sel = np.union1d(e_sel, np.flatnonzero(in_numbers(epts)))
s_exp = s_vis / n
s_sel = banded_pick(spts, rng.random(len(spts)) < 0.12 + 0.88 * np.sqrt(s_exp), SURF_VOXEL, s_exp)

P = np.vstack([epts[e_sel], spts[s_sel]])
F = np.concatenate([np.ones(len(e_sel), np.uint32), np.zeros(len(s_sel), np.uint32)])

F[in_numbers(P) & (F == 1)] = 2

# Declutter: thin crowded 16 mm cells (swerve modules, motors, electronics) toward ~45 dots each,
# softly, so plates and outlines keep every dot and dense clusters stop reading as ink blots.
DECLUTTER_CELL, DECLUTTER_CAP = 16.0, 45
q = np.floor((P - lo) / DECLUTTER_CELL).astype(np.int64)
_, inv, cnt = np.unique((q[:, 0] * 1_000_003 + q[:, 1]) * 1_000_033 + q[:, 2], return_inverse=True, return_counts=True)
keep = (rng.random(len(P)) < np.minimum(1.0, (DECLUTTER_CAP / cnt[inv]) ** 0.9)) | (F == 2)  # digits stay whole
P, F = P[keep], F[keep]
e_sel, s_sel = np.flatnonzero(F >= 1), np.flatnonzero(F == 0)

perm = rng.permutation(len(P))
P, F = P[perm], F[perm]
unit = (P - lo) / (hi - lo)
qi = np.round(unit * 1023).astype(np.uint32)
packed = qi[:, 0] | (qi[:, 1] << 10) | (qi[:, 2] << 20) | (F << 30)
packed.astype('<u4').tofile(out)
print(f'{len(P)} dots ({int((F == 1).sum())} edge, {int((F == 2).sum())} number, {int((F == 0).sum())} surface), {packed.nbytes} bytes -> {out}')
print('LO  =', [round(float(x), 4) for x in lo])
print('EXT =', [round(float(x), 4) for x in hi - lo])
