"use client";

import { useSyncExternalStore } from "react";
import { readFilters, type GalleryFilters } from "../data/filters";

const eventName = "gallery-filters-change";
function subscribe(listener: () => void) {
  window.addEventListener("popstate", listener);
  window.addEventListener(eventName, listener);
  return () => {
    window.removeEventListener("popstate", listener);
    window.removeEventListener(eventName, listener);
  };
}
const getSnapshot = () => window.location.search;
const getServerSnapshot = () => "";

export function updateGalleryFilters(patch: Partial<GalleryFilters>) {
  const url = new URL(window.location.href);
  for (const [key, value] of Object.entries(patch)) {
    const param = key === "query" ? "q" : key;
    if (!value || value === "all" && key !== "query" || key === "sort" && value === "date" || key === "dir" && value === "desc") url.searchParams.delete(param);
    else url.searchParams.set(param, value);
  }
  window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
  window.dispatchEvent(new Event(eventName));
}

export function useGalleryFilters() {
  return readFilters(useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot));
}
