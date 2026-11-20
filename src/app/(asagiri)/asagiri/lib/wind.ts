/**
 * Coherent shared environmental wind field driving:
 * - Hierarchical sakura tree sway (trunk -> primary -> secondary -> twigs)
 * - Falling & floating sakura petals
 * - Lake surface ripples & gentle surface current
 * - Drifting valley mist ribbons
 * - Shoreline vegetation sway
 */

export interface WindSample {
  /** Horizontal wind velocity along X (negative = prevailing breeze drifting right-to-left) */
  vx: number;
  /** Subtle vertical updraft / gust turbulence along Y */
  vy: number;
  /** Depth-axis breeze drift along Z */
  vz: number;
  /** Normalized intermittent gust envelope in [0, 1] */
  gust: number;
  /** Overall scalar wind strength in [0.4, 1.8] */
  strength: number;
}

/** Prevailing normalized wind direction across the valley (gently right-to-left and slightly forward) */
export const WIND_DIRECTION = {
  x: -0.94,
  z: 0.34,
} as const;

export type BranchHierarchyLevel = 'trunk' | 'primary' | 'secondary' | 'twig';

export interface BranchSwayAngles {
  /** Rotation offset in radians around X (fore/aft pitch) */
  rotX: number;
  /** Rotation offset in radians around Z (primary lateral breeze sway) */
  rotZ: number;
  /** Subtle torsional twist in radians around Y */
  rotY: number;
}

const DEG_TO_RAD = Math.PI / 180;

/**
 * Calibrated peak angular amplitudes (degrees) per branch hierarchy level:
 * - Trunk: ~0.25–0.55°
 * - Primary branches: ~0.7–1.4°
 * - Secondary branches: ~1.3–2.6°
 * - Thin twigs: ~2.1–3.8°
 */
const HIERARCHY_SWAY_CONFIG: Record<
  BranchHierarchyLevel,
  { baseDeg: number; gustDeg: number; freqPrimary: number; freqSecondary: number }
> = {
  trunk: { baseDeg: 0.28, gustDeg: 0.24, freqPrimary: 0.42, freqSecondary: 0.87 },
  primary: { baseDeg: 0.72, gustDeg: 0.62, freqPrimary: 0.68, freqSecondary: 1.34 },
  secondary: { baseDeg: 1.35, gustDeg: 1.15, freqPrimary: 1.08, freqSecondary: 2.12 },
  twig: { baseDeg: 2.15, gustDeg: 1.55, freqPrimary: 1.72, freqSecondary: 3.25 },
};

/**
 * Compute smooth, non-periodic intermittent wind gust factor in [0, 1]
 * using incommensurate low-frequency harmonics so gusts arrive organically.
 */
export function evaluateWindGust(time: number, spatialPhase = 0): number {
  const waveA = Math.sin(time * 0.27 + spatialPhase * 0.35);
  const waveB = Math.sin(time * 0.61 - spatialPhase * 0.22 + 1.4);
  const waveC = Math.cos(time * 0.13 + spatialPhase * 0.18 + 2.7);
  const combined = waveA * 0.48 + waveB * 0.32 + waveC * 0.2;
  // Smoothly shape upper crests into gentle natural gusts
  const shifted = Math.max(0, Math.min(1, (combined + 0.18) / 1.18));
  return shifted * shifted * (3 - 2 * shifted);
}

/**
 * Sample the shared 3D environmental wind field at a world coordinate and timestamp.
 */
export function sampleWindField(
  time: number,
  x: number,
  y: number,
  z: number
): WindSample {
  const spatialPhase = x * 0.22 + z * 0.19 - y * 0.14;
  const gust = evaluateWindGust(time, spatialPhase);
  const baseSpeed = 0.34 + gust * 0.46;

  // Multi-frequency organic cross-eddy turbulence
  const eddyX = Math.sin(time * 0.92 + spatialPhase * 1.4) * 0.09;
  const eddyY =
    Math.sin(time * 1.25 + x * 0.45 + z * 0.3) * 0.055 +
    gust * Math.cos(time * 1.9 + spatialPhase) * 0.045;
  const eddyZ = Math.cos(time * 0.78 - spatialPhase * 1.1) * 0.07;

  return {
    vx: WIND_DIRECTION.x * baseSpeed + eddyX,
    vy: eddyY,
    vz: WIND_DIRECTION.z * baseSpeed * 0.55 + eddyZ,
    gust,
    strength: 0.65 + gust * 0.95,
  };
}

/**
 * Compute hierarchical procedural sway angles (radians) for a sakura tree node.
 * Each branch passes its own deterministic `phaseOffset` so sibling branches
 * never oscillate in rigid synchronization.
 */
export function computeBranchWindSway(
  level: BranchHierarchyLevel,
  time: number,
  phaseOffset: number,
  spatialX = 5.0
): BranchSwayAngles {
  const cfg = HIERARCHY_SWAY_CONFIG[level];
  const gust = evaluateWindGust(time - phaseOffset * 0.25, spatialX * 0.25 + phaseOffset * 0.4);

  const osc1 = Math.sin(time * cfg.freqPrimary + phaseOffset);
  const osc2 = Math.sin(time * cfg.freqSecondary + phaseOffset * 1.73 + 0.9) * 0.38;
  const osc3 = Math.cos(time * (cfg.freqPrimary * 0.53) - phaseOffset * 0.6) * 0.22;

  // Prevailing wind leans gently left (+Z rotation bends an upward/leftward bough slightly down/left)
  const steadyLean = gust * cfg.gustDeg * 0.42;
  const lateralDeg = steadyLean + (osc1 * 0.62 + osc2 + osc3) * (cfg.baseDeg + gust * cfg.gustDeg * 0.58);
  const pitchDeg =
    (Math.cos(time * (cfg.freqPrimary * 0.82) + phaseOffset * 1.3) * 0.55 +
      Math.sin(time * (cfg.freqSecondary * 0.74) - phaseOffset) * 0.25) *
    (cfg.baseDeg * 0.52 + gust * cfg.gustDeg * 0.35);
  const twistDeg =
    Math.sin(time * (cfg.freqPrimary * 0.64) + phaseOffset * 2.1) * (cfg.baseDeg * 0.28);

  return {
    rotX: pitchDeg * DEG_TO_RAD,
    rotY: twistDeg * DEG_TO_RAD,
    rotZ: lateralDeg * DEG_TO_RAD,
  };
}
