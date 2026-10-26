import { MaskLine, Reveal } from "../motion/Reveal";
import { Sampler } from "../sampler/Sampler";

/** Chapter 02: the live sampler. A sheet of glass that slides over the held terms. */
export function Studio() {
  return (
    <section className="fc-studio" id="sampler" data-scene="studio" aria-labelledby="fc-studio-title">
      <div className="fc-wrap">
        <header className="fc-head">
          <Reveal as="p" variant="slide" className="fc-eyebrow">Chapter 02 · The studio</Reveal>
          <h2 id="fc-studio-title" className="fc-h2">
            <MaskLine>Turn the dials.</MaskLine> <MaskLine index={1}>Watch the light.</MaskLine>
          </h2>
          <Reveal as="p" className="fc-lead" index={2}>
            This is a real Cullet material in a real renderer. Pick a preset or drag a dial, and the glass, the drawn preview
            and the exported glTF all change together.
          </Reveal>
        </header>
        <Reveal variant="scale" className="fc-studio__frame">
          <Sampler />
        </Reveal>
      </div>
    </section>
  );
}
