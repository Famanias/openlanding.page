/**
 * Unified world-space terrain, shoreline, and water-level system.
 *
 * All layers (lake water shader, sculpted shoreline mesh, Torii sanctuary terrace,
 * stone walkway, granite lantern foundation, pagoda hillside, sakura trunk, rocks,
 * and falling petals) reference this single source of truth so elevations and
 * contact surfaces stay 100% geometrically coherent.
 */

export const WATER_LEVEL = -2.18;

/** Key architectural anchor coordinates in world space */
export const TORII_ANCHOR = {
  x: 2.52,
  z: -5.18,
  /** Top elevation of the elevated stone shrine platform (cleanly above WATER_LEVEL and surrounding bank) */
  platformTopY: WATER_LEVEL + 0.38, // -1.80
  platformHalfWidth: 1.46,
  platformHalfDepth: 0.72,
  rotationY: -0.15,
} as const;

export const LANTERN_ANCHOR = {
  x: 4.58,
  z: -2.42,
  /** Elevated dressed-stone pad resting on dry rocky shore */
  padRadius: 0.56,
} as const;

export const SAKURA_TRUNK_ANCHOR = {
  x: 7.45,
  z: -1.62,
} as const;

export const PAGODA_ANCHOR = {
  x: 5.75,
  z: -8.78,
} as const;

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * Natural irregular eastern shoreline curve x = shoreEdgeX(z).
 * Water lies to the left (x < shoreEdgeX(z)) and gently rising dry terrain lies to the right.
 * Includes a natural cove between the Torii sanctuary point and foreground lantern headland.
 */
export function evaluateShorelineX(z: number): number {
  // Base shoreline sweeps from far-right near the back bay (z = -12) closer to foreground right (z = +2)
  const baseLine =
    4.65 -
    smoothstep(-11.5, -1.5, z) * 1.45 +
    smoothstep(-0.5, 4.5, z) * 0.55;

  // Natural organic curvature: sanctuary point near Torii (z ≈ -5.15), gentle cove (z ≈ -3.6),
  // rocky lantern headland (z ≈ -2.35)
  const toriiHeadlandPull = -1.78 * Math.exp(-Math.pow((z + 5.18) / 1.45, 2));
  const lanternPointPull = -0.88 * Math.exp(-Math.pow((z + 2.38) / 1.35, 2));
  const subtleWobble =
    Math.sin(z * 0.78 + 0.4) * 0.24 +
    Math.sin(z * 1.65 - 0.9) * 0.11;

  return baseLine + toriiHeadlandPull + lanternPointPull + subtleWobble;
}

/**
 * Sample the continuous analytical terrain & lakebed elevation y at world (x, z).
 *
 * - Open lake (left & center): smooth submerged basin y in [WATER_LEVEL - 1.25, WATER_LEVEL - 0.15]
 * - Shoreline transition: gentle sloping pebble/gravel bank crossing WATER_LEVEL naturally
 * - Right peninsula, lantern bank & sakura embankment: undulating dry terrain rising above WATER_LEVEL
 * - Torii shrine headland & causeway: graded dry ground supporting the elevated stone terrace & walkway
 */
export function sampleTerrainHeight(x: number, z: number): number {
  const shoreX = evaluateShorelineX(z);
  const signedDist = x - shoreX; // negative = open water, positive = dry land

  // Smooth bathymetry -> shallow shelf -> sloping bank -> upper rocky embankment
  const deepBasin = -1.12;
  const shallowShelf = smoothstep(-4.8, -0.65, signedDist) * 0.92; // brings -1.12 up to -0.20 near shore
  const bankSlope = smoothstep(-0.85, 1.35, signedDist) * 0.62; // crosses 0 around signedDist ≈ 0
  const uplandRise = smoothstep(0.9, 5.8, signedDist) * 0.68; // climbs gently toward sakura bank & right hillside

  // Soft natural ground undulation (rocks, mossy hummocks, shallow sandbars)
  const microUndulation =
    (Math.sin(x * 0.62 + z * 0.48) * 0.085 +
      Math.cos(x * 1.15 - z * 0.92) * 0.042 +
      Math.sin(x * 2.1 + z * 1.75) * 0.018) *
    smoothstep(-2.4, 0.8, signedDist);

  // Far-left subtle distant reed bank (very far off-left/back so horizon feels enclosed without clutter)
  const farLeftShelf =
    smoothstep(-12.5, -21.0, x) * smoothstep(-3.0, -11.0, z) * 0.55;

  let heightAboveWater =
    deepBasin + shallowShelf + bankSlope + uplandRise + microUndulation + farLeftShelf;

  // Ensure the Torii sanctuary knoll around (2.52, -5.18) forms a natural dry foundation mound
  const dxTorii = (x - TORII_ANCHOR.x) / 2.25;
  const dzTorii = (z - TORII_ANCHOR.z) / 1.45;
  const toriiMound = Math.exp(-(dxTorii * dxTorii + dzTorii * dzTorii));
  heightAboveWater = Math.max(heightAboveWater, -1.15 + toriiMound * 1.38);

  // Gentle dry ridge connecting Torii knoll back to the eastern shore (for the curved stone walkway)
  const pathT = Math.max(0, Math.min(1, (x - 2.55) / 2.85));
  const pathCenterZ = -5.18 + pathT * 1.55 + Math.sin(pathT * Math.PI) * 0.35;
  const distToPath = Math.abs(z - pathCenterZ);
  const pathMask =
    smoothstep(2.05, 2.65, x) *
    (1 - smoothstep(5.1, 6.0, x)) *
    Math.exp(-Math.pow(distToPath / 0.88, 2));
  heightAboveWater = Math.max(heightAboveWater, -1.15 + pathMask * 1.36);

  // Ensure foreground lantern promontory has a stable, gently elevated dry rocky bench
  const dxLantern = (x - LANTERN_ANCHOR.x) / 1.55;
  const dzLantern = (z - LANTERN_ANCHOR.z) / 1.25;
  const lanternBench = Math.exp(-(dxLantern * dxLantern + dzLantern * dzLantern));
  heightAboveWater = Math.max(heightAboveWater, -1.15 + lanternBench * 1.57);

  // Ensure sakura tree bank on far right is firmly dry elevated earth
  const dxSakura = (x - SAKURA_TRUNK_ANCHOR.x) / 2.4;
  const dzSakura = (z - SAKURA_TRUNK_ANCHOR.z) / 2.2;
  const sakuraMound = Math.exp(-(dxSakura * dxSakura + dzSakura * dzSakura));
  heightAboveWater = Math.max(heightAboveWater, -1.15 + sakuraMound * 1.88);

  // Level the graded earth cleanly underneath the Torii stone platform footprint so
  // terrain never pierces through the top stone coping while staying solidly dry (+0.21 above water)
  const toriiFootX = smoothstep(2.15, 1.48, Math.abs(x - TORII_ANCHOR.x));
  const toriiFootZ = smoothstep(1.25, 0.72, Math.abs(z - TORII_ANCHOR.z));
  const toriiGradeMask = toriiFootX * toriiFootZ;
  if (toriiGradeMask > 0.001) {
    heightAboveWater = heightAboveWater * (1 - toriiGradeMask) + Math.min(heightAboveWater, 0.21) * toriiGradeMask;
  }

  // Taper off toward far back bay (z < -10.5) so distant water blends cleanly into valley mist
  const backBayFade = smoothstep(-9.2, -13.5, z);
  heightAboveWater = heightAboveWater * (1 - backBayFade) + -0.85 * backBayFade;

  return WATER_LEVEL + heightAboveWater;
}

/**
 * Water depth at world (x, z): positive when submerged under WATER_LEVEL,
 * negative when above water (dry land elevation).
 */
export function sampleWaterDepth(x: number, z: number): number {
  return WATER_LEVEL - sampleTerrainHeight(x, z);
}

/**
 * Returns true if world (x, z) is dry land cleanly above the water surface.
 */
export function isDryLand(x: number, z: number, margin = 0.03): boolean {
  return sampleTerrainHeight(x, z) >= WATER_LEVEL + margin;
}

/**
 * Walkway stone placement descriptor along the curved shrine path from the
 * eastern shoreline bank up to the Torii sanctuary terrace.
 */
export interface WalkwaySlabSpec {
  x: number;
  y: number;
  z: number;
  rotY: number;
  width: number;
  depth: number;
  thickness: number;
}

/**
 * Generate grounded stepping flagstones connecting the right shoreline to the
 * elevated Torii sanctuary terrace. Every stone rests strictly above WATER_LEVEL.
 */
export function generateToriiWalkwaySlabs(): WalkwaySlabSpec[] {
  const slabs: WalkwaySlabSpec[] = [];
  const count = 9;

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1); // 0 = near Torii terrace edge, 1 = eastern shore bank
    const x = 3.68 + t * 2.45;
    const z = -4.98 + t * 1.48 + Math.sin(t * Math.PI) * 0.28;
    const groundY = sampleTerrainHeight(x, z);
    // Keep top of every walkway stone dry and smoothly graded toward Torii platform
    const minTopY = WATER_LEVEL + 0.21 + (1 - t) * 0.09;
    const thickness = 0.14;
    const topY = Math.max(groundY + 0.045, minTopY);
    const centerY = topY - thickness * 0.5;

    // Orient each flagstone tangentially along the curving path
    const nextX = 3.68 + Math.min(1, t + 0.05) * 2.45;
    const nextZ = -4.98 + Math.min(1, t + 0.05) * 1.48 + Math.sin(Math.min(1, t + 0.05) * Math.PI) * 0.28;
    const tangentYaw = -Math.atan2(nextZ - z, nextX - x);

    slabs.push({
      x,
      y: centerY,
      z,
      rotY: tangentYaw + ((i % 2 === 0 ? 1 : -1) * 0.05),
      width: 0.42 + (i % 3) * 0.04,
      depth: 0.62 + ((i + 1) % 2) * 0.06,
      thickness,
    });
  }

  return slabs;
}

/**
 * Check whether a candidate rock/prop placement at (x, z) with given radius
 * stays clear of architectural foundations (Torii terrace, walkway, lantern pad, sakura trunk).
 */
export function isClearOfArchitecture(x: number, z: number, radius = 0.3): boolean {
  // Torii terrace exclusion rectangle (rotated slightly, use conservative bounding ellipse)
  const dxT = x - TORII_ANCHOR.x;
  const dzT = z - TORII_ANCHOR.z;
  if (
    Math.abs(dxT) < TORII_ANCHOR.platformHalfWidth + radius + 0.28 &&
    Math.abs(dzT) < TORII_ANCHOR.platformHalfDepth + radius + 0.28
  ) {
    return false;
  }

  // Stone walkway clearance
  const slabs = generateToriiWalkwaySlabs();
  for (const s of slabs) {
    const dist = Math.hypot(x - s.x, z - s.z);
    if (dist < radius + 0.52) return false;
  }

  // Lantern foundation pad clearance
  const distL = Math.hypot(x - LANTERN_ANCHOR.x, z - LANTERN_ANCHOR.z);
  if (distL < LANTERN_ANCHOR.padRadius + radius + 0.24) return false;

  // Sakura trunk base clearance
  const distS = Math.hypot(x - SAKURA_TRUNK_ANCHOR.x, z - SAKURA_TRUNK_ANCHOR.z);
  if (distS < 0.65 + radius) return false;

  return true;
}

/**
 * Exact GLSL counterpart of sampleWaterDepth(x, z) so the lake shader's
 * shallow shoreline coloration, transparency feathering, and shoreline lapping
 * align seamlessly with the sculpted 3D terrain geometry.
 */
export const GLSL_WATER_DEPTH_FN = /* glsl */ `
  float terrainSmoothstep(float e0, float e1, float v) {
    float t = clamp((v - e0) / (e1 - e0), 0.0, 1.0);
    return t * t * (3.0 - 2.0 * t);
  }

  float evaluateShorelineX(float z) {
    float baseLine =
      4.65 -
      terrainSmoothstep(-11.5, -1.5, z) * 1.45 +
      terrainSmoothstep(-0.5, 4.5, z) * 0.55;
    float toriiHeadlandPull = -1.78 * exp(-pow((z + 5.18) / 1.45, 2.0));
    float lanternPointPull = -0.88 * exp(-pow((z + 2.38) / 1.35, 2.0));
    float subtleWobble = sin(z * 0.78 + 0.4) * 0.24 + sin(z * 1.65 - 0.9) * 0.11;
    return baseLine + toriiHeadlandPull + lanternPointPull + subtleWobble;
  }

  float sampleWaterDepth(vec2 xz) {
    float x = xz.x;
    float z = xz.y;
    float shoreX = evaluateShorelineX(z);
    float signedDist = x - shoreX;

    float deepBasin = -1.12;
    float shallowShelf = terrainSmoothstep(-4.8, -0.65, signedDist) * 0.92;
    float bankSlope = terrainSmoothstep(-0.85, 1.35, signedDist) * 0.62;
    float uplandRise = terrainSmoothstep(0.9, 5.8, signedDist) * 0.68;

    float microUndulation =
      (sin(x * 0.62 + z * 0.48) * 0.085 +
       cos(x * 1.15 - z * 0.92) * 0.042 +
       sin(x * 2.1 + z * 1.75) * 0.018) *
      terrainSmoothstep(-2.4, 0.8, signedDist);

    float farLeftShelf =
      terrainSmoothstep(-12.5, -21.0, x) * terrainSmoothstep(-3.0, -11.0, z) * 0.55;

    float heightAboveWater =
      deepBasin + shallowShelf + bankSlope + uplandRise + microUndulation + farLeftShelf;

    float dxTorii = (x - 2.52) / 2.25;
    float dzTorii = (z + 5.18) / 1.45;
    float toriiMound = exp(-(dxTorii * dxTorii + dzTorii * dzTorii));
    heightAboveWater = max(heightAboveWater, -1.15 + toriiMound * 1.38);

    float pathT = clamp((x - 2.55) / 2.85, 0.0, 1.0);
    float pathCenterZ = -5.18 + pathT * 1.55 + sin(pathT * 3.14159265) * 0.35;
    float distToPath = abs(z - pathCenterZ);
    float pathMask =
      terrainSmoothstep(2.05, 2.65, x) *
      (1.0 - terrainSmoothstep(5.1, 6.0, x)) *
      exp(-pow(distToPath / 0.88, 2.0));
    heightAboveWater = max(heightAboveWater, -1.15 + pathMask * 1.36);

    float dxLantern = (x - 4.58) / 1.55;
    float dzLantern = (z + 2.42) / 1.25;
    float lanternBench = exp(-(dxLantern * dxLantern + dzLantern * dzLantern));
    heightAboveWater = max(heightAboveWater, -1.15 + lanternBench * 1.57);

    float dxSakura = (x - 7.45) / 2.4;
    float dzSakura = (z + 1.62) / 2.2;
    float sakuraMound = exp(-(dxSakura * dxSakura + dzSakura * dzSakura));
    heightAboveWater = max(heightAboveWater, -1.15 + sakuraMound * 1.88);

    float toriiFootX = terrainSmoothstep(2.15, 1.48, abs(x - 2.52));
    float toriiFootZ = terrainSmoothstep(1.25, 0.72, abs(z + 5.18));
    float toriiGradeMask = toriiFootX * toriiFootZ;
    heightAboveWater = mix(heightAboveWater, min(heightAboveWater, 0.21), toriiGradeMask);

    float backBayFade = terrainSmoothstep(-9.2, -13.5, z);
    heightAboveWater = mix(heightAboveWater, -0.85, backBayFade);

    // Positive = water depth below WATER_LEVEL; negative = dry terrain height above water
    return -heightAboveWater;
  }
`;
