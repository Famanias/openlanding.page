import Lenis from "lenis";
import { clamp } from "../motion/math";
import { CHAPTER_POINTS, type ChapterId } from "../night/clock";
import { nearestChapter } from "../night/tide";

const SETTLE_DELAY_MS = 600;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const HISTORY_KEY = "ltProgress";

/**
 * Native scroll over the invisible track, smoothed by Lenis. Scroll position is the night's progress.
 * When the visitor stops, the night eases to the nearest chapter (a low tide); any new input cancels that.
 */
export function createNightScroll(opts: { onSettle: (id: ChapterId) => void }) {
  let snapping = false;
  let lastInput = performance.now();
  let lastScroll = 0;
  let velocity = 0;
  let settledAt: ChapterId | null = null;
  let held = false;
  let lastP = 0;

  const lenis = new Lenis({
    autoRaf: false,
    smoothWheel: true,
    lerp: 0.085,
    syncTouch: false,
    virtualScroll: () => {
      if (snapping) {
        snapping = false;
        lenis.scrollTo(lenis.animatedScroll, { immediate: true, force: true });
      }
      lastInput = performance.now();
      settledAt = null;
      return true;
    },
  });

  const onKeyOrTouch = () => {
    lastInput = performance.now();
  };
  window.addEventListener("keydown", onKeyOrTouch);
  window.addEventListener("touchstart", onKeyOrTouch, { passive: true });

  const toPx = (p: number) => clamp(p) * lenis.limit;
  const progress = () => (lenis.limit > 0 ? clamp(lenis.scroll / lenis.limit) : 0);

  // The track is sized in viewport heights, so a resize changes the scroll limit: keep the same moment of the night.
  const onResize = () => {
    const p = lastP;
    lenis.resize();
    lenis.scrollTo(toPx(p), { immediate: true, force: true });
    lastScroll = lenis.scroll;
    lastInput = performance.now();
  };
  window.addEventListener("resize", onResize);

  function settle(id: ChapterId) {
    snapping = false;
    settledAt = id;
    try {
      history.replaceState({ ...(history.state ?? {}), [HISTORY_KEY]: CHAPTER_POINTS[id] }, "");
    } catch {
      /* history may be unavailable in sandboxed frames */
    }
    opts.onSettle(id);
  }

  function goTo(id: ChapterId, immediate = false) {
    const from = progress();
    const to = CHAPTER_POINTS[id];
    snapping = true;
    lastInput = performance.now();
    lenis.scrollTo(toPx(to), {
      immediate,
      force: true,
      duration: clamp(0.5 + Math.abs(to - from) * 3.2, 0.5, 2.4),
      easing: easeInOut,
      onComplete: () => settle(id),
    });
    if (immediate) settle(id);
  }

  /** Restore the moment the visitor was at before a reload. */
  function restore() {
    try {
      history.scrollRestoration = "manual";
      const p = (history.state as Record<string, unknown> | null)?.[HISTORY_KEY];
      if (typeof p === "number") return goTo(nearestChapter(p), true);
    } catch {
      /* ignore */
    }
    // nothing to restore: begin at 23:04, whatever the scroll offset was on the tide table
    lenis.scrollTo(0, { immediate: true, force: true });
  }

  /** Drag on the moon dial: jump straight to p, then let the tide settle as usual. */
  function scrubTo(p: number) {
    snapping = false;
    settledAt = null;
    lastInput = performance.now();
    lenis.scrollTo(toPx(p), { immediate: true, force: true });
  }

  return {
    lenis,
    restore,
    goTo,
    scrubTo,
    /** While the moon dial is held, the night never settles away from under the visitor's finger. */
    hold(on: boolean) {
      held = on;
      lastInput = performance.now();
      if (on) snapping = false;
    },
    /** Advance Lenis and the settle logic. Returns this frame's progress and scroll speed (px/s). */
    frame(timeMs: number, dt: number) {
      lenis.raf(timeMs);
      const scroll = lenis.scroll;
      velocity = dt > 0 ? (scroll - lastScroll) / dt : 0;
      lastScroll = scroll;
      const p = progress();
      lastP = p;
      if (held) lastInput = performance.now();
      if (!snapping && performance.now() - lastInput > SETTLE_DELAY_MS && Math.abs(velocity) < 2) {
        const id = nearestChapter(p);
        if (Math.abs(CHAPTER_POINTS[id] - p) > 0.0008) {
          snapping = true;
          lenis.scrollTo(toPx(CHAPTER_POINTS[id]), {
            duration: clamp(0.4 + Math.abs(CHAPTER_POINTS[id] - p) * 6, 0.4, 1.2),
            easing: easeInOut,
            force: true,
            onComplete: () => settle(id),
          });
        } else if (settledAt !== id) {
          settle(id);
        }
      }
      return { p, velocity };
    },
    isSnapping: () => snapping,
    progress,
    destroy() {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKeyOrTouch);
      window.removeEventListener("touchstart", onKeyOrTouch);
      lenis.destroy();
    },
  };
}

export type NightScroll = ReturnType<typeof createNightScroll>;
