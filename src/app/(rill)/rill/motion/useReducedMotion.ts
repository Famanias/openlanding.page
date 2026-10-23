"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => undefined;
  const media = window.matchMedia(query);
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return typeof window !== "undefined" && window.matchMedia(query).matches;
}

export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

