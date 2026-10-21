import { Mark, Wordmark } from "../brand/Logo";

/** Page 14. */
export function BackCover() {
  return (
    <div className="wf-sheet wf-sheet--riso wf-back">
      <p className="wf-back__motto">Slightly off-centre, on purpose.</p>
      <div className="wf-back__base">
        <div className="wf-back__brand">
          <Mark tone="ink" className="wf-back__mark" />
          <Wordmark className="wf-back__word" />
        </div>
        <p className="wf-label">Records &amp; zines · Leeds · Est. 2019</p>
        <div className="wf-barcode" aria-hidden="true" />
        <p className="wf-label">
          <a href="#p1">Back to the cover ↺</a>
        </p>
      </div>
    </div>
  );
}
