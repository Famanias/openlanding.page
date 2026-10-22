"use client";

import { useEffect } from "react";

/**
 * One shared IntersectionObserver for the whole page. Server components only mark elements with
 * data-reveal="mask|blind|rise|cascade|draw"; this flips data-in="true" once each one enters, and CSS does
 * the rest. Hidden pre-reveal states exist only under html[data-au-motion="live"], so nothing here is
 * needed for the page to be readable. It also pauses ambient loops that leave the screen.
 */
export function Reveals() {
  useEffect(() => {
    if (document.documentElement.dataset.auMotion !== "live") return;
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
    // Ambient loops (the hero window's glide) pause whenever they're off-screen.
    const ambient = new IntersectionObserver((entries) => {
      for (const entry of entries) (entry.target as HTMLElement).dataset.ambient = entry.isIntersecting ? "playing" : "paused";
    });
    document.querySelectorAll("[data-ambient]").forEach((el) => ambient.observe(el));
    // Elements that mount later (the reservation success panel, a new departures month) join in too.
    // Only added elements are scanned: the clock's text updates on every frame and must stay cheap.
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
      ambient.disconnect();
    };
  }, []);

  return null;
}
