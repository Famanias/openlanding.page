<template slug="arcandsignal" name="Arc & Signal">
  <dependencies>
    {
      "dependencies": {}
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(arcandsignal)/layout.tsx">
<![CDATA[import type { Metadata } from "next";
import { DM_Mono, DM_Sans, DM_Serif_Display } from "next/font/google";
import "./arcandsignal/arcandsignal.css";

const sans = DM_Sans({ subsets: ["latin"], variable: "--asc-sans" });
const serif = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--asc-serif" });
const mono = DM_Mono({ subsets: ["latin"], weight: "400", variable: "--asc-mono" });

export const metadata: Metadata = {
  title: "Arc & Signal — make your next move matter",
  description: "A fictional independent marketing studio bringing brand, creative and growth together.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}><body className="asc-body">{children}<noscript><style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}.asc-orbit-control{display:none}`}</style></noscript></body></html>;
}
]]>
    </file>
    <file path="src/app/(arcandsignal)/arcandsignal/arcandsignal.css">
<![CDATA[@import "tailwindcss";

@theme {
  --color-asc-ink: #0B0A20;
  --color-asc-violet: #181339;
  --color-asc-signal: #A887FF;
  --color-asc-lilac: #D9C8FF;
  --color-asc-blue: #8DCBFF;
  --color-asc-white: #F8F6FF;
  --color-asc-muted: #B9B2D0;
  --font-asc-body: var(--asc-sans), sans-serif;
  --font-asc-display: var(--asc-serif), Georgia, serif;
  --font-asc-label: var(--asc-mono), monospace;
  --ease-asc-out: cubic-bezier(.23, 1, .32, 1);
  --ease-asc-strong: cubic-bezier(.16, 1, .3, 1);
  --dur-asc-fast: 180ms;
  --dur-asc-base: 420ms;
  --dur-asc-slow: 800ms;
  --dur-asc-hero: 1200ms;
  --asc-stagger: 70ms;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
.asc-body { margin: 0; background: var(--color-asc-ink); color: var(--color-asc-white); font-family: var(--font-asc-body); -webkit-font-smoothing: antialiased; }
.asc-body a { color: inherit; text-decoration: none; }
.asc-body button { font: inherit; }
.asc-body a:focus-visible, .asc-body button:focus-visible { outline: 2px solid var(--color-asc-blue); outline-offset: 5px; }
.asc-body h1, .asc-body h2, .asc-body h3, .asc-body p { margin: 0; }
.asc-body h1, .asc-body h2, .asc-body h3 { text-wrap: balance; }
.asc-body p { text-wrap: pretty; }
.asc-body em { font-style: normal; font-family: var(--font-asc-display); font-weight: 400; }
.asc-wrap { width: min(100% - 96px, 1240px); margin-inline: auto; }
.asc-section { padding-block: 145px; }
.asc-sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }

/* The hero's light field is an image; all copy remains selectable HTML. */
.asc-hero { position: relative; min-height: 965px; isolation: isolate; overflow: hidden; background: var(--color-asc-ink); }
.asc-hero-image, .asc-hero-shade { position: absolute; inset: 0; z-index: -2; }
.asc-hero-image img { width: 100%; height: 100%; object-fit: cover; object-position: center bottom; }
.asc-hero-shade { z-index: -1; background: linear-gradient(to bottom, color-mix(in srgb, var(--color-asc-ink) 57%, transparent) 0%, color-mix(in srgb, var(--color-asc-ink) 32%, transparent) 42%, transparent 73%, var(--color-asc-ink) 100%); pointer-events: none; }
.asc-header { height: 102px; display: flex; align-items: center; justify-content: space-between; gap: 32px; }
.asc-logo { display: inline-flex; gap: 10px; align-items: center; flex: none; font-size: 23px; letter-spacing: -.07em; font-weight: 700; }
.asc-logo svg { width: 32px; height: 32px; color: var(--color-asc-signal); }
.asc-logo-amp { color: var(--color-asc-lilac); }
.asc-logo-dot { color: var(--color-asc-signal); }
.asc-nav { display: flex; gap: 42px; align-items: center; font-size: 14px; color: color-mix(in srgb, var(--color-asc-white) 85%, transparent); }
.asc-nav a, .asc-footer-links a, .asc-link { position: relative; }
.asc-nav a::after, .asc-footer-links a::after, .asc-link::after { content: ""; position: absolute; height: 1px; inset: auto 0 -5px; background: var(--color-asc-lilac); transform: scaleX(0); transform-origin: right; transition: transform var(--dur-asc-fast) var(--ease-asc-out); }
.asc-header-cta { border: 1px solid color-mix(in srgb, var(--color-asc-lilac) 45%, transparent); padding: 11px 16px 11px 20px; border-radius: 100px; font-size: 13px; font-weight: 600; transition: background var(--dur-asc-fast), transform var(--dur-asc-fast); }
.asc-header-cta span { margin-left: 18px; color: var(--color-asc-lilac); }
.asc-header-cta:active, .asc-button:active { transform: scale(.97); }
.asc-hero-content { position: relative; text-align: center; padding-top: 48px; }
.asc-eyebrow, .asc-kicker { display: inline-flex; align-items: center; gap: 9px; color: var(--color-asc-lilac); font-family: var(--font-asc-label); font-size: 10px; letter-spacing: .1em; line-height: 1.4; }
.asc-spark, .asc-kicker > span { color: var(--color-asc-signal); font-size: 16px; line-height: 1; }
.asc-eyebrow-line { width: 27px; height: 1px; background: color-mix(in srgb, var(--color-asc-lilac) 45%, transparent); }
.asc-hero h1 { margin-top: 24px; font-size: clamp(4.6rem, 6.5vw, 6.5rem); line-height: .99; letter-spacing: -.065em; font-weight: 500; }
.asc-hero h1 em { color: var(--color-asc-lilac); letter-spacing: -.045em; }
.asc-hero-content > p { max-width: 580px; margin: 25px auto 0; font-size: 16px; line-height: 1.65; color: color-mix(in srgb, var(--color-asc-white) 76%, transparent); }
.asc-hero-actions { display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 30px; }
.asc-button { min-height: 52px; display: inline-flex; align-items: center; justify-content: center; gap: 35px; padding: 0 23px; border-radius: 100px; font-size: 14px; font-weight: 700; transition: transform var(--dur-asc-fast) var(--ease-asc-out), background var(--dur-asc-fast), border-color var(--dur-asc-fast); }
.asc-button span, .asc-link span { font-size: 19px; line-height: 1; transition: transform var(--dur-asc-fast) var(--ease-asc-out); }
.asc-button-primary { background: var(--color-asc-lilac); color: var(--color-asc-ink) !important; box-shadow: 0 0 36px color-mix(in srgb, var(--color-asc-signal) 35%, transparent); }
.asc-button-text { border: 1px solid color-mix(in srgb, var(--color-asc-lilac) 40%, transparent); font-weight: 500; }
.asc-hero-notes { display: flex; justify-content: center; gap: 28px; margin-top: 31px; font-family: var(--font-asc-label); font-size: 9px; letter-spacing: .1em; color: var(--color-asc-muted); }
.asc-hero-notes span { display: inline-flex; align-items: center; gap: 7px; }
.asc-hero-notes i, .asc-card-top i { display: inline-block; width: 5px; height: 5px; border-radius: 50%; background: var(--color-asc-signal); }
.asc-signal-scene { position: relative; width: min(720px, 62vw); margin: 90px auto 0; }
.asc-signal-card { position: relative; min-height: 255px; padding: 20px 24px 17px; border: 1px solid color-mix(in srgb, var(--color-asc-lilac) 51%, transparent); border-radius: 16px; background: linear-gradient(135deg, color-mix(in srgb, var(--color-asc-violet) 93%, transparent), color-mix(in srgb, var(--color-asc-ink) 80%, transparent)); box-shadow: 0 0 0 7px color-mix(in srgb, var(--color-asc-lilac) 5%, transparent), 0 22px 80px color-mix(in srgb, var(--color-asc-ink) 75%, transparent), 0 0 48px color-mix(in srgb, var(--color-asc-signal) 23%, transparent); backdrop-filter: blur(16px); }
.asc-signal-card::before { content: ""; position: absolute; inset: -14px 18px 14px; z-index: -1; border: 1px solid color-mix(in srgb, var(--color-asc-lilac) 24%, transparent); border-radius: 16px; background: color-mix(in srgb, var(--color-asc-signal) 10%, transparent); }
.asc-card-top { display: flex; justify-content: space-between; padding-bottom: 17px; border-bottom: 1px solid color-mix(in srgb, var(--color-asc-lilac) 17%, transparent); font: 9px var(--font-asc-label); letter-spacing: .07em; color: var(--color-asc-muted); }
.asc-card-top i { margin-right: 6px; box-shadow: 0 0 10px var(--color-asc-signal); }
.asc-card-middle { display: flex; align-items: center; justify-content: space-between; gap: 15px; padding: 27px 12px 25px; }
.asc-card-middle small { display: block; margin-bottom: 10px; font: 8px var(--font-asc-label); letter-spacing: .06em; color: var(--color-asc-muted); }
.asc-card-middle strong { display: block; font-size: 29px; font-weight: 500; line-height: 1.05; letter-spacing: -.04em; }
.asc-card-middle em { color: var(--color-asc-lilac); }
.asc-card-glyph { display: flex; align-items: end; gap: 6px; height: 65px; padding-right: 25px; }
.asc-card-glyph span { width: 12px; height: 25%; border-radius: 10px; background: var(--color-asc-signal); box-shadow: 0 0 15px color-mix(in srgb, var(--color-asc-signal) 45%, transparent); }
.asc-card-glyph span:nth-child(2) { height: 48%; }.asc-card-glyph span:nth-child(3) { height: 75%; }.asc-card-glyph span:nth-child(4) { height: 100%; background: var(--color-asc-lilac); }
.asc-card-bottom { display: flex; align-items: center; gap: 17px; border-top: 1px solid color-mix(in srgb, var(--color-asc-lilac) 17%, transparent); padding-top: 15px; font: 9px var(--font-asc-label); letter-spacing: .08em; color: var(--color-asc-muted); }
.asc-card-bottom b { color: var(--color-asc-signal); }.asc-card-bottom i { margin-left: auto; color: var(--color-asc-lilac); font: normal 19px var(--font-asc-body); }
.asc-floating { position: absolute; z-index: 2; width: 165px; padding: 16px 17px; border: 1px solid color-mix(in srgb, var(--color-asc-lilac) 30%, transparent); border-radius: 10px; background: color-mix(in srgb, var(--color-asc-violet) 79%, transparent); box-shadow: 0 10px 40px color-mix(in srgb, var(--color-asc-ink) 35%, transparent); backdrop-filter: blur(12px); }
.asc-floating-left { top: 48px; left: -195px; transform: rotate(-4deg); }.asc-floating-right { top: 93px; right: -195px; transform: rotate(4deg); }
.asc-floating > span { display: block; margin-bottom: 8px; font: 8px var(--font-asc-label); color: var(--color-asc-muted); letter-spacing: .04em; }.asc-floating strong { font-size: 14px; font-weight: 500; }.asc-floating strong span { float: right; color: var(--color-asc-lilac); }
.asc-scene-caption { display: flex; justify-content: space-between; margin-top: 34px; font: 8px var(--font-asc-label); letter-spacing: .1em; color: color-mix(in srgb, var(--color-asc-white) 70%, transparent); }
.asc-placeholder { background: var(--color-asc-violet); }

.asc-client-strip { display: flex; align-items: center; justify-content: space-between; gap: 40px; padding-block: 35px; border-bottom: 1px solid color-mix(in srgb, var(--color-asc-lilac) 16%, transparent); }
.asc-client-strip > span { max-width: 160px; font: 9px/1.6 var(--font-asc-label); letter-spacing: .06em; color: var(--color-asc-muted); }
.asc-client-strip > div { display: flex; justify-content: space-between; align-items: center; gap: 35px; flex: 1; color: color-mix(in srgb, var(--color-asc-white) 65%, transparent); }
.asc-client-strip b { white-space: nowrap; font-size: 15px; letter-spacing: -.04em; }.asc-client-strip b:nth-child(3) { font: 22px var(--font-asc-display); }
.asc-section-heading { display: flex; justify-content: space-between; align-items: end; gap: 70px; margin-bottom: 65px; }
.asc-kicker b { font-weight: 400; color: var(--color-asc-muted); }
.asc-section h2, .asc-approach h2, .asc-contact h2 { margin-top: 22px; font-size: clamp(3.2rem, 5.4vw, 5.2rem); line-height: 1; letter-spacing: -.055em; font-weight: 500; }
.asc-section h2 em, .asc-approach h2 em, .asc-contact h2 em { color: var(--color-asc-lilac); }
.asc-section-heading > p { max-width: 355px; color: var(--color-asc-muted); font-size: 15px; line-height: 1.75; }
.asc-services-grid { display: grid; grid-template-columns: repeat(4, 1fr); border-top: 1px solid color-mix(in srgb, var(--color-asc-lilac) 22%, transparent); border-bottom: 1px solid color-mix(in srgb, var(--color-asc-lilac) 22%, transparent); }
.asc-service { min-height: 290px; padding: 27px 23px 24px; border-right: 1px solid color-mix(in srgb, var(--color-asc-lilac) 18%, transparent); transition: background var(--dur-asc-base), transform var(--dur-asc-base) var(--ease-asc-out); }.asc-service:first-child { border-left: 1px solid color-mix(in srgb, var(--color-asc-lilac) 18%, transparent); }
.asc-service-top { display: flex; align-items: center; justify-content: space-between; color: var(--color-asc-muted); font: 9px var(--font-asc-label); }.asc-service-icon { display: grid; place-items: center; width: 46px; height: 46px; border: 1px solid color-mix(in srgb, var(--color-asc-signal) 40%, transparent); border-radius: 50%; color: var(--color-asc-lilac); font: 24px var(--font-asc-body); }
.asc-service h3 { margin-top: 48px; font-size: 20px; font-weight: 500; letter-spacing: -.04em; }.asc-service p { margin-top: 12px; color: var(--color-asc-muted); font-size: 13px; line-height: 1.7; }.asc-service-tags { margin-top: 24px; color: var(--color-asc-lilac); font: 8px var(--font-asc-label); letter-spacing: .02em; }

.asc-work { padding-top: 15px; }.asc-work-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }.asc-case-art { position: relative; display: flex; flex-direction: column; justify-content: space-between; height: 390px; overflow: hidden; padding: 25px; border: 1px solid color-mix(in srgb, var(--color-asc-lilac) 18%, transparent); }.asc-case-art-one { color: var(--color-asc-ink); background: var(--color-asc-lilac); }.asc-case-art-two { background: var(--color-asc-violet); }
.asc-case-corner { z-index: 1; font: 9px var(--font-asc-label); letter-spacing: .08em; }.asc-case-art-label { z-index: 1; font: 13px/1.35 var(--font-asc-body); }.asc-case-sun { position: absolute; width: 360px; height: 360px; border: 1px solid color-mix(in srgb, var(--color-asc-ink) 40%, transparent); border-radius: 50%; right: -10px; top: 35px; display: grid; place-items: center; box-shadow: 0 0 0 27px color-mix(in srgb, var(--color-asc-white) 20%, transparent), 0 0 0 55px color-mix(in srgb, var(--color-asc-ink) 5%, transparent); transition: transform var(--dur-asc-slow) var(--ease-asc-out); }.asc-case-sun span { font: 180px var(--font-asc-display); color: var(--color-asc-violet); }.asc-case-art-two::before, .asc-case-art-two::after { content: ""; position: absolute; width: 500px; height: 500px; border: 1px solid color-mix(in srgb, var(--color-asc-signal) 45%, transparent); border-radius: 50%; right: -220px; top: -70px; box-shadow: 0 0 0 28px color-mix(in srgb, var(--color-asc-signal) 5%, transparent), 0 0 0 56px color-mix(in srgb, var(--color-asc-signal) 5%, transparent); }.asc-case-art-two::after { right: -120px; top: 95px; border-color: color-mix(in srgb, var(--color-asc-blue) 30%, transparent); }.asc-case-type { position: absolute; left: 12%; top: 27%; font-size: clamp(3rem, 5vw, 5rem); line-height: .85; letter-spacing: -.08em; font-weight: 700; }.asc-case-type em { color: var(--color-asc-lilac); }
.asc-case-info { display: flex; justify-content: space-between; gap: 20px; padding-top: 24px; }.asc-case-info span { color: var(--color-asc-lilac); font: 9px var(--font-asc-label); }.asc-case-info h3 { margin-top: 10px; font-size: 22px; letter-spacing: -.04em; font-weight: 500; }.asc-case-info p { margin-top: 7px; color: var(--color-asc-muted); font-size: 13px; }.asc-case-info a { width: 42px; height: 42px; display: grid; place-items: center; border: 1px solid color-mix(in srgb, var(--color-asc-lilac) 35%, transparent); border-radius: 50%; font-size: 19px; transition: transform var(--dur-asc-fast), background var(--dur-asc-fast); }.asc-fiction-note { margin-top: 24px !important; color: var(--color-asc-muted); font: 10px/1.6 var(--font-asc-label); }

.asc-approach { position: relative; background: var(--color-asc-violet); overflow: hidden; }.asc-approach::after { content: ""; position: absolute; width: 640px; height: 640px; left: -400px; bottom: -450px; border: 1px solid color-mix(in srgb, var(--color-asc-lilac) 30%, transparent); border-radius: 50%; box-shadow: 0 0 0 55px color-mix(in srgb, var(--color-asc-signal) 5%, transparent), 0 0 0 110px color-mix(in srgb, var(--color-asc-signal) 5%, transparent); }.asc-approach-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 120px; padding-block: 150px; }.asc-approach-inner > div:first-child > p { max-width: 435px; margin-top: 25px; color: var(--color-asc-muted); font-size: 15px; line-height: 1.75; }.asc-link { display: inline-flex; gap: 30px; align-items: center; margin-top: 30px; font-size: 13px; font-weight: 600; }.asc-steps { border-top: 1px solid color-mix(in srgb, var(--color-asc-lilac) 25%, transparent); }.asc-step { display: grid; grid-template-columns: 45px 1fr auto; gap: 18px; padding: 26px 0; border-bottom: 1px solid color-mix(in srgb, var(--color-asc-lilac) 25%, transparent); }.asc-step > span { color: var(--color-asc-lilac); font: 10px var(--font-asc-label); }.asc-step h3 { font-size: 18px; font-weight: 500; }.asc-step p { max-width: 320px; margin-top: 10px; color: var(--color-asc-muted); font-size: 13px; line-height: 1.7; }.asc-step b { color: var(--color-asc-lilac); font-weight: 400; }

.asc-community { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 80px; }.asc-community-copy > p:not(.asc-fiction-note) { max-width: 380px; margin-top: 24px; color: var(--color-asc-muted); font-size: 15px; line-height: 1.7; }.asc-community blockquote { max-width: 480px; margin: 45px 0 25px; font: 27px/1.35 var(--font-asc-display); color: var(--color-asc-white); }.asc-quote-person { display: flex; align-items: center; gap: 12px; }.asc-quote-person > div { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 50%; background: var(--color-asc-violet); color: var(--color-asc-lilac); font-size: 11px; }.asc-quote-person strong, .asc-quote-person small { display: block; }.asc-quote-person strong { font-size: 12px; }.asc-quote-person small { margin-top: 4px; color: var(--color-asc-muted); font-size: 11px; }
.asc-orbit-shell { --radius: 190px; position: relative; width: min(100%, 520px); aspect-ratio: 1; margin-inline: auto; }.asc-orbit-ring { position: absolute; inset: 12%; border: 1px solid color-mix(in srgb, var(--color-asc-lilac) 23%, transparent); border-radius: 50%; }.asc-orbit-ring-inner { inset: 27%; border-color: color-mix(in srgb, var(--color-asc-lilac) 12%, transparent); }.asc-orbit-ring-outer::after { content: ""; position: absolute; left: 12%; top: 13%; width: 6px; height: 6px; background: var(--color-asc-lilac); border-radius: 50%; box-shadow: 0 0 15px var(--color-asc-signal); }.asc-orbit-center { position: absolute; inset: 33%; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 13px; border: 1px solid color-mix(in srgb, var(--color-asc-lilac) 25%, transparent); border-radius: 50%; background: radial-gradient(circle, var(--color-asc-violet), var(--color-asc-ink)); box-shadow: 0 0 65px color-mix(in srgb, var(--color-asc-signal) 18%, transparent); text-align: center; }.asc-orbit-center svg { width: 38px; color: var(--color-asc-signal); }.asc-orbit-center span { color: var(--color-asc-lilac); font: 8px/1.5 var(--font-asc-label); letter-spacing: .05em; }.asc-orbit-track { position: absolute; inset: 0; animation: asc-orbit-ccw 42s linear infinite; }.asc-orbit-position { position: absolute; top: 50%; left: 50%; width: 0; height: 0; transform: rotate(var(--angle)) translateY(calc(var(--radius) * -1)); }.asc-orbit-upright { position: absolute; transform: rotate(calc(var(--angle) * -1)); }.asc-orbit-brand { display: flex; align-items: center; justify-content: center; gap: 5px; position: absolute; left: -60px; top: -19px; width: 120px; height: 38px; border: 1px solid color-mix(in srgb, var(--color-asc-lilac) 25%, transparent); border-radius: 30px; background: var(--color-asc-violet); box-shadow: 0 0 18px color-mix(in srgb, var(--color-asc-signal) 10%, transparent); font-size: 13px; font-weight: 700; letter-spacing: -.04em; animation: asc-orbit-cw 42s linear infinite; }.asc-orbit-brand span { color: var(--color-asc-lilac); font-size: 17px; }.asc-orbit-brand-vela { font: 19px var(--font-asc-display); }.asc-orbit-brand-kinfield { font-size: 10px; letter-spacing: .05em; }.asc-orbit-control { position: absolute; bottom: -22px; left: 50%; transform: translateX(-50%); border: 0; background: none; color: var(--color-asc-muted); white-space: nowrap; font: 10px var(--font-asc-label) !important; cursor: pointer; }.asc-orbit-control span { margin-left: 5px; color: var(--color-asc-lilac); }.asc-orbit-shell[data-paused="true"] .asc-orbit-track, .asc-orbit-shell[data-paused="true"] .asc-orbit-brand, .asc-orbit-shell[data-visible="false"] .asc-orbit-track, .asc-orbit-shell[data-visible="false"] .asc-orbit-brand { animation-play-state: paused; }

.asc-contact { position: relative; isolation: isolate; overflow: hidden; padding: 145px 0; background: radial-gradient(ellipse at 50% 100%, color-mix(in srgb, var(--color-asc-signal) 24%, var(--color-asc-violet)), var(--color-asc-violet) 65%); text-align: center; }.asc-contact-inner { position: relative; z-index: 1; }.asc-contact h2 { font-size: clamp(4rem, 7vw, 7rem); }.asc-contact p { max-width: 460px; margin: 25px auto 30px; color: var(--color-asc-muted); font-size: 15px; line-height: 1.7; }.asc-contact small { display: block; margin-top: 32px; color: var(--color-asc-muted); font: 9px var(--font-asc-label); letter-spacing: .08em; }.asc-contact-orbit { position: absolute; z-index: 0; width: 1000px; height: 1000px; left: calc(50% - 500px); bottom: -870px; border: 1px solid color-mix(in srgb, var(--color-asc-lilac) 35%, transparent); border-radius: 50%; }.asc-contact-orbit-two { width: 1150px; height: 1150px; left: calc(50% - 575px); bottom: -1000px; }
.asc-footer { padding-block: 60px 25px; display: grid; grid-template-columns: 1fr auto; gap: 50px; }.asc-footer p { margin-top: 18px; font-size: 13px; line-height: 1.6; color: var(--color-asc-muted); }.asc-footer-links { display: flex; gap: 35px; font-size: 12px; }.asc-footer-bottom { grid-column: 1 / -1; display: flex; justify-content: space-between; padding-top: 25px; border-top: 1px solid color-mix(in srgb, var(--color-asc-lilac) 18%, transparent); color: var(--color-asc-muted); font: 9px var(--font-asc-label); letter-spacing: .04em; }

@keyframes asc-orbit-ccw { to { transform: rotate(-1turn); } }
@keyframes asc-orbit-cw { to { transform: rotate(1turn); } }
@keyframes asc-rise { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes asc-title-rise { from { transform: translateY(20px); } to { transform: translateY(0); } }
@keyframes asc-image-settle { from { opacity: .65; transform: scale(1.035); } to { opacity: 1; transform: scale(1); } }
@media (prefers-reduced-motion: no-preference) {
  .asc-hero-image { animation: asc-image-settle var(--dur-asc-hero) var(--ease-asc-out) both; }.asc-header { animation: asc-rise var(--dur-asc-slow) var(--ease-asc-out) both; }.asc-hero-eyebrow { animation: asc-rise var(--dur-asc-slow) var(--ease-asc-out) 100ms both; }.asc-hero h1 { animation: asc-title-rise var(--dur-asc-hero) var(--ease-asc-strong) 180ms both; }.asc-hero-content > p, .asc-hero-actions, .asc-hero-notes { animation: asc-rise var(--dur-asc-slow) var(--ease-asc-out) 350ms both; }.asc-signal-scene { animation: asc-rise var(--dur-asc-hero) var(--ease-asc-strong) 450ms both; }
  [data-reveal] { transition: opacity var(--dur-asc-slow) var(--ease-asc-out), transform var(--dur-asc-slow) var(--ease-asc-out), clip-path var(--dur-asc-slow) var(--ease-asc-out); transition-delay: calc(var(--i, 0) * var(--asc-stagger)); }
  [data-reveal="wipe"] { clip-path: inset(0); }
  [data-motion-ready="true"] [data-reveal]:not([data-in="true"]) { opacity: 0; transform: translateY(28px); }
  [data-motion-ready="true"] [data-reveal="scale"]:not([data-in="true"]) { transform: scale(.96); }
  [data-motion-ready="true"] [data-reveal="wipe"]:not([data-in="true"]) { opacity: 1; transform: none; clip-path: inset(0 0 100% 0); }
}
@media (hover: hover) and (pointer: fine) {
  .asc-nav a:hover::after, .asc-footer-links a:hover::after, .asc-link:hover::after { transform: scaleX(1); transform-origin: left; }
  .asc-header-cta:hover, .asc-button-text:hover { background: color-mix(in srgb, var(--color-asc-lilac) 14%, transparent); }.asc-button-primary:hover { transform: translateY(-3px); background: var(--color-asc-white); }.asc-button:hover span, .asc-link:hover span { transform: translate(3px, -3px); }.asc-service:hover { transform: translateY(-6px); background: color-mix(in srgb, var(--color-asc-signal) 8%, transparent); }.asc-case:hover .asc-case-sun { transform: scale(1.06) rotate(8deg); }.asc-case-info a:hover { background: var(--color-asc-signal); color: var(--color-asc-ink); transform: translate(3px, -3px); }.asc-orbit-shell:hover .asc-orbit-track, .asc-orbit-shell:hover .asc-orbit-brand { animation-play-state: paused; }
}
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; }.asc-orbit-track, .asc-orbit-brand { animation: none; }.asc-orbit-control { display: none; }.asc-body *, .asc-body *::before, .asc-body *::after { transition-duration: .01ms !important; } }
@media (max-width: 900px) { .asc-wrap { width: min(100% - 48px, 1240px); }.asc-nav { gap: 18px; }.asc-hero { min-height: 870px; }.asc-hero h1 { font-size: clamp(3.8rem, 8vw, 5.8rem); }.asc-signal-scene { width: min(680px, 70vw); }.asc-floating-left { left: -120px; }.asc-floating-right { right: -120px; }.asc-floating { width: 140px; }.asc-services-grid { grid-template-columns: repeat(2, 1fr); }.asc-service:nth-child(3) { border-left: 1px solid color-mix(in srgb, var(--color-asc-lilac) 18%, transparent); }.asc-service:nth-child(-n+2) { border-bottom: 1px solid color-mix(in srgb, var(--color-asc-lilac) 18%, transparent); }.asc-approach-inner { gap: 50px; }.asc-community { gap: 30px; }.asc-orbit-shell { --radius: 15vw; }.asc-client-strip > div { gap: 18px; }.asc-client-strip b { font-size: 12px; } }
@media (max-width: 600px) { .asc-wrap { width: calc(100% - 40px); }.asc-section { padding-block: 90px; }.asc-header { height: 78px; }.asc-logo { font-size: 21px; }.asc-logo svg { width: 28px; }.asc-nav { display: none; }.asc-header-cta { padding: 10px 13px; font-size: 12px; }.asc-header-cta span { margin-left: 8px; }.asc-hero { min-height: 790px; }.asc-hero-image img { object-position: 50% 75%; }.asc-hero-content { padding-top: 58px; }.asc-eyebrow { font-size: 8px; gap: 5px; }.asc-eyebrow-line { width: 14px; }.asc-hero h1 { margin-top: 21px; font-size: clamp(3.1rem, 11.5vw, 4.5rem); line-height: .99; letter-spacing: -.06em; }.asc-hero-content > p { max-width: 340px; margin-top: 21px; font-size: 14px; line-height: 1.6; }.asc-hero-actions { gap: 8px; margin-top: 24px; }.asc-button { min-height: 48px; gap: 14px; padding-inline: 17px; font-size: 12px; }.asc-hero-notes { gap: 16px; margin-top: 24px; font-size: 8px; }.asc-signal-scene { width: calc(100% - 60px); margin-top: 86px; }.asc-signal-card { min-height: 200px; padding: 16px; }.asc-card-top { font-size: 7px; }.asc-card-middle { padding: 22px 2px; }.asc-card-middle small { font-size: 7px; }.asc-card-middle strong { font-size: 23px; }.asc-card-glyph { height: 47px; gap: 4px; padding: 0; }.asc-card-glyph span { width: 8px; }.asc-card-bottom { gap: 9px; font-size: 7px; }.asc-floating { display: none; }.asc-scene-caption { margin-top: 26px; font-size: 7px; }.asc-client-strip { display: block; padding-block: 28px; overflow: hidden; }.asc-client-strip > span { display: block; max-width: none; margin-bottom: 21px; }.asc-client-strip > div { overflow-x: auto; gap: 28px; padding-bottom: 6px; }.asc-client-strip b { font-size: 13px; }.asc-section-heading { display: block; margin-bottom: 38px; }.asc-section h2, .asc-approach h2 { margin-top: 18px; font-size: clamp(3rem, 11vw, 4rem); }.asc-section-heading > p { margin-top: 20px; font-size: 14px; }.asc-services-grid { grid-template-columns: 1fr 1fr; }.asc-service { min-height: 240px; padding: 17px 14px; }.asc-service-icon { width: 38px; height: 38px; font-size: 20px; }.asc-service h3 { margin-top: 35px; font-size: 17px; }.asc-service p { font-size: 12px; }.asc-service-tags { font-size: 7px; line-height: 1.5; }.asc-work { padding-top: 0; }.asc-work-grid { grid-template-columns: 1fr; gap: 42px; }.asc-case-art { height: 315px; }.asc-case-sun { width: 270px; height: 270px; top: 40px; }.asc-case-sun span { font-size: 140px; }.asc-case-type { font-size: 3.7rem; }.asc-approach-inner { grid-template-columns: 1fr; gap: 50px; padding-block: 90px; }.asc-community { grid-template-columns: 1fr; gap: 40px; }.asc-community blockquote { margin-top: 30px; font-size: 24px; }.asc-orbit-shell { --radius: min(34vw, 140px); max-width: 370px; }.asc-orbit-ring { inset: 10%; }.asc-orbit-brand { width: 94px; height: 33px; left: -47px; top: -16px; font-size: 11px; }.asc-orbit-brand-vela { font-size: 16px; }.asc-orbit-brand-kinfield { font-size: 8px; }.asc-orbit-center { inset: 32%; }.asc-orbit-center svg { width: 30px; }.asc-orbit-center span { font-size: 7px; }.asc-contact { padding-block: 100px; }.asc-contact h2 { font-size: clamp(3.5rem, 12vw, 5rem); }.asc-footer { grid-template-columns: 1fr; gap: 35px; }.asc-footer-links { flex-wrap: wrap; gap: 18px 28px; }.asc-footer-bottom { gap: 20px; font-size: 8px; } }
]]>
    </file>
    <file path="src/app/(arcandsignal)/arcandsignal/assets.generated.ts">
<![CDATA[// Generated by scripts/process-images.ts — do not edit by hand.
export const ASSETS: Record<string, { w: number; h: number }> = {
  "signal-horizon": { "w": 1947, "h": 808 },
};
]]>
    </file>
    <file path="src/app/(arcandsignal)/arcandsignal/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

export function Picture({ assetKey, alt, className = "", priority = false }: { assetKey: string; alt: string; className?: string; priority?: boolean }) {
  const asset = ASSETS[assetKey];
  if (!asset) return <div className={`asc-placeholder ${className}`} role="img" aria-label={alt}>{assetKey}</div>;
  const src = (width: number, format: string) => `/templates/arcandsignal/${assetKey}-${width}.${format}`;
  return <picture className={className}><source type="image/avif" srcSet={`${src(800, "avif")} 800w, ${src(1600, "avif")} 1600w`} sizes="100vw"/><img src={src(1600, "webp")} srcSet={`${src(800, "webp")} 800w, ${src(1600, "webp")} 1600w`} sizes="100vw" width={asset.w} height={asset.h} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" data-asset={assetKey}/></picture>;
}
]]>
    </file>
    <file path="src/app/(arcandsignal)/arcandsignal/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" rx="10" fill="#0B0A20"/><path d="M5 26C11 13 19 7 34 7M5 33C13 21 22 17 34 17" fill="none" stroke="#A887FF" stroke-width="5" stroke-linecap="round"/></svg>
]]>
    </file>
    <file path="src/app/(arcandsignal)/arcandsignal/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "#0B0A20", color: "#F8F6FF" }}><div style={{ display: "flex", alignItems: "center", gap: 15, color: "#A887FF", fontSize: 30 }}><svg width="38" height="38" viewBox="0 0 38 38"><path d="M4 25.5C10 12 18.4 6 33.5 6M4 33C12 20.5 22 16 33.5 16" fill="none" stroke="#A887FF" strokeWidth="5" strokeLinecap="round"/></svg>arc&amp;signal.</div><div style={{ display: "flex", flexDirection: "column", fontSize: 78, lineHeight: 1.05 }}>Good brands deserve <span style={{ color: "#D9C8FF" }}>great momentum.</span></div><div style={{ display: "flex", fontSize: 24, color: "#B9B2D0" }}>Independent creative growth studio</div></div>, size);
}
]]>
    </file>
    <file path="src/app/(arcandsignal)/arcandsignal/page.tsx">
<![CDATA[import { Runtime } from "./motion/Runtime";
import { Hero } from "./sections/Hero";
import { Services } from "./sections/Services";
import { Work } from "./sections/Work";
import { Approach } from "./sections/Approach";
import { Community } from "./sections/Community";
import { Contact } from "./sections/Contact";

export default function Page() {
  return <><main><Hero/><div className="asc-client-strip asc-wrap"><span>GOOD WORK STARTS WITH GOOD COMPANY</span><div aria-label="Fictional client examples"><b>✳ NUVORO</b><b>◒ mavori</b><b>◇ Veyla</b><b>◌ otherloom</b><b>✦ KIVORA</b></div></div><Services/><Work/><Approach/><Community/><Contact/></main><Runtime/></>;
}
]]>
    </file>
    <file path="src/app/(arcandsignal)/arcandsignal/brand/Logo.tsx">
<![CDATA[export function Mark({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 38 38" fill="none" aria-hidden="true"><path d="M4 25.5C10 12 18.4 6 33.5 6" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/><path d="M4 33C12 20.5 22 16 33.5 16" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/></svg>;
}

export function Logo() {
  return <a href="#top" className="asc-logo"><Mark/><span>arc<span className="asc-logo-amp">&</span>signal<span className="asc-logo-dot">.</span></span></a>;
}
]]>
    </file>
    <file path="src/app/(arcandsignal)/arcandsignal/motion/Runtime.tsx">
<![CDATA["use client";
import { useEffect } from "react";

export function Runtime() {
  useEffect(() => {
    const items = new Set(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    let frame = 0;
    const show = (item: HTMLElement) => {
      item.dataset.in = "true";
      items.delete(item);
      observer.unobserve(item);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) show(entry.target as HTMLElement);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.04 });
    items.forEach((item) => observer.observe(item));
    // A large anchor jump can skip an observer's intersection entirely.
    // Mark passed content as revealed so scrolling back can never leave a blank section.
    const onScroll = () => {
      if (frame || items.size === 0) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        items.forEach((item) => { if (item.getBoundingClientRect().top < 0) show(item); });
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    document.body.dataset.motionReady = "true";
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); delete document.body.dataset.motionReady; };
  }, []);
  return null;
}
]]>
    </file>
    <file path="src/app/(arcandsignal)/arcandsignal/orbit/CompanyOrbit.tsx">
<![CDATA["use client";
import { useEffect, useRef, useState } from "react";
import { Mark } from "../brand/Logo";
import { orbitAngle } from "./orbit";

const companies = [
  { name: "Nuvoro", mark: "✳", style: "north" },
  { name: "mavori", mark: "◒", style: "morrow" },
  { name: "Veyla", mark: "◇", style: "vela" },
  { name: "otherloom", mark: "◌", style: "otherday" },
  { name: "KIVORA", mark: "✦", style: "kinfield" },
  { name: "lumariq", mark: "◍", style: "luma" },
];

export function CompanyOrbit() {
  const shell = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = shell.current;
    if (!node) return;
    let intersecting = false;
    const sync = () => setVisible(intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { intersecting = entry.isIntersecting; sync(); }, { threshold: 0.05 });
    observer.observe(node);
    document.addEventListener("visibilitychange", sync);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", sync); };
  }, []);

  return <div className="asc-orbit-shell" ref={shell} data-paused={paused} data-visible={visible}>
    <div className="asc-orbit-ring asc-orbit-ring-outer"/><div className="asc-orbit-ring asc-orbit-ring-inner"/>
    <div className="asc-orbit-center"><Mark/><span>GOOD COMPANY.<br/>GOOD MOMENTUM.</span></div>
    <div className="asc-orbit-track" aria-hidden="true">{companies.map((company, index) => <div className="asc-orbit-position" key={company.name} style={{ "--angle": `${orbitAngle(index, companies.length)}deg` } as React.CSSProperties}><div className="asc-orbit-upright"><div className={`asc-orbit-brand asc-orbit-brand-${company.style}`}><span>{company.mark}</span>{company.name}</div></div></div>)}</div>
    <p className="asc-sr-only">Fictional company examples: {companies.map((company) => company.name).join(", ")}.</p>
    <button className="asc-orbit-control" type="button" onClick={() => setPaused((value) => !value)}>{paused ? "Resume rotation" : "Pause rotation"} <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span></button>
  </div>;
}
]]>
    </file>
    <file path="src/app/(arcandsignal)/arcandsignal/orbit/orbit.ts">
<![CDATA[/** Evenly distribute marks around one revolution, beginning at twelve o'clock. */
export function orbitAngle(index: number, count: number): number {
  return count > 0 ? (index * 360) / count : 0;
}
]]>
    </file>
    <file path="src/app/(arcandsignal)/arcandsignal/sections/Approach.tsx">
<![CDATA[export function Approach() {
  return <section id="about" className="asc-approach"><div className="asc-wrap asc-approach-inner"><div data-reveal="rise"><span className="asc-kicker"><span>✳</span> HOW WE WORK <b> / 03</b></span><h2>Good things<br/><em>happen in motion.</em></h2><p>We are a small team for the big picture. Curious by nature, collaborative by design, and always looking for the idea that takes you further.</p><a href="#contact" className="asc-link">A little more about us <span>↗</span></a></div><div className="asc-steps">{[{n:"01",t:"Get to the heart of it",p:"We listen closely, ask better questions, and find the opportunity hiding in plain sight."},{n:"02",t:"Make the right kind of noise",p:"We shape a clear idea into a creative world people want to be part of."},{n:"03",t:"Learn, then go further",p:"We put it into the world, pay attention, and keep making it better."}].map((step) => <div className="asc-step" data-reveal="rise" key={step.n}><span>{step.n}</span><div><h3>{step.t}</h3><p>{step.p}</p></div><b>↗</b></div>)}</div></div></section>;
}
]]>
    </file>
    <file path="src/app/(arcandsignal)/arcandsignal/sections/Community.tsx">
<![CDATA[import { CompanyOrbit } from "../orbit/CompanyOrbit";
export function Community() {
  return <section className="asc-community asc-wrap asc-section"><div className="asc-community-copy" data-reveal="rise"><span className="asc-kicker"><span>✳</span> GOOD COMPANY <b> / 04</b></span><h2>The company<br/><em>we keep.</em></h2><p>Made for ambitious people with something good to put into the world.</p><blockquote>“They understood the heart of our brand, then helped us share it with a whole new world.”</blockquote><div className="asc-quote-person"><div>AM</div><span><strong>Alex Morgan</strong><small>Creative Director, Veyla Living</small></span></div><p className="asc-fiction-note">A fictional testimonial and client community.</p></div><div data-reveal="scale"><CompanyOrbit/></div></section>;
}
]]>
    </file>
    <file path="src/app/(arcandsignal)/arcandsignal/sections/Contact.tsx">
<![CDATA[import { Logo } from "../brand/Logo";
export function Contact() {
  return <><section id="contact" className="asc-contact"><div className="asc-contact-orbit asc-contact-orbit-one"/><div className="asc-contact-orbit asc-contact-orbit-two"/><div className="asc-wrap asc-contact-inner" data-reveal="rise"><span className="asc-kicker"><span>✳</span> YOUR NEXT CHAPTER STARTS HERE</span><h2>Let’s make<br/><em>something matter.</em></h2><p>Have a good idea, a big question, or a brand ready for what’s next? We’d love to hear about it.</p><a className="asc-button asc-button-primary" href="mailto:hello@arcandsignal.example">Contact Us <span aria-hidden="true">↗</span></a><small>GOOD CONVERSATIONS MAKE GOOD THINGS.</small></div></section><footer className="asc-footer asc-wrap"><div><Logo/><p>A little more signal.<br/>A lot more possibility.</p></div><div className="asc-footer-links"><a href="#services">What we do</a><a href="#work">Selected work</a><a href="#about">Our approach</a><a href="#contact">Contact Us</a></div><div className="asc-footer-bottom"><span>© 2026 ARC &amp; SIGNAL. A FICTIONAL STUDIO.</span><a href="#top">BACK TO TOP ↑</a></div></footer></>;
}
]]>
    </file>
    <file path="src/app/(arcandsignal)/arcandsignal/sections/Header.tsx">
<![CDATA[import { Logo } from "../brand/Logo";
export function Header() {
  return <header className="asc-header asc-wrap"><Logo/><nav className="asc-nav" aria-label="Main navigation"><a href="#services">What we do</a><a href="#work">Selected work</a><a href="#about">Our approach</a></nav><a className="asc-header-cta" href="#contact">Contact Us <span aria-hidden="true">↗</span></a></header>;
}
]]>
    </file>
    <file path="src/app/(arcandsignal)/arcandsignal/sections/Hero.tsx">
<![CDATA[import { Picture } from "../assets";
import { Header } from "./Header";

export function Hero() {
  return <section id="top" className="asc-hero"><Picture assetKey="signal-horizon" alt="" className="asc-hero-image" priority/><div className="asc-hero-shade"/><Header/><div className="asc-hero-content asc-wrap"><div className="asc-eyebrow asc-hero-eyebrow"><span className="asc-spark">✳</span> INDEPENDENT CREATIVE GROWTH STUDIO <span className="asc-eyebrow-line"/> EST. 2024</div><h1>Good brands deserve<br/><em>great momentum.</em></h1><p>Big ideas are just the beginning. We bring strategy, creative and growth together to make your next move matter.</p><div className="asc-hero-actions"><a href="#contact" className="asc-button asc-button-primary">Contact Us <span aria-hidden="true">↗</span></a><a href="#work" className="asc-button asc-button-text">Explore our work <span aria-hidden="true">↗</span></a></div><div className="asc-hero-notes"><span><i/> STRATEGY</span><span><i/> CREATIVE</span><span><i/> GROWTH</span></div></div><div className="asc-signal-scene" aria-label="An illustration of connected campaign momentum"><div className="asc-floating asc-floating-left"><span>THE RIGHT IDEA</span><strong>Built to resonate<span>✳</span></strong></div><div className="asc-signal-card"><div className="asc-card-top"><span><i/> THE SIGNAL SYSTEM</span><span>01 / ALWAYS MOVING</span></div><div className="asc-card-middle"><div><small>FROM FIRST IMPRESSION TO LASTING IMPACT</small><strong>Make a little<br/><em>more possible.</em></strong></div><div className="asc-card-glyph" aria-hidden="true"><span/><span/><span/><span/></div></div><div className="asc-card-bottom"><span>BRAND</span><b>↗</b><span>CREATIVE</span><b>↗</b><span>PERFORMANCE</span><i>✳</i></div></div><div className="asc-floating asc-floating-right"><span>THE BIG PICTURE</span><strong>Made to move<span>↗</span></strong></div><div className="asc-scene-caption"><span>GOOD IDEAS GO FURTHER TOGETHER</span><span>SCROLL TO EXPLORE ↓</span></div></div></section>;
}
]]>
    </file>
    <file path="src/app/(arcandsignal)/arcandsignal/sections/Services.tsx">
<![CDATA[const services = [
  { no: "01", icon: "◎", title: "Find your signal.", body: "A sharp position and a story worth paying attention to.", tags: "BRAND STRATEGY  /  POSITIONING" },
  { no: "02", icon: "✳", title: "Make it matter.", body: "Ideas and identities that turn a passing glance into a connection.", tags: "CREATIVE  /  CAMPAIGNS" },
  { no: "03", icon: "↗", title: "Keep it moving.", body: "Thoughtful experiments that turn attention into meaningful growth.", tags: "PAID MEDIA  /  OPTIMIZATION" },
  { no: "04", icon: "◉", title: "Bring them closer.", body: "Digital experiences that give people a reason to stay.", tags: "DIGITAL  /  LIFECYCLE" },
];
export function Services() {
  return <section id="services" className="asc-services asc-wrap asc-section"><div className="asc-section-heading" data-reveal="rise"><div><span className="asc-kicker"><span>✳</span> WHAT WE DO <b> / 01</b></span><h2>Clarity meets<br/><em>creative momentum.</em></h2></div><p>Good marketing is a connected system. We bring every piece together, from the first spark to the next big leap.</p></div><div className="asc-services-grid">{services.map((service, index) => <article className="asc-service" data-reveal="rise" style={{ "--i": index } as React.CSSProperties} key={service.no}><div className="asc-service-top"><span className="asc-service-icon">{service.icon}</span><span>{service.no} / 04</span></div><h3>{service.title}</h3><p>{service.body}</p><div className="asc-service-tags">{service.tags}</div></article>)}</div></section>;
}
]]>
    </file>
    <file path="src/app/(arcandsignal)/arcandsignal/sections/Work.tsx">
<![CDATA[export function Work() {
  return <section id="work" className="asc-work asc-wrap asc-section"><div className="asc-section-heading" data-reveal="rise"><div><span className="asc-kicker"><span>✳</span> SELECTED WORK <b> / 02</b></span><h2>A little proof<br/><em>of possibility.</em></h2></div><p>Different challenges, one shared ambition: make something people remember and results worth talking about.</p></div><div className="asc-work-grid"><article className="asc-case" data-reveal="wipe"><div className="asc-case-art asc-case-art-one"><span className="asc-case-corner">FIELD NOTES / 001</span><div className="asc-case-sun"><span>V</span></div><span className="asc-case-art-label">A brighter way<br/>to begin.</span></div><div className="asc-case-info"><div><span>BRAND PLATFORM · CAMPAIGN</span><h3>Veyla Living</h3><p>Making room for a more considered kind of everyday.</p></div><a href="#contact" aria-label="Discuss a project like Veyla Living">↗</a></div></article><article className="asc-case" data-reveal="wipe"><div className="asc-case-art asc-case-art-two"><span className="asc-case-corner">FIELD NOTES / 002</span><div className="asc-case-type">GOOD<br/><em>ENERGY.</em></div><span className="asc-case-art-label">A little more<br/>of what moves you.</span></div><div className="asc-case-info"><div><span>GROWTH STRATEGY · DIGITAL</span><h3>Otherloom</h3><p>Turning an ambitious idea into an unmistakable presence.</p></div><a href="#contact" aria-label="Discuss a project like Otherloom">↗</a></div></article></div><p className="asc-fiction-note">Selected projects are fictional examples created for this template.</p></section>;
}
]]>
    </file>
  </files>
</template>
