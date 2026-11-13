'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, RotateCcw, RotateCw, X } from 'lucide-react';
import { ColorWheel } from './ColorWheel';
import {
  FOLD_CONSTANTS,
  PRINT_SPECS,
  VIEW_ORDER,
  VIEW_PRESETS,
} from './config';
import { formatMeters } from './geometry';
import { useFold } from './FoldProvider';
import type { AdvancedDrawerSection } from './HeroStudioDock';
import { PrintGallery } from './PrintGallery';
import { normalizeYawDeg, viewPresetFromAngles } from './state';

interface AdvancedStudioDrawerProps {
  open: boolean;
  initialSection: AdvancedDrawerSection;
  onClose: () => void;
}

export const AdvancedStudioDrawer: React.FC<AdvancedStudioDrawerProps> = ({
  open,
  initialSection,
  onClose,
}) => {
  const {
    design,
    view,
    effectiveOpening,
    effectivePose,
    env,
    uploadedArt,
    setOpening,
    setViewPreset,
    rotateViewStep,
    resetView,
    resetShape,
    resetDesign,
  } = useFold();

  const drawerRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const colorSectionRef = useRef<HTMLElement>(null);
  const designSectionRef = useRef<HTMLElement>(null);
  const viewSectionRef = useRef<HTMLElement>(null);
  const [announcement, setAnnouncement] = useState('');

  // Handle Escape key, body scroll lock, and initial section scroll/focus
  useEffect(() => {
    if (!open) return;

    const prevFocused = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const scrollTarget =
      initialSection === 'color'
        ? colorSectionRef.current
        : initialSection === 'design'
          ? designSectionRef.current
          : initialSection === 'view'
            ? viewSectionRef.current
            : null;

    if (scrollTarget) {
      requestAnimationFrame(() => {
        scrollTarget.scrollIntoView({ block: 'start', behavior: 'auto' });
      });
    }

    requestAnimationFrame(() => {
      closeBtnRef.current?.focus();
    });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
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
      if (prevFocused && typeof prevFocused.focus === 'function') {
        prevFocused.focus();
      }
    };
  }, [open, initialSection, onClose]);

  if (!open) return null;

  const roundedOpening = Math.round(effectiveOpening);
  const formattedSpan = formatMeters(effectivePose.metrics.outerSpan);
  const printSpec = PRINT_SPECS[design.print];
  const matchedPreset = viewPresetFromAngles(view);
  const roundedYaw = Math.round(normalizeYawDeg(view.yawDeg));

  const handleUseInBrief = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onClose();
    requestAnimationFrame(() => {
      const target = document.getElementById('brief-heading');
      if (target) {
        target.scrollIntoView({
          behavior: env.reducedMotion ? 'auto' : 'smooth',
          block: 'start',
        });
        if (target instanceof HTMLElement) {
          target.focus({ preventScroll: true });
        }
      }
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#4B202A]/28"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="srf-adv-drawer-title"
        data-testid="hero-advanced-drawer"
        className="w-full max-w-[520px] h-full bg-[#FAF2EE] border-l border-[var(--srf-hairline-strong)] shadow-[0_20px_60px_rgba(75,32,42,0.22)] flex flex-col"
      >
        {/* Drawer Header */}
        <div className="shrink-0 flex items-center justify-between gap-4 px-5 py-4 border-b border-[var(--srf-hairline)] bg-[var(--srf-rose)]">
          <div>
            <div className="srf-mono-caption text-[var(--srf-mauve)]">
              SERRAFORM / FOLD {FOLD_CONSTANTS.panels}
            </div>
            <h2
              id="srf-adv-drawer-title"
              className="text-lg font-medium text-[var(--srf-oxblood)]"
            >
              Advanced studio
            </h2>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close advanced studio"
            className="inline-flex items-center justify-center w-10 h-10 rounded-[8px] border border-[var(--srf-hairline-strong)] bg-[var(--srf-porcelain)]/75 text-[var(--srf-oxblood)] hover:border-[var(--srf-oxblood)]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Full Customization Rail */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
          {/* 1. Shape */}
          <section className="space-y-2.5" aria-labelledby="srf-adv-shape">
            <div className="flex items-baseline justify-between gap-4">
              <h3 id="srf-adv-shape" className="text-base font-medium text-[var(--srf-oxblood)]">
                1. Shape
              </h3>
              <span className="srf-mono-dim text-[var(--srf-oxblood)]">
                {roundedOpening}% · {formattedSpan}
              </span>
            </div>

            <div>
              <label htmlFor="srf-adv-opening-range" className="sr-only">
                Opening percentage
              </label>
              <input
                id="srf-adv-opening-range"
                type="range"
                min={0}
                max={100}
                step={1}
                value={roundedOpening}
                onChange={(e) => setOpening(Number(e.target.value))}
                aria-valuetext={`${roundedOpening} percent, outer span ${formattedSpan}`}
                className="srf-range"
              />
              <div className="flex items-center justify-between srf-mono-caption text-[var(--srf-mauve)]">
                <span>Gathered</span>
                <button
                  type="button"
                  onClick={() => {
                    resetShape();
                    setAnnouncement('Shape reset to 50 percent opening.');
                  }}
                  className="text-[var(--srf-oxblood)] underline underline-offset-4 hover:text-[var(--srf-clay)] min-h-[32px] px-1"
                >
                  Reset shape
                </button>
                <span>Open</span>
              </div>
            </div>
          </section>

          {/* 2. Color (exact existing ColorWheel with Base + Design color, Hex, H/S/B, 10 swatches) */}
          <section
            ref={colorSectionRef}
            className="pt-5 border-t border-[var(--srf-hairline)] space-y-3"
            aria-labelledby="srf-adv-color"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h3 id="srf-adv-color" className="text-base font-medium text-[var(--srf-oxblood)]">
                2. Color
              </h3>
              <span className="srf-mono-caption text-[var(--srf-mauve)]">
                {design.baseHex}
                {printSpec.usesDesignColor ? ` · ${design.designHex}` : ''}
              </span>
            </div>

            <ColorWheel idPrefix="srf-hero" />
          </section>

          {/* 3. Design (exact existing PrintGallery with Bloom/Stripes/Landscape/Waves/Solid, Upload, Motif size) */}
          <section
            ref={designSectionRef}
            className="pt-5 border-t border-[var(--srf-hairline)] space-y-3"
            aria-labelledby="srf-adv-design"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h3 id="srf-adv-design" className="text-base font-medium text-[var(--srf-oxblood)]">
                3. Design
              </h3>
              <span className="srf-mono-caption text-[var(--srf-mauve)]">
                {printSpec.name}
                {printSpec.usesScale ? ` · ${design.motifScale}%` : ''}
              </span>
            </div>

            <PrintGallery idPrefix="srf-hero" onAnnounce={setAnnouncement} />
          </section>

          {/* 4. View */}
          <section
            ref={viewSectionRef}
            className="pt-5 border-t border-[var(--srf-hairline)] space-y-3"
            aria-labelledby="srf-adv-view"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h3 id="srf-adv-view" className="text-base font-medium text-[var(--srf-oxblood)]">
                4. View
              </h3>
              <span className="srf-mono-caption text-[var(--srf-mauve)]">
                View: {roundedYaw}°
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                aria-label="Rotate divider left"
                onClick={() => {
                  rotateViewStep(-FOLD_CONSTANTS.rotateStepDeg);
                  setAnnouncement('Rotated divider left 15 degrees.');
                }}
                className="srf-btn-secondary !px-3 text-sm"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Rotate left</span>
              </button>

              <button
                type="button"
                aria-label="Rotate divider right"
                onClick={() => {
                  rotateViewStep(FOLD_CONSTANTS.rotateStepDeg);
                  setAnnouncement('Rotated divider right 15 degrees.');
                }}
                className="srf-btn-secondary !px-3 text-sm"
              >
                <RotateCw className="w-4 h-4" aria-hidden="true" />
                <span>Rotate right</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  resetView();
                  setAnnouncement('Camera reset to default three-quarter angle.');
                }}
                className="srf-btn-secondary !px-3 text-sm"
              >
                Reset view
              </button>
            </div>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Camera view presets">
              {VIEW_ORDER.map((viewId) => {
                const preset = VIEW_PRESETS[viewId];
                const active = matchedPreset === viewId;
                return (
                  <button
                    key={viewId}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setViewPreset(viewId);
                      setAnnouncement(`Camera view changed to ${preset.label}.`);
                    }}
                    className="srf-btn-secondary !min-h-[40px] !py-1.5 !px-3 text-sm"
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 5. Live Specification Summary + Actions */}
          <section className="pt-5 border-t border-[var(--srf-hairline)] space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-medium text-[var(--srf-oxblood)]">
                Design summary
              </h3>
              <button
                type="button"
                onClick={() => {
                  resetDesign();
                  setAnnouncement('Design reset to Flax #D8C4A7, Oxblood #4B202A, Bloom at 100 percent.');
                }}
                className="srf-btn-secondary !min-h-[38px] !py-1 !px-3 text-xs"
              >
                Reset design
              </button>
            </div>

            <dl
              data-testid="hero-drawer-summary"
              className="p-3.5 rounded-[8px] border border-[var(--srf-hairline)] bg-[var(--srf-surface-soft)] grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm"
            >
              <div>
                <dt className="srf-mono-caption text-[var(--srf-mauve)]">Base color</dt>
                <dd className="font-medium text-[var(--srf-oxblood)] flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full border border-[var(--srf-oxblood)]/25 inline-block shrink-0"
                    style={{ backgroundColor: design.baseHex }}
                    aria-hidden="true"
                  />
                  <span>{design.baseHex}</span>
                </dd>
              </div>

              <div>
                <dt className="srf-mono-caption text-[var(--srf-mauve)]">Print</dt>
                <dd className="font-medium text-[var(--srf-oxblood)]">
                  {printSpec.name}
                </dd>
              </div>

              {printSpec.usesDesignColor && (
                <div>
                  <dt className="srf-mono-caption text-[var(--srf-mauve)]">Design color</dt>
                  <dd className="font-medium text-[var(--srf-oxblood)] flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full border border-[var(--srf-oxblood)]/25 inline-block shrink-0"
                      style={{ backgroundColor: design.designHex }}
                      aria-hidden="true"
                    />
                    <span>{design.designHex}</span>
                  </dd>
                </div>
              )}

              {printSpec.usesScale && (
                <div>
                  <dt className="srf-mono-caption text-[var(--srf-mauve)]">
                    {printSpec.scaleLabel}
                  </dt>
                  <dd className="font-medium text-[var(--srf-oxblood)]">
                    {design.motifScale}%
                  </dd>
                </div>
              )}

              <div>
                <dt className="srf-mono-caption text-[var(--srf-mauve)]">Opening</dt>
                <dd className="font-medium text-[var(--srf-oxblood)]">
                  {roundedOpening}%
                </dd>
              </div>

              <div>
                <dt className="srf-mono-caption text-[var(--srf-mauve)]">Outer span</dt>
                <dd className="font-medium text-[var(--srf-oxblood)]">
                  {formattedSpan}
                </dd>
              </div>

              {design.print === 'upload' && uploadedArt && (
                <div className="col-span-2">
                  <dt className="srf-mono-caption text-[var(--srf-mauve)]">Your image</dt>
                  <dd className="font-medium text-[var(--srf-oxblood)] truncate">
                    {uploadedArt.filename} (local session only)
                  </dd>
                </div>
              )}
            </dl>

            <a
              href="#brief"
              onClick={handleUseInBrief}
              className="srf-btn-primary w-full"
            >
              <span>Use this design in my brief</span>
              <ArrowRight className="w-4 h-4 srf-btn-arrow" aria-hidden="true" />
            </a>
          </section>
        </div>

        <div className="sr-only" aria-live="polite">
          {announcement}
        </div>
      </div>
    </div>
  );
};
