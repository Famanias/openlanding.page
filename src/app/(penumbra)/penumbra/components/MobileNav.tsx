'use client';

import React, { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (targetId: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, onNavigate }) => {
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const timer = window.setTimeout(() => {
      firstLinkRef.current?.focus();
    }, 50);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onClose();
    onNavigate(id);
  };

  return (
    <div
      id="mobile-navigation-drawer"
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation"
      className="fixed inset-0 z-40 md:hidden bg-[#111318]/96 backdrop-blur-xl pt-24 pb-10 px-6 flex flex-col justify-between border-b border-[#F2EBE2]/10"
    >
      <nav aria-label="Mobile Navigation" className="flex flex-col divide-y divide-[#F2EBE2]/10">
        <a
          ref={firstLinkRef}
          href="#projects"
          onClick={(e) => handleSelect(e, 'projects')}
          className="py-4 flex items-baseline justify-between group focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
        >
          <span className="font-display text-2xl sm:text-3xl text-[#F2EBE2] group-hover:text-[#D7A779] transition-colors">
            Projects
          </span>
          <span className="font-mono-tech text-xs text-[#A6A29F] tabular-nums">01</span>
        </a>
        <a
          href="#practice"
          onClick={(e) => handleSelect(e, 'practice')}
          className="py-4 flex items-baseline justify-between group focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
        >
          <span className="font-display text-2xl sm:text-3xl text-[#F2EBE2] group-hover:text-[#D7A779] transition-colors">
            Practice
          </span>
          <span className="font-mono-tech text-xs text-[#A6A29F] tabular-nums">02</span>
        </a>
        <a
          href="#light-lab"
          onClick={(e) => handleSelect(e, 'light-lab')}
          className="py-4 flex items-baseline justify-between group focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
        >
          <span className="font-display text-2xl sm:text-3xl text-[#F2EBE2] group-hover:text-[#D7A779] transition-colors">
            Light in motion
          </span>
          <span className="font-mono-tech text-xs text-[#A6A29F] tabular-nums">03</span>
        </a>
        <a
          href="#process"
          onClick={(e) => handleSelect(e, 'process')}
          className="py-4 flex items-baseline justify-between group focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
        >
          <span className="font-display text-2xl sm:text-3xl text-[#F2EBE2] group-hover:text-[#D7A779] transition-colors">
            Approach
          </span>
          <span className="font-mono-tech text-xs text-[#A6A29F] tabular-nums">04</span>
        </a>
        <a
          href="#journal"
          onClick={(e) => handleSelect(e, 'journal')}
          className="py-4 flex items-baseline justify-between group focus-visible:outline-2 focus-visible:outline-[#E9BB86]"
        >
          <span className="font-display text-2xl sm:text-3xl text-[#F2EBE2] group-hover:text-[#D7A779] transition-colors">
            Journal
          </span>
          <span className="font-mono-tech text-xs text-[#A6A29F]">Essay</span>
        </a>
      </nav>

      <div className="pt-6 border-t border-[#F2EBE2]/10 flex flex-col gap-4">
        <p className="text-xs tracking-wider uppercase text-[#A6A29F]">
          Independent lighting practice · Est. 2026
        </p>
        <a
          href="#contact"
          onClick={(e) => handleSelect(e, 'contact')}
          className="inline-flex items-center justify-between px-5 py-3.5 text-xs tracking-wider uppercase bg-[#D7A779] text-[#111318] font-medium hover:bg-[#E9BB86] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] transition-colors focus-visible:outline-2 focus-visible:outline-[#F2EBE2]"
        >
          <span>Start a project</span>
          <ArrowUpRight className="w-4 h-4 text-[#111318]" strokeWidth={1.5} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};
