import {chromium} from '@playwright/test';
import sharp from 'sharp';
import {mkdir,writeFile} from 'node:fs/promises';
import {build} from 'esbuild';
const pass=process.argv[2]??'material-pass';
if(!['material-pass','surface-pass','lighting-pass','interaction-pass','optimization-pass'].includes(pass))throw Error('Invalid pass');
const base=`.img2threejs/interior/captures/${pass}/core-visibility`;await mkdir(base,{recursive:true});
await build({entryPoints:['.img2threejs/interior/preview.ts'],bundle:true,format:'esm',outfile:'.img2threejs/interior/preview.js'});
const browser=await chromium.launch({headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
const reports=[];
const sweep=process.argv.includes('--sweep');
const samples=sweep?[['closed',0,-.46*180/Math.PI],...Array.from({length:15},(_,i)=>[`deployed-${i*5+15}`,12,i*5+15])]:[['closed',0,-.46*180/Math.PI],['opening',8,(-.46+Math.PI*5/18)/2*180/Math.PI],['deployed',12,50],['reference-deployed',12,60]];
try{
 const page=await browser.newPage({viewport:{width:1376,height:768},deviceScaleFactor:1});
 await page.goto(`http://127.0.0.1:4321/?pass=${pass}`);await page.waitForFunction(()=>window.__ready);
 for(const [pose,seconds,angle]of samples){
  const roi=await page.evaluate(({seconds,angle})=>{
   const v=window.lensViewer;v.setPhase(seconds);v.setView(angle);
   v.camera.position.setFromSphericalCoords(12,Math.PI/2-.14,angle*Math.PI/180);v.camera.lookAt(0,0,0);
   const h=3.8;v.camera.left=-h*1376/768;v.camera.right=h*1376/768;v.camera.top=h;v.camera.bottom=-h;v.camera.updateProjectionMatrix();v.render();v.camera.updateMatrixWorld(true);
   const node=v.model.userData.sculptRuntime.nodes['front-lens'];let x0=1376,y0=768,x1=0,y1=0;
   node.traverse(o=>{if(!o.isMesh)return;o.geometry.computeBoundingBox();const b=o.geometry.boundingBox;for(const x of [b.min.x,b.max.x])for(const y of [b.min.y,b.max.y])for(const z of [b.min.z,b.max.z]){const p=o.position.clone().set(x,y,z).applyMatrix4(o.matrixWorld).project(v.camera);const px=(p.x+1)*688,py=(1-p.y)*384;x0=Math.min(x0,px);x1=Math.max(x1,px);y0=Math.min(y0,py);y1=Math.max(y1,py);}});
   return {x0:Math.max(0,Math.floor(x0)),y0:Math.max(0,Math.floor(y0)),x1:Math.min(1375,Math.ceil(x1)),y1:Math.min(767,Math.ceil(y1))};
  },{seconds,angle});
  const fullPath=`${base}/${pose}.png`;await page.screenshot({path:fullPath});
  await page.evaluate(()=>{const v=window.lensViewer;v.model.traverse(o=>{if(o.isMesh&&o.userData.componentId==='front-lens')o.visible=false;});v.render();});
  const hiddenPath=`${base}/${pose}-hidden.png`;await page.screenshot({path:hiddenPath});
  await page.evaluate(()=>{const v=window.lensViewer;v.model.traverse(o=>{if(o.isMesh&&o.userData.componentId==='front-lens')o.visible=true;});v.render();});
  const full=await sharp(fullPath).ensureAlpha().raw().toBuffer(),hidden=await sharp(hiddenPath).ensureAlpha().raw().toBuffer();
  let greenPixels=0,footprintPixels=0;
  for(let y=roi.y0;y<=roi.y1;y++)for(let x=roi.x0;x<=roi.x1;x++){
   const i=(y*1376+x)*4,delta=Math.max(...[0,1,2].map(c=>Math.abs(full[i+c]-hidden[i+c])));
   if(delta>8){footprintPixels++;if(full[i+1]>full[i]*1.25&&full[i+1]>full[i+2]*1.1&&full[i+1]>55)greenPixels++;}
  }
  const minimum=Math.max(100,Math.floor((roi.x1-roi.x0)*(roi.y1-roi.y0)*.08));
  const report={pose,seconds,angle,roi,greenPixels,minimum,footprintPixels,passed:greenPixels>=minimum};reports.push(report);console.log(JSON.stringify(report));
 }
 await writeFile(`${base}/${sweep?'report-sweep':'report'}.json`,JSON.stringify(reports,null,2));
 if(!sweep&&reports.some(r=>!r.passed))process.exitCode=1;
}finally{await browser.close();}
