import React from "react";

type LogoProps = {
  className?: string;
  tone?: "ink" | "paper";
};

export function ValenceMark({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="6"
        y="6"
        width="68"
        height="68"
        rx="34"
        fill="#E8E0F8"
        stroke="#1E1B2E"
        strokeWidth="3"
      />
      <rect
        x="18"
        y="18"
        width="44"
        height="44"
        rx="22"
        fill="#D9F2E6"
        stroke="#1E1B2E"
        strokeWidth="3"
      />
      <rect
        x="29"
        y="29"
        width="22"
        height="22"
        rx="11"
        fill="#FCE2D5"
        stroke="#1E1B2E"
        strokeWidth="2.5"
      />
      <circle cx="40" cy="40" r="6" fill="#5B46E8" />
    </svg>
  );
}

export function ValenceLogo({ className = "", tone = "ink" }: LogoProps) {
  const textFill = tone === "paper" ? "#FBF9F5" : "#1E1B2E";
  const dotFill = tone === "paper" ? "#D9F2E6" : "#5B46E8";

  return (
    <span className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <ValenceMark className="w-8 h-8 shrink-0" />
      <span
        className="vl-display text-xl font-extrabold tracking-tight leading-none"
        style={{ color: textFill }}
      >
        valence
        <span style={{ color: dotFill }}>.</span>
      </span>
    </span>
  );
}
