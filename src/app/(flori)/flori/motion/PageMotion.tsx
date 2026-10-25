"use client";
import { useEffect } from "react";
import { progressAt } from "./math";

export function PageMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const header = document.querySelector<HTMLElement>(".fl-header");
    const composer = document.getElementById("compose");
    const hero = document.getElementById("top");
    const rail = document.querySelector<HTMLElement>(".fl-progress");
    const postcards = document.querySelector<HTMLElement>(".fl-postcards");
    const stems = Array.from(document.querySelectorAll<SVGElement>("#compose .fl-stem"));
    let frame = 0, start = 0, span = 1, pageSpan = 1, heroSpan = 1;
    let previousGather = -1, previousExit = -1;
    const measure = () => {
      start = (composer?.getBoundingClientRect().top ?? 0) + window.scrollY - innerHeight * .85;
      span = innerHeight * .6;
      pageSpan = Math.max(1, root.scrollHeight - innerHeight);
      heroSpan = hero?.offsetHeight ?? innerHeight;
    };
    const update = () => {
      frame = 0;
      if (document.hidden) return;
      const y = window.scrollY;
      const compact = String(y > 70);
      if (header?.dataset.compact !== compact) header?.setAttribute("data-compact", compact);
      rail?.style.setProperty("--fl-progress", String(progressAt(y, 0, pageSpan)));
      const exit = query.matches ? 0 : progressAt(y, 0, heroSpan);
      if (exit !== previousExit) { postcards?.style.setProperty("--fl-hero-exit", String(exit)); previousExit = exit; }
      const gather = query.matches ? 1 : progressAt(y, start, span);
      if (gather !== previousGather) {
        composer?.style.setProperty("--fl-gather", String(gather));
        stems.forEach((stem) => stem.style.setProperty("--fl-gather", String(gather)));
        previousGather = gather;
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = () => { measure(); schedule(); };
    const mode = () => { root.dataset.flMotion = query.matches ? "reduced" : "live"; schedule(); };
    mode(); measure(); update();
    // Observe an unclipped ancestor: a fully masked element has no intersection area.
    const reveals = new Map<Element, Element[]>();
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      const target = el.parentElement ?? el;
      reveals.set(target, [...(reveals.get(target) ?? []), el]);
    });
    const observer = new IntersectionObserver((entries, io) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { reveals.get(entry.target)?.forEach((el) => el.setAttribute("data-in", "true")); io.unobserve(entry.target); } });
    }, { threshold: .08, rootMargin: "0px 0px -25px 0px" });
    reveals.forEach((_, target) => observer.observe(target));
    const ambient = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.setAttribute("data-active", String(entry.isIntersecting))));
    document.querySelectorAll("[data-ambient]").forEach((el) => ambient.observe(el));
    const visibility = () => { root.dataset.flHidden = String(document.hidden); schedule(); };
    const hashTarget = () => {
      const id = location.hash.slice(1);
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
    };
    const anchor = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const next = new URL(link.href, location.href);
      if (next.origin !== location.origin || next.pathname !== location.pathname || !next.hash) return;
      const target = document.getElementById(next.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      history.pushState(null, "", next.search + next.hash);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
      target.scrollIntoView({ behavior: query.matches ? "instant" : "smooth", block: "start" });
      if (link.classList.contains("fl-skip")) target.focus({ preventScroll: true });
    };
    if (location.hash) hashTarget();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("popstate", hashTarget);
    document.addEventListener("click", anchor);
    document.addEventListener("visibilitychange", visibility);
    query.addEventListener("change", mode);
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(document.body);
    document.fonts.ready.then(() => { if (root.dataset.flMotion) resize(); });
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); ambient.disconnect(); sizeObserver.disconnect();
      window.removeEventListener("scroll", schedule); window.removeEventListener("resize", resize); window.removeEventListener("popstate", hashTarget);
      document.removeEventListener("click", anchor); document.removeEventListener("visibilitychange", visibility); query.removeEventListener("change", mode);
      delete root.dataset.flMotion;
      postcards?.style.removeProperty("--fl-hero-exit");
      stems.forEach((stem) => stem.style.removeProperty("--fl-gather"));
    };
  }, []);
  return null;
}
