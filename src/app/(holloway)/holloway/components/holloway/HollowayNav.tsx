'use client';

import React, { useState } from 'react';

interface HollowayNavProps {
  onNavigate?: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { label: 'COLLECTION', href: '#collection', id: 'collection' },
  { label: 'ROOM STUDIO', href: '#room-studio', id: 'room-studio' },
  { label: 'MATERIALS', href: '#materials', id: 'materials' },
  { label: 'ABOUT', href: '#about', id: 'about' },
] as const;

export default function HollowayNav({ onNavigate }: HollowayNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const target = document.getElementById(id);
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative z-30 w-full px-6 pt-6 pb-4 md:px-12 md:pt-8">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-editorial text-[28px] md:text-[36px] font-medium tracking-[0.04em] text-[#262824] uppercase whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#262824]"
        >
          HOLLOWAY
        </a>

        {/* Zone 2: Minimal Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-9 lg:gap-12"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.id)}
              className="font-ui text-[11.5px] font-medium tracking-[0.14em] text-[#262824] uppercase whitespace-nowrap shrink-0 pb-1 border-b border-transparent hover:border-[#262824]/60 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#262824]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex md:hidden items-center shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="holloway-mobile-nav"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="font-ui text-[11px] font-medium tracking-[0.16em] uppercase text-[#262824] px-3 py-2 border border-[#262824]/30 bg-[#F5F2EA]/85 backdrop-blur-sm whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#262824]"
          >
            {mobileMenuOpen ? 'CLOSE' : 'INDEX'}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {mobileMenuOpen && (
        <nav
          id="holloway-mobile-nav"
          aria-label="Mobile Navigation"
          className="md:hidden mt-3 border border-[#262824]/20 bg-[#F5F2EA]/95 backdrop-blur-md px-6 py-5 shadow-sm"
        >
          <ul className="flex flex-col gap-4">
            {NAV_ITEMS.map((item, idx) => (
              <li key={item.id} className="border-b border-[#262824]/10 pb-3 last:border-none last:pb-0">
                <a
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className="flex items-center justify-between font-ui text-[12px] font-medium tracking-[0.15em] text-[#262824] uppercase"
                >
                  <span>{item.label}</span>
                  <span className="font-drafting text-[10px] text-[#777974]">0{idx + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
