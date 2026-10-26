import { SeatForm } from "../forms/SeatForm";
import { MaskLine, Reveal } from "../motion/Reveal";

/** Chapter 07: the ink slab. Request a seat; the form cleaves away into a glass check. */
export function Open() {
  return (
    <section className="fc-open" id="open" aria-labelledby="fc-open-title">
      <div className="fc-wrap fc-open__grid">
        <div className="fc-open__copy">
          <Reveal as="p" variant="slide" className="fc-eyebrow fc-eyebrow--on-ink">Chapter 07 · Open studio</Reveal>
          <h2 id="fc-open-title" className="fc-h2">
            <MaskLine>Your first glass</MaskLine> <MaskLine index={1}>is ten minutes away.</MaskLine>
          </h2>
          <Reveal as="p" className="fc-lead" index={2}>
            Ask for a seat and the studio opens in your browser with the six cuts loaded. Bring a glTF, or start from a cube.
          </Reveal>
          <Reveal as="ul" className="fc-open__facts" index={3}>
            <li><strong>14 days</strong> of Studio, free</li>
            <li><strong>WebGL 2</strong> is all it needs</li>
            <li><strong>Export</strong> everything, even after the trial</li>
          </Reveal>
        </div>
        <Reveal variant="cleave" className="fc-open__panel">
          <div className="fc-open__panel-in">
            <SeatForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
