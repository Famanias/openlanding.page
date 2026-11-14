'use client';

import { NAV_LINKS } from '../data/garden';
import BrandMark from './BrandMark';
import Reveal from './Reveal';

/** The wordmark, drawn as SVG text so one string can be stacked as outline and waterline fill. */
function Wordmark({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 1600 300" focusable="false">
      <text x="800" y="248" textAnchor="middle" textLength="1540" lengthAdjust="spacingAndGlyphs">
        MIZUNOWA
      </text>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mnw-footer mnw-surface-dark">
      <div className="mnw-container">
        <div className="mnw-footer-grid">
          <div>
            <a href="#top" className="mnw-brand" style={{ marginBottom: 12 }}>
              <BrandMark size={30} />
              <span className="mnw-brand-text">
                <span className="mnw-brand-en">MIZUNOWA</span>
                <span className="mnw-brand-ja mnw-ja" lang="ja">
                  水の輪
                </span>
              </span>
            </a>
            <p className="mnw-footer-tagline">An imagined garden in motion.</p>
          </div>

          <nav className="mnw-footer-links" aria-label="Footer navigation">
            {NAV_LINKS.map((item) => (
              <a key={item.href} href={item.href} className="mnw-nav-link">
                {item.label}
              </a>
            ))}
            <a href="#top" className="mnw-nav-link">
              Back to top
            </a>
          </nav>
        </div>

        {/* Half-submerged wordmark: the fill rises to the waterline when the footer arrives */}
        <Reveal variant="water">
          <div className="mnw-footer-mark" aria-hidden="true">
            <Wordmark className="mnw-footer-mark-outline" />
            <Wordmark className="mnw-footer-mark-fill" />
            <span className="mnw-footer-mark-waterline" />
          </div>
        </Reveal>

        <div className="mnw-footer-bottom">
          <span>MIZUNOWA is a fictional Japanese garden created for this template.</span>
          <span className="mnw-mono">01 — 03 / FIELD GUIDE</span>
        </div>
      </div>
    </footer>
  );
}
