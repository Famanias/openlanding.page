import {
  DESTINATIONS,
  type DestinationId,
  type PhotoStyleId,
  type StampStyleId,
} from './sampleMemories';

export const POSTCARD_NOTE_MAX_LENGTH = 180;

export type BuilderStageIndex = 0 | 1 | 2;

export interface BuilderStageMetrics {
  activeStage: BuilderStageIndex;
  /** 1-indexed label: "1/3", "2/3", "3/3" */
  stepCounterLabel: '1/3' | '2/3' | '3/3';
  /** Normalized progress within the current stage's dwell window [0..1] */
  stageLocalProgress: number;
  /** Individual visibility weights [0..1] for stages 0, 1, 2 */
  stageWeights: [number, number, number];
}

export interface PostcardBuilderState {
  destinationId: DestinationId;
  photoStyleId: PhotoStyleId;
  stampStyleId: StampStyleId;
  note: string;
}

export interface RectBounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export function clamp01(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

/**
 * Deterministic scroll progress mapping for Chapter 03 (Postcard Builder).
 * Honors required plateaus:
 * - 0.00–0.30: Stage 1 (index 0) active & dwelling
 * - 0.30–0.33: Transition 1 -> 2
 * - 0.33–0.64: Stage 2 (index 1) active & dwelling
 * - 0.64–0.67: Transition 2 -> 3
 * - 0.67–1.00: Stage 3 (index 2) active & held through release
 */
export function getBuilderStageFromProgress(rawProgress: number): BuilderStageMetrics {
  const p = clamp01(rawProgress);

  let activeStage: BuilderStageIndex = 0;
  let stageLocalProgress = 0;
  let w0 = 0;
  let w1 = 0;
  let w2 = 0;

  if (p < 0.30) {
    activeStage = 0;
    stageLocalProgress = clamp01(p / 0.30);
    w0 = 1;
    w1 = 0;
    w2 = 0;
  } else if (p < 0.33) {
    const t = (p - 0.30) / 0.03;
    activeStage = t >= 0.5 ? 1 : 0;
    stageLocalProgress = t >= 0.5 ? 0 : 1;
    w0 = 1 - t;
    w1 = t;
    w2 = 0;
  } else if (p < 0.64) {
    activeStage = 1;
    stageLocalProgress = clamp01((p - 0.33) / 0.31);
    w0 = 0;
    w1 = 1;
    w2 = 0;
  } else if (p < 0.67) {
    const t = (p - 0.64) / 0.03;
    activeStage = t >= 0.5 ? 2 : 1;
    stageLocalProgress = t >= 0.5 ? 0 : 1;
    w0 = 0;
    w1 = 1 - t;
    w2 = t;
  } else {
    activeStage = 2;
    stageLocalProgress = clamp01((p - 0.67) / 0.29);
    w0 = 0;
    w1 = 0;
    w2 = 1;
  }

  const labels: ['1/3', '2/3', '3/3'] = ['1/3', '2/3', '3/3'];

  return {
    activeStage,
    stepCounterLabel: labels[activeStage],
    stageLocalProgress,
    stageWeights: [
      Number(w0.toFixed(4)),
      Number(w1.toFixed(4)),
      Number(w2.toFixed(4)),
    ],
  };
}

/**
 * Maps a manual step selection (0, 1, 2) to the center of its scroll dwell plateau.
 */
export function getProgressForBuilderStage(stage: BuilderStageIndex): number {
  switch (stage) {
    case 0:
      return 0.14;
    case 1:
      return 0.48;
    case 2:
      return 0.84;
  }
}

export function sanitizePostcardNote(input: string): string {
  const normalized = input.replace(/\r\n/g, '\n');
  if (normalized.length <= POSTCARD_NOTE_MAX_LENGTH) {
    return normalized;
  }
  return normalized.slice(0, POSTCARD_NOTE_MAX_LENGTH);
}

export function getRemainingNoteChars(note: string): number {
  return Math.max(0, POSTCARD_NOTE_MAX_LENGTH - note.length);
}

export function createInitialBuilderState(
  destinationId: DestinationId = 'lisbon'
): PostcardBuilderState {
  const dest = DESTINATIONS[destinationId];
  return {
    destinationId: dest.id,
    photoStyleId: dest.defaultPhotoStyle,
    stampStyleId: dest.defaultStamp,
    note: dest.sampleNote,
  };
}

export function selectBuilderDestination(
  prev: PostcardBuilderState,
  destinationId: DestinationId,
  preserveCustomNote = false
): PostcardBuilderState {
  const nextDest = DESTINATIONS[destinationId];
  const prevDefaultNote = DESTINATIONS[prev.destinationId].sampleNote;
  const isUnmodifiedSample = prev.note.trim() === prevDefaultNote.trim() || prev.note.trim() === '';

  return {
    destinationId: nextDest.id,
    photoStyleId: nextDest.defaultPhotoStyle,
    stampStyleId: nextDest.defaultStamp,
    note: preserveCustomNote && !isUnmodifiedSample ? prev.note : nextDest.sampleNote,
  };
}

/**
 * Checks whether a pointer release point lands inside (or within generous magnet tolerance of)
 * the postcard postage zone on the Stamp Desk.
 */
export function isPointInPostageZone(
  point: { x: number; y: number },
  zone: RectBounds,
  magnetMarginPx = 28
): boolean {
  return (
    point.x >= zone.left - magnetMarginPx &&
    point.x <= zone.right + magnetMarginPx &&
    point.y >= zone.top - magnetMarginPx &&
    point.y <= zone.bottom + magnetMarginPx
  );
}

/**
 * Computes quadratic Bezier midpoint & tangent angle for an illustrated postal flight arc
 * between two 2D SVG map coordinates.
 */
export function computeCurvedRouteGeometry(
  from: { x: number; y: number },
  to: { x: number; y: number },
  t: number
): {
  svgPath: string;
  point: { x: number; y: number };
  angleDeg: number;
} {
  const clampedT = clamp01(t);
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.hypot(dx, dy);
  const archLift = Math.min(115, Math.max(42, dist * 0.24));

  const ctrlX = midX;
  const ctrlY = midY - archLift;

  const oneMinusT = 1 - clampedT;
  const px =
    oneMinusT * oneMinusT * from.x +
    2 * oneMinusT * clampedT * ctrlX +
    clampedT * clampedT * to.x;
  const py =
    oneMinusT * oneMinusT * from.y +
    2 * oneMinusT * clampedT * ctrlY +
    clampedT * clampedT * to.y;

  const tx = 2 * oneMinusT * (ctrlX - from.x) + 2 * clampedT * (to.x - ctrlX);
  const ty = 2 * oneMinusT * (ctrlY - from.y) + 2 * clampedT * (to.y - ctrlY);
  const angleDeg = (Math.atan2(ty, tx) * 180) / Math.PI;

  const svgPath = `M ${from.x.toFixed(1)} ${from.y.toFixed(1)} Q ${ctrlX.toFixed(1)} ${ctrlY.toFixed(1)} ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;

  return {
    svgPath,
    point: { x: Number(px.toFixed(2)), y: Number(py.toFixed(2)) },
    angleDeg: Number(angleDeg.toFixed(2)),
  };
}

export function validateDemoEmail(rawEmail: string): {
  valid: boolean;
  error?: string;
  normalized?: string;
} {
  const trimmed = rawEmail.trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter an email address to preview the postal dispatch.' };
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailPattern.test(trimmed)) {
    return { valid: false, error: 'Enter a valid address format (for example, traveler@example.com).' };
  }
  return { valid: true, normalized: trimmed.toLowerCase() };
}
