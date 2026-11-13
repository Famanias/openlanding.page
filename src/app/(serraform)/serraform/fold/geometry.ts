import { FOLD_CONSTANTS } from './config';
import { clamp } from '../motion/math';

export interface FoldMetrics {
  centerlineSpan: number;
  outerSpan: number;
  outerDepth: number;
  angleRadians: number;
}

export interface PointXZ {
  x: number;
  z: number;
}

export interface FoldPose {
  opening: number;
  hinges: PointXZ[];
  front: PointXZ[];
  back: PointXZ[];
  feetCenters: [PointXZ, PointXZ];
  metrics: FoldMetrics;
}

const DEG_TO_RAD = Math.PI / 180;
const COS_CLOSED = Math.cos(FOLD_CONSTANTS.closedAngleDeg * DEG_TO_RAD);
const COS_OPEN = Math.cos(FOLD_CONSTANTS.openAngleDeg * DEG_TO_RAD);

export function normalizeOpening(value: number): number {
  if (!Number.isFinite(value)) return FOLD_CONSTANTS.defaultOpening;
  return clamp(value, 0, 100);
}

export function deriveFold(openingInput: number): FoldPose {
  const opening = normalizeOpening(openingInput);
  const u = opening / 100;

  const N = FOLD_CONSTANTS.panels;
  const b = FOLD_CONSTANTS.panelPitch;
  const t = FOLD_CONSTANTS.thickness;
  const L = FOLD_CONSTANTS.developedLength;

  const c = COS_CLOSED + (COS_OPEN - COS_CLOSED) * u;
  const angleRadians = Math.acos(clamp(c, -1, 1));
  const s = Math.sin(angleRadians);

  const hinges: PointXZ[] = [];
  for (let j = 0; j <= N; j += 1) {
    hinges.push({
      x: (j - N / 2) * b * c,
      z: ((j % 2) - 0.5) * b * s,
    });
  }

  const front: PointXZ[] = [];
  const back: PointXZ[] = [];

  for (let j = 0; j <= N; j += 1) {
    const p = hinges[j];
    let ox = 0;
    let oz = 0;

    if (j === 0) {
      // Adjacent segment 0 has direction (c, +s) and normal (-s, c)
      ox = -(t / 2) * s;
      oz = (t / 2) * c;
    } else if (j === N) {
      // Adjacent segment N-1 (15, odd) has direction (c, -s) and normal (+s, c)
      ox = (t / 2) * s;
      oz = (t / 2) * c;
    } else {
      // Interior mitered hinge offset: ±(0, t/(2*c))
      ox = 0;
      oz = t / (2 * c);
    }

    front.push({ x: p.x + ox, z: p.z + oz });
    back.push({ x: p.x - ox, z: p.z - oz });
  }

  const firstMid: PointXZ = {
    x: (hinges[0].x + hinges[1].x) * 0.5,
    z: (hinges[0].z + hinges[1].z) * 0.5,
  };
  const lastMid: PointXZ = {
    x: (hinges[N - 1].x + hinges[N].x) * 0.5,
    z: (hinges[N - 1].z + hinges[N].z) * 0.5,
  };

  const centerlineSpan = L * c;
  const centerlineDepth = b * s;
  const outerSpan = centerlineSpan + t * s;
  const outerDepth = centerlineDepth + t / c;

  return {
    opening,
    hinges,
    front,
    back,
    feetCenters: [firstMid, lastMid],
    metrics: {
      centerlineSpan,
      outerSpan,
      outerDepth,
      angleRadians,
    },
  };
}

/**
 * Solves a physically coupled 16-panel hinge chain from per-panel opening
 * percentages [0..100]. Adjacent panels share exact hinge endpoints, alternate
 * fold directions cleanly, preserve panel pitch (0.18 m), and miter thickness
 * offsets across hinges so prints & seams never detach during progressive unfolds.
 */
export function deriveFoldChain(panelOpenings: readonly number[]): FoldPose {
  const N = FOLD_CONSTANTS.panels;
  const b = FOLD_CONSTANTS.panelPitch;
  const t = FOLD_CONSTANTS.thickness;

  const raw: PointXZ[] = new Array(N + 1);
  const normals: PointXZ[] = new Array(N);
  raw[0] = { x: 0, z: 0 };

  let minRawZ = 0;
  let maxRawZ = 0;
  let openingSum = 0;
  let angleSum = 0;

  for (let i = 0; i < N; i += 1) {
    const o = normalizeOpening(
      i < panelOpenings.length ? panelOpenings[i] : FOLD_CONSTANTS.defaultOpening,
    );
    openingSum += o;
    const u = o / 100;
    const c = COS_CLOSED + (COS_OPEN - COS_CLOSED) * u;
    const theta = Math.acos(clamp(c, -1, 1));
    const s = Math.sin(theta);
    angleSum += theta;

    const sign = i % 2 === 0 ? 1 : -1;
    // Outward front (+Z) normal perpendicular to segment (c, sign * s)
    normals[i] = { x: -sign * s, z: c };

    const nx = raw[i].x + b * c;
    const nz = raw[i].z + sign * b * s;
    raw[i + 1] = { x: nx, z: nz };

    if (nz < minRawZ) minRawZ = nz;
    if (nz > maxRawZ) maxRawZ = nz;
  }

  const midX = (raw[0].x + raw[N].x) * 0.5;
  const midZ = (minRawZ + maxRawZ) * 0.5;

  const hinges: PointXZ[] = new Array(N + 1);
  for (let j = 0; j <= N; j += 1) {
    hinges[j] = {
      x: raw[j].x - midX,
      z: raw[j].z - midZ,
    };
  }

  const front: PointXZ[] = new Array(N + 1);
  const back: PointXZ[] = new Array(N + 1);

  let minX = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let minZ = Number.POSITIVE_INFINITY;
  let maxZ = Number.NEGATIVE_INFINITY;

  for (let j = 0; j <= N; j += 1) {
    const p = hinges[j];
    let ox = 0;
    let oz = 0;

    if (j === 0) {
      ox = (t * 0.5) * normals[0].x;
      oz = (t * 0.5) * normals[0].z;
    } else if (j === N) {
      ox = (t * 0.5) * normals[N - 1].x;
      oz = (t * 0.5) * normals[N - 1].z;
    } else {
      const nPrev = normals[j - 1];
      const nNext = normals[j];
      const dotN = nPrev.x * nNext.x + nPrev.z * nNext.z;
      const denom = Math.max(0.1, 1 + dotN);
      const scale = (t * 0.5) / denom;
      ox = scale * (nPrev.x + nNext.x);
      oz = scale * (nPrev.z + nNext.z);
    }

    const fx = p.x + ox;
    const fz = p.z + oz;
    const bx = p.x - ox;
    const bz = p.z - oz;
    front[j] = { x: fx, z: fz };
    back[j] = { x: bx, z: bz };

    if (fx < minX) minX = fx;
    if (bx < minX) minX = bx;
    if (fx > maxX) maxX = fx;
    if (bx > maxX) maxX = bx;
    if (fz < minZ) minZ = fz;
    if (bz < minZ) minZ = bz;
    if (fz > maxZ) maxZ = fz;
    if (bz > maxZ) maxZ = bz;
  }

  const firstMid: PointXZ = {
    x: (hinges[0].x + hinges[1].x) * 0.5,
    z: (hinges[0].z + hinges[1].z) * 0.5,
  };
  const lastMid: PointXZ = {
    x: (hinges[N - 1].x + hinges[N].x) * 0.5,
    z: (hinges[N - 1].z + hinges[N].z) * 0.5,
  };

  return {
    opening: openingSum / N,
    hinges,
    front,
    back,
    feetCenters: [firstMid, lastMid],
    metrics: {
      centerlineSpan: hinges[N].x - hinges[0].x,
      outerSpan: maxX - minX,
      outerDepth: maxZ - minZ,
      angleRadians: angleSum / N,
    },
  };
}

export function formatMeters(meters: number): string {
  return `${meters.toFixed(2)} m`;
}

/**
 * Pure 2D segment intersection check used by unit tests to ensure the mitered
 * cross-section polygon remains simple and non-self-intersecting.
 */
export function segmentsIntersect(a1: PointXZ, a2: PointXZ, b1: PointXZ, b2: PointXZ): boolean {
  const ccw = (p1: PointXZ, p2: PointXZ, p3: PointXZ) =>
    (p3.z - p1.z) * (p2.x - p1.x) - (p2.z - p1.z) * (p3.x - p1.x);

  const d1 = ccw(a1, a2, b1);
  const d2 = ccw(a1, a2, b2);
  const d3 = ccw(b1, b2, a1);
  const d4 = ccw(b1, b2, a2);

  return ((d1 > 1e-9 && d2 < -1e-9) || (d1 < -1e-9 && d2 > 1e-9)) &&
    ((d3 > 1e-9 && d4 < -1e-9) || (d3 < -1e-9 && d4 > 1e-9));
}

/**
 * Returns horizontal UV coordinates [uLeft, uRight] in developed sheet space [0..1]
 * for panel j of N:
 * - front face: u0 = j/N -> u1 = (j+1)/N (reads left-to-right from +Z view)
 * - back face: uBack(j) = 1 - j/N, ordered from hinge j+1 to j so looking from -Z reads left-to-right
 */
export function computePanelUVSpan(
  panelIndex: number,
  side: 'front' | 'back',
  totalPanels: number = FOLD_CONSTANTS.panels,
): { uStart: number; uEnd: number } {
  const uFront0 = panelIndex / totalPanels;
  const uFront1 = (panelIndex + 1) / totalPanels;
  if (side === 'front') {
    return { uStart: uFront0, uEnd: uFront1 };
  }
  return {
    uStart: 1 - uFront1,
    uEnd: 1 - uFront0,
  };
}

