'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { CameraFinishId } from './lib/assets';
import { useReducedMotion } from './hooks/useReducedMotion';
import { SiteHeader } from './components/SiteHeader';
import { CinematicStory } from './components/CinematicStory';
import { OpticalLab } from './components/OpticalLab';
import { SensorDetail } from './components/SensorDetail';
import { PhotoFieldNotes } from './components/PhotoFieldNotes';
import { CollectionExplorer } from './components/CollectionExplorer';
import { WaitlistDialog } from './components/WaitlistDialog';
import { SiteFooter } from './components/SiteFooter';

const SECTION_IDS = ['experience', 'optics', 'engineering', 'gallery', 'collection'];

export default function KairokApp() {
  const systemReducedMotion = useReducedMotion();
  const [manualReducedMotion, setManualReducedMotion] = useState<boolean | null>(null);
  const reducedMotion =
    manualReducedMotion !== null ? manualReducedMotion : systemReducedMotion;

  const [activeSection, setActiveSection] = useState<string>('experience');
  const [selectedFinish, setSelectedFinish] = useState<CameraFinishId>('carbon');
  const [waitlistOpen, setWaitlistOpen] = useState<boolean>(false);

  // Track active chapter in top navigation via IntersectionObserver
  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id);
          }
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: 0.01,
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [reducedMotion]);

  const handleNavigate = useCallback(
    (sectionId: string) => {
      const target = document.getElementById(sectionId);
      if (!target) return;
      target.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      setActiveSection(sectionId);
    },
    [reducedMotion]
  );

  const handleOpenWaitlistWithFinish = useCallback((finish?: CameraFinishId) => {
    if (finish) {
      setSelectedFinish(finish);
    }
    setWaitlistOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#121315] text-[#f2efe9] selection:bg-[#e68f63]/30 selection:text-[#f2efe9]">
      <SiteHeader
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenWaitlist={() => handleOpenWaitlistWithFinish()}
      />

      <main>
        {/* Section A: 6-Beat Continuous Pinned Film Sequence */}
        <CinematicStory
          reducedMotion={reducedMotion}
          onJumpToSection={handleNavigate}
        />

        {/* Section B: Light & Lens Interactive Optical Lab */}
        <OpticalLab />

        {/* Section C: Precision / Exploded Engineering Studio */}
        <SensorDetail />

        {/* Section D: Photographic Field Notes & Exposure Curtain */}
        <PhotoFieldNotes />

        {/* Section E: Product Collection / Three-Finish Exploration */}
        <CollectionExplorer
          selectedFinish={selectedFinish}
          onSelectFinish={setSelectedFinish}
          onOpenWaitlist={(finish) => handleOpenWaitlistWithFinish(finish)}
        />
      </main>

      {/* Section F: Closing Quiet Invitation & Minimal Footer */}
      <SiteFooter
        onNavigate={handleNavigate}
        onOpenWaitlist={() => handleOpenWaitlistWithFinish()}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() =>
          setManualReducedMotion((prev) =>
            prev === null ? !systemReducedMotion : !prev
          )
        }
      />

      {/* Accessible Demo Waitlist Dialog */}
      <WaitlistDialog
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        preferredFinish={selectedFinish}
        onChangePreferredFinish={setSelectedFinish}
      />
    </div>
  );
}
