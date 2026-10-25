<template slug="flori" name="Flori">
  <dependencies>
    {
      "dependencies": {
        "lenis": "^1.3.27"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(flori)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Lora, Outfit, Caveat } from "next/font/google";
import "./flori/flori.css";

const display = Lora({ subsets: ["latin"], weight: "500", style: ["normal", "italic"], variable: "--font-flori-lora" });
const body = Outfit({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-flori-outfit" });
const handwritten = Caveat({ subsets: ["latin"], weight: "500", variable: "--font-flori-caveat" });

export const metadata: Metadata = {
  title: "Flori — A little bloom. A brighter day.",
  description: "A little flower club for everyday occasions. Seasonal bunches, beautifully gathered, from £24. Find your flower feeling.",
};
export const viewport: Viewport = { themeColor: "#FFF9F0", colorScheme: "light" };

export default function FloriLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${display.variable} ${body.variable} ${handwritten.variable}`}>
    <body className="fl-body">
      <noscript><style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}.fl-enhanced{display:none!important}.fl-nojs{display:block!important}.fl-load{animation:none!important}`}</style></noscript>
      {children}
    </body>
  </html>;
}
]]>
    </file>
    <file path="src/app/(flori)/flori/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(flori)/flori/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";
export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp") {
  return key in ASSETS ? `/templates/flori/${key}-${width}.${format}` : null;
}
export function Picture({ assetKey, alt, className, priority = false }: { assetKey: string; alt: string; className?: string; priority?: boolean }) {
  const src = assetSrc(assetKey, 800);
  if (!src) return <div className={`fl-placeholder ${className ?? ""}`} role="img" aria-label={alt}><span>{assetKey}</span></div>;
  const { w, h } = ASSETS[assetKey];
  return <picture className={className}><source type="image/avif" srcSet={`${assetSrc(assetKey, 800, "avif")} 800w, ${assetSrc(assetKey, 1600, "avif")} 1600w`} sizes="(min-width:900px) 33vw,100vw" /><img src={src} width={w} height={h} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" /></picture>;
}
]]>
    </file>
    <file path="src/app/(flori)/flori/flori.css">
<![CDATA[@import "tailwindcss";

/* Local animation properties do not invalidate every botanical descendant. */
@property --fl-gather { syntax: "<number>"; inherits: false; initial-value: 1; }
@property --fl-progress { syntax: "<number>"; inherits: false; initial-value: 0; }
@property --fl-hero-exit { syntax: "<number>"; inherits: false; initial-value: 0; }

@theme {
  --color-flori-paper: #FFF9F0;
  --color-flori-ink: #344C40;
  --color-flori-blush: #F1C6CF;
  --color-flori-lilac: #D8D1EC;
  --color-flori-pistachio: #D9E6C8;
  --color-flori-butter: #F5DF9B;
  --color-flori-apricot: #EDB997;
  --color-flori-sage: #91AAA0;
  --ease-out: cubic-bezier(.22,1,.36,1);
  --ease-out-expo: cubic-bezier(.16,1,.3,1);
  --ease-in-out: cubic-bezier(.65,0,.35,1);
  --ease-spring: linear(0,.5 15%,1.03 50%,1);
  --dur-instant: 90ms;
  --dur-fast: 180ms;
  --dur-base: 420ms;
  --dur-slow: 850ms;
  --dur-hero: 1200ms;
  --reveal-shift: 26px;
  --stagger: 75ms;
}

.fl-body {
  --fl-paper: #FFF9F0; --fl-ink: #344C40; --fl-blush: #F1C6CF; --fl-lilac: #D8D1EC;
  --fl-pistachio: #D9E6C8; --fl-butter: #F5DF9B; --fl-apricot: #EDB997; --fl-sage: #91AAA0;
  --fl-display: var(--font-flori-lora), Georgia, serif;
  --fl-body-font: var(--font-flori-outfit), sans-serif;
  --fl-script-font: var(--font-flori-caveat), cursive;
  margin: 0; color: var(--fl-ink); background: var(--fl-paper); font: 400 16px/1.6 var(--fl-body-font); -webkit-font-smoothing: antialiased;
}
.fl-body *, .fl-body *::before, .fl-body *::after { box-sizing: border-box; }
.fl-body ::selection { color: var(--fl-ink); background: var(--fl-blush); }
.fl-body a { color: inherit; text-decoration: none; }
.fl-body button, .fl-body input, .fl-body select { font: inherit; color: inherit; }
.fl-body button, .fl-body a, .fl-body input, .fl-body select { -webkit-tap-highlight-color: transparent; }
.fl-body button { cursor: pointer; }
.fl-body button:disabled, .fl-body input:disabled, .fl-body select:disabled { cursor: wait; opacity: .6; }
.fl-body h1, .fl-body h2, .fl-body h3, .fl-body p, .fl-body fieldset { margin: 0; }
.fl-body h1, .fl-body h2, .fl-body h3 { font-family: var(--fl-display); font-weight: 500; }
.fl-body h2 { font-size: clamp(36px, 4.4vw, 62px); letter-spacing: -.055em; line-height: 1.14; }
.fl-body h3 { font-size: 28px; letter-spacing: -.035em; line-height: 1.2; }
.fl-body em { font-weight: 500; }
.fl-body svg { display: block; flex-shrink: 0; }
.fl-body :focus-visible { outline: 2px solid var(--fl-ink); outline-offset: 6px; }
.fl-body [id] { scroll-margin-top: 100px; }
.fl-script { font-family: var(--fl-script-font); font-size: 28px; line-height: .98; font-weight: 500; }
.fl-eyebrow { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 500; letter-spacing: .055em; }
.fl-eyebrow svg { width: 18px; height: 18px; }
.fl-small { font-size: 12px; line-height: 1.6; }
.fl-lead { font-size: 17px; line-height: 1.65; }
.fl-centered { text-align: center; }
.fl-centered .fl-eyebrow { justify-content: center; }
.fl-nojs { display: none; }
.fl-status { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
.fl-bg-blush { background: var(--fl-blush); }
.fl-bg-lilac { background: var(--fl-lilac); }
.fl-bg-butter { background: var(--fl-butter); }
.fl-bg-pistachio { background: var(--fl-pistachio); }
.fl-bg-apricot { background: var(--fl-apricot); }
.fl-skip { position: fixed; left: 20px; top: 12px; z-index: 100; padding: 14px 20px; border-radius: 40px; color: var(--fl-paper)!important; background: var(--fl-ink); transform: translateY(-180%); }
.fl-skip:focus { transform: none; }
.fl-section { width: min(1240px, calc(100% - 112px)); margin-inline: auto; padding-block: 120px; }
.fl-section-heading { display: flex; justify-content: space-between; align-items: end; gap: 40px; margin-bottom: 52px; }
.fl-section-heading .fl-eyebrow, .fl-centered .fl-eyebrow, .fl-story .fl-eyebrow, .fl-join .fl-eyebrow { margin-bottom: 20px; }
.fl-section-heading .fl-text-link { margin-top: 20px; }
.fl-section-heading > :last-child { padding-bottom: 8px; }
.fl-text-link { display: inline-flex; align-items: center; gap: 25px; position: relative; padding-block: 8px; font-size: 14px; }
.fl-text-link::after { content: ""; position: absolute; inset: auto 0 4px; height: 1px; background: currentColor; transform-origin: left; transform: scaleX(.25); transition: transform var(--dur-base) var(--ease-out); }
.fl-text-link span { transition: transform var(--dur-base) var(--ease-out); }
.fl-text-link:focus-visible::after { transform: scaleX(1); }
.fl-text-link:active { transform: translateY(2px); }
.fl-button { display: inline-flex; position: relative; overflow: hidden; isolation: isolate; justify-content: space-between; align-items: center; gap: 32px; min-height: 54px; padding: 15px 26px; border-radius: 40px; border: 1px solid var(--fl-ink); background: var(--fl-ink); color: var(--fl-paper)!important; font-size: 14px; font-weight: 500; line-height: 1.4; transition: transform var(--dur-base) var(--ease-spring); }
.fl-button::before { content: ""; position: absolute; z-index: -1; inset: 0; background: color-mix(in srgb, var(--fl-ink) 82%, var(--fl-sage)); transform: translateY(102%); border-radius: inherit; transition: transform var(--dur-base) var(--ease-out); }
.fl-button span { transition: transform var(--dur-base) var(--ease-out); font-size: 21px; line-height: 1; }
.fl-button--small { min-height: 44px; padding: 11px 20px; font-size: 12px; gap: 23px; }
.fl-button--outline { background: transparent; color: var(--fl-ink)!important; border-color: color-mix(in srgb, var(--fl-ink) 25%, transparent); }
.fl-button--outline::before { background: var(--fl-pistachio); }
.fl-button:focus-visible::before { transform: none; }
.fl-button:active { transform: scale(.97); transition-duration: var(--dur-instant); }
.fl-button:disabled { pointer-events: none; }
.fl-home:active, .fl-menu-toggle:active, .fl-close:active { transform: scale(.97); }
.fl-desktop-nav a:active, .fl-mobile-menu nav a:active { transform: translateY(2px); }
.fl-postcard:active { transform: scale(.98); transition-duration: var(--dur-instant); }
.fl-flower-card:active .fl-botanical { transform: scale(.98); }
.fl-flower-card:focus-visible .fl-card-arrow { transform: rotate(10deg) translate(2px,-2px); }

/* Quiet, floating navigation. */
.fl-header { position: sticky; top: 0; z-index: 30; background: color-mix(in srgb, var(--fl-paper) 96%, transparent); }
.fl-nav-wrap { display: flex; justify-content: space-between; align-items: center; height: 90px; width: calc(100% - 112px); max-width: 1328px; margin: auto; transition: transform var(--dur-base) var(--ease-out); }
.fl-header[data-compact=true] .fl-nav-wrap { transform: scale(.98) translateY(-4px); }
.fl-logo { display: inline-flex; align-items: center; gap: 7px; line-height: 1; }
.fl-logo > svg:first-child { width: 24px; height: 24px; }
.fl-logo > svg:last-child { width: 83px; height: 45px; }
.fl-home { display: inline-flex; }
.fl-desktop-nav { display: flex; position: relative; align-items: center; }
.fl-desktop-nav a { width: 132px; text-align: center; font-size: 13px; padding: 12px 8px; }
.fl-nav-indicator { position: absolute; left: 58px; bottom: 3px; width: 14px; height: 4px; border-radius: 50%; background: var(--fl-sage); pointer-events: none; transition: transform var(--dur-base) var(--ease-out); }
.fl-progress { position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background: var(--fl-sage); transform: scaleX(var(--fl-progress, 0)); transform-origin: left; }
.fl-menu-toggle { display: none; border: 0; background: transparent; width: 44px; height: 44px; padding: 12px; }
.fl-menu-toggle span { display: block; height: 1.5px; margin: 6px 0; background: currentColor; }
.fl-mobile-menu { width: 100%; max-width: none; height: 100%; max-height: none; inset: 0; border: 0; padding: 25px; margin: 0; color: var(--fl-ink); background: var(--fl-pistachio); }
.fl-mobile-menu::backdrop { background: var(--fl-paper); }
.fl-menu-top { display: flex; align-items: center; justify-content: space-between; }
.fl-close { border: 0; background: none; width: 44px; height: 44px; font-size: 40px!important; font-weight: 400; }
.fl-mobile-menu nav { display: grid; gap: 15px; padding-block: 70px; }
.fl-mobile-menu nav a { display: flex; align-items: center; justify-content: space-between; font: 36px/1.5 var(--fl-display); border-bottom: 1px solid color-mix(in srgb, var(--fl-ink) 20%, transparent); }

/* The first impression is a small gallery of flower feelings. */
.fl-hero { position: relative; padding-top: 20px; overflow: clip; }
.fl-hero-intro { position: relative; z-index: 2; text-align: center; }
.fl-hero-intro .fl-eyebrow { justify-content: center; margin-bottom: 20px; }
.fl-hero h1 { font-size: clamp(66px, 6.7vw, 96px); line-height: 1.03; letter-spacing: -.065em; }
.fl-line { display: block; overflow: clip; padding-bottom: .08em; margin-bottom: -.08em; }
.fl-line > span, .fl-line > em { display: block; }
.fl-hero-lead { margin-top: 19px!important; font-size: 15px; line-height: 1.65; }
.fl-hero-gallery { position: relative; width: min(1100px, 100%); margin: 20px auto 0; height: 305px; }
/* Slots are absolute from first paint so hydrating the carousel only swaps transforms; no layout moves. */
.fl-postcards { --fl-card-width: 188px; --fl-card-gap: 18px; position: relative; height: 100%; transform: translateY(calc(var(--fl-hero-exit, 0) * 22px)); }
.fl-postcard-slot { position: absolute; left: 50%; top: 25px; width: var(--fl-card-width); transform: translate(calc(-50% + (var(--i) - 2) * (var(--fl-card-width) + var(--fl-card-gap))), var(--offset)) rotate(var(--angle)); transform-origin: center bottom; }
.fl-postcard-slot[data-duplicate=true] { display: none; }
.fl-carousel { position: relative; height: 100%; touch-action: pan-y; }
.fl-carousel:focus-visible { outline-offset: -5px; border-radius: 20px; }
.fl-postcards[data-carousel=true] { cursor: grab; }
.fl-postcards[data-carousel=true] .fl-postcard-slot { display: block; }
.fl-carousel[data-dragging=true] .fl-postcards, .fl-carousel[data-dragging=true] .fl-postcard { cursor: grabbing; }
.fl-carousel[data-dragging=true] .fl-postcard { pointer-events: none; }
.fl-carousel .fl-postcard { user-select: none; -webkit-user-drag: none; }
.fl-carousel-arrow, .fl-carousel-pause { position: absolute; z-index: 4; display: flex; align-items: center; justify-content: center; border: 1px solid color-mix(in srgb, var(--fl-ink) 18%, transparent); background: var(--fl-paper); color: var(--fl-ink); transition: transform var(--dur-fast) var(--ease-out), background var(--dur-fast); }
.fl-carousel-arrow { top: 50%; width: 42px; height: 42px; border-radius: 50%; font-size: 20px!important; }
.fl-carousel-arrow--prev { left: -37px; }
.fl-carousel-arrow--next { right: -37px; }
.fl-carousel-pause { top: 25px; right: 0; height: 36px; min-width: 75px; padding: 8px 12px; gap: 7px; border-radius: 30px; font-size: 10px!important; }
.fl-carousel-arrow:active, .fl-carousel-pause:active { transform: scale(.97); }
.fl-postcard { display: block; position: relative; height: 240px; padding: 8px; border-radius: 105px 105px 16px 16px; transition: transform var(--dur-slow) var(--ease-out); }
.fl-postcard-slot:nth-child(2) .fl-postcard, .fl-postcard-slot:nth-child(4) .fl-postcard { border-radius: 18px; }
.fl-postcard-slot:nth-child(3) .fl-postcard { border-radius: 110px 110px 18px 18px; }
.fl-postcard.fl-postcard--square { border-radius: 18px; }
.fl-postcard .fl-botanical { width: 100%; height: 214px; overflow: visible; }
.fl-postcard-note { position: absolute; top: 23px; left: 0; right: 0; text-align: center; font-size: 16px; z-index: 1; }
.fl-postcard-label { position: absolute; bottom: 9px; left: 9px; right: 9px; display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; border-radius: 10px; background: color-mix(in srgb, var(--fl-paper) 85%, transparent); font-size: 11px; }
.fl-postcard-label > span { font-size: 17px; }
.fl-hero-note { position: absolute; left: -14px; top: -115px; transform: rotate(-12deg); font-size: 25px; text-align: center; }
.fl-hero-note svg { position: absolute; left: 55px; width: 75px; height: 60px; }
.fl-hero-seal { position: absolute; right: -7px; top: -89px; width: 108px; height: 108px; border-radius: 50%; background: var(--fl-pistachio); display: grid; place-content: center; text-align: center; transform: rotate(12deg); }
.fl-hero-seal > svg { width: 21px; height: 21px; margin: 0 auto 5px; }
.fl-hero-seal > span { font-size: 11px; line-height: 1.2; }
.fl-hero-seal em { font-family: var(--fl-display); font-size: 14px; }
.fl-hero-seal .fl-seal-bottom { font-size: 8px; margin-top: 5px; }
.fl-hero-bottom { position: relative; z-index: 3; display: flex; flex-direction: column; align-items: center; gap: 12px; margin: -3px auto 20px; }
.fl-hero-bottom .fl-button { min-width: 226px; }
.fl-hero-bottom p { font-size: 11px; }
.fl-hero-bottom p span { padding-inline: 6px; }
.fl-hero-foot { display: flex; align-items: center; justify-content: space-between; width: calc(100% - 112px); max-width: 1328px; margin: 0 auto; padding: 14px 0 18px; font-size: 10px; }
.fl-hero-foot > span:last-child, .fl-hero-foot a { display: flex; align-items: center; gap: 12px; }
.fl-hero-foot svg { width: 15px; height: 15px; }
.fl-hero-foot a { font-size: 11px; }

/* Every botanical is drawn, with intentionally flat, untextured colour. */
.fl-botanical { width: 100%; height: auto; overflow: visible; --fl-petal-a: var(--fl-blush); --fl-petal-b: var(--fl-lilac); --fl-vase-color: var(--fl-paper); }
.fl-botanical[data-feeling=sunbeam] { --fl-petal-a: var(--fl-apricot); --fl-petal-b: var(--fl-butter); --fl-vase-color: var(--fl-blush); }
.fl-botanical[data-feeling=wildthing] { --fl-petal-a: var(--fl-paper); --fl-petal-b: var(--fl-lilac); --fl-vase-color: var(--fl-lilac); }
.fl-botanical[data-scene=single] .fl-stem:nth-of-type(3), .fl-botanical[data-scene=single] .fl-stem:nth-of-type(5), .fl-botanical[data-scene=single] .fl-stem:nth-of-type(7) { display: none; }
.fl-botanical[data-scene=single] .fl-vase { transform: scale(.82,1.08); transform-origin: 200px 445px; }
.fl-bloom { transform-origin: center; transform-box: fill-box; }
.fl-stem { transform-origin: 200px 380px; }
.fl-botanical[data-gather=true] .fl-stem { transform: translate(calc((1 - var(--fl-gather, 1)) * var(--stem-x)), calc((1 - var(--fl-gather, 1)) * var(--stem-y))) rotate(calc((1 - var(--fl-gather, 1)) * var(--stem-r))); opacity: calc(.35 + var(--fl-gather, 1) * .65); }

.fl-scallop { position: relative; }
.fl-scallop::before { content: ""; position: absolute; pointer-events: none; left: 0; right: 0; height: 20px; top: -19px; background: inherit; clip-path: shape(from 0% 100%, curve to 5% 100% with 0% 0% / 5% 0%, curve to 10% 100% with 5% 0% / 10% 0%, curve to 15% 100% with 10% 0% / 15% 0%, curve to 20% 100% with 15% 0% / 20% 0%, curve to 25% 100% with 20% 0% / 25% 0%, curve to 30% 100% with 25% 0% / 30% 0%, curve to 35% 100% with 30% 0% / 35% 0%, curve to 40% 100% with 35% 0% / 40% 0%, curve to 45% 100% with 40% 0% / 45% 0%, curve to 50% 100% with 45% 0% / 50% 0%, curve to 55% 100% with 50% 0% / 55% 0%, curve to 60% 100% with 55% 0% / 60% 0%, curve to 65% 100% with 60% 0% / 65% 0%, curve to 70% 100% with 65% 0% / 70% 0%, curve to 75% 100% with 70% 0% / 75% 0%, curve to 80% 100% with 75% 0% / 80% 0%, curve to 85% 100% with 80% 0% / 85% 0%, curve to 90% 100% with 85% 0% / 90% 0%, curve to 95% 100% with 90% 0% / 95% 0%, curve to 100% 100% with 95% 0% / 100% 0%, close); }
.fl-promise { background: var(--fl-pistachio); padding: 31px 40px; }
.fl-promise-inner { display: flex; align-items: center; justify-content: space-around; gap: 25px; max-width: 1260px; margin: auto; font-size: 13px; }
.fl-promise-inner svg { width: 21px; height: 21px; }
.fl-collection-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
.fl-flower-card { display: block; }
.fl-flower-card-art { position: relative; overflow: hidden; border-radius: 150px 150px 14px 14px; aspect-ratio: 4/4.5; padding: 16px 25px 30px; }
.fl-collection-grid > :nth-child(2) .fl-flower-card-art { border-radius: 14px 14px 150px 150px; }
.fl-flower-card-art .fl-botanical { width: 100%; height: 100%; transition: transform var(--dur-slow) var(--ease-out); }
.fl-flower-number { position: absolute; top: 24px; left: 0; right: 0; text-align: center; font-size: 10px; z-index: 1; }
.fl-flower-card-art .fl-script { position: absolute; bottom: 30px; left: 24px; font-size: 23px; transform: rotate(-5deg); }
.fl-card-arrow { position: absolute; right: 20px; bottom: 20px; display: grid; place-items: center; width: 38px; height: 38px; border-radius: 50%; background: var(--fl-paper); font-size: 21px; transition: transform var(--dur-base) var(--ease-out); }
.fl-card-title { display: flex; align-items: baseline; justify-content: space-between; gap: 10px; margin: 23px 0 10px; }
.fl-card-title span { font-size: 12px; }
.fl-flower-card p { font-size: 15px; max-width: 31ch; }
.fl-flower-spec { display: block; margin-top: 15px; font-size: 10px; }
.fl-collection-foot { text-align: center; margin-top: 42px!important; font-size: 12px; }

.fl-composer-section { --fl-gather: 1; background: color-mix(in srgb, var(--fl-lilac) 65%, var(--fl-paper)); padding-block: 90px; }
.fl-composer-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 110px; width: min(1120px, calc(100% - 112px)); margin: auto; align-items: center; }
.fl-composer-stage { position: sticky; top: 100px; align-self: start; padding-top: 20px; }
.fl-composer-arch { background: color-mix(in srgb, var(--fl-paper) 75%, transparent); border-radius: 250px 250px 20px 20px; padding: 10px 25px 0; }
.fl-composer-arch .fl-botanical { width: 100%; transform-origin: 50% 90%; transition: transform var(--dur-slow) var(--ease-out); }
.fl-composer-arch[data-size=little] .fl-botanical { transform: scale(.94); }
.fl-composer-arch[data-size=abundant] .fl-botanical { transform: scale(1.04); }
.fl-composer-arch .fl-bloom { transition: transform var(--dur-slow) var(--ease-out); }
.fl-composer-arch [data-feeling=sunbeam] .fl-bloom { transform: rotate(12deg); }
.fl-composer-arch [data-feeling=wildthing] .fl-bloom { transform: rotate(-10deg) scale(.95); }
.fl-composer-note { display: block; text-align: center; margin-bottom: 22px; transform: rotate(-5deg); font-size: 34px; }
.fl-composer-caption { display: flex; align-items: center; justify-content: center; gap: 9px; margin-top: 22px; font-size: 11px; }
.fl-composer-caption svg { width: 17px; height: 17px; }
.fl-composer-controls .fl-eyebrow { margin-bottom: 18px; }
.fl-composer-controls h2 { font-size: clamp(40px, 4.2vw, 60px); }
.fl-composer-controls .fl-lead { font-size: 15px; margin-top: 21px; }
.fl-feelings, .fl-size-options { border: 0; padding: 0; margin-top: 30px!important; min-width: 0; }
.fl-feelings legend, .fl-size-options legend { padding: 0; font-size: 12px; margin-bottom: 15px; font-weight: 500; }
.fl-feeling-options { display: flex; gap: 27px; }
.fl-feeling { display: flex; flex-direction: column; align-items: center; gap: 9px; font-size: 11px; cursor: pointer; position: relative; }
.fl-feeling input, .fl-size-options input { position: absolute; inset: 0; z-index: 2; width: 100%; height: 100%; opacity: 0; cursor: pointer; }
.fl-swatch { display: grid; place-items: center; width: 59px; height: 59px; border-radius: 50%; transition: transform var(--dur-base) var(--ease-spring); outline: 1px solid transparent; outline-offset: 4px; }
.fl-swatch svg { width: 29px; height: 29px; }
.fl-feeling[data-selected=true] .fl-swatch { outline-color: var(--fl-ink); }
.fl-feeling:has(:focus-visible) .fl-swatch { outline: 3px solid var(--fl-ink); outline-offset: 5px; }
.fl-feeling:active .fl-swatch { transform: scale(.93); }
.fl-size-options > div { display: flex; gap: 7px; }
.fl-size-options label { cursor: pointer; position: relative; flex: 1; padding: 13px 7px; text-align: center; border: 1px solid color-mix(in srgb, var(--fl-ink) 20%, transparent); border-radius: 12px; background: transparent; font-size: 10px; transition: background var(--dur-fast), transform var(--dur-base) var(--ease-spring); }
.fl-size-options label > span { display: block; }
.fl-size-options label > span:last-child { margin-top: 3px; font-size: 14px; }
.fl-size-options label[data-selected=true] { background: var(--fl-paper); border-color: var(--fl-ink); }
.fl-size-options label:has(:focus-visible) { outline: 2px solid var(--fl-ink); outline-offset: 3px; }
.fl-size-options label:active { transform: scale(.97); }
.fl-composer-summary { display: flex; justify-content: space-between; gap: 10px; padding-block: 24px 18px; font-size: 11px; }
.fl-composer-summary > span:last-child { font-size: 20px; }
.fl-composer-summary small { font-size: 11px; }
.fl-composer-controls .fl-button { width: 100%; }
.fl-composer-controls > .fl-small { margin-top: 13px; text-align: center; font-size: 10px; }

.fl-story { display: grid; grid-template-columns: 1fr 1fr; gap: 110px; align-items: center; padding-block: 140px; }
.fl-story-art { position: relative; background: var(--fl-blush); border-radius: 16px 200px 16px 16px; padding: 100px 30px 30px; }
.fl-story-art > .fl-script { position: absolute; left: 35px; top: 40px; font-size: 33px; transform: rotate(-6deg); z-index: 1; }
.fl-story-art > .fl-botanical { transform: rotate(7deg); }
.fl-story-art-label { display: block; text-align: center; font-size: 11px; }
.fl-story-copy h2 { font-size: clamp(34px, 3.7vw, 53px); }
.fl-story-copy p:not(.fl-eyebrow) { margin-top: 23px; font-size: 15px; max-width: 42ch; }
.fl-story-copy .fl-text-link { margin-top: 17px; gap: 15px; font-size: 12px; }
.fl-story-signature { display: flex; align-items: center; gap: 16px; margin-top: 36px; }
.fl-story-signature > svg { width: 42px; height: 42px; }
.fl-story-signature .fl-script { font-size: 26px; transform: rotate(-4deg); }
.fl-plans { background: var(--fl-pistachio); }
.fl-plans > .fl-section { padding-block: 80px 65px; }
.fl-centered .fl-lead { margin-top: 22px; font-size: 15px; }
.fl-plan-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 52px; }
.fl-plan { height: 100%; background: color-mix(in srgb, var(--fl-paper) 65%, transparent); border-radius: 22px; padding: 30px; transition: transform var(--dur-base) var(--ease-out); }
.fl-plan[data-favourite=true] { background: var(--fl-paper); }
.fl-plan-note { display: block; text-align: center; font-size: 22px; }
.fl-plan-flowers { display: flex; justify-content: center; gap: 2px; align-items: center; height: 76px; margin-block: 10px; color: var(--fl-sage); }
.fl-plan-flowers > svg { width: 40px; height: 40px; }
.fl-plan-flowers > svg:nth-child(2) { width: 50px; height: 50px; color: var(--fl-ink); }
.fl-plan h3 { font-size: 27px; }
.fl-plan p { font-size: 13px; line-height: 1.7; margin-top: 15px; min-height: 45px; }
.fl-plan-price { font-family: var(--fl-display); font-size: 51px; letter-spacing: -.04em; margin-top: 22px; line-height: 1.3; }
.fl-plan-price span { font: 12px var(--fl-body-font); letter-spacing: 0; }
.fl-stems { display: block; font-size: 10px; margin-top: 7px; }
.fl-plan .fl-button { width: 100%; margin-top: 25px; min-height: 46px; font-size: 12px; padding: 12px 19px; }
.fl-plan-foot { display: flex; gap: 18px; align-items: center; justify-content: center; font-size: 11px; margin-top: 35px!important; }
.fl-plan-foot svg { width: 15px; height: 15px; }
.fl-join { display: grid; grid-template-columns: 1fr 1fr; gap: 110px; align-items: center; padding-block: 140px; }
.fl-join-copy .fl-lead { margin-top: 25px; font-size: 15px; }
.fl-join-note { position: relative; display: inline-block; transform: rotate(-7deg); margin-top: 50px; font-size: 30px; }
.fl-join-note > svg { position: absolute; width: 50px; height: 50px; right: -90px; top: 15px; color: var(--fl-blush); }
.fl-form-panel { background: color-mix(in srgb, var(--fl-lilac) 30%, var(--fl-paper)); border-radius: 24px; padding: 34px; min-height: 488px; }
.fl-form-heading { display: flex; gap: 10px; align-items: center; font-size: 13px; margin-bottom: 26px; }
.fl-form-heading svg { width: 24px; height: 24px; }
.fl-form-heading > span:last-child { margin-left: auto; font-size: 10px; }
.fl-fields { display: grid; gap: 18px; }
.fl-field { position: relative; }
.fl-field input { width: 100%; height: 60px; border: 1px solid color-mix(in srgb, var(--fl-ink) 23%, transparent); border-radius: 10px; padding: 21px 15px 6px; background: transparent; outline-offset: 3px; font-size: 15px; }
.fl-field label { position: absolute; pointer-events: none; left: 15px; top: 17px; font-size: 14px; transform-origin: left top; transition: transform var(--dur-fast) var(--ease-out); }
.fl-field input:focus + label, .fl-field input:not(:placeholder-shown) + label { transform: translateY(-9px) scale(.76); }
.fl-field-error { font-size: 11px; margin-top: 6px!important; }
.fl-field[data-invalid=true] input { border-width: 2px; }
.fl-form-choices { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 22px; }
.fl-form-choices > label { font-size: 10px; }
.fl-form-choices select { display: block; width: 100%; max-width: 100%; margin-top: 8px; border: 1px solid color-mix(in srgb, var(--fl-ink) 23%, transparent); border-radius: 8px; background: transparent; height: 44px; padding-inline: 10px 20px; font-size: 12px; }
.fl-form-summary { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 10px; margin-block: 25px 19px; }
.fl-form-summary strong { font: 20px var(--fl-display); }
.fl-form-summary small { font: 10px var(--fl-body-font); }
.fl-form-panel .fl-button { width: 100%; }
.fl-form-privacy { font-size: 10px; text-align: center; margin-top: 13px!important; }
.fl-success { text-align: center; padding: 15px 0; outline-offset: 14px!important; }
.fl-success > svg { width: 62px; height: 62px; margin: 0 auto 20px; color: var(--fl-sage); }
.fl-success > .fl-script { font-size: 26px; margin-bottom: 15px; }
.fl-success h3 { font-size: 40px; margin-bottom: 16px; }
.fl-success p:not(.fl-script) { font-size: 14px; margin-top: 12px; }
.fl-success p.fl-small { font-size: 12px; margin-block: 22px; }
.fl-success .fl-button { font-size: 12px; }
.fl-form-fallback { background: var(--fl-lilac); padding: 30px; border-radius: 25px; }
.fl-form-fallback > svg { width: 45px; height: 45px; margin-bottom: 25px; }
.fl-form-fallback p { margin-block: 25px; }
.fl-footer { padding: 45px 56px 25px; background: var(--fl-blush); border-radius: 45px 45px 0 0; }
.fl-footer-top, .fl-footer-bottom { max-width: 1328px; display: flex; justify-content: space-between; align-items: center; gap: 20px; margin: auto; }
.fl-footer-top p { font-size: 13px; }
.fl-footer-top .fl-text-link { font-size: 12px; }
.fl-footer-word { font: italic clamp(70px, 12.6vw, 190px)/1.35 var(--fl-display); letter-spacing: -.07em; text-align: center; padding-block: 15px 25px; }
.fl-footer-bottom { border-top: 1px solid color-mix(in srgb, var(--fl-ink) 20%, transparent); padding-top: 22px; font-size: 10px; }
.fl-motion-toggle { display: flex; gap: 12px; align-items: center; padding: 8px 0; border: 0; background: none; font-size: 10px!important; }
.fl-placeholder { display: grid; place-items: center; aspect-ratio: 4/5; background: var(--fl-lilac); font-size: 14px; border-radius: 20px; }

/* Gather, unfurl, and settle. Finished artwork is the default. */
@media (prefers-reduced-motion: no-preference) {
  .fl-header.fl-load { animation: fl-settle var(--dur-slow) var(--ease-out) backwards; }
  .fl-hero-intro > .fl-eyebrow { animation: fl-rise var(--dur-slow) var(--ease-out) both; animation-delay: var(--dur-fast); }
  .fl-line:first-child .fl-load { animation: fl-mask var(--dur-hero) var(--ease-out-expo) both; animation-delay: var(--dur-fast); }
  .fl-line:last-child .fl-load { animation: fl-mask var(--dur-hero) var(--ease-out-expo) both; animation-delay: calc(var(--dur-fast) + var(--stagger)); }
  .fl-hero-lead { animation: fl-rise var(--dur-slow) var(--ease-out) both; animation-delay: var(--dur-base); }
  .fl-postcard.fl-load { animation: fl-card-arrive var(--dur-hero) var(--ease-out-expo) backwards; animation-delay: calc(var(--dur-base) + var(--i) * var(--stagger)); }
  .fl-hero-bottom { animation: fl-rise var(--dur-slow) var(--ease-out) both; animation-delay: var(--dur-slow); }
  .fl-hero-note, .fl-hero-seal { animation: fl-note var(--dur-hero) var(--ease-out) both; animation-delay: var(--dur-base); }
  html[data-fl-motion=live] [data-reveal] { transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out), clip-path var(--dur-slow) var(--ease-in-out); transition-delay: calc(var(--i, 0) * var(--stagger)); }
  html[data-fl-motion=live] [data-reveal=rise]:not([data-in=true]) { opacity: 0; transform: translateY(var(--reveal-shift)); }
  html[data-fl-motion=live] [data-reveal=scale]:not([data-in=true]) { opacity: 0; transform: translateY(var(--reveal-shift)) scale(.96); }
  html[data-fl-motion=live] [data-reveal=mask]:not([data-in=true]) { clip-path: inset(0 0 100%); transform: translateY(20px); }
  html[data-fl-motion=live] [data-reveal=wipe]:not([data-in=true]) { clip-path: inset(0 100% 0 0 round 20px); }
  html[data-fl-motion=live] [data-reveal=draw]:not([data-in=true]) { transform: scaleX(0); transform-origin: left; }
  .fl-hero .fl-postcard-slot:nth-child(3) .fl-foliage { animation: fl-sway 8s ease-in-out infinite alternate; transform-origin: 200px 380px; }
  .fl-hero-seal > svg { animation: fl-turn 24s linear infinite; }
  [data-ambient]:not([data-active=true]) *, html[data-fl-hidden=true] .fl-hero *, html[data-fl-paused=true] .fl-hero * { animation-play-state: paused!important; }
  .fl-mobile-menu[open] { animation: fl-menu var(--dur-base) var(--ease-out); }
  .fl-mobile-menu[open] nav a { animation: fl-rise var(--dur-base) var(--ease-out) both; animation-delay: calc(var(--i, 0) * var(--stagger)); }
  .fl-feeling[data-selected=true] .fl-swatch svg { animation: fl-unfurl var(--dur-base) var(--ease-spring); }
  .fl-field[data-invalid=true] { animation: fl-shake var(--dur-base) var(--ease-out); }
  .fl-success { animation: fl-rise var(--dur-slow) var(--ease-out); }
  .fl-success > svg { animation: fl-unfurl var(--dur-slow) var(--ease-spring); }
  .fl-form-panel[data-state=preparing] .fl-button > span { animation: fl-turn 2s linear infinite; }
}
@media (hover: hover) and (pointer: fine) {
  .fl-carousel-arrow:hover, .fl-carousel-pause:hover { background: var(--fl-pistachio); }
  .fl-button:hover { transform: translateY(-2px); }
  .fl-button:hover::before { transform: none; }
  .fl-button:hover span, .fl-text-link:hover span { transform: translate(3px,-2px); }
  .fl-button:active { transform: scale(.97); }
  .fl-text-link:hover::after { transform: scaleX(1); }
  .fl-postcard:hover { transform: translateY(-12px) rotate(calc(var(--angle) * -.3)); }
  .fl-postcard:hover .fl-bloom { transform: scale(1.04); transition: transform var(--dur-slow) var(--ease-out); }
  .fl-flower-card:hover .fl-botanical { transform: scale(1.035) translateY(-4px); }
  .fl-flower-card:hover .fl-card-arrow { transform: rotate(10deg) translate(2px,-2px); }
  .fl-feeling:hover .fl-swatch { transform: translateY(-4px); }
  .fl-size-options label:hover { background: color-mix(in srgb, var(--fl-paper) 70%, transparent); }
  .fl-plan:hover { transform: translateY(-7px); }
}
@keyframes fl-mask { from { transform: translateY(110%); } to { transform: none; } }
@keyframes fl-rise { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
@keyframes fl-settle { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: none; } }
@keyframes fl-card-arrive { from { opacity: 0; transform: translateY(70px) rotate(calc(var(--angle) * -1)) scale(.9); } to { opacity: 1; transform: none; } }
@keyframes fl-note { from { opacity: 0; translate: 0 15px; scale: .9; } to { opacity: 1; translate: 0 0; scale: 1; } }
@keyframes fl-unfurl { from { transform: rotate(-35deg) scale(.8); } to { transform: none; } }
@keyframes fl-sway { from { transform: rotate(-1.5deg); } to { transform: rotate(1.5deg); } }
@keyframes fl-turn { to { transform: rotate(360deg); } }
@keyframes fl-menu { from { clip-path: inset(0 0 100% 0 round 0 0 50% 50%); } to { clip-path: inset(0); } }
@keyframes fl-shake { 20%,60% { transform: translateX(-4px); } 40%,80% { transform: translateX(4px); } }

@media (max-width: 1100px) {
  .fl-section { width: calc(100% - 72px); padding-block: 90px; }
  .fl-nav-wrap, .fl-hero-foot { width: calc(100% - 72px); }
  .fl-hero-gallery { width: 860px; max-width: 100%; height: 310px; }
  .fl-postcards { --fl-card-width: 153px; --fl-card-gap: 12px; }
  .fl-postcard { height: 232px; }
  .fl-postcard .fl-botanical { height: 205px; }
  .fl-postcard-note { font-size: 14px; }
  .fl-postcard-label { font-size: 9px; }
  .fl-hero-note { left: 20px; top: -100px; font-size: 21px; }
  .fl-hero-seal { right: 18px; width: 90px; height: 90px; }
  .fl-composer-layout { width: calc(100% - 72px); gap: 50px; }
  .fl-story, .fl-join { gap: 60px; }
  .fl-plan { padding: 25px 21px; }
  .fl-plan h3 { font-size: 23px; }
  .fl-form-panel { padding: 26px; }
  .fl-footer { padding-inline: 36px; }
}
@media (max-width: 760px) {
  .fl-section { width: calc(100% - 40px); padding-block: 75px; }
  .fl-nav-wrap { width: calc(100% - 40px); height: 80px; }
  .fl-desktop-nav { display: none; }
  .fl-menu-toggle { display: block; margin-left: 8px; }
  .fl-nav-wrap > .fl-button { margin-left: auto; min-height: 39px; font-size: 11px; padding: 9px 14px; gap: 13px; }
  .fl-logo > svg:first-child { width: 21px; height: 21px; }
  .fl-logo > svg:last-child { width: 65px; height: 36px; }
  .fl-hero { padding-top: 26px; }
  .fl-hero-intro .fl-eyebrow { font-size: 10px; letter-spacing: .01em; gap: 6px; margin-bottom: 21px; }
  .fl-hero-intro .fl-eyebrow svg { width: 14px; height: 14px; }
  .fl-hero h1 { font-size: clamp(48px, 10vw, 72px); line-height: 1.08; }
  .fl-hero-lead { font-size: 12px; padding-inline: 21px; margin-top: 20px!important; line-height: 1.75; }
  .fl-hero-lead br { display: none; }
  .fl-hero-gallery { margin-top: 30px; height: 265px; width: 100%; }
  .fl-postcards { --fl-card-width: 136px; width: 760px; left: 50%; margin-left: -380px; }
  .fl-carousel-arrow { width: 38px; height: 38px; top: 49%; }
  .fl-carousel-arrow--prev { left: 8px; }
  .fl-carousel-arrow--next { right: 8px; }
  .fl-carousel-pause { top: -20px; right: 15px; height: 32px; min-width: 68px; }
  .fl-postcard-slot { top: 22px; }
  .fl-postcard { height: 217px; padding: 5px; }
  .fl-postcard .fl-botanical { height: 192px; }
  .fl-postcard-note { top: 19px; font-size: 13px; }
  .fl-postcard-label { padding: 8px; left: 7px; right: 7px; font-size: 9px; }
  .fl-postcard-label > span { font-size: 14px; }
  .fl-hero-note, .fl-hero-seal { display: none; }
  .fl-hero-bottom { margin: 2px auto 26px; gap: 13px; }
  .fl-hero-bottom .fl-button { min-width: 220px; min-height: 51px; }
  .fl-hero-bottom p { font-size: 10px; }
  .fl-hero-foot { width: calc(100% - 40px); padding-bottom: 32px; font-size: 9px; }
  .fl-hero-foot > span:first-child { display: none; }
  .fl-hero-foot a { font-size: 10px; }
  .fl-promise { padding: 26px 20px; }
  .fl-promise-inner { display: grid; grid-template-columns: 1fr 20px 1fr; gap: 19px 9px; text-align: center; font-size: 10px; }
  .fl-promise-inner > svg:nth-of-type(2) { display: none; }
  .fl-promise-inner svg { width: 15px; height: 15px; }
  .fl-section-heading { display: block; margin-bottom: 34px; }
  .fl-section-heading > :last-child { margin-top: 25px; }
  .fl-section-heading .fl-lead { font-size: 14px; }
  .fl-section-heading .fl-text-link { margin-top: 10px; }
  .fl-section-heading .fl-eyebrow { margin-bottom: 14px; }
  .fl-collection-grid { gap: 36px; grid-template-columns: 1fr; }
  .fl-flower-card-art { aspect-ratio: 4/3.8; padding: 5px 35px 20px; }
  .fl-collection-grid > :nth-child(2) .fl-flower-card-art { border-radius: 100px 100px 14px 14px; }
  .fl-flower-card-art .fl-script { font-size: 25px; bottom: 24px; }
  .fl-card-title { margin-top: 20px; }
  .fl-card-title h3 { font-size: 28px; }
  .fl-flower-card p { font-size: 14px; max-width: 34ch; }
  .fl-flower-spec { margin-top: 10px; }
  .fl-collection-foot { font-size: 10px; margin-top: 32px!important; }
  .fl-composer-section { padding-block: 55px; }
  .fl-composer-layout { grid-template-columns: 1fr; gap: 45px; width: calc(100% - 40px); }
  .fl-composer-stage { position: relative; top: auto; max-width: 380px; width: 100%; margin: auto; padding-top: 0; }
  .fl-composer-arch { padding: 0 30px; }
  .fl-composer-note { font-size: 28px; margin-bottom: 20px; }
  .fl-composer-caption { font-size: 10px; margin-top: 18px; }
  .fl-composer-controls h2 { font-size: 43px; }
  .fl-composer-controls .fl-lead { font-size: 14px; }
  .fl-feeling-options { gap: 27px; }
  .fl-size-options label { font-size: 10px; padding-block: 14px; }
  .fl-composer-summary { font-size: 10px; }
  .fl-composer-summary > span:last-child { font-size: 18px; }
  .fl-story, .fl-join { grid-template-columns: 1fr; gap: 45px; }
  .fl-story-art { border-top-right-radius: 150px; padding: 90px 25px 25px; }
  .fl-story-art > .fl-script { font-size: 29px; top: 30px; left: 27px; }
  .fl-story-copy h2 { font-size: 38px; }
  .fl-story-copy p:not(.fl-eyebrow) { font-size: 14px; }
  .fl-story-copy .fl-text-link { font-size: 11px; }
  .fl-plan-grid { grid-template-columns: 1fr; margin-top: 35px; gap: 18px; }
  .fl-plan { padding: 28px; }
  .fl-plan h3 { font-size: 30px; }
  .fl-plan p { min-height: 0; max-width: 32ch; }
  .fl-plan-price { font-size: 48px; margin-top: 15px; }
  .fl-plan-flowers { height: 60px; }
  .fl-plan-foot { flex-wrap: wrap; gap: 10px; font-size: 10px; }
  .fl-plan-foot > svg { width: 12px; height: 12px; }
  .fl-plan-foot > svg:last-of-type { display: none; }
  .fl-plan-foot { max-width: 290px; margin-inline: auto; }
  .fl-centered .fl-lead { font-size: 14px; }
  .fl-join-copy .fl-lead { font-size: 14px; }
  .fl-join-note { margin-top: 30px; font-size: 26px; }
  .fl-form-panel { padding: 26px 22px; min-height: 480px; }
  .fl-form-choices { grid-template-columns: 1fr; gap: 15px; }
  .fl-form-heading { font-size: 12px; }
  .fl-form-summary { margin-top: 22px; }
  .fl-form-summary > span { max-width: 145px; }
  .fl-success h3 { font-size: 34px; }
  .fl-footer { padding: 35px 20px 25px; border-radius: 30px 30px 0 0; }
  .fl-footer-top { flex-wrap: wrap; row-gap: 15px; }
  .fl-footer-top p { font-size: 11px; order: 3; width: 100%; }
  .fl-footer-top .fl-text-link { font-size: 10px; gap: 12px; }
  .fl-footer-word { font-size: 13.2vw; padding-block: 30px; }
  .fl-footer-bottom { flex-wrap: wrap; gap: 8px; font-size: 9px; }
  .fl-footer-bottom > span:nth-child(2) { width: 100%; order: 3; }
  .fl-motion-toggle { font-size: 9px!important; }
}
@media (prefers-reduced-motion: reduce) {
  .fl-body *, .fl-body *::before, .fl-body *::after { animation: none!important; transition: none!important; scroll-behavior: auto!important; }
  .fl-postcards { transform: none!important; }
  .fl-botanical[data-gather=true] .fl-stem { transform: none!important; opacity: 1!important; }
  .fl-postcard:hover, .fl-plan:hover, .fl-flower-card:hover .fl-botanical, .fl-feeling:hover .fl-swatch { transform: none; }
}
]]>
    </file>
    <file path="src/app/(flori)/flori/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="18" fill="#FFF9F0"/><g fill="#344C40"><ellipse cx="32" cy="20" rx="8" ry="13"/><ellipse cx="32" cy="20" rx="8" ry="13" transform="rotate(60 32 32)"/><ellipse cx="32" cy="20" rx="8" ry="13" transform="rotate(120 32 32)"/><ellipse cx="32" cy="20" rx="8" ry="13" transform="rotate(180 32 32)"/><ellipse cx="32" cy="20" rx="8" ry="13" transform="rotate(240 32 32)"/><ellipse cx="32" cy="20" rx="8" ry="13" transform="rotate(300 32 32)"/></g><circle cx="32" cy="32" r="6" fill="#F5DF9B"/></svg>
]]>
    </file>
    <file path="src/app/(flori)/flori/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";
export const alt = "Flori — a little flower club for everyday occasions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", background: "#FFF9F0", color: "#344C40" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 44, marginBottom: 30 }}>
      <svg width="48" height="48" viewBox="0 0 64 64">
        {[0, 60, 120, 180, 240, 300].map((angle) => <ellipse key={angle} cx="32" cy="19" rx="8" ry="13" fill="#344C40" transform={`rotate(${angle} 32 32)`} />)}
        <circle cx="32" cy="32" r="6" fill="#F5DF9B" />
      </svg>
      flori
    </div>
    <div style={{ fontSize: 90, fontFamily: "serif", lineHeight: 1.1 }}>A little bloom.</div>
    <div style={{ fontSize: 90, fontFamily: "serif", fontStyle: "italic", lineHeight: 1.1 }}>A brighter day.</div>
    <div style={{ display: "flex", gap: 16, marginTop: 40 }}>{["#D8D1EC", "#F1C6CF", "#F5DF9B", "#D9E6C8", "#EDB997"].map((color) => <div key={color} style={{ width: 130, height: 70, background: color, borderRadius: "60px 60px 12px 12px" }} />)}</div>
  </div>, size);
}
]]>
    </file>
    <file path="src/app/(flori)/flori/page.tsx">
<![CDATA[import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Promise } from "./sections/Promise";
import { Collection } from "./sections/Collection";
import { Composer } from "./sections/Composer";
import { Story } from "./sections/Story";
import { Plans } from "./sections/Plans";
import { Join } from "./sections/Join";
import { Footer } from "./sections/Footer";
import { PageMotion } from "./motion/PageMotion";
import { SmoothScroll } from "./motion/SmoothScroll";

export default function FloriPage() {
  return <><a className="fl-skip" href="#flowers">Skip to the flowers</a><Header /><main><Hero /><Promise /><Collection /><Composer /><Story /><Plans /><Join /></main><Footer /><PageMotion /><SmoothScroll /></>;
}
]]>
    </file>
    <file path="src/app/(flori)/flori/bouquet/BotanicalArt.tsx">
<![CDATA[import type { CSSProperties } from "react";
import type { Feeling } from "./model";

type StemSpec = { x: number; y: number; angle: number; kind: "cosmos" | "poppy" | "bell" | "daisy"; scale: number };
const stems: StemSpec[] = [
  { x: 104, y: 143, angle: -22, kind: "cosmos", scale: .92 },
  { x: 259, y: 101, angle: 16, kind: "bell", scale: .85 },
  { x: 173, y: 82, angle: -9, kind: "poppy", scale: 1.05 },
  { x: 302, y: 191, angle: 28, kind: "cosmos", scale: .82 },
  { x: 224, y: 179, angle: 8, kind: "daisy", scale: .95 },
  { x: 143, y: 225, angle: -12, kind: "bell", scale: .8 },
  { x: 279, y: 251, angle: 22, kind: "poppy", scale: .68 },
];

function Bloom({ kind, index }: { kind: StemSpec["kind"]; index: number }) {
  if (kind === "poppy") return <g>
    <path d="M0 4C-58 7-59-35-31-40C-26-65 4-57 8-38C33-63 61-34 43-16C52 7 18 27 0 4Z" fill="var(--fl-petal-a)" />
    <path d="M-5 2C-27-17-31-30-20-40M4 0C13-21 25-28 34-30" fill="none" stroke="var(--fl-ink)" strokeOpacity=".14" strokeWidth="2" />
    <ellipse cy="1" rx="12" ry="9" fill="var(--fl-ink)" />
    <ellipse cy="-2" rx="6" ry="4" fill="var(--fl-butter)" />
  </g>;
  if (kind === "bell") return <g fill="var(--fl-petal-b)">
    <path d="M-21-21Q-27-48-2-46Q24-45 18-20L29 9Q12 25-1 11Q-15 27-30 9Z" />
    <path d="M-3-43L-2 12M-17-31L-19 11M12-31L16 12" stroke="var(--fl-ink)" strokeOpacity=".13" strokeWidth="2" />
    <path d="M-12-44L-3-55L8-45" fill="var(--fl-sage)" />
  </g>;
  const count = kind === "daisy" ? 12 : 8;
  return <g>
    {Array.from({ length: count }, (_, i) => <path key={i} d={kind === "daisy" ? "M-6-6C-19-24-10-49 0-48C11-48 17-23 6-6Z" : "M-7-4C-35-18-34-42-18-47Q-7-53 0-44Q9-52 18-45C34-29 21-10 7-4Z"} fill={kind === "daisy" ? "var(--fl-paper)" : index % 2 ? "var(--fl-petal-b)" : "var(--fl-petal-a)"} transform={`rotate(${i * 360 / count})`} />)}
    <circle r={kind === "daisy" ? 13 : 11} fill="var(--fl-butter)" />
    <path d="M-5-1L-1 4L5-3" stroke="var(--fl-ink)" strokeWidth="1.5" strokeOpacity=".3" fill="none" />
  </g>;
}

export function BotanicalArt({ feeling = "daydream", scene = "bunch", gather = false, className = "", title, id }: { feeling?: Feeling; scene?: "bunch" | "single" | "table"; gather?: boolean; className?: string; title?: string; id?: string }) {
  return <svg className={`fl-botanical ${className}`} data-feeling={feeling} data-scene={scene} data-gather={gather} viewBox="0 0 400 480" role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}><g id={id}>
    <ellipse cx="207" cy="440" rx="113" ry="10" fill="var(--fl-ink)" opacity=".07" />
    <g className="fl-foliage" fill="var(--fl-sage)" stroke="var(--fl-ink)" strokeWidth="2" strokeLinecap="round">
      <path d="M200 372Q69 283 75 192M207 374Q335 287 331 144" fill="none" />
      <path d="M102 285Q42 277 45 232Q92 236 102 285M87 247Q111 201 128 211Q137 241 87 247M78 210Q48 185 62 161Q85 166 78 210M277 292Q273 244 307 234Q321 265 277 292M308 239Q349 235 360 202Q323 191 308 239M325 193Q295 162 309 142Q341 147 325 193M331 161Q365 154 354 123Q328 130 331 161" stroke="none" />
    </g>
    {stems.map((stem, i) => <g key={i} className="fl-stem" style={{ display: scene === "single" && i % 2 === 1 ? "none" : undefined, "--stem-x": `${(i - 3) * 22}px`, "--stem-y": `${25 + i * 7}px`, "--stem-r": `${(i - 3) * 7}deg`, "--i": i } as CSSProperties}>
      <path d={`M${196 + i * 2} 379Q${stem.x + 20} ${stem.y + 115} ${stem.x} ${stem.y}`} fill="none" stroke="var(--fl-ink)" strokeWidth="3" strokeLinecap="round" />
      <path d={`M${180 + i * 3} ${300 - i * 5}q${i % 2 ? 45 : -55} -48 ${i % 2 ? 58 : -45} -19q-12 31 ${i % 2 ? -58 : 45} 19`} fill={i % 2 ? "var(--fl-sage)" : "var(--fl-ink)"} />
      <g transform={`translate(${stem.x} ${stem.y}) rotate(${stem.angle}) scale(${stem.scale})`}><g className="fl-bloom"><Bloom kind={feeling === "sunbeam" && stem.kind === "bell" ? "daisy" : stem.kind} index={i} /></g></g>
    </g>)}
    <g className="fl-vase" style={scene === "single" ? { transform: "scale(.82,1.08)", transformOrigin: "200px 445px" } : undefined}>
      <path d="M155 319Q200 309 245 319L256 413Q254 444 200 445Q145 444 144 413Z" fill="var(--fl-vase-color)" />
      <ellipse cx="200" cy="319" rx="45" ry="7" fill="var(--fl-ink)" opacity=".12" />
      <path d="M166 338L161 414M182 337L180 429M200 337V432M218 337L221 429M235 338L240 414" stroke="var(--fl-ink)" strokeWidth="2" opacity=".1" fill="none" strokeLinecap="round" />
      <path d="M154 406Q200 423 247 406" stroke="var(--fl-paper)" strokeWidth="2" opacity=".35" fill="none" />
    </g>
    {scene === "table" && <g>
      <path d="M31 436Q43 392 78 368L91 379Q68 422 50 440Z" fill="var(--fl-petal-a)" />
      <path d="M290 439L373 389M316 423L359 433" stroke="var(--fl-ink)" strokeWidth="3" strokeLinecap="round" />
      <g transform="translate(357 400) scale(.45)"><Bloom kind="cosmos" index={0} /></g>
    </g>}
  </g></svg>;
}
]]>
    </file>
    <file path="src/app/(flori)/flori/bouquet/BouquetComposer.tsx">
<![CDATA["use client";
import { useEffect, useState } from "react";
import { BotanicalArt } from "./BotanicalArt";
import { PRICES, SIZES, SIZE_LABELS, selectionFromSearch, type Feeling, type BunchSize } from "./model";
import { FLOWERS } from "../content/flowers";
import { Flower } from "../brand/Flower";

export function BouquetComposer() {
  const [feeling, setFeeling] = useState<Feeling>("daydream");
  const [size, setSize] = useState<BunchSize>("little");
  useEffect(() => {
    const sync = () => { if (location.hash === "#compose") { const selection = selectionFromSearch(location.search); setFeeling(selection.feeling); setSize(selection.size); } };
    sync(); window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  const flower = FLOWERS.find((item) => item.id === feeling)!;
  return <div className="fl-composer-layout">
    <div className="fl-composer-stage" data-reveal="scale">
      <span className="fl-script fl-composer-note">a little more you</span>
      <div className="fl-composer-arch" data-size={size}><BotanicalArt feeling={feeling} gather title={`${flower.name} bouquet in a ceramic vase`} /></div>
      <span className="fl-composer-caption"><Flower /> Gathered with feeling, never a formula.</span>
    </div>
    <div className="fl-composer-controls">
      <p className="fl-eyebrow">Your flowers, your feeling</p>
      <h2>A bunch that<br />feels like <em>you.</em></h2>
      <p className="fl-lead">A soft day? A bright day? A let-it-all-grow day?<br />There’s a little bunch for that.</p>
      <div className="fl-enhanced">
        <fieldset className="fl-feelings"><legend>01 &nbsp; Pick a feeling</legend>
          <div className="fl-feeling-options">{FLOWERS.map((item) => <label className="fl-feeling" key={item.id} data-selected={feeling === item.id}>
            <input type="radio" name="flower-feeling" value={item.id} checked={feeling === item.id} onChange={() => setFeeling(item.id)} />
            <span className={`fl-swatch fl-bg-${item.background}`}><Flower /></span><span>{item.name}</span>
          </label>)}</div>
        </fieldset>
        <fieldset className="fl-size-options"><legend>02 &nbsp; Make it your size</legend><div>{SIZES.map((item) => <label key={item} data-selected={size === item}>
          <input type="radio" name="bunch-size" value={item} checked={size === item} onChange={() => setSize(item)} /><span>{SIZE_LABELS[item]}</span>{" "}<span>£{PRICES[item]}</span>
        </label>)}</div></fieldset>
        <div className="fl-composer-summary" aria-live="polite" aria-atomic="true"><span>{flower.name} · {SIZE_LABELS[size].toLowerCase()}</span><span>£{PRICES[size]} <small>/ delivery</small></span></div>
        <a className="fl-button" href={`?feeling=${feeling}&size=${size}#join`}>That’s my bunch <span aria-hidden="true">↗</span></a>
      </div>
      <p className="fl-nojs">Daydream bunches start at £24. <a href="#join">Find your flowers below.</a></p>
      <p className="fl-small">A new gathering every fortnight. Pause whenever.</p>
    </div>
  </div>;
}
]]>
    </file>
    <file path="src/app/(flori)/flori/bouquet/carousel.ts">
<![CDATA[export function postcardPose(index: number, offset: number, pitch: number, count: number) {
  const span = pitch * count;
  const raw = (index - 2) * pitch - offset;
  const x = ((raw + span / 2) % span + span) % span - span / 2;
  const distance = x / pitch;
  return { x, y: Math.abs(distance) * 23, rotation: Math.max(-24, Math.min(24, distance * 7)) };
}
]]>
    </file>
    <file path="src/app/(flori)/flori/bouquet/model.ts">
<![CDATA[export type Feeling = "daydream" | "sunbeam" | "wildthing";
export type BunchSize = "little" | "lovely" | "abundant";
export const FEELINGS: Feeling[] = ["daydream", "sunbeam", "wildthing"];
export const SIZES: BunchSize[] = ["little", "lovely", "abundant"];
export const PRICES: Record<BunchSize, number> = { little: 24, lovely: 34, abundant: 48 };
export const SIZE_LABELS: Record<BunchSize, string> = { little: "A little bunch", lovely: "Something lovely", abundant: "Full of feeling" };
export function selectionFromSearch(search: string): { feeling: Feeling; size: BunchSize } {
  const query = new URLSearchParams(search);
  const feeling = query.get("feeling");
  const size = query.get("size");
  return {
    feeling: FEELINGS.find((item) => item === feeling) ?? "daydream",
    size: SIZES.find((item) => item === size) ?? "little",
  };
}
]]>
    </file>
    <file path="src/app/(flori)/flori/bouquet/PostcardCarousel.tsx">
<![CDATA["use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { postcardPose } from "./carousel";

type Controls = {
  wake: () => void;
  step: (direction: number) => void;
  focus: (index: number) => void;
  down: (x: number) => void;
  move: (x: number, time: number) => boolean;
  up: (cancel?: boolean) => boolean;
};

export function PostcardCarousel({ children }: { children: ReactNode }) {
  const region = useRef<HTMLDivElement>(null);
  const controller = useRef<Controls | null>(null);
  const interaction = useRef({ paused: false, hover: false, focus: false });
  const suppressClick = useRef(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const element = region.current;
    const track = element?.querySelector<HTMLElement>(".fl-postcards");
    if (!element || !track) return;
    const slots = Array.from(track.querySelectorAll<HTMLElement>(".fl-postcard-slot"));
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let pitch = 206, position = 0, target = 0, frame = 0, last = 0, visible = false;
    let pointer: { start: number; x: number; time: number; velocity: number; moved: boolean } | null = null;
    const paint = () => {
      slots.forEach((slot, i) => {
        const pose = postcardPose(i, position, pitch, slots.length);
        slot.style.transform = `translate3d(calc(-50% + ${pose.x}px), ${pose.y}px, 0) rotate(${pose.rotation}deg)`;
      });
    };
    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) { last = 0; return; }
      const dt = last ? Math.min(32, now - last) : 16;
      last = now;
      const state = interaction.current;
      const autoplay = !reduced.matches && !state.paused && !state.hover && !state.focus && !pointer && document.documentElement.dataset.flPaused !== "true";
      if (autoplay) target += 24 * dt / 1000;
      const difference = target - position;
      if (reduced.matches || pointer?.moved) position = target;
      else {
        position += difference * (1 - Math.exp(-dt / 85));
        if (Math.abs(target - position) < .01) position = target;
      }
      paint();
      if (autoplay || Math.abs(target - position) > .01) frame = requestAnimationFrame(tick);
      else last = 0;
    };
    const wake = () => { if (!frame) frame = requestAnimationFrame(tick); };
    const measure = () => {
      const style = getComputedStyle(track);
      const nextPitch = parseFloat(style.getPropertyValue("--fl-card-width")) + parseFloat(style.getPropertyValue("--fl-card-gap"));
      position = position / pitch * nextPitch;
      target = target / pitch * nextPitch;
      pitch = nextPitch;
      paint(); wake();
    };
    controller.current = {
      wake,
      step(direction) { target += direction * pitch; if (reduced.matches) { position = target; paint(); } wake(); },
      focus(index) { position += postcardPose(index, position, pitch, slots.length).x; target = position; paint(); wake(); },
      down(x) { pointer = { start: x, x, time: performance.now(), velocity: 0, moved: false }; target = position; wake(); },
      move(x, time) {
        if (!pointer) return false;
        const delta = x - pointer.x;
        if (Math.abs(x - pointer.start) > 6) pointer.moved = true;
        if (pointer.moved) { target -= delta; position = target; paint(); }
        pointer.velocity = delta / Math.max(1, time - pointer.time);
        pointer.x = x; pointer.time = time;
        return pointer.moved;
      },
      up(cancel = false) {
        const moved = Boolean(pointer?.moved);
        if (pointer && moved && !cancel && !reduced.matches) target = position - Math.max(-pitch * 1.5, Math.min(pitch * 1.5, pointer.velocity * 160));
        pointer = null;
        delete element.dataset.dragging;
        wake(); return moved;
      },
    };
    track.dataset.carousel = "true";
    measure();
    const view = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
      else { cancelAnimationFrame(frame); frame = 0; last = 0; }
    }, { threshold: .05 });
    view.observe(element);
    const size = new ResizeObserver(measure);
    size.observe(element);
    const globalPause = new MutationObserver(wake);
    globalPause.observe(document.documentElement, { attributes: true, attributeFilter: ["data-fl-paused"] });
    const mode = () => { target = position; last = 0; wake(); };
    document.addEventListener("visibilitychange", mode);
    reduced.addEventListener("change", mode);
    return () => {
      cancelAnimationFrame(frame); view.disconnect(); size.disconnect(); globalPause.disconnect();
      document.removeEventListener("visibilitychange", mode); reduced.removeEventListener("change", mode);
      controller.current = null; delete track.dataset.carousel;
      slots.forEach((slot) => slot.style.removeProperty("transform"));
    };
  }, []);

  return <div ref={region} className="fl-carousel" role="region" aria-roledescription="carousel" aria-label="Flower postcards" tabIndex={0}
    onPointerEnter={(event) => { if (event.pointerType === "mouse") { interaction.current.hover = true; controller.current?.wake(); } }}
    onPointerLeave={() => { interaction.current.hover = false; controller.current?.wake(); }}
    onFocusCapture={(event) => {
      interaction.current.focus = true;
      const slot = (event.target as HTMLElement).closest<HTMLElement>("[data-card]");
      if (slot && event.target.matches(":focus-visible")) controller.current?.focus(Number(slot.dataset.card));
      controller.current?.wake();
    }}
    onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) { interaction.current.focus = false; controller.current?.wake(); } }}
    onKeyDown={(event) => {
      if (event.target !== event.currentTarget || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
      event.preventDefault(); controller.current?.step(event.key === "ArrowRight" ? 1 : -1);
    }}
    onPointerDown={(event) => {
      if (!event.isPrimary || event.button !== 0 || (event.target as HTMLElement).closest("button")) return;
      suppressClick.current = false;
      controller.current?.down(event.clientX);
    }}
    onPointerMove={(event) => {
      if (controller.current?.move(event.clientX, performance.now())) {
        event.currentTarget.dataset.dragging = "true";
        event.currentTarget.setPointerCapture(event.pointerId);
        if (event.cancelable) event.preventDefault();
      }
    }}
    onPointerUp={(event) => {
      suppressClick.current = controller.current?.up() ?? false;
      if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    }}
    onPointerCancel={() => { controller.current?.up(true); }}
    onDragStart={(event) => event.preventDefault()}
    onClickCapture={(event) => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}>
    <div className="fl-postcards">{children}</div>
    <div className="fl-carousel-controls fl-enhanced">
      <button className="fl-carousel-arrow fl-carousel-arrow--prev" type="button" aria-label="Previous flowers" onClick={() => controller.current?.step(-1)}>←</button>
      <button className="fl-carousel-pause" type="button" aria-label={paused ? "Play flower carousel" : "Pause flower carousel"} aria-pressed={paused} onClick={() => {
        const next = !paused; interaction.current.paused = next; setPaused(next); controller.current?.wake();
      }}><span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>{paused ? "Play" : "Pause"}</button>
      <button className="fl-carousel-arrow fl-carousel-arrow--next" type="button" aria-label="Next flowers" onClick={() => controller.current?.step(1)}>→</button>
    </div>
  </div>;
}
]]>
    </file>
    <file path="src/app/(flori)/flori/brand/Flower.tsx">
<![CDATA[export function Flower({ className = "", petals = 6 }: { className?: string; petals?: number }) {
  return <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden="true">
    {Array.from({ length: petals }, (_, i) => <ellipse key={i} cx="32" cy="19" rx="8" ry="13" fill="currentColor" transform={`rotate(${i * 360 / petals} 32 32)`} />)}
    <circle cx="32" cy="32" r="6" fill="var(--fl-butter)" />
  </svg>;
}
]]>
    </file>
    <file path="src/app/(flori)/flori/brand/Logo.tsx">
<![CDATA[import { Flower } from "./Flower";

export function Logo({ large = false }: { large?: boolean }) {
  return <span className={`fl-logo${large ? " fl-logo--large" : ""}`}><Flower /><svg viewBox="0 0 157 82" role="img" aria-label="Flori"><text x="0" y="66" fill="currentColor" fontFamily="var(--font-flori-lora), Georgia, serif" fontSize="80" letterSpacing="-7">flori</text></svg></span>;
}
]]>
    </file>
    <file path="src/app/(flori)/flori/content/flowers.ts">
<![CDATA[import type { Feeling } from "../bouquet/model";
export type FlowerFeeling = { id: Feeling; name: string; note: string; description: string; flowers: string; background: string; number: string };
export const FLOWERS: FlowerFeeling[] = [
  { id: "daydream", name: "Daydream", note: "for your soft side", description: "Blush petals, lilac daydreams. A little quiet in a very loud world.", flowers: "Cosmos · sweet peas · seasonal foliage", background: "lilac", number: "01" },
  { id: "sunbeam", name: "Sunbeam", note: "a pocketful of happy", description: "Buttery yellows and apricot pops. The windows-open kind of feeling.", flowers: "Poppies · daisies · seasonal foliage", background: "butter", number: "02" },
  { id: "wildthing", name: "Wild Thing", note: "a little beautifully unruly", description: "Long stems and lovely surprises. For the ones who grow their own way.", flowers: "Scabiosa · bells · seasonal foliage", background: "pistachio", number: "03" },
];
]]>
    </file>
    <file path="src/app/(flori)/flori/content/plans.ts">
<![CDATA[import type { BunchSize } from "../bouquet/model";
export const PLANS: { id: BunchSize; name: string; stems: string; description: string; note: string }[] = [
  { id: "little", name: "A little bunch", stems: "10–12 stems", description: "A windowsill, a bedside, a small reason to smile.", note: "Small space, big feeling" },
  { id: "lovely", name: "Something lovely", stems: "16–20 stems", description: "The kitchen-table favourite. Just the right kind of full.", note: "The club favourite" },
  { id: "abundant", name: "Full of feeling", stems: "26–30 stems", description: "An all-out, arms-full, you-deserve-this kind of bunch.", note: "A proper armful" },
];
]]>
    </file>
    <file path="src/app/(flori)/flori/forms/JoinForm.tsx">
<![CDATA["use client";
import { useEffect, useRef, useState } from "react";
import { FLOWERS } from "../content/flowers";
import { PRICES, SIZES, SIZE_LABELS, selectionFromSearch, type Feeling, type BunchSize } from "../bouquet/model";
import { validateJoin, type JoinErrors } from "./validation";
import { Flower } from "../brand/Flower";

export function JoinForm() {
  const [selection, setSelection] = useState<{ feeling: Feeling; size: BunchSize }>({ feeling: "daydream", size: "little" });
  const [errors, setErrors] = useState<JoinErrors>({});
  const [status, setStatus] = useState<"idle" | "preparing" | "success">("idle");
  const [name, setName] = useState("");
  const form = useRef<HTMLFormElement>(null);
  const success = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const sync = () => { if (location.hash === "#join") setSelection(selectionFromSearch(location.search)); };
    sync(); window.addEventListener("hashchange", sync);
    return () => { window.removeEventListener("hashchange", sync); if (timer.current) clearTimeout(timer.current); };
  }, []);
  useEffect(() => { if (status === "success") success.current?.focus(); }, [status]);
  const submit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const values = { name: String(data.get("name") ?? ""), email: String(data.get("email") ?? ""), ...selection };
    const problems = validateJoin(values);
    setErrors(problems);
    if (Object.keys(problems).length) { form.current?.querySelector<HTMLElement>(`[name="${Object.keys(problems)[0]}"]`)?.focus(); return; }
    setName(values.name.trim()); setStatus("preparing");
    timer.current = setTimeout(() => setStatus("success"), 850);
  };
  const feeling = FLOWERS.find((item) => item.id === selection.feeling)!;
  return <>
    <div className="fl-enhanced fl-form-panel" data-state={status}>
      {status === "success" ? <div className="fl-success" ref={success} tabIndex={-1} role="status"><Flower /><p className="fl-script">a lovely little beginning</p><h3>Hello, {name}.</h3><p>Your {feeling.name.toLowerCase()} bunch is looking lovely.</p><p>{SIZE_LABELS[selection.size]} · £{PRICES[selection.size]} per delivery</p><p className="fl-small">You’ve tried the Flori signup. This is a demo: your details haven’t been sent or saved, and no order has been placed.</p><button className="fl-button fl-button--outline" type="button" onClick={() => { setStatus("idle"); setName(""); requestAnimationFrame(() => form.current?.querySelector<HTMLInputElement>("input")?.focus()); }}>Try another little bunch <span aria-hidden="true">↗</span></button></div> : <form ref={form} onSubmit={submit} noValidate aria-label="Join the Flori flower club" aria-busy={status === "preparing"}>
        <div className="fl-form-heading"><Flower /><span>A little hello</span><span>01 / you</span></div>
        <div className="fl-fields">{[{ id: "name" as const, label: "Your first name", type: "text", autoComplete: "given-name", max: 80 }, { id: "email" as const, label: "Your email address", type: "email", autoComplete: "email", max: 254 }].map((field) => <div className="fl-field" key={field.id} data-invalid={Boolean(errors[field.id])}>
          <input id={`fl-${field.id}`} name={field.id} type={field.type} autoComplete={field.autoComplete} maxLength={field.max} required placeholder=" " aria-invalid={Boolean(errors[field.id])} aria-describedby={errors[field.id] ? `fl-${field.id}-error` : undefined} disabled={status === "preparing"} onChange={() => setErrors((current) => ({ ...current, [field.id]: undefined }))} />
          <label htmlFor={`fl-${field.id}`}>{field.label}</label>{errors[field.id] && <p id={`fl-${field.id}-error`} className="fl-field-error">{errors[field.id]}</p>}
        </div>)}</div>
        <div className="fl-form-choices"><label htmlFor="fl-join-feeling">Your flower feeling<select id="fl-join-feeling" name="feeling" value={selection.feeling} disabled={status === "preparing"} onChange={(event) => { const feeling = FLOWERS.find((item) => item.id === event.target.value); if (feeling) setSelection((current) => ({ ...current, feeling: feeling.id })); }}>{FLOWERS.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label htmlFor="fl-join-size">Your bunch size<select id="fl-join-size" name="size" value={selection.size} disabled={status === "preparing"} onChange={(event) => { const size = SIZES.find((item) => item === event.target.value); if (size) setSelection((current) => ({ ...current, size })); }}>{SIZES.map((item) => <option key={item} value={item}>{SIZE_LABELS[item]} · £{PRICES[item]}</option>)}</select></label></div>
        <div className="fl-form-summary"><span>Something to look forward to</span><strong>£{PRICES[selection.size]} <small>/ fortnight</small></strong></div>
        <button className="fl-button" type="submit" disabled={status === "preparing"}>{status === "preparing" ? "Gathering your little hello…" : "Count me in"}<span aria-hidden="true">{status === "preparing" ? "✿" : "↗"}</span></button>
        <p className="fl-small fl-form-privacy">A demo signup for a fictional club. Nothing is sent or saved.</p>
        <span className="fl-status" role="status">{status === "preparing" ? "Preparing your bouquet preview." : ""}</span>
      </form>}
    </div>
    <div className="fl-nojs fl-form-fallback"><Flower /><h3>A little hello goes a long way.</h3><p>Daydream, Sunbeam, or Wild Thing — bunches from £24. This is a fictional club and demo template.</p><a className="fl-button" href="mailto:hello@flori.example">Say hello by email <span aria-hidden="true">↗</span></a></div>
  </>;
}
]]>
    </file>
    <file path="src/app/(flori)/flori/forms/validation.ts">
<![CDATA[import { FEELINGS, SIZES, type Feeling, type BunchSize } from "../bouquet/model";
export type JoinValues = { name: string; email: string; feeling: string; size: string };
export type JoinErrors = Partial<Record<keyof JoinValues, string>>;
export function validateJoin(values: JoinValues): JoinErrors {
  const errors: JoinErrors = {};
  if (!values.name.trim() || values.name.trim().length > 80) errors.name = "A first name, up to 80 characters, please.";
  if (values.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "A lovely email address needs an @ and a domain.";
  if (!FEELINGS.some((item) => item === values.feeling)) errors.feeling = "Pick one of our three flower feelings.";
  if (!SIZES.some((item) => item === values.size)) errors.size = "Pick a bunch size.";
  return errors;
}
export type BouquetSelection = { feeling: Feeling; size: BunchSize };
]]>
    </file>
    <file path="src/app/(flori)/flori/motion/math.ts">
<![CDATA[export function progressAt(scroll: number, start: number, distance: number): number {
  if (distance <= 0) return scroll >= start ? 1 : 0;
  return Math.max(0, Math.min(1, (scroll - start) / distance));
}
]]>
    </file>
    <file path="src/app/(flori)/flori/motion/PageMotion.tsx">
<![CDATA["use client";
import { useEffect } from "react";
import { progressAt } from "./math";

export function PageMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const query = matchMedia("(prefers-reduced-motion: reduce)");
    const header = document.querySelector<HTMLElement>(".fl-header");
    const composer = document.getElementById("compose");
    const hero = document.getElementById("top");
    const rail = document.querySelector<HTMLElement>(".fl-progress");
    const postcards = document.querySelector<HTMLElement>(".fl-postcards");
    const stems = Array.from(document.querySelectorAll<SVGElement>("#compose .fl-stem"));
    let frame = 0, start = 0, span = 1, pageSpan = 1, heroSpan = 1;
    let previousGather = -1, previousExit = -1;
    const measure = () => {
      start = (composer?.getBoundingClientRect().top ?? 0) + window.scrollY - innerHeight * .85;
      span = innerHeight * .6;
      pageSpan = Math.max(1, root.scrollHeight - innerHeight);
      heroSpan = hero?.offsetHeight ?? innerHeight;
    };
    const update = () => {
      frame = 0;
      if (document.hidden) return;
      const y = window.scrollY;
      const compact = String(y > 70);
      if (header?.dataset.compact !== compact) header?.setAttribute("data-compact", compact);
      rail?.style.setProperty("--fl-progress", String(progressAt(y, 0, pageSpan)));
      const exit = query.matches ? 0 : progressAt(y, 0, heroSpan);
      if (exit !== previousExit) { postcards?.style.setProperty("--fl-hero-exit", String(exit)); previousExit = exit; }
      const gather = query.matches ? 1 : progressAt(y, start, span);
      if (gather !== previousGather) {
        composer?.style.setProperty("--fl-gather", String(gather));
        stems.forEach((stem) => stem.style.setProperty("--fl-gather", String(gather)));
        previousGather = gather;
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const resize = () => { measure(); schedule(); };
    const mode = () => { root.dataset.flMotion = query.matches ? "reduced" : "live"; schedule(); };
    mode(); measure(); update();
    // Observe an unclipped ancestor: a fully masked element has no intersection area.
    const reveals = new Map<Element, Element[]>();
    document.querySelectorAll("[data-reveal]").forEach((el) => {
      const target = el.parentElement ?? el;
      reveals.set(target, [...(reveals.get(target) ?? []), el]);
    });
    const observer = new IntersectionObserver((entries, io) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { reveals.get(entry.target)?.forEach((el) => el.setAttribute("data-in", "true")); io.unobserve(entry.target); } });
    }, { threshold: .08, rootMargin: "0px 0px -25px 0px" });
    reveals.forEach((_, target) => observer.observe(target));
    const ambient = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.setAttribute("data-active", String(entry.isIntersecting))));
    document.querySelectorAll("[data-ambient]").forEach((el) => ambient.observe(el));
    const visibility = () => { root.dataset.flHidden = String(document.hidden); schedule(); };
    const hashTarget = () => {
      const id = location.hash.slice(1);
      if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant", block: "start" });
    };
    const anchor = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const next = new URL(link.href, location.href);
      if (next.origin !== location.origin || next.pathname !== location.pathname || !next.hash) return;
      const target = document.getElementById(next.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      history.pushState(null, "", next.search + next.hash);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
      target.scrollIntoView({ behavior: query.matches ? "instant" : "smooth", block: "start" });
      if (link.classList.contains("fl-skip")) target.focus({ preventScroll: true });
    };
    if (location.hash) hashTarget();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("popstate", hashTarget);
    document.addEventListener("click", anchor);
    document.addEventListener("visibilitychange", visibility);
    query.addEventListener("change", mode);
    const sizeObserver = new ResizeObserver(resize);
    sizeObserver.observe(document.body);
    document.fonts.ready.then(() => { if (root.dataset.flMotion) resize(); });
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); ambient.disconnect(); sizeObserver.disconnect();
      window.removeEventListener("scroll", schedule); window.removeEventListener("resize", resize); window.removeEventListener("popstate", hashTarget);
      document.removeEventListener("click", anchor); document.removeEventListener("visibilitychange", visibility); query.removeEventListener("change", mode);
      delete root.dataset.flMotion;
      postcards?.style.removeProperty("--fl-hero-exit");
      stems.forEach((stem) => stem.style.removeProperty("--fl-gather"));
    };
  }, []);
  return null;
}
]]>
    </file>
    <file path="src/app/(flori)/flori/motion/Reveal.tsx">
<![CDATA[import type { CSSProperties, ReactNode } from "react";
export function Reveal({ children, className = "", variant = "rise", index = 0 }: { children: ReactNode; className?: string; variant?: "rise" | "mask" | "wipe" | "scale" | "draw"; index?: number }) {
  return <div className={className} data-reveal={variant} style={{ "--i": index } as CSSProperties}>{children}</div>;
}
]]>
    </file>
    <file path="src/app/(flori)/flori/motion/SmoothScroll.tsx">
<![CDATA["use client";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const query = matchMedia("(prefers-reduced-motion: no-preference) and (pointer: fine)");
    let disposed = false;
    let stop = () => {};
    const setup = async () => {
      stop();
      if (!query.matches || disposed) return;
      const { default: Lenis } = await import("lenis");
      if (!query.matches || disposed) return;
      const lenis = new Lenis({ lerp: 0.1, autoRaf: true, anchors: false });
      stop = () => lenis.destroy();
    };
    void setup();
    query.addEventListener("change", setup);
    return () => { disposed = true; stop(); query.removeEventListener("change", setup); };
  }, []);
  return null;
}
]]>
    </file>
    <file path="src/app/(flori)/flori/sections/Collection.tsx">
<![CDATA[import { FLOWERS } from "../content/flowers";
import { BotanicalArt } from "../bouquet/BotanicalArt";
import { Reveal } from "../motion/Reveal";

export function Collection() {
  return <section className="fl-section fl-collection" id="flowers" tabIndex={-1} aria-labelledby="fl-flowers-title">
    <div className="fl-section-heading"><Reveal variant="mask"><p className="fl-eyebrow">The weekly gathering</p><h2 id="fl-flowers-title">What’s your<br /><em>flower feeling?</em></h2></Reveal><Reveal><p className="fl-lead">No two weeks are quite the same.<br />Just nature doing its lovely thing.</p><a className="fl-text-link" href="#compose">Let’s find your bunch <span aria-hidden="true">↗</span></a></Reveal></div>
    <div className="fl-collection-grid">{FLOWERS.map((flower, i) => <Reveal key={flower.id} variant="scale" index={i}><a className="fl-flower-card" href={`?feeling=${flower.id}#compose`}>
      <div className={`fl-flower-card-art fl-bg-${flower.background}`}><span className="fl-flower-number">{flower.number} / the gathering</span><BotanicalArt feeling={flower.id} title={`${flower.name} seasonal flowers`} /><span className="fl-script">{flower.note}</span><span className="fl-card-arrow" aria-hidden="true">↗</span></div>
      <div className="fl-card-title"><h3>{flower.name}</h3><span>from £24</span></div><p>{flower.description}</p><span className="fl-flower-spec">{flower.flowers}</span>
    </a></Reveal>)}</div>
    <p className="fl-collection-foot">A feeling, never a fixed recipe. Your stems will follow the season.</p>
  </section>;
}
]]>
    </file>
    <file path="src/app/(flori)/flori/sections/Composer.tsx">
<![CDATA[import { BouquetComposer } from "../bouquet/BouquetComposer";
export function Composer() {
  return <section id="compose" className="fl-composer-section fl-scallop" aria-label="Compose your bouquet"><BouquetComposer /></section>;
}
]]>
    </file>
    <file path="src/app/(flori)/flori/sections/Footer.tsx">
<![CDATA["use client";
import { useState } from "react";
import { Logo } from "../brand/Logo";
export function Footer() {
  const [paused, setPaused] = useState(false);
  const toggle = () => { const next = !paused; setPaused(next); document.documentElement.dataset.flPaused = String(next); };
  return <footer className="fl-footer"><div className="fl-footer-top"><a href="#top" aria-label="Flori home"><Logo /></a><p>Good flowers. No grand occasion required.</p><a className="fl-text-link" href="mailto:hello@flori.example">Say a little hello <span aria-hidden="true">↗</span></a></div><div className="fl-footer-word" aria-hidden="true">a little lovely.</div><div className="fl-footer-bottom"><span>© 2026 Flori. A fictional flower club.</span><span>Original botanical artwork, made with care.</span><button type="button" className="fl-motion-toggle fl-enhanced" aria-pressed={paused} onClick={toggle}>{paused ? "Play" : "Pause"} little movements <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span></button></div></footer>;
}
]]>
    </file>
    <file path="src/app/(flori)/flori/sections/Header.tsx">
<![CDATA["use client";
import { useEffect, useRef, useState } from "react";
import { Logo } from "../brand/Logo";

const links = [{ href: "#flowers", label: "The flowers" }, { href: "#club", label: "Our little club" }, { href: "#plans", label: "The details" }];
export function Header() {
  const [open, setOpen] = useState(false);
  const [indicator, setIndicator] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const menu = dialog.current;
    if (!menu) return;
    if (open && !menu.open) menu.showModal();
    if (!open && menu.open) menu.close();
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; };
  }, [open]);
  const close = () => { setOpen(false); toggle.current?.focus(); };
  const keepFocus = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== "Tab") return;
    const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first?.focus();
    }
  };
  return <header className="fl-header fl-load">
    <div className="fl-nav-wrap">
      <a className="fl-home" href="#top" aria-label="Flori home"><Logo /></a>
      <nav className="fl-desktop-nav" aria-label="Main navigation" onMouseLeave={() => setIndicator(0)}>
        <span className="fl-nav-indicator" style={{ transform: `translateX(${indicator * 132}px)` }} aria-hidden="true" />
        {links.map((link, index) => <a key={link.href} href={link.href} onMouseEnter={() => setIndicator(index)} onFocus={() => setIndicator(index)}>{link.label}</a>)}
      </nav>
      <a className="fl-button fl-button--small" href="#compose">Find your flowers <span aria-hidden="true">↗</span></a>
      <button className="fl-menu-toggle fl-enhanced" ref={toggle} type="button" aria-label="Open navigation" aria-haspopup="dialog" aria-controls="fl-menu" aria-expanded={open} onClick={() => setOpen(true)}><span /><span /></button>
    </div>
    <div className="fl-progress" aria-hidden="true" />
    <dialog id="fl-menu" ref={dialog} className="fl-mobile-menu" onCancel={close} onClose={close} onKeyDown={keepFocus} aria-label="Navigation">
      <div className="fl-menu-top"><Logo /><button type="button" className="fl-close" onClick={close} aria-label="Close navigation">×</button></div>
      <nav aria-label="Mobile navigation">{links.map((link, i) => <a key={link.href} href={link.href} style={{ "--i": i } as React.CSSProperties} onClick={close}>{link.label}<span>↗</span></a>)}<a href="#compose" onClick={close}>Find your flowers <span>↗</span></a></nav>
      <p className="fl-script">A little something to look forward to.</p>
    </dialog>
  </header>;
}
]]>
    </file>
    <file path="src/app/(flori)/flori/sections/Hero.tsx">
<![CDATA[import type { CSSProperties } from "react";
import { BotanicalArt } from "../bouquet/BotanicalArt";
import { PostcardCarousel } from "../bouquet/PostcardCarousel";
import { Flower } from "../brand/Flower";
import type { Feeling } from "../bouquet/model";

const postcards: { feeling: Feeling; label: string; note: string; bg: string }[] = [
  { feeling: "wildthing", label: "A little wild", note: "grow your own way", bg: "pistachio" },
  { feeling: "daydream", label: "Just because", note: "no reason required", bg: "blush" },
  { feeling: "sunbeam", label: "Hello, sunshine", note: "a brighter kind of day", bg: "butter" },
  { feeling: "daydream", label: "Soft mornings", note: "take your sweet time", bg: "lilac" },
  { feeling: "wildthing", label: "For your person", note: "you know the one", bg: "apricot" },
];

export function Hero() {
  return <section id="top" className="fl-hero" aria-labelledby="fl-title" data-ambient>
    <div className="fl-hero-intro">
      <p className="fl-eyebrow fl-load"><Flower /> A little flower club for everyday occasions</p>
      <h1 id="fl-title"><span className="fl-line"><span className="fl-load">A little bloom.</span></span><span className="fl-line"><em className="fl-load">A brighter day.</em></span></h1>
      <p className="fl-hero-lead fl-load">For kitchen tables, just-because days, and someone you love.<br /> Seasonal flowers. A little feeling. No grand occasion required.</p>
    </div>
    <div className="fl-hero-gallery" aria-label="Flowers for every kind of day">
      <span className="fl-hero-note fl-script fl-load">ordinary days,<br />extra lovely.<svg viewBox="0 0 90 65" aria-hidden="true"><path d="M10 8Q71 2 73 53M63 43L73 55L82 42" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg></span>
      <PostcardCarousel>{[...postcards, ...postcards].map((card, index) => {
        const i = index % postcards.length;
        const duplicate = index >= postcards.length;
        return <div key={`${card.label}-${index}`} className="fl-postcard-slot" data-card={index} data-duplicate={duplicate || undefined} aria-hidden={duplicate || undefined} style={{ "--i": i, "--angle": `${(i - 2) * 7}deg`, "--offset": `${Math.abs(i - 2) * 23}px` } as CSSProperties}>
        <a className={`fl-postcard fl-bg-${card.bg} ${i === 1 || i === 3 ? "fl-postcard--square" : ""} fl-load`} href={`?feeling=${card.feeling}#compose`} tabIndex={duplicate ? -1 : undefined}>
          <span className="fl-postcard-note fl-script">{card.note}</span>
          {duplicate ? <svg className="fl-botanical" data-feeling={card.feeling} data-scene={i === 0 || i === 4 ? "single" : "bunch"} viewBox="0 0 400 480" aria-hidden="true"><use href={`#fl-postcard-art-${i}`} /></svg> : <BotanicalArt id={`fl-postcard-art-${i}`} feeling={card.feeling} scene={i === 0 || i === 4 ? "single" : "bunch"} />}
          <span className="fl-postcard-label">{card.label}<span aria-hidden="true">↗</span></span>
        </a>
      </div>;
      })}</PostcardCarousel>
      <div className="fl-hero-seal fl-load"><Flower /><span>freshly<br /><em>gathered</em></span><span className="fl-seal-bottom">happily delivered</span></div>
    </div>
    <div className="fl-hero-bottom fl-load"><a className="fl-button" href="#compose">Find your flowers <span aria-hidden="true">↗</span></a><p>From £24 a bunch <span aria-hidden="true">·</span> A little joy, on repeat</p></div>
    <div className="fl-hero-foot"><span>Good flowers. Good feeling.</span><a href="#flowers">A little look around <span aria-hidden="true">↓</span></a><span>Grown with the season <Flower /></span></div>
  </section>;
}
]]>
    </file>
    <file path="src/app/(flori)/flori/sections/Join.tsx">
<![CDATA[import { JoinForm } from "../forms/JoinForm";
import { Flower } from "../brand/Flower";
import { Reveal } from "../motion/Reveal";
export function Join() {
  return <section className="fl-section fl-join" id="join" aria-labelledby="fl-join-title"><div className="fl-join-copy"><Reveal variant="mask"><p className="fl-eyebrow">Your next little good thing</p><h2 id="fl-join-title">Let’s make your<br /><em>day bloom.</em></h2></Reveal><Reveal><p className="fl-lead">Leave us a little hello. We’ll help you find<br />the flowers that feel right at home.</p><span className="fl-script fl-join-note">There’s always room<br />for a little lovely.<Flower /></span></Reveal></div><Reveal variant="scale" className="fl-form-wrap"><JoinForm /></Reveal></section>;
}
]]>
    </file>
    <file path="src/app/(flori)/flori/sections/Plans.tsx">
<![CDATA[import { PLANS } from "../content/plans";
import { PRICES } from "../bouquet/model";
import { Flower } from "../brand/Flower";
import { Reveal } from "../motion/Reveal";
export function Plans() {
  return <section className="fl-plans fl-scallop" id="plans" aria-labelledby="fl-plans-title"><div className="fl-section">
    <Reveal variant="mask" className="fl-centered"><p className="fl-eyebrow">A little joy, on repeat</p><h2 id="fl-plans-title">Make room for <em>lovely.</em></h2><p className="fl-lead">One bunch, every fortnight. Your favourite corner, made happier.</p></Reveal>
    <div className="fl-plan-grid">{PLANS.map((plan, i) => <Reveal key={plan.id} variant="scale" index={i}><article className="fl-plan" data-favourite={i === 1}>
      <span className="fl-plan-note fl-script">{plan.note}</span><div className="fl-plan-flowers" aria-hidden="true">{Array.from({ length: i + 1 }, (_, j) => <Flower key={j} />)}</div>
      <h3>{plan.name}</h3><p>{plan.description}</p><div className="fl-plan-price">£{PRICES[plan.id]}<span> / delivery</span></div><span className="fl-stems">{plan.stems} · seasonal by nature</span><a className={`fl-button ${i === 1 ? "" : "fl-button--outline"}`} href={`?size=${plan.id}&feeling=daydream#join`}>Pick this bunch <span aria-hidden="true">↗</span></a>
    </article></Reveal>)}</div><Reveal><p className="fl-plan-foot">Delivery included <Flower /> Pause or skip any time <Flower /> No long goodbyes</p></Reveal>
  </div></section>;
}
]]>
    </file>
    <file path="src/app/(flori)/flori/sections/Promise.tsx">
<![CDATA[import { Flower } from "../brand/Flower";
import { Reveal } from "../motion/Reveal";
export function Promise() {
  return <section className="fl-promise fl-scallop" aria-label="The Flori promise"><Reveal className="fl-promise-inner"><span>Seasonal by nature</span><Flower /><span>Thoughtfully gathered</span><Flower /><span>A happier little home</span><Flower /><span>Always a lovely surprise</span></Reveal></section>;
}
]]>
    </file>
    <file path="src/app/(flori)/flori/sections/Story.tsx">
<![CDATA[import { BotanicalArt } from "../bouquet/BotanicalArt";
import { Flower } from "../brand/Flower";
import { Reveal } from "../motion/Reveal";
export function Story() {
  return <section id="club" className="fl-section fl-story" aria-labelledby="fl-story-title">
    <Reveal variant="wipe" className="fl-story-art"><span className="fl-script">Life’s little things<br />are the big things.</span><BotanicalArt feeling="sunbeam" scene="table" title="An everyday flower gathering on a sunny table" /><span className="fl-story-art-label">A Tuesday well spent.</span></Reveal>
    <div className="fl-story-copy"><Reveal variant="mask"><p className="fl-eyebrow">Welcome to our little club</p><h2 id="fl-story-title">Not for a birthday.<br />Not for an apology.<br /><em>Just for living.</em></h2></Reveal><Reveal><p>We started Flori with a small thought: why do flowers have to wait for a big occasion?</p><p>So we made a little club. We find what’s growing beautifully, gather it with care, and send a little of the outside to your inside. A different bunch, every time.</p><p>For the table you eat at. The friend you miss. The very ordinary, very lovely life you’re making.</p><a className="fl-text-link" href="#plans">A little something to look forward to <span aria-hidden="true">↗</span></a></Reveal><Reveal variant="draw"><div className="fl-story-signature"><Flower /><span className="fl-script">With a little love,<br />the Flori folk</span></div></Reveal></div>
  </section>;
}
]]>
    </file>
  </files>
</template>
