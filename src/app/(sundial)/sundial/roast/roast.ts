/**
 * The roast curve: pure maths for one 12 kg batch, from charge to drop.
 * Everything the stage renders — temperature, stage, development %, the
 * bean's colour — is derived from elapsed seconds through these functions.
 */

/** Total roast time in seconds (11:30). */
export const TOTAL_SECONDS = 690;

/** First crack, in seconds from charge (8:42). Development is measured from here. */
export const CRACK_AT = 522;

/** Charge/drop-in temperature of the drum, °C. */
export const CHARGE_TEMP = 205;

/** Drum temperature at the drop, °C. */
export const DROP_TEMP = 208;

/**
 * Bean-temperature control points [elapsed seconds, °C].
 * Piecewise-linear between knots — the shape of a real logged batch:
 * a plunge to the turning point, then a flattening climb.
 */
const CONTROL_POINTS: ReadonlyArray<readonly [number, number]> = [
  [0, 205],
  [80, 92],
  [180, 146],
  [300, 166],
  [420, 184],
  [522, 196],
  [600, 203],
  [690, 208],
];

export function clampElapsed(elapsed: number): number {
  return Math.max(0, Math.min(TOTAL_SECONDS, elapsed));
}

/** Bean temperature (°C) at a given elapsed time, linearly interpolated. */
export function beanTempAt(elapsed: number): number {
  const t = clampElapsed(elapsed);
  for (let i = 1; i < CONTROL_POINTS.length; i++) {
    const [t1, temp1] = CONTROL_POINTS[i];
    if (t <= t1) {
      const [t0, temp0] = CONTROL_POINTS[i - 1];
      const u = (t - t0) / (t1 - t0);
      return temp0 + (temp1 - temp0) * u;
    }
  }
  return DROP_TEMP;
}

/** Development percentage: share of the roast spent after first crack. */
export function developmentPct(elapsed: number): number {
  const t = clampElapsed(elapsed);
  if (t <= CRACK_AT) return 0;
  return ((t - CRACK_AT) / TOTAL_SECONDS) * 100;
}

/** Elapsed seconds → "m:ss". */
export function formatClock(elapsed: number): string {
  const t = Math.round(clampElapsed(elapsed));
  const m = Math.floor(t / 60);
  const s = t % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** Scroll progress (0..1) → elapsed seconds. */
export function progressToElapsed(progress: number): number {
  return clampElapsed(progress * TOTAL_SECONDS);
}

export type StageId =
  | "charge"
  | "drying"
  | "maillard"
  | "firstcrack"
  | "development"
  | "drop";

export interface RoastStage {
  id: StageId;
  index: number;
  label: string;
  range: string;
  start: number;
  end: number;
  blurb: string;
  tempAtEnd: number;
}

export const STAGES: readonly RoastStage[] = [
  {
    id: "charge",
    index: 0,
    label: "Charge",
    range: "0:00 – 1:20",
    start: 0,
    end: 80,
    blurb:
      "205 °C at the drop-in. Green beans hit the hot drum and the temperature plunges to its turning point — the coldest moment of the batch.",
    tempAtEnd: 92,
  },
  {
    id: "drying",
    index: 1,
    label: "Drying",
    range: "1:20 – 4:00",
    start: 80,
    end: 240,
    blurb:
      "The beans give up their water, turn from sage to hay, and the room starts to smell like bread and hay bales.",
    tempAtEnd: 166,
  },
  {
    id: "maillard",
    index: 2,
    label: "Maillard",
    range: "4:00 – 8:42",
    start: 240,
    end: 522,
    blurb:
      "Sugars and amino acids trade places. Caramel, toast and colour arrive together — the longest stretch, and where the character is built.",
    tempAtEnd: 196,
  },
  {
    id: "firstcrack",
    index: 3,
    label: "First crack",
    range: "8:42 – 10:00",
    start: 522,
    end: 600,
    blurb:
      "At 196 °C the beans audibly crack open. This is the clock everything else is measured from: development starts here.",
    tempAtEnd: 203,
  },
  {
    id: "development",
    index: 4,
    label: "Development",
    range: "10:00 – 11:30",
    start: 600,
    end: 690,
    blurb:
      "Every second after first crack deepens body and trades acidity for sweetness. We stop this lot at 24% development — bright, but round.",
    tempAtEnd: 208,
  },
  {
    id: "drop",
    index: 5,
    label: "Drop",
    range: "11:30",
    start: 690,
    end: 690,
    blurb:
      "Out of the drum at 208 °C, cooled in three minutes, rested overnight, bagged with the curve printed on the label.",
    tempAtEnd: 208,
  },
];

export function stageFromElapsed(elapsed: number): RoastStage {
  const t = clampElapsed(elapsed);
  for (const stage of STAGES) {
    if (t < stage.end) return stage;
  }
  return STAGES[STAGES.length - 1];
}

/* ── Bean colour: content colour, like food in 3D. Not a UI colour. ── */

type Rgb = readonly [number, number, number];

/** [elapsed, rgb] stops: raw green → hay → crack brown → espresso. */
const BEAN_STOPS: ReadonlyArray<readonly [number, Rgb]> = [
  [0, [143, 160, 122]],
  [240, [176, 142, 92]],
  [522, [122, 74, 40]],
  [690, [36, 22, 17]],
];

/** The bean's colour at a given elapsed time, as an `rgb()` string. */
export function beanColorAt(elapsed: number): string {
  const t = clampElapsed(elapsed);
  for (let i = 1; i < BEAN_STOPS.length; i++) {
    const [t1, c1] = BEAN_STOPS[i];
    if (t <= t1) {
      const [t0, c0] = BEAN_STOPS[i - 1];
      const u = t1 === t0 ? 0 : (t - t0) / (t1 - t0);
      const mix = (a: number, b: number) => Math.round(a + (b - a) * u);
      return `rgb(${mix(c0[0], c1[0])}, ${mix(c0[1], c1[1])}, ${mix(c0[2], c1[2])})`;
    }
  }
  return "rgb(36, 22, 17)";
}
