"use client";

import { useEffect } from "react";
import { clamp, stepSpring } from "../studio/physics";

export function PointerMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".as-site");
    if (!root) return;
    const pointer = matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let target: HTMLElement | null = null;
    let bounds: DOMRect | null = null;
    const x = { value: 0, velocity: 0 }, y = { value: 0, velocity: 0 };
    let goalX = 0, goalY = 0, frame = 0, last = 0;

    function paint(now: number) {
      frame = 0;
      if (!target) return;
      const dt = Math.min((now - last) / 1000 || .016, .05); last = now;
      stepSpring(x, goalX, dt); stepSpring(y, goalY, dt);
      const card = target.matches(".as-quote, .as-benefit");
      if (card) {
        target.style.setProperty("--as-tilt-x", `${-y.value * 5}deg`);
        target.style.setProperty("--as-tilt-y", `${x.value * 5}deg`);
      } else target.style.translate = `${x.value * 7}px ${y.value * 5}px`;
      if (Math.abs(x.velocity) + Math.abs(y.velocity) > .001 || Math.abs(x.value - goalX) + Math.abs(y.value - goalY) > .001) frame = requestAnimationFrame(paint);
      else if (goalX === 0 && goalY === 0) clear();
    }
    function clear() {
      target?.style.removeProperty("translate");
      target?.style.removeProperty("--as-tilt-x"); target?.style.removeProperty("--as-tilt-y");
      target = null; bounds = null; x.value = y.value = x.velocity = y.velocity = 0;
    }
    function move(event: PointerEvent) {
      if (!pointer.matches || reduced.matches || event.pointerType === "touch") return;
      const next = (event.target as Element).closest<HTMLElement>(".as-button, .as-quote, .as-benefit");
      if (next !== target) { clear(); target = next; bounds = next?.getBoundingClientRect() ?? null; }
      if (!target || !bounds) return;
      goalX = clamp((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      goalY = clamp((event.clientY - bounds.top) / bounds.height) * 2 - 1;
      if (!frame) { last = performance.now(); frame = requestAnimationFrame(paint); }
    }
    function leave(event: PointerEvent) {
      if (event.relatedTarget instanceof Node && target?.contains(event.relatedTarget)) return;
      goalX = goalY = 0;
      if (target && !frame) { last = performance.now(); frame = requestAnimationFrame(paint); }
    }
    const reset = () => { cancelAnimationFrame(frame); frame = 0; clear(); };
    root.addEventListener("pointermove", move, { passive: true }); root.addEventListener("pointerout", leave);
    reduced.addEventListener("change", reset); pointer.addEventListener("change", reset);
    window.addEventListener("scroll", reset, { passive: true });
    return () => {
      reset(); root.removeEventListener("pointermove", move); root.removeEventListener("pointerout", leave);
      reduced.removeEventListener("change", reset); pointer.removeEventListener("change", reset);
      window.removeEventListener("scroll", reset);
    };
  }, []);
  return null;
}
