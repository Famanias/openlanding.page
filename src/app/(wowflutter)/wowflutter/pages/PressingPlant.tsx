import { Plate } from "../assets";
import { PageFoot } from "./PageFoot";

/** Page 12: the colophon. */
export function PressingPlant() {
  return (
    <div className="wf-sheet wf-sheet--worn">
      <p className="wf-label">The pressing plant</p>
      <h2 className="wf-h2">Where Thursdays go</h2>
      <Plate
        assetKey="press-room"
        alt="A small two-colour printing press and a table of folded, unstitched zines"
        className="wf-figure"
        sizes="(min-width: 1000px) 30vw, 90vw"
      />
      <dl className="wf-specs wf-label">
        <div>
          <dt>Pressed</dt>
          <dd>500 copies, 180 g black vinyl</dd>
        </div>
        <div>
          <dt>Zine</dt>
          <dd>32 pages, stitched by hand</dd>
        </div>
        <div>
          <dt>Mastered</dt>
          <dd>Half speed, Odile Prentiss</dd>
        </div>
        <div>
          <dt>On screen</dt>
          <dd>14 of the 32 pages</dd>
        </div>
      </dl>
      <PageFoot n={12} label="Colophon" />
    </div>
  );
}
