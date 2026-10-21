/**
 * The magazine's geometry. Pages are numbered 1..PAGE_COUNT. Leaf k carries page 2k+1 on its front
 * (the right-hand side while the book is closed to it) and page 2k+2 on its back.
 *
 * Spread s shows the back of leaf s-1 on the left and the front of leaf s on the right,
 * so spread 0 is the cover alone and the last spread is the back cover alone.
 */
export const PAGE_COUNT = 14;
export const LEAF_COUNT = PAGE_COUNT / 2;
export const SPREAD_COUNT = LEAF_COUNT + 1;

export type SpreadPages = { left: number | null; right: number | null };
export type LeafFace = "front" | "back";
export type LeafState = "flat" | "turned";

export function clampSpread(spread: number): number {
  return Math.min(SPREAD_COUNT - 1, Math.max(0, Math.round(spread)));
}

export function spreadPages(spread: number): SpreadPages {
  const s = clampSpread(spread);
  return { left: s === 0 ? null : 2 * s, right: s === LEAF_COUNT ? null : 2 * s + 1 };
}

export function pageToSpread(page: number): number {
  const p = Math.min(PAGE_COUNT, Math.max(1, Math.round(page)));
  return p % 2 === 1 ? (p - 1) / 2 : p / 2;
}

export function leafOf(page: number): { leaf: number; face: LeafFace } {
  return { leaf: Math.floor((page - 1) / 2), face: page % 2 === 1 ? "front" : "back" };
}

/** A leaf lies flat on the right until the book has been turned past it. */
export function leafState(leaf: number, spread: number): LeafState {
  return leaf < spread ? "turned" : "flat";
}

/** `#p14` opens the spread that holds page 14. Returns null for any other hash. */
export function parsePageHash(hash: string): number | null {
  const match = /^#p(\d{1,2})$/.exec(hash);
  if (!match) return null;
  const page = Number(match[1]);
  return page >= 1 && page <= PAGE_COUNT ? pageToSpread(page) : null;
}

export function spreadHash(spread: number): string {
  const { left, right } = spreadPages(spread);
  return `#p${left ?? right}`;
}

const pad2 = (n: number) => String(n).padStart(2, "0");

/** The folio line printed under the book, e.g. "P. 04–05 / 14". */
export function folio(spread: number): string {
  const { left, right } = spreadPages(spread);
  const pages = left !== null && right !== null ? `${pad2(left)}–${pad2(right)}` : pad2((left ?? right) as number);
  return `P. ${pages} / ${PAGE_COUNT}`;
}
