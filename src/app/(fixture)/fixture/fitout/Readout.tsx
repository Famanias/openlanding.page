/**
 * The live numbers under the storefront. The server renders the finished shop's values; in the live scene
 * SceneController rewrites each [data-readout] text node from readoutAt(progress).
 */
export function Readout() {
  return (
    <dl className="fx-readout" aria-label="Store readout">
      <div className="fx-readout__cell">
        <dt className="fx-mono">Load time</dt>
        <dd><span data-readout="load">1.2</span> s</dd>
        <span className="fx-readout__bar" aria-hidden="true"><span /></span>
      </div>
      <div className="fx-readout__cell">
        <dt className="fx-mono">Conversion</dt>
        <dd><span data-readout="conversion">2.8</span>%</dd>
      </div>
      <div className="fx-readout__cell">
        <dt className="fx-mono">Orders</dt>
        <dd data-readout="orders">38</dd>
      </div>
      <div className="fx-readout__cell">
        <dt className="fx-mono">Fitted</dt>
        <dd><span data-readout="checks">5</span>/5</dd>
      </div>
    </dl>
  );
}
