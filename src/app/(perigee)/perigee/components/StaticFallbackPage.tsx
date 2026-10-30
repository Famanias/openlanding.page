import React from 'react';
import {
  CHAPTERS,
  computeGravitationalRedshift,
  computeTimeDilation,
} from '../physics/geodesicMath';
import { ObservationForm } from '../forms/ObservationForm';

export const StaticFallbackPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-[#f6f1ea] px-6 py-12 md:px-16 selection:bg-[#ffb36b]/30">
      {/* Top Telemetry Header */}
      <header className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4 border-b border-[#f6f1ea]/15 pb-6">
        <div className="flex items-center gap-4">
          <span className="text-xl font-semibold tracking-[0.22em] uppercase text-[#f6f1ea]">
            PERIGEE
          </span>
          <span className="text-[#f6f1ea]/25">|</span>
          <span className="text-xs font-mono-tech text-[#ffb36b] tracking-wider uppercase">
            SCHWARZSCHILD OBSERVATORY
          </span>
        </div>
        <div className="text-xs font-mono-tech text-[#f6f1ea]/70">
          EPHEMERIS: RA 17h 45m 40s · DEC -29° 00′ 28″ · M = 4.15 × 10⁶ M☉
        </div>
      </header>

      {/* Main Narrative Hero */}
      <main className="max-w-5xl mx-auto my-16 space-y-8">
        <div className="max-w-2xl">
          <div className="text-xs font-mono-tech text-[#ffb36b] tracking-widest uppercase mb-3">
            RELATIVISTIC GEODESIC TELEMETRY ARRAY
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#f6f1ea] leading-[1.05]">
            At the edge of curved spacetime.
          </h1>
          <p className="font-editorial italic text-xl md:text-2xl text-[#f6f1ea]/80 mt-3">
            Light does not travel in straight lines.
          </p>
          <p className="text-sm md:text-base text-[#f6f1ea]/80 mt-6 leading-relaxed">
            Positioned in bound orbit around a supermassive Schwarzschild black hole, PERIGEE pilots
            observers along an inbound relativistic geodesic trajectory—descending from a distant orbital
            vantage (r = 38 Rs) down through the shearing Keplerian plasma plane, across the Photon Sphere (r = 1.5 Rs),
            and ascending the north polar magnetic axis as a collimated relativistic jet ignites.
          </p>
        </div>

        {/* Six Observation Chapters */}
        <section aria-label="Geodesic Trajectory Chapters" className="border-t border-[#f6f1ea]/15 pt-12 space-y-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono-tech text-[#ffb36b] tracking-widest uppercase">
              INBOUND GEODESIC LOGBOOK · SIX RELATIVISTIC CHAPTERS
            </h2>
            <span className="text-xs font-mono-tech text-[#f6f1ea]/40">r = 38.0 → 1.0 Rs</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CHAPTERS.map((ch) => {
              const z = computeGravitationalRedshift(ch.rEnd);
              const gamma = computeTimeDilation(ch.rEnd);

              return (
                <article
                  key={ch.id}
                  className="bg-black border border-[#f6f1ea]/15 p-6 space-y-3 hover:border-[#ffb36b]/40 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-mono-tech text-[#ffb36b]">
                    <span>CHAPTER {ch.numberLabel}</span>
                    <span>r = {ch.rEnd.toFixed(2)} Rs</span>
                  </div>

                  <h3 className="text-xl font-medium tracking-tight text-[#f6f1ea]">
                    {ch.title}
                  </h3>

                  <div className="text-[11px] font-mono-tech text-[#f6f1ea]/50 uppercase tracking-wider">
                    {ch.subtitle}
                  </div>

                  <p className="text-xs text-[#f6f1ea]/80 leading-relaxed">
                    {ch.copy}
                  </p>

                  <div className="pt-3 border-t border-[#f6f1ea]/10 flex items-center justify-between text-[11px] font-mono-tech text-[#f6f1ea]/60">
                    <span>Redshift: z = {z.toFixed(3)}</span>
                    <span className="text-[#ffb36b]">Dilation: γ = {gamma.toFixed(2)}×</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Anatomical Structure Summary */}
        <section aria-label="Relativistic Structures" className="border-t border-[#f6f1ea]/15 pt-12 space-y-6">
          <h2 className="text-xs font-mono-tech text-[#ffb36b] tracking-widest uppercase">
            PRIMARY RELATIVISTIC BOUNDARIES & SIGNATURES
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono-tech">
            <div className="border border-[#f6f1ea]/15 p-4 bg-black">
              <div className="text-[#ffb36b] mb-1">EVENT HORIZON</div>
              <div className="text-sm font-semibold text-[#f6f1ea]">r = 1.00 Rs</div>
              <div className="text-[11px] text-[#f6f1ea]/60 mt-1">Schwarzschild boundary · infinite redshift</div>
            </div>

            <div className="border border-[#f6f1ea]/15 p-4 bg-black">
              <div className="text-[#ffb36b] mb-1">PHOTON SPHERE</div>
              <div className="text-sm font-semibold text-[#f6f1ea]">r = 1.50 Rs</div>
              <div className="text-[11px] text-[#f6f1ea]/60 mt-1">Unstable circular photon orbits · light trap</div>
            </div>

            <div className="border border-[#f6f1ea]/15 p-4 bg-black">
              <div className="text-[#ffb36b] mb-1">ISCO BOUNDARY</div>
              <div className="text-sm font-semibold text-[#f6f1ea]">r = 3.00 Rs</div>
              <div className="text-[11px] text-[#f6f1ea]/60 mt-1">Innermost stable circular matter orbit</div>
            </div>

            <div className="border border-[#f6f1ea]/15 p-4 bg-black">
              <div className="text-[#ffb36b] mb-1">DOPPLER BEAMING</div>
              <div className="text-sm font-semibold text-[#f6f1ea]">δ³ Intensification</div>
              <div className="text-[11px] text-[#f6f1ea]/60 mt-1">Approaching plasma blueshifts to ~10⁷ K</div>
            </div>
          </div>
        </section>

        {/* Static Observation Request Form */}
        <section aria-label="Request Observation Window" className="border-t border-[#f6f1ea]/15 pt-12 max-w-xl">
          <h2 className="text-xs font-mono-tech text-[#ffb36b] tracking-widest uppercase mb-2">
            TELEMETRY FEED & EPHEMERIS ALLOCATION
          </h2>
          <h3 className="text-2xl font-medium tracking-tight text-[#f6f1ea] mb-4">
            Request Observation Window
          </h3>
          <p className="text-xs text-[#f6f1ea]/70 mb-6 leading-relaxed">
            Submit observer credentials to book an orbital telemetry beam during the next polar alignment window.
          </p>

          <ObservationForm />
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto border-t border-[#f6f1ea]/15 pt-8 mt-16 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech text-[#f6f1ea]/50">
        <div>PERIGEE DEEP SPACE OBSERVATORY · ORBITAL TELEMETRY ARRAY</div>
        <div>NO COPYRIGHT · PUBLIC DOMAIN ASTROPHYSICS SPEC</div>
      </footer>
    </div>
  );
};
