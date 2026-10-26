"use client";
import { useCallback, useEffect, useRef, type RefObject } from "react";
import { arcPlace, coast, flingVelocity, glideStep, loopX, type Sample } from "./carousel";

const DRIFT = -36; // px/s, right to left
const GAP = 16;
const SCROLL_PULL = 0.32; // px of ring travel per px of page scroll
const NOOP = { glide: (px: number) => void px, kick: () => {} };

export type RingMeasure = { slot: number; viewport: number };

/**
 * Runs the parts ring: an endless, gently arced row that drifts on its own, follows the page
 * scroll, can be dragged and flung, and eases to a stop while it's hovered, focused, holding an
 * open card or paused. One rAF loop writes each slot's transform; it sleeps when nothing moves
 * and when the ring is off screen. Under reduced motion it does nothing and the row scrolls natively.
 */
export function useRing(band: RefObject<HTMLElement | null>, track: RefObject<HTMLElement | null>, opts: {
  enabled: boolean; paused: boolean; layoutKey: string; onMeasure: (m: RingMeasure) => void;
}) {
  const { enabled, paused, layoutKey, onMeasure } = opts;
  const pausedRef = useRef(paused);
  const api = useRef(NOOP);

  useEffect(() => { pausedRef.current = paused; api.current.kick(); }, [paused]);

  useEffect(() => {
    const b = band.current, t = track.current;
    if (!b || !t || !enabled) return;
    let items: HTMLElement[] = [];
    let slot = 312, viewport = b.clientWidth, half = viewport / 2, arcHalf = Math.max(half, 560);
    let offset = 0, velocity = DRIFT, glideLeft = 0;
    let frame = 0, last = 0, visible = false, hover = false, focused = false;
    let drag: { id: number; x: number; moved: number; captured: boolean } | null = null;
    let samples: Sample[] = [];
    let lastScroll = scrollY;
    // the band's inline padding is the page gutter, resolved to px (a custom property would come back unresolved)
    const gut = () => parseFloat(getComputedStyle(b).paddingLeft) || 24;

    const measure = () => {
      items = Array.from(t.querySelectorAll<HTMLElement>(".us-part-slot"));
      const card = items[0]?.firstElementChild as HTMLElement | undefined;
      slot = (card?.offsetWidth ?? 296) + GAP;
      viewport = b.clientWidth;
      half = viewport / 2;
      // the arc's radius never drops below a desktop's, so phones get a gentle curve, not a steep one
      arcHalf = Math.max(half, 560);
      onMeasure({ slot, viewport });
    };

    const place = () => {
      const n = items.length;
      items.forEach((el, i) => {
        const x = loopX(i, n, slot, offset);
        const a = arcPlace(x + (slot - GAP) / 2 - half, arcHalf);
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${a.y.toFixed(1)}px, 0) rotate(${a.rotate.toFixed(2)}deg) scale(${a.scale.toFixed(3)})`;
      });
    };

    const firm = () => focused || pausedRef.current || t.querySelector('[data-flipped="true"]') !== null;
    const held = () => hover || drag !== null || firm();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      if (!drag) {
        // pause, focus or an open card brake hard; hover only glides to a stop, so a fling released
        // over the ring still coasts; letting go eases back up to the drift
        velocity = firm() ? coast(velocity, 0, dt, 0.002) : hover ? coast(velocity, 0, dt, 0.02) : coast(velocity, DRIFT, dt);
        if (held() && Math.abs(velocity) < 0.5) velocity = 0; // snap in the same tick it stops
        offset += velocity * dt;
        const step = glideStep(glideLeft, dt);
        offset += step;
        glideLeft -= step;
      }
      place();
      const idle = velocity === 0 && glideLeft === 0 && !drag;
      frame = visible && !document.hidden && !idle ? requestAnimationFrame(tick) : 0;
      if (!frame) last = 0;
    };
    const kick = () => { if (!frame && visible) frame = requestAnimationFrame(tick); };
    api.current = { glide: (px) => { glideLeft += px; kick(); }, kick };

    // pointer: drag 1:1, fling on release; a drag never turns into a click on a card
    const down = (e: PointerEvent) => {
      if (e.button !== 0) return;
      drag = { id: e.pointerId, x: e.clientX, moved: 0, captured: false };
      samples = [{ x: e.clientX, t: e.timeStamp }];
      velocity = 0;
      kick();
    };
    const move = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dx = e.clientX - drag.x;
      drag.x = e.clientX;
      drag.moved += Math.abs(dx);
      offset += dx;
      samples.push({ x: e.clientX, t: e.timeStamp });
      if (samples.length > 12) samples.shift();
      if (drag.moved > 6 && !drag.captured) { b.setPointerCapture(e.pointerId); drag.captured = true; b.setAttribute("data-dragging", ""); }
      kick();
    };
    const swallow = (e: MouseEvent) => { e.preventDefault(); e.stopPropagation(); };
    const up = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return;
      const dragged = drag.moved > 6;
      if (dragged) {
        velocity = e.type === "pointercancel" ? 0 : flingVelocity(samples);
        b.addEventListener("click", swallow, { capture: true, once: true });
        setTimeout(() => b.removeEventListener("click", swallow, { capture: true }), 0);
      }
      b.removeAttribute("data-dragging");
      drag = null;
      kick();
    };

    const enter = (e: PointerEvent) => { if (e.pointerType === "mouse") { hover = true; kick(); } };
    const leave = (e: PointerEvent) => { if (e.pointerType === "mouse") { hover = false; kick(); } };

    // focus holds the ring and brings the focused card fully into view
    const focusIn = (e: FocusEvent) => {
      focused = true;
      const el = (e.target as Element).closest<HTMLElement>(".us-part-slot");
      const i = el ? items.indexOf(el) : -1;
      if (i >= 0) {
        const x = loopX(i, items.length, slot, offset);
        const pad = gut();
        if (x < pad) glideLeft = pad - x;
        else if (x + slot - GAP > viewport - pad) glideLeft = viewport - pad - (x + slot - GAP);
      }
      kick();
    };
    const focusOut = (e: FocusEvent) => { if (!b.contains(e.relatedTarget as Node | null)) { focused = false; kick(); } };

    // the page scroll pulls the ring along, like the company rows in the house
    const scroll = () => {
      const dy = scrollY - lastScroll;
      lastScroll = scrollY;
      if (!visible || drag) return;
      offset -= dy * SCROLL_PULL;
      kick();
    };

    const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) { lastScroll = scrollY; kick(); } });
    io.observe(b);
    const ro = new ResizeObserver(() => { measure(); place(); });
    ro.observe(b);

    measure();
    offset = gut();
    place();
    t.setAttribute("data-ring", "on");
    b.addEventListener("pointerdown", down);
    b.addEventListener("pointermove", move);
    b.addEventListener("pointerup", up);
    b.addEventListener("pointercancel", up);
    b.addEventListener("pointerenter", enter);
    b.addEventListener("pointerleave", leave);
    b.addEventListener("focusin", focusIn);
    b.addEventListener("focusout", focusOut);
    b.addEventListener("click", kick, true);
    addEventListener("scroll", scroll, { passive: true });
    const visibility = () => { last = 0; kick(); };
    document.addEventListener("visibilitychange", visibility);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect(); ro.disconnect();
      b.removeEventListener("pointerdown", down);
      b.removeEventListener("pointermove", move);
      b.removeEventListener("pointerup", up);
      b.removeEventListener("pointercancel", up);
      b.removeEventListener("pointerenter", enter);
      b.removeEventListener("pointerleave", leave);
      b.removeEventListener("focusin", focusIn);
      b.removeEventListener("focusout", focusOut);
      b.removeEventListener("click", kick, true);
      removeEventListener("scroll", scroll);
      document.removeEventListener("visibilitychange", visibility);
      items.forEach((el) => el.style.removeProperty("transform"));
      t.removeAttribute("data-ring");
      api.current = NOOP;
    };
  }, [band, track, enabled, layoutKey, onMeasure]);

  const glide = useCallback((px: number) => api.current.glide(px), []);
  return { glide };
}
