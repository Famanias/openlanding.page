'use client';

import React, { useCallback, useState } from 'react';
import HollowayHero from './HollowayHero';
import CollectionOverview from './CollectionOverview';
import RoomStudio from './RoomStudio';
import FeaturedObjects from './FeaturedObjects';
import DesignPhilosophy from './DesignPhilosophy';
import FinalTransition from './FinalTransition';
import HollowayFooter from './HollowayFooter';
import { useRoomStudio } from '../../lib/holloway/useRoomStudio';

export default function HollowayPage() {
  const studio = useRoomStudio();
  const [inquiryOpen, setInquiryOpen] = useState(false);

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSelectAndScrollToStudio = useCallback(
    (moduleId: string) => {
      studio.selectModule(moduleId);
      const studioSection = document.getElementById('room-studio');
      studioSection?.scrollIntoView({ behavior: 'smooth' });
    },
    [studio]
  );

  const handleOpenInquiry = useCallback(() => {
    setInquiryOpen(true);
    setTimeout(() => {
      const el = document.getElementById('studio-inquiries') ?? document.getElementById('transition');
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#F5F2EA] text-[#262824]">
      <main>
        {/* SECTION 1 — HERO */}
        <HollowayHero
          selectedModuleId={studio.selectedId}
          onSelectInstrumentModule={handleSelectAndScrollToStudio}
          onExploreRoom={() => scrollToSection('room-studio')}
          onViewCollection={() => scrollToSection('collection')}
          onResetRoom={() => {
            studio.resetArrangement();
            scrollToSection('room-studio');
          }}
        />

        {/* SECTION 2 — COLLECTION OVERVIEW */}
        <CollectionOverview onInspectInStudio={handleSelectAndScrollToStudio} />

        {/* SECTION 3 — ROOM STUDIO */}
        <RoomStudio
          plan={studio.plan}
          modules={studio.modules}
          selectedId={studio.selectedId}
          selectedPiece={studio.selectedPiece}
          selectedCatalog={studio.selectedCatalog}
          activePresetId={studio.activePresetId}
          metrics={studio.metrics}
          status={studio.status}
          copiedRecently={studio.copiedRecently}
          hoveredPreview={studio.hoveredPreview}
          onSelectModule={studio.selectModule}
          onMoveSelected={studio.moveSelected}
          onRotateSelected={studio.rotateSelected}
          onPlaceSelectedAt={studio.placeSelectedAt}
          onHoverCell={studio.setHoveredCell}
          onApplyPreset={studio.applyPreset}
          onResetArrangement={studio.resetArrangement}
          onCopyConfiguration={studio.copyConfiguration}
        />

        {/* SECTION 4 — FEATURED OBJECTS / MATERIALS */}
        <FeaturedObjects onSelectForStudio={handleSelectAndScrollToStudio} />

        {/* SECTION 5 — DESIGN PHILOSOPHY / CRAFT */}
        <DesignPhilosophy />

        {/* SECTION 6 — FINAL CTA / INFORMATION TRANSITION */}
        <FinalTransition
          onDesignSpace={() => scrollToSection('room-studio')}
          onExploreCollection={() => scrollToSection('collection')}
          inquiryOpen={inquiryOpen}
          onToggleInquiry={setInquiryOpen}
        />
      </main>

      {/* SECTION 7 — EDITORIAL FOOTER */}
      <HollowayFooter
        onNavigateSection={scrollToSection}
        onOpenInquiry={handleOpenInquiry}
      />
    </div>
  );
}
