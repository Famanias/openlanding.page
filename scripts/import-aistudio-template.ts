import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

// Supported Google fonts in next/font/google with standard configurations
const KNOWN_GOOGLE_FONTS: Record<string, { importName: string; variable: string }> = {
  "DM Sans": { importName: "DM_Sans", variable: "--font-dm-sans" },
  "JetBrains Mono": { importName: "JetBrains_Mono", variable: "--font-jetbrains-mono" },
  "Inter": { importName: "Inter", variable: "--font-inter" },
  "Plus Jakarta Sans": { importName: "Plus_Jakarta_Sans", variable: "--font-plus-jakarta-sans" },
  "Cormorant Garamond": { importName: "Cormorant_Garamond", variable: "--font-cormorant-garamond" },
  "Fraunces": { importName: "Fraunces", variable: "--font-fraunces" },
  "Space Grotesk": { importName: "Space_Grotesk", variable: "--font-space-grotesk" },
  "Playfair Display": { importName: "Playfair_Display", variable: "--font-playfair-display" },
  "Outfit": { importName: "Outfit", variable: "--font-outfit" },
  "Syne": { importName: "Syne", variable: "--font-syne" },
  "Geist": { importName: "Geist", variable: "--font-geist" },
  "Geist Mono": { importName: "Geist_Mono", variable: "--font-geist-mono" },
  "Cinzel": { importName: "Cinzel", variable: "--font-cinzel" },
  "Manrope": { importName: "Manrope", variable: "--font-manrope" },
  "Montserrat": { importName: "Montserrat", variable: "--font-montserrat" },
  "Poppins": { importName: "Poppins", variable: "--font-poppins" },
  "Lora": { importName: "Lora", variable: "--font-lora" },
  "Cinzel Decorative": { importName: "Cinzel_Decorative", variable: "--font-cinzel-decorative" },
};

interface ParsedMeta {
  title: string;
  description: string;
  brandName: string;
  bodyClasses: string;
  fonts: Array<{ name: string; originalFamily: string }>;
  googleFontsLink?: string;
  palette: string[];
}

function parseCliArgs() {
  const args = process.argv.slice(2);
  let repoOrPath = "";
  let slug = "";
  let title = "";
  let category = "scroll-showcase";
  let dryRun = false;
  let force = false;
  let noRegister = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--slug" && args[i + 1]) {
      slug = args[++i];
    } else if (arg === "--title" && args[i + 1]) {
      title = args[++i];
    } else if (arg === "--category" && args[i + 1]) {
      category = args[++i];
    } else if (arg === "--dry-run") {
      dryRun = true;
    } else if (arg === "--force") {
      force = true;
    } else if (arg === "--no-register") {
      noRegister = true;
    } else if (!arg.startsWith("-") && !repoOrPath) {
      repoOrPath = arg;
    }
  }

  return { repoOrPath, slug, title, category, dryRun, force, noRegister };
}

function toPascalCase(str: string): string {
  return str
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
    .replace(/^([a-z])/, (_, chr) => chr.toUpperCase())
    .replace(/[^a-zA-Z0-9]/g, "");
}

function sanitizeSlug(raw: string): string {
  return raw.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function resolveSourceDir(target: string, repoRoot: string): { sourceDir: string; repoName: string } {
  const localCandidate = path.isAbsolute(target) ? target : path.resolve(process.cwd(), target);
  if (fs.existsSync(localCandidate) && fs.statSync(localCandidate).isDirectory()) {
    return { sourceDir: localCandidate, repoName: path.basename(localCandidate) };
  }

  let fullRepo = target;
  if (!fullRepo.includes("/") && !fullRepo.startsWith("http")) {
    fullRepo = `Famanias/${fullRepo}`;
  }

  const repoName = fullRepo.split("/").pop()!.replace(/\.git$/, "");
  const tempBase = path.join(repoRoot, ".openlanding-page", ".temp-imports");
  fs.mkdirSync(tempBase, { recursive: true });
  const cloneTarget = path.join(tempBase, repoName);

  if (fs.existsSync(cloneTarget)) {
    console.log(`[import] Existing clone found at ${cloneTarget}, pulling latest...`);
    try {
      execSync("git pull", { cwd: cloneTarget, stdio: "ignore" });
    } catch {
      // Ignore
    }
  } else {
    console.log(`[import] Cloning ${fullRepo} into ${cloneTarget}...`);
    try {
      execSync(`gh repo clone ${fullRepo} "${cloneTarget}"`, { stdio: "inherit" });
    } catch {
      execSync(`git clone https://github.com/${fullRepo}.git "${cloneTarget}"`, { stdio: "inherit" });
    }
  }

  return { sourceDir: cloneTarget, repoName };
}

function extractMetadata(sourceDir: string, fallbackTitle: string): ParsedMeta {
  let title = fallbackTitle;
  let description = "A modern, responsive landing page template.";
  let brandName = fallbackTitle;
  let bodyClasses = "bg-[#0b0b0b] text-[#f4f0e8] antialiased";
  const fonts: Array<{ name: string; originalFamily: string }> = [];
  let googleFontsLink: string | undefined;
  const paletteSet = new Set<string>();

  // 1. Read metadata.json if present
  const metaJsonPath = path.join(sourceDir, "metadata.json");
  if (fs.existsSync(metaJsonPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(metaJsonPath, "utf-8"));
      if (data.name) {
        title = data.name;
        brandName = data.name.split(/[—–:-]/)[0].trim();
      }
      if (data.description) {
        description = data.description;
      }
    } catch {
      // Ignore
    }
  }

  // 2. Read index.html
  const indexPath = path.join(sourceDir, "index.html");
  if (fs.existsSync(indexPath)) {
    const html = fs.readFileSync(indexPath, "utf-8");

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch && (!title || title === fallbackTitle)) {
      title = titleMatch[1].trim();
      brandName = title.split(/[—–:-]/)[0].trim();
    }

    const descMatch =
      html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);
    if (descMatch) {
      description = descMatch[1].trim();
    }

    const bodyMatch = html.match(/<body[^>]*class=["']([^"']+)["']/i);
    if (bodyMatch) {
      bodyClasses = bodyMatch[1].trim();
    }

    const fontLinkMatch = html.match(/href=["'](https:\/\/fonts\.googleapis\.com\/css2\?[^"']+)["']/i);
    if (fontLinkMatch) {
      googleFontsLink = fontLinkMatch[1].replace(/&amp;/g, "&");
      const urlParams = new URL(googleFontsLink).searchParams;
      const families = urlParams.getAll("family");
      for (const fam of families) {
        const familyName = fam.split(":")[0].replace(/\+/g, " ").trim();
        fonts.push({ name: familyName, originalFamily: fam });
      }
    }
  }

  // 3. Extract palette colors
  const cssPath = path.join(sourceDir, "src", "index.css");
  let cssText = "";
  if (fs.existsSync(cssPath)) {
    cssText = fs.readFileSync(cssPath, "utf-8");
  }

  const combinedText = `${cssText} ${bodyClasses}`;
  const hexMatches = combinedText.match(/#[0-9a-fA-F]{6}\b/g) || [];
  for (const hex of hexMatches) {
    paletteSet.add(hex.toUpperCase());
  }

  let palette = Array.from(paletteSet).slice(0, 10);
  if (palette.length === 0) {
    palette = ["#0B0B0B", "#141414", "#F4F0E8", "#29313E", "#66717F"];
  }

  return {
    title,
    description,
    brandName: brandName || title || "Template",
    bodyClasses,
    fonts,
    googleFontsLink,
    palette,
  };
}

function deriveSlug(givenSlug: string, repoName: string, brandName: string): string {
  if (givenSlug) {
    return sanitizeSlug(givenSlug);
  }

  if (brandName && brandName.length > 2 && brandName.length <= 16) {
    const candidate = sanitizeSlug(brandName);
    if (candidate) return candidate;
  }

  let clean = repoName.toLowerCase();
  clean = clean.replace(/^(?:famanias\/)?/, "");
  clean = clean.replace(/-(?:landing-revisions|landing|template|exploration|page|site)$/, "");
  clean = clean.replace(/-/g, "");

  return sanitizeSlug(clean) || "template";
}

function copyDirectoryRecursive(src: string, dest: string, slug: string) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectoryRecursive(srcPath, destPath, slug);
    } else {
      let content = fs.readFileSync(srcPath, "utf-8");

      if (/\.(tsx|jsx)$/.test(entry.name)) {
        if (!content.includes("'use client'") && !content.includes('"use client"')) {
          content = `'use client';\n\n${content}`;
        }
      }

      if (/\.test\.(ts|tsx|js|jsx)$/.test(entry.name)) {
        content = content.replace(/from\s+['"]node:test['"]/g, "from 'vitest'");
      }

      content = content.replace(/\/assets\//g, `/templates/${slug}/`);
      content = content.replace(/["']\.\.?\/assets\//g, (m) => `${m[0]}/templates/${slug}/`);

      fs.writeFileSync(destPath, content, "utf-8");
    }
  }
}

function generateLayoutTsx(meta: ParsedMeta, slug: string, pascalSlug: string): string {
  const fontImports: string[] = [];
  const fontInstantiations: string[] = [];
  const fontClassVariables: string[] = [];

  for (const font of meta.fonts) {
    const known = KNOWN_GOOGLE_FONTS[font.name];
    if (known) {
      if (!fontImports.includes(known.importName)) {
        fontImports.push(known.importName);
        const varName = known.importName.charAt(0).toLowerCase() + known.importName.slice(1);
        fontInstantiations.push(`const ${varName} = ${known.importName}({
  subsets: ["latin"],
  variable: "${known.variable}",
});`);
        fontClassVariables.push(`\${${varName}.variable}`);
      }
    }
  }

  const importNextFont =
    fontImports.length > 0
      ? `import { ${fontImports.join(", ")} } from "next/font/google";\n`
      : "";

  const fontDeclarations =
    fontInstantiations.length > 0 ? `\n${fontInstantiations.join("\n\n")}\n` : "";

  const classList = fontClassVariables.length > 0
    ? `\`${fontClassVariables.join(" ")} scroll-smooth\``
    : `"scroll-smooth"`;

  const externalFontLink = meta.googleFontsLink
    ? `\n        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="${meta.googleFontsLink}" rel="stylesheet" />`
    : "";

  return `import type { Metadata, Viewport } from "next";
${importNextFont}import "./${slug}/${slug}.css";
${fontDeclarations}
export const metadata: Metadata = {
  title: ${JSON.stringify(meta.title)},
  description: ${JSON.stringify(meta.description)},
  openGraph: {
    title: ${JSON.stringify(meta.title)},
    description: ${JSON.stringify(meta.description)},
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function ${pascalSlug}Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={${classList}}>${externalFontLink}
      <body className="${meta.bodyClasses}">
        {children}
      </body>
    </html>
  );
}
`;
}

function generatePageTsx(pascalSlug: string): string {
  return `"use client";

import ${pascalSlug}App from "./${pascalSlug}App";

export default function ${pascalSlug}Page() {
  return <${pascalSlug}App />;
}
`;
}

function generateAssetsTsx(slug: string): string {
  return `import { ASSETS } from "./assets.generated";

const BASE = "/templates/${slug}";

export function assetSrc(
  key: string,
  width: 800 | 1600,
  format: "webp" | "avif" = "webp"
): string | null {
  return key in ASSETS ? \`\${BASE}/\${key}-\${width}.\${format}\` : null;
}

type PictureProps = {
  assetKey: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function Picture({ assetKey, alt, className }: PictureProps) {
  const source = assetSrc(assetKey, 800);
  if (!source) {
    return (
      <div
        className={\`${slug}-placeholder \${className ?? ""}\`}
        role="img"
        aria-label={alt}
        data-asset={assetKey}
      >
        <span>{assetKey}</span>
      </div>
    );
  }
  return (
    <img
      src={source}
      alt={alt}
      className={className}
      loading="eager"
      decoding="async"
      fetchPriority="high"
    />
  );
}
`;
}

function generateIconSvg(meta: ParsedMeta): string {
  const bg = meta.palette[0] || "#0B0B0B";
  const fg = meta.palette[2] || meta.palette[1] || "#F4F0E8";
  const initial = meta.brandName.charAt(0).toUpperCase() || "T";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${bg}" />
  <text x="32" y="42" font-family="system-ui, sans-serif" font-size="30" font-weight="bold" fill="${fg}" text-anchor="middle">${initial}</text>
</svg>
`;
}

function generateOpenGraphImage(meta: ParsedMeta): string {
  const bg = meta.palette[0] || "#0B0B0B";
  const fg = meta.palette[2] || meta.palette[1] || "#F4F0E8";
  const accent = meta.palette[3] || meta.palette[2] || "#A65D46";

  return `import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = ${JSON.stringify(meta.title)};

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          backgroundColor: "${bg}",
          color: "${fg}",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, letterSpacing: "0.08em" }}>
          <span>${meta.brandName.toUpperCase()}</span>
          <span style={{ color: "${accent}" }}>/</span>
          <span style={{ fontSize: 18, opacity: 0.8 }}>LANDING TEMPLATE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 56, fontWeight: "bold", lineHeight: 1.1, maxWidth: 950 }}>
            ${meta.title}
          </div>
          <div style={{ display: "flex", fontSize: 22, opacity: 0.75, maxWidth: 850 }}>
            ${meta.description}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, opacity: 0.7 }}>
          <span>openlanding.page</span>
          <span style={{ color: "${accent}" }}>Next.js 16 · React 19 · Tailwind v4</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
`;
}

function generateE2eSpec(meta: ParsedMeta, slug: string): string {
  return `import { expect, test } from "@playwright/test";

test.describe("${meta.brandName}", () => {
  test.use({ viewport: { width: 1280, height: 800 } });

  test("loads landing page successfully", async ({ page }) => {
    await page.goto("/${slug}");
    await expect(page.locator("body")).toBeVisible();
    await expect(page.locator("h1, h2").first()).toBeVisible();
  });

  test("responsive layout has no horizontal overflow on mobile viewports", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/${slug}");
    await expect(page.locator("body")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  });

  test("reduced motion keeps all sections visible", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/${slug}");
    await expect(page.locator("body")).toBeVisible();
  });
});
`;
}

function updateGalleryRegistrations(meta: ParsedMeta, slug: string, category: string, repoRoot: string) {
  const slugUpper = slug.toUpperCase();
  const today = new Date().toISOString().split("T")[0];

  // 1. scripts/templates.config.ts
  const configPath = path.join(repoRoot, "scripts", "templates.config.ts");
  if (fs.existsSync(configPath)) {
    let content = fs.readFileSync(configPath, "utf-8");

    if (!content.includes(`"${slug}"`)) {
      content = content.replace(/(export type TemplateSlug = [^;]+);/, `$1 | "${slug}";`);
    }

    if (!content.includes(`${slug}: {`)) {
      const paletteBlock = `  ${slug}: {
    palette: [${meta.palette.map((c) => `"${c}"`).join(", ")}],
    paletteExempt: ["src/app/(${slug})/"],
    mediaExempt: true,
  },\n`;
      content = content.replace(/(const PALETTES:[^{]*\{\r?\n)/, `$1${paletteBlock}`);
    }

    fs.writeFileSync(configPath, content, "utf-8");
    console.log(`[import] Updated scripts/templates.config.ts`);
  }

  // 2. scripts/generate-copy-bundles.ts
  const copyBundlesPath = path.join(repoRoot, "scripts", "generate-copy-bundles.ts");
  if (fs.existsSync(copyBundlesPath)) {
    let content = fs.readFileSync(copyBundlesPath, "utf-8");
    if (!content.includes(`${slug}: {`)) {
      const metaLine = `  ${slug}: { name: "${meta.brandName}", dependencies: ["lucide-react", "motion"] },\n`;
      content = content.replace(/(const COPY_METADATA:[\s\S]*?\{\r?\n)/, `$1${metaLine}`);
      fs.writeFileSync(copyBundlesPath, content, "utf-8");
      console.log(`[import] Updated scripts/generate-copy-bundles.ts`);
    }
  }

  // 3. src/app/(index)/data/templates.ts
  const templatesDataPath = path.join(repoRoot, "src", "app", "(index)", "data", "templates.ts");
  if (fs.existsSync(templatesDataPath)) {
    let content = fs.readFileSync(templatesDataPath, "utf-8");

    if (!content.includes(`"${slug}"`)) {
      content = content.replace(/(export type TemplateSlug = [^;]+);/, `$1 | "${slug}";`);
    }

    const promptConstName = `${slugUpper}_PROMPT`;
    if (!content.includes(`export const ${promptConstName} =`)) {
      const promptBlock = `export const ${promptConstName} = \`# ${meta.title} — Landing Page

Build a complete, responsive, interaction-rich landing page for **${meta.brandName}** using Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS v4.

## Brand & Positioning
- **Title:** ${meta.title}
- **Description:** ${meta.description}
- **Stack:** Next.js 16 · React 19 · Motion · Tailwind v4
\`;\n\n`;
      content = content.replace(/export const RAW_TEMPLATES:/, `${promptBlock}export const RAW_TEMPLATES:`);
    }

    if (!content.includes(`slug: "${slug}",`)) {
      const templateItem = `  {
    slug: "${slug}",
    createdAt: "${today}",
    hasDownload: false,
    title: "${meta.brandName}",
    description: ${JSON.stringify(meta.description)},
    category: "${category}" as TemplateCategory,
    industry: "Digital Experience & Technology",
    stack: "Next.js 16 · React 19 · Motion · Tailwind v4",
    badges: ["Interactive Landing", "Responsive", "Accessible"],
    previewImage: "/templates/${slug}/preview-1600.webp",
    promptMarkdown: ${promptConstName},
    model: "Gemini 4 Argon High",
  },\n`;
      content = content.replace(/\r?\n\];\r?\n\r?\nconst registeredTemplates:/, `\n${templateItem}];\n\nconst registeredTemplates:`);
    }

    fs.writeFileSync(templatesDataPath, content, "utf-8");
    console.log(`[import] Updated src/app/(index)/data/templates.ts`);
  }

  // 4. src/app/(index)/data/templates.test.ts
  const testPath = path.join(repoRoot, "src", "app", "(index)", "data", "templates.test.ts");
  if (fs.existsSync(testPath)) {
    let content = fs.readFileSync(testPath, "utf-8");

    const lengthMatch = content.match(/expect\(TEMPLATES\)\.toHaveLength\((\d+)\);/);
    if (lengthMatch) {
      const currentLen = parseInt(lengthMatch[1], 10);
      content = content.replace(`toHaveLength(${currentLen})`, `toHaveLength(${currentLen + 1})`);
    }

    const slugsMatch = content.match(/expect\(slugs\)\.toEqual\(\[([^\]]+)\]\);/);
    if (slugsMatch && !slugsMatch[1].includes(`"${slug}"`)) {
      content = content.replace(/expect\(slugs\)\.toEqual\(\[/, `expect(slugs).toEqual(["${slug}", `);
    }

    const argonMatch = content.match(/const argonSlugs = \[([^\]]+)\];/);
    if (argonMatch && !argonMatch[1].includes(`"${slug}"`)) {
      content = content.replace(/const argonSlugs = \[/, `const argonSlugs = ["${slug}", `);
    }

    fs.writeFileSync(testPath, content, "utf-8");
    console.log(`[import] Updated src/app/(index)/data/templates.test.ts`);
  }

  // 5. tests/e2e/templates.ts
  const e2eTemplatesPath = path.join(repoRoot, "tests", "e2e", "templates.ts");
  if (fs.existsSync(e2eTemplatesPath)) {
    let content = fs.readFileSync(e2eTemplatesPath, "utf-8");
    if (!content.includes(`"/${slug}"`)) {
      content = content.replace(/(export const TEMPLATE_PATHS: string\[] = \[[^\]]*)(];)/, `$1, "/${slug}"$2`);
      fs.writeFileSync(e2eTemplatesPath, content, "utf-8");
      console.log(`[import] Updated tests/e2e/templates.ts`);
    }
  }

  // 6. tests/e2e/<slug>.spec.ts
  const specPath = path.join(repoRoot, "tests", "e2e", `${slug}.spec.ts`);
  if (!fs.existsSync(specPath)) {
    fs.writeFileSync(specPath, generateE2eSpec(meta, slug), "utf-8");
    console.log(`[import] Generated tests/e2e/${slug}.spec.ts`);
  }
}

export function importTemplate() {
  const { repoOrPath, slug: cliSlug, title: cliTitle, category, dryRun, force, noRegister } = parseCliArgs();

  if (!repoOrPath) {
    console.error("Usage: tsx scripts/import-aistudio-template.ts <repo-or-path> [--slug <slug>] [--title <title>] [--category <category>] [--dry-run] [--force]");
    process.exit(1);
  }

  const repoRoot = path.resolve(__dirname, "..");
  const { sourceDir, repoName } = resolveSourceDir(repoOrPath, repoRoot);

  console.log(`[import] Analyzing source at ${sourceDir}...`);
  const meta = extractMetadata(sourceDir, cliTitle || repoName);
  if (cliTitle) {
    meta.title = cliTitle;
    meta.brandName = cliTitle;
  }

  const slug = deriveSlug(cliSlug, repoName, meta.brandName);
  const pascalSlug = toPascalCase(slug);

  console.log(`[import] Target Slug: ${slug} (${pascalSlug})`);
  console.log(`[import] Brand Title: ${meta.brandName}`);
  console.log(`[import] Palette: ${meta.palette.join(", ")}`);
  if (meta.fonts.length > 0) {
    console.log(`[import] Detected Fonts: ${meta.fonts.map((f) => f.name).join(", ")}`);
  }

  const destAppDir = path.join(repoRoot, "src", "app", `(${slug})`);
  const destTemplateDir = path.join(destAppDir, slug);
  const destPublicDir = path.join(repoRoot, "public", "templates", slug);
  const destGalleryDir = path.join(repoRoot, "public", "gallery");

  if (fs.existsSync(destAppDir) && !force) {
    if (dryRun) {
      console.log(`[import] Note: Destination directory exists at ${destAppDir} (would require --force).`);
    } else {
      console.error(`[import] Destination directory already exists at ${destAppDir}. Use --force to overwrite.`);
      process.exit(1);
    }
  }

  if (dryRun) {
    console.log("[import] Dry run completed. No files modified.");
    return;
  }

  // 1. Create directories
  fs.mkdirSync(destTemplateDir, { recursive: true });
  fs.mkdirSync(destPublicDir, { recursive: true });
  fs.mkdirSync(destGalleryDir, { recursive: true });

  // 2. Generate layout.tsx
  const layoutContent = generateLayoutTsx(meta, slug, pascalSlug);
  fs.writeFileSync(path.join(destAppDir, "layout.tsx"), layoutContent, "utf-8");

  // 3. Generate page.tsx
  const pageContent = generatePageTsx(pascalSlug);
  fs.writeFileSync(path.join(destTemplateDir, "page.tsx"), pageContent, "utf-8");

  // 4. Copy & adapt App.tsx -> <PascalSlug>App.tsx
  const srcAppPath = path.join(sourceDir, "src", "App.tsx");
  if (fs.existsSync(srcAppPath)) {
    let appContent = fs.readFileSync(srcAppPath, "utf-8");
    if (!appContent.includes("'use client'") && !appContent.includes('"use client"')) {
      appContent = `'use client';\n\n${appContent}`;
    }
    appContent = appContent.replace(/\/assets\//g, `/templates/${slug}/`);
    appContent = appContent.replace(/["']\.\.?\/assets\//g, (m) => `${m[0]}/templates/${slug}/`);
    fs.writeFileSync(path.join(destTemplateDir, `${pascalSlug}App.tsx`), appContent, "utf-8");
  }

  // 5. Copy all subdirectories and helper files in src/ (components, hooks, lib, data, utils, motion, types, etc.)
  const srcDir = path.join(sourceDir, "src");
  if (fs.existsSync(srcDir)) {
    const srcEntries = fs.readdirSync(srcDir, { withFileTypes: true });
    for (const entry of srcEntries) {
      if (entry.isDirectory() && entry.name !== "node_modules") {
        const srcSub = path.join(srcDir, entry.name);
        const destSub = path.join(destTemplateDir, entry.name);
        copyDirectoryRecursive(srcSub, destSub, slug);
      } else if (
        entry.isFile() &&
        !["App.tsx", "App.jsx", "main.tsx", "main.jsx", "index.css", "vite-env.d.ts"].includes(entry.name) &&
        /\.(ts|tsx|js|jsx)$/.test(entry.name)
      ) {
        let content = fs.readFileSync(path.join(srcDir, entry.name), "utf-8");
        if (/\.(tsx|jsx)$/.test(entry.name) && !content.includes("'use client'") && !content.includes('"use client"')) {
          content = `'use client';\n\n${content}`;
        }
        content = content.replace(/\/assets\//g, `/templates/${slug}/`);
        content = content.replace(/["']\.\.?\/assets\//g, (m) => `${m[0]}/templates/${slug}/`);
        fs.writeFileSync(path.join(destTemplateDir, entry.name), content, "utf-8");
      }
    }
  }

  // 6. Copy CSS
  const srcCssPath = path.join(sourceDir, "src", "index.css");
  let cssContent = `@import "tailwindcss";\n\n`;
  if (fs.existsSync(srcCssPath)) {
    const rawCss = fs.readFileSync(srcCssPath, "utf-8");
    cssContent = rawCss.includes('@import "tailwindcss"') ? rawCss : `${cssContent}${rawCss}`;
  }
  fs.writeFileSync(path.join(destTemplateDir, `${slug}.css`), cssContent, "utf-8");

  // 7. Generate assets helpers & icons
  fs.writeFileSync(path.join(destTemplateDir, "assets.tsx"), generateAssetsTsx(slug), "utf-8");
  fs.writeFileSync(path.join(destTemplateDir, "assets.generated.ts"), `export const ASSETS: Record<string, { w: number; h: number }> = {};\n`, "utf-8");
  fs.writeFileSync(path.join(destTemplateDir, "icon.svg"), generateIconSvg(meta), "utf-8");
  fs.writeFileSync(path.join(destTemplateDir, "opengraph-image.tsx"), generateOpenGraphImage(meta), "utf-8");

  // 8. Documentation
  fs.writeFileSync(
    path.join(destTemplateDir, "DESIGN.md"),
    `# ${meta.brandName} Design Specifications\n\n${meta.description}\n\n## Palette\n${meta.palette.map((c) => `- \`${c}\``).join("\n")}\n`,
    "utf-8"
  );
  fs.writeFileSync(
    path.join(destTemplateDir, "PROMPT.md"),
    `# Rebuild Prompt: ${meta.brandName}\n\n${meta.description}\n`,
    "utf-8"
  );

  // 9. Copy public/assets media
  const srcAssetsDir = path.join(sourceDir, "public", "assets");
  if (fs.existsSync(srcAssetsDir)) {
    copyDirectoryRecursive(srcAssetsDir, destPublicDir, slug);
  }

  // Check for .aistudio/artifacts/brain/**/.tempmediaStorage/
  const aiStudioBrain = path.join(sourceDir, ".aistudio", "artifacts", "brain");
  if (fs.existsSync(aiStudioBrain)) {
    try {
      const uuids = fs.readdirSync(aiStudioBrain);
      for (const uuid of uuids) {
        const mediaStorage = path.join(aiStudioBrain, uuid, ".tempmediaStorage");
        if (fs.existsSync(mediaStorage)) {
          copyDirectoryRecursive(mediaStorage, destPublicDir, slug);
        }
      }
    } catch {
      // Ignore
    }
  }

  // Ensure preview and gallery images exist
  const previewPath = path.join(destPublicDir, "preview-1600.webp");
  const galleryPath = path.join(destGalleryDir, `${slug}.webp`);
  const sampleFallbackWebp = path.join(destGalleryDir, "halodesk.webp");

  let bestCandidateImage: string | null = null;
  const publicFiles = fs.existsSync(destPublicDir) ? fs.readdirSync(destPublicDir) : [];
  const imageFiles = publicFiles.filter((f) => /\.(webp|png|jpg|jpeg)$/i.test(f) && f !== "preview-1600.webp");

  // Prefer hero or preview named files
  const heroMatch = imageFiles.find((f) => /hero/i.test(f));
  if (heroMatch) {
    bestCandidateImage = path.join(destPublicDir, heroMatch);
  } else if (imageFiles.length > 0) {
    // Pick largest file
    imageFiles.sort((a, b) => fs.statSync(path.join(destPublicDir, b)).size - fs.statSync(path.join(destPublicDir, a)).size);
    bestCandidateImage = path.join(destPublicDir, imageFiles[0]);
  }

  const chosenSource = bestCandidateImage || sampleFallbackWebp;

  if (fs.existsSync(chosenSource)) {
    if (!fs.existsSync(previewPath) || fs.statSync(previewPath).size === 0) {
      fs.copyFileSync(chosenSource, previewPath);
    }
    if (!fs.existsSync(galleryPath) || fs.statSync(galleryPath).size === 0) {
      fs.copyFileSync(chosenSource, galleryPath);
    }
  }

  // 10. Automatic Gallery Registration
  if (!noRegister) {
    updateGalleryRegistrations(meta, slug, category, repoRoot);
  }

  console.log(`\n🎉 Successfully imported template "${meta.brandName}" into:`);
  console.log(`   - Route: /${slug}`);
  console.log(`   - Files: src/app/(${slug})/${slug}/`);
  console.log(`   - Assets: public/templates/${slug}/`);
  console.log(`   - Gallery card: public/gallery/${slug}.webp`);
  console.log(`\nTo test, run:`);
  console.log(`   npm run dev`);
  console.log(`   open http://localhost:3000/${slug}`);
}

importTemplate();
