'use client';

import React, { useEffect, useRef } from 'react';

interface LumenMotionProps {
  rootRef: React.RefObject<HTMLDivElement | null>;
  onHeroActivityChange?: (active: boolean) => void;
}

/**
 * Scoped route controller for progressive enhancement and DOM updates.
 * Runs at most one pending rAF frame per scroll/resize event without perpetual idle loops
 * and without triggering React component re-renders.
 */
export const LumenMotion: React.FC<LumenMotionProps> = ({
  rootRef,
  onHeroActivityChange,
}) => {
  const onHeroChangeRef = useRef(onHeroActivityChange);
  onHeroChangeRef.current = onHeroActivityChange;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let isReduced = reducedQuery.matches;

    // 1. Observe Hero visibility to gate the heavy WebGL background renderer
    let heroObserver: IntersectionObserver | null = null;
    const heroEl = root.querySelector('#workspace-hero');

    if (heroEl && typeof IntersectionObserver !== 'undefined') {
      heroObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry) {
            onHeroChangeRef.current?.(entry.isIntersecting);
          }
        },
        { rootMargin: '200px 0px 200px 0px', threshold: 0 }
      );
      heroObserver.observe(heroEl);
    }

    // 2. Supporting one-time reveals for [data-lm-reveal] targets
    const revealEls = root.querySelectorAll<HTMLElement>('[data-lm-reveal]');
    let revealObserver: IntersectionObserver | null = null;

    const setupReveals = () => {
      if (!isReduced && typeof IntersectionObserver !== 'undefined' && revealEls.length > 0) {
        revealObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const target = entry.target as HTMLElement;
                target.dataset.lmIn = 'true';
                target.removeAttribute('data-lm-armed');
                revealObserver?.unobserve(target);
              }
            });
          },
          { rootMargin: '0px 0px -8% 0px', threshold: 0.05 }
        );

        revealEls.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight) {
            el.dataset.lmIn = 'true';
          } else {
            el.dataset.lmArmed = 'true';
            revealObserver?.observe(el);
          }
        });
      } else {
        revealEls.forEach((el) => {
          el.dataset.lmIn = 'true';
          el.removeAttribute('data-lm-armed');
        });
      }
    };

    setupReveals();

    // 3. Event-driven DOM updates
    let rafId = 0;
    let scheduled = false;
    let cachedMaxScroll = 1;
    let cachedLastScrollProgress = -1;
    let cachedCompactState = false;

    const atmosphereEl = root.querySelector<HTMLElement>('[data-testid="page-atmosphere"]');
    const headerEl = root.querySelector<HTMLElement>('.lumen-header');

    const updateMeasurements = () => {
      const doc = document.documentElement;
      cachedMaxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
    };

    updateMeasurements();

    const renderFrame = () => {
      scheduled = false;
      const y = window.scrollY || window.pageYOffset || 0;
      const progress = Math.min(1, Math.max(0, y / cachedMaxScroll));

      // Update rounded scroll progress string only when value changes
      const roundedProgress = Math.round(progress * 100);
      if (roundedProgress !== cachedLastScrollProgress) {
        cachedLastScrollProgress = roundedProgress;
        const progressStr = progress.toFixed(2);
        if (atmosphereEl && atmosphereEl.dataset.scrollProgress !== progressStr) {
          atmosphereEl.dataset.scrollProgress = progressStr;
        }
      }

      // Update header compact state
      const shouldCompact = y > 50;
      if (shouldCompact !== cachedCompactState) {
        cachedCompactState = shouldCompact;
        if (headerEl) {
          headerEl.setAttribute('data-compact', String(shouldCompact));
        }
      }

      // Publish scoped CSS variables on the landing root
      root.style.setProperty('--lm-scroll', progress.toFixed(4));

      // Bounded subtle parallax displacement (max ±24px) for isolated SVG artwork
      if (!isReduced) {
        const ribbonAY = Math.max(-24, Math.min(24, -progress * 22));
        const sheetBY = Math.max(-24, Math.min(24, -progress * 18));
        root.style.setProperty('--lm-ribbon-a-y', `${ribbonAY.toFixed(1)}px`);
        root.style.setProperty('--lm-sheet-b-y', `${sheetBY.toFixed(1)}px`);
      } else {
        root.style.setProperty('--lm-ribbon-a-y', '0px');
        root.style.setProperty('--lm-sheet-b-y', '0px');
      }
    };

    const scheduleFrame = () => {
      if (!scheduled) {
        scheduled = true;
        rafId = window.requestAnimationFrame(renderFrame);
      }
    };

    const onScrollOrResize = () => {
      scheduleFrame();
    };

    const onResize = () => {
      updateMeasurements();
      scheduleFrame();
    };

    const onReducedMotionChange = (e: MediaQueryListEvent) => {
      isReduced = e.matches;
      if (isReduced) {
        revealEls.forEach((el) => {
          el.dataset.lmIn = 'true';
          el.removeAttribute('data-lm-armed');
        });
        revealObserver?.disconnect();
      }
      scheduleFrame();
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    reducedQuery.addEventListener('change', onReducedMotionChange);

    renderFrame();

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onResize);
      reducedQuery.removeEventListener('change', onReducedMotionChange);
      if (heroObserver) {
        heroObserver.disconnect();
      }
      if (revealObserver) {
        revealObserver.disconnect();
      }
      revealEls.forEach((el) => {
        el.dataset.lmIn = 'true';
        el.removeAttribute('data-lm-armed');
      });
    };
  }, [rootRef]);

  return null;
};
