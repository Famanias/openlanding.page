import { afterEach, describe, expect, it } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { AssetStore, adaptProps } from "./assets";
import { extractDocument } from "./document";
import { normalizeNavigation, createAssetRegistry } from "./runtime";
import { selectSlugs, STANDALONE_SLUGS } from "./config";

const fixtures: string[] = [];
function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "standalone-assets-"));
  fixtures.push(root);
  fs.mkdirSync(path.join(root, "public/templates/example"), { recursive: true });
  fs.mkdirSync(path.join(root, ".next/static/css"), { recursive: true });
  fs.mkdirSync(path.join(root, ".next/static/media"), { recursive: true });
  fs.writeFileSync(path.join(root, "public/templates/example/art.svg"), '<svg xmlns="http://www.w3.org/2000/svg"/>');
  fs.writeFileSync(path.join(root, ".next/static/media/font.woff2"), "font");
  return root;
}
afterEach(() => fixtures.splice(0).forEach(root => fs.rmSync(root, { recursive: true, force: true })));

describe("standalone asset handling", () => {
  it("keeps SSR and initial hydration URLs identical, then reuses decoded blob assets for interaction",async()=>{
    const uri="data:model/gltf-binary;base64,Z2xURg==";
    const registry=createAssetRegistry({slug:"example",values:[uri],paths:[["/templates/example/model.glb",0],["/templates/example/copy.glb",0]],aliases:{}});
    expect(registry.config.assets["/templates/example/model.glb"]).toBe(uri);
    expect(registry.resolveAsset("/templates/example/model.glb")).toBe(uri);
    registry.enableRuntimeAssets();
    const url=registry.resolveAsset("/templates/example/model.glb") as string;
    try{
      expect(url).toMatch(/^blob:/);
      expect(registry.resolveAsset("/templates/example/copy.glb")).toBe(url);
      const response=await fetch(url);
      expect(response.headers.get("content-type")).toBe("model/gltf-binary");
      expect(await response.text()).toBe("glTF");
    }finally{URL.revokeObjectURL(url);}
  });
  it("limits export targets to the supported manifest and deduplicates explicit selections", () => {
    expect(selectSlugs([])).toHaveLength(42);
    expect(selectSlugs(["--3d"])).toHaveLength(22);
    expect(selectSlugs(["--all"])).toEqual([...STANDALONE_SLUGS]);
    expect(selectSlugs(["aftercart", "aftercart"])).toEqual(["aftercart"]);
    expect(() => selectSlugs(["../private"])).toThrow(/unsupported/i);
  });
  it("keeps query updates on the downloaded file instead of navigating to a site-root path", () => {
    expect(normalizeNavigation("/pello?plan=steady&goal=240", "pello")).toBe("?plan=steady&goal=240");
    expect(normalizeNavigation("/pello#begin", "pello")).toBe("#begin");
    expect(normalizeNavigation("https://example.com/pello", "pello")).toBe("https://example.com/pello");
  });
  it("embeds local assets, reuses entries and rejects traversal and missing files", () => {
    const store = new AssetStore(fixture());
    const uri = store.add("/templates/example/art.svg");
    expect(uri).toMatch(/^data:image\/svg\+xml;base64,/);
    expect(store.add("/templates/example/art.svg")).toBe(uri);
    expect(Object.keys(store.entries)).toHaveLength(1);
    expect(() => store.add("/templates/example/missing.svg")).toThrow(/missing/i);
    expect(() => store.add("/templates/../../../secret.svg")).toThrow(/outside|escape|invalid/i);
    expect(() => store.add("https://example.com/art.svg")).toThrow(/external|local/i);
  });

  it("embeds model/video bytes and identifies JPEG images whose filename says PNG", () => {
    const root = fixture();
    fs.mkdirSync(path.join(root, "public/assets"), {recursive:true});
    fs.writeFileSync(path.join(root, "public/templates/example/model.glb"), Buffer.from([0x67,0x6c,0x54,0x46]));
    fs.writeFileSync(path.join(root, "public/templates/example/clip.mp4"), "video");
    fs.writeFileSync(path.join(root, "public/assets/art.png"), Buffer.from([0xff,0xd8,0xff,0xe0]));
    const store = new AssetStore(root);
    expect(store.add("/templates/example/model.glb")).toMatch(/^data:model\/gltf-binary;base64,/);
    expect(store.add("/templates/example/clip.mp4")).toMatch(/^data:video\/mp4;base64,/);
    expect(store.add("/assets/art.png")).toMatch(/^data:image\/jpeg;base64,/);
  });

  it("adapts srcsets, SVG hrefs, background images and same-page links without changing other props", () => {
    const store = new AssetStore(fixture());
    const uri = store.add("/templates/example/art.svg");
    const config = { slug: "example", assets: store.entries };
    expect(adaptProps("img", { src: "/templates/example/art.svg", alt: "art" }, config)).toEqual({ src: uri, alt: "art", "data-standalone-src":"/templates/example/art.svg" });
    expect(adaptProps("source", { srcSet: "/templates/example/art.svg 800w, /templates/example/art.svg 1600w" }, config)?.srcSet).toBe(`${uri} 800w, ${uri} 1600w`);
    expect(adaptProps("image", { href: "/templates/example/art.svg" }, config)?.href).toBe(uri);
    expect(adaptProps("div", { style: { backgroundImage: 'url("/templates/example/art.svg")' } }, config)?.style).toEqual({ backgroundImage: `url("${uri}")` });
    expect(adaptProps("a", { href: "/example" }, config)?.href).toBe("#top");
    expect(adaptProps("a", { href: "/example?plan=annual#signup" }, config)?.href).toBe("?plan=annual#signup");
    expect(adaptProps("a", { href: "https://example.com" }, config)?.href).toBe("https://example.com");
    expect(() => adaptProps("img", { src: "/templates/example/missing.svg" }, config)).toThrow(/missing|unregistered/i);
  });

  it("resolves responsive aliases through one canonical asset without duplicating image data", () => {
    const config = { slug: "example", assets: { "/templates/example/art-1600.webp": "data:image/webp;base64,YXJ0" }, aliases: { "/templates/example/art-800.avif": "/templates/example/art-1600.webp" } };
    expect(adaptProps("img", { src: "/templates/example/art-800.avif" }, config)?.src).toBe("data:image/webp;base64,YXJ0");
    expect(Object.values(config.assets)).toHaveLength(1);
  });

  it("preserves quoted SVG data URLs containing nested url() expressions", () => {
    const store = new AssetStore(fixture());
    const css = `.grain{background:url("data:image/svg+xml;utf8,<svg><rect filter='url(%23noise)'/></svg>")}.tail{position:fixed}`;
    expect(store.css(css, "unused.css")).toBe(css);
  });
});

describe("standalone document shell", () => {
  it("covers a remote Google font declaration with an existing locally built font face", () => {
    const root=fixture();
    fs.writeFileSync(path.join(root,".next/static/css/main.css"),"body{margin:0}");
    fs.writeFileSync(path.join(root,".next/static/css/cached-font.css"),'@font-face{font-family:"Example Sans";font-style:normal;src:url(../media/font.woff2)}');
    const html='<html><head><link rel="stylesheet" href="/_next/static/css/main.css"/><link href="https://fonts.googleapis.com/css2?family=Example+Sans:wght@400" rel="stylesheet"/></head><body></body></html>';
    expect(extractDocument(html,root,new AssetStore(root)).css).toContain('font-family:"Example Sans"');
  });
  it("embeds production styles and fonts, retains authored scripts and noscript, and drops Next scripts", () => {
    const root = fixture();
    fs.writeFileSync(path.join(root, ".next/static/css/main.css"), '@font-face{src:url(../media/font.woff2)}.art{background:url(/templates/example/art.svg)}');
    const shell = extractDocument('<html lang="en-GB" class="font-variable"><head><title>Example &amp; Co</title><link rel="stylesheet" href="/_next/static/css/main.css"/></head><body class="page-body"><script>document.documentElement.classList.add("js")</script><noscript><style>.reveal{opacity:1}</style></noscript><noscript><p>Enable scripting in this form.</p></noscript><script src="/_next/static/chunk.js"></script><script>self.__next_f.push([1,"data"])</script></body></html>', root, new AssetStore(root));
    expect(shell.htmlAttributes).toContain('lang="en-GB"');
    expect(shell.bodyAttributes).toContain('class="page-body"');
    expect(shell.css).toContain("data:font/woff2;base64,");
    expect(shell.css).toContain("data:image/svg+xml;base64,");
    expect(shell.initialization).toContain('classList.add("js")');
    expect(shell.noscript).toContain(".reveal{opacity:1}");
    expect(shell.noscript).not.toContain("Enable scripting in this form");
    expect(JSON.stringify(shell)).not.toContain("__next_f");
    expect(shell.css).not.toContain("/_next/");
  });
});
