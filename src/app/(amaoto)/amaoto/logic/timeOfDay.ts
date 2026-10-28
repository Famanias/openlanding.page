import {
  clamp01,
  cssRgb,
  lerp,
  lerpVec3,
  PALETTE,
  scaleRgb,
  type RGB,
  type Vec3,
} from "./rng";
export function computeTimeOfDay(value: number) {
  const t = clamp01(value),
    stops: RGB[] = [
      lerpVec3(PALETTE.red, PALETTE.gold, 0.45),
      PALETTE.gold,
      PALETTE.paper,
      lerpVec3(PALETTE.paper, PALETTE.indigo, 0.08),
    ];
  const q = t * 3,
    i = Math.min(2, Math.floor(q));
  const sunColorRgb = lerpVec3(stops[i], stops[i + 1], q - i),
    azimuth = lerp(-1.2, -0.3, t),
    elevation = lerp(0.15, 1.3, t);
  const surfaceBgRgb = lerpVec3(
    scaleRgb(PALETTE.indigo, 0.65),
    PALETTE.paper,
    t,
  );
  return {
    value: t,
    sunOffset: [
      Math.sin(azimuth) * Math.cos(elevation) * 7,
      Math.sin(elevation) * 7,
      Math.cos(azimuth) * Math.cos(elevation) * 7,
    ] as Vec3,
    sunColorRgb,
    sunIntensityMultiplier: lerp(0.2, 1.35, t),
    ambientIntensityMultiplier: lerp(0.28, 1.2, t),
    rimIntensityMultiplier: lerp(0.55, 1, t),
    toneMappingExposure: lerp(0.82, 1.08, t),
    lanternIntensityMultiplier: lerp(1.6, 0.16, t),
    paperTransmission: lerp(0.95, 0.35, t),
    surfaceBgRgb,
    timeLabel:
      t < 0.2
        ? "Dusk"
        : t < 0.5
          ? "Golden hour"
          : t < 0.85
            ? "Morning"
            : "Midday",
    cssVars: {
      "--page-bg": cssRgb(surfaceBgRgb),
      "--sky-ambient": cssRgb(lerpVec3(PALETTE.indigo, PALETTE.paper, t * 0.7)),
      "--text-contrast": cssRgb(t > 0.55 ? PALETTE.ink : PALETTE.paper),
      "--sun-accent": cssRgb(sunColorRgb),
    },
  };
}
export type TimeOfDay = ReturnType<typeof computeTimeOfDay>;
