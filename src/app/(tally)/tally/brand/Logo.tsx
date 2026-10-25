import React from "react";

export function TallyMark({ className = "tl-mark" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 44 32"
      fill="none"
      aria-hidden="true"
    >
      {/* Left main ticket body */}
      <path
        d="M2 6C2 3.79086 3.79086 2 6 2H27V11C24.7909 11 23 12.7909 23 15C23 17.2091 24.7909 19 27 19V30H6C3.79086 30 2 28.2091 2 26V6Z"
        fill="#FAF4E8"
        stroke="#231F2B"
        strokeWidth="2"
      />
      {/* Right detachable pastel stub */}
      <path
        d="M31 2H38C40.2091 2 42 3.79086 42 6V26C42 28.2091 40.2091 30 38 30H31V19C33.2091 19 35 17.2091 35 15C35 12.7909 33.2091 11 31 11V2Z"
        fill="#F7C8B6"
        stroke="#231F2B"
        strokeWidth="2"
      />
      {/* Tally marks on left body */}
      <line x1="8" y1="10" x2="8" y2="22" stroke="#231F2B" strokeWidth="2" strokeLinecap="round" />
      <line x1="13" y1="10" x2="13" y2="22" stroke="#231F2B" strokeWidth="2" strokeLinecap="round" />
      <line x1="18" y1="10" x2="18" y2="22" stroke="#231F2B" strokeWidth="2" strokeLinecap="round" />
      <line x1="6" y1="19" x2="20" y2="12" stroke="#231F2B" strokeWidth="2" strokeLinecap="round" />
      {/* Perforation seam */}
      <line
        x1="29"
        y1="4"
        x2="29"
        y2="28"
        stroke="#231F2B"
        strokeWidth="1.5"
        strokeDasharray="2.5 2.5"
      />
    </svg>
  );
}

export function TallyLogo({ className = "" }: { className?: string }) {
  return (
    <span className={`tl-logo-lockup ${className}`}>
      <TallyMark />
      <span className="tl-logo-text">
        <span className="tl-logo-word">Tally</span>
        <span className="tl-logo-sub">COUNTER · POS</span>
      </span>
    </span>
  );
}

export function CounterStamp({
  label = "DEPOSIT LOCKED",
  sublabel = "TALLY POS · VERIFIED",
  stamped = false,
  className = "",
}: {
  label?: string;
  sublabel?: string;
  stamped?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`tl-counter-stamp ${className}`}
      data-stamped={stamped ? "true" : "false"}
      aria-hidden="true"
    >
      <svg viewBox="0 0 120 120" className="tl-stamp-svg" fill="none">
        <circle
          cx="60"
          cy="60"
          r="54"
          fill="#F7C8B6"
          stroke="#231F2B"
          strokeWidth="2.5"
          strokeDasharray="5 3"
        />
        <circle cx="60" cy="60" r="46" stroke="#231F2B" strokeWidth="1.5" />
        <rect
          x="14"
          y="46"
          width="92"
          height="28"
          rx="4"
          fill="#FAF4E8"
          stroke="#231F2B"
          strokeWidth="2"
        />
        <text
          x="60"
          y="63"
          textAnchor="middle"
          fill="#231F2B"
          fontSize="10"
          fontWeight="700"
          letterSpacing="1.2"
        >
          {label}
        </text>
        <text
          x="60"
          y="33"
          textAnchor="middle"
          fill="#231F2B"
          fontSize="7.5"
          fontWeight="600"
          letterSpacing="1.4"
        >
          ★ {sublabel} ★
        </text>
        <text
          x="60"
          y="93"
          textAnchor="middle"
          fill="#231F2B"
          fontSize="8"
          fontWeight="700"
          letterSpacing="1.5"
        >
          STUB #26-OK
        </text>
      </svg>
    </div>
  );
}

export function ScissorsIcon({ className = "tl-icon-sm" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="5.5" cy="5.5" r="2.5" stroke="#231F2B" strokeWidth="1.6" fill="#F7C8B6" />
      <circle cx="5.5" cy="14.5" r="2.5" stroke="#231F2B" strokeWidth="1.6" fill="#C8E6D0" />
      <path d="M7.5 7L17 15M7.5 13L17 5" stroke="#231F2B" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
