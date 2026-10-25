"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { segment } from "../motion/math";
import { LIVE_QUERY } from "../sheet/SheetController";
import { LOOKS } from "../content/looks";
import { activeLook, lookArrivals, lookFlash } from "./stack";

/** Look 1 holds for one viewport while the sheet scrolls off it, then each look slides over the last. */
const LEAD = 1;

/**
 * The looks' one client leaf: one rAF per scroll writes --arrive, --leave, --flash and --detail on each
 * sticky look, and the header's frame counter while the looks are on screen.
 */
export function LookStack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const media = window.matchMedia(LIVE_QUERY);
    const looks = [...root.querySelectorAll<HTMLElement>(".cg-look")];
    const counters = () => document.querySelectorAll<HTMLElement>("[data-frame-counter]");
    let top = 0;
    let frame = 0;
    let active = false;
    let current = -1;
    let label = "";

    const measure = () => { top = root.getBoundingClientRect().top + window.scrollY; };

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const vh = window.innerHeight;
      const arrivals = lookArrivals(y, top, vh, looks.length, LEAD);
      looks.forEach((look, i) => {
        const arrive = arrivals[i];
        const detail = i === 0 ? segment(y, top - vh * 0.1, top + vh * 0.45) : segment(arrive, 0.72, 1);
        look.style.setProperty("--arrive", arrive.toFixed(4));
        look.style.setProperty("--leave", (arrivals[i + 1] ?? 0).toFixed(4));
        look.style.setProperty("--flash", (i === 0 ? 0 : lookFlash(arrive)).toFixed(3));
        look.style.setProperty("--detail", detail.toFixed(4));
      });
      const index = activeLook(arrivals);
      if (index !== current) {
        current = index;
        root.dataset.active = String(index);
      }
      if (y >= top - 2) {
        const next = `Frame ${String(LOOKS[index].frame).padStart(2, "0")} / 12`;
        if (next !== label) {
          label = next;
          counters().forEach((node) => { node.textContent = next; });
        }
      } else {
        label = "";
      }
    };

    const onScroll = () => { if (active && !frame) frame = requestAnimationFrame(update); };
    const onResize = () => { if (!active) return; measure(); onScroll(); };
    const start = () => {
      active = true;
      measure();
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
    };
    const stop = () => {
      active = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      looks.forEach((look) => ["--arrive", "--leave", "--flash", "--detail"].forEach((name) => look.style.removeProperty(name)));
    };
    const sync = () => (media.matches ? start() : stop());
    const onMediaChange = () => { stop(); sync(); };
    sync();
    media.addEventListener("change", onMediaChange);
    document.fonts?.ready.then(onResize).catch(() => undefined);
    const settle = window.setTimeout(onResize, 1800);
    return () => {
      window.clearTimeout(settle);
      stop();
      media.removeEventListener("change", onMediaChange);
    };
  }, []);

  return <div ref={ref} className="cg-looks__stack" data-active="0">{children}</div>;
}
