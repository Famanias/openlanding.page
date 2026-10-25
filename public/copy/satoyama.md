<template slug="satoyama" name="Satoyama Biyori">
  <dependencies>
    {
      "dependencies": {}
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(satoyama)/layout.tsx">
<![CDATA[import type { Metadata } from "next";
import { DM_Sans, Shippori_Mincho } from "next/font/google";
import "./satoyama/satoyama.css";

const mincho = Shippori_Mincho({ subsets: ["latin"], weight: "400", preload: false, variable: "--font-sato-mincho" });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sato-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "里山日和 — A slower kind of day",
  description: "An illustrated, six-chapter picture book about the landscape, seasons, and little joys of rural Japan. Take the slow way through Satoyama.",
};

export default function SatoyamaLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${mincho.variable} ${sans.variable}`}>
    <body className="st-body">{children}<noscript><style>{`.st-book{height:auto!important;overflow:visible!important}.st-stage{height:auto!important;overflow:visible!important}.st-chapter{position:relative!important;visibility:visible!important;content-visibility:visible!important;opacity:1!important;transform:none!important;min-height:850px;pointer-events:auto!important}.st-chapter[inert]{display:block!important}.st-js-control{display:none!important}.st-bottom{position:relative!important}.st-carousel-track{transform:none!important;flex-wrap:wrap}.st-activity{flex-basis:100%!important}.st-scene *{animation:none!important}`}</style></noscript></body>
  </html>;
}
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#F6F3E8"/><path d="m8 44 16-26 13 18 9-13 12 21H8Z" fill="#ADC3A1" stroke="#2F4438" stroke-width="2" stroke-linejoin="round"/><circle cx="47" cy="14" r="6" fill="#D7AAA0"/><path d="M13 51h40m-29-9v4m12-4v4m11-4v4" stroke="#2F4438" stroke-width="2"/></svg>
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{ display: "flex", width: "100%", height: "100%", background: "#F6F3E8", color: "#2F4438", padding: 72, flexDirection: "column", justifyContent: "center" }}><div style={{ display: "flex", fontSize: 20, letterSpacing: 7 }}>SATOYAMA BIYORI</div><div style={{ display: "flex", fontSize: 78, marginTop: 35 }}>A little closer to nature.</div><div style={{ display: "flex", fontSize: 78, fontStyle: "italic" }}>A little closer to yourself.</div><div style={{ display: "flex", marginTop: 35, fontSize: 25 }}>An illustrated journey into rural Japan.</div><div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: 55, background: "#ADC3A1", display: "flex" }} /></div>, size);
}
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/page.tsx">
<![CDATA[import { PictureBook } from "./deck/PictureBook";
import { Welcome } from "./chapters/Welcome";
import { LandscapeChapter } from "./chapters/LandscapeChapter";
import { RhythmChapter } from "./chapters/RhythmChapter";
import { AdventuresChapter } from "./chapters/AdventuresChapter";
import { SeasonsChapter } from "./chapters/SeasonsChapter";
import { Farewell } from "./chapters/Farewell";

export default function SatoyamaPage() {
  return <PictureBook pages={[<Welcome key="welcome" />, <LandscapeChapter key="landscape" />, <RhythmChapter key="rhythm" />, <AdventuresChapter key="adventures" />, <SeasonsChapter key="seasons" />, <Farewell key="farewell" />]} />;
}
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/satoyama.css">
<![CDATA[.st-body {
  --color-st-paper: #F6F3E8;
  --color-st-sage: #ADC3A1;
  --color-st-rose: #D7AAA0;
  --color-st-ink: #2F4438;
  --font-st-display: var(--font-sato-mincho), Georgia, serif;
  --font-st-body: var(--font-sato-sans), var(--font-sato-japanese), sans-serif;
  --font-sato-japanese: var(--font-sato-mincho);
  --ease-st-out: cubic-bezier(.23, 1, .32, 1);
  --ease-st-turn: cubic-bezier(.77, 0, .175, 1);
  --dur-st-press: 90ms;
  --dur-st-hover: 180ms;
  --dur-st-content: 420ms;
  --dur-st-page: 800ms;
  --dur-st-load: 1200ms;
}

.st-body {
  --st-paper: #F6F3E8; --st-sage: #ADC3A1; --st-rose: #D7AAA0; --st-ink: #2F4438;
  --st-muted: color-mix(in srgb, var(--st-ink) 78%, var(--st-paper));
  --st-border: color-mix(in srgb, var(--st-ink) 18%, var(--st-paper));
  --st-sky: color-mix(in srgb, var(--st-sage) 25%, var(--st-paper));
  --st-mountain-far: color-mix(in srgb, var(--st-sage) 39%, var(--st-paper));
  --st-mountain: color-mix(in srgb, var(--st-sage) 68%, var(--st-paper));
  --st-hill: color-mix(in srgb, var(--st-sage) 87%, var(--st-ink));
  --st-leaf: color-mix(in srgb, var(--st-sage) 85%, var(--st-paper));
  --st-forest: color-mix(in srgb, var(--st-sage) 41%, var(--st-ink));
  --st-midgreen: color-mix(in srgb, var(--st-sage) 73%, var(--st-ink));
  --st-field: color-mix(in srgb, var(--st-sage) 64%, var(--st-paper));
  --st-water: color-mix(in srgb, var(--st-sage) 36%, var(--st-paper));
  --st-path: color-mix(in srgb, var(--st-rose) 25%, var(--st-paper));
  --st-wall: color-mix(in srgb, var(--st-rose) 18%, var(--st-paper));
  --st-wallshade: color-mix(in srgb, var(--st-rose) 42%, var(--st-paper));
  --st-timber: color-mix(in srgb, var(--st-ink) 64%, var(--st-rose));
  --st-window: color-mix(in srgb, var(--st-ink) 77%, var(--st-sage));
  --st-roof: color-mix(in srgb, var(--st-ink) 78%, var(--st-sage));
  --st-roofshade: color-mix(in srgb, var(--st-ink) 86%, var(--st-sage));
  --st-roof-rose: color-mix(in srgb, var(--st-rose) 76%, var(--st-ink));
  --st-blue: #9CC4D6; --st-sun: #F1D9A2; --st-ember: #C8714F;
  margin: 0; background: var(--st-paper); color: var(--st-ink); font-family: var(--font-st-body); font-size: 15px; -webkit-font-smoothing: antialiased;
}
.st-body *, .st-body *::before, .st-body *::after { box-sizing: border-box; }
.st-body ::selection { color: var(--st-ink); background: var(--st-rose); }
.st-body a { color: inherit; text-decoration: none; }
.st-body button { font: inherit; color: inherit; cursor: pointer; }
.st-body button, .st-body a { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
.st-body button { border: 0; background: transparent; }
.st-body :focus-visible { outline: 2px solid var(--st-ink); outline-offset: 5px; border-radius: 3px; }
.st-body h1, .st-body h2, .st-body h3, .st-body p { margin: 0; }
.st-body em { font-weight: inherit; }
.st-body svg { display: block; }
.st-body button:disabled { cursor: default; opacity: .3; }
.st-body button:active:not(:disabled), .st-primary:active, .st-text-link:active { transform: scale(.97); transition-duration: var(--dur-st-press); }
.st-sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
.st-skip { position: fixed; top: -90px; left: 24px; z-index: 100; padding: 14px 22px; background: var(--st-paper); }
.st-skip:focus { top: 10px; }
.st-book { height: 100svh; min-height: 620px; display: grid; grid-template-rows: 104px minmax(0, 1fr) 76px; padding: 0 30px; overflow: hidden; }
.st-header { display: flex; align-items: center; justify-content: space-between; gap: 28px; padding: 0 9px; position: relative; z-index: 5; }
.st-logo { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
.st-logo-mark { width: 41px; height: 38px; }
.st-wordmark { font-family: var(--font-st-display); font-size: 27px; font-weight: 600; letter-spacing: .11em; display: flex; align-items: center; gap: 7px; line-height: 1.3; }
.st-seal { background: var(--st-rose); color: var(--st-ink); font-family: var(--font-sato-japanese); font-size: 9px; padding: 3px 4px; letter-spacing: 0; border-radius: 2px; transform: rotate(-6deg); }
.st-logo-caption { display: block; font-size: 8px; font-weight: 500; letter-spacing: .25em; margin-top: 4px; }
.st-navigation { display: flex; align-items: center; justify-content: center; gap: 25px; white-space: nowrap; scrollbar-width: none; position: relative; }
.st-navigation::-webkit-scrollbar { display: none; }
.st-navigation a { position: relative; font-size: 11px; padding: 15px 0; color: var(--st-muted); transition: color var(--dur-st-hover); }
.st-navigation a::after { content: ""; position: absolute; bottom: 4px; left: 0; right: 0; height: 2px; background: var(--st-ink); transform: scaleX(0); transition: transform var(--dur-st-content) var(--ease-st-out); transform-origin: left; }
.st-navigation a[aria-current] { color: var(--st-ink); }
.st-navigation a[aria-current]::after { transform: scaleX(1); }
.st-nav-number { font-size: 8px; margin-right: 5px; opacity: .7; }
.st-header-note { display: flex; align-items: center; gap: 8px; font-size: 10px; white-space: nowrap; }
.st-header-note > svg:first-child { width: 22px; height: 22px; }
.st-header-note > svg:last-child { width: 17px; margin-left: 8px; transition: transform var(--dur-st-content) var(--ease-st-out); }
.st-stage { position: relative; overflow: hidden; overflow: clip; border-radius: 4px; background: var(--st-sky); isolation: isolate; }
.st-stage:focus { outline: none; }
.st-chapter { position: absolute; inset: 0; overflow: auto; overscroll-behavior: contain; scrollbar-width: thin; scrollbar-color: var(--st-sage) var(--st-paper); opacity: 0; visibility: hidden; content-visibility: hidden; pointer-events: none; transform: translateX(6%); transition: transform var(--dur-st-page) var(--ease-st-turn), opacity var(--dur-st-page) var(--ease-st-out), visibility var(--dur-st-page); background: var(--st-paper); }
.st-chapter[data-state="active"] { visibility: visible; content-visibility: visible; pointer-events: auto; opacity: 1; transform: translateX(0); z-index: 2; }
.st-chapter[data-state="past"] { transform: translateX(-6%); }
.st-scene { position: absolute; inset: 0; width: 100%; height: 100%; min-height: 100%; }
.st-scene, .st-activity-art {
  --st-sky-top: color-mix(in srgb, var(--st-blue) 78%, var(--st-paper));
  --st-sky-mid: color-mix(in srgb, var(--st-blue) 42%, var(--st-paper));
  --st-sky-low: color-mix(in srgb, var(--st-sun) 38%, var(--st-paper));
  --st-sky-warm: color-mix(in srgb, var(--st-sun) 55%, var(--st-paper));
  --st-cloud: color-mix(in srgb, white 55%, var(--st-paper));
  --st-cloud-lit: color-mix(in srgb, var(--st-sun) 14%, white);
  --st-cloud-shade: color-mix(in srgb, var(--st-rose) 26%, color-mix(in srgb, var(--st-blue) 60%, var(--st-paper)));
  --st-mtn-far: color-mix(in srgb, var(--st-blue) 52%, var(--st-sage));
  --st-mtn-mid: color-mix(in srgb, var(--st-sage) 62%, var(--st-blue));
  --st-mtn-haze: color-mix(in srgb, var(--st-paper) 58%, var(--st-mtn-far));
  --st-meadow-lit: color-mix(in srgb, var(--st-sun) 30%, var(--st-leaf));
  --st-meadow: color-mix(in srgb, var(--st-sage) 66%, var(--st-ink));
  --st-tree-dark: var(--st-forest);
  --st-tree-mid: var(--st-midgreen);
  --st-tree-lit: color-mix(in srgb, var(--st-sun) 24%, var(--st-leaf));
  --st-bank: color-mix(in srgb, var(--st-timber) 70%, var(--st-sage));
  --st-water-deep: color-mix(in srgb, var(--st-blue) 50%, var(--st-sage));
  --st-water-canal: color-mix(in srgb, var(--st-blue) 66%, var(--st-sage));
  --st-stone: color-mix(in srgb, var(--st-ink) 28%, var(--st-paper));
  --st-bamboo: color-mix(in srgb, var(--st-sage) 70%, var(--st-ink));
  --st-bamboo-lit: color-mix(in srgb, var(--st-sun) 30%, var(--st-leaf));
  --st-bamboo-far: color-mix(in srgb, var(--st-sage) 50%, var(--st-paper));
  --st-forest-sky: color-mix(in srgb, var(--st-sage) 35%, var(--st-paper));
  --st-persimmon-dark: color-mix(in srgb, var(--st-rose) 20%, var(--st-forest));
  --st-persimmon: color-mix(in srgb, var(--st-rose) 35%, var(--st-midgreen));
  --st-persimmon-lit: color-mix(in srgb, var(--st-sun) 45%, var(--st-leaf));
  --st-persimmon-fruit: color-mix(in srgb, var(--st-ember) 70%, var(--st-sun));
  --st-snow: color-mix(in srgb, var(--st-blue) 10%, white);
  --st-snow-shade: color-mix(in srgb, var(--st-blue) 35%, var(--st-paper));
  --st-blossom-dark: color-mix(in srgb, var(--st-rose) 70%, var(--st-paper));
  --st-blossom-mid: color-mix(in srgb, var(--st-rose) 40%, var(--st-paper));
  --st-blossom-lit: color-mix(in srgb, var(--st-rose) 22%, white);
  --st-maple-dark: color-mix(in srgb, var(--st-ember) 62%, var(--st-ink));
  --st-maple-mid: color-mix(in srgb, var(--st-ember) 88%, var(--st-sun));
  --st-maple-lit: color-mix(in srgb, var(--st-sun) 62%, var(--st-ember));
}
.st-scene-spring {
  --st-sky-top: color-mix(in srgb, var(--st-rose) 28%, color-mix(in srgb, var(--st-blue) 50%, var(--st-paper)));
  --st-sky-mid: color-mix(in srgb, var(--st-rose) 38%, var(--st-paper));
  --st-sky-low: color-mix(in srgb, var(--st-sun) 50%, var(--st-paper));
  --st-cloud-shade: color-mix(in srgb, var(--st-rose) 55%, var(--st-paper));
  --st-mtn-far: color-mix(in srgb, var(--st-rose) 40%, var(--st-blue));
  --st-mtn-mid: color-mix(in srgb, var(--st-sage) 55%, var(--st-rose));
  --st-meadow-lit: color-mix(in srgb, var(--st-sun) 38%, var(--st-leaf));
}
.st-scene-summer {
  --st-sky-top: color-mix(in srgb, var(--st-blue) 84%, var(--st-ink));
  --st-sky-mid: color-mix(in srgb, var(--st-blue) 72%, var(--st-paper));
  --st-sky-low: color-mix(in srgb, var(--st-blue) 26%, var(--st-paper));
  --st-mtn-mid: color-mix(in srgb, var(--st-sage) 58%, var(--st-blue));
  --st-meadow-lit: color-mix(in srgb, var(--st-sun) 22%, var(--st-leaf));
  --st-meadow: color-mix(in srgb, var(--st-sage) 58%, var(--st-ink));
}
.st-scene-autumn {
  --st-sky-top: color-mix(in srgb, var(--st-rose) 40%, color-mix(in srgb, var(--st-blue) 40%, var(--st-paper)));
  --st-sky-mid: color-mix(in srgb, var(--st-sun) 50%, color-mix(in srgb, var(--st-rose) 40%, var(--st-paper)));
  --st-sky-low: color-mix(in srgb, var(--st-sun) 70%, var(--st-paper));
  --st-cloud-shade: color-mix(in srgb, var(--st-rose) 62%, var(--st-paper));
  --st-mtn-far: color-mix(in srgb, var(--st-rose) 55%, var(--st-sun));
  --st-mtn-mid: color-mix(in srgb, var(--st-ember) 40%, color-mix(in srgb, var(--st-rose) 70%, var(--st-ink)));
  --st-meadow-lit: color-mix(in srgb, var(--st-sun) 70%, var(--st-sage));
  --st-meadow: color-mix(in srgb, var(--st-sun) 40%, var(--st-midgreen));
  --st-hill: color-mix(in srgb, var(--st-rose) 30%, var(--st-midgreen));
  --st-forest: color-mix(in srgb, var(--st-rose) 25%, color-mix(in srgb, var(--st-sage) 41%, var(--st-ink)));
}
.st-scene-winter {
  --st-sky-top: color-mix(in srgb, var(--st-rose) 18%, color-mix(in srgb, var(--st-blue) 45%, var(--st-paper)));
  --st-sky-mid: color-mix(in srgb, var(--st-blue) 28%, var(--st-paper));
  --st-sky-low: color-mix(in srgb, var(--st-rose) 15%, var(--st-paper));
  --st-mtn-haze: color-mix(in srgb, var(--st-blue) 25%, var(--st-paper));
  --st-tree-dark: color-mix(in srgb, var(--st-sage) 45%, var(--st-ink));
  --st-tree-mid: color-mix(in srgb, var(--st-sage) 60%, var(--st-ink));
}
.st-scene-dusk {
  --st-sky-top: color-mix(in srgb, var(--st-rose) 35%, color-mix(in srgb, var(--st-blue) 45%, var(--st-paper)));
  --st-sky-mid: color-mix(in srgb, var(--st-rose) 62%, var(--st-paper));
  --st-sky-low: color-mix(in srgb, var(--st-sun) 70%, var(--st-rose));
  --st-cloud: color-mix(in srgb, var(--st-rose) 40%, white);
  --st-cloud-lit: color-mix(in srgb, var(--st-sun) 55%, var(--st-paper));
  --st-cloud-shade: color-mix(in srgb, var(--st-rose) 80%, var(--st-blue));
  --st-mtn-far: color-mix(in srgb, var(--st-rose) 50%, var(--st-blue));
  --st-mtn-mid: color-mix(in srgb, var(--st-rose) 45%, var(--st-ink));
  --st-mtn-haze: color-mix(in srgb, var(--st-sun) 60%, var(--st-rose));
  --st-meadow: color-mix(in srgb, var(--st-ink) 55%, var(--st-sage));
  --st-meadow-lit: color-mix(in srgb, var(--st-rose) 35%, var(--st-sage));
  --st-water-deep: color-mix(in srgb, var(--st-rose) 60%, var(--st-ink));
  --st-hill: color-mix(in srgb, var(--st-ink) 62%, var(--st-rose));
  --st-forest: color-mix(in srgb, var(--st-ink) 85%, var(--st-rose));
  --st-tree-dark: color-mix(in srgb, var(--st-ink) 78%, var(--st-rose));
  --st-tree-mid: color-mix(in srgb, var(--st-ink) 55%, var(--st-rose));
}
.st-chapter::before { content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none; }
#welcome::before, #the-landscape::before, #the-seasons::before { background: linear-gradient(98deg, color-mix(in srgb, var(--st-paper) 74%, transparent) 0%, color-mix(in srgb, var(--st-paper) 30%, transparent) 38%, transparent 58%); }
#until-next-time::before { background: radial-gradient(ellipse 52% 46% at 50% 24%, color-mix(in srgb, var(--st-paper) 62%, transparent), transparent 80%); }
.st-chapter > :not(.st-scene), .st-rhythm-layout > :not(.st-scene), .st-adventures > :not(.st-scene), .st-seasons > :not(.st-season-stack) { position: relative; z-index: 2; }
.st-seasons > .st-season-kanji, .st-goodbye-stamp, .st-vertical-poem, .st-landscape-label, .st-field-note { position: absolute !important; }
.st-season-stack { position: absolute; inset: 0; }
.st-season-layer { position: absolute; inset: 0; opacity: 0; visibility: hidden; transition: opacity var(--dur-st-page) var(--ease-st-out), visibility 0s linear var(--dur-st-page); }
.st-season-layer[data-on="true"] { opacity: 1; visibility: visible; transition-delay: 0s; }
.st-adventures { position: relative; }
.st-adventures > .st-scene { height: 64%; min-height: 0; }
.st-adventures::before { content: ""; position: absolute; inset: 0; z-index: 1; pointer-events: none; background: linear-gradient(to bottom, transparent 0%, transparent 18%, color-mix(in srgb, var(--st-rose) 7%, var(--st-paper)) 52%); }
.st-rhythm-layout > .st-scene { position: absolute; }
.st-hero-copy { position: relative; z-index: 2; padding: clamp(42px, 6.4vh, 72px) 0 0 7.3%; width: fit-content; }
.st-kicker { display: flex; gap: 13px; align-items: center; font-size: 9px; letter-spacing: .17em; font-weight: 500; margin-bottom: 22px; }
.st-kicker > span:last-child { font-family: var(--font-sato-japanese); font-size: 10px; letter-spacing: .22em; margin-left: 1px; }
.st-small-rule { width: 26px; height: 1px; background: currentColor; }
.st-hero-copy h1 { font-family: var(--font-st-display); font-size: clamp(40px, min(4.8vw, 7.3vh), 83px); font-weight: 400; line-height: 1.26; letter-spacing: -.055em; }
.st-hero-copy h1 > span { display: block; }
.st-hero-copy h1 em { font-family: Georgia, var(--font-st-display); letter-spacing: -.055em; font-size: 1.06em; }
.st-hero-copy > p { margin-top: 23px; font-size: 13px; line-height: 1.85; color: var(--st-muted); }
.st-primary { display: inline-flex; align-items: center; gap: 13px; background: var(--st-ink); color: var(--st-paper) !important; border-radius: 50px; padding: 14px 22px 14px 17px; margin-top: 26px; font-size: 11px; position: relative; isolation: isolate; overflow: hidden; transition: transform var(--dur-st-content) var(--ease-st-out); }
.st-primary::before { content: ""; position: absolute; inset: 0; background: color-mix(in srgb, var(--st-ink) 80%, var(--st-sage)); z-index: -1; transform: translateY(102%); transition: transform var(--dur-st-content) var(--ease-st-out); }
.st-primary > svg:first-child { width: 21px; height: 21px; }
.st-primary > svg:last-child { width: 17px; height: 17px; margin-left: 13px; transition: transform var(--dur-st-content) var(--ease-st-out); }
.st-reading-note { margin-top: 17px; font-size: 9px; color: var(--st-muted); }
.st-reading-note > span { padding: 0 3px; }
.st-vertical-poem { position: absolute; top: 15%; right: 8%; display: flex; flex-direction: row-reverse; gap: 17px; font-family: var(--font-st-display); font-size: 16px; line-height: 2; letter-spacing: .2em; }
.st-vertical-poem span { writing-mode: vertical-rl; }
.st-vertical-poem span:last-child { margin-top: 30px; }
.st-landscape-label { position: absolute; z-index: 2; right: 21%; bottom: 19%; display: flex; flex-direction: column; gap: 7px; text-align: center; color: var(--st-ink); transform: rotate(-4deg); }
.st-label-line { width: 1px; height: 35px; background: var(--st-ink); opacity: .6; margin: 0 auto 5px; }
.st-landscape-label > span:nth-child(2) { font-family: var(--font-st-display); font-size: 11px; letter-spacing: .06em; }
.st-landscape-label > span:last-child { font-size: 8px; letter-spacing: .02em; }
.st-scene-caption { position: absolute; z-index: 5; bottom: 22px; left: 28px; display: flex; align-items: center; gap: 8px; font-size: 7px; letter-spacing: .13em; background: color-mix(in srgb, var(--st-paper) 92%, transparent); padding: 9px 11px; border-radius: 3px; pointer-events: none; }
.st-caption-dot { height: 4px; width: 4px; border-radius: 50%; background: var(--st-ink); }
.st-caption-jp { margin-left: 8px; font-size: 8px; letter-spacing: .08em; }
.st-ambient { position: absolute; right: 24px; bottom: 22px; z-index: 5; display: flex; align-items: center; gap: 6px; background: var(--st-paper) !important; border-radius: 30px; padding: 9px 12px; font-size: 8px !important; }
.st-ambient svg { height: 12px; width: 12px; }
.st-bottom { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 20px; padding: 0 9px; }
.st-page-label { display: flex; align-items: center; gap: 13px; font-size: 11px; }
.st-page-numeral { font-family: var(--font-st-display); font-size: 23px; line-height: 1; font-variant-numeric: tabular-nums; }
.st-page-line { width: 22px; height: 1px; background: var(--st-border); }
.st-page-label > span[lang] { font-family: var(--font-sato-japanese); font-size: 10px; letter-spacing: .08em; }
.st-page-total { font-size: 9px; margin-left: 7px; color: var(--st-muted); }
.st-page-dots { display: flex; gap: 3px; align-items: center; }
.st-page-dots button { width: 28px; height: 36px; display: grid; place-items: center; }
.st-page-dots button span { width: 5px; height: 5px; border-radius: 50%; background: color-mix(in srgb, var(--st-ink) 25%, var(--st-paper)); transition: transform var(--dur-st-content) var(--ease-st-out), background var(--dur-st-hover); }
.st-page-dots button[aria-current] span { background: var(--st-ink); transform: scale(1.4); }
.st-page-actions { display: flex; align-items: center; gap: 9px; justify-self: end; }
.st-key-hint { font-size: 9px; color: var(--st-muted); margin-right: 13px; white-space: nowrap; }
.st-key-hint > span { margin: 0 5px; }
.st-key-hint kbd { font-family: inherit; font-size: 12px; margin: 0 2px; }
.st-arrow-button { border: 1px solid var(--st-border) !important; border-radius: 50%; width: 38px; height: 38px; display: inline-grid; place-items: center; flex-shrink: 0; transition: transform var(--dur-st-content) var(--ease-st-out), background var(--dur-st-hover); }
.st-arrow-button svg { width: 17px; height: 17px; }
.st-japanese-title { font-family: var(--font-st-display); font-size: 13px; letter-spacing: .1em; display: block; margin-bottom: 19px; }
.st-body h2 { font-family: var(--font-st-display); font-size: clamp(34px, min(4vw, 6vh), 63px); line-height: 1.3; font-weight: 400; letter-spacing: -.05em; }
.st-body h2 em { font-family: Georgia, var(--font-st-display); letter-spacing: -.045em; }
.st-essay { position: relative; z-index: 2; margin: 6% 0 0 7.3%; max-width: 580px; }
.st-essay > p { font-size: 13px; color: var(--st-muted); line-height: 1.9; max-width: 410px; margin-top: 19px; }
.st-text-link { display: inline-flex; align-items: center; gap: 24px; font-size: 11px; margin-top: 25px; border-bottom: 1px solid var(--st-ink); padding-bottom: 8px; transition: transform var(--dur-st-content) var(--ease-st-out); }
.st-text-link > svg { width: 17px; }
.st-field-note { position: absolute; top: 22%; right: 9%; transform: rotate(4deg); }
.st-field-note > span { font-family: var(--font-st-display); font-size: 15px; }
.st-field-note > p { font-size: 11px; line-height: 1.7; margin-top: 14px; }
.st-field-note > svg { width: 120px; margin-left: 25px; margin-top: 20px; }
.st-rhythm-layout { min-height: 100%; position: relative; display: grid; grid-template-columns: 1.1fr 1fr; gap: 8%; padding: 5% 8% 80px; overflow: hidden; }
.st-rhythm-intro > p { font-size: 13px; line-height: 1.9; color: var(--st-muted); margin-top: 20px; max-width: 390px; }
.st-tea-picture { width: 280px; position: relative; margin-top: 25px; transform: rotate(-3deg); border: 9px solid color-mix(in srgb, var(--st-sage) 14%, var(--st-paper)); border-bottom-width: 36px; }
.st-tea-picture > span { position: absolute; bottom: -29px; left: 0; right: 0; font-family: var(--font-st-display); font-size: 10px; text-align: center; }
.st-tea-picture small { font-family: var(--font-st-body); margin-left: 10px; font-size: 8px; }
.st-journal { padding: 6px 30px 8px; align-self: start; background: color-mix(in srgb, var(--st-paper) 90%, transparent); border-radius: 4px; box-shadow: 0 18px 40px -26px color-mix(in srgb, var(--st-ink) 55%, transparent); }
.st-journal-entry:first-child { border-top: 0; }
.st-journal-entry { border-top: 1px solid var(--st-border); padding: 19px 0 24px; }
.st-journal-time { display: flex; justify-content: space-between; align-items: center; font-size: 9px; color: var(--st-muted); }
.st-journal-time > span[lang] { font-family: var(--font-st-display); font-size: 22px; line-height: 1; }
.st-journal-entry h3 { font-family: var(--font-st-display); font-size: 25px; letter-spacing: -.03em; margin-top: 9px; }
.st-journal-entry p { max-width: 380px; font-size: 12px; line-height: 1.8; color: var(--st-muted); margin-top: 9px; }
.st-adventures { padding: 4% 7.3% 65px; min-height: 100%; background: color-mix(in srgb, var(--st-rose) 7%, var(--st-paper)); overflow: hidden; }
.st-adventure-heading { display: flex; align-items: end; justify-content: space-between; margin-bottom: 30px; }
.st-adventure-heading h2 { font-size: clamp(36px, min(3.7vw, 5.8vh), 58px); }
.st-adventure-heading p { font-size: 12px; line-height: 1.9; color: var(--st-muted); padding-right: 7%; padding-bottom: 7px; }
.st-carousel { --st-cards: 3; --st-gap: 25px; touch-action: pan-y; }
.st-carousel-window { overflow: hidden; padding-top: 7px; margin-top: -7px; }
.st-carousel-track { display: flex; gap: var(--st-gap); transform: translateX(calc(var(--st-card-index) * (100% + var(--st-gap)) / var(--st-cards) * -1)); transition: transform var(--dur-st-page) var(--ease-st-out); }
.st-activity { flex: 0 0 calc((100% - (var(--st-cards) - 1) * var(--st-gap)) / var(--st-cards)); min-width: 0; }
.st-activity-picture { aspect-ratio: 1.6; overflow: hidden; position: relative; transition: transform var(--dur-st-content) var(--ease-st-out); }
.st-activity-art { width: 100%; height: 100%; object-fit: cover; }
.st-activity-picture > svg { transition: transform var(--dur-st-page) var(--ease-st-out); }
.st-activity-ja { position: absolute; right: 11px; top: 13px; writing-mode: vertical-rl; font-family: var(--font-st-display); font-size: 11px; letter-spacing: .12em; }
.st-postcard-number { position: absolute; bottom: 10px; left: 13px; font-family: var(--font-st-display); font-size: 19px; }
.st-activity-tag { display: block; font-size: 7px; letter-spacing: .16em; margin-top: 20px; }
.st-activity h3 { font-family: var(--font-st-display); font-size: clamp(20px, 1.7vw, 27px); letter-spacing: -.04em; margin-top: 8px; }
.st-activity p { font-size: 11px; line-height: 1.85; margin-top: 10px; color: var(--st-muted); max-width: 32ch; }
.st-carousel-controls { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--st-border); margin-top: 24px; padding-top: 13px; }
.st-carousel-controls > div { display: flex; align-items: center; gap: 8px; }
.st-carousel-caption { font-size: 9px; color: var(--st-muted); }
.st-carousel-caption > span { font-family: var(--font-st-display); font-size: 10px; margin-left: 20px; }
.st-carousel-count { font-size: 11px; font-variant-numeric: tabular-nums; margin-right: 13px; }
.st-carousel-count > span { color: var(--st-muted); font-size: 9px; margin-left: 5px; }
.st-seasons { position: relative; min-height: 100%; }
.st-season-copy { position: relative; z-index: 2; padding: 5% 0 80px 7.3%; }
.st-season-tabs { display: flex; gap: 7px; margin-top: 28px; }
.st-season-tabs button { display: flex; align-items: center; gap: 10px; padding: 9px 15px; border-radius: 3px; border: 1px solid var(--st-border); font-size: 10px; transition: background var(--dur-st-hover), transform var(--dur-st-content) var(--ease-st-out); }
.st-season-tabs button[aria-selected="true"] { color: var(--st-paper); background: var(--st-ink); border-color: var(--st-ink); }
.st-season-tabs button > span { font-family: var(--font-st-display); font-size: 18px; }
.st-season-panel { margin-top: 24px; max-width: 410px; }
.st-season-panel h3 { font-family: var(--font-st-display); font-size: 21px; letter-spacing: -.025em; }
.st-season-panel p { font-size: 12px; line-height: 1.9; color: var(--st-muted); margin-top: 10px; }
.st-season-kanji { position: absolute; right: 12%; top: 15%; font-family: var(--font-st-display); font-size: 160px; color: var(--st-ink); opacity: .2; }
.st-farewell-copy { position: relative; z-index: 2; text-align: center; padding-top: 6%; }
.st-farewell-copy h2 { font-size: clamp(40px, min(4.8vw, 7vh), 76px); }
.st-farewell-copy > p { font-size: 12px; line-height: 1.85; color: var(--st-muted); margin-top: 17px; }
.st-farewell-note { font-size: 9px; display: block; margin-top: 16px; }
.st-farewell-note > span { font-family: var(--font-st-display); margin-left: 8px; }
.st-goodbye-stamp { position: absolute; top: 12%; right: 12%; padding: 12px 9px; border: 2px solid var(--st-roof-rose); color: var(--st-roof-rose); border-radius: 6px; font-family: var(--font-st-display); font-size: 25px; line-height: 1.2; letter-spacing: .16em; transform: rotate(8deg); opacity: .8; }

@media (hover: hover) and (pointer: fine) {
  .st-navigation a:hover::after { transform: scaleX(1); }
  .st-header-note:hover > svg:last-child, .st-primary:hover > svg:last-child { transform: translateX(4px); }
  .st-primary:hover::before { transform: translateY(0); }
  .st-text-link:hover { transform: translateX(4px); }
  .st-arrow-button:hover:not(:disabled) { background: color-mix(in srgb, var(--st-sage) 35%, var(--st-paper)); transform: translateY(-2px); }
  .st-page-dots button:hover span { transform: scale(1.7); }
  .st-activity:hover .st-activity-picture { transform: translateY(-5px); }
  .st-activity:hover .st-activity-picture > svg { transform: scale(1.035); }
  .st-season-tabs button:hover { transform: translateY(-3px); }
}

@keyframes st-sketch-draw {
  0% { stroke-dashoffset: 100; opacity: 0; }
  8% { opacity: 0.95; }
  100% { stroke-dashoffset: 0; opacity: 0.85; }
}
@keyframes st-wash-sky {
  0% {
    clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
    opacity: 0;
    filter: blur(8px) saturate(1.25);
  }
  20% {
    opacity: 0.85;
    filter: blur(5px) saturate(1.2);
  }
  85% {
    clip-path: polygon(0 0, 100% 0, 100% 102%, 0 98%);
    filter: blur(1.5px) saturate(1.05);
  }
  100% {
    clip-path: polygon(0 0, 100% 0, 100% 105%, 0 105%);
    opacity: 1;
    filter: blur(0px) saturate(1);
  }
}
@keyframes st-wash-brush-ltr {
  0% {
    clip-path: polygon(-5% -5%, -5% -5%, -10% 105%, -10% 105%);
    opacity: 0;
    filter: blur(7px) saturate(1.3);
  }
  20% {
    opacity: 0.9;
    filter: blur(4px) saturate(1.2);
  }
  85% {
    clip-path: polygon(-5% -5%, 108% -5%, 96% 105%, -10% 105%);
    filter: blur(1px) saturate(1.05);
  }
  100% {
    clip-path: polygon(-5% -5%, 115% -5%, 115% 105%, -10% 105%);
    opacity: 1;
    filter: blur(0px) saturate(1);
  }
}
@keyframes st-wash-brush-rtl {
  0% {
    clip-path: polygon(105% -5%, 105% -5%, 110% 105%, 110% 105%);
    opacity: 0;
    filter: blur(7px) saturate(1.3);
  }
  20% {
    opacity: 0.9;
    filter: blur(4px) saturate(1.2);
  }
  85% {
    clip-path: polygon(-8% -5%, 105% -5%, 110% 105%, 4% 105%);
    filter: blur(1px) saturate(1.05);
  }
  100% {
    clip-path: polygon(-15% -5%, 105% -5%, 110% 105%, -15% 105%);
    opacity: 1;
    filter: blur(0px) saturate(1);
  }
}
@keyframes st-wash-in {
  0% { opacity: 0; filter: blur(3px) saturate(0.85); }
  25% { opacity: 0.35; filter: blur(2px) saturate(0.9); }
  100% { opacity: 1; filter: blur(0px) saturate(1); }
}
@keyframes st-cloud-drift { 0%, 100% { transform: translateX(-30px); } 50% { transform: translateX(56px); } }
@keyframes st-mist-drift { 0%, 100% { transform: translateX(-36px); } 50% { transform: translateX(36px); } }
@keyframes st-fall { 0% { opacity: 0; transform: translate(50px, -200px); } 14%, 86% { opacity: .95; } 100% { opacity: 0; transform: translate(-170px, 280px); } }
@keyframes st-firefly { 0%, 100% { opacity: .2; transform: translate(0, 0); } 50% { opacity: 1; transform: translate(10px, -14px); } }
@keyframes st-beams { 0%, 100% { opacity: .28; } 50% { opacity: .5; } }
@keyframes st-sway { 0%, 100% { transform: rotate(-.5deg); } 50% { transform: rotate(.6deg); } }
@keyframes st-birds-glide { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(34px, -10px); } }
@keyframes st-motes { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-18px); } }
@keyframes st-smoke-rise { 0%, 100% { transform: translateY(2px); opacity: .4; } 50% { transform: translateY(-11px); opacity: .65; } }
@keyframes st-grass-sway { 0%, 100% { transform: rotate(-.6deg); } 50% { transform: rotate(.7deg); } }
@keyframes st-copy-enter { from { transform: translateY(18px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes st-title-enter { from { clip-path: inset(0 0 100% 0); transform: translateY(18px); } to { clip-path: inset(0); transform: none; } }
@keyframes st-scene-enter { from { transform: scale(1.025); } to { transform: scale(1); } }
@media (prefers-reduced-motion: no-preference) {
  .st-clouds { animation: st-cloud-drift 26s ease-in-out 1.6s infinite; }
  .st-smoke { animation: st-smoke-rise 9s ease-in-out 1.6s infinite; }
  .st-mist { animation: st-mist-drift 18s ease-in-out 1.6s infinite; }
  .st-fall { animation: st-fall 16s linear 1.6s infinite; }
  .st-fall-b { animation-duration: 22s; animation-delay: -6s; }
  .st-firefly { animation: st-firefly 5s ease-in-out 1.6s infinite; }
  .st-beams { animation: st-beams 18s ease-in-out 1.6s infinite; }
  .st-bamboo-sway { transform-origin: 50% 100%; animation: st-sway 18s ease-in-out 1.6s infinite; }
  .st-birds { animation: st-birds-glide 9s ease-in-out 1.6s infinite; }
  .st-motes { animation: st-motes 9s ease-in-out 1.6s infinite; }
  .st-grasses { transform-origin: 50% 100%; animation: st-grass-sway 18s ease-in-out 1.6s infinite; }

  /* Sketch lines and color washes (2x speed) */
  .st-sketch-path {
    stroke: var(--st-ink);
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    opacity: 0;
  }
  .st-sketch-path[data-depth="far"] { stroke-width: 1.4px; }
  .st-sketch-path[data-depth="mid"] { stroke-width: 1.8px; }
  .st-sketch-path[data-depth="near"] { stroke-width: 2.2px; }

  .st-paint-layer {
    opacity: 0;
  }

  .st-chapter:not([data-state="active"]) .st-sketch-path,
  .st-chapter:not([data-state="active"]) .st-paint-wash,
  .st-chapter:not([data-state="active"]) .st-paint-layer,
  .st-season-layer:not([data-on="true"]) .st-sketch-path,
  .st-season-layer:not([data-on="true"]) .st-paint-wash,
  .st-season-layer:not([data-on="true"]) .st-paint-layer {
    animation: none !important;
    opacity: 0;
  }

  .st-chapter:not([data-state="active"]) .st-hero-copy h1 > span,
  .st-chapter:not([data-state="active"]) h2,
  .st-chapter:not([data-state="active"]) .st-hero-copy > p,
  .st-chapter:not([data-state="active"]) .st-primary,
  .st-chapter:not([data-state="active"]) .st-essay > p,
  .st-chapter:not([data-state="active"]) .st-kicker,
  .st-chapter:not([data-state="active"]) .st-japanese-title,
  .st-chapter:not([data-state="active"]) .st-vertical-poem,
  .st-chapter:not([data-state="active"]) .st-field-note,
  .st-chapter:not([data-state="active"]) .st-adventure-heading,
  .st-chapter:not([data-state="active"]) .st-carousel,
  .st-chapter:not([data-state="active"]) .st-farewell-copy > p,
  .st-chapter:not([data-state="active"]) .st-farewell-note,
  .st-chapter:not([data-state="active"]) .st-goodbye-stamp,
  .st-chapter:not([data-state="active"]) .st-season-panel,
  .st-chapter:not([data-state="active"]) .st-journal-entry {
    animation: none !important;
  }

  .st-chapter[data-state="active"] .st-sketch-path {
    animation: st-sketch-draw 0.65s cubic-bezier(0.25, 1, 0.5, 1) both;
  }
  .st-chapter[data-state="active"] .st-sketch-path[data-depth="far"] { animation-delay: 0.02s; }
  .st-chapter[data-state="active"] .st-sketch-path[data-depth="mid"] { animation-delay: 0.15s; }
  .st-chapter[data-state="active"] .st-sketch-path[data-depth="near"] { animation-delay: 0.3s; }

  /* Back-to-front layer-by-layer watercolor painting sequence (2x speed) */
  .st-chapter[data-state="active"] .st-paint-layer[data-depth="sky"] {
    animation: st-wash-sky 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.42s both;
  }
  .st-chapter[data-state="active"] .st-paint-layer[data-depth="far"] {
    animation: st-wash-brush-ltr 0.62s cubic-bezier(0.22, 1, 0.36, 1) 0.62s both;
  }
  .st-chapter[data-state="active"] .st-paint-layer[data-depth="mid"] {
    animation: st-wash-brush-rtl 0.62s cubic-bezier(0.22, 1, 0.36, 1) 0.8s both;
  }
  .st-chapter[data-state="active"] .st-paint-layer[data-depth="near"] {
    animation: st-wash-brush-ltr 0.62s cubic-bezier(0.22, 1, 0.36, 1) 0.98s both;
  }

  /* Fallback for unlayered wash */
  .st-chapter[data-state="active"] .st-paint-wash:not(:has(.st-paint-layer)) {
    opacity: 0;
    animation: st-wash-in 0.85s cubic-bezier(0.22, 1, 0.36, 1) 0.52s both;
  }

  /* Season tab changes replay sketch and watercolor painting layers (2x speed) */
  .st-chapter[data-state="active"] .st-season-layer[data-on="true"] .st-sketch-path {
    animation: st-sketch-draw 0.65s cubic-bezier(0.25, 1, 0.5, 1) both;
  }
  .st-chapter[data-state="active"] .st-season-layer[data-on="true"] .st-sketch-path[data-depth="far"] { animation-delay: 0.02s; }
  .st-chapter[data-state="active"] .st-season-layer[data-on="true"] .st-sketch-path[data-depth="mid"] { animation-delay: 0.15s; }
  .st-chapter[data-state="active"] .st-season-layer[data-on="true"] .st-sketch-path[data-depth="near"] { animation-delay: 0.3s; }

  .st-chapter[data-state="active"] .st-season-layer[data-on="true"] .st-paint-layer[data-depth="sky"] {
    animation: st-wash-sky 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.42s both;
  }
  .st-chapter[data-state="active"] .st-season-layer[data-on="true"] .st-paint-layer[data-depth="far"] {
    animation: st-wash-brush-ltr 0.62s cubic-bezier(0.22, 1, 0.36, 1) 0.62s both;
  }
  .st-chapter[data-state="active"] .st-season-layer[data-on="true"] .st-paint-layer[data-depth="mid"] {
    animation: st-wash-brush-rtl 0.62s cubic-bezier(0.22, 1, 0.36, 1) 0.8s both;
  }
  .st-chapter[data-state="active"] .st-season-layer[data-on="true"] .st-paint-layer[data-depth="near"] {
    animation: st-wash-brush-ltr 0.62s cubic-bezier(0.22, 1, 0.36, 1) 0.98s both;
  }

  .st-season-layer[data-on="false"] .st-scene * { animation-play-state: paused; }
  .st-chapter:not([data-state="active"]) .st-scene *, .st-book[data-paused="true"] .st-scene * { animation-play-state: paused; }
  .st-header { animation: st-copy-enter var(--dur-st-content) var(--ease-st-out) both; }

  /* Text entrances choreograph after scenery is largely drawn */
  .st-chapter[data-state="active"] .st-hero-copy h1 > span,
  .st-chapter[data-state="active"] h2 {
    animation: st-title-enter var(--dur-st-load) var(--ease-st-out) 1.2s both;
  }
  .st-hero-copy h1 > span:nth-child(2) { animation-delay: 1.28s !important; }
  .st-chapter[data-state="active"] .st-hero-copy > p,
  .st-chapter[data-state="active"] .st-primary,
  .st-chapter[data-state="active"] .st-essay > p,
  .st-chapter[data-state="active"] .st-kicker,
  .st-chapter[data-state="active"] .st-japanese-title,
  .st-chapter[data-state="active"] .st-vertical-poem,
  .st-chapter[data-state="active"] .st-field-note,
  .st-chapter[data-state="active"] .st-adventure-heading,
  .st-chapter[data-state="active"] .st-carousel,
  .st-chapter[data-state="active"] .st-farewell-copy > p,
  .st-chapter[data-state="active"] .st-farewell-note,
  .st-chapter[data-state="active"] .st-goodbye-stamp,
  .st-season-panel {
    animation: st-copy-enter var(--dur-st-page) var(--ease-st-out) 1.3s both;
  }
  .st-chapter[data-state="active"] .st-primary { animation-delay: 1.38s; }
  .st-chapter[data-state="active"] > .st-scene { animation: st-scene-enter var(--dur-st-load) var(--ease-st-out) both; }
  .st-chapter[data-state="active"] .st-journal-entry {
    animation: st-copy-enter var(--dur-st-page) var(--ease-st-out) both;
    animation-delay: calc(1.2s + var(--st-i) * 60ms);
  }
}
@media (prefers-reduced-motion: reduce) {
  .st-body *, .st-body *::before, .st-body *::after { animation: none !important; transition-duration: 0s !important; scroll-behavior: auto !important; }
  .st-sketch-path { stroke-dashoffset: 0 !important; opacity: 0.85 !important; }
  .st-paint-wash, .st-paint-layer { opacity: 1 !important; filter: none !important; clip-path: none !important; }
  .st-book { height: auto !important; min-height: 0; overflow: visible; grid-template-rows: auto auto auto; }
  .st-header { min-height: 104px; background: var(--st-paper); }
  .st-stage { height: auto; overflow: visible; }
  .st-chapter { transform: none !important; position: relative; min-height: 850px; visibility: visible; content-visibility: visible; opacity: 1; pointer-events: auto; overflow: hidden; }
  .st-bottom { position: sticky; bottom: 0; z-index: 10; min-height: 76px; background: var(--st-paper); }
  .st-ambient, .st-scene-caption { display: none; }
}

@media (min-width: 1650px) {
  .st-book { grid-template-rows: 116px minmax(0, 1fr) 85px; padding: 0 40px; }
  .st-navigation { gap: 31px; }
  .st-navigation a { font-size: 12px; }
  .st-header-note { font-size: 12px; }
  .st-hero-copy { padding-top: 7%; }
  .st-hero-copy > p { font-size: 15px; }
  .st-primary { font-size: 12px; padding: 16px 24px 16px 19px; }
  .st-reading-note { font-size: 10px; }
}
@media (max-width: 1190px) {
  .st-book { padding: 0 20px; grid-template-rows: 95px minmax(0, 1fr) 70px; }
  .st-navigation { gap: 17px; }
  .st-nav-number { display: none; }
  .st-header-note { display: none; }
  .st-hero-copy { padding-left: 6%; }
  .st-hero-copy h1 { font-size: clamp(43px, 5.3vw, 65px); }
  .st-vertical-poem { right: 5%; font-size: 14px; }
  .st-key-hint { font-size: 8px; margin-right: 3px; }
  .st-essay { max-width: 500px; }
  .st-field-note { right: 7%; }
  .st-body h2 { font-size: 43px; }
  .st-rhythm-layout { gap: 6%; padding-left: 6%; padding-right: 6%; }
  .st-journal-entry { padding: 15px 0 19px; }
}
@media (max-width: 760px) {
  .st-book { height: 100svh; min-height: 620px; grid-template-rows: 123px minmax(0, 1fr) 70px; padding: 0 13px; }
  .st-header { display: grid; grid-template-columns: 1fr; grid-template-rows: 70px 53px; gap: 0; padding: 0 8px; align-content: start; }
  .st-logo { width: fit-content; gap: 7px; }
  .st-logo-mark { width: 32px; height: 30px; }
  .st-wordmark { font-size: 23px; }
  .st-logo-caption { font-size: 7px; }
  .st-header-note { display: flex; position: absolute; right: 10px; top: 27px; font-size: 12px; gap: 5px; }
  .st-header-note > svg:first-child { width: 17px; height: 17px; }
  .st-header-note > svg:last-child { display: none; }
  .st-navigation { overflow-x: auto; width: calc(100vw - 42px); justify-content: start; padding: 0 0 6px; gap: 24px; }
  .st-navigation a { padding: 12px 0; font-size: 12px; }
  .st-hero-copy { padding: 34px 25px 0; width: 100%; }
  .st-kicker { font-size: 7px; gap: 10px; margin-bottom: 17px; letter-spacing: .12em; }
  .st-kicker > span:last-child { font-size: 8px; }
  .st-small-rule { width: 18px; }
  .st-hero-copy h1 { font-size: clamp(30px, 7.1vw, 50px); line-height: 1.35; letter-spacing: -.05em; }
  .st-hero-copy h1 em { letter-spacing: -.06em; }
  .st-hero-copy > p { font-size: 13px; line-height: 1.8; margin-top: 17px; }
  .st-primary { font-size: 12px; padding: 12px 17px 12px 13px; gap: 9px; margin-top: 21px; }
  .st-primary > svg:first-child { width: 18px; height: 18px; }
  .st-primary > svg:last-child { width: 15px; margin-left: 8px; }
  .st-reading-note { display: none; }
  .st-vertical-poem { display: none; }
  .st-scene { width: 155%; max-width: none; left: -27.5%; }
  .st-landscape-label { display: none; }
  .st-landscape-label > span:nth-child(2) { font-size: 8px; }
  .st-landscape-label > span:last-child { font-size: 6px; }
  .st-label-line { height: 22px; }
  .st-scene-caption { display: none; }
  .st-caption-jp { display: none; }
  .st-ambient { right: 12px; bottom: 16px; padding: 8px; font-size: 7px !important; }
  .st-ambient > span { display: none; }
  .st-bottom { padding: 0 5px; gap: 7px; grid-template-columns: 1fr auto 1fr; }
  .st-page-label { gap: 7px; }
  .st-page-numeral { font-size: 21px; }
  .st-page-line { width: 12px; }
  .st-page-label > span[lang] { font-size: 10px; white-space: nowrap; }
  .st-page-total { display: none; }
  .st-page-dots { gap: 0; }
  .st-page-dots button { width: 24px; height: 36px; }
  .st-page-dots button span { width: 4px; height: 4px; }
  .st-page-actions { gap: 6px; }
  .st-arrow-button { width: 33px; height: 33px; }
  .st-arrow-button svg { width: 15px; height: 15px; }
  .st-key-hint { display: none; }
  .st-body h2 { font-size: clamp(31px, 7.8vw, 49px); }
  .st-japanese-title { font-size: 11px; margin-bottom: 15px; }
  .st-essay { margin: 35px 27px 0; max-width: 430px; }
  .st-essay > p { font-size: 13px; margin-top: 16px; max-width: 32ch; }
  .st-text-link { margin-top: 18px; font-size: 10px; }
  .st-field-note { display: none; }
  .st-rhythm-layout { grid-template-columns: 1fr; gap: 25px; padding: 30px 27px 80px; }
  .st-rhythm-intro > p { font-size: 13px; margin-top: 16px; }
  .st-tea-picture { display: none; }
  .st-journal-entry { padding: 14px 0 18px; }
  .st-journal-entry h3 { font-size: 23px; }
  .st-journal-entry p { font-size: 13px; }
  .st-journal-time { font-size: 8px; }
  .st-adventures { padding: 30px 25px 75px; }
  .st-adventure-heading { display: block; margin-bottom: 22px; }
  .st-adventure-heading h2 { font-size: 34px; }
  .st-adventure-heading p { font-size: 10px; line-height: 1.7; padding: 0; margin-top: 13px; }
  .st-adventure-heading p br { display: none; }
  .st-carousel { --st-cards: 1; --st-gap: 18px; }
  .st-activity-picture { aspect-ratio: 1.6; }
  .st-activity-tag { margin-top: 14px; }
  .st-activity h3 { font-size: 25px; }
  .st-activity p { font-size: 13px; max-width: none; margin-top: 8px; }
  .st-carousel-controls { margin-top: 19px; padding-top: 11px; }
  .st-carousel-caption { font-size: 7px; max-width: 100px; }
  .st-carousel-caption > span { display: none; }
  .st-carousel-count { margin-right: 3px; font-size: 10px; }
  .st-carousel-controls > div { gap: 6px; }
  .st-season-copy { padding: 34px 25px 80px; }
  .st-season-tabs { gap: 5px; margin-top: 23px; }
  .st-season-tabs button { padding: 8px 9px; gap: 5px; font-size: 8px; }
  .st-season-tabs button > span { font-size: 16px; }
  .st-season-panel { margin-top: 20px; max-width: 300px; }
  .st-season-panel h3 { font-size: 18px; }
  .st-season-panel p { font-size: 13px; }
  .st-season-kanji { top: auto; bottom: 21%; right: 10%; font-size: 80px; }
  .st-farewell-copy { padding: 40px 24px 0; }
  .st-farewell-copy h2 { font-size: 40px; }
  .st-farewell-copy > p { font-size: 13px; }
  .st-farewell-note { font-size: 8px; }
  .st-goodbye-stamp { display: none; }
}
@media (max-width: 760px) and (prefers-reduced-motion: no-preference) {
  .st-chapter[data-state="active"] .st-hero-copy h1 > span { animation-duration: var(--dur-st-content); }
}
@media (max-width: 360px) {
  .st-page-label > span[lang] { display: none; }
}
@media (max-height: 760px) and (min-width: 761px) {
  .st-book { grid-template-rows: 82px minmax(0, 1fr) 62px; }
  .st-hero-copy { padding-top: 30px; }
  .st-hero-copy h1 { font-size: clamp(40px, 6.5vh, 58px); }
  .st-kicker { margin-bottom: 14px; }
  .st-hero-copy > p { margin-top: 16px; font-size: 11px; }
  .st-primary { margin-top: 18px; padding-top: 11px; padding-bottom: 11px; }
  .st-reading-note { margin-top: 10px; }
  .st-essay { margin-top: 30px; }
  .st-essay h2 { font-size: 37px; }
  .st-essay > p { font-size: 11px; margin-top: 13px; }
  .st-rhythm-layout { padding-top: 30px; }
  .st-journal-entry { padding-top: 12px; padding-bottom: 14px; }
  .st-tea-picture { width: 210px; margin-top: 20px; }
  .st-adventures { padding-top: 25px; }
  .st-adventure-heading h2 { font-size: 38px; }
  .st-adventure-heading { margin-bottom: 20px; }
  .st-activity-picture { aspect-ratio: 2; }
  .st-activity-tag { margin-top: 13px; }
  .st-carousel-controls { margin-top: 17px; }
  .st-season-copy { padding-top: 30px; }
  .st-farewell-copy { padding-top: 30px; }
}
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/brand/Icons.tsx">
<![CDATA[export function Arrow({ direction = "right" }: { direction?: "right" | "left" }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ transform: direction === "left" ? "rotate(180deg)" : undefined }}><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function Leaf({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true"><path d="M25 5C9 4 4 12 8 22c11 5 19-3 17-17Z" fill="currentColor" opacity=".18" /><path d="M6 27 23 8M11 21l-1-8m6 3 7 1M25 5C9 4 4 12 8 22c11 5 19-3 17-17Z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function PauseIcon({ paused }: { paused: boolean }) {
  return <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">{paused ? <path d="m7 4 9 6-9 6V4Z" fill="currentColor" /> : <><path d="M7 4v12M13 4v12" stroke="currentColor" strokeWidth="2" /></>}</svg>;
}
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/brand/Logo.tsx">
<![CDATA[export function Logo() {
  return <a className="st-logo" href="#welcome" aria-label="里山日和 旅 SATOYAMA BIYORI — return to the beginning">
    <svg className="st-logo-mark" viewBox="0 0 45 38" fill="none" aria-hidden="true"><path d="m3 30 12-19 9 12 7-9 11 16H3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /><path d="M8 34h30M16 25v5m8-5v5m8-5v5" stroke="currentColor" strokeWidth="1.1" /><circle cx="33" cy="7" r="4" fill="currentColor" opacity=".45" /></svg>
    <span><span className="st-wordmark" lang="ja">里山日和<span className="st-seal">旅</span></span><span className="st-logo-caption">SATOYAMA BIYORI</span></span>
  </a>;
}
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/chapters/AdventuresChapter.tsx">
<![CDATA[import { ActivityCarousel } from "../deck/ActivityCarousel";
import { ForestScene } from "../illustrations/ForestScene";

export function AdventuresChapter() {
  return <div className="st-adventures"><ForestScene /><div className="st-adventure-heading"><div><span className="st-japanese-title" lang="ja">寄り道も、旅のうち。</span><h2>Leave room for<br /><em>a little wandering.</em></h2></div><p>You don’t need a grand plan.<br /> Just a curious heart, comfortable shoes,<br /> and a little time to spare.</p></div><ActivityCarousel /></div>;
}
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/chapters/Farewell.tsx">
<![CDATA[import { Arrow, Leaf } from "../brand/Icons";
import { DuskScene } from "../illustrations/DuskScene";

export function Farewell() {
  return <><DuskScene /><div className="st-farewell-copy"><span className="st-japanese-title" lang="ja">また、いつか。この場所で。</span><h2>Take a little of<br /><em>the quiet with you.</em></h2><p>A slower morning. A meal made with care. A moment<br className="st-desktop-break" /> outside, just to see what the sky is doing.</p><p>You don’t have to live here to bring a little<br className="st-desktop-break" /> of this way of living home.</p><a className="st-primary" href="#welcome"><Leaf /><span>Wander through again</span><Arrow /></a><span className="st-farewell-note">Until next time. <span lang="ja">またね。</span></span></div><div className="st-goodbye-stamp" lang="ja">里山<br />日和</div></>;
}
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/chapters/LandscapeChapter.tsx">
<![CDATA[import { Arrow } from "../brand/Icons";
import { TerraceScene } from "../illustrations/TerraceScene";

export function LandscapeChapter() {
  return <><TerraceScene /><div className="st-essay st-landscape-essay"><span className="st-japanese-title" lang="ja">里山という場所。</span><h2>Between the mountains,<br />a world <em>of its own.</em></h2><p>Satoyama is the meeting place of village and mountain. A patchwork of woodland, rice paddies, streams, and homes, shaped by people living alongside nature.</p><p>Look a little closer. A kitchen garden by the gate. Water moving through an irrigation channel. A path worn smooth by generations of footsteps.</p><a className="st-text-link" href="#a-slower-rhythm">Meet the rhythm of the village <Arrow /></a></div><div className="st-field-note"><span lang="ja">里 — village &nbsp; 山 — mountain</span><p>Not wilderness. Not quite town.<br />A landscape made together.</p><svg viewBox="0 0 120 45" fill="none" aria-hidden="true"><path d="M3 8c25 39 68 29 109 3m-13 0 15-1-6 13" stroke="currentColor" strokeWidth="1.2" /></svg></div></>;
}
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/chapters/RhythmChapter.tsx">
<![CDATA[import { VillageScene } from "../illustrations/VillageScene";
import { ActivityArt } from "../illustrations/ActivityArt";

const MOMENTS = [
  { time: "Early morning", ja: "朝", title: "Wake with the village.", body: "Slide open the window. Put the kettle on. Somewhere nearby, a neighbour is already tending the garden." },
  { time: "The long afternoon", ja: "昼", title: "Make something of the day.", body: "A little work in the fields. A walk to the local shop. A conversation that lasts longer than you planned." },
  { time: "As evening settles", ja: "夕", title: "Come back to simple things.", body: "Rice on the stove, vegetables from the garden, and time around the table. Outside, the hills grow quiet." },
];

export function RhythmChapter() {
  return <div className="st-rhythm-layout"><VillageScene /><div className="st-rhythm-intro"><span className="st-japanese-title" lang="ja">日々を、ていねいに。</span><h2>Here, the little things<br />fill <em>the whole day.</em></h2><p>Rural life has work, weather, and responsibilities of its own. Its quiet beauty lives in the familiar rituals between them.</p><div className="st-tea-picture"><ActivityArt scene="tea" /><span lang="ja">お茶にしましょう。<small>Shall we have some tea?</small></span></div></div><div className="st-journal">{MOMENTS.map((moment, index) => <article className="st-journal-entry" key={moment.ja} style={{ "--st-i": index } as React.CSSProperties}><div className="st-journal-time"><span>{moment.time}</span><span lang="ja">{moment.ja}</span></div><h3>{moment.title}</h3><p>{moment.body}</p></article>)}</div></div>;
}
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/chapters/SeasonsChapter.tsx">
<![CDATA[import { Seasons } from "../deck/Seasons";

export function SeasonsChapter() { return <Seasons />; }
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/chapters/Welcome.tsx">
<![CDATA[import { Arrow, Leaf } from "../brand/Icons";
import { MeadowScene } from "../illustrations/MeadowScene";

export function Welcome() {
  return <>
    <MeadowScene />
    <div className="st-hero-copy">
      <div className="st-kicker"><span className="st-small-rule" /> A SLOWER KIND OF DAY <span lang="ja">里山日和</span></div>
      <h1><span>A little closer to nature.</span><span>A little closer <em>to yourself.</em></span></h1>
      <p>Where the mountains breathe, the seasons linger,<br className="st-desktop-break" /> and the everyday feels a little more meaningful.</p>
      <a className="st-primary" href="#the-landscape"><Leaf /><span>Let’s wander a while</span><Arrow /></a>
      <div className="st-reading-note">An illustrated journey into rural Japan <span>—</span> at your own pace.</div>
    </div>
    <div className="st-vertical-poem" lang="ja"><span>何もない日が、</span><span>いちばん豊かな日になる。</span></div>
    <div className="st-landscape-label"><span className="st-label-line" /><span lang="ja">山と、田んぼと、小さな暮らし。</span><span>Mountains. Rice fields. A life in between.</span></div>
  </>;
}
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/deck/ActivityCarousel.tsx">
<![CDATA["use client";

import { useRef, useState, type CSSProperties } from "react";
import { ActivityArt } from "../illustrations/ActivityArt";
import { ACTIVITIES } from "./chapters";
import { wrapActivity } from "./logic";

export function ActivityCarousel() {
  const [index, setIndex] = useState(0);
  const start = useRef<number | null>(null);
  const go = (delta: number) => setIndex((value) => wrapActivity(value + delta, ACTIVITIES.length));
  return <div className="st-carousel" data-index={index} role="region" aria-roledescription="carousel" aria-label="Rural activities" onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); event.stopPropagation(); go(event.key === "ArrowRight" ? 1 : -1); } }} tabIndex={0}
    onTouchStart={(event) => { start.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (start.current !== null) { const delta = event.changedTouches[0].clientX - start.current; if (Math.abs(delta) > 45) go(delta < 0 ? 1 : -1); } start.current = null; }}>
    <div className="st-carousel-window"><div className="st-carousel-track" style={{ "--st-card-index": index } as CSSProperties}>{[...ACTIVITIES, ...ACTIVITIES.slice(0, 2)].map((activity, i) => <article key={`${activity.id}-${i}`} className="st-activity" aria-hidden={i >= ACTIVITIES.length ? true : undefined} aria-label={`${i % ACTIVITIES.length + 1} of ${ACTIVITIES.length}: ${activity.title}`} aria-roledescription="slide"><div className="st-activity-picture"><ActivityArt scene={activity.scene} /><span className="st-activity-ja" lang="ja">{activity.japanese}</span><span className="st-postcard-number">0{i % ACTIVITIES.length + 1}</span></div><span className="st-activity-tag">{activity.tag}</span><h3>{activity.title}</h3><p>{activity.description}</p></article>)}</div></div>
    <div className="st-carousel-controls"><span className="st-carousel-caption">A few ways to spend a good day <span lang="ja">小さな楽しみ</span></span><span className="st-sr-only" aria-live="polite">Activity {index + 1} of {ACTIVITIES.length}</span></div>
  </div>;
}
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/deck/chapters.ts">
<![CDATA[export const CHAPTERS = [
  { id: "welcome", label: "Welcome", japanese: "はじまり", title: "A little closer to nature.\nA little closer to yourself.", note: "An illustrated journey into rural Japan" },
  { id: "the-landscape", label: "The landscape", japanese: "里山の風景", title: "Between the mountains,\na world of its own.", note: "Mountains, rice fields, and the places in between" },
  { id: "a-slower-rhythm", label: "A slower rhythm", japanese: "日々の暮らし", title: "Here, the little things\nfill the whole day.", note: "A day shaped by sunlight, shared meals, and small rituals" },
  { id: "little-adventures", label: "Little adventures", japanese: "小さな冒険", title: "Leave room for\na little wandering.", note: "Ordinary moments. Rather extraordinary memories." },
  { id: "the-seasons", label: "The seasons", japanese: "めぐる季節", title: "The same little village.\nFour different worlds.", note: "A life that changes with the turning of the seasons" },
  { id: "until-next-time", label: "Until next time", japanese: "また、いつか", title: "Take a little of\nthe quiet with you.", note: "Some places stay with you, long after you leave." },
] as const;

export const ACTIVITIES = [
  { id: "fields", japanese: "田んぼの時間", title: "Into the rice fields", description: "Follow the narrow paths between paddies. Watch the water catch the sky, and let the afternoon take its time.", tag: "OUT IN THE OPEN", scene: "fields" },
  { id: "tea", japanese: "お茶のひととき", title: "A cup, and a pause", description: "Sit by the open window with a warm cup of tea. In the distance, a breeze moves through the bamboo.", tag: "A SMALL DAILY RITUAL", scene: "tea" },
  { id: "cycle", japanese: "自転車で、どこまでも", title: "Take the scenic way", description: "Pedal past wooden houses and kitchen gardens. Turn down the lane you almost missed. There is no hurry to arrive.", tag: "FOLLOW YOUR CURIOSITY", scene: "cycle" },
  { id: "garden", japanese: "畑から食卓へ", title: "From garden to table", description: "Pick what is ready, wash it in cool water, and make something simple. The best ingredient is the season.", tag: "GROWN CLOSE TO HOME", scene: "garden" },
  { id: "river", japanese: "川辺の午後", title: "An afternoon by the river", description: "Find a smooth stone and a shady spot beside the stream. Stay for the sound of water making its own way home.", tag: "NOWHERE ELSE TO BE", scene: "river" },
] as const;

export const SEASONS = [
  { name: "Spring", japanese: "春", line: "New beginnings, on every branch.", description: "Blossoms soften the lanes. Seedlings find their place in the paddies, and the village begins again." },
  { name: "Summer", japanese: "夏", line: "Long days, and the song of cicadas.", description: "Rice grows green, rivers run cool, and open windows let the warm evening wander through the house." },
  { name: "Autumn", japanese: "秋", line: "A golden field. A grateful table.", description: "The harvest brings busy hands and shared meals. Mountain paths turn copper, one leaf at a time." },
  { name: "Winter", japanese: "冬", line: "The quiet has a season, too.", description: "Bare branches trace the sky. Tea steams by the window, and the hills rest beneath a pale winter light." },
] as const;
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/deck/logic.ts">
<![CDATA[import { CHAPTERS } from "./chapters";

export function moveChapter(current: number, delta: number, count: number): number {
  return Math.max(0, Math.min(count - 1, current + delta));
}

export function chapterIndex(hash: string): number {
  const index = CHAPTERS.findIndex((chapter) => chapter.id === hash.replace(/^#/, ""));
  return Math.max(0, index);
}

export function wrapActivity(index: number, count: number): number {
  return ((index % count) + count) % count;
}

export function wheelDirection(deltaX: number, deltaY: number): 1 | -1 | 0 {
  const absX = Math.abs(deltaX);
  const absY = Math.abs(deltaY);
  if (absX < 8 && absY < 8) return 0;
  const delta = absY >= absX ? deltaY : deltaX;
  return delta > 0 ? 1 : -1;
}

export function extractContour(d: string): string {
  return d.replace(/V\d+.*Z$/i, "").replace(/Z$/i, "");
}
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/deck/PictureBook.tsx">
<![CDATA["use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Logo } from "../brand/Logo";
import { Arrow, Leaf, PauseIcon } from "../brand/Icons";
import { useAmbient } from "../motion/useAmbient";
import { useReducedMotion } from "../motion/useReducedMotion";
import { CHAPTERS } from "./chapters";
import { chapterIndex, moveChapter, wheelDirection } from "./logic";

export function PictureBook({ pages }: { pages: ReactNode[] }) {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const { paused, stopped, toggle } = useAmbient();
  const reduced = useReducedMotion();
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const wheelLockRef = useRef(0);
  const navRef = useRef<HTMLElement>(null);
  const chapter = CHAPTERS[active];

  const go = useCallback((index: number) => {
    const next = moveChapter(index, 0, CHAPTERS.length);
    setActive(next);
    if (window.location.hash !== `#${CHAPTERS[next].id}`) window.history.pushState(null, "", `#${CHAPTERS[next].id}`);
    if (reduced) document.getElementById(CHAPTERS[next].id)?.scrollIntoView({ behavior: "instant" });
  }, [reduced]);

  useEffect(() => {
    const sync = () => setActive(chapterIndex(window.location.hash));
    const frame = requestAnimationFrame(() => { sync(); setReady(true); });
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("hashchange", sync); window.removeEventListener("popstate", sync); };
  }, []);

  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || (event.target instanceof Element && event.target.closest("button,a,input,select,textarea,[contenteditable=true],[role=tablist]"))) return;
      const next = event.key === "ArrowRight" || event.key === "PageDown" ? active + 1 : event.key === "ArrowLeft" || event.key === "PageUp" ? active - 1 : event.key === "Home" ? 0 : event.key === "End" ? CHAPTERS.length - 1 : null;
      if (next !== null) { event.preventDefault(); go(next); }
    };
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [active, go]);

  useEffect(() => {
    if (reduced) return;

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable=true]")) return;

      const direction = wheelDirection(event.deltaX, event.deltaY);
      if (direction === 0) return;

      const activeChapter = document.querySelector<HTMLElement>('.st-chapter[data-state="active"]');
      if (activeChapter && Math.abs(event.deltaY) >= Math.abs(event.deltaX)) {
        const canScrollDown = activeChapter.scrollHeight > activeChapter.clientHeight + 4 &&
          activeChapter.scrollTop + activeChapter.clientHeight < activeChapter.scrollHeight - 6;
        const canScrollUp = activeChapter.scrollHeight > activeChapter.clientHeight + 4 &&
          activeChapter.scrollTop > 6;

        if ((direction > 0 && canScrollDown) || (direction < 0 && canScrollUp)) {
          return;
        }
      }

      const now = Date.now();
      if (now < wheelLockRef.current) return;

      const next = moveChapter(active, direction, CHAPTERS.length);
      if (next !== active) {
        event.preventDefault();
        wheelLockRef.current = now + 650;
        go(next);
      } else {
        wheelLockRef.current = now + 250;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [active, go, reduced]);

  useEffect(() => {
    const link = navRef.current?.querySelector<HTMLElement>('[aria-current="page"]');
    if (link && navRef.current) navRef.current.scrollTo({ left: link.offsetLeft - navRef.current.clientWidth / 2 + link.clientWidth / 2, behavior: "instant" });
  }, [active]);

  useEffect(() => {
    if (!reduced) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(chapterIndex(visible.target.id));
    }, { threshold: .5 });
    document.querySelectorAll('.st-chapter').forEach(element => observer.observe(element));
    return () => observer.disconnect();
  }, [reduced]);

  return <div className="st-book" data-ready={ready} data-paused={stopped} style={{ "--st-active": active } as CSSProperties}>
    <a className="st-skip" href="#st-reading">Skip to the chapter</a>
    <header className="st-header">
      <Logo />
      <nav className="st-navigation" aria-label="Chapters" ref={navRef}>
        {CHAPTERS.map((item, index) => <a key={item.id} href={`#${item.id}`} aria-current={active === index ? "page" : undefined} onClick={(event) => { event.preventDefault(); go(index); }}><span className="st-nav-number">0{index + 1}</span>{item.label}</a>)}
      </nav>
      <a className="st-header-note" href="#little-adventures"><Leaf /><span>Take the slow way</span><Arrow /></a>
    </header>
    <main id="st-reading" className="st-stage" tabIndex={-1}
      onTouchStart={(event) => { if (!(event.target instanceof Element) || event.target.closest(".st-carousel,[role=tablist]")) return; touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }}
      onTouchEnd={(event) => { const start = touchStart.current; touchStart.current = null; if (!start) return; const dx = event.changedTouches[0].clientX - start.x; const dy = event.changedTouches[0].clientY - start.y; if (Math.abs(dx) > 75 && Math.abs(dx) > Math.abs(dy) * 1.5) go(active + (dx < 0 ? 1 : -1)); }}>
      {CHAPTERS.map((item, index) => <section key={item.id} className="st-chapter" id={item.id} data-state={active === index ? "active" : index < active ? "past" : "future"} aria-label={`${index + 1} of ${CHAPTERS.length}: ${item.label}`} aria-roledescription="slide" inert={ready && !reduced && active !== index ? true : undefined}>{pages[index]}</section>)}
      <div className="st-scene-caption"><span className="st-caption-dot" /> A SMALL WINDOW INTO RURAL JAPAN <span className="st-caption-jp" lang="ja">日本の田舎暮らし</span></div>
      <button className="st-ambient st-js-control" onClick={toggle} aria-label={paused ? "Play landscape animation" : "Pause landscape animation"} aria-pressed={paused}><PauseIcon paused={paused} /><span>{paused ? "Still for a moment" : "A living landscape"}</span></button>
    </main>
    <footer className="st-bottom">
      <div className="st-page-label"><span className="st-page-numeral">0{active + 1}</span><span className="st-page-line" /><span lang="ja">{chapter.japanese}</span><span className="st-page-total">/ 06</span></div>
      <div className="st-page-dots st-js-control" role="group" aria-label="Go to chapter">{CHAPTERS.map((item, index) => <button key={item.id} aria-label={`Chapter ${index + 1}: ${item.label}`} aria-current={active === index ? "step" : undefined} onClick={() => go(index)}><span /></button>)}</div>
      <div className="st-page-actions"><span className="st-key-hint">A story in six chapters <span>·</span> scroll or use <kbd>←</kbd> <kbd>→</kbd></span><button className="st-arrow-button st-js-control" aria-label="Previous chapter" disabled={active === 0} onClick={() => go(active - 1)}><Arrow direction="left" /></button><button className="st-arrow-button st-js-control" aria-label="Next chapter" disabled={active === CHAPTERS.length - 1} onClick={() => go(active + 1)}><Arrow /></button></div>
    </footer>
    <div className="st-sr-only" aria-live="polite" aria-atomic="true">Chapter {active + 1} of 6: {chapter.label}</div>
  </div>;
}
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/deck/Seasons.tsx">
<![CDATA["use client";

import { useState } from "react";
import { AutumnScene, SpringScene, SummerScene, WinterScene } from "../illustrations/SeasonScenes";
import { SEASONS } from "./chapters";

export function Seasons() {
  const [season, setSeason] = useState(0);
  const current = SEASONS[season];
  return <div className="st-seasons" data-season={season}><div className="st-season-stack">{[SpringScene, SummerScene, AutumnScene, WinterScene].map((Scene, index) => <div key={index} className="st-season-layer" data-on={season === index} aria-hidden={season === index ? undefined : true}><Scene /></div>)}</div><div className="st-season-copy"><span className="st-japanese-title" lang="ja">季節と、ともに暮らす。</span><h2>The same little village.<br /><em>Four different worlds.</em></h2><div className="st-season-tabs" role="tablist" aria-label="Choose a season">{SEASONS.map((item, index) => <button id={`st-season-${index}`} key={item.name} role="tab" aria-selected={season === index} aria-controls="st-season-panel" tabIndex={season === index ? 0 : -1} onClick={() => setSeason(index)} onKeyDown={(event) => { let next: number | null = null; if (event.key === "ArrowRight") next = (index + 1) % 4; if (event.key === "ArrowLeft") next = (index + 3) % 4; if (event.key === "Home") next = 0; if (event.key === "End") next = 3; if (next !== null) { event.preventDefault(); setSeason(next); document.getElementById(`st-season-${next}`)?.focus(); } }}><span lang="ja">{item.japanese}</span>{item.name}</button>)}</div><div id="st-season-panel" className="st-season-panel" role="tabpanel" aria-labelledby={`st-season-${season}`} tabIndex={0} key={season}><h3>{current.line}</h3><p>{current.description}</p></div></div><span className="st-season-kanji" lang="ja" aria-hidden="true">{current.japanese}</span></div>;
}
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/illustrations/ActivityArt.tsx">
<![CDATA[import { useId } from "react";
import { Bicycle, Grass, House } from "./SceneElements";
import { Cumulus, PaintedTree, Ridge } from "./Painted";

export function ActivityArt({ scene }: { scene: string }) {
  const sky = useId().replace(/:/g, "");
  return <svg viewBox="0 0 440 310" fill="none" className="st-activity-art" role="img" aria-label={{ fields: "Rice paddies below green mountains", tea: "A steaming teapot and cup beside an open window", cycle: "A bicycle on a quiet village lane", garden: "Fresh vegetables in a woven garden basket", river: "Stepping stones in a tree-lined stream" }[scene] ?? "Rural Japan illustration"}>
    <defs><linearGradient id={sky} x1="0" y1="0" x2="0" y2="1"><stop stopColor="var(--st-sky-top)" /><stop offset=".55" stopColor="var(--st-sky-mid)" /><stop offset=".8" stopColor="var(--st-sky-low)" /></linearGradient></defs>
    <path d="M0 0h440v310H0Z" fill={`url(#${sky})`} /><circle cx="332" cy="67" r="29" fill="var(--st-sun)" opacity=".85" />
    <Cumulus x={86} y={118} scale={.34} /><Cumulus x={300} y={102} scale={.22} flip />
    <Ridge d="M0 151 67 80l78 63 65-47 83 51 79-48 68 28v183H0Z" top="var(--st-mtn-far)" bottom="var(--st-mtn-haze)" /><Ridge d="M0 188c80-80 101-15 164-20s88-70 150-38 74 18 126 9v171H0Z" top="var(--st-meadow-lit)" bottom="var(--st-meadow)" />
    {scene === "fields" && <><House x={271} y={182} scale={.36} rose /><path d="m0 218 440-22v114H0Z" fill="var(--st-water)" /><path d="m0 236 440-20M0 274l440-25m-218-41L111 310m244-108L291 310" stroke="var(--st-forest)" strokeWidth="7" />{Array.from({length:38},(_,i)=><path key={i} d={`m${(i*37)%440} ${228+Math.floor(i/12)*29} -3-8m3 8 4-10`} stroke="var(--st-midgreen)" strokeWidth="2" />)}<PaintedTree x={23} y={231} scale={.6} /></>}
    {scene === "tea" && <><path d="M0 0h440v310H0V0Zm26 0v230m249-230v225M0 225h440M280 0v225" stroke="var(--st-timber)" strokeWidth="16" /><path d="M0 234h440v76H0Z" fill="var(--st-path)" /><path d="m111 278 199-3 38 14-258 3Z" fill="var(--st-timber)" opacity=".13" /><path d="M167 248c-12-68 67-78 73-12l-10 34h-54Z" fill="var(--st-roof-rose)" /><path d="M230 226c23-27 31-14 13 5m-65-13h53m-36-9 17-3m-3-2v-8" stroke="var(--st-ink)" strokeWidth="3" /><path d="m169 233-29-12 10 28 28 8" fill="var(--st-rose)" /><path d="M274 248h35l-4 26h-26Z" fill="var(--st-paper)" stroke="var(--st-timber)" strokeWidth="2" /><path d="M309 252c19-7 20 17-2 13" stroke="var(--st-timber)" strokeWidth="3" /><path d="M289 233c-10-13 12-14 0-29m-83-25c-9-11 12-18 0-31" stroke="var(--st-paper)" strokeWidth="4" strokeLinecap="round" /><path d="M0 22c39 59 23 125 20 171M437 16c-47 63-29 119-29 179" stroke="var(--st-leaf)" strokeWidth="34" /></>}
    {scene === "cycle" && <><path d="M210 173c-47 66-71 76-91 137h155c-52-72-46-93-34-137Z" fill="var(--st-path)" /><House x={52} y={205} scale={.48} rose /><PaintedTree x={345} y={251} scale={.95} /><Bicycle x={158} y={275} scale={1.25} /><Grass x={54} y={292} /><Grass x={355} y={299} /></>}
    {scene === "garden" && <><path d="M0 205h440v105H0Z" fill="var(--st-field)" />{[220,248,283].map(y=><path key={y} d={`M0 ${y}h440`} stroke="var(--st-timber)" strokeWidth="3" opacity=".35" />)}<path d="m140 206 145-3-19 89H157Z" fill="var(--st-path)" stroke="var(--st-timber)" strokeWidth="3" /><path d="M166 207c-8-88 104-88 94 0" stroke="var(--st-timber)" strokeWidth="5" />{[220,234,249,265,279].map(y=><path key={y} d={`m151 ${y} 124-4`} stroke="var(--st-timber)" strokeWidth="2" opacity=".5" />)}<ellipse cx="183" cy="203" rx="23" ry="25" fill="var(--st-rose)" /><path d="m219 215 22-44 18 9-27 43Z" fill="var(--st-roof-rose)" /><path d="M238 180c-21-49 7-44 9-18 8-30 28-23 10 14" stroke="var(--st-forest)" strokeWidth="7" /><path d="M191 183c-28-36-3-51 8-14 10-37 34-22 10 12" fill="var(--st-forest)" /><PaintedTree x={33} y={214} scale={.62} /></>}
    {scene === "river" && <><path d="M247 163c-106 50-26 73-126 101L58 310h273c-92-74 55-75-57-147Z" fill="var(--st-water)" /><path d="m199 241 24-5m-73 40 37-9m62 22 38 4m-34-91 15 5" stroke="var(--st-paper)" strokeWidth="2" /><path d="m192 261 26-6 19 9-9 10h-38Zm50-21 19-2 12 6-10 10h-25Z" fill="var(--st-mountain)" stroke="var(--st-forest)" /><PaintedTree x={47} y={239} scale={1} /><PaintedTree x={398} y={277} scale={1.2} /><Grass x={86} y={299} scale={1.2}/></>}
  </svg>;
}
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/illustrations/DuskScene.tsx">
<![CDATA[import { Blades, Cumulus, CumulusOutline, Firefly, Glow, PaintedTree, Ridge, RidgeSketch, SceneSvg, SketchPath, Sky, Stratus, TreeSketch } from "./Painted";

/* Until next time: the sun going down behind the ridge, paddies holding the last light, lanterns coming on. */
export function DuskScene() {
  const r1 = "M0 590C130 540 240 500 340 530 430 450 520 446 590 520 700 470 760 520 800 580 900 500 1010 470 1110 534 1200 490 1300 510 1380 566 1460 540 1540 546 1600 570V900H0Z";
  const r2 = "M0 650C200 596 400 590 600 636 800 682 960 612 1160 604 1360 596 1500 626 1600 644V900H0Z";
  const r3 = "M0 860C300 830 700 846 1000 868 1260 886 1440 860 1600 842V900H0Z";

  return <SceneSvg className="st-scene-dusk" label="A painted dusk: the sun sinking behind layered ridges, rose-lit clouds, paddies holding the last gold light and paper lanterns glowing along the lane.">
    <g className="st-sketch-lines" aria-hidden="true">
      <circle cx="1110" cy="516" r="70" pathLength={100} className="st-sketch-path" data-depth="far" />
      <CumulusOutline x={330} y={520} scale={1.15} depth="far" />
      <CumulusOutline x={1500} y={540} scale={1.2} flip depth="far" />
      <RidgeSketch d={r1} depth="far" />
      <RidgeSketch d={r2} depth="mid" />
      {[[706, 40], [770, 56], [846, 66], [940, 78]].map(([top]) => (
        <SketchPath key={top} d={`M-40 ${top}C300 ${top - 8} 800 ${top + 6} 1640 ${top - 4}`} depth="mid" />
      ))}
      <SketchPath d="M760 724h90M700 760h210M650 806h300M610 860h380" depth="mid" />
      <RidgeSketch d={r3} depth="near" />
      <SketchPath d="M1230 806V690M1370 800V700M1230 704C1280 724 1330 724 1370 708" depth="near" />
      {[1262, 1300, 1338].map((x, i) => (
        <ellipse key={x} cx={x} cy={724 + (i % 2) * 6} rx="9" ry="12" pathLength={100} className="st-sketch-path" data-depth="near" />
      ))}
      <TreeSketch x={1500} y={900} scale={1.9} depth="near" />
      <TreeSketch x={60} y={900} scale={2.3} depth="near" />
    </g>
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
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/illustrations/ForestScene.tsx">
<![CDATA[import { Blades, Flowers, Glow, Ridge, RidgeSketch, SceneSvg, SketchPath, Sky, seeded } from "./Painted";

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
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/illustrations/MeadowScene.tsx">
<![CDATA[import { Birds, Blades, Cumulus, CumulusOutline, Farmhouse, FarmhouseSketch, Flowers, Glow, PaintedTree, Ridge, RidgeSketch, SceneSvg, SketchPath, Sky, Stratus, TreeSketch } from "./Painted";

/* Welcome: a high-summer meadow under towering clouds, with a great tree on the hill and a path home. */
export function MeadowScene() {
  const r1 = "M0 540C110 490 190 450 290 476 380 380 470 372 540 450 640 410 720 450 800 500 900 430 1010 392 1110 458 1200 410 1300 430 1380 500 1460 470 1540 478 1600 506V900H0Z";
  const r2 = "M0 596C150 530 280 520 420 560 560 510 700 520 820 580 960 540 1100 520 1240 566 1380 540 1500 560 1600 590V900H0Z";
  const r3 = "M0 650C200 590 420 580 640 630 860 680 1000 590 1200 574 1400 560 1500 600 1600 618V900H0Z";
  const r4 = "M640 760C820 660 1040 610 1260 618 1420 626 1530 668 1600 690V900H640Z";
  const r5 = "M0 760C150 696 340 688 540 726 700 756 820 790 930 810V900H0Z";
  const r6 = "M0 836C260 780 640 800 960 840 1220 870 1440 830 1600 800V900H0Z";

  return <SceneSvg label="A painted summer meadow under towering clouds, with a farmhouse, a winding path and a great tree on the hill.">
    <g className="st-sketch-lines" aria-hidden="true">
      <CumulusOutline x={760} y={540} scale={1.7} depth="far" />
      <CumulusOutline x={1230} y={500} scale={1.25} depth="far" />
      <RidgeSketch d={r1} depth="far" />
      <RidgeSketch d={r2} depth="far" />
      <RidgeSketch d={r3} depth="mid" />
      <RidgeSketch d={r4} depth="mid" />
      <TreeSketch x={1090} y={640} scale={1.5} depth="near" />
      <TreeSketch x={1330} y={662} scale={.62} depth="mid" />
      <RidgeSketch d={r5} depth="near" />
      <FarmhouseSketch x={330} y={716} scale={.6} depth="near" />
      <TreeSketch x={186} y={724} scale={.5} depth="near" />
      <SketchPath d="M700 900C740 836 640 812 560 786 480 760 440 736 410 718" depth="near" />
      <RidgeSketch d={r6} depth="near" />
    </g>
    <g className="st-paint-wash">
      <g className="st-paint-layer" data-depth="sky">
        <Sky stops={[[0, "var(--st-sky-top)"], [.55, "var(--st-sky-mid)"], [.7, "var(--st-sky-low)"]]} />
        <Glow x={1150} y={420} r={560} />
        <Stratus x={150} y={150} width={400} />
        <Stratus x={930} y={110} width={300} />
      </g>
      <g className="st-paint-layer" data-depth="far">
        <g className="st-clouds">
          <Cumulus x={760} y={540} scale={1.7} />
          <Cumulus x={1230} y={500} scale={1.25} />
          <Cumulus x={200} y={560} scale={1.05} flip />
          <Cumulus x={1520} y={580} scale={.85} />
        </g>
        <Birds x={1010} y={250} scale={1.1} />
        <Ridge d={r1} top="var(--st-mtn-far)" bottom="var(--st-mtn-haze)" />
        <Ridge d={r2} top="var(--st-mtn-mid)" bottom="var(--st-mtn-haze)" />
      </g>
      <g className="st-paint-layer" data-depth="mid">
        <Ridge d={r3} top="var(--st-meadow-lit)" bottom="var(--st-leaf)" />
        <Ridge d={r4} top="var(--st-meadow-lit)" bottom="var(--st-meadow)" />
        <PaintedTree x={1090} y={640} scale={1.5} />
        <PaintedTree x={1330} y={662} scale={.62} />
        <PaintedTree x={960} y={664} scale={.42} />
        <Ridge d={r5} top="var(--st-meadow-lit)" bottom="var(--st-meadow)" />
        <Farmhouse x={330} y={716} scale={.6} glow />
        <PaintedTree x={186} y={724} scale={.5} />
        <PaintedTree x={500} y={742} scale={.42} />
      </g>
      <g className="st-paint-layer" data-depth="near">
        <path d="M700 900C740 836 640 812 560 786 480 760 440 736 410 718L438 714C480 738 530 758 620 786 730 820 850 850 850 900Z" fill="var(--st-path)" opacity=".92" />
        <Ridge d={r6} top="var(--st-meadow)" bottom="var(--st-hill)" />
        <g className="st-grasses">
          <Blades x={0} y={840} w={1600} h={60} count={120} seed={7} size={46} stroke="var(--st-meadow-lit)" lean={1} width={2.4} />
          <Blades x={0} y={850} w={1600} h={50} count={90} seed={19} size={38} stroke="var(--st-forest)" lean={1} width={2.2} />
          <Blades x={0} y={700} w={900} h={110} count={110} seed={3} size={20} stroke="var(--st-meadow-lit)" lean={1} width={1.6} />
          <Blades x={900} y={690} w={700} h={110} count={90} seed={11} size={18} stroke="var(--st-meadow-lit)" lean={1} width={1.6} />
        </g>
        <Flowers x={40} y={800} w={760} h={96} count={26} seed={5} colors={["var(--st-paper)", "var(--st-rose)", "var(--st-sun)"]} />
        <Flowers x={930} y={790} w={640} h={106} count={22} seed={9} colors={["var(--st-paper)", "var(--st-sun)", "var(--st-rose)"]} />
      </g>
    </g>
  </SceneSvg>;
}
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/illustrations/Painted.tsx">
<![CDATA[import { useId, type ReactNode } from "react";
import { extractContour } from "../deck/logic";

/* Painted-anime scene primitives: soft gradients, billowing clouds, clumped canopies and wind-leaning grass.
   All randomness is a seeded integer generator so server and client render identical markup. */

export function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

const f = (value: number) => Math.round(value * 10) / 10;
const clean = (id: string) => id.replace(/:/g, "");

type Billow = readonly [number, number, number];
const BILLOWS: readonly Billow[] = [[0, -8, 62], [78, -40, 90], [172, -30, 80], [246, -6, 56], [-62, 6, 42], [120, -2, 70]];

export function SketchPath({ d, depth = "mid", className = "", strokeWidth }: { d: string; depth?: "far" | "mid" | "near"; className?: string; strokeWidth?: number }) {
  return <path d={d} pathLength={100} className={`st-sketch-path ${className}`.trim()} data-depth={depth} strokeWidth={strokeWidth} />;
}

export function RidgeSketch({ d, depth = "mid" }: { d: string; depth?: "far" | "mid" | "near" }) {
  const contour = extractContour(d);
  return <path d={contour} pathLength={100} className="st-sketch-path" data-depth={depth} />;
}

export function CumulusOutline({ x, y, scale = 1, flip = false, depth = "far" }: { x: number; y: number; scale?: number; flip?: boolean; depth?: "far" | "mid" | "near" }) {
  return <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`} className="st-sketch-cumulus">
    {BILLOWS.map(([cx, cy, r], i) => (
      <circle key={i} cx={cx} cy={cy} r={r} pathLength={100} className="st-sketch-path" data-depth={depth} />
    ))}
  </g>;
}

export function Cumulus({ x, y, scale = 1, flip = false }: { x: number; y: number; scale?: number; flip?: boolean }) {
  const id = clean(useId());
  return <g transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}>
    <clipPath id={`${id}-cut`}><rect x="-140" y="-220" width="520" height="248" /></clipPath>
    <g clipPath={`url(#${id}-cut)`}>
      <g fill="var(--st-cloud-shade)">{BILLOWS.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy + 12} r={r} />)}</g>
      <g fill="var(--st-cloud)">{BILLOWS.map(([cx, cy, r], i) => <circle key={i} cx={cx - 4} cy={cy - 3} r={r * 1.0} />)}</g>
      <g fill="var(--st-cloud-lit)" opacity=".92">{BILLOWS.map(([cx, cy, r], i) => <circle key={i} cx={cx - 12} cy={cy - 16} r={r * .66} />)}</g>
    </g>
  </g>;
}

export function Stratus({ x, y, width = 320 }: { x: number; y: number; width?: number }) {
  return <g fill="var(--st-cloud)" opacity=".7">
    <rect x={x} y={y} width={width} height="9" rx="4.5" />
    <rect x={x + width * .18} y={y + 17} width={width * .66} height="7" rx="3.5" opacity=".75" />
    <rect x={x - width * .08} y={y + 32} width={width * .4} height="5" rx="2.5" opacity=".55" />
  </g>;
}

export function Ridge({ d, top, bottom, opacity }: { d: string; top: string; bottom: string; opacity?: number }) {
  const id = clean(useId());
  return <>
    <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop stopColor={top} /><stop offset="1" stopColor={bottom} /></linearGradient></defs>
    <path d={d} fill={`url(#${id})`} opacity={opacity} />
  </>;
}

export function Blades({ x, y, w, h, count, seed, size, stroke, lean = 1, width = 2 }: { x: number; y: number; w: number; h: number; count: number; seed: number; size: number; stroke: string; lean?: number; width?: number }) {
  const next = seeded(seed);
  let d = "";
  for (let i = 0; i < count; i++) {
    const bx = x + next() * w;
    const t = next();
    const by = y + t * h;
    const bh = size * (.5 + t);
    const l = lean * bh * (.25 + next() * .3);
    d += `M${f(bx)} ${f(by)}q${f(l * .2)} ${f(-bh * .55)} ${f(l)} ${f(-bh)}`;
  }
  return <path d={d} stroke={stroke} strokeWidth={width} strokeLinecap="round" fill="none" />;
}

export function Flowers({ x, y, w, h, count, seed, colors, radius = 3 }: { x: number; y: number; w: number; h: number; count: number; seed: number; colors: readonly string[]; radius?: number }) {
  const next = seeded(seed);
  return <g>{Array.from({ length: count }, (_, i) => {
    const t = next();
    return <circle key={i} cx={f(x + next() * w)} cy={f(y + t * h)} r={f(radius * (.6 + t * .8))} fill={colors[i % colors.length]} />;
  })}</g>;
}

const CANOPY: readonly Billow[] = [[-48, -112, 50], [24, -132, 58], [74, -86, 44], [-74, -72, 40], [0, -80, 58]];

/* Small leaf clusters riding the upper-left arc of each big mass: they scallop the silhouette and carry the light. */
const LEAVES: readonly (readonly [number, number, number, boolean])[] = CANOPY.flatMap(([cx, cy, r], k) => Array.from({ length: 8 }, (_, i) => {
  const angle = ((-170 + i * 20 + k * 9) * Math.PI) / 180;
  return [f(cx + Math.cos(angle) * r * .8), f(cy + Math.sin(angle) * r * .8), f(r * (.24 + ((i + k) % 3) * .05)), i > 0 && i < 5] as const;
}));

export function PaintedTree({ x, y, scale = 1, kind = "round", dark = "var(--st-tree-dark)", mid = "var(--st-tree-mid)", lit = "var(--st-tree-lit)", trunk = "var(--st-timber)", snow = false }: { x: number; y: number; scale?: number; kind?: "round" | "cedar" | "bare"; dark?: string; mid?: string; lit?: string; trunk?: string; snow?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {kind === "cedar" ? <>
      <path d="M-4 0 -2-60h7L8 0Z" fill={trunk} />
      <path d="M0-212-46-120l16-4-52 62 22-3-60 66h240L20-65l22 3-52-62 16 4Z" fill={dark} transform="scale(.62) translate(0 52)" />
      <path d="M0-198-24-128l10-3-34 52 17-2-30 40h60L-12-58l16 2Z" fill={mid} transform="scale(.62) translate(10 52)" opacity=".75" />
      {snow && <path d="M-36-96q36-18 72 0l-12 5q-24-10-48 0ZM-52-58q52-20 104 0l-14 6q-38-12-76 0Z" fill="var(--st-snow)" />}
    </> : kind === "bare" ? <>
      <path d="M-5 0 -2-98h7L9 0Z" fill={trunk} />
      <path d="M2-70-40-118M3-90 44-140M0-100-18-160M2-112 24-168M-26-134-52-156M34-150 62-160M-40-118-70-124" stroke={trunk} strokeWidth="5" strokeLinecap="round" fill="none" />
      {snow && <path d="M-44-120-36-124M40-142 50-146M-20-162-14-168M22-170 30-176" stroke="var(--st-snow)" strokeWidth="6" strokeLinecap="round" />}
    </> : <>
      <path d="m-6 0 3-98h8L10 0Z" fill={trunk} />
      <path d="M2-62-30-98M3-80 34-114" stroke={trunk} strokeWidth="5" strokeLinecap="round" fill="none" />
      <g fill={dark}>{CANOPY.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} />)}</g>
      <g fill={mid}>{LEAVES.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} />)}</g>
      <g fill={mid}>{CANOPY.map(([cx, cy, r], i) => <circle key={i} cx={cx - 9} cy={cy - 6} r={r * .62} opacity=".55" />)}</g>
      <g fill={lit}>{LEAVES.filter(leaf => leaf[3]).map(([cx, cy, r], i) => <circle key={i} cx={cx - 4} cy={cy - 4} r={r * .62} />)}</g>
    </>}
  </g>;
}

export function TreeSketch({ x, y, scale = 1, kind = "round", depth = "mid" }: { x: number; y: number; scale?: number; kind?: "round" | "cedar" | "bare"; depth?: "far" | "mid" | "near" }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {kind === "cedar" ? <>
      <path d="M-4 0 -2-60h7L8 0Z" pathLength={100} className="st-sketch-path" data-depth={depth} />
      <path d="M0-212-46-120l16-4-52 62 22-3-60 66h240L20-65l22 3-52-62 16 4Z" transform="scale(.62) translate(0 52)" pathLength={100} className="st-sketch-path" data-depth={depth} />
    </> : kind === "bare" ? <>
      <path d="M-5 0 -2-98h7L9 0Z" pathLength={100} className="st-sketch-path" data-depth={depth} />
      <path d="M2-70-40-118M3-90 44-140M0-100-18-160M2-112 24-168M-26-134-52-156M34-150 62-160M-40-118-70-124" pathLength={100} className="st-sketch-path" data-depth={depth} />
    </> : <>
      <path d="m-6 0 3-98h8L10 0Z" pathLength={100} className="st-sketch-path" data-depth={depth} />
      <path d="M2-62-30-98M3-80 34-114" pathLength={100} className="st-sketch-path" data-depth={depth} />
      {CANOPY.map(([cx, cy, r], i) => <circle key={i} cx={cx} cy={cy} r={r} pathLength={100} className="st-sketch-path" data-depth={depth} />)}
    </>}
  </g>;
}

export function FarmhouseSketch({ x, y, scale = 1, depth = "mid" }: { x: number; y: number; scale?: number; depth?: "far" | "mid" | "near" }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M-106-58-60-136H62L108-58Z" pathLength={100} className="st-sketch-path" data-depth={depth} />
    <path d="M-76-62H80V0H-76Z" pathLength={100} className="st-sketch-path" data-depth={depth} />
    <path d="M-76-30H80M-24-62V0M-66-52H-34V-6H-66ZM-16-52H12V-6H-16ZM34-52H70V-6H34Z" pathLength={100} className="st-sketch-path" data-depth={depth} />
  </g>;
}

export function Farmhouse({ x, y, scale = 1, glow = false, roof = "var(--st-roof)", roofLit = "var(--st-roofshade)" }: { x: number; y: number; scale?: number; glow?: boolean; roof?: string; roofLit?: string }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <ellipse cx="6" cy="6" rx="124" ry="9" fill="var(--st-ink)" opacity=".16" />
    <path d="M-76-62H80V0H-76Z" fill="var(--st-wall)" />
    <path d="M18-62H80V0H18Z" fill="var(--st-wallshade)" opacity=".55" />
    <path d="M-76-62V0M80-62V0M-24-62V0M-76-30H80" stroke="var(--st-timber)" strokeWidth="3.5" opacity=".85" />
    <path d="M-66-52H-34V-6H-66ZM-16-52H12V-6H-16ZM34-52H70V-6H34Z" fill={glow ? "var(--st-sun)" : "var(--st-window)"} />
    <path d="M-50-52V-6M-66-30H-34M-2-52V-6M-16-30H12M52-52V-6M34-30H70" stroke="var(--st-timber)" strokeWidth="2" />
    <path d="M-92 0H96v7H-92Z" fill="var(--st-timber)" />
    <path d="M-106-58-60-136H62L108-58Z" fill={roof} />
    <path d="M-60-136H62L36-96H-36Z" fill={roofLit} opacity=".7" />
    <path d="M-106-58 108-58l-6 9H-100Z" fill="var(--st-ink)" opacity=".28" />
    <path d="M-94-76 98-76M-82-94 86-94M-70-112 74-112M-30-136-44-60M30-136 44-60" stroke="var(--st-ink)" strokeOpacity=".22" strokeWidth="2" />
    <path d="M-64-139H66l-4 7H-60Z" fill="var(--st-timber)" />
  </g>;
}

export function Birds({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g className="st-birds" transform={`translate(${x} ${y}) scale(${scale})`} stroke="var(--st-ink)" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".62">
    <path d="M0 0q9-9 18 0 9-9 17-1M62 26q7-7 14 0 7-7 13-1M-34 34q6-6 12 0 6-6 11-1M96-6q6-5 11 0 5-5 10-1" />
  </g>;
}

export function Firefly({ x, y, r = 4, delay = 0 }: { x: number; y: number; r?: number; delay?: number }) {
  return <g className="st-firefly" style={{ animationDelay: `${delay}s` }}><circle cx={x} cy={y} r={r * 3.2} fill="var(--st-sun)" opacity=".22" /><circle cx={x} cy={y} r={r} fill="var(--st-sun)" /></g>;
}

export function SceneSvg({ label, className = "", children }: { label: string; className?: string; children: ReactNode }) {
  return <svg className={`st-scene ${className}`.trim()} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice" fill="none" role="img" aria-label={label}>{children}</svg>;
}

export function Sky({ stops, height = 900 }: { stops: readonly (readonly [number, string])[]; height?: number }) {
  const id = clean(useId());
  return <>
    <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1">{stops.map(([offset, color]) => <stop key={offset} offset={offset} stopColor={color} />)}</linearGradient></defs>
    <rect width="1600" height={height} fill={`url(#${id})`} />
  </>;
}

export function Glow({ x, y, r, color = "var(--st-sun)", opacity = .8 }: { x: number; y: number; r: number; color?: string; opacity?: number }) {
  const id = clean(useId());
  return <>
    <defs><radialGradient id={id}><stop stopColor={color} stopOpacity={opacity} /><stop offset="1" stopColor={color} stopOpacity="0" /></radialGradient></defs>
    <circle cx={x} cy={y} r={r} fill={`url(#${id})`} />
  </>;
}
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/illustrations/SceneElements.tsx">
<![CDATA[export function Tree({ x, y, scale = 1, variant = 0 }: { x: number; y: number; scale?: number; variant?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="m-4 0 2-92h7L8 0Z" fill="var(--st-timber)" />
    <path d="M1-45-25-76M2-65l23-29" stroke="var(--st-timber)" strokeWidth="3" fill="none" />
    {variant === 1 ? <><path d="m0-150-28 61 12-3-28 42 24-4-27 38h96L23-56l23 5-28-42 12 5Z" fill="var(--st-forest)" /><path d="m0-147-15 60 13-6-16 41 19-5-13 37h44L17-58l11 4-16-39 9 5Z" fill="var(--st-midgreen)" opacity=".55" /></> : <>
      <path d="M-43-55c-22-11-16-40-3-47-7-26 15-44 32-42 13-30 52-26 59-4 26-2 42 20 31 42 20 20 10 51-14 55-23 20-47 7-59 11-17 5-36-2-46-15Z" fill="var(--st-forest)" />
      <path d="M-43-100c-4-23 17-37 33-35 11-23 45-22 53-3 22 0 32 16 25 35-10-12-22-7-30-3-8-24-35-26-49-8-9-2-22 3-32 14Z" fill="var(--st-midgreen)" />
      <path d="M-42-70c8-10 16-4 23-8m34-42c8-7 19-5 23 1m-29 46c12-9 24-7 30 0m-53-31c4-3 10-5 17-2" stroke="var(--st-leaf)" strokeWidth="4" strokeLinecap="round" opacity=".45" />
    </>}
  </g>;
}

export function House({ x, y, scale = 1, rose = false }: { x: number; y: number; scale?: number; rose?: boolean }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="m-6 14 153-4 32 8-181 12Z" fill="var(--st-ink)" opacity=".16" />
    <path d="M0-72h124V14H0Z" fill="var(--st-wall)" /><path d="m124-72 38-20V0l-38 14Z" fill="var(--st-wallshade)" />
    <path d="M0-72v86m124-86v86M8-43h112M8 3h112M45-65v79M83-65v79" fill="none" stroke="var(--st-timber)" strokeWidth="4" />
    <path d="m-18-72 40-66h119l39 52-49 19Z" fill={rose ? "var(--st-rose)" : "var(--st-roof)"} />
    <path d="m22-138 109 71 49-19-39-52Z" fill={rose ? "var(--st-roof-rose)" : "var(--st-roofshade)"} />
    <path d="m-18-72 149 5 49-19M22-138l109 71M-11-81l134 5M-3-95l110 5M6-109l84 5M15-124l50 3" stroke="var(--st-ink)" strokeOpacity=".35" strokeWidth="2" fill="none" />
    <path d="M12-33h25V-4H12Zm40 0h24V-4H52Zm39-18h24v51H91Z" fill="var(--st-window)" /><path d="M24-32v27m-12-14h25m27-13v27m-12-14h24m27-30v47" stroke="var(--st-timber)" strokeWidth="2" />
    <path d="m129-34 24-11v28l-24 9Z" fill="var(--st-window)" />
    <path d="M132-44v37m10-42v37" stroke="var(--st-timber)" strokeWidth="2" />
    <path d="M-8 14h135v7H-8Z" fill="var(--st-timber)" />
  </g>;
}

export function Grass({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} stroke="var(--st-forest)" fill="none" strokeWidth="1.7" strokeLinecap="round"><path d="M0 0c1-11-4-20-7-24M0 0c0-15 5-24 10-31M0-1C-6-13-12-14-17-16M0 0c3-9 11-11 17-14" /><path d="m9-28 7-4m-23 9-7-2" strokeWidth="3" /></g>;
}

export function Bicycle({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} fill="none" stroke="var(--st-ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="0" cy="0" r="17" fill="var(--st-paper)" fillOpacity=".3" /><circle cx="54" cy="0" r="17" fill="var(--st-paper)" fillOpacity=".3" /><path d="m0 0 16-25 15 25H0l27-23h19l8 23m-8-23-4-14h-8M16-25l-3-8m-5 0h13m10 33 6 5m-6-5-3 7" /><path d="M45-23h20l-3-12H43" fill="var(--st-rose)" strokeWidth="1.5" /></g>;
}
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/illustrations/SeasonScenes.tsx">
<![CDATA[import { Birds, Blades, Cumulus, CumulusOutline, Farmhouse, FarmhouseSketch, Flowers, Glow, PaintedTree, Ridge, RidgeSketch, SceneSvg, SketchPath, Sky, Stratus, TreeSketch, seeded } from "./Painted";

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
  const r1 = "M0 530C120 480 210 440 310 468 400 380 490 372 560 446 660 408 740 448 820 498 920 430 1030 396 1130 456 1220 410 1320 430 1400 496 1480 468 1550 476 1600 500V900H0Z";
  const r2 = "M0 600C170 540 300 530 440 572 580 524 720 540 840 590 980 550 1120 530 1260 574 1400 548 1500 566 1600 596V900H0Z";
  const r3 = "M0 650C230 606 440 608 660 640 880 672 1040 620 1240 612 1420 606 1520 636 1600 650V900H0Z";
  const r4 = "M0 720C260 690 520 700 780 724 1060 750 1320 720 1600 700V900H0Z";
  const r5 = "M0 800C300 770 700 780 1000 804 1260 824 1440 800 1600 780V900H0Z";

  return <SceneSvg className="st-scene-spring" label="A painted spring village: a cherry tree in full blossom, flooded paddies mirroring a pink-gold sky and yellow rapeseed along the lane.">
    <g className="st-sketch-lines" aria-hidden="true">
      <CumulusOutline x={1020} y={470} scale={1.2} depth="far" />
      <CumulusOutline x={360} y={500} scale={.85} flip depth="far" />
      <RidgeSketch d={r1} depth="far" />
      <RidgeSketch d={r2} depth="far" />
      <RidgeSketch d={r3} depth="mid" />
      <RidgeSketch d={r4} depth="mid" />
      <FarmhouseSketch x={690} y={664} scale={.52} depth="mid" />
      <TreeSketch x={540} y={676} scale={.5} depth="mid" />
      <TreeSketch x={900} y={668} scale={.55} depth="mid" />
      <SketchPath d="M120 748h120M420 760h80M690 744h130M1000 758h100M1320 738h120" depth="near" />
      <RidgeSketch d={r5} depth="near" />
      <TreeSketch x={1290} y={870} scale={2.7} depth="near" />
    </g>
    <g className="st-paint-wash">
      <g className="st-paint-layer" data-depth="sky">
        <Sky stops={[[0, "var(--st-sky-top)"], [.5, "var(--st-sky-mid)"], [.68, "var(--st-sky-low)"]]} />
        <Glow x={980} y={430} r={540} />
        <Stratus x={160} y={150} width={360} />
      </g>
      <g className="st-paint-layer" data-depth="far">
        <g className="st-clouds"><Cumulus x={1020} y={470} scale={1.2} /><Cumulus x={360} y={500} scale={.85} flip /></g>
        <Birds x={780} y={250} />
        <Ridge d={r1} top="var(--st-mtn-far)" bottom="var(--st-mtn-haze)" />
        <Ridge d={r2} top="var(--st-mtn-mid)" bottom="var(--st-meadow-lit)" />
      </g>
      <g className="st-paint-layer" data-depth="mid">
        <Ridge d={r3} top="var(--st-meadow-lit)" bottom="var(--st-leaf)" />
        <Ridge d={r4} top="var(--st-sky-low)" bottom="var(--st-water-deep)" />
        <g stroke="var(--st-paper)" strokeWidth="3" strokeLinecap="round" opacity=".6"><path d="M120 748h120M420 760h80M690 744h130M1000 758h100M1320 738h120" /></g>
        <Farmhouse x={690} y={664} scale={.52} glow />
        <PaintedTree x={540} y={676} scale={.5} dark="var(--st-blossom-dark)" mid="var(--st-blossom-mid)" lit="var(--st-blossom-lit)" />
        <PaintedTree x={900} y={668} scale={.55} dark="var(--st-blossom-dark)" mid="var(--st-blossom-mid)" lit="var(--st-blossom-lit)" />
      </g>
      <g className="st-paint-layer" data-depth="near">
        <Ridge d={r5} top="var(--st-meadow-lit)" bottom="var(--st-meadow)" />
        <Flowers x={0} y={790} w={1600} h={110} count={90} seed={4} colors={["var(--st-sun)", "var(--st-sun)", "var(--st-paper)"]} radius={3.6} />
        <PaintedTree x={1290} y={870} scale={2.7} dark="var(--st-blossom-dark)" mid="var(--st-blossom-mid)" lit="var(--st-blossom-lit)" />
        <g className="st-grasses"><Blades x={0} y={860} w={1600} h={40} count={100} seed={14} size={38} stroke="var(--st-forest)" lean={1} width={2.2} /></g>
        <Drift kind="petal" count={26} seed={31} className="st-fall st-fall-a" fill="var(--st-blossom-lit)" />
        <Drift kind="petal" count={20} seed={32} className="st-fall st-fall-b" fill="var(--st-paper)" />
      </g>
    </g>
  </SceneSvg>;
}

/* Summer: rice rows rushing to a far horizon, great cumulus, and sunflowers at the lane. */
export function SummerScene() {
  const rows = Array.from({ length: 21 }, (_, i) => i - 10);
  const r1 = "M0 590C200 540 380 530 560 560 760 594 960 520 1160 520 1360 520 1500 556 1600 580V900H0Z";
  const r2 = "M0 640H1600V900H0Z";
  const r3 = "M0 842C300 806 520 812 760 840 1100 880 1360 850 1600 826V900H0Z";

  return <SceneSvg className="st-scene-summer" label="A painted summer day: towering clouds over a wide green rice field, a farmhouse on the far bank and sunflowers in the foreground.">
    <g className="st-sketch-lines" aria-hidden="true">
      <CumulusOutline x={700} y={560} scale={2.1} depth="far" />
      <CumulusOutline x={1250} y={520} scale={1.5} flip depth="far" />
      <CumulusOutline x={140} y={540} scale={1.2} depth="far" />
      <RidgeSketch d={r1} depth="far" />
      <FarmhouseSketch x={1180} y={622} scale={.4} depth="mid" />
      <RidgeSketch d={r2} depth="mid" />
      <SketchPath d="M800 642L800 900" depth="mid" />
      <SketchPath d="M700 642L200 900" depth="mid" />
      <SketchPath d="M900 642L1400 900" depth="mid" />
      <SketchPath d="M750 642L500 900" depth="mid" />
      <SketchPath d="M850 642L1100 900" depth="mid" />
      <RidgeSketch d={r3} depth="near" />
      <SketchPath d="M150 900L150 760M310 900L310 800M1370 900L1370 770M1500 900L1500 810" depth="near" />
    </g>
    <g className="st-paint-wash">
      <g className="st-paint-layer" data-depth="sky">
        <Sky stops={[[0, "var(--st-sky-top)"], [.5, "var(--st-sky-mid)"], [.64, "var(--st-sky-low)"]]} />
        <Glow x={1320} y={200} r={380} opacity={.9} />
      </g>
      <g className="st-paint-layer" data-depth="far">
        <g className="st-clouds">
          <Cumulus x={700} y={560} scale={2.1} />
          <Cumulus x={1250} y={520} scale={1.5} flip />
          <Cumulus x={140} y={540} scale={1.2} />
        </g>
        <Ridge d={r1} top="var(--st-mtn-mid)" bottom="var(--st-meadow-lit)" />
        <g>{Array.from({ length: 22 }, (_, i) => <PaintedTree key={i} x={560 + i * 44} y={606 + Math.sin(i * .8) * 6} scale={.22 + (i % 4) * .03} />)}</g>
        <Birds x={520} y={300} scale={1.2} />
      </g>
      <g className="st-paint-layer" data-depth="mid">
        <Farmhouse x={1180} y={622} scale={.4} glow />
        <Ridge d={r2} top="var(--st-meadow-lit)" bottom="var(--st-meadow)" />
        <g stroke="var(--st-midgreen)" strokeLinecap="round" opacity=".55">{rows.map(i => <path key={i} d={`M${800 + i * 22} 642L${800 + i * 150} 900`} strokeWidth={f(3 + Math.abs(i) * .55)} />)}</g>
        <g className="st-grasses">
          <Blades x={0} y={650} w={1600} h={250} count={380} seed={71} size={26} stroke="var(--st-leaf)" lean={1} width={2} />
          <Blades x={0} y={800} w={1600} h={100} count={120} seed={73} size={52} stroke="var(--st-forest)" lean={1} width={2.6} />
        </g>
      </g>
      <g className="st-paint-layer" data-depth="near">
        <path d={r3} fill="var(--st-hill)" />
        {[[150, 760, 1.2], [310, 800, 1.5], [1370, 770, 1.35], [1500, 810, 1.7]].map(([x, y, s]) => <g key={x} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M0 140V0" stroke="var(--st-midgreen)" strokeWidth="6" strokeLinecap="round" /><path d="M0 100c-30-4-44-26-48-36 22 0 40 12 48 36Z" fill="var(--st-midgreen)" />
          <g fill="var(--st-sun)">{Array.from({ length: 12 }, (_, k) => <ellipse key={k} cx="0" cy="-30" rx="9" ry="24" transform={`rotate(${k * 30})`} />)}</g>
          <circle r="17" fill="var(--st-timber)" />
        </g>)}
      </g>
    </g>
  </SceneSvg>;
}

/* Autumn: gold paddies, rice drying on wooden racks, a maple on fire and mackerel-sky clouds. */
export function AutumnScene() {
  const r1 = "M0 560C140 500 260 470 380 506 480 440 580 436 660 500 780 456 880 460 980 520 1100 470 1240 486 1340 540 1440 510 1530 520 1600 548V900H0Z";
  const r2 = "M0 620C220 566 400 560 600 604 820 650 980 580 1180 574 1380 568 1500 596 1600 614V900H0Z";
  const r3 = "M0 690C300 664 560 676 820 700 1120 728 1380 696 1600 676V900H0Z";
  const r4 = "M0 850C300 820 700 836 1000 858 1260 876 1440 850 1600 832V900H0Z";

  return <SceneSvg className="st-scene-autumn" label="A painted autumn harvest: golden paddies with rice drying on wooden racks, copper mountains, a maple in red and a mackerel sky.">
    <g className="st-sketch-lines" aria-hidden="true">
      <CumulusOutline x={440} y={160} scale={.4} depth="far" />
      <CumulusOutline x={940} y={170} scale={.42} depth="far" />
      <RidgeSketch d={r1} depth="far" />
      <RidgeSketch d={r2} depth="mid" />
      <FarmhouseSketch x={1050} y={670} scale={.5} depth="mid" />
      <RidgeSketch d={r3} depth="mid" />
      {[[260, 770, 1], [520, 790, 1.1], [820, 800, 1.2]].map(([x, y, s]) => (
        <g key={x} transform={`translate(${x} ${y}) scale(${s})`}>
          <SketchPath d="M-86 0V-120M86 0V-120M-86-112H86M-86-82H86M-86-52H86" depth="near" />
        </g>
      ))}
      <RidgeSketch d={r4} depth="near" />
      <TreeSketch x={1360} y={880} scale={2.3} depth="near" />
    </g>
    <g className="st-paint-wash">
      <g className="st-paint-layer" data-depth="sky">
        <Sky stops={[[0, "var(--st-sky-top)"], [.52, "var(--st-sky-mid)"], [.7, "var(--st-sky-low)"]]} />
        <Glow x={1120} y={500} r={560} />
      </g>
      <g className="st-paint-layer" data-depth="far">
        <g className="st-clouds">{[[220, 190], [440, 160], [680, 210], [940, 170], [1180, 220], [330, 300], [610, 330], [880, 310], [1130, 350], [1380, 280]].map(([x, y], i) => <Cumulus key={i} x={x} y={y} scale={.34 + (i % 3) * .06} />)}</g>
        <Ridge d={r1} top="var(--st-mtn-far)" bottom="var(--st-mtn-haze)" />
        <Ridge d={r2} top="var(--st-mtn-mid)" bottom="var(--st-meadow-lit)" />
        <g>{Array.from({ length: 14 }, (_, i) => <PaintedTree key={i} x={140 + i * 108} y={640 + Math.sin(i) * 8} scale={.3 + (i % 3) * .05} dark="var(--st-maple-dark)" mid="var(--st-maple-mid)" lit="var(--st-maple-lit)" />)}</g>
      </g>
      <g className="st-paint-layer" data-depth="mid">
        <Farmhouse x={1050} y={670} scale={.5} glow />
        <Ridge d={r3} top="var(--st-meadow-lit)" bottom="var(--st-meadow)" />
        <g stroke="var(--st-sun)" strokeWidth="3" opacity=".5" strokeLinecap="round"><Blades x={0} y={700} w={1600} h={200} count={300} seed={91} size={24} stroke="var(--st-sun)" lean={1} width={2} /></g>
        {[[260, 770, 1], [520, 790, 1.1], [820, 800, 1.2]].map(([x, y, s]) => <g key={x} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M-86 0V-120M86 0V-120M-86-112H86M-86-82H86M-86-52H86" stroke="var(--st-timber)" strokeWidth="6" strokeLinecap="round" />
          <g fill="var(--st-sun)" stroke="var(--st-timber)" strokeWidth="2">{[-72, -50, -28, -6, 16, 38, 60].map(sx => <path key={sx} d={`M${sx} -112l-12 24h24ZM${sx} -82l-12 24h24Z`} />)}</g>
        </g>)}
      </g>
      <g className="st-paint-layer" data-depth="near">
        <Ridge d={r4} top="var(--st-hill)" bottom="var(--st-forest)" />
        <PaintedTree x={1360} y={880} scale={2.3} dark="var(--st-maple-dark)" mid="var(--st-maple-mid)" lit="var(--st-maple-lit)" />
        <g className="st-grasses"><Blades x={0} y={866} w={1600} h={34} count={90} seed={95} size={36} stroke="var(--st-forest)" lean={1} width={2.2} /></g>
        <Drift kind="leaf" count={22} seed={61} className="st-fall st-fall-a" fill="var(--st-maple-lit)" />
        <Drift kind="leaf" count={16} seed={62} className="st-fall st-fall-b" fill="var(--st-maple-mid)" />
      </g>
    </g>
  </SceneSvg>;
}

/* Winter: a hushed snowfield, bare branches, a warm lit window and smoke from the chimney. */
export function WinterScene() {
  const r1 = "M0 540C150 470 250 420 360 456 450 366 560 360 640 450 760 400 860 440 960 500 1080 430 1200 400 1300 470 1400 440 1520 460 1600 500V900H0Z";
  const r2 = "M0 620C220 580 460 590 700 620 940 650 1160 590 1400 586 1500 584 1560 596 1600 606V900H0Z";
  const r3 = "M0 760C300 720 640 740 940 770 1240 800 1440 760 1600 730V900H0Z";
  const r4 = "M0 850C260 810 560 826 840 856 1120 886 1360 860 1600 836V900H0Z";

  return <SceneSvg className="st-scene-winter" label="A painted winter village: snow on the farmhouse roof, a warm glowing window, bare trees and snowy cedars under a pale lilac sky.">
    <g className="st-sketch-lines" aria-hidden="true">
      <CumulusOutline x={1120} y={470} scale={1.1} depth="far" />
      <CumulusOutline x={330} y={500} scale={.9} flip depth="far" />
      <RidgeSketch d={r1} depth="far" />
      <RidgeSketch d={r2} depth="mid" />
      <FarmhouseSketch x={900} y={700} scale={.72} depth="mid" />
      <TreeSketch x={640} y={730} scale={1.1} kind="bare" depth="mid" />
      <TreeSketch x={1280} y={740} scale={.9} kind="bare" depth="mid" />
      <RidgeSketch d={r3} depth="near" />
      <RidgeSketch d={r4} depth="near" />
      <TreeSketch x={150} y={880} scale={2.1} kind="cedar" depth="near" />
    </g>
    <g className="st-paint-wash">
      <g className="st-paint-layer" data-depth="sky">
        <Sky stops={[[0, "var(--st-sky-top)"], [.5, "var(--st-sky-mid)"], [.7, "var(--st-sky-low)"]]} />
        <Stratus x={200} y={140} width={420} />
        <Stratus x={980} y={190} width={340} />
      </g>
      <g className="st-paint-layer" data-depth="far">
        <g className="st-clouds"><Cumulus x={1120} y={470} scale={1.1} /><Cumulus x={330} y={500} scale={.9} flip /></g>
        <Ridge d={r1} top="var(--st-snow)" bottom="var(--st-mtn-haze)" />
        <g>{Array.from({ length: 18 }, (_, i) => <PaintedTree key={i} x={60 + i * 90} y={560 + Math.sin(i * 1.3) * 12} scale={.3 + (i % 3) * .05} kind="cedar" dark="var(--st-tree-dark)" mid="var(--st-tree-mid)" snow />)}</g>
      </g>
      <g className="st-paint-layer" data-depth="mid">
        <Ridge d={r2} top="var(--st-snow)" bottom="var(--st-snow-shade)" />
        <Farmhouse x={900} y={700} scale={.72} glow roof="var(--st-snow)" roofLit="var(--st-snow-shade)" />
        <g className="st-smoke" stroke="var(--st-paper)" strokeWidth="9" strokeLinecap="round" opacity=".75"><path d="M970 548c-20-14 10-20-4-34s-9-21-4-27" /><path d="M980 530c12-15-12-17-6-30" strokeWidth="5" /></g>
        <Glow x={900} y={690} r={190} opacity={.4} />
        <PaintedTree x={640} y={730} scale={1.1} kind="bare" snow />
        <PaintedTree x={1280} y={740} scale={.9} kind="bare" snow />
      </g>
      <g className="st-paint-layer" data-depth="near">
        <Ridge d={r3} top="var(--st-snow)" bottom="var(--st-snow-shade)" />
        <path d={r4} fill="var(--st-snow)" />
        <path d="M0 850C260 810 560 826 840 856" stroke="var(--st-snow-shade)" strokeWidth="4" opacity=".6" />
        <PaintedTree x={150} y={880} scale={2.1} kind="cedar" dark="var(--st-tree-dark)" mid="var(--st-tree-mid)" />
        <Drift kind="snow" count={46} seed={81} className="st-fall st-fall-a" fill="var(--st-paper)" />
        <Drift kind="snow" count={34} seed={82} className="st-fall st-fall-b" fill="var(--st-paper)" />
      </g>
    </g>
  </SceneSvg>;
}
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/illustrations/TerraceScene.tsx">
<![CDATA[import { useId } from "react";
import { Blades, Cumulus, CumulusOutline, Farmhouse, FarmhouseSketch, Glow, PaintedTree, Ridge, RidgeSketch, SceneSvg, SketchPath, Sky, TreeSketch, seeded } from "./Painted";

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
  const r1 = "M0 470C100 410 180 340 280 366 360 280 450 260 520 336 600 306 680 384 760 424 880 336 980 306 1080 364 1180 336 1290 384 1380 432 1460 404 1540 414 1600 442V900H0Z";
  const r2 = "M0 556C140 466 260 432 380 470 500 414 600 440 700 500 820 468 930 442 1040 480 1160 432 1290 470 1400 520 1480 500 1550 510 1600 530V900H0Z";
  const r3 = "M0 600C200 560 420 560 640 590 860 620 1040 560 1240 556 1400 554 1520 580 1600 590V900H0Z";

  return <SceneSvg label="A painted hillside of terraced rice paddies, mirroring the morning sky, below misty wooded mountains and a small cluster of farmhouses.">
    <g className="st-sketch-lines" aria-hidden="true">
      <CumulusOutline x={1180} y={410} scale={1.15} depth="far" />
      <CumulusOutline x={330} y={430} scale={.9} flip depth="far" />
      <RidgeSketch d={r1} depth="far" />
      <RidgeSketch d={r2} depth="far" />
      <RidgeSketch d={r3} depth="mid" />
      <FarmhouseSketch x={780} y={632} scale={.5} depth="mid" />
      <FarmhouseSketch x={670} y={644} scale={.36} depth="mid" />
      <TreeSketch x={900} y={598} scale={.62} depth="mid" />
      <TreeSketch x={1290} y={584} scale={.5} depth="mid" />
      <SketchPath d="M-40 560C300 550 600 565 880 560S1400 565 1640 560" depth="mid" />
      <SketchPath d="M-40 604C300 595 600 610 880 605S1400 610 1640 604" depth="mid" />
      <SketchPath d="M-40 660C300 655 600 668 880 662S1400 665 1640 660" depth="near" />
      <SketchPath d="M-40 726C300 720 600 735 880 728S1400 730 1640 726" depth="near" />
      <SketchPath d="M-40 804C300 800 600 812 880 806S1400 810 1640 804" depth="near" />
      <TreeSketch x={1500} y={900} scale={1.35} depth="near" />
    </g>
    <g className="st-paint-wash">
      <g className="st-paint-layer" data-depth="sky">
        <Sky stops={[[0, "var(--st-sky-top)"], [.5, "var(--st-sky-mid)"], [.64, "var(--st-sky-low)"]]} />
        <Glow x={960} y={330} r={460} />
      </g>
      <g className="st-paint-layer" data-depth="far">
        <g className="st-clouds">
          <Cumulus x={1180} y={410} scale={1.15} />
          <Cumulus x={330} y={430} scale={.9} flip />
        </g>
        <Ridge d={r1} top="var(--st-mtn-far)" bottom="var(--st-mtn-haze)" />
        <Mist y={400} height={140} opacity={.6} />
        <Ridge d={r2} top="var(--st-mtn-mid)" bottom="var(--st-mtn-haze)" />
        <g>{Array.from({ length: 16 }, (_, i) => <PaintedTree key={i} x={930 + i * 42} y={510 + Math.sin(i * .6) * 14 + i * 3} scale={.32 + (i % 3) * .04} kind="cedar" />)}</g>
        <Mist y={500} height={110} opacity={.55} />
      </g>
      <g className="st-paint-layer" data-depth="mid">
        <Ridge d={r3} top="var(--st-meadow-lit)" bottom="var(--st-leaf)" />
        {BANDS.slice(0, 3).map(([top, height], i) => {
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
      </g>
      <g className="st-paint-layer" data-depth="near">
        {BANDS.slice(3).map(([top, height], i) => {
          const wobble = () => (next() - .5) * 26;
          const y0 = top + wobble() * .3;
          const d = `M-40 ${f(y0)}C300 ${f(top + wobble())} 600 ${f(top + wobble())} 880 ${f(top + wobble() * .5)}S1400 ${f(top + wobble())} 1640 ${f(y0)}V${top + height + 40}H-40Z`;
          const water = (i + 3) % 2 === 0;
          return <g key={top}>
            <path d={d} fill="var(--st-bank)" transform="translate(0 -6)" />
            <Ridge d={d} top={water ? "var(--st-sky-mid)" : "var(--st-meadow-lit)"} bottom={water ? "var(--st-water-deep)" : "var(--st-midgreen)"} />
            {water
              ? <g stroke="var(--st-paper)" strokeLinecap="round" strokeWidth="3" opacity=".65">{Array.from({ length: 9 }, (_, k) => { const sx = 90 + k * 175 + next() * 60; const sy = top + 14 + next() * (height * .55); return <path key={k} d={`M${f(sx)} ${f(sy)}h${f(40 + next() * 70)}`} />; })}</g>
              : <Blades x={0} y={top + 10} w={1600} h={height - 8} count={150} seed={(i + 3) * 13 + 5} size={26} stroke="var(--st-leaf)" lean={1} width={2} />}
          </g>;
        })}
        <path d="M0 880C300 834 640 846 920 884V900H0Z" fill="var(--st-hill)" />
        <path d="M1100 900C1160 850 1320 832 1460 846 1530 854 1580 874 1600 888V900Z" fill="var(--st-forest)" />
        <PaintedTree x={1500} y={900} scale={1.35} />
        <g className="st-grasses">
          <Blades x={0} y={852} w={1600} h={48} count={110} seed={23} size={44} stroke="var(--st-meadow-lit)" lean={1} width={2.4} />
          <Blades x={0} y={862} w={1600} h={40} count={80} seed={29} size={36} stroke="var(--st-forest)" lean={1} width={2.2} />
        </g>
      </g>
    </g>
  </SceneSvg>;
}
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/illustrations/VillageScene.tsx">
<![CDATA[import { Birds, Blades, Cumulus, CumulusOutline, Farmhouse, FarmhouseSketch, Flowers, Glow, PaintedTree, Ridge, RidgeSketch, SceneSvg, SketchPath, Sky, Stratus, TreeSketch } from "./Painted";

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
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/motion/useAmbient.ts">
<![CDATA["use client";

import { useEffect, useState } from "react";

export function useAmbient() {
  const [paused, setPaused] = useState(false);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const handleVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);
  return { paused, stopped: paused || hidden, toggle: () => setPaused((value) => !value) };
}
]]>
    </file>
    <file path="src/app/(satoyama)/satoyama/motion/useReducedMotion.ts">
<![CDATA["use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";
const subscribe = (callback: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}
]]>
    </file>
  </files>
</template>
