import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  parseArchiveArgs,
  resolveTemplates,
  updateTemplatesDataFile,
  updateTemplatePageFile,
  updateE2eTemplatesList,
  loadTemplatesData,
  type TemplateInfo,
} from "../archive-templates";

describe("archive-templates CLI utility", () => {
  describe("parseArchiveArgs", () => {
    it("parses comma-separated template names correctly", () => {
      const result = parseArchiveArgs(["starlight lab,", "spaceedu,", "lucentra"]);
      expect(result.rawTargets).toEqual(["starlight lab", "spaceedu", "lucentra"]);
      expect(result.isRestore).toBe(false);
      expect(result.help).toBe(false);
    });

    it("parses a single comma-joined string", () => {
      const result = parseArchiveArgs(["starlight lab, spaceedu, lucentra, morrow, sundial"]);
      expect(result.rawTargets).toEqual(["starlight lab", "spaceedu", "lucentra", "morrow", "sundial"]);
      expect(result.isRestore).toBe(false);
    });

    it("parses single template name without commas", () => {
      const result = parseArchiveArgs(["morrow"]);
      expect(result.rawTargets).toEqual(["morrow"]);
      expect(result.isRestore).toBe(false);
    });

    it("strips outer quotes from targets", () => {
      const res1 = parseArchiveArgs(['"starlight lab"']);
      expect(res1.rawTargets).toEqual(["starlight lab"]);

      const res2 = parseArchiveArgs(['"starlight lab"', "'spaceedu'"]);
      expect(res2.rawTargets).toEqual(["starlight lab", "spaceedu"]);

      const res3 = parseArchiveArgs(['"starlight lab", "spaceedu"']);
      expect(res3.rawTargets).toEqual(["starlight lab", "spaceedu"]);
    });

    it("detects --restore and --unarchive flags", () => {
      const res1 = parseArchiveArgs(["--restore", "morrow"]);
      expect(res1.isRestore).toBe(true);
      expect(res1.rawTargets).toEqual(["morrow"]);

      const res2 = parseArchiveArgs(["-r", "lucentra"]);
      expect(res2.isRestore).toBe(true);
      expect(res2.rawTargets).toEqual(["lucentra"]);

      const res3 = parseArchiveArgs(["--unarchive", "spaceedu"]);
      expect(res3.isRestore).toBe(true);
      expect(res3.rawTargets).toEqual(["spaceedu"]);
    });

    it("detects --help flag", () => {
      const res1 = parseArchiveArgs(["--help"]);
      expect(res1.help).toBe(true);

      const res2 = parseArchiveArgs(["-h"]);
      expect(res2.help).toBe(true);
    });

    it("handles empty arguments", () => {
      const result = parseArchiveArgs([]);
      expect(result.rawTargets).toEqual([]);
      expect(result.isRestore).toBe(false);
      expect(result.help).toBe(false);
    });
  });

  describe("resolveTemplates", () => {
    const mockTemplates: TemplateInfo[] = [
      { slug: "starlight", title: "Starlight Lab", archived: true },
      { slug: "spaceedu", title: "SPACEEDU", archived: true },
      { slug: "lucentra", title: "LUCENTRA", archived: true },
      { slug: "morrow", title: "MORROW", archived: true },
      { slug: "sundial", title: "SUNDIAL Coffee Roasters", archived: true },
      { slug: "orrery", title: "Orrery Optics", archived: false },
      { slug: "keytu", title: "KEYTU Alpine", archived: false },
    ];

    it("resolves by exact slug", () => {
      const res = resolveTemplates(["orrery"], mockTemplates);
      expect(res.matched).toHaveLength(1);
      expect(res.matched[0].slug).toBe("orrery");
      expect(res.unknown).toHaveLength(0);
    });

    it("resolves by title case-insensitively", () => {
      const res = resolveTemplates(["starlight lab"], mockTemplates);
      expect(res.matched).toHaveLength(1);
      expect(res.matched[0].slug).toBe("starlight");
      expect(res.unknown).toHaveLength(0);
    });

    it("resolves by title prefix (e.g. sundial -> SUNDIAL Coffee Roasters)", () => {
      const res = resolveTemplates(["sundial"], mockTemplates);
      expect(res.matched).toHaveLength(1);
      expect(res.matched[0].slug).toBe("sundial");
    });

    it("resolves multiple items and avoids duplicate matches", () => {
      const res = resolveTemplates(["starlight", "Starlight Lab", "keytu"], mockTemplates);
      expect(res.matched).toHaveLength(2);
      expect(res.matched.map((m) => m.slug)).toEqual(["starlight", "keytu"]);
    });

    it("reports unknown templates in unknown list", () => {
      const res = resolveTemplates(["nonexistent-template", "orrery"], mockTemplates);
      expect(res.matched).toHaveLength(1);
      expect(res.matched[0].slug).toBe("orrery");
      expect(res.unknown).toEqual(["nonexistent-template"]);
    });
  });

  describe("file update functions", () => {
    let tempDir: string;

    beforeEach(() => {
      tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "archive-test-"));
    });

    afterEach(() => {
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    });

    it("updates templates.ts data file to archive and unarchive", () => {
      const mockTemplatesContent = `export const RAW_TEMPLATES: TemplateItem[] = [
  {
    slug: "orrery",
    title: "Orrery Optics",
    tags: ["3D"],
  },
  {
    slug: "keytu",
    title: "KEYTU Alpine",
    tags: ["Minimal"],
  },
];
`;
      const filePath = path.join(tempDir, "templates.ts");
      fs.writeFileSync(filePath, mockTemplatesContent, "utf8");

      // Archive orrery
      const archiveRes = updateTemplatesDataFile(filePath, "orrery", true);
      expect(archiveRes.changed).toBe(true);

      const updatedContent = fs.readFileSync(filePath, "utf8");
      expect(updatedContent).toContain("archived: true,");

      // Idempotency: archiving again causes no change
      const secondArchiveRes = updateTemplatesDataFile(filePath, "orrery", true);
      expect(secondArchiveRes.changed).toBe(false);

      // Unarchive orrery
      const unarchiveRes = updateTemplatesDataFile(filePath, "orrery", false);
      expect(unarchiveRes.changed).toBe(true);

      const restoredContent = fs.readFileSync(filePath, "utf8");
      expect(restoredContent).not.toContain("archived: true");

      // Idempotency: unarchiving again causes no change
      const secondUnarchiveRes = updateTemplatesDataFile(filePath, "orrery", false);
      expect(secondUnarchiveRes.changed).toBe(false);
    });

    it("updates template page.tsx to inject and remove notFound()", () => {
      const mockPageContent = `import React from "react";

export default function Page() {
  return <main>Original Content</main>;
}
`;
      const pagePath = path.join(tempDir, "page.tsx");
      fs.writeFileSync(pagePath, mockPageContent, "utf8");

      // Archive page
      const archiveRes = updateTemplatePageFile(pagePath, true);
      expect(archiveRes.changed).toBe(true);

      const archivedContent = fs.readFileSync(pagePath, "utf8");
      expect(archivedContent).toContain('import { notFound } from "next/navigation";');
      expect(archivedContent).toContain("notFound();");

      // Idempotency
      const secondArchive = updateTemplatePageFile(pagePath, true);
      expect(secondArchive.changed).toBe(false);

      // Unarchive page
      const unarchiveRes = updateTemplatePageFile(pagePath, false);
      expect(unarchiveRes.changed).toBe(true);

      const unarchivedContent = fs.readFileSync(pagePath, "utf8");
      expect(unarchivedContent).not.toContain("notFound();");
      expect(unarchivedContent).not.toContain("notFound");

      // Idempotency
      const secondUnarchive = updateTemplatePageFile(pagePath, false);
      expect(secondUnarchive.changed).toBe(false);
    });

    it("updates e2e templates list to remove and add slug", () => {
      const mockE2eContent = `export const TEMPLATE_PATHS: string[] = ["/orrery", "/keytu"];\n`;
      const e2ePath = path.join(tempDir, "templates.ts");
      fs.writeFileSync(e2ePath, mockE2eContent, "utf8");

      // Archive orrery -> remove from TEMPLATE_PATHS
      const archiveRes = updateE2eTemplatesList(e2ePath, "orrery", true);
      expect(archiveRes.changed).toBe(true);

      let content = fs.readFileSync(e2ePath, "utf8");
      expect(content).not.toContain('"/orrery"');
      expect(content).toContain('"/keytu"');

      // Idempotent archive
      expect(updateE2eTemplatesList(e2ePath, "orrery", true).changed).toBe(false);

      // Unarchive orrery -> re-add to TEMPLATE_PATHS
      const unarchiveRes = updateE2eTemplatesList(e2ePath, "orrery", false);
      expect(unarchiveRes.changed).toBe(true);

      content = fs.readFileSync(e2ePath, "utf8");
      expect(content).toContain('"/orrery"');
    });

    it("loads and parses existing templates correctly from templates.ts", () => {
      const mockContent = `export const RAW_TEMPLATES: TemplateItem[] = [
  {
    slug: "orrery",
    title: "Orrery Optics",
  },
  {
    slug: "starlight",
    title: "Starlight Lab",
    archived: true,
  },
];
`;
      const filePath = path.join(tempDir, "templates.ts");
      fs.writeFileSync(filePath, mockContent, "utf8");

      const loaded = loadTemplatesData(filePath);
      expect(loaded).toHaveLength(2);
      expect(loaded[0]).toEqual({ slug: "orrery", title: "Orrery Optics", archived: false });
      expect(loaded[1]).toEqual({ slug: "starlight", title: "Starlight Lab", archived: true });
    });
  });
});
