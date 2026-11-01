'use client';

import React from 'react';
import { useParallelStore } from '../store/useParallelStore';

export const WebGLFallbackView: React.FC = () => {
  const { getCurrentSnapshots, scenarioParams, heroMode } = useParallelStore();
  const { snapshotA, snapshotB } = getCurrentSnapshots();

  return (
    <div
      className="absolute inset-0 bg-[#0B0C0E] flex flex-col items-center justify-center p-6 z-0 pointer-events-none overflow-hidden"
      aria-label="Static architectural diagram fallback for Meridian Urban System"
    >
      <div className="max-w-2xl w-full border border-[#F4F1EA]/15 bg-[#12141A] p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F4F1EA]/10 pb-3 mb-4">
          <div>
            <p className="text-[11px] font-mono text-[#F4F1EA]/60">
              ARCHITECTURAL SYSTEM DIAGRAM · MODE: {heroMode.toUpperCase()}
            </p>
            <h2 className="text-lg font-semibold text-[#F4F1EA] mt-0.5">
              MODEL 001 / MERIDIAN URBAN SYSTEM
            </h2>
          </div>
          <div className="text-xs font-mono text-[#FF5522]">
            {snapshotB.timeFormatted} · DEMAND: {scenarioParams.trafficDemandPct}%
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-[#F4F1EA]/12 bg-[#0B0C0E] p-4">
            <p className="text-xs font-mono text-[#E05A47]">
              BASELINE — NO INTERVENTION
            </p>
            <p className="text-xs text-[#F4F1EA]/80 mt-1.5 leading-relaxed">
              Meridian Central Bridge closed. Uncoordinated queues propagate into CBD and Harbor approaches.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 pt-2.5 border-t border-[#F4F1EA]/10 font-mono text-xs">
              <div>
                <span className="text-[#F4F1EA]/50 block text-[10px]">DELAY</span>
                <span className="text-sm text-[#E05A47] font-semibold">
                  +{snapshotA.metrics.avgTravelDelayMin}m
                </span>
              </div>
              <div>
                <span className="text-[#F4F1EA]/50 block text-[10px]">CONGESTION</span>
                <span className="text-sm text-[#F4F1EA] font-semibold">
                  {snapshotA.metrics.congestionIndex}/100
                </span>
              </div>
              <div>
                <span className="text-[#F4F1EA]/50 block text-[10px]">DELIVERIES</span>
                <span className="text-sm text-[#F4F1EA] font-semibold">
                  {snapshotA.metrics.completedDeliveries}
                </span>
              </div>
            </div>
          </div>

          <div className="border border-[#FF5522]/40 bg-[#0B0C0E] p-4">
            <p className="text-xs font-mono text-[#FF5522]">
              INTERVENTION — COORDINATED RESPONSE
            </p>
            <p className="text-xs text-[#F4F1EA]/80 mt-1.5 leading-relaxed">
              Active intervention ({scenarioParams.intervention.replace(/_/g, ' ')}) rebalances cross-river corridors.
            </p>
            <div className="mt-3 grid grid-cols-3 gap-2 pt-2.5 border-t border-[#F4F1EA]/10 font-mono text-xs">
              <div>
                <span className="text-[#F4F1EA]/50 block text-[10px]">DELAY</span>
                <span className="text-sm text-[#FF5522] font-semibold">
                  +{snapshotB.metrics.avgTravelDelayMin}m
                </span>
              </div>
              <div>
                <span className="text-[#F4F1EA]/50 block text-[10px]">CONGESTION</span>
                <span className="text-sm text-[#F4F1EA] font-semibold">
                  {snapshotB.metrics.congestionIndex}/100
                </span>
              </div>
              <div>
                <span className="text-[#F4F1EA]/50 block text-[10px]">DELIVERIES</span>
                <span className="text-sm text-[#F4F1EA] font-semibold">
                  {snapshotB.metrics.completedDeliveries}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
