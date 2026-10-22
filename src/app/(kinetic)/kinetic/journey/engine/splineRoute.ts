import { ROAD_END, ROAD_START, curvatureAt, elevationAt } from "../story";

/**
 * The road centerline, integrated once from the curvature program in
 * story.ts and cached as an arc-length lookup table (1 sample per meter).
 *
 * Heading 0 drives toward -Z; positive heading turns right (toward +X).
 * forward = (sin h, 0, -cos h), right = (cos h, 0, sin h).
 */

export type RouteFrame = {
  x: number;
  y: number;
  z: number;
  heading: number;
  /** Horizontal forward. */
  fx: number;
  fz: number;
  /** Horizontal right. */
  rx: number;
  rz: number;
  /** Road grade (dy/ds). */
  grade: number;
};

export function createFrame(): RouteFrame {
  return { x: 0, y: 0, z: 0, heading: 0, fx: 0, fz: -1, rx: 1, rz: 0, grade: 0 };
}

/** Samples are cached from here to well past the road end so terrain can extend. */
const LUT_START = ROAD_START - 60;
const LUT_END = ROAD_END + 260;

export class Route {
  readonly start = LUT_START;
  readonly end = LUT_END;
  private readonly xs: Float64Array;
  private readonly zs: Float64Array;
  private readonly hs: Float64Array;

  constructor() {
    const n = LUT_END - LUT_START + 1;
    this.xs = new Float64Array(n);
    this.zs = new Float64Array(n);
    this.hs = new Float64Array(n);

    // Integrate forward from s = 0 (origin at world 0,0) and backward to
    // LUT_START, in half-meter steps (midpoint rule) for accuracy.
    const i0 = -LUT_START;
    this.xs[i0] = 0;
    this.zs[i0] = 0;
    this.hs[i0] = 0;
    let x = 0;
    let z = 0;
    let h = 0;
    for (let i = i0 + 1; i < n; i++) {
      const s0 = i - 1 + LUT_START;
      for (let k = 0; k < 2; k++) {
        const sm = s0 + k * 0.5 + 0.25;
        const hm = h + curvatureAt(sm) * 0.25;
        x += Math.sin(hm) * 0.5;
        z -= Math.cos(hm) * 0.5;
        h += curvatureAt(sm) * 0.5;
      }
      this.xs[i] = x;
      this.zs[i] = z;
      this.hs[i] = h;
    }
    x = 0;
    z = 0;
    h = 0;
    for (let i = i0 - 1; i >= 0; i--) {
      const s0 = i + 1 + LUT_START;
      for (let k = 0; k < 2; k++) {
        const sm = s0 - k * 0.5 - 0.25;
        const hm = h - curvatureAt(sm) * 0.25;
        x -= Math.sin(hm) * 0.5;
        z += Math.cos(hm) * 0.5;
        h -= curvatureAt(sm) * 0.5;
      }
      this.xs[i] = x;
      this.zs[i] = z;
      this.hs[i] = h;
    }
  }

  /** Road frame at distance s (clamped to the cached range). */
  sample(sIn: number, out: RouteFrame): RouteFrame {
    const s = Math.max(LUT_START, Math.min(LUT_END - 0.0001, sIn));
    const f = s - LUT_START;
    const i = Math.floor(f);
    const t = f - i;
    const x = this.xs[i] + (this.xs[i + 1] - this.xs[i]) * t;
    const z = this.zs[i] + (this.zs[i + 1] - this.zs[i]) * t;
    const h = this.hs[i] + (this.hs[i + 1] - this.hs[i]) * t;
    // Past the cached range the road continues straight.
    const over = sIn - s;
    const sh = Math.sin(h);
    const ch = Math.cos(h);
    out.x = x + sh * over;
    out.z = z - ch * over;
    out.heading = h;
    out.fx = sh;
    out.fz = -ch;
    out.rx = ch;
    out.rz = sh;
    out.y = elevationAt(sIn);
    out.grade = (elevationAt(sIn + 1) - elevationAt(sIn - 1)) / 2;
    return out;
  }

  /** World position of a point `lat` meters right of the centerline, `up` above the road. */
  point(s: number, lat: number, up: number, frame: RouteFrame): { x: number; y: number; z: number } {
    this.sample(s, frame);
    return { x: frame.x + frame.rx * lat, y: frame.y + up, z: frame.z + frame.rz * lat };
  }
}
