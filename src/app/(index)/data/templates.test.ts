import { describe, it, expect } from "vitest";
import { TEMPLATES, ARCHIVED_TEMPLATES, CATEGORIES } from "./templates";
import fs from "node:fs";
import path from "node:path";

describe("gallery template data", () => {
  it("has real ISO creation dates for active and archived templates", () => {
    for (const template of [...TEMPLATES, ...ARCHIVED_TEMPLATES]) {
      expect(template.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(new Date(`${template.createdAt}T00:00:00Z`).toISOString().slice(0, 10)).toBe(template.createdAt);
    }
    for (let i = 1; i < TEMPLATES.length; i++) {
      const previous = TEMPLATES[i - 1], current = TEMPLATES[i];
      expect(previous.createdAt >= current.createdAt).toBe(true);
      if (previous.createdAt === current.createdAt) expect(previous.registrationOrder).toBeGreaterThan(current.registrationOrder);
    }
  });
  it("contains all templates with required metadata", () => {
    expect(TEMPLATES).toHaveLength(46);
    const slugs = TEMPLATES.map((t) => t.slug);
    expect(slugs).toEqual(["cyberpunk","xibalba","perigee","loam","lowtide","firstday","assemblage","cullet","nightline","understudy","flori","amaoto","nulo","serein","pipkin","valence","chinagraph","fixture","aftercart","tally","satoyama","mio","hiyas","rill","alpine-reel","kazeko","nomi","truecut","handoff","openhouse","volume-zero","kinetic","satsuma","aubade","bathys","iridia","noctiluca","verane","wowflutter","loophouse","vector","calder","trace","keytu","koji","orrery"]);
  });

  it("archives the specified templates and hides them from the gallery", () => {
    expect(ARCHIVED_TEMPLATES).toHaveLength(0);
    const archivedSlugs = ARCHIVED_TEMPLATES.map((t) => t.slug);
    expect(archivedSlugs).toEqual([]);
    for (const slug of archivedSlugs) {
      expect(TEMPLATES.map((t) => t.slug)).not.toContain(slug);
    }
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
    const opusSlugs = ["lowtide", "orrery", "keytu", "koji", "verane", "noctiluca", "kinetic", "fixture", "chinagraph", "understudy", "cullet"];
    for (const t of [...TEMPLATES, ...ARCHIVED_TEMPLATES]) {
      if (t.slug === "firstday") {
        expect(t.model).toBe("GPT-6 Astra Max");
      } else if (t.slug === "amaoto" || t.slug === "flori" || t.slug === "kazeko" || t.slug === "satoyama" || t.slug === "mio") {
        expect(t.model).toBe("GPT-6.1 Sol High");
      } else if (t.slug === "iridia" || t.slug === "bathys" || t.slug === "loophouse" || t.slug === "xibalba" || t.slug === "cyberpunk") {
        expect(t.model).toBe("Gemini 3.8 Flash High");
      } else if (t.slug === "loam" || t.slug === "tally" || t.slug === "perigee") {
        expect(t.model).toBe("Gemini 4 Argon High");
      } else if (t.slug === "aubade") {
        expect(t.model).toBe("Claude Opus 5.5 Medium");
      } else if (t.slug === "satsuma" || t.slug === "calder" || t.slug === "nomi" || t.slug === "pipkin") {
        expect(t.model).toBe("Claude Sonnet 5.5 High");
      } else if (opusSlugs.includes(t.slug)) {
        expect(t.model).toBe("Claude Opus 5.5 High");
      } else if (t.slug === "wowflutter") {
        expect(t.model).toBe("Claude Sonnet 5.5 High");
      } else if (t.slug === "valence") {
        expect(t.model).toBe("Gemini 4 Argon High");
      } else if (t.slug === "alpine-reel") {
        expect(t.model).toBe("GPT-6 Astra Max");
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
    expect(categoryIds).toContain("conversion");
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

  it("files BATHYS under Scroll Showcase with its rebuild prompt inlined", () => {
    const bathys = TEMPLATES.find((t) => t.slug === "bathys");
    expect(bathys?.category).toBe("scroll-showcase");
    expect(bathys?.promptMarkdown).toContain('rebuild "BATHYS"');
    expect(bathys?.promptMarkdown).toContain("#00E5FF");
  });

  it("files AUBADE under Scroll Showcase with its rebuild prompt inlined", () => {
    const aubade = TEMPLATES.find((t) => t.slug === "aubade");
    expect(aubade?.category).toBe("scroll-showcase");
    expect(aubade?.promptMarkdown).toContain('rebuild "AUBADE"');
    expect(aubade?.promptMarkdown).toContain("#8E1F3A");
  });

  it("files Satsuma under Scroll Showcase with its rebuild prompt inlined", () => {
    const satsuma = TEMPLATES.find((t) => t.slug === "satsuma");
    expect(satsuma?.category).toBe("scroll-showcase");
    expect(satsuma?.promptMarkdown).toContain('rebuild "Satsuma"');
    expect(satsuma?.promptMarkdown).toContain("#FF7A2F");
  });

  it("files CALDER & ROWE under Scroll Showcase with its rebuild prompt inlined", () => {
    const calder = TEMPLATES.find((t) => t.slug === "calder");
    expect(calder?.category).toBe("scroll-showcase");
    expect(calder?.promptMarkdown).toContain('rebuild "CALDER & ROWE"');
    expect(calder?.promptMarkdown).toContain("#C9A55A");
  });

  it("files KINETIC under Scroll Showcase with its rebuild prompt inlined", () => {
    const kinetic = TEMPLATES.find((t) => t.slug === "kinetic");
    expect(kinetic?.category).toBe("scroll-showcase");
    expect(kinetic?.promptMarkdown).toContain('rebuild "KINETIC"');
    expect(kinetic?.promptMarkdown).toContain("#FF6B2B");
  });

  it("files RILL under Scroll Showcase with its rebuild prompt inlined", () => {
    const rill = TEMPLATES.find((t) => t.slug === "rill");
    expect(rill?.category).toBe("scroll-showcase");
    expect(rill?.promptMarkdown).toContain('rebuild "RILL"');
    expect(rill?.promptMarkdown).toContain("#14231E");
  });

  it("files HIYAS under Scroll Showcase with its rebuild prompt inlined", () => {
    const hiyas = TEMPLATES.find((t) => t.slug === "hiyas");
    expect(hiyas?.category).toBe("scroll-showcase");
    expect(hiyas?.promptMarkdown).toContain('rebuild "HIYAS"');
    expect(hiyas?.promptMarkdown).toContain("#0B2A4A");
  });

  it("files SEREIN under Editorial Magazine with its fold-out prompt inlined", () => {
    const serein = TEMPLATES.find((t) => t.slug === "serein");
    expect(serein?.category).toBe("editorial-magazine");
    expect(serein?.promptMarkdown).toContain('rebuild "SEREIN Bureau"');
    expect(serein?.promptMarkdown).toContain("#A8D6CC");
  });

  it("files PERIGEE under 3D & WebGPU with its rebuild prompt inlined", () => {
    const perigee = TEMPLATES.find((t) => t.slug === "perigee");
    expect(perigee?.category).toBe("3d-webgpu");
    expect(perigee?.promptMarkdown).toContain('rebuild "PERIGEE"');
    expect(perigee?.promptMarkdown).toContain("#FFB36B");
  });

  it("files LOAM under 3D & WebGPU with its rebuild prompt inlined", () => {
    const loam = TEMPLATES.find((t) => t.slug === "loam");
    expect(loam?.category).toBe("3d-webgpu");
    expect(loam?.promptMarkdown).toContain('rebuild "LOAM"');
    expect(loam?.promptMarkdown).toContain("#C8E64C");
  });
});
