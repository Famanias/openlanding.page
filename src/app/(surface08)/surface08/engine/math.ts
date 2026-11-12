import * as THREE from 'three';
import type { EffectId, Palette, QualityPreset } from './effectTypes';

/**
 * Frame-rate-independent exponential damping factor: alpha = 1 - exp(-lambda * dt)
 */
export function dampFactor(lambda: number, dt: number): number {
  const safeDt = Math.max(0, Math.min(dt, 0.1));
  return 1 - Math.exp(-Math.max(0, lambda) * safeDt);
}

/**
 * Frame-rate-independent exponential interpolation between current and target.
 */
export function dampValue(current: number, target: number, lambda: number, dt: number): number {
  return current + (target - current) * dampFactor(lambda, dt);
}

export interface SpringState {
  value: number;
  velocity: number;
}

/**
 * Second-order damped harmonic oscillator step for believable physical overshoot & recovery.
 */
export function stepSpring(
  state: SpringState,
  target: number,
  stiffness: number,
  damping: number,
  dt: number
): SpringState {
  const safeDt = Math.max(0, Math.min(dt, 0.05));
  const force = (target - state.value) * stiffness;
  const accel = force - state.velocity * damping;
  const nextVelocity = state.velocity + accel * safeDt;
  const nextValue = state.value + nextVelocity * safeDt;
  return {
    value: nextValue,
    velocity: nextVelocity,
  };
}

/**
 * Normalizes client pointer coordinates against a bounding rect into WebGL UV space [0,1]
 * where (0,0) is bottom-left and (1,1) is top-right.
 */
export function normalizePointerToUv(
  clientX: number,
  clientY: number,
  rect: { left: number; top: number; width: number; height: number }
): { u: number; v: number } {
  const w = Math.max(1, rect.width);
  const h = Math.max(1, rect.height);
  const rawU = (clientX - rect.left) / w;
  const rawV = 1.0 - (clientY - rect.top) / h;
  return {
    u: Math.max(0, Math.min(1, rawU)),
    v: Math.max(0, Math.min(1, rawV)),
  };
}

/**
 * Computes clamped UV velocity so first entry, tab restore, or resize never explodes simulation forces.
 */
export function computeClampedVelocity(
  prevU: number,
  prevV: number,
  nextU: number,
  nextV: number,
  dt: number,
  maxSpeed = 6.0
): { vx: number; vy: number } {
  const safeDt = Math.max(0.004, Math.min(dt, 0.1));
  let vx = (nextU - prevU) / safeDt;
  let vy = (nextV - prevV) / safeDt;
  const mag = Math.hypot(vx, vy);
  if (mag > maxSpeed && mag > 1e-6) {
    const scale = maxSpeed / mag;
    vx *= scale;
    vy *= scale;
  }
  return { vx, vy };
}

/**
 * Resolves effective quality tier and render scaling parameters from user preset, measured FPS, and software GL flag.
 */
export function resolveQualitySettings(
  preset: QualityPreset,
  measuredFps: number,
  devicePixelRatio: number,
  isSoftwareGl: boolean
): {
  effectiveTier: 'high' | 'balanced' | 'low';
  dpr: number;
  simScale: number;
} {
  if (isSoftwareGl) {
    return {
      effectiveTier: 'low',
      dpr: 1.0,
      simScale: 0.45,
    };
  }

  let effectiveTier: 'high' | 'balanced' | 'low' = 'high';
  if (preset === 'auto') {
    if (measuredFps < 34) {
      effectiveTier = 'low';
    } else if (measuredFps < 50) {
      effectiveTier = 'balanced';
    } else {
      effectiveTier = 'high';
    }
  } else {
    effectiveTier = preset;
  }

  const safeDeviceDpr = Math.max(1, Math.min(devicePixelRatio || 1, 3));
  if (effectiveTier === 'high') {
    return {
      effectiveTier,
      dpr: Math.min(safeDeviceDpr, 1.75),
      simScale: 1.0,
    };
  }
  if (effectiveTier === 'balanced') {
    return {
      effectiveTier,
      dpr: Math.min(safeDeviceDpr, 1.35),
      simScale: 0.72,
    };
  }
  return {
    effectiveTier: 'low',
    dpr: 1.0,
    simScale: 0.5,
  };
}

export interface TransitionFamilySpec {
  id: number;
  name: string;
  durationSec: number;
}

/**
 * Selects one of 4 GPU optical transition families based on outgoing and incoming effect IDs.
 * 0 = Viscous Rib Wipe (Fluid/Glass)
 * 1 = Diagonal Silk Shear (Fabric/Ribbon)
 * 2 = Optical Lens Caustic Iris (Lens/Aurora/Bokeh)
 * 3 = Crystalline Voronoi Melt (Facet/Refraction)
 */
export function selectTransitionFamily(fromId: EffectId, toId: EffectId): TransitionFamilySpec {
  if (toId === 'fluted-light' || fromId === 'fluted-light' || toId === 'chroma-fluid') {
    return { id: 0, name: 'Viscous Fluted Wipe', durationSec: 0.82 };
  }
  if (toId === 'silk-atmosphere' || toId === 'chromatic-ribbons') {
    return { id: 1, name: 'Diagonal Silk Shear', durationSec: 0.85 };
  }
  if (toId === 'glass-lens' || toId === 'aurora-field' || toId === 'bokeh-reactor') {
    return { id: 2, name: 'Optical Caustic Aperture', durationSec: 0.88 };
  }
  return { id: 3, name: 'Faceted Voronoi Melt', durationSec: 0.85 };
}

/**
 * Helper to create a typed Palette object from hex strings.
 */
export function createPalette(
  id: string,
  name: string,
  swatches: [string, string, string, string],
  bgHex: string
): Palette {
  return {
    id,
    name,
    swatches,
    colors: [
      new THREE.Color(swatches[0]),
      new THREE.Color(swatches[1]),
      new THREE.Color(swatches[2]),
      new THREE.Color(swatches[3]),
    ],
    bgHex,
  };
}
