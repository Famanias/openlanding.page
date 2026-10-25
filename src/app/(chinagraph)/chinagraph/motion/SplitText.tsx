import type { CSSProperties } from "react";

type SplitTextProps = {
  /** Lines separated by "\n": fixed breaks keep CLS at 0 and make every line its own mask. */
  children: string;
  className?: string;
  /** Delay before the first line, in ms. */
  delay?: number;
};

/**
 * Mask-rise text. Each line sits in an overflow-clip wrapper; the inner span rises when the nearest
 * [data-in="true"] ancestor flips, or on load inside `.cg-load`. Screen readers get one plain string.
 */
export function SplitText({ children, className, delay = 0 }: SplitTextProps) {
  const lines = children.split("\n");
  return (
    <span className={`cg-split ${className ?? ""}`} style={{ "--split-delay": `${delay}ms` } as CSSProperties}>
      <span className="cg-sr">{lines.join(" ")}</span>
      {lines.map((line, index) => (
        <span key={`${index}-${line}`} className="cg-split__line" aria-hidden="true" style={{ "--line": index } as CSSProperties}>
          <span className="cg-split__inner">{line}</span>
        </span>
      ))}
    </span>
  );
}
