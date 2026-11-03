import {expect,test,type Locator} from "@playwright/test";
import {mkdir,readFile} from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

test.setTimeout(120_000);
const shots=path.resolve(".openlanding-page/lenus/shots");
async function setRange(control:Locator,value:number){
  await control.evaluate((element,value)=>{
    const input=element as HTMLInputElement;
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value")!.set!.call(input,String(value));
    input.dispatchEvent(new Event("input",{bubbles:true}));
    input.dispatchEvent(new Event("change",{bubbles:true}));
  },value);
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
  const frozen=await canvas.screenshot();
  await page.waitForTimeout(350);
  expect((await canvas.screenshot()).equals(frozen)).toBe(true);
  await page.getByRole("button",{name:"Play animation",exact:true}).click();
  await expect(stage).toHaveAttribute("data-state","running");
  await page.evaluate(()=>new Promise<void>(resolve=>{let frames=0;const frame=()=>{if(++frames>=3)resolve();else requestAnimationFrame(frame);};requestAnimationFrame(frame);}));
  expect((await canvas.screenshot()).equals(frozen)).toBe(false);
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
  expect((await canvas.screenshot()).equals(before)).toBe(true);
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
  const canvas=page.locator("canvas[data-lenus-renderer]");
  const assembled=await canvas.screenshot();
  await page.getByRole("button",{name:"EXPLODE ASSEMBLY",exact:true}).click();
  await expect.poll(async()=>(await canvas.screenshot()).equals(assembled)).toBe(false);
  const exploded=await canvas.screenshot();
  await setRange(page.getByRole("slider",{name:"Focus ring rotation"}),.8);
  await expect.poll(async()=>(await canvas.screenshot()).equals(exploded)).toBe(false);
  await page.getByRole("button",{name:"Reset optical view"}).click();
  await expect.poll(async()=>(await canvas.screenshot()).equals(assembled)).toBe(true);
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
