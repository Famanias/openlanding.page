"use client";

import type { ReactNode } from "react";
import { useInView } from "./useInView";

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return <div ref={ref} className={className} data-reveal data-in={inView ? "true" : "false"}>{children}</div>;
}
