import type { ReactNode } from "react";
export function Reveal({ children, className = "", type = "rise", index = 0 }: { children: ReactNode; className?: string; type?: string; index?: number }) {
  return <div className="nli-reveal-trigger"><div className={`nli-reveal nli-reveal--${type} ${className}`} data-reveal style={{ "--i": index } as React.CSSProperties}>{children}</div></div>;
}
