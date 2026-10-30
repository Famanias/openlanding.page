"use client";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HouseSection } from './components/HouseSection';
import { CollectionSection } from './components/CollectionSection';
import { CraftSection } from './components/CraftSection';
import { BespokeSection } from './components/BespokeSection';
import { Footer } from './components/Footer';

export default function App() {
  const [pageScrollProgress, setPageScrollProgress] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [selectedPieceReference, setSelectedPieceReference] =
    useState<string>('');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setPageScrollProgress(progress);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-mono focus:text-xs focus:uppercase"
      >
        Skip to main content
      </a>

      <Header scrollProgress={pageScrollProgress} />

      <main id="main-content">
        <HeroSection />
        <HouseSection
          scrollProgress={pageScrollProgress}
          reducedMotion={reducedMotion}
        />
        <CollectionSection
          onSelectForCommission={(pieceRef) =>
            setSelectedPieceReference(pieceRef)
          }
        />
        <CraftSection reducedMotion={reducedMotion} />
        <BespokeSection selectedPieceReference={selectedPieceReference} />
      </main>

      <Footer />
    </div>
  );
}
