/**
 * The studio seen from above: the stage, its apron, the wings, three blocks of seats
 * and the spike tape actors stand on. Drawn once, shown pale in the hero and lit in the finale.
 */
const CX = 800;
const CY = 432;
const ROWS = Array.from({ length: 11 }, (_, i) => 250 + i * 46);
const BLOCKS: [number, number][] = [[22, 63], [68, 112], [117, 158]];

const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const;
};

const arc = (r: number, a0: number, a1: number) => {
  const [x0, y0] = polar(r, a0);
  const [x1, y1] = polar(r, a1);
  return `M${x0.toFixed(1)} ${y0.toFixed(1)}A${r} ${r} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}`;
};

const sector = (r0: number, r1: number, a0: number, a1: number) => {
  const [ax, ay] = polar(r1, a0);
  const [bx, by] = polar(r1, a1);
  const [cx, cy] = polar(r0, a1);
  const [dx, dy] = polar(r0, a0);
  return `M${ax.toFixed(1)} ${ay.toFixed(1)}A${r1} ${r1} 0 0 1 ${bx.toFixed(1)} ${by.toFixed(1)}L${cx.toFixed(1)} ${cy.toFixed(1)}A${r0} ${r0} 0 0 0 ${dx.toFixed(1)} ${dy.toFixed(1)}Z`;
};

type Spike = { x: number; y: number; kind: "x" | "t" | "l"; tone: "tape" | "cue" | "white"; r?: number };
const SPIKES: Spike[] = [
  { x: 520, y: 210, kind: "x", tone: "tape" }, { x: 660, y: 300, kind: "t", tone: "cue", r: 12 },
  { x: 940, y: 250, kind: "x", tone: "white" }, { x: 1080, y: 330, kind: "l", tone: "tape", r: -20 },
  { x: 720, y: 180, kind: "l", tone: "cue", r: 40 }, { x: 880, y: 390, kind: "t", tone: "tape", r: -8 },
  { x: 600, y: 420, kind: "x", tone: "cue" }, { x: 1010, y: 190, kind: "t", tone: "white", r: 30 },
  { x: 450, y: 340, kind: "l", tone: "white", r: 90 }, { x: 1150, y: 230, kind: "x", tone: "cue" },
  { x: 790, y: 245, kind: "x", tone: "tape" },
];

function SpikeMark({ x, y, kind, tone, r = 0 }: Spike) {
  const d = kind === "x" ? "M-11 -11 11 11M11 -11 -11 11" : kind === "t" ? "M-13 -9H13M0 -9V12" : "M-10 -12V10H12";
  return <path className={`us-floor__spike us-floor__spike--${tone}`} d={d} transform={`translate(${x} ${y}) rotate(${r})`} />;
}

export function StageFloor({ variant, className }: { variant: "pale" | "lit"; className?: string }) {
  return (
    <svg className={`us-floor us-floor--${variant} ${className ?? ""}`} viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {/* seat blocks */}
      {BLOCKS.map(([a0, a1], b) => (
        <path key={`s${b}`} className={`us-floor__block us-floor__block--${b}`} d={sector(ROWS[0] - 18, ROWS[ROWS.length - 1] + 18, a0, a1)} />
      ))}
      {BLOCKS.flatMap(([a0, a1], b) => ROWS.map((r, i) => <path key={`r${b}-${i}`} className="us-floor__row" d={arc(r, a0, a1)} />))}
      {/* the stage, its wings and apron */}
      <path className="us-floor__stage" d="M380 110H1220V470Q800 560 380 470Z" />
      <path className="us-floor__wing" d="M240 130H372V450H240ZM1228 130H1360V450H1228Z" />
      <path className="us-floor__line" d="M360 470H1240" />
      {Array.from({ length: 7 }, (_, i) => <path key={`g${i}`} className="us-floor__grid" d={`M${480 + i * 106} 120V462`} />)}
      {Array.from({ length: 3 }, (_, i) => <path key={`h${i}`} className="us-floor__grid" d={`M390 ${200 + i * 90}H1210`} />)}
      {SPIKES.map((s, i) => <SpikeMark key={i} {...s} />)}
      {/* the ghost light, left burning on an empty stage */}
      <circle className="us-floor__glow" cx="800" cy="300" r="70" />
      <circle className="us-floor__bulb" cx="800" cy="300" r="9" />
      {/* aisles */}
      {[65.5, 114.5].map((a) => { const [x0, y0] = polar(ROWS[0] - 18, a); const [x1, y1] = polar(ROWS[ROWS.length - 1] + 30, a); return <path key={a} className="us-floor__aisle" d={`M${x0.toFixed(1)} ${y0.toFixed(1)}L${x1.toFixed(1)} ${y1.toFixed(1)}`} />; })}
    </svg>
  );
}
