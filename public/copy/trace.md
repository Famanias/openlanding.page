<template slug="trace" name="TRACE">
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
    <file path="src/app/(trace)/layout.tsx">
<![CDATA[import type { Metadata } from "next";
import { DM_Mono, Space_Grotesk } from "next/font/google";
import "./trace/trace.css";

const display = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-trace-sans",
});

const mono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-trace-mono-source",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "TRACE — Spatial intelligence for the moving city",
  description:
    "TRACE turns city-scale signals into a readable future, with spatial intelligence for teams shaping what comes next.",
  icons: { icon: "/templates/trace/icon.svg" },
};

export default function TraceLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body className="trace-body">{children}</body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(trace)/trace/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="14" fill="#081115"/>
  <ellipse cx="32" cy="32" rx="21" ry="10" transform="rotate(-28 32 32)" stroke="#C9F458" stroke-width="2"/>
  <ellipse cx="32" cy="32" rx="10" ry="21" transform="rotate(-28 32 32)" stroke="#C9F458" stroke-width="2"/>
  <circle cx="32" cy="32" r="3" fill="#C9F458"/>
</svg>
]]>
    </file>
    <file path="src/app/(trace)/trace/page.tsx">
<![CDATA[import { TraceExperience } from "./TraceExperience";

export default function TracePage() {
  return <TraceExperience />;
}
]]>
    </file>
    <file path="src/app/(trace)/trace/trace.css">
<![CDATA[@import "tailwindcss";

@theme {
  --color-trace-ink: #081115;
  --color-trace-paper: #e7ece7;
  --color-trace-accent: #c9f458;
  --color-trace-muted: #849694;
  --font-trace-display: var(--font-trace-sans), system-ui, sans-serif;
  --font-trace-mono: var(--font-trace-mono-source), ui-monospace, monospace;
}

:root { --trace-gutter: clamp(20px, 5vw, 84px); --trace-topbar: 76px; }
html:has(.trace-body) { scroll-behavior: smooth; scroll-padding-top: var(--trace-topbar); }
.trace-body { margin: 0; background: #081115; color: #e7ece7; font-family: var(--font-trace-display); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
.trace-body ::selection { color: #081115; background: #c9f458; }
.trace-body :focus-visible { outline: 2px solid #c9f458; outline-offset: 4px; }
.trace-experience { min-height: 100vh; position: relative; overflow: clip; }
.trace-wrap { width: min(1400px, calc(100% - (var(--trace-gutter) * 2))); margin: 0 auto; position: relative; z-index: 2; }
.trace-scene-shell { position: fixed; inset: 0; z-index: 0; pointer-events: none; background: #081115; }
.trace-scene { position: absolute; inset: 0; width: 100%; height: 100%; opacity: .9; }
.trace-scene-shell::after { content: ""; position: absolute; inset: 0; background: radial-gradient(circle at 70% 45%, transparent 0 15%, rgba(8,17,21,.18) 45%, rgba(8,17,21,.86) 100%); }
.trace-scene-hud { position: absolute; right: var(--trace-gutter); bottom: 24px; display: flex; gap: 18px; color: rgba(231,236,231,.46); font-family: var(--font-trace-mono); font-size: 10px; letter-spacing: .13em; text-transform: uppercase; }
.trace-topbar { position: fixed; inset: 0 0 auto; z-index: 20; height: var(--trace-topbar); display: flex; align-items: center; gap: 26px; padding: 0 var(--trace-gutter); border-bottom: 1px solid rgba(231,236,231,.16); background: rgba(8,17,21,.76); backdrop-filter: blur(18px); }
.trace-wordmark { display: inline-flex; align-items: center; gap: 11px; color: #e7ece7; text-decoration: none; font-size: 18px; font-weight: 700; letter-spacing: .16em; }
.trace-wordmark-dot { color: #c9f458; }
.trace-mark { width: 24px; height: 24px; display: inline-grid; place-items: center; position: relative; }
.trace-mark::before, .trace-mark::after { content: ""; position: absolute; border: 1px solid #c9f458; border-radius: 50%; transform: rotate(-28deg); }
.trace-mark::before { width: 18px; height: 9px; }
.trace-mark::after { width: 9px; height: 18px; }
.trace-mark span { width: 4px; height: 4px; border-radius: 50%; background: #c9f458; }
.trace-nav { display: flex; align-items: center; gap: 22px; margin-left: auto; }
.trace-nav a, .trace-nav-cta, .trace-chapter-rail a, .trace-footer, .trace-kicker, .trace-hero-index, .trace-coordinate, .trace-hero-type { font-family: var(--font-trace-mono); text-transform: uppercase; letter-spacing: .11em; }
.trace-nav a { color: rgba(231,236,231,.58); text-decoration: none; font-size: 10px; transition: color 180ms ease; }
.trace-nav a span { color: #c9f458; margin-right: 6px; }
.trace-nav a:hover { color: #e7ece7; }
.trace-nav-cta, .trace-button { border: 1px solid rgba(231,236,231,.4); color: #e7ece7; text-decoration: none; font-family: var(--font-trace-mono); text-transform: uppercase; letter-spacing: .1em; font-size: 10px; transition: transform 180ms ease, background-color 180ms ease, color 180ms ease, border-color 180ms ease; }
.trace-nav-cta { padding: 12px 15px; }
.trace-nav-cta:hover, .trace-button:hover { border-color: #c9f458; color: #c9f458; }
.trace-button { display: inline-flex; align-items: center; justify-content: space-between; gap: 22px; width: fit-content; padding: 16px 18px; }
.trace-button:hover { transform: translateY(-3px); }
.trace-button-solid { background: #c9f458; border-color: #c9f458; color: #081115; }
.trace-button-solid:hover { background: #e7ece7; border-color: #e7ece7; color: #081115; }
.trace-button-outline { background: transparent; }
.trace-chapter-rail { position: fixed; right: 28px; top: 50%; transform: translateY(-50%); z-index: 15; display: grid; gap: 13px; }
.trace-chapter-rail a { display: flex; align-items: center; gap: 9px; color: rgba(231,236,231,.48); text-decoration: none; font-size: 9px; }
.trace-chapter-rail a::before { content: ""; width: 16px; height: 1px; background: currentColor; transition: width 180ms ease, background-color 180ms ease; }
.trace-chapter-rail a:hover { color: #c9f458; }
.trace-chapter-rail a:hover::before { width: 27px; background: #c9f458; }
.trace-chapter-rail b { display: none; font-weight: 400; }

.trace-hero { min-height: 138svh; position: relative; padding-top: var(--trace-topbar); display: grid; align-items: center; }
.trace-hero-grid { min-height: calc(100svh - var(--trace-topbar)); display: grid; grid-template-columns: minmax(0, 1.1fr) minmax(230px, .9fr); align-items: center; gap: 8vw; padding: 10vh 0 22vh; }
.trace-kicker { margin: 0; color: #c9f458; font-size: 10px; line-height: 1.5; }
.trace-hero-copy { max-width: 760px; }
.trace-hero-index { margin: 0 0 28px; color: rgba(231,236,231,.45); font-size: 10px; }
.trace-hero h1, .trace-section h2 { margin: 0; font-weight: 500; letter-spacing: -.075em; line-height: .92; text-wrap: balance; }
.trace-hero h1 { max-width: 760px; font-size: clamp(4.2rem, 10vw, 10.3rem); }
.trace-hero h1 em, .trace-section h2 em { color: #c9f458; font-style: normal; }
.trace-hero-lead { max-width: 42ch; margin: 34px 0 34px; color: rgba(231,236,231,.7); font-size: clamp(1.05rem, 1.4vw, 1.3rem); line-height: 1.5; }
.trace-hero-note { align-self: end; justify-self: end; display: flex; align-items: center; gap: 11px; color: rgba(231,236,231,.48); font-family: var(--font-trace-mono); text-transform: uppercase; letter-spacing: .1em; font-size: 10px; }
.trace-note-line { display: inline-block; width: 38px; height: 1px; background: #c9f458; }
.trace-coordinate, .trace-hero-type { position: absolute; color: rgba(231,236,231,.32); font-size: 10px; }
.trace-coordinate { left: var(--trace-gutter); bottom: 10vh; }
.trace-hero-type { right: var(--trace-gutter); bottom: 13vh; writing-mode: vertical-rl; }
.trace-reveal { opacity: 0; transform: translateY(30px); transition: opacity 700ms cubic-bezier(.23,1,.32,1), transform 900ms cubic-bezier(.23,1,.32,1); }
.trace-reveal.is-visible { opacity: 1; transform: translateY(0); }

.trace-section { min-height: 112svh; position: relative; padding: 18vh 0 18vh; overflow: hidden; }
.trace-section-dark { background: rgba(8,17,21,.9); border-top: 1px solid rgba(231,236,231,.12); border-bottom: 1px solid rgba(231,236,231,.12); }
.trace-section-paper { background: #e7ece7; color: #081115; }
.trace-section-system { min-height: 122svh; background: rgba(8,17,21,.9); }
.trace-section-cta { min-height: 86svh; background: #c9f458; color: #081115; }
.trace-split { display: grid; grid-template-columns: minmax(0, 1fr) minmax(250px, .72fr); gap: 12vw; align-items: start; }
.trace-section-intro { position: relative; padding-top: 10px; }
.trace-section h2 { font-size: clamp(3.4rem, 7vw, 7.8rem); max-width: 840px; }
.trace-section-intro h2 { margin-top: 34px; }
.trace-section-body { padding-top: 14vh; }
.trace-large-number { margin: 0; font-size: clamp(5rem, 13vw, 13rem); line-height: .75; letter-spacing: -.1em; color: #c9f458; }
.trace-large-number span { font-size: .28em; letter-spacing: -.02em; margin-left: 10px; }
.trace-body-copy { max-width: 34ch; margin: 44px 0 54px; color: rgba(231,236,231,.66); font-size: 1.1rem; line-height: 1.55; }
.trace-readout { border-top: 1px solid rgba(231,236,231,.22); display: grid; grid-template-columns: repeat(3, 1fr); }
.trace-readout div { padding: 14px 12px 0 0; border-right: 1px solid rgba(231,236,231,.22); }
.trace-readout div + div { padding-left: 12px; }
.trace-readout div:last-child { border-right: 0; }
.trace-readout span, .trace-readout strong, .trace-system-stats span, .trace-system-stats small { display: block; font-family: var(--font-trace-mono); text-transform: uppercase; letter-spacing: .1em; font-size: 9px; }
.trace-readout span, .trace-system-stats span, .trace-system-stats small { color: rgba(231,236,231,.45); }
.trace-readout strong { margin-top: 10px; color: #e7ece7; font-size: 14px; font-weight: 400; }
.trace-band { position: absolute; inset: auto 0 11vh; white-space: nowrap; overflow: hidden; color: rgba(201,244,88,.12); font-size: clamp(3rem, 12vw, 14rem); letter-spacing: .02em; line-height: .7; }

.trace-shape-layout { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); gap: 8vw; }
.trace-shape-heading { position: sticky; top: 18vh; align-self: start; }
.trace-section-paper h2 em { color: #849694; }
.trace-method-list { border-top: 1px solid rgba(8,17,21,.24); }
.trace-method { display: grid; grid-template-columns: 48px 1fr 34px; gap: 18px; align-items: start; padding: 25px 0 30px; border-bottom: 1px solid rgba(8,17,21,.24); }
.trace-method-number, .trace-method-arrow { color: #849694; font-family: var(--font-trace-mono); font-size: 11px; }
.trace-method h3 { margin: 0 0 9px; font-size: clamp(1.4rem, 2vw, 2.2rem); font-weight: 500; letter-spacing: -.04em; }
.trace-method p { max-width: 36ch; margin: 0; color: rgba(8,17,21,.64); line-height: 1.5; }
.trace-method-arrow { justify-self: end; font-size: 20px; }
.trace-contour { position: absolute; left: -5vw; bottom: 9vh; display: grid; gap: 9px; color: rgba(8,17,21,.18); font-family: var(--font-trace-mono); font-size: 9px; letter-spacing: .12em; transform: rotate(-13deg); }

.trace-system-layout { display: grid; grid-template-columns: minmax(0, .8fr) minmax(280px, .7fr); gap: 10vw; align-items: end; min-height: 72vh; }
.trace-system-copy h2 { margin: 34px 0; }
.trace-system-copy > p:not(.trace-kicker) { max-width: 39ch; color: rgba(231,236,231,.66); line-height: 1.55; margin: 0 0 32px; }
.trace-system-stats { border-top: 1px solid rgba(231,236,231,.22); }
.trace-system-stats div { display: grid; grid-template-columns: 38px 1fr auto; gap: 15px; align-items: baseline; padding: 19px 0; border-bottom: 1px solid rgba(231,236,231,.22); }
.trace-system-stats strong { font-size: clamp(1.45rem, 3vw, 3rem); font-weight: 500; letter-spacing: -.06em; }
.trace-system-stamp { position: absolute; right: 10vw; top: 16vh; color: rgba(201,244,88,.18); font-family: var(--font-trace-mono); font-size: 10px; letter-spacing: .16em; writing-mode: vertical-rl; }

.trace-cta-layout { min-height: 70svh; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; }
.trace-section-cta .trace-kicker { color: #081115; opacity: .55; }
.trace-section-cta h2 { max-width: 920px; margin: 28px 0 24px; font-size: clamp(4rem, 11vw, 11rem); }
.trace-section-cta h2 em { color: #081115; text-decoration: underline; text-decoration-thickness: .045em; text-underline-offset: .1em; }
.trace-cta-copy { margin: 0 0 34px; max-width: 36ch; font-size: 1.15rem; line-height: 1.5; }
.trace-section-cta .trace-button-solid { background: #081115; border-color: #081115; color: #c9f458; }
.trace-section-cta .trace-button-solid:hover { background: #e7ece7; border-color: #e7ece7; color: #081115; }
.trace-footer { width: 100%; display: flex; justify-content: space-between; gap: 20px; align-items: center; margin-top: auto; padding-top: 22px; border-top: 1px solid rgba(8,17,21,.26); color: rgba(8,17,21,.64); font-size: 9px; }
.trace-footer a { color: inherit; text-decoration: none; }
.trace-footer a:hover { color: #081115; }

@media (min-width: 1050px) { .trace-chapter-rail b { display: inline; } }
@media (max-width: 900px) {
  :root { --trace-topbar: 66px; }
  .trace-topbar { gap: 14px; }
  .trace-nav { display: none; }
  .trace-nav-cta { margin-left: auto; padding: 10px 12px; }
  .trace-scene { opacity: .7; }
  .trace-scene-hud { right: 20px; bottom: 14px; flex-direction: column; align-items: flex-end; gap: 5px; }
  .trace-chapter-rail { right: 16px; }
  .trace-chapter-rail b { display: none; }
  .trace-hero { min-height: 120svh; }
  .trace-hero-grid, .trace-split, .trace-shape-layout, .trace-system-layout { grid-template-columns: 1fr; gap: 48px; }
  .trace-hero-grid { align-content: center; padding-bottom: 18vh; }
  .trace-hero h1 { max-width: 620px; }
  .trace-hero-note { justify-self: start; }
  .trace-section-body { padding-top: 0; }
  .trace-shape-heading { position: static; }
  .trace-system-layout { min-height: auto; }
  .trace-system-stamp { right: 16vw; top: 18vh; }
  .trace-footer { flex-wrap: wrap; }
}
@media (max-width: 540px) {
  .trace-coordinate { bottom: 9vh; font-size: 8px; }
  .trace-hero-type { display: none; }
  .trace-section { padding: 14vh 0; }
  .trace-section h2 { max-width: 13ch; }
  .trace-readout { grid-template-columns: 1fr; }
  .trace-readout div, .trace-readout div + div { padding: 12px 0; border-right: 0; border-bottom: 1px solid rgba(231,236,231,.22); }
  .trace-readout div:last-child { border-bottom: 0; }
  .trace-method { grid-template-columns: 34px 1fr; }
  .trace-method-arrow { display: none; }
  .trace-footer { display: grid; gap: 10px; }
}
@media (prefers-reduced-motion: reduce) {
  html:has(.trace-body) { scroll-behavior: auto; }
  .trace-reveal { opacity: 1; transform: none; transition: none; }
  .trace-button, .trace-nav a, .trace-chapter-rail a::before { transition: none; }
  .trace-scene-shell::after { background: rgba(8,17,21,.48); }
}
]]>
    </file>
    <file path="src/app/(trace)/trace/TraceExperience.tsx">
<![CDATA["use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const chapters = [
  { id: "signal", label: "Signal" },
  { id: "shape", label: "Shape" },
  { id: "system", label: "System" },
  { id: "contact", label: "Contact" },
];

function TraceMark() {
  return (
    <span className="trace-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

export function TraceExperience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0.15, 6.6);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const world = new THREE.Group();
    world.rotation.set(0.2, -0.35, 0.08);
    scene.add(world);

    const orb = new THREE.Group();
    world.add(orb);

    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.55, 3),
      new THREE.MeshBasicMaterial({ color: 0xc9f458, wireframe: true, transparent: true, opacity: 0.52 }),
    );
    orb.add(shell);

    const innerShell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.28, 2),
      new THREE.MeshBasicMaterial({ color: 0xe7ece7, wireframe: true, transparent: true, opacity: 0.16 }),
    );
    orb.add(innerShell);

    const rings: THREE.Mesh[] = [];
    [1.92, 2.24, 2.56].forEach((radius, index) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(radius, index === 1 ? 0.012 : 0.018, 8, 160),
        new THREE.MeshBasicMaterial({
          color: index === 1 ? 0xc9f458 : 0xe7ece7,
          transparent: true,
          opacity: index === 1 ? 0.58 : 0.18,
        }),
      );
      ring.rotation.set(index * 0.38, index * 0.7, index * 0.21);
      world.add(ring);
      rings.push(ring);
    });

    const satelliteGroup = new THREE.Group();
    world.add(satelliteGroup);
    const satelliteMaterial = new THREE.MeshBasicMaterial({ color: 0xc9f458 });
    [
      { position: [2.4, 0.58, 0.32] as [number, number, number], scale: 0.105 },
      { position: [-2.2, -0.9, 0.8] as [number, number, number], scale: 0.07 },
      { position: [0.72, -1.95, -0.55] as [number, number, number], scale: 0.055 },
    ].forEach(({ position, scale }) => {
      const satellite = new THREE.Mesh(new THREE.IcosahedronGeometry(scale, 1), satelliteMaterial);
      satellite.position.set(...position);
      satelliteGroup.add(satellite);
    });

    const particleCount = 320;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const radius = 3.05 + Math.random() * 1.65;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.cos(phi);
      particlePositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: 0xe7ece7, size: 0.018, transparent: true, opacity: 0.48, sizeAttenuation: true }),
    );
    world.add(particles);

    const resize = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    // Keep scroll transforms on decorative layers only. Flow content needs its layout box to stay stable.
    const parallaxNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-trace-depth]:not(.trace-reveal)"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let scrollTarget = window.scrollY;
    let scrollPosition = scrollTarget;
    let pointerTarget = { x: 0, y: 0 };
    const pointerPosition = { x: 0, y: 0 };
    let frame = 0;

    const onScroll = () => {
      scrollTarget = window.scrollY;
    };
    const onPointerMove = (event: PointerEvent) => {
      pointerTarget = { x: (event.clientX / window.innerWidth - 0.5) * 2, y: (event.clientY / window.innerHeight - 0.5) * 2 };
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)),
      { threshold: 0.18 },
    );
    document.querySelectorAll(".trace-reveal").forEach((node) => revealObserver.observe(node));

    const animate = () => {
      scrollPosition += (scrollTarget - scrollPosition) * (reducedMotion.matches ? 1 : 0.08);
      pointerPosition.x += (pointerTarget.x - pointerPosition.x) * 0.055;
      pointerPosition.y += (pointerTarget.y - pointerPosition.y) * 0.055;
      const progress = Math.min(1, scrollPosition / Math.max(1, document.body.scrollHeight - window.innerHeight));

      world.rotation.y = -0.35 + pointerPosition.x * 0.12 + progress * 1.9;
      world.rotation.x = 0.2 + pointerPosition.y * 0.08 + progress * 0.65;
      world.position.y = (progress - 0.5) * 0.7;
      orb.rotation.z = progress * 1.25;
      shell.rotation.x += reducedMotion.matches ? 0 : 0.0014;
      shell.rotation.y += reducedMotion.matches ? 0 : 0.002;
      innerShell.rotation.y -= reducedMotion.matches ? 0 : 0.001;
      rings.forEach((ring, index) => {
        ring.rotation.z += reducedMotion.matches ? 0 : 0.0005 * (index + 1);
        ring.rotation.x += reducedMotion.matches ? 0 : 0.00025 * (index + 1);
      });
      particles.rotation.y = progress * -0.9;

      parallaxNodes.forEach((node) => {
        const depth = Number(node.dataset.traceDepth ?? 0);
        node.style.setProperty("--trace-parallax", `${scrollPosition * depth}px`);
      });

      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      revealObserver.disconnect();
      renderer.dispose();
      particleGeometry.dispose();
      (particles.material as THREE.Material).dispose();
      shell.geometry.dispose();
      (shell.material as THREE.Material).dispose();
      innerShell.geometry.dispose();
      (innerShell.material as THREE.Material).dispose();
      rings.forEach((ring) => {
        ring.geometry.dispose();
        (ring.material as THREE.Material).dispose();
      });
      satelliteMaterial.dispose();
    };
  }, []);

  return (
    <div className="trace-experience">
      <div className="trace-scene-shell" aria-hidden="true">
        <canvas ref={canvasRef} className="trace-scene" />
        <div className="trace-scene-hud">
          <span>LIVE FIELD</span>
          <span>03.17.26 / 35°41′N</span>
        </div>
      </div>

      <header className="trace-topbar">
        <a className="trace-wordmark" href="#top" aria-label="TRACE home">
          <TraceMark />
          TRACE<span className="trace-wordmark-dot">.</span>
        </a>
        <nav className="trace-nav" aria-label="Primary navigation">
          {chapters.slice(0, 3).map((chapter, index) => (
            <a href={`#${chapter.id}`} key={chapter.id}>
              <span>0{index + 1}</span> {chapter.label}
            </a>
          ))}
        </nav>
        <a className="trace-nav-cta" href="#contact">
          Start a read <span aria-hidden="true">↗</span>
        </a>
      </header>

      <aside className="trace-chapter-rail" aria-label="Page chapters">
        {chapters.map((chapter, index) => (
          <a href={`#${chapter.id === "contact" ? "contact" : chapter.id}`} key={chapter.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <b>{chapter.label}</b>
          </a>
        ))}
      </aside>

      <main id="top">
        <section className="trace-hero" aria-labelledby="trace-title">
          <div className="trace-hero-grid trace-wrap">
            <p className="trace-kicker trace-reveal" data-trace-depth="-0.02">
              Spatial intelligence / Issue 01
            </p>
            <div className="trace-hero-copy trace-reveal" data-trace-depth="-0.06">
              <p className="trace-hero-index">/ 00 — orientation</p>
              <h1 id="trace-title">
                Read what the city is <em>becoming.</em>
              </h1>
              <p className="trace-hero-lead">
                TRACE turns millions of small signals into one clear field of view — so the people shaping a place can move with intent.
              </p>
              <a className="trace-button trace-button-solid" href="#signal">
                Enter the field <span aria-hidden="true">↓</span>
              </a>
            </div>
            <div className="trace-hero-note trace-reveal" data-trace-depth="-0.12">
              <span className="trace-note-line" />
              <span>Scroll to change the lens</span>
            </div>
          </div>
          <div className="trace-coordinate trace-parallax" data-trace-depth="-0.15" aria-hidden="true">
            35°41′22″N / 139°41′30″E
          </div>
          <div className="trace-hero-type trace-parallax" data-trace-depth="-0.03" aria-hidden="true">
            SIGNAL / SHAPE / SYSTEM
          </div>
        </section>

        <section id="signal" className="trace-section trace-section-dark" aria-labelledby="signal-title">
          <div className="trace-wrap trace-split">
            <div className="trace-section-intro trace-reveal" data-trace-depth="-0.04">
              <p className="trace-kicker">01 — Signal</p>
              <h2 id="signal-title">The invisible becomes <em>legible.</em></h2>
            </div>
            <div className="trace-section-body trace-reveal" data-trace-depth="-0.1">
              <p className="trace-large-number">4.8<span>m</span></p>
              <p className="trace-body-copy">A single block holds thousands of decisions. We map the rhythm underneath them — movement, heat, dwell, drift — and give your team a common signal.</p>
              <div className="trace-readout" aria-label="Signal readout">
                <div><span>OBSERVED</span><strong>12,406</strong></div>
                <div><span>RESOLVED</span><strong>08.3%</strong></div>
                <div><span>LATENCY</span><strong>00:42</strong></div>
              </div>
            </div>
          </div>
          <div className="trace-band trace-parallax" data-trace-depth="-0.08" aria-hidden="true">/ / / / / / / / / / / / / / / / / / / / / / / /</div>
        </section>

        <section id="shape" className="trace-section trace-section-paper" aria-labelledby="shape-title">
          <div className="trace-wrap trace-shape-layout">
            <div className="trace-shape-heading trace-reveal" data-trace-depth="-0.05">
              <p className="trace-kicker">02 — Shape</p>
              <h2 id="shape-title">A map is a choice about <em>attention.</em></h2>
            </div>
            <div className="trace-method-list">
              {[
                ["01", "Find the pulse", "Separate the noise from the moment that changes the whole field."],
                ["02", "Model the friction", "See where a good intention turns into a slow, expensive loop."],
                ["03", "Make the next move", "Turn a shared picture into a sequence your team can actually run."],
              ].map(([number, title, copy]) => (
                <article className="trace-method trace-reveal" data-trace-depth={number === "02" ? "-0.12" : "-0.08"} key={number}>
                  <span className="trace-method-number">{number}</span>
                  <div><h3>{title}</h3><p>{copy}</p></div>
                  <span className="trace-method-arrow" aria-hidden="true">↗</span>
                </article>
              ))}
            </div>
          </div>
          <div className="trace-contour trace-parallax" data-trace-depth="-0.18" aria-hidden="true">
            <span>CONTOUR / 240</span>
            <span>CONTOUR / 180</span>
            <span>CONTOUR / 120</span>
          </div>
        </section>

        <section id="system" className="trace-section trace-section-system" aria-labelledby="system-title">
          <div className="trace-wrap trace-system-layout">
            <div className="trace-system-copy trace-reveal" data-trace-depth="-0.03">
              <p className="trace-kicker">03 — System</p>
              <h2 id="system-title">The future is a <em>field.</em></h2>
              <p>One living model for the people who make places, products and policy. TRACE keeps the model moving, so the next decision arrives with context.</p>
              <a className="trace-button trace-button-outline" href="#contact">See the field guide <span aria-hidden="true">↗</span></a>
            </div>
            <div className="trace-system-stats trace-reveal" data-trace-depth="-0.14">
              <div><span>01</span><strong>Observe</strong><small>Signals, joined</small></div>
              <div><span>02</span><strong>Simulate</strong><small>Moves, before they land</small></div>
              <div><span>03</span><strong>Align</strong><small>People, in sequence</small></div>
            </div>
          </div>
          <div className="trace-system-stamp trace-parallax" data-trace-depth="-0.22" aria-hidden="true">TRACE / FIELD 01</div>
        </section>

        <section id="contact" className="trace-section trace-section-cta" aria-labelledby="contact-title">
          <div className="trace-wrap trace-cta-layout">
            <p className="trace-kicker">04 — Contact</p>
            <h2 id="contact-title" className="trace-reveal" data-trace-depth="-0.05">Make the next move <em>visible.</em></h2>
            <p className="trace-cta-copy trace-reveal" data-trace-depth="-0.08">Bring us the messy version. We’ll bring a clearer field of view.</p>
            <a className="trace-button trace-button-solid trace-reveal" data-trace-depth="-0.12" href="mailto:hello@trace.field">hello@trace.field <span aria-hidden="true">↗</span></a>
            <footer className="trace-footer"><span>© 2026 TRACE FIELDWORKS</span><span>Tokyo / Rotterdam / Everywhere</span><a href="#top">Back to top ↑</a></footer>
          </div>
        </section>
      </main>
    </div>
  );
}
]]>
    </file>
  </files>
</template>
