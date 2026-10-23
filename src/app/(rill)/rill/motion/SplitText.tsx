"use client";

import type { CSSProperties } from "react";
import { useReducedMotion } from "./useReducedMotion";

type SplitTextProps = {
  children: string;
  className?: string;
};

export function SplitText({ children, className }: SplitTextProps) {
  const reduced = useReducedMotion();
  const lines = children.split("\n");
  return (
    <span className={className} data-split-text>
      {lines.map((line, index) => (
        <span key={`${line}-${index}`} className="rl-split-line" style={{ "--rl-index": index } as CSSProperties}>
          <span className={reduced ? undefined : "rl-split-line__inner"}>{line}</span>
        </span>
      ))}
    </span>
  );
}

