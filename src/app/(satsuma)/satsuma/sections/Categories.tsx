import { CATEGORIES } from "../content/steps";
import { Marquee } from "../motion/Marquee";

/** The band that slides over the hero: what makers shoot, drifting against the scroll. */
export function Categories() {
  return (
    <section className="sa-band" aria-label="What our makers shoot">
      <Marquee items={[...CATEGORIES]} label="Products our makers shoot" className="sa-marquee--band" />
    </section>
  );
}
