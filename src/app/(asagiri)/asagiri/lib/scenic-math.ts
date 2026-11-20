export interface MountainPeakSpec {
  /** Normalized x center in [-1, 1] */
  center: number;
  /** Peak height above baseY */
  height: number;
  /** Width spread (standard deviation) in normalized coordinates */
  spread: number;
  /** Optional volcanic plateau flattening [0..1] for Fuji-like sacred peak */
  craterFlatness?: number;
}

export interface RidgeProfileConfig {
  width: number;
  segments: number;
  baseY: number;
  bottomY: number;
  peaks: MountainPeakSpec[];
  undulationAmp: number;
  undulationFreq: number;
  phase: number;
  /** Optional dip on left side to keep the landing-page text-safe area calm and open */
  leftCalmDip?: number;
}

export interface RidgePoint {
  x: number;
  y: number;
  u: number;
}

/**
 * Evaluate a smooth, organic Japanese mountain ridge contour.
 * Combines broad Gaussian/volcanic peaks with restrained low-frequency harmonic
 * undulation so silhouettes feel painterly rather than jagged noise.
 */
export function evaluateRidgeHeight(u: number, config: RidgeProfileConfig): number {
  const nx = u * 2 - 1; // [-1, 1]
  let y = config.baseY;

  for (const peak of config.peaks) {
    const dist = (nx - peak.center) / Math.max(peak.spread, 0.01);
    const bell = Math.exp(-0.5 * dist * dist);
    if (peak.craterFlatness && peak.craterFlatness > 0) {
      // Smooth volcanic cone with subtle flattened summit (Fuji-inspired silhouette)
      const cone = Math.pow(bell, 0.72);
      const summit = Math.min(cone, 1 - peak.craterFlatness * 0.14);
      const craterDip = Math.exp(-Math.pow(dist * 5.2, 2)) * peak.craterFlatness * 0.032;
      y += peak.height * Math.max(0, summit - craterDip);
    } else {
      y += peak.height * bell;
    }
  }

  // Gentle organic ridge undulation
  const wave1 = Math.sin(nx * Math.PI * config.undulationFreq + config.phase) * config.undulationAmp;
  const wave2 =
    Math.sin(nx * Math.PI * config.undulationFreq * 2.13 + config.phase * 1.7) *
    config.undulationAmp *
    0.35;
  y += wave1 + wave2;

  // Keep left-center calm & low if requested (hero text-safe area discipline)
  if (config.leftCalmDip && config.leftCalmDip > 0) {
    const calmMask = Math.exp(-Math.pow((nx + 0.42) / 0.52, 2));
    y -= config.leftCalmDip * calmMask;
  }

  return Math.max(config.bottomY + 0.15, y);
}

/**
 * Sample an array of 2D ridge contour points spanning [-width/2, +width/2].
 */
export function generateRidgeProfile(config: RidgeProfileConfig): RidgePoint[] {
  const count = Math.max(2, Math.floor(config.segments));
  const points: RidgePoint[] = [];
  for (let i = 0; i <= count; i++) {
    const u = i / count;
    const x = (u - 0.5) * config.width;
    const y = evaluateRidgeHeight(u, config);
    points.push({ x, y, u });
  }
  return points;
}

export interface ParallaxState {
  pointerX: number; // [-1, 1]
  pointerY: number; // [-1, 1]
  enableParallax: boolean;
  enableMotion: boolean;
  elapsedTime: number;
}

export interface CameraRigTarget {
  x: number;
  y: number;
  z: number;
  lookAtX: number;
  lookAtY: number;
  lookAtZ: number;
}

export const DEFAULT_CAMERA_POSITION: Readonly<{ x: number; y: number; z: number }> = {
  x: 0,
  y: 0.35,
  z: 10.4,
};

export const DEFAULT_CAMERA_TARGET: Readonly<{ x: number; y: number; z: number }> = {
  x: 0,
  y: 0.15,
  z: -6.0,
};

/**
 * Compute subtle, cinematic camera target combining pointer parallax and
 * gentle breathing drift without destabilizing the hero text-safe area.
 */
export function computeCameraRigTarget(state: ParallaxState): CameraRigTarget {
  const clampedX = Math.max(-1, Math.min(1, state.pointerX));
  const clampedY = Math.max(-1, Math.min(1, state.pointerY));

  const parallaxX = state.enableParallax ? clampedX * 0.72 : 0;
  const parallaxY = state.enableParallax ? clampedY * 0.34 : 0;

  // Very gentle, contemplative camera drift when motion is active
  const driftX = state.enableMotion ? Math.sin(state.elapsedTime * 0.16) * 0.18 : 0;
  const driftY = state.enableMotion ? Math.cos(state.elapsedTime * 0.12) * 0.08 : 0;
  const driftZ = state.enableMotion ? Math.sin(state.elapsedTime * 0.11) * 0.14 : 0;

  return {
    x: DEFAULT_CAMERA_POSITION.x + parallaxX + driftX,
    y: DEFAULT_CAMERA_POSITION.y + parallaxY + driftY,
    z: DEFAULT_CAMERA_POSITION.z + driftZ,
    lookAtX: DEFAULT_CAMERA_TARGET.x + parallaxX * 0.25 + driftX * 0.3,
    lookAtY: DEFAULT_CAMERA_TARGET.y + parallaxY * 0.18 + driftY * 0.2,
    lookAtZ: DEFAULT_CAMERA_TARGET.z,
  };
}

/**
 * Frame-rate independent exponential damping helper.
 */
export function dampValue(current: number, target: number, lambda: number, delta: number): number {
  const dt = Math.max(0, Math.min(delta, 0.1));
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

/**
 * Compute depth-weighted 2.5D layer parallax offset.
 * Nearer layers (higher depthFactor) translate slightly more than distant layers,
 * reinforcing layered paper-theatre / ukiyo-e spatial separation.
 */
export function computeLayerParallaxOffset(
  pointerX: number,
  pointerY: number,
  depthFactor: number,
  enabled: boolean
): { x: number; y: number } {
  if (!enabled) return { x: 0, y: 0 };
  const cx = Math.max(-1, Math.min(1, pointerX));
  const cy = Math.max(-1, Math.min(1, pointerY));
  return {
    x: -cx * depthFactor * 0.42,
    y: -cy * depthFactor * 0.16,
  };
}

export interface PetalParticle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  swayPhase: number;
  swayAmp: number;
  swayFreq: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  scale: number;
}

export interface PetalBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

/**
 * Advance a drifting sakura petal particle by dt seconds and wrap smoothly
 * when it leaves the scenic stage bounds.
 */
export function stepPetalParticle(
  petal: PetalParticle,
  dt: number,
  elapsed: number,
  bounds: PetalBounds
): PetalParticle {
  const safeDt = Math.max(0, Math.min(dt, 0.1));
  const swayX = Math.sin(elapsed * petal.swayFreq + petal.swayPhase) * petal.swayAmp;
  const swayY = Math.cos(elapsed * petal.swayFreq * 0.7 + petal.swayPhase) * (petal.swayAmp * 0.35);

  let nextX = petal.x + (petal.vx + swayX) * safeDt;
  let nextY = petal.y + (petal.vy + swayY) * safeDt;

  const spanX = bounds.maxX - bounds.minX;
  const spanY = bounds.maxY - bounds.minY;

  if (nextX < bounds.minX) {
    nextX += spanX;
  } else if (nextX > bounds.maxX) {
    nextX -= spanX;
  }

  if (nextY < bounds.minY) {
    nextY += spanY;
    // Slight horizontal re-entry offset so wrapped petals don't form visible bands
    nextX = bounds.minX + ((nextX - bounds.minX + spanX * 0.37) % spanX);
  } else if (nextY > bounds.maxY) {
    nextY -= spanY;
  }

  return {
    ...petal,
    x: nextX,
    y: nextY,
    rotX: petal.rotX + petal.rotSpeedX * safeDt,
    rotY: petal.rotY + petal.rotSpeedY * safeDt,
    rotZ: petal.rotZ + petal.rotSpeedZ * safeDt,
  };
}
