/** Shared 2D drawing helpers for the deep-sea creatures. */

export type Pt = { x: number; y: number };

export type Rgb = Record<
  "trench" | "navy" | "titanium" | "cyan" | "amber" | "glass" | "slate" | "mist",
  string
>;

export const TAU = Math.PI * 2;

/** "#8DA8C2" -> "141, 168, 194" */
export function toRgb(hex: string, fallback = "141, 168, 194"): string {
  const v = hex.trim().replace("#", "");
  if (v.length !== 3 && v.length !== 6) return fallback;
  const full = v.length === 3 ? [...v].map((c) => c + c).join("") : v;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return fallback;
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

export const rgba = (rgb: string, a: number) => `rgba(${rgb}, ${Math.max(0, a).toFixed(3)})`;

/** Soft additive light: bioluminescence, lure halos, rim glints. */
export function glow(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rgb: string, a: number) {
  if (a <= 0.002 || r <= 0.5) return;
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, rgba(rgb, a));
  g.addColorStop(0.35, rgba(rgb, a * 0.38));
  g.addColorStop(1, rgba(rgb, 0));
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, TAU);
  ctx.fill();
}

/** Run `fn` with additive blending, then restore. */
export function additive(ctx: CanvasRenderingContext2D, fn: () => void) {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  fn();
  ctx.restore();
}

/** Follow-the-leader chain: each link keeps `spacing` from the one before it, with a constant pull. */
export function followChain(pts: Pt[], head: Pt, spacing: number, pull: Pt = { x: 0, y: 0 }) {
  pts[0].x = head.x;
  pts[0].y = head.y;
  for (let i = 1; i < pts.length; i++) {
    let dx = pts[i].x - pts[i - 1].x + pull.x;
    let dy = pts[i].y - pts[i - 1].y + pull.y;
    const m = Math.hypot(dx, dy) || 1;
    dx = (dx / m) * spacing;
    dy = (dy / m) * spacing;
    pts[i].x = pts[i - 1].x + dx;
    pts[i].y = pts[i - 1].y + dy;
  }
}

function smoothThrough(ctx: CanvasRenderingContext2D, pts: Pt[], first: "move" | "line") {
  if (first === "move") ctx.moveTo(pts[0].x, pts[0].y);
  else ctx.lineTo(pts[0].x, pts[0].y);
  for (let i = 1; i < pts.length - 1; i++) {
    const mx = (pts[i].x + pts[i + 1].x) / 2;
    const my = (pts[i].y + pts[i + 1].y) / 2;
    ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
  }
  const last = pts[pts.length - 1];
  ctx.lineTo(last.x, last.y);
}

/** Smooth open curve through points. */
export function curvePath(ctx: CanvasRenderingContext2D, pts: Pt[]) {
  ctx.beginPath();
  smoothThrough(ctx, pts, "move");
}

/** Closed tapered ribbon along a spine: bodies, tentacles, fins. Caller fills / strokes. */
export function ribbonPath(ctx: CanvasRenderingContext2D, pts: Pt[], width: (u: number) => number) {
  const n = pts.length;
  const left: Pt[] = [];
  const right: Pt[] = [];
  for (let i = 0; i < n; i++) {
    const a = pts[Math.max(i - 1, 0)];
    const b = pts[Math.min(i + 1, n - 1)];
    let tx = b.x - a.x;
    let ty = b.y - a.y;
    const m = Math.hypot(tx, ty) || 1;
    tx /= m;
    ty /= m;
    const w = width(i / (n - 1)) / 2;
    left.push({ x: pts[i].x - ty * w, y: pts[i].y + tx * w });
    right.push({ x: pts[i].x + ty * w, y: pts[i].y - tx * w });
  }
  ctx.beginPath();
  smoothThrough(ctx, left, "move");
  smoothThrough(ctx, right.reverse(), "line");
  ctx.closePath();
}

/** Deterministic pseudo-random so speckles don't shimmer between frames. */
export function seeded(seed: number): () => number {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export type DrawState = {
  t: number;
  dt: number;
  /** Centre of the creature in viewport pixels. */
  x: number;
  y: number;
  /** 1 = nominal size. */
  scale: number;
  /** +1 swims toward screen right, -1 toward screen left. */
  facing: 1 | -1;
  /** Overall opacity from depth visibility. */
  alpha: number;
  /** Smoothed horizontal speed in px/s (signed), for trailing parts. */
  vx: number;
  /** Smoothed vertical speed in px/s (signed). */
  vy: number;
};

export type Creature = {
  id: string;
  /** Dive fraction at which it is centred. */
  center: number;
  parallax: number;
  /** Travel across the viewport, as fractions of width, over the visible window. */
  from: number;
  to: number;
  draw(ctx: CanvasRenderingContext2D, s: DrawState, c: Rgb): void;
};
