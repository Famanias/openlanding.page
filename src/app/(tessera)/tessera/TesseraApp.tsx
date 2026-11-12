'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrangementPatternId,
  ConfiguratorState,
  DEFAULT_CONFIGURATOR_STATE,
  MaterialFinishId,
  TileShapeId,
  calculateAcousticMetrics,
  formatSpecificationSummary,
} from './domain/tesseraSystem';
import { CustomReticleCursor, usePrefersReducedMotion } from './components/InteractivePrimitives';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ManifestoSection } from './components/ManifestoSection';
import { PinnedChaptersSection } from './components/PinnedChaptersSection';
import { MaterialsSection } from './components/MaterialsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProductConfigurator } from './components/ProductConfigurator';
import { CommissionFooterSection } from './components/CommissionFooterSection';

gsap.registerPlugin(ScrollTrigger);

export default function TesseraApp() {
  const reducedMotion = usePrefersReducedMotion();
  const heroScrollProgressRef = useRef<number>(0);
  const [config, setConfig] = useState<ConfiguratorState>(DEFAULT_CONFIGURATOR_STATE);

  const metrics = useMemo(() => calculateAcousticMetrics(config), [config]);
  const liveSpecSummary = useMemo(
    () => formatSpecificationSummary(config, metrics),
    [config, metrics],
  );
  const [attachedSummary, setAttachedSummary] = useState<string>('');
  const [suggestedArea, setSuggestedArea] = useState<number>(metrics.wallAreaSqM);

  useEffect(() => {
    setSuggestedArea(metrics.wallAreaSqM);
  }, [metrics.wallAreaSqM]);

  // Choreograph Hero reversible scroll-linked 3D progress
  useEffect(() => {
    if (reducedMotion) {
      heroScrollProgressRef.current = 0;
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          heroScrollProgressRef.current = self.progress;
        },
      });
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleSelectMaterial = (materialId: MaterialFinishId) => {
    setConfig((prev) => ({
      ...prev,
      material: materialId,
    }));
  };

  const handleLoadProjectPreset = (preset: {
    shape: TileShapeId;
    material: MaterialFinishId;
    pattern: ArrangementPatternId;
  }) => {
    setConfig((prev) => ({
      ...prev,
      shape: preset.shape,
      material: preset.material,
      pattern: preset.pattern,
      customRotations: {},
    }));
  };

  const handleResetConfigurator = () => {
    setConfig({
      ...DEFAULT_CONFIGURATOR_STATE,
      customRotations: {},
    });
  };

  const handleTransferToInquiry = (summaryText: string, areaSqM: number) => {
    setAttachedSummary(summaryText);
    setSuggestedArea(areaSqM);
  };

  return (
    <div className="min-h-screen bg-[#121311] text-[#F1F5F9] overflow-x-clip">
      <CustomReticleCursor />
      <Navbar />
      <main id="main-content">
        <HeroSection
          scrollProgressRef={heroScrollProgressRef}
          onSyncMaterial={handleSelectMaterial}
        />
        <ManifestoSection />
        <PinnedChaptersSection />
        <MaterialsSection onSelectMaterialForConfigurator={handleSelectMaterial} />
        <ProjectsSection onLoadProjectPreset={handleLoadProjectPreset} />
        <ProductConfigurator
          config={config}
          onChangeConfig={setConfig}
          onResetConfig={handleResetConfigurator}
          onTransferToInquiry={handleTransferToInquiry}
        />
        <CommissionFooterSection
          attachedSpecSummary={attachedSummary || liveSpecSummary}
          suggestedAreaSqM={suggestedArea}
        />
      </main>
    </div>
  );
}
