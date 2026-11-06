"use client";

import React, { useState } from "react";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#F5EFEB]/85 backdrop-blur-md border-b border-[#121417]/06 transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <Logo size={28} />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#2B2F38]">
          <a
            href="#features"
            className="hover:text-[#121417] transition-colors"
          >
            Features
          </a>
          <a
            href="#pipeline"
            className="hover:text-[#121417] transition-colors"
          >
            Pipeline
          </a>
          <a href="#pricing" className="hover:text-[#121417] transition-colors">
            Pricing
          </a>
          <a href="#faq" className="hover:text-[#121417] transition-colors">
            FAQ
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="#signin"
            className="text-[14px] font-semibold text-[#2B2F38] hover:text-[#121417] px-3 py-1.5 transition-colors"
          >
            Sign in
          </a>
          <a
            href="#get-started"
            className="inline-flex items-center justify-center text-[13px] font-bold bg-[#121417] text-[#F5EFEB] px-4 py-2 rounded-full shadow-sm hover:bg-[#2B2F38] hover:shadow transition-all"
          >
            Start free
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 rounded-lg text-[#121417] hover:bg-[#E5DDD4] transition"
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="waypoint-mobile-navigation"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
