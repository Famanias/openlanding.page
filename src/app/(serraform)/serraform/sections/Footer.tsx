'use client';

import React from 'react';
import { Logo } from '../brand/Logo';
import { NAV_ITEMS } from '../fold/config';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 lg:py-16 bg-[var(--srf-rose)] text-[var(--srf-oxblood)]">
      <div className="srf-container">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[var(--srf-hairline)]">
          <div>
            <Logo tone="dark" />
            <p className="mt-2 text-sm text-[var(--srf-mauve)]">
              A little fold. A different room.
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="srf-text-link text-sm"
              >
                {item.label}
              </a>
            ))}
            <a href="#disclosure" className="srf-text-link text-sm">
              About this demo
            </a>
            <a href="#top" className="srf-text-link text-sm">
              Back to top
            </a>
          </nav>
        </div>

        <div id="disclosure" className="pt-6 scroll-mt-20">
          <p className="srf-mono-caption text-[var(--srf-mauve)] max-w-[70ch]">
            SERRAFORM is a fictional design concept. Uploaded images and room briefs stay in your browser session; nothing is collected or sent.
          </p>
        </div>
      </div>
    </footer>
  );
};
