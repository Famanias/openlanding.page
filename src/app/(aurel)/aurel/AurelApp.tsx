'use client';

import React, { useState } from 'react';
import { MotionProvider } from './components/MotionProvider';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CollectionIntroduction } from './components/CollectionIntroduction';
import { AnatomySection } from './components/AnatomySection';
import { GallerySection } from './components/GallerySection';
import { AtelierSection } from './components/AtelierSection';
import { ManifestoSection } from './components/ManifestoSection';
import { PrivateViewing } from './components/PrivateViewing';
import { Footer } from './components/Footer';

export default function AurelApp() {
  const [isPrivateViewingOpen, setIsPrivateViewingOpen] = useState(false);

  const handleBackToTop = () => {
    setIsPrivateViewingOpen(false);
    const topEl = document.getElementById('top');
    if (topEl) {
      topEl.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <MotionProvider>
      <div className="min-h-screen bg-[#0A0B0D] text-[#F0ECE5] flex flex-col selection:bg-[#9DB8C9]/25 selection:text-[#F0ECE5]">
        <Header onOpenPrivateViewing={() => setIsPrivateViewingOpen(true)} />

        <main className="flex-1">
          <Hero />
          <CollectionIntroduction />
          <AnatomySection />
          <GallerySection />
          <AtelierSection />
          <ManifestoSection />
          <PrivateViewing
            isModalOpen={isPrivateViewingOpen}
            onOpenModal={() => setIsPrivateViewingOpen(true)}
            onCloseModal={() => setIsPrivateViewingOpen(false)}
          />
        </main>

        <Footer onBackToTop={handleBackToTop} />
      </div>
    </MotionProvider>
  );
}
