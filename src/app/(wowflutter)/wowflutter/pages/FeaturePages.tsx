import { Plate } from "../assets";
import { PageFoot } from "./PageFoot";

/** Page 4: the feature opens on a black page. */
export function FeatureOpener() {
  return (
    <div className="wf-sheet wf-sheet--tape wf-opener">
      <Plate
        assetKey="feature-stairwell"
        alt="A concrete stairwell in a closed swimming baths, light falling from a high window"
        className="wf-opener__plate"
        sizes="(min-width: 1000px) 30vw, 90vw"
      />
      <p className="wf-label">Feature · Low Ceilings, WF-007</p>
      <h2 className="wf-h2 wf-h2--xl">The stairwell sessions</h2>
      <p className="wf-text wf-dek">
        Four players, one closed swimming baths and the longest reverb in Leeds.
      </p>
      <PageFoot n={4} label="Feature" />
    </div>
  );
}

/** Page 5: the liner notes, part one. */
export function FeatureText() {
  return (
    <div className="wf-sheet wf-sheet--stock">
      <p className="wf-label">Liner notes · part one</p>
      <div className="wf-flow">
        <p className="wf-text wf-dropcap">
          We found the baths in March. Closed since 2011, the water long gone, the stairwell at the back still holding a
          sound like a held breath. The cello went on the third landing and the violins on the fifth.
        </p>
        <p className="wf-text">
          Hana, who plays second violin, spent a morning at the roof hatch because she wanted to hear the room answer
          from above. Nobody wore headphones. If you listen on speakers, you can hear the door.
        </p>
      </div>
      <Plate
        assetKey="feature-baths"
        alt="The empty main pool of a closed Victorian swimming baths, tiles peeling"
        className="wf-figure"
        sizes="(min-width: 1000px) 30vw, 90vw"
      />
      <PageFoot n={5} label="Feature" />
    </div>
  );
}

/** Page 6: a pink page with the pull quote and the room's numbers. */
export function FeatureQuote() {
  return (
    <div className="wf-sheet wf-sheet--riso wf-quote">
      <p className="wf-label">Liner notes · part two</p>
      <blockquote className="wf-pull">
        <p>A room is the fifth member of the quartet, and the only one who never misses a rehearsal.</p>
        <footer className="wf-label">Ife Okoro, cello</footer>
      </blockquote>
      <dl className="wf-specs wf-label">
        <div>
          <dt>Room</dt>
          <dd>Stairwell B, Eastgate Baths</dd>
        </div>
        <div>
          <dt>Reverb</dt>
          <dd>RT60 2.8 s</dd>
        </div>
        <div>
          <dt>Mics</dt>
          <dd>4, plus 1 on the roof</dd>
        </div>
        <div>
          <dt>Takes</dt>
          <dd>11, heating off</dd>
        </div>
      </dl>
      <PageFoot n={6} label="Feature" />
    </div>
  );
}
