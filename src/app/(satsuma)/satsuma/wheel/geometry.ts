/**
 * The reel wheel's geometry: cards sit on the inside of a cylinder, so every card's width, edge heights and
 * vertical centre come from how far its x sits from the centre. Pure maths in frame units; no DOM, no React.
 */

export type Profile = {
  /** x of the cylinder's centre line. */
  centre: number;
  /** Distance from the centre line to the silhouette's edge. Normalises every "how far out" ratio. */
  halfW: number;
  /** Even spacing of the unbent row. */
  pitch: number;
  baseW: number;
  growW: number;
  baseH: number;
  growH: number;
  /** Vertical centre of the middle card, and how far the outer cards ride up. */
  cy: number;
  cyLift: number;
  /** How hard centres are pushed outward so the growing cards keep their gap. */
  push: number;
  /** Corner radius of the rounded quad. */
  radius: number;
};

/** The 1440-wide hero frame. */
export const DESKTOP: Profile = {
  centre: 720,
  halfW: 706,
  pitch: 196,
  baseW: 170,
  growW: 48,
  baseH: 280,
  growH: 92,
  cy: 687,
  cyLift: 12,
  push: 0.083,
  radius: 15,
};

/** The 640-unit phone band. */
export const PHONE: Profile = {
  centre: 320,
  halfW: 330,
  pitch: 172,
  baseW: 150,
  growW: 40,
  baseH: 290,
  growH: 84,
  cy: 205,
  cyLift: 8,
  push: 0.083,
  radius: 18,
};

/** Edge heights grow with the 2.6 power of their own distance, so the middle stays calm and the rim leans in. */
const EDGE_EXPONENT = 2.6;

export type CardGeom = {
  index: number;
  /** Centre x after the outward push. */
  x: number;
  w: number;
  left: number;
  right: number;
  /** Heights of the left and right vertical edges. */
  hl: number;
  hr: number;
  cy: number;
  /** Normalised distance of the centre from the centre line. */
  d: number;
};

export function wrap(value: number, period: number): number {
  return ((value % period) + period) % period;
}

function widthAt(profile: Profile, d: number, bend: number): number {
  return profile.baseW + profile.growW * bend * d * d;
}

function edgeHeight(profile: Profile, edgeX: number, bend: number): number {
  const q = Math.abs(edgeX - profile.centre) / profile.halfW;
  return profile.baseH + profile.growH * bend * Math.pow(q, EDGE_EXPONENT);
}

/** x of a card whose unpushed offset from the centre line is `t`. */
export function pushedX(profile: Profile, t: number, bend = 1): number {
  const ratio = t / profile.halfW;
  return profile.centre + t * (1 + profile.push * bend * ratio * ratio);
}

/** One card at unpushed offset `t`. `bend` runs 0 (a flat row) to 1 (the full cylinder). */
export function cardAt(profile: Profile, t: number, bend = 1, index = 0): CardGeom {
  const x = pushedX(profile, t, bend);
  const d = Math.abs(x - profile.centre) / profile.halfW;
  const w = widthAt(profile, d, bend);
  const left = x - w / 2;
  const right = x + w / 2;
  return {
    index,
    x,
    w,
    left,
    right,
    hl: edgeHeight(profile, left, bend),
    hr: edgeHeight(profile, right, bend),
    cy: profile.cy - profile.cyLift * bend * d * d,
    d,
  };
}

/**
 * How many cards the loop needs so the seam (where a card wraps from one side to the other) stays off-screen.
 * Never fewer than ten, always even.
 */
export function cardCount(profile: Profile, visibleHalf: number): number {
  for (let n = 10; n < 60; n += 2) {
    const edge = n * profile.pitch / 2;
    const g = cardAt(profile, edge);
    if (g.left - profile.centre >= visibleHalf + 8) return n;
  }
  return 60;
}

/** Every card for one frame. `offset` is the row's scroll position in units; it wraps seamlessly. */
export function layoutCards(profile: Profile, offset: number, count: number, bend = 1): CardGeom[] {
  const period = count * profile.pitch;
  const cards: CardGeom[] = [];
  for (let i = 0; i < count; i++) {
    const t = wrap(i * profile.pitch + offset + period / 2, period) - period / 2;
    cards.push(cardAt(profile, t, bend, i));
  }
  return cards;
}

export type Point = { x: number; y: number };

/** The four corners of a card, clockwise from top-left. */
export function quadPoints(g: CardGeom): [Point, Point, Point, Point] {
  return [
    { x: g.left, y: g.cy - g.hl / 2 },
    { x: g.right, y: g.cy - g.hr / 2 },
    { x: g.right, y: g.cy + g.hr / 2 },
    { x: g.left, y: g.cy + g.hl / 2 },
  ];
}

/** An SVG path for a quad with every corner rounded by (at most) `radius`. Works for any convex quad. */
export function roundedQuadPath(points: readonly Point[], radius: number): string {
  const n = points.length;
  const segs: string[] = [];
  for (let i = 0; i < n; i++) {
    const prev = points[(i + n - 1) % n];
    const cur = points[i];
    const next = points[(i + 1) % n];
    const toPrev = { x: prev.x - cur.x, y: prev.y - cur.y };
    const toNext = { x: next.x - cur.x, y: next.y - cur.y };
    const lp = Math.hypot(toPrev.x, toPrev.y) || 1;
    const ln = Math.hypot(toNext.x, toNext.y) || 1;
    const r = Math.min(radius, lp / 2, ln / 2);
    const a = { x: cur.x + (toPrev.x / lp) * r, y: cur.y + (toPrev.y / lp) * r };
    const b = { x: cur.x + (toNext.x / ln) * r, y: cur.y + (toNext.y / ln) * r };
    segs.push(`${i === 0 ? "M" : "L"}${f(a.x)} ${f(a.y)}Q${f(cur.x)} ${f(cur.y)} ${f(b.x)} ${f(b.y)}`);
  }
  return `${segs.join("")}Z`;
}

function f(n: number): string {
  return (Math.round(n * 100) / 100).toString();
}

/** The 5×2 grid every card reads its own clip from. Tiles are 384×540 in a 16:9 frame. */
export const TILE_COLS = 5;
export const TILE_ROWS = 2;
export const TILE_COUNT = TILE_COLS * TILE_ROWS;
export const TILE_ASPECT = 384 / 540;

export type TileLayout = { w: number; h: number; x: number; y: number };

/** Size and offset of the shared video sheet inside a card, so that card shows tile `tile`, cover-fitted. */
export function tileLayout(tile: number, cardW: number, cardH: number): TileLayout {
  const col = tile % TILE_COLS;
  const row = Math.floor(tile / TILE_COLS) % TILE_ROWS;
  const tileH = Math.max(cardH, cardW / TILE_ASPECT);
  const tileW = tileH * TILE_ASPECT;
  // Centre the tile on the card, then move to its cell in the sheet.
  return {
    w: tileW * TILE_COLS,
    h: tileH * TILE_ROWS,
    x: (cardW - tileW) / 2 - col * tileW,
    y: (cardH - tileH) / 2 - row * tileH,
  };
}
