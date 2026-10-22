/**
 * The delivery journey as data: where things are on the road, which page
 * section maps to which point of the trip, how the camera frames each stop,
 * and how light/weather change along the way.
 *
 * DOM-free and Three.js-free so it can be unit tested. The engine (./engine)
 * consumes these tables; the page only exposes `data-journey-stop` anchors.
 *
 * Units: meters along the road (`s`). s = 0 is the origin DC gate area.
 */

/* ------------------------------------------------------------------ */
/* Road layout                                                         */
/* ------------------------------------------------------------------ */

/** First and last meter of paved road that gets built. */
export const ROAD_START = -120;
export const ROAD_END = 1326;

/** Landmarks, in meters along the road. */
export const LANDMARKS = {
  /** Origin yard: the truck idles here on the hero. */
  originYardEnd: 40,
  gate: 26,
  /** Mississippi River crossing. */
  bridgeFrom: 322,
  bridgeTo: 378,
  river: 350,
  cityFrom: 520,
  cityTo: 860,
  overpass: 612,
  checkpoint: 712,
  forestFrom: 840,
  tunnelFrom: 988,
  tunnelTo: 1072,
  destinationYard: 1188,
  /** Where the truck parks at the destination dock. */
  arrival: 1300,
  dockFront: 1318,
} as const;

/** Lateral offset (m) of the right-lane center. */
export const LANE_OFFSET = 1.95;

/**
 * Signed road curvature (rad/m, + turns right) as a list of arcs. Each arc
 * blends in/out over CURVE_BLEND meters so heading has no kinks.
 */
const CURVES: ReadonlyArray<readonly [from: number, to: number, k: number]> = [
  [70, 150, 1 / 260],
  [150, 212, -1 / 210],
  [400, 480, -1 / 300],
  [480, 560, 1 / 290],
  [640, 690, 1 / 420],
  [742, 830, -1 / 250],
  [830, 905, 1 / 300],
  [1080, 1165, -1 / 340],
];
const CURVE_BLEND = 12;

/** Elevation keys (s, meters). Smoothly interpolated. */
const ELEVATION: ReadonlyArray<readonly [number, number]> = [
  [ROAD_START, 0],
  [60, 0],
  [128, 3.2],
  [200, -1.2],
  [262, 1.0],
  [300, 0],
  [400, 0],
  [452, 3.6],
  [516, 1.2],
  [575, 0],
  [770, 0],
  [822, 2.6],
  [884, -0.8],
  [960, 0],
  [1090, 0],
  [1128, 1.6],
  [1170, 0],
  [ROAD_END + 200, 0],
];

export function clamp(n: number, lo: number, hi: number): number {
  return n < lo ? lo : n > hi ? hi : n;
}

export function clamp01(n: number): number {
  if (Number.isNaN(n)) return 0;
  return clamp(n, 0, 1);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function smoothstep(e0: number, e1: number, x: number): number {
  const t = clamp01((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
}

export function smootherstep(t: number): number {
  const x = clamp01(t);
  return x * x * x * (x * (x * 6 - 15) + 10);
}

/** Frame-rate independent exponential smoothing factor for a rate in 1/s. */
export function damp(rate: number, dt: number): number {
  return 1 - Math.exp(-rate * Math.max(0, dt));
}

export function curvatureAt(s: number): number {
  let k = 0;
  for (const [from, to, kk] of CURVES) {
    const w =
      smoothstep(from - CURVE_BLEND, from + CURVE_BLEND, s) -
      smoothstep(to - CURVE_BLEND, to + CURVE_BLEND, s);
    k += kk * w;
  }
  return k;
}

export function elevationAt(s: number): number {
  const keys = ELEVATION;
  if (s <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [s1, y1] = keys[i];
    if (s <= s1) {
      const [s0, y0] = keys[i - 1];
      return lerp(y0, y1, smoothstep(s0, s1, s));
    }
  }
  return keys[keys.length - 1][1];
}

/** Lateral lane position of the truck: centered in yards, right lane on the highway. */
export function laneAt(s: number): number {
  return LANE_OFFSET * (smoothstep(40, 72, s) - smoothstep(1186, 1222, s));
}

/* ------------------------------------------------------------------ */
/* Camera shots                                                         */
/* ------------------------------------------------------------------ */

/**
 * A camera placement relative to the truck's road frame.
 * f = forward (+ ahead of the truck), u = up, r = right of travel.
 * The camera looks at (lf, lu) on the truck's centerline.
 * frame = where the look point lands on screen (0..1, y from top), per
 * layout: wide (landscape) and tall (portrait phones).
 */
export type Shot = {
  f: number;
  u: number;
  r: number;
  lf: number;
  lu: number;
  fov: number;
  frame: readonly [x: number, y: number];
  frameTall: readonly [x: number, y: number];
};

/** Hero establishing shot: close-up low 3/4 view of the truck (zero bird's eye view). */
export const INTRO_SHOT: Shot = {
  f: 15,
  u: 2.6,
  r: -9,
  lf: -0.5,
  lu: 1.9,
  fov: 34,
  frame: [0.72, 0.6],
  frameTall: [0.56, 0.8],
};

/* ------------------------------------------------------------------ */
/* Stops: presentation beats <-> points on the road                     */
/* ------------------------------------------------------------------ */

export type StopId =
  | "depart"
  | "prepare"
  | "truck"
  | "driver"
  | "paperwork"
  | "workspace"
  | "roles"
  | "closeout"
  | "arrive";

export type Stop = {
  id: StopId;
  /** Road distance the truck holds at while this beat is on screen. */
  s: number;
  shot: Shot;
};

/**
 * Every beat of the presentation, in page order. Several beats may share
 * a road position (the truck pauses while the camera reframes), so the
 * camera blends by story position, not by distance.
 */
export const STOPS: readonly Stop[] = [
  // 01 Depart: low 3/4 front at the origin gate, truck right of the headline.
  { id: "depart", s: 46, shot: { f: 15, u: 2.6, r: -9, lf: -0.5, lu: 1.9, fov: 34, frame: [0.72, 0.6], frameTall: [0.56, 0.8] } },
  // 02 Prepare: wide aerial of the yard, road leading out.
  { id: "prepare", s: 52, shot: { f: -24, u: 16, r: -18, lf: 5, lu: 0, fov: 38, frame: [0.72, 0.6], frameTall: [0.5, 0.9] } },
  // 03a Truck record: roadside, low and close along the truck's flank.
  { id: "truck", s: 250, shot: { f: 1.5, u: 2.3, r: -14.5, lf: 0.4, lu: 1.8, fov: 40, frame: [0.7, 0.6], frameTall: [0.5, 0.82] } },
  // 03b Driver: over the cab on the bridge.
  { id: "driver", s: 352, shot: { f: 13, u: 5.5, r: -3, lf: 1, lu: 2, fov: 34, frame: [0.3, 0.73], frameTall: [0.5, 0.84] } },
  // 03c Load paperwork: head-on past the weigh station.
  { id: "paperwork", s: 716, shot: { f: 15, u: 3.2, r: 8, lf: -3, lu: 2.2, fov: 36, frame: [0.66, 0.62], frameTall: [0.5, 0.8] } },
  // 04a Workspace: the camera widens over the city at dusk.
  { id: "workspace", s: 790, shot: { f: -26, u: 30, r: 22, lf: 5, lu: 0, fov: 36, frame: [0.83, 0.58], frameTall: [0.5, 0.88] } },
  // 04b Roles: same aerial idea, now in the storm.
  { id: "roles", s: 900, shot: { f: -16, u: 32, r: -14, lf: 4, lu: 0, fov: 36, frame: [0.83, 0.6], frameTall: [0.5, 0.88] } },
  // 05a Closeout: docked, side-rear view toward the lit door.
  { id: "closeout", s: LANDMARKS.arrival, shot: { f: 1.5, u: 2.4, r: -14, lf: 1.5, lu: 2, fov: 34, frame: [0.7, 0.62], frameTall: [0.5, 0.84] } },
  // 05b Arrive: crane up behind the truck, CTA above it.
  { id: "arrive", s: LANDMARKS.arrival, shot: { f: -9, u: 22, r: 6, lf: 4, lu: 0, fov: 40, frame: [0.5, 0.76], frameTall: [0.5, 0.8] } },
];

export const STOP_INDEX: Record<StopId, number> = Object.fromEntries(
  STOPS.map((stop, i) => [stop.id, i]),
) as Record<StopId, number>;

export function stopDistance(id: StopId): number {
  return STOPS[STOP_INDEX[id]].s;
}

/** First and last road position of the told journey. */
export const TRIP_START = STOPS[0].s;
export const TRIP_END = STOPS[STOPS.length - 1].s;

/**
 * Scroll range a chapter owns and the beats (stops) it presents, in order.
 * For a pinned chapter, `start`..`end` is the range its stage stays stuck
 * to the viewport.
 */
export type ChapterRange = { stops: readonly StopId[]; start: number; end: number };

/** Parallel arrays: scroll position -> road distance and story index. */
export type StoryMap = { ys: number[]; ss: number[]; ps: number[] };

/** Share of each beat's slot the scene holds still before moving on. */
export const HOLD_SHARE = 0.62;

/**
 * Build the scroll -> story map. Inside a chapter every beat gets an equal
 * slot: the scene holds for the first part of it (reading time) and moves
 * toward the next beat in the rest. Between chapters (while the next stage
 * scrolls in) the truck drives on to the next chapter's first beat, so each
 * chapter opens on a settled scene.
 */
export function buildStoryMap(chapters: readonly ChapterRange[]): StoryMap {
  const ys: number[] = [];
  const ss: number[] = [];
  const ps: number[] = [];
  const push = (yIn: number, id: StopId) => {
    const i = STOP_INDEX[id];
    let y = yIn;
    if (ys.length && y <= ys[ys.length - 1]) {
      // Collapsed range: never let the map run backwards.
      if (ps[ps.length - 1] > i) return;
      y = ys[ys.length - 1] + 0.001;
    }
    ys.push(y);
    ss.push(STOPS[i].s);
    ps.push(i);
  };
  for (const chapter of chapters) {
    const k = chapter.stops.length;
    const slot = Math.max(0, chapter.end - chapter.start) / Math.max(1, k);
    chapter.stops.forEach((id, j) => {
      const from = chapter.start + slot * j;
      push(from, id);
      push(from + slot * HOLD_SHARE, id);
    });
  }
  if (ys.length === 0) {
    ys.push(0);
    ss.push(STOPS[0].s);
    ps.push(0);
  }
  return { ys, ss, ps };
}

function sampleMap(ys: number[], values: number[], y: number): number {
  if (y <= ys[0]) return values[0];
  for (let i = 1; i < ys.length; i++) {
    if (y <= ys[i]) {
      const t = (y - ys[i - 1]) / (ys[i] - ys[i - 1]);
      return lerp(values[i - 1], values[i], t);
    }
  }
  return values[values.length - 1];
}

/** Road distance the truck should reach at this scroll position. */
export function distanceForScroll(map: StoryMap, scrollY: number): number {
  return sampleMap(map.ys, map.ss, scrollY);
}

/** Story position: stop index, fractional while moving between beats. */
export function storyIndexForScroll(map: StoryMap, scrollY: number): number {
  return sampleMap(map.ys, map.ps, scrollY);
}

/** Scroll position where a beat's hold begins (for chapter and beat links). */
export function scrollForStop(map: StoryMap, id: StopId): number | null {
  const i = map.ps.indexOf(STOP_INDEX[id]);
  return i < 0 ? null : map.ys[i];
}

export type ShotBlend = { a: Shot; b: Shot; t: number };

/** Bracketing shots for a story position; eases across each transition. */
export function shotBlendAt(p: number): ShotBlend {
  const last = STOPS.length - 1;
  if (last === 0) return { a: STOPS[0].shot, b: STOPS[0].shot, t: 0 };
  const q = clamp(p, 0, last);
  const i = Math.min(last - 1, Math.floor(q));
  return { a: STOPS[i].shot, b: STOPS[i + 1].shot, t: smootherstep(q - i) };
}

/* ------------------------------------------------------------------ */
/* Truck dynamics                                                       */
/* ------------------------------------------------------------------ */

export type TruckMotion = {
  /** Road distance (m). */
  s: number;
  /** Speed along the road (m/s), negative when reversing. */
  v: number;
  /** Longitudinal acceleration (m/s^2). */
  a: number;
};

/** Normal highway cruise speed: 18 m/s (~65 km/h = 40.38 mph). Constant across all slides. */
export const CRUISE_SPEED = 18;
const ACCEL = 6.0;
const BRAKE = 12.0;
/** Ceiling capped to CRUISE_SPEED so truck never accelerates beyond 65 km/h. */
export const MAX_CATCH_UP = 18;
/** Extra braking (m/s^2) per m/s of speed. */
const BRAKE_SPEED_FACTOR = 0.5;

/**
 * Advance the truck toward `target` at a constant 65 km/h (18 m/s):
 * When moving between slides (dist > 25), smoothly glide position to the target
 * with steady 65 km/h velocity, eliminating any speed surges from 65 to 120 km/h.
 * Smoothly decelerates to 0 as it docks on the landmark stop.
 */
export function stepTruck(m: TruckMotion, target: number, dtIn: number): void {
  const dt = clamp(dtIn, 0, 0.05);
  if (dt === 0) return;
  const lag = target - m.s;
  const dist = Math.abs(lag);

  if (dist < 0.04) {
    m.s = target;
    m.v = 0;
    m.a = 0;
    return;
  }

  if (dist > 25) {
    // Transitioning between slides/landmarks: smoothly glide position toward target
    // while keeping truck speed locked to constant 65 km/h (18 m/s).
    const easeRate = 2.4;
    m.s += (target - m.s) * Math.min(1, easeRate * dt);
    m.v = Math.sign(lag) * CRUISE_SPEED;
    m.a = 0;
    return;
  }

  // Smooth brake into landmark / dock
  const vStop = Math.sqrt(2 * BRAKE * dist);
  const vDesired = Math.sign(lag) * Math.min(CRUISE_SPEED, vStop, dist * 2.0);
  const a = clamp((vDesired - m.v) * 6, -BRAKE, ACCEL);
  m.v += a * dt;
  m.s += m.v * dt;
  m.a = a;

  if (Math.abs(target - m.s) < 0.02 && Math.abs(m.v) < 0.15) {
    m.s = target;
    m.v = 0;
    m.a = 0;
  }
}

/* ------------------------------------------------------------------ */
/* Environment: time of day + weather                                   */
/* ------------------------------------------------------------------ */

export type EnvKey = {
  s: number;
  skyTop: number;
  horizon: number;
  sun: number;
  sunIntensity: number;
  /** Sun elevation / azimuth in degrees (azimuth 0 = along -Z, + toward +X). */
  sunElevation: number;
  sunAzimuth: number;
  hemiSky: number;
  hemiGround: number;
  hemiIntensity: number;
  fogNear: number;
  fogFar: number;
  /** 0 = daylight, 1 = full night (lamps, headlights, windows). */
  night: number;
  rain: number;
  clouds: number;
  stars: number;
  exposure: number;
};

const day = (k: Partial<EnvKey> & { s: number }): EnvKey => ({
  skyTop: 0x4f8fd0,
  horizon: 0xdcebf3,
  sun: 0xfff1dc,
  sunIntensity: 3.1,
  sunElevation: 38,
  sunAzimuth: 130,
  hemiSky: 0xcfe2f2,
  hemiGround: 0x8a7a62,
  hemiIntensity: 1.15,
  fogNear: 60,
  fogFar: 620,
  night: 0,
  rain: 0,
  clouds: 0.45,
  stars: 0,
  exposure: 1,
  ...k,
});

/** Light appearance: dawn departure, day, golden hour, storm night, sunrise arrival. */
export const ENV_LIGHT: readonly EnvKey[] = [
  day({ s: -60, skyTop: 0x6c9cd0, horizon: 0xf7d6b6, sun: 0xffbe86, sunIntensity: 2.7, sunElevation: 9, sunAzimuth: 150, hemiSky: 0xd9e4f0, hemiGround: 0x7d6a58, hemiIntensity: 1.05, fogNear: 50, fogFar: 520, night: 0.18, clouds: 0.35 }),
  day({ s: 40, skyTop: 0x6a9bd0, horizon: 0xf5d9bd, sun: 0xffc690, sunIntensity: 2.8, sunElevation: 12, sunAzimuth: 145, night: 0.1, clouds: 0.38 }),
  day({ s: 172, sunElevation: 34, sunAzimuth: 128 }),
  day({ s: 548, skyTop: 0x5a8ac2, horizon: 0xe9e4d9, sun: 0xfff0d6, sunElevation: 26, sunAzimuth: 110, clouds: 0.5 }),
  day({ s: 700, skyTop: 0x5a6c9f, horizon: 0xf4b27e, sun: 0xffa45c, sunIntensity: 2.9, sunElevation: 7, sunAzimuth: 20, hemiSky: 0xe8cdb4, hemiGround: 0x6d5846, fogFar: 560, night: 0.32, clouds: 0.55, exposure: 1.02 }),
  day({ s: 800, skyTop: 0x3f4c68, horizon: 0x9b8f93, sun: 0xd8a27e, sunIntensity: 1.3, sunElevation: 4, sunAzimuth: 10, hemiSky: 0x9aa6b8, hemiGround: 0x4a4540, hemiIntensity: 0.85, fogNear: 30, fogFar: 380, night: 0.62, rain: 0.35, clouds: 0.9 }),
  day({ s: 884, skyTop: 0x283241, horizon: 0x5f6a79, sun: 0x9fb0c6, sunIntensity: 0.55, sunElevation: 35, sunAzimuth: 60, hemiSky: 0x7f8ea2, hemiGround: 0x2e2f33, hemiIntensity: 0.5, fogNear: 18, fogFar: 260, night: 0.88, rain: 1, clouds: 1, exposure: 1 }),
  day({ s: 1032, skyTop: 0x141c28, horizon: 0x303b4b, sun: 0x8595ad, sunIntensity: 0.3, sunElevation: 40, sunAzimuth: 60, hemiSky: 0x566579, hemiGround: 0x1d1f23, hemiIntensity: 0.38, fogNear: 16, fogFar: 230, night: 1, rain: 1, clouds: 1, exposure: 1.05 }),
  day({ s: 1150, skyTop: 0x33507c, horizon: 0xc99c86, sun: 0xffa874, sunIntensity: 1.2, sunElevation: 2, sunAzimuth: 175, hemiSky: 0xa4b0c4, hemiGround: 0x4b4540, hemiIntensity: 0.8, fogNear: 30, fogFar: 420, night: 0.7, rain: 0.15, clouds: 0.55, stars: 0.2, exposure: 1.08 }),
  day({ s: LANDMARKS.arrival, skyTop: 0x6b98cc, horizon: 0xf8cfab, sun: 0xffc088, sunIntensity: 2.6, sunElevation: 8, sunAzimuth: 170, hemiSky: 0xd6e0ec, hemiGround: 0x7a6756, hemiIntensity: 1.05, fogNear: 50, fogFar: 520, night: 0.4, rain: 0, clouds: 0.3 }),
];

const night = (k: Partial<EnvKey> & { s: number }): EnvKey => ({
  skyTop: 0x050b15,
  horizon: 0x1a2a40,
  sun: 0x9db6da,
  sunIntensity: 0.85,
  sunElevation: 32,
  sunAzimuth: 140,
  hemiSky: 0x2e4260,
  hemiGround: 0x0e1116,
  hemiIntensity: 0.55,
  fogNear: 40,
  fogFar: 420,
  night: 1,
  rain: 0,
  clouds: 0.25,
  stars: 1,
  exposure: 1.2,
  ...k,
});

/** Night Route appearance: the same trip under moonlight. */
export const ENV_DARK: readonly EnvKey[] = [
  night({ s: -60 }),
  night({ s: 172, horizon: 0x192a42 }),
  night({ s: 548, horizon: 0x2a2946, hemiSky: 0x3a3f66 }),
  night({ s: 700, horizon: 0x33304c, hemiSky: 0x44416a, clouds: 0.4, stars: 0.7 }),
  night({ s: 884, skyTop: 0x03060b, horizon: 0x151d29, sunIntensity: 0.3, hemiIntensity: 0.38, fogNear: 16, fogFar: 240, rain: 1, clouds: 1, stars: 0 }),
  night({ s: 1032, skyTop: 0x03060b, horizon: 0x141b26, sunIntensity: 0.25, hemiIntensity: 0.34, fogNear: 14, fogFar: 220, rain: 1, clouds: 1, stars: 0 }),
  night({ s: 1150, horizon: 0x1c2a3e, rain: 0.1, clouds: 0.5, stars: 0.6 }),
  night({ s: LANDMARKS.arrival, horizon: 0x23334b, hemiSky: 0x33496a, stars: 0.85 }),
];

export type KeyBlend<T> = { a: T; b: T; t: number };

export function keyBlendAt<T extends { s: number }>(keys: readonly T[], s: number): KeyBlend<T> {
  if (s <= keys[0].s) return { a: keys[0], b: keys[0], t: 0 };
  for (let i = 1; i < keys.length; i++) {
    if (s <= keys[i].s) {
      const a = keys[i - 1];
      const b = keys[i];
      return { a, b, t: smoothstep(a.s, b.s, s) };
    }
  }
  const last = keys[keys.length - 1];
  return { a: last, b: last, t: 0 };
}

/* ------------------------------------------------------------------ */
/* Telemetry: what the nav HUD reports                                  */
/* ------------------------------------------------------------------ */

/** Chicago, IL -> Dallas, TX by road. */
export const TRIP_MILES = 925;

const STAGES: ReadonlyArray<readonly [untilS: number, label: string]> = [
  [56, "Chicago DC · Gate 2"],
  [322, "I-55 S · Illinois"],
  [380, "Mississippi River"],
  [560, "I-55 S · Missouri"],
  [690, "Memphis, TN"],
  [738, "Compliance checkpoint"],
  [988, "I-40 W · Arkansas"],
  [1072, "Night run · I-30 W"],
  [1188, "I-30 W · Texas"],
  [Infinity, "Dallas DC · Dock 2"],
];

export function stageFor(s: number): string {
  for (const [until, label] of STAGES) if (s < until) return label;
  return STAGES[STAGES.length - 1][1];
}

/** 0..1 trip progress between departure and arrival. */
export function tripProgress(s: number): number {
  return clamp01((s - TRIP_START) / (TRIP_END - TRIP_START));
}

export function milesToGo(s: number): number {
  return Math.round(TRIP_MILES * (1 - tripProgress(s)));
}

/** Road m/s to the mph the HUD shows (constant 40 mph = 65 km/h while moving). */
export function displayMph(v: number): number {
  if (Math.abs(v) < 0.3) return 0;
  return 40;
}

export function isArrived(m: TruckMotion): boolean {
  return m.s > LANDMARKS.arrival - 1.5 && Math.abs(m.v) < 0.6;
}
