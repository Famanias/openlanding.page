'use client';

import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, SlidersHorizontal, Upload } from 'lucide-react';
import { renderTextileToCanvas } from './artwork';
import {
  evaluatePrintContrast,
  suggestContrastingPrintColor,
} from './color';
import {
  BUILTIN_PRINT_ORDER,
  COLOR_PRESETS,
  PRINT_SPECS,
  PrintId,
} from './config';
import { deriveFold, deriveFoldChain, formatMeters } from './geometry';
import { useFold } from './FoldProvider';
import { NativeColorInput } from './NativeColorInput';
import { usesActivePrintColor } from './state';

export type AdvancedDrawerSection = 'all' | 'color' | 'printColor' | 'design' | 'view';

interface HeroStudioDockProps {
  onOpenAdvanced: (section: AdvancedDrawerSection) => void;
  shapeInputRef?: React.RefObject<HTMLInputElement | null>;
}

const CURATED_DOCK_SWATCH_IDS = [
  'flax',
  'clay',
  'sage',
  'oxblood',
  'porcelain',
  'charcoal',
] as const;

const CURATED_PRINT_SWATCH_IDS = [
  'oxblood',
  'porcelain',
  'clay',
  'flax',
  'charcoal',
] as const;

const MiniPrintThumb: React.FC<{
  printId: PrintId;
  baseHex: string;
  designHex: string;
  tintUpload?: boolean;
  uploadedBitmap?: ImageBitmap | null;
}> = ({ printId, baseHex, designHex, tintUpload, uploadedBitmap }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      renderTextileToCanvas(
        canvas,
        {
          baseHex,
          designHex,
          print: printId,
          motifScale: 100,
          tintUpload,
        },
        uploadedBitmap ?? null,
      );
    });
    return () => cancelAnimationFrame(id);
  }, [printId, baseHex, designHex, tintUpload, uploadedBitmap]);

  return (
    <canvas
      ref={canvasRef}
      width={68}
      height={38}
      aria-hidden="true"
      className="w-[34px] h-[20px] rounded-[3px] border border-[var(--srf-oxblood)]/20 block shrink-0"
    />
  );
};

export const HeroStudioDock: React.FC<HeroStudioDockProps> = ({
  onOpenAdvanced,
  shapeInputRef,
}) => {
  const {
    mode,
    design,
    view,
    effectiveOpening,
    effectivePose,
    isCustomized,
    uploadedArt,
    setOpening,
    setBaseHex,
    setDesignHex,
    setPrint,
    resetDesign,
    resetShape,
    subscribeStoryFrame,
    subscribeChainFrame,
    getLiveChainFrame,
  } = useFold();

  const localRangeRef = useRef<HTMLInputElement>(null);
  const rangeRef = shapeInputRef ?? localRangeRef;
  const percentRef = useRef<HTMLSpanElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [announcement, setAnnouncement] = useState('');

  // Keep dock shape slider and outer-span readout synchronized across manual edits,
  // scroll story, and coupled hinge choreography without 60Hz React re-renders.
  useEffect(() => {
    const applyDisplay = (pct: number, spanMeters: number) => {
      const rounded = Math.round(pct);
      const formattedSpan = formatMeters(spanMeters);
      if (rangeRef.current) {
        rangeRef.current.value = String(rounded);
      }
      if (percentRef.current) {
        percentRef.current.textContent = `${rounded}%`;
      }
      if (spanRef.current) {
        spanRef.current.textContent = formattedSpan;
      }
    };

    const activeChain = getLiveChainFrame();
    if (activeChain) {
      const chainPose = deriveFoldChain(activeChain.panelOpenings);
      applyDisplay(activeChain.averageOpening, chainPose.metrics.outerSpan);
    } else {
      const pose = deriveFold(effectiveOpening);
      applyDisplay(effectiveOpening, pose.metrics.outerSpan);
    }

    const unsubChain = subscribeChainFrame((frame) => {
      if (frame) {
        const pose = deriveFoldChain(frame.panelOpenings);
        applyDisplay(frame.averageOpening, pose.metrics.outerSpan);
      } else {
        const pose = deriveFold(effectiveOpening);
        applyDisplay(effectiveOpening, pose.metrics.outerSpan);
      }
    });

    const unsubStory =
      mode === 'story'
        ? subscribeStoryFrame((nextOpening) => {
            if (!getLiveChainFrame()) {
              const pose = deriveFold(nextOpening);
              applyDisplay(nextOpening, pose.metrics.outerSpan);
            }
          })
        : undefined;

    return () => {
      unsubChain();
      unsubStory?.();
    };
  }, [
    effectiveOpening,
    mode,
    rangeRef,
    subscribeChainFrame,
    subscribeStoryFrame,
    getLiveChainFrame,
  ]);

  const curatedSwatches = CURATED_DOCK_SWATCH_IDS.map((id) =>
    COLOR_PRESETS.find((c) => c.id === id),
  ).filter((c): c is NonNullable<typeof c> => Boolean(c));

  const curatedPrintSwatches = CURATED_PRINT_SWATCH_IDS.map((id) =>
    COLOR_PRESETS.find((c) => c.id === id),
  ).filter((c): c is NonNullable<typeof c> => Boolean(c));

  const printColorActive = usesActivePrintColor(design);
  const contrast = evaluatePrintContrast(design.baseHex, design.designHex);

  const roundedOpening = Math.round(effectiveOpening);
  const formattedSpan = formatMeters(effectivePose.metrics.outerSpan);

  return (
    <div
      data-testid="hero-studio-dock"
      className="srf-hero-dock rounded-[10px] border border-[var(--srf-hairline-strong)] bg-[#FAF2EE]/95 shadow-[0_14px_38px_-16px_rgba(75,32,42,0.16)] px-3.5 py-3 sm:px-5 sm:py-3.5"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[minmax(150px,0.92fr)_minmax(195px,1.15fr)_minmax(240px,1.45fr)_minmax(205px,1.22fr)_minmax(160px,0.92fr)] gap-y-3 gap-x-3.5 items-center">
        {/* 1. Shape */}
        <div className="min-w-0">
          <div className="flex items-baseline justify-between gap-2 mb-0.5">
            <label
              htmlFor="srf-hero-shape-range"
              className="srf-mono-caption uppercase tracking-[0.06em] text-[var(--srf-oxblood)] font-medium"
            >
              Shape
            </label>
            <div className="srf-mono-caption text-[var(--srf-oxblood)]">
              <span ref={percentRef}>{roundedOpening}%</span>
              <span className="mx-1 text-[var(--srf-mauve)]" aria-hidden="true">
                ·
              </span>
              <span ref={spanRef} className="font-medium">
                {formattedSpan}
              </span>
            </div>
          </div>

          <input
            ref={rangeRef}
            id="srf-hero-shape-range"
            data-testid="hero-shape-range"
            type="range"
            min={0}
            max={100}
            step={1}
            defaultValue={roundedOpening}
            onChange={(e) => setOpening(Number(e.target.value))}
            aria-valuetext={`${roundedOpening} percent open, outer span ${formattedSpan}`}
            className="srf-range !h-8"
          />

          <div className="flex items-center justify-between text-[11px] leading-4 text-[var(--srf-mauve)] -mt-1">
            <span>Gathered</span>
            <span>Open</span>
          </div>
        </div>

        {/* 2. Base color */}
        <div className="min-w-0 xl:border-l xl:border-[var(--srf-hairline)] xl:pl-3.5">
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <span className="srf-mono-caption uppercase tracking-[0.06em] text-[var(--srf-oxblood)] font-medium">
              Base color
            </span>
            <button
              type="button"
              onClick={() => onOpenAdvanced('color')}
              className="srf-mono-caption text-[var(--srf-oxblood)] underline underline-offset-4 hover:text-[var(--srf-clay)] min-h-[28px] px-1"
            >
              Hex / wheel
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Base felt color presets">
            {curatedSwatches.map((preset) => {
              const active = design.baseHex.toUpperCase() === preset.hex.toUpperCase();
              return (
                <button
                  key={preset.id}
                  type="button"
                  aria-label={`Base color ${preset.name} (${preset.hex})`}
                  aria-pressed={active}
                  title={`Base ${preset.name} · ${preset.hex}`}
                  onClick={() => {
                    setBaseHex(preset.hex);
                    setAnnouncement(`Base color set to ${preset.name}.`);
                  }}
                  className={`relative w-6 h-6 shrink-0 rounded-full border transition-transform hover:scale-105 flex items-center justify-center ${
                    active
                      ? 'srf-hero-active-outline'
                      : 'border-[var(--srf-oxblood)]/30 hover:border-[var(--room-ui-outline)]'
                  }`}
                  style={{ backgroundColor: preset.hex }}
                >
                  <span className="sr-only">{preset.name}</span>
                </button>
              );
            })}

            <label
              title={`Custom base color · ${design.baseHex}`}
              className="relative w-6 h-6 shrink-0 rounded-full border border-dashed border-[var(--srf-oxblood)]/55 p-[2px] cursor-pointer hover:scale-105 transition-transform flex items-center justify-center"
            >
              <span
                className="w-full h-full rounded-full block border border-[var(--srf-oxblood)]/20"
                style={{
                  background:
                    'conic-gradient(from 0deg, #9A463D, #C68D47, #A6B3A0, #4D657A, #4B202A, #9A463D)',
                }}
                aria-hidden="true"
              />
              <NativeColorInput
                testId="hero-base-color-picker"
                ariaLabel="Custom base hex color picker"
                value={design.baseHex}
                onHexChange={(hex) => {
                  setBaseHex(hex);
                  setAnnouncement(`Base color set to ${hex}.`);
                }}
                className="sr-only"
              />
            </label>
          </div>
        </div>

        {/* 3. Print */}
        <div className="min-w-0 xl:border-l xl:border-[var(--srf-hairline)] xl:pl-3.5">
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <span className="srf-mono-caption uppercase tracking-[0.06em] text-[var(--srf-oxblood)] font-medium">
              Print
            </span>
            <button
              type="button"
              onClick={() => onOpenAdvanced('design')}
              className="srf-mono-caption inline-flex items-center gap-1 text-[var(--srf-oxblood)] underline underline-offset-4 hover:text-[var(--srf-clay)] min-h-[28px] px-1"
            >
              <Upload className="w-3 h-3" aria-hidden="true" />
              <span>More / Upload</span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1" role="group" aria-label="Textile print presets">
            {BUILTIN_PRINT_ORDER.map((id) => {
              const spec = PRINT_SPECS[id];
              const active = design.print === id;
              return (
                <button
                  key={id}
                  type="button"
                  aria-pressed={active}
                  aria-label={`Print ${spec.name}`}
                  title={spec.name}
                  onClick={() => {
                    setPrint(id);
                    setAnnouncement(`Print changed to ${spec.name}.`);
                  }}
                  className={`inline-flex flex-col items-center gap-0.5 p-1 rounded-[6px] border transition-colors ${
                    active
                      ? 'srf-hero-active-outline bg-[var(--srf-porcelain)]'
                      : 'border-[var(--srf-hairline)] bg-[var(--srf-rose)]/70 hover:border-[var(--room-ui-outline)]/60'
                  }`}
                >
                  <MiniPrintThumb
                    printId={id}
                    baseHex={design.baseHex}
                    designHex={design.designHex}
                  />
                  <span className="text-[10px] leading-[12px] font-medium text-[var(--srf-oxblood)]">
                    {spec.name}
                  </span>
                </button>
              );
            })}

            {uploadedArt && (
              <button
                type="button"
                aria-pressed={design.print === 'upload'}
                aria-label={`Print Your image (${uploadedArt.filename})`}
                onClick={() => {
                  setPrint('upload');
                  setAnnouncement('Print changed to Your image.');
                }}
                className={`inline-flex flex-col items-center gap-0.5 p-1 rounded-[6px] border transition-colors ${
                  design.print === 'upload'
                    ? 'srf-hero-active-outline bg-[var(--srf-porcelain)]'
                    : 'border-[var(--srf-hairline)] bg-[var(--srf-rose)]/70 hover:border-[var(--room-ui-outline)]/60'
                }`}
              >
                {design.tintUpload ? (
                  <MiniPrintThumb
                    printId="upload"
                    baseHex={design.baseHex}
                    designHex={design.designHex}
                    tintUpload
                    uploadedBitmap={uploadedArt.bitmap}
                  />
                ) : (
                  <img
                    src={uploadedArt.previewUrl}
                    alt=""
                    className="w-[34px] h-[20px] object-cover rounded-[3px] border border-[var(--srf-oxblood)]/20 block"
                  />
                )}
                <span className="text-[10px] leading-[12px] font-medium text-[var(--srf-oxblood)]">
                  Yours
                </span>
              </button>
            )}
          </div>
        </div>

        {/* 4. Print color */}
        <div
          className={`min-w-0 xl:border-l xl:border-[var(--srf-hairline)] xl:pl-3.5 transition-opacity ${
            printColorActive ? '' : 'opacity-55'
          }`}
          data-testid="hero-print-color-section"
        >
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <span className="srf-mono-caption uppercase tracking-[0.06em] text-[var(--srf-oxblood)] font-medium">
              Print color
            </span>
            <button
              type="button"
              onClick={() => onOpenAdvanced('printColor')}
              className="srf-mono-caption text-[var(--srf-oxblood)] underline underline-offset-4 hover:text-[var(--srf-clay)] min-h-[28px] px-1"
            >
              Hex / wheel
            </button>
          </div>

          <div
            className="flex flex-wrap items-center gap-1.5"
            role="group"
            aria-label="Print pigment color presets"
          >
            <button
              type="button"
              data-testid="hero-design-color-btn"
              aria-label={`Active print color ${design.designHex}${printColorActive ? '' : ' (saved for patterns)'}`}
              title={`Active print color · ${design.designHex}`}
              onClick={() => onOpenAdvanced('printColor')}
              className="inline-flex items-center gap-1.5 px-1.5 py-0.5 h-6 rounded-full border border-[var(--srf-oxblood)]/35 bg-[var(--srf-porcelain)] text-[10px] font-[family-name:var(--font-mono)] text-[var(--srf-oxblood)] hover:border-[var(--srf-oxblood)] shrink-0"
            >
              <span
                className="w-3.5 h-3.5 rounded-full border border-[var(--srf-oxblood)]/25 block shrink-0"
                style={{ backgroundColor: design.designHex }}
                aria-hidden="true"
              />
              <span>{design.designHex}</span>
            </button>

            {curatedPrintSwatches.map((preset) => {
              const active = design.designHex.toUpperCase() === preset.hex.toUpperCase();
              return (
                <button
                  key={preset.id}
                  type="button"
                  disabled={!printColorActive}
                  aria-label={`Print color ${preset.name} (${preset.hex})`}
                  aria-pressed={printColorActive && active}
                  title={`Print ${preset.name} · ${preset.hex}`}
                  onClick={() => {
                    setDesignHex(preset.hex);
                    setAnnouncement(`Print color set to ${preset.name}.`);
                  }}
                  className={`relative w-6 h-6 shrink-0 rounded-full border transition-transform hover:scale-105 flex items-center justify-center disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    printColorActive && active
                      ? 'srf-hero-active-outline'
                      : 'border-[var(--srf-oxblood)]/30 hover:border-[var(--room-ui-outline)]'
                  }`}
                  style={{ backgroundColor: preset.hex }}
                >
                  <span className="sr-only">{preset.name}</span>
                </button>
              );
            })}

            <label
              title={`Custom print color · ${design.designHex}`}
              className={`relative w-6 h-6 shrink-0 rounded-full border border-dashed border-[var(--srf-oxblood)]/55 p-[2px] flex items-center justify-center ${
                printColorActive ? 'cursor-pointer hover:scale-105 transition-transform' : 'cursor-not-allowed'
              }`}
            >
              <span
                className="w-full h-full rounded-full block border border-[var(--srf-oxblood)]/20"
                style={{
                  background:
                    'conic-gradient(from 0deg, #9A463D, #C68D47, #A6B3A0, #4D657A, #4B202A, #9A463D)',
                }}
                aria-hidden="true"
              />
              <NativeColorInput
                testId="hero-print-color-picker"
                disabled={!printColorActive}
                ariaLabel="Custom print hex color picker"
                value={design.designHex}
                onHexChange={(hex) => {
                  setDesignHex(hex);
                  setAnnouncement(`Print color set to ${hex}.`);
                }}
                className="sr-only"
              />
            </label>
          </div>
        </div>

        {/* 5. Advanced Studio trigger */}
        <div className="min-w-0 xl:border-l xl:border-[var(--srf-hairline)] xl:pl-3.5 flex flex-col justify-center gap-1.5">
          {isCustomized && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  resetDesign();
                  resetShape();
                  setAnnouncement('Divider design and shape reset to defaults.');
                }}
                aria-label="Reset design and shape defaults"
                className="srf-mono-caption inline-flex items-center gap-1 text-[var(--srf-clay)] hover:text-[var(--srf-oxblood)] underline underline-offset-4 min-h-[24px]"
              >
                <RotateCcw className="w-3 h-3" aria-hidden="true" />
                <span>Reset</span>
              </button>
            </div>
          )}

          <button
            type="button"
            data-testid="hero-more-options-btn"
            onClick={() => onOpenAdvanced('all')}
            className="inline-flex items-center justify-between gap-1.5 w-full px-2.5 py-1.5 min-h-[36px] rounded-[6px] border border-[var(--srf-hairline-strong)] bg-[var(--srf-porcelain)]/75 hover:border-[var(--srf-oxblood)] text-xs font-medium text-[var(--srf-oxblood)] transition-colors"
          >
            <span>More options</span>
            <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          </button>
        </div>
      </div>

      {printColorActive && contrast.isLowContrast && (
        <div
          role="status"
          data-testid="hero-contrast-warning"
          className="mt-2.5 pt-2 border-t border-[var(--srf-hairline)] flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--srf-oxblood)]"
        >
          <span>Low print contrast — try a lighter or darker color.</span>
          <button
            type="button"
            data-testid="hero-suggest-contrast-btn"
            onClick={() => {
              const suggested = suggestContrastingPrintColor(design.baseHex, design.designHex);
              setDesignHex(suggested);
              setAnnouncement(`Suggested contrasting print color ${suggested}.`);
            }}
            className="px-2.5 py-1 rounded-[4px] border border-[var(--srf-oxblood)] bg-[var(--srf-oxblood)] text-[var(--srf-porcelain)] font-medium hover:bg-[var(--srf-clay)] hover:border-[var(--srf-clay)] transition-colors shrink-0"
          >
            Suggest contrast
          </button>
        </div>
      )}

      <div className="sr-only" aria-live="polite">
        {announcement}
      </div>
    </div>
  );
};
