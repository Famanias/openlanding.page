import { useId } from "react";
import { Blades, Cumulus, Farmhouse, Glow, PaintedTree, Ridge, SceneSvg, Sky, seeded } from "./Painted";

const f = (value: number) => Math.round(value * 10) / 10;

function Mist({ y, height, opacity = .7 }: { y: number; height: number; opacity?: number }) {
  const id = useId().replace(/:/g, "");
  return <g className="st-mist">
    <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop stopColor="var(--st-paper)" stopOpacity="0" /><stop offset=".5" stopColor="var(--st-paper)" stopOpacity={opacity} /><stop offset="1" stopColor="var(--st-paper)" stopOpacity="0" /></linearGradient></defs>
    <rect x="-80" y={y} width="1760" height={height} fill={`url(#${id})`} />
  </g>;
}

const BANDS = [[560, 46], [604, 58], [660, 68], [726, 80], [804, 100]] as const;

/* The landscape chapter: terraced paddies stepping down a hillside, morning mist between wooded ridges. */
export function TerraceScene() {
  const next = seeded(41);
  return <SceneSvg label="A painted hillside of terraced rice paddies, mirroring the morning sky, below misty wooded mountains and a small cluster of farmhouses.">
    <Sky stops={[[0, "var(--st-sky-top)"], [.5, "var(--st-sky-mid)"], [.64, "var(--st-sky-low)"]]} />
    <Glow x={960} y={330} r={460} />
    <g className="st-clouds">
      <Cumulus x={1180} y={410} scale={1.15} />
      <Cumulus x={330} y={430} scale={.9} flip />
    </g>
    <Ridge d="M0 470C100 410 180 340 280 366 360 280 450 260 520 336 600 306 680 384 760 424 880 336 980 306 1080 364 1180 336 1290 384 1380 432 1460 404 1540 414 1600 442V900H0Z" top="var(--st-mtn-far)" bottom="var(--st-mtn-haze)" />
    <Mist y={400} height={140} opacity={.6} />
    <Ridge d="M0 556C140 466 260 432 380 470 500 414 600 440 700 500 820 468 930 442 1040 480 1160 432 1290 470 1400 520 1480 500 1550 510 1600 530V900H0Z" top="var(--st-mtn-mid)" bottom="var(--st-mtn-haze)" />
    <g>{Array.from({ length: 16 }, (_, i) => <PaintedTree key={i} x={930 + i * 42} y={510 + Math.sin(i * .6) * 14 + i * 3} scale={.32 + (i % 3) * .04} kind="cedar" />)}</g>
    <Mist y={500} height={110} opacity={.55} />
    <Ridge d="M0 600C200 560 420 560 640 590 860 620 1040 560 1240 556 1400 554 1520 580 1600 590V900H0Z" top="var(--st-meadow-lit)" bottom="var(--st-leaf)" />
    {BANDS.map(([top, height], i) => {
      const wobble = () => (next() - .5) * 26;
      const y0 = top + wobble() * .3;
      const d = `M-40 ${f(y0)}C300 ${f(top + wobble())} 600 ${f(top + wobble())} 880 ${f(top + wobble() * .5)}S1400 ${f(top + wobble())} 1640 ${f(y0)}V${top + height + 40}H-40Z`;
      const water = i % 2 === 0;
      return <g key={top}>
        <path d={d} fill="var(--st-bank)" transform="translate(0 -6)" />
        <Ridge d={d} top={water ? "var(--st-sky-mid)" : "var(--st-meadow-lit)"} bottom={water ? "var(--st-water-deep)" : "var(--st-midgreen)"} />
        {water
          ? <g stroke="var(--st-paper)" strokeLinecap="round" strokeWidth="3" opacity=".65">{Array.from({ length: 9 }, (_, k) => { const sx = 90 + k * 175 + next() * 60; const sy = top + 14 + next() * (height * .55); return <path key={k} d={`M${f(sx)} ${f(sy)}h${f(40 + next() * 70)}`} />; })}</g>
          : <Blades x={0} y={top + 10} w={1600} h={height - 8} count={150} seed={i * 13 + 5} size={26} stroke="var(--st-leaf)" lean={1} width={2} />}
      </g>;
    })}
    <PaintedTree x={900} y={598} scale={.62} />
    <PaintedTree x={1290} y={584} scale={.5} />
    <Farmhouse x={780} y={632} scale={.5} glow />
    <Farmhouse x={670} y={644} scale={.36} roof="var(--st-roof-rose)" roofLit="var(--st-rose)" />
    <g className="st-smoke" stroke="var(--st-paper)" strokeWidth="8" strokeLinecap="round" opacity=".6"><path d="M812 549c-18-12 8-18-4-30s-8-18-4-24" /><path d="M822 534c10-13-10-15-5-26" strokeWidth="5" /></g>
    <path d="M0 880C300 834 640 846 920 884V900H0Z" fill="var(--st-hill)" />
    <path d="M1100 900C1160 850 1320 832 1460 846 1530 854 1580 874 1600 888V900Z" fill="var(--st-forest)" />
    <PaintedTree x={1500} y={900} scale={1.35} />
    <g className="st-grasses">
      <Blades x={0} y={852} w={1600} h={48} count={110} seed={23} size={44} stroke="var(--st-meadow-lit)" lean={1} width={2.4} />
      <Blades x={0} y={862} w={1600} h={40} count={80} seed={29} size={36} stroke="var(--st-forest)" lean={1} width={2.2} />
    </g>
  </SceneSvg>;
}
