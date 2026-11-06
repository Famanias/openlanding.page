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
import "./lenus/story/story.css";
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
.ln-part-label{width:100%;margin:0 0 4px;color:var(--color-ln-white);font-family:var(--font-ln-data);font-size:12px;line-height:20px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ln-part-material{margin:0;font-size:8px}.ln-part-description{font-size:10px;line-height:16px;color:var(--color-ln-muted);margin:4px 0 0;min-height:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ln-explode{display:inline-flex;gap:8px;align-items:center;background:none;border:0;padding:8px 0;color:var(--color-ln-lime);font-size:10px;font-weight:700;white-space:nowrap}
.ln-icon-button{border:0;border-radius:6px;padding:6px;background:transparent;color:var(--color-ln-muted);display:inline-flex;align-items:center;justify-content:center;transition:color var(--duration-ln-ui) var(--ease-ln-out),transform var(--duration-ln-ui) var(--ease-ln-out)}
.ln-playback{gap:4px}.ln-hud-sliders{grid-column:3;grid-row:1 / 3;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:0;min-width:0}.ln-hud-sliders label{display:block;font-size:8px;min-width:0}.ln-transformation-control{grid-column:1 / -1}
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
]]>
    </file>
    <file path="src/app/(lenus)/lenus/LenusApp.tsx">
<![CDATA["use client";
import {useCallback,useEffect,useRef,useState,type MouseEvent} from "react";
import Link from "next/link";
import {ArrowRight,ArrowUpRight,X} from "lucide-react";
import LenusHeader,{type LenusDialogSection} from "./components/LenusHeader";
import LenusHeroCopy from "./components/LenusHeroCopy";
import LenusOpticalLensCanvas from "./components/LenusOpticalLensCanvas";
import {ProjectBriefForm} from "./forms/ProjectBriefForm";
import {useHorizontalStory,type StorySample} from "./story/useHorizontalStory";
import {CHAPTERS,chapterWeight,smooth,type ChapterId} from "./story/storyMath";
import {sampleStoryPose,type EngineStoryPose} from "./story/chapterPoseMap";
import type {EngineExperienceApi,StoryNavigation} from "./story/experienceTypes";
import WorkGallery,{WORK_STUDIES,type GalleryApi} from "./story/WorkGallery";
import ExpertiseAnnotations,{type AnnotationsApi} from "./story/ExpertiseAnnotations";
import {CAPABILITIES,type NarrativeRenderFrame} from "./story/projectedAnchors";

export default function LenusApp(){
  const shell=useRef<HTMLElement>(null),pin=useRef<HTMLDivElement>(null),track=useRef<HTMLDivElement>(null),hero=useRef<HTMLDivElement>(null);
  const engine=useRef<EngineExperienceApi|null>(null),navigation=useRef<StoryNavigation|null>(null),gallery=useRef<GalleryApi|null>(null),annotations=useRef<AnnotationsApi|null>(null);
  const activeIndex=useRef(0),mode=useRef({horizontal:false,reduced:false}),sample=useRef<StorySample|null>(null);
  const [active,setActive]=useState(0),[horizontal,setHorizontal]=useState(false),[reduced,setReduced]=useState(false),[enhanced,setEnhanced]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false),[dialogContent,setDialogContent]=useState<"contact"|number|null>(null);
  const [controlsMount,setControlsMount]=useState<HTMLDivElement|null>(null);const hasRendered=useRef(false);
  const dialog=useRef<HTMLDialogElement>(null),opener=useRef<HTMLElement|null>(null);
  const applyVisual=useCallback((position:number,pose:EngineStoryPose,manual=false)=>{
    const root=pin.current;if(!root)return;
    root.style.setProperty("--ln-engine-x",`${pose.x*100}%`);root.style.setProperty("--ln-engine-y",`${pose.y*100}%`);
    root.style.setProperty("--ln-engine-scale",String(pose.scale));
    root.style.setProperty("--ln-violet-strength",`${Math.min(28,pose.violet*14)}%`);
    const atmosphere=document.querySelector<HTMLElement>(".ln-space");
    atmosphere?.style.setProperty("--ln-glow-x",`${pose.x*100+7}%`);atmosphere?.style.setProperty("--ln-glow-y",`${pose.y*100+27}%`);
    atmosphere?.style.setProperty("--ln-violet-strength",`${Math.min(28,pose.violet*14)}%`);
    atmosphere?.style.setProperty("--ln-orbit-turn",`${position*9}deg`);
    const weight=Math.max(chapterWeight(position,0,.72),chapterWeight(position,4,.7),manual?1:0);
    root.style.setProperty("--ln-hud-weight",String(weight));
    const drawer=root.querySelector<HTMLElement>(".ln-controls-drawer");if(drawer)drawer.inert=weight<.25&&drawer.dataset.open!=="true";
  },[]);
  const onFrame=useCallback((frame:NarrativeRenderFrame)=>{
    hasRendered.current=true;applyVisual(frame.position,frame.pose,frame.manual);annotations.current?.update(frame);
    const stage=pin.current?.querySelector<HTMLElement>(".ln-stage");
    if(stage){stage.dataset.storyPosition=String(frame.position);stage.dataset.modelDeployment=String(frame.pose.deployment);}
  },[applyVisual]);
  const onSample=useCallback((value:StorySample)=>{
    sample.current=value;gallery.current?.setPosition(value.position,value.workProgress??0);
    if(value.active!==activeIndex.current){if(activeIndex.current===3||activeIndex.current===4)engine.current?.focusPart(null);activeIndex.current=value.active;setActive(value.active);}
    pin.current?.style.setProperty("--ln-story-progress",String(value.progress));
    const pose=sampleStoryPose(value);
    if(mode.current.reduced){pose.x=value.compact?.5:.76;pose.y=.28;pose.scale=value.hero.scale*.7;}
    if(!hasRendered.current||mode.current.reduced)applyVisual(value.position,pose);
    const content=track.current;if(!content)return;
    const work=content.querySelector<HTMLElement>(".ln-work-content");if(work)work.style.transform=value.horizontal?`translate3d(${Math.max(0,Math.min(value.workOverflow,value.workOffset))}px,0,0)`:"none";
    content.querySelectorAll<HTMLElement>("[data-chapter]").forEach((el,i)=>{el.inert=value.horizontal&&i!==value.active;});
    const heroLines=content.querySelectorAll<HTMLElement>("#ln-hero .ln-headline-line");
    heroLines.forEach((el,i)=>{el.style.transform=value.horizontal?`translate3d(${-smooth(value.position)*(70+i*90)}px,0,0) skewX(${-smooth(value.position)*(i+1)*2}deg)`:"none";});
    const manifesto=content.querySelectorAll<HTMLElement>("[data-manifesto-line]");
    manifesto.forEach((el,i)=>{const p=value.position-1;el.style.transform=value.horizontal?`translate3d(${p*(i%2?120:-90)}px,0,0) rotateY(${p*(i%2?-6:6)}deg)`:"none";});
    content.querySelectorAll<HTMLElement>("[data-studio-line]").forEach((el,i)=>{const p=value.position-5;el.style.transform=value.horizontal?`translate3d(${p*(i?100:-80)}px,0,0) rotateY(${p*(i?-4:4)}deg)`:"none";});
  },[applyVisual]);
  const onMode=useCallback((h:boolean,r:boolean)=>{mode.current={horizontal:h,reduced:r};setHorizontal(h);setReduced(r);setEnhanced(true);},[]);
  useHorizontalStory({shell,pin,track,hero,engine,navigation,onSample,onMode});
  const menuChange=useCallback((open:boolean)=>setMenuOpen(open),[]);
  useEffect(()=>{navigation.current?.suspend(dialogContent!==null||menuOpen);},[dialogContent,menuOpen]);
  useEffect(()=>{
    const element=dialog.current;if(dialogContent===null||!element)return;
    const overflow=document.body.style.overflow;element.showModal();document.body.style.overflow="hidden";
    return()=>{element.close();document.body.style.overflow=overflow;opener.current?.focus({preventScroll:true});};
  },[dialogContent]);
  const navigate=(id:ChapterId)=>{if(navigation.current)navigation.current.chapter(id);else document.getElementById(`ln-${id}`)?.scrollIntoView();};
  const headerNavigate=(section:Exclude<LenusDialogSection,null>)=>navigate(section==="about"?"studio":section as ChapterId);
  const openDialog=(value:"contact"|number)=>{opener.current=document.activeElement instanceof HTMLElement?document.activeElement:null;setDialogContent(value);};
  const closeDialog=()=>setDialogContent(null);
  const backdrop=(event:MouseEvent<HTMLDialogElement>)=>{
    if(event.target!==event.currentTarget)return;const r=event.currentTarget.getBoundingClientRect();
    if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog();
  };
  const footer=()=>{history.pushState({...history.state},"","#ln-footer");navigation.current?.footer();};
  const study=typeof dialogContent==="number"?WORK_STUDIES[dialogContent]:null;
  return <div className="ln-experience ln-narrative" id="top" data-reduced={reduced}>
    <a className="ln-skip" href="#ln-main">Skip to content</a>
    <div className="ln-space" aria-hidden="true"/>
    <LenusHeader onNavigate={headerNavigate} active={active} onMenuChange={menuChange}/>
    <main ref={shell} id="ln-main" className="ln-story-shell" data-story-mode={horizontal?"horizontal":"vertical"}>
      <div ref={pin} className="ln-story-pin">
        <div className="ln-scene-layer">
          <LenusOpticalLensCanvas experienceRef={engine} controlsMount={controlsMount} onNarrativeFrame={onFrame} suspended={dialogContent!==null||menuOpen}/>
        </div>
        <ExpertiseAnnotations ref={annotations} active={active} onFocus={id=>engine.current?.focusPart(id)} onInspect={id=>engine.current?.inspectPart(id)}/>
        <div className="ln-controls-mount" ref={setControlsMount}/>
        <div className="ln-navigation-layer"><nav className="ln-chapter-navigation" aria-label="Chapter navigation">
          <p aria-live="polite" aria-atomic="true"><span>{String(active+1).padStart(2,"0")} / 07</span> {CHAPTERS[active].label}</p>
          <div className="ln-chapter-dots">{CHAPTERS.map((item,i)=><a href={`#ln-${item.id}`} aria-label={`Go to ${item.label}`} aria-current={active===i?"step":undefined} key={item.id} onClick={event=>{event.preventDefault();navigate(item.id);}}><span/></a>)}</div>
          <span className="ln-global-progress" aria-hidden="true"><i/></span>
          <span className="ln-chapter-key-hint">SCROLL / ← → CHAPTERS</span>
          <a className="ln-skip-experience" href="#ln-footer" onClick={event=>{event.preventDefault();footer();}}>SKIP EXPERIENCE <ArrowRight size={12} aria-hidden="true"/></a>
        </nav></div>
        <div className="ln-horizontal-viewport"><div ref={track} className="ln-horizontal-track">
          <section id="ln-hero" data-chapter="hero" className="ln-chapter ln-hero" aria-label="Reality">
            <LenusHeroCopy onStepInside={()=>{engine.current?.activate();navigate("manifesto");}}/>
            <div ref={hero} className="ln-stage-slot ln-engine-reference" aria-hidden="true"/>
          </section>
          <section id="ln-manifesto" data-chapter="manifesto" className="ln-chapter ln-manifesto" aria-labelledby="ln-manifesto-title">
            <div className="ln-story-content ln-manifesto-copy"><span className="ln-story-eyebrow">01 / A DIFFERENT WAY TO SEE</span>
              <h2 id="ln-manifesto-title" tabIndex={-1} aria-label="WE DON'T FOLLOW REALITY. WE REDEFINE IT."><span data-manifesto-line>WE DON’T FOLLOW</span><span data-manifesto-line>REALITY.</span><span data-manifesto-line className="ln-phrase-lime">WE REDEFINE IT.</span></h2>
              <p>Unexpected ideas deserve to become working experiences. We bring creative direction, design and technology into the same room.</p>
              <span className="ln-story-coordinate" aria-hidden="true">POSSIBILITY → REALIZATION</span>
            </div>
          </section>
          <section id="ln-work" data-chapter="work" className="ln-chapter ln-work" aria-labelledby="ln-work-title">
            <div className="ln-story-content ln-work-content"><span className="ln-story-eyebrow">02 / SELECTED DIRECTIONS</span><h2 id="ln-work-title" tabIndex={-1}>EXPERIENCES<br/><span className="ln-phrase-violet">BEYOND EXPECTED.</span></h2>
              <WorkGallery ref={gallery} motion={enhanced&&!reduced} suspended={dialogContent!==null||menuOpen} onOpen={index=>openDialog(index)} onAim={value=>engine.current?.setWorkProgress(value)}/>
            </div>
          </section>
          <section id="ln-expertise" data-chapter="expertise" className="ln-chapter ln-expertise" aria-labelledby="ln-expertise-title">
            <div className="ln-story-content ln-expertise-copy"><span className="ln-story-eyebrow">03 / CONNECTED CAPABILITIES</span><h2 id="ln-expertise-title" tabIndex={-1}>WHAT WE MAKE<br/><span className="ln-phrase-lime">POSSIBLE.</span></h2><p>One idea. Many disciplines.<br/>Every part working together.</p>
              <div className="ln-capability-list">{CAPABILITIES.map((item,i)=><details key={item.id} onToggle={event=>engine.current?.focusPart(event.currentTarget.open?item.part:null)}><summary><span>0{i+1}</span>{item.name}</summary><p>{item.description}</p></details>)}</div>
            </div>
          </section>
          <section id="ln-technology" data-chapter="technology" className="ln-chapter ln-technology" aria-labelledby="ln-technology-title">
            <div className="ln-story-content ln-technology-copy"><span className="ln-story-eyebrow">04 / THE OPTICAL LABORATORY</span><h2 id="ln-technology-title" tabIndex={-1}>INSIDE<br/><span className="ln-phrase-violet">THE ENGINE.</span></h2><p>This is the real thing. Rotate the lens, separate the assembly and bring its inner workings into focus.</p>
              <button type="button" className="ln-text-button" onClick={()=>engine.current?.openControls()}>TAKE THE CONTROLS <ArrowUpRight size={18} aria-hidden="true"/></button>
              <p className="ln-lab-note">Drag to rotate. Use the sliders to transform.<br/>Scroll on when you’re ready.</p>
            </div>
          </section>
          <section id="ln-studio" data-chapter="studio" className="ln-chapter ln-studio" aria-labelledby="ln-studio-title">
            <div className="ln-story-content ln-studio-copy"><span className="ln-story-eyebrow">05 / HOW WE SEE THINGS</span><h2 id="ln-studio-title" tabIndex={-1} aria-label="INDEPENDENT MINDS. SHARED POSSIBILITIES."><span data-studio-line>INDEPENDENT<br/>MINDS.</span><span data-studio-line className="ln-phrase-violet">SHARED<br/>POSSIBILITIES.</span></h2><p>Curious by nature. Open to the unexpected.<br/>An independent studio working where design and technology meet.</p></div>
          </section>
          <section id="ln-contact" data-chapter="contact" className="ln-chapter ln-contact" aria-labelledby="ln-contact-title">
            <div className="ln-story-content ln-contact-copy"><span className="ln-story-eyebrow">06 / YOUR NEXT POSSIBILITY</span><h2 id="ln-contact-title" tabIndex={-1}>LET’S MAKE<br/><span className="ln-phrase-lime">WHAT’S NEXT.</span></h2><p>A question, an ambition, a different point of view.<br/>Let’s give it a place to start.</p><button type="button" className="ln-button" aria-haspopup="dialog" onClick={()=>openDialog("contact")}>GET IN TOUCH <ArrowUpRight size={22} aria-hidden="true"/></button></div>
            <div className="ln-contact-thread" aria-hidden="true"><span>CONTINUE THE CONVERSATION</span><i/></div>
          </section>
        </div></div>
      </div>
    </main>
    <footer className="ln-native-footer" id="ln-footer">
      <div className="ln-footer-lead"><span className="ln-story-eyebrow">THE EXPECTED IS ONLY THE BEGINNING.</span><h2 tabIndex={-1}>A NEW CHAPTER<br/><span className="ln-phrase-violet">STARTS WITH YOU.</span></h2><button type="button" className="ln-button" aria-haspopup="dialog" onClick={()=>openDialog("contact")}>PREPARE A PROJECT BRIEF <ArrowUpRight size={20} aria-hidden="true"/></button><p>Prepared on your device. Nothing is sent from this demo.</p></div>
      <div className="ln-footer-navigation"><a href="#ln-hero" className="ln-footer-brand" onClick={event=>{event.preventDefault();navigate("hero");}}>LENUS</a><nav aria-label="Footer navigation">{(["work","expertise","technology","studio","contact"] as ChapterId[]).map(id=><a key={id} href={`#ln-${id}`} onClick={event=>{event.preventDefault();navigate(id);}}>{id==="studio"?"ABOUT":id.toUpperCase()}</a>)}</nav><a href="#ln-hero" className="ln-text-button" onClick={event=>{event.preventDefault();navigate("hero");}}>BACK TO BEGINNING ↑</a></div>
      <div className="ln-footer-meta"><span>INDEPENDENT MINDS. SHARED POSSIBILITIES.</span><Link href="/">EXPLORE THE GALLERY <ArrowUpRight size={12} aria-hidden="true"/></Link></div>
    </footer>
    <dialog ref={dialog} className="ln-dialog" aria-labelledby="ln-dialog-title" onCancel={event=>{event.preventDefault();closeDialog();}} onClick={backdrop}>
      <button type="button" className="ln-dialog-close ln-icon-button" aria-label="Close panel" onClick={closeDialog}><X size={22} aria-hidden="true"/></button>
      <div className="ln-dialog-content"><span className="ln-dialog-eyebrow">{dialogContent==="contact"?"LET'S MAKE SOMETHING MATTER.":"CONCEPT STUDY / LIVE EXHIBITION"}</span><h2 id="ln-dialog-title">{dialogContent==="contact"?"What's your next possibility?":study?.name}</h2>{dialogContent==="contact"?<ProjectBriefForm/>:study&&<><p className="ln-dialog-intro">{study.description}</p><p>This conceptual exploration was created for this exhibition. It is not presented as commissioned client work.</p><button type="button" className="ln-text-button" onClick={closeDialog}>BACK TO THE EXPERIENCE <ArrowUpRight size={18} aria-hidden="true"/></button></>}</div>
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
export type LenusDialogSection="hero"|"work"|"expertise"|"technology"|"about"|"contact"|null;
const sections=["work","expertise","technology","about"] as const;

export default function LenusHeader({onNavigate,active=0,onMenuChange}:{onNavigate:(section:Exclude<LenusDialogSection,null>)=>void;active?:number;onMenuChange?:(open:boolean)=>void}){
  const [open,setOpen]=useState(false);
  const header=useRef<HTMLElement>(null),toggle=useRef<HTMLButtonElement>(null);
  useEffect(()=>{onMenuChange?.(open);},[open,onMenuChange]);
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
    <a href="#ln-hero" className="ln-wordmark" aria-label="LENUS home" onClick={event=>{event.preventDefault();navigate("hero");}}>
      <span className="ln-sr-only">LENUS</span>
      <svg viewBox="0 0 171 26" aria-hidden="true"><path d="M2 2V24H28M36 3H62M36 13H59M36 23H62M72 24V3L99 23V2M110 2V17Q110 24 119 24H125Q134 24 134 17V2M169 3H149Q143 3 143 8Q143 13 149 13H162Q168 13 168 18Q168 23 162 23H142" fill="none" stroke="currentColor" strokeWidth="3.8" strokeLinejoin="round"/></svg>
    </a>
    <nav className="ln-desktop-nav" aria-label="Main navigation">{sections.map((section,i)=><a key={section} href={`#ln-${section==="about"?"studio":section}`} aria-current={active===[2,3,4,5][i]?"location":undefined} onClick={event=>{event.preventDefault();navigate(section);}}>{section.toUpperCase()}</a>)}</nav>
    <a className="ln-button ln-contact-cta" href="#ln-contact" onClick={event=>{event.preventDefault();navigate("contact");}}>GET IN TOUCH</a>
    <button ref={toggle} type="button" className="ln-menu-toggle" aria-label="Toggle navigation" aria-expanded={open} aria-controls="ln-mobile-menu" onClick={()=>setOpen(value=>!value)}>{open?<X aria-hidden="true"/>:<Menu aria-hidden="true"/>}</button>
    <nav id="ln-mobile-menu" className="ln-mobile-menu" hidden={!open} aria-label="Mobile navigation">{[...sections,"contact" as const].map((section,i)=><a key={section} href={`#ln-${section==="about"?"studio":section}`} onClick={event=>{event.preventDefault();navigate(section);toggle.current?.focus();}}><span>0{i+1}</span>{section==="contact"?"GET IN TOUCH":section.toUpperCase()}</a>)}</nav>
  </header>;
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/components/LenusHeroCopy.tsx">
<![CDATA[import { ArrowRight } from "lucide-react";
export default function LenusHeroCopy({onStepInside}:{onStepInside:()=>void}){
  return <div className="ln-hero-copy">
    <h1 aria-label="REALITY IS JUST THE START." tabIndex={-1}>
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
import type { LenusPartInfo } from "../scene/telemetry";

export type LenusStageState="preview"|"running"|"paused"|"static"|"unavailable"|"lost";
type Props={
  state:LenusStageState; fps:number; exploded:boolean; explodeAmount:number; focusAngle:number; activePart:LenusPartInfo; paused:boolean;
  onToggleExplode:()=>void; onExplodeChange:(value:number)=>void; onFocusChange:(radians:number)=>void;
  onResetView:()=>void; onTogglePause:()=>void;
  cutaway?:boolean;onToggleCutaway?:()=>void;
  transformation?:number;onTransformationChange?:(value:number)=>void;
  onControlGesture?:(active:boolean)=>void;
};
export function LenusHudControls(p:Props){
  const disabled=!["running","paused"].includes(p.state);
  const status=p.state==="running"?`${p.fps || "—"} FPS`:({preview:"PREVIEW",static:"STILL MODE",unavailable:"STATIC PREVIEW",lost:"RECONNECTING",paused:"PAUSED"}[p.state]);
  return <aside className="ln-hud" aria-label="Optical lens controls">
    <div className="ln-hud-top"><span className="ln-micro">OPTICAL ENGINE / 01</span><span className="ln-status" data-live={p.state==="running"}><i aria-hidden="true"/>{status}</span></div>
    <div className="ln-part-readout">
      <p className="ln-part-label">{p.activePart.label}</p>
      <p className="ln-part-material">{p.activePart.material}</p>
      <p className="ln-part-description" title={p.activePart.role}>{p.activePart.role}</p>
    </div>
    <div className="ln-hud-actions">
      <button type="button" className="ln-explode" aria-pressed={p.exploded} onClick={p.onToggleExplode} disabled={disabled}><Layers size={14} aria-hidden="true"/>EXPLODE ASSEMBLY</button>
      <div className="ln-playback"><button type="button" className="ln-icon-button" aria-label={p.cutaway?"Return to automatic hero view":"Inspect lens interior"} title="Inspect interior (C)" aria-pressed={!!p.cutaway} onClick={p.onToggleCutaway}><ScanLine size={15} aria-hidden="true"/></button><button type="button" className="ln-icon-button" aria-label="Reset optical view" title="Reset view (R)" onClick={p.onResetView} disabled={disabled}><RotateCcw size={15} aria-hidden="true"/></button><button type="button" className="ln-icon-button" aria-label={p.paused?"Play animation":"Pause animation"} onClick={p.onTogglePause} disabled={disabled}>{p.paused?<Play size={15} aria-hidden="true"/>:<Pause size={15} aria-hidden="true"/>}</button></div>
    </div>
    <div className="ln-hud-sliders" onPointerDown={()=>p.onControlGesture?.(true)} onKeyDown={event=>{if(["ArrowLeft","ArrowRight","ArrowUp","ArrowDown","Home","End","PageUp","PageDown"].includes(event.key))p.onControlGesture?.(true);}} onKeyUp={()=>p.onControlGesture?.(false)}>
      <label className="ln-transformation-control"><span>TRANSFORMATION <output>{Math.round((p.transformation??0)*100)}%</output></span><input type="range" min="0" max="100" step="1" value={Math.round((p.transformation??0)*100)} aria-label="Lens transformation" aria-valuetext={`${Math.round((p.transformation??0)*100)}% transformed`} title="0: fully closed. 100: fully transformed. Play resumes the loop." disabled={disabled} onChange={e=>p.onTransformationChange?.(Number(e.target.value)/100)}/></label>
      <label><span>SEPARATION <output>{Math.round(p.explodeAmount*100)}%</output></span><input type="range" min="0" max="1" step=".01" value={p.explodeAmount} aria-label="Explode optical assembly" disabled={disabled} onChange={e=>p.onExplodeChange(Number(e.target.value))}/></label>
      <label><span>FOCUS <output>{Math.round(p.focusAngle*180/Math.PI)}°</output></span><input type="range" min="-1.57" max="1.57" step=".01" value={p.focusAngle} aria-label="Focus ring rotation" disabled={disabled} onChange={e=>p.onFocusChange(Number(e.target.value))}/></label>
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

import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent, type RefObject } from "react";
import type { LenusSceneController, LenusInspectionSnapshot } from "../scene/LenusSceneController";
import { getPartTelemetry, getSemanticPartCount, isInteriorPart, prefersRearView } from "../scene/telemetry";
import LenusLensFallback from "./LenusLensFallback";
import { LenusHudControls, type LenusStageState } from "./LenusHudControls";
import {createPortal} from "react-dom";
import type {EngineExperienceApi} from "../story/experienceTypes";
import type {StoryInput} from "../story/chapterPoseMap";
import type {NarrativeRenderFrame} from "../story/projectedAnchors";

export default function LenusOpticalLensCanvas({suspended=false,externalExplodeRequest=0,experienceRef,onNarrativeFrame,controlsMount}:{suspended?:boolean;externalExplodeRequest?:number;experienceRef?:RefObject<EngineExperienceApi|null>;onNarrativeFrame?:(frame:NarrativeRenderFrame)=>void;controlsMount?:HTMLDivElement|null}){
  const host=useRef<HTMLDivElement>(null);
  const controller=useRef<LenusSceneController|null>(null);
  const synchronize=useRef<()=>void>(()=>{});
  const activate=useRef<()=>void>(()=>{});
  const pose=useRef<{explode:number;focus:number;transformation:number|null}>({explode:0,focus:0,transformation:null});
  const animationTime=useRef(0);
  const resolutionScale=useRef(1);
  const inspectionState=useRef<LenusInspectionSnapshot|null>(null);
  const cutawayValue=useRef(false);
  const narrative=useRef<StoryInput|null>(null),reduced=useRef(false);
  const manualWorkProgress=useRef<number|null>(null);
  const [controlsOpen,setControlsOpen]=useState(false);
  const policy=useRef({suspended,paused:false});
  const [state,setState]=useState<LenusStageState>("preview");
  const [fps,setFps]=useState(0);
  const [paused,setPaused]=useState(false);
  const [explodeAmount,setExplodeAmount]=useState(0);
  const [focusAngle,setFocusAngle]=useState(0);
  const [transformation,setTransformation]=useState(0);
  const [transformationMoving,setTransformationMoving]=useState(false);
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
      if(media.matches){c.setPresentationSuspended(true);c.stop(false);setState("static");return;}
      const visible=inView&&document.visibilityState!=="hidden"&&!policy.current.suspended&&!lost;
      c.setPresentationSuspended(!visible);
      const shouldRun=visible&&!policy.current.paused;
      if(shouldRun)c.start();else c.stop(policy.current.paused&&inView&&document.visibilityState!=="hidden"&&!policy.current.suspended&&!lost);
      setState(lost?"lost":shouldRun?"running":"paused");
    };
    synchronize.current=sync;
    const boot=async()=>{
      reduced.current=media.matches;
      if(controller.current){sync();return;}
      const ticket=++revision;
      lost=false;
      if(media.matches){setActivationNeeded(false);setState("static");return;}
      if(!experienceRef&&!activated&&(window.matchMedia("(pointer: coarse)").matches||window.innerWidth<700)){
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
          onTransformationChange:(progress,target,settled)=>{if(active&&ticket===revision){pose.current.transformation=target;setTransformationMoving(!settled);if(target!==null&&pose.current.explode!==0){pose.current.explode=0;setExplodeAmount(0);}const value=target??progress;setTransformation(current=>Math.round(current*100)===Math.round(value*100)?current:value);}},
          onNarrativeFrame:frame=>{
            if(!active||ticket!==revision)return;
            if(!frame.manual){pose.current.explode=frame.pose.separation;pose.current.focus=frame.pose.focus;setExplodeAmount(v=>Math.round(v*100)===Math.round(frame.pose.separation*100)?v:frame.pose.separation);setFocusAngle(v=>Math.round(v*100)===Math.round(frame.pose.focus*100)?v:frame.pose.focus);}
            if(cutawayValue.current!==frame.inspection){cutawayValue.current=frame.inspection;setCutaway(frame.inspection);if(!frame.inspection){setLocked(false);setActivePart(getPartTelemetry(null));}}
            if(!frame.manual&&frame.position>.9&&Math.abs(frame.position-4)>.8)setControlsOpen(false);
            onNarrativeFrame?.(frame);
          },
        });
        controller.current=instance;
        const requestedTransformation=pose.current.transformation;
        if(narrative.current)instance.setNarrativeFrame(narrative.current);
        instance.init(container);
        // Commands can arrive before this import resolves or survive a preference change.
        if(!experienceRef){
          if(!inspectionState.current||inspectionState.current.controls.explode!==pose.current.explode)instance.setExplodeTarget(pose.current.explode,false);
          if(!inspectionState.current||inspectionState.current.controls.focus!==pose.current.focus)instance.setFocusTarget(pose.current.focus);
          instance.setInspectionMode(cutawayValue.current?"cutaway":"hero");
          if(requestedTransformation!==null&&requestedTransformation!==inspectionState.current?.transformation?.target)instance.setTransformationTarget(requestedTransformation);
        }
        sync();
      } catch {
        if(active&&ticket===revision){controller.current?.dispose();controller.current=null;setState("unavailable");}
      }
    };
    activate.current=()=>{activated=true;void boot();};
    if(experienceRef)experienceRef.current={
      setNarrativeFrame:input=>{if(input.position<1.65||input.position>3.05)manualWorkProgress.current=null;const frame=manualWorkProgress.current===null?input:{...input,workProgress:manualWorkProgress.current};narrative.current=frame;controller.current?.setNarrativeFrame(frame);},
      focusPart:id=>controller.current?.focusPart(id),inspectPart:id=>{const part=getPartTelemetry(id);cutawayValue.current=true;setCutaway(true);controller.current?.inspectPart(id);setLocked(id!=="assembly");setActivePart(part);setControlsOpen(true);},
      releaseInteraction:()=>controller.current?.releaseInteraction(),activate:()=>activate.current(),openControls:()=>{setControlsOpen(true);activate.current();},
      setWorkProgress:progress=>{if(manualWorkProgress.current===progress)return;manualWorkProgress.current=progress;if(narrative.current&&progress!==null){narrative.current={...narrative.current,workProgress:progress};controller.current?.setNarrativeFrame(narrative.current);}},
    };
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
    const endControlGesture=()=>controller.current?.setControlGesture(false);
    window.addEventListener("pointerup",endControlGesture);window.addEventListener("pointercancel",endControlGesture);window.addEventListener("blur",endControlGesture);
    // The SVG and copy paint first; reduced motion never imports the rendering engine.
    const idle="requestIdleCallback" in window;
    const timer=idle?window.requestIdleCallback(()=>{void boot();},{timeout:1500}):window.setTimeout(()=>{void boot();},0);
    return()=>{
      active=false;revision++;if(idle)window.cancelIdleCallback(timer);else window.clearTimeout(timer);resize.disconnect();intersection.disconnect();
      media.removeEventListener("change",onPreference);document.removeEventListener("visibilitychange",sync);
      window.removeEventListener("pointerup",endControlGesture);window.removeEventListener("pointercancel",endControlGesture);window.removeEventListener("blur",endControlGesture);
      synchronize.current=()=>{};activate.current=()=>{};controller.current?.dispose();controller.current=null;
      if(experienceRef)experienceRef.current=null;
    };
  },[experienceRef,onNarrativeFrame]);

  useEffect(()=>{
    if(externalExplodeRequest>0){cutawayValue.current=true;setCutaway(true);pose.current.explode=1;setExplodeAmount(1);controller.current?.setInspectionMode("cutaway");controller.current?.setExplodeTarget(1);activate.current();}
  },[externalExplodeRequest]);

  const changeInspection=(value:boolean)=>{cutawayValue.current=value;setCutaway(value);controller.current?.setInspectionMode(value?"cutaway":"hero");if(!value){setLocked(false);setActivePart(getPartTelemetry(null));}};
  const changeExplode=(value:number)=>{if(!cutawayValue.current)changeInspection(true);pose.current.explode=value;setExplodeAmount(value);controller.current?.setExplodeTarget(value);};
  const changeFocus=(value:number)=>{pose.current.focus=value;setFocusAngle(value);controller.current?.setFocusTarget(value);};
  const changeTransformation=(value:number)=>{
    pose.current.transformation=value;pose.current.explode=0;cutawayValue.current=false;setCutaway(false);setExplodeAmount(0);setTransformation(value);setLocked(false);setActivePart(getPartTelemetry(null));
    controller.current?.setTransformationTarget(value);policy.current.paused=true;setPaused(true);synchronize.current();
  };
  const togglePause=()=>{if(paused)controller.current?.resumeTransformationLoop();setPaused(value=>!value);};
  const reset=()=>{pose.current={explode:0,focus:0,transformation:null};animationTime.current=0;inspectionState.current=null;cutawayValue.current=false;setCutaway(false);setTransformation(0);setExplodeAmount(0);setFocusAngle(0);setLocked(false);setActivePart(getPartTelemetry(null));controller.current?.resetView();};
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
    const actions:Record<string,()=>void>={ArrowLeft:()=>controller.current?.rotateView(-.12,0),ArrowRight:()=>controller.current?.rotateView(.12,0),ArrowUp:()=>controller.current?.rotateView(0,-.1),ArrowDown:()=>controller.current?.rotateView(0,.1),e:toggleExplode,E:toggleExplode,r:reset,R:reset,Home:reset,Escape:()=>{setLocked(false);setActivePart(getPartTelemetry(null));controller.current?.releaseInteraction();}};
    if(actions[event.key]){event.preventDefault();actions[event.key]();}
  };
  const message:Record<LenusStageState,string>={preview:activationNeeded?"Tap the lens to explore in 3D.":"Optical preview. Interactive controls load when available.",running:"Drag to explore. Select a fragment to inspect.",paused:suspended?"Optical view paused while the panel is open.":pose.current.transformation!==null?"Manual transformation. Play resumes the loop.":"Optical view paused.",static:"Reduced motion is on. Showing a still optical preview.",unavailable:"Interactive graphics are unavailable. Showing a still optical preview.",lost:"Graphics connection lost. Showing the preview while reconnecting."};
  const controls=<div className="ln-controls-drawer" data-open={controlsOpen}>
    {experienceRef&&<button type="button" className="ln-drawer-toggle" aria-expanded={controlsOpen} aria-controls={`${instructions}-controls`} onClick={()=>setControlsOpen(v=>!v)}>OPTICAL CONTROLS <span aria-hidden="true">{controlsOpen?"−":"+"}</span></button>}
    <div id={`${instructions}-controls`}><LenusHudControls state={state} fps={fps} paused={paused} cutaway={cutaway} onControlGesture={active=>controller.current?.setControlGesture(active)} onToggleCutaway={()=>changeInspection(!cutawayValue.current)} transformation={transformation} onTransformationChange={changeTransformation} exploded={cutaway&&explodeAmount>.5} explodeAmount={explodeAmount} focusAngle={focusAngle} activePart={activePart} onToggleExplode={toggleExplode} onExplodeChange={changeExplode} onFocusChange={changeFocus} onResetView={reset} onTogglePause={togglePause}/></div>
  </div>;
  return <section className={`ln-stage${experienceRef?" ln-story-engine":""}`} data-state={state} data-inspection-mode={cutaway?"cutaway":"hero"} data-exploded={cutaway&&explodeAmount>.5} aria-busy={transformationMoving&&["running","paused"].includes(state)} aria-label="Optical lens experience">
    <div className="ln-lens-plot">
      <div className="ln-aperture" aria-hidden="true"/>
      <LenusLensFallback cutaway={cutaway||(pose.current.transformation!==null&&transformation>=.5)}/>
      <div ref={host} className="ln-canvas-host" data-testid="lenus-canvas-container" tabIndex={0} role={activationNeeded?"button":"group"} aria-label="Interactive Lenus optical lens assembly" aria-describedby={instructions} onPointerMove={move} onPointerLeave={()=>controller.current?.setPointer(0,0)} onPointerDown={event=>{pointerStart.current={x:event.clientX,y:event.clientY};}} onPointerUp={pick} onKeyDown={keyboard}/>
      <span className="ln-stage-marker ln-stage-marker-top" aria-hidden="true">LENUS / OPTICAL SYSTEMS</span>
      <span className="ln-stage-marker ln-stage-marker-bottom" aria-hidden="true">N 1.52 <span>{getSemanticPartCount()} PARTS</span></span>
    </div>
    <p id={instructions} className="ln-sr-only">{activationNeeded?"Press Enter or tap to start the optical experience. ":""}Use arrow keys to rotate, C to inspect the interior, E to separate the assembly, R or Home to reset. Select a visible lens part to inspect it.</p>
    <p className="ln-stage-help" role="status">{message[state]}</p>
    {controlsMount?createPortal(controls,controlsMount):controls}
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
  progress:number;
  phase:"assembled"|"unlock"|"deploy"|"interior"|"reassemble"|"lock";
  body:number;unlock:number;frontCarriage:number;guideExtension:number;shutter:number;
  opticalOffsets:readonly number[];panelSlide:readonly number[];panelPivot:readonly number[];
  cameraBlend:number;ambientWeight:number;
};

function ramp(t:number,start:number,end:number) {
  const u=Math.max(0,Math.min(1,(t-start)/(end-start)));
  return u*u*u*(u*(u*6-15)+10);
}

/** One mechanical path for the slider, automatic opening and reverse closing. */
export function getLensDeploymentPose(progress:number):LensTransformationPose {
  const p=Number.isFinite(progress)?Math.max(0,Math.min(1,progress)):0,t=3+7*p;
  const lift=ramp(t,4,5);
  const body=ramp(t,6,10);
  const frontCarriage=.5*lift+.55*body;
  const opticalB=ramp(t,6.25,9.75);
  const opticalC=ramp(t,6.5,10);
  return {
    seconds:t,progress:p,phase:p===0?"assembled":p===1?"interior":"deploy",
    body,unlock:ramp(t,3,4),frontCarriage,guideExtension:frontCarriage,
    shutter:ramp(t,3.5,6.5),
    opticalOffsets:[.5*lift+.15*body,.24*opticalB,.12*opticalC,0,0,0,0],
    panelSlide:Array.from({length:4},(_,i)=>ramp(t,5+i*.06,6+i*.06)),
    panelPivot:Array.from({length:4},(_,i)=>ramp(t,6.3+i*.06,9.5+i*.06)),
    cameraBlend:body,ambientWeight:1-body,
  };
}

export function getLensTransformationPose(elapsedSeconds:number):LensTransformationPose {
  const t=Number.isFinite(elapsedSeconds)?((elapsedSeconds%24)+24)%24:0;
  const progress=t<3?0:t<10?(t-3)/7:t<15?1:t<22?(22-t)/7:0;
  return {...getLensDeploymentPose(progress),seconds:t,phase:t<3||t>=22?"assembled":t<6?"unlock":t<10?"deploy":t<15?"interior":t<20?"reassemble":"lock"};
}

/** Bounded, interruptible easing, with exact endpoint settling in either direction. */
export function advanceTransformationProgress(current:number,target:number,seconds:number){
  const a=Number.isFinite(current)?Math.max(0,Math.min(1,current)):0;
  const b=Number.isFinite(target)?Math.max(0,Math.min(1,target)):0;
  const dt=Number.isFinite(seconds)?Math.max(0,Math.min(.1,seconds)):0;
  const step=(b-a)*(1-Math.exp(-10*dt)),limit=.8*dt;
  const next=a+Math.max(-limit,Math.min(limit,step));
  return Math.abs(next-b)<.0001?b:next;
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
import { advanceTransformationProgress, getLensDeploymentPose, getLensTransformationPose, LENS_INTERIOR_YAW } from "../model/lensTransformation";
import { getPartTelemetry, isInteriorPart, prefersRearView, type LenusPartInfo } from "./telemetry";
import { getLensLoopPose } from "./lensMotion";
import {blendStoryPose,sampleStoryPose,type EngineStoryPose,type StoryInput} from "../story/chapterPoseMap";
import {CAPABILITIES,type NarrativeRenderFrame} from "../story/projectedAnchors";
import {interactionWeight,smooth} from "../story/storyMath";
export { getPartTelemetry, type LenusPartInfo } from "./telemetry";

export function normalizePointer(value:number){return Number.isFinite(value)?THREE.MathUtils.clamp(value,-1,1):0;}
export function fitHeroFrustumHalfHeight(width:number,height:number,inspection=false){
  const aspect=Math.max(1,Number.isFinite(width)?width:1)/Math.max(1,Number.isFinite(height)?height:1);
  const extent=inspection?4.3:3.7;
  return Math.max(extent,extent/aspect);
}
const BASE_YAW=-.46,BASE_POLAR=Math.PI/2-.14,RADIUS=12;
const finite=(n:number,fallback=0)=>Number.isFinite(n)?n:fallback;
const normalizeProgress=(value:number)=>THREE.MathUtils.clamp(finite(value),0,1);
type CameraPose={yaw:number;polar:number};
type OrbitOffset={yaw:number;polar:number};
type ManualTransformation={progress:number;target:number;direction:1|-1;wideFrame:boolean};
type HeroView={elapsed:number;camera:CameraPose;orbit:OrbitOffset;pointer:{x:number;y:number};parallax:{x:number;y:number};transformation?:ManualTransformation|null;manualExplode?:number};
export type LensInspectionMode="hero"|"cutaway";
type ControlSnapshot={mode:LensInspectionMode;camera:CameraPose;orbit:OrbitOffset;pointer?:{x:number;y:number};parallax?:{x:number;y:number};transformation?:ManualTransformation|null;hero:HeroView|null;controls:{explode:number;focus:number;currentExplode?:number;currentFocus?:number}};
type StoryOverride={origin:number;frame:EngineStoryPose;kind:"drag"|"slider"|"inspect";entry:number;release:number;releasing:boolean;camera?:CameraPose};
type NarrativeMemory={input:StoryInput;hero:{frame:EngineStoryPose;controls:ControlSnapshot;elapsed:number}|null;override:StoryOverride|null};
export type LenusInspectionSnapshot=ControlSnapshot&{narrative?:NarrativeMemory|null};
export interface LenusSceneOptions{
  initialAnimationTime?:number;initialResolutionScale?:number;initialInspectionState?:LenusInspectionSnapshot;
  onFps?:(fps:number)=>void;onContextChange?:(state:"lost"|"restored")=>void;
  onInteractionChange?:(dragging:boolean)=>void;onPartChange?:(part:LenusPartInfo)=>void;
  onTransformationChange?:(progress:number,target:number|null,settled:boolean)=>void;
  onNarrativeFrame?:(frame:NarrativeRenderFrame)=>void;
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
  private transformation:ManualTransformation|null=null;private allowManualMotion=false;private animating=false;private publishedTransformation="";
  private explodeTarget=0;private explode=0;private focusTarget=0;private focus=0;
  private elapsed=0;private lastTime:number|null=null;private frames=0;private sampleTime=0;private slowTime=0;
  private resolutionScale=1;private viewport={width:1,height:1};
  private narrative:NarrativeMemory|null=null;private appliedStory:EngineStoryPose|null=null;private presentationSuspended=false;
  private controlGesture=false;
  private readonly storyLights:THREE.DirectionalLight[]=[];
  private outline:THREE.BoxHelper|null=null;private focusedPart:string|null=null;private renderedAt=0;
  private readonly projectedPoint=new THREE.Vector3();
  constructor(private readonly options:LenusSceneOptions={}){
    this.elapsed=Math.max(0,finite(options.initialAnimationTime??0));
    this.resolutionScale=THREE.MathUtils.clamp(finite(options.initialResolutionScale??1,1),.75,1);
    const saved=options.initialInspectionState;
    if(saved){
      this.mode=saved.mode;this.hero=saved.hero?structuredClone(saved.hero):null;this.orbit={...saved.orbit};
      if(saved.transformation)this.transformation={...saved.transformation,progress:normalizeProgress(saved.transformation.progress),target:normalizeProgress(saved.transformation.target)};
      this.pointer={x:normalizePointer(saved.pointer?.x??0),y:normalizePointer(saved.pointer?.y??0)};
      this.parallax={x:finite(saved.parallax?.x??0),y:finite(saved.parallax?.y??0)};
      this.explodeTarget=THREE.MathUtils.clamp(finite(saved.controls.explode),0,1);
      this.focusTarget=THREE.MathUtils.clamp(finite(saved.controls.focus),-Math.PI/2,Math.PI/2);
      this.explode=THREE.MathUtils.clamp(finite(saved.controls.currentExplode??this.explodeTarget),0,1);
      this.focus=THREE.MathUtils.clamp(finite(saved.controls.currentFocus??this.focusTarget),-Math.PI/2,Math.PI/2);
      this.placeCamera(saved.camera.yaw,saved.camera.polar);
    }else{const view=this.automaticCamera();this.placeCamera(view.yaw,view.polar);}
    if(saved?.narrative)this.narrative=structuredClone(saved.narrative);
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
        const light=new THREE.DirectionalLight(color,intensity);light.position.set(position[0],position[1],position[2]);this.scene.add(light);this.storyLights.push(light);
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
    controls.enableZoom=false;controls.enablePan=false;controls.enableDamping=false;controls.rotateSpeed=.5/Math.max(.35,this.narrative?.input.hero.heightRatio??1);
    controls.minPolarAngle=Math.PI*.2;controls.maxPolarAngle=Math.PI*.8;
    controls.addEventListener("start",this.onDragStart);controls.addEventListener("end",this.onDragEnd);controls.addEventListener("change",this.onControlChange);
    canvas.style.touchAction="pan-y pinch-zoom";
  }
  getRenderer(){return this.renderer;}
  getAnimationTime(){return this.elapsed;}
  getResolutionScale(){return this.resolutionScale;}
  getTransformationProgress(){return this.narrative&&this.appliedStory?this.appliedStory.deployment:this.currentTransformationPose().progress;}
  getTransformationTarget(){return this.transformation?.target??null;}
  getInspectionSnapshot():LenusInspectionSnapshot{
    return {...this.controlSnapshot(),narrative:this.narrative?structuredClone(this.narrative):null};
  }
  private controlSnapshot():ControlSnapshot{
    const camera=this.cameraPose(),base=this.automaticCamera();
    // OrbitControls can be mid-drag, before onDragEnd commits its offset.
    const orbit=this.mode==="hero"?{yaw:camera.yaw-base.yaw,polar:camera.polar-base.polar}:{...this.orbit};
    return {mode:this.mode,camera,orbit,pointer:{...this.pointer},parallax:{...this.parallax},transformation:this.transformation?{...this.transformation}:null,hero:this.hero?structuredClone(this.hero):null,controls:{explode:this.explodeTarget,focus:this.focusTarget,currentExplode:this.explode,currentFocus:this.focus}};
  }
  private restoreControls(saved:ControlSnapshot){
    this.mode=saved.mode;this.hero=saved.hero?structuredClone(saved.hero):null;this.orbit={...saved.orbit};
    this.transformation=saved.transformation?{...saved.transformation}:null;
    this.pointer={...(saved.pointer??{x:0,y:0})};this.parallax={...(saved.parallax??{x:0,y:0})};
    this.explodeTarget=saved.controls.explode;this.explode=saved.controls.currentExplode??this.explodeTarget;
    this.focusTarget=saved.controls.focus;this.focus=saved.controls.currentFocus??this.focusTarget;
    this.placeCamera(saved.camera.yaw,saved.camera.polar);
  }
  setPresentationSuspended(value:boolean){
    if(this.presentationSuspended===value)return;this.presentationSuspended=value;
    if(value){this.renderer?.setAnimationLoop(null);this.animating=false;this.lastTime=null;if(this.controls)this.controls.enabled=false;}
    else{this.resizeBuffer();this.applyLoopPose();this.render();this.updateAnimationLoop();}
  }
  setNarrativeFrame(input:StoryInput){
    const safe={...input,position:THREE.MathUtils.clamp(finite(input.position),0,6),progress:normalizeProgress(input.progress)};
    const previous=this.narrative?.input.position??0;
    if(!this.narrative)this.narrative={input:safe,hero:null,override:null};
    if(previous<=.00001&&safe.position>.00001&&!this.narrative.hero)this.narrative.hero={frame:structuredClone(this.appliedStory??this.legacyStoryPose()),controls:this.controlSnapshot(),elapsed:this.elapsed};
    if(previous>.00001&&safe.position<=.00001&&this.narrative.hero){const saved=this.narrative.hero;this.restoreControls(saved.controls);this.elapsed=saved.elapsed;this.narrative.hero=null;this.narrative.override=null;}
    this.narrative.input=safe;
    if(this.controls)this.controls.rotateSpeed=.5/Math.max(.35,safe.hero.heightRatio??1);
    if(!this.presentationSuspended&&!this.running){this.applyLoopPose();this.render();}
  }
  focusPart(id:string|null){
    this.focusedPart=id&&this.runtime?.nodes[id]?id:null;
    if(this.focusedPart&&!this.outline){this.outline=new THREE.BoxHelper(this.runtime!.nodes[this.focusedPart],0xD2F802);const material=this.outline.material as THREE.Material;material.transparent=true;material.opacity=.65;material.depthTest=false;material.depthWrite=false;this.outline.renderOrder=50;this.scene.add(this.outline);}
    if(this.outline)this.outline.visible=!!this.focusedPart;
    if(this.narrative)this.applyLoopPose();this.render();
  }
  releaseInteraction(){if(this.narrative?.override){this.narrative.override.releasing=true;this.narrative.override.release=0;this.updateAnimationLoop();}this.focusPart(null);}
  setControlGesture(active:boolean){
    if(this.controlGesture===active)return;
    if(active){this.beginStoryInteraction("slider");this.controlGesture=true;}else{this.controlGesture=false;this.finishStoryGesture();}
    this.updateAnimationLoop();
  }
  private finishStoryGesture(){
    const o=this.narrative?.override;if(!o||!this.appliedStory)return;
    o.origin=this.narrative!.input.position;o.frame=structuredClone(this.appliedStory);o.entry=1;
    if(this.transformation)this.transformation.progress=this.appliedStory.deployment;
    this.explode=this.appliedStory.separation;this.focus=this.appliedStory.focus;this.captureOrbit();
    if(o.origin<3.55||o.origin>4.45){o.releasing=true;o.release=0;}
  }
  private storyActive(){return !!this.narrative&&this.narrative.input.position>.00001;}
  private beginStoryInteraction(kind:StoryOverride["kind"]){
    if(this.disposed||!this.storyActive()||!this.appliedStory)return false;
    const existing=this.narrative!.override;if(existing&&!existing.releasing&&existing.kind===kind&&(this.dragging||this.controlGesture||interactionWeight(this.narrative!.input.position,existing.origin,1,0)>.98))return true;
    const frame=structuredClone(this.appliedStory),camera=this.cameraPose();
    this.mode="hero";this.hero=null;this.transformation={progress:frame.deployment,target:frame.deployment,direction:1,wideFrame:false};
    this.explode=this.explodeTarget=frame.separation;this.focus=this.focusTarget=frame.focus;
    this.pointer={x:0,y:0};this.parallax={x:0,y:0};
    const base=this.automaticCamera();this.orbit={yaw:camera.yaw-base.yaw,polar:camera.polar-base.polar};
    this.narrative!.override={origin:this.narrative!.input.position,frame,kind,entry:kind==="drag"?1:0,release:0,releasing:false};
    return true;
  }
  private hasStoryMotion(){const o=this.narrative?.override;return !!o&&(o.entry<1||(o.releasing&&o.release<1));}
  private legacyStoryPose():EngineStoryPose{
    const transform=this.currentTransformationPose(),a=this.mode==="cutaway"?{spin:0,yaw:0,pitch:0,collar:0,shardOrbit:0,shardY:0}:getLensLoopPose(this.elapsed);
    if(this.transformation){const w=getLensTransformationPose(this.elapsed).ambientWeight,r=w>.0001?transform.ambientWeight/w:0;for(const key of ["spin","yaw","pitch","collar","shardOrbit","shardY"] as const)a[key]*=r;}
    const base=this.automaticCamera(),camera=this.mode==="cutaway"||this.dragging?this.cameraPose():{yaw:base.yaw+this.orbit.yaw,polar:base.polar+this.orbit.polar};
    const hero=this.narrative?.input.hero??{x:.72,y:.46,scale:.68};
    const sweep=.25*Math.sin(Math.PI*Math.min(1,this.elapsed/1.2))**2;
    return {deployment:transform.progress,separation:this.mode==="cutaway"||this.transformation?this.explode:0,focus:this.focus,scale:hero.scale*((this.mode==="cutaway"||this.transformation?.wideFrame)?3.7/4.3:1),x:hero.x,y:hero.y,yaw:camera.yaw,polar:camera.polar,distance:12,rotation:[a.pitch+this.parallax.x*transform.ambientWeight,a.yaw+this.parallax.y*transform.ambientWeight,a.spin],violet:1,lime:1,key:1+sweep*.4,exposure:1,sweep,collarIdle:a.collar,shardOrbit:a.shardOrbit,shardY:a.shardY};
  }
  private applyNarrativePose(){
    const story=this.narrative!,input=story.input,legacy=this.legacyStoryPose();
    let pose=legacy,manual=!this.storyActive()&&(this.mode==="cutaway"||!!this.transformation),inspection=this.mode==="cutaway";
    if(this.storyActive()){
      const base=story.hero?.frame??legacy;
      pose=blendStoryPose(base,sampleStoryPose(input),smooth((input.position-.08)/.92));
      const o=story.override;
      if(o){
        const weight=interactionWeight(input.position,o.origin,o.entry,o.release,this.dragging||this.controlGesture);
        const camera=this.dragging?this.cameraPose():o.camera??{yaw:legacy.yaw,polar:legacy.polar};
        const desired={...o.frame,deployment:legacy.deployment,separation:legacy.separation,focus:legacy.focus,yaw:camera.yaw,polar:camera.polar};
        pose=blendStoryPose(pose,blendStoryPose(o.frame,desired,smooth(o.entry)),weight);
        manual=!o.releasing&&(this.dragging||this.controlGesture||interactionWeight(input.position,o.origin,1,0)>.02);inspection=manual&&o.kind==="inspect";
      }else inspection=false;
    }
    this.appliedStory=pose;
    this.publishTransformation(pose.deployment,manual?this.getTransformationTarget():null,!this.hasManualMotion()&&!this.hasStoryMotion());
    if(!this.model||!this.runtime)return;
    this.runtime.setTransformationPose(getLensDeploymentPose(pose.deployment));this.runtime.setExplode(pose.separation);this.runtime.setFocusRing(pose.focus);
    this.runtime.setAmbientPose({collar:pose.collarIdle,shardOrbit:pose.shardOrbit,shardY:pose.shardY});
    this.model.quaternion.setFromEuler(new THREE.Euler(...pose.rotation));this.model.scale.setScalar(pose.scale);
    if(!this.dragging)this.placeCamera(pose.yaw,pose.polar,pose.distance);
    this.camera.updateMatrixWorld(true);
    const right=new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld,0),up=new THREE.Vector3().setFromMatrixColumn(this.camera.matrixWorld,1);
    this.model.position.copy(right.multiplyScalar((pose.x*2-1)*this.camera.right)).add(up.multiplyScalar((1-pose.y*2)*this.camera.top));
    this.model.updateMatrixWorld(true);
    for(const [i,light]of this.storyLights.entries())light.intensity=[3*pose.key,1.4*pose.key,1.8*pose.lime,1.5*pose.violet][i];
    this.storyLights[0]?.position.set(-3+pose.sweep*2,5,4-pose.sweep);
    if(this.renderer)this.renderer.toneMappingExposure=pose.exposure;
    this.storyFrameFlags={manual,inspection};
  }
  private storyFrameFlags={manual:false,inspection:false};
  private publishTransformation(progress:number,target:number|null,settled:boolean){
    const key=`${Math.round(progress*100)}:${target}:${settled}`;
    if(key!==this.publishedTransformation){this.publishedTransformation=key;this.options.onTransformationChange?.(progress,target,settled);}
  }
  private cameraPose():CameraPose{const p=new THREE.Spherical().setFromVector3(this.camera.position);return {yaw:p.theta,polar:p.phi};}
  private automaticCamera():CameraPose{
    const blend=this.currentTransformationPose().cameraBlend;
    return {yaw:BASE_YAW+(LENS_INTERIOR_YAW-BASE_YAW)*blend,polar:BASE_POLAR};
  }
  private captureOrbit(){const view=this.cameraPose(),base=this.automaticCamera();this.orbit={yaw:view.yaw-base.yaw,polar:view.polar-base.polar};}
  setInspectionMode(mode:LensInspectionMode){
    if(this.storyActive()){
      if(mode==="hero"){this.releaseInteraction();return;}
      this.beginStoryInteraction("inspect");
      if(this.transformation)this.transformation.target=1;
      if(this.narrative?.override)this.narrative.override.camera={yaw:LENS_INTERIOR_YAW,polar:BASE_POLAR};
      this.applyLoopPose();this.render();this.updateAnimationLoop();return;
    }
    if(this.disposed||mode===this.mode)return;
    if(mode==="cutaway"){
      if(this.dragging)this.captureOrbit();
      this.hero={elapsed:this.elapsed,camera:this.cameraPose(),orbit:{...this.orbit},pointer:{...this.pointer},parallax:{...this.parallax},transformation:this.transformation?{...this.transformation}:null,manualExplode:this.explode};
      this.transformation=null;
      this.mode=mode;this.placeCamera(LENS_INTERIOR_YAW,BASE_POLAR);
    }else{
      this.mode="hero";
      if(this.hero){const saved=this.hero;this.elapsed=saved.elapsed;this.orbit={...saved.orbit};this.pointer={...saved.pointer};this.parallax={...saved.parallax};this.transformation=saved.transformation?{...saved.transformation}:null;if(this.transformation){this.explode=saved.manualExplode??0;this.explodeTarget=0;}this.placeCamera(saved.camera.yaw,saved.camera.polar);}
      this.hero=null;
    }
    this.lastTime=null;this.applyLoopPose();this.resize(this.viewport.width,this.viewport.height);this.updateAnimationLoop();
  }
  setTransformationTarget(amount:number){
    if(this.disposed)return;
    this.beginStoryInteraction("slider");
    const progress=this.getTransformationProgress(),target=normalizeProgress(amount),camera=this.cameraPose();
    const wideFrame=this.mode==="cutaway"||!!this.transformation?.wideFrame;
    if(this.mode==="hero"&&!this.transformation)this.explode=0;
    this.mode="hero";this.hero=null;
    this.transformation={progress,target,direction:target>=progress?1:-1,wideFrame};
    this.explodeTarget=0;
    const base=this.automaticCamera();this.orbit={yaw:camera.yaw-base.yaw,polar:camera.polar-base.polar};
    // Preserve the existing projection and drawing buffer while scrubbing.
    this.applyLoopPose();this.render();this.updateAnimationLoop();
  }
  resumeTransformationLoop(){
    if(this.storyActive()){this.releaseInteraction();return;}
    if(this.disposed||!this.transformation)return;
    const {progress,direction}=this.transformation,camera=this.cameraPose();
    const rotation=this.model?.rotation.clone();
    this.elapsed=progress===0?0:progress===1?(direction<0?15:10):direction>0?3+7*progress:22-7*progress;
    this.transformation=null;this.hero=null;this.mode="hero";
    const base=this.automaticCamera();this.orbit={yaw:camera.yaw-base.yaw,polar:camera.polar-base.polar};
    const ambient=getLensLoopPose(this.elapsed),weight=getLensTransformationPose(this.elapsed).ambientWeight;
    if(rotation&&weight>.0001){this.parallax.x=(rotation.x-ambient.pitch)/weight;this.parallax.y=(rotation.y-ambient.yaw)/weight;}
    this.lastTime=null;this.applyLoopPose();this.resize(this.viewport.width,this.viewport.height);this.updateAnimationLoop();
  }
  private currentTransformationPose(){return this.mode==="cutaway"?getLensDeploymentPose(1):this.transformation?getLensDeploymentPose(this.transformation.progress):getLensTransformationPose(this.elapsed);}
  private hasManualMotion(){return !!this.transformation&&(this.transformation.progress!==this.transformation.target||Math.abs(this.explode-this.explodeTarget)>.0001);}
  private updateAnimationLoop(){
    if(!this.renderer||this.disposed||this.contextLost||this.presentationSuspended)return;
    const active=this.running||(this.allowManualMotion&&(this.hasManualMotion()||this.hasStoryMotion()));
    if(active!==this.animating){this.animating=active;this.lastTime=null;this.renderer.setAnimationLoop(active?this.tick:null);}
  }
  inspectPart(id:string){
    const part=getPartTelemetry(id);
    if(this.storyActive()){
      this.beginStoryInteraction("inspect");if(this.transformation)this.transformation.target=1;
      if(this.narrative?.override)this.narrative.override.camera={yaw:prefersRearView(id)?Math.PI:LENS_INTERIOR_YAW,polar:BASE_POLAR};
      this.focusPart(id==="assembly"?null:id);
      this.applyLoopPose();this.render();this.updateAnimationLoop();return part;
    }
    this.focusPart(id==="assembly"?null:id);
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
    const aspect=this.viewport.width/this.viewport.height,h=fitHeroFrustumHalfHeight(width,height,!this.narrative&&(this.mode==="cutaway"||!!this.transformation?.wideFrame));
    this.camera.left=-h*aspect;this.camera.right=h*aspect;this.camera.top=h;this.camera.bottom=-h;this.camera.updateProjectionMatrix();
    this.resizeBuffer();this.applyLoopPose();if(!this.contextLost)this.render();
  }
  private resizeBuffer(){
    if(!this.renderer||this.contextLost||this.presentationSuspended)return;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,this.narrative?.input.compact?1:1.5)*this.resolutionScale);
    this.renderer.setSize(this.viewport.width,this.viewport.height,false);
  }
  setPointer(x:number,y:number){if(!this.disposed&&this.mode==="hero"&&!this.transformation)this.pointer={x:normalizePointer(x),y:normalizePointer(y)};}
  setExplodeTarget(amount:number,reveal=true){
    if(this.disposed)return;
    if(this.storyActive()&&reveal){
      this.beginStoryInteraction("slider");if(this.transformation)this.transformation.target=1;
      this.explodeTarget=normalizeProgress(amount);this.applyLoopPose();this.render();this.updateAnimationLoop();return;
    }
    if(reveal)this.setInspectionMode("cutaway");
    this.explodeTarget=THREE.MathUtils.clamp(finite(amount),0,1);
    if(!this.running){this.explode=this.explodeTarget;this.applyLoopPose();this.render();}
  }
  setFocusTarget(radians:number){
    this.beginStoryInteraction("slider");
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
  private placeCamera(yaw:number,polar:number,distance=RADIUS){
    const angle=finite(yaw,BASE_YAW);
    this.camera.position.setFromSphericalCoords(distance,THREE.MathUtils.clamp(finite(polar,BASE_POLAR),Math.PI*.2,Math.PI*.8),Math.atan2(Math.sin(angle),Math.cos(angle)));
    this.camera.lookAt(0,0,0);this.placingCamera=true;this.controls?.update();this.placingCamera=false;
  }
  rotateView(deltaYaw:number,deltaPitch:number){
    if(this.disposed||this.contextLost)return;this.beginStoryInteraction("drag");const p=this.cameraPose();
    this.placeCamera(p.yaw+finite(deltaYaw),p.polar+finite(deltaPitch));if(this.mode==="hero")this.captureOrbit();
    if(this.narrative){this.applyLoopPose();if(this.storyActive()&&(this.narrative.input.position<3.55||this.narrative.input.position>4.45))this.releaseInteraction();}
    this.render();this.updateAnimationLoop();
  }
  resetView(){
    if(this.disposed)return;
    if(this.storyActive()){this.narrative!.override=null;this.focusPart(null);this.applyLoopPose();this.render();return;}
    this.mode="hero";this.hero=null;this.transformation=null;this.elapsed=0;this.lastTime=null;this.orbit={yaw:0,polar:0};
    this.pointer={x:0,y:0};this.parallax={x:0,y:0};this.explode=this.explodeTarget=0;this.focus=this.focusTarget=0;
    this.applyLoopPose();this.placeCamera(BASE_YAW,BASE_POLAR);this.resize(this.viewport.width,this.viewport.height);this.updateAnimationLoop();
  }
  start(){
    if(this.disposed||!this.renderer)return;if(!this.running)this.lastTime=null;this.running=true;this.allowManualMotion=true;
    if(this.controls)this.controls.enabled=!this.contextLost;this.updateAnimationLoop();
  }
  stop(allowInteraction=false){
    if(this.running)this.lastTime=null;this.running=false;this.allowManualMotion=allowInteraction;
    if(!this.disposed)this.updateAnimationLoop();
    if(this.controls)this.controls.enabled=allowInteraction&&!this.contextLost;
  }
  private tick=(time:number)=>{
    if((!this.running&&!(this.allowManualMotion&&(this.hasManualMotion()||this.hasStoryMotion())))||this.disposed||this.contextLost||this.presentationSuspended||!this.renderer||!this.model||!this.runtime)return;
    if(this.narrative&&this.lastTime!==null&&time-this.renderedAt<15)return;this.renderedAt=time;
    const realDelta=this.lastTime===null?0:Math.max(0,(time-this.lastTime)/1000),delta=Math.min(.1,realDelta);this.lastTime=time;
    if(this.running&&!this.dragging&&this.mode==="hero"&&!this.transformation&&!this.storyActive())this.elapsed+=realDelta;
    const override=this.narrative?.override;if(override){override.entry=Math.min(1,override.entry+delta*2.5);if(override.releasing)override.release=Math.min(1,override.release+delta*1.4);}
    if(this.transformation&&!this.dragging)this.transformation.progress=advanceTransformationProgress(this.transformation.progress,this.transformation.target,delta);
    const damp=1-Math.exp(-5*delta);this.explode+=(this.explodeTarget-this.explode)*damp;this.focus+=(this.focusTarget-this.focus)*damp;
    if(Math.abs(this.explode-this.explodeTarget)<.0001)this.explode=this.explodeTarget;
    if(this.mode==="hero"&&!this.transformation){
      this.parallax.y+=((this.dragging?0:this.pointer.x*.14)-this.parallax.y)*damp;
      this.parallax.x+=((this.dragging?0:-this.pointer.y*.1)-this.parallax.x)*damp;
    }
    this.applyLoopPose();this.frames++;this.sampleTime+=realDelta;
    if(this.sampleTime>=1){
      const fps=this.frames/this.sampleTime;this.options.onFps?.(Math.round(fps));this.slowTime=fps<55?this.slowTime+this.sampleTime:0;
      if(this.slowTime>=2&&this.resolutionScale>.75){this.resolutionScale=Math.max(.75,this.resolutionScale*.85);this.resizeBuffer();this.slowTime=0;}
      this.frames=0;this.sampleTime=0;
    }
    this.render();if(!this.running)this.updateAnimationLoop();
  };
  private applyLoopPose(){
    if(this.narrative){this.applyNarrativePose();return;}
    const transform=this.currentTransformationPose(),target=this.getTransformationTarget();
    this.publishTransformation(transform.progress,target,!this.hasManualMotion());
    if(!this.model||!this.runtime)return;
    const ambient=this.mode==="cutaway"?{spin:0,yaw:0,pitch:0,collar:0,shardOrbit:0,shardY:0}:getLensLoopPose(this.elapsed);
    if(this.transformation){const originalWeight=getLensTransformationPose(this.elapsed).ambientWeight,ratio=originalWeight>.0001?transform.ambientWeight/originalWeight:0;for(const key of ["spin","yaw","pitch","collar","shardOrbit","shardY"] as const)ambient[key]*=ratio;}
    this.runtime.setTransformationPose(transform);this.runtime.setExplode(this.mode==="cutaway"||this.transformation?this.explode:0);this.runtime.setFocusRing(this.focus);this.runtime.setAmbientPose(ambient);
    const parallax=this.mode==="hero"?transform.ambientWeight:0;
    this.model.rotation.set(ambient.pitch+this.parallax.x*parallax,ambient.yaw+this.parallax.y*parallax,ambient.spin);
    if(this.mode==="hero"&&!this.dragging){const view=this.automaticCamera();this.placeCamera(view.yaw+this.orbit.yaw,view.polar+this.orbit.polar);}
  }
  private render(){
    if(!this.renderer||this.contextLost||this.presentationSuspended)return;
    if(this.outline&&this.focusedPart&&this.runtime?.nodes[this.focusedPart]){
      const node=this.runtime.nodes[this.focusedPart];node.traverse(o=>{if((o as THREE.InstancedMesh).isInstancedMesh)(o as THREE.InstancedMesh).computeBoundingBox();});this.outline.setFromObject(node);
    }
    this.renderer.render(this.scene,this.camera);
    if(this.narrative&&this.appliedStory&&this.runtime){
      const anchors=CAPABILITIES.map(a=>{const node=a.socket?this.runtime!.sockets[a.socket]:this.runtime!.nodes[a.part];if(!node)return {id:a.id,x:0,y:0,visible:false};this.projectedPoint.set(a.point[0],a.point[1],a.point[2]);node.localToWorld(this.projectedPoint);this.projectedPoint.project(this.camera);return {id:a.id,x:(this.projectedPoint.x+1)*.5*this.viewport.width,y:(1-this.projectedPoint.y)*.5*this.viewport.height,visible:Math.abs(this.projectedPoint.x)<1.05&&Math.abs(this.projectedPoint.y)<1.05};});
      this.options.onNarrativeFrame?.({position:this.narrative.input.position,progress:this.narrative.input.progress,pose:this.appliedStory,anchors,...this.storyFrameFlags});
    }
  }
  private onControlChange=()=>{if(!this.running&&!this.placingCamera){if(this.narrative)this.applyLoopPose();this.render();}};
  private onDragStart=()=>{this.beginStoryInteraction("drag");this.dragging=true;this.options.onInteractionChange?.(true);};
  private onDragEnd=()=>{if(this.mode==="hero")this.captureOrbit();this.dragging=false;if(this.storyActive())this.finishStoryGesture();this.updateAnimationLoop();this.options.onInteractionChange?.(false);};
  private onLost=(event:Event)=>{
    event.preventDefault();if(this.disposed)return;if(this.dragging&&this.mode==="hero")this.captureOrbit();this.dragging=false;
    this.contextLost=true;this.controlGesture=false;this.animating=false;this.renderer?.setAnimationLoop(null);this.lastTime=null;if(this.controls)this.controls.enabled=false;
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
      this.runtime?.dispose();this.environment?.dispose();this.outline?.dispose();this.scene.clear();renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();
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
    <file path="src/app/(lenus)/lenus/story/chapterNavigation.ts">
<![CDATA[/** A trackpad stroke includes its momentum tail, regardless of slide duration. */
export class ChapterWheelGesture{
  private last=-Infinity;
  private total=0;
  private direction=0;
  private consumed=false;
  active(now:number){return now-this.last<240;}
  reset(){this.last=-Infinity;this.total=0;this.direction=0;this.consumed=false;}
  push(delta:number,now:number):number{
    if(!Number.isFinite(delta)||!Number.isFinite(now)||delta===0)return 0;
    if(!this.active(now)){this.total=0;this.direction=0;this.consumed=false;}
    this.last=now;
    if(this.consumed)return 0;
    const direction=Math.sign(delta);
    if(this.direction!==direction)this.total=0;
    this.direction=direction;this.total+=Math.abs(delta);
    if(this.total<24)return 0;
    this.consumed=true;return direction;
  }
}

/** From a partial transition, reverse to its source rather than skipping it. */
export function adjacentChapter(position:number,direction:number){
  return direction>0?Math.min(7,Math.floor(position+.001)+1):Math.max(0,Math.ceil(position-.001)-1);
}

export function ownsChapterKeys(target:EventTarget|null){
  return target instanceof Element&&!!target.closest('input,textarea,select,button,a,summary,[contenteditable]:not([contenteditable="false"]),[role="slider"],[role="textbox"],dialog,[role="dialog"],.ln-work-gallery,[data-testid="lenus-canvas-container"]');
}

export function nestedWheelScroll(target:EventTarget|null,delta:number){
  if(!(target instanceof Element))return false;
  for(let el:Element|null=target;el&&el!==document.body;el=el.parentElement){
    if(el.scrollHeight<=el.clientHeight+1)continue;
    if(!/^(auto|scroll)$/.test(getComputedStyle(el).overflowY))continue;
    if(delta<0?el.scrollTop>0:el.scrollTop+el.clientHeight<el.scrollHeight-1)return true;
  }
  return false;
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/story/chapterPoseMap.ts">
<![CDATA[import {clamp01,mix,mixAngle,smooth} from "./storyMath";
export type HeroFrame={x:number;y:number;scale:number;heightRatio?:number};
export type StoryInput={position:number;progress:number;compact:boolean;hero:HeroFrame;workProgress?:number};
export type EngineStoryPose={
  deployment:number;separation:number;focus:number;scale:number;x:number;y:number;
  yaw:number;polar:number;distance:number;rotation:[number,number,number];
  violet:number;lime:number;key:number;exposure:number;sweep:number;collarIdle:number;shardOrbit:number;shardY:number;
};
const targets=[
  [.18,.05,1,.72,.46,-.46,.14,12,1,1,1,1,0,0,0],
  [1,.34,1.12,.66,.54,.95,.22,10.8,1.7,1.05,.95,1,-.06,.12,-.04],
  [.88,.22,.78,.80,.56,.65,.10,13.2,.85,.85,.9,.96,.06,.18,-.06],
  [1,.78,1.10,.66,.54,1.05,.2,12,1.25,1.15,1.1,1.02,.03,-.08,.04],
  [1,.55,1.08,.64,.49,Math.PI*5/18,.14,12,1,1,1.05,1,0,0,0],
  [.3,.12,.66,.78,.31,-.6,.08,14,.6,.5,.75,.94,.09,-.22,.02],
  [0,0,1.02,.72,.48,-.46,.14,12,1,1.2,1,1.02,0,0,0],
];
function target(index:number,input:StoryInput):EngineStoryPose{
  const a=targets[index],compactScales=[1,.98,.78,.88,.88,.74,.96],compactX=[.5,.5,.56,.5,.5,.56,.5];
  return {deployment:a[0],separation:a[1],focus:0,scale:input.hero.scale*(input.compact?compactScales[index]:a[2]),x:input.compact?compactX[index]:index===0?input.hero.x:a[3],y:input.compact?.28:index===0?input.hero.y:a[4],yaw:a[5],polar:Math.PI/2-a[6],distance:a[7],violet:a[8],lime:a[9],key:a[10],exposure:a[11],sweep:index===5?-.2:index===3?.25:0,rotation:[a[12],a[13],a[14]],collarIdle:0,shardOrbit:0,shardY:0};
}
export function blendStoryPose(a:EngineStoryPose,b:EngineStoryPose,t:number):EngineStoryPose{
  const p=clamp01(t),out={...a};
  for(const key of ["deployment","separation","focus","scale","x","y","polar","distance","violet","lime","key","exposure","sweep","collarIdle","shardOrbit","shardY"] as const)out[key]=mix(a[key],b[key],p);
  out.yaw=mixAngle(a.yaw,b.yaw,p);out.rotation=a.rotation.map((v,i)=>mixAngle(v,b.rotation[i],p)) as [number,number,number];return out;
}
export function sampleStoryPose(input:StoryInput):EngineStoryPose{
  const position=Math.max(0,Math.min(6,Number.isFinite(input.position)?input.position:0)),i=Math.min(5,Math.floor(position));
  const pose=blendStoryPose(target(i,input),target(i+1,input),smooth(position-i));
  // A bounded spatial glint, not a timer: reverse scrolling reverses it exactly.
  if(position>5)pose.lime+=.45*Math.sin(Math.PI*smooth(position-5))**2;
  pose.yaw+=((input.workProgress??0)-.5)*.18*(1-smooth(Math.abs(position-2)/.75));
  return pose;
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/story/experienceTypes.ts">
<![CDATA[import type {StoryInput} from "./chapterPoseMap";
export type EngineExperienceApi={
  setNarrativeFrame:(input:StoryInput)=>void;
  focusPart:(id:string|null)=>void;
  inspectPart:(id:string)=>void;
  releaseInteraction:()=>void;
  activate:()=>void;
  openControls:()=>void;
  setWorkProgress:(progress:number|null)=>void;
};
export type StoryNavigation={
  chapter:(id:import("./storyMath").ChapterId,history?:boolean)=>void;
  footer:()=>void;
  suspend:(value:boolean)=>void;
};
]]>
    </file>
    <file path="src/app/(lenus)/lenus/story/ExpertiseAnnotations.tsx">
<![CDATA["use client";
import {useImperativeHandle,useRef,useState,type Ref} from "react";
import {CAPABILITIES,type NarrativeRenderFrame} from "./projectedAnchors";
import {chapterWeight,smooth} from "./storyMath";
export type AnnotationsApi={update:(frame:NarrativeRenderFrame)=>void};
export default function ExpertiseAnnotations({ref,active,onFocus,onInspect}:{ref:Ref<AnnotationsApi>;active:number;onFocus:(id:string|null)=>void;onInspect:(id:string)=>void}){
  const [expanded,setExpanded]=useState<string|null>(null),labels=useRef<(HTMLDivElement|null)[]>([]),lines=useRef<(SVGLineElement|null)[]>([]),dots=useRef<(HTMLButtonElement|null)[]>([]),layer=useRef<HTMLDivElement>(null);
  useImperativeHandle(ref,()=>({update(frame){
    const expertise=chapterWeight(frame.position,3,.7),technology=chapterWeight(frame.position,4,.65);
    layer.current?.style.setProperty("--annotation-weight",String(expertise));layer.current?.style.setProperty("--hotspot-weight",String(technology));
    for(const [i,a]of CAPABILITIES.entries()){
      const p=frame.anchors.find(v=>v.id===a.id);if(!p)continue;
      const dock=smooth((frame.position-(2.4+i*.12))/.24)*(1-smooth((frame.position-(3.35+i*.08))/.3));
      const x=Math.max(20,Math.min(innerWidth-252,p.x+a.offset[0]))+(1-dock)*(a.offset[0]<0?-40:40),y=Math.max(144,Math.min(innerHeight-100,p.y+a.offset[1]))+(1-dock)*16;
      labels.current[i]?.style.setProperty("--label-x",`${x}px`);labels.current[i]?.style.setProperty("--label-y",`${y}px`);
      if(labels.current[i]){labels.current[i]!.style.opacity=String(dock);labels.current[i]!.dataset.flip=y>innerHeight*.5?"up":"down";labels.current[i]!.style.visibility=p.visible?"visible":"hidden";}
      const line=lines.current[i];if(line){line.setAttribute("x1",String(p.x));line.setAttribute("y1",String(p.y));line.setAttribute("x2",String(x+(a.offset[0]<0?232:0)));line.setAttribute("y2",String(y+18));line.style.opacity=String(dock);}
      dots.current[i]?.style.setProperty("--dot-x",`${p.x}px`);dots.current[i]?.style.setProperty("--dot-y",`${p.y}px`);
    }
  }}));
  return <div ref={layer} className="ln-annotation-layer" data-chapter-active={active}>
    <svg className="ln-annotation-lines" aria-hidden="true">{CAPABILITIES.map((a,i)=><line ref={el=>{lines.current[i]=el;}} key={a.id}/>)}</svg>
    <aside className="ln-projected-callouts" aria-label="Expertise linked to optical components" inert={active!==3}>
      {CAPABILITIES.map((a,i)=><div className="ln-projected-label" key={a.id} ref={el=>{labels.current[i]=el;}}><button type="button" aria-expanded={expanded===a.id} aria-controls={`ln-capability-${a.id}`} onMouseEnter={()=>onFocus(a.part)} onMouseLeave={()=>{if(expanded!==a.id)onFocus(null);}} onFocus={()=>onFocus(a.part)} onBlur={()=>{if(expanded!==a.id)onFocus(null);}} onClick={()=>{setExpanded(expanded===a.id?null:a.id);onFocus(expanded===a.id?null:a.part);}} onKeyDown={event=>{if(event.key==="Escape"){setExpanded(null);onFocus(null);}}}><span>0{i+1}</span>{a.name}<i aria-hidden="true">{expanded===a.id?"−":"+"}</i></button><p id={`ln-capability-${a.id}`} hidden={expanded!==a.id}>{a.description}</p></div>)}
    </aside>
    <div className="ln-engine-hotspots" inert={active!==4}>{CAPABILITIES.map((a,i)=><button key={a.id} ref={el=>{dots.current[i]=el;}} type="button" aria-label={`Inspect ${a.name.toLowerCase()} component`} onFocus={()=>onFocus(a.part)} onBlur={()=>onFocus(null)} onMouseEnter={()=>onFocus(a.part)} onMouseLeave={()=>onFocus(null)} onClick={()=>onInspect(a.part)}>0{i+1}</button>)}</div>
  </div>;
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/story/projectedAnchors.ts">
<![CDATA[export const CAPABILITIES=[
  {id:"direction",name:"Creative Direction",part:"outer-glass",point:[2.26,0,.23],socket:null,offset:[-480,-30],description:"A clear creative idea brings identity, space and interaction into focus."},
  {id:"immersive",name:"Immersive Experiences",part:"housing-panel-0",point:[0,0,0],socket:"housing-panel-0-link-panel-0",offset:[132,-92],description:"Connected environments invite people to step beyond the screen."},
  {id:"realtime",name:"Real-Time 3D",part:"front-lens",point:[0,0,.2],socket:null,offset:[-400,330],description:"Physical materials and responsive rendering give digital objects depth and presence."},
  {id:"systems",name:"Interactive Systems",part:"guide-rails",point:[0,0,0],socket:"front-carriage-rail-1",offset:[400,420],description:"Interfaces, motion and engineering work together as one responsive system."},
] as const;
export type ProjectedAnchor={id:string;x:number;y:number;visible:boolean};
export type NarrativeRenderFrame={position:number;progress:number;pose:import("./chapterPoseMap").EngineStoryPose;anchors:ProjectedAnchor[];manual:boolean;inspection:boolean};
]]>
    </file>
    <file path="src/app/(lenus)/lenus/story/story.css">
<![CDATA[/* Shared narrative layers. The canvas never enters the translated DOM track. */
.ln-narrative .ln-header{position:fixed;left:0;right:0;top:0;z-index:40}
.ln-narrative .ln-header a{text-decoration:none}
.ln-desktop-nav a{position:relative;padding:8px 0;color:var(--color-ln-muted);font-size:14px;line-height:20px;transition:color var(--duration-ln-ui) var(--ease-ln-out)}
.ln-desktop-nav a::after{content:"";position:absolute;inset:auto 0 0;height:1px;background:var(--color-ln-lime);transform:scaleX(0);transform-origin:left;transition:transform var(--duration-ln-ui) var(--ease-ln-out)}
.ln-desktop-nav a:hover,.ln-desktop-nav a[aria-current]{color:var(--color-ln-white)}
.ln-desktop-nav a:hover::after,.ln-desktop-nav a[aria-current]::after{transform:scaleX(1)}
.ln-mobile-menu a{color:var(--color-ln-white);text-decoration:none;text-align:left;padding:16px 0;font-family:var(--font-ln-heading);font-size:30px;line-height:36px}
.ln-mobile-menu a span{display:inline-block;width:40px;color:var(--color-ln-muted);font-family:var(--font-ln-data);font-size:12px}
.ln-narrative>.ln-space{position:fixed;background:radial-gradient(ellipse at var(--ln-glow-x,79%) var(--ln-glow-y,73%),color-mix(in srgb,var(--color-ln-violet) var(--ln-violet-strength,14%),transparent),transparent 40%),radial-gradient(ellipse at 54% 4%,var(--color-ln-cosmos),transparent 55%)}
.ln-narrative>.ln-space::before{transform:rotate(var(--ln-orbit-turn,0deg))}
.ln-story-shell,.ln-story-pin{position:relative;min-width:0;overflow-anchor:none}.ln-story-pin{width:100vw;overflow:clip}
.ln-story-shell{z-index:1}
.ln-story-pin{--ln-engine-x:70%;--ln-engine-y:46%;--ln-engine-scale:.68;--ln-hud-weight:1}
.ln-scene-layer,.ln-annotation-layer,.ln-controls-mount,.ln-navigation-layer{position:sticky;top:0;height:100svh;margin-bottom:-100svh;pointer-events:none}
.ln-scene-layer{z-index:2}.ln-annotation-layer{z-index:5}.ln-navigation-layer{z-index:7}.ln-controls-mount{z-index:8}
.ln-horizontal-track{position:relative;z-index:3;pointer-events:none}
.ln-horizontal-viewport{pointer-events:none}
.ln-chapter{position:relative;min-height:100svh;width:100%;padding:110px clamp(24px,4.5vw,88px) 96px;scroll-margin-top:0;pointer-events:none}
.ln-story-content{position:relative;pointer-events:auto}
.ln-narrative .ln-hero-copy{pointer-events:auto}
.ln-chapter.ln-hero{padding-top:110px;padding-bottom:24px;margin:0}
.ln-engine-reference{height:clamp(520px,68vh,760px)}
.ln-story-engine{position:absolute;inset:0;display:block;pointer-events:none}
.ln-story-engine .ln-lens-plot{position:absolute;inset:0;height:100%;min-height:0;width:100%;margin:0;aspect-ratio:auto}
.ln-story-engine .ln-canvas-host{pointer-events:auto}
.ln-story-engine .ln-lens-fallback{position:absolute;left:var(--ln-engine-x);top:var(--ln-engine-y);right:auto;bottom:auto;width:100vw;height:100svh;transform:translate(-50%,-50%) scale(var(--ln-engine-scale));transform-origin:center}
.ln-story-engine .ln-aperture{left:var(--ln-engine-x);top:var(--ln-engine-y);width:var(--ln-aperture-width,72vw);transform:translate(-50%,-50%) rotate(calc(-12deg + var(--ln-aperture-turn,0deg)))}
.ln-story-engine .ln-stage-marker-top{top:118px;right:clamp(24px,4.5vw,88px)}
.ln-story-engine .ln-stage-marker-bottom{left:45vw;bottom:194px;opacity:calc(var(--ln-hud-weight)*.6)}
.ln-story-engine .ln-stage-help{position:absolute;right:clamp(24px,4.5vw,88px);bottom:164px;margin:0;opacity:var(--ln-hud-weight)}
.ln-controls-drawer,.ln-controls-drawer>div{display:contents}
.ln-narrative .ln-controls-drawer{display:block;position:absolute;right:clamp(24px,4.5vw,88px);bottom:46px;width:min(720px,calc(100vw - 48px));pointer-events:auto;opacity:var(--ln-hud-weight);transform:translateY(calc((1 - var(--ln-hud-weight))*24px));transition:opacity 240ms var(--ease-ln-out),transform 240ms var(--ease-ln-out)}
.ln-narrative .ln-controls-drawer .ln-hud{width:100%;background:color-mix(in srgb,var(--color-ln-glass) 82%,transparent)}
.ln-drawer-toggle{display:none}
.ln-story-eyebrow{display:block;font-family:var(--font-ln-data);font-size:12px;line-height:18px;letter-spacing:.08em;color:var(--color-ln-muted);margin-bottom:24px}
.ln-story-content h2,.ln-native-footer h2{font-family:var(--font-ln-heading);font-variation-settings:"wdth" 75;font-weight:800;font-size:clamp(48px,7.5vw,128px);line-height:.94;letter-spacing:-.055em;margin:0;text-wrap:balance}
.ln-phrase-lime{color:var(--color-ln-lime)}.ln-phrase-violet{color:var(--color-ln-violet)}
.ln-story-content>p{max-width:360px;font-size:18px;line-height:28px;color:var(--color-ln-muted);text-wrap:pretty;margin:32px 0}
.ln-story-coordinate{font-family:var(--font-ln-data);font-size:12px;letter-spacing:.12em;color:var(--color-ln-lime)}
.ln-manifesto h2 span{display:block;transform-origin:left center}
.ln-manifesto h2 span:nth-child(2){margin-left:12vw;color:var(--color-ln-violet)}
.ln-manifesto h2 span:last-child{margin-top:32px;font-size:.66em}
.ln-manifesto-copy>p{margin-top:40px}
.ln-work-content{max-width:1100px}
.ln-work-content h2{font-size:clamp(48px,5vw,72px)}
.ln-work-gallery{margin-top:24px;min-width:0;perspective:1400px;overflow:clip}
.ln-work-stages{position:relative;touch-action:pan-y;cursor:grab;perspective:1400px}
.ln-work-stages:active{cursor:grabbing}
.ln-study{margin-bottom:40px;border:1px solid color-mix(in srgb,var(--color-ln-muted) 25%,transparent);background:var(--color-ln-midnight);border-radius:8px;overflow:hidden;transform-style:preserve-3d}
.ln-study-art{position:relative;height:300px;overflow:hidden;background:var(--color-ln-cosmos)}
.ln-study-copy{position:relative;padding:16px 20px}
.ln-study-copy .ln-story-eyebrow{font-size:12px;margin:0 0 8px}
.ln-study-copy h3{margin:0;font-size:24px;line-height:32px;font-weight:500;letter-spacing:-.04em}
.ln-study-copy p{margin:4px 0 0;font-size:14px;line-height:20px;color:var(--color-ln-muted)}
.ln-study-copy .ln-text-button{margin-top:8px;font-size:12px}
.ln-study-art--spatial{perspective:600px;color:var(--color-ln-white)}
.ln-spatial-floor{position:absolute;inset:30% -30% -70%;background-image:linear-gradient(color-mix(in srgb,var(--color-ln-muted) 22%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--color-ln-muted) 22%,transparent) 1px,transparent 1px);background-size:40px 40px;transform:rotateX(62deg) rotateZ(-25deg)}
.ln-spatial-frame{position:absolute;left:22%;top:12%;width:45%;height:72%;border:1px solid color-mix(in srgb,var(--color-ln-white) 65%,transparent);transform:translate3d(calc(var(--frame)*20px),calc(var(--frame)*-9px),calc(var(--frame)*-35px)) rotateY(-25deg);box-shadow:inset 0 0 0 8px color-mix(in srgb,var(--color-ln-violet) 8%,transparent)}
.ln-spatial-frame:nth-of-type(3){border-color:var(--color-ln-lime)}
.ln-study-art--spatial>span{position:absolute;left:8%;top:35%;font-family:var(--font-ln-heading);font-size:clamp(24px,3vw,48px);line-height:.95;letter-spacing:-.05em;transform:translateX(calc(var(--study-progress,0)*16px))}
.ln-study-art--identity{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;background:var(--color-ln-violet);color:var(--color-ln-midnight);padding:24px 32px}
.ln-study-art--identity strong{font-family:var(--font-ln-heading);font-size:clamp(72px,8vw,128px);font-weight:800;line-height:.7;letter-spacing:-.08em;transform:translateX(calc(var(--study-progress,0)*-20px))}
.ln-study-art--identity strong+strong{align-self:flex-end;color:var(--color-ln-white);transform:translateX(calc(var(--study-progress,0)*20px))}
.ln-study-art--identity i{position:absolute;width:30%;height:130%;background:var(--color-ln-lime);left:40%;top:-15%;transform:rotate(23deg);mix-blend-mode:multiply;pointer-events:none}
.ln-study-art--identity small{position:absolute;bottom:16px;left:20px;font-family:var(--font-ln-data);font-size:12px}
.ln-study-art--worlds{color:var(--color-ln-lime)}
.ln-study-art--worlds svg{position:absolute;inset:0;width:100%;height:100%;transform:translateY(calc(var(--study-progress,0)*-16px))}
.ln-study-art--worlds>span{position:absolute;left:8%;top:12%;font-family:var(--font-ln-heading);font-weight:800;font-size:clamp(30px,3.2vw,48px);line-height:.95;color:var(--color-ln-white);letter-spacing:-.05em}
.ln-world-beacon{position:absolute;left:70%;top:55%;width:8px;height:8px;border-radius:50%;background:var(--color-ln-violet);box-shadow:0 0 0 16px color-mix(in srgb,var(--color-ln-violet) 12%,transparent),0 0 0 32px color-mix(in srgb,var(--color-ln-violet) 6%,transparent)}
.ln-gallery-controls{display:flex;align-items:center;gap:16px;font-family:var(--font-ln-data);font-size:12px;color:var(--color-ln-muted)}
.ln-gallery-line{width:100px;height:1px;background:var(--color-ln-glass);position:relative}.ln-gallery-line i{position:absolute;left:0;top:0;width:33.333%;height:1px;background:var(--color-ln-lime);transform:translateX(calc(var(--study-progress,0)*200%))}
.ln-work-note{font-size:12px;line-height:18px;color:var(--color-ln-muted);margin:8px 0 0}
.ln-work-gallery[data-interactive="true"] .ln-work-stages{height:clamp(300px,44svh,420px)}
.ln-work-gallery[data-interactive="true"] .ln-study{position:absolute;inset:0 auto auto 0;width:74%;height:100%;margin:0;transform:translateX(calc(var(--study-offset,0)*74%)) translateZ(calc(var(--study-distance,0)*-130px)) rotateY(calc(var(--study-offset,0)*-12deg)) scale(calc(1 - min(var(--study-distance,0),2)*.16));opacity:calc(1 - min(var(--study-distance,0),2)*.36);z-index:calc(20 - var(--study-distance,0)*5)}
.ln-work-gallery[data-interactive="true"] .ln-study-art{height:calc(100% - 154px)}
.ln-work-gallery[data-interactive="false"] .ln-gallery-controls{display:none}
.ln-expertise-copy>p{margin-top:24px}.ln-capability-list{display:grid;gap:16px;max-width:600px;margin-top:32px}
.ln-capability-list details{border:1px solid color-mix(in srgb,var(--color-ln-muted) 20%,transparent);padding:16px;border-radius:8px;background:var(--color-ln-cosmos)}
.ln-capability-list summary{cursor:pointer;font-size:18px;line-height:28px}.ln-capability-list summary span{font-family:var(--font-ln-data);font-size:12px;color:var(--color-ln-lime);margin-right:16px}.ln-capability-list p{font-size:16px;line-height:24px;color:var(--color-ln-muted)}
.ln-annotation-lines{position:absolute;inset:0;width:100%;height:100%;opacity:var(--annotation-weight,0);overflow:visible}
.ln-annotation-lines line{stroke:var(--color-ln-muted);stroke-width:.7;stroke-dasharray:3 5}
.ln-projected-callouts{opacity:var(--annotation-weight,0)}
.ln-projected-label{position:absolute;left:0;top:0;width:232px;transform:translate3d(var(--label-x,-9999px),var(--label-y,-9999px),0);pointer-events:auto}
.ln-projected-label button{display:flex;gap:12px;align-items:center;width:100%;text-align:left;padding:12px;background:color-mix(in srgb,var(--color-ln-midnight) 88%,transparent);border:1px solid color-mix(in srgb,var(--color-ln-muted) 28%,transparent);border-radius:4px;color:var(--color-ln-white);font-size:14px;line-height:20px}
.ln-projected-label button span{font-family:var(--font-ln-data);color:var(--color-ln-lime);font-size:12px}.ln-projected-label button i{margin-left:auto;font-style:normal;color:var(--color-ln-lime)}
.ln-projected-label p{position:absolute;top:100%;margin:8px 0;padding:12px;background:var(--color-ln-midnight);font-size:14px;line-height:20px;color:var(--color-ln-muted)}.ln-projected-label[data-flip="up"] p{top:auto;bottom:100%}
.ln-engine-hotspots{opacity:var(--hotspot-weight,0)}
.ln-engine-hotspots button{position:absolute;left:0;top:0;transform:translate3d(calc(var(--dot-x,-9999px) - 16px),calc(var(--dot-y,-9999px) - 16px),0);width:32px;height:32px;border:1px solid var(--color-ln-lime);border-radius:50%;background:var(--color-ln-midnight);color:var(--color-ln-lime);font-family:var(--font-ln-data);font-size:12px;pointer-events:auto}
.ln-technology-copy .ln-text-button{margin:0}.ln-technology-copy .ln-lab-note{font-family:var(--font-ln-data);font-size:12px;line-height:20px;margin-top:40px}
.ln-studio-copy h2>span{display:block}.ln-studio-copy h2>span+span{margin:48px 0 0 20vw}
.ln-studio-copy>p{margin-top:32px}
.ln-contact-copy .ln-button{padding:16px 24px;margin-top:8px}
.ln-contact-thread{position:absolute;left:68%;right:8%;bottom:0;height:100px;display:flex;flex-direction:column;align-items:center;gap:16px;color:var(--color-ln-muted);font-family:var(--font-ln-data);font-size:12px;pointer-events:none}
.ln-contact-thread i{width:1px;flex:1;background:color-mix(in srgb,var(--color-ln-lime) 45%,transparent)}
.ln-chapter-navigation{position:absolute;left:clamp(24px,4.5vw,88px);bottom:18px;pointer-events:auto;min-width:160px}
.ln-chapter-navigation p{font-family:var(--font-ln-data);font-size:12px;line-height:18px;color:var(--color-ln-white);margin:0 0 4px}.ln-chapter-navigation p>span{color:var(--color-ln-muted);margin-right:12px}
.ln-chapter-dots{display:flex;gap:4px}.ln-chapter-dots a{display:flex;align-items:center;justify-content:center;width:24px;height:24px}.ln-chapter-dots span{display:block;width:4px;height:4px;border-radius:50%;background:var(--color-ln-muted);transition:width 200ms var(--ease-ln-out),background 200ms var(--ease-ln-out)}
.ln-chapter-dots a[aria-current] span{width:16px;border-radius:2px;background:var(--color-ln-lime)}
.ln-global-progress{display:block;width:192px;height:1px;background:color-mix(in srgb,var(--color-ln-muted) 20%,transparent)}.ln-global-progress i{display:block;height:1px;background:var(--color-ln-lime);transform-origin:left;transform:scaleX(var(--ln-story-progress,0))}
.ln-chapter-key-hint{display:none;font-family:var(--font-ln-data);font-size:9px;line-height:14px;color:var(--color-ln-muted);margin-top:6px}
[data-story-mode="horizontal"] .ln-chapter-key-hint{display:block}
.ln-skip-experience{display:flex;align-items:center;gap:8px;width:max-content;margin-top:8px;color:var(--color-ln-muted);font-family:var(--font-ln-data);font-size:10px;line-height:16px;text-decoration:none}.ln-skip-experience:hover{color:var(--color-ln-lime)}
.ln-native-footer{position:relative;z-index:4;display:flex;flex-direction:column;padding:96px clamp(24px,6vw,96px) 32px;background:var(--color-ln-midnight);border-top:1px solid color-mix(in srgb,var(--color-ln-muted) 24%,transparent);overflow:clip}
.ln-native-footer::before{content:"";position:absolute;inset:0 0 auto;height:min(700px,78svh);z-index:-1;pointer-events:none;background:linear-gradient(90deg,var(--color-ln-midnight),transparent 70%),url("/templates/lenus/footer-optical-v1.webp") right top/cover no-repeat;opacity:.9;mask-image:linear-gradient(to bottom,transparent,var(--color-ln-midnight) 12%,var(--color-ln-midnight) 35%,transparent 76%)}
.ln-native-footer h2{font-size:clamp(48px,6vw,96px)}
.ln-footer-lead .ln-button{margin-top:32px;padding:16px 24px}.ln-footer-lead>p{font-size:12px;line-height:20px;color:var(--color-ln-muted)}
.ln-footer-navigation{display:flex;align-items:flex-start;justify-content:space-between;gap:40px;margin-top:80px;padding-top:32px;border-top:1px solid color-mix(in srgb,var(--color-ln-muted) 16%,transparent)}
.ln-footer-brand{font-family:var(--font-ln-heading);font-size:36px;line-height:40px;letter-spacing:.12em;color:var(--color-ln-white);text-decoration:none}
.ln-footer-navigation nav{display:flex;gap:24px;flex-wrap:wrap}.ln-footer-navigation nav a,.ln-footer-navigation>a:last-child{font-size:12px;line-height:20px;color:var(--color-ln-muted);text-decoration:none}.ln-footer-navigation a:hover{color:var(--color-ln-lime)}
.ln-footer-meta{display:flex;justify-content:space-between;gap:24px;margin-top:0;padding-top:48px;font-family:var(--font-ln-data);font-size:12px;line-height:18px;color:var(--color-ln-muted)}.ln-footer-meta a{display:flex;gap:8px;align-items:center;color:inherit;text-decoration:none}
/* Actual measured widths are consumed by the single GSAP ScrollTrigger. */
[data-story-mode="horizontal"] .ln-story-pin{height:100svh;overflow:clip}
[data-story-mode="horizontal"] .ln-scene-layer,[data-story-mode="horizontal"] .ln-annotation-layer,[data-story-mode="horizontal"] .ln-controls-mount,[data-story-mode="horizontal"] .ln-navigation-layer{position:absolute;inset:0;margin:0;height:100%}
[data-story-mode="horizontal"] .ln-horizontal-viewport{position:absolute;inset:0;overflow:clip}
[data-story-mode="horizontal"] .ln-horizontal-track{display:flex;width:max-content;height:100%;will-change:transform}
[data-story-mode="horizontal"] .ln-chapter{flex:0 0 100vw;height:100%;min-height:0;overflow:clip}
[data-story-mode="horizontal"] .ln-work{flex-basis:140vw}
[data-story-mode="horizontal"] .ln-story-content{position:absolute;left:clamp(24px,4.5vw,88px);top:126px}
[data-story-mode="horizontal"] .ln-hero-copy{position:relative;left:auto;top:auto}
[data-story-mode="horizontal"] .ln-manifesto-copy{width:90vw}
[data-story-mode="horizontal"] .ln-manifesto h2{font-size:clamp(72px,8vw,128px)}
[data-story-mode="horizontal"] .ln-work-content{width:58vw}
[data-story-mode="horizontal"] .ln-expertise-copy,[data-story-mode="horizontal"] .ln-technology-copy{width:40vw}
[data-story-mode="horizontal"] .ln-expertise-copy h2,[data-story-mode="horizontal"] .ln-technology-copy h2{font-size:clamp(60px,6vw,96px)}
[data-story-mode="horizontal"] .ln-capability-list{display:none}
[data-story-mode="horizontal"] .ln-studio-copy{width:90vw}
[data-story-mode="horizontal"] .ln-studio-copy h2{font-size:clamp(64px,7vw,112px)}
[data-story-mode="horizontal"] .ln-studio-copy h2>span+span{margin-top:32px;margin-left:36vw}
[data-story-mode="horizontal"] .ln-studio-copy>p{position:absolute;left:0;top:40svh}
[data-story-mode="horizontal"] .ln-contact-copy{width:53vw}
[data-story-mode="vertical"] .ln-projected-callouts,[data-story-mode="vertical"] .ln-annotation-lines{display:none}
.ln-narrative[data-reduced="true"] .ln-scene-layer{opacity:.3}
.ln-narrative[data-reduced="true"]>.ln-space::before{transform:none}
.ln-narrative[data-reduced="true"] .ln-engine-hotspots{display:none}
.ln-narrative[data-reduced="true"] .ln-story-content{max-width:900px}
@media(max-height:820px) and (min-width:1024px){
  .ln-narrative .ln-hero-copy{padding-top:32px;padding-bottom:24px}.ln-narrative .ln-hero-copy h1{font-size:clamp(72px,7.8vw,112px)}.ln-narrative .ln-copy-footnote{display:none}
  [data-story-mode="horizontal"] .ln-story-content{top:110px}[data-story-mode="horizontal"] .ln-hero-copy{top:auto}
  [data-story-mode="horizontal"] .ln-manifesto h2{font-size:clamp(64px,7vw,96px)}.ln-manifesto h2 span:last-child{margin-top:20px}.ln-manifesto-copy>p{margin-top:24px}
  .ln-work-content h2{font-size:48px}.ln-work-gallery[data-interactive="true"] .ln-work-stages{height:300px}
  [data-story-mode="horizontal"] .ln-expertise-copy h2,[data-story-mode="horizontal"] .ln-technology-copy h2{font-size:72px}
  [data-story-mode="horizontal"] .ln-studio-copy h2{font-size:clamp(64px,6.5vw,96px)}
  .ln-narrative .ln-controls-drawer{bottom:24px}.ln-story-engine .ln-stage-help{bottom:142px}.ln-story-engine .ln-stage-marker-bottom{bottom:170px}
}
@media(max-width:1023px){
  .ln-story-pin{--ln-engine-x:50%;--ln-engine-y:28%;--ln-engine-scale:.8}
  .ln-narrative .ln-header{display:flex;justify-content:space-between;gap:12px;margin:12px 16px;padding:16px 20px;border-radius:20px}
  .ln-narrative .ln-desktop-nav,.ln-narrative .ln-contact-cta{display:none}.ln-narrative .ln-menu-toggle{display:flex}
  .ln-chapter,.ln-chapter.ln-hero{display:block;max-width:none;min-height:100svh;padding:46svh 24px 96px}
  .ln-engine-reference{display:none}.ln-narrative .ln-hero-copy{padding:24px 0 0}.ln-narrative .ln-hero-copy h1{font-size:clamp(52px,12vw,100px)}
  .ln-narrative .ln-copy-footnote{display:none}.ln-narrative .ln-subtitle{font-size:16px;line-height:26px;max-width:480px}.ln-narrative .ln-desktop-break{display:none}
  .ln-story-content{position:relative;max-width:none;width:100%}.ln-story-content h2{font-size:clamp(48px,8vw,96px)}.ln-story-eyebrow{margin-bottom:16px}
  .ln-story-content>p{font-size:16px;line-height:26px;max-width:480px;margin:24px 0}
  .ln-story-engine .ln-stage-marker-top{top:98px;right:16px;font-size:10px}.ln-story-engine .ln-stage-marker-bottom{left:16px;top:42svh;bottom:auto;font-size:10px}
  .ln-story-engine .ln-stage-help{display:none}.ln-story-engine .ln-aperture{width:120vw}
  .ln-narrative .ln-controls-drawer{right:16px;bottom:16px;width:calc(100vw - 32px);max-width:720px}
  .ln-drawer-toggle{display:flex;gap:20px;align-items:center;justify-content:space-between;margin-left:auto;padding:12px 16px;border:1px solid color-mix(in srgb,var(--color-ln-muted) 30%,transparent);border-radius:8px;background:var(--color-ln-glass);color:var(--color-ln-lime);font-family:var(--font-ln-data);font-size:12px;line-height:20px;pointer-events:auto}
  .ln-controls-drawer[data-open="false"] .ln-hud{display:none}.ln-controls-drawer[data-open="true"]{opacity:1;transform:none}
  .ln-controls-drawer .ln-hud{position:absolute;right:0;bottom:56px;max-height:calc(55svh - 56px);overflow:auto;background:var(--color-ln-glass)}
  .ln-chapter-navigation{left:16px;bottom:16px;min-width:0;max-width:calc(100vw - 208px)}.ln-chapter-navigation p{font-size:10px}.ln-chapter-navigation p>span{margin-right:4px}.ln-chapter-dots{gap:0}.ln-chapter-dots a{width:18px;height:24px}.ln-global-progress{width:126px}.ln-skip-experience{font-size:9px;margin-top:4px}
  .ln-manifesto h2 span:nth-child(2){margin-left:0}.ln-manifesto h2 span:last-child{font-size:.8em;margin-top:24px}.ln-story-coordinate{font-size:10px}
  .ln-work-content h2{font-size:clamp(36px,7.6vw,64px)}.ln-work-gallery{margin-top:24px}.ln-work-gallery[data-interactive="true"] .ln-work-stages{height:380px}.ln-work-gallery[data-interactive="true"] .ln-study{width:86%;transform:translateX(calc(var(--study-offset,0)*65%)) translateZ(calc(var(--study-distance,0)*-120px)) rotateY(calc(var(--study-offset,0)*-8deg)) scale(calc(1 - min(var(--study-distance,0),2)*.13))}
  .ln-study-art--spatial>span{font-size:30px}.ln-study-art--identity strong{font-size:96px}.ln-study-art--worlds>span{font-size:30px}.ln-study-copy{padding:12px 16px}.ln-study-copy h3{font-size:20px;line-height:28px}.ln-study-copy .ln-text-button{font-size:10px}
  .ln-studio-copy h2>span+span{margin:24px 0 0}.ln-contact-thread{display:none}
  .ln-projected-callouts,.ln-annotation-lines{display:none}.ln-engine-hotspots button{width:28px;height:28px;font-size:10px}
  .ln-native-footer{padding:112px 24px 32px}.ln-native-footer h2{font-size:clamp(48px,8vw,72px)}.ln-footer-navigation{flex-direction:column;gap:24px;margin-top:48px}.ln-footer-navigation nav{gap:16px}.ln-footer-meta{flex-direction:column;font-size:10px;gap:16px}
  .ln-native-footer::before{height:520px;bottom:auto;opacity:.28;background-size:auto 100%;mask-image:linear-gradient(to bottom,transparent,var(--color-ln-midnight) 16%,transparent 92%)}
}
@media(prefers-reduced-motion:reduce){
  .ln-horizontal-track{will-change:auto}.ln-story-content h2 span,.ln-headline-line{transform:none!important}
}
@media(min-width:768px) and (max-width:1023px){
  .ln-chapter-navigation{top:106px;bottom:auto;left:24px}
}
@keyframes ln-story-word-reveal{from{transform:translateY(110%) rotateX(12deg) skewY(2deg)}to{transform:translateY(0) rotateX(0) skewY(0)}}
@media(prefers-reduced-motion:no-preference){.ln-narrative .ln-headline-line>span{animation-name:ln-story-word-reveal}}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/story/storyMath.ts">
<![CDATA[export const CHAPTERS=[
  {id:"hero",label:"Reality"},{id:"manifesto",label:"Manifesto"},{id:"work",label:"Selected Work"},
  {id:"expertise",label:"Expertise"},{id:"technology",label:"Technology"},{id:"studio",label:"Studio"},{id:"contact",label:"Contact"},
] as const;
export type ChapterId=(typeof CHAPTERS)[number]["id"];
export const clamp01=(v:number)=>Number.isFinite(v)?Math.max(0,Math.min(1,v)):0;
export const smooth=(v:number)=>{const t=clamp01(v);return t*t*t*(t*(t*6-15)+10);};
export const mix=(a:number,b:number,t:number)=>a+(b-a)*t;
export function mixAngle(a:number,b:number,t:number){return a+Math.atan2(Math.sin(b-a),Math.cos(b-a))*t;}
export function chapterPosition(distance:number,offsets:readonly number[]){
  if(!offsets.length||distance<=offsets[0])return 0;
  for(let i=0;i<offsets.length-1;i++)if(distance<offsets[i+1])return i+clamp01((distance-offsets[i])/Math.max(1,offsets[i+1]-offsets[i]));
  return offsets.length-1;
}
export function dominantChapter(distance:number,viewport:number,offsets:readonly number[],sizes:readonly number[]){
  let result=0,largest=-1;
  for(let i=0;i<offsets.length;i++){const overlap=Math.max(0,Math.min(distance+viewport,offsets[i]+sizes[i])-Math.max(distance,offsets[i]));if(overlap>largest){largest=overlap;result=i;}}
  return result;
}
export function interactionWeight(position:number,origin:number,entry:number,release:number,dragging=false){
  if(dragging)return 1;
  const spatial=1-smooth((Math.abs(position-origin)-.12)/.7);
  return smooth(entry)*(1-smooth(release))*spatial;
}
export function chapterWeight(position:number,index:number,width=.8){return 1-smooth(Math.abs(position-index)/width);}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/story/useHorizontalStory.ts">
<![CDATA["use client";
import {useEffect,type RefObject} from "react";
import type {gsap} from "gsap";
import type {EngineExperienceApi,StoryNavigation} from "./experienceTypes";
import {CHAPTERS,chapterPosition,dominantChapter,type ChapterId} from "./storyMath";
import type {StoryInput} from "./chapterPoseMap";
import {adjacentChapter,ChapterWheelGesture,nestedWheelScroll,ownsChapterKeys} from "./chapterNavigation";

export type StorySample=StoryInput&{active:number;distance:number;horizontal:boolean;workOffset:number;workOverflow:number};
type Props={shell:RefObject<HTMLElement|null>;pin:RefObject<HTMLDivElement|null>;track:RefObject<HTMLDivElement|null>;hero:RefObject<HTMLDivElement|null>;engine:RefObject<EngineExperienceApi|null>;navigation:RefObject<StoryNavigation|null>;onSample:(sample:StorySample)=>void;onMode:(horizontal:boolean,reduced:boolean)=>void};
export function useHorizontalStory(props:Props){
  const {shell:shellRef,pin:pinRef,track:trackRef,hero:heroRef,engine,navigation:navigationRef,onSample,onMode:modeChanged}=props;
  useEffect(()=>{
    const shell=shellRef.current,pin=pinRef.current,track=trackRef.current;if(!shell||!pin||!track)return;
    const chapters=Array.from(track.querySelectorAll<HTMLElement>("[data-chapter]"));
    const desktop=matchMedia("(min-width:1024px)"),reduced=matchMedia("(prefers-reduced-motion:reduce)");
    let alive=true,generation=0,horizontal=false,raf=0,refreshRaf=0,resizeTimer=0,initialized=false,changingMode=false;
    let resizePosition:number|null=null;
    let tween:gsap.core.Tween|null=null,context:gsap.Context|null=null,navTween:gsap.core.Tween|null=null;
    let library:typeof import("gsap").gsap|null=null,suspended=false;
    const wheelGesture=new ChapterWheelGesture();let slideTarget:number|null=null;
    let restoreRefresh:(()=>void)|null=null;
    let offsets:number[]=[],sizes:number[]=[],travel=1,docTop=0,currentPosition=0,currentDistance=0,measuredWidth=innerWidth,measuredHeight=innerHeight;
    let heroFrame={x:.72,y:.46,scale:.68,heightRatio:.68};
    const measure=()=>{
      measuredWidth=innerWidth;measuredHeight=innerHeight;
      offsets=chapters.map(el=>horizontal?el.offsetLeft:el.offsetTop);sizes=chapters.map(el=>horizontal?el.offsetWidth:el.offsetHeight);
      travel=horizontal?Math.max(1,track.scrollWidth-pin.clientWidth):Math.max(1,offsets.at(-1)??1);
      docTop=shell.getBoundingClientRect().top+window.scrollY;
      if(innerWidth<1024)heroFrame={x:.5,y:.28,scale:Math.min(.9,.4*Math.max(1,innerHeight/innerWidth)),heightRatio:.4};
      else{
        const el=heroRef.current;
        if(el&&el.offsetHeight){const h=el.offsetHeight,w=el.offsetWidth,full=Math.max(3.7,3.7*innerHeight/innerWidth),local=Math.max(3.7,3.7*h/w);heroFrame={x:(el.offsetLeft+w/2)/innerWidth,y:(el.offsetTop+h/2)/innerHeight,scale:h*full/(local*innerHeight),heightRatio:h/innerHeight};shell.style.setProperty("--ln-aperture-width",`${w*1.4}px`);}
      }
    };
    const update=(distance:number)=>{
      if(!alive||changingMode||resizePosition!==null||horizontal!==(innerWidth>=1024&&!reduced.matches)||measuredWidth!==innerWidth||measuredHeight!==innerHeight)return;
      currentDistance=Math.max(0,Math.min(travel,distance));currentPosition=chapterPosition(currentDistance,offsets);
      const workOverflow=horizontal?Math.max(1,sizes[2]-innerWidth):Math.max(1,innerHeight*.5);
      const workOffset=horizontal?currentDistance-offsets[2]:currentDistance-offsets[2]-innerHeight*.15;
      const input={position:currentPosition,progress:currentDistance/travel,compact:innerWidth<1024,hero:heroFrame,workProgress:Math.max(0,Math.min(1,workOffset/workOverflow))};
      engine.current?.setNarrativeFrame(input);
      onSample({...input,active:dominantChapter(currentDistance,horizontal?innerWidth:innerHeight,offsets,sizes),distance:currentDistance,horizontal,workOffset,workOverflow});
    };
    const targetFor=(position:number)=>{const index=Math.min(6,Math.floor(position));return (offsets[index]??0)+(index<6?(position-index)*((offsets[index+1]??offsets[index])-offsets[index]):0);};
    const moveTo=(top:number,focus?:HTMLElement|null,instant=false,destination:number|null=null)=>{
      navTween?.kill();navTween=null;
      top=Math.max(0,Math.min(top,document.documentElement.scrollHeight-innerHeight));
      slideTarget=destination;
      if(reduced.matches||instant||!library){slideTarget=null;window.scrollTo({top,behavior:"instant"});focus?.focus({preventScroll:true});return;}
      const value={y:window.scrollY};navTween=library.to(value,{y:top,duration:1.15,ease:"power3.inOut",onUpdate:()=>window.scrollTo(0,value.y),onComplete:()=>{slideTarget=null;navTween=null;focus?.focus({preventScroll:true});}});
    };
    const navigate=(id:ChapterId,history=true)=>{
      const index=CHAPTERS.findIndex(c=>c.id===id);if(index<0)return;
      if(history)window.history.pushState({...window.history.state,lenusChapter:id},"",`#ln-${id}`);
      const start=horizontal?tween?.scrollTrigger?.start??docTop:docTop;
      moveTo(start+(offsets[index]??0),chapters[index].querySelector<HTMLElement>("h1,h2"),false,index);
    };
    const footer=()=>{const el=document.getElementById("ln-footer");if(el)moveTo(el.getBoundingClientRect().top+scrollY,el.querySelector<HTMLElement>("h2"),false,7);};
    navigationRef.current={chapter:navigate,footer,suspend:value=>{suspended=value;if(value)wheelGesture.reset();navTween?.paused(value);if(!value&&!horizontal)update(window.scrollY-docTop);}};
    const step=(direction:number)=>{
      if(!initialized||changingMode||resizePosition!==null||suspended)return;
      const start=horizontal?tween?.scrollTrigger?.start??docTop:docTop;
      const inFooter=window.scrollY>start+travel+2;
      const position=inFooter?7:currentPosition;
      // A second input cannot queue several forward slides. A deliberate reverse
      // input can interrupt the current one and return smoothly to its source.
      if(slideTarget!==null&&Math.abs(slideTarget-position)>.015&&Math.sign(slideTarget-position)===direction)return;
      if(inFooter&&direction>0)return;
      const settled=slideTarget!==null&&Math.abs(slideTarget-position)<=.015?slideTarget:position;
      const next=inFooter?6:adjacentChapter(settled,direction);
      if(next===7){history.replaceState({...history.state},"","#ln-footer");footer();}
      else{history.replaceState({...history.state},"",`#ln-${CHAPTERS[next].id}`);navigate(CHAPTERS[next].id,false);}
    };
    const onScroll=()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;if(suspended)return;if(horizontal){const distance=Math.max(0,Math.min(travel,window.scrollY-(tween?.scrollTrigger?.start??docTop)));tween?.progress(distance/travel);update(distance);}else update(window.scrollY-docTop);});};
    const refresh=(preserve=false,position=currentPosition)=>{
      if(!alive||changingMode||horizontal!==(desktop.matches&&!reduced.matches))return;measure();
      if(horizontal&&tween?.scrollTrigger){
        tween.scrollTrigger.refresh();measure();
        if(preserve){const distance=targetFor(position);window.scrollTo({top:tween.scrollTrigger.start+distance,behavior:"instant"});tween.scrollTrigger.update();tween.progress(distance/travel);update(distance);}
      }else{if(preserve)window.scrollTo({top:docTop+targetFor(position),behavior:"instant"});update(window.scrollY-docTop);}
    };
    const settleResize=()=>{clearTimeout(resizeTimer);resizeTimer=window.setTimeout(()=>{const position=resizePosition;resizePosition=null;if(position!==null)refresh(true,position);},280);};
    const scheduleRefresh=()=>{cancelAnimationFrame(refreshRaf);refreshRaf=requestAnimationFrame(()=>refresh(false));};
    const setup=async()=>{
      const token=++generation,position=resizePosition??currentPosition;changingMode=true;
      if(initialized){resizePosition=position;settleResize();}
      context?.revert();context=null;tween=null;navTween?.kill();navTween=null;slideTarget=null;wheelGesture.reset();
      horizontal=desktop.matches&&!reduced.matches;shell.dataset.storyMode=horizontal?"horizontal":"vertical";
      modeChanged(horizontal,reduced.matches);currentDistance=0;measure();
      if(!initialized){changingMode=false;update(0);changingMode=true;}
      if(horizontal){
        const [{gsap:gsapLibrary},{ScrollTrigger}]=await Promise.all([import("gsap"),import("gsap/ScrollTrigger")]);
        if(!alive||token!==generation)return;library=gsapLibrary;library.registerPlugin(ScrollTrigger);
        // This route measures and preserves chapter position itself. A second,
        // delayed global resize refresh would restore the old pixel scroll value.
        ScrollTrigger.config({autoRefreshEvents:"visibilitychange,DOMContentLoaded,load"});
        restoreRefresh=()=>ScrollTrigger.config({autoRefreshEvents:"visibilitychange,DOMContentLoaded,load,resize"});
        context=library.context(()=>{
          tween=gsapLibrary.fromTo(track,{x:0},{x:()=>-travel,ease:"none",onUpdate:()=>update(-Number(gsapLibrary.getProperty(track,"x"))),scrollTrigger:{trigger:pin,start:"top top",end:()=>`+=${travel}`,pin:true,pinSpacing:true,scrub:true,anticipatePin:1,invalidateOnRefresh:true}});
        },shell);
        tween!.scrollTrigger!.refresh();measure();
      }
      if(!alive||token!==generation)return;changingMode=false;
      const hash=window.location.hash.slice(1),index=CHAPTERS.findIndex(c=>`ln-${c.id}`===hash);
      const desired=!initialized&&index>=0?index:position,liveTween=tween as gsap.core.Tween|null;initialized=true;
      if(desired>0){const start=horizontal?liveTween?.scrollTrigger?.start??docTop:docTop;window.scrollTo({top:start+targetFor(desired),behavior:"instant"});if(horizontal){liveTween?.scrollTrigger?.update();liveTween?.progress(targetFor(desired)/travel);}update(targetFor(desired));}
      else update(horizontal?0:window.scrollY-docTop);
    };
    const onResize=()=>{resizePosition??=currentPosition;cancelAnimationFrame(refreshRaf);settleResize();};
    const onMode=()=>{void setup();};
    const onUserScroll=()=>{navTween?.kill();navTween=null;slideTarget=null;wheelGesture.reset();};
    const onWheel=(event:WheelEvent)=>{
      if(!horizontal||reduced.matches||suspended||changingMode||resizePosition!==null||!initialized||!library||event.defaultPrevented||event.ctrlKey||event.metaKey||event.altKey)return;
      const delta=(Math.abs(event.deltaY)>=Math.abs(event.deltaX)?event.deltaY:event.deltaX)*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1);
      if(!delta||nestedWheelScroll(event.target,delta))return;
      const start=tween?.scrollTrigger?.start??docTop,end=start+travel,now=performance.now();
      const inside=scrollY>=start-1&&scrollY<=end+1;
      const entering=delta<0&&scrollY>end&&scrollY+delta<=end;
      if(!inside&&!entering&&!wheelGesture.active(now)){onUserScroll();return;}
      if(inside&&scrollY<=start+1&&delta<0&&slideTarget===null&&!wheelGesture.active(now))return;
      event.preventDefault();const direction=wheelGesture.push(delta,now);if(direction)step(direction);
    };
    const onKey=(event:KeyboardEvent)=>{
      if(event.defaultPrevented||event.altKey||event.ctrlKey||event.metaKey||event.shiftKey||suspended||ownsChapterKeys(event.target))return;
      const direction=event.key==="ArrowRight"||horizontal&&event.key==="ArrowDown"?1:event.key==="ArrowLeft"||horizontal&&event.key==="ArrowUp"?-1:0;
      if(!direction||!initialized||changingMode||resizePosition!==null)return;
      const start=horizontal?tween?.scrollTrigger?.start??docTop:docTop;
      if(scrollY<start-1||scrollY>start+travel+innerHeight+2||scrollY>start+travel+2&&(direction>0||event.key==="ArrowUp"||event.key==="ArrowDown"))return;
      event.preventDefault();if(!event.repeat)step(direction);
    };
    const onHash=()=>{if(location.hash==="#ln-footer"){const el=document.getElementById("ln-footer");if(el)moveTo(el.getBoundingClientRect().top+scrollY);return;}const id=location.hash.replace(/^#ln-/,"") as ChapterId;if(CHAPTERS.some(c=>c.id===id))navigate(id,false);};
    const observer=new ResizeObserver(scheduleRefresh);observer.observe(track);if(heroRef.current)observer.observe(heroRef.current);
    window.addEventListener("scroll",onScroll,{passive:true});window.addEventListener("resize",onResize);window.addEventListener("hashchange",onHash);
    window.addEventListener("wheel",onWheel,{passive:false});window.addEventListener("keydown",onKey);window.addEventListener("touchstart",onUserScroll,{passive:true});
    window.addEventListener("pointerdown",onUserScroll,{passive:true});
    desktop.addEventListener("change",onMode);reduced.addEventListener("change",onMode);
    void setup();void document.fonts.ready.then(()=>{if(alive)scheduleRefresh();});
    return()=>{alive=false;generation++;context?.revert();restoreRefresh?.();navTween?.kill();wheelGesture.reset();observer.disconnect();cancelAnimationFrame(raf);cancelAnimationFrame(refreshRaf);clearTimeout(resizeTimer);window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",onResize);window.removeEventListener("hashchange",onHash);window.removeEventListener("wheel",onWheel);window.removeEventListener("keydown",onKey);window.removeEventListener("touchstart",onUserScroll);window.removeEventListener("pointerdown",onUserScroll);desktop.removeEventListener("change",onMode);reduced.removeEventListener("change",onMode);navigationRef.current=null;};
  },[shellRef,pinRef,trackRef,heroRef,engine,navigationRef,onSample,modeChanged]);
}
]]>
    </file>
    <file path="src/app/(lenus)/lenus/story/WorkGallery.tsx">
<![CDATA["use client";
import {useEffect,useImperativeHandle,useRef,useState,type Ref} from "react";
import {ArrowLeft,ArrowRight,ArrowUpRight} from "lucide-react";
import {gsap} from "gsap";
import {clamp01} from "./storyMath";
export const WORK_STUDIES=[
  {id:"spatial",name:"Spatial Experiences",subtitle:"An idea you can step inside.",description:"A study in spatial storytelling: a sequence of thresholds, changing perspectives and moments of discovery."},
  {id:"identity",name:"Living Identities",subtitle:"A character, always becoming.",description:"A study in identity as a responsive system. Type, rhythm and interaction make room for a brand to move."},
  {id:"worlds",name:"Interactive Worlds",subtitle:"Possibility, made navigable.",description:"A study in exploration. A connected landscape responds to curiosity and lets the visitor choose a path."},
] as const;
export type GalleryApi={setPosition:(position:number,exhibition:number)=>void};
export default function WorkGallery({ref,motion,suspended,onOpen,onAim}:{ref:Ref<GalleryApi>;motion:boolean;suspended:boolean;onOpen:(index:number)=>void;onAim:(progress:number|null)=>void}){
  const [active,setActive]=useState(0);const root=useRef<HTMLDivElement>(null),cards=useRef<(HTMLElement|null)[]>([]);
  const value=useRef({index:0}),manual=useRef(false),pointer=useRef<{id:number;x:number;index:number}|null>(null),tween=useRef<gsap.core.Tween|null>(null),index=useRef(0);
  const apply=(position:number)=>{
    value.current.index=Math.max(0,Math.min(2,position));const next=Math.round(value.current.index);
    if(next!==index.current){index.current=next;setActive(next);}
    cards.current.forEach((card,i)=>{if(!card)return;const d=i-value.current.index;card.style.setProperty("--study-offset",String(d));card.style.setProperty("--study-distance",String(Math.abs(d)));card.style.zIndex=String(20-Math.round(Math.abs(d)*5));});
    root.current?.style.setProperty("--study-progress",String(value.current.index/2));
    onAim(manual.current?value.current.index/2:null);
  };
  useImperativeHandle(ref,()=>({setPosition(position,exhibition){if(position<1.65||position>3.05)manual.current=false;if(!manual.current&&!pointer.current){tween.current?.kill();apply(clamp01(exhibition)*2);}}}));
  useEffect(()=>{tween.current?.paused(suspended);},[suspended]);
  useEffect(()=>()=>{tween.current?.kill();},[]);
  const navigate=(next:number)=>{manual.current=true;tween.current?.kill();tween.current=gsap.to(value.current,{index:Math.max(0,Math.min(2,next)),duration:motion?.65:0,ease:"power3.inOut",onUpdate:()=>apply(value.current.index)});};
  return <div className="ln-work-gallery" ref={root} data-interactive={motion} aria-roledescription="gallery" aria-label="Conceptual work studies">
    <div className="ln-work-stages" onPointerDown={event=>{if((event.target as HTMLElement).closest("button,a"))return;pointer.current={id:event.pointerId,x:event.clientX,index:value.current.index};event.currentTarget.setPointerCapture(event.pointerId);tween.current?.kill();event.stopPropagation();}} onPointerMove={event=>{if(!pointer.current)return;manual.current=true;apply(pointer.current.index+(pointer.current.x-event.clientX)/260);}} onPointerUp={()=>{if(pointer.current){pointer.current=null;navigate(Math.round(value.current.index));}}} onPointerCancel={()=>{pointer.current=null;navigate(Math.round(value.current.index));}}>
      {WORK_STUDIES.map((study,i)=><article key={study.id} ref={el=>{cards.current[i]=el;}} className={`ln-study ln-study--${study.id}`} aria-label={`${study.name}, concept study`} inert={motion&&active!==i}>
        <div className={`ln-study-art ln-study-art--${study.id}`} aria-hidden="true">
          {i===0?<><div className="ln-spatial-floor"/>{[0,1,2,3].map(n=><i key={n} className="ln-spatial-frame" style={{"--frame":n} as React.CSSProperties}/>)}<span>SPACE<br/>TO DISCOVER.</span></>:i===1?<><strong>IN</strong><strong>FORM.</strong><i/><small>A LIVING SYSTEM / 02</small></>:<><svg viewBox="0 0 600 320">{Array.from({length:20},(_,j)=><path key={j} d={Array.from({length:31},(_,k)=>`${k===0?"M":"L"}${k*20} ${(80+j*9+Math.sin(k*.4+j*.16)*Math.sin(j*.16)*55).toFixed(3)}`).join(" ")} fill="none" stroke="currentColor" strokeWidth=".7"/>)}</svg><span>WORLDS<br/>WITHIN REACH.</span><i className="ln-world-beacon"/></>}
        </div>
        <div className="ln-study-copy"><span className="ln-story-eyebrow">CONCEPT STUDY / 0{i+1}</span><h3>{study.name}</h3><p>{study.subtitle}</p><button type="button" className="ln-text-button" onClick={()=>onOpen(i)}>EXPLORE THE STUDY <ArrowUpRight size={16} aria-hidden="true"/></button></div>
      </article>)}
    </div>
    <div className="ln-gallery-controls"><span>{String(active+1).padStart(2,"0")} / 03</span><span className="ln-gallery-line"><i/></span><button type="button" className="ln-icon-button" aria-label="Previous study" disabled={active===0} onClick={()=>navigate(active-1)}><ArrowLeft size={20}/></button><button type="button" className="ln-icon-button" aria-label="Next study" disabled={active===2} onClick={()=>navigate(active+1)}><ArrowRight size={20}/></button></div>
    <p className="ln-work-note">Conceptual explorations, not client commissions.</p>
  </div>;
}
]]>
    </file>
  </files>
</template>
