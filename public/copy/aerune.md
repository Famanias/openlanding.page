<template slug="aerune" name="AERUNE">
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
    <file path="src/app/(aerune)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./aerune/aerune.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-aerune-geist", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-aerune-mono", display: "swap" });

export const metadata: Metadata = {
  title: "AERUNE — make room for better air",
  description: "A fictional indoor air intelligence platform, explored through an interactive building day.",
};

export const viewport: Viewport = { themeColor: "#101A1D", width: "device-width", initialScale: 1 };

export default function AeruneLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="ar-body">
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('ar-js')" }} />
        <noscript><style>{"[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}"}</style></noscript>
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/aerune.css">
<![CDATA[@import "tailwindcss";

@theme {
  --color-ar-night: #101A1D;
  --color-ar-paper: #F3EFE5;
  --color-ar-porcelain: #FCFAF4;
  --color-ar-mist: #C6D8CF;
  --color-ar-slate: #A6B3AC;
  --color-ar-ember: #ED7546;
  --color-ar-forest: #203631;
  --ar-ease-out: cubic-bezier(.22, 1, .36, 1);
  --ar-ease-in-out: cubic-bezier(.76, 0, .24, 1);
  --ar-dur-instant: 120ms;
  --ar-dur-fast: 240ms;
  --ar-dur-base: 480ms;
  --ar-dur-slow: 800ms;
  --ar-dur-hero: 1200ms;
  --ar-stagger: 70ms;
  --ar-shift: 28px;
}

html:has(.ar-body) { scroll-behavior: smooth; }
.ar-body { margin: 0; background: var(--color-ar-paper); color: var(--color-ar-night); font-family: var(--font-aerune-geist), sans-serif; -webkit-font-smoothing: antialiased; }
.ar-body *, .ar-body *::before, .ar-body *::after { box-sizing: border-box; }
.ar-body ::selection { background: var(--color-ar-ember); color: var(--color-ar-night); }
.ar-body a { color: inherit; text-decoration: none; }
.ar-body button, .ar-body input { font: inherit; }
.ar-body button { cursor: pointer; }
.ar-body button:disabled { cursor: wait; opacity: .65; }
.ar-body :focus-visible { outline: 3px solid var(--color-ar-ember); outline-offset: 4px; }
.ar-body p, .ar-body h1, .ar-body h2, .ar-body h3 { margin: 0; }
.ar-body h1, .ar-body h2, .ar-body h3 { text-wrap: balance; font-weight: 500; }
.ar-body p { text-wrap: pretty; }
.ar-body section[id] { scroll-margin-top: 90px; }
.ar-progress { position: fixed; z-index: 100; top: 0; left: 0; right: 0; height: 2px; pointer-events: none; }
.ar-progress span { display: block; height: 100%; background: var(--color-ar-ember); transform: scaleX(var(--ar-page-progress, 0)); transform-origin: left; }
.ar-section { width: min(100% - 9.4vw, 1320px); margin-inline: auto; }
.ar-eyebrow, .ar-ui-label { font-family: var(--font-aerune-mono), monospace; font-size: 10px; font-weight: 500; letter-spacing: .09em; line-height: 1.5; }
.ar-eyebrow::before { content: ""; display: inline-block; width: 7px; height: 7px; margin-right: 10px; border-radius: 50%; background: var(--color-ar-ember); vertical-align: 1px; }
.ar-status-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: var(--color-ar-ember); vertical-align: 1px; }

/* Brand and shared controls */
.ar-logo { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
.ar-logo__mark { display: block; width: 34px; height: 34px; }
.ar-logo__word { font-size: 25px; font-weight: 650; letter-spacing: -.075em; line-height: 1; }
.ar-logo__dot { color: var(--color-ar-ember); }
.ar-action { display: inline-flex; align-items: center; justify-content: space-between; gap: 32px; min-height: 56px; padding: 6px 6px 6px 22px; border: 0; border-radius: 100px; background: var(--color-ar-ember); color: var(--color-ar-night) !important; font-size: 14px; font-weight: 600; overflow: hidden; transition: transform var(--ar-dur-fast) var(--ar-ease-out), background var(--ar-dur-fast) var(--ar-ease-out); }
.ar-action__arrow { display: grid; place-items: center; width: 44px; height: 44px; flex: 0 0 auto; border-radius: 50%; background: var(--color-ar-night); color: var(--color-ar-paper); font-size: 19px; transition: transform var(--ar-dur-base) var(--ar-ease-out); }
.ar-action--light { background: var(--color-ar-paper); }
.ar-action:active { transform: scale(.97); }
.ar-placeholder { position: relative; overflow: hidden; background: var(--color-ar-forest); color: var(--color-ar-mist); }
.ar-placeholder > span { position: absolute; bottom: 18px; left: 20px; z-index: 1; font-family: var(--font-aerune-mono), monospace; font-size: 9px; letter-spacing: .08em; opacity: .65; text-transform: uppercase; }

/* Hero and navigation */
.ar-hero { position: relative; isolation: isolate; overflow: hidden; min-height: 1020px; margin: 12px; border-radius: 22px; background: var(--color-ar-night); color: var(--color-ar-paper); }
.ar-hero__image { position: absolute; z-index: -4; inset: 0; display: block; width: 100%; height: 100%; }
.ar-hero__image img { width: 100%; height: 100%; object-fit: cover; }
.ar-hero__image.ar-placeholder { background: var(--color-ar-forest); }
.ar-hero__image.ar-placeholder > span { bottom: 24px; opacity: .5; }
.ar-hero__wash { position: absolute; z-index: -3; inset: 0; background: linear-gradient(180deg, color-mix(in srgb, var(--color-ar-night) 90%, transparent) 0%, color-mix(in srgb, var(--color-ar-night) 72%, transparent) 48%, var(--color-ar-night) 100%); }
.ar-hero__contours { position: absolute; z-index: -2; top: 80px; left: -6%; width: 112%; height: 720px; color: var(--color-ar-mist); opacity: .16; transform: translate3d(0, calc(var(--ar-hero-scroll, 0) * .08px), 0); pointer-events: none; }
.ar-header { position: relative; z-index: 20; display: flex; align-items: center; justify-content: space-between; gap: 30px; width: min(100% - 80px, 1320px); height: 94px; margin: auto; transition: height var(--ar-dur-base) var(--ar-ease-out); }
.ar-header__brand { flex: 1; }
.ar-desktop-nav { display: flex; align-items: center; gap: 36px; font-size: 13px; color: color-mix(in srgb, var(--color-ar-paper) 77%, transparent); }
.ar-desktop-nav a, .ar-footer nav a { position: relative; padding-block: 10px; }
.ar-desktop-nav a::after, .ar-footer nav a::after { content: ""; position: absolute; right: 0; bottom: 3px; left: 0; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: left; transition: transform var(--ar-dur-base) var(--ar-ease-out); }
.ar-header__cta { display: inline-flex; justify-content: center; align-items: center; gap: 25px; min-height: 44px; margin-left: auto; padding: 0 8px 0 18px; border: 1px solid color-mix(in srgb, var(--color-ar-paper) 30%, transparent); border-radius: 100px; font-size: 12px; transition: border-color var(--ar-dur-fast), background var(--ar-dur-fast); }
.ar-header__cta span { display: grid; width: 30px; height: 30px; place-items: center; border-radius: 50%; background: var(--color-ar-paper); color: var(--color-ar-night); font-size: 15px; }
.ar-mobile-toggle { display: none; }
.ar-mobile-nav { position: fixed; z-index: 50; inset: 0; display: flex; flex-direction: column; padding: 28px; background: var(--color-ar-night); color: var(--color-ar-paper); }
.ar-mobile-nav__top { display: flex; justify-content: space-between; align-items: center; }
.ar-mobile-close { display: grid; place-items: center; width: 48px; height: 48px; border: 1px solid var(--color-ar-slate); border-radius: 50%; background: none; color: inherit; font-size: 28px; }
.ar-mobile-nav__links { display: grid; gap: 0; margin-block: auto; }
.ar-mobile-nav__links a { display: flex; justify-content: space-between; padding: 20px 0; border-bottom: 1px solid color-mix(in srgb, var(--color-ar-paper) 25%, transparent); font-size: clamp(27px, 8vw, 44px); letter-spacing: -.05em; }
.ar-mobile-nav__links a span { font-size: 20px; }
.ar-mobile-nav__request { padding: 16px 20px; border-radius: 100px; background: var(--color-ar-ember); color: var(--color-ar-night) !important; text-align: center; }
.ar-mobile-nav p { margin-top: 30px; font-family: var(--font-aerune-mono), monospace; font-size: 10px; color: var(--color-ar-slate); }
.ar-hero__copy { position: relative; z-index: 1; width: min(90%, 800px); margin: 94px auto 0; text-align: center; }
.ar-hero__eyebrow { display: inline-flex; align-items: center; gap: 10px; margin-bottom: 24px !important; color: var(--color-ar-mist); font-family: var(--font-aerune-mono), monospace; font-size: 10px; letter-spacing: .11em; }
.ar-hero__eyebrow span { width: 8px; height: 8px; border-radius: 50%; background: var(--color-ar-ember); }
.ar-hero h1 { font-size: clamp(58px, 6.2vw, 94px); line-height: .98; letter-spacing: -.065em; }
.ar-hero h1 i { color: var(--color-ar-mist); font-style: normal; }
.ar-hero__description { max-width: 570px; margin: 26px auto 26px !important; color: color-mix(in srgb, var(--color-ar-paper) 75%, transparent); font-size: 16px; line-height: 1.65; }
.ar-hero__note { margin-top: 29px !important; color: var(--color-ar-slate); font-family: var(--font-aerune-mono), monospace; font-size: 9px; letter-spacing: .08em; }
.ar-hero__note span { margin-left: 12px; color: var(--color-ar-ember); font-size: 15px; }
.ar-hero__footer { display: flex; justify-content: space-between; padding: 25px 4.2% 28px; color: var(--color-ar-slate); font-family: var(--font-aerune-mono), monospace; font-size: 9px; letter-spacing: .06em; }

/* Hero product preview */
.ar-preview { position: relative; z-index: 2; width: min(74%, 1000px); margin: 72px auto 0; padding: 7px; border: 1px solid color-mix(in srgb, var(--color-ar-paper) 25%, transparent); border-radius: 17px 17px 0 0; background: color-mix(in srgb, var(--color-ar-night) 75%, transparent); box-shadow: 0 32px 100px color-mix(in srgb, var(--color-ar-night) 50%, transparent); }
.ar-preview__top { display: flex; justify-content: space-between; padding: 14px 17px; color: var(--color-ar-slate); font-family: var(--font-aerune-mono), monospace; font-size: 9px; letter-spacing: .06em; }
.ar-preview__top .ar-status-dot { margin-right: 6px; width: 6px; height: 6px; }
.ar-preview__mini { margin-left: 8px; color: var(--color-ar-paper); }
.ar-preview__body { padding: 26px 30px 22px; border-radius: 11px 11px 0 0; background: var(--color-ar-porcelain); color: var(--color-ar-night); }
.ar-preview__intro { display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; }
.ar-preview__intro h2 { margin-top: 10px; font-size: 27px; line-height: 1.1; letter-spacing: -.055em; }
.ar-preview__badge { padding: 8px 12px; border: 1px solid color-mix(in srgb, var(--color-ar-night) 12%, transparent); border-radius: 100px; font-size: 10px; white-space: nowrap; }
.ar-preview__badge .ar-status-dot { width: 6px; height: 6px; margin-right: 5px; }
.ar-preview__stats { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 25px; border-block: 1px solid color-mix(in srgb, var(--color-ar-night) 12%, transparent); }
.ar-preview__stats > div { display: flex; flex-direction: column; gap: 5px; padding: 15px 20px 15px 0; }
.ar-preview__stats > div + div { padding-left: 20px; border-left: 1px solid color-mix(in srgb, var(--color-ar-night) 12%, transparent); }
.ar-preview__stats span, .ar-preview__stats em { font-size: 10px; font-style: normal; color: color-mix(in srgb, var(--color-ar-night) 62%, transparent); }
.ar-preview__stats strong { font-size: 27px; line-height: 1.15; font-weight: 500; letter-spacing: -.05em; }
.ar-preview__stats small { font-size: 11px; font-weight: 400; letter-spacing: 0; }
.ar-preview__graph { padding-top: 18px; }
.ar-preview__graph-head, .ar-preview__hours { display: flex; justify-content: space-between; font-size: 10px; }
.ar-preview__graph-head span + span, .ar-preview__hours { color: color-mix(in srgb, var(--color-ar-night) 52%, transparent); font-family: var(--font-aerune-mono), monospace; font-size: 9px; }
.ar-preview__bars { display: flex; align-items: end; gap: 1.5%; height: 85px; margin-block: 12px 8px; border-bottom: 1px solid color-mix(in srgb, var(--color-ar-night) 15%, transparent); }
.ar-preview__bars span { flex: 1; height: calc(var(--bar) * 1%); border-radius: 3px 3px 0 0; background: var(--color-ar-mist); }
.ar-preview__bars .is-lit { background: var(--color-ar-forest); }

/* Statement, headings and live timeline */
.ar-statement { padding-block: 130px 100px; }
.ar-statement__meta { display: flex; justify-content: space-between; gap: 20px; font-family: var(--font-aerune-mono), monospace; font-size: 10px; color: color-mix(in srgb, var(--color-ar-night) 58%, transparent); }
.ar-statement > p { max-width: 1070px; margin: 70px 0 80px; font-size: clamp(35px, 4.6vw, 67px); line-height: 1.12; letter-spacing: -.065em; }
.ar-statement > p span { color: color-mix(in srgb, var(--color-ar-night) 40%, var(--color-ar-paper)); }
.ar-statement__rule { height: 1px; background: color-mix(in srgb, var(--color-ar-night) 20%, transparent); }
.ar-section-heading { display: grid; grid-template-columns: 1fr 2fr; gap: 30px; margin-bottom: 80px; }
.ar-section-heading > div { display: flex; justify-content: space-between; align-items: end; gap: 35px; }
.ar-section-heading h2, .ar-approach h2, .ar-workplace h2, .ar-faq h2, .ar-inquiry h2 { font-size: clamp(44px, 5vw, 72px); line-height: 1.02; letter-spacing: -.065em; }
.ar-section-heading h2 span, .ar-approach h2 span, .ar-workplace h2 span, .ar-faq h2 span, .ar-inquiry h2 span { color: color-mix(in srgb, currentColor 45%, transparent); }
.ar-section-heading > div > p { max-width: 280px; padding-bottom: 5px; color: color-mix(in srgb, var(--color-ar-night) 67%, transparent); font-size: 14px; line-height: 1.6; }
.ar-demo { padding: 30px 0 140px; }
.ar-timeline { display: grid; grid-template-columns: minmax(0, .82fr) minmax(0, 1.18fr); gap: 7%; min-height: 760px; }
.ar-timeline__story { padding: 38px 0 80px; }
.ar-timeline__story h3 { margin-top: 30px; font-size: clamp(30px, 3vw, 44px); line-height: 1.08; letter-spacing: -.055em; }
.ar-timeline__story > p:not(.ar-timeline__note) { max-width: 400px; margin-top: 20px; color: color-mix(in srgb, var(--color-ar-night) 65%, transparent); font-size: 15px; line-height: 1.7; }
.ar-time-buttons { display: grid; margin-top: 50px; border-top: 1px solid color-mix(in srgb, var(--color-ar-night) 18%, transparent); }
.ar-time-buttons button { display: grid; grid-template-columns: 45px 1fr auto; align-items: center; gap: 10px; min-height: 68px; padding: 0 14px 0 0; border: 0; border-bottom: 1px solid color-mix(in srgb, var(--color-ar-night) 18%, transparent); background: transparent; color: var(--color-ar-night); text-align: left; transition: padding var(--ar-dur-base) var(--ar-ease-out), color var(--ar-dur-fast); }
.ar-time-buttons button span, .ar-time-buttons button small { font-family: var(--font-aerune-mono), monospace; font-size: 10px; font-weight: 400; color: color-mix(in srgb, var(--color-ar-night) 52%, transparent); }
.ar-time-buttons button strong { font-size: 15px; font-weight: 500; }
.ar-time-buttons button[aria-pressed="true"] strong::before { content: ""; display: inline-block; width: 7px; height: 7px; margin-right: 10px; border-radius: 50%; background: var(--color-ar-ember); vertical-align: 2px; }
.ar-time-buttons button:active { transform: scale(.99); }
.ar-range-label { display: flex; justify-content: space-between; margin-top: 40px; font-family: var(--font-aerune-mono), monospace; font-size: 9px; letter-spacing: .05em; }
.ar-timeline input[type="range"] { width: 100%; height: 26px; margin: 12px 0 0; accent-color: var(--color-ar-ember); cursor: pointer; }
.ar-timeline__note { margin-top: 12px !important; font-family: var(--font-aerune-mono), monospace; font-size: 9px; color: color-mix(in srgb, var(--color-ar-night) 57%, transparent); }
.ar-timeline__sticky { position: sticky; top: 30px; align-self: start; }
.ar-instrument { overflow: hidden; border: 1px solid color-mix(in srgb, var(--color-ar-paper) 15%, transparent); border-radius: 24px; background: var(--color-ar-night); color: var(--color-ar-paper); box-shadow: 0 35px 70px color-mix(in srgb, var(--color-ar-night) 13%, transparent); }
.ar-instrument__top, .ar-instrument__scene-label, .ar-instrument__scene-bottom, .ar-demo-caption { display: flex; justify-content: space-between; gap: 12px; font-family: var(--font-aerune-mono), monospace; font-size: 9px; letter-spacing: .04em; }
.ar-instrument__top { padding: 22px 25px; color: var(--color-ar-slate); }
.ar-instrument__top .ar-status-dot { margin-right: 7px; }
.ar-instrument__scene { margin: 0 12px; padding: 20px 20px 18px; border: 1px solid color-mix(in srgb, var(--color-ar-mist) 18%, transparent); border-radius: 15px; background: var(--color-ar-forest); color: var(--color-ar-mist); }
.ar-instrument__scene-label, .ar-instrument__scene-bottom { color: color-mix(in srgb, var(--color-ar-mist) 70%, transparent); }
.ar-airflow { display: block; width: 100%; height: auto; margin-block: 14px; color: var(--color-ar-mist); }
.ar-instrument__metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; margin: 12px; border: 1px solid color-mix(in srgb, var(--color-ar-paper) 12%, transparent); border-radius: 14px; overflow: hidden; background: color-mix(in srgb, var(--color-ar-paper) 12%, transparent); }
.ar-instrument__metrics > div { display: flex; flex-direction: column; gap: 7px; min-width: 0; padding: 20px 14px; background: var(--color-ar-night); }
.ar-instrument__metrics span, .ar-instrument__metrics em { color: var(--color-ar-slate); font-size: 10px; font-style: normal; }
.ar-instrument__metrics strong { white-space: nowrap; font-size: clamp(23px, 2.1vw, 31px); font-weight: 500; letter-spacing: -.05em; }
.ar-instrument__metrics strong span { color: var(--color-ar-paper); font-size: inherit; }
.ar-instrument__metrics small { color: var(--color-ar-slate); font-size: 10px; font-weight: 400; letter-spacing: 0; }
.ar-instrument__insight { display: flex; align-items: center; gap: 13px; margin: 0 12px 12px; padding: 15px; border-radius: 13px; background: var(--color-ar-paper); color: var(--color-ar-night); }
.ar-instrument__insight > span { display: grid; place-items: center; width: 37px; height: 37px; flex: 0 0 auto; border-radius: 50%; background: var(--color-ar-ember); font-size: 19px; }
.ar-instrument__insight div { display: flex; flex-direction: column; gap: 4px; }
.ar-instrument__insight small { font-family: var(--font-aerune-mono), monospace; font-size: 9px; opacity: .6; }
.ar-instrument__insight strong { font-size: 12px; font-weight: 500; }
.ar-demo-caption { margin-top: 18px !important; color: color-mix(in srgb, var(--color-ar-night) 62%, transparent); }

/* Capabilities */
.ar-capabilities { padding-block: 20px 150px; }
.ar-capabilities__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.ar-sensor-card { position: relative; min-height: 650px; overflow: hidden; border-radius: 22px; background: var(--color-ar-mist); }
.ar-sensor-card__image { position: absolute; inset: 0; width: 100%; height: 100%; }
.ar-sensor-card__image img { width: 100%; height: 100%; object-fit: cover; }
.ar-sensor-card__image.ar-placeholder { background: var(--color-ar-mist); color: var(--color-ar-night); }
.ar-sensor-card__graphic { position: absolute; inset: 0; display: grid; place-items: center; pointer-events: none; }
.ar-sensor-card__ring { position: absolute; width: 66%; aspect-ratio: 1; border: 1px solid color-mix(in srgb, var(--color-ar-forest) 24%, transparent); border-radius: 50%; }
.ar-sensor-card__ring--two { width: 82%; }
.ar-sensor-card__sensor { display: flex; align-items: center; justify-content: center; gap: 5px; width: 28%; aspect-ratio: 1; border: 1px solid color-mix(in srgb, var(--color-ar-night) 12%, transparent); border-radius: 34%; background: var(--color-ar-paper); box-shadow: 16px 26px 45px color-mix(in srgb, var(--color-ar-night) 18%, transparent), inset 0 0 0 7px color-mix(in srgb, var(--color-ar-porcelain) 50%, transparent); transform: rotate(-12deg); }
.ar-sensor-card__sensor span { width: 7px; height: 7px; margin-right: 5px; border-radius: 50%; background: var(--color-ar-ember); }
.ar-sensor-card__sensor i { width: 3px; height: 26%; border-radius: 5px; background: color-mix(in srgb, var(--color-ar-night) 35%, transparent); }
.ar-sensor-card__caption { position: absolute; right: 24px; bottom: 24px; left: 24px; display: flex; justify-content: space-between; font-family: var(--font-aerune-mono), monospace; font-size: 9px; }
.ar-capabilities__list { display: grid; gap: 12px; }
.ar-capability { position: relative; min-height: 208px; padding: 25px 28px; border-radius: 18px; background: var(--color-ar-porcelain); transition: transform var(--ar-dur-base) var(--ar-ease-out); }
.ar-capability__top { display: flex; align-items: start; justify-content: space-between; color: color-mix(in srgb, var(--color-ar-night) 50%, transparent); font-family: var(--font-aerune-mono), monospace; font-size: 9px; }
.ar-capability__icon { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; background: var(--color-ar-paper); color: var(--color-ar-forest); font-family: var(--font-aerune-geist), sans-serif; font-size: 23px; }
.ar-capability h3 { margin-top: 23px; font-size: 21px; letter-spacing: -.045em; }
.ar-capability p { max-width: 310px; margin-top: 8px; color: color-mix(in srgb, var(--color-ar-night) 63%, transparent); font-size: 13px; line-height: 1.6; }
.ar-capability__arrow { position: absolute; right: 28px; bottom: 25px; font-size: 22px; transition: transform var(--ar-dur-base) var(--ar-ease-out); }

/* Process */
.ar-approach { padding: 68px; border-radius: 24px; background: var(--color-ar-night); color: var(--color-ar-paper); }
.ar-approach__header { display: flex; align-items: end; justify-content: space-between; gap: 50px; }
.ar-approach__header h2 { margin-top: 28px; }
.ar-approach__header > p { max-width: 300px; padding-bottom: 8px; color: var(--color-ar-slate); font-size: 14px; line-height: 1.7; }
.ar-approach__steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin-top: 110px; }
.ar-step { min-height: 200px; padding: 0 28px; border-left: 1px solid color-mix(in srgb, var(--color-ar-paper) 19%, transparent); }
.ar-step:first-child { padding-left: 0; border-left: 0; }
.ar-step__top { display: flex; align-items: center; justify-content: space-between; color: var(--color-ar-slate); font-family: var(--font-aerune-mono), monospace; font-size: 9px; }
.ar-step__mark { display: grid; place-items: center; width: 50px; height: 50px; border: 1px solid color-mix(in srgb, var(--color-ar-paper) 25%, transparent); border-radius: 50%; color: var(--color-ar-ember); font-family: var(--font-aerune-geist), sans-serif; font-size: 24px; }
.ar-step h3 { margin-top: 36px; font-size: 21px; letter-spacing: -.04em; }
.ar-step p { max-width: 270px; margin-top: 11px; color: var(--color-ar-slate); font-size: 13px; line-height: 1.7; }
.ar-approach__bottom { display: flex; justify-content: space-between; margin-top: 90px; padding-top: 18px; border-top: 1px solid color-mix(in srgb, var(--color-ar-paper) 19%, transparent); color: var(--color-ar-slate); font-family: var(--font-aerune-mono), monospace; font-size: 9px; }

/* Workplace */
.ar-workplace { display: grid; grid-template-columns: .9fr 1.1fr; gap: 8%; align-items: center; padding-block: 150px; }
.ar-workplace__copy { align-self: stretch; display: flex; flex-direction: column; align-items: start; padding-block: 20px; }
.ar-workplace__copy h2 { margin-top: 40px; }
.ar-workplace__copy > p:not(.ar-eyebrow) { max-width: 370px; margin: 30px 0 !important; color: color-mix(in srgb, var(--color-ar-night) 67%, transparent); font-size: 15px; line-height: 1.7; }
.ar-workplace__index { display: flex; justify-content: space-between; width: 100%; margin-top: auto; padding-top: 30px; font-family: var(--font-aerune-mono), monospace; font-size: 9px; color: color-mix(in srgb, var(--color-ar-night) 60%, transparent); }
.ar-workplace__visual { position: relative; min-height: 610px; overflow: hidden; border-radius: 22px; background: var(--color-ar-forest); }
.ar-workplace__image { position: absolute; inset: 0; width: 100%; height: 100%; }
.ar-workplace__image img { width: 100%; height: 100%; object-fit: cover; }
.ar-workplace__image.ar-placeholder { background: var(--color-ar-forest); }
.ar-building-graphic { position: absolute; top: 12%; right: 10%; bottom: 14%; left: 10%; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; transform: perspective(900px) rotateY(-10deg); pointer-events: none; }
.ar-building-graphic span { border: 1px solid color-mix(in srgb, var(--color-ar-mist) 25%, transparent); background: color-mix(in srgb, var(--color-ar-mist) 6%, transparent); }
.ar-building-graphic span:nth-child(2), .ar-building-graphic span:nth-child(6) { background: color-mix(in srgb, var(--color-ar-ember) 25%, transparent); }
.ar-workplace__reading { position: absolute; right: 7%; bottom: 9%; display: flex; flex-direction: column; gap: 12px; width: min(250px, 70%); padding: 22px; border-radius: 15px; background: var(--color-ar-paper); box-shadow: 0 18px 35px color-mix(in srgb, var(--color-ar-night) 15%, transparent); }
.ar-workplace__reading span, .ar-workplace__reading small { font-family: var(--font-aerune-mono), monospace; font-size: 9px; opacity: .6; }
.ar-workplace__reading strong { font-size: 22px; font-weight: 500; letter-spacing: -.05em; }

/* Questions and inquiry */
.ar-faq { display: grid; grid-template-columns: .85fr 1.15fr; gap: 12%; padding-block: 25px 150px; }
.ar-faq__intro h2 { margin-top: 30px; }
.ar-faq__intro > p:not(.ar-eyebrow) { max-width: 280px; margin-top: 25px; color: color-mix(in srgb, var(--color-ar-night) 65%, transparent); font-size: 14px; line-height: 1.7; }
.ar-faq__list { border-top: 1px solid color-mix(in srgb, var(--color-ar-night) 20%, transparent); }
.ar-faq__item { border-bottom: 1px solid color-mix(in srgb, var(--color-ar-night) 20%, transparent); }
.ar-faq__item summary { display: flex; align-items: center; justify-content: space-between; gap: 15px; min-height: 75px; cursor: pointer; list-style: none; font-size: 16px; font-weight: 500; }
.ar-faq__item summary::-webkit-details-marker { display: none; }
.ar-faq__plus { display: grid; place-items: center; width: 30px; height: 30px; flex: 0 0 auto; border: 1px solid color-mix(in srgb, var(--color-ar-night) 22%, transparent); border-radius: 50%; font-size: 19px; font-weight: 400; transition: transform var(--ar-dur-base) var(--ar-ease-out), background var(--ar-dur-fast); }
.ar-faq__item[open] .ar-faq__plus { transform: rotate(45deg); background: var(--color-ar-mist); }
.ar-faq__item p { max-width: 540px; padding: 0 30px 25px 0; color: color-mix(in srgb, var(--color-ar-night) 67%, transparent); font-size: 14px; line-height: 1.7; }
.ar-inquiry { display: grid; grid-template-columns: 1fr 1fr; gap: 8%; padding: 75px; border-radius: 24px; background: var(--color-ar-mist); }
.ar-inquiry__copy h2 { margin-top: 35px; }
.ar-inquiry__copy > p:not(.ar-eyebrow) { max-width: 360px; margin-top: 25px; color: color-mix(in srgb, var(--color-ar-night) 70%, transparent); font-size: 15px; line-height: 1.7; }
.ar-inquiry__form { padding: 30px; border-radius: 18px; background: var(--color-ar-porcelain); }
.ar-inquiry__form-head { display: flex; justify-content: space-between; font-family: var(--font-aerune-mono), monospace; font-size: 10px; }
.ar-inquiry__form h3 { margin-top: 50px; font-size: 28px; letter-spacing: -.055em; }
.ar-inquiry__form > p { margin-top: 9px; color: color-mix(in srgb, var(--color-ar-night) 63%, transparent); font-size: 13px; line-height: 1.5; }
.ar-form { display: grid; gap: 17px; margin-top: 30px; }
.ar-form__field { display: grid; gap: 7px; }
.ar-form__field label { font-size: 12px; font-weight: 550; }
.ar-form__field input { width: 100%; min-height: 49px; padding: 0 14px; border: 1px solid color-mix(in srgb, var(--color-ar-night) 20%, transparent); border-radius: 8px; background: transparent; color: var(--color-ar-night); font-size: 14px; transition: border-color var(--ar-dur-fast); }
.ar-form__field input::placeholder { color: color-mix(in srgb, var(--color-ar-night) 42%, transparent); }
.ar-form__field input[aria-invalid="true"] { border-color: var(--color-ar-ember); }
.ar-form__field p { color: var(--color-ar-night); font-size: 12px; }
.ar-form__submit { width: 100%; }
.ar-form__disclaimer { color: color-mix(in srgb, var(--color-ar-night) 67%, transparent); font-size: 11px; line-height: 1.5; }
.ar-form-success { display: flex; gap: 15px; min-height: 170px; margin-top: 30px; padding: 22px; border-radius: 12px; background: var(--color-ar-mist); }
.ar-form-success > span { display: grid; place-items: center; width: 35px; height: 35px; flex: 0 0 auto; border-radius: 50%; background: var(--color-ar-forest); color: var(--color-ar-paper); }
.ar-form-success strong { font-size: 17px; }
.ar-form-success p { margin-top: 8px; font-size: 13px; line-height: 1.5; }
.ar-form-success button { margin-top: 18px; padding: 0; border: 0; background: transparent; font-size: 12px; text-decoration: underline; }

/* Footer */
.ar-footer { overflow: hidden; margin: 110px 12px 12px; padding: 58px 4.2% 25px; border-radius: 22px; background: var(--color-ar-night); color: var(--color-ar-paper); }
.ar-footer__top { display: grid; grid-template-columns: 1fr 1fr auto; gap: 30px; }
.ar-footer__top > div p { margin-top: 14px; color: var(--color-ar-slate); font-size: 14px; }
.ar-footer nav { display: grid; grid-template-columns: 1fr 1fr; align-content: start; gap: 6px 25px; font-size: 13px; }
.ar-footer nav a { width: fit-content; }
.ar-footer__toplink { align-self: start; font-size: 13px; }
.ar-footer__large { margin: 100px 0 -1.7vw; font-size: clamp(110px, 24vw, 340px); font-weight: 600; line-height: .8; letter-spacing: -.09em; }
.ar-footer__large span { color: var(--color-ar-ember); }
.ar-footer__bottom { display: flex; justify-content: space-between; gap: 20px; padding-top: 26px; border-top: 1px solid color-mix(in srgb, var(--color-ar-paper) 25%, transparent); color: var(--color-ar-slate); font-family: var(--font-aerune-mono), monospace; font-size: 9px; }

@media (hover: hover) and (pointer: fine) {
  .ar-action:hover .ar-action__arrow { transform: rotate(45deg); }
  .ar-action:hover { background: var(--color-ar-mist); }
  .ar-desktop-nav a:hover::after, .ar-footer nav a:hover::after { transform: scaleX(1); }
  .ar-header__cta:hover { border-color: var(--color-ar-paper); background: color-mix(in srgb, var(--color-ar-paper) 10%, transparent); }
  .ar-time-buttons button:hover { padding-left: 8px; }
  .ar-capability:hover { transform: translateY(-6px); }
  .ar-capability:hover .ar-capability__arrow { transform: translate(4px, -4px); }
  .ar-faq__item summary:hover .ar-faq__plus { background: var(--color-ar-mist); }
}

@media (prefers-reduced-motion: no-preference) {
  .ar-js [data-reveal] { transition: opacity var(--ar-dur-slow) var(--ar-ease-out), transform var(--ar-dur-slow) var(--ar-ease-out), clip-path var(--ar-dur-slow) var(--ar-ease-in-out); transition-delay: calc(var(--i, 0) * var(--ar-stagger)); }
  .ar-js [data-reveal="rise"]:not([data-in="true"]) { opacity: 0; transform: translateY(var(--ar-shift)); }
  .ar-js [data-reveal="slide"]:not([data-in="true"]) { opacity: 0; transform: translateX(-24px); }
  .ar-js [data-reveal="scale"]:not([data-in="true"]) { opacity: 0; transform: translateY(22px) scale(.97); }
  .ar-js [data-reveal="wipe"]:not([data-in="true"]) { clip-path: inset(8% 0 92% 0 round 20px); }
  .ar-js [data-reveal="draw"]:not([data-in="true"]) { transform: scaleX(0); transform-origin: left; }
  .ar-hero__eyebrow, .ar-hero h1, .ar-hero__description, .ar-hero .ar-action, .ar-hero__note, .ar-preview { animation: ar-enter var(--ar-dur-hero) var(--ar-ease-out) both; }
  .ar-hero h1 { animation-delay: var(--ar-dur-instant); }
  .ar-hero__description { animation-delay: var(--ar-dur-fast); }
  .ar-hero .ar-action, .ar-hero__note { animation-delay: var(--ar-dur-base); }
  .ar-preview { animation-delay: var(--ar-dur-slow); }
  .ar-airflow__trace { animation: ar-trace var(--ar-dur-hero) var(--ar-ease-in-out) both; }
  .ar-faq__item[open] p, .ar-form-success { animation: ar-enter var(--ar-dur-base) var(--ar-ease-out) both; }
  .ar-mobile-nav { animation: ar-menu var(--ar-dur-base) var(--ar-ease-out) both; }
  .ar-mobile-nav__links a { animation: ar-enter var(--ar-dur-base) var(--ar-ease-out) both; animation-delay: calc(var(--i) * var(--ar-stagger)); }
}
@keyframes ar-enter { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
@keyframes ar-trace { from { stroke-dashoffset: 760; } to { stroke-dashoffset: 0; } }
@keyframes ar-menu { from { opacity: 0; clip-path: inset(0 0 100% 0); } to { opacity: 1; clip-path: inset(0); } }

@media (max-width: 900px) {
  .ar-section { width: min(100% - 48px, 720px); }
  .ar-header { width: calc(100% - 48px); }
  .ar-desktop-nav { gap: 18px; }
  .ar-section-heading { grid-template-columns: 1fr; gap: 20px; }
  .ar-section-heading > div { align-items: end; }
  .ar-timeline { gap: 4%; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); }
  .ar-instrument__metrics > div { padding: 16px 8px; }
  .ar-instrument__metrics strong { font-size: 22px; }
  .ar-approach { padding: 45px; }
  .ar-workplace { gap: 5%; }
  .ar-inquiry { padding: 45px; }
}

@media (max-width: 640px) {
  .ar-hero { min-height: 0; margin: 6px; border-radius: 16px; }
  .ar-header { width: calc(100% - 36px); height: 76px; gap: 12px; }
  .ar-header__brand .ar-logo__mark { width: 30px; height: 30px; }
  .ar-header__brand .ar-logo__word { font-size: 23px; }
  .ar-js .ar-desktop-nav, .ar-header__cta { display: none; }
  .ar-js .ar-mobile-toggle { display: grid; place-content: center; gap: 6px; width: 44px; height: 44px; border: 1px solid color-mix(in srgb, var(--color-ar-paper) 35%, transparent); border-radius: 50%; background: transparent; color: inherit; }
  .ar-mobile-toggle span { display: block; width: 17px; height: 1px; background: currentColor; }
  html:not(.ar-js) .ar-header { height: auto; min-height: 80px; align-items: flex-start; padding-block: 18px; }
  html:not(.ar-js) .ar-desktop-nav { display: grid; gap: 0; font-size: 11px; }
  .ar-hero__copy { width: calc(100% - 40px); margin-top: 70px; }
  .ar-hero h1 { font-size: clamp(48px, 12vw, 70px); }
  .ar-hero__description { margin: 21px auto 23px !important; font-size: 14px; }
  .ar-hero__note { font-size: 8px; }
  .ar-hero__contours { top: 80px; height: 600px; width: 180%; left: -40%; }
  .ar-preview { width: calc(100% - 24px); margin-top: 60px; padding: 5px; }
  .ar-preview__top { padding: 12px 9px; font-size: 7px; }
  .ar-preview__body { padding: 20px 14px 16px; }
  .ar-preview__intro h2 { font-size: 23px; }
  .ar-preview__badge { padding: 6px 7px; font-size: 8px; }
  .ar-preview__stats > div { padding: 13px 5px 13px 0; }
  .ar-preview__stats > div + div { padding-left: 8px; }
  .ar-preview__stats strong { font-size: 21px; }
  .ar-preview__stats small { font-size: 9px; }
  .ar-preview__stats span, .ar-preview__stats em { font-size: 8px; }
  .ar-preview__bars { height: 60px; }
  .ar-hero__footer { font-size: 8px; }
  .ar-hero__footer span + span { display: none; }
  .ar-section { width: calc(100% - 36px); }
  .ar-statement { padding-block: 90px 80px; }
  .ar-statement__meta { font-size: 8px; }
  .ar-statement > p { margin-block: 45px 55px; font-size: 38px; }
  .ar-section-heading { gap: 20px; margin-bottom: 48px; }
  .ar-section-heading > div { display: block; }
  .ar-section-heading > div > p { margin-top: 20px; }
  .ar-section-heading h2, .ar-approach h2, .ar-workplace h2, .ar-faq h2, .ar-inquiry h2 { font-size: clamp(42px, 11vw, 55px); }
  .ar-demo { padding: 10px 0 90px; }
  .ar-timeline { display: flex; flex-direction: column; gap: 35px; min-height: 0; }
  .ar-timeline__story { padding: 0; }
  .ar-timeline__story h3 { font-size: 34px; }
  .ar-time-buttons { margin-top: 30px; }
  .ar-timeline__sticky { position: static; }
  .ar-instrument__top { padding: 18px 16px; font-size: 8px; }
  .ar-instrument__scene { padding: 15px 12px; }
  .ar-instrument__scene-label, .ar-instrument__scene-bottom, .ar-demo-caption { font-size: 8px; }
  .ar-instrument__metrics > div { padding: 14px 8px; }
  .ar-instrument__metrics strong { font-size: 20px; }
  .ar-instrument__metrics span, .ar-instrument__metrics em { font-size: 9px; }
  .ar-capabilities { padding-block: 10px 90px; }
  .ar-capabilities__grid { grid-template-columns: 1fr; gap: 10px; }
  .ar-sensor-card { min-height: 400px; }
  .ar-capabilities__list { gap: 10px; }
  .ar-capability { min-height: 190px; }
  .ar-approach { padding: 36px 24px; border-radius: 18px; }
  .ar-approach__header { display: block; }
  .ar-approach__header > p { margin-top: 25px; }
  .ar-approach__steps { grid-template-columns: 1fr; gap: 0; margin-top: 55px; }
  .ar-step, .ar-step:first-child { min-height: 0; padding: 25px 0; border-left: 0; border-top: 1px solid color-mix(in srgb, var(--color-ar-paper) 19%, transparent); }
  .ar-step h3 { margin-top: 20px; }
  .ar-approach__bottom { margin-top: 35px; font-size: 8px; }
  .ar-workplace { grid-template-columns: 1fr; gap: 35px; padding-block: 90px; }
  .ar-workplace__copy { padding: 0; }
  .ar-workplace__copy h2 { margin-top: 25px; }
  .ar-workplace__index { margin-top: 35px; }
  .ar-workplace__visual { min-height: 430px; }
  .ar-faq { grid-template-columns: 1fr; gap: 45px; padding-block: 10px 90px; }
  .ar-faq__item summary { min-height: 68px; font-size: 15px; }
  .ar-inquiry { grid-template-columns: 1fr; gap: 40px; padding: 36px 20px 20px; border-radius: 18px; }
  .ar-inquiry__copy h2 { margin-top: 25px; }
  .ar-inquiry__form { padding: 22px; }
  .ar-inquiry__form h3 { margin-top: 35px; }
  .ar-footer { margin: 80px 6px 6px; padding: 38px 24px 22px; border-radius: 16px; }
  .ar-footer__top { grid-template-columns: 1fr auto; gap: 35px 20px; }
  .ar-footer nav { grid-row: 2; grid-column: 1 / -1; }
  .ar-footer__large { margin-top: 75px; font-size: 26vw; }
  .ar-footer__bottom { flex-wrap: wrap; font-size: 8px; }
  .ar-footer__bottom span:last-child { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  html:has(.ar-body) { scroll-behavior: auto; }
  .ar-body *, .ar-body *::before, .ar-body *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; scroll-behavior: auto !important; }
  .ar-hero__contours { transform: none; }
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/assets.generated.ts">
<![CDATA[// Generated by scripts/process-images.ts — do not edit by hand.
export const ASSETS: Record<string, { w: number; h: number }> = {
  "building-at-dusk": { "w": 2400, "h": 1792 },
  "hero-atmosphere": { "w": 2752, "h": 1536 },
  "sensor-detail": { "w": 2400, "h": 1792 },
};
]]>
    </file>
    <file path="src/app/(aerune)/aerune/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

type PictureProps = { assetKey: string; alt: string; className?: string; priority?: boolean; sizes?: string };

export function Picture({ assetKey, alt, className = "", priority = false, sizes = "(min-width: 900px) 50vw, 100vw" }: PictureProps) {
  const asset = ASSETS[assetKey];
  if (!asset) {
    return <div className={`ar-placeholder ${className}`} role="img" aria-label={`${alt}. Image awaiting generation.`} data-asset={assetKey}><span>IMAGE STUDY / {assetKey.replaceAll("-", " ")}</span></div>;
  }
  const base = `/templates/aerune/${assetKey}`;
  return <picture className={className} data-asset={assetKey}>
    <source type="image/avif" srcSet={`${base}-800.avif 800w, ${base}-1600.avif 1600w`} sizes={sizes} />
    <img src={`${base}-800.webp`} srcSet={`${base}-800.webp 800w, ${base}-1600.webp 1600w`} sizes={sizes} width={asset.w} height={asset.h} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" />
  </picture>;
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
  <rect width="40" height="40" rx="12" fill="#101A1D"/>
  <circle cx="20" cy="20" r="13" fill="none" stroke="#F3EFE5" stroke-width="2.4" stroke-dasharray="68 17" transform="rotate(-42 20 20)"/>
  <path d="M11 23c4-6 9-8 19-8M11 27c6-5 11-6 19-6" fill="none" stroke="#F3EFE5" stroke-width="2.4" stroke-linecap="round"/>
  <circle cx="29" cy="11" r="2.3" fill="#ED7546"/>
</svg>
]]>
    </file>
    <file path="src/app/(aerune)/aerune/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#101A1D", color: "#F3EFE5", flexDirection: "column", justifyContent: "space-between", padding: 70 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32 }}><span style={{ color: "#ED7546" }}>◉</span> aerune.</div>
      <div style={{ display: "flex", flexDirection: "column", fontSize: 80, lineHeight: 1.05, letterSpacing: -4 }}><span>Make room</span><span>for better air.</span></div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: "#C6D8CF" }}><span>THE AIR HAS A STORY</span><span>WORKPLACE AIR INTELLIGENCE</span></div>
    </div>, size,
  );
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/page.tsx">
<![CDATA[import { MotionEffects } from "./motion/MotionEffects";
import { Hero } from "./sections/Hero";
import { Statement } from "./sections/Statement";
import { AirDemo } from "./sections/AirDemo";
import { Capabilities } from "./sections/Capabilities";
import { Approach } from "./sections/Approach";
import { Workplace } from "./sections/Workplace";
import { FAQ } from "./sections/FAQ";
import { Inquiry } from "./sections/Inquiry";
import { Footer } from "./sections/Footer";

export default function AerunePage() {
  return <><MotionEffects /><main><Hero /><Statement /><AirDemo /><Capabilities /><Approach /><Workplace /><FAQ /><Inquiry /></main><Footer /></>;
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/brand/ActionLink.tsx">
<![CDATA[export function ActionLink({ href, children, light = false }: { href: string; children: React.ReactNode; light?: boolean }) {
  return <a className={`ar-action${light ? " ar-action--light" : ""}`} href={href}><span>{children}</span><span className="ar-action__arrow" aria-hidden="true">↗</span></a>;
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/brand/Contours.tsx">
<![CDATA[export function Contours({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 1440 650" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="1">
      <path d="M-40 430C180 335 258 496 488 396S803 218 1002 320s335 73 505-32" />
      <path d="M-40 448C180 353 258 514 488 414S803 236 1002 338s335 73 505-32" />
      <path d="M-40 466C180 371 258 532 488 432S803 254 1002 356s335 73 505-32" />
      <path d="M-40 484C180 389 258 550 488 450S803 272 1002 374s335 73 505-32" />
      <path d="M-40 502C180 407 258 568 488 468S803 290 1002 392s335 73 505-32" />
      <path d="M-40 520C180 425 258 586 488 486S803 308 1002 410s335 73 505-32" />
      <path d="M-40 538C180 443 258 604 488 504S803 326 1002 428s335 73 505-32" />
      <path d="M-40 556C180 461 258 622 488 522S803 344 1002 446s335 73 505-32" />
      <path d="M-40 574C180 479 258 640 488 540S803 362 1002 464s335 73 505-32" />
    </g>
  </svg>;
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/brand/Logo.tsx">
<![CDATA[export function Logo({ markOnly = false }: { markOnly?: boolean }) {
  return (
    <span className="ar-logo" aria-label="AERUNE">
      <svg aria-hidden="true" viewBox="0 0 40 40" fill="none" className="ar-logo__mark">
        <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="2.5" strokeDasharray="83 18" transform="rotate(-42 20 20)" />
        <path d="M9 23c5-7 10-9 22-9M9 28c7-6 13-7 22-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="30.5" cy="10" r="2.5" fill="currentColor" />
      </svg>
      {!markOnly && <span className="ar-logo__word">aerune<span className="ar-logo__dot">.</span></span>}
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/forms/InquiryForm.tsx">
<![CDATA["use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { validateInquiry, type InquiryErrors } from "./validation";

export function InquiryForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [state, setState] = useState<"idle" | "preparing" | "success">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state !== "idle") return;
    const nextErrors = validateInquiry({ name, email });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setState("preparing");
    timer.current = setTimeout(() => setState("success"), 450);
  };

  if (state === "success") return <div className="ar-form-success" role="status"><span aria-hidden="true">✓</span><div><strong>Your demo request is ready.</strong><p>This is a local preview and has not been sent or saved.</p><button type="button" onClick={() => { setName(""); setEmail(""); setErrors({}); setState("idle"); }}>Prepare another ↗</button></div></div>;

  return <form className="ar-form" noValidate onSubmit={submit}>
    <div className="ar-form__field"><label htmlFor="ar-name">Your name</label><input id="ar-name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "ar-name-error" : undefined} placeholder="Your name" maxLength={100} />{errors.name && <p id="ar-name-error" role="alert">{errors.name}</p>}</div>
    <div className="ar-form__field"><label htmlFor="ar-email">Work email</label><input id="ar-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "ar-email-error" : undefined} placeholder="you@company.com" maxLength={254} />{errors.email && <p id="ar-email-error" role="alert">{errors.email}</p>}</div>
    <button className="ar-action ar-form__submit" type="submit" disabled={state === "preparing"}><span>{state === "preparing" ? "Preparing preview…" : "Prepare demo request"}</span><span className="ar-action__arrow" aria-hidden="true">↗</span></button>
    <p className="ar-form__disclaimer">A local preview only. Your information is not sent or saved.</p>
  </form>;
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/forms/validation.ts">
<![CDATA[export type Inquiry = { name: string; email: string };
export type InquiryErrors = Partial<Record<keyof Inquiry, string>>;

export function validateInquiry(inquiry: Inquiry): InquiryErrors {
  const name = inquiry.name.trim();
  const email = inquiry.email.trim();
  const errors: InquiryErrors = {};
  if (!name) errors.name = "Enter your name.";
  else if (name.length > 100) errors.name = "Keep your name under 100 characters.";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  return errors;
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/motion/math.ts">
<![CDATA[export function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, amount: number): number {
  return from + (to - from) * amount;
}

export function progressFromOffsets(scroll: number, start: number, end: number): number {
  if (end <= start) return 0;
  return clamp((scroll - start) / (end - start), 0, 1);
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/motion/MotionEffects.tsx">
<![CDATA["use client";

import { useEffect } from "react";
import { progressFromOffsets } from "./math";

export function MotionEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.in = "true";
          observer?.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -4% 0px" }) : null;
    items.forEach((item) => observer ? observer.observe(item) : item.setAttribute("data-in", "true"));

    let frame = 0;
    let maximum = Math.max(1, root.scrollHeight - window.innerHeight);
    const update = () => {
      frame = 0;
      root.style.setProperty("--ar-page-progress", String(progressFromOffsets(window.scrollY, 0, maximum)));
      root.style.setProperty("--ar-hero-scroll", String(Math.min(window.scrollY, window.innerHeight)));
      document.querySelector<HTMLElement>(".ar-header")?.setAttribute("data-compact", String(window.scrollY > 60));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const onResize = () => { maximum = Math.max(1, root.scrollHeight - window.innerHeight); onScroll(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(onResize);
    resize?.observe(document.body);
    update();

    let disposed = false;
    let stopSmooth = () => {};
    if (window.matchMedia("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)").matches) {
      void import("lenis").then(({ default: Lenis }) => {
        if (disposed) return;
        const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -80 } });
        let id = 0;
        const tick = (time: number) => { lenis.raf(time); id = requestAnimationFrame(tick); };
        id = requestAnimationFrame(tick);
        stopSmooth = () => { cancelAnimationFrame(id); lenis.destroy(); };
      });
    }
    return () => {
      disposed = true;
      stopSmooth();
      observer?.disconnect();
      resize?.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return <div className="ar-progress" aria-hidden="true"><span /></div>;
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/sections/AirDemo.tsx">
<![CDATA[import { Timeline } from "../timeline/Timeline";

export function AirDemo() {
  return <section className="ar-section ar-demo" id="air-demo">
    <div className="ar-section-heading" data-reveal="rise"><p className="ar-eyebrow">MEET YOUR BUILDING, AGAIN</p><div><h2>Follow the air<br /><span>through the day.</span></h2><p>What you can see, you can understand. AERUNE brings the changing conditions of your spaces into focus.</p></div></div>
    <Timeline />
  </section>;
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/sections/Approach.tsx">
<![CDATA[const steps = [
  { number: "01", title: "Gather the signals", text: "Bring together the conditions and patterns across your spaces.", mark: "⌁" },
  { number: "02", title: "See what matters", text: "Read the day in context, from quiet mornings to busy rooms.", mark: "◉" },
  { number: "03", title: "Make a good move", text: "Give your team a clear next step for the spaces they look after.", mark: "↗" },
];

export function Approach() {
  return <section className="ar-section ar-approach" id="approach">
    <div className="ar-approach__header" data-reveal="rise"><div><p className="ar-eyebrow">THE WAY IT WORKS</p><h2>From a little signal<br /><span>to a clearer decision.</span></h2></div><p>Thoughtful buildings don&apos;t need more noise. They need the right information at the right moment.</p></div>
    <div className="ar-approach__steps">{steps.map((step, i) => <article className="ar-step" data-reveal="rise" style={{ "--i": i } as React.CSSProperties} key={step.number}><div className="ar-step__top"><span className="ar-step__mark" aria-hidden="true">{step.mark}</span><span>{step.number} / 03</span></div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
    <div className="ar-approach__bottom"><span>BETTER INPUTS. BETTER SPACES.</span><span>AERUNE / 03 STEPS</span></div>
  </section>;
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/sections/Capabilities.tsx">
<![CDATA[import { Picture } from "../assets";

const capabilities = [
  { number: "01", icon: "◉", title: "See the whole picture", text: "Bring rooms, floors, and buildings together in one clear view." },
  { number: "02", icon: "↗", title: "Know when things change", text: "Spot a shift in your spaces as the day unfolds." },
  { number: "03", icon: "⌁", title: "Find the next step", text: "Turn a reading into a practical action your team can take." },
];

export function Capabilities() {
  return <section className="ar-section ar-capabilities" id="platform">
    <div className="ar-section-heading" data-reveal="rise"><p className="ar-eyebrow">THE AERUNE PLATFORM</p><div><h2>Clarity for every<br /><span>kind of day.</span></h2><p>All the little signals that shape a space, made easier to understand.</p></div></div>
    <div className="ar-capabilities__grid">
      <div className="ar-sensor-card" data-reveal="scale">
        <Picture assetKey="sensor-detail" alt="A small environmental sensor on a stone desk" className="ar-sensor-card__image" />
        <div className="ar-sensor-card__graphic" aria-hidden="true"><div className="ar-sensor-card__ring ar-sensor-card__ring--one" /><div className="ar-sensor-card__ring ar-sensor-card__ring--two" /><div className="ar-sensor-card__sensor"><span /><i /><i /><i /></div></div>
        <div className="ar-sensor-card__caption"><span>FROM THE ROOM</span><span>TO THE WHOLE BUILDING ↗</span></div>
      </div>
      <div className="ar-capabilities__list">{capabilities.map((item, i) => <article className="ar-capability" data-reveal="rise" style={{ "--i": i } as React.CSSProperties} key={item.number}><div className="ar-capability__top"><span className="ar-capability__icon" aria-hidden="true">{item.icon}</span><span>{item.number} / 03</span></div><h3>{item.title}</h3><p>{item.text}</p><span className="ar-capability__arrow" aria-hidden="true">↗</span></article>)}</div>
    </div>
  </section>;
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/sections/FAQ.tsx">
<![CDATA[const questions = [
  ["What is AERUNE?", "AERUNE is a fictional workplace air intelligence platform. This template demonstrates how building teams might explore changing indoor conditions."],
  ["Who is it for?", "The concept is designed for workplace, facilities, and building operations teams who look after shared spaces."],
  ["Are the readings on this page live?", "No. Every reading in the interactive example is simulated to show how the interface could work."],
  ["What can the timeline show?", "The example brings together an indoor CO₂ reading, occupancy, airflow, and a suggested response for three moments in a day."],
  ["Does the page connect to real sensors?", "No. This is an independent visual template and does not connect to a sensor, building system, or external service."],
  ["What happens when I request a demo?", "The form creates a local preview in your browser. It does not send or store your information."],
];

export function FAQ() {
  return <section className="ar-section ar-faq" id="faq"><div className="ar-faq__intro" data-reveal="rise"><p className="ar-eyebrow">A FEW GOOD QUESTIONS</p><h2>Room for<br /><span>answers.</span></h2><p>Everything you might want to know before taking a closer look.</p></div><div className="ar-faq__list">{questions.map(([question, answer], i) => <details className="ar-faq__item" data-reveal="rise" style={{ "--i": i } as React.CSSProperties} key={question}><summary><span>{question}</span><span className="ar-faq__plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>;
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/sections/Footer.tsx">
<![CDATA[import { Logo } from "../brand/Logo";

export function Footer() {
  return <footer className="ar-footer"><div className="ar-footer__top"><div><Logo /><p>Make room for better air.</p></div><nav aria-label="Footer navigation"><a href="#air-demo">The live demo</a><a href="#platform">Platform</a><a href="#approach">How it works</a><a href="#faq">Questions</a></nav><a className="ar-footer__toplink" href="#top">Back to top ↑</a></div><div className="ar-footer__large" aria-hidden="true">aerune<span>.</span></div><div className="ar-footer__bottom"><span>© 2026 AERUNE / A FICTIONAL CONCEPT</span><span>THE AIR HAS A STORY</span><span>MADE FOR THE PLACES WE SHARE</span></div></footer>;
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/sections/Header.tsx">
<![CDATA["use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "../brand/Logo";

const links = [
  { href: "#air-demo", label: "The live demo" },
  { href: "#platform", label: "Platform" },
  { href: "#approach", label: "How it works" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const menu = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const targets = () => Array.from(menu.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
    targets()[0]?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
      if (event.key !== "Tab") return;
      const elements = targets();
      if (!elements.length) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", keydown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", keydown); };
  }, [open]);

  return <header className="ar-header" data-compact="false">
    <a className="ar-header__brand" href="#top" aria-label="AERUNE, back to top"><Logo /></a>
    <nav className="ar-desktop-nav" aria-label="Main navigation">
      {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
    </nav>
    <a className="ar-header__cta" href="#request">Request a demo <span aria-hidden="true">↗</span></a>
    <button ref={toggle} type="button" className="ar-mobile-toggle" aria-label="Open menu" aria-expanded={open} aria-controls="ar-mobile-nav" onClick={() => setOpen(true)}><span /><span /></button>
    {open && <nav ref={menu} id="ar-mobile-nav" className="ar-mobile-nav" aria-label="Mobile navigation">
      <div className="ar-mobile-nav__top"><Logo /><button type="button" className="ar-mobile-close" aria-label="Close menu" onClick={() => { setOpen(false); toggle.current?.focus(); }}>×</button></div>
      <div className="ar-mobile-nav__links">{links.map((link, i) => <a style={{ "--i": i } as React.CSSProperties} key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<span aria-hidden="true">↗</span></a>)}</div>
      <a className="ar-mobile-nav__request" href="#request" onClick={() => setOpen(false)}>Request a demo ↗</a>
      <p>MORE ROOM TO BREATHE / AERUNE</p>
    </nav>}
  </header>;
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/sections/Hero.tsx">
<![CDATA[import { Picture } from "../assets";
import { ActionLink } from "../brand/ActionLink";
import { Contours } from "../brand/Contours";
import { Header } from "./Header";
import { HeroDashboard } from "./HeroDashboard";

export function Hero() {
  return <section className="ar-hero" id="top">
    <Picture assetKey="hero-atmosphere" alt="Atmospheric ridgelines at blue hour" className="ar-hero__image" priority />
    <div className="ar-hero__wash" aria-hidden="true" />
    <Contours className="ar-hero__contours" />
    <Header />
    <div className="ar-hero__copy">
      <p className="ar-hero__eyebrow"><span /> A LITTLE MORE ROOM TO BREATHE</p>
      <h1><span>Make room for</span><br /><span>better <i>air.</i></span></h1>
      <p className="ar-hero__description">AERUNE makes the invisible visible, helping workplace teams understand the air in every room and make more thoughtful decisions.</p>
      <ActionLink href="#air-demo">Explore the demo</ActionLink>
      <p className="ar-hero__note">AIR INTELLIGENCE FOR THE PLACES WE SHARE <span>↓</span></p>
    </div>
    <HeroDashboard />
    <div className="ar-hero__footer"><span>01 / THE AIR HAS A STORY</span><span>DESIGNED FOR THE WAY WE WORK</span></div>
  </section>;
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/sections/HeroDashboard.tsx">
<![CDATA[const bars = [24, 31, 28, 38, 44, 39, 55, 64, 59, 72, 68, 76, 64, 61, 72, 82, 69, 62, 55, 48, 43, 36, 31, 25];

export function HeroDashboard() {
  return <div className="ar-preview" aria-label="Example AERUNE dashboard">
    <div className="ar-preview__top"><div><span className="ar-status-dot" /> <span>THE WORKPLACE AT A GLANCE</span></div><span>MONDAY, 08:30 <span className="ar-preview__mini">↗</span></span></div>
    <div className="ar-preview__body">
      <div className="ar-preview__intro"><div><span className="ar-ui-label">BUILDING OVERVIEW</span><h2>A clearer picture,<br />room by room.</h2></div><div className="ar-preview__badge"><span className="ar-status-dot" /> Example readings</div></div>
      <div className="ar-preview__stats">
        <div><span>Indoor CO₂</span><strong>620 <small>ppm</small></strong><em>Morning arrival</em></div>
        <div><span>People in building</span><strong>38 <small>people</small></strong><em>Across 4 floors</em></div>
        <div><span>Ventilation</span><strong>61<small>%</small></strong><em>Following schedule</em></div>
      </div>
      <div className="ar-preview__graph"><div className="ar-preview__graph-head"><span>Air through the day</span><span>TODAY / 24 HOURS</span></div><div className="ar-preview__bars">{bars.map((height, i) => <span key={i} className={i >= 9 && i <= 15 ? "is-lit" : ""} style={{ "--bar": height } as React.CSSProperties} />)}</div><div className="ar-preview__hours"><span>06:00</span><span>12:00</span><span>18:00</span><span>00:00</span></div></div>
    </div>
  </div>;
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/sections/Inquiry.tsx">
<![CDATA[import { InquiryForm } from "../forms/InquiryForm";

export function Inquiry() {
  return <section className="ar-section ar-inquiry" id="request"><div className="ar-inquiry__copy" data-reveal="rise"><p className="ar-eyebrow">LET&apos;S CLEAR THE AIR</p><h2>Make space for<br /><span>what matters.</span></h2><p>See what a more complete picture of your workplace could look like.</p></div><div className="ar-inquiry__form" data-reveal="scale"><div className="ar-inquiry__form-head"><span>START A CONVERSATION</span><span>↗</span></div><h3>Get to know AERUNE.</h3><p>Leave a few details to preview a demo request.</p><InquiryForm /></div></section>;
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/sections/Statement.tsx">
<![CDATA[export function Statement() {
  return <section className="ar-statement ar-section" aria-label="Our point of view">
    <div className="ar-statement__meta" data-reveal="slide"><span>THE THINGS WE CAN&apos;T SEE</span><span>01 / A DIFFERENT VIEW</span></div>
    <p data-reveal="rise">Better spaces begin with <span>better understanding.</span> Let&apos;s bring the air into the conversation.</p>
    <div className="ar-statement__rule" data-reveal="draw" />
  </section>;
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/sections/Workplace.tsx">
<![CDATA[import { Picture } from "../assets";
import { ActionLink } from "../brand/ActionLink";

export function Workplace() {
  return <section className="ar-section ar-workplace">
    <div className="ar-workplace__copy" data-reveal="rise"><p className="ar-eyebrow">MADE FOR THE PLACES WE SHARE</p><h2>A better day<br /><span>starts inside.</span></h2><p>When building teams understand the rhythm of a space, they can make more considered choices for the people in it.</p><ActionLink href="#request">Request a demo</ActionLink><div className="ar-workplace__index"><span>SPACE / 02</span><span>THE WORKPLACE</span></div></div>
    <div className="ar-workplace__visual" data-reveal="wipe"><Picture assetKey="building-at-dusk" alt="A quiet contemporary workplace at blue hour" className="ar-workplace__image" /><div className="ar-building-graphic" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div><div className="ar-workplace__reading"><span>THE ROOM, IN CONTEXT</span><strong>One clearer view.</strong><small>SPACE / PEOPLE / AIR</small></div></div>
  </section>;
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/timeline/Airflow.tsx">
<![CDATA[export function Airflow({ moment }: { moment: number }) {
  const paths = [
    "M12 141 C94 141 100 82 182 82 S272 136 357 136 S447 72 528 72",
    "M12 152 C88 152 102 48 183 48 S277 160 360 160 S448 44 528 44",
    "M12 125 C100 125 105 102 185 102 S271 119 357 119 S447 100 528 100",
  ];
  return <svg className="ar-airflow" viewBox="0 0 540 220" fill="none" aria-hidden="true">
    <path d="M20 166H520M20 56H520M20 111H520" stroke="currentColor" strokeOpacity=".12" strokeDasharray="3 8" />
    <path d="M95 180V40M190 180V40M285 180V40M380 180V40M475 180V40" stroke="currentColor" strokeOpacity=".1" />
    <path d={paths[moment]} stroke="currentColor" strokeOpacity=".16" strokeWidth="32" strokeLinecap="round" />
    <path key={moment} className="ar-airflow__trace" d={paths[moment]} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="760" />
    <circle cx="184" cy={moment === 0 ? 82 : moment === 1 ? 48 : 102} r="5" fill="currentColor" />
    <circle cx="357" cy={moment === 0 ? 136 : moment === 1 ? 160 : 119} r="5" fill="currentColor" />
  </svg>;
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/timeline/model.ts">
<![CDATA[import { clamp } from "../motion/math";

export type AirMoment = {
  label: string;
  time: string;
  co2: number;
  people: number;
  airflow: number;
  description: string;
  action: string;
  chart: readonly number[];
};

export const AIR_MOMENTS: readonly AirMoment[] = [
  {
    label: "Arrival", time: "08:30", co2: 620, people: 38, airflow: 61,
    description: "The building wakes up. Fresh air moves in as the first teams arrive.",
    action: "Maintain the morning schedule",
    chart: [22, 26, 30, 38, 44, 51, 49, 57, 61, 55, 49, 45],
  },
  {
    label: "Meeting peak", time: "13:15", co2: 980, people: 86, airflow: 89,
    description: "A busy afternoon brings more people into the same rooms.",
    action: "Increase fresh air in meeting rooms",
    chart: [24, 28, 39, 45, 54, 62, 75, 86, 93, 88, 78, 68],
  },
  {
    label: "Evening", time: "18:40", co2: 530, people: 12, airflow: 34,
    description: "The day winds down and the building settles into a lighter rhythm.",
    action: "Return to the evening schedule",
    chart: [76, 72, 65, 59, 51, 44, 38, 34, 30, 27, 24, 21],
  },
];

export function nextMomentIndex(current: number, delta: number): number {
  return Math.round(clamp(current + delta, 0, AIR_MOMENTS.length - 1));
}

export function getMoment(index: number): AirMoment {
  return AIR_MOMENTS[nextMomentIndex(index, 0)];
}
]]>
    </file>
    <file path="src/app/(aerune)/aerune/timeline/Timeline.tsx">
<![CDATA["use client";

import { useState } from "react";
import { Airflow } from "./Airflow";
import { AIR_MOMENTS, getMoment, nextMomentIndex } from "./model";

export function Timeline() {
  const [index, setIndex] = useState(0);
  const moment = getMoment(index);
  return <div className="ar-timeline">
    <div className="ar-timeline__story" data-reveal="rise">
      <span className="ar-eyebrow">A DAY IN THE LIFE / 01—03</span>
      <h3>Every room has<br />its own rhythm.</h3>
      <p>From first arrivals to the last meeting, the air changes with the people inside. Choose a moment to see the story unfold.</p>
      <div className="ar-time-buttons" role="group" aria-label="Choose a moment">
        {AIR_MOMENTS.map((item, i) => <button key={item.label} type="button" aria-pressed={i === index} onClick={() => setIndex(i)}><span>0{i + 1}</span><strong>{item.label}</strong><small>{item.time}</small></button>)}
      </div>
      <label className="ar-range-label" htmlFor="ar-day-range"><span>EXPLORE THE BUILDING DAY</span><span>{moment.time}</span></label>
      <input id="ar-day-range" type="range" min="0" max="2" step="1" value={index} onChange={(event) => setIndex(nextMomentIndex(Number(event.target.value), 0))} aria-label="Explore the building day" aria-valuetext={`${moment.label}, ${moment.time}`} />
      <p className="ar-timeline__note">A SIMULATED DAY AT THE NORTH BUILDING</p>
    </div>
    <div className="ar-timeline__sticky" data-reveal="wipe">
      <div className="ar-instrument" data-air-scene={index}>
        <div className="ar-instrument__top"><span><span className="ar-status-dot" /> NORTH BUILDING</span><span>EXAMPLE / {moment.time}</span></div>
        <div className="ar-instrument__scene"><div className="ar-instrument__scene-label"><span>BUILDING AIRFLOW</span><span>FLOOR 02 / 04</span></div><Airflow moment={index} /><div className="ar-instrument__scene-bottom"><span>INLET</span><span>MEETING ROOMS</span><span>OUTLET</span></div></div>
        <div className="ar-instrument__metrics" aria-live="polite" aria-atomic="true">
          <div><span>Indoor CO₂</span><strong><span data-reading="co2">{moment.co2}</span><small> ppm</small></strong><em>Example reading</em></div>
          <div><span>Occupancy</span><strong>{moment.people}<small> people</small></strong><em>In the building</em></div>
          <div><span>Airflow</span><strong>{moment.airflow}<small>%</small></strong><em>Of capacity</em></div>
        </div>
        <div className="ar-instrument__insight"><span>↗</span><div><small>SUGGESTED RESPONSE</small><strong>{moment.action}</strong></div></div>
      </div>
      <p className="ar-demo-caption"><span>FIG. 01 / A BUILDING IN MOTION</span><span>{moment.label.toUpperCase()} — {moment.time}</span></p>
    </div>
  </div>;
}
]]>
    </file>
  </files>
</template>
