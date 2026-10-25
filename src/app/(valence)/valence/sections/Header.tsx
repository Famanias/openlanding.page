"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { ValenceLogo } from "../brand/Logo";
import { computeUnlockedDepthPercent } from "../capsule/logic";
import { valenceStore } from "../capsule/store";
import type { CaptureTierId } from "../content/funnelData";

const NAV_ITEMS: Array<{ id: CaptureTierId; href: string; code: string; label: string; bg: string }> = [
  { id: "splash", href: "#splash", code: "01", label: "Splash Gate", bg: "#E8E0F8" },
  { id: "squeeze", href: "#squeeze", code: "02", label: "Squeeze Page", bg: "#D9F2E6" },
  { id: "lead-gen", href: "#dossier", code: "03", label: "Lead Capture", bg: "#FCE2D5" },
];

export function Header() {
  const snapshot = useSyncExternalStore(
    valenceStore.subscribe,
    valenceStore.getSnapshot,
    valenceStore.getSnapshot,
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const depthPercent = computeUnlockedDepthPercent(snapshot.unlocked);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header className="vl-header vl-load-header">
      <a
        href="#splash"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-[#5B46E8] focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-[#FBF9F5]"
      >
        Skip to capture stages
      </a>

      <div className="vl-container">
        <div className="vl-header-inner flex items-center justify-between gap-3">
          <a
            href="#splash"
            aria-label="Valence — Return to top"
            className="rounded-full px-2 py-1"
          >
            <ValenceLogo />
          </a>

          {/* Desktop 3-Format Pill Switcher */}
          <nav
            aria-label="Funnel capture stages"
            className="hidden lg:flex items-center gap-1.5 rounded-full bg-[#FBF9F5] p-1 border border-[#1E1B2E]/12"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = snapshot.activeTier === item.id;
              const isUnlocked = snapshot.unlocked[item.id];
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => valenceStore.setActiveTier(item.id)}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-all"
                  style={{
                    backgroundColor: isActive ? "#1E1B2E" : item.bg,
                    color: isActive ? "#FBF9F5" : "#1E1B2E",
                  }}
                >
                  <span className="vl-mono text-[11px] opacity-80">{item.code}</span>
                  <span>{item.label}</span>
                  {isUnlocked && (
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: isActive ? "#D9F2E6" : "#5B46E8" }}
                      title="Gate unsealed"
                    />
                  )}
                </a>
              );
            })}
            <a
              href="#compare"
              className="rounded-full px-3.5 py-2 text-xs font-medium text-[#645D7A] hover:text-[#1E1B2E]"
            >
              Compare Formats
            </a>
            <a
              href="#preview"
              className="rounded-full px-3.5 py-2 text-xs font-medium text-[#645D7A] hover:text-[#1E1B2E]"
            >
              Gated Preview
            </a>
          </nav>

          {/* Right status + Primary CTA + Mobile Toggle */}
          <div className="flex items-center gap-2">
            <div
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-[#D9F2E6] px-3.5 py-2 border border-[#1E1B2E]/15"
              aria-label={`Dossier unlocked depth ${depthPercent} percent`}
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: "#5B46E8" }}
              />
              <span className="vl-mono text-[11px] font-semibold text-[#1E1B2E]">
                {depthPercent}% UNSEALED
              </span>
            </div>

            <a
              href="#dossier"
              onClick={() => valenceStore.setActiveTier("lead-gen")}
              className="hidden sm:inline-flex vl-btn vl-btn--primary py-2.5 px-5 text-xs"
            >
              <span>Unseal Dossier</span>
              <span className="vl-btn__arrow" aria-hidden="true">
                →
              </span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-expanded={mobileMenuOpen}
              aria-controls="vl-mobile-nav-dialog"
              aria-label={mobileMenuOpen ? "Close capture stages menu" : "Open capture stages menu"}
              className="lg:hidden inline-flex items-center justify-center rounded-full border border-[#1E1B2E]/20 bg-[#FBF9F5] px-4 py-2 vl-mono text-xs font-semibold text-[#1E1B2E]"
            >
              {mobileMenuOpen ? "CLOSE" : "STAGES"}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="vl-mobile-nav-dialog"
            role="dialog"
            aria-modal="true"
            aria-label="Funnel capture stages navigation"
            className="lg:hidden mt-2 rounded-[28px] border-2 border-[#1E1B2E] bg-[#FBF9F5] p-5 space-y-3"
          >
            <div className="flex items-center justify-between border-b border-[#1E1B2E]/10 pb-3">
              <span className="vl-mono text-xs text-[#645D7A]">
                CAPTURE STAGES · {depthPercent}% UNSEALED
              </span>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-full bg-[#E8E0F8] px-3 py-1 vl-mono text-xs text-[#1E1B2E]"
              >
                ESC
              </button>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => {
                    valenceStore.setActiveTier(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between rounded-full px-4 py-3 text-sm font-semibold text-[#1E1B2E]"
                  style={{ backgroundColor: item.bg }}
                >
                  <span>
                    {item.code} · {item.label}
                  </span>
                  <span className="vl-mono text-xs">
                    {snapshot.unlocked[item.id] ? "UNSEALED" : "INSPECT →"}
                  </span>
                </a>
              ))}
              <a
                href="#compare"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-full border border-[#1E1B2E]/15 px-4 py-2.5 text-sm font-medium text-[#1E1B2E]"
              >
                Compare All 3 Formats
              </a>
              <a
                href="#preview"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-full border border-[#1E1B2E]/15 px-4 py-2.5 text-sm font-medium text-[#1E1B2E]"
              >
                Gated Asset Preview Reader
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
