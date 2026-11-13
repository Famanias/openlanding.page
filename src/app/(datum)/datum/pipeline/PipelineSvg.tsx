import { useId } from "react";
import { RENDER_PASSES, type PassId } from "./passes";

type PipelineSvgProps = {
  activePassId: PassId;
  enabledPassIds?: readonly PassId[];
  wireframe?: boolean;
  compact?: boolean;
  className?: string;
  label?: string;
  onSelectPass?: (passId: PassId) => void;
};

/**
 * Always server-rendered isometric SVG projection of the 5-pass render pipeline.
 * Serves both as the hero drafting diagram and as the fallback/poster for the 3D stage.
 */
export function PipelineSvg({
  activePassId,
  enabledPassIds,
  wireframe = false,
  compact = false,
  className,
  label = "Isometric five-pass render pipeline diagram",
  onSelectPass,
}: PipelineSvgProps) {
  const enabledSet = enabledPassIds ? new Set(enabledPassIds) : null;
  const gridId = `dt-iso-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <svg
      className={`dt-pipeline-svg ${compact ? "dt-pipeline-svg-compact" : ""} ${className ?? ""}`}
      viewBox="0 0 480 420"
      role="img"
      aria-label={label}
    >
      <defs>
        <pattern id={gridId} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#D3D7CF" strokeWidth="0.7" />
        </pattern>
      </defs>

      {/* Subtle architectural coordinate plane */}
      <rect x="16" y="16" width="448" height="388" rx="6" fill={`url(#${gridId})`} opacity="0.55" />

      {/* Optical Z-axis spine connecting all 5 render slabs */}
      <line x1="240" y1="34" x2="240" y2="386" stroke="#D3D7CF" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="240" cy="34" r="3.5" fill="#007A4D" />
      <circle cx="240" cy="386" r="3.5" fill="#111418" />

      {/* Render slabs back-to-front (01 Geometry at bottom -> 05 Composite at top) */}
      {RENDER_PASSES.map((pass, idx) => {
        const isActive = pass.id === activePassId;
        const isEnabled = !enabledSet || enabledSet.has(pass.id);
        // Bottom (01) = y 306, Top (05) = y 82
        const baseY = 306 - idx * 54;
        const activeLift = isActive ? -6 : 0;
        const fill =
          pass.id === "bloom" || pass.id === "composite"
            ? isActive
              ? "#111418"
              : "#FFFFFF"
            : isActive
              ? "#FFFFFF"
              : "#F3F4F0";
        const stroke = isActive
          ? pass.accentRole === "amber"
            ? "#B35000"
            : pass.id === "bloom" || pass.id === "composite"
              ? "#10D98E"
              : "#007A4D"
          : "#111418";
        const strokeOpacity = isEnabled ? (isActive ? 1 : 0.42) : 0.18;
        const textFill =
          isActive && (pass.id === "bloom" || pass.id === "composite")
            ? "#F3F4F0"
            : "#111418";

        return (
          <g
            key={pass.id}
            className="dt-svg-slab"
            data-pass={pass.id}
            data-active={isActive}
            data-enabled={isEnabled}
            style={{
              transform: `translateY(calc((var(--explode, 1) - 0.5) * ${(2 - idx) * 14}px + ${activeLift}px))`,
              opacity: isEnabled ? 1 : 0.38,
              cursor: onSelectPass ? "pointer" : "default",
            }}
            onClick={onSelectPass ? () => onSelectPass(pass.id) : undefined}
          >
            {/* Isometric slab polygon */}
            <polygon
              points={`240,${baseY - 40} 376,${baseY + 8} 240,${baseY + 56} 104,${baseY + 8}`}
              fill={wireframe ? "none" : fill}
              fillOpacity={wireframe ? 0 : isActive ? 0.96 : 0.88}
              stroke={stroke}
              strokeOpacity={strokeOpacity}
              strokeWidth={isActive ? 2.2 : 1.3}
              strokeLinejoin="round"
            />

            {/* Per-pass geometric signature motif inside each isometric plane */}
            {pass.id === "geometry" ? (
              <g stroke={isActive ? "#007A4D" : "#4A525C"} strokeWidth="1.2" fill="none" opacity="0.85">
                <polygon points={`240,${baseY - 18} 288,${baseY + 8} 240,${baseY + 34} 192,${baseY + 8}`} />
                <line x1="240" y1={baseY - 18} x2="240" y2={baseY + 34} />
                <line x1="192" y1={baseY + 8} x2="288" y2={baseY + 8} />
              </g>
            ) : null}

            {pass.id === "normals" ? (
              <g stroke={isActive ? "#007A4D" : "#4A525C"} strokeWidth="1.2" fill="none">
                <ellipse cx="240" cy={baseY + 8} rx="42" ry="18" />
                <line x1="240" y1={baseY + 8} x2="240" y2={baseY - 14} stroke="#007A4D" strokeWidth="1.8" />
                <circle cx="240" cy={baseY - 14} r="2.5" fill="#007A4D" stroke="none" />
              </g>
            ) : null}

            {pass.id === "shadows" ? (
              <g stroke={isActive ? "#B35000" : "#4A525C"} strokeWidth="1.25" fill="none">
                <polygon points={`240,${baseY - 14} 274,${baseY + 8} 240,${baseY + 30} 206,${baseY + 8}`} />
                <polygon
                  points={`240,${baseY - 4} 256,${baseY + 8} 240,${baseY + 20} 224,${baseY + 8}`}
                  strokeDasharray="3 2"
                />
              </g>
            ) : null}

            {pass.id === "bloom" ? (
              <g stroke={isActive ? "#10D98E" : "#007A4D"} strokeWidth="1.3" fill="none">
                <ellipse cx="240" cy={baseY + 8} rx="52" ry="20" strokeOpacity="0.45" />
                <ellipse cx="240" cy={baseY + 8} rx="32" ry="12" strokeOpacity="0.85" />
                <ellipse cx="240" cy={baseY + 8} rx="14" ry="5.5" fill={isActive ? "#10D98E" : "#007A4D"} fillOpacity="0.25" />
              </g>
            ) : null}

            {pass.id === "composite" ? (
              <g stroke={isActive ? "#10D98E" : "#111418"} strokeWidth="1.4" fill="none">
                <path d={`M214 ${baseY - 4}h-12v10 M266 ${baseY - 4}h12v10 M214 ${baseY + 20}h-12v-10 M266 ${baseY + 20}h12v-10`} />
                <circle cx="240" cy={baseY + 8} r="7" fill={isActive ? "#10D98E" : "#007A4D"} fillOpacity="0.28" />
              </g>
            ) : null}

            {/* Leader tick & compact pass badge */}
            <line
              x1="376"
              y1={baseY + 8}
              x2="396"
              y2={baseY + 8}
              stroke={isActive ? "#007A4D" : "#D3D7CF"}
              strokeWidth={isActive ? "1.8" : "1"}
            />
            <text
              x="402"
              y={baseY + 12}
              fontSize="10.5"
              fontFamily="var(--font-space-mono), monospace"
              fontWeight={isActive ? "700" : "400"}
              fill={isActive ? "#007A4D" : "#4A525C"}
            >
              {pass.code}
            </text>
            <text
              x="36"
              y={baseY + 12}
              fontSize="10.5"
              fontFamily="var(--font-space-mono), monospace"
              fontWeight={isActive ? "700" : "400"}
              fill={isActive ? (textFill === "#F3F4F0" ? "#111418" : textFill) : "#4A525C"}
            >
              {pass.shortName.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
