import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2.5 font-semibold tracking-[0.22em] uppercase text-[#f6f1ea] ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="w-4 h-4 text-[#ffb36b]"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" strokeDasharray="10 3" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1" opacity="0.8" />
        <circle cx="12" cy="12" r="5" fill="#000000" stroke="#f6f1ea" strokeWidth="0.8" />
      </svg>
      <span>PERIGEE</span>
    </div>
  );
};
