'use client';

import { NAV_LINKS } from '../data/garden';
import BrandMark from './BrandMark';

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
            <p
              style={{
                margin: '10px 0 0',
                color: 'color-mix(in srgb, var(--mnw-paper) 84%, transparent)',
                fontSize: 16,
              }}
            >
              An imagined garden in motion.
            </p>
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

        <div className="mnw-footer-bottom">
          <span>MIZUNOWA is a fictional Japanese garden created for this template.</span>
          <span className="mnw-mono">01 — 03 / FIELD GUIDE</span>
        </div>
      </div>
    </footer>
  );
}
