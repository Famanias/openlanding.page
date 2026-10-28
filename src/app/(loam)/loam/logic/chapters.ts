/**
 * Pure chapter progress & camera trajectory mathematics for LOAM.
 * Zero Three.js imports so this module can be unit-tested and ported independently.
 */

export type InspectableObjectId = 'mushroom' | 'clump' | 'tray';

export interface ChapterDefinition {
  index: number;
  numberLabel: string;
  title: string;
  markerLabel: string;
  headline?: string;
  subline?: string;
  copy: string;
  specimenNote?: string;
  startProgress: number;
  restProgress: number;
  secondaryRestProgress?: number;
  endProgress: number;
  inspectableObject: InspectableObjectId | null;
  inspectButtonLabel?: string;
}

export const REST_POINT_4A = 0.52;
export const REST_POINT_4B = 0.66;

export const ALL_REST_POINTS: readonly number[] = [
  0.0,
  0.18,
  0.35,
  REST_POINT_4A,
  REST_POINT_4B,
  0.83,
  1.0,
];

export const CHAPTERS: readonly ChapterDefinition[] = [
  {
    index: 0,
    numberLabel: '01',
    title: 'The fruit',
    markerLabel: '01 — The fruit',
    headline: 'LOAM',
    subline: 'Grown, not made.',
    copy: 'What you see is the smallest part.',
    specimenNote: 'Macrolepiota procera — fruiting body above damp forest loam',
    startProgress: 0.0,
    restProgress: 0.0,
    endProgress: 0.13,
    inspectableObject: 'mushroom',
    inspectButtonLabel: 'Inspect mushroom',
  },
  {
    index: 1,
    numberLabel: '02',
    title: 'Under the cap',
    markerLabel: '02 — Under the cap',
    headline: 'A mushroom is only the fruit.',
    copy: 'The organism lives underground.',
    specimenNote: 'Radiating hymenophore lamellae releasing airborne basidiospores',
    startProgress: 0.13,
    restProgress: 0.18,
    endProgress: 0.27,
    inspectableObject: null,
  },
  {
    index: 2,
    numberLabel: '03',
    title: 'Breaking ground',
    markerLabel: '03 — Breaking ground',
    headline: 'Beneath leaf litter and moss.',
    copy: 'Tangled roots give way to dark, living earth.',
    specimenNote: 'Upper forest horizon — O, A, and rhizosphere strata',
    startProgress: 0.27,
    restProgress: 0.35,
    endProgress: 0.45,
    inspectableObject: null,
  },
  {
    index: 3,
    numberLabel: '04',
    title: 'The network',
    markerLabel: '04 — The network',
    headline: 'Miles of living thread under every step.',
    copy: 'A hidden architecture binding root, stone, and soil.',
    specimenNote: 'Bioluminescent rhizomorph cords branching into fine hyphal filaments',
    startProgress: 0.45,
    restProgress: REST_POINT_4A,
    secondaryRestProgress: REST_POINT_4B,
    endProgress: 0.74,
    inspectableObject: 'clump',
    inspectButtonLabel: 'Inspect mycelium clump',
  },
  {
    index: 4,
    numberLabel: '05',
    title: 'The material',
    markerLabel: '05 — The material',
    headline: 'Guided into form.',
    copy: 'Mycelium threads braid around agricultural hemp to grow protective packaging in seven days.',
    specimenNote: 'Unbleached mycelium skin over dense hemp hurd fibre core',
    startProgress: 0.74,
    restProgress: 0.83,
    endProgress: 0.91,
    inspectableObject: 'tray',
    inspectButtonLabel: 'Inspect packaging tray',
  },
  {
    index: 5,
    numberLabel: '06',
    title: 'Return',
    markerLabel: '06 — Return',
    headline: 'Grown, not made.',
    copy: 'When its work is done, it returns cleanly to the soil.',
    specimenNote: 'Home-compostable within 45 days in natural soil',
    startProgress: 0.91,
    restProgress: 1.0,
    endProgress: 1.0,
    inspectableObject: null,
  },
];

export const MATERIAL_CALLOUT_LABELS: readonly string[] = [
  'Grown in 7 days',
  'Home-compostable',
  'Mycelium + hemp',
  'Custom moulds, any shape',
];

export interface TrayCalloutAnchor {
  id: string;
  label: string;
  /** Local 3D coordinates on the tray group */
  localPosition: readonly [number, number, number];
  /** Screen-space leader line offset [dx, dy] in pixels */
  screenOffset: readonly [number, number];
  align: 'left' | 'right';
}

export const TRAY_CALLOUT_ANCHORS: readonly TrayCalloutAnchor[] = [
  {
    id: 'grown-7-days',
    label: 'Grown in 7 days',
    localPosition: [-0.82, 0.18, -0.42],
    screenOffset: [-124, -68],
    align: 'right',
  },
  {
    id: 'home-compostable',
    label: 'Home-compostable',
    localPosition: [0.76, 0.18, -0.44],
    screenOffset: [128, -64],
    align: 'left',
  },
  {
    id: 'mycelium-hemp',
    label: 'Mycelium + hemp',
    localPosition: [0.72, -0.02, 0.48],
    screenOffset: [126, 62],
    align: 'left',
  },
  {
    id: 'custom-moulds',
    label: 'Custom moulds, any shape',
    localPosition: [-0.76, -0.10, 0.44],
    screenOffset: [-128, 64],
    align: 'right',
  },
];

export interface LifecycleStepDefinition {
  id: 'grown' | 'protects' | 'composts';
  label: string;
  detail: string;
}

export const LIFECYCLE_STEPS: readonly LifecycleStepDefinition[] = [
  {
    id: 'grown',
    label: 'Grown in 7 days',
    detail: 'Mycelium + hemp hurd',
  },
  {
    id: 'protects',
    label: 'Protects in transit',
    detail: 'Custom-moulded cushioning',
  },
  {
    id: 'composts',
    label: 'Composts back to soil',
    detail: 'Returns to earth in 45 days',
  },
];

export interface Chapter5SubState {
  /** 0..1 convergence of glowing threads into the tray mould (0.72..0.80) */
  trayMorphProgress: number;
  /** 0..1 solidity/opacity of the resolved cream mycelium tray (0.76..0.815, exits 0.875..0.91) */
  traySolidOpacity: number;
  /** 0..1 studio lighting & seamless paper sweep reveal (lights up as tray forms, dims on exit to Ch 6) */
  studioLightness: number;
  /** 0..1 incoming foxfire thread glow that fades out completely (to 0) once studio is lit */
  foxfireGlowFade: number;
  /** 0..1 gentle settling of the fragile glass perfume bottle into the tray cavity */
  fragileObjectSettle: number;
  /** 0..1 sliding into place of the background family of grown forms (corner protector, bottle shipper, cap) */
  productFamilySlide: number;
  /** 0..1 overall visibility of the bottom Lifecycle Strip */
  lifecycleStripReveal: number;
  /** Individual 0..1 reveals for the 3 lifecycle steps */
  lifecycleStepReveals: [number, number, number];
}

export function clamp01(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  if (edge0 === edge1) return x >= edge1 ? 1 : 0;
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function lerpVec3(
  a: readonly [number, number, number],
  b: readonly [number, number, number],
  t: number,
): [number, number, number] {
  return [
    lerp(a[0], b[0], t),
    lerp(a[1], b[1], t),
    lerp(a[2], b[2], t),
  ];
}

/**
 * Pure Chapter 05 ("The material", progress ~0.72 -> 0.91, rest point 0.83) sub-progress choreography:
 * - Fully scrub-able and reversible from scroll progress.
 * - Threads converge in the dark (0.72..0.80), solid tray resolves (0.76..0.815),
 *   studio paper sweep and soft key light come up (0.775..0.822), foxfire glow drops to 0 once lit,
 *   the glass perfume flacon settles into the cavity (0.78..0.825), supporting grown forms slide in
 *   behind on the sweep (0.785..0.83), and the 3-step lifecycle strip reveals near the bottom (0.805..0.832).
 * - On exit toward Chapter 06 (0.87..0.91), the studio dims cleanly as the camera ascends to the forest floor.
 */
export function computeChapter5SubState(rawProgress: number): Chapter5SubState {
  const p = clamp01(rawProgress);

  const trayMorphIn = smoothstep(0.72, 0.80, p);
  const trayExit = 1 - smoothstep(0.875, 0.91, p);
  const trayMorphProgress = clamp01(trayMorphIn);
  const traySolidOpacity = clamp01(smoothstep(0.76, 0.812, p) * trayExit);

  const studioIn = smoothstep(0.77, 0.82, p);
  const studioOut = 1 - smoothstep(0.868, 0.905, p);
  const studioLightness = clamp01(studioIn * studioOut);

  // Incoming threads glow while converging in the dark, then fade out completely (to 0) once studio is lit
  const rawThreadEnv = Math.sin(Math.min(1, trayMorphProgress) * Math.PI);
  const studioCutoff = Math.max(0, 1 - smoothstep(0.785, 0.818, p));
  const foxfireGlowFade = clamp01(rawThreadEnv * studioCutoff * trayExit);

  const fragileObjectSettle = clamp01(smoothstep(0.778, 0.824, p) * studioOut);
  const productFamilySlide = clamp01(smoothstep(0.784, 0.828, p) * studioOut);

  const lifecycleStripReveal = clamp01(smoothstep(0.802, 0.828, p) * studioOut);
  const step1 = clamp01(smoothstep(0.802, 0.818, p) * studioOut);
  const step2 = clamp01(smoothstep(0.810, 0.824, p) * studioOut);
  const step3 = clamp01(smoothstep(0.817, 0.830, p) * studioOut);

  return {
    trayMorphProgress,
    traySolidOpacity,
    studioLightness,
    foxfireGlowFade,
    fragileObjectSettle,
    productFamilySlide,
    lifecycleStripReveal,
    lifecycleStepReveals: [step1, step2, step3],
  };
}

export interface ChapterProgressState {
  progress: number;
  activeChapterIndex: number;
  activeChapter: ChapterDefinition;
  chapterOpacities: number[];
  /** True when in Chapter 4a (close on the clump, where clump is inspectable) */
  isChapter4aClump: boolean;
  /** True when in Chapter 4b (wide network view, where thread pulse-clicking is active) */
  isChapter4bWide: boolean;
  /** 0..1 visibility of underground world (strata & network) */
  undergroundFactor: number;
  /** 0..1 growth of the foxfire mycelium network */
  networkGrowth: number;
  /** 0..1 visibility of the inspectable mycelium clump in Ch 4a */
  clumpReveal: number;
  /** 0..1 convergence of glowing threads into the molded tray in Ch 5 */
  trayMorphProgress: number;
  /** 0..1 opacity/solidity of the resolved molded tray in Ch 5 */
  traySolidOpacity: number;
  /** 0..1 warm product studio illumination & sweep backdrop in Ch 5 (0 in dark soil -> 1 in studio -> 0 on exit) */
  studioLightness: number;
  /** 0..1 incoming thread glow in Ch 5 (0 once studio is lit) */
  foxfireGlowFade: number;
  /** 0..1 settling of the fragile glass perfume bottle into the tray cavity in Ch 5 */
  fragileObjectSettle: number;
  /** 0..1 sliding into place of the background family of grown forms in Ch 5 */
  productFamilySlide: number;
  /** 0..1 visibility of the bottom Lifecycle Strip in Ch 5 */
  lifecycleStripReveal: number;
  /** Individual 0..1 reveals for the 3 lifecycle steps in Ch 5 */
  lifecycleStepReveals: [number, number, number];
  /** 0..1 fruiting progress of the fairy ring of new mushrooms in Ch 6 */
  fairyRingGrowth: number;
  /** 0..1 intensity of falling gill spores in Ch 2 */
  gillSporeIntensity: number;
}

export function getChapterStateAtProgress(rawProgress: number): ChapterProgressState {
  const progress = clamp01(rawProgress);

  let activeChapterIndex = 0;
  for (let i = 0; i < CHAPTERS.length; i++) {
    const ch = CHAPTERS[i];
    if (progress >= ch.startProgress && (progress < ch.endProgress || i === CHAPTERS.length - 1)) {
      activeChapterIndex = i;
      break;
    }
  }

  // Chapter 4 has two rest points:
  // 4a (0.45..0.585): close on the fist-sized mycelium clump (inspectable here and only here)
  // 4b (0.585..0.74): wide subterranean network view (pulse-clicking works here)
  const isChapter4aClump = activeChapterIndex === 3 && progress < 0.585;
  const isChapter4bWide = activeChapterIndex === 3 && progress >= 0.585;

  const baseChapter = CHAPTERS[activeChapterIndex];
  const activeChapter: ChapterDefinition =
    activeChapterIndex === 3
      ? {
          ...baseChapter,
          inspectableObject: isChapter4aClump ? 'clump' : null,
          inspectButtonLabel: isChapter4aClump ? 'Inspect mycelium clump' : undefined,
        }
      : baseChapter;

  const chapterOpacities = CHAPTERS.map((ch, idx) => {
    if (idx === 0) {
      return 1 - smoothstep(0.07, 0.125, progress);
    }
    if (idx === CHAPTERS.length - 1) {
      return smoothstep(0.91, 0.96, progress);
    }
    const fadeIn = smoothstep(ch.startProgress, ch.startProgress + 0.035, progress);
    const fadeOut = 1 - smoothstep(ch.endProgress - 0.035, ch.endProgress, progress);
    return Math.min(fadeIn, fadeOut);
  });

  // Underground factor: sinks below soil in Ch 3 (0.27..0.42), stays underground in Ch 4-5, rises back through soil layers in Ch 6 (0.88..0.95)
  const sinkDown = smoothstep(0.26, 0.36, progress);
  const riseBack = smoothstep(0.88, 0.95, progress);
  const undergroundFactor = clamp01(sinkDown * (1 - riseBack));

  // Network growth: ignites faintly in late Ch 3 subsoil cracks (0.42..0.53 -> 0.14), then spreads out of the clump across 4b (0.54..0.65 -> 1.0)
  const earlyIgnition = smoothstep(0.42, 0.53, progress) * 0.14;
  const mainSpread = smoothstep(0.54, 0.65, progress) * 0.86;
  const networkGrowth = clamp01(earlyIgnition + mainSpread);

  // Clump reveal: prominent in its soil pocket as camera approaches 4a (0.42..0.58), recedes as threads spread in 4b, fades out before Ch 5
  const clumpIn = smoothstep(0.41, 0.48, progress);
  const clumpOut = 1 - smoothstep(0.68, 0.74, progress);
  const clumpReveal = clamp01(clumpIn * clumpOut);

  // Chapter 5 sub-progress choreography (morph, solid tray, studio light reveal, fragile bottle settle, product family, lifecycle strip)
  const ch5Sub = computeChapter5SubState(progress);

  // Fairy ring of new mushrooms in Ch 6: pushes up as camera breaks out onto the forest floor
  const fairyRingGrowth = smoothstep(0.90, 0.985, progress);

  // Falling gill spores peak in Ch 2
  const gillIn = smoothstep(0.12, 0.165, progress);
  const gillOut = 1 - smoothstep(0.22, 0.27, progress);
  const gillSporeIntensity = clamp01(gillIn * gillOut);

  return {
    progress,
    activeChapterIndex,
    activeChapter,
    chapterOpacities,
    isChapter4aClump,
    isChapter4bWide,
    undergroundFactor,
    networkGrowth,
    clumpReveal,
    trayMorphProgress: ch5Sub.trayMorphProgress,
    traySolidOpacity: ch5Sub.traySolidOpacity,
    studioLightness: ch5Sub.studioLightness,
    foxfireGlowFade: ch5Sub.foxfireGlowFade,
    fragileObjectSettle: ch5Sub.fragileObjectSettle,
    productFamilySlide: ch5Sub.productFamilySlide,
    lifecycleStripReveal: ch5Sub.lifecycleStripReveal,
    lifecycleStepReveals: ch5Sub.lifecycleStepReveals,
    fairyRingGrowth,
    gillSporeIntensity,
  };
}

export function getNearestChapterSnapProgress(rawProgress: number): number {
  const progress = clamp01(rawProgress);
  let bestRest = ALL_REST_POINTS[0];
  let bestDist = Math.abs(progress - bestRest);

  for (let i = 1; i < ALL_REST_POINTS.length; i++) {
    const dist = Math.abs(progress - ALL_REST_POINTS[i]);
    if (dist < bestDist) {
      bestDist = dist;
      bestRest = ALL_REST_POINTS[i];
    }
  }
  return bestRest;
}

export function getNextChapterProgress(currentProgress: number, direction: 1 | -1): number {
  const progress = clamp01(currentProgress);
  let closestIdx = 0;
  let minDiff = Infinity;
  for (let i = 0; i < ALL_REST_POINTS.length; i++) {
    const diff = Math.abs(progress - ALL_REST_POINTS[i]);
    if (diff < minDiff) {
      minDiff = diff;
      closestIdx = i;
    }
  }

  if (direction === 1 && progress > ALL_REST_POINTS[closestIdx] + 0.025) {
    const nextIdx = Math.min(ALL_REST_POINTS.length - 1, closestIdx + 1);
    return ALL_REST_POINTS[nextIdx];
  }
  if (direction === -1 && progress < ALL_REST_POINTS[closestIdx] - 0.025) {
    return ALL_REST_POINTS[closestIdx];
  }

  const targetIdx = Math.max(0, Math.min(ALL_REST_POINTS.length - 1, closestIdx + direction));
  return ALL_REST_POINTS[targetIdx];
}

export interface CameraKeyframe {
  progress: number;
  position: readonly [number, number, number];
  target: readonly [number, number, number];
  fov: number;
  focusDistance: number;
}

/**
 * Curved Catmull-Rom spline camera waypoints across 0 -> 1:
 * - 0.00 (Ch 1 rest): Macro close-up of the parasol mushroom on the damp mossy floor
 * - 0.18 (Ch 2 rest): Camera drops low and tilts up beneath the cap so radiating gills fill the frame
 * - 0.26 (Pre-descent): Camera pulls just outside the cap rim framing the mushroom bulb, moss tufts, and leaf litter
 * - 0.29 (Breaking ground): Ground surface line passes up through the frame with moss, leaves, and bulb in silhouette
 * - 0.35 (Ch 3 rest): Camera slides down beside the cut earth face through leaf litter, humus, and root hairs
 * - 0.43 (Topsoil & Subsoil): Camera passes the diagonal branching tree root, pebbles, and redder clay with rocks & foxfire cracks
 * - 0.52 (Ch 4a rest): Close on the fist-sized mycelium clump nestled inside its earthen pocket at [0, -2.55, 0]
 * - 0.66 (Ch 4b rest): Camera pulls far back underground to reveal the vast bioluminescent network
 * - 0.83 (Ch 5 rest): Three-quarter overhead product studio framing of the molded packaging tray (~44% viewport width) at [0, -5.45, 0]
 * - 0.91 (Ascent): Camera rises back up through the deep earth, humus, roots, and leaf litter without intersecting models
 * - 1.00 (Ch 6 rest): Above the forest floor framing the hero mushroom and the newly fruited fairy ring
 */
export const CAMERA_KEYFRAMES: readonly CameraKeyframe[] = [
  {
    progress: 0.0,
    position: [0.0, 2.38, 6.25],
    target: [0.0, 1.92, 0.0],
    fov: 36,
    focusDistance: 6.25,
  },
  {
    progress: 0.18,
    position: [0.0, 1.38, 1.38],
    target: [0.0, 3.06, 0.0],
    fov: 44,
    focusDistance: 1.92,
  },
  {
    progress: 0.26,
    position: [0.16, 0.36, 2.46],
    target: [0.0, 0.18, 0.0],
    fov: 39,
    focusDistance: 2.46,
  },
  {
    progress: 0.29,
    position: [0.05, 0.02, 2.32],
    target: [0.0, -0.05, 0.0],
    fov: 38,
    focusDistance: 2.32,
  },
  {
    progress: 0.35,
    position: [0.0, -0.88, 2.26],
    target: [0.0, -0.96, 0.0],
    fov: 38,
    focusDistance: 2.26,
  },
  {
    progress: 0.43,
    position: [0.0, -1.74, 2.28],
    target: [0.0, -1.82, 0.0],
    fov: 37,
    focusDistance: 2.28,
  },
  {
    progress: REST_POINT_4A,
    position: [0.0, -2.42, 2.35],
    target: [0.0, -2.55, 0.0],
    fov: 36,
    focusDistance: 2.35,
  },
  {
    progress: REST_POINT_4B,
    position: [0.0, -1.75, 12.6],
    target: [0.0, -1.35, 0.0],
    fov: 45,
    focusDistance: 11.5,
  },
  {
    progress: 0.83,
    position: [0.0, -3.72, 4.92],
    target: [-0.06, -5.42, -0.16],
    fov: 35,
    focusDistance: 5.18,
  },
  {
    progress: 0.91,
    position: [-0.45, -1.15, 4.85],
    target: [0.0, -0.65, 0.0],
    fov: 40,
    focusDistance: 4.85,
  },
  {
    progress: 1.0,
    position: [0.0, 2.85, 7.35],
    target: [0.0, 1.55, 0.0],
    fov: 38,
    focusDistance: 7.35,
  },
];

function catmullRomScalar(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const t2 = t * t;
  const t3 = t2 * t;
  return (
    0.5 *
    (2 * p1 +
      (-p0 + p2) * t +
      (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
      (-p0 + 3 * p1 - 3 * p2 + p3) * t3)
  );
}

function catmullRomVec3(
  p0: readonly [number, number, number],
  p1: readonly [number, number, number],
  p2: readonly [number, number, number],
  p3: readonly [number, number, number],
  t: number,
): [number, number, number] {
  return [
    catmullRomScalar(p0[0], p1[0], p2[0], p3[0], t),
    catmullRomScalar(p0[1], p1[1], p2[1], p3[1], t),
    catmullRomScalar(p0[2], p1[2], p2[2], p3[2], t),
  ];
}

export interface ComputedCameraPose {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  focusDistance: number;
}

export function computeCameraPoseAtProgress(rawProgress: number): ComputedCameraPose {
  const p = clamp01(rawProgress);
  const n = CAMERA_KEYFRAMES.length;

  for (let i = 0; i < n - 1; i++) {
    const k1 = CAMERA_KEYFRAMES[i];
    const k2 = CAMERA_KEYFRAMES[i + 1];
    if (p >= k1.progress && p <= k2.progress) {
      const k0 = CAMERA_KEYFRAMES[Math.max(0, i - 1)];
      const k3 = CAMERA_KEYFRAMES[Math.min(n - 1, i + 2)];
      // Smooth easing at rest points
      const linearT = clamp01((p - k1.progress) / Math.max(1e-6, k2.progress - k1.progress));
      const easedT = smoothstep(0, 1, linearT);

      const pos = catmullRomVec3(k0.position, k1.position, k2.position, k3.position, easedT);
      const target = catmullRomVec3(k0.target, k1.target, k2.target, k3.target, easedT);

      // Guard so above-ground segments (Ch 1 -> Ch 2) never dip below forest floor y = 0.25
      if (p < 0.25 && pos[1] < 0.25) {
        pos[1] = 0.25;
      }

      // Guard so the large pull-back at 4b (z = 12.6) never causes Catmull-Rom z-undershoot during the 0.26..0.52 soil descent
      if (p >= 0.26 && p <= REST_POINT_4A) {
        const minSegmentZ = Math.min(k1.position[2], k2.position[2]);
        const maxSegmentZ = Math.max(k1.position[2], k2.position[2]);
        pos[2] = Math.max(minSegmentZ, Math.min(maxSegmentZ, pos[2]));
      }

      return {
        position: pos,
        target,
        fov: lerp(k1.fov, k2.fov, easedT),
        focusDistance: lerp(k1.focusDistance, k2.focusDistance, easedT),
      };
    }
  }

  const last = CAMERA_KEYFRAMES[n - 1];
  return {
    position: [...last.position],
    target: [...last.target],
    fov: last.fov,
    focusDistance: last.focusDistance,
  };
}

export const DEFAULT_SUNLIGHT = 0.75;

export interface SunlightAtmosphereState {
  sunlight: number;
  timeLabel: string;
  /** Directional sun offset [dx, dy, dz] relative to the current scene target */
  sunOffset: [number, number, number];
  /** Normalized RGB [0..1, 0..1, 0..1] of the directional sun light */
  sunColorRgb: [number, number, number];
  /** Hex string of the directional sun light */
  sunColorHex: string;
  /** Multiplier on directional sun intensity (low at dusk -> full overhead at midday) */
  sunIntensityMultiplier: number;
  /** Multiplier on hemisphere/ambient fill light */
  ambientIntensityMultiplier: number;
  /** Multiplier on specimen rim light (stronger rim at dusk) */
  rimIntensityMultiplier: number;
  /** Balanced renderer toneMappingExposure across 0..1 */
  toneMappingExposure: number;
  /** Multiplier on shaft-of-light / spore mote brightness above ground */
  godRayOpacityMultiplier: number;
  /** Normalized RGB [0..1] for above-ground 3D background and fog */
  surfaceBgRgb: [number, number, number];
  /** Synchronized 2D CSS custom properties for page atmosphere harmonization */
  cssVars: {
    '--page-bg': string;
    '--sky-ambient': string;
    '--text-contrast': string;
    '--sun-accent': string;
  };
}

function rgbToHex(rgb: readonly [number, number, number]): string {
  const toByte = (v: number) =>
    Math.max(0, Math.min(255, Math.round(v * 255)))
      .toString(16)
      .padStart(2, '0');
  return `#${toByte(rgb[0])}${toByte(rgb[1])}${toByte(rgb[2])}`;
}

/**
 * Pure calculation mapping the normalized Sunlight / Time-of-Day slider value
 * (0.0 = Dusk/Night -> 0.75 = Default Morning -> 1.0 = Bright Midday Sun)
 * to 3D directional sun arc, color temperature, exposure, and 2D CSS atmosphere variables.
 */
export function computeSunlightState(rawSunlight: number): SunlightAtmosphereState {
  const s = clamp01(rawSunlight);

  // 1. Sun arc across the sky: low grazing horizon angle at 0.0 -> overhead at 1.0
  const azimuth = lerp(-1.22, -0.28, s);
  const elevation = lerp(0.18, 1.30, s);
  const radius = 7.2;
  const sunOffset: [number, number, number] = [
    Math.sin(azimuth) * Math.cos(elevation) * radius,
    Math.sin(elevation) * radius,
    Math.cos(azimuth) * Math.cos(elevation) * radius,
  ];

  // 2. Color temperature stops:
  //    0.00: Dusk ember (#ff8a3d) -> 0.35: Golden hour (#ffa751) -> 0.75: Warm morning (#f7e7ce) -> 1.00: Crisp midday (#f4f8fb)
  const stop0: [number, number, number] = [1.0, 0.541, 0.239]; // #ff8a3d
  const stop1: [number, number, number] = [1.0, 0.655, 0.318]; // #ffa751
  const stop2: [number, number, number] = [0.969, 0.906, 0.808]; // #f7e7ce
  const stop3: [number, number, number] = [0.957, 0.973, 0.984]; // #f4f8fb

  let sunColorRgb: [number, number, number];
  if (s < 0.35) {
    sunColorRgb = lerpVec3(stop0, stop1, s / 0.35);
  } else if (s < 0.75) {
    sunColorRgb = lerpVec3(stop1, stop2, (s - 0.35) / 0.4);
  } else {
    sunColorRgb = lerpVec3(stop2, stop3, (s - 0.75) / 0.25);
  }
  const sunColorHex = rgbToHex(sunColorRgb);

  // 3. Light intensity & tone mapping exposure curves (calibrated to prevent white clipping)
  const sunIntensityMultiplier = lerp(0.36, 1.35, Math.pow(s, 0.85));
  const ambientIntensityMultiplier = lerp(0.55, 1.45, s);
  const rimIntensityMultiplier = lerp(1.38, 0.88, s);
  const toneMappingExposure = lerp(0.66, 0.83, s);
  const godRayOpacityMultiplier = lerp(0.28, 1.48, s);

  // 4. Above-ground forest canopy background & 2D CSS variables
  const bgDusk: [number, number, number] = [0.024, 0.020, 0.029]; // #060507
  const bgGolden: [number, number, number] = [0.047, 0.031, 0.020]; // #0c0805
  const bgMorning: [number, number, number] = [0.031, 0.024, 0.016]; // #080604
  const bgMidday: [number, number, number] = [0.086, 0.106, 0.078]; // #161b14

  let surfaceBgRgb: [number, number, number];
  if (s < 0.35) {
    surfaceBgRgb = lerpVec3(bgDusk, bgGolden, s / 0.35);
  } else if (s < 0.75) {
    surfaceBgRgb = lerpVec3(bgGolden, bgMorning, (s - 0.35) / 0.4);
  } else {
    surfaceBgRgb = lerpVec3(bgMorning, bgMidday, (s - 0.75) / 0.25);
  }

  const pageBgHex = rgbToHex(surfaceBgRgb);
  const textRgb = lerpVec3([0.91, 0.875, 0.816], [0.98, 0.965, 0.933], s);
  const textHex = rgbToHex(textRgb);

  const skyR = Math.round(sunColorRgb[0] * 255);
  const skyG = Math.round(sunColorRgb[1] * 255);
  const skyB = Math.round(sunColorRgb[2] * 255);
  const skyAlpha = (0.07 + s * 0.11).toFixed(3);

  const timeLabel =
    s < 0.22
      ? 'Dusk'
      : s < 0.55
        ? 'Golden hour'
        : s < 0.85
          ? 'Morning'
          : 'Midday';

  return {
    sunlight: s,
    timeLabel,
    sunOffset,
    sunColorRgb,
    sunColorHex,
    sunIntensityMultiplier,
    ambientIntensityMultiplier,
    rimIntensityMultiplier,
    toneMappingExposure,
    godRayOpacityMultiplier,
    surfaceBgRgb,
    cssVars: {
      '--page-bg': pageBgHex,
      '--sky-ambient': `rgba(${skyR}, ${skyG}, ${skyB}, ${skyAlpha})`,
      '--text-contrast': textHex,
      '--sun-accent': sunColorHex,
    },
  };
}

