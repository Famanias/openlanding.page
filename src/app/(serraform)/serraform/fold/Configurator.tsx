'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, RotateCcw, RotateCw } from 'lucide-react';
import { ColorWheel } from './ColorWheel';
import {
  FOLD_CONSTANTS,
  PRINT_SPECS,
  VIEW_ORDER,
  VIEW_PRESETS,
} from './config';
import { deriveFold, deriveFoldChain, formatMeters } from './geometry';
import { useFold } from './FoldProvider';
import { PrintGallery } from './PrintGallery';
import { normalizeYawDeg, usesActivePrintColor, viewPresetFromAngles } from './state';

export const Configurator: React.FC = () => {
  const {
    mode,
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
    followStory,
    subscribeStoryFrame,
    subscribeChainFrame,
    getLiveChainFrame,
  } = useFold();

  const rangeRef = useRef<HTMLInputElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const summarySpanRef = useRef<HTMLSpanElement>(null);

  const [announcement, setAnnouncement] = useState('');

  // Keep shape slider and readouts synced cleanly during manual edits, story scrub, and chain choreography
  useEffect(() => {
    const syncDom = (val: number, spanMeters?: number) => {
      const rounded = Math.round(val);
      const formattedSpan = formatMeters(
        typeof spanMeters === 'number' ? spanMeters : deriveFold(val).metrics.outerSpan,
      );
      if (rangeRef.current) {
        rangeRef.current.value = String(rounded);
      }
      if (percentRef.current) {
        percentRef.current.textContent = `${rounded}%`;
      }
      if (spanRef.current) {
        spanRef.current.textContent = formattedSpan;
      }
      if (summarySpanRef.current) {
        summarySpanRef.current.textContent = formattedSpan;
      }
    };

    const liveChain = getLiveChainFrame();
    if (liveChain) {
      syncDom(liveChain.averageOpening, deriveFoldChain(liveChain.panelOpenings).metrics.outerSpan);
    } else {
      syncDom(effectiveOpening);
    }

    const unsubChain = subscribeChainFrame((frame) => {
      if (frame) {
        syncDom(frame.averageOpening, deriveFoldChain(frame.panelOpenings).metrics.outerSpan);
      } else {
        syncDom(effectiveOpening);
      }
    });

    const unsubStory =
      mode === 'story'
        ? subscribeStoryFrame((nextOpening) => {
            if (!getLiveChainFrame()) {
              syncDom(nextOpening);
            }
          })
        : undefined;

    return () => {
      unsubChain();
      unsubStory?.();
    };
  }, [mode, effectiveOpening, subscribeStoryFrame, subscribeChainFrame, getLiveChainFrame]);

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpening(Number(e.target.value));
  };

  const handleRangeCommit = () => {
    const pose = deriveFold(effectiveOpening);
    setAnnouncement(
      `Opening ${Math.round(effectiveOpening)} percent, span ${formatMeters(pose.metrics.outerSpan)}.`,
    );
  };

  const handleUseInBrief = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
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
  };

  const roundedOpening = Math.round(effectiveOpening);
  const formattedSpan = formatMeters(effectivePose.metrics.outerSpan);
  const printSpec = PRINT_SPECS[design.print];
  const matchedPreset = viewPresetFromAngles(view);
  const roundedYaw = Math.round(normalizeYawDeg(view.yawDeg));

  return (
    <div className="space-y-7">
      <div>
        <div className="mb-2 srf-mono-caption text-[var(--srf-mauve)]">
          Divider design studio
        </div>
        <h2 className="srf-h3 text-[var(--srf-oxblood)] text-balance mb-2">
          Tailor the fold, palette, and textile.
        </h2>
        <p className="text-sm text-[var(--srf-mauve)] max-w-[46ch]">
          Every change updates Fold {FOLD_CONSTANTS.panels} continuously across all sixteen panels and flows straight into your room brief.
        </p>
      </div>

      {/* 1. Shape */}
      <section className="pt-5 border-t border-[var(--srf-hairline)] space-y-3" aria-labelledby="srf-step-shape">
        <div className="flex items-baseline justify-between gap-4">
          <h3 id="srf-step-shape" className="text-base font-medium text-[var(--srf-oxblood)]">
            1. Shape
          </h3>
          <div className="srf-mono-dim text-[var(--srf-oxblood)]">
            <span ref={percentRef}>{roundedOpening}%</span>
            <span className="mx-1.5 text-[var(--srf-mauve)]" aria-hidden="true">
              ·
            </span>
            <span ref={spanRef}>{formattedSpan}</span>
          </div>
        </div>

        <div>
          <label htmlFor="srf-opening-range" className="sr-only">
            Opening percentage
          </label>
          <input
            ref={rangeRef}
            id="srf-opening-range"
            type="range"
            min={0}
            max={100}
            step={1}
            defaultValue={roundedOpening}
            onChange={handleRangeChange}
            onPointerUp={handleRangeCommit}
            onKeyUp={handleRangeCommit}
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

      {/* 2. Base & Print Color */}
      <section className="pt-5 border-t border-[var(--srf-hairline)] space-y-3" aria-labelledby="srf-step-color">
        <div className="flex items-baseline justify-between gap-2">
          <h3 id="srf-step-color" className="text-base font-medium text-[var(--srf-oxblood)]">
            2. Base &amp; Print Color
          </h3>
          <span className="srf-mono-caption text-[var(--srf-mauve)]">
            {design.baseHex}
            {usesActivePrintColor(design) ? ` · ${design.designHex}` : ''}
          </span>
        </div>

        <ColorWheel />
      </section>

      {/* 3. Design */}
      <section className="pt-5 border-t border-[var(--srf-hairline)] space-y-3" aria-labelledby="srf-step-design">
        <div className="flex items-baseline justify-between gap-2">
          <h3 id="srf-step-design" className="text-base font-medium text-[var(--srf-oxblood)]">
            3. Design
          </h3>
          <span className="srf-mono-caption text-[var(--srf-mauve)]">
            {printSpec.name}
            {printSpec.usesScale ? ` · ${design.motifScale}%` : ''}
          </span>
        </div>

        <PrintGallery onAnnounce={setAnnouncement} />
      </section>

      {/* 4. View */}
      <section className="pt-5 border-t border-[var(--srf-hairline)] space-y-3" aria-labelledby="srf-step-view">
        <div className="flex items-baseline justify-between gap-2">
          <h3 id="srf-step-view" className="text-base font-medium text-[var(--srf-oxblood)]">
            4. View
          </h3>
          <span className="srf-mono-caption text-[var(--srf-mauve)]" data-testid="srf-view-readout">
            View: {roundedYaw}°
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-label="Rotate divider left"
            onClick={() => {
              rotateViewStep(-FOLD_CONSTANTS.rotateStepDeg);
              setAnnouncement(`Rotated divider left 15 degrees.`);
            }}
            className="srf-btn-secondary !px-3.5 text-sm"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Rotate left</span>
          </button>

          <button
            type="button"
            aria-label="Rotate divider right"
            onClick={() => {
              rotateViewStep(FOLD_CONSTANTS.rotateStepDeg);
              setAnnouncement(`Rotated divider right 15 degrees.`);
            }}
            className="srf-btn-secondary !px-3.5 text-sm"
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
            className="srf-btn-secondary !px-3.5 text-sm"
          >
            Reset view
          </button>
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="Camera presets">
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

      {/* Reset design & live configuration summary */}
      <section className="pt-5 border-t border-[var(--srf-hairline)] space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              resetDesign();
              setAnnouncement('Design reset to Flax #D8C4A7, Oxblood #4B202A, Bloom at 100 percent.');
            }}
            className="srf-btn-secondary !min-h-[40px] !py-1.5 !px-3.5 text-sm"
          >
            Reset design
          </button>

          {env.enhancedDesktop && mode === 'manual' && (
            <button
              type="button"
              onClick={() => {
                followStory();
                setAnnouncement('Following story opening.');
              }}
              className="srf-btn-secondary !min-h-[40px] !py-1.5 !px-3.5 text-sm"
            >
              Follow the story
            </button>
          )}
        </div>

        <dl
          data-testid="srf-studio-summary"
          className="p-4 rounded-[8px] border border-[var(--srf-hairline)] bg-[var(--srf-surface-soft)] grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm"
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

          <div>
            <dt className="srf-mono-caption text-[var(--srf-mauve)]">Print color</dt>
            <dd className="font-medium text-[var(--srf-oxblood)] flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full border border-[var(--srf-oxblood)]/25 inline-block shrink-0"
                style={{ backgroundColor: design.designHex }}
                aria-hidden="true"
              />
              <span className={!usesActivePrintColor(design) ? 'text-[var(--srf-mauve)]' : undefined}>
                {usesActivePrintColor(design)
                  ? design.designHex
                  : `${design.designHex} (${design.print === 'solid' ? 'saved' : 'original upload'})`}
              </span>
            </dd>
          </div>

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
              <span ref={summarySpanRef}>{formattedSpan}</span>
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

        <div>
          <a
            href="#brief"
            onClick={handleUseInBrief}
            className="srf-btn-primary w-full"
          >
            <span>Use this design in my brief</span>
            <ArrowRight className="w-4 h-4 srf-btn-arrow" aria-hidden="true" />
          </a>
        </div>
      </section>

      <div className="sr-only" aria-live="polite">
        {announcement}
      </div>
    </div>
  );
};
