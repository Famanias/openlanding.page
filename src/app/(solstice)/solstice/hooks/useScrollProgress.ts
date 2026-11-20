'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { clamp } from '../utils/sceneLayout';

/**
 * Tracks normalized scroll progress (0..1) from page scrolling with smooth GSAP interpolation,
 * while seamlessly yielding to manual control panel overrides when engaged.
 */
export function useScrollProgress(
  manualOverride: boolean,
  manualValue: number,
  onProgressChange: (progress: number) => void
) {
  const onProgressRef = useRef(onProgressChange);
  const proxyRef = useRef({ value: manualValue });

  useEffect(() => {
    onProgressRef.current = onProgressChange;
  }, [onProgressChange]);

  useEffect(() => {
    const proxy = proxyRef.current;
    const quickProgress = gsap.quickTo(proxy, 'value', {
      duration: 0.45,
      ease: 'power2.out',
      onUpdate: () => {
        onProgressRef.current(clamp(proxy.value, 0, 1));
      },
    });

    if (manualOverride) {
      quickProgress(clamp(manualValue, 0, 1));
      return;
    }

    const computePageScroll = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const ratio = clamp(window.scrollY / maxScroll, 0, 1);
      quickProgress(ratio);
    };

    computePageScroll();
    window.addEventListener('scroll', computePageScroll, { passive: true });
    window.addEventListener('resize', computePageScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', computePageScroll);
      window.removeEventListener('resize', computePageScroll);
      gsap.killTweensOf(proxy);
    };
  }, [manualOverride, manualValue]);

  return proxyRef;
}
