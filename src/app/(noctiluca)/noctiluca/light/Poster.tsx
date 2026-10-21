"use client";

import { useSyncExternalStore } from "react";
import { roomStore } from "../house/room-store";
import { ROOMS } from "../rooms/rooms";
import { roomStops } from "./stops";

/**
 * The still light: one CSS gradient per room, stacked, with only the current
 * room's layer showing. It's what you see before WebGL starts, under reduced
 * motion, and whenever WebGL can't run.
 */
export function Poster() {
  const room = useSyncExternalStore(roomStore.subscribe, roomStore.get, () => 0);
  return (
    <div className="nl-poster" aria-hidden="true">
      {ROOMS.map((r, i) => (
        <div
          key={r.id}
          className="nl-poster-layer"
          data-room={r.id}
          data-active={i === room}
          style={roomStops(i)}
        />
      ))}
    </div>
  );
}
