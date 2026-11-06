import {describe,expect,it} from "vitest";
import * as THREE from "three";
import {createOpticalLensModel,type LensRuntime} from "./createOpticalLensModel";
import {getLensTransformationPose,LENS_INTERIOR_YAW} from "./lensTransformation";

function coreIsCovered(model:THREE.Group,r:LensRuntime,yaw:number){
  model.updateMatrixWorld(true);
  const camera=new THREE.OrthographicCamera(-5,5,3.7,-3.7,.1,50);
  camera.position.setFromSphericalCoords(12,Math.PI/2-.14,yaw);camera.lookAt(0,0,0);camera.updateMatrixWorld(true);
  const target=r.nodes["front-lens"].localToWorld(new THREE.Vector3(0,0,.2)).project(camera);
  const ray=new THREE.Raycaster();ray.setFromCamera(new THREE.Vector2(target.x,target.y),camera);
  const hits=ray.intersectObject(model,true),core=hits.find(h=>h.object.userData.componentId==="front-lens");
  expect(core).toBeDefined();
  return hits.some(h=>h.distance<core!.distance-1e-5&&h.object.userData.componentId==="front-shutter");
}
describe("closed to revealed optical transformation",()=>{
  it("keeps every shutter hinge attached to a solid front-shell mounting post",()=>{
    const model=createOpticalLensModel(undefined,{quality:"low"});const r=model.userData.sculptRuntime as LensRuntime;
    try{for(const t of [0,4.5,6,12,19,21,24]){
      r.setTransformationPose(getLensTransformationPose(t));model.updateMatrixWorld(true);
      const cover=r.meshes["front-shutter"] as THREE.InstancedMesh,mount=r.meshes["front-shell"],p=mount.geometry.getAttribute("position");
      for(let i=0;i<4;i++){const matrix=new THREE.Matrix4();cover.getMatrixAt(i,matrix);const hinge=new THREE.Vector3().applyMatrix4(matrix).applyMatrix4(cover.matrixWorld);let nearest=Infinity;
        for(let j=0;j<p.count;j++)nearest=Math.min(nearest,new THREE.Vector3().fromBufferAttribute(p,j).applyMatrix4(mount.matrixWorld).distanceTo(hinge));
        expect(nearest).toBeLessThan(1e-6);
      }
    }}finally{r.dispose();}
  });
  it("keeps exterior glass fragments in front of the moving solid cover",()=>{
    const model=createOpticalLensModel(undefined,{quality:"low"});const r=model.userData.sculptRuntime as LensRuntime;
    const range=(group:THREE.Object3D)=>{
      let min=Infinity,max=-Infinity;const v=new THREE.Vector3(),instance=new THREE.Matrix4();
      group.traverse(o=>{const mesh=o as THREE.Mesh;if(!mesh.isMesh)return;const p=mesh.geometry.getAttribute("position"),inst=mesh as THREE.InstancedMesh;
        for(let i=0;i<(inst.isInstancedMesh?inst.count:1);i++){const matrix=mesh.matrixWorld.clone();if(inst.isInstancedMesh){inst.getMatrixAt(i,instance);matrix.multiply(instance);}for(let j=0;j<p.count;j++){v.fromBufferAttribute(p,j).applyMatrix4(matrix);min=Math.min(min,v.z);max=Math.max(max,v.z);}}
      });return {min,max};
    };
    try{for(const t of [0,4,4.5,5,6,8,12,19,20,21,24]){
      r.setTransformationPose(getLensTransformationPose(t));model.updateMatrixWorld(true);
      expect(range(r.nodes.shards).min-range(r.nodes["front-shutter"]).max).toBeGreaterThan(.02);
    }}finally{r.dispose();}
  });
  it("physically covers the interior in the closed pose and uncovers it for the reveal",()=>{
    const model=createOpticalLensModel(undefined,{quality:"low"});const r=model.userData.sculptRuntime as LensRuntime;
    try{
      r.setTransformationPose(getLensTransformationPose(0));
      expect(coreIsCovered(model,r,-.46)).toBe(true);expect(coreIsCovered(model,r,0)).toBe(true);
      r.setTransformationPose(getLensTransformationPose(12));expect(coreIsCovered(model,r,LENS_INTERIOR_YAW)).toBe(false);
      r.setTransformationPose(getLensTransformationPose(24));expect(coreIsCovered(model,r,-.46)).toBe(true);
    }finally{r.dispose();}
  });
  it("opens and recloses the same solid shutter petals without hiding or scaling them",()=>{
    const model=createOpticalLensModel(undefined,{quality:"low"});const r=model.userData.sculptRuntime as LensRuntime;
    try{
      const mesh=r.meshes["front-shutter"] as THREE.InstancedMesh;expect(mesh).toBeDefined();
      const geometry=mesh.geometry,rest=Array.from(mesh.instanceMatrix.array);
      r.setTransformationPose(getLensTransformationPose(12));expect(Array.from(mesh.instanceMatrix.array)).not.toEqual(rest);
      expect(mesh.visible).toBe(true);expect(mesh.scale.toArray()).toEqual([1,1,1]);expect(mesh.geometry).toBe(geometry);
      r.setTransformationPose(getLensTransformationPose(24));expect(Array.from(mesh.instanceMatrix.array)).toEqual(rest);
    }finally{r.dispose();}
  });
});
