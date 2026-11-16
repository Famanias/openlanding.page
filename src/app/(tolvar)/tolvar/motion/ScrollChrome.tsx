"use client";
import { useEffect } from "react";
import { progress, round } from "./math";
import { activeIndex, headerState, pageProgress, type HeaderState } from "./scroll";

/**
 * One rAF-throttled scroll listener for the whole page. It writes:
 *   --tv-progress on <html>   (the spirit-level bubble)
 *   --tv-hero on <html>       (hero photo parallax; skipped under reduced motion)
 *   data-state on the header  (top / pinned / hidden)
 *   aria-current on nav links, plus --tv-nav-x / --tv-nav-w for the sliding marker
 * Nothing here goes through React state.
 */
export function ScrollChrome() {
  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector<HTMLElement>("[data-tv-header]");
    const nav = document.querySelector<HTMLElement>("[data-tv-nav]");
    const hero = document.querySelector<HTMLElement>("[data-tv-hero]");
    const links = nav ? [...nav.querySelectorAll<HTMLAnchorElement>("[data-tv-link]")] : [];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let tops: number[] = [];
    let scrollable = 0;
    let heroHeight = 1;
    let lastY = window.scrollY;
    let state: HeaderState = "top";
    let active = -2;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      root.style.setProperty("--tv-progress", String(round(pageProgress(y, scrollable))));
      if (!reduced) root.style.setProperty("--tv-hero", String(round(progress(y, 0, heroHeight))));

      const nextState = headerState(y, lastY, state);
      if (nextState !== state) {
        state = nextState;
        header?.setAttribute("data-state", state);
      }
      lastY = y;

      const index = activeIndex(tops, y + window.innerHeight * 0.4);
      if (index !== active && nav) {
        active = index;
        links.forEach((link, i) => (i === index ? link.setAttribute("aria-current", "true") : link.removeAttribute("aria-current")));
        if (index >= 0) {
          nav.style.setProperty("--tv-nav-x", `${links[index].offsetLeft}px`);
          // unitless: the marker is 1px wide and scaled to the link's width
          nav.style.setProperty("--tv-nav-w", String(links[index].offsetWidth));
        }
        nav.dataset.active = String(index >= 0);
      }
    };

    // layout reads happen here, on resize, never inside the scroll handler
    const measure = () => {
      scrollable = root.scrollHeight - window.innerHeight;
      heroHeight = hero?.offsetHeight ?? window.innerHeight;
      tops = links.map((link) => {
        const section = document.getElementById(link.dataset.tvLink ?? "");
        return section ? section.getBoundingClientRect().top + window.scrollY : Number.POSITIVE_INFINITY;
      });
      active = -2;
      update();
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(measure);
    resize.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    measure();

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return null;
}
