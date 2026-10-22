"use client";

import React, { useState, useSyncExternalStore } from "react";
import { LogoMark } from "../brand/Logo";
import { getDefaultDescentStore } from "../descent/store";
import { calculatePressure } from "../descent/physics";

export function HeaderHUD() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const store = getDefaultDescentStore();
  const depth = useSyncExternalStore(store.subscribe, store.getSnapshot, () => 0);
  const pressure = calculatePressure(depth);

  const links = [
    { label: "Descent", href: "#descent" },
    { label: "Architecture", href: "#architecture" },
    { label: "Sensors", href: "#sensors" },
    { label: "Dossiers", href: "#dossiers" },
    { label: "Charter", href: "#charter" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-[64px] bg-trench/90 border-b border-glass backdrop-blur-md z-50 transition-all duration-300">
      <div className="bat-wrap h-full flex items-center justify-between">
        {/* Brand Lockup */}
        <a href="#hero" className="flex items-center gap-3 text-decoration-none group">
          <LogoMark className="w-8 h-8 transition-transform group-hover:scale-105 duration-200" />
          <div className="flex flex-col">
            <span className="bat-display font-bold text-lg tracking-[0.15em] text-titanium leading-none">
              BATHYS
            </span>
            <span className="bat-mono text-[9px] text-cyan tracking-[0.2em] uppercase leading-tight mt-0.5">
              11,000 M CERTIFIED
            </span>
          </div>
        </a>

        {/* Live Depth & Pressure Telemetry Pills (Desktop) */}
        <div className="hidden md:flex items-center gap-4 bg-navy/80 border border-glass px-4 py-1.5 rounded-full">
          <div className="flex items-center gap-1.5 bat-mono text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            <span className="text-slate">DEPTH:</span>
            <span className="text-titanium font-bold tabular-nums">{depth.toLocaleString()} M</span>
          </div>
          <span className="text-glass">|</span>
          <div className="flex items-center gap-1.5 bat-mono text-xs">
            <span className="text-slate">PRESSURE:</span>
            <span className="text-cyan font-bold tabular-nums">{pressure.bar.toFixed(1)} BAR</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Primary Navigation">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="bat-mono text-xs text-mist hover:text-cyan transition-colors uppercase tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center">
          <a href="#charter" className="bat-btn bat-btn-primary text-xs py-2 px-4">
            Commission Payload
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex flex-col items-center justify-center w-9 h-9 border border-glass rounded bg-navy text-titanium hover:border-cyan"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`w-4 h-0.5 bg-titanium transition-transform duration-200 ${
              mobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
            }`}
          />
          <span
            className={`w-4 h-0.5 bg-titanium transition-opacity duration-200 ${
              mobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`w-4 h-0.5 bg-titanium transition-transform duration-200 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[64px] left-0 right-0 bg-trench/95 border-b border-glass p-6 backdrop-blur-xl flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-glass bat-mono text-xs">
            <span className="text-slate">TELEMETRY LINK:</span>
            <span className="text-cyan font-bold">{depth} M · {pressure.bar.toFixed(0)} BAR</span>
          </div>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="bat-display text-lg text-titanium hover:text-cyan uppercase font-bold tracking-wider py-1"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#charter"
            onClick={() => setMobileMenuOpen(false)}
            className="bat-btn bat-btn-primary w-full text-center mt-2"
          >
            Commission Payload
          </a>
        </div>
      )}
    </header>
  );
}
