'use client';

import React from 'react';
import RoomCanvas from './RoomCanvas';
import FurnitureControls from './FurnitureControls';
import {
  FURNITURE_CATALOG,
  type FloorPlanData,
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

interface RoomStudioProps {
  plan: FloorPlanData;
  modules: FurniturePiece[];
  selectedId: string | null;
  selectedPiece: FurniturePiece | null;
  selectedCatalog: FurnitureCatalogEntry | null;
  activePresetId: string;
  metrics: RoomMetrics;
  status: StudioStatusMessage;
  copiedRecently: boolean;
  hoveredPreview: {
    x: number;
    y: number;
    w: number;
    h: number;
    valid: boolean;
  } | null;
  onSelectModule: (id: string | null) => void;
  onMoveSelected: (dx: number, dy: number) => void;
  onRotateSelected: () => void;
  onPlaceSelectedAt: (x: number, y: number) => void;
  onHoverCell: (cell: { x: number; y: number } | null) => void;
  onApplyPreset: (presetId: string) => void;
  onResetArrangement: () => void;
  onCopyConfiguration: () => void;
}

export default function RoomStudio({
  plan,
  modules,
  selectedId,
  selectedPiece,
  selectedCatalog,
  activePresetId,
  metrics,
  status,
  copiedRecently,
  hoveredPreview,
  onSelectModule,
  onMoveSelected,
  onRotateSelected,
  onPlaceSelectedAt,
  onHoverCell,
  onApplyPreset,
  onResetArrangement,
  onCopyConfiguration,
}: RoomStudioProps) {
  return (
    <section
      id="room-studio"
      aria-labelledby="room-studio-heading"
      className="relative w-full border-b border-[#262824]/15 bg-[#ECE7DC] py-20 md:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Top Section Datum Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#262824]/20 pb-4 font-drafting text-[11px] tracking-[0.14em] text-[#777974] uppercase">
          <span>02 / INTERACTIVE ROOM DESIGN STUDIO</span>
          <span className="hidden md:inline">
            PLAN 12 × 8 LOGICAL CELLS · COLLISION-VALIDATED GEOMETRY
          </span>
          <span>REF. 12-ROOM-FLOOR-PLAN</span>
        </div>

        {/* Section Header */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <p className="font-ui text-[11px] font-medium tracking-[0.18em] text-[#777974] uppercase">
              SPATIAL ARRANGEMENT WORKSHOP
            </p>
            <h2
              id="room-studio-heading"
              style={{ textWrap: 'balance' }}
              className="mt-3 font-editorial text-[38px] sm:text-[46px] md:text-[56px] font-normal leading-[1.0] tracking-[0.01em] text-[#262824] uppercase"
            >
              COMPOSE THE ROOM AROUND HOW YOU LIVE.
            </h2>
          </div>

          <div className="lg:col-span-5">
            <p className="font-ui text-[15px] leading-[1.65] text-[#262824]/80">
              Test proportion, sightlines, and circulation across a 12 × 8 architectural grid.
              Select any piece to reposition by keyboard arrow keys, directional controls, or direct
              cell placement—while entry clearances and fixed fixtures remain protected.
            </p>
          </div>
        </div>

        {/* Main Studio Workspace: Left Drafting Canvas (7 cols) + Right Planning Controls (5 cols) */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <RoomCanvas
              plan={plan}
              modules={modules}
              selectedId={selectedId}
              hoveredPreview={hoveredPreview}
              collidingCells={status.collidingCells}
              onSelectModule={onSelectModule}
              onMoveSelected={onMoveSelected}
              onRotateSelected={onRotateSelected}
              onPlaceSelectedAt={onPlaceSelectedAt}
              onHoverCell={onHoverCell}
            />

            {/* Live Coordinate Ledger Bar under the Canvas */}
            <div className="mt-4 border border-[#262824]/20 bg-[#F5F2EA] px-5 py-3.5">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#262824]/15 pb-2 font-drafting text-[10px] tracking-[0.14em] text-[#777974] uppercase">
                <span>LIVE ARCHITECTURAL SCHEDULE</span>
                <span>CLICK ANY ENTRY TO SELECT</span>
              </div>
              <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-5 gap-3">
                {modules.map((m) => {
                  const fp = getFootprint(m);
                  const cat = FURNITURE_CATALOG[m.id];
                  const isActive = selectedId === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => onSelectModule(m.id)}
                      className={`text-left p-2 border transition-colors cursor-pointer ${
                        isActive
                          ? 'border-[#262824] bg-[#EAE3D5]'
                          : 'border-transparent hover:border-[#262824]/25'
                      }`}
                    >
                      <div className="flex items-center justify-between font-drafting text-[10px] text-[#777974]">
                        <span>{cat?.index ?? '00'}</span>
                        <span>
                          {formatColumnNumber(m.x)}
                          {formatRowLetter(m.y)}
                        </span>
                      </div>
                      <p className="mt-0.5 font-ui text-[11.5px] font-semibold tracking-[0.08em] text-[#262824] uppercase truncate">
                        {cat?.shortName ?? m.id}
                      </p>
                      <p className="font-drafting text-[10px] text-[#262824]/75">
                        {fp.w}×{fp.h} · {m.rotation}°
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex">
            <FurnitureControls
              modules={modules}
              selectedId={selectedId}
              selectedPiece={selectedPiece}
              selectedCatalog={selectedCatalog}
              activePresetId={activePresetId}
              metrics={metrics}
              status={status}
              copiedRecently={copiedRecently}
              onSelectModule={onSelectModule}
              onMoveSelected={onMoveSelected}
              onRotateSelected={onRotateSelected}
              onApplyPreset={onApplyPreset}
              onResetArrangement={onResetArrangement}
              onCopyConfiguration={onCopyConfiguration}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
