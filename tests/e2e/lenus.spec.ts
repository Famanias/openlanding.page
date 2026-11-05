import {expect,test,type Locator} from "@playwright/test";
import {mkdir,readFile} from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

test.setTimeout(120_000);
// Optional Windows native-GPU run; the default remains portable software CI.
if(process.env.LENUS_NATIVE_GPU==="1")test.use({channel:"chromium",launchOptions:{args:["--use-angle=d3d11","--enable-webgl","--ignore-gpu-blocklist"]}});
const shots=path.resolve(".openlanding-page/lenus/shots");
async function setRange(control:Locator,value:number){
  await control.evaluate((element,value)=>{
    const input=element as HTMLInputElement;
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value")!.set!.call(input,String(value));
    input.dispatchEvent(new Event("input",{bubbles:true}));
    input.dispatchEvent(new Event("change",{bubbles:true}));
  },value);
}
async function meanFrameDifference(a:Buffer,b:Buffer){
  const pixels=await Promise.all([a,b].map(buffer=>sharp(buffer).resize(128,128).removeAlpha().raw().toBuffer()));
  return pixels[0].reduce((sum,value,i)=>sum+Math.abs(value-pixels[1][i]),0)/pixels[0].length;
}

test("desktop compiles a colored WebGL lens over the complete reference hero",async({page})=>{
  const errors:string[]=[];
  page.on("pageerror",e=>errors.push(e.message));
  page.on("console",message=>{if(message.type()==="error")errors.push(message.text());});
  await page.setViewportSize({width:1440,height:900});await page.goto("/lenus");
  await expect(page).toHaveTitle("LENUS — Reality is just the start.");
  await expect(page.locator(".ln-stage")).toHaveAttribute("data-state","running",{timeout:60_000});
  await expect(page.getByRole("heading",{level:1})).toHaveAccessibleName("REALITY IS JUST THE START.");
  await expect(page.getByRole("button",{name:"STEP INSIDE",exact:true})).toHaveCSS("font-weight","700");
  const canvas=page.locator("canvas[data-lenus-renderer]");await expect(canvas).toHaveCount(1);
  const gl=await canvas.evaluate(element=>{
    const c=element as HTMLCanvasElement;const gl=c.getContext("webgl2");
    return {error:gl?.getError(),ratio:c.width/c.clientWidth,alpha:gl?.getContextAttributes()?.alpha};
  });
  expect(gl.error).toBe(0);expect(gl.alpha).toBe(true);expect(gl.ratio).toBeLessThanOrEqual(1.51);
  await page.getByRole("button",{name:"Pause animation",exact:true}).click();
  let emerald=0,lime=0,violet=0;
  // Reflected rim colors move with the lens. Check representative poses, not one arbitrary phase.
  for(let sample=0;sample<4;sample++){
    const pixels=await sharp(await canvas.screenshot()).removeAlpha().raw().toBuffer({resolveWithObject:true});
    let frameEmerald=0,frameLime=0,frameViolet=0;
    for(let i=0;i<pixels.data.length;i+=pixels.info.channels){
      const [r,g,b]=pixels.data.subarray(i,i+3);
      if(g>75&&g>r*1.25&&b<g*.95)frameEmerald++;
      if(r>50&&g>75&&b<g*.65&&g>r*.8)frameLime++;
      if(r>65&&b>65&&g<b*.8&&r>g*.9)frameViolet++;
    }
    emerald=Math.max(emerald,frameEmerald);lime=Math.max(lime,frameLime);violet=Math.max(violet,frameViolet);
    if(emerald>100&&lime>5&&violet>5)break;
    if(sample<3){
      await page.getByRole("button",{name:"Play animation",exact:true}).click();
      await expect(page.locator(".ln-stage")).toHaveAttribute("data-state","running");
      await page.waitForTimeout(4000);
      await page.getByRole("button",{name:"Pause animation",exact:true}).click();
    }
  }
  expect(emerald).toBeGreaterThan(100);expect(lime).toBeGreaterThan(5);expect(violet).toBeGreaterThan(5);
  await mkdir(shots,{recursive:true});await page.screenshot({path:path.join(shots,"desktop-1440.png"),fullPage:true,animations:"disabled"});
  expect(errors).toEqual([]);
});

test("the lens moves on its own, freezes when paused, and resumes its loop",async({page})=>{
  await page.setViewportSize({width:1440,height:900});await page.goto("/lenus");
  const stage=page.locator(".ln-stage"),canvas=page.locator("canvas[data-lenus-renderer]");
  await expect(stage).toHaveAttribute("data-state","running",{timeout:60_000});
  await page.mouse.move(0,0);
  const before=await canvas.screenshot();
  await page.waitForTimeout(1800);
  expect((await canvas.screenshot()).equals(before)).toBe(false);
  await page.getByRole("button",{name:"Pause animation",exact:true}).click();
  await expect(stage).toHaveAttribute("data-state","paused");
  const frozen=await canvas.screenshot();
  await page.waitForTimeout(350);
  // Native MSAA readback can vary by one byte with zero new WebGL draws.
  expect(await meanFrameDifference(await canvas.screenshot(),frozen)).toBeLessThan(.001);
  await page.getByRole("button",{name:"Play animation",exact:true}).click();
  await expect(stage).toHaveAttribute("data-state","running");
  await page.evaluate(()=>new Promise<void>(resolve=>{let frames=0;const frame=()=>{if(++frames>=3)resolve();else requestAnimationFrame(frame);};requestAnimationFrame(frame);}));
  expect((await canvas.screenshot()).equals(frozen)).toBe(false);
});

test("automatic transformation reveals and reassembles without entering inspection",async({page})=>{
  // Advance the browser's RAF timestamps through a complete cycle; production
  // still owns its clock, pose application, camera and renderer.
  await page.addInitScript(()=>{
    const raf=window.requestAnimationFrame.bind(window);
    Object.defineProperty(window,"__lenusTimeOffset",{value:0,writable:true});
    window.requestAnimationFrame=callback=>raf(()=>callback(Number(Reflect.get(window,"__lenusTimeOffset"))));
  });
  await page.goto("/lenus");const stage=page.locator(".ln-stage"),canvas=page.locator("canvas[data-lenus-renderer]");
  await expect(stage).toHaveAttribute("data-state","running",{timeout:60_000});
  await page.getByRole("button",{name:"Pause animation",exact:true}).click();await page.getByRole("button",{name:"Reset optical view"}).click();
  const closed=await sharp(await canvas.screenshot()).resize(128,128).removeAlpha().raw().toBuffer();
  const advance=async()=>{
    await page.getByRole("button",{name:"Play animation",exact:true}).click();
    await page.evaluate(()=>new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve()))));
    await page.evaluate(()=>{Reflect.set(window,"__lenusTimeOffset",Number(Reflect.get(window,"__lenusTimeOffset"))+12000);});
    await page.evaluate(()=>new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve()))));
    await page.getByRole("button",{name:"Pause animation",exact:true}).click();
  };
  await advance();const open=await sharp(await canvas.screenshot()).resize(128,128).removeAlpha().raw().toBuffer();
  const delta=(a:Buffer,b:Buffer)=>a.reduce((sum,value,i)=>sum+Math.abs(value-b[i]),0)/a.length;
  const green=(pixels:Buffer)=>{let count=0;for(let i=0;i<pixels.length;i+=3)if(pixels[i+1]>75&&pixels[i+1]>pixels[i]*1.25&&pixels[i+1]>pixels[i+2]*1.1)count++;return count;};
  const openingDifference=delta(closed,open);
  expect(openingDifference).toBeGreaterThan(1);
  expect(green(open)).toBeGreaterThan(green(closed)+15);
  await expect(stage).toHaveAttribute("data-inspection-mode","hero");
  await expect(page.getByRole("button",{name:"Inspect lens interior",exact:true})).toHaveAttribute("aria-pressed","false");
  await expect(page.getByRole("combobox",{name:"Inspect an optical part"}).locator("option")).toHaveCount(43);
  await advance();const returned=await sharp(await canvas.screenshot()).resize(128,128).removeAlpha().raw().toBuffer();
  expect(delta(closed,returned)).toBeLessThan(openingDifference*.45);
  expect(green(returned)).toBeLessThanOrEqual(green(closed)+5);
  await page.getByRole("combobox",{name:"Inspect an optical part"}).selectOption("housing-panel-2");
  await expect(stage).toHaveAttribute("data-inspection-mode","cutaway");
  await expect(stage).toHaveAttribute("data-state","paused");
});

test("transformation slider smoothly opens and closes, holds intermediate poses and resumes playback",async({page})=>{
  await page.goto("/lenus");const stage=page.locator(".ln-stage"),canvas=page.locator("canvas[data-lenus-renderer]"),range=page.getByRole("slider",{name:"Lens transformation",exact:true});
  await expect(stage).toHaveAttribute("data-state","running",{timeout:60_000});
  await page.getByRole("button",{name:"Pause animation",exact:true}).click();await page.getByRole("button",{name:"Reset optical view"}).click();
  await expect(range).toHaveValue("0");const closed=await canvas.screenshot();
  await range.focus();await range.press("End");await expect(range).toHaveValue("100");
  await expect(stage).toHaveAttribute("aria-busy","true");await expect(stage).toHaveAttribute("data-state","paused");
  await expect(stage).toHaveAttribute("aria-busy","false",{timeout:45_000});const open=await canvas.screenshot();expect(await meanFrameDifference(open,closed)).toBeGreaterThan(1);
  await range.press("Home");await expect(range).toHaveValue("0");await expect(stage).toHaveAttribute("aria-busy","true");
  await expect(stage).toHaveAttribute("aria-busy","false",{timeout:45_000});expect(await meanFrameDifference(await canvas.screenshot(),closed)).toBeLessThan(.1);
  await setRange(range,50);await expect(stage).toHaveAttribute("aria-busy","false",{timeout:45_000});const half=await canvas.screenshot();
  await page.waitForTimeout(250);expect(await meanFrameDifference(await canvas.screenshot(),half)).toBeLessThan(.001);
  await page.emulateMedia({reducedMotion:"reduce"});await expect(stage).toHaveAttribute("data-state","static");
  await page.emulateMedia({reducedMotion:"no-preference"});await expect(stage).toHaveAttribute("data-state","paused",{timeout:60_000});await expect(range).toHaveValue("50");
  await page.getByRole("button",{name:"Play animation",exact:true}).click();await expect(stage).toHaveAttribute("data-state","running");
  await expect.poll(()=>range.inputValue()).not.toBe("50");
});

test("explosion, focus and keyboard part inspection operate the authored assembly",async({page})=>{
  await page.goto("/lenus");const stage=page.locator(".ln-stage");
  await expect(stage).toHaveAttribute("data-state","running",{timeout:60_000});
  const canvas=page.locator("canvas[data-lenus-renderer]");
  const initial=await canvas.screenshot();
  await page.getByRole("button",{name:"STEP INSIDE",exact:true}).click();
  await expect(stage).toHaveAttribute("data-exploded","true");
  await expect(page.getByRole("slider",{name:"Explode optical assembly"})).toHaveValue("1");
  await page.waitForTimeout(600);
  expect((await canvas.screenshot()).equals(initial)).toBe(false);
  const focus=page.getByRole("slider",{name:"Focus ring rotation"});await setRange(focus,.8);
  await expect(focus).toHaveValue("0.8");
  await focus.focus();await focus.press("ArrowRight");await expect(focus).toHaveValue("0.81");
  await page.getByRole("combobox",{name:"Inspect an optical part"}).selectOption("front-lens");
  await expect(page.locator(".ln-part-material")).toHaveText("DOPED FLUORITE / N=1.52");
  const host=page.getByTestId("lenus-canvas-container");await host.focus();await host.press("r");
  await expect(stage).toHaveAttribute("data-exploded","false");await expect(focus).toHaveValue("0");
  await host.press("e");await expect(stage).toHaveAttribute("data-exploded","true");
  await page.getByRole("button",{name:"Pause animation",exact:true}).click();
});

test("pause freezes the frame and compact-laptop resize keeps the full canvas aspect",async({page})=>{
  await page.goto("/lenus");await expect(page.locator(".ln-stage")).toHaveAttribute("data-state","running",{timeout:60_000});
  await page.getByRole("button",{name:"Pause animation",exact:true}).click();
  await expect(page.locator(".ln-stage")).toHaveAttribute("data-state","paused");
  const canvas=page.locator("canvas[data-lenus-renderer]"),before=await canvas.screenshot();
  await page.mouse.move(1000,200);await page.waitForTimeout(150);
  expect(await meanFrameDifference(await canvas.screenshot(),before)).toBeLessThan(.001);
  await page.setViewportSize({width:900,height:700});
  await expect.poll(()=>canvas.evaluate(element=>{
    const c=element as HTMLCanvasElement;return Math.abs(c.width/c.height-c.clientWidth/c.clientHeight);
  })).toBeLessThan(.01);
  await page.screenshot({path:path.join(shots,"laptop-900.png"),fullPage:true,animations:"disabled"});
  await page.getByRole("button",{name:"Play animation",exact:true}).click();
});

test("native navigation dialogs trap focus, suspend rendering and restore the trigger",async({page})=>{
  await page.goto("/lenus");await expect(page.locator(".ln-stage")).toHaveAttribute("data-state","running",{timeout:60_000});
  for(const name of ["WORK","TECHNOLOGY","GET IN TOUCH"]){
    const trigger=page.getByRole("button",{name,exact:true});await trigger.click();
    const dialog=page.getByRole("dialog");await expect(dialog).toBeVisible();
    await expect(page.locator(".ln-stage")).toHaveAttribute("data-state","paused");
    await dialog.getByRole("button",{name:"Close panel"}).focus();await page.keyboard.press("Shift+Tab");
    expect(await page.evaluate(()=>Boolean(document.activeElement?.closest("dialog")))).toBe(true);
    await page.keyboard.press("Escape");await expect(dialog).not.toBeVisible();await expect(trigger).toBeFocused();
    await expect(page.locator(".ln-stage")).toHaveAttribute("data-state","running");
  }
});

test("contact validates inputs and downloads a local brief without claiming delivery",async({page})=>{
  await page.goto("/lenus");await page.getByRole("button",{name:"GET IN TOUCH",exact:true}).click();
  const dialog=page.getByRole("dialog");await dialog.getByRole("button",{name:"Prepare project brief"}).click();
  await expect(dialog.getByText("Enter a valid email address.")).toBeVisible();
  await dialog.getByLabel("Your name",{exact:false}).fill("Morgan");
  await dialog.getByLabel("Email address",{exact:false}).fill("a@@example.com");
  await dialog.getByLabel("What are you imagining?",{exact:false}).fill("An immersive launch experience for our new product.");
  await dialog.getByRole("button",{name:"Prepare project brief"}).click();
  await expect(dialog.getByText("Enter a valid email address.")).toBeVisible();
  await dialog.getByLabel("Email address",{exact:false}).fill("morgan@example.com");
  await dialog.getByRole("button",{name:"Prepare project brief"}).click();
  await expect(dialog.getByText(/It has not been sent/)).toBeVisible();
  const downloading=page.waitForEvent("download");await dialog.getByRole("button",{name:"Save project brief"}).click();
  const download=await downloading;expect(download.suggestedFilename()).toBe("lenus-project-brief.txt");
  const file=await download.path();expect(file).toBeTruthy();expect(await readFile(file!,"utf8")).toContain("Prepared locally. This brief has not been sent.");
});

test("context loss reveals the fallback and recovery resumes the scene",async({page})=>{
  await page.goto("/lenus");const stage=page.locator(".ln-stage");await expect(stage).toHaveAttribute("data-state","running",{timeout:60_000});
  const extension=await page.locator("canvas[data-lenus-renderer]").evaluateHandle(element=>(element as HTMLCanvasElement).getContext("webgl2")?.getExtension("WEBGL_lose_context"));
  await extension.evaluate(extension=>{if(!extension)throw Error("Context-loss extension unavailable");extension.loseContext();});
  await expect(stage).toHaveAttribute("data-state","lost");await expect(page.locator(".ln-lens-fallback")).toBeVisible();
  await extension.evaluate(extension=>extension?.restoreContext());
  await expect(stage).toHaveAttribute("data-state","running",{timeout:30_000});await expect(page.locator("canvas[data-lenus-renderer]")).toHaveCount(1);
});

test("reduced motion never mounts WebGL and runtime changes dispose the context",async({page})=>{
  await page.emulateMedia({reducedMotion:"reduce"});await page.goto("/lenus");const stage=page.locator(".ln-stage");
  await expect(stage).toHaveAttribute("data-state","static");await expect(page.locator("canvas[data-lenus-renderer]")).toHaveCount(0);
  await expect(page.locator(".ln-lens-fallback")).toBeVisible();
  const interior=page.getByRole("button",{name:"Inspect lens interior",exact:true});
  await interior.click();await expect(stage).toHaveAttribute("data-inspection-mode","cutaway");
  await expect(page.getByRole("button",{name:"Return to automatic hero view"})).toHaveAttribute("aria-pressed","true");
  await expect(page.locator(".ln-lens-fallback [data-interior-optic]")).toHaveCount(7);
  await expect(page.locator("canvas[data-lenus-renderer]")).toHaveCount(0);
  await page.getByTestId("lenus-canvas-container").focus();await page.keyboard.press("c");
  await expect(stage).toHaveAttribute("data-inspection-mode","hero");
  await page.emulateMedia({reducedMotion:"no-preference"});await expect(stage).toHaveAttribute("data-state","running",{timeout:60_000});
  const oldCanvas=await page.locator("canvas[data-lenus-renderer]").elementHandle();
  await page.emulateMedia({reducedMotion:"reduce"});await expect(stage).toHaveAttribute("data-state","static");
  await expect(page.locator("canvas[data-lenus-renderer]")).toHaveCount(0);
  await expect.poll(()=>oldCanvas!.evaluate(element=>(element as HTMLCanvasElement).getContext("webgl2")?.isContextLost())).toBe(true);
});

test("mobile stays within the viewport and its navigation disclosure works",async({browser,baseURL})=>{
  const context=await browser.newContext({baseURL,viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  try{
    const page=await context.newPage();await page.goto("/lenus");
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    const toggle=page.getByRole("button",{name:"Toggle navigation"});await toggle.tap();await expect(toggle).toHaveAttribute("aria-expanded","true");
    await page.getByRole("navigation",{name:"Mobile navigation"}).getByRole("button",{name:"ABOUT"}).tap();
    await expect(page.getByRole("dialog")).toBeVisible();await page.getByRole("button",{name:"Close panel"}).tap();
    await expect(toggle).toHaveAttribute("aria-expanded","false");await expect(toggle).toBeFocused();
    await page.screenshot({path:path.join(shots,"mobile-390.png"),fullPage:true,animations:"disabled"});
  }finally{await context.close();}
});

test("no JavaScript and blocked graphics retain the headline and full SVG preview",async({browser,baseURL})=>{
  const noJs=await browser.newContext({baseURL,javaScriptEnabled:false});
  try{const page=await noJs.newPage();await page.goto("/lenus");await expect(page.getByRole("heading",{level:1})).toBeVisible();await expect(page.locator(".ln-lens-fallback")).toBeVisible();}finally{await noJs.close();}
  const blocked=await browser.newContext({baseURL});
  try{
    const page=await blocked.newPage();await page.addInitScript(()=>{
      const original=HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext=function(this:HTMLCanvasElement,type:string,...args:unknown[]){
        if(["webgl","webgl2","experimental-webgl"].includes(type))return null;
        return Reflect.apply(original,this,[type,...args]);
      } as typeof original;
    });
    await page.goto("/lenus");await expect(page.locator(".ln-stage")).toHaveAttribute("data-state","unavailable",{timeout:60_000});await expect(page.locator(".ln-lens-fallback")).toBeVisible();
  }finally{await blocked.close();}
});

test("paused geometry still responds to explicit explosion, focus and reset commands",async({page})=>{
  await page.goto("/lenus");await expect(page.locator(".ln-stage")).toHaveAttribute("data-state","running",{timeout:60_000});
  await page.getByRole("button",{name:"Pause animation",exact:true}).click();
  await page.getByRole("button",{name:"Reset optical view"}).click();
  const canvas=page.locator("canvas[data-lenus-renderer]");
  const assembled=await canvas.screenshot();
  await page.getByTestId("lenus-canvas-container").focus();await page.keyboard.press("c");
  await expect(page.locator(".ln-stage")).toHaveAttribute("data-inspection-mode","cutaway");
  await expect(page.locator(".ln-stage")).toHaveAttribute("data-state","paused");
  await page.keyboard.press("c");
  await expect(page.locator(".ln-stage")).toHaveAttribute("data-inspection-mode","hero");
  await expect.poll(async()=>meanFrameDifference(await canvas.screenshot(),assembled)).toBeLessThan(.1);
  await page.getByRole("button",{name:"EXPLODE ASSEMBLY",exact:true}).click();
  await expect.poll(async()=>(await canvas.screenshot()).equals(assembled)).toBe(false);
  const exploded=await canvas.screenshot();
  await setRange(page.getByRole("slider",{name:"Focus ring rotation"}),.8);
  await expect.poll(async()=>(await canvas.screenshot()).equals(exploded)).toBe(false);
  await page.getByRole("button",{name:"Reset optical view"}).click();
  await expect.poll(async()=>meanFrameDifference(await canvas.screenshot(),assembled)).toBeLessThan(.1);
  await expect(page.locator(".ln-stage")).toHaveAttribute("data-state","paused");
});

test("restoring the scene replays the separation and focus shown by its controls",async({page})=>{
  await page.goto("/lenus");const stage=page.locator(".ln-stage");
  await expect(stage).toHaveAttribute("data-state","running",{timeout:60_000});
  await setRange(page.getByRole("slider",{name:"Explode optical assembly"}),1);
  await setRange(page.getByRole("slider",{name:"Focus ring rotation"}),.9);
  await page.evaluate(()=>new Promise<void>(resolve=>{let frames=0;const frame=()=>{if(++frames>=26)resolve();else requestAnimationFrame(frame);};requestAnimationFrame(frame);}));
  await page.getByRole("button",{name:"Pause animation",exact:true}).click();
  const canvas=page.locator("canvas[data-lenus-renderer]");
  const before=await sharp(await canvas.screenshot()).resize(128,128).removeAlpha().raw().toBuffer();
  await page.emulateMedia({reducedMotion:"reduce"});await expect(stage).toHaveAttribute("data-state","static");
  await page.emulateMedia({reducedMotion:"no-preference"});await expect(stage).toHaveAttribute("data-state","paused",{timeout:60_000});
  const after=await sharp(await canvas.screenshot()).resize(128,128).removeAlpha().raw().toBuffer();
  const delta=before.reduce((sum,value,index)=>sum+Math.abs(value-after[index]),0)/before.length;
  expect(delta).toBeLessThan(3);
  await expect(page.getByRole("slider",{name:"Explode optical assembly"})).toHaveValue("1");
  await expect(page.getByRole("slider",{name:"Focus ring rotation"})).toHaveValue("0.9");
});

test("inspection toggles preserve a held pointer drag until release",async({page})=>{
  await page.addInitScript(()=>{
    const raf=window.requestAnimationFrame.bind(window);Object.defineProperty(window,"__lenusTimeOffset",{value:0,writable:true});
    window.requestAnimationFrame=callback=>raf(()=>callback(Number(Reflect.get(window,"__lenusTimeOffset"))));
  });
  await page.goto("/lenus");const stage=page.locator(".ln-stage"),host=page.getByTestId("lenus-canvas-container"),canvas=page.locator("canvas[data-lenus-renderer]");
  await expect(stage).toHaveAttribute("data-state","running",{timeout:60_000});await host.focus();await page.keyboard.press("r");
  const box=(await host.boundingBox())!;const x=box.x+box.width*.5,y=box.y+box.height*.5;
  await page.mouse.move(x,y);await page.mouse.down();
  try{
    await page.mouse.move(x+70,y-30,{steps:5});await page.keyboard.press("c");await page.keyboard.press("c");
    await expect(stage).toHaveAttribute("data-inspection-mode","hero");const held=await canvas.screenshot();
    // One virtual second proves the drag holds time without deliberately
    // triggering the renderer's slow-frame resolution fallback.
    await page.evaluate(()=>Reflect.set(window,"__lenusTimeOffset",1000));
    await page.evaluate(()=>new Promise<void>(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>resolve()))));
    expect(await meanFrameDifference(held,await canvas.screenshot())).toBeLessThan(.1);
    await page.mouse.move(x+120,y-45,{steps:5});expect(await meanFrameDifference(held,await canvas.screenshot())).toBeGreaterThan(.1);
  }finally{await page.mouse.up();}
});

test("preference reconstruction retains paused hero parallax",async({page})=>{
  await page.goto("/lenus");const stage=page.locator(".ln-stage"),host=page.getByTestId("lenus-canvas-container"),canvas=page.locator("canvas[data-lenus-renderer]");
  await expect(stage).toHaveAttribute("data-state","running",{timeout:60_000});
  const box=(await host.boundingBox())!;await page.mouse.move(box.x+box.width*.85,box.y+box.height*.2);await page.waitForTimeout(500);
  await page.getByRole("button",{name:"Pause animation",exact:true}).click();await expect(stage).toHaveAttribute("data-state","paused");
  const before=await canvas.screenshot();
  await page.emulateMedia({reducedMotion:"reduce"});await expect(stage).toHaveAttribute("data-state","static");
  await page.emulateMedia({reducedMotion:"no-preference"});await expect(stage).toHaveAttribute("data-state","paused",{timeout:60_000});
  // Match the existing cross-context raster tolerance; the initialized camera
  // and model matrices are checked separately by the native recovery probe.
  expect(await meanFrameDifference(before,await canvas.screenshot())).toBeLessThan(3);
});

test("preference reconstruction retains an active drag view",async({page})=>{
  await page.goto("/lenus");const stage=page.locator(".ln-stage"),host=page.getByTestId("lenus-canvas-container"),canvas=page.locator("canvas[data-lenus-renderer]");
  await expect(stage).toHaveAttribute("data-state","running",{timeout:60_000});
  await page.getByRole("button",{name:"Pause animation",exact:true}).click();await expect(stage).toHaveAttribute("data-state","paused");
  const box=(await host.boundingBox())!;await page.mouse.move(box.x+box.width*.5,box.y+box.height*.5);await page.mouse.down();
  try{
    await page.mouse.move(box.x+box.width*.7,box.y+box.height*.4,{steps:5});const before=await canvas.screenshot();
    await page.emulateMedia({reducedMotion:"reduce"});await expect(stage).toHaveAttribute("data-state","static");
    await page.emulateMedia({reducedMotion:"no-preference"});await expect(stage).toHaveAttribute("data-state","paused",{timeout:60_000});
    expect(await meanFrameDifference(before,await canvas.screenshot())).toBeLessThan(3);
  }finally{await page.mouse.up();}
});

test("phones retain the still preview until the visitor starts the optical experience",async({browser,baseURL})=>{
  const context=await browser.newContext({baseURL,viewport:{width:390,height:844},isMobile:true,hasTouch:true});
  try{
    const page=await context.newPage();await page.goto("/lenus");
    await expect(page.locator(".ln-stage")).toHaveAttribute("data-state","preview");
    await expect(page.locator("canvas[data-lenus-renderer]")).toHaveCount(0);
    await page.getByRole("button",{name:"STEP INSIDE",exact:true}).tap();
    await expect(page.locator(".ln-stage")).toHaveAttribute("data-state","running",{timeout:60_000});
    await expect(page.getByRole("slider",{name:"Explode optical assembly"})).toHaveValue("1");
  }finally{await context.close();}
});

test("a STEP INSIDE command queued before the rendering module loads is replayed",async({page})=>{
  let release=()=>{};
  const gate=new Promise<void>(resolve=>{release=resolve;});let blocked=false;
  await page.route("**/_next/static/chunks/*.js",async route=>{
    const response=await route.fetch();const body=await response.text();
    if(body.includes("webglcontextlost")&&body.includes("pickAtNormalizedCanvas")){blocked=true;await gate;}
    await route.fulfill({response,body});
  });
  try{
    await page.goto("/lenus");await expect.poll(()=>blocked).toBe(true);
    await page.getByRole("button",{name:"STEP INSIDE",exact:true}).click();
    release();await expect(page.locator(".ln-stage")).toHaveAttribute("data-state","running",{timeout:60_000});
    await page.evaluate(()=>new Promise<void>(resolve=>{let n=0;const frame=()=>{if(++n>=26)resolve();else requestAnimationFrame(frame);};requestAnimationFrame(frame);}));
    await page.getByRole("button",{name:"Pause animation",exact:true}).click();
    const canvas=page.locator("canvas[data-lenus-renderer]"),queued=await canvas.screenshot();
    await setRange(page.getByRole("slider",{name:"Explode optical assembly"}),0);
    await expect.poll(async()=>(await canvas.screenshot()).equals(queued)).toBe(false);
  }finally{release();}
});
