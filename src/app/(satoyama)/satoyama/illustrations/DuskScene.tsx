import { Blades, Cumulus, Firefly, Glow, PaintedTree, Ridge, SceneSvg, Sky, Stratus } from "./Painted";

/* Until next time: the sun going down behind the ridge, paddies holding the last light, lanterns coming on. */
export function DuskScene() {
  const r1 = "M0 590C130 540 240 500 340 530 430 450 520 446 590 520 700 470 760 520 800 580 900 500 1010 470 1110 534 1200 490 1300 510 1380 566 1460 540 1540 546 1600 570V900H0Z";
  const r2 = "M0 650C200 596 400 590 600 636 800 682 960 612 1160 604 1360 596 1500 626 1600 644V900H0Z";
  const r3 = "M0 860C300 830 700 846 1000 868 1260 886 1440 860 1600 842V900H0Z";

  return <SceneSvg className="st-scene-dusk" label="A painted dusk: the sun sinking behind layered ridges, rose-lit clouds, paddies holding the last gold light and paper lanterns glowing along the lane.">
    <g className="st-paint-wash">
      <g className="st-paint-layer" data-depth="sky">
        <Sky stops={[[0, "var(--st-sky-top)"], [.42, "var(--st-sky-mid)"], [.64, "var(--st-sky-low)"]]} />
        <Glow x={1110} y={520} r={620} opacity={.95} />
        <circle cx="1110" cy="516" r="70" fill="var(--st-sun)" opacity=".95" />
        <Stratus x={220} y={230} width={440} />
        <Stratus x={980} y={260} width={380} />
      </g>
      <g className="st-paint-layer" data-depth="far">
        <g className="st-clouds">
          <Cumulus x={330} y={520} scale={1.15} />
          <Cumulus x={1500} y={540} scale={1.2} flip />
        </g>
        <Ridge d={r1} top="var(--st-mtn-far)" bottom="var(--st-mtn-haze)" />
        <Ridge d={r2} top="var(--st-mtn-mid)" bottom="var(--st-meadow)" />
        <g>{Array.from({ length: 20 }, (_, i) => <PaintedTree key={i} x={30 + i * 82} y={668 + Math.sin(i * 1.7) * 8} scale={.28 + (i % 3) * .05} kind={i % 2 ? "cedar" : "round"} />)}</g>
      </g>
      <g className="st-paint-layer" data-depth="mid">
        {[[706, 40], [770, 56], [846, 66], [940, 78]].map(([top, height], i) => <g key={top}>
          <path d={`M-40 ${top}C300 ${top - 8} 800 ${top + 6} 1640 ${top - 4}V${top + height + 30}H-40Z`} fill="var(--st-bank)" transform="translate(0 -5)" />
          <Ridge d={`M-40 ${top}C300 ${top - 8} 800 ${top + 6} 1640 ${top - 4}V${top + height + 30}H-40Z`} top="var(--st-sun)" bottom="var(--st-water-deep)" opacity={1 - i * .05} />
        </g>)}
        <g stroke="var(--st-paper)" strokeLinecap="round" strokeWidth="3" opacity=".55"><path d="M760 724h90M700 760h210M650 806h300M610 860h380" /></g>
      </g>
      <g className="st-paint-layer" data-depth="near">
        <Ridge d={r3} top="var(--st-hill)" bottom="var(--st-forest)" />
        <path d="M1050 900C1120 840 1250 800 1380 796 1470 794 1540 806 1600 826V900Z" fill="var(--st-forest)" />
        <g stroke="var(--st-timber)" strokeWidth="5" strokeLinecap="round"><path d="M1230 806V690M1370 800V700M1230 704C1280 724 1330 724 1370 708" strokeWidth="2.5" /></g>
        {[1262, 1300, 1338].map((x, i) => <g key={x} className="st-lantern"><Glow x={x} y={724 + (i % 2) * 6} r={42} opacity={.75} /><ellipse cx={x} cy={724 + (i % 2) * 6} rx="9" ry="12" fill="var(--st-sun)" /></g>)}
        <PaintedTree x={1500} y={900} scale={1.9} dark="var(--st-tree-dark)" mid="var(--st-tree-mid)" lit="var(--st-tree-mid)" />
        <PaintedTree x={60} y={900} scale={2.3} dark="var(--st-tree-dark)" mid="var(--st-tree-mid)" lit="var(--st-tree-mid)" />
        <g className="st-grasses"><Blades x={0} y={858} w={1600} h={42} count={110} seed={101} size={40} stroke="var(--st-forest)" lean={1} width={2.2} /></g>
        {[[420, 780, 0], [520, 830, 2], [640, 760, 4], [1000, 800, 1], [1120, 770, 3], [300, 850, 5], [1180, 840, 6]].map(([x, y, delay]) => <Firefly key={x} x={x} y={y} delay={delay} />)}
        <circle cx="240" cy="110" r="2.4" fill="var(--st-paper)" opacity=".8" /><circle cx="1380" cy="150" r="2" fill="var(--st-paper)" opacity=".7" /><circle cx="560" cy="80" r="1.8" fill="var(--st-paper)" opacity=".6" />
      </g>
    </g>
  </SceneSvg>;
}
