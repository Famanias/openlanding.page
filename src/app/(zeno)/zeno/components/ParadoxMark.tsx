'use client';

import React from 'react';

interface ParadoxMarkProps {
  className?: string;
  size?: number;
  strokeColor?: string;
}

export const ParadoxMark: React.FC<ParadoxMarkProps> = ({
  className = '',
  size = 42,
  strokeColor = 'rgba(242, 240, 235, 0.42)',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-hidden="true"
    >
      {/* Interrupted circle with intentional top-right gap matching reference */}
      <path
        d="M 34.5 9.2 A 17.5 17.5 0 1 0 39.8 16.5"
        stroke={strokeColor}
        strokeWidth="1.65"
        strokeLinecap="round"
      />
      {/* Diagonal slash */}
      <line
        x1="9.5"
        y1="38.5"
        x2="38.5"
        y2="9.5"
        stroke={strokeColor}
        strokeWidth="1.65"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ParadoxMark;
