import { ROOMS } from "../content/rooms";
import { Reveal } from "../motion/Reveal";

export function Rooms() {
  return (
    <section id="rooms" className="vz-rooms" aria-labelledby="vz-rooms-title">
      <div className="vz-wrap">
        <div className="vz-rooms__head"><div><p className="vz-eyebrow">03 / Rooms in practice</p><h2 id="vz-rooms-title" className="vz-section-title">Every project starts with a coordinate.</h2></div><p>Three rooms, three listening briefs. We keep the numbers visible so the atmosphere has something to answer to.</p></div>
        <div className="vz-room-list">
          {ROOMS.map((room, index) => <Reveal key={room.code} delay={index * 80} className="vz-room-row" as="article">
            <span className="vz-room-row__code">{room.code}</span>
            <h3>{room.name}</h3>
            <p>{room.summary}<br /><span className="vz-mono">{room.city} / {room.coordinates}</span></p>
            <div className="vz-room-row__spec"><strong>{room.decaySeconds.toFixed(2)} S</strong>{room.seats} seats<br />{room.discipline}</div>
            <span className="vz-room-row__arrow" aria-hidden="true">↗</span>
          </Reveal>)}
        </div>
      </div>
    </section>
  );
}
