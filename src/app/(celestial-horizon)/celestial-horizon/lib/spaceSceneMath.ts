/**
 * Pure math, deterministic procedural generation, and camera framing utilities
 * for the Celestial Horizon 2.5D space hero background.
 *
 * Kept free of React/DOM/WebGL side effects for fast deterministic unit testing
 * and clean reuse across different host viewports.
 */

export interface Vec3Tuple {
  x: number;
  y: number;
  z: number;
}

export interface SafeZoneBounds {
  /** Normalized screen X range in [-1, 1] (left = -1, right = 1) */
  minNdcX: number;
  maxNdcX: number;
  /** Normalized screen Y range in [-1, 1] (bottom = -1, top = 1) */
  minNdcY: number;
  maxNdcY: number;
}

/**
 * Primary hero text-safe quadrant on the left / center-left of the viewport.
 * Visual focal elements (planet, rings, moon, foreground silhouettes) are kept
 * clear of this region so future headlines and CTAs maintain high contrast.
 */
export const HERO_SAFE_ZONE_NDC: SafeZoneBounds = {
  minNdcX: -0.92,
  maxNdcX: 0.06,
  minNdcY: -0.52,
  maxNdcY: 0.56,
};

export const BASE_CAMERA_POSITION: Vec3Tuple = { x: 0, y: 0.15, z: 12.5 };
export const BASE_CAMERA_TARGET: Vec3Tuple = { x: 0.35, y: -0.1, z: -6.5 };

/**
 * Deterministic 32-bit PRNG (Mulberry32) so procedural space layers remain
 * identical across sessions and never flicker on hydration.
 */
export function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Frame-rate-independent exponential damping (identical to THREE.MathUtils.damp).
 */
export function dampValue(
  current: number,
  target: number,
  lambda: number,
  deltaSeconds: number,
): number {
  const safeDelta = clamp(deltaSeconds, 0, 0.1);
  return current + (target - current) * (1 - Math.exp(-lambda * safeDelta));
}

/**
 * Checks whether a normalized device coordinate lies inside the reserved
 * landing-page text-safe area.
 */
export function isPointInsideSafeZone(
  ndcX: number,
  ndcY: number,
  zone: SafeZoneBounds = HERO_SAFE_ZONE_NDC,
): boolean {
  return (
    ndcX >= zone.minNdcX &&
    ndcX <= zone.maxNdcX &&
    ndcY >= zone.minNdcY &&
    ndcY <= zone.maxNdcY
  );
}

/**
 * Smoothly attenuates brightness/density inside the hero text-safe area
 * so distant stars remain atmospheric without creating visual noise behind text.
 */
export function safeZoneClearanceFactor(
  ndcX: number,
  ndcY: number,
  zone: SafeZoneBounds = HERO_SAFE_ZONE_NDC,
): number {
  const cx = (zone.minNdcX + zone.maxNdcX) * 0.5;
  const cy = (zone.minNdcY + zone.maxNdcY) * 0.5;
  const rx = (zone.maxNdcX - zone.minNdcX) * 0.55;
  const ry = (zone.maxNdcY - zone.minNdcY) * 0.55;
  const dx = (ndcX - cx) / rx;
  const dy = (ndcY - cy) / ry;
  const distSq = dx * dx + dy * dy;
  if (distSq <= 0.65) return 0.32;
  if (distSq >= 1.55) return 1.0;
  const t = (distSq - 0.65) / 0.9;
  const smooth = t * t * (3 - 2 * t);
  return 0.32 + 0.68 * smooth;
}

export interface StarFieldBuffers {
  positions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  phases: Float32Array;
  count: number;
}

const STAR_PALETTE: ReadonlyArray<readonly [number, number, number]> = [
  [0.95, 0.97, 1.0], // Crisp glacial white
  [0.78, 0.88, 1.0], // Cool blue-white
  [1.0, 0.94, 0.84], // Warm pale ivory
  [0.86, 0.92, 1.0], // Soft cerulean star
  [1.0, 0.84, 0.68], // Distant muted amber giant
];

export function generateStarFieldData(
  count: number,
  seed = 104729,
): StarFieldBuffers {
  const rand = createSeededRandom(seed);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const isBandStar = rand() < 0.36;

    let x: number;
    let y: number;
    const z = -18 - rand() * 18; // Deep background depth [-36, -18]

    if (isBandStar) {
      // Subtle diagonal galactic sweep from bottom-center toward upper-right
      const t = rand() * 2 - 1;
      const spread = (rand() + rand() - 1) * 7.5;
      x = t * 26 + 4.0 + spread * 0.65;
      y = t * 11.5 - 0.5 + spread;
    } else {
      x = (rand() * 2 - 1) * 36;
      y = (rand() * 2 - 1) * 21;
    }

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;

    // Approximate projected NDC to keep text-safe area serene
    const approxNdcX = clamp(x / 22, -1.5, 1.5);
    const approxNdcY = clamp(y / 12.5, -1.5, 1.5);
    const clearance = safeZoneClearanceFactor(approxNdcX, approxNdcY);

    const swatch = STAR_PALETTE[Math.floor(rand() * STAR_PALETTE.length)];
    const luminance = (0.45 + Math.pow(rand(), 2.2) * 0.55) * (0.55 + 0.45 * clearance);

    colors[i3] = swatch[0] * luminance;
    colors[i3 + 1] = swatch[1] * luminance;
    colors[i3 + 2] = swatch[2] * luminance;

    // Power-law size distribution: mostly fine pinpoints, occasional bright hero stars
    const baseSize = 1.15 + Math.pow(rand(), 5.5) * 4.4;
    sizes[i] = baseSize * (0.68 + 0.32 * clearance);
    phases[i] = rand() * Math.PI * 2;
  }

  return { positions, colors, sizes, phases, count };
}

export interface DustFieldBuffers {
  positions: Float32Array;
  colors: Float32Array;
  sizes: Float32Array;
  speeds: Float32Array;
  phases: Float32Array;
  count: number;
}

export function generateDustFieldData(
  count: number,
  seed = 77317,
): DustFieldBuffers {
  const rand = createSeededRandom(seed);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const speeds = new Float32Array(count);
  const phases = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    // Bias dust softly around midground/right side while keeping subtle motes across scene
    const biasRight = rand() < 0.62;
    const x = biasRight ? -1.5 + rand() * 14.5 : -13.0 + rand() * 25.0;
    const y = (rand() * 2 - 1) * 8.2;
    const z = -4.5 + rand() * 9.5; // Midground to near foreground [-4.5, +5.0]

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;

    const approxNdcX = clamp(x / 11.5, -1.2, 1.2);
    const approxNdcY = clamp(y / 6.8, -1.2, 1.2);
    const clearance = safeZoneClearanceFactor(approxNdcX, approxNdcY);

    const warmTone = rand() < 0.32;
    const intensity = (0.35 + rand() * 0.45) * (0.48 + 0.52 * clearance);
    if (warmTone) {
      // Dusty champagne gold mote
      colors[i3] = 0.96 * intensity;
      colors[i3 + 1] = 0.78 * intensity;
      colors[i3 + 2] = 0.58 * intensity;
    } else {
      // Soft glacial ice-blue mote
      colors[i3] = 0.62 * intensity;
      colors[i3 + 1] = 0.82 * intensity;
      colors[i3 + 2] = 0.98 * intensity;
    }

    sizes[i] = (3.2 + Math.pow(rand(), 2.4) * 9.5) * (0.7 + 0.3 * clearance);
    speeds[i] = 0.14 + rand() * 0.34;
    phases[i] = rand() * Math.PI * 2;
  }

  return { positions, colors, sizes, speeds, phases, count };
}

export interface AsteroidTransform {
  position: Vec3Tuple;
  rotation: Vec3Tuple;
  scale: Vec3Tuple;
  spinSpeed: number;
  bobAmplitude: number;
  phase: number;
  tint: [number, number, number];
  layer: 'midground' | 'foreground';
}

/**
 * Generates a curated sparse set of silhouetted asteroids:
 * - A graceful midground arc tracing the outer planetary orbital plane.
 * - Three subtle dark foreground edge silhouettes positioned near the right/lower-right
 *   perimeter (strictly outside the left text-safe area) to establish 2.5D depth.
 */
export function generateAsteroidFieldData(seed = 51923): AsteroidTransform[] {
  const rand = createSeededRandom(seed);
  const asteroids: AsteroidTransform[] = [];

  // Midground orbital arc sweeping around the right-hand ringed planet
  const midgroundCount = 26;
  for (let i = 0; i < midgroundCount; i++) {
    const t = i / (midgroundCount - 1);
    const angle = -0.75 + t * 2.15 + (rand() - 0.5) * 0.16;
    const radius = 5.4 + rand() * 3.8;
    const x = 4.9 + Math.cos(angle) * radius * 1.15;
    const y = -0.9 + Math.sin(angle) * radius * 0.42 + (rand() - 0.5) * 1.1;
    const z = -7.2 + Math.sin(angle * 1.3) * 3.2 - rand() * 2.2;

    // Never crowd the text-safe zone on the left
    if (x < 0.8 && y > -2.5 && y < 3.5) {
      continue;
    }

    const baseScale = 0.065 + Math.pow(rand(), 2.4) * 0.22;
    const shade = 0.16 + rand() * 0.18;

    asteroids.push({
      position: { x, y, z },
      rotation: {
        x: rand() * Math.PI * 2,
        y: rand() * Math.PI * 2,
        z: rand() * Math.PI * 2,
      },
      scale: {
        x: baseScale * (0.75 + rand() * 0.6),
        y: baseScale * (0.65 + rand() * 0.5),
        z: baseScale * (0.75 + rand() * 0.55),
      },
      spinSpeed: (0.04 + rand() * 0.1) * (rand() < 0.5 ? 1 : -1),
      bobAmplitude: 0.05 + rand() * 0.11,
      phase: rand() * Math.PI * 2,
      tint: [shade * 0.9, shade * 1.0, shade * 1.2],
      layer: 'midground',
    });
  }

  // Curated foreground silhouettes strictly near the outer right / lower-right edges
  const foregroundAnchors: Array<{
    pos: Vec3Tuple;
    scale: Vec3Tuple;
    rot: Vec3Tuple;
  }> = [
    {
      pos: { x: 7.4, y: -3.55, z: 2.3 },
      scale: { x: 0.58, y: 0.36, z: 0.44 },
      rot: { x: 0.4, y: 0.9, z: -0.35 },
    },
    {
      pos: { x: 8.6, y: 2.85, z: 1.4 },
      scale: { x: 0.32, y: 0.24, z: 0.28 },
      rot: { x: 1.1, y: 0.3, z: 0.7 },
    },
    {
      pos: { x: 4.5, y: -4.45, z: 3.1 },
      scale: { x: 0.28, y: 0.19, z: 0.24 },
      rot: { x: 0.2, y: 1.4, z: 0.5 },
    },
  ];

  foregroundAnchors.forEach((anchor, idx) => {
    asteroids.push({
      position: anchor.pos,
      rotation: anchor.rot,
      scale: anchor.scale,
      spinSpeed: idx % 2 === 0 ? 0.028 : -0.022,
      bobAmplitude: 0.08 + idx * 0.02,
      phase: idx * 2.1,
      tint: [0.07, 0.09, 0.14],
      layer: 'foreground',
    });
  });

  return asteroids;
}

export interface CameraRigInput {
  aspect: number;
  pointerX: number; // [-1, 1]
  pointerY: number; // [-1, 1]
  dragOffsetX: number; // user drag orbit offset
  dragOffsetY: number;
  zoomOffset: number;
  elapsedTime: number;
  motionEnabled: boolean;
  parallaxEnabled: boolean;
}

export interface CameraRigTarget {
  position: Vec3Tuple;
  lookAt: Vec3Tuple;
}

/**
 * Computes calm, cinematic target camera position & lookAt for the 2.5D space scene.
 * Adapts framing automatically for narrow/mobile viewports while keeping motion subtle.
 */
export function computeCameraRigTarget(input: CameraRigInput): CameraRigTarget {
  const safeAspect = clamp(input.aspect || 16 / 9, 0.45, 2.8);
  // Narrow screens pull back slightly and shift center slightly toward the planet
  const narrowFactor = clamp((1.35 - safeAspect) / 0.85, 0, 1);

  const px = input.parallaxEnabled ? clamp(input.pointerX, -1, 1) : 0;
  const py = input.parallaxEnabled ? clamp(input.pointerY, -1, 1) : 0;

  const driftX = input.motionEnabled ? Math.sin(input.elapsedTime * 0.14) * 0.24 : 0;
  const driftY = input.motionEnabled ? Math.cos(input.elapsedTime * 0.11) * 0.14 : 0;
  const driftZ = input.motionEnabled ? Math.sin(input.elapsedTime * 0.09) * 0.18 : 0;

  const dragX = clamp(input.dragOffsetX, -4.5, 4.5);
  const dragY = clamp(input.dragOffsetY, -2.5, 2.5);
  const zoomZ = clamp(input.zoomOffset, -3.5, 5.5);

  const position: Vec3Tuple = {
    x: BASE_CAMERA_POSITION.x + narrowFactor * 2.3 + px * 0.95 + driftX + dragX,
    y: BASE_CAMERA_POSITION.y - narrowFactor * 0.35 + py * 0.55 + driftY + dragY,
    z: BASE_CAMERA_POSITION.z + narrowFactor * 3.8 + driftZ + zoomZ,
  };

  const lookAt: Vec3Tuple = {
    x: BASE_CAMERA_TARGET.x + narrowFactor * 2.5 + px * 0.22 + dragX * 0.18,
    y: BASE_CAMERA_TARGET.y - narrowFactor * 0.45 + py * 0.14 + dragY * 0.15,
    z: BASE_CAMERA_TARGET.z,
  };

  return { position, lookAt };
}

/**
 * Computes 2.5D layered depth parallax offset for a specific plane depth factor.
 * Negative depthFactor = distant background, positive = closer foreground.
 */
export function computeLayerParallaxOffset(
  depthFactor: number,
  pointerX: number,
  pointerY: number,
  parallaxEnabled: boolean,
): { x: number; y: number } {
  if (!parallaxEnabled) {
    return { x: 0, y: 0 };
  }
  const px = clamp(pointerX, -1, 1);
  const py = clamp(pointerY, -1, 1);
  return {
    x: px * depthFactor * 0.65,
    y: py * depthFactor * 0.4,
  };
}

export interface BloomConfig {
  /** Bloom glow intensity (0..2) */
  strength: number;
  /** Bloom spread radius (0..1.2) */
  radius: number;
  /** Luminance threshold above which pixels bloom (0..1.5) */
  threshold: number;
}

export const DEFAULT_BLOOM_CONFIG: BloomConfig = {
  strength: 0.52,
  radius: 0.74,
  threshold: 0.58,
};

/**
 * Resolves and clamps bloom parameters and computes optimal bloom pass
 * buffer dimensions (half-res on software WebGL to keep frame pacing smooth).
 */
export function resolveBloomConfig(
  overrides?: Partial<BloomConfig>,
  viewport?: { width: number; height: number; isSoftwareGl?: boolean },
): BloomConfig & { passWidth: number; passHeight: number } {
  const strength = clamp(
    overrides?.strength ?? DEFAULT_BLOOM_CONFIG.strength,
    0,
    2.0,
  );
  const radius = clamp(
    overrides?.radius ?? DEFAULT_BLOOM_CONFIG.radius,
    0,
    1.2,
  );
  const threshold = clamp(
    overrides?.threshold ?? DEFAULT_BLOOM_CONFIG.threshold,
    0,
    1.5,
  );

  const scale = viewport?.isSoftwareGl ? 0.5 : 1.0;
  const passWidth = Math.max(64, Math.round((viewport?.width ?? 1440) * scale));
  const passHeight = Math.max(64, Math.round((viewport?.height ?? 900) * scale));

  return { strength, radius, threshold, passWidth, passHeight };
}

