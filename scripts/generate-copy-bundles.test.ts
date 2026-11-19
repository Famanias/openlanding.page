import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { buildTemplateWebflowArtifacts, generateCopyBundles } from "./generate-copy-bundles";

describe("generateCopyBundles", () => {
  it("builds a complete Webflow manifest and prompt for snoot without data: URLs", () => {
    const { manifest, promptMarkdown } = buildTemplateWebflowArtifacts("snoot");
    expect(manifest.slug).toBe("snoot");
    expect(manifest.variables.colors.length).toBeGreaterThanOrEqual(8);
    expect(manifest.sections.length).toBeGreaterThanOrEqual(10);
    expect(JSON.stringify(manifest)).not.toContain("data:font/woff2");
    expect(promptMarkdown).toContain("Snoot Tokens");
    expect(promptMarkdown).toContain("data_variable_tool");
  });

  it("writes <slug>-prompt.md, <slug>-webflow.json, and <slug>-webflow-prompt.md to the target directory", () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "openlanding-copy-test-"));
    try {
      generateCopyBundles(tmpDir, ["snoot", "tolvar"]);
      expect(fs.existsSync(path.join(tmpDir, "snoot-prompt.md"))).toBe(true);
      expect(fs.existsSync(path.join(tmpDir, "snoot-webflow.json"))).toBe(true);
      expect(fs.existsSync(path.join(tmpDir, "snoot-webflow-prompt.md"))).toBe(true);

      const parsed = JSON.parse(fs.readFileSync(path.join(tmpDir, "snoot-webflow.json"), "utf8"));
      expect(parsed.slug).toBe("snoot");
    } finally {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }
  });
});
