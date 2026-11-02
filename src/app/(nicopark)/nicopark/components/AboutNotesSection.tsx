"use client";

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
