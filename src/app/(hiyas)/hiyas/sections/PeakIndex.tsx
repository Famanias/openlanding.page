"use client";
import { Picture } from "../assets";
import { PEAKS } from "../planner/logic";
import { usePlanner } from "../planner/PlannerProvider";

export function PeakIndex() {
  const { dispatch } = usePlanner();
  return (
    <section className="hy-section hy-peak-index" id="peaks" aria-labelledby="hy-peaks-title">
      <div className="hy-container">
        <div className="hy-section-head hy-section-head--split">
          <div><h2 id="hy-peaks-title">Every line has a different question.</h2></div>
          <p>Select a peak to carry its elevation into the route room. The index is a starting point, not a promise.</p>
        </div>
        <div className="hy-peak-plates">
          <figure className="hy-peak-plate">
            <Picture assetKey="peak-everest" alt="Documentary view of the Everest region at first light" />
            <figcaption className="hy-peak-plate__caption">
              <span>Lead / 01</span>
              <strong>Everest (8,848 m)</strong>
            </figcaption>
          </figure>
          <figure className="hy-peak-plate">
            <Picture assetKey="peak-k2" alt="Granite and ice face of K2 in hard side light" />
            <figcaption className="hy-peak-plate__caption">
              <span>Secondary / 02</span>
              <strong>K2 (8,611 m)</strong>
            </figcaption>
          </figure>
        </div>
        <div className="hy-peak-list">
          {PEAKS.map((peak, index) => (
            <a
              key={peak.id}
              className="hy-peak-row"
              href="#planner"
              onClick={() => dispatch({ type: "selectPeak", peakId: peak.id })}
            >
              <span className="hy-peak-row__index">{String(index + 1).padStart(2, "0")}</span>
              <span className="hy-peak-row__name">{peak.name}</span>
              <span className="hy-peak-row__alt">{peak.elevation.toLocaleString()} m</span>
              <span className="hy-peak-row__character">{peak.character}</span>
              <span className="hy-peak-row__arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
