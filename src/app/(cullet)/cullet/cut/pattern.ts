import { clamp, easeInCubic, easeOutBack, range } from "../motion/math";
import { bounds, centroid, insetPolygon, roundedPath, type Pt } from "./geometry";

/**
 * The cut: how the slab of frosted quartz is cleaved. Normalised to the region it lives in
 * (x right, y down, both 0..1). Six edge points and six interior junctions make eight convex
 * shards; the nav is three slanted shards. Every point drifts slowly and gives way to the pointer.
 */
type CutPoint = { x: number; y: number; moveX: boolean; moveY: boolean; px: number; py: number; phase: number };

export const CUT_POINTS = {
  t1: { x: 0.27, y: 0, moveX: true, moveY: false, px: 13.2, py: 15.0, phase: 0.3 },
  t2: { x: 0.68, y: 0, moveX: true, moveY: false, px: 16.8, py: 12.1, phase: 1.7 },
  r1: { x: 1, y: 0.48, moveX: false, moveY: true, px: 14.5, py: 13.8, phase: 2.5 },
  b1: { x: 0.44, y: 1, moveX: true, moveY: false, px: 17.9, py: 14.4, phase: 3.6 },
  l1: { x: 0, y: 0.36, moveX: false, moveY: true, px: 12.6, py: 16.2, phase: 4.2 },
  l2: { x: 0, y: 0.78, moveX: false, moveY: true, px: 15.7, py: 18.1, phase: 5.4 },
  J1: { x: 0.34, y: 0.28, moveX: true, moveY: true, px: 11.9, py: 14.7, phase: 0.8 },
  J2: { x: 0.62, y: 0.24, moveX: true, moveY: true, px: 15.4, py: 12.9, phase: 2.1 },
  J3: { x: 0.81, y: 0.41, moveX: true, moveY: true, px: 13.6, py: 16.5, phase: 3.3 },
  J4: { x: 0.26, y: 0.57, moveX: true, moveY: true, px: 18.2, py: 13.4, phase: 4.5 },
  J5: { x: 0.51, y: 0.61, moveX: true, moveY: true, px: 14.1, py: 17.2, phase: 1.4 },
  J6: { x: 0.72, y: 0.69, moveX: true, moveY: true, px: 16.3, py: 15.1, phase: 5.9 },
} satisfies Record<string, CutPoint>;

export type CutKey = keyof typeof CUT_POINTS;

/** Drift amplitude in region units; zero freezes the cut. */
export const DRIFT = 0.017;

/** Where every cut point is at `time` seconds, pushed away from a pointer (in region units) within 0.48. */
export function livePoints(time: number, drift = DRIFT, pointer: Pt | null = null): Record<CutKey, Pt> {
  const out = {} as Record<CutKey, Pt>;
  for (const key of Object.keys(CUT_POINTS) as CutKey[]) {
    const bp: CutPoint = CUT_POINTS[key];
    let x = bp.x, y = bp.y;
    if (bp.moveX) x += Math.sin((time * Math.PI * 2) / bp.px + bp.phase) * drift;
    if (bp.moveY) y += Math.cos((time * Math.PI * 2) / bp.py + bp.phase * 1.3) * drift;
    if (pointer) {
      const dx = x - pointer.x, dy = y - pointer.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 0.001 && dist < 0.48) {
        const t = 1 - dist / 0.48;
        const push = t * t * 0.028;
        if (bp.moveX) x += (dx / dist) * push;
        if (bp.moveY) y += (dy / dist) * push;
      }
    }
    out[key] = { x, y };
  }
  return out;
}

/** The eight panel shards, in reading order of what they carry. */
export function cellPolys(p: Record<CutKey, Pt>): Pt[][] {
  const TL = { x: 0, y: 0 }, TR = { x: 1, y: 0 }, BR = { x: 1, y: 1 }, BL = { x: 0, y: 1 };
  const { t1, t2, r1, b1, l1, l2, J1, J2, J3, J4, J5, J6 } = p;
  return [
    [TL, t1, J1, l1], // the crown: "Designed"
    [t1, t2, J2, J1], // the top wedge
    [t2, TR, r1, J3, J2], // the spire
    [l1, J1, J4, l2], // the shear blade: "in glass." and the copy
    [J1, J2, J5, J4], // the core gem
    [J2, J3, J6, J5], // the second gem
    [l2, J4, J5, b1, BL], // the anchor: the CTAs
    [b1, J5, J6, J3, r1, BR], // the base slab
  ];
}

/** The nav: brand | links | sign in, split by two slanted cuts that sway a little. */
export function navPolys(time: number, portrait: boolean, sway = 0.007): Pt[][] {
  const a = Math.sin(time * 0.48) * sway;
  const b = Math.cos(time * 0.39 + 1.2) * sway;
  const s1Top = (portrait ? 0.3 : 0.25) + a, s1Bot = (portrait ? 0.33 : 0.29) + a;
  const s2Top = (portrait ? 0.78 : 0.79) + b, s2Bot = (portrait ? 0.74 : 0.75) + b;
  return [
    [{ x: 0, y: 0 }, { x: s1Top, y: 0 }, { x: s1Bot, y: 1 }, { x: 0, y: 1 }],
    [{ x: s1Top, y: 0 }, { x: s2Top, y: 0 }, { x: s2Bot, y: 1 }, { x: s1Bot, y: 1 }],
    [{ x: s2Top, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: s2Bot, y: 1 }],
  ];
}

/** The scale of the slab against the 1730px-wide reference it was cut at. */
export const scaleFor = (slabW: number) => slabW / 1730;

/** Gap between shards, corner radius, glass depth and bevel, all in px for a slab scale `s`. */
export const glassMetrics = (s: number) => ({ gap: 14 * s, radius: 20 * s, depth: 14 * s, bevel: 3 * s });

/** Nav band height and the gap under it for a slab of `w × h`. */
export function slabBands(w: number, h: number) {
  const s = scaleFor(w);
  const nav = Math.max(48, h * 0.108);
  const gap = Math.max(8, 14 * s);
  return { s, nav, gap, panel: Math.max(240, h - nav - gap) };
}

export type PosterShard = {
  /** path in the shard's own box */ d: string;
  x: number; y: number; w: number; h: number;
  /** unit vector from the slab's centre through the shard's centre (y down) */ out: Pt;
  index: number;
};

/** The shards as SVG boxes in slab pixels (y down): the poster the page shows before, or instead of, WebGL. */
export function posterShards(w: number, h: number, portrait = h > w * 1.08): PosterShard[] {
  const { s, nav, gap, panel } = slabBands(w, h);
  const { gap: cut, radius } = glassMetrics(s);
  const regions = [
    ...navPolys(0, portrait, 0).map((poly) => ({ poly, top: 0, height: nav })),
    ...cellPolys(livePoints(0, 0)).map((poly) => ({ poly, top: nav + gap, height: panel })),
  ];
  return regions.map(({ poly, top, height }, index) => {
    const px = insetPolygon(poly.map((p) => ({ x: p.x * w, y: top + p.y * height })), cut / 2);
    const b = bounds(px);
    const c = centroid(px);
    const ox = c.x - w / 2, oy = c.y - h / 2;
    const len = Math.hypot(ox / (w / 2), oy / (h / 2));
    const out = len < 0.1 ? { x: 0.15, y: 0.3 } : { x: ox / (w / 2) / len, y: oy / (h / 2) / len };
    return { d: roundedPath(px, radius, b.x, b.y), x: b.x, y: b.y, w: b.w, h: b.h, out, index };
  });
}

/** How far shard `index` (of 11) has flown for a scroll cleave `c` (0..1): staggered from the nav down. */
export function cleaveFactor(c: number, index: number): number {
  return easeInCubic(range(clamp(c), index * 0.035, index * 0.035 + 0.62));
}

/** How far shard `index` has flown `elapsed` seconds into a timed shatter (`out`) or reassembly. */
export function shatterFactor(elapsed: number, index: number, dir: "out" | "in"): number {
  const p = clamp((elapsed - (dir === "in" ? 0.12 : 0) - index * 0.03) / 0.72);
  return dir === "out" ? easeInCubic(p) : 1 - easeOutBack(p);
}

/** The flight of a shard at factor `f`: out along its direction, toward the viewer, and (when timed) falling. */
export function flight(f: number, out: Pt, s: number, zImpulse: number, gravity = true) {
  return {
    x: out.x * 520 * s * f,
    y: out.y * 520 * s * f + (gravity ? 640 * s * f * f : 0),
    z: zImpulse * s * f,
  };
}
