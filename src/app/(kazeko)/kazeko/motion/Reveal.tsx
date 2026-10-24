import type { CSSProperties, ReactNode } from "react";
export function Reveal({ children, variant = "rise", index = 0, className = "" }: { children: ReactNode; variant?: "rise" | "mask" | "wipe" | "scale" | "draw"; index?: number; className?: string }) {
  return <div className={className} data-kz-reveal={variant} style={{ "--i": index } as CSSProperties}>{children}</div>;
}
