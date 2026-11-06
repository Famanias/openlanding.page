'use client';

import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { NAV_ITEMS } from '../data/collection';

interface HeaderProps {
  onOpenPrivateViewing: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPrivateViewing }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuTriggerRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  const handleNavClick = () => {
    if (menuOpen) {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
          scrolled
            ? 'bg-[#0A0B0D]/85 backdrop-blur-md border-b border-[#374047]/65'
            : 'bg-transparent border-b border-[#374047]/45'
        }`}
      >
        <div className="aurel-container h-[72px] md:h-[82px] flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#top"
            className="font-display text-[1.35rem] md:text-[1.6rem] font-normal tracking-[0.26em] text-[#F0ECE5] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9]"
          >
            AUREL
          </a>

          {/* Zone 2: Centered Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-10 xl:gap-12"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-sans-ui text-[11px] font-normal tracking-[0.22em] text-[#C7CDD2] hover:text-[#F0ECE5] transition-colors py-2 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Menu Trigger matching approved screenshot */}
          <div className="flex items-center shrink-0">
            <button
              ref={menuTriggerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="aurel-index-drawer"
              aria-label="Open navigation menu"
              className="group inline-flex items-center gap-2.5 py-2.5 pl-3 pr-1 text-[#C7CDD2] hover:text-[#F0ECE5] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9]"
            >
              <span className="w-6 h-6 rounded-full border border-[#89919A]/60 group-hover:border-[#F0ECE5] flex flex-col items-center justify-center gap-[3px] transition-colors">
                <span className="w-2.5 h-[1px] bg-current" />
                <span className="w-2.5 h-[1px] bg-current" />
              </span>
              <span className="font-sans-ui text-[11px] tracking-[0.22em] uppercase">
                MENU
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Height Accessible Navigation Drawer */}
      {menuOpen && (
        <div
          id="aurel-index-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="AUREL Chapter Navigation"
          className="fixed inset-0 z-50 bg-[#0A0B0D]/95 backdrop-blur-lg flex flex-col justify-between"
        >
          <div className="aurel-container h-[72px] md:h-[82px] flex items-center justify-between border-b border-[#374047]/55">
            <a
              href="#top"
              onClick={handleNavClick}
              className="font-display text-[1.35rem] md:text-[1.6rem] tracking-[0.26em] text-[#F0ECE5] whitespace-nowrap shrink-0"
            >
              AUREL
            </a>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => {
                setMenuOpen(false);
                menuTriggerRef.current?.focus();
              }}
              aria-label="Close navigation menu"
              className="inline-flex items-center gap-2.5 py-2.5 px-3 text-[#C7CDD2] hover:text-[#F0ECE5] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#9DB8C9]"
            >
              <span className="w-6 h-6 rounded-full border border-[#89919A]/60 flex items-center justify-center">
                <X className="w-3.5 h-3.5" />
              </span>
              <span className="font-sans-ui text-[11px] tracking-[0.22em] uppercase">
                CLOSE
              </span>
            </button>
          </div>

          <div className="aurel-container flex-1 flex flex-col justify-center py-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
              <div className="lg:col-span-7 space-y-5">
                <p className="font-mono-tech text-[11px] tracking-[0.26em] text-[#9DB8C9] uppercase">
                  INDEX / COLLECTION 01 — THE ORIGIN
                </p>
                <ul className="space-y-3 md:space-y-4">
                  {[
                    { num: '01', title: 'THE ORIGIN COLLECTION', href: '#collections' },
                    { num: '02', title: 'INSIDE THE CALIBRE (ANATOMY)', href: '#anatomy' },
                    { num: '03', title: 'OBJECT, MATERIAL & MOVEMENT', href: '#gallery' },
                    { num: '04', title: 'SAVOIR-FAIRE & ATELIER', href: '#savoir-faire' },
                    { num: '05', title: 'THE MANIFESTO', href: '#manifesto' },
                    { num: '06', title: 'PRIVATE VIEWING ENQUIRIES', href: '#private-viewing' },
                  ].map((item) => (
                    <li key={item.num} className="border-b border-[#374047]/40 pb-3">
                      <a
                        href={item.href}
                        onClick={handleNavClick}
                        className="group flex items-baseline justify-between gap-4 text-[#F0ECE5] hover:text-[#9DB8C9] transition-colors"
                      >
                        <span className="font-display text-2xl sm:text-4xl md:text-5xl font-light tracking-[0.04em]">
                          {item.title}
                        </span>
                        <span className="font-mono-tech text-xs tracking-[0.22em] text-[#89919A] group-hover:text-[#9DB8C9]">
                          {item.num} ↗
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#374047]/55 pt-8 lg:pt-0 lg:pl-12 space-y-6">
                <div className="space-y-2">
                  <p className="font-mono-tech text-[11px] tracking-[0.22em] text-[#89919A] uppercase">
                    SPECIFICATION SUMMARY
                  </p>
                  <p className="font-sans-ui text-sm text-[#C7CDD2] leading-relaxed">
                    Calibre AU-01 Concept · 42mm Grade 5 Brushed Titanium · 50-Hour Autonomous Power Reserve · Edition Concept No. 01–50.
                  </p>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onOpenPrivateViewing();
                    }}
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#F1EEE9] text-[#0A0B0D] font-sans-ui text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-white transition-colors cursor-pointer"
                  >
                    <span>REQUEST A PRIVATE VIEWING</span>
                    <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="aurel-container py-5 border-t border-[#374047]/45 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] font-mono-tech tracking-[0.2em] text-[#89919A]">
            <span>AUREL INDEPENDENT HOROLOGY CONCEPT</span>
            <span>COLLECTION 01 — THE ORIGIN</span>
          </div>
        </div>
      )}
    </>
  );
};
