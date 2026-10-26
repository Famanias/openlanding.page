"use client";
import { useRef } from "react";
import type { ReactNode } from "react";
export function Magnetic({ children }: { children: ReactNode }) { const ref = useRef<HTMLSpanElement>(null); return <span ref={ref} className="nli-magnetic" onPointerMove={(event) => { if (!matchMedia("(hover: hover) and (pointer: fine)").matches || !ref.current) return; const r = ref.current.getBoundingClientRect(); ref.current.style.setProperty("--mx", `${(event.clientX - r.left - r.width / 2) * 0.08}px`); ref.current.style.setProperty("--my", `${(event.clientY - r.top - r.height / 2) * 0.08}px`); }} onPointerLeave={() => { ref.current?.style.removeProperty("--mx"); ref.current?.style.removeProperty("--my"); }}>{children}</span>; }
