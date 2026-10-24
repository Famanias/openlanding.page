"use client";

import { useEffect, useId, useRef, useState } from "react";
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
  const descriptionId = useId();
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
      aria-describedby={descriptionId}
    >
      <desc id={descriptionId}>
        {profile.name}, {elevation.toLocaleString()} metres. {profile.viewpoint}.
        {` ${profile.features}. Photo-derived relief with schematic expedition waypoints. `}
        {`Artwork adapted from ${profile.attribution.author}, ${profile.attribution.license}. `}
        {`Source: ${profile.attribution.source}. License: ${profile.attribution.licenseUrl}.`}
      </desc>
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

      {/* The external SVG has nine tonal paths traced from the actual mountain.
          Keeping it outside the component avoids shipping relief coordinates in
          client JavaScript; only the selected peak's artwork is requested. */}
      <image
        key={profile.id}
        href={profile.artwork}
        x="0"
        y="0"
        width="1000"
        height="800"
        className="hy-silhouette__terrain"
        aria-hidden="true"
      />

      {/* A dark casing keeps the itinerary readable across snow and rock. */}
      <path d={profile.route} className="hy-silhouette__route-casing" />

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
