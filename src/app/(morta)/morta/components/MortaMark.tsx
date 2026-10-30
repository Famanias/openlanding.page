import React from 'react';

interface MortaMarkProps {
  size?: number;
  className?: string;
}

/**
 * Original MORTA house emblem:
 * A pointed jewel shape above an M-like set of fine lines, held inside a circular ring.
 * Designed to remain crisp and recognisable down to 16px favicon scale.
 */
export const MortaMark: React.FC<MortaMarkProps> = ({
  size = 32,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 ${className}`}
    >
      {/* Outer circular ring */}
      <circle
        cx="32"
        cy="32"
        r="29"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Inner fine engraved ring */}
      <circle
        cx="32"
        cy="32"
        r="25.5"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="2 2"
        opacity="0.65"
      />
      {/* Pointed jewel shape at the crown */}
      <path
        d="M32 9L38.5 19.5L32 26.5L25.5 19.5L32 9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
      {/* Internal facet line of the pointed jewel */}
      <line
        x1="32"
        y1="9"
        x2="32"
        y2="26.5"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.8"
      />
      {/* M-like set of fine architectural lines below */}
      <path
        d="M18.5 47V27.5L32 39.5L45.5 27.5V47"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* Secondary fine inner M-pillars */}
      <path
        d="M22.5 47V33.5M41.5 47V33.5"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.75"
      />
      {/* Central plumb rule anchoring jewel to base */}
      <line
        x1="32"
        y1="26.5"
        x2="32"
        y2="50"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
};

export const PointedSealOrnament: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <svg
    width="20"
    height="28"
    viewBox="0 0 20 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    className={className}
  >
    <path
      d="M10 1L18.5 13.5L10 26.5L1.5 13.5L10 1Z"
      stroke="currentColor"
      strokeWidth="1"
    />
    <circle cx="10" cy="13.5" r="3" stroke="currentColor" strokeWidth="0.85" />
    <line
      x1="10"
      y1="1"
      x2="10"
      y2="26.5"
      stroke="currentColor"
      strokeWidth="0.6"
      opacity="0.6"
    />
  </svg>
);

export const SectionHandoffRule: React.FC<{
  chapterNumber: string;
  chapterLabel: string;
}> = ({ chapterNumber, chapterLabel }) => (
  <div
    className="w-full max-w-[1920px] mx-auto px-6 md:px-8"
    role="presentation"
  >
    <div className="relative flex items-center justify-between py-6 border-t border-white/25">
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs tracking-[0.22em] text-white/70 tabular-nums">
          {chapterNumber}
        </span>
        <span className="text-white/30" aria-hidden="true">
          ·
        </span>
        <span className="font-mono text-xs tracking-[0.18em] uppercase text-white/80">
          {chapterLabel}
        </span>
      </div>
      <div className="flex items-center gap-3" aria-hidden="true">
        <div className="w-12 h-px bg-white/30" />
        <PointedSealOrnament className="w-3.5 h-5 text-white/65" />
      </div>
    </div>
  </div>
);
