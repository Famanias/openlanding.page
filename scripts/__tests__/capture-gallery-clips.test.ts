import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { parseCliArgs, syncTemplatesConfig } from "../capture-gallery-clips";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

describe("capture-gallery-clips CLI & Sync", () => {
  const validSlugs = ["flori", "nulo", "aftercart", "serein", "kazeko"];

  describe("parseCliArgs", () => {
    it("parses single slug", () => {
      const res = parseCliArgs(["flori"], validSlugs);
      expect(res.requestedSlugs).toEqual(["flori"]);
      expect(res.unknownSlugs).toEqual([]);
      expect(res.isAll).toBe(false);
      expect(res.origin.origin).toBe("http://localhost:3000");
    });

    it("parses multiple slugs separated by commas and spaces as in shell arguments", () => {
      // e.g. bun run preview flori, nulo, aftercart
      const res = parseCliArgs(["flori,", "nulo,", "aftercart"], validSlugs);
      expect(res.requestedSlugs).toEqual(["flori", "nulo", "aftercart"]);
      expect(res.unknownSlugs).toEqual([]);
    });

    it("parses a single comma-separated string argument", () => {
      // e.g. bun run preview "flori, nulo, aftercart"
      const res = parseCliArgs(["flori, nulo, aftercart"], validSlugs);
      expect(res.requestedSlugs).toEqual(["flori", "nulo", "aftercart"]);
    });

    it("parses space-separated arguments without commas", () => {
      // e.g. bun run preview flori nulo aftercart
      const res = parseCliArgs(["flori", "nulo", "aftercart"], validSlugs);
      expect(res.requestedSlugs).toEqual(["flori", "nulo", "aftercart"]);
    });

    it("normalizes case and trims whitespace", () => {
      const res = parseCliArgs(["  FLORI, ", " NuLo "], validSlugs);
      expect(res.requestedSlugs).toEqual(["flori", "nulo"]);
    });

    it("identifies unknown slugs", () => {
      const res = parseCliArgs(["flori", "nonexistent-template"], validSlugs);
      expect(res.requestedSlugs).toEqual(["flori"]);
      expect(res.unknownSlugs).toEqual(["nonexistent-template"]);
    });

    it("handles custom origin flag", () => {
      const res = parseCliArgs(["--origin", "http://127.0.0.1:4000", "flori"], validSlugs);
      expect(res.origin.origin).toBe("http://127.0.0.1:4000");
      expect(res.requestedSlugs).toEqual(["flori"]);
    });

    it("handles 'all' keyword", () => {
      const res = parseCliArgs(["all"], validSlugs);
      expect(res.isAll).toBe(true);
      expect(res.requestedSlugs).toEqual(validSlugs);
    });
  });

  describe("syncTemplatesConfig", () => {
    let tmpDir: string;
    let mockTemplatesFile: string;
    let mockClipsDir: string;

    beforeEach(() => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "preview-test-"));
      mockTemplatesFile = path.join(tmpDir, "templates.ts");
      mockClipsDir = path.join(tmpDir, "clips");
      fs.mkdirSync(mockClipsDir, { recursive: true });
    });

    afterEach(() => {
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch {}
    });

    it("updates videoClip exclusion when some clips exist and some are missing", () => {
      const initialContent = [
        'const RAW_TEMPLATES = [',
        '  { slug: "flori" },',
        '  { slug: "nulo" },',
        '  { slug: "aftercart" },',
        '];',
        'export const TEMPLATES = RAW_TEMPLATES.map((template) => ({',
        '  ...template,',
        '  videoClip: template.videoClip ?? (template.slug === "aftercart" || template.slug === "nulo" || template.slug === "flori" ? undefined : `/gallery/clips/${template.slug}.mp4`),',
        '}));',
      ].join("\n");
      fs.writeFileSync(mockTemplatesFile, initialContent, "utf8");

      // Simulate flori.mp4 having been recorded
      fs.writeFileSync(path.join(mockClipsDir, "flori.mp4"), "fake video data");

      const result = syncTemplatesConfig(mockTemplatesFile, mockClipsDir);
      expect(result.activeSlugs).toContain("flori");
      expect(result.missingSlugs).toEqual(["nulo", "aftercart"]);

      const updated = fs.readFileSync(mockTemplatesFile, "utf8");
      // flori should no longer be excluded!
      expect(updated).toContain(`template.slug === "nulo" || template.slug === "aftercart" ? undefined`);
      expect(updated).not.toContain(`template.slug === "flori" ? undefined`);
    });

    it("simplifies to direct path when all clips exist", () => {
      const initialContent = [
        'const RAW_TEMPLATES = [',
        '  { slug: "flori" },',
        '  { slug: "nulo" },',
        '];',
        'export const TEMPLATES = RAW_TEMPLATES.map((template) => ({',
        '  ...template,',
        '  videoClip: template.videoClip ?? (template.slug === "flori" || template.slug === "nulo" ? undefined : `/gallery/clips/${template.slug}.mp4`),',
        '}));',
      ].join("\n");
      fs.writeFileSync(mockTemplatesFile, initialContent, "utf8");

      // Both clips exist
      fs.writeFileSync(path.join(mockClipsDir, "flori.mp4"), "video1");
      fs.writeFileSync(path.join(mockClipsDir, "nulo.mp4"), "video2");

      const result = syncTemplatesConfig(mockTemplatesFile, mockClipsDir);
      expect(result.activeSlugs).toEqual(["flori", "nulo"]);
      expect(result.missingSlugs).toEqual([]);

      const updated = fs.readFileSync(mockTemplatesFile, "utf8");
      expect(updated).toContain("videoClip: template.videoClip ?? `/gallery/clips/${template.slug}.mp4`,");
      expect(updated).not.toContain("undefined");
    });
  });
});
