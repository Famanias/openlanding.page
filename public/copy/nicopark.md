<template slug="nicopark" name="Nico Park">
  <dependencies>
    {
      "dependencies": {
        "lucide-react": "0.475.0",
        "motion": "^14.4.0"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(nicopark)/layout.tsx">
<![CDATA[import type { Metadata } from "next";
import { Anton, Barlow_Condensed, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./nicopark/nicopark.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "Nico Park — Product Design Portfolio",
  description:
    "Playful, modular, tactile industrial and digital product design portfolio for independent product designer Nico Park, featuring LOOP personal audio hardware, FORMA workspace, and interactive design experiments.",
  icons: { icon: "/templates/nicopark/icon.svg" },
  openGraph: {
    title: "Nico Park — Product Design Portfolio",
    description:
      "Playful, modular, tactile industrial and digital product design portfolio for independent product designer Nico Park, featuring LOOP personal audio hardware, FORMA workspace, and interactive design experiments.",
    images: ["/templates/nicopark/preview-1600.webp"],
  },
};

export default function NicoParkLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <body className="bg-[#F8F7F2] text-[#191919] antialiased selection:bg-[#3049F0] selection:text-white">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(nicopark)/nicopark/App.tsx">
<![CDATA["use client";

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
]]>
    </file>
    <file path="src/app/(nicopark)/nicopark/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(nicopark)/nicopark/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/nicopark";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

export function Picture({ assetKey, alt, className }: { assetKey: string; alt: string; className?: string }) {
  const src = assetSrc(assetKey, 800);
  if (!src) {
    return (
      <div className={`nico-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span>{assetKey}</span>
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey];
  return <img className={className} src={src} width={w} height={h} alt={alt} loading="eager" decoding="async" />;
}
]]>
    </file>
    <file path="src/app/(nicopark)/nicopark/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Nico Park">
  <rect width="64" height="64" rx="16" fill="#3049F0"/>
  <g stroke="#F8F7F2" stroke-width="5" stroke-linecap="round">
    <line x1="32" y1="10" x2="32" y2="22" />
    <line x1="32" y1="42" x2="32" y2="54" />
    <line x1="10" y1="32" x2="22" y2="32" />
    <line x1="42" y1="32" x2="54" y2="32" />
    <line x1="16.4" y1="16.4" x2="24.9" y2="24.9" />
    <line x1="39.1" y1="39.1" x2="47.6" y2="47.6" />
    <line x1="47.6" y1="16.4" x2="39.1" y2="24.9" />
    <line x1="24.9" y1="39.1" x2="16.4" y2="47.6" />
  </g>
</svg>
]]>
    </file>
    <file path="src/app/(nicopark)/nicopark/nicopark.css">
<![CDATA[@import "tailwindcss";

:root {
  --canvas: #F8F7F2;
  --ink: #191919;
  --cobalt: #3049F0;
  --coral: #FF735D;
  --butter: #F7E36B;
  --lavender: #D5C8FC;
  --muted: #515151;
  --outline: #222222;
  --radius-panel: 24px;
  --spring-ease: cubic-bezier(0.16, 1, 0.3, 1);
  --overshoot-ease: cubic-bezier(0.34, 1.56, 0.64, 1);
}

@layer base {
  body {
    background-color: var(--canvas);
    color: var(--ink);
    font-family: var(--font-plus-jakarta-sans), 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    overflow-x: hidden;
  }
}

.font-display {
  font-family: var(--font-anton), 'Anton', var(--font-barlow-condensed), 'Barlow Condensed', Impact, sans-serif;
  letter-spacing: -0.015em;
  line-height: 0.91;
}

.font-condensed {
  font-family: var(--font-barlow-condensed), 'Barlow Condensed', sans-serif;
  letter-spacing: 0.03em;
}

.font-mono-tech {
  font-family: var(--font-jetbrains-mono), 'JetBrains Mono', monospace;
  font-variant-numeric: tabular-nums;
}

/* Tactile Panel Surface Rules */
.tactile-panel {
  border: 2px solid var(--outline);
  border-radius: var(--radius-panel);
  transition: transform 280ms var(--spring-ease), box-shadow 280ms var(--spring-ease);
}

.tactile-panel-sm {
  border: 1.75px solid var(--outline);
  border-radius: 18px;
  transition: transform 240ms var(--spring-ease), box-shadow 240ms var(--spring-ease);
}

/* Specular sweep across LOOP clear dial */
@keyframes specularSweep {
  0%, 75% {
    transform: translateX(-140%) rotate(25deg);
    opacity: 0;
  }
  82% {
    opacity: 0.55;
  }
  92% {
    transform: translateX(140%) rotate(25deg);
    opacity: 0;
  }
  100% {
    transform: translateX(140%) rotate(25deg);
    opacity: 0;
  }
}

@keyframes gentleFloat {
  0%, 100% {
    transform: translate3d(0, 0px, 0) rotate(0deg);
  }
  50% {
    transform: translate3d(0, -5px, 0) rotate(-0.8deg);
  }
}

@keyframes slowSpin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-gentle-float {
  animation: gentleFloat 6.5s ease-in-out infinite;
}

.animate-slow-spin {
  animation: slowSpin 28s linear infinite;
}

.animate-specular-sweep {
  animation: specularSweep 9s ease-in-out infinite;
}

/* Reduced motion compliance */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .animate-gentle-float,
  .animate-slow-spin,
  .animate-specular-sweep {
    animation: none !important;
  }
}
]]>
    </file>
    <file path="src/app/(nicopark)/nicopark/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TOKENS = {
  canvas: "#F8F7F2",
  ink: "#191919",
  cobalt: "#3049F0",
  coral: "#FF735D",
  butter: "#F7E36B",
  lavender: "#D5C8FC",
} as const;

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: TOKENS.canvas,
        color: TOKENS.ink,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 36, fontWeight: 900 }}>
          <span>nico park.</span>
          <span style={{ color: TOKENS.cobalt, fontSize: 32 }}>*</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "8px 20px",
            background: TOKENS.butter,
            borderRadius: 9999,
            border: "2px solid #191919",
            fontSize: 16,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Product Design Portfolio
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            fontSize: 76,
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            textTransform: "uppercase",
          }}
        >
          Design Should Feel Good.
        </div>
        <div style={{ fontSize: 24, color: "#515151", maxWidth: 840, lineHeight: 1.4 }}>
          Playful, modular, tactile industrial and digital product design portfolio featuring LOOP personal audio hardware, FORMA workspace, and interactive design experiments.
        </div>
      </div>

      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <span
          style={{
            padding: "12px 24px",
            background: TOKENS.cobalt,
            color: "#FFFFFF",
            borderRadius: 9999,
            border: "2px solid #191919",
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          LOOP Audio Hardware
        </span>
        <span
          style={{
            padding: "12px 24px",
            background: TOKENS.lavender,
            color: TOKENS.ink,
            borderRadius: 9999,
            border: "2px solid #191919",
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          FORMA Workspace
        </span>
        <span
          style={{
            padding: "12px 24px",
            background: "#FFFFFF",
            color: TOKENS.ink,
            borderRadius: 9999,
            border: "2px solid #191919",
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          Tactile Systems
        </span>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(nicopark)/nicopark/page.tsx">
<![CDATA["use client";

import App from "./App";

export default function NicoParkPage() {
  return <App />;
}
]]>
    </file>
    <file path="src/app/(nicopark)/nicopark/components/AboutNotesSection.tsx">
<![CDATA["use client";

import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  X,
  BookOpen,
  Compass,
  Wrench
} from 'lucide-react';
import { EDITORIAL_NOTES, EditorialNote } from '../data/portfolioData';

export const AboutNotesSection: React.FC = () => {
  const [exploringExpanded, setExploringExpanded] = useState<boolean>(false);
  const [activeNote, setActiveNote] = useState<EditorialNote | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeNote) {
        setActiveNote(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeNote]);

  return (
    <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      {/* SECTION 07A: ABOUT NICO PARK */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="py-16 lg:py-24 border-t-2 border-[#191919]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left 7 Cols: Philosophy, Bio & Expandable "What I'm Exploring" */}
          <div className="lg:col-span-7 bg-white border-2 border-[#191919] rounded-[24px] p-6 sm:p-9 flex flex-col justify-between">
            <div>
              <p className="font-condensed font-bold text-[15px] sm:text-[17px] tracking-[0.05em] uppercase text-[#3049F0] mb-2">
                CHAPTER 07 · ABOUT NICO PARK
              </p>
              <h2
                id="about-heading"
                className="font-display uppercase text-[46px] sm:text-[62px] lg:text-[72px] leading-[0.9] text-[#191919] mb-6"
              >
                OBJECTS &amp; INTERFACES WITH <span className="text-[#FF735D]">SOUL.</span>
              </h2>

              <p className="text-[18px] sm:text-[21px] leading-[1.45] font-semibold text-[#191919] mb-4">
                Hi, I’m Nico Park—an independent industrial and digital product designer building tactile hardware, apparatus interfaces, and playful design systems.
              </p>

              <p className="text-[15px] sm:text-base leading-[1.65] text-[#515151] mb-6">
                Over the past decade, I’ve worked across Seoul, Stockholm, and San Francisco helping early-stage hardware founders and creative software teams bridge the gap between CAD enclosures and 60fps screen interactions. I believe tools should invite curiosity, age gracefully, and never require a 40-page manual.
              </p>

              {/* Capabilities & Studio Stack Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div className="bg-[#F8F7F2] border-2 border-[#191919] rounded-2xl p-4">
                  <div className="inline-flex items-center gap-1.5 font-condensed font-bold text-sm uppercase text-[#191919] mb-2">
                    <Wrench className="w-4 h-4 text-[#3049F0]" />
                    <span>CORE CAPABILITIES</span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#515151]">
                    Industrial Design · Enclosure CAD &amp; DFM · Embedded Apparatus UI · Spatial Web Systems · Tactile Brand Toolkits
                  </p>
                </div>

                <div className="bg-[#F8F7F2] border-2 border-[#191919] rounded-2xl p-4">
                  <div className="inline-flex items-center gap-1.5 font-condensed font-bold text-sm uppercase text-[#191919] mb-2">
                    <Compass className="w-4 h-4 text-[#FF735D]" />
                    <span>WORKBENCH STACK</span>
                  </div>
                  <p className="text-xs leading-relaxed text-[#515151]">
                    Plasticity &amp; Fusion 360 · KeyShot · Figma · React / TypeScript / WebHID · Formlabs SLA &amp; CNC Aluminum Prototyping
                  </p>
                </div>
              </div>
            </div>

            {/* Expand / Collapse Disclosure: WHAT I'M EXPLORING */}
            <div className="mt-4 pt-4 border-t-2 border-[#191919]">
              <button
                type="button"
                onClick={() => setExploringExpanded((prev) => !prev)}
                aria-expanded={exploringExpanded}
                aria-controls="exploring-disclosure-panel"
                className="w-full px-5 py-3.5 rounded-2xl bg-[#F7E36B] border-2 border-[#191919] flex items-center justify-between font-condensed font-bold text-[17px] uppercase tracking-wider text-[#191919] hover:bg-[#D5C8FC] transition-colors cursor-pointer"
              >
                <span>WHAT I&apos;M EXPLORING RIGHT NOW (2026 LAB NOTES)</span>
                {exploringExpanded ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {exploringExpanded && (
                <div
                  id="exploring-disclosure-panel"
                  className="mt-3 bg-[#F8F7F2] border-2 border-[#191919] rounded-2xl p-5 space-y-3 text-sm text-[#191919]"
                >
                  <div>
                    <strong className="font-condensed uppercase tracking-wider text-[#3049F0] block">
                      01 · Transflective Color E-Paper + Rotary Encoders
                    </strong>
                    <p className="text-xs text-[#515151] mt-0.5">
                      Prototyping zero-backlight sunlight-readable desktop timers and audio stem slicers that run for 3 weeks on a single AA-sized LiFePO4 cell.
                    </p>
                  </div>
                  <div>
                    <strong className="font-condensed uppercase tracking-wider text-[#FF735D] block">
                      02 · Right-to-Repair Snap-Fit Fasteners
                    </strong>
                    <p className="text-xs text-[#515151] mt-0.5">
                      Replacing ultrasonic glue seams with captive quarter-turn aluminum cam locks so anyone can swap a battery in under 90 seconds.
                    </p>
                  </div>
                  <div>
                    <strong className="font-condensed uppercase tracking-wider text-[#191919] block">
                      03 · Browser-to-Hardware WebHID Bridges
                    </strong>
                    <p className="text-xs text-[#515151] mt-0.5">
                      Streaming real-time physical knob torque and hall-effect sensor values straight into web design systems without companion drivers.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right 5 Cols: Studio Workbench Visual & Principles Card */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="bg-[#D5C8FC] border-2 border-[#191919] rounded-[24px] p-6 flex-1 flex flex-col justify-between">
              <div className="flex items-center justify-between font-mono-tech text-xs font-bold text-[#191919] mb-3">
                <span>STUDIO WORKBENCH · ARCHIVE VIEW</span>
                <span>FIG 07.A</span>
              </div>

              <div className="my-auto flex items-center justify-center py-2">
                <img
                  src="/templates/nicopark/studio-workspace.svg"
                  alt="Nico Park studio workbench with color swatches, sketchbook spread, CNC prototype rings, and calipers"
                  width={800}
                  height={600}
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-contain rounded-xl border border-[#191919]"
                />
              </div>

              <div className="pt-3 mt-3 border-t border-[#191919]/20 text-xs font-medium text-[#191919]">
                Every project starts on physical dot-grid paper and SLA resin before touching production code.
              </div>
            </div>

            <div className="bg-[#3049F0] text-white border-2 border-[#191919] rounded-[24px] p-6">
              <div className="font-mono-tech text-xs text-[#F7E36B] uppercase mb-1">
                STUDIO PRINCIPLE #01
              </div>
              <p className="font-condensed font-bold text-[24px] leading-tight uppercase">
                &ldquo;IF A BUTTON OR DIAL DOESN&apos;T MAKE YOU WANT TO REACH OUT AND TURN IT, KEEP PROTOTYPING.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 07B: EDITORIAL NOTES (3 CONCISE ENTRIES + UNFOLDING READER) */}
      <section
        id="notes"
        aria-labelledby="notes-heading"
        className="py-16 lg:py-24 border-t-2 border-[#191919]"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="font-condensed font-bold text-[15px] sm:text-[17px] tracking-[0.05em] uppercase text-[#515151] mb-2">
              STUDIO JOURNAL · FIELD NOTES ON HARDWARE &amp; INTERACTION
            </p>
            <h2
              id="notes-heading"
              className="font-display uppercase text-[50px] sm:text-[68px] lg:text-[80px] leading-[0.9] text-[#191919]"
            >
              STUDIO <span className="text-[#3049F0]">NOTES.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#515151] max-w-md font-medium">
            Essays on mechanical detents, industrial color theory, and why digital interfaces need physical mass. Click any note to unfold the full essay.
          </p>
        </div>

        {/* 3 Editorial Note Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {EDITORIAL_NOTES.map((note) => (
            <article
              key={note.id}
              className="bg-white border-2 border-[#191919] rounded-[24px] p-6 flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-200"
            >
              <div>
                {/* Clean Unboxed Metadata Line */}
                <div className="flex items-center gap-2 text-xs font-mono-tech text-[#515151] mb-4">
                  <span className="font-bold text-[#191919]">{note.number}</span>
                  <span aria-hidden="true">·</span>
                  <span>{note.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{note.readTime}</span>
                </div>

                {/* Thumbnail Crop */}
                <div
                  style={{ backgroundColor: note.accentColor }}
                  className="border-2 border-[#191919] rounded-2xl p-3 mb-5 h-44 flex items-center justify-center overflow-hidden"
                >
                  <img
                    src={note.illustration}
                    alt={note.title}
                    width={400}
                    height={300}
                    referrerPolicy="no-referrer"
                    className="max-h-36 w-auto object-contain rounded-lg transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <h3 className="font-condensed font-extrabold text-[26px] leading-[1.1] uppercase text-[#191919] mb-3 group-hover:text-[#3049F0] transition-colors">
                  {note.title}
                </h3>

                <p className="text-sm leading-relaxed text-[#515151] mb-6">{note.excerpt}</p>
              </div>

              <button
                type="button"
                onClick={() => setActiveNote(note)}
                className="w-full inline-flex items-center justify-between px-5 py-3 rounded-full bg-[#F8F7F2] group-hover:bg-[#F7E36B] border-2 border-[#191919] font-condensed font-bold text-sm uppercase tracking-wider text-[#191919] transition-colors cursor-pointer"
              >
                <span className="inline-flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>READ FULL ESSAY</span>
                </span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </article>
          ))}
        </div>

        {/* Accessible Unfolding Note Reader Modal */}
        {activeNote && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="note-reader-title"
            className="fixed inset-0 z-50 bg-[#191919]/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setActiveNote(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#F8F7F2] border-2 border-[#191919] rounded-[28px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 pb-5 border-b-2 border-[#191919]">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono-tech text-[#3049F0]">
                    <span>{activeNote.number}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeNote.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeNote.readTime}</span>
                  </div>
                  <h3
                    id="note-reader-title"
                    className="font-display uppercase text-[34px] sm:text-[44px] leading-[0.95] text-[#191919] mt-2"
                  >
                    {activeNote.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveNote(null)}
                  aria-label="Close essay reader"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border-2 border-[#191919] font-condensed font-bold text-xs uppercase hover:bg-[#FF735D] hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  <span>CLOSE</span>
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div
                style={{ backgroundColor: activeNote.accentColor }}
                className="my-6 border-2 border-[#191919] rounded-2xl p-5 flex items-center justify-center"
              >
                <img
                  src={activeNote.illustration}
                  alt={activeNote.title}
                  className="max-h-48 w-auto object-contain rounded-xl"
                />
              </div>

              <div className="bg-[#F7E36B] border-2 border-[#191919] rounded-2xl p-4 mb-6">
                <div className="font-mono-tech text-[11px] font-bold uppercase text-[#191919] mb-1">
                  KEY STUDIO TAKEAWAY
                </div>
                <p className="font-semibold text-sm text-[#191919]">{activeNote.takeaway}</p>
              </div>

              <div className="space-y-4 text-[16px] leading-[1.7] text-[#191919]">
                {activeNote.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t-2 border-[#191919] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {EDITORIAL_NOTES.map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={() => setActiveNote(n)}
                      className={`px-3.5 py-1.5 rounded-full border-2 border-[#191919] font-condensed font-bold text-xs uppercase cursor-pointer ${
                        n.id === activeNote.id ? 'bg-[#3049F0] text-white' : 'bg-white text-[#191919]'
                      }`}
                    >
                      {n.number}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveNote(null)}
                  className="px-5 py-2 rounded-full bg-[#191919] text-white font-condensed font-bold text-xs uppercase cursor-pointer"
                >
                  BACK TO PORTFOLIO
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(nicopark)/nicopark/components/ContactFooterSection.tsx">
<![CDATA["use client";

import React, { useState } from 'react';
import { ArrowUpRight, ArrowUp, Mail, Copy, Check, AlertCircle } from 'lucide-react';
import {
  ContactFormInput,
  validateContactForm,
  buildMailtoHref
} from '../data/portfolioData';

interface ContactFooterSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const ContactFooterSection: React.FC<ContactFooterSectionProps> = ({ onNavigate }) => {
  const [formState, setFormState] = useState<ContactFormInput>({
    name: '',
    email: '',
    projectScope: 'Industrial Design & Hardware',
    message: ''
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormInput, string>>>({});
  const [preparedMailto, setPreparedMailto] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formState);
    if (!validation.valid) {
      setErrors(validation.errors);
      setPreparedMailto(null);
      return;
    }
    setErrors({});
    const href = buildMailtoHref(formState);
    setPreparedMailto(href);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('nico@nicopark.design');
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(true);
    }
  };

  return (
    <footer
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-20 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-12 lg:pt-24 lg:pb-16 border-t-2 border-[#191919]"
    >
      {/* Main Contact Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
        {/* Left 7 Cols: Giant Friendly Headline & Direct Mail Actions */}
        <div className="lg:col-span-7 bg-[#3049F0] text-white border-2 border-[#191919] rounded-[28px] p-7 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between gap-4 mb-6">
              <span className="font-condensed font-bold text-sm sm:text-base tracking-[0.06em] uppercase text-[#F7E36B]">
                CHAPTER 08 · AVAILABLE FOR SELECT Q1/Q2 COLLABORATIONS
              </span>

              {/* Responsive Rotating Asterisk Emblem */}
              <svg
                viewBox="0 0 100 100"
                className="w-12 h-12 sm:w-16 sm:h-16 text-[#FF735D] animate-slow-spin shrink-0"
                aria-hidden="true"
              >
                <g stroke="currentColor" strokeWidth="12" strokeLinecap="butt">
                  <line x1="50" y1="6" x2="50" y2="94" />
                  <line x1="6" y1="50" x2="94" y2="50" />
                  <line x1="18.9" y1="18.9" x2="81.1" y2="81.1" />
                  <line x1="81.1" y1="18.9" x2="18.9" y2="81.1" />
                </g>
              </svg>
            </div>

            <h2
              id="contact-heading"
              className="font-display uppercase text-[60px] sm:text-[86px] lg:text-[102px] leading-[0.89] tracking-tight mb-6"
            >
              <span className="block text-white">LET&apos;S MAKE</span>
              <span className="block text-[#F7E36B]">SOMETHING</span>
              <span className="block text-[#FF735D]">FEEL GOOD.</span>
            </h2>

            <p className="text-base sm:text-lg text-white/90 max-w-xl leading-relaxed mb-8">
              Looking to prototype a physical hardware product, craft an apparatus interface, or build a playful modular brand system? Send a direct note or compose an inquiry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/20">
            <a
              href="mailto:nico@nicopark.design?subject=Project%20Inquiry%20for%20Nico%20Park"
              className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-4 rounded-full bg-[#FF735D] text-white border-2 border-[#191919] font-condensed font-bold text-lg uppercase tracking-wider hover:bg-[#F7E36B] hover:text-[#191919] transition-colors whitespace-nowrap shrink-0"
            >
              <Mail className="w-5 h-5" />
              <span>EMAIL NICO@NICOPARK.DESIGN</span>
              <ArrowUpRight className="w-5 h-5" />
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-5 py-4 rounded-full bg-white text-[#191919] border-2 border-[#191919] font-condensed font-bold text-base uppercase tracking-wider hover:bg-[#D5C8FC] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-[#3049F0]" />
                  <span>COPIED: NICO@NICOPARK.DESIGN</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>COPY ADDRESS</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right 5 Cols: Honest Validated Project Brief Composer (Mailto Draft Builder) */}
        <div className="lg:col-span-5 bg-white border-2 border-[#191919] rounded-[28px] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 mb-5 border-b border-[#191919]/15">
              <span className="font-condensed font-bold text-sm uppercase tracking-wider text-[#191919]">
                PROJECT BRIEF COMPOSER
              </span>
              <span className="font-mono-tech text-xs text-[#515151]">DIRECT MAILTO: DRAFT</span>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-condensed font-bold text-xs uppercase tracking-wider text-[#191919] mb-1"
                >
                  YOUR NAME *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formState.name}
                  onChange={(e) => {
                    setFormState((s) => ({ ...s, name: e.target.value }));
                    if (errors.name) setErrors((err) => ({ ...err, name: undefined }));
                  }}
                  placeholder="e.g. Elena Vance"
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F7F2] border-2 border-[#191919] text-sm text-[#191919] focus:outline-2 focus:outline-[#3049F0]"
                />
                {errors.name && (
                  <p role="alert" className="mt-1 text-xs font-semibold text-[#D92D20] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-condensed font-bold text-xs uppercase tracking-wider text-[#191919] mb-1"
                >
                  YOUR EMAIL *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formState.email}
                  onChange={(e) => {
                    setFormState((s) => ({ ...s, email: e.target.value }));
                    if (errors.email) setErrors((err) => ({ ...err, email: undefined }));
                  }}
                  placeholder="elena@studio.io"
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F7F2] border-2 border-[#191919] text-sm text-[#191919] focus:outline-2 focus:outline-[#3049F0]"
                />
                {errors.email && (
                  <p role="alert" className="mt-1 text-xs font-semibold text-[#D92D20] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-scope"
                  className="block font-condensed font-bold text-xs uppercase tracking-wider text-[#191919] mb-1"
                >
                  PROJECT DISCIPLINE *
                </label>
                <select
                  id="contact-scope"
                  value={formState.projectScope}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, projectScope: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F7F2] border-2 border-[#191919] text-sm text-[#191919] focus:outline-2 focus:outline-[#3049F0]"
                >
                  <option value="Industrial Design & Hardware">Industrial Design &amp; Hardware</option>
                  <option value="Digital Product & Apparatus UI">Digital Product &amp; Apparatus UI</option>
                  <option value="Brand Experience & Physical Toolkit">Brand Experience &amp; Physical Toolkit</option>
                  <option value="Advisory / Design Critique">Advisory / Design Critique</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-condensed font-bold text-xs uppercase tracking-wider text-[#191919] mb-1"
                >
                  PROJECT TIMELINE &amp; GOALS *
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  value={formState.message}
                  onChange={(e) => {
                    setFormState((s) => ({ ...s, message: e.target.value }));
                    if (errors.message) setErrors((err) => ({ ...err, message: undefined }));
                  }}
                  placeholder="Tell Nico what you're building, target launch window, and hardware/software scope..."
                  className="w-full px-4 py-3 rounded-xl bg-[#F8F7F2] border-2 border-[#191919] text-sm text-[#191919] focus:outline-2 focus:outline-[#3049F0]"
                />
                {errors.message && (
                  <p role="alert" className="mt-1 text-xs font-semibold text-[#D92D20] flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-full bg-[#191919] text-white border-2 border-[#191919] font-condensed font-bold text-base uppercase tracking-wider hover:bg-[#3049F0] transition-colors cursor-pointer"
              >
                PREPARE EMAIL BRIEF (MAILTO:) ↗
              </button>
            </form>

            {/* Honest Mailto Action Box once validated */}
            {preparedMailto && (
              <div
                role="status"
                className="mt-4 p-4 rounded-2xl bg-[#F7E36B] border-2 border-[#191919] space-y-2"
              >
                <div className="font-mono-tech text-xs font-bold uppercase text-[#191919]">
                  BRIEF VALIDATED · READY FOR YOUR EMAIL CLIENT
                </div>
                <p className="text-xs text-[#191919]">
                  This portfolio uses a direct client-side mailto link (no server storage). Click below to launch your default mail app with your pre-filled brief:
                </p>
                <a
                  href={preparedMailto}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3049F0] text-white border border-[#191919] font-condensed font-bold text-xs uppercase tracking-wider"
                >
                  <span>LAUNCH MAIL CLIENT WITH BRIEF</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Colophon & Navigation Bar */}
      <div className="pt-8 border-t-2 border-[#191919] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#191919]">
          <span className="font-extrabold tracking-tight text-lg">nico park.</span>
          <span aria-hidden="true">·</span>
          <span className="text-[#515151]">© 2026 Nico Park Industrial &amp; Digital Studio. Concept Portfolio.</span>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <nav aria-label="Footer navigation" className="flex items-center gap-5 text-sm font-semibold">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('work');
              }}
              className="hover:text-[#3049F0] transition-colors"
            >
              Work
            </a>
            <a
              href="#anatomy"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('anatomy');
              }}
              className="hover:text-[#3049F0] transition-colors"
            >
              Anatomy
            </a>
            <a
              href="#loop-app"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('loop-app');
              }}
              className="hover:text-[#3049F0] transition-colors"
            >
              App UI
            </a>
            <a
              href="#playground"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('playground');
              }}
              className="hover:text-[#3049F0] transition-colors"
            >
              Playground
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('about');
              }}
              className="hover:text-[#3049F0] transition-colors"
            >
              About
            </a>
            <a
              href="#notes"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('notes');
              }}
              className="hover:text-[#3049F0] transition-colors"
            >
              Notes
            </a>
          </nav>

          <button
            type="button"
            onClick={() => onNavigate('top')}
            aria-label="Return to top of page"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border-2 border-[#191919] font-condensed font-bold text-xs uppercase hover:bg-[#F7E36B] transition-colors cursor-pointer"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
]]>
    </file>
    <file path="src/app/(nicopark)/nicopark/components/HeroSection.tsx">
<![CDATA["use client";

import React, { useState } from 'react';
import { ArrowUpRight, ArrowDown, RefreshCw } from 'lucide-react';
import { AnatomyPart } from '../data/portfolioData';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  onSelectProject: (projectId: 'loop' | 'forma' | 'kindred', openModal?: boolean) => void;
  onInspectAnatomyPart: (partId: AnatomyPart['id'], explode?: boolean) => void;
  onActivateAppDemo: () => void;
  onOpenAsteriskLab: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  onSelectProject,
  onInspectAnatomyPart,
  onActivateAppDemo,
  onOpenAsteriskLab
}) => {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, hx: 50, hy: 50 });
  const [hoveredCallout, setHoveredCallout] = useState<string | null>(null);
  const [miniAppPlaying, setMiniAppPlaying] = useState(true);
  const [miniPanelToggle, setMiniPanelToggle] = useState(true);
  const [miniTactileToggle, setMiniTactileToggle] = useState(false);
  const [asteriskHovered, setAsteriskHovered] = useState(false);

  const handleStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: Math.round(-ny * 5 * 10) / 10,
      ry: Math.round(nx * 5 * 10) / 10,
      hx: Math.round((nx + 0.5) * 100),
      hy: Math.round((ny + 0.5) * 100)
    });
  };

  const handleStagePointerLeave = () => {
    setTilt({ rx: 0, ry: 0, hx: 50, hy: 50 });
  };

  return (
    <section
      id="top"
      aria-label="Introduction and Featured Modular Showcase"
      className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-5 pb-8 lg:pt-7 lg:pb-10"
    >
      {/* Main Above-the-Fold Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-7 items-stretch">
        {/* LEFT COLUMN (Cols 1-6): Kicker, Giant Display Title, Lead Statement, Dual CTAs */}
        <div className="lg:col-span-6 flex flex-col justify-between py-1 lg:pr-4">
          <div>
            {/* Eyebrow Kicker */}
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-5">
              <p className="font-condensed font-semibold text-[15px] sm:text-[17px] tracking-[0.04em] uppercase text-[#191919]">
                INDEPENDENT PRODUCT DESIGNER / BASED EVERYWHERE
              </p>
            </div>

            {/* Giant Uppercase Heavy Condensed Display Title */}
            <h1 className="font-display uppercase select-text tracking-[-0.015em] text-[72px] sm:text-[104px] md:text-[122px] xl:text-[134px] leading-[0.89] mb-6 sm:mb-8">
              <span className="block text-[#191919]">DESIGN</span>
              <span className="block text-[#191919]">SHOULD</span>
              <span className="block text-[#3049F0]">FEEL GOOD.</span>
            </h1>

            {/* Supporting Two-Line Statement */}
            <p className="text-[20px] sm:text-[26px] xl:text-[29px] leading-[1.28] font-medium text-[#191919] tracking-[-0.02em] max-w-[28ch] mb-8 sm:mb-10">
              I turn complex problems into simple, thoughtful experiences people love using.
            </p>
          </div>

          {/* Primary CTA & Secondary Link Row */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 pt-1">
            <button
              type="button"
              onClick={() => {
                onSelectProject('loop', false);
                onNavigate('work');
              }}
              className="group relative inline-flex items-center gap-2.5 px-7 sm:px-8 py-4 sm:py-[18px] rounded-full bg-[#FF735D] text-white border-2 border-[#191919] font-condensed font-bold text-[18px] sm:text-[21px] tracking-[0.03em] uppercase whitespace-nowrap shrink-0 transition-all duration-200 hover:bg-[#ff5f46] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3049F0]"
            >
              <span>EXPLORE MY WORK</span>
              <ArrowUpRight className="w-5 h-5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('about');
              }}
              className="font-condensed font-bold text-[18px] sm:text-[21px] tracking-[0.03em] uppercase text-[#191919] underline decoration-2 underline-offset-[6px] hover:text-[#3049F0] hover:decoration-[#3049F0] transition-colors whitespace-nowrap shrink-0 py-2"
            >
              MORE ABOUT ME
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN (Cols 7-12): Dominant Lavender LOOP Stage + 3 Vertically Stacked Modules */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-4 items-stretch">
          {/* Dominant Lavender Panel (8 of 12 cols on right grid) */}
          <div
            onPointerMove={handleStagePointerMove}
            onPointerLeave={handleStagePointerLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
            }}
            className="sm:col-span-8 relative bg-[#D4C7FB] border-2 border-[#191919] rounded-[24px] p-4 sm:p-5 flex flex-col justify-between min-h-[460px] sm:min-h-[545px] overflow-hidden transition-transform duration-200 ease-out"
          >
            {/* Full-bleed Seamless Photorealistic LOOP Hardware Stage */}
            <button
              type="button"
              onClick={() => onSelectProject('loop', true)}
              aria-label="Open 01 LOOP Industrial Design Case Study"
              className="group absolute inset-0 w-full h-full flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-[#3049F0]"
            >
              <img
                src="/templates/nicopark/loop-hero.webp"
                alt="LOOP portable music device in coral-orange polycarbonate with a frosted clear circular acrylic dial and lilac tactile controls"
                width={808}
                height={1088}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none transition-transform duration-300 group-hover:scale-[1.015]"
              />
              {/* Subtle specular sweep over the clear acrylic dial */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden"
              >
                <span className="animate-specular-sweep absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </span>
            </button>

            {/* Top-left Kicker inside Lavender Tile */}
            <div className="relative z-20 flex items-start justify-between pointer-events-none">
              <div className="font-condensed font-semibold text-[14px] sm:text-[15px] leading-[1.15] tracking-[0.03em] uppercase text-[#191919]">
                <div>01 /</div>
                <div>FEATURED PROJECT</div>
              </div>
            </div>

            {/* Central Real Interactive SVG/HTML Callout Overlay Layer */}
            <div className="relative my-auto w-full h-[360px] sm:h-[430px] pointer-events-none">
              {/* Accessible SVG Leader Lines matching screenshot geometry */}
              <svg
                viewBox="0 0 400 440"
                className="pointer-events-none absolute inset-0 w-full h-full z-10"
                aria-hidden="true"
              >
                {/* Top-right: EXPLODED VIEW leader */}
                <polyline
                  points="282,66 300,48 318,48"
                  fill="none"
                  stroke={hoveredCallout === 'cover' ? '#3049F0' : '#191919'}
                  strokeWidth={hoveredCallout === 'cover' ? '1.8' : '1.1'}
                />
                {/* Top-right: TACTILE DIAL leader */}
                <polyline
                  points="296,82 318,82"
                  fill="none"
                  stroke={hoveredCallout === 'dial' ? '#3049F0' : '#191919'}
                  strokeWidth={hoveredCallout === 'dial' ? '1.8' : '1.1'}
                />
                {/* Right-lower: SUB-ASSEMBLY leader */}
                <polyline
                  points="298,236 326,264 326,314"
                  fill="none"
                  stroke={hoveredCallout === 'buttons' ? '#3049F0' : '#191919'}
                  strokeWidth={hoveredCallout === 'buttons' ? '1.8' : '1.1'}
                />
                {/* Bottom-right: USB-C PORT leader */}
                <polyline
                  points="246,336 268,356 292,356"
                  fill="none"
                  stroke={hoveredCallout === 'usb' ? '#3049F0' : '#191919'}
                  strokeWidth={hoveredCallout === 'usb' ? '1.8' : '1.1'}
                />
                {/* Bottom-left: EXPLODED VIEW leader */}
                <polyline
                  points="72,296 38,328 38,382"
                  fill="none"
                  stroke={hoveredCallout === 'cover-left' ? '#3049F0' : '#191919'}
                  strokeWidth={hoveredCallout === 'cover-left' ? '1.8' : '1.1'}
                />
                <polyline
                  points="132,366 96,400 84,400"
                  fill="none"
                  stroke="#191919"
                  strokeWidth="1.1"
                />
                {/* Bottom-left: USB-C PORT leader */}
                <polyline
                  points="182,358 120,418 108,418"
                  fill="none"
                  stroke={hoveredCallout === 'usb-left' ? '#3049F0' : '#191919'}
                  strokeWidth={hoveredCallout === 'usb-left' ? '1.8' : '1.1'}
                />
              </svg>

              {/* Interactive Callout Buttons positioned around the LOOP device */}
              <button
                type="button"
                onMouseEnter={() => setHoveredCallout('cover')}
                onMouseLeave={() => setHoveredCallout(null)}
                onClick={() => onInspectAnatomyPart('cover', true)}
                className="pointer-events-auto absolute z-20 top-[8.5%] right-[0.5%] font-condensed font-semibold text-[11px] sm:text-[12px] tracking-[0.04em] uppercase text-[#191919] hover:text-[#3049F0] cursor-pointer px-1 py-0.5 rounded transition-colors"
                title="Inspect Exploded View in Section 03"
              >
                EXPLODED VIEW
              </button>

              <button
                type="button"
                onMouseEnter={() => setHoveredCallout('dial')}
                onMouseLeave={() => setHoveredCallout(null)}
                onClick={() => onInspectAnatomyPart('dial', true)}
                className="pointer-events-auto absolute z-20 top-[16.5%] right-[1.5%] font-condensed font-semibold text-[11px] sm:text-[12px] tracking-[0.04em] uppercase text-[#191919] hover:text-[#3049F0] cursor-pointer px-1 py-0.5 rounded transition-colors"
                title="Inspect Tactile Dial in Section 03"
              >
                TACTILE DIAL
              </button>

              <button
                type="button"
                onMouseEnter={() => setHoveredCallout('buttons')}
                onMouseLeave={() => setHoveredCallout(null)}
                onClick={() => onInspectAnatomyPart('buttons', true)}
                className="pointer-events-auto absolute z-20 top-[71.5%] right-[0.5%] font-condensed font-semibold text-[11px] sm:text-[12px] tracking-[0.04em] uppercase text-[#191919] hover:text-[#3049F0] cursor-pointer px-1 py-0.5 rounded transition-colors"
                title="Inspect Sub-Assembly in Section 03"
              >
                SUB-ASSEMBLY
              </button>

              <button
                type="button"
                onMouseEnter={() => setHoveredCallout('usb')}
                onMouseLeave={() => setHoveredCallout(null)}
                onClick={() => onInspectAnatomyPart('usb', true)}
                className="pointer-events-auto absolute z-20 top-[78.5%] right-[4.5%] font-condensed font-semibold text-[11px] sm:text-[12px] tracking-[0.04em] uppercase text-[#191919] hover:text-[#3049F0] cursor-pointer px-1 py-0.5 rounded transition-colors"
                title="Inspect USB-C Port in Section 03"
              >
                USB-C PORT
              </button>

              <button
                type="button"
                onMouseEnter={() => setHoveredCallout('cover-left')}
                onMouseLeave={() => setHoveredCallout(null)}
                onClick={() => onInspectAnatomyPart('cover', true)}
                className="pointer-events-auto absolute z-20 bottom-[8.5%] left-[1.5%] font-condensed font-semibold text-[11px] sm:text-[12px] tracking-[0.04em] uppercase text-[#191919] hover:text-[#3049F0] cursor-pointer px-1 py-0.5 rounded transition-colors"
              >
                EXPLODED VIEW
              </button>

              <button
                type="button"
                onMouseEnter={() => setHoveredCallout('usb-left')}
                onMouseLeave={() => setHoveredCallout(null)}
                onClick={() => onInspectAnatomyPart('usb', true)}
                className="pointer-events-auto absolute z-20 bottom-[3%] left-[9%] font-condensed font-semibold text-[11px] sm:text-[12px] tracking-[0.04em] uppercase text-[#191919] hover:text-[#3049F0] cursor-pointer px-1 py-0.5 rounded transition-colors"
              >
                USB-C PORT
              </button>
            </div>

            {/* Bottom-right Tilted Butter-Yellow Product Tag Sticker */}
            <div className="relative z-20 flex justify-end mt-1">
              <button
                type="button"
                onClick={() => onSelectProject('loop', true)}
                className="group bg-[#F7E36B] border border-[#191919]/30 shadow-xs px-3.5 py-2.5 rounded-[10px] -rotate-6 hover:rotate-0 transition-transform duration-200 text-left cursor-pointer"
              >
                <div className="font-condensed font-extrabold text-[22px] leading-none tracking-tight text-[#191919]">
                  LOOP
                </div>
                <div className="font-condensed font-semibold text-[10px] leading-[1.15] tracking-[0.04em] uppercase text-[#191919] mt-0.5">
                  <div>PERSONAL AUDIO</div>
                  <div>PRODUCT DESIGN — 2026</div>
                </div>
              </button>
            </div>
          </div>

          {/* Right Stacked Column (4 of 12 cols on right grid): 3 Interactive Tiles */}
          <div className="sm:col-span-4 flex flex-col justify-between gap-4">
            {/* Tile 1: Butter-Yellow APPARATUS UI / 02 // LOOP APP */}
            <div className="flex-1 bg-[#F7E36B] border-2 border-[#191919] rounded-[22px] p-3.5 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-0.5 transition-transform duration-200">
              <div className="flex items-start justify-between gap-1">
                <div className="font-condensed font-bold text-[13px] leading-[1.15] tracking-[0.02em] uppercase text-[#191919]">
                  <div>APPARATUS UI</div>
                  <div className="font-normal">02 · LOOP APP</div>
                </div>
                <button
                  type="button"
                  onClick={onActivateAppDemo}
                  aria-label="Open interactive LOOP App preview"
                  className="text-[11px] font-condensed font-bold uppercase underline text-[#191919] hover:text-[#3049F0] cursor-pointer"
                >
                  LIVE UI ↗
                </button>
              </div>

              {/* Mini Handheld LOOP App Device Mockup with Live Controls */}
              <div
                onClick={onActivateAppDemo}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onActivateAppDemo();
                  }
                }}
                aria-label="Interactive LOOP App mini controller — click to open full preview"
                className="mt-2 ml-auto w-[78%] bg-[#F4DC58] border-2 border-[#191919] rounded-t-[18px] rounded-b-[10px] p-2.5 shadow-inner cursor-pointer"
              >
                <div className="flex items-center justify-between text-[8px] font-mono-tech font-bold text-[#191919] mb-1.5">
                  <span>74</span>
                  <span className="tracking-widest">LOOP</span>
                  <span>≡</span>
                </div>
                {/* Play/Pause & Waveform Row */}
                <div className="flex items-center justify-between gap-1 mb-2">
                  <span className="text-[8px] font-mono-tech">144</span>
                  <span className="text-[8px]">••||•</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setMiniAppPlaying((p) => !p);
                    }}
                    aria-label={miniAppPlaying ? 'Pause mini waveform' : 'Play mini waveform'}
                    className="w-5 h-5 rounded-full bg-[#191919] text-[#F7E36B] flex items-center justify-center text-[8px] font-bold"
                  >
                    {miniAppPlaying ? '❚❚' : '▶'}
                  </button>
                  <span className="text-[8px]">•||•</span>
                  <span className="text-[8px] font-mono-tech">441</span>
                </div>
                {/* Mini Dial + Toggle Switches */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full border-[1.5px] border-[#191919] border-dashed flex items-center justify-center">
                    <div
                      className={`w-2.5 h-0.5 bg-[#191919] origin-center transition-transform duration-300 ${
                        miniAppPlaying ? 'rotate-45' : '-rotate-45'
                      }`}
                    />
                  </div>
                  <div className="space-y-1 text-[7px] font-condensed uppercase">
                    <div className="flex items-center justify-end gap-1">
                      <span>Panel</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMiniPanelToggle((p) => !p);
                        }}
                        aria-label="Toggle mini panel mode"
                        className={`w-6 h-3 rounded-full border border-[#191919] flex items-center px-0.5 ${
                          miniPanelToggle ? 'bg-[#191919] justify-end' : 'bg-transparent justify-start'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            miniPanelToggle ? 'bg-[#F7E36B]' : 'bg-[#191919]'
                          }`}
                        />
                      </button>
                    </div>
                    <div className="flex items-center justify-end gap-1">
                      <span>Tactile</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMiniTactileToggle((p) => !p);
                        }}
                        aria-label="Toggle mini tactile mode"
                        className={`w-6 h-3 rounded-full border border-[#191919] flex items-center px-0.5 ${
                          miniTactileToggle ? 'bg-[#191919] justify-end' : 'bg-transparent justify-start'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            miniTactileToggle ? 'bg-[#F7E36B]' : 'bg-[#191919]'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Animated Equalizer Bars */}
                <div className="flex items-center justify-center gap-[2px] h-5 my-1">
                  {[35, 65, 90, 45, 80, 100, 55, 40, 85, 95, 50, 75, 60, 35].map((h, idx) => (
                    <span
                      key={idx}
                      style={{
                        height: miniAppPlaying ? `${h}%` : '25%'
                      }}
                      className="w-[2px] bg-[#191919] rounded-full transition-all duration-300"
                    />
                  ))}
                </div>
                {/* Bottom Pill Bar */}
                <div className="flex items-center justify-between pt-1 border-t border-[#191919]/20">
                  <span className="px-1.5 py-0.5 rounded-full bg-[#191919] text-[#F7E36B] text-[7px] font-mono-tech">
                    0 SCENE
                  </span>
                  <span className="w-3.5 h-3.5 rounded-full border border-[#191919] flex items-center justify-center text-[8px]">
                    +
                  </span>
                </div>
              </div>
            </div>

            {/* Tile 2: Off-White TECHNICAL WIREFRAME / 03 // SCHEMATIC */}
            <button
              type="button"
              onClick={() => onInspectAnatomyPart('cover', true)}
              className="flex-1 bg-[#F8F7F2] border-2 border-[#191919] rounded-[22px] p-3.5 flex flex-col justify-between text-left group hover:-translate-y-0.5 transition-transform duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#3049F0]"
            >
              <div className="font-condensed font-bold text-[13px] leading-[1.15] tracking-[0.02em] uppercase text-[#191919]">
                <div>TECHNICAL WIREFRAME</div>
                <div className="font-normal">03 · SCHEMATIC</div>
              </div>

              <div className="my-auto py-2 flex items-center justify-center">
                <svg
                  viewBox="0 0 220 120"
                  className="w-full max-w-[185px] h-auto overflow-visible"
                  aria-hidden="true"
                >
                  {/* Outer CAD Frame */}
                  <rect
                    x="20"
                    y="16"
                    width="160"
                    height="84"
                    rx="10"
                    fill="none"
                    stroke="#191919"
                    strokeWidth="1.2"
                  />
                  {/* Inner Viewport Rect */}
                  <rect
                    x="32"
                    y="24"
                    width="136"
                    height="68"
                    rx="3"
                    fill="none"
                    stroke="#191919"
                    strokeWidth="1"
                  />
                  {/* Diagonal Construction Crosshairs */}
                  <line x1="32" y1="24" x2="168" y2="92" stroke="#191919" strokeWidth="1" />
                  <line x1="32" y1="92" x2="168" y2="24" stroke="#191919" strokeWidth="1" />
                  {/* Cobalt Blue Dimension & Flow Vectors */}
                  <polyline
                    points="100,45 135,10 192,10 192,56 172,56"
                    fill="none"
                    stroke="#3049F0"
                    strokeWidth="1.5"
                    className="transition-all duration-300 group-hover:stroke-[2.2]"
                  />
                  <polyline
                    points="104,41 100,45 105,46"
                    fill="none"
                    stroke="#3049F0"
                    strokeWidth="1.5"
                  />
                  <polyline
                    points="176,53 172,56 176,59"
                    fill="none"
                    stroke="#3049F0"
                    strokeWidth="1.5"
                  />
                  {/* Vertical & Bottom Dimension Callout */}
                  <polyline
                    points="100,58 100,110 150,110 150,96"
                    fill="none"
                    stroke="#3049F0"
                    strokeWidth="1.5"
                  />
                  <polyline
                    points="48,78 48,104 100,104"
                    fill="none"
                    stroke="#3049F0"
                    strokeWidth="1.3"
                  />
                </svg>
              </div>
            </button>

            {/* Tile 3: Coral BRAND SYMBOL with Bold Black 8-Arm Asterisk */}
            <button
              type="button"
              onClick={onOpenAsteriskLab}
              onMouseEnter={() => setAsteriskHovered(true)}
              onMouseLeave={() => setAsteriskHovered(false)}
              className="flex-1 bg-[#FF735D] border-2 border-[#191919] rounded-[22px] p-3.5 flex flex-col justify-between text-left group hover:-translate-y-0.5 transition-transform duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#3049F0]"
            >
              <div className="font-condensed font-bold text-[13px] leading-[1.15] tracking-[0.02em] uppercase text-[#191919]">
                BRAND SYMBOL
              </div>

              <div className="my-auto py-2 flex items-center justify-center">
                <svg
                  viewBox="0 0 120 120"
                  className={`w-24 h-24 sm:w-28 sm:h-28 text-[#191919] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                    asteriskHovered ? 'rotate-45 scale-105' : 'rotate-0 scale-100'
                  }`}
                  aria-hidden="true"
                >
                  <g stroke="currentColor" strokeWidth="14" strokeLinecap="butt">
                    <line x1="60" y1="10" x2="60" y2="110" />
                    <line x1="10" y1="60" x2="110" y2="60" />
                    <line x1="24.6" y1="24.6" x2="95.4" y2="95.4" />
                    <line x1="95.4" y1="24.6" x2="24.6" y2="95.4" />
                  </g>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Editorial Ticker / Rule */}
      <div className="mt-8 lg:mt-10 pt-4 border-t-2 border-[#191919] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div
          role="group"
          aria-label="Featured projects quick index"
          className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[15px] sm:text-[18px] lg:text-[20px] font-condensed tracking-[0.02em] uppercase text-[#191919]"
        >
          <button
            type="button"
            onClick={() => {
              onSelectProject('loop', false);
              onNavigate('work');
            }}
            className="group inline-flex items-center gap-1.5 hover:text-[#3049F0] transition-colors cursor-pointer"
          >
            <span>01 /</span>
            <strong className="font-extrabold">LOOP</strong>
            <span>— INDUSTRIAL DESIGN</span>
          </button>

          <span aria-hidden="true" className="text-[#191919] text-sm">
            ✦
          </span>

          <button
            type="button"
            onClick={() => {
              onSelectProject('forma', false);
              onNavigate('work');
            }}
            className="group inline-flex items-center gap-1.5 hover:text-[#3049F0] transition-colors cursor-pointer"
          >
            <span>02 /</span>
            <strong className="font-extrabold">FORMA</strong>
            <span>— DIGITAL PRODUCT</span>
          </button>

          <span aria-hidden="true" className="text-[#191919] text-sm">
            ✦
          </span>

          <button
            type="button"
            onClick={() => {
              onSelectProject('kindred', false);
              onNavigate('work');
            }}
            className="group inline-flex items-center gap-1.5 hover:text-[#3049F0] transition-colors cursor-pointer"
          >
            <span>03 /</span>
            <strong className="font-extrabold">KINDRED</strong>
            <span>— BRAND EXPERIENCE</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('work')}
          className="group inline-flex items-center gap-2 font-condensed font-semibold text-[15px] sm:text-[16px] tracking-[0.04em] uppercase text-[#191919] hover:text-[#3049F0] transition-colors cursor-pointer shrink-0 self-end md:self-auto"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-4 h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
          <RefreshCw className="w-5 h-5 ml-1 animate-slow-spin text-[#191919]" />
        </button>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(nicopark)/nicopark/components/LoopAnatomySection.tsx">
<![CDATA["use client";

import React from 'react';
import { ChevronLeft, ChevronRight, Layers, Maximize2, Minimize2 } from 'lucide-react';
import {
  ANATOMY_PARTS,
  AnatomyPart,
  getAnatomyPartTransform,
  cycleAnatomyPart
} from '../data/portfolioData';

interface LoopAnatomySectionProps {
  isExploded: boolean;
  explodeFactor: number;
  selectedPartId: AnatomyPart['id'];
  onToggleExplode: () => void;
  onChangeExplodeFactor: (val: number) => void;
  onSelectPart: (partId: AnatomyPart['id']) => void;
}

export const LoopAnatomySection: React.FC<LoopAnatomySectionProps> = ({
  isExploded,
  explodeFactor,
  selectedPartId,
  onToggleExplode,
  onChangeExplodeFactor,
  onSelectPart
}) => {
  const activePart = ANATOMY_PARTS.find((p) => p.id === selectedPartId) || ANATOMY_PARTS[0];

  const coverTransform = getAnatomyPartTransform(ANATOMY_PARTS[0], isExploded, explodeFactor);
  const dialTransform = getAnatomyPartTransform(ANATOMY_PARTS[1], isExploded, explodeFactor);
  const buttonsTransform = getAnatomyPartTransform(ANATOMY_PARTS[3], isExploded, explodeFactor);

  return (
    <section
      id="anatomy"
      aria-labelledby="loop-anatomy-heading"
      data-exploded={isExploded ? 'true' : 'false'}
      className="scroll-mt-20 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24 border-t-2 border-[#191919]"
    >
      {/* Top Heading & Assemble / Explode Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <p className="font-condensed font-bold text-[15px] sm:text-[17px] tracking-[0.05em] uppercase text-[#515151] mb-2">
            CHAPTER 03 · LOOP HARDWARE ANATOMY & SUB-ASSEMBLIES
          </p>
          <h2
            id="loop-anatomy-heading"
            className="font-display uppercase text-[50px] sm:text-[68px] lg:text-[80px] leading-[0.9] text-[#191919]"
          >
            INSIDE THE <span className="text-[#FF735D]">OBJECT.</span>
          </h2>
        </div>

        {/* Assemble / Explode Primary Control Cluster */}
        <div className="flex flex-wrap items-center gap-4 bg-white border-2 border-[#191919] rounded-[20px] p-3">
          <button
            type="button"
            onClick={onToggleExplode}
            aria-pressed={isExploded}
            className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full border-2 border-[#191919] font-condensed font-bold text-[17px] tracking-[0.04em] uppercase transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
              isExploded
                ? 'bg-[#3049F0] text-white'
                : 'bg-[#F7E36B] text-[#191919] hover:bg-[#FF735D] hover:text-white'
            }`}
          >
            {isExploded ? (
              <>
                <Minimize2 className="w-4 h-4" />
                <span>ASSEMBLE VIEW</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-4 h-4" />
                <span>EXPLODE VIEW</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-3 px-2">
            <label
              htmlFor="explode-factor-slider"
              className="font-mono-tech text-xs font-semibold uppercase text-[#191919] whitespace-nowrap"
            >
              SEPARATION: {Math.round((isExploded ? explodeFactor : 0) * 100)}%
            </label>
            <input
              id="explode-factor-slider"
              type="range"
              min={0}
              max={100}
              value={Math.round((isExploded ? explodeFactor : 0) * 100)}
              onChange={(e) => {
                const v = Number(e.target.value) / 100;
                onChangeExplodeFactor(v);
              }}
              className="w-28 sm:w-36 accent-[#3049F0] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Main 12-Column Interactive Anatomy Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
        {/* Left 7 Columns: 2.5D Layered Hardware Explosion Stage */}
        <div className="lg:col-span-7 bg-[#D4C7FB] border-2 border-[#191919] rounded-[24px] p-5 sm:p-7 relative min-h-[460px] sm:min-h-[560px] flex flex-col justify-between overflow-hidden">
          {/* Base Layer: Full-bleed Coral Shell & Internal PCB */}
          <img
            src="/templates/nicopark/loop-hero.webp"
            alt="LOOP base coral polycarbonate enclosure and internal matte-black DSP board"
            width={808}
            height={1088}
            referrerPolicy="no-referrer"
            className={`pointer-events-none absolute inset-0 w-full h-full object-cover select-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              selectedPartId === 'pcb' ? 'scale-[1.03]' : 'scale-100'
            }`}
          />

          {/* Stage Top Bar */}
          <div className="relative flex items-center justify-between gap-2 z-20">
            <span className="font-mono-tech text-xs font-semibold uppercase text-[#191919]">
              CAD VIEWPORT · {isExploded ? 'EXPLODED SUB-ASSEMBLY STATE' : 'ASSEMBLED PRODUCTION STATE'}
            </span>
            <span className="font-mono-tech text-xs font-semibold text-[#3049F0]">
              ACTIVE: {activePart.code}
            </span>
          </div>

          {/* 2.5D Multi-Layer LOOP Render Stage */}
          <div className="relative my-auto w-full h-[360px] sm:h-[430px] flex items-center justify-center">

            {/* Explodable Layer 1: Circular Frosted Acrylic Platter */}
            <img
              src="/templates/nicopark/loop-cover.png"
              alt="Exploded layer: Frosted optical acrylic front platter"
              width={800}
              height={960}
              referrerPolicy="no-referrer"
              style={{
                transform: `translate3d(${coverTransform.x}px, ${coverTransform.y}px, 0) rotate(${coverTransform.rotate}deg) scale(${
                  selectedPartId === 'cover' ? coverTransform.scale * 1.05 : coverTransform.scale
                })`,
                opacity: isExploded ? 0.98 : 0
              }}
              className="pointer-events-none absolute inset-0 m-auto w-[78%] h-[78%] object-contain transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] drop-shadow-xl"
            />

            {/* Explodable Layer 2: CNC Knurled Lilac Rotary Dial */}
            <img
              src="/templates/nicopark/loop-dial.png"
              alt="Exploded layer: CNC knurled lilac aluminum rotary encoder"
              width={800}
              height={960}
              referrerPolicy="no-referrer"
              style={{
                transform: `translate3d(${dialTransform.x}px, ${dialTransform.y}px, 0) rotate(${dialTransform.rotate}deg) scale(${
                  selectedPartId === 'dial' ? dialTransform.scale * 1.06 : dialTransform.scale
                })`,
                opacity: isExploded ? 0.98 : 0
              }}
              className="pointer-events-none absolute inset-0 m-auto w-[78%] h-[78%] object-contain transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] drop-shadow-lg"
            />

            {/* Explodable Layer 3: Side Sub-Assembly & Bottom Port Module */}
            <img
              src="/templates/nicopark/loop-buttons.png"
              alt="Exploded layer: Modular side sub-assembly and USB-C I/O carrier"
              width={800}
              height={960}
              referrerPolicy="no-referrer"
              style={{
                transform: `translate3d(${buttonsTransform.x}px, ${buttonsTransform.y}px, 0) rotate(${buttonsTransform.rotate}deg) scale(${
                  selectedPartId === 'buttons' || selectedPartId === 'usb'
                    ? buttonsTransform.scale * 1.05
                    : buttonsTransform.scale
                })`,
                opacity: isExploded ? 0.98 : 0
              }}
              className="pointer-events-none absolute inset-0 m-auto w-[78%] h-[78%] object-contain transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] drop-shadow-lg"
            />

            {/* Dynamic SVG Guide Lines & Callout Anchors */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 w-full h-full z-20"
              aria-hidden="true"
            >
              {ANATOMY_PARTS.map((part) => {
                const isSelected = part.id === selectedPartId;
                const offsetX = isExploded ? (part.explodeDx / 8) * explodeFactor : 0;
                const offsetY = isExploded ? (part.explodeDy / 8) * explodeFactor : 0;
                const ax = part.anchorX + offsetX;
                const ay = part.anchorY + offsetY;
                return (
                  <g key={part.id}>
                    <line
                      x1={ax}
                      y1={ay}
                      x2={part.labelX}
                      y2={part.labelY}
                      stroke={isSelected ? '#3049F0' : '#191919'}
                      strokeWidth={isSelected ? '0.65' : '0.35'}
                      strokeDasharray={isExploded ? '1.5 1' : 'none'}
                    />
                    <circle
                      cx={ax}
                      cy={ay}
                      r={isSelected ? '1.6' : '1.0'}
                      fill={isSelected ? '#FF735D' : '#191919'}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Interactive Callout Hotspots on the Stage */}
            {ANATOMY_PARTS.map((part) => {
              const isSelected = part.id === selectedPartId;
              return (
                <button
                  key={part.id}
                  type="button"
                  onClick={() => onSelectPart(part.id)}
                  style={{
                    left: `${part.labelX}%`,
                    top: `${part.labelY}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  className={`absolute z-30 px-2.5 py-1 rounded-md border-[1.5px] border-[#191919] font-condensed font-bold text-[11px] sm:text-[12px] tracking-[0.04em] uppercase whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#3049F0] text-white scale-105 shadow-sm'
                      : 'bg-[#F8F7F2]/95 text-[#191919] hover:bg-[#F7E36B]'
                  }`}
                >
                  {part.shortLabel}
                </button>
              );
            })}
          </div>

          {/* Bottom Stage Legend */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#191919]/20 z-20 text-xs font-mono-tech text-[#191919]">
            <span>TOLERANCE: {activePart.tolerance}</span>
            <span>CLICK ANY CALLOUT OR USE PART SELECTOR →</span>
          </div>
        </div>

        {/* Right 5 Columns: Sub-Assembly Selector & Engineering Specification Card */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-5">
          {/* Part Selector Tabs */}
          <div className="bg-white border-2 border-[#191919] rounded-[24px] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="inline-flex items-center gap-2 font-condensed font-bold text-sm uppercase tracking-wider text-[#191919]">
                <Layers className="w-4 h-4 text-[#3049F0]" />
                <span>SELECT SUB-ASSEMBLY (01 — 05)</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onSelectPart(cycleAnatomyPart(selectedPartId, -1).id)}
                  aria-label="Previous hardware sub-assembly"
                  className="w-9 h-9 rounded-full border-2 border-[#191919] bg-[#F8F7F2] hover:bg-[#F7E36B] flex items-center justify-center cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onSelectPart(cycleAnatomyPart(selectedPartId, 1).id)}
                  aria-label="Next hardware sub-assembly"
                  className="w-9 h-9 rounded-full border-2 border-[#191919] bg-[#F8F7F2] hover:bg-[#F7E36B] flex items-center justify-center cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {ANATOMY_PARTS.map((part) => {
                const isSelected = part.id === selectedPartId;
                return (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => onSelectPart(part.id)}
                    className={`w-full px-4 py-3 rounded-xl border-2 border-[#191919] text-left flex items-center justify-between gap-3 transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-[#F7E36B] text-[#191919] translate-x-1'
                        : 'bg-[#F8F7F2] text-[#191919] hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="font-mono-tech text-[11px] text-[#515151]">{part.code}</div>
                      <div className="font-bold text-sm sm:text-[15px]">{part.name}</div>
                    </div>
                    <span className="font-condensed font-bold text-xs uppercase text-[#3049F0] shrink-0">
                      {part.shortLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Sub-Assembly Deep Detail Card */}
          <div className="flex-1 bg-[#F8F7F2] border-2 border-[#191919] rounded-[24px] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="font-mono-tech text-xs font-semibold text-[#3049F0]">
                  {activePart.code}
                </span>
                <span className="font-mono-tech text-xs text-[#515151]">{activePart.tolerance}</span>
              </div>

              <h3 className="font-display uppercase text-[32px] sm:text-[38px] leading-[0.95] text-[#191919] mb-3">
                {activePart.name}
              </h3>

              <p className="text-[15px] leading-[1.6] text-[#191919] mb-5">
                {activePart.description}
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-[#191919]/15 text-xs">
              <div>
                <span className="font-mono-tech uppercase text-[#515151] block">MATERIAL SPEC</span>
                <span className="font-semibold text-sm text-[#191919]">{activePart.material}</span>
              </div>
              <div>
                <span className="font-mono-tech uppercase text-[#515151] block">SURFACE FINISH</span>
                <span className="font-semibold text-sm text-[#191919]">{activePart.finish}</span>
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
    <file path="src/app/(nicopark)/nicopark/components/LoopAppSection.tsx">
<![CDATA["use client";

import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Sun,
  Moon,
  Repeat,
  Sliders
} from 'lucide-react';
import {
  LOOP_TRACKS,
  cycleLoopTrack,
  formatTrackTime
} from '../data/portfolioData';

export const LoopAppSection: React.FC = () => {
  const [currentTrackId, setCurrentTrackId] = useState<string>(LOOP_TRACKS[0].id);
  const [isPlayingDemo, setIsPlayingDemo] = useState<boolean>(true);
  const [elapsedSec, setElapsedSec] = useState<number>(42);
  const [volume, setVolume] = useState<number>(78);
  const [highContrastMode, setHighContrastMode] = useState<boolean>(false);
  const [loopRegionActive, setLoopRegionActive] = useState<boolean>(true);
  const [tactileDetentMode, setTactileDetentMode] = useState<boolean>(true);
  const [dialAngle, setDialAngle] = useState<number>(45);

  const currentTrack = LOOP_TRACKS.find((t) => t.id === currentTrackId) || LOOP_TRACKS[0];

  // Progress timer when demo is in active playing state
  useEffect(() => {
    if (!isPlayingDemo) return;
    const interval = window.setInterval(() => {
      setElapsedSec((prev) => {
        if (prev + 1 >= currentTrack.durationSec) {
          return 0;
        }
        return prev + 1;
      });
      setDialAngle((prev) => (prev + 6) % 360);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isPlayingDemo, currentTrack.durationSec]);

  const handleTrackSwitch = (dir: 1 | -1) => {
    const next = cycleLoopTrack(currentTrack.id, dir);
    setCurrentTrackId(next.id);
    setElapsedSec(18);
    setDialAngle((prev) => (prev + dir * 30 + 360) % 360);
  };

  const progressPercent = Math.min(
    100,
    Math.round((elapsedSec / currentTrack.durationSec) * 100)
  );

  return (
    <section
      id="loop-app"
      aria-labelledby="loop-app-heading"
      className="scroll-mt-20 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24 border-t-2 border-[#191919]"
    >
      {/* Header Row */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <p className="font-condensed font-bold text-[15px] sm:text-[17px] tracking-[0.05em] uppercase text-[#515151] mb-2">
            CHAPTER 04 · APPARATUS UI & COMPANION INTERFACE
          </p>
          <h2
            id="loop-app-heading"
            className="font-display uppercase text-[50px] sm:text-[68px] lg:text-[80px] leading-[0.9] text-[#191919]"
          >
            LOOP <span className="text-[#3049F0]">APP PREVIEW.</span>
          </h2>
        </div>

        {/* Explicit Honest Demo State Notice */}
        <div className="bg-[#F7E36B] border-2 border-[#191919] rounded-2xl px-4 py-3 max-w-md">
          <div className="font-mono-tech text-xs font-bold uppercase text-[#191919]">
            INTERACTIVE UI PREVIEW · SILENT DEMO MODE
          </div>
          <p className="text-xs text-[#191919]/85 mt-0.5">
            Live HTML/SVG state machine simulating LOOP’s companion screen and rotary stem looper (no audio output).
          </p>
        </div>
      </div>

      {/* Main Split: Left Interactive Apparatus Device Stage / Right Track & Parameter Lab */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
        {/* Left 7 Cols: Butter-Yellow Apparatus Stage */}
        <div className="lg:col-span-7 bg-[#F7E36B] border-2 border-[#191919] rounded-[24px] p-6 sm:p-9 flex flex-col items-center justify-between">
          <div className="w-full flex flex-wrap items-center justify-between gap-2 mb-6">
            <span className="font-condensed font-bold text-sm uppercase tracking-wider text-[#191919]">
              02 · LOOP APPARATUS OS v2.4 (SIMULATED)
            </span>
            <button
              type="button"
              onClick={() => setHighContrastMode((prev) => !prev)}
              aria-pressed={highContrastMode}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#191919] text-[#F8F7F2] font-condensed font-bold text-xs uppercase tracking-wider hover:bg-[#3049F0] transition-colors cursor-pointer"
            >
              {highContrastMode ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#F7E36B]" />
                  <span>SWITCH TO DAYLIGHT BUTTER</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#F7E36B]" />
                  <span>SWITCH TO OLED HIGH-CONTRAST</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Handheld LOOP App Screen */}
          <div
            className={`w-full max-w-[440px] border-[3px] border-[#191919] rounded-[28px] p-5 sm:p-6 transition-colors duration-300 shadow-lg ${
              highContrastMode ? 'bg-[#191919] text-[#F8F7F2]' : 'bg-[#F4DC58] text-[#191919]'
            }`}
          >
            {/* Device Status Header */}
            <div className="flex items-center justify-between font-mono-tech text-xs font-bold pb-3 border-b border-current/20">
              <span>BPM {currentTrack.bpm}</span>
              <span className="tracking-[0.2em]">LOOP // OS</span>
              <span>VOL {volume}%</span>
            </div>

            {/* Active Track Readout */}
            <div className="my-4 text-center">
              <div className="font-mono-tech text-xs opacity-75">
                TRACK {currentTrack.number} · {currentTrack.keySignature}
              </div>
              <h3 className="font-condensed font-extrabold text-[26px] sm:text-[30px] tracking-tight uppercase mt-0.5">
                {currentTrack.title}
              </h3>
              <div className="text-xs font-medium opacity-80">{currentTrack.artist}</div>
            </div>

            {/* Primary Transport & Jog Row (matching screenshot's yellow tile layout) */}
            <div className="flex items-center justify-between gap-3 my-4 px-2">
              <button
                type="button"
                onClick={() => handleTrackSwitch(-1)}
                aria-label="Previous demo track"
                className={`w-11 h-11 rounded-full border-2 border-current flex items-center justify-center transition-transform active:scale-90 cursor-pointer ${
                  highContrastMode ? 'hover:bg-[#3049F0]' : 'hover:bg-white'
                }`}
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <span className="font-mono-tech text-xs">••||•</span>

              <button
                type="button"
                onClick={() => setIsPlayingDemo((p) => !p)}
                aria-label={isPlayingDemo ? 'Pause demo state' : 'Play demo state'}
                className={`w-14 h-14 rounded-full border-2 border-[#191919] flex items-center justify-center transition-transform active:scale-95 cursor-pointer ${
                  highContrastMode
                    ? 'bg-[#FF735D] text-[#191919]'
                    : 'bg-[#191919] text-[#F7E36B]'
                }`}
              >
                {isPlayingDemo ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
              </button>

              <span className="font-mono-tech text-xs">•||••</span>

              <button
                type="button"
                onClick={() => handleTrackSwitch(1)}
                aria-label="Next demo track"
                className={`w-11 h-11 rounded-full border-2 border-current flex items-center justify-center transition-transform active:scale-90 cursor-pointer ${
                  highContrastMode ? 'hover:bg-[#3049F0]' : 'hover:bg-white'
                }`}
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Rotary Platter & Hardware Mode Toggles */}
            <div className="grid grid-cols-2 gap-4 items-center my-5 py-3 px-3 rounded-2xl border border-current/25">
              {/* Interactive Rotary Jog Platter */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setDialAngle((a) => (a + 45) % 360);
                    setElapsedSec((s) => (s + 15) % currentTrack.durationSec);
                  }}
                  aria-label="Rotate virtual vernier jog dial +15 seconds"
                  className="w-16 h-16 rounded-full border-2 border-current border-dashed flex items-center justify-center relative cursor-pointer hover:scale-105 transition-transform"
                >
                  <span
                    style={{ transform: `rotate(${dialAngle}deg)` }}
                    className="w-6 h-0.5 bg-current block origin-center transition-transform duration-300"
                  />
                  <span className="sr-only">Step jog wheel</span>
                </button>
                <div className="text-left">
                  <div className="font-mono-tech text-[11px] font-bold uppercase">PLATTER</div>
                  <div className="font-mono-tech text-xs opacity-80">{dialAngle}° STEP</div>
                </div>
              </div>

              {/* Two Tactile Pill Toggles */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-condensed font-bold text-xs uppercase">LOOP A–B</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={loopRegionActive}
                    aria-label="Toggle Loop A to B region"
                    onClick={() => setLoopRegionActive((p) => !p)}
                    className={`w-12 h-6 rounded-full border-2 border-current p-0.5 flex items-center transition-colors cursor-pointer ${
                      loopRegionActive ? 'bg-[#3049F0] justify-end' : 'bg-transparent justify-start'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-white border border-[#191919]" />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="font-condensed font-bold text-xs uppercase">DETENT</span>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={tactileDetentMode}
                    aria-label="Toggle tactile 36-step detent quantization"
                    onClick={() => setTactileDetentMode((p) => !p)}
                    className={`w-12 h-6 rounded-full border-2 border-current p-0.5 flex items-center transition-colors cursor-pointer ${
                      tactileDetentMode ? 'bg-[#FF735D] justify-end' : 'bg-transparent justify-start'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-white border border-[#191919]" />
                  </button>
                </div>
              </div>
            </div>

            {/* 20-Bar Live Equalizer Waveform */}
            <div
              aria-label="Visual waveform equalizer"
              className="h-14 flex items-center justify-between gap-1 px-2 my-3"
            >
              {currentTrack.waveform.map((peak, idx) => {
                const isLoopWindow = loopRegionActive && idx >= 5 && idx <= 14;
                const activeHeight = isPlayingDemo
                  ? Math.max(18, ((peak + ((elapsedSec * 13 + idx * 7) % 30)) % 100))
                  : Math.round(peak * 0.45);
                return (
                  <span
                    key={idx}
                    style={{ height: `${activeHeight}%` }}
                    className={`flex-1 rounded-full transition-all duration-300 ${
                      isLoopWindow
                        ? 'bg-[#3049F0]'
                        : highContrastMode
                        ? 'bg-[#F7E36B]'
                        : 'bg-[#191919]'
                    }`}
                  />
                );
              })}
            </div>

            {/* Scrubbable Progress Slider */}
            <div className="mt-3">
              <div className="flex items-center justify-between font-mono-tech text-xs mb-1">
                <span>{formatTrackTime(elapsedSec)}</span>
                <span>
                  {isPlayingDemo ? 'DEMO RUNNING (NO AUDIO)' : 'DEMO PAUSED'} · {progressPercent}%
                </span>
                <span>{formatTrackTime(currentTrack.durationSec)}</span>
              </div>
              <input
                type="range"
                aria-label="Scrub demo track timeline"
                min={0}
                max={currentTrack.durationSec}
                value={elapsedSec}
                onChange={(e) => setElapsedSec(Number(e.target.value))}
                className="w-full accent-[#3049F0] cursor-pointer"
              />
            </div>

            {/* Bottom Scene Pill Bar */}
            <div className="mt-4 pt-3 border-t border-current/20 flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#191919] text-[#F7E36B] font-mono-tech text-xs font-bold">
                SCENE {currentTrack.number}
              </span>
              <span className="font-mono-tech text-xs">
                {tactileDetentMode ? 'QUANTIZED 1/16' : 'FREE SCRUB'}
              </span>
            </div>
          </div>

          <div className="w-full flex items-center justify-between text-xs font-mono-tech text-[#191919] mt-5">
            <span>DISPLAY: 2.1&quot; TRANSFLECTIVE MEMORY LCD</span>
            <span>REFRESH: 60HZ LOW-POWER</span>
          </div>
        </div>

        {/* Right 5 Cols: Track Stems Selector & Volume / Parameter Controls */}
        <div className="lg:col-span-5 bg-white border-2 border-[#191919] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 font-condensed font-bold text-sm uppercase tracking-wider text-[#3049F0] mb-2">
              <Sliders className="w-4 h-4" />
              <span>SELECT ORIGINAL STUDIO STEM (01 — 04)</span>
            </div>
            <h3 className="font-display uppercase text-[34px] sm:text-[42px] leading-[0.95] text-[#191919] mb-4">
              TACTILE LIBRARY &amp; LOOP CONTROLS
            </h3>

            {/* Track List Buttons */}
            <div className="space-y-2.5 mb-7">
              {LOOP_TRACKS.map((trk) => {
                const isSelected = trk.id === currentTrack.id;
                return (
                  <button
                    key={trk.id}
                    type="button"
                    onClick={() => {
                      setCurrentTrackId(trk.id);
                      setElapsedSec(12);
                    }}
                    className={`w-full p-4 rounded-2xl border-2 border-[#191919] text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#D5C8FC] text-[#191919] -translate-y-0.5'
                        : 'bg-[#F8F7F2] text-[#191919] hover:bg-[#F7E36B]'
                    }`}
                  >
                    <div>
                      <div className="font-mono-tech text-xs text-[#515151]">
                        STEM {trk.number} · {trk.bpm} BPM
                      </div>
                      <div className="font-bold text-[15px] text-[#191919]">{trk.title}</div>
                      <div className="text-xs text-[#515151]">{trk.artist}</div>
                    </div>
                    <div className="font-mono-tech text-xs font-bold text-[#191919] shrink-0">
                      {formatTrackTime(trk.durationSec)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hardware Gain & Loop Slicer Controls */}
          <div className="bg-[#F8F7F2] border-2 border-[#191919] rounded-[20px] p-5 space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-mono-tech font-bold text-[#191919] mb-1.5">
                <span className="inline-flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-[#3049F0]" />
                  <span>ROTARY GAIN ATTENUATOR</span>
                </span>
                <span>{volume} dB%</span>
              </div>
              <input
                type="range"
                aria-label="Rotary Gain Attenuator Volume"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full accent-[#FF735D] cursor-pointer"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#191919]/15">
              <button
                type="button"
                onClick={() => setLoopRegionActive((p) => !p)}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border-2 border-[#191919] font-condensed font-bold text-xs uppercase cursor-pointer ${
                  loopRegionActive ? 'bg-[#3049F0] text-white' : 'bg-white text-[#191919]'
                }`}
              >
                <Repeat className="w-3.5 h-3.5" />
                <span>{loopRegionActive ? 'A–B LOOP LOCKED' : 'ENABLE A–B LOOP'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsPlayingDemo((p) => !p)}
                className="px-4 py-2 rounded-full bg-[#FF735D] text-white border-2 border-[#191919] font-condensed font-bold text-xs uppercase cursor-pointer"
              >
                {isPlayingDemo ? 'PAUSE DEMO UI' : 'RESUME DEMO UI'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(nicopark)/nicopark/components/Navbar.tsx">
<![CDATA["use client";

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'work', label: 'Work' },
  { id: 'playground', label: 'Playground' },
  { id: 'about', label: 'About' },
  { id: 'notes', label: 'Notes' }
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const connectBtnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handlePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== 'mouse' || !connectBtnRef.current) return;
    const rect = connectBtnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = Math.max(-6, Math.min(6, (e.clientX - cx) * 0.12));
    const dy = Math.max(-4, Math.min(4, (e.clientY - cy) * 0.15));
    setBtnOffset({ x: dx, y: dy });
  };

  const handlePointerLeave = () => {
    setBtnOffset({ x: 0, y: 0 });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8F7F2]/95 backdrop-blur-xs border-b border-[#191919]/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-2 sm:gap-6 lg:gap-8">
        {/* Zone 1: Brand Wordmark with signature 8-spoke burst mark */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, 'top')}
          className="group inline-flex items-start text-[#191919] font-extrabold text-[23px] sm:text-[32px] lg:text-[34px] tracking-[-0.04em] leading-none whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3049F0]"
          aria-label="nico park. home"
        >
          <span>nico park.</span>
          <svg
            viewBox="0 0 32 32"
            className="w-4 h-4 sm:w-6 sm:h-6 -mt-0.5 sm:-mt-1 ml-0.5 text-[#191919] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-90"
            aria-hidden="true"
          >
            <g stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <line x1="16" y1="2" x2="16" y2="8" />
              <line x1="16" y1="24" x2="16" y2="30" />
              <line x1="2" y1="16" x2="8" y2="16" />
              <line x1="24" y1="16" x2="30" y2="16" />
              <line x1="6.1" y1="6.1" x2="10.3" y2="10.3" />
              <line x1="21.7" y1="21.7" x2="25.9" y2="25.9" />
              <line x1="25.9" y1="6.1" x2="21.7" y2="10.3" />
              <line x1="10.3" y1="21.7" x2="6.1" y2="25.9" />
            </g>
          </svg>
        </a>

        {/* Zone 2: Center Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-8 lg:gap-11"
          onMouseLeave={() => setHoveredNav(null)}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            const isHighlighted = hoveredNav ? hoveredNav === item.id : isActive;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                onMouseEnter={() => setHoveredNav(item.id)}
                className="relative py-1.5 text-[18px] lg:text-[20px] font-medium text-[#191919] whitespace-nowrap shrink-0 transition-colors hover:text-[#3049F0] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3049F0]"
              >
                {item.label}
                <span
                  className={`absolute left-0 right-0 -bottom-0.5 h-[2.5px] bg-[#3049F0] origin-left transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isHighlighted ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Connect Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            ref={connectBtnRef}
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={{
              transform: `translate3d(${btnOffset.x}px, ${btnOffset.y}px, 0)`
            }}
            className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2 sm:py-3 rounded-full bg-[#3049F0] text-white border-2 border-[#191919] font-condensed font-bold text-[14px] sm:text-[18px] tracking-[0.04em] uppercase whitespace-nowrap shrink-0 transition-all duration-200 hover:bg-[#243BE0] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3049F0]"
          >
            <span>LET&apos;S CONNECT</span>
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-[#191919] text-[#191919] hover:bg-[#F7E36B] transition-colors shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-label="Mobile navigation"
          className="md:hidden border-b-2 border-[#191919] bg-[#F8F7F2] px-6 py-5 space-y-3"
        >
          <div className="grid grid-cols-2 gap-2.5">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`px-4 py-3 rounded-2xl border-2 border-[#191919] font-condensed font-bold text-lg uppercase tracking-wider flex items-center justify-between ${
                  activeSection === item.id ? 'bg-[#F7E36B] text-[#191919]' : 'bg-white text-[#191919]'
                }`}
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
]]>
    </file>
    <file path="src/app/(nicopark)/nicopark/components/PlaygroundSection.tsx">
<![CDATA["use client";

import React, { useState } from 'react';
import { RotateCcw, Palette, Sparkles, Gauge } from 'lucide-react';
import {
  PLAYGROUND_SWATCHES,
  SwatchItem,
  calculateAsteriskSpokes
} from '../data/portfolioData';

export const PlaygroundSection: React.FC = () => {
  // Experiment 01: CMF Swatch Palette Tray State
  const [selectedSlot, setSelectedSlot] = useState<'shell' | 'dial' | 'accent'>('shell');
  const [cmfAssignment, setCmfAssignment] = useState<{
    shell: SwatchItem;
    dial: SwatchItem;
    accent: SwatchItem;
  }>({
    shell: PLAYGROUND_SWATCHES[0], // Signal Coral
    dial: PLAYGROUND_SWATCHES[3], // Tactile Lilac
    accent: PLAYGROUND_SWATCHES[2] // Apparatus Butter
  });

  // Experiment 02: Parametric Asterisk & Shape Morph Lab State
  const [armCount, setArmCount] = useState<number>(4); // 4 full diameter lines = 8-armed asterisk
  const [strokeWidth, setStrokeWidth] = useState<number>(14);
  const [rotationDeg, setRotationDeg] = useState<number>(0);
  const [roundCaps, setRoundCaps] = useState<boolean>(false);

  // Experiment 03: Tactile Switch Travel & Spring Button Lab State
  const [switchTravelMm, setSwitchTravelMm] = useState<number>(4.0);
  const [springForceG, setSpringForceG] = useState<number>(55);
  const [pressCount, setPressCount] = useState<number>(12);
  const [isKeyPressed, setIsKeyPressed] = useState<boolean>(false);

  const spokes = calculateAsteriskSpokes(armCount, rotationDeg, 46);

  const handleAssignSwatch = (swatch: SwatchItem) => {
    setCmfAssignment((prev) => ({
      ...prev,
      [selectedSlot]: swatch
    }));
  };

  const handleResetAll = () => {
    setSelectedSlot('shell');
    setCmfAssignment({
      shell: PLAYGROUND_SWATCHES[0],
      dial: PLAYGROUND_SWATCHES[3],
      accent: PLAYGROUND_SWATCHES[2]
    });
    setArmCount(4);
    setStrokeWidth(14);
    setRotationDeg(0);
    setRoundCaps(false);
    setSwitchTravelMm(4.0);
    setSpringForceG(55);
    setPressCount(0);
  };

  const triggerTactilePress = () => {
    setIsKeyPressed(true);
    setPressCount((c) => c + 1);
    window.setTimeout(() => {
      setIsKeyPressed(false);
    }, 160);
  };

  return (
    <section
      id="playground"
      aria-labelledby="playground-heading"
      className="scroll-mt-20 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24 border-t-2 border-[#191919]"
    >
      {/* Header Row with Explicit Experiment Distinction & Reset Action */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <p className="font-condensed font-bold text-[15px] sm:text-[17px] tracking-[0.05em] uppercase text-[#515151] mb-2">
            CHAPTER 06 · STUDIO SANDBOX (NON-CLIENT R&amp;D EXPERIMENTS)
          </p>
          <h2
            id="playground-heading"
            className="font-display uppercase text-[50px] sm:text-[68px] lg:text-[80px] leading-[0.9] text-[#191919]"
          >
            TACTILE <span className="text-[#FF735D]">PLAYGROUND.</span>
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <span className="font-mono-tech text-xs text-[#515151]">
            SESSION-LOCAL SANDBOX · KEYBOARD &amp; TOUCH READY
          </span>
          <button
            type="button"
            onClick={handleResetAll}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border-2 border-[#191919] font-condensed font-bold text-sm uppercase tracking-wider hover:bg-[#F7E36B] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RESET EXPERIMENTS</span>
          </button>
        </div>
      </div>

      {/* Three Movable / Interactive Experiment Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
        {/* EXPERIMENT 01: CMF Color Swatch Snap Tray */}
        <div className="bg-white border-2 border-[#191919] rounded-[24px] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-[#191919]/15">
              <span className="inline-flex items-center gap-1.5 font-condensed font-bold text-sm uppercase text-[#3049F0]">
                <Palette className="w-4 h-4" />
                <span>EXP 01 · CMF SWATCH TRAY</span>
              </span>
              <span className="font-mono-tech text-xs text-[#515151]">PANTONE / RAL LAB</span>
            </div>

            <h3 className="font-condensed font-extrabold text-[26px] uppercase text-[#191919] leading-tight mb-2">
              Snap Hardware CMF Finishes
            </h3>
            <p className="text-xs text-[#515151] mb-4">
              Select a target hardware part slot below, then click or drag any studio swatch tile to snap it into the enclosure recipe.
            </p>

            {/* Live Mini Hardware CMF Preview Stage */}
            <div className="bg-[#F8F7F2] border-2 border-[#191919] rounded-2xl p-4 mb-4 flex items-center justify-between gap-4">
              <svg
                viewBox="0 0 140 120"
                className="w-28 h-24 shrink-0"
                aria-label="Live CMF hardware enclosure preview"
              >
                {/* Main Enclosure Shell */}
                <rect
                  x="16"
                  y="18"
                  width="92"
                  height="88"
                  rx="26"
                  fill={cmfAssignment.shell.hex}
                  stroke="#191919"
                  strokeWidth="3"
                />
                {/* Top Knurled Dial */}
                <rect
                  x="84"
                  y="6"
                  width="26"
                  height="16"
                  rx="4"
                  fill={cmfAssignment.dial.hex}
                  stroke="#191919"
                  strokeWidth="2.5"
                />
                {/* Front Platter Ring */}
                <circle
                  cx="58"
                  cy="58"
                  r="28"
                  fill={cmfAssignment.accent.hex}
                  stroke="#191919"
                  strokeWidth="2.5"
                />
                <circle cx="58" cy="58" r="10" fill="#191919" />
              </svg>

              <div className="flex-1 space-y-1.5 text-xs">
                {(['shell', 'dial', 'accent'] as const).map((slotKey) => {
                  const active = selectedSlot === slotKey;
                  const sw = cmfAssignment[slotKey];
                  return (
                    <button
                      key={slotKey}
                      type="button"
                      onClick={() => setSelectedSlot(slotKey)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        const swatchId = e.dataTransfer.getData('text/plain');
                        const found = PLAYGROUND_SWATCHES.find((s) => s.id === swatchId);
                        if (found) {
                          setCmfAssignment((prev) => ({ ...prev, [slotKey]: found }));
                        }
                      }}
                      className={`w-full px-2.5 py-1.5 rounded-lg border border-[#191919] flex items-center justify-between text-left cursor-pointer ${
                        active ? 'bg-[#F7E36B] font-bold' : 'bg-white'
                      }`}
                    >
                      <span className="uppercase font-mono-tech text-[11px]">
                        {slotKey}: {sw.name}
                      </span>
                      <span
                        style={{ backgroundColor: sw.hex }}
                        className="w-4 h-4 rounded-full border border-[#191919] shrink-0"
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Draggable / Clickable Swatch Grid */}
            <div className="grid grid-cols-3 gap-2">
              {PLAYGROUND_SWATCHES.map((sw) => (
                <button
                  key={sw.id}
                  type="button"
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('text/plain', sw.id)}
                  onClick={() => handleAssignSwatch(sw)}
                  style={{ backgroundColor: sw.hex, color: sw.textColor }}
                  className="p-2.5 rounded-xl border-2 border-[#191919] text-left transition-transform hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  <div className="font-mono-tech text-[10px] opacity-85">{sw.pantoneCode}</div>
                  <div className="font-bold text-xs leading-tight mt-1">{sw.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-[#191919]/15 font-mono-tech text-xs text-[#515151] flex items-center justify-between">
            <span>TARGET SLOT: {selectedSlot.toUpperCase()}</span>
            <span>{cmfAssignment[selectedSlot].hex}</span>
          </div>
        </div>

        {/* EXPERIMENT 02: Parametric 8-Arm Asterisk & Symbol Morph Builder */}
        <div
          id="asterisk-lab"
          className="bg-[#FF735D] border-2 border-[#191919] rounded-[24px] p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-[#191919]/25">
              <span className="inline-flex items-center gap-1.5 font-condensed font-bold text-sm uppercase text-[#191919]">
                <Sparkles className="w-4 h-4" />
                <span>EXP 02 · ASTERISK LAB</span>
              </span>
              <span className="font-mono-tech text-xs font-bold text-[#191919]">
                {armCount * 2}-POINT RADIAL
              </span>
            </div>

            <h3 className="font-condensed font-extrabold text-[26px] uppercase text-[#191919] leading-tight mb-2">
              Parametric Brand Symbol Generator
            </h3>
            <p className="text-xs text-[#191919]/85 mb-4">
              Morph the studio’s signature radial asterisk by tuning spoke count, stroke mass, and rotational offset.
            </p>

            {/* Live SVG Asterisk Viewport */}
            <div className="bg-[#F8F7F2] border-2 border-[#191919] rounded-2xl p-4 mb-4 flex items-center justify-center h-44 relative">
              <svg
                viewBox="-60 -60 120 120"
                className="w-36 h-36 text-[#191919] transition-transform duration-200"
                aria-label={`${armCount * 2}-pointed parametric asterisk symbol`}
              >
                <g
                  stroke="currentColor"
                  strokeWidth={strokeWidth}
                  strokeLinecap={roundCaps ? 'round' : 'butt'}
                >
                  {spokes.map((s, idx) => (
                    <line key={idx} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} />
                  ))}
                </g>
              </svg>
              <button
                type="button"
                onClick={() => setRoundCaps((r) => !r)}
                className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-full bg-[#F7E36B] border border-[#191919] font-mono-tech text-[10px] font-bold uppercase cursor-pointer"
              >
                CAPS: {roundCaps ? 'ROUND' : 'SQUARE'}
              </button>
            </div>

            {/* Parametric Sliders */}
            <div className="space-y-3 bg-[#F8F7F2] border-2 border-[#191919] rounded-2xl p-3.5 text-xs">
              <div>
                <div className="flex justify-between font-mono-tech font-bold mb-1">
                  <label htmlFor="asterisk-arms-slider">SPOKE AXES ({armCount * 2} TIPS)</label>
                  <span>{armCount} AXES</span>
                </div>
                <input
                  id="asterisk-arms-slider"
                  type="range"
                  min={2}
                  max={8}
                  value={armCount}
                  onChange={(e) => setArmCount(Number(e.target.value))}
                  className="w-full accent-[#3049F0] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-mono-tech font-bold mb-1">
                  <label htmlFor="asterisk-weight-slider">STROKE WEIGHT</label>
                  <span>{strokeWidth}PX</span>
                </div>
                <input
                  id="asterisk-weight-slider"
                  type="range"
                  min={4}
                  max={22}
                  value={strokeWidth}
                  onChange={(e) => setStrokeWidth(Number(e.target.value))}
                  className="w-full accent-[#3049F0] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-mono-tech font-bold mb-1">
                  <label htmlFor="asterisk-rotation-slider">PHASE ROTATION</label>
                  <span>{rotationDeg}°</span>
                </div>
                <input
                  id="asterisk-rotation-slider"
                  type="range"
                  min={0}
                  max={90}
                  value={rotationDeg}
                  onChange={(e) => setRotationDeg(Number(e.target.value))}
                  className="w-full accent-[#3049F0] cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-[#191919]/25 font-mono-tech text-xs text-[#191919] flex items-center justify-between">
            <span>GEOMETRY: VECTOR RADIAL</span>
            <span>KINDRED OPEN SPEC</span>
          </div>
        </div>

        {/* EXPERIMENT 03: Tactile Switch & Spring Button Microinteraction Lab */}
        <div className="bg-[#D5C8FC] border-2 border-[#191919] rounded-[24px] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-[#191919]/20">
              <span className="inline-flex items-center gap-1.5 font-condensed font-bold text-sm uppercase text-[#191919]">
                <Gauge className="w-4 h-4" />
                <span>EXP 03 · SWITCH PHYSICS LAB</span>
              </span>
              <span className="font-mono-tech text-xs font-bold text-[#3049F0]">
                CYCLES: {pressCount}
              </span>
            </div>

            <h3 className="font-condensed font-extrabold text-[26px] uppercase text-[#191919] leading-tight mb-2">
              Tactile Keycap &amp; Spring Tester
            </h3>
            <p className="text-xs text-[#191919]/85 mb-4">
              Tune actuation travel and spring force, then press the physical test plunger to inspect compression depth.
            </p>

            {/* Physical Plunger Button Stage */}
            <div className="bg-[#F8F7F2] border-2 border-[#191919] rounded-2xl p-5 mb-4 flex flex-col items-center justify-center h-44">
              <button
                type="button"
                onClick={triggerTactilePress}
                style={{
                  transform: isKeyPressed
                    ? `translateY(${Math.round(switchTravelMm * 2.2)}px) scale(0.97)`
                    : 'translateY(0px) scale(1)'
                }}
                className="px-8 py-5 rounded-2xl bg-[#F7E36B] border-[3px] border-[#191919] shadow-[0_8px_0_#191919] active:shadow-[0_2px_0_#191919] transition-all duration-150 cursor-pointer"
              >
                <span className="font-display uppercase text-2xl tracking-wider text-[#191919] block">
                  PRESS PLUNGER
                </span>
                <span className="font-mono-tech text-[11px] text-[#515151] block mt-0.5">
                  {switchTravelMm.toFixed(1)}MM TRAVEL · {springForceG}GF
                </span>
              </button>
            </div>

            {/* Travel & Force Sliders */}
            <div className="space-y-3 bg-[#F8F7F2] border-2 border-[#191919] rounded-2xl p-3.5 text-xs">
              <div>
                <div className="flex justify-between font-mono-tech font-bold mb-1">
                  <label htmlFor="switch-travel-slider">ACTUATION TRAVEL</label>
                  <span>{switchTravelMm.toFixed(1)} MM</span>
                </div>
                <input
                  id="switch-travel-slider"
                  type="range"
                  min={1.5}
                  max={6.0}
                  step={0.5}
                  value={switchTravelMm}
                  onChange={(e) => setSwitchTravelMm(Number(e.target.value))}
                  className="w-full accent-[#3049F0] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between font-mono-tech font-bold mb-1">
                  <label htmlFor="spring-force-slider">BOTTOM-OUT SPRING FORCE</label>
                  <span>{springForceG} GF</span>
                </div>
                <input
                  id="spring-force-slider"
                  type="range"
                  min={35}
                  max={85}
                  step={5}
                  value={springForceG}
                  onChange={(e) => setSpringForceG(Number(e.target.value))}
                  className="w-full accent-[#FF735D] cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-[#191919]/20 font-mono-tech text-xs text-[#191919] flex items-center justify-between">
            <span>FEEL: {springForceG >= 65 ? 'HEAVY TACTILE' : 'LIGHT DETENT'}</span>
            <span>COUNT: {pressCount} ACTUATIONS</span>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(nicopark)/nicopark/components/ProcessSection.tsx">
<![CDATA["use client";

import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { PROCESS_STEPS, ProcessStep } from '../data/portfolioData';

export const ProcessSection: React.FC = () => {
  const [activeStepId, setActiveStepId] = useState<ProcessStep['id']>('notice');
  const activeStep = PROCESS_STEPS.find((s) => s.id === activeStepId) || PROCESS_STEPS[0];

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="scroll-mt-20 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24 border-t-2 border-[#191919]"
    >
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <p className="font-condensed font-bold text-[15px] sm:text-[17px] tracking-[0.05em] uppercase text-[#515151] mb-2">
            CHAPTER 05 · STUDIO METHODOLOGY (01 — 04)
          </p>
          <h2
            id="process-heading"
            className="font-display uppercase text-[48px] sm:text-[66px] lg:text-[78px] leading-[0.9] text-[#191919]"
          >
            FROM WEIRD IDEA TO <span className="text-[#3049F0]">USEFUL THING.</span>
          </h2>
        </div>

        <p className="text-base sm:text-lg text-[#515151] max-w-md font-medium">
          A four-stage industrial and digital loop where physical ergonomics and browser-native code are prototyped side by side.
        </p>
      </div>

      {/* Zig-Zag Modular System Diagram with Connected SVG Vectors */}
      <div className="relative mb-10">
        {/* Desktop SVG Connector Rail */}
        <svg
          viewBox="0 0 1200 160"
          className="hidden lg:block w-full h-16 mb-2 overflow-visible"
          aria-hidden="true"
        >
          <path
            d="M 150 80 L 450 40 L 750 110 L 1050 60"
            fill="none"
            stroke="#191919"
            strokeWidth="2.5"
            strokeDasharray="8 6"
          />
          {PROCESS_STEPS.map((step, i) => {
            const cx = 150 + i * 300;
            const cy = i === 0 ? 80 : i === 1 ? 40 : i === 2 ? 110 : 60;
            const isSelected = step.id === activeStepId;
            return (
              <g key={step.id}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? 16 : 10}
                  fill={isSelected ? '#3049F0' : step.color}
                  stroke="#191919"
                  strokeWidth="2.5"
                />
                <text
                  x={cx}
                  y={cy - 24}
                  textAnchor="middle"
                  className="font-mono-tech text-[11px] font-bold fill-[#191919]"
                >
                  PHASE {step.index} · {step.phase}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Editorial Zig-Zag Step Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROCESS_STEPS.map((step, idx) => {
            const isSelected = step.id === activeStepId;
            const zigZagOffset = idx % 2 === 1 ? 'lg:translate-y-5' : 'lg:translate-y-0';
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStepId(step.id)}
                aria-pressed={isSelected}
                style={{
                  backgroundColor: isSelected ? step.color : '#FFFFFF'
                }}
                className={`text-left border-2 border-[#191919] rounded-[24px] p-6 flex flex-col justify-between transition-all duration-200 cursor-pointer ${zigZagOffset} ${
                  isSelected ? 'ring-3 ring-[#3049F0] -translate-y-1' : 'hover:bg-[#F8F7F2]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`font-display text-[40px] leading-none ${
                        isSelected && step.id === 'refine' ? 'text-white' : 'text-[#191919]'
                      }`}
                    >
                      {step.index}
                    </span>
                    <span
                      className={`font-condensed font-bold text-sm uppercase tracking-wider px-2.5 py-0.5 rounded border border-[#191919] ${
                        isSelected ? 'bg-[#191919] text-white' : 'bg-[#F8F7F2] text-[#191919]'
                      }`}
                    >
                      {step.phase}
                    </span>
                  </div>

                  <h3
                    className={`font-condensed font-extrabold text-[24px] uppercase leading-tight mb-2 ${
                      isSelected && step.id === 'refine' ? 'text-white' : 'text-[#191919]'
                    }`}
                  >
                    {step.title}
                  </h3>

                  <p
                    className={`text-xs leading-relaxed ${
                      isSelected && step.id === 'refine' ? 'text-white/90' : 'text-[#515151]'
                    }`}
                  >
                    {step.subtitle}
                  </p>
                </div>

                <div
                  className={`mt-5 pt-3 border-t border-[#191919]/20 flex items-center justify-between font-condensed font-bold text-xs uppercase ${
                    isSelected && step.id === 'refine' ? 'text-[#F7E36B]' : 'text-[#3049F0]'
                  }`}
                >
                  <span>{isSelected ? 'INSPECTING STAGE' : 'INSPECT STAGE'}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Expanded Phase Detail & Sketch Workbench */}
      <div className="mt-10 lg:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch bg-white border-2 border-[#191919] rounded-[24px] p-6 sm:p-8">
        {/* Left 6 Cols: Orthographic Sketch & CAD Annotation */}
        <div className="lg:col-span-6 bg-[#F8F7F2] border-2 border-[#191919] rounded-[20px] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between font-mono-tech text-xs font-bold text-[#191919] mb-3">
            <span>{activeStep.annotation}</span>
            <span className="text-[#3049F0]">STAGE {activeStep.index} / 04</span>
          </div>

          <div className="my-auto flex items-center justify-center py-2">
            <img
              src={activeStep.sketchAsset}
              alt={`${activeStep.phase} — ${activeStep.title} schematic drawing`}
              width={600}
              height={420}
              referrerPolicy="no-referrer"
              className="max-h-[260px] w-auto object-contain rounded-xl"
            />
          </div>

          <div className="pt-3 border-t border-[#191919]/15 flex items-center justify-between text-xs font-mono-tech text-[#515151]">
            <span>SCALE: 1:1 MILLIMETER GRID</span>
            <span>NICO PARK STUDIO ARCHIVE</span>
          </div>
        </div>

        {/* Right 6 Cols: Phase Narrative & Artifacts */}
        <div className="lg:col-span-6 flex flex-col justify-between py-2">
          <div>
            <div className="inline-flex items-center gap-2 font-condensed font-bold text-sm uppercase tracking-wider text-[#3049F0] mb-2">
              <span>PHASE {activeStep.index}</span>
              <span>·</span>
              <span>{activeStep.phase}</span>
            </div>

            <h3 className="font-display uppercase text-[36px] sm:text-[46px] leading-[0.95] text-[#191919] mb-4">
              {activeStep.title}
            </h3>

            <p className="text-base sm:text-[17px] leading-[1.65] text-[#191919] mb-6">
              {activeStep.description}
            </p>

            <div className="bg-[#F8F7F2] border-2 border-[#191919] rounded-2xl p-5">
              <div className="font-condensed font-bold text-sm uppercase tracking-wider text-[#191919] mb-3">
                PHYSICAL &amp; DIGITAL ARTIFACTS PRODUCED IN THIS PHASE
              </div>
              <ul className="space-y-2 text-sm font-medium text-[#191919]">
                {activeStep.artifacts.map((art) => (
                  <li key={art} className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#F7E36B] border border-[#191919] flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[#191919]" />
                    </span>
                    <span>{art}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Step Quick Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-6 mt-6 border-t border-[#191919]/15">
            <span className="font-mono-tech text-xs text-[#515151]">
              CLICK ANY PHASE BLOCK ABOVE OR STEP THROUGH:
            </span>
            <div className="flex items-center gap-2">
              {PROCESS_STEPS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveStepId(s.id)}
                  className={`px-3.5 py-1.5 rounded-full border-2 border-[#191919] font-condensed font-bold text-xs uppercase cursor-pointer ${
                    s.id === activeStepId
                      ? 'bg-[#191919] text-white'
                      : 'bg-white text-[#191919] hover:bg-[#F7E36B]'
                  }`}
                >
                  {s.index} {s.phase}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(nicopark)/nicopark/components/SelectedWorkSection.tsx">
<![CDATA["use client";

import React, { useEffect } from 'react';
import { ArrowUpRight, X, CheckCircle2, Layers, Sliders, Sparkles } from 'lucide-react';
import { CASE_STUDIES, CaseStudy } from '../data/portfolioData';

interface SelectedWorkSectionProps {
  activeProjectId: CaseStudy['id'];
  isCaseStudyModalOpen: boolean;
  onSelectProject: (projectId: CaseStudy['id'], openModal?: boolean) => void;
  onCloseModal: () => void;
  onJumpToSection: (sectionId: string) => void;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({
  activeProjectId,
  isCaseStudyModalOpen,
  onSelectProject,
  onCloseModal,
  onJumpToSection
}) => {
  const activeStudy = CASE_STUDIES.find((c) => c.id === activeProjectId) || CASE_STUDIES[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCaseStudyModalOpen) {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCaseStudyModalOpen, onCloseModal]);

  return (
    <section
      id="work"
      aria-labelledby="selected-work-heading"
      className="scroll-mt-20 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-16 lg:py-24 border-t-2 border-[#191919]"
    >
      {/* Section Header + Editorial Numbered Project Switcher Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 lg:mb-12">
        <div>
          <p className="font-condensed font-bold text-[15px] sm:text-[17px] tracking-[0.05em] uppercase text-[#515151] mb-2">
            CHAPTER 02 · SELECTED CASE STUDIES (2025 — 2026)
          </p>
          <h2
            id="selected-work-heading"
            className="font-display uppercase text-[52px] sm:text-[68px] lg:text-[82px] leading-[0.9] text-[#191919] tracking-tight"
          >
            SELECTED <span className="text-[#3049F0]">WORK.</span>
          </h2>
        </div>

        {/* Interactive Project Selection Stage Tabs */}
        <div
          role="tablist"
          aria-label="Select featured case study"
          className="flex flex-wrap items-center gap-3"
        >
          {CASE_STUDIES.map((study) => {
            const isSelected = study.id === activeStudy.id;
            return (
              <button
                key={study.id}
                role="tab"
                id={`tab-${study.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${study.id}`}
                type="button"
                onClick={() => onSelectProject(study.id, false)}
                className={`group px-5 sm:px-6 py-3.5 rounded-full border-2 border-[#191919] font-condensed font-bold text-[16px] sm:text-[18px] tracking-[0.04em] uppercase whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#191919] text-[#F8F7F2] -translate-y-0.5'
                    : 'bg-white text-[#191919] hover:bg-[#F7E36B]'
                }`}
              >
                <span>{study.index} / </span>
                <span>{study.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Fluid Editorial Stage for Active Case Study */}
      <div
        id={`panel-${activeStudy.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeStudy.id}`}
        className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch"
      >
        {/* Left Column (7 Cols): Color-Blocked Visual Stage */}
        <div
          style={{ backgroundColor: activeStudy.panelColor }}
          className="lg:col-span-7 border-2 border-[#191919] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between min-h-[420px] sm:min-h-[520px] relative overflow-hidden transition-colors duration-500"
        >
          {/* Top Bar inside Stage */}
          <div className="flex flex-wrap items-center justify-between gap-2 z-10">
            <div
              className={`font-condensed font-bold text-[15px] tracking-[0.05em] uppercase ${
                activeStudy.id === 'forma' ? 'text-white' : 'text-[#191919]'
              }`}
            >
              {activeStudy.code} · {activeStudy.year}
            </div>
            <div
              className={`font-mono-tech text-xs font-medium ${
                activeStudy.id === 'forma' ? 'text-white/90' : 'text-[#191919]/80'
              }`}
            >
              {activeStudy.clientType}
            </div>
          </div>

          {/* Center Artwork Showcase */}
          <div className="my-6 flex items-center justify-center relative">
            <img
              src={activeStudy.heroImage}
              alt={`${activeStudy.title} — ${activeStudy.category} showcase`}
              width={800}
              height={600}
              referrerPolicy="no-referrer"
              className="max-h-[340px] sm:max-h-[380px] w-auto object-contain rounded-2xl transition-transform duration-500 hover:scale-[1.02]"
            />
          </div>

          {/* Bottom Stage Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#191919]/20 z-10">
            <div
              className={`text-sm font-medium ${
                activeStudy.id === 'forma' ? 'text-white' : 'text-[#191919]'
              }`}
            >
              <span>Role: {activeStudy.role}</span>
              <span aria-hidden="true" className="mx-2">
                ·
              </span>
              <span>{activeStudy.duration}</span>
            </div>

            <div className="flex items-center gap-3">
              {activeStudy.id === 'loop' && (
                <button
                  type="button"
                  onClick={() => onJumpToSection('anatomy')}
                  className="px-4 py-2 rounded-full bg-white text-[#191919] border-2 border-[#191919] font-condensed font-bold text-sm uppercase tracking-wider hover:bg-[#F7E36B] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  EXPLODE HARDWARE ↓
                </button>
              )}
              <button
                type="button"
                onClick={() => onSelectProject(activeStudy.id, true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F7E36B] text-[#191919] border-2 border-[#191919] font-condensed font-bold text-sm sm:text-base uppercase tracking-wider hover:bg-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>READ CASE STUDY</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (5 Cols): Editorial Brief, Challenge, Outcome & Deliverables */}
        <div className="lg:col-span-5 bg-white border-2 border-[#191919] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-[#191919]/15">
              <span className="font-display text-[44px] sm:text-[54px] leading-none text-[#3049F0]">
                {activeStudy.index}
              </span>
              <span className="font-condensed font-bold text-sm uppercase tracking-wider text-[#515151]">
                {activeStudy.category}
              </span>
            </div>

            <h3 className="font-display uppercase text-[38px] sm:text-[46px] leading-[0.95] text-[#191919] mb-4">
              {activeStudy.title}
            </h3>

            <p className="text-[17px] leading-[1.55] font-medium text-[#191919] mb-6">
              {activeStudy.summary}
            </p>

            <div className="space-y-4 text-[15px] leading-[1.6] text-[#515151] mb-6">
              <div>
                <h4 className="font-condensed font-bold text-sm uppercase tracking-wider text-[#191919] mb-1">
                  01. THE CHALLENGE
                </h4>
                <p>{activeStudy.challenge}</p>
              </div>
              <div>
                <h4 className="font-condensed font-bold text-sm uppercase tracking-wider text-[#191919] mb-1">
                  02. DESIGN OUTCOME
                </h4>
                <p>{activeStudy.outcome}</p>
              </div>
            </div>

            {/* Deliverables List */}
            <div className="pt-4 border-t border-[#191919]/15 mb-6">
              <h4 className="font-condensed font-bold text-sm uppercase tracking-wider text-[#191919] mb-2.5">
                KEY DELIVERABLES
              </h4>
              <ul className="space-y-1.5 text-sm text-[#191919]">
                {activeStudy.deliverables.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#3049F0] shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onSelectProject(activeStudy.id, true)}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#FF735D] text-white border-2 border-[#191919] font-condensed font-bold text-[18px] uppercase tracking-wider hover:bg-[#ff5f46] transition-colors cursor-pointer"
          >
            <span>OPEN FULL {activeStudy.title} CASE STUDY</span>
            <ArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Full-Width Proof Metrics Row Below Split */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
        {activeStudy.metrics.map((metric, idx) => (
          <div
            key={metric.label}
            className={`border-2 border-[#191919] rounded-[20px] p-5 sm:p-6 ${
              idx === 0 ? 'bg-[#F7E36B]' : idx === 1 ? 'bg-[#F8F7F2]' : 'bg-white'
            }`}
          >
            <div className="font-condensed font-bold text-xs uppercase tracking-wider text-[#515151] mb-1">
              0{idx + 1} · MEASURED IMPACT ({activeStudy.title})
            </div>
            <div className="font-display text-[42px] sm:text-[50px] leading-none text-[#191919] font-mono-tech my-1.5">
              {metric.value}
            </div>
            <div className="font-bold text-[15px] text-[#191919] mb-1">{metric.label}</div>
            <p className="text-xs text-[#515151] leading-relaxed">{metric.context}</p>
          </div>
        ))}
      </div>

      {/* Accessible Full Case Study Modal / Drawer */}
      {isCaseStudyModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-modal-title"
          className="fixed inset-0 z-50 bg-[#191919]/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={onCloseModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#F8F7F2] border-2 border-[#191919] rounded-[28px] max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl"
          >
            {/* Modal Top Header */}
            <div className="flex items-start justify-between gap-4 pb-6 border-b-2 border-[#191919]">
              <div>
                <p className="font-condensed font-bold text-sm uppercase tracking-wider text-[#3049F0]">
                  {activeStudy.code} · FULL CASE STUDY DOSSIER
                </p>
                <h3
                  id="case-study-modal-title"
                  className="font-display uppercase text-[44px] sm:text-[64px] leading-[0.92] text-[#191919] mt-1"
                >
                  {activeStudy.title} — {activeStudy.year}
                </h3>
              </div>

              <button
                type="button"
                onClick={onCloseModal}
                aria-label="Close case study modal"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border-2 border-[#191919] font-condensed font-bold text-sm uppercase hover:bg-[#FF735D] hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <span>CLOSE</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Visual Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-7">
              <div
                style={{ backgroundColor: activeStudy.panelColor }}
                className="border-2 border-[#191919] rounded-[20px] p-5 flex items-center justify-center min-h-[260px]"
              >
                <img
                  src={activeStudy.heroImage}
                  alt={`${activeStudy.title} primary design artifact`}
                  className="max-h-[240px] w-auto object-contain rounded-xl"
                />
              </div>
              <div className="bg-white border-2 border-[#191919] rounded-[20px] p-5 flex items-center justify-center min-h-[260px]">
                <img
                  src={activeStudy.secondaryImage}
                  alt={`${activeStudy.title} detail and engineering schematic`}
                  className="max-h-[240px] w-auto object-contain rounded-xl"
                />
              </div>
            </div>

            {/* Narrative Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-7">
              <div className="bg-white border-2 border-[#191919] rounded-[18px] p-5">
                <div className="inline-flex items-center gap-2 font-condensed font-bold text-sm uppercase text-[#3049F0] mb-2">
                  <Layers className="w-4 h-4" />
                  <span>01 / PROBLEM & BRIEF</span>
                </div>
                <p className="text-sm leading-relaxed text-[#191919]">{activeStudy.challenge}</p>
              </div>

              <div className="bg-white border-2 border-[#191919] rounded-[18px] p-5">
                <div className="inline-flex items-center gap-2 font-condensed font-bold text-sm uppercase text-[#FF735D] mb-2">
                  <Sliders className="w-4 h-4" />
                  <span>02 / STUDIO PROCESS</span>
                </div>
                <p className="text-sm leading-relaxed text-[#191919]">{activeStudy.process}</p>
              </div>

              <div className="bg-white border-2 border-[#191919] rounded-[18px] p-5">
                <div className="inline-flex items-center gap-2 font-condensed font-bold text-sm uppercase text-[#191919] mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>03 / ARCHITECTURE</span>
                </div>
                <p className="text-sm leading-relaxed text-[#191919]">{activeStudy.solution}</p>
              </div>
            </div>

            {/* Technical Specifications Table */}
            <div className="bg-[#F7E36B] border-2 border-[#191919] rounded-[20px] p-6 mb-7">
              <h4 className="font-condensed font-bold text-base uppercase tracking-wider text-[#191919] mb-4">
                TECHNICAL & MATERIAL SPECIFICATIONS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeStudy.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="bg-[#F8F7F2] border border-[#191919] rounded-xl p-3.5"
                  >
                    <div className="font-mono-tech text-xs text-[#515151] uppercase">
                      {spec.label}
                    </div>
                    <div className="font-semibold text-sm text-[#191919] mt-0.5">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t-2 border-[#191919]">
              <div className="flex items-center gap-2">
                {CASE_STUDIES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => onSelectProject(s.id, true)}
                    className={`px-4 py-2 rounded-full border-2 border-[#191919] font-condensed font-bold text-xs uppercase cursor-pointer ${
                      s.id === activeStudy.id
                        ? 'bg-[#3049F0] text-white'
                        : 'bg-white text-[#191919] hover:bg-[#F7E36B]'
                    }`}
                  >
                    {s.index} / {s.title}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={onCloseModal}
                className="px-6 py-2.5 rounded-full bg-[#191919] text-white font-condensed font-bold text-sm uppercase tracking-wider hover:bg-[#3049F0] transition-colors cursor-pointer"
              >
                DONE READING
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(nicopark)/nicopark/data/portfolioData.ts">
<![CDATA[export interface CaseStudyMetric {
  label: string;
  value: string;
  context: string;
}

export interface CaseStudy {
  id: 'loop' | 'forma' | 'kindred';
  index: string;
  code: string;
  title: string;
  category: string;
  year: string;
  clientType: string;
  role: string;
  duration: string;
  panelColor: string;
  accentColor: string;
  heroImage: string;
  secondaryImage: string;
  summary: string;
  challenge: string;
  process: string;
  solution: string;
  outcome: string;
  deliverables: string[];
  metrics: CaseStudyMetric[];
  specs: { label: string; value: string }[];
}

export interface AnatomyPart {
  id: 'cover' | 'dial' | 'pcb' | 'buttons' | 'usb';
  code: string;
  name: string;
  shortLabel: string;
  material: string;
  finish: string;
  tolerance: string;
  description: string;
  layerImage: string;
  /** Anchor % on device stage (0-100) */
  anchorX: number;
  anchorY: number;
  /** Label % on device stage (0-100) */
  labelX: number;
  labelY: number;
  /** Exploded offset in px / deg */
  explodeDx: number;
  explodeDy: number;
  explodeRotate: number;
  explodeScale: number;
}

export interface LoopTrack {
  id: string;
  number: string;
  title: string;
  artist: string;
  bpm: number;
  durationSec: number;
  keySignature: string;
  waveform: number[];
}

export interface ProcessStep {
  id: 'notice' | 'sketch' | 'prototype' | 'refine';
  index: string;
  phase: string;
  title: string;
  subtitle: string;
  color: string;
  sketchAsset: string;
  annotation: string;
  description: string;
  artifacts: string[];
  gridCoord: { col: number; row: number };
}

export interface EditorialNote {
  id: string;
  number: string;
  date: string;
  readTime: string;
  category: string;
  title: string;
  excerpt: string;
  accentColor: string;
  illustration: string;
  takeaway: string;
  paragraphs: string[];
}

export interface SwatchItem {
  id: string;
  name: string;
  hex: string;
  pantoneCode: string;
  surfaceRole: string;
  textColor: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  projectScope: string;
  message: string;
}

export interface ContactValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormInput, string>>;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'loop',
    index: '01',
    code: '01 / LOOP — INDUSTRIAL DESIGN',
    title: 'LOOP',
    category: 'Personal Audio · Industrial & Apparatus UI',
    year: '2026',
    clientType: 'Concept Hardware & Companion OS',
    role: 'Lead Industrial & Interaction Designer',
    duration: '14 Weeks · Concept to DFM Prototype',
    panelColor: '#D5C8FC',
    accentColor: '#FF735D',
    heroImage: '/templates/nicopark/loop-hero.webp',
    secondaryImage: '/templates/nicopark/loop-detail-01.webp',
    summary:
      'A pocketable, screen-minimal personal audio player that brings physical inertia, optical acrylic depth, and mechanical detents back to everyday listening.',
    challenge:
      'Modern streaming apps bury music underneath infinite notification feeds and flat glass rectangles. Listeners wanted a dedicated physical object for intentional album sessions and stem looping without sacrificing wireless convenience or tactile joy.',
    process:
      'Through 28 CNC-milled foam and resin enclosure iterations, we paired a single-piece compression-molded coral polycarbonate shell with an oversized optical-grade PMMA frosted dial cover that exposes the dark gold-traced PCB and optical hall-effect ring underneath.',
    solution:
      'LOOP combines a 36-detent magnetic rotary wheel on the top shoulder with a capacitive-mechanical front acrylic platter and a lightweight yellow E-Ink / OLED companion apparatus UI for library curation and loop point slicing.',
    outcome:
      'Reduced eyes-on-screen time during active listening sessions by 84% in 40-person studio usability testing while achieving full IP54 splash resistance and 3-screw modular repairability.',
    deliverables: [
      'Industrial Design & CAD Enclosure Assembly',
      'Optical Acrylic Platter & Hall-Effect Detent Mechanism',
      'LOOP Apparatus Companion UI System',
      'Exploded Sub-Assembly DFM Documentation'
    ],
    metrics: [
      { label: 'Eyes-Free Operation', value: '84%', context: 'Reduction in screen glances per 45-min session across 40 studio testers' },
      { label: 'Modular Disassembly', value: '90 sec', context: 'Full battery & USB-C sub-assembly swap using a single T6 driver' },
      { label: 'Rotary Precision', value: '36 steps', context: 'Neodymium hall-effect detents per 360° revolution with zero mechanical wear' }
    ],
    specs: [
      { label: 'Dimensions', value: '94 × 94 × 31 mm (168g)' },
      { label: 'Shell Material', value: '30% Glass-Filled Recycled Polycarbonate (#FF735D Matte)' },
      { label: 'Front Platter', value: '3.2mm Optical Cast PMMA with Laser-Etched Vernier Scale' },
      { label: 'I/O Sub-Assembly', value: 'Modular USB-C PD + Balanced 3.5mm + Line-In Record' }
    ]
  },
  {
    id: 'forma',
    index: '02',
    code: '02 / FORMA — DIGITAL PRODUCT',
    title: 'FORMA',
    category: 'Spatial Digital Workspace & Tactile Controller',
    year: '2025',
    clientType: 'Creative Tools Platform',
    role: 'Principal Product & Systems Designer',
    duration: '18 Weeks · Design System & Desktop Client',
    panelColor: '#3049F0',
    accentColor: '#F7E36B',
    heroImage: '/templates/nicopark/forma-ui.svg',
    secondaryImage: '/templates/nicopark/process-sketch-03.svg',
    summary:
      'A modular digital workbench for hardware-software teams that replaces nested folder trees with physical-feeling spatial trays, timeline strips, and a desk puck.',
    challenge:
      'Industrial designers and firmware engineers constantly context-switch between CAD viewers, issue trackers, and oscilloscope captures. Traditional SaaS boards flatten visual artifacts into identical grey cards.',
    process:
      'We observed 16 hardware engineering studios and mapped how physical project trays are arranged on workbenches. We translated that spatial logic into a snap-grid canvas with 1:1 physical scale rulers and an optional rotary desk puck.',
    solution:
      'FORMA organizes active sprints into magnetic color-coded trays—butter yellow for live firmware builds, lavender for CAD revisions, and coral for blocker tolerances—with instant keyboard and rotary scrubbing through build history.',
    outcome:
      'Adopted by 14 independent design studios during beta, cutting cross-discipline design review prep time from 3.5 hours to 35 minutes per weekly critique.',
    deliverables: [
      'Spatial Canvas Architecture & Snap Physics Engine',
      'Multi-Modal Design Token System (Cobalt / Ivory / Butter)',
      'CAD-to-Timeline Annotation Bridge',
      'Hardware Rotary Puck HID Interaction Spec'
    ],
    metrics: [
      { label: 'Review Prep Time', value: '-83%', context: 'Weekly critique setup dropped from 3.5 hrs to 35 mins across 14 beta studios' },
      { label: 'Canvas Frame Rate', value: '120 fps', context: 'Zero-layout-thrash compositor transforms with 400+ live inspection nodes' },
      { label: 'Keyboard & Puck Speed', value: '2.4×', context: 'Faster CAD tolerance comparison versus tabbed browser workflows' }
    ],
    specs: [
      { label: 'Platform', value: 'WebGL / React Spatial Canvas + WebHID Rotary Support' },
      { label: 'Grid System', value: '8pt Modular Snap Matrix with True-Millimeter Zoom Calibration' },
      { label: 'Color Architecture', value: 'High-Contrast Daylight Studio Palette (WCAG AAA Compliant)' },
      { label: 'Export Formats', value: 'STEP Metadata, SVG Schematic Package, JSON Design Tokens' }
    ]
  },
  {
    id: 'kindred',
    index: '03',
    code: '03 / KINDRED — BRAND EXPERIENCE',
    title: 'KINDRED',
    category: 'Community Toolkit · Service & Brand System',
    year: '2025',
    clientType: 'Public Repair & Maker Collectives',
    role: 'Brand, Packaging & Service Designer',
    duration: '10 Weeks · Identity & Physical Toolkit',
    panelColor: '#FF735D',
    accentColor: '#D5C8FC',
    heroImage: '/templates/nicopark/kindred-brand.svg',
    secondaryImage: '/templates/nicopark/process-sketch-02.svg',
    summary:
      'An open-source physical and digital identity toolkit for neighborhood repair cafés, tool libraries, and weekend hardware workshops.',
    challenge:
      'Community repair clinics often feel intimidating or makeshift to newcomers. Organizers needed a low-cost, modular signage, triage card, and badge system that felt welcoming, durable, and unmistakably optimistic.',
    process:
      'Working alongside three community repair collectives, we designed a two-color risograph and letterpress print system anchored by an 8-spoke modular asterisk symbol where each spoke represents a core repair skill.',
    solution:
      'The KINDRED kit ships flat in a recycled board portfolio containing die-cut triage tags, magnetic skill badges, exposed-spine repair passports, and a browser-based stencil generator for local chapters.',
    outcome:
      'Deployed across 22 neighborhood tool libraries in 6 countries, increasing first-time visitor sign-ups by 62% during weekend repair sessions.',
    deliverables: [
      '8-Arm Parametric Asterisk Identity System',
      'Flat-Pack Risograph Field Guide & Repair Passport',
      'Tactile Enamel & Magnetic Skill Token System',
      'Browser-Based Chapter Poster & Label Generator'
    ],
    metrics: [
      { label: 'Active Chapters', value: '22 hubs', context: 'Neighborhood tool libraries using the physical kit across 6 countries' },
      { label: 'First-Time Visitors', value: '+62%', context: 'Increase in walk-in repair session participation over 6 months' },
      { label: 'Unit Print Cost', value: '$1.40', context: 'Per complete newcomer passport & triage tag set using 2-ink risograph' }
    ],
    specs: [
      { label: 'Paper Stock', value: '350gsm Uncoated Cotton Rag & Recycled Millboard' },
      { label: 'Ink System', value: 'Soy-Based Risograph Fluorescent Coral, Cobalt & Rich Black' },
      { label: 'Binding', value: 'Lay-Flat Exposed Smyth-Sewn Linen Thread Spine' },
      { label: 'License', value: 'Creative Commons BY-SA 4.0 Open Hardware & Identity Spec' }
    ]
  }
];

export const ANATOMY_PARTS: AnatomyPart[] = [
  {
    id: 'cover',
    code: '01 / SUB-ASSY A',
    name: 'Frosted Optical Acrylic Platter',
    shortLabel: 'EXPLODED VIEW',
    material: '3.2mm Cast PMMA (Optical Grade)',
    finish: 'Double-Sided Diamond Polish + Micro-Etched Vernier Ring',
    tolerance: '±0.03 mm CNC Perimeter Chamfer',
    description:
      'The signature circular front window floats 4.5mm proud of the coral enclosure, acting as both a protective lens over the internal PCB and a capacitive scrub platter with laser-etched 1° radial ticks.',
    layerImage: '/templates/nicopark/loop-cover.png',
    anchorX: 33,
    anchorY: 36,
    labelX: 82,
    labelY: 16,
    explodeDx: -64,
    explodeDy: -38,
    explodeRotate: -6,
    explodeScale: 1.07
  },
  {
    id: 'dial',
    code: '02 / SUB-ASSY B',
    name: 'CNC Knurled Tactile Rotary Dial',
    shortLabel: 'TACTILE DIAL',
    material: '6061-T6 Bead-Blasted Aluminum (Lilac Anodized)',
    finish: '72-Tooth Straight Diamond Knurl',
    tolerance: '±0.015 mm Concentric Shaft Runout',
    description:
      'Mounted on the upper-right shoulder at an ergonomic 28° thumb angle, this weighted aluminum encoder pairs with a contactless neodymium magnet array to deliver 36 crisp detents per revolution.',
    layerImage: '/templates/nicopark/loop-dial.png',
    anchorX: 69,
    anchorY: 22,
    labelX: 84,
    labelY: 24,
    explodeDx: 58,
    explodeDy: -48,
    explodeRotate: 12,
    explodeScale: 1.12
  },
  {
    id: 'pcb',
    code: '03 / SUB-ASSY C',
    name: 'Exposed Matte-Black DSP & Coil Array',
    shortLabel: 'INTERNAL DSP',
    material: '4-Layer FR4 Matte Black Solder Mask + ENIG Gold',
    finish: 'Conformal Coated Exposed Component Architecture',
    tolerance: '0.10 mm Pick-and-Place Alignment',
    description:
      'Rather than hiding electronics behind opaque plastic, LOOP treats the circuit layout as graphic typography—aligning the DAC, hall-effect sensors, and copper inductors along concentric arcs.',
    layerImage: '/templates/nicopark/loop-shell.png',
    anchorX: 46,
    anchorY: 44,
    labelX: 16,
    labelY: 79,
    explodeDx: 0,
    explodeDy: 0,
    explodeRotate: 0,
    explodeScale: 1.0
  },
  {
    id: 'buttons',
    code: '04 / SUB-ASSY D',
    name: 'Modular Side Sub-Assembly & Transport Pills',
    shortLabel: 'SUB-ASSEMBLY',
    material: 'Compression-Molded LSR Silicone + Polycarbonate',
    finish: 'Soft-Touch UV Matte Coating (65 Shore A)',
    tolerance: '±0.05 mm Gasket Seal Compression',
    description:
      'A removable lilac oval side plate houses the instant-record trigger, loop-lock toggle, and secondary lanyard anchor, sealed against dust and rain with an integrated perimeter O-ring.',
    layerImage: '/templates/nicopark/loop-buttons.png',
    anchorX: 71,
    anchorY: 51,
    labelX: 84,
    labelY: 61,
    explodeDx: 56,
    explodeDy: 28,
    explodeRotate: 5,
    explodeScale: 1.06
  },
  {
    id: 'usb',
    code: '05 / SUB-ASSY E',
    name: 'Bottom USB-C PD & Balanced Audio I/O Bay',
    shortLabel: 'USB-C PORT',
    material: 'Stainless Steel 316L Port Collar + Lilac Carrier',
    finish: 'PVD Matte Graphite Inner Sleeve',
    tolerance: '10,000+ Insertion Cycle Rated',
    description:
      'Because charging ports are the #1 failure point in portable electronics, LOOP isolates the USB-C and dual 3.5mm TRS jacks on a 2-screw replaceable daughterboard at the base.',
    layerImage: '/templates/nicopark/loop-buttons.png',
    anchorX: 45,
    anchorY: 74,
    labelX: 80,
    labelY: 70,
    explodeDx: -28,
    explodeDy: 54,
    explodeRotate: -4,
    explodeScale: 1.05
  }
];

export const LOOP_TRACKS: LoopTrack[] = [
  {
    id: 'trk-01',
    number: '01',
    title: 'SOLAR DETENT (STEM A)',
    artist: 'NICO PARK STUDIO LAB',
    bpm: 114,
    durationSec: 168,
    keySignature: 'F Maj · Tape Loop',
    waveform: [28, 45, 72, 38, 88, 95, 62, 40, 78, 92, 54, 34, 68, 84, 50, 30, 74, 90, 64, 42]
  },
  {
    id: 'trk-02',
    number: '02',
    title: 'ANODIZED MORNING',
    artist: 'KINETIC FOUNDRY',
    bpm: 98,
    durationSec: 204,
    keySignature: 'C Min · Modular Synth',
    waveform: [42, 60, 52, 84, 70, 48, 94, 80, 36, 58, 76, 88, 44, 62, 90, 72, 38, 54, 68, 46]
  },
  {
    id: 'trk-03',
    number: '03',
    title: 'POLYCARBONATE RAIN',
    artist: 'ATELIER 04',
    bpm: 126,
    durationSec: 152,
    keySignature: 'A Min · Field Recording',
    waveform: [64, 82, 90, 46, 58, 96, 74, 52, 86, 68, 40, 78, 92, 84, 56, 48, 80, 62, 50, 36]
  },
  {
    id: 'trk-04',
    number: '04',
    title: 'VERNIER PHASE SHIFT',
    artist: 'DIETER & THE DIALS',
    bpm: 108,
    durationSec: 185,
    keySignature: 'D Maj · Percussion Study',
    waveform: [32, 76, 54, 92, 66, 44, 82, 96, 58, 70, 48, 88, 74, 40, 64, 86, 52, 78, 60, 38]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: 'notice',
    index: '01',
    phase: 'NOTICE',
    title: 'Observe Real Friction in the Wild',
    subtitle: 'Field ethnography, broken hardware teardown, and tactile habit mapping',
    color: '#D5C8FC',
    sketchAsset: '/templates/nicopark/process-sketch-01.svg',
    annotation: 'FIG 1.1 — THUMB ARC ERGONOMIC SWEEP (R = 48MM)',
    description:
      'Every project begins by watching where people fumble, squint, or improvise workarounds. Before drawing a single curve on LOOP, we cataloged 40 worn-out portable cassette players, field recorders, and pocket cameras to see where human fingers naturally rest.',
    artifacts: [
      'Thumb-reach heatmaps on 1:1 clay bucks',
      'Failure analysis of worn ports & switches',
      'Single-sentence problem framing card'
    ],
    gridCoord: { col: 1, row: 1 }
  },
  {
    id: 'sketch',
    index: '02',
    phase: 'SKETCH',
    title: 'Orthographic Geometry & Bold Proportions',
    subtitle: 'Rapid marker elevations, strict primary silhouettes, and interface wireframes',
    color: '#F7E36B',
    sketchAsset: '/templates/nicopark/process-sketch-02.svg',
    annotation: 'FIG 2.4 — CONCENTRIC PLATTER RATIO (1 : 1.618)',
    description:
      'If a product silhouette is not recognizable at 24 pixels wide, it is too complicated. We pair orthographic marker drawings with low-latency HTML/SVG schematics on day three so industrial form and screen behavior evolve as one organism.',
    artifacts: [
      '1:1 millimeter-grid orthographic elevations',
      'Interactive SVG state-machine schematics',
      'Color-blocked CMF (Color, Material, Finish) boards'
    ],
    gridCoord: { col: 2, row: 1 }
  },
  {
    id: 'prototype',
    index: '03',
    phase: 'PROTOTYPE',
    title: 'Build Things You Can Drop on a Desk',
    subtitle: 'SLA resin enclosures, magnetic detent rigs, and live browser-to-hardware bridges',
    color: '#FF735D',
    sketchAsset: '/templates/nicopark/process-sketch-03.svg',
    annotation: 'FIG 3.2 — HALL-EFFECT TORQUE CURVE (36 DETENTS)',
    description:
      'Static slides lie about weight, friction, and latency. We print threaded resin shells, wire rotary encoders into live WebHID React sandboxes, and tune spring constants and switch travel in people’s hands within the first three weeks.',
    artifacts: [
      'Weighted SLA resin & CNC aluminum test rigs',
      'WebHID hardware-in-the-loop UI prototypes',
      'Acoustic & tactile switch force-displacement curves'
    ],
    gridCoord: { col: 3, row: 1 }
  },
  {
    id: 'refine',
    index: '04',
    phase: 'REFINE',
    title: 'Sweat the Seam Lines, Parting Lines & 60fps Curves',
    subtitle: 'DFM tolerance stacks, accessible contrast tuning, and repairable sub-assemblies',
    color: '#3049F0',
    sketchAsset: '/templates/nicopark/loop-detail-02.webp',
    annotation: 'FIG 4.0 — PRODUCTION DFM TOLERANCE (±0.03MM)',
    description:
      'Great design feels inevitable because every parting line, screw boss, focus ring, and spring curve was ruthlessly edited. We partner directly with mechanical engineers and frontend teams until the shipping artifact matches the studio prototype.',
    artifacts: [
      'Production STEP files & mold-flow parting specs',
      'Zero-layout-shift CSS/SVG motion specifications',
      'Modular repair & disassembly service guides'
    ],
    gridCoord: { col: 4, row: 1 }
  }
];

export const EDITORIAL_NOTES: EditorialNote[] = [
  {
    id: 'note-01',
    number: 'NOTE 01',
    date: 'OCTOBER 2026',
    readTime: '4 MIN READ',
    category: 'INDUSTRIAL CRAFT',
    title: 'Why Buttons Should Push Back: A Defense of Mechanical Detents',
    excerpt:
      'Capacitive glass taught us that every interface can morph into anything—and as a result, everything feels like nothing. Here is how we engineered the 36-step magnetic rotary feel on LOOP.',
    accentColor: '#FF735D',
    illustration: '/templates/nicopark/loop-detail-01.webp',
    takeaway: 'Tactile feedback is not nostalgia; it is cognitive offloading that lets your eyes stay in the real world.',
    paragraphs: [
      'When you reach into your coat pocket to skip a track or lower the volume, a flat glass rectangle forces you to pull the device out, wake the screen, parse visual hierarchy, and tap a 44-pixel target. That is four seconds of broken attention for a one-bit decision.',
      'During the early prototypes of LOOP, we tested seven different rotary encoders—from standard phosphor-bronze mechanical wipers to smooth fluid-damped potentiometers. Traditional mechanical encoders felt crisp on day one but developed gritty play after 8,000 cycles.',
      'Our breakthrough came from pairing a CNC-machined lilac aluminum wheel with an alternating ring of 18 micro neodymium magnets opposing a stationary stator above a contactless hall-effect sensor. Because nothing physically scrapes, the 36-detent snap feels identical on cycle 100,000 as it does out of the box—with a warm, unmistakable mechanical thud.'
    ]
  },
  {
    id: 'note-02',
    number: 'NOTE 02',
    date: 'SEPTEMBER 2026',
    readTime: '3 MIN READ',
    category: 'COLOR & MATERIALS',
    title: 'Designing with Optimistic Color Fields in a Sea of Space Grey',
    excerpt:
      'Why consumer hardware and creative software retreated into anodized charcoal—and how high-chroma coral, cobalt, and butter yellow improve spatial memory.',
    accentColor: '#F7E36B',
    illustration: '/templates/nicopark/studio-workspace.svg',
    takeaway: 'Color is not decoration applied at the end of CAD; it is an architectural wayfinding system.',
    paragraphs: [
      'Walk through any electronics aisle or SaaS dashboard directory and you will see the same desaturated slate grey repeated ad infinitum. Designers often mistake low saturation for seriousness.',
      'In both physical hardware (like LOOP) and spatial software (like FORMA), high-contrast color blocking performs real ergonomic work. When a secondary sub-assembly is molded in soft lilac (#D5C8FC) against a warm coral shell (#FF735D), a user immediately understands which part rotates, which part presses, and which seam opens for repair.',
      'The secret to keeping bold color fields timeless rather than toy-like is strict surface discipline: ultra-matte textures (SPI-C3 mold polish), crisp 2-pixel structural outlines, and generous warm-paper negative space (#F8F7F2) that lets the eye rest.'
    ]
  },
  {
    id: 'note-03',
    number: 'NOTE 03',
    date: 'AUGUST 2026',
    readTime: '5 MIN READ',
    category: 'INTERACTION PHYSICS',
    title: 'Treating DOM Panels Like Machined Aluminum Trays',
    excerpt:
      'Web interfaces feel weightless when everything fades in with identical opacity curves. By giving UI modules mass, friction, and snap targets, software starts to feel tangible.',
    accentColor: '#D5C8FC',
    illustration: '/templates/nicopark/forma-ui.svg',
    takeaway: 'Good interface motion communicates spatial origin and mechanical constraint, never arbitrary bounce.',
    paragraphs: [
      'When every element on a webpage transitions from opacity 0 to 1 over 400 milliseconds, nothing has permanence. Your brain perceives a projection on smoke rather than an instrument you can hold.',
      'In our studio, we choreograph digital panels the same way we tolerance physical desk trays. A primary stage has high mass and low displacement; a secondary inspector tile slides laterally along a rail and settles with a slight 1.5-degree spring overshoot.',
      'Crucially, great interaction physics must respect user agency: animations respond instantaneously on hover (<180ms), reverse cleanly when you scroll back, and step aside completely when prefers-reduced-motion is enabled.'
    ]
  }
];

export const PLAYGROUND_SWATCHES: SwatchItem[] = [
  { id: 'sw-coral', name: 'Signal Coral', hex: '#FF735D', pantoneCode: 'PMS 17-1461', surfaceRole: 'Primary Enclosure', textColor: '#191919' },
  { id: 'sw-cobalt', name: 'Electric Cobalt', hex: '#3049F0', pantoneCode: 'PMS 18-3963', surfaceRole: 'Focal Action & Ink', textColor: '#FFFFFF' },
  { id: 'sw-butter', name: 'Apparatus Butter', hex: '#F7E36B', pantoneCode: 'PMS 12-0752', surfaceRole: 'UI Stage & Badges', textColor: '#191919' },
  { id: 'sw-lavender', name: 'Tactile Lilac', hex: '#D5C8FC', pantoneCode: 'PMS 14-3812', surfaceRole: 'Sub-Assembly Controls', textColor: '#191919' },
  { id: 'sw-canvas', name: 'Studio Paper', hex: '#F8F7F2', pantoneCode: 'PMS 11-0105', surfaceRole: 'Drafting Canvas', textColor: '#191919' },
  { id: 'sw-ink', name: 'Carbon Graphite', hex: '#191919', pantoneCode: 'PMS 19-4004', surfaceRole: 'PCB & Structural Line', textColor: '#F8F7F2' }
];

/** Pure helper functions for deterministic state & unit testing */

export function getAnatomyPartTransform(
  part: AnatomyPart,
  isExploded: boolean,
  explodeFactor = 1
): { x: number; y: number; rotate: number; scale: number } {
  if (!isExploded || explodeFactor <= 0) {
    return { x: 0, y: 0, rotate: 0, scale: 1 };
  }
  const clamped = Math.max(0, Math.min(1, explodeFactor));
  return {
    x: Math.round(part.explodeDx * clamped * 10) / 10,
    y: Math.round(part.explodeDy * clamped * 10) / 10,
    rotate: Math.round(part.explodeRotate * clamped * 10) / 10,
    scale: Math.round((1 + (part.explodeScale - 1) * clamped) * 1000) / 1000
  };
}

export function cycleAnatomyPart(currentId: AnatomyPart['id'], direction: 1 | -1 = 1): AnatomyPart {
  const idx = ANATOMY_PARTS.findIndex((p) => p.id === currentId);
  const safeIdx = idx === -1 ? 0 : idx;
  const nextIdx = (safeIdx + direction + ANATOMY_PARTS.length) % ANATOMY_PARTS.length;
  return ANATOMY_PARTS[nextIdx];
}

export function cycleLoopTrack(currentId: string, direction: 1 | -1 = 1): LoopTrack {
  const idx = LOOP_TRACKS.findIndex((t) => t.id === currentId);
  const safeIdx = idx === -1 ? 0 : idx;
  const nextIdx = (safeIdx + direction + LOOP_TRACKS.length) % LOOP_TRACKS.length;
  return LOOP_TRACKS[nextIdx];
}

export function formatTrackTime(seconds: number): string {
  const clamped = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function calculateAsteriskSpokes(
  armCount: number,
  rotationDeg: number,
  radius: number
): Array<{ x1: number; y1: number; x2: number; y2: number; angleDeg: number }> {
  const safeArms = Math.max(2, Math.min(16, Math.round(armCount)));
  const safeRadius = Math.max(10, Math.min(200, radius));
  const spokes: Array<{ x1: number; y1: number; x2: number; y2: number; angleDeg: number }> = [];
  for (let i = 0; i < safeArms; i++) {
    const angleDeg = rotationDeg + (i * 180) / safeArms;
    const rad = (angleDeg * Math.PI) / 180;
    const dx = Math.cos(rad) * safeRadius;
    const dy = Math.sin(rad) * safeRadius;
    spokes.push({
      x1: Math.round(-dx * 100) / 100,
      y1: Math.round(-dy * 100) / 100,
      x2: Math.round(dx * 100) / 100,
      y2: Math.round(dy * 100) / 100,
      angleDeg: Math.round(angleDeg * 10) / 10
    });
  }
  return spokes;
}

export function validateContactForm(input: ContactFormInput): ContactValidationResult {
  const errors: Partial<Record<keyof ContactFormInput, string>> = {};
  const trimmedName = input.name.trim();
  const trimmedEmail = input.email.trim();
  const trimmedScope = input.projectScope.trim();
  const trimmedMessage = input.message.trim();

  if (trimmedName.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    errors.email = 'Please provide a valid email address so Nico can reply.';
  }
  if (!trimmedScope) {
    errors.projectScope = 'Please select a project discipline.';
  }
  if (trimmedMessage.length < 12) {
    errors.message = 'Please share a brief note about your project (at least 12 characters).';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export function buildMailtoHref(input: ContactFormInput): string {
  const subject = encodeURIComponent(`[Portfolio Inquiry] ${input.projectScope} — from ${input.name.trim()}`);
  const body = encodeURIComponent(
    `Hi Nico,\n\n${input.message.trim()}\n\n—\nName: ${input.name.trim()}\nEmail: ${input.email.trim()}\nDiscipline: ${input.projectScope}`
  );
  return `mailto:nico@nicopark.design?subject=${subject}&body=${body}`;
}
]]>
    </file>
  </files>
</template>
