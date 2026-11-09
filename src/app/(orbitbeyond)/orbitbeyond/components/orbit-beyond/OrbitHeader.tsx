'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { usePrefersReducedMotion } from '../../lib/orbit-beyond/motion';

export interface OrbitHeaderProps {
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { label: 'THE JOURNEY', id: 'the-journey' },
  { label: 'THE STAY', id: 'the-habitat' },
  { label: 'EXPERIENCE', id: 'lunar-experiences' },
  { label: 'MISSION PREVIEW', id: 'mission-configurator' },
] as const;

export function OrbitHeader({ onNavigate }: OrbitHeaderProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const triggerBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        triggerBtnRef.current?.focus();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuPanelRef.current &&
        !menuPanelRef.current.contains(e.target as Node) &&
        !triggerBtnRef.current?.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-colors duration-300 ${
        isScrolled
          ? 'bg-[#030812]/72 backdrop-blur-md border-b border-white/8'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-8 px-5 py-4 sm:px-8 lg:px-12">
        {/* Zone 1: Brand mark with thin outlined orbit icon */}
        <a
          href="#lunar-arrival"
          onClick={(e) => handleLinkClick(e, 'lunar-arrival')}
          className="group inline-flex items-center gap-3 text-xs sm:text-sm font-bold tracking-[0.22em] text-[#EDF6FD] uppercase whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF] rounded-full py-1 pr-2"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            aria-hidden="true"
            className="shrink-0 text-[#EDF6FD] transition-transform duration-300 group-hover:rotate-12"
          >
            <circle
              cx="14"
              cy="14"
              r="5.5"
              stroke="currentColor"
              strokeWidth="1.25"
              className="opacity-90"
            />
            <motion.ellipse
              cx="14"
              cy="14"
              rx="12"
              ry="5.2"
              transform="rotate(-24 14 14)"
              stroke="#8DE9FF"
              strokeWidth="1.2"
              initial={prefersReducedMotion ? false : { pathLength: 0, opacity: 0.3 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            />
            <circle cx="24.2" cy="9.5" r="1.6" fill="#8DE9FF" />
          </svg>
          <span>ORBIT &amp; BEYOND</span>
        </a>

        {/* Zone 2: Desktop utility navigation */}
        <nav
          aria-label="Primary Mission Navigation"
          className="hidden lg:flex items-center gap-8"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleLinkClick(e, item.id)}
              className="relative py-1 text-[11px] font-medium tracking-[0.18em] text-[#EDF6FD]/80 hover:text-[#EDF6FD] transition-colors whitespace-nowrap shrink-0 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-0 after:bg-[#8DE9FF] after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF] rounded"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Right action & mobile menu button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#mission-configurator"
            onClick={(e) => handleLinkClick(e, 'mission-configurator')}
            className="liquid-glass hidden sm:inline-flex items-center justify-center rounded-full px-4 py-2 text-[11px] font-semibold tracking-[0.16em] text-[#EDF6FD] uppercase whitespace-nowrap shrink-0 hover:border-[#8DE9FF]/45 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF]"
          >
            MISSION PREVIEW
          </a>

          <button
            ref={triggerBtnRef}
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-mission-nav"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="liquid-glass inline-flex lg:hidden h-11 w-11 items-center justify-center rounded-full text-[#EDF6FD] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-mission-nav"
            ref={menuPanelRef}
            role="dialog"
            aria-label="Mobile Navigation"
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="liquid-glass mx-4 mt-2 rounded-[24px] p-5 lg:hidden"
          >
            <nav aria-label="Mobile Mission Links" className="flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleLinkClick(e, item.id)}
                  className="flex items-center justify-between rounded-[14px] px-4 py-3 text-xs font-semibold tracking-[0.18em] text-[#EDF6FD] hover:bg-white/8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF]"
                >
                  <span>{item.label}</span>
                  <span className="font-hud-mono text-[10px] text-[#8DE9FF]">2045</span>
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
