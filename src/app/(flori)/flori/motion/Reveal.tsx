import type { CSSProperties, ReactNode } from "react";
export function Reveal({ children, className = "", variant = "rise", index = 0 }: { children: ReactNode; className?: string; variant?: "rise" | "mask" | "wipe" | "scale" | "draw"; index?: number }) {
  return <div className={className} data-reveal={variant} style={{ "--i": index } as CSSProperties}>{children}</div>;
}
