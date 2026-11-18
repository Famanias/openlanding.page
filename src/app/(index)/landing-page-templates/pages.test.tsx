import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { catalogIndexPath, categoryHubPath, templateDetailPath } from "../../../lib/catalog-routes";
import { PUBLIC_TEMPLATES } from "../../../lib/seo";
import { templatePath } from "../../../lib/template-routing";
import { getCategoryHubSummaries } from "../data/category-copy";
import { CATEGORIES } from "../data/templates";
import CatalogIndexPage, { generateMetadata as generateIndexMetadata } from "./page";
import CategoryHubPage, {
  generateMetadata as generateCategoryMetadata,
  generateStaticParams,
} from "./category/[id]/page";

describe("catalog index page", () => {
  it("generates metadata with canonical and openGraph", async () => {
    const meta = await generateIndexMetadata();
    expect(meta.title).toBe("Free landing page templates (MIT) | OpenLandingPage");
    expect(meta.alternates?.canonical).toBe(catalogIndexPath());
    expect(meta.openGraph?.url).toBe(catalogIndexPath());
  });

  it("renders H1, answer-first intro, category hub grid, all templates, and JSON-LD", async () => {
    const html = renderToStaticMarkup(await CatalogIndexPage());
    expect(html).toContain("<h1>Free landing page templates</h1>".replace("<h1>", '<h1 class="catalog-title">'));
    expect(html).toContain(`${PUBLIC_TEMPLATES.length} free, MIT-licensed landing page`);
    expect(html).toContain("AI rebuild");

    for (const hub of getCategoryHubSummaries(PUBLIC_TEMPLATES)) {
      expect(html).toContain(`href="${categoryHubPath(hub.id)}"`);
      expect(html).toContain(hub.copy.blurb);
    }

    for (const template of PUBLIC_TEMPLATES) {
      expect(html).toContain(`href="${templateDetailPath(template.slug)}"`);
    }

    expect(html).toContain('type="application/ld+json"');
    expect(html).toContain('"CollectionPage"');
    expect(html).toContain('"ItemList"');
    expect(html).toContain('"BreadcrumbList"');
  });
});

describe("category hub pages", () => {
  it("generates static params for every non-all category with templates", async () => {
    const params = await generateStaticParams();
    const expectedIds = CATEGORIES.filter((c) => c.id !== "all").map((c) => c.id);
    expect(params.map((p) => p.id).sort()).toEqual([...expectedIds].sort());
  });

  it("generates unique metadata and renders breadcrumb, cards, live demo links, other hubs, and JSON-LD", async () => {
    const meta = await generateCategoryMetadata({ params: Promise.resolve({ id: "3d" }) });
    expect(meta.title).toBe("3D landing page templates (free, MIT) | OpenLandingPage");
    expect(meta.alternates?.canonical).toBe(categoryHubPath("3d"));
    expect(meta.openGraph?.url).toBe(categoryHubPath("3d"));

    const html = renderToStaticMarkup(
      await CategoryHubPage({ params: Promise.resolve({ id: "3d" }) }),
    );
    expect(html).toContain("3D landing page templates");
    expect(html).toContain(`href="${catalogIndexPath()}"`);
    expect(html).toContain('aria-label="Breadcrumb"');

    const threeDHub = getCategoryHubSummaries(PUBLIC_TEMPLATES).find((h) => h.id === "3d")!;
    const firstTemplate = threeDHub.templates[0];
    expect(html).toContain(`href="${templateDetailPath(firstTemplate.slug)}"`);
    expect(html).toContain(`href="${templatePath(firstTemplate.slug)}"`);
    expect(html).toContain("Live demo");
    expect(html).toContain(`/gallery/${firstTemplate.slug}.webp`);
    expect(html).toContain(`href="${categoryHubPath("threejs")}"`);
    expect(html).toContain('"CollectionPage"');
    expect(html).toContain('"ItemList"');
    expect(html).toContain('"BreadcrumbList"');
  });

  it("calls notFound for unknown or all category ids", async () => {
    await expect(
      generateCategoryMetadata({ params: Promise.resolve({ id: "unknown-cat" }) }),
    ).rejects.toThrow();
    await expect(
      CategoryHubPage({ params: Promise.resolve({ id: "unknown-cat" }) }),
    ).rejects.toThrow();
    await expect(CategoryHubPage({ params: Promise.resolve({ id: "all" }) })).rejects.toThrow();
  });
});
