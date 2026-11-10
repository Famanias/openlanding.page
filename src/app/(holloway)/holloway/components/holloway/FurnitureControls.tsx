'use client';

import React from 'react';
import {
  FURNITURE_CATALOG,
  ORDERED_FURNITURE_IDS,
  ROOM_PRESETS,
  type FurnitureCatalogEntry,
  type FurniturePiece,
} from '../../lib/holloway/floorPlan';
import {
  formatColumnNumber,
  formatRowLetter,
  getFootprint,
  type RoomMetrics,
} from '../../lib/holloway/collision';
import type { StudioStatusMessage } from '../../lib/holloway/useRoomStudio';

interface FurnitureControlsProps {
  modules: FurniturePiece[];
  selectedId: string | null;
  selectedPiece: FurniturePiece | null;
  selectedCatalog: FurnitureCatalogEntry | null;
  activePresetId: string;
  metrics: RoomMetrics;
  status: StudioStatusMessage;
  copiedRecently: boolean;
  onSelectModule: (id: string | null) => void;
  onMoveSelected: (dx: number, dy: number) => void;
  onRotateSelected: () => void;
  onApplyPreset: (presetId: string) => void;
  onResetArrangement: () => void;
  onCopyConfiguration: () => void;
}

export default function FurnitureControls({
  modules,
  selectedId,
  selectedPiece,
  selectedCatalog,
  activePresetId,
  metrics,
  status,
  copiedRecently,
  onSelectModule,
  onMoveSelected,
  onRotateSelected,
  onApplyPreset,
  onResetArrangement,
  onCopyConfiguration,
}: FurnitureControlsProps) {
  const activeFootprint = selectedPiece ? getFootprint(selectedPiece) : null;

  return (
    <div className="flex w-full flex-col justify-between border border-[#262824]/25 bg-[#EFECE3] p-5 md:p-6">
      <div>
        {/* Studio Control Header */}
        <div className="flex items-center justify-between border-b border-[#262824]/20 pb-3 font-drafting text-[11px] tracking-[0.14em] text-[#262824] uppercase">
          <span>ARCHITECTURAL PLANNING TABLE</span>
          <span className="text-[#777974]">{metrics.openPercentage}% OPEN FLOOR</span>
        </div>

        {/* 1. Furniture Module Selector Strip */}
        <div className="mt-4">
          <p className="font-drafting text-[10px] tracking-[0.14em] text-[#777974] uppercase mb-2">
            01 / SELECT MODULE TO ARRANGE
          </p>
          <div
            role="group"
            aria-label="Select furniture piece"
            className="grid grid-cols-1 gap-1.5"
          >
            {ORDERED_FURNITURE_IDS.map((id) => {
              const cat = FURNITURE_CATALOG[id];
              const piece = modules.find((m) => m.id === id);
              const isSelected = selectedId === id;
              const fp = piece ? getFootprint(piece) : { w: 1, h: 1 };

              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => onSelectModule(id)}
                  aria-pressed={isSelected}
                  className={`flex items-center justify-between gap-3 px-3 py-2 border text-left transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#262824] ${
                    isSelected
                      ? 'border-[#262824] bg-[#262824] text-[#F5F2EA]'
                      : 'border-[#262824]/20 bg-[#F5F2EA] text-[#262824] hover:border-[#262824]/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      aria-hidden="true"
                      className="inline-block h-2.5 w-2.5 shrink-0 border border-current/30"
                      style={{ backgroundColor: cat.swatchHex }}
                    />
                    <span className="font-drafting text-[10.5px] opacity-75 shrink-0">
                      {cat.index}
                    </span>
                    <span className="font-ui text-[11.5px] font-medium tracking-[0.1em] uppercase truncate">
                      {cat.shortName}
                    </span>
                  </div>

                  {piece && (
                    <span className="font-drafting text-[10.5px] opacity-80 whitespace-nowrap shrink-0">
                      {formatColumnNumber(piece.x)}
                      {formatRowLetter(piece.y)} · {fp.w}×{fp.h} · {piece.rotation}°
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Selected Module Scale-Model Preview & Telemetry */}
        {selectedPiece && selectedCatalog && activeFootprint ? (
          <div className="mt-4 border border-[#262824]/20 bg-[#F5F2EA] p-3.5">
            <div className="grid grid-cols-12 gap-3.5 items-center">
              <div className="col-span-3 aspect-square overflow-hidden border border-[#262824]/15 bg-[#EAE4D7]">
                <img
                  src={selectedCatalog.imageUrl}
                  alt={selectedCatalog.fullName}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="col-span-9 space-y-1">
                <div className="flex items-center justify-between font-drafting text-[10px] text-[#777974]">
                  <span>{selectedCatalog.code}</span>
                  <span>
                    GRID {formatColumnNumber(selectedPiece.x)}
                    {formatRowLetter(selectedPiece.y)}
                  </span>
                </div>
                <h3 className="font-editorial text-[20px] font-medium leading-tight text-[#262824]">
                  {selectedCatalog.fullName}
                </h3>
                <p className="font-ui text-[11.5px] leading-[1.4] text-[#262824]/75">
                  {selectedCatalog.dimensionsMetric}
                </p>
                <div className="pt-0.5 flex items-center gap-3 font-drafting text-[10px] text-[#262824]">
                  <span>
                    FOOTPRINT: {activeFootprint.w} × {activeFootprint.h}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>AXIS: {selectedPiece.rotation}°</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-4 border border-[#262824]/20 bg-[#F5F2EA] p-3.5 font-ui text-[12.5px] text-[#777974]">
            Select any module from the list above or on the floor plan to inspect and position it.
          </div>
        )}

        {/* 3. Spatial Placement & Rotation Controls */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="font-drafting text-[10px] tracking-[0.14em] text-[#777974] uppercase">
              02 / POSITION & ORIENTATION
            </p>
            <span className="font-drafting text-[10px] text-[#777974]">STEP = 1 LOGICAL CELL</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            <button
              type="button"
              onClick={() => onMoveSelected(0, -1)}
              disabled={!selectedPiece}
              aria-label="Move selected furniture up (North)"
              className="py-2 px-2.5 border border-[#262824]/30 bg-[#F5F2EA] font-drafting text-[10.5px] text-[#262824] hover:bg-[#262824] hover:text-[#F5F2EA] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              ↑ NORTH
            </button>
            <button
              type="button"
              onClick={() => onMoveSelected(-1, 0)}
              disabled={!selectedPiece}
              aria-label="Move selected furniture left (West)"
              className="py-2 px-2.5 border border-[#262824]/30 bg-[#F5F2EA] font-drafting text-[10.5px] text-[#262824] hover:bg-[#262824] hover:text-[#F5F2EA] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              ← WEST
            </button>
            <button
              type="button"
              onClick={() => onMoveSelected(0, 1)}
              disabled={!selectedPiece}
              aria-label="Move selected furniture down (South)"
              className="py-2 px-2.5 border border-[#262824]/30 bg-[#F5F2EA] font-drafting text-[10.5px] text-[#262824] hover:bg-[#262824] hover:text-[#F5F2EA] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              ↓ SOUTH
            </button>
            <button
              type="button"
              onClick={() => onMoveSelected(1, 0)}
              disabled={!selectedPiece}
              aria-label="Move selected furniture right (East)"
              className="py-2 px-2.5 border border-[#262824]/30 bg-[#F5F2EA] font-drafting text-[10.5px] text-[#262824] hover:bg-[#262824] hover:text-[#F5F2EA] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              → EAST
            </button>
          </div>

          <div className="mt-1.5 grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={onRotateSelected}
              disabled={!selectedPiece}
              className="py-2 px-2.5 border border-[#262824] bg-[#262824] text-[#F5F2EA] font-ui text-[10.5px] font-medium tracking-[0.12em] uppercase hover:bg-[#3A3D37] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              ROTATE 90°
            </button>
            <button
              type="button"
              onClick={onResetArrangement}
              className="py-2 px-2.5 border border-[#262824]/30 bg-[#F5F2EA] text-[#262824] font-ui text-[10.5px] font-medium tracking-[0.12em] uppercase hover:border-[#262824] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              RESET
            </button>
            <button
              type="button"
              onClick={onCopyConfiguration}
              className="py-2 px-2.5 border border-[#262824]/30 bg-[#F5F2EA] text-[#262824] font-ui text-[10.5px] font-medium tracking-[0.12em] uppercase hover:border-[#262824] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              {copiedRecently ? 'COPIED ✓' : 'COPY SPEC'}
            </button>
          </div>
        </div>

        {/* 4. Architectural Room Presets */}
        <div className="mt-4 border-t border-[#262824]/15 pt-4">
          <p className="font-drafting text-[10px] tracking-[0.14em] text-[#777974] uppercase mb-2">
            03 / SPATIAL STUDIES (PRESET COMPOSITIONS)
          </p>
          <div className="grid grid-cols-1 gap-1.5">
            {ROOM_PRESETS.map((preset) => {
              const isCurrent = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onApplyPreset(preset.id)}
                  className={`w-full text-left px-3 py-2 border transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                    isCurrent
                      ? 'border-[#262824] bg-[#E3DDD0] text-[#262824]'
                      : 'border-[#262824]/15 bg-[#F5F2EA]/70 text-[#262824]/80 hover:border-[#262824]/45'
                  }`}
                >
                  <div className="min-w-0">
                    <span className="font-drafting text-[10px] text-[#777974] mr-2">
                      {preset.index}
                    </span>
                    <span className="font-ui text-[11.5px] font-medium tracking-[0.06em] uppercase">
                      {preset.name}
                    </span>
                  </div>
                  <span className="font-drafting text-[10px] text-[#777974] truncate">
                    {preset.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Live Placement Feedback & Collision Readout */}
      <div
        aria-live="polite"
        className={`mt-4 border-t pt-3 font-drafting text-[10.5px] leading-[1.45] ${
          status.tone === 'rejected'
            ? 'border-[#874C54] text-[#874C54]'
            : status.tone === 'valid'
            ? 'border-[#262824]/30 text-[#262824]'
            : 'border-[#262824]/20 text-[#777974]'
        }`}
      >
        <div className="flex items-center justify-between text-[9.5px] tracking-[0.14em] uppercase mb-1">
          <span>
            {status.tone === 'rejected'
              ? 'PLACEMENT REJECTED — COLLISION RULE'
              : 'STUDIO READOUT'}
          </span>
          <span>
            OCCUPIED: {metrics.occupiedCount}/{metrics.totalCells - metrics.blockedCount} CELLS
          </span>
        </div>
        <p>{status.text}</p>
      </div>
    </div>
  );
}
