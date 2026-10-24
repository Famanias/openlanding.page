"use client";
import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";
export function SmoothScroll() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let dispose: (() => void) | undefined;
    let cancelled = false;
    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({ lerp: .1, autoRaf: true, anchors: { offset: -90 }, prevent: (node) => node.tagName === "DIALOG" });
      dispose = () => lenis.destroy();
    });
    return () => { cancelled = true; dispose?.(); };
  }, [reduce]);
  return null;
}
