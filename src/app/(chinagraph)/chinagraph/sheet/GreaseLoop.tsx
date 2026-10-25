import type { CSSProperties } from "react";

const LOOPS = [
  "M50 6C76 4 95 22 94 49c-1 26-20 45-46 45C22 93 5 75 6 49 7 25 25 8 56 9",
  "M48 5c27-1 47 19 46 45-1 25-22 44-47 44S5 73 6 48C7 23 27 6 58 8",
  "M52 7c25 0 43 19 42 43-1 25-21 44-46 43C23 92 6 74 7 50 8 26 28 7 54 10",
];

/**
 * A hand-drawn grease-pencil loop. `pathLength={1}` lets CSS draw it with one custom property (--mark);
 * each frame gets a slightly different loop and tilt, the way a real editor's hand varies.
 */
export function GreaseLoop({ n, className }: { n: number; className?: string }) {
  const tilt = ((n * 37) % 18) - 9;
  return (
    <svg className={`cg-loop ${className ?? ""}`} viewBox="0 0 100 100" aria-hidden="true" focusable="false" style={{ "--tilt": `${tilt}deg` } as CSSProperties} data-loop={n}>
      <path d={LOOPS[n % LOOPS.length]} pathLength={1} />
    </svg>
  );
}
