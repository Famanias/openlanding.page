import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  WORLD_CHAPTERS,
  getNearestChapterSnapProgress,
  getNextChapterProgress,
} from "../logic/chapters";
import { clamp01 } from "../logic/rng";
export type ScrollController = {
  raf: (now: number) => void;
  scrollToProgress: (p: number, immediate?: boolean) => void;
  stepChapter: (direction: 1 | -1) => void;
  setScrollPaused: (paused: boolean) => void;
  dispose: () => void;
};
declare global {
  interface Window {
    __amaotoScrollTo?: (p: number) => void;
  }
}
export function createScrollController(
  track: HTMLElement,
  onProgress: (p: number) => void,
): ScrollController {
  gsap.registerPlugin(ScrollTrigger);
  let disposed = false,
    paused = false,
    programmatic = false,
    touching = false,
    progress = 0,
    idle: ReturnType<typeof setTimeout> | undefined,
    release: ReturnType<typeof setTimeout> | undefined;
  const savedOverflow = document.documentElement.style.overflow;
  const lenis = matchMedia("(pointer:fine)").matches
    ? new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.9 })
    : null;
  const proxy = { progress: 0 };
  const timeline = gsap.timeline({ paused: true }).to(proxy, {
    progress: 1,
    duration: 1,
    ease: "none",
    onUpdate: () => {
      progress = clamp01(proxy.progress);
      onProgress(progress);
    },
  });
  const trigger = ScrollTrigger.create({
    trigger: track,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (s) => {
      if (!paused) timeline.progress(s.progress);
    },
  });
  const max = () => Math.max(1, track.offsetHeight - innerHeight);
  const set = (p: number, immediate = false) => {
    p = clamp01(p);
    programmatic = true;
    clearTimeout(release);
    clearTimeout(idle);
    const y = p * max();
    if (immediate) {
      progress = p;
      lenis?.scrollTo(y, { immediate: true, force: true });
      window.scrollTo({ top: y, behavior: "instant" });
      timeline.progress(p);
      onProgress(p);
      ScrollTrigger.update();
      programmatic = false;
    } else {
      if (lenis)
        lenis.scrollTo(y, {
          duration: 1.05,
          force: true,
          easing: (t) => 1 - Math.pow(1 - t, 3),
        });
      else window.scrollTo({ top: y, behavior: "smooth" });
      release = setTimeout(() => {
        programmatic = false;
      }, 1200);
    }
  };
  const busy = () =>
    Boolean(
      document.activeElement?.matches(
        "input,textarea,select,button,[contenteditable=true]",
      ),
    );
  const schedule = () => {
    clearTimeout(idle);
    idle = setTimeout(() => {
      if (disposed || paused || programmatic || touching || busy()) return;
      const nearest = getNearestChapterSnapProgress(progress);
      if (Math.abs(nearest - progress) > 0.008) set(nearest);
    }, 900);
  };
  const scroll = () => {
    if (disposed || paused) return;
    ScrollTrigger.update();
    const p = clamp01(window.scrollY / max());
    timeline.progress(p);
    if (!paused) schedule();
  };
  const down = () => {
    touching = true;
    clearTimeout(idle);
  };
  const up = () => {
    touching = false;
    schedule();
  };
  const key = (e: KeyboardEvent) => {
    if (
      e.defaultPrevented ||
      e.altKey ||
      e.metaKey ||
      e.ctrlKey ||
      paused ||
      (e.target instanceof Element &&
        e.target.closest("input,textarea,select,button,[contenteditable=true]"))
    )
      return;
    if (/^[1-6]$/.test(e.key)) {
      e.preventDefault();
      set(WORLD_CHAPTERS[Number(e.key) - 1].restProgress);
    } else if (
      ["ArrowDown", "ArrowRight", " ", "ArrowUp", "ArrowLeft"].includes(e.key)
    ) {
      e.preventDefault();
      set(
        getNextChapterProgress(
          progress,
          e.key === "ArrowUp" || e.key === "ArrowLeft" || e.shiftKey ? -1 : 1,
        ),
      );
    }
  };
  const resize = () => {
    // Refresh emits progress for the new viewport; retain the authored step first.
    const heldProgress = progress;
    lenis?.resize();
    ScrollTrigger.refresh();
    set(heldProgress, true);
  };
  window.addEventListener("scroll", scroll, { passive: true });
  window.addEventListener("keydown", key);
  window.addEventListener("touchstart", down, { passive: true });
  window.addEventListener("touchend", up, { passive: true });
  window.addEventListener("touchcancel", up, { passive: true });
  window.addEventListener("resize", resize);
  const hook = (p: number) => set(p, true);
  window.__amaotoScrollTo = hook;
  const hash = WORLD_CHAPTERS.find((c) => `#${c.id}` === location.hash);
  set(hash?.restProgress ?? 0, true);
  return {
    raf: (now) => lenis?.raf(now),
    scrollToProgress: set,
    stepChapter: (direction) =>
      set(getNextChapterProgress(progress, direction)),
    setScrollPaused(value) {
      const wasPaused = paused;
      paused = value;
      clearTimeout(idle);
      document.documentElement.style.overflow = value
        ? "hidden"
        : savedOverflow;
      if (value) lenis?.stop();
      else {
        lenis?.start();
        if (wasPaused) set(progress, true);
      }
    },
    dispose() {
      disposed = true;
      clearTimeout(idle);
      clearTimeout(release);
      trigger.kill();
      timeline.kill();
      lenis?.destroy();
      document.documentElement.style.overflow = savedOverflow;
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("keydown", key);
      window.removeEventListener("touchstart", down);
      window.removeEventListener("touchend", up);
      window.removeEventListener("touchcancel", up);
      window.removeEventListener("resize", resize);
      if (window.__amaotoScrollTo === hook) delete window.__amaotoScrollTo;
    },
  };
}
