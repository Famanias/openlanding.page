/**
 * The vessel is a lathe profile: five control radii at fixed heights, joined by a
 * Catmull-Rom spline and spun around the vertical axis. Everything the page shows
 * (SVG silhouette, 3D lathe, spec readout, collection cards) comes from this one function.
 */
export type VesselParams = {
  /** 0..1, maps to MIN_HEIGHT_CM..MAX_HEIGHT_CM */
  height: number;
  /** radii, 0..1, where 1 is MAX_RADIUS_CM */
  foot: number;
  belly: number;
  neck: number;
  lip: number;
};

export type ParamKey = keyof VesselParams;
export type ProfilePoint = { r: number; y: number };

export const MIN_HEIGHT_CM = 12;
export const MAX_HEIGHT_CM = 38;
export const MAX_RADIUS_CM = 11;
export const WALL_CM = 0.55;

export const PARAM_LIMITS: Record<ParamKey, { min: number; max: number }> = {
  height: { min: 0, max: 1 },
  foot: { min: 0.22, max: 0.6 },
  belly: { min: 0.4, max: 1 },
  neck: { min: 0.16, max: 0.8 },
  lip: { min: 0.18, max: 0.95 },
};

/** Heights of the control points as a fraction of the vessel height. */
const CONTROL_HEIGHTS = [0, 0.38, 0.68, 0.87, 1] as const;
/** Foot, belly, shoulder, neck, lip; the editor places its handles here. */
export const CONTROL_FRACTIONS = CONTROL_HEIGHTS;

export function clampParam(key: ParamKey, value: number): number {
  const { min, max } = PARAM_LIMITS[key];
  return Math.min(max, Math.max(min, value));
}

export function heightCm(params: VesselParams): number {
  return MIN_HEIGHT_CM + (MAX_HEIGHT_CM - MIN_HEIGHT_CM) * params.height;
}

function controlRadii(p: VesselParams): number[] {
  const shoulder = p.belly + (p.neck - p.belly) * 0.55;
  return [p.foot, p.belly, shoulder, p.neck, p.lip];
}

/** Uniform Catmull-Rom through the control points, with endpoints duplicated. */
function catmull(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const t2 = t * t;
  const t3 = t2 * t;
  return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 + (-p0 + 3 * p1 - 3 * p2 + p3) * t3);
}

/** Outer wall from foot (y=0) up to lip (y=1), `samples` points, y strictly increasing. */
export function sampleProfile(params: VesselParams, samples = 40): ProfilePoint[] {
  if (samples < 2) throw new RangeError("sampleProfile needs at least 2 samples");
  const radii = controlRadii(params);
  const last = radii.length - 1;
  const points: ProfilePoint[] = [];
  for (let i = 0; i < samples; i++) {
    const u = i / (samples - 1);
    const y = u;
    let seg = 0;
    while (seg < last - 1 && y > CONTROL_HEIGHTS[seg + 1]) seg++;
    const y0 = CONTROL_HEIGHTS[seg];
    const y1 = CONTROL_HEIGHTS[seg + 1];
    const t = (y - y0) / (y1 - y0);
    const r0 = radii[Math.max(0, seg - 1)];
    const r1 = radii[seg];
    const r2 = radii[seg + 1];
    const r3 = radii[Math.min(last, seg + 2)];
    const r = Math.max(0.05, catmull(r0, r1, r2, r3, t));
    points.push({ r, y });
  }
  return points;
}

/** Interior volume in millilitres, integrating πr² over the inner wall. */
export function volumeMl(params: VesselParams, samples = 80): number {
  const h = heightCm(params);
  const profile = sampleProfile(params, samples);
  let cm3 = 0;
  for (let i = 1; i < profile.length; i++) {
    const innerR = Math.max(0, ((profile[i].r + profile[i - 1].r) / 2) * MAX_RADIUS_CM - WALL_CM);
    const dy = (profile[i].y - profile[i - 1].y) * h;
    cm3 += Math.PI * innerR * innerR * dy;
  }
  return Math.round(cm3);
}

export type VesselSpec = { heightCm: number; widthCm: number; volumeMl: number };

export function specOf(params: VesselParams): VesselSpec {
  const widest = Math.max(...sampleProfile(params, 60).map((p) => p.r));
  return {
    heightCm: Math.round(heightCm(params) * 10) / 10,
    widthCm: Math.round(widest * MAX_RADIUS_CM * 2 * 10) / 10,
    volumeMl: volumeMl(params),
  };
}

/** The unworked lump on the wheel at scroll progress 0. */
export const LUMP: VesselParams = { height: 0.04, foot: 0.58, belly: 0.62, neck: 0.5, lip: 0.34 };

/** Blend lump → target. Progress is the already-eased 0..1 value. */
export function throwParams(target: VesselParams, t: number): VesselParams {
  const c = Math.min(1, Math.max(0, t));
  const mix = (a: number, b: number) => a * (1 - c) + b * c;
  return {
    height: mix(LUMP.height, target.height),
    foot: mix(LUMP.foot, target.foot),
    belly: mix(LUMP.belly, target.belly),
    neck: mix(LUMP.neck, target.neck),
    lip: mix(LUMP.lip, target.lip),
  };
}
