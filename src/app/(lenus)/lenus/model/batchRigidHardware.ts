import * as THREE from "three";
import {mergeGeometries} from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type {LensRuntime} from "./createOpticalLensModel";

/** Bake only solids that share a semantic pivot, material and rigid motion. */
export function batchRigidHardware(root:THREE.Group,runtime:LensRuntime,addMesh:(id:string,geometry:THREE.BufferGeometry)=>THREE.Mesh){
  const ids=["front-meniscus-cell","front-biconvex-cell","front-compensator-cell","core-carrier","rear-relay-cell","rear-plano-cell","internal-barrel","rear-beads","core-retaining-beads","retaining-beads"];
  root.updateMatrixWorld(true);
  for(const id of ids){
    const node=runtime.nodes[id],sources:THREE.Mesh[]=[];
    node.traverse(o=>{const mesh=o as THREE.Mesh;if(!mesh.isMesh||mesh.userData.componentId!==id)return;
      // The two inner trim rings have independent axial motion.
      if(id==="retaining-beads"&&((mesh.geometry as THREE.TorusGeometry).parameters.radius<1.6))return;
      sources.push(mesh);
    });
    if(sources.length<2)continue;
    if(sources.some(mesh=>mesh.material!==sources[0].material))throw new Error(`Rigid batch material mismatch: ${id}`);
    const inverse=node.matrixWorld.clone().invert(),pieces:THREE.BufferGeometry[]=[];
    const ranges:{name:string;vertexStart:number;vertexCount:number}[]=[];let vertexStart=0;
    try{
      for(const source of sources){
        const instanced=source as THREE.InstancedMesh;
        for(let i=0;i<(instanced.isInstancedMesh?instanced.count:1);i++){
          let geometry=source.geometry.clone();
          if(!geometry.getAttribute("tangent")){
            if(!geometry.index)geometry.setIndex(Array.from({length:geometry.getAttribute("position").count},(_,index)=>index));
            geometry.computeTangents();
          }
          if(geometry.index){const flat=geometry.toNonIndexed();geometry.dispose();geometry=flat;}
          const matrix=inverse.clone().multiply(source.matrixWorld);
          if(instanced.isInstancedMesh){const instance=new THREE.Matrix4();instanced.getMatrixAt(i,instance);matrix.multiply(instance);}
          geometry.applyMatrix4(matrix);
          const vertexCount=geometry.getAttribute("position").count;
          ranges.push({name:`${source.name}/${i}`,vertexStart,vertexCount});vertexStart+=vertexCount;pieces.push(geometry);
        }
      }
      const merged=mergeGeometries(pieces,false);if(!merged)throw new Error(`Rigid batch failed: ${id}`);
      // Review adapters can split the actual merged buffer back into its closed
      // solids, including embedded joints, without omitting any rendered vertex.
      merged.userData.rigidSources=ranges;
      const mesh=addMesh(id,merged);mesh.name=`${id}-rigid-hardware`;
      for(const source of sources)source.removeFromParent();
    }finally{pieces.forEach(geometry=>geometry.dispose());}
  }
}
