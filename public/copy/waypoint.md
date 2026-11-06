<template slug="waypoint" name="Waypoint">
  <dependencies>
    {
      "dependencies": {
        "gsap": "^3.15.0",
        "@gsap/react": "^2.1.2",
        "@phosphor-icons/react": "^2.1.10"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(waypoint)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./waypoint/waypoint.css";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Waypoint — Direct Career Outreach & Pipeline Deck",
  description:
    "Waypoint turns unstructured job hunting into an intentional, visual career pipeline for senior software engineers and product designers.",
  openGraph: {
    title: "Waypoint — Direct Career Outreach & Pipeline Deck",
    description:
      "Waypoint turns unstructured job hunting into an intentional, visual career pipeline for senior software engineers and product designers.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#EDE6DF",
};

export default function WaypointLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jetbrains.variable} ${plusJakartaSans.variable} scroll-smooth`}
    >
      <head>
        <noscript>
          <style>{`[data-reveal] { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body className="wyp-body bg-[#EDE6DF] text-[#121417] antialiased overflow-x-hidden selection:bg-[#DBE8FA] selection:text-[#121417]">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/waypoint";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = {
  assetKey: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function Picture({
  assetKey,
  alt,
  className,
  sizes = "(min-width: 900px) 50vw, 100vw",
  priority,
}: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div className={`wyp-placeholder bg-[#FAF8F5] border border-[#E5DDD4] ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span className="text-xs text-[#666E7D] font-mono">{assetKey}</span>
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
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <rect width="32" height="32" rx="8" fill="#121417"/>
  <path d="M16 8L24 20L16 16.5L8 20L16 8Z" fill="#F5EFEB"/>
  <circle cx="16" cy="16.5" r="1.5" fill="#DBE8FA"/>
</svg>
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          backgroundColor: "#EDE6DF",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              backgroundColor: "#121417",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#F5EFEB",
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            ▲
          </div>
          <span style={{ fontSize: "32px", fontWeight: 800, color: "#121417", letterSpacing: "-0.03em" }}>
            Waypoint
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              backgroundColor: "#DBE8FA",
              color: "#1E4F94",
              padding: "6px 16px",
              borderRadius: "9999px",
              fontSize: "18px",
              fontWeight: 700,
              alignSelf: "flex-start",
            }}
          >
            Direct Career Outreach &amp; Pipeline Deck
          </div>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 900,
              color: "#121417",
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Pitch with intention. Land the offer.
          </h1>
          <p style={{ fontSize: "24px", color: "#666E7D", maxWidth: "880px", margin: 0, lineHeight: 1.4 }}>
            Waypoint turns unstructured job hunting into a calm, systematic career pipeline for senior software engineers and product designers.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #D8D0C5", paddingTop: "24px" }}>
          <span style={{ fontSize: "20px", color: "#666E7D", fontWeight: 600 }}>
            OpenLandingPage Gallery
          </span>
          <span style={{ fontSize: "20px", color: "#121417", fontWeight: 700 }}>
            openlanding.page/waypoint
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/page.tsx">
<![CDATA[import { WaypointApp } from "./WaypointApp";

export default function WaypointPage() {
  return <WaypointApp />;
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/waypoint.css">
<![CDATA[@import "tailwindcss";

@theme {
  --color-wyp-canvas: #ede6df;
  --color-wyp-hero: #f5efeb;
  --color-wyp-surface-tint: #e5ddd4;
  --color-wyp-card: #ffffff;
  --color-wyp-card-subtle: #faf8f5;

  --color-wyp-obsidian: #121417;
  --color-wyp-charcoal: #2b2f38;
  --color-wyp-slate: #666e7d;

  --color-wyp-sage: #d8eadf;
  --color-wyp-sky: #dbe8fa;
  --color-wyp-apricot: #fce8dc;
  --color-wyp-lavender: #ece6f6;
  --color-wyp-colophon: #16181d;

  --font-display: var(--font-jakarta), system-ui, sans-serif;
  --font-body: var(--font-jakarta), system-ui, sans-serif;

  --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* A calm field guide, built on the original Waypoint paper palette. */
.wyp-page {
  --wyp-paper: #f5efeb;
  --wyp-line: #d8d0c5;
  --wyp-muted: #666e7d;
  --wyp-ink: #121417;
  --wyp-ease: cubic-bezier(0.22, 1, 0.36, 1);
  font-size: 14px;
}
.wyp-page main {
  overflow: clip;
}
.wyp-page * {
  box-sizing: border-box;
}
.wyp-page h1,
.wyp-page h2,
.wyp-page h3 {
  text-wrap: balance;
}
.wyp-page p {
  text-wrap: pretty;
}
.wyp-page button,
.wyp-page a {
  -webkit-tap-highlight-color: transparent;
}
.wyp-page button {
  cursor: pointer;
}
.wyp-page button:active,
.wyp-button:active {
  transform: translateY(1px);
}
.wyp-page :focus-visible {
  outline: 2px solid #1e4f94;
  outline-offset: 5px;
}
.wyp-page [id] {
  scroll-margin-top: 110px;
}
.wyp-container {
  width: min(1200px, calc(100% - 96px));
  margin-inline: auto;
}
.wyp-chapter {
  padding-block: 144px;
}
.wyp-kicker {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #535964;
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 24px;
}
.wyp-page .wyp-chapter h2 {
  font-size: clamp(36px, 4.2vw, 60px);
  font-weight: 500;
  letter-spacing: -0.055em;
  line-height: 1.08;
}
.wyp-text-link {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
  font-weight: 600;
  padding-block: 8px;
}
.wyp-text-link svg {
  transition: transform 0.4s var(--wyp-ease);
}
.wyp-text-link:hover svg {
  transform: translate(3px, -3px);
}
.wyp-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  border-radius: 8px;
  padding: 16px 24px;
  min-height: 52px;
  font-size: 13px;
  font-weight: 600;
  transition:
    background 0.3s,
    box-shadow 0.3s,
    transform 0.4s var(--wyp-ease);
}
.wyp-button-dark {
  background: #121417;
  color: #f5efeb;
}
.wyp-button-dark:hover {
  background: #2b2f38;
  box-shadow: 0 4px 16px #12141715;
}
.wyp-button-light {
  background: #faf8f5dd;
  color: #121417;
  border: 1px solid #d8d0c5;
}
.wyp-button-light:hover {
  background: #fff;
}
.wyp-status-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #216143;
  flex-shrink: 0;
}
.wyp-skip-link {
  position: fixed;
  left: 24px;
  top: -80px;
  z-index: 100;
  background: #121417;
  color: #fff;
  padding: 16px;
  border-radius: 8px;
}
.wyp-skip-link:focus {
  top: 12px;
}

/* Landscape, split-line entrance, and a working planar flight deck. */
.wyp-hero {
  position: relative;
  padding: 164px 0 64px;
  background: #f5efeb;
  isolation: isolate;
}
.wyp-hero-landscape {
  position: absolute;
  z-index: -1;
  inset: 0 0 0;
  background: url("/templates/waypoint/hero-bg-1920.webp") center 40% / cover
    no-repeat;
  opacity: 0.64;
  mask-image: linear-gradient(#0009, #000 62%, transparent 98%);
  pointer-events: none;
}
.wyp-hero-copy {
  text-align: center;
}
.wyp-hero-intro {
  font-size: 12px;
  margin-bottom: 28px;
  color: #535964;
}
.wyp-hero h1 {
  font-size: clamp(48px, 6.2vw, 88px);
  letter-spacing: -0.065em;
  font-weight: 500;
  line-height: 1.08;
  margin: 0 auto 28px;
}
.wyp-line {
  display: block;
  overflow: hidden;
  padding-bottom: 0.08em;
  margin-bottom: -0.08em;
}
.wyp-line > span {
  display: block;
}
.wyp-hero-description {
  max-width: 510px;
  margin: 0 auto;
  font-size: 16px;
  line-height: 1.8;
  color: #2b2f38;
}
.wyp-hero-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
}
.wyp-hero-deck {
  position: relative;
  margin-top: 80px;
  max-width: 1104px;
}
.wyp-deck-caption {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  color: #535964;
  margin: 0 4px 16px;
}
.wyp-deck-caption > span:last-child {
  display: flex;
  align-items: center;
  gap: 10px;
}
.wyp-dashboard {
  padding: 24px;
  border-radius: 14px;
  background: #faf8f5;
  border: 1px solid #d8d0c5;
  box-shadow: 0 20px 70px -30px #69534545;
  text-align: left;
}
.wyp-dashboard-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 24px;
}
.wyp-dashboard-title {
  display: flex;
  gap: 12px;
  align-items: center;
  font-size: 12px;
}
.wyp-dashboard-title > span {
  color: #666e7d;
  font-size: 11px;
}
.wyp-dashboard-title svg {
  color: #8a3e1b;
}
.wyp-reset {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  padding: 8px 12px;
  border: 1px solid #d8d0c5;
  border-radius: 6px;
  transition: background 0.3s;
}
.wyp-reset:hover {
  background: #ede6df;
}
.wyp-board-columns {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}
.wyp-board-column {
  min-width: 0;
  padding: 12px;
  background: #ede6df80;
  border-radius: 8px;
  min-height: 280px;
}
.wyp-column-heading {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  margin-bottom: 16px;
}
.wyp-column-heading strong {
  font-weight: 600;
}
.wyp-column-heading > span:nth-last-child(2) {
  font-family: var(--font-jetbrains), monospace;
  color: #666e7d;
}
.wyp-column-heading svg {
  margin-left: auto;
}
.wyp-stage-dot {
  height: 6px;
  width: 6px;
  border: 1px solid #666e7d;
  border-radius: 50%;
}
.wyp-stage-1 {
  background: #dbe8fa;
  border-color: #1e4f94;
}
.wyp-stage-2 {
  background: #fce8dc;
  border-color: #8a3e1b;
}
.wyp-stage-3 {
  background: #d8eadf;
  border-color: #216143;
}
.wyp-column-cards {
  display: grid;
  gap: 8px;
}
.wyp-company-card {
  background: #fff;
  border: 1px solid #d8d0c580;
  border-radius: 6px;
  text-align: left;
  padding: 16px 12px 12px;
  width: 100%;
  transition:
    transform 0.4s var(--wyp-ease),
    box-shadow 0.4s;
}
.wyp-company-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px #69534512;
}
.wyp-company-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: #ece6f6;
  color: #4b3878;
  border-radius: 6px;
  font-weight: 600;
  font-size: 13px;
  flex-shrink: 0;
}
.wyp-mark-anthropic {
  background: #e5ddd4;
  color: #121417;
}
.wyp-mark-vercel {
  background: #121417;
  color: #fff;
}
.wyp-mark-figma {
  background: #fce8dc;
  color: #8a3e1b;
}
.wyp-mark-stripe {
  background: #dbe8fa;
  color: #1e4f94;
}
.wyp-company-card > strong {
  display: block;
  margin-top: 12px;
  font-size: 12px;
  font-weight: 600;
}
.wyp-company-card p {
  font-size: 10px;
  color: #535964;
  margin-top: 4px;
}
.wyp-card-contact {
  display: block;
  color: #666e7d;
  font-size: 9px;
  margin-top: 12px;
}
.wyp-card-highlight {
  display: inline-block;
  font-size: 9px;
  margin-top: 12px;
  padding: 4px 6px;
  background: #d8eadf;
  color: #216143;
  border-radius: 3px;
}
.wyp-card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 9px;
  color: #666e7d;
  border-top: 1px solid #ede6df;
  margin-top: 12px;
  padding-top: 8px;
}
.wyp-empty-column {
  padding: 24px 4px;
  font-size: 11px;
  line-height: 1.7;
  color: #666e7d;
}
.wyp-board-footer {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  gap: 12px;
  font-size: 9px;
  color: #666e7d;
}
.wyp-board-footer > span:first-child {
  display: flex;
  align-items: center;
  gap: 6px;
}
.wyp-horizon {
  margin: 64px auto 0;
  width: 1px;
  height: 80px;
  background: #d8d0c5;
  position: relative;
}
.wyp-horizon span {
  position: absolute;
  width: 7px;
  height: 7px;
  border: 1px solid #8a3e1b;
  background: #f5efeb;
  border-radius: 50%;
  left: -3px;
  top: 0;
}

/* Wide product panorama. All text is real DOM, backed by the supplied contour art. */
.wyp-panorama {
  background: #f5efeb;
  padding-top: 48px;
}
.wyp-panorama-heading,
.wyp-lab-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 48px;
  margin-bottom: 56px;
}
.wyp-panorama-heading > p,
.wyp-lab-heading > p {
  font-size: 14px;
  line-height: 1.9;
  color: #535964;
  width: 300px;
  padding-bottom: 4px;
}
.wyp-panorama-heading .wyp-text-link {
  margin-top: 16px;
  color: #121417;
}
.wyp-panorama-artboard {
  padding: 56px;
  border-radius: 16px;
  background: #e5ddd4
    url("/templates/waypoint/waypoint-08-topographic-background-1600.webp")
    center / cover;
}
.wyp-tiny {
  font-size: 10px;
  color: #666e7d;
  font-weight: 500;
}
.wyp-panorama-caption {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  color: #666e7d;
  font-size: 10px;
  margin-top: 20px;
}

/* A measured four-stop route. GSAP pins only on sufficiently tall desktop screens. */
.wyp-story {
  background: #ede6df;
}
.wyp-editorial-heading {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 48px;
  align-items: end;
  margin-bottom: 80px;
}
.wyp-editorial-heading .wyp-kicker {
  grid-column: 1/-1;
}
.wyp-editorial-heading > p:last-child {
  justify-self: end;
  font-size: 14px;
  line-height: 1.9;
  width: 300px;
  color: #535964;
}
.wyp-story-body {
  display: grid;
  grid-template-columns: 0.85fr 1.3fr;
  column-gap: 96px;
  align-items: start;
}
.wyp-story-step {
  min-height: 68vh;
  padding: 48px 0 120px 32px;
  position: relative;
  border-left: 1px solid #d8d0c5;
}
.wyp-story-step:last-child {
  min-height: 600px;
  padding-bottom: 200px;
}
.wyp-story-step-button {
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  text-align: left;
  color: #666e7d;
  font-size: 12px;
  margin-bottom: 32px;
}
.wyp-story-step-button > svg {
  margin-left: auto;
}
.wyp-route-marker {
  width: 32px;
  height: 32px;
  border: 1px solid #d8d0c5;
  background: #ede6df;
  border-radius: 50%;
  font-family: var(--font-jetbrains), monospace;
  font-size: 9px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: -49px;
  transition:
    background 0.4s,
    color 0.4s;
}
.is-active .wyp-route-marker {
  background: #121417;
  color: #fff;
  border-color: #121417;
}
.wyp-story-step h3 {
  font-size: 32px;
  font-weight: 500;
  line-height: 1.15;
  letter-spacing: -0.05em;
  margin-bottom: 24px;
}
.wyp-story-step > p {
  font-size: 14px;
  line-height: 1.85;
  color: #535964;
  max-width: 320px;
}
.wyp-story-step > a {
  margin-top: 24px;
}
.wyp-mobile-story-visual {
  display: none;
}
.wyp-story-canvas {
  width: 100%;
  min-height: 500px;
  border-radius: 12px;
  background: #e5ddd4
    url("/templates/waypoint/waypoint-08-topographic-background-800.webp")
    center / cover;
  padding: 24px;
}
.wyp-canvas-label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 9px;
  color: #535964;
  margin-bottom: 24px;
}
.wyp-canvas-label > span:last-child {
  font-family: var(--font-jetbrains), monospace;
}
.wyp-story-visual-frame {
  position: relative;
  min-height: 385px;
}
.wyp-story-visual {
  position: absolute;
  inset: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateX(14px);
  clip-path: inset(0 0 0 10%);
  transition:
    opacity 0.45s var(--wyp-ease),
    transform 0.6s var(--wyp-ease),
    clip-path 0.6s var(--wyp-ease),
    visibility 0.45s;
}
.wyp-story-visual.is-active {
  opacity: 1;
  visibility: visible;
  transform: none;
  clip-path: inset(0);
}
.wyp-story-progress {
  display: flex;
  gap: 8px;
  margin: 24px auto 12px;
  width: min(340px, 100%);
}
.wyp-story-progress button {
  flex: 1;
  height: 36px;
  min-width: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px;
  border: 1px solid #d8d0c580;
  border-radius: 4px;
  transition:
    flex 0.45s var(--wyp-ease),
    background 0.3s;
}
.wyp-story-progress button > span:first-child {
  display: block;
  background: #faf8f5;
  border-radius: 4px;
  height: 3px;
  width: 16px;
  flex-shrink: 0;
  transition: background 0.4s;
}
.wyp-story-progress button > span.is-complete {
  background: #8a3e1b;
}
.wyp-progress-label {
  max-width: 0;
  overflow: hidden;
  opacity: 0;
  font-size: 9px;
  white-space: nowrap;
  transition: opacity 0.3s;
}
.wyp-story-progress button:hover,
.wyp-story-progress button:focus-visible,
.wyp-story-progress button[aria-pressed="true"] {
  flex: 2.4;
  background: #faf8f5a0;
}
.wyp-story-progress
  button:is(:hover, :focus-visible, [aria-pressed="true"])
  .wyp-progress-label {
  max-width: 80px;
  opacity: 1;
}
.wyp-canvas-footnote {
  font-size: 9px;
  text-align: center;
  color: #535964;
}

/* Existing functional widgets, with optional keyboard-controlled focus. */
.wyp-lab {
  background: #f5efeb;
}
.wyp-lab-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-block: 16px;
  border-block: 1px solid #d8d0c5;
  margin-bottom: 32px;
}
.wyp-lab-tabs {
  display: flex;
  align-items: center;
  gap: 8px;
}
.wyp-lab-tabs > button {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  padding: 12px 16px;
  border-radius: 6px;
  transition:
    background 0.3s,
    color 0.3s;
}
.wyp-lab-tabs > button:hover {
  background: #ede6df;
}
.wyp-lab-tabs > button[aria-selected="true"] {
  background: #121417;
  color: #f5efeb;
}
.wyp-all-tools {
  border: 1px solid #d8d0c5;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 11px;
  white-space: nowrap;
}
.wyp-all-tools.is-active {
  background: #ede6df;
}
.wyp-lab-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-flow: dense;
  gap: 20px;
}
.wyp-lab-card {
  background: #fff;
  padding: 32px;
  border: 1px solid #d8d0c5;
  border-radius: 10px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.wyp-lab-card[hidden] {
  display: none;
}
.wyp-lab-card > div:last-child {
  margin-top: auto;
  min-width: 0;
}
.wyp-lab-grid.is-focused {
  grid-template-columns: 1fr;
}
.is-focused .wyp-lab-card {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 64px;
  align-items: center;
}
.is-focused .wyp-lab-card[hidden] {
  display: none;
}
.wyp-tool-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid #d8d0c5;
  border-radius: 8px;
  margin-bottom: 24px;
}
.wyp-lab-card h3 {
  font-size: 24px;
  font-weight: 500;
  letter-spacing: -0.04em;
}
.wyp-lab-card-copy > p {
  color: #666e7d;
  font-size: 12px;
  line-height: 1.8;
  margin-top: 12px;
  max-width: 340px;
}
.wyp-lab-disclaimer {
  font-size: 10px;
  color: #666e7d;
  margin-top: 24px;
}

/* Paper trail: a drawn route, stacked sheets, and manually selected context. */
.wyp-paper-trail {
  background: #ede6df;
}
.wyp-page .wyp-statement {
  font-size: clamp(40px, 5.8vw, 80px);
  max-width: 1100px;
  line-height: 1.13;
  letter-spacing: -0.06em;
  margin-bottom: 64px;
}
.wyp-inline-landscape {
  display: inline-block;
  vertical-align: middle;
  margin-left: 12px;
  width: 120px;
  height: 52px;
  border-radius: 50px;
  background: url("/templates/waypoint/hero-bg-1920.webp") 25% 65% / 240%;
  border: 1px solid #d8d0c5;
}
.wyp-paper-layout {
  display: grid;
  grid-template-columns: 0.85fr 1fr;
  gap: 120px;
  align-items: center;
}
.wyp-paper-intro {
  font-size: 14px;
  color: #535964;
  line-height: 1.9;
  max-width: 360px;
}
.wyp-timeline {
  position: relative;
  margin-top: 40px;
}
.wyp-timeline-line {
  position: absolute;
  left: 15px;
  top: 30px;
  bottom: 30px;
  width: 1px;
  background: #d8d0c5;
}
.wyp-timeline-line span {
  display: block;
  width: 100%;
  height: 100%;
  background: #8a3e1b;
}
.wyp-timeline-moment {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 24px;
  padding-block: 16px;
  text-align: left;
}
.wyp-timeline-moment > span {
  display: grid;
  place-items: center;
  background: #ede6df;
  border: 1px solid #d8d0c5;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  font-family: var(--font-jetbrains), monospace;
  font-size: 9px;
  transition:
    background 0.3s,
    color 0.3s;
}
.wyp-timeline-moment.is-selected > span {
  background: #121417;
  border-color: #121417;
  color: #fff;
}
.wyp-timeline-moment strong {
  display: block;
  font-size: 13px;
  font-weight: 500;
}
.wyp-timeline-moment small {
  display: block;
  color: #666e7d;
  font-size: 10px;
  margin-top: 4px;
}
.wyp-timeline-moment > svg {
  margin-left: auto;
  color: #666e7d;
}
.wyp-note-stack {
  position: relative;
  margin: 24px 0 0;
}
.wyp-note-under {
  position: absolute;
  inset: -12px 12px 12px;
  border: 1px solid #d8d0c5;
  border-radius: 8px;
  background: #faf8f5;
}
.wyp-note-under:nth-child(2) {
  inset: -24px 24px 24px;
}
.wyp-journal {
  position: relative;
  border: 1px solid #d8d0c5;
  background: #faf8f5;
  border-radius: 8px;
  padding: 24px 32px;
  box-shadow: 0 16px 32px #69534510;
}
.wyp-journal-entry {
  min-height: 310px;
  padding-top: 32px;
  animation: wyp-note-in 0.4s var(--wyp-ease);
}
.wyp-journal-entry h3 {
  font-size: 30px;
  font-weight: 500;
  letter-spacing: -0.05em;
  line-height: 1.15;
  margin: 16px 0 20px;
}
.wyp-journal-entry > p:not(.wyp-tiny) {
  font-size: 13px;
  color: #535964;
  line-height: 1.9;
}
.wyp-journal-next {
  border-top: 1px solid #d8d0c5;
  padding-top: 20px;
  margin-top: 24px;
}
.wyp-journal-next p {
  font-size: 12px;
  line-height: 1.8;
  margin-top: 8px;
}
.wyp-journal-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #e5ddd4;
  padding-top: 24px;
  margin-top: 24px;
  gap: 12px;
}
.wyp-journal-controls > span {
  font-size: 9px;
  color: #666e7d;
}
.wyp-journal-controls > div {
  display: flex;
  gap: 8px;
}
.wyp-journal-controls button {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 1px solid #d8d0c5;
  border-radius: 50%;
  transition: background 0.3s;
}
.wyp-journal-controls button:hover {
  background: #ede6df;
}
@keyframes wyp-note-in {
  from {
    opacity: 0.25;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* Quiet decision chapters keep the original prices and controls. */
.wyp-page #pricing {
  padding-block: 144px;
  background: #f5efeb;
  border-top: 1px solid #d8d0c550;
}
.wyp-page #pricing h2,
.wyp-page #faq h2 {
  font-weight: 500;
  letter-spacing: -0.05em;
}
.wyp-page #pricing > div > div:first-child > div:first-child,
.wyp-page #faq > div > div:first-child > div:first-child {
  background: transparent;
  border: 0;
  padding: 0;
  font-weight: 500;
  color: #666e7d;
  border-radius: 0;
}
.wyp-page #pricing > div > div:nth-child(2) {
  gap: 16px;
  max-width: 1200px;
}
.wyp-page #pricing > div > div:nth-child(2) > div {
  box-shadow: none;
  transform: none;
  border-radius: 10px;
  padding: 32px 24px;
}
.wyp-page #pricing h3 {
  font-size: 18px;
  font-weight: 600;
}
.wyp-page #pricing [data-odometer-value] {
  font-weight: 500;
}
.wyp-page #pricing .border-2 {
  border-width: 1px;
  border-color: #121417;
  background: #ede6df70;
}
.wyp-page #pricing .border-2 a {
  background: #121417;
  color: #f5efeb;
}
.wyp-page #pricing h3 + span {
  font-size: 9px;
  padding: 4px 8px;
}
.wyp-page #pricing .text-4xl {
  font-size: 48px;
}
.wyp-page #faq {
  padding-block: 128px;
  background: #f5efeb;
}
.wyp-page #faq > div {
  max-width: 1000px;
}
.wyp-page #faq > div > div:first-child {
  text-align: left;
  max-width: none;
  margin-left: 0;
}
.wyp-page #faq > div > div:last-child {
  border-top: 1px solid #d8d0c5;
}
.wyp-page #faq > div > div:last-child > div {
  margin: 0;
  border: 0;
  border-bottom: 1px solid #d8d0c5;
  box-shadow: none;
  background: transparent;
  border-radius: 0;
}
.wyp-page #faq button {
  padding: 24px 0;
}
.wyp-page #faq button > span:first-child {
  font-weight: 500;
}
.wyp-page #faq [role="region"] > div > div {
  padding-left: 0;
  padding-right: 40px;
  border: 0;
  max-width: 720px;
}

/* The route resolves into a paper invitation and the original ink footer. */
.wyp-conversion {
  position: relative;
  background: #ede6df;
  isolation: isolate;
}
.wyp-conversion::before {
  content: "";
  position: absolute;
  z-index: -1;
  inset: 0;
  background: url("/templates/waypoint/waypoint-08-topographic-background-1600.webp")
    center / cover;
  opacity: 0.28;
  mask-image: linear-gradient(90deg, transparent, #000);
}
.wyp-conversion-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 100px;
  align-items: center;
}
.wyp-page .wyp-conversion h2 {
  font-size: clamp(36px, 4.2vw, 60px);
  letter-spacing: -0.055em;
}
.wyp-conversion-copy {
  font-size: 14px;
  line-height: 1.9;
  color: #535964;
  margin-top: 28px;
}
.wyp-email-form {
  margin-top: 32px;
}
.wyp-email-form > div {
  display: flex;
  gap: 8px;
}
.wyp-email-form input {
  background: #faf8f5;
  border: 1px solid #d8d0c5;
  border-radius: 6px;
  width: 100%;
  min-width: 0;
  padding: 16px;
  font-size: 11px;
}
.wyp-email-form button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  background: #121417;
  color: #f5efeb;
  border-radius: 6px;
  padding: 16px 20px;
  font-size: 11px;
  white-space: nowrap;
  transition: background 0.3s;
}
.wyp-email-form button:hover {
  background: #2b2f38;
}
.wyp-email-form > p {
  color: #8a3e1b;
  font-size: 12px;
  margin-top: 12px;
}
.wyp-form-note {
  font-size: 10px;
  color: #666e7d;
  line-height: 1.9;
  margin-top: 20px;
}
.wyp-form-success {
  display: flex;
  align-items: start;
  gap: 12px;
  color: #216143;
  background: #d8eadf;
  border: 1px solid #21614330;
  padding: 20px;
  border-radius: 8px;
  margin-top: 32px;
  font-size: 12px;
}
.wyp-form-success svg {
  flex-shrink: 0;
}
.wyp-form-success p {
  margin-top: 8px;
  font-size: 11px;
  line-height: 1.8;
}
.wyp-destination {
  position: relative;
  text-align: center;
  padding: 48px 32px;
  border: 1px solid #d8d0c5;
  border-radius: 160px 160px 12px 12px;
  background: #f5efeb80;
}
.wyp-destination-mark {
  margin: 8px auto 24px;
}
.wyp-destination > p {
  font-size: 24px;
  line-height: 1.25;
  letter-spacing: -0.04em;
  margin-bottom: 32px;
}
.wyp-employer-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}
.wyp-employer-grid button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  font-size: 11px;
  border: 1px solid #d8d0c5;
  border-radius: 6px;
  background: #faf8f5;
  transition:
    background 0.3s,
    transform 0.4s var(--wyp-ease);
}
.wyp-employer-grid button:hover {
  transform: translateY(-2px);
}
.wyp-employer-grid button[aria-pressed="true"] {
  background: #121417;
  color: #f5efeb;
  border-color: #121417;
}
.wyp-employer-readout {
  margin-top: 24px;
  font-size: 10px;
  color: #535964;
}
.wyp-destination > small {
  display: block;
  font-size: 9px;
  color: #666e7d;
  margin-top: 16px;
  line-height: 1.7;
}
.wyp-page footer {
  padding-block: 80px 32px;
}
.wyp-page footer > div {
  max-width: 1296px;
}
.wyp-page footer .font-black {
  font-weight: 500;
  color: #f5efeb12;
  font-size: clamp(80px, 17vw, 250px);
  letter-spacing: -0.07em;
}
.wyp-page footer .font-extrabold {
  font-weight: 500;
}
.wyp-page footer button:hover {
  color: white;
}
.wyp-dialog {
  background: #faf8f5;
  border: 1px solid #d8d0c5;
  border-radius: 12px;
  padding: 40px;
  width: min(520px, calc(100% - 32px));
  max-height: calc(100dvh - 48px);
  overflow-y: auto;
  margin: auto;
  box-shadow: 0 24px 96px #12141740;
  color: #121417;
}
.wyp-dialog::backdrop {
  background: #12141766;
  backdrop-filter: blur(8px);
}
.wyp-dialog-close {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 8px;
}
.wyp-dialog h2 {
  font-size: 30px;
  line-height: 1.2;
  font-weight: 500;
  letter-spacing: -0.05em;
  padding-right: 16px;
}
.wyp-dialog h3 {
  margin-top: 24px;
  font-size: 20px;
}
.wyp-dialog p:not(.wyp-kicker) {
  font-size: 13px;
  color: #535964;
  line-height: 1.8;
  margin-block: 20px;
}
.wyp-dialog form {
  margin-top: 24px;
}
.wyp-dialog label {
  display: block;
  font-size: 11px;
  font-weight: 600;
  margin-block: 16px 8px;
}
.wyp-dialog input {
  width: 100%;
  background: #fff;
  border: 1px solid #d8d0c5;
  border-radius: 6px;
  padding: 12px 16px;
  font-size: 13px;
}
.wyp-dialog .wyp-button {
  margin-top: 24px;
  width: 100%;
}
.wyp-dialog small {
  display: block;
  font-size: 10px;
  color: #666e7d;
  margin-top: 20px;
}
.wyp-dialog [role="alert"] {
  color: #8a3e1b !important;
}

@media (min-width: 768px) {
  .wyp-page > header {
    left: 24px;
    right: 24px;
    top: 16px;
    border: 1px solid #d8d0c5a0;
    border-radius: 10px;
    background: #f5efebdd;
  }
  .wyp-page > header > div {
    max-width: 1248px;
    height: 64px;
  }
  .wyp-page > header .rounded-full {
    border-radius: 6px;
  }
}
@media (max-width: 1199px) {
  .wyp-story-body {
    column-gap: 48px;
  }
  .wyp-panorama-artboard {
    padding: 32px;
  }
  .wyp-paper-layout {
    gap: 64px;
  }
  .wyp-conversion-grid {
    gap: 48px;
  }
  .wyp-lab-card {
    padding: 24px;
  }
  .wyp-lab-tabs > button {
    padding-inline: 12px;
  }
}
@media (max-width: 1023px),
  (max-height: 719px),
  (prefers-reduced-motion: reduce) {
  .wyp-story-canvas {
    display: none;
  }
  .wyp-story-body {
    display: block;
  }
  .wyp-story-steps {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 48px 32px;
  }
  .wyp-story-step,
  .wyp-story-step:last-child {
    min-height: 0;
    border: 0;
    padding: 0;
  }
  .wyp-route-marker {
    margin-left: 0;
  }
  .wyp-story-step-button {
    margin-bottom: 24px;
  }
  .wyp-mobile-story-visual {
    display: block;
    margin-top: 24px;
  }
  .wyp-story-step > p {
    max-width: none;
  }
  .wyp-story-step h3 {
    font-size: 28px;
  }
  .wyp-story-step > a {
    margin-top: 12px;
  }
}
@media (max-width: 900px) {
  .wyp-container {
    width: calc(100% - 64px);
  }
  .wyp-chapter {
    padding-block: 96px;
  }
  .wyp-hero {
    padding-top: 144px;
  }
  .wyp-hero h1 {
    font-size: clamp(48px, 7.5vw, 68px);
  }
  .wyp-hero-deck {
    margin-top: 64px;
  }
  .wyp-board-column {
    padding: 8px;
  }
  .wyp-company-card {
    padding: 12px 8px;
  }
  .wyp-board-columns {
    gap: 8px;
  }
  .wyp-dashboard {
    padding: 16px;
  }
  .wyp-column-heading {
    font-size: 9px;
    gap: 4px;
  }
  .wyp-column-heading > svg {
    display: none;
  }
  .wyp-panorama {
    padding-top: 32px;
  }
  .wyp-panorama-heading > p,
  .wyp-lab-heading > p,
  .wyp-editorial-heading > p:last-child {
    width: auto;
  }
  .wyp-panorama-heading,
  .wyp-lab-heading {
    gap: 24px;
  }
  .wyp-editorial-heading {
    margin-bottom: 56px;
  }
  .wyp-lab-tabs {
    gap: 0;
  }
  .wyp-lab-tabs > button {
    font-size: 10px;
    padding: 12px;
    gap: 6px;
  }
  .wyp-lab-card {
    padding: 20px;
  }
  .wyp-lab-grid {
    gap: 16px;
  }
  .is-focused .wyp-lab-card {
    gap: 32px;
    grid-template-columns: 1fr 1.3fr;
  }
  .wyp-paper-layout {
    grid-template-columns: 1fr 1.2fr;
    gap: 32px;
  }
  .wyp-journal {
    padding: 20px;
  }
  .wyp-journal-entry {
    min-height: 350px;
  }
  .wyp-conversion-grid {
    gap: 32px;
  }
  .wyp-destination {
    padding: 40px 20px 32px;
  }
  .wyp-email-form > div {
    flex-direction: column;
  }
  .wyp-email-form button {
    justify-content: center;
  }
  .wyp-page #pricing {
    padding-block: 96px;
  }
  .wyp-page #pricing > div > div:nth-child(2) > div {
    padding: 24px 16px;
  }
  .wyp-page #pricing h3 {
    font-size: 16px;
  }
  .wyp-page #pricing h3 + span {
    padding: 4px;
    font-size: 8px;
  }
  .wyp-page #pricing .text-4xl {
    font-size: 36px;
  }
}
@media (max-width: 640px) {
  .wyp-container {
    width: calc(100% - 40px);
  }
  .wyp-chapter {
    padding-block: 80px;
  }
  .wyp-kicker {
    margin-bottom: 20px;
    font-size: 10px;
  }
  .wyp-hero {
    padding-top: 124px;
    padding-bottom: 32px;
  }
  .wyp-hero-intro {
    font-size: 10px;
    margin-bottom: 24px;
  }
  .wyp-hero h1 {
    font-size: clamp(32px, 8.3vw, 52px);
    letter-spacing: -0.065em;
    line-height: 1.12;
    margin-bottom: 24px;
  }
  .wyp-hero-description {
    font-size: 13px;
    line-height: 1.85;
    max-width: 350px;
  }
  .wyp-hero-actions {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    margin-top: 24px;
    padding-inline: 16px;
  }
  .wyp-button {
    font-size: 12px;
    min-height: 48px;
    padding: 14px 20px;
  }
  .wyp-hero-deck {
    margin-top: 56px;
  }
  .wyp-deck-caption {
    font-size: 8px;
    margin-bottom: 12px;
  }
  .wyp-deck-caption > span:last-child {
    gap: 5px;
  }
  .wyp-dashboard {
    padding: 12px;
    border-radius: 10px;
  }
  .wyp-dashboard-toolbar {
    padding-bottom: 16px;
  }
  .wyp-dashboard-title {
    font-size: 10px;
    gap: 6px;
  }
  .wyp-dashboard-title > span {
    display: none;
  }
  .wyp-reset {
    padding: 6px 8px;
    font-size: 9px;
  }
  .wyp-board-columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
  .wyp-board-column {
    min-height: 190px;
  }
  .wyp-company-card {
    padding: 12px;
  }
  .wyp-company-card > strong {
    font-size: 11px;
  }
  .wyp-column-heading {
    font-size: 9px;
  }
  .wyp-company-mark {
    width: 24px;
    height: 24px;
    font-size: 11px;
  }
  .wyp-board-footer {
    flex-direction: column;
    align-items: center;
    font-size: 8px;
    gap: 8px;
    padding-top: 16px;
  }
  .wyp-horizon {
    margin-top: 40px;
    height: 48px;
  }
  .wyp-page .wyp-chapter h2 {
    font-size: 36px;
  }
  .wyp-panorama {
    padding-top: 32px;
  }
  .wyp-panorama-heading,
  .wyp-lab-heading {
    display: block;
    margin-bottom: 32px;
  }
  .wyp-panorama-heading > p,
  .wyp-lab-heading > p {
    font-size: 12px;
    margin-top: 24px;
    line-height: 1.9;
  }
  .wyp-panorama-heading .wyp-text-link {
    margin-top: 8px;
  }
  .wyp-panorama-artboard {
    padding: 16px;
    margin-inline: -8px;
    border-radius: 8px;
  }
  .wyp-panorama-caption {
    flex-direction: column;
    align-items: start;
    gap: 8px;
    font-size: 8px;
    margin-top: 16px;
  }
  .wyp-editorial-heading {
    display: block;
    margin-bottom: 40px;
  }
  .wyp-editorial-heading > p:last-child {
    font-size: 12px;
    line-height: 1.9;
    margin-top: 24px;
  }
  .wyp-story-steps {
    grid-template-columns: 1fr;
    gap: 64px;
  }
  .wyp-story-step h3 {
    font-size: 28px;
    margin-bottom: 16px;
  }
  .wyp-story-step > p {
    font-size: 13px;
  }
  .wyp-story-step-button {
    font-size: 11px;
    gap: 12px;
    margin-bottom: 20px;
  }
  .wyp-lab-toolbar {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    padding: 12px 0;
  }
  .wyp-lab-tabs {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;
  }
  .wyp-lab-tabs > button {
    font-size: 11px;
    justify-content: center;
    padding: 12px 8px;
  }
  .wyp-all-tools {
    align-self: start;
    padding: 8px 12px;
    font-size: 10px;
  }
  .wyp-lab-grid {
    grid-template-columns: 1fr;
  }
  .is-focused .wyp-lab-card {
    display: flex;
    gap: 24px;
  }
  .wyp-lab-card {
    padding: 20px 16px;
    gap: 24px;
  }
  .wyp-lab-card h3 {
    font-size: 24px;
  }
  .wyp-tool-icon {
    margin-bottom: 16px;
    width: 32px;
    height: 32px;
  }
  .wyp-lab-card-copy > p {
    font-size: 12px;
  }
  .wyp-lab-disclaimer {
    font-size: 9px;
    line-height: 1.8;
  }
  .wyp-page .wyp-statement {
    font-size: clamp(30px, 8vw, 44px);
    margin-bottom: 40px;
  }
  .wyp-inline-landscape {
    width: 56px;
    height: 26px;
    margin-left: 4px;
  }
  .wyp-paper-layout {
    display: block;
  }
  .wyp-paper-intro {
    font-size: 13px;
    max-width: none;
  }
  .wyp-timeline {
    margin-top: 24px;
  }
  .wyp-note-stack {
    margin-top: 64px;
  }
  .wyp-journal {
    padding: 20px;
  }
  .wyp-journal-entry {
    min-height: 310px;
    padding-top: 24px;
  }
  .wyp-journal-entry h3 {
    font-size: 28px;
  }
  .wyp-journal-entry > p:not(.wyp-tiny) {
    font-size: 12px;
  }
  .wyp-journal-controls {
    gap: 8px;
  }
  .wyp-journal-controls > span {
    font-size: 8px;
  }
  .wyp-page #pricing,
  .wyp-page #faq {
    padding-block: 80px;
  }
  .wyp-page #pricing h2,
  .wyp-page #faq h2 {
    font-size: 36px;
  }
  .wyp-page #pricing > div > div:nth-child(2) > div {
    padding: 28px 24px;
  }
  .wyp-page #pricing h3 {
    font-size: 20px;
  }
  .wyp-page #pricing h3 + span {
    font-size: 9px;
    padding: 5px 8px;
  }
  .wyp-page #pricing .text-4xl {
    font-size: 48px;
  }
  .wyp-page #pricing button {
    padding-inline: 16px;
    font-size: 11px;
  }
  .wyp-page #pricing button > span:last-child {
    font-size: 8px;
  }
  .wyp-page #faq button {
    padding-block: 24px;
  }
  .wyp-page #faq button > span:first-child {
    font-size: 13px;
    padding-right: 12px;
  }
  .wyp-page #faq [role="region"] > div > div {
    padding-right: 0;
  }
  .wyp-conversion-grid {
    grid-template-columns: 1fr;
    gap: 56px;
  }
  .wyp-page .wyp-conversion h2 {
    font-size: 36px;
  }
  .wyp-conversion-copy {
    font-size: 13px;
    margin-top: 24px;
  }
  .wyp-email-form {
    margin-top: 24px;
  }
  .wyp-email-form button {
    justify-content: space-between;
    font-size: 12px;
  }
  .wyp-email-form input {
    font-size: 12px;
  }
  .wyp-destination {
    padding: 40px 24px 32px;
    max-width: 360px;
    width: 100%;
    margin-inline: auto;
  }
  .wyp-destination > p {
    font-size: 28px;
  }
  .wyp-dialog {
    padding: 32px 24px;
  }
  .wyp-dialog h2 {
    font-size: 28px;
  }
  .wyp-dialog .wyp-kicker {
    padding-right: 24px;
    font-size: 9px;
  }
  .wyp-page footer {
    padding-block: 64px 32px;
  }
}

/* Base resets & typography */
.wyp-body {
  font-family: var(--font-body);
  background-color: var(--color-wyp-canvas);
  color: var(--color-wyp-obsidian);
  min-height: 100vh;
}

/* Supplied ZIP artboards are preserved as full, flat images. */
.wyp-supplied-artwork {
  display: block;
  width: 100%;
  height: auto;
}
.wyp-hero-artwork {
  overflow: hidden;
  border-radius: 10px;
}
.wyp-hero-artwork figcaption {
  padding-top: 16px;
  font-size: 10px;
  color: #666e7d;
  text-align: center;
}
.wyp-page .wyp-panorama-artboard {
  padding: 0;
  overflow: hidden;
  background: #e5ddd4;
}
.wyp-gallery-frame {
  position: relative;
  aspect-ratio: 2752 / 1536;
}
.wyp-gallery-image {
  position: absolute;
  inset: 0;
  visibility: hidden;
  opacity: 0;
  clip-path: inset(0 0 0 6%);
  transition:
    opacity 0.45s var(--wyp-ease),
    clip-path 0.6s var(--wyp-ease),
    visibility 0.45s;
}
.wyp-gallery-image.is-active {
  visibility: visible;
  opacity: 1;
  clip-path: inset(0);
}
.wyp-artwork-gallery-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}
.wyp-artwork-gallery-tabs button {
  padding: 12px 16px;
  border: 1px solid #d8d0c5;
  border-radius: 6px;
  font-size: 11px;
  transition:
    background 0.3s,
    color 0.3s;
}
.wyp-artwork-gallery-tabs button[aria-pressed="true"] {
  background: #121417;
  color: #f5efeb;
  border-color: #121417;
}
.wyp-artwork-gallery-tabs button:hover {
  background: #e5ddd4;
  color: #121417;
}
.wyp-gallery-caption {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  padding-top: 24px;
}
.wyp-gallery-caption h3 {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: -0.035em;
}
.wyp-gallery-caption p {
  font-size: 12px;
  color: #666e7d;
  line-height: 1.8;
  margin-top: 8px;
}
.wyp-gallery-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}
.wyp-gallery-controls button {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border: 1px solid #d8d0c5;
  border-radius: 50%;
  transition: background 0.3s;
}
.wyp-gallery-controls button:hover {
  background: #e5ddd4;
}
.wyp-gallery-controls > span {
  font-family: var(--font-jetbrains), monospace;
  font-size: 10px;
  color: #666e7d;
}
.wyp-artwork-note {
  color: #666e7d;
  font-size: 10px;
  line-height: 1.8;
  margin-top: 24px;
}
.wyp-page .wyp-story-canvas {
  padding: 0;
  background: transparent;
  min-height: 0;
}
.wyp-story-visual-frame {
  min-height: 0;
  aspect-ratio: 2752 / 1536;
  overflow: hidden;
  border-radius: 8px;
}
.wyp-story-visual .wyp-supplied-artwork {
  height: 100%;
  object-fit: contain;
}
.wyp-mobile-story-visual {
  overflow: hidden;
  border-radius: 8px;
}
.wyp-lab-full-pipeline {
  margin-top: 48px;
}
.wyp-lab-full-pipeline[hidden] {
  display: none;
}
.wyp-page .wyp-paper-layout {
  grid-template-columns: 0.65fr 1.5fr;
  gap: 64px;
}
.wyp-journal-artwork {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
}
.wyp-journal-artwork figcaption {
  padding-top: 16px;
  color: #666e7d;
  font-size: 10px;
}
.wyp-note-under {
  display: none;
}
.wyp-opportunity-note {
  position: relative;
  margin-top: 24px;
}
.wyp-opportunity-note .wyp-journal-entry {
  min-height: 0;
  padding-top: 0;
}
.wyp-opportunity-note .wyp-journal-entry h3 {
  font-size: 24px;
  margin-block: 12px;
}
.wyp-opportunity-note .wyp-journal-next {
  margin-top: 16px;
  padding-top: 12px;
}
.wyp-opportunity-note .wyp-journal-controls {
  margin-top: 16px;
  padding-top: 16px;
}
@media (max-width: 900px) {
  .wyp-page .wyp-paper-layout {
    gap: 32px;
    grid-template-columns: 0.7fr 1.3fr;
  }
}
@media (max-width: 640px) {
  .wyp-hero-artwork {
    margin-inline: -12px;
    border-radius: 6px;
  }
  .wyp-hero-artwork figcaption {
    font-size: 8px;
    padding: 12px;
  }
  .wyp-gallery-caption {
    align-items: start;
    gap: 16px;
  }
  .wyp-gallery-caption h3 {
    font-size: 16px;
  }
  .wyp-gallery-caption p {
    font-size: 10px;
  }
  .wyp-gallery-controls {
    gap: 8px;
  }
  .wyp-gallery-controls button {
    width: 32px;
    height: 32px;
  }
  .wyp-gallery-controls > span {
    font-size: 8px;
  }
  .wyp-artwork-gallery-tabs {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }
  .wyp-artwork-gallery-tabs button {
    padding: 12px 8px;
    font-size: 10px;
  }
  .wyp-artwork-note {
    font-size: 9px;
  }
  .wyp-journal-artwork figcaption {
    font-size: 9px;
  }
}

.wyp-mobile-nav {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100dvh;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: 24px;
  border: 0;
  background: #f5efeb;
  color: #121417;
}
.wyp-mobile-nav::backdrop {
  background: #12141750;
}
.wyp-mobile-nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wyp-mobile-nav-header button {
  padding: 12px;
}
.wyp-mobile-nav nav {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-block: 64px;
}
.wyp-mobile-nav nav a {
  font-size: 32px;
  letter-spacing: -0.05em;
  animation: wyp-note-in 0.45s var(--ease-smooth) both;
}
.wyp-mobile-nav-actions {
  display: grid;
  gap: 24px;
  text-align: center;
}

/* Odometer rolling animation support */
.wyp-odometer-wheel {
  display: inline-flex;
  flex-direction: column;
  overflow: hidden;
  height: 1em;
  line-height: 1;
}

.wyp-odometer-strip {
  transition: transform 420ms var(--ease-smooth);
}

/* Accessible reduced-motion overrides */
@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  [data-parallax] {
    transform: none !important;
  }
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/WaypointApp.tsx">
<![CDATA["use client";

import React from "react";
import { SiteHeader } from "./components/SiteHeader";
import { Hero } from "./components/Hero";
import { BentoGrid } from "./components/BentoGrid";
import { PricingSection } from "./components/PricingSection";
import { FaqSection } from "./components/FaqSection";
import { ConversionCard } from "./components/ConversionCard";
import { Footer } from "./components/Footer";
import { ProductPanorama } from "./components/ProductPanorama";
import { ProductStory } from "./components/ProductStory";
import { PaperTrail } from "./components/PaperTrail";
import { Motion } from "./components/Motion";
import { WorkspaceDialog } from "./components/WorkspaceDialog";

export function WaypointApp() {
  return (
    <Motion>
      <div className="wyp-page min-h-screen bg-[#EDE6DF] text-[#121417]">
        <a className="wyp-skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" className="overflow-x-hidden w-full max-w-full">
          <Hero />
          <ProductPanorama />
          <ProductStory />
          <BentoGrid />
          <PaperTrail />
          <PricingSection />
          <FaqSection />
          <ConversionCard />
        </main>
        <Footer />
        <WorkspaceDialog />
      </div>
    </Motion>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/AccordionItem.tsx">
<![CDATA["use client";

import React from "react";

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

export function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: AccordionItemProps) {
  const contentId = `faq-answer-${index}`;
  const headerId = `faq-header-${index}`;

  return (
    <div className="bg-[#FFFFFF] border border-[#E5DDD4] rounded-xl overflow-hidden transition-all shadow-2xs">
      <button
        id={headerId}
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={onToggle}
        className="w-full py-4.5 px-6 flex items-center justify-between text-left cursor-pointer hover:bg-[#FAF8F5] transition-colors"
      >
        <span className="text-sm md:text-base font-bold text-[#121417] pr-4">
          {question}
        </span>
        <span
          className={`shrink-0 w-6 h-6 rounded-full bg-[#FAF8F5] border border-[#E5DDD4] flex items-center justify-center text-xs font-bold text-[#121417] transition-transform duration-300 ${
            isOpen ? "rotate-180 bg-[#121417] text-[#F5EFEB]" : ""
          }`}
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={headerId}
        aria-hidden={!isOpen}
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5 pt-1 text-xs md:text-sm text-[#2B2F38] leading-relaxed border-t border-[#E5DDD4]/40">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/BentoGrid.tsx">
<![CDATA["use client";

import { useRef, useState, type KeyboardEvent } from "react";
import {
  CalendarBlank,
  EnvelopeSimple,
  LockKey,
  SquaresFour,
} from "@phosphor-icons/react";
import { CalendarWidget } from "./bento/CalendarWidget";
import { KanbanWidget } from "./bento/KanbanWidget";
import { EncryptionWidget } from "./bento/EncryptionWidget";
import { ReplyFeedWidget } from "./bento/ReplyFeedWidget";
import { HeroDashboard } from "./HeroDashboard";

const tools = [
  {
    name: "Interview radar",
    title: "Rounds in focus",
    text: "Select an interview day. Open your preparation notes. Arrive with the right things in mind.",
    icon: CalendarBlank,
    component: CalendarWidget,
  },
  {
    name: "Pipeline",
    title: "One board for every stage",
    text: "Tap an opportunity to move it forward. The board keeps up with the conversation.",
    icon: SquaresFour,
    component: KanbanWidget,
  },
  {
    name: "Privacy",
    title: "Personal, by design",
    text: "Toggle the simulated sealed state. This demonstration does not encrypt or store real data.",
    icon: LockKey,
    component: EncryptionWidget,
  },
  {
    name: "Replies",
    title: "Make room for a reply",
    text: "Simulate an inbound message and explore the thread. Sample conversations, without a connected inbox.",
    icon: EnvelopeSimple,
    component: ReplyFeedWidget,
  },
];

export function BentoGrid() {
  const [selected, setSelected] = useState(-1);
  const tabs = useRef<HTMLDivElement>(null);
  function navigate(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % 4;
    else if (event.key === "ArrowLeft") next = (index + 3) % 4;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 3;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current
      ?.querySelectorAll<HTMLButtonElement>("[role=tab]")
      [next]?.focus();
  }
  return (
    <section id="features" className="wyp-lab wyp-chapter">
      <div className="wyp-container">
        <div className="wyp-lab-heading">
          <div>
            <p className="wyp-kicker">
              <span className="wyp-status-dot" /> Interactive demo
            </p>
            <h2>
              A little less theory.
              <br />A little more trying.
            </h2>
          </div>
          <p>
            Move a card. Pick a day.
            <br />
            Get a feel for your next chapter.
          </p>
        </div>
        <div className="wyp-lab-toolbar">
          <div
            className="wyp-lab-tabs"
            role="tablist"
            aria-label="Flight deck tools"
            ref={tabs}
          >
            {tools.map((tool, i) => (
              <button
                type="button"
                id={`tool-tab-${i}`}
                key={tool.name}
                role="tab"
                aria-selected={selected === i}
                aria-controls={`tool-panel-${i}`}
                tabIndex={selected === i || (selected < 0 && i === 0) ? 0 : -1}
                onClick={() => setSelected(i)}
                onKeyDown={(e) => navigate(e, i)}
              >
                <tool.icon size={17} />
                {tool.name}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={`wyp-all-tools ${selected === -1 ? "is-active" : ""}`}
            aria-pressed={selected === -1}
            onClick={() => setSelected(-1)}
          >
            All tools
          </button>
        </div>
        <div
          className={`wyp-lab-grid grid-flow-dense ${selected >= 0 ? "is-focused" : ""}`}
        >
          {tools.map((tool, i) => (
            <article
              id={`tool-panel-${i}`}
              key={tool.name}
              role={selected >= 0 ? "tabpanel" : undefined}
              aria-labelledby={selected >= 0 ? `tool-tab-${i}` : undefined}
              tabIndex={selected >= 0 ? 0 : undefined}
              hidden={selected >= 0 && selected !== i}
              className="wyp-lab-card"
            >
              <div className="wyp-lab-card-copy">
                <span className="wyp-tool-icon">
                  <tool.icon size={22} weight="light" />
                </span>
                <h3>{tool.title}</h3>
                <p>{tool.text}</p>
              </div>
              <tool.component />
            </article>
          ))}
        </div>
        <div
          className="wyp-lab-full-pipeline"
          hidden={selected >= 0 && selected !== 1}
        >
          <p className="wyp-kicker">Your complete interactive pipeline</p>
          <HeroDashboard />
        </div>
        <p className="wyp-lab-disclaimer">
          A hands-on product demonstration. Sample data stays in this page and
          resets when you reload.
        </p>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/ConversionCard.tsx">
<![CDATA["use client";

import { useState } from "react";
import { ArrowUpRight, Check, NavigationArrow } from "@phosphor-icons/react";

const companies = [
  "Linear",
  "Stripe",
  "Figma",
  "Anthropic",
  "Vercel",
  "Airbnb",
];

export function ConversionCard() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [employer, setEmployer] = useState("Anthropic");
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setError("Enter a valid email address, such as you@domain.com.");
      return;
    }
    setError("");
    setSubmitted(true);
  }
  return (
    <section id="early-access" className="wyp-conversion wyp-chapter">
      <div className="wyp-container wyp-conversion-grid">
        <div>
          <p className="wyp-kicker">
            <NavigationArrow size={16} weight="fill" /> Your next chapter starts
            here
          </p>
          <h2>
            Give every outreach
            <br />
            conversation a<br />
            clear paper trail.
          </h2>
          <p className="wyp-conversion-copy">
            A little less scattered. A little more certain.
            <br />
            Make space for the work you want to do next.
          </p>
          {submitted ? (
            <div className="wyp-form-success" role="status">
              <Check size={20} />
              <div>
                <strong>Your early access preview is ready.</strong>
                <p>
                  {email.trim()} is confirmed in this local demo. No signup or
                  email has been sent.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="wyp-email-form">
              <label className="sr-only" htmlFor="early-access-email">
                Email address
              </label>
              <div>
                <input
                  id="early-access-email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  aria-invalid={Boolean(error)}
                  aria-describedby={
                    error ? "early-access-error" : "early-access-note"
                  }
                  placeholder="Enter your personal work email"
                />
                <button type="submit">
                  Join early access <ArrowUpRight size={18} />
                </button>
              </div>
              {error && (
                <p id="early-access-error" role="alert">
                  {error}
                </p>
              )}
            </form>
          )}
          <p className="wyp-form-note" id="early-access-note">
            Starter stays free. No credit card required.
            <br />
            Local demo only · No information is transmitted.
          </p>
        </div>
        <div className="wyp-destination">
          <span className="wyp-destination-route" aria-hidden="true" />
          <NavigationArrow
            className="wyp-destination-mark"
            size={36}
            weight="light"
          />
          <p>
            Where do you want
            <br />
            to go next?
          </p>
          <div className="wyp-employer-grid">
            {companies.map((name) => (
              <button
                key={name}
                type="button"
                aria-pressed={employer === name}
                onClick={() => setEmployer(name)}
              >
                {name}
                <ArrowUpRight size={14} />
              </button>
            ))}
          </div>
          <div className="wyp-employer-readout" role="status">
            Your next possibility: <strong>{employer}</strong>
          </div>
          <small>
            Illustrative destinations. No affiliation or endorsement.
          </small>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/FaqSection.tsx">
<![CDATA["use client";

import React, { useState } from "react";
import { AccordionItem } from "./AccordionItem";

const FAQ_ITEMS = [
  {
    question: "How does the direct email outreach integration work?",
    answer:
      "Waypoint connects directly to your personal Gmail or Google Workspace inbox via secure OAuth with send-on-behalf permissions. Your outreach sends directly from your personal account, keeping the sender identity personal. This landing page is a product demonstration; no email account is connected here.",
  },
  {
    question: "Is my candidate outreach data kept private from recruiters?",
    answer:
      "Yes. All contact lists, email draft bodies, salary negotiations, and interview round notes are encrypted client-side using local device keys. We never monetize candidate contacts, sell lead data, or train public AI models on your private communications.",
  },
  {
    question: "Can I export my pipeline data to CSV or Notion?",
    answer:
      "At any moment you can export your entire pipeline—including conversation histories, stage timelines, recruiter contact emails, and preparation notes—into structured CSV or JSON format with a single click.",
  },
  {
    question:
      "What happens when I reach the 25 application limit on the free Starter plan?",
    answer:
      "You retain permanent access to view, update, and manage all existing applications and replies. You only need to upgrade to the Professional plan if you choose to expand your outreach volume.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function handleToggle(index: number) {
    setOpenIndex((prev) => (prev === index ? null : index));
  }

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#EDE6DF] relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E5DDD4] text-xs font-bold text-[#1E4F94] mb-3">
            A few things worth knowing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-[-0.035em] text-[#121417] leading-tight mb-4">
            A clearer picture.
          </h2>
          <p className="text-base text-[#2B2F38] leading-relaxed">
            Everything you need to know about direct outreach deliverability,
            encryption privacy, and pipeline ownership.
          </p>
        </div>

        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={index}
              index={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/Footer.tsx">
<![CDATA[import React from "react";

export function Footer() {
  return (
    <footer className="bg-[#16181D] text-[#F5EFEB] pt-20 pb-12 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[#F5EFEB]/10">
          {/* Brand Col */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center rounded-xl bg-[#F5EFEB] text-[#121417] w-7 h-7 shadow-sm">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2L13 13L8 10.5L3 13L8 2Z"
                    fill="#121417"
                    stroke="#121417"
                    strokeWidth="0.5"
                  />
                  <circle cx="8" cy="10.5" r="1" fill="#1E4F94" />
                </svg>
              </div>
              <span className="text-xl font-extrabold tracking-[-0.03em] text-[#F5EFEB]">
                Waypoint
              </span>
            </div>
            <p className="text-xs text-[#F5EFEB]/70 max-w-sm leading-relaxed mb-6">
              The career outreach pipeline for senior software engineers and
              product designers. Pitch directly, track your momentum, and pilot
              your search to the offer stage.
            </p>
            <div className="text-xs text-[#F5EFEB]/50">
              © 2026 Waypoint Systems. All rights reserved.
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#F5EFEB] mb-3">
                Product
              </div>
              <ul className="space-y-2 text-xs text-[#F5EFEB]/70">
                <li>
                  <a href="#features" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pipeline" className="hover:text-white transition">
                    Pipeline Deck
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    data-dialog-title="Pitch Drafter"
                    data-dialog-info="true"
                    className="hover:text-white transition"
                  >
                    Pitch Drafter
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#F5EFEB] mb-3">
                Company
              </div>
              <ul className="space-y-2 text-xs text-[#F5EFEB]/70">
                <li>
                  <button
                    type="button"
                    data-dialog-title="About"
                    data-dialog-info="true"
                    className="hover:text-white transition"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    data-dialog-title="Manifesto"
                    data-dialog-info="true"
                    className="hover:text-white transition"
                  >
                    Manifesto
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    data-dialog-title="Careers"
                    data-dialog-info="true"
                    className="hover:text-white transition"
                  >
                    Careers
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    data-dialog-title="Contact"
                    data-dialog-info="true"
                    className="hover:text-white transition"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#F5EFEB] mb-3">
                Resources
              </div>
              <ul className="space-y-2 text-xs text-[#F5EFEB]/70">
                <li>
                  <button
                    type="button"
                    data-dialog-title="Outreach Guides"
                    data-dialog-info="true"
                    className="hover:text-white transition"
                  >
                    Outreach Guides
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    data-dialog-title="Pitch Templates"
                    data-dialog-info="true"
                    className="hover:text-white transition"
                  >
                    Pitch Templates
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    data-dialog-title="Changelog"
                    data-dialog-info="true"
                    className="hover:text-white transition"
                  >
                    Changelog
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    data-dialog-title="System Status"
                    data-dialog-info="true"
                    className="hover:text-white transition"
                  >
                    System Status
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#F5EFEB] mb-3">
                Legal
              </div>
              <ul className="space-y-2 text-xs text-[#F5EFEB]/70">
                <li>
                  <button
                    type="button"
                    data-dialog-title="Privacy Policy"
                    data-dialog-info="true"
                    className="hover:text-white transition"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    data-dialog-title="Terms of Service"
                    data-dialog-info="true"
                    className="hover:text-white transition"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    data-dialog-title="Security Audit"
                    data-dialog-info="true"
                    className="hover:text-white transition"
                  >
                    Security Audit
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    data-dialog-title="GDPR Compliance"
                    data-dialog-info="true"
                    className="hover:text-white transition"
                  >
                    GDPR Compliance
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Massive Embossed Watermark */}
        <div className="pt-8 select-none pointer-events-none">
          <div className="text-[clamp(4.5rem,14vw,11rem)] font-black text-[#F5EFEB]/[0.05] tracking-[-0.05em] leading-none text-center">
            waypoint
          </div>
        </div>

        <div className="text-[11px] text-[#F5EFEB]/40 text-center pt-4">
          Company marks and logos are depicted for portfolio illustration
          purposes only.
        </div>
      </div>
    </footer>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/Hero.tsx">
<![CDATA["use client";

import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";
import { SuppliedArtwork } from "./SuppliedArtwork";

export function Hero() {
  return (
    <section id="top" className="wyp-hero">
      <div className="wyp-hero-landscape" aria-hidden="true" />
      <div className="wyp-hero-copy wyp-container">
        <p className="wyp-hero-intro">
          A little direction. A world of possibility.
        </p>
        <h1 id="hero-heading" className="max-w-6xl">
          <span className="wyp-line">
            <span data-hero-line>Pitch with intention.</span>
          </span>
          <span className="wyp-line">
            <span data-hero-line>Land the offer.</span>
          </span>
        </h1>
        <p className="wyp-hero-description">
          Your next chapter deserves more than a spreadsheet. A personal flight
          deck for senior engineers and designers, from the first pitch to the
          right offer.
        </p>
        <div className="wyp-hero-actions">
          <a href="#get-started" className="wyp-button wyp-button-dark">
            Start your pipeline <ArrowUpRight size={18} />
          </a>
          <a href="#features" className="wyp-button wyp-button-light">
            Explore the flight deck <ArrowDown size={17} />
          </a>
        </div>
      </div>
      <div className="wyp-hero-deck wyp-container" id="pipeline">
        <div className="wyp-deck-caption">
          <span>Less scattered. More intentional.</span>
          <span>A view of what comes next</span>
        </div>
        <figure className="wyp-hero-artwork">
          <SuppliedArtwork
            id={1}
            priority
            sizes="(max-width: 1200px) 100vw, 1104px"
          />
          <figcaption>
            Waypoint interface concept · Explore the interactive flight deck
            below
          </figcaption>
        </figure>
      </div>
      <div className="wyp-horizon" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/HeroDashboard.tsx">
<![CDATA["use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowCounterClockwise,
  DotsThree,
  NavigationArrow,
} from "@phosphor-icons/react";
import {
  advanceCardStage,
  INITIAL_PIPELINE,
  STAGES,
} from "../lib/pipelineState";

export function HeroDashboard({
  parallaxOffset = 0,
}: {
  parallaxOffset?: number;
}) {
  const [pipeline, setPipeline] = useState(INITIAL_PIPELINE);
  const [announcement, setAnnouncement] = useState("");
  function advance(id: string) {
    const next = advanceCardStage(pipeline, id);
    const card = next.find((c) => c.id === id)!;
    setPipeline(next);
    setAnnouncement(
      `${card.company} moved to ${STAGES.find((s) => s.id === card.stage)!.label}.`,
    );
  }
  return (
    <div
      data-parallax
      className="wyp-dashboard"
      style={{ transform: `translateY(-${parallaxOffset}px)` }}
    >
      <div className="wyp-dashboard-toolbar">
        <div className="wyp-dashboard-title">
          <NavigationArrow weight="fill" size={19} />
          <strong>Active Pipeline</strong>
          <span>/ My next chapter</span>
        </div>
        <button
          type="button"
          className="wyp-reset"
          onClick={() => {
            setPipeline(INITIAL_PIPELINE);
            setAnnouncement("Pipeline reset.");
          }}
        >
          <ArrowCounterClockwise size={14} /> Reset
        </button>
      </div>
      <div className="wyp-board-columns">
        {STAGES.map((stage, i) => {
          const cards = pipeline.filter((c) => c.stage === stage.id);
          return (
            <div
              key={stage.id}
              className="wyp-board-column"
              data-stage={stage.id}
            >
              <div className="wyp-column-heading">
                <span className={`wyp-stage-dot wyp-stage-${i}`} />
                <strong>{stage.label}</strong>
                <span>{cards.length}</span>
                <DotsThree size={20} />
              </div>
              <div className="wyp-column-cards">
                {cards.map((card) => (
                  <button
                    type="button"
                    key={card.id}
                    className="wyp-company-card"
                    onClick={() => advance(card.id)}
                    aria-label={`Advance ${card.company} to next stage`}
                  >
                    <span className={`wyp-company-mark wyp-mark-${card.id}`}>
                      {card.company.slice(0, 1)}
                    </span>
                    <strong>{card.company}</strong>
                    <p>{card.role}</p>
                    <span className="wyp-card-contact">
                      With {card.contactName}
                    </span>
                    {card.highlight && (
                      <span className="wyp-card-highlight">
                        {card.highlight}
                      </span>
                    )}
                    <span className="wyp-card-bottom">
                      <span>{card.daysAgo}d ago</span>
                      <ArrowRight size={14} />
                    </span>
                  </button>
                ))}
                {!cards.length && (
                  <p className="wyp-empty-column">
                    A little room for what comes next.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="wyp-board-footer">
        <span>
          <span className="wyp-status-dot" /> Your search. Your direction.
        </span>
        <span>Sample opportunities · Tap a card to advance</span>
      </div>
      <span className="sr-only" role="status">
        {announcement}
      </span>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/Logo.tsx">
<![CDATA[import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = "", size = 28 }: LogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        className="flex items-center justify-center rounded-xl bg-[#121417] text-[#F5EFEB] shadow-sm transition-transform hover:scale-105"
        style={{ width: size, height: size }}
      >
        <svg
          width={Math.round(size * 0.58)}
          height={Math.round(size * 0.58)}
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 2L13 13L8 10.5L3 13L8 2Z"
            fill="#F5EFEB"
            stroke="#F5EFEB"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
          <circle cx="8" cy="10.5" r="1" fill="#DBE8FA" />
        </svg>
      </div>
      <span className="text-[17px] font-extrabold tracking-[-0.03em] text-[#121417]">
        Waypoint
      </span>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/MobileNav.tsx">
<![CDATA["use client";

import { useEffect, useRef } from "react";
import { X } from "@phosphor-icons/react";
import { Logo } from "./Logo";
import { containDialogFocus } from "../lib/dialogFocus";

export function MobileNav({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (isOpen) dialog.current?.showModal();
    else dialog.current?.close();
    const previous = document.body.style.overflow;
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);
  return (
    <dialog
      ref={dialog}
      id="waypoint-mobile-navigation"
      className="wyp-mobile-nav"
      aria-label="Mobile navigation"
      onKeyDown={containDialogFocus}
      onCancel={onClose}
    >
      <div className="wyp-mobile-nav-header">
        <Logo />
        <button type="button" onClick={onClose} aria-label="Close menu">
          <X size={24} />
        </button>
      </div>
      <nav>
        {[
          { href: "#features", label: "Features" },
          { href: "#pipeline", label: "Pipeline" },
          { href: "#pricing", label: "Pricing" },
          { href: "#faq", label: "FAQ" },
        ].map((link, i) => (
          <a
            href={link.href}
            key={link.href}
            style={{ animationDelay: `${i * 60}ms` }}
            onClick={onClose}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="wyp-mobile-nav-actions">
        <a href="#signin" onClick={onClose}>
          Sign in
        </a>
        <a
          href="#get-started"
          className="wyp-button wyp-button-dark"
          onClick={onClose}
        >
          Get started free
        </a>
      </div>
    </dialog>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/Motion.tsx">
<![CDATA["use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Motion({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hero-line]", {
          yPercent: 110,
          duration: 0.95,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "all",
        });
        gsap.from(".wyp-hero-description, .wyp-hero-actions", {
          opacity: 0,
          y: 14,
          duration: 0.7,
          stagger: 0.1,
          delay: 0.3,
          clearProps: "all",
        });
        gsap.from(".wyp-hero-deck", {
          clipPath: "inset(0 0 35% 0 round 16px)",
          y: 35,
          duration: 1.1,
          delay: 0.2,
          ease: "power3.out",
          clearProps: "all",
        });
        gsap.to(".wyp-hero-landscape", {
          y: 65,
          ease: "none",
          scrollTrigger: {
            trigger: ".wyp-hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
        gsap.fromTo(
          "[data-panorama]",
          { clipPath: "inset(8% 4% 8% 4% round 24px)", scale: 0.96 },
          {
            clipPath: "inset(0% 0% 0% 0% round 16px)",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-panorama]",
              start: "top 90%",
              end: "center 60%",
              scrub: 0.5,
            },
          },
        );
        gsap.from("[data-word]", {
          opacity: 0.14,
          stagger: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: ".wyp-statement",
            start: "top 85%",
            end: "bottom 45%",
            scrub: true,
          },
        });
        gsap.fromTo(
          "[data-route-line]",
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: {
              trigger: ".wyp-timeline",
              start: "top 80%",
              end: "bottom 55%",
              scrub: true,
            },
          },
        );
        gsap.from("[data-stack-note]", {
          y: 55,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: ".wyp-note-stack",
            start: "top 90%",
            end: "center 65%",
            scrub: true,
          },
        });
      });
      let disposed = false;
      document.fonts.ready.then(() => {
        if (!disposed) ScrollTrigger.refresh();
      });
      const observer = new ResizeObserver(() => ScrollTrigger.refresh());
      if (root.current) observer.observe(root.current);
      return () => {
        disposed = true;
        observer.disconnect();
        media.revert();
      };
    },
    { scope: root },
  );
  return <div ref={root}>{children}</div>;
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/OdometerCounter.tsx">
<![CDATA["use client";

import React from "react";
import { formatOdometerDigits } from "../lib/pricingMath";

interface OdometerCounterProps {
  value: number;
  className?: string;
}

export function OdometerCounter({ value, className = "" }: OdometerCounterProps) {
  const digits = formatOdometerDigits(value);
  const DIGIT_SEQUENCE = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  return (
    <span
      aria-label={`$${value}`}
      data-odometer-value={value}
      className={`inline-flex items-baseline font-extrabold ${className}`}
    >
      <span className="mr-0.5" aria-hidden="true">$</span>
      {digits.map((digit, i) => {
        const numIndex = Number(digit);
        const translateY = isNaN(numIndex) ? 0 : -numIndex * 10; // percentage per digit

        return (
          <span
            key={i}
            className="wyp-odometer-wheel relative inline-block overflow-hidden h-[1.1em] leading-none"
            style={{ width: "0.62em" }}
          >
            <span
              className="wyp-odometer-strip inline-flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: `translateY(${translateY}%)`,
              }}
            >
              {DIGIT_SEQUENCE.map((d) => (
                <span
                  key={d}
                  className="h-[1.1em] flex items-center justify-center select-none"
                >
                  {d}
                </span>
              ))}
            </span>
          </span>
        );
      })}
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/PaperTrail.tsx">
<![CDATA["use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
} from "@phosphor-icons/react";
import { SuppliedArtwork } from "./SuppliedArtwork";

const moments = [
  {
    stage: "First pitch",
    date: "October 22",
    title: "Start with something specific.",
    body: "Shared my distributed systems write-up with Elena. Mentioned the scheduling problem their team is working on.",
    next: "Follow up with the benchmark notes.",
  },
  {
    stage: "A real conversation",
    date: "October 28",
    title: "Keep the context close.",
    body: "Elena replied. The team is interested in cluster failover. Bring a practical example, and ask how they measure reliability.",
    next: "Prepare for Wednesday’s architecture discussion.",
  },
  {
    stage: "The next chapter",
    date: "November 05",
    title: "Make the next step yours.",
    body: "Architecture conversation complete. Good alignment on the work. Revisit the team’s priorities and my own before the next round.",
    next: "Send a considered follow-up and a short technical recap.",
  },
];

export function PaperTrail() {
  const [selected, setSelected] = useState(1);
  const moment = moments[selected];
  return (
    <section id="paper-trail" className="wyp-paper-trail wyp-chapter">
      <div className="wyp-container">
        <p className="wyp-kicker">The details make the difference</p>
        <h2 className="wyp-statement">
          {["Every", "conversation"].map((w) => (
            <span data-word key={w}>
              {w}{" "}
            </span>
          ))}
          <span className="wyp-inline-landscape" aria-hidden="true" />
          <br />
          {["has", "a", "next", "step."].map((w) => (
            <span data-word key={w}>
              {w}{" "}
            </span>
          ))}
        </h2>
        <div className="wyp-paper-layout">
          <div>
            <p className="wyp-paper-intro">
              The first note. The detail you almost forgot. The question you
              want to ask next. Give your search a memory, so you can give each
              conversation your attention.
            </p>
            <div className="wyp-timeline">
              <div className="wyp-timeline-line" aria-hidden="true">
                <span data-route-line />
              </div>
              {moments.map((item, i) => (
                <button
                  type="button"
                  key={item.stage}
                  className={`wyp-timeline-moment ${selected === i ? "is-selected" : ""}`}
                  onClick={() => setSelected(i)}
                  aria-pressed={selected === i}
                >
                  <span>
                    {i < selected ? (
                      <Check size={13} />
                    ) : (
                      String(i + 1).padStart(2, "0")
                    )}
                  </span>
                  <div>
                    <strong>{item.stage}</strong>
                    <small>{item.date}</small>
                  </div>
                  <ArrowUpRight size={17} />
                </button>
              ))}
            </div>
          </div>
          <div className="wyp-note-stack">
            <div className="wyp-note-under" data-stack-note />
            <div className="wyp-note-under" data-stack-note />
            <figure className="wyp-journal-artwork">
              <SuppliedArtwork id={10} />
              <figcaption>Supplied journal workspace concept</figcaption>
            </figure>
            <article
              className="wyp-opportunity-note"
              aria-label="Sample opportunity notes"
            >
              <div key={selected} className="wyp-journal-entry">
                <p className="wyp-tiny">
                  {moment.date} · {moment.stage}
                </p>
                <h3>{moment.title}</h3>
                <p>{moment.body}</p>
                <div className="wyp-journal-next">
                  <span className="wyp-tiny">A clear next step</span>
                  <p>{moment.next}</p>
                </div>
              </div>
              <div className="wyp-journal-controls">
                <span>
                  Illustrative notes · {String(selected + 1).padStart(2, "0")} /
                  03
                </span>
                <div>
                  <button
                    type="button"
                    aria-label="Previous opportunity note"
                    onClick={() => setSelected((selected + 2) % 3)}
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    type="button"
                    aria-label="Next opportunity note"
                    onClick={() => setSelected((selected + 1) % 3)}
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/PricingCard.tsx">
<![CDATA["use client";

import React from "react";
import { BillingCadence, calculatePlanPrice, PlanId } from "../lib/pricingMath";
import { OdometerCounter } from "./OdometerCounter";

interface PricingCardProps {
  planId: PlanId;
  cadence: BillingCadence;
  title: string;
  tagline: string;
  badge?: string;
  badgeStyle?: "free" | "popular" | "studio";
  features: string[];
  ctaText: string;
  isPopular?: boolean;
}

export function PricingCard({
  planId,
  cadence,
  title,
  tagline,
  badge,
  badgeStyle = "popular",
  features,
  ctaText,
  isPopular = false,
}: PricingCardProps) {
  const priceData = calculatePlanPrice(planId, cadence);

  return (
    <div
      className={`rounded-2xl p-7 md:p-8 flex flex-col justify-between transition-all ${
        isPopular
          ? "bg-[#FFFFFF] border-2 border-[#1E4F94] shadow-xl md:-translate-y-2 relative"
          : "bg-[#FFFFFF] border border-[#E5DDD4] shadow-xs hover:border-[#D8D0C5]"
      }`}
    >
      <div>
        {/* Card Header & Badge */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-xl font-extrabold text-[#121417]">{title}</h3>
          {badge && (
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                badgeStyle === "free"
                  ? "bg-[#D8EADF] text-[#216143]"
                  : badgeStyle === "popular"
                    ? "bg-[#DBE8FA] text-[#1E4F94]"
                    : "bg-[#FAF8F5] text-[#2B2F38] border border-[#E5DDD4]"
              }`}
            >
              {badge}
            </span>
          )}
        </div>

        <p className="text-xs text-[#666E7D] mb-6 leading-relaxed">{tagline}</p>

        {/* Dynamic Odometer Price */}
        <div className="flex items-baseline gap-1.5 mb-6">
          <OdometerCounter
            value={priceData.amount}
            className="text-4xl sm:text-5xl font-black text-[#121417] tracking-tight"
          />
          <span className="text-xs font-semibold text-[#666E7D]">
            {priceData.cadenceText}
          </span>
        </div>

        {cadence === "annual" && planId !== "starter" && (
          <p className="text-xs text-[#666E7D] mb-5">
            Billed ${priceData.amount * 12} yearly. Save $
            {((planId === "pro" ? 28 : 58) - priceData.amount) * 12} a year.
          </p>
        )}

        {/* Feature List */}
        <div className="space-y-3 pt-6 border-t border-[#E5DDD4]">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 text-xs text-[#2B2F38]"
            >
              <span className="text-[#216143] font-bold text-sm leading-none shrink-0">
                ✓
              </span>
              <span className="leading-normal">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-8 pt-4">
        <a
          href="#get-started"
          data-dialog-title={`Explore ${title}${planId !== "starter" ? ` ($${priceData.amount}/month, ${cadence})` : ""}`}
          className={`w-full py-3 px-4 rounded-xl text-xs font-bold text-center block transition-all ${
            isPopular
              ? "bg-[#121417] text-[#F5EFEB] shadow-md hover:bg-[#2B2F38]"
              : "bg-[#FAF8F5] text-[#121417] border border-[#E5DDD4] hover:bg-[#E5DDD4]/60"
          }`}
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/PricingSection.tsx">
<![CDATA["use client";

import React, { useState } from "react";
import { BillingCadence } from "../lib/pricingMath";
import { PricingCard } from "./PricingCard";

export function PricingSection() {
  const [cadence, setCadence] = useState<BillingCadence>("monthly");

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#EDE6DF] relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E5DDD4] text-xs font-bold text-[#1E4F94] mb-3">
            Room to begin. Space to grow.
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.035em] text-[#121417] leading-tight mb-4">
            Transparent while you search.
          </h2>
          <p className="text-base text-[#2B2F38] leading-relaxed">
            No agency middleman taking 25% of your signing bonus. You write the
            pitches, you own the relationship, and your first 25 tracked
            applications cost nothing.
          </p>

          {/* Cadence Switcher */}
          <div className="mt-8 inline-flex items-center p-1 rounded-full bg-[#E5DDD4] border border-[#D8D0C5]">
            <button
              type="button"
              onClick={() => setCadence("monthly")}
              aria-pressed={cadence === "monthly"}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                cadence === "monthly"
                  ? "bg-[#FFFFFF] text-[#121417] shadow-xs"
                  : "text-[#666E7D] hover:text-[#121417]"
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setCadence("annual")}
              aria-pressed={cadence === "annual"}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                cadence === "annual"
                  ? "bg-[#FFFFFF] text-[#121417] shadow-xs"
                  : "text-[#666E7D] hover:text-[#121417]"
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D8EADF] text-[#216143]">
                Annual savings
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch max-w-5xl mx-auto">
          <PricingCard
            planId="starter"
            cadence={cadence}
            title="Starter"
            tagline="For engineers tracking their initial outreach and warm intros."
            badge="Permanent Free"
            badgeStyle="free"
            features={[
              "25 active tracked applications a month",
              "Verified personal Gmail/OAuth integration",
              "Standard follow-up pacing reminders",
              "Direct company contact directory",
              "Client-side local encryption",
            ]}
            ctaText="Get started free"
          />

          <PricingCard
            planId="pro"
            cadence={cadence}
            title="Professional"
            tagline="For focused job hunts across multiple companies and stages."
            badge="Most Popular"
            badgeStyle="popular"
            isPopular
            features={[
              "350 tracked applications a month",
              "AI pitch personalization tailored to company",
              "Automated multi-step reply sequences",
              "Read receipts & recruiter view telemetry",
              "Calendar round prep notes & checklist sync",
              "Priority support & direct pipeline import",
            ]}
            ctaText="Start 14-day trial"
          />

          <PricingCard
            planId="studio"
            cadence={cadence}
            title="Studio & Coaching"
            tagline="For career coaches, bootcamps, and shared pipeline mentoring."
            badge="Team Scale"
            badgeStyle="studio"
            features={[
              "Unlimited applications and outreach sends",
              "Custom domain sender addresses (SPF/DKIM)",
              "Shared pipeline collaboration & notes",
              "Priority AI drafting & review queue",
              "Calendar interview link routing",
              "Bulk CSV and Notion export sync",
            ]}
            ctaText="Join the waitlist"
          />
        </div>

        <p className="mt-12 text-center text-xs text-[#666E7D]">
          Illustrative plan information. No purchase or subscription is created
          by this demo.
        </p>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/ProductPanorama.tsx">
<![CDATA["use client";

import { useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { SuppliedArtwork, type ArtworkId } from "./SuppliedArtwork";

const views: { id: ArtworkId; title: string; description: string }[] = [
  {
    id: 9,
    title: "The bigger picture",
    description:
      "A considered collection of the details that make a workspace feel calm.",
  },
  {
    id: 3,
    title: "The details, together",
    description: "Notes, context, and the next conversation, held in one view.",
  },
  {
    id: 6,
    title: "Small things, considered",
    description:
      "A closer look at the interface, on its original warm paper canvas.",
  },
  {
    id: 7,
    title: "A change of scenery",
    description: "The same visual language, imagined for a smaller screen.",
  },
];

export function ProductPanorama() {
  const [selected, setSelected] = useState(0);
  return (
    <section className="wyp-panorama wyp-chapter" id="overview">
      <div className="wyp-container">
        <div className="wyp-panorama-heading">
          <div>
            <p className="wyp-kicker">Find your bearings</p>
            <h2>
              Your search,
              <br />
              in one place.
            </h2>
          </div>
          <p>
            Not another tab to keep open.
            <br />A place to bring it all together.
            <br />
            <a className="wyp-text-link" href="#story">
              Follow the journey <ArrowDown size={16} />
            </a>
          </p>
        </div>
        <div
          className="wyp-artwork-gallery"
          aria-label="Waypoint concept artwork"
        >
          <div
            className="wyp-artwork-gallery-tabs"
            role="group"
            aria-label="Choose an artwork view"
          >
            {views.map((view, i) => (
              <button
                type="button"
                key={view.id}
                onClick={() => setSelected(i)}
                aria-pressed={selected === i}
              >
                {view.title}
              </button>
            ))}
          </div>
          <div className="wyp-panorama-artboard" data-panorama>
            <div className="wyp-gallery-frame">
              {views.map((view, i) => (
                <div
                  key={view.id}
                  className={`wyp-gallery-image ${selected === i ? "is-active" : ""}`}
                  aria-hidden={selected !== i}
                >
                  <SuppliedArtwork
                    id={view.id}
                    sizes="(max-width: 1280px) 100vw, 1200px"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="wyp-gallery-caption">
            <div aria-live="polite">
              <h3>{views[selected].title}</h3>
              <p>{views[selected].description}</p>
            </div>
            <div className="wyp-gallery-controls">
              <button
                type="button"
                aria-label="Previous concept artwork"
                onClick={() =>
                  setSelected((selected + views.length - 1) % views.length)
                }
              >
                <ArrowLeft size={18} />
              </button>
              <span>{String(selected + 1).padStart(2, "0")} / 04</span>
              <button
                type="button"
                aria-label="Next concept artwork"
                onClick={() => setSelected((selected + 1) % views.length)}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
        <p className="wyp-artwork-note">
          Supplied interface concepts, including hiring-side sample screens.
          Explore Waypoint’s working job-search demos below.
        </p>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/ProductStory.tsx">
<![CDATA["use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "@phosphor-icons/react";
import { SuppliedArtwork, type ArtworkId } from "./SuppliedArtwork";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  {
    title: "Rounds in focus.",
    short: "Prepare",
    text: "Walk into the conversation with a clear head. Keep the date, the people, and your preparation right beside the opportunity.",
  },
  {
    title: "One board. Every stage.",
    short: "Navigate",
    text: "From a hopeful first pitch to an offer worth considering. See where each conversation stands, and choose your next move.",
  },
  {
    title: "A reply. A new possibility.",
    short: "Connect",
    text: "Keep the conversation close. Bring replies and follow-up context together, so a promising introduction never disappears in your inbox.",
  },
  {
    title: "Personal stays personal.",
    short: "Own it",
    text: "Your contacts, your notes, your next chapter. Explore the privacy demo and see how sealed and readable states are represented.",
  },
];

const storyArtwork: ArtworkId[] = [5, 2, 4, 6];

export function StoryVisual({ index }: { index: number }) {
  return <SuppliedArtwork id={storyArtwork[index]} />;
}

export function ProductStory() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        "(min-width: 1024px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)",
        () => {
          const articles = gsap.utils.toArray<HTMLElement>(
            ".wyp-story-step",
            root.current,
          );
          ScrollTrigger.create({
            trigger: ".wyp-story-body",
            start: "top 130px",
            end: "bottom bottom-=80px",
            pin: ".wyp-story-canvas",
            pinSpacing: false,
            invalidateOnRefresh: true,
          });
          articles.forEach((article, i) =>
            ScrollTrigger.create({
              trigger: article,
              start: "top 52%",
              end: "bottom 52%",
              onEnter: () => setActive(i),
              onEnterBack: () => setActive(i),
            }),
          );
        },
      );
      return () => media.revert();
    },
    { scope: root },
  );

  function selectStep(index: number) {
    setActive(index);
    const element =
      root.current?.querySelectorAll<HTMLElement>(".wyp-story-step")[index];
    if (!element) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const top =
      window.scrollY +
      element.getBoundingClientRect().top -
      Math.min(220, window.innerHeight * 0.24);
    window.scrollTo({ top, behavior: reduce ? "instant" : "smooth" });
  }

  return (
    <section id="story" className="wyp-story wyp-chapter" ref={root}>
      <div className="wyp-container">
        <div className="wyp-editorial-heading">
          <p className="wyp-kicker">A little clarity goes a long way</p>
          <h2>
            From first pitch
            <br />
            to real momentum.
          </h2>
          <p>
            One considered step at a time.
            <br />A calmer way to find what comes next.
          </p>
        </div>
        <div className="wyp-story-body">
          <div className="wyp-story-steps">
            {steps.map((step, i) => (
              <article
                className={`wyp-story-step ${active === i ? "is-active" : ""}`}
                key={step.short}
              >
                <button
                  type="button"
                  onClick={() => selectStep(i)}
                  aria-current={active === i ? "step" : undefined}
                  className="wyp-story-step-button"
                >
                  <span className="wyp-route-marker">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{step.short}</span>
                  <ArrowUpRight size={18} />
                </button>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <a href="#features" className="wyp-text-link">
                  Try it yourself <ArrowUpRight size={15} />
                </a>
                <div className="wyp-mobile-story-visual">
                  <StoryVisual index={i} />
                </div>
              </article>
            ))}
          </div>
          <div
            className="wyp-story-canvas"
            aria-label="Illustrative workflow preview"
          >
            <div className="wyp-canvas-label">
              <span>Waypoint / The way forward</span>
              <span>{String(active + 1).padStart(2, "0")} / 04</span>
            </div>
            <div className="wyp-story-visual-frame">
              {steps.map((step, i) => (
                <div
                  key={step.short}
                  className={`wyp-story-visual ${active === i ? "is-active" : ""}`}
                  aria-hidden={active !== i}
                >
                  <StoryVisual index={i} />
                </div>
              ))}
            </div>
            <div
              className="wyp-story-progress"
              aria-label="Choose a workflow stage"
            >
              {steps.map((step, i) => (
                <button
                  type="button"
                  key={step.short}
                  onClick={() => selectStep(i)}
                  aria-label={`Show ${step.short}`}
                  aria-pressed={active === i}
                >
                  <span className={active >= i ? "is-complete" : ""} />
                  <span className="wyp-progress-label">{step.short}</span>
                </button>
              ))}
            </div>
            <p className="wyp-canvas-footnote">
              Supplied concept artwork. The live tools are just ahead.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/SiteHeader.tsx">
<![CDATA["use client";

import React, { useState } from "react";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#F5EFEB]/85 backdrop-blur-md border-b border-[#121417]/06 transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <Logo size={28} />
        </a>

        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium text-[#2B2F38]">
          <a
            href="#features"
            className="hover:text-[#121417] transition-colors"
          >
            Features
          </a>
          <a
            href="#pipeline"
            className="hover:text-[#121417] transition-colors"
          >
            Pipeline
          </a>
          <a href="#pricing" className="hover:text-[#121417] transition-colors">
            Pricing
          </a>
          <a href="#faq" className="hover:text-[#121417] transition-colors">
            FAQ
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href="#signin"
            className="text-[14px] font-semibold text-[#2B2F38] hover:text-[#121417] px-3 py-1.5 transition-colors"
          >
            Sign in
          </a>
          <a
            href="#get-started"
            className="inline-flex items-center justify-center text-[13px] font-bold bg-[#121417] text-[#F5EFEB] px-4 py-2 rounded-full shadow-sm hover:bg-[#2B2F38] hover:shadow transition-all"
          >
            Start free
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="md:hidden p-2 rounded-lg text-[#121417] hover:bg-[#E5DDD4] transition"
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="waypoint-mobile-navigation"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>

      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/SuppliedArtwork.tsx">
<![CDATA[const artwork = {
  1: {
    key: "waypoint-01-hero-dashboard",
    alt: "Supplied Waypoint dashboard concept with a front-facing pipeline, tasks, and activity panel.",
  },
  2: {
    key: "waypoint-02-pipeline-board",
    alt: "Supplied Waypoint pipeline board concept with saved, applied, screening, interview, and offer columns.",
  },
  3: {
    key: "waypoint-03-candidate-profile",
    alt: "Supplied Waypoint profile concept with contextual notes, a checklist, and a stage tracker.",
  },
  4: {
    key: "waypoint-04-outreach-workspace",
    alt: "Supplied Waypoint outreach workspace concept showing a message draft and follow-up panels.",
  },
  5: {
    key: "waypoint-05-insights-dashboard",
    alt: "Supplied Waypoint insights concept with charts and illustrative hiring metrics.",
  },
  6: {
    key: "waypoint-06-ui-fragments",
    alt: "Supplied Waypoint interface fragments on their original opaque sand and topographic background.",
  },
  7: {
    key: "waypoint-07-mobile-screens",
    alt: "Supplied Waypoint mobile screen concepts presented as four flat interface panels.",
  },
  8: {
    key: "waypoint-08-topographic-background",
    alt: "Supplied Waypoint sand-colored topographic artwork.",
  },
  9: {
    key: "waypoint-09-feature-collage",
    alt: "Supplied Waypoint feature collage combining profile, pipeline, tasks, and activity concepts.",
  },
  10: {
    key: "waypoint-10-journal-workspace",
    alt: "Supplied Waypoint journal workspace concept with a central writing area and saved observations.",
  },
} as const;

export type ArtworkId = keyof typeof artwork;

export function SuppliedArtwork({
  id,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 800px",
  className = "",
}: {
  id: ArtworkId;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  const image = artwork[id];
  const base = `/templates/waypoint/${image.key}`;
  return (
    // These are optimized copies of the supplied ZIP artwork; the images are never reconstructed or relabeled.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={`wyp-supplied-artwork ${className}`}
      src={`${base}-1600.webp`}
      srcSet={`${base}-800.webp 800w, ${base}-1600.webp 1600w`}
      sizes={sizes}
      width={2752}
      height={1536}
      alt={image.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      data-supplied-artwork={id}
    />
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/WorkspaceDialog.tsx">
<![CDATA["use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "@phosphor-icons/react";
import { containDialogFocus } from "../lib/dialogFocus";

export function WorkspaceDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [title, setTitle] = useState("Start your Waypoint pipeline");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("Anthropic");
  const [role, setRole] = useState("Staff Systems Engineer");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [info, setInfo] = useState(false);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    function restoreScroll() {
      document.body.style.overflow = "";
    }
    const observer = new MutationObserver(() => {
      document.body.style.overflow = element?.open ? "hidden" : "";
    });
    observer.observe(element, { attributes: true, attributeFilter: ["open"] });
    element.addEventListener("close", restoreScroll);
    return () => {
      observer.disconnect();
      element.removeEventListener("close", restoreScroll);
      restoreScroll();
    };
  }, []);
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(
              "a[href='#get-started'], a[href='#signin'], [data-dialog-title]",
            )
          : null;
      if (!target) return;
      event.preventDefault();
      setTitle(
        target.dataset.dialogTitle ||
          (target.getAttribute("href") === "#signin"
            ? "Welcome back to Waypoint"
            : "Start your Waypoint pipeline"),
      );
      setInfo(Boolean(target.dataset.dialogInfo));
      setDone(false);
      setError("");
      dialog.current?.showModal();
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);
  return (
    <dialog
      className="wyp-dialog"
      ref={dialog}
      aria-labelledby="workspace-title"
      onKeyDown={containDialogFocus}
      onClick={(event) => {
        if (event.target === dialog.current) dialog.current.close();
      }}
    >
      <button
        type="button"
        className="wyp-dialog-close"
        aria-label="Close workspace dialog"
        onClick={() => dialog.current?.close()}
      >
        <X size={22} />
      </button>
      <p className="wyp-kicker">Waypoint / Workspace preview</p>
      <h2 id="workspace-title">{title}</h2>
      {info ? (
        <>
          <p>
            This page is a Waypoint product demonstration. No live accounts,
            email integrations, purchases, encryption service, or published
            legal documents are connected.
          </p>
          <p>
            Explore the working pipeline, interview calendar, reply simulation,
            and privacy controls in the flight deck.
          </p>
          <button
            type="button"
            className="wyp-button wyp-button-dark"
            onClick={() => dialog.current?.close()}
          >
            Back to Waypoint
          </button>
        </>
      ) : done ? (
        <div role="status">
          <h3>Your preview is ready.</h3>
          <p>
            A sample pipeline for <strong>{company}</strong>, pursuing{" "}
            <strong>{role}</strong>. This is a local preview for {email}. No
            account was created and no email was sent.
          </p>
          <button
            type="button"
            className="wyp-button wyp-button-dark"
            onClick={() => {
              dialog.current?.close();
              document.getElementById("pipeline")?.scrollIntoView();
            }}
          >
            Explore the flight deck <ArrowUpRight size={18} />
          </button>
        </div>
      ) : (
        <>
          <p>
            Give your next chapter a starting point. Try the local workspace
            preview.
          </p>
          <form
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
                setError("Enter a valid email address.");
                return;
              }
              setError("");
              setDone(true);
            }}
          >
            <label htmlFor="workspace-email">Your email address</label>
            <input
              id="workspace-email"
              autoComplete="email"
              type="email"
              maxLength={254}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "workspace-error" : undefined}
              placeholder="you@domain.com"
            />
            <label htmlFor="workspace-company">First target company</label>
            <input
              id="workspace-company"
              value={company}
              maxLength={100}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
            <label htmlFor="workspace-role">Target role</label>
            <input
              id="workspace-role"
              value={role}
              maxLength={100}
              onChange={(e) => setRole(e.target.value)}
              required
            />
            {error && (
              <p role="alert" id="workspace-error">
                {error}
              </p>
            )}
            <button type="submit" className="wyp-button wyp-button-dark">
              Preview my workspace <ArrowUpRight size={18} />
            </button>
          </form>
          <small>
            Local browser demo. No data is sent or stored after reload.
          </small>
        </>
      )}
    </dialog>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/hooks/useParallax.ts">
<![CDATA["use client";

import { useEffect, useState } from "react";
import { calculateParallaxOffset } from "../lib/parallaxMath";

export function useParallax(maxOffset: number = 110, factor: number = 0.22): number {
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    // Graceful fallback for prefers-reduced-motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOffset(0);
      return;
    }

    let rafId: number | null = null;

    function handleScroll() {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        const currentY = window.scrollY || window.pageYOffset || 0;
        setOffset(calculateParallaxOffset(currentY, maxOffset, factor));
        rafId = null;
      });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [maxOffset, factor]);

  return offset;
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/lib/dialogFocus.ts">
<![CDATA[import type { KeyboardEvent } from "react";

/** Keep Tab navigation inside the dialog, including at the browser chrome boundary. */
export function containDialogFocus(event: KeyboardEvent<HTMLDialogElement>) {
  if (event.key !== "Tab") return;
  const controls = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex="0"]',
    ),
  ).filter((element) => element.getClientRects().length > 0);
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (!first) return;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/lib/parallaxMath.ts">
<![CDATA[export function calculateParallaxOffset(
  scrollY: number,
  maxOffset: number = 110,
  factor: number = 0.22
): number {
  if (scrollY <= 0) return 0;
  const rawOffset = scrollY * factor;
  return Math.min(rawOffset, maxOffset);
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/lib/pipelineState.ts">
<![CDATA[export type PipelineStage = "pitched" | "in_review" | "panel_round" | "offer_stage";

export interface PipelineCard {
  id: string;
  company: string;
  role: string;
  stage: PipelineStage;
  daysAgo: number;
  highlight?: string;
  contactName?: string;
}

export const STAGES: { id: PipelineStage; label: string }[] = [
  { id: "pitched", label: "Pitched" },
  { id: "in_review", label: "In Review" },
  { id: "panel_round", label: "Panel Round" },
  { id: "offer_stage", label: "Offer Stage" },
];

export const INITIAL_PIPELINE: PipelineCard[] = [
  {
    id: "linear",
    company: "Linear",
    role: "Staff Design Engineer",
    stage: "pitched",
    daysAgo: 2,
    contactName: "Karri",
  },
  {
    id: "stripe",
    company: "Stripe",
    role: "Core Infra Engineer",
    stage: "pitched",
    daysAgo: 4,
    contactName: "David",
  },
  {
    id: "figma",
    company: "Figma",
    role: "Founding Systems Engineer",
    stage: "in_review",
    daysAgo: 7,
    contactName: "Rasmus",
  },
  {
    id: "vercel",
    company: "Vercel",
    role: "Lead Framework Architect",
    stage: "panel_round",
    daysAgo: 11,
    contactName: "Guillermo",
    highlight: "Architecture sync",
  },
  {
    id: "anthropic",
    company: "Anthropic",
    role: "Research Systems",
    stage: "offer_stage",
    daysAgo: 14,
    highlight: "$420k Total Comp",
    contactName: "Elena",
  },
];

const STAGE_ORDER: PipelineStage[] = ["pitched", "in_review", "panel_round", "offer_stage"];

export function advanceCardStage(pipeline: PipelineCard[], cardId: string): PipelineCard[] {
  return pipeline.map((card) => {
    if (card.id !== cardId) return card;
    const currentIndex = STAGE_ORDER.indexOf(card.stage);
    const nextIndex = (currentIndex + 1) % STAGE_ORDER.length;
    return {
      ...card,
      stage: STAGE_ORDER[nextIndex],
    };
  });
}

export function countByStage(pipeline: PipelineCard[]): Record<PipelineStage, number> {
  const initialCounts: Record<PipelineStage, number> = {
    pitched: 0,
    in_review: 0,
    panel_round: 0,
    offer_stage: 0,
  };

  return pipeline.reduce((acc, card) => {
    acc[card.stage] = (acc[card.stage] || 0) + 1;
    return acc;
  }, initialCounts);
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/lib/pricingMath.ts">
<![CDATA[export type BillingCadence = "monthly" | "annual";
export type PlanId = "starter" | "pro" | "studio";

export interface PlanPriceResult {
  amount: number;
  formatted: string;
  cadenceText: string;
}

export function calculatePlanPrice(plan: PlanId, cadence: BillingCadence): PlanPriceResult {
  switch (plan) {
    case "starter":
      return {
        amount: 0,
        formatted: "$0",
        cadenceText: "/ permanent free",
      };
    case "pro":
      return {
        amount: cadence === "annual" ? 22 : 28,
        formatted: cadence === "annual" ? "$22" : "$28",
        cadenceText: cadence === "annual" ? "/ a month billed annually" : "/ a month",
      };
    case "studio":
      return {
        amount: cadence === "annual" ? 48 : 58,
        formatted: cadence === "annual" ? "$48" : "$58",
        cadenceText: cadence === "annual" ? "/ a month billed annually" : "/ a month",
      };
  }
}

export function formatOdometerDigits(amount: number): string[] {
  return String(amount).split("");
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/bento/CalendarWidget.tsx">
<![CDATA["use client";

import React, { useState } from "react";

interface InterviewSchedule {
  day: number;
  company: string;
  round: string;
  status: string;
  notes: string;
}

const SCHEDULES: Record<number, InterviewSchedule> = {
  5: {
    day: 5,
    company: "Anthropic",
    round: "Architecture & Distributed Systems",
    status: "In 2 days",
    notes: "Review consensus algorithms and cluster failover topologies.",
  },
  8: {
    day: 8,
    company: "Linear",
    round: "Design Engineering Craft Sync",
    status: "Next Monday",
    notes: "Present interaction prototypes and desktop keybinding hierarchy.",
  },
  12: {
    day: 12,
    company: "Figma",
    round: "Founding Systems Interview",
    status: "In 9 days",
    notes: "Deep dive into canvas rendering pipelines and WASM memory limits.",
  },
};

export function CalendarWidget() {
  const [selectedDay, setSelectedDay] = useState<number>(5);
  const [completed, setCompleted] = useState<Record<number, boolean>>({});
  const activeSchedule = SCHEDULES[selectedDay];

  const days = [31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  return (
    <div className="bg-[#FAF8F5] rounded-xl p-4 md:p-5 border border-[#E5DDD4]">
      {/* Month Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5DDD4]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#121417]">November</span>
          <span className="text-[11px] text-[#666E7D]">Week 45</span>
        </div>
        <span className="text-[10px] font-semibold text-[#8A3E1B] bg-[#FCE8DC] px-2 py-0.5 rounded-full">
          3 Interviews Scheduled
        </span>
      </div>

      {/* Weekday Grid */}
      <div className="grid grid-cols-7 gap-1.5 text-center mb-4">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span
            key={i}
            className="text-[10px] font-bold text-[#666E7D] uppercase"
          >
            {d}
          </span>
        ))}
        {days.map((day) => {
          const hasInterview = Boolean(SCHEDULES[day]);
          const isSelected = selectedDay === day;
          const isPastMonth = day === 31;

          return (
            <button
              key={day}
              type="button"
              aria-pressed={isSelected}
              disabled={!hasInterview}
              onClick={() => hasInterview && setSelectedDay(day)}
              className={`h-7 rounded text-xs font-semibold flex items-center justify-center transition-all ${
                isPastMonth
                  ? "text-[#666E7D]/40 pointer-events-none"
                  : isSelected
                    ? "bg-[#121417] text-[#F5EFEB] shadow-xs"
                    : hasInterview
                      ? "bg-[#DBE8FA] text-[#1E4F94] hover:bg-[#DBE8FA]/80 cursor-pointer font-bold"
                      : "text-[#2B2F38] hover:bg-[#E5DDD4]/50"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Active Schedule Card */}
      {activeSchedule ? (
        <div className="bg-[#FFFFFF] border border-[#DBE8FA] rounded-lg p-3 shadow-xs">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-bold text-[#121417]">
              {activeSchedule.company} • {activeSchedule.round}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FCE8DC] text-[#8A3E1B]">
              {activeSchedule.status}
            </span>
          </div>
          <label className="flex items-start gap-2 text-[11px] text-[#666E7D] leading-relaxed cursor-pointer mt-2">
            <input
              type="checkbox"
              checked={Boolean(completed[selectedDay])}
              onChange={() =>
                setCompleted((prev) => ({
                  ...prev,
                  [selectedDay]: !prev[selectedDay],
                }))
              }
              className="mt-0.5 accent-[#216143]"
            />
            <span className={completed[selectedDay] ? "line-through" : ""}>
              {activeSchedule.notes}
            </span>
          </label>
        </div>
      ) : (
        <div className="bg-[#FFFFFF] border border-[#E5DDD4] rounded-lg p-3 text-center text-xs text-[#666E7D]">
          Select an interview day above to preview preparation notes.
        </div>
      )}
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/bento/EncryptionWidget.tsx">
<![CDATA["use client";

import React, { useState } from "react";
import { ShieldCheck } from "@phosphor-icons/react";

export function EncryptionWidget() {
  const [isEncrypted, setIsEncrypted] = useState<boolean>(true);

  return (
    <div className="bg-[#FAF8F5] rounded-xl p-4 md:p-5 border border-[#E5DDD4] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5DDD4]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ECE6F6] text-[#4B3878] flex items-center justify-center font-bold text-sm shadow-xs">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="text-xs font-bold text-[#121417]">
                Client Cryptography
              </div>
              <div className="text-[10px] text-[#666E7D]">
                AES-GCM-256 local key store
              </div>
            </div>
          </div>
          <button
            type="button"
            aria-pressed={isEncrypted}
            onClick={() => setIsEncrypted((prev) => !prev)}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              isEncrypted
                ? "bg-[#D8EADF] text-[#216143] border border-[#216143]/20"
                : "bg-[#FCE8DC] text-[#8A3E1B] border border-[#8A3E1B]/20"
            }`}
          >
            {isEncrypted ? "E2EE Active" : "Unsealed"}
          </button>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E5DDD4] rounded-lg p-3 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#666E7D]">Zero Telemetry Policy</span>
            <span className="font-bold text-[#216143]">Enforced</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#666E7D]">Email Body Encryption</span>
            <span className="font-bold text-[#121417]">
              {isEncrypted ? "Client-Only Decrypt" : "Plaintext Cached"}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#666E7D]">Target Contact Scraping</span>
            <span className="font-bold text-[#121417]">
              Zero Third-Party Sync
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 text-[10px] text-[#666E7D] text-center">
        Simulated privacy states only. No real encryption is performed.
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/bento/KanbanWidget.tsx">
<![CDATA["use client";

import React, { useState } from "react";
import {
  advanceCardStage,
  INITIAL_PIPELINE,
  PipelineCard,
  STAGES,
} from "../../lib/pipelineState";

export function KanbanWidget() {
  const [pipeline, setPipeline] = useState<PipelineCard[]>(INITIAL_PIPELINE);

  function handleCardClick(cardId: string) {
    setPipeline((prev) => advanceCardStage(prev, cardId));
  }

  return (
    <div className="bg-[#FAF8F5] rounded-xl p-4 md:p-5 border border-[#E5DDD4]">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5DDD4]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#121417]">
            Live Pipeline
          </span>
          <span className="text-[11px] text-[#666E7D]">
            Click any card to advance stage
          </span>
        </div>
        <span className="text-[10px] font-bold text-[#1E4F94] bg-[#DBE8FA] px-2 py-0.5 rounded-full">
          {pipeline.length} Total Tracks
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {STAGES.map((stage) => {
          const cards = pipeline.filter((c) => c.stage === stage.id);
          const isOffer = stage.id === "offer_stage";

          return (
            <div
              key={stage.id}
              data-kanban-stage={stage.id}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                const id = event.dataTransfer.getData("text/plain");
                setPipeline((prev) =>
                  prev.map((card) =>
                    card.id === id ? { ...card, stage: stage.id } : card,
                  ),
                );
              }}
              className="bg-[#FFFFFF] border border-[#E5DDD4] rounded-lg p-2.5 flex flex-col justify-between min-h-[140px]"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#666E7D]">
                    {stage.label}
                  </span>
                  <span className="text-[10px] font-bold text-[#121417] px-1.5 py-0.2 rounded bg-[#FAF8F5]">
                    {cards.length}
                  </span>
                </div>

                <div className="space-y-1.5" aria-live="polite">
                  {cards.map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      draggable
                      onDragStart={(event) =>
                        event.dataTransfer.setData("text/plain", card.id)
                      }
                      onClick={() => handleCardClick(card.id)}
                      className={`w-full text-left p-2 rounded border transition-all cursor-pointer hover:shadow-xs active:scale-98 ${
                        isOffer
                          ? "bg-[#FAF8F5] border-[#DBE8FA]"
                          : "bg-[#FFFFFF] border-[#E5DDD4]"
                      }`}
                    >
                      <div className="text-[11px] font-bold text-[#121417] truncate">
                        {card.company}
                      </div>
                      <div className="text-[9px] text-[#666E7D] truncate">
                        {card.role}
                      </div>
                    </button>
                  ))}
                  {cards.length === 0 && (
                    <div className="text-[10px] text-[#666E7D]/60 text-center py-4 border border-dashed border-[#E5DDD4] rounded">
                      Ready for your next opportunity
                    </div>
                  )}
                </div>
              </div>

              <div className="text-[9px] text-[#666E7D] pt-2 border-t border-[#E5DDD4]/60 text-center">
                Tap card &rarr;
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(waypoint)/waypoint/components/bento/ReplyFeedWidget.tsx">
<![CDATA["use client";

import React, { useState } from "react";

interface ReplyMessage {
  id: string;
  sender: string;
  company: string;
  preview: string;
  timeAgo: string;
  actionText: string;
}

const SAMPLE_REPLIES: ReplyMessage[] = [
  {
    id: "anthropic-1",
    sender: "Elena Rostova",
    company: "Anthropic",
    preview:
      "Loved your distributed systems write-up. Are you available for a technical discussion this Wednesday?",
    timeAgo: "Just now",
    actionText: "Accept Call",
  },
  {
    id: "linear-1",
    sender: "Karri Saarinen",
    company: "Linear",
    preview:
      "Impressive attention to keyboard interactions. Let's schedule an intro with our product team.",
    timeAgo: "2h ago",
    actionText: "View Thread",
  },
  {
    id: "figma-1",
    sender: "Dylan Field",
    company: "Figma",
    preview:
      "Checked your engine demo. We have a founding role on canvas performance opening up.",
    timeAgo: "Yesterday",
    actionText: "Book Meeting",
  },
];

export function ReplyFeedWidget() {
  const [replies, setReplies] = useState<ReplyMessage[]>([SAMPLE_REPLIES[0]]);
  const [index, setIndex] = useState<number>(1);
  const [thread, setThread] = useState<string | null>(null);

  function simulateNewReply() {
    const nextMsg = SAMPLE_REPLIES[index % SAMPLE_REPLIES.length];
    setReplies((prev) => [
      { ...nextMsg, id: `${nextMsg.id}-${Date.now()}`, timeAgo: "Just now" },
      ...prev.slice(0, 2),
    ]);
    setIndex((prev) => prev + 1);
  }

  return (
    <div className="bg-[#FAF8F5] rounded-xl p-4 md:p-5 border border-[#E5DDD4] flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5DDD4]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#216143] animate-ping" />
            <span className="text-xs font-bold text-[#121417]">
              Live Recruiter Signal
            </span>
          </div>
          <button
            type="button"
            onClick={simulateNewReply}
            className="text-[10px] font-bold text-[#1E4F94] bg-[#DBE8FA] hover:bg-[#DBE8FA]/80 px-2.5 py-1 rounded-full transition"
          >
            + Simulate Inbound
          </button>
        </div>

        <div className="space-y-2" aria-live="polite" aria-relevant="additions">
          {replies.map((reply) => (
            <div
              key={reply.id}
              className="bg-[#FFFFFF] border border-[#E5DDD4] rounded-lg p-3 shadow-xs animate-in fade-in slide-in-from-top-2 duration-300"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#121417]">
                  {reply.sender} at {reply.company}
                </span>
                <span className="text-[10px] text-[#666E7D]">
                  {reply.timeAgo}
                </span>
              </div>
              <p className="text-[11px] text-[#2B2F38] line-clamp-2 leading-relaxed mb-2">
                &ldquo;{reply.preview}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-[#E5DDD4]/50">
                <span className="text-[10px] font-semibold text-[#216143] bg-[#D8EADF] px-2 py-0.5 rounded">
                  + Stage Advanced
                </span>
                <button
                  type="button"
                  aria-expanded={thread === reply.id}
                  onClick={() =>
                    setThread(thread === reply.id ? null : reply.id)
                  }
                  className="text-[10px] font-bold text-[#121417] hover:underline"
                >
                  {reply.actionText} &rarr;
                </button>
              </div>
              {thread === reply.id && (
                <p className="text-[11px] text-[#666E7D] mt-3 border-t border-[#E5DDD4] pt-3">
                  Sample thread with {reply.sender}. In the product, this is
                  where you would review the conversation and choose a next
                  step. No message or meeting is sent from this demo.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 text-[10px] text-[#666E7D] text-center">
        Sample inbox simulation. No email or calendar is connected.
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="public/downloads/waypoint.html">
<![CDATA[<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Waypoint — Pitch with intention. Land the offer.</title>
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    :root {
      --wyp-bg-canvas: #EDE6DF;
      --wyp-bg-canvas-subtle: #F5EFEB;
      --wyp-bg-surface: #FFFFFF;
      --wyp-border-subtle: #E5DDD4;
      --wyp-text-primary: #121417;
      --wyp-text-secondary: #2B2F38;
      --wyp-text-muted: #666E7D;
      --wyp-accent-sage: #D8EADF;
      --wyp-accent-sky: #DBE8FA;
      --wyp-accent-apricot: #FCE8DC;
      --wyp-accent-lavender: #ECE6F6;
      --wyp-bg-footer: #16181D;
      --font-display: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      --font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    body {
      background-color: var(--wyp-bg-canvas);
      color: var(--wyp-text-primary);
      font-family: var(--font-body);
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    button {
      font-family: inherit;
      cursor: pointer;
      border: none;
      background: none;
    }

    /* Container */
    .wyp-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* Header */
    .wyp-header {
      position: sticky;
      top: 16px;
      z-index: 50;
      max-width: 1200px;
      margin: 16px auto 0;
      padding: 0 24px;
    }
    .wyp-header-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
      padding: 0 24px;
      background-color: rgba(255, 255, 255, 0.88);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 9999px;
      box-shadow: 0 4px 20px rgba(18, 20, 23, 0.04);
    }
    .wyp-logo {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      font-weight: 800;
      font-size: 19px;
      letter-spacing: -0.03em;
      color: var(--wyp-text-primary);
    }
    .wyp-logo-mark {
      width: 30px;
      height: 30px;
      border-radius: 8px;
      background: var(--wyp-text-primary);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .wyp-logo-mark svg {
      width: 16px;
      height: 16px;
      stroke: var(--wyp-accent-sage);
    }
    .wyp-nav-links {
      display: none;
      align-items: center;
      gap: 32px;
      font-size: 14px;
      font-weight: 500;
      color: var(--wyp-text-muted);
    }
    @media (min-width: 768px) {
      .wyp-nav-links { display: flex; }
    }
    .wyp-nav-links a:hover {
      color: var(--wyp-text-primary);
    }
    .wyp-header-actions {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .wyp-btn-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--wyp-text-primary);
      color: #FFFFFF;
      font-size: 13px;
      font-weight: 600;
      padding: 10px 20px;
      border-radius: 9999px;
      transition: opacity 0.15s ease;
    }
    .wyp-btn-primary:hover {
      opacity: 0.9;
    }

    /* Hero Section */
    .wyp-hero {
      padding: 80px 0 40px;
      text-align: center;
    }
    .wyp-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      background: var(--wyp-bg-surface);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      color: var(--wyp-text-secondary);
      margin-bottom: 24px;
    }
    .wyp-badge-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #10B981;
    }
    .wyp-hero h1 {
      font-size: clamp(38px, 6vw, 68px);
      font-weight: 800;
      letter-spacing: -0.04em;
      line-height: 1.08;
      color: var(--wyp-text-primary);
      max-width: 900px;
      margin: 0 auto 20px;
    }
    .wyp-hero p {
      font-size: clamp(16px, 2vw, 19px);
      color: var(--wyp-text-muted);
      max-width: 640px;
      margin: 0 auto 36px;
      line-height: 1.5;
    }
    .wyp-hero-cta {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 14px;
      flex-wrap: wrap;
      margin-bottom: 56px;
    }
    .wyp-btn-hero-pri {
      background: var(--wyp-text-primary);
      color: #FFFFFF;
      padding: 14px 28px;
      border-radius: 9999px;
      font-weight: 600;
      font-size: 15px;
      box-shadow: 0 4px 12px rgba(18, 20, 23, 0.12);
    }
    .wyp-btn-hero-sec {
      background: var(--wyp-bg-surface);
      color: var(--wyp-text-primary);
      border: 1px solid var(--wyp-border-subtle);
      padding: 14px 28px;
      border-radius: 9999px;
      font-weight: 600;
      font-size: 15px;
    }

    /* Hero Dashboard Deck */
    .wyp-deck-container {
      margin-top: 20px;
      background: var(--wyp-bg-surface);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 20px;
      padding: 24px;
      box-shadow: 0 20px 40px rgba(18, 20, 23, 0.08);
      text-align: left;
    }
    .wyp-deck-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 16px;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--wyp-border-subtle);
    }
    .wyp-deck-title {
      font-size: 17px;
      font-weight: 700;
      color: var(--wyp-text-primary);
    }
    .wyp-deck-pills {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .wyp-pill {
      font-size: 11px;
      font-weight: 700;
      padding: 4px 12px;
      border-radius: 9999px;
      color: var(--wyp-text-primary);
    }
    .wyp-pill-sage { background: var(--wyp-accent-sage); }
    .wyp-pill-sky { background: var(--wyp-accent-sky); }
    .wyp-pill-apricot { background: var(--wyp-accent-apricot); }

    .wyp-deck-columns {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
    }
    .wyp-col {
      background: var(--wyp-bg-canvas-subtle);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .wyp-col-title {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.05em;
      color: var(--wyp-text-primary);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .wyp-col-count {
      background: var(--wyp-border-subtle);
      padding: 2px 8px;
      border-radius: 9999px;
      font-size: 11px;
      color: var(--wyp-text-muted);
    }
    .wyp-card {
      background: var(--wyp-bg-surface);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 8px;
      padding: 12px 14px;
      box-shadow: 0 2px 6px rgba(18, 20, 23, 0.03);
    }
    .wyp-card-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 4px;
    }
    .wyp-card-name {
      font-size: 14px;
      font-weight: 700;
      color: var(--wyp-text-primary);
    }
    .wyp-card-role {
      font-size: 11px;
      color: var(--wyp-text-muted);
      margin-bottom: 8px;
    }
    .wyp-card-tag {
      display: inline-block;
      font-size: 10px;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .wyp-card-offer {
      border: 2px solid var(--wyp-accent-sage);
      background: var(--wyp-bg-surface);
    }
    .wyp-card-offer .wyp-offer-val {
      font-size: 20px;
      font-weight: 800;
      color: var(--wyp-text-primary);
      margin: 8px 0 2px;
    }

    /* Bento Grid Section */
    .wyp-section {
      padding: 80px 0;
    }
    .wyp-section-header {
      text-align: center;
      max-width: 680px;
      margin: 0 auto 48px;
    }
    .wyp-section-header h2 {
      font-size: clamp(28px, 4vw, 42px);
      font-weight: 800;
      letter-spacing: -0.03em;
      color: var(--wyp-text-primary);
      margin-bottom: 12px;
    }
    .wyp-section-header p {
      font-size: 16px;
      color: var(--wyp-text-muted);
    }

    .wyp-bento-grid {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 20px;
    }
    .wyp-bento-card {
      background: var(--wyp-bg-surface);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 4px 16px rgba(18, 20, 23, 0.04);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .wyp-bento-large {
      grid-column: span 12;
    }
    @media (min-width: 768px) {
      .wyp-bento-span-7 { grid-column: span 7; }
      .wyp-bento-span-5 { grid-column: span 5; }
      .wyp-bento-span-6 { grid-column: span 6; }
    }
    .wyp-bento-card h3 {
      font-size: 18px;
      font-weight: 700;
      color: var(--wyp-text-primary);
      margin-bottom: 6px;
    }
    .wyp-bento-card p {
      font-size: 13px;
      color: var(--wyp-text-muted);
      margin-bottom: 18px;
    }

    /* Interactive Calendar Widget */
    .wyp-calendar {
      background: var(--wyp-bg-canvas-subtle);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 10px;
      padding: 14px;
    }
    .wyp-cal-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 6px;
      text-align: center;
      margin-top: 10px;
    }
    .wyp-cal-day-label {
      font-size: 10px;
      font-weight: 700;
      color: var(--wyp-text-muted);
    }
    .wyp-cal-btn {
      padding: 8px 4px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      color: var(--wyp-text-primary);
      background: var(--wyp-bg-surface);
      border: 1px solid transparent;
      transition: all 0.15s ease;
    }
    .wyp-cal-btn:hover {
      border-color: var(--wyp-border-subtle);
    }
    .wyp-cal-btn.active {
      background: var(--wyp-text-primary);
      color: #FFFFFF;
    }

    /* Interactive Kanban Widget */
    .wyp-kanban-preview {
      background: var(--wyp-bg-canvas-subtle);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 10px;
      padding: 14px;
    }
    .wyp-kanban-steps {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
    }
    .wyp-kanban-step-pill {
      flex: 1;
      text-align: center;
      padding: 6px 4px;
      font-size: 11px;
      font-weight: 700;
      border-radius: 6px;
      background: var(--wyp-bg-surface);
      color: var(--wyp-text-muted);
      border: 1px solid var(--wyp-border-subtle);
      transition: all 0.2s ease;
    }
    .wyp-kanban-step-pill.active {
      background: var(--wyp-accent-sage);
      color: var(--wyp-text-primary);
      border-color: var(--wyp-accent-sage);
    }
    .wyp-btn-cycle {
      width: 100%;
      padding: 8px 0;
      font-size: 12px;
      font-weight: 600;
      background: var(--wyp-text-primary);
      color: #FFFFFF;
      border-radius: 6px;
    }

    /* Encryption Toggle Widget */
    .wyp-crypto-box {
      background: var(--wyp-bg-canvas-subtle);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 10px;
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .wyp-crypto-info {
      font-size: 12px;
      color: var(--wyp-text-secondary);
    }
    .wyp-crypto-key {
      font-family: var(--font-mono);
      font-size: 11px;
      color: var(--wyp-text-muted);
      margin-top: 4px;
    }
    .wyp-toggle-btn {
      background: var(--wyp-accent-sage);
      color: var(--wyp-text-primary);
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 700;
      transition: background 0.2s;
    }

    /* Live Inbound Toast Widget */
    .wyp-toast-feed {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .wyp-toast-item {
      background: var(--wyp-bg-canvas-subtle);
      border-left: 3px solid var(--wyp-accent-sky);
      border-radius: 6px;
      padding: 10px 12px;
      font-size: 12px;
    }
    .wyp-toast-author {
      font-weight: 700;
      color: var(--wyp-text-primary);
      display: flex;
      justify-content: space-between;
    }
    .wyp-toast-msg {
      color: var(--wyp-text-secondary);
      margin-top: 2px;
    }

    /* Pricing Section */
    .wyp-pricing {
      padding: 80px 0;
      background: var(--wyp-bg-canvas-subtle);
    }
    .wyp-cadence-switch {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: var(--wyp-bg-surface);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 9999px;
      padding: 4px;
      width: fit-content;
      margin: 0 auto 40px;
    }
    .wyp-cadence-btn {
      padding: 8px 20px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
      color: var(--wyp-text-muted);
      transition: all 0.2s;
    }
    .wyp-cadence-btn.active {
      background: var(--wyp-text-primary);
      color: #FFFFFF;
    }

    .wyp-pricing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 24px;
    }
    .wyp-price-card {
      background: var(--wyp-bg-surface);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 16px;
      padding: 32px 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }
    .wyp-price-card.featured {
      border: 2px solid var(--wyp-text-primary);
      box-shadow: 0 12px 30px rgba(18, 20, 23, 0.08);
    }
    .wyp-price-badge {
      position: absolute;
      top: -12px;
      right: 24px;
      background: var(--wyp-text-primary);
      color: #FFFFFF;
      font-size: 10px;
      font-weight: 700;
      letter-spacing: 0.04em;
      padding: 4px 10px;
      border-radius: 9999px;
    }
    .wyp-plan-name {
      font-size: 18px;
      font-weight: 700;
      color: var(--wyp-text-primary);
      margin-bottom: 4px;
    }
    .wyp-plan-desc {
      font-size: 13px;
      color: var(--wyp-text-muted);
      margin-bottom: 24px;
    }
    .wyp-plan-price {
      font-size: 42px;
      font-weight: 800;
      color: var(--wyp-text-primary);
      letter-spacing: -0.04em;
      display: flex;
      align-items: baseline;
      gap: 4px;
      margin-bottom: 24px;
    }
    .wyp-plan-period {
      font-size: 14px;
      font-weight: 500;
      color: var(--wyp-text-muted);
    }
    .wyp-features-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 32px;
      font-size: 13px;
      color: var(--wyp-text-secondary);
    }
    .wyp-features-list li {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .wyp-check-icon {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--wyp-accent-sage);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .wyp-check-icon svg {
      width: 10px;
      height: 10px;
      stroke: var(--wyp-text-primary);
    }

    /* FAQ Accordion Section */
    .wyp-faq-list {
      max-width: 760px;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .wyp-faq-item {
      background: var(--wyp-bg-surface);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 12px;
      overflow: hidden;
    }
    .wyp-faq-q {
      width: 100%;
      text-align: left;
      padding: 20px 24px;
      font-size: 16px;
      font-weight: 700;
      color: var(--wyp-text-primary);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .wyp-faq-q svg {
      width: 18px;
      height: 18px;
      transition: transform 0.2s ease;
    }
    .wyp-faq-item.open .wyp-faq-q svg {
      transform: rotate(180deg);
    }
    .wyp-faq-a {
      display: none;
      padding: 0 24px 20px;
      font-size: 14px;
      line-height: 1.6;
      color: var(--wyp-text-muted);
    }
    .wyp-faq-item.open .wyp-faq-a {
      display: block;
    }

    /* Waitlist Conversion Section */
    .wyp-conversion-card {
      background: var(--wyp-bg-surface);
      border: 1px solid var(--wyp-border-subtle);
      border-radius: 24px;
      padding: 56px 32px;
      text-align: center;
      box-shadow: 0 16px 36px rgba(18, 20, 23, 0.06);
      max-width: 800px;
      margin: 0 auto;
    }
    .wyp-conversion-card h2 {
      font-size: clamp(26px, 3.5vw, 38px);
      font-weight: 800;
      color: var(--wyp-text-primary);
      letter-spacing: -0.03em;
      margin-bottom: 12px;
    }
    .wyp-conversion-card p {
      font-size: 15px;
      color: var(--wyp-text-muted);
      max-width: 500px;
      margin: 0 auto 32px;
    }
    .wyp-form {
      display: flex;
      gap: 8px;
      max-width: 440px;
      margin: 0 auto;
      flex-wrap: wrap;
    }
    .wyp-input {
      flex: 1;
      min-width: 240px;
      padding: 12px 18px;
      border-radius: 9999px;
      border: 1px solid var(--wyp-border-subtle);
      font-size: 14px;
      color: var(--wyp-text-primary);
      background: var(--wyp-bg-canvas-subtle);
      outline: none;
    }
    .wyp-input:focus {
      border-color: var(--wyp-text-primary);
    }
    .wyp-form-success {
      display: none;
      padding: 12px;
      font-size: 14px;
      font-weight: 600;
      color: #065F46;
      background: var(--wyp-accent-sage);
      border-radius: 8px;
      margin-top: 16px;
    }

    /* Footer Colophon */
    .wyp-footer {
      background: var(--wyp-bg-footer);
      color: #A3AAB8;
      padding: 80px 0 40px;
      margin-top: 80px;
    }
    .wyp-footer-top {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 40px;
      padding-bottom: 60px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }
    @media (max-width: 768px) {
      .wyp-footer-top { grid-template-columns: 1fr; }
    }
    .wyp-footer-brand h4 {
      font-size: 20px;
      font-weight: 800;
      color: #FFFFFF;
      margin-bottom: 12px;
      letter-spacing: -0.03em;
    }
    .wyp-footer-brand p {
      font-size: 13px;
      line-height: 1.6;
      max-width: 300px;
    }
    .wyp-footer-col h5 {
      font-size: 12px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
    .wyp-footer-col ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: 13px;
    }
    .wyp-footer-col a:hover {
      color: #FFFFFF;
    }
    .wyp-footer-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 32px;
      font-size: 12px;
      flex-wrap: wrap;
      gap: 16px;
    }
    .wyp-footer-watermark {
      font-size: clamp(48px, 10vw, 120px);
      font-weight: 900;
      letter-spacing: -0.05em;
      color: rgba(255, 255, 255, 0.03);
      user-select: none;
      text-align: center;
      margin-top: 40px;
    }
  </style>
</head>
<body>

  <!-- Floating Glass Header -->
  <header class="wyp-header">
    <div class="wyp-header-inner">
      <a href="#hero" class="wyp-logo">
        <div class="wyp-logo-mark">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </div>
        <span>waypoint</span>
      </a>

      <nav class="wyp-nav-links">
        <a href="#pipeline">Pipeline</a>
        <a href="#intelligence">Intelligence</a>
        <a href="#security">Security</a>
        <a href="#pricing">Pricing</a>
        <a href="#faq">FAQ</a>
      </nav>

      <div class="wyp-header-actions">
        <a href="#waitlist" class="wyp-btn-primary">Request Invite</a>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <main>
    <section id="hero" class="wyp-hero">
      <div class="wyp-container">
        <div class="wyp-badge">
          <span class="wyp-badge-dot"></span>
          <span>Direct outreach for senior engineers &amp; designers</span>
        </div>

        <h1>Pitch with intention. Land the offer.</h1>

        <p>The calm, systematic career outreach pipeline. Bypass applicant tracking systems and deliver confidential, structured pitches directly to hiring executives.</p>

        <div class="wyp-hero-cta">
          <a href="#waitlist" class="wyp-btn-hero-pri">Start Your Private Search</a>
          <a href="#pipeline" class="wyp-btn-hero-sec">View Pipeline Mechanics</a>
        </div>

        <!-- Fold-Peeking Hero Pipeline Deck -->
        <div id="pipeline" class="wyp-deck-container">
          <div class="wyp-deck-header">
            <div>
              <div class="wyp-deck-title">Active Search: Senior Principal / Staff Infrastructure</div>
              <div style="font-size: 12px; color: var(--wyp-text-muted); margin-top: 2px;">Confidential Candidate ID: WYP-8842-CA</div>
            </div>
            <div class="wyp-deck-pills">
              <span class="wyp-pill wyp-pill-sage">24-hr SLA Active</span>
              <span class="wyp-pill wyp-pill-sky">AES-256 E2EE</span>
              <span class="wyp-pill wyp-pill-apricot">Executive Backchannel</span>
            </div>
          </div>

          <div class="wyp-deck-columns">
            <!-- Pitched Column -->
            <div class="wyp-col">
              <div class="wyp-col-title">
                <span>PITCHED</span>
                <span class="wyp-col-count">3</span>
              </div>
              <div class="wyp-card">
                <div class="wyp-card-top">
                  <div class="wyp-card-name">Linear</div>
                  <span class="wyp-card-tag" style="background: var(--wyp-accent-sky);">Warm Pitch</span>
                </div>
                <div class="wyp-card-role">Staff Product Engineer</div>
                <div style="font-size: 10px; color: var(--wyp-text-muted);">Delivered to CTO · Today</div>
              </div>
              <div class="wyp-card">
                <div class="wyp-card-top">
                  <div class="wyp-card-name">Stripe</div>
                  <span class="wyp-card-tag" style="background: var(--wyp-accent-apricot);">Exec Referral</span>
                </div>
                <div class="wyp-card-role">Principal Architect</div>
                <div style="font-size: 10px; color: var(--wyp-text-muted);">Opened by VP Eng · 2h ago</div>
              </div>
              <div class="wyp-card">
                <div class="wyp-card-top">
                  <div class="wyp-card-name">Figma</div>
                  <span class="wyp-card-tag" style="background: var(--wyp-accent-lavender);">VP Reach</span>
                </div>
                <div class="wyp-card-role">Design Systems Lead</div>
                <div style="font-size: 10px; color: var(--wyp-text-muted);">Queued dispatch</div>
              </div>
            </div>

            <!-- In Review Column -->
            <div class="wyp-col">
              <div class="wyp-col-title">
                <span>IN REVIEW</span>
                <span class="wyp-col-count">2</span>
              </div>
              <div class="wyp-card">
                <div class="wyp-card-top">
                  <div class="wyp-card-name">OpenAI</div>
                  <span class="wyp-card-tag" style="background: var(--wyp-accent-sage);">Recruiter Screen</span>
                </div>
                <div class="wyp-card-role">Compute &amp; Infrastructure</div>
                <div style="font-size: 11px; font-weight: 600; color: var(--wyp-text-primary);">Async feedback received</div>
              </div>
              <div class="wyp-card">
                <div class="wyp-card-top">
                  <div class="wyp-card-name">Datadog</div>
                  <span class="wyp-card-tag" style="background: var(--wyp-accent-sky);">Tech Sync</span>
                </div>
                <div class="wyp-card-role">Platform Reliability</div>
                <div style="font-size: 11px; font-weight: 600; color: var(--wyp-text-primary);">Reviewing design doc</div>
              </div>
            </div>

            <!-- Panel Round Column -->
            <div class="wyp-col">
              <div class="wyp-col-title">
                <span>PANEL ROUND</span>
                <span class="wyp-col-count">1</span>
              </div>
              <div class="wyp-card">
                <div class="wyp-card-top">
                  <div class="wyp-card-name">Airbnb</div>
                  <span class="wyp-card-tag" style="background: var(--wyp-accent-apricot);">Full Loop</span>
                </div>
                <div class="wyp-card-role">Guest Platform Lead</div>
                <div style="font-size: 11px; font-weight: 600; color: var(--wyp-text-secondary); margin-top: 4px;">Scheduled: Nov 12 · 2:00 PM</div>
                <div style="font-size: 10px; color: var(--wyp-text-muted); margin-top: 2px;">4 Sessions · Architecture &amp; Values</div>
              </div>
            </div>

            <!-- Offer Stage Column -->
            <div class="wyp-col" style="border-color: var(--wyp-accent-sage);">
              <div class="wyp-col-title">
                <span style="color: var(--wyp-text-primary);">OFFER STAGE</span>
                <span class="wyp-col-count" style="background: var(--wyp-accent-sage); color: var(--wyp-text-primary);">1</span>
              </div>
              <div class="wyp-card wyp-card-offer">
                <div class="wyp-card-top">
                  <div class="wyp-card-name">Anthropic</div>
                  <span class="wyp-card-tag" style="background: var(--wyp-accent-sage); font-weight: 700;">OFFER RECEIVED</span>
                </div>
                <div class="wyp-card-role">Staff Research Systems</div>
                <div class="wyp-offer-val">$420,000</div>
                <div style="font-size: 11px; color: var(--wyp-text-muted); margin-bottom: 12px;">Base + Significant Equity Grant</div>
                <button class="wyp-btn-primary" style="width: 100%; font-size: 11px; padding: 8px;">Review Formal Terms</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Bento Grid Section -->
    <section id="intelligence" class="wyp-section">
      <div class="wyp-container">
        <div class="wyp-section-header">
          <h2>Purpose-built for executive career moves</h2>
          <p>Every tool engineered to give senior technical talent clarity, agency, and uncompromising privacy.</p>
        </div>

        <div class="wyp-bento-grid">
          <!-- Bento 1: Calendar Sync -->
          <div class="wyp-bento-card wyp-bento-span-7">
            <div>
              <h3>Interview Round Scheduler</h3>
              <p>Coordinate loops without exposing personal calendars or leaving corporate breadcrumbs.</p>
            </div>
            <div class="wyp-calendar">
              <div style="display: flex; justify-content: space-between; font-size: 12px; font-weight: 700; color: var(--wyp-text-primary);">
                <span>November 2026</span>
                <span id="cal-status" style="color: var(--wyp-text-muted);">Select a date</span>
              </div>
              <div class="wyp-cal-days">
                <span class="wyp-cal-day-label">M</span>
                <span class="wyp-cal-day-label">T</span>
                <span class="wyp-cal-day-label">W</span>
                <span class="wyp-cal-day-label">T</span>
                <span class="wyp-cal-day-label">F</span>
                <span class="wyp-cal-day-label">S</span>
                <span class="wyp-cal-day-label">S</span>
                <button class="wyp-cal-btn" onclick="selectDate(this, 9)">9</button>
                <button class="wyp-cal-btn" onclick="selectDate(this, 10)">10</button>
                <button class="wyp-cal-btn" onclick="selectDate(this, 11)">11</button>
                <button class="wyp-cal-btn active" onclick="selectDate(this, 12)">12</button>
                <button class="wyp-cal-btn" onclick="selectDate(this, 13)">13</button>
                <button class="wyp-cal-btn" onclick="selectDate(this, 14)">14</button>
                <button class="wyp-cal-btn" onclick="selectDate(this, 15)">15</button>
              </div>
            </div>
          </div>

          <!-- Bento 2: Kanban Card Advance -->
          <div class="wyp-bento-card wyp-bento-span-5">
            <div>
              <h3>Dynamic Stage Progression</h3>
              <p>Simulate pipeline velocity. Advance candidate cards through verified review stages.</p>
            </div>
            <div class="wyp-kanban-preview">
              <div class="wyp-kanban-steps">
                <div id="step-0" class="wyp-kanban-step-pill active">Pitched</div>
                <div id="step-1" class="wyp-kanban-step-pill">Review</div>
                <div id="step-2" class="wyp-kanban-step-pill">Panel</div>
                <div id="step-3" class="wyp-kanban-step-pill">Offer</div>
              </div>
              <div id="kanban-target-name" style="font-size: 13px; font-weight: 700; margin-bottom: 8px;">Linear · Staff Product Engineer</div>
              <button class="wyp-btn-cycle" onclick="advanceKanban()">Advance Stage &rarr;</button>
            </div>
          </div>

          <!-- Bento 3: Zero-Knowledge Encryption -->
          <div id="security" class="wyp-bento-card wyp-bento-span-6">
            <div>
              <h3>Client-Side Zero-Knowledge Encryption</h3>
              <p>Your compensation goals, pitch letters, and current company status are encrypted in your browser.</p>
            </div>
            <div class="wyp-crypto-box">
              <div class="wyp-crypto-info">
                <div id="crypto-state-text" style="font-weight: 700;">AES-GCM-256: Active</div>
                <div id="crypto-key-text" class="wyp-crypto-key">Key: 7f8a9e...3d2c (Client-Only)</div>
              </div>
              <button id="crypto-toggle-btn" class="wyp-toggle-btn" onclick="toggleCrypto()">Verified</button>
            </div>
          </div>

          <!-- Bento 4: Simulated Inbound Toast Feed -->
          <div class="wyp-bento-card wyp-bento-span-6">
            <div>
              <h3>Verified Inbound Direct Responses</h3>
              <p>Live responses from hiring leaders delivered directly into your private console.</p>
            </div>
            <div class="wyp-toast-feed" id="toast-feed">
              <div class="wyp-toast-item">
                <div class="wyp-toast-author">
                  <span>Head of Infrastructure @ OpenAI</span>
                  <span style="font-size: 10px; color: var(--wyp-text-muted);">14m ago</span>
                </div>
                <div class="wyp-toast-msg">"Reviewed the distributed systems doc. Let's set up 45m with the team this week."</div>
              </div>
            </div>
            <button style="margin-top: 10px; font-size: 11px; font-weight: 600; color: var(--wyp-text-muted); text-align: right;" onclick="simulateInboundToast()">+ Simulate Inbound Ping</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="wyp-pricing">
      <div class="wyp-container">
        <div class="wyp-section-header">
          <h2>Transparent, candidate-aligned pricing</h2>
          <p>No recruiter commissions. No percentage of your first year salary. Pay a simple flat cadence for the duration of your search.</p>
        </div>

        <div class="wyp-cadence-switch">
          <button id="cadence-monthly" class="wyp-cadence-btn active" onclick="setCadence('monthly')">Monthly</button>
          <button id="cadence-annual" class="wyp-cadence-btn" onclick="setCadence('annual')">Annual (Save 20%)</button>
        </div>

        <div class="wyp-pricing-grid">
          <!-- Plan 1: Scout -->
          <div class="wyp-price-card">
            <div>
              <div class="wyp-plan-name">Scout</div>
              <div class="wyp-plan-desc">For passive monitoring and exploring selective opportunities.</div>
              <div class="wyp-plan-price">
                <span id="price-scout">$0</span>
                <span class="wyp-plan-period">/ forever</span>
              </div>
              <ul class="wyp-features-list">
                <li><span class="wyp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span> Up to 2 concurrent pitches</li>
                <li><span class="wyp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span> Verified executive directory access</li>
                <li><span class="wyp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span> End-to-end encrypted profile</li>
              </ul>
            </div>
            <a href="#waitlist" class="wyp-btn-hero-sec" style="text-align: center;">Get Started</a>
          </div>

          <!-- Plan 2: Pro (Featured) -->
          <div class="wyp-price-card featured">
            <div class="wyp-price-badge">MOST POPULAR</div>
            <div>
              <div class="wyp-plan-name">Pro</div>
              <div class="wyp-plan-desc">For active senior searches aiming for top-of-market compensation.</div>
              <div class="wyp-plan-price">
                <span id="price-pro">$28</span>
                <span class="wyp-plan-period" id="period-pro">/ month</span>
              </div>
              <ul class="wyp-features-list">
                <li><span class="wyp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span> Unlimited concurrent pitches</li>
                <li><span class="wyp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span> 24-hour recruiter SLA guarantee</li>
                <li><span class="wyp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span> Custom pitch letter engineering</li>
                <li><span class="wyp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span> Interview loop calendar intelligence</li>
              </ul>
            </div>
            <a href="#waitlist" class="wyp-btn-primary" style="text-align: center; padding: 14px;">Select Pro</a>
          </div>

          <!-- Plan 3: Studio -->
          <div class="wyp-price-card">
            <div>
              <div class="wyp-plan-name">Studio</div>
              <div class="wyp-plan-desc">White-glove representation with dedicated executive search partner.</div>
              <div class="wyp-plan-price">
                <span id="price-studio">$58</span>
                <span class="wyp-plan-period" id="period-studio">/ month</span>
              </div>
              <ul class="wyp-features-list">
                <li><span class="wyp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span> Everything in Pro</li>
                <li><span class="wyp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span> Dedicated career agent representation</li>
                <li><span class="wyp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span> Offer negotiation &amp; equity modeling</li>
                <li><span class="wyp-check-icon"><svg viewBox="0 0 24 24" fill="none" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg></span> Private backchannel reference checking</li>
              </ul>
            </div>
            <a href="#waitlist" class="wyp-btn-hero-sec" style="text-align: center;">Join Studio</a>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Accordion Section -->
    <section id="faq" class="wyp-section">
      <div class="wyp-container">
        <div class="wyp-section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about navigating your confidential career pipeline.</p>
        </div>

        <div class="wyp-faq-list">
          <div class="wyp-faq-item">
            <button class="wyp-faq-q" onclick="toggleFaq(this)">
              <span>How does Waypoint protect my confidentiality from my current employer?</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="wyp-faq-a">
              Waypoint enforces hard exclusions for your current company domain, its investors, and subsidiary entities. Your profile and pitch packets are strictly zero-knowledge encrypted on your machine and never appear on public directories.
            </div>
          </div>

          <div class="wyp-faq-item">
            <button class="wyp-faq-q" onclick="toggleFaq(this)">
              <span>Do companies pay fees or take a cut of my compensation?</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="wyp-faq-a">
              No. Unlike contingency recruiters who take 20-25% of your base salary, Waypoint operates solely on a flat subscription paid by you. This eliminates conflicting incentives and leaves hiring managers with full budget flexibility for your offer.
            </div>
          </div>

          <div class="wyp-faq-item">
            <button class="wyp-faq-q" onclick="toggleFaq(this)">
              <span>What level of experience is Waypoint tailored for?</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="wyp-faq-a">
              Waypoint is built specifically for Staff, Principal, and Executive engineering and product design leaders who are seeking high-impact, selective placements rather than volume applications.
            </div>
          </div>

          <div class="wyp-faq-item">
            <button class="wyp-faq-q" onclick="toggleFaq(this)">
              <span>How quickly do hiring executives typically respond?</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
            <div class="wyp-faq-a">
              Because Waypoint pitches are delivered with verified candidate seniority and tailored technical summaries directly to executive inboxes, our median time to initial response is under 36 hours.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Waitlist Conversion Card -->
    <section id="waitlist" class="wyp-section">
      <div class="wyp-container">
        <div class="wyp-conversion-card">
          <h2>Ready to orchestrate your next move?</h2>
          <p>Join over 4,200 senior engineers and designers quietly navigating high-leverage offers.</p>
          <form class="wyp-form" id="waitlist-form" onsubmit="handleWaitlist(event)">
            <input type="email" id="waitlist-email" class="wyp-input" placeholder="Enter your private email..." required>
            <button type="submit" class="wyp-btn-primary" style="padding: 12px 24px;">Request Early Access</button>
          </form>
          <div id="waitlist-success" class="wyp-form-success">
            &#10003; Verification link sent. Check your private inbox to finalize your credentials.
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- Deep Obsidian Colophon Footer -->
  <footer class="wyp-footer">
    <div class="wyp-container">
      <div class="wyp-footer-top">
        <div class="wyp-footer-brand">
          <h4>waypoint</h4>
          <p>Pitch with intention. Land the offer. The calm, confidential direct outreach console for senior technical leaders.</p>
        </div>
        <div class="wyp-footer-col">
          <h5>Platform</h5>
          <ul>
            <li><a href="#pipeline">Pipeline Deck</a></li>
            <li><a href="#intelligence">Intelligence Feed</a></li>
            <li><a href="#security">Zero-Knowledge Vault</a></li>
            <li><a href="#pricing">Pricing Plans</a></li>
          </ul>
        </div>
        <div class="wyp-footer-col">
          <h5>Company</h5>
          <ul>
            <li><a href="#">Candidate Manifesto</a></li>
            <li><a href="#">Compensation Index</a></li>
            <li><a href="#">Privacy Protocol</a></li>
            <li><a href="#">Security Audit</a></li>
          </ul>
        </div>
        <div class="wyp-footer-col">
          <h5>Legal</h5>
          <ul>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Candidate NDA</a></li>
            <li><a href="#">Security Contact</a></li>
          </ul>
        </div>
      </div>

      <div class="wyp-footer-bottom">
        <div>&copy; 2026 Waypoint Systems Inc. All rights reserved.</div>
        <div>Encrypted &bull; Candidate-Owned &bull; No Recruiter Fees</div>
      </div>

      <div class="wyp-footer-watermark">
        waypoint
      </div>
    </div>
  </footer>

  <!-- Vanilla Client Script for Offline Interactivity -->
  <script>
    // Calendar selector
    function selectDate(btn, day) {
      document.querySelectorAll('.wyp-cal-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('cal-status').textContent = 'Selected Nov ' + day + ', 2026';
    }

    // Kanban stage cycler
    var kanbanIndex = 0;
    var stages = ['Pitched', 'Review', 'Panel', 'Offer'];
    function advanceKanban() {
      kanbanIndex = (kanbanIndex + 1) % 4;
      for (var i = 0; i < 4; i++) {
        var el = document.getElementById('step-' + i);
        if (i === kanbanIndex) {
          el.classList.add('active');
        } else {
          el.classList.remove('active');
        }
      }
    }

    // Encryption toggle
    var cryptoActive = true;
    function toggleCrypto() {
      cryptoActive = !cryptoActive;
      var textEl = document.getElementById('crypto-state-text');
      var keyEl = document.getElementById('crypto-key-text');
      var btnEl = document.getElementById('crypto-toggle-btn');
      if (cryptoActive) {
        textEl.textContent = 'AES-GCM-256: Active';
        keyEl.textContent = 'Key: 7f8a9e...3d2c (Client-Only)';
        btnEl.textContent = 'Verified';
        btnEl.style.background = 'var(--wyp-accent-sage)';
      } else {
        textEl.textContent = 'AES-GCM-256: Paused';
        keyEl.textContent = 'Key: [Unloaded from RAM]';
        btnEl.textContent = 'Enable';
        btnEl.style.background = 'var(--wyp-border-subtle)';
      }
    }

    // Simulate inbound toast
    var toastCount = 0;
    var extraToasts = [
      { author: 'VP of Product @ Stripe', msg: '"Love the portfolio case study. When can we talk architecture?"' },
      { author: 'CTO @ Linear', msg: '"Your proposal on desktop sync reliability is spot on. Invited you to Slack."' },
      { author: 'Design Director @ Figma', msg: '"Our design systems team would love to review your latest framework."' }
    ];
    function simulateInboundToast() {
      var toast = extraToasts[toastCount % extraToasts.length];
      toastCount++;
      var feed = document.getElementById('toast-feed');
      var div = document.createElement('div');
      div.className = 'wyp-toast-item';
      div.innerHTML = '<div class="wyp-toast-author"><span>' + toast.author + '</span><span style="font-size: 10px; color: var(--wyp-text-muted);">Just now</span></div><div class="wyp-toast-msg">' + toast.msg + '</div>';
      feed.prepend(div);
    }

    // Pricing Cadence
    function setCadence(cadence) {
      var btnM = document.getElementById('cadence-monthly');
      var btnA = document.getElementById('cadence-annual');
      var pricePro = document.getElementById('price-pro');
      var periodPro = document.getElementById('period-pro');
      var priceStudio = document.getElementById('price-studio');
      var periodStudio = document.getElementById('period-studio');

      if (cadence === 'annual') {
        btnM.classList.remove('active');
        btnA.classList.add('active');
        pricePro.textContent = '$22';
        periodPro.textContent = '/ month (billed annually)';
        priceStudio.textContent = '$48';
        periodStudio.textContent = '/ month (billed annually)';
      } else {
        btnA.classList.remove('active');
        btnM.classList.add('active');
        pricePro.textContent = '$28';
        periodPro.textContent = '/ month';
        priceStudio.textContent = '$58';
        periodStudio.textContent = '/ month';
      }
    }

    // Accordion Toggle
    function toggleFaq(btn) {
      var item = btn.parentElement;
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.wyp-faq-item').forEach(function(i) { i.classList.remove('open'); });
      if (!isOpen) {
        item.classList.add('open');
      }
    }

    // Form submission
    function handleWaitlist(e) {
      e.preventDefault();
      var input = document.getElementById('waitlist-email');
      var success = document.getElementById('waitlist-success');
      if (input.value && input.value.indexOf('@') !== -1) {
        success.style.display = 'block';
        input.value = '';
      }
    }
  </script>
</body>
</html>
]]>
    </file>
  </files>
</template>
