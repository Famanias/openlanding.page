import { Clip } from "../assets";
import { RoomEyebrow, RoomShell } from "../rooms/RoomShell";
import { ROOMS, anchorId, roomIndex } from "../rooms/rooms";
import { EntryForm } from "./EntryForm";

const HOURS: [string, string][] = [
  ["Tue–Thu, Sat–Sun", "10:00–20:00 · last entry 19:20"],
  ["Friday", "10:00–23:00 · last entry 22:20"],
  ["Monday", "Closed"],
];

const BUILDING: [string, string][] = [
  ["Built", "1912, for the city's water"],
  ["Pumped until", "1986"],
  ["Corridor", "43 m, six rooms"],
  ["Getting here", "Tram 15 · Av. 24 de Julho"],
];

export function VisitRoom() {
  const index = roomIndex("visit");
  const room = ROOMS[index];
  return (
    <RoomShell
      index={index}
      width="wide"
      aside={
        <aside className="nl-label" aria-label="Wall label, the building">
          <Clip
            clipKey="exterior-dusk-loop"
            posterKey="building-exterior"
            alt="The brick pumping station on the Alcântara waterfront at dusk, its tall arched windows glowing violet."
            className="nl-label-media"
          />
          <div className="nl-label-body">
            <p className="nl-label-kicker">The building</p>
            <h3 className="nl-label-title">Estação Elevatória nº 4</h3>
            <dl className="nl-label-rows">
              {BUILDING.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      }
    >
      <div className="nl-visit">
        <div className="nl-visit-info">
          <RoomEyebrow index={index} />
          <h2 id={`${anchorId("visit")}-title`} className="nl-room-title">
            {room.title}
          </h2>
          <p className="nl-copy">{room.body}</p>
          <dl className="nl-hours">
            {HOURS.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          <p className="nl-small">
            Rua da Cozinha Económica 21, Alcântara. Step-free throughout; every room has a bench, and no room is
            ever fully dark.
          </p>
        </div>
        <EntryForm />
      </div>
    </RoomShell>
  );
}
