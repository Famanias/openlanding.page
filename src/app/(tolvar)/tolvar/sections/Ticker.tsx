import { Marquee } from "../motion/Marquee";
import { allServiceNames } from "../work/services";

/** A band of every service name drifting sideways. Decorative: the same names are real text in the work section. */
export function Ticker() {
  return (
    <div className="tv-ticker">
      <Marquee>
        {allServiceNames().map((name) => (
          <span key={name} className="tv-ticker-item">
            {name}
            <i aria-hidden="true" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}
