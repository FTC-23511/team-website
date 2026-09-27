// Orbitron 500 advance widths in em for the capitals a title can use, measured in the browser. Orbitron's capitals
// are wide, so on a narrow phone one long word ("Newsletters") can outgrow the line. A page title caps its size so
// its longest word always fits: `titleFit` returns that word's width in em, plus air, for the `--fit` property.
const ADVANCE: Record<string, number> = {
  A: 0.836, B: 0.832, C: 0.822, D: 0.834, E: 0.766, F: 0.723, G: 0.83, H: 0.851, I: 0.214, J: 0.78, K: 0.797,
  L: 0.779, M: 0.928, N: 0.832, O: 0.828, P: 0.791, Q: 0.884, R: 0.825, S: 0.824, T: 0.759, U: 0.828, V: 1.003,
  W: 1.179, X: 0.812, Y: 0.806, Z: 0.821, '0': 0.834, '1': 0.391, '2': 0.83, '3': 0.826, '4': 0.73, '5': 0.83,
  '6': 0.82, '7': 0.66, '8': 0.834, '9': 0.828, '-': 0.517, '&': 0.938, '.': 0.221, ',': 0.211, ':': 0.226,
  '#': 0.797, "'": 0.234,
};

const wordWidth = (word: string) => [...word.toUpperCase()].reduce((em, c) => em + (ADVANCE[c] ?? 0.9), 0);

/** The width in em of the title's longest word, with 8% air so user text spacing still fits. */
export function titleFit(title: string): number {
  return Math.max(...title.split(/\s+/).map(wordWidth)) * 1.08;
}
