'use client';

import React, { useState } from 'react';

export interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackLabel?: string;
  fallbackTint?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackLabel,
  fallbackTint = '#f6ebd8',
  className = '',
  style,
  ...rest
}) => {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role={alt ? 'img' : 'presentation'}
        aria-label={alt || undefined}
        className={`relative flex flex-col items-center justify-center overflow-hidden p-3 text-center select-none ${className}`}
        style={{
          backgroundColor: fallbackTint,
          color: '#24211D',
          ...style,
        }}
      >
        <svg
          viewBox="0 0 120 80"
          className="w-10 h-8 opacity-40 mb-1 stroke-current"
          fill="none"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <rect x="6" y="6" width="108" height="68" rx="4" />
          <path d="M6 56 L38 32 L66 50 L88 26 L114 56" />
          <circle cx="84" cy="22" r="7" />
        </svg>
        {(fallbackLabel || alt) && (
          <span className="text-[10px] mm-mono font-bold tracking-wider opacity-75 max-w-[20ch] truncate">
            {fallbackLabel || alt}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
      style={style}
      {...rest}
    />
  );
};
