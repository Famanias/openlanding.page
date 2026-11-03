<template slug="lenus" name="LENUS">
  <dependencies>
    {
      "dependencies": {
        "three": "^0.186.1",
        "lucide-react": "0.475.0"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(lenus)/layout.tsx">
<![CDATA[import type {Metadata,Viewport} from "next";
import {Archivo,Plus_Jakarta_Sans,JetBrains_Mono} from "next/font/google";
import "./lenus/lenus.css";
const display=Archivo({subsets:["latin"],axes:["wdth"],variable:"--font-ln-display",display:"swap"});
const body=Plus_Jakarta_Sans({subsets:["latin"],weight:["400","500","600","700"],variable:"--font-ln-sans",display:"swap"});
const mono=JetBrains_Mono({subsets:["latin"],weight:["400","500"],variable:"--font-ln-mono",display:"swap",preload:false});
export const metadata:Metadata={title:"LENUS — Reality is just the start.",description:"An independent experience studio at the intersection of design and technology. Step inside an interactive world of light, glass and possibility."};
export const viewport:Viewport={themeColor:"#08090D",colorScheme:"dark"};
export default function LenusLayout({children}:{children:React.ReactNode}){
  return <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}><body className="ln-body"><noscript><style>{`.ln-lens-fallback{visibility:visible!important;opacity:1!important}.ln-headline-line>span,.ln-header,.ln-subtitle,.ln-step-inside,.ln-copy-footnote{animation:none!important;opacity:1!important;transform:none!important}`}</style></noscript>{children}</body></html>;
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#08090D"/><circle cx="32" cy="32" r="24" stroke="#D2F802" stroke-width="2" fill="none"/><circle cx="32" cy="32" r="18" stroke="#A855F7" fill="none"/><circle cx="32" cy="32" r="12" stroke="#F8FAFC" fill="#10131C"/><circle cx="32" cy="32" r="7" fill="#00E599"/></svg>
]]>
    </file>
    <file path="src/app/(lenus)/lenus/lenus.css">
<![CDATA[@import "tailwindcss";
@theme {
  --color-ln-midnight:#08090D;
  --color-ln-cosmos:#10131C;
  --color-ln-glass:#161924;
  --color-ln-white:#F8FAFC;
  --color-ln-muted:#9499A6;
  --color-ln-lime:#D2F802;
  --color-ln-violet:#A855F7;
  --color-ln-emerald:#00E599;
  --color-ln-button-ink:#0A0B0E;
  --font-ln-heading:var(--font-ln-display),sans-serif;
  --font-ln-body:var(--font-ln-sans),system-ui,sans-serif;
  --font-ln-data:var(--font-ln-mono),monospace;
  --ease-ln-out:cubic-bezier(.22,1,.36,1);
  --duration-ln-ui:300ms;
  --duration-ln-reveal:800ms;
}
.ln-body{margin:0;background:var(--color-ln-midnight);color:var(--color-ln-white);font-family:var(--font-ln-body);-webkit-font-smoothing:antialiased}
.ln-body *{box-sizing:border-box}
:where(.ln-body) :where(button,input,select,textarea){font:inherit}
.ln-body button,.ln-body a,.ln-body input,.ln-body select,.ln-body textarea{-webkit-tap-highlight-color:transparent}
.ln-body button{cursor:pointer}
.ln-body button:disabled{cursor:default;opacity:.4}
.ln-body :focus-visible{outline:2px solid var(--color-ln-lime);outline-offset:5px}
.ln-body ::selection{background:var(--color-ln-lime);color:var(--color-ln-button-ink)}
.ln-sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.ln-skip{position:fixed;top:8px;left:24px;z-index:100;padding:12px 16px;background:var(--color-ln-lime);color:var(--color-ln-button-ink);transform:translateY(-160%)}
.ln-skip:focus{transform:none}
.ln-experience{position:relative;isolation:isolate;min-height:100svh;overflow:clip}
.ln-space{position:absolute;inset:0;z-index:-1;pointer-events:none;background:radial-gradient(ellipse at 79% 73%,color-mix(in srgb,var(--color-ln-violet) 14%,transparent),transparent 40%),radial-gradient(ellipse at 54% 4%,var(--color-ln-cosmos),transparent 55%)}
.ln-space::before{content:"";position:absolute;width:90vw;height:90vw;right:-27vw;top:-17vw;border-radius:50%;background:repeating-conic-gradient(from 22deg,transparent 0deg 14deg,color-mix(in srgb,var(--color-ln-muted) 6%,transparent) 14deg 14.4deg,transparent 14.4deg 29deg);border:1px solid color-mix(in srgb,var(--color-ln-muted) 6%,transparent);box-shadow:0 0 0 60px color-mix(in srgb,var(--color-ln-cosmos) 22%,transparent),0 0 0 110px color-mix(in srgb,var(--color-ln-muted) 3%,transparent)}
.ln-space::after{content:"";position:absolute;inset:0;opacity:.45;background-image:radial-gradient(circle at 45% 21%,var(--color-ln-muted) 0 1px,transparent 2px),radial-gradient(circle at 55% 68%,var(--color-ln-white) 0 1px,transparent 2px),radial-gradient(circle at 91% 38%,var(--color-ln-violet) 0 1px,transparent 2px);background-size:237px 257px,393px 443px,413px 379px;mask-image:linear-gradient(90deg,transparent 30%,var(--color-ln-midnight) 70%)}
.ln-header{position:relative;z-index:20;display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:32px;margin:16px 20px;padding:16px 24px 16px 32px;border:1px solid color-mix(in srgb,var(--color-ln-muted) 17%,transparent);border-radius:24px;background:color-mix(in srgb,var(--color-ln-glass) 35%,transparent);backdrop-filter:blur(20px)}
.ln-wordmark{display:block;width:119px;color:color-mix(in srgb,var(--color-ln-white) 75%,var(--color-ln-muted))}
.ln-wordmark svg{display:block;width:100%;height:24px}
.ln-desktop-nav{display:flex;gap:40px}
.ln-desktop-nav button{position:relative;padding:8px 0;border:0;color:var(--color-ln-muted);background:transparent;font-size:14px;line-height:20px;transition:color var(--duration-ln-ui) var(--ease-ln-out)}
.ln-desktop-nav button::after{content:"";position:absolute;inset:auto 0 0;height:1px;background:var(--color-ln-lime);transform:scaleX(0);transform-origin:left;transition:transform var(--duration-ln-ui) var(--ease-ln-out)}
.ln-button{border:0;border-radius:999px;display:inline-flex;align-items:center;justify-content:center;gap:16px;background:var(--color-ln-lime);color:var(--color-ln-button-ink);font-weight:700;font-size:16px;line-height:24px;transition:transform var(--duration-ln-ui) var(--ease-ln-out),background var(--duration-ln-ui) var(--ease-ln-out)}
.ln-contact-cta{justify-self:end;min-height:40px;padding:8px 20px;font-size:14px;line-height:20px}
.ln-menu-toggle{display:none;background:transparent;color:var(--color-ln-white);border:0;padding:8px}
.ln-mobile-menu[hidden]{display:none}
.ln-mobile-menu{position:absolute;top:calc(100% + 12px);left:0;right:0;background:var(--color-ln-glass);border:1px solid color-mix(in srgb,var(--color-ln-muted) 24%,transparent);padding:32px 24px;border-radius:24px;min-height:calc(100svh - 116px);display:flex;flex-direction:column;justify-content:center;gap:16px}
.ln-mobile-menu button{background:none;color:var(--color-ln-white);border:0;text-align:left;padding:16px 0;font-family:var(--font-ln-heading);font-size:30px;line-height:36px}
.ln-mobile-menu button span{display:inline-block;width:40px;color:var(--color-ln-muted);font-family:var(--font-ln-data);font-size:12px}
.ln-hero{max-width:1920px;margin:auto;display:grid;grid-template-columns:44% 56%;padding:8px clamp(24px,4.5vw,88px) 24px;align-items:start}
.ln-hero-copy{position:relative;z-index:2;padding:clamp(48px,8vh,96px) 0 64px}
.ln-hero-copy h1{margin:0 0 24px;font-family:var(--font-ln-heading);font-variation-settings:"wdth" 75;font-size:clamp(80px,8.4vw,132px);font-weight:800;letter-spacing:-.065em;line-height:.96}
.ln-headline-line{display:block;white-space:nowrap;overflow:clip;padding-bottom:.055em;margin-bottom:-.055em}
.ln-headline-line>span{display:inline-block}
.ln-headline-lime{color:var(--color-ln-lime)}
.ln-headline-white{color:var(--color-ln-white)}
.ln-headline-violet{color:var(--color-ln-violet);margin-left:.08em;text-shadow:0 0 44px color-mix(in srgb,var(--color-ln-violet) 28%,transparent)}
.ln-subtitle{max-width:460px;margin:0 0 32px;color:var(--color-ln-muted);font-size:20px;line-height:1.6;text-wrap:pretty}
.ln-step-inside{padding:16px 24px;min-height:56px}
.ln-step-inside svg{transition:transform var(--duration-ln-ui) var(--ease-ln-out)}
.ln-copy-footnote{display:flex;gap:12px;align-items:center;margin-top:64px;font-family:var(--font-ln-data);font-size:10px;letter-spacing:.05em;color:var(--color-ln-muted)}
.ln-copy-footnote>span{color:var(--color-ln-lime);font-size:18px}
.ln-stage{position:relative;min-width:0;display:grid;justify-items:stretch}
.ln-lens-plot{position:relative;height:clamp(400px,66vh,680px);min-width:0}
.ln-aperture{position:absolute;left:50%;top:50%;width:140%;aspect-ratio:1;transform:translate(-50%,-50%) rotate(-12deg);border-radius:50%;background:repeating-radial-gradient(circle at center,transparent 0 10%,color-mix(in srgb,var(--color-ln-muted) 6%,transparent) 10.1% 10.3%,transparent 10.5% 13%);mask-image:radial-gradient(circle,transparent 36%,var(--color-ln-midnight) 65%,transparent 72%);pointer-events:none}
.ln-canvas-host,.ln-lens-fallback{position:absolute;inset:0;outline-offset:-8px}
.ln-canvas-host{z-index:2;cursor:grab}
.ln-canvas-host:active{cursor:grabbing}
.ln-canvas-host canvas{width:100%;height:100%;display:block}
.ln-lens-fallback{visibility:visible;opacity:1;transition:opacity var(--duration-ln-ui) var(--ease-ln-out)}
.ln-lens-fallback svg{display:block;width:100%;height:100%}
.ln-stage[data-state="running"] .ln-lens-fallback,.ln-stage[data-state="paused"] .ln-lens-fallback{visibility:hidden;opacity:0}
.ln-stage[data-state="lost"] canvas{visibility:hidden}
.ln-stage-marker{position:absolute;pointer-events:none;color:var(--color-ln-muted);font-family:var(--font-ln-data);font-size:9px;line-height:16px;letter-spacing:.08em;opacity:.6;z-index:3}
.ln-stage-marker-top{top:8px;right:0}.ln-stage-marker-bottom{bottom:8px;left:8px}
.ln-stage-marker-bottom span{margin-left:16px}
.ln-stage-help{color:var(--color-ln-muted);font-size:11px;text-align:right;line-height:16px;margin:8px 0 12px}
.ln-hud{width:min(100%,360px);justify-self:end;position:relative;z-index:4;padding:16px 20px;border:1px solid color-mix(in srgb,var(--color-ln-muted) 20%,transparent);background:color-mix(in srgb,var(--color-ln-glass) 60%,transparent);border-radius:16px;backdrop-filter:blur(20px)}
.ln-hud-top,.ln-hud-actions,.ln-playback{display:flex;align-items:center;justify-content:space-between;gap:12px}
.ln-micro,.ln-status,.ln-part-material,.ln-hud-sliders label{font-family:var(--font-ln-data);font-size:9px;line-height:16px;color:var(--color-ln-muted)}
.ln-status{white-space:nowrap;display:flex;gap:6px;align-items:center}
.ln-status i{width:4px;height:4px;background:var(--color-ln-muted);border-radius:50%}.ln-status[data-live="true"] i{background:var(--color-ln-emerald)}
.ln-part-readout{margin:12px 0}
.ln-part-readout select{appearance:auto;width:100%;border:0;background:transparent;color:var(--color-ln-white);font-family:var(--font-ln-data);font-size:11px;font-weight:500;padding:0 0 4px;cursor:pointer}
.ln-part-readout option{background:var(--color-ln-glass);color:var(--color-ln-white)}
.ln-part-material{margin:0;font-size:8px}.ln-part-description{font-size:10px;line-height:16px;color:var(--color-ln-muted);margin:4px 0 0;min-height:16px}
.ln-explode{display:inline-flex;gap:8px;align-items:center;background:none;border:0;padding:8px 0;color:var(--color-ln-lime);font-size:10px;font-weight:700;white-space:nowrap}
.ln-icon-button{border:0;border-radius:6px;padding:6px;background:transparent;color:var(--color-ln-muted);display:inline-flex;align-items:center;justify-content:center;transition:color var(--duration-ln-ui) var(--ease-ln-out),transform var(--duration-ln-ui) var(--ease-ln-out)}
.ln-playback{gap:4px}.ln-hud-sliders{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:4px}.ln-hud-sliders label{display:block;font-size:8px}
.ln-hud-sliders label>span{display:flex;justify-content:space-between;gap:4px}.ln-hud-sliders output{color:var(--color-ln-white);font-variant-numeric:tabular-nums}
.ln-hud input[type="range"]{display:block;width:100%;height:16px;margin:4px 0 0;accent-color:var(--color-ln-lime);cursor:pointer}
.ln-hud input[type="range"]:disabled{cursor:default;opacity:.4}
.ln-footer{max-width:1920px;margin:auto;padding:8px clamp(24px,4.5vw,88px) 24px;display:flex;justify-content:space-between;gap:24px;color:var(--color-ln-muted);font-family:var(--font-ln-data);font-size:9px;line-height:16px}
.ln-footer a{color:inherit;text-decoration:none}.ln-footer a:hover{color:var(--color-ln-white)}
.ln-footer a{display:inline-flex;align-items:center;gap:8px}
.ln-stage-slot{min-width:0}
.ln-dialog{position:fixed;inset:0;margin:auto;padding:0;width:min(760px,calc(100vw - 40px));max-height:calc(100svh - 64px);overflow:auto;border:1px solid color-mix(in srgb,var(--color-ln-muted) 24%,transparent);border-radius:24px;background:var(--color-ln-glass);color:var(--color-ln-white);box-shadow:0 32px 96px color-mix(in srgb,var(--color-ln-midnight) 80%,transparent)}
.ln-dialog::backdrop{background:color-mix(in srgb,var(--color-ln-midnight) 80%,transparent);backdrop-filter:blur(12px)}
.ln-dialog-close{position:sticky;left:calc(100% - 56px);top:16px;z-index:2;background:var(--color-ln-glass);border-radius:50%;width:40px;height:40px}
.ln-dialog-content{padding:16px 48px 48px}
.ln-dialog-eyebrow{font-family:var(--font-ln-data);font-size:10px;line-height:16px;color:var(--color-ln-lime);letter-spacing:.08em}
.ln-dialog h2{font-family:var(--font-ln-heading);font-size:clamp(30px,4vw,48px);line-height:1.1;letter-spacing:-.045em;margin:16px 0 24px;text-wrap:balance}
.ln-dialog-intro{font-size:16px;line-height:26px;color:var(--color-ln-muted);max-width:560px}
.ln-dialog-studies{display:grid;gap:12px;margin:32px 0}
.ln-dialog-studies article{border:1px solid color-mix(in srgb,var(--color-ln-muted) 16%,transparent);border-radius:12px;padding:20px 24px;background:color-mix(in srgb,var(--color-ln-cosmos) 60%,transparent)}
.ln-dialog-studies article>span{font-family:var(--font-ln-data);font-size:9px;line-height:16px;color:var(--color-ln-lime)}
.ln-dialog h3{font-weight:600;font-size:20px;line-height:28px;letter-spacing:-.025em;margin:8px 0}
.ln-dialog-studies p,.ln-brief-success p{font-size:14px;line-height:24px;color:var(--color-ln-muted);margin:0}
.ln-text-button{display:inline-flex;align-items:center;gap:12px;color:var(--color-ln-lime);border:0;background:transparent;font-size:12px;line-height:20px;padding:8px 0;text-underline-offset:6px}
.ln-text-button:hover{text-decoration:underline}
.ln-contact-form{display:grid;gap:20px;margin-top:32px}
.ln-contact-form label{display:grid;gap:8px;font-size:12px;line-height:20px}
.ln-contact-form input,.ln-contact-form textarea{display:block;min-width:0;width:100%;border:1px solid color-mix(in srgb,var(--color-ln-muted) 35%,transparent);border-radius:8px;background:var(--color-ln-cosmos);color:var(--color-ln-white);padding:12px 16px;font-size:16px;line-height:24px;resize:vertical;transition:border-color var(--duration-ln-ui) var(--ease-ln-out)}
.ln-contact-form [aria-invalid="true"]{border-color:var(--color-ln-violet)}
.ln-field-error{font-size:12px;color:var(--color-ln-white)}
.ln-form-note{font-size:11px;line-height:18px;color:var(--color-ln-muted);margin:0}
.ln-contact-form .ln-button{justify-self:start;padding:12px 20px}
.ln-brief-success{display:grid;justify-items:start;gap:20px;margin-top:32px}.ln-brief-success>svg{color:var(--color-ln-emerald)}.ln-brief-success .ln-button{padding:12px 20px}
@media(hover:hover) and (pointer:fine){.ln-desktop-nav button:hover{color:var(--color-ln-white)}.ln-desktop-nav button:hover::after{transform:scaleX(1)}.ln-button:hover{background:color-mix(in srgb,var(--color-ln-lime) 86%,var(--color-ln-white));transform:translateY(-2px)}.ln-step-inside:hover svg{transform:translateX(5px)}.ln-icon-button:hover{color:var(--color-ln-lime)}}
.ln-button:active,.ln-icon-button:active{transform:scale(.97)}
@media(prefers-reduced-motion:no-preference){
  @keyframes ln-rise{from{transform:translateY(110%)}to{transform:translateY(0)}}
  @keyframes ln-settle{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  .ln-headline-line>span{animation:ln-rise var(--duration-ln-reveal) var(--ease-ln-out) both;animation-delay:180ms}
  .ln-headline-line:nth-child(2)>span{animation-delay:250ms}.ln-headline-line:nth-child(3)>span{animation-delay:320ms}
  .ln-header{animation:ln-settle var(--duration-ln-reveal) var(--ease-ln-out) both}
  .ln-subtitle,.ln-step-inside,.ln-copy-footnote{animation:ln-settle var(--duration-ln-reveal) var(--ease-ln-out) both;animation-delay:500ms}
  .ln-step-inside{animation-delay:600ms}.ln-copy-footnote{animation-delay:700ms}
  .ln-dialog[open] .ln-dialog-content,.ln-brief-success{animation:ln-settle var(--duration-ln-reveal) var(--ease-ln-out) both}
}
@media(max-width:1100px){.ln-desktop-nav{gap:24px}.ln-header{gap:24px}.ln-hero-copy h1{font-size:clamp(80px,8vw,104px)}.ln-subtitle{font-size:18px}.ln-desktop-break{display:none}}
@media(max-width:959px){.ln-hero{grid-template-columns:1fr;padding-inline:40px;max-width:800px}.ln-hero-copy{padding:48px 0 16px}.ln-hero-copy h1{font-size:clamp(64px,11vw,100px);max-width:680px}.ln-subtitle{max-width:480px}.ln-copy-footnote{margin-top:32px}.ln-lens-plot{height:620px}.ln-hud{justify-self:center}.ln-stage-help{text-align:center}.ln-stage-marker-top{right:8px}.ln-footer{margin-top:32px}}
@media(max-width:700px){.ln-header{display:flex;gap:12px;justify-content:space-between;margin:12px 16px;padding:16px 20px;border-radius:20px}.ln-wordmark{width:100px}.ln-desktop-nav,.ln-contact-cta{display:none}.ln-menu-toggle{display:flex}.ln-hero{padding:0 24px 24px}.ln-hero-copy{padding-top:32px;padding-bottom:16px}.ln-hero-copy h1{font-size:clamp(52px,14.8vw,88px);letter-spacing:-.065em;margin-bottom:24px}.ln-subtitle{font-size:16px;line-height:26px;margin-bottom:24px}.ln-step-inside{min-height:52px;padding:12px 20px;font-size:14px}.ln-copy-footnote{display:none}.ln-lens-plot{height:auto;aspect-ratio:1;min-height:0;margin:24px -8px 0}.ln-hud{width:100%;padding:16px}.ln-stage-marker{font-size:8px}.ln-stage-help{font-size:10px;margin-bottom:16px}.ln-footer{padding-inline:24px;flex-wrap:wrap;font-size:8px}.ln-space::before{top:30%;width:160vw;height:160vw;right:-70vw}}
@media(prefers-reduced-motion:reduce){.ln-body *,.ln-body *::before,.ln-body *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}.ln-lens-fallback{visibility:visible!important;opacity:1!important}}
@media(max-width:700px){.ln-dialog{width:calc(100vw - 24px);max-height:calc(100svh - 24px);border-radius:20px}.ln-dialog-content{padding:12px 24px 32px}.ln-dialog h2{font-size:36px}.ln-dialog-studies article{padding:16px}.ln-dialog-close{top:8px;left:calc(100% - 48px)}}
/* Optical labels remain readable at their actual phone rendering size. */
.ln-copy-footnote,.ln-stage-marker,.ln-stage-help,.ln-micro,.ln-status,.ln-part-material,.ln-part-description,.ln-explode,.ln-hud-sliders label,.ln-footer,.ln-dialog-eyebrow,.ln-form-note{font-size:12px;line-height:18px}
.ln-part-readout select{font-size:12px;line-height:20px}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/LenusApp.tsx">
<![CDATA["use client";
import { useEffect,useRef,useState,type MouseEvent } from "react";
import Link from "next/link";
import { ArrowUpRight,X } from "lucide-react";
import LenusHeader,{type LenusDialogSection} from "./components/LenusHeader";
import LenusHeroCopy from "./components/LenusHeroCopy";
import LenusOpticalLensCanvas from "./components/LenusOpticalLensCanvas";
import {ProjectBriefForm} from "./forms/ProjectBriefForm";

const content={
  work:{eyebrow:"SELECTED DIRECTIONS",title:"Beyond the screen.",description:"A few of the worlds we like to build.",items:[{name:"FIELD / 01",title:"A brand you can step inside.",text:"Spatial storytelling that turns a launch into somewhere people want to explore."},{name:"AFTERIMAGE / 02",title:"Products in a new light.",text:"Interactive product worlds, built around the details that make them different."},{name:"COMMON GROUND / 03",title:"Digital, with a human pulse.",text:"Considered interfaces that connect a clear idea with a memorable experience."}]},
  expertise:{eyebrow:"OUR PRACTICE",title:"From possibility to presence.",description:"Strategy, design and technology, brought into focus together.",items:[{name:"01 / STRATEGY",title:"Find the unexpected.",text:"Brand direction, experience strategy and the right question to start with."},{name:"02 / DESIGN",title:"Make it felt.",text:"Visual identities, digital experiences and purposeful motion that reward curiosity."},{name:"03 / DEVELOPMENT",title:"Bring it to life.",text:"Creative development, real-time worlds and thoughtful interaction across devices."}]},
  technology:{eyebrow:"THE OPTICAL ENGINE",title:"Made to move you.",description:"Technology is part of the story. Explore the lens to see it at work.",items:[{name:"REAL LIGHT",title:"Depth you can feel.",text:"Physical glass, chromatic dispersion and a procedural reflection environment give every surface its own response."},{name:"REAL INTERACTION",title:"Look a little closer.",text:"Separate 19 optical components, turn the focus collar, and inspect the architecture from another angle."},{name:"CONSIDERED MOTION",title:"At your pace.",text:"Motion pauses when you do. A complete still preview keeps the experience open to everyone."}]},
  about:{eyebrow:"HELLO, WE’RE LENUS",title:"Curious by nature.",description:"We’re an independent experience studio working where design and technology meet. We build things that make people look twice.",items:[{name:"OUR POINT OF VIEW",title:"The expected is a starting point.",text:"Good experiences begin with a clear idea, grow through experimentation, and leave room for discovery. That’s the space we work in."}]},
};

export default function LenusApp(){
  const [activeDialog,setActiveDialog]=useState<LenusDialogSection>(null);
  const [explodeFromCta,setExplodeFromCta]=useState(0);
  const dialog=useRef<HTMLDialogElement>(null),stage=useRef<HTMLDivElement>(null),opener=useRef<HTMLElement|null>(null);
  useEffect(()=>{
    const panel=dialog.current;if(!activeDialog||!panel)return;
    const overflow=document.body.style.overflow;
    panel.showModal();document.body.style.overflow="hidden";
    return()=>{
      panel.close();document.body.style.overflow=overflow;
      const target=opener.current;
      if(target?.getClientRects().length)target.focus();
      else document.querySelector<HTMLButtonElement>('.ln-menu-toggle')?.focus();
    };
  },[activeDialog]);
  const navigate=(section:Exclude<LenusDialogSection,null>)=>{opener.current=document.activeElement instanceof HTMLElement?document.activeElement:null;setActiveDialog(section);};
  const close=()=>setActiveDialog(null);
  const backdrop=(event:MouseEvent<HTMLDialogElement>)=>{
    if(event.target!==event.currentTarget)return;
    const r=event.currentTarget.getBoundingClientRect();
    if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close();
  };
  const stepInside=()=>{
    setExplodeFromCta(count=>count+1);
    const target=stage.current?.querySelector<HTMLElement>('[data-testid="lenus-canvas-container"]');
    target?.focus({preventScroll:true});target?.scrollIntoView({block:"center",behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
  };
  const details=activeDialog&&activeDialog!=="contact"?content[activeDialog]:null;
  return <div className="ln-experience" id="top">
    <a className="ln-skip" href="#ln-main">Skip to content</a><div className="ln-space" aria-hidden="true"/>
    <LenusHeader onNavigate={navigate}/>
    <main className="ln-hero" id="ln-main"><LenusHeroCopy onStepInside={stepInside}/><div className="ln-stage-slot" ref={stage}><LenusOpticalLensCanvas suspended={activeDialog!==null} externalExplodeRequest={explodeFromCta}/></div></main>
    <footer className="ln-footer"><span>INDEPENDENT MINDS. SHARED POSSIBILITIES.</span><Link href="/">EXPLORE THE GALLERY <ArrowUpRight size={11} aria-hidden="true"/></Link></footer>
    <dialog ref={dialog} className="ln-dialog" aria-labelledby="ln-dialog-title" onCancel={event=>{event.preventDefault();close();}} onClick={backdrop}>
      <button type="button" className="ln-dialog-close ln-icon-button" aria-label="Close panel" onClick={close}><X size={22} aria-hidden="true"/></button>
      <div className="ln-dialog-content">
        <span className="ln-dialog-eyebrow">{activeDialog==="contact"?"LET’S MAKE SOMETHING MATTER.":details?.eyebrow}</span>
        <h2 id="ln-dialog-title">{activeDialog==="contact"?"What’s your next possibility?":details?.title}</h2>
        {activeDialog==="contact"?<ProjectBriefForm/>:details&&<><p className="ln-dialog-intro">{details.description}</p><div className="ln-dialog-studies">{details.items.map(item=><article key={item.name}><span>{item.name}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div><button type="button" className="ln-text-button" onClick={close}>BACK TO THE EXPERIENCE <ArrowUpRight size={16} aria-hidden="true"/></button></>}
      </div>
    </dialog>
  </div>;
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/opengraph-image.tsx">
<![CDATA[import {ImageResponse} from "next/og";
export const alt="LENUS — Reality is just the start.";
export const size={width:1200,height:630};
export const contentType="image/png";
export default function OpenGraphImage(){
  return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",background:"#08090D",color:"#F8FAFC",padding:64,position:"relative",overflow:"hidden",fontFamily:"sans-serif"}}>
    <div style={{display:"flex",flexDirection:"column",zIndex:2}}><div style={{fontSize:24,letterSpacing:4,marginBottom:64}}>LENUS</div><div style={{color:"#D2F802",fontSize:76,fontWeight:800,lineHeight:1}}>REALITY</div><div style={{fontSize:76,fontWeight:800,lineHeight:1}}>IS JUST</div><div style={{display:"flex",fontSize:76,fontWeight:800,lineHeight:1}}>THE <span style={{color:"#A855F7",marginLeft:16}}>START.</span></div><div style={{fontSize:20,color:"#9499A6",marginTop:32}}>Experiences beyond the expected.</div></div>
    <div style={{position:"absolute",left:610,top:65,width:510,height:510,borderRadius:"50%",border:"22px solid #9499A6",display:"flex",alignItems:"center",justifyContent:"center",transform:"rotate(-15deg)",background:"#10131C"}}><div style={{width:430,height:430,border:"3px solid #A855F7",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:350,height:350,border:"18px solid #161924",outline:"2px solid #D2F802",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:190,height:190,border:"10px solid #9499A6",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:124,height:124,borderRadius:"50%",background:"#00E599"}}/></div></div></div></div>
  </div>,size);
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/page.tsx">
<![CDATA[import LenusApp from "./LenusApp";
export default function LenusPage(){return <LenusApp/>;}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/components/LenusHeader.tsx">
<![CDATA["use client";
import { useEffect,useRef,useState } from "react";
import { Menu,X } from "lucide-react";
export type LenusDialogSection="work"|"expertise"|"technology"|"about"|"contact"|null;
const sections=["work","expertise","technology","about"] as const;

export default function LenusHeader({onNavigate}:{onNavigate:(section:Exclude<LenusDialogSection,null>)=>void}){
  const [open,setOpen]=useState(false);
  const header=useRef<HTMLElement>(null),toggle=useRef<HTMLButtonElement>(null);
  useEffect(()=>{
    if(!open)return;
    const previous=document.body.style.overflow;document.body.style.overflow="hidden";
    const key=(event:globalThis.KeyboardEvent)=>{
      if(event.key==="Escape"){setOpen(false);toggle.current?.focus();}
      if(event.key==="Tab"){
        const items=Array.from(header.current?.querySelectorAll<HTMLElement>('button:not([disabled]),a[href]')??[]).filter(el=>el.getClientRects().length);
        const first=items[0],last=items.at(-1);
        if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}
        else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}
      }
    };
    document.addEventListener("keydown",key);
    return()=>{document.body.style.overflow=previous;document.removeEventListener("keydown",key);};
  },[open]);
  const navigate=(section:Exclude<LenusDialogSection,null>)=>{setOpen(false);onNavigate(section);};
  return <header className="ln-header" ref={header}>
    <a href="#top" className="ln-wordmark" aria-label="LENUS home">
      <span className="ln-sr-only">LENUS</span>
      <svg viewBox="0 0 171 26" aria-hidden="true"><path d="M2 2V24H28M36 3H62M36 13H59M36 23H62M72 24V3L99 23V2M110 2V17Q110 24 119 24H125Q134 24 134 17V2M169 3H149Q143 3 143 8Q143 13 149 13H162Q168 13 168 18Q168 23 162 23H142" fill="none" stroke="currentColor" strokeWidth="3.8" strokeLinejoin="round"/></svg>
    </a>
    <nav className="ln-desktop-nav" aria-label="Main navigation">{sections.map(section=><button key={section} type="button" aria-haspopup="dialog" onClick={()=>navigate(section)}>{section.toUpperCase()}</button>)}</nav>
    <button type="button" className="ln-button ln-contact-cta" aria-haspopup="dialog" onClick={()=>navigate("contact")}>GET IN TOUCH</button>
    <button ref={toggle} type="button" className="ln-menu-toggle" aria-label="Toggle navigation" aria-expanded={open} aria-controls="ln-mobile-menu" onClick={()=>setOpen(value=>!value)}>{open?<X aria-hidden="true"/>:<Menu aria-hidden="true"/>}</button>
    <nav id="ln-mobile-menu" className="ln-mobile-menu" hidden={!open} aria-label="Mobile navigation">{[...sections,"contact" as const].map((section,i)=><button key={section} type="button" aria-haspopup="dialog" onClick={()=>navigate(section)}><span>0{i+1}</span>{section==="contact"?"GET IN TOUCH":section.toUpperCase()}</button>)}</nav>
  </header>;
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/components/LenusHeroCopy.tsx">
<![CDATA[import { ArrowRight } from "lucide-react";
export default function LenusHeroCopy({onStepInside}:{onStepInside:()=>void}){
  return <div className="ln-hero-copy">
    <h1 aria-label="REALITY IS JUST THE START.">
      <span className="ln-headline-line" aria-hidden="true"><span className="ln-headline-lime">REALITY</span></span>
      <span className="ln-headline-line" aria-hidden="true"><span className="ln-headline-white">IS JUST</span></span>
      <span className="ln-headline-line" aria-hidden="true"><span><span className="ln-headline-white">THE </span><span className="ln-headline-violet">START.</span></span></span>
    </h1>
    <p className="ln-subtitle">We build experiences that move brands<br className="ln-desktop-break"/> beyond the expected.</p>
    <button type="button" className="ln-button ln-step-inside" onClick={onStepInside}>STEP INSIDE <ArrowRight aria-hidden="true" size={27}/></button>
    <div className="ln-copy-footnote"><span aria-hidden="true">↗</span> A DIFFERENT WAY TO SEE WHAT’S NEXT.</div>
  </div>;
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/components/LenusHudControls.tsx">
<![CDATA[import { Layers, Pause, Play, RotateCcw } from "lucide-react";
import { OPTICAL_PARTS, type LenusPartInfo } from "../scene/telemetry";

export type LenusStageState="preview"|"running"|"paused"|"static"|"unavailable"|"lost";
type Props={
  state:LenusStageState; fps:number; exploded:boolean; explodeAmount:number; focusAngle:number; activePart:LenusPartInfo; paused:boolean;
  onToggleExplode:()=>void; onExplodeChange:(value:number)=>void; onFocusChange:(radians:number)=>void;
  onResetView:()=>void; onTogglePause:()=>void; onPartSelect?:(id:string)=>void;
};
export function LenusHudControls(p:Props){
  const disabled=!["running","paused"].includes(p.state);
  const status=p.state==="running"?`${p.fps || "—"} FPS`:({preview:"PREVIEW",static:"STILL MODE",unavailable:"STATIC PREVIEW",lost:"RECONNECTING",paused:"PAUSED"}[p.state]);
  return <aside className="ln-hud" aria-label="Optical lens controls">
    <div className="ln-hud-top"><span className="ln-micro">OPTICAL ENGINE / 01</span><span className="ln-status" data-live={p.state==="running"}><i aria-hidden="true"/>{status}</span></div>
    <div className="ln-part-readout">
      <label className="ln-sr-only" htmlFor="ln-part">Inspect an optical part</label>
      <select id="ln-part" value={p.activePart.id} onChange={e=>p.onPartSelect?.(e.target.value)} aria-label="Inspect an optical part">
        {OPTICAL_PARTS.map(part=><option key={part.id} value={part.id}>{part.label}</option>)}
      </select>
      <p className="ln-part-material">{p.activePart.material}</p>
      <p className="ln-part-description">{p.activePart.role}</p>
    </div>
    <div className="ln-hud-actions">
      <button type="button" className="ln-explode" aria-pressed={p.exploded} onClick={p.onToggleExplode} disabled={disabled}><Layers size={14} aria-hidden="true"/>EXPLODE ASSEMBLY</button>
      <div className="ln-playback"><button type="button" className="ln-icon-button" aria-label="Reset optical view" title="Reset view (R)" onClick={p.onResetView} disabled={disabled}><RotateCcw size={15} aria-hidden="true"/></button><button type="button" className="ln-icon-button" aria-label={p.paused?"Play animation":"Pause animation"} onClick={p.onTogglePause} disabled={disabled}>{p.paused?<Play size={15} aria-hidden="true"/>:<Pause size={15} aria-hidden="true"/>}</button></div>
    </div>
    <div className="ln-hud-sliders">
      <label><span>SEPARATION <output>{Math.round(p.explodeAmount*100)}%</output></span><input type="range" min="0" max="1" step=".01" value={p.explodeAmount} aria-label="Explode optical assembly" disabled={disabled} onChange={e=>p.onExplodeChange(Number(e.target.value))}/></label>
      <label><span>FOCUS COLLAR <output>{Math.round(p.focusAngle*180/Math.PI)}°</output></span><input type="range" min="-1.57" max="1.57" step=".01" value={p.focusAngle} aria-label="Focus ring rotation" disabled={disabled} onChange={e=>p.onFocusChange(Number(e.target.value))}/></label>
    </div>
  </aside>;
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/components/LenusLensFallback.tsx">
<![CDATA[import { useId } from "react";

export default function LenusLensFallback(){
  const id=useId().replaceAll(":","");
  return <div className="ln-lens-fallback">
    <svg viewBox="-280 -280 560 560" role="img" aria-labelledby={`${id}-title`}>
      <title id={`${id}-title`}>Optical lens with fluted glass, titanium collars and an emerald core</title>
      <defs>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F8FAFC" stopOpacity=".8"/><stop offset=".16" stopColor="#10131C"/>
          <stop offset=".3" stopColor="#F8FAFC" stopOpacity=".9"/><stop offset=".43" stopColor="#161924"/>
          <stop offset=".65" stopColor="#9499A6"/><stop offset=".77" stopColor="#10131C"/>
          <stop offset=".9" stopColor="#F8FAFC"/><stop offset="1" stopColor="#A855F7" stopOpacity=".5"/>
        </linearGradient>
        <linearGradient id={`${id}-titanium`}><stop stopColor="#10131C"/><stop offset=".45" stopColor="#9499A6" stopOpacity=".45"/><stop offset="1" stopColor="#08090D"/></linearGradient>
        <radialGradient id={`${id}-core`} cx="65%" cy="48%"><stop stopColor="#F8FAFC"/><stop offset=".12" stopColor="#00E599"/><stop offset=".55" stopColor="#00E599" stopOpacity=".46"/><stop offset="1" stopColor="#08090D"/></radialGradient>
      </defs>
      <g transform="rotate(-8) scale(.88 1)">
        <circle data-optical-ring="outer" r="244" fill="none" stroke={`url(#${id}-glass)`} strokeWidth="34"/>
        <circle data-optical-ring="inner" r="198" fill="none" stroke={`url(#${id}-glass)`} strokeWidth="29"/>
        {Array.from({length:18},(_,i)=><path key={i} d="M 23 -259 C 6 -240 14 -229 36 -225" transform={`rotate(${i*20})`} fill="none" stroke="#F8FAFC" strokeWidth="1.2" opacity=".27"/>)}
        {[262,255,231,224,216,210,186,178].map((r,i)=><circle key={r} r={r} fill="none" stroke={i%3===0?"#D2F802":i%3===1?"#A855F7":"#F8FAFC"} strokeWidth={i%3===2?1.2:.65} opacity={i%3===2?.55:.65}/>)}
        <circle r="156" fill="#08090D" stroke="#161924" strokeWidth="20"/>
        {[142,120,97,69].map((r,i)=><circle key={r} r={r} fill="none" stroke={`url(#${id}-titanium)`} strokeWidth={18-i*3}/>)}
        {[153,132,111,86,67].map(r=><circle key={r} r={r} fill="none" stroke="#9499A6" strokeWidth=".7" opacity=".65"/>)}
        <circle r="60" fill={`url(#${id}-core)`} stroke="#00E599" strokeOpacity=".65" strokeWidth="1.5"/>
        <ellipse cx="-15" cy="-24" rx="18" ry="8" fill="#F8FAFC" opacity=".15" transform="rotate(-40)"/>
        {[["-120,-88 -84,-101 -72,-69 -91,-60"], ["-126,83 -91,69 -78,89 -119,99"], ["26,-133 31,-117 22,-113 18,-128"], ["-22,125 -5,117 5,133 -17,142"], ["126,32 138,27 144,37 130,43"]].map(([points],i)=><polygon key={i} points={points} fill="#9499A6" fillOpacity=".12" stroke="#F8FAFC" strokeOpacity=".7" strokeWidth=".7"/>)}
      </g>
    </svg>
  </div>;
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/components/LenusOpticalLensCanvas.tsx">
<![CDATA["use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { LenusSceneController } from "../scene/LenusSceneController";
import { getPartTelemetry } from "../scene/telemetry";
import LenusLensFallback from "./LenusLensFallback";
import { LenusHudControls, type LenusStageState } from "./LenusHudControls";

export default function LenusOpticalLensCanvas({suspended=false,externalExplodeRequest=0}:{suspended?:boolean;externalExplodeRequest?:number}){
  const host=useRef<HTMLDivElement>(null);
  const controller=useRef<LenusSceneController|null>(null);
  const synchronize=useRef<()=>void>(()=>{});
  const activate=useRef<()=>void>(()=>{});
  const pose=useRef({explode:0,focus:0});
  const policy=useRef({suspended,paused:false});
  const [state,setState]=useState<LenusStageState>("preview");
  const [fps,setFps]=useState(0);
  const [paused,setPaused]=useState(false);
  const [explodeAmount,setExplodeAmount]=useState(0);
  const [focusAngle,setFocusAngle]=useState(0);
  const [activePart,setActivePart]=useState(()=>getPartTelemetry(null));
  const [locked,setLocked]=useState(false);
  const [activationNeeded,setActivationNeeded]=useState(false);
  const lastPick=useRef(0),pointerStart=useRef({x:0,y:0});
  const instructions=useId();

  useEffect(()=>{
    policy.current={suspended,paused};synchronize.current();
  },[suspended,paused]);

  useEffect(()=>{
    const container=host.current;
    if(!container)return;
    let active=true,revision=0,inView=true,lost=false,activated=false;
    const media=window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync=()=>{
      const c=controller.current;
      if(!active||!c)return;
      const shouldRun=inView&&document.visibilityState!=="hidden"&&!policy.current.suspended&&!policy.current.paused;
      if(shouldRun)c.start();else c.stop();
      setState(lost?"lost":shouldRun?"running":"paused");
    };
    synchronize.current=sync;
    const boot=async()=>{
      if(controller.current&&!media.matches){sync();return;}
      const ticket=++revision;
      controller.current?.dispose();controller.current=null;lost=false;
      if(media.matches){setActivationNeeded(false);setState("static");return;}
      if(!activated&&(window.matchMedia("(pointer: coarse)").matches||window.innerWidth<700)){
        setActivationNeeded(true);setState("preview");return;
      }
      setActivationNeeded(false);
      setState("preview");
      try {
        const {LenusSceneController}=await import("../scene/LenusSceneController");
        if(!active||ticket!==revision||media.matches)return;
        const instance=new LenusSceneController({
          onFps:value=>{if(active&&ticket===revision)setFps(value);},
          onContextChange:value=>{if(!active||ticket!==revision)return;lost=value==="lost";sync();},
          onPartChange:part=>{if(active&&ticket===revision)setActivePart(current=>current.id===part.id?current:part);},
        });
        controller.current=instance;
        instance.init(container);
        // Commands can arrive before this import resolves or survive a preference change.
        instance.setExplodeTarget(pose.current.explode);instance.setFocusTarget(pose.current.focus);
        sync();
      } catch {
        if(active&&ticket===revision){controller.current?.dispose();controller.current=null;setState("unavailable");}
      }
    };
    activate.current=()=>{activated=true;void boot();};
    const resize=new ResizeObserver(entries=>{
      const rect=entries[0]?.contentRect;
      if(rect)controller.current?.resize(rect.width,rect.height);
    });
    resize.observe(container);
    const intersection=new IntersectionObserver(entries=>{inView=entries[0]?.isIntersecting??true;sync();},{threshold:.05});
    intersection.observe(container);
    const onPreference=()=>{void boot();};
    media.addEventListener("change",onPreference);
    document.addEventListener("visibilitychange",sync);
    // The SVG and copy paint first; reduced motion never imports the rendering engine.
    const idle="requestIdleCallback" in window;
    const timer=idle?window.requestIdleCallback(()=>{void boot();},{timeout:1500}):window.setTimeout(()=>{void boot();},0);
    return()=>{
      active=false;revision++;if(idle)window.cancelIdleCallback(timer);else window.clearTimeout(timer);resize.disconnect();intersection.disconnect();
      media.removeEventListener("change",onPreference);document.removeEventListener("visibilitychange",sync);
      synchronize.current=()=>{};activate.current=()=>{};controller.current?.dispose();controller.current=null;
    };
  },[]);

  useEffect(()=>{
    if(externalExplodeRequest>0){pose.current.explode=1;setExplodeAmount(1);controller.current?.setExplodeTarget(1);setPaused(false);activate.current();}
  },[externalExplodeRequest]);

  const changeExplode=(value:number)=>{pose.current.explode=value;setExplodeAmount(value);controller.current?.setExplodeTarget(value);};
  const changeFocus=(value:number)=>{pose.current.focus=value;setFocusAngle(value);controller.current?.setFocusTarget(value);};
  const reset=()=>{changeExplode(0);changeFocus(0);setLocked(false);setActivePart(getPartTelemetry(null));controller.current?.resetView();};
  const toggleExplode=()=>changeExplode(pose.current.explode>.5?0:1);
  const coordinates=(event:PointerEvent<HTMLDivElement>)=>{
    const canvas=controller.current?.getRenderer()?.domElement;
    const rect=(canvas??event.currentTarget).getBoundingClientRect();
    return {x:(event.clientX-rect.left)/rect.width*2-1,y:-((event.clientY-rect.top)/rect.height*2-1)};
  };
  const move=(event:PointerEvent<HTMLDivElement>)=>{
    if(state!=="running")return;
    const p=coordinates(event);controller.current?.setPointer(p.x,p.y);
    if(!locked&&!event.buttons&&performance.now()-lastPick.current>100){lastPick.current=performance.now();controller.current?.pickAtNormalizedCanvas(p.x,p.y);}
  };
  const pick=(event:PointerEvent<HTMLDivElement>)=>{
    if(Math.hypot(event.clientX-pointerStart.current.x,event.clientY-pointerStart.current.y)>6)return;
    if(activationNeeded){activate.current();return;}
    const p=coordinates(event);controller.current?.pickAtNormalizedCanvas(p.x,p.y);setLocked(true);
  };
  const keyboard=(event:KeyboardEvent<HTMLDivElement>)=>{
    if(event.target!==event.currentTarget)return;
    if(activationNeeded&&(event.key==="Enter"||event.key===" ")){event.preventDefault();activate.current();return;}
    if(!["running","paused"].includes(state))return;
    const actions:Record<string,()=>void>={ArrowLeft:()=>controller.current?.rotateView(-.12,0),ArrowRight:()=>controller.current?.rotateView(.12,0),ArrowUp:()=>controller.current?.rotateView(0,-.1),ArrowDown:()=>controller.current?.rotateView(0,.1),e:toggleExplode,E:toggleExplode,r:reset,R:reset,Home:reset,Escape:()=>setLocked(false)};
    if(actions[event.key]){event.preventDefault();actions[event.key]();}
  };
  const message:Record<LenusStageState,string>={preview:activationNeeded?"Tap the lens to explore in 3D.":"Optical preview. Interactive controls load when available.",running:"Drag to explore. Select a fragment to inspect.",paused:suspended?"Optical view paused while the panel is open.":"Optical view paused.",static:"Reduced motion is on. Showing a still optical preview.",unavailable:"Interactive graphics are unavailable. Showing a still optical preview.",lost:"Graphics connection lost. Showing the preview while reconnecting."};
  return <section className="ln-stage" data-state={state} data-exploded={explodeAmount>.5} aria-label="Optical lens experience">
    <div className="ln-lens-plot">
      <div className="ln-aperture" aria-hidden="true"/>
      <LenusLensFallback/>
      <div ref={host} className="ln-canvas-host" data-testid="lenus-canvas-container" tabIndex={0} role={activationNeeded?"button":"group"} aria-label="Interactive Lenus optical lens assembly" aria-describedby={instructions} onPointerMove={move} onPointerLeave={()=>controller.current?.setPointer(0,0)} onPointerDown={event=>{pointerStart.current={x:event.clientX,y:event.clientY};}} onPointerUp={pick} onKeyDown={keyboard}/>
      <span className="ln-stage-marker ln-stage-marker-top" aria-hidden="true">LENUS / OPTICAL SYSTEMS</span>
      <span className="ln-stage-marker ln-stage-marker-bottom" aria-hidden="true">N 1.52 <span>19 PARTS</span></span>
    </div>
    <p id={instructions} className="ln-sr-only">{activationNeeded?"Press Enter or tap to start the optical experience. ":""}Use arrow keys to rotate, E to separate the assembly, R or Home to reset. Use the part selector to inspect each component.</p>
    <p className="ln-stage-help" role="status">{message[state]}</p>
    <LenusHudControls state={state} fps={fps} paused={paused} exploded={explodeAmount>.5} explodeAmount={explodeAmount} focusAngle={focusAngle} activePart={activePart} onToggleExplode={toggleExplode} onExplodeChange={changeExplode} onFocusChange={changeFocus} onResetView={reset} onTogglePause={()=>setPaused(value=>!value)} onPartSelect={id=>{setLocked(true);setActivePart(getPartTelemetry(id));}}/>
  </section>;
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/forms/brief.ts">
<![CDATA[export type ProjectBrief={name:string;email:string;brief:string};
export function validateBrief(values:ProjectBrief):Partial<Record<keyof ProjectBrief,string>>{
  const errors:Partial<Record<keyof ProjectBrief,string>>={};
  if(!values.name.trim()||values.name.length>100)errors.name="Tell us your name.";
  if(values.email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))errors.email="Enter a valid email address.";
  if(values.brief.trim().length<20||values.brief.length>2000)errors.brief="Add at least 20 characters about your project.";
  return errors;
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/forms/ProjectBriefForm.tsx">
<![CDATA["use client";
import { useRef,useState,type FormEvent } from "react";
import { ArrowRight,Check,Download } from "lucide-react";
import {validateBrief,type ProjectBrief} from "./brief";

export function ProjectBriefForm(){
  const [values,setValues]=useState<ProjectBrief>({name:"",email:"",brief:""});
  const [errors,setErrors]=useState<Partial<Record<keyof ProjectBrief,string>>>({});
  const [prepared,setPrepared]=useState(false);
  const form=useRef<HTMLFormElement>(null);
  const submit=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();const found=validateBrief(values);setErrors(found);
    if(Object.keys(found).length){form.current?.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();return;}
    setPrepared(true);
  };
  const download=()=>{
    const text=`LENUS — Project brief\n\nName: ${values.name.trim()}\nEmail: ${values.email.trim()}\n\n${values.brief.trim()}\n\nPrepared locally. This brief has not been sent.`;
    const url=URL.createObjectURL(new Blob([text],{type:"text/plain;charset=utf-8"}));
    const link=document.createElement("a");link.href=url;link.download="lenus-project-brief.txt";link.click();
    window.setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  if(prepared)return <div className="ln-brief-success" role="status"><Check size={32} aria-hidden="true"/><h3>Your next chapter starts here.</h3><p>Your brief is ready, {values.name.trim()}. Save a copy to share with your team. It has not been sent.</p><button type="button" className="ln-button" onClick={download}>Save project brief <Download size={18} aria-hidden="true"/></button><button type="button" className="ln-text-button" onClick={()=>setPrepared(false)}>Edit your brief</button></div>;
  return <form className="ln-contact-form" ref={form} onSubmit={submit} noValidate>
    {([{key:"name",label:"Your name",type:"text",autoComplete:"name",max:100},{key:"email",label:"Email address",type:"email",autoComplete:"email",max:254}] as const).map(field=><label key={field.key} htmlFor={`ln-${field.key}`}>{field.label}<input id={`ln-${field.key}`} name={field.key} type={field.type} autoComplete={field.autoComplete} maxLength={field.max} required value={values[field.key]} aria-invalid={Boolean(errors[field.key])} aria-describedby={errors[field.key]?`ln-${field.key}-error`:undefined} onChange={event=>setValues({...values,[field.key]:event.target.value})}/>{errors[field.key]&&<span className="ln-field-error" id={`ln-${field.key}-error`}>{errors[field.key]}</span>}</label>)}
    <label htmlFor="ln-brief">What are you imagining?<textarea id="ln-brief" name="brief" rows={3} maxLength={2000} required value={values.brief} aria-invalid={Boolean(errors.brief)} aria-describedby={errors.brief?"ln-brief-error":undefined} onChange={event=>setValues({...values,brief:event.target.value})}/>{errors.brief&&<span className="ln-field-error" id="ln-brief-error">{errors.brief}</span>}</label>
    <p className="ln-form-note">This demo prepares a brief on your device. Nothing is sent or saved online.</p>
    <button type="submit" className="ln-button">Prepare project brief <ArrowRight size={20} aria-hidden="true"/></button>
  </form>;
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/model/createOpticalLensModel.ts">
<![CDATA[import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import defaultSpec from "./lens-spec.json";
import { createLensMaterials } from "./lensMaterials";

export const BUILD_PASSES = ["blockout", "structural-pass", "form-refinement", "material-pass", "surface-pass", "lighting-pass", "interaction-pass", "optimization-pass"] as const;
export type LensBuildPass = (typeof BUILD_PASSES)[number];
export type OpticalLensSpec = typeof defaultSpec;
export type OpticalLensOptions = { pass?: LensBuildPass; quality?: "high" | "low" };
export { defaultSpec as opticalLensSpec };

export type LensRuntime = {
  nodes: Record<string, THREE.Group>;
  meshes: Record<string, THREE.Mesh>;
  sockets: Record<string, THREE.Object3D>;
  colliders: Record<string, { type: string; radius: number; depth: number }>;
  destructionGroups: Record<string, THREE.Object3D[]>;
  setExplode: (amount: number) => void;
  setFocusRing: (radians: number) => void;
  pickPart: (object: THREE.Object3D | null) => THREE.Group | null;
  dispose: () => void;
};

function annulus(inner: number, outer: number, depth: number, segments: number, bevel = 0) {
  const h = depth / 2, b = Math.min(bevel, h * .8, (outer - inner) * .2);
  const points = [[inner + b, -h], [outer - b, -h], [outer, -h + b], [outer, h - b], [outer - b, h], [inner + b, h], [inner, h - b], [inner, -h + b], [inner + b, -h]].map(([r, z]) => new THREE.Vector2(r, z));
  return new THREE.LatheGeometry(points, segments).rotateX(Math.PI / 2);
}

function flutedTorus(radius: number, tube: number, depth: number, flutes: number, amplitude: number, twist: number, segments: number) {
  const radialSegments = 48, tubularSegments = segments * 2;
  const geo = new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);
  const p = geo.getAttribute("position"), uv = geo.getAttribute("uv");
  for (let i = 0; i < p.count; i++) {
    const u = uv.getX(i) * Math.PI * 2, v = uv.getY(i) * Math.PI * 2;
    const relief = amplitude * Math.sin(flutes * u + twist * v) * Math.sin(v) ** 2;
    const r = radius + (tube + relief) * Math.cos(v);
    p.setXYZ(i, r * Math.cos(u), r * Math.sin(u), (depth + relief) * Math.sin(v));
  }
  geo.computeVertexNormals();
  const n = geo.getAttribute("normal");
  const stride = tubularSegments + 1;
  const v0 = new THREE.Vector3(), v1 = new THREE.Vector3();
  for (let r = 0; r <= radialSegments; r++) {
    const i0 = r * stride, i1 = i0 + tubularSegments;
    v0.fromBufferAttribute(n, i0).add(v1.fromBufferAttribute(n, i1)).normalize();
    n.setXYZ(i0, v0.x, v0.y, v0.z);
    n.setXYZ(i1, v0.x, v0.y, v0.z);
  }
  for (let c = 0; c <= tubularSegments; c++) {
    const i0 = c, i1 = radialSegments * stride + c;
    v0.fromBufferAttribute(n, i0).add(v1.fromBufferAttribute(n, i1)).normalize();
    n.setXYZ(i0, v0.x, v0.y, v0.z);
    n.setXYZ(i1, v0.x, v0.y, v0.z);
  }
  n.needsUpdate = true;
  return geo;
}

function prism(size: number, index: number) {
  const shape = new THREE.Shape();
  shape.moveTo(-size, size * .25);
  shape.lineTo(size * .55, size * .62);
  shape.lineTo(size * .85, -size * .38);
  if (index % 3 === 0) shape.lineTo(-size * .45, -size * .55);
  shape.closePath();
  return new THREE.ExtrudeGeometry(shape, { depth: size * .42, bevelEnabled: true, bevelSize: Math.min(.008, size * .12), bevelThickness: Math.min(.008, size * .12), bevelSegments: 2, steps: 1, curveSegments: 1 }).center();
}

/** Procedural reconstruction, +Z front / +Y up. Dimensions are relative units. */
export function createOpticalLensModel(spec: OpticalLensSpec = defaultSpec, options: OpticalLensOptions = {}) {
  const root = new THREE.Group();
  root.name = "lenus-optical-lens";
  const runtime: LensRuntime = {
    nodes: {},
    meshes: {},
    sockets: {},
    colliders: {},
    destructionGroups: {},
    setExplode: () => {},
    setFocusRing: () => {},
    pickPart: () => null,
    dispose: () => {},
  };
  const segments = options.quality === "low" ? 64 : 128;
  const stage = BUILD_PASSES.indexOf(options.pass ?? "optimization-pass");
  const microSegments = stage >= 7 ? Math.max(48, segments >> 1) : segments;
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const clay = new THREE.MeshStandardMaterial({ color: "#9197a0", roughness: 0.65 });
  const physical = stage >= 3 ? createLensMaterials(spec, stage >= 4) : null;
  materials.add(clay);

  for (const [componentIndex, c] of spec.components.entries()) {
    if (stage === 0 && c.level !== "macro") continue;
    const pivot = new THREE.Group();
    pivot.name = c.id;
    pivot.position.fromArray(c.position);
    pivot.userData.basePosition = pivot.position.clone();
    pivot.userData.componentIndex = componentIndex;
    pivot.userData.parentComponent = c.parent ?? "root";
    runtime.nodes[c.id] = pivot;
    (runtime.nodes[c.parent ?? ""] ?? root).add(pivot);
    const g = c.geometry;
    if (stage >= 6) {
      const socket = new THREE.Object3D();
      socket.name = `${c.id}-seat`;
      pivot.add(socket);
      runtime.sockets[socket.name] = socket;
      runtime.colliders[c.id] = { type: "cylinder", radius: g.outer ?? g.radius ?? 0.5, depth: g.depth ?? 0.2 };
      const groupKey = c.parent ?? c.id;
      (runtime.destructionGroups[groupKey] ??= []).push(pivot);
    }
    const add = (geometry: THREE.BufferGeometry, count = 0) => {
      if (stage >= 7) geometry.computeBoundingSphere();
      geometries.add(geometry);
      const material = physical?.materials.get(c.material) ?? clay;
      const mesh = count ? new THREE.InstancedMesh(geometry, material, count) : new THREE.Mesh(geometry, material);
      mesh.name = `${c.id}-mesh-${pivot.children.length}`;
      mesh.userData.componentId = c.id;
      mesh.userData.explodeWithParent = true;
      pivot.add(mesh);
      runtime.meshes[c.id] = mesh;
      return mesh;
    };
    let geometry: THREE.BufferGeometry;
    switch (g.kind) {
      case "fluted-torus": geometry = stage >= 2 ? flutedTorus(g.radius!, g.tube!, g.depth!, g.flutes!, g.amplitude!, g.twist!, segments) : new THREE.TorusGeometry(g.radius!, g.tube!, 20, segments); break;
      case "annulus": {
        geometry = annulus(g.inner!, g.outer!, g.depth!, segments, stage >= 2 ? g.bevel : 0);
        if (stage >= 4) {
          // Planar shoulders need face normals; smoothing the entire profile makes radial wedges.
          const flat = geometry.toNonIndexed();
          geometry.dispose();
          geometry = flat;
          geometry.computeVertexNormals();
          const p = geometry.getAttribute("position"), n = geometry.getAttribute("normal");
          const tangents = new Float32Array(p.count * 4);
          for (let i = 0; i < p.count; i++) {
            const angle = Math.atan2(p.getY(i), p.getX(i));
            const x = Math.cos(angle), y = Math.sin(angle);
            const radial = Math.hypot(n.getX(i), n.getY(i)) * Math.sign(n.getX(i) * x + n.getY(i) * y);
            n.setXYZ(i, x * radial, y * radial, n.getZ(i));
            tangents.set([-y, x, 0, 1], i * 4);
          }
          geometry.setAttribute("tangent", new THREE.BufferAttribute(tangents, 4));
        }
        break;
      }
      case "lens": geometry = new THREE.SphereGeometry(g.radius!, segments, 24).scale(1, 1, (g.depth! / 2 + g.sag!) / g.radius!); break;
      case "radial-boxes":
      case "bolts":
      case "contacts": {
        const count = g.count!;
        const shape = g.kind === "radial-boxes"
          ? stage >= 2 ? new RoundedBoxGeometry(g.width!, g.height!, g.depth!, 2, Math.min(.008, g.width! * .18)) : new THREE.BoxGeometry(g.width!, g.height!, g.depth!)
          : g.kind === "bolts"
            ? new THREE.TorusGeometry(g.size! * .72, g.size! * .20, 8, 20)
            : new THREE.SphereGeometry(g.size!, 12, 8).scale(1, 1, .4);
        const instances = add(shape, count) as THREE.InstancedMesh;
        const transform = new THREE.Object3D();
        for (let i = 0; i < count; i++) {
          const theta = g.kind === "contacts" ? (i < 9 ? Math.PI + (i - 4) * .12 : (i - 10.5) * .15) : i / count * Math.PI * 2 + (g.phase ?? 0);
          transform.position.set(Math.sin(theta) * g.radius!, Math.cos(theta) * g.radius!, 0);
          transform.rotation.z = -theta;
          transform.updateMatrix();
          instances.setMatrixAt(i, transform.matrix);
        }
        instances.instanceMatrix.needsUpdate = true;
        continue;
      }
      case "beads": {
        for (const radius of g.radii!) add(new THREE.TorusGeometry(radius, g.tube!, 6, microSegments));
        continue;
      }
      case "prisms": {
        for (const [i, [x, y, z, size]] of g.points!.entries()) {
          const geo = stage >= 2 ? prism(size, i) : new THREE.TetrahedronGeometry(size);
          const mesh = add(geo);
          mesh.name = `shard-${pivot.children.length}`;
          mesh.position.set(x, y, z);
          mesh.userData.basePosition = mesh.position.clone();
          if (stage >= 2) mesh.rotation.set(.25 + i * .37, .18 + i * .29, .4 + i * 1.7);
          pivot.add(mesh);
        }
        continue;
      }
      default: continue;
    }
    add(geometry);
  }
  runtime.setExplode = (amount: number) => {
    const t = THREE.MathUtils.clamp(amount, 0, 1);
    for (const pivot of Object.values(runtime.nodes)) {
      const base = pivot.userData.basePosition as THREE.Vector3 | undefined;
      if (!base) continue;
      if (t === 0) {
        pivot.position.copy(base);
      } else if (pivot.userData.parentComponent === "root") {
        const idx = Number(pivot.userData.componentIndex ?? 0);
        const dir = base.z >= 0 ? 1 : -1;
        pivot.position.set(base.x, base.y, base.z * (1 + t * 1.5) + dir * t * (0.08 + (idx % 4) * 0.045));
      }
      if (pivot.name === "shards") {
        for (const child of pivot.children) {
          const childBase = child.userData.basePosition as THREE.Vector3 | undefined;
          if (!childBase) continue;
          if (t === 0) child.position.copy(childBase);
          else child.position.set(childBase.x * (1 + t * 0.35), childBase.y * (1 + t * 0.35), childBase.z + t * 0.25);
        }
      }
    }
  };
  runtime.setFocusRing = (radians: number) => {
    for (const id of ["collar-outer", "collar-middle", "shards"]) {
      if (runtime.nodes[id]) runtime.nodes[id].rotation.z = radians;
    }
  };
  runtime.pickPart = (object: THREE.Object3D | null) => {
    let cur: THREE.Object3D | null = object;
    while (cur && cur !== root) {
      if (typeof cur.userData?.componentId === "string" && runtime.nodes[cur.userData.componentId]) {
        return runtime.nodes[cur.userData.componentId];
      }
      if (runtime.nodes[cur.name]) return runtime.nodes[cur.name];
      cur = cur.parent;
    }
    return null;
  };
  runtime.dispose = () => { geometries.forEach((g) => g.dispose()); materials.forEach((m) => m.dispose()); physical?.dispose(); };
  root.userData.sculptRuntime = runtime;
  root.userData.buildPass = options.pass ?? "optimization-pass";
  return root;
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/model/createOpticalLensScene.ts">
<![CDATA[import * as THREE from "three";
import { BUILD_PASSES, createOpticalLensModel, type LensBuildPass, type LensRuntime } from "./createOpticalLensModel";
import { createStudioEnvironment } from "./studioEnvironment";

/** Renderer owner. No browser globals are accessed until this function is called. */
export function createOpticalLensScene(canvas: HTMLCanvasElement, options: { pass?: LensBuildPass; quality?: "high" | "low" } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance", preserveDrawingBuffer: true });
  renderer.setPixelRatio(1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#202125");
  const stage = BUILD_PASSES.indexOf(options.pass ?? "optimization-pass");
  const environment = stage >= 3 ? createStudioEnvironment(renderer, stage >= 5) : null;
  const neutralEnvironment = stage >= 5 ? createStudioEnvironment(renderer) : environment;
  scene.environment = environment?.texture ?? null;
  const camera = new THREE.OrthographicCamera(-5, 5, 2.625, -2.625, 0.1, 50);
  const model = createOpticalLensModel(undefined, options);
  scene.add(model);
  scene.add(new THREE.HemisphereLight(0xe5eeff, 0x282631, 2));
  const key = new THREE.DirectionalLight(0xffffff, 3);
  key.position.set(-3, 5, 4);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xdde4ff, 1.4);
  fill.position.set(3, 0, -4);
  scene.add(fill);
  const lime = new THREE.DirectionalLight("#D2F802", 1.8);
  lime.name = "lime-top-left-rim";
  lime.position.set(-4, 4, -0.4);
  const purple = new THREE.DirectionalLight("#A855F7", 1.5);
  purple.name = "purple-bottom-right-rim";
  purple.position.set(4, -3, -0.4);
  if (stage >= 5) scene.add(lime, purple);
  const render = () => renderer.render(scene, camera);
  function setLighting(mode: "neutral" | "grazing" | "reference") {
    if (mode === "grazing") key.position.set(-6, 1, .8);
    else key.position.set(-3, 5, 4);
    key.intensity = mode === "grazing" ? 5 : 3;
    fill.intensity = mode === "grazing" ? .3 : 1.4;
    lime.visible = purple.visible = mode === "reference";
    scene.environment = (mode === "reference" ? environment : neutralEnvironment)?.texture ?? null;
    render();
  }
  function setView(degrees: number) {
    const angle = THREE.MathUtils.degToRad(degrees);
    model.rotation.set(0, 0, 0);
    camera.position.set(Math.sin(angle) * 12, 0, Math.cos(angle) * 12);
    camera.up.set(0, 1, 0);
    camera.lookAt(0, 0, 0);
    render();
  }
  function resize(width: number, height: number) {
    const aspect = width / Math.max(1, height);
    camera.left = -2.625 * aspect;
    camera.right = 2.625 * aspect;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    render();
  }
  function setExplode(amount: number) {
    (model.userData.sculptRuntime as LensRuntime).setExplode(amount);
    render();
  }
  function setFocusRing(radians: number) {
    (model.userData.sculptRuntime as LensRuntime).setFocusRing(radians);
    render();
  }
  setView(0);
  return { renderer, scene, camera, model, render, setView, setLighting, setExplode, setFocusRing, resize, dispose() { (model.userData.sculptRuntime as LensRuntime).dispose(); environment?.dispose(); if(neutralEnvironment !== environment) neutralEnvironment?.dispose(); renderer.dispose(); } };
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/model/lens-spec.json">
<![CDATA[{
  "components": [
    {
      "id": "outer-glass",
      "parent": "root",
      "level": "macro",
      "position": [
        0,
        0,
        0
      ],
      "material": "glass",
      "geometry": {
        "kind": "fluted-torus",
        "radius": 2.26,
        "tube": 0.23,
        "depth": 0.23,
        "flutes": 18,
        "amplitude": 0.025,
        "twist": 2.0
      },
      "features": [
        {
          "id": "outer-flutes",
          "type": "ridge",
          "description": "Shallow helical flutes in outer torus: 18 periods, amplitude 0.025; no disconnected coils.",
          "placement": {
            "x": 0.25,
            "y": 0.05,
            "width": 0.5,
            "height": 0.9
          },
          "geometryEffect": "Shallow helical flutes in outer torus: 18 periods, amplitude 0.025; no disconnected coils.",
          "confidence": 0.75,
          "evidenceRefs": [
            "front"
          ]
        },
        {
          "id": "outer-lip",
          "type": "bevel",
          "description": "Rounded outer edge radius 0.025 catches continuous grazing highlights.",
          "placement": {
            "x": 0.25,
            "y": 0.05,
            "width": 0.5,
            "height": 0.9
          },
          "geometryEffect": "Rounded outer edge radius 0.025 catches continuous grazing highlights.",
          "confidence": 0.9,
          "evidenceRefs": [
            "front"
          ]
        }
      ]
    },
    {
      "id": "inner-glass",
      "parent": "root",
      "level": "meso",
      "position": [
        0,
        0,
        0.04
      ],
      "material": "glass",
      "geometry": {
        "kind": "fluted-torus",
        "radius": 1.82,
        "tube": 0.2,
        "depth": 0.21,
        "flutes": 14,
        "amplitude": 0.035,
        "twist": 2.2
      },
      "features": [
        {
          "id": "inner-lobe",
          "type": "ridge",
          "description": "Second annular glass lobe radius 1.82, elliptical cross-section 0.22 x 0.2.",
          "placement": {
            "x": 0.32,
            "y": 0.15,
            "width": 0.36,
            "height": 0.7
          },
          "geometryEffect": "Second annular glass lobe radius 1.82, elliptical cross-section 0.22 x 0.2.",
          "confidence": 0.9,
          "evidenceRefs": [
            "front"
          ]
        }
      ]
    },
    {
      "id": "front-shell",
      "parent": "root",
      "level": "macro",
      "position": [
        0,
        0,
        -0.06
      ],
      "material": "titanium",
      "geometry": {
        "kind": "annulus",
        "inner": 0.6,
        "outer": 1.67,
        "depth": 0.22,
        "bevel": 0.025
      },
      "features": []
    },
    {
      "id": "collar-outer",
      "parent": "root",
      "level": "meso",
      "position": [
        0,
        0,
        0.13
      ],
      "material": "titanium",
      "geometry": {
        "kind": "annulus",
        "inner": 1.38,
        "outer": 1.62,
        "depth": 0.12,
        "bevel": 0.018
      },
      "features": [
        {
          "id": "collar-step-a",
          "type": "bevel",
          "description": "First annular collar shoulder radius 1.62 to 1.38; chamfer 0.018.",
          "placement": {
            "x": 0.34,
            "y": 0.22,
            "width": 0.32,
            "height": 0.56
          },
          "geometryEffect": "First annular collar shoulder radius 1.62 to 1.38; chamfer 0.018.",
          "confidence": 0.9,
          "evidenceRefs": [
            "front"
          ]
        }
      ]
    },
    {
      "id": "collar-middle",
      "parent": "root",
      "level": "meso",
      "position": [
        0,
        0,
        0.06
      ],
      "material": "titanium",
      "geometry": {
        "kind": "annulus",
        "inner": 1.12,
        "outer": 1.35,
        "depth": 0.1,
        "bevel": 0.016
      },
      "features": [
        {
          "id": "collar-step-b",
          "type": "bevel",
          "description": "Middle collar radius 1.35 to 1.12, recessed 0.07.",
          "placement": {
            "x": 0.37,
            "y": 0.28,
            "width": 0.26,
            "height": 0.46
          },
          "geometryEffect": "Middle collar radius 1.35 to 1.12, recessed 0.07.",
          "confidence": 0.9,
          "evidenceRefs": [
            "front"
          ]
        }
      ]
    },
    {
      "id": "collar-inner",
      "parent": "root",
      "level": "meso",
      "position": [
        0,
        0,
        -0.01
      ],
      "material": "titanium",
      "geometry": {
        "kind": "annulus",
        "inner": 0.65,
        "outer": 1.09,
        "depth": 0.1,
        "bevel": 0.018
      },
      "features": [
        {
          "id": "collar-step-c",
          "type": "bevel",
          "description": "Innermost collar radius 1.09 to 0.65, recessed 0.13.",
          "placement": {
            "x": 0.4,
            "y": 0.32,
            "width": 0.2,
            "height": 0.36
          },
          "geometryEffect": "Innermost collar radius 1.09 to 0.65, recessed 0.13.",
          "confidence": 0.9,
          "evidenceRefs": [
            "front"
          ]
        }
      ]
    },
    {
      "id": "front-lens",
      "parent": "root",
      "level": "macro",
      "position": [
        0,
        0,
        0.02
      ],
      "material": "emerald",
      "geometry": {
        "kind": "lens",
        "radius": 0.59,
        "sag": 0.14,
        "depth": 0.18
      },
      "features": [
        {
          "id": "core-convex",
          "type": "gloss",
          "description": "Biconvex emerald optic radius 0.59, sag 0.14, reflective highlight.",
          "placement": {
            "x": 0.45,
            "y": 0.39,
            "width": 0.12,
            "height": 0.22
          },
          "geometryEffect": "Biconvex emerald optic radius 0.59, sag 0.14, reflective highlight.",
          "confidence": 0.9,
          "evidenceRefs": [
            "front"
          ]
        },
        {
          "id": "core-emission",
          "type": "emissive",
          "description": "Emerald #00E599 core with internal emission; center brightest, rim dark.",
          "placement": {
            "x": 0.45,
            "y": 0.39,
            "width": 0.12,
            "height": 0.22
          },
          "geometryEffect": "Emerald #00E599 core with internal emission; center brightest, rim dark.",
          "confidence": 0.9,
          "evidenceRefs": [
            "front"
          ]
        }
      ]
    },
    {
      "id": "rear-frame",
      "parent": "root",
      "level": "macro",
      "position": [
        0,
        0,
        -0.3
      ],
      "material": "titanium",
      "geometry": {
        "kind": "annulus",
        "inner": 1.65,
        "outer": 2.12,
        "depth": 0.22,
        "bevel": 0.025
      },
      "features": [
        {
          "id": "rear-rim",
          "type": "bevel",
          "description": "Rear structural rim radius 2.12 to 1.65.",
          "placement": {
            "x": 0.28,
            "y": 0.1,
            "width": 0.44,
            "height": 0.8
          },
          "geometryEffect": "Rear structural rim radius 2.12 to 1.65.",
          "confidence": 0.9,
          "evidenceRefs": [
            "rear"
          ]
        }
      ]
    },
    {
      "id": "rear-hub",
      "parent": "root",
      "level": "meso",
      "position": [
        0,
        0,
        -0.39
      ],
      "material": "titanium",
      "geometry": {
        "kind": "annulus",
        "inner": 0.5,
        "outer": 1.25,
        "depth": 0.18,
        "bevel": 0.025
      },
      "features": [
        {
          "id": "rear-hub",
          "type": "bevel",
          "description": "Rear annular hub from radius 0.5 to 1.25; concentric shoulder relief.",
          "placement": {
            "x": 0.38,
            "y": 0.27,
            "width": 0.24,
            "height": 0.46
          },
          "geometryEffect": "Rear annular hub from radius 0.5 to 1.25; concentric shoulder relief.",
          "confidence": 0.9,
          "evidenceRefs": [
            "rear"
          ]
        },
        {
          "id": "brush-lines",
          "type": "linework",
          "description": "Circumferential brushed titanium; independent normal and roughness fields.",
          "placement": {
            "x": 0.4,
            "y": 0.32,
            "width": 0.2,
            "height": 0.36
          },
          "geometryEffect": "Circumferential brushed titanium; independent normal and roughness fields.",
          "confidence": 0.9,
          "evidenceRefs": [
            "rear"
          ]
        }
      ]
    },
    {
      "id": "rear-seat",
      "parent": "root",
      "level": "meso",
      "position": [
        0,
        0,
        -0.45
      ],
      "material": "dark-metal",
      "geometry": {
        "kind": "annulus",
        "inner": 0.35,
        "outer": 0.53,
        "depth": 0.16,
        "bevel": 0.015
      },
      "features": []
    },
    {
      "id": "rear-lens",
      "parent": "root",
      "level": "meso",
      "position": [
        0,
        0,
        -0.5
      ],
      "material": "rear-glass",
      "geometry": {
        "kind": "lens",
        "radius": 0.35,
        "sag": 0.07,
        "depth": 0.12
      },
      "features": [
        {
          "id": "rear-optic",
          "type": "gloss",
          "description": "Small dark convex rear element radius 0.35 with purple antireflection tint.",
          "placement": {
            "x": 0.46,
            "y": 0.42,
            "width": 0.08,
            "height": 0.16
          },
          "geometryEffect": "Small dark convex rear element radius 0.35 with purple antireflection tint.",
          "confidence": 0.9,
          "evidenceRefs": [
            "rear"
          ]
        }
      ]
    },
    {
      "id": "rear-fins",
      "parent": "rear-frame",
      "level": "micro",
      "position": [
        0,
        0,
        -0.1
      ],
      "material": "titanium",
      "geometry": {
        "kind": "radial-boxes",
        "count": 64,
        "radius": 1.46,
        "width": 0.024,
        "height": 0.4,
        "depth": 0.11,
        "phase": 0
      },
      "features": [
        {
          "id": "fin-array",
          "type": "ridge",
          "description": "64 radial rectangular fins bridging hub and frame.",
          "placement": {
            "x": 0.34,
            "y": 0.2,
            "width": 0.32,
            "height": 0.62
          },
          "geometryEffect": "64 radial rectangular fins bridging hub and frame.",
          "confidence": 0.9,
          "evidenceRefs": [
            "rear"
          ]
        },
        {
          "id": "fin-edges",
          "type": "bevel",
          "description": "Fin tips carry a narrow bright chamfer; broad faces remain dark.",
          "placement": {
            "x": 0.34,
            "y": 0.2,
            "width": 0.32,
            "height": 0.62
          },
          "geometryEffect": "Fin tips carry a narrow bright chamfer; broad faces remain dark.",
          "confidence": 0.9,
          "evidenceRefs": [
            "rear"
          ]
        }
      ]
    },
    {
      "id": "rear-bridges",
      "parent": "rear-frame",
      "level": "meso",
      "position": [
        0,
        0,
        -0.08
      ],
      "material": "titanium",
      "geometry": {
        "kind": "radial-boxes",
        "count": 6,
        "radius": 1.98,
        "width": 0.27,
        "height": 0.38,
        "depth": 0.16,
        "phase": 0
      },
      "features": [
        {
          "id": "bridge-ribs",
          "type": "ridge",
          "description": "Six beveled mounting bridges with raised edge ribs.",
          "placement": {
            "x": 0.28,
            "y": 0.1,
            "width": 0.44,
            "height": 0.8
          },
          "geometryEffect": "Six beveled mounting bridges with raised edge ribs.",
          "confidence": 0.9,
          "evidenceRefs": [
            "rear"
          ]
        }
      ]
    },
    {
      "id": "outer-screws",
      "parent": "rear-frame",
      "level": "micro",
      "position": [
        0,
        0,
        -0.19
      ],
      "material": "edge-metal",
      "geometry": {
        "kind": "bolts",
        "count": 6,
        "radius": 1.98,
        "size": 0.075,
        "phase": 0
      },
      "features": [
        {
          "id": "outer-bolts",
          "type": "fastener",
          "description": "Six circular fastener heads in outer mounting bridges.",
          "placement": {
            "x": 0.28,
            "y": 0.1,
            "width": 0.44,
            "height": 0.8
          },
          "geometryEffect": "Six circular fastener heads in outer mounting bridges.",
          "confidence": 0.9,
          "evidenceRefs": [
            "rear"
          ]
        }
      ]
    },
    {
      "id": "inner-screws",
      "parent": "rear-hub",
      "level": "micro",
      "position": [
        0,
        0,
        -0.12
      ],
      "material": "edge-metal",
      "geometry": {
        "kind": "bolts",
        "count": 6,
        "radius": 1.09,
        "size": 0.047,
        "phase": 0
      },
      "features": [
        {
          "id": "inner-bolts",
          "type": "fastener",
          "description": "Six countersunk screw rims on rear hub radius 1.07.",
          "placement": {
            "x": 0.38,
            "y": 0.28,
            "width": 0.24,
            "height": 0.44
          },
          "geometryEffect": "Six countersunk screw rims on rear hub radius 1.07.",
          "confidence": 0.9,
          "evidenceRefs": [
            "rear"
          ]
        }
      ]
    },
    {
      "id": "gold-contacts",
      "parent": "rear-hub",
      "level": "micro",
      "position": [
        0,
        0,
        -0.13
      ],
      "material": "gold",
      "geometry": {
        "kind": "contacts",
        "count": 13,
        "radius": 0.78,
        "size": 0.023
      },
      "features": [
        {
          "id": "gold-contact-arc",
          "type": "gloss",
          "description": "Nine lower gold electrical pads and four small upper contacts.",
          "placement": {
            "x": 0.46,
            "y": 0.35,
            "width": 0.11,
            "height": 0.3
          },
          "geometryEffect": "Nine lower gold electrical pads and four small upper contacts.",
          "confidence": 0.9,
          "evidenceRefs": [
            "rear"
          ]
        }
      ]
    },
    {
      "id": "retaining-beads",
      "parent": "root",
      "level": "micro",
      "position": [
        0,
        0,
        0.09
      ],
      "material": "edge-metal",
      "geometry": {
        "kind": "beads",
        "radii": [
          0.615,
          0.66,
          1.11,
          1.36,
          1.64,
          2.04,
          2.48
        ],
        "tube": 0.008
      },
      "features": [
        {
          "id": "lens-seat",
          "type": "ridge",
          "description": "Paired narrow lens retaining rings.",
          "placement": {
            "x": 0.44,
            "y": 0.36,
            "width": 0.14,
            "height": 0.28
          },
          "geometryEffect": "Paired narrow lens retaining rings.",
          "confidence": 0.9,
          "evidenceRefs": [
            "front"
          ]
        }
      ]
    },
    {
      "id": "rear-beads",
      "parent": "rear-hub",
      "level": "micro",
      "position": [
        0,
        0,
        -0.11
      ],
      "material": "edge-metal",
      "geometry": {
        "kind": "beads",
        "radii": [
          0.53,
          0.57,
          0.82,
          0.93,
          1.02,
          1.19,
          1.24
        ],
        "tube": 0.006
      },
      "features": []
    },
    {
      "id": "shards",
      "parent": "root",
      "level": "macro",
      "position": [
        0,
        0,
        0.43
      ],
      "material": "prism",
      "geometry": {
        "kind": "prisms",
        "count": 12,
        "seed": 112619,
        "points": [
          [
            -0.96,
            0.69,
            0.11,
            0.21
          ],
          [
            -0.89,
            -0.68,
            0.12,
            0.2
          ],
          [
            0.49,
            1.05,
            0.08,
            0.1
          ],
          [
            0.65,
            0.76,
            0.06,
            0.07
          ],
          [
            -0.2,
            -1.18,
            0.09,
            0.11
          ],
          [
            1.29,
            -0.3,
            0.12,
            0.08
          ],
          [
            1.18,
            -0.02,
            0.14,
            0.065
          ],
          [
            -0.38,
            0.3,
            0.13,
            0.06
          ],
          [
            -0.3,
            -0.33,
            0.2,
            0.045
          ],
          [
            0.33,
            -0.31,
            0.25,
            0.04
          ],
          [
            -1.3,
            0.12,
            0.03,
            0.025
          ],
          [
            -0.49,
            1.05,
            0.03,
            0.03
          ]
        ]
      },
      "features": [
        {
          "id": "prism-bevels",
          "type": "bevel",
          "description": "Detached irregular triangular prisms with 0.008 edge chamfers.",
          "placement": {
            "x": 0.38,
            "y": 0.28,
            "width": 0.27,
            "height": 0.46
          },
          "geometryEffect": "Detached irregular triangular prisms with 0.008 edge chamfers.",
          "confidence": 0.9,
          "evidenceRefs": [
            "front"
          ]
        }
      ]
    }
  ],
  "materials": [
    {
      "id": "hidden",
      "name": "hidden",
      "type": "physical",
      "shaderModel": "MeshPhysicalMaterial",
      "baseColor": "#000000",
      "color": "#000000",
      "albedo": {
        "dominant": "#000000",
        "secondary": [
          "#000000"
        ],
        "samplingNotes": "Clear glass reflects environment; emerald color specified by user; titanium dark neutral from rear crop."
      },
      "colorVariation": {
        "palette": [
          "#000000"
        ],
        "pattern": "solid",
        "amplitude": 0,
        "heightCorrelation": 0.3
      },
      "textureResolution": 1024,
      "textureProjection": {
        "mode": "uv",
        "repeat": [
          2.0,
          2.0
        ],
        "anisotropy": 8,
        "texelDensityIntent": "Preserve stable world/object-scale detail; do not stretch micro detail with component scale."
      },
      "surfaceFrequencyBands": [
        {
          "id": "macro",
          "frequency": 2,
          "amplitude": 0.001,
          "role": "revolved cross-section"
        },
        {
          "id": "meso",
          "frequency": 18,
          "amplitude": 0.01,
          "role": "flutes and chamfers"
        },
        {
          "id": "micro",
          "frequency": 280,
          "amplitude": 0.001,
          "role": "brushed metal normal independent of albedo"
        }
      ],
      "roughness": {
        "base": 1,
        "variation": 0.002,
        "map": "independent-procedural-field",
        "localResponse": "higher roughness in cavities, lower roughness on worn edges"
      },
      "metalness": {
        "base": 0,
        "variation": 0.0
      },
      "normal": {
        "pattern": "polished",
        "strength": 0,
        "scale": 280,
        "space": "tangent"
      },
      "bump": {
        "pattern": "none",
        "amplitude": 0.0,
        "scale": 1.0
      },
      "displacement": {
        "pattern": "none",
        "amplitude": 0.0,
        "scale": 1.0,
        "silhouetteAffects": false
      },
      "ambientOcclusion": {
        "cavityStrength": 0.25,
        "contactShadowBias": 0.35,
        "notes": "Darken creases, seams, intersections, and recessed local features."
      },
      "wear": {
        "edgeWear": 0.0,
        "scratches": [],
        "chips": []
      },
      "dirt": {
        "amount": 0.0,
        "cavityBias": 0.0,
        "color": "#2F2A22"
      },
      "localOverrides": [
        {
          "id": "hidden-edge-response",
          "region": "beveled edges",
          "roughness": 0.96,
          "description": "Lower roughness on narrow chamfer edges; cavities retain base response",
          "evidenceRefs": [
            "front"
          ]
        }
      ],
      "shaderNotes": [
        "Prefer MeshPhysicalMaterial when clearcoat, sheen, transmission, or thin-surface response is observed; otherwise use MeshStandardMaterial-compatible PBR channels.",
        "Generate albedo, roughness, height/normal, and AO independently; never alias albedo into roughness.",
        "Use normal/bump/displacement only when they map to observed surface relief.",
        "Use displacement geometry when the observed relief changes the close-up silhouette; texture-only relief is insufficient there."
      ],
      "notes": "User-provided PBR scalars authoritative. Reference pixels include reflected light, not a painted finish.",
      "transmission": 0,
      "ior": 1.52,
      "dispersion": 0,
      "thickness": 0,
      "clearcoat": 0.08,
      "anisotropy": 0,
      "opacity": {
        "base": 0
      },
      "referencePbrLimitation": "Extraction records reflection/color evidence only. Reconstructed solid albedo and independent procedural channels preserve requested physical scalars, avoiding baked highlights.",
      "referencePbr": {
        "sourceImage": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\references\\titanium-crop.png",
        "confidence": 0.831,
        "estimatedFidelity": 0.831,
        "targetThreshold": 0.7,
        "verdict": "pass",
        "maps": {
          "albedo": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_albedo.png",
            "url": "titanium_albedo.png",
            "channel": "albedo",
            "source": "reference-pixel-extraction"
          },
          "roughness": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_roughness.png",
            "url": "titanium_roughness.png",
            "channel": "roughness",
            "source": "reference-pixel-extraction"
          },
          "height": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_height.png",
            "url": "titanium_height.png",
            "channel": "height",
            "source": "reference-pixel-extraction"
          },
          "normal": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_normal.png",
            "url": "titanium_normal.png",
            "channel": "normal",
            "source": "reference-pixel-extraction"
          },
          "ao": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_ao.png",
            "url": "titanium_ao.png",
            "channel": "ao",
            "source": "reference-pixel-extraction"
          }
        },
        "usable": true,
        "hardLimit": "Extraction records reflection/color evidence only. Reconstructed solid albedo and independent procedural channels preserve requested physical scalars, avoiding baked highlights.",
        "usage": "Evidence only; solid dielectric/metal albedo with independent procedural channels. Derived related metals share titanium surface evidence; gold hue is observed on rear contacts."
      }
    },
    {
      "id": "glass",
      "name": "glass",
      "type": "physical",
      "shaderModel": "MeshPhysicalMaterial",
      "baseColor": "#eef5ff",
      "color": "#eef5ff",
      "albedo": {
        "dominant": "#eef5ff",
        "secondary": [
          "#eef5ff"
        ],
        "samplingNotes": "Clear glass reflects environment; emerald color specified by user; titanium dark neutral from rear crop."
      },
      "colorVariation": {
        "palette": [
          "#eef5ff"
        ],
        "pattern": "solid",
        "amplitude": 0,
        "heightCorrelation": 0.3
      },
      "textureResolution": 1024,
      "textureProjection": {
        "mode": "uv",
        "repeat": [
          2.0,
          2.0
        ],
        "anisotropy": 8,
        "texelDensityIntent": "Preserve stable world/object-scale detail; do not stretch micro detail with component scale."
      },
      "surfaceFrequencyBands": [
        {
          "id": "macro",
          "frequency": 2,
          "amplitude": 0.001,
          "role": "revolved cross-section"
        },
        {
          "id": "meso",
          "frequency": 18,
          "amplitude": 0.025,
          "role": "flutes and chamfers"
        },
        {
          "id": "micro",
          "frequency": 280,
          "amplitude": 0.001,
          "role": "brushed metal normal independent of albedo"
        }
      ],
      "roughness": {
        "base": 0.03,
        "variation": 0.002,
        "map": "independent-procedural-field",
        "localResponse": "higher roughness in cavities, lower roughness on worn edges"
      },
      "metalness": {
        "base": 0,
        "variation": 0.0
      },
      "normal": {
        "pattern": "polished",
        "strength": 0,
        "scale": 280,
        "space": "tangent"
      },
      "bump": {
        "pattern": "none",
        "amplitude": 0.0,
        "scale": 1.0
      },
      "displacement": {
        "pattern": "none",
        "amplitude": 0.0,
        "scale": 1.0,
        "silhouetteAffects": false
      },
      "ambientOcclusion": {
        "cavityStrength": 0.25,
        "contactShadowBias": 0.35,
        "notes": "Darken creases, seams, intersections, and recessed local features."
      },
      "wear": {
        "edgeWear": 0.0,
        "scratches": [],
        "chips": []
      },
      "dirt": {
        "amount": 0.0,
        "cavityBias": 0.0,
        "color": "#2F2A22"
      },
      "localOverrides": [
        {
          "id": "glass-edge-response",
          "region": "beveled edges",
          "roughness": 0.02,
          "description": "Lower roughness on narrow chamfer edges; cavities retain base response",
          "evidenceRefs": [
            "front"
          ]
        }
      ],
      "shaderNotes": [
        "Prefer MeshPhysicalMaterial when clearcoat, sheen, transmission, or thin-surface response is observed; otherwise use MeshStandardMaterial-compatible PBR channels.",
        "Generate albedo, roughness, height/normal, and AO independently; never alias albedo into roughness.",
        "Use normal/bump/displacement only when they map to observed surface relief.",
        "Use displacement geometry when the observed relief changes the close-up silhouette; texture-only relief is insufficient there."
      ],
      "notes": "User-provided PBR scalars authoritative. Reference pixels include reflected light, not a painted finish.",
      "transmission": 0.98,
      "ior": 1.52,
      "dispersion": 0.08,
      "thickness": 0.46,
      "clearcoat": 0.3,
      "anisotropy": 0,
      "referencePbrLimitation": "Extraction records reflection/color evidence only. Reconstructed solid albedo and independent procedural channels preserve requested physical scalars, avoiding baked highlights.",
      "referencePbr": {
        "sourceImage": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\references\\glass-crop.png",
        "confidence": 0.873,
        "estimatedFidelity": 0.873,
        "targetThreshold": 0.7,
        "verdict": "pass",
        "maps": {
          "albedo": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\glass\\glass_albedo.png",
            "url": "glass_albedo.png",
            "channel": "albedo",
            "source": "reference-pixel-extraction"
          },
          "roughness": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\glass\\glass_roughness.png",
            "url": "glass_roughness.png",
            "channel": "roughness",
            "source": "reference-pixel-extraction"
          },
          "height": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\glass\\glass_height.png",
            "url": "glass_height.png",
            "channel": "height",
            "source": "reference-pixel-extraction"
          },
          "normal": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\glass\\glass_normal.png",
            "url": "glass_normal.png",
            "channel": "normal",
            "source": "reference-pixel-extraction"
          },
          "ao": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\glass\\glass_ao.png",
            "url": "glass_ao.png",
            "channel": "ao",
            "source": "reference-pixel-extraction"
          }
        },
        "usable": true,
        "hardLimit": "Extraction records reflection/color evidence only. Reconstructed solid albedo and independent procedural channels preserve requested physical scalars, avoiding baked highlights.",
        "usage": "Evidence only; solid dielectric/metal albedo with independent procedural channels. Derived related metals share titanium surface evidence; gold hue is observed on rear contacts."
      }
    },
    {
      "id": "titanium",
      "name": "titanium",
      "type": "physical",
      "shaderModel": "MeshPhysicalMaterial",
      "baseColor": "#34383f",
      "color": "#34383f",
      "albedo": {
        "dominant": "#34383f",
        "secondary": [
          "#34383f"
        ],
        "samplingNotes": "Clear glass reflects environment; emerald color specified by user; titanium dark neutral from rear crop."
      },
      "colorVariation": {
        "palette": [
          "#34383f"
        ],
        "pattern": "solid",
        "amplitude": 0,
        "heightCorrelation": 0.3
      },
      "textureResolution": 1024,
      "textureProjection": {
        "mode": "uv",
        "repeat": [
          2.0,
          2.0
        ],
        "anisotropy": 8,
        "texelDensityIntent": "Preserve stable world/object-scale detail; do not stretch micro detail with component scale."
      },
      "surfaceFrequencyBands": [
        {
          "id": "macro",
          "frequency": 2,
          "amplitude": 0.001,
          "role": "revolved cross-section"
        },
        {
          "id": "meso",
          "frequency": 18,
          "amplitude": 0.01,
          "role": "flutes and chamfers"
        },
        {
          "id": "micro",
          "frequency": 280,
          "amplitude": 0.003,
          "role": "brushed metal normal independent of albedo"
        }
      ],
      "roughness": {
        "base": 0.25,
        "variation": 0.035,
        "map": "independent-procedural-field",
        "localResponse": "higher roughness in cavities, lower roughness on worn edges"
      },
      "metalness": {
        "base": 0.85,
        "variation": 0.0
      },
      "normal": {
        "pattern": "circumferential-brushing",
        "strength": 0.06,
        "scale": 280,
        "space": "tangent"
      },
      "bump": {
        "pattern": "none",
        "amplitude": 0.0,
        "scale": 1.0
      },
      "displacement": {
        "pattern": "none",
        "amplitude": 0.0,
        "scale": 1.0,
        "silhouetteAffects": false
      },
      "ambientOcclusion": {
        "cavityStrength": 0.25,
        "contactShadowBias": 0.35,
        "notes": "Darken creases, seams, intersections, and recessed local features."
      },
      "wear": {
        "edgeWear": 0.0,
        "scratches": [],
        "chips": []
      },
      "dirt": {
        "amount": 0.0,
        "cavityBias": 0.0,
        "color": "#2F2A22"
      },
      "localOverrides": [
        {
          "id": "titanium-edge-response",
          "region": "beveled edges",
          "roughness": 0.21,
          "description": "Lower roughness on narrow chamfer edges; cavities retain base response",
          "evidenceRefs": [
            "rear"
          ]
        }
      ],
      "shaderNotes": [
        "Prefer MeshPhysicalMaterial when clearcoat, sheen, transmission, or thin-surface response is observed; otherwise use MeshStandardMaterial-compatible PBR channels.",
        "Generate albedo, roughness, height/normal, and AO independently; never alias albedo into roughness.",
        "Use normal/bump/displacement only when they map to observed surface relief.",
        "Use displacement geometry when the observed relief changes the close-up silhouette; texture-only relief is insufficient there."
      ],
      "notes": "User-provided PBR scalars authoritative. Reference pixels include reflected light, not a painted finish.",
      "transmission": 0,
      "ior": 1.52,
      "dispersion": 0,
      "thickness": 0,
      "clearcoat": 0.08,
      "anisotropy": 0.65,
      "referencePbrLimitation": "Extraction records reflection/color evidence only. Reconstructed solid albedo and independent procedural channels preserve requested physical scalars, avoiding baked highlights.",
      "referencePbr": {
        "sourceImage": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\references\\titanium-crop.png",
        "confidence": 0.831,
        "estimatedFidelity": 0.831,
        "targetThreshold": 0.7,
        "verdict": "pass",
        "maps": {
          "albedo": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_albedo.png",
            "url": "titanium_albedo.png",
            "channel": "albedo",
            "source": "reference-pixel-extraction"
          },
          "roughness": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_roughness.png",
            "url": "titanium_roughness.png",
            "channel": "roughness",
            "source": "reference-pixel-extraction"
          },
          "height": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_height.png",
            "url": "titanium_height.png",
            "channel": "height",
            "source": "reference-pixel-extraction"
          },
          "normal": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_normal.png",
            "url": "titanium_normal.png",
            "channel": "normal",
            "source": "reference-pixel-extraction"
          },
          "ao": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_ao.png",
            "url": "titanium_ao.png",
            "channel": "ao",
            "source": "reference-pixel-extraction"
          }
        },
        "usable": true,
        "hardLimit": "Extraction records reflection/color evidence only. Reconstructed solid albedo and independent procedural channels preserve requested physical scalars, avoiding baked highlights.",
        "usage": "Evidence only; solid dielectric/metal albedo with independent procedural channels. Derived related metals share titanium surface evidence; gold hue is observed on rear contacts."
      }
    },
    {
      "id": "dark-metal",
      "name": "dark-metal",
      "type": "physical",
      "shaderModel": "MeshPhysicalMaterial",
      "baseColor": "#14171d",
      "color": "#14171d",
      "albedo": {
        "dominant": "#14171d",
        "secondary": [
          "#14171d"
        ],
        "samplingNotes": "Clear glass reflects environment; emerald color specified by user; titanium dark neutral from rear crop."
      },
      "colorVariation": {
        "palette": [
          "#14171d"
        ],
        "pattern": "solid",
        "amplitude": 0,
        "heightCorrelation": 0.3
      },
      "textureResolution": 1024,
      "textureProjection": {
        "mode": "uv",
        "repeat": [
          2.0,
          2.0
        ],
        "anisotropy": 8,
        "texelDensityIntent": "Preserve stable world/object-scale detail; do not stretch micro detail with component scale."
      },
      "surfaceFrequencyBands": [
        {
          "id": "macro",
          "frequency": 2,
          "amplitude": 0.001,
          "role": "revolved cross-section"
        },
        {
          "id": "meso",
          "frequency": 18,
          "amplitude": 0.01,
          "role": "flutes and chamfers"
        },
        {
          "id": "micro",
          "frequency": 280,
          "amplitude": 0.003,
          "role": "brushed metal normal independent of albedo"
        }
      ],
      "roughness": {
        "base": 0.32,
        "variation": 0.035,
        "map": "independent-procedural-field",
        "localResponse": "higher roughness in cavities, lower roughness on worn edges"
      },
      "metalness": {
        "base": 0.85,
        "variation": 0.0
      },
      "normal": {
        "pattern": "circumferential-brushing",
        "strength": 0.06,
        "scale": 280,
        "space": "tangent"
      },
      "bump": {
        "pattern": "none",
        "amplitude": 0.0,
        "scale": 1.0
      },
      "displacement": {
        "pattern": "none",
        "amplitude": 0.0,
        "scale": 1.0,
        "silhouetteAffects": false
      },
      "ambientOcclusion": {
        "cavityStrength": 0.25,
        "contactShadowBias": 0.35,
        "notes": "Darken creases, seams, intersections, and recessed local features."
      },
      "wear": {
        "edgeWear": 0.0,
        "scratches": [],
        "chips": []
      },
      "dirt": {
        "amount": 0.0,
        "cavityBias": 0.0,
        "color": "#2F2A22"
      },
      "localOverrides": [
        {
          "id": "dark-metal-edge-response",
          "region": "beveled edges",
          "roughness": 0.28,
          "description": "Lower roughness on narrow chamfer edges; cavities retain base response",
          "evidenceRefs": [
            "rear"
          ]
        }
      ],
      "shaderNotes": [
        "Prefer MeshPhysicalMaterial when clearcoat, sheen, transmission, or thin-surface response is observed; otherwise use MeshStandardMaterial-compatible PBR channels.",
        "Generate albedo, roughness, height/normal, and AO independently; never alias albedo into roughness.",
        "Use normal/bump/displacement only when they map to observed surface relief.",
        "Use displacement geometry when the observed relief changes the close-up silhouette; texture-only relief is insufficient there."
      ],
      "notes": "User-provided PBR scalars authoritative. Reference pixels include reflected light, not a painted finish.",
      "transmission": 0,
      "ior": 1.52,
      "dispersion": 0,
      "thickness": 0,
      "clearcoat": 0.08,
      "anisotropy": 0.65,
      "referencePbrLimitation": "Extraction records reflection/color evidence only. Reconstructed solid albedo and independent procedural channels preserve requested physical scalars, avoiding baked highlights.",
      "referencePbr": {
        "sourceImage": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\references\\titanium-crop.png",
        "confidence": 0.831,
        "estimatedFidelity": 0.831,
        "targetThreshold": 0.7,
        "verdict": "pass",
        "maps": {
          "albedo": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_albedo.png",
            "url": "titanium_albedo.png",
            "channel": "albedo",
            "source": "reference-pixel-extraction"
          },
          "roughness": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_roughness.png",
            "url": "titanium_roughness.png",
            "channel": "roughness",
            "source": "reference-pixel-extraction"
          },
          "height": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_height.png",
            "url": "titanium_height.png",
            "channel": "height",
            "source": "reference-pixel-extraction"
          },
          "normal": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_normal.png",
            "url": "titanium_normal.png",
            "channel": "normal",
            "source": "reference-pixel-extraction"
          },
          "ao": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_ao.png",
            "url": "titanium_ao.png",
            "channel": "ao",
            "source": "reference-pixel-extraction"
          }
        },
        "usable": true,
        "hardLimit": "Extraction records reflection/color evidence only. Reconstructed solid albedo and independent procedural channels preserve requested physical scalars, avoiding baked highlights.",
        "usage": "Evidence only; solid dielectric/metal albedo with independent procedural channels. Derived related metals share titanium surface evidence; gold hue is observed on rear contacts."
      }
    },
    {
      "id": "edge-metal",
      "name": "edge-metal",
      "type": "physical",
      "shaderModel": "MeshPhysicalMaterial",
      "baseColor": "#8a939b",
      "color": "#8a939b",
      "albedo": {
        "dominant": "#8a939b",
        "secondary": [
          "#8a939b"
        ],
        "samplingNotes": "Clear glass reflects environment; emerald color specified by user; titanium dark neutral from rear crop."
      },
      "colorVariation": {
        "palette": [
          "#8a939b"
        ],
        "pattern": "solid",
        "amplitude": 0,
        "heightCorrelation": 0.3
      },
      "textureResolution": 1024,
      "textureProjection": {
        "mode": "uv",
        "repeat": [
          2.0,
          2.0
        ],
        "anisotropy": 8,
        "texelDensityIntent": "Preserve stable world/object-scale detail; do not stretch micro detail with component scale."
      },
      "surfaceFrequencyBands": [
        {
          "id": "macro",
          "frequency": 2,
          "amplitude": 0.001,
          "role": "revolved cross-section"
        },
        {
          "id": "meso",
          "frequency": 18,
          "amplitude": 0.01,
          "role": "flutes and chamfers"
        },
        {
          "id": "micro",
          "frequency": 280,
          "amplitude": 0.003,
          "role": "brushed metal normal independent of albedo"
        }
      ],
      "roughness": {
        "base": 0.18,
        "variation": 0.035,
        "map": "independent-procedural-field",
        "localResponse": "higher roughness in cavities, lower roughness on worn edges"
      },
      "metalness": {
        "base": 0.9,
        "variation": 0.0
      },
      "normal": {
        "pattern": "circumferential-brushing",
        "strength": 0.06,
        "scale": 280,
        "space": "tangent"
      },
      "bump": {
        "pattern": "none",
        "amplitude": 0.0,
        "scale": 1.0
      },
      "displacement": {
        "pattern": "none",
        "amplitude": 0.0,
        "scale": 1.0,
        "silhouetteAffects": false
      },
      "ambientOcclusion": {
        "cavityStrength": 0.25,
        "contactShadowBias": 0.35,
        "notes": "Darken creases, seams, intersections, and recessed local features."
      },
      "wear": {
        "edgeWear": 0.0,
        "scratches": [],
        "chips": []
      },
      "dirt": {
        "amount": 0.0,
        "cavityBias": 0.0,
        "color": "#2F2A22"
      },
      "localOverrides": [
        {
          "id": "edge-metal-edge-response",
          "region": "beveled edges",
          "roughness": 0.13999999999999999,
          "description": "Lower roughness on narrow chamfer edges; cavities retain base response",
          "evidenceRefs": [
            "rear"
          ]
        }
      ],
      "shaderNotes": [
        "Prefer MeshPhysicalMaterial when clearcoat, sheen, transmission, or thin-surface response is observed; otherwise use MeshStandardMaterial-compatible PBR channels.",
        "Generate albedo, roughness, height/normal, and AO independently; never alias albedo into roughness.",
        "Use normal/bump/displacement only when they map to observed surface relief.",
        "Use displacement geometry when the observed relief changes the close-up silhouette; texture-only relief is insufficient there."
      ],
      "notes": "User-provided PBR scalars authoritative. Reference pixels include reflected light, not a painted finish.",
      "transmission": 0,
      "ior": 1.52,
      "dispersion": 0,
      "thickness": 0,
      "clearcoat": 0.08,
      "anisotropy": 0.65,
      "referencePbrLimitation": "Extraction records reflection/color evidence only. Reconstructed solid albedo and independent procedural channels preserve requested physical scalars, avoiding baked highlights.",
      "referencePbr": {
        "sourceImage": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\references\\titanium-crop.png",
        "confidence": 0.831,
        "estimatedFidelity": 0.831,
        "targetThreshold": 0.7,
        "verdict": "pass",
        "maps": {
          "albedo": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_albedo.png",
            "url": "titanium_albedo.png",
            "channel": "albedo",
            "source": "reference-pixel-extraction"
          },
          "roughness": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_roughness.png",
            "url": "titanium_roughness.png",
            "channel": "roughness",
            "source": "reference-pixel-extraction"
          },
          "height": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_height.png",
            "url": "titanium_height.png",
            "channel": "height",
            "source": "reference-pixel-extraction"
          },
          "normal": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_normal.png",
            "url": "titanium_normal.png",
            "channel": "normal",
            "source": "reference-pixel-extraction"
          },
          "ao": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_ao.png",
            "url": "titanium_ao.png",
            "channel": "ao",
            "source": "reference-pixel-extraction"
          }
        },
        "usable": true,
        "hardLimit": "Extraction records reflection/color evidence only. Reconstructed solid albedo and independent procedural channels preserve requested physical scalars, avoiding baked highlights.",
        "usage": "Evidence only; solid dielectric/metal albedo with independent procedural channels. Derived related metals share titanium surface evidence; gold hue is observed on rear contacts."
      }
    },
    {
      "id": "emerald",
      "name": "emerald",
      "type": "physical",
      "shaderModel": "MeshPhysicalMaterial",
      "baseColor": "#00E599",
      "color": "#00E599",
      "albedo": {
        "dominant": "#00E599",
        "secondary": [
          "#00E599"
        ],
        "samplingNotes": "Clear glass reflects environment; emerald color specified by user; titanium dark neutral from rear crop."
      },
      "colorVariation": {
        "palette": [
          "#00E599"
        ],
        "pattern": "solid",
        "amplitude": 0,
        "heightCorrelation": 0.3
      },
      "textureResolution": 1024,
      "textureProjection": {
        "mode": "uv",
        "repeat": [
          2.0,
          2.0
        ],
        "anisotropy": 8,
        "texelDensityIntent": "Preserve stable world/object-scale detail; do not stretch micro detail with component scale."
      },
      "surfaceFrequencyBands": [
        {
          "id": "macro",
          "frequency": 2,
          "amplitude": 0.001,
          "role": "revolved cross-section"
        },
        {
          "id": "meso",
          "frequency": 18,
          "amplitude": 0.01,
          "role": "flutes and chamfers"
        },
        {
          "id": "micro",
          "frequency": 280,
          "amplitude": 0.001,
          "role": "brushed metal normal independent of albedo"
        }
      ],
      "roughness": {
        "base": 0.045,
        "variation": 0.002,
        "map": "independent-procedural-field",
        "localResponse": "higher roughness in cavities, lower roughness on worn edges"
      },
      "metalness": {
        "base": 0,
        "variation": 0.0
      },
      "normal": {
        "pattern": "polished",
        "strength": 0,
        "scale": 280,
        "space": "tangent"
      },
      "bump": {
        "pattern": "none",
        "amplitude": 0.0,
        "scale": 1.0
      },
      "displacement": {
        "pattern": "none",
        "amplitude": 0.0,
        "scale": 1.0,
        "silhouetteAffects": false
      },
      "ambientOcclusion": {
        "cavityStrength": 0.25,
        "contactShadowBias": 0.35,
        "notes": "Darken creases, seams, intersections, and recessed local features."
      },
      "wear": {
        "edgeWear": 0.0,
        "scratches": [],
        "chips": []
      },
      "dirt": {
        "amount": 0.0,
        "cavityBias": 0.0,
        "color": "#2F2A22"
      },
      "localOverrides": [
        {
          "id": "emerald-edge-response",
          "region": "beveled edges",
          "roughness": 0.02,
          "description": "Lower roughness on narrow chamfer edges; cavities retain base response",
          "evidenceRefs": [
            "front"
          ]
        }
      ],
      "shaderNotes": [
        "Prefer MeshPhysicalMaterial when clearcoat, sheen, transmission, or thin-surface response is observed; otherwise use MeshStandardMaterial-compatible PBR channels.",
        "Generate albedo, roughness, height/normal, and AO independently; never alias albedo into roughness.",
        "Use normal/bump/displacement only when they map to observed surface relief.",
        "Use displacement geometry when the observed relief changes the close-up silhouette; texture-only relief is insufficient there."
      ],
      "notes": "User-provided PBR scalars authoritative. Reference pixels include reflected light, not a painted finish.",
      "transmission": 0.82,
      "ior": 1.52,
      "dispersion": 0.08,
      "thickness": 0.46,
      "clearcoat": 0.3,
      "anisotropy": 0,
      "emissive": "#00E599",
      "emissiveIntensity": 0.55,
      "referencePbrLimitation": "Extraction records reflection/color evidence only. Reconstructed solid albedo and independent procedural channels preserve requested physical scalars, avoiding baked highlights.",
      "referencePbr": {
        "sourceImage": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\references\\emerald-crop.png",
        "confidence": 0.829,
        "estimatedFidelity": 0.829,
        "targetThreshold": 0.7,
        "verdict": "pass",
        "maps": {
          "albedo": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\emerald\\emerald_albedo.png",
            "url": "emerald_albedo.png",
            "channel": "albedo",
            "source": "reference-pixel-extraction"
          },
          "roughness": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\emerald\\emerald_roughness.png",
            "url": "emerald_roughness.png",
            "channel": "roughness",
            "source": "reference-pixel-extraction"
          },
          "height": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\emerald\\emerald_height.png",
            "url": "emerald_height.png",
            "channel": "height",
            "source": "reference-pixel-extraction"
          },
          "normal": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\emerald\\emerald_normal.png",
            "url": "emerald_normal.png",
            "channel": "normal",
            "source": "reference-pixel-extraction"
          },
          "ao": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\emerald\\emerald_ao.png",
            "url": "emerald_ao.png",
            "channel": "ao",
            "source": "reference-pixel-extraction"
          }
        },
        "usable": true,
        "hardLimit": "Extraction records reflection/color evidence only. Reconstructed solid albedo and independent procedural channels preserve requested physical scalars, avoiding baked highlights.",
        "usage": "Evidence only; solid dielectric/metal albedo with independent procedural channels. Derived related metals share titanium surface evidence; gold hue is observed on rear contacts."
      }
    },
    {
      "id": "rear-glass",
      "name": "rear-glass",
      "type": "physical",
      "shaderModel": "MeshPhysicalMaterial",
      "baseColor": "#1d182d",
      "color": "#1d182d",
      "albedo": {
        "dominant": "#1d182d",
        "secondary": [
          "#1d182d"
        ],
        "samplingNotes": "Clear glass reflects environment; emerald color specified by user; titanium dark neutral from rear crop."
      },
      "colorVariation": {
        "palette": [
          "#1d182d"
        ],
        "pattern": "solid",
        "amplitude": 0,
        "heightCorrelation": 0.3
      },
      "textureResolution": 1024,
      "textureProjection": {
        "mode": "uv",
        "repeat": [
          2.0,
          2.0
        ],
        "anisotropy": 8,
        "texelDensityIntent": "Preserve stable world/object-scale detail; do not stretch micro detail with component scale."
      },
      "surfaceFrequencyBands": [
        {
          "id": "macro",
          "frequency": 2,
          "amplitude": 0.001,
          "role": "revolved cross-section"
        },
        {
          "id": "meso",
          "frequency": 18,
          "amplitude": 0.01,
          "role": "flutes and chamfers"
        },
        {
          "id": "micro",
          "frequency": 280,
          "amplitude": 0.001,
          "role": "brushed metal normal independent of albedo"
        }
      ],
      "roughness": {
        "base": 0.04,
        "variation": 0.002,
        "map": "independent-procedural-field",
        "localResponse": "higher roughness in cavities, lower roughness on worn edges"
      },
      "metalness": {
        "base": 0,
        "variation": 0.0
      },
      "normal": {
        "pattern": "polished",
        "strength": 0,
        "scale": 280,
        "space": "tangent"
      },
      "bump": {
        "pattern": "none",
        "amplitude": 0.0,
        "scale": 1.0
      },
      "displacement": {
        "pattern": "none",
        "amplitude": 0.0,
        "scale": 1.0,
        "silhouetteAffects": false
      },
      "ambientOcclusion": {
        "cavityStrength": 0.25,
        "contactShadowBias": 0.35,
        "notes": "Darken creases, seams, intersections, and recessed local features."
      },
      "wear": {
        "edgeWear": 0.0,
        "scratches": [],
        "chips": []
      },
      "dirt": {
        "amount": 0.0,
        "cavityBias": 0.0,
        "color": "#2F2A22"
      },
      "localOverrides": [
        {
          "id": "rear-glass-edge-response",
          "region": "beveled edges",
          "roughness": 0.02,
          "description": "Lower roughness on narrow chamfer edges; cavities retain base response",
          "evidenceRefs": [
            "front"
          ]
        }
      ],
      "shaderNotes": [
        "Prefer MeshPhysicalMaterial when clearcoat, sheen, transmission, or thin-surface response is observed; otherwise use MeshStandardMaterial-compatible PBR channels.",
        "Generate albedo, roughness, height/normal, and AO independently; never alias albedo into roughness.",
        "Use normal/bump/displacement only when they map to observed surface relief.",
        "Use displacement geometry when the observed relief changes the close-up silhouette; texture-only relief is insufficient there."
      ],
      "notes": "User-provided PBR scalars authoritative. Reference pixels include reflected light, not a painted finish.",
      "transmission": 0.85,
      "ior": 1.52,
      "dispersion": 0.08,
      "thickness": 0.46,
      "clearcoat": 0.3,
      "anisotropy": 0,
      "referencePbrLimitation": "Extraction records reflection/color evidence only. Reconstructed solid albedo and independent procedural channels preserve requested physical scalars, avoiding baked highlights.",
      "referencePbr": {
        "sourceImage": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\references\\glass-crop.png",
        "confidence": 0.873,
        "estimatedFidelity": 0.873,
        "targetThreshold": 0.7,
        "verdict": "pass",
        "maps": {
          "albedo": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\glass\\glass_albedo.png",
            "url": "glass_albedo.png",
            "channel": "albedo",
            "source": "reference-pixel-extraction"
          },
          "roughness": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\glass\\glass_roughness.png",
            "url": "glass_roughness.png",
            "channel": "roughness",
            "source": "reference-pixel-extraction"
          },
          "height": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\glass\\glass_height.png",
            "url": "glass_height.png",
            "channel": "height",
            "source": "reference-pixel-extraction"
          },
          "normal": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\glass\\glass_normal.png",
            "url": "glass_normal.png",
            "channel": "normal",
            "source": "reference-pixel-extraction"
          },
          "ao": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\glass\\glass_ao.png",
            "url": "glass_ao.png",
            "channel": "ao",
            "source": "reference-pixel-extraction"
          }
        },
        "usable": true,
        "hardLimit": "Extraction records reflection/color evidence only. Reconstructed solid albedo and independent procedural channels preserve requested physical scalars, avoiding baked highlights.",
        "usage": "Evidence only; solid dielectric/metal albedo with independent procedural channels. Derived related metals share titanium surface evidence; gold hue is observed on rear contacts."
      }
    },
    {
      "id": "prism",
      "name": "prism",
      "type": "physical",
      "shaderModel": "MeshPhysicalMaterial",
      "baseColor": "#edf7ff",
      "color": "#edf7ff",
      "albedo": {
        "dominant": "#edf7ff",
        "secondary": [
          "#edf7ff"
        ],
        "samplingNotes": "Clear glass reflects environment; emerald color specified by user; titanium dark neutral from rear crop."
      },
      "colorVariation": {
        "palette": [
          "#edf7ff"
        ],
        "pattern": "solid",
        "amplitude": 0,
        "heightCorrelation": 0.3
      },
      "textureResolution": 1024,
      "textureProjection": {
        "mode": "uv",
        "repeat": [
          2.0,
          2.0
        ],
        "anisotropy": 8,
        "texelDensityIntent": "Preserve stable world/object-scale detail; do not stretch micro detail with component scale."
      },
      "surfaceFrequencyBands": [
        {
          "id": "macro",
          "frequency": 2,
          "amplitude": 0.001,
          "role": "revolved cross-section"
        },
        {
          "id": "meso",
          "frequency": 18,
          "amplitude": 0.01,
          "role": "flutes and chamfers"
        },
        {
          "id": "micro",
          "frequency": 280,
          "amplitude": 0.001,
          "role": "brushed metal normal independent of albedo"
        }
      ],
      "roughness": {
        "base": 0.03,
        "variation": 0.002,
        "map": "independent-procedural-field",
        "localResponse": "higher roughness in cavities, lower roughness on worn edges"
      },
      "metalness": {
        "base": 0,
        "variation": 0.0
      },
      "normal": {
        "pattern": "polished",
        "strength": 0,
        "scale": 280,
        "space": "tangent"
      },
      "bump": {
        "pattern": "none",
        "amplitude": 0.0,
        "scale": 1.0
      },
      "displacement": {
        "pattern": "none",
        "amplitude": 0.0,
        "scale": 1.0,
        "silhouetteAffects": false
      },
      "ambientOcclusion": {
        "cavityStrength": 0.25,
        "contactShadowBias": 0.35,
        "notes": "Darken creases, seams, intersections, and recessed local features."
      },
      "wear": {
        "edgeWear": 0.0,
        "scratches": [],
        "chips": []
      },
      "dirt": {
        "amount": 0.0,
        "cavityBias": 0.0,
        "color": "#2F2A22"
      },
      "localOverrides": [
        {
          "id": "prism-edge-response",
          "region": "beveled edges",
          "roughness": 0.02,
          "description": "Lower roughness on narrow chamfer edges; cavities retain base response",
          "evidenceRefs": [
            "front"
          ]
        }
      ],
      "shaderNotes": [
        "Prefer MeshPhysicalMaterial when clearcoat, sheen, transmission, or thin-surface response is observed; otherwise use MeshStandardMaterial-compatible PBR channels.",
        "Generate albedo, roughness, height/normal, and AO independently; never alias albedo into roughness.",
        "Use normal/bump/displacement only when they map to observed surface relief.",
        "Use displacement geometry when the observed relief changes the close-up silhouette; texture-only relief is insufficient there."
      ],
      "notes": "User-provided PBR scalars authoritative. Reference pixels include reflected light, not a painted finish.",
      "transmission": 0.98,
      "ior": 1.52,
      "dispersion": 0.08,
      "thickness": 0.46,
      "clearcoat": 0.3,
      "anisotropy": 0,
      "referencePbrLimitation": "Extraction records reflection/color evidence only. Reconstructed solid albedo and independent procedural channels preserve requested physical scalars, avoiding baked highlights.",
      "referencePbr": {
        "sourceImage": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\references\\prism-crop.png",
        "confidence": 0.909,
        "estimatedFidelity": 0.909,
        "targetThreshold": 0.7,
        "verdict": "pass",
        "maps": {
          "albedo": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\prism\\prism_albedo.png",
            "url": "prism_albedo.png",
            "channel": "albedo",
            "source": "reference-pixel-extraction"
          },
          "roughness": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\prism\\prism_roughness.png",
            "url": "prism_roughness.png",
            "channel": "roughness",
            "source": "reference-pixel-extraction"
          },
          "height": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\prism\\prism_height.png",
            "url": "prism_height.png",
            "channel": "height",
            "source": "reference-pixel-extraction"
          },
          "normal": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\prism\\prism_normal.png",
            "url": "prism_normal.png",
            "channel": "normal",
            "source": "reference-pixel-extraction"
          },
          "ao": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\prism\\prism_ao.png",
            "url": "prism_ao.png",
            "channel": "ao",
            "source": "reference-pixel-extraction"
          }
        },
        "usable": true,
        "hardLimit": "Extraction records reflection/color evidence only. Reconstructed solid albedo and independent procedural channels preserve requested physical scalars, avoiding baked highlights.",
        "usage": "Evidence only; solid dielectric/metal albedo with independent procedural channels. Derived related metals share titanium surface evidence; gold hue is observed on rear contacts."
      }
    },
    {
      "id": "gold",
      "name": "gold",
      "type": "physical",
      "shaderModel": "MeshPhysicalMaterial",
      "baseColor": "#c2a165",
      "color": "#c2a165",
      "albedo": {
        "dominant": "#c2a165",
        "secondary": [
          "#c2a165"
        ],
        "samplingNotes": "Clear glass reflects environment; emerald color specified by user; titanium dark neutral from rear crop."
      },
      "colorVariation": {
        "palette": [
          "#c2a165"
        ],
        "pattern": "solid",
        "amplitude": 0,
        "heightCorrelation": 0.3
      },
      "textureResolution": 1024,
      "textureProjection": {
        "mode": "uv",
        "repeat": [
          2.0,
          2.0
        ],
        "anisotropy": 8,
        "texelDensityIntent": "Preserve stable world/object-scale detail; do not stretch micro detail with component scale."
      },
      "surfaceFrequencyBands": [
        {
          "id": "macro",
          "frequency": 2,
          "amplitude": 0.001,
          "role": "revolved cross-section"
        },
        {
          "id": "meso",
          "frequency": 18,
          "amplitude": 0.01,
          "role": "flutes and chamfers"
        },
        {
          "id": "micro",
          "frequency": 280,
          "amplitude": 0.003,
          "role": "brushed metal normal independent of albedo"
        }
      ],
      "roughness": {
        "base": 0.25,
        "variation": 0.035,
        "map": "independent-procedural-field",
        "localResponse": "higher roughness in cavities, lower roughness on worn edges"
      },
      "metalness": {
        "base": 0.9,
        "variation": 0.0
      },
      "normal": {
        "pattern": "circumferential-brushing",
        "strength": 0.06,
        "scale": 280,
        "space": "tangent"
      },
      "bump": {
        "pattern": "none",
        "amplitude": 0.0,
        "scale": 1.0
      },
      "displacement": {
        "pattern": "none",
        "amplitude": 0.0,
        "scale": 1.0,
        "silhouetteAffects": false
      },
      "ambientOcclusion": {
        "cavityStrength": 0.25,
        "contactShadowBias": 0.35,
        "notes": "Darken creases, seams, intersections, and recessed local features."
      },
      "wear": {
        "edgeWear": 0.0,
        "scratches": [],
        "chips": []
      },
      "dirt": {
        "amount": 0.0,
        "cavityBias": 0.0,
        "color": "#2F2A22"
      },
      "localOverrides": [
        {
          "id": "gold-edge-response",
          "region": "beveled edges",
          "roughness": 0.21,
          "description": "Lower roughness on narrow chamfer edges; cavities retain base response",
          "evidenceRefs": [
            "rear"
          ]
        }
      ],
      "shaderNotes": [
        "Prefer MeshPhysicalMaterial when clearcoat, sheen, transmission, or thin-surface response is observed; otherwise use MeshStandardMaterial-compatible PBR channels.",
        "Generate albedo, roughness, height/normal, and AO independently; never alias albedo into roughness.",
        "Use normal/bump/displacement only when they map to observed surface relief.",
        "Use displacement geometry when the observed relief changes the close-up silhouette; texture-only relief is insufficient there."
      ],
      "notes": "User-provided PBR scalars authoritative. Reference pixels include reflected light, not a painted finish.",
      "transmission": 0,
      "ior": 1.52,
      "dispersion": 0,
      "thickness": 0,
      "clearcoat": 0.08,
      "anisotropy": 0,
      "referencePbrLimitation": "Extraction records reflection/color evidence only. Reconstructed solid albedo and independent procedural channels preserve requested physical scalars, avoiding baked highlights.",
      "referencePbr": {
        "sourceImage": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\references\\titanium-crop.png",
        "confidence": 0.831,
        "estimatedFidelity": 0.831,
        "targetThreshold": 0.7,
        "verdict": "pass",
        "maps": {
          "albedo": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_albedo.png",
            "url": "titanium_albedo.png",
            "channel": "albedo",
            "source": "reference-pixel-extraction"
          },
          "roughness": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_roughness.png",
            "url": "titanium_roughness.png",
            "channel": "roughness",
            "source": "reference-pixel-extraction"
          },
          "height": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_height.png",
            "url": "titanium_height.png",
            "channel": "height",
            "source": "reference-pixel-extraction"
          },
          "normal": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_normal.png",
            "url": "titanium_normal.png",
            "channel": "normal",
            "source": "reference-pixel-extraction"
          },
          "ao": {
            "path": "E:\\orca\\workspaces\\webflow-projects\\codex-session-112-619\\.img2threejs\\material-evidence\\titanium\\titanium_ao.png",
            "url": "titanium_ao.png",
            "channel": "ao",
            "source": "reference-pixel-extraction"
          }
        },
        "usable": true,
        "hardLimit": "Extraction records reflection/color evidence only. Reconstructed solid albedo and independent procedural channels preserve requested physical scalars, avoiding baked highlights.",
        "usage": "Evidence only; solid dielectric/metal albedo with independent procedural channels. Derived related metals share titanium surface evidence; gold hue is observed on rear contacts."
      }
    }
  ],
  "performanceBudget": {
    "qualityPriority": "reference-fidelity",
    "targetTriangles": 200000,
    "maxDrawCalls": 110,
    "textureSize": 1024,
    "fpsTarget": 30,
    "optimizationPolicy": "Reach accepted visual fidelity first, then optimize without removing reference-critical geometry or surface layers."
  }
}]]>
    </file>
    <file path="src/app/(lenus)/lenus/model/lensMaterials.ts">
<![CDATA[import * as THREE from "three";
import type { OpticalLensSpec } from "./createOpticalLensModel";

function dataMap(data: Uint8Array, size: number) {
  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  texture.colorSpace = THREE.NoColorSpace;
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

/** Independent scalar/normal fields. No reflected reference pixels are painted on geometry. */
export function createLensMaterials(spec: OpticalLensSpec, surface = false) {
  const size = 1024;
  const roughness = new Uint8Array(size * size * 4);
  const normals = new Uint8Array(size * size * 4);
  const emission = new Uint8Array(size * size * 4);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const i = (y * size + x) * 4;
    const grain = Math.sin(y * 1.77 + Math.sin(x * .011) * .6) + (surface ? .25 * Math.sin(y * 2.63 + x * .027) : 0);
    const r = Math.round(239 + 15 * Math.sin(y * .813 + Math.sin(x * .031)));
    roughness.set([r, r, r, 255], i);
    normals.set([128, Math.round(128 + grain * 12), 254, 255], i);
    const u = x / size, v = y / size;
    const e = Math.round(255 * (.08 + .92 * Math.exp(-((u - .25) ** 2 * 75 + (v - .5) ** 2 * 35))));
    emission.set([e, e, e, 255], i);
  }
  const roughnessMap = dataMap(roughness, size);
  const normalMap = dataMap(normals, size);
  const emissiveMap = dataMap(emission, size);
  emissiveMap.colorSpace = THREE.SRGBColorSpace;
  const materials = new Map<string, THREE.MeshPhysicalMaterial>();
  for (const s of spec.materials) {
    const material = new THREE.MeshPhysicalMaterial({
      name: s.id, color: s.baseColor, roughness: s.roughness.base,
      metalness: s.metalness.base, transmission: s.transmission,
      ior: s.ior, dispersion: s.dispersion, thickness: s.thickness,
      clearcoat: s.clearcoat, clearcoatRoughness: .06,
      anisotropy: s.anisotropy, envMapIntensity: 1.35,
      attenuationColor: s.transmission ? new THREE.Color(s.baseColor) : new THREE.Color("white"),
      attenuationDistance: 4,
    });
    if (s.metalness.base > .5) {
      material.roughnessMap = roughnessMap;
      material.normalMap = normalMap;
      material.normalScale.set(surface ? .22 : .12, surface ? .08 : .12);
      if (surface) material.anisotropy = .18;
    }
    if (s.id === "emerald") {
      material.emissive.set("#00E599");
      material.emissiveIntensity = .36;
      material.emissiveMap = emissiveMap;
    }
    materials.set(s.id, material);
  }
  return { materials, dispose() { materials.forEach(m => m.dispose()); roughnessMap.dispose(); normalMap.dispose(); emissiveMap.dispose(); } };
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/model/studioEnvironment.ts">
<![CDATA[import * as THREE from "three";

/** HDR radiance (values above 1) captured into a HalfFloat PMREM reflection map. */
export function createStudioEnvironment(renderer: THREE.WebGLRenderer, neon = false) {
  const studio = new THREE.Scene();
  studio.background = new THREE.Color(.25, .28, .34);
  const panels: THREE.Mesh[] = [];
  function panel(position: [number, number, number], width: number, height: number, intensity: number, color = "#ffffff") {
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity), side: THREE.DoubleSide, toneMapped: false }));
    mesh.position.fromArray(position);
    mesh.lookAt(0, 0, 0);
    studio.add(mesh);
    panels.push(mesh);
  }
  panel([-4, 5, 3], 4, 7, 14);
  panel([5, -2, 1], 1.5, 8, 9);
  panel([0, 3, -5], 7, 2, 7);
  panel([-5, -2, -2], 2, 5, 5);
  if (neon) {
    panel([-2.5, 3.2, 6], 2.2, 3.5, 0.45);
    panel([-4.2, 4, 0.6], 0.55, 8, 5.5, "#D2F802");
    panel([4.2, -3, 0.6], 0.65, 8, 4.8, "#A855F7");
  }
  const generator = new THREE.PMREMGenerator(renderer);
  const target = generator.fromScene(studio, .055, .1, 30, { size: 256 });
  generator.dispose();
  panels.forEach(p => { p.geometry.dispose(); (p.material as THREE.Material).dispose(); });
  return target;
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/scene/LenusSceneController.ts">
<![CDATA[import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createOpticalLensModel, type LensRuntime } from "../model/createOpticalLensModel";
import { createStudioEnvironment } from "../model/studioEnvironment";
import { getPartTelemetry, type LenusPartInfo } from "./telemetry";
export { getPartTelemetry, type LenusPartInfo } from "./telemetry";

export function normalizePointer(value: number) { return Number.isFinite(value) ? THREE.MathUtils.clamp(value,-1,1) : 0; }
export function fitHeroFrustumHalfHeight(width: number, height: number) {
  const aspect = Math.max(1,Number.isFinite(width)?width:1) / Math.max(1,Number.isFinite(height)?height:1);
  return Math.max(2.75,2.75/aspect);
}
const BASE_YAW=-.46, BASE_POLAR=Math.PI/2-.14, RADIUS=12;
const finite=(n:number,fallback=0)=>Number.isFinite(n)?n:fallback;
export interface LenusSceneOptions {
  onFps?: (fps:number)=>void;
  onContextChange?: (state:"lost"|"restored")=>void;
  onInteractionChange?: (dragging:boolean)=>void;
  onPartChange?: (part:LenusPartInfo)=>void;
}

/** Owns the canvas, GPU resources and render clock; no browser work occurs in construction. */
export class LenusSceneController {
  private readonly scene=new THREE.Scene();
  private readonly camera=new THREE.OrthographicCamera(-3,3,3,-3,.1,60);
  private readonly raycaster=new THREE.Raycaster();
  private renderer:THREE.WebGLRenderer|null=null;
  private controls:OrbitControls|null=null;
  private environment:THREE.WebGLRenderTarget|null=null;
  private model:THREE.Group|null=null;
  private runtime:LensRuntime|null=null;
  private disposed=false;
  private running=false;
  private contextLost=false;
  private dragging=false;
  private pointer={x:0,y:0};
  private explodeTarget=0;
  private explode=0;
  private focusTarget=0;
  private focus=0;
  private elapsed=0;
  private lastTime:number|null=null;
  private frames=0;
  private sampleTime=0;
  private slowTime=0;
  private resolutionScale=1;
  private viewport={width:1,height:1};
  constructor(private readonly options:LenusSceneOptions={}) {}

  init(container:HTMLElement) {
    if(this.disposed||this.renderer)return;
    try {
      const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:"high-performance"});
      this.renderer=renderer;
      renderer.setClearColor(0x000000,0);
      renderer.outputColorSpace=THREE.SRGBColorSpace;
      renderer.toneMapping=THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure=1;
      const canvas=renderer.domElement;
      canvas.dataset.lenusRenderer="true";
      canvas.setAttribute("aria-hidden","true");
      canvas.addEventListener("webglcontextlost",this.onLost);
      canvas.addEventListener("webglcontextrestored",this.onRestored);
      container.appendChild(canvas);
      this.scene.background=null;
      this.environment=createStudioEnvironment(renderer,true);
      this.scene.environment=this.environment.texture;
      this.model=createOpticalLensModel(undefined,{pass:"optimization-pass",quality:"high"});
      this.runtime=this.model.userData.sculptRuntime as LensRuntime;
      this.scene.add(this.model,new THREE.HemisphereLight(0xe5eeff,0x282631,2));
      for(const [color,intensity,position] of [
        [0xffffff,3,[-3,5,4]],[0xdde4ff,1.4,[3,0,-4]],
        [0xD2F802,1.8,[-4,4,-.4]],[0xA855F7,1.5,[4,-3,-.4]],
      ] as const) {
        const light=new THREE.DirectionalLight(color,intensity);
        light.position.set(position[0],position[1],position[2]);this.scene.add(light);
      }
      this.placeCamera(BASE_YAW,BASE_POLAR);
      const controls=new OrbitControls(this.camera,canvas);
      this.controls=controls;
      controls.enableZoom=false;controls.enablePan=false;controls.enableDamping=false;
      controls.rotateSpeed=.5;
      controls.minPolarAngle=Math.PI*.2;controls.maxPolarAngle=Math.PI*.8;
      // OrbitControls normalizes bounds outside ±π; base±π wraps both to the same rear angle.
      controls.minAzimuthAngle=-Math.PI;controls.maxAzimuthAngle=Math.PI;
      controls.addEventListener("start",this.onDragStart);
      controls.addEventListener("end",this.onDragEnd);
      // Preserve vertical page scrolling on touch; horizontal drags still inspect the lens.
      canvas.style.touchAction="pan-y pinch-zoom";
      const bounds=container.getBoundingClientRect();
      this.resize(bounds.width,bounds.height);
    } catch(error) { this.dispose();throw error; }
  }
  getRenderer(){return this.renderer;}
  resize(width:number,height:number){
    if(this.disposed||!this.renderer)return;
    this.viewport={width:Math.max(1,finite(width,1)),height:Math.max(1,finite(height,1))};
    const aspect=this.viewport.width/this.viewport.height,h=fitHeroFrustumHalfHeight(width,height);
    this.camera.left=-h*aspect;this.camera.right=h*aspect;this.camera.top=h;this.camera.bottom=-h;
    this.camera.updateProjectionMatrix();
    this.resizeBuffer();
    if(!this.contextLost)this.render();
  }
  private resizeBuffer(){
    if(!this.renderer||this.contextLost)return;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)*this.resolutionScale);
    this.renderer.setSize(this.viewport.width,this.viewport.height,false);
  }
  setPointer(x:number,y:number){if(!this.disposed)this.pointer={x:normalizePointer(x),y:normalizePointer(y)};}
  setExplodeTarget(amount:number){
    if(this.disposed)return;
    this.explodeTarget=THREE.MathUtils.clamp(finite(amount),0,1);
    if(!this.running){
      this.explode=this.explodeTarget;this.runtime?.setExplode(this.explode);
      const shards=this.runtime?.nodes.shards;
      if(shards)shards.position.y=Math.sin(this.elapsed*.65)*.035;
      this.render();
    }
  }
  setFocusTarget(radians:number){
    if(this.disposed)return;
    this.focusTarget=THREE.MathUtils.clamp(finite(radians),-Math.PI/2,Math.PI/2);
    if(!this.running){this.focus=this.focusTarget;this.runtime?.setFocusRing(this.focus);this.render();}
  }
  pickAtNormalizedCanvas(nx:number,ny:number){
    if(this.disposed||this.contextLost||!this.model||!this.runtime)return getPartTelemetry(null);
    this.scene.updateMatrixWorld(true);this.camera.updateMatrixWorld(true);
    this.raycaster.setFromCamera(new THREE.Vector2(normalizePointer(nx),normalizePointer(ny)),this.camera);
    const hit=this.raycaster.intersectObject(this.model,true)[0];
    const part=getPartTelemetry(this.runtime.pickPart(hit?.object??null)?.name??null);
    this.options.onPartChange?.(part);return part;
  }
  private placeCamera(yaw:number,polar:number){
    this.camera.position.setFromSphericalCoords(RADIUS,polar,yaw);this.camera.lookAt(0,0,0);
    this.controls?.update();
  }
  rotateView(deltaYaw:number,deltaPitch:number){
    if(this.disposed||!this.renderer||this.contextLost)return;
    const p=new THREE.Spherical().setFromVector3(this.camera.position);
    this.placeCamera(THREE.MathUtils.clamp(p.theta+finite(deltaYaw),-Math.PI,Math.PI),THREE.MathUtils.clamp(p.phi+finite(deltaPitch),Math.PI*.2,Math.PI*.8));
    this.render();
  }
  resetView(){
    if(this.disposed)return;
    this.pointer={x:0,y:0};this.setExplodeTarget(0);this.setFocusTarget(0);
    if(!this.renderer)return;
    this.model?.rotation.set(0,0,0);this.placeCamera(BASE_YAW,BASE_POLAR);
    if(!this.contextLost)this.render();
  }
  start(){
    if(this.disposed||!this.renderer)return;
    this.running=true;this.lastTime=null;
    if(this.controls)this.controls.enabled=!this.contextLost;
    if(!this.contextLost)this.renderer.setAnimationLoop(this.tick);
  }
  stop(){
    this.running=false;this.lastTime=null;this.renderer?.setAnimationLoop(null);
    if(this.controls)this.controls.enabled=false;
  }
  private tick=(time:number)=>{
    if(!this.running||this.disposed||this.contextLost||!this.renderer||!this.model||!this.runtime)return;
    const delta=this.lastTime===null?0:Math.min(.1,(time-this.lastTime)/1000);
    const realDelta=this.lastTime===null?0:(time-this.lastTime)/1000;
    this.lastTime=time;this.elapsed+=delta;
    const damp=1-Math.exp(-5*delta);
    this.explode+=(this.explodeTarget-this.explode)*damp;
    this.focus+=(this.focusTarget-this.focus)*damp;
    this.runtime.setExplode(this.explode);this.runtime.setFocusRing(this.focus);
    this.model.rotation.y+=((this.dragging?0:this.pointer.x*.14)-this.model.rotation.y)*damp;
    this.model.rotation.x+=((this.dragging?0:-this.pointer.y*.1)-this.model.rotation.x)*damp;
    const shards=this.runtime.nodes.shards;
    if(shards)shards.position.y=Math.sin(this.elapsed*.65)*.035;
    this.frames++;this.sampleTime+=realDelta;
    if(this.sampleTime>=1){
      const fps=this.frames/this.sampleTime;
      this.options.onFps?.(Math.round(fps));
      this.slowTime=fps<55?this.slowTime+this.sampleTime:0;
      if(this.slowTime>=2&&this.resolutionScale>.75){this.resolutionScale=Math.max(.75,this.resolutionScale*.85);this.resizeBuffer();this.slowTime=0;}
      this.frames=0;this.sampleTime=0;
    }
    // A buffer resize clears its pixels; render afterwards so pausing cannot freeze a blank frame.
    this.render();
  };
  private render(){if(this.renderer&&!this.contextLost)this.renderer.render(this.scene,this.camera);}
  private onDragStart=()=>{this.dragging=true;this.options.onInteractionChange?.(true);};
  private onDragEnd=()=>{this.dragging=false;this.options.onInteractionChange?.(false);};
  private onLost=(event:Event)=>{
    event.preventDefault();if(this.disposed)return;
    this.contextLost=true;this.renderer?.setAnimationLoop(null);this.lastTime=null;
    this.options.onContextChange?.("lost");
  };
  private onRestored=()=>{
    if(this.disposed||!this.renderer)return;
    this.contextLost=false;this.environment?.dispose();
    this.environment=createStudioEnvironment(this.renderer,true);this.scene.environment=this.environment.texture;
    this.resizeBuffer();this.render();this.options.onContextChange?.("restored");
    if(this.running)this.start();
  };
  dispose(){
    if(this.disposed)return;
    this.stop();this.disposed=true;
    this.controls?.removeEventListener("start",this.onDragStart);this.controls?.removeEventListener("end",this.onDragEnd);
    this.controls?.dispose();this.controls=null;
    const renderer=this.renderer;
    if(renderer){
      renderer.domElement.removeEventListener("webglcontextlost",this.onLost);
      renderer.domElement.removeEventListener("webglcontextrestored",this.onRestored);
      this.runtime?.dispose();this.environment?.dispose();this.scene.clear();
      renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();
    }
    this.renderer=null;this.runtime=null;this.model=null;this.environment=null;
  }
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/scene/telemetry.ts">
<![CDATA[export type LenusPartInfo = { id: string; label: string; material: string; role: string };

export const OPTICAL_PARTS: readonly LenusPartInfo[] = [
  { id:"assembly", label:"OPTICAL ASSEMBLY", material:"19 PARTS / PROCEDURAL OPTICS", role:"Select a part to look a little closer." },
  { id:"front-lens", label:"EMERALD OBJECTIVE CORE", material:"DOPED FLUORITE / N=1.52", role:"Primary chromatic-dispersion singlet with internal 520nm fluorescence" },
  ...["outer-glass","inner-glass"].map((id,i)=>({id,label:i===0?"OUTER FLUTED GLASS":"INNER GLASS ANNULUS",material:"OPTICAL GLASS / N=1.52",role:"Fluted transmission surface with chromatic dispersion."})),
  ...["front-shell","collar-outer","collar-middle","collar-inner","rear-frame","rear-hub","rear-seat","rear-fins","rear-bridges","outer-screws","inner-screws"].map(id=>({id,label:id.replaceAll("-"," ").toUpperCase(),material:"BRUSHED TITANIUM",role:id.includes("collar")?"Concentric focus collar, independently addressable.":"Machined support in the optical assembly."})),
  {id:"rear-lens",label:"REAR OPTICAL ELEMENT",material:"COATED OPTICAL GLASS",role:"Rear-facing convex element and violet reflection coating."},
  {id:"gold-contacts",label:"GOLD CONTACT ARRAY",material:"GOLD ELECTRICAL CONTACTS",role:"Thirteen radial contact pads around the rear optical seat."},
  ...["retaining-beads","rear-beads"].map(id=>({id,label:id.replaceAll("-"," ").toUpperCase(),material:"POLISHED METAL",role:"Narrow concentric retaining edges."})),
  {id:"shards",label:"ORBITING GLASS PRISMS",material:"BEVELED OPTICAL GLASS",role:"Twelve independent faceted prisms orbit the objective."},
];
export function getPartTelemetry(id: string | null): LenusPartInfo {
  return OPTICAL_PARTS.find(p=>p.id===id) ?? OPTICAL_PARTS[0];
}
]]>
    </file>
  </files>
</template>
