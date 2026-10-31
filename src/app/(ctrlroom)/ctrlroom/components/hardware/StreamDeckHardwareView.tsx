'use client';
import React, { useState } from 'react';
import { Maximize2, X, CheckCircle2, Usb, Layers, Sliders } from 'lucide-react';
import { getActionById } from '../../lib/os/actions';
import { DeckSlotConfig } from '../../lib/os/types';
import { PixelActionIcon } from '../icons/PixelSprites';

interface StreamDeckHardwareViewProps {
  slots: DeckSlotConfig[];
  selectedSlotIndex?: number;
  onSelectSlot?: (index: number) => void;
  compact?: boolean;
  showAngleSwitcher?: boolean;
}

type HardwareAngle = 'FRONTAL' | 'STAND_45' | 'REAR_DETAIL';

/**
 * High-resolution, non-pixelated, smooth studio hardware illustration & interactive
 * photograph-grade render of the physical Elgato Stream Deck MK.2 (5 columns x 3 rows).
 * Strictly contrasts with the pixelated OS interface per Section 3 & Section 5.
 */
export const StreamDeckHardwareView: React.FC<StreamDeckHardwareViewProps> = ({
  slots,
  selectedSlotIndex,
  onSelectSlot,
  compact = false,
  showAngleSwitcher = true,
}) => {
  const [angle, setAngle] = useState<HardwareAngle>('FRONTAL');
  const [zoomOpen, setZoomOpen] = useState(false);
  const [activeCallout, setActiveCallout] = useState<number | null>(null);

  const callouts = [
    {
      id: 1,
      title: '15 Customizable LCD Keys (5 × 3 Matrix)',
      detail: 'Each key is an individual high-resolution LCD screen ready to display dynamic icons and trigger single or multi-step actions.',
    },
    {
      id: 2,
      title: 'Removable Matte Faceplate',
      detail: 'Precision-engineered detachable top plate lets creators swap designs or clean the key bezel effortlessly.',
    },
    {
      id: 3,
      title: 'Detachable USB-C Connection & Fixed 45° Stand',
      detail: 'Weighted non-slip desk stand holds the surface at an optimal viewing angle with a rear recessed USB-C port.',
    },
  ];

  const renderHardwareChassis = (isLarge = false) => {
    if (angle === 'REAR_DETAIL') {
      return (
        <div className="relative w-full max-w-[520px] mx-auto select-none">
          <svg
            viewBox="0 0 640 400"
            className="w-full h-auto drop-shadow-[0_24px_38px_rgba(0,0,0,0.65)]"
            role="img"
            aria-label="Elgato Stream Deck MK.2 Rear USB-C Port, Detachable Stand, and Removable Faceplate Architecture"
          >
            <defs>
              <linearGradient id="mk2RearBody" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#262B36" />
                <stop offset="50%" stopColor="#171A21" />
                <stop offset="100%" stopColor="#0D0F14" />
              </linearGradient>
              <linearGradient id="mk2StandGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E222B" />
                <stop offset="100%" stopColor="#0B0D12" />
              </linearGradient>
            </defs>

            {/* Studio Desk Horizon */}
            <ellipse cx="320" cy="348" rx="250" ry="26" fill="rgba(0,0,0,0.55)" />

            {/* Detachable 45-degree Non-slip Stand */}
            <path
              d="M150 230 L490 230 L525 340 L115 340 Z"
              fill="url(#mk2StandGrad)"
              stroke="#3A4252"
              strokeWidth="2"
            />
            <rect x="135" y="332" width="370" height="8" rx="4" fill="#2858FF" opacity="0.55" />

            {/* Main MK.2 Angled Chassis Rear */}
            <rect
              x="120"
              y="56"
              width="400"
              height="230"
              rx="22"
              fill="url(#mk2RearBody)"
              stroke="#475166"
              strokeWidth="2.5"
            />

            {/* Subtle Elgato-style geometric rear recess */}
            <rect
              x="250"
              y="150"
              width="140"
              height="90"
              rx="10"
              fill="#0B0D12"
              stroke="#2C3342"
              strokeWidth="1.5"
            />
            {/* USB-C Female Port */}
            <rect
              x="298"
              y="182"
              width="44"
              height="16"
              rx="8"
              fill="#050608"
              stroke="#94A3B8"
              strokeWidth="2"
            />
            <rect x="308" y="188" width="24" height="4" rx="2" fill="#E4FF58" />

            {/* Braided Detachable USB-C Cable */}
            <path
              d="M320 198 L320 375"
              stroke="#1E2430"
              strokeWidth="14"
              strokeLinecap="round"
            />
            <path
              d="M320 198 L320 375"
              stroke="#3B4454"
              strokeWidth="10"
              strokeDasharray="4 6"
            />

            {/* Callout Badges */}
            <g transform="translate(148, 86)">
              <rect x="0" y="0" width="168" height="30" rx="6" fill="#111A31" stroke="#E4FF58" strokeWidth="1.5" />
              <text x="12" y="19" fill="#E4FF58" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                FIXED 45° DESK STAND
              </text>
            </g>
            <g transform="translate(358, 174)">
              <rect x="0" y="0" width="144" height="30" rx="6" fill="#111A31" stroke="#B6D7F7" strokeWidth="1.5" />
              <text x="12" y="19" fill="#E8F0FF" fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="700">
                DETACHABLE USB-C
              </text>
            </g>
          </svg>
        </div>
      );
    }

    return (
      <div
        className={`relative mx-auto select-none transition-transform duration-300 ${
          angle === 'STAND_45' ? 'perspective-[1100px]' : ''
        } ${isLarge ? 'max-w-[640px]' : compact ? 'max-w-[360px]' : 'max-w-[480px]'}`}
      >
        <div
          className={`relative rounded-[24px] p-5 sm:p-6 bg-gradient-to-br from-[#2B303C] via-[#181B22] to-[#0E1015] border border-[#495366]/80 shadow-[0_24px_48px_rgba(0,0,0,0.75),inset_0_1px_1px_rgba(255,255,255,0.22)] transition-transform duration-300 ${
            angle === 'STAND_45' ? 'rotate-x-[14deg] -rotate-y-[10deg] scale-[0.97]' : ''
          }`}
        >
          {/* Top Hardware Bezel Header */}
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#E8F0FF]/60" />
              <span className="text-[11px] font-sans font-semibold tracking-[0.18em] text-[#E8F0FF]/80 uppercase">
                ELGATO STREAM DECK MK.2
              </span>
            </div>
            <span className="text-[10px] cr-font-mono-code text-[#B6D7F7]/75">
              5 × 3 LCD MATRIX · 15 KEYS
            </span>
          </div>

          {/* Inner Removable Matte Faceplate Recess */}
          <div className="rounded-[16px] p-3 sm:p-4 bg-[#0D0F14] border border-[#272D3A] shadow-[inset_0_3px_10px_rgba(0,0,0,0.85)]">
            <div className="grid grid-cols-5 gap-2.5 sm:gap-3">
              {slots.slice(0, 15).map((slot) => {
                const action = getActionById(slot.actionId);
                const label = slot.customLabel || action.shortLabel;
                const iconId = slot.customIcon || action.icon;
                const isSelected = selectedSlotIndex === slot.slotIndex;

                return (
                  <button
                    key={slot.slotIndex}
                    type="button"
                    onClick={() => onSelectSlot?.(slot.slotIndex)}
                    aria-label={`Hardware preview key ${slot.slotIndex + 1}: ${label}`}
                    className={`group relative aspect-square rounded-[10px] p-1.5 flex flex-col items-center justify-between overflow-hidden transition-all duration-150 ${
                      isSelected
                        ? 'ring-2 ring-[#E4FF58] bg-gradient-to-b from-[#2858FF] to-[#132247] scale-[0.98]'
                        : 'bg-gradient-to-b from-[#1E263B] to-[#0F1420] hover:from-[#26324D] hover:to-[#131B2E]'
                    } border border-white/15 shadow-[0_4px_8px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.28)]`}
                  >
                    {/* Subtle optical glass keycap lens highlight */}
                    <span
                      className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent rounded-t-[9px]"
                      aria-hidden="true"
                    />
                    <span className="relative z-10 text-[8px] cr-font-mono-code text-[#B6D7F7]/70 self-start leading-none">
                      {String(slot.slotIndex + 1).padStart(2, '0')}
                    </span>
                    <div className="relative z-10 my-auto">
                      <PixelActionIcon
                        icon={iconId}
                        className={compact ? 'w-4 h-4' : 'w-5 h-5 sm:w-6 sm:h-6'}
                        color="#E8F0FF"
                      />
                    </div>
                    <span className="relative z-10 w-full truncate text-center text-[8px] sm:text-[9px] cr-font-mono-code font-bold text-[#E8F0FF] tracking-tight leading-none">
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stand Base Lip */}
          <div className="mt-3 flex items-center justify-between px-2 text-[10px] cr-font-mono-code text-[#B6D7F7]/70">
            <span>REMOVABLE FACEPLATE</span>
            <span>USB-C DETACHABLE</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-3">
      {/* Angle & Inspection Toolbar */}
      {showAngleSwitcher && (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1 bg-[#0C1326] p-1 border border-[#61728F]/50">
            <button
              type="button"
              onClick={() => setAngle('FRONTAL')}
              className={`px-2.5 py-1 text-[11px] cr-font-mono-code font-bold whitespace-nowrap shrink-0 transition-colors ${
                angle === 'FRONTAL'
                  ? 'bg-[#2858FF] text-[#E8F0FF]'
                  : 'text-[#B6D7F7] hover:text-[#E8F0FF]'
              }`}
            >
              FRONTAL 5×3
            </button>
            <button
              type="button"
              onClick={() => setAngle('STAND_45')}
              className={`px-2.5 py-1 text-[11px] cr-font-mono-code font-bold whitespace-nowrap shrink-0 transition-colors ${
                angle === 'STAND_45'
                  ? 'bg-[#2858FF] text-[#E8F0FF]'
                  : 'text-[#B6D7F7] hover:text-[#E8F0FF]'
              }`}
            >
              45° STAND ANGLE
            </button>
            <button
              type="button"
              onClick={() => setAngle('REAR_DETAIL')}
              className={`px-2.5 py-1 text-[11px] cr-font-mono-code font-bold whitespace-nowrap shrink-0 transition-colors ${
                angle === 'REAR_DETAIL'
                  ? 'bg-[#2858FF] text-[#E8F0FF]'
                  : 'text-[#B6D7F7] hover:text-[#E8F0FF]'
              }`}
            >
              USB-C & STAND
            </button>
          </div>

          <button
            type="button"
            onClick={() => setZoomOpen(true)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] cr-font-mono-code font-bold bg-[#111A31] text-[#E4FF58] border border-[#E4FF58]/60 hover:bg-[#E4FF58] hover:text-[#111A31] transition-colors whitespace-nowrap shrink-0"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>ZOOM HARDWARE</span>
          </button>
        </div>
      )}

      {/* Main High-Clarity Hardware Stage */}
      <div className="relative rounded-none bg-gradient-to-b from-[#162242] to-[#0C1326] border-2 border-[#61728F]/60 p-4 sm:p-5">
        {renderHardwareChassis(false)}

        {/* Interactive Feature Callout Pills */}
        {!compact && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 pt-3 border-t border-[#61728F]/30">
            {callouts.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveCallout(activeCallout === idx ? null : idx)}
                className={`text-left p-2.5 border transition-colors ${
                  activeCallout === idx
                    ? 'bg-[#2858FF]/25 border-[#E4FF58] text-[#E8F0FF]'
                    : 'bg-[#111A31]/80 border-[#61728F]/40 text-[#B6D7F7] hover:border-[#B6D7F7]'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] cr-font-mono-code font-bold text-[#E4FF58]">
                  <span>0{item.id}. SPEC FACT</span>
                  {idx === 0 ? (
                    <Sliders className="w-3.5 h-3.5" />
                  ) : idx === 1 ? (
                    <Layers className="w-3.5 h-3.5" />
                  ) : (
                    <Usb className="w-3.5 h-3.5" />
                  )}
                </div>
                <div className="mt-1 text-xs font-semibold text-[#E8F0FF]">{item.title}</div>
                {activeCallout === idx && (
                  <p className="mt-1.5 text-[11px] text-[#B6D7F7] leading-relaxed">{item.detail}</p>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Hardware Zoom Modal */}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-[120] bg-[#111A31]/90 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Stream Deck MK.2 Hardware Inspection Lightbox"
        >
          <div className="w-full max-w-3xl bg-[#111A31] border-2 border-[#E4FF58] cr-shadow-ctrl-lg p-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#61728F]/50">
              <div>
                <h3 className="cr-font-display text-lg font-bold text-[#E8F0FF]">
                  ELGATO STREAM DECK MK.2 — HARDWARE INSPECTION
                </h3>
                <p className="text-xs text-[#B6D7F7]">
                  15 customizable LCD keys (5 columns × 3 rows) · Interchangeable faceplate · Detachable USB-C · Fixed 45° stand
                </p>
              </div>
              <button
                type="button"
                onClick={() => setZoomOpen(false)}
                aria-label="Close hardware zoom modal"
                className="px-3 py-1.5 bg-[#FC5FA9] text-[#111A31] cr-font-mono-code text-xs font-bold hover:bg-[#E4FF58] transition-colors"
              >
                <span className="inline-flex items-center gap-1">
                  <X className="w-4 h-4" /> CLOSE
                </span>
              </button>
            </div>

            <div className="py-4">{renderHardwareChassis(true)}</div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {callouts.map((c) => (
                <div key={c.id} className="p-3 bg-[#172342] border border-[#61728F]/50">
                  <div className="flex items-center gap-1.5 cr-font-mono-code font-bold text-[#E4FF58]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{c.title}</span>
                  </div>
                  <p className="mt-1 text-[#B6D7F7] leading-relaxed">{c.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
