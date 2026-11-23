import type {
  ImportSummary,
  PluginToUiMessage,
  UiToPluginMessage,
} from "../shared/types";
import { buildFigmaPage, countSerializedNodes } from "./builder";

const PAGE_GAP_PX = 120;

function isUiToPluginMessage(raw: unknown): raw is UiToPluginMessage {
  if (!raw || typeof raw !== "object") return false;
  const candidate = raw as {
    type?: unknown;
    documents?: unknown;
    settings?: unknown;
  };
  if (candidate.type === "cancel") return true;
  if (candidate.type === "import-documents") {
    return (
      Array.isArray(candidate.documents) &&
      candidate.settings !== null &&
      typeof candidate.settings === "object" &&
      !Array.isArray(candidate.settings)
    );
  }
  return false;
}

function computeNextOriginX(page: PageNode): number {
  if (page.children.length === 0) return 0;
  let maxRight = -Infinity;
  for (const child of page.children) {
    const right = child.x + child.width;
    if (Number.isFinite(right) && right > maxRight) {
      maxRight = right;
    }
  }
  return Number.isFinite(maxRight) ? maxRight + PAGE_GAP_PX : 0;
}

function postToUi(figmaApi: PluginAPI, msg: PluginToUiMessage): void {
  figmaApi.ui.postMessage(msg);
}

export async function handleUiMessage(
  raw: unknown,
  figmaApi: PluginAPI = figma
): Promise<void> {
  if (!isUiToPluginMessage(raw)) return;

  if (raw.type === "cancel") {
    figmaApi.closePlugin();
    return;
  }

  const { documents, settings } = raw;
  if (documents.length === 0) {
    postToUi(figmaApi, {
      type: "import-error",
      message: "No documents to import.",
    });
    return;
  }

  try {
    let originX = computeNextOriginX(figmaApi.currentPage);
    const totalNodes = Math.max(
      1,
      documents.reduce((sum, doc) => sum + countSerializedNodes(doc.root), 0)
    );
    let completedBefore = 0;

    const rootFrames: FrameNode[] = [];
    const substitutedFonts = new Set<string>();
    const warnings: string[] = [];
    let nodeCount = 0;
    let imageCount = 0;
    let styleCount = 0;

    for (let i = 0; i < documents.length; i++) {
      const doc = documents[i];
      const docTotal = countSerializedNodes(doc.root);
      const label = `Building ${doc.viewportWidth}px (${i + 1}/${documents.length})...`;

      postToUi(figmaApi, {
        type: "import-progress",
        label,
        current: completedBefore,
        total: totalNodes,
      });

      const docSummary = await buildFigmaPage(doc, settings, originX, figmaApi, {
        onProgress: (processed) => {
          postToUi(figmaApi, {
            type: "import-progress",
            label,
            current: completedBefore + processed,
            total: totalNodes,
          });
        },
        onRootFrame: (frame) => {
          rootFrames.push(frame);
        },
      });

      completedBefore += docTotal;
      originX += Math.max(1, doc.viewportWidth || doc.root.width) + PAGE_GAP_PX;
      nodeCount += docSummary.nodeCount;
      imageCount += docSummary.imageCount;
      styleCount += docSummary.styleCount ?? 0;
      for (const font of docSummary.substitutedFonts) {
        substitutedFonts.add(font);
      }
      warnings.push(...docSummary.warnings);
    }

    if (rootFrames.length > 0) {
      figmaApi.viewport.scrollAndZoomIntoView(rootFrames);
    }

    const summary: ImportSummary = {
      nodeCount,
      imageCount,
      ...(settings.createStyles ? { styleCount } : {}),
      substitutedFonts: Array.from(substitutedFonts),
      warnings,
    };
    postToUi(figmaApi, { type: "import-complete", summary });
  } catch (err) {
    postToUi(figmaApi, {
      type: "import-error",
      message: err instanceof Error ? err.message : String(err),
    });
  }
}

if (typeof figma !== "undefined") {
  figma.showUI(__html__, {
    width: 380,
    height: 540,
    themeColors: true,
  } as Parameters<PluginAPI["showUI"]>[1]);

  figma.ui.onmessage = (raw: unknown) => {
    void handleUiMessage(raw, figma);
  };
}
