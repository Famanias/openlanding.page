'use client';

import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { registerScrollDriver } from './scroll';
import 'lenis/dist/lenis.css';

export function SmoothScroll() {
  useEffect(() => {
    const query = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let disposed = false;
    let generation = 0;
    let cleanup: (() => void) | undefined;
    const setup = async () => {
      const current = ++generation;
      cleanup?.();
      cleanup = undefined;
      if (!query.matches) return;
      const { default: Lenis } = await import('lenis');
      if (disposed || current !== generation || !query.matches) return;
      const lenis = new Lenis({ lerp: 0.09, autoRaf: true, smoothWheel: true, syncTouch: false, anchors: false });
      const unregister = registerScrollDriver(lenis);
      lenis.on('scroll', ScrollTrigger.update);
      cleanup = () => { unregister(); lenis.off('scroll', ScrollTrigger.update); lenis.destroy(); };
    };
    void setup();
    query.addEventListener('change', setup);
    return () => { disposed = true; generation++; cleanup?.(); query.removeEventListener('change', setup); };
  }, []);
  return null;
}
