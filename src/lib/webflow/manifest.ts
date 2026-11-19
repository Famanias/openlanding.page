import type { TemplateItem, TemplateSlug } from "../../app/(index)/data/templates";
import { SITE_URL } from "../site";

export const WEBFLOW_MAX_CUSTOM_CODE_CHARS = 45000;

export interface WebflowColorVariable {
  name: string;
  cssVar: string;
  value: string;
  isCustomExpression: boolean;
  role?: string;
}

export interface WebflowFontVariable {
  name: string;
  cssVar: string;
  family: string;
  fallback: string;
  googleFont?: string;
}

export interface WebflowSizeVariable {
  name: string;
  cssVar: string;
  value: string;
  isCustomExpression: boolean;
}

export interface WebflowAssetEntry {
  fileName: string;
  publicPath: string;
  contentType: string;
  role: string;
}

export interface WebflowSectionSpec {
  id: string;
  index: number;
  title: string;
  summary: string;
  deliveryMode: "native-whtml" | "hybrid-embed";
  cssSelectors: string[];
  customCodeReason?: string;
}

export interface WebflowCustomCodeBlock {
  id: string;
  location: "head" | "footer" | "embed";
  title: string;
  maxChars: typeof WEBFLOW_MAX_CUSTOM_CODE_CHARS;
  charCount: number;
  description: string;
  dependencies: string[];
  code: string;
}

export interface WebflowTemplateManifest {
  slug: TemplateSlug;
  title: string;
  industry: string;
  description: string;
  stack: string;
  liveUrl: string;
  downloadUrl: string | null;
  manifestUrl: string;
  webflowPromptUrl: string;
  variables: {
    collectionName: string;
    colors: WebflowColorVariable[];
    fonts: WebflowFontVariable[];
    sizes: WebflowSizeVariable[];
  };
  assets: WebflowAssetEntry[];
  sections: WebflowSectionSpec[];
  customCodeBlocks: WebflowCustomCodeBlock[];
}

export type ManifestTemplateInput = Pick<
  TemplateItem,
  "slug" | "title" | "industry" | "description" | "stack" | "hasDownload" | "promptMarkdown"
>;

const COLOR_VALUE_RE = /^(#[0-9a-fA-F]{3,8}|rgba?\(|hsla?\(|oklch\(|oklab\(|color-mix\()/i;
const SIZE_VALUE_RE = /(-?\d+(?:\.\d+)?(?:px|rem|em|vw|vh|dvh|dvw|svh|lvh|%|ch|vmin|vmax)\b|^clamp\(|^calc\()/i;
const HYBRID_SECTION_RE =
  /\b(3d|webgpu|webgl|three\.js|threejs|canvas|shader|pinned|scrub|stethoscope|chest-piece|sliding track|the mechanic|ecg|sequencer|mini-game|digital twin|exploded-view|relief mesh)\b/i;

export function stripDataUrls(source: string): string {
  return source
    .replace(/@font-face\s*\{[^}]*data:[^}]*\}/gi, "")
    .replace(/url\(\s*(['"]?)data:[^)'"]+\1\s*\)/gi, 'url("about:blank")')
    .replace(/data:[a-zA-Z0-9/+.-]+;base64,[A-Za-z0-9+/=]+/g, "");
}

function toHumanVariableName(cssVar: string, prefixRe: RegExp): string {
  const cleaned = cssVar.replace(/^--/, "").replace(prefixRe, "");
  return cleaned
    .split(/[-_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function inferMimeType(filePath: string): string {
  const lower = filePath.toLowerCase();
  if (lower.endsWith(".svg")) return "image/svg+xml";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  if (lower.endsWith(".avif")) return "image/avif";
  if (lower.endsWith(".mp4")) return "video/mp4";
  if (lower.endsWith(".webm")) return "video/webm";
  if (lower.endsWith(".glb")) return "model/gltf-binary";
  return "application/octet-stream";
}

export function extractTemplateVariables(params: {
  slug: string;
  title: string;
  palette?: string[];
  cssSources?: string[];
  layoutSource?: string;
}): WebflowTemplateManifest["variables"] {
  const colors: WebflowColorVariable[] = [];
  const fonts: WebflowFontVariable[] = [];
  const sizes: WebflowSizeVariable[] = [];

  const seenCssVars = new Set<string>();
  const seenColorHexes = new Set<string>();

  for (const rawCss of params.cssSources ?? []) {
    const cleanCss = stripDataUrls(rawCss);
    const varRegex = /(--[a-zA-Z0-9-_]+)\s*:\s*([^;\}]+);/g;
    for (const match of cleanCss.matchAll(varRegex)) {
      const cssVar = match[1].trim();
      const value = match[2].replace(/\/\*[\s\S]*?\*\//g, "").trim();
      if (!value || seenCssVars.has(cssVar)) continue;
      seenCssVars.add(cssVar);

      if (cssVar.startsWith("--color-") || COLOR_VALUE_RE.test(value)) {
        const isCustomExpression = /color-mix\(|var\(/i.test(value);
        if (value.startsWith("#")) seenColorHexes.add(value.toUpperCase());
        colors.push({
          name: `Color / ${toHumanVariableName(cssVar, /^color-/) || cssVar.slice(2)}`,
          cssVar,
          value,
          isCustomExpression,
        });
      } else if (cssVar.startsWith("--font-")) {
        const parts = value.split(",").map((p) => p.trim().replace(/^['"]|['"]$/g, ""));
        const primary = parts[0] ?? "system-ui";
        const fallback = parts.slice(1).join(", ") || "system-ui, sans-serif";
        fonts.push({
          name: `Font / ${toHumanVariableName(cssVar, /^font-/) || cssVar.slice(2)}`,
          cssVar,
          family: primary,
          fallback,
        });
      } else if (
        !cssVar.startsWith("--ease-") &&
        !cssVar.startsWith("--dur-") &&
        !cssVar.startsWith("--stagger") &&
        SIZE_VALUE_RE.test(value)
      ) {
        const isCustomExpression = /clamp\(|calc\(|min\(|max\(|var\(/i.test(value);
        sizes.push({
          name: `Size / ${toHumanVariableName(cssVar, /^(size|space|r)-/) || cssVar.slice(2)}`,
          cssVar,
          value,
          isCustomExpression,
        });
      }
    }
  }

  // Extract Google Font names from layoutSource or promptMarkdown
  if (params.layoutSource) {
    const googleImportMatch = params.layoutSource.match(/import\s*\{([^}]+)\}\s*from\s*["']next\/font\/google["']/);
    if (googleImportMatch) {
      const identifiers = googleImportMatch[1]
        .split(",")
        .map((id) => id.trim().split(/\s+as\s+/)[0].trim())
        .filter(Boolean);
      for (const id of identifiers) {
        const familyName = id.replace(/_/g, " ");
        const slugName = id.toLowerCase().replace(/_/g, "-");
        const existing = fonts.find(
          (f) => f.family.toLowerCase().includes(slugName) || f.cssVar.toLowerCase().includes(slugName)
        );
        if (existing) {
          existing.googleFont = familyName;
          if (existing.family.startsWith("var(")) {
            existing.family = familyName;
          }
        } else {
          fonts.push({
            name: `Font / ${familyName}`,
            cssVar: `--font-${slugName}`,
            family: familyName,
            fallback: "system-ui, sans-serif",
            googleFont: familyName,
          });
        }
      }
    }
  }

  for (const [idx, hex] of (params.palette ?? []).entries()) {
    const upper = hex.toUpperCase();
    if (!seenColorHexes.has(upper)) {
      seenColorHexes.add(upper);
      colors.push({
        name: `Color / Palette ${idx + 1}`,
        cssVar: `--color-palette-${idx + 1}`,
        value: hex,
        isCustomExpression: false,
      });
    }
  }

  return {
    collectionName: `${params.title} Tokens`,
    colors,
    fonts,
    sizes,
  };
}

export function extractTemplateSections(params: {
  promptMarkdown: string;
  dependencies?: string[];
  cssSources?: string[];
}): WebflowSectionSpec[] {
  const sections: WebflowSectionSpec[] = [];
  const allSelectors = new Set<string>();
  for (const css of params.cssSources ?? []) {
    for (const m of stripDataUrls(css).matchAll(/\.([a-zA-Z0-9_-]{3,40})\b/g)) {
      allSelectors.add(`.${m[1]}`);
    }
  }
  const selectorList = Array.from(allSelectors);

  const numberedLineRe = /^\s*(?:0?\d+[\.\)]|-\s*\*\*0?\d+[\.\)]?)\s*\*\*([^*]+?)\*\*[:.—-]?\s*(.+)$/gm;
  let index = 1;
  for (const match of params.promptMarkdown.matchAll(numberedLineRe)) {
    const rawTitle = match[1].replace(/[:.—-]+$/, "").trim();
    const summary = match[2].trim();
    const combined = `${rawTitle} ${summary}`;
    const isHybrid = HYBRID_SECTION_RE.test(combined);
    const titleKeywords = rawTitle
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length >= 3);
    const matchedSelectors = selectorList
      .filter((sel) => titleKeywords.some((kw) => sel.toLowerCase().includes(kw)))
      .slice(0, 12);

    sections.push({
      id: `section-${index}`,
      index,
      title: rawTitle,
      summary,
      deliveryMode: isHybrid ? "hybrid-embed" : "native-whtml",
      cssSelectors: matchedSelectors,
      ...(isHybrid
        ? {
            customCodeReason:
              "Contains interactive 3D/WebGL, procedural canvas, or pinned scroll-scrubbed stage requiring an HtmlEmbed + page footer script.",
          }
        : {}),
    });
    index++;
  }

  if (sections.length === 0) {
    const firstParagraph =
      params.promptMarkdown
        .split(/\r?\n/)
        .map((line) => line.trim())
        .find((line) => line.length > 0 && !line.startsWith("#")) ?? "Complete landing page layout.";
    const isHybrid =
      HYBRID_SECTION_RE.test(params.promptMarkdown) ||
      (params.dependencies ?? []).some((d) => d === "three" || d === "gsap");
    sections.push({
      id: "section-1",
      index: 1,
      title: "Main Landing Page",
      summary: firstParagraph.slice(0, 240),
      deliveryMode: isHybrid ? "hybrid-embed" : "native-whtml",
      cssSelectors: selectorList.slice(0, 12),
      ...(isHybrid
        ? {
            customCodeReason:
              "Uses custom motion or 3D runtime dependencies alongside native Webflow layout elements.",
          }
        : {}),
    });
  }

  return sections;
}

function chunkStringByLines(text: string, maxChars: number): string[] {
  if (text.length <= maxChars) return [text];
  const chunks: string[] = [];
  let current = "";
  for (const line of text.split("\n")) {
    const candidate = current ? `${current}\n${line}` : line;
    if (candidate.length > maxChars) {
      if (current) {
        chunks.push(current);
        current = "";
      }
      if (line.length > maxChars) {
        for (let i = 0; i < line.length; i += maxChars) {
          chunks.push(line.slice(i, i + maxChars));
        }
      } else {
        current = line;
      }
    } else {
      current = candidate;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

export function extractCustomCodeBlocks(params: {
  slug: string;
  title: string;
  dependencies?: string[];
  cssSources?: string[];
}): WebflowCustomCodeBlock[] {
  const blocks: WebflowCustomCodeBlock[] = [];
  const deps = params.dependencies ?? [];

  const cleanedCss = (params.cssSources ?? [])
    .map((css) =>
      stripDataUrls(css)
        .replace(/^@import\s+["'][^"']+["'];?\s*$/gm, "")
        .trim()
    )
    .filter(Boolean)
    .join("\n\n");

  if (cleanedCss.length > 0) {
    const cssChunks = chunkStringByLines(cleanedCss, WEBFLOW_MAX_CUSTOM_CODE_CHARS);
    cssChunks.forEach((chunk, idx) => {
      const partLabel = cssChunks.length > 1 ? ` (Part ${idx + 1}/${cssChunks.length})` : "";
      blocks.push({
        id: `${params.slug}-styles-${idx + 1}`,
        location: "head",
        title: `${params.title} Scoped Styles${partLabel}`,
        maxChars: WEBFLOW_MAX_CUSTOM_CODE_CHARS,
        charCount: chunk.length,
        description:
          "Authored custom CSS variables, pseudo-elements, and keyframe rules that supplement native Webflow styles.",
        dependencies: [],
        code: chunk,
      });
    });
  }

  const runtimeDeps = deps.filter((d) => ["three", "gsap", "lenis", "motion", "tone"].includes(d));
  if (runtimeDeps.length > 0) {
    const cdnImports: string[] = [];
    if (runtimeDeps.includes("lenis")) {
      cdnImports.push('import Lenis from "https://cdn.jsdelivr.net/npm/lenis@1.3.27/+esm";');
    }
    if (runtimeDeps.includes("gsap")) {
      cdnImports.push('import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.15.0/+esm";');
    }
    if (runtimeDeps.includes("three")) {
      cdnImports.push('import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.186.1/+esm";');
    }

    const runtimeCode = [
      `// ${params.title} — Webflow Custom Code Runtime Bridge`,
      `// Dependencies: ${runtimeDeps.join(", ")}`,
      ...cdnImports,
      `const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;`,
      `if (!prefersReducedMotion) {`,
      runtimeDeps.includes("lenis")
        ? `  const lenis = new Lenis({ autoRaf: true });\n  window.__openlandingLenis = lenis;`
        : `  // Attach interactive stage controllers to [data-webflow-embed] containers`,
      `}`,
    ].join("\n");

    blocks.push({
      id: `${params.slug}-runtime-1`,
      location: "footer",
      title: `${params.title} Interactive Runtime Bridge`,
      maxChars: WEBFLOW_MAX_CUSTOM_CODE_CHARS,
      charCount: runtimeCode.length,
      description: `Loads ${runtimeDeps.join(", ")} in page footer custom code with prefers-reduced-motion guard.`,
      dependencies: runtimeDeps,
      code: runtimeCode,
    });
  }

  return blocks;
}

export function buildWebflowManifest(params: {
  template: ManifestTemplateInput;
  palette?: string[];
  dependencies?: string[];
  cssSources?: string[];
  layoutSource?: string;
  assetPaths?: string[];
}): WebflowTemplateManifest {
  const { template } = params;
  const promptColours = Array.from(
    new Set((template.promptMarkdown.match(/#[0-9a-fA-F]{6}\b/g) ?? []).map((h) => h.toUpperCase()))
  );
  const mergedPalette = params.palette && params.palette.length > 0 ? params.palette : promptColours;

  const variables = extractTemplateVariables({
    slug: template.slug,
    title: template.title,
    palette: mergedPalette,
    cssSources: params.cssSources,
    layoutSource: params.layoutSource,
  });

  const sections = extractTemplateSections({
    promptMarkdown: template.promptMarkdown,
    dependencies: params.dependencies,
    cssSources: params.cssSources,
  });

  const customCodeBlocks = extractCustomCodeBlocks({
    slug: template.slug,
    title: template.title,
    dependencies: params.dependencies,
    cssSources: params.cssSources,
  });

  const rawAssets =
    params.assetPaths && params.assetPaths.length > 0
      ? params.assetPaths
      : [`/gallery/${template.slug}.webp`];

  const assets: WebflowAssetEntry[] = rawAssets.map((publicPath) => {
    const fileName = publicPath.split("/").filter(Boolean).at(-1) ?? `${template.slug}.webp`;
    return {
      fileName,
      publicPath: publicPath.startsWith("http") ? publicPath : `${SITE_URL}${publicPath}`,
      contentType: inferMimeType(fileName),
      role: publicPath.includes("/gallery/") ? "Gallery preview capture" : "Template media asset",
    };
  });

  return {
    slug: template.slug,
    title: template.title,
    industry: template.industry,
    description: template.description,
    stack: template.stack,
    liveUrl: `${SITE_URL}/templates/${template.slug}`,
    downloadUrl: template.hasDownload ? `${SITE_URL}/downloads/${template.slug}.html` : null,
    manifestUrl: `${SITE_URL}/copy/${template.slug}-webflow.json`,
    webflowPromptUrl: `${SITE_URL}/copy/${template.slug}-webflow-prompt.md`,
    variables,
    assets,
    sections,
    customCodeBlocks,
  };
}

export function buildWebflowPromptMarkdown(manifest: WebflowTemplateManifest): string {
  const colorRows =
    manifest.variables.colors.length > 0
      ? manifest.variables.colors
          .map(
            (c) =>
              `| \`${c.name}\` | \`${c.cssVar}\` | \`${c.value}\` | ${
                c.isCustomExpression ? "`custom_value`" : "`static_value`"
              } |`
          )
          .join("\n")
      : "| `Color / Primary` | `--color-primary` | `#111111` | `static_value` |";

  const fontRows =
    manifest.variables.fonts.length > 0
      ? manifest.variables.fonts
          .map(
            (f) =>
              `| \`${f.name}\` | \`${f.cssVar}\` | \`${f.family}\` | ${
                f.googleFont ? `Google Font: \`${f.googleFont}\`` : `Fallback: \`${f.fallback}\``
              } |`
          )
          .join("\n")
      : "| `Font / Body` | `--font-body` | `system-ui` | System font stack |";

  const sizeRows =
    manifest.variables.sizes.length > 0
      ? manifest.variables.sizes
          .slice(0, 20)
          .map(
            (s) =>
              `| \`${s.name}\` | \`${s.cssVar}\` | \`${s.value}\` | ${
                s.isCustomExpression ? "`custom_value`" : "`static_value`"
              } |`
          )
          .join("\n")
      : "| `Size / Max Width` | `--max-width` | `1280px` | `static_value` |";

  const assetLines = manifest.assets
    .map((a) => `- \`${a.fileName}\` (${a.contentType}) — ${a.publicPath} (${a.role})`)
    .join("\n");

  const sectionLines = manifest.sections
    .map(
      (s) =>
        `${s.index}. **${s.title}** (\`${s.id}\`, mode: \`${s.deliveryMode}\`): ${s.summary}${
          s.customCodeReason ? `\n   - *Custom-code island note:* ${s.customCodeReason}` : ""
        }`
    )
    .join("\n");

  const codeBlockLines =
    manifest.customCodeBlocks.length > 0
      ? manifest.customCodeBlocks
          .map(
            (b) =>
              `- **${b.title}** (\`${b.id}\`, placement: \`${b.location}\`, ${b.charCount} / ${b.maxChars} chars): ${b.description}`
          )
          .join("\n")
      : "- No external JS runtime blocks required; all layout and styling fit inside native Webflow styles.";

  return `# Webflow MCP Import Prompt: ${manifest.title} (${manifest.slug})

Import the **${manifest.title}** (${manifest.industry}) landing page template from OpenLandingPage into the user's active Webflow site using the official **Webflow MCP** tools.

- **Live Reference:** ${manifest.liveUrl}
- **Structured Webflow Manifest (JSON):** ${manifest.manifestUrl}${
    manifest.downloadUrl ? `\n- **Standalone HTML Export (DOM & CSS source of truth):** ${manifest.downloadUrl}` : ""
  }

## 0. Retrieve the Template Data (OpenLanding MCP or Direct Fetch)

1. **If the \`openlanding\` MCP server is connected in your environment:**
   - Call \`get_webflow_manifest({ slug: "${manifest.slug}" })\` to load the structured token, asset, and section manifest.
   - As you build each section below, call \`get_webflow_section({ slug: "${manifest.slug}", sectionId: "section-1" })\` (and so on) to pull that section's scoped CSS and custom-code blocks one section at a time.
2. **If only the official \`webflow\` MCP server is connected:**
   - Fetch \`${manifest.manifestUrl}\` for the structured JSON manifest and use the token and section specifications embedded below.
   - Always call \`webflow_guide_tool\` once at the start of the session before calling other Webflow MCP tools.

---

## 1. Webflow Variables (\`data_variable_tool\`)

Create or select a Variable Collection named **\`${manifest.variables.collectionName}\`**, then create these native Webflow variables so the user can restyle colors, fonts, and spacing globally in the Webflow Designer:

### Color Variables (\`create_color_variable\`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
${colorRows}

### Font Family Variables (\`create_font_family_variable\`)
| Variable Name | CSS Token | Primary Family | Source |
|---|---|---|---|
${fontRows}

### Size Variables (\`create_size_variable\`)
| Variable Name | CSS Token | Value | Mode |
|---|---|---|---|
${sizeRows}

---

## 2. Fonts & Site Assets (\`data_fonts_tool\` & \`data_assets_tool\`)

1. **Fonts:** Load the Google Fonts listed above in the page/site \`<head>\` (or upload custom \`.woff2\` files via \`data_fonts_tool\` > \`create_font\`) and bind the font family variables to your base \`Body\`, heading, and mono classes.
2. **Images & SVGs:** Create an asset folder named \`${manifest.title}\` with \`data_assets_tool\` > \`create_asset_folder\`, upload the template's media assets via \`create_asset\`, and attach them to native Webflow \`Image\` elements so the user can double-click any image on the canvas to swap it:
${assetLines}

---

## 3. Section-by-Section Build Plan (\`data_whtml_builder\`, \`data_element_builder\`, \`data_style_tool\`)

Build all text, headings, buttons, links, cards, and forms as **native editable Webflow elements** styled with reusable classes via \`data_style_tool\` (including \`main\`, \`medium\`, \`small\`, and \`tiny\` breakpoints plus \`hover\` and \`focus-visible\` pseudo-states). Only place WebGL/Three.js canvases, procedural shaders, or pinned scroll-scrub tracks inside scoped \`HtmlEmbed\` islands (\`hybrid-embed\`).

${sectionLines}

---

## 4. Native Webflow IX3 Interactions (\`data_interactions_tool\`)

- Recreate section entrance reveals (fade-in, slide-up, staggered card entrances) and simple click/hover toggles with \`data_interactions_tool\` > \`create_interaction\`.
- Always animate opacity under \`wf:transform\` (e.g. \`{"wf:transform": {"opacity": ["0%", "100%"]}}\`), never \`wf:style\`.
- Include \`conditionalPlayback: [{ type: "prefers-reduced-motion", behavior: "skip-to-end" }]\` on every entrance interaction.

---

## 5. Custom-Code Islands & Page Scripts (\`data_scripts_tool\` & \`HtmlEmbed\`)

Keep every custom-code block under Webflow's 50,000-character limit (pre-chunked at ${WEBFLOW_MAX_CUSTOM_CODE_CHARS} chars in the manifest). Apply head styles and footer runtime bridges via \`data_scripts_tool\` > \`set_page_freeform_code\`:

${codeBlockLines}
`;
}

export function buildFallbackWebflowPrompt(template: ManifestTemplateInput): string {
  const manifest = buildWebflowManifest({ template });
  return buildWebflowPromptMarkdown(manifest);
}
