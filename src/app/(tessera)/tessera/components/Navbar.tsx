'use client';

import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Philosophy', href: '#philosophy', id: 'philosophy' },
  { label: 'System', href: '#system', id: 'system' },
  { label: 'Materials', href: '#materials', id: 'materials' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Configurator', href: '#configurator', id: 'configurator' },
] as const;

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 36);

      const scrollPos = window.scrollY + 220;
      let current = '';
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= scrollPos) {
          current = item.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-200 ${
        scrolled || mobileOpen
          ? 'bg-[#121311]/95 border-b border-[#EFEAE0]/10'
          : 'bg-gradient-to-b from-[#121311]/90 via-[#121311]/45 to-transparent border-b border-[#EFEAE0]/8'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 h-14 md:h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#hero"
          className="font-sans text-lg sm:text-xl font-semibold tracking-[0.22em] text-[#EFEAE0] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78960] rounded-sm"
        >
          TESSERA
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 text-[11px] font-medium tracking-[0.18em] uppercase text-[#AFA9A0]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#EFEAE0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78960] rounded-sm ${
                  isActive ? 'text-[#EFEAE0]' : ''
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#A78960] origin-left transition-transform duration-200 ease-out ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: 1 quiet primary action (+ mobile menu toggle on small screens) */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#inquire"
            className="hidden sm:inline-flex items-center gap-1.5 py-1.5 px-3 text-[11px] font-medium tracking-[0.16em] uppercase text-[#EFEAE0]/90 hover:text-[#EFEAE0] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78960] rounded-sm"
          >
            <span>Plan your space</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#A78960]" />
          </a>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-[#EFEAE0]/15 text-[#EFEAE0] hover:border-[#A78960] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78960]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Mobile Navigation"
          className="md:hidden bg-[#161714] border-b border-[#EFEAE0]/12 px-5 py-5 flex flex-col gap-3"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="py-2 text-sm font-medium tracking-wider uppercase text-[#EFEAE0] border-b border-[#EFEAE0]/8 hover:text-[#C8B9A5] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="#inquire"
              onClick={() => setMobileOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-md bg-[#25231F] border border-[#A78960]/45 text-xs font-medium tracking-widest uppercase text-[#EFEAE0]"
            >
              <span>Plan your space</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#A78960]" />
            </a>
          </div>
        </nav>
      )}
    </header>
  );
};
