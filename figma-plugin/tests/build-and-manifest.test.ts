import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const pluginRoot = path.resolve(import.meta.dirname, "..");

describe("plugin manifest and build output", () => {
  it("builds self-contained dist/code.js and dist/ui.html matching manifest.json", () => {
    execFileSync("node", ["build.mjs"], { cwd: pluginRoot, stdio: "pipe" });

    const manifest = JSON.parse(fs.readFileSync(path.join(pluginRoot, "manifest.json"), "utf8"));
    expect(manifest.api).toBe("1.0.0");
    expect(manifest.editorType).toEqual(["figma"]);
    expect(manifest.documentAccess).toBe("dynamic-page");
    expect(manifest.networkAccess.allowedDomains).toEqual(["*"]);
    expect(typeof manifest.networkAccess.reasoning).toBe("string");

    const codeJs = fs.readFileSync(path.join(pluginRoot, manifest.main), "utf8");
    const uiHtml = fs.readFileSync(path.join(pluginRoot, manifest.ui), "utf8");
    expect(codeJs.length).toBeGreaterThan(50);
    expect(uiHtml).toContain("<script>");
    expect(uiHtml).not.toMatch(/<script\b[^>]*\bsrc=/i);
  });
});
