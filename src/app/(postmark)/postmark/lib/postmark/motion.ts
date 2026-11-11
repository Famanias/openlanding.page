import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let isGsapRegistered = false;

export function ensureGsapRegistered(): void {
  if (!isGsapRegistered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({
      ignoreMobileResize: true,
    });
    isGsapRegistered = true;
  }
}

export function prefersReducedMotionNow(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function shouldSkipEntryIntro(): boolean {
  if (typeof window === 'undefined') return false;
  if (prefersReducedMotionNow()) return true;
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get('autostart') === '1' || params.get('skipIntro') === '1';
  } catch {
    return false;
  }
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReduced(mq.matches);
    handleChange();
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  return reduced;
}

export function scrollToSectionById(sectionId: string, focusSelector?: string): void {
  if (typeof document === 'undefined') return;
  const el = document.getElementById(sectionId);
  if (!el) return;
  const reduced = prefersReducedMotionNow();
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  if (focusSelector) {
    window.setTimeout(
      () => {
        const focusEl = el.querySelector<HTMLElement>(focusSelector);
        focusEl?.focus({ preventScroll: true });
      },
      reduced ? 30 : 520
    );
  }
}
