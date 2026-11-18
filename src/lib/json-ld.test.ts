import { describe, expect, it } from "vitest";
import { buildFaq } from "../app/(index)/data/faq";
import { faqJsonLd, galleryJsonLd, organizationJsonLd, serializeJsonLd, templateJsonLd, websiteJsonLd } from "./json-ld";
import { PUBLIC_TEMPLATES } from "./seo";

describe("json-ld", () => {
  it("describes every public template as MIT-licensed source code in the gallery list", () => {
    const list = galleryJsonLd(PUBLIC_TEMPLATES).mainEntity as { numberOfItems: number; itemListElement: { url: string }[] };
    expect(list.numberOfItems).toBe(PUBLIC_TEMPLATES.length);
    expect(list.itemListElement[0].url).toBe(`https://www.openlanding.page/templates/${PUBLIC_TEMPLATES[0].slug}`);
    const item = templateJsonLd(PUBLIC_TEMPLATES[0]);
    expect(item["@type"]).toEqual(["SoftwareSourceCode", "CreativeWork"]);
    expect(item.license).toBe("https://opensource.org/licenses/MIT");
  });

  it("mirrors the visible FAQ copy", () => {
    const faq = buildFaq(3);
    const ld = faqJsonLd(faq).mainEntity as { name: string; acceptedAnswer: { text: string } }[];
    expect(ld.map(q => q.name)).toEqual(faq.map(q => q.question));
    expect(ld[0].acceptedAnswer.text).toContain("3 complete landing page templates");
  });

  it("serialises one graph and escapes '<'", () => {
    const json = serializeJsonLd([organizationJsonLd(), websiteJsonLd(), { "@type": "Thing", name: "</script>" }]);
    expect(json).not.toContain("<");
    const parsed = JSON.parse(json);
    expect(parsed["@context"]).toBe("https://schema.org");
    expect(parsed["@graph"].map((n: { "@type": string }) => n["@type"])).toEqual(["Organization", "WebSite", "Thing"]);
  });
});
