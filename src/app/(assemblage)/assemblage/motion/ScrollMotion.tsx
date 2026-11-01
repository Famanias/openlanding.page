"use client";

import { useEffect } from "react";
import { clamp, mix } from "../studio/physics";

export function ScrollMotion() {
  useEffect(() => {
    const site = document.querySelector<HTMLElement>(".as-site");
    if (!site) return;

    const progress = site.querySelector<HTMLElement>(".as-progress-bar");
    const hero = site.querySelector<HTMLElement>(".as-hero-runway");
    const process = site.querySelector<HTMLElement>(".as-process");
    const track = process?.querySelector<HTMLElement>(".as-step-grid");
    const pieces = [...site.querySelectorAll<HTMLElement>("[data-as-method-piece]")];
    const tagline = site.querySelector<HTMLElement>(".as-tagline");
    const heading = tagline?.querySelector("h2");
    const words = [...site.querySelectorAll<HTMLElement>("[data-as-word]")];
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1000px) and (min-height: 720px)");
    let frame: number | null = null;
    let anchorFrame = 0;
    let userInteracted = false;
    const initialHash = window.location.hash;
    const started = performance.now();

    function update() {
      frame = null;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pageProgress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      if (progress) progress.style.transform = `scaleX(${pageProgress})`;

      if (preference.matches) {
        tagline?.removeAttribute("data-as-word-motion");
        hero?.style.removeProperty("--as-departure");
        process?.removeAttribute("data-as-process-live");
        return;
      }

      process?.toggleAttribute("data-as-process-live", desktop.matches);

      if (tagline && heading) {
        const bounds = heading.getBoundingClientRect();
        const readingProgress = Math.min(1, Math.max(0,
          (window.innerHeight * 0.82 - bounds.top) / (window.innerHeight * 0.38 + bounds.height * 0.35),
        ));
        tagline.dataset.asWordMotion = "true";
        words.forEach((word, index) => {
          const next = String(readingProgress >= (index + 1) / words.length);
          if (word.dataset.in !== next) word.dataset.in = next;
        });
      }

      if (desktop.matches && hero) {
        const bounds = hero.getBoundingClientRect();
        hero.style.setProperty("--as-departure", String(clamp(-bounds.top / Math.max(1, bounds.height - innerHeight))));
      } else {
        hero?.style.removeProperty("--as-departure");
      }

      if (desktop.matches && process && track) {
        const bounds = track.getBoundingClientRect();
        const stepHeight = bounds.height / 3;
        const progress = clamp((innerHeight * .5 - bounds.top - stepHeight * .5) / (bounds.height - stepHeight));
        process.style.setProperty("--as-method-progress", String(progress));
        const stage = String(Math.round(progress * 2));
        if (process.dataset.asStage !== stage) process.dataset.asStage = stage;
        process.querySelectorAll<HTMLAnchorElement>(".as-method-stages a").forEach((anchor, index) => {
          if (index === Number(stage)) anchor.setAttribute("aria-current", "step");
          else anchor.removeAttribute("aria-current");
        });
        const from = progress < .5 ? 0 : 1, t = progress < .5 ? progress * 2 : (progress - .5) * 2;
        const poses = [
          [[-55, -45, -18, .85], [70, -30, 22, .82], [-5, 65, -12, .9]],
          [[-75, -55, 0, .78], [85, -45, 0, .8], [0, 85, 0, .8]],
          [[-25, -15, -6, 1], [55, -35, 9, 1], [-10, 55, 4, 1]],
        ];
        pieces.forEach((piece, index) => {
          const a = poses[from][index], b = poses[from + 1][index];
          piece.style.setProperty("--as-piece-transform", `translate3d(${mix(a[0], b[0], t)}px, ${mix(a[1], b[1], t)}px, ${index * 18}px) rotate(${mix(a[2], b[2], t)}deg) scale(${mix(a[3], b[3], t)})`);
        });
      }
    }

    const schedule = () => { if (frame === null) frame = requestAnimationFrame(update); };
    const resize = () => {
      schedule();
      // Hydration can expand the two cinematic scroll ranges after native hash positioning.
      // Correct that initial anchor only until the visitor takes control of the page.
      if (!initialHash || userInteracted || window.location.hash !== initialHash || performance.now() - started > 10_000) return;
      cancelAnimationFrame(anchorFrame);
      anchorFrame = requestAnimationFrame(() => {
        if (userInteracted) return;
        try { document.getElementById(decodeURIComponent(initialHash.slice(1)))?.scrollIntoView({ block: "start", behavior: "instant" }); } catch { /* A malformed fragment is left to native navigation. */ }
      });
    };
    const takeControl = () => { userInteracted = true; };
    const intentEvents = ["pointerdown", "touchstart", "wheel", "keydown"] as const;
    intentEvents.forEach((name) => window.addEventListener(name, takeControl, { passive: true }));
    const resizeObserver = typeof ResizeObserver === "function" ? new ResizeObserver(resize) : null;
    resizeObserver?.observe(site);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("pageshow", schedule);
    preference.addEventListener("change", schedule);
    desktop.addEventListener("change", schedule);
    update();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pageshow", schedule);
      preference.removeEventListener("change", schedule);
      desktop.removeEventListener("change", schedule);
      resizeObserver?.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
      cancelAnimationFrame(anchorFrame);
      intentEvents.forEach((name) => window.removeEventListener(name, takeControl));
      progress?.style.removeProperty("transform");
      tagline?.removeAttribute("data-as-word-motion");
      words.forEach((word) => { delete word.dataset.in; });
      hero?.style.removeProperty("--as-departure");
      process?.removeAttribute("data-as-process-live");
      process?.style.removeProperty("--as-method-progress");
      pieces.forEach((piece) => piece.style.removeProperty("--as-piece-transform"));
    };
  }, []);
  return null;
}
