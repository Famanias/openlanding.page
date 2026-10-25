import { Blades, Flowers, Glow, Ridge, RidgeSketch, SceneSvg, SketchPath, Sky, seeded } from "./Painted";

const f = (value: number) => Math.round(value * 10) / 10;

function Bamboo({ x, base, lean, width, seed, tone }: { x: number; base: number; lean: number; width: number; seed: number; tone: string }) {
  const next = seeded(seed);
  const top = base - 640 - next() * 160;
  const joints: number[] = [];
  for (let y = base - 70; y > top; y -= 70 + next() * 40) joints.push(y);
  const at = (y: number) => f(x + ((base - y) / (base - top)) * lean);
  return <g>
    <path d={`M${x} ${base}L${at(top)} ${top}`} stroke={tone} strokeWidth={width} strokeLinecap="round" />
    <path d={`M${x - width * .22} ${base}L${at(top) - width * .22} ${top}`} stroke="var(--st-bamboo-lit)" strokeWidth={width * .22} strokeLinecap="round" opacity=".7" />
    {joints.map(y => <path key={y} d={`M${at(y) - width * .62} ${f(y)}h${f(width * 1.24)}`} stroke="var(--st-forest)" strokeWidth="3" opacity=".5" />)}
    {joints.filter((_, i) => i % 3 === 1).map(y => <path key={`l${y}`} d={`M${at(y)} ${f(y)}q${f(40 + width)} -${f(8 + width)} ${f(86 + width * 2)} ${f(18)}m-${f(70 + width)} -${f(2)}q${f(34)} -${f(18)} ${f(66)} -${f(34)}`} stroke={tone} strokeWidth="5" strokeLinecap="round" opacity=".8" />)}
  </g>;
}

/* Little adventures: a misty bamboo grove with morning light, soft enough to sit behind a heading. */
export function ForestScene() {
  const r1 = "M0 330C150 280 300 292 450 330 640 280 800 300 980 340 1160 290 1360 300 1600 350V900H0Z";
  const r2 = "M0 640C300 600 700 620 1000 640 1250 656 1450 640 1600 620V900H0Z";
  const r3 = "M0 880C300 790 640 760 940 784 1180 802 1420 840 1600 800V900H0Z";

  return <SceneSvg label="A painted bamboo grove in morning mist, with beams of sunlight falling across a mossy path.">
    <g className="st-sketch-lines" aria-hidden="true">
      <SketchPath d="M1050 0L670 700" depth="far" />
      <SketchPath d="M1220 0L980 700" depth="far" />
      <SketchPath d="M870 0L460 700" depth="far" />
      <RidgeSketch d={r1} depth="far" />
      {[90, 330, 590, 860, 1130, 1390, 1580].map((x, i) => (
        <SketchPath key={x} d={`M${x} 720L${x + (i % 2 ? 30 : -24)} 40`} depth="mid" />
      ))}
      <RidgeSketch d={r2} depth="mid" />
      {[40, 250, 470, 720, 990, 1210, 1450].map((x, i) => (
        <SketchPath key={x} d={`M${x} 900L${x + (i % 2 ? 46 : -34)} 120`} depth="near" />
      ))}
      <RidgeSketch d={r3} depth="near" />
      <SketchPath d="M520 900C600 836 700 800 840 790C960 782 1060 800 1100 830" depth="near" />
      <SketchPath d="M700 900C700 876 720 856 840 856C940 840 1060 850 1100 830" depth="near" />
    </g>
    <g className="st-paint-wash">
      <g className="st-paint-layer" data-depth="sky">
        <Sky stops={[[0, "var(--st-forest-sky)"], [.55, "var(--st-sky-mid)"], [1, "var(--st-sky-low)"]]} />
        <Glow x={1050} y={110} r={540} opacity={.95} />
        <g className="st-beams" opacity=".38" fill="var(--st-sun)">
          <path d="M980 0 1120 0 780 700 560 700Z" />
          <path d="M1180 0 1260 0 1060 700 900 700Z" opacity=".6" />
          <path d="M840 0 900 0 520 700 400 700Z" opacity=".5" />
        </g>
      </g>
      <g className="st-paint-layer" data-depth="far">
        <Ridge d={r1} top="var(--st-mtn-far)" bottom="var(--st-mtn-haze)" />
        <g opacity=".4">{[90, 330, 590, 860, 1130, 1390, 1580].map((x, i) => <Bamboo key={x} x={x} base={720} lean={i % 2 ? 30 : -24} width={10} seed={i + 61} tone="var(--st-bamboo-far)" />)}</g>
      </g>
      <g className="st-paint-layer" data-depth="mid">
        <path d={r2} fill="var(--st-meadow-lit)" opacity=".85" />
        <g className="st-bamboo-sway" opacity=".72">
          {[40, 250, 470, 720, 990, 1210, 1450].map((x, i) => <Bamboo key={x} x={x} base={900} lean={i % 2 ? 46 : -34} width={17 + (i % 3) * 4} seed={i + 5} tone="var(--st-bamboo)" />)}
        </g>
      </g>
      <g className="st-paint-layer" data-depth="near">
        <Ridge d={r3} top="var(--st-meadow)" bottom="var(--st-forest)" />
        <path d="M520 900C600 836 700 800 840 790 960 782 1060 800 1100 830 1060 850 940 840 840 856 720 876 700 900 700 900Z" fill="var(--st-path)" opacity=".9" />
        <g className="st-grasses">
          <Blades x={0} y={820} w={1600} h={80} count={140} seed={43} size={44} stroke="var(--st-meadow-lit)" lean={1} width={2.4} />
          <Blades x={0} y={846} w={1600} h={54} count={90} seed={47} size={36} stroke="var(--st-forest)" lean={1} width={2.2} />
        </g>
        <Flowers x={60} y={810} w={460} h={80} count={14} seed={51} colors={["var(--st-paper)", "var(--st-sun)"]} />
        <g className="st-motes" fill="var(--st-sun)">{Array.from({ length: 14 }, (_, i) => <circle key={i} cx={260 + i * 83} cy={200 + ((i * 97) % 380)} r={2.4 + (i % 3)} opacity=".75" />)}</g>
      </g>
    </g>
  </SceneSvg>;
}
