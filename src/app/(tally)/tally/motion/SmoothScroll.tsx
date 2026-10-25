"use client";

import React, { useEffect, useState } from "react";
import { clamp } from "./math";
import { isMotionLive } from "./mode";

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const progressEl = document.querySelector<HTMLElement>("[data-tl-progress]");
    const headerEl = document.querySelector<HTMLElement>("[data-tl-header]");
    const heroMatEl = document.querySelector<HTMLElement>("[data-tl-hero-mat]");

    let lastScrollY = window.scrollY;
    let maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    let scrollRaf = 0;

    const refreshMaxScroll = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };

    const updateScrollUi = () => {
      scrollRaf = 0;
      const y = window.scrollY;
      const p = clamp(y / maxScroll, 0, 1);

      if (progressEl) {
        progressEl.style.transform = `scaleX(${p.toFixed(4)})`;
      }

      if (headerEl) {
        headerEl.dataset.scrolled = y > 56 ? "true" : "false";
        const delta = y - lastScrollY;
        if (y > 320 && delta > 8) {
          headerEl.dataset.compact = "true";
        } else if (delta < -6 || y <= 140) {
          headerEl.dataset.compact = "false";
        }
      }

      if (heroMatEl && isMotionLive() && y < 900) {
        const shift = clamp(y * 0.025, 0, 18);
        heroMatEl.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
      }

      lastScrollY = y;
    };

    const onScroll = () => {
      if (!scrollRaf) {
        scrollRaf = requestAnimationFrame(updateScrollUi);
      }
    };

    refreshMaxScroll();
    updateScrollUi();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", refreshMaxScroll, { passive: true });

    // Dynamically mount Lenis only on desktop fine pointers with live motion
    let lenisCleanup: (() => void) | undefined;
    const fineDesktop = window.matchMedia(
      "(min-width: 960px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    ).matches;

    if (fineDesktop && isMotionLive()) {
      let cancelled = false;
      import("lenis")
        .then(({ default: Lenis }) => {
          if (cancelled || !isMotionLive()) return;
          const lenis = new Lenis({
            lerp: 0.11,
            smoothWheel: true,
          });
          let lenisRaf = 0;
          const frame = (time: number) => {
            if (isMotionLive()) {
              lenis.raf(time);
            }
            lenisRaf = requestAnimationFrame(frame);
          };
          lenisRaf = requestAnimationFrame(frame);
          lenisCleanup = () => {
            cancelAnimationFrame(lenisRaf);
            lenis.destroy();
          };
        })
        .catch(() => {});

      return () => {
        cancelled = true;
        lenisCleanup?.();
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", refreshMaxScroll);
        if (scrollRaf) cancelAnimationFrame(scrollRaf);
      };
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", refreshMaxScroll);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
    };
  }, []);

  return null;
}

export function MotionPauseButton({ className = "" }: { className?: string }) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const sync = () => {
      setPaused(document.documentElement.dataset.tlPaused === "true");
    };
    sync();
    window.addEventListener("tally:motion-toggle", sync);
    return () => window.removeEventListener("tally:motion-toggle", sync);
  }, []);

  const toggle = () => {
    const next = !paused;
    document.documentElement.dataset.tlPaused = next ? "true" : "false";
    setPaused(next);
    window.dispatchEvent(new CustomEvent("tally:motion-toggle"));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`tl-pause-btn ${className}`}
      aria-pressed={paused}
      aria-label={paused ? "Resume counter motion" : "Pause counter motion"}
    >
      <span className="tl-pause-dot" data-paused={paused ? "true" : "false"} aria-hidden="true" />
      <span>{paused ? "Resume motion" : "Pause motion"}</span>
    </button>
  );
}
