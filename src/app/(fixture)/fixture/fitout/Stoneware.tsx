export type VesselKind = "mug" | "bowl" | "vase" | "jug";

const BODY: Record<VesselKind, string> = {
  mug: "M14 22h28v28c0 5-4 8-9 8H23c-5 0-9-3-9-8Z",
  bowl: "M6 30h48c0 14-10 24-24 24S6 44 6 30Z",
  vase: "M24 10h12v6c0 4 8 8 8 20 0 12-6 22-14 22s-14-10-14-22c0-12 8-16 8-20Z",
  jug: "M20 12h18l-2 8c6 4 10 10 10 20 0 10-7 18-16 18s-16-8-16-18c0-10 4-16 10-20Z",
};

const GLAZE: Record<VesselKind, string> = {
  mug: "M14 22h28v9c-3 2-5-1-7 2s-5 1-7-1-5 2-7 0-5 1-7-1Z",
  bowl: "M6 30h48c-1 4-4 6-7 4s-5 3-8 1-5 2-8 0-6 3-9 0-5 2-7-1Z",
  vase: "M24 10h12v6c0 2 2 4 4 6-3 2-5 0-7 3s-5-1-7 1-4-1-6 1c2-3 4-6 4-11Z",
  jug: "M20 12h18l-2 8c2 1 4 3 5 4-3 2-5-1-8 2s-5 0-7 1-4-1-6 1c1-4 4-6 6-8Z",
};

type VesselProps = { kind: VesselKind; tone?: "ink" | "graphite" | "white"; className?: string };

/** Coded stoneware for the demo merchant: a body, a dripped glaze line and a soft shadow. */
export function Vessel({ kind, tone = "graphite", className }: VesselProps) {
  return (
    <svg className={`fx-vessel ${className ?? ""}`} viewBox="0 0 60 64" aria-hidden="true" focusable="false" data-tone={tone}>
      <ellipse cx="30" cy="60" rx="20" ry="2.6" className="fx-vessel__shadow" />
      {kind === "mug" ? <path d="M42 28h4a6 6 0 0 1 0 12h-4" className="fx-vessel__handle" /> : null}
      {kind === "jug" ? <path d="M43 26c6 0 8 6 3 12" className="fx-vessel__handle" /> : null}
      <path d={BODY[kind]} className="fx-vessel__body" />
      <path d={GLAZE[kind]} className="fx-vessel__glaze" />
    </svg>
  );
}
