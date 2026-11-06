import {chromium} from '@playwright/test';
import {mkdir,writeFile} from 'node:fs/promises';
const out='.img2threejs/closure/loop';await mkdir(out,{recursive:true});
const b=await chromium.launch({channel:'chromium',args:['--use-angle=d3d11']});
const context=await b.newContext({viewport:{width:900,height:700},recordVideo:{dir:out,size:{width:900,height:700}}});
try{
 const page=await context.newPage();await page.goto('http://127.0.0.1:4321/?controller=1&time=0');await page.waitForFunction(()=>window.__ready);
 await page.evaluate(()=>window.lensController.start());await page.waitForFunction(()=>window.lensController.getAnimationTime()>=24.1,{},{timeout:60000});
 const report=await page.evaluate(()=>{const c=window.lensController;c.stop();return {elapsed:c.getAnimationTime(),fps:window.lensFps,calls:c.getRenderer().info.render.calls,parts:Object.keys(c.runtime.nodes).length};});
 await writeFile('.img2threejs/closure/loop.json',JSON.stringify(report,null,2));console.log(report);
}finally{await context.close();await b.close();}
