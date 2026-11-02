"use client";

import { useState } from "react";

export function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const closeMobile = () => setIsMobileOpen(false);

  return (
    <header className="nx-header" id="top">
      <div className="nx-container">
        <div className="nx-nav-bar">
          {/* Zone 1: Lowercase Serif Brand Wordmark */}
          <a href="#top" className="nx-wordmark" aria-label="nexus home">
            nexus
          </a>

          {/* Zone 2: Minimal Serif Navigation */}
          <nav aria-label="Primary navigation">
            <ul className="nx-nav-links">
              <li>
                <a href="#top" className="nx-nav-link is-active">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="nx-nav-link">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="nx-nav-link">
                  Services
                </a>
              </li>
              <li>
                <a href="#work" className="nx-nav-link">
                  Work
                </a>
              </li>
              <li>
                <a href="#contact" className="nx-nav-link">
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Zone 3: Primary Action + Mobile Menu Trigger */}
          <div className="nx-nav-actions">
            <a href="#contact" className="nx-btn nx-nav-cta">
              <span>Let’s talk</span>
            </a>
            <button
              type="button"
              className="nx-mobile-toggle"
              id="mobile-menu-open"
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu-panel"
              aria-label="Open navigation menu"
              onClick={() => setIsMobileOpen((prev) => !prev)}
            >
              <span>Menu</span>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                <path
                  d="M1 2H15M3 6H15M1 10H13"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Sheet */}
      <div
        className={`nx-mobile-panel ${isMobileOpen ? "is-open" : ""}`}
        id="mobile-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMobile();
        }}
      >
        <div className="nx-mobile-sheet">
          <div className="nx-mobile-sheet-top">
            <span className="nx-wordmark">nexus</span>
            <button
              type="button"
              className="nx-mobile-close"
              id="mobile-menu-close"
              aria-label="Close navigation menu"
              onClick={closeMobile}
            >
              Close
            </button>
          </div>
          <ul className="nx-mobile-list">
            <li>
              <a href="#top" className="nx-mobile-link" onClick={closeMobile}>
                <span>Home</span>
                <span className="nx-mobile-idx">01</span>
              </a>
            </li>
            <li>
              <a href="#about" className="nx-mobile-link" onClick={closeMobile}>
                <span>About</span>
                <span className="nx-mobile-idx">02</span>
              </a>
            </li>
            <li>
              <a href="#services" className="nx-mobile-link" onClick={closeMobile}>
                <span>Services</span>
                <span className="nx-mobile-idx">03</span>
              </a>
            </li>
            <li>
              <a href="#work" className="nx-mobile-link" onClick={closeMobile}>
                <span>Work</span>
                <span className="nx-mobile-idx">04</span>
              </a>
            </li>
            <li>
              <a href="#contact" className="nx-mobile-link" onClick={closeMobile}>
                <span>Contact</span>
                <span className="nx-mobile-idx">05</span>
              </a>
            </li>
          </ul>
          <a
            href="#contact"
            className="nx-btn nx-mobile-link"
            style={{ width: "100%" }}
            onClick={closeMobile}
          >
            <span>LET’S PARTNER UP</span>
          </a>
        </div>
      </div>
    </header>
  );
}
