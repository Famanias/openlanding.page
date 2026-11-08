import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { TEMPLATES } from "../../src/app/(index)/data/templates";
import { TEMPLATE_METADATA } from "../generate-copy-bundles";
import { STANDALONE_SLUGS } from "./config";

const published = STANDALONE_SLUGS.filter(slug => TEMPLATES.some(template => template.slug === slug && template.hasDownload));

describe("published component template downloads", () => {
  it.each(published)("%s has a valid HTML download and generated exports include their copy bundle", slug => {
    const html = fs.readFileSync(`public/downloads/${slug}.html`, "utf8");
    expect(/^\uFEFF?<!doctype html>/i.test(html)).toBe(true);
    expect(/<h1[\s>]/i.test(html)).toBe(true);
    expect(html.includes("/_next/")).toBe(false);
    // Legacy hand-authored HTML has separate copy metadata. Generated artifacts must publish both.
    if (html.includes("<!-- Generated from the current ")) {
      const metadata = TEMPLATE_METADATA[slug as keyof typeof TEMPLATE_METADATA];
      expect(metadata.includeDownload).toBe(true);
      expect(metadata.downloadPath).toBe(`/downloads/${slug}.html`);
      expect(fs.readFileSync(`public/copy/${slug}.md`, "utf8").includes(`<file path="public/downloads/${slug}.html">`)).toBe(true);
      if (html.includes(`<!-- Generated from the current ${slug} components.`)) expect(html.includes('id="standalone-root"')).toBe(true);
    }
  });
});
