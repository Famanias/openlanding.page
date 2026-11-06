import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { createOpticalLensModel, type LensRuntime } from "./createOpticalLensModel";
import spec from "./lens-spec.json";
import type { OpticalLensSpec } from "./lensTypes";

describe("interior axial packing", () => {
  it("packs the closed housing into its cylindrical shell instead of protruding flat plates", () => {
    const model = createOpticalLensModel(undefined, { quality: "low", pass: "blockout" });
    const runtime = model.userData.sculptRuntime as LensRuntime;
    try {
      const mesh = runtime.meshes["housing-panel-0"];
      mesh.updateWorldMatrix(true,false);
      const p = mesh.geometry.getAttribute("position"), vertex = new THREE.Vector3();
      for(let i=0;i<p.count;i++) {
        vertex.fromBufferAttribute(p,i).applyMatrix4(mesh.matrixWorld);
        expect(Math.hypot(vertex.x,vertex.y)).toBeLessThanOrEqual(2.231);
      }
    } finally { runtime.dispose(); }
  });
  it("builds annular supports without zero-area corner strips", () => {
    const model = createOpticalLensModel(undefined, { quality: "low", pass: "blockout" });
    const runtime = model.userData.sculptRuntime as LensRuntime;
    try {
      const g = runtime.meshes["front-meniscus-cell"].geometry;
      const p = g.getAttribute("position");
      const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
      const count = g.index?.count ?? p.count;
      for (let i=0;i<count;i+=3) {
        const at = (j:number) => g.index?.getX(j) ?? j;
        a.fromBufferAttribute(p,at(i)); b.fromBufferAttribute(p,at(i+1)); c.fromBufferAttribute(p,at(i+2));
        expect(b.sub(a).cross(c.sub(a)).lengthSq()).toBeGreaterThan(1e-16);
      }
    } finally { runtime.dispose(); }
  });
  it("rejects unresolved parents and unsupported geometry before allocating resources", () => {
    const orphan = structuredClone(spec) as OpticalLensSpec;
    orphan.components[0].parent = "missing-frame";
    expect(() => createOpticalLensModel(orphan)).toThrow("Unresolved lens parent");
    const unknown = structuredClone(spec) as OpticalLensSpec;
    Object.assign(unknown.components[0].geometry, { kind: "unrecognized" });
    expect(() => createOpticalLensModel(unknown)).toThrow("Unknown lens geometry");
  });
  it("recesses the emerald core and its small retaining beads as one assembly", () => {
    const model = createOpticalLensModel(undefined, { quality: "low", pass: "blockout" });
    const runtime = model.userData.sculptRuntime as LensRuntime;
    try {
      model.updateMatrixWorld(true);
      expect(runtime.nodes["front-lens"]?.getWorldPosition(new THREE.Vector3()).z).toBeCloseTo(-.78);
      expect(runtime.nodes["core-retaining-beads"]?.parent?.name).toBe("core-carrier");
    } finally { runtime.dispose(); }
  });

  it("constructs all seven optical groups with separated axial volumes", () => {
    const model = createOpticalLensModel(undefined, { quality: "low", pass: "blockout" });
    const runtime = model.userData.sculptRuntime as LensRuntime;
    try {
      model.updateMatrixWorld(true);
      const ids = ["front-meniscus", "front-biconvex", "front-compensator", "front-lens", "rear-relay", "rear-plano", "rear-lens"];
      const bounds = ids.map(id => {
        expect(runtime.nodes[id], id).toBeDefined();
        return new THREE.Box3().setFromObject(runtime.nodes[id]);
      });
      for (let i = 1; i < bounds.length; i++) expect(bounds[i-1].min.z - bounds[i].max.z).toBeGreaterThanOrEqual(.0299);
    } finally { runtime.dispose(); }
  });

  it("moves rear hardware descendants exactly once with their existing root", () => {
    const model = createOpticalLensModel(undefined, { quality: "low" });
    const runtime = model.userData.sculptRuntime as LensRuntime;
    try {
      model.updateMatrixWorld(true);
      expect(runtime.nodes["rear-frame"].getWorldPosition(new THREE.Vector3()).z).toBeCloseTo(-1.45);
      expect(runtime.nodes["rear-fins"].parent).toBe(runtime.nodes["rear-frame"]);
      expect(runtime.nodes["rear-fins"].getWorldPosition(new THREE.Vector3()).z).toBeCloseTo(-1.55);
    } finally { runtime.dispose(); }
  });
});
