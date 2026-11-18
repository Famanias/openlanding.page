import type { TemplateItem } from "../data/templates";

export interface AboutFacts {
  templateCount: number;
  downloadCount: number;
  /** e.g. "Claude, Gemini and GPT models": provider families from each template's `model`, alphabetical. */
  modelFamilies: string;
  /** Month of the earliest template, e.g. "October 2026". */
  firstPublished: string;
}

const FAMILIES: [RegExp, string][] = [
  [/^claude/i, "Claude"],
  [/^gemini/i, "Gemini"],
  [/^gpt/i, "GPT"],
];

function listJoin(items: readonly string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;
}

/** Facts for the About page, derived from the registry so the copy never goes stale. */
export function aboutFacts(templates: readonly Pick<TemplateItem, "model" | "createdAt" | "hasDownload">[]): AboutFacts {
  const families = new Set<string>();
  for (const t of templates) {
    const match = FAMILIES.find(([pattern]) => pattern.test(t.model.trim()));
    if (match) families.add(match[1]);
  }
  const first = templates.map(t => t.createdAt).sort()[0];
  const firstPublished = first
    ? new Date(`${first}T00:00:00Z`).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" })
    : "";
  return {
    templateCount: templates.length,
    downloadCount: templates.filter(t => t.hasDownload).length,
    modelFamilies: families.size ? `${listJoin([...families].sort((a, b) => a.localeCompare(b)))} models` : "AI coding agents",
    firstPublished,
  };
}
