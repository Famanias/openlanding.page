import type {
  BufferGeometry,
  Group,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  ShaderMaterial,
  Texture,
} from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

type ThreeModule = typeof import("three");

/**
 * Procedural box truck built as a rig:
 *
 *   root      road position + heading (driven by the engine), world scale
 *   └ model   lifts the model so tires touch y = 0
 *     ├ chassis     frame, bumper, tanks — rigid with the axles
 *     ├ wheels[]    spin (rotation.z); front pair sits in steer pivots (rotation.y)
 *     └ bodyPivot   suspension: pitch (rotation.z), roll (rotation.x), bounce (y)
 *       └ body      cab, cargo box, livery, lamps
 *
 * Model space: forward +X, up +Y, right +Z. Static parts are merged per
 * material so the truck costs ~30 draw calls instead of ~120.
 */

export const TRUCK_SCALE = 1.55;
/** Tire radius in model units. */
const WHEEL_R = 0.42;
/** Model units from the old chassis origin down to the tire contact patch. */
const GROUND = 1.16;
/** Body pivot height (model units) for pitch/roll. */
const PIVOT_Y = -0.45;
/**
 * Extra cargo-box length (model units) behind the cab. Everything aft of
 * the cab (box, rails, rear tandem, rear lamps) is laid out relative to it.
 */
const EXT = 2.6;
/** Rear face of the cargo box. */
const REAR = -2.6 - EXT;
/** Shift that keeps the longer truck centered on its road position. */
const CENTER = EXT / 2;
/** Box length/center: front edge stays just behind the cab at x = 0.68. */
const BOX_LEN = 3.2 + EXT;
const BOX_X = 0.68 - BOX_LEN / 2;
/** Axles: a front pair (steer + one behind it) and a rear tandem. */
const FRONT_AXLES = [1.55, 0.55] as const;
const REAR_AXLES = [-1.05 - EXT, -2.0 - EXT] as const;
/** Model-space x of the headlights after centering (for lights parented to the root). */
export const TRUCK_NOSE_X = 2.6 + CENTER;

export type TruckLights = {
  head: MeshPhysicalMaterial;
  tail: MeshPhysicalMaterial;
  reverse: MeshPhysicalMaterial;
  signalLeft: MeshPhysicalMaterial;
  signalRight: MeshPhysicalMaterial;
  marker: MeshPhysicalMaterial;
  beam: ShaderMaterial;
  pool: MeshBasicMaterial;
};

export type TruckRig = {
  root: Group;
  bodyPivot: Group;
  wheels: Group[];
  steer: Group[];
  lights: TruckLights;
  blob: Mesh;
  /** Model-space emitters for particles. */
  emitters: {
    rearWheels: Array<[number, number, number]>;
    exhaust: [number, number, number];
  };
  /** World meters per model unit along the ground (for wheel spin). */
  wheelRadiusWorld: number;
};

class PartSet {
  private readonly byMaterial = new Map<Material, BufferGeometry[]>();
  constructor(private readonly THREE: ThreeModule) {}

  add(geometry: BufferGeometry, material: Material, x: number, y: number, z: number, rx = 0, ry = 0, rz = 0) {
    const THREE = this.THREE;
    const m = new THREE.Matrix4().compose(
      new THREE.Vector3(x, y, z),
      new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)),
      new THREE.Vector3(1, 1, 1),
    );
    let g = geometry.index ? geometry.toNonIndexed() : geometry;
    if (g === geometry) g = geometry.clone();
    g.applyMatrix4(m);
    // Only keep the attributes every part shares so merging never fails.
    for (const name of Object.keys(g.attributes)) {
      if (name !== "position" && name !== "normal" && name !== "uv") g.deleteAttribute(name);
    }
    geometry.dispose();
    const list = this.byMaterial.get(material) ?? [];
    list.push(g);
    this.byMaterial.set(material, list);
  }

  build(parent: Group, castShadow = true): Mesh[] {
    const meshes: Mesh[] = [];
    for (const [material, list] of this.byMaterial) {
      const merged = mergeGeometries(list, false);
      for (const g of list) g.dispose();
      if (!merged) continue;
      const mesh = new this.THREE.Mesh(merged, material);
      mesh.castShadow = castShadow;
      mesh.receiveShadow = true;
      parent.add(mesh);
      meshes.push(mesh);
    }
    this.byMaterial.clear();
    return meshes;
  }
}

const beamVertex = /* glsl */ `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vView;
void main() {
  vUv = uv;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vView = -mv.xyz;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mv;
}
`;

const beamFragment = /* glsl */ `
uniform vec3 color;
uniform float intensity;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vView;
void main() {
  float along = pow(clamp(vUv.y, 0.0, 1.0), 2.2);
  float facing = pow(abs(dot(normalize(vNormal), normalize(vView))), 1.6);
  float a = along * facing * intensity;
  gl_FragColor = vec4(color * a, a);
}
`;

export function buildTruck(
  THREE: ThreeModule,
  livery: Texture,
  glow: Texture,
  pool: Texture,
): TruckRig {
  const root = new THREE.Group();
  root.name = "truck";
  root.scale.setScalar(TRUCK_SCALE);
  const model = new THREE.Group();
  model.position.set(CENTER, GROUND, 0);
  root.add(model);
  const chassis = new THREE.Group();
  const bodyPivot = new THREE.Group();
  bodyPivot.position.y = PIVOT_Y;
  const body = new THREE.Group();
  body.position.y = -PIVOT_Y;
  bodyPivot.add(body);
  model.add(chassis, bodyPivot);

  // Materials ---------------------------------------------------------
  const paint = new THREE.MeshPhysicalMaterial({ color: 0x2b5f86, metalness: 0.45, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.12 });
  const paintDark = new THREE.MeshPhysicalMaterial({ color: 0x173f5c, metalness: 0.5, roughness: 0.34, clearcoat: 0.7, clearcoatRoughness: 0.2 });
  const accent = new THREE.MeshPhysicalMaterial({ color: 0xf26a2e, metalness: 0.2, roughness: 0.35, clearcoat: 0.8 });
  const cargo = new THREE.MeshPhysicalMaterial({ color: 0xf1f3f4, metalness: 0.08, roughness: 0.42, clearcoat: 0.35, clearcoatRoughness: 0.3 });
  const rubber = new THREE.MeshStandardMaterial({ color: 0x15181b, metalness: 0, roughness: 0.92 });
  const dark: MeshStandardMaterial = new THREE.MeshStandardMaterial({ color: 0x1c252d, metalness: 0.35, roughness: 0.55 });
  const chrome = new THREE.MeshStandardMaterial({ color: 0xd5dee5, metalness: 1, roughness: 0.14 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x0f2230, metalness: 0.2, roughness: 0.05, clearcoat: 1, envMapIntensity: 1.6 });
  const lamp = (color: number, emissive: number) =>
    new THREE.MeshPhysicalMaterial({ color, emissive, emissiveIntensity: 0.4, roughness: 0.15, metalness: 0.1 });
  const lights: TruckLights = {
    head: lamp(0xf4f8ff, 0xfff4e0),
    tail: lamp(0x7a1016, 0xff1f2a),
    reverse: lamp(0xdddddd, 0xffffff),
    signalLeft: lamp(0x8a4a10, 0xff9a1a),
    signalRight: lamp(0x8a4a10, 0xff9a1a),
    marker: lamp(0x8a4a10, 0xffa630),
    beam: new THREE.ShaderMaterial({
      uniforms: { color: { value: new THREE.Color(0xfff1d6) }, intensity: { value: 0 } },
      vertexShader: beamVertex,
      fragmentShader: beamFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    }),
    pool: new THREE.MeshBasicMaterial({
      map: pool,
      color: 0xfff0d2,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      polygonOffset: true,
      polygonOffsetFactor: -4,
    }),
  };
  lights.reverse.emissiveIntensity = 0;
  lights.signalLeft.emissiveIntensity = 0;
  lights.signalRight.emissiveIntensity = 0;

  // Geometry helpers ------------------------------------------------------
  const box = (w: number, h: number, d: number, r = 0): BufferGeometry => {
    if (!r) return new THREE.BoxGeometry(w, h, d);
    const hw = w / 2;
    const hh = h / 2;
    const rr = Math.min(r, hw, hh);
    const shape = new THREE.Shape();
    shape.moveTo(-hw + rr, -hh);
    shape.lineTo(hw - rr, -hh);
    shape.quadraticCurveTo(hw, -hh, hw, -hh + rr);
    shape.lineTo(hw, hh - rr);
    shape.quadraticCurveTo(hw, hh, hw - rr, hh);
    shape.lineTo(-hw + rr, hh);
    shape.quadraticCurveTo(-hw, hh, -hw, hh - rr);
    shape.lineTo(-hw, -hh + rr);
    shape.quadraticCurveTo(-hw, -hh, -hw + rr, -hh);
    const g = new THREE.ExtrudeGeometry(shape, {
      depth: d,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: Math.min(rr * 0.22, 0.035),
      bevelThickness: Math.min(rr * 0.18, 0.03),
      curveSegments: 5,
      steps: 1,
    });
    g.center();
    return g;
  };
  const cyl = (radius: number, length: number, segments = 24, radiusTop = radius) =>
    new THREE.CylinderGeometry(radiusTop, radius, length, segments);
  const X = (g: BufferGeometry) => g.rotateZ(Math.PI / 2);
  const Z = (g: BufferGeometry) => g.rotateX(Math.PI / 2);

  // Chassis -----------------------------------------------------------------
  const c = new PartSet(THREE);
  c.add(box(5.35 + EXT, 0.18, 1.3, 0.04), dark, -EXT / 2, -0.72, 0);
  c.add(box(4.85 + EXT, 0.12, 0.12), dark, -0.05 - EXT / 2, -0.56, 0.52);
  c.add(box(4.85 + EXT, 0.12, 0.12), dark, -0.05 - EXT / 2, -0.56, -0.52);
  c.add(box(0.24, 0.22, 1.72, 0.05), chrome, 2.52, -0.66, 0);
  c.add(box(0.16, 0.12, 1.62, 0.025), chrome, REAR - 0.08, -0.74, 0);
  for (const side of [-1, 1]) {
    // Fuel tank between the front axles and the rear tandem.
    c.add(X(cyl(0.23, 0.85, 22)), chrome, -0.55, -0.55, side * 0.8);
    c.add(box(0.64, 0.1, 0.28, 0.025), chrome, 1.52, -0.66, side * 0.83);
    // Mud flaps behind each axle group.
    c.add(box(0.04, 0.42, 0.34), rubber, REAR_AXLES[1] - 0.42, -0.86, side * 0.72);
    c.add(box(0.04, 0.42, 0.34), rubber, FRONT_AXLES[1] - 0.6, -0.86, side * 0.72);
  }
  c.build(chassis);

  // Body -------------------------------------------------------------------
  const b = new PartSet(THREE);
  // Cargo box.
  b.add(box(BOX_LEN, 2.05, 1.62, 0.1), cargo, BOX_X, 0.4, 0);
  b.add(box(BOX_LEN + 0.06, 0.12, 1.68, 0.04), paintDark, BOX_X, 1.42, 0);
  b.add(box(BOX_LEN - 0.1, 0.18, 1.68, 0.03), paint, BOX_X, -0.54, 0);
  // Rear door and frame.
  b.add(box(0.055, 1.72, 1.42, 0.02), cargo, REAR + 0.06, 0.36, 0);
  b.add(box(0.075, 1.8, 0.055), chrome, REAR + 0.02, 0.36, 0.68);
  b.add(box(0.075, 1.8, 0.055), chrome, REAR + 0.02, 0.36, -0.68);
  b.add(box(0.075, 0.055, 1.4), chrome, REAR + 0.02, 1.22, 0);
  b.add(box(0.075, 0.055, 1.4), chrome, REAR + 0.02, -0.5, 0);
  for (let y = -0.35; y < 1.12; y += 0.24) b.add(box(0.018, 0.025, 1.32), dark, REAR - 0.02, y, 0);
  // Cab (cab-over).
  b.add(box(1.72, 1.72, 1.54, 0.14), paint, 1.56, 0.2, 0);
  b.add(box(1.48, 0.26, 1.5, 0.07), paintDark, 1.62, 1.12, 0);
  b.add(box(0.18, 1.44, 1.44, 0.06), paintDark, 2.39, 0.13, 0);
  // Roof fairing up to the box height.
  b.add(box(0.9, 0.3, 1.46, 0.08), paint, 1.28, 1.36, 0);
  // Orange accent sweep on the cab.
  b.add(box(1.6, 0.08, 1.57, 0.03), accent, 1.58, -0.28, 0);
  // Windshield + side windows.
  b.add(box(0.035, 0.72, 1.24, 0.035), glass, 2.495, 0.55, 0, 0, 0, -0.03);
  b.add(box(0.8, 0.62, 0.03, 0.05), glass, 1.8, 0.56, 0.785);
  b.add(box(0.8, 0.62, 0.03, 0.05), glass, 1.8, 0.56, -0.785);
  // Door seams and handles.
  for (const side of [-1, 1]) {
    b.add(box(0.018, 1.12, 0.028), dark, 1.3, 0.05, side * 0.795);
    b.add(box(0.19, 0.045, 0.035, 0.01), chrome, 1.66, 0.03, side * 0.805);
  }
  // Grille.
  b.add(box(0.055, 0.52, 0.82, 0.04), dark, 2.515, -0.16, 0);
  for (let z = -0.3; z <= 0.31; z += 0.15) b.add(box(0.025, 0.38, 0.028), chrome, 2.552, -0.16, z);
  // Mirrors.
  for (const side of [-1, 1]) {
    b.add(Z(cyl(0.025, 0.43, 10)), dark, 2.09, 0.64, side * 0.92);
    b.add(box(0.16, 0.34, 0.07, 0.035), dark, 2.1, 0.66, side * 1.12);
    b.add(box(0.12, 0.26, 0.018, 0.025), chrome, 2.1, 0.66, side * 1.16);
  }
  // Exhaust stack behind the cab.
  b.add(cyl(0.07, 1.9, 14), chrome, 0.64, 1.0, 0.7);
  b.add(cyl(0.085, 0.5, 14), dark, 0.64, 0.25, 0.7);
  // Fenders.
  for (const side of [-1, 1]) {
    // One fender over each axle pair.
    b.add(box(1.98, 0.12, 0.24, 0.04), paintDark, (FRONT_AXLES[0] + FRONT_AXLES[1]) / 2, -0.31, side * 0.76);
    b.add(box(2.16, 0.12, 0.24, 0.04), paintDark, (REAR_AXLES[0] + REAR_AXLES[1]) / 2, -0.31, side * 0.76);
  }
  // Lamps.
  b.add(box(0.06, 0.24, 0.3, 0.035), lights.head, 2.565, 0.03, 0.54);
  b.add(box(0.06, 0.24, 0.3, 0.035), lights.head, 2.565, 0.03, -0.54);
  b.add(box(0.064, 0.11, 0.22, 0.03), lights.signalRight, 2.57, -0.2, 0.65);
  b.add(box(0.064, 0.11, 0.22, 0.03), lights.signalLeft, 2.57, -0.2, -0.65);
  b.add(box(0.075, 0.2, 0.22, 0.03), lights.tail, REAR - 0.06, -0.44, 0.58);
  b.add(box(0.075, 0.2, 0.22, 0.03), lights.tail, REAR - 0.06, -0.44, -0.58);
  b.add(box(0.075, 0.1, 0.14, 0.02), lights.reverse, REAR - 0.06, -0.24, 0.58);
  b.add(box(0.075, 0.1, 0.14, 0.02), lights.reverse, REAR - 0.06, -0.24, -0.58);
  b.add(box(0.075, 0.1, 0.14, 0.02), lights.signalRight, REAR - 0.06, -0.62, 0.66);
  b.add(box(0.075, 0.1, 0.14, 0.02), lights.signalLeft, REAR - 0.06, -0.62, -0.66);
  // Roof marker lamps (cab) and side markers along the box.
  for (const z of [-0.45, -0.15, 0.15, 0.45]) b.add(box(0.06, 0.05, 0.09), lights.marker, 2.04, 1.52, z);
  for (const side of [-1, 1]) {
    for (let x = REAR + 0.3; x <= 0.35; x += 0.9) b.add(box(0.1, 0.05, 0.03), lights.marker, x, -0.5, side * 0.855);
    b.add(box(0.06, 0.06, 0.03), lights.marker, REAR + 0.15, 1.36, side * 0.842);
  }
  b.build(body);

  // Livery decals on both box sides. The rounded box's bevel puts its side
  // faces at z = +-0.828, so the decals sit just outside that (inside it they
  // z-fight and flicker in and out as the camera moves).
  const liveryMat = new THREE.MeshStandardMaterial({
    map: livery,
    transparent: true,
    roughness: 0.45,
    metalness: 0,
    polygonOffset: true,
    polygonOffsetFactor: -2,
  });
  const decalGeo = new THREE.PlaneGeometry(2.98, 1.49);
  const decalR = new THREE.Mesh(decalGeo, liveryMat);
  decalR.position.set(BOX_X, 0.42, 0.834);
  const decalL = new THREE.Mesh(decalGeo, liveryMat);
  decalL.position.set(BOX_X, 0.42, -0.834);
  decalL.rotation.y = Math.PI;
  body.add(decalR, decalL);


  // Headlight beams (volumetric cones) and the pool they throw on the road.
  const beamGeo = new THREE.ConeGeometry(1.5, 9, 20, 1, true);
  beamGeo.rotateZ(Math.PI / 2);
  beamGeo.translate(4.5, 0, 0);
  for (const z of [0.54, -0.54]) {
    const beam = new THREE.Mesh(beamGeo, lights.beam);
    beam.position.set(2.6, 0.03, z);
    beam.rotation.z = -0.06;
    beam.renderOrder = 5;
    body.add(beam);
  }
  const poolMesh = new THREE.Mesh(new THREE.PlaneGeometry(9, 13), lights.pool);
  poolMesh.rotation.x = -Math.PI / 2;
  poolMesh.rotation.z = -Math.PI / 2;
  poolMesh.position.set(9.4 + CENTER, 0.04, 0);
  poolMesh.renderOrder = 4;
  root.add(poolMesh);

  // Contact shadow (always on; real shadows are added on capable devices).
  const blob = new THREE.Mesh(
    new THREE.PlaneGeometry(6.8 + EXT, 2.9),
    new THREE.MeshBasicMaterial({ color: 0x000000, map: glow, transparent: true, opacity: 0.55, depthWrite: false }),
  );
  blob.rotation.x = -Math.PI / 2;
  blob.position.set(-0.1 - EXT / 2 + CENTER, 0.03, 0);
  blob.renderOrder = 3;
  root.add(blob);

  // Wheels -------------------------------------------------------------------
  const w = new PartSet(THREE);
  const width = 0.27;
  w.add(Z(cyl(WHEEL_R, width, 32)), rubber, 0, 0, 0);
  w.add(Z(cyl(WHEEL_R * 0.6, width * 1.04, 24)), chrome, 0, 0, 0);
  w.add(Z(cyl(WHEEL_R * 0.2, width * 1.1, 16)), dark, 0, 0, 0);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    w.add(Z(cyl(WHEEL_R * 0.05, width * 1.12, 8)), dark, Math.cos(a) * WHEEL_R * 0.38, Math.sin(a) * WHEEL_R * 0.38, 0);
  }
  // Tread blocks so rotation reads.
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * Math.PI * 2;
    w.add(box(0.012, 0.03, width * 0.9), dark, Math.cos(a) * (WHEEL_R - 0.004), Math.sin(a) * (WHEEL_R - 0.004), 0, 0, 0, a);
  }
  const template = new THREE.Group();
  w.build(template);

  const wheels: Group[] = [];
  const steer: Group[] = [];
  // Two axles up front (only the leading one steers) and two at the back:
  // the same number of wheels front and rear.
  const positions: Array<[number, number, number, boolean]> = [];
  FRONT_AXLES.forEach((x, i) => {
    for (const z of [0.84, -0.84]) positions.push([x, -0.74, z, i === 0]);
  });
  for (const x of REAR_AXLES) {
    for (const z of [0.84, -0.84]) positions.push([x, -0.74, z, false]);
  }
  for (const [x, y, z, front] of positions) {
    const wheel = template.clone();
    wheels.push(wheel);
    if (front) {
      const pivot = new THREE.Group();
      pivot.position.set(x, y, z);
      pivot.add(wheel);
      steer.push(pivot);
      chassis.add(pivot);
    } else {
      wheel.position.set(x, y, z);
      chassis.add(wheel);
    }
  }

  return {
    root,
    bodyPivot,
    wheels,
    steer,
    lights,
    blob,
    emitters: {
      // Root-space points (the model is offset by CENTER inside the root).
      rearWheels: REAR_AXLES.flatMap((x) => [
        [x + CENTER, -0.95 + GROUND, 0.9] as [number, number, number],
        [x + CENTER, -0.95 + GROUND, -0.9] as [number, number, number],
      ]),
      exhaust: [0.64 + CENTER, 1.98 + GROUND, 0.7],
    },
    wheelRadiusWorld: WHEEL_R * TRUCK_SCALE,
  };
}
