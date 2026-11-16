"use client";
import type { ElementType, PointerEvent, ReactNode } from "react";

/**
 * Writes the pointer position onto the element as --tv-px / --tv-py so a radial highlight can follow it.
 * The glow itself is a pseudo-element in the CSS, shown only for fine pointers.
 */
export function Spotlight({ as, className, children }: { as?: ElementType; className?: string; children: ReactNode }) {
  const Tag: ElementType = as ?? "div";
  const onMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--tv-px", `${Math.round(event.clientX - box.left)}px`);
    event.currentTarget.style.setProperty("--tv-py", `${Math.round(event.clientY - box.top)}px`);
  };
  return (
    <Tag className={`tv-spot ${className ?? ""}`} onPointerMove={onMove}>
      {children}
    </Tag>
  );
}
