"use client";

import { useId, type CSSProperties } from "react";
import { PEAKS } from "./logic";
import { MOUNTAIN_PROFILES } from "./mountain-profiles";
import { expeditionTiming, formatDayRange } from "./expedition-timings";
import "./mountain-overview.css";

// Interleave lighter and darker tones so neighboring mountains stay distinct.
// Every relief keeps its original geometry and internal rock/snow contrast.
const SHADES = [1, 0.53, 0.85, 0.45, 0.76, 0.96, 0.6, 0.89, 0.49, 0.8, 0.65, 0.93, 0.56, 0.71];

function toneMatrix(shade: number): string {
  const luminance = [0.2126, 0.7152, 0.0722];
  const blue = [11 / 255, 42 / 255, 74 / 255];
  return [
    ...blue.flatMap((channel) => [
      ...luminance.map((weight) => Number(((1 - channel) * shade * weight).toFixed(5))),
      0,
      channel,
    ]),
    0, 0, 0, 1, 0,
  ].join(" ");
}

export function MountainOverview({ onSelectPeak }: { onSelectPeak: (peakId: string) => void }) {
  const id = useId();

  return (
    <div className="hy-mountain-overview" role="group" aria-label="All fourteen mountain profiles">
      {PEAKS.map((peak, index) => {
        const profile = MOUNTAIN_PROFILES[peak.id];
        const shade = SHADES[index];
        const filterId = `${id}-tone-${peak.id}`;

        return (
          <button
            key={peak.id}
            className="hy-mountain-overview__peak"
            type="button"
            data-peak={peak.id}
            aria-label={`Plan ${peak.name}, ${peak.elevation.toLocaleString()} metres`}
            onClick={() => onSelectPeak(peak.id)}
            style={{ "--hy-overview-shade": `${shade * 100}%` } as CSSProperties}
          >
            <svg className="hy-mountain-overview__relief" viewBox="0 90 1000 710" aria-hidden="true">
              <defs>
                <filter id={filterId} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
                  {/* Map source luminance onto a unique blue-to-white shade,
                      retaining transparency around the actual skyline. */}
                  <feColorMatrix type="matrix" values={toneMatrix(shade)} />
                </filter>
              </defs>
              <image href={profile.artwork} width="1000" height="800" filter={`url(#${filterId})`} />
            </svg>
            <span className="hy-mountain-overview__caption">
              <span className="hy-mountain-overview__index">{String(index + 1).padStart(2, "0")}</span>
              <span className="hy-mountain-overview__details">
                <strong>{peak.name}</strong>
                <span>{peak.elevation.toLocaleString()} m</span>
                <span>{formatDayRange(expeditionTiming(peak.id).expedition)}</span>
              </span>
              <span className="hy-mountain-overview__swatch" aria-hidden="true" />
            </span>
          </button>
        );
      })}
    </div>
  );
}
