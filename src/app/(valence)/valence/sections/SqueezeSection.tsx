"use client";

import React, { useSyncExternalStore } from "react";
import { valenceStore } from "../capsule/store";
import { SqueezeForm } from "../forms/SqueezeForm";
import { Reveal } from "../motion/Reveal";

export function SqueezeSection() {
  const snapshot = useSyncExternalStore(
    valenceStore.subscribe,
    valenceStore.getSnapshot,
    valenceStore.getSnapshot,
  );

  return (
    <section
      id="squeeze"
      aria-labelledby="vl-squeeze-heading"
      className="py-12 sm:py-16"
    >
      <div className="vl-container">
        <Reveal
          variant="wipe"
          className="vl-slab vl-slab--mint border-2 border-[#1E1B2E]/15 p-6 sm:p-10 lg:p-14"
        >
          {/* Top Eyebrow Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#1E1B2E]/10">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#FBF9F5] px-4 py-1.5 border border-[#1E1B2E]/15 vl-mono text-xs font-semibold text-[#1E1B2E]">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: "#5B46E8" }}
              />
              STAGE 02 · SQUEEZE PAGE · MINIMALIST 1-FIELD CAPTURE
            </span>
            <span className="rounded-full bg-[#E8E0F8] px-4 py-1.5 vl-mono text-xs font-semibold text-[#1E1B2E]">
              MEDIAN CVR: 38.4% · 8-SECOND COMPLETION
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left 7 Columns: Classic Squeeze Format — Bold Headline, 2 Sentences of Copy, Single Input Field */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-3">
                <span className="vl-mono text-xs font-bold text-[#5B46E8]">
                  THE DISTILLED VALUE EXCHANGE
                </span>
                <h2
                  id="vl-squeeze-heading"
                  className="vl-display text-3xl sm:text-5xl font-extrabold leading-[1.02] text-[#1E1B2E]"
                >
                  One email address. Fourteen pages of empirical funnel benchmarks.
                </h2>
              </div>

              {/* Exactly two sentences of copy, honoring classic Squeeze Page discipline */}
              <p className="text-base sm:text-lg text-[#1E1B2E]/90 leading-relaxed max-w-2xl">
                Get the 2026 Executive Synthesis—covering conversion rates across 418 B2B SaaS funnels, optimal field counts, and top-performing headline formulas—delivered immediately in your browser. Zero multi-step questionnaires: enter your work email below to unseal Ring 02 and unlock Chapter 02 right now.
              </p>

              {/* Single-Field Squeeze Form */}
              <SqueezeForm />

              {/* Micro-Anatomy Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="rounded-full bg-[#FBF9F5] px-3.5 py-1.5 vl-mono text-[11px] font-medium text-[#1E1B2E] border border-[#1E1B2E]/12">
                  ✓ 1 BOLD HEADLINE
                </span>
                <span className="rounded-full bg-[#FBF9F5] px-3.5 py-1.5 vl-mono text-[11px] font-medium text-[#1E1B2E] border border-[#1E1B2E]/12">
                  ✓ 2 SENTENCES OF COPY
                </span>
                <span className="rounded-full bg-[#FBF9F5] px-3.5 py-1.5 vl-mono text-[11px] font-medium text-[#1E1B2E] border border-[#1E1B2E]/12">
                  ✓ 1 PILL INPUT FIELD
                </span>
                <span className="rounded-full bg-[#FCE2D5] px-3.5 py-1.5 vl-mono text-[11px] font-semibold text-[#1E1B2E] border border-[#1E1B2E]/12">
                  ✓ INSTANT DELIVERABLE
                </span>
              </div>
            </div>

            {/* Right 5 Columns: Instant Deliverable Card (14-Page Executive Synthesis Preview) */}
            <div className="lg:col-span-5">
              <div className="rounded-[28px] border-2 border-[#1E1B2E] bg-[#FBF9F5] p-6 sm:p-7 space-y-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-[#D9F2E6] px-3.5 py-1 vl-mono text-xs font-semibold text-[#1E1B2E]">
                    INSTANT PAYOFF · PDF SYNTHESIS
                  </span>
                  <span className="vl-mono text-xs font-semibold text-[#5B46E8]">
                    {snapshot.unlocked.squeeze ? "UNLOCKED ✓" : "1-FIELD GATE"}
                  </span>
                </div>

                {/* Custom SVG Deliverable Illustration */}
                <div className="rounded-[22px] bg-[#E8E0F8] p-4 border border-[#1E1B2E]/12">
                  <svg
                    viewBox="0 0 360 170"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="14-Page Executive Synthesis Digest Preview"
                    className="w-full h-auto"
                  >
                    <rect
                      x="12"
                      y="12"
                      width="336"
                      height="146"
                      rx="18"
                      fill="#FBF9F5"
                      stroke="#1E1B2E"
                      strokeWidth="2"
                    />
                    <rect x="28" y="28" width="96" height="18" rx="9" fill="#D9F2E6" />
                    <text
                      x="76"
                      y="40"
                      textAnchor="middle"
                      fill="#1E1B2E"
                      fontFamily="JetBrains Mono, monospace"
                      fontSize="9"
                      fontWeight="700"
                    >
                      14-PAGE DIGEST
                    </text>

                    <rect x="28" y="58" width="180" height="10" rx="5" fill="#1E1B2E" />
                    <rect x="28" y="76" width="140" height="8" rx="4" fill="#645D7A" />

                    {/* Mini bar chart */}
                    <rect x="28" y="102" width="196" height="14" rx="7" fill="#D9F2E6" stroke="#1E1B2E" strokeWidth="1.5" />
                    <rect x="28" y="124" width="132" height="14" rx="7" fill="#FCE2D5" stroke="#1E1B2E" strokeWidth="1.5" />

                    {/* Badge */}
                    <circle cx="292" cy="85" r="36" fill="#5B46E8" />
                    <text
                      x="292"
                      y="82"
                      textAnchor="middle"
                      fill="#FBF9F5"
                      fontFamily="Urbanist, sans-serif"
                      fontSize="16"
                      fontWeight="800"
                    >
                      38.4%
                    </text>
                    <text
                      x="292"
                      y="97"
                      textAnchor="middle"
                      fill="#FBF9F5"
                      fontFamily="JetBrains Mono, monospace"
                      fontSize="8"
                    >
                      MEDIAN CVR
                    </text>
                  </svg>
                </div>

                <div className="space-y-2">
                  <h3 className="vl-display text-xl font-bold text-[#1E1B2E]">
                    What unlocks with your email:
                  </h3>
                  <ul className="space-y-2 text-sm text-[#645D7A]">
                    <li className="flex items-center gap-2.5 text-[#1E1B2E]">
                      <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ backgroundColor: "#5B46E8" }}
                      />
                      <span>
                        <strong>Chapter 02 Unblurred:</strong> Squeeze Page copy &amp; inline pill anatomy
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5 text-[#1E1B2E]">
                      <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ backgroundColor: "#5B46E8" }}
                      />
                      <span>
                        <strong>Waitlist Priority Pass:</strong> Deterministic <code>SQ-26-XXXX</code> token
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5 text-[#1E1B2E]">
                      <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ backgroundColor: "#5B46E8" }}
                      />
                      <span>
                        <strong>Progressive Carry-Forward:</strong> Pre-fills Stage 03 Lead Capture
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
