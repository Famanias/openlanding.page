/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";
import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Sliders } from 'lucide-react';
import { SmoothScroll } from './motion/SmoothScroll';
import { SplitText } from './motion/SplitText';
import { WorkflowRibbon } from './components/WorkflowRibbon';
import { WorkflowStatement } from './components/WorkflowStatement';
import { scrollToLumen } from './motion/scroll';
import { MinimalHeader } from './components/MinimalHeader';
import { DownloadForm } from './components/DownloadForm';
import { GlassWorkspace } from './components/GlassWorkspace';
import { TrustedBySection } from './components/TrustedBySection';
import { ProblemSection } from './components/ProblemSection';
import { BenefitsSection } from './components/BenefitsSection';
import { PlaybookPreviewSection } from './components/PlaybookPreviewSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { CredibilitySection } from './components/CredibilitySection';
import { FaqSection } from './components/FaqSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { Footer } from './components/Footer';
import { PageAtmosphere } from './components/background/PageAtmosphere';
import { GlassStudio } from './components/GlassStudio';
import { LumenMotion } from './motion/LumenMotion';
import {
  GlassPresetId,
  GlassPresetConfig,
  GLASS_PRESET_LIST,
} from './glass/glassTypes';

function checkIsStudioRoute(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.location.pathname.includes('_glass-studio') ||
    window.location.search.includes('studio=1') ||
    window.location.hash.includes('_glass-studio')
  );
}

export default function App() {
  const landingRootRef = useRef<HTMLDivElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);

  const introConsumedRef = useRef<boolean>(false);

  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [lastSubmitTimestamp, setLastSubmitTimestamp] = useState<number | null>(null);

  const [isStudioOpen, setIsStudioOpen] = useState<boolean>(checkIsStudioRoute);
  const [activeHeroPreset, setActiveHeroPreset] = useState<GlassPresetId>('opal-ribbon');
  const [customHeroConfig, setCustomHeroConfig] = useState<GlassPresetConfig | null>(null);

  // Sync browser popstate for /_glass-studio route
  useEffect(() => {
    const handlePopState = () => {
      setIsStudioOpen(checkIsStudioRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openGlassStudio = () => {
    introConsumedRef.current = true;
    try {
      window.history.pushState({}, '', '/lumen?studio=1');
    } catch {
      // Fallback if history pushState is restricted in iframe
    }
    setIsStudioOpen(true);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const closeGlassStudio = () => {
    try {
      window.history.pushState({}, '', '/lumen');
    } catch {
      // Fallback
    }
    setIsStudioOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleFocusHeroForm = () => {
    const formEl = document.getElementById('hero-download-form');
    if (formEl) {
      scrollToLumen(formEl);
    }
    heroInputRef.current?.focus({ preventScroll: true });
  };

  const handleScrollToPreview = () => {
    const previewEl = document.getElementById('inside-playbook');
    if (previewEl) {
      scrollToLumen(previewEl);
    }
  };

  const handleSuccessSubmit = (email: string, timestamp: number) => {
    setSubmittedEmail(email);
    setLastSubmitTimestamp(timestamp);
  };

  const handleResetSubmit = () => {
    setSubmittedEmail(null);
    setLastSubmitTimestamp(null);
  };

  if (isStudioOpen) {
    return (
      <GlassStudio
        activeHeroPreset={activeHeroPreset}
        onApplyPresetToHero={(presetId, cfg) => {
          setActiveHeroPreset(presetId);
          setCustomHeroConfig(cfg);
        }}
        onCloseStudio={closeGlassStudio}
      />
    );
  }

  return (
    <div ref={landingRootRef} className="landing-shell">
      <SmoothScroll />
      <a className="lm-skip" href="#lumen-content">Skip to content</a>
      <LumenMotion rootRef={landingRootRef} />
      {/* Single Root-Level Global Atmospheric & Optical Glass Layer */}
      <PageAtmosphere
        activePreset={activeHeroPreset}
        customConfig={customHeroConfig}
      />

      <div className="landing-content">
        <MinimalHeader
          onFocusForm={handleFocusHeroForm}
          onOpenGlassStudio={openGlassStudio}
        />

        <main className="flex-1">
          <section id="workspace-hero" className="lm-hero" aria-labelledby="hero-heading">
            <div className="lm-hero-stage">
              <div className="lm-hero-grid">
                <div className="lm-hero-copy">
                  <div className="lm-edition"><span className="lm-live-dot" /> The AI Workflow Playbook <span>Free edition / 2026</span></div>
                  <h1 id="hero-heading" className="lm-hero-title"><SplitText text="Make repetitive work a thing of the past." /></h1>
                  <p className="lm-hero-description">Get the free AI Workflow Playbook with practical frameworks, real examples, and reusable prompts to design smarter workflows.</p>
                  <div className="lm-hero-form">
                    <DownloadForm formId="hero-download-form" inputRef={heroInputRef} submittedEmail={submittedEmail} lastSubmitTimestamp={lastSubmitTimestamp} onSuccessSubmit={handleSuccessSubmit} onResetSubmit={handleResetSubmit} onOpenPreviewSection={handleScrollToPreview} />
                  </div>
                  <a className="lm-text-link" href="#inside-playbook"><span>Take a look inside</span><ArrowUpRight size={17} aria-hidden="true" /></a>
                  <div className="lm-hero-facts"><span><b>16</b> practical pages</span><span><b>5</b> stage framework</span><span><b>3</b> worked examples</span></div>
                </div>
                <div className="lm-hero-art"><GlassWorkspace introConsumedRef={introConsumedRef} /></div>
              </div>
              <div className="lm-hero-bottom">
                <a href="#lumen-content" className="lm-scroll-cue"><span className="lm-scroll-cue__icon"><ArrowDown size={15} /></span><span>Scroll to see things differently</span></a>
                <div className="lm-scene-controls" role="group" aria-label="Select hero glass background preset">
                  <span>Change the light</span>
                  {GLASS_PRESET_LIST.map((preset, index) => <button key={preset.id} type="button" aria-label={preset.name} aria-pressed={activeHeroPreset === preset.id} title={preset.name} onClick={() => { setActiveHeroPreset(preset.id); setCustomHeroConfig(null); }}><span>{String(index + 1).padStart(2, '0')}</span></button>)}
                  <button className="lm-scene-studio" type="button" aria-label="Open Glass Studio" onClick={openGlassStudio}><Sliders size={13} /></button>
                </div>
              </div>
            </div>
          </section>
          <div className="lm-page-sheet" id="lumen-content">
          <WorkflowRibbon />
          {/* TRUSTED BY SECTION — Immediately below the Hero section */}
          <TrustedBySection />

          {/* SECTION 02 — THE PROBLEM */}
          <WorkflowStatement />
          <ProblemSection />

          {/* SECTION 03 — BENEFITS */}
          <BenefitsSection />

          {/* SECTION 04 — INSIDE THE PLAYBOOK */}
          <PlaybookPreviewSection onFocusForm={handleFocusHeroForm} />

          {/* SECTION 05 — HOW IT WORKS */}
          <HowItWorksSection />

          {/* SECTION 06 — PRACTICAL CREDIBILITY */}
          <CredibilitySection />

          {/* SECTION 07 — FAQ */}
          <FaqSection />

          {/* SECTION 08 — FINAL DOWNLOAD CTA */}
          <FinalCtaSection
            submittedEmail={submittedEmail}
            lastSubmitTimestamp={lastSubmitTimestamp}
            onSuccessSubmit={handleSuccessSubmit}
            onResetSubmit={handleResetSubmit}
            onOpenPreviewSection={handleScrollToPreview}
          />
          </div>
        </main>

        {/* SECTION 09 — MINIMAL FOOTER */}
        <Footer onOpenGlassStudio={openGlassStudio} />
      </div>
    </div>
  );
}
