"use client";

import { useSyncExternalStore } from "react";
import { Logo } from "../brand/Logo";
import { roomStore } from "../house/room-store";
import { ROOMS, anchorId } from "../rooms/rooms";

const NAV = ROOMS.filter((r) => r.numeral && r.id !== "visit");

export function TopBar() {
  const room = useSyncExternalStore(roomStore.subscribe, roomStore.get, () => 0);
  const current = ROOMS[room]?.id;
  return (
    <header className="nl-topbar">
      <a href={`#${anchorId("foyer")}`} className="nl-topbar-home" aria-label="Noctiluca, back to the foyer">
        <Logo />
      </a>
      <nav aria-label="Rooms" className="nl-topbar-nav">
        <ol>
          {NAV.map((r) => (
            <li key={r.id}>
              <a href={`#${anchorId(r.id)}`} aria-current={current === r.id ? "location" : undefined}>
                <span className="nl-topbar-num">{r.numeral}</span>
                <span className="nl-topbar-name">{r.short}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <a href={`#${anchorId("visit")}`} className="nl-button nl-topbar-cta" data-variant="solid">
        Book entry
      </a>
    </header>
  );
}
