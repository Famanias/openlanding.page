import { Logo } from "../brand/Logo";
import { RoomShell } from "./RoomShell";
import { ROOMS, anchorId, roomIndex } from "./rooms";

const LINKS: [string, string][] = [
  ["Rooms", `#${anchorId("blue-hour")}`],
  ["Timed entry", `#${anchorId("visit")}`],
  ["Back to the foyer", `#${anchorId("foyer")}`],
];

export function ExitRoom() {
  const index = roomIndex("exit");
  const room = ROOMS[index];
  return (
    <RoomShell index={index} width="wide">
      <div className="nl-exit">
        <Logo showTagline />
        <h2 id={`${anchorId("exit")}-title`} className="nl-room-title nl-exit-title">
          {room.title}
        </h2>
        <p className="nl-copy">
          Each room is re-tuned at the solstices, so the house you walked today won&apos;t be the one you walk in June.
        </p>
        <nav aria-label="Footer" className="nl-exit-nav">
          {LINKS.map(([label, href]) => (
            <a key={label} href={href} className="nl-link">
              {label}
            </a>
          ))}
        </nav>
        <div className="nl-exit-meta">
          <p>{room.body}</p>
          <p>© 2026 Noctiluca, Casa da Luz Móvel. A fictional house; every room is a shader.</p>
        </div>
      </div>
    </RoomShell>
  );
}
