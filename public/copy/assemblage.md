<template slug="assemblage" name="Assemblage">
  <dependencies>
    {
      "dependencies": {
        "three": "^0.186.1"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(assemblage)/layout.tsx">
<![CDATA[import type { Metadata } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import "./assemblage/assemblage.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-assemblage-body",
  weight: ["400", "500", "600", "700"],
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-assemblage-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "Assemblage — Make the idea visible",
  description:
    "Material studies for independent brands who want a launch direction they can feel before production starts.",
  openGraph: {
    title: "Assemblage — Make the idea visible",
    description: "A mixed media material study for the launch you can already see.",
    type: "website",
    images: ["/templates/assemblage/preview.svg"],
  },
  icons: { icon: "/templates/assemblage/icon.svg" },
};

export default function AssemblageLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${mono.variable} overflow-x-clip`}>
      <body className="assemblage-body overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(assemblage)/assemblage/assemblage.css">
<![CDATA[@import "tailwindcss";
@import "./studio/studio.css";

@theme {
  --color-as-paper: #F6F0E8;
  --color-as-ink: #1E1D1B;
  --color-as-sand: #E2D8C9;
  --color-as-vermilion: #D95F3F;
  --color-as-teal: #1D6C63;
  --color-as-ochre: #E7C65A;
  --color-as-plum: #8F4E70;
  --font-as-body: var(--font-assemblage-body), system-ui, sans-serif;
  --font-as-mono: var(--font-assemblage-mono), ui-monospace, monospace;
  --ease-as: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-as: 700ms;
  --dur-as-fast: 220ms;
  --dur-as-press: 140ms;
}

:root { --as-gutter: clamp(20px, 5vw, 80px); --as-max: 1280px; --as-line: rgba(30,29,27,.18); }
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; background: var(--color-as-paper); }
body { margin: 0; background: var(--color-as-paper); color: var(--color-as-ink); font-family: var(--font-as-body); font-size: 16px; line-height: 1.55; -webkit-font-smoothing: antialiased; }
body::before { content: ""; position: fixed; inset: 0; pointer-events: none; z-index: 50; opacity: .22; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.16'/%3E%3C/svg%3E"); mix-blend-mode: multiply; }
a { color: inherit; text-decoration: none; }
button, input, textarea { font: inherit; }
button { cursor: pointer; }
::selection { background: var(--color-as-ochre); color: var(--color-as-ink); }
:focus-visible { outline: 2px solid var(--color-as-vermilion); outline-offset: 4px; }
h1, h2, h3, p { margin: 0; text-wrap: pretty; }
h1, h2, h3 { line-height: 1.05; letter-spacing: -.035em; }
h1 { font-size: clamp(3rem, 5.8vw, 5rem); max-width: 760px; font-weight: 700; }
h2 { font-size: clamp(2.25rem, 5vw, 5rem); max-width: 760px; font-weight: 700; }
h3 { font-size: clamp(1.25rem, 2vw, 1.75rem); font-weight: 700; }
.as-container { width: min(100% - (var(--as-gutter) * 2), var(--as-max)); margin-inline: auto; }
.as-site { overflow: clip; }
.as-skip { position: fixed; left: 16px; top: 16px; z-index: 100; padding: 8px 12px; background: var(--color-as-ink); color: var(--color-as-paper); transform: translateY(-140%); transition: transform 300ms var(--ease-as); }
.as-skip:focus { transform: translateY(0); }
.as-mono, .as-kicker, .as-index, .as-step-number, .as-hero-foot, .as-footer-links, .as-stamp { font-family: var(--font-as-mono); text-transform: uppercase; letter-spacing: .12em; font-size: 11px; line-height: 1.3; }
.as-kicker { display: flex; align-items: center; gap: 10px; color: var(--color-as-teal); }
.as-kicker-dot { width: 8px; height: 8px; display: inline-block; background: var(--color-as-vermilion); border-radius: 50%; }
.as-header { position: fixed; inset: 16px var(--as-gutter) auto; z-index: 40; }
.as-header-inner { width: min(100%, 1440px); margin: auto; padding: 10px 12px 10px 16px; display: flex; align-items: center; justify-content: space-between; gap: 16px; border: 1px solid var(--as-line); background: color-mix(in srgb, var(--color-as-paper) 86%, transparent); backdrop-filter: blur(18px); border-radius: 999px; } .as-progress { display: block; height: 2px; margin: 0 18px; overflow: hidden; background: transparent; } .as-progress-bar { display: block; width: 100%; height: 2px; transform: scaleX(0); transform-origin: left center; background: var(--color-as-vermilion); }
.as-header-logo { display: inline-flex; }
.as-logo { display: inline-flex; align-items: center; gap: 9px; }
.as-logo-mark { width: 29px; height: 29px; color: var(--color-as-ink); }
.as-logo-word { font-weight: 700; letter-spacing: -.04em; font-size: 20px; }
.as-logo-word span { color: var(--color-as-vermilion); }
.as-logo--compact .as-logo-mark { width: 34px; height: 34px; }
.as-nav { display: flex; gap: 28px; font-size: 14px; }
.as-nav a, .as-text-link, .as-footer-links a { transition: color 300ms var(--ease-as); }
.as-button { display: inline-flex; align-items: center; justify-content: center; gap: 12px; min-height: 48px; padding: 8px 16px; border: 1px solid var(--color-as-ink); border-radius: 999px; font-weight: 700; font-size: 16px; transition: transform var(--dur-as-fast) var(--ease-as), background-color 300ms var(--ease-as), color 300ms var(--ease-as); }
.as-button:active { transition-duration: var(--dur-as-press); transform: translateY(1px) scale(.98); }
.as-button--small { min-height: 36px; padding-inline: 14px; font-size: 14px; }
.as-button--primary { background: var(--color-as-ink); color: var(--color-as-paper); }
.as-text-link { display: inline-flex; align-items: center; gap: 9px; border-bottom: 1px solid currentColor; padding-bottom: 3px; font-weight: 600; }
.as-hero { min-height: 860px; padding-top: 140px; display: grid; grid-template-columns: minmax(0, 1fr) minmax(380px, .82fr); gap: clamp(32px, 6vw, 100px); align-items: center; position: relative; }
.as-hero-copy { position: relative; z-index: 2; padding-bottom: 80px; }
.as-hero h1 { margin-top: 24px; }
.as-hero h1 span { display: block; color: var(--color-as-vermilion); }
.as-lead { max-width: 540px; margin-top: 30px; font-size: clamp(1.125rem, 1.8vw, 1.45rem); line-height: 1.45; }
.as-hero-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 22px; margin-top: 34px; }
.as-hero-proof { display: flex; align-items: center; gap: 12px; max-width: 420px; margin-top: 34px; color: color-mix(in srgb, var(--color-as-ink) 68%, transparent); font-size: 14px; }
.as-stamp { display: inline-flex; padding: 8px 10px; border: 1px solid var(--color-as-vermilion); color: var(--color-as-vermilion); transform: rotate(-5deg); white-space: nowrap; }
.as-hero-art { min-height: 640px; position: relative; isolation: isolate; }
.as-hero-foot { position: absolute; bottom: 32px; left: 0; right: 0; display: flex; justify-content: space-between; color: color-mix(in srgb, var(--color-as-ink) 55%, transparent); }
.as-section-intro { display: grid; grid-template-columns: 180px 1fr; gap: 32px; align-items: start; }
.as-section-intro h2 { max-width: 700px; }
.as-benefits { padding-block: 130px 150px; }
.as-benefit-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; margin-top: 70px; border-top: 1px solid var(--as-line); }
.as-benefit { min-height: 250px; padding: 22px 18px 18px 0; border-bottom: 1px solid var(--as-line); position: relative; }
.as-benefit { --as-rotation: 0deg; --as-offset: 0px; transform: translateY(var(--as-offset)) rotate(var(--as-rotation)); }.as-benefit:nth-child(2) { --as-offset: 30px; }.as-benefit:nth-child(3) { --as-offset: 12px; }.as-benefit:nth-child(4) { --as-offset: 52px; }
.as-index { color: var(--color-as-vermilion); }.as-benefit h3 { margin-top: 54px; max-width: 220px; }.as-benefit p { margin-top: 16px; max-width: 240px; color: color-mix(in srgb, var(--color-as-ink) 70%, transparent); }
.as-tagline { padding: 170px var(--as-gutter); background: var(--color-as-ink); color: var(--color-as-paper); text-align: center; }.as-tagline .as-kicker { justify-content: center; color: var(--color-as-ochre); }.as-tagline h2 { margin: 24px auto 0; max-width: 920px; }.as-tagline [data-as-word] { opacity: 1; transition: opacity 340ms var(--ease-as); }.as-tagline[data-as-word-motion] [data-as-word] { opacity: .3; }.as-tagline[data-as-word-motion] [data-as-word][data-in="true"] { opacity: 1; }
.as-process { padding-block: 150px; }.as-step-grid { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 72px; border-top: 1px solid var(--as-line); }.as-step { min-height: 330px; padding: 22px 28px 24px 0; border-bottom: 1px solid var(--as-line); position: relative; --as-rotation: 0deg; --as-offset: 0px; transform: translateY(var(--as-offset)) rotate(var(--as-rotation)); }.as-step + .as-step { padding-left: 28px; border-left: 1px solid var(--as-line); }.as-step-number { color: var(--color-as-vermilion); }.as-step h3 { margin-top: 65px; }.as-step p { max-width: 290px; margin-top: 16px; color: color-mix(in srgb, var(--color-as-ink) 70%, transparent); }.as-step-arrow { position: absolute; right: 22px; bottom: 22px; color: var(--color-as-vermilion); font-size: 24px; }
.as-materials { padding-block: 40px 160px; }.as-materials-head { display: flex; justify-content: space-between; align-items: end; gap: 40px; }.as-materials-intro { max-width: 340px; color: color-mix(in srgb, var(--color-as-ink) 70%, transparent); }.as-materials-stage { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(340px, .95fr); gap: clamp(40px, 8vw, 120px); margin-top: 72px; align-items: center; }
.as-materials-list { border-top: 1px solid var(--as-line); }.as-materials-list button { appearance: none; width: 100%; display: grid; grid-template-columns: 44px 1fr 24px; gap: 12px; align-items: center; padding: 18px 0; text-align: left; border: 0; border-bottom: 1px solid var(--as-line); background: transparent; color: inherit; transition: color 300ms var(--ease-as), transform 500ms var(--ease-as); }.as-materials-list button.is-active { color: var(--color-as-vermilion); transform: translateX(8px); }.as-material-number { font-family: var(--font-as-mono); font-size: 11px; }.as-materials-list button strong, .as-materials-list button small { display: block; }.as-materials-list button small { margin-top: 3px; font-size: 13px; color: color-mix(in srgb, var(--color-as-ink) 58%, transparent); }.as-material-detail { padding: 22px 0 0 56px; border-top: 1px solid var(--as-line); }.as-material-detail p { margin-top: 13px; font-size: 20px; line-height: 1.35; max-width: 360px; }
.as-proof { padding-block: 80px 160px; }.as-proof-top { display: flex; justify-content: space-between; gap: 24px; align-items: center; }.as-proof-stat { font-family: var(--font-as-mono); font-size: 11px; letter-spacing: .08em; text-transform: uppercase; }.as-proof-stat strong { color: var(--color-as-vermilion); font-size: 16px; }.as-proof-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 58px; }.as-quote { position: relative; padding: 40px 36px 36px; min-height: 330px; background: var(--color-as-sand); --as-rotation: -2deg; transform: rotate(var(--as-rotation)); }.as-quote:nth-child(2) { background: var(--color-as-ochre); --as-rotation: 3deg; --as-offset: 42px; transform: rotate(var(--as-rotation)) translateY(var(--as-offset)); }.as-quote--teal { background: var(--color-as-teal); color: var(--color-as-paper); }.as-quote-mark { font-size: 70px; line-height: .7; color: var(--color-as-vermilion); }.as-quote blockquote { max-width: 530px; margin-top: 24px; font-size: clamp(1.45rem, 2.4vw, 2.4rem); line-height: 1.12; letter-spacing: -.05em; }.as-quote figcaption { display: flex; flex-direction: column; gap: 3px; position: absolute; bottom: 32px; left: 36px; font-size: 14px; }.as-quote figcaption span { opacity: .68; }.as-quote-tape { position: absolute; top: -11px; left: 34%; width: 120px; height: 24px; background: color-mix(in srgb, var(--color-as-paper) 70%, transparent); transform: rotate(-4deg); }
.as-objections { padding-block: 120px 150px; }.as-faq { margin-top: 64px; border-top: 1px solid var(--as-line); }.as-faq details { border-bottom: 1px solid var(--as-line); }.as-faq summary { list-style: none; display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 20px 0; font-size: clamp(1.125rem, 2vw, 1.5rem); font-weight: 600; cursor: pointer; }.as-faq summary::-webkit-details-marker { display: none; }.as-faq summary span { color: var(--color-as-vermilion); font-size: 28px; font-weight: 400; transition: transform 300ms var(--ease-as); }.as-faq details[open] summary span { transform: rotate(45deg); }.as-faq details p { max-width: 650px; padding: 0 50px 24px 0; color: color-mix(in srgb, var(--color-as-ink) 70%, transparent); }
.as-request { display: grid; grid-template-columns: .9fr 1.1fr; gap: clamp(40px, 9vw, 140px); padding-block: 110px 160px; border-top: 1px solid var(--as-line); }.as-request-copy > p:not(.as-kicker) { max-width: 470px; margin-top: 26px; font-size: 18px; }.as-note-card { display: grid; gap: 13px; max-width: 370px; margin-top: 46px; padding: 22px; background: var(--color-as-ochre); --as-rotation: -2deg; transform: rotate(var(--as-rotation)); }.as-note-card strong { font-size: 20px; line-height: 1.15; letter-spacing: -.03em; }.as-form { display: grid; gap: 18px; padding: 30px; background: var(--color-as-ink); color: var(--color-as-paper); }.as-form-heading { display: flex; justify-content: space-between; gap: 20px; align-items: start; padding-bottom: 16px; border-bottom: 1px solid rgba(246,240,232,.25); }.as-form-heading p { max-width: 250px; font-size: 14px; color: rgba(246,240,232,.7); }.as-form label { display: grid; gap: 7px; font-size: 14px; color: rgba(246,240,232,.8); }.as-form input, .as-form textarea { width: 100%; border: 1px solid rgba(246,240,232,.28); border-radius: 0; background: transparent; color: var(--color-as-paper); padding: 11px 12px; outline: none; transition: border-color 300ms var(--ease-as), background-color 300ms var(--ease-as); }.as-form input:focus, .as-form textarea:focus { border-color: var(--color-as-ochre); background: rgba(246,240,232,.06); }.as-form textarea { resize: vertical; }.as-form input[aria-invalid="true"] { border-color: var(--color-as-vermilion); }.as-form ::placeholder { color: rgba(246,240,232,.45); }.as-form .as-button { width: fit-content; border-color: var(--color-as-paper); background: var(--color-as-paper); color: var(--color-as-ink); margin-top: 6px; }.as-form .as-button:hover { background: var(--color-as-ochre); border-color: var(--color-as-ochre); }.as-error { display: block; opacity: 1; transform: translateY(0); animation: as-error-in 180ms var(--ease-as); } @keyframes as-error-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } } .as-error { color: var(--color-as-vermilion); font-family: var(--font-as-mono); font-size: 11px; }.as-form-foot { font-family: var(--font-as-mono); font-size: 10px; letter-spacing: .08em; color: rgba(246,240,232,.55); text-transform: uppercase; }.as-success-mark { display: inline-flex; align-items: center; justify-content: center; width: 46px; height: 46px; background: var(--color-as-ochre); color: var(--color-as-ink); border-radius: 50%; font-size: 24px; }.as-form-success h3 { max-width: 400px; margin-top: 16px; }.as-form-success > p:not(.as-kicker) { max-width: 390px; margin-top: 14px; color: rgba(246,240,232,.72); }

.as-form-shell { position: relative; min-height: 440px; display: grid; } .as-form-shell > * { grid-area: 1 / 1; align-self: start; }
.as-form-shell > .as-form-fields,
.as-form-shell > .as-form-success { transition: opacity 420ms var(--ease-as), transform 420ms var(--ease-as); }
.as-form-shell > .as-form-success { opacity: 0; transform: translateY(12px); pointer-events: none; transition-delay: 80ms; }
.as-form-shell[data-state="success"] > .as-form-fields { opacity: 0; transform: translateY(-8px); pointer-events: none; transition-duration: 220ms; }
.as-form-shell[data-state="success"] > .as-form-success { opacity: 1; transform: none; pointer-events: auto; }
.as-form-success { min-height: 440px; align-content: center; }

.as-footer { background: var(--color-as-ink); color: var(--color-as-paper); padding-block: 32px; }.as-footer-inner { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 28px; }.as-footer p { max-width: 360px; color: rgba(246,240,232,.64); font-size: 13px; }.as-footer-links { display: flex; flex-wrap: wrap; gap: 14px; font-size: 10px; }.as-footer .as-logo { color: var(--color-as-paper); }
/* Motion is progressive enhancement: unhydrated content is always readable. */
.as-site [id] { scroll-margin-top: 110px; }
.as-nav a { position: relative; }
.as-nav a::after { content: ""; position: absolute; inset: auto 0 -5px; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: left; transition: transform 300ms var(--ease-as); }
.as-nav a:focus-visible::after { transform: scaleX(1); }
.as-button > span[aria-hidden], .as-text-link > span[aria-hidden] { display: inline-block; transition: transform 300ms var(--ease-as); }
.as-button:focus-visible > span[aria-hidden] { transform: translate(2px, -2px); }
.as-text-link:focus-visible > span[aria-hidden] { transform: translateY(3px); }
.as-site .as-button:active { transform: translateY(1px) scale(.98); transition-duration: var(--dur-as-press); }
.as-materials-list button:focus-visible { color: var(--color-as-vermilion); }
.as-materials-list button:active { translate: 0 1px; }
.as-material-plus { position: relative; width: 20px; height: 20px; }
.as-material-plus::before, .as-material-plus::after { content: ""; position: absolute; background: currentColor; }
.as-material-plus::before { width: 14px; height: 1px; top: 10px; left: 3px; }
.as-material-plus::after { width: 1px; height: 14px; left: 10px; top: 3px; transform: scaleY(1); transition: transform 300ms var(--ease-as); }
.as-materials-list button.is-active .as-material-plus::after { transform: scaleY(0); }
.as-material-details { display: grid; margin-top: 34px; }
.as-material-detail { grid-area: 1 / 1; align-self: start; margin-top: 0; opacity: 1; translate: 0 0; visibility: visible; transition: opacity 300ms var(--ease-as) 80ms, translate 420ms var(--ease-as) 80ms, visibility 0s; }
.as-material-detail[aria-hidden="true"] { opacity: 0; translate: 0 8px; visibility: hidden; pointer-events: none; transition: opacity 200ms var(--ease-as), translate 300ms var(--ease-as), visibility 0s 300ms; }
.as-faq-answer { display: block; opacity: 1; transition: none; }
.as-faq details[open] .as-faq-answer { animation: as-answer-in 360ms var(--ease-as); }
@keyframes as-answer-in { from { opacity: 0; translate: 0 -8px; } to { opacity: 1; translate: 0 0; } }

@media (hover: hover) and (pointer: fine) {
  .as-nav a:hover, .as-text-link:hover, .as-footer-links a:hover { color: var(--color-as-vermilion); }
  .as-nav a:hover::after { transform: scaleX(1); }
  .as-button:hover > span[aria-hidden] { transform: translate(2px, -2px); }
  .as-text-link:hover > span[aria-hidden] { transform: translateY(3px); }
  .as-button:hover { transform: translateY(-3px); }
  .as-button--primary:hover { background: var(--color-as-vermilion); border-color: var(--color-as-vermilion); }
  .as-materials-list button:hover { color: var(--color-as-vermilion); transform: translateX(8px); }
}
@media (max-width: 900px) { .as-header { inset: 12px 16px auto; }.as-nav { display: none; }.as-hero { min-height: auto; padding-top: 140px; grid-template-columns: 1fr; }.as-hero-copy { padding-bottom: 0; }.as-hero-art { min-height: 540px; margin-top: 12px; }.as-hero-foot { position: static; margin-top: 28px; flex-wrap: wrap; gap: 12px 20px; }.as-section-intro { grid-template-columns: 1fr; gap: 16px; }.as-benefits, .as-process, .as-objections { padding-block: 96px; }.as-benefit-grid { grid-template-columns: 1fr 1fr; }.as-benefit:nth-child(n) { transform: none; }.as-materials-head { display: block; }.as-materials-intro { margin-top: 18px; }.as-materials-stage { grid-template-columns: 1fr; }.as-layer-stack { min-height: 480px; }.as-proof-grid { grid-template-columns: 1fr; }.as-quote:nth-child(2) { transform: rotate(2deg); }.as-request { grid-template-columns: 1fr; padding-block: 84px 110px; }.as-footer-inner { grid-template-columns: 1fr 1fr; }.as-footer p { grid-column: span 2; }.as-footer-links { grid-column: span 2; } }
@media (max-width: 540px) { :root { --as-gutter: 16px; }.as-header-inner { padding-left: 12px; }.as-logo-word { font-size: 18px; }.as-header .as-button { min-height: 34px; padding-inline: 11px; font-size: 12px; }.as-hero { padding-top: 118px; }.as-hero h1 { font-size: clamp(2.8rem, 14vw, 4.5rem); }.as-hero-art { min-height: 430px; }.as-art-paper--back { padding: 22px; }.as-art-paper--front { padding: 20px; }.as-art-caption { bottom: -22px; font-size: 9px; }.as-hero-foot { font-size: 9px; }.as-benefit-grid { grid-template-columns: 1fr; margin-top: 40px; }.as-benefit { min-height: auto; padding-block: 22px; }.as-tagline { padding-block: 100px; text-align: left; }.as-tagline .as-kicker { justify-content: flex-start; }.as-tagline h2 { font-size: 2.6rem; }.as-step-grid { grid-template-columns: 1fr; margin-top: 42px; }.as-step, .as-step + .as-step { min-height: auto; padding: 22px 0 42px; border-left: 0; }.as-step h3 { margin-top: 36px; }.as-materials-stage { margin-top: 40px; }.as-layer-stack { min-height: 400px; }.as-material-detail { padding-left: 0; }.as-proof { padding-block: 20px 100px; }.as-proof-top { display: block; }.as-proof-stat { margin-top: 18px; }.as-quote { min-height: 300px; padding: 30px 24px; }.as-quote figcaption { left: 24px; bottom: 24px; }.as-faq { margin-top: 40px; }.as-faq summary { font-size: 18px; }.as-faq details p { padding-right: 0; }.as-request-copy > p:not(.as-kicker) { font-size: 16px; }.as-form { padding: 22px 18px; }.as-form-heading { display: block; }.as-form-heading p { margin-top: 10px; }.as-footer-inner { grid-template-columns: 1fr; }.as-footer p, .as-footer-links { grid-column: auto; } }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .as-site *, .as-site *::before, .as-site *::after { animation: none !important; transition: none !important; }
  .as-tagline [data-as-word] { opacity: 1 !important; }
  .as-progress-bar { transform: scaleX(0) !important; }
  .as-material-detail, .as-material-detail[aria-hidden="true"] { translate: none; }
  .as-form-shell > .as-form-fields, .as-form-shell > .as-form-success { transform: none; }
  .as-button, .as-text-link > span, .as-button > span, .as-materials-list button { translate: none !important; }
  .as-site .as-button:hover, .as-site .as-button:active, .as-text-link > span[aria-hidden], .as-button > span[aria-hidden] { transform: none; }
}
]]>
    </file>
    <file path="src/app/(assemblage)/assemblage/assets.generated.ts">
<![CDATA[// Generated by scripts/process-images.ts. Assemblage currently uses code illustrated media.
export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(assemblage)/assemblage/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/assemblage";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp") {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

export function Picture({ assetKey, alt, className }: { assetKey: string; alt: string; className?: string }) {
  const source = assetSrc(assetKey, 800);
  if (!source) return <div className={`as-placeholder ${className ?? ""}`} role="img" aria-label={alt}>{assetKey}</div>;
  return <img src={source} alt={alt} className={className} width={ASSETS[assetKey].w} height={ASSETS[assetKey].h} loading="lazy" />;
}
]]>
    </file>
    <file path="src/app/(assemblage)/assemblage/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#F6F0E8", color: "#1E1D1B", padding: "64px", position: "relative", overflow: "hidden", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "56%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, letterSpacing: 2 }}>
          <span style={{ width: 24, height: 24, background: "#D95F3F", display: "flex" }} />
          <span>assemblage.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 68, lineHeight: 1.02, fontWeight: 700 }}>
            <span>Make the idea visible</span>
            <span>before you make it real.</span>
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#1D6C63" }}>
            Material studies for independent brands.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 18, letterSpacing: 2 }}>
          MATERIAL STUDY / 01
        </div>
      </div>
      <div style={{ position: "absolute", right: 90, top: 80, width: 340, height: 480, background: "#E7C65A", transform: "rotate(9deg)", display: "flex" }} />
      <div style={{ position: "absolute", right: 150, top: 120, width: 330, height: 430, background: "#1D6C63", transform: "rotate(-10deg)", display: "flex" }} />
      <div style={{ position: "absolute", right: 200, top: 200, width: 250, height: 300, background: "#D95F3F", transform: "rotate(3deg)", display: "flex" }} />
    </div>,
    { ...size },
  );
}
]]>
    </file>
    <file path="src/app/(assemblage)/assemblage/page.tsx">
<![CDATA[import { RequestForm } from "./forms/RequestForm";
import { Reveals } from "./motion/Reveals";
import { ScrollMotion } from "./motion/ScrollMotion";
import { PointerMotion } from "./motion/PointerMotion";
import { Benefits } from "./sections/Benefits";
import { FAQ } from "./sections/FAQ";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { MaterialDeck } from "./sections/MaterialDeck";
import { Process } from "./sections/Process";
import { Proof } from "./sections/Proof";

export default function AssemblagePage() {
  return (
    <div className="as-site">
      <a className="as-skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Benefits />
        <section className="as-tagline" aria-label="Assemblage promise">
          <p className="as-kicker">A material point of view</p>
          <h2>
            {"Good ideas need a surface".split(" ").map((word, index) => <span key={index}><span data-as-word>{word}</span>{index < 4 ? " " : ""}</span>)}
            <br />
            {"before they need a budget.".split(" ").map((word, index) => <span key={index}><span data-as-word>{word}</span>{index < 4 ? " " : ""}</span>)}
          </h2>
        </section>
        <Process />
        <MaterialDeck />
        <Proof />
        <section className="as-objections as-container" id="faq">
          <div className="as-section-intro" data-as-reveal="paper-rise">
            <p className="as-kicker">The practical questions</p>
            <h2>Make room for the messy bit.</h2>
          </div>
          <FAQ />
        </section>
        <section className="as-request as-container" id="request">
          <div className="as-request-copy" data-as-reveal="paper-rise">
            <p className="as-kicker">Start with the scraps</p>
            <h2>Bring the half formed idea.</h2>
            <p>
              Tell us what you have, what feels wrong, and what must survive. We will reply with a useful first question within two working days.
            </p>
            <div className="as-note-card">
              <span className="as-mono">Included</span>
              <strong>One material study, one working session, one launch direction.</strong>
              <span className="as-mono">Usually 2 weeks · £2,400</span>
            </div>
          </div>
          <RequestForm />
        </section>
      </main>
      <Footer />
      <Reveals />
      <ScrollMotion />
      <PointerMotion />
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(assemblage)/assemblage/brand/Logo.tsx">
<![CDATA[export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`as-logo${compact ? " as-logo--compact" : ""}`} aria-label="Assemblage">
      <svg className="as-logo-mark" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M6 8.5 17 4l9 6.5-2 13L12 28 5 19.5Z" fill="var(--as-sand)" stroke="currentColor" strokeWidth="1.5" />
        <path d="m10 12 7-3 6 4-1 8-7 3-6-4Z" fill="var(--as-ochre)" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17" cy="16" r="3" fill="var(--as-vermilion)" />
      </svg>
      {!compact && <span className="as-logo-word">assemblage<span>.</span></span>}
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(assemblage)/assemblage/forms/request.ts">
<![CDATA[export type RequestValues = { name: string; email: string; company: string; note: string };
export type RequestErrors = Partial<Record<keyof RequestValues, string>>;

export function validateRequest(values: RequestValues): RequestErrors {
  const errors: RequestErrors = {};
  if (!values.name.trim()) errors.name = "Add your name";
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = "Enter a work email";
  if (!values.company.trim()) errors.company = "Add your company";
  return errors;
}
]]>
    </file>
    <file path="src/app/(assemblage)/assemblage/forms/RequestForm.tsx">
<![CDATA["use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { validateRequest, type RequestValues } from "./request";

const initial: RequestValues = { name: "", email: "", company: "", note: "" };

export function RequestForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<ReturnType<typeof validateRequest>>({});
  const [sent, setSent] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sent) {
      successRef.current?.focus({ preventScroll: true });
      successRef.current?.scrollIntoView({ block: "nearest" });
    }
  }, [sent]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validateRequest(values);
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  }

  const update = (field: keyof RequestValues) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValues((current) => ({ ...current, [field]: event.target.value }));
  return <div className="as-form-shell" data-state={sent ? "success" : "idle"} data-as-reveal="paper-rise">
    <form className="as-form as-form-fields" onSubmit={submit} noValidate aria-hidden={sent} inert={sent}>
      <div className="as-form-heading"><span className="as-mono">Material study / 01</span><p>Leave the useful bits. We do not need a polished brief.</p></div>
      <label>Name<input value={values.name} onChange={update("name")} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} autoComplete="name" />{errors.name && <span className="as-error" id="name-error">{errors.name}</span>}</label>
      <label>Work email<input type="email" value={values.email} onChange={update("email")} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} autoComplete="email" />{errors.email && <span className="as-error" id="email-error">{errors.email}</span>}</label>
      <label>Company<input value={values.company} onChange={update("company")} aria-invalid={Boolean(errors.company)} aria-describedby={errors.company ? "company-error" : undefined} autoComplete="organization" />{errors.company && <span className="as-error" id="company-error">{errors.company}</span>}</label>
      <label>What are you making?<textarea rows={3} value={values.note} onChange={update("note")} placeholder="A sentence is enough." /></label>
      <button className="as-button as-button--primary" type="submit">Request a study <span aria-hidden="true">↗</span></button>
      <p className="as-form-foot">No mailing list. No sales sequence. Just a reply from a person.</p>
    </form>
    <div ref={successRef} id="as-request-confirmation" tabIndex={-1} className="as-form as-form-success" role="status" aria-live="polite" aria-hidden={!sent} inert={!sent}>
      <span className="as-success-mark" aria-hidden="true">✓</span><p className="as-kicker">Request received</p><h3>We will bring a useful first question.</h3><p>Thanks, {values.name.split(" ")[0] || "there"}. We will write to {values.email} within two working days.</p><a className="as-text-link" href="#top">Back to the top <span aria-hidden="true">↑</span></a>
    </div>
  </div>;
}
]]>
    </file>
    <file path="src/app/(assemblage)/assemblage/motion/PointerMotion.tsx">
<![CDATA["use client";

import { useEffect } from "react";
import { clamp, stepSpring } from "../studio/physics";

export function PointerMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".as-site");
    if (!root) return;
    const pointer = matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let target: HTMLElement | null = null;
    let bounds: DOMRect | null = null;
    const x = { value: 0, velocity: 0 }, y = { value: 0, velocity: 0 };
    let goalX = 0, goalY = 0, frame = 0, last = 0;

    function paint(now: number) {
      frame = 0;
      if (!target) return;
      const dt = Math.min((now - last) / 1000 || .016, .05); last = now;
      stepSpring(x, goalX, dt); stepSpring(y, goalY, dt);
      const card = target.matches(".as-quote, .as-benefit");
      if (card) {
        target.style.setProperty("--as-tilt-x", `${-y.value * 5}deg`);
        target.style.setProperty("--as-tilt-y", `${x.value * 5}deg`);
      } else target.style.translate = `${x.value * 7}px ${y.value * 5}px`;
      if (Math.abs(x.velocity) + Math.abs(y.velocity) > .001 || Math.abs(x.value - goalX) + Math.abs(y.value - goalY) > .001) frame = requestAnimationFrame(paint);
      else if (goalX === 0 && goalY === 0) clear();
    }
    function clear() {
      target?.style.removeProperty("translate");
      target?.style.removeProperty("--as-tilt-x"); target?.style.removeProperty("--as-tilt-y");
      target = null; bounds = null; x.value = y.value = x.velocity = y.velocity = 0;
    }
    function move(event: PointerEvent) {
      if (!pointer.matches || reduced.matches || event.pointerType === "touch") return;
      const next = (event.target as Element).closest<HTMLElement>(".as-button, .as-quote, .as-benefit");
      if (next !== target) { clear(); target = next; bounds = next?.getBoundingClientRect() ?? null; }
      if (!target || !bounds) return;
      goalX = clamp((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      goalY = clamp((event.clientY - bounds.top) / bounds.height) * 2 - 1;
      if (!frame) { last = performance.now(); frame = requestAnimationFrame(paint); }
    }
    function leave(event: PointerEvent) {
      if (event.relatedTarget instanceof Node && target?.contains(event.relatedTarget)) return;
      goalX = goalY = 0;
      if (target && !frame) { last = performance.now(); frame = requestAnimationFrame(paint); }
    }
    const reset = () => { cancelAnimationFrame(frame); frame = 0; clear(); };
    root.addEventListener("pointermove", move, { passive: true }); root.addEventListener("pointerout", leave);
    reduced.addEventListener("change", reset); pointer.addEventListener("change", reset);
    window.addEventListener("scroll", reset, { passive: true });
    return () => {
      reset(); root.removeEventListener("pointermove", move); root.removeEventListener("pointerout", leave);
      reduced.removeEventListener("change", reset); pointer.removeEventListener("change", reset);
      window.removeEventListener("scroll", reset);
    };
  }, []);
  return null;
}
]]>
    </file>
    <file path="src/app/(assemblage)/assemblage/motion/Reveals.tsx">
<![CDATA["use client";

import { useEffect } from "react";

const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
const heroDelays: Record<string, number> = {
  "hero-kicker": 0,
  "hero-title": 60,
  "hero-lead": 140,
  "hero-actions": 210,
  "hero-proof": 280,
};

export function Reveals() {
  useEffect(() => {
    const site = document.querySelector<HTMLElement>(".as-site");
    if (!site) return;

    const nodes = [...site.querySelectorAll<HTMLElement>("[data-as-reveal]")];
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 900px), (max-height: 619px)");
    const animations = new Set<Animation>();
    const restored = window.scrollY > 80 || Boolean(window.location.hash);

    function animate(node: HTMLElement, delay = 0, distance = 24) {
      // Content stays visible in CSS. Only a running animation can conceal it.
      if (typeof node.animate !== "function") return;
      const animation = node.animate(
        [{ opacity: 0, translate: `0 ${distance * (compact.matches ? 0.5 : 1)}px` }, { opacity: 1, translate: "0 0" }],
        { duration: 700, delay, easing: ease, fill: "backwards" },
      );
      animations.add(animation);
      animation.onfinish = animation.oncancel = () => animations.delete(animation);
    }

    function reveal(node: HTMLElement) {
      if (node.dataset.in === "true") return;
      node.dataset.in = "true";
      if (preference.matches) return;

      const kind = node.dataset.asReveal ?? "";
      const order = Number(node.dataset.asOrder ?? 0);
      animate(node, heroDelays[kind] ?? (compact.matches ? 0 : order * 65), kind === "header" ? -12 : 24);
    }

    function finish() {
      animations.forEach((animation) => animation.cancel());
      nodes.forEach((node) => { node.dataset.in = "true"; });
    }

    if (preference.matches || !("IntersectionObserver" in window)) {
      finish();
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: "0px 0px 40px" });

    nodes.forEach((node) => {
      const bounds = node.getBoundingClientRect();
      if (bounds.bottom <= 0 || (restored && bounds.top < window.innerHeight)) {
        node.dataset.in = "true";
      } else if (bounds.top < window.innerHeight) {
        reveal(node);
      } else {
        observer.observe(node);
      }
    });

    const onPreferenceChange = () => {
      if (preference.matches) {
        observer.disconnect();
        finish();
      }
    };
    // Never fade out a control that was reached by keyboard or an anchor jump.
    const onFocus = (event: FocusEvent) => {
      if (event.target instanceof HTMLElement) {
        const node = event.target.closest<HTMLElement>("[data-as-reveal]");
        if (!node) return;
        node.dataset.in = "true";
        observer.unobserve(node);
        node.getAnimations().forEach((animation) => animation.finish());
      }
    };
    preference.addEventListener("change", onPreferenceChange);
    site.addEventListener("focusin", onFocus);

    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      nodes.forEach((node) => { delete node.dataset.in; });
      preference.removeEventListener("change", onPreferenceChange);
      site.removeEventListener("focusin", onFocus);
    };
  }, []);
  return null;
}
]]>
    </file>
    <file path="src/app/(assemblage)/assemblage/motion/ScrollMotion.tsx">
<![CDATA["use client";

import { useEffect } from "react";
import { clamp, mix } from "../studio/physics";

export function ScrollMotion() {
  useEffect(() => {
    const site = document.querySelector<HTMLElement>(".as-site");
    if (!site) return;

    const progress = site.querySelector<HTMLElement>(".as-progress-bar");
    const hero = site.querySelector<HTMLElement>(".as-hero-runway");
    const process = site.querySelector<HTMLElement>(".as-process");
    const track = process?.querySelector<HTMLElement>(".as-step-grid");
    const pieces = [...site.querySelectorAll<HTMLElement>("[data-as-method-piece]")];
    const tagline = site.querySelector<HTMLElement>(".as-tagline");
    const heading = tagline?.querySelector("h2");
    const words = [...site.querySelectorAll<HTMLElement>("[data-as-word]")];
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1000px) and (min-height: 720px)");
    let frame: number | null = null;
    let anchorFrame = 0;
    let userInteracted = false;
    const initialHash = window.location.hash;
    const started = performance.now();

    function update() {
      frame = null;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pageProgress = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
      if (progress) progress.style.transform = `scaleX(${pageProgress})`;

      if (preference.matches) {
        tagline?.removeAttribute("data-as-word-motion");
        hero?.style.removeProperty("--as-departure");
        process?.removeAttribute("data-as-process-live");
        return;
      }

      process?.toggleAttribute("data-as-process-live", desktop.matches);

      if (tagline && heading) {
        const bounds = heading.getBoundingClientRect();
        const readingProgress = Math.min(1, Math.max(0,
          (window.innerHeight * 0.82 - bounds.top) / (window.innerHeight * 0.38 + bounds.height * 0.35),
        ));
        tagline.dataset.asWordMotion = "true";
        words.forEach((word, index) => {
          const next = String(readingProgress >= (index + 1) / words.length);
          if (word.dataset.in !== next) word.dataset.in = next;
        });
      }

      if (desktop.matches && hero) {
        const bounds = hero.getBoundingClientRect();
        hero.style.setProperty("--as-departure", String(clamp(-bounds.top / Math.max(1, bounds.height - innerHeight))));
      } else {
        hero?.style.removeProperty("--as-departure");
      }

      if (desktop.matches && process && track) {
        const bounds = track.getBoundingClientRect();
        const stepHeight = bounds.height / 3;
        const progress = clamp((innerHeight * .5 - bounds.top - stepHeight * .5) / (bounds.height - stepHeight));
        process.style.setProperty("--as-method-progress", String(progress));
        const stage = String(Math.round(progress * 2));
        if (process.dataset.asStage !== stage) process.dataset.asStage = stage;
        process.querySelectorAll<HTMLAnchorElement>(".as-method-stages a").forEach((anchor, index) => {
          if (index === Number(stage)) anchor.setAttribute("aria-current", "step");
          else anchor.removeAttribute("aria-current");
        });
        const from = progress < .5 ? 0 : 1, t = progress < .5 ? progress * 2 : (progress - .5) * 2;
        const poses = [
          [[-55, -45, -18, .85], [70, -30, 22, .82], [-5, 65, -12, .9]],
          [[-75, -55, 0, .78], [85, -45, 0, .8], [0, 85, 0, .8]],
          [[-25, -15, -6, 1], [55, -35, 9, 1], [-10, 55, 4, 1]],
        ];
        pieces.forEach((piece, index) => {
          const a = poses[from][index], b = poses[from + 1][index];
          piece.style.setProperty("--as-piece-transform", `translate3d(${mix(a[0], b[0], t)}px, ${mix(a[1], b[1], t)}px, ${index * 18}px) rotate(${mix(a[2], b[2], t)}deg) scale(${mix(a[3], b[3], t)})`);
        });
      }
    }

    const schedule = () => { if (frame === null) frame = requestAnimationFrame(update); };
    const resize = () => {
      schedule();
      // Hydration can expand the two cinematic scroll ranges after native hash positioning.
      // Correct that initial anchor only until the visitor takes control of the page.
      if (!initialHash || userInteracted || window.location.hash !== initialHash || performance.now() - started > 10_000) return;
      cancelAnimationFrame(anchorFrame);
      anchorFrame = requestAnimationFrame(() => {
        if (userInteracted) return;
        try { document.getElementById(decodeURIComponent(initialHash.slice(1)))?.scrollIntoView({ block: "start", behavior: "instant" }); } catch { /* A malformed fragment is left to native navigation. */ }
      });
    };
    const takeControl = () => { userInteracted = true; };
    const intentEvents = ["pointerdown", "touchstart", "wheel", "keydown"] as const;
    intentEvents.forEach((name) => window.addEventListener(name, takeControl, { passive: true }));
    const resizeObserver = typeof ResizeObserver === "function" ? new ResizeObserver(resize) : null;
    resizeObserver?.observe(site);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("pageshow", schedule);
    preference.addEventListener("change", schedule);
    desktop.addEventListener("change", schedule);
    update();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pageshow", schedule);
      preference.removeEventListener("change", schedule);
      desktop.removeEventListener("change", schedule);
      resizeObserver?.disconnect();
      if (frame !== null) cancelAnimationFrame(frame);
      cancelAnimationFrame(anchorFrame);
      intentEvents.forEach((name) => window.removeEventListener(name, takeControl));
      progress?.style.removeProperty("transform");
      tagline?.removeAttribute("data-as-word-motion");
      words.forEach((word) => { delete word.dataset.in; });
      hero?.style.removeProperty("--as-departure");
      process?.removeAttribute("data-as-process-live");
      process?.style.removeProperty("--as-method-progress");
      pieces.forEach((piece) => piece.style.removeProperty("--as-piece-transform"));
    };
  }, []);
  return null;
}
]]>
    </file>
    <file path="src/app/(assemblage)/assemblage/sections/Benefits.tsx">
<![CDATA[const benefits = [
  ["A clear creative brief", "Turn a handful of references into a direction everyone can point at."],
  ["A feeling you can test", "See how type, image, colour and material behave before the first production file."],
  ["Fewer expensive revisions", "Make the big decisions while the work is still light enough to move."],
  ["A kit your team can carry", "Leave with rules, examples and a language your partners can use tomorrow."],
];

export function Benefits() {
  return (
    <section className="as-benefits as-container" id="benefits">
      <div className="as-section-intro" data-as-reveal="paper-rise"><p className="as-kicker">Why a material study</p><h2>Put shape around the instinct.</h2></div>
      <div className="as-benefit-grid">
        {benefits.map(([title, copy], index) => <article className="as-benefit" key={title} data-as-reveal="paper-rise" data-as-order={index}><span className="as-index">0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(assemblage)/assemblage/sections/FAQ.tsx">
<![CDATA[const questions = [
  ["Is this a brand identity project?", "No. A material study is the working direction before a full identity, campaign or site. It gives the next project something solid to build from."],
  ["What do you need from us?", "A rough brief, a few references and the names of the people who will make the final call. Half formed is a useful starting point."],
  ["How long does it take?", "Most studies take two weeks from the first call to the handoff session. We keep the group small so decisions do not wait in a queue."],
  ["What is included in the handoff?", "A material board, type and image tests, a small set of rules, a recorded walkthrough and one working session with your team."],
  ["Can you work with an existing brand?", "Yes. We can extend an existing system, find its missing texture or help a new direction sit beside what already works."],
  ["What happens after the study?", "You can take the kit to your own team, bring us into production or ask for a separate proposal. There is no retainer attached."],
];

export function FAQ() {
  return <div className="as-faq">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><div className="as-faq-answer"><div><p>{answer}</p></div></div></details>)}</div>;
}
]]>
    </file>
    <file path="src/app/(assemblage)/assemblage/sections/Footer.tsx">
<![CDATA[import { Logo } from "../brand/Logo";

export function Footer() {
  return <footer className="as-footer"><div className="as-footer-inner as-container"><Logo compact /><p>Assemblage is a fictional studio template for teams who make things with a point of view.</p><div className="as-footer-links"><a href="#request">Request a study</a><a href="#faq">Questions</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div><span className="as-mono">© 2026 Assemblage Bureau</span></div></footer>;
}
]]>
    </file>
    <file path="src/app/(assemblage)/assemblage/sections/Header.tsx">
<![CDATA[import { Logo } from "../brand/Logo";

export function Header() {
  return (
    <header className="as-header" data-as-reveal="header">
      <div className="as-header-inner">
        <a className="as-header-logo" href="#top" aria-label="Assemblage home"><Logo /></a>
        <nav className="as-nav" aria-label="Primary navigation">
          <a href="#process">The method</a>
          <a href="#materials">Materials</a>
          <a href="#faq">Questions</a>
        </nav>
        <a className="as-button as-button--small" href="#request">Request a study <span aria-hidden="true">↗</span></a>
      </div>
      <span className="as-progress" aria-hidden="true"><span className="as-progress-bar" /></span>
    </header>
  );
}
]]>
    </file>
    <file path="src/app/(assemblage)/assemblage/sections/Hero.tsx">
<![CDATA[import { MaterialStudio } from "../studio/MaterialStudio";

export function Hero() {
  return (
    <div className="as-hero-runway" id="top"><section className="as-hero as-container">
      <div className="as-hero-copy">
        <p className="as-kicker" data-as-reveal="hero-kicker"><span className="as-kicker-dot" /> Material studies for independent brands</p>
        <h1 data-as-reveal="hero-title">Make the idea visible <span>before you make it real.</span></h1>
        <p className="as-lead" data-as-reveal="hero-lead">Assemblage builds a tactile visual direction from the scraps, references and instincts already in the room.</p>
        <div className="as-hero-actions" data-as-reveal="hero-actions">
          <a className="as-button as-button--primary" href="#request">Request a material study <span aria-hidden="true">↗</span></a>
          <a className="as-text-link" href="#materials">See the layers <span aria-hidden="true">↓</span></a>
        </div>
        <p className="as-hero-proof" data-as-reveal="hero-proof"><span className="as-stamp">2 weeks</span> from loose idea to a launch direction your team can use.</p>
      </div>
      <div className="as-hero-art as-hero-art--interactive">
        <MaterialStudio />
      </div>
      <div className="as-hero-foot" aria-hidden="true"><span>Assemblage / 01</span><span>Scroll to sort the layers</span><span>London · Copenhagen · Remote</span></div>
    </section></div>
  );
}
]]>
    </file>
    <file path="src/app/(assemblage)/assemblage/sections/MaterialDeck.tsx">
<![CDATA["use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { MaterialStudio } from "../studio/MaterialStudio";
import type { LayerId } from "../studio/physics";

const layers: { id: LayerId; name: string; note: string; detail: string }[] = [
  { id: "paper", name: "Paper", note: "The quiet base", detail: "Soft stock, generous margins, a little room to breathe." },
  { id: "ink", name: "Ink", note: "The point of view", detail: "Words with a weight, a mark with a reason, a voice you can recognise." },
  { id: "image", name: "Image", note: "The evidence", detail: "A frame that carries the world instead of decorating it." },
  { id: "signal", name: "Signal", note: "The interruption", detail: "One sharp colour or strange detail that makes the system yours." },
];

export function MaterialDeck() {
  const [active, setActive] = useState<LayerId>("paper");
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowDown": next = (index + 1) % layers.length; break;
      case "ArrowUp": next = (index + layers.length - 1) % layers.length; break;
      case "Home": next = 0; break;
      case "End": next = layers.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setActive(layers[next].id);
    buttons.current[next]?.focus();
  }

  return (
    <section className="as-materials as-container" id="materials">
      <div className="as-materials-head" data-as-reveal="paper-rise"><div><p className="as-kicker">The material index</p><h2>Every layer earns its place.</h2></div><p className="as-materials-intro">Tap a layer to see what it does. A direction gets clearer when you can name the parts.</p></div>
      <div className="as-materials-stage">
        <MaterialStudio variant="workshop" activeLayer={active} onLayerChange={setActive} />
        <div className="as-materials-list" data-as-reveal="paper-rise" data-as-order="1">
          <div role="tablist" aria-label="Material layers" aria-orientation="vertical">
            {layers.map((entry, index) => <button
              key={entry.id}
              ref={(node) => { buttons.current[index] = node; }}
              id={`as-material-tab-${entry.id}`}
              type="button"
              className={active === entry.id ? "is-active" : ""}
              onClick={() => setActive(entry.id)}
              onKeyDown={(event) => navigate(event, index)}
              role="tab"
              tabIndex={active === entry.id ? 0 : -1}
              aria-selected={active === entry.id}
              aria-controls={`as-material-panel-${entry.id}`}
            ><span className="as-material-number">0{index + 1}</span><span><strong>{entry.name}</strong><small>{entry.note}</small></span><span className="as-material-plus" aria-hidden="true" /></button>)}
          </div>
          <div className="as-material-details">
            {layers.map((entry) => <div
              key={entry.id}
              className="as-material-detail"
              id={`as-material-panel-${entry.id}`}
              role="tabpanel"
              aria-labelledby={`as-material-tab-${entry.id}`}
              aria-hidden={active !== entry.id}
              inert={active !== entry.id}
              tabIndex={active === entry.id ? 0 : -1}
            ><span className="as-mono">{entry.name} / {entry.note}</span><p>{entry.detail}</p></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(assemblage)/assemblage/sections/Process.tsx">
<![CDATA[const steps = [
  ["01", "Send the scraps", "A short call and a shared folder are enough. We start with what already has a pulse."],
  ["02", "Assemble the system", "We test the materials together: image against type, texture against tempo, quiet against signal."],
  ["03", "Leave with direction", "You get a practical study, a working session and the rules to keep making from it."],
];

export function Process() {
  return (
    <section className="as-process as-container" id="process">
      <div className="as-section-intro" data-as-reveal="paper-rise"><p className="as-kicker">The method</p><h2>From instinct to something the room can hold.</h2></div>
      <div className="as-process-story">
        <div className="as-process-visual">
          <div className="as-process-visual-inner" aria-hidden="true">
            <span className="as-method-label as-mono">A direction taking shape</span>
            <div className="as-method-piece as-method-piece--paper" data-as-method-piece="0"><span>Room<br />for the<br />unexpected.</span></div>
            <div className="as-method-piece as-method-piece--image" data-as-method-piece="1" />
            <div className="as-method-piece as-method-piece--ink" data-as-method-piece="2">Make it<br />mean<br />something.</div>
            <div className="as-method-progress"><span /></div>
          </div>
          <nav className="as-method-stages as-mono" aria-label="Study stages"><a href="#as-step-01">01 Collect</a><a href="#as-step-02">02 Assemble</a><a href="#as-step-03">03 Resolve</a></nav>
        </div>
        <div className="as-step-grid">
          {steps.map(([number, title, copy], index) => <article className="as-step" id={`as-step-${number}`} key={number} data-as-reveal="paper-rise" data-as-order={index}><span className="as-step-number">{number}</span><h3>{title}</h3><p>{copy}</p><span className="as-step-arrow" aria-hidden="true">↘</span></article>)}
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(assemblage)/assemblage/sections/Proof.tsx">
<![CDATA[const proof = [
  { quote: "The study gave our launch a shared vocabulary. We stopped debating taste and started making decisions.", name: "Mara Ivers", role: "Founder, Field Notes Press", tone: "teal" },
  { quote: "We found the brave version of the idea before the production budget made everything feel permanent.", name: "Jonas Bell", role: "Creative lead, Northline Objects", tone: "ochre" },
];

export function Proof() {
  return (
    <section className="as-proof as-container">
      <div className="as-proof-top" data-as-reveal="paper-rise"><p className="as-kicker">Small teams, strong point of view</p><p className="as-proof-stat"><strong>17</strong> studies made · <strong>4.8/5</strong> clarity score</p></div>
      <div className="as-proof-grid">
        {proof.map((item, index) => <figure className={`as-quote as-quote--${item.tone}`} key={item.name} data-as-reveal="paper-rise" data-as-order={index}><div className="as-quote-mark">“</div><blockquote>{item.quote}</blockquote><figcaption><strong>{item.name}</strong><span>{item.role}</span></figcaption><span className="as-quote-tape" aria-hidden="true" /></figure>)}
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(assemblage)/assemblage/studio/engine.ts">
<![CDATA[import * as THREE from "three";
import { advanceDrift, carouselLayout, clamp, CLOCKWISE_SPEED, MATERIALS, nearestSlide, releaseSlide, stepSpring, wrapIndex, type LayerId, type Spring } from "./physics";
import { printTexture } from "./textures";

export type StudioSettings = { spread: number; light: number; selected: LayerId };

/** A full-bleed paper carousel. One spring owns its continuous position; React owns selection. */
export function createPaperStudio(root: HTMLElement, host: HTMLElement, initial: StudioSettings, select: (id: LayerId, automatic?: boolean) => void) {
  const surface = host.parentElement!;
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = .95;
  const canvas = renderer.domElement; canvas.setAttribute("aria-hidden", "true"); host.appendChild(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, .1, 40);
  camera.position.z = 9.8;
  const assembly = new THREE.Group(); scene.add(assembly);
  scene.add(new THREE.HemisphereLight(0xf6f0e8, 0xe2d8c9, 2.7));
  const light = new THREE.DirectionalLight(0xffffff, 3.2);
  light.position.set(-3, 5, 8); light.castShadow = true;
  const shadowSize = matchMedia("(pointer: fine)").matches ? 2048 : 1024;
  light.shadow.mapSize.set(shadowSize, shadowSize);
  Object.assign(light.shadow.camera, { left: -8, right: 8, top: 6, bottom: -6 });
  light.shadow.normalBias = .015; light.shadow.bias = -.0003; light.shadow.radius = 4; scene.add(light);
  const shadowGeometry = new THREE.PlaneGeometry(22, 14);
  const shadowMaterial = new THREE.ShadowMaterial({ opacity: .12, depthWrite: false });
  const ground = new THREE.Mesh(shadowGeometry, shadowMaterial); ground.position.z = -.8; ground.receiveShadow = true; scene.add(ground);
  const styles = getComputedStyle(root);
  const bodyFont = styles.getPropertyValue("--font-assemblage-body").trim() || "sans-serif";
  const monoFont = styles.getPropertyValue("--font-assemblage-mono").trim() || "monospace";
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const fine = matchMedia("(pointer: fine)");
  let settings = initial;
  let target = Math.max(0, MATERIALS.findIndex((material) => material.id === initial.selected));
  const track: Spring = { value: target, velocity: 0 };
  const drift = { speed: CLOCKWISE_SPEED };
  let manualUntil = 0;
  let announced = initial.selected;
  const tilt: Spring = { value: 0, velocity: 0 };
  let tiltTarget = 0;
  let visible = false, disposed = false, contextAvailable = true;
  let frame = 0, lastTime = 0, started = 0, hovered = -1, departure = 0;
  let pointer: { id: number; startX: number; startY: number; x: number; time: number; velocity: number; position: number; drift: number; moved: boolean; hit: number } | null = null;
  const raycaster = new THREE.Raycaster(), mouse = new THREE.Vector2(), corner = new THREE.Vector3();
  const sheets = MATERIALS.map((material) => {
    const texture = printTexture(material.id, bodyFont, monoFont);
    const geometry = new THREE.PlaneGeometry(material.width, material.height, 22, 26);
    const surface = new THREE.MeshStandardMaterial({ map: texture, side: THREE.DoubleSide, roughness: material.id === "signal" ? .32 : .92, transparent: true, opacity: 1, metalness: 0, depthWrite: material.id !== "signal" });
    const mesh = new THREE.Mesh(geometry, surface); mesh.castShadow = true; mesh.receiveShadow = true; assembly.add(mesh);
    return { mesh, texture, bend: { value: .035, velocity: 0 } };
  });

  function paint(now: number) {
    frame = 0;
    if (disposed || !contextAvailable || !visible || document.hidden) return;
    const elapsed = (now - lastTime) / 1000 || .016;
    const dt = Math.min(elapsed, .05); lastTime = now;
    if (!started) started = now;
    const intro = reduced.matches ? 1 : clamp((now - started) / 1100);
    const entrance = 1 - Math.pow(1 - intro, 4);
    const distance = advanceDrift(drift, Math.min(elapsed, .25), Boolean(pointer) || now < manualUntil, reduced.matches);
    if (pointer) {
      pointer.drift += distance;
      track.value = pointer.position - (pointer.x - pointer.startX) / Math.max(180, surface.clientWidth * .65) + pointer.drift;
      target = track.value;
    } else {
      target += distance;
      stepSpring(track, target, dt, reduced.matches);
    }
    stepSpring(tilt, reduced.matches ? 0 : tiltTarget, dt, reduced.matches);
    assembly.rotation.x = tilt.value;
    let moving = intro < 1 || Boolean(pointer) || Math.abs(track.value - target) > Math.max(.04, Math.abs(drift.speed) * .2) || Math.abs(track.velocity - drift.speed) > .015 || Math.abs(tilt.velocity) > .001;
    const poses = carouselLayout(track.value, 4.1 + settings.spread / 100 * .7, camera.position.z);
    sheets.forEach((sheet, index) => {
      const material = MATERIALS[index], pose = poses[index];
      const distance = Math.abs(pose.x) / 4.1;
      sheet.mesh.position.set(pose.x, pose.y + (1 - entrance) * 1.5, pose.z - departure * distance * .35);
      sheet.mesh.rotation.set(pose.rx + (1 - entrance) * .35, pose.ry, pose.rz);
      sheet.mesh.scale.setScalar(pose.scale * (.92 + entrance * .08));
      sheet.mesh.material.opacity = pose.opacity * entrance * (material.id === "signal" ? .88 : 1);
      sheet.mesh.visible = pose.opacity > .001;
      const oldBend = sheet.bend.value;
      stepSpring(sheet.bend, reduced.matches ? .035 : pointer?.moved ? clamp(pointer.velocity * .035, -.18, .18) : hovered === index ? .09 : .035, dt, reduced.matches);
      if (Math.abs(oldBend - sheet.bend.value) > .00005 || intro < 1 || !root.dataset.asSceneReady) {
        const vertices = sheet.mesh.geometry.attributes.position;
        for (let vertex = 0; vertex < vertices.count; vertex++) {
          const x = vertices.getX(vertex) / material.width * 2, y = vertices.getY(vertex) / material.height * 2;
          vertices.setZ(vertex, Math.pow(Math.abs(x), 3) * sheet.bend.value + Math.sin(y * 2 + index) * .025);
        }
        vertices.needsUpdate = true; sheet.mesh.geometry.computeVertexNormals();
      }
      moving ||= Math.abs(sheet.bend.velocity) > .001;
    });
    assembly.updateMatrixWorld(true); camera.updateMatrixWorld();
    root.dataset.asMaterialBounds = JSON.stringify(sheets.map((sheet, index) => {
      const material = MATERIALS[index];
      const bounds = { left: Infinity, right: -Infinity, top: Infinity, bottom: -Infinity, opacity: sheet.mesh.material.opacity };
      for (const x of [-1, 1]) for (const y of [-1, 1]) {
        corner.set(x * material.width / 2, y * material.height / 2, .12).applyMatrix4(sheet.mesh.matrixWorld).project(camera);
        bounds.left = Math.min(bounds.left, corner.x); bounds.right = Math.max(bounds.right, corner.x);
        bounds.top = Math.min(bounds.top, corner.y); bounds.bottom = Math.max(bounds.bottom, corner.y);
      }
      return bounds;
    }));
    root.dataset.asCarouselPosition = track.value.toFixed(4);
    root.dataset.asCarouselIndex = String(wrapIndex(Math.round(track.value)));
    root.dataset.asDriftSpeed = drift.speed.toFixed(5);
    root.dataset.asAutoplay = reduced.matches ? "reduced" : "clockwise";
    const current = MATERIALS[wrapIndex(Math.round(track.value))].id;
    // Do not echo automatic selection back into the spring as a new snap target.
    if (!pointer && Math.abs(track.value - target) < .12 && current !== announced) {
      announced = current; select(current, true);
    }
    light.position.set(Math.cos(settings.light / 100 * Math.PI) * 6 - 2, 5, 8);
    renderer.render(scene, camera);
    root.dataset.asSceneReady = "true";
    root.dataset.asSceneSettled = String(!moving);
    if (moving || !reduced.matches) kick(false);
  }
  function kick(markUnsettled = true) {
    if (disposed || !contextAvailable || frame || !visible || document.hidden) return;
    if (!lastTime || (markUnsettled && performance.now() - lastTime > 100)) lastTime = performance.now() - 16;
    if (markUnsettled) root.dataset.asSceneSettled = "false";
    frame = requestAnimationFrame(paint);
  }
  function measure() {
    const bounds = surface.getBoundingClientRect(), width = Math.max(1, surface.clientWidth), height = Math.max(1, surface.clientHeight);
    const bleed = parseFloat(getComputedStyle(host).getPropertyValue("--as-canvas-bleed")) || 224;
    const renderWidth = document.documentElement.clientWidth, renderHeight = height + bleed * 2;
    host.style.left = `${-bounds.left}px`; host.style.width = `${renderWidth}px`;
    camera.position.z = width / height < .85 ? 11 : 9.8;
    camera.setViewOffset(width, height, -bounds.left, -bleed, renderWidth, renderHeight);
    camera.updateProjectionMatrix(); renderer.setSize(renderWidth, renderHeight, false); kick();
  }
  function point(event: PointerEvent) {
    const bounds = canvas.getBoundingClientRect();
    mouse.set((event.clientX - bounds.left) / bounds.width * 2 - 1, -(event.clientY - bounds.top) / bounds.height * 2 + 1);
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(sheets.filter(sheet => sheet.mesh.visible && sheet.mesh.material.opacity > .12).map(sheet => sheet.mesh), false);
    return hits[0] ? sheets.findIndex(sheet => sheet.mesh === hits[0].object) : -1;
  }
  function inside(event: PointerEvent) {
    const bounds = surface.getBoundingClientRect();
    return event.clientX >= bounds.left && event.clientX <= bounds.right && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
  }
  const control = (event: PointerEvent) => event.target instanceof Element && Boolean(event.target.closest("a, button, input, textarea, select, summary"));
  function onDown(event: PointerEvent) {
    if (event.button !== 0 || pointer || !visible || !contextAvailable || root.dataset.asSceneReady !== "true" || control(event)) return;
    const hit = point(event); if (hit < 0 && !inside(event)) return;
    if (event.pointerType !== "touch") { event.preventDefault(); canvas.setPointerCapture(event.pointerId); }
    pointer = { id: event.pointerId, startX: event.clientX, startY: event.clientY, x: event.clientX, time: performance.now(), velocity: 0, position: track.value, drift: 0, moved: false, hit };
    manualUntil = performance.now() + 5000;
    track.velocity = 0; kick();
  }
  function onMove(event: PointerEvent) {
    if (!visible || !contextAvailable) return;
    if (!pointer || pointer.id !== event.pointerId) {
      const next = control(event) ? -1 : point(event);
      if (next !== hovered) { hovered = next; kick(); }
      const nextTilt = fine.matches && !reduced.matches && inside(event) ? clamp((event.clientY - surface.getBoundingClientRect().top) / surface.clientHeight - .5, -.5, .5) * .1 : 0;
      if (nextTilt !== tiltTarget) { tiltTarget = nextTilt; kick(); }
      return;
    }
    const dx = event.clientX - pointer.startX, dy = event.clientY - pointer.startY;
    if (!pointer.moved && Math.hypot(dx, dy) < 6) return;
    if (!pointer.moved && event.pointerType === "touch" && Math.abs(dy) > Math.abs(dx)) return;
    if (!pointer.moved) { pointer.moved = true; canvas.setPointerCapture(event.pointerId); root.dataset.asDragging = "true"; }
    const pixels = Math.max(180, surface.clientWidth * .65), now = performance.now();
    const velocity = -(event.clientX - pointer.x) / Math.max(8, now - pointer.time) * 1000 / pixels;
    pointer.velocity = pointer.velocity * .3 + velocity * .7;
    track.value = pointer.position - dx / pixels + pointer.drift; track.velocity = 0;
    pointer.x = event.clientX; pointer.time = now; kick();
  }
  function goTo(value: number) {
    target = Math.round(value); announced = MATERIALS[wrapIndex(target)].id;
    manualUntil = performance.now() + 5000; select(announced); kick();
  }
  function release(event: PointerEvent) {
    if (!pointer || pointer.id !== event.pointerId) return;
    const drag = pointer; pointer = null; root.dataset.asDragging = "false";
    if (event.type === "pointerup" && drag.moved) {
      const velocity = !reduced.matches && performance.now() - drag.time < 100 ? drag.velocity : 0;
      track.velocity = clamp(velocity, -6, 6); goTo(releaseSlide(track.value, velocity));
    } else if (event.type === "pointerup" && drag.hit >= 0) {
      goTo(nearestSlide(drag.hit, target));
    } else { goTo(Math.round(track.value)); }
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  }
  const scroll = () => {
    if (root.dataset.variant !== "hero") return;
    const bounds = root.closest<HTMLElement>(".as-hero-runway")?.getBoundingClientRect();
    departure = bounds && !reduced.matches ? clamp(-bounds.top / Math.max(1, bounds.height - innerHeight)) : 0; kick();
  };
  const visibility = () => {
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; pointer = null; root.dataset.asDragging = "false"; }
    else kick();
  };
  const mode = () => { pointer = null; track.velocity = 0; root.dataset.asDragging = "false"; kick(); };
  const lost = (event: Event) => { event.preventDefault(); contextAvailable = false; delete root.dataset.asSceneReady; cancelAnimationFrame(frame); frame = 0; };
  const restored = () => { contextAvailable = true; measure(); kick(); };
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) kick(); else { cancelAnimationFrame(frame); frame = 0; } }, { rootMargin: "120px" });
  observer.observe(root);
  const sizes = new ResizeObserver(measure); sizes.observe(surface);
  document.addEventListener("pointerdown", onDown); document.addEventListener("pointermove", onMove);
  document.addEventListener("pointerup", release); document.addEventListener("pointercancel", release);
  canvas.addEventListener("lostpointercapture", release);
  canvas.addEventListener("webglcontextlost", lost); canvas.addEventListener("webglcontextrestored", restored);
  window.addEventListener("resize", measure); window.addEventListener("scroll", scroll, { passive: true });
  document.addEventListener("visibilitychange", visibility); reduced.addEventListener("change", mode);
  measure(); scroll();
  return {
    advance(direction: number) {
      target = Math.round(performance.now() < manualUntil ? target : track.value) + direction;
      announced = MATERIALS[wrapIndex(target)].id; manualUntil = performance.now() + 5000; kick();
    },
    update(next: StudioSettings) {
      if (next.selected !== announced) {
        target = nearestSlide(MATERIALS.findIndex(material => material.id === next.selected), track.value);
        announced = next.selected; manualUntil = performance.now() + 5000;
      }
      settings = next; kick();
    },
    dispose() {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect(); sizes.disconnect();
      document.removeEventListener("pointerdown", onDown); document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", release); document.removeEventListener("pointercancel", release);
      canvas.removeEventListener("lostpointercapture", release);
      canvas.removeEventListener("webglcontextlost", lost); canvas.removeEventListener("webglcontextrestored", restored);
      window.removeEventListener("resize", measure); window.removeEventListener("scroll", scroll);
      document.removeEventListener("visibilitychange", visibility); reduced.removeEventListener("change", mode);
      sheets.forEach(sheet => { sheet.mesh.geometry.dispose(); sheet.mesh.material.dispose(); sheet.texture.dispose(); });
      shadowGeometry.dispose(); shadowMaterial.dispose(); light.shadow.map?.dispose();
      renderer.dispose(); renderer.forceContextLoss(); canvas.remove(); delete root.dataset.asSceneReady; delete root.dataset.asSceneSettled;
    },
  };
}
]]>
    </file>
    <file path="src/app/(assemblage)/assemblage/studio/MaterialStudio.tsx">
<![CDATA["use client";

import { useEffect, useId, useRef, useState } from "react";
import type { StudioSettings } from "./engine";
import { MATERIALS, wrapIndex, type LayerId } from "./physics";

export function MaterialStudio({ variant = "hero", activeLayer, onLayerChange }: {
  variant?: "hero" | "workshop";
  activeLayer?: LayerId;
  onLayerChange?: (id: LayerId) => void;
}) {
  const root = useRef<HTMLDivElement>(null), host = useRef<HTMLDivElement>(null), fallback = useRef<HTMLDivElement>(null);
  const engine = useRef<ReturnType<typeof import("./engine").createPaperStudio> | null>(null);
  const [spread, setSpread] = useState(0), [light, setLight] = useState(28);
  const [localLayer, setLocalLayer] = useState<LayerId>("paper");
  const [announcement, setAnnouncement] = useState("Paper. Material 1 of 4.");
  const selected = activeLayer ?? localLayer;
  const selectedRef = useRef(selected);
  const index = MATERIALS.findIndex(material => material.id === selected);
  const settings = useRef<StudioSettings>({ spread, light, selected });
  const selectRef = useRef<(id: LayerId, automatic?: boolean) => void>(() => {});
  const fallbackTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const id = useId();

  useEffect(() => {
    selectRef.current = (layer, automatic = false) => {
      selectedRef.current = layer; setLocalLayer(layer); onLayerChange?.(layer);
      if (!automatic) {
        const index = MATERIALS.findIndex(material => material.id === layer);
        setAnnouncement(`${MATERIALS[index].label}. Material ${index + 1} of 4.`);
      }
    };
  }, [onLayerChange]);
  useEffect(() => {
    selectedRef.current = selected;
    settings.current = { spread, light, selected };
    engine.current?.update(settings.current);
    const node = fallback.current;
    node?.scrollTo({ left: index * node.clientWidth, behavior: "instant" });
  }, [spread, light, selected, index]);
  useEffect(() => {
    let cancelled = false;
    let instance: typeof engine.current = null;
    const node = root.current, mount = host.current;
    if (!node || !mount) return;
    Promise.all([import("./engine"), document.fonts.ready]).then(([{ createPaperStudio }]) => {
      if (cancelled) return;
      try {
        instance = createPaperStudio(node, mount, settings.current, (layer, automatic) => selectRef.current(layer, automatic));
        engine.current = instance;
      } catch { node.dataset.asSceneFallback = "true"; }
    }).catch(() => { if (!cancelled) node.dataset.asSceneFallback = "true"; });
    return () => { cancelled = true; instance?.dispose(); engine.current = null; if (fallbackTimer.current) clearTimeout(fallbackTimer.current); };
  }, []);

  function select(layer: LayerId) { selectRef.current(layer); }
  function advance(direction: number) {
    const current = MATERIALS.findIndex(material => material.id === selectedRef.current);
    engine.current?.advance(direction);
    select(MATERIALS[wrapIndex(current + direction)].id);
  }

  return <div ref={root} className={`as-studio as-studio--${variant}`} data-variant={variant} data-selected={selected} role="region" aria-roledescription="carousel" aria-label={variant === "hero" ? "Material study" : "Material workshop"}>
    <div className="as-studio-topline as-mono"><span><span className="as-studio-dot" /> The material carousel</span><span>{String(index + 1).padStart(2, "0")} / 04</span></div>
    <div className="as-studio-surface" role="group" tabIndex={0} aria-label="Swipe to browse materials. Use left and right arrow keys to change slides." onKeyDown={(event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); advance(event.key === "ArrowRight" ? 1 : -1); }
      else if (event.key === "Home" || event.key === "End") { event.preventDefault(); select(MATERIALS[event.key === "Home" ? 0 : MATERIALS.length - 1].id); }
    }}>
      <div ref={fallback} className="as-studio-fallback" aria-hidden="true" onScroll={() => {
        if (fallbackTimer.current) clearTimeout(fallbackTimer.current);
        fallbackTimer.current = setTimeout(() => {
          const node = fallback.current; if (!node || root.current?.dataset.asSceneReady === "true") return;
          const material = MATERIALS[Math.min(3, Math.round(node.scrollLeft / node.clientWidth))];
          if (material.id !== selectedRef.current) select(material.id);
        }, 120);
      }}>
        <div className="as-studio-slide"><div className="as-studio-sheet as-studio-sheet--paper"><span>MAKE ROOM<br />FOR THE<br />UNEXPECTED</span><small>A WORKING SURFACE.</small></div></div>
        <div className="as-studio-slide"><div className="as-studio-sheet as-studio-sheet--image"><i /><span>FIELD NOTE 07</span></div></div>
        <div className="as-studio-slide"><div className="as-studio-sheet as-studio-sheet--ink"><span>material<br />is a point<br />of view</span></div></div>
        <div className="as-studio-slide"><div className="as-studio-sheet as-studio-sheet--signal"><span>ASSEMBLE<br />REPEAT<br />REFINE</span><strong>look<br />again.</strong></div></div>
      </div>
      <div className="as-studio-canvas" ref={host} />
      <span className="as-studio-cross as-studio-cross--tl" aria-hidden="true">+</span><span className="as-studio-cross as-studio-cross--br" aria-hidden="true">+</span>
    </div>
    <span className="as-carousel-status" role="status" aria-live="polite" aria-atomic="true">{announcement}</span>
    {variant === "workshop" && <div className="as-studio-settings">
      <label htmlFor={`${id}-spread`}><span className="as-mono">Space between sheets <output>{spread}%</output></span><input id={`${id}-spread`} type="range" min="0" max="100" value={spread} onChange={event => setSpread(Number(event.target.value))} /></label>
      <label htmlFor={`${id}-light`}><span className="as-mono">Move the light</span><input id={`${id}-light`} type="range" min="0" max="100" value={light} onChange={event => setLight(Number(event.target.value))} /></label>
    </div>}
  </div>;
}
]]>
    </file>
    <file path="src/app/(assemblage)/assemblage/studio/physics.ts">
<![CDATA[export type LayerId = "paper" | "image" | "ink" | "signal";
export type Spring = { value: number; velocity: number };
export const MATERIALS: { id: LayerId; label: string; width: number; height: number }[] = [
  { id: "paper", label: "Paper", width: 3.25, height: 4.25 },
  { id: "image", label: "Image", width: 3, height: 2.9 },
  { id: "ink", label: "Ink", width: 2.65, height: 2.8 },
  { id: "signal", label: "Signal", width: 2, height: 2.25 },
];
export const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
export const mix = (a: number, b: number, t: number) => a + (b - a) * t;
export const wrapIndex = (value: number, count = MATERIALS.length) => ((value % count) + count) % count;
export const carouselDistance = (index: number, position: number) => wrapIndex(index - position + 2) - 2;
export const nearestSlide = (index: number, position: number) => position + carouselDistance(index, position);
export const releaseSlide = (position: number, velocity: number) => Math.round(position + clamp(velocity * .18, -1, 1)) || 0;

export const CLOCKWISE_SPEED = -.34;
export const MANUAL_SPEED = -.072;
export type DriftState = { speed: number };

/** Exact integration of the speed blend keeps drift consistent across frame rates. */
export function advanceDrift(state: DriftState, seconds: number, interacting: boolean, reduced = false) {
  if (reduced) { state.speed = 0; return 0; }
  const desired = interacting ? MANUAL_SPEED : CLOCKWISE_SPEED;
  const decay = Math.exp(-seconds * 5);
  const distance = desired * seconds + (state.speed - desired) * (1 - decay) / 5;
  state.speed = desired + (state.speed - desired) * decay;
  return distance;
}

export function carouselPose(index: number, position: number, spacing = 4.1) {
  const distance = carouselDistance(index, position);
  const depth = Math.abs(distance);
  const focus = Math.exp(-depth * depth * 1.8);
  const angle = distance * Math.PI / 2;
  return {
    // Negative track motion carries the front sheet rightward around the vertical axis.
    x: Math.sin(angle) * spacing, y: depth * .08, z: (Math.cos(angle) - 1) * 1.5,
    rx: -.025, ry: -clamp(distance, -1, 1) * .28, rz: -clamp(distance, -1, 1) * .045,
    scale: .76 + focus * .24,
    opacity: depth > .85 ? clamp((1.12 - depth) / .27) * (.46 + Math.exp(-.85 * .85 * 1.8) * .54) : .46 + focus * .54,
  };
}

/** Halve the empty edge-to-edge gaps, rather than halving centers and overlapping the artwork. */
export function carouselLayout(position: number, spacing = 4.1, cameraZ = 9.8, gapRatio = .5) {
  const poses = MATERIALS.map((_, index) => carouselPose(index, position, spacing));
  const visible = poses.map((pose, index) => {
    const perspective = cameraZ / (cameraZ - pose.z);
    const material = MATERIALS[index];
    const half = (material.width * Math.abs(Math.cos(pose.ry)) + material.height * Math.abs(Math.sin(pose.rz))) * pose.scale * perspective / 2;
    return { index, x: pose.x * perspective, half, perspective, weight: pose.opacity * pose.opacity, next: 0 };
  }).filter(item => poses[item.index].opacity > .001).sort((a, b) => a.x - b.x);
  if (visible.length < 2) return poses;
  for (let index = 1; index < visible.length; index++) {
    const previous = visible[index - 1], current = visible[index];
    const gap = Math.max(0, current.x - previous.x - previous.half - current.half);
    current.next = previous.next + previous.half + current.half + gap * gapRatio;
  }
  const weight = visible.reduce((sum, item) => sum + item.weight, 0);
  const shift = visible.reduce((sum, item) => sum + (item.x - item.next) * item.weight, 0) / weight;
  visible.forEach(item => { poses[item.index].x = (item.next + shift) / item.perspective; });
  return poses;
}

/** Substepped spring integration remains stable when a renderer drops a frame. */
export function stepSpring(spring: Spring, target: number, dt: number, immediate = false) {
  if (immediate) { spring.value = target; spring.velocity = 0; return; }
  const steps = Math.max(1, Math.ceil(Math.min(dt, .064) / .008));
  const step = Math.min(dt, .064) / steps;
  for (let i = 0; i < steps; i++) {
    spring.velocity += ((target - spring.value) * 135 - spring.velocity * 18) * step;
    spring.value += spring.velocity * step;
  }
}
]]>
    </file>
    <file path="src/app/(assemblage)/assemblage/studio/studio.css">
<![CDATA[.as-studio { position: relative; min-width: 0; isolation: isolate; }
.as-site #top { scroll-margin-top: 0; }
.as-studio-topline { display: flex; justify-content: space-between; gap: 16px; align-items: center; padding: 16px 4px; color: var(--color-as-teal); }
.as-studio-topline > span:first-child { display: inline-flex; gap: 8px; align-items: center; }
.as-studio-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--color-as-vermilion); }
.as-studio-surface { position: relative; height: 520px; overflow: visible; cursor: grab; }
.as-studio[data-as-scene-ready="true"] .as-studio-surface { touch-action: pan-y; }
.as-studio-canvas { --as-canvas-bleed: 224px; position: absolute; top: calc(-1 * var(--as-canvas-bleed)); bottom: calc(-1 * var(--as-canvas-bleed)); left: 0; width: 100vw; pointer-events: none; }
.as-studio-canvas canvas { display: block; width: 100%; height: 100%; pointer-events: none; }
.as-studio-topline, .as-studio-settings { position: relative; z-index: 1; }
.as-studio[data-as-dragging="true"] .as-studio-surface { cursor: grabbing; }
.as-studio-fallback { position: absolute; inset: 0; display: flex; overflow-x: auto; overflow-y: hidden; scroll-snap-type: x mandatory; scrollbar-width: none; transition: opacity 500ms var(--ease-as); }
.as-studio-fallback::-webkit-scrollbar { display: none; }
.as-studio[data-as-scene-ready="true"] .as-studio-fallback { opacity: 0; pointer-events: none; }
.as-studio-slide { position: relative; flex: 0 0 100%; min-width: 0; height: 100%; scroll-snap-align: center; }
.as-studio-sheet { position: absolute; box-shadow: 8px 12px 0 rgba(30,29,27,.12); }
.as-studio-sheet--paper { width: 61%; height: 79%; left: 19.5%; top: 8%; transform: rotate(-4deg); padding: 28px; background: var(--color-as-paper); border: 1px solid var(--as-line); }
.as-studio-sheet--paper > span { font-size: clamp(20px, 2.4vw, 36px); line-height: 1; font-weight: 700; letter-spacing: -.04em; }
.as-studio-sheet--paper small { position: absolute; bottom: 20px; left: 28px; font-family: var(--font-as-mono); font-size: 9px; }
.as-studio-sheet--image { width: 65%; height: 64%; left: 17.5%; top: 15%; transform: rotate(4deg); background: var(--color-as-teal); overflow: hidden; }
.as-studio-sheet--image i { position: absolute; width: 40%; aspect-ratio: 1; right: 12%; top: 12%; background: var(--color-as-ochre); border-radius: 50%; }
.as-studio-sheet--image::after { content: ""; position: absolute; top: 60%; left: -10%; width: 120%; height: 20px; background: var(--color-as-paper); transform: rotate(-25deg); }
.as-studio-sheet--image > span { position: absolute; left: 24px; bottom: 20px; color: var(--color-as-paper); font-family: var(--font-as-mono); font-size: 10px; }
.as-studio-sheet--ink { width: 60%; height: 65%; left: 20%; top: 15%; transform: rotate(-3deg); background: var(--color-as-vermilion); padding: 28px; color: var(--color-as-paper); font-size: clamp(28px, 3vw, 48px); font-weight: 700; letter-spacing: -.04em; line-height: .95; }
.as-studio-sheet--signal { width: 52%; height: 62%; left: 24%; top: 17%; transform: rotate(4deg); padding: 24px; background: rgba(231,198,90,.8); border: 1px solid var(--color-as-ink); font-family: var(--font-as-mono); font-size: 12px; line-height: 1.5; letter-spacing: .1em; }
.as-studio-sheet--signal strong { display: block; margin-top: 32px; font-family: var(--font-as-body); font-size: clamp(30px, 4vw, 54px); line-height: 1; letter-spacing: -.04em; }
.as-studio-cross { position: absolute; pointer-events: none; color: var(--color-as-vermilion); font-size: 20px; }
.as-studio-cross--tl { top: 24px; left: 8px; }.as-studio-cross--br { right: 8px; bottom: 48px; }
.as-carousel-status { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }
.as-hero-art.as-hero-art--interactive { min-height: 0; margin: 0; }
.as-studio--workshop { padding: 8px 0 22px; }
.as-studio--workshop .as-studio-surface { height: 490px; }
.as-studio-settings { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; padding-top: 12px; }
.as-studio-settings label { display: grid; gap: 12px; }
.as-studio-settings label > span { display: flex; justify-content: space-between; gap: 8px; font-size: 9px; }
.as-studio-settings input { accent-color: var(--color-as-vermilion); width: 100%; margin: 0; cursor: ew-resize; }
.as-process-visual { display: none; }
.as-process-visual-inner { position: relative; width: 100%; height: 480px; perspective: 900px; background: var(--color-as-sand); overflow: hidden; }
.as-method-label { position: absolute; top: 24px; left: 24px; z-index: 5; }
.as-method-piece { position: absolute; width: 58%; height: 62%; top: 19%; left: 21%; padding: 24px; transform: var(--as-piece-transform, rotate(-6deg)); box-shadow: 10px 16px 0 rgba(30,29,27,.12); }
.as-method-piece--paper { background: var(--color-as-paper); border: 1px solid var(--as-line); }
.as-method-piece--paper span { font-size: 30px; line-height: 1; font-weight: 700; letter-spacing: -.05em; }
.as-method-piece--image { width: 47%; height: 48%; left: 30%; top: 24%; background: var(--color-as-teal); }
.as-method-piece--image::after { content: ""; position: absolute; width: 55%; aspect-ratio: 1; border-radius: 50%; background: var(--color-as-ochre); top: 12%; right: 12%; }
.as-method-piece--ink { width: 42%; height: 42%; left: 27%; top: 36%; background: var(--color-as-vermilion); color: var(--color-as-paper); font-size: 30px; line-height: 1; font-weight: 700; letter-spacing: -.05em; }
.as-method-progress { position: absolute; bottom: 24px; left: 24px; right: 24px; height: 2px; background: var(--as-line); }
.as-method-progress span { display: block; height: 100%; background: var(--color-as-vermilion); transform-origin: left; transform: scaleX(var(--as-method-progress, 0)); }
.as-method-stages { display: flex; justify-content: space-between; gap: 12px; margin-top: 18px; }
.as-method-stages a { opacity: .4; transition: opacity 300ms var(--ease-as); }
.as-process[data-as-stage="0"] .as-method-stages a:nth-child(1), .as-process[data-as-stage="1"] .as-method-stages a:nth-child(2), .as-process[data-as-stage="2"] .as-method-stages a:nth-child(3) { opacity: 1; color: var(--color-as-vermilion); }
@media (hover: hover) and (pointer: fine) {
  .as-site .as-benefit { transform: translateY(var(--as-offset, 0px)) rotate(var(--as-rotation, 0deg)) perspective(800px) rotateX(var(--as-tilt-x, 0deg)) rotateY(var(--as-tilt-y, 0deg)); }
  .as-site .as-proof .as-quote { transform: rotate(var(--as-rotation, 0deg)) translateY(var(--as-offset, 0px)) perspective(900px) rotateX(var(--as-tilt-x, 0deg)) rotateY(var(--as-tilt-y, 0deg)); }
}
@media (min-width: 1000px) and (min-height: 720px) and (prefers-reduced-motion: no-preference) {
  .as-hero-runway:has([data-as-scene-ready="true"]) { height: 175svh; min-height: 1300px; }
  .as-hero-runway:has([data-as-scene-ready="true"]) .as-hero { position: sticky; top: 0; min-height: 100svh; height: 100svh; padding-top: 80px; padding-bottom: 52px; }
  .as-hero-runway:has([data-as-scene-ready="true"]) .as-hero-copy { padding-bottom: 0; transform-origin: left center; transform: translateY(calc(var(--as-departure, 0) * -40px)) scale(calc(1 - var(--as-departure, 0) * .06)); opacity: calc(1 - var(--as-departure, 0) * .35); }
  .as-hero-foot { bottom: 20px; }
  .as-hero h1 { font-size: clamp(48px, 5vw, 72px); }
  .as-hero-runway + .as-benefits { position: relative; z-index: 4; background: var(--color-as-paper); }
  .as-process[data-as-process-live] .as-process-story { display: grid; grid-template-columns: 1.15fr 1fr; gap: 100px; margin-top: 80px; align-items: start; }
  .as-process[data-as-process-live] .as-process-visual { display: block; position: sticky; top: calc((100svh - 520px) / 2 + 32px); }
  .as-process[data-as-process-live] .as-step-grid { display: block; border-top: 0; margin-top: 0; }
  .as-process[data-as-process-live] .as-step, .as-process[data-as-process-live] .as-step + .as-step { display: flex; flex-direction: column; justify-content: center; min-height: 76svh; border: 0; padding: 0; }
  .as-process[data-as-process-live] .as-step h3 { margin-top: 24px; font-size: 36px; }
  .as-process[data-as-process-live] .as-step p { max-width: 340px; font-size: 18px; }
  .as-process[data-as-process-live] .as-step-arrow { position: static; margin-top: 24px; }
}
@media (min-width: 1000px) and (max-height: 820px) {
  .as-studio--hero .as-studio-surface { height: 410px; }
  .as-hero .as-lead { font-size: 18px; margin-top: 24px; }
  .as-hero-actions, .as-hero-proof { margin-top: 24px; }
}
@media (max-width: 999px) {
  .as-studio--hero .as-studio-surface { height: 560px; }
  .as-studio-topline { padding-top: 28px; }
}
@media (max-width: 900px) {
  .as-site .as-benefit { --as-offset: 0px; }
  .as-site .as-proof .as-quote:nth-child(2) { --as-offset: 0px; --as-rotation: 2deg; }
}
@media (max-width: 540px) {
  .as-studio-canvas { --as-canvas-bleed: 160px; }
  .as-studio--hero .as-studio-surface { height: 430px; }
  .as-studio--workshop { padding: 4px 0 20px; }
  .as-studio--workshop .as-studio-surface { height: 410px; }
  .as-studio-topline { font-size: 9px; }
  .as-studio-settings { gap: 16px; }
  .as-studio-settings label > span { font-size: 8px; letter-spacing: .03em; }
}
@media (prefers-reduced-motion: reduce) {
  .as-hero-runway { height: auto; min-height: 0; }
  .as-hero-runway .as-hero { position: relative; }
  .as-hero-copy { transform: none !important; opacity: 1 !important; }
}
]]>
    </file>
    <file path="src/app/(assemblage)/assemblage/studio/textures.ts">
<![CDATA[import { CanvasTexture, SRGBColorSpace } from "three";
import type { LayerId } from "./physics";

const palette = { paper: "#F6F0E8", ink: "#1E1D1B", sand: "#E2D8C9", red: "#D95F3F", teal: "#1D6C63", yellow: "#E7C65A" };

/** Authored print artwork; no remote textures, fonts or models are needed by the scene. */
export function printTexture(id: LayerId, bodyFont: string, monoFont: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 768; canvas.height = id === "paper" ? 1000 : 768;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Paper texture is unavailable");
  const { width: w, height: h } = canvas;
  ctx.fillStyle = id === "paper" ? palette.paper : id === "image" ? palette.teal : id === "ink" ? palette.red : palette.yellow;
  ctx.fillRect(0, 0, w, h);

  // Deterministic fibre, deliberately sparse enough to keep print readable.
  let seed = 471;
  for (let i = 0; i < 12000; i++) {
    seed = (seed * 16807) % 2147483647; const x = seed % w;
    seed = (seed * 16807) % 2147483647; const y = seed % h;
    ctx.fillStyle = i % 2 ? "rgba(30,29,27,.045)" : "rgba(246,240,232,.07)";
    ctx.fillRect(x, y, 1, 2);
  }
  const mono = (text: string, x: number, y: number, size = 19) => {
    ctx.font = `400 ${size}px ${monoFont}`; ctx.fillText(text, x, y);
  };
  ctx.fillStyle = palette.ink;
  if (id === "paper") {
    ctx.strokeStyle = palette.sand; ctx.lineWidth = 1;
    for (let x = 45; x < w; x += 68) { ctx.beginPath(); ctx.moveTo(x, 45); ctx.lineTo(x, h - 45); ctx.stroke(); }
    for (let y = 45; y < h; y += 68) { ctx.beginPath(); ctx.moveTo(45, y); ctx.lineTo(w - 45, y); ctx.stroke(); }
    mono("ASSEMBLAGE / MATERIAL STUDY", 60, 90, 18);
    ctx.font = `700 84px ${bodyFont}`;
    ["MAKE ROOM", "FOR THE", "UNEXPECTED"].forEach((line, index) => ctx.fillText(line, 56, 230 + index * 88));
    ctx.fillStyle = palette.red; ctx.fillRect(58, 550, 110, 110);
    ctx.fillStyle = palette.teal; ctx.beginPath(); ctx.arc(250, 605, 55, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = palette.ink; mono("A WORKING SURFACE.", 60, h - 108); mono("NOT A MOODBOARD.", 60, h - 76);
  } else if (id === "image") {
    ctx.fillStyle = palette.yellow; ctx.beginPath(); ctx.arc(510, 230, 140, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.translate(w / 2, h / 2); ctx.rotate(-.4); ctx.fillStyle = palette.paper;
    ctx.fillRect(-550, 50, 1100, 45); ctx.fillRect(-550, 180, 750, 24); ctx.restore();
    ctx.fillStyle = palette.paper; mono("FIELD NOTE 07", 45, h - 65); mono("THE WORLD, THROUGH YOUR EYES", 45, h - 34, 15);
  } else if (id === "ink") {
    ctx.fillStyle = palette.paper; ctx.font = `700 102px ${bodyFont}`;
    ["material", "is a point", "of view"].forEach((line, index) => ctx.fillText(line, 52, 150 + index * 110));
    mono("01 — THE POINT OF VIEW", 52, h - 56, 18);
    ctx.beginPath(); ctx.moveTo(50, 530); ctx.bezierCurveTo(180, 410, 220, 650, 350, 520); ctx.bezierCurveTo(450, 420, 550, 580, 700, 440);
    ctx.strokeStyle = palette.ink; ctx.lineWidth = 6; ctx.stroke();
  } else {
    ctx.strokeStyle = palette.ink; ctx.lineWidth = 3; ctx.strokeRect(18, 18, w - 36, h - 36);
    ctx.fillStyle = palette.ink; mono("ASSEMBLE", 65, 130, 38); mono("REPEAT", 65, 188, 38); mono("REFINE", 65, 246, 38);
    ctx.font = `700 115px ${bodyFont}`; ctx.fillText("look", 60, 460); ctx.fillText("again.", 60, 565);
    mono("ONE DETAIL CHANGES EVERYTHING.", 65, h - 64, 17);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace; texture.anisotropy = 4;
  return texture;
}
]]>
    </file>
  </files>
</template>
