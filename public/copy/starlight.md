<template slug="starlight" name="Starlight Lab">
  <dependencies>
    {
      "dependencies": {
        "three": "^0.186.1",
        "@phosphor-icons/react": "^2.1.10"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(starlight)/layout.tsx">
<![CDATA[import type { Metadata } from "next";
import { Geist_Mono, Manrope } from "next/font/google";
import "./starlight/starlight.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Starlight Lab | Pure WebGL model studies",
  description:
    "A dependency free WebGL2 space for turning 3D model ideas into fast, inspectable scenes.",
  openGraph: {
    title: "Starlight Lab | Pure WebGL model studies",
    description: "Explore a raw WebGL2 planet scene and learn the small system behind it.",
    type: "website",
  },
};

export default function StarlightLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${mono.variable}`}>
      <body className="stl-body">
        <a className="stl-skip" href="#main-content">
          Skip to content
        </a>
        {children}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(starlight)/starlight/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(starlight)/starlight/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp") {
  return key in ASSETS ? `/templates/starlight/${key}-${width}.${format}` : null;
}

export function Picture({ assetKey, alt, className = "" }: { assetKey: string; alt: string; className?: string }) {
  const src = assetSrc(assetKey, 800);
  if (!src) {
    return <div className={`stl-placeholder ${className}`} role="img" aria-label={alt}><span>{assetKey}</span></div>;
  }
  const { w, h } = ASSETS[assetKey];
  return <img className={className} src={src} width={w} height={h} alt={alt} loading="lazy" decoding="async" />;
}
]]>
    </file>
    <file path="src/app/(starlight)/starlight/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#090B12"/>
  <circle cx="16" cy="16" r="6.5" fill="#F7F8FC"/>
  <circle cx="16" cy="16" r="12" fill="none" stroke="#F7F8FC" stroke-opacity=".5"/>
  <circle cx="26" cy="9" r="2" fill="#7DF2D1"/>
</svg>
]]>
    </file>
    <file path="src/app/(starlight)/starlight/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#090B12", color: "#F7F8FC", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#7DF2D1", fontSize: 22, letterSpacing: 4 }}>✦ STARLIGHT LAB / PURE WEBGL2</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ fontSize: 72, lineHeight: 1, fontWeight: 700 }}>Build worlds</div>
        <div style={{ fontSize: 72, lineHeight: 1, fontWeight: 700, color: "#7DF2D1" }}>from the pixel out.</div>
      </div>
      <div style={{ display: "flex", gap: 24, color: "#9EA7BC", fontSize: 20 }}>A readable model lab for the browser.</div>
    </div>,
    { ...size },
  );
}
]]>
    </file>
    <file path="src/app/(starlight)/starlight/page.tsx">
<![CDATA[import { notFound } from "next/navigation";
import { ArrowUpRight, Check, Code, Cube, Gauge, GitBranch, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "./brand/Logo";
import { DemoForm } from "./forms/DemoForm";
import { Reveal, TaglineReveal } from "./motion/Reveal";
import { AlignmentControl } from "./space/AlignmentControl";
import { ChapterRail, JourneyCanvas, JourneyChapter } from "./space/JourneyCanvas";
import { SpaceCanvas } from "./space/SpaceCanvas";

const benefits = [
  { icon: Code, title: "See every draw call", body: "Learn from a small shader core you can read in one sitting, then bend it to your own model." },
  { icon: Gauge, title: "Keep the frame honest", body: "A tiny runtime leaves room for the details that make a scene feel alive: light, motion and texture." },
  { icon: GitBranch, title: "Own the render path", body: "No scene graph or hidden build step. Your geometry, buffers and uniforms stay close to the surface." },
];

const faqs = [
  ["Is this a Three.js wrapper?", "No. The preview uses a WebGL2 context, a full screen triangle and two GLSL shaders. There is no Three.js dependency."],
  ["Do I need WebGL2 hardware?", "The live scene needs WebGL2. The page keeps the copy and starter download available if your device cannot run the preview."],
  ["Can I use my own models?", "Yes. The starter includes the buffer and uniform seams you need to add indexed geometry, textures or a glTF parser of your choice."],
  ["Is the starter really free?", "Yes. It is a local demo with no account, payment or email list. Enter an email only to unlock the download state in this prototype."],
  ["Will it work on a phone?", "The page is responsive and the canvas remains lightweight. Touch devices get the same scene without pointer tilt effects."],
  ["What does pure WebGL mean here?", "The renderer speaks directly to the browser's WebGL2 API. You create the context, compile shaders and issue the draw call yourself."],
];

export default function StarlightPage() {
  notFound();
  return <div className="stl-page">
    <header className="stl-header"><a href="#main-content" className="stl-brand-link"><Logo /></a><nav className="stl-nav" aria-label="Primary"><a href="#why">Why raw WebGL</a><a href="#process">Process</a><a href="#faq">FAQ</a></nav><a className="stl-header-cta" href="#demo">Launch demo <ArrowUpRight size={16} weight="bold" /></a></header>
    <main id="main-content">
      <section className="stl-hero" aria-labelledby="hero-title">
        <div className="stl-hero-copy">
          <Reveal className="stl-kicker"><span className="stl-kicker-dot" />pure WebGL2 / model studies</Reveal>
          <Reveal delay={80}><h1 id="hero-title">Build worlds<br /><span>from the pixel out.</span></h1></Reveal>
          <Reveal delay={160}><p className="stl-hero-lead">A calm starting point for engineers who want to understand every vertex, uniform and light in a 3D scene.</p></Reveal>
          <Reveal delay={240} className="stl-hero-actions"><a className="stl-button stl-button--solid" href="#demo">Launch the WebGL demo <ArrowUpRight size={18} weight="bold" /></a><a className="stl-text-link" href="#process">Read the method <span aria-hidden="true">↓</span></a></Reveal>
          <Reveal delay={320} className="stl-proof"><span><Check size={15} weight="bold" /> 2.4 KB shader core</span><span><Check size={15} weight="bold" /> no Three.js</span><span><Check size={15} weight="bold" /> WebGL2 ready</span></Reveal>
        </div>
        <Reveal className="stl-hero-art" delay={180}><SpaceCanvas /><div className="stl-orbit-label stl-orbit-label--a">lat 18.04° N</div><div className="stl-orbit-label stl-orbit-label--b">light / 03</div></Reveal>
      </section>

      <section className="stl-tagline" aria-label="Core benefit"><TaglineReveal text="Understand the render path, then make it yours." /><span className="stl-tagline-index">01 / 04</span></section>

      <section className="stl-journey" id="journey" aria-label="Scroll driven model journey">
        <JourneyCanvas />
        <ChapterRail />
        <div className="stl-journey-content">
          <JourneyChapter index={0} eyebrow="00 / Eclipse" title={<>Start with<br /><em>the shadow.</em></>} body="A solid body, one quiet light, and the first question: what does the browser need to know before it can show a world?" />
          <JourneyChapter index={1} eyebrow="01 / Aperture" title={<>Take the model<br /><em>apart.</em></>} body="Scroll through the shell and the instrument opens. Rings separate, the lens catches, and each layer earns its place in the frame." />
          <JourneyChapter index={2} eyebrow="02 / Passage" title={<>Make distance<br /><em>feel close.</em></>} body="The pieces become a corridor. Geometry, uniforms and light move together while the camera carries you through the scene." />
          <JourneyChapter index={3} eyebrow="03 / Alignment" title={<>Keep one<br /><em>small moment.</em></>} body="Finish on a living alignment. Drag the offset, move the light and leave the scene in a position that feels like yours."><AlignmentControl /></JourneyChapter>
        </div>
      </section>

      <section className="stl-section stl-section--why" id="why" aria-labelledby="why-title">
        <Reveal className="stl-section-intro"><span className="stl-kicker">01 / Why raw WebGL</span><h2 id="why-title">The shortest path<br />between idea and image.</h2><p>Abstractions are useful once you know what they hide. Start with a small scene that makes the browser’s pipeline visible.</p></Reveal>
        <div className="stl-benefits">{benefits.map(({ icon: Icon, title, body }, index) => <Reveal key={title} delay={index * 90} className="stl-benefit"><div className="stl-benefit-icon"><Icon size={22} weight="regular" /></div><span className="stl-benefit-number">0{index + 1}</span><h3>{title}</h3><p>{body}</p></Reveal>)}</div>
      </section>

      <section className="stl-section stl-section--process" id="process" aria-labelledby="process-title">
        <Reveal className="stl-section-intro"><span className="stl-kicker">02 / Process</span><h2 id="process-title">A model lab<br />with nothing to hide.</h2></Reveal>
        <div className="stl-process-grid"><Reveal className="stl-process-card"><div className="stl-process-card-top"><span className="stl-process-index">01</span><Cube size={24} /></div><h3>Shape the geometry</h3><p>Start with positions and normals. Keep the data close enough to inspect in your browser devtools.</p><div className="stl-code-line"><span>bufferData</span><b>ARRAY_BUFFER</b></div></Reveal><Reveal delay={100} className="stl-process-card stl-process-card--accent"><div className="stl-process-card-top"><span className="stl-process-index">02</span><Sparkle size={24} /></div><h3>Light the surface</h3><p>Use a fragment shader to turn a mathematical sphere into a place with weather, depth and a point of view.</p><div className="stl-code-line"><span>uniform</span><b>u_light</b></div></Reveal><Reveal delay={200} className="stl-process-card"><div className="stl-process-card-top"><span className="stl-process-index">03</span><Code size={24} /></div><h3>Make it move</h3><p>One requestAnimationFrame loop is enough to animate the scene and keep the frame budget legible.</p><div className="stl-code-line"><span>drawArrays</span><b>TRIANGLES</b></div></Reveal></div>
      </section>

      <section className="stl-stats" aria-label="WebGL starter facts"><div><strong>01</strong><span>context</span></div><div><strong>60</strong><span>frames target</span></div><div><strong>0</strong><span>scene graph deps</span></div><div><strong>100%</strong><span>your render path</span></div></section>

      <section className="stl-section stl-section--faq" id="faq" aria-labelledby="faq-title"><Reveal className="stl-section-intro"><span className="stl-kicker">03 / FAQ</span><h2 id="faq-title">Good questions<br />make better models.</h2></Reveal><div className="stl-faq-list">{faqs.map(([question, answer], index) => <Reveal key={question} delay={index * 45}><details className="stl-faq"><summary><span>{question}</span><span className="stl-faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details></Reveal>)}</div></section>

      <section className="stl-demo" id="demo" aria-labelledby="demo-title"><div className="stl-demo-grid"><Reveal className="stl-demo-copy"><span className="stl-kicker">04 / Start a study</span><h2 id="demo-title">Your next scene<br /><span>starts here.</span></h2><p>Get the tiny starter that powers the preview. Bring your own geometry, then keep the parts that matter.</p><div className="stl-demo-checks"><span><Check size={16} weight="bold" /> local only</span><span><Check size={16} weight="bold" /> MIT licensed</span><span><Check size={16} weight="bold" /> readable GLSL</span></div></Reveal><Reveal delay={120} className="stl-demo-form"><DemoForm /></Reveal></div></section>
    </main>
    <footer className="stl-footer"><Logo compact /><span>© 2026 Starlight Lab</span><div className="stl-footer-nav"><a href="#stl-chapter-0">Eclipse</a><a href="#stl-chapter-1">Aperture</a><a href="#stl-chapter-2">Passage</a><a href="#stl-chapter-3">Alignment</a><a href="#main-content">Back to top ↑</a><a href="#faq">FAQ</a></div></footer>
  </div>;
}
]]>
    </file>
    <file path="src/app/(starlight)/starlight/starlight.css">
<![CDATA[@import "tailwindcss";

@theme {
  --color-stl-void: #090B12;
  --color-stl-panel: #111522;
  --color-stl-paper: #F7F8FC;
  --color-stl-muted: #9EA7BC;
  --color-stl-line: #2A3245;
  --color-stl-accent: #7DF2D1;
  --color-stl-coral: #FF9275;
  --font-stl-body: var(--font-manrope), system-ui, sans-serif;
  --font-stl-mono: var(--font-geist-mono), ui-monospace, monospace;
  --ease-stl: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-stl: 650ms;
}

:root { color-scheme: dark; }
* { box-sizing: border-box; }
em { font-style: normal; color: #7DF2D1; }
html { scroll-behavior: smooth; background: #090B12; }
body.stl-body { margin: 0; background: #090B12; color: #F7F8FC; font-family: var(--font-stl-body); font-size: 16px; line-height: 1.5; }
a { color: inherit; }
.stl-skip { position: fixed; top: 12px; left: 12px; z-index: 100; padding: 8px 12px; border-radius: 8px; background: #7DF2D1; color: #090B12; transform: translateY(-160%); transition: transform 300ms var(--ease-stl); }
.stl-skip:focus { transform: translateY(0); }
.stl-page { overflow: clip; }
.stl-header { position: fixed; z-index: 20; top: 16px; left: 50%; width: min(1160px, calc(100% - 32px)); transform: translateX(-50%); display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 12px 16px; border: 1px solid color-mix(in srgb, #F7F8FC 13%, transparent); border-radius: 12px; background: color-mix(in srgb, #111522 78%, transparent); backdrop-filter: blur(14px); }
.stl-brand-link { text-decoration: none; }
.stl-logo { display: inline-flex; align-items: center; gap: 9px; font-weight: 700; letter-spacing: -0.03em; }
.stl-logo__mark { width: 28px; height: 28px; color: #F7F8FC; }
.stl-logo__word { font-size: 14px; }
.stl-nav { display: flex; gap: 24px; color: #9EA7BC; font-size: 13px; }
.stl-nav a, .stl-footer a { text-decoration: none; transition: color 300ms var(--ease-stl); }
.stl-nav a:hover, .stl-footer a:hover { color: #7DF2D1; }
.stl-header-cta { display: inline-flex; align-items: center; gap: 7px; padding: 8px 12px; border: 1px solid #2A3245; border-radius: 8px; color: #F7F8FC; font-size: 13px; text-decoration: none; transition: transform 300ms var(--ease-stl), border-color 300ms var(--ease-stl), background 300ms var(--ease-stl); }
.stl-header-cta:hover { transform: translateY(-2px); border-color: #7DF2D1; background: color-mix(in srgb, #111522 75%, #7DF2D1); }
.stl-header-cta:active, .stl-button:active { transform: scale(.98); }
.stl-header-cta:focus-visible, .stl-button:focus-visible, .stl-text-link:focus-visible, .stl-nav a:focus-visible, .stl-footer a:focus-visible, summary:focus-visible, input:focus-visible { outline: 2px solid #7DF2D1; outline-offset: 4px; }
.stl-hero { min-height: 100svh; max-width: 1280px; margin: 0 auto; padding: 140px 40px 80px; display: grid; grid-template-columns: minmax(0, .88fr) minmax(480px, 1.12fr); align-items: center; gap: 64px; }
.stl-hero-copy { position: relative; z-index: 2; }
.stl-kicker { display: inline-flex; align-items: center; gap: 8px; color: #7DF2D1; font-family: var(--font-stl-mono); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; }
.stl-kicker-dot { width: 6px; height: 6px; border-radius: 999px; background: #7DF2D1; box-shadow: 0 0 0 4px color-mix(in srgb, #7DF2D1 16%, transparent); }
.stl-hero h1 { max-width: 680px; margin: 24px 0 24px; font-size: clamp(3rem, 7vw, 6rem); line-height: .98; letter-spacing: -.08em; text-wrap: balance; background: linear-gradient(100deg, #F7F8FC 0%, #9EA7BC 100%); background-clip: text; color: transparent; }
.stl-hero h1 span, .stl-demo h2 span { color: #7DF2D1; }
.stl-hero-lead { max-width: 520px; margin: 0; color: #9EA7BC; font-size: 18px; line-height: 1.6; text-wrap: pretty; }
.stl-hero-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 20px; margin-top: 32px; }
.stl-button { display: inline-flex; align-items: center; justify-content: center; gap: 9px; padding: 8px 12px; border: 1px solid #7DF2D1; border-radius: 8px; font-size: 16px; font-weight: 600; text-decoration: none; transition: transform 300ms var(--ease-stl), background 300ms var(--ease-stl), color 300ms var(--ease-stl); }
.stl-button--solid { background: #7DF2D1; color: #090B12; }
.stl-button--solid:hover { transform: translateY(-3px); background: color-mix(in srgb, #7DF2D1 80%, #F7F8FC); }
.stl-text-link { color: #F7F8FC; font-size: 14px; text-underline-offset: 5px; }
.stl-text-link:hover { color: #7DF2D1; }
.stl-proof { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 40px; color: #9EA7BC; font-family: var(--font-stl-mono); font-size: 10px; letter-spacing: .04em; text-transform: uppercase; }
.stl-proof span, .stl-demo-checks span { display: inline-flex; align-items: center; gap: 6px; }
.stl-proof svg, .stl-demo-checks svg { color: #7DF2D1; }
.stl-hero-art { position: relative; min-width: 0; }
.stl-canvas-wrap { position: relative; min-height: 600px; border: 1px solid #2A3245; border-radius: 16px; overflow: hidden; background: #111522; box-shadow: 0 24px 80px color-mix(in srgb, #090B12 34%, transparent); }
.stl-canvas { display: block; width: 100%; height: 600px; }
.stl-canvas-grid { position: absolute; inset: 20px; pointer-events: none; border: 1px solid color-mix(in srgb, #7DF2D1 16%, transparent); border-radius: 12px; opacity: .35; }
.stl-canvas-readout { position: absolute; right: 18px; bottom: 16px; display: grid; gap: 4px; padding: 10px 12px; border: 1px solid #2A3245; border-radius: 8px; background: color-mix(in srgb, #090B12 76%, transparent); font-family: var(--font-stl-mono); font-size: 10px; text-transform: uppercase; letter-spacing: .08em; }
.stl-canvas-readout span { color: #9EA7BC; }
.stl-canvas-readout strong { color: #7DF2D1; font-weight: 500; }
.stl-orbit-label { position: absolute; color: #9EA7BC; font-family: var(--font-stl-mono); font-size: 10px; letter-spacing: .08em; text-transform: uppercase; }
.stl-orbit-label--a { top: 22%; left: -18px; transform: rotate(-90deg); }
.stl-orbit-label--b { right: -12px; top: 18%; writing-mode: vertical-rl; }
.stl-tagline { position: relative; max-width: 1160px; min-height: 420px; margin: 0 auto; padding: 120px 40px; display: flex; align-items: center; }
.stl-tagline__text { max-width: 760px; margin: 0; font-size: clamp(2.25rem, 5vw, 4.5rem); line-height: 1.04; letter-spacing: -.06em; text-wrap: balance; }
.stl-tagline__text span { color: color-mix(in srgb, #F7F8FC 30%, transparent); transition: color 650ms var(--ease-stl); }
.stl-tagline__text span[data-in="true"] { color: #F7F8FC; }
.stl-tagline-index { position: absolute; right: 40px; top: 50%; color: #9EA7BC; font-family: var(--font-stl-mono); font-size: 11px; transform: rotate(90deg); }
.stl-journey { position: relative; min-height: 400svh; margin-top: 40px; background: #090B12; }
.stl-journey-canvas { position: sticky; z-index: 0; top: 0; width: 100%; height: 100svh; overflow: hidden; pointer-events: none; }
.stl-canvas--journey { width: 100%; height: 100svh; }
.stl-journey-overlay { position: absolute; left: 40px; bottom: 32px; display: grid; gap: 5px; padding: 12px 14px; border: 1px solid #2A3245; border-radius: 8px; background: color-mix(in srgb, #090B12 70%, transparent); font-family: var(--font-stl-mono); text-transform: uppercase; letter-spacing: .08em; }
.stl-journey-overlay span { color: #9EA7BC; font-size: 10px; }.stl-journey-overlay strong { color: #F7F8FC; font-size: 12px; font-weight: 500; }.stl-journey-overlay small { color: #7DF2D1; font-size: 9px; }
.stl-journey-crosshair { position: absolute; left: 50%; top: 50%; width: 22px; height: 22px; transform: translate(-50%, -50%); border: 1px solid color-mix(in srgb, #7DF2D1 45%, transparent); border-radius: 999px; }.stl-journey-crosshair::before, .stl-journey-crosshair::after { content: ""; position: absolute; background: color-mix(in srgb, #7DF2D1 55%, transparent); }.stl-journey-crosshair::before { top: 10px; left: -10px; width: 40px; height: 1px; }.stl-journey-crosshair::after { left: 10px; top: -10px; width: 1px; height: 40px; }
.stl-journey-content { position: relative; z-index: 1; margin-top: -100svh; }
.stl-journey-chapter { position: relative; min-height: 100svh; max-width: 1160px; margin: 0 auto; padding: 140px 40px 100px; display: flex; align-items: center; pointer-events: none; }.stl-journey-chapter-copy { max-width: 460px; padding: 24px 28px; border: 1px solid color-mix(in srgb, #2A3245 85%, transparent); border-radius: 12px; background: color-mix(in srgb, #090B12 78%, transparent); pointer-events: auto; }.stl-journey-chapter h2 { margin: 18px 0; font-size: clamp(2.5rem, 5.5vw, 5rem); line-height: .97; letter-spacing: -.08em; text-wrap: balance; }.stl-journey-chapter p { max-width: 38ch; margin: 0; color: #9EA7BC; font-size: 16px; text-wrap: pretty; }.stl-journey-chapter-index { position: absolute; right: 40px; top: 50%; color: color-mix(in srgb, #9EA7BC 55%, transparent); font-family: var(--font-stl-mono); font-size: 11px; letter-spacing: .08em; transform: rotate(90deg); }
.stl-chapter-rail { position: fixed; z-index: 8; top: 50%; right: 24px; display: grid; gap: 10px; transform: translateY(-50%); }.stl-chapter-rail a { display: grid; grid-template-columns: 28px 28px auto; align-items: center; gap: 8px; color: #9EA7BC; font-family: var(--font-stl-mono); font-size: 9px; letter-spacing: .08em; text-decoration: none; text-transform: uppercase; }.stl-chapter-rail a i { display: block; width: 28px; height: 1px; background: #2A3245; transition: width 500ms var(--ease-stl), background 300ms var(--ease-stl); }.stl-chapter-rail a:hover { color: #F7F8FC; }.stl-chapter-rail a:hover i { width: 42px; background: #7DF2D1; }.stl-chapter-rail a em { font-style: normal; }
.stl-alignment-control { display: grid; gap: 12px; margin-top: 32px; padding-top: 20px; border-top: 1px solid #2A3245; }.stl-alignment-control > div:first-child { display: flex; align-items: center; justify-content: space-between; }.stl-alignment-control output { color: #7DF2D1; font-family: var(--font-stl-mono); font-size: 11px; }.stl-alignment-control input { width: 100%; accent-color: #7DF2D1; }.stl-range-labels { display: flex; justify-content: space-between; color: #9EA7BC; font-family: var(--font-stl-mono); font-size: 9px; text-transform: uppercase; }
.stl-section { max-width: 1160px; margin: 0 auto; padding: 120px 40px; }
.stl-section-intro { max-width: 640px; }
.stl-section h2, .stl-demo h2 { margin: 20px 0 20px; font-size: clamp(2.25rem, 5vw, 4.5rem); line-height: 1.02; letter-spacing: -.07em; text-wrap: balance; }
.stl-section-intro > p, .stl-demo-copy > p { max-width: 540px; margin: 0; color: #9EA7BC; font-size: 17px; text-wrap: pretty; }
.stl-benefits { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 80px; }
.stl-benefit { min-height: 270px; padding: 24px; border: 1px solid #2A3245; border-radius: 12px; background: #111522; transition: transform 500ms var(--ease-stl), border-color 300ms var(--ease-stl), background 300ms var(--ease-stl); }
.stl-benefit:hover { transform: translateY(-8px); border-color: #7DF2D1; background: color-mix(in srgb, #111522 75%, #7DF2D1); }
.stl-benefit-icon { display: grid; width: 44px; height: 44px; place-items: center; border: 1px solid #2A3245; border-radius: 8px; color: #7DF2D1; }
.stl-benefit-number { display: block; margin-top: 40px; color: #9EA7BC; font-family: var(--font-stl-mono); font-size: 11px; }
.stl-benefit h3, .stl-process-card h3 { margin: 8px 0 8px; font-size: 20px; letter-spacing: -.04em; }
.stl-benefit p, .stl-process-card p { margin: 0; color: #9EA7BC; font-size: 14px; line-height: 1.65; text-wrap: pretty; }
.stl-process-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-top: 64px; }
.stl-process-card { min-height: 320px; padding: 24px; border: 1px solid #2A3245; border-radius: 12px; background: #111522; }
.stl-process-card--accent { background: #7DF2D1; color: #090B12; border-color: #7DF2D1; }
.stl-process-card--accent p { color: color-mix(in srgb, #090B12 35%, #7DF2D1); }
.stl-process-card-top { display: flex; align-items: center; justify-content: space-between; color: #7DF2D1; }
.stl-process-card--accent .stl-process-card-top { color: #090B12; }
.stl-process-index { font-family: var(--font-stl-mono); font-size: 11px; }
.stl-code-line { display: flex; justify-content: space-between; margin-top: 64px; padding-top: 12px; border-top: 1px solid #2A3245; color: #9EA7BC; font-family: var(--font-stl-mono); font-size: 10px; text-transform: uppercase; }
.stl-process-card--accent .stl-code-line { border-color: color-mix(in srgb, #090B12 25%, transparent); color: color-mix(in srgb, #090B12 35%, #7DF2D1); }
.stl-code-line b { color: #7DF2D1; font-weight: 500; }.stl-process-card--accent .stl-code-line b { color: #090B12; }
.stl-stats { max-width: 1160px; margin: 40px auto 80px; padding: 32px 40px; border-top: 1px solid #2A3245; border-bottom: 1px solid #2A3245; display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.stl-stats div { display: grid; gap: 6px; }.stl-stats strong { font-size: 36px; line-height: 1; letter-spacing: -.06em; color: #7DF2D1; }.stl-stats span { color: #9EA7BC; font-family: var(--font-stl-mono); font-size: 10px; text-transform: uppercase; letter-spacing: .08em; }
.stl-section--faq { display: grid; grid-template-columns: .8fr 1.2fr; gap: 80px; }
.stl-faq-list { border-top: 1px solid #2A3245; }.stl-faq { border-bottom: 1px solid #2A3245; }.stl-faq summary { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 20px 0; cursor: pointer; list-style: none; font-size: 18px; }.stl-faq summary::-webkit-details-marker { display: none; }.stl-faq-plus { color: #7DF2D1; font-size: 24px; font-weight: 300; transition: transform 500ms var(--ease-stl); }.stl-faq[open] .stl-faq-plus { transform: rotate(45deg); }.stl-faq p { max-width: 600px; margin: -4px 40px 22px 0; color: #9EA7BC; font-size: 14px; text-wrap: pretty; }
.stl-demo { margin-top: 80px; padding: 120px 40px; background: #111522; border-top: 1px solid #2A3245; }.stl-demo-grid { max-width: 1160px; margin: 0 auto; display: grid; grid-template-columns: .9fr 1.1fr; gap: 80px; align-items: center; }.stl-demo-copy h2 { margin-bottom: 24px; }.stl-demo-checks { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 32px; color: #9EA7BC; font-family: var(--font-stl-mono); font-size: 10px; text-transform: uppercase; }
.stl-form, .stl-form-success { padding: 28px; border: 1px solid #2A3245; border-radius: 12px; background: #090B12; }.stl-form label { display: block; margin-bottom: 10px; color: #9EA7BC; font-family: var(--font-stl-mono); font-size: 11px; text-transform: uppercase; letter-spacing: .08em; }.stl-form-row { display: flex; gap: 10px; }.stl-form input { min-width: 0; flex: 1; padding: 12px 14px; border: 1px solid #2A3245; border-radius: 8px; background: #111522; color: #F7F8FC; font: inherit; }.stl-form input::placeholder { color: color-mix(in srgb, #9EA7BC 65%, #090B12); }.stl-form-error { margin: 12px 0 0; color: #FF9275; font-size: 13px; }.stl-form-note { margin: 18px 0 0; color: color-mix(in srgb, #9EA7BC 65%, #090B12); font-size: 12px; }.stl-form-success h3 { margin: 18px 0 10px; font-size: 28px; letter-spacing: -.05em; }.stl-form-success p { margin: 0; color: #9EA7BC; }
.stl-footer { max-width: 1160px; margin: 0 auto; padding: 24px 40px 48px; display: flex; align-items: center; gap: 20px; color: #9EA7BC; font-family: var(--font-stl-mono); font-size: 10px; text-transform: uppercase; letter-spacing: .08em; }.stl-footer > div { display: flex; gap: 20px; margin-left: auto; }.stl-footer-nav { flex-wrap: wrap; justify-content: flex-end; }.stl-logo--compact .stl-logo__mark { width: 24px; height: 24px; }
.stl-reveal { opacity: 1; transform: none; }.stl-tagline__text [data-word] { display: inline; }
@media (prefers-reduced-motion: no-preference) { .stl-reveal { opacity: 0; transform: translateY(32px); transition: opacity var(--dur-stl) var(--ease-stl), transform var(--dur-stl) var(--ease-stl); transition-delay: var(--stl-delay, 0ms); }.stl-reveal[data-in="true"] { opacity: 1; transform: none; } }
@media (max-width: 900px) { .stl-header { top: 10px; }.stl-nav { display: none; }.stl-hero { grid-template-columns: 1fr; padding: 132px 24px 64px; gap: 48px; }.stl-canvas-wrap, .stl-canvas { min-height: 420px; height: 420px; }.stl-orbit-label { display: none; }.stl-tagline, .stl-section { padding: 96px 24px; }.stl-tagline-index { right: 24px; }.stl-benefits, .stl-process-grid { grid-template-columns: 1fr; margin-top: 48px; }.stl-benefit, .stl-process-card { min-height: 0; }.stl-stats { margin: 20px 24px 64px; padding: 24px 0; grid-template-columns: repeat(2, 1fr); }.stl-section--faq, .stl-demo-grid { grid-template-columns: 1fr; gap: 48px; }.stl-demo { padding: 96px 24px; }.stl-form-row { flex-direction: column; }.stl-footer { padding: 24px; flex-wrap: wrap; }.stl-footer > div { width: 100%; margin-left: 0; justify-content: space-between; }.stl-journey { min-height: 400svh; }.stl-journey-chapter { padding: 120px 24px 88px; align-items: flex-end; }.stl-journey-chapter-copy { max-width: 100%; }.stl-journey-chapter-index { right: 24px; top: 14%; }.stl-chapter-rail { right: 12px; }.stl-chapter-rail a { grid-template-columns: 22px 20px; }.stl-chapter-rail a em { display: none; }.stl-journey-overlay { left: 24px; bottom: 24px; } }
@media (max-width: 480px) { .stl-header { width: calc(100% - 20px); }.stl-logo__word { font-size: 13px; }.stl-header-cta { padding: 7px 9px; font-size: 12px; }.stl-hero h1 { font-size: 3rem; }.stl-hero-lead { font-size: 16px; }.stl-hero-actions { align-items: flex-start; flex-direction: column; }.stl-canvas-wrap, .stl-canvas { min-height: 340px; height: 340px; }.stl-tagline__text { font-size: 2.25rem; }.stl-faq summary { font-size: 16px; }.stl-faq p { margin-right: 0; } }
]]>
    </file>
    <file path="src/app/(starlight)/starlight/brand/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#090B12"/>
  <circle cx="16" cy="16" r="6.5" fill="#F7F8FC"/>
  <circle cx="16" cy="16" r="12" fill="none" stroke="#F7F8FC" stroke-opacity=".5"/>
  <circle cx="26" cy="9" r="2" fill="#7DF2D1"/>
</svg>
]]>
    </file>
    <file path="src/app/(starlight)/starlight/brand/Logo.tsx">
<![CDATA[export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`stl-logo${compact ? " stl-logo--compact" : ""}`} aria-label="Starlight Lab">
      <svg className="stl-logo__mark" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="6.5" fill="currentColor" />
        <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <path d="M4 16h24M16 4v24" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <circle cx="26" cy="9" r="2" fill="#7DF2D1" />
      </svg>
      {!compact && <span className="stl-logo__word">starlight lab</span>}
    </span>
  );
}
]]>
    </file>
    <file path="src/app/(starlight)/starlight/forms/DemoForm.tsx">
<![CDATA["use client";

import { FormEvent, useState } from "react";

export function DemoForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    if (!/^\S+@\S+\.\S+$/.test(email)) { setError("Enter a valid email to receive the starter scene."); return; }
    setError(""); setSent(true);
  }
  if (sent) return <div className="stl-form-success" aria-live="polite"><span className="stl-kicker">Scene unlocked</span><h3>Your WebGL starter is ready.</h3><p>Open your editor and begin with the same 2.4 KB shader core used above.</p></div>;
  return <form className="stl-form" onSubmit={submit} noValidate>
    <label htmlFor="stl-email">Work email</label>
    <div className="stl-form-row"><input id="stl-email" name="email" type="email" placeholder="you@studio.com" required aria-describedby={error ? "stl-email-error" : undefined} /><button className="stl-button stl-button--solid" type="submit">Get the starter <span aria-hidden="true">↗</span></button></div>
    {error && <p id="stl-email-error" className="stl-form-error" role="alert">{error}</p>}
    <p className="stl-form-note">No account, install or mailing list. The file stays in your browser.</p>
  </form>;
}
]]>
    </file>
    <file path="src/app/(starlight)/starlight/motion/Reveal.tsx">
<![CDATA["use client";

import { useEffect, useRef } from "react";

export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.dataset.in = "true";
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`stl-reveal ${className}`} style={{ "--stl-delay": `${delay}ms` } as React.CSSProperties} data-reveal>{children}</div>;
}

export function TaglineReveal({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const words = Array.from(element.querySelectorAll<HTMLElement>("[data-word]"));
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      words.forEach((word, index) => {
        window.setTimeout(() => { word.dataset.in = "true"; }, index * 70);
      });
      observer.disconnect();
    }, { threshold: 0.35 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <p ref={ref} className="stl-tagline__text">{text.split(" ").map((word, index) => <span data-word key={`${word}-${index}`}>{word}{index < text.split(" ").length - 1 ? " " : ""}</span>)}</p>;
}
]]>
    </file>
    <file path="src/app/(starlight)/starlight/space/AlignmentControl.tsx">
<![CDATA["use client";

import { useState } from "react";

export function AlignmentControl() {
  const [value, setValue] = useState(50);
  const update = (next: number) => { setValue(next); window.dispatchEvent(new CustomEvent("stl:alignment", { detail: next })); };
  return <div className="stl-alignment-control"><div><span className="stl-kicker">Lunar offset</span><output>{value.toString().padStart(3, "0")} / 100</output></div><input aria-label="Lunar offset" type="range" min="0" max="100" value={value} onChange={(event) => update(Number(event.target.value))} /><div className="stl-range-labels"><span>first contact</span><span>totality</span><span>afterglow</span></div></div>;
}
]]>
    </file>
    <file path="src/app/(starlight)/starlight/space/JourneyCanvas.tsx">
<![CDATA["use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { createAtmosphereMaterial, createPlanetMaps, disposePlanetMaps } from "./planetSurface";

type Chapter = { id: string; label: string };

const CHAPTERS: Chapter[] = [
  { id: "stl-chapter-0", label: "Eclipse" },
  { id: "stl-chapter-1", label: "Aperture" },
  { id: "stl-chapter-2", label: "Passage" },
  { id: "stl-chapter-3", label: "Alignment" },
];

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number, start: number, end: number) => {
  const t = clamp01((value - start) / Math.max(0.0001, end - start));
  return t * t * (3 - 2 * t);
};

function collectMaterials(root: THREE.Object3D) {
  const materials: THREE.Material[] = [];
  root.traverse((child) => {
    const object = child as THREE.Mesh | THREE.Sprite | THREE.Points;
    if (!("material" in object) || !object.material) return;
    const value = object.material;
    if (Array.isArray(value)) materials.push(...value);
    else materials.push(value);
  });
  return [...new Set(materials)];
}

function setOpacity(materials: THREE.Material[], value: number) {
  const opacity = clamp01(value);
  materials.forEach((material) => {
    material.transparent = opacity < 0.995;
    material.opacity = opacity;
    material.depthWrite = opacity > 0.98;
  });
}

function makeStarField() {
  const count = 1200;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const angle = i * 2.39996;
    const radius = 7 + Math.sqrt(((i * 73) % 997) / 997) * 34;
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = Math.sin(angle) * radius;
    positions[i * 3 + 2] = 7 - ((i * 137) % 900) / 10;
    const warm = i % 11 === 0;
    colors.set(warm ? [1, 0.58, 0.33] : [0.55, 0.72, 0.95], i * 3);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const material = new THREE.PointsMaterial({
    size: 0.055,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
    sizeAttenuation: true,
  });
  return new THREE.Points(geometry, material);
}

function makeIrisBlade() {
  const shape = new THREE.Shape();
  const polar = (radius: number, angle: number) => [radius * Math.cos(angle), radius * Math.sin(angle)] as const;
  shape.moveTo(...polar(2.48, -0.14));
  shape.absarc(0, 0, 2.48, -0.14, 0.84, false);
  shape.quadraticCurveTo(...polar(1.68, 1.0), ...polar(0.76, 0.84));
  shape.absarc(0, 0, 0.76, 0.84, 0.16, true);
  shape.quadraticCurveTo(...polar(1.6, -0.1), ...polar(2.48, -0.14));
  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.045,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.01,
    bevelThickness: 0.008,
    curveSegments: 40,
  });
}

export function JourneyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const alignmentRef = useRef(50);
  const pointerRef = useRef({ x: 0, y: 0 });
  const chapterRef = useRef(0);
  const [chapter, setChapter] = useState(0);
  const [status, setStatus] = useState("booting scene");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090b12);
    scene.fog = new THREE.FogExp2(0x090b12, 0.018);
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0.5, 13);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const environment = new RoomEnvironment();
    const envTarget = pmrem.fromScene(environment, 0.04);
    scene.environment = envTarget.texture;
    scene.environmentIntensity = 0.58;
    environment.dispose();
    pmrem.dispose();

    scene.add(new THREE.HemisphereLight(0x9ea7bc, 0x090b12, 0.32));
    const key = new THREE.DirectionalLight(0xffd1ae, 3.6);
    key.position.set(6, 5, 9);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x7df2d1, 1.6);
    rim.position.set(-8, 2, -4);
    scene.add(rim);
    const sunLight = new THREE.PointLight(0xff9275, 24, 16, 2);
    sunLight.position.set(0, 0, 3);
    scene.add(sunLight);

    const maps = createPlanetMaps();
    const darkMetal = new THREE.MeshPhysicalMaterial({ color: 0x2a3245, metalness: 0.92, roughness: 0.24, clearcoat: 0.24, clearcoatRoughness: 0.18 });
    const warmMetal = new THREE.MeshPhysicalMaterial({ color: 0xc9875e, metalness: 0.88, roughness: 0.23, clearcoat: 0.4, clearcoatRoughness: 0.16 });
    const paleMetal = new THREE.MeshPhysicalMaterial({ color: 0xd7d8d0, metalness: 0.84, roughness: 0.18, clearcoat: 0.34, clearcoatRoughness: 0.12 });
    const moonMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, map: maps.color, bumpMap: maps.bump, bumpScale: 0.22, roughnessMap: maps.roughness, roughness: 0.78, metalness: 0.02 });
    const glassMaterial = new THREE.MeshPhysicalMaterial({ color: 0xc8f9ed, metalness: 0.04, roughness: 0.035, transmission: 0.92, thickness: 0.22, ior: 1.45, transparent: true, opacity: 0.8, depthWrite: false });
    const sunMaterial = new THREE.MeshStandardMaterial({ color: 0xff9275, emissive: 0xff6b42, emissiveIntensity: 3.5, roughness: 0.25, metalness: 0.05 });
    const moonletMaterial = new THREE.MeshPhysicalMaterial({ color: 0xdbeaf1, roughness: 0.12, metalness: 0.2, clearcoat: 0.8, clearcoatRoughness: 0.05 });

    const assembly = new THREE.Group();
    scene.add(assembly);
    const moonGeometry = new THREE.SphereGeometry(2.18, 96, 64);
    const positions = moonGeometry.attributes.position;
    const craters = Array.from({ length: 28 }, (_, i) => new THREE.Vector3(Math.sin(i * 27.3), Math.cos(i * 9.2), Math.sin(i * 15.7)).normalize());
    const point = new THREE.Vector3();
    for (let i = 0; i < positions.count; i += 1) {
      point.fromBufferAttribute(positions, i).normalize();
      let dent = 0;
      craters.forEach((crater, craterIndex) => {
        const distance = point.distanceTo(crater);
        const size = 0.04 + (craterIndex % 5) * 0.022;
        dent += -Math.exp(-Math.pow(distance / size, 4)) * 0.024 + Math.exp(-Math.pow((distance - size) / (size * 0.24), 2)) * 0.006;
      });
      const radius = 2.18 + dent;
      positions.setXYZ(i, point.x * radius, point.y * radius, point.z * radius);
    }
    moonGeometry.computeVertexNormals();
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.castShadow = true;
    moon.receiveShadow = true;
    assembly.add(moon);
    const clouds = new THREE.Mesh(new THREE.SphereGeometry(2.215, 64, 48), new THREE.MeshStandardMaterial({ color: 0xffffff, alphaMap: maps.clouds, transparent: true, opacity: 0.62, depthWrite: false, roughness: 0.94 }));
    assembly.add(clouds);
    const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(2.28, 64, 48), createAtmosphereMaterial());
    assembly.add(atmosphere);

    const rings: THREE.Group[] = [];
    const ringGeometry = new THREE.TorusGeometry(2.72, 0.065, 24, 192);
    const fineRingGeometry = new THREE.TorusGeometry(2.84, 0.018, 12, 192);
    for (let i = 0; i < 3; i += 1) {
      const ring = new THREE.Group();
      ring.add(new THREE.Mesh(ringGeometry, i === 1 ? paleMetal : warmMetal));
      ring.add(new THREE.Mesh(fineRingGeometry, darkMetal));
      for (let tick = 0; tick < 48; tick += 1) {
        const marker = new THREE.Mesh(new THREE.BoxGeometry(0.015, tick % 6 === 0 ? 0.14 : 0.07, 0.018), paleMetal);
        const angle = (tick / 48) * Math.PI * 2;
        marker.position.set(Math.cos(angle) * 2.84, Math.sin(angle) * 2.84, 0);
        marker.rotation.z = angle - Math.PI / 2;
        ring.add(marker);
      }
      assembly.add(ring);
      rings.push(ring);
    }
    const lens = new THREE.Mesh(new THREE.SphereGeometry(2.57, 96, 48), glassMaterial);
    lens.scale.z = 0.04;
    lens.position.z = 0.08;
    rings[0].add(lens);

    const iris = new THREE.Group();
    const plate = new THREE.Mesh(new THREE.RingGeometry(2.22, 2.68, 160), darkMetal);
    plate.position.z = 0.12;
    iris.add(plate);
    const bladeGeometry = makeIrisBlade();
    for (let i = 0; i < 9; i += 1) {
      const blade = new THREE.Mesh(bladeGeometry, i % 3 === 0 ? darkMetal : warmMetal);
      blade.rotation.z = (i * Math.PI * 2) / 9;
      blade.position.z = 0.16 + i * 0.008;
      iris.add(blade);
      const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.05, 20), paleMetal);
      screw.rotation.x = Math.PI / 2;
      const angle = (i * Math.PI * 2) / 9;
      screw.position.set(Math.cos(angle) * 2.52, Math.sin(angle) * 2.52, 0.25);
      iris.add(screw);
    }
    assembly.add(iris);

    const passage = new THREE.Group();
    scene.add(passage);
    for (let i = 0; i < 8; i += 1) {
      const gate = new THREE.Group();
      gate.position.z = -7 - i * 5.2;
      gate.add(new THREE.Mesh(new THREE.TorusGeometry(4.0, 0.052, 18, 192), darkMetal));
      gate.add(new THREE.Mesh(new THREE.TorusGeometry(4.12, 0.016, 12, 192), i % 2 === 0 ? warmMetal : paleMetal));
      const spokes = new THREE.InstancedMesh(new THREE.BoxGeometry(0.03, 0.2, 0.05), warmMetal, 24);
      const dummy = new THREE.Object3D();
      for (let n = 0; n < 24; n += 1) {
        const angle = (n / 24) * Math.PI * 2;
        dummy.position.set(Math.cos(angle) * 4.05, Math.sin(angle) * 4.05, 0);
        dummy.rotation.z = angle - Math.PI / 2;
        dummy.updateMatrix();
        spokes.setMatrixAt(n, dummy.matrix);
      }
      gate.add(spokes);
      passage.add(gate);
    }

    const alignment = new THREE.Group();
    alignment.position.z = -14;
    scene.add(alignment);
    const sun = new THREE.Mesh(new THREE.SphereGeometry(1.22, 72, 48), sunMaterial);
    alignment.add(sun);
    const finalMoon = new THREE.Mesh(new THREE.SphereGeometry(0.38, 48, 32), moonletMaterial);
    finalMoon.position.z = 0.8;
    alignment.add(finalMoon);
    const orbit = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.018, 12, 192), paleMetal);
    orbit.rotation.x = Math.PI / 2;
    alignment.add(orbit);
    const alignmentStars = makeStarField();
    alignmentStars.position.z = 0.5;
    alignment.add(alignmentStars);
    const stars = makeStarField();
    scene.add(stars);

    const instrumentMaterials = collectMaterials(assembly);
    const irisMaterials = collectMaterials(iris);
    const passageMaterials = collectMaterials(passage);
    const alignmentMaterials = collectMaterials(alignment);
    setOpacity(irisMaterials, 0);
    setOpacity(passageMaterials, 0);
    setOpacity(alignmentMaterials, 0);

    const cameraPositions = [new THREE.Vector3(0, 0.55, 13), new THREE.Vector3(5.6, 2.1, 10.5), new THREE.Vector3(0.4, 0.1, -9), new THREE.Vector3(0, 0.25, -13.5)];
    const cameraTargets = [new THREE.Vector3(0.2, 0, 0), new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -8), new THREE.Vector3(0, 0, -14)];
    const desiredCamera = new THREE.Vector3();
    const desiredTarget = new THREE.Vector3();
    let currentProgress = 0;
    let raf = 0;
    let scrollFrame = 0;
    let disposed = false;
    let reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => { reduced = media.matches; };
    media.addEventListener("change", onMotion);
    const onPointer = (event: PointerEvent) => { const rect = canvas.getBoundingClientRect(); pointerRef.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2; pointerRef.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2; };
    canvas.addEventListener("pointermove", onPointer);

    const updateProgress = () => {
      scrollFrame = 0;
      const nodes = CHAPTERS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
      if (!nodes.length) return;
      const firstTop = nodes[0].getBoundingClientRect().top + window.scrollY;
      const secondTop = nodes[1]?.getBoundingClientRect().top + window.scrollY;
      const span = Math.max(window.innerHeight, (secondTop ?? firstTop + window.innerHeight) - firstTop);
      const value = Math.max(0, Math.min(3, (window.scrollY - firstTop) / span));
      const nextChapter = Math.min(3, Math.floor(value + 0.001));
      progressRef.current = value;
      if (nextChapter !== chapterRef.current) { chapterRef.current = nextChapter; setChapter(nextChapter); }
    };
    const queue = () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateProgress); };
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    queue();

    const onAlignment = (event: Event) => { const value = Number((event as CustomEvent<number>).detail); if (Number.isFinite(value)) alignmentRef.current = value; };
    window.addEventListener("stl:alignment", onAlignment);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.7);
      renderer.setPixelRatio(dpr);
      renderer.setSize(Math.max(1, canvas.clientWidth), Math.max(1, canvas.clientHeight), false);
      camera.aspect = Math.max(1, canvas.clientWidth) / Math.max(1, canvas.clientHeight);
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);
    resize();
    setStatus("three webgl online");

    const render = (now: number) => {
      if (disposed) return;
      const delta = Math.min(0.04, 1 / 60);
      const targetProgress = progressRef.current;
      currentProgress += (targetProgress - currentProgress) * (1 - Math.exp(-8 * delta));
      const p = currentProgress;
      const stage = Math.min(2, Math.floor(p));
      const local = p - stage;
      const cameraMix = smooth(local, 0.04, 0.96);
      desiredCamera.copy(cameraPositions[stage]).lerp(cameraPositions[stage + 1], cameraMix);
      desiredTarget.copy(cameraTargets[stage]).lerp(cameraTargets[stage + 1], cameraMix);
      camera.position.lerp(desiredCamera, 0.12);
      camera.position.x += pointerRef.current.x * 0.18;
      camera.position.y += -pointerRef.current.y * 0.12;
      camera.lookAt(desiredTarget);

      const unfold = smooth(p, 0.08, 0.9);
      const irisPresence = smooth(p, 0.62, 1.15) * (1 - smooth(p, 1.22, 1.72));
      const passagePresence = smooth(p, 1.05, 1.65) * (1 - smooth(p, 2.38, 2.88));
      const alignmentPresence = smooth(p, 1.82, 2.58);
      assembly.position.x = THREE.MathUtils.lerp(0.75, 0, unfold);
      assembly.rotation.y = -unfold * 0.42 + pointerRef.current.x * 0.06;
      assembly.rotation.x = unfold * 0.22;
      assembly.scale.setScalar(THREE.MathUtils.lerp(0.88, 1, unfold));
      moon.scale.setScalar(Math.max(0.001, 1 - smooth(p, 0.08, 0.6) * 0.86));
      atmosphere.scale.copy(moon.scale);
      rings.forEach((ring, index) => {
        ring.position.z = (index - 1) * (0.14 + unfold * 2.8);
        ring.rotation.x = (1 - unfold) * (0.68 + index * 0.34);
        ring.rotation.y = (1 - unfold) * (0.2 + index * 0.26);
        ring.rotation.z = (reduced ? 0 : now * 0.000012) * (index % 2 ? -1 : 1);
      });
      setOpacity(instrumentMaterials, 1 - smooth(p, 1.08, 1.58));
      setOpacity(irisMaterials, irisPresence);
      setOpacity(passageMaterials, passagePresence);
      passage.rotation.z = reduced ? 0 : now * 0.000018;
      passage.position.z = -p * 0.65;
      setOpacity(alignmentMaterials, alignmentPresence);
      alignment.scale.setScalar(THREE.MathUtils.lerp(1, 0.82, smooth(p, 2.45, 3)));
      alignment.rotation.z = smooth(p, 2.3, 3) * 0.06;
      const offset = (alignmentRef.current - 50) / 50;
      finalMoon.position.x = offset * 1.95;
      finalMoon.position.y = Math.abs(offset) * 0.14;
      sunLight.position.set(camera.position.x + 2.5, camera.position.y + 1.8, camera.position.z - 2.8);
      stars.rotation.z = reduced ? 0 : now * 0.000012;
      clouds.rotation.y = reduced ? 0.18 : now * 0.000018;
      alignmentStars.rotation.z = offset * 0.25;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", queue);
      window.removeEventListener("stl:alignment", onAlignment);
      media.removeEventListener("change", onMotion);
      canvas.removeEventListener("pointermove", onPointer);
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          materials.forEach((material) => material.dispose());
        }
      });
      renderer.dispose();
      envTarget.dispose();
      disposePlanetMaps(maps);
    };
  }, []);

  return <div className="stl-journey-canvas" aria-label="Scroll driven Three.js WebGL model journey"><canvas ref={canvasRef} className="stl-canvas stl-canvas--journey" aria-label="A realistic WebGL instrument morphing through eclipse, aperture, passage and alignment" /><div className="stl-journey-overlay"><span>chapter 0{chapter + 1} / {CHAPTERS.length}</span><strong>{CHAPTERS[chapter].label}</strong><small>{status}</small></div><div className="stl-journey-crosshair" aria-hidden="true" /></div>;
}

export function JourneyChapter({ index, eyebrow, title, body, children }: { index: number; eyebrow: string; title: React.ReactNode; body: string; children?: React.ReactNode }) {
  return <section id={CHAPTERS[index].id} data-scene-chapter className="stl-journey-chapter" aria-labelledby={`${CHAPTERS[index].id}-title`}><div className="stl-journey-chapter-copy"><span className="stl-kicker">{eyebrow}</span><h2 id={`${CHAPTERS[index].id}-title`}>{title}</h2><p>{body}</p>{children}</div><span className="stl-journey-chapter-index">0{index + 1}</span></section>;
}

export function ChapterRail() {
  return <nav className="stl-chapter-rail" aria-label="Model chapters">{CHAPTERS.map((chapter, index) => <a key={chapter.id} href={`#${chapter.id}`}><span>0{index + 1}</span><i /><em>{chapter.label}</em></a>)}</nav>;
}
]]>
    </file>
    <file path="src/app/(starlight)/starlight/space/planetSurface.ts">
<![CDATA[import * as THREE from "three";

type PlanetMaps = {
  color: THREE.CanvasTexture;
  bump: THREE.CanvasTexture;
  roughness: THREE.CanvasTexture;
  clouds: THREE.CanvasTexture;
};

const fract = (value: number) => value - Math.floor(value);
const hash = (x: number, y: number) => fract(Math.sin(x * 127.1 + y * 311.7) * 43758.5453);
const smooth = (value: number) => value * value * (3 - 2 * value);
const noise = (x: number, y: number) => {
  const ix = Math.floor(x); const iy = Math.floor(y);
  const fx = smooth(fract(x)); const fy = smooth(fract(y));
  const a = hash(ix, iy); const b = hash(ix + 1, iy); const c = hash(ix, iy + 1); const d = hash(ix + 1, iy + 1);
  return (a + (b - a) * fx) + ((c + (d - c) * fx) - (a + (b - a) * fx)) * fy;
};
const fbm = (x: number, y: number) => {
  let value = 0; let amplitude = 0.5; let frequency = 1;
  for (let octave = 0; octave < 5; octave += 1) { value += noise(x * frequency, y * frequency) * amplitude; frequency *= 2.04; amplitude *= 0.5; }
  return value;
};

function setupTexture(texture: THREE.CanvasTexture, colorSpace = false) {
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.anisotropy = 8;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  if (colorSpace) texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createPlanetMaps(size = 384): PlanetMaps {
  const colorCanvas = document.createElement("canvas");
  const bumpCanvas = document.createElement("canvas");
  const roughnessCanvas = document.createElement("canvas");
  const cloudsCanvas = document.createElement("canvas");
  [colorCanvas, bumpCanvas, roughnessCanvas, cloudsCanvas].forEach((canvas) => { canvas.width = size; canvas.height = Math.floor(size / 2); });
  const width = colorCanvas.width; const height = colorCanvas.height;
  const colorContext = colorCanvas.getContext("2d"); const bumpContext = bumpCanvas.getContext("2d"); const roughnessContext = roughnessCanvas.getContext("2d"); const cloudsContext = cloudsCanvas.getContext("2d");
  if (!colorContext || !bumpContext || !roughnessContext || !cloudsContext) throw new Error("Planet texture canvas unavailable");
  const color = colorContext.createImageData(width, height); const bump = bumpContext.createImageData(width, height); const roughness = roughnessContext.createImageData(width, height); const clouds = cloudsContext.createImageData(width, height);
  for (let y = 0; y < height; y += 1) {
    const latitude = y / height;
    const polar = Math.abs(latitude - 0.5) * 2;
    for (let x = 0; x < width; x += 1) {
      const longitude = x / width;
      const continentField = fbm(longitude * 3.1 + 11, latitude * 5.0 + 4) + Math.sin(longitude * Math.PI * 4.0 + latitude * 2.3) * 0.08;
      const continent = smooth(Math.max(0, Math.min(1, (continentField - 0.43) * 4.3)));
      const terrain = fbm(longitude * 16.0 + 19, latitude * 18.0 + 5);
      const ridges = Math.pow(Math.max(0, Math.sin(longitude * 44 + terrain * 2.2)), 18) * continent;
      const heightValue = Math.max(0, Math.min(1, terrain * 0.48 + ridges * 0.22 + continent * 0.22 + (1 - polar) * 0.05));
      const moisture = fbm(longitude * 7.0 + 40, latitude * 9.0 + 2);
      const oceanDepth = Math.max(0, 1 - continent) * (0.45 + moisture * 0.4);
      let r = 16 + oceanDepth * 10; let g = 44 + oceanDepth * 26; let b = 60 + oceanDepth * 44;
      if (continent > 0.5) {
        const desert = Math.max(0, moisture - 0.58) * 2.4;
        r = 35 + terrain * 58 + desert * 55; g = 66 + terrain * 70 + desert * 36; b = 47 + terrain * 36 - desert * 18;
        const forest = Math.max(0, 0.58 - moisture) * 1.7; g += forest * 24; b += forest * 10;
      }
      const snow = Math.max(0, (polar - 0.64) * 4.4) + Math.max(0, terrain - 0.76) * 1.2;
      r = r + (235 - r) * Math.min(1, snow); g = g + (241 - g) * Math.min(1, snow); b = b + (238 - b) * Math.min(1, snow);
      const index = (y * width + x) * 4;
      color.data[index] = Math.max(0, Math.min(255, r)); color.data[index + 1] = Math.max(0, Math.min(255, g)); color.data[index + 2] = Math.max(0, Math.min(255, b)); color.data[index + 3] = 255;
      const bumpValue = Math.round(heightValue * 255);
      bump.data[index] = bumpValue; bump.data[index + 1] = bumpValue; bump.data[index + 2] = bumpValue; bump.data[index + 3] = 255;
      const roughValue = Math.round((continent > 0.5 ? 0.82 + terrain * 0.15 : 0.2 + oceanDepth * 0.18) * 255);
      roughness.data[index] = roughValue; roughness.data[index + 1] = roughValue; roughness.data[index + 2] = roughValue; roughness.data[index + 3] = 255;
      const cloudField = fbm(longitude * 5.2 + 80, latitude * 8.0 + 30) + Math.sin(longitude * 17 + latitude * 7) * 0.04;
      const cloudValue = Math.max(0, Math.min(255, (cloudField - 0.52) * 900));
      clouds.data[index] = 240; clouds.data[index + 1] = 245; clouds.data[index + 2] = 250; clouds.data[index + 3] = cloudValue;
    }
  }
  colorContext.putImageData(color, 0, 0); bumpContext.putImageData(bump, 0, 0); roughnessContext.putImageData(roughness, 0, 0); cloudsContext.putImageData(clouds, 0, 0);
  return { color: setupTexture(new THREE.CanvasTexture(colorCanvas), true), bump: setupTexture(new THREE.CanvasTexture(bumpCanvas)), roughness: setupTexture(new THREE.CanvasTexture(roughnessCanvas)), clouds: setupTexture(new THREE.CanvasTexture(cloudsCanvas)) };
}

export function createAtmosphereMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    uniforms: { uColor: { value: new THREE.Color(0x7df2d1) } },
    vertexShader: `varying vec3 vWorld; varying vec3 vNormal; void main(){ vec4 world=modelMatrix*vec4(position,1.); vWorld=world.xyz; vNormal=normalize(mat3(modelMatrix)*normal); gl_Position=projectionMatrix*viewMatrix*world; }`,
    fragmentShader: `precision highp float; uniform vec3 uColor; varying vec3 vWorld; varying vec3 vNormal; void main(){ vec3 viewDir=normalize(cameraPosition-vWorld); float rim=pow(1.0-max(dot(normalize(vNormal),viewDir),0.0),2.8); float glow=0.2+rim*0.8; gl_FragColor=vec4(uColor*glow,rim*0.62); }`,
  });
}

export function disposePlanetMaps(maps: PlanetMaps) {
  maps.color.dispose(); maps.bump.dispose(); maps.roughness.dispose(); maps.clouds.dispose();
}
]]>
    </file>
    <file path="src/app/(starlight)/starlight/space/SpaceCanvas.tsx">
<![CDATA["use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { createAtmosphereMaterial, createPlanetMaps, disposePlanetMaps } from "./planetSurface";

function makeCrateredMoon() {
  const geometry = new THREE.SphereGeometry(2.18, 64, 48);
  const positions = geometry.attributes.position;
  const craters = Array.from({ length: 24 }, (_, i) => new THREE.Vector3(Math.sin(i * 27.3), Math.cos(i * 9.2), Math.sin(i * 15.7)).normalize());
  const point = new THREE.Vector3();
  for (let i = 0; i < positions.count; i += 1) {
    point.fromBufferAttribute(positions, i).normalize();
    let dent = 0;
    craters.forEach((crater, craterIndex) => {
      const distance = point.distanceTo(crater);
      const size = 0.04 + (craterIndex % 5) * 0.022;
      dent += -Math.exp(-Math.pow(distance / size, 4)) * 0.024 + Math.exp(-Math.pow((distance - size) / (size * 0.24), 2)) * 0.006;
    });
    const radius = 2.18 + dent;
    positions.setXYZ(i, point.x * radius, point.y * radius, point.z * radius);
  }
  geometry.computeVertexNormals();
  return geometry;
}

export function SpaceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState("booting scene");
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090b12);
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
    camera.position.set(0, 0.35, 8.2);
    scene.add(new THREE.HemisphereLight(0x9ea7bc, 0x090b12, 0.42));
    const key = new THREE.DirectionalLight(0xffd1ae, 3.8);
    key.position.set(5, 4, 8);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x7df2d1, 1.5);
    rim.position.set(-6, 1, -3);
    scene.add(rim);

    const instrument = new THREE.Group();
    scene.add(instrument);
    const maps = createPlanetMaps();
    const moonMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, map: maps.color, bumpMap: maps.bump, bumpScale: 0.22, roughnessMap: maps.roughness, roughness: 0.78, metalness: 0.02 });
    const moon = new THREE.Mesh(makeCrateredMoon(), moonMaterial);
    moon.castShadow = true;
    instrument.add(moon);
    const clouds = new THREE.Mesh(new THREE.SphereGeometry(2.215, 64, 48), new THREE.MeshStandardMaterial({ color: 0xffffff, alphaMap: maps.clouds, transparent: true, opacity: 0.62, depthWrite: false, roughness: 0.94 }));
    instrument.add(clouds);
    const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(2.28, 64, 48), createAtmosphereMaterial());
    instrument.add(atmosphere);
    const warm = new THREE.MeshPhysicalMaterial({ color: 0xc9875e, metalness: 0.9, roughness: 0.22, clearcoat: 0.4, clearcoatRoughness: 0.15 });
    const pale = new THREE.MeshPhysicalMaterial({ color: 0xd7d8d0, metalness: 0.84, roughness: 0.18, clearcoat: 0.34, clearcoatRoughness: 0.12 });
    const dark = new THREE.MeshPhysicalMaterial({ color: 0x2a3245, metalness: 0.92, roughness: 0.24, clearcoat: 0.24, clearcoatRoughness: 0.18 });
    for (let i = 0; i < 3; i += 1) {
      const ring = new THREE.Group();
      ring.add(new THREE.Mesh(new THREE.TorusGeometry(2.72 + i * 0.02, i === 1 ? 0.07 : 0.045, 22, 192), i === 1 ? pale : warm));
      ring.add(new THREE.Mesh(new THREE.TorusGeometry(2.84 + i * 0.02, 0.014, 12, 192), dark));
      ring.rotation.x = 0.48 + i * 0.2;
      ring.rotation.y = 0.18 + i * 0.2;
      instrument.add(ring);
    }
    const starsGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(480 * 3);
    for (let i = 0; i < 480; i += 1) { const angle = i * 2.4; const radius = 5 + (i % 80) * 0.22; starPositions[i * 3] = Math.cos(angle) * radius; starPositions[i * 3 + 1] = Math.sin(angle) * radius; starPositions[i * 3 + 2] = -2 - (i % 90) * 0.08; }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    scene.add(new THREE.Points(starsGeometry, new THREE.PointsMaterial({ color: 0x9ea7bc, size: 0.045, transparent: true, opacity: 0.65, depthWrite: false })));

    let disposed = false;
    const pointer = { x: 0, y: 0 };
    const onPointer = (event: PointerEvent) => { const rect = canvas.getBoundingClientRect(); pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2; pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2; };
    canvas.addEventListener("pointermove", onPointer);
    const resize = () => { renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7)); renderer.setSize(Math.max(1, canvas.clientWidth), Math.max(1, canvas.clientHeight), false); camera.aspect = canvas.clientWidth / Math.max(1, canvas.clientHeight); camera.updateProjectionMatrix(); };
    window.addEventListener("resize", resize);
    resize();
    setStatus("three webgl online");
    const render = () => { if (disposed) return; instrument.rotation.y = pointer.x * 0.08; instrument.rotation.x = pointer.y * -0.05; instrument.position.x = pointer.x * 0.08; clouds.rotation.y = 0.18 + pointer.x * 0.02; renderer.render(scene, camera); };
    render();
    const onPointerRender = (event: PointerEvent) => { onPointer(event); render(); };
    canvas.removeEventListener("pointermove", onPointer);
    canvas.addEventListener("pointermove", onPointerRender);
    return () => { disposed = true; window.removeEventListener("resize", resize); canvas.removeEventListener("pointermove", onPointerRender); scene.traverse((object) => { const mesh = object as THREE.Mesh; if (mesh.geometry) mesh.geometry.dispose(); if (mesh.material) { const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]; materials.forEach((material) => material.dispose()); } }); disposePlanetMaps(maps); renderer.dispose(); };
  }, []);
  return <div className="stl-canvas-wrap"><canvas ref={canvasRef} className="stl-canvas" aria-label="Interactive realistic WebGL instrument preview" data-engine="three.js r186" /><div className="stl-canvas-grid" aria-hidden="true" /><div className="stl-canvas-readout"><span>scene 01</span><strong>{status}</strong></div></div>;
}
]]>
    </file>
  </files>
</template>
