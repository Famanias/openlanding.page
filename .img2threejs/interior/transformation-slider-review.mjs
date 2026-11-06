import {chromium} from '@playwright/test';
import {build} from 'esbuild';
import {writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
await build({entryPoints:['.img2threejs/interior/preview.ts'],bundle:true,format:'esm',outfile:'.img2threejs/interior/preview.js'});
const browser=await chromium.launch({channel:'chromium',args:['--use-angle=d3d11']});
try{
 const page=await browser.newPage({viewport:{width:900,height:700}});
 await page.goto('http://127.0.0.1:4321/?controller=1');await page.waitForFunction(()=>window.__ready);
 await page.evaluate(()=>{const c=window.lensController;c.stop(true);c.setTransformationTarget(1);});
 const opening=[];
 for(let i=0;i<25;i++){await page.waitForTimeout(80);opening.push(await page.evaluate(()=>window.lensController.getTransformationProgress()));}
 assert.equal(opening.at(-1),1);assert.ok(opening.some(v=>v>0&&v<1));
 await page.evaluate(()=>window.lensController.setTransformationTarget(0));
 const closing=[];
 for(let i=0;i<25;i++){await page.waitForTimeout(80);closing.push(await page.evaluate(()=>window.lensController.getTransformationProgress()));}
 assert.equal(closing.at(-1),0);assert.ok(closing.some(v=>v>0&&v<1));
 for(let i=1;i<closing.length;i++)assert.ok(closing[i]<=closing[i-1]);
 assert.equal(await page.evaluate(()=>window.lensController.getAnimationTime()),0);
 await page.evaluate(()=>{const c=window.lensController;c.setTransformationTarget(1);c.stop(false);});await page.waitForTimeout(200);
 assert.equal(await page.evaluate(()=>window.lensController.getTransformationProgress()),0);
 await page.evaluate(()=>window.lensController.stop(true));await page.waitForFunction(()=>window.lensController.getTransformationProgress()===1);
 const snapshot=await page.evaluate(()=>window.lensController.getInspectionSnapshot());
 assert.equal(snapshot.transformation.target,1);assert.equal(snapshot.transformation.progress,1);
 await page.evaluate(()=>window.lensController.setTransformationTarget(0));await page.waitForFunction(()=>window.lensController.getTransformationProgress()===0);
 await page.evaluate(()=>new Promise(resolve=>{const start=performance.now();const timer=setInterval(()=>{const c=window.lensController;c.setTransformationTarget(1);c.stop(true);if(performance.now()-start>450){clearInterval(timer);resolve();}},4);}));
 const duringInput=await page.evaluate(()=>window.lensController.getTransformationProgress());assert.ok(duringInput>.1,'Repeated slider input must not reset the animation clock');
 await writeFile('.img2threejs/closure/slider-motion.json',JSON.stringify({opening,closing,snapshot,suspendedMotionHeld:true,progressDuringRepeatedInput:duringInput},null,2));
 console.log('Smooth paused 0->100->0, exact endpoints, held clock and suspension checks pass.');
}finally{await browser.close();}
