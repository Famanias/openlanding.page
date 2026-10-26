import * as THREE from "three";

export type WagasaModelOptions = {
  open?: number;
  explode?: number;
  canopyColor?: string;
  motif?: "sakura" | "wave" | "plain";
};

type Runtime = {
  setOpen: (value: number) => void;
  setExplode: (value: number) => void;
  getOpen: () => number;
  getExplode: () => number;
  setCanopy: (color: string, motif: "sakura" | "wave" | "plain") => void;
};

const RIB_COUNT = 40;
const TAU = Math.PI * 2;
const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function makeCanvasTexture(color: string, motif: "sakura" | "wave" | "plain") {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1024, 1024);
  const fibre = ctx.createImageData(1024, 1024);
  let seed = 0x1a2b3c4d;
  for (let i = 0; i < fibre.data.length; i += 4) {
    seed = Math.imul(seed ^ (seed >>> 16), 2246822519) >>> 0;
    const n = ((seed >>> 24) & 15) - 7;
    fibre.data[i] = 255 + n;
    fibre.data[i + 1] = 247 + n;
    fibre.data[i + 2] = 228 + n;
    fibre.data[i + 3] = 255;
  }
  ctx.globalCompositeOperation = "screen";
  ctx.putImageData(fibre, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  if (motif === "sakura") {
    ctx.strokeStyle = "rgba(117, 78, 56, .38)";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(512, 512, 382, 0, TAU);
    ctx.stroke();
    for (let i = 0; i < 36; i += 1) {
      const angle = (i / 36) * TAU;
      const x = 512 + Math.cos(angle) * 382;
      const y = 512 + Math.sin(angle) * 382;
      ctx.fillStyle = i % 3 === 0 ? "rgba(210, 108, 132, .82)" : "rgba(235, 157, 172, .68)";
      for (let p = 0; p < 5; p += 1) {
        const a = angle + (p - 2) * 0.42;
        ctx.beginPath();
        ctx.ellipse(x + Math.cos(a) * 19, y + Math.sin(a) * 19, 13, 23, a, 0, TAU);
        ctx.fill();
      }
      ctx.fillStyle = "rgba(130, 78, 45, .8)";
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, TAU);
      ctx.fill();
    }
  } else if (motif === "wave") {
    ctx.strokeStyle = "rgba(43, 58, 85, .42)";
    ctx.lineWidth = 12;
    for (let y = 200; y < 850; y += 120) {
      ctx.beginPath();
      for (let x = 0; x <= 1024; x += 16) ctx.lineTo(x, y + Math.sin(x * 0.025) * 22);
      ctx.stroke();
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
}

function makePaperMaterial(color: string, motif: "sakura" | "wave" | "plain") {
  const map = makeCanvasTexture(color, motif);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xf4ecdd,
    map: map ?? undefined,
    roughness: 0.86,
    metalness: 0,
    transmission: 0.08,
    thickness: 0.012,
    ior: 1.35,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.96,
  });
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uBackLight = { value: new THREE.Vector3(-0.2, 0.8, -0.6).normalize() };
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <output_fragment>",
      "float amaotoGlow = pow(max(dot(normalize(vNormal), normalize(uBackLight)), 0.0), 2.0) * 0.22;\n" +
        "outgoingLight += vec3(1.0, 0.58, 0.35) * amaotoGlow;\n#include <output_fragment>",
    );
  };
  material.userData.materialId = "washi";
  return material;
}

function makeWood(color: number, roughness = 0.42) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness: 0 });
}

function tubeBetween(a: THREE.Vector3, b: THREE.Vector3, radius: number, material: THREE.Material) {
  const direction = new THREE.Vector3().subVectors(b, a);
  const geometry = new THREE.CylinderGeometry(radius, radius * 0.92, direction.length(), 8);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  return mesh;
}

function makeCanopyGeometry() {
  const radial = RIB_COUNT;
  const rings = 12;
  const positions = new Float32Array((radial + 1) * (rings + 1) * 3);
  const uvs = new Float32Array((radial + 1) * (rings + 1) * 2);
  const indices: number[] = [];
  for (let j = 0; j <= rings; j += 1) {
    for (let i = 0; i <= radial; i += 1) {
      const idx = j * (radial + 1) + i;
      uvs[idx * 2] = i / radial;
      uvs[idx * 2 + 1] = j / rings;
      if (j === 0) {
        positions[idx * 3] = 0;
        positions[idx * 3 + 1] = 2.48;
        positions[idx * 3 + 2] = 0;
      }
    }
  }
  for (let j = 0; j < rings; j += 1) {
    for (let i = 0; i < radial; i += 1) {
      const a = j * (radial + 1) + i;
      const b = a + 1;
      const c = a + radial + 1;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  return geometry;
}

function updateCanopy(geometry: THREE.BufferGeometry, open: number) {
  const attr = geometry.getAttribute("position") as THREE.BufferAttribute;
  const rings = 12;
  const radial = RIB_COUNT;
  for (let j = 0; j <= rings; j += 1) {
    const t = j / rings;
    const radius = lerp(0.04, 2.05, t) * lerp(0.16, 1, open);
    const dome = lerp(0.04, 0.52, open) * Math.sin(t * Math.PI * 0.5);
    const pleat = (1 - open) * (0.06 + t * 0.12) * Math.sin(t * Math.PI * 8);
    for (let i = 0; i <= radial; i += 1) {
      const angle = (i / radial) * TAU;
      const idx = (j * (radial + 1) + i) * 3;
      const r = radius + pleat;
      attr.setXYZ(idx / 3, Math.cos(angle) * r, 2.48 - dome - t * 0.05, Math.sin(angle) * r);
    }
  }
  attr.needsUpdate = true;
  geometry.computeVertexNormals();
}

export function createWagasaModel(options: WagasaModelOptions = {}): THREE.Group {
  const root = new THREE.Group();
  root.name = "AMAOTO Wagasa";
  root.rotation.x = 0.55;
  root.rotation.z = -0.12;
  root.scale.setScalar(0.84);
  root.userData.parts = {};
  root.userData.reconstruction = { target: "wagasa", ribCount: RIB_COUNT, approximate: ["rear motif continuity", "closed paper pleat profile"] };

  let open = clamp01(options.open ?? 0.84);
  let explode = clamp01(options.explode ?? 0);
  let canopyColor = options.canopyColor ?? "#F4ECDD";
  let motif = options.motif ?? "sakura";

  const paper = makePaperMaterial(canopyColor, motif);
  const bamboo = makeWood(0xb7894d, 0.44);
  const wood = makeWood(0x6a351c, 0.3);
  const threadMaterial = new THREE.MeshStandardMaterial({ color: 0x191311, roughness: 0.82 });

  const canopyGeometry = makeCanopyGeometry();
  updateCanopy(canopyGeometry, open);
  const canopy = new THREE.Mesh(canopyGeometry, paper);
  canopy.name = "paper-canopy";
  canopy.userData.partId = "canopy";
  root.add(canopy);

  const rim = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.055, 8, 96), paper);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 2.47;
  rim.name = "canopy-rim";
  root.add(rim);

  const shaft = new THREE.Group();
  shaft.name = "shaft";
  shaft.userData.partId = "shaft";
  const shaftMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.13, 5.8, 16), bamboo);
  shaftMesh.position.y = -0.35;
  shaft.add(shaftMesh);
  for (const y of [-2.35, -1.9, -0.95, 1.94, 2.23]) {
    const node = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.025, 6, 16), bamboo);
    node.rotation.x = Math.PI / 2;
    node.position.y = y;
    shaft.add(node);
  }
  root.add(shaft);

  const handle = new THREE.Group();
  handle.name = "handle";
  handle.userData.partId = "handle";
  const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.16, 1.5, 16), bamboo);
  grip.position.y = -3.55;
  handle.add(grip);
  for (const y of [-4.08, -3.95, -3.08, -2.98]) {
    const bead = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.035, 7, 16), bamboo);
    bead.rotation.x = Math.PI / 2;
    bead.position.y = y;
    handle.add(bead);
  }
  root.add(handle);

  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.16, 0.42, 16), wood);
  cap.position.y = 2.68;
  cap.name = "top-cap";
  cap.userData.partId = "top-cap";
  root.add(cap);

  const runner = new THREE.Group();
  runner.name = "runner-ring";
  runner.userData.partId = "runner";
  const runnerMesh = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.09, 10, 32), wood);
  runnerMesh.rotation.x = Math.PI / 2;
  runner.add(runnerMesh);
  const runnerSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.25, 16), wood);
  runner.add(runnerSleeve);
  root.add(runner);

  const rib = new THREE.Group();
  rib.name = "ribs";
  rib.userData.partId = "ribs";
  const ribMeshes: THREE.Object3D[] = [];
  for (let i = 0; i < RIB_COUNT; i += 1) {
    const angle = (i / RIB_COUNT) * TAU;
    const end = new THREE.Vector3(Math.cos(angle) * 2.05, 2.47, Math.sin(angle) * 2.05);
    const mid = new THREE.Vector3(Math.cos(angle) * 1.18, 2.5, Math.sin(angle) * 1.18);
    const item = tubeBetween(new THREE.Vector3(0, 2.52, 0), end, 0.026, bamboo);
    item.userData.partId = `rib-${i}`;
    rib.add(item);
    ribMeshes.push(item);
    const node = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.012, 5, 10), bamboo);
    node.position.copy(mid);
    node.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -angle);
    rib.add(node);
  }
  root.add(rib);

  const stretchers = new THREE.Group();
  stretchers.name = "stretchers";
  stretchers.userData.partId = "stretchers";
  const stretcherMeshes: THREE.Object3D[] = [];
  const thread = new THREE.Group();
  thread.name = "thread";
  thread.userData.partId = "thread";
  for (let i = 0; i < RIB_COUNT; i += 1) {
    const angle = (i / RIB_COUNT) * TAU;
    const outer = new THREE.Vector3(Math.cos(angle) * 1.16, 2.5, Math.sin(angle) * 1.16);
    const link = tubeBetween(new THREE.Vector3(0, 0.55, 0), outer, 0.014, bamboo);
    stretchers.add(link);
    stretcherMeshes.push(link);
    const knot = new THREE.Mesh(new THREE.SphereGeometry(0.045, 6, 4), threadMaterial);
    knot.position.set(Math.cos(angle) * 2.05, 2.47, Math.sin(angle) * 2.05);
    thread.add(knot);
  }
  const threadRing = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.012, 5, 64), threadMaterial);
  threadRing.rotation.x = Math.PI / 2;
  threadRing.position.y = 2.5;
  thread.add(threadRing);
  root.add(stretchers, thread);

  const partList = [canopy, rim, shaft, handle, cap, runner, rib, stretchers, thread];
  for (const part of partList) root.userData.parts[part.userData.partId ?? part.name] = part;

  const update = () => {
    updateCanopy(canopyGeometry, open);
    const runnerY = lerp(0.12, 0.74, open);
    runner.position.y = runnerY;
    for (let i = 0; i < RIB_COUNT; i += 1) {
      const angle = (i / RIB_COUNT) * TAU;
      const outer = new THREE.Vector3(Math.cos(angle) * lerp(0.32, 2.05, open), 2.40 - 0.05 * open, Math.sin(angle) * lerp(0.32, 2.05, open));
      const ribItem = ribMeshes[i] as THREE.Mesh;
      ribItem.geometry.dispose();
      const ribRoot = new THREE.Vector3(0, 2.44, 0);
      ribItem.geometry = new THREE.CylinderGeometry(0.026, 0.022, ribRoot.distanceTo(outer), 8);
      ribItem.position.copy(outer).add(ribRoot).multiplyScalar(0.5);
      ribItem.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3().subVectors(outer, ribRoot).normalize());
      const link = stretcherMeshes[i] as THREE.Mesh;
      link.geometry.dispose();
      const inner = new THREE.Vector3(Math.cos(angle) * lerp(0.18, 1.18, open), 2.5, Math.sin(angle) * lerp(0.18, 1.18, open));
      link.geometry = new THREE.CylinderGeometry(0.014, 0.013, new THREE.Vector3().set(0, runnerY, 0).distanceTo(inner), 6);
      link.position.copy(inner).add(new THREE.Vector3(0, runnerY, 0)).multiplyScalar(0.5);
      link.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3().subVectors(inner, new THREE.Vector3(0, runnerY, 0)).normalize());
    }
    const sep = explode;
    canopy.position.y = sep * 0.5;
    rib.position.y = -0.18 + sep * 0.18;
    stretchers.position.y = -sep * 0.08;
    runner.position.z = sep * 0.24;
    thread.position.y = sep * 0.12;
    handle.position.y = -sep * 0.32;
  };

  const runtime: Runtime = {
    setOpen: (value) => { open = clamp01(value); update(); },
    setExplode: (value) => { explode = clamp01(value); update(); },
    getOpen: () => open,
    getExplode: () => explode,
    setCanopy: (color, nextMotif) => {
      canopyColor = color;
      motif = nextMotif;
      const next = makePaperMaterial(canopyColor, motif);
      canopy.material = next;
      rim.material = next;
    },
  };
  root.userData.sculptRuntime = runtime;
  root.userData.runtime = runtime;
  root.userData.triangleBudget = { target: 60000, estimated: 15000, drawCalls: 9 };
  root.userData.getPart = (id: string) => root.userData.parts[id] ?? null;
  update();
  return root;
}

export default createWagasaModel;
