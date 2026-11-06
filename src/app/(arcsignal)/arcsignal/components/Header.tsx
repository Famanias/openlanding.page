'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export interface HeaderProps {
  onOpenDemo: () => void;
  onOpenInfoModal: (topic: 'resources' | 'documentation' | 'about' | 'privacy') => void;
  activeSection: string;
}

type NavKey = 'platform' | 'capabilities' | 'architecture' | 'resources';

export const Header: React.FC<HeaderProps> = ({
  onOpenDemo,
  onOpenInfoModal,
  activeSection,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<NavKey | null>(null);
  const navContainerRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Record<NavKey, HTMLElement | null>>({
    platform: null,
    capabilities: null,
    architecture: null,
    resources: null,
  });
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left: number;
    width: number;
    opacity: number;
  }>({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Update traveling underline position based on hovered or active navigation item
  useEffect(() => {
    const updateIndicator = () => {
      const navEl = navContainerRef.current;
      if (!navEl) return;
      const activeKey: NavKey | null =
        hoveredNav ||
        (activeSection === 'platform'
          ? 'platform'
          : activeSection === 'capabilities'
          ? 'capabilities'
          : activeSection === 'architecture'
          ? 'architecture'
          : null);

      if (!activeKey) {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const targetEl = itemRefs.current[activeKey];
      if (!targetEl) return;

      const navRect = navEl.getBoundingClientRect();
      const itemRect = targetEl.getBoundingClientRect();
      setIndicatorStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
        opacity: 1,
      });
    };

    updateIndicator();
    window.addEventListener('resize', updateIndicator, { passive: true });
    return () => window.removeEventListener('resize', updateIndicator);
  }, [hoveredNav, activeSection]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-[#0C0F1B]/95 border-b border-[#9DA7C7]/20 shadow-[0_8px_32px_rgba(6,8,16,0.75)]'
          : 'bg-[#0C0F1B]/75 border-b border-[#9DA7C7]/14'
      }`}
    >
      <div className="mx-auto flex max-w-[1480px] items-center justify-between gap-8 px-6 py-4 lg:px-12">
        {/* Zone 1: Brand lockup */}
        <a
          href="#top"
          className="group flex items-center gap-1 text-xl font-semibold tracking-tight text-[#F3F4FA] whitespace-nowrap shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A58AFF] rounded"
          aria-label="Arc & Signal Home"
        >
          <span className="font-display font-semibold tracking-[-0.03em] text-[22px] text-[#F3F4FA]">
            arc<span className="text-[#9DA7C7] font-normal">&amp;</span>signal
          </span>
          <img
            src="/templates/arcsignal/signal-wave.svg"
            alt=""
            aria-hidden="true"
            referrerPolicy="no-referrer"
            className="h-4 w-4 -mt-3 -ml-0.5 transition-transform duration-200 group-hover:scale-110"
          />
        </a>

        {/* Zone 2: Primary navigation links with traveling elastic indicator */}
        <nav
          ref={navContainerRef}
          aria-label="Primary Navigation"
          onMouseLeave={() => setHoveredNav(null)}
          className="relative hidden md:flex items-center gap-9 text-sm font-medium text-[#9DA7C7]"
        >
          <a
            ref={(el) => {
              itemRefs.current.platform = el;
            }}
            href="#platform"
            onMouseEnter={() => setHoveredNav('platform')}
            onFocus={() => setHoveredNav('platform')}
            className={`hover:text-[#F3F4FA] transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeSection === 'platform' ? 'text-[#F3F4FA]' : ''
            }`}
          >
            Platform
          </a>
          <a
            ref={(el) => {
              itemRefs.current.capabilities = el;
            }}
            href="#capabilities"
            onMouseEnter={() => setHoveredNav('capabilities')}
            onFocus={() => setHoveredNav('capabilities')}
            className={`hover:text-[#F3F4FA] transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeSection === 'capabilities' ? 'text-[#F3F4FA]' : ''
            }`}
          >
            Solutions
          </a>
          <a
            ref={(el) => {
              itemRefs.current.architecture = el;
            }}
            href="#architecture"
            onMouseEnter={() => setHoveredNav('architecture')}
            onFocus={() => setHoveredNav('architecture')}
            className={`hover:text-[#F3F4FA] transition-colors whitespace-nowrap shrink-0 py-1 ${
              activeSection === 'architecture' ? 'text-[#F3F4FA]' : ''
            }`}
          >
            Architecture
          </a>
          <button
            ref={(el) => {
              itemRefs.current.resources = el;
            }}
            type="button"
            onClick={() => onOpenInfoModal('resources')}
            onMouseEnter={() => setHoveredNav('resources')}
            onFocus={() => setHoveredNav('resources')}
            className="hover:text-[#F3F4FA] transition-colors whitespace-nowrap shrink-0 py-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A58AFF] rounded"
          >
            Resources
          </button>

          {/* Traveling Elastic Signal Underline */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-[#D4C9FF] via-[#A58AFF] to-[#5367F9] shadow-[0_0_10px_#A58AFF]"
            style={{
              transform: `translate3d(${indicatorStyle.left}px, 0, 0)`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
              transition:
                'transform 280ms cubic-bezier(0.22, 1, 0.36, 1), width 280ms cubic-bezier(0.22, 1, 0.36, 1), opacity 180ms ease',
            }}
          />
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenDemo}
            className="hidden sm:inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#F3F4FA] btn-signal-outline whitespace-nowrap shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A58AFF]"
          >
            <span>BOOK A DEMO</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[#A58AFF] btn-arrow-icon" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex md:hidden items-center justify-center h-10 w-10 rounded-lg border border-[#9DA7C7]/25 bg-[#11172A] text-[#F3F4FA] hover:border-[#A58AFF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A58AFF]"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="md:hidden fixed inset-x-0 top-[69px] bottom-0 z-50 bg-[#0C0F1B]/98 border-t border-[#9DA7C7]/20 px-6 py-8 flex flex-col justify-between overflow-y-auto"
        >
          <nav aria-label="Mobile Menu Links" className="flex flex-col gap-5">
            <a
              href="#platform"
              onClick={() => handleNavClick('#platform')}
              className="text-lg font-medium text-[#F3F4FA] py-2 border-b border-[#9DA7C7]/15 flex items-center justify-between"
            >
              <span>Platform</span>
              <span className="font-mono-tech text-xs text-[#A58AFF]">02</span>
            </a>
            <a
              href="#capabilities"
              onClick={() => handleNavClick('#capabilities')}
              className="text-lg font-medium text-[#F3F4FA] py-2 border-b border-[#9DA7C7]/15 flex items-center justify-between"
            >
              <span>Solutions</span>
              <span className="font-mono-tech text-xs text-[#A58AFF]">01</span>
            </a>
            <a
              href="#architecture"
              onClick={() => handleNavClick('#architecture')}
              className="text-lg font-medium text-[#F3F4FA] py-2 border-b border-[#9DA7C7]/15 flex items-center justify-between"
            >
              <span>Architecture</span>
              <span className="font-mono-tech text-xs text-[#A58AFF]">04</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInfoModal('resources');
              }}
              className="text-left text-lg font-medium text-[#F3F4FA] py-2 border-b border-[#9DA7C7]/15 flex items-center justify-between"
            >
              <span>Resources</span>
              <span className="font-mono-tech text-xs text-[#9DA7C7]">DOCS</span>
            </button>
          </nav>

          <div className="pt-6 flex flex-col gap-4">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemo();
              }}
              className="w-full py-3.5 px-6 rounded-full text-xs font-semibold uppercase tracking-[0.14em] text-[#F3F4FA] btn-signal-primary flex items-center justify-center gap-2"
            >
              <span>BOOK A DEMO</span>
              <ArrowUpRight className="h-4 w-4 btn-arrow-icon" aria-hidden="true" />
            </button>
            <p className="font-mono-tech text-[11px] text-center tracking-[0.18em] text-[#9299B4] uppercase">
              ONE CONTROL PLANE. EVERY INTELLIGENT WORKFLOW.
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
