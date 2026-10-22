"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const SLIDE_IDS = ["depart", "prepare", "connected", "workspace", "arrive"] as const;
const COOLDOWN_MS = 650;

/**
 * Presentation slide controller:
 * Divides the KINETIC landing page into discrete 100svh presentation slides.
 * Provides snappy transition-like navigation via wheel notches, keyboard arrows/space,
 * touch swipes, and floating slide controls without waiting for long road traverses.
 */
export function SlideController() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const cooldownRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  const goToSlide = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(SLIDE_IDS.length - 1, index));
    const targetId = SLIDE_IDS[clamped];
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setCurrentSlide(clamped);
    }
  }, []);

  useEffect(() => {
    // Determine active slide from scroll position
    const handleScroll = () => {
      const vh = window.innerHeight || 1;
      const scrollY = window.scrollY;
      const idx = Math.round(scrollY / vh);
      setCurrentSlide(Math.max(0, Math.min(SLIDE_IDS.length - 1, idx)));
    };

    // Wheel event debounced navigation
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 22) return;
      if (cooldownRef.current) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      cooldownRef.current = true;
      setTimeout(() => {
        cooldownRef.current = false;
      }, COOLDOWN_MS);

      const vh = window.innerHeight || 1;
      const current = Math.round(window.scrollY / vh);
      const next = current + (e.deltaY > 0 ? 1 : -1);
      goToSlide(next);
    };

    // Keyboard slide navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) {
        e.preventDefault();
        goToSlide(currentSlide + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey)) {
        e.preventDefault();
        goToSlide(currentSlide - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goToSlide(SLIDE_IDS.length - 1);
      }
    };

    // Touch swipe navigation
    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (touchStartYRef.current === null) return;
      const deltaY = touchStartYRef.current - e.changedTouches[0].clientY;
      touchStartYRef.current = null;

      if (Math.abs(deltaY) > 48) {
        const vh = window.innerHeight || 1;
        const current = Math.round(window.scrollY / vh);
        goToSlide(current + (deltaY > 0 ? 1 : -1));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentSlide, goToSlide]);

  return (
    <nav
      aria-label="Slide navigation"
      className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2 rounded-full border border-[#8E8294]/30 bg-[#FAF7F2]/90 px-3 py-1.5 shadow-lg backdrop-blur-md font-mono text-xs text-[#1B1522]"
    >
      <span className="text-[11px] font-semibold text-[#8E8294] tracking-wider uppercase">
        Slide {String(currentSlide + 1).padStart(2, "0")} / 05
      </span>
      <div className="flex items-center gap-1 ml-1 border-l border-[#8E8294]/20 pl-2">
        <button
          type="button"
          onClick={() => goToSlide(currentSlide - 1)}
          disabled={currentSlide === 0}
          aria-label="Previous slide"
          className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-[#FFE6D2] hover:text-[#FF6B2B] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit transition-colors"
        >
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 10l4-4 4 4" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => goToSlide(currentSlide + 1)}
          disabled={currentSlide === SLIDE_IDS.length - 1}
          aria-label="Next slide"
          className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-[#FFE6D2] hover:text-[#FF6B2B] disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit transition-colors"
        >
          <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>
      </div>
    </nav>
  );
}

export default SlideController;
