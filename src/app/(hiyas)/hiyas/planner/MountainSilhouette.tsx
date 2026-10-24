"use client";

import { useEffect, useRef, useState } from "react";
import type { CampStop } from "./logic";
import { MOUNTAIN_PROFILES } from "./mountain-profiles";

type Point = { x: number; y: number };

type MountainSilhouetteProps = {
  peakId: string;
  stops: CampStop[];
  locked: boolean;
  elevation: number;
};

function getFallbackPoint(routeStr: string, summit: Point, progress: number): Point {
  const match = routeStr.match(/^M\s*([\d.-]+)\s+([\d.-]+)/);
  const startX = match ? parseFloat(match[1]) : 800;
  const startY = match ? parseFloat(match[2]) : 700;
  return {
    x: Math.round(startX + (summit.x - startX) * progress),
    y: Math.round(startY + (summit.y - startY) * progress),
  };
}

export function MountainSilhouette({ peakId, stops, locked, elevation }: MountainSilhouetteProps) {
  const profile = MOUNTAIN_PROFILES[peakId] ?? MOUNTAIN_PROFILES.everest;
  const routeRef = useRef<SVGPathElement>(null);
  const [length, setLength] = useState(0);
  const [camps, setCamps] = useState<Point[]>([]);

  const progress = locked ? 1 : 0.78;

  useEffect(() => {
    const path = routeRef.current;
    if (!path || typeof path.getTotalLength !== "function") return;
    const total = path.getTotalLength();
    setLength(total);
    setCamps(stops.map((stop) => path.getPointAtLength(stop.progress * total)));
  }, [peakId, stops]);

  const climber =
    length && routeRef.current && typeof routeRef.current.getPointAtLength === "function"
      ? routeRef.current.getPointAtLength(progress * length)
      : getFallbackPoint(profile.route, profile.summit, progress);

  return (
    <svg
      className="hy-mountain-silhouette"
      viewBox="0 0 1000 800"
      preserveAspectRatio="xMidYMax meet"
      role="img"
      aria-label={`${profile.name} route profile and camps`}
    >
      {/* Topographic elevation grid across the cirque */}
      <g className="hy-silhouette__elevation-grid" aria-hidden="true">
        <line x1="20" y1="210" x2="980" y2="210" />
        <text x="28" y="204">8,000 M</text>
        <line x1="20" y1="380" x2="980" y2="380" />
        <text x="28" y="374">7,000 M</text>
        <line x1="20" y1="550" x2="980" y2="550" />
        <text x="28" y="544">6,000 M</text>
        <line x1="20" y1="710" x2="980" y2="710" />
        <text x="28" y="704">5,000 M — BASE</text>
      </g>

      {/* Distant background ridges */}
      {profile.backgroundRidges.map((d, index) => (
        <path key={index} d={d} className="hy-silhouette__ridge" />
      ))}

      {/* Lit face (morning / summit light) */}
      <path d={profile.litFace} className="hy-silhouette__lit" />

      {/* Shadow face (abrupt west / north aspect) */}
      <path d={profile.shadowFace} className="hy-silhouette__shadow" />

      {/* Couloirs and chutes */}
      {profile.couloirs.map((d, index) => (
        <path key={index} d={d} className="hy-silhouette__couloir" />
      ))}

      {/* Snow caps and high hanging ice fields */}
      {profile.snowCaps.map((d, index) => (
        <path key={index} d={d} className="hy-silhouette__snow" />
      ))}

      {/* Base glacier moraine plane */}
      <path d={profile.glacier} className="hy-silhouette__glacier" />

      {/* Moraine flow lines */}
      {profile.moraines.map((d, index) => (
        <path key={index} d={d} className="hy-silhouette__moraine" />
      ))}

      {/* Planned route (dashed line across the full line to the summit) */}
      <path ref={routeRef} d={profile.route} className="hy-silhouette__route" />

      {/* Climbed portion (solid white path following progress) */}
      <path
        d={profile.route}
        className="hy-silhouette__climbed"
        style={length ? { strokeDasharray: length, strokeDashoffset: length * (1 - progress) } : { opacity: 0 }}
      />

      {/* Camp markers positioned along the route */}
      {stops.map((stop, index) => {
        const pt = camps[index] ?? getFallbackPoint(profile.route, profile.summit, stop.progress);
        const isReached = progress >= stop.progress - 0.001;
        const isSummit = stop.progress === 1;
        const isBase = stop.progress === 0;
        const isRight = pt.x > 620;
        const textX = isRight ? pt.x - 14 : pt.x + 14;
        const anchor = isRight ? "end" : "start";

        return (
          <g
            key={stop.label}
            className="hy-silhouette__camp"
            data-reached={isReached ? "true" : undefined}
            data-summit={isSummit ? "true" : undefined}
          >
            <circle cx={pt.x} cy={pt.y} r={isSummit || isBase ? 8 : 6} className="hy-silhouette__camp-outer" />
            <circle cx={pt.x} cy={pt.y} r={isSummit ? 4.5 : 3.5} className="hy-silhouette__camp-inner" />
            <g className="hy-silhouette__camp-label-group" transform={`translate(${textX}, ${pt.y})`}>
              <text x="0" y="-3" textAnchor={anchor} className="hy-silhouette__camp-title">
                {stop.label}
              </text>
              <text x="0" y="11" textAnchor={anchor} className="hy-silhouette__camp-elevation">
                {stop.altitude.toLocaleString()} m
              </text>
            </g>
          </g>
        );
      })}

      {/* Current climber position along the line */}
      <g className="hy-silhouette__climber" transform={`translate(${climber.x}, ${climber.y})`}>
        <circle r={14} className="hy-silhouette__climber-halo" />
        <circle r={4.5} className="hy-silhouette__climber-dot" />
      </g>

      {/* Summit beacon when the expedition plan is locked */}
      {locked && (
        <g className="hy-silhouette__summit-marker" transform={`translate(${profile.summit.x}, ${profile.summit.y})`}>
          <circle r={22} className="hy-silhouette__summit-pulse" />
          <circle r={6} className="hy-silhouette__summit-center" />
        </g>
      )}
    </svg>
  );
}
