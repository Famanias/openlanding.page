import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { TEMPLATES } from "../../src/app/(index)/data/templates";
import { TEMPLATE_METADATA } from "../generate-copy-bundles";
import { STANDALONE_SLUGS } from "./config";

describe("published standalone downloads", () => {
  it.each(STANDALONE_SLUGS)("%s has an enabled gallery download and complete copy bundle", slug => {
    expect(TEMPLATES.find(template => template.slug === slug)?.hasDownload).toBe(true);
    expect(TEMPLATE_METADATA[slug].includeDownload).toBe(true);
    expect(TEMPLATE_METADATA[slug].downloadPath).toBe(`/downloads/${slug}.html`);
    const html = fs.readFileSync(`public/downloads/${slug}.html`, "utf8");
    expect(html).toMatch(/^<!DOCTYPE html>/);
    expect(html).toContain('id="standalone-root"');
    expect(html).not.toContain("/_next/");
    expect(fs.readFileSync(`public/copy/${slug}.md`, "utf8")).toContain(`<file path="public/downloads/${slug}.html">`);
  });
});
