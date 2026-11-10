'use client';
import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AccessibleDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  kicker?: string;
  children: React.ReactNode;
}

export const AccessibleDialog: React.FC<AccessibleDialogProps> = ({
  isOpen,
  onClose,
  title,
  kicker = 'SYSTEM SPECIFICATION',
  children,
}) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement | null;
      const timer = window.setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 20);
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
          return;
        }
        if (e.key === 'Tab' && dialogRef.current) {
          const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
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

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
      if (previousFocusRef.current) {
        previousFocusRef.current.focus({ preventScroll: true });
      }
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 bg-[#0E100C]/85 backdrop-blur-xs"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="forum-dialog-title"
            initial={
              reducedMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, y: 14, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 10, scale: 0.98 }
            }
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-2xl border border-[#B9B28A]/60 bg-[#171814] text-[#F6F3EA] shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Architectural corner crosses */}
            <div className="flex items-center justify-between border-b border-[#B9B28A]/35 px-5 py-3.5 bg-[#0E100C]">
              <div className="flex items-center gap-2.5">
                <span className="reg-cross text-[#B9B28A]" aria-hidden="true" />
                <span className="font-mono-tech text-xs tracking-[0.14em] text-[#B9B28A] uppercase">
                  {kicker}
                </span>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="inline-flex items-center gap-1.5 border border-[#B9B28A]/40 px-2.5 py-1 font-doto-ui text-xs text-[#D7D1B8] uppercase hover:border-[#F6F3EA] hover:text-[#F6F3EA] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EA] cursor-pointer"
              >
                <span>ESC</span>
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-6 sm:p-8">
              <h2
                id="forum-dialog-title"
                className="font-doto-display text-2xl sm:text-3xl text-[#F6F3EA] uppercase tracking-tight mb-4"
              >
                {title}
              </h2>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
