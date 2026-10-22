/** A small label with a drawn rule: "01 — How it works". */
export function Eyebrow({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="sa-eyebrow" data-reveal="draw">
      <span className="sa-eyebrow__rule" aria-hidden="true" />
      <span className="sa-eyebrow__n">{n}</span>
      {children}
    </p>
  );
}
