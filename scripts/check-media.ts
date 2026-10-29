import { existsSync, readdirSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { readTemplateFiles } from "./template-files";
import { TEMPLATES, type SourceFile, type TemplateSlug } from "./templates.config";

export type MediaViolation = {
  slug: string;
  type: "missing_file" | "missing_picture_usage" | "unregistered_asset_key";
  message: string;
};

/**
 * Validates that templates with registered assets in `assets.generated.ts`:
 * 1. Have corresponding generated webp files on disk in `public/templates/<slug>/`.
 * 2. Actually use `<Picture>` / `<Plate>` or `ASSETS` in their template components so images are rendered.
 * 3. Do not reference unregistered asset keys in template components.
 */
export function findMediaViolations(slug: string, files: SourceFile[]): MediaViolation[] {
  const config = TEMPLATES[slug as TemplateSlug];
  if (config?.mediaExempt) return [];

  const genPath = `src/app/(${slug})/${slug}/assets.generated.ts`;
  if (!existsSync(genPath)) return [];

  const content = readFileSync(genPath, "utf8");
  const assetKeys: string[] = [];
  for (const m of content.matchAll(/"([^"]+)":\s*\{\s*"w":/g)) {
    assetKeys.push(m[1]);
  }
  if (assetKeys.length === 0) return [];

  const violations: MediaViolation[] = [];
  const pubDir = `public/templates/${slug}`;

  // 1. Check generated files exist on disk in pubDir
  if (!existsSync(pubDir)) {
    violations.push({
      slug,
      type: "missing_file",
      message: `Assets registered in ${genPath} but public directory ${pubDir} does not exist`,
    });
  } else {
    const pubFiles = readdirSync(pubDir);
    for (const key of assetKeys) {
      if (!pubFiles.includes(`${key}-800.webp`)) {
        violations.push({
          slug,
          type: "missing_file",
          message: `Registered asset "${key}" is missing generated file ${pubDir}/${key}-800.webp`,
        });
      }
      if (!pubFiles.includes(`${key}-1600.webp`)) {
        violations.push({
          slug,
          type: "missing_file",
          message: `Registered asset "${key}" is missing generated file ${pubDir}/${key}-1600.webp`,
        });
      }
    }
  }

  // 2. Filter code files (ignore generated module, test files, and assets wrapper definition)
  const codeFiles = files.filter(
    (f) =>
      !f.path.endsWith("assets.generated.ts") &&
      !f.path.includes(".test.") &&
      !f.path.endsWith("assets.tsx"),
  );

  const usesAssets = codeFiles.some(
    (f) =>
      f.source.includes("<Picture") ||
      f.source.includes("Picture(") ||
      f.source.includes("Picture ") ||
      f.source.includes("<Plate") ||
      f.source.includes('from "../assets"') ||
      f.source.includes("from '../assets'") ||
      f.source.includes('from "./assets"') ||
      f.source.includes("from './assets'") ||
      f.source.includes("assets.generated") ||
      f.source.includes("ASSETS") ||
      f.source.includes("assetSrc") ||
      f.source.includes("hasAsset"),
  );

  if (!usesAssets) {
    violations.push({
      slug,
      type: "missing_picture_usage",
      message: `Template has ${assetKeys.length} registered asset(s) in assets.generated.ts, but neither <Picture> nor ASSETS is used in template components`,
    });
  }

  // 3. Check for unregistered assetKey references in JSX/code
  for (const file of codeFiles) {
    for (const match of file.source.matchAll(/assetKey\s*(?:=|\:)\s*["']([^"']+)["']/g)) {
      const referencedKey = match[1];
      if (!assetKeys.includes(referencedKey)) {
        violations.push({
          slug,
          type: "unregistered_asset_key",
          message: `File ${file.path} references assetKey "${referencedKey}", but "${referencedKey}" is not registered in ${genPath}`,
        });
      }
    }
  }

  return violations;
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  let failed = false;
  for (const slug of Object.keys(TEMPLATES) as TemplateSlug[]) {
    const download = `public/downloads/${slug}.html`;
    if (TEMPLATES[slug].hasDownload !== existsSync(download)) {
      console.error(`media [${slug}]: download registration must match ${download}`);
      failed = true;
    } else if (TEMPLATES[slug].hasDownload) {
      const html = readFileSync(download, "utf8");
      if (!/<h1[\s>]/i.test(html) || /\/_next\//.test(html) || /<base[\s>]/i.test(html)) {
        console.error(`media [${slug}]: standalone HTML needs an h1 and must not depend on Next or a base URL`);
        failed = true;
      }
    }
    const violations = findMediaViolations(slug, readTemplateFiles(slug));
    for (const v of violations) {
      console.error(`media [${v.slug}]: ${v.message}`);
      failed = true;
    }
  }
  if (failed) process.exit(1);
  console.log("media: ok");
}
