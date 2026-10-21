import { RoomEyebrow, RoomShell } from "./RoomShell";
import { WallLabel } from "./WallLabel";
import { ROOMS, anchorId, roomIndex, type RoomId } from "./rooms";

/** Rooms I–IV: a natural light, its plaque, and its field note on the opposite wall. */
export function PhenomenonRoom({ id }: { id: RoomId }) {
  const index = roomIndex(id);
  const room = ROOMS[index];
  const next = ROOMS[index + 1];
  return (
    <RoomShell index={index} aside={<WallLabel room={room} />}>
      <RoomEyebrow index={index} />
      <h2 id={`${anchorId(id)}-title`} className="nl-room-title">
        {room.title}
      </h2>
      <p className="nl-copy">{room.body}</p>
      {next ? (
        <p className="nl-next">
          <span className="nl-next-k">Through the door</span>
          <a href={`#${anchorId(next.id)}`} className="nl-link">
            {next.numeral ? `Room ${next.numeral}, ${next.name}` : next.name}
          </a>
        </p>
      ) : null}
    </RoomShell>
  );
}
