<template slug="afterwalk" name="AFTERWALK">
  <dependencies>
    {
      "dependencies": {}
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(afterwalk)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces, IBM_Plex_Mono } from "next/font/google";
import "./afterwalk/afterwalk.css";

const sans = DM_Sans({ subsets: ["latin"], variable: "--aw-font-dm", display: "swap" });
const serif = Fraunces({ subsets: ["latin"], variable: "--aw-font-fraunces", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--aw-font-mono", display: "swap", preload: false });

export const metadata: Metadata = {
  title: "AFTERWALK — A little more outside",
  description: "A fictional neighborhood walking club for good company and the long way home.",
};

export const viewport: Viewport = { themeColor: "#1E3529" };

export default function AfterwalkLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="aw-body">
        <noscript><style>{".aw-js-only{display:none!important}[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}"}</style></noscript>
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(afterwalk)/afterwalk/afterwalk.css">
<![CDATA[@import "tailwindcss";

@theme {
  --aw-ink: #1E3529;
  --aw-paper: #F7F5EB;
  --aw-white: #FBFAF3;
  --aw-lime: #DAE870;
  --aw-sage: #ABC6A2;
  --aw-peach: #E9BA9F;
  --aw-butter: #F3E7B6;
  --aw-muted: #607168;
  --aw-ease: cubic-bezier(.22, 1, .36, 1);
  --aw-ease-sweep: cubic-bezier(.76, 0, .24, 1);
  --aw-duration-fast: 180ms;
  --aw-duration-base: 420ms;
  --aw-duration-slow: 800ms;
}

html { scroll-behavior: smooth; }
.aw-body { margin: 0; background: var(--aw-paper); color: var(--aw-ink); font-family: var(--aw-font-dm), sans-serif; -webkit-font-smoothing: antialiased; }
.aw-body *, .aw-body *::before, .aw-body *::after { box-sizing: border-box; }
.aw-body a { color: inherit; text-decoration: none; }
.aw-body button, .aw-body input, .aw-body select { font: inherit; }
.aw-body button { cursor: pointer; }
.aw-body :focus-visible { outline: 3px solid var(--aw-ink); outline-offset: 4px; }
.aw-body h1, .aw-body h2, .aw-body h3, .aw-body p { margin: 0; }
.aw-body section { scroll-margin-top: 24px; }
.aw-container { width: min(100% - 112px, 1360px); margin-inline: auto; }
.aw-section { padding-block: 128px; }
.aw-skip { position: fixed; z-index: 100; top: 8px; left: 8px; background: var(--aw-lime); padding: 12px; transform: translateY(-160%); }
.aw-skip:focus { transform: translateY(0); }
.aw-header { position: relative; z-index: 20; background: var(--aw-paper); }
.aw-header-inner { height: 86px; display: flex; align-items: center; justify-content: space-between; gap: 32px; border-bottom: 1px solid color-mix(in srgb, var(--aw-ink) 24%, transparent); }
.aw-logo { display: inline-flex; align-items: center; gap: 8px; flex: 0 0 auto; font-size: 25px; font-weight: 800; letter-spacing: -.065em; line-height: 1; }
.aw-logo svg { width: 28px; height: 28px; }
.aw-logo-dot { color: var(--aw-muted); }
.aw-nav { display: flex; align-items: center; gap: 42px; font-size: 14px; font-weight: 600; }
.aw-nav a:not(.aw-nav-mobile-cta), .aw-footer nav a { position: relative; }
.aw-nav a:not(.aw-nav-mobile-cta)::after, .aw-footer nav a::after { content: ""; position: absolute; left: 0; right: 0; bottom: -5px; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: right; transition: transform var(--aw-duration-base) var(--aw-ease); }
.aw-nav a:hover::after, .aw-nav a:focus-visible::after, .aw-footer nav a:hover::after, .aw-footer nav a:focus-visible::after { transform: scaleX(1); transform-origin: left; }
.aw-nav-mobile-cta, .aw-menu { display: none; }
.aw-button { display: inline-flex; min-height: 54px; align-items: center; justify-content: space-between; gap: 28px; padding: 0 22px; border: 1px solid transparent; border-radius: 100px; font-size: 14px; font-weight: 700; white-space: nowrap; transition: background-color var(--aw-duration-fast) var(--aw-ease), color var(--aw-duration-fast) var(--aw-ease), transform var(--aw-duration-fast) var(--aw-ease); }
.aw-button span { font-size: 19px; line-height: 1; transition: transform var(--aw-duration-base) var(--aw-ease); }
.aw-button:hover span, .aw-button:focus-visible span { transform: translate(3px,-3px); }
.aw-button:active { transform: scale(.97); }
.aw-button-outline { border-color: var(--aw-ink); }
.aw-button-outline:hover { background: var(--aw-ink); color: var(--aw-paper); }
.aw-button-dark { background: var(--aw-ink); color: var(--aw-paper) !important; }
.aw-button-dark:hover { background: var(--aw-muted); }
.aw-button-lime { background: var(--aw-lime); color: var(--aw-ink) !important; }
.aw-button-lime:hover { background: var(--aw-white); }
.aw-hero { overflow: clip; }
.aw-hero-grid { display: grid; grid-template-columns: .93fr 1.07fr; gap: clamp(40px, 6vw, 104px); align-items: center; padding-top: 56px; }
.aw-hero-copy { padding-block: 30px 18px; }
.aw-eyebrow, .aw-kicker, .aw-section-head, .aw-hero-bottom, .aw-photo-caption, .aw-image-label, .aw-walk-art-top, .aw-map-label, .aw-walk-meta, .aw-filter-note, .aw-ticket-top, .aw-ticket-bottom, .aw-footer-bottom { font-family: var(--aw-font-mono), monospace; font-size: 10px; line-height: 1.5; letter-spacing: .09em; font-weight: 500; }
.aw-eyebrow { display: flex; align-items: center; gap: 9px; }
.aw-dot { width: 8px; height: 8px; flex: 0 0 auto; background: var(--aw-ink); border-radius: 50%; }
.aw-hero h1 { margin-top: 28px; font-family: var(--aw-font-fraunces), Georgia, serif; font-size: clamp(68px, 6.15vw, 100px); letter-spacing: -.065em; font-weight: 500; line-height: .99; text-wrap: balance; }
.aw-hero h1 em, .aw-intro h2 em, .aw-walks h2 em, .aw-together h2 em, .aw-plan h2 em, .aw-faq h2 em, .aw-footer h2 em { font-style: normal; color: var(--aw-muted); }
.aw-hero-lede { max-width: 420px; margin-top: 28px !important; font-size: 17px; line-height: 1.7; color: var(--aw-muted); text-wrap: pretty; }
.aw-hero-actions { display: flex; align-items: center; gap: 20px; margin-top: 32px; }
.aw-action-note { max-width: 95px; color: var(--aw-muted); font-size: 12px; line-height: 1.45; }
.aw-hero-foot { display: flex; gap: 14px; align-items: center; margin-top: 78px; }
.aw-avatars { display: flex; padding-left: 0; }
.aw-avatars span { display: grid; place-items: center; width: 32px; height: 32px; border: 2px solid var(--aw-paper); border-radius: 50%; background: var(--aw-sage); color: var(--aw-ink); font-size: 10px; font-weight: 700; }
.aw-avatars span + span { margin-left: -8px; }
.aw-avatars span:nth-child(2) { background: var(--aw-peach); }
.aw-avatars span:nth-child(3) { background: var(--aw-lime); font-size: 17px; }
.aw-hero-foot p { font-size: 11px; line-height: 1.5; color: var(--aw-muted); }
.aw-hero-foot strong { color: var(--aw-ink); font-weight: 600; }
.aw-hero-visual { position: relative; min-width: 0; }
.aw-photo-mat { position: relative; margin-left: 22px; }
.aw-hero-photo { display: block; overflow: hidden; aspect-ratio: 1.03; background: var(--aw-sage); }
.aw-hero-photo img, .aw-together-image picture img { display: block; width: 100%; height: 100%; object-fit: cover; }
.aw-hero-photo img { object-position: 48% 50%; }
.aw-photo-caption { display: flex; justify-content: space-between; gap: 12px; margin-top: 10px; font-size: 9px; color: var(--aw-muted); }
.aw-stamp { position: absolute; right: -22px; bottom: 52px; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 124px; height: 124px; border: 1px solid var(--aw-ink); border-radius: 50%; background: var(--aw-lime); color: var(--aw-ink); transform: rotate(11deg); font-family: var(--aw-font-mono), monospace; font-size: 8px; letter-spacing: .06em; text-align: center; }
.aw-stamp b { font-size: 38px; line-height: 1.2; font-weight: 400; }
.aw-hero-note { position: absolute; left: 40px; top: 24px; display: flex; align-items: center; gap: 4px; color: var(--aw-paper); font-family: var(--aw-font-mono), monospace; font-size: 9px; line-height: 1.5; letter-spacing: .06em; }
.aw-hero-note svg { width: 39px; }
.aw-hero-bottom { display: flex; justify-content: space-between; gap: 20px; padding-block: 39px 23px; color: var(--aw-muted); font-size: 9px; }
.aw-hero-bottom a { color: var(--aw-ink); }
.aw-hero-bottom a span { padding-left: 12px; }
.aw-band { overflow: hidden; background: var(--aw-ink); color: var(--aw-paper); }
.aw-band-track { width: max-content; display: flex; align-items: center; gap: 44px; padding: 17px 30px; font-family: var(--aw-font-mono), monospace; font-size: 11px; letter-spacing: .12em; }
.aw-band b { color: var(--aw-lime); font-family: sans-serif; font-size: 23px; font-weight: 400; line-height: 1; }
.aw-section-head { display: flex; justify-content: space-between; gap: 20px; align-items: center; border-top: 1px solid color-mix(in srgb, var(--aw-ink) 30%, transparent); padding-top: 16px; color: var(--aw-muted); }
.aw-kicker { color: var(--aw-ink); }
.aw-intro { background: var(--aw-white); }
.aw-intro-grid { position: relative; display: grid; grid-template-columns: 1.15fr .65fr; gap: 8%; align-items: end; padding-top: 80px; }
.aw-intro h2, .aw-walks h2, .aw-together h2, .aw-plan h2, .aw-faq h2, .aw-footer h2 { font-family: var(--aw-font-fraunces), Georgia, serif; font-size: clamp(50px, 5.5vw, 84px); font-weight: 500; line-height: 1.03; letter-spacing: -.055em; text-wrap: balance; }
.aw-intro-copy { max-width: 395px; padding-bottom: 8px; }
.aw-intro-copy p, .aw-together-copy > p, .aw-plan-intro > p, .aw-faq-grid > div > p { font-size: 16px; line-height: 1.75; color: var(--aw-muted); text-wrap: pretty; }
.aw-intro-copy p + p { margin-top: 16px; }
.aw-text-link, .aw-text-button { display: inline-flex; gap: 24px; align-items: center; margin-top: 28px; padding-bottom: 7px; border: 0; border-bottom: 1px solid currentColor; background: none; font-size: 13px; font-weight: 700; }
.aw-text-link span, .aw-text-button span { transition: transform var(--aw-duration-base) var(--aw-ease); }
.aw-text-link:hover span { transform: translate(3px,-3px); }
.aw-doodle { position: absolute; width: 150px; top: -2px; right: 7%; color: var(--aw-muted); transform: rotate(10deg); }
.aw-doodle svg { width: 100%; }
.aw-walks { background: var(--aw-paper); }
.aw-walks-heading { display: flex; justify-content: space-between; align-items: end; gap: 30px; padding-top: 74px; }
.aw-walks-heading > div:first-child { max-width: 740px; }
.aw-walks-heading p { max-width: 450px; margin-top: 24px; color: var(--aw-muted); font-size: 16px; line-height: 1.7; }
.aw-walks-scribble { padding: 0 35px 12px 0; font-family: var(--aw-font-fraunces), Georgia, serif; font-size: 22px; line-height: 1.15; transform: rotate(-7deg); color: var(--aw-muted); }
.aw-walks-scribble span { display: inline-block; font-family: sans-serif; font-size: 30px; }
.aw-filter-row { display: flex; justify-content: space-between; align-items: center; gap: 20px; margin-top: 64px; margin-bottom: 24px; }
.aw-filters { display: flex; flex-wrap: wrap; gap: 8px; }
.aw-filters button { min-height: 40px; padding: 0 17px; border: 1px solid color-mix(in srgb, var(--aw-ink) 25%, transparent); border-radius: 100px; background: transparent; color: var(--aw-ink); font-size: 12px; font-weight: 600; transition: background var(--aw-duration-fast), color var(--aw-duration-fast); }
.aw-filters button:hover, .aw-filters button.is-active { color: var(--aw-paper); background: var(--aw-ink); border-color: var(--aw-ink); }
.aw-filter-note { color: var(--aw-muted); white-space: nowrap; }
.aw-walk-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; align-items: stretch; }
.aw-walk-card { display: flex; flex-direction: column; min-width: 0; background: var(--aw-white); border: 1px solid color-mix(in srgb, var(--aw-ink) 15%, transparent); transition: transform var(--aw-duration-base) var(--aw-ease); }
@media (hover: hover) and (pointer: fine) { .aw-walk-card:hover { transform: translateY(-5px); } }
.aw-walk-art { position: relative; height: clamp(190px, 20vw, 260px); overflow: hidden; padding: 18px; }
.aw-walk-art-green { background: var(--aw-sage); }
.aw-walk-art-peach { background: var(--aw-peach); }
.aw-walk-art-yellow { background: var(--aw-butter); }
.aw-walk-art-top { position: relative; z-index: 1; display: flex; justify-content: space-between; color: var(--aw-ink); font-size: 9px; }
.aw-walk-art-top span:last-child { font-size: 16px; line-height: 1; }
.aw-route-art { position: absolute; inset: 22px 0 0; width: 100%; height: 85%; color: var(--aw-ink); }
.aw-map-block { fill: color-mix(in srgb, var(--aw-white) 35%, transparent); }
.aw-map-street { stroke: color-mix(in srgb, var(--aw-ink) 20%, transparent); stroke-width: 1.4; }
.aw-map-route { stroke: var(--aw-ink); stroke-width: 3.3; stroke-linecap: round; stroke-dasharray: 5 6; }
.aw-map-point { fill: var(--aw-ink); stroke: var(--aw-white); stroke-width: 3; }
.aw-map-spark { stroke: var(--aw-ink); stroke-width: 1.5; }
.aw-map-label { position: absolute; right: 18px; bottom: 12px; font-size: 8px; }
.aw-walk-body { display: flex; flex: 1; flex-direction: column; padding: 24px; }
.aw-walk-meta { display: flex; justify-content: space-between; gap: 8px; color: var(--aw-muted); font-size: 9px; text-transform: uppercase; }
.aw-walk-body h3 { margin-top: 19px; font-family: var(--aw-font-fraunces), Georgia, serif; font-size: clamp(25px, 2.3vw, 33px); font-weight: 500; line-height: 1.1; letter-spacing: -.04em; }
.aw-walk-body > p { margin-top: 12px; color: var(--aw-muted); font-size: 14px; line-height: 1.65; }
.aw-walk-bottom { display: flex; align-items: end; justify-content: space-between; gap: 12px; padding-top: 26px; margin-top: auto; font-size: 12px; font-weight: 600; }
.aw-walk-bottom i { padding-inline: 4px; font-style: normal; color: var(--aw-muted); }
.aw-card-action { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-width: 104px; min-height: 46px; padding: 0 14px; border: 1px solid var(--aw-ink); border-radius: 24px; background: transparent; color: var(--aw-ink); font-size: 12px; font-weight: 700; transition: background var(--aw-duration-fast), color var(--aw-duration-fast), transform var(--aw-duration-fast); }
.aw-card-action span { font-size: 17px; }
.aw-card-action:hover { color: var(--aw-paper); background: var(--aw-ink); }
.aw-card-action:active { transform: scale(.94); }
.aw-sample-note { margin-top: 22px !important; color: var(--aw-muted); font-size: 11px; line-height: 1.6; }
.aw-plan { background: var(--aw-lime); }
.aw-plan-grid { display: grid; grid-template-columns: 1fr .78fr; align-items: center; gap: 12%; }
.aw-plan-intro h2 { margin-top: 26px; }
.aw-plan-intro h2 em { color: color-mix(in srgb, var(--aw-ink) 62%, var(--aw-lime)); }
.aw-plan-intro > p { max-width: 360px; margin-top: 22px; color: var(--aw-ink); }
.aw-plan-doodle { margin-top: 44px; font-size: 58px; line-height: 1; }
.aw-plan-form-wrap { background: var(--aw-white); border: 1px solid var(--aw-ink); }
.aw-ticket-top, .aw-ticket-bottom { display: flex; justify-content: space-between; gap: 10px; padding: 18px 24px; }
.aw-ticket-top { border-bottom: 1px dashed color-mix(in srgb, var(--aw-ink) 45%, transparent); }
.aw-ticket-bottom { border-top: 1px dashed color-mix(in srgb, var(--aw-ink) 45%, transparent); align-items: center; }
.aw-ticket-bottom span:last-child { font-family: sans-serif; font-size: 24px; line-height: 1; }
.aw-plan form, .aw-success { padding: 34px 32px 30px; }
.aw-plan-form-wrap h3 { font-family: var(--aw-font-fraunces), Georgia, serif; font-size: 31px; font-weight: 500; letter-spacing: -.035em; line-height: 1.1; }
.aw-form-intro { margin-top: 9px !important; margin-bottom: 24px !important; color: var(--aw-muted); font-size: 13px; line-height: 1.5; }
.aw-plan label { display: block; margin: 18px 0 7px; font-size: 12px; font-weight: 700; }
.aw-plan input, .aw-plan select { width: 100%; min-height: 50px; padding: 0 14px; border: 1px solid color-mix(in srgb, var(--aw-ink) 32%, transparent); border-radius: 2px; color: var(--aw-ink); background: var(--aw-white); font-size: 14px; }
.aw-plan input::placeholder { color: var(--aw-muted); }
.aw-form-button { width: 100%; margin-top: 24px; }
.aw-local-note { margin-top: 14px !important; color: var(--aw-muted); font-size: 11px; line-height: 1.6; }
.aw-form-error { margin-top: 10px !important; color: var(--aw-ink); font-size: 12px; font-weight: 700; }
.aw-success { min-height: 370px; }
.aw-success-mark { display: block; margin-bottom: 20px; font-size: 42px; line-height: 1; }
.aw-success h3 { margin-top: 16px; }
.aw-success > p:not(.aw-local-note) { margin-top: 15px; color: var(--aw-muted); font-size: 14px; line-height: 1.6; }
.aw-together { background: var(--aw-white); }
.aw-together-grid { display: grid; grid-template-columns: 1.08fr .8fr; gap: 10%; align-items: center; padding-top: 70px; }
.aw-together-image { position: relative; align-self: stretch; min-height: 560px; background: var(--aw-sage); overflow: hidden; }
.aw-together-image picture { display: block; width: 100%; height: 100%; position: absolute; inset: 0; }
.aw-together-image img { object-position: 50% 50%; }
.aw-image-label { position: absolute; left: 20px; bottom: 20px; background: var(--aw-paper); padding: 10px 12px; font-size: 9px; }
.aw-together h2 { margin-top: 22px; font-size: clamp(48px, 4.8vw, 72px); }
.aw-together-copy > p { margin-top: 24px; }
.aw-values { margin-top: 28px; border-top: 1px solid color-mix(in srgb, var(--aw-ink) 23%, transparent); }
.aw-values > div { display: grid; grid-template-columns: 38px 1fr; gap: 10px; padding: 16px 0; border-bottom: 1px solid color-mix(in srgb, var(--aw-ink) 23%, transparent); }
.aw-values > div > span { font-family: var(--aw-font-mono), monospace; font-size: 10px; color: var(--aw-muted); }
.aw-values p { color: var(--aw-muted); font-size: 13px; line-height: 1.6; }
.aw-values strong { color: var(--aw-ink); font-weight: 700; }
.aw-faq { background: var(--aw-paper); }
.aw-faq-grid { display: grid; grid-template-columns: .8fr 1fr; gap: 14%; }
.aw-faq h2 { margin-top: 24px; }
.aw-faq-grid > div > p { margin-top: 22px; }
.aw-faq-list { border-top: 1px solid color-mix(in srgb, var(--aw-ink) 28%, transparent); }
.aw-faq-list details { border-bottom: 1px solid color-mix(in srgb, var(--aw-ink) 28%, transparent); }
.aw-faq-list summary { display: grid; grid-template-columns: 36px 1fr 28px; align-items: center; gap: 12px; min-height: 74px; cursor: pointer; font-size: 15px; font-weight: 600; list-style: none; }
.aw-faq-list summary::-webkit-details-marker { display: none; }
.aw-faq-number { font-family: var(--aw-font-mono), monospace; color: var(--aw-muted); font-size: 10px; }
.aw-faq-plus { justify-self: end; font-size: 25px; font-weight: 400; transition: transform var(--aw-duration-base) var(--aw-ease); }
.aw-faq-list details[open] .aw-faq-plus { transform: rotate(45deg); }
.aw-faq-list details p { padding: 0 40px 24px 48px; color: var(--aw-muted); font-size: 14px; line-height: 1.7; }
.aw-footer { padding-top: 100px; background: var(--aw-ink); color: var(--aw-paper); }
.aw-footer :focus-visible { outline-color: var(--aw-lime); }
.aw-footer .aw-kicker { color: var(--aw-sage); }
.aw-footer-top { display: grid; grid-template-columns: 1fr .7fr .35fr; gap: 30px; align-items: end; padding-bottom: 100px; }
.aw-footer h2 { margin-top: 24px; font-size: clamp(64px, 8vw, 116px); }
.aw-footer h2 em { color: var(--aw-sage); }
.aw-footer .aw-button { margin-top: 32px; }
.aw-footer-sun { color: var(--aw-lime); font-size: clamp(110px, 20vw, 250px); line-height: .8; text-align: center; }
.aw-footer nav { display: flex; flex-direction: column; align-items: flex-start; gap: 17px; font-size: 13px; }
.aw-footer-bottom { display: flex; align-items: center; justify-content: space-between; gap: 20px; border-top: 1px solid color-mix(in srgb, var(--aw-paper) 30%, transparent); padding-block: 24px; color: var(--aw-sage); font-size: 9px; }
.aw-footer-bottom .aw-logo { color: var(--aw-paper); font-family: var(--aw-font-dm), sans-serif; font-size: 24px; letter-spacing: -.065em; }
.aw-footer-bottom a:last-child { color: var(--aw-paper); }
.aw-photo-placeholder { display: grid; place-items: center; min-height: 300px; background: var(--aw-sage); font-family: var(--aw-font-mono), monospace; font-size: 12px; }

@media (prefers-reduced-motion: no-preference) {
  [data-reveal][data-motion-ready="true"] { transition: opacity var(--aw-duration-slow) var(--aw-ease), transform var(--aw-duration-slow) var(--aw-ease), clip-path var(--aw-duration-slow) var(--aw-ease-sweep); }
  [data-reveal="rise"][data-motion-ready="true"]:not([data-in="true"]) { opacity: 0; transform: translateY(24px); }
  [data-reveal="mask"][data-motion-ready="true"]:not([data-in="true"]) { opacity: 0; transform: translateY(24px); clip-path: inset(0 0 35% 0); }
  [data-reveal="wipe"][data-motion-ready="true"]:not([data-in="true"]) { clip-path: inset(0 0 100% 0); }
  .aw-hero-copy { animation: aw-hero-in var(--aw-duration-slow) var(--aw-ease) both; }
  .aw-hero-visual { animation: aw-hero-photo-in 1s var(--aw-ease) both; }
  @keyframes aw-hero-in { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes aw-hero-photo-in { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
}
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; } }

@media (min-width: 761px) and (max-height: 700px) {
  .aw-hero-grid { padding-top: 24px; }
  .aw-hero-copy { padding-block: 10px; }
  .aw-hero .aw-hero-copy h1 { margin-top: 16px; font-size: clamp(48px, 5.8vw, 70px); }
  .aw-hero-lede { margin-top: 16px !important; font-size: 15px; line-height: 1.5; }
  .aw-hero-actions { margin-top: 20px; }
  .aw-hero-foot { display: none; }
  .aw-hero-photo { aspect-ratio: 1.15; }
  .aw-hero-bottom { padding-block: 22px 18px; }
}
@media (max-width: 1000px) {
  .aw-container { width: min(100% - 64px, 1360px); }
  .aw-nav { gap: 22px; }
  .aw-hero-grid { gap: 28px; }
  .aw-hero h1 { font-size: clamp(58px, 7vw, 80px); }
  .aw-stamp { width: 100px; height: 100px; right: -14px; font-size: 7px; }
  .aw-intro-grid { gap: 5%; }
  .aw-doodle { width: 115px; right: 3%; }
  .aw-walk-body { padding: 19px; }
  .aw-together-grid { gap: 6%; }
  .aw-together-image { min-height: 510px; }
}
@media (max-width: 760px) {
  .aw-container { width: calc(100% - 40px); }
  .aw-section { padding-block: 80px; }
  .aw-header-inner { height: auto; min-height: 72px; gap: 12px; flex-wrap: wrap; }
  .aw-logo { font-size: 23px; }
  .aw-header-cta { display: none; }
  .aw-menu { display: flex; flex-direction: column; justify-content: center; gap: 5px; width: 44px; height: 44px; border: 1px solid var(--aw-ink); border-radius: 50%; background: transparent; align-items: center; }
  .aw-menu span { display: block; width: 17px; height: 1.5px; background: var(--aw-ink); }
  .aw-nav { position: static; order: 3; display: flex; flex-basis: 100%; flex-wrap: wrap; gap: 14px; padding: 8px 0 18px; font-size: 12px; }
  .aw-enhanced .aw-nav { display: none; position: absolute; top: 72px; left: 0; right: 0; padding: 24px 20px 30px; background: var(--aw-paper); border-bottom: 1px solid var(--aw-ink); }
  .aw-enhanced .aw-nav.is-open { display: flex; flex-direction: column; align-items: stretch; gap: 0; }
  .aw-enhanced .aw-nav.is-open > a { padding: 13px 0; font-size: 18px; }
  .aw-enhanced .aw-nav.is-open .aw-nav-mobile-cta { display: flex; justify-content: space-between; margin-top: 14px; padding: 16px 20px; border-radius: 60px; color: var(--aw-paper); background: var(--aw-ink); font-size: 14px; }
  .aw-hero-grid { grid-template-columns: 1fr; gap: 34px; padding-top: 28px; }
  .aw-hero-copy { padding: 5px 0 0; }
  .aw-hero h1 { margin-top: 21px; font-size: clamp(58px, 12.5vw, 78px); }
  .aw-hero-lede { margin-top: 19px !important; font-size: 15px; line-height: 1.65; }
  .aw-hero-actions { margin-top: 24px; }
  .aw-hero-actions .aw-button { gap: 12px; padding-inline: 18px; font-size: 13px; }
  .aw-hero-foot { margin-top: 28px; }
  .aw-photo-mat { margin-left: 0; }
  .aw-hero-photo { aspect-ratio: 1.1; }
  .aw-stamp { right: -8px; bottom: 33px; width: 96px; height: 96px; }
  .aw-stamp b { font-size: 29px; }
  .aw-hero-note { left: 14px; top: 14px; }
  .aw-hero-bottom { padding-block: 24px; }
  .aw-hero-bottom > span { max-width: 150px; }
  .aw-band-track { gap: 28px; padding: 14px 20px; }
  .aw-section-head { font-size: 9px; }
  .aw-section-head > span:last-child { text-align: right; }
  .aw-intro-grid { grid-template-columns: 1fr; gap: 26px; padding-top: 58px; }
  .aw-intro h2, .aw-walks h2, .aw-together h2, .aw-plan h2, .aw-faq h2 { font-size: clamp(48px, 10vw, 68px); }
  .aw-walks h2 { font-size: clamp(40px, 10vw, 58px); }
  .aw-doodle { width: 90px; top: -10px; right: -5px; }
  .aw-intro-copy { padding: 0; }
  .aw-walks-heading { align-items: start; padding-top: 56px; }
  .aw-walks-heading p { font-size: 15px; }
  .aw-walks-scribble { display: none; }
  .aw-filter-row { align-items: flex-start; flex-direction: column; gap: 13px; margin-top: 38px; }
  .aw-walk-grid { grid-template-columns: 1fr; gap: 16px; }
  .aw-walk-art { height: 220px; }
  .aw-walk-body h3 { font-size: 30px; }
  .aw-plan-grid { grid-template-columns: 1fr; gap: 42px; }
  .aw-plan-doodle { display: none; }
  .aw-plan form, .aw-success { padding: 28px 22px; }
  .aw-ticket-top, .aw-ticket-bottom { padding-inline: 20px; }
  .aw-together-grid { grid-template-columns: 1fr; gap: 38px; padding-top: 48px; }
  .aw-together-image { min-height: 430px; }
  .aw-faq-grid { grid-template-columns: 1fr; gap: 36px; }
  .aw-faq-list summary { font-size: 14px; }
  .aw-footer { padding-top: 72px; }
  .aw-footer-top { grid-template-columns: 1fr auto; padding-bottom: 65px; }
  .aw-footer-top > div:first-child { grid-column: 1 / -1; }
  .aw-footer-sun { grid-column: 2; grid-row: 2; align-self: end; font-size: 110px; }
  .aw-footer nav { grid-column: 1; grid-row: 2; margin-top: 30px; }
  .aw-footer-bottom { align-items: flex-start; flex-wrap: wrap; gap: 20px 25px; }
  .aw-footer-bottom .aw-logo { flex-basis: 100%; }
}
]]>
    </file>
    <file path="src/app/(afterwalk)/afterwalk/assets.generated.ts">
<![CDATA[// Generated by scripts/process-images.ts — do not edit by hand.
export const ASSETS: Record<string, { w: number; h: number }> = {
  "hero": { "w": 1536, "h": 1024 },
  "together": { "w": 1536, "h": 1024 },
};
]]>
    </file>
    <file path="src/app/(afterwalk)/afterwalk/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

type PictureProps = { assetKey: string; alt: string; className?: string; priority?: boolean; sizes?: string };

export function Picture({ assetKey, alt, className, priority = false, sizes = "(max-width: 760px) 100vw, 55vw" }: PictureProps) {
  const asset = ASSETS[assetKey];
  if (!asset) return <div className={`aw-photo-placeholder ${className ?? ""}`} role="img" aria-label={alt}><span>{assetKey}</span></div>;
  const base = `/templates/afterwalk/${assetKey}`;
  return <picture className={className}>
    <source type="image/avif" srcSet={`${base}-800.avif 800w, ${base}-1600.avif 1600w`} sizes={sizes} />
    <img src={`${base}-800.webp`} srcSet={`${base}-800.webp 800w, ${base}-1600.webp 1600w`} sizes={sizes} width={asset.w} height={asset.h} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" />
  </picture>;
}
]]>
    </file>
    <file path="src/app/(afterwalk)/afterwalk/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#1E3529"/><path d="M32 9v46M9 32h46M15.75 15.75l32.5 32.5M48.25 15.75l-32.5 32.5" stroke="#DAE870" stroke-width="4"/><circle cx="32" cy="32" r="8" fill="#DAE870"/></svg>
]]>
    </file>
    <file path="src/app/(afterwalk)/afterwalk/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Afterwalk — good things happen on foot";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "62px 72px", background: "#F7F5EB", color: "#1E3529", fontFamily: "sans-serif" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 30, fontWeight: 700 }}><span>✳ afterwalk.</span><span style={{ fontSize: 16, letterSpacing: "0.14em" }}>A LITTLE MORE OUTSIDE</span></div>
    <div style={{ display: "flex", flexDirection: "column", fontSize: 86, fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.06em" }}><span>Good things happen</span><span>on foot.</span></div>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20 }}><span>A walking club for the long way home.</span><span>GOOD COMPANY ↗</span></div>
  </div>, size);
}
]]>
    </file>
    <file path="src/app/(afterwalk)/afterwalk/page.tsx">
<![CDATA[import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Intro } from "./sections/Intro";
import { WalkFinder } from "./walks/WalkFinder";
import { FAQ } from "./sections/FAQ";
import { Footer } from "./sections/Footer";
import { MotionEffects } from "./motion/MotionEffects";

export default function AfterwalkPage() {
  return <>
    <a className="aw-skip" href="#main">Skip to content</a>
    <MotionEffects />
    <Header />
    <main id="main">
      <Hero />
      <Intro />
      <WalkFinder />
      <FAQ />
    </main>
    <Footer />
  </>;
}
]]>
    </file>
    <file path="src/app/(afterwalk)/afterwalk/brand/Logo.tsx">
<![CDATA[export function Logo({ light = false }: { light?: boolean }) {
  return <a className={`aw-logo${light ? " aw-logo-light" : ""}`} href="#top" aria-label="Afterwalk, back to top">
    <svg viewBox="0 0 34 34" width="34" height="34" fill="none" aria-hidden="true"><path d="M17 2.5v29M2.5 17h29M6.8 6.8l20.4 20.4M27.2 6.8 6.8 27.2" stroke="currentColor" strokeWidth="2.4"/><circle cx="17" cy="17" r="5.2" fill="currentColor"/></svg>
    <span>afterwalk<span className="aw-logo-dot">.</span></span>
  </a>;
}
]]>
    </file>
    <file path="src/app/(afterwalk)/afterwalk/motion/MotionEffects.tsx">
<![CDATA["use client";
import { useEffect } from "react";

export function MotionEffects() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.in = "true";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top >= window.innerHeight) element.dataset.motionReady = "true";
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  return null;
}
]]>
    </file>
    <file path="src/app/(afterwalk)/afterwalk/sections/FAQ.tsx">
<![CDATA[const QUESTIONS = [
  ["Do I need to be a serious walker?", "Not at all. Afterwalk is about the pleasure of getting outside, not speed or step counts."],
  ["What should I bring?", "Comfortable shoes, a little water, and whatever helps you enjoy the weather."],
  ["Can I come on my own?", "Absolutely. Showing up solo is a lovely way to meet someone along the way."],
  ["Are these real scheduled walks?", "No. Afterwalk is a fictional club and the routes on this page are examples."],
  ["Does making a walk card reserve a place?", "No. The card is created locally in your browser. Nothing is booked or sent."],
];

export function FAQ() {
  return <section className="aw-faq aw-section" id="questions"><div className="aw-container aw-faq-grid"><div data-reveal="rise"><span className="aw-kicker">THE LITTLE DETAILS</span><h2>Before you<br /><em>head out.</em></h2><p>A few things you might be wondering.</p></div><div className="aw-faq-list" data-reveal="rise">{QUESTIONS.map(([question, answer], index) => <details key={question}><summary><span className="aw-faq-number">0{index + 1}</span><span>{question}</span><span className="aw-faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>;
}
]]>
    </file>
    <file path="src/app/(afterwalk)/afterwalk/sections/Footer.tsx">
<![CDATA[import { Logo } from "../brand/Logo";

export function Footer() {
  return <footer className="aw-footer"><div className="aw-container"><div className="aw-footer-top"><div><span className="aw-kicker">A LITTLE MORE OUTSIDE</span><h2>See you<br /><em>out there.</em></h2><a className="aw-button aw-button-lime" href="#walks">Find your kind of walk <span aria-hidden="true">↗</span></a></div><div className="aw-footer-sun" aria-hidden="true">✳</div><nav aria-label="Footer navigation"><a href="#about">The idea</a><a href="#walks">The walks</a><a href="#together">The company</a><a href="#questions">Good to know</a></nav></div><div className="aw-footer-bottom"><Logo light /><span>MADE FOR TAKING THE LONG WAY.</span><span>A FICTIONAL CLUB · LOCAL DEMO</span><a href="#top">BACK TO TOP ↑</a></div></div></footer>;
}
]]>
    </file>
    <file path="src/app/(afterwalk)/afterwalk/sections/Header.tsx">
<![CDATA["use client";
import { useEffect, useState } from "react";
import { Logo } from "../brand/Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.documentElement.classList.add("aw-enhanced");
    return () => document.documentElement.classList.remove("aw-enhanced");
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return <header className="aw-header">
    <div className="aw-header-inner aw-container">
      <Logo />
      <nav className={`aw-nav${open ? " is-open" : ""}`} id="aw-nav" aria-label="Main navigation">
        <a href="#about" onClick={() => setOpen(false)}>The idea</a>
        <a href="#walks" onClick={() => setOpen(false)}>The walks</a>
        <a href="#together" onClick={() => setOpen(false)}>The company</a>
        <a className="aw-nav-mobile-cta" href="#walks" onClick={() => setOpen(false)}>Find a walk <span aria-hidden="true">↗</span></a>
      </nav>
      <a className="aw-header-cta aw-button aw-button-outline" href="#walks">Find a walk <span aria-hidden="true">↗</span></a>
      <button className="aw-menu aw-js-only" type="button" aria-expanded={open} aria-controls="aw-nav" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}><span /><span /></button>
    </div>
  </header>;
}
]]>
    </file>
    <file path="src/app/(afterwalk)/afterwalk/sections/Hero.tsx">
<![CDATA[import { Picture } from "../assets";

export function Hero() {
  return <section className="aw-hero" id="top">
    <div className="aw-container aw-hero-grid">
      <div className="aw-hero-copy">
        <div className="aw-eyebrow aw-hero-eyebrow"><span className="aw-dot" /> A LITTLE MORE OUTSIDE</div>
        <h1>Good things<br />happen<br /><em>on foot.</em></h1>
        <p className="aw-hero-lede">A walking club for getting out of your head, into your neighborhood, and maybe making a friend or two along the way.</p>
        <div className="aw-hero-actions"><a className="aw-button aw-button-dark" href="#walks">Find your kind of walk <span aria-hidden="true">↗</span></a><span className="aw-action-note">No rush. No finish line.</span></div>
        <div className="aw-hero-foot"><div className="aw-avatars" aria-hidden="true"><span>A</span><span>W</span><span>✳</span></div><p>For the long way home<br /><strong>and the people you meet there.</strong></p></div>
      </div>
      <div className="aw-hero-visual">
        <div className="aw-photo-mat"><Picture assetKey="hero" alt="Two friends walking together beside a leafy city river" className="aw-hero-photo" priority sizes="(max-width: 760px) 100vw, 55vw" /><div className="aw-photo-caption"><span>THE WORLD CAN WAIT A MINUTE.</span><span>NO. 001 / THE RIVER</span></div></div>
        <div className="aw-stamp" aria-label="Good company, easy pace"><span>GOOD COMPANY</span><b>✳</b><span>EASY PACE</span></div>
        <div className="aw-hero-note"><span>TAKE THE<br />SCENIC ROUTE</span><svg viewBox="0 0 48 45" fill="none" aria-hidden="true"><path d="M3 3c21 0 29 11 32 30m-9-5 9 8 8-10" stroke="currentColor" strokeWidth="1.6"/></svg></div>
      </div>
    </div>
    <div className="aw-hero-bottom aw-container"><span>EST. FOR THE SAKE OF GETTING OUT</span><a href="#about">A LITTLE FURTHER DOWN <span aria-hidden="true">↓</span></a></div>
  </section>;
}
]]>
    </file>
    <file path="src/app/(afterwalk)/afterwalk/sections/Intro.tsx">
<![CDATA[export function Intro() {
  return <>
    <div className="aw-band" aria-label="Less scrolling, more strolling"><div className="aw-band-track" aria-hidden="true"><span>LESS SCROLLING</span><b>✳</b><span>MORE STROLLING</span><b>✳</b><span>GOOD COMPANY</span><b>✳</b><span>LESS SCROLLING</span><b>✳</b><span>MORE STROLLING</span><b>✳</b><span>GOOD COMPANY</span><b>✳</b></div></div>
    <section className="aw-intro aw-section" id="about">
      <div className="aw-container">
        <div className="aw-section-head" data-reveal="rise"><span className="aw-kicker">01 / THE IDEA</span><span>GOOD WALKS. BETTER COMPANY.</span></div>
        <div className="aw-intro-grid">
          <h2 data-reveal="mask">Not a race.<br />Not a workout.<br /><em>Just a walk.</em></h2>
          <div className="aw-intro-copy" data-reveal="rise"><p>Somewhere between your front door and wherever you end up, things start to feel a little lighter.</p><p>Afterwalk is a fictional neighborhood club built around a very simple idea: a good walk is even better together.</p><a className="aw-text-link" href="#together">A little more about us <span aria-hidden="true">↗</span></a></div>
          <div className="aw-doodle" aria-hidden="true"><svg viewBox="0 0 180 180" fill="none"><circle cx="90" cy="90" r="68" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 7"/><path d="M33 124c16-36 29 2 44-21 12-18 5-35 24-34 14 1 14 26 29 18 9-4 11-13 17-22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><circle cx="33" cy="124" r="5" fill="currentColor"/><path d="m138 61 12 2-4 12" stroke="currentColor" strokeWidth="2"/><text x="90" y="24" textAnchor="middle" fill="currentColor" fontSize="9" letterSpacing="2">TAKE YOUR TIME</text></svg></div>
        </div>
      </div>
    </section>
  </>;
}
]]>
    </file>
    <file path="src/app/(afterwalk)/afterwalk/sections/Together.tsx">
<![CDATA[import { Picture } from "../assets";

export function Together() {
  return <section className="aw-together aw-section" id="together">
    <div className="aw-container"><div className="aw-section-head" data-reveal="rise"><span className="aw-kicker">03 / THE GOOD COMPANY</span><span>COME AS YOU ARE</span></div>
      <div className="aw-together-grid"><div className="aw-together-image" data-reveal="wipe"><Picture assetKey="together" alt="Friends sitting together after a walk in the park" sizes="(max-width: 760px) 100vw, 55vw" /><span className="aw-image-label">A GOOD DAY, OUTSIDE ↗</span></div>
        <div className="aw-together-copy" data-reveal="rise"><span className="aw-kicker">A CLUB WITH ROOM FOR EVERYONE</span><h2>The best part<br />isn&apos;t the <em>destination.</em></h2><p>It&apos;s the tiny discoveries, the conversations that wander, and getting home feeling a little more like yourself.</p><div className="aw-values"><div><span>01</span><p><strong>Come as you are.</strong><br />No fancy gear or fast pace required.</p></div><div><span>02</span><p><strong>Walk your own way.</strong><br />Easy routes and plenty of room to pause.</p></div><div><span>03</span><p><strong>Leave with a story.</strong><br />And maybe a new favorite corner of town.</p></div></div><a className="aw-text-link" href="#walks">Find a walk that fits <span aria-hidden="true">↗</span></a></div></div>
    </div>
  </section>;
}
]]>
    </file>
    <file path="src/app/(afterwalk)/afterwalk/walks/WalkFinder.tsx">
<![CDATA["use client";
import { useRef, useState, type FormEvent } from "react";
import { filterWalks, makeWalkCard, WALKS, type Walk, type WalkFilter } from "./walks";
import { Together } from "../sections/Together";

const FILTERS: { value: WalkFilter; label: string }[] = [
  { value: "all", label: "All walks" },
  { value: "short", label: "An hour or less" },
  { value: "evening", label: "After work" },
];

function RouteArt({ color }: { color: Walk["color"] }) {
  return <svg className={`aw-route-art aw-route-art-${color}`} viewBox="0 0 360 210" fill="none" aria-hidden="true">
    <path className="aw-map-block" d="M-20 45 100-10l50 66-83 50zM194-15l118 25 62 61-69 42-91-50zM-10 165l103-42 63 42-20 65H-10zM224 153l115-38 39 40v78H206z" />
    <path className="aw-map-street" d="M-5 121 369 28M70-10l121 236M-5 59l369 118M254-15 144 228" />
    <path className="aw-map-route" d={color === "green" ? "M46 157c38-9 42-42 77-42s42 30 79 5 46-57 96-48" : color === "peach" ? "M45 139c33-52 62-57 90-32 27 24 48 61 80 32 20-18 29-64 81-53" : "M51 145c32-5 43-43 79-33 37 10 39 33 76 13s51-65 102-52"} />
    <circle className="aw-map-point" cx="47" cy={color === "peach" ? "139" : color === "green" ? "157" : "145"} r="7"/><circle className="aw-map-point" cx={color === "yellow" ? "307" : color === "peach" ? "296" : "298"} cy={color === "yellow" ? "73" : color === "peach" ? "86" : "72"} r="7"/>
    <path className="aw-map-spark" d="M285 28v20m-10-10h20M80 61v14m-7-7h14" />
  </svg>;
}

export function WalkFinder() {
  const [filter, setFilter] = useState<WalkFilter>("all");
  const [selected, setSelected] = useState("river");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [card, setCard] = useState<ReturnType<typeof makeWalkCard>>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const visible = filterWalks(WALKS, filter);

  function choose(id: string) {
    setSelected(id);
    setCard(null);
    setError("");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("plan")?.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });
    window.setTimeout(() => nameRef.current?.focus({ preventScroll: true }), reducedMotion ? 0 : 350);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = makeWalkCard(name, selected);
    if (!result) {
      setError("Add your name (up to 80 characters) and choose a walk.");
      nameRef.current?.focus();
      return;
    }
    setError("");
    setCard(result);
  }

  return <>
    <section className="aw-walks aw-section" id="walks">
      <div className="aw-container">
        <div className="aw-section-head" data-reveal="rise"><span className="aw-kicker">02 / FIND YOUR FEET</span><span>YOUR NEXT GOOD IDEA →</span></div>
        <div className="aw-walks-heading" data-reveal="rise"><div><h2>A walk for<br /><em>any kind of day.</em></h2><p>Whether you have an hour or an entire afternoon, there&apos;s a little outside with your name on it.</p></div><div className="aw-walks-scribble" aria-hidden="true">the best part<br />is showing up <span>↙</span></div></div>
        <div className="aw-filter-row"><div className="aw-filters aw-js-only" aria-label="Filter walks">
          {FILTERS.map((item) => <button key={item.value} type="button" className={filter === item.value ? "is-active" : ""} aria-pressed={filter === item.value} onClick={() => setFilter(item.value)}>{item.label}</button>)}
        </div><span className="aw-filter-note" aria-live="polite">{visible.length} sample {visible.length === 1 ? "walk" : "walks"}</span></div>
        <div className="aw-walk-grid">
          {visible.map((walk) => <article className="aw-walk-card" key={walk.id}>
            <div className={`aw-walk-art aw-walk-art-${walk.color}`}><div className="aw-walk-art-top"><span>THE WALK FILES / {walk.number}</span><span>↗</span></div><RouteArt color={walk.color} /><div className="aw-map-label">A GOOD WAY TO GET THERE</div></div>
            <div className="aw-walk-body"><div className="aw-walk-meta"><span>{walk.when}</span><span>{walk.duration} MIN</span></div><h3>{walk.name}</h3><p>{walk.description}</p><div className="aw-walk-bottom"><span>{walk.distance} <i>·</i> {walk.terrain}</span><button className="aw-card-action aw-js-only" type="button" aria-label={`Choose ${walk.name}`} onClick={() => choose(walk.id)}>Choose <span aria-hidden="true">↗</span></button></div></div>
          </article>)}
        </div>
        <p className="aw-sample-note">These are sample walks for a fictional club. No actual meetups are scheduled.</p>
      </div>
    </section>
    <Together />
    <section className="aw-plan aw-section" id="plan">
      <div className="aw-container aw-plan-grid">
        <div className="aw-plan-intro" data-reveal="rise"><span className="aw-kicker">A LITTLE SOMETHING TO LOOK FORWARD TO</span><h2>Shall we<br /><em>take a walk?</em></h2><p>Pick a route and make yourself a little reminder. Your shoes can take it from there.</p><div className="aw-plan-doodle" aria-hidden="true">✳</div></div>
        <div className="aw-plan-form-wrap" data-reveal="rise">
          <div className="aw-ticket-top"><span>AFTERWALK / YOUR WALK CARD</span><span>NO. 001</span></div>
          {card ? <div className="aw-success" role="status"><span className="aw-success-mark" aria-hidden="true">✳</span><span className="aw-kicker">ALL SET FOR A LITTLE OUTSIDE</span><h3>See you out there, {card.name}.</h3><p>Your sample pick: <strong>{card.walk.name}</strong>. {card.walk.when} · {card.walk.distance}.</p><p className="aw-local-note">This card is a local preview. No meetup is booked and nothing was sent.</p><button className="aw-text-button" type="button" onClick={() => setCard(null)}>Make another card ↗</button></div> : <form className="aw-js-only" onSubmit={submit} noValidate>
            <h3>Make it a walk date.</h3><p className="aw-form-intro">A small reminder to take the long way.</p>
            <label htmlFor="aw-name">Your first name</label><input ref={nameRef} id="aw-name" name="name" value={name} maxLength={81} onChange={(event) => setName(event.target.value)} placeholder="e.g. Sam" aria-invalid={!!error} aria-describedby={error ? "aw-form-error" : undefined} />
            <label htmlFor="aw-walk">Your kind of walk</label><select id="aw-walk" value={selected} onChange={(event) => setSelected(event.target.value)}>{WALKS.map((walk) => <option key={walk.id} value={walk.id}>{walk.name} · {walk.duration} min</option>)}</select>
            {error && <p className="aw-form-error" id="aw-form-error" role="alert">{error}</p>}
            <button className="aw-button aw-button-dark aw-form-button" type="submit">Make my walk card <span aria-hidden="true">↗</span></button>
            <p className="aw-local-note">Just a demo: your card stays in this browser. No booking, no messages, no data sent.</p>
          </form>}
          <noscript><p className="aw-local-note">The walk card needs JavaScript. You can still read all the sample walks above.</p></noscript>
          <div className="aw-ticket-bottom"><span>FRESH AIR IS A GOOD IDEA.</span><span>✳</span></div>
        </div>
      </div>
    </section>
  </>;
}
]]>
    </file>
    <file path="src/app/(afterwalk)/afterwalk/walks/walks.ts">
<![CDATA[export type Walk = {
  id: string;
  number: string;
  name: string;
  description: string;
  duration: number;
  distance: string;
  time: "morning" | "evening";
  when: string;
  meeting: string;
  terrain: string;
  color: "green" | "peach" | "yellow";
};

export type WalkFilter = "all" | "short" | "evening";

export const WALKS: Walk[] = [
  {
    id: "river",
    number: "01",
    name: "The riverside ramble",
    description: "A little water, a lot of sky, and the long way home.",
    duration: 65,
    distance: "4.2 km",
    time: "evening",
    when: "Wednesdays, 6:15 pm",
    meeting: "The old boathouse",
    terrain: "Mostly flat",
    color: "green",
  },
  {
    id: "park",
    number: "02",
    name: "Park & pastry",
    description: "A little green, a good chat, and something sweet after.",
    duration: 50,
    distance: "3.1 km",
    time: "morning",
    when: "Saturdays, 9:30 am",
    meeting: "The park gates",
    terrain: "Easy paths",
    color: "peach",
  },
  {
    id: "sunset",
    number: "03",
    name: "The long way home",
    description: "For the evenings when you're not quite ready to go in.",
    duration: 60,
    distance: "3.8 km",
    time: "evening",
    when: "Fridays, 5:45 pm",
    meeting: "The corner kiosk",
    terrain: "Gentle slopes",
    color: "yellow",
  },
];

export function filterWalks(walks: readonly Walk[], filter: WalkFilter): Walk[] {
  if (filter === "short") return walks.filter((walk) => walk.duration <= 60);
  if (filter === "evening") return walks.filter((walk) => walk.time === "evening");
  return [...walks];
}

export function makeWalkCard(name: string, walkId: string, walks: readonly Walk[] = WALKS): { name: string; walk: Walk } | null {
  const cleanName = name.trim();
  const walk = walks.find((item) => item.id === walkId);
  if (!cleanName || cleanName.length > 80 || !walk) return null;
  return { name: cleanName, walk };
}
]]>
    </file>
  </files>
</template>
