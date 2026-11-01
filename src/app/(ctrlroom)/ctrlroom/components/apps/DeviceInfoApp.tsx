'use client';
import React from 'react';
import { ExternalLink, Check } from 'lucide-react';
import { DeckSlotConfig } from '../../lib/os/types';
import { StreamDeckHardwareView } from '../hardware/StreamDeckHardwareView';

interface DeviceInfoAppProps {
  slots: DeckSlotConfig[];
  selectedSlotIndex: number;
  onSelectSlot: (idx: number) => void;
}

export const DeviceInfoApp: React.FC<DeviceInfoAppProps> = ({
  slots,
  selectedSlotIndex,
  onSelectSlot,
}) => {
  const verifiedFacts = [
    '15 customizable LCD keys arranged in a 5 columns × 3 rows matrix',
    'Instant visual feedback on every key face for actions, folders, and toggles',
    'Interchangeable removable faceplate for clean customization',
    'Detachable USB-C cable and weighted non-slip 45° desk stand included',
    'Works with official Elgato Stream Deck software on macOS and Windows',
  ];

  return (
    <div className="space-y-3">
      <div className="p-2.5 bg-[#0C1326] border border-[#2858FF]">
        <div className="cr-font-mono-code text-[10px] font-bold text-[#E4FF58]">
          REAL FEATURED PRODUCT · BY ELGATO
        </div>
        <h3 className="cr-font-display text-base font-bold text-[#E8F0FF]">
          MEET THE BUTTONS BEHIND THE MAGIC.
        </h3>
        <p className="text-xs text-[#B6D7F7] mt-0.5">
          15 customizable LCD keys. A hardware control surface ready to become part of your workflow.
        </p>
      </div>

      {/* Interactive High-Clarity Hardware Viewer */}
      <StreamDeckHardwareView
        slots={slots}
        selectedSlotIndex={selectedSlotIndex}
        onSelectSlot={onSelectSlot}
        compact={true}
        showAngleSwitcher={true}
      />

      {/* Verified Specification List */}
      <div className="p-3 bg-[#15203D] border border-[#61728F] space-y-1.5">
        <div className="cr-font-mono-code text-[11px] font-bold text-[#E4FF58]">
          VERIFIED STREAM DECK MK.2 HARDWARE FACTS
        </div>
        <ul className="space-y-1 text-xs text-[#E8F0FF]">
          {verifiedFacts.map((fact) => (
            <li key={fact} className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-[#E4FF58] shrink-0 mt-0.5" />
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Primary Manufacturer CTA & Comparison Link */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
        <a
          href="https://www.elgato.com/us/en/p/stream-deck"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs cr-font-mono-code font-bold bg-[#E4FF58] text-[#111A31] hover:bg-[#E8F0FF] border-2 border-[#111A31] cr-shadow-ctrl-cobalt transition-colors whitespace-nowrap shrink-0"
        >
          <span>EXPLORE STREAM DECK MK.2</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

        <a
          href="https://www.elgato.com/ww/en/explorer/products/stream-deck/stream-deck-device-comparison/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] cr-font-mono-code text-[#B6D7F7] hover:text-[#E4FF58] underline underline-offset-4 whitespace-nowrap shrink-0"
        >
          <span>Official Device Comparison</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <p className="text-[10px] cr-font-mono-code text-[#B6D7F7] leading-relaxed border-t border-[#61728F]/40 pt-2">
        CTRL/ROOM is an independent fictional creative concept featuring Stream Deck MK.2 by Elgato. Not affiliated with or endorsed by Elgato.
      </p>
    </div>
  );
};
