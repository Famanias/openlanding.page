import { MAKING_STEPS } from "../data/steps";
import { clamp01 } from "../model/rig";
export const MAKING_PARTS = [
  "ribs",
  "ribs",
  "handle",
  "handle",
  "stretchers",
  "runner",
  "canopy",
  "canopy",
  "thread",
  "thread",
] as const;
export function canPinMaking(width: number, height: number, reduced: boolean) {
  return !reduced && height >= 640 && (width > 900 || height >= 740);
}
export function makingScrollDistance(height: number) {
  return MAKING_STEPS.length * Math.max(180, height * 0.3);
}
/** Native document scroll advances the held scene, followed by one viewport of release. */
export function makingSequence(
  scroll: number,
  start: number,
  distance: number,
  viewport: number,
) {
  const progress = clamp01((scroll - start) / Math.max(1, distance));
  const release = clamp01((scroll - start - distance) / Math.max(1, viewport));
  return {
    progress,
    release,
    step: Math.min(
      MAKING_STEPS.length - 1,
      Math.floor(progress * MAKING_STEPS.length),
    ),
    transition: release === 0 ? 0 : 0.62 + 0.38 * release,
  };
}
