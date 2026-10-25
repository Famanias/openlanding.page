import { FLAVORS } from "../data/shop";
import { Marquee } from "../motion/Marquee";
import { Reveal } from "../motion/Reveal";
import { toneVar } from "../brand/Jar";
import { Sparkle } from "../brand/Marks";

/** A drifting band of flavour pills between the hero and the trip. Pauses on hover and focus. */
export function FlavorBand() {
  return (
    <div className="pk-band" aria-label="This season's flavours">
      <Reveal variant="slide-right"><Marquee label="Flavours on the shelf" speed={46}>
        {FLAVORS.map((f) => (
          <span key={f.id} className="pk-band-pill" style={{ "--tone": toneVar(f.tone) } as React.CSSProperties}>
            {f.name}
            <Sparkle className="pk-band-spark" color="var(--color-cream)" />
          </span>
        ))}
      </Marquee></Reveal>
    </div>
  );
}
