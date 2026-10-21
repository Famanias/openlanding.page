import { describe, it, expect } from "vitest";
import { TEMPLATES, CATEGORIES } from "./templates";
import fs from "node:fs";
import path from "node:path";

describe("gallery template data", () => {
  it("contains all nine templates with required metadata", () => {
    expect(TEMPLATES).toHaveLength(9);
    const slugs = TEMPLATES.map((t) => t.slug);
    expect(slugs).toEqual(["orrery", "keytu", "koji", "trace", "calder", "vector", "morrow", "loophouse", "wowflutter"]);
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
    const opusSlugs = ["orrery", "keytu", "koji"];
    for (const t of TEMPLATES) {
      if (opusSlugs.includes(t.slug)) {
        expect(t.model).toBe("Claude Opus 5.5 High");
      } else if (t.slug === "wowflutter") {
        expect(t.model).toBe("Claude Sonnet 5.5");
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
});
