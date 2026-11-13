import { FOLD_CONSTANTS } from './config';
import { clamp } from '../motion/math';
import { normalizeOpening } from './geometry';

function easeOutCubic(t: number): number {
  const c = clamp(t, 0, 1);
  return 1 - Math.pow(1 - c, 3);
}

function easeInOutCubic(t: number): number {
  const c = clamp(t, 0, 1);
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
}

export interface UnfoldChoreographyFrame {
  panelOpenings: number[];
  averageOpening: number;
  glintProgress: number; // 0..1 across interior hinges 1..15 during gather highlight
  done: boolean;
}

export const ENTRANCE_DURATION_SEC = 2.65;
export const DEMO_FOLD_DURATION_SEC = 3.25;

/**
 * Gently underdamped mechanical spring curve with <= 2.5% settle follow-through,
 * mapping local t in [0, 1] -> [0, ~1.025 -> 1.0].
 */
function accordionSettleCurve(t: number): number {
  const c = clamp(t, 0, 1);
  if (c >= 1) return 1;
  if (c <= 0) return 0;
  // Smooth cubic rise into soft damped settle
  const base = 1 - Math.pow(1 - c, 3);
  const overshoot =
    c > 0.45
      ? Math.sin(((c - 0.45) / 0.55) * Math.PI) * 0.032 * (1 - c)
      : 0;
  return base + overshoot;
}

/**
 * Signature entrance unfolding sequence:
 * - 0.00–0.32s: compact gathered sculptural silhouette (~4%) while light sweeps hinges
 * - 0.32–2.45s: sequential coupled progression propagating from leading panels (0)
 *               through middle pleats to trailing panels (15) with subtle inertial settle
 * - >= 2.65s: cleanly settled uniform targetOpening across all 16 panels
 */
export function computeEntranceChoreography(
  elapsedSec: number,
  targetOpeningInput: number,
  reducedMotion = false,
): UnfoldChoreographyFrame {
  const target = normalizeOpening(targetOpeningInput);
  const N = FOLD_CONSTANTS.panels;

  if (reducedMotion || elapsedSec >= ENTRANCE_DURATION_SEC) {
    const panelOpenings = new Array<number>(N).fill(target);
    return {
      panelOpenings,
      averageOpening: target,
      glintProgress: 1,
      done: true,
    };
  }

  const t = Math.max(0, elapsedSec);
  const gatherFloor = Math.min(target, 4);
  const glintProgress = clamp((t - 0.12) / 0.85, 0, 1);

  const startDelay = 0.28;
  const panelDuration = 1.48;
  const waveLag = 0.045; // 15 * 0.045 = 0.675s total stagger across the ribbon

  const panelOpenings = new Array<number>(N);
  let sum = 0;

  for (let i = 0; i < N; i += 1) {
    const pStart = startDelay + i * waveLag;
    const localT = clamp((t - pStart) / panelDuration, 0, 1);
    const k = accordionSettleCurve(localT);
    const val = normalizeOpening(gatherFloor + (target - gatherFloor) * k);
    panelOpenings[i] = val;
    sum += val;
  }

  return {
    panelOpenings,
    averageOpening: sum / N,
    glintProgress,
    done: false,
  };
}

/**
 * Interactive "See how it folds" cycle:
 * - 0.00–0.65s: smoothly gathers from current opening down to 4% compact pleats (outside-in feel)
 * - 0.65–0.85s: poised compact hold showing gathered depth
 * - 0.85–2.30s: progressive accordion wave unfolds from 4% -> 88% extended span
 * - 2.30–3.25s: settles smoothly back into anchorOpening
 */
export function computeDemoFoldChoreography(
  elapsedSec: number,
  anchorOpeningInput: number,
  reducedMotion = false,
): UnfoldChoreographyFrame {
  const anchor = normalizeOpening(anchorOpeningInput);
  const N = FOLD_CONSTANTS.panels;

  if (reducedMotion || elapsedSec >= DEMO_FOLD_DURATION_SEC) {
    const panelOpenings = new Array<number>(N).fill(anchor);
    return {
      panelOpenings,
      averageOpening: anchor,
      glintProgress: 1,
      done: true,
    };
  }

  const t = Math.max(0, elapsedSec);
  const gatherVal = 4;
  const showcasePeak = Math.max(86, anchor);
  const panelOpenings = new Array<number>(N);
  let sum = 0;

  for (let i = 0; i < N; i += 1) {
    let val: number;

    if (t < 0.65) {
      // Phase 1: outside panels lead gather slightly inward
      const edgeDist = Math.abs(i - (N - 1) * 0.5) / ((N - 1) * 0.5);
      const stagger = (1 - edgeDist) * 0.14;
      const u = clamp((t - stagger) / (0.65 - 0.14), 0, 1);
      val = anchor + (gatherVal - anchor) * easeInOutCubic(u);
    } else if (t < 0.85) {
      // Phase 2: brief poised hold
      val = gatherVal;
    } else if (t < 2.30) {
      // Phase 3: coupled accordion unfold wave leading panel 0 -> 15
      const pStart = 0.85 + i * 0.032;
      const pDur = 0.92;
      const u = clamp((t - pStart) / pDur, 0, 1);
      val = gatherVal + (showcasePeak - gatherVal) * accordionSettleCurve(u);
    } else {
      // Phase 4: smooth settle back to anchor opening
      const pStart = 2.30 + (N - 1 - i) * 0.015;
      const pDur = 0.72;
      const u = clamp((t - pStart) / pDur, 0, 1);
      val = showcasePeak + (anchor - showcasePeak) * easeOutCubic(u);
    }

    const clamped = normalizeOpening(val);
    panelOpenings[i] = clamped;
    sum += clamped;
  }

  return {
    panelOpenings,
    averageOpening: sum / N,
    glintProgress: clamp((t - 0.6) / 0.5, 0, 1),
    done: false,
  };
}
