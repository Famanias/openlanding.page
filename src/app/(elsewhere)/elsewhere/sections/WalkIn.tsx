import type { CSSProperties } from "react";
import { Picture } from "../assets";
import { Blaze, SignalBars } from "../brand/Signal";
import { Lines } from "../motion/Lines";
import { Reveal } from "../motion/Reveal";
import { ELEVATION_GAIN, TRAIL_LENGTH, WALK_MINUTES, WAYPOINTS, formatMetres, minutesTo, signalBars, signalLabel } from "../walk/trail";

/**
 * The walk in. Five waypoint posts scroll past a pinned photograph of the last stretch; the scroll engine
 * reads the posts' real offsets, so the header's metres and the dotted line on the photograph agree with
 * whichever post is beside you.
 */
export function WalkIn() {
  return (
    <section className="ew-walk" id="walk" data-ew-walk aria-labelledby="ew-walk-title">
      <div className="ew-walk-head">
        <Reveal variant="slide" className="ew-post ew-section-post">
          <Blaze /> The walk in · {formatMetres(TRAIL_LENGTH)} · {WALK_MINUTES} min
        </Reveal>
        <Reveal as="h2" variant="lines" className="ew-display ew-h2" id="ew-walk-title">
          <Lines lines={["It takes thirty-five", "minutes to stop", "checking."]} />
        </Reveal>
        <Reveal as="p" variant="settle" className="ew-lede" delay={160}>
          There is no drive-up. You carry what you need {formatMetres(TRAIL_LENGTH)} and {ELEVATION_GAIN} m uphill, past five posts, and the signal thins out
          a bar at a time. By the plank bridge it is gone. That is the point of the path.
        </Reveal>
      </div>

      <div className="ew-walk-grid">
        <div className="ew-walk-photo">
          <figure className="ew-trail-frame">
            <Reveal variant="wipe" className="ew-trail-wipe">
              <div className="ew-trail-zoom">
                <Picture
                  assetKey="trail"
                  sizes="(min-width: 960px) 42vw, 100vw"
                  alt="Looking up a path of mossy stone slabs between tall conifers. At the top, through the mist, the cabin's lit doorway."
                />
                <svg className="ew-trail-line" viewBox="0 0 896 1200" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
                  <path d="M447 1184C441 1104 378 1046 398 992S441 902 446 860 470 792 482 770 487 732 480 712" pathLength={1} />
                </svg>
              </div>
            </Reveal>
            <figcaption className="ew-trail-caption">
              <span className="ew-post">Walked</span>
              <span className="ew-trail-walked" data-ew-walked aria-hidden="true">
                0 m
              </span>
              <span className="ew-post ew-trail-of">of {formatMetres(TRAIL_LENGTH)} · the stone steps, looking up</span>
            </figcaption>
          </figure>
        </div>

        <ol className="ew-posts">
          {WAYPOINTS.map((waypoint, index) => {
            const bars = signalBars(waypoint.metres);
            return (
              <li
                key={waypoint.id}
                className="ew-waypost"
                id={`post-${waypoint.id}`}
                data-ew-post
                data-metres={waypoint.metres}
                data-reached={index === 0}
                style={{ "--i": index } as CSSProperties}
              >
                <Reveal variant="slide" className="ew-waypost-head">
                  <Blaze className="ew-waypost-blaze" />
                  <span className="ew-post ew-waypost-metres">{formatMetres(waypoint.metres)}</span>
                  <span className="ew-post ew-waypost-meta">
                    elev. {waypoint.elevation} m · {minutesTo(waypoint.metres)} min in
                  </span>
                  <span className="ew-waypost-signal">
                    <SignalBars bars={bars} />
                    <span className="ew-post">{signalLabel(bars)}</span>
                  </span>
                </Reveal>
                <Reveal as="h3" variant="lines" className="ew-display ew-waypost-name">
                  <Lines lines={[waypoint.name]} />
                </Reveal>
                <Reveal as="p" variant="settle" className="ew-waypost-note" delay={120}>
                  {waypoint.note}
                </Reveal>
                <Reveal variant="draw" className="ew-rule" delay={200} />
                <Reveal as="p" variant="settle" className="ew-post ew-waypost-detail" delay={260}>
                  {waypoint.detail}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
