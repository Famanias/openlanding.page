import { RoomEyebrow, RoomShell } from "../rooms/RoomShell";
import { ROOMS, anchorId, roomIndex } from "../rooms/rooms";
import { Mixer } from "./Mixer";

export function ScoreRoom() {
  const index = roomIndex("score");
  const room = ROOMS[index];
  return (
    <RoomShell
      index={index}
      width="wide"
      aside={
        <aside className="nl-label nl-label-score" aria-label="Wall label, how a score works">
          <div className="nl-label-body">
            <p className="nl-label-kicker">Room V · How a score works</p>
            <h3 className="nl-label-title">Three numbers, one room.</h3>
            <dl className="nl-label-rows">
              <div>
                <dt>Hue</dt>
                <dd>where on the wheel the light starts</dd>
              </div>
              <div>
                <dt>Drift</dt>
                <dd>how fast it pours along the walls</dd>
              </div>
              <div>
                <dt>Bloom</dt>
                <dd>how large its forms grow</dd>
              </div>
            </dl>
            <p className="nl-label-note">
              Scores from the floor are played back in the foyer after closing, one every eight minutes.
            </p>
          </div>
        </aside>
      }
    >
      <div className="nl-score-layout">
        <div>
          <RoomEyebrow index={index} />
          <h2 id={`${anchorId("score")}-title`} className="nl-room-title">
            {room.title}
          </h2>
          <p className="nl-copy">{room.body}</p>
        </div>
        <Mixer />
      </div>
    </RoomShell>
  );
}
