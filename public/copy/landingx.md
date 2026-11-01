<template slug="landingx" name="Landing X">
  <dependencies>
    {
      "dependencies": {}
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(landingx)/layout.tsx">
<![CDATA[import type { Metadata } from "next";
import { Barlow_Condensed, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./landingx/landingx.css";

const display = Barlow_Condensed({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--lx-font-display" });
const body = Manrope({ subsets: ["latin"], variable: "--lx-font-body" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--lx-font-mono" });
export const metadata: Metadata = { title: "Landing X — make the first impression count", description: "An agent skill for building distinctive landing pages. Explore the work and start with a brief." };
export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}><body className="lx-body">{children}<noscript><style>{`.lx-filters,.lx-copy-button{display:none!important}[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style></noscript></body></html>;
}
]]>
    </file>
    <file path="src/app/(landingx)/landingx/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(landingx)/landingx/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

export function Picture({ assetKey, name, monogram }: { assetKey: string; name: string; monogram: string }) {
  const asset = ASSETS[assetKey];
  if (!asset) return <div className="lx-image-placeholder" role="img" aria-label={`${name} project image placeholder, 16 by 9`} data-asset={assetKey}><span className="lx-placeholder-top"><span>IMAGE SLOT / 16:9</span><span>↗</span></span><span className="lx-placeholder-letter" aria-hidden="true">{monogram}</span><span className="lx-placeholder-bottom"><span>{name.toUpperCase()} / PREVIEW</span><span>IMAGE TO COME</span></span></div>;
  const src = (width: number, format: string) => `/templates/landingx/${assetKey}-${width}.${format}`;
  return <picture className="lx-project-picture"><source type="image/avif" srcSet={`${src(800, "avif")} 800w, ${src(1600, "avif")} 1600w`} sizes="(min-width: 800px) 48vw, 100vw"/><img src={src(800, "webp")} srcSet={`${src(800, "webp")} 800w, ${src(1600, "webp")} 1600w`} sizes="(min-width: 800px) 48vw, 100vw" width={asset.w} height={asset.h} alt={`${name} landing page`} loading="lazy" decoding="async" data-asset={assetKey}/></picture>;
}
]]>
    </file>
    <file path="src/app/(landingx)/landingx/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="#BEAA97"/><path d="M10 10l28 28M38 10L10 38" stroke="#4B3C2E" stroke-width="5"/></svg>
]]>
    </file>
    <file path="src/app/(landingx)/landingx/landingx.css">
<![CDATA[@import "tailwindcss";

@theme {
  --lx-tan: #BEAA97;
  --lx-rust: #815751;
  --lx-warm: #E5DDD7;
  --lx-paper: #E8EEEE;
  --lx-ink: #4B3C2E;
  --lx-earth: #826851;
  --lx-ease-out: cubic-bezier(.22,1,.36,1);
  --lx-ease-inout: cubic-bezier(.65,0,.35,1);
  --lx-fast: 180ms;
  --lx-base: 360ms;
  --lx-slow: 800ms;
  --lx-hero-time: 1100ms;
  --lx-stagger: 70ms;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; overflow-x: clip; }
.lx-body { --lx-strong: color-mix(in srgb, var(--lx-ink) 65%, black); margin: 0; overflow-x: clip; background: var(--lx-tan); color: var(--lx-strong); font-family: var(--lx-font-body), sans-serif; font-size: 15px; -webkit-font-smoothing: antialiased; }
.lx-body h1,.lx-body h2,.lx-body h3,.lx-body p { margin: 0; }
.lx-body h1,.lx-body h2,.lx-body h3 { font-family: var(--lx-font-display), sans-serif; font-weight: 400; letter-spacing: -.035em; text-wrap: balance; }
.lx-body p { text-wrap: pretty; }
.lx-body em { font-style: normal; font-weight: inherit; }
.lx-body a { color: inherit; text-decoration: none; }
.lx-body button { font: inherit; cursor: pointer; }
.lx-body :focus-visible { outline: 3px solid currentColor; outline-offset: 4px; }
.lx-shell { width: min(1328px, calc(100% - 112px)); margin-inline: auto; }
.lx-mono { font-family: var(--lx-font-mono), monospace; font-size: 10px; font-weight: 500; letter-spacing: .04em; line-height: 1.4; }
.lx-progress { position: fixed; z-index: 50; top: 0; left: 0; width: 100%; height: 3px; background: var(--lx-rust); transform: scaleX(var(--lx-progress, 0)); transform-origin: left; }
.lx-logo { display: inline-flex; align-items: center; gap: 8px; font-family: var(--lx-font-body),sans-serif; font-size: 22px; font-weight: 800; letter-spacing: -.065em; white-space: nowrap; }
.lx-logo svg { width: 27px; height: 27px; }
.lx-logo small { align-self: flex-start; margin-left: -5px; padding-top: 3px; font-family: var(--lx-font-mono),monospace; font-size: 8px; letter-spacing: 0; }
.lx-logo-hyphen { color: var(--lx-rust); }
.lx-button { display: inline-flex; align-items: center; justify-content: space-between; gap: 42px; min-height: 54px; padding: 0 20px; font-size: 12px; font-weight: 700; transition: transform var(--lx-fast) var(--lx-ease-out), background var(--lx-fast) var(--lx-ease-out); }
.lx-button span,.lx-inline-link span,.lx-header-action span { display: inline-block; font-size: 17px; transition: transform var(--lx-fast) var(--lx-ease-out); }
.lx-button:active,.lx-header-action:active { transform: scale(.97); }
.lx-button-dark { background: var(--lx-ink); color: var(--lx-paper) !important; }
.lx-inline-link { display: inline-flex; align-items: center; gap: 22px; border-bottom: 1px solid currentColor; padding: 7px 0; font-size: 12px; font-weight: 700; }
.lx-hero { min-height: 750px; background: var(--lx-tan); }
.lx-header { height: 80px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid color-mix(in srgb,var(--lx-strong) 35%,transparent); }
.lx-header nav { display: flex; align-items: center; gap: 34px; font-size: 12px; font-weight: 650; }
.lx-header nav a { position: relative; padding-block: 8px; }
.lx-header nav a::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: left; transition: transform var(--lx-fast) var(--lx-ease-out); }
.lx-header-action { display: inline-flex; align-items: center; gap: 27px; border: 1px solid color-mix(in srgb,var(--lx-strong) 65%,transparent); padding: 11px 15px; font-size: 11px; font-weight: 700; transition: transform var(--lx-fast) var(--lx-ease-out); }
.lx-hero-content { padding-top: 54px; }
.lx-hero-topline,.lx-hero-foot,.lx-section-label { display: flex; justify-content: space-between; gap: 20px; }
.lx-hero h1 { max-width: 1120px; margin: 48px 0 38px; font-size: clamp(84px, 10.4vw, 160px); line-height: .86; font-weight: 300; letter-spacing: -.035em; }
.lx-hero h1 span { display: block; }
.lx-hero h1 em { color: var(--lx-strong); }
.lx-hero-bottom { display: grid; grid-template-columns: minmax(260px, 440px) 1fr 160px; align-items: end; gap: 40px; }
.lx-hero-description { display: flex; gap: 16px; max-width: 430px; align-items: flex-start; }
.lx-tiny-x { flex: none; font-size: 29px; line-height: 1; color: var(--lx-rust); }
.lx-hero-description p { font-size: 15px; line-height: 1.65; }
.lx-hero-actions { display: flex; align-items: center; justify-content: center; gap: 28px; padding-bottom: 3px; }
.lx-hero-mark { display: flex; align-items: end; justify-content: flex-end; gap: 11px; }
.lx-hero-mark svg { width: 62px; height: 62px; color: var(--lx-rust); transform: translateY(var(--lx-shift,0)); }
.lx-hero-mark span { font-family: var(--lx-font-mono),monospace; font-size: 8px; line-height: 1.4; }
.lx-preview-strip { display: grid; grid-template-columns: minmax(200px,1fr) minmax(0,650px); gap: 35px; align-items: start; border-top: 1px solid color-mix(in srgb,var(--lx-strong) 35%,transparent); margin-top: 55px; padding-top: 18px; }
.lx-preview-intro { display: flex; flex-direction: column; gap: 8px; }
.lx-preview-list { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 14px; }
.lx-preview-media { position: relative; aspect-ratio: 16/9; overflow: hidden; border: 1px solid color-mix(in srgb,var(--lx-strong) 30%,transparent); transition: transform var(--lx-base) var(--lx-ease-out); }
.lx-preview-media .lx-placeholder-letter { font-size: 100px; }
.lx-preview-media .lx-placeholder-top,.lx-preview-media .lx-placeholder-bottom { left: 8px; right: 8px; font-size: 6px; }
.lx-preview-media .lx-placeholder-top { top: 7px; }
.lx-preview-media .lx-placeholder-bottom { bottom: 7px; }
.lx-preview-card > span { display: flex; justify-content: space-between; margin-top: 8px; }
.lx-preview-card > span b { font-size: 13px; }
.lx-hero-foot { border-top: 1px solid color-mix(in srgb,var(--lx-strong) 35%,transparent); margin-top: 30px; padding: 16px 0 22px; }
.lx-work { background: var(--lx-paper); padding: 104px 0 110px; }
.lx-section-label { padding-top: 14px; border-top: 1px solid color-mix(in srgb,currentColor 40%,transparent); }
.lx-work-heading { display: grid; grid-template-columns: 1fr 310px; gap: 50px; align-items: end; margin: 70px 0 50px; }
.lx-work-heading h2,.lx-approach h2,.lx-process h2,.lx-start h2 { font-size: clamp(64px, 7vw, 106px); line-height: .88; }
.lx-work-heading h2 em,.lx-process h2 em { color: var(--lx-rust); }
.lx-work-heading p { padding-bottom: 6px; font-size: 13px; line-height: 1.75; max-width: 305px; }
.lx-index-bar { display: flex; justify-content: space-between; align-items: center; gap: 25px; border-top: 1px solid color-mix(in srgb,var(--lx-ink) 30%,transparent); border-bottom: 1px solid color-mix(in srgb,var(--lx-ink) 30%,transparent); padding: 14px 0; margin-bottom: 42px; }
.lx-filters { display: flex; flex-wrap: wrap; gap: 7px; }
.lx-filters button { border: 1px solid transparent; background: transparent; color: var(--lx-ink); padding: 8px 13px; font-size: 11px; transition: color var(--lx-fast), background var(--lx-fast), border-color var(--lx-fast), transform var(--lx-fast); }
.lx-filters button[aria-pressed="true"] { background: var(--lx-ink); color: var(--lx-paper); }
.lx-filters button:active { transform: scale(.96); }
.lx-index-count { white-space: nowrap; }
.lx-project-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 80px 28px; }
.lx-project:nth-child(4n+2) { margin-top: 84px; }
.lx-project a { display: block; transition: opacity var(--lx-base) var(--lx-ease-out); }
.lx-project-media { position: relative; aspect-ratio: 16 / 9; overflow: hidden; background: var(--lx-warm); border: 1px solid color-mix(in srgb,var(--lx-ink) 18%,transparent); transition: transform var(--lx-base) var(--lx-ease-out); }
.lx-image-placeholder,.lx-project-picture { display: block; position: relative; width: 100%; height: 100%; overflow: hidden; }
.lx-image-placeholder { background: color-mix(in srgb,var(--lx-tan) 36%,var(--lx-paper)); color: var(--lx-strong); }
.lx-project:nth-child(4n+2) .lx-image-placeholder { background: color-mix(in srgb,var(--lx-rust) 18%,var(--lx-warm)); }
.lx-project:nth-child(4n+3) .lx-image-placeholder { background: color-mix(in srgb,var(--lx-earth) 16%,var(--lx-paper)); }
.lx-project:nth-child(4n+4) .lx-image-placeholder { background: color-mix(in srgb,var(--lx-tan) 25%,var(--lx-warm)); }
.lx-image-placeholder::before,.lx-image-placeholder::after { content: ""; position: absolute; background: color-mix(in srgb,var(--lx-ink) 15%,transparent); }
.lx-image-placeholder::before { left: 50%; top: 0; bottom: 0; width: 1px; }
.lx-image-placeholder::after { left: 0; right: 0; top: 50%; height: 1px; }
.lx-placeholder-letter { position: absolute; left: 50%; top: 50%; transform: translate(-50%,-51%); color: color-mix(in srgb,var(--lx-ink) 15%,transparent); font-family: var(--lx-font-display),sans-serif; font-size: clamp(130px, 20vw, 300px); line-height: .7; font-weight: 300; }
.lx-placeholder-top,.lx-placeholder-bottom { position: absolute; left: 20px; right: 20px; z-index: 1; display: flex; justify-content: space-between; font-family: var(--lx-font-mono),monospace; font-size: 9px; font-weight: 500; letter-spacing: .04em; }
.lx-placeholder-top { top: 18px; }
.lx-placeholder-bottom { bottom: 18px; }
.lx-project-picture img { display: block; width: 100%; height: 100%; object-fit: cover; transition: transform var(--lx-slow) var(--lx-ease-out); }
.lx-project-visit { position: absolute; right: 16px; bottom: 16px; padding: 10px 12px; background: var(--lx-ink); color: var(--lx-paper); font-family: var(--lx-font-mono),monospace; font-size: 9px; opacity: 0; transform: translateY(8px); transition: transform var(--lx-base) var(--lx-ease-out), opacity var(--lx-fast); }
.lx-project-meta { display: flex; justify-content: space-between; gap: 15px; border-bottom: 1px solid color-mix(in srgb,var(--lx-ink) 28%,transparent); padding: 17px 0 13px; }
.lx-project-title { display: flex; align-items: baseline; justify-content: space-between; gap: 24px; padding-top: 18px; }
.lx-project-title h3 { font-size: 44px; line-height: .9; }
.lx-project-title p { font-size: 12px; line-height: 1.5; text-align: right; }
.lx-work-end { display: flex; justify-content: space-between; gap: 20px; border-top: 1px solid color-mix(in srgb,var(--lx-ink) 30%,transparent); margin-top: 90px; padding-top: 18px; }
.lx-approach { background: var(--lx-tan); padding: 100px 0 110px; }
.lx-approach-heading { margin-top: 80px; }
.lx-approach h2 { max-width: 850px; }
.lx-approach h2 em { color: color-mix(in srgb,var(--lx-strong) 76%,var(--lx-tan)); }
.lx-approach-body { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: end; margin-top: 90px; }
.lx-approach-mark { position: relative; display: flex; align-items: end; gap: 20px; min-height: 235px; }
.lx-approach-mark svg { width: min(245px, 45%); height: auto; color: var(--lx-rust); transform: translateY(calc(var(--lx-shift,0px) * -.4)); }
.lx-approach-copy { max-width: 480px; justify-self: end; }
.lx-approach-copy p { font-size: 17px; line-height: 1.7; margin-top: 24px; }
.lx-approach-copy p + p { font-size: 13px; max-width: 380px; }
.lx-approach-copy .lx-inline-link { margin-top: 26px; }
.lx-process { background: var(--lx-warm); padding: 105px 0 115px; }
.lx-process-heading { display: flex; align-items: end; justify-content: space-between; gap: 30px; margin: 76px 0 80px; }
.lx-process-heading p { max-width: 270px; font-size: 13px; line-height: 1.7; }
.lx-steps { display: grid; grid-template-columns: repeat(3,1fr); gap: 30px; }
.lx-steps article { position: relative; border-top: 1px solid color-mix(in srgb,var(--lx-ink) 25%,transparent); padding-top: 16px; }
.lx-steps article::before { content: ""; position: absolute; inset: -1px 0 auto; height: 1px; background: var(--lx-ink); transform-origin: left; transform: scaleX(1); }
.lx-step-top { display: flex; justify-content: space-between; }
.lx-step-top span:last-child { color: var(--lx-rust); font-size: 20px; }
.lx-steps h3 { margin: 55px 0 17px; font-size: 40px; line-height: 1; }
.lx-steps p { max-width: 330px; font-size: 12px; line-height: 1.8; }
.lx-start { background: var(--lx-ink); color: var(--lx-paper); padding: 100px 0 110px; }
.lx-start-heading { display: flex; align-items: end; justify-content: space-between; gap: 40px; margin: 76px 0 65px; }
.lx-start-heading h2 em { color: var(--lx-tan); }
.lx-start-heading p { max-width: 320px; font-size: 13px; line-height: 1.8; }
.lx-brief { max-width: 850px; margin-left: auto; padding: 24px; border: 1px solid color-mix(in srgb,var(--lx-paper) 38%,transparent); }
.lx-brief-top,.lx-brief-bottom { display: flex; justify-content: space-between; align-items: center; gap: 20px; }
.lx-brief-text { max-width: 710px; font-family: var(--lx-font-mono),monospace; font-size: clamp(15px,1.6vw,20px); line-height: 1.7; margin: 42px 0 !important; }
.lx-brief-bottom { border-top: 1px solid color-mix(in srgb,var(--lx-paper) 30%,transparent); padding-top: 17px; }
.lx-copy-button { display: inline-flex; align-items: center; gap: 32px; border: 0; background: var(--lx-paper); color: var(--lx-ink); padding: 13px 15px; font-size: 11px; font-weight: 700; transition: transform var(--lx-fast) var(--lx-ease-out); }
.lx-copy-button:active { transform: scale(.97); }
.lx-copy-status { min-height: 16px; font-size: 10px; margin-top: 12px !important; }
.lx-footer { background: var(--lx-tan); padding: 55px 0 22px; }
.lx-footer-top { display: grid; grid-template-columns: 1fr 1fr 1fr 120px; gap: 30px; min-height: 170px; }
.lx-footer-top p { font-size: 13px; line-height: 1.65; }
.lx-footer-top nav { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; font-size: 11px; font-weight: 700; }
.lx-footer-mark { width: 80px; height: 80px; justify-self: end; color: var(--lx-rust); }
.lx-footer-bottom { display: flex; justify-content: space-between; gap: 20px; border-top: 1px solid color-mix(in srgb,var(--lx-strong) 35%,transparent); padding-top: 17px; }

@media (prefers-reduced-motion: no-preference) {
  .lx-header { animation: lx-rise var(--lx-slow) var(--lx-ease-out) backwards; }
  .lx-hero-topline { animation: lx-rise var(--lx-slow) var(--lx-ease-out) .1s backwards; }
  .lx-hero h1 span { animation: lx-headline var(--lx-hero-time) var(--lx-ease-out) .15s backwards; }
  .lx-hero h1 span + span { animation-delay: .25s; }
  .lx-hero-bottom,.lx-hero-foot { animation: lx-rise var(--lx-hero-time) var(--lx-ease-out) .35s backwards; }
  [data-reveal][data-in="true"] { animation: lx-rise var(--lx-slow) var(--lx-ease-out) backwards; animation-delay: calc(var(--i,0) * var(--lx-stagger)); }
  [data-reveal="wipe"][data-in="true"] { animation-name: lx-wipe; }
  [data-reveal="card"][data-in="true"] { animation-name: lx-card; }
  .lx-steps article[data-in="true"]::before { animation: lx-rule var(--lx-slow) var(--lx-ease-out) backwards; animation-delay: calc(var(--i,0) * var(--lx-stagger)); }
  .lx-project { animation: lx-card var(--lx-slow) var(--lx-ease-out) backwards; animation-delay: calc(var(--i,0) * var(--lx-stagger)); }
  @keyframes lx-rise { from { opacity: .01; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes lx-headline { from { opacity: .01; transform: translateY(40px); clip-path: inset(0 0 100% 0); } to { opacity: 1; transform: translateY(0); clip-path: inset(0); } }
  @keyframes lx-wipe { from { opacity: .01; transform: translateY(18px); clip-path: inset(0 0 90% 0); } to { opacity: 1; transform: translateY(0); clip-path: inset(0); } }
  @keyframes lx-card { from { opacity: .01; transform: translateY(24px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
  @keyframes lx-rule { from { transform: scaleX(0); } to { transform: scaleX(1); } }
}
@media (hover:hover) and (pointer:fine) {
  .lx-header nav a:hover::after { transform: scaleX(1); }
  .lx-button:hover span,.lx-inline-link:hover span,.lx-header-action:hover span { transform: translate(3px,-3px); }
  .lx-filters button:hover:not([aria-pressed="true"]) { border-color: var(--lx-ink); }
  .lx-project-grid:has(.lx-project a:hover) .lx-project a:not(:hover) { opacity: .72; }
  .lx-project a:hover .lx-project-media,.lx-project a:focus-visible .lx-project-media { transform: translateY(-6px); }
  .lx-preview-card:hover .lx-preview-media,.lx-preview-card:focus-visible .lx-preview-media { transform: translateY(-4px); }
  .lx-project a:hover .lx-project-picture img,.lx-project a:focus-visible .lx-project-picture img { transform: scale(1.025); }
  .lx-project a:hover .lx-project-visit,.lx-project a:focus-visible .lx-project-visit { opacity: 1; transform: translateY(0); }
}
@media (prefers-reduced-motion:reduce) { html { scroll-behavior:auto; } .lx-hero-mark svg,.lx-approach-mark svg { transform:none; } }
@media (max-width:800px) {
  .lx-shell { width: calc(100% - 40px); }
  .lx-header { height: 68px; }
  .lx-header nav { display: none; }
  .lx-header-action { padding: 10px 12px; gap: 15px; }
  .lx-hero { min-height: 0; }
  .lx-hero-content { padding-top: 40px; }
  .lx-hero-topline span:last-child { display: none; }
  .lx-hero h1 { font-size: clamp(68px, 12.4vw, 100px); line-height: .88; margin: 45px 0 32px; }
  .lx-hero-bottom { grid-template-columns: 1fr auto; gap: 35px 12px; align-items: end; }
  .lx-hero-description { grid-column: 1 / -1; }
  .lx-hero-description p { font-size: 14px; max-width: 390px; }
  .lx-hero-actions { justify-content: flex-start; gap: 18px; flex-wrap: wrap; }
  .lx-hero-mark span { display: none; }
  .lx-hero-mark svg { width: 50px; height: 50px; }
  .lx-preview-strip { grid-template-columns: 1fr; gap: 18px; margin-top: 45px; }
  .lx-preview-intro { flex-direction: row; justify-content: space-between; }
  .lx-preview-list { display: flex; gap: 12px; overflow-x: auto; padding-bottom: 5px; }
  .lx-preview-card { flex: 0 0 47%; }
  .lx-hero-foot { margin-top: 24px; }
  .lx-hero-foot span:first-child { max-width: 210px; }
  .lx-work,.lx-approach,.lx-process,.lx-start { padding: 75px 0 85px; }
  .lx-section-label span:last-child { text-align: right; }
  .lx-work-heading { grid-template-columns: 1fr; gap: 25px; margin: 55px 0 35px; }
  .lx-work-heading h2,.lx-approach h2,.lx-process h2,.lx-start h2 { font-size: clamp(60px, 11vw, 88px); }
  .lx-work-heading p { max-width: 390px; }
  .lx-index-bar { display: block; }
  .lx-index-count { margin-top: 15px !important; }
  .lx-project-grid { grid-template-columns: 1fr; gap: 48px; }
  .lx-project:nth-child(4n+2) { margin-top: 0; }
  .lx-placeholder-letter { font-size: 180px; }
  .lx-project-title h3 { font-size: 40px; }
  .lx-project-title p { max-width: 180px; }
  .lx-work-end { margin-top: 60px; }
  .lx-work-end span:first-child { max-width: 200px; }
  .lx-approach-heading { margin-top: 55px; }
  .lx-approach-body { grid-template-columns: 1fr; gap: 40px; margin-top: 55px; }
  .lx-approach-mark { min-height: 0; }
  .lx-approach-mark svg { width: 145px; }
  .lx-approach-copy { justify-self: start; }
  .lx-process-heading,.lx-start-heading { display: block; margin: 55px 0 50px; }
  .lx-process-heading p,.lx-start-heading p { margin-top: 25px; }
  .lx-steps { grid-template-columns: 1fr; gap: 35px; }
  .lx-steps h3 { margin-top: 26px; }
  .lx-brief { padding: 20px; }
  .lx-brief-text { margin: 30px 0 !important; }
  .lx-footer-top { grid-template-columns: 1fr 1fr; gap: 35px; padding-bottom: 45px; }
  .lx-footer-mark { width: 60px; height: 60px; }
}
@media (max-width:420px) {
  .lx-logo { font-size: 20px; }
  .lx-hero h1 { font-size: 67px; }
  .lx-hero-actions { display: grid; }
  .lx-button { min-height: 48px; }
  .lx-project-title { display: block; }
  .lx-project-title p { text-align: left; margin-top: 9px; max-width: none; }
  .lx-placeholder-top,.lx-placeholder-bottom { left: 12px; right: 12px; font-size: 8px; }
  .lx-placeholder-top { top: 12px; }
  .lx-placeholder-bottom { bottom: 12px; }
  .lx-section-label { font-size: 9px; }
  .lx-brief-bottom { align-items: end; }
}
]]>
    </file>
    <file path="src/app/(landingx)/landingx/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 70, background: "#BEAA97", color: "#4B3C2E" }}><div style={{ fontSize: 32, fontWeight: 700 }}>× &nbsp; landing—x</div><div style={{ display: "flex", flexDirection: "column", fontSize: 85, lineHeight: 1.05, letterSpacing: -3 }}><span>Ideas deserve</span><span>better landings.</span></div><div style={{ fontSize: 22 }}>A creative skill for landing pages.</div></div>, size);
}
]]>
    </file>
    <file path="src/app/(landingx)/landingx/page.tsx">
<![CDATA[import { Hero } from "./sections/Hero";
import { Gallery } from "./showcase/Gallery";
import { Approach } from "./sections/Approach";
import { Process } from "./sections/Process";
import { Start } from "./sections/Start";
import { Runtime } from "./motion/Runtime";
export default function Page() { return <><div className="lx-progress" aria-hidden="true"/><main><Hero/><Gallery/><Approach/><Process/><Start/></main><Runtime/></>; }
]]>
    </file>
    <file path="src/app/(landingx)/landingx/brand/Logo.tsx">
<![CDATA[export function XMark({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M8 8l32 32M40 8L8 40" stroke="currentColor" strokeWidth="5"/><path d="M24 2v8M24 38v8M2 24h8M38 24h8" stroke="currentColor" strokeWidth="1.5"/></svg>;
}
export function Logo() { return <span className="lx-logo"><XMark/><span>landing<span className="lx-logo-hyphen">—</span>x</span><small>®</small></span>; }
]]>
    </file>
    <file path="src/app/(landingx)/landingx/motion/Runtime.tsx">
<![CDATA["use client";
import { useEffect } from "react";

export function Runtime() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.setAttribute("data-in", "true"); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    document.querySelectorAll("[data-reveal]").forEach((node) => observer.observe(node));
    let frame = 0;
    const update = () => { frame = 0; const height = document.documentElement.scrollHeight - innerHeight; root.style.setProperty("--lx-progress", String(height > 0 ? scrollY / height : 0)); root.style.setProperty("--lx-shift", `${Math.min(scrollY * .035, 30)}px`); };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", scroll, { passive: true }); update();
    return () => { observer.disconnect(); window.removeEventListener("scroll", scroll); cancelAnimationFrame(frame); };
  }, []);
  return null;
}
]]>
    </file>
    <file path="src/app/(landingx)/landingx/sections/Approach.tsx">
<![CDATA[import { XMark } from "../brand/Logo";

export function Approach() {
  return <section className="lx-approach" id="approach"><div className="lx-shell"><div className="lx-section-label lx-mono" data-reveal="rise"><span>THE APPROACH &nbsp; / &nbsp; 02</span><span>A LITTLE MORE THOUGHT, EVERYWHERE</span></div><div className="lx-approach-heading" data-reveal="wipe"><h2>Not another page.<br/><em>Your point of view.</em></h2></div><div className="lx-approach-body"><div className="lx-approach-mark" aria-hidden="true"><XMark/><span className="lx-mono">CONSIDERED FROM<br/>THE FIRST IDEA.</span></div><div className="lx-approach-copy" data-reveal="rise"><span className="lx-small-label lx-mono">GOOD WORK STARTS HERE &nbsp; ↗</span><p>Landing X gives your agent a creative process to follow: find the central idea, build a visual world around it, and bring every detail to life.</p><p>Because the best landing page isn’t a formula. It’s a clear idea, made tangible.</p><a className="lx-inline-link" href="#process">See how it comes together <span>↘</span></a></div></div></div></section>;
}
]]>
    </file>
    <file path="src/app/(landingx)/landingx/sections/CopyBrief.tsx">
<![CDATA["use client";
import { useState } from "react";
const brief = "Create a landing page template for my project. Start with the audience and the central idea, then develop the visual direction, page, motion, and responsive details.";
export function CopyBrief() {
  const [message, setMessage] = useState("");
  async function copy() {
    try { await navigator.clipboard.writeText(brief); setMessage("Copied. Paste it into your agent to start."); }
    catch { setMessage("Copy isn’t available here. Select the brief and copy it manually."); }
  }
  return <div className="lx-brief"><div className="lx-brief-top lx-mono"><span>STARTER BRIEF</span><span>01 / YOUR TURN</span></div><p className="lx-brief-text">{brief}</p><div className="lx-brief-bottom"><span className="lx-mono">MAKE IT YOUR OWN &nbsp; ↗</span><button type="button" className="lx-copy-button" onClick={copy}>Copy brief <span>↗</span></button></div><p className="lx-copy-status" role="status">{message}</p></div>;
}
]]>
    </file>
    <file path="src/app/(landingx)/landingx/sections/Hero.tsx">
<![CDATA[import { Logo, XMark } from "../brand/Logo";
import { Picture } from "../assets";
import { projects } from "../showcase/projects";

export function Hero() {
  return <section className="lx-hero" id="top"><header className="lx-header lx-shell"><a href="#top" aria-label="Landing X, back to top"><Logo/></a><nav aria-label="Main navigation"><a href="#work">The work</a><a href="#approach">The approach</a><a href="#start">Get started</a></nav><a className="lx-header-action" href="#start">Start a brief <span>↗</span></a></header>
    <div className="lx-hero-content lx-shell"><div className="lx-hero-topline lx-mono"><span>A CREATIVE SKILL FOR YOUR AGENT</span><span>LANDING PAGES, WITH INTENT &nbsp; / &nbsp; 001</span></div><h1><span>Your idea deserves</span><span>a better <em>landing.</em></span></h1><div className="lx-hero-bottom"><div className="lx-hero-description"><span className="lx-tiny-x">×</span><p>Landing X turns a good brief into a landing page with a point of view. Made with your agent, shaped around your idea.</p></div><div className="lx-hero-actions"><a className="lx-button lx-button-dark" href="#work">Explore the work <span>↘</span></a><a className="lx-inline-link" href="#start">Start with a brief <span>↗</span></a></div><div className="lx-hero-mark" aria-hidden="true"><XMark/><span>MAKE A LITTLE<br/>MORE OF IT.</span></div></div><div className="lx-preview-strip"><div className="lx-preview-intro lx-mono"><span>SELECTED IN THE STUDIO</span><span>THREE OF SIX &nbsp; ↘</span></div><div className="lx-preview-list">{projects.slice(0,3).map((project,index) => <a className="lx-preview-card" href={project.href} key={project.asset} aria-label={`Explore the ${project.name} landing page`}><div className="lx-preview-media"><Picture assetKey={project.asset} name={project.name} monogram={project.monogram}/></div><span className="lx-mono">0{index+1} / {project.name.toUpperCase()} <b>↗</b></span></a>)}</div></div><div className="lx-hero-foot lx-mono"><span>STRATEGY / IDENTITY / DESIGN / BUILD</span><span>SCROLL TO EXPLORE &nbsp; ↓</span></div></div>
  </section>;
}
]]>
    </file>
    <file path="src/app/(landingx)/landingx/sections/Process.tsx">
<![CDATA[const steps = [
  { n: "01", title: "Find the idea.", text: "Start with what makes your project itself. The audience, the offer, and the one thing worth remembering." },
  { n: "02", title: "Give it a world.", text: "Build a visual language around that idea, from the type and color to the moments between sections." },
  { n: "03", title: "Make it real.", text: "Turn the direction into a responsive page, then refine its details, interactions, and handoff." },
];
export function Process() {
  return <section className="lx-process" id="process"><div className="lx-shell"><div className="lx-section-label lx-mono" data-reveal="rise"><span>FROM BRIEF TO BUILD &nbsp; / &nbsp; 03</span><span>THE PROCESS IN THREE MOVES</span></div><div className="lx-process-heading" data-reveal="rise"><h2>Good ideas<br/><em>go further.</em></h2><p>A little structure leaves more room for the interesting parts.</p></div><div className="lx-steps">{steps.map((step, index) => <article key={step.n} data-reveal="card" style={{ "--i": index } as React.CSSProperties}><div className="lx-step-top lx-mono"><span>{step.n} / 03</span><span>✳</span></div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div></section>;
}
]]>
    </file>
    <file path="src/app/(landingx)/landingx/sections/Start.tsx">
<![CDATA[import { Logo, XMark } from "../brand/Logo";
import { CopyBrief } from "./CopyBrief";
export function Start() {
  return <><section className="lx-start" id="start"><div className="lx-shell"><div className="lx-section-label lx-mono" data-reveal="rise"><span>YOUR TURN &nbsp; / &nbsp; 04</span><span>THE NEXT GOOD IDEA IS YOURS</span></div><div className="lx-start-heading" data-reveal="rise"><h2>Make room for<br/><em>the real thing.</em></h2><p>Bring the idea. Your agent can help turn it into a landing page worth spending time with.</p></div><CopyBrief/></div></section><footer className="lx-footer"><div className="lx-shell"><div className="lx-footer-top"><a href="#top" aria-label="Landing X, back to top"><Logo/></a><p>A better beginning<br/>for what you’re building.</p><nav aria-label="Footer navigation"><a href="#work">The work</a><a href="#approach">The approach</a><a href="#start">Start a brief</a></nav><XMark className="lx-footer-mark"/></div><div className="lx-footer-bottom lx-mono"><span>LANDING X &nbsp; / &nbsp; A CREATIVE AGENT SKILL</span><a href="#top">BACK TO THE TOP ↑</a></div></div></footer></>;
}
]]>
    </file>
    <file path="src/app/(landingx)/landingx/showcase/Gallery.tsx">
<![CDATA["use client";
import { useState } from "react";
import { Picture } from "../assets";
import { categories, filterProjects, projects, type Category } from "./projects";

export function Gallery() {
  const [category, setCategory] = useState<Category>("all");
  const visible = filterProjects(category);
  return <section className="lx-work" id="work"><div className="lx-shell"><div className="lx-section-label lx-mono" data-reveal="rise"><span>THE WORK &nbsp; / &nbsp; 01</span><span>AN INDEX OF DISTINCT IDEAS</span></div><div className="lx-work-heading" data-reveal="wipe"><h2>Different briefs.<br/><em>Distinct worlds.</em></h2><p>One creative process, many ways to make an impression. A selection of landing pages made with Landing X.</p></div>
    <div className="lx-index-bar"><div className="lx-filters" role="group" aria-label="Filter landing pages">{categories.map((item) => <button type="button" key={item.id} data-category={item.id} aria-pressed={category === item.id} aria-controls="lx-project-grid" onClick={() => setCategory(item.id)}>{item.label}</button>)}</div><p className="lx-index-count lx-mono" aria-live="polite">SHOWING {String(visible.length).padStart(2,"0")} / {String(projects.length).padStart(2,"0")}</p></div>
    <div className="lx-project-grid" id="lx-project-grid" key={category}>{visible.map((project, index) => <article className="lx-project" data-category={project.kind} key={project.asset} style={{ "--i": index } as React.CSSProperties}><a href={project.href} aria-label={`Explore the ${project.name} landing page`}><div className="lx-project-media"><Picture assetKey={project.asset} name={project.name} monogram={project.monogram}/><span className="lx-project-visit" aria-hidden="true">VIEW PROJECT ↗</span></div><div className="lx-project-meta lx-mono"><span>{String(projects.indexOf(project)+1).padStart(2,"0")} / {project.industry}</span><span>LANDING PAGE &nbsp; ↗</span></div><div className="lx-project-title"><h3>{project.name}</h3><p>{project.line}</p></div></a></article>)}</div>
    <div className="lx-work-end lx-mono"><span>THE RIGHT PAGE IS NEVER ONE SIZE FITS ALL.</span><span>END OF INDEX &nbsp; / &nbsp; 06</span></div></div></section>;
}
]]>
    </file>
    <file path="src/app/(landingx)/landingx/showcase/projects.ts">
<![CDATA[export type Category = "all" | "product" | "culture" | "place";
export type Project = { name: string; kind: Exclude<Category, "all">; industry: string; line: string; href: string; asset: string; monogram: string };
export const projects: Project[] = [
  { name: "Avel", kind: "product", industry: "AI PLATFORM", line: "A little more room for good thinking.", href: "/avel", asset: "work-avel", monogram: "A" },
  { name: "Pello", kind: "product", industry: "PERSONAL FINANCE", line: "Money for the life you want.", href: "/pello", asset: "work-pello", monogram: "P" },
  { name: "Satsuma", kind: "culture", industry: "CREATIVE STUDIO", line: "Reels that land, made by hand.", href: "/satsuma", asset: "work-satsuma", monogram: "S" },
  { name: "Firstday", kind: "culture", industry: "LEARNING", line: "A little experience changes everything.", href: "/firstday", asset: "work-firstday", monogram: "F" },
  { name: "Rill", kind: "place", industry: "LAND & WATER", line: "A better way to hold water.", href: "/rill", asset: "work-rill", monogram: "R" },
  { name: "Hiyas", kind: "place", industry: "EXPEDITIONS", line: "A more considered way to climb.", href: "/hiyas", asset: "work-hiyas", monogram: "H" },
];
export const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All work" }, { id: "product", label: "Product" }, { id: "culture", label: "Culture" }, { id: "place", label: "Place" },
];
export function filterProjects(category: Category) { return category === "all" ? projects : projects.filter((project) => project.kind === category); }
]]>
    </file>
  </files>
</template>
