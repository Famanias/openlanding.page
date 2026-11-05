import {describe,it,expect} from "vitest";
import * as THREE from "three";
import {createOpticalLensModel,type LensRuntime} from "./createOpticalLensModel";
import {getLensTransformationPose} from "./lensTransformation";

function inventory(root:THREE.Object3D){
  const parts:Record<string,{triangles:number;bounds:THREE.Box3;sum:THREE.Vector3}>={};let calls=0;
  root.updateMatrixWorld(true);const v=new THREE.Vector3(),instance=new THREE.Matrix4();
  root.traverse(o=>{const mesh=o as THREE.Mesh;if(!mesh.isMesh)return;calls++;
    const id=mesh.userData.componentId as string,p=mesh.geometry.getAttribute("position"),index=mesh.geometry.index;
    const a=parts[id]??= {triangles:0,bounds:new THREE.Box3(),sum:new THREE.Vector3()};
    const count=index?.count??p.count,inst=mesh as THREE.InstancedMesh;
    for(let j=0;j<(inst.isInstancedMesh?inst.count:1);j++){
      const matrix=mesh.matrixWorld.clone();if(inst.isInstancedMesh){inst.getMatrixAt(j,instance);matrix.multiply(instance);}
      a.triangles+=count/3;
      for(let i=0;i<count;i++){v.fromBufferAttribute(p,index?index.getX(i):i).applyMatrix4(matrix);a.bounds.expandByPoint(v);a.sum.add(v);}
    }
  });return {parts,calls};
}
describe("rigid hardware batching",()=>{
  it("reduces opaque submissions without changing the physical or semantic inventory",()=>{
    const original=createOpticalLensModel(undefined,{pass:"optimization-pass",quality:"low",batchOpaque:false});
    const batched=createOpticalLensModel(undefined,{pass:"optimization-pass",quality:"low"});
    const a=original.userData.sculptRuntime as LensRuntime,b=batched.userData.sculptRuntime as LensRuntime;
    try{
      expect(inventory(batched).calls).toBeLessThanOrEqual(64);
      expect(Object.keys(a.nodes)).toEqual(Object.keys(b.nodes));
      for(const [time,separation]of [[0,0],[8,0],[12,0],[12,1],[18,0]]){
        a.setTransformationPose(getLensTransformationPose(time));b.setTransformationPose(getLensTransformationPose(time));a.setExplode(separation);b.setExplode(separation);
        const before=inventory(original),after=inventory(batched);
        for(const id of Object.keys(before.parts)){
          const x=before.parts[id],y=after.parts[id];expect(y.triangles,id).toBe(x.triangles);
          expect(y.bounds.min.distanceTo(x.bounds.min),id).toBeLessThan(1e-5);expect(y.bounds.max.distanceTo(x.bounds.max),id).toBeLessThan(1e-5);
          expect(y.sum.clone().sub(x.sum).length()/(x.triangles*3),id).toBeLessThan(1e-6);
          expect(b.pickPart(b.meshes[id])?.name).toBe(id);
        }
        expect(batched.userData.interiorRig.measureAttachments().railAxialOverlap).toBeGreaterThanOrEqual(.0199);
      }
    }finally{a.dispose();b.dispose();}
  });
});
