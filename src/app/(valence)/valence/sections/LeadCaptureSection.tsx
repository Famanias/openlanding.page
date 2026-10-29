"use client";

import React from "react";
import { SOCIAL_PROOF_LOGOS } from "../content/funnelData";
import { LeadCaptureForm } from "../forms/LeadCaptureForm";
import { CountUp } from "../motion/CountUp";
import { Reveal } from "../motion/Reveal";
import { TiltCard } from "../motion/TiltCard";

export function LeadCaptureSection() {
  return (
    <section
      id="dossier"
      aria-labelledby="vl-dossier-heading"
      className="py-12 sm:py-18"
    >
      <div className="vl-container space-y-12">
        <div className="vl-slab vl-slab--peach border-2 border-[#1E1B2E]/15 p-6 sm:p-10 lg:p-14">
          {/* 12-Col Split: Left 5 Cols Benefits & Count-Up Proof, Right 7 Cols Multi-Field Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <h2
                id="vl-dossier-heading"
                className="vl-display text-3xl sm:text-5xl font-extrabold leading-[1.02] text-[#1E1B2E]"
              >
                Four fields that earn their keep.
              </h2>

              <p className="text-base text-[#1E1B2E]/90 leading-relaxed">
                Built for high-consideration B2B funnels, the Lead Capture page pairs multi-field qualification with concrete proof and immediate tailored benchmarks.
              </p>

              {/* Benefit Bullets */}
              <ul className="space-y-3 rounded-[26px] border border-[#1E1B2E]/15 bg-[#FBF9F5] p-5">
                <li className="flex items-start gap-3 text-sm text-[#1E1B2E]">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#D9F2E6] vl-mono text-xs font-bold text-[#1E1B2E]">
                    1
                  </span>
                  <span>
                    <strong>Complete 68-Page Monograph:</strong> Chapters 01–04 with conversion elasticity tables.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#1E1B2E]">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E8E0F8] vl-mono text-xs font-bold text-[#1E1B2E]">
                    2
                  </span>
                  <span>
                    <strong>Cohort-Weighted Scorecard:</strong> Benchmarks calibrated to your Company Size and Role.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[#1E1B2E]">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FCE2D5] vl-mono text-xs font-bold text-[#1E1B2E]">
                    3
                  </span>
                  <span>
                    <strong>Deterministic Dossier Key:</strong> Mints your persistent <code>VL-2026-XXXX</code> audit token locally.
                  </span>
                </li>
              </ul>

              {/* Empirical Count-Up Metrics */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-[22px] border border-[#1E1B2E]/15 bg-[#FBF9F5] p-4">
                  <p className="vl-display text-2xl sm:text-3xl font-extrabold text-[#1E1B2E]">
                    <CountUp value={418} />
                  </p>
                  <span className="vl-mono text-[10px] text-[#645D7A]">
                    B2B FUNNELS
                  </span>
                </div>
                <div className="rounded-[22px] border border-[#1E1B2E]/15 bg-[#FBF9F5] p-4">
                  <p className="vl-display text-2xl sm:text-3xl font-extrabold text-[#5B46E8]">
                    <CountUp value={3.4} decimals={1} suffix="×" />
                  </p>
                  <span className="vl-mono text-[10px] text-[#645D7A]">
                    PIPELINE LIFT
                  </span>
                </div>
                <div className="rounded-[22px] border border-[#1E1B2E]/15 bg-[#FBF9F5] p-4">
                  <p className="vl-display text-2xl sm:text-3xl font-extrabold text-[#1E1B2E]">
                    <CountUp value={94} suffix="%" />
                  </p>
                  <span className="vl-mono text-[10px] text-[#645D7A]">
                    ROUTING SIGNAL
                  </span>
                </div>
              </div>
            </div>

            {/* Right 7 Columns: Multi-Field B2B Form */}
            <div className="lg:col-span-7">
              <LeadCaptureForm />
            </div>
          </div>
        </div>

        {/* Social Proof Grid (B2B Revenue & Growth Teams) */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="vl-display text-2xl font-bold text-[#1E1B2E]">
              Peer benchmark proof
            </h3>
            <span className="rounded-full bg-[#E8E0F8] px-3.5 py-1 vl-mono text-xs font-semibold text-[#1E1B2E]">
              418 B2B TEAMS
            </span>
          </div>

          <div className="vl-card-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            {SOCIAL_PROOF_LOGOS.map((item, idx) => (
              <Reveal key={item.company} variant="scale" index={idx}>
                <TiltCard className="h-full p-6 sm:p-7 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="vl-display text-lg font-extrabold text-[#1E1B2E]">
                          {item.company}
                        </span>
                        <span className="block vl-mono text-[10px] text-[#645D7A]">
                          {item.segment}
                        </span>
                      </div>
                      <span
                        className="rounded-full px-3.5 py-1 vl-mono text-xs font-bold text-[#1E1B2E] border border-[#1E1B2E]/15"
                        style={{
                          backgroundColor:
                            idx % 3 === 0 ? "#D9F2E6" : idx % 3 === 1 ? "#E8E0F8" : "#FCE2D5",
                        }}
                      >
                        {item.metric}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base text-[#1E1B2E]/90 leading-relaxed">
                      “{item.quote}”
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#1E1B2E]/10 flex items-center justify-between text-xs text-[#645D7A]">
                    <strong className="text-[#1E1B2E]">{item.author}</strong>
                    <span>{item.role}</span>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
