import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import defaultSpec from "./lens-spec.json";
import { createLensMaterials } from "./lensMaterials";

export const BUILD_PASSES = ["blockout", "structural-pass", "form-refinement", "material-pass", "surface-pass", "lighting-pass", "interaction-pass", "optimization-pass"] as const;
export type LensBuildPass = (typeof BUILD_PASSES)[number];
export type OpticalLensSpec = typeof defaultSpec;
export type OpticalLensOptions = { pass?: LensBuildPass; quality?: "high" | "low" };
export { defaultSpec as opticalLensSpec };

export type LensRuntime = {
  nodes: Record<string, THREE.Group>;
  meshes: Record<string, THREE.Mesh>;
  sockets: Record<string, THREE.Object3D>;
  colliders: Record<string, { type: string; radius: number; depth: number }>;
  destructionGroups: Record<string, THREE.Object3D[]>;
  dispose: () => void;
};

function annulus(inner: number, outer: number, depth: number, segments: number, bevel = 0) {
  const h = depth / 2, b = Math.min(bevel, h * .8, (outer - inner) * .2);
  const points = [[inner + b, -h], [outer - b, -h], [outer, -h + b], [outer, h - b], [outer - b, h], [inner + b, h], [inner, h - b], [inner, -h + b], [inner + b, -h]].map(([r, z]) => new THREE.Vector2(r, z));
  return new THREE.LatheGeometry(points, segments).rotateX(Math.PI / 2);
}

function flutedTorus(radius: number, tube: number, depth: number, flutes: number, amplitude: number, twist: number, segments: number) {
  const geo = new THREE.TorusGeometry(radius, tube, 32, segments * 2);
  const p = geo.getAttribute("position"), uv = geo.getAttribute("uv");
  for (let i = 0; i < p.count; i++) {
    const u = uv.getX(i) * Math.PI * 2, v = uv.getY(i) * Math.PI * 2;
    const relief = amplitude * Math.sin(flutes * u + twist * v) * Math.sin(v) ** 2;
    const r = radius + (tube + relief) * Math.cos(v);
    p.setXYZ(i, r * Math.cos(u), r * Math.sin(u), (depth + relief) * Math.sin(v));
  }
  geo.computeVertexNormals();
  return geo;
}

function prism(size: number, index: number) {
  const shape = new THREE.Shape();
  shape.moveTo(-size, size * .25);
  shape.lineTo(size * .55, size * .62);
  shape.lineTo(size * .85, -size * .38);
  if (index % 3 === 0) shape.lineTo(-size * .45, -size * .55);
  shape.closePath();
  return new THREE.ExtrudeGeometry(shape, { depth: size * .42, bevelEnabled: true, bevelSize: Math.min(.008, size * .12), bevelThickness: Math.min(.008, size * .12), bevelSegments: 2, steps: 1, curveSegments: 1 }).center();
}

/** Procedural reconstruction, +Z front / +Y up. Dimensions are relative units. */
export function createOpticalLensModel(spec: OpticalLensSpec = defaultSpec, options: OpticalLensOptions = {}) {
  const root = new THREE.Group();
  root.name = "lenus-optical-lens";
  const runtime: LensRuntime = { nodes: {}, meshes: {}, sockets: {}, colliders: {}, destructionGroups: {}, dispose: () => {} };
  const segments = options.quality === "low" ? 64 : 128;
  const stage = BUILD_PASSES.indexOf(options.pass ?? "blockout");
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const clay = new THREE.MeshStandardMaterial({ color: "#9197a0", roughness: 0.65 });
  const physical = stage >= 3 ? createLensMaterials(spec, stage >= 4) : null;
  materials.add(clay);

  for (const c of spec.components) {
    if (stage === 0 && c.level !== "macro") continue;
    const pivot = new THREE.Group();
    pivot.name = c.id;
    pivot.position.fromArray(c.position);
    runtime.nodes[c.id] = pivot;
    (runtime.nodes[c.parent ?? ""] ?? root).add(pivot);
    const g = c.geometry;
    const add = (geometry: THREE.BufferGeometry, count = 0) => {
      geometries.add(geometry);
      const material = physical?.materials.get(c.material) ?? clay;
      const mesh = count ? new THREE.InstancedMesh(geometry, material, count) : new THREE.Mesh(geometry, material);
      mesh.name = `${c.id}-mesh-${pivot.children.length}`;
      mesh.userData.componentId = c.id;
      mesh.userData.explodeWithParent = true;
      pivot.add(mesh);
      runtime.meshes[c.id] = mesh;
      return mesh;
    };
    let geometry: THREE.BufferGeometry;
    switch (g.kind) {
      case "fluted-torus": geometry = stage >= 2 ? flutedTorus(g.radius!, g.tube!, g.depth!, g.flutes!, g.amplitude!, g.twist!, segments) : new THREE.TorusGeometry(g.radius!, g.tube!, 20, segments); break;
      case "annulus": {
        geometry = annulus(g.inner!, g.outer!, g.depth!, segments, stage >= 2 ? g.bevel : 0);
        if (stage >= 4) {
          // Planar shoulders need face normals; smoothing the entire profile makes radial wedges.
          const flat = geometry.toNonIndexed();
          geometry.dispose();
          geometry = flat;
          geometry.computeVertexNormals();
          const p = geometry.getAttribute("position"), n = geometry.getAttribute("normal");
          const tangents = new Float32Array(p.count * 4);
          for (let i = 0; i < p.count; i++) {
            const angle = Math.atan2(p.getY(i), p.getX(i));
            const x = Math.cos(angle), y = Math.sin(angle);
            const radial = Math.hypot(n.getX(i), n.getY(i)) * Math.sign(n.getX(i) * x + n.getY(i) * y);
            n.setXYZ(i, x * radial, y * radial, n.getZ(i));
            tangents.set([-y, x, 0, 1], i * 4);
          }
          geometry.setAttribute("tangent", new THREE.BufferAttribute(tangents, 4));
        }
        break;
      }
      case "lens": geometry = new THREE.SphereGeometry(g.radius!, segments, 24).scale(1, 1, (g.depth! / 2 + g.sag!) / g.radius!); break;
      case "radial-boxes":
      case "bolts":
      case "contacts": {
        const count = g.count!;
        const shape = g.kind === "radial-boxes"
          ? stage >= 2 ? new RoundedBoxGeometry(g.width!, g.height!, g.depth!, 2, Math.min(.008, g.width! * .18)) : new THREE.BoxGeometry(g.width!, g.height!, g.depth!)
          : g.kind === "bolts"
            ? new THREE.TorusGeometry(g.size! * .72, g.size! * .20, 8, 20)
            : new THREE.SphereGeometry(g.size!, 12, 8).scale(1, 1, .4);
        const instances = add(shape, count) as THREE.InstancedMesh;
        const transform = new THREE.Object3D();
        for (let i = 0; i < count; i++) {
          const theta = g.kind === "contacts" ? (i < 9 ? Math.PI + (i - 4) * .12 : (i - 10.5) * .15) : i / count * Math.PI * 2 + (g.phase ?? 0);
          transform.position.set(Math.sin(theta) * g.radius!, Math.cos(theta) * g.radius!, 0);
          transform.rotation.z = -theta;
          transform.updateMatrix();
          instances.setMatrixAt(i, transform.matrix);
        }
        instances.instanceMatrix.needsUpdate = true;
        continue;
      }
      case "beads": {
        for (const radius of g.radii!) add(new THREE.TorusGeometry(radius, g.tube!, 6, segments));
        continue;
      }
      case "prisms": {
        for (const [i, [x, y, z, size]] of g.points!.entries()) {
          const geo = stage >= 2 ? prism(size, i) : new THREE.TetrahedronGeometry(size);
          const mesh = add(geo);
          mesh.name = `shard-${pivot.children.length}`;
          mesh.position.set(x, y, z);
          if (stage >= 2) mesh.rotation.set(.25 + i * .37, .18 + i * .29, .4 + i * 1.7);
          pivot.add(mesh);
        }
        continue;
      }
      default: continue;
    }
    add(geometry);
  }
  runtime.dispose = () => { geometries.forEach((g) => g.dispose()); materials.forEach((m) => m.dispose()); physical?.dispose(); };
  root.userData.sculptRuntime = runtime;
  root.userData.buildPass = options.pass ?? "blockout";
  return root;
}
