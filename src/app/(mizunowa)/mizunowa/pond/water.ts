import * as THREE from 'three/webgpu';
import { uniform } from 'three/tsl';
import {
  MAX_ACTIVE_RIPPLES,
  MAX_SHADER_RIPPLES,
  NATURAL_POND_RX,
  NATURAL_POND_RZ,
  RIPPLE_DURATION,
  RIPPLE_MIN_RADIUS,
  SubmergedObstacle,
  isInsideNaturalPond,
  naturalPondNormalizedRadius,
  pondBedElevation,
  pondContourScale,
  type FoodPellet,
} from './model';
import {
  FloatUniform,
  Vec4Uniform,
  createPondBedMaterial,
  createRippleRingMaterial,
  createSubmergedStoneMaterial,
  createWaterSurfaceMaterial,
} from './materials';
import type { ExclusionFootprint } from './placement';
import type { PondQuality, PondTextureSuite } from './textures';

interface RippleSlot {
  active: boolean;
  startElapsed: number;
  x: number;
  z: number;
  maxR: number;
  frozenProgress: number | null;
  mesh: THREE.Mesh;
  material: THREE.MeshBasicNodeMaterial;
  opacityUniform: FloatUniform;
}

export interface SubmergedStoneSpec {
  x: number;
  z: number;
  sx: number;
  sy: number;
  sz: number;
  seed: number;
  rot: number;
}

/**
 * Single source of truth for submerged river stones inside the pond basin.
 * Positioned strictly clear of the right-bank waterfall landing channel around (2.24, 0.46)
 * and seated deep enough that stone crowns remain submerged beneath y = 0.
 */
export const SUBMERGED_STONE_SPECS: readonly SubmergedStoneSpec[] = [
  { x: -1.42, z: 1.05, sx: 0.42, sy: 0.2, sz: 0.36, seed: 1.4, rot: 0.4 },
  { x: 1.32, z: -0.88, sx: 0.38, sy: 0.19, sz: 0.32, seed: 2.8, rot: 1.7 },
  { x: 0.46, z: 1.92, sx: 0.35, sy: 0.17, sz: 0.29, seed: 4.1, rot: 2.3 },
  { x: -1.18, z: -1.42, sx: 0.36, sy: 0.18, sz: 0.3, seed: 5.5, rot: 0.9 },
  { x: 1.42, z: 1.18, sx: 0.36, sy: 0.18, sz: 0.29, seed: 6.7, rot: 2.9 },
  { x: -0.28, z: -2.42, sx: 0.32, sy: 0.17, sz: 0.28, seed: 8.2, rot: 1.1 },
  // Shallow submerged river stones pulled inward into deep basin zones so none breach water surface
  { x: -1.68, z: 1.72, sx: 0.4, sy: 0.15, sz: 0.34, seed: 9.4, rot: 0.3 },
  { x: -1.52, z: 2.38, sx: 0.36, sy: 0.14, sz: 0.3, seed: 10.7, rot: 2.1 },
  { x: -1.72, z: 0.14, sx: 0.38, sy: 0.15, sz: 0.32, seed: 11.9, rot: 1.5 },
  { x: 1.88, z: -0.34, sx: 0.3, sy: 0.14, sz: 0.26, seed: 13.1, rot: 2.6 },
  { x: 1.84, z: 1.44, sx: 0.28, sy: 0.14, sz: 0.24, seed: 16.2, rot: 0.9 },
  { x: 0.78, z: -2.62, sx: 0.3, sy: 0.14, sz: 0.25, seed: 14.3, rot: 0.7 },
  { x: -0.78, z: 2.58, sx: 0.32, sy: 0.14, sz: 0.26, seed: 15.6, rot: 1.9 },
];

export function computeSubmergedStonePlacement(spec: SubmergedStoneSpec): {
  centerY: number;
  topY: number;
  baseY: number;
} {
  const baseBedY = pondBedElevation(spec.x, spec.z);
  const maxCrownOffset = spec.sy * 0.76;
  const maxAllowedCenterY = -0.065 - maxCrownOffset;
  const centerY = Math.min(baseBedY + spec.sy * 0.2, maxAllowedCenterY);
  return {
    centerY,
    topY: centerY + maxCrownOffset,
    baseY: centerY - spec.sy * 0.6,
  };
}

export function getSubmergedStoneFootprints(): ExclusionFootprint[] {
  return SUBMERGED_STONE_SPECS.map((spec, idx) => {
    const { topY, baseY } = computeSubmergedStonePlacement(spec);
    return {
      id: `submerged-stone-${idx}`,
      kind: 'submergedRock',
      x: spec.x,
      z: spec.z,
      rx: spec.sx * 1.32,
      rz: spec.sz * 1.32,
      yaw: spec.rot,
      margin: 0.06,
      baseY,
      topY,
    };
  });
}

export const SUBMERGED_OBSTACLES: readonly SubmergedObstacle[] = [
  { x: -1.42, z: 1.05, r: 0.42 },
  { x: 1.32, z: -0.88, r: 0.4 },
  { x: 0.46, z: 1.92, r: 0.36 },
  { x: -1.18, z: -1.42, r: 0.38 },
  { x: 1.48, z: 1.15, r: 0.38 },
  { x: -0.28, z: -2.42, r: 0.34 },
];

export interface PondWaterRig {
  group: THREE.Group;
  hitMesh: THREE.Mesh;
  waterMesh: THREE.Mesh;
  spawnRipple: (
    x: number,
    z: number,
    elapsed: number,
    isPaused: boolean,
    strength?: number,
    showSubtleRing?: boolean,
  ) => boolean;
  syncPellets: (pellets: readonly FoodPellet[], elapsed: number) => void;
  update: (elapsed: number) => void;
  dispose: () => void;
}

function createNaturalBasinGeometry(
  rx: number,
  rz: number,
  angularSegs: number,
  radialSegs: number,
): THREE.BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let r = 0; r <= radialSegs; r++) {
    const t = r / radialSegs;
    for (let a = 0; a <= angularSegs; a++) {
      const theta = (a / angularSegs) * Math.PI * 2;
      const scale = pondContourScale(theta);
      const x = Math.cos(theta) * rx * scale * t;
      const z = Math.sin(theta) * rz * scale * t;
      const y = pondBedElevation(x, z);
      positions.push(x, y, z);
      uvs.push(x * 0.2 + 0.5, z * 0.2 + 0.5);
    }
  }

  const stride = angularSegs + 1;
  for (let r = 0; r < radialSegs; r++) {
    for (let a = 0; a < angularSegs; a++) {
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
 * Water disk in local XY plane (z=0), intended for rotation.x = -Math.PI / 2
 * so local +Z points to world +Y (required by TSL reflector()).
 */
function createNaturalWaterDiskGeometry(
  rx: number,
  rz: number,
  angularSegs: number,
  radialSegs: number,
): THREE.BufferGeometry {
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let r = 0; r <= radialSegs; r++) {
    const t = r / radialSegs;
    for (let a = 0; a <= angularSegs; a++) {
      const theta = (a / angularSegs) * Math.PI * 2;
      const scale = pondContourScale(theta);
      const wx = Math.cos(theta) * rx * scale * t;
      const wz = Math.sin(theta) * rz * scale * t;
      // Since rotation.x = -PI/2 maps (x, y, 0) -> (x, 0, -y), set local y = -wz
      positions.push(wx, -wz, 0);
      uvs.push(wx / (rx * 2) + 0.5, wz / (rz * 2) + 0.5);
    }
  }

  const stride = angularSegs + 1;
  for (let r = 0; r < radialSegs; r++) {
    for (let a = 0; a < angularSegs; a++) {
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

export function sculptBoulderGeometry(radius: number, detail: number, seed: number): THREE.BufferGeometry {
  const geo = new THREE.IcosahedronGeometry(radius, detail);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const n1 = Math.sin(v.x * 2.8 + seed) * Math.cos(v.z * 2.4 - seed * 0.6);
    const n2 = Math.cos(v.y * 3.7 + v.x * 2.1 + seed * 1.3);
    const strata = Math.sin(v.y * 6.5 + v.x * 1.4 + seed) * 0.055;
    const disp = 1 + n1 * 0.22 + n2 * 0.13 + strata;
    v.multiplyScalar(disp);
    // Natural flat cleavage plane on upper face & grounded underside
    if (v.y > radius * 0.48) {
      v.y = radius * 0.48 + (v.y - radius * 0.48) * 0.32;
    }
    if (v.y < 0) v.y *= 0.52;
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  geo.computeVertexNormals();
  return geo;
}

export function createPondWaterRig(
  elapsedUniform: FloatUniform,
  textures: PondTextureSuite,
  sunDirection: THREE.Vector3,
  quality: PondQuality,
  isSoftwareGl: boolean,
): PondWaterRig {
  const group = new THREE.Group();
  const disposables: Array<{ dispose: () => void }> = [];

  // 1. Sculpted concave natural pond bed with river gravel + caustics (tucked inside shore collar)
  const bedGeo = createNaturalBasinGeometry(
    NATURAL_POND_RX * 1.015,
    NATURAL_POND_RZ * 1.015,
    quality === 'desktop' ? 84 : 56,
    quality === 'desktop' ? 18 : 12,
  );
  const bedMat = createPondBedMaterial(textures, elapsedUniform);
  const bedMesh = new THREE.Mesh(bedGeo, bedMat);
  bedMesh.receiveShadow = true;
  group.add(bedMesh);
  disposables.push(bedGeo, bedMat);

  // 2. Varied submerged weathered river stones + pebble clusters (with caustics)
  const subStoneMat = createSubmergedStoneMaterial(textures, elapsedUniform);
  disposables.push(subStoneMat);

  SUBMERGED_STONE_SPECS.forEach((spec) => {
    const geo = sculptBoulderGeometry(1, 2, spec.seed);
    const mesh = new THREE.Mesh(geo, subStoneMat);
    const { centerY } = computeSubmergedStonePlacement(spec);
    mesh.position.set(spec.x, centerY, spec.z);
    mesh.scale.set(spec.sx, spec.sy, spec.sz);
    mesh.rotation.set(0.04, spec.rot, -0.03);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    group.add(mesh);
    disposables.push(geo);
  });

  // 3. TSL Shader ripple ring buffer uniforms
  const rippleUniforms: Vec4Uniform[] = [];
  for (let i = 0; i < MAX_SHADER_RIPPLES; i++) {
    rippleUniforms.push(uniform(new THREE.Vector4(0, 0, -999, 0)));
  }
  let nextShaderRippleIdx = 0;

  // 4. Real-time physical water surface mesh (refraction + depth absorption + dual normals + planar reflection)
  const waterGeo = createNaturalWaterDiskGeometry(
    NATURAL_POND_RX * 1.02,
    NATURAL_POND_RZ * 1.02,
    quality === 'desktop' ? 84 : 56,
    quality === 'desktop' ? 22 : 14,
  );
  const usePlanarReflector = true;
  const reflectionScale = isSoftwareGl ? 0.38 : quality === 'desktop' ? 0.62 : 0.45;
  const waterMatHandle = createWaterSurfaceMaterial(
    textures,
    elapsedUniform,
    rippleUniforms,
    sunDirection,
    usePlanarReflector,
    reflectionScale,
  );

  const waterMesh = new THREE.Mesh(waterGeo, waterMatHandle.material);
  waterMesh.rotation.x = -Math.PI / 2;
  waterMesh.position.y = 0;
  waterMesh.renderOrder = 2;
  if (waterMatHandle.reflectorTarget) {
    waterMesh.add(waterMatHandle.reflectorTarget);
  }
  group.add(waterMesh);
  disposables.push(waterGeo, waterMatHandle.material);

  // 5. Raycast hit plane (invisible)
  const hitGeo = new THREE.PlaneGeometry(NATURAL_POND_RX * 2.4, NATURAL_POND_RZ * 2.4);
  hitGeo.rotateX(-Math.PI / 2);
  const hitMat = new THREE.MeshBasicNodeMaterial({
    transparent: true,
    opacity: 0,
    depthWrite: false,
    colorWrite: false,
  });
  const hitMesh = new THREE.Mesh(hitGeo, hitMat);
  hitMesh.position.y = 0;
  hitMesh.visible = true;
  group.add(hitMesh);
  disposables.push(hitGeo, hitMat);

  // 6. Subtle paper sheen rings for user click emphasis (soft, never cartoony)
  const ringGeo = new THREE.RingGeometry(0.92, 1.0, 48);
  ringGeo.rotateX(-Math.PI / 2);
  disposables.push(ringGeo);

  const slots: RippleSlot[] = [];
  let nextSlotIndex = 0;

  for (let i = 0; i < MAX_ACTIVE_RIPPLES; i++) {
    const opacityUniform = uniform(0);
    const ringMat = createRippleRingMaterial(opacityUniform);
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.y = 0.012 + i * 0.001;
    ringMesh.visible = false;
    ringMesh.renderOrder = 3;
    group.add(ringMesh);
    disposables.push(ringMat);

    slots.push({
      active: false,
      startElapsed: 0,
      x: 0,
      z: 0,
      maxR: 0.5,
      frozenProgress: null,
      mesh: ringMesh,
      material: ringMat,
      opacityUniform,
    });
  }

  // 7. Reusable floating koi food pellet meshes
  const pelletGeo = new THREE.SphereGeometry(0.036, 10, 8);
  const pelletMat = new THREE.MeshStandardNodeMaterial({
    color: 0xc28a4f,
    roughness: 0.72,
    metalness: 0.02,
  });
  const maxPelletMeshes = 8;
  const pelletMeshes: THREE.Mesh[] = [];
  for (let i = 0; i < maxPelletMeshes; i++) {
    const pm = new THREE.Mesh(pelletGeo, pelletMat);
    pm.visible = false;
    pm.renderOrder = 3;
    group.add(pm);
    pelletMeshes.push(pm);
  }
  disposables.push(pelletGeo, pelletMat);

  const updateSlot = (slot: RippleSlot, elapsed: number) => {
    if (!slot.active) {
      slot.mesh.visible = false;
      return;
    }

    const progress =
      slot.frozenProgress !== null
        ? slot.frozenProgress
        : (elapsed - slot.startElapsed) / RIPPLE_DURATION;

    if (progress < 0 || progress >= 1) {
      slot.active = false;
      slot.frozenProgress = null;
      slot.mesh.visible = false;
      slot.opacityUniform.value = 0;
      return;
    }

    const eased = 1 - Math.pow(1 - progress, 2.2);
    const radius = RIPPLE_MIN_RADIUS + (slot.maxR - RIPPLE_MIN_RADIUS) * eased;
    slot.mesh.scale.set(radius, 1, radius);
    slot.opacityUniform.value = Math.pow(1 - progress, 1.55) * 0.22;
    slot.mesh.visible = true;
  };

  const spawnRipple = (
    x: number,
    z: number,
    elapsed: number,
    isPaused: boolean,
    strength = 1.0,
    showSubtleRing = true,
  ): boolean => {
    if (!isInsideNaturalPond({ x, z })) {
      return false;
    }

    // Feed directly into physical normal-perturbing shader ripple buffer
    const slotUniform = rippleUniforms[nextShaderRippleIdx];
    nextShaderRippleIdx = (nextShaderRippleIdx + 1) % MAX_SHADER_RIPPLES;
    const effectiveStart = isPaused ? elapsed - 0.35 : elapsed;
    slotUniform.value.set(x, z, effectiveStart, Math.max(0.15, Math.min(1.4, strength)));

    if (!showSubtleRing) return true;

    const rho = naturalPondNormalizedRadius({ x, z });
    const allowedMax = Math.max(0, Math.min(0.85, 0.9 * Math.min(NATURAL_POND_RX, NATURAL_POND_RZ) * (1 - rho)));
    if (allowedMax <= RIPPLE_MIN_RADIUS) {
      return true;
    }

    const slot = slots[nextSlotIndex];
    nextSlotIndex = (nextSlotIndex + 1) % MAX_ACTIVE_RIPPLES;

    slot.active = true;
    slot.x = x;
    slot.z = z;
    slot.maxR = allowedMax * Math.min(1, 0.55 + strength * 0.45);

    if (isPaused) {
      slot.frozenProgress = 0.28;
      slot.startElapsed = elapsed - slot.frozenProgress * RIPPLE_DURATION;
    } else {
      slot.frozenProgress = null;
      slot.startElapsed = elapsed;
    }

    slot.mesh.position.set(x, 0.012, z);
    slot.mesh.visible = true;
    updateSlot(slot, elapsed);
    return true;
  };

  const syncPellets = (pellets: readonly FoodPellet[], elapsed: number) => {
    const active = pellets.filter((p) => !p.eaten);
    for (let i = 0; i < maxPelletMeshes; i++) {
      const pm = pelletMeshes[i];
      const p = active[i];
      if (!p) {
        pm.visible = false;
      } else {
        pm.visible = true;
        const bob = Math.sin(elapsed * 3.8 + p.id * 1.3) * 0.004;
        pm.position.set(p.x, 0.008 + bob, p.z);
        pm.scale.set(1, 0.72, 1);
      }
    }
  };

  const update = (elapsed: number) => {
    for (const slot of slots) {
      if (slot.active) {
        if (
          slot.frozenProgress !== null &&
          elapsed > slot.startElapsed + slot.frozenProgress * RIPPLE_DURATION + 1e-4
        ) {
          slot.startElapsed = elapsed - slot.frozenProgress * RIPPLE_DURATION;
          slot.frozenProgress = null;
        }
        updateSlot(slot, elapsed);
      }
    }
  };

  const dispose = () => {
    for (const d of disposables) {
      d.dispose();
    }
  };

  return { group, hitMesh, waterMesh, spawnRipple, syncPellets, update, dispose };
}
