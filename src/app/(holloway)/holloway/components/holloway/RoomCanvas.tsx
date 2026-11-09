'use client';

import React, { useState } from 'react';
import {
  FURNITURE_CATALOG,
  HOLLOWAY_ASSETS,
  type FloorPlanData,
  type FurniturePiece,
} from '../../lib/holloway/floorPlan';
import {
  formatColumnNumber,
  formatRowLetter,
  getFootprint,
} from '../../lib/holloway/collision';

interface RoomCanvasProps {
  plan: FloorPlanData;
  modules: FurniturePiece[];
  selectedId: string | null;
  hoveredPreview: {
    x: number;
    y: number;
    w: number;
    h: number;
    valid: boolean;
  } | null;
  collidingCells?: { x: number; y: number }[];
  onSelectModule: (id: string | null) => void;
  onMoveSelected: (dx: number, dy: number) => void;
  onRotateSelected: () => void;
  onPlaceSelectedAt: (x: number, y: number) => void;
  onHoverCell: (cell: { x: number; y: number } | null) => void;
}

export default function RoomCanvas({
  plan,
  modules,
  selectedId,
  hoveredPreview,
  collidingCells,
  onSelectModule,
  onMoveSelected,
  onRotateSelected,
  onPlaceSelectedAt,
  onHoverCell,
}: RoomCanvasProps) {
  const [showReferenceSvg, setShowReferenceSvg] = useState(false);

  const { columns, rows, cellSize: c, originX: ox, originY: oy } = plan.grid;
  const gridWidth = columns * c;
  const gridHeight = rows * c;

  const handleKeyDown = (event: React.KeyboardEvent<SVGSVGElement | SVGGElement>) => {
    const keyMap: Record<string, [number, number]> = {
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
    };
    if (keyMap[event.key]) {
      event.preventDefault();
      event.stopPropagation();
      onMoveSelected(...keyMap[event.key]);
      return;
    }
    if (event.key.toLowerCase() === 'r') {
      event.preventDefault();
      event.stopPropagation();
      onRotateSelected();
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      onSelectModule(null);
    }
  };

  return (
    <div className="relative flex flex-col border border-[#262824]/25 bg-[#F1E8D9]">
      {/* Top Drafting Sheet Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#262824]/20 bg-[#EAE0D0] px-5 py-3">
        <div className="flex items-center gap-3 font-drafting text-[11px] tracking-[0.14em] text-[#262824] uppercase">
          <span className="font-medium">SHEET 12 / INTERACTIVE FLOOR PLAN</span>
          <span aria-hidden="true" className="text-[#262824]/35">
            ·
          </span>
          <span className="text-[#76404B]">
            {columns} × {rows} LOGICAL GRID
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline font-drafting text-[10px] tracking-[0.1em] text-[#777974] uppercase">
            CLICK CELL TO PLACE · ARROWS NUDGE · R ROTATES
          </span>
          <button
            type="button"
            onClick={() => setShowReferenceSvg((prev) => !prev)}
            className="font-drafting text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 border border-[#262824]/30 bg-[#F5F2EA] text-[#262824] hover:bg-[#262824] hover:text-[#F5F2EA] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#262824]"
          >
            {showReferenceSvg ? 'RETURN TO LIVE STUDIO' : 'VIEW STATIC CAD SHEET'}
          </button>
        </div>
      </div>

      {showReferenceSvg ? (
        <div className="p-4 md:p-6 bg-[#F1E8D9]">
          <img
            src={HOLLOWAY_ASSETS.floorPlanSvg}
            alt="HOLLOWAY canonical 12 by 8 floor plan drafting SVG reference"
            className="w-full h-auto border border-[#262824]/20"
          />
        </div>
      ) : (
        <div className="relative p-2 sm:p-4 md:p-6">
          <svg
            viewBox="0 0 768 600"
            width="100%"
            role="group"
            tabIndex={0}
            aria-label="Interactive 12 by 8 architectural room arrangement grid. Select a furniture piece and use arrow keys or click grid cells to position, R to rotate, and Escape to clear selection."
            onKeyDown={handleKeyDown}
            onMouseLeave={() => onHoverCell(null)}
            className="w-full h-auto block select-none focus-visible:outline-2 focus-visible:outline-[#262824]"
          >
            <defs>
              <pattern id="hw-paper-grain" width="9" height="9" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.35" fill="#604431" opacity="0.14" />
              </pattern>
              <pattern id="hw-grid-cells" width={c} height={c} patternUnits="userSpaceOnUse">
                <path
                  d={`M${c} 0H0V${c}`}
                  fill="none"
                  stroke="#9B9082"
                  strokeWidth="0.75"
                />
              </pattern>
              <pattern id="hw-reserved-hatch" width="9" height="9" patternUnits="userSpaceOnUse">
                <path
                  d="M-2 2L2 -2M0 9L9 0M7 11L11 7"
                  stroke="#76404B"
                  strokeOpacity="0.48"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            {/* Drafting Paper Backdrop */}
            <rect width="768" height="600" fill="#F1E8D9" />
            <rect width="768" height="600" fill="url(#hw-paper-grain)" />

            {/* Sheet Header Typography inside SVG matching 12-room-floor-plan.svg */}
            <text
              x="96"
              y="42"
              fontFamily="IBM Plex Mono, ui-monospace, monospace"
              fontSize="13"
              fontWeight="600"
              letterSpacing="2"
              fill="#262824"
            >
              HOLLOWAY / SPACE ARRANGER
            </text>
            <text
              x="96"
              y="64"
              fontFamily="IBM Plex Mono, ui-monospace, monospace"
              fontSize="9.5"
              letterSpacing="1.2"
              fill="#76404B"
            >
              PLAN 12 × 8 • DIAGRAMMATIC / INTERACTIVE STUDIO
            </text>
            <text
              x="672"
              y="64"
              textAnchor="end"
              fontFamily="IBM Plex Mono, ui-monospace, monospace"
              fontSize="9.5"
              letterSpacing="1.2"
              fill="#766A5F"
            >
              {selectedId
                ? `ACTIVE: ${selectedId.toUpperCase()}`
                : 'NO MODULE SELECTED'}
            </text>
            <path d="M96 76H672" stroke="#262824" strokeWidth="1" strokeOpacity="0.45" />

            {/* Floor Grid Surface */}
            <rect x={ox} y={oy} width={gridWidth} height={gridHeight} fill="#F7F1E8" />
            <rect x={ox} y={oy} width={gridWidth} height={gridHeight} fill="url(#hw-grid-cells)" />

            {/* Column Numerals (01 - 12) */}
            {Array.from({ length: columns }).map((_, colIdx) => (
              <text
                key={`col-label-${colIdx}`}
                x={ox + colIdx * c + c / 2}
                y={91}
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="10"
                fill="#766A5F"
              >
                {formatColumnNumber(colIdx)}
              </text>
            ))}

            {/* Row Letters (A - H) */}
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <text
                key={`row-label-${rowIdx}`}
                x={82}
                y={oy + rowIdx * c + c / 2 + 3.5}
                textAnchor="end"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="10"
                fill="#766A5F"
              >
                {formatRowLetter(rowIdx)}
              </text>
            ))}

            {/* Interactive Clickable Grid Cells for Direct Placement */}
            {Array.from({ length: rows }).map((_, rIdx) =>
              Array.from({ length: columns }).map((__, cIdx) => (
                <rect
                  key={`cell-${cIdx}-${rIdx}`}
                  x={ox + cIdx * c}
                  y={oy + rIdx * c}
                  width={c}
                  height={c}
                  fill="transparent"
                  className="cursor-crosshair"
                  onMouseEnter={() => onHoverCell({ x: cIdx, y: rIdx })}
                  onClick={() => onPlaceSelectedAt(cIdx, rIdx)}
                />
              ))
            )}

            {/* Blocked / Reserved Architectural Zones */}
            {plan.blockedCells.map((block, i) => (
              <g key={`blocked-${i}`} pointerEvents="none">
                <rect
                  x={ox + block.x * c + 2}
                  y={oy + block.y * c + 2}
                  width={c - 4}
                  height={c - 4}
                  fill="url(#hw-reserved-hatch)"
                  stroke="#76404B"
                  strokeOpacity="0.55"
                >
                  <title>{block.reason}</title>
                </rect>
              </g>
            ))}

            {/* Collision Flash Highlight if user attempted invalid move */}
            {collidingCells?.map((cell, idx) => (
              <rect
                key={`collide-${idx}`}
                x={ox + cell.x * c + 2}
                y={oy + cell.y * c + 2}
                width={c - 4}
                height={c - 4}
                fill="#874C54"
                fillOpacity="0.28"
                stroke="#874C54"
                strokeWidth="1.5"
                pointerEvents="none"
              />
            ))}

            {/* Hover Placement Preview Outline */}
            {hoveredPreview && selectedId && (
              <rect
                x={ox + hoveredPreview.x * c + 3}
                y={oy + hoveredPreview.y * c + 3}
                width={hoveredPreview.w * c - 6}
                height={hoveredPreview.h * c - 6}
                rx="2"
                fill={hoveredPreview.valid ? '#A6BBC7' : '#874C54'}
                fillOpacity={hoveredPreview.valid ? '0.16' : '0.18'}
                stroke={hoveredPreview.valid ? '#262824' : '#874C54'}
                strokeWidth="1.25"
                strokeDasharray="4 3"
                pointerEvents="none"
              />
            )}

            {/* Architectural Perimeter Walls & Entry Swing Arc */}
            <path
              d={`M${ox} ${oy}H${ox + gridWidth}V${oy + gridHeight}H${ox + 2 * c}M${ox} ${oy}V${oy + (rows - 2) * c}`}
              fill="none"
              stroke="#262824"
              strokeWidth="7.5"
              strokeLinejoin="miter"
              pointerEvents="none"
            />
            <path
              d="M96 388V484H192"
              fill="none"
              stroke="#262824"
              strokeWidth="1.5"
              strokeDasharray="5 5"
              pointerEvents="none"
            />
            <path
              d="M96 484A96 96 0 0 1 192 388"
              fill="none"
              stroke="#76404B"
              strokeWidth="1.2"
              strokeDasharray="4 5"
              pointerEvents="none"
            />
            <text
              x="104"
              y="476"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="8"
              fill="#76404B"
              pointerEvents="none"
            >
              ENTRY CLEARANCE
            </text>
            <text
              x="533"
              y="115"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="8"
              fill="#76404B"
              pointerEvents="none"
            >
              FIXED ZONE
            </text>

            {/* Movable Furniture Modules */}
            {modules.map((item) => {
              const { w, h } = getFootprint(item);
              const isSelected = selectedId === item.id;
              const px = ox + item.x * c;
              const py = oy + item.y * c;
              const pw = w * c;
              const ph = h * c;
              const isDarkFill = item.id === 'chair' || item.id === 'shelf';
              const labelColor = isDarkFill ? '#F5F2EA' : '#262824';
              const catalogItem = FURNITURE_CATALOG[item.id];

              return (
                <g
                  key={item.id}
                  id={`h-module-${item.id}`}
                  data-module-id={item.id}
                  data-x={item.x}
                  data-y={item.y}
                  data-rotation={item.rotation}
                  tabIndex={0}
                  role="button"
                  aria-label={`${item.label}, Grid ${formatColumnNumber(item.x)}${formatRowLetter(item.y)}, column ${item.x + 1}, row ${item.y + 1}, rotated ${item.rotation} degrees${
                    isSelected ? ', currently selected' : ''
                  }`}
                  aria-pressed={isSelected}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectModule(item.id);
                  }}
                  onKeyDown={handleKeyDown}
                  className="cursor-pointer focus:outline-none"
                >
                  <title>{`${item.label} (${formatColumnNumber(item.x)}${formatRowLetter(item.y)}, ${item.rotation}°)`}</title>

                  {/* Module Footprint Block */}
                  <rect
                    x={px + 4}
                    y={py + 4}
                    width={pw - 8}
                    height={ph - 8}
                    rx="3"
                    fill={item.fill}
                    fillOpacity="0.88"
                    stroke="#262824"
                    strokeWidth={isSelected ? '2.2' : '1.5'}
                  />

                  {/* Architectural Orientation Datum Line inside Module */}
                  <path
                    d={`M${px + 10} ${py + 12}H${px + pw - 10}`}
                    stroke={labelColor}
                    strokeOpacity="0.45"
                    strokeWidth="1"
                    pointerEvents="none"
                  />

                  {/* Module Code & Label */}
                  <text
                    x={px + pw / 2}
                    y={py + ph / 2 + (ph > 56 ? -2 : 4)}
                    textAnchor="middle"
                    fontFamily="IBM Plex Mono, ui-monospace, monospace"
                    fontSize="10"
                    fontWeight="600"
                    letterSpacing="0.8"
                    fill={labelColor}
                    pointerEvents="none"
                  >
                    {item.id.toUpperCase()}
                  </text>

                  {ph > 56 && (
                    <text
                      x={px + pw / 2}
                      y={py + ph / 2 + 12}
                      textAnchor="middle"
                      fontFamily="IBM Plex Mono, ui-monospace, monospace"
                      fontSize="8.5"
                      fill={labelColor}
                      opacity="0.8"
                      pointerEvents="none"
                    >
                      {catalogItem?.index ?? ''} · {formatColumnNumber(item.x)}
                      {formatRowLetter(item.y)}
                    </text>
                  )}

                  {/* Active Selection Drafting Frame (matching 12-room-floor-plan.svg) */}
                  {isSelected && (
                    <g pointerEvents="none">
                      <rect
                        x={px - 3}
                        y={py - 3}
                        width={pw + 6}
                        height={ph + 6}
                        rx="1"
                        fill="none"
                        stroke="#874C54"
                        strokeWidth="2"
                        strokeDasharray="6 3"
                      />
                      <circle cx={px - 3} cy={py - 3} r="3.5" fill="#874C54" />
                      <circle cx={px + pw + 3} cy={py + ph + 3} r="3.5" fill="#874C54" />
                      <text
                        x={px}
                        y={Math.max(oy + 12, py - 9)}
                        fill="#76404B"
                        fontFamily="IBM Plex Mono, monospace"
                        fontSize="9.5"
                        fontWeight="600"
                      >
                        SELECTED / {item.id.toUpperCase()} ({item.rotation}°)
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Bottom Drafting Legend inside SVG */}
            <path d="M96 505H672" stroke="#262824" strokeWidth="1" strokeOpacity="0.45" />
            <text
              x="96"
              y="529"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="10"
              fill="#262824"
            >
              01 SELECT ITEM • ARROWS OR CLICK CELL TO MOVE • R ROTATES • ESC DESELECTS
            </text>

            <rect x="96" y="544" width="13" height="13" fill="#B5C8DA" stroke="#262824" />
            <text
              x="115"
              y="555"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="9"
              fill="#262824"
            >
              MOVABLE MODULE
            </text>

            <rect
              x="235"
              y="544"
              width="13"
              height="13"
              fill="url(#hw-reserved-hatch)"
              stroke="#76404B"
            />
            <text
              x="254"
              y="555"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="9"
              fill="#262824"
            >
              NO PLACEMENT (RESERVED)
            </text>

            <path
              d="M425 551H445"
              stroke="#874C54"
              strokeWidth="2"
              strokeDasharray="5 3"
            />
            <text
              x="452"
              y="555"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="9"
              fill="#262824"
            >
              ACTIVE SELECTION
            </text>

            <text
              x="672"
              y="581"
              textAnchor="end"
              fontFamily="IBM Plex Mono, monospace"
              fontSize="9"
              fill="#766A5F"
            >
              HOLLOWAY / DIAGRAM 12
            </text>
          </svg>
        </div>
      )}
    </div>
  );
}
