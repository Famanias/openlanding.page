'use client';

import React, { useState } from 'react';
import {
  ANATOMY_HOTSPOTS,
  getHotspotById,
  getAdjacentHotspotId,
} from '../data/collection';

export const AnatomySection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(ANATOMY_HOTSPOTS[0].id);
  const [imgError, setImgError] = useState(false);
  const activeHotspot = getHotspotById(activeId);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveId((prev) => getAdjacentHotspotId(prev, 'next'));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveId((prev) => getAdjacentHotspotId(prev, 'prev'));
    }
  };

  return (
    <section
      id="anatomy"
      aria-labelledby="anatomy-heading"
      className="relative py-24 md:py-36 bg-[#111317] border-t border-[#374047]/45 overflow-hidden"
    >
      <div className="aurel-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#374047]/55">
          <div>
            <p className="font-mono-tech text-xs tracking-[0.24em] text-[#9DB8C9] uppercase mb-3">
              02 / INSIDE THE CALIBRE
            </p>
            <h2
              id="anatomy-heading"
              className="font-display font-normal text-[#F0ECE5] uppercase tracking-[0.02em] leading-[0.95]"
              style={{
                fontSize: 'clamp(2.8rem, 5.8vw, 6.2rem)',
                textWrap: 'balance',
              }}
            >
              PRECISION, EXPOSED.
            </h2>
          </div>

          <p className="font-sans-ui text-sm md:text-base text-[#C7CDD2] font-light max-w-md md:text-right">
            An arrangement of components, each with a reason to exist. Select an
            architectural index to inspect the inner construction of Calibre AU-01.
          </p>
        </div>

        {/* Interactive Exploded Movement Stage */}
        <div
          onKeyDown={handleKeyDown}
          className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
        >
          {/* Central Exploded Calibre Exhibit (8 columns on desktop) */}
          <div className="lg:col-span-8 relative">
            <div className="relative aspect-[16/9] w-full bg-[#0A0B0D] border border-[#374047]/60 overflow-hidden">
              {!imgError ? (
                <img
                  src="/templates/aurel/aurel-movement-exploded.webp"
                  alt="Exploded technical view of the AUREL Calibre AU-01 watch crystal, skeleton dial, mechanical movement, and titanium case"
                  width={2752}
                  height={1536}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-8">
                  <span className="font-mono-tech text-xs tracking-[0.2em] text-[#9DB8C9]">
                    CALIBRE AU-01 EXPLODED TECHNICAL DIAGRAM
                  </span>
                </div>
              )}

              {/* Subtle Vignette for Hotspot Contrast */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0B0D]/70 via-transparent to-[#0A0B0D]/40"
                aria-hidden="true"
              />

              {/* SVG Metrology Connector Lines & Target Reticles */}
              <svg
                viewBox="0 0 1000 562.5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute inset-0 w-full h-full"
                aria-hidden="true"
              >
                {/* Subtle Reference Calibration Arc inside the exhibit */}
                <circle
                  cx="520"
                  cy="280"
                  r="225"
                  stroke="#374047"
                  strokeWidth="0.8"
                  strokeOpacity="0.45"
                  strokeDasharray="4 8"
                />

                {ANATOMY_HOTSPOTS.map((spot) => {
                  const isSelected = spot.id === activeId;
                  const mx = spot.markerX * 10;
                  const my = spot.markerY * 5.625;
                  const cx = spot.calloutX * 10;
                  const cy = spot.calloutY * 5.625;
                  const elbowX = spot.align === 'left' ? cx + 95 : cx - 95;

                  return (
                    <g key={spot.id}>
                      <polyline
                        points={`${mx},${my} ${elbowX},${cy} ${cx},${cy}`}
                        stroke={isSelected ? '#9DB8C9' : '#89919A'}
                        strokeWidth={isSelected ? '1.35' : '0.75'}
                        strokeOpacity={isSelected ? '0.95' : '0.35'}
                      />
                      {isSelected && (
                        <circle
                          cx={mx}
                          cy={my}
                          r="18"
                          stroke="#9DB8C9"
                          strokeWidth="0.9"
                          strokeOpacity="0.65"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Interactive Hotspot Pins on the Image */}
              {ANATOMY_HOTSPOTS.map((spot) => {
                const isSelected = spot.id === activeId;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setActiveId(spot.id)}
                    onMouseEnter={() => setActiveId(spot.id)}
                    onFocus={() => setActiveId(spot.id)}
                    aria-pressed={isSelected}
                    aria-label={`${spot.label}: ${spot.subtitle}`}
                    style={{
                      left: `${spot.markerX}%`,
                      top: `${spot.markerY}%`,
                    }}
                    className={`group absolute -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center transition-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0ECE5] ${
                      isSelected ? 'scale-110 z-20' : 'hover:scale-105 z-10'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-mono-tech text-[10px] tracking-wider border transition-colors ${
                        isSelected
                          ? 'bg-[#9DB8C9] text-[#0A0B0D] border-[#F0ECE5] font-medium shadow-[0_0_20px_rgba(157,184,201,0.55)]'
                          : 'bg-[#0A0B0D]/85 text-[#F0ECE5] border-[#89919A]/70 group-hover:border-[#9DB8C9]'
                      }`}
                    >
                      {spot.index}
                    </span>
                  </button>
                );
              })}

              {/* Bottom Left Diagram Coordinate Readout */}
              <div className="pointer-events-none absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-[10px] font-mono-tech tracking-[0.2em] text-[#C7CDD2]/80 uppercase">
                <span>CALIBRE AU-01 — AXIAL EXPLODED PROJECTION</span>
                <span className="hidden sm:inline text-[#9DB8C9]">
                  ACTIVE STATION: {activeHotspot.label}
                </span>
              </div>
            </div>
          </div>

          {/* Right Interactive Selector Rail & Detail Readout (4 columns on desktop) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            {/* Accessible Hotspot Selection List */}
            <div
              role="tablist"
              aria-label="Calibre AU-01 Anatomy Hotspots"
              className="border-t border-[#374047]/60 divide-y divide-[#374047]/50"
            >
              {ANATOMY_HOTSPOTS.map((spot) => {
                const isSelected = spot.id === activeId;
                return (
                  <button
                    key={spot.id}
                    role="tab"
                    id={`anatomy-tab-${spot.id}`}
                    aria-selected={isSelected}
                    aria-controls={`anatomy-panel-${spot.id}`}
                    type="button"
                    onClick={() => setActiveId(spot.id)}
                    className={`w-full py-4 px-3 text-left flex items-center justify-between gap-4 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9] ${
                      isSelected
                        ? 'bg-[#23272B]/70 text-[#F0ECE5]'
                        : 'text-[#89919A] hover:text-[#C7CDD2] hover:bg-[#23272B]/25'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span
                        className={`font-mono-tech text-xs tracking-[0.2em] uppercase ${
                          isSelected ? 'text-[#9DB8C9]' : 'text-[#C7CDD2]'
                        }`}
                      >
                        {spot.label}
                      </span>
                      <span className="font-display text-lg text-[#F0ECE5] mt-0.5">
                        {spot.subtitle}
                      </span>
                    </div>
                    <span
                      aria-hidden="true"
                      className={`font-mono-tech text-xs ${
                        isSelected ? 'text-[#9DB8C9]' : 'text-[#374047]'
                      }`}
                    >
                      {isSelected ? '●' : '○'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Station Detail Panel */}
            <div
              id={`anatomy-panel-${activeHotspot.id}`}
              role="tabpanel"
              aria-labelledby={`anatomy-tab-${activeHotspot.id}`}
              className="p-6 bg-[#0A0B0D] border border-[#374047]/70 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#374047]/50 pb-3">
                <span className="font-mono-tech text-[11px] tracking-[0.2em] text-[#9DB8C9] uppercase whitespace-nowrap">
                  {activeHotspot.label}
                </span>
                <span className="font-mono-tech text-[10px] tracking-[0.16em] text-[#89919A] uppercase whitespace-nowrap">
                  {activeHotspot.frequencyOrMetric}
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl md:text-3xl text-[#F0ECE5] font-normal tracking-[0.02em]">
                  {activeHotspot.shortTitle} —{' '}
                  <span className="italic text-[#C7CDD2]">
                    {activeHotspot.subtitle}
                  </span>
                </h3>
                <p className="font-sans-ui text-sm text-[#C7CDD2] font-light leading-relaxed mt-3">
                  {activeHotspot.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#374047]/45 flex items-center justify-between text-[10px] font-mono-tech tracking-[0.18em] text-[#89919A] uppercase">
                <span>{activeHotspot.specNote}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
