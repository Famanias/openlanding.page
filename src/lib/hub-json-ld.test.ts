import { describe, expect, it } from "vitest";
import { catalogIndexPath, categoryHubPath, templateDetailPath } from "./catalog-routes";
import { buildHubJsonLd, hubBreadcrumbJsonLd, hubCollectionPageJsonLd } from "./hub-json-ld";
import { PUBLIC_TEMPLATES } from "./seo";
import { absoluteUrl } from "./site";

describe("hub-json-ld", () => {
  it("builds a CollectionPage with ItemList linking to absolute detail URLs", () => {
    const sample = PUBLIC_TEMPLATES.slice(0, 3);
    const node = hubCollectionPageJsonLd({
      path: categoryHubPath("3d"),
      name: "3D landing page templates",
      description: "Free 3D templates.",
      templates: sample,
    });

    expect(node["@type"]).toBe("CollectionPage");
    expect(node.url).toBe("https://www.openlanding.page/landing-page-templates/category/3d");
    expect(node.license).toBe("https://opensource.org/licenses/MIT");

    const list = node.mainEntity as {
      "@type": string;
      numberOfItems: number;
      itemListElement: { "@type": string; position: number; name: string; url: string }[];
    };
    expect(list["@type"]).toBe("ItemList");
    expect(list.numberOfItems).toBe(3);
    expect(list.itemListElement[0]).toEqual({
      "@type": "ListItem",
      position: 1,
      name: sample[0].title,
      url: absoluteUrl(templateDetailPath(sample[0].slug)),
    });
  });

  it("builds a BreadcrumbList with absolute item URLs", () => {
    const crumbs = hubBreadcrumbJsonLd(
      [
        { name: "Home", path: "/" },
        { name: "Landing page templates", path: catalogIndexPath() },
        { name: "3D", path: categoryHubPath("3d") },
      ],
      categoryHubPath("3d"),
    );

    expect(crumbs["@type"]).toBe("BreadcrumbList");
    const items = crumbs.itemListElement as { position: number; name: string; item: string }[];
    expect(items).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.openlanding.page/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Landing page templates",
        item: "https://www.openlanding.page/landing-page-templates",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "3D",
        item: "https://www.openlanding.page/landing-page-templates/category/3d",
      },
    ]);
  });

  it("serializes CollectionPage and BreadcrumbList into one escaped @graph", () => {
    const sample = PUBLIC_TEMPLATES.slice(0, 2);
    const json = buildHubJsonLd({
      path: catalogIndexPath(),
      name: "Free landing page templates",
      description: "All <templates>.",
      templates: sample,
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Landing page templates", path: catalogIndexPath() },
      ],
    });

    expect(json).not.toContain("<");
    const parsed = JSON.parse(json) as { "@context": string; "@graph": { "@type": string }[] };
    expect(parsed["@context"]).toBe("https://schema.org");
    expect(parsed["@graph"].map((n) => n["@type"])).toEqual(["CollectionPage", "BreadcrumbList"]);
  });
});
