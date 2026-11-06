import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { getLensTransformationPose } from "./lensTransformation";
import { createOpticalLensModel, type LensRuntime } from "./createOpticalLensModel";
import { OPTICAL_ORDER } from "./interiorLayout";

function vertices(root:THREE.Object3D,visit:(v:THREE.Vector3)=>void) {
  const v=new THREE.Vector3(),instance=new THREE.Matrix4();
  root.traverse(o=>{
    const mesh=o as THREE.Mesh;if(!mesh.isMesh)return;
    const p=mesh.geometry.getAttribute("position"),instanced=mesh as THREE.InstancedMesh;
    for(let j=0;j<(instanced.isInstancedMesh?instanced.count:1);j++){
      const matrix=mesh.matrixWorld.clone();
      if(instanced.isInstancedMesh){instanced.getMatrixAt(j,instance);matrix.multiply(instance);}
      for(let i=0;i<p.count;i++){v.fromBufferAttribute(p,i).applyMatrix4(matrix);visit(v);}
    }
  });
}

describe("mechanical transformation poses",()=>{
  it("leaves the core sightline clear of opaque retaining cells at the reference view",()=>{
    const model=createOpticalLensModel(undefined,{quality:"low",pass:"form-refinement"});
    const r=model.userData.sculptRuntime as LensRuntime;
    try {
      r.setTransformationPose(getLensTransformationPose(12));model.updateMatrixWorld(true);
      const camera=new THREE.OrthographicCamera(-5,5,3,-3,.1,50);
      camera.position.setFromSphericalCoords(12,Math.PI/2-.14,Math.PI/3);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
      const point=r.nodes["front-lens"].localToWorld(new THREE.Vector3(0,0,.2)).project(camera);
      const ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2(point.x,point.y),camera);
      const hits=ray.intersectObject(model,true);
      const core=hits.find(h=>h.object.userData.componentId==="front-lens");expect(core).toBeDefined();
      const occluders=hits.filter(h=>h.distance<core!.distance&&String(h.object.userData.componentId).endsWith("-cell"));
      expect(occluders.map(h=>h.object.userData.componentId)).toEqual([]);
    } finally {r.dispose();}
  });
  it("preserves the original assembled radius across all actual mesh instances",()=>{
    const model=createOpticalLensModel(undefined,{quality:"low",pass:"form-refinement"});
    const r=model.userData.sculptRuntime as LensRuntime;
    try {
      r.setTransformationPose(getLensTransformationPose(0));let radius=0;
      vertices(model,v=>{radius=Math.max(radius,Math.hypot(v.x,v.y));});
      expect(radius).toBeLessThanOrEqual(2.491);
    } finally {r.dispose();}
  });

  it("clears both continuous glass rings before the housing moves through their radial envelope",()=>{
    const model=createOpticalLensModel(undefined,{quality:"low",pass:"form-refinement"});
    const r=model.userData.sculptRuntime as LensRuntime;
    try {
      for(const t of [0,4.25,4.75,5,5.5,6,7,8,10,12,16,18,19,20,20.5,21,24]){
        const pose=getLensTransformationPose(t);r.setTransformationPose(pose);
        for(let i=0;i<4;i++)vertices(r.nodes[`housing-panel-${i}`],v=>{
          const radius=Math.hypot(v.x,v.y);
          if(radius>1.585&&radius<2.515)expect(v.z<pose.frontCarriage-.255-.005||v.z>pose.frontCarriage+.285+.005).toBe(true);
        });
      }
    } finally {r.dispose();}
  });
  it("keeps deployed panel corners behind the solid rear-frame flange",()=>{
    const model=createOpticalLensModel(undefined,{quality:"low",pass:"form-refinement"});
    const r=model.userData.sculptRuntime as LensRuntime;
    try {
      r.setTransformationPose(getLensTransformationPose(12));model.updateMatrixWorld(true);
      const rearZ=r.nodes["rear-frame"].getWorldPosition(new THREE.Vector3()).z;
      for(let panel=0;panel<4;panel++) {
        const mesh=r.meshes[`housing-panel-${panel}`],p=mesh.geometry.getAttribute("position"),v=new THREE.Vector3();
        for(let i=0;i<p.count;i++) {
          v.fromBufferAttribute(p,i).applyMatrix4(mesh.matrixWorld);
          const radius=Math.hypot(v.x,v.y);
          const insideFlange=radius>1.68&&radius<2.09&&v.z>rearZ-.085&&v.z<rearZ+.085;
          expect(insideFlange).toBe(false);
        }
      }
    } finally {r.dispose();}
  });
  it("holds both closed ends and the readable interior, and unlocks before deployment",()=>{
    expect(getLensTransformationPose(0)).toEqual(getLensTransformationPose(24));
    expect(getLensTransformationPose(23).body).toBe(0);
    expect(getLensTransformationPose(3.5).body).toBe(0);
    expect(getLensTransformationPose(5.5).frontCarriage).toBe(.5);
    expect(getLensTransformationPose(12).frontCarriage).toBe(1.05);
    expect(getLensTransformationPose(12).panelPivot).toEqual([1,1,1,1]);
    expect(getLensTransformationPose(12).ambientWeight).toBe(0);
    expect(getLensTransformationPose(-24)).toEqual(getLensTransformationPose(0));
    expect(getLensTransformationPose(NaN)).toEqual(getLensTransformationPose(0));
  });

  it("keeps the same intact geometry and restores every transform after forward/backward sampling",()=>{
    const model=createOpticalLensModel(undefined,{quality:"low",pass:"form-refinement"});
    const r=model.userData.sculptRuntime as LensRuntime;
    const matrices=()=>Object.fromEntries(Object.entries(r.nodes).map(([id,o])=>[id,o.matrixWorld.toArray()]));
    const geometry:string[]=[];model.traverse(o=>{if((o as THREE.Mesh).isMesh)geometry.push((o as THREE.Mesh).geometry.uuid);});
    try {
      r.setTransformationPose(getLensTransformationPose(0));model.updateMatrixWorld(true);const rest=matrices();
      for(const t of [5,8,12,18,21,3,12,0,24]){
        r.setTransformationPose(getLensTransformationPose(t));
        expect(Object.keys(r.nodes)).toHaveLength(42);
        const current:string[]=[];model.traverse(o=>{expect(o.visible).toBe(true);if((o as THREE.Mesh).isMesh)current.push((o as THREE.Mesh).geometry.uuid);});
        expect(current).toEqual(geometry);
        for(const o of Object.values(r.nodes))expect(o.scale.toArray()).toEqual([1,1,1]);
      }
      expect(matrices()).toEqual(rest);
    } finally {r.dispose();}
  });

  it("retains optical air gaps, physical rail engagement and linkage endpoints throughout travel",()=>{
    const model=createOpticalLensModel(undefined,{quality:"low",pass:"form-refinement"});
    const r=model.userData.sculptRuntime as LensRuntime;
    try {
      for(let t=0;t<=24;t+=.125){
        r.setTransformationPose(getLensTransformationPose(t));model.updateMatrixWorld(true);
        const boxes=OPTICAL_ORDER.map(id=>new THREE.Box3().setFromObject(r.nodes[id]));
        for(let i=1;i<boxes.length;i++)expect(boxes[i-1].min.z-boxes[i].max.z).toBeGreaterThan(.0299);
        const m=model.userData.interiorRig.measureAttachments();
        expect(m.linkGap).toBeLessThan(.005);expect(m.railOffset).toBeLessThan(.005);
        expect(m.railSurfaceGap).toBeLessThan(.005);expect(m.railAxialOverlap).toBeGreaterThan(.02);
      }
    } finally {r.dispose();}
  });
});
