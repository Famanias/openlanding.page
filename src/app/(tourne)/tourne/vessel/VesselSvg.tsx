import { useId } from "react";
import { glazeById } from "./glazes";
import { sampleProfile, type VesselParams } from "./profile";

const VIEW_W = 240;
const VIEW_H = 300;
const CENTRE_X = VIEW_W / 2;
const BASE_Y = 276;
const RADIUS_PX = 96;
const MIN_HEIGHT_PX = 70;
const HEIGHT_RANGE_PX = 190;

/** Pure: the closed silhouette path (right wall up, left wall down) for a vessel. */
export function silhouettePath(params: VesselParams): string {
  const height = MIN_HEIGHT_PX + params.height * HEIGHT_RANGE_PX;
  const points = sampleProfile(params, 36);
  const right = points.map((p) => `${(CENTRE_X + p.r * RADIUS_PX).toFixed(1)} ${(BASE_Y - p.y * height).toFixed(1)}`);
  const left = [...points].reverse().map((p) => `${(CENTRE_X - p.r * RADIUS_PX).toFixed(1)} ${(BASE_Y - p.y * height).toFixed(1)}`);
  return `M${right.join(" L")} L${left.join(" L")} Z`;
}

type VesselSvgProps = { params: VesselParams; glazeId: string; className?: string; label?: string };

/** Server-renderable vessel: the no-JS, reduced-motion and pre-WebGL poster. */
export function VesselSvg({ params, glazeId, className, label }: VesselSvgProps) {
  const id = useId();
  const glaze = glazeById(glazeId);
  const path = silhouettePath(params);
  const height = MIN_HEIGHT_PX + params.height * HEIGHT_RANGE_PX;
  const rings = Array.from({ length: 9 }, (_, i) => BASE_Y - ((i + 1) / 10) * height);
  return (
    <svg
      className={className}
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <defs>
        <clipPath id={`${id}-clip`}>
          <path d={path} />
        </clipPath>
        <linearGradient id={`${id}-shade`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.28" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0.18" />
          <stop offset="0.7" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.32" />
        </linearGradient>
      </defs>
      <ellipse cx={CENTRE_X} cy={BASE_Y + 6} rx="112" ry="14" fill="#2A231F" />
      <ellipse cx={CENTRE_X} cy={BASE_Y + 3} rx="112" ry="14" fill="#8A7A6C" opacity="0.5" />
      <path d={path} fill={glaze.color} />
      <g clipPath={`url(#${id}-clip)`}>
        {rings.map((y) => (
          <line key={y} x1="0" x2={VIEW_W} y1={y} y2={y} stroke="#000" strokeOpacity="0.07" strokeWidth="1" />
        ))}
        <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill={`url(#${id}-shade)`} />
      </g>
    </svg>
  );
}
