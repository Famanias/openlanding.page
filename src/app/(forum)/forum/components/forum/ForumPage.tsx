'use client';
import React, { useMemo, useState } from 'react';
import { SignalFilterCategory } from '../../lib/forum/demoData';
import { useSectionSpy } from '../../hooks/useSectionSpy';
import { ForumHeader } from './ForumHeader';
import { ForumHero } from './ForumHero';
import { SignalManifesto } from './SignalManifesto';
import { FeatureGallery } from './FeatureGallery';
import { IntelligenceEngine } from './IntelligenceEngine';
import { SignalBoardDemo } from './SignalBoardDemo';
import { WideFieldInterlude } from './WideFieldInterlude';
import { ForumFinale } from './ForumFinale';
import { ForumFooter } from './ForumFooter';

export const ForumPage: React.FC = () => {
  const sectionIds = useMemo(
    () => ['top', 'about', 'platform', 'intelligence', 'demo', 'vision', 'final'],
    []
  );
  const activeSection = useSectionSpy(sectionIds, 'top');

  const [demoCategory, setDemoCategory] = useState<SignalFilterCategory>('ALL');
  const [resetTriggerCount, setResetTriggerCount] = useState<number>(0);

  const handleResetDemoFromFooter = () => {
    setResetTriggerCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen w-full bg-[#0E100C] text-[#F6F3EA] selection:bg-[#B9B28A] selection:text-[#0E100C]">
      <ForumHeader activeSection={activeSection} />

      <main id="main-content" className="relative w-full overflow-x-clip">
        {/* CHAPTER 01 — #top — THE SIGNAL / HERO */}
        <ForumHero />

        {/* CHAPTER 02 — #about — FROM NOISE TO SIGNAL / EDITORIAL MANIFESTO */}
        <SignalManifesto />

        {/* CHAPTER 03 — #platform — THE THREE SIGNAL FUNCTIONS / IMAGE GALLERY */}
        <FeatureGallery onSelectDemoCategory={setDemoCategory} />

        {/* CHAPTER 04 — #intelligence — THE INTELLIGENCE ENGINE / PINNED SYSTEM REVEAL */}
        <IntelligenceEngine />

        {/* CHAPTER 05 — #demo / #workflows — THE LIVE SIGNAL BOARD / WORKING LOCAL DEMO */}
        <SignalBoardDemo
          externalCategory={demoCategory}
          onExternalCategoryChange={setDemoCategory}
          resetTriggerCount={resetTriggerCount}
        />

        {/* CHAPTER 06 — #vision — THE WIDE FIELD / CINEMATIC INTERLUDE */}
        <WideFieldInterlude />

        {/* CHAPTER 07 — #final — THE FINAL ORBIT / CTA */}
        <ForumFinale />
      </main>

      {/* CHAPTER 07 FOOTER — RULED NAVIGATION GRID */}
      <ForumFooter onResetDemo={handleResetDemoFromFooter} />
    </div>
  );
};
