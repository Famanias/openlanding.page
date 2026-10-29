import * as THREE from "three";
import {
  ATTACH,
  HUB_Y,
  RIB_COUNT,
  RIB_LENGTH,
  clamp01,
  paperPoint,
  ribPoint,
  rimPoint,
  runnerHeight,
  type Point,
} from "./rig";
import { turnedGeometry } from "./lathe";
import { bambooMaterial, paperMaterial, type Motif } from "./materials";
export type WagasaPose = {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
};
export type WagasaRuntime = {
  setOpen: (n: number) => void;
  setExplode: (n: number) => void;
  setSpread: (n: number) => void;
  setCanopy: (
    colour: string,
    motif: Motif,
    origin?: THREE.Vector2,
    instant?: boolean,
  ) => void;
  setPose: (pose: WagasaPose) => void;
  setHighlight: (part: string | null) => void;
  setSun: (angle: number) => void;
  update: () => void;
  tick: (dt: number) => void;
  point: (part: string, ribIndex?: number) => THREE.Vector3;
  runnerPoint: (open: number) => THREE.Vector3;
  setInspection: (state: {
    reveal: number;
    rib: number | null;
    index: number;
    trace: number;
  }) => void;
  paperVisible: (u: number) => boolean;
  dispose: () => void;
  readonly open: number;
  readonly animating: boolean;
};
export function createWagasaModel(
  options: {
    open?: number;
    explode?: number;
    canopyColor?: string;
    motif?: Motif;
  } = {},
) {
  const root = new THREE.Group();
  root.name = "AMAOTO articulated wagasa";
  const bamboo = bambooMaterial();
  const wood = new THREE.MeshStandardMaterial({
    color: "#B8923A",
    roughness: 0.3,
    map: bamboo.map,
  });
  const thread = new THREE.MeshStandardMaterial({
    color: "#1A1613",
    roughness: 0.95,
  });
  const paper = paperMaterial(
    options.canopyColor ?? "#F4ECDD",
    options.motif ?? "sakura",
  );
  const cylinder = new THREE.CylinderGeometry(1, 1, 1, 6);
  const dummy = new THREE.Object3D(),
    up = new THREE.Vector3(0, 1, 0),
    a = new THREE.Vector3(),
    b = new THREE.Vector3();
  function instances(
    count: number,
    material: THREE.MeshStandardMaterial,
    partId: string,
  ) {
    const mesh = new THREE.InstancedMesh(cylinder, material, count);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.userData.partId = partId;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    // Raycasting must not retain the narrow first-frame bounds after unfolding.
    mesh.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 5);
    root.add(mesh);
    return mesh;
  }
  const ribs = instances(40 * 8, bamboo, "ribs"),
    stretchers = instances(40, bamboo.clone(), "stretchers");
  const bands = instances(40 * 3, wood.clone(), "ribs"),
    knots = instances(40 * 2, thread, "thread"),
    lattice = instances(40 * 8, thread.clone(), "thread");
  const shaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.055, 0.068, 3.65, 20),
    bamboo.clone(),
  );
  shaft.position.y = -0.075;
  shaft.userData.partId = "handle";
  root.add(shaft);
  const cap = new THREE.Mesh(turnedGeometry("cap"), wood.clone());
  cap.position.y = HUB_Y - 0.025;
  cap.userData.partId = "handle";
  root.add(cap);
  const runner = new THREE.Mesh(turnedGeometry("runner"), wood.clone());
  runner.userData.partId = "runner";
  root.add(runner);
  const grip = new THREE.Mesh(turnedGeometry("handle"), wood.clone());
  grip.position.y = -1.72;
  grip.userData.partId = "handle";
  root.add(grip);
  const collar = instances(80, thread.clone(), "thread");
  const shaftNodes = instances(6, wood.clone(), "handle");
  for (let i = 0; i < 6; i++) {
    dummy.position.set(0, -1.45 + i * 0.52, 0);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(0.071, 0.026, 0.071);
    dummy.updateMatrix();
    shaftNodes.setMatrixAt(i, dummy.matrix);
  }
  const rings = 16,
    across = 4,
    vertices = RIB_COUNT * (rings + 1) * (across + 1);
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(vertices * 3),
    uv = new Float32Array(vertices * 2),
    indices: number[] = [];
  let v = 0;
  for (let g = 0; g < 40; g++)
    for (let j = 0; j <= rings; j++)
      for (let k = 0; k <= across; k++) {
        uv[v * 2] = (g + k / across) / 40;
        uv[v * 2 + 1] = j / rings;
        if (j < rings && k < across) {
          const n = v;
          indices.push(
            n,
            n + 1,
            n + across + 1,
            n + 1,
            n + across + 2,
            n + across + 1,
          );
        }
        v++;
      }
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage),
  );
  geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  geometry.setIndex(indices);
  geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 5);
  const skin = new THREE.Mesh(geometry, paper.material);
  skin.userData.partId = "canopy";
  skin.receiveShadow = true;
  skin.castShadow = true;
  skin.frustumCulled = false;
  root.add(skin);
  const rimPositions = new Float32Array(40 * across * 2 * 3);
  const rimGeometry = new THREE.BufferGeometry();
  rimGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(rimPositions, 3).setUsage(THREE.DynamicDrawUsage),
  );
  const rim = new THREE.LineSegments(
    rimGeometry,
    new THREE.LineBasicMaterial({ color: "#B8923A" }),
  );
  rim.frustumCulled = false;
  rim.userData.partId = "thread";
  root.add(rim);
  let open = clamp01(options.open ?? 0),
    explode = clamp01(options.explode ?? 0),
    spread = 0,
    dirty = true;
  function segment(
    mesh: THREE.InstancedMesh,
    index: number,
    start: Point,
    end: Point,
    radius: number,
  ) {
    a.set(start.x, start.y, start.z);
    b.set(end.x, end.y, end.z);
    dummy.position.copy(a).add(b).multiplyScalar(0.5);
    b.sub(a);
    dummy.quaternion.setFromUnitVectors(up, b.clone().normalize());
    dummy.scale.set(radius, b.length(), radius);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  }
  function update() {
    if (!dirty) return;
    dirty = false;
    const runnerY = runnerHeight(open);
    runner.position.y = runnerY - explode * 0.24;
    grip.position.y = -1.72 - explode * 0.32;
    for (let i = 0; i < 40; i++) {
      for (let j = 0; j < 8; j++)
        segment(
          ribs,
          i * 8 + j,
          ribPoint(open, i, j / 8, explode, spread),
          ribPoint(open, i, (j + 1) / 8, explode, spread),
          0.011 - j * 0.00055,
        );
      segment(
        stretchers,
        i,
        { x: 0, y: runner.position.y, z: 0 },
        ribPoint(open, i, ATTACH / RIB_LENGTH, explode, spread),
        0.012,
      );
      for (let j = 0; j < 3; j++) {
        const t = 0.27 + j * 0.3;
        segment(
          bands,
          i * 3 + j,
          ribPoint(open, i, t - 0.006, explode, spread),
          ribPoint(open, i, t + 0.006, explode, spread),
          0.014,
        );
      }
      const tip = ribPoint(open, i, 1, explode, spread),
        near = ribPoint(open, i, 0.978, explode, spread);
      segment(knots, i * 2, near, tip, 0.016);
      segment(
        knots,
        i * 2 + 1,
        { x: tip.x - 0.018, y: tip.y + 0.012, z: tip.z },
        { x: tip.x + 0.018, y: tip.y + 0.012, z: tip.z },
        0.009,
      );
      for (let j = 0; j < 4; j++)
        for (let family = 0; family < 2; family++) {
          const start = ribPoint(open, i, 0.13 + j * 0.075, explode, spread),
            end = ribPoint(
              open,
              (i + (family ? 39 : 1)) % 40,
              0.13 + (j + 1) * 0.075,
              explode,
              spread,
            );
          start.y -= 0.018;
          end.y -= 0.018;
          segment(lattice, i * 8 + j * 2 + family, start, end, 0.0025);
        }
      const angle = (i / 40) * Math.PI * 2;
      for (let family = 0; family < 2; family++) {
        const next = angle + ((family ? 1 : -1) * Math.PI * 2) / 40;
        segment(
          collar,
          i * 2 + family,
          {
            x: Math.cos(angle) * 0.105,
            y: runner.position.y + 0.08,
            z: Math.sin(angle) * 0.105,
          },
          {
            x: Math.cos(next) * 0.105,
            y: runner.position.y + 0.18,
            z: Math.sin(next) * 0.105,
          },
          0.003,
        );
      }
    }
    let vertex = 0;
    for (let g = 0; g < 40; g++)
      for (let j = 0; j <= rings; j++)
        for (let k = 0; k <= across; k++) {
          const point = paperPoint(
            open,
            g,
            j / rings,
            k / across,
            explode,
            spread,
          );
          positions.set([point.x, point.y, point.z], vertex * 3);
          vertex++;
        }
    let r = 0;
    for (let g = 0; g < 40; g++)
      for (let k = 0; k < across; k++)
        for (const t of [k / across, (k + 1) / across]) {
          const p = rimPoint(open, g, t, explode, spread);
          rimPositions.set([p.x, p.y, p.z], r);
          r += 3;
        }
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
    rimGeometry.attributes.position.needsUpdate = true;
    for (const mesh of [ribs, stretchers, bands, knots, lattice, collar])
      mesh.instanceMatrix.needsUpdate = true;
  }
  let reveal = 0,
    revealCenter = 0.1,
    inspectionKey = "";
  const baseTint = new THREE.Color(1, 1, 1),
    quietTint = new THREE.Color("#F4ECDD").multiplyScalar(0.32),
    selectedTint = new THREE.Color("#C8412B").multiplyScalar(2);
  const runtime: WagasaRuntime = {
    setInspection(state) {
      reveal = state.reveal;
      revealCenter = state.index / 40;
      paper.setReveal(reveal, revealCenter);
      const steps =
        state.trace < 0 ? 0 : Math.max(1, Math.ceil(state.trace * 4));
      const key = `${state.rib}:${state.index}:${steps}`;
      if (key === inspectionKey) return;
      inspectionKey = key;
      for (const mesh of [ribs, bands]) {
        const perRib = mesh === ribs ? 8 : 3;
        for (let i = 0; i < mesh.count; i++)
          mesh.setColorAt(
            i,
            state.rib === null
              ? baseTint
              : Math.floor(i / perRib) === state.rib
                ? selectedTint
                : quietTint,
          );
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      }
      for (let i = 0; i < lattice.count; i++) {
        let lit = false;
        for (let j = 0; j < steps; j++)
          if (i === ((state.index + j) % 40) * 8 + j * 2) lit = true;
        lattice.setColorAt(
          i,
          steps ? (lit ? selectedTint : quietTint) : baseTint,
        );
      }
      if (lattice.instanceColor) lattice.instanceColor.needsUpdate = true;
    },
    paperVisible(u) {
      const distance = Math.abs(u - revealCenter);
      return (
        reveal < 0.001 || Math.min(distance, 1 - distance) >= 0.12 * reveal
      );
    },
    runnerPoint(value) {
      return root.localToWorld(new THREE.Vector3(0, runnerHeight(value), 0));
    },
    setOpen(n) {
      n = clamp01(n);
      if (Math.abs(n - open) > 0.0001) {
        open = n;
        dirty = true;
      }
    },
    setExplode(n) {
      n = clamp01(n);
      if (Math.abs(n - explode) > 0.0001) {
        explode = n;
        dirty = true;
      }
    },
    setSpread(n) {
      if (n !== spread) {
        spread = n;
        dirty = true;
      }
    },
    setCanopy: paper.setCanopy,
    setSun: paper.setSun,
    setPose(pose) {
      root.position.fromArray(pose.position);
      root.rotation.fromArray([...pose.rotation, "XYZ"]);
      root.scale.setScalar(pose.scale);
    },
    setHighlight(part) {
      root.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const mat = child.material as THREE.MeshStandardMaterial;
          if (mat.emissive) {
            mat.emissive.set(
              child.userData.partId === part ? "#B8923A" : "#1A1613",
            );
            mat.emissiveIntensity = child.userData.partId === part ? 0.32 : 0;
          }
        }
      });
    },
    point(part, index = 4) {
      let local: THREE.Vector3;
      if (part === "runner") local = new THREE.Vector3(0, runner.position.y, 0);
      else if (part === "handle")
        local = new THREE.Vector3(0, grip.position.y - 0.05, 0);
      else if (part === "canopy")
        local = new THREE.Vector3().copy(
          paperPoint(open, index, 0.7, 0.5, explode, spread),
        );
      else if (part === "stretchers") {
        const attach = ribPoint(
          open,
          index,
          ATTACH / RIB_LENGTH,
          explode,
          spread,
        );
        local = new THREE.Vector3(
          attach.x * 0.5,
          (runner.position.y + attach.y) * 0.5,
          attach.z * 0.5,
        );
      } else {
        local = new THREE.Vector3().copy(
          ribPoint(
            open,
            index,
            part === "thread" ? 0.28 : 0.7,
            explode,
            spread,
          ),
        );
        if (part === "thread") local.y -= 0.018;
      }
      return root.localToWorld(local);
    },
    update,
    tick(dt) {
      update();
      paper.tick(dt);
    },
    get open() {
      return open;
    },
    get animating() {
      return paper.animating;
    },
    dispose() {
      paper.dispose();
      const geometries = new Set<THREE.BufferGeometry>(),
        materials = new Set<THREE.Material>(),
        textures = new Set<THREE.Texture>();
      root.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.geometry) geometries.add(mesh.geometry);
        if (mesh.material)
          for (const mat of Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material]) {
            materials.add(mat);
            for (const value of Object.values(mat))
              if (value instanceof THREE.Texture) textures.add(value);
          }
      });
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
    },
  };
  root.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  root.userData.sculptRuntime = runtime;
  update();
  return root;
}
