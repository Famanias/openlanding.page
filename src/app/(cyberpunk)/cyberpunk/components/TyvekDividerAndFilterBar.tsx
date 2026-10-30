import React, { useEffect, useState } from 'react';
import { FilterCategory, SortOption } from '../utils/storeLogic';

interface TyvekDividerAndFilterBarProps {
  activeCategory: FilterCategory;
  onCategoryChange: (cat: FilterCategory) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const CATEGORY_TABS: { key: FilterCategory; label: string }[] = [
  { key: 'all', label: '[ALL ARCHIVE (10)]' },
  { key: 'shells', label: '[OUTER SHELLS (03)]' },
  { key: 'bottoms', label: '[PANTS & BOTTOMS (03)]' },
  { key: 'gear', label: '[BAGS & FOOTWEAR (04)]' },
];

const SORT_OPTIONS: SortOption[] = [
  'PRICE: LOW-HIGH',
  'WEIGHT: LIGHTEST',
  'WATERPROOF RATING',
];

export const TyvekDividerAndFilterBar: React.FC<TyvekDividerAndFilterBarProps> = ({
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
}) => {
  // Live countdown starting from 04D : 18H : 42M : 19S (= 412939 seconds)
  const [secondsLeft, setSecondsLeft] = useState<number>(
    4 * 86400 + 18 * 3600 + 42 * 60 + 19
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const days = String(Math.floor(secondsLeft / 86400)).padStart(2, '0');
  const hours = String(Math.floor((secondsLeft % 86400) / 3600)).padStart(2, '0');
  const mins = String(Math.floor((secondsLeft % 3600) / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');

  return (
    <>
      {/* Tyvek Care-Label Seam Divider */}
      <div
        role="region"
        aria-label="Tyvek Industrial Garment Care Tag"
        className="w-full tyvek-surface text-[#090B0E] border-y-2 border-dashed border-[#090B0E]/40 py-3 px-4 lg:px-8 select-none"
      >
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-4 font-mono-tech text-xs font-semibold tracking-wider">
          <div className="flex items-center gap-3">
            <span className="bg-[#090B0E] text-[#F1F5F9] px-2 py-0.5 font-bold">
              TYVEK® SPEC-TAG
            </span>
            <span>BATCH_ID: KNX-2026-09 // DO NOT IRON MEMBRANE</span>
          </div>

          {/* ISO Laundry Care SVG Icons */}
          <div className="flex items-center gap-4" aria-label="ISO Care Symbols">
            {/* Wash 30C */}
            <svg width="22" height="18" viewBox="0 0 24 20" fill="none" stroke="#090B0E" strokeWidth="1.8">
              <path d="M2 6l2 12h16l2-12" />
              <path d="M2 8c3 2 6-2 10 0s7-2 10 0" />
              <text x="7" y="16" fontSize="6.5" fill="#090B0E" stroke="none" fontWeight="bold">
                30
              </text>
            </svg>
            {/* Do Not Bleach (Triangle with X) */}
            <svg width="20" height="18" viewBox="0 0 22 20" fill="none" stroke="#090B0E" strokeWidth="1.8">
              <polygon points="11,2 20,18 2,18" />
              <line x1="5" y1="6" x2="17" y2="18" />
              <line x1="17" y1="6" x2="5" y2="18" />
            </svg>
            {/* Do Not Iron (Iron with X) */}
            <svg width="22" height="18" viewBox="0 0 24 20" fill="none" stroke="#090B0E" strokeWidth="1.8">
              <path d="M6 6h10l4 10H3c0-4 2-6 5-6h10" />
              <line x1="6" y1="4" x2="18" y2="18" />
              <line x1="18" y1="4" x2="6" y2="18" />
            </svg>
            {/* Do Not Dry Clean (Circle with X) */}
            <svg width="20" height="18" viewBox="0 0 20 20" fill="none" stroke="#090B0E" strokeWidth="1.8">
              <circle cx="10" cy="10" r="7" />
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </svg>
          </div>

          {/* Batch Barcode & Telemetry */}
          <div className="flex items-center gap-3">
            <svg
              width="96"
              height="20"
              viewBox="0 0 96 20"
              fill="#090B0E"
              aria-hidden="true"
            >
              <rect x="0" y="2" width="3" height="16" />
              <rect x="5" y="2" width="1.5" height="16" />
              <rect x="9" y="2" width="4" height="16" />
              <rect x="15" y="2" width="2" height="16" />
              <rect x="19" y="2" width="1" height="16" />
              <rect x="23" y="2" width="5" height="16" />
              <rect x="30" y="2" width="2" height="16" />
              <rect x="34" y="2" width="1.5" height="16" />
              <rect x="38" y="2" width="3.5" height="16" />
              <rect x="44" y="2" width="1.5" height="16" />
              <rect x="48" y="2" width="4" height="16" />
              <rect x="54" y="2" width="2" height="16" />
              <rect x="58" y="2" width="1" height="16" />
              <rect x="61" y="2" width="4.5" height="16" />
              <rect x="68" y="2" width="2" height="16" />
              <rect x="72" y="2" width="3" height="16" />
              <rect x="77" y="2" width="1.5" height="16" />
              <rect x="81" y="2" width="4" height="16" />
              <rect x="87" y="2" width="2" height="16" />
              <rect x="91" y="2" width="3.5" height="16" />
            </svg>
            <span className="text-[11px]">ISO-811 // ePTFE-3L</span>
          </div>
        </div>
      </div>

      {/* Sticky Filter & Drop Bar */}
      <div className="sticky top-16 z-30 w-full bg-[#090B0E]/95 backdrop-blur-md border-b border-[rgba(226,232,240,0.14)]">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          {/* Live Countdown Timer */}
          <div className="flex items-center gap-2 font-mono-tech text-xs whitespace-nowrap">
            <span className="text-[#FF7A00] font-bold">
              DROP 04 CLOSES IN: {days}D : {hours}H : {mins}M : {secs}S
            </span>
          </div>

          {/* Category Filter Tabs */}
          <div
            role="tablist"
            aria-label="Product Category Filter"
            className="flex flex-wrap items-center gap-1.5"
          >
            {CATEGORY_TABS.map((tab) => {
              const active = activeCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => onCategoryChange(tab.key)}
                  className={`px-3 py-1.5 font-mono-tech text-xs transition-colors whitespace-nowrap cursor-pointer ${
                    active
                      ? 'bg-[#00F0FF] text-[#090B0E] font-bold'
                      : 'bg-[#11161D] text-[#94A3B8] hover:text-[#F8FAFC] border border-[rgba(226,232,240,0.14)]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 font-mono-tech text-xs shrink-0">
            <label htmlFor="archive-sort-select" className="text-[#94A3B8] whitespace-nowrap">
              SORT BY:
            </label>
            <select
              id="archive-sort-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-[#11161D] text-[#F8FAFC] border border-[rgba(226,232,240,0.14)] focus:border-[#00F0FF] px-3 py-1.5 font-mono-tech text-xs outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
};
