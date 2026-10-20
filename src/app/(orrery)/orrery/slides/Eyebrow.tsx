export function Eyebrow({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <p className="orr-eyebrow orr-label orr-reveal" style={{ "--i": 0 } as React.CSSProperties}>
      {String(n).padStart(2, "0")} — {children}
    </p>
  );
}

/** Stagger index for `.orr-reveal` children (only animates in desktop keynote mode). */
export const rv = (i: number) => ({ "--i": i }) as React.CSSProperties;
