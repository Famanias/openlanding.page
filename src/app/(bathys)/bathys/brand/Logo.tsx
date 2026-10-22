import React from "react";

type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
};

export function LogoMark({ className = "w-10 h-10", variant = "dark" }: LogoProps) {
  const strokeColor = variant === "dark" ? "#EDF5FA" : "#03070D";
  const ruleColor = "#546E8A";
  const accentColor = "#00E5FF";

  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="BATHYS Hadal Mark"
    >
      <circle cx="40" cy="40" r="36" stroke={strokeColor} strokeWidth="3.5" />
      <circle cx="40" cy="40" r="28" stroke={ruleColor} strokeWidth="1.2" strokeDasharray="3 3" />
      <circle cx="40" cy="40" r="18" stroke={accentColor} strokeWidth="2" />
      <line x1="40" y1="1" x2="40" y2="9" stroke={strokeColor} strokeWidth="3.5" />
      <line x1="40" y1="71" x2="40" y2="79" stroke={strokeColor} strokeWidth="3.5" />
      <line x1="1" y1="40" x2="9" y2="40" stroke={strokeColor} strokeWidth="3.5" />
      <line x1="71" y1="40" x2="79" y2="40" stroke={strokeColor} strokeWidth="3.5" />
      <circle cx="40" cy="40" r="5" fill={accentColor} />
      <path
        d="M50 30 L63 17 M53 40 L71 40 M50 50 L63 63"
        stroke={accentColor}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LogoLockup({ className = "w-auto h-10", variant = "dark" }: LogoProps) {
  const textColor = variant === "dark" ? "#EDF5FA" : "#03070D";
  const subTextColor = variant === "dark" ? "#00E5FF" : "#546E8A";
  const strokeColor = variant === "dark" ? "#EDF5FA" : "#03070D";
  const accentColor = "#00E5FF";

  return (
    <svg
      viewBox="0 0 380 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="BATHYS Hadal Dynamics"
    >
      <g transform="translate(10, 10)">
        <circle cx="35" cy="35" r="32" stroke={strokeColor} strokeWidth="3" />
        <circle cx="35" cy="35" r="26" stroke="#546E8A" strokeWidth="1.2" strokeDasharray="3 3" />
        <circle cx="35" cy="35" r="16" stroke={accentColor} strokeWidth="1.8" />
        <line x1="35" y1="0" x2="35" y2="7" stroke={strokeColor} strokeWidth="3" />
        <line x1="35" y1="63" x2="35" y2="70" stroke={strokeColor} strokeWidth="3" />
        <line x1="0" y1="35" x2="7" y2="35" stroke={strokeColor} strokeWidth="3" />
        <line x1="63" y1="35" x2="70" y2="35" stroke={strokeColor} strokeWidth="3" />
        <circle cx="35" cy="35" r="4.5" fill={accentColor} />
        <path
          d="M44 26 L56 14 M47 35 L64 35 M44 44 L56 56"
          stroke={accentColor}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <text
        x="96"
        y="47"
        fontFamily="var(--font-chakra, sans-serif)"
        fontWeight="700"
        fontSize="34"
        letterSpacing="4"
        fill={textColor}
      >
        BATHYS
      </text>
      <text
        x="98"
        y="65"
        fontFamily="var(--font-share-mono, monospace)"
        fontSize="10.5"
        letterSpacing="2.2"
        fill={subTextColor}
      >
        HADAL ROBOTICS · 11,000 M DEPTH CERTIFIED
      </text>
    </svg>
  );
}
