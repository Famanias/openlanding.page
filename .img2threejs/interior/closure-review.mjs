import {chromium} from '@playwright/test';
import {build} from 'esbuild';
import {mkdir,writeFile} from 'node:fs/promises';
import sharp from 'sharp';
import assert from 'node:assert/strict';
await build({entryPoints:['.img2threejs/interior/preview.ts'],bundle:true,format:'esm',outfile:'.img2threejs/interior/preview.js'});
const out='.img2threejs/closure';await mkdir(out,{recursive:true});
const browser=await chromium.launch({channel:'chromium',args:['--use-angle=d3d11']});
try{
 const page=await browser.newPage({viewport:{width:900,height:700}});const reports=[];
 for(const phase of [0,4.5,6,8,12,18,21,24]){
  await page.goto(`http://127.0.0.1:4321/?controller=1&time=${phase}`);await page.waitForFunction(()=>window.__ready);
  const metrics=await page.evaluate(()=>{
   const c=window.lensController,THREE=window.THREE;let triangles=0;const fits=[];
   c.model.traverse(o=>{if(o.isMesh)triangles+=(o.geometry.index?.count??o.geometry.getAttribute('position').count)/3*(o.count??1);});
   for(const [width,height]of [[1440,900],[900,700],[390,844]]){
    c.resize(width,height);c.model.updateMatrixWorld(true);c.camera.updateMatrixWorld(true);let extent=0;
    c.model.traverse(o=>{if(!o.isMesh)return;const p=o.geometry.getAttribute('position');for(let j=0;j<(o.count??1);j++){const matrix=o.matrixWorld.clone();if(o.isInstancedMesh){const m=new THREE.Matrix4();o.getMatrixAt(j,m);matrix.multiply(m);}for(let i=0;i<p.count;i++){const v=new THREE.Vector3().fromBufferAttribute(p,i).applyMatrix4(matrix).project(c.camera);extent=Math.max(extent,Math.abs(v.x),Math.abs(v.y));}}});
    fits.push({width,height,extent});
   }c.resize(900,700);
   return {parts:Object.keys(c.runtime.nodes).length,triangles,calls:c.getRenderer().info.render.calls,fits};
  });
  const full=await page.screenshot({path:`${out}/${phase}.png`});
  await page.evaluate(()=>{const c=window.lensController;c.runtime.nodes['front-lens'].visible=false;c.getRenderer().render(c.scene,c.camera);});
  const hidden=await page.screenshot();
  const [a,b]=await Promise.all([full,hidden].map(v=>sharp(v).removeAlpha().raw().toBuffer()));
  let changed=0,green=0;for(let i=0;i<a.length;i+=3){if(Math.max(Math.abs(a[i]-b[i]),Math.abs(a[i+1]-b[i+1]),Math.abs(a[i+2]-b[i+2]))>8){changed++;if(a[i+1]>55&&a[i+1]>a[i]*1.25&&a[i+1]>a[i+2]*1.1)green++;}}
  await page.evaluate(()=>{const c=window.lensController;for(const id of ['front-meniscus','front-biconvex','front-compensator','front-lens','rear-relay','rear-plano','rear-lens'])c.runtime.nodes[id].visible=false;c.getRenderer().render(c.scene,c.camera);});
  const opticsHidden=await sharp(await page.screenshot()).removeAlpha().raw().toBuffer();let opticsChanged=0;
  for(let i=0;i<a.length;i+=3)if(Math.max(Math.abs(a[i]-opticsHidden[i]),Math.abs(a[i+1]-opticsHidden[i+1]),Math.abs(a[i+2]-opticsHidden[i+2]))>8)opticsChanged++;
  reports.push({phase,...metrics,coreDifferencePixels:changed,coreGreenPixels:green,opticalTrainDifferencePixels:opticsChanged});
  assert.ok(metrics.calls<=110);assert.ok(metrics.triangles<=200000);
  assert.ok(metrics.fits.every(f=>f.extent<.98));
 }
 await writeFile(`${out}/visibility.json`,JSON.stringify(reports,null,2));console.log(reports);
 assert.equal(reports[0].coreDifferencePixels,0);assert.equal(reports.at(-1).coreDifferencePixels,0);
 assert.equal(reports[0].opticalTrainDifferencePixels,0);assert.equal(reports.at(-1).opticalTrainDifferencePixels,0);
 assert.ok(reports.find(v=>v.phase===12).coreGreenPixels>500);
}finally{await browser.close();}
