"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { frame, onFrame } from "../house/frame";
import { ROOM_METRES, depthMetres, perspectivePx } from "../house/geometry";
import { roomStore } from "../house/room-store";
import { ROOMS, ROOM_COUNT } from "../rooms/rooms";

/**
 * The depth rail: where you are in the house, in metres. The marker and the
 * readout are written straight to the DOM every frame; only the room name goes
 * through React (and is announced politely when it changes).
 */
export function DepthRail() {
  const markerRef = useRef<HTMLSpanElement>(null);
  const depthRef = useRef<HTMLSpanElement>(null);
  const room = useSyncExternalStore(roomStore.subscribe, roomStore.get, () => 0);

  useEffect(() => {
    let shown = "";
    return onFrame(() => {
      const t = Math.max(0, Math.min(1, frame.station / (ROOM_COUNT - 1)));
      if (markerRef.current) markerRef.current.style.transform = `translateY(${(t * 100).toFixed(2)}cqh)`;
      const metres =
        frame.mode === "corridor" ? depthMetres(frame.z, perspectivePx(window.innerHeight)) : frame.station * ROOM_METRES;
      const text = `${metres.toFixed(1)} m`;
      if (text !== shown && depthRef.current) {
        depthRef.current.textContent = text;
        shown = text;
      }
    });
  }, []);

  const current = ROOMS[room];
  return (
    <div className="nl-rail" aria-hidden="true">
      <div className="nl-rail-track">
        {ROOMS.map((r, i) => (
          <span
            key={r.id}
            className="nl-rail-tick"
            data-active={i === room}
            style={{ top: `${(i / (ROOM_COUNT - 1)) * 100}%` }}
          >
            {r.numeral || (i === 0 ? "F" : "E")}
          </span>
        ))}
        <span className="nl-rail-marker" ref={markerRef} />
      </div>
      <p className="nl-rail-readout">
        <span className="nl-rail-room">{current.numeral ? `${current.numeral} · ${current.short}` : current.short}</span>
        <span className="nl-rail-depth" ref={depthRef}>
          0.0 m
        </span>
      </p>
    </div>
  );
}

/** Announces the room on arrival, nothing more. */
export function RoomAnnouncer() {
  const room = useSyncExternalStore(roomStore.subscribe, roomStore.get, () => 0);
  const r = ROOMS[room];
  return (
    <p className="nl-sr" aria-live="polite">
      {room === 0 ? "" : r.numeral ? `Room ${r.numeral}, ${r.name}` : r.name}
    </p>
  );
}
