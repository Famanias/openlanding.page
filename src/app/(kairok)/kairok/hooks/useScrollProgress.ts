import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { clamp01 } from '../lib/motion';

export interface ScrollProgressResult {
  progress: number;
  rawProgress: number;
  isPinned: boolean;
  scrollToProgress: (targetProgress: number, behavior?: ScrollBehavior) => void;
}

export function useScrollProgress(
  containerRef: RefObject<HTMLElement | null>,
  disabled = false
): ScrollProgressResult {
  const [progress, setProgress] = useState(0);
  const [rawProgress, setRawProgress] = useState(0);
  const [isPinned, setIsPinned] = useState(false);

  const targetRef = useRef(0);
  const smoothedRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const measureScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el || typeof window === 'undefined') return 0;
    const rect = el.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 900;
    const scrollableDistance = Math.max(1, el.offsetHeight - viewportHeight);
    const nextRaw = clamp01(-rect.top / scrollableDistance);
    const pinnedNow = rect.top <= 4 && rect.bottom >= viewportHeight - 4;
    setIsPinned(pinnedNow);
    return nextRaw;
  }, [containerRef]);

  useEffect(() => {
    if (disabled || typeof window === 'undefined') {
      setProgress(0);
      setRawProgress(0);
      setIsPinned(false);
      return;
    }

    let active = true;

    const tick = (now: number) => {
      if (!active) return;
      const dt = lastTimeRef.current ? Math.min(64, now - lastTimeRef.current) : 16.67;
      lastTimeRef.current = now;

      const measured = measureScroll();
      targetRef.current = measured;

      const current = smoothedRef.current;
      const diff = targetRef.current - current;

      // Time-corrected exponential damping (~140ms response)
      const alpha = 1 - Math.exp(-dt / 42);
      const next = Math.abs(diff) < 0.0004 ? targetRef.current : current + diff * alpha;

      if (Math.abs(next - smoothedRef.current) > 0.0002 || Math.abs(measured - rawProgress) > 0.001) {
        smoothedRef.current = next;
        setProgress(next);
        setRawProgress(measured);
      }

      rafIdRef.current = window.requestAnimationFrame(tick);
    };

    const initial = measureScroll();
    targetRef.current = initial;
    smoothedRef.current = initial;
    setProgress(initial);
    setRawProgress(initial);

    const handleScrollOrResize = () => {
      const m = measureScroll();
      targetRef.current = m;
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });
    rafIdRef.current = window.requestAnimationFrame(tick);

    return () => {
      active = false;
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [disabled, measureScroll, rawProgress]);

  const scrollToProgress = useCallback(
    (targetProgress: number, behavior: ScrollBehavior = 'smooth') => {
      const el = containerRef.current;
      if (!el || typeof window === 'undefined') return;
      const rect = el.getBoundingClientRect();
      const containerTop = window.scrollY + rect.top;
      const viewportHeight = window.innerHeight || 900;
      const scrollableDistance = Math.max(1, el.offsetHeight - viewportHeight);
      const targetScrollY = containerTop + clamp01(targetProgress) * scrollableDistance;
      window.scrollTo({
        top: targetScrollY,
        behavior,
      });
    },
    [containerRef]
  );

  return {
    progress,
    rawProgress,
    isPinned,
    scrollToProgress,
  };
}
