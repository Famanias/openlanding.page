import React from "react";

export function SiteFooter() {
  return (
    <footer className="sr-site-footer">
      <div className="sr-container sr-footer-inner">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span className="sr-display-type" style={{ fontSize: "1.4rem", color: "var(--electric-mint)" }}>
            ✦ STAR RIOT
          </span>
          <span style={{ fontSize: "0.82rem", color: "var(--muted-lilac)" }}>
            © 2026 STAR RIOT FICTIONAL NIGHTLIFE CONCEPT. ZERO ORDINARY NIGHTS.
          </span>
        </div>

        <div className="sr-footer-links">
          <a href="#nights">Nights</a>
          <a href="#the-space">The Space</a>
          <a href="#the-sound">The Sound</a>
          <a href="#faq">FAQ</a>
          <a href="#top">Back To Top ↑</a>
        </div>
      </div>
    </footer>
  );
}
