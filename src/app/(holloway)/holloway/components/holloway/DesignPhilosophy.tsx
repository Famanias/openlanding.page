'use client';

import React from 'react';
import { HOLLOWAY_ASSETS } from '../../lib/holloway/floorPlan';

export default function DesignPhilosophy() {
  return (
    <section
      id="about"
      aria-labelledby="philosophy-heading"
      className="relative w-full border-b border-[#262824]/15 bg-[#EFECE3] py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Top Section Datum Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#262824]/20 pb-4 font-drafting text-[11px] tracking-[0.14em] text-[#777974] uppercase">
          <span>04 / DESIGN PHILOSOPHY & JOINERY CRAFT</span>
          <span className="hidden sm:inline">CONSTRUCTED SIMPLICITY · ARCHITECTURAL LONGEVITY</span>
          <span>ATELIER NOTES</span>
        </div>

        {/* Full-Width Editorial Studio Scene with Architectural Caption */}
        <div className="mt-12 border border-[#262824]/20 bg-[#F5F2EA] p-4 sm:p-6">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <img
              src={HOLLOWAY_ASSETS.lifestyleRoom}
              alt="HOLLOWAY architectural studio living space featuring walnut modular shelving wall, powder-blue sofa with burgundy throw, low timber table with architectural scale models, and tall daylight window"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 font-drafting text-[10.5px] tracking-[0.1em] text-[#777974] uppercase">
            <span>
              FIG. 04 — RESIDENCE & STUDIO STUDY: WALNUT SHELVING SYSTEM, ATELIER SOFA & PLINTH TABLE
            </span>
            <span>NATURAL NORTH-EAST DAYLIGHT</span>
          </div>
        </div>

        {/* Editorial Narrative + Joinery Craft Photography */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Joinery Craft Close-up */}
          <div className="lg:col-span-5">
            <div className="border border-[#262824]/20 bg-[#F5F2EA] p-4 sm:p-5">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={HOLLOWAY_ASSETS.assemblyDetail}
                  alt="Craftsperson assembling precision three-way interlocking walnut joinery with a hex key on a timber workbench"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-3.5 flex items-center justify-between border-t border-[#262824]/15 pt-3 font-drafting text-[10px] tracking-[0.1em] text-[#777974] uppercase">
                <span>FIG. 05 — THREE-WAY INTERLOCKING TIMBER JOINT</span>
                <span>HEX FASTENER · DRY ASSEMBLY</span>
              </div>
            </div>
          </div>

          {/* Right: Architectural Narrative & Principles */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <p className="font-ui text-[11px] font-medium tracking-[0.18em] text-[#777974] uppercase">
                THE HOLLOWAY APPROACH
              </p>
              <h2
                id="philosophy-heading"
                style={{ textWrap: 'balance' }}
                className="mt-3 font-editorial text-[38px] sm:text-[48px] md:text-[56px] font-normal leading-[1.02] tracking-[0.01em] text-[#262824] uppercase"
              >
                THE HOME AS AN EVOLVING COMPOSITION.
              </h2>
            </div>

            <div className="space-y-5 font-ui text-[15.5px] md:text-[16.5px] leading-[1.75] text-[#262824]/85 max-w-[64ch]">
              <p>
                Architecture is rarely static; the rooms we inhabit shift between work, quiet reading,
                and shared conversation. Yet conventional furniture is built as if a floor plan is
                permanent—heavy, fixed, and difficult to disassemble when life moves.
              </p>
              <p>
                Every HOLLOWAY piece begins at the joinery level. By combining precision-milled
                interlocking timber shoulders with recessed mechanical fasteners, our modules
                assemble with structural rigidity and disassemble cleanly without wear.
              </p>
            </div>

            {/* Three Measured Editorial Tenets (Clean Hairline Rows, Zero Cards/Pills) */}
            <div className="border-t border-[#262824]/20 pt-2">
              <div className="py-5 border-b border-[#262824]/15 grid grid-cols-1 sm:grid-cols-12 gap-3 items-baseline">
                <span className="sm:col-span-4 font-drafting text-[11px] tracking-[0.14em] text-[#262824] uppercase">
                  01. DRY-FIT PRECISION
                </span>
                <p className="sm:col-span-8 font-ui text-[14.5px] leading-[1.6] text-[#262824]/80">
                  Milled bridle and lap joints lock along three axes using a single hex key,
                  allowing pieces to move through narrow doorways and re-anchor in new rooms.
                </p>
              </div>

              <div className="py-5 border-b border-[#262824]/15 grid grid-cols-1 sm:grid-cols-12 gap-3 items-baseline">
                <span className="sm:col-span-4 font-drafting text-[11px] tracking-[0.14em] text-[#262824] uppercase">
                  02. SHARED DATUM LINES
                </span>
                <p className="sm:col-span-8 font-ui text-[14.5px] leading-[1.6] text-[#262824]/80">
                  Seat heights, table plinths, and lower shelf tiers share consistent horizontal
                  elevations so any arrangement reads with visual calm.
                </p>
              </div>

              <div className="py-5 border-b border-[#262824]/15 grid grid-cols-1 sm:grid-cols-12 gap-3 items-baseline">
                <span className="sm:col-span-4 font-drafting text-[11px] tracking-[0.14em] text-[#262824] uppercase">
                  03. RENEWABLE COMPONENTS
                </span>
                <p className="sm:col-span-8 font-ui text-[14.5px] leading-[1.6] text-[#262824]/80">
                  Upholstery covers, cushion cores, and solid timber rails can be individually
                  refreshed or re-oiled over decades rather-than replacing the whole object.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
