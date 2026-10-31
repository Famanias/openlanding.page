'use client';
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
