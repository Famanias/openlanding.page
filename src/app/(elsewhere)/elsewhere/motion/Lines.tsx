import type { CSSProperties } from "react";

type LinesProps = {
  /** One string per line. Breaks are authored, so the layout never shifts when the web font arrives. */
  lines: string[];
  /** Stagger offset, for headlines that follow another animated element. */
  from?: number;
};

/**
 * Headline lines for the mask-rise reveal. Each line sits in a clipping wrapper and its inner span rises.
 * It is plain markup: the parent decides when it plays, either `[data-reveal="lines"]` on scroll or the
 * hero's load keyframes. Screen readers get ordinary text, because nothing is split below the line.
 */
export function Lines({ lines, from = 0 }: LinesProps) {
  return (
    <>
      {lines.map((line, index) => (
        <span className="ew-line" key={line} style={{ "--i": from + index } as CSSProperties}>
          <span>{line}</span>
          {index < lines.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
