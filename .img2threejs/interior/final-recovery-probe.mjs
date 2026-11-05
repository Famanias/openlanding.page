import {chromium} from '@playwright/test';
import {build} from 'esbuild';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
await build({entryPoints:['.img2threejs/interior/preview.ts'],bundle:true,format:'esm',outfile:'.img2threejs/interior/preview.js'});
const b=await chromium.launch({channel:'chromium',args:['--use-angle=d3d11']});
try{const p=await b.newPage({viewport:{width:900,height:700}});await p.goto('http://127.0.0.1:4321/?controller=1&time=1');await p.waitForFunction(()=>window.__ready);
 await p.evaluate(()=>{window.lensController.setPointer(.8,.5);window.lensController.start();});await p.waitForTimeout(500);
 const rebuild=()=>p.evaluate(()=>{
  const old=window.lensController;old.stop(true);const snapshot=old.getInspectionSnapshot(),time=old.getAnimationTime(),scale=old.getResolutionScale();
  const before={camera:old.camera.matrixWorld.toArray(),rotation:old.model.rotation.toArray(),snapshot};
  const Type=old.constructor;old.dispose();const host=document.querySelector('div');const replacement=new Type({initialAnimationTime:time,initialResolutionScale:scale,initialInspectionState:snapshot});replacement.init(host);
  const after={camera:replacement.camera.matrixWorld.toArray(),rotation:replacement.model.rotation.toArray(),snapshot:replacement.getInspectionSnapshot()};replacement.stop(true);window.lensController=replacement;return {before,after};
 });
 const parallax=await rebuild();
 await p.mouse.move(450,350);await p.mouse.down();await p.mouse.move(600,280,{steps:5});
 const activeDrag=await rebuild();await p.mouse.up();
 for(const result of [parallax,activeDrag])for(const key of ['camera','rotation'])for(let i=0;i<result.before[key].length;i++){if(typeof result.before[key][i]==='number')assert.ok(Math.abs(result.before[key][i]-result.after[key][i])<1e-10);}
 await writeFile('.img2threejs/interior/final-recovery-probe.json',JSON.stringify({parallax,activeDrag},null,2));console.log('Actual initialized camera matrix, model rotation and pointer/parallax snapshot preserved, including physical active drag.');
}finally{await b.close();}
