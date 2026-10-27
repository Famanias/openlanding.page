import { clamp } from "../motion/math";
import { CHAPTER_IDS, CHAPTER_POINTS, type ChapterId } from "./clock";

const LOW_TIDES: ChapterId[] = ["problem", "sensors", "smart-wake", "proof", "reveal"];

/** (progress, level) anchors: high at the start, each low tide at 0, a full high between lows, half-in at dawn. */
const ANCHORS: [number, number][] = (() => {
  const lows = LOW_TIDES.map((id) => CHAPTER_POINTS[id]);
  const out: [number, number][] = [[0, 1]];
  lows.forEach((p, i) => {
    if (i > 0) out.push([(lows[i - 1] + p) / 2, 1]);
    out.push([p, 0]);
  });
  out.push([1, 0.5]);
  return out;
})();

/** Water level in [0, 1] (1 = high tide), eased with a half cosine between anchors. */
export function tideLevel(p: number) {
  const x = clamp(p);
  for (let i = 1; i < ANCHORS.length; i++) {
    const [p1, l1] = ANCHORS[i];
    if (x <= p1) {
      const [p0, l0] = ANCHORS[i - 1];
      const t = p1 === p0 ? 1 : (x - p0) / (p1 - p0);
      return l0 + (l1 - l0) * (1 - Math.cos(Math.PI * t)) / 2;
    }
  }
  return ANCHORS[ANCHORS.length - 1][1];
}

export function nearestChapter(p: number): ChapterId {
  const x = clamp(p);
  let best: ChapterId = "hook";
  for (const id of CHAPTER_IDS) if (Math.abs(CHAPTER_POINTS[id] - x) < Math.abs(CHAPTER_POINTS[best] - x)) best = id;
  return best;
}

/** The chapter one step past the nearest one, clamped at both ends. */
export function stepChapter(p: number, dir: 1 | -1): ChapterId {
  const i = CHAPTER_IDS.indexOf(nearestChapter(p));
  return CHAPTER_IDS[Math.min(CHAPTER_IDS.length - 1, Math.max(0, i + dir))];
}
