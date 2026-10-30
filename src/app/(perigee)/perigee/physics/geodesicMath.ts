export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface CameraRigState {
  r: number;
  opticalR: number;
  pitch: number;
  yaw: number;
  camPos: Vec3;
  camTarget: Vec3;
  roll: number;
  fov: number;
  screenOffset: [number, number];
  lensingMass: number;
  dopplerBoost: number;
  diskOpacity: number;
  jetIntensity: number;
  chapterIndex: number; // 0..5
  chapterProgress: number; // 0..1 within current chapter
}

export interface ChapterSpec {
  id: number;
  numberLabel: string;
  title: string;
  subtitle: string;
  headline?: string;
  copy: string;
  rStart: number;
  rEnd: number;
  pitchStart: number;
  pitchEnd: number;
  yawStart: number;
  yawEnd: number;
  rollStart: number;
  rollEnd: number;
  fovStart: number;
  fovEnd: number;
  offsetStart: [number, number];
  offsetEnd: [number, number];
  dopplerStart: number;
  dopplerEnd: number;
  jetStart: number;
  jetEnd: number;
  inspectable: boolean;
  restProgress: number; // normalized [0..1] scroll rest anchor for this chapter
}

export const CHAPTERS: ChapterSpec[] = [
  {
    id: 1,
    numberLabel: '01',
    title: 'The Shadow',
    subtitle: 'ORBITAL ESTABLISHER · r = 38.0 → 24.0 Rs',
    headline: 'PERIGEE',
    copy: 'Light does not travel in straight lines.',
    rStart: 38.0,
    rEnd: 24.0,
    pitchStart: 0.14,
    pitchEnd: 0.11,
    yawStart: 0.0,
    yawEnd: 0.45,
    rollStart: -0.15,
    rollEnd: -0.12,
    fovStart: 1.7,
    fovEnd: 1.7,
    offsetStart: [0.0, 0.0],
    offsetEnd: [0.0, 0.0],
    dopplerStart: 0.6,
    dopplerEnd: 0.65,
    jetStart: 0.0,
    jetEnd: 0.0,
    inspectable: true,
    restProgress: 0.0,
  },
  {
    id: 2,
    numberLabel: '02',
    title: 'Accretion Plane',
    subtitle: 'KEPLERIAN SHEAR ZONE · r = 24.0 → 9.0 Rs',
    copy: 'Matter in terminal orbit. Superheated plasma shearing at forty percent the speed of light.',
    rStart: 24.0,
    rEnd: 9.0,
    pitchStart: 0.11,
    pitchEnd: 0.03,
    yawStart: 0.45,
    yawEnd: 1.15,
    rollStart: -0.12,
    rollEnd: -0.02,
    fovStart: 1.7,
    fovEnd: 1.55,
    offsetStart: [0.0, 0.0],
    offsetEnd: [0.0, 0.0],
    dopplerStart: 0.65,
    dopplerEnd: 0.78,
    jetStart: 0.0,
    jetEnd: 0.0,
    inspectable: false,
    restProgress: 0.2,
  },
  {
    id: 3,
    numberLabel: '03',
    title: 'Doppler Limb',
    subtitle: 'RELATIVISTIC BEAMING WING · r = 9.0 → 4.8 Rs',
    copy: 'Relativistic beaming. What approaches blinds; what recedes fades into infrared.',
    rStart: 9.0,
    rEnd: 4.8,
    pitchStart: 0.03,
    pitchEnd: 0.08,
    yawStart: 1.15,
    yawEnd: 1.85,
    rollStart: -0.02,
    rollEnd: -0.32,
    fovStart: 1.55,
    fovEnd: 1.42,
    offsetStart: [0.0, 0.0],
    offsetEnd: [0.0, 0.0],
    dopplerStart: 0.78,
    dopplerEnd: 1.15,
    jetStart: 0.0,
    jetEnd: 0.0,
    inspectable: true,
    restProgress: 0.4,
  },
  {
    id: 4,
    numberLabel: '04',
    title: 'The Photon Sphere',
    subtitle: 'UNSTABLE LIGHT TRAP · r = 4.8 → 1.65 Rs',
    copy: 'The photon sphere. Where gravity traps light in a closed circular mirror.',
    rStart: 4.8,
    rEnd: 1.65,
    pitchStart: 0.08,
    pitchEnd: 0.05,
    yawStart: 1.85,
    yawEnd: 2.55,
    rollStart: -0.32,
    rollEnd: -0.08,
    fovStart: 1.42,
    fovEnd: 1.15,
    offsetStart: [0.0, 0.0],
    offsetEnd: [0.0, 0.0],
    dopplerStart: 1.15,
    dopplerEnd: 0.75,
    jetStart: 0.0,
    jetEnd: 0.0,
    inspectable: false,
    restProgress: 0.6,
  },
  {
    id: 5,
    numberLabel: '05',
    title: 'Innermost Stable Orbit',
    subtitle: 'EXTREME TIME DILATION · r = 1.65 → 1.18 Rs',
    copy: 'Beyond the ISCO boundary, no circular orbit survives. External starlight accelerates while local clocks freeze.',
    rStart: 1.65,
    rEnd: 1.18,
    pitchStart: 0.05,
    pitchEnd: 0.12,
    yawStart: 2.55,
    yawEnd: 3.25,
    rollStart: -0.08,
    rollEnd: 0.0,
    fovStart: 1.15,
    fovEnd: 1.05,
    offsetStart: [0.0, 0.0],
    offsetEnd: [0.0, 0.0],
    dopplerStart: 0.75,
    dopplerEnd: 0.65,
    jetStart: 0.0,
    jetEnd: 0.15,
    inspectable: true,
    restProgress: 0.8,
  },
  {
    id: 6,
    numberLabel: '06',
    title: 'Polar Escape',
    subtitle: 'NORTH MAGNETIC AXIS · r = 1.18 → 18.0 Rs',
    copy: 'Ascending the rotational pole as a collimated relativistic jet ignites along the magnetic spine.',
    rStart: 1.18,
    rEnd: 18.0,
    pitchStart: 0.12,
    pitchEnd: 1.42,
    yawStart: 3.25,
    yawEnd: 4.1,
    rollStart: 0.0,
    rollEnd: 0.08,
    fovStart: 1.05,
    fovEnd: 1.65,
    offsetStart: [0.0, 0.0],
    offsetEnd: [0.0, 0.0],
    dopplerStart: 0.65,
    dopplerEnd: 0.6,
    jetStart: 0.15,
    jetEnd: 1.0,
    inspectable: false,
    restProgress: 1.0,
  },
];

export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1), 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * Computes gravitational redshift z = 1 / sqrt(1 - 1/r) - 1
 * where r is in Schwarzschild radii (Rs = 2GM/c^2 = 1.0 in shader units).
 */
export function computeGravitationalRedshift(rInRs: number): number {
  const safeR = Math.max(rInRs, 1.005);
  return 1 / Math.sqrt(1 - 1 / safeR) - 1;
}

/**
 * Computes local gravitational time dilation factor gamma = dt_infinity / d_tau = 1 / sqrt(1 - 1/r)
 */
export function computeTimeDilation(rInRs: number): number {
  const safeR = Math.max(rInRs, 1.005);
  return 1 / Math.sqrt(1 - 1 / safeR);
}

/**
 * Converts spherical camera coordinates (r, pitch, yaw) to Cartesian world position
 */
export function sphericalToCartesian(r: number, pitch: number, yaw: number): Vec3 {
  const cp = Math.cos(pitch);
  return {
    x: Math.sin(yaw) * cp * r,
    y: Math.sin(pitch) * r,
    z: Math.cos(yaw) * cp * r,
  };
}

/**
 * Deterministically computes the camera rig and shader uniform state for any scroll progress [0..1].
 * Progress 0.0 corresponds to Chapter 1 start (r = 38 Rs),
 * and each of the 6 chapters occupies 1/5th of the transitions or segments.
 * Specifically, we map scrollProgress [0..1] across the 6 chapters so that:
 * - At restProgress 0.0 -> Ch 1
 * - At restProgress 0.2 -> Ch 2
 * - At restProgress 0.4 -> Ch 3
 * - At restProgress 0.6 -> Ch 4
 * - At restProgress 0.8 -> Ch 5
 * - At restProgress 1.0 -> Ch 6
 */
export function interpolateTimelineState(scrollProgress: number, ambientYawOffset = 0): CameraRigState {
  const p = clamp(scrollProgress, 0, 1);

  // Map p [0..1] into 6 chapter segments [0..6]
  // Using 5 transitions between 6 chapter rest states, or 6 continuous chapter intervals.
  // Let's make each chapter span 1/6 of scroll or define keyframes at 0, 0.2, 0.4, 0.6, 0.8, 1.0
  // so that at each chapter rest point, the camera is at the exact signature pose of that chapter!
  const keyframes = [
    {
      // Ch 1: THE SHADOW (r = 38.0 Rs, dead-center singularity)
      r: 38.0,
      opticalR: 28.0,
      pitch: 0.13,
      yaw: 0.1,
      roll: -0.15,
      fov: 1.7,
      offset: [0.0, 0.0] as [number, number],
      doppler: 0.6,
      jet: 0.0,
      target: { x: 0, y: 0, z: 0 },
    },
    {
      // Ch 2: ACCRETION PLANE (r = 12.5 Rs, dead-center singularity)
      r: 12.5,
      opticalR: 16.5,
      pitch: 0.04,
      yaw: 0.85,
      roll: -0.02,
      fov: 1.55,
      offset: [0.0, 0.0] as [number, number],
      doppler: 0.72,
      jet: 0.0,
      target: { x: 0, y: 0, z: 0 },
    },
    {
      // Ch 3: DOPPLER LIMB (r = 5.6 Rs, dead-center singularity with relativistic banking)
      r: 5.6,
      opticalR: 12.8,
      pitch: 0.07,
      yaw: 1.65,
      roll: -0.32,
      fov: 1.42,
      offset: [0.0, 0.0] as [number, number],
      doppler: 1.15,
      jet: 0.0,
      target: { x: 0, y: 0, z: 0 },
    },
    {
      // Ch 4: THE PHOTON SPHERE (r = 1.65 Rs, full 360° photon ring centered)
      r: 1.65,
      opticalR: 10.6,
      pitch: 0.06,
      yaw: 2.4,
      roll: -0.06,
      fov: 1.25,
      offset: [0.0, 0.0] as [number, number],
      doppler: 0.78,
      jet: 0.0,
      target: { x: 0, y: 0, z: 0 },
    },
    {
      // Ch 5: INNERMOST STABLE ORBIT (r = 1.18 Rs, centered close-up of Horizon, Photon Sphere & ISCO)
      r: 1.18,
      opticalR: 9.2,
      pitch: 0.14,
      yaw: 3.15,
      roll: -0.11,
      fov: 1.18,
      offset: [0.0, 0.0] as [number, number],
      doppler: 0.88,
      jet: 0.16,
      target: { x: 0, y: 0, z: 0 },
    },
    {
      // Ch 6: POLAR ESCAPE (r = 18.0 Rs, pitch = 1.42 rad north polar ascent, jet = 1.0, centered)
      r: 18.0,
      opticalR: 18.0,
      pitch: 1.42,
      yaw: 4.0,
      roll: 0.06,
      fov: 1.65,
      offset: [0.0, 0.0] as [number, number],
      doppler: 0.6,
      jet: 1.0,
      target: { x: 0, y: 0, z: 0 },
    },
  ];

  const scaled = p * 5; // 0..5
  const segIdx = Math.min(Math.floor(scaled), 4);
  const localT = smoothstep(0, 1, scaled - segIdx);

  const k0 = keyframes[segIdx];
  const k1 = keyframes[segIdx + 1];

  const r = lerp(k0.r, k1.r, localT);
  const opticalR = lerp(k0.opticalR, k1.opticalR, localT);
  const pitch = lerp(k0.pitch, k1.pitch, localT);
  const yaw = lerp(k0.yaw, k1.yaw, localT) + ambientYawOffset;
  const roll = lerp(k0.roll, k1.roll, localT);
  const fov = lerp(k0.fov, k1.fov, localT);
  const screenOffset: [number, number] = [
    lerp(k0.offset[0], k1.offset[0], localT),
    lerp(k0.offset[1], k1.offset[1], localT),
  ];
  const dopplerBoost = lerp(k0.doppler, k1.doppler, localT);
  const jetIntensity = lerp(k0.jet, k1.jet, localT);

  const camPos = sphericalToCartesian(opticalR, pitch, yaw);
  const camTarget = {
    x: lerp(k0.target.x, k1.target.x, localT),
    y: lerp(k0.target.y, k1.target.y, localT),
    z: lerp(k0.target.z, k1.target.z, localT),
  };

  const chapterIndex = Math.min(Math.round(p * 5), 5);
  const chapterProgress = clamp(1 - Math.abs(p * 5 - chapterIndex), 0, 1);

  return {
    r,
    opticalR,
    pitch,
    yaw,
    camPos,
    camTarget,
    roll,
    fov,
    screenOffset,
    lensingMass: 1.5,
    dopplerBoost,
    diskOpacity: 1.0,
    jetIntensity,
    chapterIndex,
    chapterProgress,
  };
}

/**
 * Integrates a test photon trajectory through the exact same Schwarzschild potential
 * used inside the fragment shader: a = -uLensingMass * h^2 * r / |r|^5
 */
export function computeGeodesicTrajectory(
  startPos: Vec3,
  initialDir: Vec3,
  lensingMass = 1.5,
  maxSteps = 220
): {
  points: Vec3[];
  outcome: 'CAPTURED' | 'SLINGSHOT' | 'DEFLECTED';
  minRadius: number;
  impactParameterB: number;
} {
  const points: Vec3[] = [{ ...startPos }];
  let pos = { ...startPos };
  const dLen = Math.hypot(initialDir.x, initialDir.y, initialDir.z) || 1;
  let vel = { x: initialDir.x / dLen, y: initialDir.y / dLen, z: initialDir.z / dLen };

  // Specific angular momentum squared: h^2 = |pos x vel|^2
  const hx = pos.y * vel.z - pos.z * vel.y;
  const hy = pos.z * vel.x - pos.x * vel.z;
  const hz = pos.x * vel.y - pos.y * vel.x;
  const h2 = hx * hx + hy * hy + hz * hz;
  const impactParameterB = Math.sqrt(h2);

  let minRadius = Infinity;
  let captured = false;

  for (let i = 0; i < maxSteps; i++) {
    const r2 = pos.x * pos.x + pos.y * pos.y + pos.z * pos.z;
    const rl = Math.sqrt(r2);
    if (rl < minRadius) minRadius = rl;

    if (rl <= 1.02) {
      captured = true;
      break;
    }
    if (rl > 55.0) break;

    const dt = Math.min(Math.max(0.07 * rl, 0.02), 0.7);
    const factor = (-lensingMass * h2) / Math.pow(r2, 2.5);

    vel = {
      x: vel.x + factor * pos.x * dt,
      y: vel.y + factor * pos.y * dt,
      z: vel.z + factor * pos.z * dt,
    };
    pos = {
      x: pos.x + vel.x * dt,
      y: pos.y + vel.y * dt,
      z: pos.z + vel.z * dt,
    };
    points.push({ ...pos });
  }

  const outcome = captured
    ? 'CAPTURED'
    : minRadius < 2.95
    ? 'SLINGSHOT'
    : 'DEFLECTED';

  return { points, outcome, minRadius, impactParameterB };
}

/**
 * Projects a 3D world point (in Rs units) onto 2D normalized viewport coordinates [0..1]
 * matching the exact GLSL camera basis in BLACK_HOLE_FRAGMENT_SHADER.
 */
export function projectWorldToScreen(
  worldPt: Vec3,
  rig: CameraRigState,
  aspect: number
): { x: number; y: number; visible: boolean; depth: number } {
  const dx = rig.camTarget.x - rig.camPos.x;
  const dy = rig.camTarget.y - rig.camPos.y;
  const dz = rig.camTarget.z - rig.camPos.z;
  const fLen = Math.hypot(dx, dy, dz) || 1;
  const fw = { x: dx / fLen, y: dy / fLen, z: dz / fLen };

  const worldUp = Math.abs(fw.y) > 0.99 ? { x: 0, y: 0, z: 1 } : { x: 0, y: 1, z: 0 };
  const rx = worldUp.y * fw.z - worldUp.z * fw.y;
  const ry = worldUp.z * fw.x - worldUp.x * fw.z;
  const rz = worldUp.x * fw.y - worldUp.y * fw.x;
  const rLen = Math.hypot(rx, ry, rz) || 1;
  const rt = { x: rx / rLen, y: ry / rLen, z: rz / rLen };

  const up = {
    x: fw.y * rt.z - fw.z * rt.y,
    y: fw.z * rt.x - fw.x * rt.z,
    z: fw.x * rt.y - fw.y * rt.x,
  };

  const c = Math.cos(rig.roll);
  const s = Math.sin(rig.roll);
  const rt2 = { x: rt.x * c + up.x * s, y: rt.y * c + up.y * s, z: rt.z * c + up.z * s };
  const up2 = { x: up.x * c - rt.x * s, y: up.y * c - rt.y * s, z: up.z * c - rt.z * s };

  const vx = worldPt.x - rig.camPos.x;
  const vy = worldPt.y - rig.camPos.y;
  const vz = worldPt.z - rig.camPos.z;

  const zCam = vx * fw.x + vy * fw.y + vz * fw.z;
  if (zCam <= 0.1) return { x: 0.5, y: 0.5, visible: false, depth: zCam };

  const xCam = vx * rt2.x + vy * rt2.y + vz * rt2.z;
  const yCam = vx * up2.x + vy * up2.y + vz * up2.z;

  const uvX = (xCam / zCam) * rig.fov + rig.screenOffset[0];
  const uvY = (yCam / zCam) * rig.fov + rig.screenOffset[1];

  const screenX = 0.5 + uvX / aspect;
  const screenY = 0.5 - uvY; // top-down CSS coordinates

  return {
    x: screenX,
    y: screenY,
    visible: screenX >= 0.02 && screenX <= 0.98 && screenY >= 0.02 && screenY <= 0.98,
    depth: zCam,
  };
}

/**
 * Converts normalized screen coordinates (0..1) and drag vector into a 3D launch ray
 * aligned with the camera basis in BLACK_HOLE_FRAGMENT_SHADER.
 */
export function screenDragToLaunchRay(
  startScreenX: number,
  startScreenY: number,
  dragDxNormalized: number,
  dragDyNormalized: number,
  rig: CameraRigState,
  aspect: number
): { launchOrigin: Vec3; launchDir: Vec3; impactParameterB: number } {
  const dx = rig.camTarget.x - rig.camPos.x;
  const dy = rig.camTarget.y - rig.camPos.y;
  const dz = rig.camTarget.z - rig.camPos.z;
  const fLen = Math.hypot(dx, dy, dz) || 1;
  const fw = { x: dx / fLen, y: dy / fLen, z: dz / fLen };

  const worldUp = Math.abs(fw.y) > 0.99 ? { x: 0, y: 0, z: 1 } : { x: 0, y: 1, z: 0 };
  const rx = worldUp.y * fw.z - worldUp.z * fw.y;
  const ry = worldUp.z * fw.x - worldUp.x * fw.z;
  const rz = worldUp.x * fw.y - worldUp.y * fw.x;
  const rLen = Math.hypot(rx, ry, rz) || 1;
  const rt = { x: rx / rLen, y: ry / rLen, z: rz / rLen };

  const up = {
    x: fw.y * rt.z - fw.z * rt.y,
    y: fw.z * rt.x - fw.x * rt.z,
    z: fw.x * rt.y - fw.y * rt.x,
  };

  const c = Math.cos(rig.roll);
  const s = Math.sin(rig.roll);
  const rt2 = { x: rt.x * c + up.x * s, y: rt.y * c + up.y * s, z: rt.z * c + up.z * s };
  const up2 = { x: up.x * c - rt.x * s, y: up.y * c - rt.y * s, z: up.z * c - rt.z * s };

  // Convert screen point + pullback vector into ray direction
  const aimX = clamp(startScreenX - dragDxNormalized * 1.4, 0.05, 0.95);
  const aimY = clamp(startScreenY - dragDyNormalized * 1.4, 0.05, 0.95);

  const uvX = (aimX - 0.5) * aspect - rig.screenOffset[0];
  const uvY = 0.5 - aimY - rig.screenOffset[1];

  const rdx = fw.x * rig.fov + rt2.x * uvX + up2.x * uvY;
  const rdy = fw.y * rig.fov + rt2.y * uvX + up2.y * uvY;
  const rdz = fw.z * rig.fov + rt2.z * uvX + up2.z * uvY;
  const rdLen = Math.hypot(rdx, rdy, rdz) || 1;

  const launchDir = {
    x: rdx / rdLen,
    y: rdy / rdLen,
    z: rdz / rdLen,
  };

  // Start slightly ahead of camera so the ribbon is immediately visible in front of the lens
  const launchOrigin = {
    x: rig.camPos.x + fw.x * 0.35 + rt2.x * ((startScreenX - 0.5) * 0.4),
    y: rig.camPos.y + fw.y * 0.35 + up2.y * ((0.5 - startScreenY) * 0.4),
    z: rig.camPos.z + fw.z * 0.35,
  };

  const hx = launchOrigin.y * launchDir.z - launchOrigin.z * launchDir.y;
  const hy = launchOrigin.z * launchDir.x - launchOrigin.x * launchDir.z;
  const hz = launchOrigin.x * launchDir.y - launchOrigin.y * launchDir.x;
  const impactParameterB = Math.hypot(hx, hy, hz);

  return { launchOrigin, launchDir, impactParameterB };
}

/**
 * Pure state machine helper for Hold-to-Inspect Singularity Lensing Mode
 */
export interface HoldInspectState {
  isHolding: boolean;
  isLocked: boolean;
  holdProgress: number; // 0..1 over 350ms
  yawDelta: number;
  pitchDelta: number;
  lensingMass: number; // 0.3..2.8 (default 1.5)
  diskOpacity: number; // 0.15..1.0 (default 1.0)
}

export function computeInspectParametersFromDrag(
  normDx: number, // -1..1 horizontal drag across viewport
  normDy: number, // -1..1 vertical drag across viewport
  basePitch: number
): {
  yawDelta: number;
  targetPitch: number;
  lensingMass: number;
  diskOpacity: number;
} {
  const yawDelta = normDx * Math.PI * 0.85;
  const lensingMass = clamp(1.5 + normDx * 1.3, 0.3, 2.8);
  const targetPitch = clamp(basePitch + normDy * 0.85, -0.8, 0.8);
  const verticalMagnitude = clamp(Math.abs(normDy) * 1.6, 0, 1);
  const diskOpacity = lerp(1.0, 0.15, verticalMagnitude);

  return {
    yawDelta,
    targetPitch,
    lensingMass,
    diskOpacity,
  };
}

export interface AnatomicalPin3D {
  id: string;
  label: string;
  metric: string;
  worldPos: Vec3;
}

/**
 * Returns the 6 anatomical 3D pins for Hold-to-Inspect Singularity Lensing Mode
 * and the 4 architectural callout labels for Chapter 5 (Innermost Stable Orbit).
 */
export function getInspectAnatomicalPins(rig: CameraRigState): AnatomicalPin3D[] {
  const dx = -rig.camPos.x;
  const dy = -rig.camPos.y;
  const dz = -rig.camPos.z;
  const fLen = Math.hypot(dx, dy, dz) || 1;
  const fw = { x: dx / fLen, y: dy / fLen, z: dz / fLen };
  const worldUp = Math.abs(fw.y) > 0.99 ? { x: 0, y: 0, z: 1 } : { x: 0, y: 1, z: 0 };
  const rx = worldUp.y * fw.z - worldUp.z * fw.y;
  const ry = worldUp.z * fw.x - worldUp.x * fw.z;
  const rz = worldUp.x * fw.y - worldUp.y * fw.x;
  const rLen = Math.hypot(rx, ry, rz) || 1;
  const rt = { x: rx / rLen, y: ry / rLen, z: rz / rLen };

  // Scale radial offsets gently with camera distance so pins never bunch together at r = 38 Rs or clip off-screen at r = 1.2 Rs
  const scale = clamp((rig.opticalR || rig.r) / 20.0, 0.32, 1.45);

  return [
    {
      id: 'zenith-arch',
      label: 'Warped Zenith Arch',
      metric: 'Δθ = 180° Lensed',
      worldPos: { x: -rt.x * 0.6 * scale, y: 3.3 * scale, z: -rt.z * 0.6 * scale },
    },
    {
      id: 'photon-ring',
      label: 'Primary Photon Ring',
      metric: 'r = 1.50 Rs',
      worldPos: { x: rt.x * 2.5 * scale, y: 1.9 * scale, z: rt.z * 2.5 * scale },
    },
    {
      id: 'blue-wing',
      label: 'Approaching Blue-Shift Wing',
      metric: 'v ≈ +0.42c',
      worldPos: { x: -rt.x * 6.2 * scale, y: 0.35 * scale, z: -rt.z * 6.2 * scale },
    },
    {
      id: 'shadow',
      label: 'Schwarzschild Shadow',
      metric: 'r = 1.00 Rs',
      worldPos: { x: 0, y: 0.12 * scale, z: 0 },
    },
    {
      id: 'red-wing',
      label: 'Receding Red-Shift Wing',
      metric: 'v ≈ -0.42c',
      worldPos: { x: rt.x * 5.6 * scale, y: -0.35 * scale, z: rt.z * 5.6 * scale },
    },
    {
      id: 'isco-gap',
      label: 'Inner ISCO Gap',
      metric: 'r < 2.20 Rs',
      worldPos: { x: -rt.x * 2.4 * scale, y: -2.7 * scale, z: -rt.z * 2.4 * scale },
    },
  ];
}

export function getChapter5CalloutPins(rig: CameraRigState): AnatomicalPin3D[] {
  const dx = -rig.camPos.x;
  const dy = -rig.camPos.y;
  const dz = -rig.camPos.z;
  const fLen = Math.hypot(dx, dy, dz) || 1;
  const fw = { x: dx / fLen, y: dy / fLen, z: dz / fLen };
  const worldUp = Math.abs(fw.y) > 0.99 ? { x: 0, y: 0, z: 1 } : { x: 0, y: 1, z: 0 };
  const rx = worldUp.y * fw.z - worldUp.z * fw.y;
  const ry = worldUp.z * fw.x - worldUp.x * fw.z;
  const rz = worldUp.x * fw.y - worldUp.y * fw.x;
  const rLen = Math.hypot(rx, ry, rz) || 1;
  const rt = { x: rx / rLen, y: ry / rLen, z: rz / rLen };

  return [
    {
      id: 'ch5-secondary',
      label: 'Secondary Lensed Image',
      metric: 'n = 2 Einstein Ring',
      worldPos: { x: -rt.x * 2.15, y: 1.55, z: -rt.z * 2.15 },
    },
    {
      id: 'ch5-photon',
      label: 'Photon Sphere (1.5 Rs)',
      metric: 'b_crit = 2.60 Rs',
      worldPos: { x: rt.x * 2.55, y: 1.05, z: rt.z * 2.55 },
    },
    {
      id: 'ch5-horizon',
      label: 'Event Horizon (1.0 Rs)',
      metric: 'g₀₀ → 0.00',
      worldPos: { x: -rt.x * 0.45, y: -0.15, z: -rt.z * 0.45 },
    },
    {
      id: 'ch5-isco',
      label: 'ISCO Boundary (3.0 Rs)',
      metric: 'r_ms = 3.00 Rs',
      worldPos: { x: rt.x * 2.85, y: -1.65, z: rt.z * 2.85 },
    },
  ];
}
