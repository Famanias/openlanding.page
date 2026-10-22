"use client";

import React, { useEffect, useRef, useSyncExternalStore } from "react";
import { getDefaultDescentStore } from "./store";
import {
  MAX_DEPTH,
  OCEAN_ZONES,
  getOceanZone,
  calculatePressure,
  calculateLightAbsorption,
} from "./physics";
import { GaugeHUD } from "./GaugeHUD";
import { DepthRail } from "./DepthRail";
import { SonarRadar } from "../sonar/SonarRadar";
import { useReducedMotion } from "../motion/useReducedMotion";

export function DescentSection() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const store = getDefaultDescentStore();
  const depth = useSyncExternalStore(store.subscribe, store.getSnapshot, () => 0);
  const reduced = useReducedMotion();

  const currentZone = getOceanZone(depth);
  const absorption = calculateLightAbsorption(depth);
  const isHadal = depth >= 6000;

  // Scroll sync: calculate depth from scroll offset within outerRef
  useEffect(() => {
    if (reduced) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const el = outerRef.current;
          if (!el) {
            ticking = false;
            return;
          }

          const rect = el.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const totalScrollable = rect.height - viewportHeight;

          if (totalScrollable <= 0) {
            ticking = false;
            return;
          }

          // Progress 0 when top of section reaches top of viewport, 1 at bottom
          const scrollProgress = Math.max(0, Math.min(-rect.top / totalScrollable, 1));
          store.setDepth(Math.round(scrollProgress * MAX_DEPTH));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [store, reduced]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    store.setDepth(val);
  };

  const jumpToDepth = (targetDepth: number) => {
    store.setDepth(targetDepth);
  };

  return (
    <section
      id="descent"
      ref={outerRef}
      className="relative w-full"
      style={{ minHeight: reduced ? "auto" : "320vh" }}
      aria-label="The Hadal Descent Stage"
    >
      {/* Sticky Stage Container */}
      <div
        className="sticky top-[64px] w-full min-h-[calc(100vh-64px)] flex flex-col justify-between py-6 overflow-hidden transition-colors duration-500"
        style={{
          backgroundColor: isHadal
            ? "color-mix(in srgb, var(--color-trench) 66%, transparent)"
            : "color-mix(in srgb, var(--color-navy) 58%, transparent)",
          backgroundImage: `radial-gradient(circle at 50% 10%, color-mix(in srgb, var(--color-cyan) ${(15 * absorption).toFixed(1)}%, transparent) 0%, transparent 70%)`,
        }}
      >
        <div className="bat-wrap flex-1 flex flex-col justify-between z-10">
          {/* Header row inside stage */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-glass pb-4 mb-4">
            <div>
              <span className="bat-mono text-xs text-cyan uppercase tracking-widest font-bold">
                02 // The Hadal Dive
              </span>
              <h2 className="bat-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-titanium mt-1">
                Vertical Sounding: {currentZone.name} Zone
              </h2>
            </div>

            {/* Presets Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bat-mono text-[10px] text-slate uppercase mr-1">Presets:</span>
              {[
                { label: "0m", depth: 0 },
                { label: "1,000m", depth: 1000 },
                { label: "4,000m", depth: 4000 },
                { label: "6,000m", depth: 6000 },
                { label: "10,928m", depth: 10928 },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => jumpToDepth(p.depth)}
                  className={`bat-btn text-[11px] py-1 px-3.5 border rounded ${
                    Math.abs(depth - p.depth) < 200
                      ? "bg-cyan text-trench border-cyan font-bold"
                      : "bg-navy/60 text-mist border-glass hover:border-slate"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dual Column Layout: HUD & Sonar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start my-auto">
            {/* Left 7 cols: Telemetry Readouts & Zone Narrative */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <GaugeHUD />

              <div className="bg-navy/80 border border-glass rounded-lg p-5 backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-glass pb-2 mb-3">
                  <span className="bat-mono text-xs text-amber font-bold uppercase tracking-wider">
                    Zone Analysis: {currentZone.depthRange}
                  </span>
                  <span className="bat-mono text-[11px] text-mist">
                    {currentZone.pressureRange}
                  </span>
                </div>
                <h3 className="bat-display text-lg font-bold text-titanium uppercase mb-2">
                  {currentZone.tagline}
                </h3>
                <p className="text-sm text-mist leading-relaxed font-body">
                  {depth < 200 &&
                    "Surface layer with primary GPS telemetry acquisition, hull sensor calibration, and negative buoyancy trim confirmation."}
                  {depth >= 200 && depth < 1000 &&
                    "The thermocline boundary. Rapid thermal collapse from 26°C to 4°C accompanied by 99% solar irradiance extinction."}
                  {depth >= 1000 && depth < 4000 &&
                    "The midnight void. Sunlight is completely absent. Synthetic aperture multibeam acoustics engage for benthic topography resolution."}
                  {depth >= 4000 && depth < 6000 &&
                    "The abyssal plain. Pelagic clay substrate extends across thousands of kilometers under 500+ bar hydrostatic pressure."}
                  {depth >= 6000 &&
                    "The Hadal Breach. Entering the tectonic Challenger Deep trench. Ambient pressure exceeds 1,100 bar on the Grade-5 titanium pressure hull."}
                </p>
              </div>

              {/* Range Scrubber Control */}
              <div className="bg-navy/80 border border-glass rounded-lg p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs bat-mono text-slate">
                  <span>MANUAL DEPTH SCRUBBER</span>
                  <span className="text-cyan font-bold tabular-nums">{depth.toLocaleString()} M</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={MAX_DEPTH}
                  step="10"
                  value={depth}
                  onChange={handleSliderChange}
                  className="w-full accent-cyan cursor-pointer bg-glass h-2 rounded-lg"
                  aria-label="Dive Depth Scrubber"
                />
                <div className="flex justify-between bat-mono text-[10px] text-slate">
                  <span>0 M (SURFACE)</span>
                  <span>10,928 M (CHALLENGER DEEP)</span>
                </div>
              </div>
            </div>

            {/* Right 5 cols: Acoustic Radar */}
            <div className="lg:col-span-5 flex justify-center">
              <SonarRadar className="w-full max-w-[400px]" />
            </div>
          </div>

          {/* Subsea Coordinates footer strip */}
          <div className="flex items-center justify-between border-t border-glass pt-3 mt-4 text-xs bat-mono text-slate">
            <span>CHALLENGER DEEP SOUNDING // 11°22.4&apos; N · 142°35.5&apos; E</span>
            <span className={isHadal ? "text-amber font-bold animate-pulse" : "text-cyan"}>
              {isHadal ? "HADAL LOCK ACTIVE" : "OCEANIC DESCENT NOMINAL"}
            </span>
          </div>
        </div>

        {/* Right Depth Rail indicator */}
        <DepthRail className="absolute right-0 top-0 bottom-0 z-20" />
      </div>
    </section>
  );
}
