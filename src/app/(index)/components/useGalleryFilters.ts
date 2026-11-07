"use client";

import { useSyncExternalStore } from "react";
import { readFilters, type GalleryFilters } from "../data/filters";
import {
  GALLERY_URL_CHANGE_EVENT,
  readGalleryView,
  type GalleryView,
} from "../data/gallery-view";

export function subscribeGalleryUrlChange(listener: () => void): () => void {
  window.addEventListener("popstate", listener);
  window.addEventListener(GALLERY_URL_CHANGE_EVENT, listener);
  return () => {
    window.removeEventListener("popstate", listener);
    window.removeEventListener(GALLERY_URL_CHANGE_EVENT, listener);
  };
}

const getSnapshot = () => window.location.search;
const getServerSnapshot = () => "";

export function updateGalleryFilters(patch: Partial<GalleryFilters>) {
  const url = new URL(window.location.href);
  for (const [key, value] of Object.entries(patch)) {
    const param = key === "query" ? "q" : key;
    if (
      !value ||
      (value === "all" && key !== "query") ||
      (key === "sort" && value === "date") ||
      (key === "dir" && value === "desc")
    ) {
      url.searchParams.delete(param);
    } else {
      url.searchParams.set(param, value);
    }
  }
  window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
  window.dispatchEvent(new Event(GALLERY_URL_CHANGE_EVENT));
}

export function useGalleryFilters(): GalleryFilters {
  return readFilters(
    useSyncExternalStore(subscribeGalleryUrlChange, getSnapshot, getServerSnapshot),
  );
}

export function useGalleryView(): GalleryView {
  return readGalleryView(
    useSyncExternalStore(subscribeGalleryUrlChange, getSnapshot, getServerSnapshot),
  );
}
