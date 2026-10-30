<template slug="xibalba" name="XIBALBA">
  <dependencies>
    {
      "dependencies": {}
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(xibalba)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Oswald, Inter } from "next/font/google";
import "./xibalba/xibalba.css";

const display = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-oswald",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Xibalba — Night of the Jade Cenote",
  description:
    "An interactive vertical descent into the subterranean botanical reserve and nocturnal equinox ceremony of Xibalba.",
  openGraph: {
    title: "Xibalba — Night of the Jade Cenote",
    description:
      "An interactive vertical descent into the subterranean botanical reserve and nocturnal equinox ceremony of Xibalba.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#040A0E",
  colorScheme: "dark",
};

export default function XibalbaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
    >
      <body className="xib-body bg-[#040A0E] text-[#EEFAF6] antialiased selection:bg-[#5FF2C8]/30 selection:text-[#EEFAF6]">
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(xibalba)/xibalba/assets.generated.ts">
<![CDATA[// Generated asset inventory for XIBALBA
export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(xibalba)/xibalba/assets.tsx">
<![CDATA[import React from "react";
import { ASSETS } from "./assets.generated";

const BASE = "/templates/xibalba";

export function assetSrc(
  key: string,
  width: 800 | 1600,
  format: "webp" | "avif" = "webp"
): string | null {
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
      <div
        className={`xib-placeholder ${className ?? ""}`}
        role="img"
        aria-label={alt}
        data-asset={assetKey}
      >
        <span className="xib-mono">{assetKey}</span>
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey];
  const set = (f: "webp" | "avif") =>
    `${assetSrc(assetKey, 800, f)} 800w, ${assetSrc(assetKey, 1600, f)} 1600w`;
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
    <file path="src/app/(xibalba)/xibalba/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#040A0E"/>
  <polygon points="32,10 54,52 10,52" fill="#EEFAF6"/>
  <circle cx="32.5" cy="35" r="7.5" fill="#040A0E"/>
  <circle cx="35" cy="33.5" r="6.8" fill="#5FF2C8"/>
</svg>
]]>
    </file>
    <file path="src/app/(xibalba)/xibalba/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#040A0E",
        color: "#EEFAF6",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          fontSize: 32,
          letterSpacing: 4,
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#5FF2C8",
            color: "#040A0E",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          ▲
        </div>
        XIBALBA
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: -1,
          }}
        >
          Night of the Jade Cenote
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#5FF2C8",
            letterSpacing: 2,
          }}
        >
          Subterranean Botanical Reserve & Equinox Equator Ceremony
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 18,
          letterSpacing: 4,
          color: "#FFA33E",
        }}
      >
        <span>EQUINOX DESCENT</span>
        <span>YUCATAN CENOTE OBSIDIAN VAULT</span>
      </div>
    </div>
  );
}
]]>
    </file>
    <file path="src/app/(xibalba)/xibalba/page.tsx">
<![CDATA[import { StaticFallbackPage } from "./components/StaticFallbackPage";
import { XibalbaExperience } from "./components/XibalbaExperience";

export default function XibalbaPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#040A0E] text-[#EEFAF6]">
      <StaticFallbackPage />
      <XibalbaExperience />
    </main>
  );
}
]]>
    </file>
    <file path="src/app/(xibalba)/xibalba/xibalba.css">
<![CDATA[@import "tailwindcss";

:root {
  --night: #040A0E;
  --obsidian: #071218;
  --ink: #EEFAF6;
  --soft: rgba(218, 242, 234, 0.78);
  --ember: #FFA33E;
  --jade: #5FF2C8;
  --ease: cubic-bezier(0.2, 0.8, 0.2, 1);
  --artH: calc(100vw * 1520 / 2688);
  --sprite-url: url("/templates/xibalba/scene-sprites-keyed.webp");
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body,
.xib-body {
  margin: 0;
  padding: 0;
  background-color: var(--night);
  color: var(--ink);
  font-family: var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

::selection {
  background: rgba(95, 242, 200, 0.25);
  color: var(--ink);
}

/* ==========================================================================
   NAVIGATION BAR (.nav)
   ========================================================================== */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: 64px;
  padding: 0 2.2vw;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  background: linear-gradient(rgba(4, 10, 14, 0.62), transparent);
  transform: translateY(-100%);
  animation: navSlideDown 900ms var(--ease) 500ms forwards;
}

@keyframes navSlideDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0%);
  }
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 5.6vw;
  justify-self: start;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 4.2vw;
  justify-self: end;
}

.nav a {
  color: var(--ink);
  text-decoration: none;
  font-family: var(--font-inter), 'Inter', sans-serif;
  font-size: clamp(12px, 0.86vw, 14px);
  font-weight: 500;
  letter-spacing: 0.04em;
  white-space: nowrap;
  transition: color 180ms var(--ease), opacity 180ms var(--ease);
}

.nav-left a:hover,
.nav-right a:hover {
  color: var(--ember);
}

.nav-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  transition: transform 200ms var(--ease);
}

.nav-logo:hover {
  transform: scale(1.08);
}

.nav-cta {
  background: transparent;
  color: var(--ink);
  font-family: var(--font-inter), 'Inter', sans-serif;
  font-size: clamp(12px, 0.86vw, 14px);
  font-weight: 500;
  letter-spacing: 0.04em;
  border: 1px solid rgba(238, 250, 246, 0.6);
  padding: 8px 14px;
  border-radius: 2px;
  line-height: 1;
  cursor: pointer;
  transition: background-color 180ms var(--ease), color 180ms var(--ease), border-color 180ms var(--ease);
}

.nav-cta:hover {
  background: var(--ink);
  color: var(--night);
  border-color: var(--ink);
}

/* ==========================================================================
   CURSOR COPAL TORCH (.lamp)
   ========================================================================== */
.lamp {
  position: fixed;
  left: 0;
  top: 0;
  width: 520px;
  height: 520px;
  border-radius: 50%;
  background: radial-gradient(
    closest-side,
    rgba(255, 170, 80, 0.15),
    rgba(95, 242, 200, 0.05) 55%,
    transparent
  );
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 40;
  will-change: transform;
  transform: translate3d(-9999px, -9999px, 0);
  contain: strict;
}

/* ==========================================================================
   SCROLLER & SCENE CONTAINERS
   ========================================================================== */
#scroller {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  will-change: transform;
  background-color: var(--night);
}

.scene {
  position: relative;
  width: 100vw;
  height: var(--artH);
  overflow: hidden;
  background-color: var(--night);
  contain: paint layout;
}

.art {
  position: relative;
  width: 100%;
  height: 100%;
  user-select: none;
}

.scene-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: calc(var(--focus, 50) * 1%) center;
  display: block;
  pointer-events: none;
  z-index: 1;
}

/* ==========================================================================
   SEAMS (.seam & .band)
   ========================================================================== */
.seam {
  position: relative;
  height: 0;
  z-index: 10;
  pointer-events: none;
}

.band {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  aspect-ratio: 16 / 9;
  transform: translateY(-50%);
  pointer-events: none;
}

.seam-img {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: calc(var(--focus, 50) * 1%) center;
  display: block;
  pointer-events: none;
}

/* ==========================================================================
   CANVAS STREAKS, AMBIENT PARTICLES, MIST, MOONGLOW & BRAZIER GLOWS
   ========================================================================== */
canvas.fall {
  position: absolute;
  z-index: 2;
  mix-blend-mode: screen;
  pointer-events: none;
}

canvas.particles {
  position: absolute;
  z-index: 4;
  mix-blend-mode: screen;
  pointer-events: none;
}

.moonglow {
  position: absolute;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    transparent 58%,
    rgba(255, 230, 165, 0.36) 68%,
    rgba(95, 242, 200, 0.14) 85%,
    transparent 100%
  );
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 3;
  animation: moonBreathe 6s ease-in-out infinite;
}

@keyframes moonBreathe {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(0.96);
    opacity: 0.82;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.07);
    opacity: 1;
  }
}

.mist {
  position: absolute;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(
    ellipse at center,
    rgba(130, 255, 228, 0.36) 0%,
    rgba(70, 215, 190, 0.15) 52%,
    transparent 76%
  );
  filter: blur(8px);
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 3;
  animation: mistBreathe 5.2s ease-in-out infinite;
}

@keyframes mistBreathe {
  0%,
  100% {
    transform: translate(-50%, -50%) scaleX(0.95) scaleY(0.9);
    opacity: 0.72;
  }
  50% {
    transform: translate(-50%, -50%) scaleX(1.08) scaleY(1.12);
    opacity: 1;
  }
}

.glow {
  position: absolute;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(
    circle,
    rgba(255, 205, 105, 0.56) 0%,
    rgba(255, 142, 42, 0.25) 45%,
    transparent 72%
  );
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 3;
  animation: flickerWarm 3.4s ease-in-out infinite alternate;
  will-change: transform, opacity;
  contain: strict;
}

.glow.cold {
  background: radial-gradient(
    circle,
    rgba(150, 255, 235, 0.65) 0%,
    rgba(95, 242, 200, 0.28) 45%,
    transparent 72%
  );
  animation: pulseCold 4s ease-in-out infinite alternate;
}

@keyframes flickerWarm {
  0% {
    opacity: 0.75;
    transform: translate(-50%, -50%) scale(0.94);
  }
  30% {
    opacity: 0.95;
    transform: translate(-50%, -50%) scale(1.03);
  }
  70% {
    opacity: 0.82;
    transform: translate(-50%, -50%) scale(0.97);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.05);
  }
}

@keyframes pulseCold {
  0% {
    opacity: 0.7;
    transform: translate(-50%, -50%) scale(0.95);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.08);
  }
}

/* ==========================================================================
   SPRITES: JADE MORPHO SPIRITS & CAVE BATS
   ========================================================================== */
.sprite {
  position: absolute;
  pointer-events: none;
  z-index: 5;
  background-image: var(--sprite-url);
  background-repeat: no-repeat;
  will-change: transform;
}

.sprite.spirit {
  filter: drop-shadow(0 0 10px rgba(95, 242, 200, 0.48));
}

.sprite.spirit.spirit1 {
  aspect-ratio: 310 / 260;
  background-size: 330.32% 294.23%;
  background-position: 2.1% 8.3%;
}

.sprite.spirit.spirit2 {
  aspect-ratio: 235 / 225;
  background-size: 435.74% 340%;
  background-position: 45.3% 10.1%;
}

.sprite.spirit.spirit3 {
  aspect-ratio: 178 / 292;
  background-size: 575.28% 261.98%;
  background-position: 73.7% 10.1%;
}

.sprite.spirit.spirit4 {
  aspect-ratio: 145 / 520;
  background-size: 706.2% 147.11%;
  background-position: 94.6% 9.7%;
}

.sprite.bat {
  aspect-ratio: 280 / 285;
  width: clamp(26px, 2.2vw, 48px);
  background-size: 365.71% 268.42%;
  background-position: 6% 84.3%;
  opacity: 0.82;
  filter: drop-shadow(0 0 6px rgba(4, 10, 14, 0.9));
  transform: translate(-50%, -50%);
}

.sprite.bat.down {
  aspect-ratio: 435 / 185;
  background-size: 235.4% 413.51%;
  background-position: 60.7% 83.6%;
}

/* ==========================================================================
   SCENE COPY, HEADINGS, AND BUTTONS
   ========================================================================== */
.hero-title-wrap {
  position: absolute;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  top: calc(var(--artH) * 0.095);
  z-index: 12;
  text-align: center;
  pointer-events: none;
}

.hero-h1 {
  font-family: var(--font-oswald), 'Oswald', sans-serif;
  font-weight: 500;
  font-size: clamp(46px, 6.4vw, 124px);
  letter-spacing: calc(0.42em + var(--lsx, 0em));
  text-transform: uppercase;
  color: var(--ink);
  text-shadow: 0 0 40px rgba(70, 225, 190, 0.45);
  margin: 0;
  line-height: 1;
  display: flex;
  justify-content: center;
}

.hero-h1 span {
  display: inline-block;
  opacity: 0;
  transform: translateY(28px);
  animation: letterRise 900ms var(--ease) forwards;
}

@keyframes letterRise {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.sub {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: calc(var(--artH) * 0.37);
  z-index: 12;
  font-family: var(--font-oswald), 'Oswald', sans-serif;
  font-weight: 500;
  font-size: clamp(12px, 1.18vw, 22px);
  letter-spacing: 0.62em;
  text-transform: uppercase;
  color: var(--ink);
  opacity: 0.88;
  margin: 0;
  white-space: nowrap;
}

.copy {
  position: absolute;
  z-index: 12;
  color: var(--ink);
}

.copy h2 {
  font-family: var(--font-oswald), 'Oswald', sans-serif;
  font-weight: 500;
  font-size: clamp(26px, 3.1vw, 54px);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin: 0 0 8px;
  line-height: 1.05;
}

.copy h3 {
  font-family: var(--font-oswald), 'Oswald', sans-serif;
  font-weight: 500;
  font-size: clamp(14px, 1.2vw, 21px);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--jade);
  margin: 12px 0 4px;
}

.copy p {
  font-family: var(--font-inter), 'Inter', sans-serif;
  font-size: clamp(12.5px, 0.95vw, 15.5px);
  line-height: 1.55;
  color: var(--soft);
  margin: 0 0 8px;
}

.rule {
  width: 56px;
  height: 2px;
  background: var(--jade);
  margin-bottom: 12px;
}

.rule.centered {
  margin-left: auto;
  margin-right: auto;
}

.copy-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.reveal-mask {
  display: block;
  overflow: hidden;
}

.reveal-item {
  transform: translateY(105%);
  opacity: 0;
  transition: transform 900ms var(--ease), opacity 900ms var(--ease);
}

.scene.in-view .reveal-item {
  transform: translateY(0%);
  opacity: 1;
}

.btn-row {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}

.btn-row.centered {
  justify-content: center;
}

.btn-solid {
  background: var(--ink);
  color: var(--night);
  border: 1px solid var(--ink);
  padding: 12px 24px;
  border-radius: 2px;
  font-family: var(--font-inter), 'Inter', sans-serif;
  font-size: clamp(13px, 0.95vw, 15px);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 180ms var(--ease), transform 180ms var(--ease);
}

.btn-solid:hover {
  background: var(--ember);
  border-color: var(--ember);
  transform: translateY(-1px);
}

.btn-ghost {
  background: transparent;
  color: var(--ink);
  border: 1px solid rgba(238, 250, 246, 0.6);
  padding: 12px 24px;
  border-radius: 2px;
  font-family: var(--font-inter), 'Inter', sans-serif;
  font-size: clamp(13px, 0.95vw, 15px);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 180ms var(--ease), border-color 180ms var(--ease), color 180ms var(--ease);
}

.btn-ghost:hover {
  background: rgba(238, 250, 246, 0.12);
  border-color: var(--ink);
}

.btn-sm {
  padding: 6px 14px;
  font-size: 11px;
}

/* ==========================================================================
   MODALS (Codex, Map, Reserve)
   ========================================================================== */
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(4, 10, 14, 0.88);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.modal-panel {
  position: relative;
  width: 100%;
  max-width: 680px;
  max-height: 88vh;
  overflow-y: auto;
  background: var(--obsidian);
  border: 1px solid rgba(95, 242, 200, 0.28);
  padding: clamp(24px, 3.4vw, 44px);
  border-radius: 4px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.85);
}

.modal-close {
  position: absolute;
  top: 18px;
  right: 20px;
  background: transparent;
  border: none;
  color: var(--ink);
  font-family: var(--font-inter), sans-serif;
  font-size: 14px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 160ms var(--ease);
}

.modal-close:hover {
  opacity: 1;
}

.modal-kicker {
  font-family: var(--font-oswald), sans-serif;
  font-size: 12px;
  letter-spacing: 0.16em;
  color: var(--jade);
  text-transform: uppercase;
  margin: 0 0 6px;
}

.modal-title {
  font-family: var(--font-oswald), sans-serif;
  font-size: clamp(24px, 2.8vw, 38px);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0 0 14px;
}

.modal-rule {
  margin-bottom: 24px;
}

.codex-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  border-bottom: 1px solid rgba(238, 250, 246, 0.15);
  padding-bottom: 8px;
}

.codex-tab {
  background: transparent;
  border: none;
  color: var(--ink);
  font-family: var(--font-oswald), sans-serif;
  font-size: 14px;
  letter-spacing: 0.1em;
  padding: 8px 16px;
  cursor: pointer;
  opacity: 0.55;
  transition: opacity 160ms var(--ease), color 160ms var(--ease);
}

.codex-tab.active {
  opacity: 1;
  color: var(--jade);
  border-bottom: 2px solid var(--jade);
}

.codex-folio-card {
  background: rgba(4, 10, 14, 0.6);
  border: 1px solid rgba(238, 250, 246, 0.1);
  padding: 24px;
  border-radius: 2px;
  margin-bottom: 24px;
}

.codex-meta-row {
  display: flex;
  gap: 8px;
  font-family: var(--font-inter), sans-serif;
  font-size: 12px;
  color: var(--jade);
  margin-bottom: 12px;
}

.codex-folio-heading {
  font-family: var(--font-oswald), sans-serif;
  font-size: 22px;
  margin: 0 0 12px;
}

.codex-folio-body {
  font-family: var(--font-inter), sans-serif;
  font-size: 14px;
  line-height: 1.65;
  color: var(--soft);
  margin: 0 0 16px;
}

.codex-rite-box {
  border-left: 2px solid var(--ember);
  padding-left: 14px;
}

.codex-rite-label {
  display: block;
  font-family: var(--font-oswald), sans-serif;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: var(--ember);
  text-transform: uppercase;
  margin-bottom: 4px;
}

.codex-rite-box p {
  font-family: var(--font-inter), sans-serif;
  font-size: 13px;
  margin: 0;
  color: var(--soft);
}

.modal-footer-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.descent-station-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.descent-station-item {
  background: rgba(4, 10, 14, 0.5);
  border: 1px solid rgba(238, 250, 246, 0.1);
  padding: 16px 20px;
  border-radius: 2px;
}

.descent-station-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;
}

.descent-depth-tag {
  display: inline-block;
  font-size: 11px;
  color: var(--jade);
  font-weight: 600;
  margin-bottom: 4px;
}

.descent-station-title {
  font-family: var(--font-oswald), sans-serif;
  font-size: 18px;
  margin: 0 0 2px;
}

.descent-station-sub {
  font-size: 12px;
  color: var(--soft);
  margin: 0;
}

.descent-highlights {
  display: flex;
  gap: 8px;
  font-size: 11px;
  color: rgba(218, 242, 234, 0.65);
}

.reserve-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-field label {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--ink);
}

.form-field input,
.form-field select {
  background: rgba(4, 10, 14, 0.85);
  border: 1px solid rgba(238, 250, 246, 0.25);
  color: var(--ink);
  padding: 10px 14px;
  border-radius: 2px;
  font-family: var(--font-inter), sans-serif;
  font-size: 14px;
  outline: none;
  transition: border-color 160ms var(--ease);
}

.form-field input:focus,
.form-field select:focus {
  border-color: var(--jade);
}

.form-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.field-error {
  font-size: 11px;
  color: var(--ember);
}

.reservation-confirmed {
  text-align: center;
  padding: 24px 0;
}

.confirmed-kicker {
  font-family: var(--font-oswald), sans-serif;
  font-size: 13px;
  letter-spacing: 0.16em;
  color: var(--jade);
  text-transform: uppercase;
}

.confirmed-code {
  font-family: var(--font-oswald), sans-serif;
  font-size: clamp(32px, 4vw, 48px);
  color: var(--ember);
  margin: 12px 0 16px;
}

.confirmed-details {
  font-size: 14px;
  color: var(--soft);
  margin-bottom: 24px;
}

.existing-reservations-note {
  font-size: 12px;
  color: var(--jade);
}

/* ==========================================================================
   STATIC FALLBACK PAGE (SSR, Reduced Motion, No-JS)
   ========================================================================== */
.xib-static-fallback {
  display: none;
  background-color: var(--night);
  color: var(--ink);
  padding: 40px 24px 80px;
  min-height: 100vh;
}

.xib-fallback-header {
  max-width: 1040px;
  margin: 0 auto 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(238, 250, 246, 0.15);
  padding-bottom: 24px;
}

.xib-fallback-brand {
  display: flex;
  align-items: center;
  gap: 16px;
}

.xib-fallback-logo {
  font-family: var(--font-oswald), sans-serif;
  font-size: 24px;
  letter-spacing: 0.2em;
  margin: 0;
}

.xib-fallback-sublogo {
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--jade);
  margin: 0;
}

.xib-fallback-nav {
  display: flex;
  gap: 20px;
}

.xib-fallback-nav a {
  color: var(--soft);
  text-decoration: none;
  font-size: 13px;
}

.xib-fallback-nav a:hover {
  color: var(--ember);
}

.xib-fallback-hero,
.xib-fallback-section {
  max-width: 1040px;
  margin: 0 auto 64px;
}

.xib-fallback-hero-content {
  text-align: center;
}

.xib-kicker {
  display: inline-block;
  font-family: var(--font-oswald), sans-serif;
  font-size: 12px;
  letter-spacing: 0.16em;
  color: var(--jade);
  margin-bottom: 8px;
}

.xib-fallback-title {
  font-family: var(--font-oswald), sans-serif;
  font-size: clamp(48px, 6vw, 92px);
  letter-spacing: 0.35em;
  margin: 0 0 16px;
}

.xib-fallback-lead {
  max-width: 680px;
  margin: 0 auto 36px;
  font-size: 16px;
  line-height: 1.65;
  color: var(--soft);
}

.xib-fallback-plate {
  margin-top: 24px;
  background: var(--obsidian);
  border: 1px solid rgba(95, 242, 200, 0.2);
  border-radius: 4px;
  overflow: hidden;
}

.xib-fallback-plate img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
}

.xib-plate-caption {
  display: block;
  padding: 12px 18px;
  font-size: 12px;
  color: var(--soft);
  text-align: left;
  border-top: 1px solid rgba(238, 250, 246, 0.1);
}

.xib-fallback-section-inner h2 {
  font-family: var(--font-oswald), sans-serif;
  font-size: clamp(26px, 3vw, 42px);
  margin: 0 0 14px;
}

.xib-fallback-section-inner p {
  color: var(--soft);
  line-height: 1.65;
  margin: 0 0 16px;
  max-width: 720px;
}

.xib-fallback-folios {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 24px;
}

.xib-folio-entry {
  background: var(--obsidian);
  border: 1px solid rgba(238, 250, 246, 0.12);
  padding: 20px;
  border-radius: 3px;
}

.xib-folio-meta {
  font-size: 11px;
  color: var(--jade);
  display: block;
  margin-bottom: 6px;
}

.xib-folio-entry h3 {
  font-family: var(--font-oswald), sans-serif;
  font-size: 18px;
  margin: 0 0 8px;
}

.xib-folio-entry p {
  font-size: 13px;
  line-height: 1.6;
}

.xib-folio-rite {
  font-size: 12px;
  color: var(--ember);
  margin-top: 10px;
}

.xib-stations-table {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
}

.xib-station-row {
  display: flex;
  gap: 24px;
  background: var(--obsidian);
  border: 1px solid rgba(238, 250, 246, 0.1);
  padding: 16px;
  border-radius: 3px;
}

.xib-station-depth {
  font-family: var(--font-oswald), sans-serif;
  font-size: 20px;
  color: var(--jade);
  min-width: 70px;
}

.xib-station-info h4 {
  margin: 0 0 4px;
  font-family: var(--font-oswald), sans-serif;
  font-size: 16px;
}

.xib-station-time {
  font-size: 12px;
  color: var(--soft);
  margin: 0 0 8px;
}

.xib-station-tags {
  display: flex;
  gap: 12px;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 11px;
  color: rgba(218, 242, 234, 0.7);
}

.xib-fallback-footer {
  max-width: 1040px;
  margin: 60px auto 0;
  border-top: 1px solid rgba(238, 250, 246, 0.15);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: rgba(218, 242, 234, 0.5);
}

/* ==========================================================================
   REDUCED MOTION & ACCESSIBILITY OVERRIDES
   ========================================================================== */
@media (prefers-reduced-motion: reduce) {
  .xib-static-fallback {
    display: block;
  }
  .xib-interactive-root {
    display: none;
  }
  .glow,
  .moonglow,
  .mist {
    animation: none !important;
  }
  .hero-h1 span {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
  .reveal-item {
    transform: none !important;
    opacity: 1 !important;
  }
}
]]>
    </file>
    <file path="src/app/(xibalba)/xibalba/components/InteractiveModals.tsx">
<![CDATA[import React, { useState } from 'react';
import { CODEX_FOLIOS, DESCENT_STATIONS } from '../data/sceneData';
import {
  PassageReservationInput,
  validatePassageReservation,
} from '../utils/cenoteMath';

export type ActiveModalType = 'codex' | 'reserve' | 'map' | null;

interface InteractiveModalsProps {
  activeModal: ActiveModalType;
  onClose: () => void;
  onJumpToScene: (sceneId: string) => void;
  reservedPassages: Array<PassageReservationInput & { code: string }>;
  onAddReservation: (res: PassageReservationInput & { code: string }) => void;
}

export const InteractiveModals: React.FC<InteractiveModalsProps> = ({
  activeModal,
  onClose,
  onJumpToScene,
  reservedPassages,
  onAddReservation,
}) => {
  const [activeFolioIndex, setActiveFolioIndex] = useState(0);

  // Reservation form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [waveTime, setWaveTime] = useState('18:00');
  const [partySize, setPartySize] = useState(2);
  const [censerOption, setCenserOption] = useState<'borrow' | 'bring'>('borrow');
  const [barkWish, setBarkWish] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [latestConfirmation, setLatestConfirmation] = useState<string | null>(null);

  if (!activeModal) return null;

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input: PassageReservationInput = {
      fullName,
      email,
      waveTime,
      partySize: Number(partySize),
      censerOption,
      barkWish,
    };
    const result = validatePassageReservation(input);
    if (!result.valid || !result.confirmationCode) {
      setFormErrors(result.errors as Record<string, string>);
      return;
    }
    setFormErrors({});
    setLatestConfirmation(result.confirmationCode);
    onAddReservation({ ...input, code: result.confirmationCode });
  };

  const resetReserveForm = () => {
    setLatestConfirmation(null);
    setFullName('');
    setEmail('');
    setBarkWish('');
    setFormErrors({});
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-panel">
        <button
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          Close ×
        </button>

        {activeModal === 'codex' && (
          <div className="codex-modal-content">
            <p className="modal-kicker">Amate Bark Archive · Three Hundred Years of the Descent</p>
            <h2 id="modal-heading" className="modal-title">
              The Equinox Codex
            </h2>
            <div className="rule modal-rule" />

            <div className="codex-tabs" role="tablist" aria-label="Codex Folios">
              {CODEX_FOLIOS.map((folio, idx) => (
                <button
                  key={folio.numeral}
                  type="button"
                  role="tab"
                  aria-selected={activeFolioIndex === idx}
                  className={`codex-tab ${activeFolioIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveFolioIndex(idx)}
                >
                  {folio.numeral}
                </button>
              ))}
            </div>

            {(() => {
              const folio = CODEX_FOLIOS[activeFolioIndex];
              return (
                <article className="codex-folio-card" role="tabpanel">
                  <div className="codex-meta-row">
                    <span>{folio.mayaGlyphName}</span>
                    <span aria-hidden="true">·</span>
                    <span>{folio.depth}</span>
                  </div>
                  <h3 className="codex-folio-heading">{folio.title}</h3>
                  <p className="codex-folio-body">{folio.excerpt}</p>
                  <div className="codex-rite-box">
                    <span className="codex-rite-label">Rite Protocol</span>
                    <p>{folio.riteNotes}</p>
                  </div>
                </article>
              );
            })()}

            <div className="modal-footer-actions">
              <button
                type="button"
                className="btn-ghost"
                disabled={activeFolioIndex === 0}
                onClick={() => setActiveFolioIndex((i) => Math.max(0, i - 1))}
              >
                Previous Folio
              </button>
              <button
                type="button"
                className="btn-solid"
                onClick={() => {
                  if (activeFolioIndex < CODEX_FOLIOS.length - 1) {
                    setActiveFolioIndex((i) => i + 1);
                  } else {
                    onClose();
                  }
                }}
              >
                {activeFolioIndex < CODEX_FOLIOS.length - 1 ? 'Next Folio' : 'Return to Cenote'}
              </button>
            </div>
          </div>
        )}

        {activeModal === 'map' && (
          <div className="map-modal-content">
            <p className="modal-kicker">Subterranean Cross-Section · 0m to -180m</p>
            <h2 id="modal-heading" className="modal-title">
              Vertical Descent Map
            </h2>
            <div className="rule modal-rule" />

            <div className="descent-station-list">
              {DESCENT_STATIONS.map((st) => (
                <div key={st.id} className="descent-station-item">
                  <div className="descent-station-header">
                    <div>
                      <span className="descent-depth-tag">{st.depthMeters}m Depth</span>
                      <h3 className="descent-station-title">{st.title}</h3>
                      <p className="descent-station-sub">{st.subtitle}</p>
                    </div>
                    <button
                      type="button"
                      className="btn-ghost btn-sm"
                      onClick={() => {
                        onJumpToScene(st.sceneId);
                        onClose();
                      }}
                    >
                      Descend Here
                    </button>
                  </div>
                  <div className="descent-highlights">
                    {st.highlights.map((h, i) => (
                      <React.Fragment key={h}>
                        {i > 0 && <span aria-hidden="true">·</span>}
                        <span>{h}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeModal === 'reserve' && (
          <div className="reserve-modal-content">
            <p className="modal-kicker">Autumn Equinox · Gates Open at 18:00</p>
            <h2 id="modal-heading" className="modal-title">
              Reserve Equinox Passage
            </h2>
            <div className="rule modal-rule" />

            {latestConfirmation ? (
              <div className="reservation-confirmed" data-testid="reservation-confirmation">
                <p className="confirmed-kicker">Passage Inscribed in the Turning Stone</p>
                <h3 className="confirmed-code">{latestConfirmation}</h3>
                <p className="confirmed-details">
                  Reserved for <strong>{fullName}</strong> · Party of {partySize} · Wave{' '}
                  {waveTime} ({censerOption === 'borrow' ? 'Rim Censer Loaned' : 'Personal Clay Censer'})
                </p>
                {barkWish.trim() && (
                  <p className="confirmed-wish">
                    Amate Bark Wish: <em>“{barkWish.trim()}”</em>
                  </p>
                )}
                <div className="modal-footer-actions">
                  <button type="button" className="btn-ghost" onClick={resetReserveForm}>
                    Inscribe Another Passage
                  </button>
                  <button type="button" className="btn-solid" onClick={onClose}>
                    Return to Sanctuary
                  </button>
                </div>
              </div>
            ) : (
              <form className="reserve-form" onSubmit={handleReserveSubmit} noValidate>
                <div className="form-field">
                  <label htmlFor="reserve-name">Pilgrim Full Name</label>
                  <input
                    id="reserve-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ixchel Balam"
                    required
                  />
                  {formErrors.fullName && (
                    <span className="field-error" role="alert">
                      {formErrors.fullName}
                    </span>
                  )}
                </div>

                <div className="form-field">
                  <label htmlFor="reserve-email">Dispatch Email</label>
                  <input
                    id="reserve-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="pilgrim@xibalba.org"
                    required
                  />
                  {formErrors.email && (
                    <span className="field-error" role="alert">
                      {formErrors.email}
                    </span>
                  )}
                </div>

                <div className="form-row-2">
                  <div className="form-field">
                    <label htmlFor="reserve-wave">Descent Wave</label>
                    <select
                      id="reserve-wave"
                      value={waveTime}
                      onChange={(e) => setWaveTime(e.target.value)}
                    >
                      <option value="18:00">18:00 — Rim Dusk Procession</option>
                      <option value="19:30">19:30 — Ghost Orchid Watch</option>
                      <option value="21:00">21:00 — Turning Wheel Cadence</option>
                      <option value="22:30">22:30 — Midnight Cauldron Vigil</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label htmlFor="reserve-party">Party Size (1–8)</label>
                    <input
                      id="reserve-party"
                      type="number"
                      min={1}
                      max={8}
                      value={partySize}
                      onChange={(e) => setPartySize(parseInt(e.target.value || '1', 10))}
                    />
                    {formErrors.partySize && (
                      <span className="field-error" role="alert">
                        {formErrors.partySize}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="reserve-censer">Clay Copal Censer</label>
                  <select
                    id="reserve-censer"
                    value={censerOption}
                    onChange={(e) => setCenserOption(e.target.value as 'borrow' | 'bring')}
                  >
                    <option value="borrow">Borrow a clay copal censer at the rim gate</option>
                    <option value="bring">Bringing our own ceremonial clay censer</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="reserve-wish">
                    Amate Bark Strip Wish (Optional — Wedged into the Turning Stone)
                  </label>
                  <input
                    id="reserve-wish"
                    type="text"
                    value={barkWish}
                    onChange={(e) => setBarkWish(e.target.value)}
                    placeholder="Write a brief wish for the water-wheel..."
                  />
                </div>

                {reservedPassages.length > 0 && (
                  <p className="existing-reservations-note">
                    {reservedPassages.length} passage{reservedPassages.length > 1 ? 's' : ''} sealed
                    in this session (latest: {reservedPassages[reservedPassages.length - 1].code}).
                  </p>
                )}

                <div className="modal-footer-actions">
                  <button type="button" className="btn-ghost" onClick={onClose}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-solid">
                    Confirm Passage
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(xibalba)/xibalba/components/Navbar.tsx">
<![CDATA[import React from 'react';

interface NavbarProps {
  onNavigate: (targetId: string) => void;
  onOpenReserve: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenReserve }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    onNavigate(targetId);
  };

  return (
    <header className="nav" role="banner">
      <nav className="nav-left" aria-label="Cenote sections">
        <a href="#story" onClick={(e) => handleLinkClick(e, 'story')}>
          The Cenote
        </a>
        <a href="#rites" onClick={(e) => handleLinkClick(e, 'rites')}>
          The Calendar
        </a>
        <a href="#night" onClick={(e) => handleLinkClick(e, 'night')}>
          Pilgrims
        </a>
      </nav>

      <a
        href="#top"
        className="nav-logo"
        aria-label="Xibalba Home"
        onClick={(e) => handleLinkClick(e, 'top')}
      >
        <svg width="26" height="24" viewBox="0 0 26 24" aria-hidden="true">
          <polygon points="13,1 25,23 1,23" fill="#EEFAF6" />
          <circle cx="13" cy="15.2" r="3.4" fill="#040A0E" />
          <circle cx="14.4" cy="14.4" r="3" fill="#EEFAF6" />
        </svg>
      </a>

      <nav className="nav-right" aria-label="Sanctuary and Passages">
        <a href="#finale" onClick={(e) => handleLinkClick(e, 'finale')}>
          Sanctuary
        </a>
        <a href="#finale" onClick={(e) => handleLinkClick(e, 'finale')}>
          Codex
        </a>
        <button
          type="button"
          className="nav-cta"
          onClick={onOpenReserve}
          aria-label="Reserve Passage"
        >
          Passages
        </button>
      </nav>
    </header>
  );
};
]]>
    </file>
    <file path="src/app/(xibalba)/xibalba/components/SeamBand.tsx">
<![CDATA[import React from 'react';
import { SeamSpec } from '../data/sceneData';

interface SeamBandProps {
  seam: SeamSpec;
  keyedSrc?: string;
}

export const SeamBand: React.FC<SeamBandProps> = ({ seam, keyedSrc }) => {
  return (
    <div
      className="seam"
      data-seam-id={seam.id}
      style={{ '--focus': seam.focus } as React.CSSProperties}
    >
      <div className="band">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="seam-img"
          src={keyedSrc || seam.imgSrc}
          alt={`Limestone transition: ${seam.between}`}
          referrerPolicy="no-referrer"
          draggable={false}
        />
        {seam.fall && (
          <canvas
            className="fall seam-fall"
            data-kind={seam.fall.kind}
            data-speed={seam.fall.speed}
            style={{
              left: `${seam.fall.left}%`,
              top: `${seam.fall.top}%`,
              width: `${seam.fall.width}%`,
              height: `${seam.fall.height}%`,
            }}
          />
        )}
        {seam.glows.map((g, idx) => (
          <div
            key={idx}
            className={`glow ${g.cold ? 'cold' : ''}`}
            style={{
              left: `${g.left}%`,
              top: `${g.top}%`,
              width: `${g.width}%`,
              animationDelay: `${g.delay || 0}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(xibalba)/xibalba/components/StaticFallbackPage.tsx">
<![CDATA[/* eslint-disable @next/next/no-img-element */
import React from 'react';
import {
  ASSET_URLS,
  CODEX_FOLIOS,
  DESCENT_STATIONS,
} from '../data/sceneData';

export const StaticFallbackPage: React.FC = () => {
  return (
    <div className="xib-static-fallback">
      {/* Top Banner & Header */}
      <header className="xib-fallback-header">
        <div className="xib-fallback-brand">
          <svg width="28" height="26" viewBox="0 0 26 24" aria-hidden="true">
            <polygon points="13,1 25,23 1,23" fill="#EEFAF6" />
            <circle cx="13" cy="15.2" r="3.4" fill="#040A0E" />
            <circle cx="14.4" cy="14.4" r="3" fill="#EEFAF6" />
          </svg>
          <div>
            <h1 className="xib-fallback-logo">XIBALBA</h1>
            <p className="xib-fallback-sublogo">Night of the Jade Cenote</p>
          </div>
        </div>
        <nav className="xib-fallback-nav" aria-label="Descent overview">
          <a href="#station-top">Rim & Pyramid</a>
          <a href="#station-story">Orchid Vaults</a>
          <a href="#station-rites">Calendar Wheel</a>
          <a href="#station-night">Copal Foundry</a>
          <a href="#station-finale">Moon River</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="xib-fallback-hero" id="station-top">
        <div className="xib-fallback-hero-content">
          <span className="xib-kicker">AUTUMN EQUINOX OBSERVATORY</span>
          <h2 className="xib-fallback-title">XIBALBA</h2>
          <p className="xib-fallback-lead">
            An illustrated vertical descent into a collapsed Yucatan limestone sinkhole at midnight:
            five full-bleed scenes joined across every boundary by subterranean limestone seam bands,
            bioluminescent jade waterfalls, and warm copal firelight.
          </p>
          <figure className="xib-fallback-plate">
            <img
              src={ASSET_URLS.scene1}
              alt="The Jungle Rim, Eclipsed Pyramid, and Upper & Lower Jade Falls"
              loading="eager"
            />
            <figcaption className="xib-plate-caption">
              Scene I — The Jungle Rim & Eclipsed Pyramid of Kukulcán (0m Elevation)
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Station II */}
      <section className="xib-fallback-section" id="station-story">
        <div className="xib-fallback-section-inner">
          <span className="xib-kicker">STATION II · -42M DEPTH</span>
          <h2>The Cenote & Ghost-Orchid Vault</h2>
          <p>
            Every autumn equinox the subterranean springs of Xibalba run luminous jade. For one
            night the canyon rim lights its copal braziers, the root-carved steps open, and the
            forest spirits descend to the water.
          </p>
          <p>
            We have kept the descent for three hundred years: a walk through the orchid vaults, the
            water-calendar, and the resin kilns, ending where the underground river meets the moon.
          </p>
          <figure className="xib-fallback-plate">
            <img
              src={ASSET_URLS.scene2}
              alt="The Cenote, Central Falls, Obsidian Mirror, and 6 Orchid Cylinders"
              loading="lazy"
            />
            <figcaption className="xib-plate-caption">
              Scene II — The Cenote & Ghost-Orchid Vault (-42m Elevation)
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Station III */}
      <section className="xib-fallback-section" id="station-rites">
        <div className="xib-fallback-section-inner">
          <span className="xib-kicker">STATION III · -96M DEPTH</span>
          <h2>The Calendar Wheel & Canopy Walk</h2>
          <h3>The Canopy Walk.</h3>
          <p>
            At dusk the procession leaves the pyramid steps and follows the jade cascade down into the
            limestone chasm. Bring a clay copal censer, or borrow one of ours at the rim. Initiates
            lead, the elders walk last, and nobody looks back until the water-drums stop.
          </p>
          <h3>The Turning Stone.</h3>
          <p>
            Below the upper falls the carved Mayan wheel turns all night. Press a wish onto a beaten
            bark strip, wedge it into a stone tooth, and let the current carry it round to midnight.
          </p>
          <figure className="xib-fallback-plate">
            <img
              src={ASSET_URLS.scene3}
              alt="The Calendar Wheel, Left Falls, and Twin Codex Pedestals"
              loading="lazy"
            />
            <figcaption className="xib-plate-caption">
              Scene III — The Turning Stone Water-Calendar Wheel (-96m Elevation)
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Station IV */}
      <section className="xib-fallback-section" id="station-night">
        <div className="xib-fallback-section-inner">
          <span className="xib-kicker">STATION IV · -145M DEPTH</span>
          <h2>The Copal Foundry & Serpent Cauldron</h2>
          <h3>Rim Gates at Six.</h3>
          <p>
            The stone gates open at 18:00 on the Equinox. The walk takes ninety minutes down the steps,
            and the foundry halls stay open until three, serving spiced cacao, honey balché, and
            roasted squash.
          </p>
          <h3>Midnight at the Cauldron.</h3>
          <p>
            At the twelfth conch blast the three serpent conduits are unsealed and every lotus lantern
            is carried down to the subterranean river. Stay for it.
          </p>
          <figure className="xib-fallback-plate">
            <img
              src={ASSET_URLS.scene4}
              alt="The Copal Foundry, Serpent Cauldron, and Molten Resin Streams"
              loading="lazy"
            />
            <figcaption className="xib-plate-caption">
              Scene IV — The Copal Kiln Foundry & Serpent Spouts (-145m Elevation)
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Station V & Finale */}
      <section className="xib-fallback-section" id="station-finale">
        <div className="xib-fallback-section-inner">
          <span className="xib-kicker">STATION V · -180M DEPTH</span>
          <h2>Meet us where the river opens.</h2>
          <p>
            Where the subterranean river meets the low horizon moon, fifteen ceremonial lotus
            lanterns drift across the obsidian lagoon under the grand limestone arch.
          </p>
          <figure className="xib-fallback-plate">
            <img
              src={ASSET_URLS.scene5}
              alt="Sanctuary Where the River Opens, Low Moon & Pillar, and Floating Lotus Lanterns"
              loading="lazy"
            />
            <figcaption className="xib-plate-caption">
              Scene V — The Moon River Sanctuary & Lotus Lantern Fleet (-180m Elevation)
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Codex Folios Section */}
      <section className="xib-fallback-section">
        <div className="xib-fallback-section-inner">
          <span className="xib-kicker">AMATE BARK ARCHIVE</span>
          <h2>The Equinox Codex Folios</h2>
          <div className="xib-fallback-folios">
            {CODEX_FOLIOS.map((folio) => (
              <article key={folio.numeral} className="xib-folio-entry">
                <span className="xib-folio-meta">{folio.numeral} · {folio.mayaGlyphName} · {folio.depth}</span>
                <h3>{folio.title}</h3>
                <p>{folio.excerpt}</p>
                <div className="xib-folio-rite">
                  <strong>Rite Protocol:</strong> {folio.riteNotes}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Descent Stations Table */}
      <section className="xib-fallback-section">
        <div className="xib-fallback-section-inner">
          <span className="xib-kicker">STATION ELEVATIONS & PROTOCOLS</span>
          <h2>Subterranean Cross-Section</h2>
          <div className="xib-stations-table">
            {DESCENT_STATIONS.map((st) => (
              <div key={st.id} className="xib-station-row">
                <div className="xib-station-depth">{st.depthMeters}m</div>
                <div className="xib-station-info">
                  <h4>{st.title}</h4>
                  <p className="xib-station-time">{st.subtitle}</p>
                  <ul className="xib-station-tags">
                    {st.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="xib-fallback-footer">
        <p>© 2026 Xibalba Nocturnal Reserve · Yucatan, Mexico</p>
        <p>Autumn Equinox Descent · 18:00 to 03:00</p>
      </footer>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(xibalba)/xibalba/components/XibalbaExperience.tsx">
<![CDATA['use client';

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';
import {
  ASSET_URLS,
  SCENE1_GLOWS,
  SCENE2_GLOWS,
  SCENE3_GLOWS,
  SCENE4_GLOWS,
  SCENE5_GLOWS,
  SEAMS_DATA,
} from '../data/sceneData';
import {
  initFallsCanvases,
  initParticlesCanvases,
  initSprites,
  keyBlackBackgroundToAlpha,
} from '../utils/cenoteEngine';
import { Navbar } from './Navbar';
import { SeamBand } from './SeamBand';
import { ActiveModalType, InteractiveModals } from './InteractiveModals';
import { PassageReservationInput } from '../utils/cenoteMath';

const HERO_LETTERS = ['X', 'I', 'B', 'A', 'L', 'B', 'A'];

export const XibalbaExperience: React.FC = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const lampRef = useRef<HTMLDivElement>(null);
  const heroH1Ref = useRef<HTMLHeadingElement>(null);
  const heroWrapRef = useRef<HTMLDivElement>(null);

  const [keyedSeams] = useState<Record<string, string>>({
    'seam-1': ASSET_URLS.seam1,
    'seam-2': ASSET_URLS.seam2,
    'seam-3': ASSET_URLS.seam3,
    'seam-4': ASSET_URLS.seam4,
  });
  const [activeModal, setActiveModal] = useState<ActiveModalType>(null);
  const [reservedPassages, setReservedPassages] = useState<
    Array<PassageReservationInput & { code: string }>
  >([]);

  // Main animation loop: waterfalls, molten copal, ambient particles, spirits, bats, cursor lamp, and momentum scroll
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const fallsEngine = initFallsCanvases(scroller);
    const particlesEngine = initParticlesCanvases(scroller);
    const spritesEngine = initSprites(scroller);
    const sceneEls = Array.from(scroller.querySelectorAll<HTMLElement>('.scene'));

    // Sync document.body height to scroller height so native scrollbar & wheel drive momentum scroll
    const updateBodyHeight = () => {
      if (scrollerRef.current) {
        document.body.style.height = `${scrollerRef.current.scrollHeight}px`;
      }
    };
    updateBodyHeight();

    const resizeObs = new ResizeObserver(updateBodyHeight);
    resizeObs.observe(scroller);
    window.addEventListener('resize', updateBodyHeight);

    // Cursor torch (.lamp)
    const onPointerMove = (e: PointerEvent) => {
      if (lampRef.current) {
        lampRef.current.style.transform = `translate3d(${(e.clientX - 260).toFixed(1)}px, ${(
          e.clientY - 260
        ).toFixed(1)}px, 0)`;
      }
    };
    window.addEventListener('pointermove', onPointerMove);

    // Fast layout-free arithmetic check for line-by-line reveal
    const updateInViewScenes = (scrollYPos: number, artHVal: number, vhVal: number) => {
      for (let i = 0; i < sceneEls.length; i++) {
        const scene = sceneEls[i];
        if (scene.classList.contains('in-view')) continue;
        const sceneTop = i * artHVal - scrollYPos;
        const sceneBottom = sceneTop + artHVal;
        if (sceneTop < vhVal * 0.88 && sceneBottom > vhVal * 0.08) {
          scene.classList.add('in-view');
        }
      }
    };

    let currentY = window.scrollY;
    let lastTime = performance.now() / 1000;
    let rafId = 0;

    const tick = (nowMs: number) => {
      const t = nowMs / 1000;
      const dt = Math.min(0.05, Math.max(0.001, t - lastTime));
      lastTime = t;

      const vh = window.innerHeight;
      const artH = scroller.firstElementChild?.clientHeight || vh;

      if (!reducedMotion) {
        const targetY = window.scrollY;
        const easeFactor = 1 - Math.exp(-12 * dt);
        currentY += (targetY - currentY) * easeFactor;
        if (Math.abs(targetY - currentY) < 0.35) {
          currentY = targetY;
        }

        scroller.style.transform = `translate3d(0, ${-currentY.toFixed(2)}px, 0)`;

        // Hero title letter-spacing spread & subtle vertical parallax on scroll
        const heroProgress = Math.min(1.5, Math.max(0, currentY / artH));
        if (heroH1Ref.current) {
          heroH1Ref.current.style.setProperty('--lsx', `${(heroProgress * 0.26).toFixed(4)}em`);
        }
        if (heroWrapRef.current) {
          heroWrapRef.current.style.transform = `translate3d(-50%, ${(
            heroProgress *
            artH *
            0.18
          ).toFixed(1)}px, 0)`;
        }
      }

      updateInViewScenes(currentY, artH, vh);
      fallsEngine.render(t, currentY, vh);
      particlesEngine.render(t, currentY, vh);
      spritesEngine.update(t, dt, currentY, artH);

      rafId = requestAnimationFrame(tick);
    };

    updateInViewScenes(
      currentY,
      scroller.firstElementChild?.clientHeight || window.innerHeight,
      window.innerHeight
    );
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObs.disconnect();
      window.removeEventListener('resize', updateBodyHeight);
      window.removeEventListener('pointermove', onPointerMove);
      fallsEngine.cleanup();
      particlesEngine.cleanup();
      spritesEngine.cleanup();
      document.body.style.height = '';
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const targetEl = scroller.querySelector<HTMLElement>(`#${sectionId}`);
    if (!targetEl) return;
    const topOffset = targetEl.offsetTop;
    window.scrollTo({ top: topOffset, behavior: 'smooth' });
  };

  return (
    <div className="xib-interactive-root">
      <Navbar
        onNavigate={scrollToSection}
        onOpenReserve={() => setActiveModal('reserve')}
      />

      <div ref={lampRef} className="lamp" aria-hidden="true" />

      <div id="scroller" ref={scrollerRef}>
        {/* ================================================================
            SCENE 1 — HERO: "XIBALBA" (#top, --focus: 50)
           ================================================================ */}
        <section
          className="scene in-view"
          id="top"
          style={{ '--focus': 50 } as React.CSSProperties}
          aria-label="Xibalba — Night of the Jade Cenote"
        >
          <div className="art">
            <img
              className="scene-bg"
              src={ASSET_URLS.scene1}
              alt="The Jungle Rim, Eclipsed Pyramid, and Upper & Lower Jade Falls"
              referrerPolicy="no-referrer"
              draggable={false}
            />

            {/* Moonglow: 50.0 / 18.2, width 14% */}
            <div
              className="moonglow"
              style={{ left: '50.0%', top: '18.2%', width: '14%' }}
            />

            {/* Upper falls canvas (ghost, speed 1): 47.5 / 55.5, 4.8 × 26 */}
            <canvas
              className="fall"
              data-kind="ghost"
              data-speed="1"
              style={{ left: '47.5%', top: '55.5%', width: '4.8%', height: '26%' }}
            />

            {/* Mist: 50.0 / 80.5, 20 × 8 */}
            <div
              className="mist"
              style={{ left: '50.0%', top: '80.5%', width: '20%', height: '8%' }}
            />

            {/* Lower cascade canvas (ghost, speed 1.15): 39.5 / 82.0, 21.0 × 20 */}
            <canvas
              className="fall"
              data-kind="ghost"
              data-speed="1.15"
              style={{ left: '39.5%', top: '82.0%', width: '21.0%', height: '20%' }}
            />

            {/* 12 Warm copal-brazier glows */}
            {SCENE1_GLOWS.map((g, idx) => (
              <div
                key={idx}
                className="glow"
                style={{
                  left: `${g.left}%`,
                  top: `${g.top}%`,
                  width: `${g.width}%`,
                  animationDelay: `${g.delay || 0}s`,
                }}
              />
            ))}

            {/* Wisp canvas: 70 rising jade spores */}
            <canvas
              className="particles"
              data-kind="wisp"
              data-count="70"
              style={{ left: '0%', top: '0%', width: '100%', height: '100%' }}
            />

            {/* Sprites: spirit1 at 21/28 (4.2%), spirit2 at 78/22 (3.4%), spirit4 at 64/42 (2.8%), spirit3 at 36/44 (2.4%) */}
            <div
              className="sprite spirit spirit1"
              style={{ left: '21%', top: '28%', width: '4.2%' }}
            />
            <div
              className="sprite spirit spirit2"
              style={{ left: '78%', top: '22%', width: '3.4%' }}
            />
            <div
              className="sprite spirit spirit4"
              style={{ left: '64%', top: '42%', width: '2.8%' }}
            />
            <div
              className="sprite spirit spirit3"
              style={{ left: '36%', top: '44%', width: '2.4%' }}
            />

            {/* 4 Bats crossing y: 8–32% */}
            <div className="sprite bat" data-y="10" style={{ left: '12%', top: '10%' }} />
            <div className="sprite bat" data-y="17" style={{ left: '42%', top: '17%' }} />
            <div className="sprite bat" data-y="24" style={{ left: '68%', top: '24%' }} />
            <div className="sprite bat" data-y="30" style={{ left: '84%', top: '30%' }} />

            {/* Hero Copy */}
            <div ref={heroWrapRef} className="hero-title-wrap">
              <h1 ref={heroH1Ref} className="hero-h1" aria-label="XIBALBA">
                {HERO_LETTERS.map((char, idx) => (
                  <span
                    key={idx}
                    style={{ animationDelay: `${160 + idx * 80}ms` }}
                  >
                    {char}
                  </span>
                ))}
              </h1>
            </div>
            <p className="sub">NIGHT OF THE JADE CENOTE</p>
          </div>
        </section>

        {/* SEAM 1: Hero → The Cenote */}
        <SeamBand seam={SEAMS_DATA[0]} keyedSrc={keyedSeams['seam-1']} />

        {/* ================================================================
            SCENE 2 — "The Cenote" (#story, --focus: 52)
           ================================================================ */}
        <section
          className="scene"
          id="story"
          style={{ '--focus': 52 } as React.CSSProperties}
          aria-labelledby="heading-story"
        >
          <div className="art">
            <img
              className="scene-bg"
              src={ASSET_URLS.scene2}
              alt="The Cenote Orchid Vault with Central Jade Falls, Obsidian Mirror, and Six Ghost-Orchid Cylinders"
              referrerPolicy="no-referrer"
              draggable={false}
            />

            {/* Falls canvas (ghost, speed .95): 47.0 / 10.0, 12.5 × 82 */}
            <canvas
              className="fall"
              data-kind="ghost"
              data-speed="0.95"
              style={{ left: '47.0%', top: '10.0%', width: '12.5%', height: '82%' }}
            />

            {/* Mist: 53.0 / 88.5, 30 × 12 */}
            <div
              className="mist"
              style={{ left: '53.0%', top: '88.5%', width: '30%', height: '12%' }}
            />

            {/* Cold & Warm Glows */}
            {SCENE2_GLOWS.map((g, idx) => (
              <div
                key={idx}
                className={`glow ${g.cold ? 'cold' : ''}`}
                style={{
                  left: `${g.left}%`,
                  top: `${g.top}%`,
                  width: `${g.width}%`,
                  animationDelay: `${g.delay || 0}s`,
                }}
              />
            ))}

            {/* Mote canvas: 50 particles */}
            <canvas
              className="particles"
              data-kind="mote"
              data-count="50"
              style={{ left: '0%', top: '0%', width: '100%', height: '100%' }}
            />

            {/* Sprite: spirit4 at 38/24 (2.6%) */}
            <div
              className="sprite spirit spirit4"
              style={{ left: '38%', top: '24%', width: '2.6%' }}
            />

            {/* Copy at left: 13.5%; top: 31%; width: 31% */}
            <div className="copy" style={{ left: '13.5%', top: '31%', width: '31%' }}>
              <span className="reveal-mask">
                <h2 id="heading-story" className="reveal-item" style={{ transitionDelay: '60ms' }}>
                  The Cenote
                </h2>
              </span>
              <div className="rule" />
              <span className="reveal-mask">
                <p className="reveal-item" style={{ transitionDelay: '150ms' }}>
                  Every autumn equinox the subterranean springs of Xibalba run luminous jade. For
                  one night the canyon rim lights its copal braziers, the root-carved steps open,
                  and the forest spirits descend to the water.
                </p>
              </span>
              <span className="reveal-mask">
                <p className="reveal-item" style={{ transitionDelay: '240ms' }}>
                  We have kept the descent for three hundred years: a walk through the orchid
                  vaults, the water-calendar, and the resin kilns, ending where the underground
                  river meets the moon.
                </p>
              </span>
              <div className="btn-row">
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => setActiveModal('codex')}
                >
                  Read the codex
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SEAM 2: The Cenote → The Calendar */}
        <SeamBand seam={SEAMS_DATA[1]} keyedSrc={keyedSeams['seam-2']} />

        {/* ================================================================
            SCENE 3 — "The Calendar" (#rites, --focus: 30)
           ================================================================ */}
        <section
          className="scene"
          id="rites"
          style={{ '--focus': 30 } as React.CSSProperties}
          aria-labelledby="heading-rites"
        >
          <div className="art">
            <img
              className="scene-bg"
              src={ASSET_URLS.scene3}
              alt="The Mayan Water-Calendar Wheel and Twin Illuminated Jade Codices"
              referrerPolicy="no-referrer"
              draggable={false}
            />

            {/* Upper falls canvas (ghost, speed 1.05): 23.5 / 3.0, 8.0 × 30 */}
            <canvas
              className="fall"
              data-kind="ghost"
              data-speed="1.05"
              style={{ left: '23.5%', top: '3.0%', width: '8.0%', height: '30%' }}
            />

            {/* Wheel cascade canvas (ghost, speed 1.1): 18.5 / 33.0, 6.0 × 62 */}
            <canvas
              className="fall"
              data-kind="ghost"
              data-speed="1.1"
              style={{ left: '18.5%', top: '33.0%', width: '6.0%', height: '62%' }}
            />

            {/* Mist: 27.5 / 32.0, 18 × 9 */}
            <div
              className="mist"
              style={{ left: '27.5%', top: '32.0%', width: '18%', height: '9%' }}
            />

            {/* 5 Wheel braziers + 2 Cold codices + 3 Floor candles */}
            {SCENE3_GLOWS.map((g, idx) => (
              <div
                key={idx}
                className={`glow ${g.cold ? 'cold' : ''}`}
                style={{
                  left: `${g.left}%`,
                  top: `${g.top}%`,
                  width: `${g.width}%`,
                  animationDelay: `${g.delay || 0}s`,
                }}
              />
            ))}

            {/* Spray canvas: 60 particles */}
            <canvas
              className="particles"
              data-kind="spray"
              data-count="60"
              data-x="18"
              data-w="22"
              data-y="22"
              data-h="20"
              style={{ left: '18%', top: '22%', width: '22%', height: '20%' }}
            />

            {/* Copy at left: 52%; top: 35.5%; width: 44% */}
            <div className="copy calendar-copy" style={{ left: '52%', top: '35.5%', width: '44%' }}>
              <span className="reveal-mask">
                <h2 id="heading-rites" className="reveal-item" style={{ transitionDelay: '60ms' }}>
                  The Calendar
                </h2>
              </span>
              <div className="rule" />
              <div
                className="copy-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  gap: '24px',
                }}
              >
                <div>
                  <span className="reveal-mask">
                    <h3 className="reveal-item" style={{ transitionDelay: '120ms' }}>
                      The Canopy Walk.
                    </h3>
                  </span>
                  <span className="reveal-mask">
                    <p className="reveal-item" style={{ transitionDelay: '180ms' }}>
                      At dusk the procession leaves the pyramid steps and follows the jade cascade down
                      into the limestone chasm. Bring a clay copal censer, or borrow one of ours at the
                      rim. Initiates lead, the elders walk last, and nobody looks back until the water-drums
                      stop.
                    </p>
                  </span>
                </div>
                <div>
                  <span className="reveal-mask">
                    <h3 className="reveal-item" style={{ transitionDelay: '240ms' }}>
                      The Turning Stone.
                    </h3>
                  </span>
                  <span className="reveal-mask">
                    <p className="reveal-item" style={{ transitionDelay: '300ms' }}>
                      Below the upper falls the carved Mayan wheel turns all night. Press a wish onto a
                      beaten bark strip, wedge it into a stone tooth, and let the current carry it
                      round to midnight.
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEAM 3: The Calendar → Plan Your Descent */}
        <SeamBand seam={SEAMS_DATA[2]} keyedSrc={keyedSeams['seam-3']} />

        {/* ================================================================
            SCENE 4 — "Plan Your Descent" (#night, --focus: 75)
           ================================================================ */}
        <section
          className="scene"
          id="night"
          style={{ '--focus': 75 } as React.CSSProperties}
          aria-labelledby="heading-night"
        >
          <div className="art">
            <img
              className="scene-bg"
              src={ASSET_URLS.scene4}
              alt="The Copal Foundry with Jade Waterfall Cauldron and Three Serpent Lava Streams"
              referrerPolicy="no-referrer"
              draggable={false}
            />

            {/* Falls canvas (ghost, speed 1): 68.0 / 0.0, 14.5 × 36 */}
            <canvas
              className="fall"
              data-kind="ghost"
              data-speed="1"
              style={{ left: '68.0%', top: '0.0%', width: '14.5%', height: '36%' }}
            />

            {/* Three molten copal resin canvases (lava, speeds .55 / .6 / .5) */}
            <canvas
              className="fall"
              data-kind="lava"
              data-speed="0.55"
              style={{ left: '64.0%', top: '59.5%', width: '1.8%', height: '32%' }}
            />
            <canvas
              className="fall"
              data-kind="lava"
              data-speed="0.6"
              style={{ left: '75.0%', top: '59.5%', width: '1.8%', height: '32%' }}
            />
            <canvas
              className="fall"
              data-kind="lava"
              data-speed="0.5"
              style={{ left: '85.8%', top: '59.5%', width: '1.8%', height: '32%' }}
            />

            {/* Warm & Cold Glows */}
            {SCENE4_GLOWS.map((g, idx) => (
              <div
                key={idx}
                className={`glow ${g.cold ? 'cold' : ''}`}
                style={{
                  left: `${g.left}%`,
                  top: `${g.top}%`,
                  width: `${g.width}%`,
                  animationDelay: `${g.delay || 0}s`,
                }}
              />
            ))}

            {/* Bubble canvas: 22 particles */}
            <canvas
              className="particles"
              data-kind="bubble"
              data-count="22"
              data-x="60"
              data-w="29"
              data-y="76"
              data-h="19"
              style={{ left: '60%', top: '76%', width: '29%', height: '19%' }}
            />

            {/* Copy at left: 7.5%; top: 35.5%; width: 44% */}
            <div className="copy foundry-copy" style={{ left: '7.5%', top: '35.5%', width: '44%' }}>
              <span className="reveal-mask">
                <h2 id="heading-night" className="reveal-item" style={{ transitionDelay: '60ms' }}>
                  Plan Your Descent
                </h2>
              </span>
              <div className="rule" />
              <div
                className="copy-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                  gap: '24px',
                }}
              >
                <div>
                  <span className="reveal-mask">
                    <h3 className="reveal-item" style={{ transitionDelay: '130ms' }}>
                      Rim Gates at Six.
                    </h3>
                  </span>
                  <span className="reveal-mask">
                    <p className="reveal-item" style={{ transitionDelay: '200ms' }}>
                      The stone gates open at 18:00 on the Equinox. The walk takes ninety minutes down
                      the steps, and the foundry halls stay open until three, serving spiced cacao,
                      honey balché, and roasted squash.
                    </p>
                  </span>
                </div>
                <div>
                  <span className="reveal-mask">
                    <h3 className="reveal-item" style={{ transitionDelay: '270ms' }}>
                      Midnight at the Cauldron.
                    </h3>
                  </span>
                  <span className="reveal-mask">
                    <p className="reveal-item" style={{ transitionDelay: '340ms' }}>
                      At the twelfth conch blast the three serpent conduits are unsealed and every
                      lotus lantern is carried down to the subterranean river. Stay for it.
                    </p>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEAM 4: Plan Your Descent → Finale */}
        <SeamBand seam={SEAMS_DATA[3]} keyedSrc={keyedSeams['seam-4']} />

        {/* ================================================================
            SCENE 5 — FINALE (#finale, --focus: 35)
           ================================================================ */}
        <section
          className="scene"
          id="finale"
          style={{ '--focus': 35 } as React.CSSProperties}
          aria-labelledby="heading-finale"
        >
          <div className="art">
            <img
              className="scene-bg"
              src={ASSET_URLS.scene5}
              alt="Subterranean Cavern Arch Opening to the Horizon Moon and Fifteen Floating Lotus Lanterns"
              referrerPolicy="no-referrer"
              draggable={false}
            />

            {/* Moonglow: 29.0 / 56.8, width 14% */}
            <div
              className="moonglow"
              style={{ left: '29.0%', top: '56.8%', width: '14%' }}
            />

            {/* Shimmer canvas: 90 glints */}
            <canvas
              className="particles"
              data-kind="shimmer"
              data-count="90"
              data-x="25"
              data-w="8"
              data-y="66"
              data-h="26"
              style={{ left: '25%', top: '66%', width: '8%', height: '26%' }}
            />

            {/* 15 Warm floating lotus-lantern glows + 2 Large cliff-brazier glows */}
            {SCENE5_GLOWS.map((g, idx) => (
              <div
                key={idx}
                className="glow"
                style={{
                  left: `${g.left}%`,
                  top: `${g.top}%`,
                  width: `${g.width}%`,
                  animationDelay: `${g.delay || 0}s`,
                }}
              />
            ))}

            {/* Sprites: spirit2 at 66/26 (3%), spirit1 at 22/36 (2.6%), and 3 bats in y: 20–38% */}
            <div
              className="sprite spirit spirit2"
              style={{ left: '66%', top: '26%', width: '3.0%' }}
            />
            <div
              className="sprite spirit spirit1"
              style={{ left: '22%', top: '36%', width: '2.6%' }}
            />
            <div className="sprite bat" data-y="22" style={{ left: '28%', top: '22%' }} />
            <div className="sprite bat" data-y="29" style={{ left: '54%', top: '29%' }} />
            <div className="sprite bat" data-y="36" style={{ left: '76%', top: '36%' }} />

            {/* Copy centred */}
            <div
              className="copy finale-copy"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                top: '48%',
                width: '60%',
                textAlign: 'center',
              }}
            >
              <span className="reveal-mask">
                <h2
                  id="heading-finale"
                  className="reveal-item"
                  style={{ transitionDelay: '80ms' }}
                >
                  Meet us where the river opens.
                </h2>
              </span>
              <div className="rule centered" />
              <div className="btn-row centered">
                <button
                  type="button"
                  className="btn-solid"
                  onClick={() => setActiveModal('reserve')}
                >
                  Reserve passage
                </button>
                <button
                  type="button"
                  className="btn-ghost"
                  onClick={() => setActiveModal('map')}
                >
                  View descent map
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <InteractiveModals
        activeModal={activeModal}
        onClose={() => setActiveModal(null)}
        onJumpToScene={scrollToSection}
        reservedPassages={reservedPassages}
        onAddReservation={(res) => setReservedPassages((prev) => [...prev, res])}
      />
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(xibalba)/xibalba/data/sceneData.ts">
<![CDATA[export interface GlowSpot {
  left: number;
  top: number;
  width: number;
  cold?: boolean;
  delay?: number;
}

export interface FallCanvasSpec {
  left: number;
  top: number;
  width: number;
  height: number;
  kind: 'ghost' | 'lava';
  speed: number;
}

export interface MistSpec {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface ParticleBoxSpec {
  kind: 'wisp' | 'mote' | 'spray' | 'bubble' | 'shimmer';
  count: number;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
}

export interface SpiritPlacement {
  type: 'spirit1' | 'spirit2' | 'spirit3' | 'spirit4';
  left: number;
  top: number;
  width: number;
}

export interface SeamSpec {
  id: string;
  between: string;
  focus: number;
  imgSrc: string;
  fall?: FallCanvasSpec;
  glows: GlowSpot[];
}

export interface CodexFolio {
  numeral: string;
  title: string;
  mayaGlyphName: string;
  depth: string;
  excerpt: string;
  riteNotes: string;
}

export interface DescentStation {
  id: string;
  sceneId: string;
  depthMeters: number;
  title: string;
  subtitle: string;
  highlights: string[];
}

export const ASSET_URLS = {
  scene1: '/templates/xibalba/scene1.png',
  scene2: '/templates/xibalba/scene2.png',
  scene3: '/templates/xibalba/scene3.png',
  scene4: '/templates/xibalba/scene4.png',
  scene5: '/templates/xibalba/scene5.png',
  seam1: '/templates/xibalba/seam1-keyed.webp',
  seam2: '/templates/xibalba/seam2-keyed.webp',
  seam3: '/templates/xibalba/seam3-keyed.webp',
  seam4: '/templates/xibalba/seam4-keyed.webp',
  sprites: '/templates/xibalba/scene-sprites-keyed.webp',
};

export const SEAMS_DATA: SeamSpec[] = [
  {
    id: 'seam-1',
    between: 'Hero → The Cenote',
    focus: 50,
    imgSrc: ASSET_URLS.seam1,
    fall: { left: 48.8, top: 50, width: 6.0, height: 35, kind: 'ghost', speed: 1 },
    glows: [
      { left: 12.8, top: 31.5, width: 3.2 },
      { left: 88.2, top: 31.5, width: 3.2, delay: 0.8 },
    ],
  },
  {
    id: 'seam-2',
    between: 'The Cenote → The Calendar',
    focus: 30,
    imgSrc: ASSET_URLS.seam2,
    fall: { left: 25.5, top: 27, width: 9.2, height: 55, kind: 'ghost', speed: 1 },
    glows: [
      { left: 83.8, top: 19.5, width: 4.5 },
      { left: 19.8, top: 21.0, width: 3.0, delay: 0.5 },
      { left: 45.2, top: 20.5, width: 3.5, delay: 1.2 },
    ],
  },
  {
    id: 'seam-3',
    between: 'The Calendar → Plan Your Descent',
    focus: 75,
    imgSrc: ASSET_URLS.seam3,
    fall: { left: 72.8, top: 36, width: 6.2, height: 46, kind: 'ghost', speed: 1 },
    glows: [
      { left: 29.5, top: 22.5, width: 10.0, cold: true },
      { left: 90.5, top: 22.5, width: 7.0, cold: true, delay: 1.1 },
    ],
  },
  {
    id: 'seam-4',
    between: 'Plan Your Descent → Finale',
    focus: 50,
    imgSrc: ASSET_URLS.seam4,
    glows: [
      { left: 67.2, top: 19.0, width: 6.5 },
      { left: 45.5, top: 30.5, width: 8.0, delay: 0.7 },
    ],
  },
];

export const SCENE1_GLOWS: GlowSpot[] = [
  // Left cliff
  { left: 8.1, top: 38.2, width: 4.5, delay: 0.1 },
  { left: 15.5, top: 45.8, width: 4.0, delay: 0.6 },
  { left: 23.5, top: 49.3, width: 3.6, delay: 1.2 },
  { left: 28.3, top: 57.5, width: 3.2, delay: 0.4 },
  { left: 23.8, top: 67.2, width: 4.2, delay: 1.5 },
  { left: 32.5, top: 69.2, width: 3.4, delay: 0.9 },
  // Right cliff
  { left: 90.8, top: 37.5, width: 4.5, delay: 0.3 },
  { left: 83.8, top: 45.8, width: 4.0, delay: 1.1 },
  { left: 76.5, top: 49.3, width: 3.6, delay: 0.7 },
  { left: 71.4, top: 57.5, width: 3.2, delay: 1.4 },
  { left: 75.2, top: 67.2, width: 4.2, delay: 0.2 },
  { left: 67.2, top: 69.2, width: 3.4, delay: 1.0 },
];

export const SCENE2_GLOWS: GlowSpot[] = [
  // Cold jade-cyan: Obsidian altar mirror + 6 Ghost-orchid cylinders
  { left: 26.5, top: 64.5, width: 6.5, cold: true, delay: 0.2 },
  { left: 73.2, top: 29.0, width: 4.8, cold: true, delay: 0.5 },
  { left: 86.0, top: 34.8, width: 4.8, cold: true, delay: 1.1 },
  { left: 75.2, top: 50.0, width: 4.2, cold: true, delay: 0.8 },
  { left: 79.5, top: 49.2, width: 4.8, cold: true, delay: 1.4 },
  { left: 71.8, top: 58.8, width: 4.8, cold: true, delay: 0.3 },
  { left: 86.0, top: 61.2, width: 4.8, cold: true, delay: 0.9 },
  // Warm glows
  { left: 7.8, top: 77.5, width: 3.8, delay: 0.4 },
  { left: 17.0, top: 81.0, width: 3.8, delay: 1.0 },
  { left: 92.5, top: 81.5, width: 5.5, delay: 0.7 },
];

export const SCENE3_GLOWS: GlowSpot[] = [
  // 5 Warm wheel-brazier glows (width 4.4%)
  { left: 13.8, top: 36.2, width: 4.4, delay: 0.2 },
  { left: 43.8, top: 36.5, width: 4.4, delay: 0.7 },
  { left: 50.0, top: 55.4, width: 4.4, delay: 1.3 },
  { left: 8.2, top: 69.2, width: 4.4, delay: 0.5 },
  { left: 48.2, top: 79.8, width: 4.4, delay: 1.0 },
  // 2 Cold jade-codex glows (width 8.5%)
  { left: 64.2, top: 61.5, width: 8.5, cold: true, delay: 0.3 },
  { left: 89.0, top: 61.5, width: 8.5, cold: true, delay: 1.1 },
  // 3 Warm floor-candle glows (width 2.6%)
  { left: 58.4, top: 81.8, width: 2.6, delay: 0.4 },
  { left: 76.8, top: 81.2, width: 2.6, delay: 0.9 },
  { left: 95.4, top: 82.2, width: 2.6, delay: 1.5 },
];

export const SCENE4_GLOWS: GlowSpot[] = [
  // Warm glows: floor pool, left resin vat, floor braziers
  { left: 74.5, top: 91.5, width: 26.0, delay: 0.1 },
  { left: 25.2, top: 72.5, width: 14.0, delay: 0.8 },
  { left: 14.5, top: 83.2, width: 5.0, delay: 0.4 },
  { left: 40.2, top: 77.2, width: 5.0, delay: 1.2 },
  // Cold glow where jade falls meet cauldron rim
  { left: 75.0, top: 35.5, width: 18.0, cold: true, delay: 0.5 },
];

export const SCENE5_GLOWS: GlowSpot[] = [
  // 15 Warm floating lotus-lantern glows
  { left: 34.0, top: 84.8, width: 2.8, delay: 0.1 },
  { left: 37.6, top: 90.2, width: 3.6, delay: 0.4 },
  { left: 38.0, top: 78.5, width: 2.0, delay: 0.8 },
  { left: 41.8, top: 81.5, width: 2.4, delay: 1.2 },
  { left: 43.6, top: 78.5, width: 2.0, delay: 0.3 },
  { left: 44.0, top: 85.8, width: 3.0, delay: 0.9 },
  { left: 46.4, top: 80.2, width: 2.2, delay: 1.4 },
  { left: 47.8, top: 84.2, width: 2.8, delay: 0.6 },
  { left: 51.8, top: 88.5, width: 3.4, delay: 1.1 },
  { left: 52.0, top: 81.2, width: 2.4, delay: 0.2 },
  { left: 55.6, top: 84.5, width: 2.8, delay: 0.7 },
  { left: 59.2, top: 81.2, width: 2.4, delay: 1.3 },
  { left: 61.2, top: 91.5, width: 3.8, delay: 0.5 },
  { left: 62.6, top: 84.5, width: 2.8, delay: 1.0 },
  { left: 68.8, top: 85.8, width: 3.0, delay: 1.5 },
  // 2 Large cliff-brazier glows
  { left: 12.2, top: 56.5, width: 9.0, delay: 0.3 },
  { left: 91.2, top: 73.5, width: 11.0, delay: 0.9 },
];

export const CODEX_FOLIOS: CodexFolio[] = [
  {
    numeral: 'Folio I',
    title: 'The Rim & Eclipse of Kukulcán',
    mayaGlyphName: 'AKʼAB · 0m Elev.',
    depth: 'Canyon Rim — 0m',
    excerpt:
      'When the autumn sun crosses the celestial equator, the stepped pyramid of the upper jungle casts a ring of amber fire across the sinkhole mouth. At dusk, twelve limestone braziers are lit along the fractured rim.',
    riteNotes:
      'Pilgrims receive unglazed clay copal censers at the upper stelae before descending the root-carved stairway.',
  },
  {
    numeral: 'Folio II',
    title: 'The Vault of Ghost Orchids',
    mayaGlyphName: 'IKʼ · -42m Elev.',
    depth: 'Orchid Vaults — -42m',
    excerpt:
      'Forty-two meters below the canopy, mineral-rich springs mist the carved columns where Dendrophylax lindenii—the leafless ghost orchid—blooms only on the night of the equinox in quartz-sealed reliquaries.',
    riteNotes:
      'Pause before the obsidian scrying mirror on the western ledge; speak no above-ground names past this threshold.',
  },
  {
    numeral: 'Folio III',
    title: 'The Haabʼ Water-Calendar Wheel',
    mayaGlyphName: 'KʼIN · -96m Elev.',
    depth: 'Calendar Chasm — -96m',
    excerpt:
      'Driven by the shearing western cascade, the monolith wheel completes a single revolution between sunset and midnight. Each stone tooth carries strips of beaten amate bark inscribed with prayers.',
    riteNotes:
      'Wedge your bark strip into an ascending tooth as the water-drums sound their slow 60-beat cadence.',
  },
  {
    numeral: 'Folio IV',
    title: 'The Serpent Foundry & Moon River',
    mayaGlyphName: 'HAʼ · -145m to -180m',
    depth: 'Copal Foundry & River Mouth — -180m',
    excerpt:
      'In the lower kiln cavern, jade springwater cools the great three-headed serpent cauldron while molten amber copal resin pours into the stone basin. Beyond the stalactite arch, the subterranean river opens to the low horizon moon.',
    riteNotes:
      'At the twelfth conch blast, carry a floating lotus lantern to the water’s edge and release it toward the sea.',
  },
];

export const DESCENT_STATIONS: DescentStation[] = [
  {
    id: 'station-top',
    sceneId: 'top',
    depthMeters: 0,
    title: 'I. The Jungle Rim & Eclipsed Pyramid',
    subtitle: '18:00 — Rim Gates & Twelve Copal Braziers',
    highlights: ['Upper & Lower Jade Cascade', 'Morpho Spirit Gathering', 'Censer Distribution'],
  },
  {
    id: 'station-story',
    sceneId: 'story',
    depthMeters: -42,
    title: 'II. The Cenote & Ghost-Orchid Vault',
    subtitle: '19:15 — Obsidian Altar Mirror & Six Reliquary Cylinders',
    highlights: ['Central Plunge Pool', 'Obsidian Scrying Altar', 'Bioluminescent Orchid Pillar'],
  },
  {
    id: 'station-rites',
    sceneId: 'rites',
    depthMeters: -96,
    title: 'III. The Turning Stone Calendar',
    subtitle: '21:00 — Mayan Water-Wheel & Twin Jade Codices',
    highlights: ['Hydro-Driven Calendar Monolith', 'Amate Bark Wish Press', 'Twin Illuminated Codices'],
  },
  {
    id: 'station-night',
    sceneId: 'night',
    depthMeters: -145,
    title: 'IV. The Copal Foundry & Serpent Cauldron',
    subtitle: '22:30 — Spiced Cacao, Honey Balché & Molten Resin Conduits',
    highlights: ['Three Serpent Resin Spouts', 'Amber Copal Kiln Vat', 'Foundry Feast Hall'],
  },
  {
    id: 'station-finale',
    sceneId: 'finale',
    depthMeters: -180,
    title: 'V. Sanctuary Where the River Opens',
    subtitle: '00:00 — Twelfth Conch Blast & Floating Lotus Lanterns',
    highlights: ['Seaward Cavern Arch', 'Horizon Moon Shimmer', 'Fifteen Lotus Lantern Fleet'],
  },
];
]]>
    </file>
    <file path="src/app/(xibalba)/xibalba/utils/cenoteEngine.ts">
<![CDATA[import {
  SPRITE_CROPS,
  SPRITE_SHEET_HEIGHT,
  SPRITE_SHEET_WIDTH,
  computeBatState,
  computeSpiritRepulsion,
  detectOuterBackgroundType,
} from './cenoteMath';

/**
 * Converts solid outer backgrounds (black or white) on seam images and sprite sheets
 * into true alpha transparency, while also feathering seam waterfall tails and sprite crop borders.
 */
export function keyBlackBackgroundToAlpha(
  imgUrl: string,
  mode: 'seam' | 'sprite' = 'seam'
): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const c = document.createElement('canvas');
        const w = (c.width = mode === 'sprite' ? SPRITE_SHEET_WIDTH : img.naturalWidth);
        const h = (c.height = mode === 'sprite' ? SPRITE_SHEET_HEIGHT : img.naturalHeight);
        const ctx = c.getContext('2d');
        if (!ctx) {
          resolve(imgUrl);
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        const imgData = ctx.getImageData(0, 0, w, h);
        const d = imgData.data;

        if (mode === 'seam') {
          const topType = detectOuterBackgroundType(d[0], d[1], d[2], d[3]);
          const botIdx = (h - 1) * w * 4;
          const botType = detectOuterBackgroundType(
            d[botIdx],
            d[botIdx + 1],
            d[botIdx + 2],
            d[botIdx + 3]
          );

          const isBgPixel = (idx: number, bgKind: string): boolean => {
            const a = d[idx + 3];
            if (a < 20) return true;
            const r = d[idx];
            const g = d[idx + 1];
            const b = d[idx + 2];
            const lum = r + g + b;
            if (bgKind === 'white') return lum > 690;
            return lum < 36;
          };

          // 1. Full-column top-down and bottom-up clear (no premature 0.45 cutoff)
          for (let x = 0; x < w; x++) {
            for (let y = 0; y < h * 0.75; y++) {
              const idx = (y * w + x) * 4;
              if (isBgPixel(idx, topType)) {
                d[idx + 3] = 0;
              } else {
                // Feather 2px rock border
                d[idx + 3] = Math.round(d[idx + 3] * 0.35);
                if (y + 1 < h) {
                  const nextIdx = ((y + 1) * w + x) * 4;
                  d[nextIdx + 3] = Math.round(d[nextIdx + 3] * 0.75);
                }
                break;
              }
            }

            for (let y = h - 1; y > h * 0.25; y--) {
              const idx = (y * w + x) * 4;
              if (isBgPixel(idx, botType)) {
                d[idx + 3] = 0;
              } else {
                d[idx + 3] = Math.round(d[idx + 3] * 0.35);
                if (y - 1 >= 0) {
                  const prevIdx = ((y - 1) * w + x) * 4;
                  d[prevIdx + 3] = Math.round(d[prevIdx + 3] * 0.75);
                }
                break;
              }
            }
          }

          // 2. Clear enclosed background pockets between hanging roots/chains in lower 45% and upper 45%
          for (let y = 0; y < h; y++) {
            const yRatio = y / h;
            if (yRatio > 0.36 && yRatio < 0.62) continue;
            const bgKind = yRatio <= 0.36 ? topType : botType;
            for (let x = 0; x < w; x++) {
              const idx = (y * w + x) * 4;
              if (d[idx + 3] === 0) continue;
              if (isBgPixel(idx, bgKind)) {
                d[idx + 3] = 0;
              }
            }
          }

          // 3. Smoothly feather out the bottom painted waterfall tail (y: 66% -> 82%)
          // so it blends invisibly into the animated waterfall of the scene below
          const fadeStart = Math.floor(h * 0.65);
          const fadeEnd = Math.floor(h * 0.81);
          for (let y = fadeStart; y < h; y++) {
            const tFade = Math.min(1, Math.max(0, (y - fadeStart) / (fadeEnd - fadeStart)));
            const mult = 1 - tFade;
            for (let x = 0; x < w; x++) {
              const idx = (y * w + x) * 4;
              if (d[idx + 3] === 0) continue;
              const r = d[idx];
              const g = d[idx + 1];
              const b = d[idx + 2];
              // Detect cyan/blue waterfall pixels (high green/blue relative to red) or very bottom tail
              const isWaterfallHue = g > 110 && b > 110 && g > r * 1.15;
              if (isWaterfallHue || y > h * 0.88) {
                d[idx + 3] = Math.round(d[idx + 3] * mult);
              }
            }
          }
        } else {
          // Sprite sheet keyer: remove dark noisy lithograph background + feather crop box edges
          for (let i = 0; i < d.length; i += 4) {
            const r = d[i];
            const g = d[i + 1];
            const b = d[i + 2];
            const maxCh = Math.max(r, g, b);
            // Boost alpha for glowing cyan/teal pixels while keying dark background grain
            const cyanBoost = Math.max(0, Math.max(g, b) - r);
            const signal = maxCh + cyanBoost * 0.65;
            if (signal < 42) {
              d[i + 3] = 0;
            } else if (signal < 95) {
              const ramp = (signal - 42) / 53;
              d[i + 3] = Math.round(ramp * ramp * 255);
              // Pre-darken low-alpha background pixels so dark fringes never appear
              d[i] = Math.round(r * ramp);
              d[i + 1] = Math.round(g * ramp);
              d[i + 2] = Math.round(b * ramp);
            }
          }

          // Apply smooth edge vignette around each calibrated crop box so rectangular bounds can never show
          const crops = Object.values(SPRITE_CROPS);
          for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
              const idx = (y * w + x) * 4;
              if (d[idx + 3] === 0) continue;

              let insideAny = false;
              let edgeFactor = 1;
              for (let cIdx = 0; cIdx < crops.length; cIdx++) {
                const crop = crops[cIdx];
                if (x >= crop.x && x <= crop.x + crop.w && y >= crop.y && y <= crop.y + crop.h) {
                  insideAny = true;
                  const dx = Math.min(x - crop.x, crop.x + crop.w - x) / (crop.w * 0.12);
                  const dy = Math.min(y - crop.y, crop.y + crop.h - y) / (crop.h * 0.12);
                  edgeFactor = Math.min(1, Math.max(0, Math.min(dx, dy)));
                  break;
                }
              }
              if (!insideAny) {
                d[idx + 3] = 0;
              } else if (edgeFactor < 1) {
                d[idx + 3] = Math.round(d[idx + 3] * edgeFactor);
              }
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        resolve(c.toDataURL('image/png'));
      } catch {
        resolve(imgUrl);
      }
    };
    img.onerror = () => resolve(imgUrl);
    img.src = imgUrl;
  });
}

function makeStreakSprite(stops: Array<[number, string]>): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = 8;
  c.height = 160;
  const g = c.getContext('2d');
  if (g) {
    const grad = g.createLinearGradient(0, 0, 0, 160);
    stops.forEach(([pos, col]) => grad.addColorStop(pos, col));
    g.fillStyle = grad;
    g.fillRect(0, 0, 8, 160);
  }
  return c;
}

interface StreakItem {
  x: number;
  xNorm: number;
  sw: number;
  len: number;
  v: number;
  alpha: number;
  phase: number;
  sprite: HTMLCanvasElement;
}

/**
 * Waterfall & Molten Copal Streak Renderer (canvas.fall)
 */
export function initFallsCanvases(root: ParentNode = document): {
  render: (t: number, currentY?: number, vh?: number) => void;
  cleanup: () => void;
} {
  const FALL_SPRITES: Record<'ghost' | 'lava', HTMLCanvasElement[]> = {
    ghost: [
      makeStreakSprite([
        [0, 'rgba(140,255,225,0)'],
        [0.35, 'rgba(185,255,240,.95)'],
        [1, 'rgba(70,210,190,0)'],
      ]),
      makeStreakSprite([
        [0, 'rgba(80,220,200,0)'],
        [0.5, 'rgba(120,245,225,.8)'],
        [1, 'rgba(50,175,165,0)'],
      ]),
    ],
    lava: [
      makeStreakSprite([
        [0, 'rgba(255,190,80,0)'],
        [0.4, 'rgba(255,238,155,1)'],
        [1, 'rgba(255,120,30,0)'],
      ]),
      makeStreakSprite([
        [0, 'rgba(255,120,30,0)'],
        [0.5, 'rgba(255,155,50,.9)'],
        [1, 'rgba(255,80,20,0)'],
      ]),
    ],
  };

  const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 1.5);
  const instances: Array<{
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    kind: 'ghost' | 'lava';
    isSeam: boolean;
    resize: () => void;
    getState: () => { w: number; h: number; topInScroller: number; streaks: StreakItem[] };
  }> = [];

  root.querySelectorAll<HTMLCanvasElement>('canvas.fall').forEach((canvas) => {
    const kind = (canvas.dataset.kind as 'ghost' | 'lava') || 'ghost';
    const speedMult = parseFloat(canvas.dataset.speed || '1');
    const isSeam = canvas.classList.contains('seam-fall');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let topInScroller = 0;
    let streaks: StreakItem[] = [];

    const resize = () => {
      w = canvas.offsetWidth || 100;
      h = canvas.offsetHeight || 200;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const scroller = canvas.closest('#scroller') || canvas.closest('.xib-interactive-root') || document.body;
      const scrollerBox = scroller.getBoundingClientRect();
      const canvasBox = canvas.getBoundingClientRect();
      topInScroller = canvasBox.top - scrollerBox.top;

      const count = kind === 'ghost' ? Math.max(8, Math.round(w / 2.2) * 2) : Math.max(6, Math.round(w / 3) * 3);
      streaks = Array.from({ length: count }, () => {
        const xNorm = kind === 'ghost' ? Math.random() : 0.25 + Math.random() * 0.5;
        return {
          x: xNorm * w,
          xNorm,
          sw: kind === 'ghost' ? 0.8 + Math.random() * 3.2 : 1 + Math.random() * 2.2,
          len: kind === 'ghost' ? 60 + Math.random() * 220 : 30 + Math.random() * 70,
          v: (kind === 'ghost' ? 420 + Math.random() * 340 : 195 + Math.random() * 155) * speedMult,
          alpha: 0.18 + Math.random() * 0.55,
          phase: Math.random() * 1000,
          sprite: FALL_SPRITES[kind][Math.random() < 0.45 ? 0 : 1],
        };
      });
    };

    resize();
    instances.push({ canvas, ctx, kind, isSeam, resize, getState: () => ({ w, h, topInScroller, streaks }) });
  });

  const onResize = () => instances.forEach((i) => i.resize());
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', onResize);
  }

  const render = (t: number, currentY?: number, vhParam?: number) => {
    const vh = vhParam || (typeof window !== 'undefined' ? window.innerHeight : 900);
    instances.forEach(({ canvas, ctx, kind, getState }) => {
      const { w, h, topInScroller, streaks } = getState();

      if (currentY !== undefined) {
        const screenTop = topInScroller - currentY;
        if (screenTop + h < -80 || screenTop > vh + 80) return;
      } else {
        const rect = canvas.getBoundingClientRect();
        if (rect.bottom < -50 || rect.top > vh + 50) return;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < streaks.length; i++) {
        const s = streaks[i];
        const span = h + s.len;
        const y = ((t * s.v + s.phase) % span) - s.len;
        const edgeDim = kind === 'ghost' ? 1 - Math.pow(Math.abs(s.xNorm - 0.5) * 2, 2) * 0.6 : 1;
        ctx.globalAlpha = s.alpha * edgeDim;
        ctx.drawImage(s.sprite, s.x - s.sw * 0.5, y, s.sw, s.len);
        if (y + span < h) {
          ctx.drawImage(s.sprite, s.x - s.sw * 0.5, y + span, s.sw, s.len);
        }
      }
    });
  };

  return {
    render,
    cleanup: () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', onResize);
      }
    },
  };
}

interface AmbientParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  phase: number;
  warm: boolean;
}

function makeParticleStamp(r: number, colorStops: Array<[number, string]>): HTMLCanvasElement {
  const c = document.createElement('canvas');
  const size = Math.ceil(r * 2);
  c.width = size;
  c.height = size;
  const g = c.getContext('2d');
  if (g) {
    const rad = r;
    const grad = g.createRadialGradient(rad, rad, 0, rad, rad, rad);
    colorStops.forEach(([pos, col]) => grad.addColorStop(pos, col));
    g.fillStyle = grad;
    g.beginPath();
    g.arc(rad, rad, rad, 0, Math.PI * 2);
    g.fill();
  }
  return c;
}

/**
 * Ambient Particle Canvases:
 * - 'wisp': 70 rising jade spores in Scene 1
 * - 'mote': 50 drifting cavern motes in Scene 2
 * - 'spray': 60 wheel mist spray particles in Scene 3
 * - 'bubble': 22 molten copal bubbles in Scene 4
 * - 'shimmer': 90 moonlight water-shimmer glints in Scene 5
 */
export function initParticlesCanvases(root: ParentNode = document): {
  render: (t: number, currentY?: number, vhParam?: number) => void;
  cleanup: () => void;
} {
  const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 1.5);
  const WARM_STAMP = makeParticleStamp(24, [
    [0, 'rgba(255, 210, 120, 1)'],
    [0.5, 'rgba(255, 145, 50, 0.5)'],
    [1, 'rgba(255, 110, 20, 0)'],
  ]);

  const JADE_STAMP = makeParticleStamp(24, [
    [0, 'rgba(185, 255, 238, 1)'],
    [0.5, 'rgba(95, 242, 200, 0.5)'],
    [1, 'rgba(50, 190, 165, 0)'],
  ]);

  const instances: Array<{
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    kind: string;
    resize: () => void;
    getState: () => { w: number; h: number; topInScroller: number; particles: AmbientParticle[] };
  }> = [];

  root.querySelectorAll<HTMLCanvasElement>('canvas.particles').forEach((canvas) => {
    const kind = canvas.dataset.kind || 'wisp';
    const count = parseInt(canvas.dataset.count || '50', 10);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let topInScroller = 0;
    let particles: AmbientParticle[] = [];

    const resize = () => {
      w = canvas.offsetWidth || 300;
      h = canvas.offsetHeight || 200;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const scroller = canvas.closest('#scroller') || canvas.closest('.xib-interactive-root') || document.body;
      const scrollerBox = scroller.getBoundingClientRect();
      const canvasBox = canvas.getBoundingClientRect();
      topInScroller = canvasBox.top - scrollerBox.top;

      particles = Array.from({ length: count }, () => {
        const isWarm =
          kind === 'bubble' ? true : kind === 'wisp' || kind === 'mote' ? Math.random() < 0.22 : false;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * (kind === 'spray' ? 35 : 14),
          vy:
            kind === 'wisp'
              ? -(14 + Math.random() * 26)
              : kind === 'bubble'
              ? -(10 + Math.random() * 22)
              : kind === 'spray'
              ? -(18 + Math.random() * 40)
              : (Math.random() - 0.5) * 10,
          r:
            kind === 'bubble'
              ? 1.8 + Math.random() * 3.6
              : kind === 'shimmer'
              ? 1.5 + Math.random() * 3.5
              : 1.0 + Math.random() * 2.4,
          alpha: 0.25 + Math.random() * 0.65,
          phase: Math.random() * Math.PI * 2,
          warm: isWarm,
        };
      });
    };

    resize();
    instances.push({ canvas, ctx, kind, resize, getState: () => ({ w, h, topInScroller, particles }) });
  });

  const onResize = () => instances.forEach((i) => i.resize());
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', onResize);
  }

  const render = (t: number, currentY?: number, vhParam?: number) => {
    const vh = vhParam || (typeof window !== 'undefined' ? window.innerHeight : 900);
    instances.forEach(({ canvas, ctx, kind, getState }) => {
      const { w, h, topInScroller, particles } = getState();

      if (currentY !== undefined) {
        const screenTop = topInScroller - currentY;
        if (screenTop + h < -80 || screenTop > vh + 80) return;
      } else {
        const rect = canvas.getBoundingClientRect();
        if (rect.bottom < -50 || rect.top > vh + 50) return;
      }

      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const pulse = 0.55 + 0.45 * Math.sin(t * (kind === 'shimmer' ? 3.4 : 1.8) + p.phase);

        if (kind === 'shimmer') {
          const sx = p.x + Math.sin(t * 1.2 + p.phase) * 6;
          const sy = p.y;
          const sw = p.r * (2.5 + pulse * 3.2);
          const sh = Math.max(1.2, p.r * 0.48);
          ctx.globalAlpha = p.alpha * pulse;
          ctx.fillStyle = 'rgba(255, 232, 175, 0.9)';
          ctx.fillRect(sx - sw * 0.5, sy - sh * 0.5, sw, sh);
        } else {
          const px = ((p.x + p.vx * t + Math.sin(t * 0.9 + p.phase) * 14) % w + w) % w;
          const py = ((p.y + p.vy * t) % h + h) % h;
          const rad = p.r * (0.85 + 0.3 * pulse);
          const stamp = p.warm ? WARM_STAMP : JADE_STAMP;
          ctx.globalAlpha = p.alpha * pulse;
          const d = rad * 2.4;
          ctx.drawImage(stamp, px - d, py - d, d * 2, d * 2);
        }
      }
    });
  };

  return {
    render,
    cleanup: () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', onResize);
      }
    },
  };
}

/**
 * Spirit Repulsion & Bat Flapping Engine
 */
export function initSprites(root: ParentNode = document): {
  update: (t: number, dt: number, currentY?: number, artHParam?: number) => void;
  cleanup: () => void;
} {
  const scroller = (root as HTMLElement).closest?.('#scroller') || root;
  const spirits = Array.from(root.querySelectorAll<HTMLElement>('.sprite.spirit')).map((el) => ({
    el,
    phase: Math.random() * Math.PI * 2,
    ox: 0,
    oy: 0,
    baseLeftInScroller: 0,
    baseTopInScroller: 0,
  }));

  const bats = Array.from(root.querySelectorAll<HTMLElement>('.sprite.bat')).map((el, idx) => ({
    el,
    y0: parseFloat(el.dataset.y || '20'),
    dur: 9 + ((idx * 2.3) % 7),
    offset: (idx * 0.27) % 1,
    amp: 1.2 + ((idx * 0.9) % 2.5),
    flapRate: 8.5 + (idx % 4),
    lastDown: false,
  }));

  const cacheSpiritPositions = () => {
    const scrollerBox = (scroller as HTMLElement).getBoundingClientRect?.() || { left: 0, top: 0 };
    spirits.forEach((s) => {
      const box = s.el.getBoundingClientRect();
      s.baseLeftInScroller = box.left + box.width * 0.5 - scrollerBox.left;
      s.baseTopInScroller = box.top + box.height * 0.5 - scrollerBox.top;
    });
  };

  cacheSpiritPositions();
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', cacheSpiritPositions);
  }

  let mouseX = -9999;
  let mouseY = -9999;
  const onPointerMove = (e: PointerEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };
  if (typeof window !== 'undefined') {
    window.addEventListener('pointermove', onPointerMove);
  }

  const update = (t: number, dt: number, currentY?: number, artHParam?: number) => {
    const damp = 1 - Math.exp(-3 * dt);
    const winW = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const artW = winW;
    const artH = artHParam || artW * (1520 / 2688);

    spirits.forEach((s) => {
      const cx = s.baseLeftInScroller;
      const cy = currentY !== undefined ? s.baseTopInScroller - currentY : s.baseTopInScroller;
      const { tx, ty } = computeSpiritRepulsion(cx, cy, mouseX, mouseY);

      s.ox += (tx - s.ox) * damp;
      s.oy += (ty - s.oy) * damp;

      const wx = Math.sin(0.35 * t + s.phase) * 0.012 * artW;
      const wy = Math.sin(0.9 * t + s.phase) * 0.014 * artH;
      const rot = Math.sin(0.7 * t + s.phase) * 6 + s.ox * 0.05;

      s.el.style.transform = `translate3d(calc(-50% + ${(wx + s.ox).toFixed(2)}px), calc(-50% + ${(wy + s.oy).toFixed(2)}px), 0) rotate(${rot.toFixed(2)}deg)`;
    });

    bats.forEach((b) => {
      const state = computeBatState(t, b);
      b.el.style.transform = `translate3d(calc(${state.xPct.toFixed(2)}vw - 50%), calc(${state.yPct.toFixed(2)} * var(--artH) / 100 - 50%), 0)`;
      if (b.lastDown !== state.isDown) {
        b.lastDown = state.isDown;
        b.el.classList.toggle('down', state.isDown);
      }
    });
  };

  return {
    update,
    cleanup: () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('resize', cacheSpiritPositions);
      }
    },
  };
}
]]>
    </file>
    <file path="src/app/(xibalba)/xibalba/utils/cenoteMath.ts">
<![CDATA[/**
 * Pure math and state helper functions for Xibalba: Night of the Jade Cenote.
 * Decoupled from DOM/Canvas so all coordinate, physics, sprite-crop, and validation
 * logic can be deterministically unit-tested.
 */

export interface SpriteCrop {
  x: number;
  y: number;
  w: number;
  h: number;
}

export const SPRITE_SHEET_WIDTH = 1024;
export const SPRITE_SHEET_HEIGHT = 765;

export const SPRITE_CROPS: Record<string, SpriteCrop> = {
  spirit1: { x: 15, y: 42, w: 310, h: 260 },
  spirit2: { x: 358, y: 55, w: 235, h: 225 },
  spirit3: { x: 624, y: 48, w: 178, h: 292 },
  spirit4: { x: 832, y: 24, w: 145, h: 520 },
  batUp: { x: 45, y: 405, w: 280, h: 285 },
  batDown: { x: 358, y: 485, w: 435, h: 185 },
};

/**
 * Computes normalized CSS background-size, background-position, and aspect-ratio
 * for a given sprite crop on the 1024x765 normalized sheet.
 */
export function computeSpriteCssMetrics(crop: SpriteCrop): {
  backgroundSizeX: number;
  backgroundSizeY: number;
  backgroundPosX: number;
  backgroundPosY: number;
  aspectRatio: string;
} {
  const backgroundSizeX = (SPRITE_SHEET_WIDTH / crop.w) * 100;
  const backgroundSizeY = (SPRITE_SHEET_HEIGHT / crop.h) * 100;
  const backgroundPosX = (crop.x / (SPRITE_SHEET_WIDTH - crop.w)) * 100;
  const backgroundPosY = (crop.y / (SPRITE_SHEET_HEIGHT - crop.h)) * 100;
  return {
    backgroundSizeX: Number(backgroundSizeX.toFixed(4)),
    backgroundSizeY: Number(backgroundSizeY.toFixed(4)),
    backgroundPosX: Number(backgroundPosX.toFixed(4)),
    backgroundPosY: Number(backgroundPosY.toFixed(4)),
    aspectRatio: `${crop.w} / ${crop.h}`,
  };
}

/**
 * Computes the cursor repulsion vector (tx, ty) for a jade Morpho spirit.
 */
export function computeSpiritRepulsion(
  spiritCenterX: number,
  spiritCenterY: number,
  mouseX: number,
  mouseY: number,
  radius = 260,
  maxPush = 90
): { tx: number; ty: number } {
  const dx = spiritCenterX - mouseX;
  const dy = spiritCenterY - mouseY;
  const dist = Math.hypot(dx, dy);

  if (dist < radius && dist > 0.1) {
    const push = Math.pow(1 - dist / radius, 1.5) * maxPush;
    return {
      tx: (dx / dist) * push,
      ty: (dy / dist) * push,
    };
  }
  return { tx: 0, ty: 0 };
}

/**
 * Computes bat trajectory position (%) and wing-down state at time t (seconds).
 */
export function computeBatState(
  t: number,
  params: { y0: number; dur: number; offset: number; amp: number; flapRate: number }
): { xPct: number; yPct: number; isDown: boolean } {
  const p = (((t / params.dur) + params.offset) % 1 + 1) % 1;
  const xPct = -8 + p * 116;
  const yPct = params.y0 + Math.sin(p * 9 + params.offset * 6) * params.amp;
  const isDown = Math.floor(t * params.flapRate) % 2 === 1;
  return {
    xPct: Number(xPct.toFixed(2)),
    yPct: Number(yPct.toFixed(2)),
    isDown,
  };
}

/**
 * Classifies outer background mode of an image corner pixel (r, g, b, a)
 * so seam bands and sprite sheets key out solid black, solid white, or preserve existing alpha.
 */
export function detectOuterBackgroundType(
  r: number,
  g: number,
  b: number,
  a: number
): 'black' | 'white' | 'transparent' | 'opaque' {
  if (a < 20) return 'transparent';
  const lum = r + g + b;
  if (lum < 40) return 'black';
  if (lum > 700) return 'white';
  return 'opaque';
}

export interface PassageReservationInput {
  fullName: string;
  email: string;
  waveTime: string;
  partySize: number;
  censerOption: 'borrow' | 'bring';
  barkWish: string;
}

export interface PassageValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof PassageReservationInput, string>>;
  confirmationCode?: string;
}

/**
 * Pure client-side validation for Equinox Descent passage reservation.
 */
export function validatePassageReservation(
  input: PassageReservationInput
): PassageValidationResult {
  const errors: Partial<Record<keyof PassageReservationInput, string>> = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter the name of the primary pilgrim (2+ chars).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = 'Please provide a valid email address for receipt dispatch.';
  }

  const allowedWaves = ['18:00', '19:30', '21:00', '22:30'];
  if (!allowedWaves.includes(input.waveTime)) {
    errors.waveTime = 'Selected wave time is invalid.';
  }

  if (!input.partySize || input.partySize < 1 || input.partySize > 6) {
    errors.partySize = 'Parties are limited to 1–6 pilgrims per lantern escort.';
  }

  if (input.censerOption !== 'borrow' && input.censerOption !== 'bring') {
    errors.censerOption = 'Select whether you will borrow a clay censer or bring your own.';
  }

  const valid = Object.keys(errors).length === 0;

  let confirmationCode: string | undefined;
  if (valid) {
    const timeCode = input.waveTime.replace(':', '');
    const randSuffix = Math.floor(1000 + Math.random() * 9000);
    confirmationCode = `XIB-${timeCode}-${randSuffix}`;
  }

  return { valid, errors, confirmationCode };
}
]]>
    </file>
  </files>
</template>
