"use client";

import { useClock } from "../drydown/ClockProvider";
import { formatHour } from "../drydown/clock";
import { calculateTierLevels } from "../drydown/evaporation";
import { LogoMark } from "../brand/Logo";

export function Header() {
  const { hour, activeFragrance } = useClock();
  const levels = calculateTierLevels(activeFragrance.notes, hour);

  return (
    <header className="sticky top-0 z-40 w-full h-[var(--topbar-h)] bg-[color-mix(in_srgb,var(--color-calcaire)_94%,transparent)] backdrop-blur-md border-b border-[var(--rule-color)] transition-colors duration-200">
      <div className="vr-wrap h-full flex items-center justify-between">
        {/* Brand Lockup */}
        <a
          href="#top"
          className="flex items-center gap-3 text-[var(--color-oud)] text-decoration-none group"
          aria-label="Maison Vérane — Return to top"
        >
          <LogoMark
            size={28}
            topLevel={levels.top}
            heartLevel={levels.heart}
            baseLevel={levels.base}
            className="transition-transform duration-200 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="vr-mono text-[9px] tracking-[0.25em] leading-none opacity-85">
              MAISON
            </span>
            <span className="vr-serif text-lg tracking-[0.14em] font-normal leading-tight">
              VÉRANE
            </span>
          </div>
        </a>

        {/* Center Navigation Links */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-8 vr-mono text-xs text-[var(--color-oud)]"
        >
          <a
            href="#drydown"
            className="opacity-85 hover:opacity-100 transition-opacity"
          >
            The Dry-Down
          </a>
          <a
            href="#hours"
            className="opacity-85 hover:opacity-100 transition-opacity"
          >
            The Hours
          </a>
          <a
            href="#organ"
            className="opacity-85 hover:opacity-100 transition-opacity"
          >
            The Organ
          </a>
          <a
            href="#atelier"
            className="opacity-85 hover:opacity-100 transition-opacity"
          >
            Atelier
          </a>
        </nav>

        {/* Right: Live Hour Readout & CTA */}
        <div className="flex items-center gap-4">
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1 bg-[var(--color-veil)] border border-[color-mix(in_srgb,var(--color-ash)_30%,transparent)] rounded-full"
            title="Shared Dry-Down Clock"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-orris)] animate-pulse" />
            <span className="vr-mono text-xs font-semibold text-[var(--color-orris)]">
              {formatHour(hour)}
            </span>
          </div>

          <a href="#appointment" className="vr-btn vr-btn--orris text-[11px] h-10 px-4">
            Appointment
          </a>
        </div>
      </div>
    </header>
  );
}
