"use client";

import { useEffect } from "react";

/**
 * One shared IntersectionObserver for the whole page. Server components only mark elements with
 * data-reveal="mask|rise|wipe|draw|cascade|settle"; this flips data-in="true" once each one enters, and CSS does
 * the rest. Hidden pre-reveal states exist only under html[data-cr-motion="live"], so nothing here is
 * needed for the page to be readable. It also pauses ambient loops that leave the screen.
 */
export function Reveals() {
  useEffect(() => {
    if (document.documentElement.dataset.crMotion !== "live") return;
    // Once an element has finished revealing it is marked data-done: its stagger delay is dropped so hover and
    // press transitions on it respond immediately.
    const timers: number[] = [];
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.dataset.in = "true";
          io.unobserve(el);
          timers.push(window.setTimeout(() => (el.dataset.done = "true"), 2400));
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    const watch = (root: ParentNode) =>
      root.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in='true'])").forEach((el) => io.observe(el));
    watch(document);

    // Ambient loops (the hero seal's turn, the glow's drift) pause whenever they're off-screen.
    const ambient = new IntersectionObserver((entries) => {
      for (const entry of entries) (entry.target as HTMLElement).dataset.ambient = entry.isIntersecting ? "playing" : "paused";
    });
    document.querySelectorAll("[data-ambient]").forEach((el) => ambient.observe(el));

    // Elements that mount later (the seal's success panel) join in too.
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
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return null;
}
