/**
 * Copy for the per-template detail pages (/landing-page-templates/<slug>).
 * Pure functions of the template registry, so the visible page, its metadata and its JSON-LD
 * (FAQPage, HowTo) are built from the same strings and can never drift apart.
 * Relative imports only: src/lib and Vitest import this file.
 */
import { CATEGORIES, type TemplateCategory, type TemplateItem } from "../../data/templates";
import type { FaqEntry } from "../../data/faq";
import { SITE_NAME } from "../../../../lib/site";

export const DETAIL_TITLE_MAX = 65;
export const DETAIL_DESCRIPTION_MAX = 160;
export const AI_AGENTS = "Claude Code, Cursor, Codex or Antigravity";

export interface HowToStep {
  name: string;
  text: string;
}

/** Find a publicly listed template by slug (archived and unknown slugs return undefined). */
export function findTemplate(templates: readonly TemplateItem[], slug: string): TemplateItem | undefined {
  return templates.find(t => t.slug === slug);
}

/** "Next.js 16 · Tailwind v4 · React 19" → "Next.js 16, Tailwind v4 and React 19". */
export function formatStack(stack: string): string {
  const parts = stack.split("·").map(part => part.trim()).filter(Boolean);
  if (parts.length <= 1) return parts.join("");
  return `${parts.slice(0, -1).join(", ")} and ${parts.at(-1)}`;
}

/** The platform keyword used in titles: Next.js for app templates, HTML for the static-HTML ones. */
export function templatePlatform(t: Pick<TemplateItem, "stack">): "Next.js" | "HTML" {
  return t.stack.includes("Next.js") ? "Next.js" : "HTML";
}

export function categoryLabel(id: TemplateCategory): string {
  return CATEGORIES.find(c => c.id === id)?.label ?? id;
}

/**
 * Keyword-bearing <title>: "<Title>: free <industry> landing page template (Next.js, MIT) | OpenLandingPage",
 * dropping the least important parts until it fits in DETAIL_TITLE_MAX characters
 * (stack/license note, then the brand suffix, then swapping a long industry for the primary category).
 */
export function detailTitle(t: Pick<TemplateItem, "title" | "industry" | "category" | "stack">): string {
  const note = `(${templatePlatform(t)}, MIT)`;
  const brand = `| ${SITE_NAME}`;
  const base = (topic: string) => `${t.title}: free ${topic} landing page template`;
  const candidates = [
    `${base(t.industry)} ${note} ${brand}`,
    `${base(t.industry)} ${note}`,
    `${base(t.industry)} ${brand}`,
    base(t.industry),
    `${base(categoryLabel(t.category))} ${note}`,
    base(categoryLabel(t.category)),
    `${t.title}: free landing page template`,
  ];
  return candidates.find(c => c.length <= DETAIL_TITLE_MAX) ?? candidates.at(-1)!;
}

/** Visible H1. */
export function detailHeading(t: Pick<TemplateItem, "title">): string {
  return `${t.title} landing page template`;
}

/** Answer-first one-sentence definition, quoted by answer engines. */
export function detailSummary(t: Pick<TemplateItem, "title" | "industry" | "stack">): string {
  return `${t.title} is a free, MIT-licensed ${t.industry} landing page template built with ${formatStack(t.stack)}.`;
}

function firstSentence(text: string): string {
  const match = text.match(/^.*?[.!?](?=\s|$)/);
  return (match ? match[0] : text).trim();
}

/** Meta description: the summary first, then whole sentences only while they fit (never cut mid-word). */
export function detailDescription(t: Pick<TemplateItem, "title" | "industry" | "stack" | "description" | "hasDownload">): string {
  const summary = detailSummary(t);
  if (summary.length > DETAIL_DESCRIPTION_MAX) {
    const cut = summary.slice(0, DETAIL_DESCRIPTION_MAX - 1);
    return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
  }
  const extras = [firstSentence(t.description), t.hasDownload ? "Live demo, AI rebuild prompt and HTML download." : "Live demo and AI rebuild prompt."];
  let out = summary;
  for (const extra of extras) {
    if (`${out} ${extra}`.length <= DETAIL_DESCRIPTION_MAX) out = `${out} ${extra}`;
  }
  return out;
}

/** Numbered "use it with an AI coding agent" steps, rendered visibly and as HowTo JSON-LD. */
export function buildHowToSteps(t: Pick<TemplateItem, "title" | "slug" | "stack" | "hasDownload">): HowToStep[] {
  const platform = templatePlatform(t);
  return [
    {
      name: "Copy the rebuild prompt",
      text: `Use Copy prompt on this page, or open ${promptPath(t.slug)}. It is plain Markdown describing ${t.title}'s layout, palette, typography and interactions.`,
    },
    {
      name: "Paste it into your AI coding agent",
      text: `Paste the prompt into ${AI_AGENTS} in a ${platform === "Next.js" ? "new or existing Next.js project" : "new project folder"}. The agent rebuilds the page with ${formatStack(t.stack)}.`,
    },
    {
      name: "Adapt the brand and copy",
      text: `Ask the agent to replace the fictional ${t.title} brand, copy, images and colours with your own, keeping the sections and interactions that suit your page.`,
    },
    {
      name: "Deploy",
      text: platform === "Next.js"
        ? `Build and deploy it like any Next.js site, for example on Vercel, Netlify or your own server.${t.hasDownload ? " Prefer no build step? Download the standalone HTML instead." : ""}`
        : "Upload the HTML file to any static host, such as Vercel, Netlify, GitHub Pages or your own server. No build step is needed.",
    },
  ];
}

/** One-sentence answer that opens the how-to section. */
export function howToSummary(t: Pick<TemplateItem, "title">): string {
  return `To use ${t.title} with an AI coding agent, copy its rebuild prompt, paste it into ${AI_AGENTS}, adapt the brand and copy, then deploy.`;
}

/** Per-template FAQ, answer-first, rendered visibly and mirrored as FAQPage JSON-LD. */
export function buildTemplateFaq(t: Pick<TemplateItem, "title" | "stack" | "model" | "hasDownload">): FaqEntry[] {
  const platform = templatePlatform(t);
  return [
    {
      question: `Is ${t.title} free?`,
      answer: `Yes. ${t.title} is free and open source under the MIT License, with no sign-up or paywall. You can open the live template, copy its AI rebuild prompt${t.hasDownload ? " or download the standalone HTML" : ""}.`,
    },
    {
      question: `What is ${t.title} built with?`,
      answer: `${t.title} is built with ${formatStack(t.stack)}. ${t.model ? `It was created with ${t.model} from the rebuild prompt published alongside it.` : "Its rebuild prompt is published alongside it."}`,
    },
    {
      question: `Can I use ${t.title} commercially?`,
      answer: `Yes. The MIT License allows commercial use, modification and redistribution, including client work, as long as you keep the copyright and license notice. Replace the fictional brand, copy and imagery with your own before you publish.`,
    },
    {
      question: `How do I customise ${t.title} with AI?`,
      answer: `Copy its rebuild prompt, paste it into ${AI_AGENTS}, and ask the agent to swap in your brand, copy and colours. The prompt describes the layout, palette, typography and interactions, so the agent can rebuild and adapt the page in your own ${platform === "Next.js" ? "Next.js project" : "HTML project"}.`,
    },
    {
      question: `Can I import ${t.title} into Webflow?`,
      answer: `Yes. Use Copy Webflow prompt on this page or connect the OpenLanding MCP (/api/mcp) alongside the official Webflow MCP in ${AI_AGENTS} to build native Webflow variables, styles, sections and custom-code embeds.`,
    },
  ];
}

/**
 * Other templates sharing the most categories with `t`, most overlap first, then same industry,
 * then registry order (newest first). Topped up with the newest templates so there are at least `min`.
 */
export function relatedTemplates(t: TemplateItem, templates: readonly TemplateItem[], limit = 6, min = 4): TemplateItem[] {
  const own = new Set(t.categories);
  const scored = templates
    .map((other, index) => ({ other, index, shared: other.categories.filter(c => own.has(c)).length, sameIndustry: other.industry === t.industry ? 1 : 0 }))
    .filter(entry => entry.other.slug !== t.slug);
  const sharing = scored
    .filter(entry => entry.shared > 0)
    .sort((a, b) => b.shared - a.shared || b.sameIndustry - a.sameIndustry || a.index - b.index)
    .slice(0, limit)
    .map(entry => entry.other);
  if (sharing.length >= min) return sharing;
  const fill = scored.map(entry => entry.other).filter(other => !sharing.includes(other));
  return [...sharing, ...fill.slice(0, min - sharing.length)];
}

/** Top-of-page capture shown on gallery cards (exists for every template; dimensions vary, shown 16:9 cropped from the top). */
export function galleryCapturePath(slug: string): string {
  return `/gallery/${slug}.webp`;
}

/** Social card image: the template's preview image, or its gallery capture when the preview is an SVG (unsupported by social cards). */
export function detailSocialImagePath(t: Pick<TemplateItem, "slug" | "previewImage">): string {
  return t.previewImage.toLowerCase().endsWith(".svg") ? galleryCapturePath(t.slug) : t.previewImage;
}

export function promptPath(slug: string): string {
  return `/copy/${slug}-prompt.md`;
}

export function webflowPromptPath(slug: string): string {
  return `/copy/${slug}-webflow-prompt.md`;
}

export function webflowManifestPath(slug: string): string {
  return `/copy/${slug}-webflow.json`;
}

export function downloadPath(slug: string): string {
  return `/downloads/${slug}.html`;
}

/** "2026-10-21" → "October 21, 2026", independent of the server's timezone. */
export function formatCreatedDate(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("en-US", { timeZone: "UTC", year: "numeric", month: "long", day: "numeric" });
}
