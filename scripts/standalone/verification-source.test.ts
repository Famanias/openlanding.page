import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { transformSync } from "esbuild";
import { chromium, type Page } from "@playwright/test";
import { adaptVerificationSource } from "./verification-source";

const readSuite = (name: string) => fs.readFileSync(path.resolve("tests/e2e", `${name}.spec.ts`), "utf8");
const moon = `data:image/jpeg;base64,${fs.readFileSync(path.resolve("public/templates/lowtide/moon-2048.jpg")).toString("base64")}`;

async function runSetup(source: string, page: Page) {
  const code = transformSync(`(async()=>{${source}})()`, { loader: "ts", target: "es2020" }).code;
  // Only execute these repository-authored setup fixtures, never external input.
  return new Function("page", `return ${code}`)(page);
}

describe("standalone verification source adaptations", () => {
  it("retains HIYAS clip identity and excludes only KEYTU's server redirect from file verification", () => {
    const hiyas = adaptVerificationSource(readSuite("hiyas"), "hiyas.spec.ts");
    expect(hiyas).toContain('toHaveAttribute("data-standalone-src", `/templates/hiyas/clips/${clip}.mp4`)');
    const keytu = adaptVerificationSource(readSuite("keytu"), "keytu.spec.ts");
    expect(keytu).toContain('test.skip("legacy /cairn URL redirects to /keytu"');
    expect(keytu).toContain('the colourway swatches switch the hero image from the keyboard');
  });
  it("does not classify local file navigation as an external form submission", () => {
    const adapted = adaptVerificationSource(readSuite("loophouse"), "loophouse.spec.ts");
    expect(adapted).toContain('if (/^https?:/.test(req.url()) && !req.url().startsWith("http://localhost")) networkRequestMade = true;');
    expect(adapted).toContain('expect(networkRequestMade).toBe(false)');
  });

  it("checks the real model file and retains parsed-model/GPU assertions without waiting for an HTTP event", () => {
    const adapted = adaptVerificationSource(readSuite("lumen"), "lumen.spec.ts");
    expect(adapted).toContain('localAssetStatus("/templates/lumen/footer-glass-mesh.glb")');
    expect(adapted).toContain('expect(modelFile.ok()).toBe(true)');
    expect(adapted).not.toContain('waitForResponse');
    expect(adapted).toContain('toHaveAttribute("data-ready", "true", { timeout: 30_000 })');
    expect(adapted).toContain("[data-mode=\"live\"] canvas");
    expect(adapted).not.toContain('response.url().includes("/templates/lumen/footer-glass-mesh.glb")');
  });

  it("preserves Savepoint image and world identity in source metadata assertions", () => {
    const adapted = adaptVerificationSource(readSuite("savepoint"), "savepoint.spec.ts");
    expect(adapted).toContain("toHaveAttribute('data-standalone-src', `/templates/savepoint/world-${id}.webp`)");
    expect(adapted).toContain("toHaveAttribute('data-standalone-src', `/templates/savepoint/label-${id}.png`)");
    expect(adapted).toContain("toHaveAttribute('data-standalone-background', new RegExp(`world-${id}\\\\.webp`))");
    expect(adapted).toContain("expect(descriptions.size).toBe(10)");
  });

  it("keeps Morta's collection image count tied to original template assets", () => {
    const adapted = adaptVerificationSource(readSuite("morta"), "E:\\repo\\tests\\e2e\\morta.spec.ts");
    expect(adapted).toContain('img[data-standalone-src^="/templates/morta/"]');
    expect(adapted).toContain("toHaveCount(6)");
    expect(adapted).not.toContain('img[src^="/templates/morta/"]');
  });

  it("checks Koji clip availability through the real filesystem helper and retains conditional coverage", () => {
    const source = readSuite("koji");
    const adapted = adaptVerificationSource(source, "koji.spec.ts");
    expect(adapted).not.toContain("request.head(");
    expect(adapted.match(/localAssetStatus\("\/templates\/koji\/clips\/dive-1\.mp4"\)/g)).toHaveLength(5);
    expect(adapted).toContain("import {localAssetStatus} from ");
    expect(adapted).toContain('r.url().startsWith("data:video/mp4;base64,")');
    expect(adapted.match(/test\.skip\(/g)).toHaveLength(source.match(/test\.skip\(/g)!.length);
    expect(adapted).toContain('.toBeGreaterThan(0)');
    expect(adapted).toContain('toHaveCount(1, { timeout: 5_000 })');
  });

  it("leaves unrelated suites and unrelated image assertions untouched", () => {
    const source = "await expect(image).toHaveAttribute('src', '/templates/other/art.webp');";
    expect(adaptVerificationSource(source, "savepoint.spec.ts")).toBe(source);
    expect(adaptVerificationSource(readSuite("amaoto"), "amaoto.spec.ts")).toBe(readSuite("amaoto"));
    expect(adaptVerificationSource(readSuite("morta"), "another.spec.ts")).toBe(readSuite("morta"));
  });

  it("emits valid TypeScript for every affected interaction suite", () => {
    for (const name of ["lumen", "savepoint", "morta", "koji", "lowtide", "lenus", "amaoto"]) {
      const adapted = adaptVerificationSource(readSuite(name), `${name}.spec.ts`);
      expect(() => transformSync(adapted, { loader: "ts", target: "es2020" })).not.toThrow();
    }
  });

  it("keeps LOWTIDE in real pending texture boot while preserving form interaction assertions", () => {
    const adapted = adaptVerificationSource(readSuite("lowtide"), "lowtide.spec.ts");
    expect(adapted).not.toContain('page.route("**/moon-2048.jpg"');
    expect(adapted).toContain('"__standaloneMoonHeld"');
    expect(adapted).toContain('toHaveAttribute("data-ready", "false")');
    expect(adapted).toContain('toHaveCount(3)');
    expect(adapted).not.toContain("test.skip(");
  });

  it("holds only the actual embedded moon image while other images still decode", async () => {
    const setup = adaptVerificationSource('await page.route("**/moon-2048.jpg", () => new Promise(() => {}));', "lowtide.spec.ts");
    const browser = await chromium.launch({ headless: true });
    try {
      const page = await browser.newPage();
      await runSetup(setup, page);
      await page.goto("data:text/html,<body></body>");
      const result = await page.evaluate(async ({ moon }) => {
        const held = new Image();
        held.src = moon;
        const other = new Image();
        other.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='2' height='3'/>";
        await other.decode();
        return { held: Reflect.get(window, "__standaloneMoonHeld"), hasSource: held.hasAttribute("src"), naturalWidth: held.naturalWidth, otherWidth: other.naturalWidth };
      }, { moon });
      expect(result).toEqual({ held: true, hasSource: false, naturalWidth: 0, otherWidth: 2 });
    } finally { await browser.close(); }
  }, 20_000);

  it("also holds the exact moon Blob while unrelated Blob images keep loading",async()=>{
    const setup=adaptVerificationSource('await page.route("**/moon-2048.jpg", () => new Promise(() => {}));',"lowtide.spec.ts");
    const browser=await chromium.launch({headless:true});
    try{
      const page=await browser.newPage();await runSetup(setup,page);await page.goto("data:text/html,<body></body>");
      await page.evaluate(async(moon)=>{
        const held=new Image();Reflect.set(window,"heldMoonBlobImage",held);
        held.src=URL.createObjectURL(await(await fetch(moon)).blob());
        const other=new Image();other.src=URL.createObjectURL(new Blob(["<svg xmlns='http://www.w3.org/2000/svg' width='2' height='3'/>"] ,{type:"image/svg+xml"}));
        await other.decode();Reflect.set(window,"otherBlobWidth",other.naturalWidth);
      },moon);
      await page.waitForFunction(()=>Reflect.get(window,"__standaloneMoonHeld")===true,{},{timeout:1500});
      expect(await page.evaluate(()=>({hasSource:Reflect.get(window,"heldMoonBlobImage").hasAttribute("src"),otherWidth:Reflect.get(window,"otherBlobWidth")}))).toEqual({hasSource:false,otherWidth:2});
    }finally{await browser.close();}
  },20000);

  it("retains LENUS real render and deployment checks with an explicit scheduled-boot gate", () => {
    const adapted = adaptVerificationSource(readSuite("lenus"), "lenus.spec.ts");
    expect(adapted).not.toContain('page.route("**/_next/static/chunks/*.js"');
    expect(adapted).toContain('"__standaloneReleaseLenusIdle"');
    expect(adapted).toContain('command issued before the scheduled rendering boot is preserved');
    expect(adapted).toContain('toHaveCount(0)');
    expect(adapted).toContain('"data-model-deployment"))).toBeCloseTo(1,2)');
    expect(adapted).toContain('"data-story-position"))).toBeCloseTo(1,2)');
    expect(adapted).toContain('"data-state","running",{timeout:60_000}');
    expect(adapted).not.toContain("test.skip(");
  });

  it("releases the real LENUS idle callback and still honors cancellation", async () => {
    const source = readSuite("lenus");
    const start = source.indexOf("  let release=()=>{};", source.indexOf('test("a STEP INSIDE command queued'));
    const end = source.indexOf("  try{", start);
    const setup = adaptVerificationSource(source.slice(start, end), "lenus.spec.ts");
    const browser = await chromium.launch({ headless: true });
    try {
      const page = await browser.newPage();
      const { release } = await runSetup(`${setup}\nreturn {release};`, page) as { release(): Promise<void> };
      await page.goto("data:text/html,<body></body>");
      await page.evaluate(() => {
        Reflect.set(window, "idleCalls", []);
        window.requestIdleCallback(() => Reflect.get(window, "idleCalls").push("engine"), { timeout: 1500 });
        const cancelled = window.requestIdleCallback(() => Reflect.get(window, "idleCalls").push("cancelled"), { timeout: 1500 });
        window.cancelIdleCallback(cancelled);
        window.requestIdleCallback(() => Reflect.get(window, "idleCalls").push("unrelated"), { timeout: 50 });
      });
      await page.waitForFunction(() => Reflect.get(window, "idleCalls").includes("unrelated"));
      expect(await page.evaluate(() => Reflect.get(window, "idleCalls"))).toEqual(["unrelated"]);
      expect(await page.evaluate(() => Reflect.get(window, "__standaloneLenusIdleHeld"))).toBe(true);
      await release();
      await page.waitForFunction(() => Reflect.get(window, "idleCalls").includes("engine"));
      expect(await page.evaluate(() => Reflect.get(window, "idleCalls"))).toEqual(["unrelated", "engine"]);
    } finally { await browser.close(); }
  }, 20_000);
});
