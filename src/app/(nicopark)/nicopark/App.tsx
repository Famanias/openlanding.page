"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SelectedWorkSection } from './components/SelectedWorkSection';
import { LoopAnatomySection } from './components/LoopAnatomySection';
import { LoopAppSection } from './components/LoopAppSection';
import { ProcessSection } from './components/ProcessSection';
import { PlaygroundSection } from './components/PlaygroundSection';
import { AboutNotesSection } from './components/AboutNotesSection';
import { ContactFooterSection } from './components/ContactFooterSection';
import { AnatomyPart, CaseStudy } from './data/portfolioData';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('work');
  const [activeProjectId, setActiveProjectId] = useState<CaseStudy['id']>('loop');
  const [isCaseStudyModalOpen, setIsCaseStudyModalOpen] = useState<boolean>(false);

  // LOOP Anatomy State
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [explodeFactor, setExplodeFactor] = useState<number>(1);
  const [selectedPartId, setSelectedPartId] = useState<AnatomyPart['id']>('cover');

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (['work', 'playground', 'about', 'notes'].includes(sectionId)) {
      setActiveSection(sectionId);
    }
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const trackedIds = ['work', 'playground', 'about', 'notes'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 240;
      for (let i = trackedIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(trackedIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(trackedIds[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectProject = useCallback(
    (projectId: CaseStudy['id'], openModal = false) => {
      setActiveProjectId(projectId);
      setIsCaseStudyModalOpen(openModal);
    },
    []
  );

  const handleInspectAnatomyPart = useCallback(
    (partId: AnatomyPart['id'], explode = true) => {
      setSelectedPartId(partId);
      if (explode) {
        setIsExploded(true);
        setExplodeFactor(1);
      }
      scrollToSection('anatomy');
    },
    [scrollToSection]
  );

  const handleActivateAppDemo = useCallback(() => {
    scrollToSection('loop-app');
  }, [scrollToSection]);

  const handleOpenAsteriskLab = useCallback(() => {
    scrollToSection('playground');
  }, [scrollToSection]);

  return (
    <div className="min-h-screen bg-[#F8F7F2] text-[#191919]">
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      <main>
        {/* 01 — Hero / Design Should Feel Good */}
        <HeroSection
          onNavigate={scrollToSection}
          onSelectProject={handleSelectProject}
          onInspectAnatomyPart={handleInspectAnatomyPart}
          onActivateAppDemo={handleActivateAppDemo}
          onOpenAsteriskLab={handleOpenAsteriskLab}
        />

        {/* 02 — Selected Work / 01–03 */}
        <SelectedWorkSection
          activeProjectId={activeProjectId}
          isCaseStudyModalOpen={isCaseStudyModalOpen}
          onSelectProject={handleSelectProject}
          onCloseModal={() => setIsCaseStudyModalOpen(false)}
          onJumpToSection={scrollToSection}
        />

        {/* 03 — LOOP / Inside the Object */}
        <LoopAnatomySection
          isExploded={isExploded}
          explodeFactor={explodeFactor}
          selectedPartId={selectedPartId}
          onToggleExplode={() => {
            setIsExploded((prev) => {
              const next = !prev;
              if (next && explodeFactor === 0) setExplodeFactor(1);
              return next;
            });
          }}
          onChangeExplodeFactor={(val) => {
            setExplodeFactor(val);
            setIsExploded(val > 0.02);
          }}
          onSelectPart={(id) => setSelectedPartId(id)}
        />

        {/* 04 — LOOP App / Interactive Product Preview */}
        <LoopAppSection />

        {/* 05 — Process / From Weird Idea to Useful Thing */}
        <ProcessSection />

        {/* 06 — Playground / Interactive Experiments */}
        <PlaygroundSection />

        {/* 07 — About + Notes */}
        <AboutNotesSection />
      </main>

      {/* 08 — Contact / Big Close + Footer */}
      <ContactFooterSection onNavigate={scrollToSection} />
    </div>
  );
}
