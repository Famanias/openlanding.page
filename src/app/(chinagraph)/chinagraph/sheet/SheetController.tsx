"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { lerp, progressFromOffsets } from "../motion/math";
import { FRAMES, SELECTS, counterAt, enlargeAt, flashAt, flipToSquare, frameAt, lerpFlip, loupeAt, markAt } from "./roll";

/** The same query that switches on the pinned layouts in chinagraph.css. */
export const LIVE_QUERY = "(prefers-reduced-motion: no-preference) and (scripting: enabled) and (min-height: 560px)";

type Point = { x: number; y: number };

/**
 * The contact sheet's one client leaf. One rAF per scroll turns the section's real offsets into
 * progress, then moves the loupe, draws the select loops and enlarges frame 02 via CSS variables.
 * Outside the live query it does nothing: the CSS defaults are the finished, marked sheet.
 */
export function SheetController({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const media = window.matchMedia(LIVE_QUERY);
    const stage = root.querySelector<HTMLElement>(".cg-sheet__stage");
    const board = root.querySelector<HTMLElement>(".cg-board");
    const frames = [...root.querySelectorAll<HTMLElement>(".cg-frame")];
    const loops = new Map(SELECTS.map((n) => [n, root.querySelector<SVGElement>(`[data-loop="${n}"]`)]));
    const counters = () => document.querySelectorAll<HTMLElement>("[data-frame-counter]");
    let top = 0;
    let height = 0;
    let centres: Point[] = [];
    let cellRect = { x: 0, y: 0, w: 0, h: 0 };
    let stageSize = { w: 0, h: 0 };
    let frame = 0;
    let active = false;
    let under = -1;
    let label = "";
    const marks = new Map<number, string>();

    const measure = () => {
      top = root.getBoundingClientRect().top + window.scrollY;
      height = root.offsetHeight;
      if (!stage || !board) return;
      const boardBox = board.getBoundingClientRect();
      const stageBox = stage.getBoundingClientRect();
      stageSize = { w: stageBox.width, h: stageBox.height };
      centres = frames.map((el) => {
        const box = el.getBoundingClientRect();
        return { x: box.left - boardBox.left + box.width / 2, y: box.top - boardBox.top + box.height / 2 };
      });
      const first = frames[SELECTS[0] - 1]?.getBoundingClientRect();
      if (first) cellRect = { x: first.left - stageBox.left, y: first.top - stageBox.top, w: first.width, h: first.height };
      root.style.setProperty("--cell", `${first?.width ?? 0}px`);
      root.style.setProperty("--side", `${Math.max(stageSize.w, stageSize.h)}px`);
    };

    const update = () => {
      frame = 0;
      const p = progressFromOffsets(top - window.scrollY, height, window.innerHeight);
      const enlarge = enlargeAt(p);
      root.style.setProperty("--cg-p", p.toFixed(4));
      root.style.setProperty("--cg-enlarge", enlarge.toFixed(4));
      root.style.setProperty("--cg-flash", flashAt(p).toFixed(3));

      // Loupe: glide between cached cell centres.
      const pos = loupeAt(p);
      const i = Math.floor(pos);
      const a = centres[i];
      const b = centres[Math.min(FRAMES.length - 1, i + 1)];
      if (a && b) {
        root.style.setProperty("--lx", `${lerp(a.x, b.x, pos - i).toFixed(1)}px`);
        root.style.setProperty("--ly", `${lerp(a.y, b.y, pos - i).toFixed(1)}px`);
      }
      const current = frameAt(p);
      if (current !== under) {
        frames[under - 1]?.removeAttribute("data-under");
        frames[current - 1]?.setAttribute("data-under", "true");
        under = current;
      }

      for (const n of SELECTS) {
        const value = markAt(p, n).toFixed(3);
        if (marks.get(n) !== value) {
          marks.set(n, value);
          loops.get(n)?.style.setProperty("--mark", value);
        }
      }

      const flip = lerpFlip(flipToSquare(cellRect, stageSize), enlarge);
      root.style.setProperty("--ex", `${flip.x.toFixed(1)}px`);
      root.style.setProperty("--ey", `${flip.y.toFixed(1)}px`);
      root.style.setProperty("--es", flip.s.toFixed(4));

      if (p < 1) {
        const next = counterAt(p);
        if (next !== label) {
          label = next;
          counters().forEach((node) => { node.textContent = next; });
        }
      }
    };

    const onScroll = () => { if (active && !frame) frame = requestAnimationFrame(update); };
    const onResize = () => { if (!active) return; measure(); onScroll(); };

    const start = () => {
      active = true;
      root.dataset.live = "true";
      measure();
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
    };
    const stop = () => {
      active = false;
      delete root.dataset.live;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };
    const sync = () => (media.matches ? start() : stop());
    const onMediaChange = () => { stop(); sync(); };

    sync();
    media.addEventListener("change", onMediaChange);
    document.fonts?.ready.then(onResize).catch(() => undefined);
    // The strips slide in on load; measure the cells again once they have settled.
    const settle = window.setTimeout(onResize, 1800);
    return () => {
      window.clearTimeout(settle);
      stop();
      media.removeEventListener("change", onMediaChange);
    };
  }, []);

  return (
    <section ref={ref} id="sheet" className="cg-sheet" aria-labelledby="cg-title">
      {children}
    </section>
  );
}
