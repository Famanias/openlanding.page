/**
 * Pure Hold-to-Inspect state machine & quaternion trackball rotation logic.
 * Zero Three.js imports so all state transitions, long-press detection,
 * gimbal-lock-free quaternion math, and backface pin culling are unit-testable.
 */

import type { InspectableObjectId } from './chapters';

export type Quat = [number, number, number, number]; // [x, y, z, w]
export type Vec3 = [number, number, number];

export const HOLD_DURATION_MS = 350;
export const MOVE_CANCEL_THRESHOLD_PX = 10;

export type InspectPhase = 'idle' | 'holding' | 'inspecting' | 'returning';

export interface HoldInspectState {
  phase: InspectPhase;
  targetObject: InspectableObjectId | null;
  holdElapsedMs: number;
  /** 0..1 progress of the ~350ms hold ring */
  holdProgress: number;
  pointerStart: { x: number; y: number };
  pointerCurrent: { x: number; y: number };
  /** Quaternion [x, y, z, w] representing the object's inspection rotation */
  quaternion: Quat;
  /** Angular velocity (rad/sec) around screen X and Y axes for weighted inertia */
  angularVelocity: { vx: number; vy: number };
  /** True once the user has successfully entered inspect mode at least once */
  hasUsedInspect: boolean;
  /** True if inspect mode was opened via the keyboard Inspect button */
  keyboardMode: boolean;
}

export interface PartPinDefinition {
  id: string;
  label: string;
  /** Local 3D position on the inspectable object group */
  localPosition: Vec3;
  /** Local outward surface normal for backface hiding when rotated away */
  localNormal: Vec3;
}

export const OBJECT_PART_PINS: Record<InspectableObjectId, readonly PartPinDefinition[]> = {
  mushroom: [
    { id: 'umbo', label: 'Umbo', localPosition: [0.0, 1.78, 0.05], localNormal: [0.0, 0.96, 0.28] },
    { id: 'cap-scales', label: 'Cap scales', localPosition: [0.85, 1.48, 0.55], localNormal: [0.52, 0.72, 0.45] },
    { id: 'gills', label: 'Gills', localPosition: [-0.72, 1.05, 0.45], localNormal: [-0.35, -0.82, 0.45] },
    { id: 'ring', label: 'Ring', localPosition: [0.28, 0.42, 0.22], localNormal: [0.75, 0.15, 0.64] },
    { id: 'stem', label: 'Stem', localPosition: [-0.18, -0.45, 0.18], localNormal: [-0.71, 0.0, 0.71] },
    { id: 'bulb', label: 'Bulb', localPosition: [0.36, -1.52, 0.32], localNormal: [0.72, 0.15, 0.68] },
  ],
  clump: [
    { id: 'rhizomorphs', label: 'Rhizomorphs', localPosition: [0.58, 0.25, 0.62], localNormal: [0.62, 0.28, 0.73] },
    { id: 'hyphae', label: 'Hyphae', localPosition: [-0.62, 0.35, 0.48], localNormal: [-0.68, 0.38, 0.62] },
    { id: 'substrate', label: 'Substrate', localPosition: [0.42, -0.32, -0.55], localNormal: [0.52, -0.38, -0.76] },
  ],
  tray: [
    { id: 'grown-surface', label: 'Grown surface', localPosition: [-0.54, 0.15, -0.29], localNormal: [-0.25, 0.92, -0.3] },
    { id: 'fibre-core', label: 'Fibre core', localPosition: [0.88, 0.06, 0.56], localNormal: [0.68, 0.22, 0.7] },
    { id: 'lip', label: 'Lip', localPosition: [-1.04, 0.26, 0.38], localNormal: [-0.75, 0.52, 0.4] },
  ],
};

export function createInitialInspectState(): HoldInspectState {
  return {
    phase: 'idle',
    targetObject: null,
    holdElapsedMs: 0,
    holdProgress: 0,
    pointerStart: { x: 0, y: 0 },
    pointerCurrent: { x: 0, y: 0 },
    quaternion: [0, 0, 0, 1],
    angularVelocity: { vx: 0, vy: 0 },
    hasUsedInspect: false,
    keyboardMode: false,
  };
}

export function quatNormalize(q: Quat): Quat {
  const len = Math.hypot(q[0], q[1], q[2], q[3]);
  if (len < 1e-8) return [0, 0, 0, 1];
  return [q[0] / len, q[1] / len, q[2] / len, q[3] / len];
}

export function quatFromAxisAngle(axis: Vec3, angleRad: number): Quat {
  const len = Math.hypot(axis[0], axis[1], axis[2]);
  if (len < 1e-8 || Math.abs(angleRad) < 1e-8) return [0, 0, 0, 1];
  const half = angleRad * 0.5;
  const s = Math.sin(half) / len;
  return quatNormalize([axis[0] * s, axis[1] * s, axis[2] * s, Math.cos(half)]);
}

export function quatMultiply(a: Quat, b: Quat): Quat {
  const [ax, ay, az, aw] = a;
  const [bx, by, bz, bw] = b;
  return quatNormalize([
    aw * bx + ax * bw + ay * bz - az * by,
    aw * by - ax * bz + ay * bw + az * bx,
    aw * bz + ax * by - ay * bx + az * bw,
    aw * bw - ax * bx - ay * by - az * bz,
  ]);
}

export function quatSlerp(a: Quat, b: Quat, t: number): Quat {
  const clampedT = Math.max(0, Math.min(1, t));
  let [bx, by, bz, bw] = b;
  let cosHalfTheta = a[0] * bx + a[1] * by + a[2] * bz + a[3] * bw;

  if (cosHalfTheta < 0) {
    bx = -bx;
    by = -by;
    bz = -bz;
    bw = -bw;
    cosHalfTheta = -cosHalfTheta;
  }

  if (cosHalfTheta >= 0.9995) {
    return quatNormalize([
      a[0] + (bx - a[0]) * clampedT,
      a[1] + (by - a[1]) * clampedT,
      a[2] + (bz - a[2]) * clampedT,
      a[3] + (bw - a[3]) * clampedT,
    ]);
  }

  const halfTheta = Math.acos(cosHalfTheta);
  const sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);
  const ratioA = Math.sin((1 - clampedT) * halfTheta) / sinHalfTheta;
  const ratioB = Math.sin(clampedT * halfTheta) / sinHalfTheta;

  return quatNormalize([
    a[0] * ratioA + bx * ratioB,
    a[1] * ratioA + by * ratioB,
    a[2] * ratioA + bz * ratioB,
    a[3] * ratioA + bw * ratioB,
  ]);
}

export function rotateVec3ByQuat(v: Vec3, q: Quat): Vec3 {
  const [qx, qy, qz, qw] = q;
  const [vx, vy, vz] = v;
  // t = 2 * cross(q.xyz, v)
  const tx = 2 * (qy * vz - qz * vy);
  const ty = 2 * (qz * vx - qx * vz);
  const tz = 2 * (qx * vy - qy * vx);
  // v' = v + qw * t + cross(q.xyz, t)
  return [
    vx + qw * tx + (qy * tz - qz * ty),
    vy + qw * ty + (qz * tx - qx * tz),
    vz + qw * tz + (qx * ty - qy * tx),
  ];
}

/**
 * Applies screen-space drag deltas (dx, dy) to a quaternion using camera-relative
 * right [1,0,0] and up [0,1,0] axes so the user can freely rotate the object
 * 360 degrees in any direction (straight down at top, straight up at underside)
 * with zero gimbal lock.
 */
export function applyDragDeltaToQuaternion(
  currentQuat: Quat,
  dxPx: number,
  dyPx: number,
  sensitivity = 0.0075,
): Quat {
  const qYaw = quatFromAxisAngle([0, 1, 0], dxPx * sensitivity);
  const qPitch = quatFromAxisAngle([1, 0, 0], dyPx * sensitivity);
  const deltaQuat = quatMultiply(qPitch, qYaw);
  return quatMultiply(deltaQuat, currentQuat);
}

/**
 * Determines whether a part pin is facing toward the camera.
 * Hides the label when the surface normal points away from the viewer.
 */
export function isPinFacingCamera(
  localNormal: Vec3,
  objectQuat: Quat,
  cameraViewDir: Vec3 = [0, 0, 1],
): boolean {
  const worldNormal = rotateVec3ByQuat(localNormal, objectQuat);
  const dot =
    worldNormal[0] * cameraViewDir[0] +
    worldNormal[1] * cameraViewDir[1] +
    worldNormal[2] * cameraViewDir[2];
  return dot > -0.05;
}

export function onInspectPointerDown(
  state: HoldInspectState,
  targetObject: InspectableObjectId,
  x: number,
  y: number,
): HoldInspectState {
  if (state.phase === 'inspecting' && state.keyboardMode) {
    // Allow pointer drag when already inspecting via keyboard
    return {
      ...state,
      pointerStart: { x, y },
      pointerCurrent: { x, y },
    };
  }
  return {
    ...state,
    phase: 'holding',
    targetObject,
    holdElapsedMs: 0,
    holdProgress: 0,
    pointerStart: { x, y },
    pointerCurrent: { x, y },
    angularVelocity: { vx: 0, vy: 0 },
    keyboardMode: false,
  };
}

export function onInspectPointerMove(
  state: HoldInspectState,
  x: number,
  y: number,
  dtSec = 1 / 60,
): HoldInspectState {
  if (state.phase === 'holding') {
    const dist = Math.hypot(x - state.pointerStart.x, y - state.pointerStart.y);
    if (dist > MOVE_CANCEL_THRESHOLD_PX) {
      // Ordinary swipe or scroll — cancel hold immediately
      return {
        ...state,
        phase: 'idle',
        targetObject: null,
        holdElapsedMs: 0,
        holdProgress: 0,
      };
    }
    return {
      ...state,
      pointerCurrent: { x, y },
    };
  }

  if (state.phase === 'inspecting') {
    const dx = x - state.pointerCurrent.x;
    const dy = y - state.pointerCurrent.y;
    const nextQuat = applyDragDeltaToQuaternion(state.quaternion, dx, dy);
    const safeDt = Math.max(0.004, dtSec);
    return {
      ...state,
      pointerCurrent: { x, y },
      quaternion: nextQuat,
      angularVelocity: {
        vx: (dx * 0.0075) / safeDt,
        vy: (dy * 0.0075) / safeDt,
      },
    };
  }

  return state;
}

export function onInspectPointerUp(state: HoldInspectState): HoldInspectState {
  if (state.phase === 'holding') {
    // Quick tap (< 350ms) must NOT trigger inspect
    return {
      ...state,
      phase: 'idle',
      targetObject: null,
      holdElapsedMs: 0,
      holdProgress: 0,
    };
  }

  if (state.phase === 'inspecting' && !state.keyboardMode) {
    return {
      ...state,
      phase: 'returning',
      angularVelocity: { vx: 0, vy: 0 },
    };
  }

  return state;
}

export function toggleKeyboardInspect(
  state: HoldInspectState,
  targetObject: InspectableObjectId,
): HoldInspectState {
  if (state.phase === 'inspecting' && state.targetObject === targetObject) {
    return {
      ...state,
      phase: 'returning',
      keyboardMode: false,
      angularVelocity: { vx: 0, vy: 0 },
    };
  }
  return {
    ...state,
    phase: 'inspecting',
    targetObject,
    holdElapsedMs: HOLD_DURATION_MS,
    holdProgress: 1,
    hasUsedInspect: true,
    keyboardMode: true,
    angularVelocity: { vx: 0, vy: 0 },
  };
}

export function exitInspectMode(state: HoldInspectState): HoldInspectState {
  if (state.phase === 'inspecting' || state.phase === 'holding') {
    return {
      ...state,
      phase: 'returning',
      holdElapsedMs: 0,
      holdProgress: 0,
      keyboardMode: false,
      angularVelocity: { vx: 0, vy: 0 },
    };
  }
  return state;
}

export function applyKeyboardRotationStep(
  state: HoldInspectState,
  key: 'ArrowLeft' | 'ArrowRight' | 'ArrowUp' | 'ArrowDown',
): HoldInspectState {
  if (state.phase !== 'inspecting') return state;
  const stepPx = 34;
  const dx = key === 'ArrowRight' ? stepPx : key === 'ArrowLeft' ? -stepPx : 0;
  const dy = key === 'ArrowDown' ? stepPx : key === 'ArrowUp' ? -stepPx : 0;
  return {
    ...state,
    quaternion: applyDragDeltaToQuaternion(state.quaternion, dx, dy),
  };
}

export function tickInspectState(state: HoldInspectState, dtMs: number): HoldInspectState {
  const dtSec = Math.min(0.1, Math.max(0, dtMs / 1000));

  if (state.phase === 'holding') {
    const nextElapsed = state.holdElapsedMs + dtMs;
    const progress = Math.min(1, nextElapsed / HOLD_DURATION_MS);
    if (nextElapsed >= HOLD_DURATION_MS) {
      return {
        ...state,
        phase: 'inspecting',
        holdElapsedMs: HOLD_DURATION_MS,
        holdProgress: 1,
        hasUsedInspect: true,
      };
    }
    return {
      ...state,
      holdElapsedMs: nextElapsed,
      holdProgress: progress,
    };
  }

  if (state.phase === 'inspecting') {
    // Apply slight rotational inertia decay when not actively dragging
    const { vx, vy } = state.angularVelocity;
    if (Math.hypot(vx, vy) > 0.001) {
      const damping = Math.exp(-8.5 * dtSec);
      const qYaw = quatFromAxisAngle([0, 1, 0], vx * dtSec * 0.25);
      const qPitch = quatFromAxisAngle([1, 0, 0], vy * dtSec * 0.25);
      const nextQuat = quatMultiply(quatMultiply(qPitch, qYaw), state.quaternion);
      return {
        ...state,
        quaternion: nextQuat,
        angularVelocity: {
          vx: vx * damping,
          vy: vy * damping,
        },
      };
    }
    return state;
  }

  if (state.phase === 'returning') {
    const alpha = 1 - Math.exp(-9.0 * dtSec);
    const nextQuat = quatSlerp(state.quaternion, [0, 0, 0, 1], alpha);
    const angleRemaining = 2 * Math.acos(Math.min(1, Math.abs(nextQuat[3])));
    if (angleRemaining < 0.01) {
      return {
        ...state,
        phase: 'idle',
        targetObject: null,
        holdElapsedMs: 0,
        holdProgress: 0,
        quaternion: [0, 0, 0, 1],
        angularVelocity: { vx: 0, vy: 0 },
        keyboardMode: false,
      };
    }
    return {
      ...state,
      quaternion: nextQuat,
    };
  }

  return state;
}
