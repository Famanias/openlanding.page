import { RoomShell } from "./RoomShell";
import { ROOMS, anchorId } from "./rooms";

const FACTS: [string, string][] = [
  ["6", "rooms"],
  ["43 m", "of corridor"],
  ["≈ 40 min", "walk"],
  ["Tue–Sun", "10:00–20:00"],
];

export function Foyer() {
  const room = ROOMS[0];
  return (
    <RoomShell index={0} width="hero" labelledBy="nl-title">
      <p className="nl-eyebrow">
        <span>Estação Elevatória nº 4 · Lisboa</span>
      </p>
      <h1 id="nl-title" className="nl-hero-title">
        A house made of <span className="nl-hero-glow">moving light.</span>
      </h1>
      <p className="nl-lead">{room.body}</p>
      <div className="nl-actions">
        <a className="nl-button" data-variant="solid" href={`#${anchorId("visit")}`}>
          Book a timed entry
        </a>
        <a className="nl-button" data-variant="ghost" href={`#${anchorId("blue-hour")}`}>
          Walk in
          <span aria-hidden="true" className="nl-button-arrow">
            →
          </span>
        </a>
      </div>
      <dl className="nl-facts">
        {FACTS.map(([value, label]) => (
          <div key={label}>
            <dt className="nl-sr">{label}</dt>
            <dd>
              <span className="nl-facts-value">{value}</span>
              <span className="nl-facts-label">{label}</span>
            </dd>
          </div>
        ))}
      </dl>
      <p className="nl-hint" aria-hidden="true">
        <span className="nl-hint-line" />
        Scroll to walk in
      </p>
    </RoomShell>
  );
}
