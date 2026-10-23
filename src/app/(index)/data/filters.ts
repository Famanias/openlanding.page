import { CATEGORIES, type CategoryId, type TemplateItem } from "./templates";

export const MODEL_FILTERS = [
  { id: "all", label: "All models" },
  { id: "claude", label: "Claude" },
  { id: "openai", label: "OpenAI" },
  { id: "gemini", label: "Gemini" },
  { id: "other", label: "Other" },
] as const;
export type ModelFilter = (typeof MODEL_FILTERS)[number]["id"];
export interface GalleryFilters { category: CategoryId; model: ModelFilter; query: string }

export function modelFamily(model: string): Exclude<ModelFilter, "all"> {
  if (/claude/i.test(model)) return "claude";
  if (/openai|gpt|codex|^o[1-9](?:\b|\s)/i.test(model)) return "openai";
  if (/gemini/i.test(model)) return "gemini";
  return "other";
}

export function readFilters(search: string): GalleryFilters {
  const params = new URLSearchParams(search);
  return {
    category: CATEGORIES.find((item) => item.id === params.get("category"))?.id ?? "all",
    model: MODEL_FILTERS.find((item) => item.id === params.get("model"))?.id ?? "all",
    query: (params.get("q") ?? "").slice(0, 160),
  };
}

export function filterTemplates(templates: TemplateItem[], filters: GalleryFilters) {
  const terms = filters.query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return templates.filter((template) => {
    if (filters.category !== "all" && filters.category !== template.category) return false;
    if (filters.model !== "all" && filters.model !== modelFamily(template.model)) return false;
    const category = CATEGORIES.find((item) => item.id === template.category)?.label ?? "";
    const haystack = [template.title, template.description, template.industry, template.stack,
      template.model, modelFamily(template.model), category, ...template.badges].join(" ").toLocaleLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}
