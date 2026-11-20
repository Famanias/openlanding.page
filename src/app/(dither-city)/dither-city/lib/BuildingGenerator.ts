import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { createSeededRandom } from './cityConfig';

export type BuildingClass =
  | 'industrial_monolith'
  | 'brutalist_monolith'
  | 'scaffolding_tower'
  | 'antenna_spire'
  | 'sculptural_dome_tower'
  | 'distant_silhouette';

export interface BuildingDescriptor {
  id: string;
  buildingClass: BuildingClass;
  position: [number, number, number];
  rotationY: number;
  width: number;
  height: number;
  depth: number;
  layer: 'foreground' | 'midground' | 'distant';
}

export interface AnimatedWindowSlot {
  position: [number, number, number];
  rotationY: number;
  width: number;
  height: number;
  phase: number;
  speed: number;
  isGreen: boolean;
}

export interface GreenWashPlane {
  position: [number, number, number];
  rotation: [number, number, number];
  width: number;
  height: number;
  intensity: number;
  phase: number;
}

export interface GeneratedCityData {
  /** Primary lit/shaded brutalist architectural shells (merged for minimal draw calls) */
  mainGeometry: THREE.BufferGeometry;
  /** Dark mechanical housings, recessed vents, window frames, heavy dark steel */
  darkDetailGeometry: THREE.BufferGeometry;
  /** External scaffolding trusses, cross-bracing, ladders, antennas */
  scaffoldGeometry: THREE.BufferGeometry;
  /** Crisp acid-green structural edge seams, truss light rails, glowing vents */
  accentGeometry: THREE.BufferGeometry;
  /** Distant low-contrast architectural silhouettes */
  distantGeometry: THREE.BufferGeometry;
  /** Metadata for intermittent window illumination */
  animatedWindows: AnimatedWindowSlot[];
  /** Soft localized green architectural wall-wash strips (dithered in post) */
  greenWashPlanes: GreenWashPlane[];
  /** Building catalog for verification and inspection */
  buildings: BuildingDescriptor[];
}

interface GeometryBuckets {
  main: THREE.BufferGeometry[];
  dark: THREE.BufferGeometry[];
  scaffold: THREE.BufferGeometry[];
  accent: THREE.BufferGeometry[];
  distant: THREE.BufferGeometry[];
  windows: AnimatedWindowSlot[];
  washes: GreenWashPlane[];
}

const _mat4 = new THREE.Matrix4();
const _quat = new THREE.Quaternion();
const _euler = new THREE.Euler();
const _pos = new THREE.Vector3();
const _scale = new THREE.Vector3();

/**
 * Normalizes a BufferGeometry to non-indexed with position, normal, uv, and vertex color
 * so mergeGeometries succeeds reliably across boxes, cylinders, spheres, and cones.
 */
function prepareGeo(
  raw: THREE.BufferGeometry,
  matrix: THREE.Matrix4,
  shade: number,
  tintG = 0,
): THREE.BufferGeometry {
  const geo = raw.index ? raw.toNonIndexed() : raw.clone();
  raw.dispose();
  geo.applyMatrix4(matrix);

  if (!geo.attributes.normal) {
    geo.computeVertexNormals();
  }
  const count = geo.attributes.position.count;
  if (!geo.attributes.uv) {
    const uvs = new Float32Array(count * 2);
    geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  }

  const colors = new Float32Array(count * 3);
  const r = Math.min(1, Math.max(0, shade));
  const g = Math.min(1, Math.max(0, shade + tintG));
  const b = Math.min(1, Math.max(0, shade * 0.96));
  for (let i = 0; i < count; i++) {
    colors[i * 3] = r;
    colors[i * 3 + 1] = g;
    colors[i * 3 + 2] = b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  return geo;
}

function makeTransform(
  parentMat: THREE.Matrix4,
  lx: number,
  ly: number,
  lz: number,
  rx = 0,
  ry = 0,
  rz = 0,
): THREE.Matrix4 {
  _pos.set(lx, ly, lz);
  _euler.set(rx, ry, rz);
  _quat.setFromEuler(_euler);
  _scale.set(1, 1, 1);
  _mat4.compose(_pos, _quat, _scale);
  return new THREE.Matrix4().multiplyMatrices(parentMat, _mat4);
}

function addBox(
  target: THREE.BufferGeometry[],
  parentMat: THREE.Matrix4,
  w: number,
  h: number,
  d: number,
  lx: number,
  ly: number,
  lz: number,
  shade = 0.85,
  rx = 0,
  ry = 0,
  rz = 0,
  tintG = 0,
) {
  const box = new THREE.BoxGeometry(w, h, d);
  const m = makeTransform(parentMat, lx, ly, lz, rx, ry, rz);
  target.push(prepareGeo(box, m, shade, tintG));
}

function addCylinder(
  target: THREE.BufferGeometry[],
  parentMat: THREE.Matrix4,
  rTop: number,
  rBot: number,
  h: number,
  segs: number,
  lx: number,
  ly: number,
  lz: number,
  shade = 0.8,
  rx = 0,
  ry = 0,
  rz = 0,
) {
  const cyl = new THREE.CylinderGeometry(rTop, rBot, h, segs);
  const m = makeTransform(parentMat, lx, ly, lz, rx, ry, rz);
  target.push(prepareGeo(cyl, m, shade));
}

function addSphere(
  target: THREE.BufferGeometry[],
  parentMat: THREE.Matrix4,
  radius: number,
  wSeg: number,
  hSeg: number,
  lx: number,
  ly: number,
  lz: number,
  sx: number,
  sy: number,
  sz: number,
  shade = 0.9,
) {
  const sph = new THREE.SphereGeometry(radius, wSeg, hSeg);
  sph.scale(sx, sy, sz);
  const m = makeTransform(parentMat, lx, ly, lz);
  target.push(prepareGeo(sph, m, shade));
}

/**
 * Adds a 3D steel lattice truss tower section with corner columns, horizontal rings,
 * and alternating diagonal X-braces.
 */
function addTrussColumn(
  target: THREE.BufferGeometry[],
  parentMat: THREE.Matrix4,
  cx: number,
  yBottom: number,
  cz: number,
  w: number,
  d: number,
  height: number,
  bays: number,
  beamThick = 0.09,
  shade = 0.35,
  accentTarget?: THREE.BufferGeometry[],
  accentProbability = 0,
  rand?: () => number,
) {
  const hw = w * 0.5;
  const hd = d * 0.5;
  const midY = yBottom + height * 0.5;

  // 4 vertical corner stanchions
  const corners: [number, number][] = [
    [-hw, -hd],
    [hw, -hd],
    [-hw, hd],
    [hw, hd],
  ];
  for (const [ox, oz] of corners) {
    addBox(target, parentMat, beamThick, height, beamThick, cx + ox, midY, cz + oz, shade);
  }

  const bayH = height / bays;
  const diagLenX = Math.hypot(w, bayH);
  const diagAngleX = Math.atan2(bayH, w);
  const diagLenZ = Math.hypot(d, bayH);
  const diagAngleZ = Math.atan2(bayH, d);

  for (let i = 0; i <= bays; i++) {
    const y = yBottom + i * bayH;
    // Horizontal ring rails
    addBox(target, parentMat, w, beamThick * 0.85, beamThick * 0.85, cx, y, cz + hd, shade);
    addBox(target, parentMat, w, beamThick * 0.85, beamThick * 0.85, cx, y, cz - hd, shade);
    addBox(target, parentMat, beamThick * 0.85, beamThick * 0.85, d, cx - hw, y, cz, shade);
    addBox(target, parentMat, beamThick * 0.85, beamThick * 0.85, d, cx + hw, y, cz, shade);

    if (i < bays) {
      const bayMidY = y + bayH * 0.5;
      const useAccent =
        accentTarget && rand && accentProbability > 0 && rand() < accentProbability;
      const braceTarget = useAccent ? accentTarget : target;
      const braceThick = useAccent ? beamThick * 0.72 : beamThick * 0.68;

      // Front face X-bracing
      addBox(
        braceTarget,
        parentMat,
        diagLenX,
        braceThick,
        braceThick,
        cx,
        bayMidY,
        cz + hd,
        shade,
        0,
        0,
        diagAngleX,
      );
      addBox(
        braceTarget,
        parentMat,
        diagLenX,
        braceThick,
        braceThick,
        cx,
        bayMidY,
        cz + hd,
        shade,
        0,
        0,
        -diagAngleX,
      );

      // Left face diagonal
      addBox(
        braceTarget,
        parentMat,
        braceThick,
        braceThick,
        diagLenZ,
        cx - hw,
        bayMidY,
        cz,
        shade,
        diagAngleZ,
        0,
        0,
      );

      // Right face diagonal
      addBox(
        target,
        parentMat,
        braceThick,
        braceThick,
        diagLenZ,
        cx + hw,
        bayMidY,
        cz,
        shade,
        -diagAngleZ,
        0,
        0,
      );
    }
  }
}

/**
 * Adds an external steel maintenance ladder along a facade.
 */
function addLadder(
  target: THREE.BufferGeometry[],
  parentMat: THREE.Matrix4,
  x: number,
  yBottom: number,
  z: number,
  height: number,
  facingZ = true,
) {
  const railSpread = 0.24;
  const railThick = 0.045;
  const midY = yBottom + height * 0.5;
  const rungs = Math.max(4, Math.floor(height / 0.65));

  if (facingZ) {
    addBox(target, parentMat, railThick, height, railThick, x - railSpread * 0.5, midY, z, 0.25);
    addBox(target, parentMat, railThick, height, railThick, x + railSpread * 0.5, midY, z, 0.25);
    for (let i = 0; i < rungs; i++) {
      const ry = yBottom + 0.3 + i * (height / rungs);
      addBox(target, parentMat, railSpread, railThick * 0.8, railThick * 0.8, x, ry, z, 0.25);
    }
  } else {
    addBox(target, parentMat, railThick, height, railThick, x, midY, z - railSpread * 0.5, 0.25);
    addBox(target, parentMat, railThick, height, railThick, x, midY, z + railSpread * 0.5, 0.25);
    for (let i = 0; i < rungs; i++) {
      const ry = yBottom + 0.3 + i * (height / rungs);
      addBox(target, parentMat, railThick * 0.8, railThick * 0.8, railSpread, x, ry, z, 0.25);
    }
  }
}

/**
 * Transforms a local point into world space for animated window slots or wash planes.
 */
function localToWorld(
  parentMat: THREE.Matrix4,
  lx: number,
  ly: number,
  lz: number,
): [number, number, number] {
  const v = new THREE.Vector3(lx, ly, lz).applyMatrix4(parentMat);
  return [v.x, v.y, v.z];
}

function buildTowerMatrix(
  position: [number, number, number],
  rotationY: number,
): THREE.Matrix4 {
  const m = new THREE.Matrix4();
  _pos.set(position[0], position[1], position[2]);
  _euler.set(0, rotationY, 0);
  _quat.setFromEuler(_euler);
  _scale.set(1, 1, 1);
  m.compose(_pos, _quat, _scale);
  return m;
}

/**
 * TOWER D: Center-Right Colossal Overhanging Armored Megastructure
 * Extends well above the top of the viewport and below the bottom edge.
 */
function buildHeroMegastructure(
  buckets: GeometryBuckets,
  rand: () => number,
): BuildingDescriptor {
  const position: [number, number, number] = [7.4, -9.8, 5.2];
  const rotationY = -0.64;
  const parent = buildTowerMatrix(position, rotationY);

  // 1. LOWER ARMORED PODIUM & STEPPED BUTTRESS (y = 0..14.8)
  addBox(buckets.main, parent, 4.7, 14.8, 4.9, 0, 7.4, 0, 0.9);
  // Slanted lower buttress skirt on front-left
  addBox(buckets.dark, parent, 2.2, 7.6, 2.6, -2.0, 3.2, 1.5, 0.16, 0, 0, -0.22);
  // Heavy overhanging left-front mid-podium armor block (iconic blocky silhouette)
  addBox(buckets.main, parent, 2.8, 5.8, 3.3, -1.85, 11.2, 1.5, 0.72);
  addBox(buckets.dark, parent, 2.92, 0.35, 3.42, -1.85, 14.1, 1.5, 0.14);
  addBox(buckets.dark, parent, 2.92, 0.35, 3.42, -1.85, 8.3, 1.5, 0.14);

  // Illuminated right face: 5 rows of recessed dark industrial window strips + mullions
  for (let row = 0; row < 5; row++) {
    const ry = 8.4 + row * 1.15;
    addBox(buckets.dark, parent, 0.24, 0.56, 4.0, 2.32, ry, 0, 0.1);
    for (let col = -4; col <= 4; col++) {
      const cz = col * 0.42;
      addBox(buckets.main, parent, 0.28, 0.62, 0.14, 2.34, ry, cz, 0.96);
      if (rand() < 0.28) {
        buckets.windows.push({
          position: localToWorld(parent, 2.48, ry, cz + 0.21),
          rotationY: rotationY + Math.PI * 0.5,
          width: 0.26,
          height: 0.4,
          phase: rand() * Math.PI * 2,
          speed: 0.18 + rand() * 0.35,
          isGreen: rand() < 0.2,
        });
      }
    }
  }

  // Front face lower diagonal bracing & recessed industrial plate seams
  addTrussColumn(
    buckets.scaffold,
    parent,
    0.1,
    1.2,
    2.66,
    2.5,
    0.42,
    7.2,
    3,
    0.075,
    0.32,
    buckets.accent,
    0.24,
    rand,
  );

  // Fine acid-green illumination seams & organic vertical wall washes
  addBox(buckets.accent, parent, 0.06, 12.2, 0.06, -2.38, 7.2, 2.46, 1.0);
  addBox(buckets.accent, parent, 0.05, 5.4, 0.05, -3.26, 11.2, 3.16, 1.0);
  addBox(buckets.accent, parent, 0.06, 9.8, 0.06, 0.35, 6.2, 2.52, 1.0);

  buckets.washes.push(
    {
      position: localToWorld(parent, 0.1, 4.6, 2.56),
      rotation: [0, rotationY, 0],
      width: 2.3,
      height: 11.5,
      intensity: 0.85,
      phase: 0.4,
    },
    {
      position: localToWorld(parent, -2.44, 11.2, 1.5),
      rotation: [0, rotationY - Math.PI * 0.5, 0],
      width: 2.2,
      height: 7.0,
      intensity: 0.72,
      phase: 1.9,
    },
  );

  // 2. RECESSED MECHANICAL WAIST & EXPOSED STEEL TRUSSES (y = 14.8..23.2)
  addCylinder(buckets.main, parent, 1.32, 1.42, 8.6, 14, 0, 19.0, 0, 0.86);
  for (let i = 0; i < 6; i++) {
    const cy = 15.6 + i * 1.35;
    addCylinder(buckets.dark, parent, 1.56, 1.56, 0.28, 14, 0, cy, 0, 0.2);
  }
  for (const [px, pz] of [
    [-1.35, 0.85],
    [1.35, 0.85],
    [1.48, -0.45],
    [-1.35, -0.85],
  ]) {
    addCylinder(buckets.dark, parent, 0.19, 0.19, 8.4, 8, px, 19.0, pz, 0.3);
  }

  // Exposed external lattice truss towers flanking both sides of the waist
  addTrussColumn(
    buckets.scaffold,
    parent,
    -2.05,
    14.8,
    0.15,
    1.1,
    2.2,
    8.4,
    6,
    0.085,
    0.34,
    buckets.accent,
    0.16,
    rand,
  );
  addTrussColumn(
    buckets.scaffold,
    parent,
    2.05,
    14.8,
    0.15,
    1.1,
    2.2,
    8.4,
    6,
    0.085,
    0.45,
  );
  addLadder(buckets.scaffold, parent, -1.48, 14.8, 1.58, 8.4, true);

  // Acid-green backlight glowing inside the mechanical waist
  addBox(buckets.accent, parent, 0.08, 7.6, 0.08, -1.48, 18.8, 1.38, 1.0);
  buckets.washes.push({
    position: localToWorld(parent, -0.45, 16.5, 1.65),
    rotation: [0, rotationY, 0],
    width: 2.5,
    height: 7.4,
    intensity: 0.92,
    phase: 2.7,
  });

  // 3. COLOSSAL OVERHANGING UPPER ARMORED HEAD (y = 23.2..43.0 — extends past viewport top!)
  addBox(buckets.main, parent, 4.9, 19.8, 5.0, 0, 33.1, 0, 0.94);
  addBox(buckets.dark, parent, 5.15, 0.78, 5.25, 0, 23.4, 0, 0.14);
  addBox(buckets.main, parent, 2.1, 15.0, 0.68, 1.1, 32.5, 2.65, 0.86);
  addBox(buckets.dark, parent, 0.52, 16.5, 0.42, -0.2, 32.8, 2.56, 0.14);

  // Iconic illuminated right-side mechanical panels & circular intake port
  addBox(buckets.dark, parent, 0.28, 4.8, 2.8, 2.42, 27.6, 0.2, 0.12);
  addCylinder(
    buckets.main,
    parent,
    1.02,
    1.02,
    0.4,
    16,
    2.48,
    27.6,
    0.2,
    0.96,
    0,
    0,
    Math.PI * 0.5,
  );
  addCylinder(
    buckets.dark,
    parent,
    0.64,
    0.64,
    0.48,
    16,
    2.52,
    27.6,
    0.2,
    0.08,
    0,
    0,
    Math.PI * 0.5,
  );
  for (let i = 0; i < 4; i++) {
    const sy = 31.2 + i * 2.2;
    addBox(buckets.dark, parent, 0.2, 0.26, 4.6, 2.46, sy, 0, 0.18);
    addBox(buckets.main, parent, 0.42, 1.4, 1.5, 2.58, sy + 0.9, -1.0, 0.98);
    if (rand() < 0.5) {
      buckets.windows.push({
        position: localToWorld(parent, 2.58, sy + 0.3, 1.25),
        rotationY: rotationY + Math.PI * 0.5,
        width: 1.0,
        height: 0.2,
        phase: rand() * Math.PI * 2,
        speed: 0.22 + rand() * 0.25,
        isGreen: false,
      });
    }
  }

  // Slender acid-green edge seam climbing upper-left corner & underside overhang
  addBox(buckets.accent, parent, 0.065, 14.5, 0.065, -2.46, 30.8, 2.48, 1.0);
  addBox(buckets.accent, parent, 4.4, 0.055, 0.055, -0.2, 23.02, 2.56, 1.0);
  buckets.washes.push({
    position: localToWorld(parent, -2.5, 29.4, 1.6),
    rotation: [0, rotationY - Math.PI * 0.5, 0],
    width: 1.6,
    height: 10.5,
    intensity: 0.72,
    phase: 4.1,
  });

  return {
    id: 'tower-d-hero-megastructure',
    buildingClass: 'scaffolding_tower',
    position,
    rotationY,
    width: 5.0,
    height: 43.0,
    depth: 5.2,
    layer: 'foreground',
  };
}

/**
 * TOWER C: Mid-Center Wide Brutalist Monolith with Cantilevered Right Annex
 * Cuts boldly across the right edge of the ringed planet with a bright lit right facade.
 */
function buildBrutalistMonolith(
  buckets: GeometryBuckets,
  rand: () => number,
): BuildingDescriptor {
  const position: [number, number, number] = [3.6, -8.5, -3.6];
  const rotationY = -0.66;
  const parent = buildTowerMatrix(position, rotationY);

  // Main towering brutalist slab (y = 0..26.0 -> world top y = 17.5)
  addBox(buckets.main, parent, 3.1, 26.0, 3.5, 0, 13.0, 0, 0.94);
  addBox(buckets.dark, parent, 2.5, 0.6, 2.9, -0.1, 26.25, 0, 0.2);

  // Iconic cantilevered right-flank annex slab (brightly lit in aged paper / bone)
  addBox(buckets.main, parent, 1.7, 13.4, 2.6, 2.1, 15.6, -0.2, 1.0);
  addBox(buckets.dark, parent, 1.76, 0.28, 2.68, 2.1, 8.85, -0.2, 0.14);

  // Architectural expansion joints & concrete seam grooves on lit right flank
  for (let i = 0; i < 6; i++) {
    const sy = 5.5 + i * 3.3;
    addBox(buckets.dark, parent, 0.1, 0.14, 3.54, 1.55, sy, 0, 0.22);
  }
  addBox(buckets.dark, parent, 0.22, 17.5, 0.38, 1.52, 16.2, 1.05, 0.14);

  // Fine horizontal acid-green seam glow near upper-mid notch & lower left accent
  addBox(buckets.accent, parent, 1.9, 0.055, 0.055, -0.5, 17.4, 1.76, 1.0);
  addBox(buckets.accent, parent, 0.055, 7.6, 0.055, -1.56, 5.8, 1.76, 1.0);
  buckets.washes.push({
    position: localToWorld(parent, -1.62, 6.2, 1.1),
    rotation: [0, rotationY - Math.PI * 0.5, 0],
    width: 1.4,
    height: 7.2,
    intensity: 0.65,
    phase: 0.9,
  });

  // Intermittent narrow vertical light slots
  for (let i = 0; i < 10; i++) {
    if (rand() < 0.65) {
      buckets.windows.push({
        position: localToWorld(parent, 2.96, 10.5 + i * 1.15, -0.2 + (rand() - 0.5) * 1.2),
        rotationY: rotationY + Math.PI * 0.5,
        width: 0.55,
        height: 0.16,
        phase: rand() * Math.PI * 2,
        speed: 0.16 + rand() * 0.28,
        isGreen: rand() < 0.16,
      });
    }
  }

  return {
    id: 'tower-c-brutalist-monolith',
    buildingClass: 'brutalist_monolith',
    position,
    rotationY,
    width: 4.4,
    height: 26.6,
    depth: 3.6,
    layer: 'midground',
  };
}

/**
 * TOWER F: Far-Right Scaffolding Megatower with Exposed External Cages & Acid-Green Rails
 */
function buildScaffoldingTower(
  buckets: GeometryBuckets,
  rand: () => number,
): BuildingDescriptor {
  const position: [number, number, number] = [17.2, -9.8, 5.4];
  const rotationY = -0.56;
  const parent = buildTowerMatrix(position, rotationY);

  // Tall dark armored structural core (y = 0..31.5 -> extends to top-right)
  addBox(buckets.main, parent, 3.8, 31.5, 4.1, 0, 15.75, 0, 0.84);
  addBox(buckets.dark, parent, 3.2, 2.4, 3.4, -0.1, 32.7, 0, 0.18);
  addBox(buckets.main, parent, 1.4, 3.0, 1.5, 0.9, 32.5, -0.8, 0.92);

  // Tall twin needle communication antennas rising off the top-right roof
  addCylinder(buckets.scaffold, parent, 0.035, 0.12, 7.5, 6, -1.1, 37.2, 0.6, 0.35);
  addCylinder(buckets.scaffold, parent, 0.025, 0.08, 5.2, 6, 0.4, 36.2, -0.5, 0.35);
  addBox(buckets.scaffold, parent, 1.4, 0.07, 0.07, -1.1, 36.2, 0.6, 0.35);

  // Lower monumental external X-braced scaffolding cage wrapping front & left faces
  addTrussColumn(
    buckets.scaffold,
    parent,
    -0.1,
    1.5,
    2.32,
    3.85,
    0.5,
    12.5,
    4,
    0.072,
    0.3,
    buckets.accent,
    0.45,
    rand,
  );
  // Upper external cantilevered gantry platforms & vertical trusses
  addTrussColumn(
    buckets.scaffold,
    parent,
    -2.16,
    13.5,
    0.6,
    0.62,
    2.5,
    12.0,
    5,
    0.068,
    0.32,
    buckets.accent,
    0.38,
    rand,
  );
  for (const by of [14.2, 18.8, 23.6, 27.4]) {
    addBox(buckets.dark, parent, 4.4, 0.3, 4.6, -0.15, by, 0.15, 0.15);
  }
  addLadder(buckets.scaffold, parent, -2.02, 2.0, 2.08, 24.0, true);

  // Razor-thin acid-green scaffolding rails & vertical left-flank light wash
  addBox(buckets.accent, parent, 0.055, 27.0, 0.055, -1.94, 15.2, 2.08, 1.0);
  addBox(buckets.accent, parent, 3.9, 0.048, 0.048, 0, 14.2, 2.44, 1.0);
  addBox(buckets.accent, parent, 3.9, 0.048, 0.048, 0, 8.0, 2.44, 1.0);
  addBox(buckets.accent, parent, 0.06, 6.2, 0.06, 1.94, 24.8, 1.45, 1.0);

  buckets.washes.push(
    {
      position: localToWorld(parent, -2.02, 11.4, 1.35),
      rotation: [0, rotationY - Math.PI * 0.5, 0],
      width: 1.7,
      height: 14.5,
      intensity: 0.72,
      phase: 3.3,
    },
    {
      position: localToWorld(parent, 1.98, 24.8, 0.5),
      rotation: [0, rotationY + Math.PI * 0.5, 0],
      width: 1.5,
      height: 6.5,
      intensity: 0.78,
      phase: 5.1,
    },
  );

  for (let i = 0; i < 12; i++) {
    if (rand() < 0.5) {
      buckets.windows.push({
        position: localToWorld(parent, 1.94, 15.0 + i * 1.25, (rand() - 0.5) * 2.6),
        rotationY: rotationY + Math.PI * 0.5,
        width: 0.75,
        height: 0.18,
        phase: rand() * Math.PI * 2,
        speed: 0.15 + rand() * 0.3,
        isGreen: rand() < 0.3,
      });
    }
  }

  return {
    id: 'tower-f-scaffolding-megatower',
    buildingClass: 'scaffolding_tower',
    position,
    rotationY,
    width: 4.5,
    height: 38.0,
    depth: 4.8,
    layer: 'foreground',
  };
}

/**
 * TOWER E: Mid-Right Asymmetrical Twin-Prong Sculptural Dome Tower
 * Positioned clearly in the dramatic corridor between Tower D and Tower F.
 */
function buildSculpturalDomeTower(
  buckets: GeometryBuckets,
  rand: () => number,
): BuildingDescriptor {
  const position: [number, number, number] = [13.2, -8.2, -1.6];
  const rotationY = -0.52;
  const parent = buildTowerMatrix(position, rotationY);

  // Tapered asymmetrical brutalist lower & mid torso (y = 0..19.5)
  addBox(buckets.main, parent, 3.1, 13.5, 3.0, 0, 6.75, 0, 0.9);
  addBox(buckets.main, parent, 2.65, 7.2, 2.7, -0.15, 16.5, 0, 0.94);
  addBox(buckets.main, parent, 2.75, 2.6, 2.75, 0.1, 13.8, 0.1, 0.96, 0, 0, -0.18);

  // Sculpted bulbous ovoid/ellipsoidal mechanical pod bulging from upper-right flank
  addSphere(buckets.main, parent, 1.65, 20, 16, 1.05, 18.6, 0.35, 0.95, 1.32, 1.0, 1.0);
  addCylinder(buckets.dark, parent, 1.54, 1.54, 0.22, 16, 1.05, 18.5, 0.35, 0.2, 0.2, 0, -0.35);

  // Split twin-prong brutalist crown rising above the dome (y = 19.6..26.4)
  addBox(buckets.main, parent, 1.08, 6.6, 2.2, -0.82, 22.9, 0, 0.92);
  addBox(buckets.main, parent, 0.88, 5.8, 2.0, 0.65, 22.5, -0.1, 0.98);

  for (let i = 0; i < 4; i++) {
    addBox(buckets.dark, parent, 2.2, 0.24, 0.24, 0, 10.2 + i * 1.45, 1.45, 0.16);
  }

  for (let i = 0; i < 6; i++) {
    if (rand() < 0.6) {
      buckets.windows.push({
        position: localToWorld(parent, 1.42, 9.8 + i * 1.35, 0.5),
        rotationY: rotationY + Math.PI * 0.5,
        width: 0.65,
        height: 0.16,
        phase: rand() * Math.PI * 2,
        speed: 0.2 + rand() * 0.25,
        isGreen: false,
      });
    }
  }

  return {
    id: 'tower-e-sculptural-dome',
    buildingClass: 'sculptural_dome_tower',
    position,
    rotationY,
    width: 3.6,
    height: 26.4,
    depth: 3.2,
    layer: 'midground',
  };
}

/**
 * TOWER A: Far-Left Midground Antenna Spire piercing the lower-left edge of the planet's rings.
 */
function buildAntennaSpire(
  buckets: GeometryBuckets,
  rand: () => number,
): BuildingDescriptor {
  const position: [number, number, number] = [-1.8, -7.8, -12.5];
  const rotationY = -0.26;
  const parent = buildTowerMatrix(position, rotationY);

  // Lower narrow tiered shaft
  addBox(buckets.main, parent, 2.0, 9.5, 2.0, 0, 4.75, 0, 0.8);
  // Projecting mid-height mechanical collar & catwalk gallery
  addBox(buckets.dark, parent, 2.9, 0.65, 2.8, 0, 9.6, 0, 0.18);
  addBox(buckets.scaffold, parent, 3.2, 0.22, 3.1, 0, 10.1, 0, 0.32);

  // Upper narrow communication block with vertical recessed vent slots
  addBox(buckets.main, parent, 1.55, 6.2, 1.55, 0, 13.0, 0, 0.88);
  addBox(buckets.dark, parent, 0.22, 4.8, 1.15, 0.72, 13.1, 0, 0.16);
  // Stepped turret crown
  addBox(buckets.main, parent, 1.0, 1.6, 1.0, 0, 16.9, 0, 0.9);
  addBox(buckets.dark, parent, 0.65, 1.1, 0.65, 0, 18.2, 0, 0.25);

  // Tall tapered main antenna needle & secondary whip + radar crossbars
  addCylinder(buckets.scaffold, parent, 0.03, 0.14, 6.4, 8, 0, 21.8, 0, 0.45);
  addCylinder(buckets.scaffold, parent, 0.02, 0.06, 3.8, 6, -0.55, 19.6, 0.2, 0.4);
  addBox(buckets.scaffold, parent, 1.35, 0.07, 0.07, 0, 20.4, 0, 0.45);
  addBox(buckets.scaffold, parent, 0.85, 0.07, 0.07, 0, 22.1, 0, 0.45);

  // External truss frame on left side of shaft
  addTrussColumn(buckets.scaffold, parent, -1.15, 4.0, 0.2, 0.45, 1.2, 8.5, 5, 0.065, 0.3);

  for (let i = 0; i < 5; i++) {
    if (rand() < 0.6) {
      buckets.windows.push({
        position: localToWorld(parent, 0.82, 10.8 + i * 1.05, 0),
        rotationY: rotationY + Math.PI * 0.5,
        width: 0.42,
        height: 0.16,
        phase: rand() * Math.PI * 2,
        speed: 0.15 + rand() * 0.2,
        isGreen: false,
      });
    }
  }

  return {
    id: 'tower-a-antenna-spire',
    buildingClass: 'antenna_spire',
    position,
    rotationY,
    width: 3.2,
    height: 25.0,
    depth: 3.1,
    layer: 'midground',
  };
}

/**
 * TOWER B (Mid-Left Industrial Monolith with Green Wash), Foreground Bunker, & Far-Right Flank Tower
 */
function buildIndustrialMonoliths(
  buckets: GeometryBuckets,
  rand: () => number,
): BuildingDescriptor[] {
  const descriptors: BuildingDescriptor[] = [];

  // 1. TOWER B: Mid-Left weathered industrial monolith with luminous green left-flank wash
  {
    const position: [number, number, number] = [0.9, -8.2, -9.4];
    const rotationY = -0.58;
    const parent = buildTowerMatrix(position, rotationY);

    addBox(buckets.main, parent, 2.35, 17.4, 2.4, 0, 8.7, 0, 0.88);
    // Rooftop mechanical intake & antenna stubs
    addBox(buckets.dark, parent, 1.5, 1.2, 1.6, 0.1, 17.9, 0, 0.2);
    addCylinder(buckets.scaffold, parent, 0.03, 0.06, 3.2, 6, 0.5, 19.8, -0.3, 0.4);
    // External vertical conduit pipes
    addCylinder(buckets.dark, parent, 0.16, 0.16, 15.0, 8, -1.24, 7.8, 0.55, 0.24);
    addCylinder(buckets.dark, parent, 0.14, 0.14, 13.5, 8, -1.24, 7.0, -0.35, 0.24);

    // Fine acid-green vertical seam & soft industrial wall wash matching the reference
    addBox(buckets.accent, parent, 0.055, 10.5, 0.055, -1.2, 8.2, 1.22, 1.0);
    buckets.washes.push({
      position: localToWorld(parent, -0.4, 9.2, 1.26),
      rotation: [0, rotationY, 0],
      width: 2.0,
      height: 9.2,
      intensity: 0.84,
      phase: 1.4,
    });

    descriptors.push({
      id: 'tower-b-industrial-monolith',
      buildingClass: 'industrial_monolith',
      position,
      rotationY,
      width: 2.4,
      height: 19.5,
      depth: 2.4,
      layer: 'midground',
    });
  }

  // 2. FOREGROUND BOTTOM-RIGHT ARMORED BUNKER / MECHANICAL HOUSING
  {
    const position: [number, number, number] = [11.6, -9.8, 10.4];
    const rotationY = -0.58;
    const parent = buildTowerMatrix(position, rotationY);

    addBox(buckets.main, parent, 3.3, 10.8, 3.1, 0, 5.4, 0, 0.96);
    // Stepped angled mechanical cowling on top
    addBox(buckets.main, parent, 2.4, 2.2, 2.4, -0.2, 11.4, -0.1, 1.0);
    addBox(buckets.dark, parent, 3.42, 0.5, 3.22, 0, 9.6, 0, 0.12);
    // Ribbed dark mechanical louvers on the bright right flank
    for (let i = 0; i < 5; i++) {
      addBox(buckets.dark, parent, 0.24, 0.32, 2.6, 1.64, 4.2 + i * 1.15, 0, 0.1);
    }
    // Crisp green scaffolding frame on left corner
    addTrussColumn(
      buckets.scaffold,
      parent,
      -1.85,
      1.0,
      1.2,
      0.5,
      0.9,
      8.2,
      5,
      0.055,
      0.28,
      buckets.accent,
      0.42,
      rand,
    );
    addBox(buckets.accent, parent, 0.05, 9.2, 0.05, -1.68, 5.5, 1.58, 1.0);

    descriptors.push({
      id: 'foreground-bunker-housing',
      buildingClass: 'industrial_monolith',
      position,
      rotationY,
      width: 3.4,
      height: 12.5,
      depth: 3.2,
      layer: 'foreground',
    });
  }

  // 3. EXTREME RIGHT FLANK MONOLITH (prevents empty edge under parallax)
  {
    const position: [number, number, number] = [21.2, -9.8, 1.2];
    const rotationY = -0.28;
    const parent = buildTowerMatrix(position, rotationY);

    addBox(buckets.main, parent, 4.4, 34.0, 4.6, 0, 17.0, 0, 0.8);
    addBox(buckets.dark, parent, 4.55, 0.6, 4.75, 0, 22.0, 0, 0.18);
    addBox(buckets.dark, parent, 4.55, 0.6, 4.75, 0, 14.0, 0, 0.18);
    addTrussColumn(buckets.scaffold, parent, -2.35, 4.0, 0.4, 0.7, 2.4, 20.0, 8, 0.09, 0.3);

    descriptors.push({
      id: 'tower-g-right-flank',
      buildingClass: 'industrial_monolith',
      position,
      rotationY,
      width: 4.5,
      height: 34.0,
      depth: 4.6,
      layer: 'midground',
    });
  }

  return descriptors;
}

/**
 * CLASS 6: Dense Distant Skyline Silhouettes
 * Concentrated behind center-right skyline while preserving dark negative space on left 35-40%.
 */
function buildDistantSilhouettes(
  buckets: GeometryBuckets,
  rand: () => number,
): BuildingDescriptor[] {
  const descriptors: BuildingDescriptor[] = [];

  // Hand-curated + seeded silhouette clusters across z = -18 .. -52
  const count = 28;
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    // Keep x strictly >= -6.2 so the left 35-40% viewport hero typography zone remains dark & clean
    const x = -5.8 + t * 44.0 + (rand() - 0.5) * 2.8;
    const z = -19.0 - rand() * 34.0;

    // Lower silhouettes toward the left, taller denser skyline toward the right
    const leftDamp = Math.min(1, Math.max(0.18, (x + 7.0) / 18.0));
    const width = (1.6 + rand() * 3.2) * (0.75 + leftDamp * 0.45);
    const depth = 1.8 + rand() * 3.0;
    const height = (7.5 + rand() * 19.5) * leftDamp;
    const yBase = -9.5;
    const rotY = -0.15 - rand() * 0.35;

    const parent = buildTowerMatrix([x, yBase, z], rotY);
    const shade = 0.24 + rand() * 0.22;

    addBox(buckets.distant, parent, width, height, depth, 0, height * 0.5, 0, shade);

    // Stepped upper crown or chimney on 65% of distant towers for rich horizon silhouette
    if (rand() < 0.65) {
      const capW = width * (0.48 + rand() * 0.3);
      const capH = 1.6 + rand() * 4.2;
      addBox(
        buckets.distant,
        parent,
        capW,
        capH,
        depth * 0.65,
        (rand() - 0.5) * width * 0.25,
        height + capH * 0.5,
        0,
        shade * 0.9,
      );
    }

    // Slender silhouette antenna on 40% of distant towers
    if (rand() < 0.4) {
      const antH = 2.2 + rand() * 4.8;
      addCylinder(
        buckets.distant,
        parent,
        0.04,
        0.09,
        antH,
        5,
        (rand() - 0.5) * width * 0.4,
        height + antH * 0.5,
        0,
        shade * 0.85,
      );
    }

    descriptors.push({
      id: `distant-silhouette-${i}`,
      buildingClass: 'distant_silhouette',
      position: [x, yBase, z],
      rotationY: rotY,
      width,
      height,
      depth,
      layer: 'distant',
    });
  }

  return descriptors;
}

function safeMerge(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  if (geos.length === 0) {
    return new THREE.BufferGeometry();
  }
  const merged = mergeGeometries(geos, false);
  for (const g of geos) {
    g.dispose();
  }
  if (!merged) {
    throw new Error('Failed to merge procedural city geometries.');
  }
  merged.computeBoundingSphere();
  merged.computeBoundingBox();
  return merged;
}

/**
 * Deterministically builds the entire procedural sci-fi megacity geometry set.
 * Identical seed always generates identical silhouettes, trusses, and light accents.
 */
export function generateCityGeometry(seed = 204907): GeneratedCityData {
  const rand = createSeededRandom(seed);
  const buckets: GeometryBuckets = {
    main: [],
    dark: [],
    scaffold: [],
    accent: [],
    distant: [],
    windows: [],
    washes: [],
  };

  const buildings: BuildingDescriptor[] = [];

  buildings.push(buildHeroMegastructure(buckets, rand));
  buildings.push(buildBrutalistMonolith(buckets, rand));
  buildings.push(buildScaffoldingTower(buckets, rand));
  buildings.push(buildSculpturalDomeTower(buckets, rand));
  buildings.push(buildAntennaSpire(buckets, rand));
  buildings.push(...buildIndustrialMonoliths(buckets, rand));
  buildings.push(...buildDistantSilhouettes(buckets, rand));

  return {
    mainGeometry: safeMerge(buckets.main),
    darkDetailGeometry: safeMerge(buckets.dark),
    scaffoldGeometry: safeMerge(buckets.scaffold),
    accentGeometry: safeMerge(buckets.accent),
    distantGeometry: safeMerge(buckets.distant),
    animatedWindows: buckets.windows,
    greenWashPlanes: buckets.washes,
    buildings,
  };
}
