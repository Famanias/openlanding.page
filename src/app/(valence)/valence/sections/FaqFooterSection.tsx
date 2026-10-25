"use client";

import React, { useState, useSyncExternalStore } from "react";
import { ValenceLogo } from "../brand/Logo";
import { valenceStore } from "../capsule/store";
import { VALENCE_FAQS } from "../content/funnelData";
import { Marquee } from "../motion/Marquee";
import { Reveal } from "../motion/Reveal";

const MARQUEE_ITEMS = [
  "01 SPLASH PAGE · 74.8% MEDIAN PASS-THROUGH",
  "02 SQUEEZE PAGE · 38.4% SINGLE-FIELD CVR",
  "03 LEAD CAPTURE · 94% QUALIFICATION SIGNAL",
  "418 B2B SAAS FUNNELS BENCHMARKED",
  "ASK ONLY FOR WHAT THE ASSET EARNS",
  "ZERO NETWORK REQUESTS · CLIENT-VALIDATED DEMO",
];

export function FaqFooterSection() {
  const snapshot = useSyncExternalStore(
    valenceStore.subscribe,
    valenceStore.getSnapshot,
    valenceStore.getSnapshot,
  );
  const [openId, setOpenId] = useState<string | null>(VALENCE_FAQS[0].id);

  return (
    <div className="space-y-14 pt-8 pb-16">
      {/* Marquee Ticker */}
      <div className="vl-container">
        <Marquee items={MARQUEE_ITEMS} />
      </div>

      {/* Governance & Architecture FAQ */}
      <section id="faq" aria-labelledby="vl-faq-heading" className="vl-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <Reveal variant="slide-left">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#E8E0F8] px-4 py-1.5 vl-mono text-xs font-semibold text-[#1E1B2E]">
                FUNNEL GOVERNANCE · FAQ
              </span>
            </Reveal>
            <Reveal
              as="h2"
              variant="mask"
              className="vl-display text-3xl sm:text-4xl font-extrabold text-[#1E1B2E]"
            >
              <span id="vl-faq-heading">
                How value exchange works in practice.
              </span>
            </Reveal>
            <p className="text-sm sm:text-base text-[#645D7A]">
              Answers on when to deploy a Splash Gate, Squeeze Page, or multi-field B2B Lead Capture Dossier.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {VALENCE_FAQS.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-[26px] border-2 border-[#1E1B2E]/15 bg-[#FBF9F5] p-5 transition-colors"
                  style={{
                    backgroundColor: isOpen ? "#E8E0F8" : "#FBF9F5",
                    borderColor: isOpen ? "#1E1B2E" : undefined,
                  }}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenId(isOpen ? null : faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`vl-faq-panel-${faq.id}`}
                      className="flex w-full items-center justify-between gap-4 text-left cursor-pointer"
                    >
                      <span className="vl-display text-lg sm:text-xl font-bold text-[#1E1B2E]">
                        {faq.question}
                      </span>
                      <span className="inline-flex items-center gap-2 shrink-0">
                        <span className="hidden sm:inline-block rounded-full bg-[#FBF9F5] px-3 py-1 vl-mono text-[10px] font-semibold text-[#1E1B2E] border border-[#1E1B2E]/15">
                          {faq.tierTag}
                        </span>
                        <span
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#1E1B2E] text-[#FBF9F5] vl-mono text-sm"
                          aria-hidden="true"
                        >
                          {isOpen ? "−" : "+"}
                        </span>
                      </span>
                    </button>
                  </h3>

                  <div
                    id={`vl-faq-panel-${faq.id}`}
                    role="region"
                    className="vl-accordion-body"
                    data-open={isOpen ? "true" : "false"}
                  >
                    <div className="vl-accordion-inner">
                      <p className="pt-3 text-sm sm:text-base text-[#1E1B2E]/90 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pastel Colophon Footer */}
      <footer className="vl-container" aria-label="Valence site footer">
        <div className="rounded-[34px] border-2 border-[#1E1B2E] bg-[#1E1B2E] text-[#FBF9F5] p-8 sm:p-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#FBF9F5]/15 pb-8">
            <div className="space-y-2 max-w-md">
              <ValenceLogo tone="paper" />
              <p className="text-sm text-[#E8E0F8]/80">
                Valence Research &amp; Funnel Architecture Studio. Demonstrating Splash Pages, Squeeze Pages, and B2B Lead Capture Dossiers in one tactile pastel system.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#splash"
                onClick={() => valenceStore.setActiveTier("splash")}
                className="rounded-full bg-[#E8E0F8] px-4 py-2 text-xs font-bold text-[#1E1B2E]"
              >
                01 · Splash Gate
              </a>
              <a
                href="#squeeze"
                onClick={() => valenceStore.setActiveTier("squeeze")}
                className="rounded-full bg-[#D9F2E6] px-4 py-2 text-xs font-bold text-[#1E1B2E]"
              >
                02 · Squeeze Page
              </a>
              <a
                href="#dossier"
                onClick={() => valenceStore.setActiveTier("lead-gen")}
                className="rounded-full bg-[#FCE2D5] px-4 py-2 text-xs font-bold text-[#1E1B2E]"
              >
                03 · Lead Capture
              </a>
              <button
                type="button"
                onClick={() => valenceStore.toggleAmbientPaused()}
                aria-pressed={snapshot.ambientPaused}
                className="rounded-full border border-[#FBF9F5]/30 px-4 py-2 vl-mono text-xs text-[#FBF9F5] cursor-pointer"
              >
                {snapshot.ambientPaused ? "RESUME AMBIENT MOTION" : "PAUSE AMBIENT MOTION"}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 vl-mono text-xs text-[#E8E0F8]/75">
            <span>© 2026 VALENCE LABS · FICTIONAL BENCHMARK STUDIO</span>
            <span>LOCAL DEMO ONLY · ZERO NETWORK REQUESTS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
