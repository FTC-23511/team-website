// Small text helpers for the Classes and Join the Team pages.

export type Part = { text: string; keep?: boolean; email?: boolean };

/**
 * Split text so seasons ("2021-22") and hyphenated words ("drop-off") can be kept on one line, and email
 * addresses can be linked. Render `keep` parts with `white-space: nowrap` and `email` parts as mailto links.
 */
export function parts(text: string): Part[] {
  const out: Part[] = [];
  const pattern = /([\w.+-]+@[\w-]+\.[\w.]+[\w])|(\b\d{4}-\d{2}\b)|(\b\w+-\w+\b)/g;
  let last = 0;
  for (const m of text.matchAll(pattern)) {
    const at = m.index ?? 0;
    if (at > last) out.push({ text: text.slice(last, at) });
    out.push(m[1] ? { text: m[0], email: true } : { text: m[0], keep: true });
    last = at + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out;
}
