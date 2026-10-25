import { Birds, Blades, Cumulus, Farmhouse, Flowers, Glow, PaintedTree, Ridge, SceneSvg, Sky, Stratus } from "./Painted";

/* Welcome: a high-summer meadow under towering clouds, with a great tree on the hill and a path home. */
export function MeadowScene() {
  return <SceneSvg label="A painted summer meadow under towering clouds, with a farmhouse, a winding path and a great tree on the hill.">
    <Sky stops={[[0, "var(--st-sky-top)"], [.55, "var(--st-sky-mid)"], [.7, "var(--st-sky-low)"]]} />
    <Glow x={1150} y={420} r={560} />
    <Stratus x={150} y={150} width={400} />
    <Stratus x={930} y={110} width={300} />
    <g className="st-clouds">
      <Cumulus x={760} y={540} scale={1.7} />
      <Cumulus x={1230} y={500} scale={1.25} />
      <Cumulus x={200} y={560} scale={1.05} flip />
      <Cumulus x={1520} y={580} scale={.85} />
    </g>
    <Birds x={1010} y={250} scale={1.1} />
    <Ridge d="M0 540C110 490 190 450 290 476 380 380 470 372 540 450 640 410 720 450 800 500 900 430 1010 392 1110 458 1200 410 1300 430 1380 500 1460 470 1540 478 1600 506V900H0Z" top="var(--st-mtn-far)" bottom="var(--st-mtn-haze)" />
    <Ridge d="M0 596C150 530 280 520 420 560 560 510 700 520 820 580 960 540 1100 520 1240 566 1380 540 1500 560 1600 590V900H0Z" top="var(--st-mtn-mid)" bottom="var(--st-mtn-haze)" />
    <Ridge d="M0 650C200 590 420 580 640 630 860 680 1000 590 1200 574 1400 560 1500 600 1600 618V900H0Z" top="var(--st-meadow-lit)" bottom="var(--st-leaf)" />
    <Ridge d="M640 760C820 660 1040 610 1260 618 1420 626 1530 668 1600 690V900H640Z" top="var(--st-meadow-lit)" bottom="var(--st-meadow)" />
    <PaintedTree x={1090} y={640} scale={1.5} />
    <PaintedTree x={1330} y={662} scale={.62} />
    <PaintedTree x={960} y={664} scale={.42} />
    <Ridge d="M0 760C150 696 340 688 540 726 700 756 820 790 930 810V900H0Z" top="var(--st-meadow-lit)" bottom="var(--st-meadow)" />
    <Farmhouse x={330} y={716} scale={.6} glow />
    <PaintedTree x={186} y={724} scale={.5} />
    <PaintedTree x={500} y={742} scale={.42} />
    <path d="M700 900C740 836 640 812 560 786 480 760 440 736 410 718L438 714C480 738 530 758 620 786 730 820 850 850 850 900Z" fill="var(--st-path)" opacity=".92" />
    <Ridge d="M0 836C260 780 640 800 960 840 1220 870 1440 830 1600 800V900H0Z" top="var(--st-meadow)" bottom="var(--st-hill)" />
    <g className="st-grasses">
      <Blades x={0} y={840} w={1600} h={60} count={120} seed={7} size={46} stroke="var(--st-meadow-lit)" lean={1} width={2.4} />
      <Blades x={0} y={850} w={1600} h={50} count={90} seed={19} size={38} stroke="var(--st-forest)" lean={1} width={2.2} />
      <Blades x={0} y={700} w={900} h={110} count={110} seed={3} size={20} stroke="var(--st-meadow-lit)" lean={1} width={1.6} />
      <Blades x={900} y={690} w={700} h={110} count={90} seed={11} size={18} stroke="var(--st-meadow-lit)" lean={1} width={1.6} />
    </g>
    <Flowers x={40} y={800} w={760} h={96} count={26} seed={5} colors={["var(--st-paper)", "var(--st-rose)", "var(--st-sun)"]} />
    <Flowers x={930} y={790} w={640} h={106} count={22} seed={9} colors={["var(--st-paper)", "var(--st-sun)", "var(--st-rose)"]} />
  </SceneSvg>;
}
