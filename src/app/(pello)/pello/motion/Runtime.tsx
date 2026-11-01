"use client";
import { useEffect, useState } from "react";
import { progress } from "./math";
import { useReducedMotion } from "./useReducedMotion";

export function Runtime() {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const root = document.getElementById("pel-site");
    if (!root) return;
    // Resolve the actual browser preference before changing permanent reveal state.
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.dataset.paused = String(paused || reduced || document.hidden);
    const visibility = () => { root.dataset.paused = String(paused || reduced || document.hidden); };
    document.addEventListener("visibilitychange", visibility);
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.in = "true"; revealObserver.unobserve(entry.target); } }), { threshold: .08, rootMargin: "0px 0px -24px 0px" });
    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach(el => { if (reduced) el.dataset.in = "true"; else revealObserver.observe(el); });
    const ambientObserver = new IntersectionObserver(entries => entries.forEach(entry => { (entry.target as HTMLElement).dataset.visible = String(entry.isIntersecting); }));
    root.querySelectorAll<HTMLElement>(".pel-ambient").forEach(el => ambientObserver.observe(el));
    const images = [...root.querySelectorAll<HTMLElement>("[data-parallax]")];
    const sections = [...root.querySelectorAll<HTMLElement>("[data-chapter]")];
    let metrics: { el: HTMLElement; start: number; end: number }[] = [];
    let chapterMetrics: { el: HTMLElement; top: number }[] = [];
    let height = 1;
    let frame = 0;
    let active = "";
    const links = [...root.querySelectorAll<HTMLAnchorElement>(".pel-nav a[data-target]")];
    const cursor = root.querySelector<HTMLElement>(".pel-nav-cursor");
    let linkMetrics: { el: HTMLAnchorElement; left: number; width: number }[] = [];
    const bar = root.querySelector<HTMLElement>(".pel-page-progress span");
    const track = root.querySelector<HTMLElement>(".pel-studio-path");
    const studio = root.querySelector<HTMLElement>("#balance");
    let studioStart = 0, studioEnd = 1;
    const measure = () => {
      const y = window.scrollY;
      metrics = images.map(el => { const r = el.getBoundingClientRect(); return { el, start: y + r.top - innerHeight, end: y + r.bottom }; });
      chapterMetrics = sections.map(el => ({ el, top: el.getBoundingClientRect().top + y }));
      linkMetrics = links.map(el => ({ el, left: el.offsetLeft, width: el.offsetWidth }));
      active = "";
      height = document.documentElement.scrollHeight - innerHeight;
      if (studio) { const r = studio.getBoundingClientRect(); studioStart = r.top + y - innerHeight * .7; studioEnd = studioStart + r.height; }
      schedule();
    };
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      root.dataset.scrolled = String(y > 48);
      if (bar) bar.style.transform = "scaleX(" + progress(y, 0, height) + ")";
      if (!reduced && matchMedia("(min-width: 800px) and (pointer: fine)").matches) {
        metrics.forEach(({ el, start, end }) => { el.style.transform = "translate3d(0," + ((progress(y, start, end) - .5) * 28) + "px,0)"; });
        if (track) track.style.transform = "scaleX(" + (.4 + progress(y, studioStart, studioEnd) * .6) + ")";
      }
      let current = "";
      chapterMetrics.forEach(({ el, top }) => { if (y + innerHeight * .35 >= top) current = el.id; });
      if (current !== active || !current) {
        active = current;
        links.forEach(link => { if (link.dataset.target === current) link.setAttribute("aria-current", "location"); else link.removeAttribute("aria-current"); });
        const selected = linkMetrics.find(item => item.el.dataset.target === current);
        if (cursor) {
          cursor.style.opacity = selected ? "1" : "0";
          if (selected) cursor.style.transform = "translateX(" + selected.left + "px) scaleX(" + selected.width / 100 + ")";
        }
      }
    };
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    const resize = new ResizeObserver(measure);
    resize.observe(root);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    void document.fonts.ready.then(measure);
    measure();
    return () => {
      cancelAnimationFrame(frame); resize.disconnect(); revealObserver.disconnect(); ambientObserver.disconnect();
      window.removeEventListener("scroll", schedule); window.removeEventListener("resize", measure); document.removeEventListener("visibilitychange", visibility);
      images.forEach(el => el.style.removeProperty("transform")); track?.style.removeProperty("transform");
    };
  }, [paused, reduce]);
  return <button className="pel-pause pel-js-only" type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? "Resume" : "Pause"} decorative motion</button>;
}
