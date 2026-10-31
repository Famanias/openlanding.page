<template slug="lumen" name="LUMEN">
  <dependencies>
    {
      "dependencies": {
        "three": "^0.186.1",
        "gsap": "^3.15.0",
        "motion": "^14.4.0",
        "lucide-react": "0.475.0",
        "lenis": "^1.3.27"
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

  const [isHeroActive, setIsHeroActive] = useState<boolean>(true);

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
      <LumenMotion
        rootRef={landingRootRef}
        onHeroActivityChange={setIsHeroActive}
      />
      {/* Single Root-Level Global Atmospheric & Optical Glass Layer */}
      <PageAtmosphere
        activePreset={activeHeroPreset}
        customConfig={customHeroConfig}
        isHeroActive={isHeroActive}
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

  /* Scoped Lumen Motion Tokens */
  --lm-ease-optical: cubic-bezier(0.16, 1, 0.3, 1);
  --lm-ease-feedback: cubic-bezier(0.23, 1, 0.32, 1);
  --lm-ease-travel: cubic-bezier(0.77, 0, 0.175, 1);
  --lm-duration-press: 120ms;
  --lm-duration-feedback: 160ms;
  --lm-duration-select: 220ms;
  --lm-duration-sheet: 280ms;
  --lm-duration-reveal: 480ms;
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
  transition: transform var(--lm-duration-select, 0.22s) var(--lm-ease-select, cubic-bezier(0.23, 1, 0.32, 1));
}

.workspace-entrance-wrapper {
  transform-style: preserve-3d;
  will-change: transform, opacity;
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

.playbook-stack-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.playbook-stack-sheet {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  transform-style: preserve-3d;
}

.stack-card-front {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.97) 0%, rgba(248, 250, 255, 0.95) 100%);
  border: 1px solid rgba(255, 255, 255, 0.95);
  box-shadow: 0 28px 64px -12px rgba(30, 36, 50, 0.14), 0 8px 24px -4px rgba(30, 36, 50, 0.06);
  transform: translate3d(0px, 0px, 30px) rotateY(-3deg) rotateX(1deg);
  z-index: 30;
  opacity: 1;
  transition: transform var(--lm-duration-sheet, 280ms) var(--lm-ease-travel, cubic-bezier(0.77, 0, 0.175, 1)),
              opacity var(--lm-duration-sheet, 280ms) var(--lm-ease-travel, cubic-bezier(0.77, 0, 0.175, 1)),
              box-shadow var(--lm-duration-sheet, 280ms) var(--lm-ease-travel, cubic-bezier(0.77, 0, 0.175, 1));
}

.stack-card-middle {
  background: linear-gradient(135deg, rgba(235, 240, 255, 0.72) 0%, rgba(216, 208, 247, 0.48) 100%);
  border: 1px solid rgba(255, 255, 255, 0.88);
  box-shadow: 0 20px 45px -12px rgba(30, 36, 50, 0.08);
  transform: translate3d(22px, -14px, -20px) rotateY(-5deg) rotateX(2deg) scale(0.97);
  z-index: 20;
  opacity: 0.9;
  transition: transform var(--lm-duration-sheet, 280ms) var(--lm-ease-travel, cubic-bezier(0.77, 0, 0.175, 1)),
              opacity var(--lm-duration-sheet, 280ms) var(--lm-ease-travel, cubic-bezier(0.77, 0, 0.175, 1)),
              box-shadow var(--lm-duration-sheet, 280ms) var(--lm-ease-travel, cubic-bezier(0.77, 0, 0.175, 1));
}

.stack-card-back {
  background: linear-gradient(135deg, rgba(201, 218, 250, 0.58) 0%, rgba(246, 220, 202, 0.48) 100%);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 16px 36px -12px rgba(30, 36, 50, 0.06);
  transform: translate3d(44px, -28px, -60px) rotateY(-7deg) rotateX(3deg) scale(0.94);
  z-index: 10;
  opacity: 0.75;
  transition: transform var(--lm-duration-sheet, 280ms) var(--lm-ease-travel, cubic-bezier(0.77, 0, 0.175, 1)),
              opacity var(--lm-duration-sheet, 280ms) var(--lm-ease-travel, cubic-bezier(0.77, 0, 0.175, 1)),
              box-shadow var(--lm-duration-sheet, 280ms) var(--lm-ease-travel, cubic-bezier(0.77, 0, 0.175, 1));
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

/* Content Reveal Styles */
[data-lm-reveal] {
  transition: opacity var(--lm-duration-reveal, 480ms) var(--lm-ease-optical, cubic-bezier(0.16, 1, 0.3, 1)),
              transform var(--lm-duration-reveal, 480ms) var(--lm-ease-optical, cubic-bezier(0.16, 1, 0.3, 1));
}

[data-lm-reveal][data-lm-armed="true"] {
  opacity: 0.72;
  transform: translateY(12px);
}

[data-lm-reveal][data-lm-in="true"] {
  opacity: 1;
  transform: translateY(0);
}

[data-lm-reveal^="rear-sheet"][data-lm-armed="true"] {
  opacity: 0.6;
  transform: translateY(8px);
}

[data-lm-reveal^="rear-sheet"][data-lm-in="true"] {
  opacity: 1;
  transform: translateY(0);
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
  .stack-card-back,
  [data-lm-reveal] {
    transform: none !important;
    opacity: 1 !important;
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

/* Lumen's optical experience: separate, illuminate, settle. */
.landing-shell {
  --lm-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --lm-spring: cubic-bezier(0.34, 1.35, 0.64, 1);
  --lm-gutter: clamp(24px, 5vw, 80px);
}
.landing-shell ::selection { background: #D8D0F7; color: #1E2432; }
.landing-shell :focus-visible { outline: 2px solid #5B8DEF; outline-offset: 5px; }
.landing-shell input { caret-color: #8E7CE8; }
.landing-shell button, .landing-shell a { -webkit-tap-highlight-color: transparent; }
.landing-shell a { text-underline-offset: 5px; }
.landing-shell section[id], #lumen-content { scroll-margin-top: 108px; }
.lm-skip { position: fixed; z-index: 100; left: 24px; top: 12px; padding: 12px 24px; background: #252C43; color: #FFFFFF; border-radius: 12px; transform: translateY(-160%); }
.lm-skip:focus { transform: none; }

.lumen-header { position: fixed; top: 16px; left: 0; width: 100%; z-index: 60; padding: 0 var(--lm-gutter); pointer-events: none; }
.lm-nav-shell { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 24px; max-width: 1440px; min-height: 64px; margin: auto; padding: 10px 16px 10px 24px; border-radius: 16px; background: color-mix(in srgb, #F8F9FC 86%, transparent); border: 1px solid color-mix(in srgb, #FFFFFF 90%, transparent); box-shadow: 0 8px 32px color-mix(in srgb, #252C43 4%, transparent); backdrop-filter: blur(20px); pointer-events: auto; transition: background 300ms var(--lm-ease), box-shadow 300ms var(--lm-ease); }
.lumen-header[data-compact="true"] .lm-nav-shell { background: color-mix(in srgb, #FFFFFF 94%, transparent); box-shadow: 0 12px 40px color-mix(in srgb, #252C43 10%, transparent); }
.lm-logo { display: flex; align-items: center; gap: 10px; font-size: 18px; font-weight: 750; letter-spacing: 0.12em; }
.lm-logo svg { width: 28px; height: 28px; fill: color-mix(in srgb, #C9DAFA 48%, transparent); stroke: #252C43; stroke-width: 1.15; transition: transform 600ms var(--lm-ease); }
.lm-logo:hover svg { transform: rotate(60deg); }
.lm-logo-dot { color: #8E7CE8; }
.lm-desktop-nav { display: flex; gap: 28px; align-items: center; }
.lm-nav-link { position: relative; padding: 10px 0; font-size: 12px; font-weight: 550; color: #657187; transition: color 220ms var(--lm-ease); }
.lm-nav-link::after { content: ""; position: absolute; bottom: 3px; left: 0; width: 100%; height: 2px; background: #8E7CE8; transform: scaleX(0); transform-origin: right; transition: transform 350ms var(--lm-ease); }
.lm-nav-link:hover, .lm-nav-link[aria-current] { color: #252C43; }
.lm-nav-link:hover::after, .lm-nav-link[aria-current]::after { transform: scaleX(1); transform-origin: left; }
.lm-nav-actions { display: flex; align-items: center; gap: 20px; }
.lm-studio-link { display: flex; align-items: center; gap: 5px; font-size: 11px; color: #657187; cursor: pointer; }
.lm-studio-link svg { transition: transform 300ms var(--lm-ease); }
.lm-studio-link:hover svg { transform: translate(2px, -2px); }
.lm-nav-progress { position: absolute; bottom: -1px; left: 16px; right: 16px; height: 2px; background: #8E7CE8; transform: scaleX(0); transform-origin: left; pointer-events: none; }
.lm-btn, .landing-shell .lm-form-submit { position: relative; display: inline-flex; justify-content: center; align-items: center; gap: 12px; isolation: isolate; overflow: hidden; border: 0; background: #252C43; color: #FFFFFF; border-radius: 12px; padding: 16px 24px; font-size: 14px; font-weight: 600; cursor: pointer; transition: color 300ms var(--lm-ease), scale 160ms var(--lm-ease), box-shadow 300ms var(--lm-ease); }
.lm-btn::before, .lm-form-submit::before { content: ""; position: absolute; inset: 0; z-index: -1; background: #D8D0F7; transform: translateX(-102%); transition: transform 420ms var(--lm-ease); }
.lm-btn--small { padding: 12px 16px; font-size: 11px; gap: 10px; }
.lm-magnetic { translate: var(--lm-mx, 0px) var(--lm-my, 0px); transition: translate 300ms var(--lm-ease), color 300ms var(--lm-ease), scale 160ms var(--lm-ease); }
.lm-btn svg, .lm-form-submit svg { transition: transform 350ms var(--lm-ease); }
.lm-btn:active, .lm-form-submit:active { scale: 0.97; }
.lm-menu-toggle { display: none; width: 40px; height: 40px; align-items: center; justify-content: center; flex-direction: column; gap: 6px; cursor: pointer; }
.lm-menu-toggle > span { display: block; width: 20px; height: 1px; background: #252C43; }
.lm-mobile-menu { inset: 0; position: fixed; width: 100%; height: 100dvh; max-width: none; max-height: none; padding: 24px; border: 0; color: #252C43; background: #EFF3FA; }
.lm-mobile-menu[open] { display: flex; flex-direction: column; animation: lm-menu-open 480ms var(--lm-ease) both; }
.lm-mobile-menu::backdrop { background: color-mix(in srgb, #252C43 35%, transparent); }
.lm-menu-top { display: flex; justify-content: space-between; align-items: center; font-weight: 700; letter-spacing: 0.1em; }
.lm-menu-top button { padding: 12px; cursor: pointer; }
.lm-mobile-menu nav { display: grid; gap: 16px; margin: auto 0; }
.lm-mobile-menu nav a { display: flex; align-items: center; justify-content: space-between; padding: 12px 0; font-size: clamp(28px, 7vw, 48px); font-weight: 600; animation: lm-menu-link 650ms var(--lm-ease) calc(var(--item) * 65ms) both; }
.lm-menu-studio { display: flex; justify-content: space-between; padding: 24px 0; border-top: 1px solid #CBD5E1; }
.lm-mobile-menu > p { font-size: 12px; color: #657187; }
@keyframes lm-menu-open { from { clip-path: circle(0% at calc(100% - 40px) 40px); } to { clip-path: circle(150% at calc(100% - 40px) 40px); } }
@keyframes lm-menu-link { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }

.lm-hero { position: relative; min-height: 100svh; }
.lm-hero-stage { position: relative; min-height: 100svh; padding: 120px var(--lm-gutter) 80px; display: flex; align-items: center; }
.lm-hero-grid { display: grid; grid-template-columns: 1.04fr 1fr; align-items: center; gap: clamp(24px, 4vw, 64px); width: 100%; max-width: 1440px; margin: 0 auto; }
.lm-hero-copy { position: relative; z-index: 4; transform-origin: left center; transform: translate3d(0, calc(var(--lm-departure, 0) * -90px), 0) scale(calc(1 - var(--lm-departure, 0) * 0.06)); opacity: calc(1 - var(--lm-departure, 0) * 0.7); }
.lm-edition { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 28px; font-size: 11px; font-weight: 550; color: #252C43; }
.lm-edition > span:last-child { margin-left: 8px; padding-left: 16px; border-left: 1px solid #CBD5E1; color: #657187; font-size: 10px; }
.lm-live-dot { display: inline-block; flex-shrink: 0; width: 5px; height: 5px; border-radius: 50%; background: #5BA59A; box-shadow: 0 0 0 4px color-mix(in srgb, #5BA59A 10%, transparent); }
.lm-hero-title { margin: 0; max-width: 760px; font-size: clamp(48px, 5.5vw, 88px); font-weight: 600; line-height: 1.035; letter-spacing: -0.04em; text-wrap: balance; }
.lm-word { display: inline-block; overflow: clip; vertical-align: top; padding: 0 0.025em 0.14em; margin: 0 -0.025em -0.14em 0; }
.lm-word__in { display: inline-block; }
.lm-hero-description { max-width: 490px; margin-top: 24px; font-size: 15px; line-height: 1.8; color: #657187; text-wrap: pretty; }
.lm-hero-form { margin-top: 28px; max-width: 520px; }
.lm-hero-form form { margin: 0; }
.lm-hero-form input { min-width: 0; }
.lm-hero-form .lm-form-submit { padding: 14px 18px; font-size: 12px; }
.lm-text-link { display: inline-flex; align-items: center; gap: 16px; font-size: 12px; font-weight: 600; margin-top: 20px; }
.lm-text-link span { position: relative; }
.lm-text-link span::after { content: ""; position: absolute; left: 0; bottom: -3px; width: 100%; height: 1px; background: #657187; transform: scaleX(0.3); transform-origin: left; transition: transform 450ms var(--lm-ease); }
.lm-text-link svg { transition: transform 450ms var(--lm-ease); }
.lm-text-link:hover span::after { transform: scaleX(1); }
.lm-text-link:hover svg { transform: translate(3px, -3px); }
.lm-hero-facts { display: flex; flex-wrap: wrap; gap: 0 24px; margin-top: 28px; padding-top: 20px; border-top: 1px solid color-mix(in srgb, #657187 16%, transparent); color: #657187; font-size: 10px; }
.lm-hero-facts b { color: #252C43; font-size: 17px; font-weight: 550; margin-right: 5px; font-variant-numeric: tabular-nums; }
.lm-hero-art { position: relative; min-width: 0; perspective: 1400px; transform: translate3d(0, calc(var(--lm-departure, 0) * -30px), 0); }
.lm-hero-bottom { position: absolute; bottom: 24px; left: var(--lm-gutter); right: var(--lm-gutter); max-width: 1440px; margin: auto; display: flex; justify-content: space-between; align-items: center; gap: 24px; }
.lm-scroll-cue { display: inline-flex; align-items: center; gap: 12px; color: #657187; font-size: 10px; }
.lm-scroll-cue__icon { display: grid; place-items: center; width: 30px; height: 42px; border: 1px solid #CBD5E1; border-radius: 20px; }
.lm-scroll-cue svg { animation: lm-scroll-arrow 2s var(--lm-ease) infinite; }
.lm-scene-controls { display: flex; gap: 5px; align-items: center; }
.lm-scene-controls > span { margin-right: 8px; color: #657187; font-size: 10px; }
.lm-scene-controls button { width: 28px; height: 28px; border-radius: 50%; border: 1px solid color-mix(in srgb, #657187 20%, transparent); color: #657187; display: grid; place-items: center; font-size: 9px; cursor: pointer; transition: background 250ms var(--lm-ease), color 250ms var(--lm-ease), transform 350ms var(--lm-ease); }
.lm-scene-controls button[aria-pressed="true"] { background: #252C43; color: #FFFFFF; border-color: #252C43; }
.lm-scene-controls button:hover { transform: translateY(-3px); }
.lm-scene-controls .lm-scene-studio { margin-left: 8px; border-radius: 8px; width: 32px; }
@keyframes lm-scroll-arrow { 0%, 100% { transform: translateY(-3px); } 50% { transform: translateY(4px); } }

.lm-workspace { position: relative; width: 100%; max-width: 650px; margin: auto; }
.lm-workspace-meta { display: flex; align-items: center; justify-content: space-between; gap: 12px; color: #657187; font-size: 10px; }
.lm-workspace-meta > span { display: inline-flex; gap: 8px; align-items: center; }
.lm-replay { display: inline-flex; align-items: center; gap: 5px; border: 1px solid color-mix(in srgb, #FFFFFF 90%, transparent); border-radius: 20px; background: color-mix(in srgb, #FFFFFF 68%, transparent); padding: 7px 10px; font-size: 9px; cursor: pointer; white-space: nowrap; }
.lm-replay svg { color: #5BA59A; transition: transform 300ms var(--lm-spring); }
.lm-replay:hover svg { transform: rotate(120deg); }
.lm-workspace-stage { position: relative; height: 600px; perspective: 1400px; }
.lm-workspace-plane { height: 100%; transform: rotateX(var(--tilt-x, 2deg)) rotateY(var(--tilt-y, -4deg)); }
.lm-workspace-float { position: absolute; transform-style: preserve-3d; transition: filter 500ms var(--lm-ease); }
.lm-workspace-float--input { width: 65%; left: 0; top: 30px; z-index: 10; transform: translate3d(calc(var(--lm-departure, 0) * -200px), calc(var(--lm-departure, 0) * -100px), 0) rotate(calc(-6deg - var(--lm-departure, 0) * 16deg)); }
.lm-workspace-float--processing { width: 73%; right: -1%; top: 205px; z-index: 20; transform: translate3d(calc(var(--lm-departure, 0) * 210px), calc(var(--lm-departure, 0) * -35px), 40px) rotate(calc(5deg + var(--lm-departure, 0) * 20deg)); }
.lm-workspace-float--output { width: 69%; left: 4%; top: 432px; z-index: 30; transform: translate3d(calc(var(--lm-departure, 0) * -160px), calc(var(--lm-departure, 0) * 100px), 20px) rotate(calc(-4deg - var(--lm-departure, 0) * 10deg)); }
.lm-panel-entrance { perspective: 1400px; transform-style: preserve-3d; }
.lm-workspace-panel { position: relative; border: 1px solid #FFFFFF; border-radius: 18px; padding: 18px; background: color-mix(in srgb, #FFFFFF 83%, #EDF1FA); box-shadow: 0 20px 48px -20px color-mix(in srgb, #252C43 28%, transparent), inset 0 1px 0 #FFFFFF; backdrop-filter: blur(16px); transition: transform 450ms var(--lm-ease), box-shadow 450ms var(--lm-ease), border-color 450ms var(--lm-ease); }
.lm-workspace-panel::after { content: ""; position: absolute; inset: -5px; pointer-events: none; border: 1px solid color-mix(in srgb, #FFFFFF 65%, transparent); border-radius: 22px; }
.lm-workspace-panel[data-selected="true"] { transform: translateZ(40px) scale(1.045); border-color: #8E7CE8; box-shadow: 0 30px 56px -20px color-mix(in srgb, #8E7CE8 32%, transparent); }
.lm-panel-heading { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding-bottom: 13px; margin-bottom: 13px; border-bottom: 1px solid color-mix(in srgb, #657187 12%, transparent); font-size: 10px; font-weight: 600; }
.lm-panel-heading > button { display: inline-flex; align-items: center; gap: 9px; cursor: pointer; }
.lm-panel-heading > svg { color: #657187; flex-shrink: 0; }
.lm-panel-number { font-size: 9px; font-variant-numeric: tabular-nums; color: #657187; font-weight: 400; }
.lm-source-tabs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 3px; }
.lm-source-tabs button { display: flex; justify-content: center; align-items: center; flex-direction: column; gap: 5px; padding: 9px 3px; border-radius: 9px; font-size: 8px; color: #657187; cursor: pointer; transition: background 250ms var(--lm-ease), color 250ms var(--lm-ease), transform 250ms var(--lm-ease); }
.lm-source-tabs button[aria-pressed="true"] { background: #EFF3FA; color: #252C43; box-shadow: 0 2px 8px color-mix(in srgb, #252C43 6%, transparent); }
.lm-source-tabs button:hover { background: #D8D0F7; transform: translateY(-2px); color: #252C43; }
.lm-source-content { margin-top: 12px; animation: lm-content-in 350ms var(--lm-ease); }
.lm-source-content p { font-size: 11px; line-height: 1.5; font-weight: 550; }
.lm-source-content > span { font-size: 8px; color: #657187; }
.lm-source-bottom { display: flex; align-items: center; gap: 7px; font-size: 8px; color: #657187; padding-top: 12px; margin-top: 12px; border-top: 1px solid color-mix(in srgb, #657187 10%, transparent); }
.lm-source-bottom > svg { margin-left: auto; }
.lm-workspace-panel--processing { background: color-mix(in srgb, #FFFFFF 94%, #D8D0F7); }
.lm-workspace-panel--processing .lm-panel-heading > svg { color: #8E7CE8; }
.lm-process-steps { display: grid; gap: 5px; }
.lm-process-steps > button { display: flex; align-items: flex-start; gap: 10px; text-align: left; padding: 9px; border-radius: 9px; border: 1px solid transparent; cursor: pointer; transition: background 250ms var(--lm-ease), border-color 250ms var(--lm-ease), transform 250ms var(--lm-ease); }
.lm-process-steps > button[data-active="true"] { border-color: #D8D0F7; background: #F2F5FC; transform: translateX(4px); }
.lm-step-check { display: grid; place-items: center; flex-shrink: 0; width: 20px; height: 20px; border-radius: 6px; background: #EFF3FA; color: #657187; }
[data-active="true"] .lm-step-check { background: #8E7CE8; color: #FFFFFF; }
.lm-process-steps strong { display: block; font-weight: 600; font-size: 10px; }
.lm-process-steps small { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; margin-top: 2px; font-size: 8px; color: #657187; line-height: 1.5; }
.lm-processing-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 10px; margin-top: 10px; border-top: 1px solid color-mix(in srgb, #657187 10%, transparent); font-size: 7px; color: #657187; }
.lm-processing-meter { display: inline-flex; align-items: center; gap: 3px; height: 14px; }
.lm-processing-meter i { display: block; width: 3px; height: 5px; background: #8E7CE8; border-radius: 2px; }
.lm-processing-meter i:nth-child(2n) { height: 10px; }
.lm-processing-meter i:nth-child(3) { height: 14px; }
.lm-workspace[data-playing="true"] .lm-processing-meter i { animation: lm-meter 500ms var(--lm-ease) infinite alternate; }
.lm-workspace[data-playing="true"] .lm-processing-meter i:nth-child(2n) { animation-delay: 150ms; }
.lm-workspace-panel--output { background: color-mix(in srgb, #FFFFFF 85%, #C9DAFA); }
.lm-workspace-panel--output .lm-panel-heading > svg { color: #5BA59A; }
.lm-output-title > span { font-size: 7px; letter-spacing: 0.1em; color: #657187; }
.lm-output-title > p { font-size: 12px; font-weight: 550; line-height: 1.5; margin-top: 5px; }
.lm-output-title { animation: lm-content-in 350ms var(--lm-ease); }
.lm-output-review { margin-top: 12px; padding-top: 10px; border-top: 1px solid color-mix(in srgb, #657187 12%, transparent); display: flex; align-items: center; gap: 7px; font-size: 8px; color: #657187; }
.lm-output-review svg { color: #5BA59A; flex-shrink: 0; }
.lm-workspace-connectors { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
.lm-connector-base, .lm-connector-signal { stroke: url(#lm-workflow-ray); stroke-width: 1.5; }
.lm-connector-base { opacity: 0.3; }
.lm-connector-signal { stroke-dasharray: 12 600; stroke-dashoffset: 0; opacity: 0; }
.lm-workspace[data-playing="true"] .lm-connector-signal { opacity: 1; animation: lm-trace 1.6s var(--lm-ease) both; }
.lm-workspace-controls { display: flex; width: fit-content; margin: 12px auto 0; gap: 4px; border: 1px solid #FFFFFF; border-radius: 30px; padding: 4px; background: color-mix(in srgb, #FFFFFF 55%, transparent); }
.lm-workspace-controls button { font-size: 9px; color: #657187; padding: 7px 12px; border-radius: 20px; cursor: pointer; transition: background 300ms var(--lm-ease), color 300ms var(--lm-ease); }
.lm-workspace-controls button[aria-pressed="true"] { background: #252C43; color: #FFFFFF; }
.lm-workspace-caption { max-width: 380px; margin: 10px auto 0; text-align: center; font-size: 9px; line-height: 1.65; color: #657187; min-height: 30px; }
.lm-workspace-coordinate { position: absolute; right: 0; bottom: 12px; writing-mode: vertical-rl; font-size: 7px; letter-spacing: 0.18em; color: #657187; opacity: 0.65; }
.lm-orbit { position: absolute; inset: 12% -5%; border: 1px solid color-mix(in srgb, #FFFFFF 90%, transparent); border-radius: 50%; pointer-events: none; transform: rotate(-25deg) scaleY(0.8); }
.lm-orbit--two { inset: 0 -12%; transform: rotate(25deg) scaleY(0.75); border-color: color-mix(in srgb, #C9DAFA 55%, transparent); }
@keyframes lm-meter { to { transform: scaleY(0.35); } }
@keyframes lm-trace { from { stroke-dashoffset: 620; } to { stroke-dashoffset: 0; } }
@keyframes lm-content-in { from { opacity: 0.25; transform: translateY(6px); } to { opacity: 1; transform: none; } }

.lm-page-sheet { position: relative; z-index: 5; background: color-mix(in srgb, #F8F9FC 97%, transparent); border-radius: 40px 40px 0 0; box-shadow: 0 -24px 80px color-mix(in srgb, #252C43 4%, transparent); padding-top: 1px; }
.lm-workflow-ribbon { overflow: hidden; border-radius: 40px 40px 0 0; background: #252C43; color: #FFFFFF; padding: 26px 0; }
.lm-workflow-ribbon__track { display: flex; width: max-content; animation: lm-ribbon-travel 38s linear infinite; }
.lm-workflow-ribbon__group { display: flex; flex-shrink: 0; gap: 48px; padding-right: 48px; }
.lm-workflow-ribbon__group > span { display: inline-flex; align-items: center; gap: 16px; font-size: clamp(18px, 2vw, 28px); font-weight: 450; letter-spacing: -0.02em; white-space: nowrap; }
.lm-workflow-ribbon__group svg { width: 20px; height: 20px; fill: none; stroke: #D8D0F7; stroke-width: 1.1; margin-left: 24px; }
.lm-ribbon-mark { width: 16px; height: 16px; display: block; border-radius: 4px; border: 1px solid #D8D0F7; transform: rotate(45deg); }
.lm-ribbon-mark--1 { border-radius: 50%; background: #D8D0F7; }
.lm-ribbon-mark--2 { border-radius: 2px; border-color: #C9DAFA; }
.lm-ribbon-mark--3 { border-radius: 50% 50% 2px 2px; background: #5BA59A; border-color: #5BA59A; }
@keyframes lm-ribbon-travel { to { transform: translateX(-25%); } }
.lm-workflow-ribbon:hover .lm-workflow-ribbon__track { animation-play-state: paused; }
.lm-statement { position: relative; padding: 64px var(--lm-gutter) 112px; text-align: center; }
.lm-statement p { font-size: clamp(40px, 6vw, 80px); line-height: 1.12; font-weight: 550; letter-spacing: -0.04em; }
.lm-statement__line { display: block; }
.lm-statement__line > span { color: #252C43; }
[data-lm-motion="live"] .lm-statement__line > span { color: color-mix(in srgb, #252C43 calc(clamp(0, var(--lm-reading, 0) * 6.5 - var(--word), 1) * 100%), #CBD5E1); }
.lm-statement__note { display: block; margin-top: 28px; color: #657187; font-size: 12px; }
.lm-statement__mark { width: 64px; height: 64px; margin: 0 auto 32px; position: relative; perspective: 400px; }
.lm-statement__mark > span { position: absolute; inset: 10px; border-radius: 9px; border: 1px solid #FFFFFF; background: color-mix(in srgb, #D8D0F7 65%, transparent); transform: rotate(-35deg) translateX(-10px); box-shadow: 0 8px 24px color-mix(in srgb, #252C43 8%, transparent); }
.lm-statement__mark > span:nth-child(2) { transform: rotate(-15deg); background: color-mix(in srgb, #C9DAFA 70%, transparent); }
.lm-statement__mark > span:nth-child(3) { transform: rotate(10deg) translateX(10px); background: color-mix(in srgb, #FFFFFF 65%, transparent); }

.lm-page-sheet .landing-section { padding-block: clamp(80px, 8vw, 128px); }
.lm-page-sheet .landing-section h2 { font-size: clamp(36px, 4.2vw, 60px); font-weight: 550; line-height: 1.1; letter-spacing: -0.035em; }
.lm-page-sheet .landing-section h2 + p { max-width: 620px; font-size: 14px; line-height: 1.8; margin-top: 24px; }
.lm-page-sheet .landing-section > div > .max-w-2xl { max-width: 860px; }
.lm-page-sheet .landing-section > div > div:first-child > .max-w-2xl { max-width: 820px; }
.lm-page-sheet .landing-section > div > .max-w-2xl > p.font-mono:first-child,
.lm-page-sheet .landing-section > div > div:first-child > .max-w-2xl > p.font-mono:first-child { display: none; }

#the-problem { margin: 0 var(--lm-gutter); border-radius: 32px; background: #252C43; overflow: clip; }
#the-problem > div { padding-inline: clamp(24px, 4vw, 64px); }
#the-problem h2 { color: #FFFFFF; }
#the-problem > div > div:first-child p { color: #CBD5E1; }
#the-problem > div > div:first-child > div:last-child { background: color-mix(in srgb, #FFFFFF 10%, transparent); border-color: color-mix(in srgb, #FFFFFF 20%, transparent); box-shadow: none; }
#the-problem > div > div:first-child button { color: #CBD5E1; }
#the-problem > div > div:first-child button[aria-pressed="true"] { background: #D8D0F7; color: #252C43; }
#the-problem .lm-problem-canvas { background: color-mix(in srgb, #FFFFFF 4%, transparent); border-color: color-mix(in srgb, #FFFFFF 10%, transparent); border-radius: 20px; box-shadow: none; overflow: visible; min-height: 340px; display: flex; flex-direction: column; justify-content: center; }
#the-problem .lm-fragment { border: 1px solid color-mix(in srgb, #FFFFFF 80%, transparent); background: #F8F9FC; box-shadow: 0 16px 32px color-mix(in srgb, #1E2432 18%, transparent); min-height: 185px; transition: transform 800ms var(--lm-ease), background 300ms var(--lm-ease); }
#the-problem .lm-problem-canvas > div:last-child { color: #CBD5E1; border-color: color-mix(in srgb, #FFFFFF 15%, transparent); }
#the-problem .lm-problem-canvas > div:last-child > span:last-child { color: #CBD5E1; }
#benefits .lm-benefits-grid { perspective: 1400px; }
.lm-hover-card { position: relative; transform-style: preserve-3d; transition: transform 550ms var(--lm-ease), box-shadow 550ms var(--lm-ease), opacity 400ms var(--lm-ease); }
.lm-hover-card::after, .lm-cover::after { content: ""; pointer-events: none; position: absolute; inset: 0; border-radius: inherit; background: radial-gradient(circle at var(--lm-light-x, 50%) var(--lm-light-y, 30%), color-mix(in srgb, #FFFFFF 85%, transparent), transparent 60%); opacity: 0; transition: opacity 400ms var(--lm-ease); }
.lm-hover-card > div:last-child { overflow: hidden; }
.lm-hover-card > div:last-child > svg { transition: transform 650ms var(--lm-ease); }
.lm-hover-card:nth-child(2) { background: color-mix(in srgb, #D8D0F7 30%, #FFFFFF); }
.lm-hover-card:nth-child(3) { background: color-mix(in srgb, #C9DAFA 35%, #FFFFFF); }
#inside-playbook { background: #EFF3FA; border-radius: 40px; margin-inline: 16px; overflow: clip; }
.lm-cover { isolation: isolate; backdrop-filter: none; -webkit-backdrop-filter: none; transition: transform 650ms var(--lm-ease), box-shadow 650ms var(--lm-ease); transform: perspective(1000px) translateZ(60px) rotateX(var(--lm-rx, 0deg)) rotateY(calc(-8deg + var(--lm-ry, 0deg))) rotate(-4deg); }
.playbook-stack-stage { perspective: 1800px; }
.playbook-stack-grid > [role="tabpanel"] { transition: transform 650ms var(--lm-ease), opacity 500ms var(--lm-ease), box-shadow 500ms var(--lm-ease); transform-origin: 15% 70%; }
.playbook-stack-grid > .stack-card-front { transform: translate3d(0, 0, 70px) rotate(-1deg); }
.playbook-stack-grid > .stack-card-middle { transform: translate3d(28px, -20px, -20px) rotate(4deg) scale(0.97); }
.playbook-stack-grid > .stack-card-back { transform: translate3d(50px, -38px, -60px) rotate(8deg) scale(0.94); }
#inside-playbook [role="tab"] { position: relative; overflow: hidden; border: 1px solid color-mix(in srgb, #FFFFFF 85%, transparent); background: color-mix(in srgb, #FFFFFF 45%, transparent); transition: background 400ms var(--lm-ease), transform 400ms var(--lm-ease), box-shadow 400ms var(--lm-ease); }
#inside-playbook [role="tab"][aria-selected="true"] { background: #FFFFFF; box-shadow: 0 8px 24px color-mix(in srgb, #252C43 6%, transparent); }
#inside-playbook [role="tab"]::after { content: ""; position: absolute; bottom: 0; left: 0; height: 3px; width: 100%; background: #8E7CE8; transform: scaleX(0); transform-origin: left; transition: transform 550ms var(--lm-ease); }
#inside-playbook [role="tab"][aria-selected="true"]::after { transform: scaleX(1); }
#inside-playbook button[aria-label^="Next"], #inside-playbook button[aria-label^="Previous"] { border-radius: 50%; width: 48px; height: 48px; }
#inside-playbook button[aria-label^="Next"] svg, #inside-playbook button[aria-label^="Previous"] svg { transition: transform 400ms var(--lm-ease); }
#inside-playbook button[aria-label^="Next"]:hover svg { transform: translateX(4px); }
#inside-playbook button[aria-label^="Previous"]:hover svg { transform: translateX(-4px); }
#how-it-works [role="tab"] { transition: background 400ms var(--lm-ease), transform 400ms var(--lm-ease); }
#how-it-works [role="tab"][aria-selected="true"] { background: #FFFFFF; }
#how-it-works [role="tabpanel"] { transition: box-shadow 500ms var(--lm-ease); }
#practical-credibility blockquote { font-size: 19px; line-height: 1.65; font-weight: 450; letter-spacing: -0.015em; }
#faq > div { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 64px; max-width: 1280px; }
#faq > div > div:first-child { position: sticky; top: 120px; align-self: start; }
#faq > div > div:last-child { margin-top: 0; border: 0; border-radius: 0; background: transparent; box-shadow: none; backdrop-filter: none; padding: 0; }
#faq .lm-faq-row { padding: 24px 0; }
#faq .lm-faq-row button { font-size: 15px; line-height: 1.5; padding-right: 4px; transition: color 250ms var(--lm-ease); }
#faq .lm-faq-row button > span { transition: transform 350ms var(--lm-ease); }
#faq .lm-faq-row button > svg { border-radius: 50%; width: 30px; height: 30px; padding: 6px; background: #EFF3FA; color: #252C43; }
#faq .lm-faq-row button[aria-expanded="true"] > svg { background: #D8D0F7; }
.lm-faq-answer { display: grid; grid-template-rows: 0fr; opacity: 0; transition: grid-template-rows 420ms var(--lm-ease), opacity 250ms var(--lm-ease); }
.lm-faq-answer[data-open="true"] { grid-template-rows: 1fr; opacity: 1; }
.lm-faq-answer > div { overflow: hidden; }
.lm-faq-answer p { padding-top: 16px; padding-right: 44px; font-size: 13px; line-height: 1.8; color: #657187; }
#final-download { padding-bottom: 80px; }
#final-download > div > div { padding: clamp(32px, 5vw, 80px); border-radius: 32px; background: color-mix(in srgb, #FFFFFF 70%, #D8D0F7); }
#final-download h2 { font-size: clamp(40px, 4.5vw, 64px); }
#final-download .lm-final-cover { transition: transform 650ms var(--lm-ease); transform: rotate(5deg); }
.lm-form-surface { transition: border-color 300ms var(--lm-ease), box-shadow 300ms var(--lm-ease), background 300ms var(--lm-ease); }
.lm-form-surface:focus-within { box-shadow: 0 0 0 4px color-mix(in srgb, #8E7CE8 12%, transparent), 0 12px 32px color-mix(in srgb, #252C43 5%, transparent); border-color: #D8D0F7; }
.lm-form-success { animation: lm-success 600ms var(--lm-ease) both; }
.lm-form-success > div:first-child svg { animation: lm-check 800ms var(--lm-spring) both; }
@keyframes lm-success { from { clip-path: inset(0 0 100% 0 round 16px); opacity: 0; transform: translateY(8px); } to { clip-path: inset(0 round 16px); opacity: 1; transform: none; } }
@keyframes lm-check { from { transform: scale(0.65) rotate(-30deg); } to { transform: scale(1) rotate(0); } }
.landing-shell footer a:not(.lm-btn) { position: relative; transition: color 300ms var(--lm-ease); }
.landing-shell footer a:not(.lm-btn)::after { content: ""; height: 1px; width: 100%; background: currentColor; position: absolute; left: 0; bottom: -3px; transform: scaleX(0); transform-origin: right; transition: transform 400ms var(--lm-ease); }
.landing-shell footer a:not(.lm-btn):hover::after { transform: scaleX(1); transform-origin: left; }
.landing-shell .lumen-footer-wordmark { letter-spacing: -0.04em; }

@media (hover: hover) and (pointer: fine) {
  .lm-btn:hover, .lm-form-submit:hover { color: #252C43; }
  .lm-btn:hover::before, .lm-form-submit:hover::before { transform: translateX(0); }
  .lm-btn:hover svg, .lm-form-submit:hover svg { transform: translate(3px, -3px); }
  .lm-hover-card:hover { transform: perspective(1000px) translateY(-10px) rotateX(var(--lm-rx, 0deg)) rotateY(var(--lm-ry, 0deg)); box-shadow: 0 28px 60px -24px color-mix(in srgb, #252C43 22%, transparent); z-index: 3; }
  .lm-hover-card:hover::after, .lm-cover:hover::after { opacity: 0.6; }
  .lm-hover-card:hover > div:last-child > svg { transform: scale(1.04) translateY(-2px); }
  .lm-benefits-grid:has(.lm-hover-card:hover) .lm-hover-card:not(:hover) { opacity: 0.6; }
  .lm-cover:hover { transform: perspective(1000px) translateY(-10px) translateZ(60px) rotateX(var(--lm-rx, 0deg)) rotateY(var(--lm-ry, 0deg)) rotate(-1deg); box-shadow: 0 32px 64px -20px color-mix(in srgb, #252C43 24%, transparent); }
  #inside-playbook [role="tab"]:hover { transform: translateY(-4px); background: #FFFFFF; }
  #faq .lm-faq-row button:hover { color: #8E7CE8; }
  #faq .lm-faq-row button:hover > span { transform: translateX(4px); }
  #final-download .lm-final-cover:hover { transform: translateY(-12px) rotate(1deg); }
}

@media (prefers-reduced-motion: no-preference) {
  [data-lm-motion="live"] .lm-hero-title .lm-word__in { animation: lm-mask-rise 1000ms var(--lm-ease) calc(120ms + var(--word) * 55ms) both; }
  [data-lm-motion="live"] .lm-edition, [data-lm-motion="live"] .lm-hero-description { animation: lm-copy-arrive 900ms var(--lm-ease) 250ms both; }
  [data-lm-motion="live"] .lm-hero-facts, [data-lm-motion="live"] .lm-text-link { animation: lm-copy-arrive 900ms var(--lm-ease) 550ms both; }
  [data-lm-motion="live"] .lm-nav-shell { animation: lm-nav-arrive 850ms var(--lm-ease) both; }
  [data-lm-heading] .lm-word__in { transition: transform 850ms var(--lm-ease), opacity 600ms var(--lm-ease); transition-delay: calc(var(--word) * 35ms); }
  [data-lm-heading][data-lm-armed="true"] .lm-word__in { transform: translateY(110%) rotate(3deg); opacity: 0; }
  .landing-shell [data-lm-reveal][data-lm-armed="true"] { opacity: 0; transform: translateY(40px) scale(0.97); }
  .landing-shell [data-lm-reveal] { transition: opacity 800ms var(--lm-ease), transform 1000ms var(--lm-ease); }
  [data-lm-reveal="wipe"][data-lm-armed="true"] { clip-path: inset(0 0 100% 0 round 20px); }
  [data-lm-reveal="wipe"] { transition: clip-path 1100ms var(--lm-ease), transform 1000ms var(--lm-ease); }
}
@keyframes lm-mask-rise { from { opacity: 0; transform: translateY(115%) rotate(4deg); } to { opacity: 1; transform: none; } }
@keyframes lm-copy-arrive { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
@keyframes lm-nav-arrive { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: none; } }

[data-lm-playing="false"] *, [data-lm-hidden="true"] * { animation-play-state: paused !important; }
@media (min-width: 1024px) and (min-height: 680px) and (prefers-reduced-motion: no-preference) {
  [data-lm-motion="live"] .lm-hero { height: 165svh; }
  [data-lm-motion="live"] .lm-hero-stage { position: sticky; top: 0; height: 100svh; }
  [data-lm-motion="live"] .lm-page-sheet { margin-top: -8svh; }
}
@media (min-width: 1024px) and (max-height: 800px) {
  .lm-hero-stage { padding-top: 100px; padding-bottom: 64px; }
  .lm-hero-title { font-size: clamp(48px, 4.8vw, 72px); }
  .lm-edition { margin-bottom: 20px; }
  .lm-hero-description { font-size: 13px; margin-top: 18px; }
  .lm-hero-form { margin-top: 20px; }
  .lm-hero-facts { margin-top: 20px; }
  .lm-hero-art { height: 555px; display: flex; align-items: center; }
  .lm-workspace { position: absolute; top: 0; left: 0; transform: scale(0.78); transform-origin: top left; width: 120%; flex-shrink: 0; margin: 0; }
  .lm-hero-bottom { bottom: 14px; }
}
@media (min-width: 1600px) {
  .lm-workspace { max-width: 640px; }
  .lm-workspace-stage { height: 640px; }
  .lm-workspace-float--processing { top: 220px; }
  .lm-workspace-float--output { top: 455px; }
}
@media (max-width: 1100px) {
  .lm-desktop-nav { gap: 18px; }
  .lm-studio-link { display: none; }
  .lm-nav-actions { gap: 12px; }
}
@media (max-width: 1023px) {
  .lm-hero-stage { padding-top: 128px; padding-bottom: 100px; }
  .lm-hero-grid { grid-template-columns: 1fr; gap: 48px; max-width: 720px; }
  .lm-hero-title { font-size: clamp(48px, 8vw, 76px); max-width: 720px; }
  .lm-hero-copy { transform: none; opacity: 1; }
  .lm-hero-description { max-width: 540px; }
  .lm-hero-art { max-width: 600px; width: 100%; margin-inline: auto; }
  .lm-workspace { max-width: 600px; }
  .lm-hero-bottom { bottom: 24px; flex-wrap: wrap; justify-content: center; }
  .lm-scroll-cue { display: none; }
  .lm-statement { padding-top: 48px; padding-bottom: 80px; }
  #the-problem { margin-inline: 16px; }
  #the-problem .lm-problem-canvas { min-height: 0; }
  #faq > div { grid-template-columns: 1fr; gap: 40px; }
  #faq > div > div:first-child { position: static; }
  .lm-desktop-nav { display: none; }
  .lm-menu-toggle { display: flex; }
  .playbook-stack-grid > .stack-card-front { transform: none; }
  .lm-cover { transform: rotate(-3deg); max-width: 340px; }
}
@media (max-width: 600px) {
  .lumen-header { top: 12px; padding-inline: 16px; }
  .lm-nav-shell { min-height: 56px; padding: 6px 8px 6px 16px; gap: 12px; }
  .lm-logo { font-size: 15px; gap: 8px; }
  .lm-logo svg { width: 23px; height: 23px; }
  .lm-nav-actions { gap: 4px; }
  .lm-nav-actions > .lm-btn { font-size: 9px; padding: 10px 12px; gap: 6px; border-radius: 9px; }
  .lm-nav-actions > .lm-btn svg { width: 12px; }
  .lm-hero-stage { padding-top: 116px; padding-bottom: 90px; }
  .lm-hero-title { font-size: clamp(44px, 12vw, 64px); }
  .lm-edition { font-size: 10px; margin-bottom: 24px; }
  .lm-edition > span:last-child { display: none; }
  .lm-hero-description { font-size: 14px; }
  .lm-hero-facts { column-gap: 16px; font-size: 9px; }
  .lm-hero-facts b { font-size: 16px; }
  .lm-hero-grid { gap: 40px; }
  .lm-workspace-meta { font-size: 8px; gap: 8px; }
  .lm-workspace-meta > span { gap: 6px; max-width: 200px; }
  .lm-replay { font-size: 8px; padding: 6px 8px; }
  .lm-workspace-stage { height: 580px; }
  .lm-workspace-float--input { width: 85%; top: 28px; left: 0; transform: rotate(-4deg); }
  .lm-workspace-float--processing { width: 90%; top: 200px; right: -1%; transform: rotate(4deg); }
  .lm-workspace-float--output { width: 86%; top: 420px; left: 0; transform: rotate(-3deg); }
  .lm-workspace-panel { padding: 15px; }
  .lm-workspace-caption { font-size: 9px; padding-inline: 8px; }
  .lm-workflow-ribbon { padding-block: 22px; border-radius: 24px 24px 0 0; }
  .lm-workflow-ribbon__group { gap: 28px; padding-right: 28px; }
  .lm-workflow-ribbon__group > span { font-size: 20px; }
  .lm-page-sheet { border-radius: 24px 24px 0 0; }
  .lm-statement p { font-size: clamp(35px, 9.4vw, 52px); }
  .lm-statement__note { font-size: 10px; }
  .lm-page-sheet .landing-section h2 { font-size: 36px; }
  .lm-page-sheet .landing-section h2 + p { font-size: 13px; }
  #the-problem { border-radius: 24px; }
  #the-problem .lm-problem-canvas { padding: 20px; }
  #the-problem .lm-fragment { min-height: auto; }
  #inside-playbook { margin-inline: 0; border-radius: 24px; }
  #inside-playbook [role="tab"] { padding: 16px; }
  #inside-playbook [role="tab"] p { display: none; }
  #inside-playbook .lm-cover { max-width: 260px; }
  #faq .lm-faq-row button { font-size: 14px; }
  #final-download > div > div { padding: 28px; border-radius: 24px; }
  #final-download h2 { font-size: 36px; }
}
@media (prefers-reduced-motion: reduce) {
  .lm-hero-copy, .lm-workspace-float, .lm-workspace-plane, .lm-cover, .lm-hover-card, .playbook-stack-grid > [role="tabpanel"] { transform: none !important; opacity: 1 !important; }
  .lm-hero { height: auto !important; }
  .lm-hero-stage { position: relative !important; }
  .lm-word__in { transform: none !important; opacity: 1 !important; animation: none !important; }
  .lm-workflow-ribbon__track, .lm-scroll-cue svg, .lm-processing-meter i { animation: none !important; }
  .lm-faq-answer { transition: none; }
  .lm-magnetic { translate: none !important; }
  [data-lm-reveal] { clip-path: none !important; opacity: 1 !important; }
}
@media (min-width: 1024px) {
  #the-problem .lm-fragment--drift-0 { transform: translate(-24px, -24px) rotate(-9deg); }
  #the-problem .lm-fragment--drift-1 { transform: translate(16px, 28px) rotate(7deg); }
  #the-problem .lm-fragment--drift-2 { transform: translate(-12px, -32px) rotate(-6deg); }
  #the-problem .lm-fragment--drift-3 { transform: translate(24px, 20px) rotate(10deg); }
  #the-problem .lm-fragment--drift-4 { transform: translate(8px, -18px) rotate(-5deg); }
}
@media (prefers-reduced-motion: reduce) {
  #the-problem .lm-fragment { transform: none !important; }
}
.lm-mobile-menu { pointer-events: auto; }
.lm-workflow-ribbon:focus-within .lm-workflow-ribbon__track { animation-play-state: paused; }
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
<![CDATA[import { SplitText } from '../motion/SplitText';
import React from 'react';

export const BenefitsSection: React.FC = () => {
  return (
    <section
      id="benefits"
      data-lm-ambient=""
      aria-labelledby="benefits-heading"
      className="landing-section py-20 sm:py-28"
    >
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-medium text-[#657187]">
            03 · THE BENEFITS — WHAT BETTER WORKFLOWS ENABLE
          </p>
          <h2 data-lm-heading=""
            id="benefits-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-[#1E2432] sm:text-4xl [text-wrap:balance]"
          ><SplitText text={"Less busywork. More meaningful work."} /></h2>
          <p className="mt-4 text-base text-[#657187] leading-relaxed">
            Well-designed workflows do not replace human judgment—they remove repetitive formatting, sorting, and first-pass synthesis so your team can focus on decisions that matter.
          </p>
        </div>

        {/* Asymmetric Bento Grid with 3 distinct SVG visual compositions */}
        <div className="lm-benefits-grid mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Benefit 01 — Find opportunities (col-span-4) */}
          <article
            data-lm-reveal="card"
            style={{ transitionDelay: '0ms' }}
            className="lm-hover-card glass-panel rounded-3xl p-6 sm:p-7 lg:col-span-4 flex flex-col justify-between"
          >
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
          <article
            data-lm-reveal="card"
            style={{ transitionDelay: '50ms' }}
            className="lm-hover-card glass-panel rounded-3xl p-6 sm:p-7 lg:col-span-4 flex flex-col justify-between"
          >
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

            {/* Illustration 2: Glass panels connected through clear SVG pathways */}
            <div className="mt-6 rounded-2xl border border-white/85 bg-white/70 p-4">
              <svg
                viewBox="0 0 320 150"
                className="h-36 w-full"
                role="img"
                aria-label="Three workflow nodes linked by SVG pathways"
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
          <article
            data-lm-reveal="card"
            style={{ transitionDelay: '100ms' }}
            className="lm-hover-card glass-panel rounded-3xl p-6 sm:p-7 lg:col-span-4 flex flex-col justify-between"
          >
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
<![CDATA[import { SplitText } from '../motion/SplitText';
import React, { useState } from 'react';
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
          <h2 data-lm-heading=""
            id="credibility-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-[#1E2432] sm:text-4xl [text-wrap:balance]"
          ><SplitText text={"Practical ideas. Clear frameworks. No unnecessary complexity."} /></h2>
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
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors duration-160 whitespace-nowrap shrink-0 cursor-pointer ${
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
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors duration-160 whitespace-nowrap shrink-0 cursor-pointer ${
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
                <div key="before" className="mt-6 space-y-3 transition-opacity duration-160 ease-[var(--lm-ease-feedback)]">
                  <p className="text-xs font-mono text-[#657187]">
                    MANUAL PROCESS — REPETITIVE CONTEXT SWITCHING
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="min-h-[148px] rounded-2xl border border-white/80 bg-white/75 p-4 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[11px] text-[#657187]">01. READ &amp; SORT</span>
                        <p className="mt-1.5 text-xs font-semibold text-[#1E2432]">
                          Manual classification
                        </p>
                      </div>
                      <p className="mt-1 text-xs text-[#657187]">
                        Open long email threads, identify intent, and copy details into tracker.
                      </p>
                    </div>
                    <div className="min-h-[148px] rounded-2xl border border-white/80 bg-white/75 p-4 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[11px] text-[#657187]">02. SUMMARIZE</span>
                        <p className="mt-1.5 text-xs font-semibold text-[#1E2432]">
                          Ad-hoc notes
                        </p>
                      </div>
                      <p className="mt-1 text-xs text-[#657187]">
                        Rewrite key dates and questions by hand for the internal team channel.
                      </p>
                    </div>
                    <div className="min-h-[148px] rounded-2xl border border-white/80 bg-white/75 p-4 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[11px] text-[#657187]">03. FOLLOW-UP</span>
                        <p className="mt-1.5 text-xs font-semibold text-[#1E2432]">
                          Blank-page drafting
                        </p>
                      </div>
                      <p className="mt-1 text-xs text-[#657187]">
                        Search past replies for standard policy clauses and draft response from scratch.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div key="after" className="mt-6 space-y-3 transition-opacity duration-160 ease-[var(--lm-ease-feedback)]">
                  <p className="text-xs font-mono text-[#5BA59A] font-medium">
                    STRUCTURED AI-ASSISTED WORKFLOW WITH HUMAN REVIEW STEP
                  </p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="min-h-[148px] rounded-2xl border border-[#D8D0F7] bg-white/90 p-4 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[11px] text-[#657187]">01. CLASSIFY &amp; EXTRACT</span>
                        <p className="mt-1.5 text-xs font-semibold text-[#1E2432]">
                          Structured intake brief
                        </p>
                      </div>
                      <p className="mt-1 text-xs text-[#657187]">
                        Workflow tags category, extracts requested dates, and flags any ambiguous items.
                      </p>
                    </div>
                    <div className="min-h-[148px] rounded-2xl border border-[#C9DAFA] bg-white/90 p-4 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[11px] text-[#657187]">02. PREPARE DRAFT</span>
                        <p className="mt-1.5 text-xs font-semibold text-[#1E2432]">
                          Grounded reply template
                        </p>
                      </div>
                      <p className="mt-1 text-xs text-[#657187]">
                        Assembles a draft response using approved reference clauses and source facts.
                      </p>
                    </div>
                    <div className="min-h-[148px] rounded-2xl border border-[#5BA59A]/50 bg-[#252C43] text-white p-4 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[11px] text-[#C9DAFA]">03. HUMAN CHECKPOINT</span>
                        <p className="mt-1.5 text-xs font-semibold text-white">
                          Verify &amp; send
                        </p>
                      </div>
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
        className="lm-form-success glass-panel-active rounded-2xl p-6 transition-[transform,opacity,background-color,border-color,box-shadow] duration-300"
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
            className="lm-form-submit lm-magnetic inline-flex items-center justify-center gap-2 rounded-xl bg-[#252C43] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1E2432] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43]"
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
      <div className="lm-form-surface glass-panel rounded-2xl p-2 sm:p-2.5">
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
            className="lm-form-submit lm-magnetic inline-flex items-center justify-center gap-2 rounded-xl bg-[#252C43] px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1E2432] disabled:opacity-60 transition-[transform,opacity,background-color,border-color,box-shadow] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43]"
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
<![CDATA['use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { FAQ_ITEMS } from '../utils/workflowLogic';
import { SplitText } from '../motion/SplitText';

export function FaqSection() {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ free: true, receive: true });
  return (
    <section id="faq" aria-labelledby="faq-heading" className="landing-section py-20 sm:py-28">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div>
          <h2 id="faq-heading" data-lm-heading=""><SplitText text="Everything you need to know." /></h2>
          <p>Clear answers about what is inside the playbook, how to apply the frameworks, and how this interactive preview handles your email.</p>
          <a className="lm-text-link" href="#hero-download-form"><span>Ready to get started?</span><Plus size={14} aria-hidden="true" /></a>
        </div>
        <div className="divide-y divide-[#1E2432]/10">
          {FAQ_ITEMS.map((item) => {
            const open = Boolean(openIds[item.id]);
            return (
              <div key={item.id} className="lm-faq-row">
                <h3><button id={'faq-button-' + item.id} type="button" aria-expanded={open} aria-controls={'faq-answer-' + item.id} onClick={() => setOpenIds((old) => ({ ...old, [item.id]: !old[item.id] }))} className="flex w-full items-center justify-between gap-4 text-left font-medium cursor-pointer"><span>{item.question}</span><Plus aria-hidden="true" style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }} /></button></h3>
                <div id={'faq-answer-' + item.id} role="region" aria-labelledby={'faq-button-' + item.id} aria-hidden={!open} inert={!open} className="lm-faq-answer" data-open={open}><div><p>{item.answer}</p></div></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/FinalCtaSection.tsx">
<![CDATA[import { SplitText } from '../motion/SplitText';
import React, { useState } from 'react';
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
              <h2 data-lm-heading=""
                id="final-cta-heading"
                className="mt-3 text-3xl font-bold tracking-tight text-[#1E2432] sm:text-4xl lg:text-5xl [text-wrap:balance]"
              ><SplitText text={"Your smarter workflow starts here."} /></h2>
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
                  data-lm-reveal="rear-sheet-2"
                  className="absolute -right-5 -top-5 h-full w-full pointer-events-none"
                >
                  <div className="glass-panel-subtle h-full w-full rounded-3xl rotate-6 scale-95" />
                </div>
                {/* Middle Translucent Glass Sheet 1 */}
                <div
                  aria-hidden="true"
                  data-lm-reveal="rear-sheet-1"
                  className="absolute -left-4 -bottom-4 h-full w-full pointer-events-none"
                >
                  <div className="glass-panel h-full w-full rounded-3xl -rotate-3 scale-95" />
                </div>
                {/* Front Floating Playbook Cover */}
                <div className="lm-final-cover glass-panel-active relative z-10 rounded-3xl p-3 shadow-lg transition-transform duration-500 hover:-translate-y-1.5">
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
    <file path="src/app/(lumen)/lumen/components/FooterDroplets.ts">
<![CDATA[import * as THREE from 'three';

interface FloatingDrop {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  phase: number;
  opacity: number;
}

interface BurstDrop {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  start: number;
  life: number;
}

/** A bounded, reusable set of water droplets for the footer's existing WebGL scene. */
export function createFooterDroplets() {
  const floatingCount = 18;
  const burstCount = 18;
  const total = floatingCount + burstCount;
  let seed = 4197;
  const random = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };

  const floating: FloatingDrop[] = Array.from({ length: floatingCount }, (_, index) => ({
    x: -1.9 + random() * 4.3,
    y: -0.7 + random() * 1.95,
    z: 1.4 + random() * 0.3,
    size: (index < 3 ? 0.055 : 0.024) + random() * 0.024,
    speed: 0.28 + random() * 0.24,
    phase: random() * Math.PI * 2,
    opacity: 0.55 + random() * 0.35,
  }));
  const bursts: BurstDrop[] = Array.from({ length: burstCount }, () => ({
    x: 0, y: 0, vx: 0, vy: 0, size: 0, start: -100, life: 1,
  }));
  let nextBurst = 0;

  const geometry = new THREE.SphereGeometry(1, 20, 14);
  const positions = geometry.getAttribute('position');
  for (let i = 0; i < positions.count; i++) {
    const y = positions.getY(i);
    const taper = 1 - Math.max(0, y) * 0.3;
    positions.setXYZ(i, positions.getX(i) * taper, y * 1.14, positions.getZ(i) * taper);
  }
  geometry.computeVertexNormals();
  const opacities = new THREE.InstancedBufferAttribute(new Float32Array(total), 1);
  opacities.setUsage(THREE.DynamicDrawUsage);
  geometry.setAttribute('aOpacity', opacities);

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    depthTest: false,
    vertexShader: `
      attribute float aOpacity;
      varying vec3 vDropNormal;
      varying float vDropOpacity;
      void main() {
        vDropNormal = normalize(normalMatrix * mat3(instanceMatrix) * normal);
        vDropOpacity = aOpacity;
        gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vDropNormal;
      varying float vDropOpacity;
      void main() {
        vec3 n = normalize(vDropNormal);
        float rim = pow(1.0 - abs(n.z), 2.0);
        float highlight = pow(max(dot(n, normalize(vec3(-0.35, 0.55, 1.0))), 0.0), 38.0);
        float softLight = pow(max(dot(n, normalize(vec3(0.5, -0.3, 1.0))), 0.0), 10.0);
        vec3 tint = mix(vec3(0.16, 0.27, 0.60), vec3(1.0), min(1.0, highlight + rim * 0.15));
        float alpha = (0.08 + rim * 0.78 + highlight * 0.8 + softLight * 0.08) * vDropOpacity;
        gl_FragColor = vec4(tint, min(alpha, 0.9));
        #include <colorspace_fragment>
      }
    `,
  });
  const mesh = new THREE.InstancedMesh(geometry, material, total);
  mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  mesh.renderOrder = 6;
  mesh.frustumCulled = false;
  const group = new THREE.Group();
  group.add(mesh);
  const rippleGeometry = new THREE.RingGeometry(0.975, 1, 48);
  const ripples = Array.from({ length: 3 }, () => {
    const rippleMaterial = new THREE.MeshBasicMaterial({
      color: '#8E7CE8', transparent: true, opacity: 0, depthWrite: false, depthTest: false,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(rippleGeometry, rippleMaterial);
    ring.renderOrder = 5.5;
    ring.visible = false;
    group.add(ring);
    return { ring, start: -100 };
  });
  let nextRipple = 0;
  const dummy = new THREE.Object3D();

  const setDrop = (index: number, x: number, y: number, z: number, size: number, opacity: number) => {
    dummy.position.set(x, y, z);
    dummy.scale.setScalar(size);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
    opacities.setX(index, opacity);
  };

  const update = (time: number, pointer: THREE.Vector2, pointerStrength: number) => {
    floating.forEach((drop, index) => {
      const phase = time * drop.speed + drop.phase;
      let x = drop.x + Math.sin(phase) * 0.12;
      let y = drop.y + Math.cos(phase * 0.75) * 0.15;
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const distance = Math.hypot(dx, dy);
      const push = Math.exp(-distance * distance * 5) * pointerStrength * 0.25;
      if (distance > 0.001) {
        x += (dx / distance) * push;
        y += (dy / distance) * push;
      }
      setDrop(index, x, y, drop.z + Math.sin(phase * 0.7) * 0.1, drop.size, drop.opacity);
    });

    bursts.forEach((drop, index) => {
      const age = time - drop.start;
      if (age < 0 || age >= drop.life) {
        setDrop(floatingCount + index, 0, 0, 1.5, 0, 0);
        return;
      }
      const progress = age / drop.life;
      const fade = Math.min(1, age * 8) * Math.min(1, (1 - progress) * 3);
      setDrop(
        floatingCount + index,
        drop.x + drop.vx * age,
        drop.y + drop.vy * age - 0.12 * age * age,
        1.8,
        drop.size * (0.55 + 0.45 * fade),
        fade * 0.9
      );
    });
    ripples.forEach(({ ring, start }) => {
      const progress = (time - start) / 1.3;
      ring.visible = progress >= 0 && progress < 1;
      if (ring.visible) {
        ring.scale.setScalar(0.04 + progress * 0.48);
        ring.material.opacity = Math.sin(progress * Math.PI) * 0.38;
      }
    });
    mesh.instanceMatrix.needsUpdate = true;
    opacities.needsUpdate = true;
  };

  const burst = (x: number, y: number, time: number) => {
    const ripple = ripples[nextRipple];
    nextRipple = (nextRipple + 1) % ripples.length;
    ripple.start = time;
    ripple.ring.position.set(x, y, 1.75);
    for (let i = 0; i < 6; i++) {
      const drop = bursts[nextBurst];
      nextBurst = (nextBurst + 1) % burstCount;
      drop.x = x + (random() - 0.5) * 0.08;
      drop.y = y + (random() - 0.5) * 0.06;
      drop.vx = (random() - 0.5) * 0.45;
      drop.vy = 0.25 + random() * 0.35;
      drop.size = 0.025 + random() * 0.035;
      drop.start = time + i * 0.025;
      drop.life = 1.6 + random() * 0.6;
    }
  };

  return {
    group,
    mesh,
    update,
    burst,
    dispose: () => {
      mesh.dispose();
      geometry.dispose();
      material.dispose();
      rippleGeometry.dispose();
      ripples.forEach(({ ring }) => ring.material.dispose());
    },
  };
}
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
import { createFooterDroplets } from './FooterDroplets';

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
    const localPointer = { value: new THREE.Vector2(0, 0) };
    const pointerStrength = { value: 0 };
    const pointerTarget = new THREE.Vector2(0, 0);
    let targetStrength = 0;
    const particles = createFooterParticles(motion, renderer.getPixelRatio(), localPointer, pointerStrength);
    const droplets = createFooterDroplets();
    scene.add(particles, droplets.group);
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
      droplets.group.position.set(offsetX, offsetY, 0);
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

    const pointInArtwork = (clientX: number, clientY: number) => {
      const rect = mount.getBoundingClientRect();
      const footer = mount.closest('footer')?.getBoundingClientRect();
      if (
        rect.width === 0 || rect.height === 0 ||
        clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom ||
        !footer || clientX < footer.left || clientX > footer.right || clientY < footer.top || clientY > footer.bottom
      ) return null;
      return {
        x: camera.left + ((clientX - rect.left) / rect.width) * (camera.right - camera.left) - particles.position.x,
        y: camera.top - ((clientY - rect.top) / rect.height) * (camera.top - camera.bottom) - particles.position.y,
      };
    };
    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
      pointer.y = (event.clientY / Math.max(1, window.innerHeight) - 0.5) * 2;
      const point = pointInArtwork(event.clientX, event.clientY);
      if (point) {
        pointerTarget.set(point.x, point.y);
        if (pointerStrength.value < 0.01) localPointer.value.copy(pointerTarget);
        targetStrength = 1;
      } else {
        targetStrength = 0;
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || (event.target instanceof Element && event.target.closest('a, button, input, textarea, select, [role="button"]'))) return;
      const point = pointInArtwork(event.clientX, event.clientY);
      if (point) droplets.burst(point.x, point.y, elapsed);
    };
    const onPointerEnd = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') targetStrength = 0;
    };
    const clearPointer = () => { targetStrength = 0; };
    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) clearPointer();
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
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerEnd, { passive: true });
    window.addEventListener('pointercancel', onPointerEnd, { passive: true });
    window.addEventListener('pointerout', onPointerOut, { passive: true });
    window.addEventListener('blur', clearPointer);
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
      localPointer.value.lerp(pointerTarget, Math.min(1, delta * 5));
      pointerStrength.value += (targetStrength - pointerStrength.value) * Math.min(1, delta * 5);
      droplets.update(elapsed, localPointer.value, pointerStrength.value);
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
        droplets.update(0, localPointer.value, 0);
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
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerEnd);
      window.removeEventListener('pointercancel', onPointerEnd);
      window.removeEventListener('pointerout', onPointerOut);
      window.removeEventListener('blur', clearPointer);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);
      if (sculpture) disposeModel(sculpture);
      particles.geometry.dispose();
      particles.material.dispose();
      droplets.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [onReadyChange]);

  return <div ref={mountRef} aria-hidden="true" data-mode="live" className="absolute inset-0" />;
};
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/FooterParticles.ts">
<![CDATA[import * as THREE from 'three';

/** A small field of soft, independent light motes around the footer sculpture. */
export function createFooterParticles(
  time: THREE.IUniform<number>,
  pixelRatio: number,
  pointer: THREE.IUniform<THREE.Vector2>,
  pointerStrength: THREE.IUniform<number>
) {
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
    uniforms: { uTime: time, uPixelRatio: { value: pixelRatio }, uPointer: pointer, uPointerStrength: pointerStrength },
    transparent: true,
    depthWrite: false,
    depthTest: false,
    vertexShader: `
      uniform float uTime;
      uniform float uPixelRatio;
      uniform vec2 uPointer;
      uniform float uPointerStrength;
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
        vec2 away = mote.xy - uPointer;
        float distanceToPointer = length(away);
        float push = exp(-distanceToPointer * distanceToPointer * 5.0) * uPointerStrength;
        mote.xy += away / max(distanceToPointer, 0.001) * push * 0.22;
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

    const syncActivityRef = useRef<() => void>(() => {});
    useEffect(() => {
      syncActivityRef.current();
    }, [paused]);

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
      const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      let isReducedMotion = reducedMotionQuery.matches;
      let frameId = 0;
      let timerId = 0;
      let disposed = false;
      let isRunning = false;
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

        const shouldRun = isVisible && !pausedRef.current && !isReducedMotion && !document.hidden;
        if (!shouldRun) {
          isRunning = false;
          return;
        }

        const nowMs = performance.now();
        const dtSec = Math.min(0.1, (nowMs - lastTimeMs) / 1000);
        lastTimeMs = nowMs;

        const eng = engineRef.current;
        if (eng) {
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

      function syncActivity() {
        if (disposed) return;
        const shouldRun = isVisible && !pausedRef.current && !isReducedMotion && !document.hidden;
        if (shouldRun && !isRunning) {
          isRunning = true;
          lastTimeMs = performance.now();
          if (isSoftwareGl) {
            afterDraw(tick);
          } else {
            frameId = requestAnimationFrame(tick);
          }
        } else if (!shouldRun && isRunning) {
          isRunning = false;
          cancelAnimationFrame(frameId);
          clearTimeout(timerId);
          if (engineRef.current) {
            engineRef.current.renderSingleFrame(engineRef.current.elapsedTime, transparentRef.current);
          }
        }
      }

      const handleVisibilityChange = () => {
        syncActivity();
      };
      const handleReducedMotionChange = (e: MediaQueryListEvent) => {
        isReducedMotion = e.matches;
        syncActivity();
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);
      reducedMotionQuery.addEventListener('change', handleReducedMotionChange);
      syncActivityRef.current = syncActivity;
      syncActivity();

      return () => {
        disposed = true;
        syncActivityRef.current = () => {};
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        reducedMotionQuery.removeEventListener('change', handleReducedMotionChange);
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
<![CDATA['use client';

import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import gsap from 'gsap';
import { ArrowDown, ArrowUpRight, Check, CheckCheck, FileText, Mail, Mic, Play, ShieldCheck, Sparkles, ListChecks } from 'lucide-react';
import { WORKSPACE_SCENARIOS, getStageCaption, type WorkspaceStageId, type ProcessingSubStep } from '../utils/workflowLogic';
import { WorkspacePlaybackController } from '../motion/workspacePlayback';
import { useMotionPreferences } from '../motion/useMotionPreferences';

const icons = { emails: Mail, documents: FileText, tasks: ListChecks, notes: Mic };
const stages = [{ id: 'input', label: '01 Input' }, { id: 'processing', label: '02 AI Processing' }, { id: 'output', label: '03 Output' }] as const;

export function GlassWorkspace({ introConsumedRef }: { introConsumedRef?: RefObject<boolean> }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const entrances = useRef<(HTMLDivElement | null)[]>([]);
  const playbackRef = useRef<WorkspacePlaybackController | null>(null);
  if (!playbackRef.current) playbackRef.current = new WorkspacePlaybackController(introConsumedRef);
  const [scenarioId, setScenarioId] = useState('emails');
  const [step, setStep] = useState<ProcessingSubStep>('route');
  const [selected, setSelected] = useState<WorkspaceStageId | null>(null);
  const [playing, setPlaying] = useState(false);
  const prefs = useMotionPreferences();
  const scenario = WORKSPACE_SCENARIOS.find((item) => item.id === scenarioId) ?? WORKSPACE_SCENARIOS[0];
  const SourceIcon = icons[scenarioId as keyof typeof icons] ?? Mail;

  const run = useCallback((id: string) => {
    const playback = playbackRef.current;
    if (!playback) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      playback.consumeIntro(); setStep('route'); setPlaying(false); return;
    }
    setPlaying(true);
    setStep('classify');
    playback.startPlayback(id, setStep, () => { setPlaying(false); setStep('route'); });
  }, []);

  useEffect(() => {
    if (!prefs.ready) return;
    const playback = playbackRef.current!;
    if (prefs.prefersReducedMotion) {
      playback.cancelPlayback('reduced-motion');
      playback.consumeIntro();
      return;
    }
    let context: gsap.Context | undefined;
    let introStarted = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting || !playback.shouldPlayIntro() || introStarted) return;
      introStarted = true;
      observer.disconnect();
      context = gsap.context(() => {
        gsap.fromTo(entrances.current.filter(Boolean),
          { y: 70, rotationX: -12, scale: 0.88, opacity: 0 },
          { y: 0, rotationX: 0, scale: 1, opacity: 1, stagger: 0.16, duration: 1.05, ease: 'expo.out', clearProps: 'transform,opacity' });
        run('emails');
      }, rootRef);
    }, { threshold: 0.2 });
    if (rootRef.current) observer.observe(rootRef.current);
    const suspend = () => {
      if (document.hidden) {
        playback.cancelPlayback('document-hidden'); playback.consumeIntro();
        setPlaying(false); setStep('route');
      }
    };
    const reducedQuery = matchMedia('(prefers-reduced-motion: reduce)');
    const reduce = () => {
      if (!reducedQuery.matches) return;
      playback.cancelPlayback('reduced-motion'); playback.consumeIntro();
      setPlaying(false); setStep('route');
    };
    document.addEventListener('visibilitychange', suspend);
    reducedQuery.addEventListener('change', reduce);
    return () => {
      observer.disconnect(); context?.revert(); playback.dispose(false);
      document.removeEventListener('visibilitychange', suspend);
      reducedQuery.removeEventListener('change', reduce);
    };
  }, [prefs.ready, prefs.prefersReducedMotion, run]);

  const inspect = (id: WorkspaceStageId) => {
    playbackRef.current?.cancelPlayback('user-stage-select');
    playbackRef.current?.consumeIntro();
    setPlaying(false);
    setSelected((old) => old === id ? null : id);
  };
  const selectSource = (id: string) => {
    playbackRef.current?.cancelPlayback('user-scenario-change');
    playbackRef.current?.consumeIntro();
    setScenarioId(id); setStep('classify'); setSelected('input'); setPlaying(false);
  };

  return (
    <div ref={rootRef} className="lm-workspace" data-playing={playing} data-step={step}>
      <div className="lm-workspace-meta">
        <span><span className="lm-live-dot" /> A little structure changes everything.</span>
        <button type="button" onClick={() => { setSelected(null); run(scenarioId); }} className="lm-replay"><Play size={12} aria-hidden="true" />{playing ? 'Restarting Demo' : 'Replay Demo'}</button>
      </div>
      <div className="lm-workspace-stage">
        <div className="lm-orbit lm-orbit--one" aria-hidden="true" />
        <div className="lm-orbit lm-orbit--two" aria-hidden="true" />
        <div className="lm-workspace-plane workspace-tilt-plane">
          <svg className="lm-workspace-connectors" viewBox="0 0 600 600" fill="none" aria-hidden="true">
            <defs><linearGradient id="lm-workflow-ray"><stop stopColor="#8E7CE8" /><stop offset="1" stopColor="#5BA59A" /></linearGradient></defs>
            <path className="lm-connector-base" d="M185 160 C185 220 420 140 420 235 M420 370 C420 430 180 375 180 455" />
            <path className="lm-connector-signal" d="M185 160 C185 220 420 140 420 235 M420 370 C420 430 180 375 180 455" />
          </svg>
          <div className="lm-workspace-float lm-workspace-float--input">
            <div ref={(node) => { entrances.current[0] = node; }} className="lm-panel-entrance">
              <div className="lm-workspace-panel lm-workspace-panel--input" data-selected={selected === 'input'}>
                <div className="lm-panel-heading"><button type="button" onClick={() => inspect('input')} aria-pressed={selected === 'input'}><span className="lm-panel-number">01</span> Incoming work</button><SourceIcon size={16} aria-hidden="true" /></div>
                <div className="lm-source-tabs" role="group" aria-label="Choose a workflow source">
                  {WORKSPACE_SCENARIOS.map((item) => {
                    const Icon = icons[item.id as keyof typeof icons] ?? Mail;
                    return <button type="button" key={item.id} aria-pressed={scenarioId === item.id} onClick={() => selectSource(item.id)}><Icon size={13} aria-hidden="true" /><span>{item.categoryLabel}</span></button>;
                  })}
                </div>
                <div className="lm-source-content" key={scenarioId}><p>{scenario.title}</p><span>{scenario.sourceMeta}</span></div>
                <div className="lm-source-bottom"><span className="lm-live-dot" /> Unstructured input <ArrowDown size={12} aria-hidden="true" /></div>
              </div>
            </div>
          </div>
          <div className="lm-workspace-float lm-workspace-float--processing">
            <div ref={(node) => { entrances.current[1] = node; }} className="lm-panel-entrance">
              <div className="lm-workspace-panel lm-workspace-panel--processing" data-selected={selected === 'processing'}>
                <div className="lm-panel-heading"><button type="button" onClick={() => inspect('processing')} aria-pressed={selected === 'processing'}><span className="lm-panel-number">02</span> A clearer process</button><Sparkles size={16} aria-hidden="true" /></div>
                <div className="lm-process-steps">
                  {(['classify', 'summarize', 'route'] as const).map((id, i) => (
                    <button key={id} type="button" data-active={step === id} aria-pressed={step === id} onClick={() => { playbackRef.current?.cancelPlayback('user-stage-select'); playbackRef.current?.consumeIntro(); setStep(id); setPlaying(false); }}>
                      <span className="lm-step-check">{step === id ? <ArrowUpRight size={12} /> : <Check size={11} />}</span>
                      <span><strong>{['Classify', 'Summarize', 'Route'][i]}</strong><small>{id === 'classify' ? scenario.classification.intent : id === 'summarize' ? scenario.summaryBullets[0] : scenario.routeDestination}</small></span>
                    </button>
                  ))}
                </div>
                <div className="lm-processing-footer"><span className="lm-processing-meter"><i /><i /><i /><i /><i /></span><span>AI-assisted. Human-directed.</span></div>
              </div>
            </div>
          </div>
          <div className="lm-workspace-float lm-workspace-float--output">
            <div ref={(node) => { entrances.current[2] = node; }} className="lm-panel-entrance">
              <div className="lm-workspace-panel lm-workspace-panel--output" data-selected={selected === 'output'}>
                <div className="lm-panel-heading"><button type="button" onClick={() => inspect('output')} aria-pressed={selected === 'output'}><span className="lm-panel-number">03</span> Ready for your judgment</button><CheckCheck size={17} aria-hidden="true" /></div>
                <div className="lm-output-title" key={scenarioId}><span>STRUCTURED OUTPUT</span><p>{scenario.outputDraft.summaryTitle}</p></div>
                <div className="lm-output-review"><ShieldCheck size={16} aria-hidden="true" /><span>{scenario.outputDraft.reviewStatus}</span></div>
              </div>
            </div>
          </div>
          <span className="lm-workspace-coordinate" aria-hidden="true">LUMEN / WORKFLOW 001</span>
        </div>
      </div>
      <div className="lm-workspace-controls" role="group" aria-label="Inspect workflow stage">
        {stages.map((stage) => <button type="button" key={stage.id} onClick={() => inspect(stage.id)} aria-pressed={selected === stage.id}>{stage.label}</button>)}
      </div>
      <p className="lm-workspace-caption" aria-live="polite">{getStageCaption(selected)}</p>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/HowItWorksSection.tsx">
<![CDATA['use client';
import { SplitText } from '../motion/SplitText';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { HOW_IT_WORKS_STEPS, HowItWorksStep } from '../utils/workflowLogic';
import { ShieldCheck, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState<HowItWorksStep['id']>('map');
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<SVGLineElement>(null);

  const activeIndex = HOW_IT_WORKS_STEPS.findIndex((s) => s.id === activeStepId);
  const currentStep = HOW_IT_WORKS_STEPS[activeIndex] || HOW_IT_WORKS_STEPS[0];

  const traceLine = useCallback(() => {
    const line = activeLineRef.current;
    if (!line) return;
    try {
      gsap.fromTo(
        line,
        { strokeDasharray: '840 840', strokeDashoffset: 840, opacity: 0.4 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.45, ease: 'power2.out' }
      );
    } catch {
      // JSDOM fallback
    }
  }, []);

  const handleSelectStep = (id: HowItWorksStep['id']) => {
    setActiveStepId(id);
    if (id !== 'map') {
      traceLine();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex = currentIndex;
    const total = HOW_IT_WORKS_STEPS.length;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % total;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + total) % total;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = total - 1;
    } else {
      return;
    }

    const nextStep = HOW_IT_WORKS_STEPS[nextIndex];
    handleSelectStep(nextStep.id);

    // Focus target button
    const container = tabsContainerRef.current;
    if (container) {
      const buttons = container.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      buttons[nextIndex]?.focus();
    }
  };

  useEffect(() => {
    if (activeStepId !== 'map') {
      traceLine();
    }
  }, [activeStepId, traceLine]);

  return (
    <section
      id="how-it-works"
      data-lm-ambient=""
      aria-labelledby="how-it-works-heading"
      className="landing-section py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10">
        <div className="max-w-2xl">
          <p className="font-mono text-xs font-medium text-[#657187]">
            05 · HOW IT WORKS — MAP, AUTOMATE, REVIEW
          </p>
          <h2 data-lm-heading=""
            id="how-it-works-heading"
            className="mt-3 text-3xl font-bold tracking-tight text-[#1E2432] sm:text-4xl [text-wrap:balance]"
          ><SplitText text={"From idea to working workflow."} /></h2>
          <p className="mt-4 text-base text-[#657187] leading-relaxed">
            The playbook walks through a structured three-stage methodology so your workflows remain transparent, testable, and easy to maintain.
          </p>
        </div>

        {/* 3 Step Selector Cards with Moving Outlined Selection Layer */}
        <div
          ref={tabsContainerRef}
          role="tablist"
          aria-label="Three-step workflow methodology"
          className="relative mt-10 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {/* Outlined selection layer that translates smoothly over 220ms */}
          <div
            aria-hidden="true"
            className="pointer-events-none hidden md:block absolute inset-y-0 left-0 rounded-2xl border-2 border-[#252C43] transition-transform duration-200"
            style={{
              width: 'calc((100% - 2rem) / 3)',
              transform: `translateX(calc(${activeIndex} * (100% + 1rem)))`,
              transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
            }}
          />

          {HOW_IT_WORKS_STEPS.map((step, idx) => {
            const isSelected = step.id === activeStepId;
            return (
              <button
                key={step.id}
                id={`how-it-works-tab-${step.id}`}
                role="tab"
                type="button"
                aria-selected={isSelected}
                aria-controls="how-it-works-panel"
                tabIndex={isSelected ? 0 : -1}
                onClick={() => handleSelectStep(step.id)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                className={`rounded-2xl p-6 text-left transition-[transform,opacity,background-color,border-color,box-shadow] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43] ${
                  isSelected
                    ? 'glass-panel-active border-[#252C43]/35 shadow-sm md:border-transparent'
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

        {/* Transforming Unified Workflow Diagram Tabpanel */}
        <div
          id="how-it-works-panel"
          role="tabpanel"
          aria-labelledby={`how-it-works-tab-${activeStepId}`}
          className="mt-8 glass-panel-active rounded-3xl p-6 sm:p-10 relative overflow-hidden"
        >
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
                  ref={activeLineRef}
                  x1="80"
                  y1="45"
                  x2="920"
                  y2="45"
                  stroke={activeStepId === 'review' ? '#5BA59A' : '#252C43'}
                  strokeWidth="2.5"
                />
              )}
            </svg>

            {/* Stable diagram node wrappers by index (0-3) to avoid unmounting */}
            <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {currentStep.nodes.map((node, idx) => {
                const isCheckpoint = node.kind === 'checkpoint';
                const isAi = node.kind === 'ai';
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl p-5 border transition-colors duration-180 ${
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
                      className={`mt-3 text-sm font-bold transition-colors duration-180 ${
                        isCheckpoint ? 'text-white' : 'text-[#1E2432]'
                      }`}
                    >
                      {node.title}
                    </h4>

                    <p
                      className={`mt-1.5 text-xs leading-relaxed transition-colors duration-180 ${
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
<![CDATA['use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { lockLumenScroll, scrollToLumen } from '../motion/scroll';

const links = [
  { href: '#workspace-hero', label: 'Workspace' },
  { href: '#inside-playbook', label: 'The playbook' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#faq', label: 'Questions' },
];

const subscribeHydration = () => () => {};

export function MinimalHeader({ onFocusForm, onOpenGlassStudio }: { onFocusForm: () => void; onOpenGlassStudio: () => void }) {
  const interactive = useSyncExternalStore(subscribeHydration, () => true, () => false);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) dialog.showModal();
    if (!open && dialog?.open) dialog.close();
    if (open) {
      const previous = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      lockLumenScroll(true);
      return () => { document.documentElement.style.overflow = previous; lockLumenScroll(false); };
    }
  }, [open]);
  const close = () => {
    dialogRef.current?.close();
    lockLumenScroll(false);
    setOpen(false);
    menuButton.current?.focus({ preventScroll: true });
  };
  return (
    <header className="lumen-header">
      <div className="lm-nav-shell">
        <a href="#workspace-hero" className="lm-logo" aria-label="Lumen, back to workspace">
          <svg viewBox="0 0 28 28" aria-hidden="true"><path d="m14 2 11 6v12l-11 6-11-6V8Z" /><path d="m3 8 11 6 11-6M14 14v12M14 2v12" /></svg>
          <span>LUMEN<span className="lm-logo-dot">.</span></span>
        </a>
        <nav className="lm-desktop-nav" aria-label="Page sections">
          {links.map((link) => <a key={link.href} className="lm-nav-link" href={link.href}><span>{link.label}</span></a>)}
        </nav>
        <div className="lm-nav-actions">
          <button className="lm-studio-link" type="button" onClick={onOpenGlassStudio}>Glass Studio <ArrowUpRight size={13} aria-hidden="true" /></button>
          <a href="#hero-download-form" className="lm-btn lm-btn--small lm-magnetic" onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault(); onFocusForm();
          }}><span className="lm-button-label">Get the free playbook</span><ArrowUpRight size={15} aria-hidden="true" /></a>
          <button className="lm-menu-toggle" ref={menuButton} disabled={!interactive} aria-expanded={open} aria-controls="lm-mobile-menu" aria-label="Open navigation" type="button" onClick={() => setOpen(true)}><span /><span /></button>
        </div>
        <span className="lm-nav-progress" aria-hidden="true" />
      </div>
      <dialog ref={dialogRef} id="lm-mobile-menu" className="lm-mobile-menu" onCancel={() => setOpen(false)} onClose={() => { setOpen(false); menuButton.current?.focus({ preventScroll: true }); }} aria-label="Navigation">
        <div className="lm-menu-top"><span>LUMEN.</span><button type="button" aria-label="Close navigation" onClick={close}><X /></button></div>
        <nav aria-label="Mobile page sections">
          {links.map((link, i) => <a href={link.href} key={link.href} style={{ '--item': i } as React.CSSProperties} onClick={(event) => {
            event.preventDefault();
            close();
            const target = document.getElementById(link.href.slice(1));
            if (target) { scrollToLumen(target); history.pushState(null, '', link.href); }
          }}><span>{link.label}</span><ArrowUpRight /></a>)}
        </nav>
        <button type="button" className="lm-menu-studio" onClick={() => { close(); onOpenGlassStudio(); }}>Explore Glass Studio <ArrowUpRight size={18} /></button>
        <p>Make space for better work.</p>
      </dialog>
    </header>
  );
}
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/PlaybookPreviewSection.tsx">
<![CDATA['use client';
import { SplitText } from '../motion/SplitText';

import React, { useState, useRef } from 'react';
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
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const stackOrder = getPreviewStackOrder(activeId);
  const activeIndex = PLAYBOOK_PREVIEW_PAGES.findIndex((p) => p.id === activeId);

  const handlePrev = () => {
    const prevIdx =
      (activeIndex - 1 + PLAYBOOK_PREVIEW_PAGES.length) % PLAYBOOK_PREVIEW_PAGES.length;
    setActiveId(PLAYBOOK_PREVIEW_PAGES[prevIdx].id);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % PLAYBOOK_PREVIEW_PAGES.length;
    setActiveId(PLAYBOOK_PREVIEW_PAGES[nextIdx].id);
  };

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex = currentIndex;
    const total = PLAYBOOK_PREVIEW_PAGES.length;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % total;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + total) % total;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = total - 1;
    } else {
      return;
    }

    const nextId = PLAYBOOK_PREVIEW_PAGES[nextIndex].id;
    setActiveId(nextId);

    const container = tabsContainerRef.current;
    if (container) {
      const buttons = container.querySelectorAll<HTMLButtonElement>('[role="tab"]');
      buttons[nextIndex]?.focus();
    }
  };

  const getStackClassName = (id: PlaybookPreviewId) => {
    const pos = stackOrder[id];
    if (pos === 'front') return 'stack-card-front';
    if (pos === 'middle') return 'stack-card-middle hidden lg:block';
    return 'stack-card-back hidden lg:block';
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
            <h2 data-lm-heading=""
              id="playbook-preview-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-[#1E2432] sm:text-4xl [text-wrap:balance]"
            ><SplitText text={"Everything you need to get started."} /></h2>
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

        {/* Selectable Preview State Tabs with Roving Tab Stop */}
        <div
          ref={tabsContainerRef}
          role="tablist"
          aria-label="Playbook sample pages"
          className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          {PLAYBOOK_PREVIEW_PAGES.map((page, idx) => {
            const isSelected = page.id === activeId;
            return (
              <button
                key={page.id}
                role="tab"
                type="button"
                id={`tab-${page.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${page.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveId(page.id)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                className={`rounded-2xl p-4 text-left transition-[transform,opacity,background-color,border-color,box-shadow] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252C43] ${
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
          {/* Left Column (5 cols): Provided Playbook Cover */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
            <div className="lm-cover glass-panel relative w-full max-w-[390px] rounded-3xl p-3.5 shadow-md">
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

          {/* Right Column (7 cols): Layered 2.5D Glass Document Stack in Shared Grid Cell */}
          <div className="lg:col-span-7 playbook-stack-stage relative lg:pr-12 lg:pt-8">
            <div className="playbook-stack-grid relative w-full">
              {PLAYBOOK_PREVIEW_PAGES.map((page) => {
                const isFront = page.id === activeId;
                const pos = stackOrder[page.id];

                return (
                  <div
                    key={page.id}
                    id={`panel-${page.id}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${page.id}`}
                    aria-hidden={!isFront}
                    inert={!isFront}
                    className={`playbook-stack-sheet rounded-3xl p-6 sm:p-9 ${getStackClassName(page.id)}`}
                  >
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
                        {pos === 'front' ? 'EXCERPT PREVIEW' : 'FOLIO'}
                      </span>
                    </div>

                    {/* Page Content Body with 80ms outgoing / 180ms incoming opacity transition */}
                    <div
                      className={`transition-opacity duration-180 ${
                        isFront ? 'opacity-100 delay-80' : 'opacity-0 duration-80 pointer-events-none'
                      }`}
                    >
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
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Expandable Full 16-Page Table of Contents Drawer (Outside the stack grid) */}
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
<![CDATA['use client';
import { SplitText } from '../motion/SplitText';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, FileText, Mic, CheckSquare, Activity, ArrowRight } from 'lucide-react';

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
    label: 'Customer intake email',
    detail: 'Product issue reported with screenshot and logs',
    source: 'Inbox · Priority',
    scatteredClass: 'lm-fragment--drift-0',
    structuredOrder: '01 · Intake Captured',
  },
  {
    id: 'doc',
    label: 'Product specification',
    detail: 'Design guidelines and technical boundary notes',
    source: 'Knowledge Base',
    scatteredClass: 'lm-fragment--drift-1',
    structuredOrder: '02 · Context Retrieved',
  },
  {
    id: 'note',
    label: 'Sync meeting audio',
    detail: 'Recorded customer call decisions and action items',
    source: 'Meeting Archive',
    scatteredClass: 'lm-fragment--drift-2',
    structuredOrder: '03 · Audio Transcribed',
  },
  {
    id: 'action',
    label: 'Unassigned action item',
    detail: 'Resolve authentication race condition before release',
    source: 'Project Board',
    scatteredClass: 'lm-fragment--drift-3',
    structuredOrder: '04 · Actions Synthesized',
  },
  {
    id: 'status',
    label: 'Status update',
    detail: 'Manual weekly summary assembled across 4 tabs',
    source: 'Team Channel',
    scatteredClass: 'lm-fragment--drift-4',
    structuredOrder: '05 · Review Ready',
  },
];

export const ProblemSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const connectorPathRef = useRef<SVGPathElement>(null);
  const manualInteractionRef = useRef<boolean>(false);
  const [isStructured, setIsStructured] = useState<boolean>(false);
  const [isManualTransition, setIsManualTransition] = useState<boolean>(false);

  const traceConnector = useCallback(() => {
    const path = connectorPathRef.current;
    if (!path) return;
    try {
      const len = path.getTotalLength ? path.getTotalLength() : 920;
      gsap.fromTo(
        path,
        { strokeDasharray: `${len} ${len}`, strokeDashoffset: len, opacity: 0.3 },
        { strokeDashoffset: 0, opacity: 1, duration: 0.52, ease: 'power2.out' }
      );
    } catch {
      // JSDOM fallback
    }
  }, []);

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
        once: true,
        onEnter: () => {
          if (!manualInteractionRef.current) {
            setIsManualTransition(false);
            setIsStructured(true);
            traceConnector();
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [traceConnector]);

  const handleManualToggle = (structured: boolean) => {
    manualInteractionRef.current = true;
    setIsManualTransition(true);
    setIsStructured(structured);
    if (structured) {
      traceConnector();
    }
  };

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
            <h2 data-lm-heading=""
              id="problem-heading"
              className="mt-3 text-3xl font-bold tracking-tight text-[#1E2432] sm:text-4xl [text-wrap:balance]"
            ><SplitText text="Your work is connected. Your tools aren't." /></h2>
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
              onClick={() => handleManualToggle(false)}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-[transform,opacity,background-color,border-color,box-shadow] whitespace-nowrap shrink-0 cursor-pointer ${
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
              onClick={() => handleManualToggle(true)}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-[transform,opacity,background-color,border-color,box-shadow] whitespace-nowrap shrink-0 cursor-pointer ${
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
        <div className="lm-problem-canvas relative mt-12 rounded-3xl border border-white/85 bg-white/50 p-6 sm:p-10 shadow-xs backdrop-blur-md overflow-hidden">
          {/* Connecting SVG Pathways (Visible when structured) */}
          <svg
            viewBox="0 0 1100 160"
            fill="none"
            aria-hidden="true"
            className={`pointer-events-none hidden lg:block absolute inset-x-8 top-1/2 -translate-y-1/2 h-40 w-[calc(100%-4rem)] transition-opacity duration-300 ${
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
              ref={connectorPathRef}
              d="M 95 80 L 1005 80"
              stroke="#5BA59A"
              strokeWidth="2.5"
            />
          </svg>

          <div className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {TASK_FRAGMENTS.map((frag, index) => {
              const transitionStyle = isManualTransition
                ? { transition: 'transform 260ms cubic-bezier(0.77, 0, 0.175, 1), border-color 260ms, background-color 260ms' }
                : {
                    transition: 'transform 520ms cubic-bezier(0.16, 1, 0.3, 1), border-color 520ms, background-color 520ms',
                    transitionDelay: `${index * 40}ms`,
                  };

              return (
                <div
                  key={frag.id}
                  style={transitionStyle}
                  className={`lm-fragment glass-panel rounded-2xl p-4 ${
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
              );
            })}
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
    <file path="src/app/(lumen)/lumen/components/WorkflowRibbon.tsx">
<![CDATA[const words = ['Find the opportunity', 'Map the workflow', 'Build with AI', 'Keep people in control'];

export function WorkflowRibbon() {
  return (
    <div className="lm-workflow-ribbon" data-lm-ambient="" aria-label={words.join('. ')}>
      <div className="lm-workflow-ribbon__track" aria-hidden="true">
        {[0, 1, 2, 3].map((copy) => (
          <div className="lm-workflow-ribbon__group" key={copy}>
            {words.map((word, i) => (
              <span key={word}><span className={'lm-ribbon-mark lm-ribbon-mark--' + i} />{word}<svg viewBox="0 0 24 24"><path d="M4 12h16m-6-6 6 6-6 6" /></svg></span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/WorkflowStatement.tsx">
<![CDATA[import type { CSSProperties } from 'react';

const lines = ['Less busywork.', 'More meaningful work.'];
export function WorkflowStatement() {
  let index = 0;
  return (
    <section className="lm-statement" aria-label="Less busywork. More meaningful work." data-lm-statement="">
      <div className="lm-statement__mark" aria-hidden="true"><span /><span /><span /></div>
      <p>
        {lines.map((line) => (
          <span className="lm-statement__line" key={line}>
            {line.split(' ').map((word) => <span key={word} style={{ '--word': index++ } as CSSProperties}>{word}{' '}</span>)}
          </span>
        ))}
      </p>
      <span className="lm-statement__note">A clearer way to work. A little more room to think.</span>
    </section>
  );
}
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
    <file path="src/app/(lumen)/lumen/motion/LumenMotion.tsx">
<![CDATA['use client';

import { useEffect, useRef, type RefObject } from 'react';
import { scrollToLumen } from './scroll';

interface LumenMotionProps {
  rootRef: RefObject<HTMLDivElement | null>;
  onHeroActivityChange?: (active: boolean) => void;
}

export function LumenMotion({ rootRef, onHeroActivityChange }: LumenMotionProps) {
  const callbackRef = useRef(onHeroActivityChange);
  useEffect(() => { callbackRef.current = onHeroActivityChange; }, [onHeroActivityChange]);
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const motion = matchMedia('(prefers-reduced-motion: no-preference)');
    const fine = matchMedia('(hover: hover) and (pointer: fine)');
    const wide = matchMedia('(min-width: 1024px) and (min-height: 680px)');
    const hero = root.querySelector<HTMLElement>('#workspace-hero');
    const statement = root.querySelector<HTMLElement>('[data-lm-statement]');
    const header = root.querySelector<HTMLElement>('.lumen-header');
    const atmosphere = root.querySelector<HTMLElement>('[data-testid="page-atmosphere"]');
    const chapters = Array.from(root.querySelectorAll<HTMLElement>('main section[id]'));
    const progressLine = root.querySelector<HTMLElement>('.lm-nav-progress');
    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-lm-reveal], [data-lm-heading]'));
    let frame = 0;
    let disposed = false;
    let heroTop = 0;
    let heroHeight = 1;
    let statementTop = 0;
    let statementHeight = 1;
    let maxScroll = 1;
    let chapterTops: number[] = [];
    let hoverTarget: HTMLElement | null = null;
    let hoverBounds: DOMRect | null = null;
    let pointerX = 0;
    let pointerY = 0;
    let hoverFrame = 0;

    const reveal = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.dataset.lmIn = 'true';
        el.removeAttribute('data-lm-armed');
        reveal.unobserve(el);
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -7% 0px' });
    const ambient = new IntersectionObserver((entries) => {
      for (const entry of entries) (entry.target as HTMLElement).dataset.lmPlaying = String(entry.isIntersecting);
    });
    root.querySelectorAll('[data-lm-ambient]').forEach((el) => ambient.observe(el));
    const heroObserver = new IntersectionObserver(([entry]) => {
      if (entry) callbackRef.current?.(entry.isIntersecting);
    }, { rootMargin: '200px' });
    if (hero) heroObserver.observe(hero);

    const measure = () => {
      const y = scrollY;
      heroTop = (hero?.getBoundingClientRect().top ?? 0) + y;
      heroHeight = hero?.offsetHeight ?? innerHeight;
      statementTop = (statement?.getBoundingClientRect().top ?? 0) + y;
      statementHeight = statement?.offsetHeight ?? 1;
      maxScroll = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      chapterTops = chapters.map((el) => el.getBoundingClientRect().top + y);
    };
    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const paint = () => {
      frame = 0;
      const y = scrollY;
      const progress = clamp(y / maxScroll);
      progressLine?.style.setProperty('transform', 'scaleX(' + progress.toFixed(4) + ')');
      if (atmosphere) atmosphere.dataset.scrollProgress = progress.toFixed(2);
      header?.setAttribute('data-compact', String(y > 48));
      const out = motion.matches && wide.matches ? clamp((y - heroTop) / Math.max(1, heroHeight - innerHeight)) : 0;
      hero?.style.setProperty('--lm-departure', out.toFixed(4));
      const read = motion.matches ? clamp((y + innerHeight * 0.82 - statementTop) / (statementHeight + innerHeight * 0.2)) : 1;
      statement?.style.setProperty('--lm-reading', read.toFixed(4));
      let active = chapters[0]?.id;
      chapterTops.forEach((top, i) => { if (top < y + innerHeight * 0.4) active = chapters[i].id; });
      root.querySelectorAll<HTMLAnchorElement>('.lm-nav-link').forEach((link) => {
        const current = link.hash === '#' + active;
        if (current) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
    const resize = () => { measure(); schedule(); };
    const mode = () => {
      resetHover();
      root.dataset.lmMotion = motion.matches ? 'live' : 'static';
      reveal.disconnect();
      targets.forEach((el) => {
        const seen = el.dataset.lmIn === 'true';
        if (!motion.matches || seen || el.getBoundingClientRect().top < innerHeight * 0.94) {
          el.dataset.lmIn = 'true';
          el.removeAttribute('data-lm-armed');
        } else {
          reveal.observe(el);
          el.dataset.lmArmed = 'true';
        }
      });
      resize();
    };
    const visibility = () => { root.dataset.lmHidden = String(document.hidden); };
    const settleFocus = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const ancestor = target.closest<HTMLElement>('[data-lm-armed]');
      if (ancestor) { ancestor.dataset.lmIn = 'true'; ancestor.removeAttribute('data-lm-armed'); }
    };
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || anchor.hash.length < 2) return;
      let id: string;
      try { id = decodeURIComponent(anchor.hash.slice(1)); } catch { return; }
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      scrollToLumen(target);
      history.pushState(null, '', anchor.hash);
    };
    const resetHover = () => {
      if (!hoverTarget) return;
      const plane = hoverTarget.querySelector<HTMLElement>('.lm-workspace-plane');
      plane?.style.removeProperty('--tilt-x'); plane?.style.removeProperty('--tilt-y');
      ['--lm-rx', '--lm-ry', '--lm-mx', '--lm-my'].forEach((name) => hoverTarget?.style.removeProperty(name));
      hoverTarget = null;
      hoverBounds = null;
    };
    const paintPointer = () => {
      hoverFrame = 0;
      if (!hoverTarget || !hoverBounds) return;
      const x = clamp((pointerX - hoverBounds.left) / hoverBounds.width);
      const y = clamp((pointerY - hoverBounds.top) / hoverBounds.height);
      hoverTarget.style.setProperty('--lm-light-x', (x * 100).toFixed(1) + '%');
      hoverTarget.style.setProperty('--lm-light-y', (y * 100).toFixed(1) + '%');
      if (hoverTarget.matches('.lm-workspace-stage')) {
        const plane = hoverTarget.querySelector<HTMLElement>('.lm-workspace-plane');
        plane?.style.setProperty('--tilt-x', (2 + (0.5 - y) * 5).toFixed(2) + 'deg');
        plane?.style.setProperty('--tilt-y', (-4 + (x - 0.5) * 6).toFixed(2) + 'deg');
      } else if (hoverTarget.matches('.lm-hover-card, .lm-cover')) {
        hoverTarget.style.setProperty('--lm-rx', ((0.5 - y) * 5).toFixed(2) + 'deg');
        hoverTarget.style.setProperty('--lm-ry', ((x - 0.5) * 5).toFixed(2) + 'deg');
      } else {
        hoverTarget.style.setProperty('--lm-mx', ((x - 0.5) * 9).toFixed(2) + 'px');
        hoverTarget.style.setProperty('--lm-my', ((y - 0.5) * 7).toFixed(2) + 'px');
      }
    };
    const pointer = (event: PointerEvent) => {
      if (!fine.matches || !motion.matches || event.pointerType === 'touch') { resetHover(); return; }
      const target = (event.target as Element).closest<HTMLElement>('.lm-hover-card, .lm-cover, .lm-magnetic, .lm-workspace-stage');
      if (target !== hoverTarget) {
        resetHover();
        hoverTarget = target;
        hoverBounds = target?.getBoundingClientRect() ?? null;
      }
      pointerX = event.clientX; pointerY = event.clientY;
      if (target && !hoverFrame) hoverFrame = requestAnimationFrame(paintPointer);
    };
    const pointerExit = (event: PointerEvent) => { if (!event.relatedTarget || !root.contains(event.relatedTarget as Node)) resetHover(); };

    const sizes = new ResizeObserver(resize);
    sizes.observe(root);
    mode(); visibility();
    document.fonts.ready.then(() => { if (!disposed) resize(); });
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', resize, { passive: true });
    root.addEventListener('click', click);
    root.addEventListener('focusin', settleFocus);
    root.addEventListener('pointermove', pointer, { passive: true });
    root.addEventListener('pointerout', pointerExit);
    document.addEventListener('visibilitychange', visibility);
    motion.addEventListener('change', mode);
    fine.addEventListener('change', resetHover);
    wide.addEventListener('change', resize);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame); cancelAnimationFrame(hoverFrame);
      reveal.disconnect(); ambient.disconnect(); heroObserver.disconnect(); sizes.disconnect();
      removeEventListener('scroll', schedule); removeEventListener('resize', resize);
      root.removeEventListener('click', click); root.removeEventListener('focusin', settleFocus);
      root.removeEventListener('pointermove', pointer); root.removeEventListener('pointerout', pointerExit);
      document.removeEventListener('visibilitychange', visibility);
      motion.removeEventListener('change', mode); fine.removeEventListener('change', resetHover); wide.removeEventListener('change', resize);
      resetHover();
      delete root.dataset.lmMotion;
      targets.forEach((el) => el.removeAttribute('data-lm-armed'));
      hero?.style.removeProperty('--lm-departure');
    };
  }, [rootRef]);
  return null;
}
]]>
    </file>
    <file path="src/app/(lumen)/lumen/motion/math.ts">
<![CDATA[/**
 * Lumen Motion Math Utilities
 * Pure deterministic functions for scroll progress and value clamping.
 */

/**
 * Clamps a value between min and max. Defaults to [0, 1].
 */
export function clamp(value: number, min = 0, max = 1): number {
  if (min > max) {
    const temp = min;
    min = max;
    max = temp;
  }
  return Math.max(min, Math.min(max, value));
}

/**
 * Calculates normalized linear progress of value between start and end.
 * If end <= start: returns 0 if value < start, 1 if value >= start.
 */
export function progress(value: number, start: number, end: number): number {
  if (end <= start) {
    return value >= start ? 1 : 0;
  }
  return clamp((value - start) / (end - start), 0, 1);
}
]]>
    </file>
    <file path="src/app/(lumen)/lumen/motion/scroll.ts">
<![CDATA[type ScrollDriver = { scrollTo: (target: HTMLElement | number, options?: { offset?: number; duration?: number }) => void; stop: () => void; start: () => void };
let driver: ScrollDriver | null = null;
let locked = false;

export function registerScrollDriver(next: ScrollDriver) {
  driver = next;
  if (locked) next.stop();
  return () => { if (driver === next) driver = null; };
}

export function lockLumenScroll(next: boolean) {
  locked = next;
  if (next) driver?.stop(); else driver?.start();
}

export function scrollToLumen(target: HTMLElement | number) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const offset = (document.querySelector('.lumen-header')?.getBoundingClientRect().bottom ?? 64) + 20;
  if (driver && !reduce) {
    driver.scrollTo(target, { offset: typeof target === 'number' ? 0 : -offset, duration: 1.15 });
  } else {
    const top = typeof target === 'number' ? target : target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? 'instant' : 'smooth' });
  }
}
]]>
    </file>
    <file path="src/app/(lumen)/lumen/motion/SmoothScroll.tsx">
<![CDATA['use client';

import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { registerScrollDriver } from './scroll';
import 'lenis/dist/lenis.css';

export function SmoothScroll() {
  useEffect(() => {
    const query = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let disposed = false;
    let generation = 0;
    let cleanup: (() => void) | undefined;
    const setup = async () => {
      const current = ++generation;
      cleanup?.();
      cleanup = undefined;
      if (!query.matches) return;
      const { default: Lenis } = await import('lenis');
      if (disposed || current !== generation || !query.matches) return;
      const lenis = new Lenis({ lerp: 0.09, autoRaf: true, smoothWheel: true, syncTouch: false, anchors: false });
      const unregister = registerScrollDriver(lenis);
      lenis.on('scroll', ScrollTrigger.update);
      cleanup = () => { unregister(); lenis.off('scroll', ScrollTrigger.update); lenis.destroy(); };
    };
    void setup();
    query.addEventListener('change', setup);
    return () => { disposed = true; generation++; cleanup?.(); query.removeEventListener('change', setup); };
  }, []);
  return null;
}
]]>
    </file>
    <file path="src/app/(lumen)/lumen/motion/SplitText.tsx">
<![CDATA[import { Fragment, type CSSProperties } from 'react';

export function SplitText({ text }: { text: string }) {
  return (
    <span className="lm-split">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(' ').map((word, i) => (
          <Fragment key={i}><span className="lm-word">
            <span className="lm-word__in" style={{ '--word': i } as CSSProperties}>{word}</span>
          </span>{' '}</Fragment>
        ))}
      </span>
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(lumen)/lumen/motion/timings.ts">
<![CDATA[/**
 * Lumen Motion Timings and Curves
 * Mirrors the CSS custom properties under .landing-shell in lumen.css.
 */

export const LM_DURATIONS = {
  press: 0.12, // 120ms
  feedback: 0.16, // 160ms
  select: 0.22, // 220ms
  sheet: 0.28, // 280ms
  reveal: 0.48, // 480ms
  panelEntrance: 0.52, // 520ms
  demoTotal: 1.6, // 1600ms
} as const;

export const LM_EASING = {
  // GSAP easing equivalencies
  optical: 'power3.out', // corresponds to cubic-bezier(0.16, 1, 0.3, 1)
  travel: 'power2.inOut', // corresponds to cubic-bezier(0.77, 0, 0.175, 1)
  feedback: 'power1.out', // corresponds to cubic-bezier(0.23, 1, 0.32, 1)
} as const;

/**
 * Storyboard timestamps for the Hero Glass Workspace demonstration (in seconds).
 * Total finite duration: 1.6s
 */
export const HERO_DEMO_BEATS = {
  panelsStart: 0.0,
  panelsStagger: 0.06,
  inputIdentified: 0.24,
  classifyResolved: 0.54,
  summarizeResolved: 0.84,
  routeResolved: 1.04,
  reviewSettled: 1.24,
  total: 1.6,
} as const;
]]>
    </file>
    <file path="src/app/(lumen)/lumen/motion/useMotionPreferences.ts">
<![CDATA['use client';

import { useEffect, useState } from 'react';

export interface MotionPreferences {
  ready: boolean;
  prefersReducedMotion: boolean;
  isFinePointer: boolean;
  canHover: boolean;
}

const FALLBACK_PREFERENCES: MotionPreferences = {
  ready: false,
  prefersReducedMotion: true, // safe non-kinetic fallback until real media-query read
  isFinePointer: false,
  canHover: false,
};

export function useMotionPreferences(): MotionPreferences {
  const [prefs, setPrefs] = useState<MotionPreferences>(FALLBACK_PREFERENCES);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerQuery = window.matchMedia('(pointer: fine)');
    const hoverQuery = window.matchMedia('(hover: hover)');

    const update = () => {
      setPrefs({
        ready: true,
        prefersReducedMotion: reducedQuery.matches,
        isFinePointer: pointerQuery.matches,
        canHover: hoverQuery.matches,
      });
    };

    update();

    reducedQuery.addEventListener('change', update);
    pointerQuery.addEventListener('change', update);
    hoverQuery.addEventListener('change', update);

    return () => {
      reducedQuery.removeEventListener('change', update);
      pointerQuery.removeEventListener('change', update);
      hoverQuery.removeEventListener('change', update);
    };
  }, []);

  return prefs;
}
]]>
    </file>
    <file path="src/app/(lumen)/lumen/motion/workspacePlayback.ts">
<![CDATA[import { ProcessingSubStep } from '../utils/workflowLogic';
import { HERO_DEMO_BEATS } from './timings';

export type PlaybackCancelReason =
  | 'user-scenario-change'
  | 'user-stage-select'
  | 'replay-restart'
  | 'unmount'
  | 'offscreen'
  | 'document-hidden'
  | 'reduced-motion'
  | 'studio-opened';

export interface IntroConsumedRef {
  current: boolean;
}

export class WorkspacePlaybackController {
  private activeTimers: ReturnType<typeof setTimeout>[] = [];
  public isPlaying = false;
  private introRef?: IntroConsumedRef;

  constructor(introRef?: IntroConsumedRef) {
    this.introRef = introRef;
  }

  public shouldPlayIntro(): boolean {
    return !this.introRef?.current;
  }

  public consumeIntro(): void {
    if (this.introRef) {
      this.introRef.current = true;
    }
  }

  public startPlayback(
    _scenarioId: string,
    onStepChange: (step: ProcessingSubStep) => void,
    onComplete?: () => void
  ): void {
    this.cancelPlayback('replay-restart', false);
    this.isPlaying = true;

    // Step 1: classify (540ms)
    const tClassify = setTimeout(() => {
      if (!this.isPlaying) return;
      onStepChange('classify');
    }, Math.round(HERO_DEMO_BEATS.classifyResolved * 1000));
    this.activeTimers.push(tClassify);

    // Step 2: summarize (840ms)
    const tSummarize = setTimeout(() => {
      if (!this.isPlaying) return;
      onStepChange('summarize');
    }, Math.round(HERO_DEMO_BEATS.summarizeResolved * 1000));
    this.activeTimers.push(tSummarize);

    // Step 3: route (1040ms)
    const tRoute = setTimeout(() => {
      if (!this.isPlaying) return;
      onStepChange('route');
    }, Math.round(HERO_DEMO_BEATS.routeResolved * 1000));
    this.activeTimers.push(tRoute);

    // Step 4: review and complete (1600ms)
    const tComplete = setTimeout(() => {
      if (!this.isPlaying) return;
      this.isPlaying = false;
      this.consumeIntro();
      onComplete?.();
    }, Math.round(HERO_DEMO_BEATS.total * 1000));
    this.activeTimers.push(tComplete);
  }

  public cancelPlayback(_reason?: PlaybackCancelReason | string, _isUserAction?: boolean): void {
    void _reason;
    void _isUserAction;
    this.clearAllTimers();
    this.isPlaying = false;
  }

  public dispose(consumeOnDispose = false): void {
    this.clearAllTimers();
    this.isPlaying = false;
    if (consumeOnDispose) {
      this.consumeIntro();
    }
  }

  private clearAllTimers(): void {
    for (const t of this.activeTimers) {
      clearTimeout(t);
    }
    this.activeTimers = [];
  }
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
<![CDATA[export interface ScrollAtmosphereState {
  scrollProgress: number; // 0..1 across full document
  parallaxOffsetY: number; // subtle vertical parallax in px
  refractionModulation: number; // gentle optical modulation across scroll
}

/**
 * Pure calculation of environmental scroll state for deterministic unit testing.
 * Retained for backward compatibility with existing tests.
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
 * Stable non-reactive fallback.
 * Live scroll DOM mutations are handled without React re-renders by LumenMotion.
 */
export function useBackgroundMotionController(): ScrollAtmosphereState {
  return {
    scrollProgress: 0,
    parallaxOffsetY: 0,
    refractionModulation: 1.0,
  };
}
]]>
    </file>
    <file path="src/app/(lumen)/lumen/components/background/PageAtmosphere.tsx">
<![CDATA[import React from 'react';
import { GlassPresetId, GlassPresetConfig } from '../../glass/glassTypes';
import { GlassBackground } from '../GlassBackground';

interface PageAtmosphereProps {
  activePreset: GlassPresetId;
  customConfig: GlassPresetConfig | null;
  isHeroActive?: boolean;
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
  isHeroActive = true,
}) => {
  return (
    <div
      className="page-atmosphere"
      aria-hidden="true"
      data-testid="page-atmosphere"
      data-scroll-progress="0.00"
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
            paused={!isHeroActive}
          />
        </div>

        {/* GLASS RIBBON A: Isolated wrapper receiving bounded scroll parallax without transforming fixed canvas */}
        <div
          className="page-atmosphere__artwork-wrapper"
          style={{ transform: 'translate3d(0, var(--lm-ribbon-a-y, 0px), 0)' }}
        >
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
        </div>

        {/* GLASS SHEET B: Isolated wrapper receiving bounded scroll parallax */}
        <div
          className="page-atmosphere__artwork-wrapper"
          style={{ transform: 'translate3d(0, var(--lm-sheet-b-y, 0px), 0)' }}
        >
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
        </div>

        {/* GLASS HALO C: Untouched; no transform */}
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
              <stop offset="40%" stopColor="#D8D0F7" stopOpacity="0.45" />
              <stop offset="75%" stopColor="#F6DCCA" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="globalHaloCBevel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#D8D0F7" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <ellipse
            cx="820"
            cy="700"
            rx="560"
            ry="480"
            stroke="url(#globalHaloCGrad)"
            strokeWidth="110"
          />
          <ellipse
            cx="820"
            cy="700"
            rx="560"
            ry="480"
            stroke="url(#globalHaloCBevel)"
            strokeWidth="2.5"
          />
        </svg>
      </div>

      {/* 5. Delicate Micro-Noise Surface Layer */}
      <div className="page-atmosphere__noise" />
    </div>
  );
};
]]>
    </file>
  </files>
</template>
