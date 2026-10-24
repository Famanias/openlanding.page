<template slug="kazeko" name="Studio Kazeko">
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
    <file path="src/app/(kazeko)/layout.tsx">
<![CDATA[import type { Metadata } from "next";
import { DM_Sans, IBM_Plex_Mono, Shippori_Mincho } from "next/font/google";
import "./kazeko/kazeko.css";

const display = Shippori_Mincho({ weight: "400", preload: false, variable: "--font-kazeko-mincho" });
const body = DM_Sans({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-kazeko-dm" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: "400", variable: "--font-kazeko-plex" });

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "Studio Kazeko — A little wonder. A world of feeling.",
  description: "An independent animation studio for hand-drawn stories, imagined worlds, and the little things that move us.",
};

export default function KazekoLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
    <body className="kz-body">{children}<noscript><style>{`[data-kz-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}.kz-js-only,.kz-form{display:none!important}.kz-process{min-height:0!important}.kz-process-sticky{position:static!important}`}</style></noscript></body>
  </html>;
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/assets.tsx">
<![CDATA[import type { ReactNode } from "react";
import { ASSETS } from "./assets.generated";
export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp") {
  return key in ASSETS ? `/templates/kazeko/${key}-${width}.${format}` : null;
}
export function Picture({ assetKey, alt, children, className = "" }: { assetKey: string; alt: string; children: ReactNode; className?: string }) {
  const src = assetSrc(assetKey, 800);
  if (!src) return <div className={`kz-picture kz-placeholder ${className}`} data-asset={assetKey}>{children}<span className="kz-art-label">Original concept illustration</span></div>;
  const { w, h } = ASSETS[assetKey];
  return <picture className={`kz-picture ${className}`}><source type="image/avif" srcSet={`${assetSrc(assetKey, 800, "avif")} 800w, ${assetSrc(assetKey, 1600, "avif")} 1600w`} sizes="(min-width: 900px) 45vw, 100vw" />
    <img src={src} srcSet={`${src} 800w, ${assetSrc(assetKey, 1600)} 1600w`} sizes="(min-width: 900px) 45vw, 100vw" width={w} height={h} loading="lazy" decoding="async" alt={alt} /></picture>;
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#F8F5E9"/><path d="m7 28 22 4L48 11l-8 23 17-7-12 13-16-3-12 12 4-16Z" fill="#243C35"/></svg>
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/kazeko.css">
<![CDATA[@import "tailwindcss" source(none);

@theme {
  --color-paper: #F8F5E9;
  --color-ink: #243C35;
  --color-meadow: #64856A;
  --color-leaf: #C7D6A7;
  --color-sky: #D6E7EB;
  --color-butter: #EED998;
  --color-clay: #B96C51;
  --color-muted: #596C63;
  --font-display: var(--font-kazeko-mincho), Georgia, serif;
  --font-body: var(--font-kazeko-dm), Arial, sans-serif;
  --font-mono: var(--font-kazeko-plex), monospace;
  --ease-out: cubic-bezier(.23,1,.32,1);
  --ease-out-expo: cubic-bezier(.16,1,.3,1);
  --ease-in-out: cubic-bezier(.77,0,.175,1);
  --ease-spring: linear(0,.35 8%,.82 20%,1.06 30%,1.02 42%,.99 58%,1);
  --dur-instant: 90ms;
  --dur-fast: 180ms;
  --dur-base: 420ms;
  --dur-slow: 800ms;
  --dur-hero: 1200ms;
  --reveal-shift: 24px;
  --stagger: 70ms;
}

* { box-sizing: border-box; }
html { scroll-padding-top: 90px; }
.kz-body { margin: 0; background: var(--color-paper); color: var(--color-ink); font-family: var(--font-body); font-size: 16px; line-height: 1.65; -webkit-font-smoothing: antialiased; }
.kz-site { overflow: clip; --page-progress: 0; }
.kz-site[data-ready=true] .kz-no-js { display: none; }
.kz-site ::selection { background: var(--color-butter); color: var(--color-ink); }
.kz-site button, .kz-site input, .kz-site textarea { font: inherit; }
.kz-site button, .kz-site a { -webkit-tap-highlight-color: transparent; }
.kz-site button { cursor: pointer; }
.kz-site button:disabled { cursor: default; opacity: .6; }
.kz-site a { color: inherit; text-decoration: none; }
.kz-site button { color: inherit; }
.kz-site h1, .kz-site h2, .kz-site h3, .kz-site p { margin: 0; }
.kz-site h1, .kz-site h2, .kz-site h3 { font-family: var(--font-display); font-weight: 400; }
.kz-site h2 { font-size: clamp(36px,4.4vw,62px); letter-spacing: -.055em; line-height: 1.3; }
.kz-site h2 em { font-style: normal; color: var(--color-muted); }
.kz-site :focus-visible { outline: 2px solid var(--color-ink); outline-offset: 6px; border-radius: 3px; }
.kz-site .kz-contact :focus-visible { outline-color: var(--color-butter); }
.kz-container { width: min(100% - clamp(44px,10vw,160px),1280px); margin-inline: auto; }
.kz-section { padding-block: clamp(76px,9vw,132px); }
.kz-mono, .kz-eyebrow { font-family: var(--font-mono); font-size: 10px; line-height: 1.6; letter-spacing: .07em; }
.kz-eyebrow { text-transform: uppercase; display: inline-flex; align-items: center; gap: 12px; }
.kz-progress { position: fixed; z-index: 100; top: 0; left: 0; height: 3px; width: 100%; background: var(--color-meadow); transform: scaleX(var(--page-progress)); transform-origin: left; }
.kz-skip { position: fixed; top: -100px; left: 20px; background: var(--color-paper); padding: 12px; z-index: 200; }
.kz-skip:focus { top: 12px; }
.kz-header { height: 94px; padding-inline: clamp(22px,4vw,64px); display: flex; align-items: center; justify-content: space-between; gap: 28px; background: var(--color-paper); position: sticky; top: 0; z-index: 50; transition: background var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out); }
.kz-header[data-scrolled=true] { background: color-mix(in srgb,var(--color-paper) 96%,transparent); border-bottom: 1px solid color-mix(in srgb,var(--color-ink) 12%,transparent); }
.kz-header[data-scrolled=true] .kz-logo { transform: scale(.94); transform-origin: left; }
.kz-logo { display: inline-flex; align-items: center; gap: 8px; min-width: 154px; transition: transform var(--dur-base) var(--ease-out); }
.kz-logo > svg { width: 45px; height: 43px; }
.kz-logo > span { display: flex; flex-direction: column; }
.kz-logo-small { font-family: var(--font-mono); font-size: 8px; letter-spacing: .21em; line-height: 1.4; margin-left: 3px; }
.kz-logo-name { font-family: var(--font-display); font-size: 32px; line-height: 1; letter-spacing: -.07em; }
.kz-logo-dot { color: var(--color-clay); }
.kz-nav { display: flex; align-items: center; position: relative; isolation: isolate; }
.kz-nav > a { width: 112px; text-align: center; font-size: 12px; padding: 10px 0; }
.kz-nav-indicator { position: absolute; width: 64px; height: 1px; background: var(--color-ink); bottom: 4px; left: 24px; transform: translateX(calc(var(--nav-index) * 112px)); opacity: 0; transition: transform var(--dur-base) var(--ease-out), opacity var(--dur-fast); }
.kz-nav[data-selected=true] .kz-nav-indicator { opacity: .7; }
.kz-header-cta { display: inline-flex; align-items: center; gap: 20px; font-size: 12px; padding-block: 9px; border-bottom: 1px solid color-mix(in srgb,var(--color-ink) 45%,transparent); }
.kz-header-cta svg { width: 16px; transition: transform var(--dur-base) var(--ease-out); }
.kz-menu-toggle { display: none; border: 0; background: transparent; width: 44px; height: 44px; padding: 10px; }
.kz-menu-toggle span { display: block; width: 24px; height: 1px; background: var(--color-ink); margin-block: 7px; }
.kz-hero { height: min(850px,calc(100svh - 94px)); min-height: 680px; background: var(--color-sky); position: relative; isolation: isolate; --hero-progress: 0; }
.kz-hero-copy { text-align: center; position: relative; z-index: 3; padding: clamp(36px,5vh,64px) 24px 0; }
.kz-hero-eyebrow { font-size: 9px; letter-spacing: .075em; }
.kz-star { font-size: 20px; line-height: 1; }
.kz-hero-eyebrow [lang=ja] { margin-left: 8px; }
.kz-hero h1 { font-size: clamp(48px,6.25vw,88px); letter-spacing: -.065em; line-height: 1.18; margin-top: 17px; }
.kz-line-mask { display: block; overflow: clip; padding-bottom: .09em; margin-bottom: -.09em; }
.kz-line-mask > span { display: block; }
.kz-hero-copy > p { font-size: 14px; margin-top: 20px; color: var(--color-ink); }
.kz-mobile-break { display: none; }
.kz-hero-copy .kz-magnetic { margin-top: 25px; }
.kz-magnetic { display: inline-flex; transform: translate(var(--mx,0px),var(--my,0px)); transition: transform var(--dur-base) var(--ease-spring); }
.kz-button { position: relative; isolation: isolate; display: inline-flex; align-items: center; justify-content: center; gap: 28px; padding: 15px 23px; min-height: 51px; font-size: 12px; line-height: 1.5; font-weight: 500; color: var(--color-paper)!important; background: var(--color-ink); border: 1px solid var(--color-ink); border-radius: 100px; overflow: hidden; transition: transform var(--dur-fast) var(--ease-spring); }
.kz-button::before { content: ""; position: absolute; z-index: -1; inset: 0; background: var(--color-meadow); transform: translateY(105%); transition: transform var(--dur-base) var(--ease-out); }
.kz-button svg { flex-shrink: 0; width: 17px; transition: transform var(--dur-base) var(--ease-out); }
.kz-hero-landscape { position: absolute; z-index: 0; inset: auto 0 12px; height: 72%; transform: translateY(calc(var(--hero-progress) * 24px)); }
.kz-landscape { width: 100%; height: 100%; display: block; }
.kz-hero-landscape > .kz-landscape { overflow: visible; }
.kz-hero-side { position: absolute; z-index: 2; top: 35%; right: 25px; writing-mode: vertical-rl; font-size: 8px; }
.kz-hero-caption { position: absolute; z-index: 4; bottom: -1px; left: 0; width: 100%; padding: 29px clamp(22px,4vw,64px) 24px; display: flex; justify-content: space-between; align-items: center; gap: 20px; background: var(--color-paper); clip-path: polygon(0 14%,4% 13%,10% 20%,18% 9%,29% 15%,38% 4%,48% 15%,58% 7%,69% 12%,79% 5%,89% 15%,100% 10%,100% 100%,0 100%); font-size: 10px; }
.kz-hero-caption > span:first-child { display: flex; align-items: center; gap: 8px; }
.kz-caption-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--color-meadow); }
.kz-hero-caption > a { display: flex; align-items: center; gap: 24px; }
.kz-section-top { border-top: 1px solid color-mix(in srgb,var(--color-ink) 22%,transparent); padding-top: 22px; display: flex; justify-content: space-between; gap: 24px; }
.kz-section-heading { display: flex; justify-content: space-between; align-items: end; gap: 40px; margin-top: 42px; margin-bottom: 52px; }
.kz-section-heading p { font-size: 14px; color: var(--color-muted); padding-bottom: 9px; }
.kz-film-grid { display: grid; grid-template-columns: 1.15fr 1fr; gap: 45px 34px; align-items: start; }
.kz-film-featured { grid-row: span 2; }
.kz-film-open { display: block; text-align: left; padding: 0; background: none; border: 0; width: 100%; }
.kz-film-art { position: relative; overflow: hidden; border-radius: 6px; aspect-ratio: 1.8; background: var(--color-sky); }
.kz-film-featured .kz-film-art { aspect-ratio: .88; }
.kz-picture { display: block; width: 100%; height: 100%; position: relative; overflow: hidden; }
.kz-picture > img, .kz-picture > svg { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform var(--dur-slow) var(--ease-out); }
.kz-film-featured .kz-landscape { width: 175%; max-width: none; margin-left: -53%; }
.kz-film-02 .kz-landscape { width: 145%; max-width: none; margin-left: -23%; }
.kz-film-03 .kz-landscape { width: 130%; max-width: none; margin-left: -15%; }
.kz-art-label { position: absolute; bottom: 8px; left: 13px; font-family: var(--font-mono); font-size: 7px; background: color-mix(in srgb,var(--color-paper) 85%,transparent); color: var(--color-ink); padding: 2px 5px; border-radius: 2px; }
.kz-film-number, .kz-film-duration { position: absolute; top: 17px; background: color-mix(in srgb,var(--color-paper) 85%,transparent); color: var(--color-ink); padding: 3px 8px; border-radius: 20px; font-size: 8px; }
.kz-film-number { left: 17px; }
.kz-film-duration { right: 17px; }
.kz-film-explore { position: absolute; display: flex; align-items: center; gap: 12px; bottom: 17px; right: 17px; background: var(--color-paper); padding: 10px 16px; border-radius: 30px; font-size: 10px; transform: translateY(65px); transition: transform var(--dur-base) var(--ease-out); }
.kz-film-meta { display: flex; justify-content: space-between; text-transform: uppercase; font-size: 8px; margin-top: 19px; color: var(--color-muted); }
.kz-film-title { display: flex; align-items: center; justify-content: space-between; gap: 15px; font-family: var(--font-display); font-size: clamp(22px,2.3vw,31px); line-height: 1.5; letter-spacing: -.04em; margin-top: 5px; }
.kz-film-title svg { width: 16px; }
.kz-film-japanese { display: block; font-size: 10px; color: var(--color-muted); margin-top: 5px; letter-spacing: .12em; }
.kz-film-card { transition: transform var(--dur-base) var(--ease-out), opacity var(--dur-base) var(--ease-out); }
.kz-films-foot { border-top: 1px solid color-mix(in srgb,var(--color-ink) 18%,transparent); margin-top: 46px; padding-top: 20px; display: flex; justify-content: space-between; gap: 20px; }
.kz-films-foot p { font-family: var(--font-display); font-size: 14px; }
.kz-process { background: color-mix(in srgb,var(--color-leaf) 22%,var(--color-paper)); position: relative; min-height: 190vh; }
.kz-process-sticky { position: sticky; top: 94px; padding-block: 26px 24px; }
.kz-process-heading { display: flex; align-items: end; justify-content: space-between; gap: 30px; margin-bottom: 30px; }
.kz-process-heading h2 { font-size: clamp(32px,3vw,42px); margin-top: 12px; }
.kz-process-heading p { font-size: 13px; color: var(--color-muted); }
.kz-scene-player { --scene-progress: 1; }
.kz-process-art { position: relative; height: clamp(210px,34vh,340px); overflow: hidden; border: 1px solid color-mix(in srgb,var(--color-ink) 25%,transparent); border-radius: 5px; }
.kz-pencil-layer, .kz-colour-layer { position: absolute; inset: 0; }
.kz-colour-layer { clip-path: inset(0 calc((1 - var(--scene-progress)) * 100%) 0 0); }
.kz-scene-paint [fill] { transition: fill var(--dur-base) var(--ease-out); }
.kz-landscape[data-sketch=true] [fill] { fill: var(--color-paper); }
.kz-landscape[data-sketch=true] .kz-scene-paint { stroke: var(--color-muted); }
.kz-landscape[data-sketch=true] .kz-clouds { opacity: .45; }
.kz-wipe-marker { position: absolute; top: 0; bottom: 0; left: 0; width: 100%; pointer-events: none; transform: translateX(calc(var(--scene-progress) * 100%)); border-left: 1px solid var(--color-paper); }
.kz-wipe-marker > span { position: absolute; top: 50%; left: -14px; width: 28px; height: 28px; border-radius: 50%; background: var(--color-paper); display: grid; place-items: center; font-size: 18px; }
.kz-scene-corner { position: absolute; bottom: 16px; left: 18px; padding: 4px 8px; background: color-mix(in srgb,var(--color-paper) 88%,transparent); font-size: 8px; }
.kz-scene-corner-right { left: auto; right: 18px; font-size: 10px; }
.kz-phases { display: flex; border-bottom: 1px solid color-mix(in srgb,var(--color-ink) 20%,transparent); margin-top: 7px; }
.kz-phases button { flex: 1; display: flex; align-items: center; gap: 12px; padding: 14px 0; border: 0; background: transparent; font-family: var(--font-display); font-size: 17px; position: relative; }
.kz-phases button::after { position: absolute; content: ""; bottom: -1px; left: 0; right: 20%; height: 2px; background: var(--color-ink); transform: scaleX(0); transform-origin: left; transition: transform var(--dur-base) var(--ease-out); }
.kz-phases button[aria-pressed=true]::after { transform: scaleX(1); }
.kz-phases button > span:last-child { margin-left: auto; margin-right: 22%; font-size: 15px; }
.kz-range-label { display: flex; justify-content: space-between; gap: 14px; font-size: 10px; margin-top: 18px; }
.kz-range-label > span { font-family: var(--font-mono); font-size: 8px; }
.kz-process-controls input[type=range] { display: block; accent-color: var(--color-ink); width: 100%; height: 25px; cursor: ew-resize; margin: 3px 0 0; background: transparent; }
.kz-phase-caption { display: flex; gap: 35px; align-items: baseline; margin-top: 15px; min-height: 30px; }
.kz-phase-caption .kz-mono { font-size: 9px; white-space: nowrap; }
.kz-phase-caption p { font-size: 11px; color: var(--color-muted); }
.kz-resume { font-size: 10px!important; background: none; border: none; padding: 4px 0; text-decoration: underline; }
.kz-studio { position: relative; background: var(--color-paper); }
.kz-studio-grid { display: grid; grid-template-columns: .88fr 1.12fr; gap: clamp(40px,8vw,120px); align-items: center; }
.kz-studio-image { height: 560px; transform: rotate(-2deg); background: var(--color-leaf); position: relative; border: 10px solid color-mix(in srgb,var(--color-paper) 85%,var(--color-butter)); border-bottom-width: 48px; }
.kz-studio-image .kz-picture { overflow: hidden; }
.kz-studio-image-caption { position: absolute; bottom: -33px; left: 12px; font-size: 8px; }
.kz-studio-image .kz-art-label { display: none; }
.kz-studio-copy { position: relative; }
.kz-studio-copy h2 { margin-block: 25px 26px; font-size: clamp(36px,3.65vw,52px); }
.kz-studio-copy p { font-size: 14px; color: var(--color-muted); max-width: 46ch; }
.kz-studio-copy p + p { margin-top: 18px; }
.kz-studio-services { border-top: 1px solid color-mix(in srgb,var(--color-ink) 20%,transparent); border-bottom: 1px solid color-mix(in srgb,var(--color-ink) 20%,transparent); display: grid; grid-template-columns: 1fr 1.6fr; gap: 20px; padding-block: 20px; margin-block: 27px; }
.kz-studio-services > span { font-family: var(--font-mono); font-size: 9px; text-transform: uppercase; padding-top: 3px; }
.kz-studio-services p { font-size: 12px; }
.kz-text-link { display: inline-flex; align-items: center; gap: 20px; background: none; border: none; border-bottom: 1px solid currentColor; font-size: 12px!important; padding: 0 0 7px; position: relative; transition: transform var(--dur-base) var(--ease-out); }
.kz-text-link svg { width: 14px; }
.kz-studio-bird { width: 72px; height: 60px; position: absolute; right: 0; bottom: -40px; transform: rotate(-12deg); opacity: .4; }
.kz-contact { background: var(--color-ink); color: var(--color-paper); position: relative; padding-bottom: 72px; }
.kz-contact::before { content: ""; position: absolute; top: -20px; left: 0; right: 0; height: 22px; background: var(--color-ink); clip-path: polygon(0 75%,10% 70%,22% 90%,35% 50%,46% 76%,57% 56%,69% 82%,82% 70%,91% 95%,100% 50%,100% 100%,0 100%); }
.kz-contact-intro { display: flex; justify-content: space-between; align-items: end; gap: 40px; }
.kz-contact-intro h2 { margin-top: 24px; font-size: clamp(46px,5vw,72px); }
.kz-contact-intro h2 em { color: var(--color-leaf); }
.kz-contact-intro p { font-size: 14px; color: color-mix(in srgb,var(--color-paper) 82%,var(--color-ink)); }
.kz-contact-japanese { display: block; margin-top: 23px; font-size: 16px; letter-spacing: .15em; color: var(--color-leaf); }
.kz-form-shell { margin-top: 56px; border-top: 1px solid color-mix(in srgb,var(--color-paper) 30%,transparent); padding-top: 32px; min-height: 315px; }
.kz-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 42px; }
.kz-field { position: relative; }
.kz-field input, .kz-field textarea { width: 100%; border: none; border-bottom: 1px solid color-mix(in srgb,var(--color-paper) 40%,transparent); background: transparent; color: var(--color-paper); border-radius: 0; padding: 25px 0 13px; outline-offset: 5px; font-size: 16px; resize: vertical; transition: border-color var(--dur-fast); }
.kz-field > label { position: absolute; left: 0; top: 24px; font-size: 13px; pointer-events: none; color: color-mix(in srgb,var(--color-paper) 85%,var(--color-ink)); transform-origin: top left; transition: transform var(--dur-base) var(--ease-out), color var(--dur-fast); }
.kz-field input:focus + label, .kz-field input:not(:placeholder-shown) + label, .kz-field textarea:focus + label, .kz-field textarea:not(:placeholder-shown) + label { transform: translateY(-21px) scale(.8); color: var(--color-butter); }
.kz-field-story { margin-top: 30px; }
.kz-field textarea { min-height: 110px; }
.kz-field-error { display: block; margin-top: 7px; color: var(--color-butter); font-size: 11px; }
.kz-field[data-invalid=true] input, .kz-field[data-invalid=true] textarea { border-color: var(--color-butter); }
.kz-form-bottom { display: flex; justify-content: space-between; align-items: center; gap: 24px; margin-top: 30px; }
.kz-form-bottom > p { font-size: 12px; color: color-mix(in srgb,var(--color-paper) 80%,var(--color-ink)); }
.kz-button-light { background: var(--color-paper); color: var(--color-ink)!important; border-color: var(--color-paper); }
.kz-button-light::before { background: var(--color-butter); }
.kz-form-note { font-size: 10px; color: color-mix(in srgb,var(--color-paper) 74%,var(--color-ink)); margin-top: 22px!important; }
.kz-form-success { position: relative; display: flex; align-items: start; flex-direction: column; gap: 20px; }
.kz-form-success > svg { position: absolute; width: 100px; height: 100px; right: 15%; top: 35px; color: var(--color-leaf); }
.kz-form-success h3 { font-size: 40px; line-height: 1.2; }
.kz-form-success > p { max-width: 48ch; font-size: 14px; }
.kz-form-success .kz-text-link { margin-top: 8px; }
.kz-footer { background: var(--color-paper); padding-block: 42px 26px; }
.kz-footer-top { display: flex; justify-content: space-between; align-items: center; gap: 24px; padding-bottom: 36px; }
.kz-footer-top p { font-family: var(--font-display); font-size: 16px; line-height: 1.6; margin-right: auto; margin-left: 8%; }
.kz-footer-bottom { border-top: 1px solid color-mix(in srgb,var(--color-ink) 20%,transparent); padding-top: 20px; display: flex; justify-content: space-between; gap: 20px; font-size: 8px; color: var(--color-muted); }
.kz-motion-toggle { position: fixed; z-index: 45; bottom: 18px; right: 18px; border: 1px solid color-mix(in srgb,var(--color-ink) 25%,transparent); border-radius: 30px; background: var(--color-paper); color: var(--color-ink); display: flex; align-items: center; gap: 7px; font-family: var(--font-mono)!important; font-size: 8px!important; padding: 9px 12px; min-height: 34px; }
.kz-motion-toggle > span:first-child { font-size: 12px; }
.kz-site dialog { padding: 0; background: var(--color-paper); color: var(--color-ink); border: 0; max-height: 90svh; overscroll-behavior: contain; }
.kz-site dialog::backdrop { background: color-mix(in srgb,var(--color-ink) 70%,transparent); }
.kz-film-dialog { width: min(780px,90vw); border-radius: 8px; }
.kz-dialog-art { height: 270px; overflow: hidden; }
.kz-dialog-art > .kz-picture { height: 100%; }
.kz-dialog-copy { padding: 32px; }
.kz-dialog-copy h2 { font-size: 36px; margin-block: 14px; }
.kz-dialog-copy p { font-size: 14px; max-width: 62ch; }
.kz-dialog-copy .kz-mono { margin-top: 18px; font-size: 10px; }
.kz-dialog-copy .kz-sample-note { font-size: 11px; color: var(--color-muted); margin-top: 20px; }
.kz-dialog-copy .kz-button { margin-top: 24px; }
.kz-close { position: absolute; z-index: 4; top: 14px; right: 14px; width: 42px; height: 42px; border-radius: 50%; border: 1px solid color-mix(in srgb,var(--color-ink) 20%,transparent); background: var(--color-paper); font-size: 25px!important; display: grid; place-items: center; }
.kz-menu { width: 100%; max-width: none; height: 100svh; max-height: 100svh!important; margin: 0; padding: 90px 30px 35px!important; }
.kz-menu > nav { display: flex; flex-direction: column; margin-top: 60px; }
.kz-menu nav a { display: flex; align-items: center; gap: 15px; border-bottom: 1px solid color-mix(in srgb,var(--color-ink) 20%,transparent); padding-block: 25px; font-family: var(--font-display); font-size: 30px; }
.kz-menu nav a svg { margin-left: auto; }

@media (hover: hover) and (pointer: fine) {
  .kz-button:hover::before, .kz-button:focus-visible::before { transform: translateY(0); }
  .kz-button:hover svg { transform: translateX(3px); }
  .kz-header-cta:hover svg { transform: translate(3px,-3px); }
  .kz-text-link:hover { transform: translateX(3px); }
  .kz-film-card:hover { transform: translateY(-6px); }
  .kz-film-open:hover .kz-picture > svg, .kz-film-open:hover .kz-picture > img { transform: scale(1.045); }
  .kz-film-open:hover .kz-film-explore, .kz-film-open:focus-visible .kz-film-explore { transform: translateY(0); }
  .kz-film-grid:has(.kz-film-card:hover) .kz-film-card:not(:hover) { opacity: .7; }
  .kz-phases button:hover::after { transform: scaleX(.8); }
  .kz-nav > a:hover { color: var(--color-muted); }
}
.kz-button:active, .kz-film-open:active, .kz-header-cta:active, .kz-phases button:active, .kz-close:active, .kz-menu-toggle:active { transform: scale(.97); }
.kz-film-open:focus-visible .kz-film-explore { transform: translateY(0); }

@media (prefers-reduced-motion: no-preference) {
  .kz-header { animation: kz-drop var(--dur-slow) var(--ease-out) both 150ms; }
  .kz-hero-eyebrow { animation: kz-rise var(--dur-slow) var(--ease-out) both 150ms; }
  .kz-line-mask > span { animation: kz-mask var(--dur-hero) var(--ease-out-expo) both; }
  .kz-hero-copy > p { animation: kz-rise var(--dur-slow) var(--ease-out) both 550ms; }
  .kz-hero-copy > .kz-magnetic { animation: kz-rise var(--dur-slow) var(--ease-out) both 650ms; }
  .kz-hero-landscape > svg { animation: kz-scene-settle var(--dur-hero) var(--ease-out) both; }
  .kz-hero-caption { animation: kz-rise var(--dur-slow) var(--ease-out) both 800ms; }
  [data-kz-reveal] { transition: opacity var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out), clip-path var(--dur-slow) var(--ease-in-out); transition-delay: calc(var(--i,0) * var(--stagger)); }
  .kz-site[data-ready=true] [data-kz-reveal=rise]:not([data-in=true]) { opacity: 0; transform: translateY(var(--reveal-shift)); }
  .kz-site[data-ready=true] [data-kz-reveal=mask]:not([data-in=true]) { clip-path: inset(0 0 100% 0); transform: translateY(16px); }
  .kz-site[data-ready=true] [data-kz-reveal=wipe]:not([data-in=true]) { clip-path: inset(0 100% 0 0); }
  .kz-site[data-ready=true] [data-kz-reveal=scale]:not([data-in=true]) { opacity: 0; transform: translateY(28px) scale(.97); }
  .kz-site[data-ready=true] [data-kz-reveal=draw]:not([data-in=true]) { transform: scaleX(0); transform-origin: left; }
  [data-kz-ambient] .kz-clouds { animation: kz-cloud-drift 16s ease-in-out infinite alternate; }
  [data-kz-ambient] .kz-grasses { animation: kz-sway 8s ease-in-out infinite alternate; transform-origin: 50% 100%; }
  [data-kz-ambient] .kz-paper-bird { animation: kz-bird-drift 12s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: center; }
  .kz-site[data-paused=true] .kz-clouds, .kz-site[data-paused=true] .kz-grasses, .kz-site[data-paused=true] .kz-paper-bird,
  [data-kz-ambient]:not([data-active=true]) .kz-clouds, [data-kz-ambient]:not([data-active=true]) .kz-grasses, [data-kz-ambient]:not([data-active=true]) .kz-paper-bird { animation-play-state: paused; }
  .kz-pencil-layer .kz-clouds, .kz-pencil-layer .kz-grasses, .kz-pencil-layer .kz-paper-bird { animation: none; }
  .kz-field[data-invalid=true] { animation: kz-shake var(--dur-base) var(--ease-out); }
  .kz-form-success { animation: kz-rise var(--dur-slow) var(--ease-out) both; }
  .kz-form-success > svg { animation: kz-flight var(--dur-hero) var(--ease-out-expo) both; }
  .kz-site dialog[open] { animation: kz-dialog var(--dur-base) var(--ease-out-expo) both; }
  .kz-field-error { animation: kz-rise var(--dur-base) var(--ease-out); }
}
@keyframes kz-drop { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes kz-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
@keyframes kz-mask { from { transform: translateY(115%); } to { transform: translateY(0); } }
@keyframes kz-scene-settle { from { opacity: .3; transform: scale(1.025) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
@keyframes kz-cloud-drift { from { transform: translateX(-6px); } to { transform: translateX(14px); } }
@keyframes kz-sway { from { transform: rotate(-.6deg); } to { transform: rotate(.6deg); } }
@keyframes kz-bird-drift { from { transform: translate(759px,198px) rotate(-2deg); } to { transform: translate(783px,186px) rotate(3deg); } }
@keyframes kz-shake { 20%,60% { transform: translateX(-4px); } 40%,80% { transform: translateX(4px); } }
@keyframes kz-flight { from { opacity: 0; transform: translate(-100px,40px) rotate(-15deg); } to { opacity: 1; transform: translate(0,0) rotate(0); } }
@keyframes kz-dialog { from { opacity: 0; transform: translateY(16px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }

@media (max-width: 1100px) {
  .kz-header { gap: 16px; }
  .kz-nav > a { width: 95px; }
  .kz-nav-indicator { transform: translateX(calc(var(--nav-index) * 95px)); left: 15px; }
  .kz-header-cta { gap: 12px; }
  .kz-studio-image { height: 470px; }
  .kz-hero-copy { padding-top: 40px; }
  .kz-hero { min-height: 680px; }
}
@media (max-width: 899px), (pointer: coarse) {
  .kz-process { min-height: 0; }
  .kz-process-sticky { position: relative; top: auto; padding-block: 76px; }
  .kz-hero-landscape { transform: none; }
}
@media (max-height: 800px) and (min-width: 900px) {
  .kz-process-sticky { top: 94px; padding-block: 15px; }
  .kz-process-heading h2 { font-size: 34px; }
  .kz-process-heading { margin-bottom: 20px; }
  .kz-process-art { height: 250px; }
  .kz-phase-caption { margin-top: 6px; }
}
@media (max-width: 720px) {
  .kz-header { height: 78px; gap: 10px; }
  .kz-logo { min-width: 130px; }
  .kz-logo > svg { width: 35px; }
  .kz-logo-name { font-size: 28px; }
  .kz-nav { display: none; }
  .kz-header-cta { margin-left: auto; font-size: 10px; gap: 6px; }
  .kz-header-cta svg { width: 14px; }
  .kz-menu-toggle { display: block; }
  .kz-hero { height: calc(100svh - 78px); min-height: 650px; max-height: 820px; }
  .kz-hero-copy { padding-top: 45px; padding-inline: 15px; }
  .kz-hero-eyebrow { font-size: 7px; gap: 7px; }
  .kz-hero-eyebrow [lang=ja] { margin-left: 0; }
  .kz-star { font-size: 16px; }
  .kz-hero h1 { font-size: clamp(39px,8.9vw,61px); margin-top: 20px; line-height: 1.3; letter-spacing: -.07em; }
  .kz-hero-copy > p { font-size: 12px; margin-top: 17px; }
  .kz-mobile-break { display: block; }
  .kz-hero-copy .kz-magnetic { margin-top: 21px; }
  .kz-button { min-height: 49px; font-size: 11px; padding: 14px 21px; gap: 24px; }
  .kz-hero-landscape { height: 68%; bottom: 15px; overflow: hidden; }
  .kz-hero-landscape > .kz-landscape { width: 240%; max-width: none; margin-left: -105%; }
  .kz-hero-side { display: none; }
  .kz-hero-caption { padding: 23px 22px 18px; font-size: 8px; }
  .kz-hero-caption > .kz-mono { display: none; }
  .kz-hero-caption > a { gap: 12px; padding-right: 42px; }
  .kz-section-top { padding-top: 18px; }
  .kz-section-top > .kz-mono { display: none; }
  .kz-eyebrow { font-size: 8px; }
  .kz-section-heading { flex-direction: column; align-items: start; gap: 25px; margin-block: 30px 35px; }
  .kz-section-heading p { font-size: 13px; }
  .kz-film-grid { grid-template-columns: 1fr; gap: 35px; }
  .kz-film-featured { grid-row: auto; }
  .kz-film-featured .kz-film-art { aspect-ratio: 1.2; }
  .kz-film-featured .kz-landscape { width: 160%; margin-left: -40%; }
  .kz-film-art { aspect-ratio: 1.4; }
  .kz-film-title { font-size: 27px; }
  .kz-film-explore { transform: translateY(0); padding: 8px 11px; right: 12px; bottom: 12px; font-size: 9px; }
  .kz-film-explore svg { width: 14px; }
  .kz-art-label { bottom: 12px; left: 10px; font-size: 6px; max-width: 115px; }
  .kz-films-foot { flex-direction: column; gap: 10px; margin-top: 35px; }
  .kz-films-foot > span { font-size: 8px; }
  .kz-process-heading { flex-direction: column; align-items: start; gap: 22px; margin-bottom: 25px; }
  .kz-process-heading h2 { font-size: 38px; }
  .kz-process-art { height: 260px; }
  .kz-process-art .kz-landscape { width: 200%; max-width: none; margin-left: -62%; }
  .kz-scene-corner { font-size: 6px; left: 8px; bottom: 10px; }
  .kz-scene-corner-right { display: none; }
  .kz-phases button { font-size: 15px; gap: 7px; }
  .kz-phases button .kz-mono { font-size: 8px; }
  .kz-phases button > span:last-child { margin-right: 12px; }
  .kz-range-label { font-size: 9px; }
  .kz-range-label > span { font-size: 7px; }
  .kz-phase-caption { flex-direction: column; gap: 5px; min-height: 64px; }
  .kz-phase-caption p { font-size: 12px; }
  .kz-studio-grid { grid-template-columns: 1fr; gap: 48px; }
  .kz-studio-image { height: 430px; margin-inline: 8px; }
  .kz-studio-copy h2 { font-size: 38px; }
  .kz-studio-copy p { font-size: 14px; }
  .kz-studio-services { grid-template-columns: 1fr 1.7fr; }
  .kz-studio-bird { width: 55px; bottom: -29px; }
  .kz-contact-intro { flex-direction: column; align-items: start; gap: 25px; }
  .kz-contact h2 { font-size: 53px; }
  .kz-contact-intro p { font-size: 13px; }
  .kz-form-shell { margin-top: 35px; padding-top: 15px; }
  .kz-form-row { grid-template-columns: 1fr; gap: 26px; }
  .kz-form-bottom { align-items: start; flex-direction: column; gap: 23px; }
  .kz-form-bottom .kz-button { width: 100%; justify-content: space-between; }
  .kz-form-note { line-height: 1.7; max-width: 34ch; }
  .kz-form-success > svg { width: 60px; right: 0; top: 30px; }
  .kz-form-success h3 { font-size: 34px; }
  .kz-footer-top { flex-wrap: wrap; align-items: start; gap: 25px; }
  .kz-footer-top > p { margin-left: auto; margin-right: 0; font-size: 14px; }
  .kz-footer-top .kz-text-link { font-size: 10px!important; }
  .kz-footer-bottom { flex-direction: column; gap: 10px; padding-bottom: 30px; font-size: 7px; }
  .kz-dialog-art { height: 200px; }
  .kz-dialog-copy { padding: 24px; }
  .kz-dialog-copy h2 { font-size: 30px; }
  .kz-dialog-copy .kz-button { gap: 12px; font-size: 10px; }
}
@media (prefers-reduced-motion: reduce) {
  .kz-site *, .kz-site *::before, .kz-site *::after { animation: none!important; transition-duration: 0s!important; scroll-behavior: auto!important; }
  .kz-hero-landscape, .kz-magnetic { transform: none!important; }
  .kz-process { min-height: 0; }
  .kz-process-sticky { position: static; }
  .kz-site [data-kz-reveal] { opacity: 1!important; transform: none!important; clip-path: none!important; }
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";
export const alt = "Studio Kazeko — a little wonder, a world of feeling";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ display: "flex", width: "100%", height: "100%", background: "#D6E7EB", color: "#243C35", padding: 70, flexDirection: "column", justifyContent: "space-between" }}>
    <div style={{ fontSize: 26, display: "flex", letterSpacing: 5 }}>STUDIO KAZEKO / INDEPENDENT ANIMATION</div>
    <div style={{ display: "flex", fontSize: 88, fontFamily: "serif", flexDirection: "column" }}><span>A little wonder.</span><span>A world of feeling.</span></div>
    <div style={{ display: "flex", fontSize: 24 }}>Hand-drawn stories. Quietly extraordinary worlds.</div>
  </div>, size);
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/page.tsx">
<![CDATA[import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Films } from "./sections/Films";
import { Process } from "./sections/Process";
import { Studio } from "./sections/Studio";
import { Contact } from "./sections/Contact";
import { Footer } from "./sections/Footer";
import { MotionDirector } from "./motion/MotionDirector";
import { SmoothScroll } from "./motion/SmoothScroll";
export default function KazekoPage() {
  return <div className="kz-site"><div className="kz-progress" aria-hidden="true" /><Header /><main id="main"><Hero /><Films /><Process /><Studio /><Contact /></main><Footer /><MotionDirector /><SmoothScroll /></div>;
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/brand/Arrow.tsx">
<![CDATA[export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d={diagonal ? "M5 15 15 5M5 5h10v10" : "M3 10h13m-5-5 5 5-5 5"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/brand/Logo.tsx">
<![CDATA[export function BirdMark({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 64 48" fill="none" aria-hidden="true">
    <path d="m5 22 25 4L48 5l-8 23 18-7-12 13-16-3-12 12 4-16Z" fill="currentColor" />
    <path d="m30 26 10 2M22 27l8 4" stroke="var(--color-paper)" strokeWidth="1.3" />
    <path d="M2 33h10M7 38h5" stroke="currentColor" strokeLinecap="round" />
  </svg>;
}

export function Logo() {
  return <a className="kz-logo" href="#home" aria-label="Studio Kazeko home"><BirdMark /><span><span className="kz-logo-small">STUDIO</span><span className="kz-logo-name">kazeko<span className="kz-logo-dot">.</span></span></span></a>;
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/data/films.ts">
<![CDATA[export type Film = { id: string; number: string; title: string; japanese: string; type: string; length: string; year: string; description: string; palette: string; variant: "village" | "river" | "flowers" };
export const FILMS: readonly Film[] = [
  { id: "the-last-light", number: "01", title: "The Last Light", japanese: "最後のひかり", type: "Original short", length: "04:32", year: "2026", description: "At the edge of a sleepy village, a child follows the last patch of sunlight home. A small story about the things we notice when we slow down.", palette: "Warm afternoon / countryside", variant: "village" },
  { id: "where-the-river-goes", number: "02", title: "Where the River Goes", japanese: "川のゆくえ", type: "Visual poem", length: "02:18", year: "2026", description: "A folded paper bird follows a river without knowing where it ends. An unhurried visual poem about curiosity, small detours, and finding your own way.", palette: "Summer blue / open fields", variant: "river" },
  { id: "a-pocketful-of-spring", number: "03", title: "A Pocketful of Spring", japanese: "ポケットの春", type: "Brand film concept", length: "01:06", year: "2025", description: "One little seed turns an ordinary windowsill into an unexpected garden. A botanical story about nurturing something new, one day at a time.", palette: "Butter yellow / botanical", variant: "flowers" },
];
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/forms/ProjectForm.tsx">
<![CDATA["use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { validateBrief, type Brief, type BriefErrors } from "./validation";
import { Arrow } from "../brand/Arrow";
import { BirdMark } from "../brand/Logo";
const empty: Brief = { name: "", email: "", story: "" };
export function ProjectForm() {
  const [brief, setBrief] = useState<Brief>(empty);
  const [errors, setErrors] = useState<BriefErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const success = useRef<HTMLDivElement>(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  useEffect(() => { if (status === "success") success.current?.focus(); }, [status]);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validateBrief(brief);
    setErrors(next);
    const first = (Object.keys(next) as (keyof Brief)[])[0];
    if (first) { document.getElementById(`kz-${first}`)?.focus(); return; }
    setStatus("loading");
    timer.current = setTimeout(() => setStatus("success"), 650);
  }
  function download() {
    const body = `STUDIO KAZEKO — PROJECT BRIEF\n\nName: ${brief.name.trim()}\nEmail: ${brief.email.trim()}\n\nThe story\n${brief.story.trim()}\n\nPrepared locally. Nothing was sent.`;
    const url = URL.createObjectURL(new Blob([body], { type: "text/plain;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "kazeko-project-brief.txt"; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return <div className="kz-form-shell" data-state={status}>
    {status === "success" ? <div className="kz-form-success" tabIndex={-1} ref={success} role="status"><BirdMark /><span className="kz-eyebrow">A FIRST PAGE, READY.</span><h3>Your story<br />has a beginning.</h3><p>Thanks, {brief.name.trim()}. Your brief is ready to keep. This demo prepares it on your device; nothing has been sent.</p><button className="kz-button kz-button-light" type="button" onClick={download}>Download your brief <Arrow /></button><button className="kz-text-link" type="button" onClick={() => { setStatus("idle"); setBrief(empty); setErrors({}); }}>Start another story</button></div> : <form className="kz-form" noValidate onSubmit={submit} aria-busy={status === "loading"}>
      <div className="kz-form-row">{([{ key: "name", label: "Your name", type: "text", complete: "name", max: 100 }, { key: "email", label: "Email address", type: "email", complete: "email", max: 254 }] as const).map(({ key, label, type, complete, max }) => <div className="kz-field" key={key} data-invalid={Boolean(errors[key])}><input id={`kz-${key}`} type={type} autoComplete={complete} maxLength={max} placeholder=" " value={brief[key]} required aria-invalid={Boolean(errors[key])} aria-describedby={errors[key] ? `kz-${key}-error` : undefined} onChange={(e) => { setBrief({ ...brief, [key]: e.target.value }); if (errors[key]) setErrors({ ...errors, [key]: undefined }); }} /><label htmlFor={`kz-${key}`}>{label}</label>{errors[key] && <span id={`kz-${key}-error`} className="kz-field-error">{errors[key]}</span>}</div>)}</div>
      <div className="kz-field kz-field-story" data-invalid={Boolean(errors.story)}><textarea id="kz-story" rows={3} placeholder=" " maxLength={2000} required value={brief.story} aria-invalid={Boolean(errors.story)} aria-describedby={errors.story ? "kz-story-error" : undefined} onChange={(e) => { setBrief({ ...brief, story: e.target.value }); if (errors.story) setErrors({ ...errors, story: undefined }); }} /><label htmlFor="kz-story">What’s the story you’d like to tell?</label>{errors.story && <span id="kz-story-error" className="kz-field-error">{errors.story}</span>}</div>
      <div className="kz-form-bottom"><p>A seed of an idea is plenty.<br />Let’s see where it goes.</p><button className="kz-button kz-button-light" type="submit" disabled={status === "loading"}><span>{status === "loading" ? "Gathering your thoughts…" : "Start a conversation"}</span><Arrow diagonal /></button></div>
      <p className="kz-form-note">Demo form — prepares a downloadable brief. Nothing is sent or stored.</p>
    </form>}
  </div>;
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/forms/validation.ts">
<![CDATA[export type Brief = { name: string; email: string; story: string };
export type BriefErrors = Partial<Record<keyof Brief, string>>;
export function validateBrief(brief: Brief): BriefErrors {
  const errors: BriefErrors = {};
  if (!brief.name.trim()) errors.name = "What should we call you?";
  else if (brief.name.length > 100) errors.name = "Keep your name under 100 characters.";
  if (brief.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(brief.email.trim())) errors.email = "Add a valid email address.";
  if (brief.story.trim().length < 15) errors.story = "Tell us a little about your idea (at least 15 characters).";
  else if (brief.story.length > 2000) errors.story = "Keep your idea under 2,000 characters.";
  return errors;
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/illustrations/Landscape.tsx">
<![CDATA[import { useId } from "react";

/** Original vector artwork. Matching line/colour geometry makes the process wipe exact. */
export function Landscape({ sketch = false, variant = "village", className = "" }: { sketch?: boolean; variant?: "village" | "river" | "flowers"; className?: string }) {
  const id = useId().replace(/:/g, "");
  return <svg className={`kz-landscape ${className}`} viewBox="0 0 1440 640" preserveAspectRatio="xMidYMid slice" fill="none" role="img" aria-label={sketch ? "Pencil drawing of a quiet Japanese countryside" : "Original illustration of rolling hills, wildflowers and a small countryside house"} data-sketch={sketch}>
    <defs>
      <pattern id={`${id}-field`} width="26" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(-13)"><path d="M0 23h26" stroke="var(--color-ink)" strokeOpacity=".10" strokeWidth="1" /></pattern>
      <pattern id={`${id}-grain`} width="37" height="43" patternUnits="userSpaceOnUse"><circle cx="4" cy="6" r=".7" fill="var(--color-ink)" opacity=".12" /><circle cx="22" cy="27" r=".7" fill="var(--color-ink)" opacity=".1" /><path d="m30 10 3 1M10 35l2 1" stroke="var(--color-paper)" strokeOpacity=".35" /></pattern>
      <g id={`${id}-tree`}><path d="M0 20v69m0-38-18-13m18 24 20-16" stroke="var(--color-ink)" strokeWidth="3" /><path d="M-34 30C-48 5-24-11-8-7 3-34 31-15 27 0 55 2 51 36 28 39 8 54-20 47-34 30Z" fill="var(--color-meadow)" /><path d="M-19 17q15 10 35-1" stroke="var(--color-ink)" strokeOpacity=".25" /></g>
      <g id={`${id}-flower`}><path d="M0 1q10 28 2 62m0-18q-16-20-18-8m20-6q10-16 18-12" stroke="var(--color-ink)" strokeWidth="2" /><path d="M-1 0C-23-24-26 9-8 8c-15 22 15 29 14 9 20 15 29-14 9-14C25-17-4-22-1 0" fill="var(--color-butter)" /><circle cx="3" cy="8" r="5" fill="var(--color-clay)" /></g>
    </defs>
    <g className="kz-scene-paint" stroke={sketch ? "var(--color-ink)" : "none"} strokeWidth={sketch ? 1.2 : undefined}>
      <path d="M0 0h1440v640H0Z" fill="var(--color-sky)" />
      <circle cx="1100" cy="119" r="49" fill="var(--color-butter)" />
      <g className="kz-clouds" fill="var(--color-paper)"><path d="M118 107c27-17 42-12 50-6 13-29 54-34 73-7 18-11 37-1 41 12 17-3 29 4 29 13H112c-8-4-6-10 6-12Z" /><path d="M899 68c21-10 31-4 37 2 11-21 35-25 51-4 14-4 27 3 27 11H894Z" /><path d="M1220 180c15-16 32-16 42-3 10-34 49-35 66-6 20-11 43 0 46 13h-161Z" /></g>
      <path d="M-30 312C77 271 145 296 251 239S410 201 518 242s137-88 255-60 131 83 238 48 156-46 255-10 123 26 210 4v416H-30Z" fill="color-mix(in srgb,var(--color-meadow) 36%,var(--color-sky))" />
      <path d="M-30 374c180-80 251-36 364-91s203-13 299 31 180-61 295-41 226 102 550-6v373H-30Z" fill="var(--color-leaf)" />
      <path d="M-30 442C122 341 298 382 419 348s165-9 283 30 254-12 346-47 279-15 430 62v247H-30Z" fill="var(--color-meadow)" />
      <path d="M-30 442C122 341 298 382 419 348s165-9 283 30 254-12 346-47 279-15 430 62v247H-30Z" fill={`url(#${id}-field)`} />
      <path d="M-30 520c158-20 226-106 350-70s146 49 272 11 238-52 397-16 282 15 489-1v196H-30Z" fill="var(--color-leaf)" />
      <path d="M699 355c-59 22-71 55-38 81s-18 49-99 62c-89 14-94 73-59 142h120c-109-76-52-98 14-115 85-22 115-64 70-94s-37-49 20-75Z" fill={variant === "river" ? "var(--color-sky)" : "var(--color-paper)"} opacity=".88" />
      <g transform="translate(941 252)"><path d="M-9 51 69 4l81 50-10 12H-7Z" fill="var(--color-clay)" /><path d="M7 56h122v76H7Z" fill="var(--color-paper)" /><path d="m69 13 73 48-13 5V57L69 21 7 59v-3Z" fill="var(--color-ink)" opacity=".22" /><path d="M82 87h23v45H82Z" fill="var(--color-ink)" /><path d="M24 79h34v29H24Z" fill="var(--color-butter)" stroke="var(--color-ink)" strokeWidth="2" /><path d="M41 79v29m-17-15h34" stroke="var(--color-ink)" strokeWidth="2" /><path d="M16 120h55m39-42h9" stroke="var(--color-meadow)" /><path d="M107 13V-9h12v30" fill="var(--color-ink)" /></g>
      <use href={`#${id}-tree`} transform="translate(1138 275) scale(1.13)" /><use href={`#${id}-tree`} transform="translate(1184 308) scale(.8)" />
      <g stroke="var(--color-paper)" strokeWidth="2" opacity=".45"><path d="M53 449q81-18 157-55m-122 67q81-18 157-55m-110 66q81-18 157-55m-110 66q81-18 157-55" /><path d="m1193 421 171 28m-174-10 171 28m-176-9 171 28" /></g>
      <path d="M-30 581c160-70 218-26 354-8s237-12 378-12 167 45 302 11 294-5 474 40v28H-30Z" fill="color-mix(in srgb,var(--color-meadow) 83%,var(--color-ink))" />
      <g className="kz-grasses" stroke="var(--color-ink)" strokeWidth="2" strokeLinecap="round" opacity=".8"><path d="M73 640q27-68 16-111m-13 92q-22-38-45-42m52 18q26-34 49-30M1290 640q-21-67-10-113m9 83q26-31 49-33m-48 47q-13-34-41-43M1381 640q15-53 6-84" /><use href={`#${id}-flower`} transform="translate(194 518) rotate(-8)" /><use href={`#${id}-flower`} transform="translate(230 553) scale(.75)" /><use href={`#${id}-flower`} transform="translate(1237 531) rotate(10)" /><use href={`#${id}-flower`} transform="translate(1199 567) scale(.6)" /></g>
      {variant === "river" && <g stroke="var(--color-ink)" strokeWidth="3"><path d="m478 515 208 3m-200-8v23m45-23v26m44-25v24m44-25v18m44-17v12" /></g>}
      {variant === "flowers" && <g><use href={`#${id}-flower`} transform="translate(580 327) scale(2.7)" /><use href={`#${id}-flower`} transform="translate(740 357) rotate(12) scale(2.3)" /><path d="M551 488h234l-25 113H575Z" fill="var(--color-clay)" /><path d="M541 478h254v23H541Z" fill="var(--color-clay)" stroke="var(--color-ink)" strokeWidth="2" /></g>}
      <g className="kz-paper-bird" transform="translate(759 198)"><path d="m0 5 25 8L54-7 43 19l19-5-14 14-23-9-15 10 6-13Z" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="1.4" /><path d="m25 13 18 6" stroke="var(--color-ink)" strokeWidth="1" /></g>
      <path d="M684 223c-51 10-53-17-82-13s-38 25-9 24c26-1 3-28-39-18" stroke="var(--color-ink)" strokeOpacity=".35" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="4 7" />
    </g>
    {!sketch && <path d="M0 0h1440v640H0Z" fill={`url(#${id}-grain)`} pointerEvents="none" />}
  </svg>;
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/illustrations/StudioWindow.tsx">
<![CDATA[export function StudioWindow() {
  return <svg viewBox="0 0 480 540" fill="none" role="img" aria-label="Concept artwork of a drawing desk beside an open countryside window">
    <path d="M0 0h480v540H0Z" fill="var(--color-leaf)" />
    <path d="M72 46h336v337H72Z" fill="var(--color-paper)" />
    <path d="M87 60h306v306H87Z" fill="var(--color-sky)" />
    <circle cx="323" cy="125" r="30" fill="var(--color-butter)" />
    <path d="M87 241q79-103 163-17t143-13v155H87Z" fill="var(--color-meadow)" />
    <path d="M87 294q112-87 191-5t115 5v72H87Z" fill="var(--color-leaf)" />
    <path d="M234 60h12v306h-12ZM87 205h306v10H87Z" fill="var(--color-paper)" />
    <path d="M57 380h369v19H57Z" fill="var(--color-ink)" />
    <path d="m0 430 480-20v130H0Z" fill="var(--color-butter)" />
    <path d="m93 437 172-19 80 58-176 24Z" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="1.5" />
    <path d="m172 462 31-22 22 15 27-4-19 24-27-11-23 7 9-16" stroke="var(--color-meadow)" strokeWidth="2" />
    <path d="m260 485 55-56" stroke="var(--color-clay)" strokeWidth="5" strokeLinecap="round" />
    <path d="M46 396h43l-5 54H51Z" fill="var(--color-clay)" />
    <path d="m58 407-3-49m13 48 7-62m-5 63 18-45" stroke="var(--color-ink)" strokeWidth="4" />
    <path d="M360 368h47l-7 44h-33Z" fill="var(--color-paper)" />
    <path d="M384 370v-75m0 31q-44 2-30-25 27 0 30 25m0 21q40-5 29-26-23 2-29 26" stroke="var(--color-ink)" fill="var(--color-meadow)" strokeWidth="2" />
    <path d="M38 26q-14 124 8 242M441 26q18 130-4 239" stroke="var(--color-paper)" strokeWidth="34" opacity=".7" />
    <path d="M0 520q110-12 223 1t257-5" stroke="var(--color-ink)" strokeOpacity=".2" />
  </svg>;
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/motion/Magnetic.tsx">
<![CDATA["use client";
import { useEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "./useReducedMotion";
export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const frame = useRef(0);
  const reduce = useReducedMotion();
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  return <span className="kz-magnetic" ref={ref} onPointerMove={(event) => {
    if (reduce || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = Math.max(-8, Math.min(8, (event.clientX - box.left - box.width / 2) * .07));
    const y = Math.max(-8, Math.min(8, (event.clientY - box.top - box.height / 2) * .1));
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => { ref.current?.style.setProperty("--mx", `${x}px`); ref.current?.style.setProperty("--my", `${y}px`); });
  }} onPointerLeave={() => { cancelAnimationFrame(frame.current); ref.current?.style.setProperty("--mx", "0px"); ref.current?.style.setProperty("--my", "0px"); }}>{children}</span>;
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/motion/math.ts">
<![CDATA[export function clamp(value: number, min = 0, max = 1): number {
  return Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : min;
}

export function progressFromOffsets(scroll: number, start: number, height: number, viewport: number): number {
  const travel = height - viewport;
  return travel <= 0 ? (scroll >= start ? 1 : 0) : clamp((scroll - start) / travel);
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/motion/MotionDirector.tsx">
<![CDATA["use client";
import { useEffect, useState } from "react";
import { clamp } from "./math";
import { useReducedMotion } from "./useReducedMotion";

export function MotionDirector() {
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".kz-site");
    if (!root) return;
    root.dataset.paused = String(paused || reduce);
    const onVisibility = () => { root.dataset.paused = String(paused || reduce || document.hidden); };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [paused, reduce]);
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".kz-site");
    if (!root) return;
    const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.in = "true"; reveal.unobserve(entry.target); }
    }), { threshold: .08 });
    root.querySelectorAll<HTMLElement>("[data-kz-reveal]").forEach((node) => {
      if (node.getBoundingClientRect().top < innerHeight) node.dataset.in = "true";
      else reveal.observe(node);
    });
    root.dataset.ready = "true";
    const ambient = new IntersectionObserver((entries) => entries.forEach((entry) => { (entry.target as HTMLElement).dataset.active = String(entry.isIntersecting); }));
    root.querySelectorAll("[data-kz-ambient]").forEach((node) => ambient.observe(node));
    const header = document.querySelector<HTMLElement>(".kz-header");
    const hero = document.querySelector<HTMLElement>(".kz-hero");
    const progressBar = document.querySelector<HTMLElement>(".kz-progress");
    let frame = 0;
    let total = 1;
    let heroHeight = 1;
    const measure = () => { total = Math.max(1, document.documentElement.scrollHeight - innerHeight); heroHeight = hero?.offsetHeight || 1; };
    const update = () => {
      progressBar?.style.setProperty("--page-progress", String(clamp(scrollY / total)));
      hero?.style.setProperty("--hero-progress", String(reduce ? 0 : clamp(scrollY / heroHeight)));
      if (header) header.dataset.scrolled = String(scrollY > 60);
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(() => { measure(); onScroll(); });
    observer.observe(document.body);
    measure(); update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    return () => { reveal.disconnect(); ambient.disconnect(); observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", measure); delete root.dataset.ready; };
  }, [reduce]);
  return <button className="kz-motion-toggle kz-js-only" type="button" onClick={() => setPaused(!paused)} aria-pressed={paused} disabled={reduce} aria-label={reduce ? "Animation disabled by your motion preference" : paused ? "Resume ambient animation" : "Pause ambient animation"}><span aria-hidden="true">{paused || reduce ? "▷" : "Ⅱ"}</span><span>{paused || reduce ? "Still" : "Motion"}</span></button>;
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/motion/Reveal.tsx">
<![CDATA[import type { CSSProperties, ReactNode } from "react";
export function Reveal({ children, variant = "rise", index = 0, className = "" }: { children: ReactNode; variant?: "rise" | "mask" | "wipe" | "scale" | "draw"; index?: number; className?: string }) {
  return <div className={className} data-kz-reveal={variant} style={{ "--i": index } as CSSProperties}>{children}</div>;
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/motion/SmoothScroll.tsx">
<![CDATA["use client";
import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";
export function SmoothScroll() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let dispose: (() => void) | undefined;
    let cancelled = false;
    void import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({ lerp: .1, autoRaf: true, anchors: { offset: -90 }, prevent: (node) => node.tagName === "DIALOG" });
      dispose = () => lenis.destroy();
    });
    return () => { cancelled = true; dispose?.(); };
  }, [reduce]);
  return null;
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/motion/SplitText.tsx">
<![CDATA[export function SplitText({ lines }: { lines: string[] }) {
  return <>{lines.map((line, i) => <span className="kz-line-mask" key={line}><span style={{ animationDelay: `${250 + i * 100}ms` }}>{line}</span></span>)}</>;
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/motion/useReducedMotion.ts">
<![CDATA["use client";
import { useSyncExternalStore } from "react";
const query = "(prefers-reduced-motion: reduce)";
function subscribe(callback: () => void) {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => true);
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/process/ScenePlayer.tsx">
<![CDATA["use client";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { PHASES, phaseForProgress } from "./story";
import { progressFromOffsets } from "../motion/math";
import { useReducedMotion } from "../motion/useReducedMotion";

export function ScenePlayer({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const range = useRef<HTMLInputElement>(null);
  const manual = useRef(false);
  const [isManual, setManual] = useState(false);
  const [phase, setPhase] = useState<(typeof PHASES)[number]>(PHASES[2]);
  const reduce = useReducedMotion();
  const apply = useCallback((progress: number) => {
    ref.current?.style.setProperty("--scene-progress", String(progress));
    if (range.current) range.current.value = String(Math.round(progress * 100));
    const next = phaseForProgress(progress);
    setPhase((previous) => previous === next ? previous : next);
  }, []);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const desktop = matchMedia("(min-width: 900px) and (pointer: fine)");
    let start = 0, height = 0, frame = 0, disposed = false;
    const measure = () => { const chapter = node.closest<HTMLElement>(".kz-process"); if (chapter) { start = chapter.getBoundingClientRect().top + scrollY; height = chapter.offsetHeight; } };
    const update = () => { frame = 0; if (!manual.current && desktop.matches && !reduce) apply(progressFromOffsets(scrollY, start, height, innerHeight)); };
    const scroll = () => { if (!frame && !manual.current) frame = requestAnimationFrame(update); };
    const resize = () => { measure(); if (manual.current) return; if (!desktop.matches || reduce) apply(1); else update(); };
    resize();
    const layout = new ResizeObserver(resize);
    layout.observe(document.body);
    void document.fonts.ready.then(() => { if (!disposed) resize(); });
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    return () => { disposed = true; layout.disconnect(); cancelAnimationFrame(frame); window.removeEventListener("scroll", scroll); window.removeEventListener("resize", resize); };
  }, [apply, reduce]);
  const choose = (progress: number) => { manual.current = true; setManual(true); apply(progress); };
  return <div ref={ref} className="kz-scene-player" data-phase={phase.name}>
    <div className="kz-process-art" data-kz-ambient>{children}<span className="kz-scene-corner kz-mono">SCENE 01 / A WIND FINDS ITS WAY</span><span className="kz-scene-corner kz-scene-corner-right" lang="ja">風のある風景</span></div>
    <div className="kz-process-controls kz-js-only">
      <div className="kz-phases" role="group" aria-label="Animation stages">{PHASES.map((item, i) => <button type="button" key={item.name} aria-pressed={phase.name === item.name} onClick={() => choose(item.progress)}><span className="kz-mono">0{i + 1}</span>{item.name}<span aria-hidden="true">↗</span></button>)}</div>
      <label className="kz-range-label" htmlFor="kz-progress">A pencil mark becomes a world.<span>Drag to discover <span aria-hidden="true">↔</span></span></label>
      <input id="kz-progress" ref={range} type="range" min="0" max="100" defaultValue="100" aria-label="Sketch to colour progress" onChange={(event) => choose(Number(event.target.value) / 100)} />
      {isManual && <button className="kz-resume" type="button" onClick={() => { manual.current = false; setManual(false); window.dispatchEvent(new Event("scroll")); }}>Resume scroll animation</button>}
    </div>
    <div className="kz-phase-caption" aria-live="polite"><span className="kz-mono">{phase.label}</span><p>{phase.copy}</p></div>
    <p className="kz-no-js">The scene begins with pencil, gains colour, and comes to life. Enable JavaScript to explore the drawing controls.</p>
  </div>;
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/process/story.ts">
<![CDATA[import { clamp } from "../motion/math";

export const PHASES = [
  { name: "Pencil", progress: 0, label: "01 / Find the feeling", copy: "A loose line. A small observation. A world waiting to happen." },
  { name: "Colour", progress: .55, label: "02 / Give it a world", copy: "We find the light, mix the colours, and leave room for happy accidents." },
  { name: "Life", progress: 1, label: "03 / Let it breathe", copy: "A breeze through the grass. One little movement that makes it real." },
] as const;

export function phaseForProgress(progress: number) {
  const p = clamp(progress);
  return PHASES[p < .34 ? 0 : p < .75 ? 1 : 2];
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/sections/Contact.tsx">
<![CDATA[import { ProjectForm } from "../forms/ProjectForm";
import { Reveal } from "../motion/Reveal";
export function Contact() {
  return <section className="kz-contact kz-section" id="contact" aria-labelledby="kz-contact-title"><div className="kz-container"><div className="kz-contact-intro"><Reveal><span className="kz-eyebrow">04 / There’s a story in there</span><h2 id="kz-contact-title">Something on<br /><em>your mind?</em></h2></Reveal><Reveal><p>A film. A feeling. A beautifully odd idea.<br />We’d love to help you bring it to life.</p><span className="kz-contact-japanese" lang="ja">いっしょに、物語を。</span></Reveal></div><Reveal><ProjectForm /></Reveal><p className="kz-no-js">This demonstration form needs JavaScript to prepare a brief. No personal information is sent.</p></div></section>;
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/sections/FilmCard.tsx">
<![CDATA["use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { Film } from "../data/films";
import { Arrow } from "../brand/Arrow";
import { Landscape } from "../illustrations/Landscape";
import { Picture } from "../assets";
export function FilmCard({ film, children }: { film: Film; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = previous; };
  }, [open]);
  return <article className={`kz-film-card kz-film-${film.number}`}>
    <button className="kz-film-open" aria-label={`Explore ${film.title}`} type="button" onClick={() => { dialog.current?.showModal(); setOpen(true); }}>
      <div className="kz-film-art">{children}<span className="kz-film-number kz-mono">FILM / {film.number}</span><span className="kz-film-duration kz-mono">{film.length}</span><span className="kz-film-explore">Explore the story <Arrow diagonal /></span></div>
      <span className="kz-film-meta kz-mono">{film.type}<span>{film.year}</span></span>
      <span className="kz-film-title">{film.title}<Arrow diagonal /></span><span className="kz-film-japanese" lang="ja">{film.japanese}</span>
    </button>
    <dialog ref={dialog} className="kz-film-dialog" aria-labelledby={`kz-film-${film.id}`} onClose={() => setOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      {open && <><button type="button" className="kz-close" aria-label="Close film details" onClick={() => dialog.current?.close()}>×</button>
      <div className="kz-dialog-art"><Picture assetKey={film.id} alt={`${film.title} concept artwork`}><Landscape variant={film.variant} /></Picture></div><div className="kz-dialog-copy"><span className="kz-mono">{film.type} / {film.length}</span><h2 id={`kz-film-${film.id}`}>{film.title}</h2><p>{film.description}</p><p className="kz-mono">{film.palette}</p><p className="kz-sample-note">A fictional film concept, created for this studio template.</p><a className="kz-button" href="#contact" onClick={() => dialog.current?.close()}>Imagine something with us <Arrow /></a></div></>}
    </dialog>
    <p className="kz-no-js">{film.description}</p>
  </article>;
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/sections/Films.tsx">
<![CDATA[import { FILMS } from "../data/films";
import { Picture } from "../assets";
import { Landscape } from "../illustrations/Landscape";
import { Reveal } from "../motion/Reveal";
import { FilmCard } from "./FilmCard";
export function Films() {
  return <section className="kz-films kz-section" id="films" aria-labelledby="kz-films-title"><div className="kz-container">
    <Reveal variant="draw"><div className="kz-section-top"><span className="kz-eyebrow">01 / A few of our worlds</span><span className="kz-mono">SELECTED STORIES — 2025 / 26</span></div></Reveal>
    <div className="kz-section-heading"><Reveal variant="mask"><h2 id="kz-films-title">Small stories.<br /><em>Somewhere to get lost.</em></h2></Reveal><Reveal><p>A place you almost remember.<br />A feeling you can’t quite name.<br />Come stay for a little while.</p></Reveal></div>
    <div className="kz-film-grid">{FILMS.map((film, i) => <Reveal key={film.id} variant="scale" index={i} className={i === 0 ? "kz-film-featured" : ""}><FilmCard film={film}><Picture assetKey={film.id} alt={`${film.title} concept artwork`}><Landscape variant={film.variant} /></Picture></FilmCard></Reveal>)}</div>
    <div className="kz-films-foot"><span className="kz-mono">ORIGINALS · VISUAL POEMS · BRAND STORIES</span><p>Imagined films. Real possibilities.</p></div>
  </div></section>;
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/sections/Footer.tsx">
<![CDATA[import { Logo } from "../brand/Logo";
export function Footer() {
  return <footer className="kz-footer"><div className="kz-container"><div className="kz-footer-top"><Logo /><p>Little stories.<br />Carried by the wind.</p><a href="#home" className="kz-text-link">Back to the beginning <span aria-hidden="true">↑</span></a></div><div className="kz-footer-bottom kz-mono"><span>© 2026 STUDIO KAZEKO</span><span>A FICTIONAL STUDIO. A LITTLE REAL WONDER.</span><span>MADE SLOWLY, WITH FEELING.</span></div></div></footer>;
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/sections/Header.tsx">
<![CDATA["use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Logo } from "../brand/Logo";
import { Arrow } from "../brand/Arrow";
const links = [{ id: "films", label: "Our films" }, { id: "process", label: "Our craft" }, { id: "studio", label: "The studio" }];
export function Header() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(-1);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(links.findIndex((link) => link.id === entry.target.id)); }), { rootMargin: "-10% 0px -55% 0px" });
    links.forEach((link) => { const node = document.getElementById(link.id); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => { document.documentElement.style.overflow = previous; };
  }, [open]);
  const close = () => { dialog.current?.close(); setOpen(false); };
  return <header className="kz-header" data-scrolled="false"><a className="kz-skip" href="#main">Skip to content</a><Logo />
    <nav className="kz-nav" aria-label="Main navigation" style={{ "--nav-index": active } as CSSProperties} data-selected={active >= 0}>
      <span className="kz-nav-indicator" aria-hidden="true" />{links.map((link, index) => <a key={link.id} href={`#${link.id}`} aria-current={active === index ? "location" : undefined}>{link.label}</a>)}
    </nav>
    <a href="#contact" className="kz-header-cta">Let’s make something <Arrow diagonal /></a>
    <button className="kz-menu-toggle kz-js-only" aria-label="Open navigation" aria-haspopup="dialog" aria-expanded={open} type="button" onClick={() => { dialog.current?.showModal(); setOpen(true); }}><span /><span /></button>
    <dialog ref={dialog} className="kz-menu" aria-label="Navigation" onClose={() => setOpen(false)} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
      <button className="kz-close" aria-label="Close navigation" type="button" onClick={close}>×</button><span className="kz-mono">A SMALL STUDIO. AN OPEN WORLD.</span>
      <nav aria-label="Mobile navigation">{links.map((link, i) => <a href={`#${link.id}`} key={link.id} onClick={close}><span className="kz-mono">0{i + 1}</span>{link.label}<Arrow diagonal /></a>)}<a href="#contact" onClick={close}>Start a story <Arrow diagonal /></a></nav>
    </dialog>
  </header>;
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/sections/Hero.tsx">
<![CDATA[import { Landscape } from "../illustrations/Landscape";
import { Arrow } from "../brand/Arrow";
import { Magnetic } from "../motion/Magnetic";
import { SplitText } from "../motion/SplitText";
export function Hero() {
  return <section className="kz-hero" id="home" aria-labelledby="kz-title" data-kz-ambient>
    <div className="kz-hero-copy"><div className="kz-eyebrow kz-hero-eyebrow"><span className="kz-star" aria-hidden="true">✳</span> Independent animation, from Japan <span lang="ja">風の子</span></div>
      <h1 id="kz-title"><SplitText lines={["A little wonder.", "A world of feeling."]} /></h1>
      <p>We draw the little things.<br className="kz-mobile-break" /> And the worlds they become.</p>
      <Magnetic><a className="kz-button" href="#films"><span>Step into our stories</span><Arrow /></a></Magnetic>
    </div>
    <div className="kz-hero-landscape"><Landscape /></div>
    <div className="kz-hero-side kz-mono" aria-hidden="true">HAND-DRAWN. HEART-FELT. FRAME BY FRAME.</div>
    <div className="kz-hero-caption"><span><span className="kz-caption-dot" /> A breeze. A beginning.</span><a href="#films">Scroll, take your time <span aria-hidden="true">↓</span></a><span className="kz-mono" lang="ja">小さな物語、大きな世界。</span></div>
  </section>;
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/sections/Process.tsx">
<![CDATA[import { Landscape } from "../illustrations/Landscape";
import { Reveal } from "../motion/Reveal";
import { ScenePlayer } from "../process/ScenePlayer";
export function Process() {
  return <section className="kz-process" id="process" aria-labelledby="kz-process-title"><div className="kz-process-sticky"><div className="kz-container">
    <div className="kz-process-heading"><Reveal><span className="kz-eyebrow">02 / The quiet work behind the wonder</span><h2 id="kz-process-title">First, a line.<br /><em>Then, a little life.</em></h2></Reveal><Reveal><p>We make things slowly, thoughtfully,<br />and one imperfect frame at a time.<br />Watch a small world find its colour.</p></Reveal></div>
    <ScenePlayer><div className="kz-pencil-layer"><Landscape sketch /></div><div className="kz-colour-layer"><Landscape /></div><div className="kz-wipe-marker" aria-hidden="true"><span>✦</span></div></ScenePlayer>
  </div></div></section>;
}
]]>
    </file>
    <file path="src/app/(kazeko)/kazeko/sections/Studio.tsx">
<![CDATA[import { StudioWindow } from "../illustrations/StudioWindow";
import { Picture } from "../assets";
import { Reveal } from "../motion/Reveal";
import { BirdMark } from "../brand/Logo";
import { Arrow } from "../brand/Arrow";
export function Studio() {
  return <section className="kz-studio kz-section" id="studio" aria-labelledby="kz-studio-title"><div className="kz-container kz-studio-grid">
    <Reveal variant="wipe" className="kz-studio-image"><Picture assetKey="studio-window" alt="A quiet drawing desk overlooking the countryside"><StudioWindow /></Picture><span className="kz-studio-image-caption kz-mono">OUR KIND OF CORNER OFFICE.</span></Reveal>
    <div className="kz-studio-copy"><Reveal><span className="kz-eyebrow">03 / Hello, we’re Kazeko</span></Reveal><Reveal variant="mask"><h2 id="kz-studio-title">A small studio.<br /><em>A very open window.</em></h2></Reveal>
      <Reveal><p>We believe the best stories begin by paying attention. To the way a curtain catches the wind. To the sound of summer. To a very ordinary day that feels, somehow, extraordinary.</p><p>Kazeko is an imagined independent studio with a love for hand-drawn animation, thoughtful collaboration, and worlds with a little room to breathe.</p></Reveal>
      <Reveal variant="draw"><div className="kz-studio-services"><span>What we make</span><p>Original short films<br />Animation for thoughtful brands<br />Music videos & imagined worlds</p></div></Reveal>
      <Reveal><a href="#contact" className="kz-text-link">A good story starts with hello <Arrow diagonal /></a></Reveal>
      <BirdMark className="kz-studio-bird" />
    </div>
  </div></section>;
}
]]>
    </file>
  </files>
</template>
