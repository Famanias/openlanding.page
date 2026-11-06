import {chromium} from '@playwright/test';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const b=await chromium.launch({channel:'chromium',args:['--use-angle=d3d11']});
try{const p=await b.newPage({viewport:{width:390,height:844}});await p.goto('http://127.0.0.1:4321/?controller=1&time=12');await p.waitForFunction(()=>window.__ready);
 const report=await p.evaluate(()=>{
  const c=window.lensController,T=window.THREE;c.setInspectionMode('cutaway');c.setExplodeTarget(1);c.model.updateMatrixWorld(true);
  let radius=0;c.model.traverse(o=>{if(!o.isMesh)return;const a=o.geometry.getAttribute('position');for(let j=0;j<(o.count??1);j++){const m=o.matrixWorld.clone();if(o.isInstancedMesh){const n=new T.Matrix4();o.getMatrixAt(j,n);m.multiply(n);}for(let i=0;i<a.count;i++)radius=Math.max(radius,new T.Vector3().fromBufferAttribute(a,i).applyMatrix4(m).length());}});
  const halfExtent=Math.min(c.camera.right,c.camera.top);
  return {maximumWorldRadius:radius,minimumFrustumHalfExtent:halfExtent,maximumProjectedExtentForAnyOrbit:radius/halfExtent,calls:c.getRenderer().info.render.calls,separation:c.getInspectionSnapshot().controls.currentExplode};
 });
 assert.ok(report.maximumProjectedExtentForAnyOrbit<.98);assert.ok(report.calls<=110);
 await writeFile('.img2threejs/closure/inspection.json',JSON.stringify(report,null,2));console.log(report);
}finally{await b.close();}
