"use client";

import { useEffect } from "react";

/**
 * Flips `data-in` on every `[data-nm-reveal]` as it enters the viewport, once.
 * The hidden state lives in CSS under `.nm-js` and `prefers-reduced-motion: no-preference`,
 * so no script and reduced motion both see the finished page.
 */
export function Reveals() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-nm-reveal]"));
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.setAttribute("data-in", "true"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "true");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
