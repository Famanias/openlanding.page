import { Clip, Picture } from "../assets";
import type { Room } from "./rooms";

const MEDIA: Partial<Record<Room["id"], { key: string; alt: string; clip?: string }>> = {
  "blue-hour": { key: "blue-hour-tagus", alt: "Blue hour over the Tagus estuary, the far shore lit in sodium orange under a cobalt sky." },
  aurora: { key: "aurora-tromso", alt: "Green auroral curtains with a violet upper edge over a dark fjord." },
  noctiluca: {
    key: "noctiluca-shore",
    alt: "A breaking wave at night glowing electric blue with bioluminescent plankton.",
    clip: "noctiluca-shore-loop",
  },
  alpenglow: { key: "alpenglow-peaks", alt: "Snow peaks lit rose-gold above a valley already in blue shadow." },
};

/** A museum wall label: the phenomenon, its numbers, and the room's four stops as a strip. */
export function WallLabel({ room }: { room: Room }) {
  if (!room.label) return null;
  const media = MEDIA[room.id];
  return (
    <aside className="nl-label" aria-label={`Wall label, ${room.label.phenomenon}`}>
      {media ? (
        media.clip ? (
          <Clip clipKey={media.clip} posterKey={media.key} alt={media.alt} className="nl-label-media" />
        ) : (
          <Picture assetKey={media.key} alt={media.alt} className="nl-label-media" />
        )
      ) : null}
      <div className="nl-label-body">
        <p className="nl-label-kicker">Room {room.numeral} · Field note</p>
        <h3 className="nl-label-title">{room.label.phenomenon}</h3>
        <dl className="nl-label-rows">
          {room.label.rows.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <div className="nl-spectrum" aria-hidden="true" />
      </div>
    </aside>
  );
}
