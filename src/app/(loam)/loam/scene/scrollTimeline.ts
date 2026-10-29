import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import {
  CHAPTERS,
  clamp01,
  getNearestChapterSnapProgress,
  getNextChapterProgress,
} from '../logic/chapters';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollController {
  getProgress: () => number;
  scrollToProgress: (targetProgress: number, immediate?: boolean) => void;
  stepChapter: (direction: 1 | -1) => void;
  setScrollPaused: (paused: boolean) => void;
  tickLenis: (timeMs: number) => void;
  dispose: () => void;
}

/**
 * Sets up the single master GSAP ScrollTrigger timeline driven by an invisible
 * tall scroll track from progress 0 -> 1, paired with Lenis smooth scroll,
 * automatic chapter rest-point snapping when scrolling stops, and keyboard
 * stepping (ArrowUp/Down/Left/Right, Space, Shift+Space).
 */
export function createScrollController(params: {
  scrollTrackElement: HTMLElement;
  onProgressUpdate: (progress: number) => void;
  isInspectLocked: () => boolean;
}): ScrollController {
  let masterProgress = 0;
  let isPaused = false;
  let snapTimeoutId: number | null = null;
  let isProgrammaticScroll = false;

  const lenis = new Lenis({
    lerp: 0.09,
    smoothWheel: true,
    wheelMultiplier: 0.9,
  });

  lenis.on('scroll', ScrollTrigger.update);

  // Master GSAP timeline scrubbed 0 -> 1 by the invisible scroll track
  const proxyState = { progress: 0 };
  const masterTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: params.scrollTrackElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        masterProgress = clamp01(self.progress);
        params.onProgressUpdate(masterProgress);

        // Schedule smooth snap to nearest chapter rest point when user stops scrolling
        if (!isProgrammaticScroll && !isPaused && !params.isInspectLocked()) {
          if (snapTimeoutId !== null) {
            window.clearTimeout(snapTimeoutId);
          }
          snapTimeoutId = window.setTimeout(() => {
            if (isPaused || params.isInspectLocked()) return;
            const snapTarget = getNearestChapterSnapProgress(masterProgress);
            if (Math.abs(snapTarget - masterProgress) > 0.008) {
              scrollToProgress(snapTarget, false);
            }
          }, 900);
        }
      },
    },
  });

  masterTimeline.to(proxyState, {
    progress: 1,
    duration: 1,
    ease: 'none',
  });

  const getMaxScrollPx = (): number => {
    return Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  };

  const scrollToProgress = (targetProgress: number, immediate = false) => {
    const clamped = clamp01(targetProgress);
    const targetY = clamped * getMaxScrollPx();
    isProgrammaticScroll = true;
    if (snapTimeoutId !== null) {
      window.clearTimeout(snapTimeoutId);
      snapTimeoutId = null;
    }

    lenis.scrollTo(targetY, {
      immediate,
      duration: immediate ? 0 : 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      onComplete: () => {
        isProgrammaticScroll = false;
      },
    });

    // Also update window scroll for deterministic headless/fallback environments
    if (immediate) {
      window.scrollTo(0, targetY);
      ScrollTrigger.update();
      masterProgress = clamped;
      params.onProgressUpdate(masterProgress);
      window.setTimeout(() => {
        isProgrammaticScroll = false;
      }, 150);
    }
  };

  if (typeof window !== 'undefined') {
    (window as unknown as Record<string, unknown>).__loamScrollTo = (
      p: number,
    ) => scrollToProgress(p, true);
  }

  const stepChapter = (direction: 1 | -1) => {
    if (isPaused || params.isInspectLocked()) return;
    const nextProgress = getNextChapterProgress(masterProgress, direction);
    scrollToProgress(nextProgress, false);
  };

  const setScrollPaused = (paused: boolean) => {
    isPaused = paused;
    if (paused) {
      lenis.stop();
      if (snapTimeoutId !== null) {
        window.clearTimeout(snapTimeoutId);
        snapTimeoutId = null;
      }
    } else {
      lenis.start();
    }
  };

  // Keyboard navigation: Arrow keys / Space / Shift+Space step between chapters
  const handleKeyDown = (e: KeyboardEvent) => {
    if (isPaused || params.isInspectLocked()) return;

    // Do not hijack keys when user is interacting with form fields or buttons
    const activeEl = document.activeElement;
    if (
      activeEl &&
      (activeEl.tagName === 'INPUT' ||
        activeEl.tagName === 'TEXTAREA' ||
        activeEl.tagName === 'SELECT')
    ) {
      return;
    }

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      stepChapter(1);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      stepChapter(-1);
    } else if (e.key === ' ' || e.code === 'Space') {
      // Allow Enter/Space on focused buttons to trigger their click handler naturally
      if (activeEl && activeEl.tagName === 'BUTTON') return;
      e.preventDefault();
      stepChapter(e.shiftKey ? -1 : 1);
    } else if (e.key >= '1' && e.key <= '6') {
      const idx = Number(e.key) - 1;
      if (CHAPTERS[idx]) {
        e.preventDefault();
        scrollToProgress(CHAPTERS[idx].restProgress, false);
      }
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  const tickLenis = (timeMs: number) => {
    if (!isPaused) {
      lenis.raf(timeMs);
    }
  };

  const dispose = () => {
    if (snapTimeoutId !== null) {
      window.clearTimeout(snapTimeoutId);
    }
    window.removeEventListener('keydown', handleKeyDown);
    masterTimeline.kill();
    ScrollTrigger.getAll().forEach((st) => st.kill());
    lenis.destroy();
  };

  return {
    getProgress: () => masterProgress,
    scrollToProgress,
    stepChapter,
    setScrollPaused,
    tickLenis,
    dispose,
  };
}
