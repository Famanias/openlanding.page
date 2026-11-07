import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { build, type Plugin } from "esbuild";
import { readTemplateFiles } from "../template-files";
import { AssetStore } from "./assets";
import { extractDocument } from "./document";
import type { StandaloneSlug } from "./config";

const require = createRequire(import.meta.url);

function collectAssets(slug: StandaloneSlug, root: string, assets: AssetStore) {
  for (const file of readTemplateFiles(slug, true)) {
    if (/\/(?:layout|opengraph-image)\.tsx$/.test(file.path)) continue;
    for (const [, url] of file.source.matchAll(/["'`]((?:\/templates\/)[^"'`\s<>${}]+)["'`]/g)) {
      if (path.extname(url)) {
        assets.add(url);
        // Some authored picture components derive their PNG fallback from a WebP data URL.
        const fallback = url.replace(/\.webp$/, ".png");
        if (fallback !== url && fs.existsSync(path.join(root, "public", fallback.slice(1)))) assets.add(fallback);
      }
    }
    if (file.path.endsWith("assets.generated.ts")) {
      for (const [, key] of file.source.matchAll(/["']?([\w-]+)["']?:\s*\{\s*["']?w["']?:/g)) {
        const canonical = `/templates/${slug}/${key}-1600.webp`;
        assets.add(canonical);
        for (const width of [800, 1600]) for (const format of ["webp", "avif"]) {
          const url = `/templates/${slug}/${key}-${width}.${format}`;
          assets.aliases[url] = canonical;
        }
      }
    }
  }
}

function jsxAdapter(slug: StandaloneSlug, assets: AssetStore): Plugin {
  return {
    name: "standalone-jsx-assets",
    setup(builder) {
      builder.onResolve({ filter: /^react\/jsx-runtime$/ }, () => ({ path: "jsx", namespace: "standalone" }));
      builder.onLoad({ filter: /.*/, namespace: "standalone" }, () => ({
        loader: "js",
        resolveDir: process.cwd(),
        contents: `import {jsx as originalJsx,jsxs as originalJsxs,Fragment} from ${JSON.stringify(require.resolve("react/jsx-runtime"))};
import {adaptProps} from ${JSON.stringify(path.resolve("scripts/standalone/runtime.ts"))};
const config=${JSON.stringify({ slug, assets: assets.entries, aliases: assets.aliases })};
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
  const routeFile = path.join(root, ".next/server/app", `${slug}.html`);
  if (!fs.existsSync(routeFile)) throw new Error(`Build the site before exporting ${slug}`);
  const sourceFiles = readTemplateFiles(slug, true);
  if (sourceFiles.some(file => fs.statSync(file.path).mtimeMs > fs.statSync(routeFile).mtimeMs)) throw new Error(`Stale production build for ${slug}; rebuild the site`);
  const assets = new AssetStore(root);
  const shell = extractDocument(fs.readFileSync(routeFile, "utf8"), root, assets);
  collectAssets(slug, root, assets);
  const entry = `./src/app/(${slug})/${slug}/page.tsx`;
  const common = {
    bundle: true,
    jsx: "automatic" as const,
    plugins: [jsxAdapter(slug, assets)],
    define: { "process.env.NODE_ENV": '"production"' },
    loader: { ".css": "empty" as const },
    logLevel: "warning" as const,
  };
  const cache = path.join(root, ".openlanding-page/standalone-exports", slug);
  fs.mkdirSync(cache, { recursive: true });
  const renderer = path.join(cache, "renderer.cjs");
  await build({
    ...common, platform: "node", format: "cjs", outfile: renderer, external: ["react", "react-dom/*"],
    stdin: { contents: `import {createElement} from "react";import {renderToString} from "react-dom/server";import Page from ${JSON.stringify(entry)};export const markup=renderToString(createElement(Page));`, resolveDir: root, loader: "tsx" },
  });
  delete require.cache[require.resolve(renderer)];
  const markup: string = require(renderer).markup;
  const browser = await build({
    ...common, platform: "browser", format: "iife", target: "es2020", minify: true, write: false, legalComments: "inline",
    stdin: { contents: `import {createElement} from "react";import {hydrateRoot} from "react-dom/client";import {installNavigation} from "./scripts/standalone/runtime";import Page from ${JSON.stringify(entry)};installNavigation(${JSON.stringify(slug)});hydrateRoot(document.getElementById("standalone-root"),createElement(Page));`, resolveDir: root, loader: "tsx" },
  });
  const script = browser.outputFiles[0].text.replace(/<\/script/gi, "<\\/script");
  const icon = path.join(root, `src/app/(${slug})/${slug}/icon.svg`);
  const favicon = fs.existsSync(icon) ? `<link rel="icon" href="data:image/svg+xml;base64,${fs.readFileSync(icon).toString("base64")}">` : "";
  const html = `<!DOCTYPE html>
<!-- Generated from the current ${slug} components. Regenerate with npm run export:templates -- ${slug}. -->
<html${shell.htmlAttributes}><head><meta charset="utf-8"><title>${shell.title}</title>
${shell.metadata}${favicon}<style>${shell.css}</style>${shell.noscript}</head>
<body${shell.bodyAttributes}>${shell.initialization}<div id="standalone-root">${markup}</div>
<script>${script}</script></body></html>\n`;
  if (!/<h1[\s>]/i.test(html) || /\/_next\//.test(html) || /<base[\s>]/i.test(html)) throw new Error(`Invalid standalone output for ${slug}`);
  fs.mkdirSync(outputDirectory, { recursive: true });
  const outputFile = path.join(outputDirectory, `${slug}.html`);
  fs.writeFileSync(outputFile, html);
  return { slug, outputFile, bytes: Buffer.byteLength(html), assets: Object.keys(assets.entries).length };
}
