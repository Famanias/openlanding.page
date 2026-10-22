"use client";

import React, { useEffect, useState } from "react";
import { HeroScene } from "./HeroScene";

export function Hero() {
  // The headline's mask-rise keys off an ancestor's data-in; flip it once after mount.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center pt-[90px] pb-16 overflow-hidden border-b border-glass"
    >
      {/* Water surface, light shafts and the descending submersible */}
      <HeroScene />

      <div className="bat-wrap relative z-10">
        <div className="max-w-4xl">
          {/* Top Eyebrow Metadata */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
            <span className="bat-mono text-xs text-cyan uppercase tracking-widest font-bold">
              AUTONOMOUS HADAL VEHICLES // BREST &amp; MONTEREY
            </span>
            <span className="text-slate text-xs">·</span>
            <span className="bat-mono text-xs text-mist uppercase">
              11°22.4&apos; N · 142°35.5&apos; E
            </span>
          </div>

          {/* Mask-Rise Headline */}
          <h1
            data-in={ready ? "true" : undefined}
            className="bat-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-titanium uppercase leading-[0.98] mb-6"
          >
            <span className="bat-mask-line">
              <span style={{ "--delay": "280ms" } as React.CSSProperties}>Engineered for the</span>
            </span>
            <span className="bat-mask-line">
              <span className="text-cyan" style={{ "--delay": "280ms", "--i": 1 } as React.CSSProperties}>
                11,000-metre breach.
              </span>
            </span>
          </h1>

          {/* Lead Paragraph */}
          <p className="text-lg sm:text-xl text-mist font-body max-w-2xl leading-relaxed mb-8">
            Autonomous titanium-ceramic submersibles engineered to endure 1,100 bar hydrostatic pressure in the Mariana, Puerto Rico, and Kermadec trenches without umbilical tether.
          </p>

          {/* Action CTAs & Telemetry */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <a href="#descent" className="bat-btn bat-btn-primary">
              Begin Dive Telemetry
            </a>
            <a href="#charter" className="bat-btn bat-btn-outline">
              Commission Payload
            </a>
          </div>

          {/* Key Verification Specs strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-glass">
            <div>
              <span className="bat-mono text-[10px] text-mist uppercase tracking-wider block">
                MAX CERTIFIED DEPTH
              </span>
              <span className="bat-mono text-xl sm:text-2xl font-bold text-titanium">
                11,000 <span className="text-xs text-cyan">M</span>
              </span>
            </div>
            <div>
              <span className="bat-mono text-[10px] text-mist uppercase tracking-wider block">
                HYDROSTATIC LOAD
              </span>
              <span className="bat-mono text-xl sm:text-2xl font-bold text-titanium">
                1,114 <span className="text-xs text-cyan">BAR</span>
              </span>
            </div>
            <div>
              <span className="bat-mono text-[10px] text-mist uppercase tracking-wider block">
                PRESSURE SPHERE
              </span>
              <span className="bat-mono text-xl sm:text-2xl font-bold text-titanium">
                Ti-6Al-4V <span className="text-xs text-cyan">GR.5</span>
              </span>
            </div>
            <div>
              <span className="bat-mono text-[10px] text-mist uppercase tracking-wider block">
                MISSION ENDURANCE
              </span>
              <span className="bat-mono text-xl sm:text-2xl font-bold text-titanium">
                72 <span className="text-xs text-cyan">HRS</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
