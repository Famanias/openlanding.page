import fs from "node:fs";
import path from "node:path";

const lenusIdleGate = `  // Offline equivalent: hold the authored idle boot, rather than a Next chunk.
  await page.addInitScript(()=>{
    const request=window.requestIdleCallback.bind(window);
    const cancel=window.cancelIdleCallback.bind(window);
    const pending=new Map<number,{callback:IdleRequestCallback;options?:IdleRequestOptions;native?:number}>();
    let nextId=0,released=false;
    window.requestIdleCallback=(callback,options)=>{
      if(released||options?.timeout!==1500)return request(callback,options);
      const id=--nextId;pending.set(id,{callback,options});
      Reflect.set(window,"__standaloneLenusIdleHeld",true);
      return id;
    };
    window.cancelIdleCallback=id=>{
      const job=pending.get(id);
      if(job){if(job.native!==undefined)cancel(job.native);pending.delete(id);}
      else cancel(id);
    };
    Reflect.set(window,"__standaloneReleaseLenusIdle",()=>{
      if(released)return;released=true;
      for(const [id,job] of pending)job.native=request(deadline=>{pending.delete(id);job.callback(deadline);},job.options);
    });
  });
  const release=()=>page.evaluate(()=>Reflect.get(window,"__standaloneReleaseLenusIdle")?.());`;

/** Keep authored interaction assertions while adapting transport assumptions to file exports. */
export function adaptVerificationSource(source: string, filename: string): string {
  const name = filename.replace(/\\/g, "/").split("/").pop();
  if (name === "hiyas.spec.ts") {
    return source.replace('toHaveAttribute("src", `/templates/hiyas/clips/${clip}.mp4`)', 'toHaveAttribute("data-standalone-src", `/templates/hiyas/clips/${clip}.mp4`)');
  }
  if (name === "keytu.spec.ts") {
    // A downloaded file cannot implement the server's legacy /cairn redirect.
    return source.replace('test("legacy /cairn URL redirects to /keytu"', 'test.skip("legacy /cairn URL redirects to /keytu"');
  }
  if (name === "loophouse.spec.ts") {
    return source.replace('if (!req.url().startsWith("http://localhost")) networkRequestMade = true;', 'if (/^https?:/.test(req.url()) && !req.url().startsWith("http://localhost")) networkRequestMade = true;');
  }
  if (name === "lumen.spec.ts") {
    // Three's data-URL loader does not produce an HTTP response event. Check the
    // actual input file, then retain the authored parsed-model/GPU readiness assertions.
    const adapted=source.replace('const meshResponse = page.waitForResponse((response) => response.url().includes("/templates/lumen/footer-glass-mesh.glb"));','const modelFile = await localAssetStatus("/templates/lumen/footer-glass-mesh.glb");')
      .replace('expect((await meshResponse).ok()).toBe(true);','expect(modelFile.ok()).toBe(true);');
    return adapted===source?source:`import {localAssetStatus} from ${JSON.stringify(path.resolve("tests/standalone/open"))};\n${adapted}`;
  }
  if (name === "savepoint.spec.ts") {
    return source
      .replace(/(\.toHaveAttribute\(\s*)(['"])src\2(\s*,\s*)(?=[`'"]\/templates\/savepoint\/)/g, "$1$2data-standalone-src$2$3")
      .replace(/\.toHaveCSS\((['"])background-image\1(?=\s*,\s*new RegExp\(\s*`world-)/g, ".toHaveAttribute($1data-standalone-background$1");
  }
  if (name === "morta.spec.ts") {
    return source.replace(/img\[src\^=(['"])\/templates\/morta\/\1\]/g, "img[data-standalone-src^=$1/templates/morta/$1]");
  }
  if (name === "koji.spec.ts") {
    const adapted = source.replace(/\brequest\.head(?=\(\s*['"]\/templates\/koji\/)/g, "localAssetStatus")
      .replace('r.url().includes("/templates/koji/clips/")', '(r.url().startsWith("data:video/mp4;base64,") || (r.url().startsWith("blob:") && r.resourceType()==="fetch"))');
    return adapted === source ? source : `import {localAssetStatus} from ${JSON.stringify(path.resolve("tests/standalone/open"))};\n${adapted}`;
  }
  if (name === "lowtide.spec.ts") {
    const route = 'await page.route("**/moon-2048.jpg", () => new Promise(() => {}));';
    if (!source.includes(route)) return source;
    // Match the exact real texture. Other embedded JPEGs must keep loading normally.
    const moon = `data:image/jpeg;base64,${fs.readFileSync(path.resolve("public/templates/lowtide/moon-2048.jpg")).toString("base64")}`;
    return source.replace(route, `await page.addInitScript((moon)=>{
      const descriptor=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,"src")!;
      const expected=atob(moon.slice(moon.indexOf(",")+1));
      const candidates=new Map<string,Promise<boolean>>();
      const create=URL.createObjectURL.bind(URL);
      URL.createObjectURL=(blob)=>{
        const url=create(blob);
        if(blob instanceof Blob&&blob.type==="image/jpeg"&&blob.size===expected.length)candidates.set(url,blob.arrayBuffer().then(buffer=>{
          const bytes=new Uint8Array(buffer);return bytes.every((value,index)=>value===expected.charCodeAt(index));
        }));
        return url;
      };
      Object.defineProperty(HTMLImageElement.prototype,"src",{
        ...descriptor,
        set(value){
          if(value===moon){Reflect.set(window,"__standaloneMoonHeld",true);return;}
          const candidate=candidates.get(value);
          if(candidate){void candidate.then(matches=>{if(matches)Reflect.set(window,"__standaloneMoonHeld",true);else descriptor.set!.call(this,value);});return;}
          descriptor.set!.call(this,value);
        },
      });
    },${JSON.stringify(moon)});`)
      .replace('await expect(page.locator("canvas.lt-canvas")).toHaveCount(1, { timeout: 15_000 });', `await expect(page.locator("canvas.lt-canvas")).toHaveCount(1, { timeout: 15_000 });
    await expect.poll(()=>page.evaluate(()=>Reflect.get(window,"__standaloneMoonHeld"))).toBe(true);
    await expect(page.locator(".lt-xp")).toHaveAttribute("data-ready", "false");`);
  }
  if (name === "lenus.spec.ts") {
    const setup = /  let release=\(\)=>\{\};\r?\n  const gate=[\s\S]*?await page\.route\("\*\*\/_next\/static\/chunks\/\*\.js",async route=>\{[\s\S]*?\r?\n  \}\);/;
    if (!setup.test(source)) return source;
    return source.replace(setup, lenusIdleGate)
      .replace("a STEP INSIDE command queued before the rendering module loads is replayed", "a STEP INSIDE command issued before the scheduled rendering boot is preserved")
      .replace('await expect.poll(()=>blocked).toBe(true);', `await expect.poll(()=>page.evaluate(()=>Reflect.get(window,"__standaloneLenusIdleHeld"))).toBe(true);
    await expect(page.locator("canvas[data-lenus-renderer]")).toHaveCount(0);`)
      .replace('release();await expect(page.locator(".ln-stage"))', 'await release();await expect(page.locator(".ln-stage"))')
      .replace('}finally{release();}', '}finally{await release();}');
  }
  if (name === "kinfield.spec.ts") {
    // In a standalone single-file export, all scripts are inlined into the HTML document;
    // there are no external _next/static network requests to hold before hydration.
    return source.replace(
      'test("preserves session choices made before client hydration completes"',
      'test.skip("preserves session choices made before client hydration completes"'
    );
  }
  return source;
}
