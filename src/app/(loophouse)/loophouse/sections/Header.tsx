"use client";

import { useState, useEffect } from "react";
import { Lockup } from "../brand/Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`lh-topbar ${scrolled ? "is-scrolled" : ""}`}>
      <div className="lh-topbar-inner">
        <a href="#top" className="lh-brand-link" aria-label="LOOPHOUSE Home">
          <Lockup height={28} />
        </a>

        {/* Live inventory telemetry chip */}
        <div className="lh-telemetry-chip" aria-label="Current library status">
          <span className="lh-live-dot" aria-hidden="true" />
          <span className="lh-telemetry-text">428 TOOLS IN CIRCULATION // 98.4% RETURN RATE</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="lh-nav" aria-label="Primary navigation">
          <a href="#pegboard" className="lh-nav-link">
            01 // Tool Wall
          </a>
          <a href="#route" className="lh-nav-link">
            02 // Route
          </a>
          <a href="#kits" className="lh-nav-link">
            03 // Field Packs
          </a>
          <a href="#ledger" className="lh-nav-link">
            04 // Depots
          </a>
          <a href="#requisition" className="lh-nav-cta">
            Requisition Kit →
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lh-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open navigation menu"}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile panel */}
      {menuOpen && (
        <div className="lh-mobile-menu">
          <a href="#pegboard" className="lh-mobile-link" onClick={() => setMenuOpen(false)}>
            01 // Tool Wall
          </a>
          <a href="#route" className="lh-mobile-link" onClick={() => setMenuOpen(false)}>
            02 // Route
          </a>
          <a href="#kits" className="lh-mobile-link" onClick={() => setMenuOpen(false)}>
            03 // Field Packs
          </a>
          <a href="#ledger" className="lh-mobile-link" onClick={() => setMenuOpen(false)}>
            04 // Depots
          </a>
          <a href="#requisition" className="lh-mobile-cta" onClick={() => setMenuOpen(false)}>
            Requisition Kit →
          </a>
        </div>
      )}
    </header>
  );
}
