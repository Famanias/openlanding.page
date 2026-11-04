'use client';

import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { MobileNav } from './components/MobileNav';
import { Hero } from './components/Hero';
import { SelectedProjects } from './components/SelectedProjects';
import { Practice } from './components/Practice';
import { LightLab } from './components/LightLab';
import { Process } from './components/Process';
import { ContactFooter } from './components/ContactFooter';
import { useReducedMotion } from './hooks/useReducedMotion';
import {
  SpotlightMode,
  LightLabState,
  DEFAULT_LIGHT_LAB_STATE,
} from './lib/motion';
import { ConceptProject } from './lib/projectData';

export default function PenumbraApp() {
  const reducedMotion = useReducedMotion();

  const [spotlightMode, setSpotlightMode] = useState<SpotlightMode>('intro');
  const [illuminationVisible, setIlluminationVisible] = useState<boolean>(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [activeProject, setActiveProject] = useState<ConceptProject | null>(null);
  const [lightLab, setLightLab] = useState<LightLabState>(DEFAULT_LIGHT_LAB_STATE);
  const [contactTopic, setContactTopic] = useState<string | undefined>(undefined);

  const handleToggleIllumination = useCallback(() => {
    setIlluminationVisible((prev) => {
      const next = !prev;
      setSpotlightMode(next ? 'toggle' : 'pointer');
      return next;
    });
  }, []);

  const handleNavigate = useCallback((targetId: string) => {
    setIsMobileNavOpen(false);
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 76;
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      window.scrollTo({
        top: Math.max(0, rect.top + scrollTop - headerOffset),
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    }
  }, [reducedMotion]);

  const handleNavigateToContact = useCallback(
    (projectTitle?: string) => {
      if (projectTitle) {
        setContactTopic(projectTitle);
      }
      handleNavigate('contact');
    },
    [handleNavigate]
  );

  return (
    <div className="min-h-screen bg-[#111318] text-[#F2EBE2] selection:bg-[#D7A779]/30 selection:text-[#F2EBE2]">
      <Header
        isMobileNavOpen={isMobileNavOpen}
        onToggleMobileNav={() => setIsMobileNavOpen((prev) => !prev)}
        onNavigate={handleNavigate}
      />

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        onNavigate={handleNavigate}
      />

      <main>
        <Hero
          reducedMotion={reducedMotion}
          illuminationVisible={illuminationVisible}
          onToggleIllumination={handleToggleIllumination}
          spotlightMode={spotlightMode}
          onSpotlightModeChange={setSpotlightMode}
          onNavigate={handleNavigate}
        />

        <SelectedProjects
          activeProject={activeProject}
          onSelectProject={setActiveProject}
          onNavigateToContact={handleNavigateToContact}
        />

        <Practice />

        <LightLab
          state={lightLab}
          onChange={setLightLab}
          onReset={() => setLightLab(DEFAULT_LIGHT_LAB_STATE)}
        />

        <Process reducedMotion={reducedMotion} />
      </main>

      <ContactFooter
        initialProjectTopic={contactTopic}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
