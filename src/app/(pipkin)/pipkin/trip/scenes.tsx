import type { ReactNode } from "react";
import { JarArt } from "../brand/Jar";

/**
 * The five stops of the trip, each drawn in a 1200x700 box with the ground line at y=548 and the
 * travelling jar at x=600. Props sit around that focal point so the same art works when the stage crops
 * to a phone. Parallax layers (pk-px1..3), --f (focus) and ambient loops are driven from pipkin.css.
 */

const SPARKLE = "M20 3 C22 14 26 18 37 20 C26 22 22 26 20 37 C18 26 14 22 3 20 C14 18 18 14 20 3 Z";
const HEART = "M20 33 C6 24 3 16 3 11 C3 6 7 3 11 3 C15 3 18 5 20 9 C22 5 25 3 29 3 C33 3 37 6 37 11 C37 16 34 24 20 33 Z";

function Spark({ x, y, k = 1, fill = "var(--color-butter)", delay = 0 }: { x: number; y: number; k?: number; fill?: string; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <path className="pk-twinkle" style={{ animationDelay: `${delay}s` }} d={SPARKLE} fill={fill} stroke="var(--color-plum)" strokeWidth={2.2} strokeLinejoin="round" />
    </g>
  );
}

function Love({ x, y, k = 1, fill = "var(--color-bubblegum)", delay = 0 }: { x: number; y: number; k?: number; fill?: string; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <path className="pk-float" style={{ animationDelay: `${delay}s` }} d={HEART} fill={fill} stroke="var(--color-plum)" strokeWidth={2.2} strokeLinejoin="round" />
    </g>
  );
}

function Cloudlet({ x, y, k = 1, delay = 0 }: { x: number; y: number; k?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <path className="pk-drift" style={{ animationDelay: `${delay}s` }} d="M22 50 C8 50 4 36 14 31 C12 18 28 12 36 22 C40 8 66 6 72 22 C84 14 102 22 98 36 C112 36 114 50 100 50 Z" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth={2.4} strokeLinejoin="round" />
    </g>
  );
}

function Backdrop({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg className="pk-scene-art" viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" role="img" aria-label={label} focusable="false">
      <rect className="pk-bg" width="1200" height="700" />
      <rect className="pk-floor" y="548" width="1200" height="152" />
      <line x1="0" x2="1200" y1="548" y2="548" stroke="var(--color-plum)" strokeWidth="3.5" />
      {children}
    </svg>
  );
}

/* 1 · the order pings the kitchen phone */
export function SceneOrder() {
  return (
    <Backdrop label="A phone on the kitchen counter shows a new order notification, with a receipt beside it.">
      <g className="pk-px3">
        <Spark x={120} y={130} k={1.5} delay={0.2} />
        <Love x={1010} y={150} k={1.3} delay={0.8} />
        <Spark x={1070} y={330} k={0.9} fill="var(--color-blush)" delay={1.1} />
        <Cloudlet x={170} y={300} k={1.1} />
        <Cloudlet x={900} y={90} k={0.9} delay={2} />
      </g>
      <g className="pk-px1">
        <g transform="translate(250 252)">
          <rect width="196" height="296" rx="48" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="4" />
          <rect x="14" y="46" width="168" height="222" rx="30" fill="var(--color-blush)" stroke="var(--color-plum)" strokeWidth="2.5" />
          <rect x="76" y="16" width="44" height="10" rx="5" fill="var(--color-plum)" />
          <g className="pk-notif">
            <rect x="22" y="62" width="152" height="66" rx="22" fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="3" />
            <circle cx="48" cy="95" r="13" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="2.4" />
            <path d="M48 87 v9 M48 101 v.5" stroke="var(--color-plum)" strokeWidth="3" strokeLinecap="round" />
            <text x="70" y="90" className="pk-svg-text pk-svg-strong">New order!</text>
            <text x="68" y="108" className="pk-svg-text pk-svg-small">&#35;0412 · 3 jars</text>
          </g>
          <rect x="22" y="142" width="152" height="44" rx="22" fill="var(--color-cream)" opacity=".75" stroke="var(--color-plum)" strokeWidth="2" />
          <rect x="22" y="198" width="152" height="44" rx="22" fill="var(--color-cream)" opacity=".5" stroke="var(--color-plum)" strokeWidth="2" />
        </g>
        <g transform="translate(348 214)">
          <circle className="pk-ring" r="30" fill="none" stroke="var(--color-plum)" strokeWidth="3" />
          <circle className="pk-ring pk-ring-2" r="30" fill="none" stroke="var(--color-plum)" strokeWidth="3" />
          <g className="pk-wobble">
            <path d="M-24 22 C-24 -4 -16 -28 0 -28 C16 -28 24 -4 24 22 Z" fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="3.4" strokeLinejoin="round" />
            <rect x="-30" y="20" width="60" height="9" rx="4.5" fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="3" />
            <circle cx="0" cy="38" r="6" fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="2.6" />
          </g>
        </g>
      </g>
      <g className="pk-px2">
        <g transform="translate(790 232)"><g className="pk-sway">
          <rect width="196" height="316" rx="38" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="4" />
          <rect x="62" y="-14" width="72" height="26" rx="13" fill="var(--color-lilac)" stroke="var(--color-plum)" strokeWidth="3.2" />
          <text x="98" y="52" textAnchor="middle" className="pk-svg-text pk-svg-strong">TICKET &#35;0412</text>
          <rect x="28" y="76" width="140" height="12" rx="6" fill="var(--color-blush)" />
          <rect x="28" y="102" width="104" height="12" rx="6" fill="var(--color-blush)" />
          <rect x="28" y="128" width="124" height="12" rx="6" fill="var(--color-blush)" />
          <line x1="28" x2="168" y1="168" y2="168" stroke="var(--color-plum)" strokeWidth="2.4" strokeDasharray="2 9" strokeLinecap="round" />
          <text x="28" y="204" className="pk-svg-text">3 jars · box of 3</text>
          <text x="28" y="228" className="pk-svg-text">Cook day: Tuesday</text>
          <g transform="translate(70 246) scale(1.3)"><path d={HEART} fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="2" strokeLinejoin="round" /></g>
        </g></g>
      </g>
    </Backdrop>
  );
}

/* 2 · the big pot goes on and the jar is filled */
export function SceneCook() {
  return (
    <Backdrop label="A pastel stockpot of bubbling jam, a ladle pouring into a jar, and a shelf of finished jars.">
      <g className="pk-px3">
        <rect x="770" y="236" width="300" height="20" rx="10" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="3.4" />
        <g transform="translate(790 156) scale(.62)"><JarArt tone="bubblegum" label="01" /></g>
        <g transform="translate(870 156) scale(.62)"><JarArt tone="lilac" label="05" /></g>
        <g transform="translate(950 156) scale(.62)"><JarArt tone="mint" label="03" /></g>
        <Spark x={160} y={140} k={1.3} fill="var(--color-cream)" delay={0.4} />
        <Spark x={1090} y={400} k={0.8} fill="var(--color-blush)" delay={1} />
      </g>
      <g className="pk-px1">
        <g className="pk-steam">
          <path d="M290 300 C270 270 310 250 290 214 C280 196 296 180 296 180" fill="none" stroke="var(--color-cream)" strokeWidth="12" strokeLinecap="round" />
          <path d="M350 296 C330 262 372 244 352 206" fill="none" stroke="var(--color-cream)" strokeWidth="10" strokeLinecap="round" style={{ animationDelay: "0.9s" }} />
          <path d="M410 300 C396 270 428 252 414 224" fill="none" stroke="var(--color-cream)" strokeWidth="9" strokeLinecap="round" style={{ animationDelay: "1.6s" }} />
        </g>
        <g transform="translate(200 312)">
          <rect x="-26" y="52" width="40" height="22" rx="11" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="3.4" />
          <rect x="262" y="52" width="40" height="22" rx="11" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="3.4" />
          <rect x="0" y="18" width="276" height="218" rx="58" fill="var(--color-lilac)" stroke="var(--color-plum)" strokeWidth="4" />
          <rect x="-12" y="0" width="300" height="42" rx="21" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="4" />
          <rect x="18" y="8" width="240" height="22" rx="11" fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="3" />
          <circle className="pk-bubble" cx="70" cy="14" r="9" fill="var(--color-blush)" stroke="var(--color-plum)" strokeWidth="2.4" />
          <circle className="pk-bubble pk-bubble-2" cx="150" cy="12" r="12" fill="var(--color-blush)" stroke="var(--color-plum)" strokeWidth="2.4" />
          <circle className="pk-bubble pk-bubble-3" cx="214" cy="16" r="8" fill="var(--color-blush)" stroke="var(--color-plum)" strokeWidth="2.4" />
          <rect x="48" y="104" width="180" height="58" rx="29" fill="var(--color-cream)" opacity=".7" />
          <text x="138" y="141" textAnchor="middle" className="pk-svg-text pk-svg-strong">BATCH 17</text>
          <g className="pk-stir" style={{ transformOrigin: "138px 20px" }}>
            <rect x="124" y="-92" width="22" height="124" rx="11" fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="3.4" />
            <ellipse cx="135" cy="-100" rx="22" ry="30" fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="3.4" />
          </g>
        </g>
      </g>
      <g className="pk-px2">
        <rect className="pk-stream" x="606" y="372" width="12" height="52" rx="6" fill="var(--color-bubblegum)" />
        <g className="pk-ladle">
          <line x1="656" y1="326" x2="800" y2="196" stroke="var(--color-plum)" strokeWidth="26" strokeLinecap="round" />
          <line x1="656" y1="326" x2="800" y2="196" stroke="var(--color-butter)" strokeWidth="17" strokeLinecap="round" />
          <path d="M556 318 C556 352 580 376 612 376 C644 376 668 352 668 318 Z" fill="var(--color-lilac)" stroke="var(--color-plum)" strokeWidth="3.6" strokeLinejoin="round" />
          <ellipse cx="612" cy="318" rx="56" ry="9" fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="3" />
        </g>
      </g>
    </Backdrop>
  );
}

/* 3 · lids on, labels written, tissue in */
export function ScenePack() {
  return (
    <Backdrop label="A packing table with tape, tissue paper, stickers, a pencil and flat boxes waiting to be built.">
      <g className="pk-px3">
        <Spark x={96} y={300} k={1.2} delay={0.3} />
        <Love x={1040} y={210} k={1.1} fill="var(--color-blush)" delay={1.2} />
        <g transform="translate(240 76)"><g className="pk-sway">
          <line x1="0" y1="0" x2="0" y2="88" stroke="var(--color-plum)" strokeWidth="3" strokeDasharray="2 7" strokeLinecap="round" />
          <rect x="-82" y="88" width="164" height="54" rx="27" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="3.6" />
          <text x="0" y="122" textAnchor="middle" className="pk-svg-text pk-svg-strong">Handle with jam</text>
        </g></g>
      </g>
      <g className="pk-px1">
        <g transform="translate(250 466)">
          <rect x="0" y="0" width="150" height="34" rx="17" fill="var(--color-blush)" stroke="var(--color-plum)" strokeWidth="3.4" />
          <rect x="14" y="-26" width="138" height="34" rx="17" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="3.4" />
          <rect x="-4" y="-52" width="132" height="34" rx="17" fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="3.4" />
        </g>
        <g transform="translate(380 528)">
          <circle r="42" fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="3.8" transform="translate(0 -22)" />
          <circle r="17" fill="var(--color-mint)" stroke="var(--color-plum)" strokeWidth="3.2" transform="translate(0 -22)" />
          <rect x="-12" y="-4" width="94" height="22" rx="11" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="3" />
        </g>
      </g>
      <g className="pk-px2">
        <g transform="translate(820 410)">
          <rect x="0" y="62" width="196" height="76" rx="30" fill="var(--color-lilac)" stroke="var(--color-plum)" strokeWidth="3.8" />
          <rect x="-8" y="0" width="212" height="70" rx="30" fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="3.8" />
        </g>
        <g transform="translate(920 330)"><g className="pk-write">
          <rect x="-8" y="-80" width="22" height="130" rx="11" fill="var(--color-sky)" stroke="var(--color-plum)" strokeWidth="3.4" transform="rotate(34 3 -15)" />
        </g></g>
        <g transform="translate(1000 262)">
          <rect width="120" height="54" rx="27" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="3" />
          <g transform="translate(24 10) scale(.72)"><path d={HEART} fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="2.4" strokeLinejoin="round" /></g>
          <g transform="translate(66 10) scale(.72)"><path d={SPARKLE} fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="2.4" strokeLinejoin="round" /></g>
        </g>
      </g>
    </Backdrop>
  );
}

/* 4 · the courier picks up and the road scrolls by */
export function SceneRoad() {
  return (
    <Backdrop label="A cheerful delivery truck with a flat bed drives along a pastel road past little houses and trees.">
      <g className="pk-px3">
        <Cloudlet x={140} y={110} k={1.3} />
        <Cloudlet x={820} y={70} k={1} delay={3} />
        <Cloudlet x={1040} y={210} k={0.8} delay={5} />
      </g>
      <g className="pk-px2">
        {[
          { x: 90, c: "var(--color-sky)", h: 120 },
          { x: 250, c: "var(--color-butter)", h: 150 },
          { x: 930, c: "var(--color-blush)", h: 130 },
          { x: 1080, c: "var(--color-mint)", h: 160 },
        ].map((b) => (
          <g key={b.x} transform={`translate(${b.x} ${548 - b.h})`}>
            <rect width="120" height={b.h} rx="40" fill={b.c} stroke="var(--color-plum)" strokeWidth="3.4" />
            <rect x="40" y={b.h - 74} width="40" height="74" rx="20" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="2.8" />
          </g>
        ))}
        <g transform="translate(160 390)"><rect x="-6" y="40" width="12" height="118" rx="6" fill="var(--color-plum)" /><circle r="46" cy="30" fill="var(--color-mint)" stroke="var(--color-plum)" strokeWidth="3.4" /></g>
      </g>
      <g className="pk-road">
        {Array.from({ length: 24 }, (_, i) => (
          <rect key={i} x={i * 160 - 1100} y="628" width="84" height="12" rx="6" fill="var(--color-cream)" />
        ))}
      </g>
      <g className="pk-px1">
        <g className="pk-van">
          <rect x="460" y="500" width="320" height="30" rx="15" fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="4" />
          <path d="M770 530 L770 408 C770 380 788 366 812 366 L856 366 C886 366 908 392 920 428 L940 480 C946 498 950 506 950 520 L950 536 C950 546 944 552 934 552 L780 552 C774 552 770 546 770 538 Z" fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="4" strokeLinejoin="round" />
          <path d="M796 388 L850 388 C868 388 880 402 890 428 L796 428 Z" fill="var(--color-sky)" stroke="var(--color-plum)" strokeWidth="3.2" strokeLinejoin="round" />
          <rect x="454" y="496" width="12" height="40" rx="6" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="3" />
          <g className="pk-wheel" style={{ transformOrigin: "540px 548px" }}>
            <circle cx="540" cy="548" r="46" fill="var(--color-plum)" />
            <circle cx="540" cy="548" r="20" fill="var(--color-butter)" stroke="var(--color-cream)" strokeWidth="3" />
            <path d="M540 528 v40 M520 548 h40" stroke="var(--color-plum)" strokeWidth="4" strokeLinecap="round" />
          </g>
          <g className="pk-wheel" style={{ transformOrigin: "850px 548px" }}>
            <circle cx="850" cy="548" r="46" fill="var(--color-plum)" />
            <circle cx="850" cy="548" r="20" fill="var(--color-butter)" stroke="var(--color-cream)" strokeWidth="3" />
            <path d="M850 528 v40 M830 548 h40" stroke="var(--color-plum)" strokeWidth="4" strokeLinecap="round" />
          </g>
          <text x="618" y="526" textAnchor="middle" className="pk-svg-text pk-svg-strong">PIPKIN</text>
        </g>
      </g>
    </Backdrop>
  );
}

/* 5 · the doorstep */
export function SceneDoor() {
  return (
    <Backdrop label="A front door with a welcome mat, a potted plant and a window, and confetti where the box has just arrived.">
      <g className="pk-px3">
        <rect x="150" y="70" width="900" height="478" rx="80" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="4" />
      </g>
      <g className="pk-px2">
        <g transform="translate(414 150)">
          <rect width="372" height="398" rx="186" fill="var(--color-mint)" stroke="var(--color-plum)" strokeWidth="4.4" />
          <rect x="44" y="60" width="284" height="338" rx="142" fill="none" stroke="var(--color-plum)" strokeWidth="3" opacity=".6" />
          <circle cx="302" cy="250" r="16" fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="3.4" />
        </g>
        <g transform="translate(822 150)">
          <rect width="86" height="40" rx="20" fill="var(--color-cream)" stroke="var(--color-plum)" strokeWidth="3.2" />
          <text x="43" y="26" textAnchor="middle" className="pk-svg-text pk-svg-strong">No. 12</text>
        </g>
        <g transform="translate(206 220)">
          <rect width="150" height="170" rx="75" fill="var(--color-sky)" stroke="var(--color-plum)" strokeWidth="3.8" />
          <path d="M75 12 v146 M12 85 h126" stroke="var(--color-plum)" strokeWidth="3" />
        </g>
        <g transform="translate(844 220)">
          <rect width="150" height="170" rx="75" fill="var(--color-sky)" stroke="var(--color-plum)" strokeWidth="3.8" />
          <path d="M75 12 v146 M12 85 h126" stroke="var(--color-plum)" strokeWidth="3" />
        </g>
      </g>
      <g className="pk-px1">
        <rect x="462" y="534" width="276" height="28" rx="14" fill="var(--color-lilac)" stroke="var(--color-plum)" strokeWidth="3.6" />
        <g transform="translate(900 470)">
          <g className="pk-sway pk-sway-slow" style={{ transformOrigin: "40px 40px" }}>
            <path d="M40 40 C20 20 14 -6 30 -26 C46 -8 52 18 40 40 Z" fill="var(--color-mint)" stroke="var(--color-plum)" strokeWidth="3" strokeLinejoin="round" />
            <path d="M40 40 C60 22 80 14 96 24 C86 46 62 52 40 40 Z" fill="var(--color-mint)" stroke="var(--color-plum)" strokeWidth="3" strokeLinejoin="round" />
          </g>
          <path d="M-4 40 H84 L72 80 H8 Z" fill="var(--color-bubblegum)" stroke="var(--color-plum)" strokeWidth="3.8" strokeLinejoin="round" />
        </g>
        <g className="pk-confetti">
          <Spark x={330} y={160} k={1.3} delay={0.1} />
          <Spark x={840} y={130} k={1.6} fill="var(--color-bubblegum)" delay={0.4} />
          <Love x={290} y={420} k={1.1} fill="var(--color-lilac)" delay={0.7} />
          <Love x={880} y={330} k={0.9} delay={0.3} />
          <Spark x={640} y={96} k={0.9} fill="var(--color-mint)" delay={0.9} />
        </g>
        <g transform="translate(600 150) rotate(-3)"><g className="pk-banner">
          <rect x="-132" y="-26" width="264" height="52" rx="26" fill="var(--color-butter)" stroke="var(--color-plum)" strokeWidth="3.6" />
          <text x="0" y="6" textAnchor="middle" className="pk-svg-text pk-svg-strong pk-svg-big">Delivered · 11:20</text>
        </g></g>
      </g>
    </Backdrop>
  );
}

export const SCENES = [SceneOrder, SceneCook, ScenePack, SceneRoad, SceneDoor];
