interface EyebrowProps {
  sectionNumber: string;
  title: string;
  className?: string;
  light?: boolean;
}

export function Eyebrow({
  sectionNumber,
  title,
  className = "",
  light = false,
}: EyebrowProps) {
  return (
    <div
      className={`vr-eyebrow ${light ? "text-[var(--color-gilt)]" : "text-[var(--color-ash)]"} ${className}`}
    >
      <div className="vr-eyebrow__rule" />
      <span className="vr-mono text-xs font-semibold">
        {sectionNumber} — {title}
      </span>
    </div>
  );
}
