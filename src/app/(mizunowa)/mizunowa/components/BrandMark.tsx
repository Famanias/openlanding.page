'use client';

interface BrandMarkProps {
  size?: number;
}

export default function BrandMark({ size = 32 }: BrandMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Outer incomplete concentric ring with upper-right leaf-shaped gap */}
      <path
        d="M25.6 11.8A11 11 0 1 1 19.6 5.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Inner incomplete concentric ring echoing the gap */}
      <path
        d="M21.4 13.6A6.4 6.4 0 1 1 18.2 10.1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* Small leaf-shaped accent sitting in the upper-right opening */}
      <path
        d="M22.2 6.2C24.2 6.0 25.8 7.6 25.6 9.6C23.6 9.8 22.0 8.2 22.2 6.2Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}
