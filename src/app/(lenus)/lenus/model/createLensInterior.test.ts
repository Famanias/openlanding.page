import { describe, expect, it, vi } from "vitest";
import * as THREE from "three";
import { createOpticalLensModel, type LensRuntime } from "./createOpticalLensModel";
import { INTERIOR_IDS, OPTICAL_ORDER } from "./interiorLayout";

describe("interior support and assembly hierarchy", () => {
  it("exposes deterministic transformation and physical inspection on the existing runtime", () => {
    const model=createOpticalLensModel(undefined,{quality:"low",pass:"form-refinement"});
    const r=model.userData.sculptRuntime as LensRuntime;
    try {
      expect(typeof r.setTransformationPose).toBe("function");
      expect(typeof r.setCutaway).toBe("function");
    } finally {r.dispose();}
  });

  it("refines each housing quarter into a curved closed shell", () => {
    const model=createOpticalLensModel(undefined,{quality:"low",pass:"form-refinement"});
    const r=model.userData.sculptRuntime as LensRuntime;
    try {
      const p=r.meshes["housing-panel-0"].geometry.getAttribute("position");
      const angles=new Set(Array.from({length:p.count},(_,i)=>Math.atan2(p.getY(i),p.getX(i)).toFixed(5)));
      expect(angles.size).toBeGreaterThan(16);
    } finally {r.dispose();}
  });
  it("releases shared geometry once when lifecycle cleanup repeats", () => {
    const model=createOpticalLensModel(undefined,{quality:"low",pass:"structural-pass"});
    const r=model.userData.sculptRuntime as LensRuntime;
    const dispose=vi.spyOn(r.meshes["guide-rails"].geometry,"dispose");
    r.dispose();r.dispose();
    expect(dispose).toHaveBeenCalledTimes(1);
  });
  it("keeps physical linkage endpoints and rail sockets aligned throughout static deployment", () => {
    const model=createOpticalLensModel(undefined,{quality:"low",pass:"structural-pass"});
    const r=model.userData.sculptRuntime as LensRuntime;
    const rig=model.userData.interiorRig;
    try {
      expect(rig).toBeDefined();
      for(const amount of [0,.25,.5,.75,1]) {
        rig.setDeployment(amount);model.updateMatrixWorld(true);
        const measured=rig.measureAttachments();
        expect(measured.linkGap).toBeLessThan(.005);
        expect(measured.railOffset).toBeLessThan(.005);
        expect(measured.railSurfaceGap).toBeLessThan(.005);
        expect(measured.railAxialOverlap).toBeGreaterThan(.02);
      }
      r.sockets["housing-panel-0-link-root-0"].position.x+=.05;
      model.updateMatrixWorld(true);
      expect(rig.measureAttachments().linkGap).toBeGreaterThan(.04);
    } finally {r.dispose();}
  });
  it("builds and picks every new semantic part with a socket, collider and material", () => {
    const model = createOpticalLensModel(undefined,{quality:"low",pass:"structural-pass"});
    const r = model.userData.sculptRuntime as LensRuntime;
    try {
      for(const id of INTERIOR_IDS) {
        expect(r.nodes[id]).toBeDefined();
        expect(r.meshes[id]?.geometry.getAttribute("position").count).toBeGreaterThan(0);
        expect(r.meshes[id]?.material).toBeDefined();
        expect(r.sockets[`${id}-seat`]).toBeDefined();
        expect(r.colliders[id]).toBeDefined();
        expect(r.pickPart(r.meshes[id])?.name).toBe(id);
      }
      expect(r.sockets["front-meniscus-cell-rail-0"]).toBeDefined();
      expect(model.getObjectByName("front-carriage")).toBeDefined();
      expect(model.getObjectByName("collar-unlock")).toBeDefined();
    } finally {r.dispose();}
  });

  it("separates adjacent optical groups while each cell retains its glass", () => {
    const model=createOpticalLensModel(undefined,{quality:"low",pass:"structural-pass"});
    const r=model.userData.sculptRuntime as LensRuntime;
    const positions=()=>OPTICAL_ORDER.map(id=>r.nodes[id].getWorldPosition(new THREE.Vector3()).z);
    try {
      model.updateMatrixWorld(true);const before=positions();
      r.setExplode(1);model.updateMatrixWorld(true);const after=positions();
      for(let i=1;i<before.length;i++)expect(after[i-1]-after[i]).toBeGreaterThan(before[i-1]-before[i]);
      for(const id of ["front-meniscus","front-biconvex","rear-relay"]){
        expect(r.nodes[id].parent).toBe(r.nodes[`${id}-cell`]);
        expect(r.nodes[id].position.toArray()).toEqual([0,0,0]);
      }
      r.setExplode(0);model.updateMatrixWorld(true);
      positions().forEach((z,i)=>expect(z).toBeCloseTo(before[i],8));
    } finally {r.dispose();}
  });
});
