import { describe, it, expect } from "vitest";
import {
  addSummaryToBatch,
  createBatchAggregate,
  extractHtmlTitle,
  formatBatchSummary,
  formatFileSize,
  mergeQueuedFiles,
  type QueuedFileItem,
} from "../src/ui/batch";

function makeFakeFile(name: string, size: number, lastModified = 1000, type = "text/html"): File {
  return { name, size, lastModified, type } as unknown as File;
}

describe("batch queue and summary helpers", () => {
  it("filters non-HTML files and deduplicates queued files by identity", () => {
    let seq = 0;
    const initial: QueuedFileItem[] = [];
    const first = mergeQueuedFiles(
      initial,
      [
        makeFakeFile("aerune.html", 1024),
        makeFakeFile("notes.txt", 256, 1000, "text/plain"),
        makeFakeFile("synapxe.htm", 2048),
      ],
      () => `id-${++seq}`
    );

    expect(first.addedCount).toBe(2);
    expect(first.rejectedCount).toBe(1);
    expect(first.items.map((i) => i.file.name)).toEqual(["aerune.html", "synapxe.htm"]);

    const second = mergeQueuedFiles(
      first.items,
      [makeFakeFile("aerune.html", 1024), makeFakeFile("alpine-reel.html", 4096)],
      () => `id-${++seq}`
    );
    expect(second.addedCount).toBe(1);
    expect(second.items.map((i) => i.file.name)).toEqual([
      "aerune.html",
      "synapxe.htm",
      "alpine-reel.html",
    ]);
  });

  it("extracts and decodes static HTML <title> values and formats file sizes", () => {
    expect(extractHtmlTitle("<html><head><title>Calder &amp; Rowe &mdash; Law</title></head></html>")).toBe(
      "Calder & Rowe &mdash; Law"
    );
    expect(extractHtmlTitle("<html><head><title>  A &lt;B&gt; &#39;C&#x27;  </title></head></html>")).toBe(
      "A <B> 'C'"
    );
    expect(extractHtmlTitle("<div>No title</div>")).toBeNull();
    expect(formatFileSize(500)).toBe("1 KB");
    expect(formatFileSize(1536)).toBe("2 KB");
    expect(formatFileSize(2 * 1024 * 1024)).toBe("2.0 MB");
  });

  it("aggregates and formats batch summaries across multiple files", () => {
    const batch = createBatchAggregate(3, true);
    addSummaryToBatch(batch, {
      nodeCount: 100,
      imageCount: 4,
      styleCount: 6,
      substitutedFonts: ["Inter"],
      warnings: ["Warn A"],
    });
    addSummaryToBatch(batch, {
      nodeCount: 50,
      imageCount: 2,
      styleCount: 3,
      substitutedFonts: ["Inter", "Roboto"],
      warnings: ["Warn A", "Warn B"],
    });
    batch.skipped = 1;

    const formatted = formatBatchSummary(batch);
    expect(formatted.kind).toBe("success");
    expect(formatted.text).toContain("Imported 2/3 files (1 skipped)");
    expect(formatted.text).toContain("Created 150 nodes · 6 images · 9 styles");
    expect(formatted.text).toContain("substituted fonts: Inter, Roboto");
    expect(formatted.text).toContain("warnings: Warn A; Warn B");
  });
});
