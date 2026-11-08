import { describe, expect, it } from "vitest";
import { build } from "esbuild";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createRequire } from "node:module";
import { rewriteAssetConsumers, assetLiterals, assetPatterns } from "./source-assets";

describe("JavaScript asset-consumer adaptation", () => {
  it("treats regex punctuation in authored filenames literally", () => {
    const patterns = assetPatterns('const frame = i => `/templates/future/(wide)+[a]/frame-${i}.png`;', "future.js");
    expect(patterns.some(pattern => pattern.test("/templates/future/(wide)+[a]/frame-1.png"))).toBe(true);
    expect(patterns.some(pattern => pattern.test("/templates/future/widea/frame-1Xpng"))).toBe(false);
  });

  it("matches computed frame families and variable-base concatenations without collecting comments or unrelated artwork", () => {
    const source = '// `/templates/other/unused-${i}.png`\n' +
      'const frame = i => `/templates/future/frames/frame-${String(i).padStart(3, "0")}.webp?version=1`;\n' +
      'const clip = i => BASE + "/clips/take-" + i + ".mp4";';
    const patterns = assetPatterns(source, "future.ts");
    const matches = (url: string) => patterns.some(pattern => pattern.test(url));
    expect(matches("/templates/future/frames/frame-007.webp")).toBe(true);
    expect(matches("/templates/future/frames/frame-120.webp")).toBe(true);
    expect(matches("/templates/future/clips/take-2.mp4")).toBe(true);
    expect(matches("/templates/future/portrait.webp")).toBe(false);
    expect(matches("/templates/future/frames/frame-007Xwebp")).toBe(false);
    expect(matches("/templates/other/unused-1.png")).toBe(false);
  });

  it("collects real string and template fragments without treating comments as required assets", () => {
    expect(assetLiterals(`// original '/assets/missing.png'\nconst actual='/templates/scene.webp';const font=\`\${base}/fonts/world.ttf\`;`,"fixture.ts")).toEqual(["/templates/scene.webp","","/fonts/world.ttf"]);
  });
  it("resolves dynamic loader, Image, fetch and font inputs without changing non-URL values", async () => {
    const source = `
const pathFor = name => '/templates/example/' + name;
const loader = {load: value => value, loadAsync: value => value};
const image = {src: ''}; image.src = pathFor('art.webp');
const fetch = value => value;
const text = {font: pathFor('font.ttf'), fontSize: 12};
const element = {setAttribute: (key,value) => value};
export const result = [loader.load(pathFor('model.glb')), loader.loadAsync(pathFor('art.webp')), image.src, fetch(pathFor('clip.mp4')), text.font, text.fontSize, element.setAttribute('src',pathFor('other.webp')), loader.load({local:true})];`;
    const folder = fs.mkdtempSync(path.join(os.tmpdir(), "standalone-consumers-"));
    try {
      const file = path.join(folder, "fixture.cjs");
      await build({
        stdin: { contents: rewriteAssetConsumers(source, "fixture.ts"), loader: "ts", resolveDir: folder },
        bundle: true, platform: "node", format: "cjs", outfile: file,
        plugins: [{ name: "fixture-registry", setup(builder) {
          builder.onResolve({ filter: /^standalone:registry$/ }, () => ({ path: "registry", namespace: "fixture" }));
          builder.onLoad({ filter: /.*/, namespace: "fixture" }, () => ({ contents: `export function resolveAsset(value){return typeof value==='string'&&value.startsWith('/templates/')?'embedded:'+value:value}` }));
        } }],
      });
      const { result } = createRequire(import.meta.url)(file);
      expect(result).toEqual(["embedded:/templates/example/model.glb", "embedded:/templates/example/art.webp", "embedded:/templates/example/art.webp", "embedded:/templates/example/clip.mp4", "embedded:/templates/example/font.ttf", 12, "embedded:/templates/example/other.webp", {local:true}]);
    } finally { fs.rmSync(folder, { recursive: true, force: true }); }
  });

  it("keeps shader strings and existing data/blob URLs intact", () => {
    const result = rewriteAssetConsumers(`const shader='void main(){textureLoad(x);}'; const image={src:''};image.src='blob:local';`, "fixture.ts");
    expect(result).toContain("void main(){textureLoad(x);}");
    expect(result).toContain("blob:local");
  });
});
