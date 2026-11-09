'use client';

import React, { useState } from 'react';
import {
  FURNITURE_CATALOG,
  HOLLOWAY_ASSETS,
  ORDERED_FURNITURE_IDS,
} from '../../lib/holloway/floorPlan';

interface CollectionOverviewProps {
  onInspectInStudio: (moduleId: string) => void;
}

export default function CollectionOverview({ onInspectInStudio }: CollectionOverviewProps) {
  const [activeId, setActiveId] = useState<string>('sofa');
  const activeItem = FURNITURE_CATALOG[activeId] ?? FURNITURE_CATALOG.sofa;

  return (
    <section
      id="collection"
      aria-labelledby="collection-heading"
      className="relative w-full border-b border-[#262824]/15 bg-[#F5F2EA] py-20 md:py-28 lg:py-32"
    >
      {/* Top Architectural Datum Line with Crosshairs */}
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="flex items-center justify-between border-b border-[#262824]/20 pb-4 font-drafting text-[11px] tracking-[0.14em] text-[#777974] uppercase">
          <span>01 / MODULAR COLLECTION SYSTEM</span>
          <span className="hidden sm:inline">SERIES NO. 092 — FIVE CORE TYPOLOGIES</span>
          <span>SCALE 1:20</span>
        </div>

        {/* Editorial Split Composition */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Essay & Interactive Typology Ledger */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="font-ui text-[11px] font-medium tracking-[0.18em] text-[#777974] uppercase">
                ARCHITECTURAL DOMESTICITY
              </p>

              <h2
                id="collection-heading"
                style={{ textWrap: 'balance' }}
                className="mt-3 font-editorial text-[38px] sm:text-[46px] md:text-[54px] font-normal leading-[1.02] tracking-[0.01em] text-[#262824] uppercase"
              >
                OBJECTS PROPORTIONED FOR EVOLVING ROOMS.
              </h2>

              <p className="mt-6 font-ui text-[15px] md:text-[16px] leading-[1.7] text-[#262824]/85">
                Rather than isolated statement pieces that compete for attention, the HOLLOWAY
                collection is conceived as a quiet architectural kit of parts. Five foundational
                forms—seating, lounge, horizontal plinth, open vertical storage, and warm
                illumination—share a unified datum and honest material palette.
              </p>

              <p className="mt-4 font-ui text-[15px] md:text-[16px] leading-[1.7] text-[#262824]/75">
                Every module aligns to a logical spatial grid, allowing rooms to expand, contract,
                or reconfigure as daily rituals shift from solitude to gathering.
              </p>
            </div>

            {/* Interactive Typology Ledger (Clean unboxed editorial index) */}
            <div className="mt-10 border-t border-[#262824]/20">
              <div className="py-3 flex items-center justify-between font-drafting text-[10px] tracking-[0.14em] text-[#777974] uppercase border-b border-[#262824]/15">
                <span>INDEX / TYPOLOGY</span>
                <span>FOOTPRINT · METRIC</span>
              </div>

              <div role="tablist" aria-label="Collection Furniture Typologies">
                {ORDERED_FURNITURE_IDS.map((id) => {
                  const entry = FURNITURE_CATALOG[id];
                  const isCurrent = activeId === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      aria-selected={isCurrent}
                      onClick={() => setActiveId(id)}
                      className={`w-full text-left py-4 border-b border-[#262824]/15 transition-colors flex items-baseline justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#262824] ${
                        isCurrent
                          ? 'text-[#262824]'
                          : 'text-[#262824]/60 hover:text-[#262824]'
                      }`}
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-drafting text-[11px] text-[#777974]">
                          {entry.index}
                        </span>
                        <span
                          className={`font-editorial text-[22px] md:text-[25px] tracking-[0.02em] ${
                            isCurrent ? 'font-medium underline underline-offset-8 decoration-[#262824]/50' : 'font-normal'
                          }`}
                        >
                          {entry.fullName}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 font-drafting text-[11px] whitespace-nowrap shrink-0">
                        <span className="text-[#777974]">{entry.gridFootprintLabel}</span>
                        <span aria-hidden="true" className="text-[#262824]/30">
                          ·
                        </span>
                        <span>{entry.dimensionsMetric.split('×')[0].trim()} mm</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Cutout & Scale Model Study */}
          <div className="lg:col-span-7">
            <div className="relative border border-[#262824]/20 bg-[#ECE7DC] p-6 sm:p-10 md:p-12">
              {/* Corner Drafting Crosshairs */}
              <span
                aria-hidden="true"
                className="absolute top-2 left-3 font-drafting text-[11px] text-[#262824]/45"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="absolute top-2 right-3 font-drafting text-[11px] text-[#262824]/45"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="absolute bottom-2 left-3 font-drafting text-[11px] text-[#262824]/45"
              >
                +
              </span>
              <span
                aria-hidden="true"
                className="absolute bottom-2 right-3 font-drafting text-[11px] text-[#262824]/45"
              >
                +
              </span>

              {/* Top Spec Header inside Frame */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#262824]/15 pb-4">
                <div className="flex items-center gap-3 font-drafting text-[11px] tracking-[0.12em] text-[#262824]">
                  <span>REF. {activeItem.code}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#777974] uppercase">{activeItem.category}</span>
                </div>
                <div className="flex items-center gap-2 font-drafting text-[11px] text-[#262824]">
                  <span
                    aria-hidden="true"
                    className="inline-block h-3 w-3 border border-[#262824]/40"
                    style={{ backgroundColor: activeItem.swatchHex }}
                  />
                  <span>{activeItem.gridFootprintLabel}</span>
                </div>
              </div>

              {/* Primary Object Study + Architectural Scale Model Context */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-7 relative aspect-square overflow-hidden border border-[#262824]/15 bg-[#F5F2EA]">
                  <img
                    src={activeItem.imageUrl}
                    alt={`${activeItem.fullName} — ${activeItem.materialSummary}`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between border-t border-[#262824]/20 pt-2 font-drafting text-[10px] text-[#262824]/80 bg-[#F5F2EA]/75 backdrop-blur-[2px] px-2.5 py-1">
                    <span>ORTHOGRAPHIC STUDY</span>
                    <span>{activeItem.dimensionsMetric}</span>
                  </div>
                </div>

                {/* Secondary Fragment: Scale Model Workshop + Specification Notes */}
                <div className="md:col-span-5 flex flex-col justify-between gap-6">
                  <div className="border border-[#262824]/15 bg-[#F5F2EA] p-2.5">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={HOLLOWAY_ASSETS.emptyRoomModel}
                        alt="HOLLOWAY 1:20 timber and plaster architectural room model on studio drafting table"
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="mt-2 font-drafting text-[10px] tracking-[0.08em] text-[#777974] uppercase">
                      FIG. 01 — PHYSICAL DATUM MODEL (12 × 8 GRID)
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="font-drafting text-[10px] tracking-[0.14em] text-[#777974] uppercase">
                        MATERIAL SPECIFICATION
                      </p>
                      <p className="mt-1 font-ui text-[14px] leading-[1.55] text-[#262824]">
                        {activeItem.materialSummary}
                      </p>
                    </div>

                    <div>
                      <p className="font-drafting text-[10px] tracking-[0.14em] text-[#777974] uppercase">
                        SPATIAL ROLE
                      </p>
                      <p className="mt-1 font-ui text-[14px] leading-[1.55] text-[#262824]/80">
                        {activeItem.architecturalNote}
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => onInspectInStudio(activeItem.id)}
                        className="font-ui text-[11px] font-medium tracking-[0.15em] text-[#262824] uppercase border-b border-[#262824] pb-1 hover:text-[#874C54] hover:border-[#874C54] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#262824]"
                      >
                        POSITION {activeItem.shortName} IN ROOM STUDIO <span aria-hidden="true">↗</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
