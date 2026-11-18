import { NOSE_PATH } from "./Logo";

/** A round rubber stamp: words around the rim, the nose in the middle. Used for "All clear" and "Booked". */
export function Stamp({ top, bottom, className, id }: { top: string; bottom: string; className?: string; id: string }) {
  return (
    <svg className={`sn-stamp ${className ?? ""}`} viewBox="0 0 200 200" aria-hidden="true">
      <defs>
        <path id={`${id}-top`} d="M30 100a70 70 0 0 1 140 0" />
        <path id={`${id}-bottom`} d="M22 100a78 78 0 0 0 156 0" />
      </defs>
      <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="7" />
      <circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" strokeWidth="3" />
      <text className="sn-stamp-text">
        <textPath href={`#${id}-top`} startOffset="50%" textAnchor="middle">
          {top}
        </textPath>
      </text>
      <text className="sn-stamp-text">
        <textPath href={`#${id}-bottom`} startOffset="50%" textAnchor="middle">
          {bottom}
        </textPath>
      </text>
      <g transform="translate(46 44) scale(1.7)">
        <path d={NOSE_PATH} fill="currentColor" />
      </g>
    </svg>
  );
}
