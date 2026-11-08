import { it, expect } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { spawnSync } from "node:child_process";
import { exportTemplate } from "./export";

it("validates direct exporter input before reading a build or writing output", async () => {
  await expect(exportTemplate("../outside", "unused-output")).rejects.toThrow(/invalid.*slug/i);
  await expect(exportTemplate("unregistered-export-fixture", "unused-output")).rejects.toThrow(/unknown template/i);
});

it.each(["page.tsx", "page.ts", "page.jsx", "page.js"])("the real CLI exports future %s without an asset directory or exporter edits", pageFile => {
  const repo = process.cwd();
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "future-template-export-"));
  try {
    fs.symlinkSync(path.join(repo, "scripts"), path.join(root, "scripts"), "junction");
    fs.symlinkSync(path.join(repo, "node_modules"), path.join(root, "node_modules"), "junction");
    fs.mkdirSync(path.join(root, "src/app/(future-widget)/future-widget"), { recursive: true });
    const source = pageFile === "page.ts" ? 'import {createElement as h} from "react";export default function Page(){return h("main",null,h("h1",null,"Future widget"),h("button",null,"Explore"))}' : 'export default function Page(){return <main><h1>Future widget</h1><button>Explore</button></main>}';
    fs.writeFileSync(path.join(root, "src/app/(future-widget)/future-widget", pageFile), source);
    // Layout/OG references belong to the built document, not the hydrated page's media.
    fs.writeFileSync(path.join(root, "src/app/(future-widget)/layout.js"), 'export const metadata={openGraph:{images:["/templates/future-widget/metadata-only.png"]}};');
    fs.mkdirSync(path.join(root, ".next/server/app"), { recursive: true });
    fs.mkdirSync(path.join(root, ".next/static/css"), { recursive: true });
    fs.writeFileSync(path.join(root, ".next/static/css/page.css"), "body{margin:0}");
    fs.writeFileSync(path.join(root, ".next/server/app/future-widget.html"), '<html lang="en"><head><title>Future</title><link rel="stylesheet" href="/_next/static/css/page.css"/></head><body></body></html>');
    const cli = path.join(repo, "scripts/export-templates.ts");
    const code = `const {RAW_TEMPLATES}=await import(${JSON.stringify(pathToFileURL(path.join(repo, "src/app/(index)/data/templates.ts")).href)});RAW_TEMPLATES.push({slug:"future-widget",categories:[]});process.argv=[process.execPath,${JSON.stringify(cli)},"future-widget","--output","output"];await import(${JSON.stringify(pathToFileURL(cli).href)});`;
    const result = spawnSync(process.execPath, ["--import", "tsx", "--input-type=module", "-e", code], { cwd: root, encoding: "utf8", timeout: 30000 });
    expect(result.error).toBeUndefined();
    expect(result.status, result.stderr).toBe(0);
    const html = fs.readFileSync(path.join(root, "output/future-widget.html"), "utf8");
    expect(html).toContain("<h1>Future widget</h1>");
    expect(html).toContain('id="standalone-root"');
    expect(html).not.toContain("/_next/");
  } finally { fs.rmSync(root, { recursive: true, force: true }); }
}, 30000);
