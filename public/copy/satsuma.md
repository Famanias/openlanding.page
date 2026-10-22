<template slug="satsuma" name="Satsuma">
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
    <file path="src/app/(satsuma)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { MOTION_SCRIPT } from "./satsuma/motion/mode";
import "./satsuma/satsuma.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-body",
});

export const metadata: Metadata = {
  title: "Satsuma — reels that land, made by hand",
  description:
    "A marketplace for short product reels. Brief a handpicked maker and get scroll-stopping vertical clips back in days: 6, 12 or 24 reels, shot, cut and captioned by one person.",
};

export const viewport: Viewport = {
  themeColor: "#FFF6EA",
  colorScheme: "light",
};

export default function SatsumaLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="sa-body">
        <script
          // Sets data-sa-motion before first paint: "live" only with JS and no reduced-motion preference.
          type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: MOTION_SCRIPT }}
        />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/satsuma";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = { assetKey: string; alt: string; className?: string; sizes?: string; priority?: boolean };

/** A responsive <picture>, or a labelled placeholder (a quiet colour field) until the image is generated. */
export function Picture({ assetKey, alt, className, sizes = "(min-width: 900px) 40vw, 100vw", priority }: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div className={`sa-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span className="sa-placeholder__label">{assetKey}.jpg</span>
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey];
  const set = (f: "webp" | "avif") => `${assetSrc(assetKey, 800, f)} 800w, ${assetSrc(assetKey, 1600, f)} 1600w`;
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <img
        src={webp800}
        srcSet={set("webp")}
        sizes={sizes}
        width={w}
        height={h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        data-asset={assetKey}
      />
    </picture>
  );
}

/** True once `npm run images -- satsuma` has produced this key. */
export function hasAsset(key: string): boolean {
  return key in ASSETS;
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <rect x="3" y="3" width="42" height="42" rx="13" fill="#3A1D4A"/>
  <circle cx="24" cy="27" r="14" fill="#FF7A2F"/>
  <path d="M24 27V15M24 27l10.5-6M24 27l10.5 6M24 27v12M24 27l-10.5 6M24 27l-10.5-6" fill="none" stroke="#3A1D4A" stroke-width="1.5" stroke-linecap="round" opacity=".5"/>
  <path d="M24 13.5c-.3-4.6 3-7 8-6.5-.3 4.7-3.3 7.1-8 6.5z" fill="#FFD9B0"/>
</svg>
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Satsuma. Reels that land, made by hand. Short product reels from handpicked makers.";

const PAPER = "#FFF6EA";
const INK = "#1F1520";
const AUBERGINE = "#3A1D4A";
const SATSUMA = "#FF7A2F";
const APRICOT = "#FFD9B0";
const LEAF = "#2F5D3A";

const CARDS = [
  { h: 330, w: 150, bg: APRICOT },
  { h: 290, w: 140, bg: SATSUMA },
  { h: 260, w: 132, bg: AUBERGINE },
  { h: 290, w: 140, bg: LEAF },
  { h: 330, w: 150, bg: APRICOT },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: PAPER,
          color: INK,
          padding: "56px 64px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <svg width="56" height="56" viewBox="0 0 48 48">
            <circle cx="24" cy="27" r="18" fill={SATSUMA} />
            <path d="M24 27V12M24 27l13-7.5M24 27l13 7.5M24 27v15M24 27l-13 7.5M24 27l-13-7.5" fill="none" stroke={AUBERGINE} strokeWidth="1.6" opacity=".5" />
            <path d="M24 10.5c-.4-5.6 3.6-8.6 9.6-8-.4 5.8-4 8.8-9.6 8z" fill={LEAF} />
            <circle cx="24" cy="27" r="3.4" fill={AUBERGINE} />
          </svg>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>
            satsuma<span style={{ color: SATSUMA }}>.</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 84, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.035em" }}>
            <span>Reels that land,</span>
            <span>made by hand.</span>
            <div style={{ display: "flex", marginTop: 24, fontSize: 26, fontWeight: 400, letterSpacing: 0, color: AUBERGINE }}>
              Short product reels from handpicked makers
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {CARDS.map((c, i) => (
              <div key={i} style={{ display: "flex", width: c.w, height: c.h, borderRadius: 22, backgroundColor: c.bg, alignItems: "flex-end", padding: 12 }}>
                <div style={{ display: "flex", width: 34, height: 34, borderRadius: 17, backgroundColor: PAPER, opacity: 0.85 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/page.tsx">
<![CDATA[import { Reveals } from "./motion/Reveals";
import { ScrollVars } from "./motion/ScrollVars";
import { SmoothScroll } from "./motion/SmoothScroll";
import { Brief } from "./sections/Brief";
import { Categories } from "./sections/Categories";
import { Footer } from "./sections/Footer";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { HowItWorks } from "./sections/HowItWorks";
import { Makers } from "./sections/Makers";
import { Packs } from "./sections/Packs";

export default function SatsumaPage() {
  return (
    <>
      <a className="sa-skip" href="#how">
        Skip to how it works
      </a>
      <Header />
      <main>
        <Hero />
        <div className="sa-sheet">
          <Categories />
          <HowItWorks />
          <Makers />
          <Packs />
          <Brief />
        </div>
      </main>
      <Footer />
      <Reveals />
      <ScrollVars />
      <SmoothScroll />
    </>
  );
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/satsuma.css">
<![CDATA[@import "tailwindcss";

/* ─────────────── Satsuma tokens: reels, in segments ─────────────── */
@theme static {
  --color-paper: #FFF6EA;     /* the page */
  --color-ink: #1F1520;       /* text */
  --color-aubergine: #3A1D4A; /* the primary action, the dark bands */
  --color-satsuma: #FF7A2F;   /* the one accent: fills, rings, never small text */
  --color-apricot: #FFD9B0;   /* tints, card ground */
  --color-leaf: #2F5D3A;      /* rare: the leaf, one green note */

  --font-sa-display: var(--font-bricolage), ui-sans-serif, system-ui, sans-serif;
  --font-sa-body: var(--font-inter-body), ui-sans-serif, system-ui, sans-serif;

  /* motion: glide + settle */
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-spring: linear(0, 0.4 9%, 0.86 22%, 1.04 33%, 1.01 46%, 0.995 62%, 1);
  --dur-instant: 90ms;
  --dur-fast: 180ms;
  --dur-base: 420ms;
  --dur-slow: 850ms;
  --dur-hero: 1100ms;
  --reveal-shift: 28px;
  --stagger: 80ms;
}

/* ─────────────── Base ─────────────── */
.sa-body {
  /* One frame unit. The hero is a 1440×1080 picture scaled to fit the screen. */
  --u: min(calc(100vw / 1440), calc(100svh / 1080));
  --sa-gutter: clamp(20px, 5vw, 72px);
  --sa-muted: color-mix(in srgb, var(--color-ink) 68%, var(--color-paper));
  --sa-hair: color-mix(in srgb, var(--color-ink) 14%, transparent);
  --sa-card: color-mix(in srgb, var(--color-paper) 55%, white);
  --sa-tint: color-mix(in srgb, var(--color-apricot) 38%, var(--color-paper));

  margin: 0;
  background-color: var(--color-paper);
  color: var(--color-ink);
  font-family: var(--font-sa-body);
  font-size: 1.0625rem;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

@media (max-width: 820px) {
  .sa-body {
    --u: calc(100vw / 640);
  }
}

html:has(.sa-body) {
  scroll-padding-top: 88px;
  background-color: var(--color-paper);
}

html.sa-locked {
  overflow: hidden;
}

.sa-body *,
.sa-body *::before,
.sa-body *::after {
  box-sizing: border-box;
}

.sa-body main,
.sa-body footer {
  overflow-x: clip;
}

.sa-body ::selection {
  background: var(--color-satsuma);
  color: var(--color-ink);
}

.sa-body :focus-visible {
  outline: 2px solid var(--color-aubergine);
  outline-offset: 3px;
}

.sa-brief :focus-visible,
.sa-band :focus-visible,
.sa-footer :focus-visible,
.sa-pack[data-popular="true"] :focus-visible,
.sa-menu :focus-visible {
  outline-color: var(--color-satsuma);
}

:where(.sa-body) img,
:where(.sa-body) svg {
  display: block;
  max-width: 100%;
}

:where(.sa-body) :where(h1, h2, h3, p, dl, dd, ol, ul, figure, fieldset, legend) {
  margin: 0;
  padding: 0;
}

:where(.sa-body) :where(ol, ul) {
  list-style: none;
}

:where(.sa-body) :where(fieldset) {
  border: 0;
  min-width: 0;
}

:where(.sa-body) :where(button, input, select, textarea) {
  font: inherit;
  color: inherit;
}

.sa-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

.sa-skip {
  position: fixed;
  left: 16px;
  top: 12px;
  z-index: 100;
  padding: 10px 14px;
  background: var(--color-aubergine);
  color: var(--color-paper);
  font: 500 14px/1 var(--font-sa-body);
  border-radius: 999px;
  transform: translateY(-160%);
  transition: transform var(--dur-fast) var(--ease-out);
}

.sa-skip:focus-visible {
  transform: none;
}

.sa-tabular {
  font-variant-numeric: tabular-nums;
}

.sa-wrap {
  width: min(100% - 2 * var(--sa-gutter), 1240px);
  margin-inline: auto;
}

/* ─────────────── Buttons ─────────────── */
.sa-btn {
  --fill: var(--color-satsuma);
  position: relative;
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  padding-inline: 24px;
  border: 0;
  border-radius: 999px;
  overflow: hidden;
  font: 500 15.5px/1 var(--font-sa-body);
  letter-spacing: -0.005em;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition:
    transform var(--dur-instant) var(--ease-out),
    color var(--dur-fast) var(--ease-out);
}

.sa-btn::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background: var(--fill);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur-base) var(--ease-out);
}

.sa-btn--aub {
  background: var(--color-aubergine);
  color: var(--color-paper);
}

.sa-btn--sat {
  --fill: var(--color-aubergine);
  background: var(--color-satsuma);
  color: var(--color-ink);
}

.sa-btn--paper {
  --fill: var(--color-apricot);
  background: color-mix(in srgb, var(--color-paper) 40%, white);
  color: var(--color-ink);
  box-shadow: inset 0 0 0 1px var(--sa-hair);
}

.sa-btn:active {
  transform: scale(0.97);
  transition-duration: var(--dur-instant);
}

.sa-btn[disabled] {
  cursor: progress;
}

.sa-btn__roll {
  display: inline-grid;
  overflow: clip;
}

.sa-btn__roll > span {
  grid-area: 1 / 1;
  transition: transform var(--dur-base) var(--ease-out);
}

.sa-btn__roll > span + span {
  transform: translateY(110%);
}

@media (hover: hover) and (pointer: fine) {
  .sa-btn:hover::before {
    transform: scaleX(1);
  }
  .sa-btn--aub:hover,
  .sa-btn--paper:hover {
    color: var(--color-ink);
  }
  .sa-btn--sat:hover {
    color: var(--color-paper);
  }
  .sa-btn:hover .sa-btn__roll > span:first-child {
    transform: translateY(-110%);
  }
  .sa-btn:hover .sa-btn__roll > span + span {
    transform: none;
  }
}

.sa-magnetic {
  display: inline-block;
  transform: translate3d(var(--mx, 0px), var(--my, 0px), 0);
}

.sa-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: var(--color-aubergine);
  text-decoration: none;
  background: linear-gradient(currentColor, currentColor) left bottom / 0% 1.5px no-repeat;
  padding-bottom: 3px;
  transition: background-size var(--dur-base) var(--ease-out);
}

.sa-link__arrow {
  transition: transform var(--dur-base) var(--ease-out);
}

@media (hover: hover) and (pointer: fine) {
  .sa-link:hover {
    background-size: 100% 1.5px;
  }
  .sa-link:hover .sa-link__arrow {
    transform: translateX(5px);
  }
}

/* ─────────────── Brand ─────────────── */
.sa-logo {
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  color: var(--color-aubergine);
  font: 700 max(calc(26 * var(--u)), 20px) / 1 var(--font-sa-display);
  letter-spacing: -0.03em;
}

.sa-logo__mark {
  width: 1.35em;
  height: 1.35em;
  --sa-fruit: var(--color-satsuma);
}

.sa-mark__fruit {
  fill: var(--sa-fruit, var(--color-satsuma));
}

.sa-mark__leaf {
  fill: var(--color-leaf);
}

.sa-logo__dot {
  color: var(--color-satsuma);
}

/* ─────────────── Header ─────────────── */
.sa-header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  transition: transform var(--dur-base) var(--ease-out);
}

.sa-header::before {
  content: "";
  position: absolute;
  inset: 0;
  background: color-mix(in srgb, var(--color-paper) 88%, transparent);
  backdrop-filter: blur(14px);
  opacity: 0;
  transform: translateY(-100%);
  transition:
    opacity var(--dur-base) var(--ease-out),
    transform var(--dur-base) var(--ease-out);
}

.sa-header[data-state="compact"]::before,
.sa-header[data-state="hidden"]::before {
  opacity: 1;
  transform: none;
}

.sa-header[data-state="hidden"] {
  transform: translateY(-110%);
}

.sa-header__bar {
  position: relative;
  width: calc(1440 * var(--u));
  height: max(calc(98 * var(--u)), 62px);
  margin-inline: auto;
}

.sa-header__logo {
  position: absolute;
  left: calc(37 * var(--u));
  top: calc(36 * var(--u));
  text-decoration: none;
}

.sa-nav {
  position: absolute;
  left: calc(505 * var(--u));
  top: calc(29 * var(--u));
  height: max(calc(40 * var(--u)), 34px);
  display: flex;
  align-items: center;
}

.sa-nav ul {
  display: flex;
  gap: calc(31 * var(--u));
}

.sa-nav a {
  display: block;
  padding-block: 8px;
  font: 400 max(calc(16.4 * var(--u)), 13px) / 1 var(--font-sa-body);
  color: var(--color-ink);
  text-decoration: none;
  white-space: nowrap;
}

.sa-nav__indicator {
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100px;
  height: 3px;
  border-radius: 3px;
  background: var(--color-satsuma);
  transform: translateX(var(--x, 0px)) scaleX(var(--w, 0));
  transform-origin: left;
  opacity: 0;
  transition:
    transform var(--dur-base) var(--ease-out),
    opacity var(--dur-fast) var(--ease-out);
}

.sa-nav__indicator[data-on="true"] {
  opacity: 1;
}

.sa-header__login,
.sa-header__signup {
  position: absolute;
  top: calc(29 * var(--u));
  height: max(calc(40 * var(--u)), 34px);
  padding-inline: 0;
  font-size: max(calc(15.4 * var(--u)), 13px);
}

.sa-header__login {
  left: calc(1211 * var(--u));
  width: max(calc(92 * var(--u)), 74px);
}

.sa-header__signup {
  left: calc(1304 * var(--u));
  width: max(calc(97 * var(--u)), 80px);
}

.sa-header__rail {
  position: absolute;
  inset: auto 0 0 0;
  height: 2px;
  background: var(--sa-hair);
  opacity: 0;
  transition: opacity var(--dur-base) var(--ease-out);
}

.sa-header[data-state="compact"] .sa-header__rail,
.sa-header[data-state="hidden"] .sa-header__rail {
  opacity: 1;
}

.sa-header__rail-fill {
  position: absolute;
  inset: 0;
  background: var(--color-satsuma);
  transform-origin: left;
  transform: scaleX(var(--sa-page, 0));
}

.sa-menu-toggle {
  display: none;
  position: relative;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
}

.sa-menu-toggle span {
  position: absolute;
  left: 11px;
  right: 11px;
  top: 50%;
  height: 2px;
  margin-top: -1px;
  border-radius: 2px;
  background: var(--color-aubergine);
  transition: transform var(--dur-base) var(--ease-out);
}

.sa-menu-toggle span:first-child {
  transform: translateY(-4px);
}

.sa-menu-toggle span:last-child {
  transform: translateY(4px);
}

.sa-menu-toggle[aria-expanded="true"] span {
  background: var(--color-paper);
}

.sa-menu-toggle[aria-expanded="true"] span:first-child {
  transform: rotate(45deg);
}

.sa-menu-toggle[aria-expanded="true"] span:last-child {
  transform: rotate(-45deg);
}

.sa-menu-toggle:active {
  transform: scale(0.92);
}

.sa-menu {
  display: none;
}

@media (max-width: 820px) {
  .sa-header__bar {
    width: 100%;
    height: 64px;
    padding-inline: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .sa-header__logo {
    position: static;
    margin-right: auto;
  }
  .sa-logo {
    font-size: 22px;
  }
  .sa-nav,
  .sa-header__login {
    display: none;
  }
  .sa-header__signup {
    position: static;
    width: auto;
    height: 40px;
    padding-inline: 20px;
    font-size: 14px;
  }
  .sa-menu-toggle {
    display: block;
    margin-right: -10px;
  }
  .sa-menu {
    position: fixed;
    inset: 0;
    z-index: 45;
    display: grid;
    align-content: center;
    padding: 96px 28px 40px;
    background: var(--color-aubergine);
    color: var(--color-paper);
    clip-path: circle(0% at calc(100% - 38px) 32px);
    visibility: hidden;
    transition:
      clip-path var(--dur-base) var(--ease-in-out),
      visibility 0s linear var(--dur-base);
  }
  .sa-menu[data-open="true"] {
    clip-path: circle(150% at calc(100% - 38px) 32px);
    visibility: visible;
    transition:
      clip-path var(--dur-base) var(--ease-in-out),
      visibility 0s;
  }
  .sa-menu ol {
    display: grid;
    gap: 6px;
    margin-bottom: 32px;
  }
  .sa-menu ol a {
    display: flex;
    align-items: baseline;
    gap: 14px;
    font: 700 clamp(34px, 10vw, 54px) / 1.15 var(--font-sa-display);
    letter-spacing: -0.03em;
    color: inherit;
    text-decoration: none;
  }
  .sa-menu__num {
    font: 500 13px/1 var(--font-sa-body);
    color: var(--color-apricot);
  }
  .sa-menu li {
    opacity: 0;
    transform: translateY(18px);
    transition:
      opacity var(--dur-base) var(--ease-out),
      transform var(--dur-base) var(--ease-out);
  }
  .sa-menu[data-open="true"] li {
    opacity: 1;
    transform: none;
    transition-delay: calc(140ms + var(--i, 0) * 50ms);
  }
  .sa-menu__cta {
    justify-self: start;
  }
}

/* ─────────────── Hero: the 1440×1080 frame ─────────────── */
.sa-hero {
  position: relative;
  height: calc(1080 * var(--u));
  overflow-x: clip;
  --sa-out: 0;
}

.sa-hero__frame {
  position: relative;
  width: calc(1440 * var(--u));
  height: 100%;
  margin-inline: auto;
  transform-origin: 50% 45%;
  transform: scale(calc(1 - var(--sa-out) * 0.05));
  opacity: calc(1 - var(--sa-out) * 0.55);
}

html[data-sa-motion="live"] .sa-hero {
  position: sticky;
  top: 0;
}

.sa-h1 {
  position: absolute;
  inset: calc(176 * var(--u)) 0 auto 0;
  z-index: 2;
  text-align: center;
  font: 700 calc(88 * var(--u)) / calc(92 * var(--u)) var(--font-sa-display);
  letter-spacing: -0.035em;
  color: var(--color-ink);
}

.sa-h1__line {
  display: block;
  overflow: clip;
  padding-bottom: 0.14em;
  margin-bottom: -0.14em;
}

.sa-h1__line--2 {
  letter-spacing: -0.022em;
}

.sa-h1__text {
  display: block;
}

.sa-sub {
  position: absolute;
  left: 50%;
  translate: -50% 0;
  top: calc(394 * var(--u));
  z-index: 2;
  width: max-content;
  max-width: 100%;
  text-align: center;
  font: 400 max(calc(20.8 * var(--u)), 14px) / calc(32 * var(--u)) var(--font-sa-body);
  color: var(--sa-muted);
}

.sa-sub span {
  display: block;
}

/* Hero marks: a turning seal, a leaf sprig on a wedge, and a trust line */
.sa-seal {
  position: absolute;
  left: calc(1196 * var(--u));
  top: calc(292 * var(--u));
  z-index: 3;
  display: grid;
  place-items: center;
  width: max(calc(150 * var(--u)), 96px);
  aspect-ratio: 1;
  pointer-events: none;
}

.sa-seal > svg:not(.sa-seal__mark) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.sa-seal__disc {
  fill: var(--color-apricot);
}

.sa-seal__ring {
  transform-box: view-box;
  transform-origin: 80px 80px;
}

.sa-seal__text {
  font: 600 10.6px / 1 var(--font-sa-body);
  fill: var(--color-aubergine);
}

.sa-seal__mark {
  position: relative;
  width: 44%;
  height: 44%;
  color: var(--color-aubergine);
  --sa-fruit: var(--color-satsuma);
}

.sa-sprig {
  position: absolute;
  left: calc(206 * var(--u));
  top: calc(344 * var(--u));
  z-index: 3;
  width: max(calc(116 * var(--u)), 72px);
  overflow: visible;
  pointer-events: none;
}

.sa-sprig__stem {
  fill: none;
  stroke: var(--color-leaf);
  stroke-width: 3.4;
  stroke-linecap: round;
}

.sa-sprig__leaf {
  fill: var(--color-leaf);
  transform-box: fill-box;
  transform-origin: 50% 100%;
}

.sa-sprig__wedge {
  fill: var(--color-satsuma);
}

.sa-sprig__veins {
  fill: none;
  stroke: var(--color-paper);
  stroke-width: 2.2;
  stroke-linecap: round;
  opacity: 0.7;
}

.sa-trust {
  position: absolute;
  left: 50%;
  translate: -50% 0;
  top: calc(994 * var(--u));
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 0.6em;
  width: max-content;
  max-width: 100%;
  white-space: nowrap;
  font: 500 max(calc(14.5 * var(--u)), 13px) / 1.2 var(--font-sa-body);
  color: var(--sa-muted);
}

.sa-trust__dot {
  flex: none;
  width: 0.7em;
  height: 0.7em;
  border-radius: 50% 50% 50% 0;
  background: var(--color-satsuma);
  rotate: -45deg;
}

.sa-draw {
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
}

/* CTA: an aubergine pill sitting on a satsuma plate; on hover or press it settles down onto it */
.sa-cta {
  position: absolute;
  z-index: 3;
  left: calc(626 * var(--u));
  top: calc(901 * var(--u));
  width: max(calc(190 * var(--u)), 156px);
  height: max(calc(74 * var(--u)), 62px);
  display: grid;
  place-items: center;
}

.sa-cta__plate {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: var(--color-satsuma);
}

.sa-cta__magnet {
  display: block;
  translate: calc(-7 * var(--u)) calc(-7 * var(--u));
}

.sa-cta:active .sa-cta__magnet {
  translate: 0 0;
}

@media (hover: hover) and (pointer: fine) {
  .sa-cta:hover .sa-cta__magnet,
  .sa-cta:focus-within .sa-cta__magnet {
    translate: 0 0;
  }
}

.sa-btn--hero {
  width: calc(172 * var(--u));
  height: calc(58 * var(--u));
  min-width: 136px;
  min-height: 48px;
  padding-inline: 0;
  font-size: max(calc(18 * var(--u)), 15px);
}

/* ─────────────── The reel wheel ─────────────── */
.sa-wheel {
  --wu: var(--u);
  position: absolute;
  left: 50%;
  top: 0;
  z-index: 1;
  width: 100vw;
  height: 100%;
  margin-left: -50vw;
  cursor: grab;
  touch-action: pan-y;
  user-select: none;
  -webkit-user-select: none;
  outline-offset: -4px;
}

.sa-wheel[data-dragging="true"] {
  cursor: grabbing;
}

.sa-wheel__probe {
  position: absolute;
  left: 0;
  top: 0;
  width: calc(1000 * var(--wu));
  height: 1px;
  visibility: hidden;
  pointer-events: none;
}

.sa-wheel__track {
  position: absolute;
  inset: 0;
  contain: layout style;
}

.sa-card {
  position: absolute;
  contain: layout style paint;
  overflow: hidden;
  background: var(--color-apricot);
  will-change: transform, clip-path;
  -webkit-tap-highlight-color: transparent;
}

.sa-card__media {
  position: absolute;
  inset: 0;
}

.sa-scene {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  transition: scale var(--dur-slow) var(--ease-out);
}

.sa-card__video {
  position: absolute;
  left: 0;
  top: 0;
  max-width: none;
  object-fit: fill;
  opacity: 0;
  transition: opacity var(--dur-slow) var(--ease-out);
}

.sa-card__video[data-ready="true"] {
  opacity: 1;
}

.sa-card__play {
  position: absolute;
  left: calc(14 * var(--wu));
  bottom: calc(14 * var(--wu));
  width: calc(34 * var(--wu));
  height: calc(34 * var(--wu));
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: color-mix(in srgb, var(--color-paper) 42%, transparent);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  transition:
    scale var(--dur-base) var(--ease-spring),
    background-color var(--dur-fast) var(--ease-out);
}

.sa-card__play svg {
  width: 62%;
  height: 62%;
  fill: var(--color-paper);
}

@media (hover: hover) and (pointer: fine) {
  .sa-card:hover .sa-card__play {
    scale: 1.14;
    background: var(--color-satsuma);
  }
  .sa-card:hover .sa-scene {
    scale: 1.06;
  }
}

/* Scene loops: transform-only, paused off-screen */
.sa-f-paper { fill: var(--color-paper); }
.sa-f-ink { fill: var(--color-ink); }
.sa-f-aub { fill: var(--color-aubergine); }
.sa-f-sat { fill: var(--color-satsuma); }
.sa-f-apr { fill: var(--color-apricot); }
.sa-f-leaf { fill: var(--color-leaf); }
.sa-f-apr-soft { fill: color-mix(in srgb, var(--color-apricot) 45%, var(--color-paper)); }
.sa-f-leaf-soft { fill: color-mix(in srgb, var(--color-leaf) 22%, var(--color-paper)); }
.sa-s-paper,
.sa-s-ink,
.sa-s-aub,
.sa-s-sat,
.sa-s-apr,
.sa-s-leaf {
  fill: none;
  stroke-width: 6;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.sa-s-paper { stroke: var(--color-paper); }
.sa-s-ink { stroke: var(--color-ink); }
.sa-s-aub { stroke: var(--color-aubergine); }
.sa-s-sat { stroke: var(--color-satsuma); }
.sa-s-apr { stroke: var(--color-apricot); }
.sa-s-leaf { stroke: var(--color-leaf); }
.sa-sw-8 { stroke-width: 8; }
.sa-sw-10 { stroke-width: 10; }
.sa-sw-14 { stroke-width: 14; }
.sa-sw-18 { stroke-width: 18; }
.sa-sw-20 { stroke-width: 20; }
.sa-o-3 { opacity: 0.3; }
.sa-o-6 { opacity: 0.6; }

.sa-a {
  transform-box: fill-box;
  transform-origin: center;
}

.sa-a-sway,
.sa-a-vb {
  transform-box: view-box;
}

.sa-wheel[data-playing="false"] .sa-a {
  animation-play-state: paused !important;
}

/* ─────────────── Type and reveals ─────────────── */
.sa-h2 {
  margin-top: 18px;
  font: 700 clamp(2.4rem, 5.2vw, 4.6rem) / 1 var(--font-sa-display);
  letter-spacing: -0.035em;
  color: var(--color-ink);
}

.sa-h2 em {
  font-style: normal;
  background: linear-gradient(transparent 62%, var(--color-satsuma) 62% 92%, transparent 92%);
  padding-inline: 0.06em;
  margin-inline: -0.06em;
}

.sa-mask {
  display: block;
  overflow: clip;
  padding-bottom: 0.14em;
  margin-bottom: -0.14em;
}

.sa-lede {
  max-width: 54ch;
  margin-top: 22px;
  font-size: 1.125rem;
  color: var(--sa-muted);
}

.sa-eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  font: 500 0.8125rem/1 var(--font-sa-body);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-aubergine);
}

.sa-eyebrow__rule {
  width: 34px;
  height: 2px;
  border-radius: 2px;
  background: var(--color-satsuma);
  transform-origin: left;
}

.sa-eyebrow__n {
  font-variant-numeric: tabular-nums;
  color: var(--sa-muted);
}

/* ─────────────── Sheet: the bands that slide over the hero ─────────────── */
.sa-sheet {
  position: relative;
  z-index: 1;
  background: var(--color-paper);
  border-radius: clamp(24px, 3.2vw, 48px) clamp(24px, 3.2vw, 48px) 0 0;
}

.sa-band {
  background: var(--color-aubergine);
  color: var(--color-paper);
  border-radius: inherit;
  overflow: hidden;
}

.sa-marquee {
  overflow: hidden;
  padding-block: clamp(18px, 2.4vw, 30px);
}

.sa-marquee__track {
  display: flex;
  width: max-content;
}

.sa-marquee__run {
  display: flex;
}

.sa-marquee__item {
  display: inline-flex;
  align-items: center;
  font: 700 clamp(2rem, 4.6vw, 4rem) / 1 var(--font-sa-display);
  letter-spacing: -0.03em;
  white-space: nowrap;
}

.sa-marquee__sep {
  padding-inline: 0.5em;
  color: var(--color-satsuma);
}

.sa-how,
.sa-makers,
.sa-packs,
.sa-brief {
  padding-block: clamp(72px, 10vw, 140px);
}

.sa-how {
  background: var(--color-paper);
}

/* How it works */
.sa-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(20px, 3vw, 44px);
  margin-top: clamp(40px, 6vw, 72px);
}

.sa-step {
  position: relative;
  display: grid;
  align-content: start;
  gap: 10px;
  padding: 28px 26px 26px;
  border-radius: 28px;
  background: var(--sa-tint);
}

.sa-step__n {
  font: 800 clamp(3.4rem, 6vw, 5.2rem) / 0.9 var(--font-sa-display);
  letter-spacing: -0.04em;
  color: var(--color-satsuma);
}

.sa-step__title {
  font: 700 1.6rem / 1.1 var(--font-sa-display);
  letter-spacing: -0.025em;
}

.sa-step__body {
  color: var(--sa-muted);
}

.sa-step__figure {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-top: 14px;
  padding-top: 16px;
  border-top: 1.5px dashed color-mix(in srgb, var(--color-aubergine) 40%, transparent);
}

.sa-step__num {
  font: 800 2.6rem / 1 var(--font-sa-display);
  letter-spacing: -0.04em;
  color: var(--color-aubergine);
}

.sa-step__unit {
  font-weight: 600;
  color: var(--color-aubergine);
}

.sa-step__label {
  margin-left: auto;
  font-size: 0.875rem;
  color: var(--sa-muted);
}

.sa-step__link {
  position: absolute;
  right: -62px;
  top: 38px;
  z-index: 2;
  width: 80px;
  fill: none;
  stroke: var(--color-aubergine);
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Makers */
.sa-makers {
  background: var(--sa-tint);
}

.sa-makers__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(18px, 2.4vw, 32px);
  margin-top: clamp(40px, 6vw, 64px);
}

.sa-tilt {
  transform-style: preserve-3d;
  transform: perspective(900px) translateY(var(--lift, 0px)) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: transform var(--dur-base) var(--ease-out);
}

.sa-tilt:active {
  --lift: -2px;
}

.sa-makers__grid > li {
  display: flex;
}

.sa-maker {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  border-radius: 28px;
  background: var(--sa-card);
  box-shadow: inset 0 0 0 1px var(--sa-hair);
}

.sa-maker::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(420px circle at var(--sx, 50%) var(--sy, 0%), color-mix(in srgb, var(--color-satsuma) 22%, transparent), transparent 60%);
  opacity: 0;
  transition: opacity var(--dur-base) var(--ease-out);
  pointer-events: none;
}

.sa-maker__media {
  position: relative;
  aspect-ratio: 4 / 3.4;
  overflow: hidden;
}

.sa-maker__media > svg,
.sa-maker__media > picture,
.sa-maker__media > picture img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: scale var(--dur-slow) var(--ease-out);
}

.sa-maker__rate {
  position: absolute;
  left: 14px;
  bottom: 14px;
  padding: 7px 12px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-paper) 85%, transparent);
  font: 500 0.8125rem/1 var(--font-sa-body);
  color: var(--color-ink);
}

.sa-maker__body {
  display: grid;
  flex: 1;
  grid-template-rows: auto auto 1fr auto auto;
  gap: 6px;
  padding: 20px 22px 24px;
}

.sa-maker__name {
  font: 700 1.5rem / 1.1 var(--font-sa-display);
  letter-spacing: -0.025em;
}

.sa-maker__craft {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--color-aubergine);
}

.sa-maker__line {
  color: var(--sa-muted);
}

.sa-maker__stats {
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-content: space-between;
  margin-block: 10px 12px;
  padding-block: 12px;
  border-block: 1.5px dashed var(--sa-hair);
}

.sa-maker__stats dt {
  font-size: 0.75rem;
  color: var(--sa-muted);
}

.sa-maker__stats dd {
  font: 700 1.1rem / 1.2 var(--font-sa-display);
  font-variant-numeric: tabular-nums;
}

.sa-maker .sa-link {
  justify-self: start;
}

@media (hover: hover) and (pointer: fine) {
  .sa-tilt:hover {
    --lift: -6px;
  }
  .sa-maker:hover::after {
    opacity: 1;
  }
  .sa-maker:hover .sa-maker__media > svg,
  .sa-maker:hover .sa-maker__media > picture {
    scale: 1.06;
  }
  .sa-makers__grid:has(.sa-maker:hover) li:not(:has(.sa-maker:hover)) {
    opacity: 0.62;
  }
}

.sa-makers__grid li {
  transition: opacity var(--dur-base) var(--ease-out);
}

/* Packs */
.sa-packs__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(18px, 2.4vw, 32px);
  margin-top: clamp(40px, 6vw, 64px);
  align-items: stretch;
}

.sa-packs__grid > li {
  display: flex;
}

.sa-pack {
  position: relative;
  display: grid;
  align-content: start;
  gap: 12px;
  width: 100%;
  padding: 28px 28px 30px;
  border-radius: 32px;
  background: var(--sa-card);
  box-shadow: inset 0 0 0 1px var(--sa-hair);
  transition: transform var(--dur-base) var(--ease-out);
}

.sa-pack[data-popular="true"] {
  background: var(--color-aubergine);
  color: var(--color-paper);
  box-shadow: none;
}

.sa-pack__flag {
  position: absolute;
  right: 22px;
  top: 22px;
  padding: 7px 12px;
  border-radius: 999px;
  background: var(--color-satsuma);
  color: var(--color-ink);
  font: 600 0.75rem/1 var(--font-sa-body);
  letter-spacing: 0.04em;
}

.sa-pack__ring {
  width: 112px;
  height: 112px;
  margin-bottom: 6px;
}

.sa-ring__peel {
  fill: color-mix(in srgb, var(--color-apricot) 55%, var(--color-paper));
}

.sa-pack[data-popular="true"] .sa-ring__peel {
  fill: color-mix(in srgb, var(--color-aubergine) 70%, var(--color-paper));
}

.sa-ring__wedge {
  fill: var(--color-satsuma);
  transform-box: view-box;
  transform-origin: 50px 50px;
}

.sa-ring__core {
  fill: var(--color-paper);
}

.sa-pack[data-popular="true"] .sa-ring__core {
  fill: var(--color-aubergine);
}

.sa-pack__name {
  display: flex;
  align-items: baseline;
  gap: 12px;
  font: 700 2rem / 1 var(--font-sa-display);
  letter-spacing: -0.03em;
}

.sa-pack__count {
  font: 500 0.9375rem/1 var(--font-sa-body);
  letter-spacing: 0;
  opacity: 0.72;
}

.sa-pack__price {
  display: grid;
  gap: 2px;
}

.sa-pack__amount {
  font: 800 3rem / 1 var(--font-sa-display);
  letter-spacing: -0.04em;
}

.sa-pack__per {
  font-size: 0.9375rem;
  opacity: 0.75;
}

.sa-pack__perks {
  display: grid;
  gap: 8px;
  margin-block: 10px 16px;
  padding-top: 16px;
  border-top: 1.5px dashed color-mix(in srgb, currentColor 28%, transparent);
}

.sa-pack__perks li {
  position: relative;
  padding-left: 24px;
}

.sa-pack__perks li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.45em;
  width: 11px;
  height: 11px;
  border-radius: 50% 50% 50% 0;
  background: var(--color-satsuma);
  rotate: -45deg;
}

.sa-pack__magnet {
  margin-top: auto;
  justify-self: start;
}

@media (hover: hover) and (pointer: fine) {
  .sa-pack:hover {
    transform: translateY(-6px);
  }
  .sa-packs__grid:has(.sa-pack:hover) .sa-pack:not(:hover) {
    opacity: 0.7;
  }
}

.sa-pack {
  transition:
    transform var(--dur-base) var(--ease-out),
    opacity var(--dur-base) var(--ease-out);
}

/* Brief form */
.sa-brief {
  background: var(--color-aubergine);
  color: var(--color-paper);
}

.sa-brief .sa-h2,
.sa-brief .sa-eyebrow,
.sa-brief .sa-eyebrow__n {
  color: var(--color-paper);
}

.sa-brief .sa-h2 em {
  background: linear-gradient(transparent 62%, var(--color-satsuma) 62% 92%, transparent 92%);
}

.sa-brief .sa-lede {
  color: color-mix(in srgb, var(--color-paper) 78%, var(--color-aubergine));
}

.sa-brief__grid {
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
  gap: clamp(32px, 6vw, 96px);
  align-items: start;
}

.sa-brief__facts {
  display: grid;
  gap: 14px;
  margin-top: 36px;
}

.sa-brief__facts li {
  display: flex;
  align-items: baseline;
  gap: 14px;
  padding-top: 14px;
  border-top: 1.5px dashed color-mix(in srgb, var(--color-paper) 28%, transparent);
  color: color-mix(in srgb, var(--color-paper) 78%, var(--color-aubergine));
}

.sa-brief__facts strong {
  min-width: 4.4ch;
  font: 800 1.9rem / 1 var(--font-sa-display);
  letter-spacing: -0.03em;
  color: var(--color-apricot);
}

.sa-brief__card {
  display: grid;
  border-radius: 32px;
  background: var(--color-paper);
  color: var(--color-ink);
  padding: clamp(22px, 3vw, 36px);
  overflow: hidden;
}

.sa-brief__card > * {
  grid-area: 1 / 1;
}

.sa-form {
  display: grid;
  gap: 14px;
  align-content: start;
  transition:
    opacity var(--dur-base) var(--ease-out),
    transform var(--dur-base) var(--ease-out);
}

.sa-field {
  position: relative;
}

.sa-input {
  width: 100%;
  min-height: 58px;
  padding: 24px 16px 8px;
  border: 0;
  border-radius: 16px;
  background: var(--sa-tint);
  box-shadow: inset 0 0 0 1.5px transparent;
  font-size: 1rem;
  line-height: 1.3;
  outline: 2px solid transparent;
  outline-offset: 2px;
  transition:
    box-shadow var(--dur-fast) var(--ease-out),
    outline-color var(--dur-fast) var(--ease-out),
    outline-offset var(--dur-base) var(--ease-out);
}

textarea.sa-input {
  resize: vertical;
  min-height: 96px;
}

select.sa-input {
  appearance: none;
  padding-right: 40px;
  background-image: linear-gradient(45deg, transparent 50%, currentColor 50%), linear-gradient(135deg, currentColor 50%, transparent 50%);
  background-position: calc(100% - 22px) 50%, calc(100% - 17px) 50%;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
}

.sa-input:focus-visible {
  outline-color: var(--color-aubergine);
  outline-offset: 0;
}

.sa-field label {
  position: absolute;
  left: 16px;
  top: 18px;
  color: var(--sa-muted);
  font-size: 1rem;
  line-height: 1;
  pointer-events: none;
  transform-origin: left top;
  transition:
    transform var(--dur-base) var(--ease-out),
    color var(--dur-fast) var(--ease-out);
}

.sa-input:focus ~ label,
.sa-field:not(.sa-field--select) .sa-input:not(:placeholder-shown) ~ label,
.sa-field[data-filled="true"] label {
  transform: translateY(-9px) scale(0.76);
  color: var(--color-aubergine);
}

.sa-field[data-invalid="true"] .sa-input {
  box-shadow: inset 0 0 0 2px var(--color-satsuma);
}

.sa-field__error {
  margin-top: 6px;
  padding-left: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  color: color-mix(in srgb, var(--color-satsuma) 55%, var(--color-ink));
  animation: sa-slide-down var(--dur-base) var(--ease-out) both;
}

.sa-field__count {
  position: absolute;
  right: 14px;
  bottom: 10px;
  font-size: 0.75rem;
  color: var(--sa-muted);
  font-variant-numeric: tabular-nums;
}

.sa-packpick legend {
  margin-bottom: 8px;
  padding: 0;
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--sa-muted);
}

.sa-packpick__row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.sa-packpick__opt {
  position: relative;
  cursor: pointer;
}

.sa-packpick__opt input {
  position: absolute;
  inset: 0;
  opacity: 0;
  margin: 0;
  cursor: pointer;
}

.sa-packpick__face {
  display: grid;
  gap: 2px;
  padding: 12px 14px;
  border-radius: 16px;
  background: var(--sa-tint);
  box-shadow: inset 0 0 0 1.5px transparent;
  transition:
    background-color var(--dur-fast) var(--ease-out),
    box-shadow var(--dur-fast) var(--ease-out),
    transform var(--dur-instant) var(--ease-out);
}

.sa-packpick__name {
  font: 700 1.05rem / 1.1 var(--font-sa-display);
}

.sa-packpick__meta {
  font-size: 0.78rem;
  color: var(--sa-muted);
}

.sa-packpick__opt input:checked + .sa-packpick__face {
  background: var(--color-apricot);
  box-shadow: inset 0 0 0 2px var(--color-aubergine);
}

.sa-packpick__opt input:focus-visible + .sa-packpick__face {
  outline: 2px solid var(--color-aubergine);
  outline-offset: 2px;
}

.sa-packpick__opt:active .sa-packpick__face {
  transform: scale(0.97);
}

.sa-form__submit {
  height: 56px;
  margin-top: 6px;
  font-size: 1.0625rem;
}

.sa-form__submit-label,
.sa-form__submit-busy {
  transition:
    opacity var(--dur-fast) var(--ease-out),
    transform var(--dur-base) var(--ease-out);
}

.sa-form__submit-busy {
  position: absolute;
  display: flex;
  gap: 6px;
  opacity: 0;
  transform: translateY(10px);
}

.sa-form__submit-busy i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
}

.sa-form__submit[data-loading="true"] .sa-form__submit-label {
  opacity: 0;
  transform: translateY(-10px);
}

.sa-form__submit[data-loading="true"] .sa-form__submit-busy {
  opacity: 1;
  transform: none;
}

.sa-form__fine {
  text-align: center;
  font-size: 0.875rem;
  color: var(--sa-muted);
}

.sa-brief__card[data-phase="success"] .sa-form {
  opacity: 0;
  transform: translateY(-16px) scale(0.98);
  pointer-events: none;
}

.sa-done {
  display: grid;
  justify-items: center;
  align-content: center;
  gap: 12px;
  text-align: center;
  padding-block: 12px;
  opacity: 0;
  clip-path: inset(0 0 100% 0);
  visibility: hidden;
  transition:
    clip-path var(--dur-slow) var(--ease-in-out),
    opacity var(--dur-base) var(--ease-out),
    visibility 0s linear var(--dur-slow);
}

.sa-done:focus-visible {
  outline: none;
}

.sa-brief__card[data-phase="success"] .sa-done {
  opacity: 1;
  clip-path: inset(0);
  visibility: visible;
  transition-delay: 120ms, 120ms, 0s;
}

.sa-done__ring {
  width: 150px;
  height: 150px;
}

.sa-done__ref {
  padding: 6px 14px;
  border-radius: 999px;
  background: var(--color-apricot);
  font: 600 0.8125rem/1 var(--font-sa-body);
  letter-spacing: 0.1em;
  color: var(--color-aubergine);
}

.sa-done__title {
  font: 800 clamp(2rem, 4vw, 2.8rem) / 1 var(--font-sa-display);
  letter-spacing: -0.035em;
}

.sa-done__body {
  max-width: 38ch;
  color: var(--sa-muted);
}

.sa-done .sa-btn {
  margin-top: 8px;
}

/* Footer */
.sa-footer {
  background: var(--color-ink);
  color: var(--color-paper);
  padding-block: clamp(56px, 8vw, 100px) 28px;
}

.sa-footer__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 40px;
}

.sa-footer .sa-logo {
  color: var(--color-paper);
}

.sa-footer__tag {
  max-width: 36ch;
  margin-top: 18px;
  color: color-mix(in srgb, var(--color-paper) 72%, var(--color-ink));
}

.sa-footer__mail {
  display: inline-block;
  margin-top: 14px;
  color: var(--color-apricot);
}

.sa-footer__title {
  margin-bottom: 14px;
  font: 500 0.8125rem/1 var(--font-sa-body);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-paper) 62%, var(--color-ink));
}

.sa-footer ul {
  display: grid;
  gap: 10px;
}

.sa-footer a {
  text-decoration: none;
  background: linear-gradient(currentColor, currentColor) left bottom / 0% 1.5px no-repeat;
  transition: background-size var(--dur-base) var(--ease-out);
}

.sa-footer a:hover {
  background-size: 100% 1.5px;
}

.sa-footer__fine {
  margin-top: clamp(40px, 6vw, 80px);
  padding-top: 20px;
  border-top: 1px solid color-mix(in srgb, var(--color-paper) 16%, transparent);
  font-size: 0.875rem;
  color: color-mix(in srgb, var(--color-paper) 62%, var(--color-ink));
}

/* Image placeholder until an asset is generated */
.sa-placeholder {
  display: grid;
  place-items: center;
  background: repeating-linear-gradient(45deg, var(--color-apricot) 0 12px, color-mix(in srgb, var(--color-apricot) 70%, var(--color-paper)) 12px 24px);
  color: var(--color-aubergine);
  font: 500 0.8125rem/1 var(--font-sa-body);
}

/* ─────────────── Phones ─────────────── */
@media (max-width: 820px) {
  .sa-body {
    font-size: 1rem;
  }
  .sa-hero {
    height: auto;
    padding-top: 88px;
    padding-bottom: 36px;
  }
  html[data-sa-motion="live"] .sa-hero {
    position: relative;
  }
  .sa-hero__frame {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
    transform: none;
    opacity: 1;
  }
  .sa-h1,
  .sa-sub,
  .sa-cta,
  .sa-trust {
    position: relative;
    inset: auto;
    left: auto;
    top: auto;
    translate: none;
  }
  .sa-h1 {
    padding-inline: 20px;
    font-size: clamp(38px, 11vw, 56px);
    line-height: 1.04;
  }
  .sa-sub {
    width: auto;
    padding-inline: 24px;
    font-size: 16px;
    line-height: 1.55;
  }
  .sa-sub span {
    display: inline;
  }
  .sa-seal,
  .sa-sprig {
    display: none;
  }
  .sa-wheel {
    --wu: calc(100vw / 640);
    position: relative;
    left: auto;
    margin-left: 0;
    width: 100%;
    height: 250px;
    margin-block: 6px;
  }
  .sa-cta {
    width: 190px;
    height: 74px;
  }
  .sa-cta__magnet {
    translate: -6px -6px;
  }
  .sa-btn--hero {
    width: 172px;
    height: 58px;
    font-size: 17px;
  }
  .sa-trust {
    margin: -6px 0 0;
    padding-inline: 20px;
    font-size: 14px;
    white-space: normal;
    text-align: center;
  }
  .sa-steps,
  .sa-makers__grid,
  .sa-packs__grid {
    grid-template-columns: 1fr;
  }
  .sa-step__link {
    display: none;
  }
  .sa-brief__grid {
    grid-template-columns: 1fr;
  }
  .sa-packpick__row {
    grid-template-columns: 1fr;
  }
  .sa-footer__grid {
    grid-template-columns: 1fr 1fr;
  }
  .sa-footer__brand {
    grid-column: 1 / -1;
  }
}

@media (min-width: 821px) and (max-width: 1040px) {
  .sa-makers__grid,
  .sa-packs__grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .sa-steps {
    grid-template-columns: 1fr;
  }
  .sa-step__link {
    display: none;
  }
}

/* ─────────────── Keyframes ─────────────── */
@keyframes sa-load {
  from {
    opacity: 0;
    transform: translateY(calc(16 * var(--u)));
    filter: blur(8px);
  }
  to {
    opacity: 1;
    transform: none;
    filter: none;
  }
}

@keyframes sa-line {
  from {
    opacity: 0;
    transform: translateY(108%);
    filter: blur(10px);
  }
  to {
    opacity: 1;
    transform: none;
    filter: none;
  }
}

@keyframes sa-pop {
  from {
    opacity: 0;
    transform: scale(0.7);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes sa-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes sa-drop {
  from {
    opacity: 0;
    transform: translateY(-16px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes sa-wheel-rise {
  from {
    opacity: 0;
    transform: translateY(calc(90 * var(--u)));
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes sa-draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes sa-slide-down {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes sa-shake-a {
  20%,
  60% {
    transform: translateX(-6px);
  }
  40%,
  80% {
    transform: translateX(6px);
  }
}

@keyframes sa-shake-b {
  20%,
  60% {
    transform: translateX(-6px);
  }
  40%,
  80% {
    transform: translateX(6px);
  }
}

@keyframes sa-marquee {
  to {
    transform: translateX(-50%);
  }
}

@keyframes sa-ring-pulse {
  50% {
    scale: 1.04;
  }
}

@keyframes sa-busy {
  0%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
}

@keyframes sa-wedge-fill {
  from {
    fill: var(--color-apricot);
    transform: scale(0.82);
  }
  to {
    fill: var(--color-satsuma);
    transform: none;
  }
}

/* Scene loops */
@keyframes sa-bob {
  50% {
    transform: translateY(-12px);
  }
}
@keyframes sa-tilt {
  0%,
  100% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(3deg);
  }
}
@keyframes sa-shadow {
  50% {
    transform: scaleX(0.86);
  }
}
@keyframes sa-splash {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.3);
  }
  35% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-34px) scale(1.5);
  }
}
@keyframes sa-ripple {
  0% {
    opacity: 0.9;
    transform: scale(0.25);
  }
  100% {
    opacity: 0;
    transform: scale(1.1);
  }
}
@keyframes sa-art {
  0%,
  35% {
    transform: scale(0);
  }
  60%,
  90% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes sa-pour {
  0% {
    transform: scaleY(0);
    transform-origin: 50% 0;
  }
  35%,
  60% {
    transform: scaleY(1);
    transform-origin: 50% 0;
  }
  80%,
  100% {
    transform: scaleY(0);
    transform-origin: 50% 100%;
  }
}
@keyframes sa-ring {
  0% {
    opacity: 0.9;
    transform: scale(0.7);
  }
  100% {
    opacity: 0;
    transform: scale(1.7);
  }
}
@keyframes sa-sway {
  0%,
  100% {
    transform: rotate(-4deg);
  }
  50% {
    transform: rotate(4deg);
  }
}
@keyframes sa-spin {
  0%,
  100% {
    transform: scaleX(0.7);
  }
  50% {
    transform: scaleX(1);
  }
}
@keyframes sa-drip {
  0% {
    opacity: 1;
    transform: translateY(-20px) scaleY(1.2);
  }
  55% {
    opacity: 1;
    transform: translateY(190px) scaleY(1);
  }
  60%,
  100% {
    opacity: 0;
    transform: translateY(210px) scale(0.2);
  }
}
@keyframes sa-swirl {
  to {
    transform: rotate(360deg);
  }
}
@keyframes sa-glow {
  50% {
    opacity: 0.55;
    transform: scale(1.08);
  }
}

/* ─────────────── Motion: only with motion allowed ─────────────── */
@media (prefers-reduced-motion: no-preference) {
  /* Hero load choreography: runs from CSS alone, so it plays before hydration and never shifts layout. */
  .sa-load {
    animation: sa-load var(--dur-hero) var(--ease-out-expo) var(--ld, 0ms) both;
  }
  .sa-h1__text.sa-load {
    animation: sa-line 1100ms var(--ease-out-expo) var(--ld, 0ms) both;
  }
  .sa-cta.sa-load {
    animation: sa-pop 800ms var(--ease-spring) var(--ld, 0ms) both;
  }
  .sa-sprig.sa-load,
  .sa-trust.sa-load {
    animation: sa-fade 600ms var(--ease-out) var(--ld, 0ms) both;
  }
  .sa-seal.sa-load {
    animation: sa-pop 900ms var(--ease-spring) var(--ld, 0ms) both;
  }
  .sa-seal__ring {
    animation: sa-turn 30s linear infinite;
  }
  .sa-sprig__leaf {
    animation: sa-unfurl 700ms var(--ease-spring) calc(var(--ld, 0ms) + 650ms + var(--n, 0) * 170ms) backwards;
  }
  .sa-hero[data-ambient="paused"] .sa-seal__ring {
    animation-play-state: paused;
  }
  .sa-draw {
    stroke-dashoffset: 1;
    animation: sa-draw 900ms var(--ease-out) calc(var(--ld, 0ms) + var(--n, 0) * 520ms) forwards;
  }
  /* The logo is the first thing painted and never animates: it is the page's LCP candidate. */
  .sa-nav li,
  .sa-header__login,
  .sa-header__signup,
  .sa-menu-toggle {
    animation: sa-drop 700ms var(--ease-out) calc(150ms + var(--i, 0) * 55ms) backwards;
  }
  .sa-header__login {
    --i: 5;
  }
  .sa-header__signup {
    --i: 6;
  }

  /* The wheel assembles from a flat row into its arc (JS); the row itself rises into place. */
  html[data-sa-motion="live"] .sa-wheel[data-ready="false"] {
    opacity: 0;
  }
  .sa-wheel[data-ready="true"] .sa-wheel__track {
    animation: sa-wheel-rise 1100ms var(--ease-out-expo) 100ms both;
  }

  .sa-cta__magnet {
    transition: translate var(--dur-base) var(--ease-spring);
  }

  .sa-marquee__track {
    animation: sa-marquee 42s linear infinite;
  }
  .sa-marquee[data-playing="false"] .sa-marquee__track,
  .sa-marquee:hover .sa-marquee__track,
  .sa-marquee:focus-within .sa-marquee__track {
    animation-play-state: paused;
  }

  .sa-form[data-shake="0"] .sa-field[data-invalid="true"] {
    animation: sa-shake-a 280ms var(--ease-out);
  }
  .sa-form[data-shake="1"] .sa-field[data-invalid="true"] {
    animation: sa-shake-b 280ms var(--ease-out);
  }
  .sa-form__submit[data-loading="true"] .sa-form__submit-busy i {
    animation: sa-busy 900ms var(--ease-out) infinite;
  }
  .sa-form__submit-busy i:nth-child(2) {
    animation-delay: 120ms;
  }
  .sa-form__submit-busy i:nth-child(3) {
    animation-delay: 240ms;
  }
  .sa-brief__card[data-phase="success"] .sa-done .sa-ring__wedge {
    animation: sa-wedge-fill 520ms var(--ease-spring) calc(260ms + var(--i, 0) * 70ms) both;
  }

  /* Scenes */
  .sa-a {
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-delay: var(--d, 0s);
  }
  .sa-a-bob { animation-name: sa-bob; }
  .sa-a-tilt { animation-name: sa-tilt; animation-duration: 4s; }
  .sa-a-shadow { animation-name: sa-shadow; animation-duration: 4s; }
  .sa-a-splash { animation-name: sa-splash; animation-duration: 2.8s; animation-timing-function: ease-out; }
  .sa-a-ripple { animation-name: sa-ripple; animation-duration: 2.4s; animation-timing-function: ease-out; }
  .sa-a-art { animation-name: sa-art; }
  .sa-a-pour { animation-name: sa-pour; }
  .sa-a-ring { animation-name: sa-ring; animation-duration: 2.7s; animation-timing-function: ease-out; }
  .sa-a-sway { animation-name: sa-sway; animation-duration: 3.6s; }
  .sa-a-spin { animation-name: sa-spin; animation-duration: 2s; }
  .sa-a-drop { animation-name: sa-drip; animation-duration: 3s; animation-timing-function: ease-in; }
  .sa-a-swirl { animation-name: sa-swirl; animation-duration: 12s; animation-timing-function: linear; }
  .sa-a-glow { animation-name: sa-glow; animation-duration: 4s; }

  /* Reveals: hidden only while motion is live, so no-JS and reduced-motion visitors get the finished page. */
  html[data-sa-motion="live"] [data-reveal] {
    --rv: var(--dur-slow) var(--ease-out);
  }

  html[data-sa-motion="live"] [data-reveal="mask"] .sa-mask > span {
    display: block;
    transition: transform 1000ms var(--ease-out-expo);
  }
  html[data-sa-motion="live"] [data-reveal="mask"] .sa-mask:nth-child(2) > span {
    transition-delay: 110ms;
  }
  html[data-sa-motion="live"] [data-reveal="mask"]:not([data-in="true"]) .sa-mask > span {
    transform: translateY(112%);
  }

  html[data-sa-motion="live"] [data-reveal="rise"] {
    transition:
      opacity var(--dur-slow) var(--ease-out),
      transform var(--dur-slow) var(--ease-out);
  }
  html[data-sa-motion="live"] [data-reveal="rise"]:not([data-in="true"]) {
    opacity: 0;
    transform: translateY(var(--reveal-shift));
  }

  html[data-sa-motion="live"] [data-reveal="scale"] {
    transition:
      opacity var(--dur-slow) var(--ease-out),
      transform var(--dur-slow) var(--ease-out-expo);
  }
  html[data-sa-motion="live"] [data-reveal="scale"]:not([data-in="true"]) {
    opacity: 0;
    transform: translateY(24px) scale(0.95);
  }

  html[data-sa-motion="live"] [data-reveal="cascade"] > * {
    transition:
      opacity var(--dur-slow) var(--ease-out),
      transform var(--dur-slow) var(--ease-out);
    transition-delay: calc(var(--i, 0) * var(--stagger));
  }
  html[data-sa-motion="live"] [data-reveal="cascade"]:not([data-in="true"]) > * {
    opacity: 0;
    transform: translateY(34px) scale(0.96);
  }

  html[data-sa-motion="live"] [data-reveal="draw"] .sa-eyebrow__rule,
  html[data-sa-motion="live"] .sa-eyebrow[data-reveal="draw"] .sa-eyebrow__rule {
    transition: transform var(--dur-slow) var(--ease-out-expo);
  }
  html[data-sa-motion="live"] [data-reveal="draw"]:not([data-in="true"]) .sa-eyebrow__rule {
    transform: scaleX(0);
  }

  /* Image wipes key off the revealed ancestor: an element clipped to nothing is never "in view" to an observer. */
  html[data-sa-motion="live"] .sa-maker__media {
    transition: clip-path 1000ms var(--ease-in-out) calc(160ms + var(--i, 0) * var(--stagger));
  }
  html[data-sa-motion="live"] [data-reveal]:not([data-in="true"]) .sa-maker__media {
    clip-path: inset(0 0 100% 0);
  }
  html[data-sa-motion="live"] [data-reveal]:not([data-in="true"]) .sa-maker__media > svg {
    scale: 1.14;
  }

  /* Scroll-drawn connectors and segment cascades. Descendant selectors, so they follow any revealed ancestor. */
  html[data-sa-motion="live"] .sa-draw--scroll {
    animation: none;
    stroke-dashoffset: 0;
    transition: stroke-dashoffset 1100ms var(--ease-out) 500ms;
  }
  html[data-sa-motion="live"] [data-reveal]:not([data-in="true"]) .sa-draw--scroll {
    stroke-dashoffset: 1;
  }
  html[data-sa-motion="live"] .sa-ring__wedge {
    transition:
      transform var(--dur-base) var(--ease-spring),
      opacity var(--dur-base) var(--ease-out);
    transition-delay: calc(300ms + var(--i, 0) * 38ms);
  }
  html[data-sa-motion="live"] [data-reveal]:not([data-in="true"]) .sa-ring__wedge {
    transform: scale(0.35);
    opacity: 0;
  }
  html[data-sa-motion="live"] .sa-done .sa-ring__wedge {
    transition: none;
  }
}

@keyframes sa-turn {
  to {
    transform: rotate(360deg);
  }
}

@keyframes sa-unfurl {
  from {
    opacity: 0;
    transform: scale(0.2) rotate(-12deg);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/brand/Logo.tsx">
<![CDATA[type MarkProps = { className?: string; title?: string };

/** A satsuma seen from the top: six segments under the peel, one leaf. The fruit takes --sa-fruit, the rest takes currentColor. */
export function Mark({ className, title }: MarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <circle cx="24" cy="27" r="18" className="sa-mark__fruit" />
      <path
        d="M24 27V12M24 27l13-7.5M24 27l13 7.5M24 27v15M24 27l-13 7.5M24 27l-13-7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity=".55"
      />
      <path d="M24 10.5c-.4-5.6 3.6-8.6 9.6-8-.4 5.8-4 8.8-9.6 8z" className="sa-mark__leaf" />
      <circle cx="24" cy="27" r="3.4" fill="currentColor" />
    </svg>
  );
}

type LogoProps = { className?: string };

/** Lockup: the mark and the Bricolage wordmark, its full stop in the accent. */
export function Logo({ className }: LogoProps) {
  return (
    <span className={`sa-logo ${className ?? ""}`}>
      <Mark className="sa-logo__mark" />
      <span className="sa-logo__word">
        satsuma<span className="sa-logo__dot">.</span>
      </span>
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/content/makers.ts">
<![CDATA[import type { SceneId } from "./reels";

export type Maker = {
  id: string;
  name: string;
  craft: string;
  city: string;
  scene: SceneId;
  /** Per reel, in dollars. */
  rate: number;
  turnaroundDays: number;
  reelsShipped: number;
  rating: number;
  line: string;
};

export const MAKERS: readonly Maker[] = [
  { id: "imani", name: "Imani Okafor", craft: "Sneakers & streetwear", city: "Lagos", scene: "sneaker", rate: 90, turnaroundDays: 3, reelsShipped: 412, rating: 4.9, line: "Hard light, fast cuts, a heel you can hear." },
  { id: "tove", name: "Tove Lindqvist", craft: "Skincare & serums", city: "Malmö", scene: "skincare", rate: 85, turnaroundDays: 4, reelsShipped: 288, rating: 4.9, line: "Glass, water and one slow macro drop." },
  { id: "mateo", name: "Mateo Ruiz", craft: "Coffee & cafés", city: "Valencia", scene: "latte-pour", rate: 70, turnaroundDays: 3, reelsShipped: 536, rating: 4.8, line: "Steam, pour, swirl: three seconds that sell a menu." },
  { id: "hana", name: "Hana Sato", craft: "Ceramics & pottery", city: "Kyoto", scene: "pottery", rate: 75, turnaroundDays: 5, reelsShipped: 197, rating: 5.0, line: "The wheel does the talking. She just frames it." },
  { id: "priya", name: "Priya Nair", craft: "Florals & plant shops", city: "Pune", scene: "bouquet", rate: 65, turnaroundDays: 3, reelsShipped: 341, rating: 4.8, line: "Wrapped by hand, filmed in window light." },
  { id: "jonas", name: "Jonas Weber", craft: "Audio gear", city: "Leipzig", scene: "headphones", rate: 95, turnaroundDays: 4, reelsShipped: 254, rating: 4.9, line: "Product films that actually sound like something." },
];

export function makerById(id: string): Maker | undefined {
  return MAKERS.find((m) => m.id === id);
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/content/packs.ts">
<![CDATA[export type Pack = {
  id: string;
  name: string;
  /** Wedges in the pack's satsuma: one per reel. */
  segments: number;
  price: number;
  turnaround: string;
  popular?: boolean;
  perks: readonly string[];
};

export const PACKS: readonly Pack[] = [
  { id: "quarter", name: "Quarter", segments: 6, price: 480, turnaround: "5 days", perks: ["One maker, one product", "Captions and a 9:16 cut", "Two rounds of notes"] },
  { id: "half", name: "Half", segments: 12, price: 840, turnaround: "7 days", popular: true, perks: ["Up to two makers", "Hooks A/B tested in the edit", "Raw footage included", "Unlimited rounds of notes"] },
  { id: "whole", name: "Whole", segments: 24, price: 1440, turnaround: "12 days", perks: ["A crew of three makers", "Monthly refresh of every hook", "Raw footage and licensed music", "A named producer"] },
];

export function perReel(pack: Pack): number {
  return pack.price / pack.segments;
}

export function packById(id: string): Pack | undefined {
  return PACKS.find((p) => p.id === id);
}

export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/content/reels.ts">
<![CDATA[/** The ten tiles of the shared 5×2 clip sheet, row-major. Each card plays one; each also has a drawn scene. */
export const SCENE_IDS = [
  "sneaker",
  "skincare",
  "latte-pour",
  "headphones",
  "plant-shop",
  "bouquet",
  "pottery",
  "serum",
  "latte-top",
  "headphone-stand",
] as const;

export type SceneId = (typeof SCENE_IDS)[number];

export type Reel = { scene: SceneId; title: string; maker: string };

export const REELS: readonly Reel[] = [
  { scene: "sneaker", title: "Sneaker drop, heel to toe", maker: "Imani Okafor" },
  { scene: "skincare", title: "Skincare splash", maker: "Tove Lindqvist" },
  { scene: "latte-pour", title: "Latte pour", maker: "Mateo Ruiz" },
  { scene: "headphones", title: "Headphones, pulse test", maker: "Jonas Weber" },
  { scene: "plant-shop", title: "Plant shop morning", maker: "Priya Nair" },
  { scene: "bouquet", title: "Florist bouquet wrap", maker: "Priya Nair" },
  { scene: "pottery", title: "Pottery wheel", maker: "Hana Sato" },
  { scene: "serum", title: "Serum drop", maker: "Tove Lindqvist" },
  { scene: "latte-top", title: "Latte, top-down", maker: "Mateo Ruiz" },
  { scene: "headphone-stand", title: "Headphones on a stand", maker: "Jonas Weber" },
];
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/content/segments.ts">
<![CDATA[/** Wedge geometry for the satsuma segment motif. Pure; angles start at twelve and run clockwise. */

export type Wedge = { path: string; angle: number };

function pt(cx: number, cy: number, r: number, turn: number): string {
  const a = turn * Math.PI * 2 - Math.PI / 2;
  return `${round(cx + r * Math.cos(a))} ${round(cy + r * Math.sin(a))}`;
}

function round(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * `count` wedges around (cx, cy) between radii `inner` and `outer`, each separated by `gap` of a turn.
 * One wedge per reel in a pack.
 */
export function segmentWedges(count: number, cx: number, cy: number, inner: number, outer: number, gap = 0.012): Wedge[] {
  const wedges: Wedge[] = [];
  for (let i = 0; i < count; i++) {
    const a0 = i / count + gap / 2;
    const a1 = (i + 1) / count - gap / 2;
    const large = a1 - a0 > 0.5 ? 1 : 0;
    const path = [
      `M${pt(cx, cy, outer, a0)}`,
      `A${outer} ${outer} 0 ${large} 1 ${pt(cx, cy, outer, a1)}`,
      `L${pt(cx, cy, inner, a1)}`,
      `A${inner} ${inner} 0 ${large} 0 ${pt(cx, cy, inner, a0)}`,
      "Z",
    ].join("");
    wedges.push({ path, angle: ((a0 + a1) / 2) * 360 });
  }
  return wedges;
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/content/steps.ts">
<![CDATA[export type Step = { n: string; title: string; body: string; figure: number; unit: string; figureLabel: string };

export const STEPS: readonly Step[] = [
  { n: "01", title: "Send a brief", body: "Tell us the product, the feeling and the platform. A sentence is enough; a moodboard is a bonus.", figure: 60, unit: "sec", figureLabel: "to brief" },
  { n: "02", title: "Meet your maker", body: "We match you with a handpicked maker whose last ten reels look like what you described, then you say yes or ask for another.", figure: 24, unit: "h", figureLabel: "to a match" },
  { n: "03", title: "Peel off your reels", body: "Your maker shoots, cuts and captions. You get finished vertical clips, ready to post, with the raw footage on request.", figure: 5, unit: "days", figureLabel: "to first reels" },
];

export const CATEGORIES: readonly string[] = [
  "Sneakers",
  "Skincare",
  "Coffee",
  "Houseplants",
  "Headphones",
  "Florals",
  "Ceramics",
  "Serums",
  "Candles",
  "Cookware",
];
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/forms/brief.ts">
<![CDATA[import { packById } from "../content/packs";
import { CATEGORIES } from "../content/steps";

export type BriefInput = {
  brand: string;
  email: string;
  category: string;
  pack: string;
  note: string;
};

export type BriefField = keyof BriefInput;
export type BriefErrors = Partial<Record<BriefField, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const NOTE_MAX = 280;

/** Client-side rules. Nothing leaves the browser: this is a template. */
export function validateBrief(input: BriefInput): BriefErrors {
  const errors: BriefErrors = {};
  if (input.brand.trim().length < 2) errors.brand = "Add your brand name.";
  if (!EMAIL.test(input.email.trim())) errors.email = "Add an email so your maker can reply.";
  if (!CATEGORIES.includes(input.category)) errors.category = "Pick what you sell.";
  if (!packById(input.pack)) errors.pack = "Choose a pack.";
  if (input.note.length > NOTE_MAX) errors.note = `Keep the note to ${NOTE_MAX} characters.`;
  return errors;
}

export function isValid(errors: BriefErrors): boolean {
  return Object.keys(errors).length === 0;
}

function hash(text: string): number {
  let h = 5381;
  for (let i = 0; i < text.length; i++) h = (Math.imul(h, 33) ^ text.charCodeAt(i)) >>> 0;
  return h;
}

/** A stable, friendly reference for the confirmation card, derived from the brief so a re-send matches. */
export function briefReference(input: BriefInput): string {
  const code = hash(`${input.brand.trim().toLowerCase()}|${input.email.trim().toLowerCase()}|${input.pack}`)
    .toString(36)
    .toUpperCase()
    .padStart(4, "0")
    .slice(-4);
  return `SA-${input.pack.slice(0, 1).toUpperCase()}${code}`;
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/forms/BriefForm.tsx">
<![CDATA["use client";

import { useEffect, useId, useRef, useState } from "react";
import { formatUsd, packById, PACKS } from "../content/packs";
import { CATEGORIES } from "../content/steps";
import { SegmentRing } from "../sections/SegmentRing";
import { briefReference, isValid, NOTE_MAX, validateBrief, type BriefErrors, type BriefField, type BriefInput } from "./brief";

const ORDER: BriefField[] = ["brand", "email", "category", "pack", "note"];
const INITIAL: BriefInput = { brand: "", email: "", category: "", pack: "half", note: "" };

type Phase = "idle" | "loading" | "success";

/**
 * "Make a Reel": validates on the client, morphs the button to a loading state, then swaps the form for a
 * confirmation whose satsuma fills wedge by wedge. Nothing is sent anywhere. Pack buttons and "Brief {maker}"
 * links elsewhere on the page pre-fill it through data-pack / data-maker.
 */
export function BriefForm() {
  const uid = useId();
  const [values, setValues] = useState<BriefInput>(INITIAL);
  const [errors, setErrors] = useState<BriefErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [shake, setShake] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const set = (field: BriefField, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (submitted) setErrors(validateBrief(next));
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-pack], [data-maker]");
      if (!el) return;
      setPhase((p) => (p === "success" ? "idle" : p));
      setValues((v) => {
        const next = { ...v };
        if (el.dataset.pack && packById(el.dataset.pack)) next.pack = el.dataset.pack;
        if (el.dataset.maker && !v.note.trim()) next.note = `I'd love ${el.dataset.maker} for this one.`;
        return next;
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (phase === "success") doneRef.current?.focus();
  }, [phase]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phase === "loading") return;
    setSubmitted(true);
    const errs = validateBrief(values);
    setErrors(errs);
    if (!isValid(errs)) {
      setShake((n) => n + 1);
      const first = ORDER.find((f) => errs[f]);
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setPhase("loading");
    const live = document.documentElement.dataset.saMotion === "live";
    window.setTimeout(() => setPhase("success"), live ? 1200 : 200);
  };

  const reset = () => {
    setValues(INITIAL);
    setErrors({});
    setSubmitted(false);
    setPhase("idle");
  };

  const pack = packById(values.pack);
  const err = (f: BriefField) => (errors[f] ? `${uid}-${f}-err` : undefined);

  return (
    <div className="sa-brief__card" data-phase={phase}>
      <form ref={formRef} className="sa-form" noValidate onSubmit={onSubmit} data-shake={shake % 2} aria-hidden={phase === "success"} inert={phase === "success"}>
        <div className="sa-field" data-invalid={!!errors.brand} data-filled={values.brand ? "true" : "false"}>
          <input id={`${uid}-brand`} name="brand" className="sa-input" placeholder=" " autoComplete="organization" value={values.brand} aria-invalid={!!errors.brand} aria-describedby={err("brand")} onChange={(e) => set("brand", e.target.value)} />
          <label htmlFor={`${uid}-brand`}>Brand name</label>
          {errors.brand && (
            <p id={err("brand")} className="sa-field__error" role="alert">
              {errors.brand}
            </p>
          )}
        </div>

        <div className="sa-field" data-invalid={!!errors.email} data-filled={values.email ? "true" : "false"}>
          <input id={`${uid}-email`} name="email" type="email" className="sa-input" placeholder=" " autoComplete="email" value={values.email} aria-invalid={!!errors.email} aria-describedby={err("email")} onChange={(e) => set("email", e.target.value)} />
          <label htmlFor={`${uid}-email`}>Work email</label>
          {errors.email && (
            <p id={err("email")} className="sa-field__error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="sa-field sa-field--select" data-invalid={!!errors.category} data-filled={values.category ? "true" : "false"}>
          <select id={`${uid}-category`} name="category" className="sa-input" value={values.category} aria-invalid={!!errors.category} aria-describedby={err("category")} onChange={(e) => set("category", e.target.value)}>
            <option value="" disabled />
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <label htmlFor={`${uid}-category`}>What do you sell?</label>
          {errors.category && (
            <p id={err("category")} className="sa-field__error" role="alert">
              {errors.category}
            </p>
          )}
        </div>

        <fieldset className="sa-packpick" aria-describedby={err("pack")}>
          <legend>Pack</legend>
          <div className="sa-packpick__row">
            {PACKS.map((p) => (
              <label key={p.id} className="sa-packpick__opt">
                <input type="radio" name="pack" value={p.id} checked={values.pack === p.id} onChange={() => set("pack", p.id)} />
                <span className="sa-packpick__face">
                  <span className="sa-packpick__name">{p.name}</span>
                  <span className="sa-packpick__meta">
                    {p.segments} reels · {formatUsd(p.price)}
                  </span>
                </span>
              </label>
            ))}
          </div>
          {errors.pack && (
            <p id={err("pack")} className="sa-field__error" role="alert">
              {errors.pack}
            </p>
          )}
        </fieldset>

        <div className="sa-field sa-field--area" data-invalid={!!errors.note} data-filled={values.note ? "true" : "false"}>
          <textarea id={`${uid}-note`} name="note" className="sa-input" placeholder=" " rows={3} value={values.note} aria-invalid={!!errors.note} aria-describedby={err("note")} onChange={(e) => set("note", e.target.value)} />
          <label htmlFor={`${uid}-note`}>Anything we should know? (optional)</label>
          <span className="sa-field__count" aria-hidden="true">
            {values.note.length}/{NOTE_MAX}
          </span>
          {errors.note && (
            <p id={err("note")} className="sa-field__error" role="alert">
              {errors.note}
            </p>
          )}
        </div>

        <button type="submit" className="sa-btn sa-btn--sat sa-form__submit" data-loading={phase === "loading"} disabled={phase === "loading"}>
          <span className="sa-form__submit-label">Make a Reel</span>
          <span className="sa-form__submit-busy" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="sa-sr" aria-live="polite">
            {phase === "loading" ? "Sending your brief" : ""}
          </span>
        </button>
        <p className="sa-form__fine">Free to brief. You only pay when you pick a maker.</p>
      </form>

      <div ref={doneRef} className="sa-done" tabIndex={-1} aria-hidden={phase !== "success"} inert={phase !== "success"}>
        <SegmentRing count={pack?.segments ?? 12} className="sa-done__ring" />
        <p className="sa-done__ref">{briefReference(values)}</p>
        <h3 className="sa-done__title">Brief received.</h3>
        <p className="sa-done__body">
          {values.brand.trim() || "Your brand"}, your {pack?.name ?? "Half"} pack ({pack?.segments ?? 12} reels) is in the queue. A maker will be in touch at {values.email.trim() || "your email"} within a day.
        </p>
        <button type="button" className="sa-btn sa-btn--paper" onClick={reset}>
          Send another brief
        </button>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/motion/CountUp.tsx">
<![CDATA["use client";

import { useEffect, useRef } from "react";
import { progress } from "./math";

const DURATION = 1400;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

/** Counts from 0 to `value` once in view. The final value always sits in a visually hidden span for readers. */
export function CountUp({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || document.documentElement.dataset.saMotion !== "live") return;
    let raf = 0;
    el.textContent = `0${suffix}`;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = easeOut(progress(now - start, 0, DURATION));
          el.textContent = `${Math.round(value * t)}${suffix}`;
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, suffix]);

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true" className="sa-tabular">
        {value}
        {suffix}
      </span>
      <span className="sa-sr">
        {value}
        {suffix}
      </span>
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/motion/Magnetic.tsx">
<![CDATA["use client";

import { useEffect, useRef } from "react";
import { clamp, lerp } from "./math";
import { canHoverFinely } from "./useReducedMotion";

const PULL = 14;

/** Pulls its child toward the pointer (≤ 14px) and springs back on leave. Fine pointers, motion allowed only. */
export function Magnetic({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canHoverFinely() || document.documentElement.dataset.saMotion !== "live") return;
    let raf = 0;
    let tx = 0, ty = 0, x = 0, y = 0;

    const tick = () => {
      x = lerp(x, tx, 0.18);
      y = lerp(y, ty, 0.18);
      el.style.setProperty("--mx", `${x.toFixed(2)}px`);
      el.style.setProperty("--my", `${y.toFixed(2)}px`);
      raf = Math.abs(x - tx) + Math.abs(y - ty) > 0.05 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = clamp((e.clientX - (r.left + r.width / 2)) * 0.3, -PULL, PULL);
      ty = clamp((e.clientY - (r.top + r.height / 2)) * 0.3, -PULL, PULL);
      kick();
    };
    const leave = () => {
      tx = 0;
      ty = 0;
      kick();
    };
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <span ref={ref} className={`sa-magnetic ${className ?? ""}`}>
      {children}
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/motion/Marquee.tsx">
<![CDATA["use client";

import { useInView } from "./useInView";

/** A gliding band: the track is duplicated and translated by CSS. Pauses off-screen, on hover and on focus. */
export function Marquee({ items, className, label }: { items: string[]; className?: string; label: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: "100px" });
  const run = (
    <span className="sa-marquee__run">
      {items.map((item) => (
        <span key={item} className="sa-marquee__item">
          {item}
          <span className="sa-marquee__sep" aria-hidden="true">
            ·
          </span>
        </span>
      ))}
    </span>
  );
  return (
    <div ref={ref} className={`sa-marquee ${className ?? ""}`} data-playing={inView} role="group" aria-label={label} tabIndex={0}>
      <div className="sa-marquee__track">
        {run}
        <span aria-hidden="true">{run}</span>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/motion/math.ts">
<![CDATA[/** Pure motion maths shared by the primitives. No DOM, no React. */

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

/** Where `value` sits between `start` and `end`, as 0–1. A zero-width window counts as done. */
export function progress(value: number, start: number, end: number): number {
  if (end <= start) return value >= end ? 1 : 0;
  return clamp((value - start) / (end - start), 0, 1);
}

/** Per-item delay for a cascade, capped so a long list never keeps the last item waiting. */
export function staggerDelay(index: number, step: number, cap: number): number {
  return Math.min(index * step, cap);
}

/** Pointer position inside a card (0–1 on each axis) → tilt in degrees. Top edge tips toward the viewer. */
export function tiltAngles(x: number, y: number, max: number): { rx: number; ry: number } {
  const ry = (clamp(x, 0, 1) - 0.5) * 2 * max;
  const rx = (0.5 - clamp(y, 0, 1)) * 2 * max;
  return { rx: rx + 0, ry: ry + 0 }; // + 0 turns -0 into 0
}

/** Wrap into [0, period), for looping layers. */
export function wrap(value: number, period: number): number {
  return ((value % period) + period) % period;
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/motion/mode.ts">
<![CDATA[/**
 * Runs inline before first paint. "live" means JS is running and the visitor allows motion; every hidden
 * pre-reveal state and the pinned window hang off html[data-sa-motion="live"], so no-JS and reduced-motion
 * visitors always get the finished, static page.
 */
export const MOTION_SCRIPT = `(function(){try{var d=document.documentElement;var q=matchMedia("(prefers-reduced-motion: reduce)");var set=function(){d.dataset.saMotion=q.matches?"static":"live"};set();q.addEventListener("change",set)}catch(e){}})();`;
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/motion/Reveals.tsx">
<![CDATA["use client";

import { useEffect } from "react";

/**
 * One shared IntersectionObserver for the whole page. Server components only mark elements with
 * data-reveal="mask|blind|rise|cascade|draw"; this flips data-in="true" once each one enters, and CSS does
 * the rest. Hidden pre-reveal states exist only under html[data-sa-motion="live"], so nothing here is
 * needed for the page to be readable. It also pauses ambient loops that leave the screen.
 */
export function Reveals() {
  useEffect(() => {
    if (document.documentElement.dataset.saMotion !== "live") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.in = "true";
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );
    const watch = (root: ParentNode) =>
      root.querySelectorAll<HTMLElement>("[data-reveal]:not([data-in='true'])").forEach((el) => io.observe(el));
    watch(document);
    // Ambient loops (the hero window's glide) pause whenever they're off-screen.
    const ambient = new IntersectionObserver((entries) => {
      for (const entry of entries) (entry.target as HTMLElement).dataset.ambient = entry.isIntersecting ? "playing" : "paused";
    });
    document.querySelectorAll("[data-ambient]").forEach((el) => ambient.observe(el));
    // Elements that mount later (the reservation success panel, a new departures month) join in too.
    // Only added elements are scanned: the clock's text updates on every frame and must stay cheap.
    const mo = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.matches("[data-reveal]:not([data-in='true'])")) io.observe(node);
          watch(node);
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
      ambient.disconnect();
    };
  }, []);

  return null;
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/motion/ScrollVars.tsx">
<![CDATA["use client";

import { useEffect } from "react";
import { progress } from "./math";

/**
 * One rAF-throttled scroll listener. It writes --sa-out (0–1: how far the hero has been covered) on the hero,
 * which scales and dims the frame as the next band slides over it. No React state, and nothing under reduced motion.
 */
export function ScrollVars() {
  useEffect(() => {
    if (document.documentElement.dataset.saMotion !== "live") return;
    const hero = document.getElementById("top");
    if (!hero) return;
    let raf = 0;
    const frame = () => {
      raf = 0;
      hero.style.setProperty("--sa-out", progress(window.scrollY, 0, hero.offsetHeight * 0.9).toFixed(4));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    frame();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return null;
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/motion/SmoothScroll.tsx">
<![CDATA["use client";

import { useEffect } from "react";
import { canHoverFinely } from "./useReducedMotion";

type LenisLike = { scrollTo: (target: number | string | HTMLElement, opts?: Record<string, unknown>) => void; destroy: () => void };

declare global {
  interface Window {
    __saLenis?: LenisLike;
  }
}

const HEADER_OFFSET = -72;
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Lenis on desktop fine pointers with motion allowed; native scroll everywhere else. In-page anchors glide. */
export function SmoothScroll() {
  useEffect(() => {
    if (document.documentElement.dataset.saMotion !== "live" || !canHoverFinely()) return;
    let lenis: (LenisLike & { raf: (t: number) => void }) | null = null;
    let raf = 0;
    let cancelled = false;

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || !lenis || e.defaultPrevented) return;
      const id = a.getAttribute("href")!.slice(1);
      const target = id ? document.getElementById(id) : document.body;
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: id === "top" ? 0 : HEADER_OFFSET, duration: 1.4, easing: easeOutExpo });
      history.replaceState(null, "", `#${id}`);
    };

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true }) as unknown as LenisLike & { raf: (t: number) => void };
      window.__saLenis = lenis;
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      document.addEventListener("click", onClick);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis?.destroy();
      delete window.__saLenis;
    };
  }, []);

  return null;
}

/** Scroll to a document offset, through Lenis when it's running. */
export function scrollToY(y: number, smooth: boolean) {
  const lenis = window.__saLenis;
  if (lenis) lenis.scrollTo(y, smooth ? { duration: 1.2, easing: easeOutExpo } : { immediate: true });
  else window.scrollTo({ top: y, behavior: smooth && document.documentElement.dataset.saMotion === "live" ? "smooth" : "instant" });
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/motion/TiltCard.tsx">
<![CDATA["use client";

import { useEffect, useRef } from "react";
import { tiltAngles } from "./math";
import { canHoverFinely } from "./useReducedMotion";

const MAX_TILT = 6;

/** Tilts toward the pointer and carries a lamplight spotlight (--sx/--sy). CSS handles lift and release. */
export function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !canHoverFinely() || document.documentElement.dataset.saMotion !== "live") return;
    let raf = 0;
    let px = 0.5, py = 0.5;

    const write = () => {
      raf = 0;
      const { rx, ry } = tiltAngles(px, py, MAX_TILT);
      el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      el.style.setProperty("--sx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--sy", `${(py * 100).toFixed(1)}%`);
    };
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width;
      py = (e.clientY - r.top) / r.height;
      if (!raf) raf = requestAnimationFrame(write);
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
    };
    el.addEventListener("pointermove", move, { passive: true });
    el.addEventListener("pointerleave", leave, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} className={`sa-tilt ${className ?? ""}`}>
      {children}
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/motion/useInView.ts">
<![CDATA["use client";

import { useEffect, useRef, useState } from "react";

type Options = { once?: boolean; rootMargin?: string; threshold?: number };

/** Tracks whether an element is on screen. With `once`, it latches true after the first sighting. */
export function useInView<T extends Element>({ once = false, rootMargin = "0px", threshold = 0 }: Options = {}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && once) io.disconnect();
      },
      { rootMargin, threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once, rootMargin, threshold]);

  return { ref, inView };
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/motion/useReducedMotion.ts">
<![CDATA["use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** True when the visitor prefers reduced motion. On the server (and before hydration) it errs on the safe side. */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => true,
  );
}

/** Fine pointer with hover: the only place magnetic, tilt and spotlight effects run. */
export function canHoverFinely(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/sections/Brief.tsx">
<![CDATA[import { BriefForm } from "../forms/BriefForm";
import { Eyebrow } from "./Eyebrow";

export function Brief() {
  return (
    <section id="brief" className="sa-brief" aria-labelledby="sa-brief-h">
      <div className="sa-wrap sa-brief__grid">
        <div className="sa-brief__copy">
          <Eyebrow n="04">Make a Reel</Eyebrow>
          <h2 id="sa-brief-h" className="sa-h2" data-reveal="mask">
            <span className="sa-mask">
              <span>Tell us what</span>
            </span>
            <span className="sa-mask">
              <span>
                to <em>peel.</em>
              </span>
            </span>
          </h2>
          <p className="sa-lede" data-reveal="rise">
            Five fields, about a minute. We match you with a maker inside a day, and you only pay once you say yes to their treatment.
          </p>
          <ul className="sa-brief__facts" data-reveal="cascade">
            <li style={{ "--i": 0 } as React.CSSProperties}>
              <strong>24 h</strong> to a maker match
            </li>
            <li style={{ "--i": 1 } as React.CSSProperties}>
              <strong>9:16</strong> vertical, captioned
            </li>
            <li style={{ "--i": 2 } as React.CSSProperties}>
              <strong>$0</strong> to send a brief
            </li>
          </ul>
        </div>
        <div data-reveal="scale">
          <BriefForm />
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/sections/Categories.tsx">
<![CDATA[import { CATEGORIES } from "../content/steps";
import { Marquee } from "../motion/Marquee";

/** The band that slides over the hero: what makers shoot, drifting against the scroll. */
export function Categories() {
  return (
    <section className="sa-band" aria-label="What our makers shoot">
      <Marquee items={[...CATEGORIES]} label="Products our makers shoot" className="sa-marquee--band" />
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/sections/Decor.tsx">
<![CDATA[import { Mark } from "../brand/Logo";

/**
 * The marks around the hero, placed in the 1440×1080 frame's own units. They come from the brand's fruit,
 * not from handwriting: a seal that turns slowly, a leaf sprig that grows out of a wedge, and a plain
 * trust line under the button. All of it is decorative except the trust line.
 */

const delay = (ms: number) => ({ "--ld": `${ms}ms` }) as React.CSSProperties;

/** A round "handpicked" seal: text on a circle turning around a satsuma. */
export function Seal() {
  return (
    <div className="sa-seal sa-load" style={delay(1500)} aria-hidden="true">
      <svg viewBox="0 0 160 160" focusable="false">
        <circle cx="80" cy="80" r="78" className="sa-seal__disc" />
        <g className="sa-seal__ring">
          <path id="sa-seal-path" d="M80 80m-57 0a57 57 0 1 1 114 0a57 57 0 1 1-114 0" fill="none" />
          <text className="sa-seal__text">
            <textPath href="#sa-seal-path" textLength="355" lengthAdjust="spacing">
              HANDPICKED MAKERS · PEELED BY HAND ·
            </textPath>
          </text>
        </g>
      </svg>
      <Mark className="sa-seal__mark" />
    </div>
  );
}

/** A sprig that grows out of a satsuma wedge: the stem draws, then the leaves unfurl. */
export function Sprig() {
  return (
    <svg className="sa-sprig sa-load" style={delay(1400)} viewBox="0 0 120 130" aria-hidden="true" focusable="false">
      <path pathLength={1} className="sa-draw sa-sprig__stem" d="M44 108C48 82 58 52 76 14" />
      <path className="sa-sprig__leaf" style={{ "--n": 0 } as React.CSSProperties} d="M47 92C24 90 12 70 14 56 36 56 50 70 47 92Z" />
      <path className="sa-sprig__leaf" style={{ "--n": 1 } as React.CSSProperties} d="M58 66C80 68 98 52 102 36 78 32 58 46 58 66Z" />
      <path className="sa-sprig__leaf" style={{ "--n": 2 } as React.CSSProperties} d="M76 14C66 28 70 42 84 48 92 32 88 18 76 14Z" />
      <path d="M8 112a36 36 0 0 1 72 0z" className="sa-sprig__wedge" />
      <path d="M44 112V90M44 112l-15-17M44 112l15-17" className="sa-sprig__veins" />
    </svg>
  );
}

/** One quiet line under the button, replacing a hand-written note. */
export function TrustLine() {
  return (
    <p className="sa-trust sa-load" style={delay(1600)}>
      <span className="sa-trust__dot" aria-hidden="true" />
      Free to brief · a maker replies within 24 h
    </p>
  );
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/sections/Eyebrow.tsx">
<![CDATA[/** A small label with a drawn rule: "01 — How it works". */
export function Eyebrow({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="sa-eyebrow" data-reveal="draw">
      <span className="sa-eyebrow__rule" aria-hidden="true" />
      <span className="sa-eyebrow__n">{n}</span>
      {children}
    </p>
  );
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/sections/Footer.tsx">
<![CDATA[import { Logo } from "../brand/Logo";

const COLUMNS = [
  {
    title: "Brands",
    links: [
      ["Makers", "#makers"],
      ["Packs", "#packs"],
      ["Send a brief", "#brief"],
    ],
  },
  {
    title: "Makers",
    links: [
      ["Apply to join", "#brief"],
      ["Rates and payouts", "#packs"],
      ["Our standards", "#how"],
    ],
  },
];

export function Footer() {
  return (
    <footer id="contact" className="sa-footer">
      <div className="sa-wrap sa-footer__grid" data-reveal="cascade">
        <div className="sa-footer__brand" style={{ "--i": 0 } as React.CSSProperties}>
          <Logo />
          <p className="sa-footer__tag">Reels that land, made by hand. Short product clips from handpicked makers, in segments.</p>
          <a className="sa-footer__mail" href="mailto:hello@satsuma.example">
            hello@satsuma.example
          </a>
        </div>
        {COLUMNS.map((c, i) => (
          <nav key={c.title} aria-label={c.title} style={{ "--i": i + 1 } as React.CSSProperties}>
            <h2 className="sa-footer__title">{c.title}</h2>
            <ul>
              {c.links.map(([label, href]) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <p className="sa-wrap sa-footer__fine">© 2026 Satsuma Reels Co. A fictional brand for a landing-page template.</p>
    </footer>
  );
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/sections/Header.tsx">
<![CDATA["use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "../brand/Logo";
import { progress } from "../motion/math";

const LINKS = [
  { id: "makers", label: "Makers" },
  { id: "how", label: "How it works" },
  { id: "packs", label: "Packs" },
  { id: "brief", label: "Brief" },
  { id: "contact", label: "Contact" },
];

type LenisControl = { stop?: () => void; start?: () => void };

/**
 * Fixed chrome. In the hero it sits in the 1440 frame's own coordinates (logo, nav at x 505, two pills at the
 * right); after 80px it gains a paper strip, hides on scroll-down and returns on scroll-up. A hairline rail fills
 * with page progress and one indicator glides between nav links. Scroll values go to data-state and a CSS
 * custom property from one rAF; React state is only the menu and the active section.
 */
export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const openRef = useRef(false);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    let raf = 0;
    let lastY = window.scrollY;
    const frame = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      header.style.setProperty("--sa-page", progress(y, 0, max).toFixed(4));
      let state = y > 80 ? "compact" : "top";
      if (y > 520 && y > lastY + 4 && !openRef.current) state = "hidden";
      else if (header.dataset.state === "hidden" && y >= lastY - 4 && y > 520) state = "hidden";
      header.dataset.state = state;
      lastY = y;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    frame();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const top = new IntersectionObserver(([e]) => e.isIntersecting && setActive(null), { rootMargin: "0px 0px -60% 0px" });
    const hero = document.getElementById("top");
    if (hero) top.observe(hero);
    return () => {
      io.disconnect();
      top.disconnect();
    };
  }, []);

  const moveIndicator = useCallback((id: string | null) => {
    const ind = indicatorRef.current;
    const nav = navRef.current;
    if (!ind || !nav) return;
    const link = id ? nav.querySelector<HTMLAnchorElement>(`a[href="#${id}"]`) : null;
    if (!link) {
      ind.dataset.on = "false";
      return;
    }
    ind.dataset.on = "true";
    ind.style.setProperty("--x", `${link.offsetLeft}px`);
    ind.style.setProperty("--w", `${link.offsetWidth / 100}`);
  }, []);

  useEffect(() => {
    moveIndicator(active);
    const onResize = () => moveIndicator(active);
    window.addEventListener("resize", onResize, { passive: true });
    document.fonts?.ready.then(onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, moveIndicator]);

  // Menu: scroll lock, focus trap, Escape.
  useEffect(() => {
    const lenis = (window as unknown as { __saLenis?: LenisControl }).__saLenis;
    const root = document.documentElement;
    if (!open) return;
    root.classList.add("sa-locked");
    lenis?.stop?.();
    const menu = menuRef.current;
    const focusables = () => Array.from(menu?.querySelectorAll<HTMLElement>("a, button") ?? []);
    const t = window.setTimeout(() => focusables()[0]?.focus(), 120);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const list = [toggleRef.current!, ...focusables()];
      const i = list.indexOf(document.activeElement as HTMLElement);
      const next = e.shiftKey ? (i <= 0 ? list.length - 1 : i - 1) : i === list.length - 1 ? 0 : i + 1;
      e.preventDefault();
      list[next]?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      root.classList.remove("sa-locked");
      lenis?.start?.();
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header ref={headerRef} className="sa-header" data-state="top" data-menu={open ? "open" : "closed"}>
        <div className="sa-header__bar">
          <a className="sa-header__logo" href="#top" aria-label="Satsuma, back to the top">
            <Logo />
          </a>
          <nav className="sa-nav" aria-label="Primary">
            <ul ref={navRef} onPointerLeave={() => moveIndicator(active)}>
              {LINKS.map((l, i) => (
                <li key={l.id} style={{ "--i": i } as React.CSSProperties}>
                  <a
                    href={`#${l.id}`}
                    aria-current={active === l.id ? "location" : undefined}
                    onPointerEnter={() => moveIndicator(l.id)}
                    onFocus={() => moveIndicator(l.id)}
                    onBlur={() => moveIndicator(active)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <span ref={indicatorRef} className="sa-nav__indicator" data-on="false" aria-hidden="true" />
          </nav>
          <a className="sa-btn sa-btn--paper sa-header__login" href="#brief">
            <span className="sa-btn__label">Log in</span>
          </a>
          <a className="sa-btn sa-btn--aub sa-header__signup" href="#brief">
            <span className="sa-btn__roll">
              <span>Sign up</span>
              <span aria-hidden="true">Sign up</span>
            </span>
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="sa-menu-toggle"
            aria-expanded={open}
            aria-controls="sa-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
        <div className="sa-header__rail" aria-hidden="true">
          <span className="sa-header__rail-fill" />
        </div>
      </header>

      <div id="sa-menu" ref={menuRef} className="sa-menu" data-open={open} inert={!open} aria-label="Menu">
        <nav aria-label="Menu">
          <ol>
            {LINKS.map((l, i) => (
              <li key={l.id} style={{ "--i": i } as React.CSSProperties}>
                <a href={`#${l.id}`} onClick={() => setOpen(false)}>
                  <span className="sa-menu__num">0{i + 1}</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ol>
          <a className="sa-btn sa-btn--aub sa-menu__cta" href="#brief" onClick={() => setOpen(false)}>
            Make a Reel
          </a>
        </nav>
      </div>
    </>
  );
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/sections/Hero.tsx">
<![CDATA[import { Magnetic } from "../motion/Magnetic";
import { ReelWheel } from "../wheel/ReelWheel";
import { Seal, Sprig, TrustLine } from "./Decor";

const delay = (ms: number) => ({ "--ld": `${ms}ms` }) as React.CSSProperties;

/**
 * The 1440×1080 frame. Everything is placed in frame units (--u = min(100vw/1440, 100svh/1080)) so the
 * composition scales as one picture; on phones it restacks. The wheel is the star; the copy sits above it.
 */
export function Hero() {
  return (
    <section id="top" className="sa-hero" aria-labelledby="sa-h1" data-ambient="hero">
      <div className="sa-hero__frame">
        <h1 id="sa-h1" className="sa-h1">
          <span className="sa-h1__line">
            <span className="sa-h1__text sa-load" style={delay(380)}>
              Reels that land,
            </span>
          </span>
          <span className="sa-h1__line sa-h1__line--2">
            <span className="sa-h1__text sa-load" style={delay(520)}>
              made by hand.
            </span>
          </span>
        </h1>

        <p className="sa-sub sa-load" style={delay(760)}>
          <span>Brief a handpicked maker and get scroll-stopping product clips</span>{" "}
          <span>back in days. Every reel is shot, cut and captioned by one</span>{" "}
          <span>person, so nothing ever looks like a template.</span>
        </p>

        <Sprig />
        <Seal />

        <ReelWheel />

        <div className="sa-cta sa-load" style={delay(1150)}>
          <span className="sa-cta__plate" aria-hidden="true" />
          <Magnetic className="sa-cta__magnet">
            <a className="sa-btn sa-btn--aub sa-btn--hero" href="#brief">
              <span className="sa-btn__roll">
                <span>Make a Reel</span>
                <span aria-hidden="true">Make a Reel</span>
              </span>
            </a>
          </Magnetic>
        </div>
        <TrustLine />
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/sections/HowItWorks.tsx">
<![CDATA[import { STEPS } from "../content/steps";
import { CountUp } from "../motion/CountUp";
import { Eyebrow } from "./Eyebrow";

export function HowItWorks() {
  return (
    <section id="how" className="sa-how" aria-labelledby="sa-how-h">
      <div className="sa-wrap">
        <Eyebrow n="01">How it works</Eyebrow>
        <h2 id="sa-how-h" className="sa-h2" data-reveal="mask">
          <span className="sa-mask">
            <span>Brief it. Match it.</span>
          </span>
          <span className="sa-mask">
            <span>
              Peel off <em>your reels.</em>
            </span>
          </span>
        </h2>

        <ol className="sa-steps" data-reveal="cascade">
          {STEPS.map((s, i) => (
            <li key={s.n} className="sa-step" style={{ "--i": i } as React.CSSProperties}>
              <span className="sa-step__n" aria-hidden="true">
                {s.n}
              </span>
              <h3 className="sa-step__title">{s.title}</h3>
              <p className="sa-step__body">{s.body}</p>
              <p className="sa-step__figure">
                <CountUp value={s.figure} className="sa-step__num" />
                <span className="sa-step__unit">{s.unit}</span>
                <span className="sa-step__label">{s.figureLabel}</span>
              </p>
              {i < STEPS.length - 1 && (
                <svg className="sa-step__link" viewBox="0 0 120 40" aria-hidden="true" focusable="false">
                  <path pathLength={1} className="sa-draw sa-draw--scroll" d="M2 28C30 4 70 4 112 24" />
                  <path pathLength={1} className="sa-draw sa-draw--scroll" d="M96 14l16 10-18 8" />
                </svg>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/sections/Makers.tsx">
<![CDATA[import { hasAsset, Picture } from "../assets";
import { MAKERS } from "../content/makers";
import { TiltCard } from "../motion/TiltCard";
import { Scene } from "../wheel/scenes/Scene";
import { Eyebrow } from "./Eyebrow";

export function Makers() {
  return (
    <section id="makers" className="sa-makers" aria-labelledby="sa-makers-h">
      <div className="sa-wrap">
        <Eyebrow n="02">The makers</Eyebrow>
        <h2 id="sa-makers-h" className="sa-h2" data-reveal="mask">
          <span className="sa-mask">
            <span>Handpicked hands,</span>
          </span>
          <span className="sa-mask">
            <span>
              <em>one per reel.</em>
            </span>
          </span>
        </h2>
        <p className="sa-lede" data-reveal="rise">
          Fewer than one in nine applicants make it through. Every maker shoots, cuts and captions their own work, so you always know whose eye you hired.
        </p>

        <ul className="sa-makers__grid" data-reveal="cascade">
          {MAKERS.map((m, i) => (
            <li key={m.id} style={{ "--i": i } as React.CSSProperties}>
              <TiltCard className="sa-maker">
                <div className="sa-maker__media">
                  {hasAsset(`maker-${m.id}`) ? <Picture assetKey={`maker-${m.id}`} alt={`${m.name}, ${m.craft}`} sizes="(min-width: 900px) 30vw, 90vw" /> : <Scene id={m.scene} />}
                  <span className="sa-maker__rate">from ${m.rate} / reel</span>
                </div>
                <div className="sa-maker__body">
                  <h3 className="sa-maker__name">{m.name}</h3>
                  <p className="sa-maker__craft">
                    {m.craft} · {m.city}
                  </p>
                  <p className="sa-maker__line">{m.line}</p>
                  <dl className="sa-maker__stats">
                    <div>
                      <dt>Rating</dt>
                      <dd>{m.rating.toFixed(1)}</dd>
                    </div>
                    <div>
                      <dt>Reels shipped</dt>
                      <dd>{m.reelsShipped}</dd>
                    </div>
                    <div>
                      <dt>Turnaround</dt>
                      <dd>{m.turnaroundDays} days</dd>
                    </div>
                  </dl>
                  <a className="sa-link" href="#brief" data-maker={m.name}>
                    <span>Brief {m.name.split(" ")[0]}</span>
                    <span className="sa-link__arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                </div>
              </TiltCard>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/sections/Packs.tsx">
<![CDATA[import { formatUsd, PACKS, perReel } from "../content/packs";
import { Magnetic } from "../motion/Magnetic";
import { Eyebrow } from "./Eyebrow";
import { SegmentRing } from "./SegmentRing";

export function Packs() {
  return (
    <section id="packs" className="sa-packs" aria-labelledby="sa-packs-h">
      <div className="sa-wrap">
        <Eyebrow n="03">Packs</Eyebrow>
        <h2 id="sa-packs-h" className="sa-h2" data-reveal="mask">
          <span className="sa-mask">
            <span>Buy reels by the</span>
          </span>
          <span className="sa-mask">
            <span>
              <em>segment.</em>
            </span>
          </span>
        </h2>
        <p className="sa-lede" data-reveal="rise">
          One wedge, one finished reel. The bigger the fruit, the cheaper each wedge. No subscription, no seat fees, nothing to cancel.
        </p>

        <ul className="sa-packs__grid" data-reveal="cascade">
          {PACKS.map((p, i) => (
            <li key={p.id} style={{ "--i": i } as React.CSSProperties}>
              <article className="sa-pack" data-popular={p.popular ? "true" : undefined}>
                {p.popular && <span className="sa-pack__flag">Most picked</span>}
                <SegmentRing count={p.segments} className="sa-pack__ring" label={`${p.segments} segments, one per reel`} />
                <h3 className="sa-pack__name">
                  {p.name}
                  <span className="sa-pack__count">{p.segments} reels</span>
                </h3>
                <p className="sa-pack__price">
                  <span className="sa-pack__amount">{formatUsd(p.price)}</span>
                  <span className="sa-pack__per">
                    {formatUsd(perReel(p))} a reel · first reels in {p.turnaround}
                  </span>
                </p>
                <ul className="sa-pack__perks">
                  {p.perks.map((perk) => (
                    <li key={perk}>{perk}</li>
                  ))}
                </ul>
                <Magnetic className="sa-pack__magnet">
                  <a className={`sa-btn ${p.popular ? "sa-btn--sat" : "sa-btn--aub"}`} href="#brief" data-pack={p.id}>
                    <span className="sa-btn__roll">
                      <span>Choose {p.name}</span>
                      <span aria-hidden="true">Choose {p.name}</span>
                    </span>
                  </a>
                </Magnetic>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/sections/SegmentRing.tsx">
<![CDATA[import { segmentWedges } from "../content/segments";

/** A satsuma cut into `count` wedges, one per reel. The wedges pop in a cascade (--i) when revealed. */
export function SegmentRing({ count, className, label }: { count: number; className?: string; label?: string }) {
  const wedges = segmentWedges(count, 50, 50, count > 12 ? 16 : 14, 46, count > 12 ? 0.016 : 0.02);
  return (
    <svg className={`sa-ring ${className ?? ""}`} viewBox="0 0 100 100" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} focusable="false">
      <circle cx="50" cy="50" r="48" className="sa-ring__peel" />
      {wedges.map((w, i) => (
        <path key={i} d={w.path} className="sa-ring__wedge" style={{ "--i": i, "--n": count } as React.CSSProperties} />
      ))}
      <circle cx="50" cy="50" r="5" className="sa-ring__core" />
    </svg>
  );
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/wheel/geometry.ts">
<![CDATA[/**
 * The reel wheel's geometry: cards sit on the inside of a cylinder, so every card's width, edge heights and
 * vertical centre come from how far its x sits from the centre. Pure maths in frame units; no DOM, no React.
 */

export type Profile = {
  /** x of the cylinder's centre line. */
  centre: number;
  /** Distance from the centre line to the silhouette's edge. Normalises every "how far out" ratio. */
  halfW: number;
  /** Even spacing of the unbent row. */
  pitch: number;
  baseW: number;
  growW: number;
  baseH: number;
  growH: number;
  /** Vertical centre of the middle card, and how far the outer cards ride up. */
  cy: number;
  cyLift: number;
  /** How hard centres are pushed outward so the growing cards keep their gap. */
  push: number;
  /** Corner radius of the rounded quad. */
  radius: number;
};

/** The 1440-wide hero frame. */
export const DESKTOP: Profile = {
  centre: 720,
  halfW: 706,
  pitch: 196,
  baseW: 170,
  growW: 48,
  baseH: 280,
  growH: 92,
  cy: 687,
  cyLift: 12,
  push: 0.083,
  radius: 15,
};

/** The 640-unit phone band. */
export const PHONE: Profile = {
  centre: 320,
  halfW: 330,
  pitch: 172,
  baseW: 150,
  growW: 40,
  baseH: 290,
  growH: 84,
  cy: 205,
  cyLift: 8,
  push: 0.083,
  radius: 18,
};

/** Edge heights grow with the 2.6 power of their own distance, so the middle stays calm and the rim leans in. */
const EDGE_EXPONENT = 2.6;

export type CardGeom = {
  index: number;
  /** Centre x after the outward push. */
  x: number;
  w: number;
  left: number;
  right: number;
  /** Heights of the left and right vertical edges. */
  hl: number;
  hr: number;
  cy: number;
  /** Normalised distance of the centre from the centre line. */
  d: number;
};

export function wrap(value: number, period: number): number {
  return ((value % period) + period) % period;
}

function widthAt(profile: Profile, d: number, bend: number): number {
  return profile.baseW + profile.growW * bend * d * d;
}

function edgeHeight(profile: Profile, edgeX: number, bend: number): number {
  const q = Math.abs(edgeX - profile.centre) / profile.halfW;
  return profile.baseH + profile.growH * bend * Math.pow(q, EDGE_EXPONENT);
}

/** x of a card whose unpushed offset from the centre line is `t`. */
export function pushedX(profile: Profile, t: number, bend = 1): number {
  const ratio = t / profile.halfW;
  return profile.centre + t * (1 + profile.push * bend * ratio * ratio);
}

/** One card at unpushed offset `t`. `bend` runs 0 (a flat row) to 1 (the full cylinder). */
export function cardAt(profile: Profile, t: number, bend = 1, index = 0): CardGeom {
  const x = pushedX(profile, t, bend);
  const d = Math.abs(x - profile.centre) / profile.halfW;
  const w = widthAt(profile, d, bend);
  const left = x - w / 2;
  const right = x + w / 2;
  return {
    index,
    x,
    w,
    left,
    right,
    hl: edgeHeight(profile, left, bend),
    hr: edgeHeight(profile, right, bend),
    cy: profile.cy - profile.cyLift * bend * d * d,
    d,
  };
}

/**
 * How many cards the loop needs so the seam (where a card wraps from one side to the other) stays off-screen.
 * Never fewer than ten, always even.
 */
export function cardCount(profile: Profile, visibleHalf: number): number {
  for (let n = 10; n < 60; n += 2) {
    const edge = n * profile.pitch / 2;
    const g = cardAt(profile, edge);
    if (g.left - profile.centre >= visibleHalf + 8) return n;
  }
  return 60;
}

/** Every card for one frame. `offset` is the row's scroll position in units; it wraps seamlessly. */
export function layoutCards(profile: Profile, offset: number, count: number, bend = 1): CardGeom[] {
  const period = count * profile.pitch;
  const cards: CardGeom[] = [];
  for (let i = 0; i < count; i++) {
    const t = wrap(i * profile.pitch + offset + period / 2, period) - period / 2;
    cards.push(cardAt(profile, t, bend, i));
  }
  return cards;
}

export type Point = { x: number; y: number };

/** The four corners of a card, clockwise from top-left. */
export function quadPoints(g: CardGeom): [Point, Point, Point, Point] {
  return [
    { x: g.left, y: g.cy - g.hl / 2 },
    { x: g.right, y: g.cy - g.hr / 2 },
    { x: g.right, y: g.cy + g.hr / 2 },
    { x: g.left, y: g.cy + g.hl / 2 },
  ];
}

/** An SVG path for a quad with every corner rounded by (at most) `radius`. Works for any convex quad. */
export function roundedQuadPath(points: readonly Point[], radius: number): string {
  const n = points.length;
  const segs: string[] = [];
  for (let i = 0; i < n; i++) {
    const prev = points[(i + n - 1) % n];
    const cur = points[i];
    const next = points[(i + 1) % n];
    const toPrev = { x: prev.x - cur.x, y: prev.y - cur.y };
    const toNext = { x: next.x - cur.x, y: next.y - cur.y };
    const lp = Math.hypot(toPrev.x, toPrev.y) || 1;
    const ln = Math.hypot(toNext.x, toNext.y) || 1;
    const r = Math.min(radius, lp / 2, ln / 2);
    const a = { x: cur.x + (toPrev.x / lp) * r, y: cur.y + (toPrev.y / lp) * r };
    const b = { x: cur.x + (toNext.x / ln) * r, y: cur.y + (toNext.y / ln) * r };
    segs.push(`${i === 0 ? "M" : "L"}${f(a.x)} ${f(a.y)}Q${f(cur.x)} ${f(cur.y)} ${f(b.x)} ${f(b.y)}`);
  }
  return `${segs.join("")}Z`;
}

function f(n: number): string {
  return (Math.round(n * 100) / 100).toString();
}

/** The 5×2 grid every card reads its own clip from. Tiles are 384×540 in a 16:9 frame. */
export const TILE_COLS = 5;
export const TILE_ROWS = 2;
export const TILE_COUNT = TILE_COLS * TILE_ROWS;
export const TILE_ASPECT = 384 / 540;

export type TileLayout = { w: number; h: number; x: number; y: number };

/** Size and offset of the shared video sheet inside a card, so that card shows tile `tile`, cover-fitted. */
export function tileLayout(tile: number, cardW: number, cardH: number): TileLayout {
  const col = tile % TILE_COLS;
  const row = Math.floor(tile / TILE_COLS) % TILE_ROWS;
  const tileH = Math.max(cardH, cardW / TILE_ASPECT);
  const tileW = tileH * TILE_ASPECT;
  // Centre the tile on the card, then move to its cell in the sheet.
  return {
    w: tileW * TILE_COLS,
    h: tileH * TILE_ROWS,
    x: (cardW - tileW) / 2 - col * tileW,
    y: (cardH - tileH) / 2 - row * tileH,
  };
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/wheel/momentum.ts">
<![CDATA[/** The wheel's drift, drag and coast. Pure maths in frame units per second; the component owns the clock. */

/** Right → left, in frame units per second. */
export const DRIFT = -50;
/** Share of a fling's speed still left one second after release. */
export const RETAINED_PER_SECOND = 0.05;
/** A fling can't exceed this, so a flick of the wrist never spins the wheel into a blur. */
export const MAX_FLING = 4200;
/** Below this a fling is considered spent and the drift carries on alone. */
export const REST = 2;

export type Sample = { t: number; x: number };

export function decayFling(velocity: number, dt: number): number {
  const v = velocity * Math.pow(RETAINED_PER_SECOND, dt);
  return Math.abs(v) < REST ? 0 : v;
}

/** Offset after `dt` seconds of drift plus whatever fling is left. */
export function advance(offset: number, fling: number, dt: number, drift = DRIFT): number {
  return offset + (drift + fling) * dt;
}

/** Release velocity (units/s) from recent pointer samples. Only the last `windowMs` count. */
export function flingFrom(samples: readonly Sample[], windowMs = 90): number {
  if (samples.length < 2) return 0;
  const last = samples[samples.length - 1];
  const recent = samples.filter((s) => last.t - s.t <= windowMs);
  const first = recent[0];
  const dt = (last.t - first.t) / 1000;
  if (dt <= 0) return 0;
  const v = (last.x - first.x) / dt;
  return Math.max(-MAX_FLING, Math.min(MAX_FLING, v));
}

/** Keep a sample list to the last ~200ms so it never grows during a long drag. */
export function pushSample(samples: Sample[], sample: Sample, keepMs = 200): Sample[] {
  const next = [...samples, sample];
  while (next.length > 2 && sample.t - next[0].t > keepMs) next.shift();
  return next;
}

/** 0 → 1 ease for the cylinder assembling on load. */
export function assembleBend(elapsedMs: number, delayMs = 450, durationMs = 1700): number {
  const t = Math.min(1, Math.max(0, (elapsedMs - delayMs) / durationMs));
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/wheel/reel-media.ts">
<![CDATA[/**
 * The shared clip sheet. Every card reads its own tile of ONE 16:9 video laid out as a 5×2 grid (see
 * docs/image-prompts/satsuma.md), so it downloads once. Drop the encoded file into
 * public/templates/satsuma/clips/ and point REEL_CLIP at it; until then each card plays its drawn scene.
 */
export type ReelClip = {
  /** Desktop/tablet clip, e.g. "/templates/satsuma/clips/reels.mp4". */
  src: string;
  /** 720p variant for phones. Falls back to `src`. */
  srcMobile?: string;
  /** Still of the sheet, shown until the first frame is ready. */
  poster?: string;
};

export const REEL_CLIP: ReelClip | null = null;
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/wheel/ReelWheel.tsx">
<![CDATA["use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { REELS } from "../content/reels";
import { Scene } from "./scenes/Scene";
import { advance, assembleBend, decayFling, DRIFT, flingFrom, pushSample, type Sample } from "./momentum";
import { cardCount, cardAt, DESKTOP, layoutCards, PHONE, quadPoints, roundedQuadPath, tileLayout, type CardGeom, type Profile } from "./geometry";
import { REEL_CLIP } from "./reel-media";

const PHONE_QUERY = "(max-width: 820px)";
const NUDGE = 520;
const SYNC_EVERY_MS = 1000;

/** The first paint, before JS: desktop geometry at rest, placed in frame units through the --wu variable. */
function initialStyle(g: CardGeom): CSSProperties {
  const radius = DESKTOP.radius;
  return {
    left: `calc(50% + ${(g.left - DESKTOP.centre).toFixed(2)} * var(--wu))`,
    top: `calc(${(g.cy - Math.max(g.hl, g.hr) / 2).toFixed(2)} * var(--wu))`,
    width: `calc(${g.w.toFixed(2)} * var(--wu))`,
    height: `calc(${Math.max(g.hl, g.hr).toFixed(2)} * var(--wu))`,
    borderRadius: `calc(${radius} * var(--wu))`,
  };
}

const INITIAL = layoutCards(DESKTOP, 0, 10, 1);

/**
 * A curved video carousel. Each card is a rounded quad (clip-path: path()) whose size and lean come from its
 * x position (geometry.ts), recomputed every frame. The row drifts right → left, follows a drag 1:1, coasts
 * after release (momentum.ts) and then the drift carries on. One rAF loop writes everything; React state is
 * only the card count.
 */
export function ReelWheel() {
  const rootRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<(HTMLLIElement | null)[]>([]);
  const [count, setCount] = useState(10);
  const [clipOn, setClipOn] = useState(false);
  const countRef = useRef(10);
  const repaintRef = useRef<() => void>(() => {});

  useEffect(() => {
    countRef.current = count;
    repaintRef.current();
  }, [count]);

  useEffect(() => {
    const root = rootRef.current;
    const probe = probeRef.current;
    if (!root || !probe) return;

    const live = document.documentElement.dataset.saMotion === "live";
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const phoneQuery = window.matchMedia(PHONE_QUERY);
    setClipOn(live && !!REEL_CLIP);

    let profile: Profile = phoneQuery.matches ? PHONE : DESKTOP;
    let unit = 1;
    let width = 0;
    let offset = 0;
    let fling = 0;
    let dragging = false;
    let samples: Sample[] = [];
    let lastPointerX = 0;
    let visible = true;
    let raf = 0;
    let last = 0;
    let started = 0;
    let lastSync = 0;
    let readied = false;

    const reduced = () => reducedQuery.matches;

    const measure = () => {
      profile = phoneQuery.matches ? PHONE : DESKTOP;
      unit = probe.offsetWidth / 1000 || 1;
      width = root.clientWidth;
      const needed = cardCount(profile, width / 2 / unit);
      if (needed !== countRef.current) {
        countRef.current = needed;
        setCount(needed);
      }
    };

    const cards = () => cardsRef.current.slice(0, countRef.current);

    const paint = (bend: number) => {
      const geoms = layoutCards(profile, offset, countRef.current, bend);
      const els = cards();
      for (let i = 0; i < geoms.length; i++) {
        const el = els[i];
        if (!el) continue;
        const g = geoms[i];
        const boxH = Math.max(g.hl, g.hr);
        const top = g.cy - boxH / 2;
        const px = (g.left - profile.centre) * unit + width / 2;
        const py = top * unit;
        const w = g.w * unit;
        const h = boxH * unit;
        const local = quadPoints(g).map((p) => ({ x: (p.x - g.left) * unit, y: (p.y - top) * unit }));
        el.style.opacity = "";
        el.style.left = "0px";
        el.style.top = "0px";
        el.style.borderRadius = "0";
        el.style.transform = `translate3d(${px.toFixed(2)}px,${py.toFixed(2)}px,0)`;
        el.style.width = `${w.toFixed(2)}px`;
        el.style.height = `${h.toFixed(2)}px`;
        el.style.clipPath = `path('${roundedQuadPath(local, profile.radius * unit)}')`;
        const play = el.querySelector<HTMLElement>(".sa-card__play");
        if (play) {
          const size = 34 * unit * (profile === PHONE ? 1.4 : 1);
          const y = (boxH / 2 + g.hl / 2) * unit - size - 14 * unit;
          play.style.left = "0px";
          play.style.top = "0px";
          play.style.bottom = "auto";
          play.style.width = `${size.toFixed(2)}px`;
          play.style.height = `${size.toFixed(2)}px`;
          play.style.transform = `translate3d(${(14 * unit).toFixed(2)}px,${y.toFixed(2)}px,0)`;
        }
        const video = el.querySelector<HTMLVideoElement>(".sa-card__video");
        if (video) {
          const t = tileLayout(i % 10, w, h);
          video.style.width = `${t.w.toFixed(2)}px`;
          video.style.height = `${t.h.toFixed(2)}px`;
          video.style.transform = `translate3d(${t.x.toFixed(2)}px,${t.y.toFixed(2)}px,0)`;
        }
      }
      if (!readied) {
        readied = true;
        root.dataset.ready = "true";
      }
    };

    const currentBend = (now: number) => (live && !reduced() ? assembleBend(now - started) : 1);

    const syncVideos = (now: number) => {
      if (now - lastSync < SYNC_EVERY_MS) return;
      lastSync = now;
      const vids = Array.from(root.querySelectorAll<HTMLVideoElement>(".sa-card__video"));
      const master = vids[0];
      if (!master) return;
      for (const v of vids.slice(1)) {
        if (Math.abs(v.currentTime - master.currentTime) > 0.15) v.currentTime = master.currentTime;
      }
    };

    const needsLoop = () => visible && (dragging || fling !== 0 || !reduced() || currentBend(performance.now()) < 1);

    const tick = (now: number) => {
      raf = 0;
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!dragging) {
        const drift = reduced() ? 0 : DRIFT;
        offset = advance(offset, fling, dt, drift);
        fling = decayFling(fling, dt);
      }
      paint(currentBend(now));
      syncVideos(now);
      if (needsLoop()) raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    repaintRef.current = () => {
      measure();
      paint(currentBend(performance.now()));
      if (needsLoop()) kick();
    };

    started = performance.now();
    measure();
    paint(currentBend(started));
    kick();

    // Drag: follows the pointer 1:1, then coasts.
    const down = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      if ((e.target as Element).closest("button")) return;
      dragging = true;
      fling = 0;
      lastPointerX = e.clientX;
      samples = [{ t: e.timeStamp, x: e.clientX / unit }];
      root.dataset.dragging = "true";
      root.setPointerCapture(e.pointerId);
      kick();
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      offset += (e.clientX - lastPointerX) / unit;
      lastPointerX = e.clientX;
      samples = pushSample(samples, { t: e.timeStamp, x: e.clientX / unit });
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      root.dataset.dragging = "false";
      if (root.hasPointerCapture(e.pointerId)) root.releasePointerCapture(e.pointerId);
      fling = reduced() ? 0 : flingFrom(samples);
      kick();
    };
    const keys = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      e.preventDefault();
      fling += e.key === "ArrowRight" ? NUDGE : -NUDGE;
      kick();
    };

    root.addEventListener("pointerdown", down);
    root.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("pointerup", up);
    root.addEventListener("pointercancel", up);
    root.addEventListener("keydown", keys);

    const ro = new ResizeObserver(() => repaintRef.current());
    ro.observe(root);
    phoneQuery.addEventListener("change", repaintRef.current);
    reducedQuery.addEventListener("change", repaintRef.current);

    // Off-screen, the loop stops completely and the scenes' own loops pause.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      root.dataset.playing = visible ? "true" : "false";
      if (visible) kick();
    });
    io.observe(root);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      phoneQuery.removeEventListener("change", repaintRef.current);
      reducedQuery.removeEventListener("change", repaintRef.current);
      root.removeEventListener("pointerdown", down);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerup", up);
      root.removeEventListener("pointercancel", up);
      root.removeEventListener("keydown", keys);
      repaintRef.current = () => {};
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="sa-wheel"
      data-ready="false"
      data-dragging="false"
      data-playing="true"
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      aria-label="Reels from our makers. Drag, or use the arrow keys, to spin the wheel."
    >
      <span ref={probeRef} className="sa-wheel__probe" aria-hidden="true" />
      <ul className="sa-wheel__track">
        {Array.from({ length: count }, (_, i) => {
          const reel = REELS[i % REELS.length];
          const initial = INITIAL[i] ?? cardAt(DESKTOP, 0, 1, i);
          return (
            <li
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="sa-card"
              style={i < INITIAL.length ? initialStyle(initial) : { opacity: 0 }}
              aria-label={`${reel.title}, by ${reel.maker}`}
            >
              <div className="sa-card__media">
                <Scene id={reel.scene} />
                {clipOn && REEL_CLIP && <ReelVideo />}
              </div>
              <span className="sa-card__play" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M9.5 7.2v9.6l7.6-4.8z" />
                </svg>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** One <video> per card, all on the same src (downloaded once) and fading in when its first frame is ready. */
function ReelVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const clip = REEL_CLIP;
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const ready = () => (v.dataset.ready = "true");
    if (v.readyState >= 2) ready();
    v.addEventListener("loadeddata", ready);
    return () => v.removeEventListener("loadeddata", ready);
  }, []);
  if (!clip) return null;
  const phone = typeof window !== "undefined" && window.matchMedia(PHONE_QUERY).matches;
  return (
    <video
      ref={ref}
      className="sa-card__video"
      src={phone && clip.srcMobile ? clip.srcMobile : clip.src}
      poster={clip.poster}
      muted
      loop
      autoPlay
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
]]>
    </file>
    <file path="src/app/(satsuma)/satsuma/wheel/scenes/Scene.tsx">
<![CDATA[import type { CSSProperties, ReactNode } from "react";
import type { SceneId } from "../../content/reels";

/**
 * Ten small looping scenes drawn in SVG, one per tile of the clip sheet. They are what a card shows until a
 * real clip is dropped in (see reel-media.ts). Colour comes only from the .sa-f-* / .sa-s-* classes, and
 * every loop is a transform animation defined in satsuma.css (paused off-screen, off under reduced motion).
 */

type Delay = CSSProperties & { "--d"?: string };
const d = (s: number): Delay => ({ "--d": `${s}s` });

function Frame({ bg, children }: { bg: string; children: ReactNode }) {
  return (
    <svg className="sa-scene" viewBox="0 0 384 540" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <rect width="384" height="540" className={bg} />
      {children}
    </svg>
  );
}

const SCENES: Record<SceneId, () => ReactNode> = {
  sneaker: () => (
    <Frame bg="sa-f-apr">
      <ellipse cx="192" cy="396" rx="120" ry="14" className="sa-f-aub sa-o-3 sa-a sa-a-shadow" />
      <g className="sa-a sa-a-tilt">
        <path d="M64 346h272q0 20-18 20H80q-16 0-16-20z" className="sa-f-paper" />
        <path d="M78 346l18-92q8-18 28-12l56 24q20 8 40 0l42-18q38-8 60 52l8 46z" className="sa-f-sat" />
        <path d="M124 296l44 18M136 276l44 18M152 258l40 16" className="sa-s-paper" />
        <path d="M250 300q40 6 70 30" className="sa-s-aub" />
        <path d="M70 346h262" className="sa-s-aub sa-o-3" />
      </g>
      <circle cx="318" cy="128" r="30" className="sa-f-paper sa-o-6 sa-a sa-a-bob" style={d(0.6)} />
      <circle cx="74" cy="184" r="14" className="sa-f-sat sa-o-6 sa-a sa-a-bob" style={d(1.2)} />
    </Frame>
  ),

  skincare: () => (
    <Frame bg="sa-f-leaf-soft">
      <ellipse cx="192" cy="430" rx="92" ry="12" className="sa-f-leaf sa-o-3" />
      <rect x="146" y="196" width="92" height="232" rx="22" className="sa-f-aub" />
      <rect x="160" y="150" width="64" height="58" rx="12" className="sa-f-ink" />
      <rect x="162" y="276" width="60" height="86" rx="8" className="sa-f-paper" />
      <circle cx="192" cy="310" r="12" className="sa-f-sat" />
      <path d="M170 340h44" className="sa-s-aub" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={70 + i * 62} cy={150 + (i % 2) * 40} r={7 + (i % 3) * 3} className="sa-f-apr sa-a sa-a-splash" style={d(i * 0.35)} />
      ))}
      <ellipse cx="192" cy="440" rx="40" ry="6" className="sa-s-paper sa-a sa-a-ripple" />
    </Frame>
  ),

  "latte-pour": () => (
    <Frame bg="sa-f-apr">
      <ellipse cx="192" cy="420" rx="128" ry="24" className="sa-f-aub sa-o-3" />
      <path d="M92 292h200v52q0 70-100 70t-100-70z" className="sa-f-paper" />
      <ellipse cx="192" cy="292" rx="100" ry="26" className="sa-f-aub" />
      <ellipse cx="192" cy="292" rx="80" ry="19" className="sa-f-apr-soft" />
      <path d="M192 296c-26-22-8-34 0-20 8-14 26-2 0 20z" className="sa-f-aub sa-a sa-a-art" />
      <rect x="184" y="40" width="16" height="236" rx="8" className="sa-f-paper sa-a sa-a-pour" />
      <path d="M292 316q40 4 40 36t-40 36" className="sa-s-paper" />
    </Frame>
  ),

  headphones: () => (
    <Frame bg="sa-f-sat">
      {[0, 1, 2].map((i) => (
        <circle key={i} cx="192" cy="300" r="92" className="sa-s-paper sa-a sa-a-ring" style={d(i * 0.9)} />
      ))}
      <path d="M92 320v-40a100 100 0 0 1 200 0v40" className="sa-s-ink sa-sw-20" />
      <rect x="64" y="290" width="56" height="112" rx="26" className="sa-f-ink" />
      <rect x="264" y="290" width="56" height="112" rx="26" className="sa-f-ink" />
      <rect x="76" y="306" width="22" height="80" rx="11" className="sa-f-aub" />
      <rect x="286" y="306" width="22" height="80" rx="11" className="sa-f-aub" />
    </Frame>
  ),

  "plant-shop": () => (
    <Frame bg="sa-f-apr-soft">
      <rect x="0" y="388" width="384" height="14" className="sa-f-aub" />
      {[
        { x: 78, pot: "sa-f-aub", h: 120, delay: 0 },
        { x: 192, pot: "sa-f-sat", h: 170, delay: 0.7 },
        { x: 306, pot: "sa-f-ink", h: 96, delay: 1.4 },
      ].map((p) => (
        <g key={p.x}>
          <g className="sa-a sa-a-sway" style={{ ...d(p.delay), transformOrigin: `${p.x}px 380px` }}>
            <ellipse cx={p.x - 20} cy={380 - p.h} rx="16" ry="44" transform={`rotate(-24 ${p.x - 20} ${380 - p.h})`} className="sa-f-leaf" />
            <ellipse cx={p.x + 20} cy={372 - p.h} rx="16" ry="48" transform={`rotate(22 ${p.x + 20} ${372 - p.h})`} className="sa-f-leaf" />
            <ellipse cx={p.x} cy={350 - p.h} rx="15" ry="52" className="sa-f-leaf" />
            <path d={`M${p.x} 380V${360 - p.h}`} className="sa-s-leaf" />
          </g>
          <path d={`M${p.x - 40} 380h80l-10 -64h-60z`} transform="translate(0 8)" className={p.pot} />
        </g>
      ))}
    </Frame>
  ),

  bouquet: () => (
    <Frame bg="sa-f-leaf-soft">
      <g className="sa-a sa-a-sway" style={{ transformOrigin: "192px 420px" }}>
        {[
          { x: 130, y: 170, c: "sa-f-sat", r: 30 },
          { x: 192, y: 130, c: "sa-f-apr", r: 34 },
          { x: 254, y: 176, c: "sa-f-aub", r: 28 },
          { x: 160, y: 232, c: "sa-f-paper", r: 26 },
          { x: 228, y: 238, c: "sa-f-sat", r: 24 },
        ].map((f, i) => (
          <g key={i}>
            <path d={`M${f.x} ${f.y}Q192 330 192 420`} className="sa-s-leaf" />
            <circle cx={f.x} cy={f.y} r={f.r} className={f.c} />
            <circle cx={f.x} cy={f.y} r={f.r / 3} className="sa-f-ink sa-o-3" />
          </g>
        ))}
      </g>
      <path d="M118 316L192 460 266 316z" className="sa-f-paper" />
      <path d="M118 316L192 460 150 316z" className="sa-f-apr" />
    </Frame>
  ),

  pottery: () => (
    <Frame bg="sa-f-apr">
      <ellipse cx="192" cy="440" rx="150" ry="30" className="sa-f-aub" />
      <ellipse cx="192" cy="426" rx="150" ry="30" className="sa-f-ink" />
      <path d="M142 420q-34-70 6-120 28-34 12-90h64q-16 56 12 90 40 50 6 120z" className="sa-f-sat" />
      {[260, 306, 352].map((y, i) => (
        <ellipse key={y} cx="192" cy={y} rx={58 - i * 3} ry="8" className="sa-s-paper sa-a sa-a-spin" style={d(i * 0.3)} />
      ))}
      <ellipse cx="192" cy="208" rx="32" ry="7" className="sa-f-aub" />
    </Frame>
  ),

  serum: () => (
    <Frame bg="sa-f-aub">
      <rect x="170" y="40" width="44" height="86" rx="14" className="sa-f-paper" />
      <path d="M180 126h24l-6 40h-12z" className="sa-f-apr" />
      <path d="M192 170c-16 24-18 40 0 40s16-16 0-40z" className="sa-f-sat sa-a sa-a-drop" />
      <ellipse cx="192" cy="388" rx="120" ry="16" className="sa-s-apr sa-a sa-a-ripple" />
      <ellipse cx="192" cy="388" rx="120" ry="16" className="sa-s-apr sa-a sa-a-ripple" style={d(0.5)} />
      <path d="M70 388q122 40 244 0v70q-122 40-244 0z" className="sa-f-ink sa-o-6" />
    </Frame>
  ),

  "latte-top": () => (
    <Frame bg="sa-f-paper">
      <circle cx="192" cy="270" r="168" className="sa-f-apr" />
      <circle cx="192" cy="270" r="124" className="sa-f-paper" />
      <circle cx="192" cy="270" r="104" className="sa-f-aub" />
      <g className="sa-a sa-a-swirl">
        <path d="M192 270c40-4 66 20 56 52-12 40-70 48-102 12-34-38-10-96 46-104 52-8 94 28 94 78" className="sa-s-apr sa-sw-14" />
        <path d="M192 270c-18 6-20 26-2 30" className="sa-s-paper sa-sw-8" />
      </g>
      <path d="M338 252h38v36h-38" className="sa-s-aub sa-sw-10" />
    </Frame>
  ),

  "headphone-stand": () => (
    <Frame bg="sa-f-aub">
      <circle cx="192" cy="250" r="140" className="sa-f-sat sa-o-3 sa-a sa-a-glow" />
      <ellipse cx="192" cy="458" rx="86" ry="16" className="sa-f-paper" />
      <rect x="184" y="150" width="16" height="310" rx="8" className="sa-f-paper" />
      <g className="sa-a sa-a-tilt sa-a-vb" style={{ transformOrigin: "192px 150px" }}>
        <path d="M110 300v-50a82 82 0 0 1 164 0v50" className="sa-s-apr sa-sw-18" />
        <rect x="90" y="270" width="44" height="92" rx="20" className="sa-f-apr" />
        <rect x="250" y="270" width="44" height="92" rx="20" className="sa-f-apr" />
        <rect x="100" y="284" width="16" height="64" rx="8" className="sa-f-sat" />
        <rect x="268" y="284" width="16" height="64" rx="8" className="sa-f-sat" />
      </g>
    </Frame>
  ),
};

export function Scene({ id }: { id: SceneId }) {
  return <>{SCENES[id]()}</>;
}
]]>
    </file>
  </files>
</template>
