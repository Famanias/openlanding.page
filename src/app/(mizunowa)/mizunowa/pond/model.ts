export type PointXZ = { x: number; z: number };
export type FishPath = { a: number; b: number; speed: number; phase: number };
export type FishPose = PointXZ & { yaw: number };

export const POND_RX = 4.2;
export const POND_RZ = 3.0;
export const NATURAL_POND_RX = 2.92;
export const NATURAL_POND_RZ = 4.32;
export const POND_RIPPLE_DEFAULT_POINT: PointXZ = { x: 0.25, z: 0.55 };
export const RIPPLE_DURATION = 1.9;
export const RIPPLE_MIN_RADIUS = 0.04;
export const MAX_ACTIVE_RIPPLES = 4;
export const MAX_SHADER_RIPPLES = 12;

export const FISH_PATHS: readonly FishPath[] = [
  { a: 3.05, b: 2.0, speed: 0.18, phase: 0 },
  { a: 3.05, b: 2.0, speed: 0.18, phase: Math.PI },
  { a: 1.7, b: 1.0, speed: -0.24, phase: Math.PI / 2 },
  { a: 1.7, b: 1.0, speed: -0.24, phase: (3 * Math.PI) / 2 },
];

export function fishPose(path: FishPath, elapsed: number): FishPose {
  const safeElapsed = Number.isFinite(elapsed) ? elapsed : 0;
  const safeA = Number.isFinite(path.a) ? path.a : 0;
  const safeB = Number.isFinite(path.b) ? path.b : 0;
  const safeSpeed = Number.isFinite(path.speed) ? path.speed : 0;
  const safePhase = Number.isFinite(path.phase) ? path.phase : 0;

  const theta = safeSpeed * safeElapsed + safePhase;
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);

  const x = safeA * cosTheta;
  const z = safeB * sinTheta;
  const vx = -safeA * safeSpeed * sinTheta;
  const vz = safeB * safeSpeed * cosTheta;

  const yaw = Math.atan2(-vz, vx);
  return { x, z, yaw };
}

export function isInsidePond(point: PointXZ, rx: number, rz: number): boolean {
  if (
    !Number.isFinite(point.x) ||
    !Number.isFinite(point.z) ||
    !Number.isFinite(rx) ||
    !Number.isFinite(rz) ||
    rx <= 0 ||
    rz <= 0
  ) {
    return false;
  }

  const nx = point.x / rx;
  const nz = point.z / rz;
  return nx * nx + nz * nz <= 1;
}

export function maxRippleRadius(point: PointXZ, rx: number, rz: number): number {
  if (!isInsidePond(point, rx, rz)) {
    return 0;
  }

  const nx = point.x / rx;
  const nz = point.z / rz;
  const rho = Math.sqrt(nx * nx + nz * nz);
  const allowed = 0.9 * Math.min(rx, rz) * (1 - rho);
  return Math.max(0, Math.min(0.8, allowed));
}

export function fishPolygonalExtents(
  pose: FishPose,
  halfLengthForward = 0.36,
  halfLengthBack = 0.44,
  halfWidth = 0.16,
): PointXZ[] {
  const cosY = Math.cos(-pose.yaw);
  const sinY = Math.sin(-pose.yaw);

  const localCorners: PointXZ[] = [
    { x: halfLengthForward, z: 0 },
    { x: halfLengthForward * 0.5, z: halfWidth },
    { x: halfLengthForward * 0.5, z: -halfWidth },
    { x: -halfLengthBack * 0.4, z: halfWidth * 0.85 },
    { x: -halfLengthBack * 0.4, z: -halfWidth * 0.85 },
    { x: -halfLengthBack, z: halfWidth * 0.55 },
    { x: -halfLengthBack, z: -halfWidth * 0.55 },
  ];

  return localCorners.map((pt) => ({
    x: pose.x + pt.x * cosY - pt.z * sinY,
    z: pose.z + pt.x * sinY + pt.z * cosY,
  }));
}

/**
 * Multi-harmonic asymmetrical stream-fed basin contour:
 * gently narrows toward the distant rear cove and widens smoothly into the lower-right foreground.
 */
export function pondContourScale(angle: number): number {
  const a = Number.isFinite(angle) ? angle : 0;
  return (
    1 +
    0.095 * Math.sin(a - 0.35) +
    0.072 * Math.sin(2 * a + 0.6) +
    0.045 * Math.cos(3 * a - 0.55) +
    0.025 * Math.sin(5 * a + 1.0)
  );
}

export function pondBoundaryPoint(angle: number, scaleOffset = 1): PointXZ {
  const s = pondContourScale(angle) * scaleOffset;
  return {
    x: Math.cos(angle) * NATURAL_POND_RX * s,
    z: Math.sin(angle) * NATURAL_POND_RZ * s,
  };
}

export function naturalPondNormalizedRadius(point: PointXZ): number {
  if (!Number.isFinite(point.x) || !Number.isFinite(point.z)) {
    return Number.POSITIVE_INFINITY;
  }
  const nx = point.x / NATURAL_POND_RX;
  const nz = point.z / NATURAL_POND_RZ;
  const angle = Math.atan2(nz, nx);
  const s = pondContourScale(angle);
  return Math.hypot(nx, nz) / s;
}

export function isInsideNaturalPond(point: PointXZ, margin = 0): boolean {
  const rho = naturalPondNormalizedRadius(point);
  if (!Number.isFinite(rho)) return false;
  const safeMargin = Number.isFinite(margin) ? margin : 0;
  const maxRho = Math.max(0.05, 1 - safeMargin / Math.min(NATURAL_POND_RX, NATURAL_POND_RZ));
  return rho <= maxRho;
}

function smoothstep01(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * (3 - 2 * c);
}

function continuousBasinDepth(x: number, z: number, rho: number): number {
  const clamped = Math.max(0, Math.min(1, rho));
  const shelf = 1 - clamped * clamped;
  // Clear shallow shelf near banks transitioning to a rich jade depth center
  const basinDepth = -0.068 - 0.6 * Math.pow(shelf, 1.35);
  const microContour = 0.022 * Math.sin(x * 1.2 + 0.5) * Math.cos(z * 1.15 - 0.4);
  return basinDepth + microContour;
}

export function pondBedElevation(x: number, z: number): number {
  if (!Number.isFinite(x) || !Number.isFinite(z)) return -0.3;
  const rho = naturalPondNormalizedRadius({ x, z });
  const base = continuousBasinDepth(x, z, rho);
  if (rho <= 0.92) {
    return Math.min(-0.04, base);
  }
  // Smoothly shoal up to water surface near rho = 1.02 for a seam-free basin bowl
  const rimT = smoothstep01((rho - 0.92) / 0.14);
  return base * (1 - rimT) + 0.025 * rimT;
}

// Right-shoreline ceramic tsukubai vessel on leveled bank terrace pouring westward into open pond water
export const WATERFALL_SOURCE_POINT: PointXZ = { x: 3.38, z: 0.52 };
export const WATERFALL_IMPACT_POINT: PointXZ = { x: 2.24, z: 0.46 };

export const SHRINE_CENTER: PointXZ = { x: -2.15, z: -7.15 };
export const SAKURA_CENTER: PointXZ = { x: 3.74, z: -1.16 };

/**
 * Stepping-stone winding path spine X(z) curving along the left mossy bank from foreground up to the shrine stairs.
 */
export function shrinePathCenterX(z: number): number {
  if (z >= 1.2) return -3.48 - (z - 1.2) * 0.13;
  if (z >= -2.5) return -3.12 - 0.36 * ((z + 2.5) / 3.7);
  const u = Math.max(0, Math.min(1, (-2.5 - z) / 3.45));
  const s = u * u * (3 - 2 * u);
  // Aligns cleanly with the rotated shrine front stairs (~x = -1.92 at z = -5.85)
  return -3.12 + 1.2 * s;
}

/**
 * Signed distance in approximate meters from the natural pond shoreline:
 * negative inside the pond, 0 at the shoreline contour, positive on surrounding garden land.
 */
export function signedDistanceToPond(point: PointXZ): number {
  if (!Number.isFinite(point.x) || !Number.isFinite(point.z)) return 0;
  const rho = naturalPondNormalizedRadius(point);
  const angle = Math.atan2(point.z / NATURAL_POND_RZ, point.x / NATURAL_POND_RX);
  const s = pondContourScale(angle);
  const radialScale = Math.hypot(
    Math.cos(angle) * NATURAL_POND_RX * s,
    Math.sin(angle) * NATURAL_POND_RZ * s,
  );
  return (rho - 1) * radialScale;
}

/**
 * Continuous world-scale garden terrain heightfield extending 55m+ in every direction.
 * Creates an irregular sunken pond basin, damp shoreline coves, raised moss banks,
 * shadowed left woodland rise, level stepping-stone trail, elevated mid-back shrine terrace,
 * leveled Tsukubai stone-vessel shelf, and subtle root-collar soil mounds under hero trees.
 */
export function terrainElevation(x: number, z: number): number {
  if (!Number.isFinite(x) || !Number.isFinite(z)) return 0;
  const rho = naturalPondNormalizedRadius({ x, z });
  const bedY = pondBedElevation(x, z);
  if (rho <= 0.92) {
    return bedY;
  }

  // Broad, C1-continuous bank collar (rho 0.94..1.48) preventing sudden rim cliffs
  const bankBlend = smoothstep01((rho - 0.94) / 0.54);
  // Attenuates steep mounds close to the waterline so shoreline stones seat on gentle banks
  const shoreCollarEase = smoothstep01((rho - 1.02) / 0.48);

  // Level corridor along the curving stepping-stone path from foreground up to shrine steps
  const pathX = shrinePathCenterX(z);
  const distToPath = Math.abs(x - pathX);
  const onPathZ = z <= 5.8 && z >= -7.4;
  const pathClearance = onPathZ ? Math.max(0, Math.min(1, (distToPath - 0.56) / 1.15)) : 1;

  // Raised level shrine terrace in upper-mid-left background with smooth broad apron
  const shrineDist = Math.hypot(x - SHRINE_CENTER.x, z - SHRINE_CENTER.z);
  const shrineRaw = 1 - Math.max(0, (shrineDist - 1.95) / 3.45);
  const shrinePlateauBlend = smoothstep01(shrineRaw);
  const shrineRise = smoothstep01((-z - 3.1) / 5.2) * 0.9;

  // Gentle low right-bank shelf under the Tsukubai hearth stone, keeping water pour at natural low relief
  const tsukubaiDist = Math.hypot(x - WATERFALL_SOURCE_POINT.x, z - WATERFALL_SOURCE_POINT.z);
  const tsukubaiPlateauBlend = smoothstep01(1 - Math.max(0, (tsukubaiDist - 0.72) / 1.75));

  // Left woodland mossy rise (natural dark backdrop behind left editorial typography)
  const leftWoodlandRise =
    Math.exp(-((x + 5.75) * (x + 5.75) * 0.042 + (z + 0.4) * (z + 0.4) * 0.032)) * 1.12;

  // Sunlit mossy ridge set further back behind north bank & shrine spur so shoreline slopes gently
  const rightMidRidge =
    Math.exp(-((x - 4.05) * (x - 4.05) * 0.055 + (z + 5.55) * (z + 5.55) * 0.048)) * 0.82;

  // Gentle right shoreline shoulder supporting sakura & tsukubai garden cluster
  const rightBankRise =
    Math.exp(-((x - 3.95) * (x - 3.95) * 0.085 + (z + 1.05) * (z + 1.05) * 0.075)) * 0.16;

  // Broad, low root-collar soil swells so tree trunks flare cleanly without unnatural volcano cones
  const sakuraRootMound =
    Math.exp(
      -((x - SAKURA_CENTER.x) * (x - SAKURA_CENTER.x) * 0.24 + (z - SAKURA_CENTER.z) * (z - SAKURA_CENTER.z) * 0.24),
    ) * 0.065;
  const mapleRootMound =
    Math.exp(-((x + 4.25) * (x + 4.25) * 0.3 + (z + 3.95) * (z + 3.95) * 0.3)) * 0.055;

  // Flowing multi-hill woodland topography extending across foreground, midground, and 55m backdrop
  const farBackdropRise =
    smoothstep01((-z - 6.6) / 10.5) * 1.85 +
    smoothstep01((Math.hypot(x, z) - 9.5) / 16.5) * 0.92;
  const woodlandHills =
    (0.28 * Math.sin(x * 0.28 + 0.7) * Math.cos(z * 0.24 - 0.5) +
      0.16 * Math.sin(x * 0.52 - z * 0.38)) *
    smoothstep01((-z - 4.5) / 6.0);

  const fgLeftMound =
    Math.exp(-((x + 4.5) * (x + 4.5) * 0.12 + (z - 3.95) * (z - 3.95) * 0.12)) * 0.34;
  const fgRightMound =
    Math.exp(-((x - 2.95) * (x - 2.95) * 0.14 + (z - 3.85) * (z - 3.85) * 0.15)) * 0.22;
  const backLeftMound =
    Math.exp(-((x + 6.9) * (x + 6.9) * 0.055 + (z + 6.6) * (z + 6.6) * 0.055)) * 0.86;

  const microUndulation =
    (0.048 * Math.sin(x * 0.62 + 0.4) * Math.cos(z * 0.56 - 0.3) +
      0.022 * Math.sin(x * 1.25 - z * 0.95) +
      0.012 * Math.cos(x * 2.1 + z * 1.85)) *
    pathClearance *
    (1 - tsukubaiPlateauBlend * 0.88) *
    (1 - shrinePlateauBlend * 0.72);

  const northBankEase = smoothstep01((rho - 1.06) / 0.62);
  const rawHeight =
    0.085 +
    shrineRise * northBankEase +
    (leftWoodlandRise * pathClearance +
      rightMidRidge * northBankEase +
      rightBankRise +
      fgLeftMound * pathClearance +
      fgRightMound) *
      (0.28 + 0.72 * shoreCollarEase) +
    sakuraRootMound +
    mapleRootMound +
    farBackdropRise * (1 - shrinePlateauBlend * 0.3) +
    woodlandHills +
    backLeftMound +
    microUndulation;

  // Blend smoothly onto leveled shrine apron and low right-bank Tsukubai garden terrace
  const shrinePadHeight = 0.88;
  const tsukubaiPadHeight = 0.15;
  let blended =
    rawHeight * (1 - shrinePlateauBlend * 0.84) + shrinePadHeight * (shrinePlateauBlend * 0.84);
  blended =
    blended * (1 - tsukubaiPlateauBlend * 0.82) + tsukubaiPadHeight * (tsukubaiPlateauBlend * 0.82);

  // Subtle shoulder lift around rho in [0.99..1.06] so waterline at y=0 seats right at rho ≈ 1.00
  const shoreLipLift = smoothstep01((rho - 0.97) / 0.16) * 0.032;
  const landHeight = Math.max(0.065, blended);
  return bedY * (1 - bankBlend) + landHeight * bankBlend + shoreLipLift * (1 - bankBlend);
}

export type TerrainBiome = 'shore' | 'moss' | 'forest' | 'path' | 'planted';

export interface GroundMaterialWeights {
  wetStone: number;
  moss: number;
  soil: number;
  gravel: number;
  forestLitter: number;
}

export interface TerrainSample {
  height: number;
  normal: { x: number; y: number; z: number };
  slope: number;
  shoreDistance: number;
  pathDistance: number;
  wetness: number;
  biome: TerrainBiome;
  weights: GroundMaterialWeights;
}

export function terrainNormalAt(x: number, z: number): { x: number; y: number; z: number } {
  const eps = 0.08;
  const hL = terrainElevation(x - eps, z);
  const hR = terrainElevation(x + eps, z);
  const hD = terrainElevation(x, z - eps);
  const hU = terrainElevation(x, z + eps);
  const nx = hL - hR;
  const ny = 2 * eps;
  const nz = hD - hU;
  const len = Math.hypot(nx, ny, nz) || 1;
  return { x: nx / len, y: ny / len, z: nz / len };
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

export function getGroundMaterialWeights(point: PointXZ): GroundMaterialWeights {
  const shoreDist = signedDistanceToPond(point);
  const height = terrainElevation(point.x, point.z);
  const norm = terrainNormalAt(point.x, point.z);
  const slope = 1 - norm.y;

  const pathX = shrinePathCenterX(point.z);
  const distToPath = Math.abs(point.x - pathX);
  const onPathZ = point.z <= 5.2 && point.z >= -6.35;
  const pathMask = onPathZ ? clamp01(1 - (distToPath - 0.34) / 0.56) : 0;

  const shrineApron = clamp01(1 - (Math.hypot(point.x - SHRINE_CENTER.x, point.z - SHRINE_CENTER.z) - 1.35) / 1.15);
  const gravel = clamp01(Math.max(pathMask * 0.85, shrineApron * 0.72));

  const wetStone = clamp01(1 - (shoreDist + 0.08) / 0.55);

  const farWoodland = clamp01((-point.z - 5.2) / 6.5);
  const leftWoodland = clamp01((-point.x - 3.6) / 3.2);
  const forestLitter = clamp01(Math.max(farWoodland * 0.85, leftWoodland * 0.78)) * (1 - gravel * 0.75);

  const mossNoise =
    0.5 + 0.5 * (Math.sin(point.x * 1.15 + 0.4) * Math.cos(point.z * 0.95 - 0.3));
  const rawMoss =
    clamp01((height - 0.05) / 0.35) * (0.45 + mossNoise * 0.45) * (1 - gravel * 0.82) * (1 - wetStone * 0.7);
  const moss = clamp01(rawMoss * (1 - forestLitter * 0.48));
  const soil = clamp01(0.28 + slope * 1.8 + pathMask * 0.45 - moss * 0.32 - wetStone * 0.25);

  const sum = wetStone + moss + soil + gravel + forestLitter || 1;
  return {
    wetStone: wetStone / sum,
    moss: moss / sum,
    soil: soil / sum,
    gravel: gravel / sum,
    forestLitter: forestLitter / sum,
  };
}

export function sampleTerrain(point: PointXZ): TerrainSample {
  const height = terrainElevation(point.x, point.z);
  const normal = terrainNormalAt(point.x, point.z);
  const slope = Math.max(0, 1 - normal.y);
  const shoreDistance = signedDistanceToPond(point);
  const pathDistance =
    point.z <= 5.6 && point.z >= -6.6
      ? Math.abs(point.x - shrinePathCenterX(point.z))
      : Math.hypot(point.x - shrinePathCenterX(-6.0), point.z + 6.0);

  const wetness = clamp01(1 - shoreDistance / 0.65);
  const weights = getGroundMaterialWeights(point);

  let biome: TerrainBiome = 'moss';
  if (shoreDistance < 0.24) {
    biome = 'shore';
  } else if (pathDistance < 0.72 && point.z <= 5.2 && point.z >= -6.4) {
    biome = 'path';
  } else if (shoreDistance < 0.42) {
    biome = 'shore';
  } else if (point.z < -5.8 || point.x < -4.2) {
    biome = 'forest';
  } else if (weights.moss >= 0.34) {
    biome = 'moss';
  } else {
    biome = 'planted';
  }

  return {
    height,
    normal,
    slope,
    shoreDistance,
    pathDistance,
    wetness,
    biome,
    weights,
  };
}

export const HERO_INTRO_DURATION = 4.4;

export function introAtmosphereFactor(introElapsed: number): number {
  if (!Number.isFinite(introElapsed) || introElapsed <= 0) return 0.46;
  const t = Math.max(0, Math.min(1, introElapsed / HERO_INTRO_DURATION));
  const eased = 1 - Math.pow(1 - t, 2.2);
  return 0.46 + 0.54 * eased;
}

export interface IntroCameraState {
  position: { x: number; y: number; z: number };
  lookAt: { x: number; y: number; z: number };
  fov: number;
  progress: number;
}

/**
 * Cinematic perspective garden camera with 4.4-second first-visit arrival choreography:
 * begins slightly tucked back & higher behind shadowed foreground moss/branches,
 * then smoothly dollies and tilts forward into the human-vantage composition looking
 * across the pond toward the mid-back shrine, right sakura canopy, and bamboo forest.
 */
export function introCameraState(introElapsed: number, aspect: number): IntroCameraState {
  const safeAspect = Number.isFinite(aspect) && aspect > 0.3 ? aspect : 1.6;
  const t = Number.isFinite(introElapsed)
    ? Math.max(0, Math.min(1, introElapsed / HERO_INTRO_DURATION))
    : 1;
  // Quintic-inspired smooth arrival without snapping
  const eased = 1 - Math.pow(1 - t, 3.0);

  // Smooth responsiveness across desktop (1440+), tablet (768), and mobile (390/320)
  const wideWeight = Math.max(0, Math.min(1, (safeAspect - 0.82) / 0.58));
  const narrowPullback = safeAspect < 1.05 ? Math.min(1.85, (1.05 - safeAspect) * 2.4) : 0;

  // Desktop shifts aim gently left so pond occupies center & lower-right while left stays dark forest
  const endLookX = -0.88 * wideWeight + 0.12 * (1 - wideWeight);
  const endLookY = 0.76 - 0.14 * (1 - wideWeight);
  const endLookZ = -2.15 + 0.35 * (1 - wideWeight);

  const endPosX = -1.98 * wideWeight - 0.35 * (1 - wideWeight);
  const endPosY = 2.58 + narrowPullback * 0.42;
  const endPosZ = 7.12 + narrowPullback * 0.95;

  const endFov = safeAspect < 0.9 ? 47 : 44;

  // Start slightly farther back, subtly higher, and angled slightly more into the forest canopy
  const startOffsetX = -0.45 * wideWeight;
  const startOffsetY = 0.82;
  const startOffsetZ = 1.65;

  const inv = 1 - eased;
  return {
    position: {
      x: endPosX + startOffsetX * inv,
      y: endPosY + startOffsetY * inv,
      z: endPosZ + startOffsetZ * inv,
    },
    lookAt: {
      x: endLookX - 0.32 * wideWeight * inv,
      y: endLookY + 0.42 * inv,
      z: endLookZ - 0.85 * inv,
    },
    fov: endFov + 2.5 * inv,
    progress: eased,
  };
}

export interface SubmergedObstacle {
  x: number;
  z: number;
  r: number;
}

export interface FoodPellet {
  id: number;
  x: number;
  z: number;
  createdAt: number;
  eaten: boolean;
}

export interface WaterDisturbance {
  x: number;
  z: number;
  createdAt: number;
  strength: number;
}

export interface KoiAgent {
  id: number;
  x: number;
  y: number;
  z: number;
  yaw: number;
  pitch: number;
  roll: number;
  speed: number;
  baseSpeed: number;
  preferredDepth: number;
  orbitAngle: number;
  orbitRadiusScale: number;
  orbitSpeed: number;
  wakeCooldown: number;
  shyTimer: number;
  shyDirX: number;
  shyDirZ: number;
}

export interface KoiStepResult {
  consumedPelletIds: number[];
  wakeRipples: Array<{ x: number; z: number; strength: number }>;
  feedingRipples: Array<{ x: number; z: number; strength: number }>;
}

function wrapAngle(rad: number): number {
  let a = rad;
  while (a > Math.PI) a -= Math.PI * 2;
  while (a < -Math.PI) a += Math.PI * 2;
  return a;
}

export function createKoiAgents(): KoiAgent[] {
  const specs: Array<{
    id: number;
    angle: number;
    radiusScale: number;
    orbitSpeed: number;
    baseSpeed: number;
    depth: number;
  }> = [
    { id: 0, angle: 0.35, radiusScale: 0.62, orbitSpeed: 0.19, baseSpeed: 0.72, depth: -0.105 },
    { id: 1, angle: Math.PI + 0.35, radiusScale: 0.6, orbitSpeed: 0.175, baseSpeed: 0.66, depth: -0.165 },
    { id: 2, angle: Math.PI * 0.65, radiusScale: 0.4, orbitSpeed: -0.24, baseSpeed: 0.61, depth: -0.22 },
    { id: 3, angle: Math.PI * 1.55, radiusScale: 0.44, orbitSpeed: -0.22, baseSpeed: 0.58, depth: -0.135 },
  ];

  return specs.map((spec) => {
    const pt = pondBoundaryPoint(spec.angle, spec.radiusScale);
    const nextPt = pondBoundaryPoint(spec.angle + spec.orbitSpeed * 0.1, spec.radiusScale);
    const yaw = Math.atan2(-(nextPt.z - pt.z), nextPt.x - pt.x);
    return {
      id: spec.id,
      x: pt.x,
      y: spec.depth,
      z: pt.z,
      yaw,
      pitch: 0,
      roll: 0,
      speed: spec.baseSpeed,
      baseSpeed: spec.baseSpeed,
      preferredDepth: spec.depth,
      orbitAngle: spec.angle,
      orbitRadiusScale: spec.radiusScale,
      orbitSpeed: spec.orbitSpeed,
      wakeCooldown: 0.4 + spec.id * 0.55,
      shyTimer: 0,
      shyDirX: 0,
      shyDirZ: 0,
    };
  });
}

export function stepKoiAgents(
  agents: KoiAgent[],
  dt: number,
  elapsed: number,
  pellets: readonly FoodPellet[],
  disturbances: readonly WaterDisturbance[],
  obstacles: readonly SubmergedObstacle[],
): KoiStepResult {
  const safeDt = Number.isFinite(dt) && dt > 0 ? Math.min(dt, 0.08) : 0;
  const result: KoiStepResult = {
    consumedPelletIds: [],
    wakeRipples: [],
    feedingRipples: [],
  };
  if (safeDt <= 0) return result;

  for (const dist of disturbances) {
    if (elapsed - dist.createdAt <= 0.12) {
      for (const agent of agents) {
        const dx = agent.x - dist.x;
        const dz = agent.z - dist.z;
        const d = Math.hypot(dx, dz);
        if (d < 2.2 && d > 1e-4) {
          agent.shyTimer = 1.35 * Math.min(1, dist.strength);
          agent.shyDirX = dx / d;
          agent.shyDirZ = dz / d;
        }
      }
    }
  }

  const activePellets = pellets.filter((p) => !p.eaten && isInsideNaturalPond(p, 0.25));

  for (let i = 0; i < agents.length; i++) {
    const koi = agents[i];
    koi.orbitAngle += koi.orbitSpeed * safeDt;
    koi.wakeCooldown = Math.max(0, koi.wakeCooldown - safeDt);
    koi.shyTimer = Math.max(0, koi.shyTimer - safeDt);

    const wanderMod = 0.07 * Math.sin(elapsed * 0.42 + koi.id * 1.9);
    const lookAheadAngle = koi.orbitAngle + (koi.orbitSpeed >= 0 ? 0.34 : -0.34);
    const patrolTarget = pondBoundaryPoint(
      lookAheadAngle,
      Math.max(0.26, Math.min(0.76, koi.orbitRadiusScale + wanderMod)),
    );

    let targetX = patrolTarget.x;
    let targetZ = patrolTarget.z;
    let desiredDepth = koi.preferredDepth + 0.036 * Math.sin(elapsed * 0.55 + koi.id * 2.1);
    let desiredSpeed = koi.baseSpeed * (0.94 + 0.12 * Math.sin(elapsed * 0.7 + koi.id));

    let seekingPellet: FoodPellet | null = null;
    let bestPelletDist = 5.6;
    for (const pellet of activePellets) {
      const d = Math.hypot(pellet.x - koi.x, pellet.z - koi.z);
      const biased = d + ((koi.id + pellet.id) % 2) * 0.32;
      if (biased < bestPelletDist) {
        bestPelletDist = biased;
        seekingPellet = pellet;
      }
    }

    if (seekingPellet) {
      const actualDist = Math.hypot(seekingPellet.x - koi.x, seekingPellet.z - koi.z);
      if (actualDist < 0.24) {
        if (!result.consumedPelletIds.includes(seekingPellet.id)) {
          result.consumedPelletIds.push(seekingPellet.id);
          result.feedingRipples.push({
            x: seekingPellet.x,
            z: seekingPellet.z,
            strength: 0.72,
          });
        }
      } else {
        targetX = seekingPellet.x;
        targetZ = seekingPellet.z;
        desiredDepth = -0.076;
        desiredSpeed = koi.baseSpeed * 1.42;
      }
    }

    let dirX = targetX - koi.x;
    let dirZ = targetZ - koi.z;
    const targetLen = Math.hypot(dirX, dirZ) || 1;
    dirX /= targetLen;
    dirZ /= targetLen;

    if (koi.shyTimer > 0) {
      const shyWeight = Math.min(0.65, koi.shyTimer * 0.48);
      dirX = dirX * (1 - shyWeight) + koi.shyDirX * shyWeight;
      dirZ = dirZ * (1 - shyWeight) + koi.shyDirZ * shyWeight;
      desiredDepth = Math.min(desiredDepth, -0.22);
      desiredSpeed *= 1.24;
    }

    for (let j = 0; j < agents.length; j++) {
      if (i === j) continue;
      const other = agents[j];
      const sepX = koi.x - other.x;
      const sepZ = koi.z - other.z;
      const dist = Math.hypot(sepX, sepZ);
      const minSep = 0.88;
      if (dist < minSep && dist > 1e-4) {
        const push = ((minSep - dist) / minSep) * 1.65;
        dirX += (sepX / dist) * push;
        dirZ += (sepZ / dist) * push;
        desiredDepth += koi.id < other.id ? 0.03 : -0.03;
      }
    }

    for (const obs of obstacles) {
      const ox = koi.x - obs.x;
      const oz = koi.z - obs.z;
      const od = Math.hypot(ox, oz);
      const safeR = obs.r + 0.36;
      if (od < safeR && od > 1e-4) {
        const push = ((safeR - od) / safeR) * 2.1;
        dirX += (ox / od) * push;
        dirZ += (oz / od) * push;
      }
    }

    const rho = naturalPondNormalizedRadius({ x: koi.x, z: koi.z });
    if (rho > 0.72) {
      const inwardLen = Math.hypot(koi.x, koi.z) || 1;
      const wallWeight = Math.min(3.5, (rho - 0.72) * 11.5);
      dirX += (-koi.x / inwardLen) * wallWeight;
      dirZ += (-koi.z / inwardLen) * wallWeight;
    }

    const desiredYaw = Math.atan2(-dirZ, dirX);
    const yawDiff = wrapAngle(desiredYaw - koi.yaw);
    const maxTurn = (seekingPellet ? 2.15 : 1.55) * safeDt;
    const appliedTurn = Math.max(-maxTurn, Math.min(maxTurn, yawDiff));
    koi.yaw = wrapAngle(koi.yaw + appliedTurn);

    const speedBlend = 1 - Math.exp(-3.2 * safeDt);
    koi.speed += (desiredSpeed - koi.speed) * speedBlend;
    const turnRate = appliedTurn / safeDt;
    const targetRoll = Math.max(-0.22, Math.min(0.22, turnRate * 0.14));
    koi.roll += (targetRoll - koi.roll) * (1 - Math.exp(-6.0 * safeDt));

    const headingX = Math.cos(-koi.yaw);
    const headingZ = Math.sin(-koi.yaw);
    let nextX = koi.x + headingX * koi.speed * safeDt;
    let nextZ = koi.z + headingZ * koi.speed * safeDt;

    const nextRho = naturalPondNormalizedRadius({ x: nextX, z: nextZ });
    if (nextRho > 0.84) {
      const pull = 0.84 / nextRho;
      nextX *= pull;
      nextZ *= pull;
    }
    koi.x = nextX;
    koi.z = nextZ;

    const bedY = pondBedElevation(koi.x, koi.z);
    const minY = Math.min(-0.1, bedY + 0.11);
    const maxY = -0.068;
    const clampedTargetY = Math.max(minY, Math.min(maxY, desiredDepth));
    const prevY = koi.y;
    koi.y += (clampedTargetY - koi.y) * (1 - Math.exp(-2.8 * safeDt));
    koi.y = Math.max(minY, Math.min(maxY, koi.y));

    const vy = (koi.y - prevY) / safeDt;
    const targetPitch = Math.max(-0.24, Math.min(0.24, vy * 0.7));
    koi.pitch += (targetPitch - koi.pitch) * (1 - Math.exp(-5.0 * safeDt));

    if (koi.y > -0.12 && koi.wakeCooldown <= 0) {
      result.wakeRipples.push({
        x: koi.x + headingX * 0.18,
        z: koi.z + headingZ * 0.18,
        strength: 0.28,
      });
      koi.wakeCooldown = 1.35 + (koi.id % 3) * 0.35;
    }
  }

  return result;
}

export function dampCameraParallax(
  currentX: number,
  currentY: number,
  targetX: number,
  targetY: number,
  dt: number,
): { x: number; y: number } {
  const safeDt = Number.isFinite(dt) && dt > 0 ? Math.min(dt, 0.1) : 0;
  const clampedTargetX = Math.max(-1, Math.min(1, Number.isFinite(targetX) ? targetX : 0));
  const clampedTargetY = Math.max(-1, Math.min(1, Number.isFinite(targetY) ? targetY : 0));
  const blend = 1 - Math.exp(-5.0 * safeDt);
  return {
    x: currentX + (clampedTargetX - currentX) * blend,
    y: currentY + (clampedTargetY - currentY) * blend,
  };
}

export class PondClock {
  private _elapsed = 0;
  private _userPaused = false;
  private _visibilityPaused = false;

  get elapsed(): number {
    return this._elapsed;
  }

  get userPaused(): boolean {
    return this._userPaused;
  }

  get visibilityPaused(): boolean {
    return this._visibilityPaused;
  }

  get isAdvancing(): boolean {
    return !this._userPaused && !this._visibilityPaused;
  }

  pause(): void {
    this._userPaused = true;
  }

  resume(): void {
    this._userPaused = false;
  }

  setVisibilityPaused(hidden: boolean): void {
    this._visibilityPaused = Boolean(hidden);
  }

  step(deltaSeconds: number): number {
    if (!this.isAdvancing) {
      return this._elapsed;
    }
    const safeDelta = Number.isFinite(deltaSeconds) && deltaSeconds > 0 ? Math.min(deltaSeconds, 0.25) : 0;
    this._elapsed += safeDelta;
    return this._elapsed;
  }

  reset(): void {
    this._elapsed = 0;
    this._userPaused = false;
    this._visibilityPaused = false;
  }
}
