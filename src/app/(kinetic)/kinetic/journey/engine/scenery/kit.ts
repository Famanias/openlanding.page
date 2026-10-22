import type {
  BufferGeometry,
  Color,
  Group,
  InstancedMesh,
  Material,
  Matrix4,
  MeshStandardMaterial,
  Object3D,
  Texture,
} from "three";
import { createFrame, type Route, type RouteFrame } from "../splineRoute";
import { terrainHeight } from "../terrain";

export type ThreeModule = typeof import("three");

/** Things the scenery can animate each frame. */
export type Animated = (ctx: FrameContext) => void;

export type FrameContext = {
  time: number;
  dt: number;
  /** Reduced-motion still frame: jump straight to end states. */
  still: boolean;
  /** Truck road distance and speed. */
  s: number;
  v: number;
  /** 0..1 how "night" the environment is (lamps on). */
  night: number;
  rain: number;
  arrived: boolean;
  verified: boolean;
};

export type SceneryContext = {
  THREE: ThreeModule;
  route: Route;
  root: Group;
  /** 0..1 prop density for the device tier. */
  density: number;
  anisotropy: number;
  mats: Materials;
  textures: { glow: Texture; beam: Texture; scanner: Texture; dockDoor: Texture };
  /** Register a per-frame animation. */
  animate: (fn: Animated) => void;
  /** Materials whose emissive follows night (lamps, windows). */
  nightGlow: (material: MeshStandardMaterial, day: number, night: number) => void;
};

export type Materials = ReturnType<typeof createMaterials>;

export function createMaterials(THREE: ThreeModule) {
  const std = (color: number, roughness = 0.8, metalness = 0, extra: Record<string, unknown> = {}) =>
    new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
  const lamp = (color: number) =>
    new THREE.MeshStandardMaterial({ color: 0x222222, emissive: color, emissiveIntensity: 1, roughness: 0.4 });
  return {
    wall: std(0xc9c1b3, 0.85),
    wallDark: std(0x9aa3aa, 0.8),
    roof: std(0x565c63, 0.9),
    concrete: std(0xb0aba1, 0.92),
    concreteDark: std(0x7d7a74, 0.92),
    steel: std(0x3d6f8e, 0.5, 0.55),
    steelGrey: std(0x8a949c, 0.45, 0.7),
    pole: std(0x6f777e, 0.5, 0.6),
    rail: std(0x9aa3aa, 0.5, 0.6, { side: 2 }),
    trunk: std(0x5e4632, 0.95),
    trailer: std(0xd9dde0, 0.55, 0.1),
    rubber: std(0x16191c, 0.9),
    barnRed: std(0xa8412f, 0.85),
    white: std(0xe4e1da, 0.8),
    orange: std(0xf26a2e, 0.5, 0.1),
    brandBlue: std(0x2f5d7c, 0.5, 0.2),
    deep: std(0x10263d, 0.6, 0.2),
    container: std(0xffffff, 0.6, 0.3),
    building: std(0xffffff, 0.55, 0.25),
    sign: std(0xffffff, 0.5, 0, { emissive: 0xffffff, emissiveIntensity: 0.05 }),
    lampWarm: lamp(0xffc98a),
    lampCool: lamp(0xdfeaff),
    lampRed: lamp(0xff2a22),
    lampAmber: lamp(0xffa12a),
    windowWarm: lamp(0xffcf8f),
  };
}

const tmpFrame: RouteFrame = createFrame();

/** World transform for something standing at (s, lat) on the terrain or road. */
export function placement(
  THREE: ThreeModule,
  route: Route,
  s: number,
  lat: number,
  opts: { y?: number; onRoad?: boolean; yaw?: number; scale?: number | [number, number, number] } = {},
  out?: Matrix4,
): Matrix4 {
  route.sample(s, tmpFrame);
  const x = tmpFrame.x + tmpFrame.rx * lat;
  const z = tmpFrame.z + tmpFrame.rz * lat;
  const ground = opts.onRoad ? tmpFrame.y : terrainHeight(s, lat);
  const y = ground + (opts.y ?? 0);
  const sc = opts.scale ?? 1;
  const scale = typeof sc === "number" ? new THREE.Vector3(sc, sc, sc) : new THREE.Vector3(sc[0], sc[1], sc[2]);
  const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -tmpFrame.heading + (opts.yaw ?? 0));
  return (out ?? new THREE.Matrix4()).compose(new THREE.Vector3(x, y, z), q, scale);
}

/** Orient an Object3D like `placement` does. */
export function placeObject(
  THREE: ThreeModule,
  route: Route,
  obj: Object3D,
  s: number,
  lat: number,
  opts: { y?: number; onRoad?: boolean; yaw?: number } = {},
): Object3D {
  placement(THREE, route, s, lat, opts).decompose(obj.position, obj.quaternion, obj.scale);
  return obj;
}

/**
 * Collects instance transforms (and optional colors) for one geometry +
 * material, then emits a single InstancedMesh.
 */
export class Batch {
  private readonly matrices: Matrix4[] = [];
  private readonly colors: Color[] = [];
  constructor(
    private readonly THREE: ThreeModule,
    private readonly geometry: BufferGeometry,
    private readonly material: Material,
    private readonly shadows: { cast: boolean; receive: boolean } = { cast: true, receive: true },
  ) {}

  add(matrix: Matrix4, color?: number | Color): this {
    this.matrices.push(matrix.clone());
    if (color !== undefined) {
      this.colors.push(typeof color === "number" ? new this.THREE.Color(color) : color.clone());
    }
    return this;
  }

  get count(): number {
    return this.matrices.length;
  }

  build(parent: Object3D): InstancedMesh | null {
    if (this.matrices.length === 0) return null;
    const mesh = new this.THREE.InstancedMesh(this.geometry, this.material, this.matrices.length);
    this.matrices.forEach((m, i) => mesh.setMatrixAt(i, m));
    if (this.colors.length === this.matrices.length) {
      this.colors.forEach((c, i) => mesh.setColorAt(i, c));
    }
    mesh.castShadow = this.shadows.cast;
    mesh.receiveShadow = this.shadows.receive;
    mesh.computeBoundingSphere();
    parent.add(mesh);
    return mesh;
  }
}

/** Unit box with its base at y = 0 (scale it to size). */
export function baseBox(THREE: ThreeModule): BufferGeometry {
  return new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0);
}

/** Matrix for a beam between two world points with a square cross-section. */
export function beamBetween(
  THREE: ThreeModule,
  a: { x: number; y: number; z: number },
  b: { x: number; y: number; z: number },
  thickness: number,
): Matrix4 {
  const va = new THREE.Vector3(a.x, a.y, a.z);
  const vb = new THREE.Vector3(b.x, b.y, b.z);
  const dir = vb.clone().sub(va);
  const len = dir.length();
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  const mid = va.add(vb).multiplyScalar(0.5);
  return new THREE.Matrix4().compose(mid, q, new THREE.Vector3(thickness, len, thickness));
}
