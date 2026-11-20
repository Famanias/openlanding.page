'use client';

export interface TextSafeAreaOverlayProps {
  visible: boolean;
}

/**
 * Optional architectural overlay illustrating the reserved hero text-safe zone
 * on the quiet left-center side of the scenic composition.
 * Toggled strictly via the debug controls dock.
 */
export function TextSafeAreaOverlay({ visible }: TextSafeAreaOverlayProps) {
  if (!visible) return null;

  return (
    <div
      data-testid="text-safe-area-overlay"
      className="pointer-events-none fixed inset-0 z-10 flex items-center"
      aria-label="Text-safe area composition guide"
    >
      <div className="w-full h-full px-6 sm:px-10 lg:px-16 pt-12 pb-28 flex items-center">
        {/* Safe-area frame spanning left-center quiet field (~48% width on desktop) */}
        <div className="relative w-full max-w-xl lg:w-[46%] min-h-[280px] sm:min-h-[340px] border border-dashed border-[#F4EFE6]/45 rounded-md bg-[#16202C]/14 px-6 py-7 sm:px-9 sm:py-10 flex flex-col justify-between">
          {/* Corner architectural registration ticks */}
          <span
            aria-hidden="true"
            className="absolute -top-px -left-px w-3.5 h-3.5 border-t-2 border-l-2 border-[#F4EFE6]/80"
          />
          <span
            aria-hidden="true"
            className="absolute -top-px -right-px w-3.5 h-3.5 border-t-2 border-r-2 border-[#F4EFE6]/80"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-px -left-px w-3.5 h-3.5 border-b-2 border-l-2 border-[#F4EFE6]/80"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-px -right-px w-3.5 h-3.5 border-b-2 border-r-2 border-[#F4EFE6]/80"
          />

          {/* Quiet unboxed top metadata */}
          <div className="flex items-center gap-2 text-xs font-medium tracking-wide text-[#F4EFE6]/75">
            <span>Hero Text-Safe Area</span>
            <span aria-hidden="true">·</span>
            <span>Quiet Left-Center Field</span>
          </div>

          {/* Subtle typographic placement preview demonstrating readability */}
          <div className="my-6 space-y-4">
            <p className="font-display text-3xl sm:text-5xl font-medium leading-[1.08] tracking-tight text-[#F6F2EA]/88 [text-wrap:balance]">
              Calm horizons crafted for focused stories
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-[#E7E2D9]/78 max-w-md">
              Reserved open sky and misty valley space keeps future hero headlines, supporting copy,
              and primary actions effortless to read.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <span className="inline-flex items-center px-5 py-2.5 rounded-md border border-[#F4EFE6]/55 bg-[#F4EFE6]/12 text-xs sm:text-sm font-medium text-[#F6F2EA]">
                Primary CTA Slot
              </span>
              <span className="text-xs sm:text-sm text-[#E7E2D9]/70 underline underline-offset-4">
                Secondary Link Slot
              </span>
            </div>
          </div>

          {/* Quiet unboxed footer guideline note */}
          <div className="flex items-center justify-between text-[11px] text-[#E7E2D9]/60">
            <span>Focal landmarks balanced to right third</span>
            <span className="hidden sm:inline tabular-nums">Safe margin: 6% – 52% X</span>
          </div>
        </div>
      </div>
    </div>
  );
}
