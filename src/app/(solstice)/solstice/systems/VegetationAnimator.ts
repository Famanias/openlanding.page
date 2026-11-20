import { clamp } from '../utils/sceneLayout';
import type { WindSample } from './DesertWindField';

export interface GrassBladeWindParams {
  /** Base natural oscillation frequency (rad/s) */
  freq: number;
  /** Individual blade phase offset so blades never move in robotic lockstep */
  phase: number;
  /** Flexibility multiplier (0.55 stiff short blade -> 1.35 tall whippy blade) */
  flex: number;
}

/**
 * Computes root-anchored bending rotation (degrees) for a single desert grass blade.
 * Positive angle bends cleanly downwind (rightward) along the canyon airflow.
 */
export function computeGrassBladeAngleDeg(
  t: number,
  wind: WindSample,
  blade: GrassBladeWindParams,
  options: {
    enabled: boolean;
    motionIntensity: number;
    lifeBlend: number;
  }
): number {
  const { enabled, motionIntensity, lifeBlend } = options;
  if (!enabled) return 0;

  const scale = clamp(motionIntensity, 0, 2.2) * clamp(lifeBlend, 0, 1);
  if (scale <= 0.005) return 0;

  // Steady downwind deflection proportional to local wind + gust
  const steadyBend = (wind.dx * 7.8 + wind.gust * 6.4 + wind.pointerInfluence * 10.5) * blade.flex;

  // Asynchronous elastic spring flutter along the blade
  const flutterAmp = (1.6 + wind.strength * 2.8 + wind.gust * 3.8 + wind.pointerInfluence * 3.4) * blade.flex;
  const flutter =
    Math.sin(t * blade.freq + blade.phase) * 0.65 +
    Math.sin(t * (blade.freq * 1.73) - blade.phase * 0.7) * 0.35;

  return clamp((steadyBend + flutter * flutterAmp) * scale, -14, 24);
}

export type ShrubHierarchyLevel = 'trunk' | 'mid' | 'twig';

/**
 * Computes hierarchical wind deflection (degrees) for woody desert shrub segments:
 * - trunk: nearly stationary (heavy stiffness)
 * - mid: slight elastic flex during gusts
 * - twig: delicate trembling response to breeze, gusts, and cursor wind
 */
export function computeShrubBranchAngleDeg(
  t: number,
  wind: WindSample,
  level: ShrubHierarchyLevel,
  phase: number,
  options: {
    enabled: boolean;
    motionIntensity: number;
    lifeBlend: number;
  }
): number {
  const { enabled, motionIntensity, lifeBlend } = options;
  if (!enabled) return 0;

  const scale = clamp(motionIntensity, 0, 2.2) * clamp(lifeBlend, 0, 1);
  if (scale <= 0.005) return 0;

  const flexibility = level === 'trunk' ? 0.1 : level === 'mid' ? 0.44 : 1.0;
  const freq = level === 'trunk' ? 1.1 : level === 'mid' ? 2.2 : 4.3;

  const steady = (wind.dx * 4.2 + wind.gust * 4.6 + wind.pointerInfluence * 7.2) * flexibility;
  const tremble =
    (Math.sin(t * freq + phase) * 0.6 +
      Math.cos(t * (freq * 1.67) + phase * 1.4) * 0.4) *
    (0.8 + wind.strength * 1.7 + wind.gust * 2.4 + wind.pointerInfluence * 2.5) *
    flexibility;

  const maxAngle = level === 'trunk' ? 2.2 : level === 'mid' ? 7.5 : 14.5;
  return clamp((steady + tremble) * scale, -maxAngle, maxAngle);
}
