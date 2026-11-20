import { clamp, smoothstep } from '../utils/sceneLayout';

export interface LivingBrushStrokeSpec {
  id: string;
  /** SVG path in 1920x1080 artboard space following exact geological tangent */
  d: string;
  /** Approximate center point for localized pointer reactivity */
  cx: number;
  cy: number;
  /** Approximate path length for stroke-dashoffset animation */
  length: number;
  /** Visual role: ink contour, dry-brush ochre catchlight, or dark sienna strata accent */
  color: string;
  strokeWidth: number;
  baseOpacity: number;
  /** Peak opacity when reactivated */
  activeOpacity: number;
  /** Natural staggered ambient reactivation period (seconds) */
  cyclePeriod: number;
  /** Phase offset (seconds) */
  phaseOffset: number;
  /** Depth layer group so strokes move cleanly with their rock formation */
  layer: 'canyonMid' | 'cliffWall' | 'foreground';
  /** Scroll threshold where extra geological hatching begins emerging (0 = always eligible) */
  scrollRevealStart: number;
}

/**
 * Curated directional geological brushstrokes aligned directly along the painted
 * rock strata, vertical cliff columns, diagonal lower-left slope, and foreground ridges.
 */
export const LIVING_BRUSH_STROKES: LivingBrushStrokeSpec[] = [
  // ---- Midground Stepped Canyon Strata (horizontal & diagonal tangents) ----
  {
    id: 'mid-strata-1',
    d: 'M 1035 492 Q 1190 488 1352 486',
    cx: 1190,
    cy: 489,
    length: 325,
    color: '#F2D8BC',
    strokeWidth: 4.5,
    baseOpacity: 0.08,
    activeOpacity: 0.62,
    cyclePeriod: 11.5,
    phaseOffset: 0.8,
    layer: 'canyonMid',
    scrollRevealStart: 0,
  },
  {
    id: 'mid-strata-2',
    d: 'M 940 546 Q 1140 541 1345 536',
    cx: 1140,
    cy: 541,
    length: 410,
    color: '#3B211D',
    strokeWidth: 5.5,
    baseOpacity: 0.1,
    activeOpacity: 0.58,
    cyclePeriod: 14.2,
    phaseOffset: 4.1,
    layer: 'canyonMid',
    scrollRevealStart: 0,
  },
  {
    id: 'mid-strata-3',
    d: 'M 730 636 Q 995 632 1265 634',
    cx: 995,
    cy: 634,
    length: 540,
    color: '#F0D3B5',
    strokeWidth: 4.2,
    baseOpacity: 0.06,
    activeOpacity: 0.56,
    cyclePeriod: 12.8,
    phaseOffset: 7.4,
    layer: 'canyonMid',
    scrollRevealStart: 0.15,
  },
  {
    id: 'mid-overhang-ink',
    d: 'M 380 732 Q 565 748 765 745',
    cx: 565,
    cy: 744,
    length: 390,
    color: '#2D1815',
    strokeWidth: 4.8,
    baseOpacity: 0.12,
    activeOpacity: 0.65,
    cyclePeriod: 13.4,
    phaseOffset: 2.3,
    layer: 'canyonMid',
    scrollRevealStart: 0,
  },
  {
    id: 'mid-slope-diag',
    d: 'M 420 806 Q 210 905 -20 1012',
    cx: 210,
    cy: 905,
    length: 495,
    color: '#EBCAB0',
    strokeWidth: 5.0,
    baseOpacity: 0.06,
    activeOpacity: 0.52,
    cyclePeriod: 15.6,
    phaseOffset: 9.2,
    layer: 'canyonMid',
    scrollRevealStart: 0.25,
  },
  {
    id: 'mid-ravine-wash',
    d: 'M 1410 405 Q 1245 555 1035 715',
    cx: 1225,
    cy: 565,
    length: 490,
    color: '#3D2724',
    strokeWidth: 9.5,
    baseOpacity: 0.05,
    activeOpacity: 0.42,
    cyclePeriod: 16.4,
    phaseOffset: 5.8,
    layer: 'canyonMid',
    scrollRevealStart: 0.3,
  },

  // ---- Monumental Right Cliff Wall (vertical monolith & lower shelf tangents) ----
  {
    id: 'cliff-vertical-1',
    d: 'M 1344 10 Q 1332 165 1316 355',
    cx: 1332,
    cy: 175,
    length: 350,
    color: '#F3DAC0',
    strokeWidth: 5.2,
    baseOpacity: 0.08,
    activeOpacity: 0.58,
    cyclePeriod: 13.8,
    phaseOffset: 1.5,
    layer: 'cliffWall',
    scrollRevealStart: 0,
  },
  {
    id: 'cliff-fissure-rim',
    d: 'M 1592 25 Q 1548 225 1472 475',
    cx: 1545,
    cy: 245,
    length: 470,
    color: '#EFC9A4',
    strokeWidth: 6.0,
    baseOpacity: 0.1,
    activeOpacity: 0.62,
    cyclePeriod: 12.2,
    phaseOffset: 6.2,
    layer: 'cliffWall',
    scrollRevealStart: 0,
  },
  {
    id: 'cliff-flank-ink',
    d: 'M 1820 35 Q 1755 205 1665 395',
    cx: 1750,
    cy: 215,
    length: 395,
    color: '#341C19',
    strokeWidth: 6.5,
    baseOpacity: 0.09,
    activeOpacity: 0.56,
    cyclePeriod: 15.1,
    phaseOffset: 10.4,
    layer: 'cliffWall',
    scrollRevealStart: 0.22,
  },
  {
    id: 'cliff-shelf-1',
    d: 'M 1365 552 Q 1680 488 1965 445',
    cx: 1675,
    cy: 492,
    length: 615,
    color: '#F0CFAF',
    strokeWidth: 4.8,
    baseOpacity: 0.07,
    activeOpacity: 0.58,
    cyclePeriod: 11.8,
    phaseOffset: 3.3,
    layer: 'cliffWall',
    scrollRevealStart: 0,
  },
  {
    id: 'cliff-shelf-2',
    d: 'M 1290 645 Q 1615 585 1965 535',
    cx: 1620,
    cy: 588,
    length: 690,
    color: '#351D1A',
    strokeWidth: 5.8,
    baseOpacity: 0.1,
    activeOpacity: 0.6,
    cyclePeriod: 14.7,
    phaseOffset: 8.6,
    layer: 'cliffWall',
    scrollRevealStart: 0.2,
  },
  {
    id: 'cliff-shelf-3',
    d: 'M 1225 718 Q 1565 662 1955 612',
    cx: 1575,
    cy: 665,
    length: 745,
    color: '#EDCBA9',
    strokeWidth: 4.4,
    baseOpacity: 0.06,
    activeOpacity: 0.54,
    cyclePeriod: 13.1,
    phaseOffset: 11.9,
    layer: 'cliffWall',
    scrollRevealStart: 0.35,
  },

  // ---- Foreground Promontory Ridge & Drop-Off ----
  {
    id: 'fg-ridge-rim',
    d: 'M 825 840 Q 1120 895 1540 1002',
    cx: 1150,
    cy: 905,
    length: 740,
    color: '#F7E7D5',
    strokeWidth: 4.2,
    baseOpacity: 0.1,
    activeOpacity: 0.62,
    cyclePeriod: 12.6,
    phaseOffset: 2.8,
    layer: 'foreground',
    scrollRevealStart: 0,
  },
  {
    id: 'fg-dropoff-ink',
    d: 'M 812 848 Q 748 948 565 1095',
    cx: 720,
    cy: 965,
    length: 365,
    color: '#2B1614',
    strokeWidth: 5.5,
    baseOpacity: 0.1,
    activeOpacity: 0.62,
    cyclePeriod: 15.8,
    phaseOffset: 6.9,
    layer: 'foreground',
    scrollRevealStart: 0.18,
  },
  {
    id: 'fg-slab-highlight',
    d: 'M 1485 878 Q 1755 912 1975 955',
    cx: 1740,
    cy: 915,
    length: 505,
    color: '#F1D4B8',
    strokeWidth: 4.6,
    baseOpacity: 0.08,
    activeOpacity: 0.58,
    cyclePeriod: 13.5,
    phaseOffset: 4.9,
    layer: 'foreground',
    scrollRevealStart: 0.28,
  },
  {
    id: 'fg-slab-shadow',
    d: 'M 1418 972 Q 1685 1038 1975 1110',
    cx: 1695,
    cy: 1040,
    length: 580,
    color: '#341C19',
    strokeWidth: 6.0,
    baseOpacity: 0.08,
    activeOpacity: 0.56,
    cyclePeriod: 14.4,
    phaseOffset: 9.7,
    layer: 'foreground',
    scrollRevealStart: 0.4,
  },
];

export interface EvaluatedBrushStroke {
  /** Drawn fraction 0..1 along the stroke tangent (controls stroke-dashoffset) */
  drawFraction: number;
  /** Visual opacity 0..1 */
  opacity: number;
  /** Subtle extra stroke width bloom when active */
  widthScale: number;
}

/**
 * Pure evaluator computing directional stroke draw-length and pigment density
 * for a single geological brushstroke, combining:
 * 1) Opening Stage 3 hatching draw-in
 * 2) Staggered ambient brushstroke reactivation (only ~2-3 active at once)
 * 3) Localized cursor pigment reactivation when pointer glides over that rock face
 * 4) Scroll-driven geological contour emergence
 */
export function evaluateLivingStroke(
  spec: LivingBrushStrokeSpec,
  t: number,
  options: {
    hatchingProgress: number;
    brushEnabled: boolean;
    brushActivity: number;
    motionIntensity: number;
    geologicalScrollReveal: number;
    pointerX: number;
    pointerY: number;
    pointerActive: boolean;
    pointerEnabled: boolean;
  }
): EvaluatedBrushStroke {
  const {
    hatchingProgress,
    brushEnabled,
    brushActivity,
    motionIntensity,
    geologicalScrollReveal,
    pointerX,
    pointerY,
    pointerActive,
    pointerEnabled,
  } = options;

  if (hatchingProgress <= 0.005) {
    return { drawFraction: 0, opacity: 0, widthScale: 1 };
  }

  const activity = brushEnabled
    ? clamp(brushActivity, 0, 2) * clamp(motionIntensity, 0, 2)
    : 0;

  // Staggered brief reactivation pulse (occupies ~26% of each stroke's cycle -> calm breathing)
  let ambientPulse = 0;
  if (activity > 0.01) {
    const cycleU = ((t + spec.phaseOffset) % spec.cyclePeriod) / spec.cyclePeriod;
    ambientPulse =
      smoothstep(0.06, 0.2, cycleU) * (1 - smoothstep(0.24, 0.44, cycleU));
  }

  // Localized pointer pigment reactivation on nearby rock faces
  let pointerPulse = 0;
  if (pointerEnabled && pointerActive) {
    const dist = Math.hypot(pointerX - spec.cx, pointerY - spec.cy);
    if (dist < 290) {
      pointerPulse = 1 - smoothstep(40, 290, dist);
    }
  }

  // Scroll-driven extra geological contours
  const scrollExtra =
    spec.scrollRevealStart > 0
      ? smoothstep(spec.scrollRevealStart, spec.scrollRevealStart + 0.35, geologicalScrollReveal)
      : 0;

  const combinedActivation = clamp(
    Math.max(ambientPulse * clamp(activity, 0, 1.5), pointerPulse * 1.1, scrollExtra * 0.78),
    0,
    1.25
  );

  // Directional stroke extends smoothly along its tangent during opening & reactivation
  const baseDraw = clamp(hatchingProgress * 0.65 + scrollExtra * 0.35, 0, 1);
  const drawFraction = clamp(
    Math.min(hatchingProgress, baseDraw + combinedActivation * 0.55),
    0,
    1
  );

  const opacity = clamp(
    (spec.baseOpacity + (spec.activeOpacity - spec.baseOpacity) * combinedActivation) *
      hatchingProgress,
    0,
    0.85
  );

  const widthScale = 1 + combinedActivation * 0.28;

  return { drawFraction, opacity, widthScale };
}
