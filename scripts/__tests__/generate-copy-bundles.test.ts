import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it, expect } from "vitest";
import {
  formatRepomixBundle,
  generateCopyBundles,
  resolveDependencyVersions,
} from "../generate-copy-bundles";

describe("generate-copy-bundles", () => {
  it("formats source files into Repomix XML container format with dependencies and instructions", () => {
    const files = [
      { path: "src/app/(orrery)/orrery/page.tsx", source: "export default function Page() { return <div>Orrery</div>; }" }
    ];
    const bundle = formatRepomixBundle("orrery", "Orrery", files, ["gsap", "motion"]);
    expect(bundle).toContain('<template slug="orrery" name="Orrery">');
    expect(bundle).toContain("<dependencies>");
    expect(bundle).toContain('"gsap"');
    expect(bundle).toContain('<file path="src/app/(orrery)/orrery/page.tsx">');
    expect(bundle).toContain("<![CDATA[");
    expect(bundle).toContain("export default function Page()");
    expect(bundle).toContain("</template>");
  });

  it("safely escapes CDATA closing sequence in source code", () => {
    const files = [{ path: "test.ts", source: "const x = ']]>';" }];
    const bundle = formatRepomixBundle("test", "Test", files, []);
    expect(bundle).not.toContain("<![CDATA[const x = ']]>';]]>");
    expect(bundle).toContain("]]]]><![CDATA[>");
  });

  it("resolves dependency versions from package.json with fallback", () => {
    const resolved = resolveDependencyVersions(["gsap", "non-existent-pkg-xyz"]);
    expect(resolved.gsap).toMatch(/^\^3\./);
    expect(resolved["non-existent-pkg-xyz"]).toBe("*");
  });

  it("generates copy bundles and prompt files for all templates in a directory", () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "copy-bundles-test-"));
    try {
      generateCopyBundles(tempDir);

      for (const slug of ["orrery", "keytu", "koji"]) {
        const bundlePath = path.join(tempDir, `${slug}.md`);
        const promptPath = path.join(tempDir, `${slug}-prompt.md`);

        expect(fs.existsSync(bundlePath)).toBe(true);
        expect(fs.existsSync(promptPath)).toBe(true);

        const bundleContent = fs.readFileSync(bundlePath, "utf8");
        const promptContent = fs.readFileSync(promptPath, "utf8");

        expect(bundleContent).toContain(`<template slug="${slug}"`);
        expect(bundleContent).toContain("</template>");
        expect(bundleContent).toContain("<files>");
        expect(bundleContent.length).toBeGreaterThan(500);

        expect(promptContent).toContain("# Prompt:");
        expect(promptContent.length).toBeGreaterThan(100);
      }

      // Verify specific accurate dependencies per template
      const orreryBundle = fs.readFileSync(path.join(tempDir, "orrery.md"), "utf8");
      expect(orreryBundle).toContain('"gsap"');
      expect(orreryBundle).toContain('"motion"');
      expect(orreryBundle).toContain('"@phosphor-icons/react"');

      const keytuBundle = fs.readFileSync(path.join(tempDir, "keytu.md"), "utf8");
      expect(keytuBundle).toContain('"gsap"');
      expect(keytuBundle).toContain('"lenis"');
      expect(keytuBundle).toContain('"motion"');
      expect(keytuBundle).toContain('"@phosphor-icons/react"');

      const kojiBundle = fs.readFileSync(path.join(tempDir, "koji.md"), "utf8");
      expect(kojiBundle).toContain('"three"');
      expect(kojiBundle).not.toContain('"motion"');
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }, 15000);
});
