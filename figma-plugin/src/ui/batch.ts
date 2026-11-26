import type { ImportSummary } from "../shared/types";

export type QueueItemStatus =
  | "pending"
  | "capturing"
  | "building"
  | "done"
  | "skipped"
  | "error";

export interface QueuedFileItem {
  id: string;
  key: string;
  file: File;
  status: QueueItemStatus;
  detail?: string;
}

export interface BatchAggregate {
  totalFiles: number;
  succeeded: number;
  skipped: number;
  failed: number;
  stopped: boolean;
  nodeCount: number;
  imageCount: number;
  styleCount: number;
  trackStyles: boolean;
  substitutedFonts: Set<string>;
  warnings: string[];
  errors: string[];
}

export function isHtmlFile(file: Pick<File, "name" | "type">): boolean {
  return /\.html?$/i.test(file.name) || file.type === "text/html";
}

export function fileIdentityKey(
  file: Pick<File, "name" | "size" | "lastModified">
): string {
  return `${file.name}::${file.size}::${file.lastModified}`;
}

export function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function extractHtmlTitle(html: string): string | null {
  const match = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  if (!match) return null;
  const decoded = match[1]
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&#x27;/gi, "'")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return decoded || null;
}

export function mergeQueuedFiles(
  existing: QueuedFileItem[],
  incoming: File[],
  makeId: (index: number) => string
): { items: QueuedFileItem[]; addedCount: number; rejectedCount: number } {
  const seen = new Set(existing.map((item) => item.key));
  const next = [...existing];
  let addedCount = 0;
  let rejectedCount = 0;

  for (const file of incoming) {
    if (!isHtmlFile(file)) {
      rejectedCount++;
      continue;
    }
    const key = fileIdentityKey(file);
    if (seen.has(key)) continue;
    seen.add(key);
    next.push({
      id: makeId(addedCount),
      key,
      file,
      status: "pending",
    });
    addedCount++;
  }

  return { items: next, addedCount, rejectedCount };
}

export function createBatchAggregate(
  totalFiles: number,
  trackStyles: boolean
): BatchAggregate {
  return {
    totalFiles,
    succeeded: 0,
    skipped: 0,
    failed: 0,
    stopped: false,
    nodeCount: 0,
    imageCount: 0,
    styleCount: 0,
    trackStyles,
    substitutedFonts: new Set<string>(),
    warnings: [],
    errors: [],
  };
}

export function addSummaryToBatch(
  batch: BatchAggregate,
  summary: ImportSummary
): void {
  batch.succeeded++;
  batch.nodeCount += summary.nodeCount;
  batch.imageCount += summary.imageCount;
  batch.styleCount += summary.styleCount ?? 0;
  for (const font of summary.substitutedFonts) {
    batch.substitutedFonts.add(font);
  }
  for (const warning of summary.warnings) {
    if (!batch.warnings.includes(warning)) {
      batch.warnings.push(warning);
    }
  }
}

export function formatBatchSummary(batch: BatchAggregate): {
  kind: "success" | "error";
  text: string;
} {
  const parts: string[] = [];

  if (batch.totalFiles > 1 || batch.skipped > 0 || batch.stopped) {
    const details: string[] = [];
    if (batch.skipped > 0) details.push(`${batch.skipped} skipped`);
    if (batch.failed > 0) details.push(`${batch.failed} failed`);
    if (batch.stopped) details.push("stopped");
    const suffix = details.length > 0 ? ` (${details.join(", ")})` : "";
    parts.push(`Imported ${batch.succeeded}/${batch.totalFiles} files${suffix}`);
  }

  parts.push(`Created ${batch.nodeCount} nodes`, `${batch.imageCount} images`);
  if (batch.trackStyles) parts.push(`${batch.styleCount} styles`);
  if (batch.substitutedFonts.size > 0) {
    parts.push(`substituted fonts: ${Array.from(batch.substitutedFonts).join(", ")}`);
  }
  if (batch.errors.length > 0) {
    parts.push(`errors: ${batch.errors.slice(0, 3).join("; ")}${batch.errors.length > 3 ? ` (+${batch.errors.length - 3} more)` : ""}`);
  }
  if (batch.warnings.length > 0) {
    parts.push(`warnings: ${batch.warnings.slice(0, 3).join("; ")}${batch.warnings.length > 3 ? ` (+${batch.warnings.length - 3} more)` : ""}`);
  }

  return {
    kind: batch.failed > 0 && batch.succeeded === 0 ? "error" : "success",
    text: parts.join(" · "),
  };
}
