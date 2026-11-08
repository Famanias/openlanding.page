import fs from "node:fs";
import path from "node:path";
import { RAW_TEMPLATES } from "../../src/app/(index)/data/templates";

export type StandaloneSlug = string;
export type TemplateRegistration = {
  slug: string;
  hasDownload?: boolean;
  category?: string;
  categories?: readonly string[];
};
export type StandaloneTemplate = {
  slug: string;
  entry: string;
  hasDownload: boolean;
  categories: readonly string[];
};
const PAGE_FILES = ["page.tsx", "page.ts", "page.jsx", "page.js"];

function validateSlug(slug: string) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`Invalid template slug: ${slug}`);
}
function inside(file: string, directory: string) {
  const relative = path.relative(directory, file);
  return relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}
function componentTemplate(template: TemplateRegistration, root: string): StandaloneTemplate | undefined {
  validateSlug(template.slug);
  const directory = path.resolve(root, "src/app", `(${template.slug})`, template.slug);
  const entry = PAGE_FILES.map(file => path.join(directory, file)).find(file => fs.existsSync(file) && fs.statSync(file).isFile());
  if (!entry) return undefined;
  const project = fs.realpathSync(root);
  const app = fs.realpathSync(path.join(root, "src/app"));
  if (!inside(app, project) || !inside(fs.realpathSync(entry), app)) throw new Error(`Template page escapes the project: ${template.slug}`);
  return {
    slug: template.slug, entry, hasDownload: Boolean(template.hasDownload),
    categories: template.categories?.length ? template.categories : template.category ? [template.category] : [],
  };
}

/** The gallery is authoritative; component-backed templates need no separate export registration. */
export function discoverStandaloneTemplates(root = process.cwd(), templates: readonly TemplateRegistration[] = RAW_TEMPLATES): StandaloneTemplate[] {
  return templates.flatMap(template => {
    const discovered = componentTemplate(template, root);
    return discovered ? [discovered] : [];
  });
}
export function resolveStandaloneTemplate(slug: string, root = process.cwd(), templates: readonly TemplateRegistration[] = RAW_TEMPLATES): StandaloneTemplate {
  validateSlug(slug);
  const registration = templates.find(template => template.slug === slug);
  if (!registration) throw new Error(`Unknown template: ${slug}. Register it in the gallery before exporting.`);
  const template = componentTemplate(registration, root);
  if (!template) throw new Error(`Template ${slug} has no component page at src/app/(${slug})/${slug}/page.{tsx,ts,jsx,js}. Imported HTML-only routes keep their canonical public/downloads/${slug}.html file.`);
  return template;
}

// This is a discovered snapshot for test enumeration, not an export allowlist.
export const STANDALONE_SLUGS = discoverStandaloneTemplates().map(template => template.slug);
export const GRAPHICS_SLUGS = discoverStandaloneTemplates().filter(template => template.categories.includes("3d")).map(template => template.slug);

export function selectSlugs(args: string[], options: { root?: string; templates?: readonly TemplateRegistration[] } = {}): string[] {
  const root = options.root ?? process.cwd();
  const templates = options.templates ?? RAW_TEMPLATES;
  if (!args.length || args[0].startsWith("--")) {
    const selector = args[0] ?? "--all";
    if (!["--all", "--3d", "--remaining"].includes(selector)) throw new Error(`Unknown export option: ${selector}`);
    if (args.length > 1) throw new Error("Use one selector by itself, or provide template slugs.");
    return discoverStandaloneTemplates(root, templates)
      .filter(template => selector === "--3d" ? template.categories.includes("3d") : selector === "--remaining" ? !template.hasDownload : true)
      .map(template => template.slug);
  }
  return [...new Set(args)].map(slug => resolveStandaloneTemplate(slug, root, templates).slug);
}
