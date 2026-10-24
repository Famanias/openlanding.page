import type { CSSProperties, ReactNode } from "react";
export function Reveal({ children, variant = "rise", className = "", index = 0 }: { children: ReactNode; variant?: "rise" | "mask" | "wipe" | "scale" | "draw"; className?: string; index?: number }) {
  return <div className={className} data-mh-reveal={variant} style={{ "--i": index } as CSSProperties}><div className="mh-reveal-inner">{children}</div></div>;
}
