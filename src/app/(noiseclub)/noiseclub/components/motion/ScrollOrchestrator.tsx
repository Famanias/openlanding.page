"use client";

import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

interface ScrollOrchestratorProps {
  children: React.ReactNode;
}

export const ScrollOrchestrator: React.FC<ScrollOrchestratorProps> = ({ children }) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let lenis: Lenis | null = null;
    let rafId: number | null = null;

    if (hasFinePointer) {
      lenis = new Lenis({
        lerp: 0.09,
        smoothWheel: true,
      });

      lenis.on('scroll', ScrollTrigger.update);

      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = window.requestAnimationFrame(raf);
      };
      rafId = window.requestAnimationFrame(raf);
    }

    const ctx = gsap.context(() => {
      // Scene 00A — Automatic Intro (~1.8s, non-blocking, compositor transforms only)
      const introTl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      });

      introTl
        .fromTo(
          '[data-anim="hero-meta"]',
          { x: -16, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.45 },
          0.12
        )
        .fromTo(
          '[data-anim="hero-kicker"]',
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          0.2
        )
        .fromTo(
          '[data-anim="hero-word"]',
          { yPercent: 105 },
          { yPercent: 0, duration: 0.65, stagger: 0.055 },
          0.25
        )
        .fromTo(
          '[data-anim="hero-fingerprint"]',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          0.62
        )
        .fromTo(
          '[data-anim="hero-product"]',
          { y: 24, scale: 0.97, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: 0.75 },
          0.78
        )
        .fromTo(
          '[data-anim="hero-copy"]',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          1.05
        );

      // Scene 01 — Specimen plates staggered entrance
      const specimenPlates = gsap.utils.toArray<HTMLElement>('[data-anim="specimen-plate"]');
      if (specimenPlates.length > 0) {
        gsap.fromTo(
          specimenPlates,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#hear-everything',
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Subtle chapter section reveals for Chapters 02–06
      ['#capture-it', '#chop-it-up', '#build-a-beat', '#break-the-rules', '#take-the-noise'].forEach(
        (selector) => {
          const el = document.querySelector(selector);
          if (!el) return;
          gsap.fromTo(
            el,
            { y: 24, opacity: 0.92 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: el,
                start: 'top 86%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      );
    });

    return () => {
      ctx.revert();
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
};
