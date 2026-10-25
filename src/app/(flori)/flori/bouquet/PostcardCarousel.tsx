"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { postcardPose } from "./carousel";

type Controls = {
  wake: () => void;
  step: (direction: number) => void;
  focus: (index: number) => void;
  down: (x: number) => void;
  move: (x: number, time: number) => boolean;
  up: (cancel?: boolean) => boolean;
};

export function PostcardCarousel({ children }: { children: ReactNode }) {
  const region = useRef<HTMLDivElement>(null);
  const controller = useRef<Controls | null>(null);
  const interaction = useRef({ paused: false, hover: false, focus: false });
  const suppressClick = useRef(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const element = region.current;
    const track = element?.querySelector<HTMLElement>(".fl-postcards");
    if (!element || !track) return;
    const slots = Array.from(track.querySelectorAll<HTMLElement>(".fl-postcard-slot"));
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let pitch = 206, position = 0, target = 0, frame = 0, last = 0, visible = false;
    let pointer: { start: number; x: number; time: number; velocity: number; moved: boolean } | null = null;
    const paint = () => {
      slots.forEach((slot, i) => {
        const pose = postcardPose(i, position, pitch, slots.length);
        slot.style.transform = `translate3d(calc(-50% + ${pose.x}px), ${pose.y}px, 0) rotate(${pose.rotation}deg)`;
      });
    };
    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) { last = 0; return; }
      const dt = last ? Math.min(32, now - last) : 16;
      last = now;
      const state = interaction.current;
      const autoplay = !reduced.matches && !state.paused && !state.hover && !state.focus && !pointer && document.documentElement.dataset.flPaused !== "true";
      if (autoplay) target += 24 * dt / 1000;
      const difference = target - position;
      if (reduced.matches || pointer?.moved) position = target;
      else {
        position += difference * (1 - Math.exp(-dt / 85));
        if (Math.abs(target - position) < .01) position = target;
      }
      paint();
      if (autoplay || Math.abs(target - position) > .01) frame = requestAnimationFrame(tick);
      else last = 0;
    };
    const wake = () => { if (!frame) frame = requestAnimationFrame(tick); };
    const measure = () => {
      const style = getComputedStyle(track);
      const nextPitch = parseFloat(style.getPropertyValue("--fl-card-width")) + parseFloat(style.getPropertyValue("--fl-card-gap"));
      position = position / pitch * nextPitch;
      target = target / pitch * nextPitch;
      pitch = nextPitch;
      paint(); wake();
    };
    controller.current = {
      wake,
      step(direction) { target += direction * pitch; if (reduced.matches) { position = target; paint(); } wake(); },
      focus(index) { position += postcardPose(index, position, pitch, slots.length).x; target = position; paint(); wake(); },
      down(x) { pointer = { start: x, x, time: performance.now(), velocity: 0, moved: false }; target = position; wake(); },
      move(x, time) {
        if (!pointer) return false;
        const delta = x - pointer.x;
        if (Math.abs(x - pointer.start) > 6) pointer.moved = true;
        if (pointer.moved) { target -= delta; position = target; paint(); }
        pointer.velocity = delta / Math.max(1, time - pointer.time);
        pointer.x = x; pointer.time = time;
        return pointer.moved;
      },
      up(cancel = false) {
        const moved = Boolean(pointer?.moved);
        if (pointer && moved && !cancel && !reduced.matches) target = position - Math.max(-pitch * 1.5, Math.min(pitch * 1.5, pointer.velocity * 160));
        pointer = null;
        delete element.dataset.dragging;
        wake(); return moved;
      },
    };
    track.dataset.carousel = "true";
    measure();
    const view = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
      else { cancelAnimationFrame(frame); frame = 0; last = 0; }
    }, { threshold: .05 });
    view.observe(element);
    const size = new ResizeObserver(measure);
    size.observe(element);
    const globalPause = new MutationObserver(wake);
    globalPause.observe(document.documentElement, { attributes: true, attributeFilter: ["data-fl-paused"] });
    const mode = () => { target = position; last = 0; wake(); };
    document.addEventListener("visibilitychange", mode);
    reduced.addEventListener("change", mode);
    return () => {
      cancelAnimationFrame(frame); view.disconnect(); size.disconnect(); globalPause.disconnect();
      document.removeEventListener("visibilitychange", mode); reduced.removeEventListener("change", mode);
      controller.current = null; delete track.dataset.carousel;
      slots.forEach((slot) => slot.style.removeProperty("transform"));
    };
  }, []);

  return <div ref={region} className="fl-carousel" role="region" aria-roledescription="carousel" aria-label="Flower postcards" tabIndex={0}
    onPointerEnter={(event) => { if (event.pointerType === "mouse") { interaction.current.hover = true; controller.current?.wake(); } }}
    onPointerLeave={() => { interaction.current.hover = false; controller.current?.wake(); }}
    onFocusCapture={(event) => {
      interaction.current.focus = true;
      const slot = (event.target as HTMLElement).closest<HTMLElement>("[data-card]");
      if (slot && event.target.matches(":focus-visible")) controller.current?.focus(Number(slot.dataset.card));
      controller.current?.wake();
    }}
    onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) { interaction.current.focus = false; controller.current?.wake(); } }}
    onKeyDown={(event) => {
      if (event.target !== event.currentTarget || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault(); controller.current?.step(event.key === "ArrowRight" ? 1 : -1);
    }}
    onPointerDown={(event) => {
      if (!event.isPrimary || event.button !== 0 || (event.target as HTMLElement).closest("button")) return;
      suppressClick.current = false;
      controller.current?.down(event.clientX);
    }}
    onPointerMove={(event) => {
      if (controller.current?.move(event.clientX, performance.now())) {
        event.currentTarget.dataset.dragging = "true";
        event.currentTarget.setPointerCapture(event.pointerId);
        if (event.cancelable) event.preventDefault();
      }
    }}
    onPointerUp={(event) => {
      suppressClick.current = controller.current?.up() ?? false;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    }}
    onPointerCancel={() => { controller.current?.up(true); }}
    onDragStart={(event) => event.preventDefault()}
    onClickCapture={(event) => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}>
    <div className="fl-postcards">{children}</div>
    <div className="fl-carousel-controls fl-enhanced">
      <button className="fl-carousel-arrow fl-carousel-arrow--prev" type="button" aria-label="Previous flowers" onClick={() => controller.current?.step(-1)}>←</button>
      <button className="fl-carousel-pause" type="button" aria-label={paused ? "Play flower carousel" : "Pause flower carousel"} aria-pressed={paused} onClick={() => {
        const next = !paused; interaction.current.paused = next; setPaused(next); controller.current?.wake();
      }}><span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>{paused ? "Play" : "Pause"}</button>
      <button className="fl-carousel-arrow fl-carousel-arrow--next" type="button" aria-label="Next flowers" onClick={() => controller.current?.step(1)}>→</button>
    </div>
  </div>;
}
