import { COLOURWAYS } from "../data/colourways";
import { StageAnchor } from "../bg/StageAnchor";
export function Canopy({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string, origin?: [number, number]) => void;
}) {
  return (
    <section id="canopy" className="am-section am-canopy">
      <StageAnchor />
      <div className="am-chapter-copy">
        <span className="am-kicker">03 / colourways</span>
        <h2>
          <span className="am-line">
            <span>Choose your</span>
          </span>
          <em className="am-line">
            <span>canopy.</span>
          </em>
        </h2>
        <p>
          One structure, four moods. The motif is painted into the paper before
          the last binding.
        </p>
        <div
          className="am-swatches"
          role="radiogroup"
          aria-label="Canopy colourway"
        >
          {COLOURWAYS.map((item) => (
            <button
              key={item.id}
              className={value === item.id ? "is-active" : ""}
              style={{ "--swatch": item.color } as React.CSSProperties}
              onClick={(event) => {
                const r = event.currentTarget.getBoundingClientRect();
                onChange(
                  item.id,
                  event.detail
                    ? [
                        (event.clientX - r.left) / r.width,
                        (event.clientY - r.top) / r.height,
                      ]
                    : [0.5, 0.5],
                );
              }}
              onKeyDown={(event) => {
                const index = COLOURWAYS.findIndex((x) => x.id === item.id);
                const next =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? 3
                      : ["ArrowRight", "ArrowDown"].includes(event.key)
                        ? (index + 1) % 4
                        : ["ArrowLeft", "ArrowUp"].includes(event.key)
                          ? (index + 3) % 4
                          : -1;
                if (next < 0) return;
                event.preventDefault();
                onChange(COLOURWAYS[next].id);
                (
                  event.currentTarget.parentElement?.children[
                    next
                  ] as HTMLButtonElement
                )?.focus();
              }}
              role="radio"
              aria-checked={value === item.id}
            >
              <span />
              <b>{item.label}</b>
              <i aria-hidden="true">↗</i>
            </button>
          ))}
        </div>
      </div>
      <span className="am-stage-caption">
        Drag to turn / painted in the paper
      </span>
    </section>
  );
}
