import type { CSSProperties, ReactNode } from "react";
export function Reveal({ children, variant = "rise", className = "", index = 0 }: { children: ReactNode; variant?: "rise" | "mask" | "wipe" | "scale" | "draw"; className?: string; index?: number }) {
  return <div className={className} data-reveal={variant} data-in="false" style={{ "--pel-i": index } as CSSProperties}>{children}</div>;
}
