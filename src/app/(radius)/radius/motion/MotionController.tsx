"use client";

import { useEffect } from "react";
import { clamp } from "./math";

/** One scheduler owns the page progress and billboard-to-sheet handoff. */
export function MotionController() {
  useEffect(() => {
    const root = document.documentElement;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hero = document.querySelector<HTMLElement>(".rd-hero");
    const progressRail = document.querySelector<HTMLElement>(".rd-progress");
    let observer: IntersectionObserver | undefined;
    let frame = 0;
    let pageTravel = 1;
    let heroTravel = 1;
    let previousUnfold = -1;
    let previousProgress = -1;

    const measure = () => {
      pageTravel = Math.max(1, root.scrollHeight - window.innerHeight);
      heroTravel = Math.max(1, window.innerHeight * 0.85);
      schedule();
    };
    const paint = () => {
      frame = 0;
      const progress = clamp(window.scrollY / pageTravel);
      if (progress !== previousProgress) {
        progressRail?.style.setProperty("--rd-progress", String(progress));
        previousProgress = progress;
      }
      const unfold = motion.matches ? 0 : clamp(window.scrollY / heroTravel);
      if (unfold !== previousUnfold) {
        hero?.style.setProperty("--rd-unfold", String(unfold));
        hero?.style.setProperty("--rd-unfold-top", `${(1 - unfold) * 62}%`);
        hero?.style.setProperty("--rd-unfold-bottom", `${(1 - unfold) * 18}%`);
        hero?.style.setProperty("--rd-mobile-cut-top", `${(1 - unfold) * 27}%`);
        hero?.style.setProperty("--rd-mobile-cut-bottom", `${(1 - unfold) * 78}%`);
        previousUnfold = unfold;
      }
      if (window.scrollY > 0 && root.dataset.rdHasScrolled !== "true") root.dataset.rdHasScrolled = "true";
      const scrolled = window.scrollY > 50 ? "true" : "false";
      if (root.dataset.rdScrolled !== scrolled) root.dataset.rdScrolled = scrolled;
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(paint); };
    const configure = () => {
      observer?.disconnect();
      const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
      if (motion.matches || !("IntersectionObserver" in window)) {
        nodes.forEach(node => { node.dataset.in = "true"; });
      } else {
        observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).dataset.in = "true";
              observer?.unobserve(entry.target);
            }
          });
        }, { rootMargin: "0px 0px -8% 0px", threshold: 0 });
        nodes.forEach(node => observer?.observe(node));
      }
      schedule();
    };

    const mutations = new MutationObserver(records => {
      for (const record of records) {
        for (const added of record.addedNodes) {
          if (!(added instanceof HTMLElement)) continue;
          const nodes = [added, ...added.querySelectorAll<HTMLElement>("[data-reveal]")];
          for (const node of nodes) {
            if (!node.matches("[data-reveal]") || node.dataset.in === "true") continue;
            if (motion.matches || !observer) node.dataset.in = "true";
            else observer.observe(node);
          }
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(measure) : undefined;
    resizeObserver?.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    motion.addEventListener("change", configure);
    configure();
    measure();
    return () => {
      observer?.disconnect();
      mutations.disconnect();
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      motion.removeEventListener("change", configure);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
