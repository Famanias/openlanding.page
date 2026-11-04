import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { createOpticalLensModel, type LensRuntime } from "./createOpticalLensModel";

describe("Lenus optical model integration", () => {
  it("retains the authored exterior parts and all combined registry sockets with welded torus normals", () => {
    const model = createOpticalLensModel(undefined, { quality: "low" });
    const runtime = model.userData.sculptRuntime as LensRuntime;
    try {
      expect(Object.keys(runtime.nodes)).toHaveLength(41);
      expect(Object.keys(runtime.sockets)).toHaveLength(41);
      expect(Object.keys(runtime.nodes)).toEqual(expect.arrayContaining(["outer-glass", "front-lens", "rear-fins", "gold-contacts", "shards"]));
      const normals = runtime.meshes["outer-glass"].geometry.getAttribute("normal");
      const a = 12 * 129, b = a + 128;
      expect(normals.getX(a)).toBeCloseTo(normals.getX(b), 5);
      expect(normals.getY(a)).toBeCloseTo(normals.getY(b), 5);
      expect(normals.getZ(a)).toBeCloseTo(normals.getZ(b), 5);
    } finally { runtime.dispose(); }
  });

  it("explodes reversibly, turns the focus collar and resolves picked meshes", () => {
    const runtime = createOpticalLensModel(undefined, { quality: "low" }).userData.sculptRuntime as LensRuntime;
    try {
      const core = runtime.nodes["front-lens"];
      core.updateWorldMatrix(true, false);
      const z = core.getWorldPosition(new THREE.Vector3()).z;
      runtime.setExplode(1);
      expect(Math.abs(core.getWorldPosition(new THREE.Vector3()).z-z)).toBeGreaterThan(.02);
      runtime.setExplode(0);
      expect(core.getWorldPosition(new THREE.Vector3()).z).toBeCloseTo(z, 5);
      runtime.setFocusRing(.45);
      expect(runtime.nodes["collar-outer"].rotation.z).toBeCloseTo(.45, 5);
      expect(runtime.pickPart(runtime.meshes["front-lens"])?.name).toBe("front-lens");
      expect(runtime.pickPart(new THREE.Object3D())).toBeNull();
    } finally { runtime.dispose(); }
  });
});
