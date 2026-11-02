import React, { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  bagCount: number;
  onOpenBag: () => void;
}

export function Navbar({ bagCount, onOpenBag }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Our Kits', href: '#our-kits' },
    { label: 'How It Grows', href: '#how-it-grows' },
    { label: 'The Journal', href: '#the-journal' },
    { label: 'Our Story', href: '#our-story' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F7ECD6]/95 backdrop-blur-sm border-b border-[#4A2E25]/10">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark + Hand-drawn mushroom mark */}
        <a
          href="#"
          className="inline-flex items-center gap-2 text-2xl sm:text-[28px] font-serif-display font-bold tracking-tight text-[#4A2E25] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A2E25] rounded-lg"
        >
          <span>poppy patch</span>
          <img
            src="/templates/poppypatch/logo-mushroom.png"
            alt=""
            width={34}
            height={36}
            referrerPolicy="no-referrer"
            className="w-8 h-8 object-contain -mt-1 select-none"
          />
        </a>

        {/* Zone 2: 4 Single-line Navigation Links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-8 lg:gap-11 text-[16px] font-medium text-[#4A2E25]"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 hover:text-[#B85338] transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#E58267] after: rounded-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4A2E25] rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary CTA + Bag Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBag}
            aria-label={`Open shopping bag (${bagCount} ${bagCount === 1 ? 'item' : 'items'})`}
            className="relative inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full border border-[#4A2E25]/25 bg-[#FAF3E3] hover:bg-[#F3E6CC] text-[#4A2E25] text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E25]"
          >
            <ShoppingBag className="w-4 h-4 text-[#4A2E25]" aria-hidden="true" />
            <span className="tabular-nums">{bagCount}</span>
          </button>

          <a
            href="#our-kits"
            className="hidden sm:inline-flex items-center justify-center px-6 py-3 bg-[#E58267] hover:bg-[#DC7458] active:translate-y-0.5 text-[#3B2219] font-semibold text-sm tracking-wider uppercase rounded-full shadow-[0_3px_0_#B85A40] transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A2E25]"
          >
            GET GROWING
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#4A2E25]/20 bg-[#FAF3E3] text-[#4A2E25] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#4A2E25]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-[#FAF3E3] border-b border-[#4A2E25]/15 px-6 py-5 space-y-3"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col space-y-2.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-lg font-serif-display font-semibold text-[#4A2E25] hover:text-[#C45B3E]"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <a
              href="#our-kits"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center px-6 py-3 bg-[#E58267] text-[#3B2219] font-bold text-sm tracking-wider uppercase rounded-full shadow-[0_3px_0_#B85A40]"
            >
              GET GROWING
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
