import { describe, it, expect } from "vitest";
import { TEMPLATES, CATEGORIES } from "./templates";
import fs from "node:fs";
import path from "node:path";

describe("gallery template data", () => {
  it("contains all three seed templates with required metadata", () => {
    expect(TEMPLATES).toHaveLength(3);
    const slugs = TEMPLATES.map((t) => t.slug);
    expect(slugs).toEqual(["orrery", "cairn", "koji"]);
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
    }
  });

  it("contains the expected categories including 'all'", () => {
    const categoryIds = CATEGORIES.map((c) => c.id);
    expect(categoryIds).toContain("all");
    expect(categoryIds).toContain("keynote-deck");
    expect(categoryIds).toContain("scroll-showcase");
    expect(categoryIds).toContain("3d-webgpu");
  });
});
