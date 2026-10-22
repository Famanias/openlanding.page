"use client";

import { useEffect } from "react";

/**
 * Shared IntersectionObserver that flips data-in="true" on [data-reveal] elements.
 * Runs under html[data-kn-motion="live"] only.
 */
export function Reveals() {
  useEffect(() => {
    if (document.documentElement.dataset.knMotion !== "live") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.in = "true";
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    const watch = (root: ParentNode) =>
      root.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in='true'])").forEach((el) => io.observe(el));
    watch(document);

    const mo = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.matches("[data-reveal]:not([data-in='true'])")) io.observe(node);
          watch(node);
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
