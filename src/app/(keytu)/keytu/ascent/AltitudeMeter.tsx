import { CAMPS, activeCamp, altitudeAt, formatAltitude } from "./camps";

const MIN = CAMPS[0].altitude;
const MAX = CAMPS[CAMPS.length - 1].altitude;
const share = (m: number) => (m - MIN) / (MAX - MIN);

/** Vertical altitude scale with camp ticks, plus the big readout. */
export function AltitudeMeter({ progress }: { progress: number }) {
  const altitude = altitudeAt(progress);
  const current = activeCamp(progress);
  return (
    <div className="crn-meter">
      <div className="crn-meter__scale" aria-hidden="true">
        <div className="crn-meter__track">
          <div className="crn-meter__fill" style={{ transform: `scaleY(${share(altitude)})` }} />
        </div>
        <ol className="crn-meter__camps">
          {CAMPS.map((c, i) => (
            <li
              key={c.id}
              style={{ bottom: `${share(c.altitude) * 100}%` }}
              data-state={i === current ? "active" : i < current ? "passed" : "ahead"}
            >
              <span className="crn-meter__alt">{c.altitude.toLocaleString("en-US")}</span>
              <span className="crn-meter__name">{c.name}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="crn-readout">
        {/* The number changes on every scroll frame, so it is not announced; the camp name is. */}
        <p className="crn-readout__alt" data-testid="altitude-readout">
          {formatAltitude(altitude)}
        </p>
        <p className="crn-label crn-readout__camp" data-testid="active-camp" aria-live="polite">
          {CAMPS[current].name}
        </p>
      </div>
    </div>
  );
}
