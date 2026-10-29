/**
 * Pure seeded procedural mycelium network generator & pulse propagation math.
 * Zero Three.js imports so network topology and pulse physics are unit-testable.
 */

export type Point3D = [number, number, number];

export interface NetworkBranch {
  id: number;
  parentId: number | null;
  points: Point3D[];
  /** Normalized radial distance 0..1 where this branch starts growing */
  startGrowth: number;
  /** Normalized radial distance 0..1 where this branch finishes growing */
  endGrowth: number;
  /** Tube/filament thickness radius */
  radius: number;
  /** Hierarchy tier: 0 = thicker rhizomorph cord, 1 = thin secondary thread, 2 = hair-fine hypha */
  tier: 0 | 1 | 2;
  /** Index into neighborMushrooms if this branch links to another mushroom, else -1 */
  targetMushroomIndex: number;
}

export interface NeighborMushroomTarget {
  index: number;
  position: Point3D;
  scale: number;
  /** Normalized growth distance 0..1 from origin mushroom base */
  normalizedDistance: number;
}

export interface GeneratedMyceliumNetwork {
  branches: NetworkBranch[];
  neighborMushrooms: NeighborMushroomTarget[];
  maxRadius: number;
}

/** Deterministic Mulberry32 PRNG */
export function createSeededRandom(seed: number): () => number {
  let a = seed >>> 0;
  return function nextRandom(): number {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generates a hierarchical 3D underground mycelium network of ~1,200 organic, wavy
 * filaments radiating from the clump ([0, -2.55, 0]) and primary mushroom base ([0, -0.35, 0]),
 * branching outward through the soil in three biological tiers:
 * - Tier 0: Thicker arterial rhizomorph cords linking the clump, origin mushroom, and 5 neighboring mushrooms
 * - Tier 1: Hundreds of thin secondary threads branching outward with organic waviness
 * - Tier 2: Over a thousand hair-fine hyphae forming a delicate, feathery subterranean web
 */
export function generateMyceliumNetwork(seed = 4208): GeneratedMyceliumNetwork {
  const rand = createSeededRandom(seed);
  const maxRadius = 11.8;

  // 5 neighboring mushrooms arranged in a wide natural forest arc around the origin
  const rawMushroomCoords: Array<{ pos: Point3D; scale: number }> = [
    { pos: [-5.8, 0.0, -3.2], scale: 0.72 },
    { pos: [6.2, 0.0, -2.8], scale: 0.82 },
    { pos: [-7.4, 0.0, 2.5], scale: 0.65 },
    { pos: [7.1, 0.0, 3.1], scale: 0.76 },
    { pos: [1.4, 0.0, -7.8], scale: 0.68 },
  ];

  const neighborMushrooms: NeighborMushroomTarget[] = rawMushroomCoords.map((item, index) => {
    const dist = Math.hypot(item.pos[0], item.pos[2]);
    return {
      index,
      position: item.pos,
      scale: item.scale,
      normalizedDistance: Math.min(1, dist / maxRadius),
    };
  });

  const branches: NetworkBranch[] = [];
  let branchIdCounter = 0;

  // Helper to spawn a secondary thread and a fan of hair-fine tertiary hyphae
  const spawnSecondaryAndHyphae = (
    parentId: number,
    rootPt: Point3D,
    baseAngle: number,
    parentGrowth: number,
    hyphaePerThread: number,
  ) => {
    const subSegments = 7;
    const subPts: Point3D[] = [[...rootPt]];
    const subLen = 1.6 + rand() * 2.6;
    const verticalSlope = (rand() - 0.52) * 1.3;
    const waveFreq = 2.2 + rand() * 2.5;
    const wavePhase = rand() * Math.PI * 2;
    let curAng = baseAngle;

    for (let k = 1; k <= subSegments; k++) {
      const kt = k / subSegments;
      const prev = subPts[k - 1];
      const step = subLen / subSegments;
      curAng += Math.sin(kt * waveFreq * Math.PI + wavePhase) * 0.22 + (rand() - 0.5) * 0.28;
      subPts.push([
        prev[0] + Math.cos(curAng) * step,
        Math.min(-0.18, prev[1] + verticalSlope / subSegments + (rand() - 0.5) * 0.12),
        prev[2] + Math.sin(curAng) * step,
      ]);
    }

    const subEndGrowth = Math.min(1, parentGrowth + (subLen / maxRadius) * 0.75);
    const subId = branchIdCounter++;
    branches.push({
      id: subId,
      parentId,
      points: subPts,
      startGrowth: parentGrowth,
      endGrowth: Math.max(parentGrowth + 0.04, subEndGrowth),
      radius: 0.0085,
      tier: 1,
      targetMushroomIndex: -1,
    });

    // Spawn hair-fine hyphae along this secondary thread
    for (let f = 0; f < hyphaePerThread; f++) {
      const fSplitIdx = 1 + Math.floor(rand() * (subSegments - 1));
      const fRoot = subPts[fSplitIdx];
      const fStartGrowth =
        parentGrowth + (subEndGrowth - parentGrowth) * (fSplitIdx / subSegments);
      const fPts: Point3D[] = [[...fRoot]];
      let fAngle = curAng + (f % 2 === 0 ? 1 : -1) * (0.35 + rand() * 0.85);
      const fLen = 0.55 + rand() * 1.35;
      const fSegs = 4;

      for (let m = 1; m <= fSegs; m++) {
        const prev = fPts[m - 1];
        const step = fLen / fSegs;
        fAngle += (rand() - 0.5) * 0.48;
        fPts.push([
          prev[0] + Math.cos(fAngle) * step,
          Math.min(-0.15, prev[1] + (rand() - 0.52) * 0.18),
          prev[2] + Math.sin(fAngle) * step,
        ]);
      }

      const hyphaId = branchIdCounter++;
      const hyphaEndGrowth = Math.min(1, fStartGrowth + 0.08 + rand() * 0.09);
      branches.push({
        id: hyphaId,
        parentId: subId,
        points: fPts,
        startGrowth: fStartGrowth,
        endGrowth: hyphaEndGrowth,
        radius: 0.0032,
        tier: 2,
        targetMushroomIndex: -1,
      });

      // Forking terminal micro-hypha tip
      if (rand() > 0.35) {
        const tipRoot = fPts[fPts.length - 2];
        const tipAng = fAngle + (rand() > 0.5 ? 0.55 : -0.55);
        const tipLen = 0.32 + rand() * 0.55;
        branches.push({
          id: branchIdCounter++,
          parentId: hyphaId,
          points: [
            [...tipRoot],
            [
              tipRoot[0] + Math.cos(tipAng) * tipLen * 0.5,
              Math.min(-0.15, tipRoot[1] + (rand() - 0.5) * 0.12),
              tipRoot[2] + Math.sin(tipAng) * tipLen * 0.5,
            ],
            [
              tipRoot[0] + Math.cos(tipAng + (rand() - 0.5) * 0.35) * tipLen,
              Math.min(-0.15, tipRoot[1] + (rand() - 0.5) * 0.18),
              tipRoot[2] + Math.sin(tipAng + (rand() - 0.5) * 0.35) * tipLen,
            ],
          ],
          startGrowth: fStartGrowth + 0.03,
          endGrowth: Math.min(1, hyphaEndGrowth + 0.05),
          radius: 0.0022,
          tier: 2,
          targetMushroomIndex: -1,
        });
      }
    }
  };

  // 1. Primary arterial rhizomorph cords emerging from the clump [0, -2.55, 0] and mushroom base [0, -0.35, 0]
  // to each of the 5 neighboring mushrooms
  for (let mIdx = 0; mIdx < neighborMushrooms.length; mIdx++) {
    const target = neighborMushrooms[mIdx];
    const segments = 16;
    const pts: Point3D[] = [];
    const startPt: Point3D = [0, -2.45 + (mIdx % 2) * 0.35, 0];
    const endPt: Point3D = [target.position[0], -0.25, target.position[2]];

    const lateralAngle = Math.atan2(endPt[2], endPt[0]) + Math.PI * 0.5;
    const lateralSway = (rand() - 0.5) * 1.65;
    const waveFreq = 2.0 + rand() * 1.5;

    for (let s = 0; s <= segments; s++) {
      const t = s / segments;
      const arc = Math.sin(t * Math.PI);
      const wave = Math.sin(t * Math.PI * waveFreq) * 0.35 * arc;
      const x =
        startPt[0] +
        (endPt[0] - startPt[0]) * t +
        Math.cos(lateralAngle) * (lateralSway * arc + wave);
      const y =
        startPt[1] * Math.pow(1 - t, 0.72) +
        endPt[1] * (1 - Math.pow(1 - t, 0.72)) -
        Math.sin(t * Math.PI) * (0.65 + rand() * 0.35);
      const z =
        startPt[2] +
        (endPt[2] - startPt[2]) * t +
        Math.sin(lateralAngle) * (lateralSway * arc + wave);
      pts.push([x, y, z]);
    }

    const trunkId = branchIdCounter++;
    branches.push({
      id: trunkId,
      parentId: null,
      points: pts,
      startGrowth: 0.0,
      endGrowth: target.normalizedDistance,
      radius: 0.022,
      tier: 0,
      targetMushroomIndex: mIdx,
    });

    // Vertical feeder cord connecting hero mushroom base [0, -0.35, 0] down into the clump at [0, -2.55, 0]
    if (mIdx < 3) {
      const vPts: Point3D[] = [];
      const vSegs = 8;
      const vAng = (mIdx / 3) * Math.PI * 2;
      for (let s = 0; s <= vSegs; s++) {
        const vt = s / vSegs;
        const rad = Math.sin(vt * Math.PI) * 0.32;
        vPts.push([
          Math.cos(vAng + vt * 2.2) * rad,
          -2.55 + vt * 2.2,
          Math.sin(vAng + vt * 2.2) * rad,
        ]);
      }
      branches.push({
        id: branchIdCounter++,
        parentId: trunkId,
        points: vPts,
        startGrowth: 0.0,
        endGrowth: 0.25,
        radius: 0.018,
        tier: 0,
        targetMushroomIndex: -1,
      });
    }

    // Spawn 14 secondary threads along each primary trunk, each with 5 fine hyphae
    for (let b = 0; b < 14; b++) {
      const splitIdx = 1 + Math.floor((b / 14) * (segments - 2));
      const rootPt = pts[splitIdx];
      const splitRatio = splitIdx / segments;
      const parentGrowthAtSplit = splitRatio * target.normalizedDistance;
      const trunkDir = Math.atan2(endPt[2] - startPt[2], endPt[0] - startPt[0]);
      const branchSign = b % 2 === 0 ? 1 : -1;
      const baseAngle = trunkDir + branchSign * (0.35 + rand() * 0.75);

      spawnSecondaryAndHyphae(trunkId, rootPt, baseAngle, parentGrowthAtSplit, 5);
    }
  }

  // 2. Radial exploratory cords & fine hyphal fans filling the 360-degree subterranean field
  const exploratoryCount = 34;
  for (let i = 0; i < exploratoryCount; i++) {
    const angle = (i / exploratoryCount) * Math.PI * 2 + (rand() - 0.5) * 0.18;
    const length = 3.2 + rand() * 7.8;
    const segs = 10;
    const startY = -2.55 + (rand() - 0.5) * 0.8;
    const pts: Point3D[] = [[0, startY, 0]];
    let curAngle = angle;
    const targetDepth = -0.8 - rand() * 3.1;

    for (let s = 1; s <= segs; s++) {
      const st = s / segs;
      const prev = pts[s - 1];
      curAngle += Math.sin(st * Math.PI * 2.5 + i) * 0.18 + (rand() - 0.5) * 0.25;
      const step = length / segs;
      pts.push([
        prev[0] + Math.cos(curAngle) * step,
        startY * (1 - st) + targetDepth * st + Math.sin(st * Math.PI) * 0.22,
        prev[2] + Math.sin(curAngle) * step,
      ]);
    }

    const endGrowth = Math.min(1, length / maxRadius);
    const expId = branchIdCounter++;
    branches.push({
      id: expId,
      parentId: null,
      points: pts,
      startGrowth: 0.02 + rand() * 0.08,
      endGrowth,
      radius: i % 4 === 0 ? 0.016 : 0.009,
      tier: i % 4 === 0 ? 0 : 1,
      targetMushroomIndex: -1,
    });

    // Spawn 4 secondary offshoots & hyphae fans per exploratory cord
    for (let sub = 0; sub < 4; sub++) {
      const idx = 2 + Math.floor(rand() * (segs - 3));
      const rootPt = pts[idx];
      const gAtSplit = (idx / segs) * endGrowth;
      const subAng = curAngle + (sub % 2 === 0 ? 1 : -1) * (0.4 + rand() * 0.65);
      spawnSecondaryAndHyphae(expId, rootPt, subAng, gAtSplit, 4);
    }
  }

  return {
    branches,
    neighborMushrooms,
    maxRadius,
  };
}

/**
 * Computes the travelling wave intensity (0..1) of an interactive light pulse
 * at a given 3D point relative to the pulse origin.
 */
export function computePulseWaveIntensity(
  point: Point3D,
  pulseOrigin: Point3D,
  pulseElapsedSec: number,
  pulseSpeed = 6.5,
  ringWidth = 1.6,
): number {
  if (pulseElapsedSec < 0 || pulseElapsedSec > 3.5) return 0;
  const dist = Math.hypot(
    point[0] - pulseOrigin[0],
    point[1] - pulseOrigin[1],
    point[2] - pulseOrigin[2],
  );
  const waveRadius = pulseElapsedSec * pulseSpeed;
  const delta = Math.abs(dist - waveRadius);
  if (delta > ringWidth) return 0;
  const envelope = Math.max(0, 1 - pulseElapsedSec / 3.2);
  const wave = Math.cos((delta / ringWidth) * Math.PI * 0.5);
  return wave * wave * envelope;
}

/**
 * Generates deterministic start (underground network) and end (molded packaging tray)
 * 3D coordinates for the scrub-able Chapter 5 thread/particle convergence morph.
 */
export interface TrayMorphData {
  sourcePositions: Float32Array;
  targetPositions: Float32Array;
  randomSeeds: Float32Array;
}

export function generateTrayMorphCoordinates(count = 1400, seed = 9001): TrayMorphData {
  const rand = createSeededRandom(seed);
  const sourcePositions = new Float32Array(count * 3);
  const targetPositions = new Float32Array(count * 3);
  const randomSeeds = new Float32Array(count);

  // Tray center in world space is at [0, -5.45, 0], dimensions ~ 2.7w x 0.62h x 1.75d
  const trayCenterY = -5.45;
  const halfW = 1.32;
  const halfD = 0.86;
  const height = 0.56;

  for (let i = 0; i < count; i++) {
    randomSeeds[i] = rand();

    // Source: spread across the underground mycelium network above and around the tray
    const angle = rand() * Math.PI * 2;
    const radius = 1.8 + rand() * 6.5;
    sourcePositions[i * 3 + 0] = Math.cos(angle) * radius;
    sourcePositions[i * 3 + 1] = -2.2 - rand() * 3.8;
    sourcePositions[i * 3 + 2] = Math.sin(angle) * radius;

    // Target: distributed on the rounded rectangular molded tray silhouette
    let tx = (rand() * 2 - 1) * halfW;
    let tz = (rand() * 2 - 1) * halfD;

    // Respect the broken/cut front-right corner (x > 0.65 && z > 0.25)
    if (tx > 0.68 && tz > 0.26 && tx + tz * 1.2 > 1.25) {
      tx -= 0.45;
      tz -= 0.35;
    }

    // Recessed inner cavity vs raised perimeter wall & lip
    const normX = Math.abs(tx) / halfW;
    const normZ = Math.abs(tz) / halfD;
    const edgeFactor = Math.max(normX, normZ);
    let ty = trayCenterY - height * 0.42;
    if (edgeFactor > 0.72) {
      const wallT = Math.min(1, (edgeFactor - 0.72) / 0.28);
      ty = trayCenterY - height * 0.42 + wallT * height;
    }
    ty += (rand() - 0.5) * 0.06;

    targetPositions[i * 3 + 0] = tx;
    targetPositions[i * 3 + 1] = ty;
    targetPositions[i * 3 + 2] = tz;
  }

  return {
    sourcePositions,
    targetPositions,
    randomSeeds,
  };
}
