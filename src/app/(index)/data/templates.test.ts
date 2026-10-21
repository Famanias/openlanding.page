import { describe, it, expect } from "vitest";
import { TEMPLATES, CATEGORIES } from "./templates";
import fs from "node:fs";
import path from "node:path";

describe("gallery template data", () => {
  it("contains all thirteen templates with required metadata", () => {
    expect(TEMPLATES).toHaveLength(13);
    const slugs = TEMPLATES.map((t) => t.slug);
    expect(slugs).toEqual(["orrery", "keytu", "koji", "trace", "calder", "vector", "morrow", "loophouse", "wowflutter", "verane", "sundial", "noctiluca", "iridia"]);
  });

  it("has valid categories matching CATEGORIES constant", () => {
    const validCategoryIds = CATEGORIES.map((c) => c.id);
    for (const t of TEMPLATES) {
      expect(validCategoryIds).toContain(t.category);
    }
  });

  it("inlines non-empty prompt markdown for instant clipboard copy", () => {
    for (const t of TEMPLATES) {
      expect(t.promptMarkdown).toBeDefined();
      expect(t.promptMarkdown.length).toBeGreaterThan(100);
      expect(t.promptMarkdown).toContain("# ");
    }
  });

  it("references preview images that exist in public folder", () => {
    for (const t of TEMPLATES) {
      const publicPath = path.join(process.cwd(), "public", t.previewImage);
      expect(fs.existsSync(publicPath), `Missing image at ${publicPath}`).toBe(true);
    }
  });

  it("references video clips that exist in public folder when defined", () => {
    const koji = TEMPLATES.find((t) => t.slug === "koji");
    expect(koji?.videoClip).toBeDefined();
    for (const t of TEMPLATES) {
      if (t.videoClip) {
        const publicPath = path.join(process.cwd(), "public", t.videoClip);
        expect(fs.existsSync(publicPath), `Missing video at ${publicPath}`).toBe(true);
      }
    }
  });

  it("defines all expected metadata fields for each template item", () => {
    for (const t of TEMPLATES) {
      expect(t.title).toBeTruthy();
      expect(t.description).toBeTruthy();
      expect(t.industry).toBeTruthy();
      expect(t.stack).toBeTruthy();
      expect(Array.isArray(t.badges)).toBe(true);
      expect(t.badges.length).toBeGreaterThan(0);
      expect(t.model).toBeTruthy();
    }
  });

  it("assigns the exact specified model tag to each template", () => {
    const opusSlugs = ["orrery", "keytu", "koji", "verane", "noctiluca"];
    for (const t of TEMPLATES) {
      if (t.slug === "sundial") {
        expect(t.model).toBe("MiMo v2.6 Flash Free");
      } else if (t.slug === "iridia") {
        expect(t.model).toBe("Gemini 3.8 Flash High");
      } else if (opusSlugs.includes(t.slug)) {
        expect(t.model).toBe("Claude Opus 5.5 High");
      } else if (t.slug === "wowflutter") {
        expect(t.model).toBe("Claude Sonnet 5.5 High");
      } else {
        expect(t.model).toBe("GPT-6 Astra Max");
      }
    }
  });

  it("contains the expected categories including 'all'", () => {
    const categoryIds = CATEGORIES.map((c) => c.id);
    expect(categoryIds).toContain("all");
    expect(categoryIds).toContain("keynote-deck");
    expect(categoryIds).toContain("scroll-showcase");
    expect(categoryIds).toContain("3d-webgpu");
    expect(categoryIds).toContain("editorial-magazine");
  });

  it("files WOWFLUTTER under Editorial Magazine with its rebuild prompt inlined", () => {
    const wowflutter = TEMPLATES.find((t) => t.slug === "wowflutter");
    expect(wowflutter?.category).toBe("editorial-magazine");
    expect(wowflutter?.promptMarkdown).toContain('rebuild "WOWFLUTTER"');
    expect(wowflutter?.promptMarkdown).toContain("#FF3D8B");
  });

  it("files Maison Vérane under Scroll Showcase with its rebuild prompt inlined", () => {
    const verane = TEMPLATES.find((t) => t.slug === "verane");
    expect(verane?.category).toBe("scroll-showcase");
    expect(verane?.promptMarkdown).toContain('rebuild "MAISON VÉRANE"');
    expect(verane?.promptMarkdown).toContain("#2A1E22");
  });

  it("files SUNDIAL under Scroll Showcase with its rebuild prompt inlined", () => {
    const sundial = TEMPLATES.find((t) => t.slug === "sundial");
    expect(sundial?.category).toBe("scroll-showcase");
    expect(sundial?.promptMarkdown).toContain('rebuild "SUNDIAL Coffee Roasters"');
    expect(sundial?.promptMarkdown).toContain("#FF6B1A");
  });

  it("files Noctiluca under 3D & WebGPU with its rebuild prompt inlined", () => {
    const noctiluca = TEMPLATES.find((t) => t.slug === "noctiluca");
    expect(noctiluca?.category).toBe("3d-webgpu");
    expect(noctiluca?.promptMarkdown).toContain('rebuild "Noctiluca"');
    expect(noctiluca?.promptMarkdown).toContain("#C9B8FF");
  });

  it("files IRIDIA under 3D & WebGPU with its rebuild prompt inlined", () => {
    const iridia = TEMPLATES.find((t) => t.slug === "iridia");
    expect(iridia?.category).toBe("3d-webgpu");
    expect(iridia?.promptMarkdown).toContain('rebuild "IRIDIA"');
    expect(iridia?.promptMarkdown).toContain("#00F0FF");
  });
});
