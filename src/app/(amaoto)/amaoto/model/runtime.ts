export const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
export const runnerPosition = (open: number) => 0.12 + (0.74 - 0.12) * clamp01(open);
export const canopyRadius = (open: number, rim = 2.05) => 0.32 + (rim - 0.32) * clamp01(open);
export const explodeOffset = (explode: number, axis: "canopy" | "runner" | "handle") => {
  const t = clamp01(explode);
  return axis === "canopy" ? t * 0.5 : axis === "runner" ? t * 0.24 : -t * 0.32;
};
