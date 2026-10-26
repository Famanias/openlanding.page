import type { Company, Glyph } from "../content/companies";

const GLYPHS: Record<Glyph, string> = {
  dot: "M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16Z",
  square: "M5 5h14v14H5Z",
  tri: "M12 4 21 20H3Z",
  wave: "M2 14c3-5 6-5 9 0s6 5 9 0v6H2Z",
  ring: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Zm0 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  bars: "M4 13h4v7H4ZM10 8h4v12h-4ZM16 4h4v16h-4Z",
  leaf: "M4 20C4 10 10 4 20 4c0 10-6 16-16 16Z",
  spark: "M12 2 14.5 9.5 22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z",
};

/** A fictional wordmark: a small glyph and the name, set in one of six type treatments. */
export function CompanyMark({ company, className }: { company: Company; className?: string }) {
  return (
    <span className={`us-co us-co--${company.treatment} ${className ?? ""}`}>
      <svg className="us-co__g" viewBox="0 0 24 24" aria-hidden="true"><path d={GLYPHS[company.glyph]} fill="currentColor" fillRule="evenodd" /></svg>
      <span className="us-co__n">{company.name}</span>
    </span>
  );
}
