"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { scrollToTarget } from "../motion/SmoothScroll";
import { progressFromOffsets, segment } from "../motion/math";
import { STAGES, readoutAt, scrollTargetFor, stageIndexAt, stageLocal } from "./scene";

/** The same query that switches on the live layout in fixture.css. */
export const LIVE_QUERY = "(prefers-reduced-motion: no-preference) and (scripting: enabled) and (min-height: 560px)";

const ALL_REACHED = STAGES.map((_, index) => index + 1).join(" ");

/**
 * The server renders stage 0 so the live layout's first paint is the empty shell. Outside the live
 * media query fixture.css ignores these attributes and shows the finished shop.
 *
 * The fit-out scene's one client leaf. A single rAF per scroll turns the section's real offsets into
 * progress, then writes CSS variables, data-stage / data-reached and the readout text nodes.
 * React state only changes when the stage changes, for the screen-reader announcement.
 */
export function SceneController({ children, labelledBy }: { children: ReactNode; labelledBy: string }) {
  const ref = useRef<HTMLElement | null>(null);
  const [announce, setAnnounce] = useState("");

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const media = window.matchMedia(LIVE_QUERY);
    let top = 0;
    let height = 0;
    let stage = -1;
    let frame = 0;
    let active = false;
    let last = { load: "", conversion: "", orders: "", checks: "" };
    const text = {
      load: root.querySelector<HTMLElement>('[data-readout="load"]'),
      conversion: root.querySelector<HTMLElement>('[data-readout="conversion"]'),
      orders: root.querySelector<HTMLElement>('[data-readout="orders"]'),
      checks: root.querySelector<HTMLElement>('[data-readout="checks"]'),
    };

    const measure = () => {
      top = root.getBoundingClientRect().top + window.scrollY;
      height = root.offsetHeight;
    };

    const write = (key: keyof typeof last, value: string) => {
      if (last[key] === value) return;
      last[key] = value;
      const node = text[key];
      if (node) node.textContent = value;
    };

    const update = () => {
      frame = 0;
      const p = progressFromOffsets(top - window.scrollY, height, window.innerHeight);
      const index = stageIndexAt(p);
      const readout = readoutAt(p);
      root.style.setProperty("--fx-p", p.toFixed(4));
      root.style.setProperty("--fx-local", stageLocal(p, index).toFixed(4));
      root.style.setProperty("--fx-exit", segment(p, 0.9, 1).toFixed(4));
      root.style.setProperty("--fx-load", (readout.loadSeconds / 4.1).toFixed(3));
      write("load", readout.loadSeconds.toFixed(1));
      write("conversion", readout.conversion.toFixed(1));
      write("orders", String(readout.orders));
      write("checks", String(readout.checks));
      if (index !== stage) {
        stage = index;
        root.dataset.stage = String(index);
        root.dataset.reached = STAGES.slice(0, index).map((_, n) => n + 1).join(" ");
        setAnnounce(index === 0 ? "" : `Stage ${index} of ${STAGES.length}: ${STAGES[index - 1].name}`);
      }
    };

    const onScroll = () => { if (active && !frame) frame = requestAnimationFrame(update); };
    const onResize = () => { if (!active) return; measure(); onScroll(); };

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[data-goto]");
      if (!link || !media.matches) return;
      event.preventDefault();
      measure();
      scrollToTarget(scrollTargetFor(Number(link.getAttribute("data-goto")), top, height, window.innerHeight));
    };

    const visibility = new IntersectionObserver(([entry]) => {
      root.dataset.onscreen = entry?.isIntersecting ? "true" : "false";
    });

    const start = () => {
      active = true;
      measure();
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      visibility.observe(root);
    };

    const stop = () => {
      active = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      visibility.disconnect();
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      stage = -1;
      last = { load: "", conversion: "", orders: "", checks: "" };
      // Outside the live scene the shop is finished: show its final numbers.
      const done = readoutAt(1);
      write("load", done.loadSeconds.toFixed(1));
      write("conversion", done.conversion.toFixed(1));
      write("orders", String(done.orders));
      write("checks", String(done.checks));
      root.style.removeProperty("--fx-load");
      root.dataset.stage = String(STAGES.length);
      root.dataset.reached = ALL_REACHED;
      setAnnounce("");
    };

    const sync = () => (media.matches ? start() : stop());
    const onMediaChange = () => { stop(); sync(); };
    sync();
    media.addEventListener("change", onMediaChange);
    root.addEventListener("click", onClick);
    // Fonts settling can change the section height; re-measure once they are ready.
    document.fonts?.ready.then(onResize).catch(() => undefined);

    return () => {
      stop();
      media.removeEventListener("change", onMediaChange);
      root.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <section ref={ref} id="fit-out" className="fx-scene" data-stage="0" data-reached="" aria-labelledby={labelledBy}>
      {children}
      <p className="fx-sr" aria-live="polite">{announce}</p>
    </section>
  );
}
