/** The Abruzzi Spur on K2, from base camp to the summit. Each camp is one chapter of the page. */
export const CAMPS = [
  { id: "base", name: "Base Camp", altitude: 5000 },
  { id: "c1", name: "Camp 1", altitude: 6050 },
  { id: "c2", name: "Camp 2", altitude: 6700 },
  { id: "c3", name: "Camp 3", altitude: 7350 },
  { id: "c4", name: "Camp 4", altitude: 7900 },
  { id: "bottleneck", name: "Bottleneck", altitude: 8200 },
  { id: "summit", name: "Summit", altitude: 8611 },
] as const;

export type CampId = (typeof CAMPS)[number]["id"];

const LAST = CAMPS.length - 1;
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** Altitude in metres, interpolating camps placed at equal progress spacing (camp i at i/6). */
export function altitudeAt(progress: number): number {
  const p = clamp01(progress) * LAST;
  const i = Math.min(LAST - 1, Math.floor(p));
  const f = p - i;
  const a = CAMPS[i].altitude;
  const b = CAMPS[i + 1].altitude;
  return Math.round(a + (b - a) * f);
}

/** Index of the last camp whose position is at or below `progress`. */
export function activeCamp(progress: number): number {
  return Math.min(LAST, Math.floor(clamp01(progress) * LAST + 0.0001));
}

export function formatAltitude(metres: number): string {
  return `${Math.round(metres).toLocaleString("en-US")} M`;
}

/**
 * Ascent progress from the page's reading line (a y position, e.g. scrollY + 45% of the viewport)
 * and each chapter's top. Camp i is reached exactly when chapter i's top crosses the line,
 * so labels line up with chapters even when chapters have different heights.
 */
export function progressFromOffsets(line: number, tops: readonly number[]): number {
  if (tops.length < 2 || line <= tops[0]) return 0;
  const last = tops.length - 1;
  if (line >= tops[last]) return 1;
  let i = 0;
  while (i < last - 1 && line >= tops[i + 1]) i++;
  const f = (line - tops[i]) / (tops[i + 1] - tops[i]);
  return (i + f) / last;
}
