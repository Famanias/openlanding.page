import sharp from 'sharp';
import {mkdir,writeFile,copyFile,readFile} from 'node:fs/promises';
import {chromium} from '@playwright/test';
import {build} from 'esbuild';
const pass=process.argv[2]??'material-pass';
if(!['material-pass','surface-pass','lighting-pass','interaction-pass','optimization-pass'].includes(pass))throw Error('Invalid pass');
const base=`.img2threejs/interior/captures/${pass}`;await mkdir(`${base}/materials`,{recursive:true});
await build({entryPoints:['.img2threejs/interior/preview.ts'],bundle:true,format:'esm',outfile:'.img2threejs/interior/preview.js'});
const components=JSON.parse(await readFile('src/app/(lenus)/lenus/model/lens-spec.json','utf8')).components;
const families=Object.fromEntries(components.map(c=>[c.id,c.material]));
const browser=await chromium.launch({headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
try{
 const page=await browser.newPage({viewport:{width:1376,height:768},deviceScaleFactor:1});
 await page.goto(`http://127.0.0.1:4321/?pass=${pass}`);await page.waitForFunction(()=>window.__ready);
 await page.evaluate(()=>{const v=window.lensViewer;v.setPhase(0);v.resize(1376,768);v.setView(0);});
 const fullPath=`${base}/materials/full.png`;await page.screenshot({path:fullPath});
 const {data:full,info}=await sharp(fullPath).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 const largestShard=await page.evaluate(()=>{
  const v=window.lensViewer;let best=null;
  v.model.userData.sculptRuntime.nodes.shards.traverse(o=>{if(!o.isMesh)return;o.geometry.computeBoundingBox();const b=o.geometry.boundingBox;let x0=1376,y0=768,x1=0,y1=0;
   for(const x of [b.min.x,b.max.x])for(const y of [b.min.y,b.max.y])for(const z of [b.min.z,b.max.z]){const p=o.position.clone().set(x,y,z).applyMatrix4(o.matrixWorld).project(v.camera);x0=Math.min(x0,(p.x+1)*688);x1=Math.max(x1,(p.x+1)*688);y0=Math.min(y0,(1-p.y)*384);y1=Math.max(y1,(1-p.y)*384);}
   const area=(x1-x0)*(y1-y0);if(!best||area>best.area)best={x0:Math.floor(x0),y0:Math.floor(y0),x1:Math.ceil(x1),y1:Math.ceil(y1),area};
  });return best;
 });
 for(const family of ['glass','titanium','emerald','prism']){
  await page.evaluate(({family,families})=>{const v=window.lensViewer;v.model.traverse(o=>{if(o.isMesh&&families[o.userData.componentId]===family)o.visible=false;});v.render();},{family,families});
  const hiddenPath=`${base}/materials/${family}-hidden.png`;await page.screenshot({path:hiddenPath});
  await page.evaluate(({family,families})=>{const v=window.lensViewer;v.model.traverse(o=>{if(o.isMesh&&families[o.userData.componentId]===family)o.visible=true;});v.render();},{family,families});
  const hidden=await sharp(hiddenPath).ensureAlpha().raw().toBuffer();
  const masked=Buffer.from(full);let x0=info.width,y0=info.height,x1=0,y1=0,count=0;
  for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++){
   const i=(y*info.width+x)*4,delta=Math.max(...[0,1,2].map(c=>Math.abs(full[i+c]-hidden[i+c])));
   const region=family!=='prism'||(x>=largestShard.x0&&x<=largestShard.x1&&y>=largestShard.y0&&y<=largestShard.y1);
   if(delta>8&&region){x0=Math.min(x0,x);x1=Math.max(x1,x);y0=Math.min(y0,y);y1=Math.max(y1,y);count++;}else masked.set([32,33,37,255],i);
  }
  if(count<10)throw Error(`No visible material footprint: ${family}`);
  await sharp(masked,{raw:info}).extract({left:x0,top:y0,width:x1-x0+1,height:y1-y0+1}).png().toFile(`${base}/materials/${family}-render.png`);
  await copyFile(`.img2threejs/captures/lighting-pass/materials/${family}-reference.png`,`${base}/materials/${family}-reference.png`);
  await writeFile(`${base}/materials/${family}-footprint.json`,JSON.stringify({method:'Full render minus per-mesh material-hidden render; threshold8/255. Parent nodes stay visible so child materials are not accidentally hidden.',family,count,bbox:{x:x0,y:y0,width:x1-x0+1,height:y1-y0+1},calibration:'Preserved user-approved exterior material reference crop; new glass/titanium evidence additionally corroborated in material-evidence/.',largestShard:family==='prism'?largestShard:null},null,2));
 }
 for(const [pose,seconds]of [['closed',0],['deployed',12]])for(const lighting of ['neutral','grazing','reference']){
  await page.evaluate(({seconds,lighting})=>{const v=window.lensViewer;v.setPhase(seconds);if(seconds===0){v.setView(-.46*180/Math.PI);}else v.setInteriorView();v.setLighting(lighting);const h=3.8;v.camera.left=-h*1376/768;v.camera.right=h*1376/768;v.camera.top=h;v.camera.bottom=-h;v.camera.updateProjectionMatrix();v.render();},{seconds,lighting});
  await page.screenshot({path:`${base}/${pose}-${lighting}.png`});
 }
 console.log(`Captured four real material footprints and six controlled look-development views: ${pass}`);
}finally{await browser.close();}
