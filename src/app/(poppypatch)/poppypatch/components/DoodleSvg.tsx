import React from 'react';

export function SparkleStar({
  className = 'w-6 h-6',
  color = '#4A2E25'
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M16 2C16.8 10.2 21.8 15.2 30 16C21.8 16.8 16.8 21.8 16 30C15.2 21.8 10.2 16.8 2 16C10.2 15.2 15.2 10.2 16 2Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CoralUnderline({ className = 'w-full h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 26"
      fill="none"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M6 17C98 6 278 4 412 13C348 16 184 18 52 22"
        stroke="#E58267"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-stroke-draw"
      />
    </svg>
  );
}

export function CurlyArrow({ className = 'w-9 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 38"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M38 6C43 13 36 22 28 18C22 15 26 8 32 11C38 14 31 28 10 31M10 31L18 25M10 31L19 35"
        stroke="#4A2E25"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BotanicalSprig({
  className = 'w-12 h-16',
  color = '#4A2E25'
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 88"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M32 82C31 58 34 32 42 8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M33 62C20 58 14 46 22 40C30 34 35 48 33 62Z"
        stroke={color}
        strokeWidth="1.8"
        fill="#A8B96C"
        fillOpacity="0.35"
      />
      <path
        d="M35 46C48 42 54 30 46 24C38 18 33 32 35 46Z"
        stroke={color}
        strokeWidth="1.8"
        fill="#A8B96C"
        fillOpacity="0.35"
      />
      <path
        d="M38 26C26 22 22 12 29 7C36 2 40 15 38 26Z"
        stroke={color}
        strokeWidth="1.8"
        fill="#F28B72"
        fillOpacity="0.3"
      />
    </svg>
  );
}

export function HandDrawnMushroomIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 22C8 12.5 14.5 7 22 7C29.5 7 36 12.5 36 22C36 24.5 33.5 25.5 22 25.5C10.5 25.5 8 24.5 8 22Z"
        fill="#E58267"
        stroke="#4A2E25"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 25.5C17 30.5 16 35 17.5 37.5C19 39.5 25 39.5 26.5 37.5C28 35 27 30.5 26.5 25.5"
        fill="#FAF3E3"
        stroke="#4A2E25"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="15" r="2" fill="#FAF3E3" />
      <circle cx="23" cy="13" r="2.4" fill="#FAF3E3" />
      <circle cx="29" cy="17" r="1.8" fill="#FAF3E3" />
    </svg>
  );
}
