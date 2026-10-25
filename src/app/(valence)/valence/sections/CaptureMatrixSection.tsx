"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { stageProgressFromScroll, tierFromProgress } from "../capsule/logic";
import { valenceStore } from "../capsule/store";
import { CAPTURE_FORMATS, type CaptureTierId } from "../content/funnelData";
import { Reveal } from "../motion/Reveal";
import { TiltCard } from "../motion/TiltCard";

export function CaptureMatrixSection() {
  const snapshot = useSyncExternalStore(
    valenceStore.subscribe,
    valenceStore.getSnapshot,
    valenceStore.getSnapshot,
  );
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProg, setScrollProg] = useState(0);
  const [manualLockUntil, setManualLockUntil] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let rafId = 0;
    const update = () => {
      rafId = 0;
      const rect = el.getBoundingClientRect();
      const top = window.scrollY + rect.top;
      const p = stageProgressFromScroll(
        window.scrollY,
        top - window.innerHeight * 0.25,
        rect.height + window.innerHeight * 0.25,
        window.innerHeight,
      );
      setScrollProg(p);

      if (Date.now() > manualLockUntil && rect.top < window.innerHeight * 0.65 && rect.bottom > window.innerHeight * 0.35) {
        const nextTier = tierFromProgress(p);
        valenceStore.setActiveTier(nextTier);
      }
    };

    const onScroll = () => {
      if (!rafId) rafId = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [manualLockUntil]);

  const handleSelectFormat = (id: CaptureTierId) => {
    setManualLockUntil(Date.now() + 2500);
    valenceStore.setActiveTier(id);
  };

  const activeSpec =
    CAPTURE_FORMATS.find((f) => f.id === snapshot.activeTier) ??
    CAPTURE_FORMATS[0];

  return (
    <section
      id="compare"
      ref={sectionRef}
      aria-labelledby="vl-matrix-heading"
      className="py-14 sm:py-20"
    >
      <div className="vl-container space-y-10">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <Reveal variant="slide-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#E8E0F8] px-4 py-1.5 vl-mono text-xs font-semibold text-[#1E1B2E]">
                ARCHITECTURE MATRIX · TOP &amp; MIDDLE OF FUNNEL
              </span>
            </Reveal>
            <Reveal as="h2" variant="mask" className="vl-display text-3xl sm:text-5xl font-extrabold text-[#1E1B2E]">
              <span id="vl-matrix-heading">
                Match the capture gate to what you give back.
              </span>
            </Reveal>
          </div>

          <Reveal variant="rise" delay={120} className="max-w-md text-sm sm:text-base text-[#645D7A]">
            Every field on a form is a price tag. Compare how Splash Pages, Squeeze Pages, and Lead Capture Pages trade contact data for content, access, or tools.
          </Reveal>
        </div>

        {/* Interactive Format Switcher Pills */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 rounded-full border border-[#1E1B2E]/15 bg-[#E8E0F8]/55 p-2"
          role="tablist"
          aria-label="Capture page formats"
        >
          <div className="flex flex-wrap items-center gap-2">
            {CAPTURE_FORMATS.map((format) => {
              const active = snapshot.activeTier === format.id;
              return (
                <button
                  key={format.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleSelectFormat(format.id)}
                  className="rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer"
                  style={{
                    backgroundColor: active ? "#1E1B2E" : format.surfaceHex,
                    color: active ? "#FBF9F5" : "#1E1B2E",
                    border: "1.5px solid #1E1B2E",
                  }}
                >
                  {format.stepCode} · {format.title} ({format.fieldsRequired}{" "}
                  {format.fieldsRequired === 1 ? "field" : "fields"})
                </button>
              );
            })}
          </div>
          <span className="hidden md:inline-block pr-4 vl-mono text-xs text-[#645D7A]">
            STAGE SCRUB: {Math.round(scrollProg * 100)}%
          </span>
        </div>

        {/* Active Format Spotlight Panel */}
        <div
          className="rounded-[32px] border-2 border-[#1E1B2E] p-6 sm:p-10 transition-colors duration-300"
          style={{ backgroundColor: activeSpec.surfaceHex }}
          role="tabpanel"
          aria-label={`${activeSpec.title} specification`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="rounded-full bg-[#1E1B2E] px-3.5 py-1 vl-mono text-xs font-semibold text-[#FBF9F5]">
                  FORMAT {activeSpec.stepCode}
                </span>
                <span className="rounded-full bg-[#FBF9F5] px-3.5 py-1 vl-mono text-xs font-semibold text-[#1E1B2E] border border-[#1E1B2E]/15">
                  {activeSpec.funnelStage}
                </span>
                <span className="rounded-full bg-[#FBF9F5] px-3.5 py-1 vl-mono text-xs text-[#5B46E8] font-semibold">
                  {activeSpec.frictionLabel}
                </span>
              </div>

              <h3 className="vl-display text-3xl sm:text-4xl font-extrabold text-[#1E1B2E]">
                {activeSpec.title} — {activeSpec.subtitle}
              </h3>

              <p className="text-base sm:text-lg text-[#1E1B2E]/90 leading-relaxed">
                {activeSpec.definition}
              </p>

              <div className="rounded-[24px] bg-[#FBF9F5] p-5 border border-[#1E1B2E]/15 space-y-2.5">
                <span className="vl-mono text-xs font-semibold text-[#5B46E8]">
                  STRUCTURAL ANATOMY
                </span>
                <ul className="space-y-2">
                  {activeSpec.anatomyPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-[#1E1B2E]">
                      <span
                        className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: "#5B46E8" }}
                      />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right 5 Columns: Telemetry Readout & Ideal Use Cases */}
            <div className="lg:col-span-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-[24px] bg-[#FBF9F5] p-5 border border-[#1E1B2E]/15">
                  <span className="vl-mono text-[11px] text-[#645D7A]">MEDIAN CVR</span>
                  <p className="vl-display mt-1 text-3xl sm:text-4xl font-extrabold text-[#1E1B2E]">
                    {activeSpec.medianCvr}%
                  </p>
                  <span className="text-xs text-[#645D7A]">418 B2B funnels</span>
                </div>

                <div className="rounded-[24px] bg-[#FBF9F5] p-5 border border-[#1E1B2E]/15">
                  <span className="vl-mono text-[11px] text-[#645D7A]">INTENT SCORE</span>
                  <p className="vl-display mt-1 text-3xl sm:text-4xl font-extrabold text-[#5B46E8]">
                    {activeSpec.intentScore}/100
                  </p>
                  <span className="text-xs text-[#645D7A]">{activeSpec.fieldSummary}</span>
                </div>
              </div>

              <div className="rounded-[24px] bg-[#FBF9F5] p-5 border border-[#1E1B2E]/15 space-y-3">
                <span className="vl-mono text-xs font-semibold text-[#1E1B2E]">
                  WHEN TO DEPLOY THIS FORMAT
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeSpec.idealUseCases.map((useCase, i) => (
                    <span
                      key={i}
                      className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-[#1E1B2E] border border-[#1E1B2E]/15"
                      style={{ backgroundColor: activeSpec.surfaceHex }}
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
                <p className="pt-1 text-xs text-[#645D7A]">
                  <strong>Value Payoff:</strong> {activeSpec.payoffSummary}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Up Comparison Cards with Pointer Spotlight & Tilt */}
        <div className="vl-card-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {CAPTURE_FORMATS.map((format, idx) => {
            const isSelected = snapshot.activeTier === format.id;
            const targetHref =
              format.id === "splash"
                ? "#splash"
                : format.id === "squeeze"
                  ? "#squeeze"
                  : "#dossier";

            return (
              <Reveal key={format.id} variant="scale" index={idx}>
                <TiltCard
                  className="h-full p-6 sm:p-7 flex flex-col justify-between"
                  style={{
                    backgroundColor: isSelected ? format.surfaceHex : "#FBF9F5",
                    borderColor: isSelected ? "#1E1B2E" : undefined,
                  }}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="rounded-full px-3.5 py-1 vl-mono text-xs font-bold text-[#1E1B2E] border border-[#1E1B2E]/20"
                        style={{ backgroundColor: format.surfaceHex }}
                      >
                        {format.stepCode} · {format.title.toUpperCase()}
                      </span>
                      <span className="vl-mono text-xs font-semibold text-[#5B46E8]">
                        {format.fieldsRequired} {format.fieldsRequired === 1 ? "FIELD" : "FIELDS"}
                      </span>
                    </div>

                    <h3 className="vl-display text-2xl font-extrabold text-[#1E1B2E]">
                      {format.subtitle}
                    </h3>

                    <p className="text-sm text-[#645D7A] leading-relaxed">
                      {format.definition}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#1E1B2E]/10 flex items-center justify-between gap-2">
                    <div>
                      <span className="block vl-mono text-[10px] text-[#645D7A]">
                        BENCHMARK CVR
                      </span>
                      <span className="vl-display text-xl font-extrabold text-[#1E1B2E]">
                        {format.medianCvr}%
                      </span>
                    </div>

                    <a
                      href={targetHref}
                      onClick={() => handleSelectFormat(format.id)}
                      className="vl-btn vl-btn--secondary py-2.5 px-4 text-xs"
                    >
                      <span>Try {format.title}</span>
                      <span className="vl-btn__arrow" aria-hidden="true">
                        →
                      </span>
                    </a>
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
