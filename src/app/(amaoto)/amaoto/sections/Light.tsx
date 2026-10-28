import { StageAnchor } from "../bg/StageAnchor";
export function Light({
  angle,
  onAngle,
  rain,
  onRain,
}: {
  angle: number;
  onAngle: (v: number) => void;
  rain: boolean;
  onRain: (v: boolean) => void;
}) {
  return (
    <section id="light" className="am-section am-light">
      <StageAnchor />
      <div className="am-chapter-copy">
        <span className="am-kicker">02 / translucency</span>
        <h2>
          <span className="am-line">
            <span>Paper that</span>
          </span>
          <em className="am-line">
            <span>listens to light.</span>
          </em>
        </h2>
        <p>
          Thin washi is not a surface. It is a membrane. Put the sun behind it
          and the fibres answer.
        </p>
      </div>
      <div className="am-control">
        <label htmlFor="sun">
          Sun angle <output htmlFor="sun">{angle}°</output>
        </label>
        <input
          id="sun"
          type="range"
          min="-90"
          max="90"
          value={angle}
          onChange={(e) => onAngle(Number(e.target.value))}
        />
        <label className="am-switch">
          <input
            type="checkbox"
            checked={rain}
            onChange={(e) => onRain(e.target.checked)}
          />
          <span className="am-switch__pour" aria-hidden="true" />
          <span>Rain on the roof</span>
        </label>
      </div>
    </section>
  );
}
