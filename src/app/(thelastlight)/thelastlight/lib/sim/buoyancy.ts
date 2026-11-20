import { BoatState, BoatWaveSamplePoint } from './types';
import {
  clampToSafeWater,
  islandShoreNormal,
  islandShoreSDF,
  SAFE_WATER_BOUNDS,
} from './island';
import { OceanParams, sampleOceanAtWorldXZ } from './ocean';

// Repositioned well inside the visible lower-left open cove water so the entire hull,
// orange mooring buoy, and rope stay 100% framed above the bottom edge & control dock.
export const DEFAULT_BOAT_ANCHOR = { x: -9.8, z: 6.4 };
const BUOY_OFFSET = { x: -3.0, z: 0.55 };

const HULL_HALF_LEN = 1.65;
const HULL_HALF_BEAM = 0.72;

function buildSamplePoints(
  x: number,
  z: number,
  yaw: number,
  yCenter: number
): BoatWaveSamplePoint[] {
  const cosY = Math.cos(yaw);
  const sinY = Math.sin(yaw);
  return [
    { name: 'bow', x: x + cosY * HULL_HALF_LEN, y: yCenter, z: z - sinY * HULL_HALF_LEN },
    { name: 'stern', x: x - cosY * HULL_HALF_LEN, y: yCenter, z: z + sinY * HULL_HALF_LEN },
    { name: 'port', x: x + sinY * HULL_HALF_BEAM, y: yCenter, z: z + cosY * HULL_HALF_BEAM },
    { name: 'starboard', x: x - sinY * HULL_HALF_BEAM, y: yCenter, z: z - cosY * HULL_HALF_BEAM },
    { name: 'center', x, y: yCenter, z },
  ];
}

export function createInitialBoatState(
  anchorX = DEFAULT_BOAT_ANCHOR.x,
  anchorZ = DEFAULT_BOAT_ANCHOR.z
): BoatState {
  const safe = clampToSafeWater(anchorX, anchorZ);
  const buoySafe = clampToSafeWater(safe.x + BUOY_OFFSET.x, safe.z + BUOY_OFFSET.z);
  const yaw = 0.28;
  return {
    x: safe.x,
    y: 0,
    z: safe.z,
    vx: 0,
    vz: 0,
    anchorX: safe.x,
    anchorZ: safe.z,
    buoyX: buoySafe.x,
    buoyY: 0,
    buoyZ: buoySafe.z,
    yaw,
    pitch: 0,
    roll: 0,
    pitchVel: 0,
    rollVel: 0,
    verticalVel: 0,
    heaveOffset: 0,
    waterNormalX: 0,
    waterNormalY: 1,
    waterNormalZ: 0,
    samplePoints: buildSamplePoints(safe.x, safe.z, yaw, 0),
  };
}

/**
 * Repositions the moored boat & its buoy safely within navigable water bounds.
 */
export function repositionBoat(state: BoatState, targetX: number, targetZ: number): BoatState {
  const safe = clampToSafeWater(targetX, targetZ);
  const buoySafe = clampToSafeWater(safe.x + BUOY_OFFSET.x, safe.z + BUOY_OFFSET.z);
  return {
    ...state,
    x: safe.x,
    z: safe.z,
    vx: 0,
    vz: 0,
    anchorX: safe.x,
    anchorZ: safe.z,
    buoyX: buoySafe.x,
    buoyZ: buoySafe.z,
    samplePoints: buildSamplePoints(safe.x, safe.z, state.yaw, state.y),
  };
}

/**
 * Steps 5-point hull buoyancy (bow, stern, port, starboard, center), slope-aligned
 * pitch & roll, damped spring rocking, horizontal drift, mooring tether, and rock
 * collision repulsion using the shared Gerstner wave model.
 */
export function stepBoatPhysics(
  state: BoatState,
  dt: number,
  oceanParams: OceanParams,
  buoyancyEnabled = true
): BoatState {
  const stepDt = Math.min(0.05, Math.max(0.001, dt));
  const cosY = Math.cos(state.yaw);
  const sinY = Math.sin(state.yaw);

  // World-space hull sample station coordinates (Three.js rotation.y: +X -> (cosY, -sinY), +Z -> (sinY, cosY))
  const bowX = state.x + cosY * HULL_HALF_LEN;
  const bowZ = state.z - sinY * HULL_HALF_LEN;
  const sternX = state.x - cosY * HULL_HALF_LEN;
  const sternZ = state.z + sinY * HULL_HALF_LEN;
  const portX = state.x + sinY * HULL_HALF_BEAM;
  const portZ = state.z + cosY * HULL_HALF_BEAM;
  const starboardX = state.x - sinY * HULL_HALF_BEAM;
  const starboardZ = state.z - cosY * HULL_HALF_BEAM;

  const bow = sampleOceanAtWorldXZ(bowX, bowZ, oceanParams);
  const stern = sampleOceanAtWorldXZ(sternX, sternZ, oceanParams);
  const port = sampleOceanAtWorldXZ(portX, portZ, oceanParams);
  const starboard = sampleOceanAtWorldXZ(starboardX, starboardZ, oceanParams);
  const center = sampleOceanAtWorldXZ(state.x, state.z, oceanParams);

  const samplePoints: BoatWaveSamplePoint[] = [
    { name: 'bow', x: bowX, y: bow.y, z: bowZ },
    { name: 'stern', x: sternX, y: stern.y, z: sternZ },
    { name: 'port', x: portX, y: port.y, z: portZ },
    { name: 'starboard', x: starboardX, y: starboard.y, z: starboardZ },
    { name: 'center', x: state.x, y: center.y, z: state.z },
  ];

  // If buoyancy is toggled off (diagnostic mode), settle smoothly to calm water level
  if (!buoyancyEnabled) {
    const damp = 1 - Math.exp(-5.0 * stepDt);
    return {
      ...state,
      y: state.y + (0.06 - state.y) * damp,
      pitch: state.pitch * (1 - damp),
      roll: state.roll * (1 - damp),
      vx: 0,
      vz: 0,
      verticalVel: 0,
      pitchVel: 0,
      rollVel: 0,
      buoyY: 0.04,
      heaveOffset: 0,
      waterNormalX: center.normalX,
      waterNormalY: center.normalY,
      waterNormalZ: center.normalZ,
      samplePoints,
    };
  }

  // Buoyant target height from 5-point average with subtle hull draft offset
  const targetY =
    (bow.y + stern.y + port.y + starboard.y + center.y * 2) / 6 + 0.08;

  // Vertical spring-damper buoyancy
  const heaveStiffness = 22.0;
  const heaveDamping = 5.8;
  const verticalAccel =
    (targetY - state.y) * heaveStiffness - state.verticalVel * heaveDamping;
  const verticalVel = state.verticalVel + verticalAccel * stepDt;
  const nextY = state.y + verticalVel * stepDt;

  // Pitch (bow-up positive around Z) & roll (starboard-down positive around X) from wave heights
  const targetPitch = Math.atan2(bow.y - stern.y, HULL_HALF_LEN * 2);
  const targetRoll = Math.atan2(port.y - starboard.y, HULL_HALF_BEAM * 2);

  // Second-order damped rocking motion (bounded to prevent uncontrolled capsizing)
  const angularStiffness = 16.5;
  const angularDamping = 4.4;

  const pitchAccel =
    (targetPitch - state.pitch) * angularStiffness - state.pitchVel * angularDamping;
  const pitchVel = state.pitchVel + pitchAccel * stepDt;
  const nextPitch = Math.max(-0.52, Math.min(0.52, state.pitch + pitchVel * stepDt));

  const rollAccel =
    (targetRoll - state.roll) * angularStiffness - state.rollVel * angularDamping;
  const rollVel = state.rollVel + rollAccel * stepDt;
  const nextRoll = Math.max(-0.56, Math.min(0.56, state.roll + rollVel * stepDt));

  // Gentle horizontal wave surf + wind leeway drift, restrained by mooring tether
  const driftForceX =
    oceanParams.windDirX * oceanParams.windStrength * 0.32 - center.normalX * 1.25;
  const driftForceZ =
    oceanParams.windDirZ * oceanParams.windStrength * 0.32 - center.normalZ * 1.25;

  const toAnchorX = state.anchorX - state.x;
  const toAnchorZ = state.anchorZ - state.z;
  const anchorDist = Math.hypot(toAnchorX, toAnchorZ);
  const tetherK = anchorDist > 1.1 ? 1.85 : 0.65;
  let forceX = driftForceX + toAnchorX * tetherK;
  let forceZ = driftForceZ + toAnchorZ * tetherK;

  // Repulsion force from island rock colliders
  const sdf = islandShoreSDF(state.x, state.z);
  const minClear = SAFE_WATER_BOUNDS.minShoreClearance;
  if (sdf < minClear + 1.5) {
    const n = islandShoreNormal(state.x, state.z);
    const repulse = Math.pow(Math.max(0, minClear + 1.5 - sdf), 2) * 5.0;
    forceX += n.x * repulse;
    forceZ += n.z * repulse;
  }

  const waterDrag = 2.6;
  let vx = state.vx + (forceX - state.vx * waterDrag) * stepDt;
  let vz = state.vz + (forceZ - state.vz * waterDrag) * stepDt;

  let nextX = state.x + vx * stepDt;
  let nextZ = state.z + vz * stepDt;

  // Keep tethered boat within 1.85m of mooring anchor so it never drifts off-screen
  const dxA = nextX - state.anchorX;
  const dzA = nextZ - state.anchorZ;
  const distA = Math.hypot(dxA, dzA);
  if (distA > 1.85) {
    nextX = state.anchorX + (dxA / distA) * 1.85;
    nextZ = state.anchorZ + (dzA / distA) * 1.85;
    vx *= 0.5;
    vz *= 0.5;
  }

  // Hard collision safety clamp so boat can never pass through rocks
  const nextSdf = islandShoreSDF(nextX, nextZ);
  if (nextSdf < minClear) {
    const safe = clampToSafeWater(nextX, nextZ);
    nextX = safe.x;
    nextZ = safe.z;
    vx *= 0.25;
    vz *= 0.25;
  }

  // Gently weathervane yaw toward the mooring buoy & incoming swells
  const desiredYaw =
    Math.atan2(-(state.buoyZ - nextZ), state.buoyX - nextX) +
    Math.PI +
    Math.sin(oceanParams.time * 0.52) * (0.07 + oceanParams.amplitude * 0.05);

  let yawDiff = desiredYaw - state.yaw;
  while (yawDiff > Math.PI) yawDiff -= Math.PI * 2;
  while (yawDiff < -Math.PI) yawDiff += Math.PI * 2;
  const nextYaw = state.yaw + yawDiff * (1 - Math.exp(-1.4 * stepDt));

  const buoyWave = sampleOceanAtWorldXZ(state.buoyX, state.buoyZ, oceanParams);

  return {
    ...state,
    x: nextX,
    y: nextY,
    z: nextZ,
    vx,
    vz,
    buoyY: buoyWave.y + 0.04,
    yaw: nextYaw,
    pitch: nextPitch,
    roll: nextRoll,
    pitchVel,
    rollVel,
    verticalVel,
    heaveOffset: nextY - center.y,
    waterNormalX: center.normalX,
    waterNormalY: center.normalY,
    waterNormalZ: center.normalZ,
    samplePoints,
  };
}
