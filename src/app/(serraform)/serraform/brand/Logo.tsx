'use client';

import React from 'react';

interface LogoProps {
  tone?: 'dark' | 'light';
  className?: string;
}

export const FoldMark: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M3 25L9 7L15 25L21 7L29 25"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Logo: React.FC<LogoProps> = ({ tone = 'dark', className = '' }) => {
  const textColor = tone === 'light' ? 'text-[var(--srf-porcelain)]' : 'text-[var(--srf-oxblood)]';
  return (
    <span
      className={`inline-flex items-center gap-3 select-none whitespace-nowrap shrink-0 ${textColor} ${className}`}
      aria-label="SERRAFORM"
    >
      <FoldMark className="w-6 h-6 shrink-0" />
      <span
        className="font-[family-name:var(--font-display)] font-medium text-[20px] leading-none tracking-[-0.025em]"
        aria-hidden="true"
      >
        SERRAFORM
      </span>
    </span>
  );
};

export const CreaseMarker: React.FC<{ index: string; className?: string }> = ({
  index,
  className = '',
}) => (
  <span className={`inline-flex items-center gap-2 srf-mono-caption ${className}`}>
    <svg viewBox="0 0 22 10" fill="none" aria-hidden="true" className="w-5 h-2.5 shrink-0">
      <path
        d="M1 9L6 1L11 9L16 1L21 9"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span>{index}</span>
  </span>
);
