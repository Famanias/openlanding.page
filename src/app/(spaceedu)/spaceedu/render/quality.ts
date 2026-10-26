export type QualityTier = { scale: number; mainSteps: number; sideSteps: number; sideFps: number };
export function chooseQuality(width: number, height: number, hardwareConcurrency = 4): QualityTier {
  if (width < 600 || height < 700) return { scale: .5, mainSteps: 48, sideSteps: 24, sideFps: 15 };
  if (hardwareConcurrency <= 4) return { scale: .7, mainSteps: 72, sideSteps: 36, sideFps: 30 };
  return { scale: .9, mainSteps: 96, sideSteps: 48, sideFps: 30 };
}
