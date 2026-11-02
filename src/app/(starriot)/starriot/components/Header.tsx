"use client";

import React, { useState } from "react";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sr-site-header">
      <div className="sr-header-inner">
        {/* Zone 1: Brand Lockup (Split Neon Star + Wordmark) */}
        <a href="#top" className="sr-brand-lockup" aria-label="STAR RIOT Home">
          <svg className="sr-brand-star-svg" viewBox="0 0 64 64" aria-hidden="true">
            <defs>
              <linearGradient id="logoMint" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#30F0CC" />
                <stop offset="100%" stopColor="#FCF03C" />
              </linearGradient>
              <linearGradient id="logoPink" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FC3CCC" />
                <stop offset="100%" stopColor="#9451FF" />
              </linearGradient>
            </defs>
            {/* Left half Mint Star */}
            <path
              d="M32 4 L23 23 L4 26 L19 39 L14 59 L32 48 Z"
              fill="url(#logoMint)"
              stroke="#12041B"
              strokeWidth="2"
            />
            {/* Right half Hot Pink Star */}
            <path
              d="M32 4 L41 23 L60 26 L45 39 L50 59 L32 48 Z"
              fill="url(#logoPink)"
              stroke="#12041B"
              strokeWidth="2"
            />
            {/* Center White Sparkle */}
            <path
              d="M32 16 L34.5 28.5 L47 31 L34.5 33.5 L32 46 L29.5 33.5 L17 31 L29.5 28.5 Z"
              fill="#FFFDF8"
            />
          </svg>
          <span className="sr-brand-wordmark">
            <span>STAR</span>
            <span>RIOT</span>
          </span>
        </a>

        {/* Zone 2: Primary Navigation Links */}
        <nav className="sr-primary-nav" aria-label="Primary Navigation">
          <a href="#nights" className="sr-nav-link">Nights</a>
          <a href="#the-space" className="sr-nav-link">The Space</a>
          <a href="#the-sound" className="sr-nav-link">The Sound</a>
          <a href="#faq" className="sr-nav-link">FAQ</a>
        </nav>

        {/* Zone 3: Primary Action + Mobile Menu Button */}
        <div className="sr-header-actions">
          <a href="#guestlist" className="sr-btn-neon-pill sr-btn-header">
            <span>Join The List</span>
            <span className="sr-btn-arrow" aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            className="sr-mobile-menu-btn"
            id="mobile-menu-toggle"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <nav
        id="mobile-nav-drawer"
        className={`sr-mobile-nav-drawer ${mobileOpen ? "sr-open" : ""}`}
        aria-label="Mobile Navigation"
      >
        <ul className="sr-mobile-nav-list">
          <li>
            <a href="#nights" className="sr-mobile-nav-item" onClick={() => setMobileOpen(false)}>
              Nights
            </a>
          </li>
          <li>
            <a href="#the-space" className="sr-mobile-nav-item" onClick={() => setMobileOpen(false)}>
              The Space
            </a>
          </li>
          <li>
            <a href="#the-sound" className="sr-mobile-nav-item" onClick={() => setMobileOpen(false)}>
              The Sound
            </a>
          </li>
          <li>
            <a href="#faq" className="sr-mobile-nav-item" onClick={() => setMobileOpen(false)}>
              FAQ
            </a>
          </li>
        </ul>
        <a
          href="#guestlist"
          className="sr-btn-neon-pill sr-mobile-nav-item"
          style={{ width: "100%" }}
          onClick={() => setMobileOpen(false)}
        >
          <span>Get On The List</span>
          <span className="sr-btn-arrow" aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
