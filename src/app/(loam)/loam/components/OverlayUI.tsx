import React from 'react';
import {
  CHAPTERS,
  DEFAULT_SUNLIGHT,
  LIFECYCLE_STEPS,
  computeSunlightState,
  type ChapterProgressState,
  type InspectableObjectId,
} from '../logic/chapters';
import type { InspectUIFrameState } from '../scene/inspectController';
import { SampleKitForm } from './SampleKitForm';

interface OverlayUIProps {
  chapterState: ChapterProgressState;
  inspectUI: InspectUIFrameState;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onStepChapter: (direction: 1 | -1) => void;
  onJumpToChapter: (index: number) => void;
  onTriggerKeyboardInspect: (target: InspectableObjectId) => void;
  onExitInspect: () => void;
  sunlight?: number;
  onSunlightChange?: (value: number) => void;
}

/**
 * Helper for masked line-by-line rise animation driven by chapter opacity (0 -> 1).
 */
function MaskedLine({
  opacity,
  delayFactor = 0,
  children,
  className = '',
}: {
  opacity: number;
  delayFactor?: number;
  children: React.ReactNode;
  className?: string;
}) {
  const localT = Math.max(
    0,
    Math.min(1, (opacity - delayFactor) / Math.max(0.01, 1 - delayFactor)),
  );
  const eased = 1 - Math.pow(1 - localT, 3);
  const translateY = (1 - eased) * 105;
  return (
    <span className={`block overflow-hidden pb-1 ${className}`}>
      <span
        className="block will-change-transform"
        style={{
          transform: `translate3d(0, ${translateY.toFixed(1)}%, 0)`,
          opacity: eased,
        }}
      >
        {children}
      </span>
    </span>
  );
}

function LifecycleStepIcon({
  stepId,
  isStudioLight,
}: {
  stepId: (typeof LIFECYCLE_STEPS)[number]['id'];
  isStudioLight: boolean;
}) {
  const strokeColor = isStudioLight ? '#2c251d' : '#f0e8d8';
  const accentColor = isStudioLight ? '#6e8f11' : '#c8e64c';

  if (stepId === 'grown') {
    // Branching mycelium hyphae line icon
    return (
      <svg
        viewBox="0 0 20 20"
        className="h-4 w-4 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10 17.5V9.5M10 12.5L5.5 8M10 10.5L14.8 6.2M5.5 8L3.2 4.8M5.5 8L7.8 4.5M14.8 6.2L16.8 3.5M14.8 6.2L12.2 3.6"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="3.2" cy="4.8" r="1.1" fill={accentColor} />
        <circle cx="16.8" cy="3.5" r="1.1" fill={accentColor} />
        <circle cx="10" cy="3.2" r="1.1" fill={accentColor} />
      </svg>
    );
  }

  if (stepId === 'protects') {
    // Moulded protective packaging tray cross-section with recessed cavity
    return (
      <svg
        viewBox="0 0 20 20"
        className="h-4 w-4 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M2.2 8.5H5.2L6.4 13.2H13.6L14.8 8.5H17.8V14.8C17.8 15.9 16.9 16.8 15.8 16.8H4.2C3.1 16.8 2.2 15.9 2.2 14.8V8.5Z"
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.2 6.2H13.8"
          stroke={accentColor}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // 'composts' — speck of rich soil + tiny two-leaf sprout hinting at Chapter 06
  return (
    <svg
      viewBox="0 0 20 20"
      className="h-4 w-4 shrink-0"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 15.8C5.8 14.6 8.2 14.3 10 14.3C11.8 14.3 14.2 14.6 16.5 15.8"
        stroke={strokeColor}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="6.2" cy="16.8" r="0.75" fill={strokeColor} />
      <circle cx="10.0" cy="17.2" r="0.85" fill={strokeColor} />
      <circle cx="13.8" cy="16.7" r="0.75" fill={strokeColor} />
      <path
        d="M10 14.3V7.2"
        stroke={accentColor}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M10 9.6C7.2 9.6 5.6 7.8 5.8 5.5C8.1 5.3 10 6.8 10 9.6Z"
        stroke={accentColor}
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
      <path
        d="M10 8.2C12.6 8.2 14.2 6.5 14.0 4.3C11.8 4.1 10 5.6 10 8.2Z"
        stroke={accentColor}
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const OverlayUI: React.FC<OverlayUIProps> = ({
  chapterState,
  inspectUI,
  soundEnabled,
  onToggleSound,
  onTriggerKeyboardInspect,
  onExitInspect,
  sunlight = DEFAULT_SUNLIGHT,
  onSunlightChange,
}) => {
  const {
    activeChapter,
    activeChapterIndex,
    isChapter4aClump,
    isChapter4bWide,
    chapterOpacities,
    undergroundFactor,
    studioLightness = 0,
    lifecycleStripReveal = 0,
    lifecycleStepReveals = [0, 0, 0],
  } = chapterState;
  const isInspecting = inspectUI.phase === 'inspecting';
  const isHolding = inspectUI.phase === 'holding';
  const sunState = computeSunlightState(sunlight);
  const isStudioLight = studioLightness > 0.45;
  // Tray callouts wait for the studio light, so they never float over dark soil before the tray resolves
  const trayCalloutReveal = Math.max(0, Math.min(1, (studioLightness - 0.6) / 0.3));
  const shadowClass = isStudioLight ? '' : 'scene-copy-shadow';

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 flex flex-col justify-between p-6 sm:p-11"
      data-active-chapter={activeChapter.numberLabel}
      data-sub-rest={isChapter4aClump ? '4a' : isChapter4bWide ? '4b' : ''}
      data-inspect-phase={inspectUI.phase}
      data-studio-light={isStudioLight ? 'light' : 'dark'}
    >
      {/* Synchronized 2D upper-canopy sky ambient glow + dark readability scrims (fades out cleanly in the bright Ch 05 studio) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 transition-opacity duration-200"
        style={{
          background:
            'radial-gradient(ellipse 72% 48% at 50% 0%, var(--sky-ambient, rgba(247, 231, 206, 0.14)) 0%, rgba(8, 6, 4, 0) 70%), radial-gradient(ellipse 52% 48% at 22% 52%, rgba(7, 5, 4, 0.56) 0%, rgba(7, 5, 4, 0.18) 58%, rgba(7, 5, 4, 0) 100%), linear-gradient(180deg, rgba(7, 5, 4, 0.38) 0%, rgba(7, 5, 4, 0) 18%, rgba(7, 5, 4, 0) 80%, rgba(7, 5, 4, 0.55) 100%)',
          opacity: (1 - undergroundFactor * 0.25) * (1 - studioLightness),
        }}
      />

      {/* Top Bar: Small "LOAM" wordmark top-left, Sunlight / Time-of-Day slider center-right, Sound toggle top-right */}
      <header className="flex items-center justify-between gap-4 sm:gap-8">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`pointer-events-auto ${shadowClass} font-serif-display text-2xl font-normal tracking-[0.22em] transition-colors duration-200 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8e64c] whitespace-nowrap shrink-0 ${
            isStudioLight
              ? 'text-[#1c1712]'
              : 'text-[var(--text-contrast,#f0e8d8)]'
          }`}
        >
          LOAM
        </a>

        <div className="pointer-events-auto flex items-center gap-5 sm:gap-7">
          {/* Interactive Sunlight / Time-of-Day Slider (0.0 Dusk/Night -> 0.75 Default -> 1.0 Bright Midday Sun) */}
          <div
            className={`${shadowClass} flex items-center gap-2.5 border-b pb-1 transition-colors duration-200 ${
              isStudioLight ? 'border-[#1c1712]/25' : 'border-[#f0e8d8]/25'
            }`}
            title="Adjust forest canopy sunlight & time of day"
          >
            {/* Left extremity: Dusk/Moon SVG icon */}
            <button
              type="button"
              onClick={() => onSunlightChange?.(0.0)}
              aria-label="Set lighting to dusk (0.0)"
              className={`transition-colors focus-visible:outline-1 focus-visible:outline-[#c8e64c] ${
                isStudioLight
                  ? 'text-[#8a5229] hover:text-[#5c3314]'
                  : 'text-[#ff9b54]/80 hover:text-[#ff9b54]'
              }`}
            >
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M13.2 10.1A5.5 5.5 0 0 1 5.9 2.8a5.5 5.5 0 1 0 7.3 7.3z" />
              </svg>
            </button>

            <input
              id="loam-sunlight-slider"
              data-testid="sunlight-slider"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={sunlight}
              onChange={(e) => onSunlightChange?.(parseFloat(e.target.value))}
              aria-label="Sunlight and time of day"
              aria-valuemin={0}
              aria-valuemax={1}
              aria-valuenow={Number(sunlight.toFixed(2))}
              aria-valuetext={`${sunState.timeLabel} (${Math.round(sunlight * 100)}% sunlight)`}
              className="loam-sun-slider w-20 sm:w-28 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[#c8e64c]"
            />

            {/* Right extremity: Midday Sun SVG icon */}
            <button
              type="button"
              onClick={() => onSunlightChange?.(1.0)}
              aria-label="Set lighting to bright midday sun (1.0)"
              className={`transition-colors focus-visible:outline-1 focus-visible:outline-[#c8e64c] ${
                isStudioLight
                  ? 'text-[#2c251d]/80 hover:text-[#1c1712]'
                  : 'text-[#f4f8fb]/85 hover:text-[#ffffff]'
              }`}
            >
              <svg
                viewBox="0 0 16 16"
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="8" cy="8" r="3" />
                <path d="M8 1.5v1.8M8 12.7v1.8M1.5 8h1.8M12.7 8h1.8M3.4 3.4l1.3 1.3M11.3 11.3l1.3 1.3M12.6 3.4l-1.3 1.3M4.7 11.3l-1.3 1.3" />
              </svg>
            </button>

            <span
              data-testid="sunlight-time-label"
              className={`hidden min-w-[5.6rem] text-right font-mono-label text-[10px] uppercase tracking-[0.15em] transition-colors duration-200 md:inline-block ${
                isStudioLight
                  ? 'text-[#2c251d]/80'
                  : 'text-[var(--text-contrast,#f0e8d8)]/80'
              }`}
            >
              {sunState.timeLabel}
            </span>
          </div>

          <button
            type="button"
            onClick={onToggleSound}
            aria-pressed={soundEnabled}
            aria-label={
              soundEnabled ? 'Mute ambient sound' : 'Enable ambient sound'
            }
            className={`${shadowClass} flex items-center gap-2 border-b pb-1 font-mono-label text-[11px] uppercase tracking-[0.16em] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8e64c] whitespace-nowrap shrink-0 ${
              isStudioLight
                ? 'border-[#1c1712]/25 text-[#1c1712]/85 hover:border-[#6e8f11] hover:text-[#1c1712]'
                : 'border-[#f0e8d8]/25 text-[var(--text-contrast,#f0e8d8)]/85 hover:border-[#c8e64c] hover:text-[var(--text-contrast,#f0e8d8)]'
            }`}
          >
            {soundEnabled ? (
              <>
                <svg
                  viewBox="0 0 16 16"
                  className={`h-3.5 w-3.5 ${
                    isStudioLight ? 'text-[#6e8f11]' : 'text-[#c8e64c]'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2.5 6.2H5l3.2-2.7v9L5 9.8H2.5z" />
                  <path d="M10.8 5.5a3.5 3.5 0 0 1 0 5" />
                  <path d="M12.8 3.6a6.2 6.2 0 0 1 0 8.8" />
                </svg>
                <span>Sound on</span>
              </>
            ) : (
              <>
                <svg
                  viewBox="0 0 16 16"
                  className={`h-3.5 w-3.5 ${
                    isStudioLight ? 'text-[#1c1712]/55' : 'text-[#f0e8d8]/55'
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2.5 6.2H5l3.2-2.7v9L5 9.8H2.5z" />
                  <path d="M10.5 6l3.5 4" />
                  <path d="M14 6l-3.5 4" />
                </svg>
                <span>Sound off</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Center Stage: Unboxed Chapter Copy, 3D-Pinned Tray Labels, Sample Kit Form & Inspect Pinned Labels */}
      <main className="relative flex flex-1 items-center justify-center">
        {/* Chapter 1: THE FRUIT */}
        {chapterOpacities[0] > 0.01 && !isInspecting && (
          <div className="pointer-events-none absolute left-0 max-w-lg scene-copy-shadow">
            <MaskedLine opacity={chapterOpacities[0]} delayFactor={0}>
              <p className="font-mono-label text-[11px] uppercase tracking-[0.2em] text-[#c8e64c]/90">
                Grown, not made.
              </p>
            </MaskedLine>
            <MaskedLine
              opacity={chapterOpacities[0]}
              delayFactor={0.08}
              className="mt-2"
            >
              <h1 className="font-serif-display text-6xl font-normal tracking-tight text-[#f0e8d8] sm:text-8xl">
                LOAM
              </h1>
            </MaskedLine>
            <MaskedLine
              opacity={chapterOpacities[0]}
              delayFactor={0.16}
              className="mt-3"
            >
              <p className="font-sans-body text-base font-normal leading-relaxed text-[#f0e8d8]/85 sm:text-lg">
                What you see is the smallest part.
              </p>
            </MaskedLine>
            <MaskedLine
              opacity={chapterOpacities[0]}
              delayFactor={0.24}
              className="mt-2"
            >
              <p className="font-serif-display text-sm italic text-[#f0e8d8]/60">
                Macrolepiota procera &mdash; fruiting body above damp forest humus
              </p>
            </MaskedLine>
          </div>
        )}

        {/* Chapter 2: UNDER THE CAP */}
        {chapterOpacities[1] > 0.01 && !isInspecting && (
          <div className="pointer-events-none absolute left-0 max-w-xl scene-copy-shadow">
            <MaskedLine opacity={chapterOpacities[1]} delayFactor={0}>
              <p className="font-serif-display text-4xl font-normal leading-[1.12] text-[#f0e8d8] sm:text-5xl">
                A mushroom is only the fruit.
              </p>
            </MaskedLine>
            <MaskedLine
              opacity={chapterOpacities[1]}
              delayFactor={0.12}
              className="mt-3"
            >
              <p className="font-sans-body text-sm font-normal tracking-wide text-[#f0e8d8]/80 sm:text-base">
                The organism lives underground.
              </p>
            </MaskedLine>
          </div>
        )}

        {/* Chapter 3: BREAKING GROUND */}
        {chapterOpacities[2] > 0.01 && !isInspecting && (
          <div className="pointer-events-none absolute left-0 max-w-lg scene-copy-shadow">
            <MaskedLine opacity={chapterOpacities[2]} delayFactor={0}>
              <p className="font-serif-display text-4xl italic font-normal leading-[1.15] text-[#f0e8d8] sm:text-5xl">
                Leaf litter. Moss. Tangled roots. Dark earth.
              </p>
            </MaskedLine>
            <MaskedLine
              opacity={chapterOpacities[2]}
              delayFactor={0.14}
              className="mt-3"
            >
              <p className="font-sans-body text-sm font-normal tracking-wide text-[#f0e8d8]/72 sm:text-base">
                Descending through the forest floor into the living substrate.
              </p>
            </MaskedLine>
          </div>
        )}

        {/* Chapter 4: THE NETWORK (4a close clump -> 4b wide network) */}
        {chapterOpacities[3] > 0.01 && !isInspecting && (
          <div className="pointer-events-none absolute left-0 top-1/4 max-w-xl scene-copy-shadow">
            <MaskedLine opacity={chapterOpacities[3]} delayFactor={0}>
              <p className="font-serif-display text-4xl font-normal leading-[1.12] text-[#f0e8d8] sm:text-5xl">
                Miles of living thread under every step.
              </p>
            </MaskedLine>
            <MaskedLine
              opacity={chapterOpacities[3]}
              delayFactor={0.12}
              className="mt-3"
            >
              <p className="font-sans-body text-sm font-normal text-[#f0e8d8]/80 sm:text-base">
                {isChapter4aClump
                  ? 'Where the stem meets the soil, dense rhizomorph cords bind bark and humus.'
                  : 'Move pointer to wake threads · Click any filament to send a bioluminescent pulse.'}
              </p>
            </MaskedLine>
          </div>
        )}

        {/* Chapter 5: THE MATERIAL — studio reveal, dark-ink typography, 3D-pinned leader lines, and 3-step lifecycle strip */}
        {chapterOpacities[4] > 0.01 && !isInspecting && (
          <div
            style={{ opacity: chapterOpacities[4] }}
            className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-150"
          >
            {/* Left-aligned Chapter 5 headline + subline */}
            <div
              className={`pointer-events-none absolute left-6 top-20 max-w-md sm:left-11 sm:top-24 ${shadowClass}`}
            >
              <MaskedLine opacity={chapterOpacities[4]} delayFactor={0}>
                <p
                  className={`font-serif-display text-4xl font-normal leading-[1.12] transition-colors duration-200 sm:text-5xl ${
                    isStudioLight ? 'text-[#1c1712]' : 'text-[#f0e8d8]'
                  }`}
                >
                  Compressed into form.
                </p>
              </MaskedLine>
              <MaskedLine
                opacity={chapterOpacities[4]}
                delayFactor={0.12}
                className="mt-2.5"
              >
                <p
                  className={`font-sans-body text-sm font-normal transition-colors duration-200 sm:text-base ${
                    isStudioLight ? 'text-[#42382c]' : 'text-[#f0e8d8]/78'
                  }`}
                >
                  Living hyphae bind agricultural hemp hurd into rigid protective packaging.
                </p>
              </MaskedLine>
            </div>

            {/* SVG leader lines pinned directly to 3D coordinates on the tray, once the lit tray exists */}
            {trayCalloutReveal > 0.01 && (
            <div className="pointer-events-none absolute inset-0" style={{ opacity: trayCalloutReveal }}>
            <svg className="h-full w-full" aria-hidden="true">
              {inspectUI.trayCallouts.map((pin) =>
                pin.visible ? (
                  <g key={pin.id}>
                    <line
                      x1={pin.anchorX}
                      y1={pin.anchorY}
                      x2={pin.screenX}
                      y2={pin.screenY + 12}
                      stroke={isStudioLight ? '#2c251d' : '#f0e8d8'}
                      strokeWidth="0.95"
                      strokeOpacity={isStudioLight ? '0.45' : '0.52'}
                    />
                    <circle
                      cx={pin.anchorX}
                      cy={pin.anchorY}
                      r="3.0"
                      fill={isStudioLight ? '#84ab14' : '#c8e64c'}
                    />
                  </g>
                ) : null,
              )}
            </svg>

            {inspectUI.trayCallouts.map((pin) =>
              pin.visible ? (
                <div
                  key={pin.id}
                  style={{
                    transform: `translate3d(${Math.round(pin.screenX)}px, ${Math.round(pin.screenY)}px, 0) translate(-50%, -50%)`,
                  }}
                  className={`${shadowClass} absolute left-0 top-0 border-b pb-1 font-mono-label text-xs uppercase tracking-[0.14em] transition-colors duration-200 whitespace-nowrap ${
                    isStudioLight
                      ? 'border-[#1c1712]/30 text-[#1c1712]'
                      : 'border-[#c8e64c]/60 text-[#f0e8d8]'
                  }`}
                >
                  {pin.label}
                </div>
              ) : null,
            )}
            </div>
            )}

            {/* Quiet typographic Lifecycle Strip near the bottom of the frame */}
            {lifecycleStripReveal > 0.01 && (
              <div
                data-testid="lifecycle-strip"
                style={{ opacity: lifecycleStripReveal }}
                className={`pointer-events-none fixed bottom-16 left-1/2 -translate-x-1/2 z-10 hidden sm:flex items-center gap-4 md:gap-6 border-t pt-2.5 ${shadowClass} ${
                  isStudioLight ? 'border-[#1c1712]/15' : 'border-[#f0e8d8]/20'
                }`}
              >
                {LIFECYCLE_STEPS.map((step, idx) => {
                  const stepReveal = lifecycleStepReveals[idx] ?? lifecycleStripReveal;
                  const translateY = (1 - stepReveal) * 8;
                  return (
                    <React.Fragment key={step.id}>
                      <div
                        data-testid={`lifecycle-step-${step.id}`}
                        style={{
                          opacity: stepReveal,
                          transform: `translate3d(0, ${translateY.toFixed(1)}px, 0)`,
                        }}
                        className="flex items-center gap-2 whitespace-nowrap"
                      >
                        <LifecycleStepIcon
                          stepId={step.id}
                          isStudioLight={isStudioLight}
                        />
                        <span
                          className={`font-mono-label text-[11px] uppercase tracking-[0.14em] ${
                            isStudioLight ? 'text-[#1c1712]' : 'text-[#f0e8d8]'
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>
                      {idx < LIFECYCLE_STEPS.length - 1 && (
                        <span
                          aria-hidden="true"
                          style={{ opacity: stepReveal * 0.65 }}
                          className={`font-mono-label text-xs ${
                            isStudioLight ? 'text-[#4a4035]' : 'text-[#f0e8d8]/60'
                          }`}
                        >
                          &rarr;
                        </span>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Chapter 6: RETURN + Request a sample kit form */}
        {chapterOpacities[5] > 0.05 && !isInspecting && (
          <div
            style={{ opacity: chapterOpacities[5] }}
            className="pointer-events-auto ml-auto mr-0 flex w-full max-w-md flex-col items-end justify-center transition-opacity duration-150"
          >
            <SampleKitForm />
          </div>
        )}

        {/* Hold-to-Inspect 3D Pinned Part Labels & SVG Leader Lines */}
        {isInspecting && (
          <div
            className="pointer-events-none fixed inset-0 z-20"
            aria-live="polite"
          >
            <svg className="h-full w-full" aria-hidden="true">
              {inspectUI.pins.map((pin) =>
                pin.visible ? (
                  <g key={pin.id}>
                    <line
                      x1={pin.anchorX}
                      y1={pin.anchorY}
                      x2={pin.screenX}
                      y2={pin.screenY}
                      stroke={isStudioLight ? '#2c251d' : '#c8e64c'}
                      strokeWidth="0.95"
                      strokeOpacity={isStudioLight ? '0.52' : '0.7'}
                    />
                    <circle
                      cx={pin.anchorX}
                      cy={pin.anchorY}
                      r="2.8"
                      fill={isStudioLight ? '#84ab14' : '#c8e64c'}
                    />
                  </g>
                ) : null,
              )}
            </svg>

            {inspectUI.pins.map((pin) =>
              pin.visible ? (
                <div
                  key={pin.id}
                  style={{
                    transform: `translate3d(${Math.round(pin.screenX)}px, ${Math.round(pin.screenY)}px, 0) translate(-50%, -50%)`,
                  }}
                  className={`${shadowClass} absolute left-0 top-0 border-b pb-0.5 font-serif-display text-sm italic tracking-wide whitespace-nowrap ${
                    isStudioLight
                      ? 'border-[#1c1712]/35 text-[#1c1712]'
                      : 'border-[#c8e64c]/65 text-[#f0e8d8]'
                  }`}
                >
                  {pin.label}
                </div>
              ) : null,
            )}

            {/* Active Inspect Helper Banner */}
            <div
              className={`pointer-events-auto ${shadowClass} fixed top-20 left-1/2 -translate-x-1/2 flex items-center gap-5 border-b pb-1.5 font-mono-label text-[11px] uppercase tracking-[0.14em] ${
                isStudioLight
                  ? 'border-[#1c1712]/30 text-[#1c1712]'
                  : 'border-[#c8e64c]/45 text-[#f0e8d8]'
              }`}
            >
              <span>Drag or use Arrow keys to rotate specimen</span>
              <button
                type="button"
                onClick={onExitInspect}
                className={`underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-[#c8e64c] whitespace-nowrap shrink-0 ${
                  isStudioLight
                    ? 'text-[#5b7809] hover:text-[#3b4f04]'
                    : 'text-[#c8e64c] hover:text-[#e4f882]'
                }`}
              >
                Release (Esc)
              </button>
            </div>
          </div>
        )}

        {/* ~350ms Pointer Hold Progress Ring */}
        {isHolding && (
          <div
            style={{
              transform: `translate3d(${inspectUI.pointerX}px, ${inspectUI.pointerY}px, 0) translate(-50%, -50%)`,
            }}
            className="pointer-events-none fixed left-0 top-0 z-30 h-14 w-14"
            aria-hidden="true"
          >
            <svg viewBox="0 0 56 56" className="h-full w-full -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="22"
                fill="none"
                stroke={
                  isStudioLight
                    ? 'rgba(28, 23, 18, 0.18)'
                    : 'rgba(240, 232, 216, 0.2)'
                }
                strokeWidth="2"
              />
              <circle
                cx="28"
                cy="28"
                r="22"
                fill="none"
                stroke={isStudioLight ? '#84ab14' : '#c8e64c'}
                strokeWidth="2"
                strokeDasharray={2 * Math.PI * 22}
                strokeDashoffset={
                  2 * Math.PI * 22 * (1 - inspectUI.holdProgress)
                }
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
      </main>

      {/* Bottom Bar: Chapter Marker bottom-left + Focusable Inspect Button & Hint bottom-right */}
      <footer className="flex items-end justify-between gap-6">
        {/* Bottom-left Chapter Marker ("01 — The fruit") in Sono monospace small-caps tracking */}
        <div className={`${shadowClass} flex flex-col gap-1`}>
          <div
            aria-live="polite"
            data-testid="chapter-marker"
            className={`font-mono-label text-xs uppercase tracking-[0.2em] transition-colors duration-200 sm:text-sm whitespace-nowrap ${
              isStudioLight ? 'text-[#1c1712]' : 'text-[#f0e8d8]'
            }`}
          >
            {activeChapter.markerLabel}
          </div>
          <div
            className={`font-sans-body text-xs transition-colors duration-200 ${
              isStudioLight ? 'text-[#4a4035]/80' : 'text-[#f0e8d8]/55'
            }`}
          >
            Scroll or press &darr; / Space ({activeChapterIndex + 1} of{' '}
            {CHAPTERS.length})
          </div>
        </div>

        {/* Hold-to-Inspect Hint & Accessible Keyboard Button — only shown when activeChapter.inspectableObject is non-null (Ch 1, Ch 4a only, Ch 5) */}
        {activeChapter.inspectableObject && (
          <div
            className={`pointer-events-auto ${shadowClass} flex items-center gap-4`}
          >
            {!inspectUI.hasUsedInspect && !isInspecting && (
              <span
                className={`font-serif-display text-sm italic transition-colors duration-200 ${
                  isStudioLight ? 'text-[#4a4035]' : 'text-[#f0e8d8]/75'
                }`}
              >
                Hold on specimen to inspect
              </span>
            )}
            <button
              type="button"
              onClick={() =>
                onTriggerKeyboardInspect(activeChapter.inspectableObject!)
              }
              aria-expanded={isInspecting}
              className={`border-b pb-1 font-mono-label text-xs uppercase tracking-[0.16em] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c8e64c] ${
                isInspecting
                  ? isStudioLight
                    ? 'border-[#6e8f11] text-[#5b7809]'
                    : 'border-[#c8e64c] text-[#c8e64c]'
                  : isStudioLight
                    ? 'border-[#1c1712]/35 text-[#1c1712] hover:border-[#6e8f11] hover:text-[#5b7809]'
                    : 'border-[#f0e8d8]/40 text-[#f0e8d8] hover:border-[#c8e64c] hover:text-[#c8e64c]'
              }`}
            >
              {isInspecting
                ? 'Exit inspect (Esc)'
                : activeChapter.inspectButtonLabel || 'Inspect'}
            </button>
          </div>
        )}
      </footer>
    </div>
  );
};

