/**
 * Pure math for the KIRIGAMI signature scroll-controlled paper unfolding sequence.
 * Computes hinged 2.5D transforms and shadow intensities across normalized progress [0, 1]:
 *   - Stage 1 (0.00 - 0.25): Compressed pop-up landscape (layers folded low, shadows soft)
 *   - Stage 2 (0.25 - 0.65): Landscape unfolds (mountains separate, village & trees hinge upward)
 *   - Stage 3 (0.65 - 1.00): Full reference paper world with gentle spring-settled precision
 */

export interface LayerUnfoldTransform {
  translateY: number;
  translateX: number;
  scaleY: number;
  scaleX: number;
  rotateDeg: number;
  opacity: number;
}

export interface SceneUnfoldState {
  progress: number;
  sun: LayerUnfoldTransform;
  clouds: LayerUnfoldTransform;
  farMountains: LayerUnfoldTransform;
  midMountains: LayerUnfoldTransform;
  riverValley: LayerUnfoldTransform;
  terraces: LayerUnfoldTransform;
  villageHouses: LayerUnfoldTransform;
  toriiGate: LayerUnfoldTransform;
  midTrees: LayerUnfoldTransform;
  foregroundRocks: LayerUnfoldTransform;
  cherryBlossomsLeft: LayerUnfoldTransform;
  cherryBlossomsRight: LayerUnfoldTransform;
  shadowFactor: number; // 0.35 when flat/compressed -> 1.0 when fully stood up
}

export function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

/**
 * Smooth cubic-out with subtle paper settle curve over sub-range [start, end].
 */
export function subProgress(progress: number, start: number, end: number): number {
  if (end <= start) return progress >= end ? 1 : 0;
  const t = clamp01((progress - start) / (end - start));
  // Smooth ease-out cubic: 1 - (1 - t)^3
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Subtle pop-up overshoot settle used for standing cardstock pieces (houses, torii, trees).
 */
export function paperHingeEase(progress: number, start: number, end: number): number {
  const t = clamp01((progress - start) / Math.max(0.0001, end - start));
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  // Critically-damped slight spring settle (~2% overshoot) that stops precisely at 1
  const c1 = 0.85;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/**
 * Computes exact hinged transforms for every structural group in the pop-up book.
 * At progress = 1, every transform resolves cleanly to identity (0, 0, 1, 1, 0, 1)
 * matching the reference image exactly.
 */
export function computeUnfoldState(rawProgress: number): SceneUnfoldState {
  const p = clamp01(rawProgress);

  const pSun = subProgress(p, 0.0, 0.55);
  const pClouds = subProgress(p, 0.05, 0.72);
  const pFarMt = subProgress(p, 0.0, 0.62);
  const pMidMt = subProgress(p, 0.08, 0.72);
  const pRiver = subProgress(p, 0.06, 0.68);
  const pTerraces = subProgress(p, 0.14, 0.78);
  const pVillage = paperHingeEase(p, 0.22, 0.84);
  const pTorii = paperHingeEase(p, 0.26, 0.86);
  const pTrees = paperHingeEase(p, 0.2, 0.88);
  const pFgRocks = subProgress(p, 0.18, 0.86);
  const pBlossoms = subProgress(p, 0.28, 0.96);

  return {
    progress: p,
    sun: {
      translateY: lerp(95, 0, pSun),
      translateX: 0,
      scaleY: lerp(0.82, 1, pSun),
      scaleX: lerp(0.92, 1, pSun),
      rotateDeg: 0,
      opacity: 1,
    },
    clouds: {
      translateY: lerp(52, 0, pClouds),
      translateX: lerp(-18, 0, pClouds),
      scaleY: lerp(0.74, 1, pClouds),
      scaleX: lerp(0.94, 1, pClouds),
      rotateDeg: lerp(-1.5, 0, pClouds),
      opacity: 1,
    },
    farMountains: {
      translateY: lerp(135, 0, pFarMt),
      translateX: 0,
      scaleY: lerp(0.62, 1, pFarMt),
      scaleX: 1,
      rotateDeg: 0,
      opacity: 1,
    },
    midMountains: {
      translateY: lerp(165, 0, pMidMt),
      translateX: 0,
      scaleY: lerp(0.56, 1, pMidMt),
      scaleX: 1,
      rotateDeg: 0,
      opacity: 1,
    },
    riverValley: {
      translateY: lerp(72, 0, pRiver),
      translateX: 0,
      scaleY: lerp(0.84, 1, pRiver),
      scaleX: 1,
      rotateDeg: 0,
      opacity: 1,
    },
    terraces: {
      translateY: lerp(96, 0, pTerraces),
      translateX: lerp(38, 0, pTerraces),
      scaleY: lerp(0.66, 1, pTerraces),
      scaleX: lerp(0.94, 1, pTerraces),
      rotateDeg: lerp(2.5, 0, pTerraces),
      opacity: 1,
    },
    villageHouses: {
      translateY: lerp(42, 0, pVillage),
      translateX: 0,
      scaleY: lerp(0.28, 1, pVillage),
      scaleX: lerp(0.92, 1, pVillage),
      rotateDeg: lerp(-4, 0, pVillage),
      opacity: 1,
    },
    toriiGate: {
      translateY: lerp(36, 0, pTorii),
      translateX: 0,
      scaleY: lerp(0.22, 1, pTorii),
      scaleX: lerp(0.9, 1, pTorii),
      rotateDeg: lerp(5, 0, pTorii),
      opacity: 1,
    },
    midTrees: {
      translateY: lerp(78, 0, pTrees),
      translateX: 0,
      scaleY: lerp(0.42, 1, pTrees),
      scaleX: lerp(0.95, 1, pTrees),
      rotateDeg: lerp(-3.5, 0, pTrees),
      opacity: 1,
    },
    foregroundRocks: {
      translateY: lerp(150, 0, pFgRocks),
      translateX: 0,
      scaleY: lerp(0.58, 1, pFgRocks),
      scaleX: 1,
      rotateDeg: 0,
      opacity: 1,
    },
    cherryBlossomsLeft: {
      translateY: lerp(-30, 0, pBlossoms),
      translateX: lerp(-125, 0, pBlossoms),
      scaleY: lerp(0.82, 1, pBlossoms),
      scaleX: lerp(0.76, 1, pBlossoms),
      rotateDeg: lerp(-16, 0, pBlossoms),
      opacity: 1,
    },
    cherryBlossomsRight: {
      translateY: lerp(-35, 0, pBlossoms),
      translateX: lerp(135, 0, pBlossoms),
      scaleY: lerp(0.82, 1, pBlossoms),
      scaleX: lerp(0.76, 1, pBlossoms),
      rotateDeg: lerp(16, 0, pBlossoms),
      opacity: 1,
    },
    shadowFactor: Number(lerp(0.32, 1.0, subProgress(p, 0.1, 0.85)).toFixed(3)),
  };
}
