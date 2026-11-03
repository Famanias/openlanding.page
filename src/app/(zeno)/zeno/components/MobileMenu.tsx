'use client';

import React, { useEffect, useRef } from 'react';
import { siteConfig, NavItem } from '../data/siteConfig';
import { Wordmark } from './Wordmark';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenStudio: () => void;
  onOpenContact: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onOpenStudio,
  onOpenContact,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNavClick = (item: NavItem, e: React.MouseEvent) => {
    if (item.action === 'studio-dialog') {
      e.preventDefault();
      onClose();
      onOpenStudio();
    } else if (item.action === 'contact-dialog') {
      e.preventDefault();
      onClose();
      onOpenContact();
    } else {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 md:hidden bg-[#111117]/98 backdrop-blur-md flex flex-col justify-between px-6 py-6 border-l border-[#F2F0EB]/15"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation menu"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-[#F2F0EB]/20 pb-5">
        <Wordmark size="sm" onClick={onClose} />
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          className="zeno-focus px-3.5 py-2 text-xs font-medium tracking-[0.16em] uppercase text-[#F2F0EB] border border-[#F2F0EB]/30 rounded-full hover:border-[#A58AFF]"
        >
          CLOSE ✕
        </button>
      </div>

      {/* Main Nav Links */}
      <nav aria-label="Mobile primary navigation" className="my-auto py-8">
        <p className="text-[11px] tracking-[0.2em] uppercase text-[#A58AFF] mb-6">
          INDEX / NAVIGATION
        </p>
        <ul className="space-y-5">
          {siteConfig.navItems.map((item, idx) => (
            <li key={item.id} className="border-b border-[#F2F0EB]/10 pb-4">
              <a
                href={item.href}
                onClick={(e) => handleNavClick(item, e)}
                className="zeno-focus flex items-baseline justify-between text-3xl font-editorial text-[#F2F0EB] hover:text-[#A58AFF] transition-colors"
              >
                <span>{item.label}</span>
                <span className="text-xs font-grotesk text-[#96939F] tracking-[0.16em]">
                  0{idx + 1}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom CTA & Metadata */}
      <div className="pt-4 border-t border-[#F2F0EB]/20 space-y-4">
        <button
          type="button"
          onClick={() => {
            onClose();
            onOpenContact();
          }}
          className="zeno-focus w-full py-3.5 px-6 rounded-full bg-[#F2F0EB] text-[#111117] font-grotesk text-xs font-semibold tracking-[0.14em] uppercase flex items-center justify-center gap-2 hover:bg-[#A58AFF] transition-colors"
        >
          <span>START A PROJECT</span>
          <span aria-hidden="true">↗</span>
        </button>
        <div className="flex items-center justify-between text-[10px] tracking-[0.14em] uppercase text-[#96939F]">
          <span>INDEPENDENT CREATIVE PRACTICE</span>
          <span>2026</span>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
