import { Vec2 } from './types';

export interface IslandLobe {
  x: number;
  z: number;
  rx: number;
  rz: number;
  height: number;
  angle: number;
  sharpness: number;
}

export interface BuildingFootprint {
  x: number;
  y: number;
  z: number;
  rotationY: number;
  /** Conservative foundation half-extents / radius for ground contact checks */
  halfWidth: number;
  halfDepth: number;
  /** Outer roof/eave/plinth envelope half-extents for collision clearance tests */
  roofHalfWidth: number;
  roofHalfDepth: number;
}

// =========================================================================
// INDEPENDENT ARCHITECTURAL PLACEMENTS (Verified zero roof/wall/foundation overlap)
// =========================================================================
export const LIGHTHOUSE_POS = { x: 9.8, y: 8.2, z: -2.2 };
export const COTTAGE_POS = { x: 19.6, y: 7.8, z: -0.6 };
export const COTTAGE_ROTATION_Y = -0.24;

export const LIGHTHOUSE_FOOTPRINT: BuildingFootprint = {
  x: LIGHTHOUSE_POS.x,
  y: LIGHTHOUSE_POS.y,
  z: LIGHTHOUSE_POS.z,
  rotationY: 0,
  halfWidth: 3.55, // bottom granite plinth radius
  halfDepth: 3.55,
  roofHalfWidth: 2.7, // exterior gallery deck radius
  roofHalfDepth: 2.7,
};

export const COTTAGE_FOOTPRINT: BuildingFootprint = {
  x: COTTAGE_POS.x,
  y: COTTAGE_POS.y,
  z: COTTAGE_POS.z,
  rotationY: COTTAGE_ROTATION_Y,
  halfWidth: 3.4, // foundation 6.8m wide
  halfDepth: 2.6, // foundation 5.2m deep
  roofHalfWidth: 3.58, // overhanging pitched gable roof eaves (7.16m)
  roofHalfDepth: 2.85,
};

// Connecting curved stone walkway spine between lighthouse entrance and cottage porch
export const CONNECTING_WALKWAY_WAYPOINTS: Vec2[] = [
  { x: 12.6, z: -0.7 }, // Lighthouse east entrance landing
  { x: 14.3, z: 0.45 },
  { x: 16.0, z: 1.55 },
  { x: 17.55, z: 2.45 }, // Cottage front porch landing
];

// Multi-lobe geological definition for an irregular jagged rocky coastal headland
// Expanded eastern terrace provides a broad, grounded natural plateau for the separated cottage
export const ISLAND_LOBES: IslandLobe[] = [
  // Main lighthouse headland peak
  { x: 10.6, z: -2.0, rx: 10.6, rz: 9.4, height: 8.9, angle: 0.16, sharpness: 1.5 },
  // Expanded keeper's cottage eastern headland terrace (supports full cottage + overhang + garden edge)
  { x: 20.6, z: -0.4, rx: 11.4, rz: 9.8, height: 8.4, angle: -0.22, sharpness: 1.38 },
  // Connecting rocky saddle supporting the walkway between lighthouse and cottage
  { x: 15.2, z: 0.6, rx: 6.8, rz: 6.2, height: 8.25, angle: 0.05, sharpness: 1.32 },
  // Steep western cliff spine jutting toward the ocean
  { x: 2.8, z: -4.2, rx: 6.2, rz: 4.9, height: 6.0, angle: 0.42, sharpness: 1.9 },
  // Dramatic lower-right foreground bluff (carries windswept grasses & foreground framing)
  { x: 16.2, z: 14.2, rx: 9.4, rz: 6.8, height: 5.1, angle: -0.36, sharpness: 1.68 },
  // Connecting saddle ridge for the winding bluff stone staircase
  { x: 15.8, z: 6.8, rx: 6.8, rz: 5.8, height: 6.4, angle: 0.14, sharpness: 1.35 },
  // Jagged foreground rocky reef point (lower center-right)
  { x: 7.4, z: 15.2, rx: 4.7, rz: 3.5, height: 2.8, angle: 0.35, sharpness: 2.15 },
  // Back northern rocky crag
  { x: 10.2, z: -11.8, rx: 8.4, rz: 6.0, height: 5.9, angle: -0.28, sharpness: 1.8 },
  // Sea stack outcrop in mid-cove where waves crash dramatically
  { x: -1.8, z: -3.6, rx: 3.3, rz: 2.7, height: 2.8, angle: 0.6, sharpness: 2.3 },
  // Secondary shoreline reef rock
  { x: 4.6, z: 6.4, rx: 2.7, rz: 2.3, height: 2.1, angle: -0.5, sharpness: 2.2 },
  // Outer back-right headland extension behind cottage
  { x: 26.8, z: -6.8, rx: 10.8, rz: 9.4, height: 7.0, angle: 0.2, sharpness: 1.45 },
];

// Collision circles for boat safety, GPU ocean shoreline SDF, & debug wireframe visualization
export interface CollisionCircle {
  x: number;
  z: number;
  radius: number;
  label: string;
}

export const ISLAND_COLLIDERS: CollisionCircle[] = [
  { x: 10.6, z: -2.0, radius: 11.0, label: 'Lighthouse Headland' },
  { x: 20.6, z: -0.4, radius: 11.4, label: 'Cottage Terrace' },
  { x: 2.8, z: -4.2, radius: 6.5, label: 'West Cliff' },
  { x: 16.2, z: 14.2, radius: 9.6, label: 'South Grass Bluff' },
  { x: 15.8, z: 6.8, radius: 6.8, label: 'Stairway Ridge' },
  { x: 7.4, z: 15.2, radius: 5.0, label: 'Foreground Reef' },
  { x: 10.2, z: -11.8, radius: 8.4, label: 'North Crag' },
  { x: -1.8, z: -3.6, radius: 3.7, label: 'Cove Sea Stack' },
  { x: 4.6, z: 6.4, radius: 3.2, label: 'Inner Reef' },
  { x: 26.8, z: -6.8, radius: 10.8, label: 'East Headland' },
];

// Designated safe water area for interactive boat repositioning
export const SAFE_WATER_BOUNDS = {
  minX: -28,
  maxX: 1.8,
  minZ: -16,
  maxZ: 22,
  minShoreClearance: 3.6,
};

function hash2(ix: number, iz: number): number {
  const n = Math.sin(ix * 127.1 + iz * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}

export function valueNoise2D(x: number, z: number): number {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fz = z - iz;
  const ux = fx * fx * (3 - 2 * fx);
  const uz = fz * fz * (3 - 2 * fz);

  const a = hash2(ix, iz);
  const b = hash2(ix + 1, iz);
  const c = hash2(ix, iz + 1);
  const d = hash2(ix + 1, iz + 1);

  return a + (b - a) * ux + (c - a) * uz + (a - b - c + d) * ux * uz;
}

export function fbm2D(x: number, z: number, octaves = 4): number {
  let sum = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < octaves; i++) {
    sum += (valueNoise2D(x * freq, z * freq) * 2 - 1) * amp;
    freq *= 2.04;
    amp *= 0.5;
  }
  return sum;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * Samples the connecting walkway centerline point and target elevation for t in [0, 1].
 */
export function sampleConnectingWalkway(t: number): {
  x: number;
  y: number;
  z: number;
  tangentX: number;
  tangentZ: number;
} {
  const ct = Math.max(0, Math.min(1, t));
  // Cubic Bezier through lighthouse entrance landing -> curved saddle -> cottage porch
  const p0 = CONNECTING_WALKWAY_WAYPOINTS[0];
  const p1 = CONNECTING_WALKWAY_WAYPOINTS[1];
  const p2 = CONNECTING_WALKWAY_WAYPOINTS[2];
  const p3 = CONNECTING_WALKWAY_WAYPOINTS[3];

  const mt = 1 - ct;
  const x =
    mt * mt * mt * p0.x +
    3 * mt * mt * ct * p1.x +
    3 * mt * ct * ct * p2.x +
    ct * ct * ct * p3.x;
  const z =
    mt * mt * mt * p0.z +
    3 * mt * mt * ct * p1.z +
    3 * mt * ct * ct * p2.z +
    ct * ct * ct * p3.z;

  const dx =
    3 * mt * mt * (p1.x - p0.x) +
    6 * mt * ct * (p2.x - p1.x) +
    3 * ct * ct * (p3.x - p2.x);
  const dz =
    3 * mt * mt * (p1.z - p0.z) +
    6 * mt * ct * (p2.z - p1.z) +
    3 * ct * ct * (p3.z - p2.z);
  const len = Math.hypot(dx, dz) || 1;

  // Smooth elevation step from lighthouse pad (8.2m) down to cottage pad (7.8m)
  const y = LIGHTHOUSE_POS.y + (COTTAGE_POS.y - LIGHTHOUSE_POS.y) * smoothstep(0.12, 0.88, ct);

  return { x, y, z, tangentX: dx / len, tangentZ: dz / len };
}

/**
 * Samples the winding stone staircase descending from the walkway saddle down the foreground bluff.
 */
export function sampleBluffStaircase(t: number): {
  x: number;
  y: number;
  z: number;
} {
  const ct = Math.max(0, Math.min(1, t));
  // Starts seamlessly at the cottage porch landing (17.55, 2.75) and curves down the foreground bluff
  const z = 2.75 + ct * 9.75;
  const x = 17.55 - Math.sin(ct * Math.PI * 0.72) * 1.15 + ct * 0.35;
  const y = 7.8 - ct * 3.7;
  return { x, y, z };
}

/**
 * Distance from world (x, z) to the connecting walkway curve (for terrain grading & grass exclusion).
 */
export function distanceToConnectingWalkway(x: number, z: number): {
  dist: number;
  t: number;
  targetY: number;
} {
  let bestDist = 9999;
  let bestT = 0;
  let bestY = LIGHTHOUSE_POS.y;
  const steps = 12;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const pt = sampleConnectingWalkway(t);
    const d = Math.hypot(x - pt.x, z - pt.z);
    if (d < bestDist) {
      bestDist = d;
      bestT = t;
      bestY = pt.y;
    }
  }
  return { dist: bestDist, t: bestT, targetY: bestY };
}

/**
 * Deterministic rocky coastal island elevation at world (x, z).
 * Ocean surface sits at y = 0. Seafloor drops to around -4.5m.
 * Features two distinct grounded architectural building pads (Lighthouse + Cottage),
 * a connecting graded stone walkway saddle, and a carved bluff staircase descent.
 */
export function islandHeightAt(x: number, z: number): number {
  let h = -4.5;

  for (let i = 0; i < ISLAND_LOBES.length; i++) {
    const lobe = ISLAND_LOBES[i];
    const dx = x - lobe.x;
    const dz = z - lobe.z;
    const c = Math.cos(lobe.angle);
    const s = Math.sin(lobe.angle);
    const rx = (dx * c - dz * s) / lobe.rx;
    const rz = (dx * s + dz * c) / lobe.rz;
    const dist2 = rx * rx + rz * rz;

    if (dist2 < 2.65) {
      // Irregular geological radial perturbation so no lobe reads as a smooth cone
      const warp = fbm2D(x * 0.14 + i * 3.7, z * 0.14 - i * 2.1, 3) * 0.34;
      const d = Math.max(0, Math.sqrt(dist2) + warp);
      const falloff = Math.max(0, 1 - Math.pow(d, lobe.sharpness));
      const lobeH = -4.5 + falloff * (lobe.height + 4.5);
      // Smooth maximum blend between geological lobes
      const k = 1.65;
      const diff = Math.max(k - Math.abs(h - lobeH), 0) / k;
      h = Math.max(h, lobeH) + diff * diff * k * 0.25;
    }
  }

  // Geological cliff terracing (layered coastal basalt strata) + eroded fractures & crags
  if (h > -2.5) {
    const strata = Math.sin(h * 1.55 + fbm2D(x * 0.18, z * 0.18, 2) * 1.2) * 0.28;
    const ridgeNoise = 1 - Math.abs(fbm2D(x * 0.27, z * 0.27, 3));
    const fracture = Math.abs(fbm2D(x * 0.52 + 4.1, z * 0.52 - 2.3, 2));
    const fineNoise = fbm2D(x * 0.72, z * 0.72, 2) * 0.24;
    const landMask = smoothstep(-2.0, 1.3, h);
    h += (strata + (ridgeNoise - 0.5) * 1.15 - fracture * 0.22 + fineNoise) * landMask;
  }

  // 1. Connecting stone walkway saddle between lighthouse entrance and cottage porch
  if (x >= 11.0 && x <= 19.2 && z >= -2.5 && z <= 4.5) {
    const walk = distanceToConnectingWalkway(x, z);
    if (walk.dist < 2.6) {
      const walkBlend = (1 - smoothstep(0.95, 2.6, walk.dist)) * 0.88;
      h = h * (1 - walkBlend) + walk.targetY * walkBlend;
    }
  }

  // 2. Carved ridge path for the winding stone bluff staircase descending toward foreground right
  if (z >= 2.6 && z <= 13.4) {
    const stairT = Math.max(0, Math.min(1, (z - 2.75) / 9.75));
    const stairPt = sampleBluffStaircase(stairT);
    const stairDist = Math.abs(x - stairPt.x);
    if (stairDist < 2.5) {
      const stairBlend =
        (1 - smoothstep(1.0, 2.5, stairDist)) *
        smoothstep(2.6, 3.6, z) *
        (1 - smoothstep(12.2, 13.4, z));
      h = h * (1 - stairBlend * 0.82) + stairPt.y * (stairBlend * 0.82);
    }
  }

  // 3. Distinct level Lighthouse Pad (grounded foundation plateau with clear entrance access)
  const dTower = Math.hypot(x - LIGHTHOUSE_POS.x, z - LIGHTHOUSE_POS.z);
  const towerBlend = 1 - smoothstep(3.85, 6.2, dTower);
  h = h * (1 - towerBlend) + LIGHTHOUSE_POS.y * towerBlend;

  // 4. Distinct level Keeper's Cottage Pad (exact inverse of Three.js Y rotation, covers full walls + porch + eaves)
  const cdx = x - COTTAGE_POS.x;
  const cdz = z - COTTAGE_POS.z;
  const cc = Math.cos(COTTAGE_ROTATION_Y);
  const cs = Math.sin(COTTAGE_ROTATION_Y);
  const clx = cdx * cc - cdz * cs;
  const clz = cdx * cs + cdz * cc;
  // Rectangular rounded-box distance around cottage + front porch projection (+z up to 4.1)
  const qx = Math.max(0, Math.abs(clx) - 4.0);
  const qz = Math.max(0, Math.abs(clz - 0.65) - 3.75);
  const cotBoxDist = Math.hypot(qx, qz);
  const cottageBlend = 1 - smoothstep(0.0, 2.6, cotBoxDist);
  h = h * (1 - cottageBlend) + COTTAGE_POS.y * cottageBlend;

  return h;
}

/**
 * Pure geometric architectural verification checking that the lighthouse and keeper's
 * cottage have zero horizontal overlap (including roof eaves & foundations) and that
 * every foundation corner of both buildings is solidly supported by island terrain.
 */
export function verifyArchitecturalPlacement(): {
  centerDistance: number;
  foundationClearance: number;
  roofToTowerClearance: number;
  box3GapX: number;
  lighthousePadMaxError: number;
  cottagePadMaxError: number;
  walkwayMaxGap: number;
} {
  const centerDistance = Math.hypot(
    COTTAGE_POS.x - LIGHTHOUSE_POS.x,
    COTTAGE_POS.z - LIGHTHOUSE_POS.z
  );

  // Conservative rotated AABB extents for cottage roof & foundation
  const cosR = Math.abs(Math.cos(COTTAGE_ROTATION_Y));
  const sinR = Math.abs(Math.sin(COTTAGE_ROTATION_Y));
  const cotBoxHalfX =
    COTTAGE_FOOTPRINT.roofHalfWidth * cosR + COTTAGE_FOOTPRINT.roofHalfDepth * sinR;

  const lhMaxX = LIGHTHOUSE_POS.x + LIGHTHOUSE_FOOTPRINT.halfWidth;
  const cotMinX = COTTAGE_POS.x - cotBoxHalfX;
  const box3GapX = cotMinX - lhMaxX;

  const foundationClearance =
    centerDistance -
    LIGHTHOUSE_FOOTPRINT.halfWidth -
    Math.hypot(COTTAGE_FOOTPRINT.halfWidth, COTTAGE_FOOTPRINT.halfDepth * 0.4);

  const roofToTowerClearance =
    centerDistance -
    LIGHTHOUSE_FOOTPRINT.roofHalfWidth -
    cotBoxHalfX;

  // Check foundation ground contact around lighthouse plinth perimeter
  let lighthousePadMaxError = 0;
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const gx = LIGHTHOUSE_POS.x + Math.cos(a) * 3.5;
    const gz = LIGHTHOUSE_POS.z + Math.sin(a) * 3.5;
    lighthousePadMaxError = Math.max(
      lighthousePadMaxError,
      Math.abs(islandHeightAt(gx, gz) - LIGHTHOUSE_POS.y)
    );
  }

  // Check foundation ground contact at all 4 cottage foundation corners + front porch corners
  let cottagePadMaxError = 0;
  const localCorners: Array<[number, number]> = [
    [-3.4, -2.6],
    [3.4, -2.6],
    [3.4, 2.6],
    [-3.4, 2.6],
    [-2.5, 3.8],
    [0.0, 3.8],
  ];
  const c = Math.cos(COTTAGE_ROTATION_Y);
  const s = Math.sin(COTTAGE_ROTATION_Y);
  for (const [lx, lz] of localCorners) {
    const wx = COTTAGE_POS.x + lx * c + lz * s;
    const wz = COTTAGE_POS.z - lx * s + lz * c;
    cottagePadMaxError = Math.max(
      cottagePadMaxError,
      Math.abs(islandHeightAt(wx, wz) - COTTAGE_POS.y)
    );
  }

  // Check connecting walkway terrain continuity
  let walkwayMaxGap = 0;
  for (let i = 0; i <= 10; i++) {
    const pt = sampleConnectingWalkway(i / 10);
    const groundY = islandHeightAt(pt.x, pt.z);
    walkwayMaxGap = Math.max(walkwayMaxGap, Math.abs(pt.y - groundY));
  }

  return {
    centerDistance,
    foundationClearance,
    roofToTowerClearance,
    box3GapX,
    lighthousePadMaxError,
    cottagePadMaxError,
    walkwayMaxGap,
  };
}

/**
 * Approximate signed distance field to the island shoreline (y = 0 contour).
 * Negative = inside land/rocks; 0 = shoreline; Positive = open ocean water distance in meters.
 * Used for both GPU ocean shoreline foam/breaking waves AND CPU boat collision avoidance.
 */
export function islandShoreSDF(x: number, z: number): number {
  let minD = 9999;
  for (let i = 0; i < ISLAND_COLLIDERS.length; i++) {
    const c = ISLAND_COLLIDERS[i];
    const d = Math.hypot(x - c.x, z - c.z) - c.radius;
    if (d < minD) minD = d;
  }
  const crag = fbm2D(x * 0.16, z * 0.16, 2) * 1.15;
  return minD + crag;
}

/**
 * Computes normalized outward gradient of islandShoreSDF (points away from rocks into open water).
 */
export function islandShoreNormal(x: number, z: number): Vec2 {
  const eps = 0.25;
  const dx = islandShoreSDF(x + eps, z) - islandShoreSDF(x - eps, z);
  const dz = islandShoreSDF(x, z + eps) - islandShoreSDF(x, z - eps);
  const len = Math.hypot(dx, dz) || 1;
  return { x: dx / len, z: dz / len };
}

/**
 * Checks if a world (x, z) point lies in safe navigable water for the boat.
 */
export function isSafeWaterPosition(x: number, z: number): boolean {
  if (
    x < SAFE_WATER_BOUNDS.minX ||
    x > SAFE_WATER_BOUNDS.maxX ||
    z < SAFE_WATER_BOUNDS.minZ ||
    z > SAFE_WATER_BOUNDS.maxZ
  ) {
    return false;
  }
  return islandShoreSDF(x, z) >= SAFE_WATER_BOUNDS.minShoreClearance;
}

/**
 * Projects any candidate water point into the nearest valid safe water area
 * outside all island rock colliders.
 */
export function clampToSafeWater(x: number, z: number): Vec2 {
  let cx = Math.max(SAFE_WATER_BOUNDS.minX, Math.min(SAFE_WATER_BOUNDS.maxX, x));
  let cz = Math.max(SAFE_WATER_BOUNDS.minZ, Math.min(SAFE_WATER_BOUNDS.maxZ, z));

  for (let iter = 0; iter < 8; iter++) {
    const sdf = islandShoreSDF(cx, cz);
    if (sdf >= SAFE_WATER_BOUNDS.minShoreClearance) break;
    const n = islandShoreNormal(cx, cz);
    const push = SAFE_WATER_BOUNDS.minShoreClearance - sdf + 0.35;
    cx += n.x * push;
    cz += n.z * push;
    cx = Math.max(SAFE_WATER_BOUNDS.minX, Math.min(SAFE_WATER_BOUNDS.maxX, cx));
    cz = Math.max(SAFE_WATER_BOUNDS.minZ, Math.min(SAFE_WATER_BOUNDS.maxZ, cz));
  }

  return { x: cx, z: cz };
}

/**
 * Computes shoreline contact anchor points where waves break strongly against rocks.
 * Used to place localized crashing wave spray emitters along actual wave-rock contact zones.
 */
export function getShorelineSprayAnchors(): Array<{ x: number; z: number; nx: number; nz: number }> {
  const anchors: Array<{ x: number; z: number; nx: number; nz: number }> = [];
  const step = 2.2;
  for (let x = -7; x <= 22; x += step) {
    for (let z = -15; z <= 21; z += step) {
      const sdf = islandShoreSDF(x, z);
      if (sdf > -0.75 && sdf < 1.25) {
        const n = islandShoreNormal(x, z);
        if (n.x < 0.45 || n.z > -0.25) {
          anchors.push({ x, z, nx: n.x, nz: n.z });
        }
      }
    }
  }
  return anchors;
}
