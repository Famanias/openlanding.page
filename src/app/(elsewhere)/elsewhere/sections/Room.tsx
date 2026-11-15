import { Picture } from "../assets";
import { Blaze } from "../brand/Signal";
import { CountUp } from "../motion/CountUp";
import { Lines } from "../motion/Lines";
import { Marquee } from "../motion/Marquee";
import { Reveal } from "../motion/Reveal";
import { BAND, INVENTORY, NOT_HERE, ROOM_FACTS } from "./content";

/** The room, written as an inventory: one of most things, and a short list of what was left out. */
export function Room() {
  return (
    <section className="ew-room" id="room" aria-labelledby="ew-room-title">
      <div className="ew-room-grid">
        <div className="ew-room-photo">
          <Reveal as="figure" variant="wipe" className="ew-room-figure">
            <div className="ew-room-zoom">
              <Picture
                assetKey="room-detail"
                sizes="(min-width: 960px) 38vw, 100vw"
                alt="A folded undyed wool blanket and a speckled stoneware mug on a pine cabinet, beside the black wood stove and a window white with mist."
              />
            </div>
          </Reveal>
          <Reveal as="p" variant="slide" className="ew-post ew-room-caption" delay={200}>
            <Blaze /> The blanket, a mug, the stove
          </Reveal>
        </div>

        <div className="ew-room-copy">
          <Reveal variant="slide" className="ew-post ew-section-post">
            <Blaze /> The room · 23 m²
          </Reveal>
          <Reveal as="h2" variant="lines" className="ew-display ew-h2" id="ew-room-title">
            <Lines lines={["One of", "everything."]} />
          </Reveal>
          <Reveal as="p" variant="settle" className="ew-lede" delay={140}>
            We built the smallest room that could hold a long weekend, then took things out of it until nothing was left to tidy. Here is the full
            inventory.
          </Reveal>

          <ol className="ew-inventory">
            {INVENTORY.map((item, index) => (
              <Reveal as="li" variant="settle" className="ew-item" key={item.name} index={index % 4}>
                <span className="ew-post ew-item-no">{String(index + 1).padStart(2, "0")}</span>
                <span className="ew-item-name">{item.name}</span>
                <span className="ew-item-note">{item.note}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>

      <div className="ew-room-lower">
        <dl className="ew-room-facts">
          {ROOM_FACTS.map((fact, index) => (
            <Reveal variant="approach" className="ew-room-fact" key={fact.label} index={index}>
              <dt className="ew-post">{fact.label}</dt>
              <dd>
                <CountUp value={fact.value} suffix={fact.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>

        <div className="ew-absent">
          <Reveal as="h3" variant="slide" className="ew-post ew-absent-title">
            <Blaze /> Not in the room
          </Reveal>
          <ul className="ew-absent-list">
            {NOT_HERE.map((thing, index) => (
              <Reveal as="li" variant="settle" className="ew-absent-item" key={thing} index={index}>
                {thing}
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      <Marquee className="ew-band">
        {BAND.map((phrase) => (
          <span className="ew-band-item" key={phrase}>
            {phrase}
            <i />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
