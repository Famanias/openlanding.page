<template slug="vector" name="VECTOR/90">
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
    <file path="src/app/(vector)/layout.tsx">
<![CDATA[import type { Metadata } from "next";
import "./vector/vector.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://templateflow-blond.vercel.app"),
  title: "VECTOR/90 — Runtime maps for systems in motion",
  description: "A retro-futurist runtime map for teams that need to see every layer of a system.",
  icons: { icon: "/templates/vector/icon.svg" },
};

export default function VectorLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="vector-body">{children}</body></html>;
}
]]>
    </file>
    <file path="src/app/(vector)/vector/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none"><rect width="64" height="64" fill="#030706"/><path d="M12 32 32 12l20 20-20 20L12 32Z" stroke="#51F6D3"/><path d="m20 32 12-12 12 12-12 12-12-12Z" stroke="#B8FF57"/><circle cx="32" cy="32" r="3" fill="#B8FF57"/></svg>
]]>
    </file>
    <file path="src/app/(vector)/vector/page.tsx">
<![CDATA[import { VectorExperience } from "./VectorExperience";

export default function VectorPage() {
  return <VectorExperience />;
}
]]>
    </file>
    <file path="src/app/(vector)/vector/vector.css">
<![CDATA[@import "tailwindcss";

@theme {
  --color-vector-black: #030706;
  --color-vector-deep: #071713;
  --color-vector-cyan: #51F6D3;
  --color-vector-green: #B8FF57;
  --color-vector-mute: #51F6D3;
  --font-vector-mono: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  --font-vector-display: Arial, Helvetica, sans-serif;
}

:root { --vector-gutter: clamp(20px, 5vw, 84px); --vector-topbar: 72px; }
html:has(.vector-body) { scroll-behavior: smooth; scroll-padding-top: var(--vector-topbar); }
.vector-body { margin: 0; background: #030706; color: #51F6D3; font-family: var(--font-vector-mono); overflow-x: hidden; -webkit-font-smoothing: none; }
.vector-body ::selection { background: #B8FF57; color: #030706; }
.vector-body :focus-visible { outline: 2px solid #B8FF57; outline-offset: 3px; }
.vector-site { position: relative; min-height: 100vh; overflow: clip; }
.vector-wrap { width: min(1400px, calc(100% - (var(--vector-gutter) * 2))); margin: 0 auto; position: relative; z-index: 2; }
.vector-background { position: fixed; inset: 0; z-index: 0; background: #030706; pointer-events: none; }
.vector-canvas { position: absolute; inset: 0; width: 100%; height: 100%; }
.vector-scanlines { position: absolute; inset: 0; background: repeating-linear-gradient(0deg, rgba(81,246,211,.03) 0 1px, transparent 1px 4px); mix-blend-mode: screen; opacity: .7; }
.vector-background::after { content: ""; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 48%, transparent 0 35%, rgba(3,7,6,.68) 90%); }
.vector-hud { position: absolute; right: 24px; bottom: 18px; display: flex; gap: 18px; color: rgba(81,246,211,.55); font-family: var(--font-vector-mono); font-size: 9px; letter-spacing: .12em; text-transform: uppercase; }
.vector-topbar { position: fixed; inset: 0 0 auto; z-index: 30; height: var(--vector-topbar); display: flex; align-items: center; gap: 24px; padding: 0 var(--vector-gutter); border-bottom: 1px solid rgba(81,246,211,.24); background: rgba(3,7,6,.84); backdrop-filter: blur(12px); }
.vector-wordmark { display: inline-flex; align-items: center; gap: 11px; color: #51F6D3; text-decoration: none; font-family: var(--font-vector-mono); font-size: 12px; letter-spacing: .18em; }
.vector-slash { color: #B8FF57; }
.vector-mark { width: 25px; height: 25px; position: relative; display: block; }
.vector-mark::before, .vector-mark::after { content: ""; position: absolute; border: 1px solid #51F6D3; transform: rotate(45deg); }
.vector-mark::before { inset: 3px 7px; }
.vector-mark::after { inset: 7px 3px; }
.vector-mark span { position: absolute; width: 3px; height: 3px; background: #B8FF57; }
.vector-mark span:nth-child(1) { top: 1px; right: 1px; }.vector-mark span:nth-child(2) { left: 1px; bottom: 4px; }.vector-mark span:nth-child(3) { right: 5px; bottom: 0; }
.vector-nav { display: flex; gap: 23px; margin-left: auto; }
.vector-nav a, .vector-top-cta, .vector-rail, .vector-kicker, .vector-coordinates, .vector-hero-footer, .vector-footer { font-family: var(--font-vector-mono); text-transform: uppercase; letter-spacing: .1em; }
.vector-nav a { color: rgba(81,246,211,.58); text-decoration: none; font-size: 9px; }
.vector-nav a span { color: #B8FF57; margin-right: 6px; }.vector-nav a:hover { color: #B8FF57; }
.vector-top-cta, .vector-button { display: inline-flex; align-items: center; justify-content: space-between; gap: 20px; border: 1px solid #51F6D3; color: #51F6D3; text-decoration: none; font-family: var(--font-vector-mono); font-size: 9px; letter-spacing: .1em; text-transform: uppercase; transition: background-color 180ms ease, color 180ms ease, transform 180ms ease; }
.vector-top-cta { padding: 11px 14px; }.vector-top-cta:hover, .vector-button:hover { background: #51F6D3; color: #030706; }.vector-button { width: fit-content; padding: 16px 18px; }.vector-button:hover { transform: translateY(-2px); }.vector-button-primary { background: #B8FF57; border-color: #B8FF57; color: #030706; }.vector-button-primary:hover { background: #51F6D3; border-color: #51F6D3; }
.vector-rail { position: fixed; z-index: 15; right: 26px; top: 50%; display: grid; gap: 13px; transform: translateY(-50%); font-size: 9px; }.vector-rail a { display: flex; align-items: center; gap: 9px; color: rgba(81,246,211,.45); text-decoration: none; }.vector-rail a::before { content: ""; width: 17px; height: 1px; background: currentColor; transition: width 180ms ease; }.vector-rail a:hover { color: #B8FF57; }.vector-rail a:hover::before { width: 27px; }.vector-rail b { display: none; font-weight: 400; }

.vector-hero { min-height: 138svh; position: relative; padding-top: var(--vector-topbar); }.vector-hero-grid { min-height: calc(100svh - var(--vector-topbar)); display: grid; grid-template-columns: minmax(0, 1fr) 240px; gap: 10vw; align-items: center; padding: 11vh 0 24vh; }.vector-kicker { margin: 0 0 27px; color: #B8FF57; font-size: 10px; line-height: 1.5; }.vector-hero h1, .vector-section h2, .vector-contact h2 { margin: 0; font-family: var(--font-vector-display); font-weight: 700; letter-spacing: -.07em; line-height: .9; text-wrap: balance; text-transform: uppercase; }.vector-hero h1 { max-width: 850px; font-size: clamp(4.3rem, 9.5vw, 10.4rem); }.vector-hero h1 em, .vector-section h2 em, .vector-contact h2 em { color: #B8FF57; font-style: normal; }.vector-hero-lead { max-width: 48ch; margin: 34px 0 34px; color: rgba(81,246,211,.7); font-size: 1rem; line-height: 1.65; }.vector-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 22px; }.vector-status { color: rgba(81,246,211,.56); font-size: 9px; letter-spacing: .08em; text-transform: uppercase; }.vector-status i { display: inline-block; width: 6px; height: 6px; margin-right: 8px; border-radius: 50%; background: #B8FF57; }.vector-readout { align-self: end; display: grid; gap: 7px; color: #51F6D3; transform: translate3d(0, var(--vector-offset, 0px), 0); }.vector-readout span, .vector-readout small { color: rgba(81,246,211,.54); font-size: 9px; letter-spacing: .1em; text-transform: uppercase; }.vector-readout strong { color: #B8FF57; font-size: 3.4rem; font-weight: 400; letter-spacing: -.08em; line-height: .8; }.vector-readout-rule { height: 1px; margin: 18px 0 10px; background: rgba(81,246,211,.32); }.vector-coordinates, .vector-hero-footer { position: absolute; bottom: 10vh; color: rgba(81,246,211,.42); font-size: 9px; }.vector-coordinates { left: var(--vector-gutter); }.vector-hero-footer { right: var(--vector-gutter); }.vector-hero-footer span { color: #B8FF57; margin-left: 8px; }

.vector-section, .vector-contact { position: relative; min-height: 100svh; padding: 17vh 0; border-top: 1px solid rgba(81,246,211,.18); }.vector-section-terminal { background: rgba(3,7,6,.84); }.vector-split-grid { display: grid; grid-template-columns: minmax(0, .75fr) minmax(0, 1.25fr); gap: 9vw; align-items: start; }.vector-section h2, .vector-contact h2 { max-width: 760px; font-size: clamp(3.3rem, 7vw, 8rem); }.vector-section-intro > p:last-child, .vector-runtime-copy > p, .vector-signal-copy > p, .vector-contact-copy > p:not(.vector-kicker) { max-width: 42ch; margin: 30px 0 0; color: rgba(81,246,211,.66); line-height: 1.65; }.vector-terminal { background: rgba(3,7,6,.95); border: 1px solid rgba(81,246,211,.45); box-shadow: 9px 9px 0 rgba(184,255,87,.18); }.vector-terminal-bar { display: flex; align-items: center; gap: 7px; padding: 12px 14px; border-bottom: 1px solid rgba(81,246,211,.28); color: rgba(81,246,211,.52); font-size: 9px; }.vector-terminal-bar span { width: 6px; height: 6px; border: 1px solid #51F6D3; }.vector-terminal-bar b { margin-left: auto; font-weight: 400; letter-spacing: .08em; }.vector-terminal pre { min-height: 290px; margin: 0; padding: 25px; overflow: auto; color: #51F6D3; font-size: 13px; line-height: 1.65; white-space: pre-wrap; }.vector-terminal code { font-family: var(--font-vector-mono); }.vector-terminal code::first-line { color: #B8FF57; }

.vector-section-runtime { background: rgba(7,23,19,.9); }.vector-runtime-grid { display: grid; grid-template-columns: minmax(180px, .55fr) minmax(0, 1.45fr); gap: 10vw; align-items: start; }.vector-runtime-aside { display: grid; gap: 14px; color: rgba(81,246,211,.6); font-size: 9px; letter-spacing: .1em; text-transform: uppercase; }.vector-big-index { color: #B8FF57; font-size: 8rem; line-height: .7; letter-spacing: -.12em; }.vector-runtime-copy h2 { max-width: 850px; }.vector-runtime-list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; margin-top: 72px; background: rgba(81,246,211,.3); }.vector-runtime-list div { display: grid; gap: 10px; min-height: 140px; padding: 16px; background: #071713; }.vector-runtime-list span, .vector-runtime-list small { color: rgba(81,246,211,.55); font-size: 9px; letter-spacing: .1em; text-transform: uppercase; }.vector-runtime-list strong { color: #B8FF57; font-size: 1.5rem; font-weight: 400; }

.vector-section-signal { background: rgba(3,7,6,.9); }.vector-signal-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(250px, .8fr); gap: 12vw; align-items: end; }.vector-signal-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; border-top: 1px solid rgba(81,246,211,.35); border-bottom: 1px solid rgba(81,246,211,.35); }.vector-signal-stats div { display: grid; gap: 12px; padding: 18px 10px 22px 0; border-right: 1px solid rgba(81,246,211,.28); }.vector-signal-stats div + div { padding-left: 10px; }.vector-signal-stats div:last-child { border-right: 0; }.vector-signal-stats strong { color: #B8FF57; font-size: clamp(2rem, 4vw, 4.8rem); font-weight: 400; letter-spacing: -.1em; line-height: .75; }.vector-signal-stats strong span { font-size: .35em; letter-spacing: 0; }.vector-signal-stats small { color: rgba(81,246,211,.56); font-size: 9px; line-height: 1.4; text-transform: uppercase; }

.vector-contact { min-height: 80svh; background: #071713; }.vector-contact-grid { display: grid; grid-template-columns: minmax(0, 1fr) 260px; gap: 10vw; align-items: center; }.vector-contact-copy h2 { max-width: 570px; }.vector-contact-panel { display: grid; gap: 12px; padding: 20px; border: 1px solid rgba(184,255,87,.65); color: #B8FF57; transform: translate3d(0, var(--vector-offset, 0px), 0); }.vector-contact-panel span, .vector-contact-panel small { color: rgba(81,246,211,.56); font-size: 9px; text-transform: uppercase; letter-spacing: .1em; }.vector-contact-panel strong { font-size: 4rem; font-weight: 400; letter-spacing: -.1em; }.vector-progress { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; margin-top: 25px; }.vector-progress i { height: 10px; background: #B8FF57; }.vector-progress i:nth-child(4) { background: #51F6D3; }.vector-footer { grid-column: 1 / -1; display: flex; justify-content: space-between; gap: 20px; margin-top: 9vh; padding-top: 18px; border-top: 1px solid rgba(81,246,211,.25); color: rgba(81,246,211,.5); font-size: 9px; }.vector-footer a { color: #51F6D3; text-decoration: none; }
.vector-reveal { opacity: 0; transform: translateY(25px); transition: opacity 650ms cubic-bezier(.23,1,.32,1), transform 700ms cubic-bezier(.23,1,.32,1); }.vector-reveal.is-visible { opacity: 1; transform: translateY(0); }
@media (min-width: 1050px) { .vector-rail b { display: inline; } }
@media (max-width: 850px) { :root { --vector-topbar: 64px; }.vector-topbar { gap: 12px; }.vector-nav { display: none; }.vector-top-cta { margin-left: auto; padding: 10px 12px; }.vector-hero-grid, .vector-split-grid, .vector-runtime-grid, .vector-signal-grid, .vector-contact-grid { grid-template-columns: 1fr; gap: 50px; }.vector-hero-grid { min-height: auto; padding: 100px 0 180px; }.vector-readout { align-self: start; }.vector-terminal { box-shadow: 5px 5px 0 rgba(184,255,87,.18); }.vector-runtime-list { margin-top: 42px; }.vector-contact-panel { width: min(100%, 300px); }.vector-footer { display: grid; gap: 10px; } }
@media (max-width: 500px) { .vector-hero h1, .vector-section h2, .vector-contact h2 { max-width: 12ch; font-size: clamp(3.1rem, 14vw, 6rem); }.vector-rail { right: 14px; }.vector-signal-stats { grid-template-columns: 1fr; }.vector-signal-stats div, .vector-signal-stats div + div { padding: 13px 0; border-right: 0; border-bottom: 1px solid rgba(81,246,211,.28); }.vector-signal-stats div:last-child { border-bottom: 0; } }
@media (prefers-reduced-motion: reduce) { html:has(.vector-body) { scroll-behavior: auto; }.vector-reveal { opacity: 1; transform: none; transition: none; }.vector-button, .vector-nav a { transition: none; }.vector-canvas { opacity: .7; } }]]>
    </file>
    <file path="src/app/(vector)/vector/VectorExperience.tsx">
<![CDATA["use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const chapters = [
  { id: "system", label: "System" },
  { id: "runtime", label: "Runtime" },
  { id: "signal", label: "Signal" },
  { id: "contact", label: "Contact" },
];

function VectorMark() { return <span className="vector-mark" aria-hidden="true"><span /><span /><span /></span>; }

export function VectorExperience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x030706, 7, 22);
    scene.add(new THREE.AmbientLight(0x51f6d3, 0.35));
    const fill = new THREE.DirectionalLight(0xb8ff57, 1.2);
    fill.position.set(3, 5, 4);
    scene.add(fill);
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 60);
    camera.position.set(0, 2.8, 8.5);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x030706, 1);
    const world = new THREE.Group();
    world.position.y = -0.6;
    scene.add(world);

    const grid = new THREE.GridHelper(70, 70, 0x51f6d3, 0x123b38);
    grid.position.set(0, -1.75, -10);
    grid.scale.z = 1.8;
    world.add(grid);
    const horizon = new THREE.Group();
    for (let i = -8; i <= 8; i += 1) {
      horizon.add(new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i * 1.6, -1.73, -1), new THREE.Vector3(i * 2.8, -1.73, -24)]),
        new THREE.LineBasicMaterial({ color: i % 2 === 0 ? 0x51f6d3 : 0xb8ff57, transparent: true, opacity: 0.32 }),
      ));
    }
    world.add(horizon);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x23534e, flatShading: true, transparent: true, opacity: 0.28 });
    const body = new THREE.Mesh(new THREE.IcosahedronGeometry(1.62, 2), bodyMaterial);
    body.position.set(0, 0.55, -4.7);
    world.add(body);
    const wireMaterial = new THREE.MeshBasicMaterial({ color: 0x51f6d3, wireframe: true, transparent: true, opacity: 0.86 });
    const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.68, 2), wireMaterial);
    wire.position.copy(body.position);
    world.add(wire);
    const rings: THREE.Mesh[] = [];
    [2.25, 2.7].forEach((radius, index) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.012, 5, 96), new THREE.MeshBasicMaterial({ color: index === 0 ? 0xb8ff57 : 0x51f6d3, transparent: true, opacity: 0.68 }));
      ring.position.copy(body.position);
      ring.rotation.set(index * 0.75, index * 0.45, index * 0.25);
      world.add(ring);
      rings.push(ring);
    });
    const points = new Float32Array(420 * 3);
    for (let i = 0; i < 420; i += 1) { points[i * 3] = (Math.random() - 0.5) * 15; points[i * 3 + 1] = Math.random() * 7 - 1; points[i * 3 + 2] = -Math.random() * 24 - 1; }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(points, 3));
    const particles = new THREE.Points(particleGeometry, new THREE.PointsMaterial({ color: 0x51f6d3, size: 0.018, transparent: true, opacity: 0.56 }));
    world.add(particles);
    const satelliteMaterial = new THREE.MeshBasicMaterial({ color: 0xb8ff57 });
    const satellite = new THREE.Mesh(new THREE.OctahedronGeometry(0.14, 0), satelliteMaterial);
    satellite.position.set(2.35, 1.75, -4.5);
    world.add(satellite);

    const resize = () => { const width = canvas.clientWidth || window.innerWidth; const height = canvas.clientHeight || window.innerHeight; renderer.setSize(width, height, false); camera.aspect = width / height; camera.updateProjectionMatrix(); };
    resize();
    window.addEventListener("resize", resize);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const parallaxNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-vector-depth]"));
    let targetScroll = window.scrollY;
    let currentScroll = targetScroll;
    let frame = 0;
    const onScroll = () => { targetScroll = window.scrollY; };
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)), { threshold: 0.14 });
    document.querySelectorAll(".vector-reveal").forEach((node) => observer.observe(node));
    const animate = () => {
      currentScroll += (targetScroll - currentScroll) * (reducedMotion.matches ? 1 : 0.08);
      const progress = Math.min(1, currentScroll / Math.max(1, document.body.scrollHeight - window.innerHeight));
      const time = performance.now() * 0.001;
      body.rotation.y = reducedMotion.matches ? 0.22 : time * 0.18 + progress * 1.5;
      wire.rotation.y = body.rotation.y;
      body.rotation.x = 0.2 + progress * 0.5;
      wire.rotation.x = body.rotation.x;
      rings.forEach((ring, index) => { ring.rotation.z += reducedMotion.matches ? 0 : 0.001 * (index + 1); ring.rotation.x += reducedMotion.matches ? 0 : 0.0006 * (index + 1); });
      satellite.position.y = 1.75 + (reducedMotion.matches ? 0 : Math.sin(time * 1.2) * 0.16);
      world.position.y = -0.6 + progress * 0.85;
      camera.position.z = 8.5 - progress * 1.7;
      camera.position.y = 2.8 + progress * 0.3;
      camera.lookAt(0, 0, -4.2);
      parallaxNodes.forEach((node) => node.style.setProperty("--vector-offset", `${currentScroll * Number(node.dataset.vectorDepth ?? 0)}px`));
      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(animate);
    };
    frame = window.requestAnimationFrame(animate);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener("resize", resize); window.removeEventListener("scroll", onScroll); observer.disconnect(); renderer.dispose(); body.geometry.dispose(); bodyMaterial.dispose(); wire.geometry.dispose(); wireMaterial.dispose(); rings.forEach((ring) => { ring.geometry.dispose(); (ring.material as THREE.Material).dispose(); }); particleGeometry.dispose(); (particles.material as THREE.Material).dispose(); satellite.geometry.dispose(); satelliteMaterial.dispose(); };
  }, []);

  return (
    <div className="vector-site">
      <div className="vector-background" aria-hidden="true"><canvas ref={canvasRef} className="vector-canvas" /><div className="vector-scanlines" /><div className="vector-hud"><span>VECTOR/90</span><span>PORT 04 / ONLINE</span></div></div>
      <header className="vector-topbar"><a className="vector-wordmark" href="#top" aria-label="VECTOR 90 home"><VectorMark /><span>VECTOR<span className="vector-slash">/</span>90</span></a><nav aria-label="Primary navigation" className="vector-nav">{chapters.slice(0, 3).map((chapter, index) => <a href={`#${chapter.id}`} key={chapter.id}><span>0{index + 1}</span>{chapter.label}</a>)}</nav><a className="vector-top-cta" href="#contact">Open console <span aria-hidden="true">↗</span></a></header>
      <aside className="vector-rail" aria-label="Page chapters">{chapters.map((chapter, index) => <a href={`#${chapter.id}`} key={chapter.id}><span>0{index + 1}</span><b>{chapter.label}</b></a>)}</aside>
      <main id="top">
        <section className="vector-hero" aria-labelledby="vector-title"><div className="vector-wrap vector-hero-grid"><div className="vector-hero-copy vector-reveal"><p className="vector-kicker">Runtime intelligence / Build 0.9.4</p><h1 id="vector-title">Make the invisible stack <em>visible.</em></h1><p className="vector-hero-lead">VECTOR/90 is a live runtime map for teams that need to see every layer of a system before it breaks.</p><div className="vector-actions"><a className="vector-button vector-button-primary" href="#system">Initialize view <span aria-hidden="true">↘</span></a><span className="vector-status"><i /> All systems nominal</span></div></div><div className="vector-readout vector-reveal" data-vector-depth="-0.05"><span>FIELD READOUT</span><strong>06.42</strong><small>latency / ms</small><div className="vector-readout-rule" /><span>PACKETS OBSERVED</span><strong>18,432</strong><small>last 60 seconds</small></div></div><div className="vector-coordinates" aria-hidden="true">X 003.14 / Y 090.00 / Z 001.20</div><div className="vector-hero-footer" aria-hidden="true">SCROLL TO MOVE THROUGH THE MODEL <span>↓</span></div></section>
        <section id="system" className="vector-section vector-section-terminal" aria-labelledby="system-title"><div className="vector-wrap vector-split-grid"><div className="vector-section-intro vector-reveal"><p className="vector-kicker">01 — System</p><h2 id="system-title">Every service leaves a shape.</h2><p>Trace dependencies, isolate the noisy edge, and see how a single request moves across the stack.</p></div><div className="vector-terminal vector-reveal"><div className="vector-terminal-bar"><span /><span /><span /><b>vector://runtime/trace</b></div><pre><code>{`$ vector trace --service api-gateway

[ ok ] edge-router       12ms
[ ok ] auth-service      08ms
[warn] cache-layer       61ms
[ ok ] billing-worker    14ms

&gt; path resolved / 04 hops
&gt; anomaly isolated / cache-layer`}</code></pre></div></div></section>
        <section id="runtime" className="vector-section vector-section-runtime" aria-labelledby="runtime-title"><div className="vector-wrap vector-runtime-grid"><div className="vector-runtime-aside vector-reveal"><p className="vector-kicker">02 — Runtime</p><span className="vector-big-index">02</span><span>MODEL THE<br />MOTION</span></div><div className="vector-runtime-copy vector-reveal"><h2 id="runtime-title">Observe the system while it is still <em>moving.</em></h2><p>Static dashboards explain the past. VECTOR/90 gives your team a shared model of what is changing now, from request path to resource pressure.</p><div className="vector-runtime-list"><div><span>01</span><strong>Map</strong><small>every dependency</small></div><div><span>02</span><strong>Replay</strong><small>every incident</small></div><div><span>03</span><strong>Resolve</strong><small>before impact</small></div></div></div></div></section>
        <section id="signal" className="vector-section vector-section-signal" aria-labelledby="signal-title"><div className="vector-wrap vector-signal-grid"><div className="vector-signal-copy vector-reveal"><p className="vector-kicker">03 — Signal</p><h2 id="signal-title">The signal is in the <em>edges.</em></h2><p>Bring the whole system into the room. Searchable traces, replayable incidents, and a map that makes a complex handoff legible.</p><a className="vector-button" href="#contact">Read the protocol <span aria-hidden="true">↗</span></a></div><div className="vector-signal-stats vector-reveal"><div><strong>99.98<span>%</span></strong><small>requests resolved</small></div><div><strong>04<span>×</span></strong><small>faster incident review</small></div><div><strong>00<span>°</span></strong><small>blind spots</small></div></div></div></section>
        <section id="contact" className="vector-contact" aria-labelledby="contact-title"><div className="vector-wrap vector-contact-grid"><div className="vector-contact-copy vector-reveal"><p className="vector-kicker">04 — Access</p><h2 id="contact-title">Enter the <em>system.</em></h2><p>Give your team the map. Request access to the VECTOR/90 private beta.</p><a className="vector-button vector-button-primary" href="mailto:hello@vector90.dev">hello@vector90.dev <span aria-hidden="true">↗</span></a></div><div className="vector-contact-panel vector-reveal"><span>VECTOR/90</span><strong>READY</strong><small>private beta / 2026</small><div className="vector-progress"><i /><i /><i /><i /><i /><i /><i /></div></div><footer className="vector-footer"><span>© 1996—2026 VECTOR SYSTEMS</span><span>BUILD 0.9.4 / ALL SIGNALS CLEAR</span><a href="#top">Back to top ↑</a></footer></div></section>
      </main>
    </div>
  );
}
]]>
    </file>
  </files>
</template>
