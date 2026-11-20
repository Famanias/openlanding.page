'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface TextSafeZoneOverlayProps {
  visible: boolean;
}

/**
 * Architectural hero safe-area visualizer.
 * Shows the uncluttered left/center-left text zone reserved for a future
 * landing-page headline, supporting copy, and primary CTA without building
 * a full landing page.
 */
export function TextSafeZoneOverlay({ visible }: TextSafeZoneOverlayProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="text-safe-zone-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Text-safe hero zone guide"
          data-testid="text-safe-zone-overlay"
          className="pointer-events-none fixed inset-0 z-10 flex items-center"
        >
          <div className="mx-auto w-full max-w-[1320px] px-6 sm:px-10 lg:px-16">
            <div className="relative max-w-[580px] rounded-xl border border-dashed border-sky-300/40 bg-slate-950/30 p-7 sm:p-10">
              {/* Crisp corner registration marks */}
              <span className="absolute -left-px -top-px h-4 w-4 border-l-2 border-t-2 border-sky-300/80 rounded-tl-xl" />
              <span className="absolute -right-px -top-px h-4 w-4 border-r-2 border-t-2 border-sky-300/80 rounded-tr-xl" />
              <span className="absolute -bottom-px -left-px h-4 w-4 border-b-2 border-l-2 border-sky-300/80 rounded-bl-xl" />
              <span className="absolute -bottom-px -right-px h-4 w-4 border-b-2 border-r-2 border-sky-300/80 rounded-br-xl" />

              {/* Clean unboxed guide header */}
              <div className="mb-6 flex items-center justify-between gap-4 text-xs text-sky-200/90 font-mono tabular-nums">
                <span>Text-Safe Hero Zone</span>
                <span className="text-slate-400">Max 580px · Left 52% Clear</span>
              </div>

              {/* Wireframe typography rhythm indicators for future hero copy */}
              <div className="space-y-4">
                <div className="h-3 w-28 rounded-sm bg-sky-200/20" />
                <div className="space-y-2.5">
                  <div className="h-9 w-full rounded-sm bg-slate-100/18" />
                  <div className="h-9 w-4/5 rounded-sm bg-slate-100/15" />
                </div>
                <div className="space-y-2 pt-2">
                  <div className="h-3.5 w-11/12 rounded-sm bg-slate-200/12" />
                  <div className="h-3.5 w-3/4 rounded-sm bg-slate-200/10" />
                </div>
                <div className="flex items-center gap-3 pt-4">
                  <div className="h-10 w-36 rounded-md border border-sky-200/35 bg-sky-200/15" />
                  <div className="h-10 w-28 rounded-md border border-white/15 bg-white/5" />
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
                <span>High-contrast dark field</span>
                <span aria-hidden="true">·</span>
                <span>Focal planet balanced right</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
