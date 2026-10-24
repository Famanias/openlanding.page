"use client";
import { useEffect } from "react";
import { progress } from "./math";
import { lanternPose } from "../harbor/lantern";

export function MotionDirector() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".mh-site");
    const hero = document.querySelector<HTMLElement>(".mh-hero");
    const header = document.querySelector<HTMLElement>(".mh-header");
    if (!root || !hero) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let height = hero.offsetHeight;
    let pageHeight = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
    let frame = 0;
    const reveals = document.querySelectorAll<HTMLElement>("[data-mh-reveal]");
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.in = "true"; observer.unobserve(entry.target); }
    }), { threshold: 0.08, rootMargin: "0px 0px -25px 0px" });
    reveals.forEach(el => { el.dataset.observed = "true"; observer.observe(el); });
    const ambientObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      (entry.target as HTMLElement).dataset.visible = String(entry.isIntersecting);
    }), { threshold: 0 });
    document.querySelectorAll("[data-mh-ambient]").forEach(el => ambientObserver.observe(el));
    const sections = [...document.querySelectorAll<HTMLElement>("main > section[id]")].filter(el => document.querySelector(`.mh-desktop-nav a[href="#${el.id}"]`));
    const chapterObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll<HTMLAnchorElement>(".mh-desktop-nav a").forEach(link => {
        const active = link.hash === `#${entry.target.id}`;
        link.dataset.active = String(active);
        if (active) link.setAttribute("aria-current", "location"); else link.removeAttribute("aria-current");
      });
    }), { rootMargin: "-15% 0px -65% 0px" });
    sections.forEach(el => chapterObserver.observe(el));
    function update() {
      frame = 0;
      if (!root) return;
      const moving = !preference.matches && root.dataset.paused !== "true";
      const p = progress(scrollY, 0, height);
      root.style.setProperty("--page-progress", String(progress(scrollY, 0, pageHeight)));
      root.style.setProperty("--hero-scroll", String(moving ? p : 0));
      const pose = lanternPose(moving ? p : 0);
      root.style.setProperty("--lantern-x", `${pose.x}px`);
      root.style.setProperty("--lantern-y", `${pose.y}px`);
      root.style.setProperty("--lantern-rotate", `${pose.rotate}deg`);
      if (header) header.dataset.scrolled = String(scrollY > 70);
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const measure = () => { height = hero.offsetHeight; pageHeight = Math.max(document.documentElement.scrollHeight - innerHeight, 1); schedule(); };
    const resize = new ResizeObserver(measure); resize.observe(document.body);
    const pauseObserver = new MutationObserver(schedule); pauseObserver.observe(root, { attributes: true, attributeFilter: ["data-paused"] });
    const visibility = () => { root.dataset.hidden = String(document.hidden); };
    window.addEventListener("scroll", schedule, { passive: true }); window.addEventListener("resize", measure, { passive: true });
    document.addEventListener("visibilitychange", visibility); preference.addEventListener("change", schedule);
    document.fonts.ready.then(measure); update(); visibility();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); ambientObserver.disconnect(); chapterObserver.disconnect(); resize.disconnect(); pauseObserver.disconnect();
      window.removeEventListener("scroll", schedule); window.removeEventListener("resize", measure); document.removeEventListener("visibilitychange", visibility); preference.removeEventListener("change", schedule);
    };
  }, []);
  return null;
}
