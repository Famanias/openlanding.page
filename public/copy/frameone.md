<template slug="frameone" name="FRAME/ONE">
  <dependencies>
    {
      "dependencies": {}
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(frameone)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Anonymous_Pro, Crimson_Pro, League_Gothic } from "next/font/google";
import "./frameone/frameone.css";

const display = League_Gothic({ subsets: ["latin"], variable: "--font-league-gothic", display: "swap" });
const serif = Crimson_Pro({ subsets: ["latin"], weight: ["400", "600"], variable: "--font-crimson-pro", display: "swap" });
const mono = Anonymous_Pro({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-anonymous-pro", display: "swap" });

export const metadata: Metadata = {
  title: "FRAME/ONE — Every frame has a story",
  description: "A fictional director and photographer portfolio, explored through a cinematic contact sheet.",
  openGraph: { title: "FRAME/ONE — Every frame has a story", description: "An independent practice in moving image and stills. A fictional portfolio." },
};

export const viewport: Viewport = { themeColor: "#201D1E", width: "device-width", initialScale: 1 };

export default function FrameOneLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${display.variable} ${serif.variable} ${mono.variable}`}>
    <body className="fo-body">{children}</body>
  </html>;
}
]]>
    </file>
    <file path="src/app/(frameone)/frameone/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(frameone)/frameone/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

type PictureProps = { assetKey: string; alt: string; className?: string; priority?: boolean; sizes?: string };

export function Picture({ assetKey, alt, className = "", priority = false, sizes = "(min-width: 900px) 50vw, 100vw" }: PictureProps) {
  const asset = ASSETS[assetKey];
  if (!asset) return <span className={`fo-picture fo-placeholder ${className}`} data-asset={assetKey} data-art={assetKey.slice(1, 2)} role={alt ? "img" : undefined} aria-label={alt ? `${alt}. Image awaiting delivery.` : undefined} aria-hidden={alt ? undefined : true}>
    <span className="fo-placeholder__shape" aria-hidden="true" />
    <span className="fo-placeholder__label">IMAGE PENDING / {assetKey}</span>
  </span>;
  const base = `/templates/frameone/${assetKey}`;
  return <picture className={`fo-picture ${className}`} data-asset={assetKey}>
    <source type="image/avif" srcSet={`${base}-800.avif 800w, ${base}-1600.avif 1600w`} sizes={sizes} />
    {/* Processed responsive assets are local, dimensioned, and shared with copy bundles. */}
    <img src={`${base}-800.webp`} srcSet={`${base}-800.webp 800w, ${base}-1600.webp 1600w`} sizes={sizes} width={asset.w} height={asset.h} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" />
  </picture>;
}

export function Grain() {
  const key = "12-grain-overlay";
  if (!ASSETS[key]) return null;
  return <span className="fo-grain" aria-hidden="true" style={{ backgroundImage: `url(/templates/frameone/${key}-800.webp)` }} />;
}
]]>
    </file>
    <file path="src/app/(frameone)/frameone/frameone.css">
<![CDATA[@import "tailwindcss" source(none);

@theme {
  --color-fo-paper: #DED9CF;
  --color-fo-ink: #201D1E;
  --color-fo-red: #B13F32;
  --color-fo-cyan: #8DA7A9;
  --color-fo-cream: #F7F2E9;
  --fo-ease-out: cubic-bezier(.22, 1, .36, 1);
  --fo-ease-splice: cubic-bezier(.76, 0, .24, 1);
  --fo-ease-spring: linear(0, .34 10%, .85 28%, 1.025 46%, 1 100%);
  --fo-fast: 220ms;
  --fo-base: 500ms;
  --fo-slow: 850ms;
  --fo-stagger: 65ms;
}

.fo-body { margin: 0; background: var(--color-fo-ink); color: var(--color-fo-cream); font-family: var(--font-crimson-pro), Georgia, serif; }
.fo-body *, .fo-body *::before, .fo-body *::after { box-sizing: border-box; }
.fo-body :where(a) { color: inherit; text-decoration: none; }
.fo-body :where(button, input, textarea) { font: inherit; }
.fo-body :where(button) { color: inherit; cursor: pointer; }
.fo-body :where(button, a, input, textarea):focus-visible { outline: 2px solid var(--color-fo-red); outline-offset: 4px; }
.fo-body :where(h1,h2,h3,p,figure) { margin: 0; }
.fo-body :where(h1,h2,h3) { text-wrap: balance; }
.fo-body :where(p) { text-wrap: pretty; }
.fo-body :where(section) { scroll-margin-top: 12px; }
.fo-page { padding-left: 70px; padding-bottom: 54px; overflow: clip; }
.fo-grain { position: fixed; z-index: 90; inset: 0; pointer-events: none; opacity: .055; background-repeat: repeat; background-size: 512px 512px; }
.fo-mono, .fo-kicker { font-family: var(--font-anonymous-pro), monospace; font-size: 11px; line-height: 1.35; letter-spacing: .1em; text-transform: uppercase; }
.fo-kicker { font-weight: 700; }
.fo-red { color: var(--color-fo-red); }
.fo-skip { position: fixed; z-index: 100; top: 8px; left: 80px; padding: 12px; color: var(--color-fo-ink) !important; background: var(--color-fo-cream); transform: translateY(-180%); }
.fo-skip:focus { transform: translateY(0); }
.fo-logo { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-league-gothic), sans-serif; font-size: 28px; letter-spacing: .035em; line-height: 1; }
.fo-logo svg { width: 31px; height: 35px; flex: none; }

/* A narrow, perforated film leader and a persistent transport. */
.fo-rail { position: fixed; z-index: 30; inset: 0 auto 54px 0; width: 70px; background: var(--color-fo-ink); color: var(--color-fo-cream); border-right: 1px solid color-mix(in srgb, var(--color-fo-paper), transparent 65%); display: flex; align-items: center; flex-direction: column; padding: 22px 0 14px; }
.fo-rail__brand { display: flex; flex-direction: column; align-items: center; gap: 16px; font: 25px/1 var(--font-league-gothic), sans-serif; letter-spacing: .08em; }
.fo-rail__brand > span:last-child { writing-mode: vertical-rl; height: 76px; white-space: nowrap; }
.fo-rail__holes { width: 12px; height: 76px; margin-top: 22px; background: repeating-linear-gradient(to bottom, var(--color-fo-paper) 0 8px, transparent 8px 17px); opacity: .8; }
.fo-rail__links { margin: auto 0; display: flex; align-items: center; justify-content: space-between; height: 260px; writing-mode: vertical-rl; transform: rotate(180deg); font-size: 10px; }
.fo-rail__links a { display: block; height: 58px; white-space: nowrap; transition: transform var(--fo-fast) var(--fo-ease-out); }
.fo-rail__links a:hover, .fo-rail__links a:focus-visible { transform: translateX(-4px); }
.fo-rail__end { font-size: 9px; }
.fo-transport { position: fixed; z-index: 30; inset: auto 0 0 0; height: 54px; display: flex; align-items: center; gap: clamp(18px, 3vw, 48px); padding: 0 24px 0 92px; background: var(--color-fo-ink); color: var(--color-fo-cream); border-top: 1px solid color-mix(in srgb, var(--color-fo-paper), transparent 68%); font: 10px/1 var(--font-anonymous-pro), monospace; letter-spacing: .1em; }
.fo-transport a { white-space: nowrap; transition: transform var(--fo-fast) var(--fo-ease-out); }
.fo-transport a:hover { transform: translateY(-2px); }
.fo-transport__center { margin: auto; opacity: .7; }
.fo-transport__mute { opacity: .7; white-space: nowrap; }
.fo-transport__progress { position: absolute; inset: 0 auto auto 0; height: 2px; width: 100%; background: var(--color-fo-red); transform: scaleX(0); transform-origin: left; }

/* Contact sheet: the image cells are navigation, with no tilt. */
.fo-sheet { height: 100svh; min-height: 650px; padding: 18px 18px 68px; display: flex; flex-direction: column; background: var(--color-fo-ink); }
.fo-sheet__meta, .fo-sheet__caption { display: flex; justify-content: space-between; gap: 12px; font-size: 10px; }
.fo-sheet__meta { padding-bottom: 15px; white-space: nowrap; }
.fo-sheet__meta span { overflow: hidden; text-overflow: ellipsis; }
.fo-sheet__caption { padding-top: 12px; color: var(--color-fo-paper); }
.fo-sheet__grid { flex: 1; min-height: 0; display: grid; grid-template-columns: repeat(5, minmax(0,1fr)); grid-template-rows: repeat(4, minmax(0,1fr)); grid-auto-flow: dense; gap: 7px; }
.fo-headline-frame { grid-column: 3 / span 2; grid-row: 1 / span 2; background: var(--color-fo-paper); color: var(--color-fo-ink); display: flex; flex-direction: column; justify-content: space-between; padding: clamp(22px, 3vw, 48px); }
.fo-headline-frame h1 { font: 400 clamp(45px, 5.6vw, 100px)/.88 var(--font-league-gothic), sans-serif; letter-spacing: -.015em; text-transform: uppercase; }
.fo-headline-frame h1 span { color: var(--color-fo-red); }
.fo-headline-frame__bottom { display: flex; align-items: end; justify-content: space-between; gap: 20px; }
.fo-headline-frame__bottom p { font-size: clamp(16px, 1.3vw, 20px); line-height: 1.15; }
.fo-headline-frame__bottom > div { display: grid; gap: 14px; }
.fo-text-link { border: 0; background: none; padding: 0; font: 700 11px/1.2 var(--font-anonymous-pro), monospace; text-align: left; text-transform: uppercase; letter-spacing: .09em; }
.fo-headline-frame .fo-text-link { display: flex; align-items: center; min-height: 28px; }
.fo-text-link span { display: inline-block; color: var(--color-fo-red); transition: transform var(--fo-base) var(--fo-ease-out); }
.fo-text-link:hover span { transform: translate(4px,-4px); }
.fo-magnetic { transform: translate3d(var(--fo-pull-x, 0px), var(--fo-pull-y, 0px), 0); transition: transform var(--fo-base) var(--fo-ease-spring); }
.fo-magnetic:active { transform: translate3d(var(--fo-pull-x, 0px), var(--fo-pull-y, 0px), 0) scale(.97); }
.fo-cell { position: relative; display: block; min-width: 0; min-height: 0; overflow: hidden; background: var(--color-fo-cyan); transform: translateZ(0); transition: transform var(--fo-base) var(--fo-ease-out), opacity var(--fo-base) var(--fo-ease-out); }
.fo-cell__link { position: absolute; z-index: 6; inset: 0; }
.fo-cell__link:focus-visible { outline-offset: -3px !important; }
.fo-cell__scan { position: absolute; z-index: 4; left: 0; top: -25%; width: 100%; height: 50%; opacity: 0; pointer-events: none; background: linear-gradient(transparent, color-mix(in srgb, var(--color-fo-cream), transparent 65%), transparent); transform: translate3d(0, 50%, 0); transition: opacity var(--fo-fast) var(--fo-ease-out); }
.fo-cell__number, .fo-cell__cue { position: absolute; z-index: 5; padding: 3px 4px; background: var(--color-fo-ink); color: var(--color-fo-cream); font-size: 9px; }
.fo-cell__number { top: 8px; left: 8px; }
.fo-cell__cue { right: 8px; bottom: 8px; width: 92px; text-align: right; opacity: 0; transform: translateY(5px); transition: opacity var(--fo-fast) var(--fo-ease-out), transform var(--fo-base) var(--fo-ease-out); }
.fo-cell__subtitle { position: absolute; z-index: 4; bottom: 12%; width: 100%; color: var(--color-fo-cream); text-align: center; padding: 0 8px; font-size: clamp(12px,1.2vw,17px); text-shadow: 0 1px 4px var(--color-fo-ink); }
.fo-cell__alternate { opacity: 0; }
.fo-cell:hover .fo-cell__cue, .fo-cell:focus-within .fo-cell__cue { opacity: 1; transform: none; }
.fo-cell:hover .fo-cell__scan, .fo-cell:focus-within .fo-cell__scan { opacity: 1; }
.fo-cell:active { transform: scale(.985); }
.fo-page[data-viewing="true"] .fo-cell:not([data-origin]) { transform: translate3d(-10px,0,0) scale(.96); opacity: .55; }
.fo-page[data-viewing="true"] .fo-cell:not([data-origin]):nth-child(even) { transform: translate3d(10px,0,0) scale(.96); }
.fo-page[data-viewing="true"] .fo-cell[data-origin] { opacity: 0; }

/* Responsive images and labeled, art-directed stand-ins. */
.fo-picture { display: block; width: 100%; height: 100%; }
.fo-picture img { display: block; width: 100%; height: 100%; object-fit: cover; }
.fo-placeholder { position: relative; overflow: hidden; background: color-mix(in srgb, var(--color-fo-paper) 52%, var(--color-fo-ink)); }
.fo-placeholder::before, .fo-placeholder::after, .fo-placeholder__shape { content: ""; position: absolute; display: block; pointer-events: none; }
.fo-placeholder::before { inset: 0; opacity: .22; background: repeating-linear-gradient(0deg, transparent 0 3px, var(--color-fo-ink) 4px, transparent 5px); }
.fo-placeholder::after { width: 120%; height: 30%; left: -10%; bottom: -12%; background: color-mix(in srgb, var(--color-fo-ink) 80%, transparent); transform: rotate(-6deg); }
.fo-placeholder__shape { left: 38%; bottom: 9%; width: 26%; height: 68%; border-radius: 48% 48% 0 0; background: color-mix(in srgb, var(--color-fo-ink) 78%, transparent); }
.fo-placeholder__label { position: absolute; z-index: 2; left: 8px; bottom: 8px; max-width: calc(100% - 16px); overflow: hidden; white-space: nowrap; text-overflow: ellipsis; padding: 3px 4px; color: var(--color-fo-cream); background: color-mix(in srgb, var(--color-fo-ink) 75%, transparent); font: 8px/1.2 var(--font-anonymous-pro), monospace; letter-spacing: .04em; }
.fo-placeholder[data-art="2"], .fo-placeholder[data-art="7"] { background: color-mix(in srgb, var(--color-fo-cyan) 72%, var(--color-fo-ink)); }
.fo-placeholder[data-art="2"] .fo-placeholder__shape, .fo-placeholder[data-art="7"] .fo-placeholder__shape { width: 140%; height: 35%; left: -20%; bottom: 20%; border-radius: 0; transform: rotate(-9deg); }
.fo-placeholder[data-art="3"], .fo-placeholder[data-art="8"] { background: color-mix(in srgb, var(--color-fo-paper) 70%, var(--color-fo-red)); }
.fo-placeholder[data-art="3"] .fo-placeholder__shape, .fo-placeholder[data-art="8"] .fo-placeholder__shape { width: 30%; height: 100%; left: 23%; bottom: 0; border-radius: 0; transform: skew(-12deg); }
.fo-placeholder[data-art="4"], .fo-placeholder[data-art="9"] { background: color-mix(in srgb, var(--color-fo-paper) 45%, var(--color-fo-ink)); }
.fo-placeholder[data-art="4"] .fo-placeholder__shape, .fo-placeholder[data-art="9"] .fo-placeholder__shape { width: 75%; height: 25%; left: 34%; bottom: 24%; border-radius: 0; transform: rotate(-24deg); }
.fo-placeholder[data-art="5"] { background: color-mix(in srgb, var(--color-fo-cyan) 60%, var(--color-fo-ink)); }
.fo-placeholder[data-art="6"] { background: color-mix(in srgb, var(--color-fo-red) 28%, var(--color-fo-paper)); }
.fo-placeholder[data-art="6"] .fo-placeholder__shape { width: 42%; height: 70%; left: 28%; border-radius: 0; background: transparent; border: 12px solid color-mix(in srgb, var(--color-fo-ink) 70%, transparent); }
.fo-cell > .fo-picture, .fo-reel__image > .fo-picture, .fo-work__image > .fo-picture, .fo-viewer__screen > .fo-picture { position: absolute; inset: 0; }

/* Full-screen viewer, transformed from and back to its source cell. */
.fo-viewer { position: fixed; z-index: 80; inset: 0; display: flex; flex-direction: column; background: var(--color-fo-ink); color: var(--color-fo-cream); transform-origin: top left; overflow: auto; }
.fo-viewer__top { flex: none; display: flex; align-items: center; justify-content: space-between; min-height: 58px; padding: 0 clamp(18px,3vw,48px); gap: 12px; }
.fo-viewer__top button { border: 0; background: transparent; font: inherit; letter-spacing: inherit; }
.fo-viewer__top button span { font-size: 24px; vertical-align: middle; }
.fo-viewer__screen { position: relative; flex: 1; min-height: 200px; margin: 0 clamp(18px,3vw,48px); overflow: hidden; background: var(--color-fo-cyan); }
.fo-viewer__screen::after, .fo-reel__image::after { content: ""; position: absolute; inset: 50% 0 0; background: linear-gradient(transparent, color-mix(in srgb,var(--color-fo-ink) 70%,transparent)); pointer-events: none; }
.fo-viewer__subtitle { position: absolute; z-index: 2; bottom: 9%; width: 100%; padding: 0 16px; text-align: center; font-size: clamp(18px,2.2vw,30px); text-shadow: 0 2px 8px var(--color-fo-ink); }
.fo-viewer__screen-count { position: absolute; z-index: 2; right: 15px; top: 15px; }
.fo-viewer__bottom { flex: none; display: flex; justify-content: space-between; align-items: end; gap: 30px; padding: 22px clamp(18px,3vw,48px) 28px; }
.fo-viewer__info { max-width: 650px; }
.fo-viewer__info h2 { margin: 6px 0; font: 400 clamp(34px,4vw,58px)/.95 var(--font-league-gothic), sans-serif; text-transform: uppercase; }
.fo-viewer__info > p:last-child { font-size: 17px; line-height: 1.2; }
.fo-viewer__controls { display: grid; gap: 9px; text-align: right; font-size: 9px; }
.fo-viewer__transport { display: flex; justify-content: flex-end; gap: 5px; }
.fo-viewer__transport button { width: 45px; height: 40px; border: 1px solid color-mix(in srgb, var(--color-fo-paper), transparent 55%); background: none; font-size: 20px; transition: transform var(--fo-fast) var(--fo-ease-out); }
.fo-viewer__transport button:active { transform: scale(.92); }

/* Shared editorial layout and cinematic handoffs. */
.fo-section { padding: clamp(70px,8vw,130px) clamp(24px,6vw,100px); }
.fo-section-top, .fo-leader { display: flex; justify-content: space-between; gap: 15px; font-size: 10px; }
.fo-section-top { padding-bottom: 24px; border-bottom: 1px solid currentColor; }
.fo-section h2, .fo-reel h2 { font: 400 clamp(58px,7vw,108px)/.86 var(--font-league-gothic), sans-serif; letter-spacing: -.015em; text-transform: uppercase; }
.fo-section h2 em { font: 400 .8em/.85 var(--font-crimson-pro), Georgia, serif; text-transform: none; }
.fo-action { position: relative; display: inline-flex; align-items: center; justify-content: space-between; gap: 30px; min-width: 180px; padding: 16px 18px; border: 1px solid currentColor; background: transparent; color: inherit; font: 700 11px/1 var(--font-anonymous-pro), monospace; text-transform: uppercase; letter-spacing: .08em; }
.fo-action span { transition: transform var(--fo-base) var(--fo-ease-out); }
.fo-action:hover span { transform: translate(5px,-4px); }
.fo-action:disabled { opacity: .6; cursor: wait; }
.fo-reel { position: relative; min-height: 145svh; background: var(--color-fo-ink); }
.fo-reel__sticky { position: sticky; top: 0; height: 100svh; min-height: 680px; padding: 20px clamp(18px,3vw,48px) 75px; display: flex; flex-direction: column; }
.fo-leader { flex: none; padding-bottom: 15px; }
.fo-reel__image { position: relative; flex: 1; min-height: 200px; overflow: hidden; }
.fo-reel__image > .fo-picture { transform: scale(1.08); }
.fo-reel__eyebrow, .fo-reel__marker { position: absolute; z-index: 3; top: 18px; left: 18px; }
.fo-reel__marker { inset: 18px 18px auto auto; }
.fo-reel__image .fo-reel__title { position: absolute; z-index: 3; bottom: 17%; width: 100%; padding: 0 15px; text-align: center; font: 400 clamp(23px,2.7vw,38px)/1.1 var(--font-crimson-pro),Georgia,serif; letter-spacing: 0; text-transform: none; text-shadow: 0 2px 8px var(--color-fo-ink); }
.fo-reel__subtitle { position: absolute; z-index: 3; bottom: 9%; width: 100%; padding: 0 15px; text-align: center; font-size: clamp(20px,2.8vw,38px); text-shadow: 0 2px 8px var(--color-fo-ink); }
.fo-reel__info { display: flex; align-items: end; gap: 28px; justify-content: space-between; padding-top: 20px; }
.fo-reel__ident { margin-top: 9px !important; font: 400 clamp(24px,2.4vw,38px)/1 var(--font-league-gothic),sans-serif; }
.fo-reel__info > p { max-width: 27ch; font-size: 18px; line-height: 1.2; }

.fo-work { background: var(--color-fo-paper); color: var(--color-fo-ink); }
.fo-work__heading { display: grid; grid-template-columns: 1fr 2fr 1fr; align-items: end; gap: 22px; padding: clamp(60px,7vw,110px) 0; }
.fo-work__heading > p:last-child { max-width: 24ch; font-size: 20px; line-height: 1.2; }
.fo-work__tabs { display: flex; gap: clamp(20px,4vw,60px); border-bottom: 1px solid var(--color-fo-ink); }
.fo-work__tabs button { position: relative; border: 0; padding: 0 0 18px; background: transparent; font: 400 clamp(18px,2vw,27px)/1 var(--font-crimson-pro), serif; }
.fo-work__tabs button span { margin-right: 8px; font-size: 9px; }
.fo-work__tabs button::after { content: ""; position: absolute; height: 3px; inset: auto 0 -2px; background: var(--color-fo-red); transform: scaleX(0); transform-origin: left; transition: transform var(--fo-base) var(--fo-ease-out); }
.fo-work__tabs button[aria-pressed="true"]::after { transform: scaleX(1); }
.fo-work__list { display: grid; gap: 50px; padding-top: 32px; }
.fo-work__item { display: grid; grid-template-columns: minmax(0,1.7fr) minmax(220px,1fr); gap: clamp(25px,5vw,80px); }
.fo-work__image { position: relative; aspect-ratio: 2.1; overflow: hidden; }
.fo-work__alternate { opacity: 0; }
.fo-work__image-caption { position: absolute; z-index: 2; bottom: 10%; left: 0; width: 100%; text-align: center; color: var(--color-fo-cream); font-size: clamp(16px,1.7vw,22px); text-shadow: 0 2px 8px var(--color-fo-ink); }
.fo-work__detail { display: flex; flex-direction: column; align-items: start; padding: 10px 0; }
.fo-work__detail h3 { margin: 22px 0 16px; font: 400 clamp(34px,4vw,58px)/.9 var(--font-league-gothic),sans-serif; text-transform: uppercase; }
.fo-work__detail > p:not(.fo-kicker) { max-width: 30ch; font-size: 20px; line-height: 1.2; }
.fo-work__open { margin: 24px 0 auto; padding: 0 0 6px; border: 0; border-bottom: 1px solid var(--color-fo-red); background: none; font: 700 11px/1.3 var(--font-anonymous-pro),monospace; letter-spacing: .08em; }
.fo-work__open span { display: inline-block; transition: transform var(--fo-base) var(--fo-ease-out); }
.fo-work__open:hover span { transform: translate(5px,-4px); }
.fo-work__detail small { margin-top: 22px; }
.fo-noscript-work { padding-top: 32px; }

.fo-notes { background: var(--color-fo-cream); color: var(--color-fo-ink); }
.fo-notes__layout { display: grid; grid-template-columns: 1fr 1.3fr .8fr; gap: clamp(30px,5vw,80px); padding-top: clamp(60px,7vw,110px); align-items: start; }
.fo-notes__intro h2 { margin: 25px 0; }
.fo-notes__intro > p:last-child { max-width: 23ch; font-size: 23px; line-height: 1.15; }
.fo-notes__script { padding-top: 90px; }
.fo-notes__script p:not(.fo-mono) { margin: 22px 0 22px 18%; font-size: clamp(20px,1.8vw,25px); line-height: 1.25; }
.fo-script-end { margin: 35px 0 0 30%; }
.fo-notes__portrait { margin-top: 120px; }
.fo-notes__portrait .fo-picture { aspect-ratio: 4/5; }
.fo-notes__portrait figcaption { padding-top: 12px; font-size: 9px; }

.fo-proof { background: var(--color-fo-ink); color: var(--color-fo-cream); }
.fo-proof__heading { display: flex; justify-content: space-between; align-items: end; gap: 30px; padding: clamp(60px,7vw,110px) 0 55px; }
.fo-proof__heading h2 { margin-top: 25px; }
.fo-proof__heading > p { max-width: 26ch; font-size: 22px; line-height: 1.2; }
.fo-proof__grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: clamp(20px,4vw,60px); align-items: start; }
.fo-proof-card { position: relative; isolation: isolate; min-width: 0; padding: 12px 12px 16px; background: var(--color-fo-paper); color: var(--color-fo-ink); overflow: hidden; transform: perspective(900px) rotateX(0deg) rotateY(0deg); transition: transform var(--fo-base) var(--fo-ease-spring); }
.fo-proof-card__glow { position: absolute; z-index: 2; pointer-events: none; top: 0; left: 0; width: 400px; height: 400px; opacity: 0; background: radial-gradient(circle, color-mix(in srgb, var(--color-fo-cream) 50%, transparent), transparent 68%); transform: translate3d(-200px, -200px, 0); transition: opacity var(--fo-fast) var(--fo-ease-out); }
.fo-proof-card:hover .fo-proof-card__glow { opacity: .6; }
.fo-proof-card--small { margin-top: 100px; }
.fo-proof-card__image { aspect-ratio: 3/2; overflow: hidden; }
.fo-proof-card figcaption { display: flex; justify-content: space-between; gap: 8px; padding-top: 13px; font: 10px/1.2 var(--font-anonymous-pro),monospace; }
.fo-proof__foot { margin-top: 55px !important; }

.fo-inquiry { background: var(--color-fo-paper); color: var(--color-fo-ink); }
.fo-inquiry__layout { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(40px,8vw,140px); padding-top: clamp(60px,7vw,110px); }
.fo-inquiry__layout h2 { margin: 26px 0; }
.fo-inquiry__layout > div:first-child > p:not(.fo-kicker) { max-width: 27ch; font-size: 23px; line-height: 1.2; }
.fo-inquiry__mark { display: inline-block; margin-top: 70px; color: var(--color-fo-ink); }
.fo-form, .fo-form-success { padding: clamp(24px,4vw,55px); background: var(--color-fo-cream); color: var(--color-fo-ink); }
.fo-form { display: grid; }
.fo-form fieldset { display: grid; min-width: 0; margin: 0; padding: 0; border: 0; }
.fo-form__number { margin-bottom: 30px !important; padding-bottom: 20px; border-bottom: 1px solid var(--color-fo-ink); }
.fo-form label { margin: 18px 0 7px; font: 700 11px/1.2 var(--font-anonymous-pro), monospace; letter-spacing: .08em; text-transform: uppercase; }
.fo-form input, .fo-form textarea { width: 100%; border: 0; border-bottom: 1px solid color-mix(in srgb,var(--color-fo-ink) 50%,transparent); border-radius: 0; padding: 10px 0; background: transparent; color: var(--color-fo-ink); font-size: 20px; resize: vertical; }
.fo-form input::placeholder, .fo-form textarea::placeholder { color: color-mix(in srgb,var(--color-fo-ink) 65%,var(--color-fo-cream)); }
.fo-form .fo-action { justify-self: start; margin-top: 30px; background: var(--color-fo-ink); color: var(--color-fo-cream); }
.fo-form__disclaimer { margin-top: 20px !important; font-size: 15px; }
.fo-error { margin-top: 5px !important; color: var(--color-fo-red); font: 700 12px/1.3 var(--font-anonymous-pro),monospace; }
.fo-form-success { position: relative; min-height: 440px; display: flex; flex-direction: column; align-items: start; justify-content: center; gap: 20px; }
.fo-form-success h3 { font: 400 clamp(36px,4vw,56px)/1 var(--font-league-gothic),sans-serif; text-transform: uppercase; }
.fo-form-success > p:not(.fo-kicker) { font-size: 20px; max-width: 30ch; }
.fo-form-success__stamp { align-self: end; border: 2px solid var(--color-fo-red); color: var(--color-fo-red); transform: rotate(-8deg); padding: 9px; text-align: center; font: 700 11px/1 var(--font-anonymous-pro),monospace; }

.fo-footer { background: var(--color-fo-ink); }
.fo-footer__main { display: flex; justify-content: space-between; gap: 40px; padding: 70px 0 100px; }
.fo-footer__main h2 { margin-top: 22px; }
.fo-footer__credits { display: grid; gap: 20px; align-content: end; max-width: 300px; font-size: 15px; }
.fo-footer__credits span { display: block; margin-bottom: 7px; font: 10px/1 var(--font-anonymous-pro),monospace; opacity: .7; }
.fo-footer__bottom { display: flex; justify-content: space-between; align-items: end; gap: 20px; border-top: 1px solid color-mix(in srgb,var(--color-fo-paper),transparent 60%); padding-top: 20px; }

/* All entrances retain visible static content before JavaScript and with reduced motion. */
@media (prefers-reduced-motion: no-preference) {
  .fo-cell { animation: fo-expose 850ms var(--fo-ease-out) backwards; animation-delay: calc(var(--fo-order) * 45ms); }
  .fo-headline-frame h1 { animation: fo-title-in 950ms var(--fo-ease-out) both; animation-delay: 220ms; }
  .fo-rail, .fo-transport { animation: fo-chrome-in 700ms var(--fo-ease-out) both; }
  [data-reveal="rise"][data-in="true"] { animation: fo-rise var(--fo-slow) var(--fo-ease-out) backwards; }
  [data-reveal="mask"][data-in="true"] { animation: fo-mask var(--fo-slow) var(--fo-ease-out) backwards; }
  [data-reveal="scale"][data-in="true"] { animation: fo-scale var(--fo-slow) var(--fo-ease-out) backwards; }
  .fo-work__list { animation: fo-splice 500ms var(--fo-ease-out) both; }
  .fo-viewer__screen { animation: fo-splice 450ms var(--fo-ease-out) both; }
  .fo-form-success { animation: fo-rise 650ms var(--fo-ease-spring) both; }
  .fo-form-success__stamp { animation: fo-stamp 650ms var(--fo-ease-spring) both; }
  @media (hover: hover) and (pointer: fine) { .fo-cell:hover .fo-cell__alternate, .fo-cell:focus-within .fo-cell__alternate, .fo-work__item:hover .fo-work__alternate, .fo-work__item:focus-within .fo-work__alternate { animation: fo-preview 3.6s var(--fo-ease-splice) infinite alternate; } }
}
@keyframes fo-expose { from { opacity: .35; transform: scale(.98); } to { opacity: 1; transform: scale(1); } }
@keyframes fo-title-in { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }
@keyframes fo-chrome-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
@keyframes fo-rise { from { opacity: .45; transform: translateY(26px); } to { opacity: 1; transform: none; } }
@keyframes fo-mask { from { opacity: .45; transform: translateY(20px) perspective(800px) rotateX(3deg); } to { opacity: 1; transform: none; } }
@keyframes fo-scale { from { opacity: .55; transform: scale(.97) translateY(18px); } to { opacity: 1; transform: none; } }
@keyframes fo-splice { from { opacity: .4; transform: translateX(18px); } to { opacity: 1; transform: none; } }
@keyframes fo-stamp { from { opacity: 0; transform: rotate(-8deg) scale(1.35); } to { opacity: 1; transform: rotate(-8deg) scale(1); } }
@keyframes fo-preview { 0%,35% { opacity: 0; } 65%,100% { opacity: 1; } }

@media (max-width: 900px) {
  .fo-work__heading { grid-template-columns: 1fr 2fr; }
  .fo-work__heading > p:last-child { grid-column: 2; }
  .fo-notes__layout { grid-template-columns: 1fr 1fr; }
  .fo-notes__portrait { grid-column: 2; width: 70%; margin: 0 0 0 auto; }
  .fo-notes__script { padding-top: 50px; }
  .fo-transport__center, .fo-transport__mute { display: none; }
  .fo-transport a:last-of-type { margin-left: auto; flex: 0 0 125px; text-align: right; }
}
@media (max-width: 650px) {
  .fo-page { padding-left: 44px; }
  .fo-rail { width: 44px; padding-top: 12px; }
  .fo-rail__brand { font-size: 18px; gap: 10px; }
  .fo-logo svg { width: 24px; height: 27px; }
  .fo-rail__holes { width: 9px; height: 52px; margin-top: 14px; background-size: 9px 15px; }
  .fo-rail__links { height: 230px; font-size: 9px; }
  .fo-rail__links a { height: 52px; }
  .fo-rail__end { font-size: 8px; }
  .fo-transport { padding: 0 12px 0 56px; gap: 18px; font-size: 9px; }
  .fo-transport a:first-of-type span:last-child { display: none; }
  .fo-sheet { height: auto; min-height: 100svh; padding: 14px 8px 24px; }
  .fo-sheet__meta span:nth-child(2), .fo-sheet__caption span:nth-child(2) { display: none; }
  .fo-sheet__meta span:last-child { flex: 0 0 145px; text-align: right; }
  .fo-sheet__grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); grid-template-rows: none; grid-auto-rows: minmax(116px, 35vw); gap: 4px; }
  .fo-headline-frame { grid-column: 1 / -1; grid-row: span 2; min-height: 0; padding: 24px; display: grid; grid-template-rows: 20px minmax(0,1fr) 90px; }
  .fo-headline-frame h1 { align-self: center; font-size: clamp(56px, 14vw, 78px); }
  .fo-headline-frame__bottom p { font-size: 16px; }
  .fo-headline-frame__bottom { width: 100%; height: 90px; align-items: start; flex-direction: column; justify-content: space-between; gap: 0; }
  .fo-headline-frame__bottom > p { height: 42px; }
  .fo-headline-frame__bottom > div { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); width: 100%; gap: 8px; }
  .fo-headline-frame__bottom .fo-text-link { white-space: nowrap; overflow: hidden; }
  .fo-text-link { font-size: 10px; }
  .fo-cell__alternate { display: none; }
  .fo-cell__cue { top: 8px; bottom: auto; opacity: 1; transform: none; font-size: 8px; }
  .fo-section { padding: 70px 20px; }
  .fo-section h2 { font-size: clamp(60px, 15vw, 82px); }
  .fo-reel { min-height: 0; }
  .fo-reel__sticky { position: relative; height: auto; min-height: 0; padding: 25px 12px 50px; }
  .fo-leader span:nth-child(2) { display: none; }
  .fo-reel__image { flex: none; height: 55svh; min-height: 300px; }
  .fo-reel__image > .fo-picture { transform: none; }
  .fo-reel__info { align-items: start; flex-direction: column; gap: 18px; }
  .fo-reel__info h2 { font-size: 50px; }
  .fo-work__heading { display: block; padding: 60px 0; }
  .fo-work__heading h2 { margin: 24px 0; }
  .fo-work__tabs { gap: 16px; justify-content: space-between; }
  .fo-work__tabs button { font-size: 17px; }
  .fo-work__tabs button span { display: none; }
  .fo-work__item { grid-template-columns: 1fr; gap: 15px; }
  .fo-work__image { aspect-ratio: 1.55; }
  .fo-work__detail h3 { margin: 15px 0 12px; }
  .fo-notes__layout { display: block; padding-top: 60px; }
  .fo-notes__script { padding-top: 60px; }
  .fo-notes__script p:not(.fo-mono) { margin-left: 12%; }
  .fo-notes__portrait { width: 74%; margin: 45px 0 0 auto; }
  .fo-proof__heading { display: block; }
  .fo-proof__heading > p { margin-top: 25px; }
  .fo-proof__grid { grid-template-columns: 1fr; }
  .fo-proof-card--small { width: 80%; margin: 0 0 0 auto; }
  .fo-inquiry__layout { grid-template-columns: 1fr; }
  .fo-inquiry__mark { margin-top: 35px; }
  .fo-footer__main { display: block; padding-bottom: 60px; }
  .fo-footer__credits { margin-top: 50px; }
  .fo-footer__bottom { align-items: start; flex-direction: column; }
  .fo-viewer__top { min-height: 56px; font-size: 9px; }
  .fo-viewer__screen { flex: none; margin: 0 12px; min-height: 0; aspect-ratio: 16/9; }
  .fo-viewer__bottom { flex: 1; display: flex; flex-direction: column; align-items: stretch; justify-content: space-between; padding: 18px 16px 24px; }
  .fo-viewer__info h2 { font-size: 42px; }
  .fo-viewer__info > p:last-child { font-size: 16px; }
  .fo-viewer__controls { display: flex; align-items: center; justify-content: space-between; margin-top: 18px; text-align: left; }
  .fo-viewer__controls > span:last-child { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .fo-body *, .fo-body *::before, .fo-body *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }
  .fo-reel__image > .fo-picture, .fo-proof-card, .fo-magnetic { transform: none !important; }
  .fo-page[data-viewing="true"] .fo-cell { transform: none !important; }
  .fo-reel { min-height: 0; }
  .fo-reel__sticky { position: relative; }
}
]]>
    </file>
    <file path="src/app/(frameone)/frameone/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 72"><path fill="#201D1E" d="M0 0h64v72H0z"/><g fill="none" stroke="#F7F2E9" stroke-width="2.5"><path d="M4 5h56v62H4zM14 15h36v41H14zM9 14v5m0 8v5m0 8v5m0 8v5M55 14v5m0 8v5m0 8v5m0 8v5"/><path stroke="#B13F32" stroke-width="4" d="m24 47 16-24"/></g></svg>
]]>
    </file>
    <file path="src/app/(frameone)/frameone/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#201D1E", color: "#F7F2E9" }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, letterSpacing: 4 }}><span>FRAME / ONE</span><span>FILM &amp; STILL</span></div>
    <div style={{ display: "flex", alignItems: "flex-end", gap: 28 }}><div style={{ width: 11, height: 190, background: "#B13F32" }} /><div style={{ display: "flex", flexDirection: "column", fontSize: 100, lineHeight: 0.95, fontWeight: 700 }}><span>EVERY FRAME</span><span>HAS A STORY.</span></div></div>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, letterSpacing: 3 }}><span>AN INDEPENDENT PRACTICE</span><span>FICTIONAL PORTFOLIO / 01</span></div>
  </div>, size);
}
]]>
    </file>
    <file path="src/app/(frameone)/frameone/page.tsx">
<![CDATA[import { Grain } from "./assets";
import { MotionDirector } from "./motion/MotionDirector";
import { Chrome } from "./sections/Chrome";
import { DirectorNotes } from "./sections/DirectorNotes";
import { Footer } from "./sections/Footer";
import { Inquiry } from "./sections/Inquiry";
import { ProofSheet } from "./sections/ProofSheet";
import { SelectedReel } from "./sections/SelectedReel";
import { WorkSwitcher } from "./sections/WorkSwitcher";
import { ContactSheet } from "./sheet/ContactSheet";
import { FilmProvider } from "./sheet/FilmProvider";

export default function FrameOnePage() {
  return <FilmProvider><MotionDirector /><Grain /><Chrome /><main id="main"><ContactSheet /><SelectedReel /><WorkSwitcher /><DirectorNotes /><ProofSheet /><Inquiry /></main><Footer /></FilmProvider>;
}
]]>
    </file>
    <file path="src/app/(frameone)/frameone/brand/Logo.tsx">
<![CDATA[export function Logo({ compact = false }: { compact?: boolean }) {
  return <span className={`fo-logo${compact ? " fo-logo--compact" : ""}`} aria-label="Frame One">
    <svg viewBox="0 0 64 72" aria-hidden="true" fill="none">
      <path d="M4 5h56v62H4zM14 15h36v41H14zM9 14v5m0 8v5m0 8v5m0 8v5M55 14v5m0 8v5m0 8v5m0 8v5" stroke="currentColor" strokeWidth="2.5" />
      <path d="m24 47 16-24" stroke="currentColor" strokeWidth="4" />
    </svg>
    {!compact && <span>FRAME<span className="fo-red">/</span>ONE</span>}
  </span>;
}
]]>
    </file>
    <file path="src/app/(frameone)/frameone/content/projects.ts">
<![CDATA[export type Category = "Nonfiction" | "Fiction" | "Commercial";
export type Project = {
  id: string; title: string; category: Category; year: string; length: string;
  caption: string; synopsis: string; note: string; credits: string; stills: readonly [string, string];
};

export const PROJECTS: readonly Project[] = [
  { id: "breakwater", title: "Where the Breakwater Ends", category: "Nonfiction", year: "2025", length: "04:12", caption: "The morning begins before anyone is watching.", synopsis: "A quiet study of a harbor waking, and the hands that know it by heart.", note: "We waited for the harbor to make the first move. The only direction was to leave the camera running.", credits: "Direction & photography: FRAME/ONE · Fictional study", stills: ["01-film-a-still", "02-film-b-still"] },
  { id: "room", title: "The Room Keeps Light", category: "Fiction", year: "2024", length: "06:38", caption: "Some rooms remember the people who leave.", synopsis: "A woman moves through an apartment as the last of the afternoon changes its shape.", note: "The room needed to feel inhabited, even in the moments when no one was in the frame.", credits: "Direction & photography: FRAME/ONE · Fictional study", stills: ["03-film-c-still", "04-film-d-still"] },
  { id: "daylight", title: "An Object in Daylight", category: "Commercial", year: "2025", length: "00:45", caption: "A little light, held a little longer.", synopsis: "An imagined object study about the texture of ordinary mornings.", note: "The object was never the whole story. We looked for the small rituals that gather around it.", credits: "Direction & photography: FRAME/ONE · Fictional concept", stills: ["05-film-e-still", "06-film-f-still"] },
  { id: "blue-hour", title: "Across the Blue Hour", category: "Fiction", year: "2023", length: "05:24", caption: "There is still time to turn around.", synopsis: "A traveler pauses on an empty coastal road between departure and return.", note: "We kept the camera still and let the changing light carry the scene across the cut.", credits: "Direction & photography: FRAME/ONE · Fictional study", stills: ["07-film-g-still", "08-film-h-still"] },
];
]]>
    </file>
    <file path="src/app/(frameone)/frameone/forms/inquiry.ts">
<![CDATA[export type Inquiry = { name: string; email: string; project: string };
export type InquiryErrors = Partial<Record<keyof Inquiry, string>>;
export function validateInquiry(inquiry: Inquiry): InquiryErrors {
  const errors: InquiryErrors = {};
  const name = inquiry.name.trim();
  const email = inquiry.email.trim();
  const project = inquiry.project.trim();
  if (!name || name.length > 100) errors.name = "Enter your name (up to 100 characters).";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address.";
  if (project.length < 10 || project.length > 2000) errors.project = "Describe your project in 10 to 2,000 characters.";
  return errors;
}
]]>
    </file>
    <file path="src/app/(frameone)/frameone/forms/InquiryForm.tsx">
<![CDATA["use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { validateInquiry, type Inquiry, type InquiryErrors } from "./inquiry";

const EMPTY: Inquiry = { name: "", email: "", project: "" };
const subscribeToHydration = () => () => {};

export function InquiryForm() {
  const [values, setValues] = useState<Inquiry>(EMPTY);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [status, setStatus] = useState<"idle" | "preparing" | "ready">("idle");
  const interactive = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const timer = useRef<number | null>(null);
  useEffect(() => () => { if (timer.current !== null) clearTimeout(timer.current); }, []);

  const change = (field: keyof Inquiry, value: string) => { setValues((previous) => ({ ...previous, [field]: value })); setErrors((previous) => ({ ...previous, [field]: undefined })); };
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateInquiry(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const first = Object.keys(nextErrors)[0];
      event.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("preparing");
    timer.current = window.setTimeout(() => setStatus("ready"), 450);
  };

  return status === "ready" ? <div className="fo-form-success" role="status"><span className="fo-form-success__stamp">PREPARED<br />LOCALLY</span><p className="fo-kicker">INQUIRY / 001</p><h3>Thank you, {values.name.trim()}.</h3><p>Your inquiry is ready as a local demonstration. It has not been sent.</p><button type="button" className="fo-text-link" onClick={() => setStatus("idle")}>Edit details ↗</button></div> :
    <form className="fo-form" onSubmit={submit} noValidate>
      <p className="fo-form__number fo-mono">PROJECT INQUIRY / 001</p>
      <fieldset disabled={!interactive || status === "preparing"}>
      <label htmlFor="fo-name">Name</label><input id="fo-name" name="name" value={values.name} onChange={(event) => change("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "fo-name-error" : undefined} maxLength={100} autoComplete="name" placeholder="Your name" />{errors.name && <p className="fo-error" id="fo-name-error">{errors.name}</p>}
      <label htmlFor="fo-email">Email</label><input id="fo-email" name="email" type="email" value={values.email} onChange={(event) => change("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "fo-email-error" : undefined} maxLength={254} autoComplete="email" placeholder="you@example.com" />{errors.email && <p className="fo-error" id="fo-email-error">{errors.email}</p>}
      <label htmlFor="fo-project">Project details</label><textarea id="fo-project" name="project" value={values.project} onChange={(event) => change("project", event.target.value)} aria-invalid={Boolean(errors.project)} aria-describedby={errors.project ? "fo-project-error" : undefined} maxLength={2000} rows={3} placeholder="Tell us a little about the story." />{errors.project && <p className="fo-error" id="fo-project-error">{errors.project}</p>}
      <button className="fo-action fo-magnetic" data-pointer type="submit" disabled={status === "preparing"}>{status === "preparing" ? "Preparing…" : "Prepare inquiry"} <span aria-hidden="true">↗</span></button>
      </fieldset>
      <noscript><p className="fo-form__disclaimer">Enable JavaScript to prepare this local demonstration. No information is sent.</p></noscript>
      <p className="fo-form__disclaimer">This is a portfolio demonstration. No message is sent.</p>
    </form>;
}
]]>
    </file>
    <file path="src/app/(frameone)/frameone/motion/math.ts">
<![CDATA[export function clamp(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function pinProgress(y: number, top: number, height: number, viewport: number): number {
  return height > viewport ? clamp((y - top) / (height - viewport)) : 0;
}
]]>
    </file>
    <file path="src/app/(frameone)/frameone/motion/MotionDirector.tsx">
<![CDATA["use client";

import { useEffect } from "react";
import { pinProgress } from "./math";

export function MotionDirector() {
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const reveals = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.in = "true"; observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    reveals.forEach((element) => observer.observe(element));

    let scrollFrame = 0;
    const progressBar = document.querySelector<HTMLElement>(".fo-transport__progress");
    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-scene]"));
    const wide = matchMedia("(min-width: 651px)");
    const updateScroll = () => {
      scrollFrame = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      if (progressBar) progressBar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      scenes.forEach((scene) => {
        const rect = scene.getBoundingClientRect();
        const picture = scene.querySelector<HTMLElement>(".fo-reel__image > .fo-picture");
        if (picture) {
          const progress = pinProgress(scrollY, rect.top + scrollY, rect.height, innerHeight);
          picture.style.transform = !reduce.matches && wide.matches ? `scale(1.08) translate3d(0, ${-30 * progress}px, 0)` : "";
        }
      });
    };
    const onScroll = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll, { passive: true });
    reduce.addEventListener("change", onScroll);
    updateScroll();

    let pointerFrame = 0;
    let current: { element: HTMLElement; x: number; y: number } | null = null;
    const onPointerMove = (event: PointerEvent) => {
      if (reduce.matches || !fine.matches) return;
      const element = (event.target as Element).closest<HTMLElement>("[data-pointer]");
      if (!element) return;
      current = { element, x: event.clientX, y: event.clientY };
      if (pointerFrame) return;
      pointerFrame = requestAnimationFrame(() => {
        pointerFrame = 0;
        if (!current) return;
        const { element: target, x, y } = current;
        const rect = target.getBoundingClientRect();
        const nx = (x - rect.left) / rect.width - 0.5;
        const ny = (y - rect.top) / rect.height - 0.5;
        if (target.classList.contains("fo-magnetic")) {
          target.style.setProperty("--fo-pull-x", `${nx * 10}px`);
          target.style.setProperty("--fo-pull-y", `${ny * 8}px`);
        }
        if (target.classList.contains("fo-proof-card")) {
          target.style.transform = `perspective(900px) rotateX(${-ny * 5}deg) rotateY(${nx * 5}deg)`;
          const glow = target.querySelector<HTMLElement>(".fo-proof-card__glow");
          if (glow) glow.style.transform = `translate3d(${x - rect.left - 200}px, ${y - rect.top - 200}px, 0)`;
        }
        const scan = target.querySelector<HTMLElement>(".fo-cell__scan");
        if (scan) scan.style.transform = `translate3d(0, ${y - rect.top}px, 0)`;
      });
    };
    const onPointerOut = (event: PointerEvent) => {
      const element = (event.target as Element).closest<HTMLElement>("[data-pointer]");
      if (!element || (event.relatedTarget instanceof Node && element.contains(event.relatedTarget))) return;
      ["--fo-pull-x", "--fo-pull-y"].forEach((property) => element.style.removeProperty(property));
      if (element.classList.contains("fo-proof-card")) element.style.removeProperty("transform");
    };
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    return () => {
      observer.disconnect(); cancelAnimationFrame(scrollFrame); cancelAnimationFrame(pointerFrame);
      removeEventListener("scroll", onScroll); removeEventListener("resize", onScroll); reduce.removeEventListener("change", onScroll);
      document.removeEventListener("pointermove", onPointerMove); document.removeEventListener("pointerout", onPointerOut);
    };
  }, []);
  return null;
}
]]>
    </file>
    <file path="src/app/(frameone)/frameone/sections/Chrome.tsx">
<![CDATA[import { Logo } from "../brand/Logo";

export function Chrome() {
  return <>
    <a className="fo-skip" href="#main">Skip to content</a>
    <nav className="fo-rail" aria-label="Main navigation">
      <a href="#sheet" className="fo-rail__brand" aria-label="FRAME/ONE, back to contact sheet"><Logo compact /><span>FRAME<span className="fo-red">/</span>ONE</span></a>
      <span className="fo-rail__holes" aria-hidden="true" />
      <div className="fo-rail__links fo-mono"><a href="#sheet">INDEX</a><a href="#work">WORK</a><a href="#notes">NOTES</a><a href="#inquiry">CONTACT</a></div>
      <span className="fo-rail__end fo-mono">F/O · 001</span>
    </nav>
    <div className="fo-transport" aria-label="Page transport">
      <span className="fo-transport__progress" aria-hidden="true" />
      <a href="#sheet" aria-label="Index: back to contact sheet"><span aria-hidden="true">↤</span> <span>INDEX</span></a><a href="#selected" aria-label="View the films"><span aria-hidden="true">▷</span> <span>VIEW THE FILMS</span></a>
      <span className="fo-transport__center">A PORTFOLIO IN MOTION &amp; STILL</span>
      <a href="#inquiry">START A PROJECT <span aria-hidden="true">↗</span></a><span className="fo-transport__mute">MUTED / 01:16</span>
    </div>
  </>;
}
]]>
    </file>
    <file path="src/app/(frameone)/frameone/sections/DirectorNotes.tsx">
<![CDATA[import { Picture } from "../assets";

export function DirectorNotes() {
  return <section className="fo-notes fo-section" id="notes">
    <div className="fo-section-top fo-mono"><span>03 / DIRECTOR’S NOTES</span><span>ON LOOKING CLOSER</span></div>
    <div className="fo-notes__layout"><div className="fo-notes__intro" data-reveal="mask"><p className="fo-kicker">A NOTE FROM THE DIRECTOR</p><h2>Stay a little<br /><em>longer.</em></h2><p>Sometimes the most honest part of a story is the moment just before it begins.</p></div>
      <div className="fo-notes__script" data-reveal="rise"><p className="fo-script-line fo-mono">INT. A QUIET ROOM — LATE AFTERNOON</p><p>The light moves across the wall. Someone is about to speak, but doesn’t.</p><p>That is where I like to begin. With room for a gesture, a place, or a pause to tell us something we couldn’t have planned.</p><p>Working across nonfiction, fiction and imagined commissions, I make pictures that feel lived in. Small crews. Open eyes. Space for the unexpected.</p><p className="fo-script-end fo-mono">CUT TO: THE NEXT FRAME _</p></div>
      <figure className="fo-notes__portrait" data-reveal="scale"><Picture assetKey="11-director-portrait" alt="Fictional director portrait" /><figcaption className="fo-mono">THE DIRECTOR / A FICTIONAL PORTRAIT</figcaption></figure>
    </div>
  </section>;
}
]]>
    </file>
    <file path="src/app/(frameone)/frameone/sections/Footer.tsx">
<![CDATA[import { Logo } from "../brand/Logo";

export function Footer() {
  return <footer className="fo-footer fo-section"><div className="fo-section-top fo-mono"><span>06 / END CREDITS</span><a href="#sheet">BACK TO FIRST FRAME ↑</a></div><div className="fo-footer__main" data-reveal="rise"><div><p className="fo-kicker">ONE LAST THING</p><h2>Thank you<br /><em>for looking.</em></h2></div><div className="fo-footer__credits"><p><span>CONCEPT &amp; DIRECTION</span>FRAME / ONE</p><p><span>STARRING</span>LIGHT, TIME &amp; A LITTLE PATIENCE</p><p><span>THE FINE PRINT</span>All projects in this portfolio are fictional.</p></div></div><div className="fo-footer__bottom"><Logo /><span className="fo-mono">A FICTIONAL PORTFOLIO / 2026</span><span className="fo-mono">THE END · 001—016</span></div></footer>;
}
]]>
    </file>
    <file path="src/app/(frameone)/frameone/sections/Inquiry.tsx">
<![CDATA[import { InquiryForm } from "../forms/InquiryForm";

export function Inquiry() {
  return <section className="fo-inquiry fo-section" id="inquiry"><div className="fo-section-top fo-mono"><span>05 / PROJECT INQUIRY</span><span>THE NEXT FRAME</span></div><div className="fo-inquiry__layout"><div data-reveal="mask"><p className="fo-kicker">HAVE A STORY IN MIND?</p><h2>Let’s make<br /><em>something</em><br />that stays.</h2><p>Every project begins with a conversation. Tell us what you are imagining.</p><span className="fo-inquiry__mark fo-mono">FRAME / ONE<br />INQUIRY SHEET 001</span></div><div data-reveal="rise"><InquiryForm /></div></div></section>;
}
]]>
    </file>
    <file path="src/app/(frameone)/frameone/sections/ProofSheet.tsx">
<![CDATA[import { Picture } from "../assets";

export function ProofSheet() {
  return <section className="fo-proof fo-section" id="proof">
    <div className="fo-section-top fo-mono"><span>04 / BEHIND THE FRAME</span><span>PROOF SHEET 002</span></div>
    <div className="fo-proof__heading" data-reveal="mask"><div><p className="fo-kicker">THE PART YOU DON’T SEE</p><h2>Between<br /><em>the takes.</em></h2></div><p>A little evidence of the people, places and practical magic behind the picture.</p></div>
    <div className="fo-proof__grid">
      <figure className="fo-proof-card fo-proof-card--large" data-pointer data-reveal="scale"><div className="fo-proof-card__image"><Picture assetKey="09-bts-a" alt="Fictional behind-the-scenes harbor scene" /></div><span className="fo-proof-card__glow" aria-hidden="true" /><figcaption><span>01 / THE HARBOR</span><span>BEFORE FIRST LIGHT</span></figcaption></figure>
      <figure className="fo-proof-card fo-proof-card--small" data-pointer data-reveal="scale"><div className="fo-proof-card__image"><Picture assetKey="10-bts-b" alt="Fictional behind-the-scenes apartment scene" /></div><span className="fo-proof-card__glow" aria-hidden="true" /><figcaption><span>02 / THE ROOM</span><span>BETWEEN SETUPS</span></figcaption></figure>
    </div>
    <p className="fo-proof__foot fo-mono">ALL PROJECTS IN THIS PORTFOLIO ARE FICTIONAL. &nbsp; / &nbsp; NO CLIENTS OR AWARDS IMPLIED.</p>
  </section>;
}
]]>
    </file>
    <file path="src/app/(frameone)/frameone/sections/SelectedReel.tsx">
<![CDATA[import { Picture } from "../assets";
import { PROJECTS } from "../content/projects";
import { OpenProject } from "../sheet/OpenProject";

export function SelectedReel() {
  const film = PROJECTS[0];
  return <section className="fo-reel" id="selected" data-scroll-scene>
    <div className="fo-reel__sticky">
      <div className="fo-leader fo-mono"><span>01 / SELECTED FILM</span><span>FRAME / ONE · MOTION &amp; STILL</span><span>01:16</span></div>
      <div className="fo-reel__image"><Picture assetKey={film.stills[0]} alt="A fictional harbor film still" /><span className="fo-reel__eyebrow fo-mono">A FRAME/ONE FILM &nbsp; / &nbsp; {film.year}</span><h2 className="fo-reel__title">{film.title}</h2><span className="fo-reel__subtitle">{film.caption}</span><span className="fo-reel__marker fo-mono">01A / 24 FPS</span></div>
      <div className="fo-reel__info" data-reveal="rise"><div><p className="fo-kicker">A SELECTED EXPOSURE / 01</p><p className="fo-reel__ident">NONFICTION / {film.year} / {film.length}</p></div><p>{film.synopsis}</p><OpenProject index={0} className="fo-action fo-magnetic">Open the film <span aria-hidden="true">↗</span></OpenProject></div>
    </div>
  </section>;
}
]]>
    </file>
    <file path="src/app/(frameone)/frameone/sections/WorkSwitcher.tsx">
<![CDATA["use client";

import { useState } from "react";
import { Picture } from "../assets";
import { PROJECTS, type Category } from "../content/projects";
import { OpenProject } from "../sheet/OpenProject";

const CATEGORIES: Category[] = ["Nonfiction", "Fiction", "Commercial"];

export function WorkSwitcher() {
  const [category, setCategory] = useState<Category>("Nonfiction");
  const visible = PROJECTS.map((project, index) => ({ project, index })).filter(({ project }) => project.category === category);
  return <section className="fo-work fo-section" id="work">
    <div className="fo-section-top fo-mono"><span>02 / THE WORK</span><span>FOUR FICTIONAL STUDIES</span></div>
    <div className="fo-work__heading" data-reveal="mask"><p className="fo-kicker">A SMALL SELECTION</p><h2>Stories, in<br /><em>their own light.</em></h2><p>Some are observed. Some are imagined. Each starts with a feeling worth staying with.</p></div>
    <div className="fo-work__tabs" aria-label="Filter work by category">{CATEGORIES.map((item, index) => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}><span className="fo-mono" aria-hidden="true">0{index + 1}</span> {item}</button>)}</div>
    <div className="fo-work__list" key={category}>
      {visible.map(({ project, index }) => <article className="fo-work__item" key={project.id}>
        <div className="fo-work__image"><Picture assetKey={project.stills[0]} alt={`${project.title}, fictional still`} /><Picture assetKey={project.stills[1]} alt="" className="fo-work__alternate" /><span className="fo-work__image-caption">{project.caption}</span></div>
        <div className="fo-work__detail"><p className="fo-kicker">{project.category} / {project.year} / {project.length}</p><h3>{project.title}</h3><p>{project.synopsis}</p><OpenProject index={index} className="fo-work__open">VIEW PROJECT <span aria-hidden="true">↗</span></OpenProject><small className="fo-mono">FICTIONAL PROJECT / {String(index + 1).padStart(2, "0")}</small></div>
      </article>)}
    </div>
    <noscript><div className="fo-noscript-work"><h3>All fictional projects</h3>{PROJECTS.map((project) => <p key={project.id}><strong>{project.title}</strong> — {project.category}. {project.synopsis}</p>)}</div></noscript>
  </section>;
}
]]>
    </file>
    <file path="src/app/(frameone)/frameone/sheet/ContactSheet.tsx">
<![CDATA["use client";

import { Picture } from "../assets";
import { PROJECTS } from "../content/projects";
import { useFilm } from "./FilmProvider";

export function ContactSheet() {
  const { openProject } = useFilm();
  return <section className="fo-sheet" id="sheet" aria-labelledby="fo-title">
    <div className="fo-sheet__meta fo-mono"><span>DIRECTOR / PHOTOGRAPHER</span><span>AN INDEPENDENT PRACTICE &nbsp; / &nbsp; EST. IN IMAGINATION</span><span>CONTACT SHEET 001</span></div>
    <div className="fo-sheet__grid">
      <div className="fo-headline-frame">
        <p className="fo-kicker">FRAME / ONE <span>·</span> AN INDEPENDENT PRACTICE</p>
        <h1 id="fo-title">Every frame<br />has a story<span>.</span></h1>
        <div className="fo-headline-frame__bottom"><p>Moving images and stills,<br />made to stay with you.</p><div><a className="fo-text-link fo-magnetic" data-pointer href="#selected">View the films <span aria-hidden="true">↗</span></a><a className="fo-text-link" href="#inquiry">Start a project <span aria-hidden="true">↗</span></a></div></div>
      </div>
      {Array.from({ length: 16 }, (_, frame) => {
        const projectIndex = frame % PROJECTS.length;
        const project = PROJECTS[projectIndex];
        const still = Math.floor(frame / PROJECTS.length) % 2;
        return <div className="fo-cell" data-pointer key={frame} style={{ "--fo-order": (frame * 7) % 16 } as React.CSSProperties}>
          <Picture assetKey={project.stills[still]} alt="" />
          <Picture assetKey={project.stills[1 - still]} alt="" className="fo-cell__alternate" />
          <span className="fo-cell__scan" aria-hidden="true" />
          <span className="fo-cell__number fo-mono" aria-hidden="true">{String(frame + 1).padStart(2, "0")}A</span>
          {frame === 5 && <span className="fo-cell__subtitle" aria-hidden="true">{project.caption}</span>}
          <span className="fo-cell__cue fo-mono" aria-hidden="true">VIEW FRAME ↗</span>
          <a className="fo-cell__link" data-frame href="#work" aria-label={`View frame ${String(frame + 1).padStart(2, "0")}A: ${project.title}`}
            onClick={(event) => { event.preventDefault(); openProject(projectIndex, event.currentTarget, still); }} />
        </div>;
      })}
    </div>
    <div className="fo-sheet__caption fo-mono"><span>SELECT AN EXPOSURE TO BEGIN</span><span>ALL PROJECTS ARE FICTIONAL</span><span>001—016</span></div>
  </section>;
}
]]>
    </file>
    <file path="src/app/(frameone)/frameone/sheet/FilmProvider.tsx">
<![CDATA["use client";

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Picture } from "../assets";
import { PROJECTS } from "../content/projects";
import { frameTransform, nextProject } from "./sheet";

type FilmContextValue = { openProject: (index: number, origin: HTMLElement, still?: number) => void };
const FilmContext = createContext<FilmContextValue | null>(null);

export function useFilm() {
  const value = useContext(FilmContext);
  if (!value) throw new Error("Film controls must be inside FilmProvider");
  return value;
}

export function FilmProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<number | null>(null);
  const [openingStill, setOpeningStill] = useState(0);
  const origin = useRef<HTMLElement | null>(null);
  const originCell = useRef<HTMLElement | null>(null);
  const openProject = useCallback((index: number, element: HTMLElement, still = 0) => {
    origin.current = element;
    originCell.current = element.closest<HTMLElement>(".fo-cell");
    if (originCell.current) originCell.current.dataset.origin = "true";
    setOpeningStill(still === 1 ? 1 : 0);
    setActive(nextProject(index, 0, PROJECTS.length));
  }, []);
  const finishClose = useCallback(() => {
    originCell.current?.removeAttribute("data-origin");
    setActive(null);
    requestAnimationFrame(() => origin.current?.focus({ preventScroll: true }));
  }, []);
  return <FilmContext.Provider value={{ openProject }}>
    <div className="fo-page" data-viewing={active !== null} inert={active !== null || undefined}>{children}</div>
    {active !== null && <FilmViewer index={active} initialStill={openingStill} setIndex={setActive} origin={origin.current} onClose={finishClose} />}
  </FilmContext.Provider>;
}

function FilmViewer({ index, initialStill, setIndex, origin, onClose }: { index: number; initialStill: number; setIndex: (value: number) => void; origin: HTMLElement | null; onClose: () => void }) {
  const stage = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  const animation = useRef<Animation | null>(null);
  const [playing, setPlaying] = useState(false);
  const [still, setStill] = useState(initialStill);
  const project = PROJECTS[index];

  const transformToOrigin = useCallback(() => {
    const rect = origin?.getBoundingClientRect();
    if (!rect) return "none";
    const t = frameTransform(rect, innerWidth, innerHeight);
    return `translate3d(${t.x}px, ${t.y}px, 0) scale(${t.scaleX}, ${t.scaleY})`;
  }, [origin]);

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    const currentTransform = stage.current ? getComputedStyle(stage.current).transform : "none";
    animation.current?.cancel();
    if (!stage.current || matchMedia("(prefers-reduced-motion: reduce)").matches) { onClose(); return; }
    animation.current = stage.current.animate([{ transform: currentTransform }, { transform: transformToOrigin() }], { duration: 550, easing: "cubic-bezier(.76,0,.24,1)", fill: "forwards" });
    animation.current.finished.then(onClose).catch(() => {});
  }, [onClose, transformToOrigin]);

  useLayoutEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus({ preventScroll: true });
    if (stage.current && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animation.current = stage.current.animate([{ transform: transformToOrigin() }, { transform: "none" }], { duration: 650, easing: "cubic-bezier(.22,1,.36,1)", fill: "both" });
    }
    return () => { animation.current?.cancel(); document.body.style.overflow = previousOverflow; };
  }, [transformToOrigin]);

  const navigate = useCallback((step: number) => {
    setStill(0);
    setIndex(nextProject(index, step, PROJECTS.length));
  }, [index, setIndex]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setStill((value) => (value + 1) % 2), 2400);
    return () => window.clearInterval(timer);
  }, [playing]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); close(); return; }
      const target = event.target as HTMLElement;
      if (event.key === "Tab" && stage.current) {
        const controls = Array.from(stage.current.querySelectorAll<HTMLElement>("button:not([disabled]), a[href], [tabindex]:not([tabindex='-1'])"));
        if (!controls.length) return;
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
      if (target.matches("input, textarea, select, [contenteditable=true]")) return;
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault(); navigate(event.key === "ArrowRight" ? 1 : -1);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [close, navigate]);

  return <div ref={stage} className="fo-viewer" role="dialog" aria-modal="true" aria-label="Project viewer" aria-describedby="fo-viewer-description">
    <div className="fo-viewer__top fo-mono"><span>FRAME / ONE &nbsp; · &nbsp; PROJECT {String(index + 1).padStart(2, "0")} / 04</span><button ref={closeButton} type="button" onClick={close} aria-label="Close project viewer">CLOSE <span aria-hidden="true">×</span></button></div>
    <div className="fo-viewer__screen" key={`${project.id}-${still}`}>
      <Picture assetKey={project.stills[still]} alt={`${project.title}, fictional film still`} priority />
      <p className="fo-viewer__subtitle">{project.caption}</p>
      <span className="fo-viewer__screen-count fo-mono">{String(still + 1).padStart(2, "0")} / 02</span>
    </div>
    <div className="fo-viewer__bottom">
      <div className="fo-viewer__info"><p className="fo-kicker">{project.category} / {project.year} / FICTIONAL</p><h2 data-project-title>{project.title}</h2><p id="fo-viewer-description">{project.note}</p></div>
      <div className="fo-viewer__controls fo-mono">
        <div className="fo-viewer__transport"><button type="button" aria-label="Previous project" onClick={() => navigate(-1)}>←</button><button type="button" aria-label={playing ? "Pause sequence" : "Play sequence"} onClick={() => setPlaying(!playing)}>{playing ? "Ⅱ" : "▷"}</button><button type="button" aria-label="Next project" onClick={() => navigate(1)}>→</button></div>
        <span>MUTED &nbsp; / &nbsp; {project.length}</span>
        <span>← → NAVIGATE &nbsp; / &nbsp; ESC CLOSE</span>
      </div>
    </div>
  </div>;
}
]]>
    </file>
    <file path="src/app/(frameone)/frameone/sheet/OpenProject.tsx">
<![CDATA["use client";

import { useFilm } from "./FilmProvider";

export function OpenProject({ index, children, className = "" }: { index: number; children: React.ReactNode; className?: string }) {
  const { openProject } = useFilm();
  return <button className={className} data-pointer type="button" onClick={(event) => openProject(index, event.currentTarget)}>{children}</button>;
}
]]>
    </file>
    <file path="src/app/(frameone)/frameone/sheet/sheet.ts">
<![CDATA[export type FrameRect = { left: number; top: number; width: number; height: number };

export function nextProject(index: number, step: number, count: number): number {
  return count > 0 ? ((index + step) % count + count) % count : 0;
}

export function frameTransform(rect: FrameRect, width: number, height: number) {
  return {
    x: rect.left,
    y: rect.top,
    scaleX: width > 0 && rect.width > 0 ? rect.width / width : 1,
    scaleY: height > 0 && rect.height > 0 ? rect.height / height : 1,
  };
}
]]>
    </file>
  </files>
</template>
