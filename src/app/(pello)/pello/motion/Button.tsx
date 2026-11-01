"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
export function Button({ href, children, quiet = false, className = "" }: { href: string; children: ReactNode; quiet?: boolean; className?: string }) {
  const frame = useRef(0);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  return <a className={"pel-button " + (quiet ? "pel-button-quiet " : "") + className} href={href} onPointerMove={event => {
    if (event.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const el = event.currentTarget;
    const x = (event.clientX - rect.left - rect.width / 2) * .07;
    const y = (event.clientY - rect.top - rect.height / 2) * .07;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => { el.style.setProperty("--pel-mx", x + "px"); el.style.setProperty("--pel-my", y + "px"); });
  }} onPointerLeave={event => { cancelAnimationFrame(frame.current); event.currentTarget.style.removeProperty("--pel-mx"); event.currentTarget.style.removeProperty("--pel-my"); }}><span>{children}<ArrowUpRight size={18} aria-hidden="true"/></span></a>;
}
