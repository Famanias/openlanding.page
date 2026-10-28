"use client";
import { useEffect } from "react";
export function Motion() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".am-page");
    if (!page) return;
    const cursor = document.querySelector<HTMLElement>(".am-cursor");
    const move = (event: PointerEvent) => {
      if (
        !matchMedia("(pointer:fine) and (prefers-reduced-motion:no-preference)")
          .matches
      )
        return;
      if (cursor) {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
        cursor.dataset.active = String(
          Boolean((event.target as Element).closest("button,a,input")),
        );
      }
      const button = (event.target as Element).closest<HTMLElement>(
        ".am-button",
      );
      if (button) {
        const rect = button.getBoundingClientRect();
        button.style.setProperty(
          "--magnet-x",
          `${(event.clientX - rect.left - rect.width / 2) * 0.09}px`,
        );
        button.style.setProperty(
          "--magnet-y",
          `${(event.clientY - rect.top - rect.height / 2) * 0.13}px`,
        );
        button.style.setProperty(
          "--pointer-x",
          `${event.clientX - rect.left}px`,
        );
      }
    };
    const leave = (event: PointerEvent) => {
      const button = (event.target as Element).closest?.<HTMLElement>(
        ".am-button",
      );
      if (button) {
        button.style.setProperty("--magnet-x", "0px");
        button.style.setProperty("--magnet-y", "0px");
      }
    };
    const press = (event: PointerEvent) => {
      const button = (event.target as Element).closest<HTMLElement>(
        ".am-button",
      );
      if (!button || matchMedia("(prefers-reduced-motion:reduce)").matches)
        return;
      const ripple = document.createElement("i"),
        r = button.getBoundingClientRect();
      ripple.className = "am-press-ripple";
      ripple.style.left = `${event.clientX - r.left}px`;
      ripple.style.top = `${event.clientY - r.top}px`;
      button.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), {
        once: true,
      });
    };
    page.addEventListener("pointermove", move);
    page.addEventListener("pointerout", leave);
    page.addEventListener("pointerdown", press);
    return () => {
      page.removeEventListener("pointermove", move);
      page.removeEventListener("pointerout", leave);
      page.removeEventListener("pointerdown", press);
    };
  }, []);
  return <div className="am-cursor" aria-hidden="true" />;
}
