"use client";

import { useEffect } from "react";

const ZOOM_KEYS = new Set(["+", "=", "-", "_"]);
const ZOOM_CODES = new Set(["Equal", "Minus", "NumpadAdd", "NumpadSubtract"]);

/**
 * Keeps the landing page at a fixed 100% scale on desktop browsers.
 *
 * The route's viewport export only covers touch pinch-zoom. Desktop zoom arrives as
 * Ctrl/Cmd + wheel (which trackpad pinch also reports as ctrlKey) and Ctrl/Cmd + "+"/"-".
 * Cancelling those events on this page is best effort: the browser menu and an OS-level
 * zoom cannot be blocked from a page. Ctrl/Cmd + 0 is left alone so a zoom level set
 * elsewhere can still be reset. Mounted only on the landing page, so listeners are removed
 * as soon as the visitor navigates to the app.
 */
export function ZoomLock() {
  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) event.preventDefault();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey || event.metaKey)) return;
      if (ZOOM_KEYS.has(event.key) || ZOOM_CODES.has(event.code)) event.preventDefault();
    };
    // Safari fires proprietary gesture events for trackpad pinch.
    const onGesture = (event: Event) => event.preventDefault();

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("gesturestart", onGesture);
    document.addEventListener("gesturechange", onGesture);
    document.addEventListener("gestureend", onGesture);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("gesturestart", onGesture);
      document.removeEventListener("gesturechange", onGesture);
      document.removeEventListener("gestureend", onGesture);
    };
  }, []);

  return null;
}
