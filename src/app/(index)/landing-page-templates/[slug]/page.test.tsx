import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import TemplateDetailPage, { generateMetadata, generateStaticParams } from "./page";
import { ARCHIVED_TEMPLATES } from "../../data/templates";
import { PUBLIC_TEMPLATES } from "../../../../lib/seo";

const params = (slug: string) => ({ params: Promise.resolve({ slug }) });

async function render(slug: string): Promise<string> {
  return renderToStaticMarkup(await TemplateDetailPage(params(slug)));
}

function jsonLdGraph(html: string): { "@type": string | string[]; [key: string]: unknown }[] {
  const match = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/);
  return JSON.parse(match![1])["@graph"];
}

describe("template detail page", () => {
  it("prerenders every public template and no archived one", () => {
    const slugs = generateStaticParams().map(p => p.slug);
    expect(slugs).toEqual(PUBLIC_TEMPLATES.map(t => t.slug));
    for (const t of ARCHIVED_TEMPLATES) expect(slugs).not.toContain(t.slug);
  });

  it("404s for unknown, archived and reserved slugs", async () => {
    const rejected = ["does-not-exist", "category", ...ARCHIVED_TEMPLATES.map(t => t.slug)];
    for (const slug of rejected) {
      await expect(TemplateDetailPage(params(slug)), slug).rejects.toMatchObject({ digest: expect.stringContaining("404") });
      expect(await generateMetadata(params(slug))).toEqual({});
    }
  });

  it("builds unique, keyword-bearing metadata with a canonical and a raster social image", async () => {
    const meta = await generateMetadata(params("calder"));
    expect(meta.title).toBe("CALDER & ROWE: free Law & Advisory landing page template");
    expect(meta.description).toMatch(/^CALDER & ROWE is a free, MIT-licensed Law & Advisory landing page template/);
    expect(meta.alternates?.canonical).toBe("/landing-page-templates/calder");
    expect(meta.openGraph?.images).toEqual([{ url: "https://www.openlanding.page/templates/calder/preview-1600.webp", alt: "CALDER & ROWE landing page template preview" }]);
    expect(meta.twitter).toMatchObject({ card: "summary_large_image" });

    const svgPreview = PUBLIC_TEMPLATES.find(t => t.previewImage.endsWith(".svg"))!;
    const svgMeta = await generateMetadata(params(svgPreview.slug));
    expect(svgMeta.openGraph?.images).toEqual([expect.objectContaining({ url: `https://www.openlanding.page/gallery/${svgPreview.slug}.webp` })]);

    const titles = await Promise.all(PUBLIC_TEMPLATES.map(async t => (await generateMetadata(params(t.slug))).title));
    expect(new Set(titles).size).toBe(PUBLIC_TEMPLATES.length);
  });

  it("server-renders breadcrumb, answer-first copy, facts, actions, how-to, FAQ and related links", async () => {
    const html = await render("calder");
    expect(html).toContain('<nav aria-label="Breadcrumb"');
    expect(html).toContain('href="/landing-page-templates">Landing page templates</a>');
    expect(html).toContain('class="catalog-header"');
    expect(html).toContain('<span aria-current="page">CALDER &amp; ROWE</span>');
    expect(html).toContain('<h1 class="detail-title">CALDER &amp; ROWE landing page template</h1>');
    expect(html).toContain("CALDER &amp; ROWE is a free, MIT-licensed Law &amp; Advisory landing page template built with Next.js 16, Tailwind v4, React 19, SVG and Lenis.");
    expect(html).toMatch(/<img src="\/gallery\/calder\.webp" width="1600" height="900"[^>]*alt="Screenshot of the CALDER &amp; ROWE landing page template/);
    expect(html).toContain('href="/landing-page-templates/category/editorial">Editorial</a>');
    expect(html).toContain("Claude Sonnet 5.5 High");
    expect(html).toContain('<time dateTime="2026-10-21">October 21, 2026</time>');
    expect(html).toContain('href="/templates/calder"');
    expect(html).toContain("View live template");
    expect(html).toContain("Copy prompt");
    expect(html).toContain('href="/copy/calder-prompt.md"');
    expect(html).toContain('href="/downloads/calder.html"');
    expect(html).toContain("How to use this template with an AI coding agent");
    expect(html).toContain('id="step-4"');
    expect(html).toContain("Is CALDER &amp; ROWE free?");
    const relatedLinks = html.slice(html.indexOf('class="detail-related"')).match(/href="\/landing-page-templates\/[a-z0-9-]+"/g) ?? [];
    expect(relatedLinks.length).toBeGreaterThanOrEqual(4);
    expect(relatedLinks).not.toContain('href="/landing-page-templates/calder"');
  });

  it("omits Download HTML when the template has no standalone export", async () => {
    const t = PUBLIC_TEMPLATES.find(x => !x.hasDownload);
    if (!t) return;
    expect(await render(t.slug)).not.toContain(`/downloads/${t.slug}.html`);
  });

  it("emits one JSON-LD graph whose FAQ and HowTo match the visible copy", async () => {
    const html = await render("calder");
    const graph = jsonLdGraph(html);
    expect(graph.map(n => n["@type"])).toEqual(["ItemPage", "BreadcrumbList", ["SoftwareSourceCode", "CreativeWork"], "FAQPage", "HowTo"]);
    const faq = graph[3].mainEntity as { name: string }[];
    for (const q of faq) expect(html).toContain(`<summary>${q.name.replace(/&/g, "&amp;")}</summary>`);
    const steps = graph[4].step as { name: string }[];
    for (const step of steps) expect(html).toContain(`<h3>${step.name}</h3>`);
  });

  it("links to an existing gallery capture and prompt for every public template", () => {
    for (const t of PUBLIC_TEMPLATES) {
      expect(fs.existsSync(path.join("public/gallery", `${t.slug}.webp`)), t.slug).toBe(true);
      expect(fs.existsSync(path.join("public/copy", `${t.slug}-prompt.md`)), t.slug).toBe(true);
    }
  });
});
