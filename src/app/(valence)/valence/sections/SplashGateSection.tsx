"use client";

import React, { useSyncExternalStore } from "react";
import { CapsuleCanvas } from "../capsule/CapsuleCanvas";
import { valenceStore } from "../capsule/store";
import { COHORT_EDITIONS } from "../content/funnelData";
import { Magnetic } from "../motion/Magnetic";

export function SplashGateSection() {
  const snapshot = useSyncExternalStore(
    valenceStore.subscribe,
    valenceStore.getSnapshot,
    valenceStore.getSnapshot,
  );

  const selectedCohort =
    COHORT_EDITIONS.find((c) => c.id === snapshot.selectedCohortId) ??
    COHORT_EDITIONS[0];

  const handleEnterSplashGate = () => {
    valenceStore.unlockTier("splash");
    valenceStore.setActiveTier("squeeze");
  };

  return (
    <section
      id="splash"
      aria-labelledby="vl-hero-heading"
      className="pt-6 pb-12 sm:pt-8 sm:pb-16"
    >
      <div className="vl-container">
        <div className="vl-slab vl-slab--lavender border-2 border-[#1E1B2E]/15 p-6 sm:p-10 lg:p-14">
          {/* Main 12-Col Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left 7 Columns: Splash Gate Announcement, Cohort Selector & Single Enter Action */}
            <div className="lg:col-span-7 space-y-6">
              <h1
                id="vl-hero-heading"
                className="vl-display text-[clamp(2.5rem,5.4vw,4.65rem)] font-extrabold leading-[0.98] text-[#1E1B2E]"
              >
                <span className="block overflow-clip vl-load-mask">
                  <span style={{ "--i": 0 } as React.CSSProperties}>
                    Three capture gates.
                  </span>
                </span>
                <span className="block overflow-clip vl-load-mask">
                  <span
                    style={{ "--i": 1, color: "#5B46E8" } as React.CSSProperties}
                  >
                    One calibrated exchange.
                  </span>
                </span>
              </h1>

              <p
                className="vl-load-rise text-lg sm:text-xl text-[#1E1B2E]/90 max-w-2xl leading-relaxed"
                style={{ "--i": 1 } as React.CSSProperties}
              >
                Capture pages perform when they match data requests to content depth. Select your benchmark cohort below, test the 1-field Squeeze, and inspect the 4-field Lead Capture Dossier.
              </p>

              {/* Interactive Splash Gate Card: Edition / Region Selection + Single Enter Button */}
              <div
                className="vl-load-rise rounded-[28px] border-2 border-[#1E1B2E] bg-[#FBF9F5] p-5 sm:p-6 space-y-4"
                style={{ "--i": 2 } as React.CSSProperties}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#1E1B2E]">
                    Benchmark Cohort
                  </span>
                  <span className="rounded-full bg-[#E8E0F8] px-3 py-1 vl-mono text-[11px] font-medium text-[#1E1B2E]">
                    {selectedCohort.regionTag}
                  </span>
                </div>

                <div
                  className="grid grid-cols-1 sm:grid-cols-3 gap-2.5"
                  role="radiogroup"
                  aria-label="Select regional benchmark cohort"
                >
                  {COHORT_EDITIONS.map((cohort) => {
                    const isSelected = cohort.id === selectedCohort.id;
                    return (
                      <button
                        key={cohort.id}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => valenceStore.setSelectedCohortId(cohort.id)}
                        className="rounded-[20px] p-3.5 text-left transition-all cursor-pointer"
                        style={{
                          backgroundColor: isSelected ? "#1E1B2E" : "#E8E0F8",
                          color: isSelected ? "#FBF9F5" : "#1E1B2E",
                          border: "1.5px solid #1E1B2E",
                        }}
                      >
                        <span className="block vl-mono text-[10px] opacity-80">
                          {cohort.regionTag}
                        </span>
                        <span className="mt-1 block text-xs sm:text-sm font-bold leading-snug">
                          {cohort.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Cohort Readout */}
                <div className="rounded-[20px] bg-[#D9F2E6] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="vl-mono text-[11px] font-semibold text-[#1E1B2E]">
                      {selectedCohort.headlineStat.toUpperCase()}
                    </span>
                    <p className="mt-0.5 text-xs sm:text-sm text-[#1E1B2E]">
                      {selectedCohort.summary}
                    </p>
                  </div>
                </div>

                {/* Single Splash "Enter / Continue" Button */}
                <div className="pt-1 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <Magnetic strength={9}>
                      <button
                        type="button"
                        onClick={handleEnterSplashGate}
                        data-testid="splash-enter-btn"
                        className="vl-btn vl-btn--primary px-7 py-4 text-base"
                      >
                        <span>
                          {snapshot.unlocked.splash
                            ? "Gate Unlatched · Continue"
                            : "Enter Briefing"}
                        </span>
                        <span className="vl-btn__arrow" aria-hidden="true">
                          →
                        </span>
                      </button>
                    </Magnetic>

                    <a
                      href="#squeeze"
                      onClick={handleEnterSplashGate}
                      className="vl-btn vl-btn--secondary px-5 py-3.5 text-sm"
                    >
                      Jump to Squeeze
                    </a>
                  </div>

                  <span
                    className="vl-mono text-xs text-[#645D7A]"
                    aria-live="polite"
                  >
                    {snapshot.unlocked.splash
                      ? "✓ RING 01 UNLATCHED"
                      : "0 FIELDS · 74.8% PASS-THROUGH"}
                  </span>
                </div>
              </div>

              {/* Three Format Pill Summary Strip */}
              <div
                className="vl-load-rise grid grid-cols-1 sm:grid-cols-3 gap-3"
                style={{ "--i": 3 } as React.CSSProperties}
              >
                <a
                  href="#splash"
                  onClick={() => valenceStore.setActiveTier("splash")}
                  className="rounded-full border border-[#1E1B2E]/15 bg-[#FBF9F5] px-4 py-3 flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-[#1E1B2E]">01 · Splash Gate</span>
                  <span className="rounded-full bg-[#E8E0F8] px-2.5 py-0.5 vl-mono text-[11px] text-[#1E1B2E]">
                    0 fields
                  </span>
                </a>
                <a
                  href="#squeeze"
                  onClick={() => valenceStore.setActiveTier("squeeze")}
                  className="rounded-full border border-[#1E1B2E]/15 bg-[#FBF9F5] px-4 py-3 flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-[#1E1B2E]">02 · Squeeze Page</span>
                  <span className="rounded-full bg-[#D9F2E6] px-2.5 py-0.5 vl-mono text-[11px] text-[#1E1B2E]">
                    1 email
                  </span>
                </a>
                <a
                  href="#dossier"
                  onClick={() => valenceStore.setActiveTier("lead-gen")}
                  className="rounded-full border border-[#1E1B2E]/15 bg-[#FBF9F5] px-4 py-3 flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-[#1E1B2E]">03 · Lead Capture</span>
                  <span className="rounded-full bg-[#FCE2D5] px-2.5 py-0.5 vl-mono text-[11px] text-[#1E1B2E]">
                    4 fields
                  </span>
                </a>
              </div>
            </div>

            {/* Right 5 Columns: Interactive 3D Pastel Capsule Dossier */}
            <div className="lg:col-span-5">
              <CapsuleCanvas />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
