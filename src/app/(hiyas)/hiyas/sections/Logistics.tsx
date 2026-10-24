import { VideoPlate } from "../assets";
import { LOGISTICS } from "../content/expedition-data";

export function Logistics() {
  return (
    <section className="hy-section hy-logistics" id="logistics" aria-labelledby="hy-logistics-title">
      <div className="hy-container">
        <div className="hy-section-head hy-section-head--split">
          <div><h2 id="hy-logistics-title">Quiet systems carry loud ambitions.</h2></div>
          <p>A route room is useful when the details are easy to find. This is where the plan keeps its edges.</p>
        </div>
        <div className="hy-logistics__grid">
          <div className="hy-logistics__plate">
            <VideoPlate clipKey="camp-wind" posterKey="camp-night" label="High camp ambient view at night" />
          </div>
          <table className="hy-table">
            <thead><tr><th scope="col">Field</th><th scope="col">What stays visible</th></tr></thead>
            <tbody>{LOGISTICS.map(([field,copy]) => <tr key={field}><td>{field}</td><td>{copy}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

