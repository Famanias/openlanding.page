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
    expect(TEMPLATES).toHaveLength(69);
    const slugs = TEMPLATES.map((t) => t.slug);
    expect(slugs).toEqual(["savepoint", "penumbra", "zeno", "starriot","nexus","razorline","poppypatch","nicopark","inesvale","riff","halodesk","arcandsignal","stillwater","mercer","landingx","avel","pello","ctrlroom","noiseclub","parallel","warpwander","lumen","morta","synapxe","xibalba","perigee","loam","lowtide","firstday","assemblage","cullet","nightline","understudy","flori","amaoto","nulo","serein","pipkin","valence","chinagraph","fixture","aftercart","tally","satoyama","mio","hiyas","rill","alpine-reel","kazeko","nomi","truecut","handoff","openhouse","volume-zero","kinetic","satsuma","aubade","bathys","iridia","noctiluca","verane","wowflutter","loophouse","vector","calder","trace","keytu","koji","orrery"]);
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

  it("has a static gallery screenshot for every template", () => {
    for (const template of TEMPLATES) {
      expect(fs.existsSync(path.join(process.cwd(), "public", "gallery", `${template.slug}.webp`)), template.slug).toBe(true);
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

  it("registers Stillwater with its standalone download and matching rebuild prompt", () => {
    const stillwater = TEMPLATES.find((template) => template.slug === "stillwater");
    expect(stillwater?.hasDownload).toBe(true);
    expect(stillwater?.category).toBe("showcase");
    expect(stillwater?.promptMarkdown.trim()).toBe(
      fs.readFileSync(path.join(process.cwd(), "src/app/(stillwater)/stillwater/PROMPT.md"), "utf8").replace(/\r\n/g, "\n").trim(),
    );
  });

  it("exports the complete SAVEPOINT rebuild prompt in the gallery", () => {
    const savepoint = TEMPLATES.find((template) => template.slug === "savepoint");
    expect(savepoint?.promptMarkdown.trim()).toBe(
      fs.readFileSync(path.join(process.cwd(), "src/app/(savepoint)/savepoint/PROMPT.md"), "utf8").replace(/\r\n/g, "\n").trim(),
    );
  });

  it("assigns the exact specified model tag to each template", () => {
    const opusSlugs = ["lowtide", "orrery", "keytu", "koji", "verane", "noctiluca", "kinetic", "fixture", "chinagraph", "understudy", "cullet"];
    const argonSlugs = ["penumbra", "zeno", "loam", "tally", "perigee", "valence", "ctrlroom", "noiseclub", "parallel", "warpwander", "lumen", "morta", "synapxe", "xibalba", "halodesk", "riff", "inesvale", "nicopark", "poppypatch", "razorline", "nexus", "starriot"];
    for (const t of [...TEMPLATES, ...ARCHIVED_TEMPLATES]) {
      if (t.slug === "savepoint") {
        expect(t.model).toBe("GPT-6.1");
      } else if (t.slug === "pello" || t.slug === "avel" || t.slug === "landingx") {
        expect(t.model).toBe("GPT-6.1 Terra Max");
      } else if (t.slug === "mercer") {
        expect(t.model).toBe("GPT-6.1 Sol Max");
      } else if (t.slug === "arcandsignal" || t.slug === "stillwater") {
        expect(t.model).toBe("GPT-6");
      } else if (argonSlugs.includes(t.slug)) {
        expect(t.model).toBe("Gemini 4 Argon High");
      } else if (t.slug === "firstday") {
        expect(t.model).toBe("GPT-6 Astra Max");
      } else if (t.slug === "amaoto" || t.slug === "flori" || t.slug === "kazeko" || t.slug === "satoyama" || t.slug === "mio") {
        expect(t.model).toBe("GPT-6.1 Sol High");
      } else if (t.slug === "iridia" || t.slug === "bathys" || t.slug === "loophouse") {
        expect(t.model).toBe("Gemini 3.8 Flash High");
      } else if (t.slug === "aubade") {
        expect(t.model).toBe("Claude Opus 5.5 Medium");
      } else if (t.slug === "satsuma" || t.slug === "calder" || t.slug === "nomi" || t.slug === "pipkin") {
        expect(t.model).toBe("Claude Sonnet 5.5 High");
      } else if (opusSlugs.includes(t.slug)) {
        expect(t.model).toBe("Claude Opus 5.5 High");
      } else if (t.slug === "wowflutter") {
        expect(t.model).toBe("Claude Sonnet 5.5 High");
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
    expect(categoryIds).toContain("showcase");
    expect(categoryIds).toContain("3d");
    expect(categoryIds).toContain("editorial");
    expect(categoryIds).toContain("commerce");
    expect(categoryIds).toContain("deck");
    expect(categoryIds).toContain("ai");
    expect(categoryIds).toContain("saas");
    expect(categoryIds).toContain("app");
    expect(categoryIds).toContain("marketing");
    expect(categoryIds).toContain("portfolio");
    expect(categoryIds).toContain("gradient");
    expect(categoryIds).toContain("glass");
    expect(categoryIds).toContain("minimal");
    expect(categoryIds).toContain("brutalist");
    expect(categoryIds).toContain("studio");
  });

  it("files WOWFLUTTER under Editorial with its rebuild prompt inlined", () => {
    const wowflutter = TEMPLATES.find((t) => t.slug === "wowflutter");
    expect(wowflutter?.category).toBe("editorial");
    expect(wowflutter?.promptMarkdown).toContain('rebuild "WOWFLUTTER"');
    expect(wowflutter?.promptMarkdown).toContain("#FF3D8B");
  });

  it("files Maison Vérane under Showcase with its rebuild prompt inlined", () => {
    const verane = TEMPLATES.find((t) => t.slug === "verane");
    expect(verane?.category).toBe("showcase");
    expect(verane?.promptMarkdown).toContain('rebuild "MAISON VÉRANE"');
    expect(verane?.promptMarkdown).toContain("#2A1E22");
  });

  it("files Noctiluca under 3D with its rebuild prompt inlined", () => {
    const noctiluca = TEMPLATES.find((t) => t.slug === "noctiluca");
    expect(noctiluca?.category).toBe("3d");
    expect(noctiluca?.promptMarkdown).toContain('rebuild "Noctiluca"');
    expect(noctiluca?.promptMarkdown).toContain("#C9B8FF");
  });

  it("files IRIDIA under 3D with its rebuild prompt inlined", () => {
    const iridia = TEMPLATES.find((t) => t.slug === "iridia");
    expect(iridia?.category).toBe("3d");
    expect(iridia?.promptMarkdown).toContain('rebuild "IRIDIA"');
    expect(iridia?.promptMarkdown).toContain("#00F0FF");
  });

  it("files BATHYS under Showcase with its rebuild prompt inlined", () => {
    const bathys = TEMPLATES.find((t) => t.slug === "bathys");
    expect(bathys?.category).toBe("showcase");
    expect(bathys?.promptMarkdown).toContain('rebuild "BATHYS"');
    expect(bathys?.promptMarkdown).toContain("#00E5FF");
  });

  it("files AUBADE under Showcase with its rebuild prompt inlined", () => {
    const aubade = TEMPLATES.find((t) => t.slug === "aubade");
    expect(aubade?.category).toBe("showcase");
    expect(aubade?.promptMarkdown).toContain('rebuild "AUBADE"');
    expect(aubade?.promptMarkdown).toContain("#8E1F3A");
  });

  it("files Satsuma under Showcase with its rebuild prompt inlined", () => {
    const satsuma = TEMPLATES.find((t) => t.slug === "satsuma");
    expect(satsuma?.category).toBe("showcase");
    expect(satsuma?.promptMarkdown).toContain('rebuild "Satsuma"');
    expect(satsuma?.promptMarkdown).toContain("#FF7A2F");
  });

  it("files CALDER & ROWE under Showcase with its rebuild prompt inlined", () => {
    const calder = TEMPLATES.find((t) => t.slug === "calder");
    expect(calder?.category).toBe("showcase");
    expect(calder?.promptMarkdown).toContain('rebuild "CALDER & ROWE"');
    expect(calder?.promptMarkdown).toContain("#C9A55A");
  });

  it("files KINETIC under Showcase with its rebuild prompt inlined", () => {
    const kinetic = TEMPLATES.find((t) => t.slug === "kinetic");
    expect(kinetic?.category).toBe("showcase");
    expect(kinetic?.promptMarkdown).toContain('rebuild "KINETIC"');
    expect(kinetic?.promptMarkdown).toContain("#FF6B2B");
  });

  it("files RILL under Showcase with its rebuild prompt inlined", () => {
    const rill = TEMPLATES.find((t) => t.slug === "rill");
    expect(rill?.category).toBe("showcase");
    expect(rill?.promptMarkdown).toContain('rebuild "RILL"');
    expect(rill?.promptMarkdown).toContain("#14231E");
  });

  it("files HIYAS under App with its rebuild prompt inlined", () => {
    const hiyas = TEMPLATES.find((t) => t.slug === "hiyas");
    expect(hiyas?.category).toBe("app");
    expect(hiyas?.promptMarkdown).toContain('rebuild "HIYAS"');
    expect(hiyas?.promptMarkdown).toContain("#0B2A4A");
  });

  it("files SEREIN under Minimal with its fold-out prompt inlined", () => {
    const serein = TEMPLATES.find((t) => t.slug === "serein");
    expect(serein?.category).toBe("minimal");
    expect(serein?.promptMarkdown).toContain('rebuild "SEREIN Bureau"');
    expect(serein?.promptMarkdown).toContain("#A8D6CC");
  });

  it("files PERIGEE under 3D with its rebuild prompt inlined", () => {
    const perigee = TEMPLATES.find((t) => t.slug === "perigee");
    expect(perigee?.category).toBe("3d");
    expect(perigee?.promptMarkdown).toContain('rebuild "PERIGEE"');
    expect(perigee?.promptMarkdown).toContain("#FFB36B");
  });

  it("files LOAM under 3D with its rebuild prompt inlined", () => {
    const loam = TEMPLATES.find((t) => t.slug === "loam");
    expect(loam?.category).toBe("3d");
    expect(loam?.promptMarkdown).toContain('rebuild "LOAM"');
    expect(loam?.promptMarkdown).toContain("#C8E64C");
  });

  it("files PARALLEL under AI with its rebuild prompt inlined", () => {
    const parallel = TEMPLATES.find((t) => t.slug === "parallel");
    expect(parallel?.category).toBe("ai");
    expect(parallel?.promptMarkdown).toContain("PARALLEL");
    expect(parallel?.promptMarkdown).toContain("#E85D36");
  });

  it("files Jules Mercer under Portfolio with its rebuild prompt inlined", () => {
    const mercer = TEMPLATES.find((t) => t.slug === "mercer");
    expect(mercer?.category).toBe("portfolio");
    expect(mercer?.promptMarkdown).toContain("Jules Mercer");
    expect(mercer?.promptMarkdown).toContain("#0A0D10");
  });
});
