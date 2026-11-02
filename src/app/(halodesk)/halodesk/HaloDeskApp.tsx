'use client';

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
