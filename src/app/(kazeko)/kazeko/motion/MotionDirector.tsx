"use client";
import { useEffect, useState } from "react";
import { clamp } from "./math";
import { useReducedMotion } from "./useReducedMotion";

export function MotionDirector() {
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".kz-site");
    if (!root) return;
    root.dataset.paused = String(paused || reduce);
    const onVisibility = () => { root.dataset.paused = String(paused || reduce || document.hidden); };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [paused, reduce]);
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".kz-site");
    if (!root) return;
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.in = "true"; reveal.unobserve(entry.target); }
    }), { threshold: .08 });
    root.querySelectorAll<HTMLElement>("[data-kz-reveal]").forEach((node) => {
      if (node.getBoundingClientRect().top < innerHeight) node.dataset.in = "true";
      else reveal.observe(node);
    });
    root.dataset.ready = "true";
    const ambient = new IntersectionObserver((entries) => entries.forEach((entry) => { (entry.target as HTMLElement).dataset.active = String(entry.isIntersecting); }));
    root.querySelectorAll("[data-kz-ambient]").forEach((node) => ambient.observe(node));
    const header = document.querySelector<HTMLElement>(".kz-header");
    const hero = document.querySelector<HTMLElement>(".kz-hero");
    const progressBar = document.querySelector<HTMLElement>(".kz-progress");
    let frame = 0;
    let total = 1;
    let heroHeight = 1;
    const measure = () => { total = Math.max(1, document.documentElement.scrollHeight - innerHeight); heroHeight = hero?.offsetHeight || 1; };
    const update = () => {
      progressBar?.style.setProperty("--page-progress", String(clamp(scrollY / total)));
      hero?.style.setProperty("--hero-progress", String(reduce ? 0 : clamp(scrollY / heroHeight)));
      if (header) header.dataset.scrolled = String(scrollY > 60);
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(() => { measure(); onScroll(); });
    observer.observe(document.body);
    measure(); update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    return () => { reveal.disconnect(); ambient.disconnect(); observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", measure); delete root.dataset.ready; };
  }, [reduce]);
  return <button className="kz-motion-toggle kz-js-only" type="button" onClick={() => setPaused(!paused)} aria-pressed={paused} disabled={reduce} aria-label={reduce ? "Animation disabled by your motion preference" : paused ? "Resume ambient animation" : "Pause ambient animation"}><span aria-hidden="true">{paused || reduce ? "▷" : "Ⅱ"}</span><span>{paused || reduce ? "Still" : "Motion"}</span></button>;
}
