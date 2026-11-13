import * as THREE from 'three/webgpu';
import {
  float,
  positionLocal,
  positionWorld,
  sin,
  smoothstep,
  uniform,
  vec3,
} from 'three/tsl';
import {
  SAKURA_CENTER,
  SHRINE_CENTER,
  WATERFALL_IMPACT_POINT,
  WATERFALL_SOURCE_POINT,
  getGroundMaterialWeights,
  isInsideNaturalPond,
  naturalPondNormalizedRadius,
  pondBedElevation,
  pondBoundaryPoint,
  sampleTerrain,
  shrinePathCenterX,
  signedDistanceToPond,
  terrainElevation,
  terrainNormalAt,
  type PointXZ,
} from './model';
import {
  PlacementRegistry,
  computeCollisionFreeStreamTrajectory,
  type FootprintKind,
} from './placement';
import {
  FloatUniform,
  createGroundTerraceMaterial,
  createMatteNodeMaterial,
  createMistSheetMaterial,
  createShoreStoneMaterial,
  createSunbeamMaterial,
  createTrickleStreamMaterial,
} from './materials';
import { getSubmergedStoneFootprints, sculptBoulderGeometry } from './water';
import type { PondQuality, PondTextureSuite } from './textures';

export interface GardenEnvironment {
  group: THREE.Group;
  update: (
    elapsed: number,
    dt: number,
    atmosphereFactor: number,
    onPetalTouchdown?: (x: number, z: number) => void,
    onWaterfallRipple?: (x: number, z: number) => void,
  ) => void;
  dispose: () => void;
}

interface DriftingPetal {
  mesh: THREE.Mesh;
  originX: number;
  originZ: number;
  x: number;
  y: number;
  z: number;
  fallSpeed: number;
  swayPhase: number;
  swayAmp: number;
  landedTimer: number;
  spawnedRipple: boolean;
}

interface DustMote {
  mesh: THREE.Mesh;
  baseX: number;
  baseY: number;
  baseZ: number;
  phase: number;
  speed: number;
}

interface TerrainHit {
  y: number;
  normal: THREE.Vector3;
  hit: boolean;
}

interface GroundedPlacement {
  y: number;
  minY: number;
  avgY: number;
  maxY: number;
  slope: number;
  normal: THREE.Vector3;
  tiltQuat: THREE.Quaternion;
}

interface TerrainGrounder {
  raycastSurface: (x: number, z: number) => TerrainHit;
  groundPropFootprint: (
    x: number,
    z: number,
    radius: number,
    maxTiltRad: number,
    embed: number,
  ) => GroundedPlacement;
  dispose: () => void;
}

function createTerrainGrounder(terrainMesh: THREE.Mesh): TerrainGrounder {
  terrainMesh.updateMatrixWorld(true);
  const raycaster = new THREE.Raycaster();
  const origin = new THREE.Vector3();
  const down = new THREE.Vector3(0, -1, 0);
  const up = new THREE.Vector3(0, 1, 0);
  const normalMatrix = new THREE.Matrix3().getNormalMatrix(terrainMesh.matrixWorld);

  // Partition terrain triangles into an 8x8 spatial grid over [-24, 24] so THREE.Raycaster
  // tests only ~200 local triangles per query instead of all 14,336 triangles.
  const GRID_N = 8;
  const MIN_C = -24;
  const MAX_C = 24;
  const CELL_SPAN = (MAX_C - MIN_C) / GRID_N;
  const buckets: number[][] = Array.from({ length: GRID_N * GRID_N }, () => []);
  const posAttr = terrainMesh.geometry.getAttribute('position');
  const indexAttr = terrainMesh.geometry.getIndex();

  if (posAttr && indexAttr) {
    const triCount = Math.floor(indexAttr.count / 3);
    for (let t = 0; t < triCount; t++) {
      const ia = indexAttr.getX(t * 3);
      const ib = indexAttr.getX(t * 3 + 1);
      const ic = indexAttr.getX(t * 3 + 2);
      const ax = posAttr.getX(ia);
      const az = posAttr.getZ(ia);
      const bx = posAttr.getX(ib);
      const bz = posAttr.getZ(ib);
      const cx = posAttr.getX(ic);
      const cz = posAttr.getZ(ic);

      const minX = Math.min(ax, bx, cx);
      const maxX = Math.max(ax, bx, cx);
      const minZ = Math.min(az, bz, cz);
      const maxZ = Math.max(az, bz, cz);

      if (maxX < MIN_C || minX > MAX_C || maxZ < MIN_C || minZ > MAX_C) continue;

      const gx0 = Math.max(0, Math.min(GRID_N - 1, Math.floor((minX - MIN_C) / CELL_SPAN)));
      const gx1 = Math.max(0, Math.min(GRID_N - 1, Math.floor((maxX - MIN_C) / CELL_SPAN)));
      const gz0 = Math.max(0, Math.min(GRID_N - 1, Math.floor((minZ - MIN_C) / CELL_SPAN)));
      const gz1 = Math.max(0, Math.min(GRID_N - 1, Math.floor((maxZ - MIN_C) / CELL_SPAN)));

      for (let gz = gz0; gz <= gz1; gz++) {
        for (let gx = gx0; gx <= gx1; gx++) {
          buckets[gz * GRID_N + gx].push(ia, ib, ic);
        }
      }
    }
  }

  const chunkGeos: THREE.BufferGeometry[] = [];
  const cellMeshes: Array<THREE.Mesh | null> = buckets.map((triIndices) => {
    if (triIndices.length === 0 || !posAttr) return null;
    const chunkGeo = new THREE.BufferGeometry();
    chunkGeo.setAttribute('position', posAttr);
    chunkGeo.setIndex(triIndices);
    chunkGeo.computeBoundingBox();
    chunkGeo.computeBoundingSphere();
    chunkGeos.push(chunkGeo);
    const chunkMesh = new THREE.Mesh(chunkGeo);
    chunkMesh.matrixWorld.copy(terrainMesh.matrixWorld);
    chunkMesh.matrixAutoUpdate = false;
    return chunkMesh;
  });

  const raycastSurface = (x: number, z: number): TerrainHit => {
    const gx = Math.floor((x - MIN_C) / CELL_SPAN);
    const gz = Math.floor((z - MIN_C) / CELL_SPAN);
    if (gx >= 0 && gx < GRID_N && gz >= 0 && gz < GRID_N) {
      const targetMesh = cellMeshes[gz * GRID_N + gx];
      if (targetMesh) {
        origin.set(x, 30, z);
        raycaster.set(origin, down);
        const hits = raycaster.intersectObject(targetMesh, false);
        if (hits.length > 0) {
          const h = hits[0];
          const n = h.face
            ? h.face.normal.clone().applyMatrix3(normalMatrix).normalize()
            : new THREE.Vector3(0, 1, 0);
          if (n.y < 0) n.negate();
          return { y: h.point.y, normal: n, hit: true };
        }
      }
    }
    const fallbackN = terrainNormalAt(x, z);
    return {
      y: terrainElevation(x, z),
      normal: new THREE.Vector3(fallbackN.x, fallbackN.y, fallbackN.z).normalize(),
      hit: false,
    };
  };

  const groundPropFootprint = (
    x: number,
    z: number,
    radius: number,
    maxTiltRad: number,
    embed: number,
  ): GroundedPlacement => {
    const r = Math.max(0.08, radius);
    const c = raycastSurface(x, z);
    const hL = raycastSurface(x - r, z);
    const hR = raycastSurface(x + r, z);
    const hD = raycastSurface(x, z - r);
    const hU = raycastSurface(x, z + r);

    const heights = [c.y, hL.y, hR.y, hD.y, hU.y];
    const minY = Math.min(...heights);
    const maxY = Math.max(...heights);
    const avgY = heights.reduce((acc, v) => acc + v, 0) / heights.length;

    const planeNormal = new THREE.Vector3(hL.y - hR.y, 2 * r, hD.y - hU.y).normalize();
    const rawAngle = up.angleTo(planeNormal);
    const clampedAngle = Math.min(Math.max(0, maxTiltRad), rawAngle);
    const tiltQuat = new THREE.Quaternion();
    if (rawAngle > 1e-4 && clampedAngle > 1e-4) {
      const axis = new THREE.Vector3().crossVectors(up, planeNormal).normalize();
      tiltQuat.setFromAxisAngle(axis, clampedAngle);
    }

    const slope = Math.max(0, (maxY - minY) / (2 * r));
    // Anchor between min rim & average height minus embed so downhill rims never float
    const anchorY = minY * 0.52 + avgY * 0.48 - embed;

    return {
      y: anchorY,
      minY,
      avgY,
      maxY,
      slope,
      normal: planeNormal,
      tiltQuat,
    };
  };

  return {
    raycastSurface,
    groundPropFootprint,
    dispose: () => {
      chunkGeos.forEach((g) => g.dispose());
    },
  };
}

function smoothstepScalar(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0 || 1)));
  return t * t * (3 - 2 * t);
}

interface BoulderExtents {
  maxRx: number;
  maxRz: number;
  minY: number;
  maxY: number;
}

function measureGeometryExtents(geo: THREE.BufferGeometry): BoulderExtents {
  const pos = geo.attributes.position;
  let maxRx = 0;
  let maxRz = 0;
  let minY = Number.POSITIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  for (let i = 0; i < pos.count; i++) {
    const x = Math.abs(pos.getX(i));
    const y = pos.getY(i);
    const z = Math.abs(pos.getZ(i));
    if (x > maxRx) maxRx = x;
    if (z > maxRz) maxRz = z;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  return {
    maxRx,
    maxRz,
    minY: Number.isFinite(minY) ? minY : -0.25,
    maxY: Number.isFinite(maxY) ? maxY : 0.25,
  };
}

function createFlaredTubeGeometry(
  curve: THREE.CatmullRomCurve3,
  segs: number,
  baseRadius: number,
  taperRatio: number,
  flareStrength: number,
  radialSegs = 9,
  flareHeightMeters = 0.72,
): THREE.BufferGeometry {
  const geo = new THREE.TubeGeometry(curve, segs, baseRadius, radialSegs, false);
  const pos = geo.attributes.position;
  const uvAttr = geo.attributes.uv;
  const totalLen = Math.max(0.5, curve.getLength());
  const flareZone = Math.min(0.45, Math.max(0.1, flareHeightMeters / totalLen));
  const v = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    const ringIdx = Math.floor(i / (radialSegs + 1));
    const t = Math.min(1, ringIdx / segs);
    const center = curve.getPointAt(t);
    const taper = 1 - t * taperRatio;
    const flare =
      t < flareZone && flareStrength > 0
        ? 1 + flareStrength * Math.pow(1 - t / flareZone, 1.8)
        : 1;
    v.fromBufferAttribute(pos, i)
      .sub(center)
      .multiplyScalar(taper * flare)
      .add(center);
    pos.setXYZ(i, v.x, v.y, v.z);
    uvAttr.setXY(i, uvAttr.getX(i) * 2.0, uvAttr.getY(i) * 4.0);
  }
  geo.computeVertexNormals();
  return geo;
}

/**
 * Generates a unified terrain-conforming root buttress flare collar in tree-local space
 * so every root rib swells directly out of the trunk and dives seamlessly beneath sloped soil.
 */
function createTerrainRootFlareGeometry(
  grounder: TerrainGrounder,
  worldOriginX: number,
  worldOriginY: number,
  worldOriginZ: number,
  yaw: number,
  worldScale: number,
  trunkRadius: number,
  flareScale: number,
  flareHeight: number,
  lobeCount: number,
  seed: number,
): THREE.BufferGeometry {
  const rings = 10;
  const radSegs = 28;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const cosY = Math.cos(yaw);
  const sinY = Math.sin(yaw);

  for (let r = 0; r <= rings; r++) {
    const s = r / rings; // 0 = trunk collar top, 1 = soil-buried outer root apron
    const sCurve = Math.pow(s, 1.48);
    for (let a = 0; a <= radSegs; a++) {
      const theta = (a / radSegs) * Math.PI * 2;
      const rootWave = Math.pow(
        0.5 +
          0.5 * Math.cos(lobeCount * theta + seed + Math.sin(theta * 2 + seed) * 0.42),
        2.3,
      );
      const radialRadius =
        trunkRadius * (0.94 + sCurve * (flareScale * (0.04 + rootWave * 1.15)));

      const lx = Math.cos(theta) * radialRadius;
      const lz = Math.sin(theta) * radialRadius;
      // Mirror Three.js Group transform (scale -> rotY -> translate)
      const wx = worldOriginX + (lx * cosY + lz * sinY) * worldScale;
      const wz = worldOriginZ + (-lx * sinY + lz * cosY) * worldScale;
      const groundWorldY = grounder.raycastSurface(wx, wz).y;
      const localGroundY = (groundWorldY - worldOriginY) / worldScale;

      const buttressCrown = rootWave * Math.sin(s * Math.PI) * flareHeight * 0.42;
      const soilEmbedDip = smoothstepScalar(0.68, 1.0, s) * 0.14;
      const baseSlopeY = flareHeight * (1 - s) + localGroundY * s;
      const ly = Math.max(
        localGroundY - 0.16,
        baseSlopeY + buttressCrown - soilEmbedDip,
      );

      positions.push(lx, ly, lz);
      uvs.push(s * 0.9, (a / radSegs) * 2.5);
    }
  }

  const stride = radSegs + 1;
  for (let r = 0; r < rings; r++) {
    for (let a = 0; a < radSegs; a++) {
      const i0 = r * stride + a;
      const i1 = r * stride + (a + 1);
      const i2 = (r + 1) * stride + a;
      const i3 = (r + 1) * stride + (a + 1);
      indices.push(i0, i1, i2);
      indices.push(i1, i3, i2);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

/**
 * Builds a tapered organic water tube along a CubicBezierCurve3 with slight elliptical
 * cross-section flattening and accelerating stream taper.
 */
function createTaperedStreamGeometry(
  curve: THREE.Curve<THREE.Vector3>,
  segs: number,
  radiusStart: number,
  radiusEnd: number,
  radialSegs = 10,
): THREE.BufferGeometry {
  const geo = new THREE.TubeGeometry(curve, segs, 1, radialSegs, false);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    const ringIdx = Math.floor(i / (radialSegs + 1));
    const t = Math.min(1, ringIdx / segs);
    const center = curve.getPointAt(t);
    // Gentle pinch just past lip, slight ribbon spread mid-flight, cohesive plunge
    const r = radiusStart * (1 - t) + radiusEnd * t + Math.sin(t * Math.PI) * 0.002;
    v.fromBufferAttribute(pos, i).sub(center);
    v.x *= r * 1.18;
    v.y *= r * 0.88;
    v.z *= r * 1.18;
    v.add(center);
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

function createNaturalBankStones(
  textures: PondTextureSuite,
  grounder: TerrainGrounder,
  registry: PlacementRegistry,
): {
  group: THREE.Group;
  dispose: () => void;
} {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];
  const shoreMat = createShoreStoneMaterial(textures);
  disposables.push(shoreMat);

  const boulderPrototypes = [0, 1, 2, 3, 4].map((seed) => {
    const geo = sculptBoulderGeometry(0.46, 2, seed * 2.37 + 0.8);
    disposables.push(geo);
    return { geo, extents: measureGeometryExtents(geo) };
  });

  // Art-directed shoreline rock clusters:
  // - Richer layered foreground outcrops (bottom & lower-right)
  // - Calmer, slightly lower left bank under editorial headline
  // - Clean unobstructed inlet channel in front of Tsukubai stream (z in [-0.25 .. 1.15])
  const rockClusters: Array<{ angle: number; stones: Array<[number, number, number, number, number]> }> = [
    // Foreground left layered cove boulders stepping into shallow water
    {
      angle: Math.PI * 0.67,
      stones: [
        [0, 1.01, 1.44, 0.54, 1.12],
        [0.12, 1.06, 1.08, 0.4, 0.9],
        [-0.14, 0.98, 0.9, 0.32, 0.76],
        [0.24, 1.03, 0.7, 0.26, 0.62],
      ],
    },
    // Mid-left shoreline boulders bordering the stepping-stone path (restrained height)
    {
      angle: Math.PI * 0.92,
      stones: [
        [0, 1.02, 1.28, 0.44, 1.02],
        [0.14, 1.06, 0.9, 0.34, 0.8],
        [-0.17, 1.0, 0.72, 0.28, 0.64],
      ],
    },
    // Upper-left pond cove rocks
    {
      angle: -Math.PI * 0.78,
      stones: [
        [0, 1.03, 1.26, 0.46, 0.94],
        [0.16, 1.05, 0.84, 0.32, 0.72],
        [-0.18, 0.99, 0.66, 0.26, 0.6],
      ],
    },
    // North-west shoulder stones softening back pond transition
    {
      angle: -Math.PI * 0.58,
      stones: [
        [0, 1.04, 1.24, 0.42, 0.92],
        [0.14, 1.07, 0.88, 0.32, 0.74],
      ],
    },
    // Far north cove rocks beneath bamboo ridge
    {
      angle: -Math.PI * 0.44,
      stones: [
        [0, 1.03, 1.38, 0.46, 0.98],
        [0.16, 1.06, 0.9, 0.34, 0.76],
        [-0.17, 1.01, 0.72, 0.28, 0.62],
      ],
    },
    // North-east shoulder stones bridging to sakura cove
    {
      angle: -Math.PI * 0.32,
      stones: [
        [0, 1.04, 1.26, 0.44, 0.94],
        [-0.13, 1.07, 0.84, 0.32, 0.72],
      ],
    },
    // Upper-right mossy bank under sakura overhang (safely north of Tsukubai cove)
    {
      angle: -Math.PI * 0.21,
      stones: [
        [0, 1.04, 1.3, 0.5, 0.98],
        [-0.14, 1.02, 0.86, 0.36, 0.76],
        [0.1, 1.07, 0.74, 0.3, 0.64],
      ],
    },
    // Mid-right shoreline outcrop clearly south of Tsukubai water stream channel
    {
      angle: Math.PI * 0.19,
      stones: [
        [0.02, 1.03, 1.2, 0.5, 0.96],
        [-0.08, 1.04, 0.82, 0.35, 0.72],
        [0.14, 1.02, 0.72, 0.3, 0.64],
      ],
    },
    // Lower-right / center foreground framing boulders beside pebble beach
    {
      angle: Math.PI * 0.43,
      stones: [
        [0, 1.01, 1.42, 0.38, 1.04],
        [0.14, 1.04, 0.86, 0.29, 0.72],
        [-0.16, 0.98, 0.66, 0.23, 0.56],
      ],
    },
  ];

  const dummyAxis = new THREE.Vector3();
  const baseQuat = new THREE.Quaternion();
  const baseEuler = new THREE.Euler();

  let stoneIndex = 0;
  rockClusters.forEach((cluster) => {
    cluster.stones.forEach(([dAngle, radScale, sx, sy, sz]) => {
      const idx = stoneIndex++;
      const angle = cluster.angle + dAngle;
      const pt = pondBoundaryPoint(angle, radScale);
      const proto = boulderPrototypes[idx % boulderPrototypes.length];
      const footprintRadius = 0.56 * Math.max(sx, sz);
      const isWaterSide = naturalPondNormalizedRadius(pt) < 1.0;

      const mesh = new THREE.Mesh(proto.geo, shoreMat);
      const yaw = -angle + 0.45 * Math.cos(idx * 2.3);
      const grounded = grounder.groundPropFootprint(
        pt.x,
        pt.z,
        footprintRadius * 0.65,
        0.2,
        0.04,
      );
      const supportY = isWaterSide
        ? Math.min(grounded.minY, pondBedElevation(pt.x, pt.z))
        : grounded.minY;
      // Guarantee lowest displaced underside sits strictly beneath downhill rim
      const safeAnchorY = Math.min(
        grounded.y,
        supportY - proto.extents.minY * sy - 0.032,
      );

      mesh.position.set(pt.x, safeAnchorY, pt.z);
      baseEuler.set(0.05 * Math.sin(idx * 1.9), yaw, 0.04 * Math.cos(idx * 2.1));
      baseQuat.setFromEuler(baseEuler);
      mesh.quaternion.copy(grounded.tiltQuat).multiply(baseQuat);

      mesh.scale.set(sx, sy, sz);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);

      registry.register({
        id: `shore-boulder-${idx}`,
        kind: 'rock',
        x: pt.x,
        z: pt.z,
        rx: proto.extents.maxRx * sx,
        rz: proto.extents.maxRz * sz,
        yaw,
        margin: 0.1,
        baseY: mesh.position.y + proto.extents.minY * sy,
        topY: mesh.position.y + proto.extents.maxY * sy,
      });
    });
  });

  // Low wet shoreline cobbles softening bank-to-water transitions (keeping stream channel clear)
  const cobbleCount = 36;
  for (let i = 0; i < cobbleCount; i++) {
    const angle = (i / cobbleCount) * Math.PI * 2 + 0.09 * Math.sin(i * 4.3);
    const pt = pondBoundaryPoint(angle, 0.97 + (i % 3) * 0.03);

    // Keep the waterfall inlet opening unobstructed
    const dStream = Math.hypot(
      pt.x - (WATERFALL_SOURCE_POINT.x + WATERFALL_IMPACT_POINT.x) * 0.5,
      pt.z - (WATERFALL_SOURCE_POINT.z + WATERFALL_IMPACT_POINT.z) * 0.5,
    );
    if (dStream < 0.85) continue;

    const proto = boulderPrototypes[(i + 2) % boulderPrototypes.length];
    const mesh = new THREE.Mesh(proto.geo, shoreMat);
    const s = 0.24 + (i % 4) * 0.07;
    const csx = s * 1.25;
    const csy = s * 0.42;
    const csz = s * 0.94;
    const isWaterSide = naturalPondNormalizedRadius(pt) < 1.0;
    const yaw = i * 1.35;
    const grounded = grounder.groundPropFootprint(pt.x, pt.z, s * 0.45, 0.22, s * 0.12);
    const supportY = isWaterSide
      ? Math.min(grounded.minY, pondBedElevation(pt.x, pt.z))
      : grounded.minY;
    const safeY = Math.min(grounded.y, supportY - proto.extents.minY * csy - 0.015);

    mesh.position.set(pt.x, safeY, pt.z);
    baseEuler.set(0.05 * Math.sin(i), yaw, 0.04 * Math.cos(i));
    baseQuat.setFromEuler(baseEuler);
    mesh.quaternion.copy(grounded.tiltQuat).multiply(baseQuat);

    mesh.scale.set(csx, csy, csz);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    registry.register({
      id: `shore-cobble-${i}`,
      kind: 'cobble',
      x: pt.x,
      z: pt.z,
      rx: proto.extents.maxRx * csx,
      rz: proto.extents.maxRz * csz,
      yaw,
      margin: 0.06,
      baseY: mesh.position.y + proto.extents.minY * csy,
      topY: mesh.position.y + proto.extents.maxY * csy,
    });
  }

  void dummyAxis;
  return {
    group,
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}

function createSakuraTree(
  textures: PondTextureSuite,
  elapsedUniform: FloatUniform,
  quality: PondQuality,
  grounder: TerrainGrounder,
  registry: PlacementRegistry,
): {
  group: THREE.Group;
  dispose: () => void;
} {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  const treeScale = 1.18;
  const treeYaw = -0.08;
  const baseHit = grounder.raycastSurface(SAKURA_CENTER.x, SAKURA_CENTER.z);
  group.position.set(SAKURA_CENTER.x, baseHit.y, SAKURA_CENTER.z);
  group.scale.setScalar(treeScale);
  group.rotation.y = treeYaw;
  group.updateMatrixWorld(true);

  // Measure lowest downhill rim around the trunk footprint so base penetrates well below grade
  let minAroundY = baseHit.y;
  for (let s = 0; s < 8; s++) {
    const a = (s / 8) * Math.PI * 2;
    const h = grounder.raycastSurface(
      SAKURA_CENTER.x + Math.cos(a) * 0.55,
      SAKURA_CENTER.z + Math.sin(a) * 0.55,
    ).y;
    if (h < minAroundY) minAroundY = h;
  }
  const minLocalY = (minAroundY - baseHit.y) / treeScale;
  const trunkBottomLocalY = Math.min(-0.62, minLocalY - 0.34);

  const barkMat = new THREE.MeshStandardNodeMaterial({
    map: textures.barkAlbedo,
    normalMap: textures.barkNormal,
    normalScale: new THREE.Vector2(1.25, 1.25),
    roughness: 0.9,
    metalness: 0.02,
  });
  disposables.push(barkMat);

  // Main trunk deeply embedded past lowest bank rim + organic flared collar, plus sweeping sakura boughs
  const branchSpecs: Array<{
    pts: [number, number, number][];
    r: number;
    segs: number;
    taper: number;
    flare: number;
  }> = [
    {
      pts: [
        [0.08, trunkBottomLocalY, 0.06],
        [0.11, -0.04, 0.08],
        [0.05, 0.35, 0.07],
        [-0.08, 0.98, 0.02],
        [-0.38, 1.85, -0.08],
        [-0.86, 2.75, 0.06],
      ],
      r: 0.23,
      segs: 26,
      taper: 0.58,
      flare: 0.24,
    },
    {
      pts: [
        [-0.36, 1.78, -0.06],
        [-1.12, 2.52, 0.18],
        [-1.95, 3.05, 0.34],
        [-2.58, 3.25, 0.22],
      ],
      r: 0.125,
      segs: 16,
      taper: 0.65,
      flare: 0,
    },
    {
      pts: [
        [-0.65, 2.38, 0.02],
        [-1.08, 3.28, -0.18],
        [-1.56, 3.92, -0.08],
        [-1.98, 4.18, 0.12],
      ],
      r: 0.095,
      segs: 14,
      taper: 0.65,
      flare: 0,
    },
    {
      pts: [
        [-0.22, 1.48, -0.02],
        [0.42, 2.28, 0.36],
        [0.95, 2.86, 0.56],
        [1.26, 3.12, 0.42],
      ],
      r: 0.105,
      segs: 14,
      taper: 0.65,
      flare: 0,
    },
    {
      pts: [
        [-0.95, 2.36, 0.14],
        [-1.52, 2.48, 0.62],
        [-2.04, 2.36, 0.88],
      ],
      r: 0.062,
      segs: 12,
      taper: 0.68,
      flare: 0,
    },
    {
      pts: [
        [-0.48, 2.08, -0.05],
        [-0.12, 2.95, -0.62],
        [0.34, 3.56, -0.92],
      ],
      r: 0.084,
      segs: 12,
      taper: 0.66,
      flare: 0,
    },
    {
      pts: [
        [-1.58, 2.82, 0.26],
        [-1.92, 3.45, 0.02],
        [-2.28, 3.68, -0.22],
      ],
      r: 0.048,
      segs: 10,
      taper: 0.7,
      flare: 0,
    },
  ];

  branchSpecs.forEach((spec) => {
    const curve = new THREE.CatmullRomCurve3(
      spec.pts.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
    );
    const tubeGeo = createFlaredTubeGeometry(
      curve,
      spec.segs,
      spec.r,
      spec.taper,
      spec.flare,
      9,
      spec.flare > 0 ? 0.42 : 0.72,
    );
    const mesh = new THREE.Mesh(tubeGeo, barkMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    disposables.push(tubeGeo);
  });

  // Unified terrain-conforming root buttress collar directly integrated into the main trunk bark
  const rootOriginLocal = new THREE.Vector3(0.09, 0.0, 0.07);
  const rootOriginWorld = rootOriginLocal.clone().applyMatrix4(group.matrixWorld);
  const flareCollarGeo = createTerrainRootFlareGeometry(
    grounder,
    rootOriginWorld.x,
    baseHit.y,
    rootOriginWorld.z,
    treeYaw,
    treeScale,
    0.225,
    0.68,
    0.42,
    5,
    1.15,
  );
  const flareCollarMesh = new THREE.Mesh(flareCollarGeo, barkMat);
  flareCollarMesh.position.set(rootOriginLocal.x, 0, rootOriginLocal.z);
  flareCollarMesh.castShadow = true;
  flareCollarMesh.receiveShadow = true;
  group.add(flareCollarMesh);
  disposables.push(flareCollarGeo);

  // Asymmetric irregular velvet moss creeping into root valleys at soil contact
  const rootMossMat = new THREE.MeshStandardNodeMaterial({
    map: textures.mossAlbedo,
    normalMap: textures.mossNormal,
    roughness: 0.96,
    metalness: 0.0,
    color: 0x44582a,
  });
  const rootMossGeo = new THREE.SphereGeometry(0.18, 12, 8);
  const rmPos = rootMossGeo.attributes.position;
  for (let i = 0; i < rmPos.count; i++) {
    const vx = rmPos.getX(i);
    const vy = rmPos.getY(i);
    const vz = rmPos.getZ(i);
    const ang = Math.atan2(vz, vx);
    const lobe = 1 + 0.24 * Math.sin(ang * 3 + 0.5) + 0.14 * Math.cos(ang * 2 - 0.8);
    rmPos.setXYZ(i, vx * lobe * 1.15, vy * 0.22, vz * lobe * 0.78);
  }
  rootMossGeo.computeVertexNormals();
  disposables.push(rootMossMat, rootMossGeo);
  for (let m = 0; m < 4; m++) {
    const ang = m * 1.55 + 0.92;
    const dist = 0.29 + (m % 2) * 0.06;
    const wx = rootOriginWorld.x + Math.cos(ang) * dist;
    const wz = rootOriginWorld.z + Math.sin(ang) * dist;
    const gm = grounder.groundPropFootprint(wx, wz, 0.18, 0.34, 0.03);
    const localM = new THREE.Vector3(wx, Math.min(gm.y, gm.minY - 0.025), wz);
    group.worldToLocal(localM);
    const pillow = new THREE.Mesh(rootMossGeo, rootMossMat);
    pillow.position.copy(localM);
    pillow.rotation.y = ang + 0.4;
    pillow.scale.setScalar(0.76 + (m % 2) * 0.22);
    pillow.receiveShadow = true;
    group.add(pillow);
  }

  // Register full sakura trunk & root flare footprint so grass clears cleanly around roots
  registry.register({
    id: 'sakura-trunk',
    kind: 'tree',
    x: rootOriginWorld.x,
    z: rootOriginWorld.z,
    rx: 0.78,
    rz: 0.78,
    margin: 0.16,
  });

  // Soft rounded blossom cores + delicate cherry blossom spray cards
  const puffGeo = new THREE.SphereGeometry(0.11, 8, 6);
  const puffPos = puffGeo.attributes.position;
  const pv = new THREE.Vector3();
  for (let i = 0; i < puffPos.count; i++) {
    pv.fromBufferAttribute(puffPos, i);
    pv.y *= 0.72;
    puffPos.setXYZ(i, pv.x, pv.y, pv.z);
  }
  puffGeo.computeVertexNormals();

  const blossomMat = new THREE.MeshStandardNodeMaterial({
    color: 0xffffff,
    roughness: 0.74,
    metalness: 0.0,
    transparent: true,
    opacity: 0.88,
  });
  const windSway = sin(
    elapsedUniform.mul(1.02).add(positionWorld.x.mul(1.2)).add(positionWorld.z.mul(0.9)),
  )
    .mul(0.026)
    .mul(smoothstep(1.2, 3.8, positionWorld.y));
  blossomMat.positionNode = positionLocal.add(vec3(windSway, windSway.mul(0.35), windSway.mul(0.5)));
  blossomMat.emissive.setHex(0x633b42);
  blossomMat.emissiveIntensity = 0.32;

  const petalSprigGeo = new THREE.PlaneGeometry(0.56, 0.56);
  const petalSprigMat = new THREE.MeshStandardNodeMaterial({
    map: textures.blossomMap,
    alphaTest: 0.28,
    roughness: 0.66,
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  petalSprigMat.positionNode = positionLocal.add(
    vec3(windSway, windSway.mul(0.35), windSway.mul(0.5)),
  );
  petalSprigMat.emissive.setHex(0x633b42);
  petalSprigMat.emissiveIntensity = 0.28;

  disposables.push(puffGeo, blossomMat, petalSprigGeo, petalSprigMat);

  const boughAnchors: Array<[number, number, number, number]> = [
    [-2.52, 3.24, 0.2, 1.1],
    [-2.12, 3.08, 0.32, 1.15],
    [-1.78, 2.94, 0.24, 1.08],
    [-1.36, 2.66, 0.22, 1.12],
    [-1.98, 2.38, 0.84, 0.96],
    [-1.48, 2.5, 0.6, 1.02],
    [-1.94, 4.12, 0.12, 1.08],
    [-1.54, 3.88, -0.06, 1.14],
    [-1.12, 3.36, -0.14, 1.12],
    [-2.24, 3.64, -0.2, 1.0],
    [-0.78, 2.86, 0.08, 1.08],
    [-0.42, 3.18, -0.18, 1.04],
    [0.06, 3.48, -0.58, 1.06],
    [0.34, 3.52, -0.88, 0.98],
    [0.44, 2.38, 0.34, 1.02],
    [0.9, 2.84, 0.54, 1.08],
    [1.22, 3.1, 0.4, 1.02],
    [-0.95, 2.58, -0.35, 0.94],
    [-0.18, 2.55, 0.28, 0.98],
    [0.64, 3.05, 0.04, 1.04],
    [-1.72, 3.38, 0.46, 0.96],
    [-2.35, 2.82, 0.58, 0.92],
  ];

  const subOffsets: Array<[number, number, number, number]> =
    quality === 'desktop'
      ? [
          [0, 0, 0, 0.96],
          [0.16, 0.09, -0.09, 0.78],
          [-0.14, -0.05, 0.11, 0.74],
        ]
      : [
          [0, 0, 0, 0.95],
          [0.14, 0.08, -0.08, 0.76],
        ];

  const puffInst = new THREE.InstancedMesh(
    puffGeo,
    blossomMat,
    boughAnchors.length * subOffsets.length,
  );
  puffInst.castShadow = true;

  const sprigsPerAnchor = quality === 'desktop' ? 6 : 4;
  const sprigInst = new THREE.InstancedMesh(
    petalSprigGeo,
    petalSprigMat,
    boughAnchors.length * sprigsPerAnchor,
  );

  const dummy = new THREE.Object3D();
  const cTint = new THREE.Color();
  const paletteShades = [0xf8dce3, 0xf1cbd5, 0xfff0f4, 0xeab9c6];

  let pIdx = 0;
  let sIdx = 0;
  boughAnchors.forEach(([ax, ay, az, ascale], bIdx) => {
    subOffsets.forEach(([ox, oy, oz, os], k) => {
      dummy.position.set(ax + ox * ascale, ay + oy * ascale, az + oz * ascale);
      dummy.rotation.set(pIdx * 0.7, pIdx * 1.1, pIdx * 0.4);
      const sc = ascale * os;
      dummy.scale.set(sc * 1.12, sc * 0.82, sc * 1.04);
      dummy.updateMatrix();
      puffInst.setMatrixAt(pIdx, dummy.matrix);
      cTint.setHex(paletteShades[(bIdx + k) % paletteShades.length]);
      puffInst.setColorAt(pIdx, cTint);
      pIdx++;
    });

    for (let m = 0; m < sprigsPerAnchor; m++) {
      const ang = (m / sprigsPerAnchor) * Math.PI * 2 + bIdx * 0.65;
      const rad = (0.08 + (m % 3) * 0.12) * ascale;
      dummy.position.set(
        ax + Math.cos(ang) * rad,
        ay + ((m % 3) - 1) * 0.09 * ascale,
        az + Math.sin(ang) * rad,
      );
      dummy.rotation.set(
        0.52 * Math.sin(bIdx + m * 1.3),
        bIdx * 1.15 + m * 1.05,
        0.42 * Math.cos(bIdx + m),
      );
      dummy.scale.setScalar(ascale * (1.05 + (m % 3) * 0.16));
      dummy.updateMatrix();
      sprigInst.setMatrixAt(sIdx, dummy.matrix);
      cTint.setHex(paletteShades[(bIdx + m) % paletteShades.length]);
      sprigInst.setColorAt(sIdx, cTint);
      sIdx++;
    }
  });

  puffInst.instanceMatrix.needsUpdate = true;
  if (puffInst.instanceColor) puffInst.instanceColor.needsUpdate = true;
  puffInst.computeBoundingSphere();
  sprigInst.instanceMatrix.needsUpdate = true;
  if (sprigInst.instanceColor) sprigInst.instanceColor.needsUpdate = true;
  sprigInst.computeBoundingSphere();
  group.add(puffInst, sprigInst);

  // Individually terrain-raycasted root-collar accent stones cradling the flared cherry roots
  const collarMat = createShoreStoneMaterial(textures);
  const collarGeo = sculptBoulderGeometry(0.24, 1, 7.7);
  const collarExtents = measureGeometryExtents(collarGeo);
  const collarSpecs: Array<[number, number, number, number, number]> = [
    [-0.44, 0.36, 1.05, 0.56, 0.88],
    [0.52, 0.28, 0.92, 0.48, 0.82],
    [-0.1, -0.54, 0.96, 0.52, 0.92],
  ];
  collarSpecs.forEach(([cx, cz, sx, sy, sz], idx) => {
    const worldPt = new THREE.Vector3(cx, 0, cz).applyMatrix4(group.matrixWorld);
    const grounded = grounder.groundPropFootprint(worldPt.x, worldPt.z, 0.25 * sx, 0.18, 0.03);
    const safeWorldY = Math.min(grounded.y, grounded.minY - collarExtents.minY * sy * treeScale - 0.02);
    const localAnchor = new THREE.Vector3(worldPt.x, safeWorldY, worldPt.z);
    group.worldToLocal(localAnchor);

    const stone = new THREE.Mesh(collarGeo, collarMat);
    stone.position.set(cx, localAnchor.y, cz);
    stone.rotation.set(0.05 * Math.sin(idx), idx * 1.4, 0.05 * Math.cos(idx));
    stone.scale.set(sx, sy, sz);
    stone.castShadow = true;
    stone.receiveShadow = true;
    group.add(stone);

    registry.register({
      id: `sakura-collar-${idx}`,
      kind: 'rock',
      x: worldPt.x,
      z: worldPt.z,
      rx: collarExtents.maxRx * sx * treeScale,
      rz: collarExtents.maxRz * sz * treeScale,
      yaw: idx * 1.4 + treeYaw,
      margin: 0.08,
      baseY: safeWorldY + collarExtents.minY * sy * treeScale,
      topY: safeWorldY + collarExtents.maxY * sy * treeScale,
    });
  });
  disposables.push(collarGeo, collarMat);

  return {
    group,
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}

function createShrineHall(
  textures: PondTextureSuite,
  grounder: TerrainGrounder,
  registry: PlacementRegistry,
): {
  group: THREE.Group;
  dispose: () => void;
} {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  const shrineYaw = 0.22;
  const grounded = grounder.groundPropFootprint(SHRINE_CENTER.x, SHRINE_CENTER.z, 1.35, 0.02, 0.04);
  group.position.set(SHRINE_CENTER.x, grounded.y, SHRINE_CENTER.z);
  group.rotation.y = shrineYaw;
  group.updateMatrixWorld(true);

  const plinthMat = new THREE.MeshStandardNodeMaterial({
    map: textures.stoneAlbedo,
    normalMap: textures.stoneNormal,
    roughness: 0.86,
    metalness: 0.02,
    color: 0xb5ad98,
  });
  const agedTimberMat = new THREE.MeshStandardNodeMaterial({
    map: textures.woodAlbedo,
    normalMap: textures.woodNormal,
    roughness: 0.76,
    metalness: 0.03,
    color: 0x8b755d,
  });
  const darkTimberMat = new THREE.MeshStandardNodeMaterial({
    map: textures.woodAlbedo,
    normalMap: textures.woodNormal,
    roughness: 0.8,
    metalness: 0.03,
    color: 0x625242,
  });
  const shojiMat = new THREE.MeshStandardNodeMaterial({
    color: 0xd6c09d,
    emissive: 0xe3a85f,
    emissiveIntensity: 0.34,
    roughness: 0.72,
  });
  const roofMat = new THREE.MeshStandardNodeMaterial({
    map: textures.roofAlbedo,
    normalMap: textures.roofNormal,
    normalScale: new THREE.Vector2(1.2, 1.2),
    roughness: 0.62,
    metalness: 0.06,
    color: 0x7a7162,
  });
  disposables.push(plinthMat, agedTimberMat, darkTimberMat, shojiMat, roofMat);

  // Stone foundation masonry retaining wall extended downward (-0.64m) so sloped outer edges stay sealed
  const plinthGeo = new THREE.BoxGeometry(2.68, 0.96, 2.08);
  const plinth = new THREE.Mesh(plinthGeo, plinthMat);
  plinth.position.set(0, -0.17, 0);
  plinth.receiveShadow = true;
  plinth.castShadow = true;

  const stepLowerGeo = new THREE.BoxGeometry(1.18, 0.3, 0.44);
  const stepLower = new THREE.Mesh(stepLowerGeo, plinthMat);
  stepLower.position.set(0, -0.02, 1.24);
  stepLower.receiveShadow = true;
  stepLower.castShadow = true;

  const stepUpperGeo = new THREE.BoxGeometry(1.04, 0.16, 0.34);
  const stepUpper = new THREE.Mesh(stepUpperGeo, plinthMat);
  stepUpper.position.set(0, 0.18, 1.05);
  stepUpper.receiveShadow = true;
  stepUpper.castShadow = true;

  // Granite skirting stones grounded cleanly along approach stairs
  const skirtGeo = sculptBoulderGeometry(0.24, 1, 5.4);
  [
    [-0.92, 1.18, 0],
    [0.92, 1.18, 1.3],
  ].forEach(([lx, lz, rotY]) => {
    const worldPt = new THREE.Vector3(lx, 0, lz).applyMatrix4(group.matrixWorld);
    const sg = grounder.groundPropFootprint(worldPt.x, worldPt.z, 0.26, 0.14, 0.08);
    const localPos = new THREE.Vector3(worldPt.x, sg.y, worldPt.z);
    group.worldToLocal(localPos);

    const skirt = new THREE.Mesh(skirtGeo, plinthMat);
    skirt.position.set(lx, localPos.y, lz);
    skirt.rotation.y = rotY;
    skirt.scale.set(1.25, 0.55, 0.95);
    skirt.receiveShadow = true;
    skirt.castShadow = true;
    group.add(skirt);
  });
  disposables.push(skirtGeo);

  const verandaGeo = new THREE.BoxGeometry(2.42, 0.12, 1.84);
  const veranda = new THREE.Mesh(verandaGeo, agedTimberMat);
  veranda.position.set(0, 0.37, 0);
  veranda.receiveShadow = true;
  veranda.castShadow = true;

  const railGeo = new THREE.BoxGeometry(0.055, 0.055, 1.72);
  const railL = new THREE.Mesh(railGeo, darkTimberMat);
  railL.position.set(-1.14, 0.64, 0);
  const railR = new THREE.Mesh(railGeo, darkTimberMat);
  railR.position.set(1.14, 0.64, 0);

  const bodyGeo = new THREE.BoxGeometry(1.86, 1.12, 1.28);
  const body = new THREE.Mesh(bodyGeo, darkTimberMat);
  body.position.set(0, 0.98, -0.06);
  body.castShadow = true;
  body.receiveShadow = true;

  const doorGeo = new THREE.BoxGeometry(0.72, 0.86, 0.05);
  const shojiDoor = new THREE.Mesh(doorGeo, shojiMat);
  shojiDoor.position.set(0, 0.86, 0.565);

  const mullionGeo = new THREE.BoxGeometry(0.028, 0.86, 0.068);
  [-0.22, 0, 0.22].forEach((mx) => {
    const mullion = new THREE.Mesh(mullionGeo, darkTimberMat);
    mullion.position.set(mx, 0.86, 0.575);
    group.add(mullion);
  });

  const postGeo = new THREE.BoxGeometry(0.105, 1.24, 0.105);
  const postCoords: Array<[number, number]> = [
    [-0.94, 0.62],
    [-0.44, 0.62],
    [0.44, 0.62],
    [0.94, 0.62],
    [-0.94, -0.72],
    [0.94, -0.72],
    [-1.12, 0.84],
    [1.12, 0.84],
  ];
  postCoords.forEach(([px, pz]) => {
    const post = new THREE.Mesh(postGeo, agedTimberMat);
    post.position.set(px, 0.98, pz);
    post.castShadow = true;
    post.receiveShadow = true;
    group.add(post);
  });

  const beamGeo = new THREE.BoxGeometry(2.38, 0.11, 1.66);
  const beam = new THREE.Mesh(beamGeo, darkTimberMat);
  beam.position.set(0, 1.56, 0.04);
  beam.castShadow = true;

  const roofShape = new THREE.Shape();
  roofShape.moveTo(-1.38, 0);
  roofShape.quadraticCurveTo(-0.66, 0.34, 0, 0.88);
  roofShape.quadraticCurveTo(0.66, 0.34, 1.38, 0);
  roofShape.lineTo(1.28, -0.09);
  roofShape.quadraticCurveTo(0.58, 0.24, 0, 0.74);
  roofShape.quadraticCurveTo(-0.58, 0.24, -1.28, -0.09);
  roofShape.closePath();

  const roofGeo = new THREE.ExtrudeGeometry(roofShape, {
    depth: 3.16,
    bevelEnabled: true,
    bevelThickness: 0.025,
    bevelSize: 0.025,
    bevelSegments: 2,
  });
  roofGeo.center();
  roofGeo.rotateY(Math.PI / 2);

  const roof = new THREE.Mesh(roofGeo, roofMat);
  roof.position.set(0, 1.96, -0.04);
  roof.castShadow = true;
  roof.receiveShadow = true;

  const gableShape = new THREE.Shape();
  gableShape.moveTo(-0.74, 0);
  gableShape.quadraticCurveTo(-0.34, 0.16, 0, 0.44);
  gableShape.quadraticCurveTo(0.34, 0.16, 0.74, 0);
  gableShape.lineTo(0.66, -0.06);
  gableShape.quadraticCurveTo(0.28, 0.11, 0, 0.34);
  gableShape.quadraticCurveTo(-0.28, 0.11, -0.66, -0.06);
  gableShape.closePath();
  const gableGeo = new THREE.ExtrudeGeometry(gableShape, {
    depth: 0.92,
    bevelEnabled: false,
  });
  gableGeo.center();
  const frontGable = new THREE.Mesh(gableGeo, roofMat);
  frontGable.position.set(0, 1.72, 0.74);
  frontGable.castShadow = true;

  const ridgeGeo = new THREE.BoxGeometry(3.26, 0.11, 0.15);
  const ridge = new THREE.Mesh(ridgeGeo, darkTimberMat);
  ridge.position.set(0, 2.41, -0.04);
  ridge.castShadow = true;

  const finialGeo = new THREE.BoxGeometry(0.16, 0.14, 0.18);
  const capL = new THREE.Mesh(finialGeo, agedTimberMat);
  capL.position.set(-1.62, 2.44, -0.04);
  const capR = new THREE.Mesh(finialGeo, agedTimberMat);
  capR.position.set(1.62, 2.44, -0.04);

  group.add(
    plinth,
    stepLower,
    stepUpper,
    veranda,
    railL,
    railR,
    body,
    shojiDoor,
    beam,
    roof,
    frontGable,
    ridge,
    capL,
    capR,
  );
  disposables.push(
    plinthGeo,
    stepLowerGeo,
    stepUpperGeo,
    verandaGeo,
    railGeo,
    bodyGeo,
    doorGeo,
    mullionGeo,
    postGeo,
    beamGeo,
    roofGeo,
    gableGeo,
    ridgeGeo,
    finialGeo,
  );

  // Register full shrine plinth + extended front stair apron exclusion zone
  const stairForwardX = Math.sin(shrineYaw) * 0.24;
  const stairForwardZ = Math.cos(shrineYaw) * 0.24;
  registry.register({
    id: 'shrine-hall',
    kind: 'shrine',
    x: SHRINE_CENTER.x + stairForwardX,
    z: SHRINE_CENTER.z + stairForwardZ,
    rx: 1.62,
    rz: 1.72,
    yaw: shrineYaw,
    margin: 0.24,
  });

  return {
    group,
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}

/**
 * Grounded carved Yukimi-doro (snow-viewing granite stone lantern) overlooking the rear cove & shrine stairs.
 */
function createStoneLantern(
  textures: PondTextureSuite,
  grounder: TerrainGrounder,
  registry: PlacementRegistry,
): {
  group: THREE.Group;
  dispose: () => void;
} {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  const graniteMat = new THREE.MeshStandardNodeMaterial({
    map: textures.stoneAlbedo,
    normalMap: textures.stoneNormal,
    normalScale: new THREE.Vector2(0.95, 0.95),
    roughness: 0.88,
    metalness: 0.02,
    color: 0xa4a092,
  });
  const fireboxGlowMat = new THREE.MeshStandardNodeMaterial({
    color: 0xe8c488,
    emissive: 0xf2a64c,
    emissiveIntensity: 0.72,
    roughness: 0.6,
  });
  disposables.push(graniteMat, fireboxGlowMat);

  const lanternX = -0.82;
  const lanternZ = -4.28;
  const lanternYaw = 0.32;
  const grounded = grounder.groundPropFootprint(lanternX, lanternZ, 0.3, 0.06, 0.02);
  group.position.set(lanternX, grounded.y, lanternZ);
  group.rotation.y = lanternYaw;

  // Grounded stone foundation plinth extending below downhill edge
  const plinthBot = grounded.minY - grounded.y - 0.14;
  const plinthTop = 0.04;
  const plinthH = Math.max(0.16, plinthTop - plinthBot);
  const plinthGeo = new THREE.CylinderGeometry(0.27, 0.31, plinthH, 12);
  const plinth = new THREE.Mesh(plinthGeo, graniteMat);
  plinth.position.y = plinthBot + plinthH * 0.5;
  plinth.castShadow = true;
  plinth.receiveShadow = true;
  group.add(plinth);
  disposables.push(plinthGeo);

  // Carved curving stone pedestal legs (3 splayed Yukimi feet meeting basal ring)
  const legGeo = new THREE.BoxGeometry(0.065, 0.22, 0.08);
  for (let l = 0; l < 3; l++) {
    const a = (l / 3) * Math.PI * 2 + 0.3;
    const leg = new THREE.Mesh(legGeo, graniteMat);
    leg.position.set(Math.cos(a) * 0.12, 0.12, Math.sin(a) * 0.12);
    leg.rotation.set(Math.sin(a) * 0.28, -a, -Math.cos(a) * 0.28);
    leg.castShadow = true;
    group.add(leg);
  }
  disposables.push(legGeo);

  const chudaiGeo = new THREE.CylinderGeometry(0.22, 0.16, 0.08, 6);
  const chudai = new THREE.Mesh(chudaiGeo, graniteMat);
  chudai.position.y = 0.24;
  chudai.castShadow = true;
  group.add(chudai);
  disposables.push(chudaiGeo);

  const glowGeo = new THREE.CylinderGeometry(0.095, 0.095, 0.16, 6);
  const glow = new THREE.Mesh(glowGeo, fireboxGlowMat);
  glow.position.y = 0.35;
  group.add(glow);
  disposables.push(glowGeo);

  const pillarGeo = new THREE.BoxGeometry(0.042, 0.17, 0.042);
  for (let p = 0; p < 6; p++) {
    const a = (p / 6) * Math.PI * 2 + 0.5;
    const bar = new THREE.Mesh(pillarGeo, graniteMat);
    bar.position.set(Math.cos(a) * 0.125, 0.355, Math.sin(a) * 0.125);
    bar.castShadow = true;
    group.add(bar);
  }
  disposables.push(pillarGeo);

  // Broad curved hexagonal Yukimi parasol stone roof + lotus finial (hoju)
  const kasaGeo = new THREE.ConeGeometry(0.36, 0.18, 6);
  const kasa = new THREE.Mesh(kasaGeo, graniteMat);
  kasa.position.y = 0.52;
  kasa.castShadow = true;
  group.add(kasa);
  disposables.push(kasaGeo);

  const hojuGeo = new THREE.SphereGeometry(0.052, 8, 6);
  const hoju = new THREE.Mesh(hojuGeo, graniteMat);
  hoju.scale.set(1, 1.32, 1);
  hoju.position.y = 0.63;
  group.add(hoju);
  disposables.push(hojuGeo);

  registry.register({
    id: 'garden-stone-lantern',
    kind: 'lantern',
    x: lanternX,
    z: lanternZ,
    rx: 0.38,
    rz: 0.38,
    yaw: lanternYaw,
    margin: 0.14,
    baseY: grounded.y + plinthBot,
    topY: grounded.y + 0.69,
  });

  return {
    group,
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}

function createSculptedGardenTerrain(textures: PondTextureSuite): {
  mesh: THREE.Mesh;
  dispose: () => void;
} {
  const angularSegs = 128;
  const radialRings = 64;
  const positions: number[] = [];
  const uvs: number[] = [];
  const colors: number[] = [];
  const indices: number[] = [];

  for (let r = 0; r <= radialRings; r++) {
    const u = r / radialRings;
    const radScale =
      r === 0
        ? 0.915
        : 0.94 +
          0.34 * u +
          1.4 * Math.pow(u, 2.2) +
          17.5 * Math.pow(Math.max(0, u - 0.16), 3.1);

    for (let a = 0; a <= angularSegs; a++) {
      const theta = (a / angularSegs) * Math.PI * 2;
      const pt = pondBoundaryPoint(theta, radScale);
      const y = r === 0 ? terrainElevation(pt.x, pt.z) - 0.014 : terrainElevation(pt.x, pt.z);

      positions.push(pt.x, y, pt.z);
      uvs.push(pt.x * 0.45, pt.z * 0.45);

      const weights = getGroundMaterialWeights(pt);
      const shoreDist = signedDistanceToPond(pt);
      const rim =
        shoreDist < 0.48
          ? Math.max(weights.wetStone * 1.35, 1 - Math.max(0, shoreDist) / 0.48)
          : weights.wetStone * 1.25;
      colors.push(
        Math.min(1, weights.gravel * 1.55),
        Math.min(1, weights.forestLitter * 1.4),
        Math.min(1, rim),
      );
    }
  }

  const stride = angularSegs + 1;
  for (let r = 0; r < radialRings; r++) {
    for (let a = 0; a < angularSegs; a++) {
      const i0 = r * stride + a;
      const i1 = r * stride + (a + 1);
      const i2 = (r + 1) * stride + a;
      const i3 = (r + 1) * stride + (a + 1);
      // Upward-facing (+Y) CCW winding from above: (p1 - p0) x (p2 - p0) = (+Z) x (+X) = +Y
      indices.push(i0, i1, i2);
      indices.push(i1, i3, i2);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  geo.computeBoundingBox();
  geo.computeBoundingSphere();

  const mat = createGroundTerraceMaterial(textures);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.receiveShadow = true;
  mesh.frustumCulled = false;

  return {
    mesh,
    dispose: () => {
      geo.dispose();
      mat.dispose();
    },
  };
}

function createWaterfallBasin(
  textures: PondTextureSuite,
  elapsedUniform: FloatUniform,
  grounder: TerrainGrounder,
  registry: PlacementRegistry,
): {
  group: THREE.Group;
  impactPoint: PointXZ;
  dispose: () => void;
} {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  const stoneMat = createShoreStoneMaterial(textures);
  const ceramicMat = new THREE.MeshPhysicalNodeMaterial({
    map: textures.clayAlbedo,
    normalMap: textures.clayNormal,
    normalScale: new THREE.Vector2(0.45, 0.45),
    roughness: 0.42,
    metalness: 0.04,
    clearcoat: 0.45,
    clearcoatRoughness: 0.28,
  });
  const bambooMat = new THREE.MeshStandardNodeMaterial({
    map: textures.bambooAlbedo,
    normalMap: textures.bambooNormal,
    normalScale: new THREE.Vector2(0.85, 0.85),
    roughness: 0.58,
    metalness: 0.02,
    color: 0xb7aa86,
  });
  const twineMat = createMatteNodeMaterial(0x28231d, 0.92, 0.01);
  const basinWaterMat = new THREE.MeshPhysicalNodeMaterial({
    color: 0x26594f,
    normalMap: textures.waterNormalA,
    normalScale: new THREE.Vector2(0.55, 0.55),
    roughness: 0.08,
    metalness: 0.04,
    clearcoat: 0.85,
  });
  const streamMat = createTrickleStreamMaterial(textures, elapsedUniform);

  disposables.push(stoneMat, ceramicMat, bambooMat, twineMat, basinWaterMat, streamMat);

  // Orient local +Z from right-bank ceramic jar straight west toward pond impact point
  const dx = WATERFALL_IMPACT_POINT.x - WATERFALL_SOURCE_POINT.x;
  const dz = WATERFALL_IMPACT_POINT.z - WATERFALL_SOURCE_POINT.z;
  const dirAngle = Math.atan2(dx, dz);

  // Ground hearth terrace base using footprint raycast so the entire feature sits firmly on land
  const baseSample = grounder.groundPropFootprint(
    WATERFALL_SOURCE_POINT.x,
    WATERFALL_SOURCE_POINT.z,
    0.58,
    0.05,
    0.0,
  );
  const hearthAnchorY = baseSample.minY * 0.55 + baseSample.avgY * 0.45;
  group.position.set(WATERFALL_SOURCE_POINT.x, hearthAnchorY, WATERFALL_SOURCE_POINT.z);
  group.rotation.y = dirAngle;
  group.updateMatrixWorld(true);

  // 1. Hand-split natural flat-cleaved granite hearth slab (replacing geometric cake-drum cylinders)
  const hearthGeo = sculptBoulderGeometry(0.46, 2, 13.7);
  const hPos = hearthGeo.attributes.position;
  const hv = new THREE.Vector3();
  for (let i = 0; i < hPos.count; i++) {
    hv.fromBufferAttribute(hPos, i);
    // Broad flat granite shelf table top for pot stability while preserving rugged stone flanks & deep anchor skirt
    if (hv.y > 0.1) {
      hv.y = 0.1 + (hv.y - 0.1) * 0.1;
    } else if (hv.y < -0.1) {
      hv.y *= 1.45;
    }
    hPos.setXYZ(i, hv.x * 1.12, hv.y, hv.z * 1.06);
  }
  hearthGeo.computeVertexNormals();
  const hearthExtents = measureGeometryExtents(hearthGeo);
  const hearthTopLocalY = 0.044;
  const hearthScaleY = 0.38;
  const hearthMesh = new THREE.Mesh(hearthGeo, stoneMat);
  hearthMesh.position.set(0, hearthTopLocalY - hearthExtents.maxY * hearthScaleY, -0.02);
  hearthMesh.scale.set(1.22, hearthScaleY, 1.18);
  hearthMesh.castShadow = true;
  hearthMesh.receiveShadow = true;
  group.add(hearthMesh);
  disposables.push(hearthGeo);

  // Curated framing granite stones hugging the Tsukubai hearth flanks, leaving front pouring sightline clear
  const sideRockGeo = sculptBoulderGeometry(0.24, 2, 9.7);
  const sideRockExtents = measureGeometryExtents(sideRockGeo);
  const framingRocks: Array<{ lx: number; lz: number; sx: number; sy: number; sz: number; ry: number }> = [
    { lx: -0.58, lz: 0.08, sx: 1.06, sy: 0.72, sz: 1.12, ry: 0.32 },
    { lx: 0.58, lz: 0.1, sx: 1.02, sy: 0.68, sz: 1.06, ry: 1.24 },
    { lx: -0.44, lz: 0.34, sx: 0.72, sy: 0.48, sz: 0.76, ry: 0.85 },
    { lx: 0.44, lz: 0.32, sx: 0.7, sy: 0.46, sz: 0.74, ry: 2.3 },
    { lx: -0.36, lz: -0.46, sx: 0.86, sy: 0.62, sz: 0.9, ry: 2.1 },
    { lx: 0.36, lz: -0.46, sx: 0.84, sy: 0.58, sz: 0.88, ry: 0.9 },
  ];
  framingRocks.forEach((rk, rIdx) => {
    const worldPt = new THREE.Vector3(rk.lx, 0, rk.lz).applyMatrix4(group.matrixWorld);
    const rg = grounder.groundPropFootprint(worldPt.x, worldPt.z, 0.28 * rk.sx, 0.18, 0.03);
    const safeWorldY = Math.min(rg.y, rg.minY - sideRockExtents.minY * rk.sy - 0.028);
    const localAnchor = new THREE.Vector3(worldPt.x, safeWorldY, worldPt.z);
    group.worldToLocal(localAnchor);

    const rockMesh = new THREE.Mesh(sideRockGeo, stoneMat);
    rockMesh.position.set(rk.lx, localAnchor.y, rk.lz);
    rockMesh.scale.set(rk.sx, rk.sy, rk.sz);
    rockMesh.rotation.y = rk.ry;
    rockMesh.castShadow = true;
    rockMesh.receiveShadow = true;
    group.add(rockMesh);

    registry.register({
      id: `tsukubai-collar-${rIdx}`,
      kind: 'rock',
      x: worldPt.x,
      z: worldPt.z,
      rx: sideRockExtents.maxRx * rk.sx,
      rz: sideRockExtents.maxRz * rk.sz,
      yaw: dirAngle + rk.ry,
      margin: 0.08,
      baseY: safeWorldY + sideRockExtents.minY * rk.sy,
      topY: safeWorldY + sideRockExtents.maxY * rk.sy,
    });
  });
  disposables.push(sideRockGeo);

  // 2. Hand-thrown Shigaraki-style ceramic jar resting visibly atop the flat granite hearth stone
  const lathePts = [
    new THREE.Vector2(0.0, 0.0),
    new THREE.Vector2(0.19, 0.0),
    new THREE.Vector2(0.31, 0.11),
    new THREE.Vector2(0.35, 0.24),
    new THREE.Vector2(0.31, 0.36),
    new THREE.Vector2(0.255, 0.36),
    new THREE.Vector2(0.235, 0.22),
    new THREE.Vector2(0.0, 0.19),
  ];
  const vesselGeo = new THREE.LatheGeometry(lathePts, 32);
  const vessel = new THREE.Mesh(vesselGeo, ceramicMat);
  const vesselBaseLocalY = hearthTopLocalY - 0.01;
  const vesselTiltX = 0.085;
  vessel.position.set(0, vesselBaseLocalY, 0.02);
  vessel.rotation.x = vesselTiltX;
  vessel.castShadow = true;
  vessel.receiveShadow = true;
  group.add(vessel);
  disposables.push(vesselGeo);

  // Ceramic pouring spout lip resting cleanly across front vessel rim
  const lipGeo = new THREE.CylinderGeometry(0.032, 0.044, 0.1, 10, 1, true, -Math.PI * 0.45, Math.PI * 0.9);
  lipGeo.rotateZ(Math.PI / 2);
  lipGeo.rotateY(Math.PI / 2);
  const lip = new THREE.Mesh(lipGeo, ceramicMat);
  lip.position.set(0, vesselBaseLocalY + 0.338, 0.325);
  lip.rotation.x = 0.22;
  group.add(lip);
  disposables.push(lipGeo);

  const diskGeo = new THREE.CircleGeometry(0.245, 24);
  diskGeo.rotateX(-Math.PI / 2);
  const basinWater = new THREE.Mesh(diskGeo, basinWaterMat);
  basinWater.position.set(0, vesselBaseLocalY + 0.316, 0.042);
  basinWater.rotation.x = vesselTiltX;
  group.add(basinWater);
  disposables.push(diskGeo);

  // 3. Aged hollow bamboo supply standpipe & kakei spout bound with black palm twine
  const postWorld = new THREE.Vector3(0, 0, -0.4).applyMatrix4(group.matrixWorld);
  const postGroundY = grounder.raycastSurface(postWorld.x, postWorld.z).y;
  const postBotLocalY = postGroundY - hearthAnchorY - 0.16;
  const postTopLocalY = vesselBaseLocalY + 0.67;
  const postHeight = Math.max(0.75, postTopLocalY - postBotLocalY);

  const postGeo = new THREE.CylinderGeometry(0.046, 0.056, postHeight, 14);
  const post = new THREE.Mesh(postGeo, bambooMat);
  post.position.set(0, postBotLocalY + postHeight * 0.5, -0.4);
  post.castShadow = true;
  post.receiveShadow = true;

  const nodeGeo = new THREE.TorusGeometry(0.052, 0.008, 8, 16);
  nodeGeo.rotateX(Math.PI / 2);
  const node1 = new THREE.Mesh(nodeGeo, bambooMat);
  node1.position.set(0, vesselBaseLocalY + 0.2, -0.4);
  const node2 = new THREE.Mesh(nodeGeo, bambooMat);
  node2.position.set(0, vesselBaseLocalY + 0.48, -0.4);

  // Hollow open-ended bamboo delivery tube + dark inner bore + slanted water-cut lip
  const spoutOuterGeo = new THREE.CylinderGeometry(0.028, 0.032, 0.52, 14, 1, true);
  spoutOuterGeo.rotateX(Math.PI / 2 - 0.22);
  const spout = new THREE.Mesh(spoutOuterGeo, bambooMat);
  spout.position.set(0, vesselBaseLocalY + 0.54, -0.17);
  spout.castShadow = true;

  const boreMat = new THREE.MeshStandardNodeMaterial({
    color: 0x1f2618,
    roughness: 0.9,
    metalness: 0.02,
    side: THREE.BackSide,
  });
  const spoutBoreGeo = new THREE.CylinderGeometry(0.021, 0.024, 0.515, 12, 1, true);
  spoutBoreGeo.rotateX(Math.PI / 2 - 0.22);
  const spoutBore = new THREE.Mesh(spoutBoreGeo, boreMat);
  spoutBore.position.copy(spout.position);

  const spoutRimGeo = new THREE.RingGeometry(0.02, 0.028, 14);
  const spoutRim = new THREE.Mesh(spoutRimGeo, bambooMat);
  spoutRim.position.set(0, vesselBaseLocalY + 0.484, 0.084);
  spoutRim.rotation.x = -0.22;

  const twineGeo = new THREE.TorusGeometry(0.056, 0.011, 8, 16);
  const twine = new THREE.Mesh(twineGeo, twineMat);
  twine.position.set(0, vesselBaseLocalY + 0.585, -0.385);
  twine.rotation.y = Math.PI / 2;

  group.add(post, node1, node2, spout, spoutBore, spoutRim, twine);
  disposables.push(postGeo, nodeGeo, spoutOuterGeo, spoutBoreGeo, boreMat, spoutRimGeo, twineGeo);

  // Register primary Tsukubai stone hearth & pot footprint
  registry.register({
    id: 'tsukubai-pedestal-pot',
    kind: 'waterFeature',
    x: WATERFALL_SOURCE_POINT.x,
    z: WATERFALL_SOURCE_POINT.z,
    rx: 0.66,
    rz: 0.66,
    yaw: dirAngle,
    margin: 0.14,
    baseY: hearthAnchorY - 0.12,
    topY: hearthAnchorY + vesselBaseLocalY + 0.38,
  });

  // 4. Tapered translucent water streams (hollow bamboo spout -> pot bowl -> collision-free open water)
  const upperCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, vesselBaseLocalY + 0.485, 0.075),
    new THREE.Vector3(0, vesselBaseLocalY + 0.42, 0.105),
    new THREE.Vector3(0, vesselBaseLocalY + 0.35, 0.115),
    new THREE.Vector3(0, vesselBaseLocalY + 0.312, 0.115),
  ]);
  const upperStreamGeo = createTaperedStreamGeometry(upperCurve, 12, 0.014, 0.009, 8);
  const upperStream = new THREE.Mesh(upperStreamGeo, streamMat);
  upperStream.renderOrder = 3;

  const lipWorld = new THREE.Vector3(0, vesselBaseLocalY + 0.322, 0.335).applyMatrix4(group.matrixWorld);
  const streamTraj = computeCollisionFreeStreamTrajectory({
    source: { x: lipWorld.x, y: lipWorld.y, z: lipWorld.z },
    target: { x: WATERFALL_IMPACT_POINT.x, y: 0.004, z: WATERFALL_IMPACT_POINT.z },
    obstacles: registry.getFootprints(),
    terrainHeightFn: (x, z) => grounder.raycastSurface(x, z).y,
    isInsideWaterFn: isInsideNaturalPond,
    streamRadius: 0.022,
    samples: 28,
  });

  const localCurvePts = streamTraj.controlPoints.map((pt) => {
    const v = new THREE.Vector3(pt.x, pt.y, pt.z);
    group.worldToLocal(v);
    return v;
  });
  const lowerBezier = new THREE.CubicBezierCurve3(
    localCurvePts[0],
    localCurvePts[1],
    localCurvePts[2],
    localCurvePts[3],
  );
  const lowerStreamGeo = createTaperedStreamGeometry(lowerBezier, 26, 0.017, 0.009, 10);
  const lowerStream = new THREE.Mesh(lowerStreamGeo, streamMat);
  lowerStream.renderOrder = 3;

  // Delicate aerated plunge foam & fine droplet collar at open-water landing point
  const landingLocal = new THREE.Vector3(
    streamTraj.landing.x,
    0.009,
    streamTraj.landing.z,
  );
  group.worldToLocal(landingLocal);
  const splashGeo = new THREE.RingGeometry(0.016, 0.11, 24);
  splashGeo.rotateX(-Math.PI / 2);
  const splashMat = new THREE.MeshBasicNodeMaterial({
    color: 0xe6f4ed,
    transparent: true,
    opacity: 0.38,
    depthWrite: false,
  });
  const splashRing = new THREE.Mesh(splashGeo, splashMat);
  splashRing.position.copy(landingLocal);
  splashRing.renderOrder = 3;

  const bubbleGeo = new THREE.SphereGeometry(0.016, 6, 5);
  const bubbleMat = new THREE.MeshBasicNodeMaterial({
    color: 0xf4faf7,
    transparent: true,
    opacity: 0.56,
    depthWrite: false,
  });
  for (let b = 0; b < 5; b++) {
    const ang = (b / 5) * Math.PI * 2 + 0.4;
    const bubble = new THREE.Mesh(bubbleGeo, bubbleMat);
    const rad = 0.024 + (b % 2) * 0.028;
    bubble.position.set(
      landingLocal.x + Math.cos(ang) * rad,
      landingLocal.y + 0.006 + (b % 2) * 0.008,
      landingLocal.z + Math.sin(ang) * rad,
    );
    bubble.scale.setScalar(0.65 + (b % 3) * 0.25);
    bubble.renderOrder = 3;
    group.add(bubble);
  }

  group.add(upperStream, lowerStream, splashRing);
  disposables.push(upperStreamGeo, lowerStreamGeo, splashGeo, splashMat, bubbleGeo, bubbleMat);

  // Exclude vegetation along the stream splash corridor
  registry.registerCapsule(
    'stream',
    lipWorld.x,
    lipWorld.z,
    streamTraj.landing.x,
    streamTraj.landing.z,
    0.26,
    0.08,
    undefined,
    'tsukubai-stream-corridor',
  );

  return {
    group,
    impactPoint: { x: streamTraj.landing.x, z: streamTraj.landing.z },
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}

/**
 * Finalizes instanced botanical card geometry with upward-blended normals so grass,
 * ferns, and groundcover catch sky/sun illumination cleanly without harsh dark self-creases.
 */
function finalizeFoliageCardGeometry(
  positions: number[],
  uvs: number[],
  indices: number[],
  upWeight = 0.78,
): THREE.BufferGeometry {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  const nAttr = geo.attributes.normal;
  const nVec = new THREE.Vector3();
  const up = new THREE.Vector3(0, 1, 0);
  for (let i = 0; i < nAttr.count; i++) {
    nVec.fromBufferAttribute(nAttr, i).lerp(up, upWeight).normalize();
    nAttr.setXYZ(i, nVec.x, nVec.y, nVec.z);
  }
  return geo;
}

function createArchingFernGeometry(length: number, width: number): THREE.BufferGeometry {
  const segs = 4;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= segs; i++) {
    const t = i / segs;
    const z = t * length;
    const y = Math.sin(t * Math.PI * 0.72) * length * 0.42 - t * t * length * 0.14;
    const hw = width * 0.5;
    positions.push(-hw, y, z);
    uvs.push(0, t);
    positions.push(hw, y, z);
    uvs.push(1, t);
  }

  for (let i = 0; i < segs; i++) {
    const i0 = i * 2;
    const i1 = i0 + 1;
    const i2 = i0 + 2;
    const i3 = i0 + 3;
    indices.push(i0, i2, i1);
    indices.push(i1, i2, i3);
  }

  return finalizeFoliageCardGeometry(positions, uvs, indices, 0.72);
}

function createGrassTuftGeometry(
  bladeCount: number,
  height: number,
  spread: number,
  baseWidth = 0.028,
): THREE.BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const segs = 3;

  for (let b = 0; b < bladeCount; b++) {
    const yaw = (b / bladeCount) * Math.PI * 2 + (b % 2) * 0.34;
    const cosY = Math.cos(yaw);
    const sinY = Math.sin(yaw);
    const bladeH = height * (0.76 + (b % 3) * 0.19);
    const lean = spread * (0.7 + (b % 2) * 0.38);
    const halfWBase = baseWidth;
    const baseVert = positions.length / 3;

    for (let s = 0; s <= segs; s++) {
      const t = s / segs;
      const y = bladeH * t - 0.01;
      const radial = lean * t * t;
      const hw = halfWBase * (1 - t * 0.9);
      const px = -sinY * hw;
      const pz = cosY * hw;
      const cx = cosY * radial;
      const cz = sinY * radial;

      positions.push(cx - px, y, cz - pz);
      uvs.push(0, t);
      positions.push(cx + px, y, cz + pz);
      uvs.push(1, t);
    }

    for (let s = 0; s < segs; s++) {
      const i0 = baseVert + s * 2;
      const i1 = i0 + 1;
      const i2 = i0 + 2;
      const i3 = i0 + 3;
      indices.push(i0, i2, i1);
      indices.push(i1, i2, i3);
    }
  }

  return finalizeFoliageCardGeometry(positions, uvs, indices, 0.76);
}

function createCrossedClumpGeometry(width: number, height: number): THREE.BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const planes = 3;

  for (let p = 0; p < planes; p++) {
    const angle = (p / planes) * Math.PI + (p === 1 ? 0.14 : p === 2 ? -0.14 : 0);
    const cosA = Math.cos(angle);
    const sinA = Math.sin(angle);
    const hw = width * 0.5;
    const tilt = 0.08 * (p === 0 ? 1 : -0.7);
    const baseVert = positions.length / 3;

    const rows = [
      { v: 0, y: -0.02, bend: 0 },
      { v: 0.5, y: height * 0.5, bend: tilt * 0.35 },
      { v: 1, y: height, bend: tilt },
    ];
    for (const r of rows) {
      const lx = -hw;
      const rx = hw;
      const bz = r.bend;
      positions.push(lx * cosA - bz * sinA, r.y, lx * sinA + bz * cosA);
      uvs.push(0, r.v);
      positions.push(rx * cosA - bz * sinA, r.y, rx * sinA + bz * cosA);
      uvs.push(1, r.v);
    }

    for (let s = 0; s < 2; s++) {
      const i0 = baseVert + s * 2;
      const i1 = i0 + 1;
      const i2 = i0 + 2;
      const i3 = i0 + 3;
      indices.push(i0, i2, i1);
      indices.push(i1, i2, i3);
    }
  }

  return finalizeFoliageCardGeometry(positions, uvs, indices, 0.84);
}

/**
 * Builds a rounded, softly arched botanical foliage mound (curved frond cards at gentle
 * dome pitches instead of harsh flat intersecting crosses).
 */
function createUnderstoryMoundGeometry(width: number, height: number): THREE.BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  const fronds = 6;
  const segs = 3;

  for (let p = 0; p < fronds; p++) {
    const yaw = (p / fronds) * Math.PI * 2 + (p % 2) * 0.22;
    const cosY = Math.cos(yaw);
    const sinY = Math.sin(yaw);
    const fLen = width * (0.48 + (p % 2) * 0.09);
    const fWid = width * 0.36;
    const archH = height * (0.76 + (p % 3) * 0.14);
    const baseVert = positions.length / 3;

    for (let s = 0; s <= segs; s++) {
      const t = s / segs;
      const radial = t * fLen;
      const cup = Math.sin(t * Math.PI) * archH * 0.85 + (1 - t) * archH * 0.42 - 0.04;
      const hw = fWid * Math.sin(0.28 + t * 0.72 * Math.PI * 0.85);
      // Local (+Z radial outward, +X lateral width)
      const lxL = -hw;
      const lxR = hw;
      positions.push(lxL * cosY - radial * sinY, cup, lxL * sinY + radial * cosY);
      uvs.push(0, t);
      positions.push(lxR * cosY - radial * sinY, cup, lxR * sinY + radial * cosY);
      uvs.push(1, t);
    }

    for (let s = 0; s < segs; s++) {
      const i0 = baseVert + s * 2;
      const i1 = i0 + 1;
      const i2 = i0 + 2;
      const i3 = i0 + 3;
      indices.push(i0, i2, i1);
      indices.push(i1, i2, i3);
    }
  }

  return finalizeFoliageCardGeometry(positions, uvs, indices, 0.8);
}

/**
 * Attaches a seamless terrain-conforming root-flare collar + registers exclusion footprint
 * so tree bases plant naturally into slopes without dangling tubular leg cutoffs.
 */
function addGroundedButtressRoots(
  parent: THREE.Group,
  barkMat: THREE.Material,
  grounder: TerrainGrounder,
  registry: PlacementRegistry,
  originX: number,
  originZ: number,
  rootRadius: number,
  rootSpread: number,
  rootCount: number,
  angleOffset: number,
  idPrefix: string,
  disposables: Array<{ dispose: () => void }>,
): void {
  const baseY = grounder.raycastSurface(originX, originZ).y;
  const collarGeo = createTerrainRootFlareGeometry(
    grounder,
    originX,
    baseY,
    originZ,
    angleOffset,
    1.0,
    Math.max(0.11, rootRadius * 2.05),
    0.52,
    0.26,
    Math.max(4, rootCount),
    angleOffset + 0.5,
  );
  const collarMesh = new THREE.Mesh(collarGeo, barkMat);
  collarMesh.position.set(originX, baseY, originZ);
  collarMesh.rotation.y = angleOffset;
  collarMesh.castShadow = true;
  collarMesh.receiveShadow = true;
  parent.add(collarMesh);
  disposables.push(collarGeo);

  const footRadius = Math.max(rootSpread * 0.85, rootRadius * 2.2);
  registry.register({
    id: `${idPrefix}-root-collar`,
    kind: 'tree',
    x: originX,
    z: originZ,
    rx: footRadius,
    rz: footRadius,
    margin: 0.14,
  });
}

function createWoodlandTrees(
  textures: PondTextureSuite,
  elapsedUniform: FloatUniform,
  quality: PondQuality,
  grounder: TerrainGrounder,
  registry: PlacementRegistry,
): {
  group: THREE.Group;
  dispose: () => void;
} {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  const barkMat = new THREE.MeshStandardNodeMaterial({
    map: textures.barkAlbedo,
    normalMap: textures.barkNormal,
    normalScale: new THREE.Vector2(1.3, 1.3),
    roughness: 0.9,
    metalness: 0.02,
    color: 0x5c5144,
  });

  const leafCardMat = new THREE.MeshStandardNodeMaterial({
    map: textures.broadLeafMap,
    alphaTest: 0.3,
    roughness: 0.76,
    metalness: 0.0,
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const leafSway = sin(
    elapsedUniform.mul(0.88).add(positionWorld.x.mul(0.75)).add(positionWorld.z.mul(0.65)),
  )
    .mul(0.032)
    .mul(smoothstep(1.2, 4.5, positionWorld.y));
  leafCardMat.positionNode = positionLocal.add(vec3(leafSway, leafSway.mul(0.25), leafSway.mul(0.4)));

  const leafGeo = new THREE.PlaneGeometry(1.15, 1.15);
  disposables.push(barkMat, leafCardMat, leafGeo);

  const canopyCenters: Array<{ x: number; y: number; z: number; r: number; palette: 'dark' | 'maple' | 'sunlit' }> = [];

  // 1. Organic shadowed left woodland trunks with flared root collars & grounded buttress roots
  const darkTrunks: Array<{ x: number; z: number; h: number; r: number; leanX: number }> = [
    { x: -6.15, z: 2.35, h: 6.4, r: 0.28, leanX: 0.28 },
    { x: -5.85, z: -0.95, h: 6.2, r: 0.23, leanX: 0.36 },
    { x: -6.75, z: 0.65, h: 6.8, r: 0.32, leanX: 0.18 },
    { x: -5.45, z: 3.75, h: 5.8, r: 0.2, leanX: -0.12 },
  ];
  darkTrunks.forEach((tr, tIdx) => {
    const gy = grounder.raycastSurface(tr.x, tr.z).y;
    const trunkCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(tr.x, gy - 0.48, tr.z),
      new THREE.Vector3(tr.x + tr.leanX * 0.04, gy + 0.02, tr.z + 0.01),
      new THREE.Vector3(tr.x + tr.leanX * 0.14, gy + 0.55, tr.z + 0.02),
      new THREE.Vector3(tr.x + tr.leanX * 0.42, gy + tr.h * 0.38, tr.z + 0.06),
      new THREE.Vector3(tr.x + tr.leanX * 0.85, gy + tr.h * 0.72, tr.z - 0.04),
      new THREE.Vector3(tr.x + tr.leanX, gy + tr.h, tr.z),
    ]);
    const trunkGeo = createFlaredTubeGeometry(trunkCurve, 18, tr.r, 0.35, 0.24, 9, 0.46);
    const trunk = new THREE.Mesh(trunkGeo, barkMat);
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    group.add(trunk);
    disposables.push(trunkGeo);

    addGroundedButtressRoots(
      group,
      barkMat,
      grounder,
      registry,
      tr.x,
      tr.z,
      tr.r * 0.36,
      tr.r * 2.4,
      4,
      tIdx * 0.7,
      `woodland-${tIdx}`,
      disposables,
    );

    registry.register({
      id: `woodland-trunk-${tIdx}`,
      kind: 'tree',
      x: tr.x,
      z: tr.z,
      rx: tr.r * 1.85,
      rz: tr.r * 1.85,
      margin: 0.16,
    });

    canopyCenters.push({ x: tr.x + 1.0, y: gy + 3.95, z: tr.z, r: 1.75, palette: 'dark' });
  });

  // 2. Sculpted Japanese Maple left-rear of stepping path with flared trunk base & grounded buttresses
  const mapleOrigin = { x: -4.25, y: grounder.raycastSurface(-4.25, -3.95).y, z: -3.95 };
  const mapleBranches: Array<{ pts: [number, number, number][]; r: number; flare: number }> = [
    {
      pts: [
        [0, -0.42, 0],
        [0.02, 0.0, 0.01],
        [0.08, 0.42, 0.04],
        [0.24, 1.15, 0.1],
        [0.52, 2.15, 0.22],
        [0.95, 2.85, 0.38],
      ],
      r: 0.15,
      flare: 0.22,
    },
    {
      pts: [
        [0.32, 1.48, 0.12],
        [1.08, 2.18, 0.25],
        [1.76, 2.64, 0.18],
      ],
      r: 0.075,
      flare: 0,
    },
    {
      pts: [
        [0.22, 1.38, 0.06],
        [-0.45, 2.15, -0.2],
        [-1.08, 2.75, -0.35],
      ],
      r: 0.075,
      flare: 0,
    },
  ];
  mapleBranches.forEach((b) => {
    const curve = new THREE.CatmullRomCurve3(
      b.pts.map(([x, y, z]) => new THREE.Vector3(mapleOrigin.x + x, mapleOrigin.y + y, mapleOrigin.z + z)),
    );
    const geo = createFlaredTubeGeometry(
      curve,
      14,
      b.r,
      0.55,
      b.flare,
      8,
      b.flare > 0 ? 0.44 : 0.72,
    );
    const mesh = new THREE.Mesh(geo, barkMat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    disposables.push(geo);
  });
  addGroundedButtressRoots(
    group,
    barkMat,
    grounder,
    registry,
    mapleOrigin.x,
    mapleOrigin.z,
    0.068,
    0.58,
    4,
    0.45,
    'maple',
    disposables,
  );
  registry.register({
    id: 'maple-trunk',
    kind: 'tree',
    x: mapleOrigin.x,
    z: mapleOrigin.z,
    rx: 0.42,
    rz: 0.42,
    margin: 0.14,
  });

  canopyCenters.push(
    { x: mapleOrigin.x + 1.25, y: mapleOrigin.y + 2.75, z: mapleOrigin.z + 0.24, r: 1.25, palette: 'maple' },
    { x: mapleOrigin.x + 0.45, y: mapleOrigin.y + 3.15, z: mapleOrigin.z + 0.05, r: 1.35, palette: 'maple' },
    { x: mapleOrigin.x - 0.65, y: mapleOrigin.y + 2.85, z: mapleOrigin.z - 0.2, r: 1.2, palette: 'maple' },
  );

  // 3. Sunlit mid-ground garden tree right of shrine with root flare & grounded roots
  const midTreePos = { x: 0.42, y: grounder.raycastSurface(0.42, -6.75).y, z: -6.75 };
  const midCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(midTreePos.x, midTreePos.y - 0.4, midTreePos.z),
    new THREE.Vector3(midTreePos.x + 0.01, midTreePos.y + 0.02, midTreePos.z + 0.01),
    new THREE.Vector3(midTreePos.x + 0.04, midTreePos.y + 0.42, midTreePos.z + 0.02),
    new THREE.Vector3(midTreePos.x + 0.12, midTreePos.y + 1.2, midTreePos.z + 0.05),
    new THREE.Vector3(midTreePos.x + 0.34, midTreePos.y + 2.35, midTreePos.z + 0.18),
  ]);
  const midTrunkGeo = createFlaredTubeGeometry(midCurve, 14, 0.125, 0.5, 0.22, 8, 0.46);
  const midTrunk = new THREE.Mesh(midTrunkGeo, barkMat);
  midTrunk.castShadow = true;
  midTrunk.receiveShadow = true;
  group.add(midTrunk);
  disposables.push(midTrunkGeo);

  addGroundedButtressRoots(
    group,
    barkMat,
    grounder,
    registry,
    midTreePos.x,
    midTreePos.z,
    0.055,
    0.45,
    4,
    0.25,
    'mid-tree',
    disposables,
  );
  registry.register({
    id: 'mid-tree-trunk',
    kind: 'tree',
    x: midTreePos.x,
    z: midTreePos.z,
    rx: 0.38,
    rz: 0.38,
    margin: 0.14,
  });

  canopyCenters.push(
    { x: midTreePos.x + 0.35, y: midTreePos.y + 2.55, z: midTreePos.z + 0.2, r: 1.2, palette: 'sunlit' },
    { x: midTreePos.x - 0.38, y: midTreePos.y + 2.35, z: midTreePos.z + 0.1, r: 1.05, palette: 'sunlit' },
  );

  // Expand canopy centers into varied organic foliage card clusters
  const cardsPerCluster = quality === 'desktop' ? 14 : 9;
  const totalCards = canopyCenters.length * cardsPerCluster;
  const leafInst = new THREE.InstancedMesh(leafGeo, leafCardMat, totalCards);
  leafInst.castShadow = true;

  let seed = 3341;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  const dummy = new THREE.Object3D();
  const cColor = new THREE.Color();
  const palettes = {
    dark: [0x829c6e, 0x96b080, 0x6f895d, 0xa2ba8c],
    maple: [0xc6daa0, 0xd9e8b4, 0xe8cfa2, 0xb2c88e],
    sunlit: [0xdcf0b0, 0xeef8c6, 0xc4de94, 0xf4facd],
  };

  let idx = 0;
  canopyCenters.forEach((c) => {
    const pal = palettes[c.palette];
    for (let k = 0; k < cardsPerCluster; k++) {
      const a = rand() * Math.PI * 2;
      const dist = Math.pow(rand(), 0.7) * c.r;
      const hOff = (rand() - 0.35) * c.r * 0.72;
      dummy.position.set(c.x + Math.cos(a) * dist, c.y + hOff, c.z + Math.sin(a) * dist);
      dummy.rotation.set(
        (rand() - 0.5) * 0.9,
        rand() * Math.PI * 2,
        (rand() - 0.5) * 0.7,
      );
      dummy.scale.setScalar(0.85 + rand() * 0.7);
      dummy.updateMatrix();
      leafInst.setMatrixAt(idx, dummy.matrix);
      cColor.setHex(pal[idx % pal.length]);
      leafInst.setColorAt(idx, cColor);
      idx++;
    }
  });

  leafInst.instanceMatrix.needsUpdate = true;
  if (leafInst.instanceColor) leafInst.instanceColor.needsUpdate = true;
  leafInst.computeBoundingSphere();
  group.add(leafInst);

  return {
    group,
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}

function createBambooForest(
  textures: PondTextureSuite,
  elapsedUniform: FloatUniform,
  quality: PondQuality,
  grounder: TerrainGrounder,
  registry: PlacementRegistry,
): {
  group: THREE.Group;
  dispose: () => void;
} {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  const culmGeo = new THREE.CylinderGeometry(0.052, 0.088, 1, 8, 9);
  const culmPos = culmGeo.attributes.position;
  for (let i = 0; i < culmPos.count; i++) {
    const cx = culmPos.getX(i);
    const cy = culmPos.getY(i);
    const cz = culmPos.getZ(i);
    const yNorm = cy + 0.5;
    // Swell subtly at regular bamboo internode rings so close/mid culms look jointed
    const nodePhase = Math.abs(((yNorm * 7) % 1) - 0.5) * 2;
    const nodeBulge = nodePhase > 0.84 ? 1.1 : 1.0;
    culmPos.setXYZ(i, cx * nodeBulge, yNorm, cz * nodeBulge);
  }
  culmGeo.computeVertexNormals();

  const culmMat = new THREE.MeshStandardNodeMaterial({
    map: textures.bambooAlbedo,
    normalMap: textures.bambooNormal,
    normalScale: new THREE.Vector2(0.8, 0.8),
    roughness: 0.58,
    metalness: 0.02,
    color: 0xffffff,
  });
  const bambooSway = sin(
    elapsedUniform.mul(0.82).add(positionWorld.x.mul(0.7)).add(positionWorld.z.mul(0.55)),
  )
    .mul(0.045)
    .mul(smoothstep(1.5, 9.5, positionWorld.y));
  culmMat.positionNode = positionLocal.add(vec3(bambooSway, float(0.0), bambooSway.mul(0.4)));

  const leafSprayGeo = new THREE.PlaneGeometry(1.45, 1.45);
  const leafSprayMat = new THREE.MeshStandardNodeMaterial({
    map: textures.bambooLeafMap,
    alphaTest: 0.3,
    roughness: 0.72,
    metalness: 0.0,
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  leafSprayMat.positionNode = positionLocal.add(vec3(bambooSway, float(0.0), bambooSway.mul(0.4)));

  const distTrunkGeo = new THREE.CylinderGeometry(0.18, 0.32, 1, 7);
  distTrunkGeo.translate(0, 0.5, 0);
  const distTrunkMat = new THREE.MeshStandardNodeMaterial({
    color: 0xffffff,
    roughness: 0.94,
    metalness: 0.01,
  });

  disposables.push(culmGeo, culmMat, leafSprayGeo, leafSprayMat, distTrunkGeo, distTrunkMat);

  let seed = 6029;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };

  const culmSpecs: Array<{ x: number; z: number; h: number; rScale: number; leanX: number; leanZ: number }> = [];
  const targetCulms = quality === 'desktop' ? 185 : 96;
  let tries = 0;
  while (culmSpecs.length < targetCulms && tries < 3200) {
    tries++;
    const x = -17.5 + rand() * 39.0;
    const z = -5.4 - rand() * 14.5;
    if (z > -8.6 && Math.abs(x - SHRINE_CENTER.x) < 2.25) continue;
    if (z > -4.6 && Math.hypot(x - SAKURA_CENTER.x, z - SAKURA_CENTER.z) < 2.1) continue;
    if (naturalPondNormalizedRadius({ x, z }) < 1.15) continue;
    if (registry.isExcluded(x, z, 0.2)) continue;

    culmSpecs.push({
      x,
      z,
      h: 6.8 + rand() * 5.2,
      rScale: 0.78 + rand() * 0.52,
      leanX: (rand() - 0.5) * 0.09,
      leanZ: (rand() - 0.5) * 0.08,
    });
  }

  const culmInst = new THREE.InstancedMesh(culmGeo, culmMat, culmSpecs.length);
  culmInst.castShadow = quality === 'desktop';
  culmInst.receiveShadow = true;

  const spraysPerCulm = 2;
  const leafInst = new THREE.InstancedMesh(
    leafSprayGeo,
    leafSprayMat,
    culmSpecs.length * spraysPerCulm,
  );

  const dummy = new THREE.Object3D();
  const tint = new THREE.Color();
  const culmShades = [0x6e8549, 0x5c723d, 0x7e9453, 0x4f6333];
  const crownShades = [0x829f54, 0x97b364, 0x6c8844, 0xa8c272];

  culmSpecs.forEach((c, i) => {
    const gy = grounder.raycastSurface(c.x, c.z).y;
    dummy.position.set(c.x, gy - 0.18, c.z);
    dummy.rotation.set(c.leanZ, rand() * Math.PI * 2, c.leanX);
    dummy.scale.set(c.rScale, c.h, c.rScale);
    dummy.updateMatrix();
    culmInst.setMatrixAt(i, dummy.matrix);
    tint.setHex(culmShades[i % culmShades.length]);
    culmInst.setColorAt(i, tint);

    registry.register({
      id: `bamboo-culm-${i}`,
      kind: 'tree',
      x: c.x,
      z: c.z,
      rx: 0.1 * c.rScale,
      rz: 0.1 * c.rScale,
      margin: 0.06,
    });

    for (let s = 0; s < spraysPerCulm; s++) {
      const ly = gy + c.h * (0.44 + s * 0.26);
      dummy.position.set(
        c.x + (rand() - 0.5) * 0.85,
        ly,
        c.z + (rand() - 0.5) * 0.85,
      );
      dummy.rotation.set(
        (rand() - 0.5) * 0.55,
        rand() * Math.PI * 2,
        (rand() - 0.5) * 0.55,
      );
      dummy.scale.setScalar(0.92 + rand() * 0.68);
      dummy.updateMatrix();
      const lIdx = i * spraysPerCulm + s;
      leafInst.setMatrixAt(lIdx, dummy.matrix);
      tint.setHex(crownShades[lIdx % crownShades.length]);
      leafInst.setColorAt(lIdx, tint);
    }
  });

  culmInst.instanceMatrix.needsUpdate = true;
  if (culmInst.instanceColor) culmInst.instanceColor.needsUpdate = true;
  culmInst.computeBoundingSphere();

  leafInst.instanceMatrix.needsUpdate = true;
  if (leafInst.instanceColor) leafInst.instanceColor.needsUpdate = true;
  leafInst.computeBoundingSphere();

  // Grounded low woodland fern/hosta groundcover cushions filtered against trunks, rocks, and open lawns
  const shrubGeo = createUnderstoryMoundGeometry(1.02, 0.26);
  const shrubMat = new THREE.MeshStandardNodeMaterial({
    map: textures.understoryLeafMap,
    alphaTest: 0.3,
    roughness: 0.82,
    metalness: 0.0,
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const shrubSway = sin(
    elapsedUniform.mul(1.05).add(positionWorld.x.mul(0.85)).add(positionWorld.z.mul(0.75)),
  )
    .mul(0.016)
    .mul(smoothstep(0.04, 0.28, positionLocal.y));
  shrubMat.positionNode = positionLocal.add(vec3(shrubSway, float(0.0), shrubSway.mul(0.45)));

  const shrubSpecs: Array<{ x: number; z: number; sc: number; rot: number; shade: number }> = [];
  const targetShrubs = quality === 'desktop' ? 128 : 62;
  const shrubTints = [0xc4dc96, 0xd0e4a4, 0xb6ce88, 0xdcebb2];
  let shrubTries = 0;
  while (shrubSpecs.length < targetShrubs && shrubTries < 3200) {
    shrubTries++;
    const sx = -16.5 + rand() * 36.0;
    const sz = -3.8 - rand() * 14.5;
    if (sz > -5.8 && sx > -3.2) continue;
    const sample = sampleTerrain({ x: sx, z: sz });
    if (sz > -8.4 && Math.abs(sx - SHRINE_CENTER.x) < 2.05) continue;
    if (Math.abs(sx - shrinePathCenterX(sz)) < 0.96 && sz > -6.4) continue;
    if (
      !registry.isVegetationValid({
        x: sx,
        z: sz,
        clearance: 0.28,
        shoreDistance: sample.shoreDistance,
        slope: sample.slope,
        minShoreDistance: 0.38,
        maxSlope: 0.44,
      })
    ) {
      continue;
    }

    const sc = 0.72 + rand() * 0.72;
    const rot = rand() * Math.PI * 2;
    shrubSpecs.push({
      x: sx,
      z: sz,
      sc,
      rot,
      shade: shrubTints[shrubSpecs.length % shrubTints.length],
    });
    registry.register({
      id: `understory-shrub-${shrubSpecs.length}`,
      kind: 'shrub',
      x: sx,
      z: sz,
      rx: 0.34 * sc,
      rz: 0.34 * sc,
      yaw: rot,
      margin: 0.08,
    });
  }

  // Root-margin understory shrubs set safely outside tree trunk/root footprints
  const collarShrubSpots: Array<[number, number, number]> = [
    [-5.35, 2.35, 0.84],
    [-5.05, -0.55, 0.8],
    [-4.85, -3.35, 0.82],
    [-3.45, -4.45, 0.78],
    [1.15, -6.25, 0.86],
    [2.85, -5.85, 0.88],
  ];
  collarShrubSpots.forEach(([sx, sz, sc], k) => {
    const sample = sampleTerrain({ x: sx, z: sz });
    if (
      !registry.isVegetationValid({
        x: sx,
        z: sz,
        clearance: 0.18,
        shoreDistance: sample.shoreDistance,
        slope: sample.slope,
        minShoreDistance: 0.32,
        maxSlope: 0.46,
      })
    ) {
      return;
    }
    const rot = k * 1.15;
    shrubSpecs.push({
      x: sx,
      z: sz,
      sc,
      rot,
      shade: sx < -3.8 ? 0xa2bc78 : shrubTints[k % shrubTints.length],
    });
    registry.register({
      id: `collar-shrub-${k}`,
      kind: 'shrub',
      x: sx,
      z: sz,
      rx: 0.34 * sc,
      rz: 0.34 * sc,
      yaw: rot,
      margin: 0.08,
    });
  });

  const shrubInst = new THREE.InstancedMesh(shrubGeo, shrubMat, shrubSpecs.length);
  shrubInst.castShadow = false;
  shrubInst.receiveShadow = true;
  shrubSpecs.forEach((sp, i) => {
    const gy = grounder.raycastSurface(sp.x, sp.z).y;
    dummy.position.set(sp.x, gy - 0.02, sp.z);
    dummy.rotation.set(0.06 * Math.sin(i), sp.rot, 0.06 * Math.cos(i));
    dummy.scale.set(sp.sc, sp.sc * (0.88 + (i % 3) * 0.1), sp.sc);
    dummy.updateMatrix();
    shrubInst.setMatrixAt(i, dummy.matrix);
    tint.setHex(sp.shade);
    shrubInst.setColorAt(i, tint);
  });
  shrubInst.instanceMatrix.needsUpdate = true;
  if (shrubInst.instanceColor) shrubInst.instanceColor.needsUpdate = true;
  shrubInst.computeBoundingSphere();
  disposables.push(shrubGeo, shrubMat);

  // Distant forest tree trunks rising behind the bamboo grove into mist
  const distCount = quality === 'desktop' ? 38 : 20;
  const distInst = new THREE.InstancedMesh(distTrunkGeo, distTrunkMat, distCount);
  for (let i = 0; i < distCount; i++) {
    const dx = -19 + (i / (distCount - 1)) * 41 + (rand() - 0.5) * 1.4;
    const dz = -14.5 - rand() * 10.5;
    const gy = grounder.raycastSurface(dx, dz).y;
    dummy.position.set(dx, gy - 0.2, dz);
    dummy.rotation.set(0, rand() * Math.PI, (rand() - 0.5) * 0.07);
    dummy.scale.set(0.85 + rand() * 0.75, 9 + rand() * 6, 0.85 + rand() * 0.75);
    dummy.updateMatrix();
    distInst.setMatrixAt(i, dummy.matrix);
    tint.setHex(i % 2 === 0 ? 0x2a3b27 : 0x354731);
    distInst.setColorAt(i, tint);
  }
  distInst.instanceMatrix.needsUpdate = true;
  if (distInst.instanceColor) distInst.instanceColor.needsUpdate = true;
  distInst.computeBoundingSphere();

  group.add(culmInst, leafInst, shrubInst, distInst);

  return {
    group,
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}

function createGardenEnvironment(
  textures: PondTextureSuite,
  elapsedUniform: FloatUniform,
  quality: PondQuality,
): GardenEnvironment {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];
  const registry = new PlacementRegistry(1.25);

  // Register submerged pond river stones first so Tsukubai trajectory & bank placement clear them
  getSubmergedStoneFootprints().forEach((fp) => {
    registry.register(fp);
  });

  // 1. Continuous 55m+ sculpted perspective garden terrain + raycast grounder
  const terrain = createSculptedGardenTerrain(textures);
  group.add(terrain.mesh);
  disposables.push(terrain);
  const grounder = createTerrainGrounder(terrain.mesh);

  // 2. Stepping stones curving cleanly from foreground-left onto the shrine lower step
  const stepStoneGeo = sculptBoulderGeometry(0.36, 2, 11.4);
  const stepExtents = measureGeometryExtents(stepStoneGeo);
  const stepStoneMat = new THREE.MeshStandardNodeMaterial({
    map: textures.stoneAlbedo,
    normalMap: textures.stoneNormal,
    normalScale: new THREE.Vector2(1.0, 1.0),
    roughness: 0.8,
    metalness: 0.02,
    color: 0xbcb5a2,
  });
  // Stops cleanly at z = -5.42 right ahead of shrine front stepLower south edge (-5.72)
  const stepZValues = [
    4.25, 3.6, 2.94, 2.28, 1.62, 0.96, 0.3, -0.36, -1.02, -1.68, -2.34, -3.0, -3.66, -4.32, -4.88, -5.42,
  ];
  const stepInst = new THREE.InstancedMesh(stepStoneGeo, stepStoneMat, stepZValues.length);
  stepInst.receiveShadow = true;
  stepInst.castShadow = true;

  const dummy = new THREE.Object3D();
  const baseEuler = new THREE.Euler();
  const baseQuat = new THREE.Quaternion();
  let prevStepX = shrinePathCenterX(stepZValues[0]);
  let prevStepZ = stepZValues[0];

  stepZValues.forEach((z, idx) => {
    const jitterX = (idx % 2 === 0 ? -0.05 : 0.06) * Math.sin(idx * 1.7);
    const x = shrinePathCenterX(z) + jitterX;
    const sx = 1.08 + (idx % 3) * 0.15;
    const sy = 0.34;
    const sz = 0.84 + ((idx + 1) % 3) * 0.12;
    const yaw = idx * 0.72;
    // Positive embed seats stepping stone base cleanly into compacted earth so rims never float
    const grounded = grounder.groundPropFootprint(x, z, 0.34, 0.14, 0.028);
    const safeY = Math.min(grounded.y, grounded.minY - stepExtents.minY * sy - 0.022);

    dummy.position.set(x, safeY, z);
    baseEuler.set(0, yaw, 0);
    baseQuat.setFromEuler(baseEuler);
    dummy.quaternion.copy(grounded.tiltQuat).multiply(baseQuat);
    dummy.scale.set(sx, sy, sz);
    dummy.updateMatrix();
    stepInst.setMatrixAt(idx, dummy.matrix);

    registry.register({
      id: `step-stone-${idx}`,
      kind: 'stepStone',
      x,
      z,
      rx: stepExtents.maxRx * sx,
      rz: stepExtents.maxRz * sz,
      yaw,
      margin: 0.08,
      baseY: safeY + stepExtents.minY * sy,
      topY: safeY + stepExtents.maxY * sy,
    });
    if (idx > 0) {
      registry.registerCapsule(
        'stepStone',
        prevStepX,
        prevStepZ,
        x,
        z,
        0.34,
        0.04,
        undefined,
        `path-corridor-${idx}`,
      );
    }
    prevStepX = x;
    prevStepZ = z;
  });
  stepInst.instanceMatrix.needsUpdate = true;
  stepInst.computeBoundingSphere();
  group.add(stepInst);
  disposables.push(stepStoneGeo, stepStoneMat);

  // Register foreground pebble beach pocket right on the genuine foreground shoreline edge
  const beachCenter = pondBoundaryPoint(Math.PI * 0.56, 1.05);
  registry.register({
    id: 'fg-pebble-beach',
    kind: 'pebbleBeach',
    x: beachCenter.x,
    z: beachCenter.z,
    rx: 0.82,
    rz: 0.54,
    yaw: -0.25,
    margin: 0.06,
  });

  // 3. Sculpted shoreline rocks & wet cobbles (grounded & registered into exclusion registry)
  const bankStones = createNaturalBankStones(textures, grounder, registry);
  group.add(bankStones.group);
  disposables.push(bankStones);

  // 4. Traditional aged timber shrine + carved Yukimi granite lantern in upper-mid-left background
  const shrine = createShrineHall(textures, grounder, registry);
  group.add(shrine.group);
  disposables.push(shrine);

  const lantern = createStoneLantern(textures, grounder, registry);
  group.add(lantern.group);
  disposables.push(lantern);

  // 5. Right-bank stoneware ceramic water vessel (Tsukubai) pouring collision-free into open water
  const waterfall = createWaterfallBasin(textures, elapsedUniform, grounder, registry);
  group.add(waterfall.group);
  disposables.push(waterfall);

  // 6. Substantial right-side sakura tree with terrain-raycasted buttress roots
  const sakura = createSakuraTree(textures, elapsedUniform, quality, grounder, registry);
  group.add(sakura.group);
  disposables.push(sakura);

  // 7. Left shadowed woodland trees, mid-left Japanese maple, and sunlit mid-ground tree
  const woodland = createWoodlandTrees(textures, elapsedUniform, quality, grounder, registry);
  group.add(woodland.group);
  disposables.push(woodland);

  // 8. Multi-depth layered bamboo forest, understory shrubs, & distant silhouetted trees
  const bambooForest = createBambooForest(textures, elapsedUniform, quality, grounder, registry);
  group.add(bambooForest.group);
  disposables.push(bambooForest);

  // 9. Low organic multi-lobed moss hummocks blended into open soil (never overlapping rocks/path/pot)
  const mossGeo = new THREE.SphereGeometry(0.48, 16, 12);
  const mPos = mossGeo.attributes.position;
  const mv = new THREE.Vector3();
  for (let i = 0; i < mPos.count; i++) {
    mv.fromBufferAttribute(mPos, i);
    const angle = Math.atan2(mv.z, mv.x);
    const lobe = 1 + 0.14 * Math.sin(angle * 3.0 + 0.6) + 0.08 * Math.cos(angle * 5.0 - 0.4);
    const micro = 1 + 0.1 * Math.sin(mv.x * 5.8 + mv.z * 4.9) * Math.cos(mv.y * 4.2);
    mv.x *= lobe * micro;
    mv.z *= lobe * micro;
    mv.y *= 0.68 * micro;
    mPos.setXYZ(i, mv.x, mv.y, mv.z);
  }
  mossGeo.computeVertexNormals();
  const mossMat = new THREE.MeshStandardNodeMaterial({
    map: textures.mossAlbedo,
    normalMap: textures.mossNormal,
    normalScale: new THREE.Vector2(1.0, 1.0),
    roughness: 0.98,
    metalness: 0.0,
    color: 0xffffff,
  });

  const mossPositions: Array<[number, number, number, number, number]> = [
    [-4.35, 3.65, 1.38, 0.22, 1.24],
    [-4.15, 2.25, 1.28, 0.2, 1.16],
    [-2.52, 2.65, 1.12, 0.18, 1.04],
    [-3.75, -0.95, 1.26, 0.2, 1.12],
    [-4.4, -2.35, 1.36, 0.22, 1.22],
    [-3.6, -4.15, 1.2, 0.2, 1.08],
    [-1.15, -4.45, 1.28, 0.2, 1.16],
    [1.45, 4.15, 1.36, 0.22, 1.24],
    [2.75, 3.65, 1.44, 0.24, 1.28],
    [3.92, 2.48, 1.32, 0.22, 1.18],
    [4.48, 0.95, 1.26, 0.2, 1.14],
    [3.25, -2.45, 1.56, 0.26, 1.38],
    [2.45, -4.25, 1.58, 0.26, 1.4],
    [4.18, -3.55, 1.48, 0.24, 1.34],
    [0.95, -4.75, 1.38, 0.22, 1.24],
    [-0.55, -5.75, 1.28, 0.2, 1.16],
    [-3.85, -6.35, 1.36, 0.22, 1.22],
    [-0.15, -7.25, 1.44, 0.24, 1.28],
    [2.15, -6.45, 1.52, 0.24, 1.36],
    [4.45, -5.85, 1.54, 0.26, 1.36],
    [-4.75, -4.95, 1.32, 0.22, 1.2],
    [1.98, -2.95, 1.22, 0.18, 1.1],
    [0.25, 4.45, 1.28, 0.2, 1.12],
  ];

  const validMoss = mossPositions.filter(([x, z]) => {
    const sample = sampleTerrain({ x, z });
    return (
      sample.shoreDistance >= 0.34 &&
      sample.slope <= 0.22 &&
      !registry.isExcluded(x, z, 0.16, new Set<FootprintKind>(['moss']))
    );
  });

  const mossInst = new THREE.InstancedMesh(mossGeo, mossMat, validMoss.length);
  mossInst.receiveShadow = true;
  mossInst.castShadow = false;
  const mColor = new THREE.Color();
  const mossTones = [0x657b3d, 0x586f36, 0x708647, 0x526632, 0x62783c];
  validMoss.forEach(([x, z, sx, sy, sz], idx) => {
    const grounded = grounder.groundPropFootprint(x, z, 0.42 * sx, 0.38, sy * 0.28);
    dummy.position.set(x, Math.min(grounded.y, grounded.minY - 0.02), z);
    baseEuler.set(0, idx * 0.85, 0);
    baseQuat.setFromEuler(baseEuler);
    dummy.quaternion.copy(grounded.tiltQuat).multiply(baseQuat);
    dummy.scale.set(sx * 0.88, sy * 0.92, sz * 0.88);
    dummy.updateMatrix();
    mossInst.setMatrixAt(idx, dummy.matrix);
    mColor.setHex(x < -3.0 ? 0x45582b : mossTones[idx % mossTones.length]);
    mossInst.setColorAt(idx, mColor);

    // Keep dense grass from poking straight out of the smooth crown peak of moss domes
    registry.register({
      id: `moss-dome-${idx}`,
      kind: 'moss',
      x,
      z,
      rx: sx * 0.24,
      rz: sz * 0.24,
      yaw: idx * 0.85,
      margin: 0.02,
    });
  });
  mossInst.instanceMatrix.needsUpdate = true;
  if (mossInst.instanceColor) mossInst.instanceColor.needsUpdate = true;
  mossInst.computeBoundingSphere();
  group.add(mossInst);
  disposables.push(mossGeo, mossMat);

  // 10. Foreground river pebble beach pocket + path-margin stone gravel scatters
  const pebbleGeo = sculptBoulderGeometry(0.11, 1, 3.1);
  const pebbleMat = new THREE.MeshStandardNodeMaterial({
    map: textures.stoneAlbedo,
    normalMap: textures.stoneNormal,
    roughness: 0.76,
    metalness: 0.02,
    color: 0xffffff,
  });
  let gSeed = 9137;
  const gRand = () => {
    gSeed = (gSeed * 16807) % 2147483647;
    return (gSeed - 1) / 2147483646;
  };

  const fgPebbleCoords: Array<[number, number, number]> = [];
  const fgCount = quality === 'desktop' ? 140 : 72;
  const ignoreForPebbles = new Set<FootprintKind>(['pebbleBeach', 'stepStone', 'moss', 'negativeSpace']);
  for (let i = 0; i < fgCount * 3 && fgPebbleCoords.length < fgCount; i++) {
    let px = 0;
    let pz = 0;
    let ps = 0.6;
    if (fgPebbleCoords.length < fgCount * 0.52) {
      // Shoreline pocket hugging damp foreground shingle contour (angle ~ 0.50*PI .. 0.63*PI)
      const angle = Math.PI * (0.49 + gRand() * 0.14);
      const rad = 0.995 + gRand() * 0.11;
      const pt = pondBoundaryPoint(angle, rad);
      px = pt.x + (gRand() - 0.5) * 0.18;
      pz = pt.z + (gRand() - 0.5) * 0.16;
      ps = 0.55 + gRand() * 0.82;
    } else if (fgPebbleCoords.length < fgCount * 0.76) {
      pz = -5.2 + gRand() * 8.8;
      px = shrinePathCenterX(pz) + (gRand() > 0.5 ? 1 : -1) * (0.44 + gRand() * 0.34);
      ps = 0.42 + gRand() * 0.56;
    } else if (fgPebbleCoords.length < fgCount * 0.88) {
      // Gravel collar behind & around Tsukubai hearth (strictly outside boulders & front channel)
      const ang = (gRand() - 0.5) * Math.PI * 1.15 + Math.PI * 0.25;
      const rad = 0.66 + gRand() * 0.38;
      px = WATERFALL_SOURCE_POINT.x + Math.cos(ang) * rad;
      pz = WATERFALL_SOURCE_POINT.z + Math.sin(ang) * rad;
      ps = 0.42 + gRand() * 0.52;
    } else {
      const angle = gRand() * Math.PI * 2;
      const pt = pondBoundaryPoint(angle, 0.995 + gRand() * 0.12);
      px = pt.x;
      pz = pt.z;
      ps = 0.48 + gRand() * 0.68;
    }

    if (signedDistanceToPond({ x: px, z: pz }) < -0.06) continue;
    if (registry.isExcluded(px, pz, 0.05, ignoreForPebbles)) continue;
    fgPebbleCoords.push([px, pz, ps]);
  }
  const pebbleInst = new THREE.InstancedMesh(pebbleGeo, pebbleMat, fgPebbleCoords.length);
  pebbleInst.receiveShadow = true;
  const pCol = new THREE.Color();
  const pebblePalette = [0xa69d8a, 0x7e7a6d, 0xbfc0b4, 0x625f57];
  fgPebbleCoords.forEach(([x, z, s], i) => {
    const py =
      naturalPondNormalizedRadius({ x, z }) < 1.0 ? -0.025 : grounder.raycastSurface(x, z).y;
    dummy.position.set(x, py - 0.004, z);
    dummy.rotation.set(0.08 * gRand(), gRand() * Math.PI * 2, 0.08 * gRand());
    dummy.scale.set(s * 1.25, s * 0.38, s * 0.96);
    dummy.updateMatrix();
    pebbleInst.setMatrixAt(i, dummy.matrix);
    pCol.setHex(pebblePalette[i % pebblePalette.length]);
    pebbleInst.setColorAt(i, pCol);
  });
  pebbleInst.instanceMatrix.needsUpdate = true;
  if (pebbleInst.instanceColor) pebbleInst.instanceColor.needsUpdate = true;
  pebbleInst.computeBoundingSphere();
  group.add(pebbleInst);
  disposables.push(pebbleGeo, pebbleMat);

  // 11. Arching pinnate ferns + upright pond-edge cattails/reeds (strictly filtered through exclusion registry)
  const fernFrondGeo = createArchingFernGeometry(0.68, 0.28);
  const fernMat = new THREE.MeshStandardNodeMaterial({
    map: textures.fernLeafMap,
    alphaTest: 0.3,
    roughness: 0.72,
    metalness: 0.01,
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const grassSway = sin(
    elapsedUniform.mul(1.35).add(positionWorld.x.mul(1.1)).add(positionWorld.z.mul(0.95)),
  )
    .mul(0.028)
    .mul(smoothstep(0.06, 0.5, positionLocal.y));
  fernMat.positionNode = positionLocal.add(vec3(grassSway, float(0.0), grassSway.mul(0.5)));

  const ignoreMossForFerns = new Set<FootprintKind>(['moss']);
  // Art-directed fern pockets around woodland banks, shrine flanks, and Tsukubai backdrop (validated via registry)
  const fernSeeds: Array<[number, number, number]> = [
    [-2.52, 2.52, 0.96],
    [-4.12, 2.85, 1.05],
    [-4.65, 1.35, 1.12],
    [-3.75, -1.25, 1.02],
    [-3.52, -3.55, 0.98],
    [2.78, 2.95, 1.16],
    [3.88, 1.68, 1.04],
    [4.38, 1.18, 0.96],
    [3.28, -2.18, 1.04],
    [-1.45, -5.65, 0.92],
    [0.58, -4.18, 0.98],
    [-0.18, -4.75, 0.92],
    [1.62, -5.25, 1.06],
    [2.95, -4.45, 1.08],
    [4.45, -3.25, 1.12],
    [-2.85, -4.85, 0.94],
    [-4.95, -2.15, 1.08],
    [1.42, 4.18, 1.04],
  ];
  // Fill additional validated fern pockets in woodland margins & right bank shadows
  for (let fTry = 0; fTry < 140 && fernSeeds.length < 30; fTry++) {
    const fx = -5.4 + gRand() * 11.2;
    const fz = -7.2 + gRand() * 11.2;
    if (xInLeftHeroQuietZone(fx, fz)) continue;
    fernSeeds.push([fx, fz, 0.84 + gRand() * 0.34]);
  }
  function xInLeftHeroQuietZone(x: number, z: number): boolean {
    return x < -2.35 && z > 1.25;
  }

  const fernSpots: Array<[number, number, number]> = [];
  for (const [fx, fz, sc] of fernSeeds) {
    if (fernSpots.length >= (quality === 'desktop' ? 24 : 16)) break;
    const sample = sampleTerrain({ x: fx, z: fz });
    if (
      registry.isVegetationValid({
        x: fx,
        z: fz,
        clearance: 0.18,
        shoreDistance: sample.shoreDistance,
        slope: sample.slope,
        minShoreDistance: 0.22,
        maxSlope: 0.44,
        ignoreKinds: ignoreMossForFerns,
      })
    ) {
      let tooClose = false;
      for (const [ox, oz] of fernSpots) {
        if (Math.hypot(fx - ox, fz - oz) < 0.72) {
          tooClose = true;
          break;
        }
      }
      if (!tooClose) fernSpots.push([fx, fz, sc]);
    }
  }
  const frondsPerRosette = quality === 'desktop' ? 7 : 5;
  const fernInst = new THREE.InstancedMesh(
    fernFrondGeo,
    fernMat,
    Math.max(1, fernSpots.length * frondsPerRosette),
  );
  fernInst.castShadow = false;
  fernInst.receiveShadow = true;

  let fIdx = 0;
  fernSpots.forEach(([fx, fz, sc], sIdx) => {
    const gy = grounder.raycastSurface(fx, fz).y;
    for (let k = 0; k < frondsPerRosette; k++) {
      const ang = (k / frondsPerRosette) * Math.PI * 2 + sIdx * 0.45 + (gRand() - 0.5) * 0.25;
      dummy.position.set(fx, gy + 0.02, fz);
      dummy.rotation.set(-0.18 - gRand() * 0.28, ang, 0);
      const fScale = sc * (0.78 + gRand() * 0.42);
      dummy.scale.setScalar(fScale);
      dummy.updateMatrix();
      fernInst.setMatrixAt(fIdx, dummy.matrix);
      mColor.setHex(fx < -3.0 ? 0x8ea672 : k % 2 === 0 ? 0xffffff : 0xe4f0c4);
      fernInst.setColorAt(fIdx, mColor);
      fIdx++;
    }
    registry.register({
      id: `fern-rosette-${sIdx}`,
      kind: 'moss',
      x: fx,
      z: fz,
      rx: 0.26 * sc,
      rz: 0.26 * sc,
      margin: 0.04,
    });
  });
  fernInst.count = fIdx;
  fernInst.instanceMatrix.needsUpdate = true;
  if (fernInst.instanceColor) fernInst.instanceColor.needsUpdate = true;
  fernInst.computeBoundingSphere();
  group.add(fernInst);
  disposables.push(fernFrondGeo, fernMat);

  // Upright pond-edge reeds / water iris clusters placed strictly in clear shoreline earth pockets
  const reedGeo = createGrassTuftGeometry(10, 1.04, 0.26, 0.032);
  const reedMat = new THREE.MeshStandardNodeMaterial({
    color: 0xffffff,
    roughness: 0.68,
    metalness: 0.02,
    side: THREE.DoubleSide,
  });
  const reedSway = sin(
    elapsedUniform.mul(1.25).add(positionWorld.x.mul(1.0)).add(positionWorld.z.mul(0.85)),
  )
    .mul(0.05)
    .mul(smoothstep(0.08, 0.85, positionLocal.y));
  reedMat.positionNode = positionLocal.add(vec3(reedSway, float(0.0), reedSway.mul(0.6)));

  // Art-directed shoreline reed pockets around foreground, lantern cove, and north-east sakura shoreline
  const reedAngleBands: Array<[number, number]> = [
    [Math.PI * 0.14, Math.PI * 0.26], // lower-right foreground shore cove below Tsukubai
    [Math.PI * 0.65, Math.PI * 0.77], // lower-left foreground cove (calm botanical accent)
    [-Math.PI * 0.66, -Math.PI * 0.54], // back-left reed cove near lantern
    [-Math.PI * 0.36, -Math.PI * 0.24], // back-right shoreline cove under sakura
    [-Math.PI * 0.5, -Math.PI * 0.39], // far-back serene reed pocket
  ];
  const reedSpots: Array<[number, number, number]> = [];
  for (let bIdx = 0; bIdx < reedAngleBands.length; bIdx++) {
    const [a0, a1] = reedAngleBands[bIdx];
    let placedInBand = 0;
    for (let step = 0; step < 44 && placedInBand < 4; step++) {
      const ang = a0 + ((step + 0.5) / 44) * (a1 - a0);
      const rad = 1.03 + ((step * 7) % 5) * 0.024;
      const pt = pondBoundaryPoint(ang, rad);
      const sample = sampleTerrain(pt);
      if (
        !registry.isVegetationValid({
          x: pt.x,
          z: pt.z,
          clearance: 0.14,
          shoreDistance: sample.shoreDistance,
          slope: sample.slope,
          minShoreDistance: 0.04,
          maxSlope: 0.48,
          ignoreKinds: ignoreMossForFerns,
        })
      ) {
        continue;
      }
      let spaced = true;
      for (const [rx, rz] of reedSpots) {
        if (Math.hypot(pt.x - rx, pt.z - rz) < 0.28) {
          spaced = false;
          break;
        }
      }
      if (!spaced) continue;
      const sc = 0.88 + (placedInBand % 2) * 0.16;
      reedSpots.push([pt.x, pt.z, sc]);
      registry.register({
        id: `shore-reed-${reedSpots.length}`,
        kind: 'moss',
        x: pt.x,
        z: pt.z,
        rx: 0.14 * sc,
        rz: 0.14 * sc,
        margin: 0.03,
      });
      placedInBand++;
    }
  }

  const reedInst = new THREE.InstancedMesh(reedGeo, reedMat, Math.max(1, reedSpots.length));
  reedInst.castShadow = true;
  reedInst.receiveShadow = true;
  reedSpots.forEach(([x, z, sc], idx) => {
    const gy = grounder.raycastSurface(x, z).y;
    dummy.position.set(x, gy - 0.025, z);
    dummy.rotation.set(0, idx * 1.1, 0);
    dummy.scale.setScalar(sc);
    dummy.updateMatrix();
    reedInst.setMatrixAt(idx, dummy.matrix);
    mColor.setHex(idx % 2 === 0 ? 0x6f9450 : 0x84a85e);
    reedInst.setColorAt(idx, mColor);
  });
  reedInst.count = reedSpots.length;
  reedInst.instanceMatrix.needsUpdate = true;
  if (reedInst.instanceColor) reedInst.instanceColor.needsUpdate = true;
  reedInst.computeBoundingSphere();
  group.add(reedInst);
  disposables.push(reedGeo, reedMat);

  // Subtle brown cattail spikes anchored directly within validated reed clumps (never floating orphans)
  const spikeStemGeo = new THREE.CylinderGeometry(0.008, 0.011, 1.02, 5);
  spikeStemGeo.translate(0, 0.51, 0);
  const spikeHeadGeo = new THREE.CylinderGeometry(0.022, 0.022, 0.16, 7);
  spikeHeadGeo.translate(0, 0.93, 0);
  const spikeStemMat = createMatteNodeMaterial(0x5d8040, 0.78, 0.01);
  const spikeHeadMat = createMatteNodeMaterial(0x523624, 0.92, 0.01);
  reedSpots.slice(0, 8).forEach(([rx, rz, sc], idx) => {
    for (let s = 0; s < 2; s++) {
      const ang = idx * 1.3 + s * 2.1;
      const x = rx + Math.cos(ang) * 0.045;
      const z = rz + Math.sin(ang) * 0.045;
      const gy = grounder.raycastSurface(x, z).y;
      const st = new THREE.Mesh(spikeStemGeo, spikeStemMat);
      const hd = new THREE.Mesh(spikeHeadGeo, spikeHeadMat);
      st.position.set(x, gy - 0.025, z);
      hd.position.set(x, gy - 0.025, z);
      st.rotation.set(0.05 * Math.sin(idx + s), idx + s, 0.05 * Math.cos(idx + s));
      hd.rotation.copy(st.rotation);
      const sScale = sc * (0.9 + s * 0.12);
      st.scale.setScalar(sScale);
      hd.scale.setScalar(sScale);
      group.add(st, hd);
    }
  });
  disposables.push(spikeStemGeo, spikeHeadGeo, spikeStemMat, spikeHeadMat);

  // 12. Continuous organic grass & sedge drifts across foreground, midground & forest backdrop
  const grassGeo = createCrossedClumpGeometry(0.32, 0.22);
  const grassMat = new THREE.MeshStandardNodeMaterial({
    map: textures.grassBladeMap,
    alphaTest: 0.32,
    roughness: 0.82,
    metalness: 0.01,
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  const clumpWindSway = sin(
    elapsedUniform.mul(1.35).add(positionWorld.x.mul(1.1)).add(positionWorld.z.mul(0.95)),
  )
    .mul(0.022)
    .mul(smoothstep(0.02, 0.22, positionLocal.y));
  grassMat.positionNode = positionLocal.add(vec3(clumpWindSway, float(0.0), clumpWindSway.mul(0.5)));

  // Continuous world-spanning groundcover zones from foreground pond border back into bamboo hills
  const grassZones: Array<{ minX: number; maxX: number; minZ: number; maxZ: number; weight: number }> = [
    // Right foreground & sunny right bank around pond & sakura fringe
    { minX: 1.2, maxX: 6.2, minZ: 1.0, maxZ: 5.1, weight: 3 },
    // Right-mid ridge behind sakura & north bank
    { minX: 1.4, maxX: 6.8, minZ: -5.6, maxZ: -1.4, weight: 3 },
    // Mid-back terrace between shrine & right bamboo ridge
    { minX: -2.2, maxX: 5.4, minZ: -8.6, maxZ: -3.6, weight: 3 },
    // Continuous background forest floor drifts beneath bamboo grove
    { minX: -11.5, maxX: 11.5, minZ: -14.2, maxZ: -6.8, weight: 3 },
    // Left mossy woodland flanks (quiet calm texture behind left hero typography)
    { minX: -6.2, maxX: -2.4, minZ: -6.5, maxZ: 3.4, weight: 2 },
    // Foreground center-right apron beside pebble beach
    { minX: 0.1, maxX: 2.8, minZ: 3.2, maxZ: 5.2, weight: 2 },
  ];
  const zoneBag: typeof grassZones = [];
  grassZones.forEach((zone) => {
    for (let w = 0; w < zone.weight; w++) zoneBag.push(zone);
  });

  const grassCoords: Array<[number, number, number, number, number, number]> = [];
  const targetGrass = quality === 'desktop' ? 880 : 380;
  let attempts = 0;
  while (grassCoords.length < targetGrass && attempts < 11000) {
    attempts++;
    const zone = zoneBag[attempts % zoneBag.length];
    const cx = zone.minX + gRand() * (zone.maxX - zone.minX);
    const cz = zone.minZ + gRand() * (zone.maxZ - zone.minZ);
    // Keep calm negative space behind bottom-left hero CTA/copy
    if (cx < -2.2 && cz > 1.8 && gRand() < 0.85) continue;
    // Keep natural moss carpet breaks so ground doesn't look uniformly blanketed
    const patchWave = Math.sin(cx * 0.95 + 0.4) * Math.cos(cz * 0.85 - 0.3);
    if (patchWave < -0.48 && gRand() < 0.72) continue;

    const clusterSize = 1 + (attempts % 3);
    for (let m = 0; m < clusterSize && grassCoords.length < targetGrass; m++) {
      const ang = gRand() * Math.PI * 2;
      const rad = m === 0 ? 0 : 0.09 + gRand() * 0.22;
      const x = cx + Math.cos(ang) * rad;
      const z = cz + Math.sin(ang) * rad;
      const sample = sampleTerrain({ x, z });

      if (
        !registry.isVegetationValid({
          x,
          z,
          clearance: 0.15,
          shoreDistance: sample.shoreDistance,
          slope: sample.slope,
          minShoreDistance: 0.24,
          maxSlope: 0.38,
        })
      ) {
        continue;
      }

      const gy = grounder.raycastSurface(x, z).y;
      const leftShorten = x < -2.6 ? 0.72 : 1.0;
      const bgShorten = z < -7.5 ? 0.86 : 1.0;
      const scale = (0.68 + gRand() * 0.56) * leftShorten * bgShorten;
      grassCoords.push([x, gy, z, scale, gRand() * Math.PI * 2, sample.normal.x]);
    }
  }
  const grassInst = new THREE.InstancedMesh(grassGeo, grassMat, Math.max(1, grassCoords.length));
  grassInst.receiveShadow = true;
  const gPalette = [0xcce09c, 0xd8eaab, 0xbfd490, 0xe2f0b8];
  grassCoords.forEach(([x, gy, z, sc, rot, nx], idx) => {
    dummy.position.set(x, gy - 0.025, z);
    dummy.rotation.set(0, rot, -nx * 0.35);
    dummy.scale.set(sc, sc * (0.85 + (idx % 3) * 0.12), sc);
    dummy.updateMatrix();
    grassInst.setMatrixAt(idx, dummy.matrix);
    mColor.setHex(x < -3.0 ? 0x9ab078 : gPalette[idx % gPalette.length]);
    grassInst.setColorAt(idx, mColor);
  });
  grassInst.count = grassCoords.length;
  grassInst.instanceMatrix.needsUpdate = true;
  if (grassInst.instanceColor) grassInst.instanceColor.needsUpdate = true;
  grassInst.computeBoundingSphere();
  group.add(grassInst);
  disposables.push(grassGeo, grassMat);

  // 13. Falling & floating sakura petals from right-side cherry canopy onto the jade pond
  const petalPlaneGeo = new THREE.PlaneGeometry(0.11, 0.11);
  const restingPetalGeo = new THREE.PlaneGeometry(0.088, 0.088);
  restingPetalGeo.rotateX(-Math.PI / 2);
  const petalMat = new THREE.MeshStandardNodeMaterial({
    map: textures.petalMap,
    alphaTest: 0.2,
    roughness: 0.65,
    metalness: 0.01,
    side: THREE.DoubleSide,
  });
  disposables.push(petalPlaneGeo, restingPetalGeo, petalMat);

  const restingCoords: Array<[number, number, number]> = [
    [1.15, -0.42, 0.4],
    [1.65, 0.55, -0.5],
    [0.85, 0.92, 0.8],
    [1.38, -1.12, -0.2],
    [0.42, 0.15, 0.3],
    [-0.35, 1.48, 1.1],
    [-0.95, 2.05, -0.7],
    [1.82, -0.18, 0.65],
    [2.45, 0.68, -0.4],
    [2.78, -0.72, 1.2],
    [3.12, -1.45, -0.8],
  ];
  const restingPetals = new THREE.InstancedMesh(restingPetalGeo, petalMat, restingCoords.length);
  restingCoords.forEach(([x, z, rot], idx) => {
    const py = isInsideNaturalPond({ x, z }) ? 0.008 : grounder.raycastSurface(x, z).y + 0.014;
    dummy.position.set(x, py, z);
    dummy.rotation.set(0, rot, 0);
    dummy.scale.setScalar(1);
    dummy.updateMatrix();
    restingPetals.setMatrixAt(idx, dummy.matrix);
  });
  restingPetals.instanceMatrix.needsUpdate = true;
  restingPetals.computeBoundingSphere();
  group.add(restingPetals);

  const driftingCount = quality === 'desktop' ? 18 : 10;
  const driftingPetals: DriftingPetal[] = [];
  for (let i = 0; i < driftingCount; i++) {
    const ox = 0.6 + ((i * 0.43) % 2.1);
    const oz = -1.6 + ((i * 0.67) % 2.8);
    const mesh = new THREE.Mesh(petalPlaneGeo, petalMat);
    const initialY = 0.45 + ((i * 0.41) % 2.6);
    mesh.position.set(ox, initialY, oz);
    mesh.renderOrder = 4;
    group.add(mesh);
    driftingPetals.push({
      mesh,
      originX: ox,
      originZ: oz,
      x: ox,
      y: initialY,
      z: oz,
      fallSpeed: 0.19 + (i % 4) * 0.035,
      swayPhase: i * 1.17,
      swayAmp: 0.24 + (i % 3) * 0.08,
      landedTimer: 0,
      spawnedRipple: false,
    });
  }

  // 14. Seamless misty forest sky gradient high behind distant bamboo + upper-right diagonal sunbeams
  const skyBackdropGeo = new THREE.PlaneGeometry(110, 38);
  const skyBackdropMat = new THREE.MeshBasicNodeMaterial({
    transparent: true,
    depthWrite: false,
  });
  const skyV = positionLocal.y.add(19.0).div(38.0);
  const skyGrad = smoothstep(0.32, 0.85, skyV);
  const rightGlow = smoothstep(-10.0, 22.0, positionLocal.x).mul(0.36);
  skyBackdropMat.colorNode = vec3(0.14, 0.2, 0.14)
    .mul(float(1.0).sub(skyGrad))
    .add(vec3(0.56, 0.64, 0.54).add(vec3(0.22, 0.2, 0.12).mul(rightGlow)).mul(skyGrad));
  skyBackdropMat.opacityNode = smoothstep(0.24, 0.52, skyV).mul(0.84);
  const skyBackdrop = new THREE.Mesh(skyBackdropGeo, skyBackdropMat);
  skyBackdrop.position.set(2.5, 13.0, -36.0);
  group.add(skyBackdrop);
  disposables.push(skyBackdropGeo, skyBackdropMat);

  const sunbeamOpacityUniform = uniform(1.0) as FloatUniform;
  const sunbeamMat = createSunbeamMaterial(elapsedUniform, sunbeamOpacityUniform);
  const sunbeamGeo = new THREE.PlaneGeometry(3.2, 10.5);
  const sunbeamSpecs: Array<[number, number, number, number, number]> = [
    [2.4, 5.2, -5.8, 0.18, -0.56],
    [0.6, 5.4, -7.2, 0.16, -0.58],
    [4.1, 5.0, -4.8, 0.2, -0.54],
    [-1.0, 5.6, -8.8, 0.15, -0.58],
  ];
  sunbeamSpecs.forEach(([x, y, z, rx, rz]) => {
    const beam = new THREE.Mesh(sunbeamGeo, sunbeamMat);
    beam.position.set(x, y, z);
    beam.rotation.set(rx, -0.22, rz);
    beam.renderOrder = 5;
    group.add(beam);
  });
  disposables.push(sunbeamGeo, sunbeamMat);

  const mistGeo = new THREE.PlaneGeometry(40, 7.5);
  const mistSpecs: Array<[number, number, number, number]> = [
    [-1.5, 4.7, -13.8, 0.14],
    [2.6, 5.2, -16.5, 0.18],
    [-4.2, 4.6, -19.5, 0.14],
  ];
  mistSpecs.forEach(([x, y, z, op], idx) => {
    const mistMat = createMistSheetMaterial(elapsedUniform, idx * 2.1, op);
    const mistMesh = new THREE.Mesh(mistGeo, mistMat);
    mistMesh.position.set(x, y, z);
    mistMesh.renderOrder = 4;
    group.add(mistMesh);
    disposables.push(mistMat);
  });
  disposables.push(mistGeo);

  // Subtle floating sunlit pollen / morning dust motes
  const moteGeo = new THREE.SphereGeometry(0.015, 5, 5);
  const moteMat = new THREE.MeshBasicNodeMaterial({
    color: 0xfff2cc,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  });
  const moteCount = quality === 'desktop' ? 24 : 12;
  const dustMotes: DustMote[] = [];
  for (let i = 0; i < moteCount; i++) {
    const bx = -1.8 + gRand() * 5.2;
    const by = 0.55 + gRand() * 2.8;
    const bz = -4.2 + gRand() * 6.8;
    const mesh = new THREE.Mesh(moteGeo, moteMat);
    mesh.position.set(bx, by, bz);
    mesh.renderOrder = 5;
    group.add(mesh);
    dustMotes.push({
      mesh,
      baseX: bx,
      baseY: by,
      baseZ: bz,
      phase: gRand() * Math.PI * 2,
      speed: 0.35 + gRand() * 0.45,
    });
  }
  disposables.push(moteGeo, moteMat);
  grounder.dispose();

  let waterfallCooldown = 0.24;
  const waterfallImpact = waterfall.impactPoint;

  const update = (
    elapsed: number,
    dt: number,
    atmosphereFactor: number,
    onPetalTouchdown?: (x: number, z: number) => void,
    onWaterfallRipple?: (x: number, z: number) => void,
  ) => {
    sunbeamOpacityUniform.value = Math.max(0.18, Math.min(1.1, atmosphereFactor));

    const safeDt = Math.min(Math.max(dt, 0), 0.08);
    if (safeDt <= 0) return;

    waterfallCooldown -= safeDt;
    if (waterfallCooldown <= 0) {
      waterfallCooldown = 0.85;
      onWaterfallRipple?.(waterfallImpact.x, waterfallImpact.z);
    }

    for (const p of driftingPetals) {
      const floorY = isInsideNaturalPond({ x: p.x, z: p.z })
        ? 0.008
        : terrainElevation(p.x, p.z) + 0.014;
      if (p.y > floorY) {
        p.y -= p.fallSpeed * safeDt;
        p.x += Math.sin(elapsed * 1.45 + p.swayPhase) * p.swayAmp * safeDt - 0.045 * safeDt;
        p.z += Math.cos(elapsed * 1.18 + p.swayPhase * 1.3) * (p.swayAmp * 0.72) * safeDt;
        p.mesh.position.set(p.x, Math.max(floorY, p.y), p.z);
        p.mesh.rotation.set(
          Math.sin(elapsed * 2.1 + p.swayPhase) * 0.65,
          elapsed * 0.9 + p.swayPhase,
          Math.cos(elapsed * 1.7 + p.swayPhase) * 0.55,
        );
      } else {
        if (!p.spawnedRipple) {
          p.spawnedRipple = true;
          if (isInsideNaturalPond({ x: p.x, z: p.z }, 0.3)) {
            onPetalTouchdown?.(p.x, p.z);
          }
        }
        p.landedTimer += safeDt;
        p.mesh.rotation.set(-Math.PI / 2, p.swayPhase, 0);
        p.mesh.position.set(p.x, floorY, p.z);
        if (p.landedTimer > 1.8) {
          p.x = p.originX;
          p.z = p.originZ;
          p.y = 2.6 + (p.swayPhase % 0.8);
          p.landedTimer = 0;
          p.spawnedRipple = false;
        }
      }
    }

    for (const m of dustMotes) {
      m.mesh.position.set(
        m.baseX + Math.sin(elapsed * m.speed + m.phase) * 0.24,
        m.baseY + Math.cos(elapsed * m.speed * 0.75 + m.phase) * 0.16,
        m.baseZ + Math.sin(elapsed * m.speed * 0.6 + m.phase * 1.4) * 0.2,
      );
    }
  };

  return {
    group,
    update,
    dispose: () => disposables.forEach((d) => d.dispose()),
  };
}

export { createGardenEnvironment };
