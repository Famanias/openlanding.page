import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import robots from "../app/robots";
import sitemap from "../app/sitemap";
import { buildLlmsFullTxt, buildLlmsTxt, PUBLIC_TEMPLATES, templateCanonicalHeaders } from "./seo";

describe("discovery surfaces", () => {
  it("sitemap lists home and every public template on the canonical origin", () => {
    const urls = sitemap().map(entry => entry.url);
    expect(urls[0]).toBe("https://www.openlanding.page/");
    for (const t of PUBLIC_TEMPLATES) expect(urls).toContain(`https://www.openlanding.page/templates/${t.slug}`);
    expect(urls.every(url => url.startsWith("https://www.openlanding.page/"))).toBe(true);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("robots allows AI crawlers and points at the sitemap", () => {
    const result = robots();
    expect(result.sitemap).toBe("https://www.openlanding.page/sitemap.xml");
    const agents = [result.rules].flat().flatMap(rule => [rule.userAgent].flat());
    for (const bot of ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"]) expect(agents).toContain(bot);
  });

  it("llms.txt links every template and an existing prompt file", () => {
    const txt = buildLlmsTxt();
    expect(txt.startsWith("# openlandingpage")).toBe(true);
    for (const t of PUBLIC_TEMPLATES) {
      expect(txt).toContain(`/templates/${t.slug})`);
      expect(fs.existsSync(path.join("public/copy", `${t.slug}-prompt.md`)), t.slug).toBe(true);
    }
    expect(buildLlmsFullTxt().length).toBeGreaterThan(txt.length);
  });

  it("emits a canonical Link header per template page", () => {
    expect(templateCanonicalHeaders(["orrery", "orrery"])).toEqual([
      { source: "/templates/orrery", headers: [{ key: "Link", value: '<https://www.openlanding.page/templates/orrery>; rel="canonical"' }] },
    ]);
  });
});
