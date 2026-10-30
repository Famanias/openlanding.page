import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { CHAPTERS, clamp } from '../physics/geodesicMath';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollControllerCallbacks {
  onProgress: (progress: number) => void;
  getIsLocked: () => boolean;
}

export interface ScrollControllerHandle {
  scrollToChapter: (chapterIndex: number) => void;
  stepChapter: (delta: number) => void;
  setLocked: (locked: boolean) => void;
  getProgress: () => number;
  destroy: () => void;
}

export function initMasterScrollTimeline(
  scrollContainerEl: HTMLElement,
  callbacks: ScrollControllerCallbacks
): ScrollControllerHandle {
  let currentProgress = 0;
  let isInspectLocked = false;
  let snapTimeout: number | null = null;

  const lenis = new Lenis({
    lerp: 0.09,
    smoothWheel: true,
    wheelMultiplier: 0.85,
  });

  const onLenisScroll = () => {
    ScrollTrigger.update();
  };

  lenis.on('scroll', onLenisScroll);

  const tickerFn = (time: number) => {
    if (!isInspectLocked && !callbacks.getIsLocked()) {
      lenis.raf(time * 1000);
    }
  };
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  const updateFromScroll = () => {
    const maxScroll = Math.max(1, scrollContainerEl.scrollHeight - window.innerHeight);
    const rawProgress = clamp(window.scrollY / maxScroll, 0, 1);
    currentProgress = rawProgress;
    callbacks.onProgress(currentProgress);

    // Debounced gentle chapter snap when scrolling settles
    if (snapTimeout !== null) {
      window.clearTimeout(snapTimeout);
    }
    snapTimeout = window.setTimeout(() => {
      if (isInspectLocked || callbacks.getIsLocked()) return;
      const nearestChapterIdx = Math.round(currentProgress * (CHAPTERS.length - 1));
      const targetProgress = nearestChapterIdx / (CHAPTERS.length - 1);
      if (Math.abs(currentProgress - targetProgress) > 0.012 && Math.abs(currentProgress - targetProgress) < 0.085) {
        const targetY = targetProgress * Math.max(1, scrollContainerEl.scrollHeight - window.innerHeight);
        lenis.scrollTo(targetY, { duration: 0.75 });
      }
    }, 320);
  };

  const st = ScrollTrigger.create({
    trigger: scrollContainerEl,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      if (isInspectLocked || callbacks.getIsLocked()) return;
      currentProgress = clamp(self.progress, 0, 1);
      callbacks.onProgress(currentProgress);
    },
  });

  window.addEventListener('scroll', updateFromScroll, { passive: true });

  const scrollToChapter = (chapterIndex: number) => {
    if (isInspectLocked || callbacks.getIsLocked()) return;
    const clampedIdx = clamp(chapterIndex, 0, CHAPTERS.length - 1);
    const targetProgress = clampedIdx / (CHAPTERS.length - 1);
    const maxScroll = Math.max(1, scrollContainerEl.scrollHeight - window.innerHeight);
    const targetY = targetProgress * maxScroll;

    if (snapTimeout !== null) {
      window.clearTimeout(snapTimeout);
      snapTimeout = null;
    }

    currentProgress = targetProgress;
    callbacks.onProgress(currentProgress);
    lenis.scrollTo(targetY, { immediate: true });
    window.scrollTo({ top: targetY, behavior: 'auto' });
  };

  const stepChapter = (delta: number) => {
    if (isInspectLocked || callbacks.getIsLocked()) return;
    const activeIdx = Math.round(currentProgress * (CHAPTERS.length - 1));
    scrollToChapter(activeIdx + delta);
  };

  const setLocked = (locked: boolean) => {
    isInspectLocked = locked;
    if (locked) {
      lenis.stop();
    } else {
      lenis.start();
    }
  };

  return {
    scrollToChapter,
    stepChapter,
    setLocked,
    getProgress: () => currentProgress,
    destroy: () => {
      if (snapTimeout !== null) window.clearTimeout(snapTimeout);
      window.removeEventListener('scroll', updateFromScroll);
      st.kill();
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
    },
  };
}
