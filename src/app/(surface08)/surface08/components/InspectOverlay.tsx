'use client';

import React from 'react';
import { X } from 'lucide-react';
import type { TelemetryStats } from '../engine/effectTypes';

export interface InspectOverlayProps {
  open: boolean;
  telemetry: TelemetryStats;
  onClose: () => void;
}

export function InspectOverlay({ open, telemetry, onClose }: InspectOverlayProps) {
  if (!open) return null;

  return (
    <div
      role="region"
      aria-label="WebGL Telemetry Inspector"
      className="fixed top-16 right-4 sm:right-8 z-30 w-72 rounded-xl border border-white/15 bg-[#0a0c14]/95 p-4 text-xs font-tech-mono text-white/85 shadow-2xl"
      data-ui-interactive="true"
      data-testid="inspect-telemetry-overlay"
    >
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10">
        <span className="font-semibold tracking-wider text-white">GPU TELEMETRY INSPECTOR</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Telemetry Inspector"
          className="p-1 text-white/60 hover:text-white rounded cursor-pointer"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <dl className="space-y-1.5 text-[11px]">
        <div className="flex justify-between">
          <dt className="text-white/55">ACTIVE SURFACE</dt>
          <dd className="text-[#ff9b7a] font-semibold">{telemetry.activeEffectId}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-white/55">MEASURED FPS</dt>
          <dd className="text-white font-semibold">
            {telemetry.fps} FPS ({telemetry.frameTimeMs} ms)
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-white/55">RENDER BUFFER</dt>
          <dd className="text-white">
            {telemetry.width} × {telemetry.height} px
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-white/55">DEVICE PIXEL RATIO</dt>
          <dd className="text-white">
            {telemetry.dpr}x ({telemetry.effectiveQuality.toUpperCase()})
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-white/55">DRAW CALLS / TRIS</dt>
          <dd className="text-white">
            {telemetry.drawCalls} calls · {telemetry.triangles} tris
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-white/55">VRAM RESOURCES</dt>
          <dd className="text-white">
            {telemetry.textures} tex · {telemetry.geometries} geo
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-white/55">POINTER UV / VEL</dt>
          <dd className="text-white">
            ({telemetry.pointerUv[0].toFixed(2)}, {telemetry.pointerUv[1].toFixed(2)}) ·{' '}
            {telemetry.pointerSpeed.toFixed(2)}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-white/55">TRANSITION PASS</dt>
          <dd className="text-white/80">
            {telemetry.inTransition ? telemetry.transitionFamily : 'SETTLED'}
          </dd>
        </div>
      </dl>
    </div>
  );
}
