'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Logo } from '../brand/Logo';
import { animate, stagger, utils } from 'animejs';
import { NAV_ITEMS } from '../fold/config';

const CREASE_PATH = `M0 5 ${Array.from({ length: 64 }, (_, i) => `L${i * 10 + 5} 1 L${i * 10 + 10} 5`).join(' ')}`;

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll and trap focus when mobile menu is open
  useEffect(() => {
    if (!menuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMenuOpen(false);
        menuBtnRef.current?.focus();
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  // Drawer opens like a fold: the sheet drops from the top crease, links hinge in after it
  useEffect(() => {
    const drawer = drawerRef.current;
    if (!menuOpen || !drawer) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const items = drawer.querySelectorAll<HTMLElement>('[data-drawer-item]');
    utils.set(items, { opacity: 0, perspective: 700, rotateX: -80, y: 18 });
    for (const item of items) item.style.transformOrigin = '50% 0%';
    const sheet = animate(drawer, {
      clipPath: ['inset(0% 0% 100% 0%)', 'inset(0% 0% 0% 0%)'],
      duration: 620,
      ease: 'outExpo',
      onComplete: (self) => self.revert(),
    });
    const links = animate(items, {
      opacity: 1,
      rotateX: 0,
      y: 0,
      duration: 900,
      ease: 'outElastic(1, 0.8)',
      delay: stagger(80, { start: 160 }),
      onComplete: () => {
        for (const item of items) item.removeAttribute('style');
      },
    });
    return () => {
      sheet.revert();
      links.revert();
    };
  }, [menuOpen]);

  const handleNavClick = () => {
    if (menuOpen) setMenuOpen(false);
  };

  return (
    <header
      data-header=""
      className={`sticky top-0 z-40 w-full bg-[var(--srf-rose)] transition-colors duration-200 ${
        scrolled
          ? 'border-b border-[var(--srf-hairline)]'
          : 'border-b border-transparent'
      }`}
    >
      <div className="srf-container h-16 md:h-20 flex items-center justify-between gap-6">
        <a
          href="#top"
          className="srf-logo-link inline-flex items-center min-h-[44px] focus-visible:rounded-[4px]"
        >
          <Logo tone="dark" draw />
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden min-[900px]:flex items-center gap-7"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              data-header-item=""
              className="srf-text-link text-[15px] whitespace-nowrap shrink-0"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div data-header-item="" className="hidden min-[900px]:flex items-center shrink-0">
          <a href="#top" className="srf-btn-primary">
            <span>Design your divider</span>
            <ArrowRight className="w-4 h-4 srf-btn-arrow" aria-hidden="true" />
          </a>
        </div>

        <button
          ref={menuBtnRef}
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={menuOpen}
          aria-controls="srf-mobile-drawer"
          className="min-[900px]:hidden inline-flex items-center justify-center w-11 h-11 rounded-[8px] border border-[var(--srf-hairline-strong)] text-[var(--srf-oxblood)]"
        >
          <Menu className="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      {/* Page progress drawn as a crease that unfolds along the header */}
      <svg
        data-crease=""
        aria-hidden="true"
        viewBox="0 0 640 6"
        preserveAspectRatio="none"
        className="srf-crease"
      >
        <path
          d={CREASE_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {menuOpen && (
        <div
          id="srf-mobile-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-50 bg-[var(--srf-rose)] flex flex-col justify-between p-6 min-[900px]:hidden"
        >
          <div className="flex items-center justify-between h-12">
            <Logo tone="dark" />
            <button
              ref={closeBtnRef}
              type="button"
              onClick={() => {
                setMenuOpen(false);
                menuBtnRef.current?.focus();
              }}
              aria-label="Close navigation menu"
              className="inline-flex items-center justify-center w-11 h-11 rounded-[8px] border border-[var(--srf-hairline-strong)] text-[var(--srf-oxblood)]"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile navigation" className="flex flex-col gap-3 my-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                data-drawer-item=""
                className="py-3 border-b border-[var(--srf-hairline)] font-[family-name:var(--font-display)] text-2xl font-medium text-[var(--srf-oxblood)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div data-drawer-item="" className="pb-4">
            <a
              href="#top"
              onClick={handleNavClick}
              className="srf-btn-primary w-full"
            >
              <span>Design your divider</span>
              <ArrowRight className="w-4 h-4 srf-btn-arrow" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
