"use client";
import { useSyncExternalStore } from "react";
const query = "(prefers-reduced-motion: reduce)";
const subscribe = (onChange: () => void) => { if (typeof window === "undefined") return () => undefined; const media = window.matchMedia(query); media.addEventListener("change", onChange); return () => media.removeEventListener("change", onChange); };
const snapshot = () => typeof window !== "undefined" && window.matchMedia(query).matches;
export function useReducedMotion() { return useSyncExternalStore(subscribe, snapshot, () => false); }

