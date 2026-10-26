"use client";
import { useEffect } from "react";
import { heroBus } from "../hero/bus";
import { range } from "./math";
import { activeSection, enterProgress, pinProgress, stepAt } from "./progress";

type Scene = { el: HTMLElement; name: string; top: number; height: number; held: boolean; last: number };

const qa = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll<T>(sel));

/**
 * The page's one scroll owner. A single rAF per scroll frame writes:
 *  - the hero's cleave (`--cleave` for the poster, heroBus for the glass),
 *  - the held terms' progress and which term is active,
 *  - the library sheet's entry (`--enter`, which levels its cut edge),
 *  - page progress and the header's state on the root.
 * It also runs the reveal and ambient observers. Under reduced motion it writes nothing spatial.
 */
export function ScrollDirector() {
  useEffect(() => {
    const root = document.documentElement;
    const motion = matchMedia("(prefers-reduced-motion: no-preference)");
    let live = motion.matches;
    let scenes: Scene[] = [];
    let sections: { id: string; top: number }[] = [];
    let vh = innerHeight, frame = 0, lastY = scrollY, heroEnd = 0, chrome = "", section: string | null = "", term = -1;

    const terms = document.querySelector<HTMLElement>(".fc-terms");
    const termEls = terms ? qa(".fc-term", terms) : [];

    const measure = () => {
      vh = innerHeight;
      scenes = qa("[data-scene]").map((el) => {
        const stage = el.firstElementChild as HTMLElement | null;
        return {
          el, name: el.dataset.scene ?? "", top: el.getBoundingClientRect().top + scrollY, height: el.offsetHeight,
          held: !!stage && getComputedStyle(stage).position === "sticky", last: -1,
        };
      });
      sections = qa("main > section[id]").map((el) => ({ id: el.id, top: el.getBoundingClientRect().top + scrollY }));
      const hero = scenes.find((s) => s.name === "hero");
      // the header arrives as the slab finishes cleaving
      heroEnd = hero ? hero.top + Math.max(vh * 0.5, (hero.height - vh) * 0.85) : vh * 0.5;
      term = -1;
    };

    const setTerm = (i: number) => {
      if (i === term) return;
      term = i;
      termEls.forEach((el, k) => el.toggleAttribute("data-active", k === i));
      window.dispatchEvent(new CustomEvent("fc:term", { detail: i }));
    };

    const update = () => {
      frame = 0;
      const y = scrollY;
      const span = Math.max(1, root.scrollHeight - vh);
      root.style.setProperty("--fc-page", (y / span).toFixed(4));

      // the header: away over the slab, then shown; it ducks on a scroll down and returns on the way up
      const dir = y > lastY + 2 ? "down" : y < lastY - 2 ? "up" : null;
      lastY = y;
      let next = chrome;
      if (y < heroEnd) next = "off";
      else if (dir === "down" && y > heroEnd + vh * 0.5 && !root.hasAttribute("data-fc-lock")) next = "tucked";
      else if (dir === "up" || chrome === "off" || chrome === "") next = "on";
      if (next !== chrome) { chrome = next; root.dataset.fcChrome = next; }

      const now = activeSection(sections, y, vh, 0.35);
      if (now !== section) { section = now; window.dispatchEvent(new CustomEvent("fc:section", { detail: now })); }

      for (const s of scenes) {
        if (s.name === "hero") {
          const p = live && s.held ? pinProgress(y, s.top, s.height, vh) : 0;
          const cleave = range(p, 0.04, 0.82);
          if (Math.abs(cleave - s.last) < 1e-4) continue;
          s.last = cleave;
          heroBus.cleave = cleave;
          heroBus.wake?.();
          s.el.style.setProperty("--cleave", cleave.toFixed(4));
          s.el.toggleAttribute("data-cleaving", cleave > 0.02);
        } else if (s.name === "terms") {
          if (!live || !s.held) { setTerm(0); continue; }
          const p = pinProgress(y, s.top, s.height, vh);
          if (Math.abs(p - s.last) < 1e-4) continue;
          s.last = p;
          s.el.style.setProperty("--p", p.toFixed(4));
          // the last stretch of the hold belongs to the studio sheet sliding over
          setTerm(stepAt(range(p, 0, 0.84), termEls.length));
        } else if (s.name === "materials") {
          const p = live ? enterProgress(y, s.top, vh) : 1;
          if (Math.abs(p - s.last) < 1e-4) continue;
          s.last = p;
          s.el.style.setProperty("--enter", p.toFixed(4));
        }
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };

    const clear = () => {
      scenes.forEach((s) => { s.el.style.removeProperty("--cleave"); s.el.style.removeProperty("--p"); s.el.style.removeProperty("--enter"); s.el.removeAttribute("data-cleaving"); });
      heroBus.cleave = 0;
      termEls.forEach((el) => el.toggleAttribute("data-active", true));
    };

    const mode = () => {
      live = motion.matches;
      root.dataset.fcMotion = live ? "live" : "static";
      if (!live) clear();
      measure();
      schedule();
    };

    // reveals: masks and cleave wipes are clipped, and a fully clipped target never intersects,
    // so those watch their unclipped parent
    const targets = new Map<Element, Element[]>();
    qa("[data-reveal]").forEach((el) => {
      const v = el.dataset.reveal;
      const target = v === "mask" ? el.parentElement ?? el : el;
      targets.set(target, [...(targets.get(target) ?? []), el]);
    });
    const reveal = new IntersectionObserver((entries, io) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        targets.get(entry.target)?.forEach((el) => el.setAttribute("data-in", "true"));
        io.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -8% 0px" });
    targets.forEach((_, target) => reveal.observe(target));

    const ambient = new IntersectionObserver((entries) => entries.forEach((e) => e.target.setAttribute("data-active", String(e.isIntersecting))));
    qa("[data-ambient]").forEach((el) => ambient.observe(el));

    const resize = () => { measure(); schedule(); };
    const sizes = new ResizeObserver(resize);
    sizes.observe(document.body);
    const visibility = () => root.toggleAttribute("data-fc-hidden", document.hidden);

    mode();
    document.fonts?.ready.then(resize);
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    motion.addEventListener("change", mode);
    return () => {
      cancelAnimationFrame(frame);
      reveal.disconnect(); ambient.disconnect(); sizes.disconnect();
      removeEventListener("scroll", schedule); removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", visibility);
      motion.removeEventListener("change", mode);
      clear();
      delete root.dataset.fcMotion;
      delete root.dataset.fcChrome;
    };
  }, []);
  return null;
}
