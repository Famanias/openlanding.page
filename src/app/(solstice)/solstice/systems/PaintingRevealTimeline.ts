import { clamp, smoothstep } from '../utils/sceneLayout';

export const OPENING_DURATION_SEC = 8.0;

export interface RevealableLayerHandle {
  applyReveal: (layerProgress: number) => void;
}

export type RevealStageId = 'paper' | 'brushwork' | 'details' | 'alive';

export interface PaintingRevealState {
  /** Normalized overall timeline progress (0..1) */
  progress: number;
  stage: RevealStageId;
  stageLabel: string;
  /** Stage 1 (0..1.5s): Sun soft pigment bloom */
  sunProgress: number;
  /** Stage 1 (0.4..2.0s): Distant diagonal atmospheric washes */
  distantWashProgress: number;
  /** Stage 2 (1.4..3.8s): Midground canyon strata & lower-left slopes */
  canyonMidProgress: number;
  /** Stage 2 (1.8..4.3s): Monumental right cliff monolith & fissure */
  cliffWallProgress: number;
  /** Stage 2-3 (2.8..5.0s): Foreground promontory ledge & drop-off */
  foregroundProgress: number;
  /** Stage 3 (4.0..5.9s): Grasses drawn from roots & shrubs growing branches */
  vegetationProgress: number;
  /** Stage 3 (4.2..6.2s): Geological contour hatching & ink detail strokes */
  hatchingProgress: number;
  /** Stage 3 (4.6..6.1s): Solitary traveler silhouette reveal */
  travelerProgress: number;
  /** Stage 4 (5.8..8.0s): Smooth transition into full living environmental motion */
  lifeBlend: number;
  /** True when the opening painting creation is fully settled */
  isComplete: boolean;
}

/**
 * Pure deterministic evaluator for the 8-second opening painting creation sequence.
 * 100% scrubbable forward and backward with overlapping organic artistic staging.
 */
export function evaluatePaintingReveal(rawProgress: number): PaintingRevealState {
  const progress = clamp(rawProgress, 0, 1);

  let stage: RevealStageId = 'paper';
  let stageLabel = 'Paper & First Pigment';
  if (progress >= 0.75) {
    stage = 'alive';
    stageLabel = progress >= 0.995 ? 'Living Painting' : 'Coming Alive';
  } else if (progress >= 0.5) {
    stage = 'details';
    stageLabel = 'Fine Details & Traveler';
  } else if (progress >= 0.1875) {
    stage = 'brushwork';
    stageLabel = 'Canyon Brushwork';
  }

  // Stage 1: 0.0s - 1.5s (0.00 - 0.1875)
  const sunProgress = smoothstep(0.02, 0.185, progress);
  const distantWashProgress = smoothstep(0.06, 0.26, progress);

  // Stage 2: 1.5s - 4.0s (0.1875 - 0.50)
  const canyonMidProgress = smoothstep(0.175, 0.45, progress);
  const cliffWallProgress = smoothstep(0.22, 0.52, progress);
  const foregroundProgress = smoothstep(0.32, 0.58, progress);

  // Stage 3: 4.0s - 6.0s (0.50 - 0.75)
  const vegetationProgress = smoothstep(0.49, 0.72, progress);
  const hatchingProgress = smoothstep(0.51, 0.76, progress);
  const travelerProgress = smoothstep(0.56, 0.74, progress);

  // Stage 4: 6.0s - 8.0s (0.75 - 1.00)
  const lifeBlend = smoothstep(0.7, 0.98, progress);

  return {
    progress,
    stage,
    stageLabel,
    sunProgress,
    distantWashProgress,
    canyonMidProgress,
    cliffWallProgress,
    foregroundProgress,
    vegetationProgress,
    hatchingProgress,
    travelerProgress,
    lifeBlend,
    isComplete: progress >= 0.999,
  };
}

export interface RevealStrokePath {
  points: Array<[number, number]>;
  width: number;
  /** Local window [start, end] within the layer's 0..1 reveal progress */
  start: number;
  end: number;
  seed: number;
}

/**
 * Curated directional brush-reveal paths matching the exact geological orientation
 * of each painted layer (horizontal rock strata, vertical monolith columns,
 * diagonal slopes, and sweeping promontory strokes).
 */
export const LAYER_REVEAL_STROKES: Record<
  'distantRidges' | 'canyonMid' | 'cliffWall' | 'foreground',
  RevealStrokePath[]
> = {
  distantRidges: [
    { points: [[-120, 740], [380, 560], [880, 390], [1340, 215]], width: 260, start: 0.0, end: 0.65, seed: 11 },
    { points: [[-120, 860], [320, 710], [820, 540], [1360, 345]], width: 300, start: 0.2, end: 0.85, seed: 12 },
    { points: [[460, 760], [920, 620], [1420, 440]], width: 320, start: 0.42, end: 1.0, seed: 13 },
  ],
  canyonMid: [
    // Horizontal strata sweeps ascending center-left -> right
    { points: [[610, 680], [960, 665], [1460, 640]], width: 170, start: 0.0, end: 0.34, seed: 21 },
    { points: [[740, 580], [1080, 555], [1480, 520]], width: 175, start: 0.14, end: 0.48, seed: 22 },
    { points: [[960, 455], [1220, 425], [1480, 395]], width: 195, start: 0.28, end: 0.62, seed: 23 },
    // Broad diagonal sweeps forming lower-left canyon slope & overhang
    { points: [[840, 745], [520, 755], [220, 880], [-140, 1065]], width: 265, start: 0.36, end: 0.78, seed: 24 },
    { points: [[1440, 380], [1180, 610], [840, 830], [360, 1080], [-120, 1170]], width: 330, start: 0.52, end: 0.94, seed: 25 },
    // Final coverage sweep to ensure zero clipped micro-pixels at completion
    { points: [[-140, 960], [640, 840], [1500, 680]], width: 460, start: 0.76, end: 1.0, seed: 26 },
  ],
  cliffWall: [
    // Vertical sunlit monolith tower sweep (top to bottom along geological grain)
    { points: [[1380, -90], [1370, 210], [1360, 530]], width: 280, start: 0.0, end: 0.42, seed: 31 },
    // Bold vertical right monolith mass
    { points: [[1780, -90], [1740, 220], [1690, 540]], width: 540, start: 0.14, end: 0.56, seed: 32 },
    // Deep charcoal vertical chasm slash
    { points: [[1510, -90], [1470, 220], [1380, 550]], width: 230, start: 0.28, end: 0.66, seed: 33 },
    // Stacked horizontal-diagonal lower-right cliff shelves
    { points: [[1260, 585], [1640, 515], [2060, 455]], width: 220, start: 0.44, end: 0.8, seed: 34 },
    { points: [[1190, 745], [1620, 675], [2060, 625]], width: 265, start: 0.58, end: 0.94, seed: 35 },
    { points: [[1170, 830], [1660, 775], [2060, 765]], width: 320, start: 0.78, end: 1.0, seed: 36 },
  ],
  foreground: [
    // Sweeping sunlit promontory ridge from right toward the precipice
    { points: [[2060, 995], [1560, 905], [1160, 845], [800, 835]], width: 220, start: 0.0, end: 0.45, seed: 41 },
    // Diagonal dark-umber foreground cliff drop-off beneath traveler
    { points: [[860, 845], [750, 965], [560, 1140]], width: 340, start: 0.22, end: 0.66, seed: 42 },
    // Stepped lower-right terracotta rock slabs
    { points: [[1020, 965], [1520, 995], [2060, 1045]], width: 320, start: 0.4, end: 0.84, seed: 43 },
    // Complete dark foreground foundation
    { points: [[440, 1135], [1180, 1110], [2060, 1125]], width: 420, start: 0.66, end: 1.0, seed: 44 },
  ],
};
