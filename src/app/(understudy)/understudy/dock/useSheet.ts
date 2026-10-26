"use client";
import { useEffect, type RefObject } from "react";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Sheet behaviour shared by the menu, Start and Ask: focus moves in on open and back to the
 * opener on close, Tab is held inside, Escape closes, and the page is held still behind it.
 */
export function useSheet(open: boolean, sheet: RefObject<HTMLElement | null>, onClose: () => void, initial?: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return;
    const el = sheet.current;
    if (!el) return;
    const opener = document.activeElement as HTMLElement | null;
    window.dispatchEvent(new CustomEvent("us:lock", { detail: true }));
    const raf = requestAnimationFrame(() => (initial?.current ?? el.querySelector<HTMLElement>(FOCUSABLE))?.focus({ preventScroll: true }));
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key !== "Tab") return;
      const items = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => n.offsetParent !== null);
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", key);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", key);
      window.dispatchEvent(new CustomEvent("us:lock", { detail: false }));
      opener?.focus?.({ preventScroll: true });
    };
  }, [open, sheet, onClose, initial]);
}
