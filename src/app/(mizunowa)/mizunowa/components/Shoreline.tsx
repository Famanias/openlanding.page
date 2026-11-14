'use client';

type Ground = 'pond' | 'paper' | 'moss';

interface ShorelineProps {
  from: Ground;
  to: Ground;
  /** Mirror the curve so consecutive shorelines do not repeat. */
  flip?: boolean;
  /** Lay the shore over the end of the previous section instead of on a band of its ground colour. */
  overlap?: boolean;
}

/** A curved water's-edge between two section grounds, with ripple lines lapping against it. */
export default function Shoreline({ from, to, flip = false, overlap = false }: ShorelineProps) {
  return (
    <div
      className={`mnw-shore mnw-shore-from-${from} mnw-shore-to-${to} ${flip ? 'is-flipped' : ''} ${
        overlap ? 'is-overlap' : ''
      }`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 96" preserveAspectRatio="none" focusable="false">
        <path
          className="mnw-shore-line"
          d="M0 40 C 220 4, 470 66, 720 34 C 960 4, 1210 58, 1440 22"
        />
        <path
          className="mnw-shore-line mnw-shore-line-far"
          d="M0 24 C 220 -10, 470 50, 720 18 C 960 -10, 1210 42, 1440 8"
        />
        <path
          className="mnw-shore-fill"
          d="M0 58 C 220 22, 470 84, 720 52 C 960 22, 1210 76, 1440 40 L1440 97 L0 97 Z"
        />
      </svg>
    </div>
  );
}
