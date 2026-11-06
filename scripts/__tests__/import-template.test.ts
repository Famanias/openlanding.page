import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { updateGalleryRegistrations, type ParsedMeta } from "../import-aistudio-template";

describe("import-template gallery registration", () => {
  const sampleMeta: ParsedMeta = {
    title: "Test Brand — Next Gen Studio",
    description: "A state of the art showcase experience.",
    brandName: "Test Brand",
    htmlClasses: "",
    bodyClasses: "bg-black text-white",
    fonts: [],
    palette: ["#000000", "#FFFFFF", "#FF0000"],
  };

  it("registers new template when RAW_TEMPLATES ends with RAW_TEMPLATES.push(...)", () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "import-test-push-"));

    try {
      // Mock templates.config.ts
      const scriptsDir = path.join(tempDir, "scripts");
      fs.mkdirSync(scriptsDir, { recursive: true });
      fs.writeFileSync(
        path.join(scriptsDir, "templates.config.ts"),
        `export type TemplateSlug = "alpha" | "beta";\nconst PALETTES: Record<TemplateSlug, any> = {\n  alpha: { palette: ["#000"] },\n};\n`
      );

      // Mock generate-copy-bundles.ts
      fs.writeFileSync(
        path.join(scriptsDir, "generate-copy-bundles.ts"),
        `const COPY_METADATA: Record<string, any> = {\n  alpha: { name: "Alpha", dependencies: [] },\n};\n`
      );

      // Mock src/app/(index)/data/templates.ts with RAW_TEMPLATES.push(...)
      const dataDir = path.join(tempDir, "src", "app", "(index)", "data");
      fs.mkdirSync(dataDir, { recursive: true });
      fs.writeFileSync(
        path.join(dataDir, "templates.ts"),
        `export type TemplateSlug = "alpha" | "beta";\n\nexport const RAW_TEMPLATES: any[] = [\n  { slug: "alpha" }\n];\n\nRAW_TEMPLATES.push(\n  { slug: "beta" }\n);\n\nconst registeredTemplates: any[] = RAW_TEMPLATES;\n`
      );

      // Mock tests/e2e/templates.ts
      const e2eDir = path.join(tempDir, "tests", "e2e");
      fs.mkdirSync(e2eDir, { recursive: true });
      fs.writeFileSync(
        path.join(e2eDir, "templates.ts"),
        `export const TEMPLATE_PATHS: string[] = ["/alpha", "/beta"];\n`
      );

      updateGalleryRegistrations(sampleMeta, "gamma", "showcase", tempDir);

      const updatedTemplatesTs = fs.readFileSync(path.join(dataDir, "templates.ts"), "utf-8");
      expect(updatedTemplatesTs).toContain('export type TemplateSlug = "alpha" | "beta" | "gamma";');
      expect(updatedTemplatesTs).toContain('export const GAMMA_PROMPT =');
      expect(updatedTemplatesTs).toContain('slug: "gamma",');

      const updatedConfig = fs.readFileSync(path.join(scriptsDir, "templates.config.ts"), "utf-8");
      expect(updatedConfig).toContain('export type TemplateSlug = "alpha" | "beta" | "gamma";');
      expect(updatedConfig).toContain('gamma: {');

      const updatedE2e = fs.readFileSync(path.join(e2eDir, "templates.ts"), "utf-8");
      expect(updatedE2e).toContain('"/gamma"');
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it("registers new template when RAW_TEMPLATES ends with array literal", () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "import-test-array-"));

    try {
      // Mock templates.config.ts
      const scriptsDir = path.join(tempDir, "scripts");
      fs.mkdirSync(scriptsDir, { recursive: true });
      fs.writeFileSync(
        path.join(scriptsDir, "templates.config.ts"),
        `export type TemplateSlug = "alpha";\nconst PALETTES: Record<TemplateSlug, any> = {\n  alpha: { palette: ["#000"] },\n};\n`
      );

      // Mock generate-copy-bundles.ts
      fs.writeFileSync(
        path.join(scriptsDir, "generate-copy-bundles.ts"),
        `const COPY_METADATA: Record<string, any> = {\n  alpha: { name: "Alpha", dependencies: [] },\n};\n`
      );

      // Mock src/app/(index)/data/templates.ts with standard array literal
      const dataDir = path.join(tempDir, "src", "app", "(index)", "data");
      fs.mkdirSync(dataDir, { recursive: true });
      fs.writeFileSync(
        path.join(dataDir, "templates.ts"),
        `export type TemplateSlug = "alpha";\n\nexport const RAW_TEMPLATES: any[] = [\n  { slug: "alpha" }\n];\n\nconst registeredTemplates: any[] = RAW_TEMPLATES;\n`
      );

      // Mock tests/e2e/templates.ts
      const e2eDir = path.join(tempDir, "tests", "e2e");
      fs.mkdirSync(e2eDir, { recursive: true });
      fs.writeFileSync(
        path.join(e2eDir, "templates.ts"),
        `export const TEMPLATE_PATHS: string[] = ["/alpha"];\n`
      );

      updateGalleryRegistrations(sampleMeta, "beta", "showcase", tempDir);

      const updatedTemplatesTs = fs.readFileSync(path.join(dataDir, "templates.ts"), "utf-8");
      expect(updatedTemplatesTs).toContain('export type TemplateSlug = "alpha" | "beta";');
      expect(updatedTemplatesTs).toContain('export const BETA_PROMPT =');
      expect(updatedTemplatesTs).toContain('slug: "beta",');
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });
});
