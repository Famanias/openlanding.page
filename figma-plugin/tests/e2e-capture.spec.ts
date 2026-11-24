import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import * as esbuild from "esbuild";
import { test, expect } from "@playwright/test";
import { buildFigmaPage } from "../src/plugin/builder";
import { injectBridgeScript } from "../src/ui/inject";
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

function isSupportedMagicBytes(bytes: Uint8Array): "png" | "jpeg" | "gif" | null {
  if (bytes.length >= 24 && bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return "png";
  }
  if (bytes.length >= 4 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "jpeg";
  }
  if (bytes.length >= 10 && bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x38) {
    return "gif";
  }
  return null;
}

function createE2eMockFigma(): PluginAPI {
  const makeNode = () => {
    const node: Record<string, unknown> = {
      id: "n",
      type: "FRAME",
      name: "",
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      resize(w: number, h: number) {
        this.width = w;
        this.height = h;
      },
      fills: [],
      strokes: [],
      strokeWeight: 0,
      topLeftRadius: 0,
      topRightRadius: 0,
      bottomRightRadius: 0,
      bottomLeftRadius: 0,
      effects: [],
      opacity: 1,
      clipsContent: false,
      layoutMode: "NONE",
      layoutPositioning: "AUTO",
      children: [] as unknown[],
      appendChild(c: unknown) {
        (this.children as unknown[]).push(c);
      },
      setRangeFontName() {},
      setRangeFontSize() {},
      setRangeFills() {},
      setRangeTextDecoration() {},
      setRangeTextCase() {},
      setRangeLetterSpacing() {},
      setRangeLineHeight() {},
      setRangeHyperlink() {},
    };
    return node;
  };
  let imgCount = 0;
  return {
    currentPage: { children: [], appendChild() {} },
    listAvailableFontsAsync: async () => [{ fontName: { family: "Inter", style: "Regular" } }],
    loadFontAsync: async () => {},
    createFrame: () => makeNode(),
    createText: () => ({ ...makeNode(), type: "TEXT", characters: "" }),
    createNodeFromSvg: () => makeNode(),
    createImage: (bytes: Uint8Array) => {
      if (!isSupportedMagicBytes(bytes)) {
        throw new Error("Unsupported image format for figma.createImage");
      }
      return { hash: `img-${++imgCount}` };
    },
  } as unknown as PluginAPI;
}

test.beforeAll(async () => {
  execFileSync("node", [path.join(repoRoot, "figma-plugin/build.mjs")], { stdio: "pipe" });
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
  test("unwraps #standalone-root display:contents, transcodes WebP/SVG assets to PNG, and builds via postMessage h2f:capture on aerune.html", async ({
    page,
  }) => {
    const html = fs.readFileSync(path.join(repoRoot, "public/downloads/aerune.html"), "utf8");
    const injectedHtml = injectBridgeScript(html, bridgeBundle);
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.setContent("<!DOCTYPE html><html><body style='margin:0'></body></html>");

    const rawResult = await page.evaluate(async (srcdocHtml) => {
      return await new Promise<{ doc: SerializedDocument; assetBytes: Record<string, number[]> }>(
        (resolve, reject) => {
          const iframe = document.createElement("iframe");
          iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
          iframe.style.width = "1920px";
          iframe.style.height = "1080px";
          iframe.style.border = "0";
          const runId = "e2e-capture-aerune";

          const onMessage = (event: MessageEvent) => {
            if (event.source !== iframe.contentWindow) return;
            const data = event.data as {
              type?: string;
              runId?: string;
              document?: SerializedDocument;
              message?: string;
            } | null;
            if (!data) return;

            if (data.type === "h2f:ready") {
              iframe.contentWindow?.postMessage(
                { type: "h2f:capture", runId, viewportWidth: 1920 },
                "*"
              );
            } else if (data.type === "h2f:serialized" && data.runId === runId && data.document) {
              window.removeEventListener("message", onMessage);
              const assetBytes: Record<string, number[]> = {};
              for (const [id, asset] of Object.entries(data.document.assets)) {
                assetBytes[id] = Array.from(asset.bytes);
              }
              resolve({ doc: data.document, assetBytes });
            } else if (data.type === "h2f:error" && data.runId === runId) {
              window.removeEventListener("message", onMessage);
              reject(new Error(data.message || "Capture failed"));
            }
          };

          window.addEventListener("message", onMessage);
          iframe.srcdoc = srcdocHtml;
          document.body.appendChild(iframe);
        }
      );
    }, injectedHtml);

    const doc: SerializedDocument = {
      ...rawResult.doc,
      assets: Object.fromEntries(
        Object.entries(rawResult.doc.assets).map(([id, asset]) => [
          id,
          { mime: asset.mime, bytes: new Uint8Array(rawResult.assetBytes[id]) },
        ])
      ),
    };

    expect(doc.root.width).toBe(1920);
    expect(doc.root.children.length).toBeGreaterThan(0);

    const nodes = collectNodes(doc.root);
    const textNodes = nodes.filter((n) => n.type === "TEXT");
    expect(textNodes.length).toBeGreaterThan(15);

    const assetEntries = Object.entries(doc.assets);
    expect(assetEntries.length).toBeGreaterThan(0);
    for (const [, asset] of assetEntries) {
      expect(asset.mime).toBe("image/png");
      expect(Array.from(asset.bytes.slice(0, 4))).toEqual([0x89, 0x50, 0x4e, 0x47]);
      expect(isSupportedMagicBytes(asset.bytes)).toBe("png");
    }

    const allText = textNodes.map((n) => (n.type === "TEXT" ? n.characters : "")).join("\n");
    expect(allText.toLowerCase()).toContain("aerune");

    const summary = await buildFigmaPage(
      doc,
      { widths: [1920], useAutoLayout: true, createStyles: false },
      0,
      createE2eMockFigma()
    );
    expect(summary.nodeCount).toBeGreaterThan(15);
    expect(summary.imageCount).toBe(assetEntries.length);
    expect(summary.warnings.filter((w) => w.startsWith("Skipped image"))).toEqual([]);
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

  test("captures synapxe.html through built dist/ui.html inside an opaque sandboxed plugin UI iframe", async ({
    page,
  }) => {
    const uiHtml = fs.readFileSync(path.join(repoRoot, "figma-plugin/dist/ui.html"), "utf8");
    const synapxePath = path.join(repoRoot, "public/downloads/synapxe.html");

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.setContent(
      `<!DOCTYPE html><html><body style="margin:0"><iframe id="plugin-ui" sandbox="allow-scripts" style="width:380px;height:540px;border:0"></iframe></body></html>`
    );

    const capturePromise = page.evaluate(async () => {
      return await new Promise<{
        type?: string;
        nodeCount: number;
        assetCount: number;
        docHeight: number;
      }>((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error("Timed out waiting for pluginMessage")), 25000);
        window.addEventListener("message", (event) => {
          const msg = (event.data as { pluginMessage?: { type?: string; documents?: SerializedDocument[] } } | null)
            ?.pluginMessage;
          if (!msg || msg.type !== "import-documents" || !msg.documents?.length) return;
          clearTimeout(timer);
          const doc = msg.documents[0];
          const count = (n: SerializedNode): number =>
            n.type === "FRAME" ? 1 + n.children.reduce((s, c) => s + count(c), 0) : 1;
          resolve({
            type: msg.type,
            nodeCount: count(doc.root),
            assetCount: Object.keys(doc.assets).length,
            docHeight: doc.root.height,
          });
        });
      });
    });

    await page.evaluate((srcdoc) => {
      const frame = document.getElementById("plugin-ui") as HTMLIFrameElement;
      frame.srcdoc = srcdoc;
    }, uiHtml);

    const uiFrame = page.frameLocator("#plugin-ui");
    await uiFrame.locator("#file-input").setInputFiles(synapxePath);
    await expect(uiFrame.locator("#file-label")).toContainText("synapxe.html");
    await uiFrame.locator("#convert-btn").click();

    const result = await capturePromise;
    expect(result.type).toBe("import-documents");
    expect(result.nodeCount).toBeGreaterThan(300);
    expect(result.assetCount).toBeGreaterThanOrEqual(4);
    expect(result.docHeight).toBeGreaterThan(4000);
  });
});
