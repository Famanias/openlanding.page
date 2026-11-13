export type FootprintKind =
  | 'rock'
  | 'cobble'
  | 'tree'
  | 'waterFeature'
  | 'shrine'
  | 'stepStone'
  | 'stream'
  | 'pebbleBeach'
  | 'moss'
  | 'negativeSpace';

export interface ExclusionFootprint {
  id?: string;
  kind: FootprintKind;
  x: number;
  z: number;
  rx: number;
  rz: number;
  yaw?: number;
  margin?: number;
  baseY?: number;
  topY?: number;
}

export interface Point3D {
  x: number;
  y: number;
  z: number;
}

export interface VegetationValidationInput {
  x: number;
  z: number;
  clearance?: number;
  shoreDistance: number;
  slope: number;
  minShoreDistance?: number;
  maxShoreDistance?: number;
  maxSlope?: number;
  ignoreKinds?: ReadonlySet<FootprintKind>;
}

export function pointInRotatedEllipse(
  px: number,
  pz: number,
  fp: Pick<ExclusionFootprint, 'x' | 'z' | 'rx' | 'rz' | 'yaw' | 'margin'>,
  extraClearance = 0,
): boolean {
  if (!Number.isFinite(px) || !Number.isFinite(pz)) return true;
  const dx = px - fp.x;
  const dz = pz - fp.z;
  const yaw = fp.yaw ?? 0;
  const cosY = Math.cos(yaw);
  const sinY = Math.sin(yaw);

  // Transform world offset into footprint local space (inverse of Three.js Y rotation)
  const lx = dx * cosY - dz * sinY;
  const lz = dx * sinY + dz * cosY;

  const pad = (fp.margin ?? 0) + extraClearance;
  const ex = Math.max(0.01, fp.rx + pad);
  const ez = Math.max(0.01, fp.rz + pad);

  const nx = lx / ex;
  const nz = lz / ez;
  return nx * nx + nz * nz <= 1;
}

export function rotatedEllipseAabb(
  fp: Pick<ExclusionFootprint, 'x' | 'z' | 'rx' | 'rz' | 'yaw' | 'margin'>,
): { minX: number; maxX: number; minZ: number; maxZ: number } {
  const pad = fp.margin ?? 0;
  const ex = Math.max(0.01, fp.rx + pad);
  const ez = Math.max(0.01, fp.rz + pad);
  const yaw = fp.yaw ?? 0;
  const c = Math.cos(yaw);
  const s = Math.sin(yaw);
  const halfX = Math.hypot(ex * c, ez * s);
  const halfZ = Math.hypot(ex * s, ez * c);
  return {
    minX: fp.x - halfX,
    maxX: fp.x + halfX,
    minZ: fp.z - halfZ,
    maxZ: fp.z + halfZ,
  };
}

export class PlacementRegistry {
  private readonly cellSize: number;
  private readonly footprints: ExclusionFootprint[] = [];
  private readonly grid = new Map<string, number[]>();
  private maxHalfExtent = 0;

  constructor(cellSize = 1.25) {
    this.cellSize = Math.max(0.25, cellSize);
  }

  get count(): number {
    return this.footprints.length;
  }

  private cellCoord(v: number): number {
    return Math.floor(v / this.cellSize);
  }

  private cellKey(cx: number, cz: number): string {
    return `${cx},${cz}`;
  }

  register(fp: ExclusionFootprint): number {
    if (
      !Number.isFinite(fp.x) ||
      !Number.isFinite(fp.z) ||
      !Number.isFinite(fp.rx) ||
      !Number.isFinite(fp.rz)
    ) {
      return -1;
    }
    const idx = this.footprints.length;
    this.footprints.push(fp);

    const aabb = rotatedEllipseAabb(fp);
    const halfX = (aabb.maxX - aabb.minX) * 0.5;
    const halfZ = (aabb.maxZ - aabb.minZ) * 0.5;
    this.maxHalfExtent = Math.max(this.maxHalfExtent, halfX, halfZ);

    const minCx = this.cellCoord(aabb.minX);
    const maxCx = this.cellCoord(aabb.maxX);
    const minCz = this.cellCoord(aabb.minZ);
    const maxCz = this.cellCoord(aabb.maxZ);

    for (let cx = minCx; cx <= maxCx; cx++) {
      for (let cz = minCz; cz <= maxCz; cz++) {
        const key = this.cellKey(cx, cz);
        let bucket = this.grid.get(key);
        if (!bucket) {
          bucket = [];
          this.grid.set(key, bucket);
        }
        bucket.push(idx);
      }
    }
    return idx;
  }

  registerCapsule(
    kind: FootprintKind,
    ax: number,
    az: number,
    bx: number,
    bz: number,
    radius: number,
    margin = 0,
    topY?: number,
    id?: string,
  ): number {
    const cx = (ax + bx) * 0.5;
    const cz = (az + bz) * 0.5;
    const dx = bx - ax;
    const dz = bz - az;
    const halfLen = Math.hypot(dx, dz) * 0.5;
    const yaw = -Math.atan2(dz, dx);
    return this.register({
      id,
      kind,
      x: cx,
      z: cz,
      rx: halfLen + radius,
      rz: radius,
      yaw,
      margin,
      topY,
    });
  }

  getFootprints(kinds?: ReadonlySet<FootprintKind>): ExclusionFootprint[] {
    if (!kinds) return [...this.footprints];
    return this.footprints.filter((fp) => kinds.has(fp.kind));
  }

  isExcluded(
    x: number,
    z: number,
    clearance = 0,
    ignoreKinds?: ReadonlySet<FootprintKind>,
  ): boolean {
    if (!Number.isFinite(x) || !Number.isFinite(z)) return true;
    const safeClearance = Math.max(0, Number.isFinite(clearance) ? clearance : 0);
    const minCx = this.cellCoord(x - safeClearance);
    const maxCx = this.cellCoord(x + safeClearance);
    const minCz = this.cellCoord(z - safeClearance);
    const maxCz = this.cellCoord(z + safeClearance);

    const seen = new Set<number>();
    for (let cx = minCx; cx <= maxCx; cx++) {
      for (let cz = minCz; cz <= maxCz; cz++) {
        const bucket = this.grid.get(this.cellKey(cx, cz));
        if (!bucket) continue;
        for (let k = 0; k < bucket.length; k++) {
          const idx = bucket[k];
          if (seen.has(idx)) continue;
          seen.add(idx);
          const fp = this.footprints[idx];
          if (ignoreKinds && ignoreKinds.has(fp.kind)) continue;
          if (pointInRotatedEllipse(x, z, fp, safeClearance)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  isVegetationValid(input: VegetationValidationInput): boolean {
    if (!Number.isFinite(input.x) || !Number.isFinite(input.z)) return false;
    if (!Number.isFinite(input.shoreDistance) || !Number.isFinite(input.slope)) return false;

    const minShore = input.minShoreDistance ?? 0.14;
    if (input.shoreDistance < minShore) return false;
    if (input.maxShoreDistance !== undefined && input.shoreDistance > input.maxShoreDistance) {
      return false;
    }

    const maxSlope = input.maxSlope ?? 0.34;
    if (input.slope > maxSlope) return false;

    return !this.isExcluded(input.x, input.z, input.clearance ?? 0.08, input.ignoreKinds);
  }
}

export interface StreamTrajectoryParams {
  source: Point3D;
  target: Point3D;
  obstacles: readonly ExclusionFootprint[];
  terrainHeightFn: (x: number, z: number) => number;
  isInsideWaterFn: (pt: { x: number; z: number }, margin?: number) => boolean;
  streamRadius?: number;
  samples?: number;
}

export interface StreamTrajectoryResult {
  controlPoints: [Point3D, Point3D, Point3D, Point3D];
  landing: Point3D;
  sampledPoints: Point3D[];
  clearedAll: boolean;
  minTerrainClearance: number;
  minObstacleClearance: number;
}

function evalCubicBezier(
  p0: Point3D,
  p1: Point3D,
  p2: Point3D,
  p3: Point3D,
  t: number,
): Point3D {
  const u = 1 - t;
  const uu = u * u;
  const tt = t * t;
  const uuu = uu * u;
  const ttt = tt * t;
  return {
    x: uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x,
    y: uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y,
    z: uuu * p0.z + 3 * uu * t * p1.z + 3 * u * tt * p2.z + ttt * p3.z,
  };
}

export function computeCollisionFreeStreamTrajectory(
  params: StreamTrajectoryParams,
): StreamTrajectoryResult {
  const streamRadius = params.streamRadius ?? 0.025;
  const samples = Math.max(16, params.samples ?? 24);
  const { source, target, obstacles, terrainHeightFn, isInsideWaterFn } = params;

  // Ignore obstacles very close to source (pot pedestal & flanking rocks behind exit lip)
  const forwardDx = target.x - source.x;
  const forwardDz = target.z - source.z;
  const forwardLen = Math.hypot(forwardDx, forwardDz) || 1;
  const dirX = forwardDx / forwardLen;
  const dirZ = forwardDz / forwardLen;

  const relevantObstacles = obstacles.filter((obs) => {
    if (obs.kind !== 'rock' && obs.kind !== 'cobble' && obs.kind !== 'waterFeature') {
      return false;
    }
    const along = (obs.x - source.x) * dirX + (obs.z - source.z) * dirZ;
    // Ignore features behind or directly supporting the pot's rear collar
    return along > 0.24;
  });

  // Ensure landing sits cleanly in open water clear of submerged/shore rocks
  const landing: Point3D = { ...target };
  const landingBlocked = (lx: number, lz: number) => {
    if (!isInsideWaterFn({ x: lx, z: lz }, 0.22)) return true;
    for (const obs of relevantObstacles) {
      if (pointInRotatedEllipse(lx, lz, obs, streamRadius + 0.16)) {
        return true;
      }
    }
    return false;
  };

  if (landingBlocked(landing.x, landing.z)) {
    const candidateShifts = [0.18, 0.36, 0.54, 0.72];
    const lateralShifts = [0, 0.22, -0.22, 0.42, -0.42];
    const perpX = -dirZ;
    const perpZ = dirX;
    let found = false;
    for (const fwd of candidateShifts) {
      for (const lat of lateralShifts) {
        const cx = target.x + dirX * fwd + perpX * lat;
        const cz = target.z + dirZ * fwd + perpZ * lat;
        if (!landingBlocked(cx, cz)) {
          landing.x = cx;
          landing.z = cz;
          found = true;
          break;
        }
      }
      if (found) break;
    }
  }

  const evaluateProfile = (archBoost: number, reachBias: number): StreamTrajectoryResult => {
    const p0: Point3D = { ...source };
    const p3: Point3D = { ...landing };
    const spanX = p3.x - p0.x;
    const spanZ = p3.z - p0.z;

    const p1: Point3D = {
      x: p0.x + spanX * (0.36 + reachBias),
      y: p0.y - 0.03 + archBoost,
      z: p0.z + spanZ * (0.36 + reachBias),
    };
    const p2: Point3D = {
      x: p0.x + spanX * (0.78 + reachBias * 0.4),
      y: p3.y + (p0.y - p3.y) * 0.38 + archBoost * 0.75,
      z: p0.z + spanZ * (0.78 + reachBias * 0.4),
    };

    const sampledPoints: Point3D[] = [];
    let minTerrainClearance = Number.POSITIVE_INFINITY;
    let minObstacleClearance = Number.POSITIVE_INFINITY;
    let clearedAll = true;

    for (let i = 0; i <= samples; i++) {
      const t = i / samples;
      const pt = evalCubicBezier(p0, p1, p2, p3, t);
      sampledPoints.push(pt);

      // Skip source lip exit and final water entry immersion window
      if (t >= 0.1 && t <= 0.94) {
        const groundY = terrainHeightFn(pt.x, pt.z);
        const terrainGap = pt.y - streamRadius - groundY;
        minTerrainClearance = Math.min(minTerrainClearance, terrainGap);
        if (terrainGap < 0.045) {
          clearedAll = false;
        }

        for (const obs of relevantObstacles) {
          if (pointInRotatedEllipse(pt.x, pt.z, obs, streamRadius + 0.04)) {
            const obsTop = obs.topY ?? groundY + 0.18;
            const obsGap = pt.y - streamRadius - obsTop;
            minObstacleClearance = Math.min(minObstacleClearance, obsGap);
            if (obsGap < 0.035) {
              clearedAll = false;
            }
          }
        }
      }
    }

    if (!Number.isFinite(minTerrainClearance)) minTerrainClearance = 0.25;
    if (!Number.isFinite(minObstacleClearance)) minObstacleClearance = 0.5;

    return {
      controlPoints: [p0, p1, p2, p3],
      landing,
      sampledPoints,
      clearedAll,
      minTerrainClearance,
      minObstacleClearance,
    };
  };

  const profiles: Array<[number, number]> = [
    [0.02, 0.0],
    [0.08, 0.04],
    [0.14, 0.08],
    [0.22, 0.12],
    [0.32, 0.14],
  ];

  let best = evaluateProfile(profiles[0][0], profiles[0][1]);
  if (best.clearedAll) return best;

  for (let i = 1; i < profiles.length; i++) {
    const candidate = evaluateProfile(profiles[i][0], profiles[i][1]);
    if (candidate.clearedAll) return candidate;
    if (
      Math.min(candidate.minTerrainClearance, candidate.minObstacleClearance) >
      Math.min(best.minTerrainClearance, best.minObstacleClearance)
    ) {
      best = candidate;
    }
  }
  return best;
}
