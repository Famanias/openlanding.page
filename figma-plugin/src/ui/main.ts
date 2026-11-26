import {
  DEFAULT_VIEWPORT_WIDTH,
  type ImportSettings,
  type ImportSummary,
  type PluginToUiMessage,
  type SerializedDocument,
  type UiToPluginMessage,
} from "../shared/types";
import {
  addSummaryToBatch,
  createBatchAggregate,
  extractHtmlTitle,
  formatBatchSummary,
  formatFileSize,
  mergeQueuedFiles,
  type QueuedFileItem,
  type QueueItemStatus,
} from "./batch";
import { injectBridgeScript } from "./inject";

declare const __BRIDGE_SCRIPT__: string;

const READY_TIMEOUT_MS = 15000;
const CAPTURE_TIMEOUT_MS = 60000;
const EXISTING_FRAMES_TIMEOUT_MS = 400;
const MIN_WIDTH = 200;
const MAX_WIDTH = 4096;

interface UiElements {
  dropzone: HTMLElement;
  fileInput: HTMLInputElement;
  fileLabel: HTMLElement;
  queueWrap: HTMLElement;
  queueCount: HTMLElement;
  clearQueueBtn: HTMLButtonElement;
  queueList: HTMLElement;
  togglePasteBtn: HTMLButtonElement;
  pasteWrap: HTMLElement;
  htmlTextarea: HTMLTextAreaElement;
  widthChips: HTMLElement;
  customWidthInput: HTMLInputElement;
  addWidthBtn: HTMLButtonElement;
  autoLayoutCheckbox: HTMLInputElement;
  createStylesCheckbox: HTMLInputElement;
  skipExistingCheckbox: HTMLInputElement;
  convertBtn: HTMLButtonElement;
  stopBtn: HTMLButtonElement;
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
    queueWrap: document.getElementById("queue-wrap")!,
    queueCount: document.getElementById("queue-count")!,
    clearQueueBtn: document.getElementById("clear-queue-btn") as HTMLButtonElement,
    queueList: document.getElementById("queue-list")!,
    togglePasteBtn: document.getElementById("toggle-paste-btn") as HTMLButtonElement,
    pasteWrap: document.getElementById("paste-wrap")!,
    htmlTextarea: document.getElementById("html-textarea") as HTMLTextAreaElement,
    widthChips: document.getElementById("width-chips")!,
    customWidthInput: document.getElementById("custom-width-input") as HTMLInputElement,
    addWidthBtn: document.getElementById("add-width-btn") as HTMLButtonElement,
    autoLayoutCheckbox: document.getElementById("opt-auto-layout") as HTMLInputElement,
    createStylesCheckbox: document.getElementById("opt-create-styles") as HTMLInputElement,
    skipExistingCheckbox: document.getElementById("opt-skip-existing") as HTMLInputElement,
    convertBtn: document.getElementById("convert-btn") as HTMLButtonElement,
    stopBtn: document.getElementById("stop-btn") as HTMLButtonElement,
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
    // Keep the capture frame intersecting the UI viewport (behind the UI) so Chromium does not
    // render-throttle rAF, WebGL, or IntersectionObserver inside Figma's sandboxed plugin UI.
    iframe.style.position = "fixed";
    iframe.style.left = "0";
    iframe.style.top = "0";
    iframe.style.width = `${width}px`;
    iframe.style.height = "1080px";
    iframe.style.border = "0";
    iframe.style.opacity = "0";
    iframe.style.zIndex = "-1";
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

function statusLabel(status: QueueItemStatus): string {
  switch (status) {
    case "pending":
      return "Pending";
    case "capturing":
      return "Capturing";
    case "building":
      return "Building";
    case "done":
      return "Done";
    case "skipped":
      return "Skipped";
    case "error":
      return "Error";
  }
}

function initPluginUi(): void {
  if (typeof document === "undefined") return;
  const el = getElements();
  if (!el.dropzone || !el.convertBtn) return;

  let queue: QueuedFileItem[] = [];
  let itemSeq = 0;
  let pasteMode = false;
  let busy = false;
  let stopRequested = false;
  const existingFrameNames = new Set<string>();
  const activeWidths = new Set<number>([DEFAULT_VIEWPORT_WIDTH]);

  let pendingImport: {
    resolve: (summary: ImportSummary) => void;
    reject: (err: Error) => void;
    onProgress?: (current: number, total: number, label: string) => void;
  } | null = null;
  let pendingExistingFrames: ((names: string[]) => void) | null = null;

  const postPluginMessage = (message: UiToPluginMessage) => {
    parent.postMessage({ pluginMessage: message }, "*");
  };

  const refreshExistingFrames = (): Promise<void> =>
    new Promise((resolve) => {
      const timer = window.setTimeout(() => {
        pendingExistingFrames = null;
        resolve();
      }, EXISTING_FRAMES_TIMEOUT_MS);
      pendingExistingFrames = (names) => {
        window.clearTimeout(timer);
        existingFrameNames.clear();
        for (const name of names) existingFrameNames.add(name);
        resolve();
      };
      postPluginMessage({ type: "get-existing-frames" });
    });

  const sendImportToPlugin = (
    documents: SerializedDocument[],
    settings: ImportSettings,
    onProgress?: (current: number, total: number, label: string) => void
  ): Promise<ImportSummary> =>
    new Promise((resolve, reject) => {
      pendingImport = { resolve, reject, onProgress };
      postPluginMessage({ type: "import-documents", documents, settings });
    });

  const updateActionButtons = () => {
    el.convertBtn.disabled = busy;
    el.clearQueueBtn.disabled = busy;
    el.stopBtn.hidden = !busy;
    el.stopBtn.disabled = stopRequested;
    el.stopBtn.textContent = stopRequested ? "Stopping…" : "Stop";

    if (busy) {
      el.convertBtn.textContent = "Converting…";
    } else if (!pasteMode && queue.length > 1) {
      el.convertBtn.textContent = `Convert ${queue.length} files`;
    } else {
      el.convertBtn.textContent = "Convert";
    }
  };

  const renderQueue = () => {
    const showQueue = !pasteMode && queue.length > 0;
    el.queueWrap.hidden = !showQueue;

    if (queue.length === 0) {
      el.fileLabel.textContent = "or click to choose one or more files";
      el.queueCount.textContent = "0 files queued";
      el.queueList.replaceChildren();
      updateActionButtons();
      return;
    }

    if (queue.length === 1) {
      const only = queue[0].file;
      el.fileLabel.textContent = `${only.name} (${formatFileSize(only.size)})`;
    } else {
      const totalBytes = queue.reduce((sum, item) => sum + item.file.size, 0);
      el.fileLabel.textContent = `${queue.length} files queued (${formatFileSize(totalBytes)})`;
    }

    el.queueCount.textContent =
      queue.length === 1 ? "1 file queued" : `${queue.length} files queued`;

    const rows = queue.map((item) => {
      const row = document.createElement("div");
      row.className = "queue-item";
      row.dataset.itemId = item.id;
      if (item.detail) row.title = item.detail;

      const name = document.createElement("span");
      name.className = "queue-name";
      name.textContent = item.file.name;

      const size = document.createElement("span");
      size.className = "queue-size";
      size.textContent = formatFileSize(item.file.size);

      const badge = document.createElement("span");
      badge.className = `queue-status ${item.status}`;
      badge.textContent = statusLabel(item.status);

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "queue-remove";
      removeBtn.textContent = "×";
      removeBtn.disabled = busy;
      removeBtn.setAttribute("aria-label", `Remove ${item.file.name}`);
      removeBtn.addEventListener("click", () => {
        if (busy) return;
        queue = queue.filter((q) => q.id !== item.id);
        renderQueue();
      });

      row.append(name, size, badge, removeBtn);
      return row;
    });

    el.queueList.replaceChildren(...rows);
    updateActionButtons();
  };

  const setItemStatus = (item: QueuedFileItem, status: QueueItemStatus, detail?: string) => {
    item.status = status;
    item.detail = detail;
    const row = el.queueList.querySelector<HTMLElement>(`[data-item-id="${item.id}"]`);
    if (!row) return;
    if (detail) row.title = detail;
    const badge = row.querySelector<HTMLElement>(".queue-status");
    if (badge) {
      badge.className = `queue-status ${status}`;
      badge.textContent = statusLabel(status);
    }
    if (status === "capturing" || status === "building") {
      row.scrollIntoView?.({ block: "nearest" });
    }
  };

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

  const enqueueFiles = (fileList: FileList | File[]) => {
    if (busy) return;
    const incoming = Array.from(fileList);
    if (incoming.length === 0) return;

    const merged = mergeQueuedFiles(queue, incoming, () => `f-${++itemSeq}`);
    queue = merged.items;

    if (merged.addedCount === 0 && merged.rejectedCount > 0) {
      showBanner(el, "error", "Please choose .html or .htm files.");
    } else if (merged.rejectedCount > 0) {
      showBanner(
        el,
        "error",
        `Skipped ${merged.rejectedCount} non-HTML file(s).`
      );
    } else {
      hideBanner(el);
    }
    renderQueue();
  };

  el.fileInput.addEventListener("change", () => {
    if (el.fileInput.files && el.fileInput.files.length > 0) {
      enqueueFiles(el.fileInput.files);
      el.fileInput.value = "";
    }
  });

  el.clearQueueBtn.addEventListener("click", () => {
    if (busy) return;
    queue = [];
    hideBanner(el);
    el.progressWrap.hidden = true;
    renderQueue();
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
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      enqueueFiles(event.dataTransfer.files);
    }
  });

  el.togglePasteBtn.addEventListener("click", () => {
    if (busy) return;
    pasteMode = !pasteMode;
    el.pasteWrap.hidden = !pasteMode;
    el.dropzone.hidden = pasteMode;
    el.togglePasteBtn.textContent = pasteMode ? "Or upload files" : "Or paste HTML";
    renderQueue();
  });

  el.stopBtn.addEventListener("click", () => {
    if (!busy) return;
    stopRequested = true;
    updateActionButtons();
  });

  window.addEventListener("message", (event: MessageEvent) => {
    const pluginMessage = (event.data as { pluginMessage?: PluginToUiMessage } | null)?.pluginMessage;
    if (!pluginMessage) return;

    if (pluginMessage.type === "existing-frames") {
      if (pendingExistingFrames) {
        const resolve = pendingExistingFrames;
        pendingExistingFrames = null;
        resolve(pluginMessage.names);
      } else {
        existingFrameNames.clear();
        for (const name of pluginMessage.names) existingFrameNames.add(name);
      }
      return;
    }

    if (pluginMessage.type === "import-progress") {
      pendingImport?.onProgress?.(
        pluginMessage.current,
        pluginMessage.total,
        pluginMessage.label
      );
      return;
    }

    if (pluginMessage.type === "import-complete") {
      const pending = pendingImport;
      pendingImport = null;
      pending?.resolve(pluginMessage.summary);
      return;
    }

    if (pluginMessage.type === "import-error") {
      const pending = pendingImport;
      pendingImport = null;
      pending?.reject(new Error(pluginMessage.message));
    }
  });

  const captureAndImportHtml = async (
    html: string,
    widths: number[],
    settings: ImportSettings,
    fileLabel: string,
    fileIndex: number,
    totalFiles: number,
    onBuildingStart?: () => void
  ): Promise<{ skipped: boolean; titles: string[]; summary?: ImportSummary }> => {
    const filePrefix = totalFiles > 1 ? `[${fileIndex + 1}/${totalFiles}] ${fileLabel} · ` : "";
    const basePct = (fileIndex / totalFiles) * 100;
    const spanPct = 100 / totalFiles;

    if (el.skipExistingCheckbox.checked) {
      const staticTitle = extractHtmlTitle(html);
      if (staticTitle && existingFrameNames.has(staticTitle)) {
        return { skipped: true, titles: [staticTitle] };
      }
    }

    const documents: SerializedDocument[] = [];
    for (let i = 0; i < widths.length; i++) {
      const width = widths[i];
      const capturePct = basePct + spanPct * (i / (widths.length + 1)) * 0.6;
      setProgress(
        el,
        capturePct,
        `${filePrefix}Capturing ${width}px (${i + 1}/${widths.length})...`
      );
      const runId = `run-${Date.now()}-${fileIndex}-${i}-${Math.random().toString(36).slice(2, 8)}`;
      const doc = await captureHtmlAtWidth(html, width, runId);
      documents.push(doc);
    }

    const titles = documents.map((d) => d.title).filter(Boolean);
    if (
      el.skipExistingCheckbox.checked &&
      titles.length > 0 &&
      titles.every((t) => existingFrameNames.has(t))
    ) {
      return { skipped: true, titles };
    }

    onBuildingStart?.();
    setProgress(el, basePct + spanPct * 0.65, `${filePrefix}Building Figma layers...`);
    const summary = await sendImportToPlugin(documents, settings, (current, total, label) => {
      const buildFraction = Math.min(1, current / Math.max(1, total));
      const pct = basePct + spanPct * (0.65 + buildFraction * 0.35);
      setProgress(el, pct, `${filePrefix}${label}`);
    });

    return { skipped: false, titles, summary };
  };

  el.convertBtn.addEventListener("click", async () => {
    if (busy) return;
    hideBanner(el);

    if (pasteMode) {
      if (!el.htmlTextarea.value.trim()) {
        showBanner(el, "error", "Paste HTML before converting.");
        return;
      }
    } else if (queue.length === 0) {
      showBanner(el, "error", "Drop or select at least one HTML file first.");
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
    stopRequested = false;
    updateActionButtons();
    renderQueue();

    try {
      if (el.skipExistingCheckbox.checked) {
        await refreshExistingFrames();
      }

      if (pasteMode) {
        const batch = createBatchAggregate(1, settings.createStyles);
        const res = await captureAndImportHtml(
          el.htmlTextarea.value,
          widths,
          settings,
          "Pasted HTML",
          0,
          1
        );
        if (res.skipped) {
          batch.skipped++;
        } else if (res.summary) {
          addSummaryToBatch(batch, res.summary);
          for (const t of res.titles) existingFrameNames.add(t);
        }
        setProgress(el, 100, "Done");
        const formatted = formatBatchSummary(batch);
        showBanner(el, formatted.kind, formatted.text);
        return;
      }

      for (const item of queue) {
        setItemStatus(item, "pending");
      }

      const batch = createBatchAggregate(queue.length, settings.createStyles);
      for (let i = 0; i < queue.length; i++) {
        if (stopRequested) {
          batch.stopped = true;
          break;
        }
        const item = queue[i];
        setItemStatus(item, "capturing");
        try {
          const html = await item.file.text();
          if (!html.trim()) {
            throw new Error("File is empty.");
          }
          const res = await captureAndImportHtml(
            html,
            widths,
            settings,
            item.file.name,
            i,
            queue.length,
            () => setItemStatus(item, "building")
          );
          if (res.skipped) {
            batch.skipped++;
            setItemStatus(item, "skipped", "Already on page");
          } else if (res.summary) {
            addSummaryToBatch(batch, res.summary);
            for (const t of res.titles) existingFrameNames.add(t);
            setItemStatus(
              item,
              "done",
              `Created ${res.summary.nodeCount} nodes, ${res.summary.imageCount} images`
            );
          }
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          batch.failed++;
          batch.errors.push(`${item.file.name}: ${msg}`);
          setItemStatus(item, "error", msg);
        }
      }

      setProgress(el, 100, batch.stopped ? "Stopped" : "Done");
      const formatted = formatBatchSummary(batch);
      showBanner(el, formatted.kind, formatted.text);
    } catch (err) {
      el.progressWrap.hidden = true;
      showBanner(el, "error", err instanceof Error ? err.message : String(err));
    } finally {
      busy = false;
      stopRequested = false;
      renderQueue();
    }
  });
}

initPluginUi();
