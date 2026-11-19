import { describe, it, expect } from "vitest";
import {
  WEBFLOW_MAX_CUSTOM_CODE_CHARS,
  buildWebflowManifest,
  buildWebflowPromptMarkdown,
  buildFallbackWebflowPrompt,
  extractCustomCodeBlocks,
} from "./manifest";
import { TEMPLATES } from "../../app/(index)/data/templates";

describe("webflow manifest builder", () => {
  const snoot = TEMPLATES.find((t) => t.slug === "snoot")!;

  it("extracts color, font, and size variables including color-mix and clamp custom expressions", () => {
    const css = `
      @theme static {
        --color-ink: #1F1B3A;
        --color-paper: #FFF4E4;
        --font-display: var(--font-lilita), sans-serif;
      }
      :root {
        --sn-gutter: clamp(16px, 4.6vw, 72px);
        --r-lg: 44px;
        --frank-light: color-mix(in oklab, var(--color-frank) 42%, var(--color-milk));
      }
    `;
    const layout = `import { Lilita_One, Figtree } from "next/font/google";`;
    const manifest = buildWebflowManifest({
      template: snoot,
      palette: ["#1F1B3A", "#FFF4E4", "#FF6B8B"],
      dependencies: ["lenis", "three"],
      cssSources: [css],
      layoutSource: layout,
      assetPaths: ["/snoot/frank.svg", "/gallery/snoot.webp"],
    });

    expect(manifest.variables.collectionName).toBe("Snoot Tokens");
    expect(manifest.variables.colors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ cssVar: "--color-ink", value: "#1F1B3A", isCustomExpression: false }),
        expect.objectContaining({ cssVar: "--frank-light", isCustomExpression: true }),
      ])
    );
    expect(manifest.variables.fonts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ googleFont: "Lilita One" }),
        expect.objectContaining({ googleFont: "Figtree" }),
      ])
    );
    expect(manifest.variables.sizes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ cssVar: "--sn-gutter", value: "clamp(16px, 4.6vw, 72px)", isCustomExpression: true }),
        expect.objectContaining({ cssVar: "--r-lg", value: "44px", isCustomExpression: false }),
      ])
    );
  });

  it("classifies numbered sections into native-whtml vs hybrid-embed for 3D and scrubbed sections", () => {
    const manifest = buildWebflowManifest({
      template: snoot,
      dependencies: ["lenis", "three"],
      cssSources: [".sn-hero { display: grid; } .sn-checkup { position: sticky; }"],
    });

    expect(manifest.sections.length).toBeGreaterThanOrEqual(10);
    const checkup = manifest.sections.find((s) => s.title.toLowerCase().includes("check-up"));
    const book = manifest.sections.find((s) => s.title.toLowerCase().includes("appointment"));
    const footer = manifest.sections.find((s) => s.title.toLowerCase().includes("footer"));

    expect(checkup?.deliveryMode).toBe("hybrid-embed");
    expect(book?.deliveryMode).toBe("hybrid-embed");
    expect(footer?.deliveryMode).toBe("native-whtml");
  });

  it("strips data: URLs and splits custom code blocks so no block exceeds 45,000 characters", () => {
    const hugeCss =
      `@font-face { src: url("data:font/woff2;base64,${"A".repeat(20000)}"); }\n` +
      Array.from({ length: 1200 }, (_, i) => `.sn-rule-${i} { padding: 12px 24px; color: var(--color-ink); }`).join("\n");

    const blocks = extractCustomCodeBlocks({
      slug: "snoot",
      title: "Snoot",
      dependencies: ["three"],
      cssSources: [hugeCss],
    });

    expect(blocks.length).toBeGreaterThan(1);
    for (const block of blocks) {
      expect(block.code).not.toContain("data:font/woff2");
      expect(block.code.length).toBeLessThanOrEqual(WEBFLOW_MAX_CUSTOM_CODE_CHARS);
      expect(block.charCount).toBe(block.code.length);
    }
  });

  it("falls back gracefully when a template prompt has no numbered section headings", () => {
    const minimal = buildWebflowManifest({
      template: {
        slug: "snoot",
        title: "Snoot",
        industry: "Vet Clinic",
        description: "Neighbourhood vet clinic.",
        stack: "Next.js 16",
        hasDownload: true,
        promptMarkdown: "# Simple prompt without numbered list",
      },
    });
    expect(minimal.sections).toHaveLength(1);
    expect(minimal.sections[0].id).toBe("section-1");
  });

  it("renders a Webflow MCP prompt instructing the agent to use openlanding MCP or the JSON manifest and Webflow MCP tools", () => {
    const manifest = buildWebflowManifest({ template: snoot, dependencies: ["lenis", "three"] });
    const md = buildWebflowPromptMarkdown(manifest);

    expect(md).toContain("data_variable_tool");
    expect(md).toContain("data_whtml_builder");
    expect(md).toContain("data_style_tool");
    expect(md).toContain("data_assets_tool");
    expect(md).toContain("data_interactions_tool");
    expect(md).toContain("data_scripts_tool");
    expect(md).toContain("/copy/snoot-webflow.json");
    expect(md).toContain("get_webflow_manifest");
    expect(buildFallbackWebflowPrompt(snoot)).toContain("data_variable_tool");
  });
});
