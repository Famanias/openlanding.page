import { describe, expect, it } from "vitest";
import { buildFaq } from "../app/(index)/data/faq";
import { faqJsonLd, galleryJsonLd, organizationJsonLd, serializeJsonLd, templateDetailJsonLd, templateJsonLd, websiteJsonLd } from "./json-ld";
import { PUBLIC_TEMPLATES } from "./seo";

describe("json-ld", () => {
  it("describes every public template as MIT-licensed source code in the gallery list", () => {
    const list = galleryJsonLd(PUBLIC_TEMPLATES).mainEntity as { numberOfItems: number; itemListElement: { url: string }[] };
    expect(list.numberOfItems).toBe(PUBLIC_TEMPLATES.length);
    expect(list.itemListElement[0].url).toBe(`https://www.openlanding.page/landing-page-templates/${PUBLIC_TEMPLATES[0].slug}`);
    const item = templateJsonLd(PUBLIC_TEMPLATES[0]);
    expect(item["@type"]).toEqual(["SoftwareSourceCode", "CreativeWork"]);
    expect(item.license).toBe("https://opensource.org/licenses/MIT");
  });

  it("describes a template on its detail page and keeps the live page as its work example", () => {
    const item = templateJsonLd(PUBLIC_TEMPLATES.find(t => t.slug === "calder")!);
    expect(item["@id"]).toBe("https://www.openlanding.page/landing-page-templates/calder#template");
    expect(item.url).toBe("https://www.openlanding.page/landing-page-templates/calder");
    expect(item.mainEntityOfPage).toEqual({ "@id": "https://www.openlanding.page/landing-page-templates/calder#webpage" });
    expect(item.workExample).toEqual({ "@type": "WebPage", name: "CALDER & ROWE live demo", url: "https://www.openlanding.page/templates/calder" });
  });

  it("cross-links the detail page graph by @id and includes HowTo only when given", () => {
    const template = PUBLIC_TEMPLATES.find(t => t.slug === "calder")!;
    const base = "https://www.openlanding.page/landing-page-templates/calder";
    const input = { template, heading: "H", summary: "S", breadcrumb: { "@type": "BreadcrumbList", "@id": `${base}#breadcrumb` }, faq: [{ question: "Q?", answer: "A." }] };
    const [page, crumbs, entity, faq] = templateDetailJsonLd(input);
    expect(page).toMatchObject({ "@type": "ItemPage", "@id": `${base}#webpage`, url: base, name: "H", description: "S", breadcrumb: { "@id": `${base}#breadcrumb` }, mainEntity: { "@id": `${base}#template` } });
    expect(crumbs["@id"]).toBe(`${base}#breadcrumb`);
    expect(entity["@id"]).toBe(`${base}#template`);
    expect(faq).toEqual({ "@type": "FAQPage", "@id": `${base}#faq`, mainEntity: [{ "@type": "Question", name: "Q?", acceptedAnswer: { "@type": "Answer", text: "A." } }] });
    expect(templateDetailJsonLd(input)).toHaveLength(4);
    const withHowTo = templateDetailJsonLd({ ...input, howTo: { name: "How", description: "D", steps: [{ name: "One", text: "Do one." }] } });
    expect(withHowTo[4]).toMatchObject({ "@type": "HowTo", "@id": `${base}#howto`, step: [{ "@type": "HowToStep", position: 1, name: "One", text: "Do one.", url: `${base}#step-1` }] });
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
