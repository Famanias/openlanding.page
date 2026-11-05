import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { createOpticalLensModel, opticalLensSpec, type LensRuntime, type OpticalLensSpec } from "./createOpticalLensModel";

function radiusSamples(g:THREE.BufferGeometry) {
  const p=g.getAttribute("position");
  return Array.from({length:p.count},(_,i)=>({r:Math.hypot(p.getX(i),p.getY(i)),z:p.getZ(i)}));
}

describe("closed curved optical volumes",()=>{
  it("gives the primary biconvex element readable optical depth in profile",()=>{
    const r=createOpticalLensModel(undefined,{quality:"low",pass:"form-refinement"}).userData.sculptRuntime as LensRuntime;
    try {
      const g=r.meshes["front-biconvex"].geometry;g.computeBoundingBox();
      const size=g.boundingBox!.getSize(new THREE.Vector3());
      expect(size.z/size.x).toBeGreaterThan(.09);
    } finally {r.dispose();}
  });
  it("exposes the relocated core retaining trim on the carrier face",()=>{
    const model=createOpticalLensModel(undefined,{quality:"low",pass:"form-refinement"});
    const r=model.userData.sculptRuntime as LensRuntime;
    try {
      model.updateMatrixWorld(true);
      const hit=new THREE.Raycaster(new THREE.Vector3(.615,0,2),new THREE.Vector3(0,0,-1)).intersectObject(r.nodes["core-carrier"],true)[0];
      expect(r.pickPart(hit?.object??null)?.name).toBe("core-retaining-beads");
    } finally {r.dispose();}
  });
  it("keeps positive perimeter thickness and a concave rear meniscus surface",()=>{
    const r=createOpticalLensModel(undefined,{quality:"low",pass:"form-refinement"}).userData.sculptRuntime as LensRuntime;
    try {
      const samples=radiusSamples(r.meshes["front-meniscus"].geometry);
      const edge=samples.filter(p=>p.r>1.0499),center=samples.filter(p=>p.r<1e-6);
      const edgeFront=Math.max(...edge.map(p=>p.z)),edgeBack=Math.min(...edge.map(p=>p.z));
      const centerFront=Math.max(...center.map(p=>p.z)),centerBack=Math.min(...center.map(p=>p.z));
      expect(edgeFront-edgeBack).toBeGreaterThan(.02);
      expect(centerFront).toBeGreaterThan(edgeFront+.025);
      expect(centerBack).toBeGreaterThan(edgeBack+.015);
    } finally {r.dispose();}
  });

  it("builds the rear plano-convex element with a real plane back face",()=>{
    const r=createOpticalLensModel(undefined,{quality:"low",pass:"form-refinement"}).userData.sculptRuntime as LensRuntime;
    try {
      const samples=radiusSamples(r.meshes["rear-plano"].geometry);
      const min=Math.min(...samples.map(p=>p.z));
      expect(samples.filter(p=>p.r>.1&&Math.abs(p.z-min)<1e-6).length).toBeGreaterThan(20);
      expect(new Set(samples.map(p=>p.z.toFixed(4))).size).toBeGreaterThan(10);
      expect(samples.every(p=>Number.isFinite(p.r)&&Number.isFinite(p.z))).toBe(true);
    } finally {r.dispose();}
  });

  it("leaves no glass inside the metal cell at its retaining perimeter",()=>{
    const r=createOpticalLensModel(undefined,{quality:"low",pass:"form-refinement"}).userData.sculptRuntime as LensRuntime;
    const material=new THREE.MeshBasicMaterial({side:THREE.DoubleSide});
    try {
      const glass=r.meshes["front-meniscus"];
      const body=r.nodes["front-meniscus-cell"].children.find(o=>(o as THREE.Mesh).isMesh) as THREE.Mesh;
      const metalProbe=(body as THREE.InstancedMesh).isInstancedMesh?new THREE.InstancedMesh(body.geometry,material,(body as THREE.InstancedMesh).count):new THREE.Mesh(body.geometry,material);
      if((body as THREE.InstancedMesh).isInstancedMesh)for(let i=0;i<(body as THREE.InstancedMesh).count;i++){const m=new THREE.Matrix4();(body as THREE.InstancedMesh).getMatrixAt(i,m);(metalProbe as THREE.InstancedMesh).setMatrixAt(i,m);}
      const glassProbe=new THREE.Mesh(glass.geometry,material);
      const hits=(mesh:THREE.Mesh,radius:number)=>{
        mesh.updateMatrixWorld(true);
        return [...new Set(new THREE.Raycaster(new THREE.Vector3(radius*Math.SQRT1_2,radius*Math.SQRT1_2,2),new THREE.Vector3(0,0,-1)).intersectObject(mesh).map(h=>Number(h.point.z.toFixed(6))))].sort((a,b)=>b-a);
      };
      for(const radius of [1.041,1.045,1.049]) {
        const gz=hits(glassProbe,radius),mz=hits(metalProbe,radius);
        expect(gz.length).toBe(2);
        for(let i=0;i<mz.length-1;i+=2) {
          const overlap=Math.min(gz[0],mz[i])-Math.max(gz[1],mz[i+1]);
          expect(overlap).toBeLessThan(.0005);
        }
      }
    } finally {material.dispose();r.dispose();}
  });

  it("rejects a nonpositive optical edge before constructing model resources",()=>{
    const spec=structuredClone(opticalLensSpec) as OpticalLensSpec;
    spec.components.find(c=>c.id==="front-meniscus")!.geometry.edgeThickness=-.01;
    expect(()=>{
      const model=createOpticalLensModel(spec,{pass:"form-refinement",quality:"low"});
      (model.userData.sculptRuntime as LensRuntime).dispose();
    }).toThrow("Invalid optical profile");
  });
});
