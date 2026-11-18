import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { PUBLIC_TEMPLATES } from "../../../lib/seo";
import { SITE_ALTERNATE_NAMES } from "../../../lib/site";
import { aboutFacts } from "./about-facts";
import AboutPage, { generateMetadata } from "./page";

describe("about page", () => {
  it("has a unique title, description and canonical", async () => {
    const meta = await generateMetadata();
    expect(meta.title).toBe("About Open Landing Page (OpenLandingPage): free landing page templates");
    expect(meta.description).toContain(`${PUBLIC_TEMPLATES.length} complete, MIT-licensed landing page templates`);
    expect(meta.alternates?.canonical).toBe("/about");
  });

  it("server-renders an answer-first definition, every name variant and AboutPage JSON-LD", async () => {
    const html = renderToStaticMarkup(await AboutPage());
    expect(html).toContain('<h1 class="catalog-title">About Open Landing Page</h1>');
    expect(html).toContain("Open Landing Page (OpenLandingPage) is a free, open-source gallery");
    for (const name of SITE_ALTERNATE_NAMES) expect(html).toContain(name);
    expect(html).toContain('href="https://github.com/Famanias/openlanding.page"');
    expect(html).toContain('"@type":"AboutPage"');
    expect(html).toContain('"@type":"BreadcrumbList"');
    expect(html).toContain('aria-current="page"');
  });
});

describe("aboutFacts", () => {
  it("derives counts, model families and the first publish month", () => {
    const facts = aboutFacts([
      { model: "Gemini 4 Hydrogen High", createdAt: "2026-11-02", hasDownload: true },
      { model: "Claude Opus 5", createdAt: "2026-10-20" },
      { model: "GPT-6.1 Sol High", createdAt: "2026-11-09", hasDownload: true },
      { model: "Claude Sonnet 5.5 High", createdAt: "2026-11-10" },
    ]);
    expect(facts).toEqual({
      templateCount: 4,
      downloadCount: 2,
      modelFamilies: "Claude, Gemini and GPT models",
      firstPublished: "October 2026",
    });
  });

  it("falls back gracefully for unknown models and empty input", () => {
    expect(aboutFacts([{ model: "Mystery", createdAt: "2026-01-05" }]).modelFamilies).toBe("AI coding agents");
    expect(aboutFacts([]).firstPublished).toBe("");
  });
});
