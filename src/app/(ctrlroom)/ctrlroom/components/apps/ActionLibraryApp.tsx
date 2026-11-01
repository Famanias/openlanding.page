'use client';
import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { ACTION_LIBRARY } from '../../lib/os/actions';
import { getSlotRowCol } from '../../lib/os/simulator';
import { ActionCategory, DeckSlotConfig } from '../../lib/os/types';
import { PixelActionIcon } from '../icons/PixelSprites';

interface ActionLibraryAppProps {
  selectedSlotIndex: number;
  slots: DeckSlotConfig[];
  onAssignAction: (slotIndex: number, actionId: string) => void;
  onSelectSlot: (slotIndex: number) => void;
}

export const ActionLibraryApp: React.FC<ActionLibraryAppProps> = ({
  selectedSlotIndex,
  slots,
  onAssignAction,
  onSelectSlot,
}) => {
  const [category, setCategory] = useState<'ALL' | ActionCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredActionId, setHoveredActionId] = useState<string | null>(null);

  const { row, col } = getSlotRowCol(selectedSlotIndex);
  const currentSlot = slots[selectedSlotIndex] || slots[0];

  const filteredActions = ACTION_LIBRARY.filter((item) => {
    const matchesCat = category === 'ALL' || item.category === category;
    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const hoveredAction =
    ACTION_LIBRARY.find((a) => a.id === hoveredActionId) ||
    ACTION_LIBRARY.find((a) => a.id === currentSlot.actionId) ||
    ACTION_LIBRARY[0];

  return (
    <div className="space-y-3">
      {/* Header & Target Slot Selector */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#0C1326] border border-[#2858FF]">
        <div>
          <div className="text-[10px] cr-font-mono-code font-bold text-[#E4FF58]">
            YOUR WORKFLOW, ONE PRESS AWAY.
          </div>
          <p className="text-xs text-[#B6D7F7]">
            Click any action tile below to patch it into{' '}
            <strong className="text-[#E8F0FF]">
              Slot {String(selectedSlotIndex + 1).padStart(2, '0')} (Row {row}, Col {col})
            </strong>
            .
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          <label htmlFor="target-slot-select" className="text-[10px] cr-font-mono-code text-[#B6D7F7]">
            TARGET SLOT:
          </label>
          <select
            id="target-slot-select"
            value={selectedSlotIndex}
            onChange={(e) => onSelectSlot(Number(e.target.value))}
            className="px-2 py-1 text-xs cr-font-mono-code font-bold bg-[#162344] text-[#E4FF58] border border-[#E4FF58]"
          >
            {slots.map((s) => {
              const coords = getSlotRowCol(s.slotIndex);
              return (
                <option key={s.slotIndex} value={s.slotIndex}>
                  Slot {String(s.slotIndex + 1).padStart(2, '0')} (R{coords.row}·C{coords.col})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Category Filter Tabs & Search */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1 bg-[#0C1326] p-1 border border-[#61728F]">
          {(['ALL', 'CREATE', 'STREAM', 'ORGANIZE', 'EXPLORE'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-2.5 py-1 text-[11px] cr-font-mono-code font-bold transition-colors whitespace-nowrap shrink-0 ${
                category === cat
                  ? 'bg-[#2858FF] text-[#E8F0FF]'
                  : 'text-[#B6D7F7] hover:text-[#E8F0FF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          type="search"
          placeholder="Filter actions..."
          aria-label="Filter actions by keyword"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-2.5 py-1 text-xs cr-font-mono-code bg-[#0C1326] text-[#E8F0FF] border border-[#61728F] focus:border-[#E4FF58] focus:outline-none"
        />
      </div>

      {/* Modular Action Tiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
        {filteredActions.map((action) => {
          const isAssignedToCurrent = currentSlot.actionId === action.id;

          return (
            <div
              key={action.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', action.id);
              }}
              onMouseEnter={() => setHoveredActionId(action.id)}
              className={`p-2.5 border-2 cr-transition-control flex items-start justify-between gap-2.5 ${
                isAssignedToCurrent
                  ? 'bg-[#2858FF]/30 border-[#E4FF58]'
                  : 'bg-[#15203D] border-[#61728F]/60 hover:border-[#2858FF]'
              }`}
            >
              <div className="flex items-start gap-2.5 min-w-0">
                <div className="p-2 bg-[#0C1326] border border-[#2858FF] shrink-0">
                  <PixelActionIcon icon={action.icon} className="w-5 h-5" color="#E4FF58" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="cr-font-mono-code text-xs font-bold text-[#E8F0FF] truncate">
                      {action.title}
                    </span>
                    <span className="text-[10px] cr-font-mono-code text-[#B6D7F7]">
                      · {action.category}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-[#B6D7F7] line-clamp-2">
                    {action.description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onAssignAction(selectedSlotIndex, action.id)}
                aria-label={`Assign ${action.title} to Slot ${selectedSlotIndex + 1}`}
                className={`px-2.5 py-1.5 text-[10px] cr-font-mono-code font-bold whitespace-nowrap shrink-0 transition-colors ${
                  isAssignedToCurrent
                    ? 'bg-[#E4FF58] text-[#111A31]'
                    : 'bg-[#2858FF] text-[#E8F0FF] hover:bg-[#E4FF58] hover:text-[#111A31]'
                }`}
              >
                {isAssignedToCurrent ? (
                  <span className="inline-flex items-center gap-1">
                    <Check className="w-3 h-3" /> PATCHED
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1">
                    ASSIGN <ArrowRight className="w-3 h-3" />
                  </span>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Real-World Hardware Mapping Tooltip Box */}
      <div className="p-2.5 bg-[#0C1326] border border-[#61728F] text-xs space-y-1">
        <div className="flex items-center justify-between cr-font-mono-code text-[10px] text-[#E4FF58]">
          <span className="inline-flex items-center gap-1 font-bold">
            <Sparkles className="w-3 h-3" /> HOW THIS MAPS TO REAL HARDWARE: {hoveredAction.title}
          </span>
          <span className="text-[#B6D7F7]">WEB DEMO TILE</span>
        </div>
        <p className="text-[11px] text-[#E8F0FF]">{hoveredAction.realWorldMapping}</p>
        <p className="text-[10px] text-[#B6D7F7]">
          Note: These tiles are illustrative browser simulations and do not claim to be bundled native Elgato plugins.
        </p>
      </div>
    </div>
  );
};
