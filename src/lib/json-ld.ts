import type { TemplateItem } from "../app/(index)/data/templates";
import type { FaqEntry } from "../app/(index)/data/faq";
import { SITE_DESCRIPTION, templatePromptUrl, templateUrl } from "./seo";
import { absoluteUrl, SITE_NAME, SITE_URL } from "./site";

export const REPO_URL = "https://github.com/Famanias/openlanding.page";
const MIT = "https://opensource.org/licenses/MIT";
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

type JsonLdObject = Record<string, unknown>;

export function organizationJsonLd(): JsonLdObject {
  return { "@type": "Organization", "@id": ORG_ID, name: SITE_NAME, url: SITE_URL, logo: absoluteUrl("/icon.svg"), sameAs: [REPO_URL] };
}

export function websiteJsonLd(): JsonLdObject {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    name: SITE_NAME,
    alternateName: "OpenLanding.page",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
    potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/?q={search_term_string}` }, "query-input": "required name=search_term_string" },
  };
}

export function templateJsonLd(t: TemplateItem): JsonLdObject {
  return {
    "@type": ["SoftwareSourceCode", "CreativeWork"],
    "@id": `${templateUrl(t.slug)}#template`,
    name: t.title,
    description: t.description,
    url: templateUrl(t.slug),
    image: absoluteUrl(t.previewImage),
    dateCreated: t.createdAt,
    license: MIT,
    isAccessibleForFree: true,
    codeRepository: REPO_URL,
    programmingLanguage: ["TypeScript", "React"],
    runtimePlatform: "Next.js",
    keywords: [t.industry, ...t.categories, ...t.badges].join(", "),
    about: t.industry,
    publisher: { "@id": ORG_ID },
    subjectOf: { "@type": "DigitalDocument", name: `${t.title} rebuild prompt`, encodingFormat: "text/markdown", url: templatePromptUrl(t.slug) },
  };
}

export function galleryJsonLd(templates: readonly TemplateItem[]): JsonLdObject {
  return {
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/#gallery`,
    url: SITE_URL,
    name: "Free landing page templates",
    description: SITE_DESCRIPTION,
    isPartOf: { "@id": SITE_ID },
    license: MIT,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: templates.length,
      itemListElement: templates.map((t, i) => ({ "@type": "ListItem", position: i + 1, url: templateUrl(t.slug), item: templateJsonLd(t) })),
    },
  };
}

export function faqJsonLd(faq: readonly FaqEntry[]): JsonLdObject {
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faq.map(entry => ({ "@type": "Question", name: entry.question, acceptedAnswer: { "@type": "Answer", text: entry.answer } })),
  };
}

/** One @graph document; `<` is escaped so template copy can never close the script tag. */
export function serializeJsonLd(nodes: readonly JsonLdObject[]): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(/</g, "\\u003c");
}
