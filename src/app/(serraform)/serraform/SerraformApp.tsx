'use client';

import { useEffect, useState } from 'react';
import { FoldProvider } from './fold/FoldProvider';
import { BriefSection } from './sections/BriefSection';
import { Construction } from './sections/Construction';
import { FoldingExperience } from './sections/FoldingExperience';
import { Footer } from './sections/Footer';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Questions } from './sections/Questions';
import { RoomStudies } from './sections/RoomStudies';

export default function SerraformApp() {
  const [revealReady, setRevealReady] = useState(false);

  useEffect(() => {
    if (
      typeof IntersectionObserver !== 'undefined' &&
      !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      setRevealReady(true);
    }
  }, []);

  return (
    <FoldProvider>
      <div className={revealReady ? 'srf-reveal-ready' : undefined}>
        <a href="#main-content" className="srf-skip-link">
          Skip to content
        </a>

        <Header />

        <main id="main-content">
          <Hero />
          <FoldingExperience />
          <RoomStudies />
          <Construction />
          <Questions />
          <BriefSection />
        </main>

        <Footer />
      </div>
    </FoldProvider>
  );
}
