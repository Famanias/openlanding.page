import { ribPoint, runnerHeight } from "./rig";
export { clamp01 } from "./rig";
export const runnerPosition = runnerHeight;
export const canopyRadius = (open: number) =>
  Math.hypot(ribPoint(open, 0, 1).x, ribPoint(open, 0, 1).z);
export const explodeOffset = (
  explode: number,
  axis: "canopy" | "runner" | "handle",
) => {
  const t = Math.max(0, Math.min(1, explode));
  return axis === "canopy" ? t * 0.5 : axis === "runner" ? t * 0.24 : -t * 0.32;
};
