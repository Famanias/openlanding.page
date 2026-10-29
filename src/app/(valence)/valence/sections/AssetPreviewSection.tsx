"use client";

import React, { useSyncExternalStore } from "react";
import {
  computeTailoredBenchmark,
  isChapterUnlocked,
} from "../capsule/logic";
import { valenceStore } from "../capsule/store";
import {
  type BuyerRoleId,
  type CompanySizeBand,
  REPORT_CHAPTERS,
} from "../content/funnelData";
import { Reveal } from "../motion/Reveal";

const SIZES: Array<{ id: CompanySizeBand; label: string }> = [
  { id: "1-25", label: "1–25" },
  { id: "26-200", label: "26–200" },
  { id: "201-1000", label: "201–1,000" },
  { id: "1000+", label: "1,000+" },
];

const ROLES: Array<{ id: BuyerRoleId; label: string }> = [
  { id: "vp-growth", label: "VP Growth" },
  { id: "demand-gen", label: "Demand Gen" },
  { id: "product-growth", label: "Product Growth" },
  { id: "founder", label: "Founder / Exec" },
];

export function AssetPreviewSection() {
  const snapshot = useSyncExternalStore(
    valenceStore.subscribe,
    valenceStore.getSnapshot,
    valenceStore.getSnapshot,
  );

  const activeChapter =
    REPORT_CHAPTERS.find((c) => c.id === snapshot.activeChapterId) ??
    REPORT_CHAPTERS[0];

  const unlocked = isChapterUnlocked(activeChapter.requiredTier, snapshot.unlocked);
  const tailored = computeTailoredBenchmark(snapshot.companySize, snapshot.role);

  return (
    <section
      id="preview"
      aria-labelledby="vl-preview-heading"
      className="py-14 sm:py-20"
    >
      <div className="vl-container space-y-10">
        {/* Heading + Cohort Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <Reveal
              as="h2"
              variant="mask"
              className="vl-display text-3xl sm:text-5xl font-extrabold text-[#1E1B2E]"
            >
              <span id="vl-preview-heading">
                Inspect the gated asset before you trade your data.
              </span>
            </Reveal>
          </div>

          <Reveal variant="rise" delay={100} className="max-w-md text-sm sm:text-base text-[#645D7A]">
            High-performing capture pages prove value upfront. Filter the live benchmark by company size and role, or unlock chapters across stages.
          </Reveal>
        </div>

        {/* Interactive Cohort Filter Bar */}
        <div className="rounded-[28px] border border-[#1E1B2E]/15 bg-[#E8E0F8]/55 p-4 sm:p-5 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="vl-mono text-xs font-semibold text-[#1E1B2E] pr-2">
              COMPANY SIZE:
            </span>
            {SIZES.map((s) => {
              const active = snapshot.companySize === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => valenceStore.setPreviewFilter({ companySize: s.id })}
                  aria-pressed={active}
                  className="rounded-full px-3.5 py-1.5 vl-mono text-xs font-semibold transition-all cursor-pointer"
                  style={{
                    backgroundColor: active ? "#1E1B2E" : "#FBF9F5",
                    color: active ? "#FBF9F5" : "#1E1B2E",
                    border: "1.5px solid #1E1B2E",
                  }}
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="vl-mono text-xs font-semibold text-[#1E1B2E] pr-2">
              ROLE LENS:
            </span>
            {ROLES.map((r) => {
              const active = snapshot.role === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => valenceStore.setPreviewFilter({ role: r.id })}
                  aria-pressed={active}
                  className="rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer"
                  style={{
                    backgroundColor: active ? "#5B46E8" : "#FBF9F5",
                    color: active ? "#FBF9F5" : "#1E1B2E",
                    border: "1.5px solid #1E1B2E",
                  }}
                >
                  {r.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 12-Col Reader Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 5 Columns: Chapter Index */}
          <div
            className="lg:col-span-5 space-y-3"
            role="tablist"
            aria-label="Monograph chapters"
          >
            {REPORT_CHAPTERS.map((chapter) => {
              const isSelected = chapter.id === activeChapter.id;
              const isOpen = isChapterUnlocked(chapter.requiredTier, snapshot.unlocked);
              const badgeBg =
                chapter.requiredTier === "splash"
                  ? "#E8E0F8"
                  : chapter.requiredTier === "squeeze"
                    ? "#D9F2E6"
                    : "#FCE2D5";

              return (
                <button
                  key={chapter.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => valenceStore.setActiveChapterId(chapter.id)}
                  className="w-full rounded-[24px] p-5 text-left transition-all cursor-pointer"
                  style={{
                    backgroundColor: isSelected ? "#1E1B2E" : "#FBF9F5",
                    color: isSelected ? "#FBF9F5" : "#1E1B2E",
                    border: "2px solid #1E1B2E",
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="vl-mono text-xs opacity-80">
                      {chapter.number} · {chapter.pages}
                    </span>
                    <span
                      className="rounded-full px-3 py-0.5 vl-mono text-[10px] font-bold text-[#1E1B2E]"
                      style={{ backgroundColor: badgeBg }}
                    >
                      {isOpen
                        ? "UNSEALED ✓"
                        : `GATED · ${chapter.requiredTier.toUpperCase()}`}
                    </span>
                  </div>
                  <h3 className="vl-display mt-2 text-lg sm:text-xl font-bold leading-snug">
                    {chapter.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Right 7 Columns: Live Chapter Reader & Tailored SVG Benchmark */}
          <div
            className="lg:col-span-7 rounded-[32px] border-2 border-[#1E1B2E] bg-[#FBF9F5] p-6 sm:p-9 space-y-6"
            role="tabpanel"
            aria-label={activeChapter.title}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1E1B2E]/10 pb-4">
              <div>
                <span className="vl-mono text-xs font-semibold text-[#5B46E8]">
                  {activeChapter.number} · {activeChapter.pages}
                </span>
                <h3 className="vl-display mt-1 text-2xl sm:text-3xl font-extrabold text-[#1E1B2E]">
                  {activeChapter.title}
                </h3>
              </div>
              <span
                className="rounded-full px-4 py-1.5 vl-mono text-xs font-bold text-[#1E1B2E] border border-[#1E1B2E]/15"
                style={{
                  backgroundColor: unlocked ? "#D9F2E6" : "#FCE2D5",
                }}
              >
                {unlocked ? "CHAPTER UNSEALED" : `REQUIRES ${activeChapter.requiredTier.toUpperCase()}`}
              </span>
            </div>

            <p className="text-base text-[#1E1B2E]/90 leading-relaxed">
              {activeChapter.summary}
            </p>

            {/* Live Cohort-Tailored Telemetry Strip */}
            <div className="rounded-[24px] bg-[#E8E0F8] p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <span className="vl-mono text-[10px] text-[#645D7A]">
                  COHORT SQUEEZE CVR
                </span>
                <p className="vl-display text-2xl font-extrabold text-[#1E1B2E]">
                  {tailored.squeezeCvr}%
                </p>
              </div>
              <div>
                <span className="vl-mono text-[10px] text-[#645D7A]">
                  COHORT LEAD-GEN CVR
                </span>
                <p className="vl-display text-2xl font-extrabold text-[#1E1B2E]">
                  {tailored.leadGenCvr}%
                </p>
              </div>
              <div>
                <span className="vl-mono text-[10px] text-[#645D7A]">
                  PIPELINE MULTIPLIER
                </span>
                <p className="vl-display text-2xl font-extrabold text-[#5B46E8]">
                  {tailored.pipelineLift}×
                </p>
              </div>
            </div>

            {/* Chart Visualization with Unseal State */}
            <div className="relative rounded-[24px] border border-[#1E1B2E]/15 bg-[#FBF9F5] p-5 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="vl-mono text-xs font-semibold text-[#1E1B2E]">
                  {activeChapter.chartLabel}
                </span>
                <span className="vl-mono text-[11px] text-[#645D7A]">
                  N = 418 B2B FUNNELS
                </span>
              </div>

              <div className="space-y-3">
                {activeChapter.bars.map((bar, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#1E1B2E]">
                      <span>{bar.label}</span>
                      <span className="vl-mono">
                        {unlocked || idx === 0 ? `${bar.value}%` : "LOCKED"}
                      </span>
                    </div>
                    <div className="h-4 w-full rounded-full bg-[#E8E0F8] overflow-hidden p-0.5 border border-[#1E1B2E]/15">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${unlocked || idx === 0 ? bar.value : Math.max(18, bar.value * 0.4)}%`,
                          backgroundColor: bar.highlight ? "#5B46E8" : "#D9F2E6",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Finding Callout or Unlock Prompt */}
              {unlocked ? (
                <div className="rounded-[20px] bg-[#D9F2E6] p-4 text-sm text-[#1E1B2E]">
                  <strong>Key Finding:</strong> {activeChapter.keyFinding}
                </div>
              ) : (
                <div className="rounded-[20px] border-2 border-[#1E1B2E] bg-[#FCE2D5] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="vl-mono text-[11px] font-bold text-[#1E1B2E]">
                      GATED CHAPTER PREVIEW
                    </span>
                    <p className="text-xs sm:text-sm text-[#1E1B2E]">
                      {activeChapter.requiredTier === "squeeze"
                        ? "Complete the 1-field Squeeze Page to unseal this chapter."
                        : "Complete the 4-field Lead Capture Dossier below to unseal Chapters 03 & 04."}
                    </p>
                  </div>
                  <a
                    href={activeChapter.requiredTier === "squeeze" ? "#squeeze" : "#dossier"}
                    className="vl-btn vl-btn--primary shrink-0 py-2.5 px-5 text-xs"
                  >
                    <span>
                      Unlock via{" "}
                      {activeChapter.requiredTier === "squeeze" ? "Squeeze" : "Lead Capture"}
                    </span>
                    <span className="vl-btn__arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
