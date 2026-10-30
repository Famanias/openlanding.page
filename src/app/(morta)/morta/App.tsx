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

function usePageScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const value = distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      setProgress(Math.round(value * 500) / 500);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
  return progress;
}

function ScrollHeader() {
  return <Header scrollProgress={usePageScrollProgress()} />;
}

function ScrollHouse({ reducedMotion }: { reducedMotion: boolean }) {
  return <HouseSection scrollProgress={usePageScrollProgress()} reducedMotion={reducedMotion} />;
}

export default function App() {
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


  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:font-mono focus:text-xs focus:uppercase"
      >
        Skip to main content
      </a>

      <ScrollHeader />

      <main id="main-content">
        <HeroSection />
        <ScrollHouse reducedMotion={reducedMotion} />
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
