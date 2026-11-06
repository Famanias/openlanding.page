import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import { build } from 'esbuild';
const pass=process.argv[2]??'blockout';
const allowed=['blockout','structural-pass','form-refinement','material-pass','surface-pass','lighting-pass','interaction-pass','optimization-pass'];
if(!allowed.includes(pass))throw Error('Unsupported pass');
await build({entryPoints:['.img2threejs/interior/preview.ts'],bundle:true,format:'esm',outfile:'.img2threejs/interior/preview.js'});
const base=`.img2threejs/interior/captures/${pass}`;await mkdir(base,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--enable-webgl','--ignore-gpu-blocklist']});
try{
 const page=await browser.newPage({viewport:{width:1376,height:768},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`http://127.0.0.1:4321/?pass=${pass}`);await page.waitForFunction(()=>window.__ready===true);
 if(pass==='form-refinement')await page.evaluate(()=>{if(typeof window.lensViewer.setPhase!=='function'||typeof window.lensViewer.setCutaway!=='function')throw Error('Missing deterministic phase/inspection capture controls');});
 for(const pose of ['closed','deployed']){
  const destination=`${base}/${pose}`;await mkdir(destination,{recursive:true});
  await page.evaluate(pose=>{
   const v=window.lensViewer,r=v.model.userData.sculptRuntime;
   if(r.setTransformationPose&&v.setPhase){v.setPhase(pose==='closed'?0:12);}
   else if(v.model.userData.interiorRig){v.model.userData.interiorRig.setDeployment(pose==='deployed'?1:0);}
   else if(pose==='deployed'){
    for(const id of ['outer-glass','inner-glass','front-shell','collar-outer','collar-middle','collar-inner','retaining-beads','shards'])r.nodes[id].position.z+=1.05;
    const offsets={'front-meniscus-cell':.65,'front-biconvex-cell':.40,'front-compensator-cell':.18,'rear-relay-cell':-.08,'rear-plano-cell':-.20,'rear-lens':-.30};
    for(const [id,z]of Object.entries(offsets))r.nodes[id].position.z+=z;
    for(let i=0;i<4;i++){const t=i*Math.PI/2+Math.PI/4;r.nodes[`housing-panel-${i}`].position.x+=Math.cos(t)*.65;r.nodes[`housing-panel-${i}`].position.y+=Math.sin(t)*.65;}
   }
   const h=pose==='closed'?2.625:3.375;
   v.camera.left=-h*1376/768;v.camera.right=h*1376/768;v.camera.top=h;v.camera.bottom=-h;v.camera.updateProjectionMatrix();
  },pose);
  for(const angle of [0,60,90,180,270]){await page.evaluate(angle=>window.lensViewer.setView(angle),angle);await page.screenshot({path:`${destination}/${angle}.png`});}
  const evidence=await page.evaluate(()=>{
   const v=window.lensViewer,r=v.model.userData.sculptRuntime;v.model.updateMatrixWorld(true);
   const meshes=[];let modelTriangles=0;
   v.model.traverse(o=>{
    if(!o.isMesh||!o.visible)return;
    const p=o.geometry.getAttribute('position'),n=o.geometry.getAttribute('normal'),triangles=(o.geometry.index?.count??p.count)/3;modelTriangles+=triangles*(o.count??1);
    const ranges=o.geometry.userData.rigidSources??[{name:o.name,vertexStart:0,vertexCount:p.count}];
    if(ranges.reduce((sum,r)=>sum+r.vertexCount,0)!==p.count)throw Error('Incomplete rendered-buffer review coverage');
    for(let instance=0;instance<(o.count??1);instance++){
     const matrix=o.matrixWorld.clone();if(o.isInstancedMesh){const local=new window.THREE.Matrix4();o.getMatrixAt(instance,local);matrix.multiply(local);}
     for(const range of ranges){const {vertexStart:start,vertexCount:count}=range;
      meshes.push({name:`${range.name}/${instance}`,vertices:Array.from({length:count},(_,i)=>[p.getX(start+i),p.getY(start+i),p.getZ(start+i)]),normals:Array.from({length:count},(_,i)=>[n.getX(start+i),n.getY(start+i),n.getZ(start+i)]),indices:o.geometry.index?Array.from(o.geometry.index.array):Array.from({length:count},(_,i)=>i),worldMatrix:matrix.toArray()});
     }
    }
   });
   const positions=Object.fromEntries(Object.entries(r.nodes).map(([id,o])=>[id,o.getWorldPosition(o.position.clone()).toArray()]));
   const sockets=Object.fromEntries(Object.entries(r.sockets).map(([id,o])=>[id,o.getWorldPosition(o.position.clone()).toArray()]));
   return {meshes,positions,sockets,attachments:v.model.userData.interiorRig?.measureAttachments(),parts:{model:v.model.name,parts:Object.keys(r.nodes).map(name=>({name,kind:'part',module:name})),unnamedMeshes:meshes.filter(m=>!m.name).length},stats:{modelTriangles,renderedTriangles:v.renderer.info.render.triangles,calls:v.renderer.info.render.calls}};
  });
  for(const [file,data]of Object.entries({'meshes.json':{meshes:evidence.meshes},'measured.json':evidence.positions,'sockets.json':evidence.sockets,'attachments.json':evidence.attachments,'parts.json':evidence.parts,'runtime.json':{errors,...evidence.stats}}))await writeFile(`${destination}/${file}`,JSON.stringify(data));
  console.log(pose,JSON.stringify(evidence.stats));
 }
 const hasPhases=await page.evaluate(()=>typeof window.lensViewer.setPhase==='function');
 if(hasPhases){
  await mkdir(`${base}/phases`,{recursive:true});const phases=[];
  for(const seconds of [0,3,4,5,6,8,10,12,15,18,20,21,22,23.99,24]){
   const metrics=await page.evaluate(seconds=>{
    const v=window.lensViewer;v.setPhase(seconds);v.setView(60);
    const h=3.8;v.camera.left=-h*1376/768;v.camera.right=h*1376/768;v.camera.top=h;v.camera.bottom=-h;v.camera.updateProjectionMatrix();v.render();
    const r=v.model.userData.sculptRuntime;
    const order=['front-meniscus','front-biconvex','front-compensator','front-lens','rear-relay','rear-plano','rear-lens'];
    const boxes=order.map(id=>{
     let min=Infinity,max=-Infinity;
     r.nodes[id].traverse(o=>{if(!o.isMesh)return;o.geometry.computeBoundingBox();const box=o.geometry.boundingBox;for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z]){const p=o.position.clone().set(x,y,z).applyMatrix4(o.matrixWorld);min=Math.min(min,p.z);max=Math.max(max,p.z);}});
     return {min,max};
    });
    return {seconds,...v.model.userData.interiorRig.measureAttachments(),minimumOpticalGap:Math.min(...boxes.slice(1).map((b,i)=>boxes[i].min-b.max)),semanticCount:Object.keys(r.nodes).length,calls:v.renderer.info.render.calls,renderedTriangles:v.renderer.info.render.triangles};
   },seconds);
   phases.push(metrics);await page.screenshot({path:`${base}/phases/${seconds}.png`});
  }
  await writeFile(`${base}/phase-measurements.json`,JSON.stringify(phases,null,2));
  if(phases.some(p=>p.minimumOpticalGap<.0299||p.linkGap>.005||p.railSurfaceGap>.005||p.railAxialOverlap<.02||p.semanticCount!==41))throw Error('Transformation phase measurements failed');
  await page.evaluate(()=>window.lensViewer.setPhase(12));
 }
 const fits=[];
 for(const [width,height]of [[1440,900],[900,700],[390,844]]){
  await page.setViewportSize({width,height});
  const fit=await page.evaluate(({width,height})=>{
   const v=window.lensViewer;v.resize(width,height);
   const h=4.2*Math.max(1,height/width);v.camera.left=-h*width/height;v.camera.right=h*width/height;v.camera.top=h;v.camera.bottom=-h;v.camera.updateProjectionMatrix();v.setView(60);v.camera.updateMatrixWorld(true);v.model.updateMatrixWorld(true);
   let maximumProjectedExtent=0;
   v.model.traverse(o=>{if(!o.isMesh)return;o.geometry.computeBoundingBox();const box=o.geometry.boundingBox;const instances=o.count??1;for(let j=0;j<instances;j++){const matrix=o.matrixWorld.clone();if(o.isInstancedMesh){o.getMatrixAt(j,matrix);matrix.premultiply(o.matrixWorld);}for(const x of [box.min.x,box.max.x])for(const y of [box.min.y,box.max.y])for(const z of [box.min.z,box.max.z]){const p=o.position.clone().set(x,y,z).applyMatrix4(matrix).project(v.camera);maximumProjectedExtent=Math.max(maximumProjectedExtent,Math.abs(p.x),Math.abs(p.y));}}});
   return {width,height,halfHeight:h,maximumProjectedExtent,fullyInside:maximumProjectedExtent<.98};
  },{width,height});
  fits.push(fit);await page.screenshot({path:`${base}/viewport-${width}.png`});
 }
 await writeFile(`${base}/viewport-fit.json`,JSON.stringify(fits,null,2));
 if(fits.some(f=>!f.fullyInside))throw Error('Review viewport clips deployed geometry');
 if(errors.length)throw Error(errors.join('\n'));
}finally{await browser.close();}
