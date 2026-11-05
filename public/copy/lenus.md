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
.ln-stage:not([data-state="running"]):not([data-state="paused"]) .ln-canvas-host canvas{visibility:hidden}
.ln-icon-button[aria-pressed="true"]{color:var(--color-ln-lime);border-color:var(--color-ln-lime)}
.ln-lens-fallback{visibility:visible;opacity:1;transition:opacity var(--duration-ln-ui) var(--ease-ln-out)}
.ln-lens-fallback svg{display:block;width:100%;height:100%}
.ln-stage[data-state="running"] .ln-lens-fallback,.ln-stage[data-state="paused"] .ln-lens-fallback{visibility:hidden;opacity:0}
.ln-stage[data-state="lost"] canvas{visibility:hidden}
.ln-stage-marker{position:absolute;pointer-events:none;color:var(--color-ln-muted);font-family:var(--font-ln-data);font-size:9px;line-height:16px;letter-spacing:.08em;opacity:.6;z-index:3}
.ln-stage-marker-top{top:8px;right:0}.ln-stage-marker-bottom{bottom:8px;left:8px}
.ln-stage-marker-bottom span{margin-left:16px}
.ln-stage-help{color:var(--color-ln-muted);font-size:11px;text-align:right;line-height:16px;margin:8px 0 12px}
.ln-hud{width:min(100%,720px);min-height:108px;display:grid;grid-template-columns:minmax(0,1.2fr) max-content minmax(0,1fr);grid-template-rows:18px auto;gap:4px 24px;align-items:center;justify-self:end;position:relative;z-index:4;padding:8px 20px;border:1px solid color-mix(in srgb,var(--color-ln-muted) 20%,transparent);background:color-mix(in srgb,var(--color-ln-glass) 60%,transparent);border-radius:16px;backdrop-filter:blur(20px)}
.ln-hud-top,.ln-hud-actions,.ln-playback{display:flex;align-items:center;justify-content:space-between;gap:12px}
.ln-hud-top{grid-column:1;grid-row:1;min-width:0}
.ln-hud-actions{grid-column:2;grid-row:1 / 3;flex-direction:column;align-items:flex-start;justify-content:center;gap:8px}
.ln-micro,.ln-status,.ln-part-material,.ln-hud-sliders label{font-family:var(--font-ln-data);font-size:9px;line-height:16px;color:var(--color-ln-muted)}
.ln-status{white-space:nowrap;display:flex;gap:6px;align-items:center}
.ln-status i{width:4px;height:4px;background:var(--color-ln-muted);border-radius:50%}.ln-status[data-live="true"] i{background:var(--color-ln-emerald)}
.ln-part-readout{grid-column:1;grid-row:2;min-width:0;margin:0}
.ln-part-readout select{appearance:auto;width:100%;border:0;background:transparent;color:var(--color-ln-white);font-family:var(--font-ln-data);font-size:11px;font-weight:500;padding:0 0 4px;cursor:pointer}
.ln-part-readout option{background:var(--color-ln-glass);color:var(--color-ln-white)}
.ln-part-material{margin:0;font-size:8px}.ln-part-description{font-size:10px;line-height:16px;color:var(--color-ln-muted);margin:4px 0 0;min-height:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ln-explode{display:inline-flex;gap:8px;align-items:center;background:none;border:0;padding:8px 0;color:var(--color-ln-lime);font-size:10px;font-weight:700;white-space:nowrap}
.ln-icon-button{border:0;border-radius:6px;padding:6px;background:transparent;color:var(--color-ln-muted);display:inline-flex;align-items:center;justify-content:center;transition:color var(--duration-ln-ui) var(--ease-ln-out),transform var(--duration-ln-ui) var(--ease-ln-out)}
.ln-playback{gap:4px}.ln-hud-sliders{grid-column:3;grid-row:1 / 3;display:grid;grid-template-columns:1fr;gap:8px;margin:0;min-width:0}.ln-hud-sliders label{display:block;font-size:8px}
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
@media(max-width:700px){.ln-hud{min-height:0;grid-template-columns:minmax(0,1fr);grid-template-rows:auto;gap:12px}.ln-hud-top,.ln-part-readout,.ln-hud-actions,.ln-hud-sliders{grid-column:auto;grid-row:auto}.ln-hud-actions{flex-direction:row;align-items:center;justify-content:space-between}.ln-hud-sliders{grid-template-columns:1fr 1fr;gap:20px}.ln-part-description{white-space:normal;overflow:visible;text-overflow:clip}}
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
<![CDATA[import { Layers, Pause, Play, RotateCcw, ScanLine } from "lucide-react";
import { OPTICAL_PARTS, type LenusPartInfo } from "../scene/telemetry";

export type LenusStageState="preview"|"running"|"paused"|"static"|"unavailable"|"lost";
type Props={
  state:LenusStageState; fps:number; exploded:boolean; explodeAmount:number; focusAngle:number; activePart:LenusPartInfo; paused:boolean;
  onToggleExplode:()=>void; onExplodeChange:(value:number)=>void; onFocusChange:(radians:number)=>void;
  onResetView:()=>void; onTogglePause:()=>void; onPartSelect?:(id:string)=>void;
  cutaway?:boolean;onToggleCutaway?:()=>void;
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
      <p className="ln-part-description" title={p.activePart.role}>{p.activePart.role}</p>
    </div>
    <div className="ln-hud-actions">
      <button type="button" className="ln-explode" aria-pressed={p.exploded} onClick={p.onToggleExplode} disabled={disabled}><Layers size={14} aria-hidden="true"/>EXPLODE ASSEMBLY</button>
      <div className="ln-playback"><button type="button" className="ln-icon-button" aria-label={p.cutaway?"Return to automatic hero view":"Inspect lens interior"} title="Inspect interior (C)" aria-pressed={!!p.cutaway} onClick={p.onToggleCutaway}><ScanLine size={15} aria-hidden="true"/></button><button type="button" className="ln-icon-button" aria-label="Reset optical view" title="Reset view (R)" onClick={p.onResetView} disabled={disabled}><RotateCcw size={15} aria-hidden="true"/></button><button type="button" className="ln-icon-button" aria-label={p.paused?"Play animation":"Pause animation"} onClick={p.onTogglePause} disabled={disabled}>{p.paused?<Play size={15} aria-hidden="true"/>:<Pause size={15} aria-hidden="true"/>}</button></div>
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

export default function LenusLensFallback({cutaway=false}:{cutaway?:boolean}={}){
  const id=useId().replaceAll(":","");
  if(cutaway)return <div className="ln-lens-fallback">
    <svg viewBox="-340 -280 680 560" role="img" aria-labelledby={`${id}-interior-title`}>
      <title id={`${id}-interior-title`}>Interior optical train with seven glass groups, guide rails and opened titanium panels</title>
      <defs>
        <linearGradient id={`${id}-section-glass`}><stop stopColor="#F8FAFC" stopOpacity=".7"/><stop offset=".35" stopColor="#161924" stopOpacity=".2"/><stop offset=".8" stopColor="#9499A6" stopOpacity=".3"/><stop offset="1" stopColor="#A855F7" stopOpacity=".5"/></linearGradient>
        <radialGradient id={`${id}-section-core`}><stop stopColor="#F8FAFC"/><stop offset=".2" stopColor="#00E599"/><stop offset="1" stopColor="#00E599" stopOpacity=".25"/></radialGradient>
      </defs>
      <g transform="rotate(-5)">
        <path d="M-170-164 174-164 216-212-126-212Z M-170 164 174 164 216 212-126 212Z" fill="#161924" stroke="#9499A6" strokeWidth="2"/>
        <path d="M-200-142H218M-200 142H218" stroke="#9499A6" strokeWidth="5"/>
        <ellipse cx="220" rx="24" ry="180" fill="none" stroke="#9499A6" strokeWidth="8"/>
        <ellipse cx="-264" rx="42" ry="223" fill="none" stroke={`url(#${id}-section-glass)`} strokeWidth="24"/>
        <ellipse cx="-252" rx="34" ry="183" fill="none" stroke={`url(#${id}-section-glass)`} strokeWidth="14"/>
        {[[-205,28,126],[-128,25,117],[-62,22,103],[10,28,80],[82,20,88],[142,18,72],[194,14,55]].map(([x,rx,ry],i)=><g key={x} data-interior-optic={i+1}>
          <ellipse cx={x} rx={rx} ry={ry} fill={i===3?`url(#${id}-section-core)`:`url(#${id}-section-glass)`} stroke={i===3?"#00E599":"#F8FAFC"} strokeWidth={i===3?3:1.5}/>
          <path d={`M${x-8} ${-ry-7}h16v-11M${x-8} ${ry+7}h16v11`} fill="none" stroke="#9499A6" strokeWidth="4"/>
        </g>)}
        <path d="M151-155 174-190M151 155 174 190" stroke="#D2F802" strokeOpacity=".65" strokeWidth="2"/>
      </g>
    </svg>
  </div>;
  return <div className="ln-lens-fallback">
    <svg viewBox="-280 -280 560 560" role="img" aria-labelledby={`${id}-title`}>
      <title id={`${id}-title`}>Optical lens with a closed titanium shutter and fluted glass</title>
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
        <g data-closed-shutter="true">
          <circle r="164" fill={`url(#${id}-titanium)`} stroke="#9499A6" strokeWidth="3"/>
          <path d="M-164 0H164M0-164V164" stroke="#08090D" strokeWidth="2"/>
          <circle r="145" fill="none" stroke="#9499A6" strokeOpacity=".3" strokeWidth="1"/>
        </g>
      </g>
    </svg>
  </div>;
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/components/LenusOpticalLensCanvas.tsx">
<![CDATA["use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { LenusSceneController, LenusInspectionSnapshot } from "../scene/LenusSceneController";
import { getPartTelemetry, getSemanticPartCount, isInteriorPart, prefersRearView } from "../scene/telemetry";
import LenusLensFallback from "./LenusLensFallback";
import { LenusHudControls, type LenusStageState } from "./LenusHudControls";

export default function LenusOpticalLensCanvas({suspended=false,externalExplodeRequest=0}:{suspended?:boolean;externalExplodeRequest?:number}){
  const host=useRef<HTMLDivElement>(null);
  const controller=useRef<LenusSceneController|null>(null);
  const synchronize=useRef<()=>void>(()=>{});
  const activate=useRef<()=>void>(()=>{});
  const pose=useRef({explode:0,focus:0});
  const animationTime=useRef(0);
  const resolutionScale=useRef(1);
  const inspectionState=useRef<LenusInspectionSnapshot|null>(null);
  const cutawayValue=useRef(false);
  const policy=useRef({suspended,paused:false});
  const [state,setState]=useState<LenusStageState>("preview");
  const [fps,setFps]=useState(0);
  const [paused,setPaused]=useState(false);
  const [explodeAmount,setExplodeAmount]=useState(0);
  const [focusAngle,setFocusAngle]=useState(0);
  const [activePart,setActivePart]=useState(()=>getPartTelemetry(null));
  const [locked,setLocked]=useState(false);
  const [activationNeeded,setActivationNeeded]=useState(false);
  const [cutaway,setCutaway]=useState(false);
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
      if(shouldRun)c.start();else c.stop(policy.current.paused&&inView&&document.visibilityState!=="hidden"&&!policy.current.suspended&&!lost);
      setState(lost?"lost":shouldRun?"running":"paused");
    };
    synchronize.current=sync;
    const boot=async()=>{
      if(controller.current&&!media.matches){sync();return;}
      const ticket=++revision;
      if(controller.current){animationTime.current=controller.current.getAnimationTime();resolutionScale.current=controller.current.getResolutionScale();inspectionState.current=controller.current.getInspectionSnapshot();}
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
          initialAnimationTime:animationTime.current,
          initialResolutionScale:resolutionScale.current,
          initialInspectionState:inspectionState.current??undefined,
          onFps:value=>{if(active&&ticket===revision)setFps(value);},
          onContextChange:value=>{if(!active||ticket!==revision)return;lost=value==="lost";sync();},
          onPartChange:part=>{if(active&&ticket===revision)setActivePart(current=>current.id===part.id?current:part);},
        });
        controller.current=instance;
        instance.init(container);
        // Commands can arrive before this import resolves or survive a preference change.
        if(!inspectionState.current||inspectionState.current.controls.explode!==pose.current.explode)instance.setExplodeTarget(pose.current.explode,false);
        if(!inspectionState.current||inspectionState.current.controls.focus!==pose.current.focus)instance.setFocusTarget(pose.current.focus);
        instance.setInspectionMode(cutawayValue.current?"cutaway":"hero");
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
    if(externalExplodeRequest>0){cutawayValue.current=true;setCutaway(true);pose.current.explode=1;setExplodeAmount(1);controller.current?.setInspectionMode("cutaway");controller.current?.setExplodeTarget(1);activate.current();}
  },[externalExplodeRequest]);

  const changeInspection=(value:boolean)=>{cutawayValue.current=value;setCutaway(value);controller.current?.setInspectionMode(value?"cutaway":"hero");if(!value){setLocked(false);setActivePart(getPartTelemetry(null));}};
  const changeExplode=(value:number)=>{if(!cutawayValue.current)changeInspection(true);pose.current.explode=value;setExplodeAmount(value);controller.current?.setExplodeTarget(value);};
  const changeFocus=(value:number)=>{pose.current.focus=value;setFocusAngle(value);controller.current?.setFocusTarget(value);};
  const reset=()=>{pose.current={explode:0,focus:0};animationTime.current=0;inspectionState.current=null;cutawayValue.current=false;setCutaway(false);setExplodeAmount(0);setFocusAngle(0);setLocked(false);setActivePart(getPartTelemetry(null));controller.current?.resetView();};
  const toggleExplode=()=>changeExplode(cutawayValue.current&&pose.current.explode>.5?0:1);
  const selectPart=(id:string)=>{const part=getPartTelemetry(id);if(isInteriorPart(part.id)||prefersRearView(part.id))changeInspection(true);controller.current?.inspectPart(part.id);setLocked(part.id!=="assembly");setActivePart(part);};
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
    const p=coordinates(event);const part=controller.current?.pickAtNormalizedCanvas(p.x,p.y);if(part)selectPart(part.id);
  };
  const keyboard=(event:KeyboardEvent<HTMLDivElement>)=>{
    if(event.target!==event.currentTarget)return;
    if(event.key==="c"||event.key==="C"){event.preventDefault();changeInspection(!cutawayValue.current);return;}
    if(activationNeeded&&(event.key==="Enter"||event.key===" ")){event.preventDefault();activate.current();return;}
    if(!["running","paused"].includes(state))return;
    const actions:Record<string,()=>void>={ArrowLeft:()=>controller.current?.rotateView(-.12,0),ArrowRight:()=>controller.current?.rotateView(.12,0),ArrowUp:()=>controller.current?.rotateView(0,-.1),ArrowDown:()=>controller.current?.rotateView(0,.1),e:toggleExplode,E:toggleExplode,r:reset,R:reset,Home:reset,Escape:()=>setLocked(false)};
    if(actions[event.key]){event.preventDefault();actions[event.key]();}
  };
  const message:Record<LenusStageState,string>={preview:activationNeeded?"Tap the lens to explore in 3D.":"Optical preview. Interactive controls load when available.",running:"Drag to explore. Select a fragment to inspect.",paused:suspended?"Optical view paused while the panel is open.":"Optical view paused.",static:"Reduced motion is on. Showing a still optical preview.",unavailable:"Interactive graphics are unavailable. Showing a still optical preview.",lost:"Graphics connection lost. Showing the preview while reconnecting."};
  return <section className="ln-stage" data-state={state} data-inspection-mode={cutaway?"cutaway":"hero"} data-exploded={cutaway&&explodeAmount>.5} aria-label="Optical lens experience">
    <div className="ln-lens-plot">
      <div className="ln-aperture" aria-hidden="true"/>
      <LenusLensFallback cutaway={cutaway}/>
      <div ref={host} className="ln-canvas-host" data-testid="lenus-canvas-container" tabIndex={0} role={activationNeeded?"button":"group"} aria-label="Interactive Lenus optical lens assembly" aria-describedby={instructions} onPointerMove={move} onPointerLeave={()=>controller.current?.setPointer(0,0)} onPointerDown={event=>{pointerStart.current={x:event.clientX,y:event.clientY};}} onPointerUp={pick} onKeyDown={keyboard}/>
      <span className="ln-stage-marker ln-stage-marker-top" aria-hidden="true">LENUS / OPTICAL SYSTEMS</span>
      <span className="ln-stage-marker ln-stage-marker-bottom" aria-hidden="true">N 1.52 <span>{getSemanticPartCount()} PARTS</span></span>
    </div>
    <p id={instructions} className="ln-sr-only">{activationNeeded?"Press Enter or tap to start the optical experience. ":""}Use arrow keys to rotate, C to inspect the interior, E to separate the assembly, R or Home to reset. Use the part selector to inspect each component.</p>
    <p className="ln-stage-help" role="status">{message[state]}</p>
    <LenusHudControls state={state} fps={fps} paused={paused} cutaway={cutaway} onToggleCutaway={()=>changeInspection(!cutawayValue.current)} exploded={cutaway&&explodeAmount>.5} explodeAmount={explodeAmount} focusAngle={focusAngle} activePart={activePart} onToggleExplode={toggleExplode} onExplodeChange={changeExplode} onFocusChange={changeFocus} onResetView={reset} onTogglePause={()=>setPaused(value=>!value)} onPartSelect={selectPart}/>
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
    <file path="src/app/(lenus)/lenus/model/batchRigidHardware.ts">
<![CDATA[import * as THREE from "three";
import {mergeGeometries} from "three/examples/jsm/utils/BufferGeometryUtils.js";
import type {LensRuntime} from "./createOpticalLensModel";

/** Bake only solids that share a semantic pivot, material and rigid motion. */
export function batchRigidHardware(root:THREE.Group,runtime:LensRuntime,addMesh:(id:string,geometry:THREE.BufferGeometry)=>THREE.Mesh){
  const ids=["front-meniscus-cell","front-biconvex-cell","front-compensator-cell","core-carrier","rear-relay-cell","rear-plano-cell","internal-barrel","rear-beads","core-retaining-beads","retaining-beads"];
  root.updateMatrixWorld(true);
  for(const id of ids){
    const node=runtime.nodes[id],sources:THREE.Mesh[]=[];
    node.traverse(o=>{const mesh=o as THREE.Mesh;if(!mesh.isMesh||mesh.userData.componentId!==id)return;
      // The two inner trim rings have independent axial motion.
      if(id==="retaining-beads"&&((mesh.geometry as THREE.TorusGeometry).parameters.radius<1.6))return;
      sources.push(mesh);
    });
    if(sources.length<2)continue;
    if(sources.some(mesh=>mesh.material!==sources[0].material))throw new Error(`Rigid batch material mismatch: ${id}`);
    const inverse=node.matrixWorld.clone().invert(),pieces:THREE.BufferGeometry[]=[];
    const ranges:{name:string;vertexStart:number;vertexCount:number}[]=[];let vertexStart=0;
    try{
      for(const source of sources){
        const instanced=source as THREE.InstancedMesh;
        for(let i=0;i<(instanced.isInstancedMesh?instanced.count:1);i++){
          let geometry=source.geometry.clone();
          if(!geometry.getAttribute("tangent")){
            if(!geometry.index)geometry.setIndex(Array.from({length:geometry.getAttribute("position").count},(_,index)=>index));
            geometry.computeTangents();
          }
          if(geometry.index){const flat=geometry.toNonIndexed();geometry.dispose();geometry=flat;}
          const matrix=inverse.clone().multiply(source.matrixWorld);
          if(instanced.isInstancedMesh){const instance=new THREE.Matrix4();instanced.getMatrixAt(i,instance);matrix.multiply(instance);}
          geometry.applyMatrix4(matrix);
          const vertexCount=geometry.getAttribute("position").count;
          ranges.push({name:`${source.name}/${i}`,vertexStart,vertexCount});vertexStart+=vertexCount;pieces.push(geometry);
        }
      }
      const merged=mergeGeometries(pieces,false);if(!merged)throw new Error(`Rigid batch failed: ${id}`);
      // Review adapters can split the actual merged buffer back into its closed
      // solids, including embedded joints, without omitting any rendered vertex.
      merged.userData.rigidSources=ranges;
      const mesh=addMesh(id,merged);mesh.name=`${id}-rigid-hardware`;
      for(const source of sources)source.removeFromParent();
    }finally{pieces.forEach(geometry=>geometry.dispose());}
  }
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/model/createLensInterior.ts">
<![CDATA[import * as THREE from "three";
import type { LensRuntime } from "./createOpticalLensModel";
import { INTERIOR_IDS, OPTICAL_ORDER } from "./interiorLayout";
import type { LensComponent, OpticalLensSpec } from "./lensTypes";
import { buildOpticalCellGeometry, buildOpticalElementGeometry } from "./opticalLensGeometry";
import { annularProfile, buildClosedRevolvedSection } from "./sectionGeometry";
import { getLensTransformationPose, type LensTransformationPose } from "./lensTransformation";

export type InteriorContext = {
  root: THREE.Group;
  runtime: LensRuntime;
  stage: number;
  addMesh: (id:string, geometry:THREE.BufferGeometry, count?:number,material?:THREE.Material)=>THREE.Mesh;
  annulus: (inner:number,outer:number,depth:number)=>THREE.BufferGeometry;
};
const frontIds=["outer-glass","inner-glass","front-shell","collar-outer","retaining-beads","shards","front-shutter"];
const axis=new THREE.Vector3(0,0,1);
const one=new THREE.Vector3(1,1,1);
const clamp=(x:number)=>Number.isFinite(x)?THREE.MathUtils.clamp(x,0,1):0;

/** Builds into the existing resource owner; no renderer, environment or duplicate material system. */
export function createLensInterior(context:InteriorContext, spec:OpticalLensSpec) {
  const {root,runtime:r,addMesh,annulus}=context;
  const descriptors=new Map(spec.components.map(c=>[c.id,c]));
  const socket=(name:string,parent:THREE.Object3D,position:THREE.Vector3)=>{
    const o=new THREE.Object3D();o.name=name;o.position.copy(position);parent.add(o);r.sockets[name]=o;return o;
  };
  const matrix=new THREE.Matrix4();
  const bearings: {mesh:THREE.InstancedMesh;parent:THREE.Object3D;moving:boolean}[]=[];
  let fixedGuide:THREE.InstancedMesh,slidingGuide:THREE.InstancedMesh;
  function radialInstances(id:string,geometry:THREE.BufferGeometry,count:number,radius:number) {
    const mesh=addMesh(id,geometry,count) as THREE.InstancedMesh;
    for(let i=0;i<count;i++) {
      const t=i*Math.PI*2/count+Math.PI/4;
      matrix.makeTranslation(Math.cos(t)*radius,Math.sin(t)*radius,0);
      mesh.setMatrixAt(i,matrix);
    }
    mesh.instanceMatrix.needsUpdate=true;return mesh;
  }
  function supports(c:LensComponent) {
    const outer=c.geometry.outerRadius!;
    const armLength=1.3-.05-outer+.02;
    const arms=addMesh(c.id,new THREE.BoxGeometry(armLength,.045,.06),4) as THREE.InstancedMesh;
    const bearingMesh=radialInstances(c.id,annulus(c.id==="front-meniscus-cell"?.026:.043,.065,.08),4,1.3);
    bearings.push({mesh:bearingMesh,parent:r.nodes[c.id],moving:c.id==="front-meniscus-cell"});
    for(let i=0;i<4;i++) {
      const t=i*Math.PI/2+Math.PI/4;
      matrix.compose(new THREE.Vector3(Math.cos(t)*(outer-.02+armLength/2),Math.sin(t)*(outer-.02+armLength/2),0),new THREE.Quaternion().setFromAxisAngle(axis,t),one);
      arms.setMatrixAt(i,matrix);
      socket(`${c.id}-rail-${i}`,r.nodes[c.id],new THREE.Vector3(Math.cos(t)*1.3,Math.sin(t)*1.3,0));
    }
    arms.instanceMatrix.needsUpdate=true;
    return bearingMesh;
  }
  for(const id of INTERIOR_IDS) {
    const c=descriptors.get(id)!;const g=c.geometry;
    switch(g.kind) {
      case "optical-element": {
        const thickness=g.edgeThickness!+g.frontSag!-g.backSag!;
        addMesh(id,context.stage>=2?buildOpticalElementGeometry({shape:g.shape!,radius:g.radius!,edgeThickness:g.edgeThickness!,frontSag:g.frontSag!,backSag:g.backSag!,chamfer:g.chamfer},64):new THREE.SphereGeometry(g.radius!,24,12).scale(1,1,thickness/(2*g.radius!)));break;
      }
      case "cell": {
        const optic=descriptors.get(id.replace(/-cell$/,""))?.geometry;
        const profile=optic?.kind==="optical-element"?{shape:optic.shape!,radius:optic.radius!,edgeThickness:optic.edgeThickness!,frontSag:optic.frontSag!,backSag:optic.backSag!,chamfer:optic.chamfer}:undefined;
        const radius=profile?.radius??.59;
        const sweep=g.sweepRadians??Math.PI*2;
        const geometry=context.stage>=2?buildOpticalCellGeometry(radius,g.outerRadius!,g.depth!,profile,sweep<Math.PI*2?8:48,{startRadians:g.startRadians??0,sweepRadians:sweep}):annulus(g.innerRadius!,g.outerRadius!,g.depth!);
        if(context.stage>=2&&sweep<Math.PI*2) {
          const clips=addMesh(id,geometry,4) as THREE.InstancedMesh;
          for(let i=0;i<4;i++){matrix.makeRotationZ(Math.PI/4+i*Math.PI/2);clips.setMatrixAt(i,matrix);}
          clips.instanceMatrix.needsUpdate=true;
        }else addMesh(id,geometry);
        if(context.stage>=1)supports(c);break;
      }
      case "open-frame": {
        for(const z of [-.67,-.55])addMesh(id,annulus(g.innerRadius!,g.outerRadius!, .06)).position.z=z;
        if(context.stage>=1)for(const z of [-.67]) {
          const arms=addMesh(id,new THREE.BoxGeometry(.22,.05,.06),4) as THREE.InstancedMesh;
          for(let i=0;i<4;i++) {
            const t=i*Math.PI/2+Math.PI/4;
            matrix.compose(new THREE.Vector3(Math.cos(t)*1.39,Math.sin(t)*1.39,z),new THREE.Quaternion().setFromAxisAngle(axis,t),one);arms.setMatrixAt(i,matrix);
          }
          arms.instanceMatrix.needsUpdate=true;
        }
        break;
      }
      case "spacers":
        for(const [i,radius]of g.radii!.entries())addMesh(id,annulus(radius-.025,radius+.025,g.depth!)).position.z=[-.10,-.32,-.50,-1.03,-1.40][i];
        break;
      case "baffles":addMesh(id,annulus(g.innerRadius!,g.outerRadius!,g.depth!));break;
      case "beads":for(const radius of g.radii!)addMesh(id,new THREE.TorusGeometry(radius,g.tube!,6,48));break;
      case "bolts":radialInstances(id,new THREE.TorusGeometry(g.size!*.72,g.size!*.20,8,16),g.count!,g.radius!);break;
      case "panel": {
        if(context.stage>=2){addMesh(id,buildClosedRevolvedSection(annularProfile(g.innerRadius!,g.outerRadius!,g.depth!),{segments:24,startRadians:g.startRadians!,sweepRadians:g.sweepRadians!}));break;}
        const start=g.startRadians!,end=start+g.sweepRadians!;
        const shape=new THREE.Shape();shape.absarc(0,0,g.outerRadius!,start,end,false);
        shape.lineTo(Math.cos(end)*g.innerRadius!,Math.sin(end)*g.innerRadius!);
        shape.absarc(0,0,g.innerRadius!,end,start,true);shape.closePath();
        addMesh(id,new THREE.ExtrudeGeometry(shape,{depth:g.depth!,bevelEnabled:false,curveSegments:4,steps:1}).translate(0,0,-g.depth!/2));break;
      }
      case "rails":
        fixedGuide=radialInstances(id,annulus(.027,.042,1.81),4,g.radius!);fixedGuide.position.z=-.065;
        slidingGuide=radialInstances(id,new THREE.CylinderGeometry(.025,.025,2.25,8).rotateX(Math.PI/2),4,g.radius!);slidingGuide.name="sliding-guide-rods";
        break;
      case "linkages":break;
      case "front-shutter": {
        const radius=g.radius!,half=g.depth!/2,bevel=.018;
        // A real closed quarter-disc, with finished rim and radial boundary
        // faces. All four petals remain present throughout the transformation.
        const geometry=buildClosedRevolvedSection([[0,-half],[radius-bevel,-half],[radius,-half+bevel],[radius,half-bevel],[radius-bevel,half],[0,half]],{segments:32,startRadians:0,sweepRadians:Math.PI/2});
        geometry.translate(-Math.SQRT1_2*radius,-Math.SQRT1_2*radius,0);
        addMesh(id,geometry,4);break;
      }
      default:throw new Error(`Unsupported interior geometry: ${g.kind}`);
    }
  }
  if(context.stage>=3) {
    // An internal scattering proxy makes the fluorescent core available to the
    // opaque transmission buffer; the original glass material remains intact.
    const originalCore=r.meshes["front-lens"].material as THREE.MeshPhysicalMaterial;
    const density=originalCore.emissiveMap?.clone()??null;
    if(density){density.colorSpace=THREE.NoColorSpace;density.needsUpdate=true;}
    const backing=new THREE.MeshBasicMaterial({name:"emerald-scattering-backing",color:"#00E599",map:density});
    backing.addEventListener("dispose",()=>density?.dispose());
    addMesh("front-lens",new THREE.SphereGeometry(.49,48,24).scale(1,1,context.stage>=6?.39:.245),0,backing).position.z=-.02;
  }

  const carriage=new THREE.Group();carriage.name="front-carriage";root.add(carriage);
  for(const id of frontIds)carriage.add(r.nodes[id]);
  const collarUnlock=new THREE.Group();collarUnlock.name="collar-unlock";carriage.add(collarUnlock);collarUnlock.add(r.nodes["collar-outer"]);
  const shardOrbit=new THREE.Group();shardOrbit.name="shard-orbit";carriage.add(shardOrbit);shardOrbit.add(r.nodes.shards);
  const collarIdle=new THREE.Group();collarIdle.name="core-collar-idle";r.nodes["core-carrier"].add(collarIdle);collarIdle.add(r.nodes["collar-inner"]);
  const fragmentRest=r.nodes.shards.children.filter(o=>(o as THREE.Mesh).isMesh).map(o=>({node:o,position:o.position.clone()}));
  const frontBearings=radialInstances("guide-rails",annulus(.026,.065,.08),4,1.3);
  bearings.push({mesh:frontBearings,parent:frontBearings.parent!,moving:true});
  const clampLength=Math.hypot(.12,.115);
  const frontClamps=addMesh("guide-rails",new THREE.CylinderGeometry(.018,.018,clampLength,8).rotateX(Math.PI/2),4) as THREE.InstancedMesh;
  for(let i=0;i<4;i++) {
    const t=i*Math.PI/2+Math.PI/4;
    const direction=new THREE.Vector3(.12*Math.cos(t),.12*Math.sin(t),-.115).normalize();
    matrix.compose(new THREE.Vector3(1.41*Math.cos(t),1.41*Math.sin(t),0),new THREE.Quaternion().setFromUnitVectors(axis,direction),one);frontClamps.setMatrixAt(i,matrix);
    socket(`front-carriage-rail-${i}`,carriage,new THREE.Vector3(1.3*Math.cos(t),1.3*Math.sin(t),.245));
  }
  frontClamps.instanceMatrix.needsUpdate=true;
  r.nodes["core-carrier"].add(r.nodes["carrier-fasteners"]);r.nodes["carrier-fasteners"].position.set(0,0,0);
  const rests=new Map(Object.entries(r.nodes).map(([id,o])=>[id,{position:o.position.clone(),rotation:o.rotation.clone()}]));
  const shutter=r.meshes["front-shutter"] as THREE.InstancedMesh|undefined;
  const shutterSpec=descriptors.get("front-shutter")?.geometry;
  const hinges:THREE.Group[]=[];
  const hingeRadius=descriptors.get("housing-panel-0")!.geometry.innerRadius!;
  const anchorRadius=2.10;
  const anchorLocalZ=-.465;
  for(let i=0;i<4;i++) {
    const c=descriptors.get(`housing-panel-${i}`)!;
    const t=c.geometry.startRadians!+c.geometry.sweepRadians!/2;
    const hinge=new THREE.Group();hinge.name=`housing-panel-${i}-hinge`;
    hinge.position.set(Math.cos(t)*hingeRadius,Math.sin(t)*hingeRadius,-c.geometry.depth!/2);
    const panel=r.nodes[c.id];
    for(const mesh of [...panel.children].filter(o=>(o as THREE.Mesh).isMesh)) {
      mesh.position.sub(hinge.position);hinge.add(mesh);
    }
    panel.add(hinge);hinges.push(hinge);
  }
  const armLength=descriptors.get("panel-linkages")!.geometry.linkLength!;
  const linkMesh=addMesh("panel-linkages",new THREE.CylinderGeometry(.025,.025,armLength,8).rotateX(Math.PI/2),16) as THREE.InstancedMesh;
  const crowns=addMesh("panel-linkages",new THREE.SphereGeometry(.020,8,6),24) as THREE.InstancedMesh;
  const anchorPosts=addMesh("panel-linkages",new THREE.CylinderGeometry(.025,.025,.355,8).rotateX(Math.PI/2),8) as THREE.InstancedMesh;
  const linkageSockets:{a:THREE.Object3D;b:THREE.Object3D;knee:THREE.Object3D;t:number;side:number}[]=[];
  for(let i=0;i<4;i++)for(let side=0;side<2;side++) {
    const t=i*Math.PI/2+Math.PI/4,s=(side===0?-1:1)*.2;
    const a=socket(`housing-panel-${i}-link-root-${side}`,r.nodes["rear-frame"],new THREE.Vector3(Math.cos(t)*anchorRadius-Math.sin(t)*s,Math.sin(t)*anchorRadius+Math.cos(t)*s,anchorLocalZ));
    const b=socket(`housing-panel-${i}-link-panel-${side}`,hinges[i],new THREE.Vector3(-Math.sin(t)*s,Math.cos(t)*s,0));
    const knee=socket(`housing-panel-${i}-link-knee-${side}`,r.nodes["panel-linkages"],new THREE.Vector3());
    linkageSockets.push({a,b,knee,t,side:s});
    const postZ=r.nodes["rear-frame"].position.z-.2875-r.nodes["panel-linkages"].position.z;
    matrix.makeTranslation(Math.cos(t)*anchorRadius-Math.sin(t)*s,Math.sin(t)*anchorRadius+Math.cos(t)*s,postZ);anchorPosts.setMatrixAt(i*2+side,matrix);
  }
  anchorPosts.instanceMatrix.needsUpdate=true;
  const spacerMeshes=r.nodes["spacer-stack"].children.filter(o=>(o as THREE.Mesh).isMesh);
  const spacerRest=spacerMeshes.map(m=>m.position.clone());
  const movingTrim=r.nodes["retaining-beads"].children.filter(o=>(o as THREE.Mesh).isMesh).flatMap(o=>{
    const radius=((o as THREE.Mesh).geometry as THREE.TorusGeometry).parameters.radius;
    if(radius!==1.11&&radius!==1.36)return [];
    return [{mesh:o,worldZ:radius===1.11?.275:.115}];
  });
  let pose=getLensTransformationPose(0),separation=0,focus=0;
  const vector=new THREE.Vector3(),quaternion=new THREE.Quaternion();
  const putArm=(index:number,a:THREE.Vector3,b:THREE.Vector3)=>{
    const midpoint=a.clone().add(b).multiplyScalar(.5).sub(r.nodes["panel-linkages"].position);
    quaternion.setFromUnitVectors(axis,b.clone().sub(a).normalize());
    matrix.compose(midpoint,quaternion,one);linkMesh.setMatrixAt(index,matrix);
  };
  function apply() {
    for(const [id,rest]of rests){r.nodes[id].position.copy(rest.position);r.nodes[id].rotation.copy(rest.rotation);}
    carriage.position.z=pose.frontCarriage+separation*.64;
    // The existing floating glass clears the entire petal sweep, rather than
    // letting a solid lid pass through it while opening or closing.
    shardOrbit.position.z=.18+1.58*Math.sin((shutterSpec?.pivotRadians??0)*pose.shutter);
    if(shutter&&shutterSpec){
      const tilt=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(-Math.SQRT1_2,Math.SQRT1_2,0),shutterSpec.pivotRadians!*pose.shutter);
      for(let i=0;i<4;i++){
        const angle=i*Math.PI/2,theta=angle+Math.PI/4;
        quaternion.setFromAxisAngle(axis,angle).multiply(tilt);
        matrix.compose(new THREE.Vector3(Math.cos(theta)*shutterSpec.radius!,Math.sin(theta)*shutterSpec.radius!,shutterSpec.hingeZ!),quaternion,one);
        shutter.setMatrixAt(i,matrix);
      }
      shutter.instanceMatrix.needsUpdate=true;shutter.computeBoundingSphere();
    }
    collarUnlock.rotation.z=.2*pose.unlock;
    const offsets=pose.opticalOffsets,inspectionOffsets=[.48,.03,.02,0,-.16,-.32,-.64];
    for(const fragment of fragmentRest)fragment.node.position.set(fragment.position.x*(1+separation*.35),fragment.position.y*(1+separation*.35),fragment.position.z+separation*.25);
    for(const [i,id]of OPTICAL_ORDER.entries()) {
      const target=id==="front-lens"?"core-carrier":r.nodes[id].parent===root?id:`${id}-cell`;
      r.nodes[target].position.z+=offsets[i]+separation*inspectionOffsets[i];
    }
    for(const id of ["rear-frame","rear-hub","rear-seat","panel-linkages"])r.nodes[id].position.z-=separation*.64;
    for(const trim of movingTrim)trim.mesh.position.z=trim.worldZ-r.nodes["retaining-beads"].position.z+offsets[0]+inspectionOffsets[0]*separation-carriage.position.z;
    frontBearings.position.z=.245-r.nodes["guide-rails"].position.z+carriage.position.z;
    frontClamps.position.z=.1875-r.nodes["guide-rails"].position.z+carriage.position.z;
    for(let i=0;i<spacerMeshes.length;i++){const index=[0,1,2,4,5][i];spacerMeshes[i].position.copy(spacerRest[i]).add(vector.set(0,0,offsets[index]+separation*inspectionOffsets[index]));}
    for(let i=0;i<4;i++) {
      const t=i*Math.PI/2+Math.PI/4;
      r.nodes[`housing-panel-${i}`].position.x+=Math.cos(t)*.24*pose.panelSlide[i];
      r.nodes[`housing-panel-${i}`].position.y+=Math.sin(t)*.24*pose.panelSlide[i];
      r.nodes[`housing-panel-${i}`].position.z-=separation*.64;
      hinges[i].quaternion.setFromAxisAngle(vector.set(-Math.sin(t),Math.cos(t),0),.58*pose.panelPivot[i]);
    }
    for(const id of ["collar-outer","collar-middle","shards"])r.nodes[id].rotation.z=focus;
    const rods=r.nodes["guide-rails"].getObjectByName("sliding-guide-rods");
    if(rods)rods.position.z=-.025+pose.guideExtension+separation*.64;
    for(const [i,link]of linkageSockets.entries()) {
      const panelIndex=Math.floor(i/2),radial=hingeRadius+.24*pose.panelSlide[panelIndex];
      const az=r.nodes["rear-frame"].position.z+anchorLocalZ,bz=r.nodes[`housing-panel-${panelIndex}`].position.z+hinges[panelIndex].position.z;
      const dx=radial-anchorRadius,dz=bz-az,distance=Math.hypot(dx,dz);
      const height=Math.sqrt(Math.max(0,armLength**2-distance**2/4));
      const kr=(radial+anchorRadius)/2-dz/distance*height,kz=(az+bz)/2+dx/distance*height;
      const point=(radius:number,z:number)=>new THREE.Vector3(Math.cos(link.t)*radius-Math.sin(link.t)*link.side,Math.sin(link.t)*radius+Math.cos(link.t)*link.side,z);
      const a=point(anchorRadius,az),b=point(radial,bz),k=point(kr,kz);
      link.knee.position.copy(k).sub(r.nodes["panel-linkages"].position);
      putArm(i*2,a,k);putArm(i*2+1,k,b);
      for(const [j,p]of [a,k,b].entries()){
        const local=p.clone().sub(r.nodes["panel-linkages"].position);
        matrix.makeTranslation(local.x,local.y,local.z);crowns.setMatrixAt(i*3+j,matrix);
      }
    }
    linkMesh.instanceMatrix.needsUpdate=true;crowns.instanceMatrix.needsUpdate=true;
    // InstancedMesh does not invalidate its cached raycast/frustum sphere when
    // setMatrixAt changes the mechanism's extent.
    linkMesh.computeBoundingSphere();crowns.computeBoundingSphere();
    root.updateMatrixWorld(true);
  }
  function measureAttachments() {
    root.updateMatrixWorld(true);let linkGap=0,railOffset=0,railSurfaceGap=0,railAxialOverlap=Infinity;
    for(const [i,link]of linkageSockets.entries())for(const [j,pair]of [[link.a,link.knee],[link.knee,link.b]].entries()) {
      linkMesh.getMatrixAt(i*2+j,matrix);
      for(let end=0;end<2;end++) {
        const endpoint=new THREE.Vector3(0,0,(end===0?-.5:.5)*armLength).applyMatrix4(matrix);
        linkMesh.localToWorld(endpoint);
        linkGap=Math.max(linkGap,endpoint.distanceTo(pair[end].getWorldPosition(new THREE.Vector3())));
      }
    }
    for(const [id,o]of Object.entries(r.sockets))if(/-rail-\d$/.test(id)) {
      const p=root.worldToLocal(o.getWorldPosition(new THREE.Vector3()));
      railOffset=Math.max(railOffset,Math.abs(Math.hypot(p.x,p.y)-1.3));
    }
    const radii=(geometry:THREE.BufferGeometry)=>{
      const p=geometry.getAttribute("position");let min=Infinity,max=0;
      for(let i=0;i<p.count;i++){const radius=Math.hypot(p.getX(i),p.getY(i));min=Math.min(min,radius);max=Math.max(max,radius);}
      return {min,max};
    };
    for(const bearing of bearings) {
      const guide=bearing.moving?slidingGuide:fixedGuide;
      const gap=radii(bearing.mesh.geometry).min-radii(guide.geometry).max;
      railSurfaceGap=Math.max(railSurfaceGap,Math.abs(gap));
      guide.geometry.computeBoundingBox();bearing.mesh.geometry.computeBoundingBox();
      const guideZ=root.worldToLocal(guide.getWorldPosition(new THREE.Vector3())).z;
      const bearingZ=root.worldToLocal(bearing.parent.localToWorld(bearing.mesh.position.clone())).z;
      const gb=guide.geometry.boundingBox!,bb=bearing.mesh.geometry.boundingBox!;
      railAxialOverlap=Math.min(railAxialOverlap,Math.min(guideZ+gb.max.z,bearingZ+bb.max.z)-Math.max(guideZ+gb.min.z,bearingZ+bb.min.z));
    }
    return {linkGap,railOffset,railSurfaceGap,railAxialOverlap,linkCount:16,railSocketCount:Object.keys(r.sockets).filter(id=>/-rail-\d$/.test(id)).length};
  }
  apply();
  const setPose=(next:LensTransformationPose)=>{
    if(next.opticalOffsets.length!==7||next.panelSlide.length!==4||next.panelPivot.length!==4||![next.frontCarriage,next.guideExtension,next.unlock,next.shutter,...next.opticalOffsets,...next.panelSlide,...next.panelPivot].every(Number.isFinite))throw new Error("Invalid lens transformation pose");
    pose=next;apply();
  };
  const setAmbientPose=(ambient:{collar:number;shardOrbit:number;shardY:number})=>{
    collarIdle.rotation.z=Number.isFinite(ambient.collar)?ambient.collar:0;
    shardOrbit.rotation.z=Number.isFinite(ambient.shardOrbit)?ambient.shardOrbit:0;
    shardOrbit.position.y=Number.isFinite(ambient.shardY)?ambient.shardY:0;
    root.updateMatrixWorld(true);
  };
  const rig={carriage,collarUnlock,hinges,setPose,setAmbientPose,setDeployment(amount:number){const u=clamp(amount);setPose(getLensTransformationPose(u===0?0:3+9*u));},setSeparation(amount:number){separation=clamp(amount);apply();},setFocus(radians:number){focus=Number.isFinite(radians)?THREE.MathUtils.clamp(radians,-Math.PI/2,Math.PI/2):0;apply();},measureAttachments};
  root.userData.interiorRig=rig;
  return rig;
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/model/createOpticalLensModel.ts">
<![CDATA[import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import {mergeGeometries} from "three/examples/jsm/utils/BufferGeometryUtils.js";
import defaultSpec from "./lens-spec.json";
import { createLensMaterials } from "./lensMaterials";
import { deriveInteriorLayout, INTERIOR_IDS, validateInteriorClearances } from "./interiorLayout";
import { createLensInterior } from "./createLensInterior";
import { batchRigidHardware } from "./batchRigidHardware";
import type { OpticalLensSpec } from "./lensTypes";
import { getLensTransformationPose, type LensTransformationPose } from "./lensTransformation";
export type { OpticalLensSpec } from "./lensTypes";

export const BUILD_PASSES = ["blockout", "structural-pass", "form-refinement", "material-pass", "surface-pass", "lighting-pass", "interaction-pass", "optimization-pass"] as const;
export type LensBuildPass = (typeof BUILD_PASSES)[number];
export type OpticalLensOptions = { pass?: LensBuildPass; quality?: "high" | "low"; batchOpaque?:boolean };
export { defaultSpec as opticalLensSpec };

export type LensRuntime = {
  nodes: Record<string, THREE.Group>;
  meshes: Record<string, THREE.Mesh>;
  sockets: Record<string, THREE.Object3D>;
  colliders: Record<string, { type: string; radius: number; depth: number }>;
  destructionGroups: Record<string, THREE.Object3D[]>;
  setExplode: (amount: number) => void;
  setFocusRing: (radians: number) => void;
  setTransformationPose: (pose:LensTransformationPose) => void;
  setCutaway: (enabled:boolean) => void;
  setAmbientPose: (pose:{collar:number;shardOrbit:number;shardY:number}) => void;
  pickPart: (object: THREE.Object3D | null) => THREE.Group | null;
  dispose: () => void;
};

function annulus(inner: number, outer: number, depth: number, segments: number, bevel = 0) {
  const h = depth / 2, b = Math.min(bevel, h * .8, (outer - inner) * .2);
  const points = [[inner + b, -h], [outer - b, -h], [outer, -h + b], [outer, h - b], [outer - b, h], [inner + b, h], [inner, h - b], [inner, -h + b], [inner + b, -h]].map(([r, z]) => new THREE.Vector2(r, z));
  return new THREE.LatheGeometry(points, segments).rotateX(Math.PI / 2);
}

function supportAnnulus(inner: number, outer: number, depth: number) {
  const source = annulus(inner, outer, depth, 48, .004);
  const geometry = source.toNonIndexed();
  source.dispose();
  geometry.computeVertexNormals();
  const p = geometry.getAttribute("position"), n = geometry.getAttribute("normal");
  for(let i=0;i<p.count;i++) {
    const theta=Math.atan2(p.getY(i),p.getX(i));
    const radial=Math.hypot(n.getX(i),n.getY(i))*Math.sign(n.getX(i)*Math.cos(theta)+n.getY(i)*Math.sin(theta));
    n.setXYZ(i,radial*Math.cos(theta),radial*Math.sin(theta),n.getZ(i));
  }
  return geometry;
}

/** Fixed posts join the front shell to the four stationary shutter pivots.
 * Bake them into the existing shell submission to preserve the draw budget. */
function withShutterMounts(body:THREE.BufferGeometry){
  const pieces=[body];
  for(let i=0;i<4;i++){
    const angle=Math.PI/4+i*Math.PI/2;
    const post=new THREE.CylinderGeometry(.028,.028,.40,8).rotateX(Math.PI/2).translate(1.58*Math.cos(angle),1.58*Math.sin(angle),.28);
    post.computeTangents();pieces.push(post.toNonIndexed());post.dispose();
  }
  const merged=mergeGeometries(pieces,false);
  pieces.forEach(piece=>piece.dispose());
  if(!merged)throw new Error("Unable to build shutter mounts");
  return merged;
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
export function createOpticalLensModel(spec: OpticalLensSpec = defaultSpec as OpticalLensSpec, options: OpticalLensOptions = {}) {
  const layout = deriveInteriorLayout(spec);
  const clearance = validateInteriorClearances(layout);
  if (!clearance.passed) throw new Error(`Invalid optical clearances: ${JSON.stringify(clearance.violations)}`);
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
    setTransformationPose: () => {},
    setCutaway: () => {},
    setAmbientPose: () => {},
    pickPart: () => null,
    dispose: () => {},
  };
  const segments = options.quality === "low" ? 64 : 128;
  const interiorStage = BUILD_PASSES.indexOf(options.pass ?? "optimization-pass");
  // Accepted exterior form remains intact while the new interior progresses through its passes.
  const stage = 7;
  const microSegments = stage >= 7 ? Math.max(48, segments >> 1) : segments;
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const clay = new THREE.MeshStandardMaterial({ color: "#9197a0", roughness: 0.65 });
  const physical = interiorStage >= 3 ? createLensMaterials(spec, interiorStage >= 4) : null;
  materials.add(clay);
  const descriptors = new Map(spec.components.map(c=>[c.id,c]));
  const addMesh = (id:string, geometry:THREE.BufferGeometry, count=0,override?:THREE.Material) => {
    geometry.computeBoundingSphere();
    geometries.add(geometry);
    const c=descriptors.get(id)!;
    const material=override??physical?.materials.get(c.geometry.kind==="optical-element"?`glass:${id}`:c.material)??clay;
    if(override)materials.add(override);
    const mesh=count?new THREE.InstancedMesh(geometry,material,count):new THREE.Mesh(geometry,material);
    mesh.name=`${id}-mesh-${runtime.nodes[id].children.length}`;
    mesh.userData.componentId=id;mesh.userData.explodeWithParent=true;
    runtime.nodes[id].add(mesh);runtime.meshes[id]=mesh;return mesh;
  };

  for (const c of spec.components) {
    const pivot = new THREE.Group();
    pivot.name = c.id;
    pivot.position.fromArray(c.position);
    runtime.nodes[c.id] = pivot;
  }
  for (const c of spec.components) {
    (c.parent === "root" ? root : runtime.nodes[c.parent]).add(runtime.nodes[c.id]);
  }

  for (const [componentIndex, c] of spec.components.entries()) {
    const pivot = runtime.nodes[c.id];
    pivot.userData.basePosition = pivot.position.clone();
    pivot.userData.componentIndex = componentIndex;
    pivot.userData.parentComponent = c.parent ?? "root";
    const g = c.geometry;
    if (stage >= 6) {
      const socket = new THREE.Object3D();
      socket.name = `${c.id}-seat`;
      pivot.add(socket);
      runtime.sockets[socket.name] = socket;
      runtime.colliders[c.id] = { type: "cylinder", radius: g.outer ?? g.outerRadius ?? g.radius ?? 0.5, depth: g.depth ?? 0.2 };
      const groupKey = c.parent ?? c.id;
      (runtime.destructionGroups[groupKey] ??= []).push(pivot);
    }
    if ((INTERIOR_IDS as readonly string[]).includes(c.id)) continue;
    const add = (geometry:THREE.BufferGeometry,count=0) => addMesh(c.id,geometry,count);
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
        if(c.id==="front-shell"&&descriptors.has("front-shutter"))geometry=withShutterMounts(geometry);
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
      default: throw new Error(`Unknown lens geometry: ${g.kind}`);
    }
    add(geometry);
  }
  const rig=createLensInterior({root,runtime,stage:interiorStage,addMesh,annulus:supportAnnulus},spec);
  runtime.setExplode=rig.setSeparation;
  runtime.setFocusRing=rig.setFocus;
  runtime.setTransformationPose=rig.setPose;
  runtime.setCutaway=(enabled:boolean)=>rig.setPose(getLensTransformationPose(enabled?12:0));
  runtime.setAmbientPose=rig.setAmbientPose;
  if(interiorStage>=7&&options.batchOpaque!==false)batchRigidHardware(root,runtime,addMesh);
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
  let disposed=false;
  runtime.dispose = () => { if(disposed)return;disposed=true;geometries.forEach((g) => g.dispose()); materials.forEach((m) => m.dispose()); physical?.dispose(); };
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
import { getLensTransformationPose, LENS_INTERIOR_YAW } from "./lensTransformation";

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
  function setPhase(seconds:number) {
    (model.userData.sculptRuntime as LensRuntime).setTransformationPose(getLensTransformationPose(seconds));render();
  }
  function setInteriorView() {
    camera.position.setFromSphericalCoords(12,Math.PI/2-.14,LENS_INTERIOR_YAW);camera.lookAt(0,0,0);render();
  }
  function setCutaway(enabled:boolean) {
    (model.userData.sculptRuntime as LensRuntime).setCutaway(enabled);
    if(enabled)setInteriorView();else setView(0);
    render();
  }
  setView(0);
  return { renderer, scene, camera, model, render, setView, setLighting, setExplode, setFocusRing, setPhase, setCutaway, setInteriorView, resize, dispose() { (model.userData.sculptRuntime as LensRuntime).dispose(); environment?.dispose(); if(neutralEnvironment !== environment) neutralEnvironment?.dispose(); renderer.dispose(); } };
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/model/interiorLayout.ts">
<![CDATA[import type { ClearanceViolation, LensLayout, OpticalLensSpec } from "./lensTypes";
import { opticalProfileMetrics } from "./opticalProfile";

export const OPTICAL_ORDER = ["front-meniscus", "front-biconvex", "front-compensator", "front-lens", "rear-relay", "rear-plano", "rear-lens"] as const;
export const INTERIOR_IDS = ["front-meniscus-cell", "front-meniscus", "front-biconvex-cell", "front-biconvex", "front-compensator-cell", "front-compensator", "rear-relay-cell", "rear-relay", "rear-plano-cell", "rear-plano", "internal-barrel", "core-carrier", "spacer-stack", "rear-baffles", "carrier-fasteners", "core-retaining-beads", "housing-panel-0", "housing-panel-1", "housing-panel-2", "housing-panel-3", "guide-rails", "panel-linkages", "front-shutter"] as const;
const kinds = new Set(["fluted-torus", "annulus", "lens", "radial-boxes", "bolts", "contacts", "beads", "prisms", "optical-element", "cell", "open-frame", "spacers", "baffles", "panel", "rails", "linkages", "front-shutter"]);

/** Pure rest-layout resolver; parent offsets are applied once through the graph. */
export function deriveInteriorLayout(spec: OpticalLensSpec): LensLayout {
  const transforms: LensLayout["transforms"] = Object.create(null);
  for (const c of spec.components) {
    if (transforms[c.id]) throw new Error(`Duplicate lens component: ${c.id}`);
    if (!kinds.has(c.geometry.kind)) throw new Error(`Unknown lens geometry: ${c.geometry.kind}`);
    if (c.position.length !== 3 || !c.position.every(Number.isFinite)) throw new Error(`Invalid position: ${c.id}`);
    transforms[c.id] = { parent: c.parent, position: [...c.position] };
  }
  function worldZ(id: string, ancestors = new Set<string>()): number {
    if (id === "root") return 0;
    if (ancestors.has(id)) throw new Error(`Cyclic lens parent: ${id}`);
    const t = transforms[id];
    if (!t) throw new Error(`Unresolved lens parent: ${id}`);
    return t.position[2] + worldZ(t.parent, new Set([...ancestors, id]));
  }
  for (const c of spec.components) worldZ(c.id);
  const optics = OPTICAL_ORDER.map(id => {
    const c = spec.components.find(c => c.id === id);
    if (!c) throw new Error(`Missing optical group: ${id}`);
    const g = c.geometry;
    const thickness = g.kind === "lens" ? g.depth! + 2 * g.sag! : opticalProfileMetrics({shape:g.shape!,radius:g.radius!,edgeThickness:g.edgeThickness!,frontSag:g.frontSag!,backSag:g.backSag!,chamfer:g.chamfer}).depth;
    const z = worldZ(id);
    return { id, radius: g.radius!, minZ: z - thickness / 2, maxZ: z + thickness / 2 };
  });
  return { transforms, optics, assemblies: OPTICAL_ORDER.map(id => id === "front-lens" ? ["core-carrier", id, "core-retaining-beads", "carrier-fasteners"] : [id, `${id}-cell`].filter(cid => transforms[cid])) };
}

export function validateInteriorClearances(layout: LensLayout): { passed: boolean; violations: ClearanceViolation[] } {
  const violations: ClearanceViolation[] = [];
  for (let i = 1; i < layout.optics.length; i++) {
    const front = layout.optics[i-1], rear = layout.optics[i];
    const gap = front.minZ - rear.maxZ;
    if (!Number.isFinite(gap) || gap < .03 - 1e-6) violations.push({ front: front.id, rear: rear.id, gap });
  }
  return { passed: violations.length === 0, violations };
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
        -0.03
      ],
      "material": "titanium",
      "geometry": {
        "kind": "annulus",
        "inner": 1.38,
        "outer": 1.6,
        "depth": 0.2,
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
      "parent": "front-meniscus-cell",
      "level": "meso",
      "position": [
        0,
        0,
        -0.1
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
      "parent": "core-carrier",
      "level": "meso",
      "position": [
        0,
        0,
        0.17
      ],
      "material": "titanium",
      "geometry": {
        "kind": "annulus",
        "inner": 0.715,
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
      "parent": "core-carrier",
      "level": "macro",
      "position": [
        0,
        0,
        0
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
        -1.45
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
        -1.54
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
        -1.5999999999999999
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
        -1.65
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
    },
    {
      "id": "front-meniscus-cell",
      "parent": "root",
      "level": "meso",
      "position": [
        0,
        0,
        0.16
      ],
      "material": "titanium",
      "geometry": {
        "kind": "cell",
        "innerRadius": 1.038,
        "outerRadius": 1.12,
        "depth": 0.22,
        "seatLip": 0.02,
        "startRadians": -0.1308996938995747,
        "sweepRadians": 0.2617993877991494,
        "count": 4
      },
      "features": [
        {
          "id": "seat-shoulder",
          "type": "ridge",
          "description": "Stepped retaining shoulder contacts glass edge",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "geometryEffect": "Stepped retaining shoulder contacts glass edge",
          "confidence": 0.8,
          "evidenceRefs": [
            "keyframe-4"
          ]
        }
      ]
    },
    {
      "id": "front-meniscus",
      "parent": "front-meniscus-cell",
      "level": "meso",
      "position": [
        0,
        0,
        0
      ],
      "material": "glass",
      "geometry": {
        "kind": "optical-element",
        "shape": "meniscus",
        "radius": 1.05,
        "edgeThickness": 0.035,
        "frontSag": 0.15,
        "backSag": 0.08,
        "chamfer": 0.004
      },
      "features": [
        {
          "id": "meniscus-curvature",
          "type": "bevel",
          "description": "Closed curved front and back surfaces, positive perimeter thickness",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "geometryEffect": "Closed curved front and back surfaces, positive perimeter thickness",
          "confidence": 0.8,
          "evidenceRefs": [
            "keyframe-4"
          ]
        },
        {
          "id": "positive-edge",
          "type": "bevel",
          "description": "Positive thickness across sampled profile",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "geometryEffect": "Positive thickness across sampled profile",
          "confidence": 0.8,
          "evidenceRefs": [
            "keyframe-4"
          ]
        }
      ]
    },
    {
      "id": "front-biconvex-cell",
      "parent": "root",
      "level": "meso",
      "position": [
        0,
        0,
        -0.25
      ],
      "material": "titanium",
      "geometry": {
        "kind": "cell",
        "innerRadius": 0.968,
        "outerRadius": 1.05,
        "depth": 0.12,
        "seatLip": 0.02,
        "startRadians": -0.1308996938995747,
        "sweepRadians": 0.2617993877991494,
        "count": 4
      },
      "features": [
        {
          "id": "cell-socket",
          "type": "hole",
          "description": "Named carrier socket remains engaged with rail",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "geometryEffect": "Named carrier socket remains engaged with rail",
          "confidence": 0.8,
          "evidenceRefs": [
            "keyframe-4"
          ]
        }
      ]
    },
    {
      "id": "front-biconvex",
      "parent": "front-biconvex-cell",
      "level": "meso",
      "position": [
        0,
        0,
        0
      ],
      "material": "glass",
      "geometry": {
        "kind": "optical-element",
        "shape": "biconvex",
        "radius": 0.98,
        "edgeThickness": 0.03,
        "frontSag": 0.085,
        "backSag": -0.085,
        "chamfer": 0.004
      },
      "features": [
        {
          "id": "biconvex-curvature",
          "type": "bevel",
          "description": "Two convex faces with .03 perimeter and .20 center thickness",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "geometryEffect": "Two convex faces with .03 perimeter and .20 center thickness",
          "confidence": 0.8,
          "evidenceRefs": [
            "keyframe-4"
          ]
        },
        {
          "id": "glass-chamfer",
          "type": "bevel",
          "description": ".004 polished edge chamfer",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "geometryEffect": ".004 polished edge chamfer",
          "confidence": 0.8,
          "evidenceRefs": [
            "keyframe-4"
          ]
        }
      ]
    },
    {
      "id": "front-compensator-cell",
      "parent": "root",
      "level": "meso",
      "position": [
        0,
        0,
        -0.44
      ],
      "material": "titanium",
      "geometry": {
        "kind": "cell",
        "innerRadius": 0.828,
        "outerRadius": 0.9099999999999999,
        "depth": 0.12,
        "seatLip": 0.02,
        "startRadians": -0.1308996938995747,
        "sweepRadians": 0.2617993877991494,
        "count": 4
      },
      "features": [
        {
          "id": "front-compensator-cell-finished-edge",
          "type": "bevel",
          "description": "Closed positive-thickness profile with fitted edge shoulder",
          "geometryEffect": ".008 chamfered mounting edge",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "confidence": 0.75,
          "evidenceRefs": [
            "keyframe-4"
          ]
        }
      ]
    },
    {
      "id": "front-compensator",
      "parent": "front-compensator-cell",
      "level": "meso",
      "position": [
        0,
        0,
        0
      ],
      "material": "glass",
      "geometry": {
        "kind": "optical-element",
        "shape": "biconvex",
        "radius": 0.84,
        "edgeThickness": 0.03,
        "frontSag": 0.045,
        "backSag": -0.045,
        "chamfer": 0.004
      },
      "features": [
        {
          "id": "compensator-sag",
          "type": "bevel",
          "description": "Lower-sag curved compensating element",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "geometryEffect": "Lower-sag curved compensating element",
          "confidence": 0.8,
          "evidenceRefs": [
            "keyframe-4"
          ]
        }
      ]
    },
    {
      "id": "rear-relay-cell",
      "parent": "root",
      "level": "meso",
      "position": [
        0,
        0,
        -1.14
      ],
      "material": "titanium",
      "geometry": {
        "kind": "cell",
        "innerRadius": 0.728,
        "outerRadius": 0.81,
        "depth": 0.12,
        "seatLip": 0.02,
        "startRadians": -0.1308996938995747,
        "sweepRadians": 0.2617993877991494,
        "count": 4
      },
      "features": [
        {
          "id": "rear-relay-cell-finished-edge",
          "type": "bevel",
          "description": "Closed positive-thickness profile with fitted edge shoulder",
          "geometryEffect": ".008 chamfered mounting edge",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "confidence": 0.75,
          "evidenceRefs": [
            "keyframe-4"
          ]
        }
      ]
    },
    {
      "id": "rear-relay",
      "parent": "rear-relay-cell",
      "level": "meso",
      "position": [
        0,
        0,
        0
      ],
      "material": "glass",
      "geometry": {
        "kind": "optical-element",
        "shape": "biconvex",
        "radius": 0.74,
        "edgeThickness": 0.03,
        "frontSag": 0.055,
        "backSag": -0.055,
        "chamfer": 0.004
      },
      "features": [
        {
          "id": "relay-curvature",
          "type": "bevel",
          "description": "Small curved relay optic behind emerald",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "geometryEffect": "Small curved relay optic behind emerald",
          "confidence": 0.8,
          "evidenceRefs": [
            "keyframe-4"
          ]
        }
      ]
    },
    {
      "id": "rear-plano-cell",
      "parent": "root",
      "level": "meso",
      "position": [
        0,
        0,
        -1.32
      ],
      "material": "titanium",
      "geometry": {
        "kind": "cell",
        "innerRadius": 0.528,
        "outerRadius": 0.6100000000000001,
        "depth": 0.14,
        "seatLip": 0.02,
        "startRadians": -0.1308996938995747,
        "sweepRadians": 0.2617993877991494,
        "count": 4
      },
      "features": [
        {
          "id": "rear-plano-cell-finished-edge",
          "type": "bevel",
          "description": "Closed positive-thickness profile with fitted edge shoulder",
          "geometryEffect": ".008 chamfered mounting edge",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "confidence": 0.75,
          "evidenceRefs": [
            "keyframe-4"
          ]
        }
      ]
    },
    {
      "id": "rear-plano",
      "parent": "rear-plano-cell",
      "level": "meso",
      "position": [
        0,
        0,
        0
      ],
      "material": "glass",
      "geometry": {
        "kind": "optical-element",
        "shape": "plano-convex",
        "radius": 0.54,
        "edgeThickness": 0.03,
        "frontSag": 0.07,
        "backSag": 0,
        "chamfer": 0.004
      },
      "features": [
        {
          "id": "plano-face",
          "type": "bevel",
          "description": "Plane rear surface and convex front profile",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "geometryEffect": "Plane rear surface and convex front profile",
          "confidence": 0.8,
          "evidenceRefs": [
            "keyframe-4"
          ]
        }
      ]
    },
    {
      "id": "internal-barrel",
      "parent": "root",
      "level": "macro",
      "position": [
        0,
        0,
        -0.78
      ],
      "material": "titanium",
      "geometry": {
        "kind": "open-frame",
        "innerRadius": 1.42,
        "outerRadius": 1.5,
        "depth": 2.1
      },
      "features": [
        {
          "id": "frame-brushing",
          "type": "scratch",
          "description": "Directional normal/roughness on stationary metal supports",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "geometryEffect": "Directional normal/roughness on stationary metal supports",
          "confidence": 0.8,
          "evidenceRefs": [
            "keyframe-4"
          ]
        }
      ]
    },
    {
      "id": "core-carrier",
      "parent": "root",
      "level": "meso",
      "position": [
        0,
        0,
        -0.78
      ],
      "material": "titanium",
      "geometry": {
        "kind": "cell",
        "innerRadius": 0.578,
        "outerRadius": 0.71,
        "depth": 0.5,
        "seatLip": 0.02
      },
      "features": [
        {
          "id": "core-shoulder",
          "type": "ridge",
          "description": "Stepped annular emerald retaining shoulder",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "geometryEffect": "Stepped annular emerald retaining shoulder",
          "confidence": 0.8,
          "evidenceRefs": [
            "keyframe-4"
          ]
        }
      ]
    },
    {
      "id": "spacer-stack",
      "parent": "root",
      "level": "meso",
      "position": [
        0,
        0,
        0
      ],
      "material": "titanium",
      "geometry": {
        "kind": "spacers",
        "radii": [
          1.12,
          1.05,
          0.91,
          0.81,
          0.61
        ],
        "depth": 0.04
      },
      "features": [
        {
          "id": "spacer-lips",
          "type": "ridge",
          "description": "Closed annular spacers with real mounting lips",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "geometryEffect": "Closed annular spacers with real mounting lips",
          "confidence": 0.8,
          "evidenceRefs": [
            "keyframe-4"
          ]
        }
      ]
    },
    {
      "id": "rear-baffles",
      "parent": "root",
      "level": "meso",
      "position": [
        0,
        0,
        -1.48
      ],
      "material": "titanium",
      "geometry": {
        "kind": "baffles",
        "innerRadius": 0.38,
        "outerRadius": 0.56,
        "depth": 0.06
      },
      "features": [
        {
          "id": "baffle-aperture",
          "type": "hole",
          "description": "Thin annular stop with visible chamfered aperture",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "geometryEffect": "Thin annular stop with visible chamfered aperture",
          "confidence": 0.8,
          "evidenceRefs": [
            "keyframe-4"
          ]
        }
      ]
    },
    {
      "id": "carrier-fasteners",
      "parent": "core-carrier",
      "level": "micro",
      "position": [
        0,
        0,
        0
      ],
      "material": "titanium",
      "geometry": {
        "kind": "bolts",
        "radius": 0.68,
        "count": 6,
        "size": 0.035
      },
      "features": [
        {
          "id": "fastener-crowns",
          "type": "fastener",
          "description": "Six repeated small metallic crowns on carrier",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "geometryEffect": "Six repeated small metallic crowns on carrier",
          "confidence": 0.8,
          "evidenceRefs": [
            "keyframe-4"
          ]
        }
      ]
    },
    {
      "id": "core-retaining-beads",
      "parent": "core-carrier",
      "level": "micro",
      "position": [
        0,
        0,
        0.255
      ],
      "material": "titanium",
      "geometry": {
        "kind": "beads",
        "radii": [
          0.615,
          0.66
        ],
        "tube": 0.012
      },
      "features": [
        {
          "id": "polished-trim",
          "type": "gloss",
          "description": "Relocated small concentric retaining trim",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "geometryEffect": "Relocated small concentric retaining trim",
          "confidence": 0.8,
          "evidenceRefs": [
            "keyframe-4"
          ]
        }
      ]
    },
    {
      "id": "housing-panel-0",
      "parent": "root",
      "level": "macro",
      "position": [
        0,
        0,
        -1.05
      ],
      "material": "titanium",
      "geometry": {
        "kind": "panel",
        "innerRadius": 2.17,
        "outerRadius": 2.23,
        "depth": 1.56,
        "startRadians": 0.003,
        "sweepRadians": 1.5647963267948966,
        "hingeZ": -1.83,
        "radialSlide": 0.24,
        "pivotRadians": 0.58
      },
      "features": [
        {
          "id": "panel-brushing",
          "type": "scratch",
          "description": "Independent microscopic directional metal normal and roughness",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "geometryEffect": "Independent microscopic directional metal normal and roughness",
          "confidence": 0.8,
          "evidenceRefs": [
            "keyframe-4"
          ]
        }
      ]
    },
    {
      "id": "housing-panel-1",
      "parent": "root",
      "level": "macro",
      "position": [
        0,
        0,
        -1.05
      ],
      "material": "titanium",
      "geometry": {
        "kind": "panel",
        "innerRadius": 2.17,
        "outerRadius": 2.23,
        "depth": 1.56,
        "startRadians": 1.5737963267948964,
        "sweepRadians": 1.5647963267948966,
        "hingeZ": -1.83,
        "radialSlide": 0.24,
        "pivotRadians": 0.58
      },
      "features": [
        {
          "id": "panel-edge-faces",
          "type": "bevel",
          "description": "Finished closed sector boundary faces with flat normals",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "geometryEffect": "Finished closed sector boundary faces with flat normals",
          "confidence": 0.8,
          "evidenceRefs": [
            "keyframe-4"
          ]
        }
      ]
    },
    {
      "id": "housing-panel-2",
      "parent": "root",
      "level": "macro",
      "position": [
        0,
        0,
        -1.05
      ],
      "material": "titanium",
      "geometry": {
        "kind": "panel",
        "innerRadius": 2.17,
        "outerRadius": 2.23,
        "depth": 1.56,
        "startRadians": 3.1445926535897932,
        "sweepRadians": 1.5647963267948966,
        "hingeZ": -1.83,
        "radialSlide": 0.24,
        "pivotRadians": 0.58
      },
      "features": [
        {
          "id": "docking-seam",
          "type": "seam",
          "description": "Stable panel seams and closed docking shoulders",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "geometryEffect": "Stable panel seams and closed docking shoulders",
          "confidence": 0.8,
          "evidenceRefs": [
            "keyframe-4"
          ]
        }
      ]
    },
    {
      "id": "housing-panel-3",
      "parent": "root",
      "level": "macro",
      "position": [
        0,
        0,
        -1.05
      ],
      "material": "titanium",
      "geometry": {
        "kind": "panel",
        "innerRadius": 2.17,
        "outerRadius": 2.23,
        "depth": 1.56,
        "startRadians": 4.71538898038469,
        "sweepRadians": 1.5647963267948966,
        "hingeZ": -1.83,
        "radialSlide": 0.24,
        "pivotRadians": 0.58
      },
      "features": [
        {
          "id": "rigid-deployment",
          "type": "contour",
          "description": "Same closed shell opens by slide and pivot, fixed scale",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "geometryEffect": "Same closed shell opens by slide and pivot, fixed scale",
          "confidence": 0.8,
          "evidenceRefs": [
            "keyframe-4"
          ]
        }
      ]
    },
    {
      "id": "guide-rails",
      "parent": "root",
      "level": "meso",
      "position": [
        0,
        0,
        -0.78
      ],
      "material": "titanium",
      "geometry": {
        "kind": "rails",
        "radius": 1.3,
        "count": 4,
        "rodRadius": 0.025,
        "depth": 4.0
      },
      "features": [
        {
          "id": "optical-air-gaps",
          "type": "seam",
          "description": "At least .03 gap between sampled optical envelopes",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "geometryEffect": "At least .03 gap between sampled optical envelopes",
          "confidence": 0.8,
          "evidenceRefs": [
            "keyframe-3"
          ]
        },
        {
          "id": "rail-sockets",
          "type": "ridge",
          "description": "Four axial guides and seated translating carriage sockets",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "geometryEffect": "Four axial guides and seated translating carriage sockets",
          "confidence": 0.8,
          "evidenceRefs": [
            "keyframe-3"
          ]
        }
      ]
    },
    {
      "id": "panel-linkages",
      "parent": "root",
      "level": "micro",
      "position": [
        0,
        0,
        -1.83
      ],
      "material": "titanium",
      "geometry": {
        "kind": "linkages",
        "count": 8,
        "armRadius": 0.025,
        "linkLength": 0.32,
        "endpointTolerance": 0.005
      },
      "features": [
        {
          "id": "hinge-crowns",
          "type": "fastener",
          "description": "Retained support arms with linked endpoints and compact pivot crowns",
          "placement": {
            "x": 0.1,
            "y": 0.1,
            "width": 0.8,
            "height": 0.8
          },
          "geometryEffect": "Retained support arms with linked endpoints and compact pivot crowns",
          "confidence": 0.8,
          "evidenceRefs": [
            "keyframe-3"
          ]
        }
      ]
    },
    {
      "id": "front-shutter",
      "parent": "root",
      "level": "meso",
      "position": [
        0,
        0,
        0
      ],
      "material": "titanium",
      "geometry": {
        "kind": "front-shutter",
        "radius": 1.58,
        "depth": 0.09,
        "count": 4,
        "hingeZ": 0.45,
        "pivotRadians": 2.705260340591211
      },
      "features": [
        {
          "id": "closed-aperture-petals",
          "description": "Four closed beveled petals physically conceal the optics at rest and fold forward/outward to reveal them."
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
}
]]>
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
  const clear=materials.get("glass");
  if(clear)for(const component of spec.components) {
    const g=component.geometry;if(g.kind!=="optical-element")continue;
    const material=clear.clone();material.name=`glass:${component.id}`;
    material.thickness=Math.max(g.edgeThickness!,g.edgeThickness!+g.frontSag!-g.backSag!);
    materials.set(material.name,material);
  }
  let disposed=false;
  return { materials, dispose() { if(disposed)return;disposed=true;materials.forEach(m => m.dispose()); roughnessMap.dispose(); normalMap.dispose(); emissiveMap.dispose(); } };
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/model/lensTransformation.ts">
<![CDATA[export const LENS_TRANSFORMATION_SECONDS=24;
// A 50-degree side view preserves depth while keeping the recessed core readable.
export const LENS_INTERIOR_YAW=Math.PI*5/18;
export type LensTransformationPose={
  seconds:number;
  phase:"assembled"|"unlock"|"deploy"|"interior"|"reassemble"|"lock";
  body:number;unlock:number;frontCarriage:number;guideExtension:number;shutter:number;
  opticalOffsets:readonly number[];panelSlide:readonly number[];panelPivot:readonly number[];
  cameraBlend:number;ambientWeight:number;
};

function ramp(t:number,start:number,end:number) {
  const u=Math.max(0,Math.min(1,(t-start)/(end-start)));
  return u*u*u*(u*(u*6-15)+10);
}

/** Absolute, reversible pose sampling; each channel shares the existing 24-second clock. */
export function getLensTransformationPose(elapsedSeconds:number):LensTransformationPose {
  const t=Number.isFinite(elapsedSeconds)?((elapsedSeconds%24)+24)%24:0;
  const lift=ramp(t,4,5)*(1-ramp(t,20,21));
  const body=ramp(t,6,10)*(1-ramp(t,15,19));
  const frontCarriage=.5*lift+.55*body;
  const opticalB=ramp(t,6.25,9.75)*(1-ramp(t,15.25,18.75));
  const opticalC=ramp(t,6.5,10)*(1-ramp(t,15,18.5));
  return {
    seconds:t,
    phase:t<3||t>=22?"assembled":t<6?"unlock":t<10?"deploy":t<15?"interior":t<20?"reassemble":"lock",
    body,unlock:ramp(t,3,4)*(1-ramp(t,21,22)),frontCarriage,guideExtension:frontCarriage,
    shutter:ramp(t,3.5,6.5)*(1-ramp(t,19,21.5)),
    opticalOffsets:[.5*lift+.15*body,.24*opticalB,.12*opticalC,0,0,0,0],
    panelSlide:Array.from({length:4},(_,i)=>ramp(t,5+i*.06,6+i*.06)*(1-ramp(t,18.5+i*.06,19.2+i*.06))),
    panelPivot:Array.from({length:4},(_,i)=>ramp(t,6.3+i*.06,9.5+i*.06)*(1-ramp(t,15+(3-i)*.06,18+(3-i)*.06))),
    cameraBlend:body,ambientWeight:1-body,
  };
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/model/lensTypes.ts">
<![CDATA[import type originalSpec from "./lens-spec.json";

export type LensGeometryKind = "fluted-torus" | "annulus" | "lens" | "radial-boxes" | "bolts" | "contacts" | "beads" | "prisms" | "optical-element" | "cell" | "open-frame" | "spacers" | "baffles" | "panel" | "rails" | "linkages" | "front-shutter";
export type OpticalElementProfile = {
  shape: "meniscus" | "biconvex" | "plano-convex";
  radius: number;
  edgeThickness: number;
  frontSag: number;
  backSag: number;
  chamfer?: number;
};
export type LensGeometry = {
  kind: LensGeometryKind;
  radius?: number; tube?: number; depth?: number; flutes?: number; amplitude?: number; twist?: number;
  inner?: number; outer?: number; bevel?: number; sag?: number; count?: number; width?: number; height?: number; phase?: number; size?: number;
  radii?: number[]; points?: number[][]; seed?: number;
  shape?: OpticalElementProfile["shape"]; edgeThickness?: number; frontSag?: number; backSag?: number; chamfer?: number;
  innerRadius?: number; outerRadius?: number; seatLip?: number; startRadians?: number; sweepRadians?: number;
  hingeZ?: number; radialSlide?: number; pivotRadians?: number; rodRadius?: number; armRadius?: number; linkLength?: number; endpointTolerance?: number;
};
export type LensComponent = {
  id: string; parent: string; level: "macro" | "meso" | "micro";
  position: number[]; material: string; geometry: LensGeometry;
  features?: { id: string; description: string }[];
};
export type OpticalLensSpec = { components: LensComponent[]; materials: typeof originalSpec.materials };
export type LensLayout = {
  transforms: Record<string, { parent: string; position: number[] }>;
  optics: { id: string; radius: number; minZ: number; maxZ: number }[];
  assemblies: string[][];
};
export type ClearanceViolation = { front: string; rear: string; gap: number };
]]>
    </file>
    <file path="src/app/(lenus)/lenus/model/opticalLensGeometry.ts">
<![CDATA[import * as THREE from "three";
import type { OpticalElementProfile } from "./lensTypes";
import { opticalProfileMetrics, sampleOpticalProfile } from "./opticalProfile";
import { buildClosedRevolvedSection, type RevolvedProfile } from "./sectionGeometry";

export function buildOpticalElementGeometry(profile:OpticalElementProfile,segments:number) {
  const metrics=opticalProfileMetrics(profile);
  const geometry=buildClosedRevolvedSection(sampleOpticalProfile(profile),{segments,startRadians:0,sweepRadians:Math.PI*2});
  const p=geometry.getAttribute("position"),n=geometry.getAttribute("normal");
  const normal=new THREE.Vector3();
  for(let i=0;i<p.count;i++) {
    const radius=Math.hypot(p.getX(i),p.getY(i)),rawZ=p.getZ(i)+metrics.center;
    if(radius>metrics.edgeRadius+1e-6)continue;
    const front=Math.abs(rawZ-metrics.surface(radius,true))<1e-6;
    const back=Math.abs(rawZ-metrics.surface(radius,false))<1e-6;
    if(!front&&!back)continue;
    const sag=front?profile.frontSag:profile.backSag;
    const derivative=-2*sag*radius/profile.radius**2;
    const theta=Math.atan2(p.getY(i),p.getX(i));
    normal.set((front?-1:1)*derivative*Math.cos(theta),(front?-1:1)*derivative*Math.sin(theta),front?1:-1).normalize();
    n.setXYZ(i,normal.x,normal.y,normal.z);
  }
  n.needsUpdate=true;return geometry;
}

/** Stepped seats clear the actual curved glass instead of overlapping its edge. */
function opticalCellSections(radius:number,outer:number,depth:number,profile?:OpticalElementProfile) {
  const seat=radius-.012,wall=radius+.003,h=depth/2,b=.004;
  let front:number,back:number;
  if(profile){const m=opticalProfileMetrics(profile);front=m.surface(seat,true)-m.center+.002;back=m.surface(seat,false)-m.center-.002;}
  else {const z=.23*Math.sqrt(1-(seat/radius)**2);front=z+.002;back=-z-.002;}
  const lip=.006;
  const points:[number,number][]=[[wall,-h+b],[wall+b,-h],[outer-b,-h],[outer,-h+b],[outer,h-b],[outer-b,h],[wall+b,h],[wall,h-b],[wall,front+lip],[seat,front+lip],[seat,front],[wall,front],[wall,back],[seat,back],[seat,back-lip],[wall,back-lip]];
  const smooth:{r:number;z:number;nr:number;nz:number}[]=[];
  const result=points.flatMap((p,i)=>{
    if(i<8)return [p];
    const previous=points[(i+points.length-1)%points.length],next=points[(i+1)%points.length];
    const before=Math.hypot(previous[0]-p[0],previous[1]-p[1]),after=Math.hypot(next[0]-p[0],next[1]-p[1]);
    const bevel=Math.min(.0015,before*.2,after*.2);
    const a=[p[0]+(previous[0]-p[0])*bevel/before,p[1]+(previous[1]-p[1])*bevel/before];
    const b=[p[0]+(next[0]-p[0])*bevel/after,p[1]+(next[1]-p[1])*bevel/after];
    return Array.from({length:4},(_,step)=>{
      const t=step/3,u=1-t;
      const r=u*u*a[0]+2*u*t*p[0]+t*t*b[0],z=u*u*a[1]+2*u*t*p[1]+t*t*b[1];
      const dr=2*u*(p[0]-a[0])+2*t*(b[0]-p[0]),dz=2*u*(p[1]-a[1])+2*t*(b[1]-p[1]),length=Math.hypot(dr,dz);
      smooth.push({r,z,nr:dz/length,nz:-dr/length});return [r,z] as [number,number];
    });
  });
  return {profile:result,smooth};
}

export function buildOpticalCellProfile(radius:number,outer:number,depth:number,profile?:OpticalElementProfile):RevolvedProfile {
  return opticalCellSections(radius,outer,depth,profile).profile;
}

export function buildOpticalCellGeometry(radius:number,outer:number,depth:number,profile:OpticalElementProfile|undefined,segments:number,options={startRadians:0,sweepRadians:Math.PI*2}) {
  const section=opticalCellSections(radius,outer,depth,profile);
  const geometry=buildClosedRevolvedSection(section.profile,{segments,startRadians:options.startRadians,sweepRadians:options.sweepRadians});
  const p=geometry.getAttribute("position"),n=geometry.getAttribute("normal");
  for(let i=0;i<p.count;i++) {
    const r=Math.hypot(p.getX(i),p.getY(i)),z=p.getZ(i);
    const smooth=section.smooth.find(s=>Math.abs(s.r-r)<1e-6&&Math.abs(s.z-z)<1e-6);
    if(!smooth)continue;
    const theta=Math.atan2(p.getY(i),p.getX(i));
    if(Math.abs(n.getX(i)*Math.cos(theta)+n.getY(i)*Math.sin(theta))<1e-6&&Math.abs(n.getZ(i))<1e-6)continue;
    n.setXYZ(i,smooth.nr*Math.cos(theta),smooth.nr*Math.sin(theta),smooth.nz);
  }
  n.needsUpdate=true;return geometry;
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/model/opticalProfile.ts">
<![CDATA[import type { OpticalElementProfile } from "./lensTypes";

export function opticalProfileMetrics(p:OpticalElementProfile) {
  const {radius,edgeThickness,frontSag,backSag}=p;
  const validShape=p.shape==="meniscus"?frontSag*backSag>0:p.shape==="biconvex"?frontSag>0&&backSag<0:p.shape==="plano-convex"&&((frontSag>0&&backSag===0)||(frontSag===0&&backSag<0));
  if(![radius,edgeThickness,frontSag,backSag,p.chamfer??.004].every(Number.isFinite)||radius<=0||edgeThickness<=0||edgeThickness+frontSag-backSag<=0||!validShape||(p.chamfer??.004)<0)throw new Error("Invalid optical profile");
  const chamfer=Math.min(p.chamfer??.004,edgeThickness*.2,radius*.02);
  const surface=(r:number,front:boolean)=>(front?edgeThickness/2:-edgeThickness/2)+(front?frontSag:backSag)*(1-(r/radius)**2);
  const edgeRadius=radius-chamfer;
  const ends=[surface(0,true),surface(edgeRadius,true),surface(0,false),surface(edgeRadius,false),edgeThickness/2-chamfer,-edgeThickness/2+chamfer];
  const min=Math.min(...ends),max=Math.max(...ends),center=(min+max)/2;
  return {chamfer,edgeRadius,min,max,center,depth:max-min,surface};
}

export function sampleOpticalProfile(p:OpticalElementProfile,radialSteps=12):readonly (readonly [number,number])[] {
  const m=opticalProfileMetrics(p),points:[number,number][]=[];
  for(let i=0;i<=radialSteps;i++){const r=m.edgeRadius*i/radialSteps;points.push([r,m.surface(r,true)-m.center]);}
  points.push([p.radius,p.edgeThickness/2-m.chamfer-m.center],[p.radius,-p.edgeThickness/2+m.chamfer-m.center]);
  for(let i=radialSteps;i>=0;i--){const r=m.edgeRadius*i/radialSteps;points.push([r,m.surface(r,false)-m.center]);}
  return points;
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/model/sectionGeometry.ts">
<![CDATA[import * as THREE from "three";

export type RevolvedProfile=ReadonlyArray<readonly [radius:number,z:number]>;

export function annularProfile(inner:number,outer:number,depth:number,bevel=.006):RevolvedProfile {
  if(![inner,outer,depth,bevel].every(Number.isFinite)||inner<=0||outer<=inner||depth<=0||bevel<0)throw new Error("Invalid annular profile");
  const h=depth/2,b=Math.min(bevel,h*.8,(outer-inner)*.2);
  return [[inner+b,-h],[outer-b,-h],[outer,-h+b],[outer,h-b],[outer-b,h],[inner+b,h],[inner,h-b],[inner,-h+b]];
}

/** Closed profile around +Z; partial sweeps include triangulated boundary faces. */
export function buildClosedRevolvedSection(profile:RevolvedProfile,options:{segments:number;startRadians:number;sweepRadians:number}) {
  const {segments,startRadians,sweepRadians}=options;
  if(!Number.isInteger(segments)||segments<3||segments>512||![startRadians,sweepRadians].every(Number.isFinite)||sweepRadians<=0||sweepRadians>Math.PI*2+1e-8)throw new Error("Invalid revolved section");
  let points=profile.map(([r,z])=>new THREE.Vector2(r,z));
  if(points.some(p=>!Number.isFinite(p.x)||!Number.isFinite(p.y)||p.x<0))throw new Error("Invalid revolved profile");
  points=points.filter((p,i)=>i===0||p.distanceToSquared(points[i-1])>1e-20);
  if(points.length>1&&points[0].distanceToSquared(points.at(-1)!)<1e-20)points.pop();
  let changed=true;
  while(changed&&points.length>3){changed=false;for(let i=0;i<points.length;i++){
    const a=points[(i+points.length-1)%points.length],b=points[i],c=points[(i+1)%points.length];
    const ab=b.clone().sub(a),bc=c.clone().sub(b);
    if(Math.abs(ab.cross(bc))<1e-12&&ab.dot(bc)>=0){points.splice(i,1);changed=true;break;}
  }}
  const area=points.reduce((a,p,i)=>{const q=points[(i+1)%points.length];return a+p.x*q.y-q.x*p.y;},0);
  if(points.length<3||Math.abs(area)<1e-12)throw new Error("Degenerate revolved profile");
  if(area<0)points.reverse();
  const positions:number[]=[],normals:number[]=[],uvs:number[]=[],tangents:number[]=[],indices:number[]=[];
  const a=new THREE.Vector3(),b=new THREE.Vector3(),c=new THREE.Vector3();
  const vertex=(r:number,z:number,t:number,nr:number,nz:number,u:number,v:number)=>{
    const index=positions.length/3,cos=Math.cos(t),sin=Math.sin(t);
    positions.push(r*cos,r*sin,z);normals.push(nr*cos,nr*sin,nz);uvs.push(u,v);tangents.push(-sin,cos,0,1);return index;
  };
  const triangle=(i:number,j:number,k:number)=>{
    a.fromArray(positions,i*3);b.fromArray(positions,j*3);c.fromArray(positions,k*3);
    if(b.sub(a).cross(c.sub(a)).lengthSq()>1e-24)indices.push(i,j,k);
  };
  for(let j=0;j<points.length;j++) {
    const p=points[j],q=points[(j+1)%points.length],dr=q.x-p.x,dz=q.y-p.y,length=Math.hypot(dr,dz),base=positions.length/3;
    for(let i=0;i<=segments;i++) {
      const t=startRadians+sweepRadians*i/segments;
      vertex(p.x,p.y,t,dz/length,-dr/length,i/segments,j/points.length);
      vertex(q.x,q.y,t,dz/length,-dr/length,i/segments,(j+1)/points.length);
    }
    for(let i=0;i<segments;i++){const k=base+i*2;triangle(k,k+2,k+3);triangle(k,k+3,k+1);}
  }
  if(sweepRadians<Math.PI*2-1e-8) {
    const faces=THREE.ShapeUtils.triangulateShape(points,[]);
    for(const [side,t]of [startRadians,startRadians+sweepRadians].entries()) {
      const base=positions.length/3,sign=side===0?-1:1;
      const desired=new THREE.Vector3(-Math.sin(t)*sign,Math.cos(t)*sign,0);
      for(const p of points){vertex(p.x,p.y,t,0,0,p.x,p.y);normals.splice(normals.length-3,3,desired.x,desired.y,0);tangents.splice(tangents.length-4,4,Math.cos(t),Math.sin(t),0,1);}
      for(const face of faces){
        a.fromArray(positions,(base+face[0])*3);b.fromArray(positions,(base+face[1])*3);c.fromArray(positions,(base+face[2])*3);
        const outward=b.sub(a).cross(c.sub(a)).dot(desired)>=0;
        triangle(base+face[0],base+face[outward?1:2],base+face[outward?2:1]);
      }
    }
  }
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute("position",new THREE.Float32BufferAttribute(positions,3));
  geometry.setAttribute("normal",new THREE.Float32BufferAttribute(normals,3));
  geometry.setAttribute("uv",new THREE.Float32BufferAttribute(uvs,2));
  geometry.setAttribute("tangent",new THREE.Float32BufferAttribute(tangents,4));
  geometry.setIndex(indices);geometry.computeBoundingBox();geometry.computeBoundingSphere();return geometry;
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
    <file path="src/app/(lenus)/lenus/scene/lensMotion.ts">
<![CDATA[import { getLensTransformationPose, LENS_TRANSFORMATION_SECONDS } from "../model/lensTransformation";
export const LENS_LOOP_SECONDS=LENS_TRANSFORMATION_SECONDS;

/** One continuous cycle; all secondary motion uses harmonics of the same clock. */
export function getLensLoopPose(elapsedSeconds:number){
  const seconds=Number.isFinite(elapsedSeconds)?elapsedSeconds:0;
  const phase=((seconds%LENS_LOOP_SECONDS+LENS_LOOP_SECONDS)%LENS_LOOP_SECONDS)/LENS_LOOP_SECONDS*Math.PI*2;
  const weight=getLensTransformationPose(seconds).ambientWeight;
  return {
    spin:0,
    yaw:.11*Math.sin(phase)*weight,
    pitch:.05*Math.sin(phase*2)*weight,
    collar:.16*Math.sin(phase*2)*weight,
    shardOrbit:.22*Math.sin(phase)*weight,
    shardY:.035*Math.sin(phase*3)*weight,
  };
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/scene/LenusSceneController.ts">
<![CDATA[import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createOpticalLensModel, type LensRuntime } from "../model/createOpticalLensModel";
import { createStudioEnvironment } from "../model/studioEnvironment";
import { getLensTransformationPose, LENS_INTERIOR_YAW } from "../model/lensTransformation";
import { getPartTelemetry, isInteriorPart, prefersRearView, type LenusPartInfo } from "./telemetry";
import { getLensLoopPose } from "./lensMotion";
export { getPartTelemetry, type LenusPartInfo } from "./telemetry";

export function normalizePointer(value:number){return Number.isFinite(value)?THREE.MathUtils.clamp(value,-1,1):0;}
export function fitHeroFrustumHalfHeight(width:number,height:number,inspection=false){
  const aspect=Math.max(1,Number.isFinite(width)?width:1)/Math.max(1,Number.isFinite(height)?height:1);
  const extent=inspection?4.3:3.7;
  return Math.max(extent,extent/aspect);
}
const BASE_YAW=-.46,BASE_POLAR=Math.PI/2-.14,RADIUS=12;
const finite=(n:number,fallback=0)=>Number.isFinite(n)?n:fallback;
type CameraPose={yaw:number;polar:number};
type OrbitOffset={yaw:number;polar:number};
type HeroView={elapsed:number;camera:CameraPose;orbit:OrbitOffset;pointer:{x:number;y:number};parallax:{x:number;y:number}};
export type LensInspectionMode="hero"|"cutaway";
export type LenusInspectionSnapshot={mode:LensInspectionMode;camera:CameraPose;orbit:OrbitOffset;pointer?:{x:number;y:number};parallax?:{x:number;y:number};hero:HeroView|null;controls:{explode:number;focus:number;currentExplode?:number;currentFocus?:number}};
export interface LenusSceneOptions{
  initialAnimationTime?:number;initialResolutionScale?:number;initialInspectionState?:LenusInspectionSnapshot;
  onFps?:(fps:number)=>void;onContextChange?:(state:"lost"|"restored")=>void;
  onInteractionChange?:(dragging:boolean)=>void;onPartChange?:(part:LenusPartInfo)=>void;
}

/** One renderer, one clock, and one owner for automatic/inspection transforms. */
export class LenusSceneController{
  private readonly scene=new THREE.Scene();
  private readonly camera=new THREE.OrthographicCamera(-3,3,3,-3,.1,60);
  private readonly raycaster=new THREE.Raycaster();
  private renderer:THREE.WebGLRenderer|null=null;
  private controls:OrbitControls|null=null;
  private environment:THREE.WebGLRenderTarget|null=null;
  private model:THREE.Group|null=null;
  private runtime:LensRuntime|null=null;
  private disposed=false;private running=false;private contextLost=false;private dragging=false;private placingCamera=false;
  private pointer={x:0,y:0};private parallax={x:0,y:0};private orbit:OrbitOffset={yaw:0,polar:0};
  private mode:LensInspectionMode="hero";private hero:HeroView|null=null;
  private explodeTarget=0;private explode=0;private focusTarget=0;private focus=0;
  private elapsed=0;private lastTime:number|null=null;private frames=0;private sampleTime=0;private slowTime=0;
  private resolutionScale=1;private viewport={width:1,height:1};
  constructor(private readonly options:LenusSceneOptions={}){
    this.elapsed=Math.max(0,finite(options.initialAnimationTime??0));
    this.resolutionScale=THREE.MathUtils.clamp(finite(options.initialResolutionScale??1,1),.75,1);
    const saved=options.initialInspectionState;
    if(saved){
      this.mode=saved.mode;this.hero=saved.hero?structuredClone(saved.hero):null;this.orbit={...saved.orbit};
      this.pointer={x:normalizePointer(saved.pointer?.x??0),y:normalizePointer(saved.pointer?.y??0)};
      this.parallax={x:finite(saved.parallax?.x??0),y:finite(saved.parallax?.y??0)};
      this.explodeTarget=THREE.MathUtils.clamp(finite(saved.controls.explode),0,1);
      this.focusTarget=THREE.MathUtils.clamp(finite(saved.controls.focus),-Math.PI/2,Math.PI/2);
      this.explode=THREE.MathUtils.clamp(finite(saved.controls.currentExplode??this.explodeTarget),0,1);
      this.focus=THREE.MathUtils.clamp(finite(saved.controls.currentFocus??this.focusTarget),-Math.PI/2,Math.PI/2);
      this.placeCamera(saved.camera.yaw,saved.camera.polar);
    }else{const view=this.automaticCamera();this.placeCamera(view.yaw,view.polar);}
  }
  init(container:HTMLElement){
    if(this.disposed||this.renderer)return;
    try{
      const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:"high-performance"});this.renderer=renderer;
      renderer.setClearColor(0x000000,0);renderer.outputColorSpace=THREE.SRGBColorSpace;
      renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1;
      const canvas=renderer.domElement;canvas.dataset.lenusRenderer="true";canvas.setAttribute("aria-hidden","true");
      canvas.addEventListener("webglcontextlost",this.onLost);canvas.addEventListener("webglcontextrestored",this.onRestored);
      container.appendChild(canvas);this.scene.background=null;
      this.environment=createStudioEnvironment(renderer,true);this.scene.environment=this.environment.texture;
      this.rebuildModel();this.scene.add(new THREE.HemisphereLight(0xe5eeff,0x282631,2));
      for(const [color,intensity,position]of [[0xffffff,3,[-3,5,4]],[0xdde4ff,1.4,[3,0,-4]],[0xD2F802,1.8,[-4,4,-.4]],[0xA855F7,1.5,[4,-3,-.4]]] as const){
        const light=new THREE.DirectionalLight(color,intensity);light.position.set(position[0],position[1],position[2]);this.scene.add(light);
      }
      this.configureControls(canvas);
      const bounds=container.getBoundingClientRect();this.resize(bounds.width,bounds.height);
    }catch(error){this.dispose();throw error;}
  }
  private rebuildModel(){
    if(this.model)this.scene.remove(this.model);this.runtime?.dispose();
    this.model=createOpticalLensModel(undefined,{pass:"optimization-pass",quality:"high"});
    this.runtime=this.model.userData.sculptRuntime as LensRuntime;this.scene.add(this.model);this.applyLoopPose();
  }
  private releaseControls(){
    this.controls?.removeEventListener("start",this.onDragStart);this.controls?.removeEventListener("end",this.onDragEnd);
    this.controls?.removeEventListener("change",this.onControlChange);this.controls?.dispose();this.controls=null;
  }
  private configureControls(canvas:HTMLCanvasElement){
    this.releaseControls();const controls=new OrbitControls(this.camera,canvas);this.controls=controls;
    controls.enableZoom=false;controls.enablePan=false;controls.enableDamping=false;controls.rotateSpeed=.5;
    controls.minPolarAngle=Math.PI*.2;controls.maxPolarAngle=Math.PI*.8;
    controls.addEventListener("start",this.onDragStart);controls.addEventListener("end",this.onDragEnd);controls.addEventListener("change",this.onControlChange);
    canvas.style.touchAction="pan-y pinch-zoom";
  }
  getRenderer(){return this.renderer;}
  getAnimationTime(){return this.elapsed;}
  getResolutionScale(){return this.resolutionScale;}
  getInspectionSnapshot():LenusInspectionSnapshot{
    const camera=this.cameraPose(),base=this.automaticCamera();
    // OrbitControls can be mid-drag, before onDragEnd commits its offset.
    const orbit=this.mode==="hero"?{yaw:camera.yaw-base.yaw,polar:camera.polar-base.polar}:{...this.orbit};
    return {mode:this.mode,camera,orbit,pointer:{...this.pointer},parallax:{...this.parallax},hero:this.hero?structuredClone(this.hero):null,controls:{explode:this.explodeTarget,focus:this.focusTarget,currentExplode:this.explode,currentFocus:this.focus}};
  }
  private cameraPose():CameraPose{const p=new THREE.Spherical().setFromVector3(this.camera.position);return {yaw:p.theta,polar:p.phi};}
  private automaticCamera():CameraPose{
    const blend=getLensTransformationPose(this.elapsed).cameraBlend;
    return {yaw:BASE_YAW+(LENS_INTERIOR_YAW-BASE_YAW)*blend,polar:BASE_POLAR};
  }
  private captureOrbit(){const view=this.cameraPose(),base=this.automaticCamera();this.orbit={yaw:view.yaw-base.yaw,polar:view.polar-base.polar};}
  setInspectionMode(mode:LensInspectionMode){
    if(this.disposed||mode===this.mode)return;
    if(mode==="cutaway"){
      if(this.dragging)this.captureOrbit();
      this.hero={elapsed:this.elapsed,camera:this.cameraPose(),orbit:{...this.orbit},pointer:{...this.pointer},parallax:{...this.parallax}};
      this.mode=mode;this.placeCamera(LENS_INTERIOR_YAW,BASE_POLAR);
    }else{
      this.mode="hero";
      if(this.hero){const saved=this.hero;this.elapsed=saved.elapsed;this.orbit={...saved.orbit};this.pointer={...saved.pointer};this.parallax={...saved.parallax};this.placeCamera(saved.camera.yaw,saved.camera.polar);}
      this.hero=null;
    }
    this.lastTime=null;this.applyLoopPose();this.resize(this.viewport.width,this.viewport.height);
  }
  inspectPart(id:string){
    const part=getPartTelemetry(id);
    if(isInteriorPart(id)||prefersRearView(id))this.setInspectionMode("cutaway");
    if(this.mode==="cutaway"){
      const panel=/^housing-panel-([0-3])$/.exec(id);
      if(panel){const i=Number(panel[1]);this.placeCamera(i===0||i===3?Math.PI/3:-Math.PI/3,Math.PI/2+(i<2?-.32:.32));}
      else this.placeCamera(prefersRearView(id)?Math.PI:LENS_INTERIOR_YAW,BASE_POLAR);
      this.render();
    }
    return part;
  }
  resize(width:number,height:number){
    if(this.disposed||!this.renderer)return;
    this.viewport={width:Math.max(1,finite(width,1)),height:Math.max(1,finite(height,1))};
    const aspect=this.viewport.width/this.viewport.height,h=fitHeroFrustumHalfHeight(width,height,this.mode==="cutaway");
    this.camera.left=-h*aspect;this.camera.right=h*aspect;this.camera.top=h;this.camera.bottom=-h;this.camera.updateProjectionMatrix();
    this.resizeBuffer();if(!this.contextLost)this.render();
  }
  private resizeBuffer(){
    if(!this.renderer||this.contextLost)return;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5)*this.resolutionScale);
    this.renderer.setSize(this.viewport.width,this.viewport.height,false);
  }
  setPointer(x:number,y:number){if(!this.disposed&&this.mode==="hero")this.pointer={x:normalizePointer(x),y:normalizePointer(y)};}
  setExplodeTarget(amount:number,reveal=true){
    if(this.disposed)return;
    if(reveal)this.setInspectionMode("cutaway");
    this.explodeTarget=THREE.MathUtils.clamp(finite(amount),0,1);
    if(!this.running){this.explode=this.explodeTarget;this.applyLoopPose();this.render();}
  }
  setFocusTarget(radians:number){
    if(this.disposed)return;this.focusTarget=THREE.MathUtils.clamp(finite(radians),-Math.PI/2,Math.PI/2);
    if(!this.running){this.focus=this.focusTarget;this.applyLoopPose();this.render();}
  }
  pickAtNormalizedCanvas(nx:number,ny:number){
    if(this.disposed||this.contextLost||!this.model||!this.runtime)return getPartTelemetry(null);
    this.scene.updateMatrixWorld(true);this.camera.updateMatrixWorld(true);
    this.raycaster.setFromCamera(new THREE.Vector2(normalizePointer(nx),normalizePointer(ny)),this.camera);
    const hit=this.raycaster.intersectObject(this.model,true)[0];const part=getPartTelemetry(this.runtime.pickPart(hit?.object??null)?.name??null);
    this.options.onPartChange?.(part);return part;
  }
  private placeCamera(yaw:number,polar:number){
    const angle=finite(yaw,BASE_YAW);
    this.camera.position.setFromSphericalCoords(RADIUS,THREE.MathUtils.clamp(finite(polar,BASE_POLAR),Math.PI*.2,Math.PI*.8),Math.atan2(Math.sin(angle),Math.cos(angle)));
    this.camera.lookAt(0,0,0);this.placingCamera=true;this.controls?.update();this.placingCamera=false;
  }
  rotateView(deltaYaw:number,deltaPitch:number){
    if(this.disposed||this.contextLost)return;const p=this.cameraPose();
    this.placeCamera(p.yaw+finite(deltaYaw),p.polar+finite(deltaPitch));if(this.mode==="hero")this.captureOrbit();this.render();
  }
  resetView(){
    if(this.disposed)return;
    this.mode="hero";this.hero=null;this.elapsed=0;this.lastTime=null;this.orbit={yaw:0,polar:0};
    this.pointer={x:0,y:0};this.parallax={x:0,y:0};this.explode=this.explodeTarget=0;this.focus=this.focusTarget=0;
    this.applyLoopPose();this.placeCamera(BASE_YAW,BASE_POLAR);this.resize(this.viewport.width,this.viewport.height);
  }
  start(){
    if(this.disposed||!this.renderer)return;this.running=true;this.lastTime=null;
    if(this.controls)this.controls.enabled=!this.contextLost;if(!this.contextLost)this.renderer.setAnimationLoop(this.tick);
  }
  stop(allowInteraction=false){
    this.running=false;this.lastTime=null;this.renderer?.setAnimationLoop(null);
    if(this.controls)this.controls.enabled=allowInteraction&&!this.contextLost;
  }
  private tick=(time:number)=>{
    if(!this.running||this.disposed||this.contextLost||!this.renderer||!this.model||!this.runtime)return;
    const realDelta=this.lastTime===null?0:Math.max(0,(time-this.lastTime)/1000),delta=Math.min(.1,realDelta);this.lastTime=time;
    if(!this.dragging&&this.mode==="hero")this.elapsed+=realDelta;
    const damp=1-Math.exp(-5*delta);this.explode+=(this.explodeTarget-this.explode)*damp;this.focus+=(this.focusTarget-this.focus)*damp;
    if(this.mode==="hero"){
      this.parallax.y+=((this.dragging?0:this.pointer.x*.14)-this.parallax.y)*damp;
      this.parallax.x+=((this.dragging?0:-this.pointer.y*.1)-this.parallax.x)*damp;
    }
    this.applyLoopPose();this.frames++;this.sampleTime+=realDelta;
    if(this.sampleTime>=1){
      const fps=this.frames/this.sampleTime;this.options.onFps?.(Math.round(fps));this.slowTime=fps<55?this.slowTime+this.sampleTime:0;
      if(this.slowTime>=2&&this.resolutionScale>.75){this.resolutionScale=Math.max(.75,this.resolutionScale*.85);this.resizeBuffer();this.slowTime=0;}
      this.frames=0;this.sampleTime=0;
    }
    this.render();
  };
  private applyLoopPose(){
    if(!this.model||!this.runtime)return;
    const seconds=this.mode==="cutaway"?12:this.elapsed,transform=getLensTransformationPose(seconds);
    const ambient=this.mode==="cutaway"?{spin:0,yaw:0,pitch:0,collar:0,shardOrbit:0,shardY:0}:getLensLoopPose(this.elapsed);
    this.runtime.setTransformationPose(transform);this.runtime.setExplode(this.mode==="cutaway"?this.explode:0);this.runtime.setFocusRing(this.focus);this.runtime.setAmbientPose(ambient);
    const parallax=this.mode==="hero"?transform.ambientWeight:0;
    this.model.rotation.set(ambient.pitch+this.parallax.x*parallax,ambient.yaw+this.parallax.y*parallax,ambient.spin);
    if(this.mode==="hero"&&!this.dragging){const view=this.automaticCamera();this.placeCamera(view.yaw+this.orbit.yaw,view.polar+this.orbit.polar);}
  }
  private render(){if(this.renderer&&!this.contextLost)this.renderer.render(this.scene,this.camera);}
  private onControlChange=()=>{if(!this.running&&!this.placingCamera)this.render();};
  private onDragStart=()=>{this.dragging=true;this.options.onInteractionChange?.(true);};
  private onDragEnd=()=>{if(this.mode==="hero")this.captureOrbit();this.dragging=false;this.options.onInteractionChange?.(false);};
  private onLost=(event:Event)=>{
    event.preventDefault();if(this.disposed)return;if(this.dragging&&this.mode==="hero")this.captureOrbit();this.dragging=false;
    this.contextLost=true;this.renderer?.setAnimationLoop(null);this.lastTime=null;if(this.controls)this.controls.enabled=false;
    this.options.onContextChange?.("lost");
  };
  private onRestored=()=>{
    if(this.disposed||!this.renderer)return;
    try{
      this.contextLost=false;this.environment?.dispose();this.environment=createStudioEnvironment(this.renderer,true);this.scene.environment=this.environment.texture;
      this.rebuildModel();this.configureControls(this.renderer.domElement);this.resizeBuffer();this.applyLoopPose();this.render();
      this.options.onContextChange?.("restored");if(this.running)this.start();
    }catch{this.contextLost=true;this.stop();this.options.onContextChange?.("lost");}
  };
  dispose(){
    if(this.disposed)return;this.stop();this.disposed=true;this.releaseControls();const renderer=this.renderer;
    if(renderer){
      renderer.domElement.removeEventListener("webglcontextlost",this.onLost);renderer.domElement.removeEventListener("webglcontextrestored",this.onRestored);
      this.runtime?.dispose();this.environment?.dispose();this.scene.clear();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();
    }
    this.renderer=null;this.runtime=null;this.model=null;this.environment=null;
  }
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/scene/telemetry.ts">
<![CDATA[import spec from "../model/lens-spec.json";
import { INTERIOR_IDS, OPTICAL_ORDER } from "../model/interiorLayout";

export type LenusPartInfo = { id: string; label: string; material: string; role: string };

const legacyParts: readonly LenusPartInfo[] = [
  { id:"front-lens", label:"EMERALD OBJECTIVE CORE", material:"DOPED FLUORITE / N=1.52", role:"Primary chromatic-dispersion singlet with internal 520nm fluorescence" },
  ...["outer-glass","inner-glass"].map((id,i)=>({id,label:i===0?"OUTER FLUTED GLASS":"INNER GLASS ANNULUS",material:"OPTICAL GLASS / N=1.52",role:"Fluted transmission surface with chromatic dispersion."})),
  ...["front-shell","collar-outer","collar-middle","collar-inner","rear-frame","rear-hub","rear-seat","rear-fins","rear-bridges","outer-screws","inner-screws"].map(id=>({id,label:id.replaceAll("-"," ").toUpperCase(),material:"BRUSHED TITANIUM",role:id.includes("collar")?"Concentric focus collar, independently addressable.":"Machined support in the optical assembly."})),
  {id:"rear-lens",label:"REAR OPTICAL ELEMENT",material:"COATED OPTICAL GLASS",role:"Rear-facing convex element and violet reflection coating."},
  {id:"gold-contacts",label:"GOLD CONTACT ARRAY",material:"GOLD ELECTRICAL CONTACTS",role:"Thirteen radial contact pads around the rear optical seat."},
  ...["retaining-beads","rear-beads"].map(id=>({id,label:id.replaceAll("-"," ").toUpperCase(),material:"POLISHED METAL",role:"Narrow concentric retaining edges."})),
  {id:"shards",label:"ORBITING GLASS PRISMS",material:"BEVELED OPTICAL GLASS",role:"Twelve independent faceted prisms orbit the objective."},
];
export function getSemanticPartCount(){return spec.components.length;}
const interior=new Set<string>([...INTERIOR_IDS,...OPTICAL_ORDER,"collar-inner"]);
const rearView=new Set(["rear-frame","rear-hub","rear-seat","rear-lens","rear-fins","rear-bridges","outer-screws","inner-screws","gold-contacts","rear-beads"]);
export function isInteriorPart(id:string){return interior.has(id);}
export function prefersRearView(id:string){return rearView.has(id);}
const roles:Record<string,string>={
  "front-shutter":"Four solid titanium petals seal the optical aperture, then fold out to expose the interior.",
  "core-carrier":"Recessed support around the emerald objective.",
  "spacer-stack":"Annular seats keep the optical groups separated.",
  "rear-baffles":"Rear stops keep the optical path clear.",
  "carrier-fasteners":"Radial fasteners secure the core carrier.",
  "core-retaining-beads":"Polished retaining edges around the recessed core.",
  "guide-rails":"Telescoping guides keep the optical carriages aligned.",
  "panel-linkages":"Paired support arms connect each housing panel to the rear frame.",
};
export const OPTICAL_PARTS:readonly LenusPartInfo[]=[
  {id:"assembly",label:"OPTICAL ASSEMBLY",material:`${getSemanticPartCount()} PARTS / PROCEDURAL OPTICS`,role:"Select a part to look a little closer."},
  ...spec.components.map(c=>legacyParts.find(p=>p.id===c.id)??{
    id:c.id,label:c.id.replaceAll("-"," ").toUpperCase(),
    material:c.material==="glass"?"OPTICAL GLASS / N=1.52":"BRUSHED TITANIUM",
    role:c.geometry.kind==="optical-element"?"Curved optical glass seated in its own retaining cell.":c.id.endsWith("-cell")?"Four titanium retainers hold the element on its guide carriage.":c.id.startsWith("housing-panel-")?"Articulated housing panel that opens to reveal the optical train.":roles[c.id]??"Machined support in the optical assembly.",
  }),
];
export function getPartTelemetry(id: string | null): LenusPartInfo {
  return OPTICAL_PARTS.find(p=>p.id===id) ?? OPTICAL_PARTS[0];
}
]]>
    </file>
  </files>
</template>
