'use client';

import React from 'react';
import { NAV_ITEMS } from '../data/collection';

interface FooterProps {
  onBackToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onBackToTop }) => {
  return (
    <footer
      aria-label="Site Footer"
      className="bg-[#0A0B0D] border-t border-[#374047]/65 pt-16 md:pt-24 pb-12"
    >
      <div className="aurel-container">
        {/* Top Row: Large AUREL Live Wordmark & Back to Top */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-12 border-b border-[#374047]/50">
          <div>
            <p className="font-mono-tech text-[10px] tracking-[0.24em] text-[#9DB8C9] uppercase mb-3">
              INDEPENDENT HOROLOGY CONCEPT / COLLECTION 01
            </p>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                onBackToTop();
              }}
              className="font-display font-normal text-[#F0ECE5] tracking-[0.28em] uppercase leading-none block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9]"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 6.8rem)' }}
            >
              AUREL
            </a>
          </div>

          <button
            type="button"
            onClick={onBackToTop}
            className="inline-flex items-center gap-3 px-6 py-3 border border-[#374047] hover:border-[#9DB8C9] text-xs font-mono-tech tracking-[0.22em] text-[#C7CDD2] hover:text-[#F0ECE5] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9]"
          >
            <span>BACK TO TOP</span>
            <span aria-hidden="true">↑</span>
          </button>
        </div>

        {/* Middle Row: Real Page Anchor Navigation & Collection Note */}
        <div className="py-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-[#374047]/40">
          <nav
            aria-label="Footer Section Navigation"
            className="md:col-span-7 flex flex-wrap items-center gap-x-8 gap-y-3"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-sans-ui text-xs tracking-[0.22em] text-[#C7CDD2] hover:text-[#F0ECE5] uppercase transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#anatomy"
              className="font-sans-ui text-xs tracking-[0.22em] text-[#C7CDD2] hover:text-[#F0ECE5] uppercase transition-colors whitespace-nowrap"
            >
              CALIBRE AU-01
            </a>
            <a
              href="#gallery"
              className="font-sans-ui text-xs tracking-[0.22em] text-[#C7CDD2] hover:text-[#F0ECE5] uppercase transition-colors whitespace-nowrap"
            >
              GALLERY
            </a>
            <a
              href="#private-viewing"
              className="font-sans-ui text-xs tracking-[0.22em] text-[#C7CDD2] hover:text-[#F0ECE5] uppercase transition-colors whitespace-nowrap"
            >
              PRIVATE ENQUIRIES
            </a>
          </nav>

          <div className="md:col-span-5 md:text-right">
            <p className="font-mono-tech text-[11px] tracking-[0.2em] text-[#89919A] uppercase">
              THE ORIGIN COLLECTION — CALIBRE AU-01 · 42MM TITANIUM
            </p>
          </div>
        </div>

        {/* Bottom Row: Concept Disclosure */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-sans-ui text-[#89919A]">
          <p>
            AUREL is a fictional independent horology brand and design-concept
            website template. Specifications (Calibre AU-01, 42mm Brushed Titanium,
            Edition No. 01–50) are conceptual editorial details, not commercial
            manufacturing claims.
          </p>
          <span className="font-mono-tech text-[10px] tracking-[0.2em] uppercase whitespace-nowrap shrink-0">
            COLLECTION 01 · CONCEPT ARCHIVE
          </span>
        </div>
      </div>
    </footer>
  );
};
