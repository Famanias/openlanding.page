import { MATERIALS } from "../content/materials";
import { MaskLine, Reveal } from "../motion/Reveal";
import { Spotlight } from "../motion/Spotlight";
import { abbe } from "../sampler/params";
import { Picture } from "../assets";
import { LoadPreset } from "./LoadPreset";

/**
 * Chapter 04: the material library. A white sheet whose top edge is a cut line that levels out as it
 * arrives; six swatch cards that lift under a pointer spotlight and load straight into the sampler.
 */
export function Materials() {
  return (
    <section className="fc-mats" id="materials" data-scene="materials" aria-labelledby="fc-mats-title">
      <div className="fc-wrap">
        <header className="fc-head fc-head--split">
          <div>
            <Reveal as="p" variant="slide" className="fc-eyebrow">Chapter 04 · The library</Reveal>
            <h2 id="fc-mats-title" className="fc-h2">
              <MaskLine>Six cuts to</MaskLine> <MaskLine index={1}>start from.</MaskLine>
            </h2>
          </div>
          <Reveal as="p" className="fc-lead" index={1}>
            Each preset is tuned against the real glass it is named for, and every one is a starting point you can open in the studio above.
          </Reveal>
        </header>
        <Spotlight className="fc-mats__grid">
          {MATERIALS.map((m, i) => (
            <Reveal as="article" key={m.id} variant="scale" index={i} className="fc-card" id={`fc-mat-${m.id}`}>
              <div className="fc-card__swatch">
                <Picture assetKey={`material-${m.id}`} alt={`${m.name} glass swatch`}>
                  <div className={`fc-swatch fc-swatch--${m.finish}`} aria-hidden="true">
                    <span className="fc-swatch__shard" />
                    <span className="fc-swatch__sheen" />
                  </div>
                </Picture>
                <span className="fc-card__code">{m.code}</span>
              </div>
              <div className="fc-card__body">
                <h3 className="fc-card__name">{m.name}</h3>
                <p className="fc-card__note">{m.note}</p>
                <dl className="fc-card__spec">
                  <div><dt>IOR</dt><dd>{m.params.ior.toFixed(2)}</dd></div>
                  <div><dt>Abbe</dt><dd>{Number.isFinite(abbe(m.params.dispersion)) ? abbe(m.params.dispersion) : "∞"}</dd></div>
                  <div><dt>Rough</dt><dd>{m.params.roughness.toFixed(2)}</dd></div>
                </dl>
                <p className="fc-card__use">{m.use}</p>
                <LoadPreset id={m.id} name={m.name} />
              </div>
            </Reveal>
          ))}
        </Spotlight>
      </div>
    </section>
  );
}
