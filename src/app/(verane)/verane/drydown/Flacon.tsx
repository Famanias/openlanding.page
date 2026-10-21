import type { TierLevels } from "./evaporation";

interface FlaconProps {
  levels: TierLevels;
  className?: string;
  height?: number | string;
  aspectRatio?: string;
}

/**
 * Architectural perfume flacon showing the three draining liquid levels
 * (Top, Heart, Base) as the dry-down clock advances.
 */
export function Flacon({
  levels,
  className = "",
  height = 360,
}: FlaconProps) {
  // Cap at top, neck, then flacon body with 3 liquid tiers
  return (
    <div
      className={`relative flex flex-col items-center justify-end select-none ${className}`}
      style={{ height }}
      aria-hidden="true"
    >
      {/* Flacon Cap */}
      <div
        style={{
          width: 52,
          height: 38,
          backgroundColor: "var(--color-ash)",
          border: "1px solid color-mix(in srgb, var(--color-calcaire) 30%, transparent)",
          marginBottom: 4,
          borderRadius: "6px 6px 2px 2px",
        }}
      />

      {/* Flacon Neck */}
      <div
        style={{
          width: 28,
          height: 12,
          backgroundColor: "color-mix(in srgb, var(--color-calcaire) 20%, transparent)",
          borderLeft: "1px solid color-mix(in srgb, var(--color-calcaire) 30%, transparent)",
          borderRight: "1px solid color-mix(in srgb, var(--color-calcaire) 30%, transparent)",
          borderRadius: 2,
        }}
      />

      {/* Flacon Body Glass */}
      <div
        className="vr-flacon-glass w-48 sm:w-56 h-64 sm:h-72 flex flex-col justify-end p-2"
        style={{
          boxShadow: "0 24px 48px -12px color-mix(in srgb, var(--color-oud) 80%, transparent)",
        }}
      >
        {/* Optical Glass Highlight Stripe on Left */}
        <div
          className="absolute left-3 top-3 bottom-3 w-1.5 pointer-events-none rounded-full"
          style={{
            backgroundColor: "var(--color-calcaire)",
            opacity: 0.25,
          }}
        />

        {/* Liquid Container */}
        <div className="relative w-full h-full flex flex-col justify-end overflow-hidden border border-[color-mix(in_srgb,var(--color-calcaire)_20%,transparent)] rounded-md">
          {/* Top Liquid Band */}
          <div
            className="vr-flacon-band w-full flex items-center justify-center text-[10px] tracking-widest uppercase font-medium"
            style={{
              height: "28%",
              transform: `scaleY(${levels.top})`,
              backgroundColor: "color-mix(in srgb, var(--color-orris) 35%, transparent)",
              color: "var(--color-calcaire)",
              borderBottom: "1px dashed color-mix(in srgb, var(--color-calcaire) 30%, transparent)",
            }}
          >
            {levels.top > 0.4 && <span>Top</span>}
          </div>

          {/* Heart Liquid Band */}
          <div
            className="vr-flacon-band w-full flex items-center justify-center text-[10px] tracking-widest uppercase font-medium"
            style={{
              height: "36%",
              transform: `scaleY(${levels.heart})`,
              backgroundColor: "color-mix(in srgb, var(--color-orris) 70%, transparent)",
              color: "var(--color-calcaire)",
              borderBottom: "1px dashed color-mix(in srgb, var(--color-calcaire) 30%, transparent)",
            }}
          >
            {levels.heart > 0.35 && <span>Heart</span>}
          </div>

          {/* Base Liquid Band */}
          <div
            className="vr-flacon-band w-full flex items-center justify-center text-[10px] tracking-widest uppercase font-medium"
            style={{
              height: "36%",
              transform: `scaleY(${levels.base})`,
              backgroundColor: "var(--color-orris)",
              color: "var(--color-calcaire)",
            }}
          >
            {levels.base > 0.3 && <span>Base</span>}
          </div>
        </div>
      </div>

      {/* Honed Stone Pedestal / Plinth */}
      <div
        className="w-64 sm:w-80 h-3 mt-1 rounded-sm"
        style={{
          backgroundColor: "color-mix(in srgb, var(--color-ash) 60%, var(--color-oud))",
          borderTop: "1px solid color-mix(in srgb, var(--color-calcaire) 35%, transparent)",
        }}
      />
    </div>
  );
}
