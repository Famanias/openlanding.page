import type { SVGProps } from "react";

interface LogoMarkProps extends SVGProps<SVGSVGElement> {
  size?: number;
  topLevel?: number; // 0 to 1
  heartLevel?: number; // 0 to 1
  baseLevel?: number; // 0 to 1
}

/**
 * Maison Vérane Mark: A stylized perfume drop divided into the three evaporation tiers:
 * Top (evaporates early), Heart (mid layer), and Base (resins/woods that hold to skin).
 * When levels are passed (0..1), the liquid bands scale/drain with the shared dry-down clock.
 */
export function LogoMark({
  size = 32,
  topLevel = 0,
  heartLevel = 0.55,
  baseLevel = 1,
  className,
  ...props
}: LogoMarkProps) {
  // Height allocation in the 64x64 viewBox:
  // Top band: y=20..33 (h=13)
  // Heart band: y=33..45 (h=12)
  // Base band: y=45..60 (h=15)
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label="Maison Vérane drop mark"
      className={className}
      {...props}
    >
      <defs>
        <clipPath id="vr-drop-clip">
          <path d="M32 5C26 14 13 28 13 40a19 19 0 0 0 38 0C51 28 38 14 32 5Z" />
        </clipPath>
      </defs>

      {/* Internal liquid layers, clipped inside the flacon drop */}
      <g clipPath="url(#vr-drop-clip)">
        {/* Top band */}
        {topLevel > 0 && (
          <rect
            x="0"
            y={33 - 13 * topLevel}
            width="64"
            height={13 * topLevel}
            fill="currentColor"
            opacity={0.2}
          />
        )}
        {/* Heart band */}
        {heartLevel > 0 && (
          <rect
            x="0"
            y={45 - 12 * heartLevel}
            width="64"
            height={12 * heartLevel}
            fill="currentColor"
            opacity={0.45}
          />
        )}
        {/* Base band */}
        {baseLevel > 0 && (
          <rect
            x="0"
            y={60 - 15 * baseLevel}
            width="64"
            height={15 * baseLevel}
            fill="currentColor"
            opacity={0.9}
          />
        )}
      </g>

      {/* Flacon outline */}
      <path
        d="M32 5C26 14 13 28 13 40a19 19 0 0 0 38 0C51 28 38 14 32 5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={size <= 24 ? "5" : "3.5"}
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface LogoProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  topLevel?: number;
  heartLevel?: number;
  baseLevel?: number;
}

/** Full typographic lockup: Mark + MAISON VÉRANE */
export function Logo({
  width = 240,
  height = 56,
  topLevel,
  heartLevel,
  baseLevel,
  className,
  ...props
}: LogoProps) {
  return (
    <svg
      viewBox="0 0 380 96"
      width={width}
      height={height}
      role="img"
      aria-label="Maison Vérane"
      className={className}
      {...props}
    >
      <g transform="translate(0, 14)">
        <LogoMark
          size={68}
          topLevel={topLevel}
          heartLevel={heartLevel}
          baseLevel={baseLevel}
          aria-hidden="true"
        />
      </g>
      <text
        x="96"
        y="32"
        fill="currentColor"
        fontFamily="var(--font-spline-mono), monospace"
        fontSize="11"
        letterSpacing="6"
      >
        MAISON
      </text>
      <text
        x="93"
        y="76"
        fill="currentColor"
        fontFamily="var(--font-bodoni-moda), serif"
        fontSize="44"
        letterSpacing="8"
      >
        VÉRANE
      </text>
    </svg>
  );
}
