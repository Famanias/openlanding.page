import { Birds, Blades, Cumulus, Farmhouse, Flowers, Glow, PaintedTree, Ridge, SceneSvg, Sky, Stratus, seeded } from "./Painted";

const f = (value: number) => Math.round(value * 10) / 10;

type Particle = "petal" | "leaf" | "snow";

/* Drifting particles: each copy fades in at the top and out at the bottom so the loop never visibly resets. */
function Drift({ kind, count, seed, className, fill }: { kind: Particle; count: number; seed: number; className: string; fill: string }) {
  const next = seeded(seed);
  return <g className={className} fill={fill}>{Array.from({ length: count }, (_, i) => {
    const x = f(next() * 1700 - 50);
    const y = f(next() * 760 - 60);
    const s = .6 + next() * .8;
    const a = Math.round(next() * 180);
    return kind === "snow"
      ? <circle key={i} cx={x} cy={y} r={f(2.2 + s * 2.4)} opacity=".9" />
      : kind === "petal"
        ? <ellipse key={i} cx={x} cy={y} rx={f(7 * s)} ry={f(4 * s)} transform={`rotate(${a} ${x} ${y})`} />
        : <path key={i} d="M0 0C8-10 22-8 30 0 22 8 8 10 0 0Z" transform={`translate(${x} ${y}) rotate(${a}) scale(${f(s)})`} />;
  })}</g>;
}

/* Spring: a flooded paddy, a canopy of cherry blossom and a lane edged with rapeseed. */
export function SpringScene() {
  return <SceneSvg className="st-scene-spring" label="A painted spring village: a cherry tree in full blossom, flooded paddies mirroring a pink-gold sky and yellow rapeseed along the lane.">
    <Sky stops={[[0, "var(--st-sky-top)"], [.5, "var(--st-sky-mid)"], [.68, "var(--st-sky-low)"]]} />
    <Glow x={980} y={430} r={540} />
    <Stratus x={160} y={150} width={360} />
    <g className="st-clouds"><Cumulus x={1020} y={470} scale={1.2} /><Cumulus x={360} y={500} scale={.85} flip /></g>
    <Birds x={780} y={250} />
    <Ridge d="M0 530C120 480 210 440 310 468 400 380 490 372 560 446 660 408 740 448 820 498 920 430 1030 396 1130 456 1220 410 1320 430 1400 496 1480 468 1550 476 1600 500V900H0Z" top="var(--st-mtn-far)" bottom="var(--st-mtn-haze)" />
    <Ridge d="M0 600C170 540 300 530 440 572 580 524 720 540 840 590 980 550 1120 530 1260 574 1400 548 1500 566 1600 596V900H0Z" top="var(--st-mtn-mid)" bottom="var(--st-meadow-lit)" />
    <Ridge d="M0 650C230 606 440 608 660 640 880 672 1040 620 1240 612 1420 606 1520 636 1600 650V900H0Z" top="var(--st-meadow-lit)" bottom="var(--st-leaf)" />
    <Ridge d="M0 720C260 690 520 700 780 724 1060 750 1320 720 1600 700V900H0Z" top="var(--st-sky-low)" bottom="var(--st-water-deep)" />
    <g stroke="var(--st-paper)" strokeWidth="3" strokeLinecap="round" opacity=".6"><path d="M120 748h120M420 760h80M690 744h130M1000 758h100M1320 738h120" /></g>
    <Farmhouse x={690} y={664} scale={.52} glow />
    <PaintedTree x={540} y={676} scale={.5} dark="var(--st-blossom-dark)" mid="var(--st-blossom-mid)" lit="var(--st-blossom-lit)" />
    <PaintedTree x={900} y={668} scale={.55} dark="var(--st-blossom-dark)" mid="var(--st-blossom-mid)" lit="var(--st-blossom-lit)" />
    <Ridge d="M0 800C300 770 700 780 1000 804 1260 824 1440 800 1600 780V900H0Z" top="var(--st-meadow-lit)" bottom="var(--st-meadow)" />
    <Flowers x={0} y={790} w={1600} h={110} count={90} seed={4} colors={["var(--st-sun)", "var(--st-sun)", "var(--st-paper)"]} radius={3.6} />
    <PaintedTree x={1290} y={870} scale={2.7} dark="var(--st-blossom-dark)" mid="var(--st-blossom-mid)" lit="var(--st-blossom-lit)" />
    <g className="st-grasses"><Blades x={0} y={860} w={1600} h={40} count={100} seed={14} size={38} stroke="var(--st-forest)" lean={1} width={2.2} /></g>
    <Drift kind="petal" count={26} seed={31} className="st-fall st-fall-a" fill="var(--st-blossom-lit)" />
    <Drift kind="petal" count={20} seed={32} className="st-fall st-fall-b" fill="var(--st-paper)" />
  </SceneSvg>;
}

/* Summer: rice rows rushing to a far horizon, great cumulus, and sunflowers at the lane. */
export function SummerScene() {
  const rows = Array.from({ length: 21 }, (_, i) => i - 10);
  return <SceneSvg className="st-scene-summer" label="A painted summer day: towering clouds over a wide green rice field, a farmhouse on the far bank and sunflowers in the foreground.">
    <Sky stops={[[0, "var(--st-sky-top)"], [.5, "var(--st-sky-mid)"], [.64, "var(--st-sky-low)"]]} />
    <Glow x={1320} y={200} r={380} opacity={.9} />
    <g className="st-clouds">
      <Cumulus x={700} y={560} scale={2.1} />
      <Cumulus x={1250} y={520} scale={1.5} flip />
      <Cumulus x={140} y={540} scale={1.2} />
    </g>
    <Ridge d="M0 590C200 540 380 530 560 560 760 594 960 520 1160 520 1360 520 1500 556 1600 580V900H0Z" top="var(--st-mtn-mid)" bottom="var(--st-meadow-lit)" />
    <g>{Array.from({ length: 22 }, (_, i) => <PaintedTree key={i} x={560 + i * 44} y={606 + Math.sin(i * .8) * 6} scale={.22 + (i % 4) * .03} />)}</g>
    <Farmhouse x={1180} y={622} scale={.4} glow />
    <Ridge d="M0 640H1600V900H0Z" top="var(--st-meadow-lit)" bottom="var(--st-meadow)" />
    <g stroke="var(--st-midgreen)" strokeLinecap="round" opacity=".55">{rows.map(i => <path key={i} d={`M${800 + i * 22} 642L${800 + i * 150} 900`} strokeWidth={f(3 + Math.abs(i) * .55)} />)}</g>
    <g className="st-grasses">
      <Blades x={0} y={650} w={1600} h={250} count={380} seed={71} size={26} stroke="var(--st-leaf)" lean={1} width={2} />
      <Blades x={0} y={800} w={1600} h={100} count={120} seed={73} size={52} stroke="var(--st-forest)" lean={1} width={2.6} />
    </g>
    <path d="M0 842C300 806 520 812 760 840 1100 880 1360 850 1600 826V900H0Z" fill="var(--st-hill)" />
    {[[150, 760, 1.2], [310, 800, 1.5], [1370, 770, 1.35], [1500, 810, 1.7]].map(([x, y, s]) => <g key={x} transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 140V0" stroke="var(--st-midgreen)" strokeWidth="6" strokeLinecap="round" /><path d="M0 100c-30-4-44-26-48-36 22 0 40 12 48 36Z" fill="var(--st-midgreen)" />
      <g fill="var(--st-sun)">{Array.from({ length: 12 }, (_, k) => <ellipse key={k} cx="0" cy="-30" rx="9" ry="24" transform={`rotate(${k * 30})`} />)}</g>
      <circle r="17" fill="var(--st-timber)" />
    </g>)}
    <Birds x={520} y={300} scale={1.2} />
  </SceneSvg>;
}

/* Autumn: gold paddies, rice drying on wooden racks, a maple on fire and mackerel-sky clouds. */
export function AutumnScene() {
  return <SceneSvg className="st-scene-autumn" label="A painted autumn harvest: golden paddies with rice drying on wooden racks, copper mountains, a maple in red and a mackerel sky.">
    <Sky stops={[[0, "var(--st-sky-top)"], [.52, "var(--st-sky-mid)"], [.7, "var(--st-sky-low)"]]} />
    <Glow x={1120} y={500} r={560} />
    <g className="st-clouds">{[[220, 190], [440, 160], [680, 210], [940, 170], [1180, 220], [330, 300], [610, 330], [880, 310], [1130, 350], [1380, 280]].map(([x, y], i) => <Cumulus key={i} x={x} y={y} scale={.34 + (i % 3) * .06} />)}</g>
    <Ridge d="M0 560C140 500 260 470 380 506 480 440 580 436 660 500 780 456 880 460 980 520 1100 470 1240 486 1340 540 1440 510 1530 520 1600 548V900H0Z" top="var(--st-mtn-far)" bottom="var(--st-mtn-haze)" />
    <Ridge d="M0 620C220 566 400 560 600 604 820 650 980 580 1180 574 1380 568 1500 596 1600 614V900H0Z" top="var(--st-mtn-mid)" bottom="var(--st-meadow-lit)" />
    <g>{Array.from({ length: 14 }, (_, i) => <PaintedTree key={i} x={140 + i * 108} y={640 + Math.sin(i) * 8} scale={.3 + (i % 3) * .05} dark="var(--st-maple-dark)" mid="var(--st-maple-mid)" lit="var(--st-maple-lit)" />)}</g>
    <Farmhouse x={1050} y={670} scale={.5} glow />
    <Ridge d="M0 690C300 664 560 676 820 700 1120 728 1380 696 1600 676V900H0Z" top="var(--st-meadow-lit)" bottom="var(--st-meadow)" />
    <g stroke="var(--st-sun)" strokeWidth="3" opacity=".5" strokeLinecap="round"><Blades x={0} y={700} w={1600} h={200} count={300} seed={91} size={24} stroke="var(--st-sun)" lean={1} width={2} /></g>
    {[[260, 770, 1], [520, 790, 1.1], [820, 800, 1.2]].map(([x, y, s]) => <g key={x} transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-86 0V-120M86 0V-120M-86-112H86M-86-82H86M-86-52H86" stroke="var(--st-timber)" strokeWidth="6" strokeLinecap="round" />
      <g fill="var(--st-sun)" stroke="var(--st-timber)" strokeWidth="2">{[-72, -50, -28, -6, 16, 38, 60].map(sx => <path key={sx} d={`M${sx} -112l-12 24h24ZM${sx} -82l-12 24h24Z`} />)}</g>
    </g>)}
    <Ridge d="M0 850C300 820 700 836 1000 858 1260 876 1440 850 1600 832V900H0Z" top="var(--st-hill)" bottom="var(--st-forest)" />
    <PaintedTree x={1360} y={880} scale={2.3} dark="var(--st-maple-dark)" mid="var(--st-maple-mid)" lit="var(--st-maple-lit)" />
    <g className="st-grasses"><Blades x={0} y={866} w={1600} h={34} count={90} seed={95} size={36} stroke="var(--st-forest)" lean={1} width={2.2} /></g>
    <Drift kind="leaf" count={22} seed={61} className="st-fall st-fall-a" fill="var(--st-maple-lit)" />
    <Drift kind="leaf" count={16} seed={62} className="st-fall st-fall-b" fill="var(--st-maple-mid)" />
  </SceneSvg>;
}

/* Winter: a hushed snowfield, bare branches, a warm lit window and smoke from the chimney. */
export function WinterScene() {
  return <SceneSvg className="st-scene-winter" label="A painted winter village: snow on the farmhouse roof, a warm glowing window, bare trees and snowy cedars under a pale lilac sky.">
    <Sky stops={[[0, "var(--st-sky-top)"], [.5, "var(--st-sky-mid)"], [.7, "var(--st-sky-low)"]]} />
    <Stratus x={200} y={140} width={420} />
    <Stratus x={980} y={190} width={340} />
    <g className="st-clouds"><Cumulus x={1120} y={470} scale={1.1} /><Cumulus x={330} y={500} scale={.9} flip /></g>
    <Ridge d="M0 540C150 470 250 420 360 456 450 366 560 360 640 450 760 400 860 440 960 500 1080 430 1200 400 1300 470 1400 440 1520 460 1600 500V900H0Z" top="var(--st-snow)" bottom="var(--st-mtn-haze)" />
    <g>{Array.from({ length: 18 }, (_, i) => <PaintedTree key={i} x={60 + i * 90} y={560 + Math.sin(i * 1.3) * 12} scale={.3 + (i % 3) * .05} kind="cedar" dark="var(--st-tree-dark)" mid="var(--st-tree-mid)" snow />)}</g>
    <Ridge d="M0 620C220 580 460 590 700 620 940 650 1160 590 1400 586 1500 584 1560 596 1600 606V900H0Z" top="var(--st-snow)" bottom="var(--st-snow-shade)" />
    <Farmhouse x={900} y={700} scale={.72} glow roof="var(--st-snow)" roofLit="var(--st-snow-shade)" />
    <g className="st-smoke" stroke="var(--st-paper)" strokeWidth="9" strokeLinecap="round" opacity=".75"><path d="M970 548c-20-14 10-20-4-34s-9-21-4-27" /><path d="M980 530c12-15-12-17-6-30" strokeWidth="5" /></g>
    <Glow x={900} y={690} r={190} opacity={.4} />
    <PaintedTree x={640} y={730} scale={1.1} kind="bare" snow />
    <PaintedTree x={1280} y={740} scale={.9} kind="bare" snow />
    <Ridge d="M0 760C300 720 640 740 940 770 1240 800 1440 760 1600 730V900H0Z" top="var(--st-snow)" bottom="var(--st-snow-shade)" />
    <path d="M0 850C260 810 560 826 840 856 1120 886 1360 860 1600 836V900H0Z" fill="var(--st-snow)" />
    <path d="M0 850C260 810 560 826 840 856" stroke="var(--st-snow-shade)" strokeWidth="4" opacity=".6" />
    <PaintedTree x={150} y={880} scale={2.1} kind="cedar" dark="var(--st-tree-dark)" mid="var(--st-tree-mid)" />
    <Drift kind="snow" count={46} seed={81} className="st-fall st-fall-a" fill="var(--st-paper)" />
    <Drift kind="snow" count={34} seed={82} className="st-fall st-fall-b" fill="var(--st-paper)" />
  </SceneSvg>;
}
