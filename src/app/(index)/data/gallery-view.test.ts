import { describe, expect, it } from "vitest";
import { readFilters } from "./filters";
import { applyGalleryViewToUrl, readGalleryView } from "./gallery-view";

describe("gallery-view URL state (Task 7)", () => {
  it("parses top-level tab and downloadsOnly independently of template filters", () => {
    expect(readGalleryView("")).toEqual({
      tab: "templates",
      downloadsOnly: false,
    });

    expect(readGalleryView("?tab=community&downloads=1&model=gemini&category=3d&q=studio")).toEqual({
      tab: "community",
      downloadsOnly: true,
    });

    expect(readGalleryView("?tab=invalid&downloads=true")).toEqual({
      tab: "templates",
      downloadsOnly: false,
    });

    expect(readFilters("?tab=community&downloads=1&model=gemini&category=3d&q=studio")).toEqual({
      category: "3d",
      model: "gemini",
      query: "studio",
      sort: "date",
      dir: "desc",
    });
  });

  it("updates tab and downloads query parameters while preserving existing template filters", () => {
    const initial = new URL("https://openlanding.example.test/?model=gemini&category=3d&q=trace");
    const toCommunity = applyGalleryViewToUrl(initial, { tab: "community", downloadsOnly: true });
    expect(toCommunity.url.searchParams.get("tab")).toBe("community");
    expect(toCommunity.url.searchParams.get("downloads")).toBe("1");
    expect(toCommunity.url.searchParams.get("model")).toBe("gemini");
    expect(toCommunity.url.searchParams.get("category")).toBe("3d");
    expect(toCommunity.url.searchParams.get("q")).toBe("trace");
    expect(toCommunity.historyMode).toBe("push");

    const toggleDownloads = applyGalleryViewToUrl(toCommunity.url, { downloadsOnly: false });
    expect(toggleDownloads.url.searchParams.get("tab")).toBe("community");
    expect(toggleDownloads.url.searchParams.get("downloads")).toBeNull();
    expect(toggleDownloads.historyMode).toBe("replace");

    const backToTemplates = applyGalleryViewToUrl(toggleDownloads.url, { tab: "templates" });
    expect(backToTemplates.url.searchParams.get("tab")).toBeNull();
    expect(backToTemplates.url.searchParams.get("model")).toBe("gemini");
    expect(backToTemplates.historyMode).toBe("push");
  });
});
