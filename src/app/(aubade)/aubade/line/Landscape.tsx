import type { SceneId } from "../content/line";

/**
 * The view from the window, drawn as flat colour fields. Each layer is a 200%-wide SVG whose artwork repeats
 * every 1200 units (50%), so sliding it by layerShift() loops seamlessly. Fills live in aubade.css per scene.
 * Server component: no JS ships for the artwork.
 */

type LayerName = "detail" | "far" | "mid" | "near";

function Layer({ name, height, children }: { name: LayerName; height: number; children: React.ReactNode }) {
  return (
    <svg className={`au-layer au-layer--${name}`} viewBox={`0 0 2400 ${height}`} preserveAspectRatio="none" aria-hidden="true">
      <g>{children}</g>
      <g transform="translate(1200 0)">{children}</g>
    </svg>
  );
}

function Stars() {
  const pts = [
    [40, 30], [130, 80], [210, 20], [300, 120], [380, 50], [470, 95], [560, 15], [640, 70], [720, 130], [800, 35],
    [880, 100], [960, 55], [1040, 140], [1110, 25], [1170, 85],
  ];
  return (
    <>
      {pts.map(([x, y], i) => (
        <rect key={i} className="au-f-star" x={x} y={y} width={i % 3 === 0 ? 4 : 3} height={i % 3 === 0 ? 4 : 3} />
      ))}
    </>
  );
}

function Firs({ base, count, step, min, spread, width, className }: { base: number; count: number; step: number; min: number; spread: number; width: number; className: string }) {
  const d = Array.from({ length: count }, (_, i) => {
    const x = i * step + ((i * 7) % 3) * 6;
    const h = min + ((i * 37) % spread);
    return `M${x} ${base}L${x + width / 2} ${base - h}L${x + width} ${base}Z`;
  }).join("");
  return <path className={className} d={d} />;
}

function Dusk() {
  return (
    <>
      <Layer name="detail" height={200}>
        <rect className="au-f-cloud" x="80" y="40" width="260" height="6" rx="3" />
        <rect className="au-f-cloud" x="520" y="78" width="180" height="5" rx="2.5" />
        <rect className="au-f-cloud" x="900" y="26" width="220" height="6" rx="3" />
      </Layer>
      <Layer name="far" height={200}>
        <path className="au-f-far" d="M0 120Q150 60 300 100T600 90T900 112T1200 120V200H0Z" />
      </Layer>
      <Layer name="mid" height={120}>
        <path className="au-f-mid" d="M0 46Q300 18 600 40T1200 46V120H0Z" />
        <rect className="au-f-row" x="0" y="66" width="1200" height="2" />
        <rect className="au-f-row" x="0" y="84" width="1200" height="2" />
        <rect className="au-f-row" x="0" y="102" width="1200" height="2" />
      </Layer>
      <Layer name="near" height={400}>
        <rect className="au-f-near" x="150" y="0" width="8" height="400" />
        <rect className="au-f-near" x="130" y="30" width="48" height="5" />
        <rect className="au-f-near" x="750" y="0" width="8" height="400" />
        <rect className="au-f-near" x="730" y="30" width="48" height="5" />
        <rect className="au-f-near" x="0" y="46" width="1200" height="2" />
        <ellipse className="au-f-near" cx="420" cy="330" rx="18" ry="70" />
        <ellipse className="au-f-near" cx="452" cy="345" rx="14" ry="55" />
        <ellipse className="au-f-near" cx="1000" cy="320" rx="20" ry="80" />
      </Layer>
    </>
  );
}

function Forest() {
  return (
    <>
      <Layer name="detail" height={200}>
        <Stars />
      </Layer>
      <Layer name="far" height={200}>
        <path className="au-f-far" d="M0 150L110 80L200 125L330 55L470 130L600 85L740 120L880 60L1020 115L1200 150V200H0Z" />
      </Layer>
      <Layer name="mid" height={160}>
        <Firs base={160} count={20} step={60} min={70} spread={60} width={44} className="au-f-mid" />
        <rect className="au-f-mid" x="0" y="140" width="1200" height="20" />
      </Layer>
      <Layer name="near" height={400}>
        <Firs base={400} count={2} step={620} min={300} spread={60} width={130} className="au-f-near" />
        <rect className="au-f-pole" x="420" y="0" width="8" height="400" />
        <rect className="au-f-pole" x="0" y="46" width="1200" height="2" />
      </Layer>
    </>
  );
}

function Tunnel() {
  return (
    <>
      <Layer name="far" height={200}>
        {[0, 300, 600, 900].map((x) => (
          <rect key={x} className="au-f-rib" x={x} y="0" width="36" height="200" />
        ))}
      </Layer>
      <Layer name="mid" height={200}>
        <rect className="au-f-cable" x="0" y="62" width="1200" height="3" />
        <rect className="au-f-cable" x="0" y="80" width="1200" height="2" />
        <rect className="au-f-cable" x="0" y="168" width="1200" height="4" />
      </Layer>
      <Layer name="near" height={400}>
        {[100, 700].map((x) => (
          <g key={x}>
            <rect className="au-f-glow" x={x - 30} y="96" width="220" height="34" rx="17" />
            <rect className="au-f-lamp" x={x} y="110" width="160" height="6" rx="3" />
          </g>
        ))}
      </Layer>
    </>
  );
}

function Lake() {
  return (
    <>
      <Layer name="detail" height={200}>
        <Stars />
      </Layer>
      <Layer name="far" height={200}>
        <path className="au-f-far" d="M0 130L90 90L170 115L300 40L420 120L540 70L700 125L820 80L960 110L1080 60L1200 130V200H0Z" />
      </Layer>
      <Layer name="mid" height={200}>
        <rect className="au-f-water" x="0" y="60" width="1200" height="140" />
        <rect className="au-f-shore" x="0" y="54" width="1200" height="8" />
        {[120, 136, 610, 628, 640, 1010].map((x) => (
          <rect key={x} className="au-f-light" x={x} y="50" width="5" height="5" />
        ))}
        <rect className="au-f-glint" x="300" y="92" width="60" height="3" />
        <rect className="au-f-glint" x="318" y="112" width="30" height="3" />
        <rect className="au-f-glint" x="980" y="104" width="40" height="3" />
      </Layer>
      <Layer name="near" height={400}>
        <path className="au-f-near" d="M0 362Q300 340 600 356T1200 362V400H0Z" />
        <rect className="au-f-near" x="400" y="0" width="8" height="400" />
        <rect className="au-f-near" x="0" y="46" width="1200" height="2" />
      </Layer>
    </>
  );
}

function Dawn() {
  return (
    <>
      <Layer name="detail" height={200}>
        <rect className="au-f-cloud" x="140" y="34" width="300" height="5" rx="2.5" />
        <rect className="au-f-cloud" x="700" y="64" width="200" height="4" rx="2" />
      </Layer>
      <Layer name="far" height={200}>
        <rect className="au-f-band" x="0" y="112" width="1200" height="88" />
        <path
          className="au-f-city"
          d="M380 112V80H480V112ZM500 112a40 40 0 0 1 80 0ZM540 72h4v8h-4ZM690 112V34L698 14L706 34V112ZM760 112V90H900V112ZM820 90a22 22 0 0 1 44 0Z"
        />
      </Layer>
      <Layer name="mid" height={200}>
        <rect className="au-f-water" x="0" y="0" width="1200" height="200" />
        <rect className="au-f-glint" x="200" y="40" width="140" height="3" />
        <rect className="au-f-glint" x="820" y="90" width="90" height="3" />
      </Layer>
      <Layer name="near" height={400}>
        {[200, 760].map((x) => (
          <g key={x}>
            <rect className="au-f-near" x={x} y="250" width="8" height="150" transform={`rotate(-4 ${x} 400)`} />
            <rect className="au-f-near" x={x + 14} y="240" width="8" height="160" />
            <rect className="au-f-near" x={x + 28} y="256" width="8" height="144" transform={`rotate(5 ${x + 28} 400)`} />
          </g>
        ))}
        <rect className="au-f-near" x="520" y="0" width="7" height="400" />
        <rect className="au-f-near" x="0" y="46" width="1200" height="2" />
      </Layer>
    </>
  );
}

const SCENES: Record<SceneId, () => React.ReactElement> = { dusk: Dusk, forest: Forest, tunnel: Tunnel, lake: Lake, dawn: Dawn };

export function Scene({ id, className }: { id: SceneId; className?: string }) {
  const Art = SCENES[id];
  return (
    <div className={`au-scene au-scene--${id} ${className ?? ""}`} data-scene={id}>
      <div className="au-sky" />
      <div className="au-orb" />
      <Art />
    </div>
  );
}
