import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { build, type Plugin, type PluginBuild } from "esbuild";
import { readTemplateFiles } from "../template-files";
import { AssetStore } from "./assets";
import { extractDocument } from "./document";
import { resolveStandaloneTemplate, type StandaloneSlug } from "./config";
import { rewriteAssetConsumers, assetLiterals, assetPatterns } from "./source-assets";
import { nextAdapters } from "./next-adapters";

const require = createRequire(import.meta.url);

export async function collectAssets(slug: StandaloneSlug, root: string, assets: AssetStore) {
  const optimize = ["savepoint", "synapxe", "xibalba"].includes(slug);
  const prepare = (url: string) => assets.prepare(url, optimize);
  const mediaDirectories = [path.join(root, "public/templates", slug), path.join(root, "public/assets", slug)];
  const media = mediaDirectories.flatMap(dir => fs.existsSync(dir) ? fs.readdirSync(dir, {recursive:true, withFileTypes:true}) : []).filter(file => file.isFile() && !/aistudio/.test(file.parentPath)).map(file => path.join(file.parentPath, file.name));
  for (const file of readTemplateFiles(slug, true)) {
    if (/\/(?:layout|opengraph-image)\.[jt]sx?$/.test(file.path)) continue;
    const literals=/\.[jt]sx?$/.test(file.path)?assetLiterals(file.source,file.path):[];
    for (const url of literals.filter(value=>/^\/(?:templates|assets)\//.test(value)&&!/[${}]/.test(value))) {
      if (path.extname(url)) {
        await prepare(url);
        // Some authored picture components derive their PNG fallback from a WebP data URL.
        const fallback = url.replace(/\.webp$/, ".png");
        if (fallback !== url && fs.existsSync(path.join(root, "public", fallback.slice(1)))) await prepare(fallback);
        const prefix = url.replace(/\.[a-z0-9]+$/i, "");
        for (const candidate of media) {
          const candidateUrl = "/" + path.relative(path.join(root, "public"), candidate).replace(/\\/g, "/");
          if (candidateUrl.startsWith(prefix) && candidateUrl !== url) assets.aliases[candidateUrl] = url;
        }
      }
    }
    if (file.path.endsWith("assets.generated.ts")) {
      for (const [, key] of file.source.matchAll(/["']?([\w-]+)["']?:\s*\{\s*["']?w["']?:/g)) {
        const canonical = `/templates/${slug}/${key}-1600.webp`;
        await prepare(canonical);
        for (const width of [800, 1600]) for (const format of ["webp", "avif"]) {
          const url = `/templates/${slug}/${key}-${width}.${format}`;
          assets.aliases[url] = canonical;
        }
      }
    }
    if (/\.[jt]sx?$/.test(file.path)) {
      for (const pattern of assetPatterns(file.source, file.path)) for (const candidate of media) {
        const url = "/" + path.relative(path.join(root, "public"), candidate).replace(/\\/g, "/");
        if (pattern.test(url) && !assets.aliases[url] && !assets.entries[url]) await prepare(url);
      }
    }
    {
      // Authored helpers construct paths from BASE plus these literal basenames.
      for (const [name] of literals.join("\n").matchAll(/[\w.-]+\.(?:png|jpe?g|webp|avif|svg|glb|ttf|woff2?|mp4|json)\b/g)) {
        const candidates = media.filter(file => path.basename(file) === name).sort((a,b) => a.length - b.length);
        if (candidates[0]) await prepare("/" + path.relative(path.join(root,"public"), candidates[0]).replace(/\\/g,"/"));
      }
    }
  }
  if (["koji", "noctiluca"].includes(slug)) {
    for (const file of media.filter(file => file.endsWith(".mp4") && file.includes(`${path.sep}clips${path.sep}`))) await prepare("/" + path.relative(path.join(root,"public"), file).replace(/\\/g,"/"));
  }
}

function jsxAdapter(slug: StandaloneSlug, assets: AssetStore): Plugin {
  return {
    name: "standalone-jsx-assets",
    setup(builder) {
      builder.onResolve({filter:/^standalone:registry$/}, () => ({path:"registry",namespace:"standalone-registry"}));
      builder.onLoad({filter:/.*/,namespace:"standalone-registry"}, () => {
        const values=[...new Set(Object.values(assets.entries))];
        const indices=new Map(values.map((value,index)=>[value,index]));
        const pairs=Object.entries(assets.entries).map(([key,value])=>[key,indices.get(value)]);
        return {loader:"js",resolveDir:process.cwd(),contents:`import {createAssetRegistry} from ${JSON.stringify(path.resolve("scripts/standalone/runtime.ts"))};const registry=createAssetRegistry(${JSON.stringify({slug,values,paths:pairs,aliases:assets.aliases})});export const {config,resolveAsset,enableRuntimeAssets}=registry;`};
      });
      builder.onResolve({ filter: /^react\/jsx-runtime$/ }, () => ({ path: "jsx", namespace: "standalone" }));
      builder.onLoad({ filter: /.*/, namespace: "standalone" }, () => ({
        loader: "js",
        resolveDir: process.cwd(),
        contents: `import {jsx as originalJsx,jsxs as originalJsxs,Fragment} from ${JSON.stringify(require.resolve("react/jsx-runtime"))};
import {adaptProps} from ${JSON.stringify(path.resolve("scripts/standalone/runtime.ts"))};
import {config} from 'standalone:registry';
export {Fragment};
function adapt(type,props){if(type==='img'&&props)return adaptProps(type,{...props,srcSet:undefined,sizes:undefined},config);return adaptProps(type,props,config)}
export function jsx(type,props,key){if(type==='source'&&props?.type?.startsWith('image/'))return null;return originalJsx(type,adapt(type,props),key)}
export function jsxs(type,props,key){return originalJsxs(type,adapt(type,props),key)}`,
      }));
    },
  };
}

export async function exportTemplate(slug: StandaloneSlug, outputDirectory: string) {
  const root = process.cwd();
  const template = resolveStandaloneTemplate(slug, root);
  const routeFile = path.join(root, ".next/server/app", `${slug}.html`);
  if (!fs.existsSync(routeFile)) throw new Error(`Build the site before exporting ${slug}`);
  const sourceFiles = readTemplateFiles(slug, true);
  if (sourceFiles.some(file => fs.statSync(file.path).mtimeMs > fs.statSync(routeFile).mtimeMs)) throw new Error(`Stale production build for ${slug}; rebuild the site`);
  const assets = new AssetStore(root);
  const metaFile = routeFile.replace(/\.html$/, ".meta");
  const meta = fs.existsSync(metaFile) ? JSON.parse(fs.readFileSync(metaFile, "utf8")) : null;
  const fontPreloadHeader = typeof meta?.headers?.link === "string" ? meta.headers.link : "";
  const shell = extractDocument(fs.readFileSync(routeFile, "utf8"), root, assets, fontPreloadHeader);
  await collectAssets(slug, root, assets);
  const entry = template.entry;
  const common = {
    bundle: true,
    jsx: "automatic" as const,
    plugins: [jsxAdapter(slug, assets), nextAdapters(), {
      name: "standalone-javascript-assets",
      setup(builder: PluginBuild) {
        const sourceRoot=path.resolve(root,`src/app/(${slug})`) + path.sep;
        builder.onLoad({filter:/\.[jt]sx?$/}, async args => {
          if (!args.path.startsWith(sourceRoot)) return;
          const source=fs.readFileSync(args.path,"utf8");
          const loader = /\.jsx?$/.test(args.path) ? "jsx" : path.extname(args.path).slice(1) as "ts" | "tsx";
          return {contents:rewriteAssetConsumers(source,args.path),loader,resolveDir:path.dirname(args.path)};
        });
      },
    }],
    define: { "process.env.NODE_ENV": '"production"' },
    loader: { ".css": "empty" as const },
    logLevel: "warning" as const,
  };
  const cache = path.join(root, ".openlanding-page/standalone-exports", slug);
  fs.mkdirSync(cache, { recursive: true });
  const renderer = path.join(cache, "renderer.cjs");
  await build({
    ...common, platform: "node", format: "cjs", outfile: renderer, external: ["react", "react-dom/*"],
    stdin: { contents: `import {createElement,useEffect} from "react";import {renderToString} from "react-dom/server";import {enableRuntimeAssets} from "standalone:registry";import Page from ${JSON.stringify(entry)};function ExportRoot(){useEffect(enableRuntimeAssets,[]);return createElement(Page)}export const markup=renderToString(createElement(ExportRoot));`, resolveDir: root, loader: "tsx" },
  });
  delete require.cache[require.resolve(renderer)];
  const markup: string = require(renderer).markup;
  const browser = await build({
    ...common, platform: "browser", format: "iife", target: "es2020", minify: true, write: false, legalComments: "inline",
    stdin: { contents: `import {createElement,useEffect} from "react";import {hydrateRoot} from "react-dom/client";import {enableRuntimeAssets} from "standalone:registry";import {installNavigation} from "./scripts/standalone/runtime";import Page from ${JSON.stringify(entry)};function ExportRoot(){useEffect(enableRuntimeAssets,[]);return createElement(Page)}installNavigation(${JSON.stringify(slug)});hydrateRoot(document.getElementById("standalone-root"),createElement(ExportRoot));`, resolveDir: root, loader: "tsx" },
  });
  const script = browser.outputFiles[0].text.replace(/<\/script/gi, "<\\/script");
  const icon = path.join(root, `src/app/(${slug})/${slug}/icon.svg`);
  const favicon = fs.existsSync(icon) ? `<link rel="icon" href="data:image/svg+xml;base64,${fs.readFileSync(icon).toString("base64")}">` : "";
  const html = `<!DOCTYPE html>
<!-- Generated from the current ${slug} components. Regenerate with npm run export:templates -- ${slug}. -->
<html${shell.htmlAttributes}><head><meta charset="utf-8"><title>${shell.title}</title>
${shell.metadata}${favicon}${shell.fontPreloads}<style>${shell.css}</style>${shell.noscript}</head>
<body${shell.bodyAttributes}>${shell.initialization}<div id="standalone-root" style="display:contents">${markup}</div>
<script>${script}</script></body></html>\n`;
  if (!/<h1[\s>]/i.test(html) || /\/_next\//.test(html) || /<base[\s>]/i.test(html)) throw new Error(`Invalid standalone output for ${slug}`);
  fs.mkdirSync(outputDirectory, { recursive: true });
  const outputFile = path.join(outputDirectory, `${slug}.html`);
  fs.writeFileSync(outputFile, html);
  return { slug, outputFile, bytes: Buffer.byteLength(html), assets: Object.keys(assets.entries).length };
}
