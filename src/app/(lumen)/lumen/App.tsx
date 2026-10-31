/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Sliders } from 'lucide-react';
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
  const heroSectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subcopyRef = useRef<HTMLParagraphElement>(null);
  const formWrapperRef = useRef<HTMLDivElement>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);

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

  // Hero Opening Animation (Phase A & Phase B)
  useEffect(() => {
    if (isStudioOpen) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45 },
        0.05
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.15
        )
        .fromTo(
          subcopyRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55 },
          0.28
        )
        .fromTo(
          formWrapperRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.38
        );
    }, heroSectionRef);

    return () => ctx.revert();
  }, [isStudioOpen]);

  const handleFocusHeroForm = () => {
    const formEl = document.getElementById('hero-download-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    window.setTimeout(() => {
      heroInputRef.current?.focus();
    }, 300);
  };

  const handleScrollToPreview = () => {
    const previewEl = document.getElementById('inside-playbook');
    if (previewEl) {
      previewEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    <div className="landing-shell">
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
          {/* SECTION 01 — HERO: THE GLASS AI WORKSPACE */}
          <section
            ref={heroSectionRef}
            id="workspace-hero"
            aria-labelledby="hero-heading"
            className="landing-section pt-10 pb-16 sm:pt-14 sm:pb-24"
          >
            <div className="relative z-10 mx-auto max-w-[1280px] px-6 sm:px-10">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">
                {/* Left ~55%: Headline, Value Proposition, Email Capture */}
                <div className="lg:col-span-6 xl:col-span-6">
                  <p
                    ref={eyebrowRef}
                    className="font-mono text-xs font-semibold tracking-[0.14em] text-[#657187]"
                  >
                    WORK SMARTER WITH AI
                  </p>

                  <h1
                    ref={headlineRef}
                    id="hero-heading"
                    className="mt-4 text-4xl font-bold tracking-tight text-[#1E2432] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08] [text-wrap:balance]"
                  >
                    Make repetitive work a thing of the past.
                  </h1>

                  <p
                    ref={subcopyRef}
                    className="mt-5 max-w-xl text-base sm:text-lg text-[#657187] leading-relaxed"
                  >
                    Get the free AI Workflow Playbook with practical frameworks, real examples, and reusable prompts to design smarter workflows.
                  </p>

                  {/* Primary Email Conversion Form */}
                  <div ref={formWrapperRef} className="mt-8">
                    <DownloadForm
                      formId="hero-download-form"
                      inputRef={heroInputRef}
                      submittedEmail={submittedEmail}
                      lastSubmitTimestamp={lastSubmitTimestamp}
                      onSuccessSubmit={handleSuccessSubmit}
                      onResetSubmit={handleResetSubmit}
                      onOpenPreviewSection={handleScrollToPreview}
                    />
                  </div>

                  {/* Unboxed Clean Metadata Summary */}
                  <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[#1E2432]/10 pt-5 text-xs text-[#657187]">
                    <span className="font-medium text-[#1E2432]">Inside the 16-page edition</span>
                    <span aria-hidden="true">·</span>
                    <span>Opportunity Checklist</span>
                    <span aria-hidden="true">·</span>
                    <span>5-Stage Mapping Framework</span>
                    <span aria-hidden="true">·</span>
                    <span>3 Worked Examples</span>
                    <span aria-hidden="true">·</span>
                    <span>Human Review Gates</span>
                  </div>

                  {/* Interactive Optical Background Switcher & Studio Trigger */}
                  <div className="mt-5 flex flex-wrap items-center gap-2 pt-1">
                    <span className="font-mono text-[11px] font-medium text-[#657187]">
                      OPTICAL SCENE:
                    </span>
                    <div
                      role="group"
                      aria-label="Select hero glass background preset"
                      className="flex flex-wrap items-center gap-1"
                    >
                      {GLASS_PRESET_LIST.map((p, idx) => {
                        const isCurrent = activeHeroPreset === p.id;
                        const shortLabel = p.name.replace(/^Preset 0\d — /, '');
                        return (
                          <button
                            key={p.id}
                            type="button"
                            aria-pressed={isCurrent}
                            onClick={() => {
                              setActiveHeroPreset(p.id);
                              setCustomHeroConfig(null);
                            }}
                            className={`rounded-lg px-2 py-1 font-mono text-[11px] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                              isCurrent
                                ? 'bg-[#252C43] text-white font-semibold'
                                : 'bg-white/75 text-[#657187] hover:text-[#1E2432] hover:bg-white'
                            }`}
                          >
                            0{idx + 1} {shortLabel}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={openGlassStudio}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#1E2432]/15 bg-white/85 px-2.5 py-1 font-mono text-[11px] font-semibold text-[#1E2432] hover:bg-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <Sliders className="h-3 w-3" aria-hidden="true" />
                      <span>Open Glass Studio</span>
                    </button>
                  </div>
                </div>

                {/* Right ~45%: Floating Interactive 2.5D Workflow */}
                <div className="lg:col-span-6 xl:col-span-6">
                  <GlassWorkspace />
                </div>
              </div>
            </div>
          </section>

          {/* TRUSTED BY SECTION — Immediately below the Hero section */}
          <TrustedBySection />

          {/* SECTION 02 — THE PROBLEM */}
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
        </main>

        {/* SECTION 09 — MINIMAL FOOTER */}
        <Footer onOpenGlassStudio={openGlassStudio} />
      </div>
    </div>
  );
}
