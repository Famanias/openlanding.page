import type { CSSProperties, ReactNode } from "react";
import type { SceneId } from "../../content/reels";

/**
 * Ten small looping scenes drawn in SVG, one per tile of the clip sheet. They are what a card shows until a
 * real clip is dropped in (see reel-media.ts). Colour comes only from the .sa-f-* / .sa-s-* classes, and
 * every loop is a transform animation defined in satsuma.css (paused off-screen, off under reduced motion).
 */

type Delay = CSSProperties & { "--d"?: string };
const d = (s: number): Delay => ({ "--d": `${s}s` });

function Frame({ bg, children }: { bg: string; children: ReactNode }) {
  return (
    <svg className="sa-scene" viewBox="0 0 384 540" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <rect width="384" height="540" className={bg} />
      {children}
    </svg>
  );
}

const SCENES: Record<SceneId, () => ReactNode> = {
  sneaker: () => (
    <Frame bg="sa-f-apr">
      <ellipse cx="192" cy="396" rx="120" ry="14" className="sa-f-aub sa-o-3 sa-a sa-a-shadow" />
      <g className="sa-a sa-a-tilt">
        <path d="M64 346h272q0 20-18 20H80q-16 0-16-20z" className="sa-f-paper" />
        <path d="M78 346l18-92q8-18 28-12l56 24q20 8 40 0l42-18q38-8 60 52l8 46z" className="sa-f-sat" />
        <path d="M124 296l44 18M136 276l44 18M152 258l40 16" className="sa-s-paper" />
        <path d="M250 300q40 6 70 30" className="sa-s-aub" />
        <path d="M70 346h262" className="sa-s-aub sa-o-3" />
      </g>
      <circle cx="318" cy="128" r="30" className="sa-f-paper sa-o-6 sa-a sa-a-bob" style={d(0.6)} />
      <circle cx="74" cy="184" r="14" className="sa-f-sat sa-o-6 sa-a sa-a-bob" style={d(1.2)} />
    </Frame>
  ),

  skincare: () => (
    <Frame bg="sa-f-leaf-soft">
      <ellipse cx="192" cy="430" rx="92" ry="12" className="sa-f-leaf sa-o-3" />
      <rect x="146" y="196" width="92" height="232" rx="22" className="sa-f-aub" />
      <rect x="160" y="150" width="64" height="58" rx="12" className="sa-f-ink" />
      <rect x="162" y="276" width="60" height="86" rx="8" className="sa-f-paper" />
      <circle cx="192" cy="310" r="12" className="sa-f-sat" />
      <path d="M170 340h44" className="sa-s-aub" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={70 + i * 62} cy={150 + (i % 2) * 40} r={7 + (i % 3) * 3} className="sa-f-apr sa-a sa-a-splash" style={d(i * 0.35)} />
      ))}
      <ellipse cx="192" cy="440" rx="40" ry="6" className="sa-s-paper sa-a sa-a-ripple" />
    </Frame>
  ),

  "latte-pour": () => (
    <Frame bg="sa-f-apr">
      <ellipse cx="192" cy="420" rx="128" ry="24" className="sa-f-aub sa-o-3" />
      <path d="M92 292h200v52q0 70-100 70t-100-70z" className="sa-f-paper" />
      <ellipse cx="192" cy="292" rx="100" ry="26" className="sa-f-aub" />
      <ellipse cx="192" cy="292" rx="80" ry="19" className="sa-f-apr-soft" />
      <path d="M192 296c-26-22-8-34 0-20 8-14 26-2 0 20z" className="sa-f-aub sa-a sa-a-art" />
      <rect x="184" y="40" width="16" height="236" rx="8" className="sa-f-paper sa-a sa-a-pour" />
      <path d="M292 316q40 4 40 36t-40 36" className="sa-s-paper" />
    </Frame>
  ),

  headphones: () => (
    <Frame bg="sa-f-sat">
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="192" cy="300" r="92" className="sa-s-paper sa-a sa-a-ring" style={d(i * 0.9)} />
      ))}
      <path d="M92 320v-40a100 100 0 0 1 200 0v40" className="sa-s-ink sa-sw-20" />
      <rect x="64" y="290" width="56" height="112" rx="26" className="sa-f-ink" />
      <rect x="264" y="290" width="56" height="112" rx="26" className="sa-f-ink" />
      <rect x="76" y="306" width="22" height="80" rx="11" className="sa-f-aub" />
      <rect x="286" y="306" width="22" height="80" rx="11" className="sa-f-aub" />
    </Frame>
  ),

  "plant-shop": () => (
    <Frame bg="sa-f-apr-soft">
      <rect x="0" y="388" width="384" height="14" className="sa-f-aub" />
      {[
        { x: 78, pot: "sa-f-aub", h: 120, delay: 0 },
        { x: 192, pot: "sa-f-sat", h: 170, delay: 0.7 },
        { x: 306, pot: "sa-f-ink", h: 96, delay: 1.4 },
      ].map((p) => (
        <g key={p.x}>
          <g className="sa-a sa-a-sway" style={{ ...d(p.delay), transformOrigin: `${p.x}px 380px` }}>
            <ellipse cx={p.x - 20} cy={380 - p.h} rx="16" ry="44" transform={`rotate(-24 ${p.x - 20} ${380 - p.h})`} className="sa-f-leaf" />
            <ellipse cx={p.x + 20} cy={372 - p.h} rx="16" ry="48" transform={`rotate(22 ${p.x + 20} ${372 - p.h})`} className="sa-f-leaf" />
            <ellipse cx={p.x} cy={350 - p.h} rx="15" ry="52" className="sa-f-leaf" />
            <path d={`M${p.x} 380V${360 - p.h}`} className="sa-s-leaf" />
          </g>
          <path d={`M${p.x - 40} 380h80l-10 -64h-60z`} transform="translate(0 8)" className={p.pot} />
        </g>
      ))}
    </Frame>
  ),

  bouquet: () => (
    <Frame bg="sa-f-leaf-soft">
      <g className="sa-a sa-a-sway" style={{ transformOrigin: "192px 420px" }}>
        {[
          { x: 130, y: 170, c: "sa-f-sat", r: 30 },
          { x: 192, y: 130, c: "sa-f-apr", r: 34 },
          { x: 254, y: 176, c: "sa-f-aub", r: 28 },
          { x: 160, y: 232, c: "sa-f-paper", r: 26 },
          { x: 228, y: 238, c: "sa-f-sat", r: 24 },
        ].map((f, i) => (
          <g key={i}>
            <path d={`M${f.x} ${f.y}Q192 330 192 420`} className="sa-s-leaf" />
            <circle cx={f.x} cy={f.y} r={f.r} className={f.c} />
            <circle cx={f.x} cy={f.y} r={f.r / 3} className="sa-f-ink sa-o-3" />
          </g>
        ))}
      </g>
      <path d="M118 316L192 460 266 316z" className="sa-f-paper" />
      <path d="M118 316L192 460 150 316z" className="sa-f-apr" />
    </Frame>
  ),

  pottery: () => (
    <Frame bg="sa-f-apr">
      <ellipse cx="192" cy="440" rx="150" ry="30" className="sa-f-aub" />
      <ellipse cx="192" cy="426" rx="150" ry="30" className="sa-f-ink" />
      <path d="M142 420q-34-70 6-120 28-34 12-90h64q-16 56 12 90 40 50 6 120z" className="sa-f-sat" />
      {[260, 306, 352].map((y, i) => (
        <ellipse key={y} cx="192" cy={y} rx={58 - i * 3} ry="8" className="sa-s-paper sa-a sa-a-spin" style={d(i * 0.3)} />
      ))}
      <ellipse cx="192" cy="208" rx="32" ry="7" className="sa-f-aub" />
    </Frame>
  ),

  serum: () => (
    <Frame bg="sa-f-aub">
      <rect x="170" y="40" width="44" height="86" rx="14" className="sa-f-paper" />
      <path d="M180 126h24l-6 40h-12z" className="sa-f-apr" />
      <path d="M192 170c-16 24-18 40 0 40s16-16 0-40z" className="sa-f-sat sa-a sa-a-drop" />
      <ellipse cx="192" cy="388" rx="120" ry="16" className="sa-s-apr sa-a sa-a-ripple" />
      <ellipse cx="192" cy="388" rx="120" ry="16" className="sa-s-apr sa-a sa-a-ripple" style={d(0.5)} />
      <path d="M70 388q122 40 244 0v70q-122 40-244 0z" className="sa-f-ink sa-o-6" />
    </Frame>
  ),

  "latte-top": () => (
    <Frame bg="sa-f-paper">
      <circle cx="192" cy="270" r="168" className="sa-f-apr" />
      <circle cx="192" cy="270" r="124" className="sa-f-paper" />
      <circle cx="192" cy="270" r="104" className="sa-f-aub" />
      <g className="sa-a sa-a-swirl">
        <path d="M192 270c40-4 66 20 56 52-12 40-70 48-102 12-34-38-10-96 46-104 52-8 94 28 94 78" className="sa-s-apr sa-sw-14" />
        <path d="M192 270c-18 6-20 26-2 30" className="sa-s-paper sa-sw-8" />
      </g>
      <path d="M338 252h38v36h-38" className="sa-s-aub sa-sw-10" />
    </Frame>
  ),

  "headphone-stand": () => (
    <Frame bg="sa-f-aub">
      <circle cx="192" cy="250" r="140" className="sa-f-sat sa-o-3 sa-a sa-a-glow" />
      <ellipse cx="192" cy="458" rx="86" ry="16" className="sa-f-paper" />
      <rect x="184" y="150" width="16" height="310" rx="8" className="sa-f-paper" />
      <g className="sa-a sa-a-tilt sa-a-vb" style={{ transformOrigin: "192px 150px" }}>
        <path d="M110 300v-50a82 82 0 0 1 164 0v50" className="sa-s-apr sa-sw-18" />
        <rect x="90" y="270" width="44" height="92" rx="20" className="sa-f-apr" />
        <rect x="250" y="270" width="44" height="92" rx="20" className="sa-f-apr" />
        <rect x="100" y="284" width="16" height="64" rx="8" className="sa-f-sat" />
        <rect x="268" y="284" width="16" height="64" rx="8" className="sa-f-sat" />
      </g>
    </Frame>
  ),
};

export function Scene({ id }: { id: SceneId }) {
  return <>{SCENES[id]()}</>;
}
