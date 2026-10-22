import type { CSSProperties } from "react";

type MarkProps = {
  size?: number;
  className?: string;
  style?: CSSProperties;
  title?: string;
  accent?: string;
};

export function Mark({
  size = 32,
  className,
  style,
  title = "LOOPHOUSE",
  accent = "#1E51EB",
}: MarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      style={style}
      role="img"
      aria-label={title}
    >
      <rect x="4" y="4" width="56" height="56" rx="6" stroke="currentColor" strokeWidth="5" />
      <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="5" />
      <circle cx="32" cy="32" r="5" fill={accent} />
      <path d="M18 4V0M46 4V0M18 64V60M46 64V60" stroke="#7E8A90" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

type LockupProps = {
  className?: string;
  height?: number;
  accent?: string;
  wordmarkColor?: string;
  taglineColor?: string;
};

export function Lockup({
  className,
  height = 32,
  accent = "#1E51EB",
  wordmarkColor = "currentColor",
  taglineColor = "#7E8A90",
}: LockupProps) {
  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: height * 0.35 }}
    >
      <Mark size={height * 1.15} accent={accent} />
      <span style={{ display: "inline-flex", flexDirection: "column", lineHeight: 1 }}>
        <span
          className="lh-display"
          style={{
            color: wordmarkColor,
            fontSize: height * 0.76,
            fontWeight: 900,
            letterSpacing: "-0.03em",
          }}
        >
          LOOPHOUSE
        </span>
        {" "}
        <span
          className="lh-mono"
          style={{
            color: taglineColor,
            fontSize: height * 0.26,
            fontWeight: 600,
            letterSpacing: "0.14em",
            marginTop: height * 0.12,
          }}
        >
          TOOL CIRCULATION // WORKSHOP
        </span>
      </span>
    </span>
  );
}
