import { describe, expect, it } from "vitest";
import { build, type Plugin } from "esbuild";
import { createRequire } from "node:module";
import path from "node:path";
import { createElement, type ComponentType } from "react";
import { renderToString } from "react-dom/server";
import { chromium } from "@playwright/test";
import { nextAdapters } from "./next-adapters";

const require = createRequire(import.meta.url);

// This fixture uses the production DOM prop adapter, as the exporter does.
const fixtureRuntime: Plugin = {
  name: "next-adapter-fixture",
  setup(builder) {
    builder.onResolve({ filter: /^react\/jsx-runtime$/ }, () => ({ path: "jsx", namespace: "next-fixture" }));
    builder.onResolve({ filter: /^standalone:registry$/ }, () => ({ path: "registry", namespace: "next-fixture" }));
    builder.onLoad({ filter: /.*/, namespace: "next-fixture" }, ({ path: name }) => ({
      resolveDir: process.cwd(),
      contents: name === "registry" ? `
        export const config = {slug:"example",assets:{"/templates/example/art.webp":"data:image/webp;base64,YXJ0"}};
        export function resolveAsset(value){return config.assets[value] || value;}
      ` : `
        import {jsx as originalJsx,jsxs as originalJsxs,Fragment} from ${JSON.stringify(require.resolve("react/jsx-runtime"))};
        import {adaptProps} from ${JSON.stringify(path.resolve("scripts/standalone/runtime.ts"))};
        import {config} from "standalone:registry";
        export {Fragment};
        export function jsx(type,props,key){return originalJsx(type,adaptProps(type,props,config),key);}
        export function jsxs(type,props,key){return originalJsxs(type,adaptProps(type,props,config),key);}
      `,
    }));
  },
};

async function bundle(source: string, browser = false, plugins: Plugin[] = []) {
  const result = await build({
    stdin: { contents: source, loader: "tsx", resolveDir: process.cwd() },
    bundle: true, write: false, jsx: "automatic", logLevel: "silent",
    platform: browser ? "browser" : "node", format: browser ? "iife" : "cjs",
    external: browser ? [] : ["react", "react-dom/*"],
    define: { "process.env.NODE_ENV": '"production"' },
    plugins: [nextAdapters(), fixtureRuntime, ...plugins],
  });
  return result.outputFiles[0].text;
}

async function modules() {
  const source = await bundle(`export {default as Image} from "next/image";export {default as Link} from "next/link";export {default as dynamic} from "next/dynamic";`);
  // Evaluate only this authored fixture, using the same React instance as renderToString.
  const fixtureRequire = createRequire(path.join(process.cwd(), "package.json"));
  const fixtureModule = { exports: {} };
  new Function("require", "module", "exports", source)(fixtureRequire, fixtureModule, fixtureModule.exports);
  return fixtureModule.exports as {
    Image: ComponentType<Record<string, unknown>>;
    Link: ComponentType<Record<string, unknown>>;
    dynamic: (loader: () => Promise<unknown>, options?: Record<string, unknown>) => ComponentType<Record<string, unknown>>;
  };
}

describe("standalone Next module adapters", () => {
  it("bundles all three boundaries without shipping the Next runtime", async () => {
    const result = await build({
      stdin: { contents: 'export {default as Image} from "next/image";export {default as Link} from "next/link";export {default as dynamic} from "next/dynamic";', resolveDir: process.cwd() },
      bundle: true, write: false, platform: "browser", metafile: true, logLevel: "silent",
      define: { "process.env.NODE_ENV": '"production"' }, plugins: [nextAdapters(), fixtureRuntime],
    });
    expect(Object.keys(result.metafile!.inputs).filter(file => /node_modules[\\/]next[\\/]/.test(file))).toEqual([]);
  });

  it("renders embedded fill images with authored styling and no optimizer props", async () => {
    const { Image } = await modules();
    const html = renderToString(createElement(Image, {
      src: "/templates/example/art.webp", fill: true, alt: 'Glass & light',
      className: "object-contain", style: { opacity: 0.6, objectPosition: "right bottom" },
      priority: true, quality: 90, placeholder: "blur", blurDataURL: "data:image/gif;base64,AA==", unoptimized: true,
    }));
    expect(html).toContain('src="data:image/webp;base64,YXJ0"');
    expect(html).toContain('alt="Glass &amp; light"');
    expect(html).toContain('class="object-contain"');
    for (const style of ["position:absolute", "width:100%", "height:100%", "top:0", "left:0", "opacity:0.6", "object-position:right bottom"]) expect(html).toContain(style);
    expect(html).toContain('loading="eager"');
    expect(html).not.toMatch(/\/_next\/|\s(?:fill|priority|quality|placeholder|blurDataURL|unoptimized)=/i);
  });

  it("preserves image dimensions and explicit eager loading", async () => {
    const { Image } = await modules();
    const html = renderToString(createElement(Image, {
      src: { src: "/templates/example/art.webp", width: 600, height: 400 }, alt: "", loading: "eager", "data-art": "yes",
    }));
    expect(html).toContain('width="600"');
    expect(html).toContain('height="400"');
    expect(html).toContain('loading="eager"');
    expect(html).toContain('data-art="yes"');
    expect(html).not.toContain("[object Object]");
  });

  it("keeps same-template anchors local and the gallery CTA reachable", async () => {
    const { Link } = await modules();
    const local = renderToString(createElement(Link, { href: "/example?plan=annual#signup", prefetch: false, replace: true, scroll: false, className: "cta" }, "Continue"));
    expect(local).toContain('href="?plan=annual#signup"');
    expect(local).toContain('class="cta"');
    expect(local).toContain('>Continue</a>');
    expect(local).not.toMatch(/\s(?:prefetch|replace|scroll)=/);
    expect(renderToString(createElement(Link, { href: "/" }, "Gallery"))).toBe('<a href="https://openlanding.page/">Gallery</a>');
    const external = renderToString(createElement(Link, { href: "https://example.org/", target: "_blank", rel: "noreferrer" }, "External"));
    for (const attribute of ['href="https://example.org/"', 'target="_blank"', 'rel="noreferrer"']) expect(external).toContain(attribute);
  });

  it("renders dynamic fallbacks on the server without invoking browser-only loaders", async () => {
    const { dynamic } = await modules();
    const loader = () => { throw new Error("Browser-only loader was invoked during SSR"); };
    const Empty = dynamic(loader, { ssr: false });
    const Loading = dynamic(loader, { ssr: false, loading: () => createElement("p", null, "Preparing") });
    expect(renderToString(createElement(Empty))).toBe("");
    expect(renderToString(createElement(Loading))).toBe("<p>Preparing</p>");
  });

  it("hydrates dynamic fallbacks then mounts bundled default and named exports", async () => {
    const app = `
      import dynamic from "next/dynamic";
      import {useState} from "react";
      const Default = dynamic(() => import("fixture:lazy"), {ssr:false,loading:()=> <p id="loading">Preparing</p>});
      const Named = dynamic(() => import("fixture:lazy").then(module=>module.Named), {ssr:false});
      const Late = dynamic(() => new Promise(resolve=>{window.finishLate=()=>resolve({default:()=>{window.lateRenders++;return <p id="late">Late</p>}})}),{ssr:false});
      function App(){const [late,setLate]=useState(true);if(typeof window!=="undefined") window.hideLate=()=>setLate(false);return <><Default label="Default loaded"/><Named label="Named loaded"/>{late&&<Late/>}</>}
    `;
    const lazy: Plugin = { name: "bundled-lazy-fixture", setup(builder) {
      builder.onResolve({ filter: /^fixture:lazy$/ }, () => ({ path: "lazy", namespace: "lazy-fixture" }));
      builder.onLoad({ filter: /.*/, namespace: "lazy-fixture" }, () => ({ loader: "tsx", resolveDir: process.cwd(), contents: `
        if(typeof window==="undefined") throw new Error("Lazy module evaluated during SSR");
        export default function Default({label}){return <p id="default">{label}</p>}
        export function Named({label}){return <p id="named">{label}</p>}
      ` }));
    } };
    const server = await bundle(`${app};import {createElement} from "react";import {renderToString} from "react-dom/server";export const html=renderToString(createElement(App));`, false, [lazy]);
    const serverModule = { exports: {} as { html: string } };
    new Function("require", "module", "exports", server)(require, serverModule, serverModule.exports);
    expect(serverModule.exports.html).toBe('<p id="loading">Preparing</p>');
    const client = await bundle(`${app};import {hydrateRoot} from "react-dom/client";window.lateRenders=0;hydrateRoot(document.getElementById("root"),<App/>,{onRecoverableError:error=>window.hydrationErrors.push(String(error))});`, true, [lazy]);
    const browser = await chromium.launch({ headless: true });
    try {
      const page = await browser.newPage();
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(String(error)));
      await page.setContent(`<div id="root">${serverModule.exports.html}</div><script>window.hydrationErrors=[];</script>`);
      await page.addScriptTag({ content: client });
      await page.waitForSelector("#default");
      expect(await page.locator("#default").textContent()).toBe("Default loaded");
      expect(await page.locator("#named").textContent()).toBe("Named loaded");
      await page.evaluate(() => (window as unknown as { hideLate(): void }).hideLate());
      await page.waitForTimeout(30);
      await page.evaluate(() => (window as unknown as { finishLate(): void }).finishLate());
      await page.waitForTimeout(30);
      expect(await page.locator("#late").count()).toBe(0);
      expect(await page.evaluate(() => (window as unknown as { lateRenders: number }).lateRenders)).toBe(0);
      expect(await page.evaluate(() => (window as unknown as { hydrationErrors: string[] }).hydrationErrors)).toEqual([]);
      expect(errors).toEqual([]);
    } finally { await browser.close(); }
  }, 30_000);
});
