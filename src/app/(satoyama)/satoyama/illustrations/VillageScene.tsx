import { Birds, Blades, Cumulus, CumulusOutline, Farmhouse, FarmhouseSketch, Flowers, Glow, PaintedTree, Ridge, RidgeSketch, SceneSvg, SketchPath, Sky, Stratus, TreeSketch } from "./Painted";

/* A slower rhythm: a warm afternoon along the village canal, laundry out, tea on the veranda. */
export function VillageScene() {
  const r1 = "M0 470C160 400 300 380 440 430 580 380 700 420 820 470 960 410 1100 400 1240 450 1380 420 1500 440 1600 470V900H0Z";
  const r2 = "M0 540C180 480 380 470 560 520 760 570 900 500 1100 494 1300 490 1480 520 1600 540V900H0Z";
  const r3 = "M0 880C300 850 700 862 1000 884V900H0Z";

  return <SceneSvg label="A painted afternoon in a village: tiled farmhouses beside a stone canal, laundry on a line, a persimmon tree and a vegetable garden.">
    <g className="st-sketch-lines" aria-hidden="true">
      <CumulusOutline x={420} y={420} scale={1.1} depth="far" />
      <CumulusOutline x={1330} y={400} scale={1.3} flip depth="far" />
      <RidgeSketch d={r1} depth="far" />
      <RidgeSketch d={r2} depth="mid" />
      <FarmhouseSketch x={520} y={640} scale={.55} depth="mid" />
      <FarmhouseSketch x={1470} y={652} scale={.46} depth="mid" />
      <FarmhouseSketch x={380} y={652} scale={.4} depth="mid" />
      <SketchPath d="M0 700C260 676 520 690 800 706 1100 724 1360 706 1600 690" depth="mid" />
      <SketchPath d="M0 784C300 754 700 774 1000 794 1250 810 1450 794 1600 778" depth="near" strokeWidth={2.4} />
      <SketchPath d="M380 790c40-60 120-60 160-6" depth="near" strokeWidth={2.6} />
      <SketchPath d="M610 700V610M760 706V614M610 620C660 646 710 646 760 622" depth="near" />
      <TreeSketch x={1530} y={730} scale={1.2} depth="near" />
      <RidgeSketch d={r3} depth="near" />
    </g>
    <g className="st-paint-wash">
      <g className="st-paint-layer" data-depth="sky">
        <Sky stops={[[0, "var(--st-sky-top)"], [.45, "var(--st-sky-mid)"], [.62, "var(--st-sky-warm)"]]} />
        <Glow x={1240} y={380} r={520} opacity={.9} />
        <Stratus x={200} y={120} width={340} />
      </g>
      <g className="st-paint-layer" data-depth="far">
        <Birds x={880} y={230} scale={1.05} />
        <g className="st-clouds">
          <Cumulus x={420} y={420} scale={1.1} />
          <Cumulus x={1330} y={400} scale={1.3} flip />
        </g>
        <Ridge d={r1} top="var(--st-mtn-far)" bottom="var(--st-mtn-haze)" />
      </g>
      <g className="st-paint-layer" data-depth="mid">
        <Ridge d={r2} top="var(--st-meadow-lit)" bottom="var(--st-leaf)" />
        <g>{[0, 1, 2, 3, 4, 5].map(i => <PaintedTree key={i} x={110 + i * 270} y={560 + (i % 2) * 14} scale={.38 + (i % 3) * .06} kind={i % 2 ? "cedar" : "round"} />)}</g>
        <Farmhouse x={520} y={640} scale={.55} glow />
        <Farmhouse x={1470} y={652} scale={.46} roof="var(--st-roof-rose)" roofLit="var(--st-rose)" />
        <Farmhouse x={380} y={652} scale={.4} />
        <g className="st-smoke" stroke="var(--st-paper)" strokeWidth="8" strokeLinecap="round" opacity=".62"><path d="M560 534c-16-12 8-17-3-29s-8-17-4-23" /><path d="M570 519c9-12-9-14-5-24" strokeWidth="5" /></g>
        <path d="M0 700C260 676 520 690 800 706 1100 724 1360 706 1600 690V900H0Z" fill="var(--st-path)" />
        <path d="M0 790C300 760 700 780 1000 800 1250 816 1450 800 1600 784V900H0Z" fill="var(--st-water-canal)" />
        <path d="M0 784C300 754 700 774 1000 794 1250 810 1450 794 1600 778" stroke="var(--st-stone)" strokeWidth="12" />
        <g stroke="var(--st-paper)" strokeLinecap="round" strokeWidth="3" opacity=".6"><path d="M120 830h110M340 846h70M560 826h140M850 850h90M1060 836h120M1290 846h80M1450 826h60" /></g>
        <g stroke="var(--st-sun)" strokeLinecap="round" strokeWidth="4" opacity=".55"><path d="M1150 824h60M1210 842h40M980 834h50" /></g>
        <path d="M380 790c40-60 120-60 160-6" stroke="var(--st-stone)" strokeWidth="14" strokeLinecap="round" />
        <g stroke="var(--st-timber)" strokeLinecap="round"><path d="M610 700V610M760 706V614" strokeWidth="6" /><path d="M610 620C660 646 710 646 760 622" strokeWidth="2" /></g>
        <g>{[626, 650, 674, 698, 722, 738].map((x, i) => <path key={x} d={`M${x} ${620 + Math.sin(i + 1) * 4}l${i % 2 ? 24 : 20} 0 ${i % 2 ? 2 : -2} ${i % 3 ? 48 : 38}h${i % 2 ? -24 : -20}Z`} fill={["var(--st-paper)", "var(--st-rose)", "var(--st-blue)", "var(--st-paper)", "var(--st-sun)", "var(--st-rose)"][i]} />)}</g>
        <g>
          <path d="M-30 730H220V880H-30Z" fill="var(--st-field)" />
          <path d="M-20 750H210M-20 784H210M-20 818H210M-20 852H210" stroke="var(--st-bank)" strokeWidth="5" strokeLinecap="round" />
          <Blades x={-10} y={752} w={220} h={110} count={70} seed={15} size={22} stroke="var(--st-midgreen)" lean={0} width={2.4} />
        </g>
      </g>
      <g className="st-paint-layer" data-depth="near">
        <PaintedTree x={1530} y={730} scale={1.2} dark="var(--st-persimmon-dark)" mid="var(--st-persimmon)" lit="var(--st-persimmon-lit)" />
        <g fill="var(--st-persimmon-fruit)">{[[1450, 612], [1490, 586], [1540, 618], [1420, 640], [1520, 650], [1570, 596]].map(([cx, cy]) => <circle key={cx} cx={cx} cy={cy} r="6.5" />)}</g>
        <Ridge d={r3} top="var(--st-hill)" bottom="var(--st-forest)" />
        <g className="st-grasses">
          <Blades x={0} y={872} w={1600} h={28} count={100} seed={31} size={34} stroke="var(--st-meadow-lit)" lean={1} width={2.2} />
          <Blades x={0} y={880} w={1600} h={20} count={70} seed={37} size={28} stroke="var(--st-forest)" lean={1} width={2} />
        </g>
        <Flowers x={240} y={740} w={380} h={150} count={14} seed={2} colors={["var(--st-paper)", "var(--st-rose)"]} radius={3.4} />
      </g>
    </g>
  </SceneSvg>;
}
