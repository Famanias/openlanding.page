"use client";

import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  bagCount: number;
  onOpenBag: () => void;
  onShopNow: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ bagCount, onOpenBag, onShopNow }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'FOOTWEAR', href: '#footwear' },
    { label: 'TECHNOLOGY', href: '#technology' },
    { label: 'ATHLETES', href: '#athletes' },
    { label: 'JOURNAL', href: '#journal' }
  ];

  return (
    <header className="sticky top-0 z-40 h-20 lg:h-[86px] w-full bg-[#0B0B0A]/95 backdrop-blur-md border-b border-[#F1F0E9]/10">
      <div className="max-w-[1440px] mx-auto h-full px-4 sm:px-8 lg:px-10 flex items-center justify-between gap-6">
        {/* Zone 1: Angular RAZORLINE SVG mark + slanted condensed wordmark */}
        <a
          href="#top"
          className="group flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D3FF35]"
          aria-label="RAZORLINE Home"
        >
          <svg
            width="36"
            height="28"
            viewBox="0 0 36 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            <path
              d="M3 4H21L27 10.5L19.5 16.5H11L18.5 10.5H8L3 4Z"
              fill="#F1F0E9"
            />
            <path
              d="M9 14.5L2.5 24H10.5L15.5 17.5L22.5 25.5H30.5L20.5 14.5H9Z"
              fill="#F1F0E9"
            />
            <path
              d="M25.5 4L33.5 11.5L28.5 15.5L31 11L23.5 4H25.5Z"
              fill="#D3FF35"
            />
          </svg>
          <span className="font-display italic font-black text-[28px] sm:text-[33px] tracking-[-0.02em] text-[#F1F0E9] leading-none">
            RAZORLINE
          </span>
        </a>

        {/* Zone 2: 4 concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 lg:gap-11"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative font-display font-semibold text-[15px] lg:text-[16px] tracking-[0.12em] text-[#F1F0E9]/85 hover:text-[#F1F0E9] transition-colors whitespace-nowrap shrink-0 py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#D3FF35] after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D3FF35]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Cart icon + Rectangular Voltage Lime SHOP NOW CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBag}
            aria-label={`Shopping bag with ${bagCount} items`}
            className="relative w-11 h-11 border border-[#F1F0E9]/25 bg-[#0B0B0A] hover:border-[#D3FF35] text-[#F1F0E9] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D3FF35]"
          >
            <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.75} />
            {bagCount > 0 && (
              <span
                data-testid="bag-count-badge"
                className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 bg-[#D3FF35] text-[#0B0B0A] font-mono-tech text-[11px] font-bold flex items-center justify-center"
              >
                {bagCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onShopNow}
            className="hidden sm:inline-flex items-center justify-center h-11 px-6 lg:px-7 bg-[#D3FF35] hover:bg-[#e1ff66] active:scale-[0.98] text-[#0B0B0A] font-display font-extrabold text-[15px] tracking-[0.09em] uppercase transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F1F0E9]"
          >
            SHOP NOW
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden w-11 h-11 border border-[#F1F0E9]/25 text-[#F1F0E9] flex items-center justify-center hover:border-[#D3FF35] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-[#0B0B0A] border-b border-[#F1F0E9]/20 px-6 py-6 space-y-4"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display italic font-extrabold text-2xl tracking-[0.08em] text-[#F1F0E9] hover:text-[#D3FF35] py-1.5 border-b border-[#F1F0E9]/10"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onShopNow();
            }}
            className="w-full h-12 bg-[#D3FF35] text-[#0B0B0A] font-display font-extrabold text-base tracking-[0.1em] uppercase flex items-center justify-center"
          >
            SHOP NOW
          </button>
        </div>
      )}
    </header>
  );
};
