import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenEarlyAccess: (mode: 'download' | 'login' | 'start') => void;
}

export const HaloLogoIcon: React.FC<{ className?: string }> = ({ className = 'w-7 h-7' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Outer vessel / halo contour */}
    <path
      d="M7.5 12.5C6.2 14.8 6.3 18.2 7.8 21.1C9.5 24.3 12.6 26 16 26C19.4 26 22.5 24.3 24.2 21.1C25.7 18.2 25.8 14.8 24.5 12.5"
      stroke="#5C6675"
      strokeWidth="1.6"
      strokeLinecap="round"
      className="animate-halo-trace"
    />
    <path
      d="M9.2 13.8C8.3 15.8 8.4 18.4 9.6 20.6C11 23.1 13.4 24.4 16 24.4C18.6 24.4 21 23.1 22.4 20.6C23.6 18.4 23.7 15.8 22.8 13.8"
      stroke="#5C6675"
      strokeWidth="1.15"
      strokeLinecap="round"
      opacity="0.72"
    />
    {/* Top halo rim ellipse */}
    <ellipse
      cx="16"
      cy="11.2"
      rx="6.8"
      ry="2.2"
      stroke="#5C6675"
      strokeWidth="1.5"
      className="animate-halo-trace"
    />
    <path
      d="M11.2 11.4C12.5 10.6 14.2 10.2 16 10.2C17.8 10.2 19.5 10.6 20.8 11.4"
      stroke="#5C6675"
      strokeWidth="1.1"
      strokeLinecap="round"
      opacity="0.65"
    />
  </svg>
);

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Templates', href: '#templates' },
  { label: 'Pricing', href: '#pricing' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenEarlyAccess }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-30 w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 pt-7 pb-4">
      <div className="flex items-center justify-between gap-8">
        {/* Zone 1: Brand lockup */}
        <a
          href="#home"
          className="group inline-flex items-center gap-2.5 text-[#29313E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#29313E] rounded-lg whitespace-nowrap shrink-0"
        >
          <HaloLogoIcon className="w-7 h-7 transition-transform duration-300 group-hover:scale-105" />
          <span className="text-[22px] font-medium tracking-[-0.02em] text-[#29313E]">
            Halo Desk
          </span>
        </a>

        {/* Zone 2: Restrained centered links */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-9 text-[15px] font-normal text-[#4A5565]"
          onMouseLeave={() => setHoveredIdx(null)}
        >
          {NAV_LINKS.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHoveredIdx(index)}
              className="relative py-1.5 text-[#4A5565] hover:text-[#29313E] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#29313E] rounded"
            >
              {link.label}
              <span
                aria-hidden="true"
                className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#29313E] rounded-full transition-transform duration-200 origin-left ${
                  hoveredIdx === index ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </a>
          ))}
        </nav>

        {/* Zone 3: Right actions */}
        <div className="hidden md:flex items-center gap-6 shrink-0">
          <button
            type="button"
            onClick={() => onOpenEarlyAccess('login')}
            className="text-[15px] font-normal text-[#4A5565] hover:text-[#29313E] transition-colors py-2 px-2 rounded-lg whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29313E]"
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => onOpenEarlyAccess('start')}
            className="px-5 py-2.5 rounded-full bg-[#6C798F] hover:bg-[#5B677C] active:scale-[0.98] text-[#FCFBF7] text-[15px] font-medium transition-all duration-200 shadow-[0_4px_12px_rgba(74,85,104,0.18)] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#29313E]"
          >
            Start Free
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full text-[#29313E] hover:bg-black/5 transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile collapsible navigation */}
      {mobileOpen && (
        <div className="md:hidden mt-4 p-5 rounded-2xl bg-[#FCFBF7]/95 backdrop-blur-md border border-[#3A4453]/12 shadow-lg space-y-4">
          <nav aria-label="Mobile" className="flex flex-col space-y-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-2 px-3 rounded-lg text-[15px] font-medium text-[#29313E] hover:bg-[#CFDFEF]/35 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#3A4453]/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenEarlyAccess('login');
              }}
              className="w-1/2 py-2.5 rounded-full border border-[#3A4453]/20 text-[14px] font-medium text-[#29313E]"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenEarlyAccess('start');
              }}
              className="w-1/2 py-2.5 rounded-full bg-[#6C798F] text-[#FCFBF7] text-[14px] font-medium"
            >
              Start Free
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
