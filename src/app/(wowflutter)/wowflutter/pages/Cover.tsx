import { Plate } from "../assets";
import { Mark } from "../brand/Logo";

/** Page 1. The only h1 on the site. */
export function Cover() {
  return (
    <div className="wf-sheet wf-sheet--stock wf-cover">
      <div className="wf-cover__top wf-label">
        <span>Issue 07 · Autumn 2026</span>
        <span>WF-007</span>
      </div>
      <p className="wf-cover__num" data-text="07" aria-hidden="true">
        07
      </p>
      <h1 className="wf-cover__title">
        <span className="wf-vh">Issue 07: </span>The Sound of Rooms
      </h1>
      <Plate
        assetKey="cover-portrait"
        alt="A cellist seen from above, playing alone on a stairwell landing"
        className="wf-cover__plate"
        sizes="(min-width: 1000px) 30vw, 90vw"
        priority
      />
      <div className="wf-cover__base">
        <Mark tone="ink" className="wf-cover__mark" />
        <span className="wf-label">32 pages · Edition of 500</span>
      </div>
    </div>
  );
}
