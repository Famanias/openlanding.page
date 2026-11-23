import {
  DEFAULT_VIEWPORT_WIDTH,
  type ImportSettings,
  type PluginToUiMessage,
  type SerializedDocument,
  type UiToPluginMessage,
} from "../shared/types";
import { injectBridgeScript } from "./inject";

declare const __BRIDGE_SCRIPT__: string;

const READY_TIMEOUT_MS = 8000;
const CAPTURE_TIMEOUT_MS = 30000;
const MIN_WIDTH = 200;
const MAX_WIDTH = 4096;

interface UiElements {
  dropzone: HTMLElement;
  fileInput: HTMLInputElement;
  fileLabel: HTMLElement;
  togglePasteBtn: HTMLButtonElement;
  pasteWrap: HTMLElement;
  htmlTextarea: HTMLTextAreaElement;
  widthChips: HTMLElement;
  customWidthInput: HTMLInputElement;
  addWidthBtn: HTMLButtonElement;
  autoLayoutCheckbox: HTMLInputElement;
  createStylesCheckbox: HTMLInputElement;
  convertBtn: HTMLButtonElement;
  progressWrap: HTMLElement;
  progressBar: HTMLElement;
  statusText: HTMLElement;
  banner: HTMLElement;
}

function getElements(): UiElements {
  return {
    dropzone: document.getElementById("dropzone")!,
    fileInput: document.getElementById("file-input") as HTMLInputElement,
    fileLabel: document.getElementById("file-label")!,
    togglePasteBtn: document.getElementById("toggle-paste-btn") as HTMLButtonElement,
    pasteWrap: document.getElementById("paste-wrap")!,
    htmlTextarea: document.getElementById("html-textarea") as HTMLTextAreaElement,
    widthChips: document.getElementById("width-chips")!,
    customWidthInput: document.getElementById("custom-width-input") as HTMLInputElement,
    addWidthBtn: document.getElementById("add-width-btn") as HTMLButtonElement,
    autoLayoutCheckbox: document.getElementById("opt-auto-layout") as HTMLInputElement,
    createStylesCheckbox: document.getElementById("opt-create-styles") as HTMLInputElement,
    convertBtn: document.getElementById("convert-btn") as HTMLButtonElement,
    progressWrap: document.getElementById("progress-wrap")!,
    progressBar: document.getElementById("progress-bar")!,
    statusText: document.getElementById("status-text")!,
    banner: document.getElementById("banner")!,
  };
}

function parseWidth(raw: string): number | null {
  const n = Math.round(Number(raw.trim()));
  if (!Number.isFinite(n) || n < MIN_WIDTH || n > MAX_WIDTH) return null;
  return n;
}

function setProgress(el: UiElements, percent: number, label: string): void {
  el.progressWrap.hidden = false;
  el.progressBar.style.width = `${Math.max(0, Math.min(100, percent))}%`;
  el.statusText.textContent = label;
}

function showBanner(el: UiElements, kind: "success" | "error", text: string): void {
  el.banner.hidden = false;
  el.banner.className = `banner ${kind}`;
  el.banner.textContent = text;
}

function hideBanner(el: UiElements): void {
  el.banner.hidden = true;
  el.banner.textContent = "";
}

function captureHtmlAtWidth(html: string, width: number, runId: string): Promise<SerializedDocument> {
  return new Promise((resolve, reject) => {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
    iframe.style.position = "fixed";
    iframe.style.left = "-99999px";
    iframe.style.top = "0";
    iframe.style.width = `${width}px`;
    iframe.style.height = "1080px";
    iframe.style.border = "0";
    iframe.style.opacity = "0";
    iframe.style.pointerEvents = "none";

    let settled = false;
    let readyReceived = false;
    let captureTimer: number | undefined;

    const cleanup = () => {
      window.clearTimeout(readyTimer);
      if (captureTimer !== undefined) window.clearTimeout(captureTimer);
      window.removeEventListener("message", onMessage);
      iframe.remove();
    };

    const fail = (message: string) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error(message));
    };

    const readyTimer = window.setTimeout(() => {
      fail(`Timed out waiting for preview frame (${width}px) after ${READY_TIMEOUT_MS}ms.`);
    }, READY_TIMEOUT_MS);

    const onMessage = (event: MessageEvent) => {
      if (event.source !== iframe.contentWindow) return;
      const data = event.data as {
        type?: string;
        runId?: string;
        document?: SerializedDocument;
        message?: string;
      } | null;
      if (!data || typeof data.type !== "string") return;

      if (data.type === "h2f:ready" && !readyReceived) {
        readyReceived = true;
        window.clearTimeout(readyTimer);
        captureTimer = window.setTimeout(() => {
          fail(`Timed out capturing DOM at ${width}px.`);
        }, CAPTURE_TIMEOUT_MS);
        iframe.contentWindow?.postMessage(
          { type: "h2f:capture", runId, viewportWidth: width },
          "*"
        );
        return;
      }

      if (data.runId !== runId) return;

      if (data.type === "h2f:serialized") {
        if (!data.document) {
          fail("Invalid serialized document payload.");
          return;
        }
        settled = true;
        cleanup();
        resolve(data.document);
      } else if (data.type === "h2f:error") {
        fail(data.message || `Failed to serialize document at ${width}px.`);
      }
    };

    window.addEventListener("message", onMessage);
    iframe.srcdoc = injectBridgeScript(html, __BRIDGE_SCRIPT__);
    document.body.appendChild(iframe);
  });
}

function initPluginUi(): void {
  if (typeof document === "undefined") return;
  const el = getElements();
  if (!el.dropzone || !el.convertBtn) return;

  let uploadedHtml = "";
  let pasteMode = false;
  let busy = false;
  const activeWidths = new Set<number>([DEFAULT_VIEWPORT_WIDTH]);

  const syncChips = () => {
    for (const btn of Array.from(el.widthChips.querySelectorAll<HTMLButtonElement>(".chip"))) {
      const w = Number(btn.dataset.width);
      const isActive = activeWidths.has(w);
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    }
  };
  syncChips();

  const addOrActivateWidth = (width: number) => {
    activeWidths.add(width);
    const existing = el.widthChips.querySelector<HTMLButtonElement>(`[data-width="${width}"]`);
    if (!existing) {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip active";
      chip.dataset.width = String(width);
      chip.textContent = `${width}px`;
      chip.setAttribute("aria-pressed", "true");
      el.widthChips.appendChild(chip);
    }
    syncChips();
  };

  el.widthChips.addEventListener("click", (event) => {
    const btn = (event.target as HTMLElement).closest<HTMLButtonElement>(".chip");
    if (!btn) return;
    const width = Number(btn.dataset.width);
    if (!Number.isFinite(width)) return;
    if (activeWidths.has(width)) {
      activeWidths.delete(width);
    } else {
      activeWidths.add(width);
    }
    syncChips();
  });

  const handleAddCustomWidth = () => {
    const parsed = parseWidth(el.customWidthInput.value);
    if (parsed === null) {
      showBanner(el, "error", `Enter a width between ${MIN_WIDTH}px and ${MAX_WIDTH}px.`);
      return;
    }
    hideBanner(el);
    addOrActivateWidth(parsed);
    el.customWidthInput.value = "";
  };

  el.addWidthBtn.addEventListener("click", handleAddCustomWidth);
  el.customWidthInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddCustomWidth();
    }
  });

  const loadFile = async (file: File) => {
    if (!/\.html?$/i.test(file.name) && file.type !== "text/html") {
      showBanner(el, "error", "Please choose an .html or .htm file.");
      return;
    }
    hideBanner(el);
    try {
      uploadedHtml = await file.text();
      el.fileLabel.textContent = `${file.name} (${Math.max(1, Math.round(file.size / 1024))} KB)`;
    } catch (err) {
      uploadedHtml = "";
      showBanner(
        el,
        "error",
        `Failed to read file: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  };

  el.fileInput.addEventListener("change", () => {
    const file = el.fileInput.files?.[0];
    if (file) void loadFile(file);
  });

  el.dropzone.addEventListener("dragover", (event) => {
    event.preventDefault();
    el.dropzone.classList.add("dragover");
  });

  el.dropzone.addEventListener("dragleave", () => {
    el.dropzone.classList.remove("dragover");
  });

  el.dropzone.addEventListener("drop", (event) => {
    event.preventDefault();
    el.dropzone.classList.remove("dragover");
    const file = event.dataTransfer?.files?.[0];
    if (file) void loadFile(file);
  });

  el.togglePasteBtn.addEventListener("click", () => {
    pasteMode = !pasteMode;
    el.pasteWrap.hidden = !pasteMode;
    el.dropzone.hidden = pasteMode;
    el.togglePasteBtn.textContent = pasteMode ? "Or upload file" : "Or paste HTML";
  });

  window.addEventListener("message", (event: MessageEvent) => {
    const pluginMessage = (event.data as { pluginMessage?: PluginToUiMessage } | null)?.pluginMessage;
    if (!pluginMessage) return;

    if (pluginMessage.type === "import-progress") {
      const pct = Math.round((pluginMessage.current / Math.max(1, pluginMessage.total)) * 100);
      setProgress(el, pct, pluginMessage.label);
    } else if (pluginMessage.type === "import-complete") {
      busy = false;
      el.convertBtn.disabled = false;
      setProgress(el, 100, "Done");
      const { summary } = pluginMessage;
      const parts = [`Created ${summary.nodeCount} nodes`, `${summary.imageCount} images`];
      if (summary.styleCount) parts.push(`${summary.styleCount} styles`);
      if (summary.substitutedFonts.length > 0) {
        parts.push(`substituted fonts: ${summary.substitutedFonts.join(", ")}`);
      }
      if (summary.warnings.length > 0) {
        parts.push(`warnings: ${summary.warnings.join("; ")}`);
      }
      showBanner(el, "success", parts.join(" · "));
    } else if (pluginMessage.type === "import-error") {
      busy = false;
      el.convertBtn.disabled = false;
      el.progressWrap.hidden = true;
      showBanner(el, "error", pluginMessage.message);
    }
  });

  el.convertBtn.addEventListener("click", async () => {
    if (busy) return;
    hideBanner(el);

    const html = pasteMode ? el.htmlTextarea.value : uploadedHtml;
    if (!html.trim()) {
      showBanner(el, "error", pasteMode ? "Paste HTML before converting." : "Drop or select an HTML file first.");
      return;
    }

    if (el.customWidthInput.value.trim()) {
      const pending = parseWidth(el.customWidthInput.value);
      if (pending === null) {
        showBanner(el, "error", `Enter a width between ${MIN_WIDTH}px and ${MAX_WIDTH}px.`);
        return;
      }
      addOrActivateWidth(pending);
      el.customWidthInput.value = "";
    }

    const widths = Array.from(activeWidths);
    if (widths.length === 0) {
      showBanner(el, "error", "Select at least one viewport width.");
      return;
    }

    const settings: ImportSettings = {
      widths,
      useAutoLayout: el.autoLayoutCheckbox.checked,
      createStyles: el.createStylesCheckbox.checked,
    };

    busy = true;
    el.convertBtn.disabled = true;

    try {
      const documents: SerializedDocument[] = [];
      for (let i = 0; i < widths.length; i++) {
        const width = widths[i];
        setProgress(el, Math.round((i / (widths.length + 1)) * 100), `Capturing ${width}px (${i + 1}/${widths.length})...`);
        const runId = `run-${Date.now()}-${i}-${Math.random().toString(36).slice(2, 8)}`;
        const doc = await captureHtmlAtWidth(html, width, runId);
        documents.push(doc);
      }

      setProgress(el, 85, "Building Figma layers...");
      const message: UiToPluginMessage = {
        type: "import-documents",
        documents,
        settings,
      };
      parent.postMessage({ pluginMessage: message }, "*");
    } catch (err) {
      busy = false;
      el.convertBtn.disabled = false;
      el.progressWrap.hidden = true;
      showBanner(el, "error", err instanceof Error ? err.message : String(err));
    }
  });
}

initPluginUi();
