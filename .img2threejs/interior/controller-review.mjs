import {chromium} from '@playwright/test';
import {build} from 'esbuild';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
await build({entryPoints:['.img2threejs/interior/preview.ts'],bundle:true,format:'esm',outfile:'.img2threejs/interior/preview.js'});
const pass=process.argv[2]??'interaction-pass';if(!['interaction-pass','optimization-pass'].includes(pass))throw Error('Invalid review pass');
const native=process.env.LENUS_NATIVE_GPU==='1';
const out=`.img2threejs/interior/captures/${pass}/${native?'controller-native':'controller'}`;await mkdir(out,{recursive:true});
const browser=await chromium.launch({...(native?{channel:'chromium'}:{}),args:[...(native?['--use-angle=d3d11']:[]),'--enable-webgl','--ignore-gpu-blocklist']});
const context=await browser.newContext({viewport:{width:900,height:700},recordVideo:{dir:out,size:{width:900,height:700}}});
const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
const evidence=[];
try{
 await page.goto('http://127.0.0.1:4321/?controller=1&time=0');await page.waitForFunction(()=>window.__ready);
 await page.evaluate(()=>window.lensController.start());
 await page.waitForFunction(()=>window.lensController.getAnimationTime()>=24.15,{},{timeout:90000});
 await page.evaluate(()=>window.lensController.stop(true));
 evidence.push({completeCycle:await page.evaluate(()=>window.lensController.getAnimationTime()),fps:await page.evaluate(()=>window.lensFps),gpu:await page.evaluate(()=>{const gl=window.lensController.getRenderer().getContext(),ext=gl.getExtension('WEBGL_debug_renderer_info');return ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):'unknown';})});
 for(const phase of [0,3,6,8,10,12,15,18,20,22,23.99,24]){
   await page.goto(`http://127.0.0.1:4321/?controller=1&time=${phase}`);await page.waitForFunction(()=>window.__ready);
   const before=await page.evaluate(()=>window.lensController.getInspectionSnapshot());
   const fit=await page.evaluate(()=>{
    const c=window.lensController,THREE=window.THREE,results=[];
    for(const [width,height]of [[1440,900],[900,700],[390,844]]){
     c.resize(width,height);c.model.updateMatrixWorld(true);c.camera.updateMatrixWorld(true);let maximumProjectedExtent=0;
     c.model.traverse(o=>{if(!o.isMesh)return;const p=o.geometry.getAttribute('position');for(let j=0;j<(o.count??1);j++){const matrix=o.matrixWorld.clone();if(o.isInstancedMesh){const m=new THREE.Matrix4();o.getMatrixAt(j,m);matrix.multiply(m);}for(let i=0;i<p.count;i++){const v=new THREE.Vector3().fromBufferAttribute(p,i).applyMatrix4(matrix).project(c.camera);maximumProjectedExtent=Math.max(maximumProjectedExtent,Math.abs(v.x),Math.abs(v.y));}}});
     results.push({width,height,maximumProjectedExtent,calls:c.getRenderer().info.render.calls,renderedTriangles:c.getRenderer().info.render.triangles});
    }c.resize(900,700);return results;
   });
   assert.ok(fit.every(f=>f.maximumProjectedExtent<.98&&f.calls<=110));
   if([0,8,12,20,24].includes(phase))await page.screenshot({path:`${out}/hero-${phase}.png`});
   await page.evaluate(()=>{const c=window.lensController;c.start();c.setInspectionMode('cutaway');c.setExplodeTarget(1);c.setFocusTarget(.6);});
   await page.waitForTimeout(120);
   const held=await page.evaluate(()=>({time:window.lensController.getAnimationTime(),snapshot:window.lensController.getInspectionSnapshot()}));
   assert.equal(held.time,phase);assert.equal(held.snapshot.mode,'cutaway');
   await page.evaluate(()=>{const c=window.lensController;c.stop(true);c.setInspectionMode('hero');});
   const resumed=await page.evaluate(()=>({time:window.lensController.getAnimationTime(),snapshot:window.lensController.getInspectionSnapshot()}));
   assert.equal(resumed.time,phase);assert.ok(Math.abs(resumed.snapshot.camera.yaw-before.camera.yaw)<1e-9);
   evidence.push({phase,heldTime:held.time,restoredYaw:resumed.snapshot.camera.yaw,fit});
 }
 await page.evaluate(()=>{const c=window.lensController;c.setInspectionMode('cutaway');c.setExplodeTarget(1);c.setFocusTarget(.5);});
 const saved=await page.evaluate(()=>window.lensController.getInspectionSnapshot());
 const ext=await page.evaluateHandle(()=>window.lensController.getRenderer().getContext().getExtension('WEBGL_lose_context'));
 await ext.evaluate(e=>e.loseContext());await page.waitForTimeout(100);await ext.evaluate(e=>e.restoreContext());await page.waitForTimeout(700);
 assert.deepEqual(await page.evaluate(()=>window.lensController.getInspectionSnapshot()),saved);
 await page.screenshot({path:`${out}/inspection-restored.png`});
 await page.evaluate(()=>window.lensController.resetView());assert.equal(await page.evaluate(()=>window.lensController.getAnimationTime()),0);
 assert.deepEqual(errors,[]);await writeFile(`${out}/runtime.json`,JSON.stringify({errors,evidence,contextRestore:true},null,2));
 console.log('Complete 24-second native-controller recording and phase interruption/recovery checks pass.');
}finally{await context.close();await browser.close();}
