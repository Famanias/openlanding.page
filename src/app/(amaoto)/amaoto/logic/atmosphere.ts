import { WORLD_NAMES, type ChapterProgressState } from "./chapters";
import type { TimeOfDay } from "./timeOfDay";
import {
  addVec3,
  clamp01,
  lerp,
  lerpVec3,
  PALETTE,
  scaleRgb,
  smoothstep,
  type RGB,
  type Vec3,
} from "./rng";
const backgrounds: RGB[] = [
  lerpVec3(PALETTE.paper, PALETTE.indigo, 0.06),
  lerpVec3(PALETTE.ink, PALETTE.gold, 0.24),
  PALETTE.paper,
  lerpVec3(PALETTE.indigo, PALETTE.ink, 0.2),
  lerpVec3(PALETTE.paper, PALETTE.gold, 0.16),
  lerpVec3(PALETTE.ink, PALETTE.gold, 0.16),
];
const fog = [0.012, 0.03, 0.08, 0.055, 0.018, 0.025],
  exposures = [1.08, 0.94, 1.02, 0.86, 1, 0.88],
  env = [0.45, 0.25, 0.2, 0.16, 0.32, 0.18],
  keys = [3, 2.8, 3.2, 0.55, 2.5, 0.8],
  accents = [0, 1.8, 0.2, 3, 2, 1.5],
  blooms = [0, 0.12, 0.08, 0.55, 0.08, 0];
export const paperLitAt=(state:ChapterProgressState,day:TimeOfDay)=>Math.max(state.paperLitMode,state.worldVisibility.street*smoothstep(.76,.86,day.value));
export function atmosphereAtProgress(
  state: ChapterProgressState,
  day: TimeOfDay,
  rain: number,
) {
  const weights = WORLD_NAMES.map((n) => state.worldVisibility[n]);
  const blend = (values: number[]) =>
    values.reduce((sum, v, i) => sum + v * weights[i], 0);
  const background = [0, 1, 2].map((k) =>
    backgrounds.reduce((sum, c, i) => sum + c[k] * weights[i], 0),
  ) as RGB;
  const daylight =
    state.worldVisibility.street *
    Math.max(0, (day.value - 0.75) / 0.25) *
    0.75;
  const color = lerpVec3(background, PALETTE.paper, daylight),
    density = blend(fog) + state.paperDive * 0.035 + clamp01(rain) * 0.008;
  return {
    paperLitMode:paperLitAt(state,day),
    background: color,
    fogColor: color,
    fogDensity: density,
    exposure: blend(exposures) * day.toneMappingExposure,
    envIntensity: blend(env) * day.ambientIntensityMultiplier,
    key: {
      color: day.sunColorRgb,
      intensity: blend(keys) * day.sunIntensityMultiplier,
      position: addVec3(state.anchor, day.sunOffset),
      target: addVec3(state.anchor, [0, 0.5, 0]),
    },
    rim: {
      color: lerpVec3(PALETTE.sakura, PALETTE.paper, day.value),
      intensity: lerp(0.4, 1.2, day.value),
      position: addVec3(state.anchor, [-3, 3, -5]),
    },
    hemi: {
      sky: lerpVec3(PALETTE.indigo, PALETTE.paper, day.value),
      ground: scaleRgb(PALETTE.gold, 0.3),
      intensity: 0.8 * day.ambientIntensityMultiplier,
    },
    accent: {
      color: lerpVec3(
        PALETTE.gold,
        PALETTE.paper,
        state.worldVisibility.bench * 0.5,
      ),
      intensity: blend(accents) * day.lanternIntensityMultiplier,
      position: addVec3(state.anchor, [
        lerp(-2, 2, state.benchAssembly),
        3,
        -2,
      ]) as Vec3,
    },
    bloomStrength: blend(blooms) * day.lanternIntensityMultiplier,
    vignette: lerp(0.3, 0.08, paperLitAt(state,day)),
    grain: 0.018,
    lensBlur: lerp(0.0022, 0.004, state.paperDive),
  };
}
export type Atmosphere = ReturnType<typeof atmosphereAtProgress>;
