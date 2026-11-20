import { WATER_LEVEL, sampleTerrainHeight, sampleWaterDepth } from './terrain';
import { sampleWaterSurfaceY } from './water-ripples';
import { WIND_DIRECTION, sampleWindField } from './wind';

export type PetalLifecycleState = 'falling' | 'floating' | 'grounded';

export interface BlossomEmitter {
  x: number;
  y: number;
  z: number;
}

export interface SimulatedPetal {
  state: PetalLifecycleState;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  scale: number;
  flutterPhase: number;
  flutterFreq: number;
  flutterAmp: number;
  /** Time remaining in floating/grounded phase before clean recycling */
  surfaceAge: number;
  maxSurfaceLife: number;
  /** Weight factor affecting terminal fall speed and wind responsiveness */
  mass: number;
  /** Index of preferred emitter cluster for respawning */
  emitterIndex: number;
}

export interface WaterRippleEvent {
  x: number;
  z: number;
  age: number;
  maxAge: number;
  strength: number;
}

export interface PetalStepResult {
  petal: SimulatedPetal;
  rippleTriggered: { x: number; z: number } | null;
}

export const PETAL_STAGE_BOUNDS = {
  minX: -10.5,
  maxX: 9.8,
  minZ: -9.5,
  maxZ: 4.5,
} as const;

/** Keep floating surface petals clear of the calm left text-safe hero field. */
export const FLOATING_PETAL_MIN_X = -3.85;

const DEFAULT_EMITTERS: BlossomEmitter[] = [
  { x: 5.8, y: 3.1, z: -1.4 },
  { x: 4.6, y: 2.8, z: -1.3 },
  { x: 3.4, y: 2.5, z: -1.25 },
  { x: 5.2, y: 2.2, z: -1.45 },
  { x: 4.1, y: 1.9, z: -1.35 },
];

function deterministicFrac(seed: number): number {
  const v = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return v - Math.floor(v);
}

/**
 * Create a newly detached sakura petal originating at an actual blossom cluster.
 */
export function spawnPetalFromEmitter(
  emitters: readonly BlossomEmitter[],
  emitterIndex: number,
  seed: number
): SimulatedPetal {
  const pool = emitters.length > 0 ? emitters : DEFAULT_EMITTERS;
  const safeIdx = ((emitterIndex % pool.length) + pool.length) % pool.length;
  const emitter = pool[safeIdx];

  const r1 = deterministicFrac(seed + 1.1);
  const r2 = deterministicFrac(seed + 2.3);
  const r3 = deterministicFrac(seed + 3.7);
  const r4 = deterministicFrac(seed + 5.1);
  const r5 = deterministicFrac(seed + 7.9);
  const r6 = deterministicFrac(seed + 11.3);

  const mass = 0.72 + r4 * 0.56;

  return {
    state: 'falling',
    x: emitter.x + (r1 - 0.5) * 0.42,
    y: emitter.y + (r2 - 0.5) * 0.28,
    z: emitter.z + (r3 - 0.5) * 0.36,
    vx: WIND_DIRECTION.x * (0.14 + r4 * 0.16),
    vy: -(0.12 + r5 * 0.14),
    vz: WIND_DIRECTION.z * (0.04 + r6 * 0.08) - (r3 - 0.35) * 0.12,
    rotX: r1 * Math.PI * 2,
    rotY: r2 * Math.PI * 2,
    rotZ: r3 * Math.PI * 2,
    rotSpeedX: (r4 - 0.5) * 1.9,
    rotSpeedY: (r5 - 0.5) * 1.6,
    rotSpeedZ: (r6 - 0.5) * 1.4,
    scale: 0.62 + r5 * 0.68,
    flutterPhase: r1 * Math.PI * 2,
    flutterFreq: 1.35 + r2 * 1.45,
    flutterAmp: 0.16 + r3 * 0.22,
    surfaceAge: 0,
    maxSurfaceLife: 6.2 + r6 * 4.8,
    mass,
    emitterIndex: safeIdx,
  };
}

/**
 * Initialize a natural pre-warmed population of falling and floating sakura petals
 * by advancing newly detached petals forward in simulated time so frame 0 looks
 * organically alive while guaranteeing every petal originates from real clusters.
 */
export function createInitialPetalPopulation(
  count: number,
  emitters: readonly BlossomEmitter[]
): SimulatedPetal[] {
  const pool = emitters.length > 0 ? emitters : DEFAULT_EMITTERS;
  const petals: SimulatedPetal[] = [];

  for (let i = 0; i < count; i++) {
    const emitterIndex = i % pool.length;
    let petal = spawnPetalFromEmitter(pool, emitterIndex, i * 17.31 + 3.1);
    // Pre-simulate staggered ages across 0..24s at 0.1s steps so frame 0 naturally includes
    // both gracefully drifting airborne petals and a restrained handful floating on the lake
    const preSimSeconds = (i * 0.61) % 24.0;
    const stepSize = 0.1;
    let t = 0;
    while (t < preSimSeconds) {
      const res = stepSimulatedPetal(petal, stepSize, t, pool, i * 31.7 + t);
      petal = res.petal;
      t += stepSize;
    }
    petals.push(petal);
  }

  return petals;
}

/**
 * Advance a single sakura petal by dt seconds under the shared environmental wind field.
 *
 * - Falling petals flutter, tumble, and respond to gusts.
 * - Upon contacting the lake surface (WATER_LEVEL over water), a subtle ripple event is
 *   emitted and the petal transitions to floating on the water surface, drifting with a
 *   gentle surface current before cleanly recycling back to a blossom cluster.
 * - Upon contacting dry terrain, the petal rests briefly without penetrating the mesh and recycles.
 */
export function stepSimulatedPetal(
  petal: SimulatedPetal,
  dt: number,
  elapsed: number,
  emitters: readonly BlossomEmitter[],
  respawnSeed: number
): PetalStepResult {
  const safeDt = Math.max(0, Math.min(dt, 0.1));
  if (safeDt === 0) {
    return { petal, rippleTriggered: null };
  }

  const wind = sampleWindField(elapsed, petal.x, petal.y, petal.z);

  if (petal.state === 'floating') {
    const nextAge = petal.surfaceAge + safeDt;
    // Slow, cohesive wind-driven lake surface drift with subtle cross-current meander
    const meander = Math.sin(elapsed * 0.45 + petal.flutterPhase) * 0.018;
    const currentVx = WIND_DIRECTION.x * (0.085 + wind.gust * 0.065);
    const currentVz = WIND_DIRECTION.z * (0.032 + wind.gust * 0.025) + meander;
    const nextX = petal.x + currentVx * safeDt;
    const nextZ = petal.z + currentVz * safeDt;

    const overDryShore = sampleWaterDepth(nextX, nextZ) <= 0.04;
    const outOfBounds =
      nextX < FLOATING_PETAL_MIN_X ||
      nextX > PETAL_STAGE_BOUNDS.maxX ||
      nextZ < PETAL_STAGE_BOUNDS.minZ ||
      nextZ > PETAL_STAGE_BOUNDS.maxZ;

    if (nextAge >= petal.maxSurfaceLife || overDryShore || outOfBounds) {
      const nextEmitter = petal.emitterIndex + 3;
      return {
        petal: spawnPetalFromEmitter(emitters, nextEmitter, respawnSeed),
        rippleTriggered: null,
      };
    }

    // Ride directly atop the animated lake surface swell so petals never clip beneath water
    const surfaceY = sampleWaterSurfaceY(nextX, nextZ, elapsed, WIND_DIRECTION.x, WIND_DIRECTION.z);
    const bobY = Math.max(WATER_LEVEL + 0.01, surfaceY + 0.013);

    return {
      petal: {
        ...petal,
        x: nextX,
        y: bobY,
        z: nextZ,
        rotX: -Math.PI * 0.5 + Math.sin(elapsed * 1.15 + petal.flutterPhase) * 0.05,
        rotY: petal.rotY + 0.11 * safeDt,
        rotZ: petal.rotZ + 0.06 * safeDt,
        surfaceAge: nextAge,
      },
      rippleTriggered: null,
    };
  }

  if (petal.state === 'grounded') {
    const nextAge = petal.surfaceAge + safeDt;
    // Brief rest on dry stone/moss, or lifted early by a wind gust
    if (nextAge >= Math.min(2.8, petal.maxSurfaceLife * 0.45) || wind.gust > 0.78) {
      return {
        petal: spawnPetalFromEmitter(emitters, petal.emitterIndex + 5, respawnSeed),
        rippleTriggered: null,
      };
    }

    return {
      petal: {
        ...petal,
        surfaceAge: nextAge,
      },
      rippleTriggered: null,
    };
  }

  // State === 'falling': aerodynamic flutter + shared wind drag + gravity
  const flutterX = Math.sin(elapsed * petal.flutterFreq + petal.flutterPhase) * petal.flutterAmp;
  const flutterZ = Math.cos(elapsed * petal.flutterFreq * 0.83 + petal.flutterPhase) * (petal.flutterAmp * 0.65);
  const flutterLift = Math.sin(elapsed * petal.flutterFreq * 1.35 + petal.flutterPhase) * 0.08;

  const targetVx = wind.vx * (0.68 / petal.mass) + flutterX;
  const targetVy = -(0.30 * petal.mass) + wind.vy * 0.72 + flutterLift;
  const targetVz = wind.vz * (0.58 / petal.mass) + flutterZ - 0.06;

  const drag = 1 - Math.exp(-2.6 * safeDt);
  const vx = petal.vx + (targetVx - petal.vx) * drag;
  const vy = petal.vy + (targetVy - petal.vy) * drag;
  const vz = petal.vz + (targetVz - petal.vz) * drag;

  const nextX = petal.x + vx * safeDt;
  const nextY = petal.y + vy * safeDt;
  const nextZ = petal.z + vz * safeDt;

  // Recycle if blown well outside the camera corridor
  if (
    nextX < PETAL_STAGE_BOUNDS.minX ||
    nextX > PETAL_STAGE_BOUNDS.maxX ||
    nextZ < PETAL_STAGE_BOUNDS.minZ ||
    nextZ > PETAL_STAGE_BOUNDS.maxZ
  ) {
    return {
      petal: spawnPetalFromEmitter(emitters, petal.emitterIndex + 2, respawnSeed),
      rippleTriggered: null,
    };
  }

  const terrainY = sampleTerrainHeight(nextX, nextZ);
  const waterDepth = WATER_LEVEL - terrainY;

  // 1. Check lake surface contact first when over open water
  const waterSurfaceY = sampleWaterSurfaceY(nextX, nextZ, elapsed, WIND_DIRECTION.x, WIND_DIRECTION.z);
  const contactY = Math.max(WATER_LEVEL + 0.011, waterSurfaceY + 0.013);
  if (waterDepth > 0.03 && nextY <= contactY + 0.01) {
    return {
      petal: {
        ...petal,
        state: 'floating',
        x: nextX,
        y: contactY,
        z: nextZ,
        vx: 0,
        vy: 0,
        vz: 0,
        rotX: -Math.PI * 0.5,
        surfaceAge: 0,
      },
      rippleTriggered: { x: nextX, z: nextZ },
    };
  }

  // 2. Check dry terrain contact so petals never clip through solid shoreline/ground
  if (terrainY >= WATER_LEVEL - 0.03 && nextY <= terrainY + 0.025) {
    return {
      petal: {
        ...petal,
        state: 'grounded',
        x: nextX,
        y: terrainY + 0.025,
        z: nextZ,
        vx: 0,
        vy: 0,
        vz: 0,
        rotX: -Math.PI * 0.48,
        surfaceAge: 0,
      },
      rippleTriggered: null,
    };
  }

  // Continue natural tumbling descent
  const gustSpin = 1 + wind.gust * 0.65;
  return {
    petal: {
      ...petal,
      x: nextX,
      y: nextY,
      z: nextZ,
      vx,
      vy,
      vz,
      rotX: petal.rotX + petal.rotSpeedX * gustSpin * safeDt,
      rotY: petal.rotY + petal.rotSpeedY * gustSpin * safeDt,
      rotZ: petal.rotZ + petal.rotSpeedZ * gustSpin * safeDt,
    },
    rippleTriggered: null,
  };
}
