"use client";

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'hear-everything', label: '01. Found Sounds' },
  { id: 'capture-it', label: '02. Capture' },
  { id: 'chop-it-up', label: '03. Chop' },
  { id: 'build-a-beat', label: '04. Rhythm Lab' },
  { id: 'break-the-rules', label: '05. FX Rules' },
];

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#111313]/95 border-b border-[#F1EEE5]/15">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-8 px-4 sm:px-8 h-14">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#the-signal"
          onClick={(e) => handleLinkClick(e, 'the-signal')}
          className="font-display text-2xl tracking-tight text-[#F1EEE5] hover:text-[#CBFF49] transition-colors whitespace-nowrap shrink-0"
        >
          NOISE CLUB®
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav aria-label="Chapter navigation" className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleLinkClick(e, item.id)}
              className="group relative py-1 font-sans-body text-sm font-medium text-[#F1EEE5]/80 hover:text-[#F1EEE5] transition-colors whitespace-nowrap shrink-0"
            >
              {item.label}
              <span className="absolute inset-x-0 bottom-0 h-[2px] bg-[#CBFF49] scale-x-0 origin-left transition-transform duration-200 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action (+ mobile menu trigger on small screens) */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#take-the-noise"
            onClick={(e) => handleLinkClick(e, 'take-the-noise')}
            className="nc-btn-interactive px-4 py-2 bg-[#F1EEE5] text-[#111313] hover:bg-[#CBFF49] font-sans-body text-xs font-semibold tracking-wide whitespace-nowrap shrink-0"
          >
            View the PO-33
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden p-2 text-[#F1EEE5] hover:text-[#CBFF49] border border-[#F1EEE5]/20"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Editorial Shutter Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#111313] border-b border-[#F1EEE5]/25 px-4 py-5">
          <nav aria-label="Mobile chapter navigation" className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className="py-2 border-b border-[#F1EEE5]/10 font-display text-2xl text-[#F1EEE5] hover:text-[#CBFF49] tracking-wide"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
