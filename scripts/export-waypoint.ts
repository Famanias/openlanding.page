import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { build, type Plugin } from "esbuild";
import {
  formatRepomixBundle,
  TEMPLATE_METADATA,
} from "./generate-copy-bundles";
import { readTemplateFiles } from "./template-files";

const root = process.cwd();
const nextRoot = path.join(root, ".next");
const publicRoot = path.join(root, "public");
const routeFile = path.join(nextRoot, "server/app/waypoint.html");
const outputFile = path.join(publicRoot, "downloads/waypoint.html");
const cacheRoot = path.join(root, "artifacts/waypoint/export");

function within(file: string, directory: string) {
  const relative = path.relative(directory, file);
  return (
    relative !== ".." &&
    !relative.startsWith(`..${path.sep}`) &&
    !path.isAbsolute(relative)
  );
}

function dataUri(file: string) {
  const resolved = path.resolve(file);
  if (!within(resolved, publicRoot) && !within(resolved, nextRoot)) {
    throw new Error(`Export asset must be inside public or .next: ${file}`);
  }
  const mime: Record<string, string> = {
    ".webp": "image/webp",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".woff2": "font/woff2",
    ".woff": "font/woff",
  };
  const type = mime[path.extname(resolved)];
  if (!type) throw new Error(`Unsupported export asset: ${file}`);
  return `data:${type};base64,${fs.readFileSync(resolved).toString("base64")}`;
}

function embeddedStyles(route: string) {
  const links = [...route.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*>/g)];
  if (!links.length)
    throw new Error(
      "No production styles found. Run npm run build before exporting.",
    );
  return links
    .map(([link]) => {
      const href = link.match(/href="([^"]+)"/)?.[1];
      if (!href?.startsWith("/_next/static/"))
        throw new Error("Unexpected stylesheet URL in Waypoint build.");
      const file = path.resolve(nextRoot, href.slice("/_next/".length));
      if (!within(file, nextRoot)) throw new Error("Invalid stylesheet path.");
      return fs
        .readFileSync(file, "utf8")
        .replace(/url\(([^)]+)\)/g, (_, raw: string) => {
          const url = raw.trim().replace(/^["']|["']$/g, "");
          if (url.startsWith("data:")) return `url("${url}")`;
          if (/^(?:https?:)?\/\//.test(url))
            throw new Error(
              `External CSS asset cannot be exported offline: ${url}`,
            );
          const asset = url.startsWith("/templates/waypoint/")
            ? path.join(publicRoot, url.slice(1))
            : path.resolve(path.dirname(file), url);
          return `url("${dataUri(asset)}")`;
        });
    })
    .join("\n");
}

async function exportWaypoint() {
  if (!fs.existsSync(routeFile))
    throw new Error(
      "Build the current site with npm run build before exporting Waypoint.",
    );
  const route = fs.readFileSync(routeFile, "utf8");
  const buildTime = fs.statSync(routeFile).mtimeMs;
  if (
    readTemplateFiles("waypoint").some(
      (file) => fs.statSync(path.join(root, file.path)).mtimeMs > buildTime,
    )
  ) {
    throw new Error(
      "Waypoint source changed since the production build. Run npm run build before exporting.",
    );
  }
  const htmlClass = route.match(/<html[^>]*class="([^"]*)"/)?.[1] ?? "";
  const bodyClass = route.match(/<body[^>]*class="([^"]*)"/)?.[1] ?? "";
  const css = embeddedStyles(route);
  if (css.includes("</style"))
    throw new Error("Unexpected closing style tag in compiled CSS.");

  // Swap only the image URLs at bundle time. The page components and all behavior stay shared.
  const imageData = Object.fromEntries(
    fs
      .readdirSync(path.join(publicRoot, "templates/waypoint"))
      .filter((name) => /^waypoint-\d{2}-.+-1600\.webp$/.test(name))
      .map((name) => [
        name.replace(/-1600\.webp$/, ""),
        dataUri(path.join(publicRoot, "templates/waypoint", name)),
      ]),
  );
  if (Object.keys(imageData).length !== 10)
    throw new Error(
      "All ten optimized ZIP images are required for the export.",
    );
  const images: Plugin = {
    name: "embedded-waypoint-artwork",
    setup(builder) {
      builder.onLoad({ filter: /[\\/]SuppliedArtwork\.tsx$/ }, (args) => {
        const original = fs.readFileSync(args.path, "utf8");
        const base = "const base = `/templates/waypoint/${image.key}`;";
        const src = "src={`${base}-1600.webp`}";
        const srcSet =
          "srcSet={`${base}-800.webp 800w, ${base}-1600.webp 1600w`}";
        if (
          ![base, src, srcSet].every((fragment) => original.includes(fragment))
        ) {
          throw new Error(
            "SuppliedArtwork changed; update the export URL adapter before building a download.",
          );
        }
        const contents = original
          .replace(
            base,
            `const embedded: Record<string, string> = ${JSON.stringify(imageData)}; const base = embedded[image.key];`,
          )
          .replace(src, "src={base}")
          .replace(srcSet, "srcSet={undefined}");
        return { contents, loader: "tsx", resolveDir: path.dirname(args.path) };
      });
    },
  };
  fs.mkdirSync(cacheRoot, { recursive: true });
  const common = {
    absWorkingDir: root,
    bundle: true,
    jsx: "automatic" as const,
    plugins: [images],
    define: { "process.env.NODE_ENV": '"production"' },
    logLevel: "warning" as const,
  };
  const browser = await build({
    ...common,
    platform: "browser",
    format: "iife",
    target: ["es2020"],
    minify: true,
    write: false,
    legalComments: "inline",
    stdin: {
      contents: `import { createElement } from "react"; import { hydrateRoot } from "react-dom/client"; import { WaypointApp } from "./src/app/(waypoint)/waypoint/WaypointApp"; hydrateRoot(document.getElementById("waypoint-root"), createElement(WaypointApp));`,
      resolveDir: root,
      sourcefile: "waypoint-standalone-client.ts",
      loader: "ts",
    },
  });
  const renderer = path.join(cacheRoot, "renderer.cjs");
  await build({
    ...common,
    platform: "node",
    format: "cjs",
    outfile: renderer,
    external: ["react", "react-dom/*"],
    stdin: {
      contents: `import { createElement } from "react"; import { renderToString } from "react-dom/server"; import { WaypointApp } from "./src/app/(waypoint)/waypoint/WaypointApp"; export const markup = renderToString(createElement(WaypointApp));`,
      resolveDir: root,
      sourcefile: "waypoint-standalone-render.ts",
      loader: "ts",
    },
  });
  const markup: string = createRequire(import.meta.url)(renderer).markup;
  const javascript = browser.outputFiles[0].text.replace(
    /<\/script/gi,
    "<\\/script",
  );
  const favicon = `data:image/svg+xml;base64,${fs.readFileSync(path.join(root, "src/app/(waypoint)/waypoint/icon.svg")).toString("base64")}`;
  const html = `<!DOCTYPE html>
<!-- Generated from the current Waypoint React components. Rebuild with npm run build && npm run export:waypoint. -->
<html lang="en" class="${htmlClass}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#EDE6DF">
<title>Waypoint — Pitch with intention. Land the offer.</title>
<meta name="description" content="The personal career outreach flight deck for senior engineers and designers. Pitch with intention. Land the offer.">
<link rel="icon" type="image/svg+xml" href="${favicon}">
<style>${css}</style></head>
<body class="${bodyClass}"><div id="waypoint-root">${markup}</div>
<script>${javascript}</script></body></html>
`;
  if (/\/_next\//.test(html) || !/<h1[\s>]/.test(html))
    throw new Error(
      "The standalone download must contain real content and no Next runtime paths.",
    );
  fs.writeFileSync(outputFile, html);
  const meta = TEMPLATE_METADATA.waypoint;
  const files = readTemplateFiles("waypoint");
  files.push({ path: "public/downloads/waypoint.html", source: html });
  fs.writeFileSync(
    path.join(publicRoot, "copy/waypoint.md"),
    formatRepomixBundle(
      "waypoint",
      meta.name,
      files,
      meta.dependencies,
    ).replace(/\r\n/g, "\n"),
  );
  console.log(
    `Exported ${outputFile} (${fs.statSync(outputFile).size.toLocaleString()} bytes); updated the Waypoint copy bundle.`,
  );
}

exportWaypoint().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
