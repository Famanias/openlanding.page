"use client";
import { useState, type CSSProperties } from "react";
import { Picture } from "../assets";
import { Blaze } from "../brand/Signal";
import { formatMoney } from "../stay/quote";
import { useStay } from "../stay/StayProvider";
import { MONTHS, SEASONS, daylightHours, formatDaylight, formatTemperature, seasonForMonth, seasonIndex, type SeasonId } from "./seasons";

/**
 * Three plates from one camera position, one month ruler. Moving the ruler across a season boundary wipes
 * the next plate over the last, in the direction the year is travelling, and re-computes daylight and rate.
 */
export function SeasonFrame() {
  const { state, dispatch } = useStay();
  const season = seasonForMonth(state.month);
  // derived during render: which plate is underneath, and which way the year is moving
  const [history, setHistory] = useState<{ current: SeasonId; previous: SeasonId | null; direction: 1 | -1 }>({
    current: season.id,
    previous: null,
    direction: 1,
  });
  if (history.current !== season.id) {
    setHistory({
      previous: history.current,
      current: season.id,
      direction: seasonIndex(season.id) > seasonIndex(history.current) ? 1 : -1,
    });
  }
  const { previous, direction } = history;
  const month = MONTHS[state.month - 1];

  return (
    <div className="ew-season" data-season={season.id} data-dir={direction === 1 ? "forward" : "back"} data-switched={previous !== null}>
      <figure className="ew-season-frame">
        {SEASONS.map((item) => (
          <div className="ew-season-plate" key={item.id} data-active={item.id === season.id} data-was={item.id === previous} aria-hidden={item.id !== season.id}>
            <Picture assetKey={item.assetKey} alt={item.alt} sizes="(min-width: 960px) 62vw, 100vw" />
          </div>
        ))}
        <figcaption className="ew-season-caption">
          <Blaze />
          <span className="ew-post">
            {season.name} season · {season.span}
          </span>
        </figcaption>
      </figure>

      <div className="ew-season-panel">
        <fieldset className="ew-season-tabs">
          <legend className="ew-sr">Season</legend>
          {SEASONS.map((item) => (
            <label className="ew-season-tab" key={item.id}>
              <input
                type="radio"
                name="ew-season"
                value={item.id}
                checked={item.id === season.id}
                onChange={() => dispatch({ type: "season", season: item.id })}
              />
              <span className="ew-season-tab-name">{item.name}</span>
              <span className="ew-post">{item.short}</span>
            </label>
          ))}
        </fieldset>

        <div className="ew-ruler" style={{ "--ew-month": (state.month - 1) / 11 } as CSSProperties}>
          <label className="ew-post" htmlFor="ew-month">
            Month on the ruler
          </label>
          <input
            id="ew-month"
            className="ew-ruler-input"
            type="range"
            min={1}
            max={12}
            step={1}
            value={state.month}
            aria-valuetext={`${month}, ${season.name.toLowerCase()} season`}
            onChange={(event) => dispatch({ type: "month", month: Number(event.target.value) })}
          />
          <div className="ew-ruler-ticks" aria-hidden="true">
            {MONTHS.map((name, index) => (
              <span key={name} data-season={seasonForMonth(index + 1).id} data-current={index + 1 === state.month}>
                {name[0]}
              </span>
            ))}
          </div>
        </div>

        <div className="ew-season-readout">
          <p className="ew-season-month" aria-live="polite" aria-atomic="true">
            <span className="ew-display" key={month}>
              {month}
            </span>
            <span className="ew-post">{season.name} season</span>
          </p>
          <dl className="ew-season-facts">
            <div>
              <dt className="ew-post">Daylight</dt>
              <dd>{formatDaylight(daylightHours(state.month))}</dd>
            </div>
            <div>
              <dt className="ew-post">Low / high</dt>
              <dd>
                {formatTemperature(season.low)} / {formatTemperature(season.high)}C
              </dd>
            </div>
            <div>
              <dt className="ew-post">The walk in</dt>
              <dd>{season.trailMinutes} min</dd>
            </div>
            <div>
              <dt className="ew-post">Wood a day</dt>
              <dd>
                {season.stoveLoads} {season.stoveLoads === 1 ? "armload" : "armloads"}
              </dd>
            </div>
            <div>
              <dt className="ew-post">A night</dt>
              <dd>{formatMoney(season.rate)}</dd>
            </div>
          </dl>
          <p className="ew-season-valley">{season.valley}</p>
          <p className="ew-season-bring">
            <span className="ew-post">Bring</span> {season.bring}
          </p>
        </div>
      </div>
    </div>
  );
}
