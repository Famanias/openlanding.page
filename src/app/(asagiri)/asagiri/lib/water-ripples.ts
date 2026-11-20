import { WATER_LEVEL, sampleWaterDepth } from './terrain';

/** Maximum pooled ripple slots passed as uniform vec4[MAX_WATER_RIPPLES] to the lake shader. */
export const MAX_WATER_RIPPLES = 8;

/** Maximum ripples allowed to be visibly active at any moment so the lake stays calm and restrained. */
export const MAX_CONCURRENT_ACTIVE_RIPPLES = 2;

/** Minimum time (seconds) between newly triggered petal-water ripples. */
export const RIPPLE_MIN_COOLDOWN_SECONDS = 2.9;

/** Minimum world-space spacing (meters) between simultaneously active ripples. */
export const RIPPLE_MIN_SPACING = 1.65;

export interface WaterRippleSlot {
  x: number;
  z: number;
  age: number;
  maxAge: number;
  strength: number;
}

export interface WaterRipplePool {
  slots: WaterRippleSlot[];
  lastTriggerTime: number;
  writeCursor: number;
}

export interface WaterObstacleCircle {
  x: number;
  z: number;
  radius: number;
}

/**
 * Visible open-water corridor where petal ripple events read gracefully
 * without intruding heavily into the left hero text-safe negative space.
 */
export const RIPPLE_VISIBLE_BOUNDS = {
  minX: -4.2,
  maxX: 3.3,
  minZ: -7.8,
  maxZ: 2.8,
} as const;

/**
 * Create an empty pre-allocated ripple pool (zero runtime allocations in the render loop).
 */
export function createWaterRipplePool(): WaterRipplePool {
  return {
    slots: Array.from({ length: MAX_WATER_RIPPLES }, () => ({
      x: 0,
      z: 0,
      age: 99,
      maxAge: 4.1,
      strength: 0,
    })),
    lastTriggerTime: -10,
    writeCursor: 0,
  };
}

/**
 * Seed a single delicate initial ripple ring in open midground cove water
 * so the lake feels quietly alive right after load without looking busy.
 */
export function seedInitialCalmRipples(pool: WaterRipplePool): void {
  const candidates = [
    { x: 0.42, z: -2.45, age: 1.05, maxAge: 4.2, strength: 0.64 },
  ];

  let placed = 0;
  for (const c of candidates) {
    if (sampleWaterDepth(c.x, c.z) > 0.16 && placed < MAX_WATER_RIPPLES) {
      const slot = pool.slots[placed];
      slot.x = c.x;
      slot.z = c.z;
      slot.age = c.age;
      slot.maxAge = c.maxAge;
      slot.strength = c.strength;
      placed++;
    }
  }
  pool.writeCursor = placed % MAX_WATER_RIPPLES;
  pool.lastTriggerTime = -0.8;
}

/**
 * Count how many ripple rings are currently active and visible.
 */
export function countActiveWaterRipples(pool: WaterRipplePool): number {
  let count = 0;
  for (let i = 0; i < pool.slots.length; i++) {
    const s = pool.slots[i];
    if (s.strength > 0.001 && s.age < s.maxAge) {
      count++;
    }
  }
  return count;
}

/**
 * Advance all pooled ripple ages by dt seconds in-place.
 */
export function advanceWaterRipples(pool: WaterRipplePool, dt: number): void {
  const safeDt = Math.max(0, Math.min(dt, 0.1));
  if (safeDt === 0) return;

  for (let i = 0; i < pool.slots.length; i++) {
    const s = pool.slots[i];
    if (s.age < s.maxAge) {
      s.age += safeDt;
      if (s.age >= s.maxAge) {
        s.strength = 0;
      }
    }
  }
}

/**
 * Attempt to trigger a sparse, delicate petal-water ripple at world (x, z).
 * Enforces open-water depth, visible scenic framing, cooldown pacing,
 * spatial separation, and the calm concurrent ripple budget.
 */
export function tryTriggerWaterRipple(
  pool: WaterRipplePool,
  x: number,
  z: number,
  simTime: number,
  strength = 0.68
): boolean {
  if (simTime - pool.lastTriggerTime < RIPPLE_MIN_COOLDOWN_SECONDS) {
    return false;
  }

  if (
    x < RIPPLE_VISIBLE_BOUNDS.minX ||
    x > RIPPLE_VISIBLE_BOUNDS.maxX ||
    z < RIPPLE_VISIBLE_BOUNDS.minZ ||
    z > RIPPLE_VISIBLE_BOUNDS.maxZ
  ) {
    return false;
  }

  // Must land in open lake water cleanly away from dry shore edges
  const depth = sampleWaterDepth(x, z);
  if (depth < 0.14) {
    return false;
  }

  // Respect the calm simultaneous ripple cap
  if (countActiveWaterRipples(pool) >= MAX_CONCURRENT_ACTIVE_RIPPLES) {
    return false;
  }

  // Avoid stacking ripples right on top of each other
  for (let i = 0; i < pool.slots.length; i++) {
    const s = pool.slots[i];
    if (s.strength > 0.001 && s.age < s.maxAge) {
      if (Math.hypot(s.x - x, s.z - z) < RIPPLE_MIN_SPACING) {
        return false;
      }
    }
  }

  // Find an inactive slot first, otherwise advance circular write cursor
  let targetIdx = -1;
  for (let i = 0; i < pool.slots.length; i++) {
    const idx = (pool.writeCursor + i) % pool.slots.length;
    const s = pool.slots[idx];
    if (s.strength <= 0.001 || s.age >= s.maxAge) {
      targetIdx = idx;
      break;
    }
  }
  if (targetIdx === -1) {
    targetIdx = pool.writeCursor % pool.slots.length;
  }

  const slot = pool.slots[targetIdx];
  slot.x = x;
  slot.z = z;
  slot.age = 0;
  slot.maxAge = 3.9 + Math.abs(Math.sin(x * 7.3 + z * 5.1)) * 0.7;
  slot.strength = Math.max(0.4, Math.min(0.88, strength));

  pool.writeCursor = (targetIdx + 1) % pool.slots.length;
  pool.lastTriggerTime = simTime;
  return true;
}

/**
 * Compute smooth water surface vertical micro-swell height at world (x, z, t)
 * matching the vertex swell in WaterReflectionLayer so floating petals ride the water seamlessly.
 */
export function sampleWaterSurfaceY(
  x: number,
  z: number,
  t: number,
  windDirX: number,
  windDirZ: number
): number {
  const swell =
    Math.sin((x * windDirX + z * windDirZ) * 1.15 - t * 0.72) * 0.0065 +
    Math.cos(x * 0.64 - z * 1.05 + t * 0.54) * 0.004;
  return WATER_LEVEL + swell;
}
