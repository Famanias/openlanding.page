<template slug="lumen" name="LUMEN">
  <dependencies>
    {
      "dependencies": {
        "three": "^0.186.1",
        "gsap": "^3.15.0",
        "motion": "^14.4.0",
        "lucide-react": "0.475.0"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(lumen)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./lumen/lumen.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "LUMEN — The AI Workflow Playbook",
  description:
    "Make repetitive work a thing of the past. Download the free AI Workflow Playbook with practical frameworks, real examples, and reusable prompts to design smarter workflows.",
  openGraph: {
    title: "LUMEN — The AI Workflow Playbook",
    description:
      "Make repetitive work a thing of the past. Download the free AI Workflow Playbook with practical frameworks, real examples, and reusable prompts to design smarter workflows.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F8F9FC",
  colorScheme: "light",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(lumen)/lumen/App.tsx">
<![CDATA[/**
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
]]>
    </file>
    <file path="src/app/(lumen)/lumen/lumen.css">
<![CDATA[@import "tailwindcss";

:root {
  --bg-primary: #F8F9FC;
  --bg-secondary: #F0F3FA;
  --text-primary: #1E2432;
  --text-secondary: #657187;
  --glass-border: rgba(255, 255, 255, 0.78);
  --glass-border-strong: rgba(255, 255, 255, 0.94);
  --glass-tint: rgba(235, 240, 255, 0.45);
  --glass-surface: rgba(255, 255, 255, 0.62);
  --glass-surface-elevated: rgba(255, 255, 255, 0.78);
  --accent-lavender: #D8D0F7;
  --accent-ice: #C9DAFA;
  --accent-peach: #F6DCCA;
  --btn-primary: #252C43;
  --accent-positive: #5BA59A;
  --glass-blur: 16px;
  --glass-shadow: 0 20px 50px -12px rgba(30, 36, 50, 0.08), 0 4px 16px -2px rgba(30, 36, 50, 0.04);
  --glass-shadow-elevated: 0 28px 64px -12px rgba(30, 36, 50, 0.14), 0 8px 24px -4px rgba(30, 36, 50, 0.06);
  --glass-edge-highlight: inset 0 1px 0 0 rgba(255, 255, 255, 0.9), inset 0 0 0 1px rgba(255, 255, 255, 0.45);
}

@layer base {
  body {
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: var(--bg-primary);
    color: var(--text-primary);
    overflow-x: clip;
  }

  code, pre, .font-mono {
    font-family: 'JetBrains Mono', monospace;
    font-variant-numeric: tabular-nums;
  }
}

/* Reusable Glassmorphic Surface Tokens */
.glass-panel {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.76) 0%,
    rgba(244, 247, 255, 0.54) 55%,
    rgba(235, 240, 255, 0.48) 100%
  );
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow), var(--glass-edge-highlight);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
}

.glass-panel-active {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.90) 0%,
    rgba(248, 250, 255, 0.78) 60%,
    rgba(240, 244, 255, 0.68) 100%
  );
  border: 1px solid var(--glass-border-strong);
  box-shadow: var(--glass-shadow-elevated), var(--glass-edge-highlight);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.glass-panel-subtle {
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.64) 0%,
    rgba(240, 243, 250, 0.42) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.68);
  box-shadow: 0 12px 32px -8px rgba(30, 36, 50, 0.06), inset 0 1px 0 0 rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Graceful fallback if backdrop-filter is unsupported */
@supports not ((backdrop-filter: blur(12px)) or (-webkit-backdrop-filter: blur(12px))) {
  .glass-panel,
  .glass-panel-active,
  .glass-panel-subtle {
    background: rgba(250, 251, 255, 0.96);
  }
}

/* Global Seamless Page-Level Atmospheric System */
.landing-shell {
  position: relative;
  isolation: isolate;
  min-height: 100vh;
  overflow-x: clip;
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.page-atmosphere {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: clip;
}

.page-atmosphere__base {
  position: absolute;
  inset: 0;
  background-color: #F8F9FC;
}

.page-atmosphere__lines {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    112deg,
    rgba(255, 255, 255, 0) 0px,
    rgba(255, 255, 255, 0) 92px,
    rgba(255, 255, 255, 0.44) 92px,
    rgba(201, 218, 250, 0.14) 94px,
    rgba(255, 255, 255, 0) 96px
  );
  background-position: 0 0;
  opacity: 0.72;
}

.page-atmosphere__lighting {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(64% 18% at 74% 9%, rgba(216, 208, 247, 0.48) 0%, rgba(201, 218, 250, 0.34) 48%, rgba(248, 249, 252, 0) 100%),
    radial-gradient(68% 22% at 24% 38%, rgba(201, 218, 250, 0.32) 0%, rgba(255, 255, 255, 0.55) 45%, rgba(248, 249, 252, 0) 100%),
    radial-gradient(62% 24% at 76% 64%, rgba(216, 208, 247, 0.30) 0%, rgba(201, 218, 250, 0.24) 50%, rgba(248, 249, 252, 0) 100%),
    radial-gradient(70% 20% at 62% 91%, rgba(246, 220, 202, 0.38) 0%, rgba(216, 208, 247, 0.34) 48%, rgba(248, 249, 252, 0) 100%);
}

.page-atmosphere__glass {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.page-atmosphere__sculpture-ribbon-a {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1650px;
  opacity: 0.85;
}

.page-atmosphere__sculpture-sheet-b {
  position: absolute;
  top: 1550px;
  left: 0;
  width: 100%;
  height: 1950px;
  opacity: 0.82;
}

.page-atmosphere__sculpture-halo-c {
  position: absolute;
  bottom: 60px;
  left: 0;
  width: 100%;
  height: 1400px;
  opacity: 0.85;
}

.page-atmosphere__noise {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    100% 100% at 50% 50%,
    rgba(255, 255, 255, 0) 65%,
    rgba(240, 243, 250, 0.24) 100%
  );
}

.landing-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.landing-section {
  position: relative;
  background: transparent;
}

.refraction-border-lavender {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(216, 208, 247, 0.5), rgba(201, 218, 250, 0.5));
}

.refraction-border-peach {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(246, 220, 202, 0.55), rgba(216, 208, 247, 0.45));
}

/* 2.5D Perspective Workspace Stage */
.workspace-perspective-stage {
  perspective: 1400px;
  transform-style: preserve-3d;
}

.workspace-tilt-plane {
  transform-style: preserve-3d;
  transform: rotateX(var(--tilt-x, 2deg)) rotateY(var(--tilt-y, -4deg));
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.panel-depth-input {
  transform: translate3d(0px, 0px, -18px) rotateY(4deg) rotateX(2deg);
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
}

.panel-depth-processing {
  transform: translate3d(0px, 0px, 24px) rotateY(-2deg) rotateX(1deg);
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
}

.panel-depth-output {
  transform: translate3d(0px, 0px, -8px) rotateY(-5deg) rotateX(2deg);
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
}

.panel-depth-focused {
  transform: translate3d(0px, -6px, 46px) rotateY(0deg) rotateX(0deg) scale(1.02);
}

.panel-depth-recessed {
  transform: translate3d(0px, 4px, -28px) scale(0.975);
}

/* Playbook 2.5D Document Stack */
.playbook-stack-stage {
  perspective: 1500px;
  transform-style: preserve-3d;
}

.stack-card-front {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.97) 0%, rgba(248, 250, 255, 0.95) 100%);
  border: 1px solid rgba(255, 255, 255, 0.95);
  box-shadow: 0 28px 64px -12px rgba(30, 36, 50, 0.14), 0 8px 24px -4px rgba(30, 36, 50, 0.06);
  transform: translate3d(0px, 0px, 30px) rotateY(-3deg) rotateX(1deg);
  z-index: 30;
  opacity: 1;
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease, box-shadow 0.45s ease;
}

.stack-card-middle {
  background: linear-gradient(135deg, rgba(235, 240, 255, 0.72) 0%, rgba(216, 208, 247, 0.48) 100%);
  border: 1px solid rgba(255, 255, 255, 0.88);
  box-shadow: 0 20px 45px -12px rgba(30, 36, 50, 0.08);
  transform: translate3d(22px, -14px, -20px) rotateY(-5deg) rotateX(2deg) scale(0.97);
  z-index: 20;
  opacity: 0.9;
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease, box-shadow 0.45s ease;
}

.stack-card-back {
  background: linear-gradient(135deg, rgba(201, 218, 250, 0.58) 0%, rgba(246, 220, 202, 0.48) 100%);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 16px 36px -12px rgba(30, 36, 50, 0.06);
  transform: translate3d(44px, -28px, -60px) rotateY(-7deg) rotateX(3deg) scale(0.94);
  z-index: 10;
  opacity: 0.75;
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease, box-shadow 0.45s ease;
}

.stack-card-cover-docked {
  transform: translate3d(-28px, 18px, -45px) rotateY(4deg) rotateX(2deg) scale(0.93);
  z-index: 15;
  opacity: 0.72;
  transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.45s ease;
}

/* SVG Signal Pulse Keyframes */
@keyframes signalFlow {
  0% {
    stroke-dashoffset: 240;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.svg-signal-line {
  stroke-dasharray: 18 222;
  animation: signalFlow 3.4s linear infinite;
}

.svg-signal-line-delayed {
  stroke-dasharray: 18 222;
  animation: signalFlow 3.4s linear infinite;
  animation-delay: 1.6s;
}

@keyframes floatSlow {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-6px);
  }
}

.animate-float-slow {
  animation: floatSlow 6.5s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .workspace-tilt-plane,
  .panel-depth-input,
  .panel-depth-processing,
  .panel-depth-output,
  .panel-depth-focused,
  .panel-depth-recessed,
  .stack-card-front,
  .stack-card-middle,
  .stack-card-back {
    transform: none !important;
  }
}

/* Oversized signature over the full-bleed footer artwork. */
.lumen-footer-wordmark {
  font-size: clamp(5rem, 19vw, 16rem);
  font-weight: 700;
  letter-spacing: -0.075em;
  line-height: 0.9;
  color: #1E2432;
}

/* Keep the footer sculpture in the same slow, scroll-responsive atmosphere. */
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .lumen-footer-glass {
      animation: lumen-footer-drift linear both;
      animation-timeline: view();
      animation-range: entry 0% exit 100%;
    }
  }
}

@keyframes lumen-footer-drift {
  from { transform: translate3d(0, 5%, 0); }
  to { transform: translate3d(0, -5%, 0); }
}
]]>
    </file>
    <file path="src/app/(lumen)/lumen/page.tsx">
<![CDATA[import App from "./App";

export default function Page() {
  return <App />;
}
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/BenefitsSection.tsx">
<![CDATA[import React from 'react';

export const BenefitsSection: React.FC = () => {
  return (
    <section
      id="benefits"
      aria-labelledby="benefits-heading"
      className="landing-section py-20 sm:py-28"
    >
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-medium text-[#657187]">
            03 · THE BENEFITS — WHAT BETTER WORKFLOWS ENABLE
          </p>
          <h2
            id="benefits-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-[#1E2432] sm:text-4xl [text-wrap:balance]"
          >
            Less busywork. More meaningful work.
          </h2>
          <p className="mt-4 text-base text-[#657187] leading-relaxed">
            Well-designed workflows do not replace human judgment—they remove repetitive formatting, sorting, and first-pass synthesis so your team can focus on decisions that matter.
          </p>
        </div>

        {/* Asymmetric Bento Grid with 3 distinct SVG visual compositions */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Benefit 01 — Find opportunities (col-span-4) */}
          <article className="glass-panel rounded-3xl p-6 sm:p-7 lg:col-span-4 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-semibold text-[#657187]">
                01. FIND OPPORTUNITIES
              </span>
              <h3 className="mt-2 text-xl font-bold text-[#1E2432]">
                Identify repetitive tasks worth improving.
              </h3>
              <p className="mt-2.5 text-sm text-[#657187] leading-relaxed">
                Spot high-frequency intake, triage, and summarization patterns before investing time in tooling.
              </p>
            </div>

            {/* Illustration 1: Scattered fragments classified into organized lanes */}
            <div className="mt-6 rounded-2xl border border-white/85 bg-white/70 p-4">
              <svg
                viewBox="0 0 320 150"
                className="h-36 w-full"
                role="img"
                aria-label="Scattered task fragments sorting into organized category groups"
              >
                {/* Left scattered fragments */}
                <rect x="14" y="18" width="54" height="24" rx="6" fill="#D8D0F7" fillOpacity="0.65" stroke="#1E2432" strokeOpacity="0.15" />
                <rect x="24" y="58" width="54" height="24" rx="6" fill="#C9DAFA" fillOpacity="0.75" stroke="#1E2432" strokeOpacity="0.15" />
                <rect x="12" y="98" width="54" height="24" rx="6" fill="#F6DCCA" fillOpacity="0.75" stroke="#1E2432" strokeOpacity="0.15" />

                {/* Sorting curves */}
                <path d="M 68 30 C 115 30, 120 32, 162 32" fill="none" stroke="#657187" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M 78 70 C 120 70, 125 74, 162 74" fill="none" stroke="#657187" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M 66 110 C 115 110, 120 116, 162 116" fill="none" stroke="#657187" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Organized Group Lanes on Right */}
                <g transform="translate(164, 16)">
                  <rect width="142" height="32" rx="8" fill="#F8F9FC" stroke="#1E2432" strokeOpacity="0.12" />
                  <rect x="8" y="8" width="16" height="16" rx="4" fill="#D8D0F7" />
                  <text x="32" y="20" fontSize="10" fontWeight="600" fill="#1E2432">Client Intake</text>
                </g>
                <g transform="translate(164, 58)">
                  <rect width="142" height="32" rx="8" fill="#F8F9FC" stroke="#1E2432" strokeOpacity="0.12" />
                  <rect x="8" y="8" width="16" height="16" rx="4" fill="#C9DAFA" />
                  <text x="32" y="20" fontSize="10" fontWeight="600" fill="#1E2432">Doc Extraction</text>
                </g>
                <g transform="translate(164, 100)">
                  <rect width="142" height="32" rx="8" fill="#F8F9FC" stroke="#1E2432" strokeOpacity="0.12" />
                  <rect x="8" y="8" width="16" height="16" rx="4" fill="#F6DCCA" />
                  <text x="32" y="20" fontSize="10" fontWeight="600" fill="#1E2432">Meeting Actions</text>
                </g>
              </svg>
            </div>
          </article>

          {/* Benefit 02 — Build repeatable workflows (col-span-4) */}
          <article className="glass-panel rounded-3xl p-6 sm:p-7 lg:col-span-4 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-semibold text-[#657187]">
                02. BUILD REPEATABLE WORKFLOWS
              </span>
              <h3 className="mt-2 text-xl font-bold text-[#1E2432]">
                Create practical systems with clear steps and responsibilities.
              </h3>
              <p className="mt-2.5 text-sm text-[#657187] leading-relaxed">
                Connect inputs, prompt templates, and destination tools into a documented sequence anyone on your team can follow.
              </p>
            </div>

            {/* Illustration 2: Glass panels connected through animated SVG pathways */}
            <div className="mt-6 rounded-2xl border border-white/85 bg-white/70 p-4">
              <svg
                viewBox="0 0 320 150"
                className="h-36 w-full"
                role="img"
                aria-label="Three workflow nodes linked by animated SVG pathways"
              >
                <path
                  d="M 88 45 C 120 45, 115 75, 136 75 C 185 75, 195 105, 228 105"
                  fill="none"
                  stroke="#C9DAFA"
                  strokeWidth="3"
                />
                <path
                  d="M 88 45 C 120 45, 115 75, 136 75 C 185 75, 195 105, 228 105"
                  fill="none"
                  stroke="#252C43"
                  strokeWidth="2.5"
                  className="svg-signal-line"
                />

                {/* Step Node 1 */}
                <g transform="translate(14, 24)">
                  <rect width="76" height="42" rx="10" fill="#FFFFFF" stroke="#1E2432" strokeOpacity="0.16" />
                  <text x="12" y="18" fontSize="8" fontFamily="monospace" fill="#657187">STEP 01</text>
                  <text x="12" y="31" fontSize="10" fontWeight="600" fill="#1E2432">Trigger</text>
                </g>

                {/* Step Node 2 */}
                <g transform="translate(122, 54)">
                  <rect width="80" height="42" rx="10" fill="#FFFFFF" stroke="#252C43" strokeOpacity="0.28" />
                  <text x="12" y="18" fontSize="8" fontFamily="monospace" fill="#657187">STEP 02</text>
                  <text x="12" y="31" fontSize="10" fontWeight="600" fill="#1E2432">Structure</text>
                </g>

                {/* Step Node 3 */}
                <g transform="translate(228, 84)">
                  <rect width="78" height="42" rx="10" fill="#FFFFFF" stroke="#5BA59A" strokeOpacity="0.45" />
                  <text x="12" y="18" fontSize="8" fontFamily="monospace" fill="#5BA59A">STEP 03</text>
                  <text x="12" y="31" fontSize="10" fontWeight="600" fill="#1E2432">Deliver</text>
                </g>
              </svg>
            </div>
          </article>

          {/* Benefit 03 — Stay in control (col-span-4) */}
          <article className="glass-panel rounded-3xl p-6 sm:p-7 lg:col-span-4 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs font-semibold text-[#657187]">
                03. STAY IN CONTROL
              </span>
              <h3 className="mt-2 text-xl font-bold text-[#1E2432]">
                Keep reviews, approvals, and important decisions in human hands.
              </h3>
              <p className="mt-2.5 text-sm text-[#657187] leading-relaxed">
                Place explicit verification checkpoints before external communication or critical updates take effect.
              </p>
            </div>

            {/* Illustration 3: AI route passing through a clear human review checkpoint */}
            <div className="mt-6 rounded-2xl border border-white/85 bg-white/70 p-4">
              <svg
                viewBox="0 0 320 150"
                className="h-36 w-full"
                role="img"
                aria-label="AI draft route passing through a human approval checkpoint gate"
              >
                {/* Horizontal flow line */}
                <line x1="24" y1="75" x2="296" y2="75" stroke="#C9DAFA" strokeWidth="2.5" />

                {/* Left Node: AI Draft */}
                <g transform="translate(16, 48)">
                  <rect width="76" height="54" rx="10" fill="#F8F9FC" stroke="#1E2432" strokeOpacity="0.15" />
                  <text x="12" y="22" fontSize="8" fontFamily="monospace" fill="#657187">AI STEP</text>
                  <text x="12" y="38" fontSize="10" fontWeight="600" fill="#1E2432">Draft Ready</text>
                </g>

                {/* Center Checkpoint Gate */}
                <g transform="translate(114, 34)">
                  <rect width="94" height="82" rx="14" fill="#252C43" />
                  <text x="14" y="26" fontSize="8" fontFamily="monospace" fill="#C9DAFA">CHECKPOINT</text>
                  <text x="14" y="45" fontSize="10" fontWeight="600" fill="#FFFFFF">Human Review</text>
                  <rect x="14" y="56" width="66" height="16" rx="5" fill="#5BA59A" />
                  <text x="25" y="67" fontSize="8" fontWeight="600" fill="#FFFFFF">Approved</text>
                </g>

                {/* Right Node: Released Output */}
                <g transform="translate(228, 48)">
                  <rect width="76" height="54" rx="10" fill="#F8F9FC" stroke="#5BA59A" strokeOpacity="0.5" />
                  <text x="12" y="22" fontSize="8" fontFamily="monospace" fill="#5BA59A">VERIFIED</text>
                  <text x="12" y="38" fontSize="10" fontWeight="600" fill="#1E2432">Sent Safely</text>
                </g>
              </svg>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/CredibilitySection.tsx">
<![CDATA[import React, { useState } from 'react';
import { ShieldAlert, ArrowRight, CheckCircle2, Users, BookOpen } from 'lucide-react';

export const CredibilitySection: React.FC = () => {
  const [comparisonView, setComparisonView] = useState<'before' | 'after'>('after');

  return (
    <section
      id="practical-credibility"
      aria-labelledby="credibility-heading"
      className="landing-section py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-medium text-[#657187]">
            06 · RESOURCE CREDIBILITY &amp; PRACTICAL EXAMPLES
          </p>
          <h2
            id="credibility-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-[#1E2432] sm:text-4xl [text-wrap:balance]"
          >
            Practical ideas. Clear frameworks. No unnecessary complexity.
          </h2>
          <p className="mt-4 text-base text-[#657187] leading-relaxed">
            Built from real operational workflow templates—without hype, black-box promises, or unverified automation claims.
          </p>
        </div>

        {/* Worked Before & After Example + Genuine Excerpt */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left 7 Columns: Interactive Before & After Worked Example */}
          <div className="glass-panel-active rounded-3xl p-6 sm:p-8 lg:col-span-7 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1E2432]/10 pb-4">
                <div>
                  <span className="font-mono text-xs font-semibold text-[#657187]">
                    WORKED EXAMPLE · CHAPTER 08
                  </span>
                  <h3 className="mt-1 text-xl font-bold text-[#1E2432]">
                    From incoming email to prepared response.
                  </h3>
                </div>

                {/* Before / After Switcher */}
                <div
                  role="group"
                  aria-label="Compare manual vs AI-assisted workflow"
                  className="inline-flex items-center gap-1 rounded-xl border border-white/85 bg-[#F0F3FA] p-1"
                >
                  <button
                    type="button"
                    aria-pressed={comparisonView === 'before'}
                    onClick={() => setComparisonView('before')}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      comparisonView === 'before'
                        ? 'bg-[#252C43] text-white shadow-xs'
                        : 'text-[#657187] hover:text-[#1E2432]'
                    }`}
                  >
                    Before: Manual Triage
                  </button>
                  <button
                    type="button"
                    aria-pressed={comparisonView === 'after'}
                    onClick={() => setComparisonView('after')}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      comparisonView === 'after'
                        ? 'bg-[#252C43] text-white shadow-xs'
                        : 'text-[#657187] hover:text-[#1E2432]'
                    }`}
                  >
                    After: AI-Assisted + Review
                  </button>
                </div>
              </div>

              {comparisonView === 'before' ? (
                <div className="mt-6 space-y-3">
                  <p className="text-xs font-mono text-[#657187]">
                    MANUAL PROCESS — REPETITIVE CONTEXT SWITCHING
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/80 bg-white/75 p-4">
                      <span className="font-mono text-[11px] text-[#657187]">01. READ &amp; SORT</span>
                      <p className="mt-1.5 text-xs font-semibold text-[#1E2432]">
                        Manual classification
                      </p>
                      <p className="mt-1 text-xs text-[#657187]">
                        Open long email threads, identify intent, and copy details into tracker.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/80 bg-white/75 p-4">
                      <span className="font-mono text-[11px] text-[#657187]">02. SUMMARIZE</span>
                      <p className="mt-1.5 text-xs font-semibold text-[#1E2432]">
                        Ad-hoc notes
                      </p>
                      <p className="mt-1 text-xs text-[#657187]">
                        Rewrite key dates and questions by hand for the internal team channel.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/80 bg-white/75 p-4">
                      <span className="font-mono text-[11px] text-[#657187]">03. FOLLOW-UP</span>
                      <p className="mt-1.5 text-xs font-semibold text-[#1E2432]">
                        Blank-page drafting
                      </p>
                      <p className="mt-1 text-xs text-[#657187]">
                        Search past replies for standard policy clauses and draft response from scratch.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 space-y-3">
                  <p className="text-xs font-mono text-[#5BA59A] font-medium">
                    STRUCTURED AI-ASSISTED WORKFLOW WITH HUMAN REVIEW STEP
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-[#D8D0F7] bg-white/90 p-4">
                      <span className="font-mono text-[11px] text-[#657187]">01. CLASSIFY &amp; EXTRACT</span>
                      <p className="mt-1.5 text-xs font-semibold text-[#1E2432]">
                        Structured intake brief
                      </p>
                      <p className="mt-1 text-xs text-[#657187]">
                        Workflow tags category, extracts requested dates, and flags any ambiguous items.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[#C9DAFA] bg-white/90 p-4">
                      <span className="font-mono text-[11px] text-[#657187]">02. PREPARE DRAFT</span>
                      <p className="mt-1.5 text-xs font-semibold text-[#1E2432]">
                        Grounded reply template
                      </p>
                      <p className="mt-1 text-xs text-[#657187]">
                        Assembles a draft response using approved reference clauses and source facts.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-[#5BA59A]/50 bg-[#252C43] text-white p-4">
                      <span className="font-mono text-[11px] text-[#C9DAFA]">03. HUMAN CHECKPOINT</span>
                      <p className="mt-1.5 text-xs font-semibold text-white">
                        Verify &amp; send
                      </p>
                      <p className="mt-1 text-xs text-white/80">
                        Account owner verifies extracted facts in 60 seconds and approves delivery.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Verification Requirement Notice */}
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/90 bg-white/80 p-4 text-xs text-[#1E2432]">
              <ShieldAlert className="mt-0.5 h-4 w-4 text-[#252C43] shrink-0" aria-hidden="true" />
              <div>
                <span className="font-semibold">Human verification required: </span>
                <span className="text-[#657187]">
                  AI outputs require verification before external release. The playbook teaches how to design fast review gates rather than unmonitored full automation.
                </span>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Genuine Excerpt + Who This Guide Is For */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Genuine Excerpt Card */}
            <div className="glass-panel rounded-3xl p-6">
              <div className="flex items-center gap-2 text-xs font-mono text-[#657187]">
                <BookOpen className="h-3.5 w-3.5 text-[#252C43]" aria-hidden="true" />
                <span>DIRECT EXCERPT · PAGE 07</span>
              </div>
              <blockquote className="mt-3 text-sm font-medium text-[#1E2432] leading-relaxed">
                &ldquo;Never ask a single prompt to interpret raw input, make a policy decision, and trigger an external action at once. Separate classification from drafting, and always place a human checkpoint before external delivery.&rdquo;
              </blockquote>
              <div className="mt-3 font-mono text-[11px] text-[#657187]">
                — Section 04: The Separation of Responsibilities Rule
              </div>
            </div>

            {/* Who the Guide Is For */}
            <div className="glass-panel rounded-3xl p-6 flex-1">
              <div className="flex items-center gap-2 text-xs font-mono text-[#657187]">
                <Users className="h-3.5 w-3.5 text-[#252C43]" aria-hidden="true" />
                <span>WHO THIS GUIDE IS FOR</span>
              </div>
              <h3 className="mt-2 text-base font-bold text-[#1E2432]">
                Designed for practical builders and operations teams
              </h3>
              <ul className="mt-3.5 space-y-2.5 text-xs text-[#657187]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-[#5BA59A] shrink-0" aria-hidden="true" />
                  <span>
                    <strong className="text-[#1E2432]">Operations &amp; Delivery Leads</strong> structuring client intake, questionnaires, and status reporting.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-[#5BA59A] shrink-0" aria-hidden="true" />
                  <span>
                    <strong className="text-[#1E2432]">Product &amp; Project Managers</strong> turning meeting transcripts and research notes into clear action logs.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 text-[#5BA59A] shrink-0" aria-hidden="true" />
                  <span>
                    <strong className="text-[#1E2432]">Cross-Functional Teams</strong> adopting AI workflows without requiring custom software engineering.
                  </span>
                </li>
              </ul>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#1E2432]">
                <span>Tool-agnostic frameworks</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#5BA59A]" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/DownloadForm.tsx">
<![CDATA[import React, { useState } from 'react';
import { CheckCircle2, FileDown, BookOpen, ArrowRight, AlertCircle } from 'lucide-react';
import { validateWorkEmail, canSubmitEmail } from '../utils/workflowLogic';

interface DownloadFormProps {
  formId: string;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  submittedEmail: string | null;
  lastSubmitTimestamp: number | null;
  onSuccessSubmit: (email: string, timestamp: number) => void;
  onResetSubmit: () => void;
  onOpenPreviewSection?: () => void;
  compact?: boolean;
}

export const DownloadForm: React.FC<DownloadFormProps> = ({
  formId,
  inputRef,
  submittedEmail,
  lastSubmitTimestamp,
  onSuccessSubmit,
  onResetSubmit,
  onOpenPreviewSection,
  compact = false,
}) => {
  const [emailInput, setEmailInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const errorId = `${formId}-error`;
  const privacyId = `${formId}-privacy`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const validation = validateWorkEmail(emailInput);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Please enter a valid work email.');
      return;
    }

    const now = Date.now();
    const guard = canSubmitEmail(
      validation.normalizedEmail,
      submittedEmail,
      lastSubmitTimestamp,
      now
    );

    if (!guard.allowed) {
      setErrorMessage(null);
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      onSuccessSubmit(validation.normalizedEmail, now);
    }, 220);
  };

  if (submittedEmail) {
    return (
      <div
        id={formId}
        role="region"
        aria-live="polite"
        aria-label="Playbook download confirmation"
        className="glass-panel-active rounded-2xl p-6 transition-all duration-300"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-[#5BA59A] shrink-0" aria-hidden="true" />
            <h3 className="text-base font-semibold text-[#1E2432]">
              Your playbook is ready.
            </h3>
          </div>
          <span className="text-xs font-mono text-[#657187]">
            16 PAGES · PDF EDITION
          </span>
        </div>

        <p className="mt-2 text-sm text-[#657187] leading-relaxed">
          Prepared for <span className="font-medium text-[#1E2432]">{submittedEmail}</span>. Access the complete guide with the automation opportunity checklist, 5-stage mapping framework, and reusable prompt templates.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {/* Per user instruction: the Download PDF button does not need to trigger a file download */}
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#252C43] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1E2432] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43]"
          >
            <FileDown className="h-4 w-4" aria-hidden="true" />
            <span>Download PDF</span>
          </button>

          {onOpenPreviewSection && (
            <button
              type="button"
              onClick={onOpenPreviewSection}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#1E2432]/15 bg-white/75 px-4 py-3 text-sm font-medium text-[#1E2432] hover:bg-white transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43]"
            >
              <BookOpen className="h-4 w-4 text-[#657187]" aria-hidden="true" />
              <span>Explore Interactive Pages</span>
            </button>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#1E2432]/10 pt-3 text-xs text-[#657187]">
          <span>
            Interactive demonstration mode · Email verified locally in browser (not stored on a server).
          </span>
          <button
            type="button"
            onClick={() => {
              setEmailInput('');
              onResetSubmit();
            }}
            className="font-medium text-[#1E2432] underline underline-offset-2 hover:text-[#252C43] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Use a different email
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      id={formId}
      onSubmit={handleSubmit}
      noValidate
      className={compact ? 'w-full' : 'w-full max-w-xl'}
    >
      <div className="glass-panel rounded-2xl p-2 sm:p-2.5">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <label htmlFor={`${formId}-email`} className="sr-only">
              Your work email
            </label>
            <input
              ref={inputRef}
              id={`${formId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              placeholder="Your work email"
              aria-invalid={errorMessage ? 'true' : 'false'}
              aria-describedby={errorMessage ? `${errorId} ${privacyId}` : privacyId}
              className="w-full rounded-xl bg-white/85 px-4 py-3.5 text-sm text-[#1E2432] placeholder:text-[#657187]/80 border border-white/90 focus:border-[#252C43]/40 focus:bg-white focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#252C43] px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1E2432] disabled:opacity-60 transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43]"
          >
            <span>{isSubmitting ? 'Preparing guide...' : 'Get the free playbook'}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      {errorMessage && (
        <div
          id={errorId}
          role="alert"
          className="mt-2.5 flex items-center gap-2 text-xs font-medium text-rose-700"
        >
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div
        id={privacyId}
        className="mt-3 flex flex-col gap-1 text-xs text-[#657187] sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-2 font-medium text-[#1E2432]/85">
          <span>Free PDF. No credit card required.</span>
          <span aria-hidden="true">·</span>
          <span>16 Practical Pages</span>
        </div>
        <span className="text-[11px] text-[#657187]">
          Demo mode: validated locally; no leads are stored or emailed.
        </span>
      </div>
    </form>
  );
};
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/FaqSection.tsx">
<![CDATA[import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../utils/workflowLogic';

export const FaqSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    free: true,
    receive: true,
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="landing-section py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1000px] px-6 sm:px-10">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-medium text-[#657187]">
            07 · FREQUENTLY ASKED QUESTIONS
          </p>
          <h2
            id="faq-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-[#1E2432] sm:text-4xl [text-wrap:balance]"
          >
            Everything you need to know.
          </h2>
          <p className="mt-4 text-base text-[#657187] leading-relaxed">
            Clear answers about what is inside the playbook, how to apply the frameworks, and how this interactive preview handles your email.
          </p>
        </div>

        <div className="mt-10 divide-y divide-[#1E2432]/10 rounded-3xl glass-panel px-6 py-2 sm:px-8">
          {FAQ_ITEMS.map((item) => {
            const isOpen = Boolean(openIds[item.id]);
            const contentId = `faq-answer-${item.id}`;
            const buttonId = `faq-button-${item.id}`;

            return (
              <div key={item.id} className="py-5">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleItem(item.id)}
                    className="flex w-full items-center justify-between gap-4 text-left text-base font-semibold text-[#1E2432] hover:text-[#252C43] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43]"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-[#657187] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#1E2432]' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                <div
                  id={contentId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className={isOpen ? 'mt-3 pr-8 text-sm text-[#657187] leading-relaxed' : 'hidden'}
                >
                  {item.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/FinalCtaSection.tsx">
<![CDATA[import React, { useState } from 'react';
import { DownloadForm } from './DownloadForm';

interface FinalCtaSectionProps {
  submittedEmail: string | null;
  lastSubmitTimestamp: number | null;
  onSuccessSubmit: (email: string, timestamp: number) => void;
  onResetSubmit: () => void;
  onOpenPreviewSection: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  submittedEmail,
  lastSubmitTimestamp,
  onSuccessSubmit,
  onResetSubmit,
  onOpenPreviewSection,
}) => {
  const [coverFallback, setCoverFallback] = useState(false);

  return (
    <section
      id="final-download"
      aria-labelledby="final-cta-heading"
      className="landing-section py-20 sm:py-28"
    >
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="glass-panel-active rounded-3xl p-8 sm:p-12 lg:p-14">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left 7 Columns: Headline, Supporting Copy, and Synchronized Email Form */}
            <div className="lg:col-span-7">
              <p className="font-mono text-xs font-medium text-[#657187]">
                08 · FREE RESOURCE — EDITION 2026
              </p>
              <h2
                id="final-cta-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-[#1E2432] sm:text-4xl lg:text-5xl [text-wrap:balance]"
              >
                Your smarter workflow starts here.
              </h2>
              <p className="mt-4 max-w-xl text-base text-[#657187] leading-relaxed">
                Get the free AI Workflow Playbook and start turning repetitive tasks into clearer, more useful systems.
              </p>

              <div className="mt-8">
                <DownloadForm
                  formId="final-download-form"
                  submittedEmail={submittedEmail}
                  lastSubmitTimestamp={lastSubmitTimestamp}
                  onSuccessSubmit={onSuccessSubmit}
                  onResetSubmit={onResetSubmit}
                  onOpenPreviewSection={onOpenPreviewSection}
                />
              </div>
            </div>

            {/* Right 5 Columns: Floating Representation of Actual Playbook Cover + Translucent Glass Sheets */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px]">
                {/* Back Translucent Glass Sheet 2 */}
                <div
                  aria-hidden="true"
                  className="glass-panel-subtle absolute -right-5 -top-5 h-full w-full rounded-3xl rotate-6 scale-95"
                />
                {/* Middle Translucent Glass Sheet 1 */}
                <div
                  aria-hidden="true"
                  className="glass-panel absolute -left-4 -bottom-4 h-full w-full rounded-3xl -rotate-3 scale-95"
                />
                {/* Front Floating Playbook Cover */}
                <div className="glass-panel-active relative z-10 rounded-3xl p-3 shadow-lg transition-transform duration-500 hover:-translate-y-1.5">
                  <div className="overflow-hidden rounded-2xl border border-white/85 bg-[#F8F9FC]">
                    <img
                      src={
                        coverFallback
                          ? '/assets/aistudio/ai-workflow-playbook-cover_2149baf2.png'
                          : '/assets/aistudio/ai-workflow-playbook-cover_dcc4c416.svg'
                      }
                      alt="LUMEN AI Workflow Playbook Cover"
                      referrerPolicy="no-referrer"
                      onError={() => setCoverFallback(true)}
                      className="h-auto w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/Footer.tsx">
<![CDATA[import React from 'react';
import { FooterGlass } from './FooterGlass';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenGlassStudio?: () => void;
}

const footerLinkClass =
  'w-fit text-sm font-medium text-[#1E2432] transition-opacity duration-300 hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#252C43]';

export const Footer: React.FC<FooterProps> = ({ onOpenGlassStudio }) => {
  return (
    <footer className="relative isolate overflow-clip text-[#1E2432]">
      <FooterGlass />

      <div className="mx-auto max-w-[1280px] px-6 pt-16 sm:px-10 sm:pt-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <p className="font-mono text-xs font-medium tracking-[0.12em] text-[#657187]">
              THE AI WORKFLOW PLAYBOOK / 2026
            </p>
            <h2 className="mt-5 max-w-md text-3xl font-semibold tracking-tight sm:text-4xl [text-wrap:balance]">
              Make space for better work.
            </h2>
            <a
              href="#hero-download-form"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#252C43] px-4 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#1E2432] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#252C43]"
            >
              Get the free playbook
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-8 md:col-span-5 md:col-start-8">
            <div className="flex flex-col items-start gap-3">
              <p className="mb-2 font-mono text-xs tracking-[0.12em] text-[#657187]">EXPLORE</p>
              <a href="#workspace-hero" className={footerLinkClass}>Workspace</a>
              <a href="#inside-playbook" className={footerLinkClass}>Inside the playbook</a>
              <a href="#how-it-works" className={footerLinkClass}>How it works</a>
              <a href="#faq" className={footerLinkClass}>FAQ</a>
            </div>
            <div className="flex flex-col items-start gap-3">
              <p className="mb-2 font-mono text-xs tracking-[0.12em] text-[#657187]">MORE</p>
              {onOpenGlassStudio && (
                <a
                  href="/lumen?studio=1"
                  onClick={(event) => {
                    event.preventDefault();
                    onOpenGlassStudio();
                  }}
                  className={`${footerLinkClass} inline-flex items-center gap-1`}
                >
                  Glass Studio <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
              <a href="#workspace-hero" className={`${footerLinkClass} inline-flex items-center gap-1`}>
                Back to top <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </nav>
        </div>

        <div aria-hidden="true" className="lumen-footer-wordmark mt-20 select-none sm:mt-24">
          LUMEN
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-[#1E2432]/20 py-5 text-xs text-[#1E2432]">
          <span>© 2026 LUMEN</span>
          <span>A practical guide to working with AI.</span>
        </div>
      </div>
    </footer>
  );
};
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/FooterGlass.tsx">
<![CDATA[import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FooterGlassScene } from './FooterGlassScene';

export const FooterGlass: React.FC = () => {
  const artworkRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const artwork = artworkRef.current;
    if (!artwork) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const update = () => {
      const shouldAnimate = visible && !motionPreference.matches;
      if (!shouldAnimate) setReady(false);
      setActive(shouldAnimate);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { rootMargin: '160px' });

    observer.observe(artwork);
    motionPreference.addEventListener('change', update);
    return () => {
      observer.disconnect();
      motionPreference.removeEventListener('change', update);
    };
  }, []);

  return (
    <div
      ref={artworkRef}
      aria-hidden="true"
      data-testid="footer-glass"
      data-ready={ready}
      className="lumen-footer-glass pointer-events-none absolute -bottom-2 -right-[35%] -z-10 h-[65%] w-[160%] md:-right-[6%] md:h-[95%] md:w-[85%]"
    >
      <Image
        src="/templates/lumen/footer-glass-cutout.webp"
        alt=""
        fill
        sizes="(max-width: 767px) 160vw, 85vw"
        className={`object-contain object-right-bottom transition-opacity duration-500 ${ready ? 'opacity-0' : 'opacity-100'}`}
      />
      {active && (
        <FooterGlassScene onReadyChange={setReady} />
      )}
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/FooterGlassScene.tsx">
<![CDATA[import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createFooterParticles } from './FooterParticles';

interface FooterGlassSceneProps {
  onReadyChange: (ready: boolean) => void;
}

/** An image-derived relief mesh. Its depth is estimated from the generated artwork. */
export const FooterGlassScene: React.FC<FooterGlassSceneProps> = ({ onReadyChange }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      onReadyChange(false);
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.domElement.className = 'block h-full w-full';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-2.4, 2.4, 1, -1, 0.1, 30);
    camera.position.z = 10;
    const motion = { value: 0 };
    const particles = createFooterParticles(motion, renderer.getPixelRatio());
    scene.add(particles);
    let sculpture: THREE.Group | null = null;
    let disposed = false;
    let frameId = 0;
    let lastFrame = 0;
    let elapsed = 0;
    const pointer = { x: 0, y: 0 };
    const currentPointer = { x: 0, y: 0 };

    const resize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      const aspect = width / height;
      const viewHeight = Math.max(2, 4.8 / aspect);
      const viewWidth = viewHeight * aspect;
      renderer.setSize(width, height, false);
      camera.left = -viewWidth / 2;
      camera.right = viewWidth / 2;
      camera.top = viewHeight / 2;
      camera.bottom = -viewHeight / 2;
      camera.updateProjectionMatrix();
      const offsetX = (viewWidth - 4.8) / 2;
      const offsetY = -(viewHeight - 2) / 2;
      particles.position.set(offsetX, offsetY, 0);
      if (sculpture) sculpture.position.set(offsetX, offsetY, 0);
    };

    const disposeModel = (model: THREE.Object3D) => {
      model.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => {
          if (material instanceof THREE.MeshBasicMaterial && material.map) {
            const image = material.map.source.data;
            if (typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap) image.close();
            material.map.dispose();
          }
          material.dispose();
        });
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
      pointer.y = (event.clientY / Math.max(1, window.innerHeight) - 0.5) * 2;
    };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      onReadyChange(false);
    };
    const onContextRestored = () => {
      if (sculpture) {
        renderer.render(scene, camera);
        onReadyChange(true);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const animate = (now: number) => {
      if (disposed) return;
      frameId = requestAnimationFrame(animate);
      if (document.hidden || now - lastFrame < 33) return;
      const delta = lastFrame ? Math.min((now - lastFrame) / 1000, 0.1) : 0;
      lastFrame = now;
      elapsed += delta;
      motion.value = elapsed;
      currentPointer.x += (pointer.x - currentPointer.x) * Math.min(1, delta * 2);
      currentPointer.y += (pointer.y - currentPointer.y) * Math.min(1, delta * 2);
      if (sculpture) {
        sculpture.rotation.y = Math.sin(elapsed * 0.31) * 0.055 + currentPointer.x * 0.025;
        sculpture.rotation.x = Math.sin(elapsed * 0.23) * 0.025 + currentPointer.y * 0.015;
        renderer.render(scene, camera);
      }
    };

    new GLTFLoader().load(
      '/templates/lumen/footer-glass-mesh.glb',
      (gltf) => {
        if (disposed) {
          disposeModel(gltf.scene);
          return;
        }
        sculpture = gltf.scene;
        sculpture.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          object.geometry.computeVertexNormals();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => {
            material.depthWrite = true;
            material.alphaTest = 0.01;
            material.onBeforeCompile = (shader: THREE.WebGLProgramParametersWithUniforms) => {
              shader.uniforms.uFooterTime = motion;
              shader.vertexShader = `uniform float uFooterTime;\nvarying vec3 vFooterNormal;\n${shader.vertexShader}`.replace(
                '#include <begin_vertex>',
                `#include <begin_vertex>
                vFooterNormal = normalize(normalMatrix * normal);
                float drift = sin(position.x * 1.6 + position.y * 1.3 + uFooterTime * 0.65);
                transformed.z += drift * 0.11;
                transformed.y += sin(position.x * 1.2 - uFooterTime * 0.42) * 0.035;`
              );
              shader.fragmentShader = `uniform float uFooterTime;\nvarying vec3 vFooterNormal;\n${shader.fragmentShader}`.replace(
                '#include <map_fragment>',
                `#include <map_fragment>
                vec3 lightDirection = normalize(vec3(sin(uFooterTime * 0.24) * 0.45, 0.35, 1.0));
                float glint = pow(max(dot(normalize(vFooterNormal), lightDirection), 0.0), 12.0);
                diffuseColor.rgb += glint * 0.055;`
              );
            };
            material.needsUpdate = true;
          });
        });
        scene.add(sculpture);
        resize();
        renderer.render(scene, camera);
        onReadyChange(true);
        frameId = requestAnimationFrame(animate);
      },
      undefined,
      () => {
        if (!disposed) onReadyChange(false);
      }
    );

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);
      if (sculpture) disposeModel(sculpture);
      particles.geometry.dispose();
      particles.material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [onReadyChange]);

  return <div ref={mountRef} aria-hidden="true" data-mode="live" className="absolute inset-0" />;
};
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/FooterParticles.ts">
<![CDATA[﻿import * as THREE from 'three';

/** A small field of soft, independent light motes around the footer sculpture. */
export function createFooterParticles(time: THREE.IUniform<number>, pixelRatio: number) {
  const count = 54;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  const speeds = new Float32Array(count);
  const opacities = new Float32Array(count);
  const palette = ['#8E7CE8', '#5B8DEF', '#FFFFFF'].map((color) => new THREE.Color(color));

  // A fixed seed keeps the arrangement stable across mounts and viewport changes.
  let seed = 2026;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  for (let i = 0; i < count; i++) {
    const index = i * 3;
    positions[index] = -2.15 + random() * 4.75;
    positions[index + 1] = -0.85 + random() * 2.35;
    positions[index + 2] = 0.8 + random() * 0.5;
    const color = palette[Math.floor(random() * palette.length)];
    colors[index] = color.r;
    colors[index + 1] = color.g;
    colors[index + 2] = color.b;
    sizes[i] = 4 + random() * 7;
    phases[i] = random() * Math.PI * 2;
    speeds[i] = 0.25 + random() * 0.3;
    opacities[i] = 0.4 + random() * 0.42;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
  geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
  geometry.setAttribute('aOpacity', new THREE.BufferAttribute(opacities, 1));

  const material = new THREE.ShaderMaterial({
    uniforms: { uTime: time, uPixelRatio: { value: pixelRatio } },
    transparent: true,
    depthWrite: false,
    depthTest: false,
    vertexShader: `
      uniform float uTime;
      uniform float uPixelRatio;
      attribute vec3 aColor;
      attribute float aSize;
      attribute float aPhase;
      attribute float aSpeed;
      attribute float aOpacity;
      varying vec3 vColor;
      varying float vOpacity;

      void main() {
        float phase = uTime * aSpeed + aPhase;
        vec3 mote = position;
        mote.x += sin(phase) * 0.11;
        mote.y += cos(phase * 0.7 + aPhase) * 0.13;
        mote.z += sin(phase * 0.65) * 0.08;
        vColor = aColor;
        vOpacity = aOpacity * (0.6 + 0.4 * (0.5 + 0.5 * sin(phase * 1.25)));
        gl_Position = projectionMatrix * modelViewMatrix * vec4(mote, 1.0);
        gl_PointSize = aSize * uPixelRatio;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vOpacity;

      void main() {
        vec2 p = gl_PointCoord - vec2(0.5);
        float radius = length(p) * 2.0;
        float halo = pow(max(1.0 - radius, 0.0), 1.6);
        float core = 1.0 - smoothstep(0.0, 0.24, radius);
        float glint = exp(-abs(p.x) * 26.0 - abs(p.y) * 5.0)
                    + exp(-abs(p.y) * 26.0 - abs(p.x) * 5.0);
        float alpha = min(1.0, core * 0.7 + halo * 0.55 + glint * 0.12) * vOpacity;
        if (alpha < 0.01) discard;
        gl_FragColor = vec4(vColor, alpha);
        #include <colorspace_fragment>
      }
    `,
  });

  const particles = new THREE.Points(geometry, material);
  particles.renderOrder = 5;
  particles.frustumCulled = false;
  return particles;
}
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/GlassBackground.tsx">
<![CDATA[import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as THREE from 'three';
import {
  GlassBackgroundProps,
  GlassPresetConfig,
  GLASS_PRESETS,
  computeResponsiveFraming,
} from '../glass/glassTypes';
import {
  createStudioEnvironmentTexture,
  STUDIO_BACKDROP_VERTEX_SHADER,
  STUDIO_BACKDROP_FRAGMENT_SHADER,
  updateGlassShaderUniforms,
} from '../glass/glassShaders';
import { buildPresetSculpture, BuiltGlassScene } from '../glass/glassGeometry';

export interface GlassBackgroundHandle {
  exportStillImage: (
    format: 'image/png' | 'image/webp',
    width: number,
    height: number,
    transparent: boolean
  ) => Promise<string>;
  getCanvasElement: () => HTMLCanvasElement | null;
  resetAnimationTime: () => void;
}

const detectSoftwareGl = (): boolean => {
  try {
    const probeCanvas = document.createElement('canvas');
    const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
};

/**
 * Renders a deterministic single-frame optical glass composition to a 2D data URL
 * or static canvas for secondary sections / fallback when continuous WebGL is not needed.
 */
function drawStaticOpticalFallbackCanvas(
  canvas: HTMLCanvasElement,
  presetConfig: GlassPresetConfig
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  // 1. Studio lighting base
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#F8F9FC');
  bg.addColorStop(0.5, '#F2F5FC');
  bg.addColorStop(1, '#EDF1FA');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // 2. Subtle architectural light bands
  ctx.save();
  ctx.translate(w * 0.55, h * 0.5);
  ctx.rotate(-0.32);
  for (let x = -w; x <= w; x += 110) {
    const band = ctx.createLinearGradient(x, -h, x + 52, h);
    band.addColorStop(0, 'rgba(255,255,255,0)');
    band.addColorStop(0.5, 'rgba(255,255,255,0.68)');
    band.addColorStop(1, 'rgba(201,218,250,0.22)');
    ctx.fillStyle = band;
    ctx.fillRect(x, -h, 46, h * 2);
  }
  ctx.restore();

  // 3. Preset-specific optical glass silhouette with bevel highlights & refracted offset lines
  ctx.save();
  const cx = w * (0.52 + presetConfig.scene.positionX * 0.22);
  const cy = h * (0.5 - presetConfig.scene.positionY * 0.22);

  if (presetConfig.id === 'frosted-fold') {
    for (let i = 0; i < 3; i++) {
      ctx.save();
      ctx.translate(cx + (i - 1) * 120, cy + (i - 1) * 28);
      ctx.rotate(-0.18 + i * 0.11);
      const g = ctx.createLinearGradient(-260, -160, 260, 160);
      g.addColorStop(0, 'rgba(255, 255, 255, 0.72)');
      g.addColorStop(0.5, 'rgba(216, 208, 247, 0.34)');
      g.addColorStop(1, 'rgba(201, 218, 250, 0.42)');
      ctx.fillStyle = g;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.92)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-250, -145, 500, 290, 28);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  } else if (presetConfig.id === 'glass-strata') {
    for (let i = 0; i < 4; i++) {
      ctx.save();
      ctx.translate(cx + (i - 1.5) * 95, cy + (i - 1.5) * 24);
      ctx.rotate(-0.12 + i * 0.05);
      const g = ctx.createLinearGradient(-220, -130, 220, 130);
      g.addColorStop(0, 'rgba(255, 255, 255, 0.80)');
      g.addColorStop(0.6, 'rgba(201, 218, 250, 0.38)');
      g.addColorStop(1, 'rgba(246, 220, 202, 0.36)');
      ctx.fillStyle = g;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-210, -125, 420, 250, 24);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
  } else if (presetConfig.id === 'refractive-halo') {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-0.22);
    const ringGrad = ctx.createLinearGradient(-280, -200, 280, 200);
    ringGrad.addColorStop(0, 'rgba(255, 255, 255, 0.88)');
    ringGrad.addColorStop(0.45, 'rgba(216, 208, 247, 0.52)');
    ringGrad.addColorStop(1, 'rgba(246, 220, 202, 0.52)');
    ctx.strokeStyle = ringGrad;
    ctx.lineWidth = 64;
    ctx.beginPath();
    ctx.ellipse(0, 0, 270, 185, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, 302, 217, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  } else {
    // Caustic window / default optical louvers
    for (let i = 0; i < 4; i++) {
      ctx.save();
      ctx.translate(cx + (i - 1.5) * 140, cy);
      ctx.rotate(0.32);
      const blade = ctx.createLinearGradient(-45, -260, 45, 260);
      blade.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      blade.addColorStop(0.5, 'rgba(201, 218, 250, 0.42)');
      blade.addColorStop(1, 'rgba(255, 255, 255, 0.15)');
      ctx.fillStyle = blade;
      ctx.fillRect(-42, -260, 84, 520);
      ctx.restore();
    }
  }
  ctx.restore();
}

export const GlassBackground = forwardRef<
  GlassBackgroundHandle,
  GlassBackgroundProps & { paused?: boolean }
>(
  (
    {
      preset = 'opal-ribbon',
      configOverrides,
      speed,
      intensity,
      seed,
      interactive = true,
      quality = 'auto',
      renderMode = 'live',
      transparentExport = false,
      paused = false,
      className = '',
    },
    ref
  ) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const staticCanvasRef = useRef<HTMLCanvasElement>(null);
    const [webglFailed, setWebglFailed] = useState(false);

    // Merge preset config with any overrides or prop shortcuts
    const mergedConfig: GlassPresetConfig = useMemo(() => {
      const base = GLASS_PRESETS[preset] || GLASS_PRESETS['opal-ribbon'];
      return {
        ...base,
        material: {
          ...base.material,
          ...(configOverrides?.material || {}),
        },
        scene: {
          ...base.scene,
          ...(configOverrides?.scene || {}),
          motionSpeed: speed !== undefined ? speed : configOverrides?.scene?.motionSpeed ?? base.scene.motionSpeed,
          lightingIntensity:
            intensity !== undefined
              ? intensity
              : configOverrides?.scene?.lightingIntensity ?? base.scene.lightingIntensity,
          seed: seed !== undefined ? seed : configOverrides?.scene?.seed ?? base.scene.seed,
        },
      };
    }, [preset, configOverrides, speed, intensity, seed]);

    // Store mutable live config in a ref so slider adjustments update uniforms in real time without tearing down WebGLRenderer!
    const liveConfigRef = useRef<GlassPresetConfig>(mergedConfig);
    liveConfigRef.current = mergedConfig;

    const pausedRef = useRef<boolean>(paused);
    pausedRef.current = paused;

    const transparentRef = useRef<boolean>(transparentExport);
    transparentRef.current = transparentExport;

    const interactiveRef = useRef<boolean>(interactive);
    interactiveRef.current = interactive;


    const engineRef = useRef<{
      renderer: THREE.WebGLRenderer;
      scene: THREE.Scene;
      camera: THREE.PerspectiveCamera;
      studioTexture: THREE.CanvasTexture;
      backdropMesh: THREE.Mesh;
      backdropMat: THREE.ShaderMaterial;
      builtSculpture: BuiltGlassScene | null;
      currentPresetId: string;
      currentSeed: number;
      currentDensity: number;
      elapsedTime: number;
      renderSingleFrame: (timeSec: number, transparent: boolean) => void;
    } | null>(null);

    // Expose imperative export methods for GLASSFORM Studio
    useImperativeHandle(ref, () => ({
      getCanvasElement: () => engineRef.current?.renderer.domElement || null,
      resetAnimationTime: () => {
        if (engineRef.current) {
          engineRef.current.elapsedTime = 0;
          engineRef.current.renderSingleFrame(0, transparentRef.current);
        }
      },
      exportStillImage: async (format, width, height, transparent) => {
        const eng = engineRef.current;
        if (!eng) return '';

        const prevSize = new THREE.Vector2();
        eng.renderer.getSize(prevSize);
        const prevPixelRatio = eng.renderer.getPixelRatio();
        const prevAspect = eng.camera.aspect;

        try {
          eng.renderer.setPixelRatio(1);
          eng.renderer.setSize(width, height, false);
          eng.camera.aspect = width / Math.max(1, height);
          eng.camera.updateProjectionMatrix();

          eng.renderSingleFrame(eng.elapsedTime, transparent);
          const dataUrl = eng.renderer.domElement.toDataURL(format, 0.95);
          return dataUrl;
        } finally {
          eng.renderer.setPixelRatio(prevPixelRatio);
          eng.renderer.setSize(prevSize.x, prevSize.y, false);
          eng.camera.aspect = prevAspect;
          eng.camera.updateProjectionMatrix();
          eng.renderSingleFrame(eng.elapsedTime, transparentRef.current);
        }
      },
    }));

    // Handle static mode canvas rendering
    useEffect(() => {
      if (renderMode !== 'static' && !webglFailed) return;
      const canvas = staticCanvasRef.current;
      if (!canvas) return;
      canvas.width = 1440;
      canvas.height = 810;
      drawStaticOpticalFallbackCanvas(canvas, mergedConfig);
    }, [renderMode, webglFailed, mergedConfig]);

    // Initialize single WebGLRenderer when in live mode
    useEffect(() => {
      if (renderMode === 'static') return;
      const container = mountRef.current;
      if (!container) return;

      const isSoftwareGl = detectSoftwareGl();
      let renderer: THREE.WebGLRenderer;

      try {
        renderer = new THREE.WebGLRenderer({
          antialias: !isSoftwareGl && quality !== 'low',
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: false,
        });
      } catch {
        setWebglFailed(true);
        return;
      }

      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.06;

      const maxDpr =
        isSoftwareGl || quality === 'low' ? 1 : quality === 'medium' ? 1.25 : Math.min(window.devicePixelRatio, 1.75);
      renderer.setPixelRatio(maxDpr);

      const initialW = Math.max(320, container.clientWidth || 1280);
      const initialH = Math.max(240, container.clientHeight || 720);
      renderer.setSize(initialW, initialH, false);
      renderer.domElement.className = 'h-full w-full block pointer-events-none';

      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, initialW / initialH, 0.1, 50);
      camera.position.set(0, 0, 5.2);

      // Studio environment texture for refraction & backdrop
      const studioTexture = createStudioEnvironmentTexture(renderer);

      // Backdrop full-screen quad
      const backdropGeo = new THREE.PlaneGeometry(2, 2);
      const backdropMat = new THREE.ShaderMaterial({
        uniforms: {
          uStudioMap: { value: studioTexture },
          uLightingIntensity: { value: liveConfigRef.current.scene.lightingIntensity },
          uCausticIntensity: { value: liveConfigRef.current.material.causticIntensity },
          uLoopPhase: { value: 0 },
          uPointer: { value: new THREE.Vector2(0, 0) },
        },
        vertexShader: STUDIO_BACKDROP_VERTEX_SHADER,
        fragmentShader: STUDIO_BACKDROP_FRAGMENT_SHADER,
        depthWrite: false,
        depthTest: false,
      });
      const backdropMesh = new THREE.Mesh(backdropGeo, backdropMat);
      backdropMesh.renderOrder = -10;
      backdropMesh.frustumCulled = false;
      scene.add(backdropMesh);

      const cfg0 = liveConfigRef.current;
      const initialSculpture = buildPresetSculpture(
        cfg0.id,
        studioTexture,
        cfg0.material,
        cfg0.scene,
        transparentRef.current,
        isSoftwareGl
      );
      scene.add(initialSculpture.group);

      const targetPointer = { x: 0, y: 0 };
      const currentPointer = { x: 0, y: 0 };

      const renderSingleFrame = (timeSec: number, transparent: boolean) => {
        const cfg = liveConfigRef.current;
        const loopDur = Math.max(4, cfg.scene.loopDurationSec || 12);
        const loopPhase = ((timeSec * cfg.scene.motionSpeed) / loopDur) * Math.PI * 2;

        // Toggle studio backdrop visibility for transparent PNG/WebP exports
        backdropMesh.visible = !transparent;
        if (transparent) {
          renderer.setClearColor(0x000000, 0);
        } else {
          renderer.setClearColor(0xf8f9fc, 1);
        }

        backdropMat.uniforms.uLightingIntensity.value = cfg.scene.lightingIntensity;
        backdropMat.uniforms.uCausticIntensity.value = cfg.material.causticIntensity;
        backdropMat.uniforms.uLoopPhase.value = loopPhase;
        backdropMat.uniforms.uPointer.value.set(currentPointer.x, currentPointer.y);

        const activeSculpture = engineRef.current?.builtSculpture;
        if (activeSculpture) {
          const w = renderer.domElement.clientWidth || initialW;
          const h = renderer.domElement.clientHeight || initialH;
          const framing = computeResponsiveFraming(
            w,
            h,
            cfg.scene.positionX,
            cfg.scene.positionY,
            cfg.scene.scale
          );

          camera.position.z = framing.cameraZ;
          activeSculpture.group.position.set(framing.offsetX, framing.offsetY, 0);
          activeSculpture.group.scale.setScalar(framing.effectiveScale);

          activeSculpture.animate(loopPhase, currentPointer.x, currentPointer.y);

          for (const mat of activeSculpture.materials) {
            updateGlassShaderUniforms(
              mat,
              cfg.material,
              cfg.scene,
              loopPhase,
              currentPointer.x,
              currentPointer.y,
              transparent
            );
          }
        }

        renderer.render(scene, camera);
      };

      engineRef.current = {
        renderer,
        scene,
        camera,
        studioTexture,
        backdropMesh,
        backdropMat,
        builtSculpture: initialSculpture,
        currentPresetId: cfg0.id,
        currentSeed: cfg0.scene.seed,
        currentDensity: cfg0.scene.shapeDensity,
        elapsedTime: 0,
        renderSingleFrame,
      };

      // Pointer listener (non-blocking on window)
      const handlePointerMove = (e: PointerEvent) => {
        if (!interactiveRef.current) return;
        const nx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
        const ny = -((e.clientY / Math.max(1, window.innerHeight)) * 2 - 1);
        targetPointer.x = Math.max(-1, Math.min(1, nx));
        targetPointer.y = Math.max(-1, Math.min(1, ny));
      };
      window.addEventListener('pointermove', handlePointerMove, { passive: true });

      // Resize observer
      const handleResize = () => {
        if (!container || !engineRef.current) return;
        const w = Math.max(300, container.clientWidth);
        const h = Math.max(200, container.clientHeight);
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderSingleFrame(engineRef.current.elapsedTime, transparentRef.current);
      };
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);

      // IntersectionObserver to suspend loop when offscreen
      let isVisible = true;
      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry) {
            isVisible = entry.isIntersecting;
          }
        },
        { threshold: 0.02 }
      );
      intersectionObserver.observe(container);

      // WebGL context loss/restore listeners
      const handleContextLost = (e: Event) => {
        e.preventDefault();
      };
      const handleContextRestored = () => {
        if (engineRef.current) {
          renderSingleFrame(engineRef.current.elapsedTime, transparentRef.current);
        }
      };
      renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);

      // Paced animation loop (uses afterDraw on software WebGL per threejs skill)
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      let frameId = 0;
      let timerId = 0;
      let disposed = false;
      let lastTimeMs = performance.now();

      function afterDraw(cb: () => void) {
        const gl = renderer.getContext() as WebGL2RenderingContext;
        if (!gl || typeof gl.fenceSync !== 'function') {
          timerId = window.setTimeout(cb, 80);
          return;
        }
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (disposed) return;
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            timerId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            timerId = window.setTimeout(cb, 80);
          }
        };
        timerId = window.setTimeout(poll, 5);
      }

      // Draw initial frame immediately
      renderSingleFrame(0, transparentRef.current);

      function tick() {
        if (disposed) return;
        const nowMs = performance.now();
        const dtSec = Math.min(0.1, (nowMs - lastTimeMs) / 1000);
        lastTimeMs = nowMs;

        const eng = engineRef.current;
        if (eng && isVisible && !pausedRef.current && !prefersReducedMotion) {
          eng.elapsedTime += dtSec;
          currentPointer.x += (targetPointer.x - currentPointer.x) * Math.min(1, dtSec * 4.5);
          currentPointer.y += (targetPointer.y - currentPointer.y) * Math.min(1, dtSec * 4.5);
          eng.renderSingleFrame(eng.elapsedTime, transparentRef.current);
        }

        if (isSoftwareGl) {
          afterDraw(tick);
        } else {
          frameId = requestAnimationFrame(tick);
        }
      }

      if (!prefersReducedMotion) {
        if (isSoftwareGl) {
          afterDraw(tick);
        } else {
          frameId = requestAnimationFrame(tick);
        }
      }

      return () => {
        disposed = true;
        cancelAnimationFrame(frameId);
        clearTimeout(timerId);
        window.removeEventListener('pointermove', handlePointerMove);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
        renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);

        if (engineRef.current?.builtSculpture) {
          engineRef.current.builtSculpture.dispose();
        }
        backdropGeo.dispose();
        backdropMat.dispose();
        studioTexture.dispose();
        renderer.dispose();
        engineRef.current = null;
      };
    }, [renderMode, quality]);

    // Rebuild sculpture geometry ONLY when preset ID, seed, or shapeDensity changes;
    // for all material sliders, update uniforms directly in place!
    useEffect(() => {
      const eng = engineRef.current;
      if (!eng) return;

      const needsGeometryRebuild =
        eng.currentPresetId !== mergedConfig.id ||
        eng.currentSeed !== mergedConfig.scene.seed ||
        eng.currentDensity !== mergedConfig.scene.shapeDensity;

      if (needsGeometryRebuild) {
        if (eng.builtSculpture) {
          eng.scene.remove(eng.builtSculpture.group);
          eng.builtSculpture.dispose();
        }
        const isSoftwareGl = detectSoftwareGl();
        const nextSculpture = buildPresetSculpture(
          mergedConfig.id,
          eng.studioTexture,
          mergedConfig.material,
          mergedConfig.scene,
          transparentExport,
          isSoftwareGl
        );
        eng.scene.add(nextSculpture.group);
        eng.builtSculpture = nextSculpture;
        eng.currentPresetId = mergedConfig.id;
        eng.currentSeed = mergedConfig.scene.seed;
        eng.currentDensity = mergedConfig.scene.shapeDensity;
      }

      eng.renderSingleFrame(eng.elapsedTime, transparentExport);
    }, [mergedConfig, transparentExport]);

    if (renderMode === 'static' || webglFailed) {
      return (
        <div
          aria-hidden="true"
          data-preset={mergedConfig.id}
          data-mode="static"
          className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        >
          <canvas
            ref={staticCanvasRef}
            className="h-full w-full object-cover opacity-90"
          />
        </div>
      );
    }

    return (
      <div
        ref={mountRef}
        aria-hidden="true"
        data-testid="glassform-webgl-stage"
        data-preset={mergedConfig.id}
        data-mode="live"
        className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      />
    );
  }
);

GlassBackground.displayName = 'GlassBackground';
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/GlassStudio.tsx">
<![CDATA[import React, { useRef, useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Download,
  Copy,
  Check,
  Sparkles,
  Sliders,
  Layers,
  Code2,
  ArrowLeft,
  Eye,
  Film,
  Shuffle,
} from 'lucide-react';
import {
  GlassPresetId,
  GlassPresetConfig,
  GlassTreatment,
  ExportAspectRatio,
  GLASS_PRESETS,
  GLASS_PRESET_LIST,
  GLASS_TREATMENT_DEFAULTS,
  EXPORT_ASPECT_RATIOS,
  EXPORT_RESOLUTIONS,
  computeExportDimensions,
  serializePresetConfig,
  generateReactComponentSnippet,
} from '../glass/glassTypes';
import { GlassBackground, GlassBackgroundHandle } from './GlassBackground';

interface GlassStudioProps {
  activeHeroPreset: GlassPresetId;
  onApplyPresetToHero: (presetId: GlassPresetId, customConfig: GlassPresetConfig) => void;
  onCloseStudio: () => void;
}

export const GlassStudio: React.FC<GlassStudioProps> = ({
  activeHeroPreset,
  onApplyPresetToHero,
  onCloseStudio,
}) => {
  const glassRef = useRef<GlassBackgroundHandle>(null);

  const [selectedPresetId, setSelectedPresetId] = useState<GlassPresetId>(activeHeroPreset);
  const [config, setConfig] = useState<GlassPresetConfig>(() => ({
    ...GLASS_PRESETS[activeHeroPreset],
    material: { ...GLASS_PRESETS[activeHeroPreset].material },
    scene: { ...GLASS_PRESETS[activeHeroPreset].scene },
  }));

  const [aspectRatio, setAspectRatio] = useState<ExportAspectRatio>('16:9');
  const [resolutionId, setResolutionId] = useState<string>('1080p');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showSafeArea, setShowSafeArea] = useState<boolean>(false);
  const [transparentMode, setTransparentMode] = useState<boolean>(false);
  const [rightTab, setRightTab] = useState<'material' | 'scene' | 'export'>('material');

  const [copiedCode, setCopiedCode] = useState<'jsx' | 'json' | null>(null);
  const [exportStatus, setExportStatus] = useState<string | null>(null);
  const [isRecordingWebm, setIsRecordingWebm] = useState<boolean>(false);

  const selectPreset = (id: GlassPresetId) => {
    setSelectedPresetId(id);
    const base = GLASS_PRESETS[id];
    setConfig({
      ...base,
      material: { ...base.material },
      scene: { ...base.scene },
    });
    setExportStatus(null);
  };

  const applyGlassTreatment = (treatment: GlassTreatment) => {
    const defaults = GLASS_TREATMENT_DEFAULTS[treatment];
    setConfig((prev) => ({
      ...prev,
      material: {
        ...prev.material,
        ...defaults,
        glassType: treatment,
      },
    }));
  };

  const updateMaterialParam = <K extends keyof GlassPresetConfig['material']>(
    key: K,
    value: GlassPresetConfig['material'][K]
  ) => {
    setConfig((prev) => ({
      ...prev,
      material: {
        ...prev.material,
        [key]: value,
      },
    }));
  };

  const updateSceneParam = <K extends keyof GlassPresetConfig['scene']>(
    key: K,
    value: GlassPresetConfig['scene'][K]
  ) => {
    setConfig((prev) => ({
      ...prev,
      scene: {
        ...prev.scene,
        [key]: value,
      },
    }));
  };

  const handleExportStill = async (format: 'image/png' | 'image/webp') => {
    if (!glassRef.current) return;
    const resObj =
      EXPORT_RESOLUTIONS.find((r) => r.id === resolutionId) || EXPORT_RESOLUTIONS[0];
    const dims = computeExportDimensions(resObj, aspectRatio);

    setExportStatus(
      `Rendering ${dims.width}×${dims.height} ${format === 'image/png' ? 'PNG' : 'WebP'}...`
    );

    const dataUrl = await glassRef.current.exportStillImage(
      format,
      dims.width,
      dims.height,
      transparentMode
    );

    if (!dataUrl) {
      setExportStatus('Unable to capture WebGL frame on this device.');
      return;
    }

    const ext = format === 'image/png' ? 'png' : 'webp';
    const filename = `glassform-${config.id}-${dims.width}x${dims.height}${
      transparentMode ? '-alpha' : ''
    }.${ext}`;

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setExportStatus(`Exported ${filename} (${dims.width}×${dims.height})`);
  };

  const handleExportWebM = () => {
    const canvas = glassRef.current?.getCanvasElement();
    if (!canvas || typeof canvas.captureStream !== 'function' || typeof MediaRecorder === 'undefined') {
      setExportStatus('WebM video recording is not supported in this browser environment.');
      return;
    }

    try {
      setIsRecordingWebm(true);
      setExportStatus('Recording 4-second looping WebM clip...');
      const stream = canvas.captureStream(30);
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm';
      const recorder = new MediaRecorder(stream, { mimeType });
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `glassform-${config.id}-loop.webm`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIsRecordingWebm(false);
        setExportStatus(`Exported glassform-${config.id}-loop.webm`);
      };

      recorder.start();
      window.setTimeout(() => {
        if (recorder.state === 'recording') {
          recorder.stop();
        }
      }, 4000);
    } catch {
      setIsRecordingWebm(false);
      setExportStatus('WebM encoding unavailable on this graphics context.');
    }
  };

  const handleCopySnippet = (kind: 'jsx' | 'json') => {
    const text =
      kind === 'jsx' ? generateReactComponentSnippet(config) : serializePresetConfig(config);
    navigator.clipboard?.writeText(text);
    setCopiedCode(kind);
    window.setTimeout(() => setCopiedCode(null), 2000);
  };

  const getPreviewContainerAspectClass = () => {
    switch (aspectRatio) {
      case '21:9':
        return 'aspect-[21/9] max-h-[520px]';
      case '4:5':
        return 'aspect-[4/5] max-h-[560px]';
      case '1:1':
        return 'aspect-square max-h-[540px]';
      case '9:16':
        return 'aspect-[9/16] max-h-[580px]';
      default:
        return 'aspect-video max-h-[560px]';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F0F3FA] text-[#1E2432]">
      {/* Top Studio Header Bar */}
      <header className="sticky top-0 z-40 border-b border-white/85 bg-[#F8F9FC]/95 px-6 py-3.5">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onCloseStudio}
              className="inline-flex items-center gap-1.5 rounded-xl border border-[#1E2432]/15 bg-white px-3.5 py-2 text-xs font-semibold text-[#1E2432] hover:bg-[#F8F9FC] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Back to LUMEN Page</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold tracking-[0.18em] text-[#1E2432]">
                GLASSFORM
              </span>
              <span aria-hidden="true" className="text-[#657187]">·</span>
              <span className="font-mono text-xs text-[#657187]">
                PROCEDURAL WEBGL2 OPTICAL STUDIO
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                onApplyPresetToHero(selectedPresetId, config);
                onCloseStudio();
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#252C43] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1E2432] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Apply to LUMEN Hero</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main 3-Column Studio Workspace */}
      <main className="mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 gap-6 p-6 lg:grid-cols-12">
        {/* LEFT COLUMN (3 cols): 6 Distinct Presets Library */}
        <aside
          aria-label="Optical Glass Preset Library"
          className="lg:col-span-3 flex flex-col gap-3"
        >
          <div className="rounded-2xl border border-white/90 bg-white/85 p-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-[#1E2432]/10 pb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1E2432]">
                Preset Library (06)
              </h2>
              <span className="font-mono text-[11px] text-[#657187]">WEBGL2</span>
            </div>

            <div className="mt-3 space-y-2">
              {GLASS_PRESET_LIST.map((preset) => {
                const isSelected = preset.id === selectedPresetId;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => selectPreset(preset.id)}
                    aria-pressed={isSelected}
                    className={`w-full rounded-xl p-3 text-left transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#252C43] text-white border-[#252C43] shadow-sm'
                        : 'bg-[#F8F9FC] text-[#1E2432] border-white hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold">{preset.name}</span>
                      <span
                        className={`font-mono text-[10px] uppercase ${
                          isSelected ? 'text-[#C9DAFA]' : 'text-[#657187]'
                        }`}
                      >
                        {preset.material.glassType}
                      </span>
                    </div>
                    <p
                      className={`mt-1 text-[11px] line-clamp-2 ${
                        isSelected ? 'text-white/80' : 'text-[#657187]'
                      }`}
                    >
                      {preset.subtitle} · {preset.recommendedSection}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* CENTER COLUMN (5 cols): Live WebGL Canvas Preview & Viewport Toolbar */}
        <section
          aria-label="Live WebGL Glass Viewport"
          className="lg:col-span-5 flex flex-col gap-4"
        >
          {/* Viewport Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/90 bg-white/85 px-4 py-2.5 shadow-xs">
            {/* Aspect Ratio Selector */}
            <div className="flex items-center gap-1" role="group" aria-label="Aspect Ratio">
              {EXPORT_ASPECT_RATIOS.map((ar) => (
                <button
                  key={ar.id}
                  type="button"
                  aria-pressed={aspectRatio === ar.id}
                  onClick={() => setAspectRatio(ar.id)}
                  className={`rounded-lg px-2.5 py-1 font-mono text-xs font-medium transition-colors cursor-pointer ${
                    aspectRatio === ar.id
                      ? 'bg-[#252C43] text-white'
                      : 'text-[#657187] hover:text-[#1E2432] hover:bg-[#F0F3FA]'
                  }`}
                >
                  {ar.id}
                </button>
              ))}
            </div>

            {/* Playback & Overlay Controls */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-pressed={isPaused}
                onClick={() => setIsPaused((prev) => !prev)}
                className="inline-flex items-center gap-1 rounded-lg border border-[#1E2432]/15 bg-[#F8F9FC] px-2.5 py-1.5 text-xs font-medium text-[#1E2432] hover:bg-white cursor-pointer"
              >
                {isPaused ? (
                  <>
                    <Play className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Play</span>
                  </>
                ) : (
                  <>
                    <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Pause</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => glassRef.current?.resetAnimationTime()}
                aria-label="Reset animation loop"
                className="inline-flex items-center gap-1 rounded-lg border border-[#1E2432]/15 bg-[#F8F9FC] px-2.5 py-1.5 text-xs font-medium text-[#1E2432] hover:bg-white cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reset</span>
              </button>

              <button
                type="button"
                aria-pressed={showSafeArea}
                onClick={() => setShowSafeArea((prev) => !prev)}
                className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium cursor-pointer ${
                  showSafeArea
                    ? 'border-[#252C43] bg-[#252C43] text-white'
                    : 'border-[#1E2432]/15 bg-[#F8F9FC] text-[#1E2432] hover:bg-white'
                }`}
              >
                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Safe Area</span>
              </button>
            </div>
          </div>

          {/* Live WebGL Stage Container */}
          <div className="flex flex-1 items-center justify-center rounded-3xl border border-white/95 bg-[#E6ECF8]/60 p-4 shadow-inner">
            <div
              className={`relative w-full overflow-hidden rounded-2xl border border-white shadow-lg ${getPreviewContainerAspectClass()}`}
            >
              <GlassBackground
                ref={glassRef}
                preset={selectedPresetId}
                configOverrides={{
                  material: config.material,
                  scene: config.scene,
                }}
                paused={isPaused}
                transparentExport={transparentMode}
                interactive
                quality="high"
                renderMode="live"
              />

              {/* Optional Safe-Area Overlay for Marketing Text Legibility */}
              {showSafeArea && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-6 rounded-xl border border-dashed border-[#1E2432]/35 p-6 flex flex-col justify-between"
                >
                  <div className="max-w-xs rounded-xl bg-white/75 p-4">
                    <div className="font-mono text-[10px] font-semibold text-[#657187]">
                      SAFE AREA OVERLAY · HERO COPY ZONE
                    </div>
                    <div className="mt-1 text-lg font-bold text-[#1E2432]">
                      Make repetitive work a thing of the past.
                    </div>
                    <div className="mt-1 text-xs text-[#657187]">
                      Verify contrast and optical calm behind headline and email capture form.
                    </div>
                  </div>
                  <div className="flex justify-between font-mono text-[10px] text-[#1E2432]/70">
                    <span>LEFT: TYPOGRAPHY ZONE</span>
                    <span>RIGHT: PRIMARY GLASS SCULPTURE</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preset Description Footer */}
          <div className="rounded-2xl border border-white/90 bg-white/85 p-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#1E2432]">{config.name}</span>
              <span className="font-mono text-[#657187]">
                SEED: {config.scene.seed} · LOOP: {config.scene.loopDurationSec}S
              </span>
            </div>
            <p className="mt-1 text-[#657187] leading-relaxed">{config.description}</p>
          </div>
        </section>

        {/* RIGHT COLUMN (4 cols): Real-Time Material Controls, Scene Controls & Asset Export */}
        <aside
          aria-label="Material Controls and Asset Export"
          className="lg:col-span-4 flex flex-col rounded-2xl border border-white/90 bg-white/90 p-5 shadow-xs"
        >
          {/* Right Column Mode Tabs */}
          <div
            role="tablist"
            aria-label="Studio Inspector Tabs"
            className="grid grid-cols-3 gap-1 rounded-xl bg-[#F0F3FA] p-1"
          >
            <button
              role="tab"
              type="button"
              aria-selected={rightTab === 'material'}
              onClick={() => setRightTab('material')}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all cursor-pointer ${
                rightTab === 'material'
                  ? 'bg-white text-[#1E2432] shadow-xs'
                  : 'text-[#657187] hover:text-[#1E2432]'
              }`}
            >
              <Sliders className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Optical</span>
            </button>
            <button
              role="tab"
              type="button"
              aria-selected={rightTab === 'scene'}
              onClick={() => setRightTab('scene')}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all cursor-pointer ${
                rightTab === 'scene'
                  ? 'bg-white text-[#1E2432] shadow-xs'
                  : 'text-[#657187] hover:text-[#1E2432]'
              }`}
            >
              <Layers className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Geometry</span>
            </button>
            <button
              role="tab"
              type="button"
              aria-selected={rightTab === 'export'}
              onClick={() => setRightTab('export')}
              className={`flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold transition-all cursor-pointer ${
                rightTab === 'export'
                  ? 'bg-white text-[#1E2432] shadow-xs'
                  : 'text-[#657187] hover:text-[#1E2432]'
              }`}
            >
              <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Export</span>
            </button>
          </div>

          {/* TAB 1: OPTICAL MATERIAL PARAMETERS */}
          {rightTab === 'material' && (
            <div className="mt-4 space-y-4 overflow-y-auto pr-1 max-h-[600px]">
              {/* 3 Glass Treatments: Clear, Frosted, Opal */}
              <div>
                <span className="block font-mono text-[11px] font-semibold uppercase text-[#657187]">
                  Glass Material Treatment
                </span>
                <div className="mt-1.5 grid grid-cols-3 gap-1.5">
                  {(['clear', 'frosted', 'opal'] as GlassTreatment[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={config.material.glassType === t}
                      onClick={() => applyGlassTreatment(t)}
                      className={`rounded-lg py-2 text-xs font-semibold capitalize border transition-all cursor-pointer ${
                        config.material.glassType === t
                          ? 'bg-[#252C43] text-white border-[#252C43]'
                          : 'bg-[#F8F9FC] text-[#1E2432] border-[#1E2432]/10 hover:bg-white'
                      }`}
                    >
                      {t} Glass
                    </button>
                  ))}
                </div>
              </div>

              {/* 12 Optical Sliders */}
              {(
                [
                  { key: 'ior', label: 'Index of Refraction (IOR)', min: 1.1, max: 2.3, step: 0.02 },
                  { key: 'thickness', label: 'Material Thickness', min: 0.2, max: 2.8, step: 0.05 },
                  { key: 'refractionStrength', label: 'Refraction Strength', min: 0.0, max: 1.5, step: 0.05 },
                  { key: 'roughness', label: 'Surface Roughness', min: 0.0, max: 1.0, step: 0.02 },
                  { key: 'frosting', label: 'Frosting Diffusion', min: 0.0, max: 1.0, step: 0.02 },
                  { key: 'dispersion', label: 'Chromatic Dispersion', min: 0.0, max: 1.0, step: 0.02 },
                  { key: 'iridescence', label: 'Opal Iridescence', min: 0.0, max: 1.0, step: 0.02 },
                  { key: 'causticIntensity', label: 'Caustic Highlights', min: 0.0, max: 1.5, step: 0.05 },
                  { key: 'fresnelIntensity', label: 'Fresnel Reflectance', min: 0.2, max: 2.0, step: 0.05 },
                  { key: 'edgeHighlight', label: 'Bevel Edge Highlight', min: 0.2, max: 2.0, step: 0.05 },
                  { key: 'transmission', label: 'Internal Transmission', min: 0.3, max: 1.0, step: 0.02 },
                  { key: 'microtexture', label: 'Microtexture Grain', min: 0.0, max: 1.0, step: 0.02 },
                ] as {
                  key: keyof GlassPresetConfig['material'];
                  label: string;
                  min: number;
                  max: number;
                  step: number;
                }[]
              ).map((slider) => {
                const val = Number(config.material[slider.key]);
                return (
                  <div key={slider.key}>
                    <div className="flex items-center justify-between text-xs">
                      <label htmlFor={`slider-${slider.key}`} className="font-medium text-[#1E2432]">
                        {slider.label}
                      </label>
                      <span className="font-mono text-[11px] text-[#657187]">
                        {val.toFixed(2)}
                      </span>
                    </div>
                    <input
                      id={`slider-${slider.key}`}
                      type="range"
                      min={slider.min}
                      max={slider.max}
                      step={slider.step}
                      value={val}
                      onChange={(e) =>
                        updateMaterialParam(slider.key, parseFloat(e.target.value))
                      }
                      className="mt-1 w-full accent-[#252C43] cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB 2: SCENE, MOTION & SEED PARAMETERS */}
          {rightTab === 'scene' && (
            <div className="mt-4 space-y-4 overflow-y-auto pr-1 max-h-[600px]">
              {(
                [
                  { key: 'lightingIntensity', label: 'Studio Lighting Intensity', min: 0.5, max: 1.8, step: 0.05 },
                  { key: 'motionSpeed', label: 'Sculpture Motion Speed', min: 0.0, max: 2.0, step: 0.05 },
                  { key: 'distortionStrength', label: 'Wave Deformation', min: 0.0, max: 1.2, step: 0.05 },
                  { key: 'shapeDensity', label: 'Sculptural Layer Density', min: 1, max: 5, step: 1 },
                  { key: 'scale', label: 'Sculpture Scale', min: 0.6, max: 1.5, step: 0.05 },
                  { key: 'positionX', label: 'Horizontal Offset (X)', min: -0.8, max: 0.8, step: 0.04 },
                  { key: 'positionY', label: 'Vertical Offset (Y)', min: -0.6, max: 0.6, step: 0.04 },
                ] as {
                  key: keyof GlassPresetConfig['scene'];
                  label: string;
                  min: number;
                  max: number;
                  step: number;
                }[]
              ).map((slider) => {
                const val = Number(config.scene[slider.key]);
                return (
                  <div key={slider.key}>
                    <div className="flex items-center justify-between text-xs">
                      <label htmlFor={`scene-${slider.key}`} className="font-medium text-[#1E2432]">
                        {slider.label}
                      </label>
                      <span className="font-mono text-[11px] text-[#657187]">
                        {slider.step === 1 ? val : val.toFixed(2)}
                      </span>
                    </div>
                    <input
                      id={`scene-${slider.key}`}
                      type="range"
                      min={slider.min}
                      max={slider.max}
                      step={slider.step}
                      value={val}
                      onChange={(e) =>
                        updateSceneParam(slider.key, parseFloat(e.target.value))
                      }
                      className="mt-1 w-full accent-[#252C43] cursor-pointer"
                    />
                  </div>
                );
              })}

              {/* Deterministic Seed Input */}
              <div className="pt-2 border-t border-[#1E2432]/10">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor="scene-seed-input" className="font-semibold text-[#1E2432]">
                    Deterministic Seed
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      updateSceneParam('seed', Math.floor(1000 + Math.random() * 8999))
                    }
                    className="inline-flex items-center gap-1 font-mono text-[11px] font-medium text-[#252C43] hover:underline cursor-pointer"
                  >
                    <Shuffle className="h-3 w-3" aria-hidden="true" />
                    <span>Randomize</span>
                  </button>
                </div>
                <input
                  id="scene-seed-input"
                  type="number"
                  value={config.scene.seed}
                  onChange={(e) =>
                    updateSceneParam('seed', parseInt(e.target.value || '1042', 10))
                  }
                  className="mt-1.5 w-full rounded-xl border border-[#1E2432]/15 bg-[#F8F9FC] px-3 py-2 font-mono text-xs text-[#1E2432]"
                />
              </div>

              <button
                type="button"
                onClick={() => selectPreset(selectedPresetId)}
                className="w-full rounded-xl border border-[#1E2432]/15 bg-[#F8F9FC] py-2.5 text-xs font-semibold text-[#1E2432] hover:bg-white cursor-pointer"
              >
                Reset Preset Defaults
              </button>
            </div>
          )}

          {/* TAB 3: ASSET EXPORT & REACT CODE */}
          {rightTab === 'export' && (
            <div className="mt-4 space-y-4 overflow-y-auto pr-1 max-h-[600px]">
              {/* Target Resolution Selector */}
              <div>
                <label
                  htmlFor="export-resolution-select"
                  className="block font-mono text-[11px] font-semibold uppercase text-[#657187]"
                >
                  Target Export Resolution
                </label>
                <select
                  id="export-resolution-select"
                  value={resolutionId}
                  onChange={(e) => setResolutionId(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#1E2432]/15 bg-[#F8F9FC] px-3 py-2.5 text-xs font-medium text-[#1E2432]"
                >
                  {EXPORT_RESOLUTIONS.map((res) => (
                    <option key={res.id} value={res.id}>
                      {res.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Opaque vs Transparent Export Toggle */}
              <div className="rounded-xl border border-[#1E2432]/10 bg-[#F8F9FC] p-3">
                <label className="flex items-center justify-between gap-2 text-xs font-semibold text-[#1E2432] cursor-pointer">
                  <span>Export with Alpha Transparency</span>
                  <input
                    type="checkbox"
                    checked={transparentMode}
                    onChange={(e) => setTransparentMode(e.target.checked)}
                    className="h-4 w-4 accent-[#252C43]"
                  />
                </label>
                <p className="mt-1 text-[11px] text-[#657187] leading-relaxed">
                  {transparentMode
                    ? 'Transparent export isolates the glass geometry, Fresnel bevel highlights, and caustics into an alpha PNG/WebP overlay.'
                    : 'Opaque export bakes in the full refracted photography studio environment behind the glass.'}
                </p>
              </div>

              {/* Still Image Export Buttons (PNG & WebP) */}
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => handleExportStill('image/png')}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#252C43] px-3.5 py-2.5 text-xs font-semibold text-white hover:bg-[#1E2432] cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Export PNG</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleExportStill('image/webp')}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#252C43]/25 bg-white px-3.5 py-2.5 text-xs font-semibold text-[#1E2432] hover:bg-[#F8F9FC] cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Export WebP</span>
                </button>
              </div>

              {/* Looping WebM Video Export */}
              <button
                type="button"
                disabled={isRecordingWebm}
                onClick={handleExportWebM}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-[#1E2432]/15 bg-[#F8F9FC] px-4 py-2.5 text-xs font-semibold text-[#1E2432] hover:bg-white disabled:opacity-60 cursor-pointer"
              >
                <Film className="h-3.5 w-3.5" aria-hidden="true" />
                <span>
                  {isRecordingWebm ? 'Recording 4s WebM Loop...' : 'Record 4s Looping WebM'}
                </span>
              </button>

              {exportStatus && (
                <div
                  role="status"
                  className="rounded-xl bg-[#5BA59A]/15 px-3 py-2 font-mono text-[11px] font-medium text-[#1E2432]"
                >
                  {exportStatus}
                </div>
              )}

              {/* Live React Component Snippet */}
              <div className="pt-2 border-t border-[#1E2432]/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1E2432]">React Component Usage</span>
                  <button
                    type="button"
                    onClick={() => handleCopySnippet('jsx')}
                    className="inline-flex items-center gap-1 font-mono text-[11px] text-[#252C43] hover:underline cursor-pointer"
                  >
                    {copiedCode === 'jsx' ? (
                      <>
                        <Check className="h-3 w-3 text-[#5BA59A]" aria-hidden="true" />
                        <span>Copied JSX</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" aria-hidden="true" />
                        <span>Copy JSX</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="mt-1.5 overflow-x-auto rounded-xl bg-[#1E2432] p-3 font-mono text-[11px] text-[#F8F9FC]">
                  {generateReactComponentSnippet(config)}
                </pre>
              </div>

              {/* Serialized Preset JSON */}
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1E2432]">Preset Configuration JSON</span>
                  <button
                    type="button"
                    onClick={() => handleCopySnippet('json')}
                    className="inline-flex items-center gap-1 font-mono text-[11px] text-[#252C43] hover:underline cursor-pointer"
                  >
                    {copiedCode === 'json' ? (
                      <>
                        <Check className="h-3 w-3 text-[#5BA59A]" aria-hidden="true" />
                        <span>Copied JSON</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" aria-hidden="true" />
                        <span>Copy JSON</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/GlassWorkspace.tsx">
<![CDATA[import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import {
  Mail,
  FileText,
  CheckSquare,
  Mic,
  Cpu,
  ArrowRight,
  CheckCircle2,
  Play,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import {
  WorkspaceStageId,
  ProcessingSubStep,
  WORKSPACE_SCENARIOS,
  getStageCaption,
} from '../utils/workflowLogic';

export const GlassWorkspace: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tiltPlaneRef = useRef<HTMLDivElement>(null);
  const inputPanelRef = useRef<HTMLDivElement>(null);
  const processingPanelRef = useRef<HTMLDivElement>(null);
  const outputPanelRef = useRef<HTMLDivElement>(null);
  const connector1Ref = useRef<SVGPathElement>(null);
  const connector2Ref = useRef<SVGPathElement>(null);

  const [selectedStage, setSelectedStage] = useState<WorkspaceStageId | null>(null);
  const [hoveredStage, setHoveredStage] = useState<WorkspaceStageId | null>(null);
  const [activeScenarioId, setActiveScenarioId] = useState<string>('emails');
  const [activeSubStep, setActiveSubStep] = useState<ProcessingSubStep>('classify');
  const [isDemoPlaying, setIsDemoPlaying] = useState<boolean>(false);
  const [artworkFallback, setArtworkFallback] = useState<boolean>(false);

  const effectiveStage = hoveredStage ?? selectedStage;
  const currentScenario =
    WORKSPACE_SCENARIOS.find((s) => s.id === activeScenarioId) || WORKSPACE_SCENARIOS[0];

  // Opening GSAP Choreography (Phases C, D, E, F)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setActiveSubStep('route');
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          setIsDemoPlaying(false);
        },
      });

      setIsDemoPlaying(true);

      // Phase C: Glass panels assemble from shallow depth
      tl.fromTo(
        inputPanelRef.current,
        { opacity: 0, y: 24, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.65 },
        0.15
      )
        .fromTo(
          processingPanelRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75 },
          0.32
        )
        .fromTo(
          outputPanelRef.current,
          { opacity: 0, y: 26, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.65 },
          0.5
        );

      // Phase D: SVG connectors draw themselves
      if (connector1Ref.current && connector2Ref.current) {
        tl.fromTo(
          [connector1Ref.current, connector2Ref.current],
          { strokeDashoffset: 320, opacity: 0.2 },
          { strokeDashoffset: 0, opacity: 1, duration: 0.75, stagger: 0.2 },
          0.65
        );
      }

      // Phase E: Deterministic Processing Demonstration (Classify -> Summarize -> Route)
      tl.call(() => setActiveSubStep('classify'), [], 1.1)
        .call(() => setActiveSubStep('summarize'), [], 1.75)
        .call(() => setActiveSubStep('route'), [], 2.4);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const triggerManualDemoWalkthrough = () => {
    if (isDemoPlaying) return;
    setIsDemoPlaying(true);
    setSelectedStage('input');
    setActiveSubStep('classify');

    window.setTimeout(() => {
      setSelectedStage('processing');
      setActiveSubStep('classify');
    }, 550);

    window.setTimeout(() => {
      setActiveSubStep('summarize');
    }, 1150);

    window.setTimeout(() => {
      setActiveSubStep('route');
    }, 1750);

    window.setTimeout(() => {
      setSelectedStage('output');
      setIsDemoPlaying(false);
    }, 2400);
  };

  // Controlled pointer parallax (+/- 3.5 deg max)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!tiltPlaneRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;

    const tiltX = (-yRatio * 5).toFixed(2);
    const tiltY = (xRatio * 6).toFixed(2);

    tiltPlaneRef.current.style.setProperty('--tilt-x', `${tiltX}deg`);
    tiltPlaneRef.current.style.setProperty('--tilt-y', `${tiltY}deg`);
  };

  const handlePointerLeave = () => {
    if (!tiltPlaneRef.current) return;
    tiltPlaneRef.current.style.setProperty('--tilt-x', '2deg');
    tiltPlaneRef.current.style.setProperty('--tilt-y', '-4deg');
  };

  const handleStageSelect = (stage: WorkspaceStageId) => {
    setSelectedStage((prev) => (prev === stage ? null : stage));
  };

  const getScenarioIcon = (id: string) => {
    switch (id) {
      case 'emails':
        return <Mail className="h-3.5 w-3.5 text-[#1E2432]" aria-hidden="true" />;
      case 'documents':
        return <FileText className="h-3.5 w-3.5 text-[#1E2432]" aria-hidden="true" />;
      case 'tasks':
        return <CheckSquare className="h-3.5 w-3.5 text-[#1E2432]" aria-hidden="true" />;
      default:
        return <Mic className="h-3.5 w-3.5 text-[#1E2432]" aria-hidden="true" />;
    }
  };

  const getPanelDepthClass = (stage: WorkspaceStageId, baseClass: string) => {
    if (!effectiveStage) return baseClass;
    if (effectiveStage === stage) return `${baseClass} panel-depth-focused z-30`;
    return `${baseClass} panel-depth-recessed opacity-80 z-10`;
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full select-none"
    >
      {/* Top Interactive Stage Controls Bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div
          role="group"
          aria-label="Inspect workflow stage"
          className="flex items-center gap-1 rounded-xl border border-white/80 bg-white/65 p-1 shadow-xs backdrop-blur-md"
        >
          {(
            [
              { id: 'input', label: '01 Input' },
              { id: 'processing', label: '02 AI Processing' },
              { id: 'output', label: '03 Output' },
            ] as { id: WorkspaceStageId; label: string }[]
          ).map((tab) => {
            const isActive = selectedStage === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={isActive}
                onClick={() => handleStageSelect(tab.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#252C43] text-white shadow-xs'
                    : 'text-[#657187] hover:text-[#1E2432] hover:bg-white/60'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={triggerManualDemoWalkthrough}
          disabled={isDemoPlaying}
          className="inline-flex items-center gap-1.5 rounded-xl border border-white/85 bg-white/75 px-3 py-1.5 text-xs font-semibold text-[#1E2432] shadow-xs hover:bg-white disabled:opacity-60 transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43]"
        >
          <Play className="h-3 w-3 fill-current" aria-hidden="true" />
          <span>{isDemoPlaying ? 'Stepping workflow...' : 'Step Through Flow'}</span>
        </button>
      </div>

      {/* 2.5D Perspective Stage Container */}
      <div className="workspace-perspective-stage relative min-h-[540px] w-full">
        {/* Background Decorative Glass Artwork Asset */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-4 z-0 flex items-center justify-center opacity-55"
        >
          <img
            src={
              artworkFallback
                ? '/assets/aistudio/glass-workspace-art_d86f62af.png'
                : '/assets/aistudio/glass-workspace-art_25aec004.svg'
            }
            alt=""
            referrerPolicy="no-referrer"
            onError={() => setArtworkFallback(true)}
            className="h-full max-h-[540px] w-full object-contain"
          />
        </div>

        {/* Tilted Spatial Plane */}
        <div
          ref={tiltPlaneRef}
          className="workspace-tilt-plane relative z-10 flex flex-col gap-3"
        >
          {/* PANEL 01 — INPUT (Upper-Left in 2.5D space) */}
          <div
            ref={inputPanelRef}
            role="button"
            tabIndex={0}
            aria-pressed={selectedStage === 'input'}
            aria-label="Stage 01 Input: Incoming Work. Click to inspect stage."
            onClick={() => handleStageSelect('input')}
            onMouseEnter={() => setHoveredStage('input')}
            onMouseLeave={() => setHoveredStage(null)}
            onFocus={() => setHoveredStage('input')}
            onBlur={() => setHoveredStage(null)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleStageSelect('input');
              }
            }}
            className={`lg:w-[74%] rounded-2xl p-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43] ${
              effectiveStage === 'input' ? 'glass-panel-active' : 'glass-panel'
            } ${getPanelDepthClass('input', 'panel-depth-input')}`}
          >
            <div className="flex items-center justify-between border-b border-[#1E2432]/8 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-semibold text-[#657187]">
                  01 — INPUT
                </span>
                <span aria-hidden="true" className="text-[#657187]">·</span>
                <span className="text-xs font-semibold text-[#1E2432]">
                  Incoming Work
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#657187]">
                4 SOURCES
              </span>
            </div>

            {/* Interactive Source Task Buttons */}
            <div className="mt-3 grid grid-cols-2 gap-1.5" onClick={(e) => e.stopPropagation()}>
              {WORKSPACE_SCENARIOS.map((item) => {
                const isSelected = item.id === activeScenarioId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveScenarioId(item.id);
                      setSelectedStage('input');
                    }}
                    className={`flex items-center gap-2 rounded-xl px-2.5 py-2 text-left text-xs transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white/95 text-[#1E2432] shadow-xs border border-[#252C43]/20 font-semibold'
                        : 'bg-white/55 text-[#657187] hover:bg-white/80 hover:text-[#1E2432] border border-transparent'
                    }`}
                  >
                    {getScenarioIcon(item.id)}
                    <span className="truncate">{item.categoryLabel}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-2.5 flex items-center justify-between rounded-xl bg-white/80 px-3 py-2 text-xs">
              <span className="font-medium text-[#1E2432] truncate">
                {currentScenario.title}
              </span>
              <span className="ml-2 font-mono text-[10px] text-[#657187] whitespace-nowrap shrink-0">
                {currentScenario.sourceMeta}
              </span>
            </div>
          </div>

          {/* SVG Connector Bridge 1: Input -> AI Processing */}
          <div className="relative -my-1 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <svg viewBox="0 0 520 34" fill="none" className="h-8 w-full">
              <path
                ref={connector1Ref}
                d="M 160 2 C 160 20, 290 14, 290 32"
                stroke="#8E7CE8"
                strokeWidth={effectiveStage === 'input' || effectiveStage === 'processing' ? '2.5' : '1.75'}
                strokeDasharray="320"
                strokeLinecap="round"
              />
              <path
                d="M 160 2 C 160 20, 290 14, 290 32"
                stroke="#1E2432"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="svg-signal-line"
              />
              <circle cx="160" cy="4" r="3.5" fill="#8E7CE8" />
              <circle cx="290" cy="30" r="4" fill="#5B8DEF" />
            </svg>
          </div>

          {/* PANEL 02 — AI PROCESSING (Central Largest Prominent Glass Panel) */}
          <div
            ref={processingPanelRef}
            role="button"
            tabIndex={0}
            aria-pressed={selectedStage === 'processing'}
            aria-label="Stage 02 AI Processing: Classify, Summarize, Route. Click to inspect stage."
            onClick={() => handleStageSelect('processing')}
            onMouseEnter={() => setHoveredStage('processing')}
            onMouseLeave={() => setHoveredStage(null)}
            onFocus={() => setHoveredStage('processing')}
            onBlur={() => setHoveredStage(null)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleStageSelect('processing');
              }
            }}
            className={`lg:ml-auto lg:mr-2 lg:w-[88%] rounded-2xl p-5 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43] ${
              effectiveStage === 'processing' ? 'glass-panel-active' : 'glass-panel-active'
            } ${getPanelDepthClass('processing', 'panel-depth-processing')}`}
          >
            <div className="flex items-center justify-between border-b border-[#1E2432]/10 pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-[#252C43]" aria-hidden="true" />
                <span className="font-mono text-[11px] font-semibold text-[#657187]">
                  02 — AI PROCESSING
                </span>
                <span aria-hidden="true" className="text-[#657187]">·</span>
                <span className="text-xs font-semibold text-[#1E2432]">
                  AI Workflow
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#5BA59A] font-medium">
                DETERMINISTIC FLOW
              </span>
            </div>

            {/* Three sequential AI Workflow steps: Classify -> Summarize -> Route */}
            <div className="mt-3.5 space-y-2" onClick={(e) => e.stopPropagation()}>
              {/* Step 1: Classify */}
              <div
                onClick={() => {
                  setActiveSubStep('classify');
                  setSelectedStage('processing');
                }}
                className={`rounded-xl p-3 transition-all cursor-pointer border ${
                  activeSubStep === 'classify'
                    ? 'bg-white/95 border-[#D8D0F7] shadow-xs'
                    : 'bg-white/65 border-white/70 hover:bg-white/85'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1E2432]">1. Classify</span>
                  <span className="font-mono text-[11px] text-[#657187]">
                    {currentScenario.classification.intent} · {currentScenario.classification.priority}
                  </span>
                </div>
              </div>

              {/* Step 2: Summarize */}
              <div
                onClick={() => {
                  setActiveSubStep('summarize');
                  setSelectedStage('processing');
                }}
                className={`rounded-xl p-3 transition-all cursor-pointer border ${
                  activeSubStep === 'summarize'
                    ? 'bg-white/95 border-[#C9DAFA] shadow-xs'
                    : 'bg-white/65 border-white/70 hover:bg-white/85'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1E2432]">2. Summarize</span>
                  <span className="font-mono text-[11px] text-[#657187]">Key Context Extracted</span>
                </div>
                <p className="mt-1.5 text-xs text-[#657187] leading-relaxed">
                  {currentScenario.summaryBullets[0]}
                </p>
              </div>

              {/* Step 3: Route */}
              <div
                onClick={() => {
                  setActiveSubStep('route');
                  setSelectedStage('processing');
                }}
                className={`rounded-xl p-3 transition-all cursor-pointer border ${
                  activeSubStep === 'route'
                    ? 'bg-white/95 border-[#F6DCCA] shadow-xs'
                    : 'bg-white/65 border-white/70 hover:bg-white/85'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#1E2432]">3. Route</span>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-[#1E2432]">
                    <span>{currentScenario.routeDestination}</span>
                    <ArrowRight className="h-3 w-3 text-[#5BA59A]" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SVG Connector Bridge 2: AI Processing -> Output */}
          <div className="relative -my-1 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <svg viewBox="0 0 520 34" fill="none" className="h-8 w-full">
              <path
                ref={connector2Ref}
                d="M 310 2 C 310 20, 390 14, 390 32"
                stroke="#5B8DEF"
                strokeWidth={effectiveStage === 'processing' || effectiveStage === 'output' ? '2.5' : '1.75'}
                strokeDasharray="320"
                strokeLinecap="round"
              />
              <path
                d="M 310 2 C 310 20, 390 14, 390 32"
                stroke="#5BA59A"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="svg-signal-line-delayed"
              />
              <circle cx="310" cy="4" r="3.5" fill="#5B8DEF" />
              <circle cx="390" cy="30" r="4" fill="#5BA59A" />
            </svg>
          </div>

          {/* PANEL 03 — OUTPUT (Lower-Right in 2.5D space) */}
          <div
            ref={outputPanelRef}
            role="button"
            tabIndex={0}
            aria-pressed={selectedStage === 'output'}
            aria-label="Stage 03 Output: Organized Results ready for review. Click to inspect stage."
            onClick={() => handleStageSelect('output')}
            onMouseEnter={() => setHoveredStage('output')}
            onMouseLeave={() => setHoveredStage(null)}
            onFocus={() => setHoveredStage('output')}
            onBlur={() => setHoveredStage(null)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleStageSelect('output');
              }
            }}
            className={`lg:ml-auto lg:w-[80%] rounded-2xl p-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43] ${
              effectiveStage === 'output' ? 'glass-panel-active' : 'glass-panel'
            } ${getPanelDepthClass('output', 'panel-depth-output')}`}
          >
            <div className="flex items-center justify-between border-b border-[#1E2432]/8 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-semibold text-[#657187]">
                  03 — OUTPUT
                </span>
                <span aria-hidden="true" className="text-[#657187]">·</span>
                <span className="text-xs font-semibold text-[#1E2432]">
                  Organized Results
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#5BA59A]">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Ready for review</span>
              </span>
            </div>

            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="rounded-xl bg-white/80 p-2.5">
                <div className="text-[11px] font-mono text-[#657187]">DRAFT SUMMARY</div>
                <div className="mt-0.5 text-xs font-semibold text-[#1E2432] line-clamp-1">
                  {currentScenario.outputDraft.summaryTitle}
                </div>
              </div>
              <div className="rounded-xl bg-white/80 p-2.5">
                <div className="text-[11px] font-mono text-[#657187]">PRIORITIZED TASK</div>
                <div className="mt-0.5 text-xs font-semibold text-[#1E2432] line-clamp-1">
                  {currentScenario.outputDraft.prioritizedTask}
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between rounded-xl bg-white/90 px-3 py-2 text-xs">
              <div className="flex items-center gap-2 truncate">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#5BA59A] shrink-0" aria-hidden="true" />
                <span className="text-[#1E2432] truncate">
                  {currentScenario.outputDraft.preparedResponse}
                </span>
              </div>
              <span className="ml-2 font-mono text-[10px] text-[#657187] whitespace-nowrap shrink-0">
                {currentScenario.outputDraft.reviewStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Explanatory Live Stage Caption */}
      <div
        role="status"
        aria-live="polite"
        className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-white/80 bg-white/70 px-4 py-3 text-xs backdrop-blur-md"
      >
        <div className="flex items-center gap-2.5">
          <Layers className="h-4 w-4 text-[#252C43] shrink-0" aria-hidden="true" />
          <span className="font-medium text-[#1E2432]">
            {getStageCaption(effectiveStage)}
          </span>
        </div>
        {effectiveStage && (
          <button
            type="button"
            onClick={() => setSelectedStage(null)}
            className="font-mono text-[11px] font-medium text-[#657187] hover:text-[#1E2432] whitespace-nowrap shrink-0 cursor-pointer"
          >
            Reset view
          </button>
        )}
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/HowItWorksSection.tsx">
<![CDATA[import React, { useState } from 'react';
import { HOW_IT_WORKS_STEPS, HowItWorksStep } from '../utils/workflowLogic';
import { ShieldCheck, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState<HowItWorksStep['id']>('map');

  const currentStep =
    HOW_IT_WORKS_STEPS.find((s) => s.id === activeStepId) || HOW_IT_WORKS_STEPS[0];

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="landing-section py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-medium text-[#657187]">
            05 · HOW IT WORKS — MAP, AUTOMATE, REVIEW
          </p>
          <h2
            id="how-it-works-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-[#1E2432] sm:text-4xl [text-wrap:balance]"
          >
            From idea to working workflow.
          </h2>
          <p className="mt-4 text-base text-[#657187] leading-relaxed">
            The playbook walks through a structured three-stage methodology so your workflows remain transparent, testable, and easy to maintain.
          </p>
        </div>

        {/* 3 Step Selector Cards */}
        <div
          role="tablist"
          aria-label="Three-step workflow methodology"
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {HOW_IT_WORKS_STEPS.map((step) => {
            const isSelected = step.id === activeStepId;
            return (
              <button
                key={step.id}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => setActiveStepId(step.id)}
                className={`rounded-2xl p-6 text-left transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43] ${
                  isSelected
                    ? 'glass-panel-active border-[#252C43]/35 shadow-sm'
                    : 'glass-panel hover:bg-white/80'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-[#252C43]">
                    {step.number} — {step.label}
                  </span>
                  <span className={isSelected ? 'text-[#5BA59A] font-medium' : 'text-[#657187]'}>
                    {isSelected ? 'Active Stage' : 'Inspect'}
                  </span>
                </div>
                <h3 className="mt-2.5 text-lg font-bold text-[#1E2432]">
                  {step.headline}
                </h3>
                <p className="mt-1.5 text-sm text-[#657187] leading-relaxed">
                  {step.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Transforming Unified Workflow Diagram */}
        <div className="mt-8 glass-panel-active rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E2432]/10 pb-4">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-[#1E2432]">
                {currentStep.number}: {currentStep.label} ARCHITECTURE
              </span>
              <span aria-hidden="true" className="text-[#657187]">·</span>
              <span className="text-xs text-[#657187]">{currentStep.headline}</span>
            </div>
            <span className="font-mono text-xs font-medium text-[#5BA59A]">
              {activeStepId === 'map' && 'STAGE 1: DISCONNECTED DISCOVERY'}
              {activeStepId === 'automate' && 'STAGE 2: CONNECTED AI PATHWAY'}
              {activeStepId === 'review' && 'STAGE 3: VERIFIED HUMAN CHECKPOINTS'}
            </span>
          </div>

          <div className="relative mt-8">
            {/* SVG Connecting Line Across the 4 Nodes */}
            <svg
              viewBox="0 0 1000 90"
              fill="none"
              aria-hidden="true"
              className="pointer-events-none hidden lg:block absolute inset-x-6 top-1/2 -translate-y-1/2 h-24 w-[calc(100%-3rem)]"
            >
              <line
                x1="80"
                y1="45"
                x2="920"
                y2="45"
                stroke={activeStepId === 'map' ? '#CBD5E1' : '#C9DAFA'}
                strokeWidth="2.5"
                strokeDasharray={activeStepId === 'map' ? '6 8' : 'none'}
              />
              {activeStepId !== 'map' && (
                <line
                  x1="80"
                  y1="45"
                  x2="920"
                  y2="45"
                  stroke={activeStepId === 'review' ? '#5BA59A' : '#252C43'}
                  strokeWidth="2.5"
                  className="svg-signal-line"
                />
              )}
            </svg>

            <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {currentStep.nodes.map((node, idx) => {
                const isCheckpoint = node.kind === 'checkpoint';
                const isAi = node.kind === 'ai';
                return (
                  <div
                    key={node.id}
                    className={`rounded-2xl p-5 transition-all duration-300 border ${
                      isCheckpoint
                        ? 'bg-[#252C43] text-white border-[#252C43] shadow-md'
                        : isAi
                        ? 'bg-white/95 text-[#1E2432] border-[#D8D0F7] shadow-xs'
                        : 'bg-white/85 text-[#1E2432] border-white/90 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className={isCheckpoint ? 'text-[#C9DAFA]' : 'text-[#657187]'}>
                        0{idx + 1} · {node.kind.toUpperCase()}
                      </span>
                      {isCheckpoint ? (
                        <ShieldCheck className="h-4 w-4 text-[#5BA59A]" aria-hidden="true" />
                      ) : isAi ? (
                        <Cpu className="h-4 w-4 text-[#252C43]" aria-hidden="true" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4 text-[#5BA59A]" aria-hidden="true" />
                      )}
                    </div>

                    <h4
                      className={`mt-3 text-sm font-bold ${
                        isCheckpoint ? 'text-white' : 'text-[#1E2432]'
                      }`}
                    >
                      {node.title}
                    </h4>

                    <p
                      className={`mt-1.5 text-xs leading-relaxed ${
                        isCheckpoint ? 'text-white/80' : 'text-[#657187]'
                      }`}
                    >
                      {node.detail}
                    </p>

                    <div
                      className={`mt-4 flex items-center justify-between border-t pt-2.5 font-mono text-[11px] ${
                        isCheckpoint
                          ? 'border-white/15 text-[#5BA59A]'
                          : 'border-[#1E2432]/8 text-[#657187]'
                      }`}
                    >
                      <span>
                        {activeStepId === 'map'
                          ? 'Mapped node'
                          : activeStepId === 'automate'
                          ? 'Connected route'
                          : 'Verified step'}
                      </span>
                      {idx < currentStep.nodes.length - 1 && (
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/MinimalHeader.tsx">
<![CDATA[import React from 'react';
import { ArrowDownRight } from 'lucide-react';

interface MinimalHeaderProps {
  onFocusForm: () => void;
  onOpenGlassStudio: () => void;
}

export const MinimalHeader: React.FC<MinimalHeaderProps> = ({
  onFocusForm,
  onOpenGlassStudio,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/75 bg-[#F8F9FC]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-8 px-6 py-3.5 sm:px-10">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-base font-bold tracking-[0.22em] text-[#1E2432] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#252C43]"
        >
          LUMEN
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Page sections"
          className="hidden md:flex items-center gap-7 text-xs font-medium text-[#657187]"
        >
          <a
            href="#workspace-hero"
            className="hover:text-[#1E2432] transition-colors whitespace-nowrap shrink-0"
          >
            Workspace
          </a>
          <a
            href="#inside-playbook"
            className="hover:text-[#1E2432] transition-colors whitespace-nowrap shrink-0"
          >
            Playbook Preview
          </a>
          <a
            href="#how-it-works"
            className="hover:text-[#1E2432] transition-colors whitespace-nowrap shrink-0"
          >
            How It Works
          </a>
          <a
            href="#faq"
            className="hover:text-[#1E2432] transition-colors whitespace-nowrap shrink-0"
          >
            FAQ
          </a>
          <a
            href="/_glass-studio"
            onClick={(e) => {
              e.preventDefault();
              onOpenGlassStudio();
            }}
            className="hover:text-[#1E2432] transition-colors whitespace-nowrap shrink-0"
          >
            Glass Studio
          </a>
        </nav>

        {/* Zone 3: 1 primary action anchored to the form */}
        <div className="flex items-center shrink-0">
          <a
            href="#hero-download-form"
            onClick={(e) => {
              e.preventDefault();
              onFocusForm();
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#252C43] px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-[#1E2432] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43]"
          >
            <span>Get the free playbook</span>
            <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
};
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/PlaybookPreviewSection.tsx">
<![CDATA[import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, FileText, ArrowDownRight } from 'lucide-react';
import {
  PlaybookPreviewId,
  PLAYBOOK_PREVIEW_PAGES,
  getPreviewStackOrder,
} from '../utils/workflowLogic';

interface PlaybookPreviewSectionProps {
  onFocusForm: () => void;
}

const FULL_PLAYBOOK_OUTLINE = [
  '01. Introduction to practical AI workflows',
  '02. Identifying repetitive tasks',
  '03. Assessing automation opportunities',
  '04. Mapping inputs and outputs',
  '05. Understanding triggers and conditions',
  '06. Choosing AI-assisted steps',
  '07. Designing human review checkpoints',
  '08. Example: Email classification and summarization',
  '09. Example: Meeting notes to action items',
  '10. Example: Document information extraction',
  '11. Reusable prompt structures',
  '12. Testing and verifying AI-generated outputs',
  '13. Privacy and data-handling considerations',
  '14. Implementation checklist & next steps',
];

export const PlaybookPreviewSection: React.FC<PlaybookPreviewSectionProps> = ({
  onFocusForm,
}) => {
  const [activeId, setActiveId] = useState<PlaybookPreviewId>('find');
  const [coverImgFallback, setCoverImgFallback] = useState(false);
  const [showFullOutline, setShowFullOutline] = useState(false);

  const stackOrder = getPreviewStackOrder(activeId);
  const activeIndex = PLAYBOOK_PREVIEW_PAGES.findIndex((p) => p.id === activeId);
  const activePage = PLAYBOOK_PREVIEW_PAGES[activeIndex] || PLAYBOOK_PREVIEW_PAGES[0];

  const handlePrev = () => {
    const prevIdx =
      (activeIndex - 1 + PLAYBOOK_PREVIEW_PAGES.length) % PLAYBOOK_PREVIEW_PAGES.length;
    setActiveId(PLAYBOOK_PREVIEW_PAGES[prevIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % PLAYBOOK_PREVIEW_PAGES.length;
    setActiveId(PLAYBOOK_PREVIEW_PAGES[nextIdx].id);
  };

  const getStackClassName = (id: PlaybookPreviewId) => {
    const pos = stackOrder[id];
    if (pos === 'front') return 'stack-card-front relative';
    if (pos === 'middle') return 'stack-card-middle hidden lg:block absolute inset-0 pointer-events-none';
    return 'stack-card-back hidden lg:block absolute inset-0 pointer-events-none';
  };

  return (
    <section
      id="inside-playbook"
      aria-labelledby="playbook-preview-heading"
      className="landing-section py-20 sm:py-28"
    >
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium text-[#657187]">
              04 · INSIDE THE PLAYBOOK — INTERACTIVE RESOURCE PREVIEW
            </p>
            <h2
              id="playbook-preview-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-[#1E2432] sm:text-4xl [text-wrap:balance]"
            >
              Everything you need to get started.
            </h2>
            <p className="mt-4 text-base text-[#657187] leading-relaxed">
              Explore the frameworks, examples, and practical tools included in the free guide.
            </p>
          </div>

          {/* Previous / Next Controls */}
          <div className="flex items-center gap-2 self-start">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous playbook sample page"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/85 bg-white/80 text-[#1E2432] shadow-xs hover:bg-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43]"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="px-2 font-mono text-xs font-medium text-[#657187]">
              0{activeIndex + 1} / 0{PLAYBOOK_PREVIEW_PAGES.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next playbook sample page"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/85 bg-white/80 text-[#1E2432] shadow-xs hover:bg-white transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43]"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Selectable Preview State Tabs */}
        <div
          role="tablist"
          aria-label="Playbook sample pages"
          className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {PLAYBOOK_PREVIEW_PAGES.map((page) => {
            const isSelected = page.id === activeId;
            return (
              <button
                key={page.id}
                role="tab"
                type="button"
                id={`tab-${page.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${page.id}`}
                onClick={() => setActiveId(page.id)}
                className={`rounded-2xl p-4 text-left transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43] ${
                  isSelected
                    ? 'glass-panel-active border-[#252C43]/30 shadow-sm'
                    : 'glass-panel hover:bg-white/80'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-semibold text-[#1E2432]">
                    {page.tabLabel}
                  </span>
                  <span className="font-mono text-[11px] text-[#657187]">
                    {page.pageNumber}
                  </span>
                </div>
                <p className="mt-1.5 text-xs text-[#657187] line-clamp-1">
                  {page.chapterTitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Main 2.5D Split: Playbook Cover on Left + Layered Sample Pages Stack on Right */}
        <div className="mt-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Left Column (4 cols): Provided Playbook Cover */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
            <div className="glass-panel relative w-full max-w-[390px] rounded-3xl p-3.5 shadow-md">
              <div className="overflow-hidden rounded-2xl border border-white/80 bg-[#F8F9FC]">
                <img
                  src={
                    coverImgFallback
                      ? '/assets/aistudio/ai-workflow-playbook-cover_2149baf2.png'
                      : '/assets/aistudio/ai-workflow-playbook-cover_dcc4c416.svg'
                  }
                  alt="LUMEN — The Practical Guide: AI Workflow Playbook Cover"
                  referrerPolicy="no-referrer"
                  onError={() => setCoverImgFallback(true)}
                  className="h-auto w-full object-cover"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-[#657187]">
                <span className="font-mono text-[11px] font-medium text-[#1E2432]">
                  RESOURCE / 001 · COVER
                </span>
                <span>16 Substantive Pages</span>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Layered 2.5D Glass Document Stack */}
          <div className="lg:col-span-7 playbook-stack-stage relative lg:pr-12 lg:pt-8">
            <div className="relative w-full">
              {PLAYBOOK_PREVIEW_PAGES.map((page) => {
                const isFront = page.id === activeId;
                return (
                  <div
                    key={page.id}
                    id={`panel-${page.id}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${page.id}`}
                    aria-hidden={!isFront}
                    className={`rounded-3xl p-6 sm:p-9 ${getStackClassName(page.id)}`}
                  >
                    {isFront ? (
                      <>
                        {/* Top Document Metadata Header */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E2432]/10 pb-4">
                          <div className="flex items-center gap-2 text-xs font-mono text-[#657187]">
                            <span>LUMEN · AI WORKFLOW PLAYBOOK</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-semibold text-[#1E2432]">
                              {page.pageNumber}
                            </span>
                          </div>
                          <span className="font-mono text-xs font-medium text-[#5BA59A]">
                            EXCERPT PREVIEW
                          </span>
                        </div>

                        {/* Chapter Title & Summary */}
                        <div className="mt-5">
                          <h3 className="text-2xl font-bold text-[#1E2432]">
                            {page.chapterTitle}
                          </h3>
                          <p className="mt-1 text-sm font-medium text-[#252C43]">
                            {page.subtitle}
                          </p>
                          <p className="mt-3 text-sm text-[#657187] leading-relaxed">
                            {page.summary}
                          </p>
                        </div>

                        {/* Checklist / Blueprint Sections */}
                        <div className="mt-6 space-y-5">
                          {page.sections.map((sec) => (
                            <div key={sec.heading}>
                              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1E2432]">
                                {sec.heading}
                              </h4>
                              <ul className="mt-2.5 space-y-2">
                                {sec.items.map((item) => (
                                  <li
                                    key={item}
                                    className="flex items-start gap-2.5 text-sm text-[#1E2432]/90"
                                  >
                                    <CheckCircle2
                                      className="mt-0.5 h-4 w-4 text-[#5BA59A] shrink-0"
                                      aria-hidden="true"
                                    />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        {/* Reusable Prompt / Rule Box */}
                        {page.promptTemplate && (
                          <div className="mt-6 rounded-2xl border border-[#1E2432]/10 bg-[#F0F3FA] p-4">
                            <div className="font-mono text-[11px] font-semibold text-[#657187]">
                              {page.promptTemplate.label}
                            </div>
                            <p className="mt-1.5 font-mono text-xs text-[#1E2432] leading-relaxed">
                              {page.promptTemplate.promptText}
                            </p>
                          </div>
                        )}

                        {/* Bottom Page Footer */}
                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#1E2432]/10 pt-4">
                          <button
                            type="button"
                            onClick={() => setShowFullOutline((prev) => !prev)}
                            aria-expanded={showFullOutline}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E2432] hover:text-[#252C43] underline underline-offset-4 cursor-pointer"
                          >
                            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>
                              {showFullOutline
                                ? 'Hide 16-page table of contents'
                                : 'View full 16-page table of contents'}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={onFocusForm}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-[#252C43] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1E2432] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                          >
                            <span>Get the full playbook</span>
                            <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                        </div>
                      </>
                    ) : (
                      /* Clean recessed glass sheet header bar for 2.5D depth without text bleed */
                      <div className="flex items-center justify-end">
                        <span className="font-mono text-[10px] font-medium text-[#657187]/70">
                          {page.pageNumber}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Expandable Full 16-Page Table of Contents Drawer */}
        {showFullOutline && (
          <div className="mt-8 glass-panel rounded-3xl p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-[#1E2432]/10 pb-3">
              <h3 className="text-base font-bold text-[#1E2432]">
                Complete Guide Contents (16 Pages)
              </h3>
              <span className="font-mono text-xs text-[#657187]">
                EDITION 2026 · PDF
              </span>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {FULL_PLAYBOOK_OUTLINE.map((chapter) => (
                <div
                  key={chapter}
                  className="rounded-xl bg-white/70 px-3.5 py-2.5 text-xs font-medium text-[#1E2432]"
                >
                  {chapter}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/ProblemSection.tsx">
<![CDATA[import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, FileText, CheckSquare, Mic, Activity, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TaskFragment {
  id: string;
  label: string;
  detail: string;
  source: string;
  scatteredClass: string;
  structuredOrder: string;
}

const TASK_FRAGMENTS: TaskFragment[] = [
  {
    id: 'email',
    label: 'Incoming email',
    detail: 'Scope change question buried in a 14-reply thread',
    source: 'Shared Inbox',
    scatteredClass: 'lg:-translate-x-8 lg:-translate-y-6 lg:-rotate-3',
    structuredOrder: '01 · Intake',
  },
  {
    id: 'doc',
    label: 'Document summary',
    detail: 'Key contract dates locked inside a 28-page PDF',
    source: 'Cloud Drive',
    scatteredClass: 'lg:translate-x-6 lg:translate-y-5 lg:rotate-2',
    structuredOrder: '02 · Context',
  },
  {
    id: 'note',
    label: 'Meeting note',
    detail: 'Unassigned follow-ups captured in raw call notes',
    source: 'Call Transcript',
    scatteredClass: 'lg:-translate-x-5 lg:translate-y-8 lg:-rotate-2',
    structuredOrder: '03 · Synthesis',
  },
  {
    id: 'action',
    label: 'Action item',
    detail: 'Owner and due date missing from project board',
    source: 'Task Tracker',
    scatteredClass: 'lg:translate-x-7 lg:-translate-y-5 lg:rotate-3',
    structuredOrder: '04 · Routing',
  },
  {
    id: 'status',
    label: 'Status update',
    detail: 'Manual weekly summary assembled across 4 tabs',
    source: 'Team Channel',
    scatteredClass: 'lg:-translate-x-3 lg:translate-y-4 lg:rotate-1',
    structuredOrder: '05 · Review Ready',
  },
];

export const ProblemSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isStructured, setIsStructured] = useState<boolean>(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsStructured(true);
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 62%',
        end: 'bottom 35%',
        onEnter: () => setIsStructured(true),
        onLeaveBack: () => setIsStructured(false),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const renderFragmentIcon = (id: string) => {
    switch (id) {
      case 'email':
        return <Mail className="h-4 w-4 text-[#252C43]" aria-hidden="true" />;
      case 'doc':
        return <FileText className="h-4 w-4 text-[#252C43]" aria-hidden="true" />;
      case 'note':
        return <Mic className="h-4 w-4 text-[#252C43]" aria-hidden="true" />;
      case 'action':
        return <CheckSquare className="h-4 w-4 text-[#252C43]" aria-hidden="true" />;
      default:
        return <Activity className="h-4 w-4 text-[#252C43]" aria-hidden="true" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      id="the-problem"
      aria-labelledby="problem-heading"
      className="landing-section py-20 sm:py-28"
    >
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 sm:px-10">
        {/* Section Header + Interactive State Switcher */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium text-[#657187]">
              02 · THE PROBLEM — DISCONNECTED WORK
            </p>
            <h2
              id="problem-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-[#1E2432] sm:text-4xl [text-wrap:balance]"
            >
              Your work is connected. Your tools aren&apos;t.
            </h2>
            <p className="mt-4 text-base text-[#657187] leading-relaxed">
              Requests arrive everywhere. Information becomes fragmented. Repetitive tasks consume attention that could be spent on more important work.
            </p>
          </div>

          <div
            role="group"
            aria-label="Toggle workflow organization state"
            className="inline-flex items-center gap-1 self-start rounded-xl border border-white/85 bg-white/75 p-1 shadow-xs backdrop-blur-md"
          >
            <button
              type="button"
              aria-pressed={!isStructured}
              onClick={() => setIsStructured(false)}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                !isStructured
                  ? 'bg-[#252C43] text-white shadow-xs'
                  : 'text-[#657187] hover:text-[#1E2432]'
              }`}
            >
              Fragmented State
            </button>
            <button
              type="button"
              aria-pressed={isStructured}
              onClick={() => setIsStructured(true)}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                isStructured
                  ? 'bg-[#252C43] text-white shadow-xs'
                  : 'text-[#657187] hover:text-[#1E2432]'
              }`}
            >
              Structured System
            </button>
          </div>
        </div>

        {/* Interactive Canvas: Scattered Fragments -> Intentional Connected System */}
        <div className="relative mt-12 rounded-3xl border border-white/85 bg-white/50 p-6 sm:p-10 shadow-xs backdrop-blur-md overflow-hidden">
          {/* Connecting SVG Pathways (Visible when structured) */}
          <svg
            viewBox="0 0 1100 160"
            fill="none"
            aria-hidden="true"
            className={`pointer-events-none hidden lg:block absolute inset-x-8 top-1/2 -translate-y-1/2 h-40 w-[calc(100%-4rem)] transition-opacity duration-500 ${
              isStructured ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <path
              d="M 95 80 L 1005 80"
              stroke="#C9DAFA"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
            <path
              d="M 95 80 L 1005 80"
              stroke="#5BA59A"
              strokeWidth="2.5"
              className="svg-signal-line"
            />
          </svg>

          <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {TASK_FRAGMENTS.map((frag, index) => (
              <div
                key={frag.id}
                className={`glass-panel rounded-2xl p-4 transition-all duration-500 ${
                  isStructured
                    ? 'translate-x-0 translate-y-0 rotate-0 border-[#5BA59A]/40 bg-white/85'
                    : frag.scatteredClass
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] font-medium text-[#657187]">
                    {isStructured ? frag.structuredOrder : frag.source}
                  </span>
                  {renderFragmentIcon(frag.id)}
                </div>

                <h3 className="mt-3 text-sm font-semibold text-[#1E2432]">
                  {frag.label}
                </h3>

                <p className="mt-1.5 text-xs text-[#657187] leading-relaxed">
                  {frag.detail}
                </p>

                <div className="mt-3 flex items-center justify-between border-t border-[#1E2432]/8 pt-2.5 text-[11px] font-mono">
                  <span className={isStructured ? 'text-[#5BA59A] font-medium' : 'text-[#657187]'}>
                    {isStructured ? 'Connected step' : 'Unlinked fragment'}
                  </span>
                  {isStructured && index < TASK_FRAGMENTS.length - 1 && (
                    <ArrowRight className="h-3 w-3 text-[#5BA59A]" aria-hidden="true" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-[#1E2432]/8 pt-5 text-xs text-[#657187] sm:flex-row sm:items-center">
            <span>
              {isStructured
                ? 'Intentional workflow structure: Each incoming item follows a defined path from intake to human verification.'
                : 'Without workflow design: Context is re-read, copied, and manually reformatted between every tool.'}
            </span>
            <span className="font-mono text-[11px] text-[#1E2432] font-medium">
              CHAPTER 01 IN THE PLAYBOOK
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/TrustedBySection.tsx">
<![CDATA[import React from 'react';

interface PlaceholderCompany {
  id: string;
  name: string;
  renderMark: () => React.ReactNode;
}

const PLACEHOLDER_COMPANIES: PlaceholderCompany[] = [
  {
    id: 'kinetic',
    name: 'KINETIC LABS',
    renderMark: () => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#1E2432]" aria-hidden="true">
        <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.75" />
        <rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.75" />
        <path d="M11 7H17V13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'aether',
    name: 'AETHER SYSTEMS',
    renderMark: () => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#1E2432]" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.75" />
        <ellipse cx="12" cy="12" rx="8" ry="3.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: 'veridian',
    name: 'VERIDIAN OPS',
    renderMark: () => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#1E2432]" aria-hidden="true">
        <path
          d="M4 6L12 19L20 6"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 6L12 12L15.5 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'northstar',
    name: 'NORTHSTAR AI',
    renderMark: () => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#1E2432]" aria-hidden="true">
        <path
          d="M12 3L14.4 9.6L21 12L14.4 14.4L12 21L9.6 14.4L3 12L9.6 9.6L12 3Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: 'solaris',
    name: 'SOLARIS GROUP',
    renderMark: () => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#1E2432]" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M12 3V5.5M12 18.5V21M3 12H5.5M18.5 12H21M5.6 5.6L7.4 7.4M16.6 16.6L18.4 18.4M18.4 5.6L16.6 7.4M7.4 16.6L5.6 18.4"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    id: 'vanguard',
    name: 'VANGUARD STUDIO',
    renderMark: () => (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#1E2432]" aria-hidden="true">
        <polygon
          points="12,3 21,8.5 21,15.5 12,21 3,15.5 3,8.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <line x1="12" y1="3" x2="12" y2="21" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export const TrustedBySection: React.FC = () => {
  return (
    <section
      id="trusted-by"
      aria-label="Trusted by organizations"
      className="landing-section py-10 sm:py-12"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
            <p className="font-mono text-[11px] font-semibold tracking-[0.14em] text-[#657187]">
              TRUSTED BY WORKFLOW &amp; OPERATIONS TEAMS
            </p>
            <p className="text-xs text-[#657187]">
              Frameworks adopted across product, delivery, and technical operations groups
            </p>
          </div>

          <div
            role="list"
            aria-label="Placeholder company logos"
            className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
          >
            {PLACEHOLDER_COMPANIES.map((company) => (
              <div
                key={company.id}
                role="listitem"
                className="glass-panel-subtle flex items-center justify-center gap-2.5 rounded-xl px-4 py-3.5 text-[#1E2432]/80 hover:text-[#1E2432] transition-colors"
              >
                <span className="shrink-0">{company.renderMark()}</span>
                <span className="font-mono text-[11px] font-semibold tracking-wider whitespace-nowrap">
                  {company.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(lumen)/lumen/glass/glassGeometry.ts">
<![CDATA[import * as THREE from 'three';
import {
  GlassPresetId,
  GlassMaterialParams,
  GlassSceneParams,
  createSeededRandom,
} from './glassTypes';
import { createGlassShaderMaterial } from './glassShaders';

export interface BuiltGlassScene {
  group: THREE.Group;
  materials: THREE.ShaderMaterial[];
  animate: (loopPhase: number, pointerX: number, pointerY: number) => void;
  dispose: () => void;
}

function createRoundedPanelShape(width: number, height: number, radius: number): THREE.Shape {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  const r = Math.min(radius, width / 2, height / 2);

  shape.moveTo(x + r, y);
  shape.lineTo(x + width - r, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + r);
  shape.lineTo(x + width, y + height - r);
  shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  shape.lineTo(x + r, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  return shape;
}

export function buildPresetSculpture(
  presetId: GlassPresetId,
  studioTexture: THREE.Texture,
  materialParams: GlassMaterialParams,
  sceneParams: GlassSceneParams,
  transparentExport = false,
  isSoftwareGl = false
): BuiltGlassScene {
  const rng = createSeededRandom(sceneParams.seed);
  const group = new THREE.Group();
  const materials: THREE.ShaderMaterial[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  const density = Math.max(1, Math.min(6, Math.round(sceneParams.shapeDensity)));

  const segMultiplier = isSoftwareGl ? 0.65 : 1.0;

  const makeMat = (layerIdx: number) => {
    const mat = createGlassShaderMaterial(
      studioTexture,
      materialParams,
      sceneParams,
      layerIdx,
      transparentExport
    );
    materials.push(mat);
    return mat;
  };

  if (presetId === 'opal-ribbon') {
    // PRESET 01 — OPAL RIBBON: Sweeping thick 3D glass ribbon + secondary bevel ribbon + floating prism lens
    const ribbonCount = Math.max(2, Math.min(4, density));
    for (let i = 0; i < ribbonCount; i++) {
      const seedOffset = (rng() - 0.5) * 0.45;
      const curvePoints = [
        new THREE.Vector3(-1.4 + i * 0.4, -2.3 + seedOffset, -0.6 + i * 0.25),
        new THREE.Vector3(0.2 + i * 0.35, -0.85 - seedOffset, 0.25 + i * 0.15),
        new THREE.Vector3(0.85 + seedOffset, 0.55 + i * 0.2, 0.45 - i * 0.15),
        new THREE.Vector3(2.25 - i * 0.2, 2.15 + seedOffset, -0.35 + i * 0.2),
      ];
      const curve = new THREE.CatmullRomCurve3(curvePoints);

      // Extruded wide ribbon cross-section
      const ribbonWidth = i === 0 ? 0.92 : 0.48;
      const ribbonThickness = i === 0 ? 0.16 : 0.1;
      const crossShape = createRoundedPanelShape(ribbonWidth, ribbonThickness, ribbonThickness * 0.45);

      const extrudeSteps = Math.round(64 * segMultiplier);
      const geom = new THREE.ExtrudeGeometry(crossShape, {
        steps: extrudeSteps,
        bevelEnabled: false,
        extrudePath: curve,
      });
      geom.computeVertexNormals();
      geometries.push(geom);

      const mat = makeMat(i);
      const mesh = new THREE.Mesh(geom, mat);
      mesh.renderOrder = i + 1;
      mesh.userData = {
        basePos: mesh.position.clone(),
        baseRot: new THREE.Euler(0.08 * i, -0.12 * i, 0.05 * (rng() - 0.5)),
        phaseOffset: i * 1.2,
      };
      mesh.rotation.copy(mesh.userData.baseRot);
      group.add(mesh);
    }

    // Accent floating optical bevel lens near upper-right curve
    const lensGeo = new THREE.SphereGeometry(
      0.68,
      Math.round(36 * segMultiplier),
      Math.round(28 * segMultiplier)
    );
    lensGeo.scale(1.15, 0.85, 0.28);
    geometries.push(lensGeo);
    const lensMesh = new THREE.Mesh(lensGeo, makeMat(ribbonCount + 1));
    lensMesh.position.set(1.25, 0.72, 0.35);
    lensMesh.rotation.set(0.25, -0.35, 0.15);
    lensMesh.renderOrder = ribbonCount + 2;
    lensMesh.userData = {
      basePos: lensMesh.position.clone(),
      baseRot: lensMesh.rotation.clone(),
      phaseOffset: 2.4,
    };
    group.add(lensMesh);
  } else if (presetId === 'frosted-fold') {
    // PRESET 02 — FROSTED FOLD: Architectural folded glazing sheets
    const sheetCount = Math.max(2, Math.min(5, density));
    for (let i = 0; i < sheetCount; i++) {
      const segsX = Math.round(44 * segMultiplier);
      const segsY = Math.round(28 * segMultiplier);
      const planeGeo = new THREE.PlaneGeometry(3.6 - i * 0.35, 2.4 - i * 0.18, segsX, segsY);
      const posAttr = planeGeo.attributes.position;
      const foldFreq = 1.35 + i * 0.25;
      const foldAmp = 0.32 - i * 0.04;

      for (let v = 0; v < posAttr.count; v++) {
        const px = posAttr.getX(v);
        const py = posAttr.getY(v);
        const pz = Math.sin(px * foldFreq + py * 0.65 + i * 0.9) * foldAmp;
        posAttr.setZ(v, pz);
      }
      planeGeo.computeVertexNormals();
      geometries.push(planeGeo);

      const mesh = new THREE.Mesh(planeGeo, makeMat(i));
      mesh.position.set(
        (i - (sheetCount - 1) / 2) * 0.55 + (rng() - 0.5) * 0.2,
        (i - 1) * 0.22,
        -0.45 + i * 0.35
      );
      mesh.rotation.set(-0.18 + i * 0.08, 0.24 - i * 0.1, -0.22 + i * 0.09);
      mesh.renderOrder = i + 1;
      mesh.userData = {
        basePos: mesh.position.clone(),
        baseRot: mesh.rotation.clone(),
        phaseOffset: i * 1.1,
      };
      group.add(mesh);
    }
  } else if (presetId === 'liquid-lens') {
    // PRESET 03 — LIQUID LENS: Sculpted biconvex optical lenses bending the underlying studio grid
    const lensCount = Math.max(2, Math.min(4, density));
    const layouts = [
      { x: 0.55, y: 0.18, z: 0.25, rx: 1.35, ry: 1.05, rz: 0.34, rotZ: -0.25 },
      { x: -0.45, y: -0.42, z: -0.2, rx: 1.05, ry: 0.9, rz: 0.3, rotZ: 0.35 },
      { x: 1.35, y: -0.55, z: 0.5, rx: 0.82, ry: 0.72, rz: 0.28, rotZ: 0.12 },
      { x: -0.15, y: 0.78, z: -0.45, rx: 0.75, ry: 0.65, rz: 0.25, rotZ: -0.4 },
    ];

    for (let i = 0; i < lensCount; i++) {
      const cfg = layouts[i % layouts.length];
      const sphereGeo = new THREE.SphereGeometry(
        1.0,
        Math.round(44 * segMultiplier),
        Math.round(32 * segMultiplier)
      );
      sphereGeo.scale(cfg.rx, cfg.ry, cfg.rz);
      sphereGeo.computeVertexNormals();
      geometries.push(sphereGeo);

      const mesh = new THREE.Mesh(sphereGeo, makeMat(i));
      mesh.position.set(
        cfg.x + (rng() - 0.5) * 0.18,
        cfg.y + (rng() - 0.5) * 0.18,
        cfg.z
      );
      mesh.rotation.set(0.18 * (rng() - 0.5), -0.22 * (rng() - 0.5), cfg.rotZ);
      mesh.renderOrder = i + 1;
      mesh.userData = {
        basePos: mesh.position.clone(),
        baseRot: mesh.rotation.clone(),
        phaseOffset: i * 1.45,
      };
      group.add(mesh);
    }
  } else if (presetId === 'glass-strata') {
    // PRESET 04 — GLASS STRATA: Layered beveled architectural glass slabs at staggered depths
    const slabCount = Math.max(3, Math.min(5, density + 1));
    for (let i = 0; i < slabCount; i++) {
      const w = 2.5 - i * 0.28;
      const h = 1.65 - i * 0.16;
      const shape = createRoundedPanelShape(w, h, 0.24);
      const slabGeo = new THREE.ExtrudeGeometry(shape, {
        depth: 0.08,
        bevelEnabled: true,
        bevelSegments: Math.max(2, Math.round(3 * segMultiplier)),
        steps: 1,
        bevelSize: 0.04,
        bevelThickness: 0.04,
      });
      slabGeo.center();
      slabGeo.computeVertexNormals();
      geometries.push(slabGeo);

      const mesh = new THREE.Mesh(slabGeo, makeMat(i));
      const offsetAngle = (i - (slabCount - 1) / 2) * 0.38;
      mesh.position.set(
        offsetAngle * 0.95 + (rng() - 0.5) * 0.15,
        (i - (slabCount - 1) / 2) * 0.24,
        -0.7 + i * 0.38
      );
      mesh.rotation.set(-0.14 + i * 0.04, -0.28 + i * 0.06, -0.08 + i * 0.03);
      mesh.renderOrder = i + 1;
      mesh.userData = {
        basePos: mesh.position.clone(),
        baseRot: mesh.rotation.clone(),
        phaseOffset: i * 0.95,
      };
      group.add(mesh);
    }
  } else if (presetId === 'refractive-halo') {
    // PRESET 05 — REFRACTIVE HALO: Sculptural elliptical optical torus ring + inner counter-ring + core lens
    const outerTorus = new THREE.TorusGeometry(
      1.35,
      0.34,
      Math.round(32 * segMultiplier),
      Math.round(72 * segMultiplier)
    );
    outerTorus.scale(1.18, 0.92, 0.72);
    outerTorus.computeVertexNormals();
    geometries.push(outerTorus);

    const outerMesh = new THREE.Mesh(outerTorus, makeMat(0));
    outerMesh.position.set(0.25, 0.04, 0.1);
    outerMesh.rotation.set(0.32, -0.38, 0.18);
    outerMesh.renderOrder = 2;
    outerMesh.userData = {
      basePos: outerMesh.position.clone(),
      baseRot: outerMesh.rotation.clone(),
      phaseOffset: 0.0,
    };
    group.add(outerMesh);

    if (density >= 2) {
      const innerTorus = new THREE.TorusGeometry(
        0.78,
        0.18,
        Math.round(24 * segMultiplier),
        Math.round(56 * segMultiplier)
      );
      innerTorus.scale(1.08, 1.15, 0.65);
      innerTorus.computeVertexNormals();
      geometries.push(innerTorus);

      const innerMesh = new THREE.Mesh(innerTorus, makeMat(1));
      innerMesh.position.set(0.22, 0.02, -0.22);
      innerMesh.rotation.set(-0.28, 0.42, -0.25);
      innerMesh.renderOrder = 1;
      innerMesh.userData = {
        basePos: innerMesh.position.clone(),
        baseRot: innerMesh.rotation.clone(),
        phaseOffset: 1.6,
      };
      group.add(innerMesh);
    }
  } else {
    // PRESET 06 — CAUSTIC WINDOW: Curved glass architectural louvers projecting refracted daylight bands
    const louverCount = Math.max(3, Math.min(5, density + 1));
    for (let i = 0; i < louverCount; i++) {
      const louverGeo = new THREE.CylinderGeometry(
        1.6,
        1.6,
        3.8,
        Math.round(32 * segMultiplier),
        1,
        true,
        -0.38,
        0.76
      );
      louverGeo.computeVertexNormals();
      geometries.push(louverGeo);

      const mesh = new THREE.Mesh(louverGeo, makeMat(i));
      mesh.position.set(
        -0.6 + i * 0.68 + (rng() - 0.5) * 0.1,
        0.15 - i * 0.08,
        -0.5 + i * 0.22
      );
      mesh.rotation.set(0.12, -0.45 + i * 0.12, 0.42);
      mesh.renderOrder = i + 1;
      mesh.userData = {
        basePos: mesh.position.clone(),
        baseRot: mesh.rotation.clone(),
        phaseOffset: i * 0.85,
      };
      group.add(mesh);
    }
  }

  const animate = (loopPhase: number, pointerX: number, pointerY: number) => {
    const childCount = group.children.length;
    for (let i = 0; i < childCount; i++) {
      const child = group.children[i];
      const ud = child.userData;
      if (!ud || !ud.basePos || !ud.baseRot) continue;

      const p = loopPhase + (ud.phaseOffset || 0);
      const s = Math.sin(p);
      const c = Math.cos(p);

      // Seamless zero-gravity periodic float & subtle orientation shift
      child.position.x = ud.basePos.x + s * 0.08 + pointerX * (0.06 + i * 0.02);
      child.position.y = ud.basePos.y + c * 0.07 + pointerY * (0.05 + i * 0.015);
      child.position.z = ud.basePos.z + Math.sin(p * 2.0) * 0.05;

      child.rotation.x = ud.baseRot.x + c * 0.055 - pointerY * 0.08;
      child.rotation.y = ud.baseRot.y + s * 0.065 + pointerX * 0.09;
      child.rotation.z = ud.baseRot.z + Math.sin(p + 0.7) * 0.035;
    }
  };

  const dispose = () => {
    for (const g of geometries) {
      g.dispose();
    }
    for (const m of materials) {
      m.dispose();
    }
  };

  return { group, materials, animate, dispose };
}
]]>
    </file>
    <file path="src/app/(lumen)/lumen/glass/glassShaders.ts">
<![CDATA[import * as THREE from 'three';
import { GlassMaterialParams, GlassSceneParams } from './glassTypes';

/**
 * Generates a procedural studio photography backdrop texture with fine architectural
 * studio grid lines, diffused softbox light bands, and LUMEN pastel illumination
 * so clear and frosted glass visibly bends and refracts the environment behind it.
 */
export function createStudioEnvironmentTexture(
  renderer?: THREE.WebGLRenderer
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // 1. Base studio wall fill (#F8F9FC -> #EFF3FA)
    const baseGrad = ctx.createLinearGradient(0, 0, 1024, 1024);
    baseGrad.addColorStop(0, '#F9FAFD');
    baseGrad.addColorStop(0.5, '#F2F5FC');
    baseGrad.addColorStop(1, '#ECF0F9');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    // 2. Soft diffused studio key lights (Lavender #D8D0F7, Ice Blue #C9DAFA, Champagne #F6DCCA)
    const drawSoftPool = (
      cx: number,
      cy: number,
      radius: number,
      rgbaInner: string,
      rgbaOuter: string
    ) => {
      const g = ctx.createRadialGradient(cx, cy, 10, cx, cy, radius);
      g.addColorStop(0, rgbaInner);
      g.addColorStop(1, rgbaOuter);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, 1024, 1024);
    };

    drawSoftPool(740, 290, 460, 'rgba(216, 208, 247, 0.52)', 'rgba(216, 208, 247, 0)');
    drawSoftPool(620, 680, 480, 'rgba(201, 218, 250, 0.50)', 'rgba(201, 218, 250, 0)');
    drawSoftPool(840, 560, 390, 'rgba(246, 220, 202, 0.46)', 'rgba(246, 220, 202, 0)');
    drawSoftPool(260, 380, 420, 'rgba(221, 227, 238, 0.35)', 'rgba(221, 227, 238, 0)');

    // 3. Diagonal architectural studio light bands (makes optical refraction unmistakably visible)
    ctx.save();
    ctx.translate(512, 512);
    ctx.rotate(-0.38);
    for (let i = -640; i <= 640; i += 96) {
      const bandGrad = ctx.createLinearGradient(i, -600, i + 44, 600);
      bandGrad.addColorStop(0, 'rgba(255, 255, 255, 0)');
      bandGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.65)');
      bandGrad.addColorStop(1, 'rgba(221, 227, 238, 0.28)');
      ctx.fillStyle = bandGrad;
      ctx.fillRect(i, -700, 38, 1400);
    }
    ctx.restore();

    // 4. Fine architectural studio reference lines (subtle #DDE3EE rules)
    ctx.strokeStyle = 'rgba(186, 198, 218, 0.26)';
    ctx.lineWidth = 1.25;
    const step = 64;
    for (let x = 0; x <= 1024; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1024);
      ctx.stroke();
    }
    for (let y = 0; y <= 1024; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.MirroredRepeatWrapping;
  texture.wrapT = THREE.MirroredRepeatWrapping;
  if (renderer) {
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
  }
  texture.needsUpdate = true;
  return texture;
}

export const STUDIO_BACKDROP_VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.999, 1.0);
  }
`;

export const STUDIO_BACKDROP_FRAGMENT_SHADER = `
  uniform sampler2D uStudioMap;
  uniform float uLightingIntensity;
  uniform float uCausticIntensity;
  uniform float uLoopPhase;
  uniform vec2 uPointer;
  varying vec2 vUv;

  void main() {
    vec2 shiftedUv = vUv + uPointer * 0.012;
    vec3 studio = texture2D(uStudioMap, shiftedUv).rgb;

    // Subtle studio caustic light band on wall
    float waveA = sin(vUv.x * 9.0 + vUv.y * 5.0 + sin(uLoopPhase)) * 0.5 + 0.5;
    float waveB = cos(vUv.x * 6.0 - vUv.y * 8.0 + cos(uLoopPhase)) * 0.5 + 0.5;
    float causticBand = pow(waveA * waveB, 4.0) * uCausticIntensity * 0.14;

    // Keep left hero region extra calm for typography legibility
    float rightMask = smoothstep(0.18, 0.78, vUv.x);
    vec3 col = studio * (0.94 + 0.06 * uLightingIntensity) + vec3(0.98, 0.97, 1.0) * causticBand * rightMask;

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`;

export const GLASS_VERTEX_SHADER = `
  uniform float uLoopPhase;
  uniform float uDistortionStrength;
  uniform float uNormalDistortion;
  uniform vec2 uPointer;
  uniform float uLayerIndex;

  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying vec3 vViewPosition;
  varying vec3 vNormal;
  varying vec4 vClipPosition;
  varying float vCurvature;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Periodic seamless loop deformation (returns to exact starting state every 2*PI)
    float phase = uLoopPhase + uLayerIndex * 1.05;
    float wave1 = sin(pos.x * 1.45 + pos.y * 0.95 + sin(phase));
    float wave2 = cos(pos.y * 1.35 - pos.z * 1.1 + cos(phase));
    float disp = (wave1 * 0.6 + wave2 * 0.4) * uDistortionStrength * 0.18;

    // Subtle pointer-reactive sculptural tilt
    float pointerInfluence = (pos.x * uPointer.x + pos.y * uPointer.y) * 0.06;

    pos += normal * disp;
    pos.z += pointerInfluence;

    // Perturb normal analytically to match procedural wave curvature
    vec3 perturbedNormal = normalize(
      normal + vec3(
        cos(pos.x * 2.1 + sin(phase)) * uNormalDistortion * 0.28,
        sin(pos.y * 2.1 + cos(phase)) * uNormalDistortion * 0.28,
        0.0
      )
    );

    vNormal = normalize(normalMatrix * perturbedNormal);
    vCurvature = wave1 * wave2;

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPosition = worldPos.xyz;

    vec4 mvPos = viewMatrix * worldPos;
    vViewPosition = -mvPos.xyz;

    vClipPosition = projectionMatrix * mvPos;
    gl_Position = vClipPosition;
  }
`;

export const GLASS_FRAGMENT_SHADER = `
  uniform sampler2D uStudioMap;
  uniform float uGlassType; // 0 = clear, 1 = frosted, 2 = opal
  uniform float uIor;
  uniform float uThickness;
  uniform float uRoughness;
  uniform float uTransmission;
  uniform float uRefractionStrength;
  uniform float uFresnelIntensity;
  uniform float uEdgeHighlight;
  uniform float uDispersion;
  uniform float uIridescence;
  uniform float uFrosting;
  uniform float uMicrotexture;
  uniform float uCausticIntensity;
  uniform float uReflectionStrength;
  uniform float uLightingIntensity;
  uniform float uLoopPhase;
  uniform float uTransparentExport;

  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying vec3 vViewPosition;
  varying vec3 vNormal;
  varying vec4 vClipPosition;
  varying float vCurvature;

  float hash21(vec2 p) {
    p = fract(p * vec2(234.34, 435.345));
    p += dot(p, p + 34.23);
    return fract(p.x * p.y);
  }

  void main() {
    vec3 V = normalize(vViewPosition);
    vec3 N = normalize(vNormal);
    if (!gl_FrontFacing) {
      N = -N;
    }

    // Fine microtexture surface normal grain for frosted/tactile optical feel
    float grain = (hash21(vUv * 180.0) - 0.5) * uMicrotexture * 0.08;
    N = normalize(N + vec3(grain, -grain, 0.0));

    // Screen-space coordinates (0..1)
    vec2 screenUv = (vClipPosition.xy / max(0.0001, vClipPosition.w)) * 0.5 + 0.5;

    // Physical refraction ray offset modulated by IOR and thickness
    float eta = 1.0 / max(1.05, uIor);
    vec3 refractedRay = refract(-V, N, eta);
    vec2 refractOffset = (refractedRay.xy - (-V.xy)) * uRefractionStrength * (0.06 + uThickness * 0.045);

    // Chromatic dispersion across R, G, B wavelengths
    vec2 dispVec = refractOffset * (0.14 + uDispersion * 0.38);

    // Multi-tap frosted diffusion kernel (controlled by frosting + roughness)
    float blurRadius = (uFrosting * 0.7 + uRoughness * 0.3) * 0.018;
    vec2 o1 = vec2(0.866, 0.5) * blurRadius;
    vec2 o2 = vec2(-0.866, 0.5) * blurRadius;
    vec2 o3 = vec2(0.0, -1.0) * blurRadius;

    vec2 uvR = screenUv + refractOffset + dispVec;
    vec2 uvG = screenUv + refractOffset;
    vec2 uvB = screenUv + refractOffset - dispVec;

    float rChan = (
      texture2D(uStudioMap, uvR).r * 0.4 +
      texture2D(uStudioMap, uvR + o1).r * 0.2 +
      texture2D(uStudioMap, uvR + o2).r * 0.2 +
      texture2D(uStudioMap, uvR + o3).r * 0.2
    );
    float gChan = (
      texture2D(uStudioMap, uvG).g * 0.4 +
      texture2D(uStudioMap, uvG + o1).g * 0.2 +
      texture2D(uStudioMap, uvG + o2).g * 0.2 +
      texture2D(uStudioMap, uvG + o3).g * 0.2
    );
    float bChan = (
      texture2D(uStudioMap, uvB).b * 0.4 +
      texture2D(uStudioMap, uvB + o1).b * 0.2 +
      texture2D(uStudioMap, uvB + o2).b * 0.2 +
      texture2D(uStudioMap, uvB + o3).b * 0.2
    );

    vec3 transmittedColor = vec3(rChan, gChan, bChan);

    // Fresnel reflectance (Schlick approximation)
    float cosTheta = clamp(dot(V, N), 0.0, 1.0);
    float f0 = pow((uIor - 1.0) / (uIor + 1.0), 2.0);
    float fresnel = clamp((f0 + (1.0 - f0) * pow(1.0 - cosTheta, 3.2)) * uFresnelIntensity, 0.0, 1.0);

    // Dual Studio Key & Rim Lights for physical bevel specular highlights
    vec3 lightDirKey = normalize(vec3(0.65, 0.72, 0.85));
    vec3 lightDirRim = normalize(vec3(-0.75, 0.45, 0.55));
    vec3 HKey = normalize(V + lightDirKey);
    vec3 HRim = normalize(V + lightDirRim);

    float shininess = mix(140.0, 18.0, clamp(uRoughness, 0.0, 1.0));
    float specKey = pow(max(dot(N, HKey), 0.0), shininess) * uEdgeHighlight;
    float specRim = pow(max(dot(N, HRim), 0.0), shininess * 0.7) * uEdgeHighlight * 0.75;

    // Beveled rim light along grazing angles
    float rimBevel = pow(1.0 - cosTheta, 4.2) * uEdgeHighlight * 0.85;

    // Subtle thin-film iridescence in LUMEN pastel spectrum (Lavender #D8D0F7, Ice Blue #C9DAFA, Champagne #F6DCCA)
    float iridPhase = (1.0 - cosTheta) * 5.5 + vCurvature * 2.0 + sin(uLoopPhase);
    vec3 lavender = vec3(0.847, 0.816, 0.969);
    vec3 iceBlue = vec3(0.788, 0.855, 0.980);
    vec3 champagne = vec3(0.965, 0.863, 0.792);

    vec3 iridTint = mix(
      lavender,
      mix(iceBlue, champagne, 0.5 + 0.5 * sin(iridPhase)),
      0.5 + 0.5 * cos(iridPhase * 0.8)
    );

    // Concentrated caustic band across curved glass folds
    float causticRidge = pow(clamp(1.0 - abs(dot(N, vec3(0.35, 0.65, 0.67))), 0.0, 1.0), 6.0);
    vec3 causticLight = vec3(0.96, 0.97, 1.0) * causticRidge * uCausticIntensity * 0.55;

    // Material treatment body color (Clear vs Frosted vs Opal)
    vec3 clearBody = mix(vec3(0.93, 0.96, 0.995), iridTint, uIridescence * 0.25);
    vec3 frostedBody = mix(vec3(0.955, 0.968, 0.992), iceBlue, 0.22);
    vec3 opalBody = mix(vec3(0.97, 0.965, 0.995), iridTint, 0.42 + uIridescence * 0.35);

    vec3 glassTint = clearBody;
    if (uGlassType > 0.5 && uGlassType < 1.5) {
      glassTint = frostedBody;
    } else if (uGlassType >= 1.5) {
      glassTint = opalBody;
    }

    // Volume attenuation (thickness slightly deepens the optical tint)
    float volumeFactor = clamp(0.14 + uThickness * 0.12 + (1.0 - uTransmission) * 0.45, 0.1, 0.82);
    vec3 bodyComposite = mix(transmittedColor, glassTint, volumeFactor);

    // Combine studio reflections, iridescence, caustics, and bevel highlights
    vec3 envReflection = mix(iceBlue, champagne, N.y * 0.5 + 0.5) * fresnel * uReflectionStrength * 0.55;
    vec3 specularTotal = (vec3(1.0, 0.99, 0.98) * specKey + lavender * specRim + vec3(0.94, 0.96, 1.0) * rimBevel) * uLightingIntensity;

    // Subtle shadow grounding at lower folds
    float foldShadow = smoothstep(-0.8, 0.3, N.y) * 0.08 + 0.92;

    vec3 finalRgb = (bodyComposite * foldShadow) + envReflection + specularTotal + causticLight;
    finalRgb = clamp(finalRgb, 0.0, 1.0);

    // Alpha calculation: opaque studio composite vs transparent isolated glass export
    float sculpturalAlpha = clamp(
      0.34 + fresnel * 0.48 + (specKey + specRim + rimBevel) * 0.38 + uFrosting * 0.22 + causticRidge * 0.2,
      0.28,
      0.98
    );
    float outAlpha = mix(0.94, sculpturalAlpha, uTransparentExport);

    gl_FragColor = vec4(finalRgb, outAlpha);
  }
`;

export function createGlassShaderMaterial(
  studioTexture: THREE.Texture,
  materialParams: GlassMaterialParams,
  sceneParams: GlassSceneParams,
  layerIndex = 0,
  transparentExport = false
): THREE.ShaderMaterial {
  const glassTypeNum =
    materialParams.glassType === 'clear'
      ? 0.0
      : materialParams.glassType === 'frosted'
      ? 1.0
      : 2.0;

  return new THREE.ShaderMaterial({
    uniforms: {
      uStudioMap: { value: studioTexture },
      uGlassType: { value: glassTypeNum },
      uIor: { value: materialParams.ior },
      uThickness: { value: materialParams.thickness },
      uRoughness: { value: materialParams.roughness },
      uTransmission: { value: materialParams.transmission },
      uRefractionStrength: { value: materialParams.refractionStrength },
      uFresnelIntensity: { value: materialParams.fresnelIntensity },
      uEdgeHighlight: { value: materialParams.edgeHighlight },
      uDispersion: { value: materialParams.dispersion },
      uIridescence: { value: materialParams.iridescence },
      uFrosting: { value: materialParams.frosting },
      uNormalDistortion: { value: materialParams.normalDistortion },
      uMicrotexture: { value: materialParams.microtexture },
      uCausticIntensity: { value: materialParams.causticIntensity },
      uReflectionStrength: { value: materialParams.reflectionStrength },
      uLightingIntensity: { value: sceneParams.lightingIntensity },
      uDistortionStrength: { value: sceneParams.distortionStrength },
      uLoopPhase: { value: 0.0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uLayerIndex: { value: layerIndex },
      uTransparentExport: { value: transparentExport ? 1.0 : 0.0 },
    },
    vertexShader: GLASS_VERTEX_SHADER,
    fragmentShader: GLASS_FRAGMENT_SHADER,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}

export function updateGlassShaderUniforms(
  mat: THREE.ShaderMaterial,
  materialParams: GlassMaterialParams,
  sceneParams: GlassSceneParams,
  loopPhase: number,
  pointerX: number,
  pointerY: number,
  transparentExport: boolean
): void {
  const glassTypeNum =
    materialParams.glassType === 'clear'
      ? 0.0
      : materialParams.glassType === 'frosted'
      ? 1.0
      : 2.0;

  const u = mat.uniforms;
  u.uGlassType.value = glassTypeNum;
  u.uIor.value = materialParams.ior;
  u.uThickness.value = materialParams.thickness;
  u.uRoughness.value = materialParams.roughness;
  u.uTransmission.value = materialParams.transmission;
  u.uRefractionStrength.value = materialParams.refractionStrength;
  u.uFresnelIntensity.value = materialParams.fresnelIntensity;
  u.uEdgeHighlight.value = materialParams.edgeHighlight;
  u.uDispersion.value = materialParams.dispersion;
  u.uIridescence.value = materialParams.iridescence;
  u.uFrosting.value = materialParams.frosting;
  u.uNormalDistortion.value = materialParams.normalDistortion;
  u.uMicrotexture.value = materialParams.microtexture;
  u.uCausticIntensity.value = materialParams.causticIntensity;
  u.uReflectionStrength.value = materialParams.reflectionStrength;
  u.uLightingIntensity.value = sceneParams.lightingIntensity;
  u.uDistortionStrength.value = sceneParams.distortionStrength;
  u.uLoopPhase.value = loopPhase;
  u.uPointer.value.set(pointerX, pointerY);
  u.uTransparentExport.value = transparentExport ? 1.0 : 0.0;
}
]]>
    </file>
    <file path="src/app/(lumen)/lumen/glass/glassTypes.ts">
<![CDATA[export type GlassPresetId =
  | 'opal-ribbon'
  | 'frosted-fold'
  | 'liquid-lens'
  | 'glass-strata'
  | 'refractive-halo'
  | 'caustic-window';

export type GlassTreatment = 'clear' | 'frosted' | 'opal';

export type GlassQuality = 'auto' | 'high' | 'medium' | 'low';

export type ExportAspectRatio = '16:9' | '21:9' | '4:5' | '1:1' | '9:16';

export interface ExportResolution {
  id: string;
  label: string;
  baseWidth: number;
  baseHeight: number;
}

export interface GlassMaterialParams {
  glassType: GlassTreatment;
  ior: number; // 1.1 to 2.4
  thickness: number; // 0.1 to 3.0
  roughness: number; // 0.0 to 1.0
  transmission: number; // 0.2 to 1.0
  refractionStrength: number; // 0.0 to 1.5
  fresnelIntensity: number; // 0.1 to 2.0
  edgeHighlight: number; // 0.0 to 2.0
  dispersion: number; // 0.0 to 1.0
  iridescence: number; // 0.0 to 1.0
  frosting: number; // 0.0 to 1.0
  normalDistortion: number; // 0.0 to 1.0
  microtexture: number; // 0.0 to 1.0
  causticIntensity: number; // 0.0 to 1.5
  reflectionStrength: number; // 0.1 to 2.0
}

export interface GlassSceneParams {
  lightingIntensity: number; // 0.4 to 2.0
  motionSpeed: number; // 0.0 to 2.5
  distortionStrength: number; // 0.0 to 1.5
  shapeDensity: number; // 1 to 6
  scale: number; // 0.5 to 1.8
  positionX: number; // -1.5 to 1.5
  positionY: number; // -1.0 to 1.0
  seed: number; // integer seed
  loopDurationSec: number; // 8 to 16
}

export interface GlassPresetConfig {
  id: GlassPresetId;
  name: string;
  subtitle: string;
  description: string;
  recommendedSection: string;
  material: GlassMaterialParams;
  scene: GlassSceneParams;
}

export interface GlassBackgroundProps {
  preset?: GlassPresetId;
  configOverrides?: Partial<{
    material: Partial<GlassMaterialParams>;
    scene: Partial<GlassSceneParams>;
  }>;
  speed?: number;
  intensity?: number;
  seed?: number;
  interactive?: boolean;
  quality?: GlassQuality;
  renderMode?: 'live' | 'static';
  transparentExport?: boolean;
  className?: string;
}

export const EXPORT_ASPECT_RATIOS: {
  id: ExportAspectRatio;
  label: string;
  ratio: number;
}[] = [
  { id: '16:9', label: '16:9 Wide', ratio: 16 / 9 },
  { id: '21:9', label: '21:9 Ultrawide', ratio: 21 / 9 },
  { id: '4:5', label: '4:5 Editorial', ratio: 4 / 5 },
  { id: '1:1', label: '1:1 Square', ratio: 1 },
  { id: '9:16', label: '9:16 Portrait', ratio: 9 / 16 },
];

export const EXPORT_RESOLUTIONS: ExportResolution[] = [
  { id: '1080p', label: '1920 × 1080 (FHD)', baseWidth: 1920, baseHeight: 1080 },
  { id: '1440p', label: '2560 × 1440 (QHD)', baseWidth: 2560, baseHeight: 1440 },
  { id: '2160p', label: '3840 × 2160 (4K UHD)', baseWidth: 3840, baseHeight: 2160 },
];

/**
 * Deterministic seeded PRNG (Mulberry32)
 */
export function createSeededRandom(seed: number): () => number {
  let state = (seed >>> 0) || 1;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Default treatments for Clear, Frosted, and Opal glass
 */
export const GLASS_TREATMENT_DEFAULTS: Record<GlassTreatment, Partial<GlassMaterialParams>> = {
  clear: {
    glassType: 'clear',
    ior: 1.52,
    roughness: 0.06,
    transmission: 0.94,
    frosting: 0.04,
    refractionStrength: 0.85,
    fresnelIntensity: 1.25,
    edgeHighlight: 1.35,
    iridescence: 0.22,
    dispersion: 0.28,
  },
  frosted: {
    glassType: 'frosted',
    ior: 1.46,
    roughness: 0.42,
    transmission: 0.82,
    frosting: 0.68,
    refractionStrength: 0.55,
    fresnelIntensity: 0.95,
    edgeHighlight: 1.05,
    iridescence: 0.15,
    dispersion: 0.14,
  },
  opal: {
    glassType: 'opal',
    ior: 1.56,
    roughness: 0.18,
    transmission: 0.88,
    frosting: 0.28,
    refractionStrength: 0.78,
    fresnelIntensity: 1.35,
    edgeHighlight: 1.25,
    iridescence: 0.58,
    dispersion: 0.36,
  },
};

export const GLASS_PRESETS: Record<GlassPresetId, GlassPresetConfig> = {
  'opal-ribbon': {
    id: 'opal-ribbon',
    name: 'Preset 01 — Opal Ribbon',
    subtitle: 'Primary Hero Sculpture',
    description:
      'A sweeping translucent glass ribbon with beveled edges, pearlescent lavender-blue curvature highlights, and calm left-side negative space for hero typography.',
    recommendedSection: 'Hero Section',
    material: {
      glassType: 'opal',
      ior: 1.54,
      thickness: 1.45,
      roughness: 0.14,
      transmission: 0.9,
      refractionStrength: 0.82,
      fresnelIntensity: 1.32,
      edgeHighlight: 1.35,
      dispersion: 0.34,
      iridescence: 0.52,
      frosting: 0.22,
      normalDistortion: 0.32,
      microtexture: 0.12,
      causticIntensity: 0.48,
      reflectionStrength: 1.18,
    },
    scene: {
      lightingIntensity: 1.15,
      motionSpeed: 0.65,
      distortionStrength: 0.45,
      shapeDensity: 3,
      scale: 1.05,
      positionX: 0.38,
      positionY: 0.04,
      seed: 1042,
      loopDurationSec: 12,
    },
  },
  'frosted-fold': {
    id: 'frosted-fold',
    name: 'Preset 02 — Frosted Fold',
    subtitle: 'Architectural Glazing Sheets',
    description:
      'Large folded sheets of frosted architectural glass with diffused transmission, subtle micro-roughness, and silver-blue edge illumination.',
    recommendedSection: 'The Problem Section',
    material: {
      glassType: 'frosted',
      ior: 1.47,
      thickness: 1.15,
      roughness: 0.44,
      transmission: 0.83,
      refractionStrength: 0.52,
      fresnelIntensity: 1.05,
      edgeHighlight: 1.12,
      dispersion: 0.16,
      iridescence: 0.18,
      frosting: 0.65,
      normalDistortion: 0.24,
      microtexture: 0.35,
      causticIntensity: 0.28,
      reflectionStrength: 0.92,
    },
    scene: {
      lightingIntensity: 1.08,
      motionSpeed: 0.5,
      distortionStrength: 0.35,
      shapeDensity: 3,
      scale: 1.12,
      positionX: 0.12,
      positionY: 0.0,
      seed: 2084,
      loopDurationSec: 14,
    },
  },
  'liquid-lens': {
    id: 'liquid-lens',
    name: 'Preset 03 — Liquid Lens',
    subtitle: 'Optical Lens Field',
    description:
      'Three sculpted biconvex optical lenses that bend the underlying studio grid and light bands with crisp bevels and subtle chromatic dispersion.',
    recommendedSection: 'Practical Credibility Section',
    material: {
      glassType: 'clear',
      ior: 1.62,
      thickness: 1.85,
      roughness: 0.06,
      transmission: 0.95,
      refractionStrength: 1.05,
      fresnelIntensity: 1.4,
      edgeHighlight: 1.48,
      dispersion: 0.42,
      iridescence: 0.28,
      frosting: 0.06,
      normalDistortion: 0.38,
      microtexture: 0.08,
      causticIntensity: 0.68,
      reflectionStrength: 1.32,
    },
    scene: {
      lightingIntensity: 1.18,
      motionSpeed: 0.58,
      distortionStrength: 0.48,
      shapeDensity: 3,
      scale: 1.0,
      positionX: 0.2,
      positionY: -0.02,
      seed: 3190,
      loopDurationSec: 10,
    },
  },
  'glass-strata': {
    id: 'glass-strata',
    name: 'Preset 04 — Glass Strata',
    subtitle: 'Layered Glass Architecture',
    description:
      'Terraced translucent glass panes suspended at staggered depths with beveled edges, contact-shadow grounding, and multi-layer parallax.',
    recommendedSection: 'Playbook Preview Section',
    material: {
      glassType: 'opal',
      ior: 1.51,
      thickness: 1.3,
      roughness: 0.22,
      transmission: 0.87,
      refractionStrength: 0.72,
      fresnelIntensity: 1.2,
      edgeHighlight: 1.3,
      dispersion: 0.26,
      iridescence: 0.42,
      frosting: 0.32,
      normalDistortion: 0.2,
      microtexture: 0.18,
      causticIntensity: 0.38,
      reflectionStrength: 1.1,
    },
    scene: {
      lightingIntensity: 1.1,
      motionSpeed: 0.52,
      distortionStrength: 0.3,
      shapeDensity: 4,
      scale: 1.04,
      positionX: -0.08,
      positionY: 0.02,
      seed: 4412,
      loopDurationSec: 12,
    },
  },
  'refractive-halo': {
    id: 'refractive-halo',
    name: 'Preset 05 — Refractive Halo',
    subtitle: 'Sculptural Optical Ring',
    description:
      'A thick, polished elliptical optical ring suspended in studio light, producing traveling edge highlights and warm champagne-lavender refraction.',
    recommendedSection: 'Final Download CTA Section',
    material: {
      glassType: 'clear',
      ior: 1.58,
      thickness: 1.65,
      roughness: 0.1,
      transmission: 0.92,
      refractionStrength: 0.94,
      fresnelIntensity: 1.45,
      edgeHighlight: 1.55,
      dispersion: 0.38,
      iridescence: 0.46,
      frosting: 0.12,
      normalDistortion: 0.28,
      microtexture: 0.1,
      causticIntensity: 0.72,
      reflectionStrength: 1.28,
    },
    scene: {
      lightingIntensity: 1.2,
      motionSpeed: 0.6,
      distortionStrength: 0.36,
      shapeDensity: 2,
      scale: 1.08,
      positionX: 0.24,
      positionY: 0.0,
      seed: 5580,
      loopDurationSec: 14,
    },
  },
  'caustic-window': {
    id: 'caustic-window',
    name: 'Preset 06 — Caustic Window',
    subtitle: 'Refracted Studio Sunlight',
    description:
      'Minimalist curved optical louvers casting concentrated caustic light bands and gentle refracted daylight across a quiet architectural studio wall.',
    recommendedSection: 'Benefits & How It Works Sections',
    material: {
      glassType: 'clear',
      ior: 1.49,
      thickness: 1.05,
      roughness: 0.12,
      transmission: 0.93,
      refractionStrength: 0.68,
      fresnelIntensity: 1.1,
      edgeHighlight: 1.15,
      dispersion: 0.22,
      iridescence: 0.24,
      frosting: 0.18,
      normalDistortion: 0.22,
      microtexture: 0.14,
      causticIntensity: 1.15,
      reflectionStrength: 1.0,
    },
    scene: {
      lightingIntensity: 1.22,
      motionSpeed: 0.45,
      distortionStrength: 0.28,
      shapeDensity: 3,
      scale: 1.1,
      positionX: 0.05,
      positionY: 0.08,
      seed: 6720,
      loopDurationSec: 16,
    },
  },
};

export const GLASS_PRESET_LIST: GlassPresetConfig[] = Object.values(GLASS_PRESETS);

export function computeExportDimensions(
  resolution: ExportResolution,
  aspectRatio: ExportAspectRatio
): { width: number; height: number } {
  const ratioObj =
    EXPORT_ASPECT_RATIOS.find((r) => r.id === aspectRatio) || EXPORT_ASPECT_RATIOS[0];
  const targetRatio = ratioObj.ratio;

  if (targetRatio >= 1) {
    const width = resolution.baseWidth;
    const height = Math.round(width / targetRatio / 2) * 2;
    return { width, height };
  } else {
    const height = resolution.baseWidth;
    const width = Math.round(height * targetRatio / 2) * 2;
    return { width, height };
  }
}

export function computeResponsiveFraming(
  viewportWidth: number,
  viewportHeight: number,
  basePositionX: number,
  basePositionY: number,
  baseScale: number
): { offsetX: number; offsetY: number; effectiveScale: number; cameraZ: number } {
  const aspect = viewportWidth / Math.max(1, viewportHeight);

  if (viewportWidth < 640 || aspect < 0.85) {
    // Portrait mobile: keep glass sculpture lower/centered and slightly compact so hero copy & form stay clear
    return {
      offsetX: basePositionX * 0.35,
      offsetY: basePositionY - 0.18,
      effectiveScale: baseScale * 0.82,
      cameraZ: 6.4,
    };
  }

  if (viewportWidth < 1024) {
    // Tablet
    return {
      offsetX: basePositionX * 0.65,
      offsetY: basePositionY - 0.06,
      effectiveScale: baseScale * 0.92,
      cameraZ: 5.8,
    };
  }

  // Desktop & Ultrawide
  return {
    offsetX: basePositionX,
    offsetY: basePositionY,
    effectiveScale: baseScale,
    cameraZ: 5.2,
  };
}

export function serializePresetConfig(config: GlassPresetConfig): string {
  return JSON.stringify(config, null, 2);
}

export function generateReactComponentSnippet(config: GlassPresetConfig): string {
  return `<GlassBackground
  preset="${config.id}"
  seed={${config.scene.seed}}
  speed={${config.scene.motionSpeed}}
  intensity={${config.scene.lightingIntensity}}
  quality="auto"
  interactive
/>`;
}
]]>
    </file>
    <file path="src/app/(lumen)/lumen/utils/workflowLogic.ts">
<![CDATA[export type WorkspaceStageId = 'input' | 'processing' | 'output';
export type ProcessingSubStep = 'classify' | 'summarize' | 'route';
export type PlaybookPreviewId = 'find' | 'design' | 'build';

export interface ValidationResult {
  valid: boolean;
  normalizedEmail: string;
  error?: string;
}

export interface SubmissionGuardResult {
  allowed: boolean;
  reason?: string;
}

export interface IncomingTaskScenario {
  id: string;
  categoryLabel: string;
  title: string;
  sourceMeta: string;
  classification: {
    intent: string;
    priority: string;
    department: string;
  };
  summaryBullets: string[];
  routeDestination: string;
  outputDraft: {
    summaryTitle: string;
    prioritizedTask: string;
    preparedResponse: string;
    reviewStatus: string;
  };
}

export interface PlaybookPreviewPage {
  id: PlaybookPreviewId;
  stepNumber: string;
  tabLabel: string;
  pageNumber: string;
  chapterTitle: string;
  subtitle: string;
  summary: string;
  sections: {
    heading: string;
    items: string[];
  }[];
  promptTemplate?: {
    label: string;
    promptText: string;
  };
}

export interface HowItWorksStep {
  id: 'map' | 'automate' | 'review';
  number: string;
  label: string;
  headline: string;
  description: string;
  nodes: {
    id: string;
    title: string;
    detail: string;
    kind: 'trigger' | 'input' | 'ai' | 'checkpoint' | 'output';
  }[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const STAGE_CAPTIONS: Record<WorkspaceStageId, string> = {
  input: 'A new request enters the workflow.',
  processing:
    'The workflow classifies the request, extracts important information, and proposes a destination.',
  output: 'A structured draft and next actions are prepared for review.',
};

export const DEFAULT_STAGE_CAPTION =
  'Select any stage panel—Input, AI Processing, or Output—to inspect how scattered requests become structured, review-ready work.';

export function getStageCaption(stage: WorkspaceStageId | null): string {
  if (!stage) return DEFAULT_STAGE_CAPTION;
  return STAGE_CAPTIONS[stage];
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateWorkEmail(rawInput: string): ValidationResult {
  const normalizedEmail = rawInput.trim();

  if (!normalizedEmail) {
    return {
      valid: false,
      normalizedEmail: '',
      error: 'Please enter your work email address to access the playbook.',
    };
  }

  if (normalizedEmail.length > 254 || !EMAIL_REGEX.test(normalizedEmail)) {
    return {
      valid: false,
      normalizedEmail,
      error: 'Please enter a valid email address (for example, name@company.com).',
    };
  }

  return {
    valid: true,
    normalizedEmail: normalizedEmail.toLowerCase(),
  };
}

export function canSubmitEmail(
  normalizedEmail: string,
  lastSubmittedEmail: string | null,
  lastSubmitTimestamp: number | null,
  nowTimestamp: number,
  cooldownMs = 4000
): SubmissionGuardResult {
  if (!normalizedEmail) {
    return { allowed: false, reason: 'Email is required.' };
  }

  if (
    lastSubmittedEmail &&
    lastSubmittedEmail.toLowerCase() === normalizedEmail.toLowerCase() &&
    lastSubmitTimestamp !== null &&
    nowTimestamp - lastSubmitTimestamp < cooldownMs
  ) {
    return {
      allowed: false,
      reason: 'Submission already processed. Your playbook access panel is ready.',
    };
  }

  return { allowed: true };
}

export function getPreviewStackOrder(
  activePreviewId: PlaybookPreviewId
): Record<PlaybookPreviewId, 'front' | 'middle' | 'back'> {
  if (activePreviewId === 'find') {
    return { find: 'front', design: 'middle', build: 'back' };
  }
  if (activePreviewId === 'design') {
    return { design: 'front', build: 'middle', find: 'back' };
  }
  return { build: 'front', find: 'middle', design: 'back' };
}

export const WORKSPACE_SCENARIOS: IncomingTaskScenario[] = [
  {
    id: 'emails',
    categoryLabel: 'Emails',
    title: 'Client scope revision & Q4 timeline inquiry',
    sourceMeta: 'Inbox · Enterprise Operations',
    classification: {
      intent: 'Scope Change Request',
      priority: 'High Priority · 24h SLA',
      department: 'Delivery & Account Lead',
    },
    summaryBullets: [
      'Client requested adding regional compliance review before Nov 14 milestone.',
      'Requires updated milestone table and confirmation of review owner.',
    ],
    routeDestination: 'Account Lead Queue + Project Tracker',
    outputDraft: {
      summaryTitle: 'Scope Revision Brief — Regional Compliance',
      prioritizedTask: 'Verify timeline impact with Legal & update Nov 14 schedule',
      preparedResponse: 'Draft reply acknowledging scope addition with proposed review dates',
      reviewStatus: 'Awaiting human approval before sending',
    },
  },
  {
    id: 'documents',
    categoryLabel: 'Documents',
    title: 'Vendor security questionnaire (28 pages)',
    sourceMeta: 'PDF Upload · Procurement',
    classification: {
      intent: 'Security & Compliance Review',
      priority: 'Standard · 3-Day Window',
      department: 'Security Operations',
    },
    summaryBullets: [
      'Extracted 14 standard SOC2 controls and 3 custom data-retention clauses.',
      'Flagged Section 4.2 (sub-processor notice window) for manual legal sign-off.',
    ],
    routeDestination: 'Security Review Board',
    outputDraft: {
      summaryTitle: 'Extracted Clause Matrix & Exception Report',
      prioritizedTask: 'Inspect 3 custom retention clauses in Section 4.2',
      preparedResponse: 'Pre-filled standard responses for 14 verified control items',
      reviewStatus: 'Ready for Security Lead verification',
    },
  },
  {
    id: 'tasks',
    categoryLabel: 'Tasks',
    title: 'Onboarding checklist request for 4 new analysts',
    sourceMeta: 'Service Desk · Internal Ops',
    classification: {
      intent: 'Internal Provisioning',
      priority: 'Scheduled · Starts Monday',
      department: 'IT & People Operations',
    },
    summaryBullets: [
      'Consolidated workspace permissions, dataset access, and orientation schedule.',
      'Grouped role-specific permissions by analytics team function.',
    ],
    routeDestination: 'IT Provisioning & Manager Approval',
    outputDraft: {
      summaryTitle: 'Structured 4-Person Onboarding Packet',
      prioritizedTask: 'Approve dataset access tier for Analytics Cohort',
      preparedResponse: 'Welcome schedule and workspace guide prepared for distribution',
      reviewStatus: 'Pending manager sign-off checkpoint',
    },
  },
  {
    id: 'notes',
    categoryLabel: 'Meeting notes',
    title: 'Weekly product architecture sync transcript',
    sourceMeta: 'Transcript · 42 mins',
    classification: {
      intent: 'Action Item Extraction',
      priority: 'Normal · Weekly Cadence',
      department: 'Product Engineering',
    },
    summaryBullets: [
      'Identified 3 architecture decisions and 5 assigned engineering follow-ups.',
      'Separated unresolved API pagination question into dedicated follow-up thread.',
    ],
    routeDestination: 'Engineering Sprint Board',
    outputDraft: {
      summaryTitle: 'Architecture Sync Decisions & Action Log',
      prioritizedTask: 'Finalize API pagination schema before Thursday review',
      preparedResponse: 'Formatted summary brief drafted for team channel',
      reviewStatus: 'Ready for Tech Lead review',
    },
  },
];

export const PLAYBOOK_PREVIEW_PAGES: PlaybookPreviewPage[] = [
  {
    id: 'find',
    stepNumber: '01',
    tabLabel: '01 — Find the right workflows',
    pageNumber: 'PAGE 04 / 16',
    chapterTitle: 'Automation Opportunity Checklist',
    subtitle: 'Score repetitive recurring work before writing a single prompt.',
    summary:
      'Not every task benefits from AI automation. Start with high-frequency, rules-guided tasks where structured preparation saves time while keeping final judgment in human hands.',
    sections: [
      {
        heading: 'Primary Qualification Criteria',
        items: [
          'The task occurs at least 5–10 times per week across a consistent format.',
          'Inputs arrive as unstructured text (emails, notes, forms, or PDFs) that require sorting or synthesis.',
          'The desired output follows a repeatable template (summary brief, task ticket, or draft response).',
          'A clear human reviewer can verify the output in under two minutes.',
        ],
      },
      {
        heading: 'Tasks to Keep Manual First',
        items: [
          'One-off strategic decisions with ambiguous goals or unstated context.',
          'Sensitive personnel, legal, or financial commitments lacking a review gate.',
        ],
      },
    ],
    promptTemplate: {
      label: 'DIAGNOSTIC AUDIT RULE',
      promptText:
        'If a task takes 15 minutes to prepare and 2 minutes to verify, automate the preparation—never the verification.',
    },
  },
  {
    id: 'design',
    stepNumber: '02',
    tabLabel: '02 — Design the process',
    pageNumber: 'PAGE 08 / 16',
    chapterTitle: 'Workflow Mapping Framework',
    subtitle: 'Decompose work into Trigger, Input, AI Step, Checkpoint, and Output.',
    summary:
      'Reliable workflows separate data collection, language processing, and deterministic routing into explicit stages so errors are easy to spot and correct.',
    sections: [
      {
        heading: 'The Five-Stage Blueprint',
        items: [
          '01. Trigger: Define the exact event that starts the workflow (new form entry, tagged email, uploaded transcript).',
          '02. Context Assembly: Gather only the required reference fields and strip unrelated sensitive data.',
          '03. Structured AI Step: Constrain the model to three focused jobs—Classify, Summarize, and Propose Route.',
          '04. Human Checkpoint: Present the source excerpt side-by-side with the proposed draft for fast approval.',
        ],
      },
    ],
    promptTemplate: {
      label: 'REUSABLE PROMPT STRUCTURE',
      promptText:
        'Role: Operations Analyst | Input: [Source Text] | Tasks: 1) Classify category & urgency 2) Summarize in 3 factual bullets 3) Draft response using [Template]. Do not invent facts outside the source.',
    },
  },
  {
    id: 'build',
    stepNumber: '03',
    tabLabel: '03 — Build and review',
    pageNumber: 'PAGE 12 / 16',
    chapterTitle: 'Worked Example: Incoming Request Triage',
    subtitle: 'How a 4-step workflow turns scattered inbound emails into review-ready responses.',
    summary:
      'See how an operations team structures inbound client requests without losing oversight or sending unverified automated replies.',
    sections: [
      {
        heading: 'End-to-End Execution Path',
        items: [
          'Step A — Intake: Shared inbox message arrives with project questions and attachment notes.',
          'Step B — Classification & Extraction: Workflow tags request type, extracts requested dates, and highlights missing fields.',
          'Step C — Draft Preparation: Creates an internal summary card and a draft reply grounded in approved policy docs.',
          'Step D — Human Review Gate: Account owner reviews the summary, adjusts tone if needed, and approves delivery.',
        ],
      },
    ],
    promptTemplate: {
      label: 'VERIFICATION CHECKLIST',
      promptText:
        'Verify before approval: Are extracted dates accurate? Are uncertain items explicitly flagged? Does the draft match approved scope?',
    },
  },
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    id: 'map',
    number: 'STEP 01',
    label: 'MAP',
    headline: 'Understand the task.',
    description: 'Identify triggers, inputs, decisions, and outputs before selecting tools.',
    nodes: [
      {
        id: 'trigger',
        title: 'Trigger Event',
        detail: 'Inbound client email or meeting transcript arrives',
        kind: 'trigger',
      },
      {
        id: 'inputs',
        title: 'Raw Inputs',
        detail: 'Unstructured message body, attachments, and historical context',
        kind: 'input',
      },
      {
        id: 'decisions',
        title: 'Decision Rules',
        detail: 'Urgency criteria, routing owner, and required response format',
        kind: 'ai',
      },
      {
        id: 'outputs',
        title: 'Target Output',
        detail: 'Structured brief and prepared response draft',
        kind: 'output',
      },
    ],
  },
  {
    id: 'automate',
    number: 'STEP 02',
    label: 'AUTOMATE',
    headline: 'Design the steps that AI and connected tools can support.',
    description: 'Clarify where AI classification and drafting help—and where human oversight is necessary.',
    nodes: [
      {
        id: 'trigger',
        title: 'Structured Intake',
        detail: 'Normalized request payload enters workflow pipeline',
        kind: 'trigger',
      },
      {
        id: 'inputs',
        title: 'AI Classify & Summarize',
        detail: 'Extracts key entities, summarizes intent, and tags priority',
        kind: 'ai',
      },
      {
        id: 'decisions',
        title: 'Human Oversight Gate',
        detail: 'Routes edge cases and external replies to designated reviewer',
        kind: 'checkpoint',
      },
      {
        id: 'outputs',
        title: 'Draft & Task Creation',
        detail: 'Populates workspace ticket and prepares response draft',
        kind: 'output',
      },
    ],
  },
  {
    id: 'review',
    number: 'STEP 03',
    label: 'REVIEW',
    headline: 'Test the workflow, verify outputs, and improve the process.',
    description: 'Run real sample inputs, verify accuracy against source data, and refine prompt constraints.',
    nodes: [
      {
        id: 'trigger',
        title: 'Sample Test Run',
        detail: 'Evaluate workflow against 10 representative real requests',
        kind: 'trigger',
      },
      {
        id: 'inputs',
        title: 'Factual Verification',
        detail: 'Confirm zero fabricated details in summaries or dates',
        kind: 'checkpoint',
      },
      {
        id: 'decisions',
        title: 'Prompt & Rule Tuning',
        detail: 'Tighten formatting rules and fallback handling',
        kind: 'ai',
      },
      {
        id: 'outputs',
        title: 'Verified Production Workflow',
        detail: 'Repeatable, auditable workflow with clear human sign-off',
        kind: 'output',
      },
    ],
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'free',
    question: 'Is the playbook free?',
    answer:
      'Yes. The AI Workflow Playbook is offered as a free downloadable resource with no subscription or credit card required.',
  },
  {
    id: 'technical',
    question: 'Do I need technical experience?',
    answer:
      'No. The introductory frameworks, opportunity checklists, and workflow mapping templates are designed to be clear and practical without advanced programming skills.',
  },
  {
    id: 'platform',
    question: 'Does the guide require a specific AI platform?',
    answer:
      'No. The core workflow planning concepts—mapping triggers, structuring prompts, and placing review checkpoints—can be adapted to the tools and platforms your team already uses.',
  },
  {
    id: 'receive',
    question: 'What will I receive?',
    answer:
      'You receive a 16-page PDF guide containing workflow planning frameworks, the automation opportunity checklist, worked before-and-after examples, reusable prompt structures, and an implementation verification checklist.',
  },
  {
    id: 'automatic',
    question: 'Will the workflows run automatically?',
    answer:
      'No. The playbook helps you design and structure workflows; implementing them in your environment requires connecting your chosen tools, configuring permissions, and maintaining human review.',
  },
  {
    id: 'privacy',
    question: 'How is my email used?',
    answer:
      'This interactive preview runs in client-side demonstration mode: your work email is validated locally in your browser to unlock the playbook preview and download panel, and is not transmitted to an external marketing database or third-party mailing list.',
  },
];
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/background/BackgroundMotionController.ts">
<![CDATA[import { useEffect, useState } from 'react';

export interface ScrollAtmosphereState {
  scrollProgress: number; // 0..1 across full document
  parallaxOffsetY: number; // subtle vertical parallax in px
  refractionModulation: number; // gentle optical modulation across scroll
}

/**
 * Pure calculation of environmental scroll state for deterministic unit testing
 * and smooth runtime updates.
 */
export function computeScrollAtmosphereState(
  scrollY: number,
  maxScroll: number,
  reducedMotion = false
): ScrollAtmosphereState {
  const safeMax = Math.max(1, maxScroll);
  const clampedScroll = Math.max(0, Math.min(safeMax, scrollY));
  const scrollProgress = clampedScroll / safeMax;

  if (reducedMotion) {
    return {
      scrollProgress,
      parallaxOffsetY: 0,
      refractionModulation: 1.0,
    };
  }

  // Subtle slow environmental parallax (moves much slower than foreground content)
  const parallaxOffsetY = -clampedScroll * 0.045 || 0;
  const refractionModulation = 0.92 + Math.sin(scrollProgress * Math.PI) * 0.16;

  return {
    scrollProgress,
    parallaxOffsetY,
    refractionModulation,
  };
}

/**
 * Single global environmental motion hook that tracks document scroll progress
 * passively without competing with content ScrollTrigger timelines.
 */
export function useBackgroundMotionController(): ScrollAtmosphereState {
  const [state, setState] = useState<ScrollAtmosphereState>({
    scrollProgress: 0,
    parallaxOffsetY: 0,
    refractionModulation: 1.0,
  });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const docEl = document.documentElement;
      const maxScroll = Math.max(1, docEl.scrollHeight - window.innerHeight);
      const nextState = computeScrollAtmosphereState(
        window.scrollY || window.pageYOffset || 0,
        maxScroll,
        prefersReducedMotion
      );
      setState(nextState);
    };

    const onScrollOrResize = () => {
      if (!ticking) {
        ticking = true;
        rafId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  return state;
}
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/background/PageAtmosphere.tsx">
<![CDATA[import React from 'react';
import { GlassPresetId, GlassPresetConfig } from '../../glass/glassTypes';
import { GlassBackground } from '../GlassBackground';
import { useBackgroundMotionController } from './BackgroundMotionController';

interface PageAtmosphereProps {
  activePreset: GlassPresetId;
  customConfig: GlassPresetConfig | null;
}

/**
 * Single global atmospheric background mounted once at the root of the landing page.
 * Owns the unified #F8F9FC base canvas, continuous single-origin diagonal line field,
 * broad overlapping environmental lighting regions, multi-section spanning glass
 * sculptures (Ribbon A, Sheet B, Halo C), and the single shared WebGL2 optical canvas.
 */
export const PageAtmosphere: React.FC<PageAtmosphereProps> = ({
  activePreset,
  customConfig,
}) => {
  const motion = useBackgroundMotionController();

  return (
    <div
      className="page-atmosphere"
      aria-hidden="true"
      data-testid="page-atmosphere"
      data-scroll-progress={motion.scrollProgress.toFixed(2)}
    >
      {/* 1. Unified Base Surface (#F8F9FC across entire document) */}
      <div className="page-atmosphere__base" />

      {/* 2. Single-Origin Continuous Diagonal Architectural Line Field */}
      <div
        className="page-atmosphere__lines"
        data-testid="page-atmosphere-lines"
      />

      {/* 3. Global Overlapping Environmental Lighting Regions (Upper, Middle, Lower) */}
      <div
        className="page-atmosphere__lighting"
        data-testid="page-atmosphere-lighting"
      />

      {/* 4. Shared Optical Glass Layer: Single Viewport WebGL2 Engine + Document-Spanning Glass Sculptures */}
      <div
        className="page-atmosphere__glass"
        data-testid="page-atmosphere-glass"
      >
        {/* Single Shared WebGL2 Optical Glass Renderer (Fixed to viewport, transparent outside glass silhouette so global lines & lighting remain 100% continuous) */}
        <div className="fixed inset-0 pointer-events-none opacity-85">
          <GlassBackground
            preset={activePreset}
            configOverrides={
              customConfig && customConfig.id === activePreset
                ? {
                    material: customConfig.material,
                    scene: customConfig.scene,
                  }
                : undefined
            }
            renderMode="live"
            transparentExport={true}
            quality="auto"
            interactive
          />
        </div>

        {/* GLASS RIBBON A: Begins behind Hero workflow and spans across Trusted By into The Problem section */}
        <svg
          viewBox="0 0 1440 1600"
          fill="none"
          preserveAspectRatio="none"
          className="page-atmosphere__sculpture-ribbon-a"
        >
          <defs>
            <linearGradient id="globalRibbonAGrad" x1="25%" y1="0%" x2="85%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.72" />
              <stop offset="45%" stopColor="#D8D0F7" stopOpacity="0.34" />
              <stop offset="80%" stopColor="#C9DAFA" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="globalRibbonABevel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
              <stop offset="60%" stopColor="#D8D0F7" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M 1380 40 C 1080 240, 1220 620, 860 920 C 520 1200, 680 1440, 340 1580"
            stroke="url(#globalRibbonAGrad)"
            strokeWidth="150"
            strokeLinecap="round"
          />
          <path
            d="M 1380 40 C 1080 240, 1220 620, 860 920 C 520 1200, 680 1440, 340 1580"
            stroke="url(#globalRibbonABevel)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>

        {/* GLASS SHEET B: Broad frosted architectural surface spanning Benefits, Playbook Preview, and How It Works */}
        <svg
          viewBox="0 0 1440 1800"
          fill="none"
          preserveAspectRatio="none"
          className="page-atmosphere__sculpture-sheet-b"
        >
          <defs>
            <linearGradient id="globalSheetBGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.0" />
              <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0.62" />
              <stop offset="55%" stopColor="#C9DAFA" stopOpacity="0.28" />
              <stop offset="85%" stopColor="#D8D0F7" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M -120 320 L 1180 80 L 1540 1180 L 180 1560 Z"
            fill="url(#globalSheetBGrad)"
          />
          <path
            d="M -120 320 L 1180 80 L 1540 1180"
            stroke="rgba(255, 255, 255, 0.78)"
            strokeWidth="2"
          />
        </svg>

        {/* GLASS HALO C: Page-level ring; its sliced SVG can paint beyond the viewport at low zoom. */}
        <svg
          viewBox="0 0 1440 1400"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          className="page-atmosphere__sculpture-halo-c"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="globalHaloCGrad" x1="15%" y1="10%" x2="85%" y2="90%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.78" />
              <stop offset="50%" stopColor="#D8D0F7" stopOpacity="0.36" />
              <stop offset="100%" stopColor="#F6DCCA" stopOpacity="0.42" />
            </linearGradient>
          </defs>
          <g transform="translate(880, 740) rotate(-14)">
            <ellipse
              cx="0"
              cy="0"
              rx="460"
              ry="310"
              stroke="url(#globalHaloCGrad)"
              strokeWidth="84"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="502"
              ry="352"
              stroke="rgba(255, 255, 255, 0.85)"
              strokeWidth="2"
            />
            <ellipse
              cx="0"
              cy="0"
              rx="418"
              ry="268"
              stroke="rgba(255, 255, 255, 0.65)"
              strokeWidth="1.5"
            />
          </g>
        </svg>
      </div>

      {/* 5. Subtle Environmental Optical Grain / Soft Vignette */}
      <div className="page-atmosphere__noise" />
    </div>
  );
};
]]>
    </file>
  </files>
</template>
