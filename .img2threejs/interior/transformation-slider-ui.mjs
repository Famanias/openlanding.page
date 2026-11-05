import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const out='.img2threejs/transformation-slider';await mkdir(out,{recursive:true});
const b=await chromium.launch({channel:'chromium',args:['--use-angle=d3d11']});
try{
 const p=await b.newPage({viewport:{width:1440,height:900}});
 await p.addInitScript(()=>{
  let writes=0;Object.defineProperty(window,'__bufferWrites',{get:()=>writes,set:value=>{writes=value;}});
  for(const name of ['width','height']){const d=Object.getOwnPropertyDescriptor(HTMLCanvasElement.prototype,name);Object.defineProperty(HTMLCanvasElement.prototype,name,{...d,set(value){if(this.dataset.lenusRenderer==='true')writes++;d.set.call(this,value);}});}
 });
 await p.goto('http://localhost:4322/lenus');await p.locator('.ln-stage[data-state="running"]').waitFor({timeout:60000});
 await p.getByRole('button',{name:'Pause animation',exact:true}).click();await p.getByRole('button',{name:'Reset optical view'}).click();
 await p.evaluate(()=>{window.__bufferWrites=0;const input=document.querySelector('input[aria-label="Lens transformation"]'),set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;for(let i=0;i<=20;i++){set.call(input,String(i*5));input.dispatchEvent(new Event('input',{bubbles:true}));}});
 const writes=await p.evaluate(()=>window.__bufferWrites);assert.equal(writes,0,'Scrubbing must not resize the drawing buffer');
 await p.locator('.ln-stage[aria-busy="false"]').waitFor();const fits=[];
 for(const [width,height]of [[1440,900],[900,700],[390,844]]){
  await p.setViewportSize({width,height});await p.waitForTimeout(100);
  const fit=await p.evaluate(()=>{const hud=document.querySelector('.ln-hud').getBoundingClientRect();return {width:hud.width,height:hud.height,overflow:document.documentElement.scrollWidth>innerWidth,sliders:[...document.querySelectorAll('.ln-hud input[type="range"]')].length};});
  assert.equal(fit.overflow,false);assert.equal(fit.sliders,3);if(width===1440){assert.ok(fit.width<=720);assert.ok(fit.height<=108.5);}
  fits.push({viewport:[width,height],...fit});await p.screenshot({path:`${out}/${width}.png`,fullPage:true});
 }
 await writeFile(`${out}/layout.json`,JSON.stringify({drawingBufferWritesDuringScrub:writes,fits},null,2));console.log({writes,fits});
}finally{await b.close();}
