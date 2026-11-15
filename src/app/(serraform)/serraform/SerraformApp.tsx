'use client';

import { useRef } from 'react';
import { FoldProvider } from './fold/FoldProvider';
import { PleatCurtain } from './motion/PleatCurtain';
import { usePageMotion } from './motion/usePageMotion';
import { BriefSection } from './sections/BriefSection';
import { Construction } from './sections/Construction';
import { FoldingExperience } from './sections/FoldingExperience';
import { Footer } from './sections/Footer';
import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { PleatTicker } from './sections/PleatTicker';
import { Questions } from './sections/Questions';

export default function SerraformApp() {
  const rootRef = useRef<HTMLDivElement>(null);
  usePageMotion(rootRef);

  return (
    <FoldProvider>
      <div ref={rootRef}>
        <PleatCurtain />

        <a href="#main-content" className="srf-skip-link">
          Skip to content
        </a>

        <Header />

        <main id="main-content">
          <Hero />
          <PleatTicker />
          <FoldingExperience />
          <Construction />
          <Questions />
          <BriefSection />
        </main>

        <Footer />
      </div>
    </FoldProvider>
  );
}
