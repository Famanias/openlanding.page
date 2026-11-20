import type {
  AnimationPhaseInfo,
  FlowerSpec,
  TimelineSnapshot,
  ViewportTransform,
} from './types';

export const TIMELINE_DURATION_SEC = 18.0;
export const LOOP_HOLD_SEC = 3.0;
export const LOOP_DISSOLVE_SEC = 2.6;
export const VIRTUAL_WIDTH = 1920;
export const VIRTUAL_HEIGHT = 1080;

export const ANIMATION_PHASES: AnimationPhaseInfo[] = [
  {
    id: 'phase-01',
    number: '01',
    name: 'The Empty Canvas',
    startSec: 0,
    endSec: 2,
    description: 'Aged ivory fibers, archival stains, and faint paper creases emerge.',
  },
  {
    id: 'phase-02',
    number: '02',
    name: 'First Ink Marks',
    startSec: 2,
    endSec: 4,
    description: 'Primary stems, twisting branches, and fine roots trace across the paper.',
  },
  {
    id: 'phase-03',
    number: '03',
    name: 'Pigment Bleed',
    startSec: 4,
    endSec: 7,
    description: 'Burgundy and charcoal pigment diffuse through paper fibers.',
  },
  {
    id: 'phase-04',
    number: '04',
    name: 'Flower Bud Formation',
    startSec: 6,
    endSec: 9,
    description: 'Calyxes and tight buds swell along completed stem tips.',
  },
  {
    id: 'phase-05',
    number: '05',
    name: 'The Blooming Sequence',
    startSec: 8,
    endSec: 13,
    description: 'Layered roses and peonies unfold in staggered botanical choreography.',
  },
  {
    id: 'phase-06',
    number: '06',
    name: 'Botanical Collage Development',
    startSec: 12,
    endSec: 15,
    description: 'Torn archival paper scraps settle and copperplate engravings print.',
  },
  {
    id: 'phase-07',
    number: '07',
    name: 'Grunge & Final Pigment Marks',
    startSec: 14,
    endSec: 17,
    description: 'Dry-brush wine streaks, dark splatters, and root filigree complete.',
  },
  {
    id: 'phase-08',
    number: '08',
    name: 'Completed Artwork',
    startSec: 17,
    endSec: 18,
    description: 'Final settling into the living mixed-media botanical canvas.',
  },
];

export function clamp01(v: number): number {
  if (v <= 0) return 0;
  if (v >= 1) return 1;
  return v;
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  if (edge1 <= edge0) return x >= edge1 ? 1 : 0;
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

export function easeOutCubic(t: number): number {
  const c = clamp01(t);
  return 1 - Math.pow(1 - c, 3);
}

export function easeInOutCubic(t: number): number {
  const c = clamp01(t);
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
}

export function easeOutQuart(t: number): number {
  const c = clamp01(t);
  return 1 - Math.pow(1 - c, 4);
}

export function easeOutBackSubtle(t: number): number {
  const c = clamp01(t);
  const c1 = 0.65;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(c - 1, 3) + c1 * Math.pow(c - 1, 2);
}

/**
 * Computes normalized progress [0..1] for an event starting at startSec over durationSec.
 */
export function segmentProgress(timeSec: number, startSec: number, durationSec: number): number {
  if (durationSec <= 0) return timeSec >= startSec ? 1 : 0;
  return clamp01((timeSec - startSec) / durationSec);
}

/**
 * Resolves the active display phase for any timestamp in [0, 18].
 * Overlapping artistic stages transition at clean milestone thresholds for clear UI readout.
 */
export function getPhaseForTime(timeSec: number): AnimationPhaseInfo {
  const t = Math.max(0, Math.min(TIMELINE_DURATION_SEC, timeSec));
  if (t < 2.0) return ANIMATION_PHASES[0];
  if (t < 4.0) return ANIMATION_PHASES[1];
  if (t < 6.4) return ANIMATION_PHASES[2];
  if (t < 8.4) return ANIMATION_PHASES[3];
  if (t < 12.4) return ANIMATION_PHASES[4];
  if (t < 14.4) return ANIMATION_PHASES[5];
  if (t < 17.0) return ANIMATION_PHASES[6];
  return ANIMATION_PHASES[7];
}

/**
 * Evaluates a deterministic TimelineSnapshot from any timestamp `timeSec`.
 */
export function evaluateTimeline(
  timeSec: number,
  options?: {
    ambientClockSec?: number;
    visibilityEnvelope?: number;
    reducedMotion?: boolean;
  }
): TimelineSnapshot {
  const reducedMotion = options?.reducedMotion ?? false;
  const effectiveTime = reducedMotion
    ? TIMELINE_DURATION_SEC
    : Math.max(0, Math.min(TIMELINE_DURATION_SEC, timeSec));

  const progress = effectiveTime / TIMELINE_DURATION_SEC;
  const phase = getPhaseForTime(effectiveTime);
  const paperAging = easeInOutCubic(segmentProgress(effectiveTime, 0.15, 2.2));
  const settleFactor = easeOutCubic(segmentProgress(effectiveTime, 16.8, 1.2));
  const ambientWeight = reducedMotion
    ? 0
    : smoothstep(16.5, 18.0, effectiveTime);

  return {
    timeSec: effectiveTime,
    progress,
    phase,
    paperAging,
    settleFactor,
    ambientWeight,
    visibilityEnvelope: options?.visibilityEnvelope ?? 1,
    ambientClockSec: reducedMotion ? 0 : (options?.ambientClockSec ?? 0),
  };
}

export interface LoopAdvanceResult {
  timeSec: number;
  loopPhase: 'playing' | 'holding' | 'dissolving';
  loopTimerSec: number;
  visibilityEnvelope: number;
  isPlaying: boolean;
}

/**
 * Pure state machine advancing the timeline with optional looping
 * (18s build -> 3s hold -> 2.6s deliberate reverse/dissolve -> restart).
 */
export function advanceTimelineState(state: {
  timeSec: number;
  loopPhase: 'playing' | 'holding' | 'dissolving';
  loopTimerSec: number;
  isPlaying: boolean;
  loop: boolean;
  speed: number;
  dtSec: number;
}): LoopAdvanceResult {
  if (!state.isPlaying) {
    return {
      timeSec: state.timeSec,
      loopPhase: state.loopPhase,
      loopTimerSec: state.loopTimerSec,
      visibilityEnvelope: 1,
      isPlaying: false,
    };
  }

  const dt = Math.max(0, Math.min(0.1, state.dtSec)) * state.speed;

  if (state.loopPhase === 'playing') {
    const nextTime = state.timeSec + dt;
    if (nextTime >= TIMELINE_DURATION_SEC) {
      if (state.loop) {
        return {
          timeSec: TIMELINE_DURATION_SEC,
          loopPhase: 'holding',
          loopTimerSec: 0,
          visibilityEnvelope: 1,
          isPlaying: true,
        };
      }
      return {
        timeSec: TIMELINE_DURATION_SEC,
        loopPhase: 'playing',
        loopTimerSec: 0,
        visibilityEnvelope: 1,
        isPlaying: false,
      };
    }
    return {
      timeSec: nextTime,
      loopPhase: 'playing',
      loopTimerSec: 0,
      visibilityEnvelope: 1,
      isPlaying: true,
    };
  }

  if (state.loopPhase === 'holding') {
    if (!state.loop) {
      return {
        timeSec: TIMELINE_DURATION_SEC,
        loopPhase: 'playing',
        loopTimerSec: 0,
        visibilityEnvelope: 1,
        isPlaying: false,
      };
    }
    const nextHold = state.loopTimerSec + Math.max(0, Math.min(0.1, state.dtSec));
    if (nextHold >= LOOP_HOLD_SEC) {
      return {
        timeSec: TIMELINE_DURATION_SEC,
        loopPhase: 'dissolving',
        loopTimerSec: 0,
        visibilityEnvelope: 1,
        isPlaying: true,
      };
    }
    return {
      timeSec: TIMELINE_DURATION_SEC,
      loopPhase: 'holding',
      loopTimerSec: nextHold,
      visibilityEnvelope: 1,
      isPlaying: true,
    };
  }

  // Dissolving / deliberate reverse transition back toward blank paper
  if (!state.loop) {
    return {
      timeSec: state.timeSec,
      loopPhase: 'playing',
      loopTimerSec: 0,
      visibilityEnvelope: 1,
      isPlaying: false,
    };
  }

  const nextDissolve = state.loopTimerSec + Math.max(0, Math.min(0.1, state.dtSec));
  const dissolveRatio = clamp01(nextDissolve / LOOP_DISSOLVE_SEC);

  if (dissolveRatio >= 1) {
    return {
      timeSec: 0,
      loopPhase: 'playing',
      loopTimerSec: 0,
      visibilityEnvelope: 1,
      isPlaying: true,
    };
  }

  // Deliberately unwind the timeline while softening pigment opacity smoothly
  const rewoundTime = TIMELINE_DURATION_SEC * (1 - easeInOutCubic(dissolveRatio));
  const envelope = 1 - smoothstep(0.35, 1.0, dissolveRatio);

  return {
    timeSec: rewoundTime,
    loopPhase: 'dissolving',
    loopTimerSec: nextDissolve,
    visibilityEnvelope: envelope,
    isPlaying: true,
  };
}

export interface FlowerGrowthEvaluation {
  /** 0 = invisible, 0..1 = bud swelling & calyx separation */
  budProgress: number;
  /** 0 = tight bud, 1 = fully opened bloom */
  bloomProgress: number;
  /** 0..1 sepal opening */
  sepalOpen: number;
  /** 0..1 outer petals unfolding */
  outerOpen: number;
  /** 0..1 middle petals unfolding */
  midOpen: number;
  /** 0..1 inner petals unfolding */
  innerOpen: number;
  /** 0..1 core / stamens reveal */
  coreOpen: number;
  /** Overall scale factor anchored to stem tip */
  headScale: number;
  /** Subtle organic head rotation during development */
  rotationOffset: number;
}

/**
 * Deterministically evaluates a single flower's multi-stage anatomical growth
 * (bud -> sepals -> outer petals -> mid petals -> inner petals -> resting bloom).
 */
export function evaluateFlowerGrowth(
  flower: FlowerSpec,
  timeSec: number,
  animateGrowth: boolean
): FlowerGrowthEvaluation {
  if (!animateGrowth) {
    return {
      budProgress: 1,
      bloomProgress: flower.maxOpenness,
      sepalOpen: 1,
      outerOpen: flower.maxOpenness,
      midOpen: flower.maxOpenness,
      innerOpen: flower.maxOpenness,
      coreOpen: 1,
      headScale: 1,
      rotationOffset: 0,
    };
  }

  const rawBud = segmentProgress(timeSec, flower.budStartSec, flower.budDurationSec);
  const budProgress = easeOutCubic(rawBud);

  const rawBloom = segmentProgress(timeSec, flower.bloomStartSec, flower.bloomDurationSec);
  const bloomEased = easeInOutCubic(rawBloom);

  // Staggered anatomical unfolding: sepals separate first, then outer, mid, inner petals
  const stagger = flower.petalStagger;
  const sepalOpen = easeOutCubic(clamp01(rawBud * 0.65 + rawBloom * 0.85));
  const outerOpen = easeOutQuart(clamp01((rawBloom - 0.0) / Math.max(0.25, 0.72 - stagger * 0.1))) * flower.maxOpenness;
  const midOpen = easeInOutCubic(clamp01((rawBloom - 0.12 - stagger * 0.06) / 0.68)) * flower.maxOpenness;
  const innerOpen = easeInOutCubic(clamp01((rawBloom - 0.28 - stagger * 0.08) / 0.65)) * flower.maxOpenness;
  const coreOpen = smoothstep(0.32, 0.88, rawBloom);

  // Bud swells cleanly from 0 -> 0.34 during bud phase, then expands smoothly to 1.0 as petals open
  const headScale =
    budProgress <= 0
      ? 0
      : 0.16 * budProgress + 0.2 * easeOutCubic(rawBud) + 0.64 * easeOutCubic(rawBloom);

  // Subtle organic orientation twist as the flower turns toward the viewer
  const rotationOffset = (1 - easeOutCubic(rawBloom)) * (flower.irregularity - 0.5) * 0.36;

  return {
    budProgress,
    bloomProgress: bloomEased * flower.maxOpenness,
    sepalOpen,
    outerOpen,
    midOpen,
    innerOpen,
    coreOpen,
    headScale,
    rotationOffset,
  };
}

/**
 * Computes responsive virtual-to-viewport framing transform.
 * - Desktop / landscape: full-bleed cover anchored to the right side so the
 *   negative space on the left 40-45% and the dense botanical cluster on the right
 *   always remain balanced without cropping the main roses.
 * - Mobile / portrait: dedicated responsive composition that frames the primary
 *   botanical cluster (center-right roses, peony, burgundy rose, engraved flower)
 *   in the lower 62% of the viewport while preserving aged paper negative space
 *   at the top for future mobile headlines.
 */
export function computeViewportTransform(
  viewportWidth: number,
  viewportHeight: number
): ViewportTransform {
  const vw = Math.max(320, viewportWidth);
  const vh = Math.max(320, viewportHeight);
  const aspect = vw / vh;
  const isMobile = aspect < 0.88 || vw < 768;

  if (isMobile) {
    // Frame art region x=[650..1920] (width ~1270) across mobile width,
    // shifted downward to leave ~30% open aged parchment above the arrangement.
    const focusWidth = 1240;
    const scale = Math.max(vw / focusWidth, (vh * 0.72) / VIRTUAL_HEIGHT);
    const artRightEdge = VIRTUAL_WIDTH * scale;
    // Align right side neatly with slight bleed so outer petals kiss screen edge
    const offsetX = vw - artRightEdge + 42 * scale;
    const offsetY = vh - VIRTUAL_HEIGHT * scale + 36 * scale;
    return {
      scale,
      offsetX,
      offsetY,
      isMobile: true,
      virtualWidth: VIRTUAL_WIDTH,
      virtualHeight: VIRTUAL_HEIGHT,
    };
  }

  // Desktop / tablet landscape: full-bleed cover with right-weighted anchor
  const scaleX = vw / VIRTUAL_WIDTH;
  const scaleY = vh / VIRTUAL_HEIGHT;
  const scale = Math.max(scaleX, scaleY);
  // Keep right edge aligned to viewport right edge so the botanical arrangement never gets clipped
  const offsetX = vw - VIRTUAL_WIDTH * scale;
  const offsetY = (vh - VIRTUAL_HEIGHT * scale) * 0.5;

  return {
    scale,
    offsetX,
    offsetY,
    isMobile: false,
    virtualWidth: VIRTUAL_WIDTH,
    virtualHeight: VIRTUAL_HEIGHT,
  };
}
