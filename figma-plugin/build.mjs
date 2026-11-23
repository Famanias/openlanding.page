import fs from "node:fs";
import path from "node:path";
import * as esbuild from "esbuild";

const pluginRoot = import.meta.dirname;
const distDir = path.join(pluginRoot, "dist");

async function buildAll() {
  fs.mkdirSync(distDir, { recursive: true });

  const bridgeResult = await esbuild.build({
    entryPoints: [path.join(pluginRoot, "src/ui/bridge-script.ts")],
    bundle: true,
    format: "iife",
    target: "es2020",
    write: false,
  });
  const bridgeCode = bridgeResult.outputFiles[0].text;

  const uiResult = await esbuild.build({
    entryPoints: [path.join(pluginRoot, "src/ui/main.ts")],
    bundle: true,
    format: "iife",
    target: "es2020",
    define: { __BRIDGE_SCRIPT__: JSON.stringify(bridgeCode) },
    write: false,
  });
  // Escape closing script tags so bundled strings cannot prematurely end the inline <script>.
  const uiCode = uiResult.outputFiles[0].text.replace(/<\/script/gi, "<\\/script");

  const template = fs.readFileSync(path.join(pluginRoot, "src/ui/ui.html"), "utf8");
  const bodyCloseIndex = template.lastIndexOf("</body>");
  if (bodyCloseIndex === -1) {
    throw new Error("src/ui/ui.html must contain a closing </body> tag");
  }
  const uiHtml =
    template.slice(0, bodyCloseIndex) +
    `<script>\n${uiCode}\n</script>\n` +
    template.slice(bodyCloseIndex);
  fs.writeFileSync(path.join(distDir, "ui.html"), uiHtml, "utf8");

  await esbuild.build({
    entryPoints: [path.join(pluginRoot, "src/plugin/code.ts")],
    bundle: true,
    format: "iife",
    target: "es2017",
    outfile: path.join(distDir, "code.js"),
  });
}

await buildAll();

if (process.argv.includes("--watch")) {
  let timer = null;
  fs.watch(path.join(pluginRoot, "src"), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      buildAll().catch((err) => console.error("[figma-plugin] build failed:", err));
    }, 50);
  });
  console.log("[figma-plugin] watching src/ for changes...");
}
