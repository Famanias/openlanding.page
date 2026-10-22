import { segmentWedges } from "../content/segments";

/** A satsuma cut into `count` wedges, one per reel. The wedges pop in a cascade (--i) when revealed. */
export function SegmentRing({ count, className, label }: { count: number; className?: string; label?: string }) {
  const wedges = segmentWedges(count, 50, 50, count > 12 ? 16 : 14, 46, count > 12 ? 0.016 : 0.02);
  return (
    <svg className={`sa-ring ${className ?? ""}`} viewBox="0 0 100 100" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false">
      <circle cx="50" cy="50" r="48" className="sa-ring__peel" />
      {wedges.map((w, i) => (
        <path key={i} d={w.path} className="sa-ring__wedge" style={{ "--i": i, "--n": count } as React.CSSProperties} />
      ))}
      <circle cx="50" cy="50" r="5" className="sa-ring__core" />
    </svg>
  );
}
