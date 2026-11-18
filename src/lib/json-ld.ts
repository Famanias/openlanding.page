import type { TemplateItem } from "../app/(index)/data/templates";
import type { FaqEntry } from "../app/(index)/data/faq";
import { SITE_DESCRIPTION, templateDetailUrl, templatePromptUrl, templateUrl } from "./seo";
import { absoluteUrl, SITE_ALTERNATE_NAMES, SITE_NAME, SITE_URL } from "./site";

export const REPO_URL = "https://github.com/Famanias/openlanding.page";
const MIT = "https://opensource.org/licenses/MIT";
const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

type JsonLdObject = Record<string, unknown>;

export function organizationJsonLd(): JsonLdObject {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    alternateName: [...SITE_ALTERNATE_NAMES],
    url: SITE_URL,
    logo: absoluteUrl("/icon.svg"),
    description: SITE_DESCRIPTION,
    sameAs: [REPO_URL],
  };
}

/** About page describing the site; its subject is the Organization (same @id as on the homepage). */
export function aboutPageJsonLd(options: { path: string; name: string; description: string }): JsonLdObject {
  const url = absoluteUrl(options.path);
  return {
    "@type": "AboutPage",
    "@id": `${url}#webpage`,
    url,
    name: options.name,
    description: options.description,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    mainEntity: organizationJsonLd(),
    breadcrumb: { "@id": `${url}#breadcrumb` },
    inLanguage: "en",
  };
}

export function websiteJsonLd(): JsonLdObject {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    name: SITE_NAME,
    alternateName: [...SITE_ALTERNATE_NAMES],
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
    potentialAction: { "@type": "SearchAction", target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/?q={search_term_string}` }, "query-input": "required name=search_term_string" },
  };
}

/** @id of the template entity; it lives on the detail page, which describes it. */
export function templateEntityId(slug: string): string {
  return `${templateDetailUrl(slug)}#template`;
}

function detailPageId(slug: string): string {
  return `${templateDetailUrl(slug)}#webpage`;
}

/**
 * The template as source code. `url`/`mainEntityOfPage` are its detail page (the indexable description);
 * the fictional live page at /templates/<slug> is the `workExample`, a rendered instance of the code.
 */
export function templateJsonLd(t: TemplateItem): JsonLdObject {
  return {
    "@type": ["SoftwareSourceCode", "CreativeWork"],
    "@id": templateEntityId(t.slug),
    name: t.title,
    description: t.description,
    url: templateDetailUrl(t.slug),
    mainEntityOfPage: { "@id": detailPageId(t.slug) },
    workExample: { "@type": "WebPage", name: `${t.title} live demo`, url: templateUrl(t.slug) },
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
      itemListElement: templates.map((t, i) => ({ "@type": "ListItem", position: i + 1, url: templateDetailUrl(t.slug), item: templateJsonLd(t) })),
    },
  };
}

export function faqJsonLd(faq: readonly FaqEntry[], id = `${SITE_URL}/#faq`): JsonLdObject {
  return {
    "@type": "FAQPage",
    "@id": id,
    mainEntity: faq.map(entry => ({ "@type": "Question", name: entry.question, acceptedAnswer: { "@type": "Answer", text: entry.answer } })),
  };
}

export interface TemplateDetailJsonLdInput {
  template: TemplateItem;
  heading: string;
  summary: string;
  /** BreadcrumbList node whose @id is "<detail URL>#breadcrumb" (build it with hubBreadcrumbJsonLd). */
  breadcrumb: JsonLdObject;
  faq: readonly FaqEntry[];
  howTo?: { name: string; description: string; steps: readonly { name: string; text: string }[] };
}

/**
 * Nodes for one template detail page: the ItemPage, its BreadcrumbList, the template entity,
 * the visible FAQ as FAQPage and, when given, the visible steps as HowTo. All cross-linked by @id.
 */
export function templateDetailJsonLd({ template: t, heading, summary, breadcrumb, faq, howTo }: TemplateDetailJsonLdInput): JsonLdObject[] {
  const url = templateDetailUrl(t.slug);
  const pageId = detailPageId(t.slug);
  const image = absoluteUrl(t.previewImage);
  const page: JsonLdObject = {
    "@type": "ItemPage",
    "@id": pageId,
    url,
    name: heading,
    description: summary,
    inLanguage: "en",
    isPartOf: { "@id": SITE_ID },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    mainEntity: { "@id": templateEntityId(t.slug) },
    primaryImageOfPage: { "@type": "ImageObject", url: image },
    datePublished: t.createdAt,
  };
  const nodes = [page, breadcrumb, templateJsonLd(t), faqJsonLd(faq, `${url}#faq`)];
  if (howTo) {
    nodes.push({
      "@type": "HowTo",
      "@id": `${url}#howto`,
      name: howTo.name,
      description: howTo.description,
      tool: [{ "@type": "HowToTool", name: "AI coding agent (Claude Code, Cursor, Codex or Antigravity)" }],
      supply: [{ "@type": "HowToSupply", name: `${t.title} rebuild prompt`, url: templatePromptUrl(t.slug) }],
      step: howTo.steps.map((step, i) => ({ "@type": "HowToStep", position: i + 1, name: step.name, text: step.text, url: `${url}#step-${i + 1}` })),
    });
  }
  return nodes;
}

/** One @graph document; `<` is escaped so template copy can never close the script tag. */
export function serializeJsonLd(nodes: readonly JsonLdObject[]): string {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": nodes }).replace(/</g, "\\u003c");
}
