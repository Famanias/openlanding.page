import { beanTempAt, CRACK_AT, TOTAL_SECONDS, clampElapsed } from "./roast";

/* Chart geometry: elapsed → x, temperature → y. */
const X0 = 56;
const X1 = 700;
const Y0 = 372; // bottom (80 °C)
const Y1 = 64; // top (210 °C)

export function curveX(elapsed: number): number {
  return X0 + (clampElapsed(elapsed) / TOTAL_SECONDS) * (X1 - X0);
}

export function curveY(tempC: number): number {
  const t = Math.max(80, Math.min(210, tempC));
  return Y0 - ((t - 80) / (130)) * (Y0 - Y1);
}

/** Sampled polyline of the whole roast, smooth enough at this scale. */
const FULL_PATH = (() => {
  const points: string[] = [];
  for (let t = 0; t <= TOTAL_SECONDS; t += 6) {
    points.push(`${curveX(t).toFixed(1)} ${curveY(beanTempAt(t)).toFixed(1)}`);
  }
  return `M ${points.join(" L ")}`;
})();

const CRACK_X = curveX(CRACK_AT);
const DROP_X = curveX(TOTAL_SECONDS);

type RoastCurveProps = {
  elapsed: number;
  className?: string;
};

export function RoastCurve({ elapsed, className }: RoastCurveProps) {
  const t = clampElapsed(elapsed);
  const progress = t / TOTAL_SECONDS;
  const dotX = curveX(t);
  const dotY = curveY(beanTempAt(t));
  const cracked = t >= CRACK_AT;

  return (
    <svg
      viewBox="0 0 760 420"
      className={className}
      role="img"
      aria-label={`Roast curve, ${Math.round(progress * 100)} percent complete`}
    >
      {/* chart grid */}
      <g stroke="var(--color-oat)" strokeOpacity="0.28" strokeWidth="1">
        {[100, 160, 220, 280, 340].map((y) => (
          <line key={y} x1={X0} y1={y} x2={X1} y2={y} />
        ))}
        {[0, 115, 230, 345, 460, 575, 690].map((s) => (
          <line key={s} x1={curveX(s)} y1={Y1 - 12} x2={curveX(s)} y2={Y0 + 12} />
        ))}
      </g>

      {/* axis labels */}
      <g fill="var(--color-oat)" fontSize="13" fontFamily="var(--font-sd-mono)" opacity="0.85">
        <text x={X0 - 6} y={Y1 - 22}>°C</text>
        <text x={X0 - 4} y={Y0 + 34}>0:00</text>
        <text x={curveX(345) - 14} y={Y0 + 34}>5:45</text>
        <text x={X1 - 44} y={Y0 + 34}>11:30</text>
      </g>

      {/* the full curve, ghosted */}
      <path
        d={FULL_PATH}
        fill="none"
        stroke="var(--color-crema)"
        strokeOpacity="0.22"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* first-crack marker */}
      <g className="sd-crack-marker" opacity={cracked ? 1 : 0}>
        <line
          x1={CRACK_X}
          y1={Y1 - 12}
          x2={CRACK_X}
          y2={Y0 + 12}
          stroke="var(--color-roastgreen)"
          strokeWidth="2.5"
          strokeDasharray="7 6"
        />
        <text
          x={CRACK_X + 8}
          y={Y1 + 4}
          fill="var(--color-roastgreen)"
          fontSize="13"
          fontFamily="var(--font-sd-mono)"
        >
          FIRST CRACK 8:42
        </text>
      </g>

      {/* the drawn portion */}
      <path
        className="sd-curve-line"
        d={FULL_PATH}
        pathLength={100}
        fill="none"
        stroke="var(--color-tangerine)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray="100"
        strokeDashoffset={100 - progress * 100}
      />

      {/* travelling dot */}
      <circle cx={dotX} cy={dotY} r="9" fill="var(--color-tangerine)" stroke="var(--color-espresso)" strokeWidth="3" />

      {/* drop marker */}
      <text
        x={DROP_X - 10}
        y={Y1 - 22}
        fill="var(--color-oat)"
        fontSize="13"
        fontFamily="var(--font-sd-mono)"
        textAnchor="end"
        opacity={t >= TOTAL_SECONDS ? 1 : 0}
      >
        DROP 208°C
      </text>
    </svg>
  );
}
