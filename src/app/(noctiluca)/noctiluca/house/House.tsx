"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ROOMS, ROOM_COUNT, anchorId, stationForHash } from "../rooms/rooms";
import { emitFrame, frame } from "./frame";
import {
  DOOR_OFFSET_P,
  ROOM_DEPTH_P,
  STRIDE_VH,
  cameraAt,
  flowRoomAt,
  perspectivePx,
  planeOpacity,
  revealAfter,
} from "./geometry";
import { CORRIDOR_QUERY } from "./mode";
import { roomStore } from "./room-store";

type Plane = { el: HTMLElement; station: number; offsetP: number; kind: string; after: boolean };

const OFFSET_P: Record<string, number> = { plaque: 1, label: 1.38, door: DOOR_OFFSET_P, end: 2.4 };

/**
 * The walk. In corridor mode the track is tall and the stage is sticky: scroll
 * offset becomes camera depth, and one transform on the world moves every room.
 * In flow mode the rooms are ordinary stacked sections and this loop only keeps
 * track of which room is in view.
 */
export function House({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current!;
    const world = worldRef.current!;
    const root = document.documentElement;
    const mq = window.matchMedia(CORRIDOR_QUERY);
    const fine = window.matchMedia("(pointer: fine)");

    let planes: Plane[] = [];
    let sections: HTMLElement[] = [];
    let flowTops: number[] = [];
    let trackTop = 0;
    let vh = window.innerHeight;
    let vw = window.innerWidth;
    let p = perspectivePx(vh);
    let stride = STRIDE_VH * vh;
    let smoothZ = 0;
    let yaw = 0;
    let pitch = 0;
    let lookX = 0;
    let lookY = 0;
    let last = performance.now();
    let raf = 0;
    let lastPointer = { x: 0, y: 0, t: 0 };
    let lastTransform = "";

    const measure = () => {
      vh = window.innerHeight;
      vw = window.innerWidth;
      p = perspectivePx(vh);
      stride = STRIDE_VH * vh;
      trackTop = track.getBoundingClientRect().top + window.scrollY;
      sections = Array.from(world.querySelectorAll<HTMLElement>("[data-station]"));
      planes = Array.from(world.querySelectorAll<HTMLElement>("[data-plane]")).map((el) => ({
        el,
        station: Number(el.closest<HTMLElement>("[data-station]")?.dataset.station ?? 0),
        offsetP: OFFSET_P[el.dataset.plane ?? "plaque"] ?? 1,
        kind: el.dataset.plane ?? "plaque",
        after: el.dataset.reveal === "after",
      }));
      flowTops = sections.map((s) => s.getBoundingClientRect().top + window.scrollY);
    };

    const applyMode = () => {
      const corridor = mq.matches;
      root.dataset.nlMode = corridor ? "corridor" : "flow";
      frame.mode = corridor ? "corridor" : "flow";
      if (!corridor) {
        world.style.transform = "";
        lastTransform = "";
        for (const plane of planes) {
          plane.el.style.opacity = "";
          plane.el.style.pointerEvents = "";
        }
      }
      measure();
    };

    const scrollToStation = (index: number, behavior: ScrollBehavior) => {
      window.scrollTo({ top: trackTop + index * stride, behavior });
    };

    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      const corridor = frame.mode === "corridor";
      frame.pointer.energy *= Math.exp(-dt * 1.6);

      if (corridor) {
        const cam = cameraAt(window.scrollY - trackTop, { stride, stations: ROOM_COUNT, p });
        const k = 1 - Math.exp(-dt * 9);
        smoothZ += (cam.z - smoothZ) * k;
        if (Math.abs(cam.z - smoothZ) < 0.05) smoothZ = cam.z;
        // Ease, then snap: the world must come to rest, not creep sub-pixel forever.
        const yawTarget = lookX * 0.05;
        const pitchTarget = -lookY * 0.035;
        yaw += (yawTarget - yaw) * k * 0.5;
        pitch += (pitchTarget - pitch) * k * 0.5;
        if (Math.abs(yawTarget - yaw) < 2e-4) yaw = yawTarget;
        if (Math.abs(pitchTarget - pitch) < 2e-4) pitch = pitchTarget;

        frame.z = smoothZ;
        frame.yaw = yaw;
        frame.pitch = pitch;
        frame.station = -smoothZ / (ROOM_DEPTH_P * p);
        const transform = `translateZ(${p}px) rotateX(${pitch.toFixed(5)}rad) rotateY(${yaw.toFixed(5)}rad) translate3d(0px, 0px, ${(-smoothZ).toFixed(2)}px)`;
        if (transform !== lastTransform) {
          world.style.transform = transform;
          lastTransform = transform;
        }

        for (const plane of planes) {
          const planeZ = -plane.station * ROOM_DEPTH_P * p - plane.offsetP * p;
          const distance = (smoothZ - planeZ) / p;
          // Door frames and the end wall are architecture: solid until the camera is through them.
          const plaqueDistance = (smoothZ + plane.station * ROOM_DEPTH_P * p + p) / p;
          const o =
            plane.kind === "door" || plane.kind === "end"
              ? distance > 0.04 && distance < 9
                ? 1
                : 0
              : plane.after
                ? revealAfter(distance, plaqueDistance)
                : planeOpacity(distance);
          const next = o.toFixed(3);
          if (plane.el.style.opacity !== next) {
            plane.el.style.opacity = next;
            // Not visibility: hidden, which would drop far rooms out of the tab order.
            // Focus stays possible everywhere, and focusing walks the camera there.
            plane.el.style.pointerEvents = o < 0.5 ? "none" : "";
          }
        }
        roomStore.set(Math.round(frame.station));
      } else {
        const room = flowRoomAt(window.scrollY + vh / 2, flowTops);
        frame.flowRoom = room;
        frame.station = room;
        roomStore.set(Math.round(room));
      }

      emitFrame(now);
      raf = requestAnimationFrame(tick);
    };

    const onPointer = (e: PointerEvent) => {
      // The room looks toward the pointer, but holds still while you read or use a plaque.
      const overContent = (e.target as Element).closest?.(".nl-plaque, .nl-aside");
      if (fine.matches && !overContent) {
        lookX = e.clientX / vw - 0.5;
        lookY = e.clientY / vh - 0.5;
      }
      const t = performance.now();
      const dist = Math.hypot(e.clientX - lastPointer.x, e.clientY - lastPointer.y);
      const speed = dist / Math.max(16, t - lastPointer.t);
      lastPointer = { x: e.clientX, y: e.clientY, t };
      frame.pointer.x = e.clientX;
      frame.pointer.y = e.clientY;
      frame.pointer.energy = Math.min(1, frame.pointer.energy + speed * 0.08);
    };

    // In the corridor, every room lives in one sticky stage, so anchors and focus
    // are mapped to scroll offsets by hand.
    const onClick = (e: MouseEvent) => {
      if (frame.mode !== "corridor" || e.defaultPrevented || e.button !== 0) return;
      const a = (e.target as Element).closest?.("a[href^='#']");
      if (!a) return;
      const station = stationForHash(a.getAttribute("href") ?? "");
      if (station === null) return;
      e.preventDefault();
      history.pushState(null, "", `#${anchorId(ROOMS[station].id)}`);
      scrollToStation(station, "smooth");
    };

    const onFocus = (e: FocusEvent) => {
      if (frame.mode !== "corridor") return;
      const section = (e.target as Element).closest?.<HTMLElement>("[data-station]");
      if (!section) return;
      const station = Number(section.dataset.station);
      if (Math.abs(frame.station - station) > 0.02) scrollToStation(station, "auto");
    };

    const onHash = () => {
      const station = stationForHash(location.hash);
      if (station !== null && frame.mode === "corridor") scrollToStation(station, "auto");
    };

    const onResize = () => measure();

    applyMode();
    if (frame.mode === "corridor") {
      const station = stationForHash(location.hash);
      if (station !== null) requestAnimationFrame(() => scrollToStation(station, "auto"));
      smoothZ = cameraAt(window.scrollY - trackTop, { stride, stations: ROOM_COUNT, p }).z;
    }
    document.fonts?.ready.then(measure);

    mq.addEventListener("change", applyMode);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("hashchange", onHash);
    document.addEventListener("click", onClick);
    document.addEventListener("focusin", onFocus);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", applyMode);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick);
      document.removeEventListener("focusin", onFocus);
    };
  }, []);

  return (
    <div className="nl-track" ref={trackRef}>
      <div className="nl-stage">
        <div className="nl-world" ref={worldRef}>
          {children}
        </div>
      </div>
    </div>
  );
}
