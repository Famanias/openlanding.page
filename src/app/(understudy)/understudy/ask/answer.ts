import { FALLBACK, FAQ, type Faq } from "../content/faq";

export const tokens = (text: string) =>
  text.toLowerCase().replace(/[^a-z0-9$\s-]/g, " ").split(/\s+/).filter(Boolean).map((t) => t.replace(/^\$/, ""));

/** Score each FAQ entry by keyword hits (plural-tolerant), and return the best one, or null under one hit. */
export function match(question: string, faq: Faq[] = FAQ): Faq | null {
  const words = tokens(question);
  let best: Faq | null = null;
  let bestScore = 0;
  for (const entry of faq) {
    const score = entry.keywords.reduce((sum, k) => sum + (words.some((w) => w === k || w === `${k}s` || `${w}s` === k) ? 1 : 0), 0);
    if (score > bestScore) { best = entry; bestScore = score; }
  }
  return bestScore > 0 ? best : null;
}

export const answer = (question: string, faq: Faq[] = FAQ) => match(question, faq)?.answer ?? FALLBACK;
