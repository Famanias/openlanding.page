import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import defaultSpec from "./lens-spec.json";
import { createLensMaterials } from "./lensMaterials";
import { deriveInteriorLayout, INTERIOR_IDS, validateInteriorClearances } from "./interiorLayout";
import { createLensInterior } from "./createLensInterior";
import type { OpticalLensSpec } from "./lensTypes";
import { getLensTransformationPose, type LensTransformationPose } from "./lensTransformation";
export type { OpticalLensSpec } from "./lensTypes";

export const BUILD_PASSES = ["blockout", "structural-pass", "form-refinement", "material-pass", "surface-pass", "lighting-pass", "interaction-pass", "optimization-pass"] as const;
export type LensBuildPass = (typeof BUILD_PASSES)[number];
export type OpticalLensOptions = { pass?: LensBuildPass; quality?: "high" | "low" };
export { defaultSpec as opticalLensSpec };

export type LensRuntime = {
  nodes: Record<string, THREE.Group>;
  meshes: Record<string, THREE.Mesh>;
  sockets: Record<string, THREE.Object3D>;
  colliders: Record<string, { type: string; radius: number; depth: number }>;
  destructionGroups: Record<string, THREE.Object3D[]>;
  setExplode: (amount: number) => void;
  setFocusRing: (radians: number) => void;
  setTransformationPose: (pose:LensTransformationPose) => void;
  setCutaway: (enabled:boolean) => void;
  setAmbientPose: (pose:{collar:number;shardOrbit:number;shardY:number}) => void;
  pickPart: (object: THREE.Object3D | null) => THREE.Group | null;
  dispose: () => void;
};

function annulus(inner: number, outer: number, depth: number, segments: number, bevel = 0) {
  const h = depth / 2, b = Math.min(bevel, h * .8, (outer - inner) * .2);
  const points = [[inner + b, -h], [outer - b, -h], [outer, -h + b], [outer, h - b], [outer - b, h], [inner + b, h], [inner, h - b], [inner, -h + b], [inner + b, -h]].map(([r, z]) => new THREE.Vector2(r, z));
  return new THREE.LatheGeometry(points, segments).rotateX(Math.PI / 2);
}

function supportAnnulus(inner: number, outer: number, depth: number) {
  const source = annulus(inner, outer, depth, 48, .004);
  const geometry = source.toNonIndexed();
  source.dispose();
  geometry.computeVertexNormals();
  const p = geometry.getAttribute("position"), n = geometry.getAttribute("normal");
  for(let i=0;i<p.count;i++) {
    const theta=Math.atan2(p.getY(i),p.getX(i));
    const radial=Math.hypot(n.getX(i),n.getY(i))*Math.sign(n.getX(i)*Math.cos(theta)+n.getY(i)*Math.sin(theta));
    n.setXYZ(i,radial*Math.cos(theta),radial*Math.sin(theta),n.getZ(i));
  }
  return geometry;
}

function flutedTorus(radius: number, tube: number, depth: number, flutes: number, amplitude: number, twist: number, segments: number) {
  const radialSegments = 48, tubularSegments = segments * 2;
  const geo = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);
  const p = geo.getAttribute("position"), uv = geo.getAttribute("uv");
  for (let i = 0; i < p.count; i++) {
    const u = uv.getX(i) * Math.PI * 2, v = uv.getY(i) * Math.PI * 2;
    const relief = amplitude * Math.sin(flutes * u + twist * v) * Math.sin(v) ** 2;
    const r = radius + (tube + relief) * Math.cos(v);
    p.setXYZ(i, r * Math.cos(u), r * Math.sin(u), (depth + relief) * Math.sin(v));
  }
  geo.computeVertexNormals();
  const n = geo.getAttribute("normal");
  const stride = tubularSegments + 1;
  const v0 = new THREE.Vector3(), v1 = new THREE.Vector3();
  for (let r = 0; r <= radialSegments; r++) {
    const i0 = r * stride, i1 = i0 + tubularSegments;
    v0.fromBufferAttribute(n, i0).add(v1.fromBufferAttribute(n, i1)).normalize();
    n.setXYZ(i0, v0.x, v0.y, v0.z);
    n.setXYZ(i1, v0.x, v0.y, v0.z);
  }
  for (let c = 0; c <= tubularSegments; c++) {
    const i0 = c, i1 = radialSegments * stride + c;
    v0.fromBufferAttribute(n, i0).add(v1.fromBufferAttribute(n, i1)).normalize();
    n.setXYZ(i0, v0.x, v0.y, v0.z);
    n.setXYZ(i1, v0.x, v0.y, v0.z);
  }
  n.needsUpdate = true;
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
export function createOpticalLensModel(spec: OpticalLensSpec = defaultSpec as OpticalLensSpec, options: OpticalLensOptions = {}) {
  const layout = deriveInteriorLayout(spec);
  const clearance = validateInteriorClearances(layout);
  if (!clearance.passed) throw new Error(`Invalid optical clearances: ${JSON.stringify(clearance.violations)}`);
  const root = new THREE.Group();
  root.name = "lenus-optical-lens";
  const runtime: LensRuntime = {
    nodes: {},
    meshes: {},
    sockets: {},
    colliders: {},
    destructionGroups: {},
    setExplode: () => {},
    setFocusRing: () => {},
    setTransformationPose: () => {},
    setCutaway: () => {},
    setAmbientPose: () => {},
    pickPart: () => null,
    dispose: () => {},
  };
  const segments = options.quality === "low" ? 64 : 128;
  const interiorStage = BUILD_PASSES.indexOf(options.pass ?? "optimization-pass");
  // Accepted exterior form remains intact while the new interior progresses through its passes.
  const stage = 7;
  const microSegments = stage >= 7 ? Math.max(48, segments >> 1) : segments;
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const clay = new THREE.MeshStandardMaterial({ color: "#9197a0", roughness: 0.65 });
  const physical = interiorStage >= 3 ? createLensMaterials(spec, interiorStage >= 4) : null;
  materials.add(clay);
  const descriptors = new Map(spec.components.map(c=>[c.id,c]));
  const addMesh = (id:string, geometry:THREE.BufferGeometry, count=0,override?:THREE.Material) => {
    geometry.computeBoundingSphere();
    geometries.add(geometry);
    const c=descriptors.get(id)!;
    const material=override??physical?.materials.get(c.geometry.kind==="optical-element"?`glass:${id}`:c.material)??clay;
    if(override)materials.add(override);
    const mesh=count?new THREE.InstancedMesh(geometry,material,count):new THREE.Mesh(geometry,material);
    mesh.name=`${id}-mesh-${runtime.nodes[id].children.length}`;
    mesh.userData.componentId=id;mesh.userData.explodeWithParent=true;
    runtime.nodes[id].add(mesh);runtime.meshes[id]=mesh;return mesh;
  };

  for (const c of spec.components) {
    const pivot = new THREE.Group();
    pivot.name = c.id;
    pivot.position.fromArray(c.position);
    runtime.nodes[c.id] = pivot;
  }
  for (const c of spec.components) {
    (c.parent === "root" ? root : runtime.nodes[c.parent]).add(runtime.nodes[c.id]);
  }

  for (const [componentIndex, c] of spec.components.entries()) {
    const pivot = runtime.nodes[c.id];
    pivot.userData.basePosition = pivot.position.clone();
    pivot.userData.componentIndex = componentIndex;
    pivot.userData.parentComponent = c.parent ?? "root";
    const g = c.geometry;
    if (stage >= 6) {
      const socket = new THREE.Object3D();
      socket.name = `${c.id}-seat`;
      pivot.add(socket);
      runtime.sockets[socket.name] = socket;
      runtime.colliders[c.id] = { type: "cylinder", radius: g.outer ?? g.outerRadius ?? g.radius ?? 0.5, depth: g.depth ?? 0.2 };
      const groupKey = c.parent ?? c.id;
      (runtime.destructionGroups[groupKey] ??= []).push(pivot);
    }
    if ((INTERIOR_IDS as readonly string[]).includes(c.id)) continue;
    const add = (geometry:THREE.BufferGeometry,count=0) => addMesh(c.id,geometry,count);
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
        for (const radius of g.radii!) add(new THREE.TorusGeometry(radius, g.tube!, 6, microSegments));
        continue;
      }
      case "prisms": {
        for (const [i, [x, y, z, size]] of g.points!.entries()) {
          const geo = stage >= 2 ? prism(size, i) : new THREE.TetrahedronGeometry(size);
          const mesh = add(geo);
          mesh.name = `shard-${pivot.children.length}`;
          mesh.position.set(x, y, z);
          mesh.userData.basePosition = mesh.position.clone();
          if (stage >= 2) mesh.rotation.set(.25 + i * .37, .18 + i * .29, .4 + i * 1.7);
          pivot.add(mesh);
        }
        continue;
      }
      default: throw new Error(`Unknown lens geometry: ${g.kind}`);
    }
    add(geometry);
  }
  const rig=createLensInterior({root,runtime,stage:interiorStage,addMesh,annulus:supportAnnulus},spec);
  runtime.setExplode=rig.setSeparation;
  runtime.setFocusRing=rig.setFocus;
  runtime.setTransformationPose=rig.setPose;
  runtime.setCutaway=(enabled:boolean)=>rig.setPose(getLensTransformationPose(enabled?12:0));
  runtime.setAmbientPose=rig.setAmbientPose;
  runtime.pickPart = (object: THREE.Object3D | null) => {
    let cur: THREE.Object3D | null = object;
    while (cur && cur !== root) {
      if (typeof cur.userData?.componentId === "string" && runtime.nodes[cur.userData.componentId]) {
        return runtime.nodes[cur.userData.componentId];
      }
      if (runtime.nodes[cur.name]) return runtime.nodes[cur.name];
      cur = cur.parent;
    }
    return null;
  };
  let disposed=false;
  runtime.dispose = () => { if(disposed)return;disposed=true;geometries.forEach((g) => g.dispose()); materials.forEach((m) => m.dispose()); physical?.dispose(); };
  root.userData.sculptRuntime = runtime;
  root.userData.buildPass = options.pass ?? "optimization-pass";
  return root;
}
