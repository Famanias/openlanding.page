import fs from "node:fs";
import path from "node:path";
import * as esbuild from "esbuild";
import { test, expect } from "@playwright/test";
import type { SerializedDocument, SerializedFrameNode, SerializedNode } from "../src/shared/types";

const repoRoot = path.resolve(__dirname, "../..");
let bridgeBundle = "";

function collectNodes(node: SerializedNode, out: SerializedNode[] = []): SerializedNode[] {
  out.push(node);
  if (node.type === "FRAME") {
    for (const child of node.children) collectNodes(child, out);
  }
  return out;
}

test.beforeAll(async () => {
  const result = await esbuild.build({
    entryPoints: [path.join(repoRoot, "figma-plugin/src/ui/bridge-script.ts")],
    bundle: true,
    format: "iife",
    target: "es2020",
    write: false,
  });
  bridgeBundle = result.outputFiles[0].text;
});

test.describe("DOM serializer bridge end-to-end capture", () => {
  test("unwraps #standalone-root display:contents and captures text, SVGs, and assets on aerune.html", async ({
    page,
  }) => {
    const html = fs.readFileSync(path.join(repoRoot, "public/downloads/aerune.html"), "utf8");
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.setContent(html, { waitUntil: "domcontentloaded" });
    await page.addScriptTag({ content: bridgeBundle });

    const doc = await page.evaluate(async () => {
      const w = window as unknown as {
        __h2f_prepareDocument: () => Promise<void>;
        __h2f_serializeDocumentFromRoot: (
          root: HTMLElement,
          opts: { viewportWidth: number; runId: string }
        ) => Promise<SerializedDocument>;
      };
      await w.__h2f_prepareDocument();
      return await w.__h2f_serializeDocumentFromRoot(document.body, { viewportWidth: 1920, runId: "test" });
    });

    expect(doc.root.width).toBe(1920);
    expect(doc.root.children.length).toBeGreaterThan(0);

    const nodes = collectNodes(doc.root);
    const textNodes = nodes.filter((n) => n.type === "TEXT");
    expect(textNodes.length).toBeGreaterThan(15);
    expect(Object.keys(doc.assets).length).toBeGreaterThan(0);

    const allText = textNodes.map((n) => (n.type === "TEXT" ? n.characters : "")).join("\n");
    expect(allText.toLowerCase()).toContain("aerune");
  });

  test("culls offscreen horizontal reel cards on alpine-reel.html at 1920px", async ({ page }) => {
    const html = fs.readFileSync(path.join(repoRoot, "public/downloads/alpine-reel.html"), "utf8");
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.setContent(html, { waitUntil: "domcontentloaded" });
    await page.addScriptTag({ content: bridgeBundle });

    const doc = await page.evaluate(async () => {
      const w = window as unknown as {
        __h2f_prepareDocument: () => Promise<void>;
        __h2f_serializeDocumentFromRoot: (
          root: HTMLElement,
          opts: { viewportWidth: number; runId: string }
        ) => Promise<SerializedDocument>;
      };
      await w.__h2f_prepareDocument();
      return await w.__h2f_serializeDocumentFromRoot(document.body, { viewportWidth: 1920, runId: "test" });
    });

    expect(doc.root.width).toBe(1920);
    expect(doc.root.children.length).toBeGreaterThan(0);

    const nodes = collectNodes(doc.root);
    const textNodes = nodes.filter((n) => n.type === "TEXT");
    const svgNodes = nodes.filter((n) => n.type === "SVG");
    const imageFrames = nodes.filter(
      (n): n is SerializedFrameNode =>
        n.type === "FRAME" && n.fills.some((fill) => fill.type === "IMAGE")
    );

    expect(textNodes.length).toBeGreaterThan(0);
    expect(svgNodes.length).toBeGreaterThan(0);
    expect(Object.keys(doc.assets).length).toBeGreaterThan(0);
    expect(imageFrames.length).toBeGreaterThan(0);
    expect(imageFrames.length).toBeLessThan(6);
    for (const node of [...imageFrames, ...textNodes]) {
      expect(node.x + node.width).toBeGreaterThan(0);
      expect(node.x).toBeLessThan(1920);
    }
  });
});
