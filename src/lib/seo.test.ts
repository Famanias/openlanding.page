import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { getCategoryHubSummaries } from "../app/(index)/data/category-copy";
import robots from "../app/robots";
import sitemap from "../app/sitemap";
import { catalogIndexPath, categoryHubPath } from "./catalog-routes";
import { buildLlmsFullTxt, buildLlmsTxt, PUBLIC_TEMPLATES, templateCanonicalHeaders } from "./seo";

describe("discovery surfaces", () => {
  it("sitemap lists home, every public template, catalog index, and category hubs on the canonical origin", () => {
    const entries = sitemap();
    const urls = entries.map(entry => entry.url);
    expect(urls[0]).toBe("https://www.openlanding.page/");
    for (const t of PUBLIC_TEMPLATES) {
      expect(urls).toContain(`https://www.openlanding.page/templates/${t.slug}`);
      expect(urls).toContain(`https://www.openlanding.page/landing-page-templates/${t.slug}`);
    }
    const indexEntry = entries.find(e => e.url === `https://www.openlanding.page${catalogIndexPath()}`);
    expect(indexEntry?.priority).toBe(0.7);
    for (const hub of getCategoryHubSummaries(PUBLIC_TEMPLATES)) {
      const hubEntry = entries.find(e => e.url === `https://www.openlanding.page${categoryHubPath(hub.id)}`);
      expect(hubEntry?.priority).toBe(0.6);
    }
    expect(urls.every(url => url.startsWith("https://www.openlanding.page/"))).toBe(true);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("sitemap gives each detail page priority 0.7, its creation date and its images", () => {
    const t = PUBLIC_TEMPLATES.find(x => x.slug === "calder")!;
    const entry = sitemap().find(e => e.url === "https://www.openlanding.page/landing-page-templates/calder");
    expect(entry).toMatchObject({ priority: 0.7, lastModified: t.createdAt });
    expect(entry?.images).toEqual(["https://www.openlanding.page/gallery/calder.webp", "https://www.openlanding.page/templates/calder/preview-1600.webp"]);
  });

  it("robots allows AI crawlers and points at the sitemap", () => {
    const result = robots();
    expect(result.sitemap).toBe("https://www.openlanding.page/sitemap.xml");
    const agents = [result.rules].flat().flatMap(rule => [rule.userAgent].flat());
    for (const bot of ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"]) expect(agents).toContain(bot);
  });

  it("llms.txt links every category hub, template, and existing prompt file", () => {
    const txt = buildLlmsTxt();
    expect(txt.startsWith("# openlandingpage")).toBe(true);
    expect(txt).toContain("## Categories");
    for (const hub of getCategoryHubSummaries(PUBLIC_TEMPLATES)) {
      expect(txt).toContain(`https://www.openlanding.page${categoryHubPath(hub.id)}`);
    }
    for (const t of PUBLIC_TEMPLATES) {
      expect(txt).toContain(`/templates/${t.slug})`);
      expect(txt).toContain(`Details: https://www.openlanding.page/landing-page-templates/${t.slug}`);
      expect(fs.existsSync(path.join("public/copy", `${t.slug}-prompt.md`)), t.slug).toBe(true);
    }
    const full = buildLlmsFullTxt();
    expect(full.length).toBeGreaterThan(txt.length);
    for (const t of PUBLIC_TEMPLATES) expect(full).toContain(`- Details: https://www.openlanding.page/landing-page-templates/${t.slug}`);
  });

  it("emits a canonical Link header per template page", () => {
    expect(templateCanonicalHeaders(["orrery", "orrery"])).toEqual([
      { source: "/templates/orrery", headers: [{ key: "Link", value: '<https://www.openlanding.page/templates/orrery>; rel="canonical"' }] },
    ]);
  });
});

describe("manifest", () => {
  it("names the site and uses the shared icon", async () => {
    const { default: manifest } = await import("../app/manifest");
    const result = manifest();
    expect(result.short_name).toBe("openlandingpage");
    expect(result.start_url).toBe("/");
    expect(result.icons?.[0].src).toBe("/icon.svg");
  });
});
