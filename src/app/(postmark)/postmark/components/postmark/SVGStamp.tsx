'use client';

import React, { useId } from 'react';
import { STAMP_DEFINITIONS, type StampStyleId } from '../../lib/postmark/sampleMemories';

interface SVGStampProps {
  stampId: StampStyleId;
  size?: 'sm' | 'md' | 'lg';
  cancelled?: boolean;
  cancellationLabel?: string;
  className?: string;
}

/**
 * Generates a realistic perforated postage-stamp SVG path (scalloped teeth around all 4 edges).
 */
function buildPerforatedRectPath(width: number, height: number, toothStep = 12, toothRadius = 2.9): string {
  const cols = Math.floor(width / toothStep);
  const rows = Math.floor(height / toothStep);
  const dx = width / cols;
  const dy = height / rows;
  const r = toothRadius;

  let d = `M 0 0`;

  // Top edge (left -> right)
  for (let i = 0; i < cols; i++) {
    const cx = (i + 0.5) * dx;
    const x1 = cx - r;
    const x2 = cx + r;
    const nx = (i + 1) * dx;
    d += ` L ${x1.toFixed(2)} 0 A ${r} ${r} 0 0 0 ${x2.toFixed(2)} 0 L ${nx.toFixed(2)} 0`;
  }
  // Right edge (top -> bottom)
  for (let j = 0; j < rows; j++) {
    const cy = (j + 0.5) * dy;
    const y1 = cy - r;
    const y2 = cy + r;
    const ny = (j + 1) * dy;
    d += ` L ${width} ${y1.toFixed(2)} A ${r} ${r} 0 0 0 ${width} ${y2.toFixed(2)} L ${width} ${ny.toFixed(2)}`;
  }
  // Bottom edge (right -> left)
  for (let i = cols; i > 0; i--) {
    const cx = (i - 0.5) * dx;
    const x1 = cx + r;
    const x2 = cx - r;
    const nx = (i - 1) * dx;
    d += ` L ${x1.toFixed(2)} ${height} A ${r} ${r} 0 0 0 ${x2.toFixed(2)} ${height} L ${nx.toFixed(2)} ${height}`;
  }
  // Left edge (bottom -> top)
  for (let j = rows; j > 0; j--) {
    const cy = (j - 0.5) * dy;
    const y1 = cy + r;
    const y2 = cy - r;
    const ny = (j - 1) * dy;
    d += ` L 0 ${y1.toFixed(2)} A ${r} ${r} 0 0 0 0 ${y2.toFixed(2)} L 0 ${ny.toFixed(2)}`;
  }

  d += ' Z';
  return d;
}

const STAMP_OUTER_PATH = buildPerforatedRectPath(120, 148, 12, 3.1);

export const SVGStamp: React.FC<SVGStampProps> = ({
  stampId,
  size = 'md',
  cancelled = false,
  cancellationLabel = 'POSTMARK',
  className = '',
}) => {
  const uid = useId().replace(/:/g, '');
  const def = STAMP_DEFINITIONS[stampId];

  const dimensions = {
    sm: 'w-[74px] h-[91px]',
    md: 'w-[104px] h-[128px]',
    lg: 'w-[126px] h-[155px]',
  }[size];

  return (
    <div className={`relative inline-block select-none ${dimensions} ${className}`}>
      <svg
        viewBox="-4 -4 128 156"
        className="h-full w-full drop-shadow-[0_6px_14px_rgba(62,41,26,0.16)] overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <clipPath id={`stamp-art-${uid}`}>
            <rect x="11" y="12" width="98" height="106" rx="2" />
          </clipPath>
        </defs>

        {/* Perforated paper body */}
        <path
          d={STAMP_OUTER_PATH}
          fill={def.palette.paper}
          stroke="rgba(90, 53, 40, 0.28)"
          strokeWidth="1"
        />

        {/* Inner artwork window */}
        <g clipPath={`url(#stamp-art-${uid})`}>
          {stampId === 'coastal-crest' && (
            <>
              <rect x="11" y="12" width="98" height="106" fill="#DCECF7" />
              <circle cx="82" cy="36" r="14" fill="#F4E07A" />
              {/* Distant headland */}
              <path d="M11 76 Q38 56 68 72 T109 68 L109 118 L11 118 Z" fill="#D85743" opacity="0.86" />
              {/* Sea bands */}
              <rect x="11" y="82" width="98" height="36" fill="#5E98BD" />
              <path
                d="M16 93 Q30 89 44 93 T72 93 T104 93"
                fill="none"
                stroke="#FFF9EF"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M22 104 Q36 100 50 104 T78 104 T102 104"
                fill="none"
                stroke="#FFF9EF"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.85"
              />
              {/* Lighthouse & sail */}
              <path d="M32 46 L39 46 L42 82 L29 82 Z" fill="#FFF9EF" />
              <rect x="31" y="54" width="9" height="6" fill="#D85743" />
              <rect x="30" y="67" width="11" height="6" fill="#D85743" />
              <rect x="31" y="41" width="9" height="5" fill="#25292C" />
              <path d="M76 58 L76 80 L90 78 Z" fill="#FFF9EF" />
            </>
          )}

          {stampId === 'mountain-air' && (
            <>
              <rect x="11" y="12" width="98" height="106" fill="#E6ECE6" />
              <circle cx="40" cy="36" r="13" fill="#F2C7A3" />
              {/* Layered ridge */}
              <path d="M11 88 L46 44 L76 74 L94 54 L109 76 L109 118 L11 118 Z" fill="#77978B" />
              <path d="M46 44 L56 56 L48 54 L42 59 L37 55 Z" fill="#FFF9EF" />
              <path d="M11 96 Q52 80 109 94 L109 118 L11 118 Z" fill="#466359" />
              {/* Minimalist cedar gate */}
              <rect x="65" y="76" width="3.2" height="24" fill="#D85743" />
              <rect x="81" y="76" width="3.2" height="24" fill="#D85743" />
              <path d="M60 76 Q75 72 89 76" stroke="#D85743" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <line x1="63" y1="82" x2="86" y2="82" stroke="#D85743" strokeWidth="2.2" />
            </>
          )}

          {stampId === 'midnight-ferry' && (
            <>
              <rect x="11" y="12" width="98" height="106" fill="#F2E4CE" />
              <circle cx="78" cy="36" r="16" fill="#E8B48A" opacity="0.7" />
              {/* Canal gables */}
              <rect x="18" y="54" width="18" height="36" fill="#D85743" />
              <polygon points="18,54 27,43 36,54" fill="#AD4837" />
              <rect x="38" y="48" width="20" height="42" fill="#E3AE57" />
              <polygon points="38,48 48,38 58,48" fill="#C48F39" />
              <rect x="60" y="57" width="18" height="33" fill="#5A3528" />
              {/* Sail mast & water */}
              <line x1="88" y1="36" x2="88" y2="88" stroke="#25292C" strokeWidth="2" />
              <path d="M89 40 L103 74 L89 74 Z" fill="#FFF9EF" />
              <rect x="11" y="88" width="98" height="30" fill="#4A6B7C" />
              <path d="M18 99 Q46 94 74 99 T104 99" stroke="#F7F1E8" strokeWidth="1.5" fill="none" />
            </>
          )}

          {/* Denomination top-right */}
          <text
            x="102"
            y="27"
            textAnchor="end"
            fill={def.palette.ink}
            fontSize="12"
            fontWeight="700"
            fontFamily="Fraunces, Georgia, serif"
          >
            {def.denomination}
          </text>
        </g>

        {/* Crisp inner frame */}
        <rect
          x="11"
          y="12"
          width="98"
          height="106"
          rx="2"
          fill="none"
          stroke="rgba(37,41,44,0.22)"
          strokeWidth="1"
        />

        {/* Bottom printed caption */}
        <text
          x="60"
          y="132"
          textAnchor="middle"
          fill={def.palette.ink}
          fontSize="7.4"
          fontWeight="700"
          letterSpacing="1.4"
          fontFamily="DM Sans, sans-serif"
        >
          POSTMARK · {def.title.toUpperCase()}
        </text>

        {/* Optional circular postal cancellation mark overlapping corner */}
        {cancelled && (
          <g transform="translate(86, 102) rotate(-14)" className="pm-cancellation-group">
            <circle
              cx="0"
              cy="0"
              r="26"
              fill="none"
              stroke="#25292C"
              strokeWidth="1.5"
              opacity="0.82"
            />
            <circle
              cx="0"
              cy="0"
              r="18"
              fill="none"
              stroke="#25292C"
              strokeWidth="1"
              strokeDasharray="3 2"
              opacity="0.72"
            />
            <text
              x="0"
              y="-2"
              textAnchor="middle"
              fill="#25292C"
              fontSize="6.2"
              fontWeight="700"
              letterSpacing="1.2"
              fontFamily="DM Sans, sans-serif"
            >
              {cancellationLabel}
            </text>
            <text
              x="0"
              y="7"
              textAnchor="middle"
              fill="#D85743"
              fontSize="5.6"
              fontWeight="700"
              letterSpacing="0.9"
              fontFamily="DM Sans, sans-serif"
            >
              KEPT MAIL
            </text>
            <path
              d="M 22 -8 Q 34 -13 46 -8 T 70 -8"
              fill="none"
              stroke="#25292C"
              strokeWidth="1.35"
              opacity="0.72"
            />
            <path
              d="M 23 0 Q 35 -5 47 0 T 71 0"
              fill="none"
              stroke="#25292C"
              strokeWidth="1.35"
              opacity="0.72"
            />
            <path
              d="M 22 8 Q 34 3 46 8 T 70 8"
              fill="none"
              stroke="#25292C"
              strokeWidth="1.35"
              opacity="0.72"
            />
          </g>
        )}
      </svg>
    </div>
  );
};

/**
 * Standalone circular vintage postal cancellation mark SVG used in headers, transitions, and seals.
 */
export const PostalCancellationSeal: React.FC<{
  topText?: string;
  bottomText?: string;
  centerText?: string;
  className?: string;
  accentWave?: boolean;
}> = ({
  topText = 'POSTMARK',
  bottomText = 'TRAVEL ARCHIVE',
  centerText = 'EST.',
  className = 'w-12 h-12',
  accentWave = false,
}) => {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 100 100" className={`overflow-visible ${className}`} aria-hidden="true">
      <defs>
        <path id={`top-arc-${id}`} d="M 16,50 A 34,34 0 1,1 84,50" />
        <path id={`bot-arc-${id}`} d="M 84,50 A 34,34 0 1,1 16,50" />
      </defs>
      <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="2.1" opacity="0.82" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.68" />
      <text fontSize="8.5" fontWeight="700" letterSpacing="2.1" fill="currentColor" fontFamily="DM Sans, sans-serif">
        <textPath href={`#top-arc-${id}`} startOffset="50%" textAnchor="middle">
          {topText}
        </textPath>
      </text>
      <text fontSize="7.4" fontWeight="600" letterSpacing="1.8" fill="currentColor" fontFamily="DM Sans, sans-serif">
        <textPath href={`#bot-arc-${id}`} startOffset="50%" textAnchor="middle">
          {bottomText}
        </textPath>
      </text>
      {/* Wavy cancellation lines inside center */}
      <path d="M 30 45 Q 40 40 50 45 T 70 45" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.78" />
      <path d="M 28 51 Q 39 46 50 51 T 72 51" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.78" />
      <path d="M 30 57 Q 40 52 50 57 T 70 57" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.78" />
      {centerText && (
        <text
          x="50"
          y="39"
          textAnchor="middle"
          fontSize="6.5"
          fontWeight="700"
          letterSpacing="1.2"
          fill="currentColor"
          opacity="0.75"
        >
          {centerText}
        </text>
      )}
      {accentWave && (
        <g opacity="0.7" className="pm-seal-waves">
          <path d="M 88 38 Q 104 31 120 38 T 152 38" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M 90 48 Q 106 41 122 48 T 154 48" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <path d="M 88 58 Q 104 51 120 58 T 152 58" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </g>
      )}
    </svg>
  );
};
