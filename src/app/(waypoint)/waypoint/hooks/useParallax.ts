"use client";

import { useEffect, useState } from "react";
import { calculateParallaxOffset } from "../lib/parallaxMath";

export function useParallax(maxOffset: number = 110, factor: number = 0.22): number {
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    // Graceful fallback for prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOffset(0);
      return;
    }

    let rafId: number | null = null;

    function handleScroll() {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        const currentY = window.scrollY || window.pageYOffset || 0;
        setOffset(calculateParallaxOffset(currentY, maxOffset, factor));
        rafId = null;
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [maxOffset, factor]);

  return offset;
}
