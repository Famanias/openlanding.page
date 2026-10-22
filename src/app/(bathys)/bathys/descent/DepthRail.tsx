"use client";

import React, { useSyncExternalStore } from "react";
import { getDefaultDescentStore } from "./store";
import { MAX_DEPTH, OCEAN_ZONES, depthToProgress } from "./physics";

export function DepthRail({ className = "" }: { className?: string }) {
  const store = getDefaultDescentStore();
  const depth = useSyncExternalStore(store.subscribe, store.getSnapshot, () => 0);
  const prog = depthToProgress(depth);

  return (
    <div
      className={`hidden lg:flex flex-col items-center justify-between py-6 px-3 bg-navy/80 border-l border-glass backdrop-blur-md select-none ${className}`}
      aria-hidden="true"
    >
      <div className="bat-mono text-[10px] text-slate uppercase tracking-widest rotate-180 [writing-mode:vertical-rl]">
        0 M · SURFACE
      </div>

      {/* Vertical Track */}
      <div className="relative w-1 flex-1 my-4 bg-glass rounded-full overflow-hidden">
        {/* Fill line */}
        <div
          className="absolute top-0 left-0 w-full bg-cyan transition-[height] duration-75"
          style={{ height: `${(prog * 100).toFixed(2)}%` }}
        />

        {/* Zone markers */}
        {OCEAN_ZONES.map((zone) => {
          const zoneProg = depthToProgress(zone.startDepth);
          return (
            <div
              key={zone.name}
              className="absolute left-1/2 -translate-x-1/2 w-3 h-[1px] bg-slate/60"
              style={{ top: `${(zoneProg * 100).toFixed(2)}%` }}
              title={`${zone.name}: ${zone.depthRange}`}
            />
          );
        })}
      </div>

      <div className="bat-mono text-[10px] text-amber uppercase tracking-widest rotate-180 [writing-mode:vertical-rl]">
        10,928 M · HADAL
      </div>
    </div>
  );
}
