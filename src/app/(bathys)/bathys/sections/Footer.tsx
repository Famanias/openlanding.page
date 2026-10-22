"use client";

import React from "react";
import { LogoLockup } from "../brand/Logo";

export function Footer() {
  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-16 border-t border-glass relative">
      <div className="bat-wrap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-glass">
          {/* Brand info (left 5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <LogoLockup className="w-auto h-9" />
            <p className="text-sm text-mist max-w-sm font-body leading-relaxed mt-2">
              Autonomous hadopelagic exploration vehicles engineered to endure 1,100 bar hydrostatic pressure without umbilical tether.
            </p>
            <div className="bat-mono text-xs text-slate mt-2">
              FOUNDRY FACILITIES: BREST &amp; MONTEREY
            </div>
          </div>

          {/* Quick links (mid 3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="bat-mono text-xs text-slate uppercase tracking-wider">
              Navigation
            </span>
            <a href="#hero" className="text-sm text-mist hover:text-cyan transition-colors">
              Surface &amp; Mission Overview
            </a>
            <a href="#descent" className="text-sm text-mist hover:text-cyan transition-colors">
              The Hadal Dive (10,928m)
            </a>
            <a href="#architecture" className="text-sm text-mist hover:text-cyan transition-colors">
              Vehicle Architecture
            </a>
            <a href="#sensors" className="text-sm text-mist hover:text-cyan transition-colors">
              Sensor Instrumentation
            </a>
            <a href="#dossiers" className="text-sm text-mist hover:text-cyan transition-colors">
              Field Operations Dossiers
            </a>
            <a href="#charter" className="text-sm text-mist hover:text-cyan transition-colors">
              Payload Integration Charter
            </a>
          </div>

          {/* Facilities & Registry (right 4 cols) */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <span className="bat-mono text-xs text-slate uppercase tracking-wider">
              Hydrographic Registry
            </span>
            <div className="bat-mono text-xs text-mist leading-relaxed">
              <p className="mb-2">
                <strong className="text-titanium">Brest Marine Robotics Yard:</strong><br />
                Quai de la Douane, 29200 Brest, France
              </p>
              <p>
                <strong className="text-titanium">Monterey Subsea Basin:</strong><br />
                Cannery Row Pier 7, Monterey, CA 93940, USA
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleScrollToTop}
                className="bat-btn bat-btn-outline text-xs py-2 px-4"
              >
                ▲ Return to Surface
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 bat-mono text-xs text-slate">
          <div>
            &copy; 2026 BATHYS Robotics S.A. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>IMO SUBSEA CAT. H-11</span>
            <span>·</span>
            <span>PRESSURE CERTIFIED 11,000 M</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
