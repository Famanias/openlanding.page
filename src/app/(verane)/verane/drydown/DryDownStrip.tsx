import { calculateTierLevels, type Note } from "./evaporation";

interface DryDownStripProps {
  notes: Note[];
  hour: number;
  className?: string;
  showLabels?: boolean;
}

export function DryDownStrip({
  notes,
  hour,
  className = "",
  showLabels = true,
}: DryDownStripProps) {
  const levels = calculateTierLevels(notes, hour);

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {showLabels && (
        <div className="flex justify-between vr-mono text-[10px] text-inherit opacity-90 font-medium">
          <span>Top ({Math.round(levels.top * 100)}%)</span>
          <span>Heart ({Math.round(levels.heart * 100)}%)</span>
          <span>Base ({Math.round(levels.base * 100)}%)</span>
        </div>
      )}

      {/* 3-segment bar */}
      <div className="h-2 w-full flex gap-1 bg-[color-mix(in_srgb,var(--color-ash)_25%,transparent)] p-0.5 border border-[color-mix(in_srgb,var(--color-ash)_35%,transparent)] rounded-full overflow-hidden">
        {/* Top segment */}
        <div
          className="h-full transition-all duration-200 rounded-sm"
          style={{
            flex: 1,
            backgroundColor: "var(--color-orris)",
            opacity: Math.max(0.15, levels.top),
          }}
        />
        {/* Heart segment */}
        <div
          className="h-full transition-all duration-200 rounded-sm"
          style={{
            flex: 1.2,
            backgroundColor: "var(--color-orris)",
            opacity: Math.max(0.15, levels.heart),
          }}
        />
        {/* Base segment */}
        <div
          className="h-full transition-all duration-200 rounded-sm"
          style={{
            flex: 1.4,
            backgroundColor: "var(--color-orris)",
            opacity: Math.max(0.15, levels.base),
          }}
        />
      </div>
    </div>
  );
}
