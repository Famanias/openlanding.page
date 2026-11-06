import React, { useState } from 'react';
import { PlaylistItem } from '../utils/matching';

/**
 * Hand-drawn asymmetrical 5-point star matching the double-stroke sketchy stars in riff-reference.png
 */
export function HandStar({
  className = 'w-10 h-10',
  variant = 1,
  interactive = false,
  label,
}: {
  className?: string;
  variant?: 1 | 2 | 3;
  interactive?: boolean;
  label?: string;
}) {
  const [pinned, setPinned] = useState(false);

  const paths = {
    1: 'M24 3 L29.5 17.8 L45 17.2 L32.2 26.8 L37.4 42.5 L24 32.8 L10.8 42.2 L15.6 26.5 L3.2 17.4 L18.5 17.6 Z M24.4 5.2 L28.8 18.4 L42.8 18.1 L31.1 26.4 L35.8 40.4 L23.8 31.8 L12.2 40.1 L16.5 26.2 L5.1 18.2 L19.2 18.4 Z',
    2: 'M23 2.5 L28.2 16.9 L44.2 15.8 L31.4 25.9 L36.9 41.8 L23.2 31.9 L9.4 41.2 L14.8 25.4 L2.5 16.5 L17.9 16.8 Z',
    3: 'M25 4 L30 18.2 L45.5 18.8 L32.8 27.5 L38 43 L24.2 33.4 L11.2 42.5 L16.2 27.1 L4 18.2 L19.1 18.1 Z',
  };

  if (interactive) {
    return (
      <button
        type="button"
        onClick={() => setPinned((p) => !p)}
        aria-pressed={pinned}
        aria-label={label || 'Pin hand-drawn star sticker'}
        className={`group relative inline-flex items-center justify-center transition-transform duration-200 hover:scale-110 hover:rotate-12 ${
          pinned ? 'text-[#C92533] rotate-12 scale-110' : 'text-[#F4F0E8]/85'
        } ${className}`}
        title={pinned ? 'Star pinned to zine margin' : 'Click to ink-stamp this star'}
      >
        <svg viewBox="0 0 48 46" fill="none" className="w-full h-full overflow-visible">
          <path
            d={paths[variant]}
            stroke="currentColor"
            strokeWidth={pinned ? '2.1' : '1.5'}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    );
  }

  return (
    <svg
      viewBox="0 0 48 46"
      fill="none"
      aria-hidden="true"
      className={`text-[#F4F0E8]/80 pointer-events-none select-none ${className}`}
    >
      <path
        d={paths[variant]}
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Riff waveform icon from upper-left brand lockup in reference image
 */
export function WaveformLogo({ className = 'w-9 h-8' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 44 36"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <line x1="1" y1="18" x2="5" y2="18" stroke="#F4F0E8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="7.5" y1="13" x2="7.5" y2="23" stroke="#F4F0E8" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="11" y1="9" x2="11" y2="27" stroke="#F4F0E8" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="14.5" y1="12" x2="14.5" y2="24" stroke="#F4F0E8" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="18" y1="2" x2="18" y2="34" stroke="#F4F0E8" strokeWidth="2.1" strokeLinecap="round" />
      <line x1="21.5" y1="7" x2="21.5" y2="29" stroke="#F4F0E8" strokeWidth="1.9" strokeLinecap="round" />
      <line x1="25" y1="11" x2="25" y2="25" stroke="#F4F0E8" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="28.5" y1="14" x2="28.5" y2="22" stroke="#F4F0E8" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="32" y1="9" x2="32" y2="27" stroke="#F4F0E8" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="35.5" y1="14" x2="35.5" y2="22" stroke="#F4F0E8" strokeWidth="1.7" strokeLinecap="round" />
      <line x1="38.5" y1="18" x2="43" y2="18" stroke="#F4F0E8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Hand-lettered "MUSIC > LOOKS" scrawl matching upper-right of hero reference
 */
export function MusicGreaterLooksScrawl({
  className = '',
  showUnderline = true,
}: {
  className?: string;
  showUnderline?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 250 56"
      fill="none"
      aria-hidden="true"
      className={`select-none pointer-events-none ${className}`}
    >
      {/* Hand-inked capital letters MUSIC > LOOKS */}
      <g stroke="#F4F0E8" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.86">
        {/* M */}
        <path d="M8 36 L11 10 L20 26 L29 9 L31 36" />
        {/* U */}
        <path d="M38 11 L38 29 C38 35 48 36 49 29 L50 11" />
        {/* S */}
        <path d="M67 13 C61 10 56 14 57 19 C58 24 67 25 67 31 C67 36 58 37 55 33" />
        {/* I */}
        <path d="M75 12 L74 35" />
        {/* C */}
        <path d="M95 14 C86 11 81 18 82 26 C83 34 89 36 96 34" />

        {/* > */}
        <path d="M111 17 L124 25 L110 32" strokeWidth="2.5" />

        {/* L */}
        <path d="M140 12 L137 36 L151 36" />
        {/* O */}
        <ellipse cx="164" cy="25" rx="8.5" ry="11" transform="rotate(-5 164 25)" />
        {/* O */}
        <ellipse cx="186" cy="25" rx="8.5" ry="11" transform="rotate(4 186 25)" />
        {/* K */}
        <path d="M202 12 L199 37 M214 13 L201 25 L214 37" />
        {/* S */}
        <path d="M235 15 C228 12 222 16 223 21 C224 26 235 28 234 34 C233 39 224 39 220 35" />
      </g>
      {showUnderline && (
        <>
          <path
            d="M135 43 Q188 46 242 49"
            stroke="#F4F0E8"
            strokeWidth="1.7"
            strokeLinecap="round"
            opacity="0.78"
          />
          <path
            d="M148 48 Q195 51 236 53"
            stroke="#F4F0E8"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.65"
          />
        </>
      )}
    </svg>
  );
}

/**
 * Realistic 12-inch vinyl disc with concentric grooves, specular light sheen, and crimson label
 */
export function VinylDisc({
  className = 'w-56 h-56',
  fast = false,
  labelSide = 'A',
  onFlip,
  interactive = false,
}: {
  className?: string;
  fast?: boolean;
  labelSide?: 'A' | 'B';
  onFlip?: () => void;
  interactive?: boolean;
}) {
  const content = (
    <div
      className={`relative rounded-full bg-[#090909] shadow-[0_20px_50px_rgba(0,0,0,0.92)] border border-white/10 overflow-hidden select-none ${
        fast ? 'animate-vinyl-fast' : 'animate-vinyl-slow'
      } ${interactive ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Specular vinyl light reflection cones */}
      <div
        className="absolute inset-0 opacity-35 pointer-events-none"
        style={{
          background:
            'conic-gradient(from 35deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.22) 22deg, transparent 48deg, transparent 180deg, rgba(255,255,255,0.18) 205deg, transparent 235deg)',
        }}
      />
      {/* Concentric micro-grooves SVG */}
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <circle cx="100" cy="100" r="98" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.7" />
        <circle cx="100" cy="100" r="86" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="0.9" />
        <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.7" />
        <circle cx="100" cy="100" r="74" fill="none" stroke="rgba(255,255,255,0.11)" strokeWidth="1" />
        <circle cx="100" cy="100" r="68" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.7" />
        <circle cx="100" cy="100" r="62" fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth="0.8" />
        <circle cx="100" cy="100" r="56" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.7" />
        <circle cx="100" cy="100" r="49" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        <circle cx="100" cy="100" r="43" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.6" />

        {/* Deep crimson center label */}
        <circle cx="100" cy="100" r="34" fill="#C92533" stroke="#741B24" strokeWidth="2" />
        <circle cx="100" cy="100" r="28" fill="none" stroke="rgba(244,240,232,0.35)" strokeWidth="0.7" strokeDasharray="4 2" />
        <text
          x="100"
          y="84"
          textAnchor="middle"
          fill="#F4F0E8"
          fontSize="7"
          fontWeight="700"
          letterSpacing="1.5"
          className="font-mono-code"
        >
          RIFF 45 RPM
        </text>
        <text
          x="100"
          y="119"
          textAnchor="middle"
          fill="#F4F0E8"
          fontSize="6.5"
          opacity="0.85"
          letterSpacing="1"
          className="font-mono-code"
        >
          SIDE {labelSide} · STEREO
        </text>
        {/* Center spindle hole */}
        <circle cx="100" cy="100" r="5.5" fill="#0B0B0B" stroke="rgba(244,240,232,0.3)" strokeWidth="1" />
      </svg>
    </div>
  );

  if (interactive && onFlip) {
    return (
      <button
        type="button"
        onClick={onFlip}
        aria-label={`Flip vinyl record to side ${labelSide === 'A' ? 'B' : 'A'}`}
        className="inline-block rounded-full focus-visible:ring-2 focus-visible:ring-[#C92533]"
        title="Click to flip vinyl side A/B"
      >
        {content}
      </button>
    );
  }

  return content;
}

/**
 * Original SVG artwork generator for playlist & album sleeves (no external hotlinks, 100% crisp)
 */
export function AlbumArtGraphic({
  variant,
  className = 'w-full h-full',
}: {
  variant: PlaylistItem['artVariant'];
  className?: string;
}) {
  switch (variant) {
    case 'crimson-horizon':
      return (
        <div className={`relative bg-[#0D0D10] overflow-hidden ${className}`}>
          <img
            src="/assets/album-kyoto.jpg"
            alt="Midnight Static shoegaze cover artwork"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-90 mix-blend-lighten scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-black/40" />
          <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono-code text-[#F4F0E8]/75">
            <span>RIFF-014</span>
            <span className="text-[#C92533] font-bold">MONO / REVERB</span>
          </div>
        </div>
      );

    case 'static-guitar':
      return (
        <div className={`relative bg-[#121212] overflow-hidden ${className}`}>
          <img
            src="/assets/match-art-1.jpg"
            alt="Post-punk guitar silhouette cover art"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale contrast-125 opacity-85"
          />
          <div className="absolute inset-0 bg-[#C92533]/20 mix-blend-multiply" />
          <svg viewBox="0 0 120 120" className="absolute inset-0 w-full h-full pointer-events-none">
            <line x1="0" y1="95" x2="120" y2="25" stroke="#C92533" strokeWidth="10" opacity="0.75" />
            <line x1="0" y1="103" x2="120" y2="33" stroke="#F4F0E8" strokeWidth="1.5" opacity="0.6" />
          </svg>
          <div className="absolute top-2 left-2.5 text-[10px] font-mono-code tracking-widest text-[#F4F0E8]/85 uppercase">
            ENCORE // 39:00
          </div>
        </div>
      );

    case 'rain-window':
      return (
        <div className={`relative bg-[#111317] overflow-hidden ${className}`}>
          <img
            src="/assets/shared-track-2.jpg"
            alt="Songs to Walk Home To misty silhouette cover art"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-2 left-2.5 text-[10px] font-mono-code text-[#F4F0E8]/80">
            SIDE B · 4-TRACK TAPE
          </div>
        </div>
      );

    case 'basement-flyer':
      return (
        <div className={`relative bg-[#151412] overflow-hidden ${className}`}>
          <img
            src="/assets/zine-band-photo.jpg"
            alt="Basement Show Memories underground band photograph"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover contrast-125 opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#C92533]/25" />
          <div className="absolute top-2 right-2 bg-[#C92533] text-[#F4F0E8] px-1.5 py-0.5 text-[9px] font-mono-code uppercase">
            ALL AGES 18+
          </div>
        </div>
      );

    case 'tube-amp':
      return (
        <div className={`relative bg-[#160B0D] overflow-hidden ${className}`}>
          <img
            src="/assets/shared-track-3.jpg"
            alt="Cathode Ray Lullabies darkwave red glow artwork"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
          <div className="absolute bottom-2 right-2.5 text-[10px] font-mono-code text-[#C92533]">
            118 BPM // SYNTH
          </div>
        </div>
      );

    case 'tape-reel':
    default:
      return (
        <div className={`relative bg-[#101216] overflow-hidden ${className}`}>
          <img
            src="/assets/match-art-2.jpg"
            alt="Rain on the Amp Case atmospheric album sleeve"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute top-2 left-2.5 text-[10px] font-mono-code text-[#F4F0E8]/80">
            12&quot; EP · 45 RPM
          </div>
        </div>
      );
  }
}
