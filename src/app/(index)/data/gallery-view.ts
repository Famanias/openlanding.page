export const GALLERY_URL_CHANGE_EVENT = "gallery-filters-change";

export interface GalleryView {
  tab: "templates" | "community";
  downloadsOnly: boolean;
}

export function readGalleryView(search: string): GalleryView {
  const params = new URLSearchParams(search);
  return {
    tab: params.get("tab") === "community" ? "community" : "templates",
    downloadsOnly: params.get("downloads") === "1",
  };
}

export function applyGalleryViewToUrl(
  currentUrl: URL,
  patch: Partial<GalleryView>,
): { url: URL; historyMode: "push" | "replace" } {
  const nextUrl = new URL(currentUrl.toString());
  const currentView = readGalleryView(nextUrl.search);

  let historyMode: "push" | "replace" = "replace";
  if (patch.tab !== undefined) {
    if (patch.tab !== currentView.tab) {
      historyMode = "push";
    }
    if (patch.tab === "community") {
      nextUrl.searchParams.set("tab", "community");
    } else {
      nextUrl.searchParams.delete("tab");
    }
  }

  if (patch.downloadsOnly !== undefined) {
    if (patch.downloadsOnly) {
      nextUrl.searchParams.set("downloads", "1");
    } else {
      nextUrl.searchParams.delete("downloads");
    }
  }

  return { url: nextUrl, historyMode };
}

export function setGalleryView(patch: Partial<GalleryView>): void {
  const { url, historyMode } = applyGalleryViewToUrl(new URL(window.location.href), patch);
  const nextHref = url.pathname + url.search + url.hash;
  if (historyMode === "push") {
    window.history.pushState(window.history.state, "", nextHref);
  } else {
    window.history.replaceState(window.history.state, "", nextHref);
  }
  window.dispatchEvent(new Event(GALLERY_URL_CHANGE_EVENT));
}
