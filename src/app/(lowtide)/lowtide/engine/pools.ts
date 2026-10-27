import type { ChapterId } from "../night/clock";
import { chapterX, CONTENT_Z } from "./shore";

export type Pool = { id: string; chapter: ChapterId; x: number; z: number; r: number; depth: number };

/** Rock pools the low tide leaves behind. Sensor pools and the reveal pool get their own surfaces later. */
export const POOLS: Pool[] = [
  { id: "problem-a", chapter: "problem", x: chapterX("problem") - 16, z: CONTENT_Z + 6, r: 3.2, depth: 0.35 },
  { id: "problem-b", chapter: "problem", x: chapterX("problem") + 19, z: CONTENT_Z - 4, r: 2.4, depth: 0.3 },
  // sensor and reveal pools sit closer to the visitor, still below the high-water line (z < 17)
  { id: "heart", chapter: "sensors", x: chapterX("sensors") - 15, z: 3, r: 5.6, depth: 0.45 },
  { id: "temperature", chapter: "sensors", x: chapterX("sensors"), z: 1, r: 5.6, depth: 0.45 },
  { id: "breathing", chapter: "sensors", x: chapterX("sensors") + 15, z: 3, r: 5.6, depth: 0.45 },
  { id: "wake", chapter: "smart-wake", x: chapterX("smart-wake") + 12, z: CONTENT_Z + 7, r: 3.6, depth: 0.35 },
  { id: "reveal", chapter: "reveal", x: chapterX("reveal"), z: 4, r: 7.5, depth: 0.5 },
  { id: "dawn", chapter: "dawn", x: chapterX("dawn") - 18, z: CONTENT_Z + 8, r: 3, depth: 0.3 },
];

export const MAX_POOLS = 12;
