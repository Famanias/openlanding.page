"use client";

import React, { useSyncExternalStore } from "react";
import { getDefaultDescentStore } from "./store";
import {
  calculatePressure,
  calculateLightAbsorption,
  calculateWaterTemp,
  getOceanZone,
} from "./physics";

export function GaugeHUD({ className = "" }: { className?: string }) {
  const store = getDefaultDescentStore();
  const depth = useSyncExternalStore(store.subscribe, store.getSnapshot, () => 0);

  const pressure = calculatePressure(depth);
  const absorption = calculateLightAbsorption(depth);
  const temp = calculateWaterTemp(depth);
  const zone = getOceanZone(depth);

  const isHadal = depth >= 6000;

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-4 gap-3 bg-navy/90 border border-glass rounded-lg p-4 md:p-6 backdrop-blur-md ${className}`}
      role="region"
      aria-label="Hydrostatic Telemetry Gauge"
    >
      {/* Metric 1: Depth */}
      <div className="flex flex-col">
        <span className="bat-mono text-[11px] text-slate uppercase tracking-wider">Depth Sounding</span>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="bat-mono text-2xl md:text-3xl font-bold text-titanium tabular-nums">
            {depth.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          </span>
          <span className="bat-mono text-xs text-cyan font-bold">M</span>
        </div>
        <span className="text-xs text-mist mt-1 font-mono">
          Zone: <span className={isHadal ? "text-amber font-semibold" : "text-cyan"}>{zone.name}</span>
        </span>
      </div>

      {/* Metric 2: Pressure */}
      <div className="flex flex-col">
        <span className="bat-mono text-[11px] text-slate uppercase tracking-wider">Hydrostatic Load</span>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="bat-mono text-2xl md:text-3xl font-bold text-titanium tabular-nums">
            {pressure.bar.toFixed(1)}
          </span>
          <span className="bat-mono text-xs text-cyan font-bold">BAR</span>
        </div>
        <span className="text-xs text-mist mt-1 font-mono">
          {(pressure.mpa).toFixed(1)} MPa · {isHadal ? "EXTREME LOAD" : "NOMINAL"}
        </span>
      </div>

      {/* Metric 3: Water Temperature */}
      <div className="flex flex-col">
        <span className="bat-mono text-[11px] text-slate uppercase tracking-wider">In-Situ Temp</span>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="bat-mono text-2xl md:text-3xl font-bold text-titanium tabular-nums">
            {temp.toFixed(1)}
          </span>
          <span className="bat-mono text-xs text-cyan font-bold">°C</span>
        </div>
        <span className="text-xs text-mist mt-1 font-mono">
          Salinity: 34.8 PSU
        </span>
      </div>

      {/* Metric 4: Solar Transmission */}
      <div className="flex flex-col">
        <span className="bat-mono text-[11px] text-slate uppercase tracking-wider">Solar Transmission</span>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="bat-mono text-2xl md:text-3xl font-bold text-titanium tabular-nums">
            {(absorption * 100).toFixed(1)}
          </span>
          <span className="bat-mono text-xs text-cyan font-bold">%</span>
        </div>
        <span className="text-xs text-mist mt-1 font-mono">
          {absorption === 0 ? "100% Extinct (Void)" : "Attenuating"}
        </span>
      </div>
    </div>
  );
}
