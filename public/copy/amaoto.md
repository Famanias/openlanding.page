<template slug="amaoto" name="AMAOTO">
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
    <file path="src/app/(amaoto)/layout.tsx">
<![CDATA[import type { Metadata } from "next";
import { DM_Mono, Shippori_Mincho, Zen_Kaku_Gothic_New } from "next/font/google";
import "./amaoto/amaoto.css";

const display = Shippori_Mincho({ subsets: ["latin"], variable: "--font-shippori", weight: ["400", "500", "600", "700"], preload: false });
const body = Zen_Kaku_Gothic_New({ subsets: ["latin"], variable: "--font-zen", weight: ["400", "500", "700"], preload: false });
const mono = DM_Mono({ subsets: ["latin"], variable: "--font-dm-mono", weight: ["400", "500"], preload: false });

export const metadata: Metadata = {
  title: "AMAOTO — The sound of rain, kept dry.",
  description: "A wagasa atelier where paper, bamboo and rain become one quiet instrument.",
  icons: { icon: "/templates/amaoto/icon.svg" },
};

export default function AmaotoLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}><body className="am-body">{children}</body></html>;
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/amaoto.css">
<![CDATA[@import "tailwindcss";
@theme { --color-sumi:#1A1613; --color-paper:#F4ECDD; --color-sakura:#F2B8C6; --color-deep-sakura:#D9748F; --color-vermilion:#C8412B; --color-gold:#B8923A; --color-indigo:#2B3A55; --font-display:var(--font-shippori), serif; --font-body:var(--font-zen), sans-serif; --font-mono:var(--font-dm-mono), monospace; }
:root { --am-paper:#F4ECDD; --am-ink:#1A1613; --am-red:#C8412B; --am-indigo:#2B3A55; --am-gold:#B8923A; --am-sakura:#F2B8C6; --am-gutter:clamp(22px,5vw,82px); }
* { box-sizing:border-box; }
html { scroll-behavior:smooth; background:var(--am-paper); }
body.am-body { margin:0; background:var(--am-paper); color:var(--am-ink); font-family:var(--font-body); }
a { color:inherit; text-decoration:none; }
button, input { font:inherit; }
.am-page { overflow:hidden; position:relative; }
.am-header { position:fixed; top:0; left:0; right:0; z-index:20; display:flex; align-items:center; gap:clamp(18px,4vw,64px); padding:18px var(--am-gutter); background:color-mix(in srgb,var(--am-paper) 88%,transparent); backdrop-filter:blur(12px); border-bottom:1px solid color-mix(in srgb,var(--am-gold) 45%,transparent); }
.am-logo { display:inline-flex; align-items:center; gap:10px; font-family:var(--font-display); letter-spacing:.08em; font-size:1.05rem; }
.am-hanko { display:grid; place-items:center; width:28px; height:28px; border:1px solid var(--am-red); color:var(--am-red); font:500 .62rem var(--font-mono); letter-spacing:-.12em; }
.am-header nav { display:flex; gap:24px; margin-left:auto; font:500 .65rem var(--font-mono); text-transform:uppercase; letter-spacing:.12em; }
.am-header nav a { position:relative; padding-bottom:3px; }
.am-header nav a::after { content:""; position:absolute; height:1px; left:0; right:100%; bottom:0; background:var(--am-red); transition:right .3s ease; }
.am-header nav a:hover::after,.am-header nav a:focus-visible::after { right:0; }
.am-header__counter { font:400 .62rem var(--font-mono); letter-spacing:.06em; color:var(--am-red); white-space:nowrap; }
.am-stage { position:fixed; inset:0; z-index:0; pointer-events:none; background:radial-gradient(circle at 50% 20%, color-mix(in srgb,var(--am-paper) 92%,white), var(--am-paper) 64%, color-mix(in srgb,var(--am-indigo) 18%,var(--am-paper))); }
.am-canvas { position:absolute; inset:8vh 4vw 0 34vw; pointer-events:auto; touch-action:pan-y; }
.am-stage__wash { position:absolute; inset:0; pointer-events:none; background:linear-gradient(120deg,transparent 55%, color-mix(in srgb,var(--am-indigo) 8%,transparent)); mix-blend-mode:multiply; }
.am-stage__wash[data-rain="true"]::after { content:""; position:absolute; inset:0; opacity:.25; background-image:repeating-linear-gradient(112deg, transparent 0 14px, color-mix(in srgb,var(--am-indigo) 20%,transparent) 15px 16px, transparent 17px 28px); }
.am-section { position:relative; z-index:2; min-height:100svh; padding:clamp(108px,15vh,180px) var(--am-gutter); display:grid; grid-template-columns:minmax(0,1fr) minmax(280px, .85fr); gap:clamp(32px,8vw,150px); align-items:center; }
.am-hero { min-height:100svh; padding-top:180px; }
.am-hero__copy { max-width:560px; }
.am-kicker,.am-mono { font:500 .66rem var(--font-mono); letter-spacing:.13em; text-transform:uppercase; }
.am-kicker { color:var(--am-red); display:inline-flex; gap:12px; align-items:center; }
.am-kicker::before { content:""; width:28px; height:1px; background:var(--am-gold); }
h1,h2,h3,p { margin:0; }
h1,h2,h3 { font-family:var(--font-display); font-weight:500; }
h1 { font-size:clamp(4.2rem,11vw,10rem); line-height:.86; letter-spacing:-.06em; margin:28px 0; }
h1 em,h2 em { display:block; font-style:normal; color:var(--am-red); }
h1 em { font:400 clamp(1.1rem,2.1vw,2rem) var(--font-body); letter-spacing:-.02em; line-height:1.2; margin-top:24px; }
h2 { font-size:clamp(3.1rem,7vw,7rem); line-height:.91; letter-spacing:-.07em; margin:24px 0; }
h2 em { color:var(--am-indigo); }
p { max-width:40ch; line-height:1.65; font-size:clamp(1rem,1.35vw,1.2rem); }
.am-button { display:inline-flex; align-items:center; justify-content:space-between; gap:24px; min-width:210px; margin-top:32px; padding:14px 16px; border:1px solid var(--am-ink); font:500 .68rem var(--font-mono); text-transform:uppercase; letter-spacing:.08em; transition:transform .22s ease, background .22s ease, color .22s ease; }
.am-button:hover { transform:translateY(-3px); }
.am-button:active { transform:scale(.97); }
.am-button--red { background:var(--am-red); border-color:var(--am-red); color:white; }
.am-vertical { writing-mode:vertical-rl; position:absolute; right:var(--am-gutter); top:26vh; font-family:var(--font-display); font-size:clamp(1.4rem,2vw,2rem); letter-spacing:.2em; color:var(--am-indigo); }
.am-hero > .am-hanko { position:absolute; right:var(--am-gutter); bottom:18vh; width:52px; height:52px; font-size:.72rem; }
.am-threadline { position:fixed; z-index:25; top:80px; left:var(--am-gutter); right:var(--am-gutter); height:1px; background:color-mix(in srgb,var(--am-indigo) 16%,transparent); }
.am-threadline span { display:block; width:var(--thread-progress); height:100%; background:var(--am-indigo); transform-origin:left; }
.am-structure { background:color-mix(in srgb,var(--am-paper) 84%,var(--am-sakura)); }
.am-light { background:var(--am-indigo); color:var(--am-paper); }
.am-light h2 em { color:var(--am-sakura); }
.am-control { padding:28px; border-left:1px solid color-mix(in srgb,var(--am-paper) 35%,transparent); display:grid; gap:18px; max-width:420px; }
.am-control label { font:500 .7rem var(--font-mono); text-transform:uppercase; letter-spacing:.1em; }
.am-control output { float:right; color:var(--am-sakura); }
.am-control input[type="range"] { width:100%; accent-color:var(--am-sakura); }
.am-switch { display:flex; align-items:center; gap:12px; }
.am-switch input { accent-color:var(--am-red); }
.am-parts { display:grid; gap:8px; margin-top:38px; max-width:460px; }
.am-parts button { text-align:left; display:grid; grid-template-columns:1fr auto; gap:8px; padding:13px 0; border:0; border-top:1px solid color-mix(in srgb,var(--am-gold) 50%,transparent); background:none; color:inherit; cursor:pointer; }
.am-parts button span { font:500 .74rem var(--font-mono); text-transform:uppercase; letter-spacing:.07em; }
.am-parts button i { font-style:normal; color:color-mix(in srgb,var(--am-ink) 58%,transparent); font-size:.8rem; text-align:right; }
.am-parts button.is-active span { color:var(--am-red); }
.am-parts button:focus-visible,.am-swatches button:focus-visible,.am-form input:focus-visible,.am-button:focus-visible { outline:2px solid var(--am-red); outline-offset:4px; }
.am-spec { padding:34px; border:1px solid color-mix(in srgb,var(--am-gold) 55%,transparent); display:grid; gap:10px; max-width:300px; justify-self:end; background:color-mix(in srgb,var(--am-paper) 76%,transparent); }
.am-spec strong { font:500 clamp(4rem,8vw,7rem) var(--font-display); line-height:.8; color:var(--am-red); }
.am-rule { height:1px; background:var(--am-gold); margin:20px 0; }
.am-canopy { min-height:78svh; background:color-mix(in srgb,var(--am-sakura) 24%,var(--am-paper)); }
.am-swatches { display:grid; gap:12px; }
.am-swatches button { display:flex; align-items:center; gap:14px; border:1px solid color-mix(in srgb,var(--am-ink) 20%,transparent); background:transparent; padding:14px; text-align:left; cursor:pointer; }
.am-swatches button span { width:32px; height:32px; border-radius:50%; background:var(--swatch); border:1px solid color-mix(in srgb,var(--am-ink) 25%,transparent); }
.am-swatches button.is-active { border-color:var(--am-red); transform:translateX(10px); }
.am-making { background:var(--am-paper); }
.am-making ol { list-style:none; padding:0; margin:0; display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:0 24px; border-top:1px solid var(--am-gold); }
.am-making li { display:flex; gap:16px; align-items:baseline; padding:16px 0; border-bottom:1px solid color-mix(in srgb,var(--am-gold) 45%,transparent); }
.am-making li span { font:500 .63rem var(--font-mono); color:var(--am-red); }
.am-making li strong { font:500 1.25rem var(--font-display); }
.am-commission { background:var(--am-indigo); color:var(--am-paper); }
.am-commission h2 em { color:var(--am-sakura); }
.am-commission dl { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-top:36px; border-top:1px solid color-mix(in srgb,var(--am-paper) 24%,transparent); padding-top:18px; }
.am-commission dt,.am-commission dd { margin:0; }
.am-commission dt { font:500 .58rem var(--font-mono); text-transform:uppercase; color:var(--am-sakura); }
.am-commission dd { margin-top:6px; font-size:.88rem; }
.am-form { display:grid; gap:18px; padding:28px; border:1px solid color-mix(in srgb,var(--am-paper) 35%,transparent); background:color-mix(in srgb,var(--am-paper) 7%,transparent); }
.am-form label { display:grid; gap:8px; font:500 .65rem var(--font-mono); text-transform:uppercase; letter-spacing:.1em; }
.am-form input { width:100%; border:0; border-bottom:1px solid color-mix(in srgb,var(--am-paper) 40%,transparent); padding:10px 0; background:transparent; color:var(--am-paper); outline:none; }
.am-form small { color:var(--am-sakura); }
.am-success h3 { font-size:clamp(2.6rem,5vw,4rem); margin:20px 0; }
.am-footer { position:relative; z-index:2; display:flex; align-items:center; justify-content:space-between; gap:18px; padding:28px var(--am-gutter); background:var(--am-ink); color:var(--am-paper); font:500 .62rem var(--font-mono); letter-spacing:.08em; text-transform:uppercase; }
@media (prefers-reduced-motion:no-preference) { .am-section > * { animation:am-rise .8s both; animation-timeline:view(); animation-range:entry 12% cover 30%; } @keyframes am-rise { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:none; } } }
@media (max-width:900px) { .am-header nav { display:none; } .am-header__counter { margin-left:auto; } .am-stage { position:absolute; height:82svh; } .am-canvas { inset:19vh -24vw -2vh 24vw; opacity:.46; transform:scale(.82); transform-origin:center; } .am-section { min-height:auto; padding-top:120px; padding-bottom:120px; grid-template-columns:1fr; gap:52px; } .am-hero { min-height:100svh; padding-top:180px; } .am-hero__copy { max-width:480px; } .am-vertical { right:var(--am-gutter); top:20vh; font-size:1rem; } .am-spec { justify-self:start; } .am-making ol { grid-template-columns:1fr; } .am-commission dl { grid-template-columns:1fr; } .am-footer { flex-wrap:wrap; } }
@media (prefers-reduced-motion:reduce) { html { scroll-behavior:auto; } .am-section > * { animation:none!important; } .am-canvas { opacity:.72; } }
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#C8412B"/><circle cx="32" cy="32" r="18" fill="none" stroke="#F4ECDD" stroke-width="2"/><path d="M20 27h24M22 36h20" stroke="#F4ECDD" stroke-width="2"/><text x="32" y="43" text-anchor="middle" fill="#F4ECDD" font-size="16" font-family="serif">雨</text></svg>
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() { return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#F4ECDD", color: "#1A1613", fontFamily: "serif" }}><div style={{ display: "flex", color: "#C8412B", fontSize: 22, letterSpacing: 8 }}>AMAOTO / 雨音</div><div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.02 }}><span>The sound of rain,</span><span style={{ color: "#2B3A55" }}>kept dry.</span></div><div style={{ display: "flex", fontFamily: "monospace", fontSize: 18, letterSpacing: 4 }}>WAGASA ATELIER · KUROKAWA, NAGANO</div></div>, size); }
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/page.tsx">
<![CDATA[import { AmaotoShell } from "./scene/AmaotoShell";
export default function AmaotoPage() { return <AmaotoShell />; }
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/brand/Hanko.tsx">
<![CDATA[export function Hanko() { return <span className="am-hanko" aria-label="Amaoto seal">雨音</span>; }
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/brand/Logo.tsx">
<![CDATA[import { Hanko } from "./Hanko";
export function Logo() { return <a className="am-logo" href="#top" aria-label="AMAOTO home"><Hanko /><span>AMAOTO</span></a>; }
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/data/colourways.ts">
<![CDATA[﻿export const COLOURWAYS = [
  { id: "cream", label: "Washi cream", color: "#F4ECDD", motif: "sakura" as const },
  { id: "indigo", label: "Dusk indigo", color: "#2B3A55", motif: "wave" as const },
  { id: "vermilion", label: "Vermilion", color: "#C8412B", motif: "plain" as const },
  { id: "undyed", label: "Undyed", color: "#B8923A", motif: "plain" as const },
] as const;

]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/data/copy.ts">
<![CDATA[export const COPY = {
  town: "Kurokawa, Nagano",
  steps: 81,
  leadTime: "14 weeks",
  ribs: 40,
  hero: "The sound of rain, kept dry.",
} as const;
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/data/parts.ts">
<![CDATA[export const PARTS = [
  { id: "ribs", name: "Bamboo ribs", description: "Forty bowed bamboo ribs hold the canopy in one breath." },
  { id: "stretchers", name: "Stretchers", description: "Hinged links carry the runner's motion into the ribs." },
  { id: "runner", name: "Runner ring", description: "A turned wood hub slides along the shaft to open the umbrella." },
  { id: "thread", name: "Thread lacing", description: "Dark knots tie paper, rib and rim into a single skin." },
  { id: "canopy", name: "Washi paper", description: "Thin paper catches light from behind and keeps the rain out." },
  { id: "handle", name: "Turned handle", description: "Node rings and grip beads finish the shaft by hand." },
] as const;
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/data/steps.ts">
<![CDATA[export const MAKING_STEPS = [
  "Split the bamboo", "Steam the ribs", "Turn the shaft", "Set the cap", "Hinge the stretchers", "Tie the runner", "Stretch the washi", "Paint the ring", "Bind the rim", "Listen for rain",
] as const;
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/forms/CommissionForm.tsx">
<![CDATA["use client";
import { useState } from "react";
import { validateCommission } from "./validation";

export function CommissionForm({ canopy }: { canopy: string }) {
  const [fields, setFields] = useState({ name: "", email: "", occasion: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  if (sent) return <div className="am-success" role="status"><span className="am-kicker">雨音 / received</span><h3>Your umbrella is on the bench.</h3><p>We saved your {canopy} canopy request. Amaoto will write within one working day.</p></div>;
  return <form className="am-form" onSubmit={(event) => { event.preventDefault(); const next = validateCommission(fields); setErrors(next); if (!Object.keys(next).length) setSent(true); }} noValidate>
    <label>Name<input value={fields.name} onChange={(e) => setFields({ ...fields, name: e.target.value })} aria-invalid={Boolean(errors.name)} />{errors.name && <small>{errors.name}</small>}</label>
    <label>Email<input type="email" value={fields.email} onChange={(e) => setFields({ ...fields, email: e.target.value })} aria-invalid={Boolean(errors.email)} />{errors.email && <small>{errors.email}</small>}</label>
    <label>Occasion<input value={fields.occasion} onChange={(e) => setFields({ ...fields, occasion: e.target.value })} aria-invalid={Boolean(errors.occasion)} />{errors.occasion && <small>{errors.occasion}</small>}</label>
    <button type="submit" className="am-button am-button--red">Reserve a commission <span>↗</span></button>
  </form>;
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/forms/validation.ts">
<![CDATA[export type CommissionFields = { name: string; email: string; occasion: string };
export function validateCommission(fields: CommissionFields) {
  const errors: Partial<Record<keyof CommissionFields, string>> = {};
  if (!fields.name.trim()) errors.name = "Add your name";
  if (!/^\S+@\S+\.\S+$/.test(fields.email.trim())) errors.email = "Enter a work email";
  if (!fields.occasion.trim()) errors.occasion = "Add your occasion";
  return errors;
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/model/createWagasaModel.ts">
<![CDATA[import * as THREE from "three";

export type WagasaModelOptions = {
  open?: number;
  explode?: number;
  canopyColor?: string;
  motif?: "sakura" | "wave" | "plain";
};

type Runtime = {
  setOpen: (value: number) => void;
  setExplode: (value: number) => void;
  getOpen: () => number;
  getExplode: () => number;
  setCanopy: (color: string, motif: "sakura" | "wave" | "plain") => void;
};

const RIB_COUNT = 40;
const TAU = Math.PI * 2;
const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function makeCanvasTexture(color: string, motif: "sakura" | "wave" | "plain") {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1024, 1024);
  const fibre = ctx.createImageData(1024, 1024);
  let seed = 0x1a2b3c4d;
  for (let i = 0; i < fibre.data.length; i += 4) {
    seed = Math.imul(seed ^ (seed >>> 16), 2246822519) >>> 0;
    const n = ((seed >>> 24) & 15) - 7;
    fibre.data[i] = 255 + n;
    fibre.data[i + 1] = 247 + n;
    fibre.data[i + 2] = 228 + n;
    fibre.data[i + 3] = 255;
  }
  ctx.globalCompositeOperation = "screen";
  ctx.putImageData(fibre, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  if (motif === "sakura") {
    ctx.strokeStyle = "rgba(117, 78, 56, .38)";
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(512, 512, 382, 0, TAU);
    ctx.stroke();
    for (let i = 0; i < 36; i += 1) {
      const angle = (i / 36) * TAU;
      const x = 512 + Math.cos(angle) * 382;
      const y = 512 + Math.sin(angle) * 382;
      ctx.fillStyle = i % 3 === 0 ? "rgba(210, 108, 132, .82)" : "rgba(235, 157, 172, .68)";
      for (let p = 0; p < 5; p += 1) {
        const a = angle + (p - 2) * 0.42;
        ctx.beginPath();
        ctx.ellipse(x + Math.cos(a) * 19, y + Math.sin(a) * 19, 13, 23, a, 0, TAU);
        ctx.fill();
      }
      ctx.fillStyle = "rgba(130, 78, 45, .8)";
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, TAU);
      ctx.fill();
    }
  } else if (motif === "wave") {
    ctx.strokeStyle = "rgba(43, 58, 85, .42)";
    ctx.lineWidth = 12;
    for (let y = 200; y < 850; y += 120) {
      ctx.beginPath();
      for (let x = 0; x <= 1024; x += 16) ctx.lineTo(x, y + Math.sin(x * 0.025) * 22);
      ctx.stroke();
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.anisotropy = 4;
  return texture;
}

function makePaperMaterial(color: string, motif: "sakura" | "wave" | "plain") {
  const map = makeCanvasTexture(color, motif);
  const material = new THREE.MeshPhysicalMaterial({
    color: 0xf4ecdd,
    map: map ?? undefined,
    roughness: 0.86,
    metalness: 0,
    transmission: 0.08,
    thickness: 0.012,
    ior: 1.35,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.96,
  });
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uBackLight = { value: new THREE.Vector3(-0.2, 0.8, -0.6).normalize() };
    shader.fragmentShader = shader.fragmentShader.replace(
      "#include <output_fragment>",
      "float amaotoGlow = pow(max(dot(normalize(vNormal), normalize(uBackLight)), 0.0), 2.0) * 0.22;\n" +
        "outgoingLight += vec3(1.0, 0.58, 0.35) * amaotoGlow;\n#include <output_fragment>",
    );
  };
  material.userData.materialId = "washi";
  return material;
}

function makeWood(color: number, roughness = 0.42) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness: 0 });
}

function tubeBetween(a: THREE.Vector3, b: THREE.Vector3, radius: number, material: THREE.Material) {
  const direction = new THREE.Vector3().subVectors(b, a);
  const geometry = new THREE.CylinderGeometry(radius, radius * 0.92, direction.length(), 8);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(a).add(b).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  return mesh;
}

function makeCanopyGeometry() {
  const radial = RIB_COUNT;
  const rings = 12;
  const positions = new Float32Array((radial + 1) * (rings + 1) * 3);
  const uvs = new Float32Array((radial + 1) * (rings + 1) * 2);
  const indices: number[] = [];
  for (let j = 0; j <= rings; j += 1) {
    for (let i = 0; i <= radial; i += 1) {
      const idx = j * (radial + 1) + i;
      uvs[idx * 2] = i / radial;
      uvs[idx * 2 + 1] = j / rings;
      if (j === 0) {
        positions[idx * 3] = 0;
        positions[idx * 3 + 1] = 2.48;
        positions[idx * 3 + 2] = 0;
      }
    }
  }
  for (let j = 0; j < rings; j += 1) {
    for (let i = 0; i < radial; i += 1) {
      const a = j * (radial + 1) + i;
      const b = a + 1;
      const c = a + radial + 1;
      const d = c + 1;
      indices.push(a, c, b, b, c, d);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  return geometry;
}

function updateCanopy(geometry: THREE.BufferGeometry, open: number) {
  const attr = geometry.getAttribute("position") as THREE.BufferAttribute;
  const rings = 12;
  const radial = RIB_COUNT;
  for (let j = 0; j <= rings; j += 1) {
    const t = j / rings;
    const radius = lerp(0.04, 2.05, t) * lerp(0.16, 1, open);
    const dome = lerp(0.04, 0.52, open) * Math.sin(t * Math.PI * 0.5);
    const pleat = (1 - open) * (0.06 + t * 0.12) * Math.sin(t * Math.PI * 8);
    for (let i = 0; i <= radial; i += 1) {
      const angle = (i / radial) * TAU;
      const idx = (j * (radial + 1) + i) * 3;
      const r = radius + pleat;
      attr.setXYZ(idx / 3, Math.cos(angle) * r, 2.48 - dome - t * 0.05, Math.sin(angle) * r);
    }
  }
  attr.needsUpdate = true;
  geometry.computeVertexNormals();
}

export function createWagasaModel(options: WagasaModelOptions = {}): THREE.Group {
  const root = new THREE.Group();
  root.name = "AMAOTO Wagasa";
  root.rotation.x = 0.55;
  root.rotation.z = -0.12;
  root.scale.setScalar(0.84);
  root.userData.parts = {};
  root.userData.reconstruction = { target: "wagasa", ribCount: RIB_COUNT, approximate: ["rear motif continuity", "closed paper pleat profile"] };

  let open = clamp01(options.open ?? 0.84);
  let explode = clamp01(options.explode ?? 0);
  let canopyColor = options.canopyColor ?? "#F4ECDD";
  let motif = options.motif ?? "sakura";

  const paper = makePaperMaterial(canopyColor, motif);
  const bamboo = makeWood(0xb7894d, 0.44);
  const wood = makeWood(0x6a351c, 0.3);
  const threadMaterial = new THREE.MeshStandardMaterial({ color: 0x191311, roughness: 0.82 });

  const canopyGeometry = makeCanopyGeometry();
  updateCanopy(canopyGeometry, open);
  const canopy = new THREE.Mesh(canopyGeometry, paper);
  canopy.name = "paper-canopy";
  canopy.userData.partId = "canopy";
  root.add(canopy);

  const rim = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.055, 8, 96), paper);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 2.47;
  rim.name = "canopy-rim";
  root.add(rim);

  const shaft = new THREE.Group();
  shaft.name = "shaft";
  shaft.userData.partId = "shaft";
  const shaftMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.13, 5.8, 16), bamboo);
  shaftMesh.position.y = -0.35;
  shaft.add(shaftMesh);
  for (const y of [-2.35, -1.9, -0.95, 1.94, 2.23]) {
    const node = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.025, 6, 16), bamboo);
    node.rotation.x = Math.PI / 2;
    node.position.y = y;
    shaft.add(node);
  }
  root.add(shaft);

  const handle = new THREE.Group();
  handle.name = "handle";
  handle.userData.partId = "handle";
  const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.16, 1.5, 16), bamboo);
  grip.position.y = -3.55;
  handle.add(grip);
  for (const y of [-4.08, -3.95, -3.08, -2.98]) {
    const bead = new THREE.Mesh(new THREE.TorusGeometry(0.21, 0.035, 7, 16), bamboo);
    bead.rotation.x = Math.PI / 2;
    bead.position.y = y;
    handle.add(bead);
  }
  root.add(handle);

  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.16, 0.42, 16), wood);
  cap.position.y = 2.68;
  cap.name = "top-cap";
  cap.userData.partId = "top-cap";
  root.add(cap);

  const runner = new THREE.Group();
  runner.name = "runner-ring";
  runner.userData.partId = "runner";
  const runnerMesh = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.09, 10, 32), wood);
  runnerMesh.rotation.x = Math.PI / 2;
  runner.add(runnerMesh);
  const runnerSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.25, 16), wood);
  runner.add(runnerSleeve);
  root.add(runner);

  const rib = new THREE.Group();
  rib.name = "ribs";
  rib.userData.partId = "ribs";
  const ribMeshes: THREE.Object3D[] = [];
  for (let i = 0; i < RIB_COUNT; i += 1) {
    const angle = (i / RIB_COUNT) * TAU;
    const end = new THREE.Vector3(Math.cos(angle) * 2.05, 2.47, Math.sin(angle) * 2.05);
    const mid = new THREE.Vector3(Math.cos(angle) * 1.18, 2.5, Math.sin(angle) * 1.18);
    const item = tubeBetween(new THREE.Vector3(0, 2.52, 0), end, 0.026, bamboo);
    item.userData.partId = `rib-${i}`;
    rib.add(item);
    ribMeshes.push(item);
    const node = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.012, 5, 10), bamboo);
    node.position.copy(mid);
    node.quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -angle);
    rib.add(node);
  }
  root.add(rib);

  const stretchers = new THREE.Group();
  stretchers.name = "stretchers";
  stretchers.userData.partId = "stretchers";
  const stretcherMeshes: THREE.Object3D[] = [];
  const thread = new THREE.Group();
  thread.name = "thread";
  thread.userData.partId = "thread";
  for (let i = 0; i < RIB_COUNT; i += 1) {
    const angle = (i / RIB_COUNT) * TAU;
    const outer = new THREE.Vector3(Math.cos(angle) * 1.16, 2.5, Math.sin(angle) * 1.16);
    const link = tubeBetween(new THREE.Vector3(0, 0.55, 0), outer, 0.014, bamboo);
    stretchers.add(link);
    stretcherMeshes.push(link);
    const knot = new THREE.Mesh(new THREE.SphereGeometry(0.045, 6, 4), threadMaterial);
    knot.position.set(Math.cos(angle) * 2.05, 2.47, Math.sin(angle) * 2.05);
    thread.add(knot);
  }
  const threadRing = new THREE.Mesh(new THREE.TorusGeometry(1.15, 0.012, 5, 64), threadMaterial);
  threadRing.rotation.x = Math.PI / 2;
  threadRing.position.y = 2.5;
  thread.add(threadRing);
  root.add(stretchers, thread);

  const partList = [canopy, rim, shaft, handle, cap, runner, rib, stretchers, thread];
  for (const part of partList) root.userData.parts[part.userData.partId ?? part.name] = part;

  const update = () => {
    updateCanopy(canopyGeometry, open);
    const runnerY = lerp(0.12, 0.74, open);
    runner.position.y = runnerY;
    for (let i = 0; i < RIB_COUNT; i += 1) {
      const angle = (i / RIB_COUNT) * TAU;
      const outer = new THREE.Vector3(Math.cos(angle) * lerp(0.32, 2.05, open), 2.40 - 0.05 * open, Math.sin(angle) * lerp(0.32, 2.05, open));
      const ribItem = ribMeshes[i] as THREE.Mesh;
      ribItem.geometry.dispose();
      const ribRoot = new THREE.Vector3(0, 2.44, 0);
      ribItem.geometry = new THREE.CylinderGeometry(0.026, 0.022, ribRoot.distanceTo(outer), 8);
      ribItem.position.copy(outer).add(ribRoot).multiplyScalar(0.5);
      ribItem.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3().subVectors(outer, ribRoot).normalize());
      const link = stretcherMeshes[i] as THREE.Mesh;
      link.geometry.dispose();
      const inner = new THREE.Vector3(Math.cos(angle) * lerp(0.18, 1.18, open), 2.5, Math.sin(angle) * lerp(0.18, 1.18, open));
      link.geometry = new THREE.CylinderGeometry(0.014, 0.013, new THREE.Vector3().set(0, runnerY, 0).distanceTo(inner), 6);
      link.position.copy(inner).add(new THREE.Vector3(0, runnerY, 0)).multiplyScalar(0.5);
      link.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3().subVectors(inner, new THREE.Vector3(0, runnerY, 0)).normalize());
    }
    const sep = explode;
    canopy.position.y = sep * 0.5;
    rib.position.y = -0.18 + sep * 0.18;
    stretchers.position.y = -sep * 0.08;
    runner.position.z = sep * 0.24;
    thread.position.y = sep * 0.12;
    handle.position.y = -sep * 0.32;
  };

  const runtime: Runtime = {
    setOpen: (value) => { open = clamp01(value); update(); },
    setExplode: (value) => { explode = clamp01(value); update(); },
    getOpen: () => open,
    getExplode: () => explode,
    setCanopy: (color, nextMotif) => {
      canopyColor = color;
      motif = nextMotif;
      const next = makePaperMaterial(canopyColor, motif);
      canopy.material = next;
      rim.material = next;
    },
  };
  root.userData.sculptRuntime = runtime;
  root.userData.runtime = runtime;
  root.userData.triangleBudget = { target: 60000, estimated: 15000, drawCalls: 9 };
  root.userData.getPart = (id: string) => root.userData.parts[id] ?? null;
  update();
  return root;
}

export default createWagasaModel;
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/model/runtime.ts">
<![CDATA[export const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
export const runnerPosition = (open: number) => 0.12 + (0.74 - 0.12) * clamp01(open);
export const canopyRadius = (open: number, rim = 2.05) => 0.32 + (rim - 0.32) * clamp01(open);
export const explodeOffset = (explode: number, axis: "canopy" | "runner" | "handle") => {
  const t = clamp01(explode);
  return axis === "canopy" ? t * 0.5 : axis === "runner" ? t * 0.24 : -t * 0.32;
};
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/AmaotoShell.tsx">
<![CDATA["use client";
import { useEffect, useMemo, useState } from "react";
import { Logo } from "../brand/Logo";
import { COLOURWAYS } from "../data/colourways";
import { Canopy } from "../sections/Canopy";
import { Commission } from "../sections/Commission";
import { Hero } from "../sections/Hero";
import { Light } from "../sections/Light";
import { Making } from "../sections/Making";
import { Structure } from "../sections/Structure";
import { ThreadLine } from "../ui/ThreadLine";
import { WagasaCanvas } from "./WagasaCanvas";

export function AmaotoShell() {
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState<string>();
  const [angle, setAngle] = useState(18);
  const [rain, setRain] = useState(false);
  const [colourway, setColourway] = useState("cream");
  const colour = useMemo(() => COLOURWAYS.find((x) => x.id === colourway) ?? COLOURWAYS[0], [colourway]);
  useEffect(() => { let frame = 0; const update = () => { const max = document.documentElement.scrollHeight - window.innerHeight; setProgress(max > 0 ? window.scrollY / max : 0); frame = requestAnimationFrame(update); }; frame = requestAnimationFrame(update); return () => cancelAnimationFrame(frame); }, []);
  const open = progress < 0.18 ? progress / 0.18 : progress < 0.72 ? 1 : Math.max(0.78, 1 - (progress - 0.72) / 0.28);
  const explode = progress > 0.2 && progress < 0.4 ? (progress - 0.2) / 0.2 : progress >= 0.4 && progress < 0.52 ? 1 - (progress - 0.4) / 0.12 : 0;
  return <main className="am-page" style={{ "--scroll-progress": progress } as React.CSSProperties}>
    <header className="am-header"><Logo /><nav><a href="#structure">Structure</a><a href="#light">Light</a><a href="#making">Making</a><a href="#commission">Commission</a></nav><span className="am-header__counter">{String(Math.round(open * 40)).padStart(2, "0")} / 40 ribs open</span></header>
    <div className="am-stage"><WagasaCanvas onPart={setSelected} open={open} explode={explode} colour={colour.color} motif={colour.motif} /><div className="am-stage__wash" data-rain={rain} /></div>
    <ThreadLine progress={progress} />
    <Hero />
    <Structure selected={selected} onSelect={setSelected} />
    <Light angle={angle} onAngle={setAngle} rain={rain} onRain={setRain} />
    <Canopy value={colourway} onChange={setColourway} />
    <Making />
    <Commission canopy={colour.label} />
    <footer className="am-footer"><Logo /><span>AMAOTO / Kurokawa, Nagano / 2026</span><a href="#top">Back to top ↑</a></footer>
    <noscript><style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style></noscript>
  </main>;
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/scene/WagasaCanvas.tsx">
<![CDATA[﻿"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { createWagasaModel } from "../model/createWagasaModel";

type Props = { onPart?: (id: string) => void; open?: number; explode?: number; colour?: string; motif?: "sakura" | "wave" | "plain" };

export function WagasaCanvas({ onPart, open = 0.84, explode = 0, colour = "#F4ECDD", motif = "sakura" }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const values = useRef({ open, explode, colour, motif });
  values.current = { open, explode, colour, motif };
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#F4ECDD");
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(4.8, 3.1, 9.4);
    camera.lookAt(0, 0.4, 0);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(element.clientWidth, element.clientHeight, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.domElement.setAttribute("aria-hidden", "true");
    element.appendChild(renderer.domElement);
    const key = new THREE.DirectionalLight(0xfff0d6, 2.2); key.position.set(-3, 6, 4); key.castShadow = true;
    const fill = new THREE.HemisphereLight(0xc4d2e4, 0x3a2418, 1.4);
    const glow = new THREE.PointLight(0xffb37a, 1.6, 6); glow.position.set(0, 2.2, -1.2);
    scene.add(key, fill, glow);
    const model = createWagasaModel({ open: values.current.open, explode: values.current.explode, canopyColor: values.current.colour, motif: values.current.motif });
    scene.add(model);
    let lastCanopy = `${values.current.colour}:${values.current.motif}`;
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const onPointer = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(model.children, true)[0];
      const id = hit?.object.userData.partId as string | undefined;
      if (id) onPart?.(id.split("-")[0]);
    };
    renderer.domElement.addEventListener("click", onPointer);
    const resize = () => { if (!element) return; camera.aspect = element.clientWidth / Math.max(1, element.clientHeight); camera.updateProjectionMatrix(); renderer.setSize(element.clientWidth, element.clientHeight, false); };
    const observer = new ResizeObserver(resize); observer.observe(element);
    let frame = 0;
    const tick = () => {
      const state = values.current;
      (model.userData.sculptRuntime as { setOpen: (x: number) => void; setExplode: (x: number) => void; setCanopy: (c: string, m: "sakura" | "wave" | "plain") => void }).setOpen(state.open);
      model.userData.sculptRuntime.setExplode(state.explode);
      const canopyKey = `${state.colour}:${state.motif}`;
      if (canopyKey !== lastCanopy) { model.userData.sculptRuntime.setCanopy(state.colour, state.motif); lastCanopy = canopyKey; }
      model.rotation.y += 0.0018;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(tick);
    };
    tick();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); renderer.domElement.removeEventListener("click", onPointer); renderer.dispose(); element.removeChild(renderer.domElement); model.traverse((child) => { const mesh = child as THREE.Mesh; if (mesh.geometry) mesh.geometry.dispose(); if (Array.isArray(mesh.material)) mesh.material.forEach((m) => m.dispose()); else mesh.material?.dispose(); }); };
  }, [onPart]);
  return <div ref={host} className="am-canvas" role="img" aria-label="Interactive procedural wagasa model" />;
}

]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/sections/Canopy.tsx">
<![CDATA[import { COLOURWAYS } from "../data/colourways";
export function Canopy({ value, onChange }: { value: string; onChange: (id: string) => void }) { return <section id="canopy" className="am-section am-canopy"><div><span className="am-kicker">03 / colourways</span><h2>Choose your<br /><em>canopy.</em></h2><p>One structure, four moods. The motif is painted into the paper before the last binding.</p></div><div className="am-swatches" role="radiogroup" aria-label="Canopy colourway">{COLOURWAYS.map((item) => <button key={item.id} className={value === item.id ? "is-active" : ""} style={{ "--swatch": item.color } as React.CSSProperties} onClick={() => onChange(item.id)} role="radio" aria-checked={value === item.id}><span />{item.label}</button>)}</div></section>; }
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/sections/Commission.tsx">
<![CDATA[import { CommissionForm } from "../forms/CommissionForm";
export function Commission({ canopy }: { canopy: string }) { return <section id="commission" className="am-section am-commission"><div><span className="am-kicker">05 / your umbrella</span><h2>Made for the<br /><em>weather ahead.</em></h2><p>Tell us where you will carry it. We will answer with a paper, bamboo and palette that belongs there.</p><dl><div><dt>Lead time</dt><dd>14 weeks</dd></div><div><dt>Atelier</dt><dd>Kurokawa / 1963</dd></div><div><dt>Commission</dt><dd>From ¥84,000</dd></div></dl></div><CommissionForm canopy={canopy} /></section>; }
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/sections/Hero.tsx">
<![CDATA[import { Hanko } from "../brand/Hanko";
export function Hero() { return <section id="top" className="am-section am-hero"><div className="am-hero__copy"><span className="am-kicker">Wagasa atelier / Kurokawa, Nagano</span><h1>雨音<em>The sound of rain,<br />kept dry.</em></h1><p>Commission a hand-built oil-paper umbrella, tuned to the weather you will carry it through.</p><a className="am-button am-button--red" href="#commission">Reserve a commission <span>↗</span></a></div><div className="am-vertical">雨の音を、紙に。</div><Hanko /></section>; }
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/sections/Light.tsx">
<![CDATA[export function Light({ angle, onAngle, rain, onRain }: { angle: number; onAngle: (v: number) => void; rain: boolean; onRain: (v: boolean) => void }) { return <section id="light" className="am-section am-light"><div><span className="am-kicker">02 / translucency</span><h2>Paper that<br /><em>listens to light.</em></h2><p>Thin washi is not a surface. It is a membrane. Put the sun behind it and the fibres answer.</p></div><div className="am-control"><label htmlFor="sun">Sun angle <output>{angle}°</output></label><input id="sun" type="range" min="-90" max="90" value={angle} onChange={(e) => onAngle(Number(e.target.value))} /><label className="am-switch"><input type="checkbox" checked={rain} onChange={(e) => onRain(e.target.checked)} /> <span>Rain on the roof</span></label></div></section>; }
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/sections/Making.tsx">
<![CDATA[import { MAKING_STEPS } from "../data/steps";
export function Making() { return <section id="making" className="am-section am-making"><div><span className="am-kicker">04 / the making</span><h2>Eighty-one<br /><em>quiet steps.</em></h2><p>From split bamboo to the last knot, every gesture stays visible in the object.</p></div><ol>{MAKING_STEPS.map((step, index) => <li key={step}><span>0{index + 1}</span><strong>{step}</strong></li>)}</ol></section>; }
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/sections/Structure.tsx">
<![CDATA[import { PartCallout } from "../ui/PartCallout";
export function Structure({ selected, onSelect }: { selected?: string; onSelect: (id: string) => void }) { return <section id="structure" className="am-section am-structure"><div><span className="am-kicker">01 / anatomy</span><h2>Forty ribs,<br /><em>one breath.</em></h2><p>Every part has a job. Pull the runner, and a radial mechanism turns a flat bundle into a roof.</p><PartCallout selected={selected} onSelect={onSelect} /></div><div className="am-spec"><span className="am-mono">OPEN / CLOSE</span><strong>40</strong><span>ribs in one circumference</span><div className="am-rule" /><span className="am-mono">HINGE / SLIDE / TIE</span><strong>81</strong><span>making steps in Kurokawa</span></div></section>; }
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/ui/PartCallout.tsx">
<![CDATA[import { PARTS } from "../data/parts";
export function PartCallout({ selected, onSelect }: { selected?: string; onSelect: (id: string) => void }) {
  return <div className="am-parts" aria-label="Wagasa parts">{PARTS.map((part) => <button key={part.id} className={selected === part.id ? "is-active" : ""} onClick={() => onSelect(part.id)}><span>{part.name}</span><i>{selected === part.id ? part.description : "View detail"}</i></button>)}</div>;
}
]]>
    </file>
    <file path="src/app/(amaoto)/amaoto/ui/ThreadLine.tsx">
<![CDATA[export function ThreadLine({ progress = 0 }: { progress?: number }) { return <div className="am-threadline" style={{ "--thread-progress": `${progress * 100}%` } as React.CSSProperties}><span /></div>; }
]]>
    </file>
  </files>
</template>
