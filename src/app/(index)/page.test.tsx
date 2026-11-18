import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import IndexPage from "./page";

describe("IndexPage", () => {
  it("renders full landing page assembly with Header, Hero, Gallery, Contribute, and Footer", async () => {
    const element = await IndexPage();
    const html = renderToStaticMarkup(element);
    expect(html).toContain("openlandingpage");
    expect(html).toContain("Landing Pages, from Header to Footer.");
    expect(html).toContain('id="gallery"');
    expect(html).toContain('id="contact"');
    expect(html).toContain("Your site, templated.");
    expect(html).toContain("Orrery");
    expect(html).toContain("KEYTU");
    expect(html).toContain("KŌJI");
    expect(html).toContain("TRACE");
    expect(html).toContain("CALDER &amp; ROWE");
    expect(html).toContain("VECTOR/90");
    expect(html).not.toContain("MORROW");
    expect(html).toContain("LOOPHOUSE");
    expect(html).toContain("GitHub");
    expect(html).toContain("OpenLanding.page. MIT Licensed.");
  });

  it("server-renders the category links, FAQ, and matching structured data", async () => {
    const html = renderToStaticMarkup(await IndexPage());
    expect(html).toContain("Browse by category");
    expect(html).toContain('href="/landing-page-templates"');
    expect(html).toContain('href="/landing-page-templates/category/3d"');
    expect(html).toContain('id="faq"');
    expect(html).toContain("What is openlandingpage?");
    expect(html).toContain('type="application/ld+json"');
    for (const type of ["Organization", "WebSite", "CollectionPage", "ItemList", "SoftwareSourceCode", "FAQPage"]) {
      expect(html).toContain(`"${type}"`);
    }
  });
});
