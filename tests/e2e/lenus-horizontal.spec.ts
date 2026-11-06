import {expect,test,type Page} from "@playwright/test";
import {mkdir} from "node:fs/promises";
test.setTimeout(90_000);
if(process.env.LENUS_NATIVE_GPU==="1")test.use({channel:"chromium",launchOptions:{args:["--use-angle=d3d11","--enable-webgl","--ignore-gpu-blocklist"]}});
const ids=["hero","manifesto","work","expertise","technology","studio","contact"];
async function boot(page:Page){
  await page.setViewportSize({width:1440,height:900});await page.goto("/lenus");
  await expect(page.locator(".ln-stage")).toHaveAttribute("data-state","running",{timeout:60_000});
  await expect(page.locator("main")).toHaveAttribute("data-story-mode","horizontal");
}
async function position(page:Page){return Number(await page.locator(".ln-stage").getAttribute("data-story-position"));}
async function go(page:Page,index:number){
  const target=await page.locator(`#ln-${ids[index]}`).evaluate(el=>(el as HTMLElement).offsetLeft);
  await page.evaluate(y=>window.scrollTo(0,y),target);
  await expect.poll(()=>position(page),{timeout:15_000}).toBeCloseTo(index,2);
}
async function deployment(page:Page){return Number(await page.locator(".ln-stage").getAttribute("data-model-deployment"));}

test("one live canvas survives all chapters, reverse scroll, footer exit and native wheel",async({page})=>{
  const errors:string[]=[];page.on("pageerror",e=>errors.push(e.message));page.on("console",m=>{if(m.type()==="error")errors.push(m.text());});
  await boot(page);const canvas=await page.locator("canvas[data-lenus-renderer]").elementHandle();
  expect(await page.locator(".ln-horizontal-track canvas").count()).toBe(0);
  await page.mouse.move(30,450);await page.mouse.wheel(0,720);await expect.poll(()=>position(page)).toBeGreaterThan(.35);
  const poses=[.18,1,.88,1,1,.3,0];
  for(const i of [1,2,3,4,5,6,5,4,3,2,1]){
    await go(page,i);await expect.poll(()=>deployment(page)).toBeCloseTo(poses[i],2);
    expect(await canvas!.evaluate(el=>el===document.querySelector("canvas[data-lenus-renderer]"))).toBe(true);
  }
  await go(page,6);await page.getByRole("link",{name:"SKIP EXPERIENCE",exact:true}).click();
  await expect.poll(()=>page.locator("footer").evaluate(el=>el.getBoundingClientRect().top)).toBeLessThan(2);
  await page.getByRole("button",{name:"PREPARE A PROJECT BRIEF",exact:true}).click();await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");await page.getByRole("link",{name:/BACK TO BEGINNING/}).click();await expect.poll(()=>position(page)).toBeCloseTo(0,2);
  expect(errors).toEqual([]);
});

test("gallery arrows, local drag and study dialog own their interaction",async({page})=>{
  await boot(page);await go(page,2);
  const gallery=page.locator(".ln-work-gallery");await page.getByRole("button",{name:"Next study",exact:true}).click();
  await expect(gallery.locator(".ln-gallery-controls>span").first()).toHaveText("02 / 03");
  const y=await page.evaluate(()=>scrollY);const surface=page.locator(".ln-study--identity .ln-study-art");const b=(await surface.boundingBox())!;
  await page.mouse.move(b.x+b.width*.75,b.y+b.height*.5);await page.mouse.down();await page.mouse.move(b.x+b.width*.75-280,b.y+b.height*.5,{steps:12});await page.mouse.up();
  await expect(gallery.locator(".ln-gallery-controls>span").first()).toHaveText("03 / 03");expect(await page.evaluate(()=>scrollY)).toBe(y);
  const trigger=page.locator(".ln-study--worlds button");await trigger.click();await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.locator(".ln-stage")).toHaveAttribute("data-state","paused");await expect(page.getByRole("dialog")).toContainText("not presented as commissioned client work");
  await page.keyboard.press("Escape");await expect(trigger).toBeFocused();await expect(page.locator(".ln-stage")).toHaveAttribute("data-state","running");
});

test("world-space capability lines respond to camera gestures and keyboard disclosures",async({page})=>{
  await boot(page);await go(page,3);const label=page.locator(".ln-projected-label button").first();
  await label.focus();await page.keyboard.press("Enter");await expect(label).toHaveAttribute("aria-expanded","true");
  const line=page.locator(".ln-annotation-lines line").first(),before=await line.getAttribute("x1");
  const host=page.getByTestId("lenus-canvas-container");await host.focus();await page.keyboard.press("ArrowRight");
  await expect.poll(()=>line.getAttribute("x1")).not.toBe(before);
  const orbited=await line.getAttribute("x1");await page.mouse.move(950,430);await page.mouse.down();await page.mouse.move(1050,400,{steps:10});await page.mouse.up();
  await expect.poll(()=>line.getAttribute("x1")).not.toBe(orbited);
  await label.focus();await page.keyboard.press("Escape");await expect(label).toHaveAttribute("aria-expanded","false");
  expect(Number(await line.getAttribute("x1"))).toBeGreaterThan(0);
});

test("held lab control wins over scrolling, release blends back without a snap",async({page})=>{
  await boot(page);await go(page,4);const range=page.getByRole("slider",{name:"Lens transformation",exact:true});
  await range.focus();await range.press("Home");await expect.poll(()=>deployment(page),{timeout:15_000}).toBeLessThan(.01);
  const b=(await range.boundingBox())!;await page.mouse.move(b.x+2,b.y+b.height/2);await page.mouse.down();
  try{await go(page,5);await expect.poll(()=>deployment(page)).toBeLessThan(.05);}finally{await page.mouse.up();}
  const atRelease=await deployment(page);expect(atRelease).toBeLessThan(.08);
  await expect.poll(()=>deployment(page),{timeout:15_000}).toBeCloseTo(.3,2);
  await go(page,4);await page.getByRole("button",{name:/Inspect .* component/}).first().click();
  await expect(page.locator(".ln-stage")).toHaveAttribute("data-inspection-mode","cutaway");
  await go(page,5);await expect.poll(()=>deployment(page),{timeout:15_000}).toBeCloseTo(.3,2);
});

test("resize and reduced motion preserve the canvas and semantic chapter",async({page})=>{
  await boot(page);await go(page,4);const canvas=await page.locator("canvas[data-lenus-renderer]").elementHandle();
  await page.setViewportSize({width:1366,height:768});await expect.poll(()=>position(page)).toBeCloseTo(4,1);
  await page.setViewportSize({width:900,height:700});await expect(page.locator("main")).toHaveAttribute("data-story-mode","vertical");await expect.poll(()=>position(page)).toBeCloseTo(4,1);
  await page.emulateMedia({reducedMotion:"reduce"});await expect(page.locator(".ln-stage")).toHaveAttribute("data-state","static");
  expect(await canvas!.evaluate(el=>el===document.querySelector("canvas[data-lenus-renderer]")&&!(el as HTMLCanvasElement).getContext("webgl2")?.isContextLost())).toBe(true);
  await page.emulateMedia({reducedMotion:"no-preference"});await page.setViewportSize({width:1440,height:900});await expect.poll(()=>position(page)).toBeCloseTo(4,1);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBe(0);
});

test("header, history and refreshed deep links reach real chapters",async({page})=>{
  await boot(page);await page.locator(".ln-desktop-nav").getByRole("link",{name:"ABOUT",exact:true}).click();await expect.poll(()=>position(page)).toBeCloseTo(5,2);
  await page.locator("header").getByRole("link",{name:"GET IN TOUCH",exact:true}).click();await expect.poll(()=>position(page)).toBeCloseTo(6,2);
  await page.goBack();await expect.poll(()=>position(page)).toBeCloseTo(5,2);
  await page.goto("/lenus#ln-expertise");await expect(page.locator(".ln-stage")).toHaveAttribute("data-state","running",{timeout:60_000});await expect.poll(()=>position(page)).toBeCloseTo(3,2);
});

test("phone touch scrolling and controls work in the native vertical layout",async({browser,baseURL})=>{
 const context=await browser.newContext({baseURL,viewport:{width:390,height:844},isMobile:true,hasTouch:true});
 try{const page=await context.newPage();await page.goto("/lenus");await expect(page.locator(".ln-stage")).toHaveAttribute("data-state","running",{timeout:60_000});
  await expect(page.locator("main")).toHaveAttribute("data-story-mode","vertical");await page.getByRole("button",{name:"STEP INSIDE",exact:true}).tap();await expect.poll(()=>position(page)).toBeCloseTo(1,1);
  await page.getByRole("button",{name:"Toggle navigation"}).tap();await page.getByRole("navigation",{name:"Mobile navigation"}).getByRole("link",{name:"TECHNOLOGY"}).tap();await expect.poll(()=>position(page)).toBeCloseTo(4,1);
  await page.getByRole("button",{name:"TAKE THE CONTROLS",exact:true}).tap();await expect(page.getByRole("slider",{name:"Lens transformation",exact:true})).toBeVisible();
  await page.getByRole("slider",{name:"Lens transformation",exact:true}).fill("0");await expect.poll(()=>deployment(page),{timeout:15_000}).toBeLessThan(.02);
  // Native touch events on the canvas leave vertical pan scrolling available.
  const beforeTouch=await page.evaluate(()=>scrollY);const session=await context.newCDPSession(page);await session.send("Input.dispatchTouchEvent",{type:"touchStart",touchPoints:[{x:330,y:350}]});
  for(let y=320;y>=100;y-=40)await session.send("Input.dispatchTouchEvent",{type:"touchMove",touchPoints:[{x:330,y}]});
  await session.send("Input.dispatchTouchEvent",{type:"touchEnd",touchPoints:[]});
  await expect.poll(()=>page.evaluate(()=>scrollY)).toBeGreaterThan(beforeTouch+30);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBe(0);
  await mkdir(".openlanding-page/lenus-horizontal",{recursive:true});await page.screenshot({path:".openlanding-page/lenus-horizontal/mobile-tested.png"});
 }finally{await context.close();}
});

test("initial reduced motion and no JavaScript expose every chapter and footer",async({browser,baseURL})=>{
 for(const options of [{reducedMotion:"reduce" as const},{javaScriptEnabled:false}]){
  const context=await browser.newContext({baseURL,...options});try{const page=await context.newPage();await page.goto("/lenus");
   await expect(page.locator("canvas[data-lenus-renderer]")).toHaveCount(0);await expect(page.locator(".ln-lens-fallback")).toBeVisible();
   await expect(page.locator("[data-chapter]")).toHaveCount(7);await expect(page.locator("footer")).toContainText("PREPARE A PROJECT BRIEF");
   for(const id of ids)await expect(page.locator(`#ln-${id}`)).not.toHaveAttribute("inert");
   expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBe(0);
  }finally{await context.close();}
 }
});
