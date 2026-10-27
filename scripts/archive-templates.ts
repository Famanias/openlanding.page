/**
 * Archive / Unarchive Templates CLI
 *
 * Usage:
 *   bun run archive <template name>, <template name>, ...
 *   bun run archive "starlight lab", spaceedu, lucentra
 *   bun run archive --restore <template name>, ...
 *   bun run archive --help
 */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { generateCopyBundles } from "./generate-copy-bundles";

export interface TemplateInfo {
  slug: string;
  title: string;
  archived?: boolean;
}

export interface ParseArchiveResult {
  rawTargets: string[];
  isRestore: boolean;
  help: boolean;
}

export interface ResolutionResult {
  matched: TemplateInfo[];
  unknown: string[];
}

export function parseArchiveArgs(rawArgs: string[]): ParseArchiveResult {
  let isRestore = false;
  let help = false;
  const filteredArgs: string[] = [];

  for (const arg of rawArgs) {
    if (arg === "--restore" || arg === "--unarchive" || arg === "-r" || arg === "-u") {
      isRestore = true;
    } else if (arg === "--help" || arg === "-h") {
      help = true;
    } else {
      filteredArgs.push(arg);
    }
  }

  const joined = filteredArgs.join(" ").trim();
  if (!joined) {
    return { rawTargets: [], isRestore, help };
  }

  let rawTargets: string[] = [];
  if (joined.includes(",")) {
    rawTargets = joined
      .split(",")
      .map((t) => t.trim().replace(/^["']|["']$/g, "").trim())
      .filter(Boolean);
  } else {
    const quotedMatches = [...joined.matchAll(/["']([^"']+)["']/g)].map((m) => m[1].trim());
    if (quotedMatches.length > 1) {
      rawTargets = quotedMatches.filter(Boolean);
    } else {
      rawTargets = [joined.replace(/^["']|["']$/g, "").trim()];
    }
  }

  return { rawTargets, isRestore, help };
}

export function resolveTemplates(rawTargets: string[], allTemplates: TemplateInfo[]): ResolutionResult {
  const matched: TemplateInfo[] = [];
  const matchedSlugs = new Set<string>();
  const unknown: string[] = [];

  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

  const findOne = (query: string): TemplateInfo | undefined => {
    const q = query.trim().toLowerCase();
    if (!q) return undefined;

    // 1. Exact slug match
    const bySlug = allTemplates.find((t) => t.slug.toLowerCase() === q);
    if (bySlug) return bySlug;

    // 2. Exact title match
    const byTitle = allTemplates.find((t) => t.title.toLowerCase() === q);
    if (byTitle) return byTitle;

    // 3. Alphanumeric match
    const qNorm = norm(q);
    const byNorm = allTemplates.find((t) => norm(t.slug) === qNorm || norm(t.title) === qNorm);
    if (byNorm) return byNorm;

    // 4. Starts with title match (e.g. "sundial" matches "SUNDIAL Coffee Roasters")
    const byStart = allTemplates.find((t) => t.title.toLowerCase().startsWith(q));
    if (byStart) return byStart;

    // 5. Title or slug contains query
    const byContains = allTemplates.find((t) => t.title.toLowerCase().includes(q) || t.slug.toLowerCase().includes(q));
    if (byContains) return byContains;

    return undefined;
  };

  for (const target of rawTargets) {
    const directMatch = findOne(target);
    if (directMatch) {
      if (!matchedSlugs.has(directMatch.slug)) {
        matched.push(directMatch);
        matchedSlugs.add(directMatch.slug);
      }
      continue;
    }

    // Try splitting on whitespace if not matching as a single name
    const tokens = target.split(/\s+/).filter(Boolean);
    if (tokens.length > 1) {
      let allSubMatched = true;
      const subMatches: TemplateInfo[] = [];
      for (const tok of tokens) {
        const m = findOne(tok);
        if (m) {
          subMatches.push(m);
        } else {
          allSubMatched = false;
          break;
        }
      }
      if (allSubMatched && subMatches.length > 0) {
        for (const m of subMatches) {
          if (!matchedSlugs.has(m.slug)) {
            matched.push(m);
            matchedSlugs.add(m.slug);
          }
        }
        continue;
      }
    }

    unknown.push(target);
  }

  return { matched, unknown };
}

export function updateTemplatesDataFile(filePath: string, slug: string, archive: boolean): { changed: boolean } {
  let content = fs.readFileSync(filePath, "utf8");

  // Regex to locate the template object block for `slug: "<slug>"`
  const blockRegex = new RegExp(`({\\s*slug:\\s*["']${slug}["'][\\s\\S]*?\\n  },)`, "m");
  const match = content.match(blockRegex);
  if (!match) {
    throw new Error(`Template block for slug "${slug}" not found in ${filePath}`);
  }

  const originalBlock = match[1];
  let updatedBlock = originalBlock;

  if (archive) {
    if (!/archived:\s*true/.test(originalBlock)) {
      // Insert before closing `\n  },`
      updatedBlock = originalBlock.replace(/\r?\n  },$/, `\n    archived: true,\n  },`);
    }
  } else {
    // Restore: remove `archived: true,`
    updatedBlock = originalBlock.replace(/\r?\n\s*archived:\s*true,?\r?/g, "");
  }

  if (updatedBlock !== originalBlock) {
    content = content.replace(originalBlock, updatedBlock);
    fs.writeFileSync(filePath, content, "utf8");
    return { changed: true };
  }

  return { changed: false };
}

export function updateTemplatePageFile(pagePath: string, archive: boolean): { changed: boolean } {
  if (!fs.existsSync(pagePath)) {
    throw new Error(`Page file not found at ${pagePath}`);
  }

  let content = fs.readFileSync(pagePath, "utf8");
  const originalContent = content;

  if (archive) {
    // 1. Ensure import of notFound
    const hasNotFoundImport = /import\s+.*?\bnotFound\b.*?from\s*["']next\/navigation["']/.test(content);
    if (!hasNotFoundImport) {
      if (/import\s*\{([^}]+)\}\s*from\s*["']next\/navigation["']/.test(content)) {
        content = content.replace(/import\s*\{([^}]+)\}\s*from\s*["']next\/navigation["']/, (m, p1) => {
          return `import { notFound, ${p1.trim()} } from "next/navigation"`;
        });
      } else {
        content = `import { notFound } from "next/navigation";\n${content}`;
      }
    }

    // 2. Ensure notFound() is invoked at top of the default export function
    const defaultExportRegex = /(export\s+default\s+(?:async\s+)?function(?:\s+\w+)?\s*\([^)]*\)\s*\{)([\s\S]*?\})/;
    const defaultExportMatch = content.match(defaultExportRegex);

    if (defaultExportMatch) {
      const header = defaultExportMatch[1];
      const body = defaultExportMatch[2];
      if (!/notFound\s*\(\s*\)/.test(body)) {
        content = content.replace(header, `${header}\n  notFound();`);
      }
    }
  } else {
    // Restore:
    // 1. Remove notFound() call from function body
    content = content.replace(/([ \t]*)notFound\s*\(\s*\);?\r?\n?/g, "");

    // 2. Remove notFound import if no longer used
    if (!/notFound/.test(content.replace(/import\s+.*?\bnotFound\b.*?from\s*["']next\/navigation["'];?\r?\n?/, ""))) {
      content = content.replace(/import\s*\{\s*notFound\s*\}\s*from\s*["']next\/navigation["'];?\r?\n?/, "");
      content = content.replace(/import\s*\{\s*notFound\s*,\s*/, "import { ");
      content = content.replace(/,\s*notFound\s*\}/, " }");
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(pagePath, content, "utf8");
    return { changed: true };
  }

  return { changed: false };
}

export function updateE2eTemplatesList(filePath: string, slug: string, archive: boolean): { changed: boolean } {
  if (!fs.existsSync(filePath)) return { changed: false };
  let content = fs.readFileSync(filePath, "utf8");
  const original = content;

  const slugPath = slug.startsWith("/") ? slug : `/${slug}`;
  const slugEntry = `"${slugPath}"`;

  if (archive) {
    if (content.includes(slugEntry)) {
      content = content.replace(new RegExp(`,?\\s*${slugEntry.replace('/', '\\/')}\\s*,?`), ", ");
      content = content.replace(/\[\s*,/g, "[").replace(/,\s*\]/g, "]").replace(/,\s*,/g, ", ");
    }
  } else {
    if (!content.includes(slugEntry)) {
      content = content.replace(/TEMPLATE_PATHS:\s*string\[\]\s*=\s*\[/, (m) => `${m}${slugEntry}, `);
    }
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, "utf8");
    return { changed: true };
  }
  return { changed: false };
}

export function loadTemplatesData(filePath: string): TemplateInfo[] {
  const content = fs.readFileSync(filePath, "utf8");
  const templates: TemplateInfo[] = [];

  const entryRegex = /{\s*slug:\s*["']([^"']+)["'],\s*title:\s*["']([^"']+)["']([\s\S]*?)\n  },/g;
  for (const match of content.matchAll(entryRegex)) {
    const slug = match[1];
    const title = match[2];
    const body = match[3];
    const archived = /archived:\s*true/.test(body);
    templates.push({ slug, title, archived });
  }

  return templates;
}

export async function archiveTemplatesCli(args: string[]): Promise<void> {
  const parsed = parseArchiveArgs(args);

  if (parsed.help) {
    console.log(`
Template Archiving CLI

Usage:
  bun run archive <template name>, <template name>, ...
  bun run archive "starlight lab", spaceedu, lucentra
  bun run archive --restore <template name>, ...
  bun run archive --help

Examples:
  bun run archive starlight lab, spaceedu, lucentra, morrow, sundial
  bun run archive --restore morrow
`);
    return;
  }

  if (parsed.rawTargets.length === 0) {
    console.error("Error: No template names provided.");
    console.log("Usage: bun run archive <template name>, <template name>, ...");
    process.exit(1);
  }

  const templatesDataPath = path.resolve(process.cwd(), "src/app/(index)/data/templates.ts");
  const e2eTemplatesPath = path.resolve(process.cwd(), "tests/e2e/templates.ts");
  const allTemplates = loadTemplatesData(templatesDataPath);

  const { matched, unknown } = resolveTemplates(parsed.rawTargets, allTemplates);

  if (unknown.length > 0) {
    for (const u of unknown) {
      console.warn(`⚠ Warning: Could not find template matching "${u}"`);
    }
  }

  if (matched.length === 0) {
    console.error("Error: None of the requested templates could be found.");
    process.exit(1);
  }

  const isArchive = !parsed.isRestore;
  const actionName = isArchive ? "Archiving" : "Restoring";
  console.log(`\n${actionName} ${matched.length} template(s)...\n`);

  let anyChanged = false;

  for (const template of matched) {
    const pagePath = path.resolve(process.cwd(), `src/app/(${template.slug})/${template.slug}/page.tsx`);

    const dataResult = updateTemplatesDataFile(templatesDataPath, template.slug, isArchive);
    const pageResult = updateTemplatePageFile(pagePath, isArchive);
    updateE2eTemplatesList(e2eTemplatesPath, template.slug, isArchive);

    const changed = dataResult.changed || pageResult.changed;
    if (changed) {
      anyChanged = true;
      if (isArchive) {
        console.log(`  ✓ Archived "${template.title}" (${template.slug}): hidden from gallery and disabled at /${template.slug} (404)`);
      } else {
        console.log(`  ✓ Restored "${template.title}" (${template.slug}): visible in gallery and accessible at /${template.slug}`);
      }
    } else {
      if (isArchive) {
        console.log(`  ℹ "${template.title}" (${template.slug}) is already archived.`);
      } else {
        console.log(`  ℹ "${template.title}" (${template.slug}) is already active.`);
      }
    }
  }

  if (anyChanged) {
    console.log("\nSynchronizing copy bundles...");
    try {
      generateCopyBundles();
      console.log("✓ Copy bundles synchronized.");
    } catch (err) {
      console.warn("⚠ Notice: copy bundle generation skipped or encountered an error:", err);
    }
  }

  console.log(`\nDone.`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  archiveTemplatesCli(process.argv.slice(2)).catch((err) => {
    console.error("Fatal error:", err);
    process.exit(1);
  });
}
