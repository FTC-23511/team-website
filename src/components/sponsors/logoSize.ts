import type { Sponsor } from '../../data/home';

// Each tier's logo box in rem, [width, height], following the sponsorship package's small, medium and large logo
// benefit; square and round marks get a taller box so they carry as much ink as a wordmark.
const BOX = {
  xl: { wide: [17, 7.5], compact: [19, 9.2] },
  l: { wide: [12.5, 5], compact: [14, 6.2] },
  m: { wide: [9.2, 4], compact: [10, 5.2] },
  s: { wide: [7.5, 3.25], compact: [7.5, 3.95] },
} as const;

export type LogoTier = keyof typeof BOX;

/** How big a sponsor's logo is drawn on the Sponsors page, in rem: its tier's box, times its own `grow`, at its ratio. */
export function logoSize(s: Sponsor, tier: LogoTier) {
  const [w, h] = BOX[tier][s.compact ? 'compact' : 'wide'].map((v) => v * (s.grow ?? 1));
  const width = Math.min(w, h * s.ratio);
  return { width: +width.toFixed(3), height: +(width / s.ratio).toFixed(3) };
}
