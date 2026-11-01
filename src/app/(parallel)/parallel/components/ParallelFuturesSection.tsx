'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createBudgetedRenderLoop } from '../rendering/renderBudget';
import { InterventionStrategy } from '../simulation/engine';
import {
  CanonicalCity25D,
  EntityComparisonInspection,
  FutureWorldState25D,
  INTERVENTION_METADATA,
  PARALLEL_FUTURES_CLOSURE_MIN,
  PARALLEL_FUTURES_END_MIN,
  PARALLEL_FUTURES_START_MIN,
   computeRealitySplitChoreography,
  evaluateParallelFuturesState,
  getCanonicalCity25D,
  getInspectableEntityComparison,
} from '../simulation/parallelFutures25D';

interface ParallelFuturesSectionProps {
  activeIntervention: InterventionStrategy;
  onSelectIntervention: (strategy: InterventionStrategy) => void;
}

type ViewportZoomMode = 'overview' | 'bridge_focus';

interface IsometricCityViewportProps {
  city: CanonicalCity25D;
  worldState: FutureWorldState25D;
  selectedEntityId: string;
  hoveredEntityId: string | null;
  onSelectEntity: (id: string) => void;
  onHoverEntity: (id: string | null) => void;
  zoomMode: ViewportZoomMode;
  bridgeAlertIntensity: number;
  divergenceAlpha: number;
}

interface StaticPlinthAndRiverLayerProps {
  city: CanonicalCity25D;
  uidPrefix: string;
}

const StaticPlinthAndRiverLayer: React.FC<StaticPlinthAndRiverLayerProps> = React.memo(
  ({ city, uidPrefix }) => (
    <>
      <rect
        x="0"
        y="0"
        width={city.viewBoxWidth}
        height={city.viewBoxHeight}
        fill={`url(#${uidPrefix}-studio-grid)`}
      />

      {/* 1. Architectural Base Plinth */}
      <g>
        <polygon
          points={city.plinthLeftPolygon}
          fill="#C6C8C4"
          stroke="#24282B"
          strokeOpacity="0.28"
          strokeWidth="0.8"
        />
        <polygon
          points={city.plinthRightPolygon}
          fill="#B4B8B5"
          stroke="#24282B"
          strokeOpacity="0.28"
          strokeWidth="0.8"
        />
        <polygon
          points={city.plinthTopPolygon}
          fill="#E5E4DF"
          stroke="#24282B"
          strokeOpacity="0.32"
          strokeWidth="1"
        />
      </g>

      {/* 2. Meridian River Channel & Recessed Embankments */}
      <g>
        <polygon
          points={city.riverNorthBankPolygon}
          fill="#BFC4C2"
          stroke="#24282B"
          strokeOpacity="0.25"
          strokeWidth="0.7"
        />
        <polygon
          points={city.riverSouthBankPolygon}
          fill="#B3B9B7"
          stroke="#24282B"
          strokeOpacity="0.25"
          strokeWidth="0.7"
        />
        <polygon
          points={city.riverWaterPolygon}
          fill={`url(#${uidPrefix}-river-grad)`}
          stroke="#7A8B90"
          strokeOpacity="0.4"
          strokeWidth="0.8"
        />
        {city.riverFlowLines.map((d, idx) => (
          <path
            key={idx}
            d={d}
            fill="none"
            stroke="#FAF9F6"
            strokeOpacity="0.45"
            strokeWidth="1"
            strokeDasharray="8 10"
          />
        ))}
      </g>
    </>
  )
);

StaticPlinthAndRiverLayer.displayName = 'StaticPlinthAndRiverLayer';

interface ExtrudedBuildingsLayerProps {
  city: CanonicalCity25D;
  highlightedDistrictId: string | null;
  onSelectEntity: (id: string) => void;
  onHoverEntity: (id: string | null) => void;
}

const ExtrudedBuildingsLayer: React.FC<ExtrudedBuildingsLayerProps> = React.memo(
  ({ city, highlightedDistrictId, onSelectEntity, onHoverEntity }) => (
    <g>
      {city.buildings.map((bld) => {
        const isDistrictSelected = highlightedDistrictId === bld.districtId;
        const topFill = isDistrictSelected ? '#FFFFFF' : '#FAF9F6';
        const leftFill = isDistrictSelected ? '#DCDFD9' : '#D4D6D2';
        const rightFill = isDistrictSelected ? '#C5CAC7' : '#BCC1BF';
        const outlineStroke = isDistrictSelected ? '#171A1C' : '#24282B';
        const outlineOpacity = isDistrictSelected ? 0.58 : 0.34;

        return (
          <g
            key={bld.id}
            className="cursor-pointer"
            onClick={() => onSelectEntity(bld.districtId)}
            onMouseEnter={() => onHoverEntity(bld.districtId)}
            onMouseLeave={() => onHoverEntity(null)}
          >
            {/* Ground Contact Shadow */}
            <polygon points={bld.shadowPolygon} fill="rgba(23, 26, 28, 0.085)" />

            {/* Left Shaded Face */}
            <polygon
              points={bld.leftFacePolygon}
              fill={leftFill}
              stroke={outlineStroke}
              strokeOpacity={outlineOpacity}
              strokeWidth="0.65"
              strokeLinejoin="round"
            />

            {/* Right Darker Shaded Face */}
            <polygon
              points={bld.rightFacePolygon}
              fill={rightFill}
              stroke={outlineStroke}
              strokeOpacity={outlineOpacity}
              strokeWidth="0.65"
              strokeLinejoin="round"
            />

            {/* Subtle Facade Linework */}
            {bld.facadeLines.map((fl, fIdx) => (
              <line
                key={fIdx}
                x1={fl.x1}
                y1={fl.y1}
                x2={fl.x2}
                y2={fl.y2}
                stroke="#24282B"
                strokeOpacity="0.14"
                strokeWidth="0.5"
              />
            ))}

            {/* Bright Top Roof Face */}
            <polygon
              points={bld.topFacePolygon}
              fill={topFill}
              stroke={outlineStroke}
              strokeOpacity={outlineOpacity + 0.08}
              strokeWidth="0.7"
              strokeLinejoin="round"
            />

            {/* Roof Parapet Inset */}
            <polygon
              points={bld.parapetPolygon}
              fill="none"
              stroke="#24282B"
              strokeOpacity="0.2"
              strokeWidth="0.5"
            />

            {/* Stepped Tower Crown */}
            {bld.crownFaces && (
              <g>
                <polygon
                  points={bld.crownFaces.left}
                  fill="#D4D6D2"
                  stroke="#24282B"
                  strokeOpacity="0.35"
                  strokeWidth="0.55"
                />
                <polygon
                  points={bld.crownFaces.right}
                  fill="#BCC1BF"
                  stroke="#24282B"
                  strokeOpacity="0.35"
                  strokeWidth="0.55"
                />
                <polygon
                  points={bld.crownFaces.top}
                  fill="#FAF9F6"
                  stroke="#24282B"
                  strokeOpacity="0.4"
                  strokeWidth="0.6"
                />
              </g>
            )}

            {/* Roof Mechanical / Solar / Canopy Accents */}
            {bld.roofDetails.accents.map((acc, aIdx) => (
              <polygon
                key={aIdx}
                points={acc.points}
                fill={acc.fill}
                stroke="#24282B"
                strokeOpacity="0.25"
                strokeWidth="0.45"
              />
            ))}

            {bld.roofDetails.lines.map((rl, rIdx) => (
              <line
                key={rIdx}
                x1={rl.x1}
                y1={rl.y1}
                x2={rl.x2}
                y2={rl.y2}
                stroke="#24282B"
                strokeOpacity="0.42"
                strokeWidth="0.7"
              />
            ))}
          </g>
        );
      })}
    </g>
  )
);

ExtrudedBuildingsLayer.displayName = 'ExtrudedBuildingsLayer';

const IsometricCityViewport: React.FC<IsometricCityViewportProps> = React.memo(
  ({
    city,
    worldState,
    selectedEntityId,
    hoveredEntityId,
    onSelectEntity,
    onHoverEntity,
    zoomMode,
    bridgeAlertIntensity,
    divergenceAlpha,
  }) => {
    const isBaseline = worldState.futureId === 'A';
    const activeInspectId = hoveredEntityId ?? selectedEntityId;
    const highlightedDistrictId = city.districts.some((d) => d.id === activeInspectId)
      ? activeInspectId
      : null;
    const uidPrefix = `iso25d-${worldState.futureId}`;

    // Synchronized camera framing (overview vs bridge/corridor focus)
    const viewBox =
      zoomMode === 'bridge_focus' ? '105 62 510 296' : `0 0 ${city.viewBoxWidth} ${city.viewBoxHeight}`;

    return (
      <div className="relative w-full h-[360px] sm:h-[420px] xl:h-[445px] bg-[#EFECE6] border border-[#171A1C]/15 overflow-hidden select-none">
        {/* Top HUD Bar inside Viewport (non-overlapping flex bar) */}
        <div className="absolute top-0 inset-x-0 z-10 px-3 py-2 bg-[#FAF9F6]/95 border-b border-[#171A1C]/12 flex items-center justify-between gap-2 pointer-events-none">
          <div className="flex items-center gap-1.5 min-w-0">
            <span
              className={`px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] font-semibold border shrink-0 ${
                isBaseline
                  ? 'bg-[#FAF9F6] text-[#D94E3E] border-[#D94E3E]/40'
                  : 'bg-[#FAF9F6] text-[#259A6C] border-[#259A6C]/40'
              }`}
            >
              {isBaseline ? 'FUTURE A' : 'FUTURE B'}
            </span>
            <span className="px-2 py-0.5 bg-[#F6F5F1] border border-[#171A1C]/15 font-mono text-[10px] text-[#171A1C] uppercase tracking-[0.1em] shrink-0">
              {worldState.timeFormatted}
            </span>
            {worldState.bridgeClosed && (
              <span
                className={`px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] font-semibold truncate ${
                  isBaseline
                    ? 'bg-[#E85D36] text-[#FAF9F6]'
                    : 'bg-[#259A6C] text-[#FAF9F6]'
                }`}
              >
                {isBaseline
                  ? 'BRIDGE CLOSED'
                  : INTERVENTION_METADATA[worldState.intervention].shortCode}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#666D70] hidden sm:inline">
              THROUGHPUT
            </span>
            <span
              className={`font-mono text-xs font-bold ${
                isBaseline && worldState.bridgeClosed ? 'text-[#D94E3E]' : 'text-[#259A6C]'
              }`}
            >
              {worldState.metrics.corridorThroughputPct}%
            </span>
          </div>
        </div>

        {/* 2.5D Isometric Architectural SVG Stage */}
        <svg
          viewBox={viewBox}
          className="w-full h-full block transition-all duration-500 ease-out"
          role="img"
          aria-label={`${worldState.title} 2.5D isometric city simulation at ${worldState.timeFormatted}`}
        >
          <defs>
            <pattern
              id={`${uidPrefix}-studio-grid`}
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 28 0 L 0 0 0 28"
                fill="none"
                stroke="#171A1C"
                strokeOpacity="0.045"
                strokeWidth="0.75"
              />
            </pattern>
            <linearGradient id={`${uidPrefix}-river-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#CFD7D9" />
              <stop offset="50%" stopColor="#C1CCCF" />
              <stop offset="100%" stopColor="#B6C3C7" />
            </linearGradient>
          </defs>

          {/* 1 & 2. Memoized Static Plinth & Meridian River Channel */}
          <StaticPlinthAndRiverLayer city={city} uidPrefix={uidPrefix} />

          {/* 3. Six District Terraces (Interactive Paired Highlight Targets) */}
          <g>
            {city.districts.map((dist) => {
              const dState = worldState.districtStates[dist.id];
              const isHighlighted = activeInspectId === dist.id;
              const isHighPressure = isBaseline && worldState.bridgeClosed && dState.pressure > 0.72;
              const isOptimizedDistrict =
                !isBaseline &&
                worldState.bridgeClosed &&
                (dState.transitPulse > 0.7 || dState.freightActive || dState.pressure < 0.42);

              let padFill = '#E8E8E3';
              let padStroke = 'rgba(36, 40, 43, 0.28)';
              if (isHighlighted) {
                padFill = isBaseline ? '#F5E4DD' : '#DFEFE8';
                padStroke = isBaseline ? '#E85D36' : '#259A6C';
              } else if (isHighPressure) {
                padFill = '#F0E3DC';
                padStroke = 'rgba(232, 93, 54, 0.55)';
              } else if (isOptimizedDistrict) {
                padFill = '#E4ECE8';
                padStroke = 'rgba(37, 154, 108, 0.48)';
              }

              return (
                <g
                  key={dist.id}
                  className="cursor-pointer"
                  onClick={() => onSelectEntity(dist.id)}
                  onMouseEnter={() => onHoverEntity(dist.id)}
                  onMouseLeave={() => onHoverEntity(null)}
                >
                  <polygon points={dist.leftEdgePolygon} fill="#CFD1CD" />
                  <polygon points={dist.rightEdgePolygon} fill="#BEC2BF" />
                  <polygon
                    points={dist.plinthPolygon}
                    fill={padFill}
                    stroke={padStroke}
                    strokeWidth={isHighlighted ? 1.8 : 0.9}
                  />

                  {/* Transit surge station halo when increase_transit is active */}
                  {!isBaseline &&
                    worldState.bridgeClosed &&
                    worldState.intervention === 'increase_transit' &&
                    dState.transitPulse > 0.6 && (
                      <ellipse
                        cx={dist.hubPos.sx}
                        cy={dist.hubPos.sy}
                        rx="22"
                        ry="12"
                        fill="rgba(37, 154, 108, 0.14)"
                        stroke="#259A6C"
                        strokeWidth="1.2"
                        strokeDasharray="3 2"
                      />
                    )}

                  {/* Freight dock indicator when coordinate_deliveries is active */}
                  {!isBaseline &&
                    worldState.bridgeClosed &&
                    worldState.intervention === 'coordinate_deliveries' &&
                    dState.freightActive && (
                      <ellipse
                        cx={dist.hubPos.sx}
                        cy={dist.hubPos.sy}
                        rx="20"
                        ry="11"
                        fill="rgba(37, 154, 108, 0.12)"
                        stroke="#259A6C"
                        strokeWidth="1.1"
                      />
                    )}
                </g>
              );
            })}
          </g>

          {/* 4. Bridges & River Crossings (Piers, Decks, Trusses) */}
          <g>
            {city.bridges.map((bridge) => {
              const isHighlighted =
                activeInspectId === bridge.id || activeInspectId === bridge.corridorId;
              const isClosedBridge = bridge.isPrimaryClosureTarget && worldState.bridgeClosed;

              let deckFill = '#D4D6D2';
              let deckStroke = '#24282B';
              if (isClosedBridge) {
                deckFill = '#F3DBD5';
                deckStroke = '#D94E3E';
              } else if (worldState.bridgeClosed) {
                deckFill = isBaseline ? '#F2DFD8' : '#DCEEE6';
                deckStroke = isBaseline ? '#E85D36' : '#259A6C';
              }

              return (
                <g
                  key={bridge.id}
                  className="cursor-pointer"
                  onClick={() => onSelectEntity(bridge.id)}
                  onMouseEnter={() => onHoverEntity(bridge.id)}
                  onMouseLeave={() => onHoverEntity(null)}
                >
                  <polygon points={bridge.shadowPolygon} fill="rgba(23, 26, 28, 0.12)" />
                  {bridge.pierPolygons.map((pier, idx) => (
                    <polygon
                      key={idx}
                      points={pier}
                      fill="#9DA3A2"
                      stroke="#24282B"
                      strokeOpacity="0.35"
                      strokeWidth="0.6"
                    />
                  ))}
                  <polygon
                    points={bridge.deckPolygon}
                    fill={deckFill}
                    stroke={deckStroke}
                    strokeWidth={isHighlighted ? 2.2 : 1.2}
                  />
                  {bridge.trussLines.map((ln, idx) => (
                    <line
                      key={idx}
                      x1={ln.x1}
                      y1={ln.y1}
                      x2={ln.x2}
                      y2={ln.y2}
                      stroke={isClosedBridge ? '#D94E3E' : '#24282B'}
                      strokeOpacity={isClosedBridge ? 0.85 : 0.45}
                      strokeWidth={isHighlighted ? 1.4 : 0.9}
                    />
                  ))}
                </g>
              );
            })}
          </g>

          {/* 5. Coherent Road Network & Dynamic Flow Overlays */}
          <g>
            {city.corridors.map((cor) => {
              const cState = worldState.corridorStates[cor.id];
              const isHighlighted =
                activeInspectId === cor.id ||
                (cor.bridgeId && activeInspectId === cor.bridgeId);

              // Hide dedicated transit/freight ring overlays unless active or highlighted
              if (
                cor.kind === 'transit' &&
                (isBaseline || worldState.intervention !== 'increase_transit') &&
                !isHighlighted
              ) {
                return null;
              }
              if (
                cor.kind === 'freight' &&
                (isBaseline || worldState.intervention !== 'coordinate_deliveries') &&
                !isHighlighted
              ) {
                return null;
              }

              let strokeColor = '#777D7D';
              let strokeDash = undefined as string | undefined;
              let overlayAlpha = 0.88;

              if (cState.closed) {
                strokeColor = '#D94E3E';
                strokeDash = '4 4';
              } else if (cState.highlightLevel === 'disrupted') {
                strokeColor = cState.congestion > 0.78 ? '#D94E3E' : '#E85D36';
                overlayAlpha = 0.35 + divergenceAlpha * 0.65;
              } else if (cState.highlightLevel === 'optimized') {
                strokeColor = '#259A6C';
                overlayAlpha = 0.35 + divergenceAlpha * 0.65;
                if (cor.kind === 'transit') strokeDash = '6 3';
              }

              return (
                <g
                  key={cor.id}
                  className="cursor-pointer"
                  onClick={() => onSelectEntity(cor.bridgeId ?? cor.id)}
                  onMouseEnter={() => onHoverEntity(cor.bridgeId ?? cor.id)}
                  onMouseLeave={() => onHoverEntity(null)}
                >
                  {/* Road casing */}
                  <path
                    d={cor.svgPath}
                    fill="none"
                    stroke="#24282B"
                    strokeOpacity="0.32"
                    strokeWidth={cor.strokeWidth + 2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Road surface */}
                  <path
                    d={cor.svgPath}
                    fill="none"
                    stroke="#C5C8C5"
                    strokeWidth={cor.strokeWidth}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Dynamic state overlay */}
                  <path
                    d={cor.svgPath}
                    fill="none"
                    stroke={strokeColor}
                    strokeOpacity={overlayAlpha}
                    strokeWidth={isHighlighted ? cor.strokeWidth + 1.2 : cor.strokeWidth - 0.8}
                    strokeDasharray={strokeDash}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Congestion queue hotspots in Future A */}
                  {isBaseline &&
                    cState.queueClusters.map((q, qIdx) => (
                      <g key={qIdx}>
                        <ellipse
                          cx={q.sx}
                          cy={q.sy}
                          rx={8 + q.intensity * 6}
                          ry={4.5 + q.intensity * 3.5}
                          fill="#E85D36"
                          fillOpacity={0.22 * divergenceAlpha}
                          stroke="#D94E3E"
                          strokeOpacity={0.65 * divergenceAlpha}
                          strokeWidth="0.9"
                        />
                      </g>
                    ))}
                </g>
              );
            })}
          </g>

          {/* 6. Memoized Extruded 2.5D Architectural Buildings (Depth-Sorted Back-to-Front) */}
          <ExtrudedBuildingsLayer
            city={city}
            highlightedDistrictId={highlightedDistrictId}
            onSelectEntity={onSelectEntity}
            onHoverEntity={onHoverEntity}
          />

          {/* 7. Moving Vehicle & Transit/Freight Flow Markers (Strictly on Open Corridors) */}
          <g>
            {worldState.vehicles.map((veh) => {
              let fill = '#24282B';
              const stroke = '#FAF9F6';
              let radius = 2.5;

              if (veh.state === 'queued') {
                fill = '#D94E3E';
                radius = 2.8;
              } else if (veh.state === 'optimized') {
                fill = '#259A6C';
                radius = veh.vehicleType === 'transit' ? 3.3 : veh.vehicleType === 'freight' ? 3.1 : 2.6;
              } else if (veh.vehicleType === 'freight') {
                fill = '#454C4F';
                radius = 2.8;
              }

              return (
                <g key={veh.id}>
                  <circle
                    cx={veh.sx}
                    cy={veh.sy}
                    r={radius}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth="0.8"
                  />
                  {veh.vehicleType !== 'car' && (
                    <circle
                      cx={veh.sx - veh.dx * 3.2}
                      cy={veh.sy - veh.dy * 3.2}
                      r={radius * 0.78}
                      fill={fill}
                      fillOpacity="0.8"
                    />
                  )}
                </g>
              );
            })}
          </g>

          {/* 8. Elevated Coordination Data Pathways (Future B) */}
          {!isBaseline && worldState.elevatedArcs.length > 0 && (
            <g opacity={divergenceAlpha}>
              {worldState.elevatedArcs.map((arc) => (
                <g key={arc.id}>
                  <path
                    d={arc.svgPath}
                    fill="none"
                    stroke="#259A6C"
                    strokeOpacity="0.22"
                    strokeWidth="4"
                  />
                  <path
                    d={arc.svgPath}
                    fill="none"
                    stroke="#259A6C"
                    strokeWidth="1.6"
                    strokeDasharray="5 4"
                  />
                </g>
              ))}
            </g>
          )}

          {/* 9. Central Bridge Closure Alert Marker & Barricade Callout */}
          {worldState.bridgeClosed && (
            <g
              className="cursor-pointer"
              onClick={() => onSelectEntity('BRIDGE_CENTRAL')}
              onMouseEnter={() => onHoverEntity('BRIDGE_CENTRAL')}
              onMouseLeave={() => onHoverEntity(null)}
              opacity={Math.max(0.4, bridgeAlertIntensity)}
            >
              {(() => {
                const centralBridge = city.bridges.find((b) => b.id === 'BRIDGE_CENTRAL')!;
                const cx = centralBridge.centerPos.sx;
                const cy = centralBridge.centerPos.sy;
                return (
                  <>
                    <ellipse
                      cx={cx}
                      cy={cy}
                      rx="18"
                      ry="10"
                      fill="rgba(217, 78, 62, 0.2)"
                      stroke="#D94E3E"
                      strokeWidth="1.3"
                    />
                    {/* Structural X Barricade */}
                    <line
                      x1={cx - 6}
                      y1={cy - 4}
                      x2={cx + 6}
                      y2={cy + 4}
                      stroke="#D94E3E"
                      strokeWidth="2.2"
                    />
                    <line
                      x1={cx - 6}
                      y1={cy + 4}
                      x2={cx + 6}
                      y2={cy - 4}
                      stroke="#D94E3E"
                      strokeWidth="2.2"
                    />
                    {/* Callout stem & label pill */}
                    <line
                      x1={cx}
                      y1={cy - 6}
                      x2={cx}
                      y2={cy - 28}
                      stroke="#D94E3E"
                      strokeWidth="1.1"
                    />
                    <rect
                      x={cx - 64}
                      y={cy - 44}
                      width="128"
                      height="16"
                      fill="#171A1C"
                      stroke="#D94E3E"
                      strokeWidth="1"
                    />
                    <text
                      x={cx}
                      y={cy - 33}
                      textAnchor="middle"
                      fill="#FAF9F6"
                      fontSize="7.5"
                      fontFamily="IBM Plex Mono, monospace"
                      fontWeight="600"
                      letterSpacing="0.08em"
                    >
                      07:30 CENTRAL SPAN CLOSED
                    </text>
                  </>
                );
              })()}
            </g>
          )}

          {/* 10. Architectural Labels for Bridges & Districts */}
          <g>
            {city.bridges
              .filter((b) => !b.isPrimaryClosureTarget || !worldState.bridgeClosed)
              .map((bridge) => {
                const isHighlighted = activeInspectId === bridge.id;
                const isAltBridgeActive =
                  worldState.bridgeClosed && !bridge.isPrimaryClosureTarget;
                const badgeColor = isAltBridgeActive
                  ? isBaseline
                    ? '#E85D36'
                    : '#259A6C'
                  : '#24282B';

                return (
                  <g
                    key={`lbl-${bridge.id}`}
                    className="cursor-pointer"
                    onClick={() => onSelectEntity(bridge.id)}
                    onMouseEnter={() => onHoverEntity(bridge.id)}
                    onMouseLeave={() => onHoverEntity(null)}
                  >
                    <rect
                      x={bridge.centerPos.sx - 44}
                      y={bridge.centerPos.sy - 24}
                      width="88"
                      height="14"
                      fill="#FAF9F6"
                      fillOpacity="0.94"
                      stroke={badgeColor}
                      strokeWidth={isHighlighted ? 1.4 : 0.8}
                    />
                    <text
                      x={bridge.centerPos.sx}
                      y={bridge.centerPos.sy - 14.5}
                      textAnchor="middle"
                      fill={badgeColor}
                      fontSize="7.2"
                      fontFamily="IBM Plex Mono, monospace"
                      fontWeight="600"
                    >
                      {bridge.shortName.toUpperCase()}
                    </text>
                  </g>
                );
              })}

            {city.districts.map((dist) => {
              const isHighlighted = activeInspectId === dist.id;
              return (
                <g
                  key={`dlbl-${dist.id}`}
                  className="cursor-pointer"
                  onClick={() => onSelectEntity(dist.id)}
                  onMouseEnter={() => onHoverEntity(dist.id)}
                  onMouseLeave={() => onHoverEntity(null)}
                >
                  <rect
                    x={dist.labelPos.sx - 46}
                    y={dist.labelPos.sy - 8}
                    width="92"
                    height="14"
                    fill={isHighlighted ? '#171A1C' : '#FAF9F6'}
                    fillOpacity="0.92"
                    stroke="#171A1C"
                    strokeOpacity={isHighlighted ? 0.9 : 0.25}
                    strokeWidth="0.75"
                  />
                  <text
                    x={dist.labelPos.sx}
                    y={dist.labelPos.sy + 1.5}
                    textAnchor="middle"
                    fill={isHighlighted ? '#FAF9F6' : '#24282B'}
                    fontSize="7"
                    fontFamily="IBM Plex Mono, monospace"
                    fontWeight="600"
                    letterSpacing="0.06em"
                  >
                    {dist.code} · {dist.name.split(' ')[0].toUpperCase()}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Bottom System Headline Overlay Bar inside Viewport */}
        <div className="absolute bottom-0 inset-x-0 px-3.5 py-2 bg-[#FAF9F6]/95 border-t border-[#171A1C]/12 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className={`w-2 h-2 shrink-0 ${
                !worldState.bridgeClosed
                  ? 'bg-[#777D7D]'
                  : isBaseline
                    ? 'bg-[#E85D36]'
                    : 'bg-[#259A6C]'
              }`}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] font-semibold text-[#171A1C] truncate">
              {worldState.systemHeadline}
            </span>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#666D70] shrink-0">
            CLICK ANY BRIDGE OR DISTRICT TO COMPARE
          </span>
        </div>
      </div>
    );
  }
);

IsometricCityViewport.displayName = 'IsometricCityViewport';

export const ParallelFuturesSection: React.FC<ParallelFuturesSectionProps> = ({
  activeIntervention,
  onSelectIntervention,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const city = useMemo(() => getCanonicalCity25D(), []);

  // Simulation time state (07:00 = 420 to 10:00 = 600, default 08:45 = 525 so peak contrast is immediately visible)
  const [simTimeMinutes, setSimTimeMinutes] = useState<number>(525);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Presentation & Choreography state (strictly decoupled from simulation state)
  const [splitProgress, setSplitProgress] = useState<number>(1);
  const [isReplayingSplit, setIsReplayingSplit] = useState<boolean>(false);
  const [zoomMode, setZoomMode] = useState<ViewportZoomMode>('overview');
  const [mobileActiveTab, setMobileActiveTab] = useState<'both' | 'A' | 'B'>('both');

  // Paired Entity Selection / Hover across Future A and Future B
  const [selectedEntityId, setSelectedEntityId] = useState<string>('BRIDGE_CENTRAL');
  const [hoveredEntityId, setHoveredEntityId] = useState<string | null>(null);

  // Visibility & Reduced Motion detection
  const [isSectionVisible, setIsSectionVisible] = useState<boolean>(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const onVisibilityChange = () => setIsPageVisible(!document.hidden);
    onVisibilityChange();
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsSectionVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Replay Split choreography animation
  useEffect(() => {
    if (!isReplayingSplit) return;
    if (prefersReducedMotion) {
      setSplitProgress(1);
      setSimTimeMinutes(525);
      setIsReplayingSplit(false);
      return;
    }

    const container = sectionRef.current;
    if (!container) return;
    let elapsed = 0;
    const durationMs = 2400;

    const loop = createBudgetedRenderLoop(container, (_now, dt) => {
      elapsed += dt * 1000;
      const p = Math.min(1, elapsed / durationMs);
      setSplitProgress(p);
      // Also synchronize time from 07:15 across the 07:30 closure into 08:45 during replay
      const targetMinutes = Math.round(435 + p * 90);
      setSimTimeMinutes(targetMinutes);

      if (p >= 1) {
        loop.dispose();
        setIsReplayingSplit(false);
      }
    });
    return () => loop.dispose();
  }, [isReplayingSplit, prefersReducedMotion]);

  // Synchronized Timeline playback loop (pauses automatically when offscreen)
  useEffect(() => {
    if (!isPlaying || !isSectionVisible || !isPageVisible) return;
    const interval = window.setInterval(() => {
      setSimTimeMinutes((prev) => {
        if (prev >= PARALLEL_FUTURES_END_MIN) {
          return PARALLEL_FUTURES_START_MIN;
        }
        return prev + 3;
      });
    }, 180);
    return () => window.clearInterval(interval);
  }, [isPlaying, isSectionVisible, isPageVisible]);

  // Evaluate deterministic simulation state for both worlds
  const comparisonState = useMemo(
    () => evaluateParallelFuturesState(simTimeMinutes, activeIntervention),
    [simTimeMinutes, activeIntervention]
  );

  const choreography = useMemo(
    () => computeRealitySplitChoreography(splitProgress),
    [splitProgress]
  );

  const activeInspection: EntityComparisonInspection = useMemo(
    () =>
      getInspectableEntityComparison(
        hoveredEntityId ?? selectedEntityId,
        comparisonState
      ),
    [hoveredEntityId, selectedEntityId, comparisonState]
  );

  const handleReplaySplit = () => {
    setIsPlaying(false);
    setSplitProgress(0);
    setSimTimeMinutes(435); // 07:15 pre-closure
    setIsReplayingSplit(true);
  };

  const handleToggleMergeSplit = () => {
    setIsReplayingSplit(false);
    setSplitProgress((prev) => (prev > 0.5 ? 0.15 : 1));
  };

  const handleResetView = () => {
    setIsPlaying(false);
    setIsReplayingSplit(false);
    setSplitProgress(1);
    setSimTimeMinutes(525); // 08:45 peak comparison
    setZoomMode('overview');
    setSelectedEntityId('BRIDGE_CENTRAL');
  };

  const closureMarkerPct =
    ((PARALLEL_FUTURES_CLOSURE_MIN - PARALLEL_FUTURES_START_MIN) /
      (PARALLEL_FUTURES_END_MIN - PARALLEL_FUTURES_START_MIN)) *
    100;

  return (
    <section
      ref={sectionRef}
      id="parallel-futures"
      data-testid="section-parallel-futures"
      className="py-24 lg:py-32 border-b border-[#171A1C]/12 bg-[#F6F5F1]"
    >
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        {/* 1. Section Header & Narrative Framing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-[#171A1C]/12 items-end">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#E85D36]">
                04 // SIDE-BY-SIDE REALITY COMPARISON
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#666D70] px-2.5 py-0.5 border border-[#171A1C]/15 bg-[#FAF9F6]">
                PARALLEL REALITIES — ONE WORLD, TWO OUTCOMES
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-[-0.03em] leading-[1.04] text-[#171A1C]">
              One decision. Two possible futures.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg text-[#24282B] leading-relaxed">
              Compare how the same city responds without intervention versus with a
              coordinated strategy after an unscheduled 07:30 lockdown on the Meridian
              Central Bridge.
            </p>
          </div>
        </div>

        {/* 2. Intervention Strategy Bar & Exhibit Camera / Split Controls */}
        <div className="mt-8 bg-[#FAF9F6] border border-[#171A1C]/15 p-4 sm:p-5 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="shrink-0">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#666D70]">
                FUTURE B INTERVENTION STRATEGY
              </div>
              <div className="font-mono text-xs font-semibold text-[#171A1C]">
                {comparisonState.interventionMeta.shortCode}
              </div>
            </div>
            <div
              className="flex flex-wrap gap-1.5"
              role="group"
              aria-label="Select coordinated intervention strategy"
            >
              {(
                [
                  { id: 'reroute_vehicles', label: 'Dynamic Rerouting' },
                  { id: 'increase_transit', label: 'Transit Capacity Surge' },
                  { id: 'coordinate_deliveries', label: 'Freight Window Slotting' },
                ] as const
              ).map((item) => {
                const isActive = activeIntervention === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    data-testid={`futures-intervention-${item.id}`}
                    onClick={() => onSelectIntervention(item.id)}
                    className={`px-3.5 py-2 font-mono text-xs uppercase tracking-[0.12em] transition-colors cursor-pointer border ${
                      isActive
                        ? 'bg-[#171A1C] text-[#FAF9F6] border-[#171A1C] font-semibold'
                        : 'bg-[#F6F5F1] text-[#24282B] border-[#171A1C]/15 hover:border-[#171A1C]/40'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reality Split & Viewport Framing Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#666D70] mr-1 hidden sm:inline">
              {choreography.phaseLabel}
            </span>
            <button
              type="button"
              data-testid="futures-replay-split"
              onClick={handleReplaySplit}
              className="px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] border border-[#171A1C]/20 bg-[#F6F5F1] text-[#171A1C] hover:border-[#171A1C] transition-colors cursor-pointer"
            >
              Replay Split
            </button>
            <button
              type="button"
              data-testid="futures-split-toggle"
              onClick={handleToggleMergeSplit}
              className="px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] border border-[#171A1C]/20 bg-[#F6F5F1] text-[#171A1C] hover:border-[#171A1C] transition-colors cursor-pointer"
            >
              {choreography.splitAmount > 0.5 ? 'Merge View' : 'Split Futures'}
            </button>
            <button
              type="button"
              data-testid="futures-zoom-toggle"
              onClick={() =>
                setZoomMode((prev) =>
                  prev === 'overview' ? 'bridge_focus' : 'overview'
                )
              }
              className={`px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] border transition-colors cursor-pointer ${
                zoomMode === 'bridge_focus'
                  ? 'bg-[#171A1C] text-[#FAF9F6] border-[#171A1C]'
                  : 'bg-[#F6F5F1] text-[#171A1C] border-[#171A1C]/20 hover:border-[#171A1C]'
              }`}
            >
              {zoomMode === 'bridge_focus' ? 'Zoom: Crossings (1.28x)' : 'Focus Crossings'}
            </button>
            <button
              type="button"
              data-testid="futures-reset-view"
              onClick={handleResetView}
              className="px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] border border-[#171A1C]/20 bg-[#F6F5F1] text-[#666D70] hover:text-[#171A1C] hover:border-[#171A1C] transition-colors cursor-pointer"
            >
              Reset View
            </button>
          </div>
        </div>

        {/* 3. Synchronized Simulation Timeline Bar (07:00 to 10:00) */}
        <div
          data-testid="futures-synchronized-timeline"
          className="mt-3 bg-[#FAF9F6] border border-[#171A1C]/15 p-4 sm:px-5 sm:py-3.5"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Left Playback & Clock Readout */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                data-testid="futures-timeline-play"
                onClick={() => setIsPlaying((p) => !p)}
                className="px-3.5 py-1.5 bg-[#171A1C] text-[#FAF9F6] font-mono text-xs uppercase tracking-[0.14em] hover:bg-[#E85D36] transition-colors cursor-pointer"
              >
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#666D70]">
                  SYNCHRONIZED SIMULATION CLOCK
                </div>
                <div className="flex items-center gap-2">
                  <span
                    data-testid="futures-clock-display"
                    className="font-mono text-lg font-bold text-[#171A1C]"
                  >
                    {comparisonState.timeFormatted}
                  </span>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.12em] px-1.5 py-0.5 ${
                      comparisonState.closureActive
                        ? 'bg-[#E85D36]/15 text-[#D94E3E] font-semibold'
                        : 'bg-[#171A1C]/10 text-[#24282B]'
                    }`}
                  >
                    {comparisonState.closureActive
                      ? `T+${comparisonState.minutesSinceClosure}M POST-CLOSURE`
                      : 'PRE-DISRUPTION BASELINE'}
                  </span>
                </div>
              </div>
            </div>

            {/* Center Timeline Scrubber Track */}
            <div className="flex-1 max-w-2xl">
              <div className="relative pt-4 pb-1">
                {/* 07:30 Bridge Closure Marker Pin */}
                <div
                  style={{ left: `${closureMarkerPct}%` }}
                  className="absolute top-0 -translate-x-1/2 flex flex-col items-center pointer-events-none"
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#D94E3E] font-semibold whitespace-nowrap">
                    07:30 BRIDGE CLOSURE
                  </span>
                  <span className="w-0.5 h-2.5 bg-[#D94E3E]" />
                </div>

                <input
                  type="range"
                  data-testid="futures-timeline-slider"
                  aria-label="Synchronized simulation time (07:00 to 10:00)"
                  min={PARALLEL_FUTURES_START_MIN}
                  max={PARALLEL_FUTURES_END_MIN}
                  step={5}
                  value={comparisonState.timeMinutes}
                  onChange={(e) => {
                    setIsPlaying(false);
                    setSimTimeMinutes(Number(e.target.value));
                  }}
                  className="w-full accent-[#171A1C] cursor-pointer h-1.5 bg-[#E0DFDA]"
                />

                <div className="flex justify-between font-mono text-[10px] text-[#666D70] mt-1">
                  <span>07:00</span>
                  <span>07:30</span>
                  <span>08:15</span>
                  <span>09:00</span>
                  <span>10:00</span>
                </div>
              </div>
            </div>

            {/* Right Quick Time Checkpoints */}
            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              {[
                { min: 430, label: '07:10 Nominal' },
                { min: 450, label: '07:30 Closure' },
                { min: 525, label: '08:45 Peak' },
                { min: 585, label: '09:45 Late' },
              ].map((cp) => (
                <button
                  key={cp.min}
                  type="button"
                  data-testid={`futures-checkpoint-${cp.min}`}
                  onClick={() => {
                    setIsPlaying(false);
                    setSimTimeMinutes(cp.min);
                  }}
                  className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] border cursor-pointer transition-colors ${
                    Math.abs(comparisonState.timeMinutes - cp.min) <= 5
                      ? 'bg-[#171A1C] text-[#FAF9F6] border-[#171A1C]'
                      : 'bg-[#F6F5F1] text-[#24282B] border-[#171A1C]/15 hover:border-[#171A1C]/40'
                  }`}
                >
                  {cp.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile View Mode Switcher (visible on small screens) */}
        <div className="mt-4 flex lg:hidden items-center justify-between bg-[#FAF9F6] border border-[#171A1C]/15 p-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#666D70] pl-2">
            MOBILE VIEWPORT MODE
          </span>
          <div className="flex gap-1">
            {(
              [
                { id: 'both', label: 'Stacked' },
                { id: 'A', label: 'Future A' },
                { id: 'B', label: 'Future B' },
              ] as const
            ).map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMobileActiveTab(m.id)}
                className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] border ${
                  mobileActiveTab === m.id
                    ? 'bg-[#171A1C] text-[#FAF9F6] border-[#171A1C]'
                    : 'bg-[#F6F5F1] text-[#24282B] border-[#171A1C]/15'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Synchronized Side-by-Side 2.5D Reality Comparison Stage */}
        <div
          className={`mt-6 grid grid-cols-1 lg:grid-cols-2 transition-all duration-500 ${
            choreography.splitAmount > 0.5 ? 'gap-6 lg:gap-8' : 'gap-2 lg:gap-2'
          }`}
        >
          {/* ===============================================================
              LEFT PANEL — FUTURE A // BASELINE (WITHOUT INTERVENTION)
              =============================================================== */}
          <div
            data-testid="parallel-future-baseline"
            style={{
              transform:
                choreography.splitAmount < 1
                  ? `translateX(${(1 - choreography.splitAmount) * 14}px)`
                  : undefined,
            }}
            className={`bg-[#FAF9F6] border border-[#171A1C]/15 p-5 sm:p-7 flex flex-col justify-between transition-transform duration-500 ${
              mobileActiveTab === 'B' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            <div>
              {/* Panel Top Header */}
              <div className="pb-5 mb-5 border-b border-[#171A1C]/12">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#E85D36]" />
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#D94E3E] font-semibold">
                      FUTURE A // BASELINE
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-[#E85D36]/12 border border-[#E85D36]/30 text-[#D94E3E] font-mono text-[10px] uppercase tracking-[0.12em] font-semibold">
                    UNCOORDINATED RESPONSE
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#171A1C] leading-tight">
                  Without intervention.
                </h3>
                <p className="text-xs sm:text-sm text-[#666D70] mt-1">
                  {comparisonState.baseline.subtitle}
                </p>
              </div>

              {/* Large 2.5D Isometric City Viewport (~60% of panel height) */}
              <IsometricCityViewport
                city={city}
                worldState={comparisonState.baseline}
                selectedEntityId={selectedEntityId}
                hoveredEntityId={hoveredEntityId}
                onSelectEntity={setSelectedEntityId}
                onHoverEntity={setHoveredEntityId}
                zoomMode={zoomMode}
                bridgeAlertIntensity={choreography.bridgeAlertIntensity}
                divergenceAlpha={choreography.divergenceAlpha}
              />

              {/* 3 Key Comparative Metrics */}
              <div
                style={{ opacity: choreography.metricsAlpha }}
                className="grid grid-cols-3 gap-3 mt-6 py-5 border-y border-[#171A1C]/12 transition-opacity duration-300"
              >
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#666D70]">
                    TRAVEL DELAY
                  </div>
                  <div
                    data-testid="baseline-metric-delay"
                    className="font-mono text-2xl sm:text-3xl font-bold text-[#D94E3E] mt-1"
                  >
                    {comparisonState.baseline.metrics.avgTravelDelayMin}m
                  </div>
                  <div className="font-mono text-[10px] text-[#666D70] mt-0.5">
                    Cross-river average
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#666D70]">
                    CONGESTION
                  </div>
                  <div
                    data-testid="baseline-metric-congestion"
                    className="font-mono text-2xl sm:text-3xl font-bold text-[#D94E3E] mt-1"
                  >
                    {comparisonState.baseline.metrics.congestionIndex}%
                  </div>
                  <div className="font-mono text-[10px] text-[#666D70] mt-0.5">
                    Arterial queue index
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#666D70]">
                    DELIVERIES
                  </div>
                  <div
                    data-testid="baseline-metric-deliveries"
                    className="font-mono text-2xl sm:text-3xl font-bold text-[#171A1C] mt-1"
                  >
                    {comparisonState.baseline.metrics.completedDeliveries}
                  </div>
                  <div className="font-mono text-[10px] text-[#666D70] mt-0.5">
                    Completed shipments
                  </div>
                </div>
              </div>

              {/* 2 Concise Scenario Observations */}
              <ul className="mt-5 space-y-2.5 text-sm text-[#24282B]">
                {comparisonState.baseline.observations.map((obs, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-2 h-2 bg-[#E85D36] mt-1.5 shrink-0" />
                    <span>{obs}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ===============================================================
              RIGHT PANEL — FUTURE B // ALTERNATIVE (COORDINATED RESPONSE)
              =============================================================== */}
          <div
            data-testid="parallel-future-alternative"
            style={{
              transform:
                choreography.splitAmount < 1
                  ? `translateX(-${(1 - choreography.splitAmount) * 14}px)`
                  : undefined,
            }}
            className={`bg-[#FAF9F6] border-2 border-[#171A1C] p-5 sm:p-7 flex flex-col justify-between transition-transform duration-500 ${
              mobileActiveTab === 'A' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            <div>
              {/* Panel Top Header */}
              <div className="pb-5 mb-5 border-b border-[#171A1C]/12">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#259A6C]" />
                    <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#259A6C] font-semibold">
                      FUTURE B // ALTERNATIVE
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 bg-[#259A6C]/15 border border-[#259A6C]/35 text-[#259A6C] font-mono text-[10px] uppercase tracking-[0.12em] font-semibold">
                    {comparisonState.interventionMeta.label.toUpperCase()}
                  </span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#171A1C] leading-tight">
                  With a coordinated response.
                </h3>
                <p className="text-xs sm:text-sm text-[#666D70] mt-1">
                  {comparisonState.alternative.subtitle}
                </p>
              </div>

              {/* Large 2.5D Isometric City Viewport (~60% of panel height) */}
              <IsometricCityViewport
                city={city}
                worldState={comparisonState.alternative}
                selectedEntityId={selectedEntityId}
                hoveredEntityId={hoveredEntityId}
                onSelectEntity={setSelectedEntityId}
                onHoverEntity={setHoveredEntityId}
                zoomMode={zoomMode}
                bridgeAlertIntensity={choreography.bridgeAlertIntensity}
                divergenceAlpha={choreography.divergenceAlpha}
              />

              {/* 3 Key Comparative Metrics with Delta Badges */}
              <div
                style={{ opacity: choreography.metricsAlpha }}
                className="grid grid-cols-3 gap-3 mt-6 py-5 border-y border-[#171A1C]/12 transition-opacity duration-300"
              >
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#666D70]">
                    TRAVEL DELAY
                  </div>
                  <div className="flex items-baseline gap-2 mt-1 flex-wrap">
                    <span
                      data-testid="alternative-metric-delay"
                      className="font-mono text-2xl sm:text-3xl font-bold text-[#259A6C]"
                    >
                      {comparisonState.alternative.metrics.avgTravelDelayMin}m
                    </span>
                    {comparisonState.deltas.delaySavedMin > 0 && (
                      <span className="font-mono text-[11px] font-semibold px-1.5 py-0.5 bg-[#259A6C]/12 text-[#259A6C]">
                        -{comparisonState.deltas.delaySavedMin}m
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-[10px] text-[#666D70] mt-0.5">
                    Faster recovery
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#666D70]">
                    CONGESTION
                  </div>
                  <div className="flex items-baseline gap-2 mt-1 flex-wrap">
                    <span
                      data-testid="alternative-metric-congestion"
                      className="font-mono text-2xl sm:text-3xl font-bold text-[#259A6C]"
                    >
                      {comparisonState.alternative.metrics.congestionIndex}%
                    </span>
                    {comparisonState.deltas.congestionReducedPct > 0 && (
                      <span className="font-mono text-[11px] font-semibold px-1.5 py-0.5 bg-[#259A6C]/12 text-[#259A6C]">
                        -{comparisonState.deltas.congestionReducedPct}%
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-[10px] text-[#666D70] mt-0.5">
                    Balanced load
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#666D70]">
                    DELIVERIES
                  </div>
                  <div className="flex items-baseline gap-2 mt-1 flex-wrap">
                    <span
                      data-testid="alternative-metric-deliveries"
                      className="font-mono text-2xl sm:text-3xl font-bold text-[#171A1C]"
                    >
                      {comparisonState.alternative.metrics.completedDeliveries}
                    </span>
                    {comparisonState.deltas.extraDeliveries > 0 && (
                      <span className="font-mono text-[11px] font-semibold px-1.5 py-0.5 bg-[#259A6C]/12 text-[#259A6C]">
                        +{comparisonState.deltas.extraDeliveries}
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-[10px] text-[#666D70] mt-0.5">
                    Completed shipments
                  </div>
                </div>
              </div>

              {/* 2 Concise Scenario Observations (Dynamic per Intervention) */}
              <ul className="mt-5 space-y-2.5 text-sm text-[#24282B]">
                {comparisonState.alternative.observations.map((obs, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-2 h-2 bg-[#259A6C] mt-1.5 shrink-0" />
                    <span>{obs}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 5. Synchronized Paired Entity Inspector Bar & Synthetic Data Disclosure */}
        <div
          data-testid="futures-paired-inspector"
          className="mt-6 bg-[#FAF9F6] border border-[#171A1C]/15 p-4 sm:p-5"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#171A1C]/12">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#E85D36] font-semibold">
                  PAIRED ENTITY INSPECTION // SYNCHRONIZED SELECTION
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] px-2 py-0.5 bg-[#E8E8E3] text-[#171A1C]">
                  {activeInspection.code}
                </span>
              </div>
              <h4 className="font-display text-lg sm:text-xl font-bold text-[#171A1C] mt-1">
                {activeInspection.name}
              </h4>
            </div>

            {/* Quick Entity Selector Buttons */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'BRIDGE_CENTRAL', label: 'Central Bridge' },
                { id: 'BRIDGE_WEST', label: 'West Viaduct' },
                { id: 'BRIDGE_EAST', label: 'East Crossing' },
                { id: 'FINANCIAL_CBD', label: 'Financial CBD' },
                { id: 'MIDTOWN', label: 'Midtown' },
                { id: 'WEST_HARBOR', label: 'West Harbor' },
                { id: 'EAST_HUB', label: 'East Hub' },
              ].map((item) => {
                const isSelected = (hoveredEntityId ?? selectedEntityId) === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    data-testid={`inspect-entity-${item.id}`}
                    onClick={() => setSelectedEntityId(item.id)}
                    className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] border cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-[#171A1C] text-[#FAF9F6] border-[#171A1C]'
                        : 'bg-[#F6F5F1] text-[#24282B] border-[#171A1C]/15 hover:border-[#171A1C]/40'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 items-center">
            <div className="p-3 bg-[#F6F5F1] border-l-2 border-[#E85D36]">
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#D94E3E] font-semibold">
                FUTURE A // {activeInspection.baselineMetric}
              </div>
              <div className="text-xs sm:text-sm text-[#24282B] mt-1">
                {activeInspection.baselineStatus}
              </div>
            </div>

            <div className="p-3 bg-[#F6F5F1] border-l-2 border-[#259A6C]">
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#259A6C] font-semibold">
                FUTURE B // {activeInspection.alternativeMetric}
              </div>
              <div className="text-xs sm:text-sm text-[#24282B] mt-1">
                {activeInspection.alternativeStatus}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col justify-between items-start sm:items-center md:items-end gap-2 text-right">
              <div className="font-mono text-xs font-semibold text-[#259A6C] bg-[#259A6C]/10 px-2.5 py-1 border border-[#259A6C]/30">
                {activeInspection.alternativeBenefit}
              </div>
              <div
                data-testid="futures-synthetic-disclosure"
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#666D70]"
              >
                Illustrative simulation · Synthetic data
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
