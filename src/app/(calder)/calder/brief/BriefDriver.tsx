"use client";

import { useEffect } from "react";
import { CLAUSES } from "../content/argument";
import { isLive, onIdle } from "../motion/mode";
import { activeClause, clauseProgress, isSealed, pageLabel, runwayProgress } from "./progress";

/** The same query calder.css uses to pin the stage. Below it the brief is a plain, finished document. */
const PINNED = "(min-width: 960px) and (min-height: 620px)";

/**
 * Drives the brief from scroll with one rAF-throttled listener. It writes --p on each clause (how much of it is
 * written), --cr-bp on the section (overall progress, for the rail), flips each step's data-state, updates the page
 * counter and sets data-sealed once the last clause is done. No React state: only attributes and custom properties.
 */
export function BriefDriver() {
  useEffect(() => {
    const section = document.getElementById("argument");
    if (!section) return;
    const mq = window.matchMedia(PINNED);
    const clauses = Array.from(section.querySelectorAll<HTMLElement>(".cr-clause"));
    const steps = Array.from(section.querySelectorAll<HTMLElement>(".cr-step"));
    const page = section.querySelector<HTMLElement>("[data-page]");
    const rail = section.querySelector<HTMLElement>(".cr-arg__rail i");
    const count = CLAUSES.length;
    let raf = 0;
    let lastActive = -1;
    let lastSealed: boolean | null = null;

    const reset = () => {
      delete section.dataset.pin;
      delete section.dataset.sealed;
      rail?.style.removeProperty("transform");
      clauses.forEach((c) => c.style.removeProperty("--p"));
      steps.forEach((s) => (s.dataset.state = "idle"));
      if (page) page.textContent = pageLabel(0, count);
      lastActive = -1;
      lastSealed = null;
    };

    // Measured once and on resize, never inside the scroll handler.
    let top = 0;
    let height = 0;
    const measure = () => {
      const rect = section.getBoundingClientRect();
      top = rect.top + window.scrollY;
      height = rect.height;
    };

    const frame = () => {
      raf = 0;
      const p = runwayProgress(window.scrollY, top, height, window.innerHeight);
      // Written straight onto the rail, not onto the section: a variable there would be inherited by every word.
      if (rail) rail.style.transform = `scaleY(${p.toFixed(4)})`;
      clauses.forEach((el, i) => el.style.setProperty("--p", clauseProgress(p, i, count).toFixed(4)));

      const active = activeClause(p, count);
      if (active !== lastActive) {
        lastActive = active;
        steps.forEach((s, i) => (s.dataset.state = i < active ? "past" : i === active ? "active" : "next"));
        if (page) page.textContent = pageLabel(active, count);
      }
      const sealed = isSealed(p);
      if (sealed !== lastSealed) {
        lastSealed = sealed;
        section.dataset.sealed = String(sealed);
        if (sealed) steps.forEach((s) => (s.dataset.state = "past"));
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const onResize = () => {
      measure();
      schedule();
    };

    const sync = () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      raf = 0;
      if (!isLive() || !mq.matches) {
        reset();
        return;
      }
      section.dataset.pin = "1";
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", onResize, { passive: true });
      measure();
      frame();
    };

    const cancelIdle = onIdle(sync);
    mq.addEventListener("change", sync);
    document.fonts?.ready.then(() => mq.matches && isLive() && onResize());
    return () => {
      cancelIdle();
      mq.removeEventListener("change", sync);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      reset();
    };
  }, []);

  return null;
}
