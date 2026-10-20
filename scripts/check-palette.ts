import { pathToFileURL } from "node:url";
import { readTemplateFiles } from "./template-files";
import { TEMPLATES, type SourceFile, type TemplateSlug } from "./templates.config";

// A hex colour: 3, 4, 6 or 8 hex digits not followed by another word character.
// `&#8594;` (4 digits then `;`) is excluded by requiring the `#` not to follow `&`.
const HEX = /(?<!&)#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![0-9a-zA-Z_-])/g;

export type PaletteViolation = { path: string; hex: string };

export function findPaletteViolations(slug: TemplateSlug, files: SourceFile[]): PaletteViolation[] {
  const { palette, paletteExempt = [] } = TEMPLATES[slug];
  const allowed = new Set(palette.map((h) => h.toUpperCase()));
  const violations: PaletteViolation[] = [];
  for (const file of files) {
    if (paletteExempt.some((prefix) => file.path.startsWith(prefix))) continue;
    for (const match of file.source.matchAll(HEX)) {
      if (!allowed.has(normalise(match[1]))) violations.push({ path: file.path, hex: match[0] });
    }
  }
  return violations;
}

function normalise(digits: string): string {
  const d = digits.length <= 4 ? [...digits].map((c) => c + c).join("") : digits;
  return `#${d.slice(0, 6).toUpperCase()}`;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  let failed = false;
  for (const slug of Object.keys(TEMPLATES) as TemplateSlug[]) {
    for (const v of findPaletteViolations(slug, readTemplateFiles(slug))) {
      console.error(`palette: ${v.path} uses ${v.hex}, outside the ${slug} palette`);
      failed = true;
    }
  }
  if (failed) process.exit(1);
  console.log("palette: ok");
}
