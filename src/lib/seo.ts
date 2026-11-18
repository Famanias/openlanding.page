import { TEMPLATES, type TemplateItem } from "../app/(index)/data/templates";
import { absoluteUrl, SITE_NAME, SITE_URL } from "./site";
import { templatePath } from "./template-routing";

/** Templates that are publicly listed (archived ones are excluded from discovery surfaces). */
export const PUBLIC_TEMPLATES: readonly TemplateItem[] = TEMPLATES;

export const SITE_DESCRIPTION =
  "openlandingpage is a free, MIT-licensed gallery of complete landing page templates, from header to footer. Every template ships with its source and an AI rebuild prompt.";

export function templateUrl(slug: string): string {
  return absoluteUrl(templatePath(slug));
}

export function templatePromptUrl(slug: string): string {
  return absoluteUrl(`/copy/${slug}-prompt.md`);
}

/** Canonical Link header per template page; template layouts are isolated and cannot import shared metadata. */
export function templateCanonicalHeaders(slugs: readonly string[]) {
  return [...new Set(slugs)].map(slug => ({
    source: templatePath(slug),
    headers: [{ key: "Link", value: `<${templateUrl(slug)}>; rel="canonical"` }],
  }));
}

function templateLine(t: TemplateItem): string {
  return `- [${t.title}](${templateUrl(t.slug)}): ${t.description} Industry: ${t.industry}. Stack: ${t.stack}. Rebuild prompt: ${templatePromptUrl(t.slug)}`;
}

const HEADER = [
  `# ${SITE_NAME}`,
  "",
  `> ${SITE_DESCRIPTION}`,
  "",
  `- Site: ${SITE_URL}`,
  "- License: MIT for templates and contributed HTML; linked community websites keep their own terms.",
  "- Template pages live at /templates/<slug>; each rebuild prompt is plain Markdown at /copy/<slug>-prompt.md.",
  "- Source: https://github.com/Famanias/openlanding.page",
  "",
];

export function buildLlmsTxt(templates: readonly TemplateItem[] = PUBLIC_TEMPLATES): string {
  return [...HEADER, "## Templates", "", ...templates.map(templateLine), "", "## Optional", "", `- [Full index with prompts](${absoluteUrl("/llms-full.txt")})`, ""].join("\n");
}

export function buildLlmsFullTxt(templates: readonly TemplateItem[] = PUBLIC_TEMPLATES): string {
  const sections = templates.map(t =>
    [`## ${t.title}`, "", `- URL: ${templateUrl(t.slug)}`, `- Prompt: ${templatePromptUrl(t.slug)}`, `- Industry: ${t.industry}`, `- Stack: ${t.stack}`, `- Categories: ${t.categories.join(", ")}`, "", t.description, "", t.promptMarkdown.trim(), ""].join("\n"),
  );
  return [...HEADER, ...sections].join("\n");
}
