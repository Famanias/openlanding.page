import type { CSSProperties } from "react";

/**
 * The SUNDIAL mark: a dial disc seen from above, the S-curve shadow that
 * doubles as a coffee bean's crease, and the tangerine pivot where the
 * gnomon stands. `tone` flips the disc/crease for dark grounds.
 */

type MarkProps = {
  size?: number;
  /** "auto" inherits currentColor (for dark grounds use tone="onDark"). */
  disc?: string;
  crease?: string;
  className?: string;
  style?: CSSProperties;
  title?: string;
};

export function Mark({
  size = 32,
  disc = "currentColor",
  crease = "var(--color-crema)",
  className,
  style,
  title = "SUNDIAL",
}: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      style={style}
      role="img"
      aria-label={title}
    >
      <circle cx="32" cy="32" r="31" fill={disc} />
      <path
        d="M32 9 C 23 21 41 43 32 55"
        fill="none"
        stroke={crease}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx="32" cy="32" r="5" fill="var(--color-tangerine)" />
    </svg>
  );
}

type LockupProps = {
  className?: string;
  /** Height of the wordmark row in px. */
  height?: number;
  disc?: string;
  crease?: string;
  wordmark?: string;
  tagline?: string;
};

export function Lockup({
  className,
  height = 30,
  disc = "currentColor",
  crease = "var(--color-crema)",
  wordmark = "currentColor",
  tagline = "currentColor",
}: LockupProps) {
  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: height * 0.38 }}
    >
      <Mark size={height * 1.25} disc={disc} crease={crease} />
      <span style={{ display: "inline-flex", flexDirection: "column", lineHeight: 1 }}>
        <span
          className="sd-display"
          style={{
            color: wordmark,
            fontSize: height * 0.82,
            letterSpacing: "0.01em",
          }}
        >
          SUNDIAL
        </span>
        {/* JSX strips the newline between spans; this space keeps the visible
            text "SUNDIAL COFFEE ROASTERS" inside the link's accessible name.
            Whitespace-only flex items are not rendered, so layout is unchanged. */}
        {" "}
        <span
          className="sd-mono"
          style={{
            color: tagline,
            fontSize: height * 0.24,
            letterSpacing: "0.34em",
            marginTop: height * 0.14,
          }}
        >
          COFFEE ROASTERS
        </span>
      </span>
    </span>
  );
}
