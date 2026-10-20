import path from "node:path/posix";
import { pathToFileURL } from "node:url";
import { readTemplateFiles } from "./template-files";
import { TEMPLATES, type SourceFile, type TemplateSlug } from "./templates.config";

const SPECIFIER =
  /(?:import|export)\s[^'"`;]*?from\s*['"]([^'"]+)['"]|import\s*['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)/g;

export type IsolationViolation = { path: string; specifier: string };

/** A template may import npm packages and files inside its own `src/app/(<slug>)/` folder only. */
export function findIsolationViolations(slug: string, files: SourceFile[]): IsolationViolation[] {
  const root = `src/app/(${slug})/`;
  const violations: IsolationViolation[] = [];
  for (const file of files) {
    for (const match of file.source.matchAll(SPECIFIER)) {
      const specifier = match[1] ?? match[2] ?? match[3];
      if (isViolation(specifier, file.path, root)) violations.push({ path: file.path, specifier });
    }
  }
  return violations;
}

function isViolation(specifier: string, filePath: string, root: string): boolean {
  if (specifier.startsWith("@/") || specifier.startsWith("~/") || specifier.startsWith("/")) return true;
  if (!specifier.startsWith(".")) return false; // npm package
  const resolved = path.normalize(path.join(path.dirname(filePath), specifier));
  return !resolved.startsWith(root);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  let failed = false;
  for (const slug of Object.keys(TEMPLATES) as TemplateSlug[]) {
    for (const v of findIsolationViolations(slug, readTemplateFiles(slug))) {
      console.error(`isolation: ${v.path} imports "${v.specifier}"`);
      failed = true;
    }
  }
  if (failed) process.exit(1);
  console.log("isolation: ok");
}
