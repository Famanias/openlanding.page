import { clamp, lerp } from "../motion/math";

export type SoundInput = { tide: number; roughness: number; calm: number; p: number };

/** The sea state → the soundscape's dials. Pure, so the mix can be reasoned about without audio. */
export function soundParams(input: SoundInput) {
  const tide = clamp(input.tide);
  const roughness = clamp(input.roughness);
  const calm = clamp(input.calm);
  const p = clamp(input.p);
  return {
    surfCutoffHz: lerp(300, 1800, tide) + roughness * 2500,
    surfGainDb: -18 + roughness * 6 - calm * 6,
    grit: roughness,
    padTempoBpm: lerp(52, 36, p),
    padGainDb: -22 - calm * 3,
  };
}
