"use client";

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
