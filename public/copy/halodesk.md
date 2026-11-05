<template slug="halodesk" name="Halo Desk">
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
    <file path="src/app/(halodesk)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import "./halodesk/halodesk.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Halo Desk — Organize your work without losing your calm",
  description:
    "Halo Desk — A desktop productivity app for focused planning, clear priorities, and beautifully structured days.",
  openGraph: {
    title: "Halo Desk — Organize your work without losing your calm",
    description:
      "Halo Desk — A desktop productivity app for focused planning, clear priorities, and beautifully structured days.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F8F5EE",
};

export default function HaloDeskLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="bg-[#F8F5EE] text-[#29313E] antialiased selection:bg-[#DCD5F6] selection:text-[#29313E]">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(halodesk)/halodesk/assets.generated.ts">
<![CDATA[// Generated asset inventory for HALODESK
export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(halodesk)/halodesk/assets.tsx">
<![CDATA[import React from "react";
import { ASSETS } from "./assets.generated";

const BASE = "/templates/halodesk";

export function assetSrc(
  key: string,
  width: 800 | 1600,
  format: "webp" | "avif" = "webp"
): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = {
  assetKey: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function Picture({
  assetKey,
  alt,
  className,
  sizes = "(min-width: 900px) 50vw, 100vw",
  priority,
}: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div
        className={`hld-placeholder ${className ?? ""}`}
        role="img"
        aria-label={alt}
        data-asset={assetKey}
      >
        <span className="hld-mono">{assetKey}</span>
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey];
  const set = (f: "webp" | "avif") =>
    `${assetSrc(assetKey, 800, f)} 800w, ${assetSrc(assetKey, 1600, f)} 1600w`;
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <img
        src={webp800}
        srcSet={set("webp")}
        sizes={sizes}
        width={w}
        height={h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        data-asset={assetKey}
      />
    </picture>
  );
}
]]>
    </file>
    <file path="src/app/(halodesk)/halodesk/halodesk.css">
<![CDATA[@import "tailwindcss";

@theme {
  --color-halo-ivory: #F8F5EE;
  --color-halo-cloud: #FCFBF7;
  --color-halo-ink: #29313E;
  --color-halo-muted: #66717F;
  --color-halo-powder: #CFDFEF;
  --color-halo-lavender: #DCD5F6;
  --color-halo-peach: #F7D9CB;
  --color-halo-mint: #D0EFE2;
  --color-halo-butter: #FFF1AE;
  --color-halo-slate: #6C798F;

  --font-display: var(--font-dm-sans), 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: var(--font-dm-sans), 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono-tabular: var(--font-jetbrains-mono), 'JetBrains Mono', monospace;

  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.22, 1.15, 0.36, 1);
}

:root {
  --halo-ivory: #F8F5EE;
  --halo-cloud: #FCFBF7;
  --halo-ink: #29313E;
  --halo-muted: #66717F;
  --halo-powder: #CFDFEF;
  --halo-lavender: #DCD5F6;
  --halo-peach: #F7D9CB;
  --halo-mint: #D0EFE2;
  --halo-butter: #FFF1AE;
  --halo-slate-button: #6C798F;
  --halo-line: rgba(58, 68, 83, 0.13);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.22, 1.15, 0.36, 1);
}

@layer base {
  html {
    font-family: var(--font-dm-sans), 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: var(--halo-ivory);
    color: var(--halo-ink);
  }

  .font-mono-tabular {
    font-family: var(--font-jetbrains-mono), 'JetBrains Mono', monospace;
    font-variant-numeric: tabular-nums;
  }
}

/* Continuous atmospheric canvas — no hard section seams */
.halo-atmosphere {
  background-color: var(--halo-ivory);
  background-image:
    radial-gradient(ellipse 46% 36% at 24% 4.5%, rgba(190, 214, 244, 0.72) 0%, rgba(207, 223, 239, 0.25) 52%, transparent 80%),
    radial-gradient(ellipse 36% 28% at 68% 10%, rgba(215, 204, 250, 0.80) 0%, rgba(220, 213, 246, 0.28) 56%, transparent 82%),
    radial-gradient(ellipse 32% 26% at 51% 16.5%, rgba(246, 207, 190, 0.75) 0%, rgba(247, 217, 203, 0.24) 55%, transparent 80%),
    radial-gradient(ellipse 38% 28% at 82% 17.5%, rgba(192, 236, 219, 0.76) 0%, rgba(208, 239, 226, 0.25) 55%, transparent 82%),
    radial-gradient(ellipse 45% 22% at 20% 42%, rgba(220, 213, 246, 0.30) 0%, transparent 75%),
    radial-gradient(ellipse 45% 24% at 78% 58%, rgba(207, 223, 239, 0.32) 0%, transparent 75%),
    radial-gradient(ellipse 44% 22% at 28% 76%, rgba(247, 217, 203, 0.28) 0%, transparent 75%),
    radial-gradient(ellipse 50% 25% at 50% 96%, rgba(215, 204, 250, 0.38) 0%, rgba(192, 236, 219, 0.24) 50%, transparent 80%);
}

/* Faint dotted micro-texture in the lit hero region */
.hero-micro-dots {
  background-image: radial-gradient(rgba(65, 76, 94, 0.11) 1px, transparent 1px);
  background-size: 14px 14px;
  mask-image: radial-gradient(ellipse 58% 54% at 69% 47%, rgba(0, 0, 0, 0.7) 10%, transparent 78%);
  -webkit-mask-image: radial-gradient(ellipse 58% 54% at 69% 47%, rgba(0, 0, 0, 0.7) 10%, transparent 78%);
}

/* Choreographed Hero Entrance Animations */
@keyframes haloTrace {
  0% {
    stroke-dashoffset: 120;
    transform: rotate(-18deg) scale(0.92);
  }
  100% {
    stroke-dashoffset: 0;
    transform: rotate(0deg) scale(1);
  }
}

@keyframes clipLineReveal {
  0% {
    clip-path: inset(0 -10% 100% -10%);
    transform: translateY(18px);
    letter-spacing: -0.005em;
  }
  100% {
    clip-path: inset(-15% -15% -15% -15%);
    transform: translateY(0);
    letter-spacing: -0.025em;
  }
}

@keyframes windowUnfold {
  0% {
    clip-path: inset(8% 12% 14% 12% round 20px);
    transform: translateY(16px) scale(0.965);
  }
  100% {
    clip-path: inset(-15% -15% -15% -15% round 20px);
    transform: translateY(0) scale(1);
  }
}

@keyframes widgetCalendarArrive {
  0% {
    transform: translate3d(14px, -18px, 0) scale(0.94);
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@keyframes widgetStickyArrive {
  0% {
    transform: translate3d(16px, 18px, 0) rotate(6deg) scale(0.95);
  }
  100% {
    transform: translate3d(0, 0, 0) rotate(2.2deg) scale(1);
  }
}

@keyframes widgetQuickTaskArrive {
  0% {
    transform: translate3d(-18px, 12px, 0) scale(0.95);
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@keyframes taskSlideTrack {
  0% {
    transform: translateX(22px) scaleX(0.97);
  }
  100% {
    transform: translateX(0) scaleX(1);
  }
}

@keyframes ambientDrift {
  0%, 100% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(8px, -6px, 0) scale(1.03);
  }
}

.animate-halo-trace {
  stroke-dasharray: 120;
  animation: haloTrace 1.1s var(--ease-out-expo) forwards;
}

.animate-headline-line-1 {
  animation: clipLineReveal 0.72s var(--ease-out-expo) 0.05s both;
}

.animate-headline-line-2 {
  animation: clipLineReveal 0.78s var(--ease-out-expo) 0.16s both;
}

.animate-window-unfold {
  animation: windowUnfold 0.85s var(--ease-out-expo) 0.12s both;
}

.animate-widget-calendar {
  animation: widgetCalendarArrive 0.75s var(--ease-spring) 0.28s both;
}

.animate-widget-sticky {
  animation: widgetStickyArrive 0.82s var(--ease-spring) 0.36s both;
}

.animate-widget-quicktask {
  animation: widgetQuickTaskArrive 0.78s var(--ease-spring) 0.32s both;
}

.animate-task-row-1 {
  animation: taskSlideTrack 0.55s var(--ease-out-expo) 0.2s both;
}
.animate-task-row-2 {
  animation: taskSlideTrack 0.55s var(--ease-out-expo) 0.27s both;
}
.animate-task-row-3 {
  animation: taskSlideTrack 0.55s var(--ease-out-expo) 0.34s both;
}
.animate-task-row-4 {
  animation: taskSlideTrack 0.55s var(--ease-out-expo) 0.41s both;
}

.animate-ambient-slow {
  animation: ambientDrift 14s ease-in-out infinite;
}

/* Sticky Note Realism */
.sticky-note-paper {
  background: linear-gradient(168deg, #FFF3B8 0%, #F9E699 100%);
  box-shadow:
    0 14px 28px -10px rgba(41, 49, 62, 0.16),
    0 3px 8px -2px rgba(41, 49, 62, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.65);
  transition: transform 240ms var(--ease-spring), box-shadow 240ms var(--ease-out-expo);
}

.sticky-note-paper:hover {
  transform: rotate(0.6deg) translateY(-3px);
  box-shadow:
    0 18px 32px -10px rgba(41, 49, 62, 0.2),
    0 4px 10px -2px rgba(41, 49, 62, 0.1);
}

/* App Window Surface */
.halo-app-window {
  background: rgba(250, 249, 252, 0.94);
  box-shadow:
    0 28px 60px -18px rgba(41, 49, 62, 0.14),
    0 10px 24px -8px rgba(41, 49, 62, 0.07),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.85);
}

.halo-widget-surface {
  background: rgba(252, 251, 254, 0.95);
  box-shadow:
    0 16px 34px -12px rgba(41, 49, 62, 0.13),
    0 4px 12px -3px rgba(41, 49, 62, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.9);
}

@media (min-width: 1024px) {
  .halo-app-window {
    background: rgba(250, 249, 252, 0.88);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }
  .halo-widget-surface {
    background: rgba(252, 251, 254, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
}

/* Respect Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
]]>
    </file>
    <file path="src/app/(halodesk)/halodesk/HaloDeskApp.tsx">
<![CDATA['use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Download, Play } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroDesktopApp } from './components/HeroDesktopApp';
import { CalmSystemSection } from './components/CalmSystemSection';
import { WorkflowStoryboard } from './components/WorkflowStoryboard';
import { FeatureLabSection, LabTabKey } from './components/FeatureLabSection';
import { TemplatesSection } from './components/TemplatesSection';
import { MeaningfulDetailsSection } from './components/MeaningfulDetailsSection';
import { PricingPreviewSection } from './components/PricingPreviewSection';
import {
  INITIAL_TASKS,
  PlannerTask,
  SidebarTab,
  TemplatePreset,
  applyTemplateToTasks,
} from './lib/plannerLogic';

type HeroChipType = 'Tasks' | 'Calendar' | 'Focus Mode' | 'Notes';

const HERO_CHIPS: Array<{
  id: HeroChipType;
  label: string;
  bgClass: string;
  borderClass: string;
  targetTab: SidebarTab;
  targetLab: LabTabKey;
}> = [
  {
    id: 'Tasks',
    label: 'Tasks',
    bgClass: 'bg-[#E5E0F7]/85 hover:bg-[#DDD5F5]',
    borderClass: 'border-[#C9BFF0]/70',
    targetTab: 'Today',
    targetLab: 'Tasks',
  },
  {
    id: 'Calendar',
    label: 'Calendar',
    bgClass: 'bg-[#DCEAF9]/85 hover:bg-[#CFE2F7]',
    borderClass: 'border-[#B8D3F0]/70',
    targetTab: 'Calendar',
    targetLab: 'Calendar',
  },
  {
    id: 'Focus Mode',
    label: 'Focus Mode',
    bgClass: 'bg-[#F8E2DA]/85 hover:bg-[#F5D6CB]',
    borderClass: 'border-[#E9C3B5]/70',
    targetTab: 'Today',
    targetLab: 'Focus',
  },
  {
    id: 'Notes',
    label: 'Notes',
    bgClass: 'bg-[#F8E7DD]/85 hover:bg-[#F4DDD0]',
    borderClass: 'border-[#E8CAB9]/70',
    targetTab: 'Notes',
    targetLab: 'Notes',
  },
];

export default function HaloDeskApp() {
  const [tasks, setTasks] = useState<PlannerTask[]>(INITIAL_TASKS);
  const [activeSidebarTab, setActiveSidebarTab] = useState<SidebarTab>('Today');
  const [highlightedFeature, setHighlightedFeature] = useState<HeroChipType | null>(null);
  const [activeLabTab, setActiveLabTab] = useState<LabTabKey>('Tasks');
  const [modalState, setModalState] = useState<{
    open: boolean;
    mode: 'download' | 'login' | 'start';
  }>({ open: false, mode: 'download' });

  const handleOpenEarlyAccess = (mode: 'download' | 'login' | 'start') => {
    setModalState({ open: true, mode });
  };

  const handleApplyTemplate = (preset: TemplatePreset) => {
    setTasks((prev) => applyTemplateToTasks(prev, preset));
    setActiveSidebarTab('Today');
  };

  return (
    <div className="halo-atmosphere min-h-screen relative overflow-x-hidden">
      {/* Subtle dotted micro-texture within the lit hero region */}
      <div
        aria-hidden="true"
        className="hero-micro-dots pointer-events-none absolute inset-x-0 top-0 h-[780px] z-0"
      />

      {/* Top Navigation */}
      <Navbar onOpenEarlyAccess={handleOpenEarlyAccess} />

      <main>
        {/* SECTION A — Signature Hero / Desktop in Miniature */}
        <section
          id="home"
          aria-labelledby="hero-headline"
          className="relative z-10 w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 pt-8 sm:pt-14 pb-20 lg:pb-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Editorial Copy (~44% -> 5 cols on 12-col grid) */}
            <div className="lg:col-span-5 space-y-6">
              <h1
                id="hero-headline"
                className="text-[33px] sm:text-[42px] lg:text-[43px] xl:text-[46px] font-medium tracking-[-0.028em] text-[#262E3B] leading-[1.1]"
              >
                <span className="block sm:whitespace-nowrap animate-headline-line-1">
                  Organize your work
                </span>
                <span className="block sm:whitespace-nowrap animate-headline-line-2">
                  without losing your calm.
                </span>
              </h1>

              <p className="text-[16.5px] sm:text-[18px] text-[#4E5968] font-normal leading-[1.52] max-w-[38ch]">
                A desktop productivity app for focused planning, clear priorities, and beautifully structured days.
              </p>

              {/* Hero CTAs matching reference */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <button
                  type="button"
                  onClick={() => handleOpenEarlyAccess('download')}
                  className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#2A3240] hover:bg-[#364052] active:scale-[0.98] text-[#FCFBF7] text-[15.5px] font-medium shadow-[0_12px_26px_-8px_rgba(42,50,64,0.35)] transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29313E]"
                >
                  <span>Download for Desktop</span>
                  <Download className="w-4 h-4 text-[#FCFBF7]/90 transition-transform duration-200 group-hover:translate-y-0.5" />
                </button>

                <a
                  href="#lab"
                  className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#FCFBF7]/80 hover:bg-[#FCFBF7] border border-[#3A4453]/18 text-[#29313E] text-[15.5px] font-medium shadow-[0_4px_14px_rgba(41,49,62,0.04)] transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29313E]"
                >
                  <span>View Demo</span>
                  <Play className="w-3.5 h-3.5 text-[#6C798F] fill-[#6C798F] transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>
              </div>

              {/* Four Softly Tinted Interactive Feature Chips: Tasks · Calendar · Focus Mode · Notes */}
              <div
                role="group"
                aria-label="Highlight workspace feature in hero preview"
                className="pt-4 flex flex-wrap items-center gap-2"
              >
                {HERO_CHIPS.map((chip, idx) => {
                  const isSelected = highlightedFeature === chip.id;
                  return (
                    <React.Fragment key={chip.id}>
                      <button
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => {
                          setHighlightedFeature((prev) => (prev === chip.id ? null : chip.id));
                          setActiveSidebarTab(chip.targetTab);
                          setActiveLabTab(chip.targetLab);
                        }}
                        className={`px-3.5 py-1.5 rounded-full border text-[13.5px] font-normal text-[#29313E] transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                          chip.bgClass
                        } ${chip.borderClass} ${
                          isSelected ? 'ring-2 ring-[#29313E] -translate-y-0.5 font-medium' : ''
                        }`}
                      >
                        {chip.label}
                      </button>
                      {idx < HERO_CHIPS.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="text-[#66717F]/50 text-[13px] select-none px-0.5"
                        >
                          ·
                        </span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* Right Elegant App Showcase (~56% -> 7 cols on 12-col grid) */}
            <div className="lg:col-span-7">
              <HeroDesktopApp
                tasks={tasks}
                setTasks={setTasks}
                activeSidebarTab={activeSidebarTab}
                setActiveSidebarTab={setActiveSidebarTab}
                highlightedFeature={highlightedFeature}
              />
            </div>
          </div>
        </section>

        {/* SECTION B — The Calm System / Benefits */}
        <CalmSystemSection />

        {/* SECTION C — Workflow / A Day Unfolding */}
        <WorkflowStoryboard />

        {/* SECTION D — Interactive App Feature Lab */}
        <FeatureLabSection activeLabTab={activeLabTab} setActiveLabTab={setActiveLabTab} />

        {/* SECTION E — Templates / Beautiful Starting Points */}
        <TemplatesSection onApplyTemplate={handleApplyTemplate} />

        {/* SECTION F — Small, Meaningful Details */}
        <MeaningfulDetailsSection />

        {/* SECTION G & H — Pricing / Honest Product Preview, Final CTA & Footer */}
        <PricingPreviewSection
          modalState={modalState}
          onOpenModal={handleOpenEarlyAccess}
          onCloseModal={() => setModalState((prev) => ({ ...prev, open: false }))}
        />
      </main>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(halodesk)/halodesk/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#F8F5EE"/>
  <path
    d="M7.5 12.5C6.2 14.8 6.3 18.2 7.8 21.1C9.5 24.3 12.6 26 16 26C19.4 26 22.5 24.3 24.2 21.1C25.7 18.2 25.8 14.8 24.5 12.5"
    stroke="#5C6675"
    stroke-width="1.6"
    stroke-linecap="round"
  />
  <path
    d="M9.2 13.8C8.3 15.8 8.4 18.4 9.6 20.6C11 23.1 13.4 24.4 16 24.4C18.6 24.4 21 23.1 22.4 20.6C23.6 18.4 23.7 15.8 22.8 13.8"
    stroke="#5C6675"
    stroke-width="1.15"
    stroke-linecap="round"
    opacity="0.72"
  />
  <ellipse
    cx="16"
    cy="11.2"
    rx="6.8"
    ry="2.2"
    stroke="#5C6675"
    stroke-width="1.5"
  />
  <path
    d="M11.2 11.4C12.5 10.6 14.2 10.2 16 10.2C17.8 10.2 19.5 10.6 20.8 11.4"
    stroke="#5C6675"
    stroke-width="1.1"
    stroke-linecap="round"
    opacity="0.65"
  />
</svg>
]]>
    </file>
    <file path="src/app/(halodesk)/halodesk/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        backgroundColor: "#F8F5EE",
        color: "#29313E",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 28,
          fontWeight: 600,
          color: "#29313E",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            backgroundColor: "#DCD5F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 700,
            color: "#29313E",
          }}
        >
          H
        </div>
        Halo Desk
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: -1,
            color: "#262E3B",
          }}
        >
          Organize your work without losing your calm.
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#4E5968",
            maxWidth: 860,
            lineHeight: 1.5,
          }}
        >
          A desktop productivity app for focused planning, clear priorities, and beautifully structured days.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(58, 68, 83, 0.15)",
          paddingTop: 24,
          fontSize: 18,
          color: "#66717F",
        }}
      >
        <span>Desktop Productivity · Structured Planning</span>
        <span style={{ color: "#29313E", fontWeight: 500 }}>halodesk.app</span>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(halodesk)/halodesk/page.tsx">
<![CDATA["use client";

import HaloDeskApp from "./HaloDeskApp";

export default function HaloDeskPage() {
  return <HaloDeskApp />;
}
]]>
    </file>
    <file path="src/app/(halodesk)/halodesk/components/CalmSystemSection.tsx">
<![CDATA[import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, CheckCircle2, Clock, Sparkles } from 'lucide-react';

interface CapabilityItem {
  id: 'capture' | 'prioritize' | 'finish';
  number: string;
  title: string;
  summary: string;
  workflowTitle: string;
  workflowDetail: string;
  sampleKey: string;
  accentBg: string;
  accentBorder: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'capture',
    number: '01.',
    title: 'Capture without breaking stride',
    summary:
      'Jot down stray thoughts, links, and follow-ups from anywhere on your desktop with a quiet command bar that tucks straight into your Inbox.',
    workflowTitle: 'Sample flow · Global Quick Capture',
    workflowDetail:
      'Press ⌘ + Shift + Space, type "Send typography spec to Maya #today", and return to your document in under three seconds—zero window switching.',
    sampleKey: 'Inbox → Triaged in 1 keystroke',
    accentBg: 'bg-[#DCD5F6]/55',
    accentBorder: 'border-[#B9A9E8]/50',
  },
  {
    id: 'prioritize',
    number: '02.',
    title: 'Prioritize by energy, not urgency alone',
    summary:
      'Group your day into three gentle rhythms—Deep Focus, Collaborative, and Light Flow—so demanding work lands when your attention is naturally sharpest.',
    workflowTitle: 'Sample flow · Morning Rhythm Alignment',
    workflowDetail:
      'Drag up to four horizontal pastel blocks onto Today. Halo Desk gently warns you if you schedule more than six hours of deep cognitive work.',
    sampleKey: 'Max 4 anchor tasks per day',
    accentBg: 'bg-[#CFDFEF]/65',
    accentBorder: 'border-[#96BCE8]/50',
  },
  {
    id: 'finish',
    number: '03.',
    title: 'Finish with a calm sense of closure',
    summary:
      'Pair any task with a quiet 25-minute ring timer and margin sticky notes. When the afternoon wraps, unfinished items roll forward without guilt.',
    workflowTitle: 'Sample flow · End-of-Day Wind Down',
    workflowDetail:
      'Completed tasks settle into your weekly log while open items offer a single-click "Move to tomorrow morning" transition.',
    sampleKey: '25:00 Focus Ring + Margin Notes',
    accentBg: 'bg-[#D0EFE2]/65',
    accentBorder: 'border-[#95D3BD]/50',
  },
];

export const CalmSystemSection: React.FC = () => {
  const [activeId, setActiveId] = useState<'capture' | 'prioritize' | 'finish'>('capture');
  const [lineProgress, setLineProgress] = useState(0.35);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewH = window.innerHeight || 800;
      const raw = (viewH - rect.top) / (rect.height + viewH * 0.4);
      const clamped = Math.max(0.15, Math.min(1, raw));
      setLineProgress(Number(clamped.toFixed(3)));
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const strokeLength = 420;
  const strokeOffset = strokeLength * (1 - lineProgress);

  return (
    <section
      id="features"
      ref={sectionRef}
      aria-labelledby="calm-system-heading"
      className="relative w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 py-24 lg:py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
        {/* Left Column: Editorial framing + layered paper-card stack visualization */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <p className="text-[13px] font-medium text-[#66717F] tracking-wide">
              The Calm System
            </p>
            <h2
              id="calm-system-heading"
              className="text-[34px] sm:text-[42px] font-semibold tracking-[-0.025em] text-[#29313E] leading-[1.1] text-balance"
            >
              Less noise. More room to think.
            </h2>
            <p className="text-[16px] text-[#556070] leading-[1.65] max-w-[46ch]">
              Most work tools treat every notification, checklist, and meeting with identical urgency. Halo Desk separates quick capture from protected focus so your workspace feels like a clean sheet of paper.
            </p>
          </div>

          {/* Interactive Layered Paper-Card Visualization */}
          <div
            aria-label="Layered paper card preview of selected capability"
            className="relative pt-4 pb-6 px-2"
          >
            {/* Background paper layer 3 */}
            <div
              aria-hidden="true"
              className={`rounded-2xl border border-[#3A4453]/10 bg-[#FCFBF7]/70 h-52 w-[90%] mx-auto transition-transform duration-500 ${
                activeId === 'finish'
                  ? '-translate-y-3 rotate-[-1.5deg] scale-[0.98]'
                  : 'translate-y-2 rotate-[1.5deg] scale-[0.95]'
              }`}
            />

            {/* Middle paper layer 2 */}
            <div
              aria-hidden="true"
              className={`absolute inset-x-5 top-6 rounded-2xl border border-[#3A4453]/12 h-52 transition-all duration-500 ${
                activeId === 'capture'
                  ? 'bg-[#DCD5F6]/45 -rotate-1 translate-y-1'
                  : activeId === 'prioritize'
                  ? 'bg-[#CFDFEF]/55 rotate-1 -translate-y-1'
                  : 'bg-[#D0EFE2]/55 -rotate-1 translate-y-0.5'
              }`}
            />

            {/* Foreground active paper card */}
            <div className="relative -mt-48 rounded-2xl bg-[#FCFBF7] border border-[#3A4453]/14 shadow-[0_18px_40px_-15px_rgba(41,49,62,0.12)] p-6 space-y-4 transition-all duration-500">
              <div className="flex items-center justify-between border-b border-[#3A4453]/10 pb-3">
                <span className="text-[13px] font-semibold text-[#29313E]">
                  {activeId === 'capture'
                    ? '01 · Instant Inbox Triage'
                    : activeId === 'prioritize'
                    ? '02 · Energy-Balanced Timeline'
                    : '03 · Protected Focus Session'}
                </span>
                <span className="text-[12px] font-mono-tabular text-[#66717F]">
                  {activeId === 'capture'
                    ? '⌘⇧Space'
                    : activeId === 'prioritize'
                    ? '3 blocks / day'
                    : '25:00 ring'}
                </span>
              </div>

              {activeId === 'capture' && (
                <div className="space-y-2.5">
                  <div className="px-3.5 py-2.5 rounded-xl bg-[#F4F2F7] border border-[#3A4453]/10 flex items-center justify-between">
                    <span className="text-[13px] text-[#29313E] font-medium">
                      + Draft architecture note for Tuesday
                    </span>
                    <span className="text-[11px] text-[#66717F] font-mono-tabular">Enter ↵</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <div className="p-2.5 rounded-lg bg-[#DCD5F6]/55 text-[12px] text-[#29313E]">
                      Saved to Inbox · 0s delay
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#F7D9CB]/55 text-[12px] text-[#29313E]">
                      Zero context switch
                    </div>
                  </div>
                </div>
              )}

              {activeId === 'prioritize' && (
                <div className="space-y-2">
                  <div className="px-3.5 py-2 rounded-lg bg-[#C3DCF9]/80 flex items-center justify-between text-[12.5px] font-medium text-[#29313E]">
                    <span>Deep work · Core view state</span>
                    <span className="font-mono-tabular text-[11px] text-[#4E5A6E]">90 min</span>
                  </div>
                  <div className="px-3.5 py-2 rounded-lg bg-[#F8D6C5]/80 flex items-center justify-between text-[12.5px] font-medium text-[#29313E]">
                    <span>Light flow · Editorial outline</span>
                    <span className="font-mono-tabular text-[11px] text-[#4E5A6E]">30 min</span>
                  </div>
                  <div className="px-3.5 py-2 rounded-lg bg-[#C7EFE1]/80 flex items-center justify-between text-[12.5px] font-medium text-[#29313E]">
                    <span>Collaborative · Studio sync</span>
                    <span className="font-mono-tabular text-[11px] text-[#4E5A6E]">25 min</span>
                  </div>
                </div>
              )}

              {activeId === 'finish' && (
                <div className="flex items-center justify-between gap-4 pt-1">
                  <div className="space-y-1.5">
                    <p className="text-[13px] font-medium text-[#29313E] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#2E7D5B]" />
                      4 of 4 daily anchors complete
                    </p>
                    <p className="text-[12px] text-[#556070] leading-relaxed">
                      Sticky note reminders archived cleanly into tomorrow’s brief.
                    </p>
                  </div>
                  <div className="shrink-0 w-16 h-16 rounded-full border-4 border-[#6C798F] flex items-center justify-center font-mono-tabular text-[13px] font-semibold text-[#29313E] bg-[#F8F5EE]">
                    Done
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Three expandable typographic capability rows connected by scroll-drawn SVG line */}
        <div className="lg:col-span-7 relative pl-6 sm:pl-10">
          {/* Fine SVG vertical line that draws as user scrolls */}
          <svg
            aria-hidden="true"
            className="absolute left-1 sm:left-2.5 top-4 bottom-4 w-4 h-[calc(100%-32px)] overflow-visible"
            viewBox="0 0 16 420"
            preserveAspectRatio="none"
          >
            <line
              x1="8"
              y1="0"
              x2="8"
              y2="420"
              stroke="rgba(58, 68, 83, 0.14)"
              strokeWidth="1.5"
            />
            <line
              x1="8"
              y1="0"
              x2="8"
              y2="420"
              stroke="#6C798F"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={strokeLength}
              strokeDashoffset={strokeOffset}
              className="transition-all duration-300 ease-out"
            />
          </svg>

          <div className="divide-y divide-[#3A4453]/12 border-t border-b border-[#3A4453]/12">
            {CAPABILITIES.map((cap) => {
              const isExpanded = activeId === cap.id;
              return (
                <div
                  key={cap.id}
                  onMouseEnter={() => setActiveId(cap.id)}
                  className="py-6 sm:py-7 transition-colors"
                >
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => setActiveId(cap.id)}
                    className="w-full text-left flex items-baseline justify-between gap-4 group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#29313E] rounded-lg"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="text-[14px] font-mono-tabular font-medium text-[#66717F]">
                        {cap.number}
                      </span>
                      <h3 className="text-[21px] sm:text-[24px] font-semibold tracking-[-0.015em] text-[#29313E] group-hover:text-[#435066] transition-colors">
                        {cap.title}
                      </h3>
                    </div>
                    <span
                      className={`inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#3A4453]/15 text-[#29313E] transition-transform duration-300 shrink-0 ${
                        isExpanded ? 'rotate-45 bg-[#29313E] text-[#FCFBF7]' : 'group-hover:bg-black/5'
                      }`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </button>

                  <p className="mt-2.5 pl-9 sm:pl-10 text-[15px] text-[#556070] leading-[1.6] max-w-[60ch]">
                    {cap.summary}
                  </p>

                  {/* Animated height / controlled sliding workflow drawer */}
                  <div
                    className={`pl-9 sm:pl-10 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isExpanded ? 'max-h-56 pt-4' : 'max-h-0 pt-0'
                    }`}
                  >
                    <div
                      className={`p-4 rounded-xl border ${cap.accentBorder} ${cap.accentBg} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
                    >
                      <div className="space-y-1">
                        <p className="text-[12.5px] font-semibold text-[#29313E] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#4E5A6E]" />
                          {cap.workflowTitle}
                        </p>
                        <p className="text-[13px] text-[#3A4453] leading-relaxed max-w-[52ch]">
                          {cap.workflowDetail}
                        </p>
                      </div>
                      <div className="shrink-0 text-[12px] font-mono-tabular font-medium text-[#29313E] flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#556070]" />
                        <span>{cap.sampleKey}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(halodesk)/halodesk/components/FeatureLabSection.tsx">
<![CDATA[import React, { useState } from 'react';
import {
  CheckSquare,
  Calendar as CalendarIcon,
  Timer,
  StickyNote,
  Check,
  Play,
  Pause,
  RotateCcw,
  Plus,
} from 'lucide-react';
import { formatTimerSeconds } from '../lib/plannerLogic';

export type LabTabKey = 'Tasks' | 'Calendar' | 'Focus' | 'Notes';

interface FeatureLabSectionProps {
  activeLabTab: LabTabKey;
  setActiveLabTab: (tab: LabTabKey) => void;
}

const LAB_TABS: Array<{
  id: LabTabKey;
  label: string;
  caption: string;
  icon: React.FC<{ className?: string }>;
}> = [
  {
    id: 'Tasks',
    label: 'Tasks',
    caption: 'Energy-grouped horizontal tiles',
    icon: CheckSquare,
  },
  {
    id: 'Calendar',
    label: 'Calendar',
    caption: 'Time-blocked week without clutter',
    icon: CalendarIcon,
  },
  {
    id: 'Focus',
    label: 'Focus',
    caption: 'Single-task ring & distraction shield',
    icon: Timer,
  },
  {
    id: 'Notes',
    label: 'Notes',
    caption: 'Tactile sticky notes & studio briefs',
    icon: StickyNote,
  },
];

export const FeatureLabSection: React.FC<FeatureLabSectionProps> = ({
  activeLabTab,
  setActiveLabTab,
}) => {
  // Interactive state inside the lab
  const [energyFilter, setEnergyFilter] = useState<'All' | 'Deep focus' | 'Collaborative'>('All');
  const [completedLabIds, setCompletedLabIds] = useState<string[]>(['lab-4']);
  const [selectedSlotDay, setSelectedSlotDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu'>('Tue');
  const [labFocusSeconds, setLabFocusSeconds] = useState(1500);
  const [labSoundscape, setLabSoundscape] = useState<'Silence' | 'Soft rain' | 'Warm tape'>('Silence');
  const [labNotes, setLabNotes] = useState([
    {
      id: 'n1',
      title: 'Typography scale notes',
      body: 'Keep display headlines balanced at 1.08 line-height; body prose at 16px on warm ivory.',
      tone: 'bg-[#FFF1AE]',
    },
    {
      id: 'n2',
      title: 'Thursday studio review',
      body: 'Walk through the Weekly Calendar mini-widget transitions and keyboard focus order.',
      tone: 'bg-[#DCD5F6]',
    },
    {
      id: 'n3',
      title: 'Reading list',
      body: 'Calm Technology by Amber Case · Notes on peripheral attention.',
      tone: 'bg-[#D0EFE2]',
    },
  ]);
  const [activeNoteId, setActiveNoteId] = useState('n1');

  const labTasks = [
    {
      id: 'lab-1',
      title: 'Refine onboarding motion curves',
      energy: 'Deep focus',
      time: '90 min',
      bg: 'bg-[#DCD5F6]',
    },
    {
      id: 'lab-2',
      title: 'Review layout spacing across breakpoints',
      energy: 'Deep focus',
      time: '60 min',
      bg: 'bg-[#CFDFEF]',
    },
    {
      id: 'lab-3',
      title: 'Sync with product copywriter on tone',
      energy: 'Collaborative',
      time: '30 min',
      bg: 'bg-[#F7D9CB]',
    },
    {
      id: 'lab-4',
      title: 'Export crisp SVG icon set',
      energy: 'Deep focus',
      time: '25 min',
      bg: 'bg-[#D0EFE2]',
    },
  ];

  const filteredLabTasks = labTasks.filter(
    (t) => energyFilter === 'All' || t.energy === energyFilter
  );

  const toggleLabTask = (id: string) => {
    setCompletedLabIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="lab"
      aria-labelledby="feature-lab-heading"
      className="relative w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 py-20 lg:py-28"
    >
      <div className="max-w-2xl space-y-3 mb-10">
        <p className="text-[13px] font-medium text-[#66717F] tracking-wide">
          Interactive Feature Lab
        </p>
        <h2
          id="feature-lab-heading"
          className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.025em] text-[#29313E] leading-[1.1] text-balance"
        >
          One calm window that reshapes around your mode of work.
        </h2>
        <p className="text-[16px] text-[#556070] leading-[1.6]">
          Switch modes below to see how the same desktop workspace recomposes its layout—fanning task bars into a weekly grid, compressing into a focus ring, or opening tactile margin notes.
        </p>
      </div>

      {/* Feature Selector Tab Strip */}
      <div
        role="tablist"
        aria-label="Workspace modes"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
      >
        {LAB_TABS.map((tab) => {
          const Icon = tab.icon;
          const active = activeLabTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setActiveLabTab(tab.id)}
              className={`text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#29313E] ${
                active
                  ? 'bg-[#29313E] text-[#FCFBF7] border-[#29313E] shadow-[0_12px_28px_-10px_rgba(41,49,62,0.28)] -translate-y-0.5'
                  : 'bg-[#FCFBF7]/85 hover:bg-[#FCFBF7] text-[#29313E] border-[#3A4453]/12'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[15px] font-semibold">{tab.label}</span>
                <Icon
                  className={`w-4 h-4 ${active ? 'text-[#DCD5F6]' : 'text-[#66717F]'}`}
                />
              </div>
              <p
                className={`text-[12.5px] leading-snug ${
                  active ? 'text-[#FCFBF7]/80' : 'text-[#66717F]'
                }`}
              >
                {tab.caption}
              </p>
            </button>
          );
        })}
      </div>

      {/* Shared Outer Software Window that Recomposes Internally */}
      <div className="halo-app-window rounded-[24px] p-5 sm:p-8 min-h-[420px] flex flex-col justify-between transition-all duration-500">
        {/* Shared Window Top Chrome */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#3A4453]/10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#F5B041]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#2ECC71]" />
            </div>
            <span className="text-[13.5px] font-semibold text-[#29313E] pl-2 border-l border-[#3A4453]/15">
              Halo Desk · {activeLabTab} Workspace
            </span>
          </div>

          <div className="text-[12.5px] font-mono-tabular text-[#66717F]">
            {activeLabTab === 'Tasks' &&
              `${labTasks.length - completedLabIds.length} active · ${completedLabIds.length} completed`}
            {activeLabTab === 'Calendar' && `Viewing ${selectedSlotDay} time blocks`}
            {activeLabTab === 'Focus' && `Soundscape: ${labSoundscape}`}
            {activeLabTab === 'Notes' && `${labNotes.length} studio notes pinned`}
          </div>
        </div>

        {/* Dynamic Morphing Interior Stage */}
        <div className="py-6 flex-1 flex flex-col justify-center">
          {activeLabTab === 'Tasks' && (
            <div className="space-y-5 animate-[taskSlideTrack_0.4s_ease-out]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[14px] text-[#556070]">
                  Filter tasks by cognitive energy level or click any row to mark complete:
                </p>
                <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-[#ECEAF2]">
                  {(['All', 'Deep focus', 'Collaborative'] as const).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setEnergyFilter(filter)}
                      className={`px-3 py-1 rounded-lg text-[12px] font-medium transition-colors cursor-pointer ${
                        energyFilter === filter
                          ? 'bg-white text-[#29313E] shadow-xs'
                          : 'text-[#556070] hover:text-[#29313E]'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {filteredLabTasks.map((t) => {
                  const isDone = completedLabIds.includes(t.id);
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => toggleLabTask(t.id)}
                      className={`text-left p-4 rounded-xl ${t.bg} flex items-center justify-between gap-3 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer ${
                        isDone ? 'opacity-60' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-5 h-5 rounded-full border border-[#29313E]/30 flex items-center justify-center ${
                            isDone ? 'bg-[#29313E] text-white' : 'bg-white/70'
                          }`}
                        >
                          {isDone && <Check className="w-3 h-3" />}
                        </span>
                        <div>
                          <p
                            className={`text-[14px] font-semibold text-[#232A36] ${
                              isDone ? 'line-through' : ''
                            }`}
                          >
                            {t.title}
                          </p>
                          <p className="text-[12px] text-[#4E5A6E] mt-0.5">{t.energy}</p>
                        </div>
                      </div>
                      <span className="text-[12px] font-mono-tabular font-medium text-[#29313E] bg-white/60 px-2.5 py-1 rounded-md">
                        {t.time}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeLabTab === 'Calendar' && (
            <div className="space-y-5 animate-[taskSlideTrack_0.4s_ease-out]">
              <div className="flex items-center justify-between">
                <p className="text-[14px] text-[#556070]">
                  Select a day column to inspect how tasks map onto calm time blocks:
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {(
                  [
                    {
                      day: 'Mon',
                      date: 'Oct 12',
                      blocks: [
                        { title: 'Weekly intention sweep', time: '09:00', bg: 'bg-[#DCD5F6]' },
                        { title: 'Design system review', time: '10:30', bg: 'bg-[#CFDFEF]' },
                      ],
                    },
                    {
                      day: 'Tue',
                      date: 'Oct 13',
                      blocks: [
                        { title: 'Deep work: Main view', time: '09:30', bg: 'bg-[#CFDFEF]' },
                        { title: 'Editorial outline', time: '14:00', bg: 'bg-[#F7D9CB]' },
                      ],
                    },
                    {
                      day: 'Wed',
                      date: 'Oct 14',
                      blocks: [
                        { title: 'Architecture sync', time: '10:00', bg: 'bg-[#D0EFE2]' },
                        { title: 'Quiet research block', time: '13:30', bg: 'bg-[#DCD5F6]' },
                      ],
                    },
                    {
                      day: 'Thu',
                      date: 'Oct 15',
                      blocks: [
                        { title: 'Prototype polish', time: '09:00', bg: 'bg-[#F7D9CB]' },
                        { title: 'Team check-in', time: '15:00', bg: 'bg-[#D0EFE2]' },
                      ],
                    },
                  ] as const
                ).map((col) => {
                  const selected = selectedSlotDay === col.day;
                  return (
                    <div
                      key={col.day}
                      onClick={() => setSelectedSlotDay(col.day)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedSlotDay(col.day);
                        }
                      }}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        selected
                          ? 'bg-white border-[#29313E]/30 shadow-md -translate-y-0.5'
                          : 'bg-white/55 border-[#3A4453]/10 hover:bg-white/80'
                      }`}
                    >
                      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#3A4453]/10">
                        <span className="text-[13.5px] font-semibold text-[#29313E]">
                          {col.day}
                        </span>
                        <span className="text-[11.5px] font-mono-tabular text-[#66717F]">
                          {col.date}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {col.blocks.map((b, i) => (
                          <div key={i} className={`p-2.5 rounded-xl ${b.bg}`}>
                            <span className="text-[10.5px] font-mono-tabular text-[#4E5A6E]">
                              {b.time}
                            </span>
                            <p className="text-[12.5px] font-medium text-[#232A36] leading-snug mt-0.5">
                              {b.title}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeLabTab === 'Focus' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-[taskSlideTrack_0.4s_ease-out]">
              <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-white/80 border border-[#3A4453]/10">
                <span className="text-[12px] font-medium text-[#66717F]">
                  Protected Session Timer
                </span>
                <p className="text-[40px] font-semibold font-mono-tabular text-[#29313E] my-2">
                  {formatTimerSeconds(labFocusSeconds)}
                </p>
                <div className="flex items-center gap-2">
                  {[
                    { label: '25m', secs: 1500 },
                    { label: '50m', secs: 3000 },
                    { label: '15m', secs: 900 },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setLabFocusSeconds(item.secs)}
                      className={`px-3 py-1.5 rounded-full text-[12px] font-mono-tabular font-medium transition-colors cursor-pointer ${
                        labFocusSeconds === item.secs
                          ? 'bg-[#29313E] text-white'
                          : 'bg-[#ECEAF2] text-[#29313E] hover:bg-[#DCD5F6]'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-7 space-y-4">
                <h3 className="text-[20px] font-semibold text-[#29313E]">
                  Distraction shield & ambient acoustic cue
                </h3>
                <p className="text-[14.5px] text-[#556070] leading-relaxed">
                  While Focus Mode is active, Halo Desk collapses your sidebar into a single priority bar and optionally plays a subtle, non-looping acoustic texture.
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {(['Silence', 'Soft rain', 'Warm tape'] as const).map((sound) => (
                    <button
                      key={sound}
                      type="button"
                      onClick={() => setLabSoundscape(sound)}
                      className={`px-4 py-2 rounded-xl text-[13px] font-medium border transition-colors cursor-pointer ${
                        labSoundscape === sound
                          ? 'bg-[#CFDFEF] border-[#96BCE8] text-[#29313E]'
                          : 'bg-white/70 border-[#3A4453]/12 text-[#556070] hover:text-[#29313E]'
                      }`}
                    >
                      {sound}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeLabTab === 'Notes' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-[taskSlideTrack_0.4s_ease-out]">
              {labNotes.map((note) => {
                const isSelected = activeNoteId === note.id;
                return (
                  <div
                    key={note.id}
                    onClick={() => setActiveNoteId(note.id)}
                    className={`p-5 rounded-2xl ${note.tone} border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#29313E]/40 shadow-md -translate-y-1'
                        : 'border-black/5 opacity-90 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-[15px] font-semibold text-[#29313E]">{note.title}</h4>
                      <span className="text-[11px] font-mono-tabular text-[#4E5A6E]">Note</span>
                    </div>
                    <label htmlFor={`lab-note-${note.id}`} className="sr-only">
                      {note.title}
                    </label>
                    <textarea
                      id={`lab-note-${note.id}`}
                      rows={3}
                      value={note.body}
                      onChange={(e) => {
                        const val = e.target.value;
                        setLabNotes((prev) =>
                          prev.map((n) => (n.id === note.id ? { ...n, body: val } : n))
                        );
                      }}
                      className="w-full bg-transparent text-[13.5px] text-[#29313E] leading-relaxed resize-none focus:outline-none"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(halodesk)/halodesk/components/HeroDesktopApp.tsx">
<![CDATA[import React, { useState, useEffect, useRef } from 'react';
import {
  Inbox,
  Calendar as CalendarIcon,
  Folder,
  FileText,
  Search,
  MoreHorizontal,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Check,
  Undo2,
  X,
  Clock,
  Sparkles,
} from 'lucide-react';
import {
  PlannerTask,
  SidebarTab,
  TaskCategory,
  WeekdayKey,
  createQuickTask,
  toggleTaskCompletion,
  formatTimerSeconds,
  computeTimerProgress,
  INITIAL_TASKS,
} from '../lib/plannerLogic';

interface HeroDesktopAppProps {
  tasks: PlannerTask[];
  setTasks: React.Dispatch<React.SetStateAction<PlannerTask[]>>;
  activeSidebarTab: SidebarTab;
  setActiveSidebarTab: (tab: SidebarTab) => void;
  highlightedFeature?: 'Tasks' | 'Calendar' | 'Focus Mode' | 'Notes' | null;
}

const SIDEBAR_ITEMS: Array<{ id: SidebarTab; label: string; icon: React.FC<{ className?: string }> }> = [
  { id: 'Inbox', label: 'Inbox', icon: Inbox },
  { id: 'Today', label: 'Today', icon: CalendarIcon },
  { id: 'Projects', label: 'Projects', icon: Folder },
  { id: 'Calendar', label: 'Calendar', icon: CalendarIcon },
  { id: 'Notes', label: 'Notes', icon: FileText },
];

const WEEKDAYS: WeekdayKey[] = ['Mon', 'Ton', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MINI_WEEK_DAYS = [
  { short: 'M', key: 'Mon' as WeekdayKey, fillClass: 'bg-[#DCD5F6]/70', topDot: true },
  { short: 'T', key: 'Ton' as WeekdayKey, fillClass: 'bg-[#E5E8F0]/75', topDot: false },
  { short: 'W', key: 'Tue' as WeekdayKey, fillClass: 'bg-[#E5E8F0]/75', topDot: false },
  { short: 'T', key: 'Wed' as WeekdayKey, fillClass: 'bg-[#4E5A6E]', topDot: true, isFocusDay: true },
  { short: 'F', key: 'Thu' as WeekdayKey, fillClass: 'bg-[#AEE4CE]', topDot: true },
  { short: 'S', key: 'Fri' as WeekdayKey, fillClass: 'bg-[#E5E8F0]/75', topDot: false },
  { short: 'S', key: 'Sat' as WeekdayKey, fillClass: 'bg-[#E5E8F0]/75', topDot: false },
];

const CATEGORY_STYLES: Record<
  TaskCategory,
  {
    cardBg: string;
    dotBg: string;
    dotBorder: string;
    badgeBg: string;
    label: string;
  }
> = {
  lavender: {
    cardBg: 'bg-[#DFD5FA] hover:bg-[#D7CBF8]',
    dotBg: 'bg-[#DFD5FA]',
    dotBorder: 'border-[#B9A9E8]',
    badgeBg: 'bg-[#C9BBF2]/60 text-[#29313E]',
    label: 'Design & Review',
  },
  powder: {
    cardBg: 'bg-[#C3DCF9] hover:bg-[#B8D4F6]',
    dotBg: 'bg-[#C3DCF9]',
    dotBorder: 'border-[#96BCE8]',
    badgeBg: 'bg-[#A8CBF2]/60 text-[#29313E]',
    label: 'Deep Work',
  },
  peach: {
    cardBg: 'bg-[#F8D6C5] hover:bg-[#F5CCBA]',
    dotBg: 'bg-[#F8D6C5]',
    dotBorder: 'border-[#E2B29B]',
    badgeBg: 'bg-[#F0C1AA]/60 text-[#29313E]',
    label: 'Writing & Editorial',
  },
  mint: {
    cardBg: 'bg-[#C7EFE1] hover:bg-[#BBEAD9]',
    dotBg: 'bg-[#C7EFE1]',
    dotBorder: 'border-[#95D3BD]',
    badgeBg: 'bg-[#AEE4CE]/60 text-[#29313E]',
    label: 'Team Sync',
  },
};

export const HeroDesktopApp: React.FC<HeroDesktopAppProps> = ({
  tasks,
  setTasks,
  activeSidebarTab,
  setActiveSidebarTab,
  highlightedFeature,
}) => {
  const [selectedWeekday, setSelectedWeekday] = useState<WeekdayKey>('Ton');
  const [selectedMiniDayIndex, setSelectedMiniDayIndex] = useState<number>(3);
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const [lastCompletedTask, setLastCompletedTask] = useState<PlannerTask | null>(null);

  // Search and Window Menu
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  // Quick Task Creator state
  const [quickTaskOpen, setQuickTaskOpen] = useState(false);
  const [quickTaskTitle, setQuickTaskTitle] = useState('');
  const [quickTaskCategory, setQuickTaskCategory] = useState<TaskCategory>('lavender');
  const [quickTaskError, setQuickTaskError] = useState<string | null>(null);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');

  // Focus Timer state (25:00 = 1500 seconds)
  const [timerDuration, setTimerDuration] = useState(1500);
  const [remainingSeconds, setRemainingSeconds] = useState(1500);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerMenuOpen, setTimerMenuOpen] = useState(false);

  // Sticky Note state
  const [stickyText, setStickyText] = useState('To-do: Review\nproject draft');
  const [stickyEditing, setStickyEditing] = useState(false);
  const [stickyFolded, setStickyFolded] = useState(false);

  // Subtle pointer depth response
  const containerRef = useRef<HTMLDivElement>(null);
  const [pointerOffset, setPointerOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!timerRunning) return;
    const interval = window.setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          setLiveAnnouncement('Focus session complete. Take a calm breath.');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [timerRunning]);

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    setPointerOffset({
      x: Number((normX * 6).toFixed(2)),
      y: Number((normY * 5).toFixed(2)),
    });
  };

  const handlePointerLeave = () => {
    setPointerOffset({ x: 0, y: 0 });
  };

  // Filter tasks based on sidebar tab, weekday, and search
  const visibleTasks = tasks.filter((t) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return t.title.toLowerCase().includes(q) || t.subtitle.toLowerCase().includes(q);
    }
    if (activeSidebarTab === 'Today') {
      return t.tab === 'Today';
    }
    return t.tab === activeSidebarTab;
  });

  const handleAddQuickTask = (e: React.FormEvent) => {
    e.preventDefault();
    const result = createQuickTask(
      tasks,
      quickTaskTitle,
      quickTaskCategory,
      selectedWeekday,
      activeSidebarTab === 'Notes' ? 'Today' : activeSidebarTab
    );
    if (result.error) {
      setQuickTaskError(result.error);
      return;
    }
    setTasks(result.tasks);
    setQuickTaskTitle('');
    setQuickTaskError(null);
    setQuickTaskOpen(false);
    if (result.created) {
      setLiveAnnouncement(`Added task "${result.created.title}" to ${activeSidebarTab}.`);
    }
  };

  const handleToggleComplete = (taskId: string) => {
    const result = toggleTaskCompletion(tasks, taskId);
    setTasks(result.tasks);
    if (result.changedTask) {
      if (result.changedTask.completed) {
        setLastCompletedTask(result.changedTask);
        setLiveAnnouncement(`Completed "${result.changedTask.title}". Undo available.`);
      } else {
        setLastCompletedTask(null);
        setLiveAnnouncement(`Restored "${result.changedTask.title}" to active tasks.`);
      }
    }
  };

  const progress = computeTimerProgress(remainingSeconds, timerDuration);
  const circleRadius = 56;
  const circleCircumference = 2 * Math.PI * circleRadius;
  // When timer hasn't elapsed yet (25:00), show the signature ~32% top-right arc from reference; as it runs, progress around full circle
  const displayedRatio =
    remainingSeconds === timerDuration && !timerRunning ? 0.32 : Math.max(0.12, 1 - progress * 0.88);
  const strokeDashoffset = circleCircumference * (1 - displayedRatio);

  return (
    <div
      ref={containerRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative w-full select-none"
      aria-label="Halo Desk interactive desktop workspace preview"
    >
      {/* Screen-reader polite announcer for task & timer changes */}
      <div className="sr-only" role="status" aria-live="polite">
        {liveAnnouncement}
      </div>

      {/* Main Desktop Window Container */}
      <div
        style={{
          transform: `translate3d(${pointerOffset.x * 0.35}px, ${pointerOffset.y * 0.35}px, 0)`,
        }}
        className="halo-app-window animate-window-unfold relative rounded-[20px] w-full min-h-[455px] transition-transform duration-300 ease-out overflow-visible"
      >
        <div className="grid grid-cols-1 sm:grid-cols-12 min-h-[455px] rounded-[20px] overflow-hidden">
          {/* Left Navigation Rail */}
          <aside
            aria-label="Workspace sections"
            className="sm:col-span-3 bg-[#F4F2F7]/90 border-b sm:border-b-0 sm:border-r border-[#3A4453]/10 p-4 flex flex-col justify-between"
          >
            <div>
              {/* Traffic Light Window Dots */}
              <div className="flex items-center gap-2 px-1.5 pt-0.5 pb-5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B6B]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#F5B041]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#2ECC71]" />
              </div>

              {/* Sidebar Nav Buttons */}
              <nav aria-label="Planner views" className="flex sm:flex-col gap-1 overflow-x-auto sm:overflow-visible pb-1 sm:pb-0">
                {SIDEBAR_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSidebarTab === item.id;
                  const isHighlighted =
                    (highlightedFeature === 'Tasks' && item.id === 'Today') ||
                    (highlightedFeature === 'Calendar' && item.id === 'Calendar') ||
                    (highlightedFeature === 'Notes' && item.id === 'Notes');

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveSidebarTab(item.id);
                        setExpandedTaskId(null);
                      }}
                      aria-current={isActive ? 'page' : undefined}
                      className={`group flex items-center justify-between gap-2 px-2.5 py-2 rounded-[10px] text-[13px] font-medium transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                        isActive
                          ? 'bg-[#E2DFEC] text-[#29313E] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]'
                          : 'text-[#596475] hover:bg-[#EAE7F2]/60 hover:text-[#29313E]'
                      } ${isHighlighted ? 'ring-2 ring-[#6C798F]/50' : ''}`}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#66717F] group-hover:text-[#29313E] shrink-0" />
                        <span>{item.label}</span>
                      </span>
                      {item.id === 'Today' && (
                        <span className="text-[11px] font-mono-tabular text-[#66717F]">
                          {tasks.filter((t) => t.tab === 'Today' && !t.completed).length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="hidden sm:block h-12" aria-hidden="true" />
          </aside>

          {/* Center Main Planner Column */}
          <div className="sm:col-span-6 bg-[#FAF9FC]/95 p-5 sm:px-5 sm:py-5 flex flex-col justify-between relative">
            {/* Subtle scrollbar thumb on right edge of center pane matching reference */}
            <div
              aria-hidden="true"
              className="hidden sm:block absolute right-1 top-16 h-24 w-[3px] rounded-full bg-[#3A4453]/15"
            />
            <div>
              {/* Planner Header Row */}
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <h2 className="text-[16.5px] font-semibold tracking-[-0.015em] text-[#29313E]">
                  {activeSidebarTab === 'Today'
                    ? 'My Daily Planner'
                    : activeSidebarTab === 'Notes'
                    ? 'Studio Notes & Drafts'
                    : `${activeSidebarTab} View`}
                </h2>

                <div className="flex items-center gap-1 relative">
                  <button
                    type="button"
                    aria-label="Filter planner tasks"
                    aria-expanded={searchOpen}
                    onClick={() => setSearchOpen((prev) => !prev)}
                    className="w-7 h-7 rounded-lg inline-flex items-center justify-center text-[#66717F] hover:text-[#29313E] hover:bg-black/5 transition-colors cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Planner options"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="w-7 h-7 rounded-lg inline-flex items-center justify-center text-[#66717F] hover:text-[#29313E] hover:bg-black/5 transition-colors cursor-pointer"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 top-8 z-30 w-44 rounded-xl bg-[#FCFBF7] border border-[#3A4453]/15 shadow-lg p-1.5 text-[12.5px]">
                      <button
                        type="button"
                        onClick={() => {
                          setTasks(INITIAL_TASKS);
                          setLastCompletedTask(null);
                          setMenuOpen(false);
                          setLiveAnnouncement('Reset planner tasks to default demo state.');
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#DCD5F6]/40 text-[#29313E] cursor-pointer"
                      >
                        Reset demo tasks
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setQuickTaskOpen(true);
                          setMenuOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#DCD5F6]/40 text-[#29313E] cursor-pointer"
                      >
                        New task…
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Optional live search bar */}
              {searchOpen && (
                <div className="mb-3 flex items-center gap-2 bg-white/90 border border-[#3A4453]/15 rounded-lg px-2.5 py-1.5">
                  <Search className="w-3.5 h-3.5 text-[#66717F] shrink-0" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter tasks by title..."
                    aria-label="Filter tasks by title"
                    className="w-full text-[12.5px] bg-transparent text-[#29313E] placeholder:text-[#66717F] focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      aria-label="Clear search"
                      onClick={() => setSearchQuery('')}
                      className="text-[#66717F] hover:text-[#29313E]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              {/* Weekday Strip matching reference: Mon Ton Tue Wed Thu Fri Sat */}
              <div
                role="tablist"
                aria-label="Select day of week"
                className="flex items-center justify-between gap-0.5 mb-4"
              >
                {WEEKDAYS.map((day) => {
                  const active = selectedWeekday === day;
                  return (
                    <button
                      key={day}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setSelectedWeekday(day)}
                      className={`px-2 py-0.5 rounded-full text-[11.5px] font-medium transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-[#E5E2EE] text-[#29313E] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]'
                          : 'text-[#66717F] hover:text-[#29313E]'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Notes Tab View vs Task Timeline View */}
              {activeSidebarTab === 'Notes' ? (
                <div className="space-y-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-[#FFF6C7]/80 border border-[#E5D68A]/50">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[12.5px] font-semibold text-[#29313E]">
                        Synced Sticky Note
                      </span>
                      <span className="text-[11px] text-[#66717F]">Updated just now</span>
                    </div>
                    <label htmlFor="notes-tab-textarea" className="sr-only">
                      Studio note content
                    </label>
                    <textarea
                      id="notes-tab-textarea"
                      rows={4}
                      value={stickyText}
                      onChange={(e) => setStickyText(e.target.value)}
                      className="w-full bg-transparent text-[13px] text-[#29313E] leading-relaxed resize-none focus:outline-none"
                    />
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#DFD5FA]/45 border border-[#B9A9E8]/30">
                    <p className="text-[12.5px] font-medium text-[#29313E]">
                      Design principle note
                    </p>
                    <p className="text-[12px] text-[#596475] mt-1 leading-relaxed">
                      Keep morning blocks free of status meetings so deep work happens before context switching begins.
                    </p>
                  </div>
                </div>
              ) : (
                /* Timeline & Horizontally Stretched Pastel Task Tiles */
                <div className="relative pl-5 space-y-2.5">
                  {/* Subtle vertical timeline line */}
                  <div
                    aria-hidden="true"
                    className="absolute left-[6px] top-3 bottom-3 w-[1px] bg-[#3A4453]/12"
                  />

                  {visibleTasks.map((task, idx) => {
                    const style = CATEGORY_STYLES[task.category];
                    const isExpanded = expandedTaskId === task.id;
                    const rowAnimClass =
                      idx === 0
                        ? 'animate-task-row-1'
                        : idx === 1
                        ? 'animate-task-row-2'
                        : idx === 2
                        ? 'animate-task-row-3'
                        : 'animate-task-row-4';

                    return (
                      <div key={task.id} className={`relative ${rowAnimClass}`}>
                        {/* Timeline circular node */}
                        <button
                          type="button"
                          aria-label={
                            task.completed
                              ? `Mark "${task.title}" as incomplete`
                              : `Complete "${task.title}"`
                          }
                          onClick={() => handleToggleComplete(task.id)}
                          className={`absolute -left-5 top-3.5 w-3.5 h-3.5 rounded-full border ${style.dotBorder} ${style.dotBg} flex items-center justify-center transition-transform duration-150 hover:scale-125 cursor-pointer`}
                        >
                          {task.completed && <Check className="w-2.5 h-2.5 text-[#29313E]" />}
                        </button>

                        {/* Pastel Task Tile */}
                        <div
                          className={`rounded-[11px] transition-all duration-200 ${style.cardBg} ${
                            task.completed ? 'opacity-60' : ''
                          } shadow-[0_2px_6px_rgba(41,49,62,0.04)] hover:-translate-y-[1px] hover:shadow-[0_6px_14px_rgba(41,49,62,0.08)]`}
                        >
                          <div
                            role="button"
                            tabIndex={0}
                            aria-expanded={isExpanded}
                            onClick={() =>
                              setExpandedTaskId((prev) => (prev === task.id ? null : task.id))
                            }
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setExpandedTaskId((prev) => (prev === task.id ? null : task.id));
                              }
                            }}
                            className="w-full text-left px-3.5 py-2.5 flex items-center justify-between gap-2 cursor-pointer rounded-[11px] focus-visible:outline-2 focus-visible:outline-[#29313E]"
                          >
                            <div className="min-w-0">
                              <p
                                className={`text-[13.5px] font-medium text-[#232A36] leading-snug truncate ${
                                  task.completed ? 'line-through' : ''
                                }`}
                              >
                                {task.title}
                              </p>
                              <p className="text-[11.5px] text-[#556070] mt-0.5 truncate">
                                {selectedWeekday !== 'Ton' && task.subtitle === 'Today'
                                  ? `${selectedWeekday} · ${task.duration}`
                                  : task.subtitle}
                              </p>
                            </div>

                            {/* Avatars cluster on first task matching screenshot */}
                            {task.hasAvatars && (
                              <div className="flex items-center -space-x-1.5 shrink-0 self-end">
                                <span
                                  aria-hidden="true"
                                  className="w-5 h-5 rounded-full bg-[#F5D0C5] border border-white flex items-center justify-center text-[9px] font-semibold text-[#29313E]"
                                >
                                  M
                                </span>
                                <span
                                  aria-hidden="true"
                                  className="w-5 h-5 rounded-full bg-[#C7EFE1] border border-white flex items-center justify-center text-[9px] font-semibold text-[#29313E]"
                                >
                                  L
                                </span>
                                <span
                                  aria-hidden="true"
                                  className="w-5 h-5 rounded-full bg-[#FFF1AE] border border-white flex items-center justify-center text-[9px] font-semibold text-[#29313E]"
                                >
                                  A
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Inline Expanded Task Details Drawer */}
                          {isExpanded && (
                            <div className="px-3.5 pb-3 pt-1 border-t border-[#29313E]/10 text-[12px] text-[#3A4453] space-y-2">
                              <div className="flex items-center justify-between text-[11px] text-[#556070]">
                                <span>
                                  {task.energy} · {task.duration}
                                </span>
                                <span>{style.label}</span>
                              </div>
                              <p className="leading-relaxed text-[#29313E]/90">{task.notes}</p>
                              <div className="flex items-center justify-between pt-1">
                                <button
                                  type="button"
                                  onClick={() => handleToggleComplete(task.id)}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/80 hover:bg-white text-[#29313E] font-medium text-[11.5px] transition-colors cursor-pointer"
                                >
                                  <Check className="w-3 h-3" />
                                  {task.completed ? 'Mark active' : 'Complete task'}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setTimerDuration(25 * 60);
                                    setRemainingSeconds(25 * 60);
                                    setTimerRunning(true);
                                    setLiveAnnouncement(`Started 25-minute focus timer for ${task.title}`);
                                  }}
                                  className="inline-flex items-center gap-1 text-[11.5px] font-medium text-[#29313E] hover:underline cursor-pointer"
                                >
                                  <Clock className="w-3 h-3" />
                                  Focus 25m
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {visibleTasks.length === 0 && (
                    <div className="py-8 text-center">
                      <p className="text-[13px] text-[#66717F]">No tasks match your filter.</p>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('');
                          setActiveSidebarTab('Today');
                        }}
                        className="mt-2 text-[12px] font-medium text-[#29313E] underline cursor-pointer"
                      >
                        Show Today’s tasks
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Undo Banner when a task is completed */}
            {lastCompletedTask && (
              <div className="mt-3 px-3 py-1.5 rounded-lg bg-[#29313E] text-[#FCFBF7] text-[11.5px] flex items-center justify-between">
                <span className="truncate">Completed “{lastCompletedTask.title}”</span>
                <button
                  type="button"
                  onClick={() => handleToggleComplete(lastCompletedTask.id)}
                  className="inline-flex items-center gap-1 font-medium text-[#FFF1AE] hover:underline ml-2 shrink-0 cursor-pointer"
                >
                  <Undo2 className="w-3 h-3" />
                  Undo
                </button>
              </div>
            )}
          </div>

          {/* Right Widget Dock Column (inside window on mobile, overlapped by floating widgets on desktop) */}
          <div className="sm:col-span-3 bg-[#F4F2F7]/65 border-t sm:border-t-0 sm:border-l border-[#3A4453]/10 p-3.5 flex flex-col gap-3">
            {/* Weekly Calendar Mini-Window */}
            <div
              style={{
                transform: `translate3d(${pointerOffset.x * -0.45}px, ${pointerOffset.y * -0.35}px, 0)`,
              }}
              className={`halo-widget-surface animate-widget-calendar rounded-[15px] p-3.5 transition-transform duration-300 ${
                highlightedFeature === 'Calendar' ? 'ring-2 ring-[#6C798F]' : ''
              }`}
            >
              <p className="text-[12px] font-semibold text-[#29313E] mb-2">Weekly Calendar</p>

              {/* M T W T F S S header + vertical pill bars */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {MINI_WEEK_DAYS.map((d, idx) => {
                  const isSelected = selectedMiniDayIndex === idx;
                  return (
                    <button
                      key={`${d.short}-${idx}`}
                      type="button"
                      aria-label={`Select ${d.key} in weekly calendar`}
                      aria-pressed={isSelected}
                      onClick={() => {
                        setSelectedMiniDayIndex(idx);
                        setSelectedWeekday(d.key);
                      }}
                      className="flex flex-col items-center gap-1 group cursor-pointer focus-visible:outline-1 focus-visible:outline-[#29313E] rounded"
                    >
                      <span className="text-[10px] font-medium text-[#66717F] group-hover:text-[#29313E]">
                        {d.short}
                      </span>
                      <span
                        className={`w-full h-6 rounded-[5px] transition-all flex items-start justify-center pt-1 ${
                          isSelected
                            ? 'bg-[#4E5A6E] shadow-sm scale-105'
                            : idx === 4
                            ? 'bg-[#AEE4CE]'
                            : idx === 0
                            ? 'bg-[#DCD5F6]'
                            : 'bg-[#E6E8F0] group-hover:bg-[#D8DCE8]'
                        }`}
                      >
                        {d.topDot && (
                          <span
                            className={`w-1.5 h-0.5 rounded-full ${
                              isSelected ? 'bg-white/80' : 'bg-[#66717F]/50'
                            }`}
                          />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Dark pill badge: Focus active */}
              <div className="mt-2.5 flex justify-center">
                <div className="relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#3A4352] text-[#FCFBF7] text-[10.5px] font-medium shadow-sm">
                  <span
                    aria-hidden="true"
                    className=" -top-1 left-1/2 -translate-x-1/2 absolute w-2 h-2 rotate-45 bg-[#3A4352]"
                  />
                  <Sparkles className="w-2.5 h-2.5 text-[#D0EFE2] relative z-10" />
                  <span className="relative z-10">
                    {timerRunning ? 'Timer running' : 'Focus active'}
                  </span>
                </div>
              </div>
            </div>

            {/* Focus Timer Ring Mini-Window */}
            <div
              style={{
                transform: `translate3d(${pointerOffset.x * -0.5}px, ${pointerOffset.y * -0.4}px, 0)`,
              }}
              className={`halo-widget-surface rounded-[16px] p-3.5 relative flex flex-col items-center justify-center transition-transform duration-300 ${
                highlightedFeature === 'Focus Mode' ? 'ring-2 ring-[#6C798F]' : ''
              }`}
            >
              {/* Top-right 3-dots timer preset button */}
              <div className="w-full flex justify-end">
                <button
                  type="button"
                  aria-label="Focus timer presets"
                  aria-expanded={timerMenuOpen}
                  onClick={() => setTimerMenuOpen((prev) => !prev)}
                  className="w-6 h-6 rounded-full inline-flex items-center justify-center text-[#66717F] hover:text-[#29313E] hover:bg-black/5 cursor-pointer"
                >
                  <MoreHorizontal className="w-3.5 h-3.5 rotate-90" />
                </button>
              </div>

              {timerMenuOpen && (
                <div className="absolute right-2 top-8 z-30 w-32 rounded-xl bg-[#FCFBF7] border border-[#3A4453]/15 shadow-lg p-1 text-[11.5px]">
                  {[
                    { label: '25:00 Focus', secs: 1500 },
                    { label: '15:00 Sprint', secs: 900 },
                    { label: '05:00 Breather', secs: 300 },
                  ].map((preset) => (
                    <button
                      key={preset.secs}
                      type="button"
                      onClick={() => {
                        setTimerDuration(preset.secs);
                        setRemainingSeconds(preset.secs);
                        setTimerRunning(false);
                        setTimerMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1 rounded-md hover:bg-[#CFDFEF]/50 text-[#29313E] cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setRemainingSeconds(timerDuration);
                      setTimerRunning(false);
                      setTimerMenuOpen(false);
                    }}
                    className="w-full text-left px-2 py-1 rounded-md hover:bg-[#F7D9CB]/50 text-[#29313E] flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                </div>
              )}

              {/* Circular SVG Timer Ring */}
              <div className="relative w-32 h-32 flex items-center justify-center -mt-2">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128" aria-hidden="true">
                  <circle
                    cx="64"
                    cy="64"
                    r={circleRadius}
                    stroke="#DCE0E9"
                    strokeWidth="6.5"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r={circleRadius}
                    stroke="#6F7D95"
                    strokeWidth="6.5"
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={circleCircumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-500 ease-out"
                  />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10.5px] font-medium text-[#66717F]">Focus Timer</span>
                  <span className="text-[22px] font-semibold font-mono-tabular tracking-tight text-[#29313E] leading-tight my-0.5">
                    {formatTimerSeconds(remainingSeconds)}
                  </span>

                  <div className="flex items-center gap-1.5 mt-1">
                    <button
                      type="button"
                      aria-label={timerRunning ? 'Pause focus timer' : 'Start focus timer'}
                      aria-pressed={timerRunning}
                      onClick={() => setTimerRunning((prev) => !prev)}
                      className="w-7 h-7 rounded-full bg-[#6C798F] hover:bg-[#566276] active:scale-95 text-white inline-flex items-center justify-center shadow-sm transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29313E]"
                    >
                      {timerRunning ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5 translate-x-[0.5px]" />
                      )}
                    </button>

                    {remainingSeconds !== timerDuration && (
                      <button
                        type="button"
                        aria-label="Reset focus timer"
                        onClick={() => {
                          setTimerRunning(false);
                          setRemainingSeconds(timerDuration);
                        }}
                        className="w-6 h-6 rounded-full bg-[#E5E8F0] hover:bg-[#D5DAE6] text-[#29313E] inline-flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Bottom-Left Stacked "+ Quick Task" Chip */}
        <div
          style={{
            transform: `translate3d(${pointerOffset.x * -0.6}px, ${pointerOffset.y * 0.4}px, 0)`,
          }}
          className="animate-widget-quicktask sm:absolute sm:-left-5 sm:bottom-5 z-20 mt-3 sm:mt-0 px-3 sm:px-0"
        >
          {!quickTaskOpen ? (
            <div className="relative inline-block">
              {/* Stacked paper layers underneath matching reference */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute top-2.5 left-2 right-2 h-8 rounded-[11px] bg-[#ECEAEF]/85 border border-white/70 shadow-sm"
              />
              <div
                aria-hidden="true"
                className="hidden sm:block absolute top-1.5 left-1 right-1 h-8 rounded-[11px] bg-[#F4F3F7]/90 border border-white/80 shadow-sm"
              />
              <button
                type="button"
                onClick={() => {
                  setQuickTaskOpen(true);
                  setQuickTaskError(null);
                }}
                className="relative flex items-center gap-2 px-4 py-2.5 min-w-[144px] rounded-[11px] bg-[#FAF9FC] hover:bg-white text-[#29313E] text-[13px] font-medium border border-white shadow-[0_10px_24px_-6px_rgba(41,49,62,0.16)] transition-all duration-150 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#29313E]"
              >
                <Plus className="w-3.5 h-3.5 text-[#596475]" />
                <span>Quick Task</span>
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleAddQuickTask}
              className="w-full sm:w-64 p-3.5 rounded-2xl bg-[#FCFBF7] border border-[#3A4453]/15 shadow-[0_18px_38px_-10px_rgba(41,49,62,0.22)] space-y-2.5"
            >
              <div className="flex items-center justify-between">
                <label
                  htmlFor="hero-quick-task-input"
                  className="text-[12px] font-semibold text-[#29313E]"
                >
                  New Quick Task
                </label>
                <button
                  type="button"
                  aria-label="Cancel quick task"
                  onClick={() => {
                    setQuickTaskOpen(false);
                    setQuickTaskError(null);
                  }}
                  className="text-[#66717F] hover:text-[#29313E] p-0.5 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <input
                id="hero-quick-task-input"
                type="text"
                value={quickTaskTitle}
                onChange={(e) => {
                  setQuickTaskTitle(e.target.value);
                  if (quickTaskError) setQuickTaskError(null);
                }}
                placeholder="e.g. Draft quarterly roadmap"
                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#3A4453]/20 text-[12.5px] text-[#29313E] placeholder:text-[#66717F]/70 focus:outline-2 focus:outline-[#6C798F]"
              />

              {quickTaskError && (
                <p role="alert" className="text-[11px] text-[#B84A39] leading-tight">
                  {quickTaskError}
                </p>
              )}

              {/* Category selector pills */}
              <div className="flex items-center justify-between gap-1 pt-0.5">
                {(['lavender', 'powder', 'peach', 'mint'] as TaskCategory[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    aria-label={`Color category ${cat}`}
                    aria-pressed={quickTaskCategory === cat}
                    onClick={() => setQuickTaskCategory(cat)}
                    className={`h-5 flex-1 rounded-md border transition-transform cursor-pointer ${
                      CATEGORY_STYLES[cat].dotBg
                    } ${
                      quickTaskCategory === cat
                        ? 'border-[#29313E] scale-105'
                        : 'border-transparent opacity-75'
                    }`}
                  />
                ))}
              </div>

              <div className="flex justify-end gap-1.5 pt-1">
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-[#29313E] hover:bg-[#3A4556] text-white text-[12px] font-medium transition-colors cursor-pointer"
                >
                  Add to Planner
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Floating Bottom-Right Pale-Yellow Sticky Note */}
        <div
          style={{
            transform: `translate3d(${pointerOffset.x * -0.7}px, ${pointerOffset.y * -0.5}px, 0) rotate(2deg)`,
          }}
          className={`animate-widget-sticky sm:absolute sm:right-3 sm:-bottom-6 z-20 mt-3 sm:mt-0 mx-3 sm:mx-0 sm:w-[154px] rounded-[4px] sticky-note-paper p-3.5 relative ${
            highlightedFeature === 'Notes' ? 'ring-2 ring-[#29313E]' : ''
          }`}
        >
          {/* Subtle top adhesive strip */}
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-2.5 bg-[#F2DF8D]/55 rounded-t-[4px]"
          />

          {stickyEditing ? (
            <div className="pt-1">
              <label htmlFor="sticky-note-editor" className="sr-only">
                Edit sticky note
              </label>
              <textarea
                id="sticky-note-editor"
                rows={3}
                value={stickyText}
                onChange={(e) => setStickyText(e.target.value)}
                onBlur={() => setStickyEditing(false)}
                autoFocus
                className="w-full bg-transparent text-[13px] font-medium text-[#2E3440] leading-snug resize-none focus:outline-none"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStickyEditing(false)}
                  className="text-[10.5px] font-semibold text-[#29313E] underline cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setStickyEditing(true)}
                aria-label="Edit sticky note text"
                className="w-full text-left text-[13.5px] font-normal text-[#2E3440] leading-[1.35] whitespace-pre-line cursor-pointer focus-visible:outline-1 focus-visible:outline-[#29313E]"
              >
                {stickyText}
              </button>
              <div className="mt-4 flex items-center justify-between text-[10px] text-[#6B633B]">
                <span>Click to edit</span>
                <button
                  type="button"
                  aria-label="Toggle sticky note corner fold"
                  aria-pressed={stickyFolded}
                  onClick={() => setStickyFolded((prev) => !prev)}
                  className="hover:underline cursor-pointer"
                >
                  {stickyFolded ? 'Unfold' : 'Pin'}
                </button>
              </div>
            </div>
          )}

          {/* Realistic folded bottom-right corner */}
          <div
            aria-hidden="true"
            className={`absolute bottom-0 right-0 transition-all duration-200 ${
              stickyFolded
                ? 'w-5 h-5 bg-gradient-to-tl from-[#E0CA72] via-[#EBD888] to-transparent rounded-tl-md shadow-sm'
                : 'w-2.5 h-2.5 bg-gradient-to-tl from-[#E5D07E] to-transparent'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(halodesk)/halodesk/components/MeaningfulDetailsSection.tsx">
<![CDATA[import React, { useState } from 'react';
import { Bell, BellOff, CornerDownLeft, Eye, EyeOff } from 'lucide-react';

export const MeaningfulDetailsSection: React.FC = () => {
  // Mini-demo 1: Quick capture shortcut simulator
  const [captureDraft, setCaptureDraft] = useState('Send colour tokens to studio');
  const [capturedList, setCapturedList] = useState<string[]>([
    'Review Friday changelog notes',
  ]);

  // Mini-demo 2: Thoughtful reminders (defer until focus ends)
  const [deferNudges, setDeferNudges] = useState(true);

  // Mini-demo 3: Room for deep work (ambient chrome dimmer)
  const [dimChrome, setDimChrome] = useState(true);

  const handleCaptureSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = captureDraft.trim();
    if (!trimmed) return;
    setCapturedList((prev) => [trimmed, ...prev.slice(0, 2)]);
    setCaptureDraft('');
  };

  return (
    <section
      id="details"
      aria-labelledby="details-heading"
      className="relative w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 py-20 lg:py-28"
    >
      {/* Editorial Intro */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#29313E]/15">
        <div className="space-y-3 max-w-xl">
          <p className="text-[13px] font-medium text-[#66717F] tracking-wide">
            Craft & Restraint
          </p>
          <h2
            id="details-heading"
            className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.025em] text-[#29313E] leading-[1.1] text-balance"
          >
            Small, meaningful details that respect your attention.
          </h2>
        </div>

        {/* Honest interface behavior measurements (not fabricated business metrics) */}
        <div className="flex flex-wrap items-center gap-8 text-[#29313E]">
          <div>
            <p className="text-[22px] font-semibold font-mono-tabular">0 badges</p>
            <p className="text-[12.5px] text-[#556070]">No unread red counters in Focus Mode</p>
          </div>
          <div className="h-8 w-[1px] bg-[#29313E]/15 hidden sm:block" aria-hidden="true" />
          <div>
            <p className="text-[22px] font-semibold font-mono-tabular">1 keystroke</p>
            <p className="text-[12.5px] text-[#556070]">Global quick capture to Inbox</p>
          </div>
        </div>
      </div>

      {/* Three Horizontal Typographic Rows with Miniature Interactive Demos */}
      <div className="divide-y divide-[#29313E]/15 border-b border-[#29313E]/15">
        {/* Detail 1: Quick capture */}
        <div className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
          <div className="lg:col-span-5 space-y-2">
            <span className="text-[12.5px] font-mono-tabular text-[#66717F]">Detail 01</span>
            <h3 className="text-[24px] font-semibold text-[#29313E] tracking-[-0.015em]">
              <span className="bg-gradient-to-r from-[#29313E] to-[#29313E] bg-[length:0%_1.5px] group-hover:bg-[length:100%_1.5px] bg-no-repeat bg-left-bottom transition-[background-size] duration-500 pb-0.5">
                Quick capture
              </span>
            </h3>
            <p className="text-[15px] text-[#556070] leading-[1.6] max-w-md">
              Capture an idea the moment it surfaces without leaving your current window. Press Enter below to test how thoughts tuck quietly into your Inbox queue.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="p-5 rounded-2xl bg-[#FCFBF7]/90 border border-[#3A4453]/12 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <form onSubmit={handleCaptureSubmit} className="flex-1 flex items-center gap-2">
                <label htmlFor="mini-capture-input" className="sr-only">
                  Quick capture demo input
                </label>
                <input
                  id="mini-capture-input"
                  type="text"
                  value={captureDraft}
                  onChange={(e) => setCaptureDraft(e.target.value)}
                  placeholder="Type a quick thought and press Enter…"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F4F2F7] border border-[#3A4453]/15 text-[13.5px] text-[#29313E] placeholder:text-[#66717F] focus:outline-2 focus:outline-[#29313E]"
                />
                <button
                  type="submit"
                  aria-label="Save quick capture"
                  className="px-3.5 py-2 rounded-xl bg-[#29313E] text-[#FCFBF7] text-[12.5px] font-medium inline-flex items-center gap-1.5 shrink-0 cursor-pointer hover:bg-[#3B4658]"
                >
                  <span>Save</span>
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </form>

              <div className="sm:w-56 space-y-1">
                <span className="text-[11px] font-mono-tabular text-[#66717F]">
                  Inbox Tray ({capturedList.length})
                </span>
                {capturedList.map((item, idx) => (
                  <div
                    key={`${item}-${idx}`}
                    className="px-2.5 py-1 rounded-lg bg-[#DCD5F6]/55 text-[12px] text-[#29313E] truncate"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Detail 2: Thoughtful reminders */}
        <div className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
          <div className="lg:col-span-5 space-y-2">
            <span className="text-[12.5px] font-mono-tabular text-[#66717F]">Detail 02</span>
            <h3 className="text-[24px] font-semibold text-[#29313E] tracking-[-0.015em]">
              <span className="bg-gradient-to-r from-[#29313E] to-[#29313E] bg-[length:0%_1.5px] group-hover:bg-[length:100%_1.5px] bg-no-repeat bg-left-bottom transition-[background-size] duration-500 pb-0.5">
                Thoughtful reminders
              </span>
            </h3>
            <p className="text-[15px] text-[#556070] leading-[1.6] max-w-md">
              Reminders wait until your active 25-minute timer finishes before appearing—neverchiming in the middle of a sentence or code block.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="p-5 rounded-2xl bg-[#FCFBF7]/90 border border-[#3A4453]/12 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <span
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    deferNudges ? 'bg-[#D0EFE2] text-[#29313E]' : 'bg-[#F7D9CB] text-[#29313E]'
                  }`}
                >
                  {deferNudges ? <BellOff className="w-4 h-4" /> : <Bell className="w-4 h-4" />}
                </span>
                <div>
                  <p className="text-[14px] font-semibold text-[#29313E]">
                    {deferNudges
                      ? 'Holding 2 reminders until Focus Timer ends'
                      : 'Immediate banner notifications active'}
                  </p>
                  <p className="text-[12.5px] text-[#556070]">
                    {deferNudges
                      ? 'Next gentle summary scheduled for 10:25 AM'
                      : 'Interrupts immediately when scheduled time arrives'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-pressed={deferNudges}
                onClick={() => setDeferNudges((prev) => !prev)}
                className="px-4 py-2 rounded-full border border-[#29313E]/20 bg-white hover:bg-[#F4F2F7] text-[12.5px] font-medium text-[#29313E] transition-colors cursor-pointer"
              >
                {deferNudges ? 'Switch to Immediate' : 'Hold During Focus'}
              </button>
            </div>
          </div>
        </div>

        {/* Detail 3: Room for deep work */}
        <div className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center group">
          <div className="lg:col-span-5 space-y-2">
            <span className="text-[12.5px] font-mono-tabular text-[#66717F]">Detail 03</span>
            <h3 className="text-[24px] font-semibold text-[#29313E] tracking-[-0.015em]">
              <span className="bg-gradient-to-r from-[#29313E] to-[#29313E] bg-[length:0%_1.5px] group-hover:bg-[length:100%_1.5px] bg-no-repeat bg-left-bottom transition-[background-size] duration-500 pb-0.5">
                Room for deep work
              </span>
            </h3>
            <p className="text-[15px] text-[#556070] leading-[1.6] max-w-md">
              Soften surrounding navigation rails with a single toggle so only your current task and margin sticky note stay at full contrast.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="p-5 rounded-2xl bg-[#FCFBF7]/90 border border-[#3A4453]/12 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-[220px]">
                <div
                  className={`px-3 py-2 rounded-lg bg-[#E5E8F0] text-[12px] text-[#556070] transition-opacity duration-300 ${
                    dimChrome ? 'opacity-35' : 'opacity-100'
                  }`}
                >
                  Sidebar rail
                </div>
                <div className="px-3.5 py-2 rounded-lg bg-[#CFDFEF] text-[12.5px] font-semibold text-[#29313E] shadow-xs">
                  Active Deep Work Block
                </div>
                <div
                  className={`px-3 py-2 rounded-lg bg-[#FFF1AE] text-[12px] text-[#29313E] transition-opacity duration-300 ${
                    dimChrome ? 'opacity-95' : 'opacity-100'
                  }`}
                >
                  Sticky note
                </div>
              </div>

              <button
                type="button"
                aria-pressed={dimChrome}
                onClick={() => setDimChrome((prev) => !prev)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#29313E]/20 bg-white hover:bg-[#F4F2F7] text-[12.5px] font-medium text-[#29313E] transition-colors cursor-pointer"
              >
                {dimChrome ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{dimChrome ? 'Restore peripheral UI' : 'Dim peripheral UI'}</span>
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
    <file path="src/app/(halodesk)/halodesk/components/Navbar.tsx">
<![CDATA[import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenEarlyAccess: (mode: 'download' | 'login' | 'start') => void;
}

export const HaloLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Outer vessel / halo contour */}
    <path
      d="M7.5 12.5C6.2 14.8 6.3 18.2 7.8 21.1C9.5 24.3 12.6 26 16 26C19.4 26 22.5 24.3 24.2 21.1C25.7 18.2 25.8 14.8 24.5 12.5"
      stroke="#5C6675"
      strokeWidth="1.6"
      strokeLinecap="round"
      className="animate-halo-trace"
    />
    <path
      d="M9.2 13.8C8.3 15.8 8.4 18.4 9.6 20.6C11 23.1 13.4 24.4 16 24.4C18.6 24.4 21 23.1 22.4 20.6C23.6 18.4 23.7 15.8 22.8 13.8"
      stroke="#5C6675"
      strokeWidth="1.15"
      strokeLinecap="round"
      opacity="0.72"
    />
    {/* Top halo rim ellipse */}
    <ellipse
      cx="16"
      cy="11.2"
      rx="6.8"
      ry="2.2"
      stroke="#5C6675"
      strokeWidth="1.5"
      className="animate-halo-trace"
    />
    <path
      d="M11.2 11.4C12.5 10.6 14.2 10.2 16 10.2C17.8 10.2 19.5 10.6 20.8 11.4"
      stroke="#5C6675"
      strokeWidth="1.1"
      strokeLinecap="round"
      opacity="0.65"
    />
  </svg>
);

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Templates', href: '#templates' },
  { label: 'Pricing', href: '#pricing' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenEarlyAccess }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-30 w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 pt-7 pb-4">
      <div className="flex items-center justify-between gap-8">
        {/* Zone 1: Brand lockup */}
        <a
          href="#home"
          className="group inline-flex items-center gap-2.5 text-[#29313E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#29313E] rounded-lg whitespace-nowrap shrink-0"
        >
          <HaloLogoIcon className="w-7 h-7 transition-transform duration-300 group-hover:scale-105" />
          <span className="text-[22px] font-medium tracking-[-0.02em] text-[#29313E]">
            Halo Desk
          </span>
        </a>

        {/* Zone 2: Restrained centered links */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-9 text-[15px] font-normal text-[#4A5565]"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHoveredIdx(index)}
              className="relative py-1.5 text-[#4A5565] hover:text-[#29313E] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#29313E] rounded"
            >
              {link.label}
              <span
                aria-hidden="true"
                className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#29313E] rounded-full transition-transform duration-200 origin-left ${
                  hoveredIdx === index ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </a>
          ))}
        </nav>

        {/* Zone 3: Right actions */}
        <div className="hidden md:flex items-center gap-6 shrink-0">
          <button
            type="button"
            onClick={() => onOpenEarlyAccess('login')}
            className="text-[15px] font-normal text-[#4A5565] hover:text-[#29313E] transition-colors py-2 px-2 rounded-lg whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29313E]"
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => onOpenEarlyAccess('start')}
            className="px-5 py-2.5 rounded-full bg-[#6C798F] hover:bg-[#5B677C] active:scale-[0.98] text-[#FCFBF7] text-[15px] font-medium transition-all duration-200 shadow-[0_4px_12px_rgba(74,85,104,0.18)] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29313E]"
          >
            Start Free
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full text-[#29313E] hover:bg-black/5 transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile collapsible navigation */}
      {mobileOpen && (
        <div className="md:hidden mt-4 p-5 rounded-2xl bg-[#FCFBF7]/95 backdrop-blur-md border border-[#3A4453]/12 shadow-lg space-y-4">
          <nav aria-label="Mobile" className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 px-3 rounded-lg text-[15px] font-medium text-[#29313E] hover:bg-[#CFDFEF]/35 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#3A4453]/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenEarlyAccess('login');
              }}
              className="w-1/2 py-2.5 rounded-full border border-[#3A4453]/20 text-[14px] font-medium text-[#29313E]"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenEarlyAccess('start');
              }}
              className="w-1/2 py-2.5 rounded-full bg-[#6C798F] text-[#FCFBF7] text-[14px] font-medium"
            >
              Start Free
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
]]>
    </file>
    <file path="src/app/(halodesk)/halodesk/components/PricingPreviewSection.tsx">
<![CDATA[import React, { useState } from 'react';
import { ArrowUp, Check, Sparkles, Monitor, Play, X } from 'lucide-react';
import { validateEarlyAccessEmail } from '../lib/plannerLogic';
import { HaloLogoIcon } from './Navbar';

interface PricingPreviewSectionProps {
  modalState: { open: boolean; mode: 'download' | 'login' | 'start' };
  onOpenModal: (mode: 'download' | 'login' | 'start') => void;
  onCloseModal: () => void;
}

export const PricingPreviewSection: React.FC<PricingPreviewSectionProps> = ({
  modalState,
  onOpenModal,
  onCloseModal,
}) => {
  // Inline Section G Early Access Local Demo Form
  const [inlineEmail, setInlineEmail] = useState('');
  const [inlinePlatform, setInlinePlatform] = useState<'macOS' | 'Windows' | 'Linux'>('macOS');
  const [inlineError, setInlineError] = useState<string | null>(null);
  const [inlineSubmitted, setInlineSubmitted] = useState(false);

  // Modal Form state
  const [modalEmail, setModalEmail] = useState('');
  const [modalError, setModalError] = useState<string | null>(null);
  const [modalSaved, setModalSaved] = useState(false);

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const check = validateEarlyAccessEmail(inlineEmail);
    if (!check.valid) {
      setInlineError(check.error || 'Invalid email');
      return;
    }
    setInlineError(null);
    setInlineSubmitted(true);
    try {
      localStorage.setItem(
        'halo_desk_demo_interest',
        JSON.stringify({ email: inlineEmail.trim(), platform: inlinePlatform })
      );
    } catch {
      // Ignore storage errors in restricted environments
    }
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const check = validateEarlyAccessEmail(modalEmail);
    if (!check.valid) {
      setModalError(check.error || 'Invalid email');
      return;
    }
    setModalError(null);
    setModalSaved(true);
  };

  return (
    <>
      {/* SECTION G — Pricing / Honest Product Preview */}
      <section
        id="pricing"
        aria-labelledby="pricing-heading"
        className="relative w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 py-20 lg:py-28"
      >
        <div className="max-w-2xl space-y-3 mb-12">
          <p className="text-[13px] font-medium text-[#66717F] tracking-wide">
            Product Access & Preview Status
          </p>
          <h2
            id="pricing-heading"
            className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.025em] text-[#29313E] leading-[1.1] text-balance"
          >
            Explore the interactive preview right here.
          </h2>
          <p className="text-[16px] text-[#556070] leading-[1.6]">
            Halo Desk is a concept desktop productivity environment in interactive preview. There are no paywalls, subscriptions, or binary installers required to try the full interface on this page.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card 1: Interactive On-Page Preview */}
          <div className="lg:col-span-6 rounded-[24px] bg-[#FCFBF7] border border-[#3A4453]/14 p-7 sm:p-9 flex flex-col justify-between shadow-[0_18px_40px_-18px_rgba(41,49,62,0.1)]">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#29313E]">
                  Interactive Web Preview
                </span>
                <span className="text-[12px] font-mono-tabular text-[#4E5A6E] bg-[#D0EFE2]/70 px-3 py-1 rounded-full">
                  Available now on this page
                </span>
              </div>

              <h3 className="text-[26px] font-semibold text-[#29313E] tracking-[-0.02em]">
                Explore the live miniature workspace
              </h3>

              <p className="text-[15px] text-[#556070] leading-relaxed">
                Test task creation, weekday switching, the 25:00 Focus Timer, editable sticky notes, and template presets directly in your browser. All changes stay locally in your session.
              </p>

              <ul className="space-y-2.5 pt-2 text-[14px] text-[#29313E]">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2E7D5B] shrink-0" />
                  <span>Full interactive Hero Planner & Quick Task creator</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2E7D5B] shrink-0" />
                  <span>Real-time 25:00 Focus Timer ring with presets</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#2E7D5B] shrink-0" />
                  <span>Four one-click weekly rhythm templates</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <a
                href="#home"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#29313E] hover:bg-[#3A4556] text-[#FCFBF7] text-[14.5px] font-medium transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Explore the demo above</span>
              </a>
            </div>
          </div>

          {/* Card 2: Desktop Early Access Preview Form (Explicit Local Demo) */}
          <div className="lg:col-span-6 rounded-[24px] bg-[#F4F2F7]/90 border border-[#3A4453]/14 p-7 sm:p-9 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-[#29313E]">
                  Desktop Early Access
                </span>
                <span className="text-[12px] font-mono-tabular text-[#4E5A6E] bg-[#DCD5F6]/70 px-3 py-1 rounded-full">
                  Local demonstration
                </span>
              </div>

              <h3 className="text-[26px] font-semibold text-[#29313E] tracking-[-0.02em]">
                Get early access updates
              </h3>

              <p className="text-[15px] text-[#556070] leading-relaxed">
                Curious about a standalone desktop build? Choose your preferred operating system and test our early-access registration flow below. (Note: this form is a local UI demonstration and does not transmit your email to an external server.)
              </p>

              {/* OS Selector */}
              <div className="flex items-center gap-2 pt-1" role="group" aria-label="Preferred desktop platform">
                {(['macOS', 'Windows', 'Linux'] as const).map((os) => (
                  <button
                    key={os}
                    type="button"
                    aria-pressed={inlinePlatform === os}
                    onClick={() => setInlinePlatform(os)}
                    className={`px-3.5 py-1.5 rounded-xl text-[13px] font-medium border transition-colors cursor-pointer ${
                      inlinePlatform === os
                        ? 'bg-[#29313E] text-white border-[#29313E]'
                        : 'bg-white/80 text-[#556070] border-[#3A4453]/12 hover:text-[#29313E]'
                    }`}
                  >
                    {os}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6">
              {!inlineSubmitted ? (
                <form onSubmit={handleInlineSubmit} noValidate className="space-y-2.5">
                  <label htmlFor="early-access-email" className="block text-[12.5px] font-medium text-[#29313E]">
                    Email address (stored locally in browser preview only)
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <input
                      id="early-access-email"
                      type="email"
                      value={inlineEmail}
                      onChange={(e) => {
                        setInlineEmail(e.target.value);
                        if (inlineError) setInlineError(null);
                      }}
                      placeholder="you@studio.com"
                      className="flex-1 px-4 py-3 rounded-full bg-white border border-[#3A4453]/20 text-[14px] text-[#29313E] placeholder:text-[#66717F] focus:outline-2 focus:outline-[#29313E]"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-full bg-[#6C798F] hover:bg-[#596579] text-[#FCFBF7] text-[14px] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Get early access
                    </button>
                  </div>
                  {inlineError && (
                    <p role="alert" className="text-[12.5px] text-[#B84A39] pl-2">
                      {inlineError}
                    </p>
                  )}
                </form>
              ) : (
                <div
                  role="status"
                  className="p-4 rounded-2xl bg-[#D0EFE2]/70 border border-[#95D3BD] text-[#232A36] text-[13.5px] flex items-center justify-between gap-3"
                >
                  <div>
                    <p className="font-semibold">Local preview note saved for {inlinePlatform}</p>
                    <p className="text-[12.5px] text-[#3A4453] mt-0.5">
                      Recorded <span className="font-mono-tabular">{inlineEmail}</span> in local demo state only—no external email was sent.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setInlineSubmitted(false);
                      setInlineEmail('');
                    }}
                    className="text-[12px] font-semibold underline shrink-0 cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION H — Final CTA and Footer */}
      <footer
        id="contact"
        className="relative w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 pt-16 pb-16 overflow-hidden"
      >
        {/* Final CTA Block with Softly Rising Gradient Halo Ring */}
        <div className="relative rounded-[28px] bg-[#FCFBF7]/85 border border-[#3A4453]/12 px-6 py-16 sm:py-20 text-center overflow-hidden shadow-[0_24px_60px_-24px_rgba(41,49,62,0.1)]">
          {/* Rising Gradient Halo Ring Bookend */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -bottom-28 -translate-x-1/2 w-[480px] h-[480px] rounded-full border-[28px] border-[#DCD5F6]/50 bg-gradient-to-t from-[#D0EFE2]/35 via-[#CFDFEF]/30 to-transparent blur-[2px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 -bottom-20 -translate-x-1/2 w-[340px] h-[340px] rounded-full border-[1.5px] border-[#6C798F]/25"
          />

          <div className="relative z-10 max-w-xl mx-auto space-y-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#F8F5EE] border border-[#3A4453]/12 shadow-xs">
              <HaloLogoIcon className="w-7 h-7" />
            </div>

            <h2 className="text-[34px] sm:text-[46px] font-semibold tracking-[-0.025em] text-[#29313E] leading-[1.08] text-balance">
              Make space for your best work.
            </h2>

            <p className="text-[16px] text-[#556070] leading-[1.6]">
              Experience how a calmer daily planner feels—right inside the interactive desktop preview on this page.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => onOpenModal('download')}
                className="px-6 py-3.5 rounded-full bg-[#29313E] hover:bg-[#3A4556] text-[#FCFBF7] text-[15px] font-medium transition-all shadow-[0_10px_24px_-8px_rgba(41,49,62,0.3)] cursor-pointer"
              >
                Preview Desktop Access
              </button>
              <a
                href="#home"
                className="px-6 py-3.5 rounded-full bg-white/90 hover:bg-white border border-[#3A4453]/18 text-[#29313E] text-[15px] font-medium transition-colors inline-flex items-center gap-2"
              >
                <span>Back to top planner</span>
                <ArrowUp className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Columns: Product, Explore, Support */}
        <div className="mt-16 pt-10 border-t border-[#3A4453]/12 grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 space-y-3">
            <a href="#home" className="inline-flex items-center gap-2.5 text-[#29313E]">
              <HaloLogoIcon className="w-6 h-6" />
              <span className="text-[19px] font-medium tracking-[-0.02em]">Halo Desk</span>
            </a>
            <p className="text-[14px] text-[#556070] max-w-xs leading-relaxed">
              Clear priorities, calm momentum. A desktop productivity app showcase for focused planning, gentle rhythms, and structured days.
            </p>
          </div>

          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8 text-[14px]">
            <div className="space-y-2.5">
              <p className="font-semibold text-[#29313E]">Product</p>
              <ul className="space-y-2 text-[#556070]">
                <li>
                  <a href="#home" className="hover:text-[#29313E] transition-colors">
                    Mini Desktop App
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-[#29313E] transition-colors">
                    The Calm System
                  </a>
                </li>
                <li>
                  <a href="#lab" className="hover:text-[#29313E] transition-colors">
                    Feature Lab
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <p className="font-semibold text-[#29313E]">Explore</p>
              <ul className="space-y-2 text-[#556070]">
                <li>
                  <a href="#workflow" className="hover:text-[#29313E] transition-colors">
                    Daily Workflow
                  </a>
                </li>
                <li>
                  <a href="#templates" className="hover:text-[#29313E] transition-colors">
                    Starter Templates
                  </a>
                </li>
                <li>
                  <a href="#details" className="hover:text-[#29313E] transition-colors">
                    Interface Craft
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <p className="font-semibold text-[#29313E]">Support</p>
              <ul className="space-y-2 text-[#556070]">
                <li>
                  <a href="#pricing" className="hover:text-[#29313E] transition-colors">
                    Preview Status
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenModal('start')}
                    className="hover:text-[#29313E] transition-colors cursor-pointer"
                  >
                    Early Access Info
                  </button>
                </li>
                <li>
                  <a href="#home" className="hover:text-[#29313E] transition-colors inline-flex items-center gap-1">
                    <span>Back to top</span>
                    <ArrowUp className="w-3.5 h-3.5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#3A4453]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] text-[#66717F]">
          <p>© 2026 Halo Desk. Interactive concept & functional web showcase.</p>
          <p>Designed with warm ivory space & calm motion.</p>
        </div>
      </footer>

      {/* Honest Early Access / Download Preview Dialog */}
      {modalState.open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="early-access-dialog-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#29313E]/35 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-md rounded-2xl bg-[#FCFBF7] border border-[#3A4453]/15 p-6 sm:p-7 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-[#DCD5F6]/70 flex items-center justify-center text-[#29313E]">
                  <Monitor className="w-4 h-4" />
                </span>
                <div>
                  <h3
                    id="early-access-dialog-title"
                    className="text-[18px] font-semibold text-[#29313E]"
                  >
                    {modalState.mode === 'download'
                      ? 'Desktop Preview Status'
                      : modalState.mode === 'login'
                      ? 'Local Session Preview'
                      : 'Start Free in Browser Preview'}
                  </h3>
                  <p className="text-[12px] text-[#66717F]">
                    Honest product preview · No binary download required
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close preview dialog"
                onClick={() => {
                  onCloseModal();
                  setModalError(null);
                }}
                className="p-1.5 rounded-lg text-[#66717F] hover:text-[#29313E] hover:bg-black/5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[14px] text-[#556070] leading-relaxed">
              Halo Desk is an interactive product showcase. Rather than downloading a mock installer file, the complete miniature desktop workspace is live right on this page—including task creation, completion, focus timer, and templates.
            </p>

            {!modalSaved ? (
              <form onSubmit={handleModalSubmit} noValidate className="space-y-3 pt-1">
                <label
                  htmlFor="modal-preview-email"
                  className="block text-[12.5px] font-medium text-[#29313E]"
                >
                  Save a local early-access bookmark (stays in this browser):
                </label>
                <input
                  id="modal-preview-email"
                  type="email"
                  value={modalEmail}
                  onChange={(e) => {
                    setModalEmail(e.target.value);
                    if (modalError) setModalError(null);
                  }}
                  placeholder="name@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#3A4453]/20 text-[13.5px] text-[#29313E] focus:outline-2 focus:outline-[#29313E]"
                />
                {modalError && (
                  <p role="alert" className="text-[12px] text-[#B84A39]">
                    {modalError}
                  </p>
                )}
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={onCloseModal}
                    className="px-4 py-2 rounded-full text-[13px] font-medium text-[#556070] hover:text-[#29313E] cursor-pointer"
                  >
                    Return to Live Demo
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-[#29313E] hover:bg-[#3A4556] text-white text-[13px] font-medium cursor-pointer"
                  >
                    Save Local Note
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-3.5 rounded-xl bg-[#D0EFE2]/70 border border-[#95D3BD] text-[13px] text-[#232A36] space-y-2">
                <p className="font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Saved locally for {modalEmail}
                </p>
                <p className="text-[12px] text-[#3A4453]">
                  This is a local browser demonstration; no external server request was sent.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setModalSaved(false);
                    onCloseModal();
                  }}
                  className="mt-1 px-4 py-1.5 rounded-full bg-[#29313E] text-white text-[12px] font-medium cursor-pointer"
                >
                  Explore Hero Workspace
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
]]>
    </file>
    <file path="src/app/(halodesk)/halodesk/components/TemplatesSection.tsx">
<![CDATA[import React, { useState } from 'react';
import { Check, Sparkles, ArrowUpRight } from 'lucide-react';
import { TEMPLATE_PRESETS, TemplatePreset } from '../lib/plannerLogic';

interface TemplatesSectionProps {
  onApplyTemplate: (preset: TemplatePreset) => void;
}

const ACCENT_SURFACE: Record<
  TemplatePreset['accent'],
  { card: string; border: string; pill: string }
> = {
  lavender: {
    card: 'bg-[#E3DCFA]',
    border: 'border-[#C1B3EE]',
    pill: 'bg-[#CEC2F5] text-[#29313E]',
  },
  powder: {
    card: 'bg-[#CEE2F9]',
    border: 'border-[#9EC2EC]',
    pill: 'bg-[#B6D4F6] text-[#29313E]',
  },
  peach: {
    card: 'bg-[#F9DCD0]',
    border: 'border-[#E6B8A4]',
    pill: 'bg-[#F3C7B5] text-[#29313E]',
  },
  mint: {
    card: 'bg-[#CFF1E4]',
    border: 'border-[#9DD8C2]',
    pill: 'bg-[#B7E8D5] text-[#29313E]',
  },
};

export const TemplatesSection: React.FC<TemplatesSectionProps> = ({ onApplyTemplate }) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(TEMPLATE_PRESETS[0].id);
  const [appliedPresetId, setAppliedPresetId] = useState<string | null>(null);

  const activePreset =
    TEMPLATE_PRESETS.find((p) => p.id === selectedPresetId) || TEMPLATE_PRESETS[0];

  const handleUseTemplate = (preset: TemplatePreset) => {
    onApplyTemplate(preset);
    setAppliedPresetId(preset.id);
  };

  return (
    <section
      id="templates"
      aria-labelledby="templates-heading"
      className="relative w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 py-20 lg:py-28"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div className="space-y-3 max-w-xl">
          <p className="text-[13px] font-medium text-[#66717F] tracking-wide">
            Templates · Beautiful Starting Points
          </p>
          <h2
            id="templates-heading"
            className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.025em] text-[#29313E] leading-[1.1] text-balance"
          >
            Thoughtful rhythms ready for your week.
          </h2>
        </div>
        <p className="text-[15.5px] text-[#556070] max-w-md leading-[1.6]">
          Select any planner card below to inspect its structure, or load it directly into the interactive Hero Planner at the top of the page.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left: 4 Overlapping Pastel Planner Cards */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TEMPLATE_PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPresetId;
            const styles = ACCENT_SURFACE[preset.accent];

            return (
              <div
                key={preset.id}
                className="relative group"
              >
                {/* Overlapping secondary sheet behind card that slides into view on hover */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 rounded-2xl border ${styles.border} bg-[#FCFBF7]/85 transition-transform duration-300 ${
                    isSelected
                      ? 'translate-x-2 translate-y-2 rotate-1'
                      : 'group-hover:translate-x-2 group-hover:translate-y-2 group-hover:rotate-1'
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setSelectedPresetId(preset.id)}
                  aria-pressed={isSelected}
                  className={`relative w-full text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#29313E] ${
                    styles.card
                  } ${styles.border} ${
                    isSelected
                      ? '-translate-y-1 shadow-[0_16px_32px_-12px_rgba(41,49,62,0.18)] ring-2 ring-[#29313E]'
                      : 'hover:-translate-y-1 shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11.5px] font-mono-tabular text-[#3A4453]">
                      {preset.rhythmLabel}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#29313E] opacity-70 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <h3 className="text-[19px] font-semibold text-[#232A36] tracking-[-0.01em]">
                    {preset.name}
                  </h3>
                  <p className="text-[13px] text-[#4A5565] mt-1 leading-snug">
                    {preset.tagline}
                  </p>

                  {/* Mini preview bars inside the overlapping card */}
                  <div className="mt-4 space-y-1.5 pt-3 border-t border-[#29313E]/10">
                    {preset.tasks.map((t, i) => (
                      <div
                        key={i}
                        className="px-2.5 py-1 rounded-md bg-white/70 text-[11.5px] font-medium text-[#29313E] truncate flex items-center justify-between"
                      >
                        <span className="truncate">{t.title}</span>
                        <span className="text-[10px] font-mono-tabular text-[#66717F] ml-2 shrink-0">
                          {t.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Right: Live Interactive Preview Panel for Selected Template */}
        <div className="lg:col-span-6 rounded-[22px] bg-[#FCFBF7] border border-[#3A4453]/14 p-6 sm:p-8 shadow-[0_22px_48px_-18px_rgba(41,49,62,0.12)] space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#3A4453]/10 pb-5">
            <div>
              <span className="text-[12px] font-mono-tabular text-[#66717F]">
                Live Template Preview · {activePreset.focusBlocks} focus intervals
              </span>
              <h3 className="text-[24px] font-semibold text-[#29313E] mt-1">
                {activePreset.name}
              </h3>
              <p className="text-[14px] text-[#556070] mt-1 max-w-md leading-relaxed">
                {activePreset.summary}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleUseTemplate(activePreset)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#29313E] hover:bg-[#3A4556] active:scale-[0.98] text-[#FCFBF7] text-[13.5px] font-medium transition-all cursor-pointer shrink-0"
            >
              {appliedPresetId === activePreset.id ? (
                <>
                  <Check className="w-4 h-4 text-[#D0EFE2]" />
                  <span>Loaded in Hero Planner</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#DCD5F6]" />
                  <span>Use template</span>
                </>
              )}
            </button>
          </div>

          {/* Schedule Breakdown */}
          <div className="space-y-3">
            <p className="text-[12.5px] font-medium text-[#66717F]">
              Included daily anchors (fictional demo preset):
            </p>
            {activePreset.tasks.map((task, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 ${
                  ACCENT_SURFACE[task.category].card
                } ${ACCENT_SURFACE[task.category].border}`}
              >
                <div>
                  <p className="text-[14px] font-semibold text-[#232A36]">{task.title}</p>
                  <p className="text-[12px] text-[#4A5565] mt-0.5">
                    {task.subtitle} · {task.energy}
                  </p>
                </div>
                <span className="text-[12px] font-mono-tabular font-medium text-[#29313E] bg-white/75 px-2.5 py-1 rounded-lg shrink-0">
                  {task.duration}
                </span>
              </div>
            ))}
          </div>

          {appliedPresetId === activePreset.id && (
            <div
              role="status"
              className="p-3.5 rounded-xl bg-[#D0EFE2]/65 border border-[#95D3BD] flex items-center justify-between gap-3 text-[13px] text-[#232A36]"
            >
              <span>
                <strong>“{activePreset.name}”</strong> is now active in the Hero Planner above.
              </span>
              <a
                href="#home"
                className="font-semibold underline whitespace-nowrap shrink-0 hover:text-[#29313E]"
              >
                Jump to Hero ↑
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(halodesk)/halodesk/components/WorkflowStoryboard.tsx">
<![CDATA[import React, { useState } from 'react';
import { Check, Clock, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

interface StoryStep {
  id: 'capture' | 'plan' | 'focus' | 'reflect';
  index: number;
  label: string;
  timeOfDay: string;
  headline: string;
  description: string;
  tileStatus: string;
  tileSubtext: string;
  tileCategoryClass: string;
}

const STORY_STEPS: StoryStep[] = [
  {
    id: 'capture',
    index: 0,
    label: '01 · Capture',
    timeOfDay: '8:50 AM · Morning Desk',
    headline: 'Start by clearing your head into a quiet Inbox.',
    description:
      'Before checking messages, drop raw tasks into Quick Capture. Your priority tile starts as an unscheduled note—visible, safe, and out of your way.',
    tileStatus: 'Captured in Inbox',
    tileSubtext: 'Unscheduled · Waiting for morning triage',
    tileCategoryClass: 'bg-[#DCD5F6] border-[#B9A9E8]',
  },
  {
    id: 'plan',
    index: 1,
    label: '02 · Plan',
    timeOfDay: '9:05 AM · Daily Alignment',
    headline: 'Place the priority tile into Today’s protected morning slot.',
    description:
      'With one drag or keypress, the tile travels from Inbox into your Daily Planner timeline alongside your Weekly Calendar overview.',
    tileStatus: 'Scheduled · Today 9:30 AM',
    tileSubtext: '90 min Deep Focus block reserved',
    tileCategoryClass: 'bg-[#C3DCF9] border-[#96BCE8]',
  },
  {
    id: 'focus',
    index: 2,
    label: '03 · Focus',
    timeOfDay: '9:30 AM · Deep Work Session',
    headline: 'Other lists step back while the 25:00 ring keeps gentle company.',
    description:
      'Secondary tasks dim and tuck aside. The traveling priority tile anchors beside the active Focus Timer and your margin sticky note.',
    tileStatus: 'In Focus · 18:40 remaining',
    tileSubtext: 'Notifications silenced · Margin note linked',
    tileCategoryClass: 'bg-[#F8D6C5] border-[#E2B29B]',
  },
  {
    id: 'reflect',
    index: 3,
    label: '04 · Reflect',
    timeOfDay: '4:45 PM · Afternoon Closure',
    headline: 'Mark complete and leave your desk genuinely finished.',
    description:
      'A single check-circle scribble moves the priority tile into your completed log and prepares a clean slate for tomorrow.',
    tileStatus: 'Completed · Logged to Weekly Reset',
    tileSubtext: '2 focus intervals recorded · Desk clear',
    tileCategoryClass: 'bg-[#C7EFE1] border-[#95D3BD]',
  },
];

export const WorkflowStoryboard: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(1);
  const currentStep = STORY_STEPS[activeStepIndex];

  return (
    <section
      id="workflow"
      aria-labelledby="workflow-heading"
      className="relative w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 py-20 lg:py-28"
    >
      {/* Header & Interactive Step Scrubber */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
        <div className="space-y-3 max-w-xl">
          <p className="text-[13px] font-medium text-[#66717F] tracking-wide">
            Workflow · A Day Unfolding
          </p>
          <h2
            id="workflow-heading"
            className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.025em] text-[#29313E] leading-[1.1] text-balance"
          >
            From first thought to finished work, one continuous motion.
          </h2>
        </div>

        {/* Step Controls (Capture -> Plan -> Focus -> Reflect) */}
        <div
          role="tablist"
          aria-label="Workflow progression stages"
          className="inline-flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#FCFBF7]/90 border border-[#3A4453]/12 shadow-sm"
        >
          {STORY_STEPS.map((step, idx) => {
            const isSelected = idx === activeStepIndex;
            return (
              <button
                key={step.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActiveStepIndex(idx)}
                className={`px-4 py-2 rounded-xl text-[13.5px] font-medium transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-[#29313E] text-[#FCFBF7] shadow-sm'
                    : 'text-[#556070] hover:text-[#29313E] hover:bg-black/5'
                }`}
              >
                {step.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Storyboard Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center rounded-[24px] bg-[#FCFBF7]/85 border border-[#3A4453]/12 p-6 sm:p-10 shadow-[0_24px_54px_-20px_rgba(41,49,62,0.1)]">
        {/* Left Copy Narrative */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between text-[12.5px] font-mono-tabular text-[#66717F]">
            <span>{currentStep.timeOfDay}</span>
            <span>Step {activeStepIndex + 1} of 4</span>
          </div>

          <h3 className="text-[24px] sm:text-[28px] font-semibold tracking-[-0.02em] text-[#29313E] leading-[1.2] text-balance">
            {currentStep.headline}
          </h3>

          <p className="text-[15.5px] text-[#556070] leading-[1.65]">
            {currentStep.description}
          </p>

          {/* Progress Rail & Next/Previous Buttons */}
          <div className="pt-2 space-y-4">
            <div className="w-full h-1.5 rounded-full bg-[#3A4453]/10 overflow-hidden">
              <div
                className="h-full bg-[#6C798F] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${((activeStepIndex + 1) / STORY_STEPS.length) * 100}%` }}
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setActiveStepIndex((prev) => (prev + 1) % STORY_STEPS.length)
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#29313E] hover:bg-[#3A4556] text-[#FCFBF7] text-[13.5px] font-medium transition-colors cursor-pointer"
              >
                {activeStepIndex === STORY_STEPS.length - 1 ? (
                  <>
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Replay Day</span>
                  </>
                ) : (
                  <>
                    <span>Advance to {STORY_STEPS[activeStepIndex + 1].label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Choreographed Spatial Stage with Traveling Pastel Priority Tile */}
        <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[370px] rounded-2xl bg-[#F4F2F7]/85 border border-[#3A4453]/10 p-5 sm:p-7 overflow-hidden flex flex-col justify-between">
          {/* Top Stage Zones: Inbox Dock | Daily Timeline | Focus Ring */}
          <div className="grid grid-cols-3 gap-3 text-[11.5px] font-medium text-[#66717F]">
            <div
              className={`p-3 rounded-xl border transition-all duration-500 ${
                activeStepIndex === 0
                  ? 'bg-white border-[#3A4453]/20 text-[#29313E] shadow-sm'
                  : 'bg-white/40 border-[#3A4453]/8 opacity-65'
              }`}
            >
              <span>Inbox Tray</span>
              <p className="text-[10.5px] font-mono-tabular mt-0.5">
                {activeStepIndex === 0 ? '1 new capture' : '0 unscheduled'}
              </p>
            </div>

            <div
              className={`p-3 rounded-xl border transition-all duration-500 ${
                activeStepIndex === 1
                  ? 'bg-white border-[#3A4453]/20 text-[#29313E] shadow-sm'
                  : 'bg-white/40 border-[#3A4453]/8 opacity-65'
              }`}
            >
              <span>Today Timeline</span>
              <p className="text-[10.5px] font-mono-tabular mt-0.5">
                {activeStepIndex === 1 ? 'Morning slot active' : '9:30 AM anchor'}
              </p>
            </div>

            <div
              className={`p-3 rounded-xl border transition-all duration-500 ${
                activeStepIndex >= 2
                  ? 'bg-white border-[#3A4453]/20 text-[#29313E] shadow-sm'
                  : 'bg-white/40 border-[#3A4453]/8 opacity-65'
              }`}
            >
              <span>{activeStepIndex === 3 ? 'Completed Log' : 'Focus Mode'}</span>
              <p className="text-[10.5px] font-mono-tabular mt-0.5">
                {activeStepIndex === 2
                  ? '25:00 Timer Live'
                  : activeStepIndex === 3
                  ? 'Archived cleanly'
                  : 'Standby'}
              </p>
            </div>
          </div>

          {/* The Single Traveling Pastel Priority Tile (transform-based FLIP choreography) */}
          <div className="relative my-6 min-h-[130px] flex items-center">
            <div
              style={{
                transform:
                  activeStepIndex === 0
                    ? 'translate3d(0%, -6px, 0) scale(0.96)'
                    : activeStepIndex === 1
                    ? 'translate3d(8%, 0px, 0) scale(1)'
                    : activeStepIndex === 2
                    ? 'translate3d(4%, 4px, 0) scale(1.03)'
                    : 'translate3d(12%, 0px, 0) scale(0.98)',
              }}
              className={`w-full sm:w-[86%] rounded-2xl border p-4 sm:p-5 shadow-[0_14px_30px_-10px_rgba(41,49,62,0.14)] transition-all duration-500 ease-[cubic-bezier(0.22,1.15,0.36,1)] ${currentStep.tileCategoryClass}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 w-6 h-6 rounded-full border border-[#29313E]/25 flex items-center justify-center transition-colors ${
                      activeStepIndex === 3 ? 'bg-[#29313E] text-white' : 'bg-white/80 text-[#29313E]'
                    }`}
                  >
                    {activeStepIndex === 3 ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                  </span>
                  <div>
                    <span className="text-[11px] font-mono-tabular text-[#4A5565]">
                      {currentStep.tileStatus}
                    </span>
                    <h4
                      className={`text-[16px] sm:text-[17px] font-semibold text-[#232A36] mt-0.5 ${
                        activeStepIndex === 3 ? 'line-through opacity-80' : ''
                      }`}
                    >
                      Design system review & token alignment
                    </h4>
                    <p className="text-[12.5px] text-[#4A5565] mt-1">{currentStep.tileSubtext}</p>
                  </div>
                </div>

                <div className="shrink-0 text-right font-mono-tabular text-[12px] text-[#29313E] bg-white/65 px-2.5 py-1 rounded-lg flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{activeStepIndex === 2 ? '18:40' : '90m'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Context Strip showing secondary task dimming / sticky note accompaniment */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#3A4453]/10 text-[12px] text-[#556070]">
            <span>
              {activeStepIndex === 0 && 'Press 1–4 or click any stage tab above to inspect the transition.'}
              {activeStepIndex === 1 && 'Positioned at top of Today list · Collaborators notified.'}
              {activeStepIndex === 2 && 'Secondary lists dimmed by 60% so your eyes stay on one priority.'}
              {activeStepIndex === 3 && 'Completed tile saved to Friday Weekly Reset summary.'}
            </span>
            <div className="flex items-center gap-1.5">
              {STORY_STEPS.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Jump to ${s.label}`}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === activeStepIndex ? 'w-6 bg-[#29313E]' : 'w-2 bg-[#3A4453]/25'
                  }`}
                />
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
    <file path="src/app/(halodesk)/halodesk/lib/plannerLogic.ts">
<![CDATA[export type TaskCategory = 'lavender' | 'powder' | 'peach' | 'mint';
export type SidebarTab = 'Inbox' | 'Today' | 'Projects' | 'Calendar' | 'Notes';
export type WeekdayKey = 'Mon' | 'Ton' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

export interface PlannerTask {
  id: string;
  title: string;
  subtitle: string;
  category: TaskCategory;
  tab: SidebarTab;
  day: WeekdayKey;
  duration: string;
  energy: 'Deep focus' | 'Collaborative' | 'Light flow';
  notes: string;
  completed: boolean;
  hasAvatars?: boolean;
}

export interface TemplatePreset {
  id: string;
  name: string;
  tagline: string;
  accent: TaskCategory;
  rhythmLabel: string;
  focusBlocks: number;
  summary: string;
  tasks: Array<{
    title: string;
    subtitle: string;
    category: TaskCategory;
    duration: string;
    energy: 'Deep focus' | 'Collaborative' | 'Light flow';
  }>;
}

export const INITIAL_TASKS: PlannerTask[] = [
  {
    id: 'task-1',
    title: 'Design system review',
    subtitle: 'Today',
    category: 'lavender',
    tab: 'Today',
    day: 'Ton',
    duration: '45 min',
    energy: 'Collaborative',
    notes: 'Audit token contrast across light ivory surfaces, button states, and spacing scale with Maya & Liam.',
    completed: false,
    hasAvatars: true,
  },
  {
    id: 'task-2',
    title: 'Deep work session',
    subtitle: 'Write code for main view',
    category: 'powder',
    tab: 'Today',
    day: 'Ton',
    duration: '90 min',
    energy: 'Deep focus',
    notes: 'Complete keyboard navigation and FLIP transition logic for the daily planner timeline without notifications.',
    completed: false,
  },
  {
    id: 'task-3',
    title: 'Write blog post outline',
    subtitle: 'Today',
    category: 'peach',
    tab: 'Today',
    day: 'Ton',
    duration: '30 min',
    energy: 'Light flow',
    notes: 'Draft three-part structure on why calm interfaces reduce cognitive switching cost during creative mornings.',
    completed: false,
  },
  {
    id: 'task-4',
    title: 'Team check-in',
    subtitle: '10:00 AM',
    category: 'mint',
    tab: 'Today',
    day: 'Ton',
    duration: '25 min',
    energy: 'Collaborative',
    notes: 'Share weekly rhythm priorities, unblock QA items, and confirm Friday demo scope.',
    completed: false,
  },
  {
    id: 'task-5',
    title: 'Triage reader notes & ideas',
    subtitle: 'Inbox · 3 items',
    category: 'peach',
    tab: 'Inbox',
    day: 'Mon',
    duration: '20 min',
    energy: 'Light flow',
    notes: 'Sort incoming thoughts captured via Quick Task shortcut into this week’s calm milestones.',
    completed: false,
  },
  {
    id: 'task-6',
    title: 'Desktop typography polish',
    subtitle: 'Halo v0.9 Milestone',
    category: 'lavender',
    tab: 'Projects',
    day: 'Tue',
    duration: '60 min',
    energy: 'Deep focus',
    notes: 'Refine headline balance and tabular numeral alignment across the weekly overview.',
    completed: false,
  },
  {
    id: 'task-7',
    title: 'Architecture sync block',
    subtitle: '2:00 PM · Studio room',
    category: 'mint',
    tab: 'Calendar',
    day: 'Wed',
    duration: '40 min',
    energy: 'Collaborative',
    notes: 'Walk through offline local storage schema and keyboard shortcut map.',
    completed: false,
  },
];

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  {
    id: 'gentle-monday',
    name: 'A gentle Monday',
    tagline: 'Ease into the week before opening messages',
    accent: 'lavender',
    rhythmLabel: '3 calm blocks · 15m buffer',
    focusBlocks: 3,
    summary: 'Starts with 25 minutes of quiet triage, followed by one protected deep-work block before midday check-ins.',
    tasks: [
      {
        title: 'Quiet weekly intention sweep',
        subtitle: '9:00 AM · Warm up',
        category: 'lavender',
        duration: '25 min',
        energy: 'Light flow',
      },
      {
        title: 'Core priority deep block',
        subtitle: '9:45 AM · Focus timer ready',
        category: 'powder',
        duration: '75 min',
        energy: 'Deep focus',
      },
      {
        title: 'Async team status digest',
        subtitle: '11:30 AM · Calm check-in',
        category: 'mint',
        duration: '20 min',
        energy: 'Collaborative',
      },
    ],
  },
  {
    id: 'creative-sprint',
    name: 'Creative sprint',
    tagline: 'Long uninterrupted studio hours for makers',
    accent: 'powder',
    rhythmLabel: '2 deep blocks · 1 review',
    focusBlocks: 4,
    summary: 'Pushes meetings to late afternoon so sketching, writing, and prototyping stay unbroken while your mind is fresh.',
    tasks: [
      {
        title: 'Concept exploration & wireframes',
        subtitle: 'Morning block',
        category: 'powder',
        duration: '90 min',
        energy: 'Deep focus',
      },
      {
        title: 'Prototype interaction pass',
        subtitle: 'Midday studio',
        category: 'peach',
        duration: '60 min',
        energy: 'Deep focus',
      },
      {
        title: 'Critique notes & export',
        subtitle: '3:30 PM',
        category: 'lavender',
        duration: '30 min',
        energy: 'Collaborative',
      },
    ],
  },
  {
    id: 'study-rhythm',
    name: 'Study rhythm',
    tagline: 'Structured reading, synthesis, and active recall',
    accent: 'peach',
    rhythmLabel: '4×25m intervals · Notes linked',
    focusBlocks: 4,
    summary: 'Alternates focused reading intervals with short synthesis notes so complex material settles without burnout.',
    tasks: [
      {
        title: 'Primary source close reading',
        subtitle: 'Chapter 4 & margin notes',
        category: 'peach',
        duration: '50 min',
        energy: 'Deep focus',
      },
      {
        title: 'Synthesize key arguments in Notes',
        subtitle: 'Today',
        category: 'lavender',
        duration: '30 min',
        energy: 'Light flow',
      },
      {
        title: 'Spaced recall card review',
        subtitle: '4:00 PM',
        category: 'mint',
        duration: '25 min',
        energy: 'Light flow',
      },
    ],
  },
  {
    id: 'weekly-reset',
    name: 'Weekly reset',
    tagline: 'Close open loops and clear the desk for Friday',
    accent: 'mint',
    rhythmLabel: 'Reflect · Archive · Prepare',
    focusBlocks: 2,
    summary: 'Reviews completed tasks, archives stray sticky notes, and sets three realistic anchors for next Monday.',
    tasks: [
      {
        title: 'Archive finished project threads',
        subtitle: 'Friday afternoon',
        category: 'mint',
        duration: '25 min',
        energy: 'Light flow',
      },
      {
        title: 'Capture wins & lessons in Notes',
        subtitle: 'Weekly reflection',
        category: 'peach',
        duration: '20 min',
        energy: 'Light flow',
      },
      {
        title: 'Choose 3 anchors for Monday',
        subtitle: 'Next week preview',
        category: 'lavender',
        duration: '15 min',
        energy: 'Deep focus',
      },
    ],
  },
];

export function validateQuickTaskTitle(raw: string): { valid: boolean; cleaned: string; error?: string } {
  const cleaned = raw.trim().replace(/\s+/g, ' ');
  if (!cleaned) {
    return { valid: false, cleaned: '', error: 'Please enter a task title before adding.' };
  }
  if (cleaned.length < 2) {
    return { valid: false, cleaned, error: 'Task title should be at least 2 characters.' };
  }
  if (cleaned.length > 72) {
    return { valid: false, cleaned: cleaned.slice(0, 72), error: 'Keep task titles concise (under 72 characters).' };
  }
  return { valid: true, cleaned };
}

export function createQuickTask(
  tasks: PlannerTask[],
  rawTitle: string,
  category: TaskCategory = 'lavender',
  day: WeekdayKey = 'Ton',
  tab: SidebarTab = 'Today'
): { tasks: PlannerTask[]; created?: PlannerTask; error?: string } {
  const validation = validateQuickTaskTitle(rawTitle);
  if (!validation.valid) {
    return { tasks, error: validation.error };
  }

  const newTask: PlannerTask = {
    id: `task-custom-${Date.now()}-${tasks.length + 1}`,
    title: validation.cleaned,
    subtitle: day === 'Ton' ? 'Today' : `${day} · Scheduled`,
    category,
    tab,
    day,
    duration: '30 min',
    energy: category === 'powder' ? 'Deep focus' : category === 'mint' ? 'Collaborative' : 'Light flow',
    notes: 'Added via Quick Task in the live planner preview.',
    completed: false,
  };

  return {
    tasks: [newTask, ...tasks],
    created: newTask,
  };
}

export function toggleTaskCompletion(
  tasks: PlannerTask[],
  taskId: string
): { tasks: PlannerTask[]; changedTask?: PlannerTask } {
  let changedTask: PlannerTask | undefined;
  const updated = tasks.map((t) => {
    if (t.id === taskId) {
      changedTask = { ...t, completed: !t.completed };
      return changedTask;
    }
    return t;
  });

  // Sort active tasks before completed tasks while preserving relative order
  const active = updated.filter((t) => !t.completed);
  const done = updated.filter((t) => t.completed);
  return { tasks: [...active, ...done], changedTask };
}

export function applyTemplateToTasks(
  existingTasks: PlannerTask[],
  preset: TemplatePreset
): PlannerTask[] {
  const mapped: PlannerTask[] = preset.tasks.map((item, idx) => ({
    id: `tpl-${preset.id}-${idx}`,
    title: item.title,
    subtitle: item.subtitle,
    category: item.category,
    tab: 'Today',
    day: 'Ton',
    duration: item.duration,
    energy: item.energy,
    notes: `From "${preset.name}" template: ${preset.summary}`,
    completed: false,
    hasAvatars: idx === 0,
  }));

  const nonToday = existingTasks.filter((t) => t.tab !== 'Today');
  return [...mapped, ...nonToday];
}

export function formatTimerSeconds(totalSeconds: number): string {
  const clamped = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function computeTimerProgress(remainingSeconds: number, durationSeconds: number): number {
  if (durationSeconds <= 0) return 0;
  const elapsed = Math.max(0, Math.min(durationSeconds, durationSeconds - remainingSeconds));
  return Number((elapsed / durationSeconds).toFixed(4));
}

export function validateEarlyAccessEmail(rawEmail: string): { valid: boolean; error?: string } {
  const trimmed = rawEmail.trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter an email address to save your local preview invite.' };
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmed)) {
    return { valid: false, error: 'Please enter a valid email address (for example, name@domain.com).' };
  }
  return { valid: true };
}
]]>
    </file>
  </files>
</template>
