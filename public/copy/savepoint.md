<template slug="savepoint" name="SAVEPOINT.">
  <dependencies>
    {
      "dependencies": {
        "three": "^0.186.1",
        "@types/three": "^0.186.0",
        "gsap": "^3.15.0",
        "zustand": "^5.0.16"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(savepoint)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, IBM_Plex_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import './savepoint/savepoint.css';
const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });
const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono' });
const sans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans' });
export const metadata: Metadata = { title: 'SAVEPOINT. — Every cartridge holds a world.', description: 'Ten strange little universes. One console. An interactive archive of imaginary games.', icons: { icon: '/templates/savepoint/icon.svg' } };
export const viewport: Viewport = { themeColor: '#121419', width: 'device-width', initialScale: 1 };
export default function Layout({ children }: {
    children: React.ReactNode;
}) { return <html lang="en" className={`${display.variable} ${mono.variable} ${sans.variable}`}><body>{children}</body></html>; }
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/page.tsx">
<![CDATA['use client';
import SavepointApp from './SavepointApp';
export default function Page() { return <SavepointApp />; }
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/savepoint.css">
<![CDATA[@import "tailwindcss";
:root{--bg:#121419;--bg-deep:#0B0D12;--surface:#1B1F28;--surface-elevated:#252934;--text:#F2F0E8;--text-muted:#A9ADB7;--border:rgba(242,240,232,.15);--accent:#CDF266;--violet:#7971B7;--coral:#F47D62;--ease-out:cubic-bezier(.22,1,.36,1);--ease-cinema:cubic-bezier(.76,0,.18,1)}
*{box-sizing:border-box}html,body{margin:0;background:var(--bg);color:var(--text)}body{font-family:var(--font-sans),Arial,sans-serif}button,a{-webkit-tap-highlight-color:transparent}button{cursor:pointer;font:inherit}button:disabled{cursor:default}a{color:inherit;text-decoration:none}button:focus-visible,a:focus-visible{outline:2px solid var(--accent);outline-offset:6px}.utility{font:10px var(--font-mono),monospace;letter-spacing:.09em}.archive-hero{min-height:100dvh;display:flex;flex-direction:column;overflow:hidden;background:radial-gradient(ellipse at 50% 55%,#25293466,transparent 55%)}.site-header{height:90px;margin:0 4%;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:24px}.wordmark{display:flex;gap:10px;align-items:center;font:700 23px var(--font-display),sans-serif;letter-spacing:-1px}.wordmark span{color:var(--accent);margin-left:-9px}.header-center{color:var(--text-muted);font-size:9px}.status{display:flex;gap:10px;align-items:center}.status i{width:5px;height:5px;border-radius:50%;background:var(--accent);box-shadow:0 0 12px #cdf26666}.hero-type{text-align:center;padding:42px 16px 0;transition:opacity .4s}.eyebrow{display:flex;align-items:center;justify-content:center;gap:16px;color:var(--text-muted);font-size:9px}.eyebrow span{width:25px;height:1px;background:var(--border)}.hero-type h1{font:500 clamp(36px,5vw,78px)/.98 var(--font-display),sans-serif;letter-spacing:-.055em;margin:24px 0 20px}.hero-type h1 span{color:var(--text-muted)}.support{font-size:12px;color:var(--text-muted);line-height:1.7}.mobile-break{display:none}.stage{position:relative;width:100%;height:clamp(220px,34dvh,420px);flex:1;min-height:230px}.archive-canvas{display:block;width:100%;height:100%;touch-action:pan-y;outline:none}.stage-rule{position:absolute;top:28px;left:4%;right:4%;display:flex;justify-content:space-between;font:8px var(--font-mono),monospace;letter-spacing:.12em;color:#7d828f;pointer-events:none}.rail-baseline{position:absolute;bottom:13%;left:4%;right:4%;height:1px;background:linear-gradient(90deg,transparent,var(--border),transparent);pointer-events:none}.arrow{position:absolute;top:50%;width:48px;height:48px;border:1px solid var(--border);border-radius:50%;background:var(--bg);color:var(--text);font-size:22px;transition:background .2s}.arrow:hover{background:var(--surface-elevated)}.previous{left:4%}.next{right:4%}.archive-bottom{text-align:center;padding:0 4% 23px}.caption-mask{overflow:hidden}.caption-content{animation:caption-enter .55s var(--ease-out)}@keyframes caption-enter{from{transform:translateY(calc(var(--caption-direction)*105%))}to{transform:translateY(0)}}.caption .utility{display:flex;align-items:center;justify-content:center;gap:12px;color:var(--accent)}.caption .utility span{color:var(--text-muted)}.caption i{height:10px;width:1px;background:var(--border);margin:0 5px}.caption h2{font:500 29px var(--font-display),sans-serif;letter-spacing:-1px;margin:9px 0 5px}.genre{font:9px var(--font-mono),monospace;color:var(--text-muted);text-transform:uppercase;letter-spacing:.08em}.boot-button{display:inline-flex;gap:48px;justify-content:space-between;margin-top:19px;padding:16px 22px;background:var(--accent);color:var(--bg-deep);border:0;font:500 10px var(--font-mono),monospace;letter-spacing:.06em}.boot-button:hover{background:var(--text)}.instruction{font-size:8px;letter-spacing:.14em;color:var(--text-muted);margin:14px 0 30px}.bottom-line{border-top:1px solid var(--border);padding-top:18px;display:flex;justify-content:space-between;color:#7d828f;font-size:8px}.is-busy .hero-type,.is-busy .archive-bottom,.is-busy .stage-rule,.is-busy .arrow,.is-busy .rail-baseline{opacity:0;pointer-events:none}.is-busy .stage{position:fixed;inset:0;z-index:10;height:100dvh}.boot-status{position:fixed;bottom:28px;left:0;right:0;text-align:center;z-index:30}.boot-status p{color:var(--accent)}.boot-status button{border:1px solid var(--border);background:var(--bg);color:var(--text);padding:12px 22px;font:10px var(--font-mono),monospace;margin-top:12px}.screen-takeover{position:fixed;inset:0;z-index:20;visibility:hidden;pointer-events:none;background-size:cover;background-position:center;clip-path:inset(50%)}.screen-takeover.visible{visibility:visible}.game-detail{position:absolute;inset:0;overflow-y:auto;overscroll-behavior:contain;background:var(--bg-deep);pointer-events:auto;outline:none}.world-plate{position:absolute;inset:0 0 auto;height:100dvh;background-size:cover;background-position:center}.world-plate:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,#0b0d1233,#0b0d1200 30%,#0b0d12 100%),linear-gradient(90deg,#0b0d1299,transparent)}.world-header{position:relative;z-index:1;display:flex;align-items:center;justify-content:space-between;padding:24px 4%;gap:16px;font:10px var(--font-mono),monospace}.world-header button,.game-detail nav button{background:#121419bb;color:var(--text);border:1px solid var(--border);padding:15px;font:10px var(--font-mono),monospace}.game-detail article{position:relative;z-index:1;padding:clamp(180px,38dvh,450px) 7% 70px;max-width:1500px;margin:auto}.game-detail article>.utility{color:var(--world-accent);font-size:10px}.game-detail h1{font:500 clamp(50px,9vw,140px)/1 var(--font-display),sans-serif;letter-spacing:-.06em;text-transform:uppercase;margin:22px 0}.tagline{font-size:clamp(16px,2vw,25px)}.description{max-width:600px;font-size:15px;line-height:1.9;color:var(--text-muted)}.world-notes{margin-top:100px;max-width:650px}.world-notes h2,.archive-data h2{font:11px var(--font-mono),monospace;color:var(--world-accent);letter-spacing:.1em}.world-notes p{line-height:1.9;color:var(--text-muted);font-size:14px}.archive-data{display:flex;flex-wrap:wrap;gap:24px;border-block:1px solid var(--border);padding:30px 0;margin:45px 0;font:10px var(--font-mono),monospace}.game-detail nav{display:flex;justify-content:space-between;gap:12px}.motion-fallback{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--bg);font-size:10px}.motion-fallback img{width:200px;max-height:70%;object-fit:contain}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}@media(max-height:800px) and (min-width:768px){.site-header{height:72px}.hero-type{padding-top:27px}.hero-type h1{font-size:57px;margin:17px 0 12px}.stage{min-height:210px}.instruction{margin-bottom:22px}.caption h2{font-size:26px}.boot-button{margin-top:13px}}@media(max-width:767px){.site-header{height:72px}.wordmark{font-size:19px}.header-center{display:none}.status{font-size:7px}.hero-type{padding-top:38px}.eyebrow{font-size:7px;gap:8px}.eyebrow span{width:10px}.hero-type h1{font-size:clamp(33px,9vw,60px);margin-top:24px}.support{font-size:11px}.mobile-break{display:block}.stage{min-height:245px;max-height:36dvh}.stage-rule{font-size:7px;top:18px}.arrow{width:44px;height:44px;top:72%;background:#121419bb}.caption h2{font-size:27px}.bottom-line span:first-child{display:none}.instruction{margin-bottom:25px}.world-header{font-size:8px}.world-header button{font-size:8px}.game-detail article{padding-inline:6%}.game-detail nav button{font-size:8px}.archive-data{gap:18px}.game-detail h1{font-size:58px}}@media(prefers-reduced-motion:reduce){*,*:before,*:after{animation-duration:.01ms!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}
.archive-hero{height:100dvh}.stage{height:auto;min-height:0;max-height:none;flex:1 1 0}.archive-canvas{position:absolute;inset:0}.archive-bottom{flex-shrink:0}.hero-type,.site-header{flex-shrink:0}
.screen-takeover[data-visible="false"]{visibility:hidden}.world-header{position:sticky;top:0;background:linear-gradient(#0b0d12cc,transparent);z-index:3}.game-detail article{padding-top:clamp(140px,30dvh,350px)}

html{scroll-behavior:smooth;scroll-padding-top:24px;scrollbar-color:var(--surface-elevated) var(--bg-deep)}
::selection{background:var(--accent);color:var(--bg-deep)}
.header-nav{display:flex;gap:25px;color:var(--text-muted)}
.header-nav a:hover,.footer-bottom a:hover,.bottom-line a:hover{color:var(--accent)}
.editorial-section{padding:0 6%;scroll-margin-top:24px}
.section-rule{display:flex;justify-content:space-between;gap:20px;padding:25px 0;border-top:1px solid var(--border);color:var(--text-muted);font-size:9px}
.section-title{font:500 clamp(40px,6.4vw,96px)/1.01 var(--font-display),sans-serif;letter-spacing:-.04em;margin:70px 0 62px;text-wrap:balance}
.section-title span,.muted{color:var(--text-muted)}
.section-title.centered{text-align:center}
.device-story{padding-top:60px;padding-bottom:130px}
.hardware-studio{display:grid;grid-template-columns:minmax(0,1.45fr) minmax(300px,1fr);gap:7%;align-items:center}
.inspection-stage{position:relative;min-width:0;height:480px;background:var(--bg-deep);overflow:hidden}
.inspection-canvas{width:100%;height:100%;display:block}
.studio-label,.studio-bottom{position:absolute;left:25px;right:25px;display:flex;justify-content:space-between;align-items:center;z-index:1;pointer-events:none;font-size:9px;color:var(--text-muted)}
.studio-label{top:24px}.studio-label span:first-child{color:var(--text)}.studio-bottom{bottom:22px}
.studio-bottom button{pointer-events:auto;border:0;background:transparent;color:var(--text-muted);font:inherit;min-height:44px;padding:0 0 0 12px}
.studio-bottom button span{color:var(--accent);padding-left:15px}
.studio-bottom button:disabled{opacity:.4}
.inspection-fallback{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}
.inspection-options button{width:100%;display:grid;grid-template-columns:24px 1fr 20px;gap:12px;align-items:center;text-align:left;min-height:72px;padding:18px 0;background:transparent;border:0;border-bottom:1px solid var(--border);color:var(--text-muted);font:500 12px var(--font-mono),monospace;line-height:1.5}
.inspection-options button:first-child{border-top:1px solid var(--border)}
.inspection-options button[aria-pressed="true"]{color:var(--text)}
.inspection-options button[aria-pressed="true"]>span:first-child,.inspection-options button[aria-pressed="true"]>span:last-child{color:var(--accent)}
.inspection-options button:hover{color:var(--accent)}
.inspection-copy{font-size:14px;line-height:1.85;color:var(--text-muted);min-height:100px;max-width:48ch;margin-top:28px}
.study-detail{font-size:8px;color:var(--accent);line-height:1.8}
.hardware-plates{display:grid;grid-template-columns:1fr 1fr;gap:26px;margin-top:40px}
.hardware-plates figure{margin:0;min-width:0}
.hardware-plates figure>img,.shell-pair{width:100%;height:260px;object-fit:cover;display:block;background:var(--bg-deep)}
.shell-pair{display:flex;overflow:hidden}
.shell-pair img{width:50%;height:100%;object-fit:cover}
.hardware-plates figcaption{color:var(--text-muted);margin-top:14px;font-size:8px;line-height:1.6}
.about-archive{padding-bottom:160px}
.manifest-title{margin-block:85px 110px}.manifest-line{display:block;color:var(--text)!important}.manifest-line.muted{color:var(--text-muted)!important}
.manifest-composition{display:grid;grid-template-columns:1.15fr 1fr;gap:11%;align-items:center}
.manifest-images{height:650px;position:relative}
.manifest-images figure{position:absolute;margin:0}
.manifest-images img{width:100%;height:100%;object-fit:cover;display:block}
.manifest-world-back{top:0;left:0;width:90%;height:420px}
.manifest-world-front{bottom:0;right:-7%;width:67%;height:290px;border:8px solid var(--bg)}
.manifest-images figcaption{font-size:8px;letter-spacing:.1em;color:var(--text-muted);padding-top:12px}
.manifest-essay{max-width:500px;padding-block:30px}
.manifest-lead{font:400 clamp(24px,2.4vw,36px)/1.35 var(--font-display),sans-serif;letter-spacing:-.025em;margin-top:0}
.manifest-essay>p:not(.manifest-lead){color:var(--text-muted);font-size:14px;line-height:1.95}
.manifest-spec{display:flex;flex-direction:column;gap:28px;margin-top:40px;padding-top:28px;border-top:1px solid var(--border);font-size:9px;line-height:1.9;color:var(--text-muted)}
.manifest-spec>span:first-child{color:var(--accent)}
.world-gallery{padding-bottom:140px}
.catalog-heading{display:flex;justify-content:space-between;align-items:flex-end;gap:30px;margin:70px 0 45px}
.catalog-heading .section-title{margin:0}.catalog-heading>p{color:var(--text-muted);font-size:13px;line-height:1.8;padding-bottom:6px}
.catalog-filters{display:flex;flex-wrap:wrap;gap:8px;border-block:1px solid var(--border);padding:16px 0}
.catalog-filters button{font:9px var(--font-mono),monospace;color:var(--text-muted);background:transparent;border:1px solid transparent;min-height:44px;padding:12px 15px}
.catalog-filters button[aria-pressed="true"]{color:var(--bg-deep);background:var(--accent)}
.catalog-filters button:hover:not([aria-pressed="true"]){color:var(--text);border-color:var(--border)}
.catalog-count{color:var(--text-muted);font-size:8px;margin:24px 0 30px}
.catalog-entry{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:6%;padding-bottom:50px;margin-bottom:50px;border-bottom:1px solid var(--border);align-items:center}
.catalog-art{position:relative;aspect-ratio:1.85;overflow:hidden;background:var(--bg-deep)}
.catalog-world{width:100%;height:100%;object-fit:cover;display:block;transition:transform .65s var(--ease-out)}
.catalog-entry:hover .catalog-world{transform:scale(1.03)}
.catalog-label{position:absolute;right:22px;bottom:22px;width:27%;height:auto;transform:rotate(-7deg);box-shadow:6px 12px 22px #0b0d1280;border:3px solid #252934}
.catalog-art-code{position:absolute;top:18px;left:18px;padding:8px 10px;background:#0b0d12dd;color:var(--text);font-size:9px}
.catalog-copy{min-width:0}.catalog-meta{display:flex;gap:24px;color:var(--text-muted);font-size:9px}.catalog-meta span:first-child{color:var(--game-accent)}
.catalog-copy h3{font:500 clamp(30px,3vw,48px)/1.08 var(--font-display),sans-serif;letter-spacing:-.035em;margin:17px 0 12px;text-transform:uppercase}
.catalog-genre{color:var(--text-muted);text-transform:uppercase;font-size:8px;line-height:1.7}
.catalog-hook{font-size:13px;color:var(--text-muted);line-height:1.9;max-width:46ch;margin:22px 0 28px}
.catalog-actions{display:flex;gap:24px;flex-wrap:wrap}
.catalog-actions button{display:flex;gap:22px;justify-content:space-between;align-items:center;background:transparent;border:0;border-bottom:1px solid var(--border);color:var(--text);font:9px var(--font-mono),monospace;min-height:44px;padding:0 0 8px}
.catalog-actions button:last-child{color:var(--accent)}.catalog-actions button:hover{border-color:var(--accent)}
.site-footer{position:relative;padding-bottom:28px;text-align:center;background-color:var(--bg-deep);background-image:linear-gradient(180deg,rgba(11,13,18,.92) 0%,rgba(11,13,18,.68) 42%,rgba(11,13,18,.95) 100%),url('/templates/savepoint/footer-deck-wide.webp');background-position:center bottom;background-size:cover;background-repeat:no-repeat}
.site-footer .section-rule{text-align:left}
.site-footer .section-title{margin-top:100px;margin-bottom:45px}
.return-button{background:var(--accent);color:var(--bg-deep);border:0;padding:22px 25px;display:inline-flex;gap:65px;font:10px var(--font-mono),monospace}
.return-button:hover{background:var(--text)}
.footer-bottom{display:flex;align-items:center;justify-content:space-between;gap:28px;border-top:1px solid var(--border);margin-top:120px;padding-top:30px}
.footer-bottom>.utility{color:var(--text-muted);font-size:8px}
.footer-bottom nav{display:flex;gap:20px;font:9px var(--font-mono),monospace;color:var(--text-muted)}
.footer-legal{display:flex;justify-content:space-between;gap:20px;color:var(--text-muted);font-size:7px;margin-top:35px;line-height:1.8;text-align:left}
.custom-cursor{position:fixed;left:0;top:0;z-index:100;pointer-events:none;display:none}
.custom-cursor:before{content:'';position:absolute;width:28px;height:28px;left:-14px;top:-14px;border:1px solid #f2f0e899;border-radius:50%;transition:background .15s,border-color .15s}
.custom-cursor span{display:none}
@media(hover:hover) and (pointer:fine){.custom-cursor[data-visible="true"]{display:block}.custom-cursor[data-mode="spine"]:before{width:14px;height:14px;left:-7px;top:-7px;border-color:var(--accent)}.custom-cursor[data-mode="boot"]:before{width:68px;height:32px;left:-34px;top:-16px;border-radius:20px;background:var(--accent);border-color:var(--accent)}.custom-cursor[data-mode="boot"] span{position:absolute;display:block;left:-34px;top:-16px;width:68px;height:32px;text-align:center;line-height:32px;font:10px/32px var(--font-mono),monospace;color:var(--bg-deep)}}
@media(min-width:1700px){.editorial-section{padding-inline:max(6%,calc((100% - 1600px)/2))}.inspection-stage{height:560px}.hardware-plates figure>img,.shell-pair{height:320px}}
@media(max-width:1100px){.hardware-studio{gap:4%;grid-template-columns:minmax(0,1.25fr) minmax(280px,1fr)}.inspection-stage{height:430px}.inspection-options button{font-size:10px;gap:9px}.inspection-copy{font-size:12px}.manifest-composition{gap:8%;grid-template-columns:1fr 1fr}.manifest-images{height:570px}.manifest-world-back{height:350px}.manifest-world-front{height:250px}.footer-bottom{flex-wrap:wrap}.footer-bottom nav{margin-left:auto}.catalog-actions{gap:18px}.catalog-actions button{font-size:8px}}
@media(max-width:767px){.site-header{position:relative;height:88px;align-items:flex-start;padding-top:17px;gap:12px}.header-nav{position:absolute;bottom:13px;left:0;right:0;justify-content:space-between;font-size:8px;gap:12px}.status{padding-top:8px}.hero-type{padding-top:27px}.editorial-section{padding-inline:6%}.section-rule{font-size:7px;padding-block:20px;line-height:1.7}.section-title{font-size:clamp(36px,8.3vw,64px);margin:50px 0 38px;letter-spacing:-.035em}.device-story{padding-top:40px;padding-bottom:90px}.hardware-studio{display:flex;flex-direction:column;gap:30px}.inspection-stage{width:100%;height:360px}.inspection-controls{width:100%}.inspection-options button{font-size:10px;min-height:62px}.inspection-copy{min-height:0;font-size:13px;max-width:none}.studio-label,.studio-bottom{left:18px;right:18px;font-size:8px}.hardware-plates{grid-template-columns:1fr;gap:30px;margin-top:30px}.hardware-plates figure>img,.shell-pair{height:240px}.about-archive{padding-bottom:100px}.manifest-title{margin-block:55px 60px}.manifest-composition{grid-template-columns:1fr;gap:40px}.manifest-images{height:450px;margin-right:6%}.manifest-world-back{height:300px}.manifest-world-front{height:200px;width:70%;border-width:5px}.manifest-essay{max-width:none;padding-top:0}.manifest-lead{font-size:27px}.manifest-essay>p:not(.manifest-lead){font-size:13px}.manifest-spec{font-size:8px;gap:20px}.catalog-heading{display:block;margin:50px 0 30px}.catalog-heading>p{font-size:12px;margin-top:25px}.catalog-filters{gap:5px}.catalog-filters button{font-size:8px;padding-inline:10px}.catalog-entry{grid-template-columns:1fr;gap:26px;margin-bottom:35px;padding-bottom:35px}.catalog-copy h3{font-size:35px;margin-top:14px}.catalog-hook{font-size:13px;margin-block:18px}.catalog-actions{gap:30px}.catalog-actions button{font-size:9px}.catalog-label{right:18px;bottom:18px}.world-gallery{padding-bottom:55px}.site-footer .section-title{margin-top:60px}.return-button{gap:28px;padding:20px;font-size:9px}.footer-bottom{margin-top:80px;flex-direction:column;align-items:flex-start;gap:22px}.footer-bottom nav{margin-left:0;flex-wrap:wrap;gap:24px}.footer-legal{flex-direction:column;gap:10px;font-size:7px}.footer-bottom>.utility{font-size:8px}}
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/SavepointApp.tsx">
<![CDATA['use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import ArchiveStageCanvas from './components/ArchiveStageCanvas';
import ArchiveCaption from './components/ArchiveCaption';
import GameDetail from './components/GameDetail';
import MotionFallback from './components/MotionFallback';
import DeviceStory from './components/DeviceStory';
import AboutArchive from './components/AboutArchive';
import WorldGallery from './components/WorldGallery';
import SiteFooter from './components/SiteFooter';
import CustomCursor from './components/CustomCursor';
import { games } from './data/games';
import { useArchiveStore } from './hooks/useArchiveStore';
import type { SceneController } from './lib/archiveSceneEngine';
import type { ScreenProjection } from './lib/projection';
export default function SavepointApp() {
    const controller = useRef<SceneController | null>(null), overlay = useRef<HTMLDivElement>(null), bootButton = useRef<HTMLButtonElement>(null);
    const [failed, setFailed] = useState(false);
    const wasBusy = useRef(false);
    const cancelVisit = useRef<(() => void) | null>(null);
    const { activeIndex, phase, direction, select, setPhase } = useArchiveStore();
    const game = games[activeIndex];
    const busy = phase !== 'archive', detail = phase === 'game-detail';
    const project = useCallback((rect: ScreenProjection, p: number) => {
        const element = overlay.current;
        if (!element)
            return;
        element.dataset.visible = String(p > 0);
        const left = rect.left * (1 - p), top = rect.top * (1 - p), width = rect.width + (innerWidth - rect.width) * p, height = rect.height + (innerHeight - rect.height) * p;
        Object.assign(element.style, { left: `${left}px`, top: `${top}px`, right: 'auto', bottom: 'auto', width: `${width}px`, height: `${height}px` });
        element.style.clipPath = `polygon(${rect.points.map((point, index) => {
            const x = point.x + (index === 0 || index === 3 ? -point.x : innerWidth - point.x) * p;
            const y = point.y + (index < 2 ? -point.y : innerHeight - point.y) * p;
            return `${x - left}px ${y - top}px`;
        }).join(',')})`;
    }, []);
    const error = useCallback(() => {
        setFailed(true);
        useArchiveStore.getState().setPhase('archive');
    }, []);
    const restored = useCallback(() => setFailed(false), []);
    const step = (n: number) => {
        if (failed) {
            select(activeIndex + n);
        }
        else
            controller.current?.step(n);
    };
    const boot = () => {
        if (failed) {
            if (overlay.current) {
                Object.assign(overlay.current.style, { left: '0', top: '0', width: '100vw', height: '100dvh', clipPath: 'none' });
                overlay.current.dataset.visible = 'true';
            }
            setPhase('game-detail');
            const url = new URL(location.href);
            url.searchParams.set('game', games[useArchiveStore.getState().activeIndex].id);
            history.pushState({}, '', url);
        }
        else
            controller.current?.boot();
    };
    const back = () => {
        if (failed) {
            setPhase('archive');
            const url = new URL(location.href);
            url.searchParams.delete('game');
            history.pushState({}, '', url);
        }
        else
            controller.current?.back();
    };
    function visitArchive(index?: number, shouldBoot = false) {
        if (busy) return;
        cancelVisit.current?.();
        if (index !== undefined) {
            if (failed) select(index);
            else controller.current?.select(index);
        }
        const target = document.getElementById('archive')!.getBoundingClientRect().top + window.scrollY;
        let frame = 0;
        const cancel = () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('wheel', cancel);
            window.removeEventListener('touchstart', cancel);
            window.removeEventListener('pointerdown', cancel);
            window.removeEventListener('keydown', cancel);
            cancelVisit.current = null;
        };
        const settled = () => {
            if (Math.abs(window.scrollY - target) > 2) { frame = requestAnimationFrame(settled); return; }
            cancel();
            bootButton.current?.focus({ preventScroll: true });
            if (shouldBoot && index !== undefined) {
                if (failed) boot();
                else controller.current?.selectAndBoot(index);
            }
        };
        cancelVisit.current = cancel;
        window.addEventListener('wheel', cancel, { passive: true, once: true });
        window.addEventListener('touchstart', cancel, { passive: true, once: true });
        window.addEventListener('pointerdown', cancel, { passive: true, once: true });
        window.addEventListener('keydown', cancel, { once: true });
        window.scrollTo({ top: target, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
        frame = requestAnimationFrame(settled);
    }
    useEffect(() => () => cancelVisit.current?.(), []);
    useEffect(() => {
        const previous = document.body.style.overflow;
        if (busy)
            document.body.style.overflow = 'hidden';
        else if (wasBusy.current)
            bootButton.current?.focus({ preventScroll: true });
        wasBusy.current = busy;
        return () => { document.body.style.overflow = previous; };
    }, [busy]);
    useEffect(() => {
        if (!failed)
            return;
        const key = (event: KeyboardEvent) => {
            const state = useArchiveStore.getState();
            if (event.key === 'Escape' && state.phase !== 'archive') {
                state.setPhase('archive');
                const url = new URL(location.href);
                url.searchParams.delete('game');
                history.pushState({}, '', url);
                return;
            }
            const stage = document.querySelector('.stage')?.getBoundingClientRect();
            if (state.phase === 'archive' && stage && stage.bottom > 0 && stage.top < innerHeight && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
                event.preventDefault();
                state.select(state.activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
            }
        };
        const historyChange = () => {
            const index = games.findIndex(game => game.id === new URLSearchParams(location.search).get('game'));
            if (index < 0) { useArchiveStore.getState().setPhase('archive'); return; }
            useArchiveStore.getState().select(index);
            if (overlay.current) {
                Object.assign(overlay.current.style, { left: '0', top: '0', width: '100vw', height: '100dvh', clipPath: 'none' });
                overlay.current.dataset.visible = 'true';
            }
            useArchiveStore.getState().setPhase('game-detail');
        };
        window.addEventListener('keydown', key);
        window.addEventListener('popstate', historyChange);
        historyChange();
        return () => { window.removeEventListener('keydown', key); window.removeEventListener('popstate', historyChange); };
    }, [failed]);
    function changeWorld(n: number) {
        const index = (activeIndex + n + 10) % 10;
        if (!failed) {
            controller.current?.openWorld(index);
            return;
        }
        select(index);
        const url = new URL(location.href);
        url.searchParams.set('game', games[index].id);
        history.pushState({}, '', url);
    }
    return <><main className={`savepoint ${busy ? 'is-busy' : ''}`} data-phase={phase}><section id="archive" className="archive-hero" inert={busy}><header className="site-header"><a className="wordmark" href="#archive" aria-label="Savepoint archive"><svg width="23" height="25" viewBox="0 0 23 25" fill="none"><path d="M3 1h15l4 4v19H1V1h2Z" stroke="currentColor"/><path d="M6 1v8h11V1M6 24v-9h11v9" stroke="currentColor"/></svg>SAVEPOINT<span>.</span></a><nav className="header-nav utility" aria-label="Main"><a href="#archive">ARCHIVE</a><a href="#the-deck">THE DECK</a><a href="#manifest">MANIFEST</a><a href="#index">INDEX</a></nav><span className="status utility"><i />10 WORLDS / 01 CONSOLE</span></header><div className="hero-type" aria-hidden={busy}><p className="eyebrow utility"><span /> AN INTERACTIVE ARCHIVE OF ORIGINAL GAMES <span /></p><h1>EVERY CARTRIDGE<br /><span>HOLDS A WORLD.</span></h1><p className="support">Ten strange little universes. One console.<br className="mobile-break"/> Pick a cartridge and press start.</p></div><div className="stage"><div className="stage-rule"><span>COLLECTION — VOL. 01</span><span>1994—2003</span></div><ArchiveStageCanvas controller={controller} onProjection={project} onError={error} onRestore={restored}/>{failed && <MotionFallback game={game}/>}<div className="rail-baseline"/><button disabled={busy} className="previous arrow" aria-label="Previous cartridge" onClick={() => step(-1)}>←</button><button disabled={busy} className="next arrow" aria-label="Next cartridge" onClick={() => step(1)}>→</button></div><div className="archive-bottom"><ArchiveCaption game={game} direction={direction}/><button ref={bootButton} disabled={busy} className="boot-button" onClick={boot}>BOOT THIS GAME <span>↗</span></button><p className="utility instruction">CHOOSE A WORLD. INSERT TO BEGIN.</p><div className="bottom-line utility"><span>← → ARROWS TO NAVIGATE</span><span>DRAG TO BROWSE</span><a href="#the-deck">SCROLL TO DISCOVER ↓</a></div></div></section><div className="editorial-content" inert={busy}><DeviceStory/><AboutArchive/><WorldGallery onSelect={visitArchive}/></div><CustomCursor/>{busy && !detail && <div className="boot-status" role="status"><p className="utility">{phase.replaceAll('-', ' ').toUpperCase()}{phase === 'booting' ? ' / WORLD FOUND' : ''}</p>{phase !== 'returning' && <button onClick={() => controller.current?.skip()}>SKIP INTRO ↗</button>}</div>}<div ref={overlay} className={`screen-takeover ${phase === 'screen-expanding' || detail || phase === 'returning' ? 'visible' : ''}`} style={{ backgroundImage: `url(${game.worldUrl})` }}>{detail && <GameDetail game={game} back={back} previous={() => changeWorld(-1)} next={() => changeWorld(1)}/>}</div><div className="sr-only" aria-live="polite">{busy ? phase.replaceAll('-', ' ') : `${game.title}, ${game.year}, ${game.genre.join(', ')}`}</div></main><SiteFooter busy={busy} onReturn={() => visitArchive()}/></>;
}
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/components/AboutArchive.tsx">
<![CDATA['use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { assetUrl } from '../data/assets';

export default function AboutArchive() {
    const section = useRef<HTMLElement>(null);
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const media = gsap.matchMedia();
        media.add('(prefers-reduced-motion: no-preference)', () => {
            const context = gsap.context(() => {
                gsap.from('.manifest-line', { clipPath: 'inset(0 0 100% 0)', y: 24, stagger: .12, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.manifest-title', start: 'top 85%', once: true } });
                gsap.fromTo('.manifest-world-back', { yPercent: 6 }, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: section.current, start: 'top bottom', end: 'bottom top', scrub: 1 } });
                gsap.fromTo('.manifest-world-front', { yPercent: 12 }, { yPercent: -12, ease: 'none', scrollTrigger: { trigger: section.current, start: 'top bottom', end: 'bottom top', scrub: 1 } });
            }, section);
            return () => context.revert();
        });
        return () => media.revert();
    }, []);
    return <section ref={section} id="manifest" className="about-archive editorial-section" aria-labelledby="manifest-title">
        <div className="section-rule utility"><span>03 / THE MANIFEST</span><span>KEEP YOUR CURIOSITY.</span></div>
        <h2 id="manifest-title" className="section-title centered manifest-title"><span className="manifest-line">THE BEST WORLDS</span><span className="manifest-line">DON&apos;T ASK YOU</span><span className="manifest-line muted">TO HURRY.</span></h2>
        <div className="manifest-composition"><div className="manifest-images"><figure className="manifest-world-back"><img src={assetUrl('world-mossheart.webp')} alt="A tiny traveler beneath the luminous canopy of Mossheart" loading="lazy" width="2752" height="1536" /><figcaption className="utility">MOSSHEART / 1996</figcaption></figure><figure className="manifest-world-front"><img src={assetUrl('world-deep-current.webp')} alt="The submerged structures and open blue depths of Deep Current" loading="lazy" width="2752" height="1536" /><figcaption className="utility">DEEP CURRENT / 2000</figcaption></figure></div><div className="manifest-essay"><p className="manifest-lead">A world doesn&apos;t need to be endless to stay with you.</p><p>Sometimes it&apos;s a signal from a room you haven&apos;t found. A path through the trees that wasn&apos;t there yesterday. The quiet certainty that there&apos;s something beyond the edge of the screen.</p><p>SAVEPOINT is an imaginary collection built around that feeling. Ten self-contained worlds, each with its own weather, questions and small reasons to take the long way home.</p><p>We like the ritual, too. Reading a spine. Turning a cartridge over in your hands. Choosing one thing, putting it into the slot, and giving it your attention. A memory slot isn&apos;t just a place to keep your progress. It&apos;s a promise that you can come back.</p><div className="manifest-spec utility"><span>NO RUSH. NO FEED. JUST A WORLD.</span><span>10 ORIGINAL WORLDS<br />01 SHARED CARTRIDGE ARCHITECTURE<br />AS MANY DETOURS AS YOU NEED</span></div></div></div>
    </section>;
}
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/components/ArchiveCaption.tsx">
<![CDATA['use client';
import type { Game } from '../data/games';
export default function ArchiveCaption({ game, direction }: {
    game: Game;
    direction: number;
}) { return <div className="caption" aria-live="polite" style={{ '--caption-direction': direction } as React.CSSProperties}><div className="caption-mask"><div key={game.id} className="caption-content"><p className="utility">{game.indexNumber} <span>/ 10</span> <i /> {game.year}</p><h2>{game.title}</h2><p className="genre">{game.genre.join(' / ')}</p></div></div></div>; }
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/components/ArchiveStageCanvas.tsx">
<![CDATA['use client';
import { useEffect, useRef } from 'react';
import { createArchiveScene, type SceneController } from '../lib/archiveSceneEngine';
import type { ScreenProjection } from '../lib/projection';
export default function ArchiveStageCanvas({ controller, onProjection, onError, onRestore }: {
    controller: React.RefObject<SceneController | null>;
    onProjection: (rect: ScreenProjection, progress: number) => void;
    onError: () => void;
    onRestore: () => void;
}) {
    const canvas = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const element = canvas.current!;
        const fail = () => { controller.current?.dispose(); controller.current = null; onError(); };
        const initialize = () => {
            try {
                element.dataset.sceneReady = 'false';
                controller.current = createArchiveScene(element, onProjection, fail);
                onRestore();
            }
            catch {
                fail();
            }
        };
        element.addEventListener('webglcontextrestored', initialize);
        initialize();
        return () => { element.removeEventListener('webglcontextrestored', initialize); controller.current?.dispose(); controller.current = null; };
    }, [controller, onProjection, onError, onRestore]);
    return <canvas ref={canvas} className="archive-canvas" aria-label="Three-dimensional cartridge archive. Use the previous, next and boot buttons to explore."/>;
}
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/components/CustomCursor.tsx">
<![CDATA['use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const cursor = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const element = cursor.current!;
        const media = matchMedia('(hover: hover) and (pointer: fine)');
        let frame = 0, x = 0, y = 0;
        const hide = () => { element.dataset.visible = 'false'; };
        const move = (event: PointerEvent) => {
            if (!media.matches || event.pointerType === 'touch') { hide(); return; }
            x = event.clientX; y = event.clientY;
            const target = event.target as HTMLElement;
            const mode = target.closest<HTMLElement>('[data-cursor]')?.dataset.cursor ?? 'default';
            element.dataset.mode = mode;
            element.dataset.visible = 'true';
            if (!frame) frame = requestAnimationFrame(() => {
                element.style.transform = `translate3d(${x}px,${y}px,0)`;
                frame = 0;
            });
        };
        window.addEventListener('pointermove', move, { passive: true });
        document.documentElement.addEventListener('pointerleave', hide);
        window.addEventListener('blur', hide);
        window.addEventListener('scroll', hide, { passive: true });
        media.addEventListener('change', hide);
        return () => { cancelAnimationFrame(frame); window.removeEventListener('pointermove', move); document.documentElement.removeEventListener('pointerleave', hide); window.removeEventListener('blur', hide); window.removeEventListener('scroll', hide); media.removeEventListener('change', hide); };
    }, []);
    return <div ref={cursor} className="custom-cursor" aria-hidden="true"><span>BOOT</span></div>;
}
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/components/DeviceStory.tsx">
<![CDATA['use client';
import { useEffect, useRef, useState } from 'react';
import { createDeviceInspection } from '../lib/deviceInspection';
import { assetUrl } from '../data/assets';

const studies = [
    { title: 'INCLINED WIDE APERTURE', copy: 'A low wedge. A generous view. The landscape display tilts toward you, keeping the world close and the hardware quiet.', image: 'deck-01-three-quarter.png', detail: 'LANDSCAPE DISPLAY / INCLINED GLASS' },
    { title: 'TOP-LOADING SLOT CAVITY', copy: 'One deliberate downward motion. The recessed guides hold the cartridge on its vertical axis until the connector meets the contacts below.', image: 'deck-01-slot-detail.png', detail: 'VERTICAL INSERTION / RECESSED CONTACTS' },
    { title: 'TACTILE DECK CONTROLS', copy: 'Four small controls sit along the front lip. Nothing between your hands and the next detour, except the satisfying decision to begin.', image: 'deck-01-front.png', detail: 'FOUR FRONT-LIP CONTROLS / STATUS LED' },
    { title: 'VENTED POLYMER CHASSIS', copy: 'Charcoal polymer, a continuous base seam and narrow vent ribs. An object made to sit on a desk, and stay in a memory.', image: 'deck-01-three-quarter.png', detail: 'CHARCOAL POLYMER / RIBBED VENTILATION' },
];

export default function DeviceStory() {
    const canvas = useRef<HTMLCanvasElement>(null);
    const inspector = useRef<ReturnType<typeof createDeviceInspection> | null>(null);
    const settings = useRef({ angle: 0, wireframe: false });
    const [angle, setAngle] = useState(0), [wireframe, setWireframe] = useState(false), [failed, setFailed] = useState(false);
    useEffect(() => {
        const element = canvas.current!;
        const fail = (event: Event) => {
            event.preventDefault();
            inspector.current?.dispose();
            inspector.current = null;
            setFailed(true);
        };
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !inspector.current) {
                try {
                    inspector.current = createDeviceInspection(element);
                    inspector.current.inspect(settings.current.angle, settings.current.wireframe);
                } catch { setFailed(true); }
            }
            inspector.current?.setVisible(entry.isIntersecting);
        }, { rootMargin: '120px' });
        observer.observe(element);
        element.addEventListener('webglcontextlost', fail);
        return () => { observer.disconnect(); element.removeEventListener('webglcontextlost', fail); inspector.current?.dispose(); inspector.current = null; };
    }, []);
    useEffect(() => {
        settings.current = { angle, wireframe };
        inspector.current?.inspect(angle, wireframe);
    }, [angle, wireframe]);
    const study = studies[angle];
    return <section id="the-deck" className="device-story editorial-section" aria-labelledby="device-title">
        <div className="section-rule utility"><span>02 / THE HARDWARE</span><span>DECK/01 — OBJECT STUDY</span></div>
        <h2 id="device-title" className="section-title centered">ONE CONSOLE.<br /><span>INFINITE DETOURS.</span></h2>
        <div className="hardware-studio">
            <div className="inspection-stage">
                <div className="studio-label utility"><span>DECK/01</span><span>INTERACTIVE STUDY</span></div>
                <canvas ref={canvas} className="inspection-canvas" aria-label="DECK/01 inspection. Choose one of the four views below." />
                {failed && <img className="inspection-fallback" src={assetUrl(study.image)} alt="DECK/01 console reference" />}
                <div className="studio-bottom utility"><span>{String(angle + 1).padStart(2, '0')} / 04</span><button onClick={() => setWireframe(!wireframe)} aria-pressed={wireframe} disabled={failed}>WIREFRAME <span>{wireframe ? 'ON' : 'OFF'}</span></button></div>
            </div>
            <div className="inspection-controls">
                <div className="inspection-options" role="group" aria-label="Hardware inspection views">{studies.map((item, index) => <button key={item.title} aria-pressed={angle === index} onClick={() => setAngle(index)}><span className="utility">0{index + 1}</span><span>{item.title}</span><span aria-hidden="true">↗</span></button>)}</div>
                <p className="inspection-copy" aria-live="polite">{study.copy}</p>
                <p className="utility study-detail">{study.detail}</p>
            </div>
        </div>
        <div className="hardware-plates"><figure><img src={assetUrl(study.image)} alt={`Approved DECK/01 reference: ${study.title.toLowerCase()}`} loading="lazy" width="1536" height="1024" /><figcaption className="utility">FIG. A / {study.title}</figcaption></figure><figure><div className="shell-pair"><img src={assetUrl('cartridge-shell-front.png')} alt="Cartridge shell front with recessed label area" loading="lazy" width="1024" height="1024" /><img src={assetUrl('cartridge-shell-rear.png')} alt="Cartridge shell rear with grip ribs and screws" loading="lazy" width="1024" height="1024" /></div><figcaption className="utility">FIG. B / ONE SHELL. TEN IDENTITIES.</figcaption></figure></div>
    </section>;
}
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/components/GameDetail.tsx">
<![CDATA['use client';
import { useEffect, useRef } from 'react';
import type { Game } from '../data/games';
export default function GameDetail({ game, back, next, previous }: {
    game: Game;
    back: () => void;
    next: () => void;
    previous: () => void;
}) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const previous = document.activeElement as HTMLElement | null;
        ref.current?.focus();
        const key = (e: KeyboardEvent) => {
            if (e.key === 'Tab') {
                const buttons = ref.current?.querySelectorAll<HTMLButtonElement>('button');
                if (!buttons?.length)
                    return;
                const first = buttons[0], last = buttons[buttons.length - 1];
                if (e.shiftKey && (document.activeElement === first || document.activeElement === ref.current)) {
                    e.preventDefault();
                    last.focus();
                }
                else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener('keydown', key);
        return () => { document.removeEventListener('keydown', key); previous?.focus(); };
    }, []);
    return <div ref={ref} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="world-title" className="game-detail" style={{ '--world-accent': game.accent } as React.CSSProperties}><div className="world-plate" style={{ backgroundImage: `url(${game.worldUrl})` }}/><header className="world-header"><span>SAVEPOINT. / {game.archiveSpecs.catalogCode}</span><button onClick={back}>↖ BACK TO ARCHIVE</button></header><article><p className="utility">{game.year} / {game.genre.join(' · ')} / AN IMAGINARY GAME</p><h1 id="world-title">{game.title}</h1><p className="tagline">{game.tagline}</p><p className="description">{game.description}</p><div className="world-notes"><h2>WORLD NOTES</h2>{game.worldNotes.map(note => <p key={note}>{note}</p>)}</div><div className="archive-data"><h2>ARCHIVE DATA</h2>{Object.values(game.archiveSpecs).map(value => <span key={value}>{value}</span>)}</div><nav><button onClick={previous}>← PREVIOUS CARTRIDGE</button><button onClick={next}>NEXT CARTRIDGE →</button></nav></article></div>;
}
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/components/MotionFallback.tsx">
<![CDATA['use client';
import type { Game } from '../data/games';
export default function MotionFallback({ game }: {
    game: Game;
}) { return <div className="motion-fallback"><img src={game.labelUrl} alt={`${game.title} cartridge label`}/><p>Image archive mode · use the controls below to explore.</p></div>; }
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/components/SiteFooter.tsx">
<![CDATA['use client';
export default function SiteFooter({ onReturn, busy }: { onReturn: () => void; busy: boolean }) {
    return <footer className="site-footer editorial-section" inert={busy}>
        <div className="section-rule utility"><span>05 / ONE MORE DETOUR</span><span>YOUR SAVE IS STILL HERE.</span></div>
        <h2 className="section-title centered">YOUR NEXT WORLD<br /><span>IS WAITING.</span></h2>
        <button className="return-button" onClick={onReturn}>RETURN TO THE CARTRIDGES <span>↑</span></button>
        <div className="footer-bottom"><a className="wordmark" href="#archive">SAVEPOINT<span>.</span></a><span className="utility">10 ARCHIVED WORLDS / REVISION 01</span><nav aria-label="Footer"><a href="#archive">ARCHIVE</a><a href="#the-deck">THE DECK</a><a href="#manifest">MANIFEST</a><a href="#index">INDEX</a></nav></div>
        <div className="footer-legal utility"><span>AN IMAGINARY COLLECTION, BUILT TO BE EXPLORED</span><span>© SAVEPOINT. 2026 / ALL WORLDS ARE FICTIONAL.</span></div>
    </footer>;
}
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/components/WorldGallery.tsx">
<![CDATA['use client';
import { useState, type CSSProperties } from 'react';
import { games } from '../data/games';

const filters = ['ALL', 'EXPLORATION', 'MYSTERY & HORROR', 'ACTION & ARCADE', 'STRATEGY & FANTASY'] as const;
const clusters: Record<(typeof filters)[number], string[]> = {
    ALL: [], EXPLORATION: ['lost-signal', 'mossheart', 'deep-current'],
    'MYSTERY & HORROR': ['dead-channel', 'ghost-frequency'],
    'ACTION & ARCADE': ['turbo-saints', 'neon-ruins', 'sunken-arcade'],
    'STRATEGY & FANTASY': ['mossheart', 'moon-relay', 'paper-kingdom'],
};
export default function WorldGallery({ onSelect }: { onSelect: (index: number, boot: boolean) => void }) {
    const [filter, setFilter] = useState<(typeof filters)[number]>('ALL');
    const visible = games.filter(game => filter === 'ALL' || clusters[filter].includes(game.id));
    return <section id="index" className="world-gallery editorial-section" aria-labelledby="index-title">
        <div className="section-rule utility"><span>04 / THE COMPLETE INDEX</span><span>1994 — 2003</span></div>
        <div className="catalog-heading"><h2 id="index-title" className="section-title">FIND YOUR<br /><span>NEXT DETOUR.</span></h2><p>Follow a feeling.<br />There&apos;s no wrong place to start.</p></div>
        <div className="catalog-filters" role="group" aria-label="Filter worlds by genre">{filters.map(item => <button key={item} aria-pressed={item === filter} onClick={() => setFilter(item)}>{item}</button>)}</div>
        <p className="utility catalog-count" role="status">{String(visible.length).padStart(2, '0')} WORLDS / {filter}</p>
        <div className="catalog-list">{visible.map(game => <article key={game.id} className="catalog-entry" data-game={game.id} style={{ '--game-accent': game.accent } as CSSProperties} aria-labelledby={`catalog-${game.id}`}>
            <div className="catalog-art"><img className="catalog-world" src={game.worldUrl} alt={`${game.title} world artwork`} loading="lazy" width="2752" height="1536" /><img className="catalog-label" src={game.labelUrl} alt={`${game.title} cartridge label`} loading="lazy" width="2400" height="1792" /><span className="utility catalog-art-code">SVP-{game.indexNumber}</span></div>
            <div className="catalog-copy"><div className="catalog-meta utility"><span>SVP-{game.indexNumber}</span><span>{game.year}</span></div><h3 id={`catalog-${game.id}`}>{game.title}</h3><p className="utility catalog-genre">{game.genre.join(' / ')}</p><p className="catalog-hook">{game.hook}</p><div className="catalog-actions"><button onClick={() => onSelect(Number(game.indexNumber) - 1, false)} aria-label={`Select ${game.title} on shelf`}>SELECT ON SHELF <span>↑</span></button><button onClick={() => onSelect(Number(game.indexNumber) - 1, true)} aria-label={`Insert and boot ${game.title}`}>INSERT &amp; BOOT <span>↗</span></button></div></div>
        </article>)}</div>
    </section>;
}
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/data/assets.ts">
<![CDATA[export const assetUrl = (filename: string) => '/templates/savepoint/' + filename;
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/data/games.ts">
<![CDATA[export interface Game {
    id: string;
    indexNumber: string;
    title: string;
    year: number;
    genre: string[];
    accent: string;
    tagline: string;
    hook: string;
    description: string;
    worldNotes: string[];
    archiveSpecs: {
        catalogCode: string;
        romCapacity: string;
        saveBattery: string;
        perspective: string;
    };
    labelUrl: string;
    worldUrl: string;
}
export const games: Game[] = [
    {
        "id": "lost-signal",
        "title": "Lost Signal",
        "year": 1998,
        "genre": [
            "Sci-fi",
            "Exploration",
            "Puzzle"
        ],
        "accent": "#8BAAF7",
        "hook": "A distant transmission draws a lone explorer into a forgotten planetary observatory.",
        "tagline": "Some messages were never meant to be answered.",
        "description": "Beyond the mapped edge of the system, an abandoned observatory has begun transmitting again. Cross silent canyons, restore forgotten relays, and uncover who — or what — is still listening.",
        "worldNotes": [
            "The observatory was built to record the sky. Its final log contains a voice from beneath the planet.",
            "Every relay restores a fragment of a conversation that began before the station existed."
        ],
        "indexNumber": "01",
        "archiveSpecs": {
            "catalogCode": "SVP-01 / 98",
            "romCapacity": "64 MEGABIT MASK ROM",
            "saveBattery": "SRAM + LITHIUM CELL (3 SLOTS)",
            "perspective": "ISOMETRIC / FIXED TELEMETRY"
        },
        "labelUrl": "/templates/savepoint/label-lost-signal.png",
        "worldUrl": "/templates/savepoint/world-lost-signal.webp"
    },
    {
        "id": "mossheart",
        "title": "Mossheart",
        "year": 1996,
        "genre": [
            "Fantasy",
            "Adventure"
        ],
        "accent": "#9EBC7B",
        "hook": "Ancient machinery sleeps beneath a forest that remembers everything.",
        "tagline": "The roots remember your name.",
        "description": "Follow a wandering seedkeeper into the green machinery beneath an ancient woodland. Mend forgotten engines without breaking the living roots that have made them home.",
        "worldNotes": [
            "Trees archive their memories in rings of copper and sap. Read the oldest trunks to find paths that have vanished.",
            "Repair changes the forest rather than resetting it; each awakened machine earns its place in the canopy."
        ],
        "indexNumber": "02",
        "archiveSpecs": {
            "catalogCode": "SVP-02 / 96",
            "romCapacity": "32 MEGABIT MASK ROM",
            "saveBattery": "EEPROM (2 GARDENS)",
            "perspective": "TOP-DOWN / HAND-PAINTED"
        },
        "labelUrl": "/templates/savepoint/label-mossheart.png",
        "worldUrl": "/templates/savepoint/world-mossheart.webp"
    },
    {
        "id": "turbo-saints",
        "title": "Turbo Saints",
        "year": 1999,
        "genre": [
            "Arcade",
            "Racing"
        ],
        "accent": "#F58A5C",
        "hook": "Chase sunset, speed and the final finish line across impossible highways.",
        "tagline": "One last lap before the sun goes out.",
        "description": "Race a crew of roadside legends across highways suspended over a burning sea. Trade clean corners for dangerous shortcuts as the sunset clock counts down the final championship.",
        "worldNotes": [
            "Each driver carries a cassette recorded for someone waiting at the finish. The radio reveals their stories between races.",
            "Roads fold through abandoned toll booths, coastal flyovers and the ruins of a city built around speed."
        ],
        "indexNumber": "03",
        "archiveSpecs": {
            "catalogCode": "SVP-03 / 99",
            "romCapacity": "96 MEGABIT MASK ROM",
            "saveBattery": "EEPROM / LAP RECORDS",
            "perspective": "CHASE CAMERA / ARCADE"
        },
        "labelUrl": "/templates/savepoint/label-turbo-saints.png",
        "worldUrl": "/templates/savepoint/world-turbo-saints.webp"
    },
    {
        "id": "dead-channel",
        "title": "Dead Channel",
        "year": 2001,
        "genre": [
            "Horror",
            "Mystery"
        ],
        "accent": "#D45E66",
        "hook": "A broadcast from a town erased from every map refuses to go silent.",
        "tagline": "Stay tuned. Stay inside.",
        "description": "A late-night television repair leads you to a town absent from every map. Follow its emergency broadcasts through empty rooms and discover why every screen is showing tomorrow.",
        "worldNotes": [
            "The broadcast schedule is the only reliable clock in town. Missing a program changes what waits outside.",
            "Domestic spaces repeat with subtle errors: an extra door, a photograph turned around, a voice one room ahead."
        ],
        "indexNumber": "04",
        "archiveSpecs": {
            "catalogCode": "SVP-04 / 01",
            "romCapacity": "128 MEGABIT MASK ROM",
            "saveBattery": "SRAM (1 TRANSMISSION)",
            "perspective": "FIXED CAMERA / ANALOGUE"
        },
        "labelUrl": "/templates/savepoint/label-dead-channel.png",
        "worldUrl": "/templates/savepoint/world-dead-channel.webp"
    },
    {
        "id": "moon-relay",
        "title": "Moon Relay",
        "year": 1997,
        "genre": [
            "Puzzle",
            "Strategy"
        ],
        "accent": "#D9C68E",
        "hook": "Reconnect a silent lunar network one brilliant circuit at a time.",
        "tagline": "A small light. A very long way home.",
        "description": "Route power across a stranded lunar communications network. Balance fragile circuits, moving shadows and limited reserves to carry one final message back to Earth.",
        "worldNotes": [
            "Sunlight travels slowly across the crater floor, turning safe routes into frozen gaps.",
            "Every station holds a handwritten message from its former operator; reconnecting them assembles a shared farewell."
        ],
        "indexNumber": "05",
        "archiveSpecs": {
            "catalogCode": "SVP-05 / 97",
            "romCapacity": "24 MEGABIT MASK ROM",
            "saveBattery": "EEPROM / 12 CIRCUITS",
            "perspective": "ORTHOGRAPHIC / GRID"
        },
        "labelUrl": "/templates/savepoint/label-moon-relay.png",
        "worldUrl": "/templates/savepoint/world-moon-relay.webp"
    },
    {
        "id": "neon-ruins",
        "title": "Neon Ruins",
        "year": 2002,
        "genre": [
            "Action",
            "Platformer"
        ],
        "accent": "#B58AF5",
        "hook": "Carry a forbidden signal across the rooftops of a collapsing neon city.",
        "tagline": "Keep the signal moving.",
        "description": "Leap between unstable towers in a city dismantling itself at dawn. A stolen transmitter is your only weapon, opening routes through the electric ghosts of its infrastructure.",
        "worldNotes": [
            "The skyline is a circuit diagram. Redirecting current can save a platform and darken an entire neighborhood.",
            "Billboards preserve fragments of a language the city has ordered its residents to forget."
        ],
        "indexNumber": "06",
        "archiveSpecs": {
            "catalogCode": "SVP-06 / 02",
            "romCapacity": "128 MEGABIT MASK ROM",
            "saveBattery": "FLASH / CHECKPOINTS",
            "perspective": "SIDE-SCROLLING / PARALLAX"
        },
        "labelUrl": "/templates/savepoint/label-neon-ruins.png",
        "worldUrl": "/templates/savepoint/world-neon-ruins.webp"
    },
    {
        "id": "paper-kingdom",
        "title": "Paper Kingdom",
        "year": 1995,
        "genre": [
            "Tactical",
            "Fantasy"
        ],
        "accent": "#D99B79",
        "hook": "Rewrite the fate of a kingdom folded from maps, letters and memories.",
        "tagline": "Every fold changes the story.",
        "description": "Command a tiny court across maps that fold into mountains and letters that become bridges. Rewrite a disputed inheritance with careful tactics and the memories hidden in the margins.",
        "worldNotes": [
            "Units carry histories on their reverse sides. Turning a soldier over can reveal a diplomat.",
            "Rain is the kingdom’s oldest enemy; protecting an archive may matter more than holding a fortress."
        ],
        "indexNumber": "07",
        "archiveSpecs": {
            "catalogCode": "SVP-07 / 95",
            "romCapacity": "16 MEGABIT MASK ROM",
            "saveBattery": "SRAM / 3 CHRONICLES",
            "perspective": "ISOMETRIC / TURN-BASED"
        },
        "labelUrl": "/templates/savepoint/label-paper-kingdom.png",
        "worldUrl": "/templates/savepoint/world-paper-kingdom.webp"
    },
    {
        "id": "deep-current",
        "title": "Deep Current",
        "year": 2000,
        "genre": [
            "Underwater",
            "Exploration"
        ],
        "accent": "#64C1C2",
        "hook": "Descend beyond the last charted depth in a fragile research vessel.",
        "tagline": "There is still light below.",
        "description": "Pilot a fragile survey vessel past the last marked contour on the ocean floor. Listen to the hull, ration your power and follow an impossible light into the deep.",
        "worldNotes": [
            "Sonar reveals architecture where geology should be. No two survey passes return the same shape.",
            "The cabin is a small refuge: a thermos, a notebook and a window that becomes a mirror as you descend."
        ],
        "indexNumber": "08",
        "archiveSpecs": {
            "catalogCode": "SVP-08 / 00",
            "romCapacity": "96 MEGABIT MASK ROM",
            "saveBattery": "SRAM / DIVE LOG",
            "perspective": "FIRST-PERSON / SONAR"
        },
        "labelUrl": "/templates/savepoint/label-deep-current.png",
        "worldUrl": "/templates/savepoint/world-deep-current.webp"
    },
    {
        "id": "ghost-frequency",
        "title": "Ghost Frequency",
        "year": 2003,
        "genre": [
            "Rhythm",
            "Mystery"
        ],
        "accent": "#B4A2F3",
        "hook": "Decode the city hidden between music, static and midnight transmissions.",
        "tagline": "Somewhere between stations, a city listens.",
        "description": "Tune a pirate receiver to rhythms that reveal a second city after midnight. Follow missing musicians through its stations and reconstruct the song that keeps its streets from disappearing.",
        "worldNotes": [
            "Each district occupies a different band of the spectrum. Their melodies overlap at places the map cannot show.",
            "Silence is a deliberate note; listening without playing can reveal an entirely different route."
        ],
        "indexNumber": "09",
        "archiveSpecs": {
            "catalogCode": "SVP-09 / 03",
            "romCapacity": "128 MEGABIT MASK ROM",
            "saveBattery": "FLASH / MIX TAPES",
            "perspective": "SIDE VIEW / RHYTHMIC"
        },
        "labelUrl": "/templates/savepoint/label-ghost-frequency.png",
        "worldUrl": "/templates/savepoint/world-ghost-frequency.webp"
    },
    {
        "id": "sunken-arcade",
        "title": "Sunken Arcade",
        "year": 1994,
        "genre": [
            "Surreal",
            "Platformer"
        ],
        "accent": "#F2A57C",
        "hook": "Beneath the waves, every arcade cabinet opens another dream.",
        "tagline": "One more coin. One more dream.",
        "description": "Explore a drowned amusement hall where each glowing cabinet opens a pocket universe. Collect forgotten tokens and follow the tide toward the machine still waiting for its first player.",
        "worldNotes": [
            "The water never reaches the screens. Their glow draws tiny schools of fish through the abandoned aisles.",
            "Dreams borrow pieces from neighboring games, turning familiar platforms into shifting conversations."
        ],
        "indexNumber": "10",
        "archiveSpecs": {
            "catalogCode": "SVP-10 / 94",
            "romCapacity": "16 MEGABIT MASK ROM",
            "saveBattery": "PASSWORD / TOKEN LEDGER",
            "perspective": "SIDE-SCROLLING / DREAM LOGIC"
        },
        "labelUrl": "/templates/savepoint/label-sunken-arcade.png",
        "worldUrl": "/templates/savepoint/world-sunken-arcade.webp"
    }
];
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/hooks/useArchiveStore.ts">
<![CDATA[import { create } from 'zustand';
export type ExperiencePhase = 'archive' | 'extracting' | 'console-entering' | 'aligning' | 'inserting' | 'booting' | 'screen-expanding' | 'game-detail' | 'returning';
interface ArchiveState {
    activeIndex: number;
    phase: ExperiencePhase;
    direction: number;
    select: (index: number, direction?: number) => void;
    setPhase: (phase: ExperiencePhase) => void;
}
export const useArchiveStore = create<ArchiveState>((set) => ({ activeIndex: 0, phase: 'archive', direction: 1, select: (index, direction) => set((state) => ({ activeIndex: ((index % 10) + 10) % 10, direction: direction ?? (index - state.activeIndex >= 0 ? 1 : -1) })), setPhase: (phase) => set({ phase }) }));
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/lib/animationMath.ts">
<![CDATA[export const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
export const smoothstep01 = (x: number) => { const t = clamp01(x); return t * t * (3 - 2 * t); };
export const spreadOffset = (r: number) => Math.abs(r) < 1 ? (r + Math.sin(Math.PI * r) / Math.PI) / 2 : Math.sign(r) * .5;
export const computeCartridgeX = (r: number, ws = .14, d = .84, gap = .10) => r * (ws + gap) + (d - ws + 1.6 * gap) * spreadOffset(r);
export const computeOpenness = (r: number) => smoothstep01(Math.max(0, 1 - Math.abs(r)));
export const modulo = (n: number, length = 10) => ((n % length) + length) % length;
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/lib/archiveSceneEngine.ts">
<![CDATA[import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import gsap from 'gsap';
import { createBootDisplay } from './bootDisplay';
import { describeModel } from './modelDiagnostics';
import { createDeck01Model } from '../models/createDeck01Model';
import { disposePolymerMaps } from '../models/geometry';
import { createCartridgeModel, resetSharedCartridgeResources } from '../models/createCartridgeModel';
import { games } from '../data/games';
import { useArchiveStore } from '../hooks/useArchiveStore';
import { computeCartridgeX, computeOpenness, modulo, smoothstep01 } from './animationMath';
import { createLabelTexture, createSpineTexture } from './textureFactory';
import { interpolatePose, worldPose, slotClippingPlane, seatingProgress, type Pose } from './insertionPath';
import { projectScreen, projectBounds, type ScreenProjection } from './projection';
export interface SceneController {
    step: (delta: number) => void;
    boot: () => void;
    back: () => void;
    skip: () => void;
    select: (index: number) => void;
    selectAndBoot: (index: number) => void;
    openWorld: (index: number) => void;
    dispose: () => void;
}
export function createArchiveScene(canvas: HTMLCanvasElement, onProjection: (rect: ScreenProjection, progress: number) => void, onError: () => void): SceneController {
    useArchiveStore.setState({ activeIndex: 0, phase: 'archive', direction: 1 });
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.localClippingEnabled = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x121419, 9, 16);
    const camera = new THREE.PerspectiveCamera(34, 1, .05, 100);
    camera.position.set(0, .85, 3.2);
    camera.lookAt(0, .52, 0);
    const environmentGenerator = new THREE.PMREMGenerator(renderer), room = new RoomEnvironment();
    const environment = environmentGenerator.fromScene(room, .04);
    scene.environment = environment.texture;
    scene.environmentIntensity = .5;
    room.dispose();
    environmentGenerator.dispose();
    scene.add(new THREE.HemisphereLight(0xd8e1fa, 0x171920, 1.15));
    const key = new THREE.DirectionalLight(0xffffff, 2.7);
    key.position.set(-3, 5, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    Object.assign(key.shadow.camera, { left: -7, right: 7, top: 5, bottom: -4, near: .1, far: 20 });
    key.shadow.bias = -.0003;
    key.shadow.normalBias = .012;
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xaaa8ff, 1.5);
    rim.position.set(4, 3, -2);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0xcdf266, .5);
    fill.position.set(0, 1, 4);
    scene.add(fill);
    const deck = createDeck01Model();
    const display = createBootDisplay(deck.anchors.screenPlane.material);
    scene.add(deck.group);
    deck.group.position.set(0, -3, 0);
    deck.group.visible = false;
    const artMaterials = games.map(() => ({ labelMaterial: new THREE.MeshBasicMaterial({ color: 0x252934, toneMapped: false }), spineMaterial: new THREE.MeshStandardMaterial({ color: 0x252934, roughness: .64 }) }));
    const carts = Array.from({ length: 30 }, (_, i) => { const c = createCartridgeModel(artMaterials[i % 10]); c.group.userData.virtualIndex = i; scene.add(c.group); return c; });
    const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 20), new THREE.ShadowMaterial({ opacity: .22 }));
    floor.name = 'archive-contact-shadow';
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = .10;
    floor.receiveShadow = true;
    scene.add(floor);
    for (const cartridge of carts) {
        const shell = cartridge.group.getObjectByName('shell');
        if (shell instanceof THREE.Mesh)
            shell.castShadow = true;
    }
    const labels = new Map<number, ReturnType<typeof createLabelTexture>>();
    const spines = games.map(createSpineTexture);
    carts.forEach((cartridge, index) => cartridge.setSpine(spines[index % 10]));
    let destroyed = false;
    const load = (i: number) => {
        i = modulo(i);
        if (labels.has(i) || destroyed || new URLSearchParams(location.search).has('clay'))
            return Promise.resolve();
        const l = createLabelTexture(games[i], renderer);
        labels.set(i, l);
        for (let j = i; j < 30; j += 10)
            carts[j].setLabel(l.texture, spines[i]);
        return l.ready.catch(onError);
    };
    void Promise.all([load(0), load(1), load(9)]).then(async () => {
        for (const i of [2, 8, 3, 7, 4, 6, 5]) {
            if (destroyed)
                break;
            await load(i);
        }
    });
    let s = 0, target = 0, frame = 0, last = performance.now(), hover = -1, dragging = false, startX = 0, lastX = 0, moved = false, activeCart = carts[0], timeline: gsap.core.Timeline | null = null;
    const pointer = new THREE.Vector2();
    const ray = new THREE.Raycaster();
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const store = useArchiveStore;
    const phase = () => store.getState().phase;
    let announced = 0, expansion = 0, introRetreat = 0, pendingBoot = false, sceneVisible = true;
    const visibility = new IntersectionObserver(([entry]) => { sceneVisible = entry.isIntersecting; });
    visibility.observe(canvas);
    const announce = () => {
        const index = Math.round(target);
        if (index !== announced) {
            store.getState().select(index, Math.sign(index - announced));
            announced = index;
        }
        void load(index);
    };
    function step(d: number) {
        if (phase() !== 'archive')
            return;
        pendingBoot = false;
        target += d;
        announce();
    }
    function select(index: number) {
        if (phase() !== 'archive')
            return;
        pendingBoot = false;
        target += modulo(index - modulo(Math.round(target)) + 5) - 5;
        announce();
    }
    function selectAndBoot(index: number) {
        if (phase() !== 'archive') return;
        select(index);
        pendingBoot = true;
    }
    function resize() {
        const r = canvas.getBoundingClientRect();
        renderer.setSize(r.width, r.height, false);
        camera.aspect = r.width / r.height;
        camera.fov = r.width < 600 ? 45 : 34;
        camera.updateProjectionMatrix();
        if (phase() === 'screen-expanding' || phase() === 'returning' || phase() === 'game-detail')
            updateProjection(expansion);
        if (process.env.NODE_ENV === 'development' && new URLSearchParams(location.search).has('inspect')) {
            const p = new URLSearchParams(location.search);
            camera.setViewOffset(r.width, r.height, Number(p.get('ox') ?? 0) * r.width, Number(p.get('oy') ?? 0) * r.height, r.width, r.height);
        }
    }
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    function rail() {
        for (let i = 0; i < 30; i++) {
            const r = modulo(i - s + 15, 30) - 15, o = computeOpenness(r);
            const g = carts[i].group;
            g.visible = Math.abs(r) < 13;
            g.position.set(computeCartridgeX(r), .12 + o * .13 + (hover === i ? .045 : 0), o * .32);
            g.rotation.set(o * pointer.y * .035, (1 - o) * Math.PI / 2 + o * pointer.x * .06, -o * .061);
        }
    }
    function disableClip() { activeCart.setClipping(null); }
    function updateProjection(p: number) { expansion = p; onProjection(projectScreen(deck.anchors.screenPlane, camera, canvas), p); }
    function finish(pushHistory = true) {
        timeline?.kill();
        disableClip();
        deck.group.visible = true;
        deck.group.position.set(0, -.42, 0);
        camera.position.set(.5, 3.7, 7.1);
        camera.lookAt(0, .7, 0);
        deck.group.updateMatrixWorld(true);
        activeCart.group.visible = true;
        const p = worldPose(deck.anchors.slotFullyInserted);
        activeCart.group.position.copy(p.position);
        activeCart.group.quaternion.copy(p.quaternion);
        activeCart.setClipping(slotClippingPlane(deck.anchors.slotEntrance));
        deck.setBootState(1);
        display.select(games[store.getState().activeIndex]);
        display.setStage('WORLD FOUND');
        store.getState().setPhase('game-detail');
        updateProjection(1);
        const u = new URL(location.href);
        u.searchParams.set('game', games[store.getState().activeIndex].id);
        if (pushHistory && location.search !== u.search)
            history.pushState({}, '', u);
    }
    function boot() {
        if (phase() !== 'archive')
            return;
        pendingBoot = false;
        delete canvas.dataset.cursor;
        dragging = false;
        hover = -1;
        pointer.set(0, 0);
        s = target = Math.round(target);
        rail();
        activeCart = carts[modulo(Math.round(s), 30)];
        void load(modulo(Math.round(s)));
        const image = new Image();
        image.src = games[store.getState().activeIndex].worldUrl;
        const start: Pose = { position: activeCart.group.position.clone(), quaternion: activeCart.group.quaternion.clone() };
        const lifted: Pose = { position: new THREE.Vector3(0, 1.15, 1), quaternion: new THREE.Quaternion() };
        deck.group.visible = true;
        deck.group.position.set(0, -3, 0);
        deck.setBootState(0);
        display.select(games[store.getState().activeIndex]);
        display.setStage('OFF');
        const motion = { p: 0, expand: 0 };
        introRetreat = 0;
        timeline = gsap.timeline({ onComplete: () => finish() });
        store.getState().setPhase('extracting');
        timeline.to(motion, { p: 1, duration: .5, onUpdate: () => { introRetreat = motion.p; interpolatePose(activeCart.group, start, lifted, smoothstep01(motion.p)); } });
        timeline.to(camera.position, { x: .5, y: 3.7, z: 7.1, duration: .5, ease: 'power2.out', onUpdate: () => camera.lookAt(0, .7, 0) }, 0);
        timeline.call(() => store.getState().setPhase('console-entering'));
        timeline.to(deck.group.position, { y: -.42, duration: .75, ease: 'power3.out' });
        timeline.to(camera.position, { x: .5, y: 3.7, z: 7.1, duration: .75, onUpdate: () => camera.lookAt(0, .7, 0) }, '<');
        timeline.call(() => { store.getState().setPhase('aligning'); motion.p = 0; });
        timeline.to(motion, { p: 1, duration: .4, onUpdate: () => interpolatePose(activeCart.group, lifted, worldPose(deck.anchors.slotAlignment), smoothstep01(motion.p)) });
        timeline.call(() => { store.getState().setPhase('inserting'); motion.p = 0; activeCart.setClipping(slotClippingPlane(deck.anchors.slotEntrance)); });
        timeline.to(motion, { p: 1, duration: .6, ease: 'none', onUpdate: () => interpolatePose(activeCart.group, worldPose(deck.anchors.slotAlignment), worldPose(deck.anchors.slotFullyInserted), seatingProgress(motion.p)) });
        timeline.call(() => { store.getState().setPhase('booting'); deck.setBootState(1); display.setStage('READING ROM'); });
        timeline.to({ v: 0 }, { v: 1, duration: .35 });
        timeline.call(() => display.setStage('WORLD FOUND'));
        timeline.to({ v: 0 }, { v: 1, duration: .30 });
        timeline.call(() => store.getState().setPhase('screen-expanding'));
        timeline.to(motion, { expand: 1, duration: .85, ease: 'power3.inOut', onUpdate: () => updateProjection(motion.expand) });
        if (reduced.matches)
            finish();
    }
    function back(pushHistory = true) {
        pendingBoot = false;
        if (phase() === 'archive' || phase() === 'returning')
            return;
        const early = phase() !== 'game-detail' && phase() !== 'screen-expanding';
        timeline?.kill();
        if (early) {
            const from = { position: activeCart.group.position.clone(), quaternion: activeCart.group.quaternion.clone() }, to = { position: new THREE.Vector3(0, .25, .32), quaternion: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -.061)) }, motion = { p: 0 };
            disableClip();
            updateProjection(0);
            store.getState().setPhase('returning');
            display.setStage('OFF');
            timeline = gsap.timeline({ onComplete: () => { deck.group.visible = false; store.getState().setPhase('archive'); rail(); } });
            timeline.to(motion, { p: 1, duration: reduced.matches ? .01 : .55, onUpdate: () => interpolatePose(activeCart.group, from, to, smoothstep01(motion.p)) });
            timeline.to(deck.group.position, { y: -3, duration: .4 }, '<');
            timeline.to(camera.position, { x: 0, y: .85, z: 3.2, duration: .5, onUpdate: () => camera.lookAt(0, .52, 0) }, '<');
            if (pushHistory) {
                const url = new URL(location.href);
                url.searchParams.delete('game');
                history.pushState({}, '', url);
            }
            return;
        }
        store.getState().setPhase('returning');
        const motion = { p: 1, t: 0 };
        timeline = gsap.timeline({ onComplete: () => { disableClip(); deck.group.visible = false; store.getState().setPhase('archive'); rail(); onProjection(projectScreen(deck.anchors.screenPlane, camera, canvas), 0); } });
        timeline.to(motion, { p: 0, duration: reduced.matches ? .01 : .55, onUpdate: () => updateProjection(motion.p) });
        timeline.call(() => { deck.setBootState(0); display.setStage('OFF'); });
        const dock = worldPose(deck.anchors.slotFullyInserted), above = worldPose(deck.anchors.slotAlignment);
        timeline.to(motion, { t: 1, duration: reduced.matches ? .01 : .55, onUpdate: () => interpolatePose(activeCart.group, dock, above, smoothstep01(motion.t)) });
        timeline.call(() => { disableClip(); motion.t = 0; });
        const shelf: Pose = { position: new THREE.Vector3(0, .25, .32), quaternion: new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, -.061)) };
        timeline.to(motion, { t: 1, duration: reduced.matches ? .01 : .7, onUpdate: () => interpolatePose(activeCart.group, above, shelf, smoothstep01(motion.t)) });
        timeline.to(deck.group.position, { y: -3, duration: .6 }, '<');
        timeline.to(camera.position, { x: 0, y: .85, z: 3.2, duration: .6, onUpdate: () => camera.lookAt(0, .52, 0) }, '<');
        const u = new URL(location.href);
        u.searchParams.delete('game');
        if (pushHistory)
            history.pushState({}, '', u);
    }
    function hit(e: PointerEvent) {
        const r = canvas.getBoundingClientRect();
        pointer.set((e.clientX - r.left) / r.width * 2 - 1, -(e.clientY - r.top) / r.height * 2 + 1);
        ray.setFromCamera(pointer, camera);
        const hits = ray.intersectObjects(carts.filter(c => c.group.visible).map(c => c.group), true);
        let obj: THREE.Object3D | null = hits[0]?.object ?? null;
        while (obj && obj.userData.virtualIndex === undefined)
            obj = obj.parent;
        return obj?.userData.virtualIndex ?? -1;
    }
    function down(e: PointerEvent) {
        if (phase() !== 'archive')
            return;
        pendingBoot = false;
        startX = lastX = e.clientX;
        moved = false;
        dragging = true;
        canvas.setPointerCapture(e.pointerId);
    }
    function move(e: PointerEvent) {
        if (phase() !== 'archive')
            return;
        hover = hit(e);
        canvas.dataset.cursor = hover < 0 ? 'default' : Math.abs(modulo(hover - s + 15, 30) - 15) < .2 ? 'boot' : 'spine';
        canvas.style.cursor = dragging ? 'grabbing' : hover >= 0 ? 'pointer' : 'grab';
        if (dragging) {
            if (Math.abs(e.clientX - startX) > 6)
                moved = true;
            if (moved) {
                target -= (e.clientX - lastX) / 110;
                announce();
            }
            lastX = e.clientX;
        }
    }
    function up(e: PointerEvent) {
        if (!dragging)
            return;
        dragging = false;
        if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
        if (moved) {
            target = Math.round(target);
            announce();
            return;
        }
        const i = hit(e);
        if (i < 0)
            return;
        const r = modulo(i - s + 15, 30) - 15;
        if (Math.abs(r) < .2)
            boot();
        else {
            target = Math.round(s + r);
            announce();
        }
    }
    function cancel(e: PointerEvent) { dragging = false; target = Math.round(target); if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId); }
    function leave() { hover = -1; delete canvas.dataset.cursor; }
    function wheel(e: WheelEvent) {
        if (phase() === 'archive' && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            pendingBoot = false;
            e.preventDefault();
            target += e.deltaX * .008;
            announce();
        }
    }
    function keydown(e: KeyboardEvent) {
        if ((e.target as HTMLElement).matches('input,textarea,select'))
            return;
        if (e.key === 'Escape') {
            back();
            return;
        }
        if (phase() === 'archive' && canvas.getBoundingClientRect().bottom > 0 && canvas.getBoundingClientRect().top < innerHeight && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
            e.preventDefault();
            step(e.key === 'ArrowRight' ? 1 : -1);
        }
    }
    function historyChange() {
        const id = new URLSearchParams(location.search).get('game');
        const i = games.findIndex(g => g.id === id);
        if (i < 0) {
            back(false);
            return;
        }
        disableClip();
        activeCart.group.visible = false;
        store.getState().select(i);
        target = s = i;
        announced = i;
        activeCart = carts[i];
        finish(false);
    }
    function lost(e: Event) { e.preventDefault(); timeline?.kill(); cancelAnimationFrame(frame); onError(); }
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', cancel);
    canvas.addEventListener('pointerleave', leave);
    canvas.addEventListener('wheel', wheel, { passive: false });
    canvas.addEventListener('webglcontextlost', lost);
    window.addEventListener('keydown', keydown);
    window.addEventListener('popstate', historyChange);
    const inspect = process.env.NODE_ENV === 'development' ? new URLSearchParams(location.search).get('inspect') : null;
    if (inspect) {
        scene.background = new THREE.Color(0xffffff);
        for (const c of carts)
            c.group.visible = false;
        deck.group.visible = inspect === 'deck';
        deck.group.position.set(0, 0, 0);
        const params = new URLSearchParams(location.search);
        const angle = Number(params.get('angle') ?? 35) * Math.PI / 180;
        if (inspect === 'cartridge') {
            carts[0].group.visible = true;
            carts[0].group.position.set(0, 0, 0);
            carts[0].group.rotation.set(0, 0, 0);
        }
        const distance = Number(params.get('distance') ?? (inspect === 'deck' ? 4 : 2));
        camera.position.set(Math.sin(angle) * distance, Number(params.get('height') ?? (inspect === 'deck' ? 3.2 : .85)), Math.cos(angle) * distance);
        camera.lookAt(0, Number(params.get('look') ?? (inspect === 'deck' ? .4 : .48)), 0);
    }
    function tick(now: number) {
        if (destroyed)
            return;
        floor.visible = !inspect && phase() === 'archive';
        const dt = Math.min((now - last) / 1000, .05);
        last = now;
        if (!sceneVisible && phase() === 'archive' && !inspect) { frame = requestAnimationFrame(tick); return; }
        if (!inspect) {
            if (phase() === 'archive') {
                s = reduced.matches ? target : s + (target - s) * (1 - Math.exp(-(dragging ? 18 : 5.2) * dt));
                rail();
                if (pendingBoot && Math.abs(s - target) < .015) boot();
            }
            else {
                for (let index = 0; index < carts.length; index++) {
                    const cartridge = carts[index];
                    if (cartridge === activeCart)
                        continue;
                    const transitional = phase() === 'extracting' || phase() === 'returning';
                    const relative = modulo(index - s + 15, 30) - 15;
                    cartridge.group.visible = transitional && Math.abs(relative) < 13;
                    if (transitional) {
                        const retreat = phase() === 'extracting' ? introRetreat : THREE.MathUtils.clamp((camera.position.z - 3.2) / 3.9, 0, 1);
                        cartridge.group.position.set(computeCartridgeX(relative), .12 - retreat * .15, -retreat * 3);
                        cartridge.group.rotation.set(0, Math.PI / 2, 0);
                    }
                }
            }
        }
        renderer.render(scene, camera);
        canvas.dataset.sceneReady = 'true';
        frame = requestAnimationFrame(tick);
    }
    if (inspect) {
        rim.color.set(0xffffff);
        fill.color.set(0xffffff);
        if (new URLSearchParams(location.search).has('clay'))
            scene.traverse(o => {
                if (o instanceof THREE.Mesh)
                    o.material = new THREE.MeshBasicMaterial({ color: 0x555555 });
            });
        resize();
    }
    if (process.env.NODE_ENV === 'development')
        Object.assign(canvas, { savepointDiagnostics: (models = true) => ({ phase: phase(), shelfCurrent: s, shelfTarget: target, expansion, cartridgeCount: carts.length, activeBounds: projectBounds(activeCart.group, camera, canvas), deckBounds: projectBounds(deck.group, camera, canvas), activeIndex: store.getState().activeIndex, screen: projectScreen(deck.anchors.screenPlane, camera, canvas), deck: models ? describeModel(deck.group) : null, cartridge: models ? describeModel(activeCart.group) : null, slot: worldPose(deck.anchors.slotEntrance).position.toArray(), dock: worldPose(deck.anchors.slotFullyInserted).position.toArray(), tip: worldPose(activeCart.anchors.connectorTongue).position.toArray(), slotRay: (() => { const origin = worldPose(deck.anchors.slotEntrance).position; origin.y += 2; const hit = new THREE.Raycaster(origin, new THREE.Vector3(0, -1, 0)).intersectObject(deck.group, true)[0]; return hit ? { name: hit.object.name, point: hit.point.toArray() } : null; })(), drawCalls: renderer.info.render.calls, triangles: renderer.info.render.triangles }) });
    if (!inspect)
        rail();
    frame = requestAnimationFrame(tick);
    if (new URLSearchParams(location.search).has('game'))
        historyChange();
    return { step, select, selectAndBoot, boot, back, skip: () => finish(), openWorld(index) { disableClip(); activeCart.group.visible = false; target = s = index; announced = index; store.getState().select(index); activeCart = carts[index]; finish(); }, dispose() {
            destroyed = true;
            timeline?.kill();
            cancelAnimationFrame(frame);
            observer.disconnect();
            visibility.disconnect();
            canvas.removeEventListener('pointerdown', down);
            canvas.removeEventListener('pointermove', move);
            canvas.removeEventListener('pointerup', up);
            canvas.removeEventListener('pointercancel', cancel);
            canvas.removeEventListener('pointerleave', leave);
            canvas.removeEventListener('wheel', wheel);
            canvas.removeEventListener('webglcontextlost', lost);
            window.removeEventListener('keydown', keydown);
            window.removeEventListener('popstate', historyChange);
            const geometries = new Set<THREE.BufferGeometry>(), materials = new Set<THREE.Material>();
            scene.traverse(o => {
                if (o instanceof THREE.Mesh) {
                    geometries.add(o.geometry);
                    for (const m of Array.isArray(o.material) ? o.material : [o.material])
                        materials.add(m);
                }
            });
            geometries.forEach(g => g.dispose());
            materials.forEach(m => m.dispose());
            labels.forEach(l => l.dispose());
            spines.forEach(t => t.dispose());
            disableClip();
            display.dispose();
            environment.dispose();
            disposePolymerMaps();
            resetSharedCartridgeResources();
            delete (canvas as HTMLCanvasElement & {
                savepointDiagnostics?: unknown;
            }).savepointDiagnostics;
            renderer.dispose();
        } };
}
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/lib/bootDisplay.ts">
<![CDATA[import * as THREE from 'three';
import type { Game } from '../data/games';
export function createBootDisplay(material: THREE.MeshBasicMaterial) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 620;
    const context = canvas.getContext('2d')!;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const images = new Map<string, HTMLImageElement>();
    let selected: Game | null = null, stage = 'OFF', disposed = false;
    function draw() {
        if (disposed)
            return;
        context.fillStyle = '#080c12';
        context.fillRect(0, 0, 1024, 620);
        const image = selected && images.get(selected.id);
        if (stage === 'WORLD FOUND' && image?.complete && image.naturalWidth) {
            const scale = Math.max(1024 / image.width, 620 / image.height);
            context.drawImage(image, (1024 - image.width * scale) / 2, (620 - image.height * scale) / 2, image.width * scale, image.height * scale);
            context.fillStyle = 'rgba(8,12,18,.55)';
            context.fillRect(0, 440, 1024, 180);
        }
        if (stage !== 'OFF') {
            context.fillStyle = '#cdf266';
            context.font = '24px monospace';
            context.fillText('SAVEPOINT // DECK-01', 46, 64);
            context.fillStyle = selected?.accent ?? '#cdf266';
            context.font = 'bold 54px sans-serif';
            context.fillText(stage === 'WORLD FOUND' ? selected!.title.toUpperCase() : 'READING ROM', 46, 506);
            context.fillStyle = '#f2f0e8';
            context.font = '22px monospace';
            context.fillText(stage === 'WORLD FOUND' ? `${selected!.archiveSpecs.catalogCode} / WORLD FOUND` : 'VERIFYING CARTRIDGE / PLEASE WAIT', 46, 562);
        }
        texture.needsUpdate = true;
    }
    material.map = texture;
    material.color.set(0xffffff);
    material.needsUpdate = true;
    return {
        select(game: Game) {
            selected = game;
            if (!images.has(game.id)) {
                const image = new Image();
                image.onload = draw;
                image.src = game.worldUrl;
                images.set(game.id, image);
            }
        },
        setStage(value: 'OFF' | 'READING ROM' | 'WORLD FOUND') { stage = value; material.color.set(0xffffff); draw(); },
        dispose() { disposed = true; images.forEach(image => { image.onload = null; image.onerror = null; }); images.clear(); material.map = null; texture.dispose(); },
    };
}
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/lib/deviceInspection.ts">
<![CDATA[import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createDeck01Model } from '../models/createDeck01Model';

const views = [
    { eye: [3.8, 3.5, 5.4], look: [0, .4, 0] },
    { eye: [1.5, 5.3, -3.5], look: [0, .65, -.45] },
    { eye: [.3, 1.6, 6], look: [0, .35, .3] },
    { eye: [5.7, 2.1, -.6], look: [0, .4, 0] },
] as const;

export function createDeviceInspection(canvas: HTMLCanvasElement) {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 40);
    const deck = createDeck01Model();
    scene.add(deck.group);
    // The inspection scene owns its textures; primary-scene context recovery can dispose independently.
    const textures = new Map<THREE.Texture, THREE.Texture>();
    const materials = new Set<THREE.Material>();
    const geometries = new Set<THREE.BufferGeometry>();
    scene.traverse(object => {
        if (!(object instanceof THREE.Mesh)) return;
        geometries.add(object.geometry);
        for (const material of Array.isArray(object.material) ? object.material : [object.material]) {
            if (materials.has(material)) continue;
            materials.add(material);
            if (material instanceof THREE.MeshStandardMaterial) {
                for (const key of ['roughnessMap', 'bumpMap'] as const) {
                    const original = material[key];
                    if (!original) continue;
                    if (!textures.has(original)) textures.set(original, original.clone());
                    material[key] = textures.get(original)!;
                }
            }
        }
    });
    const generator = new THREE.PMREMGenerator(renderer), room = new RoomEnvironment();
    const environment = generator.fromScene(room, .04);
    scene.environment = environment.texture;
    scene.environmentIntensity = .65;
    room.dispose();
    generator.dispose();
    scene.add(new THREE.HemisphereLight(0xe3e9fa, 0x121419, 2));
    const key = new THREE.DirectionalLight(0xffffff, 4);
    key.position.set(-3, 6, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xaaa8ff, 2);
    rim.position.set(4, 3, -3);
    scene.add(rim);
    const guide = new THREE.ArrowHelper(new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 2.15, -1.05), .9, 0xcdf266, .14, .08);
    guide.visible = false;
    scene.add(guide);
    const eye = new THREE.Vector3(...views[0].eye), look = new THREE.Vector3(...views[0].look);
    camera.position.copy(eye);
    let visible = false, disposed = false, frame = 0, last = 0;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    function render(now: number) {
        frame = 0;
        if (!visible || disposed) return;
        const dt = Math.min((now - last) / 1000, .05);
        last = now;
        camera.position.lerp(eye, reduced.matches ? 1 : 1 - Math.exp(-7 * dt));
        camera.lookAt(look);
        renderer.render(scene, camera);
        canvas.dataset.sceneReady = 'true';
        if (camera.position.distanceToSquared(eye) > .00001) frame = requestAnimationFrame(render);
    }
    function request() {
        if (!frame && visible && !disposed) { last = performance.now(); frame = requestAnimationFrame(render); }
    }
    const resize = new ResizeObserver(() => {
        const { width, height } = canvas.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.fov = width < 500 ? 43 : 34;
        camera.updateProjectionMatrix();
        request();
    });
    resize.observe(canvas);
    return {
        setVisible(value: boolean) {
            visible = value;
            canvas.dataset.rendering = String(value);
            if (value) request();
            else { cancelAnimationFrame(frame); frame = 0; }
        },
        inspect(index: number, wireframe: boolean) {
            eye.fromArray(views[index].eye);
            look.fromArray(views[index].look);
            guide.visible = index === 1;
            for (const material of materials) {
                if (material instanceof THREE.MeshStandardMaterial) material.wireframe = wireframe;
            }
            canvas.dataset.angle = String(index);
            canvas.dataset.wireframe = String(wireframe);
            request();
        },
        dispose() {
            disposed = true;
            cancelAnimationFrame(frame);
            resize.disconnect();
            geometries.forEach(geometry => geometry.dispose());
            materials.forEach(material => material.dispose());
            textures.forEach(texture => texture.dispose());
            guide.dispose();
            environment.dispose();
            renderer.dispose();
        },
    };
}
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/lib/insertionPath.ts">
<![CDATA[import * as THREE from 'three';
export interface Pose {
    position: THREE.Vector3;
    quaternion: THREE.Quaternion;
}
export function worldPose(anchor: THREE.Object3D): Pose { anchor.updateWorldMatrix(true, false); return { position: anchor.getWorldPosition(new THREE.Vector3()), quaternion: anchor.getWorldQuaternion(new THREE.Quaternion()) }; }
export function interpolatePose(object: THREE.Object3D, from: Pose, to: Pose, progress: number) { object.position.lerpVectors(from.position, to.position, progress); object.quaternion.slerpQuaternions(from.quaternion, to.quaternion, progress); }
export function slotClippingPlane(entrance: THREE.Object3D) { const pose = worldPose(entrance); const normal = new THREE.Vector3(0, 1, 0).applyQuaternion(pose.quaternion); return new THREE.Plane().setFromNormalAndCoplanarPoint(normal, pose.position); }
export function seatingProgress(t: number) {
    if (t < .86)
        return t / .86 * .97;
    const settle = (t - .86) / .14;
    return settle >= 1 ? 1 : .97 + .03 * (1 - Math.exp(-6 * settle) * Math.cos(10 * settle));
}
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/lib/modelDiagnostics.ts">
<![CDATA[import * as THREE from 'three';
export function describeModel(root: THREE.Object3D) {
    root.updateMatrixWorld(true);
    const parts: {
        name: string;
        kind: string;
        module: string;
        triangles: number;
        parent: string | null;
        position: number[];
        rotation: number[];
        dimensions: number[];
        geometry: string;
    }[] = [];
    const meshes: {
        id: string;
        vertices: number[][];
        indices: number[];
        normals: number[][];
    }[] = [];
    const measured: Record<string, number[]> = {};
    let unnamedMeshes = 0;
    root.traverse(object => {
        if (object.name) {
            measured[object.name] = object.getWorldPosition(new THREE.Vector3()).toArray();
            const bounds = new THREE.Box3().setFromObject(object);
            const size = bounds.isEmpty() ? new THREE.Vector3(.001, .001, .001) : bounds.getSize(new THREE.Vector3());
            parts.push({ name: object.name, kind: 'part', module: object.name, triangles: object instanceof THREE.Mesh ? (object.geometry.index?.count ?? object.geometry.attributes.position.count) / 3 * (object instanceof THREE.InstancedMesh ? object.count : 1) : 0, parent: object === root ? null : object.parent?.name ?? null, position: object.position.toArray(), rotation: [object.rotation.x, object.rotation.y, object.rotation.z], dimensions: size.toArray(), geometry: object instanceof THREE.Mesh ? object.geometry.type : 'Group' });
        }
        if (!(object instanceof THREE.Mesh))
            return;
        if (!object.name)
            unnamedMeshes++;
        // Open label/display carriers are reported in the part tree. For repeated instances,
        // one closed prototype tests the identical topology shared by every instance.
        if (object.geometry instanceof THREE.PlaneGeometry)
            return;
        const geo = object.geometry;
        const positions = Array.from(geo.attributes.position.array) as number[];
        const normals = geo.attributes.normal ? Array.from(geo.attributes.normal.array) as number[] : [];
        const indices: number[] = geo.index ? Array.from(geo.index.array, Number) : Array.from({ length: geo.attributes.position.count }, (_, index) => index);
        const chunks = (values: number[]) => Array.from({ length: values.length / 3 }, (_, index) => values.slice(index * 3, index * 3 + 3));
        meshes.push({ id: object.name, vertices: chunks(positions), indices, normals: chunks(normals) });
    });
    return { model: root.name, parts, meshes, measured, unnamedMeshes, integralMeshes: 0 };
}
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/lib/projection.ts">
<![CDATA[import * as THREE from 'three';
export function projectBounds(object: THREE.Object3D, camera: THREE.Camera, canvas: HTMLCanvasElement) {
    object.updateWorldMatrix(true, true);
    const bounds = new THREE.Box3().setFromObject(object), rect = canvas.getBoundingClientRect();
    const points = [];
    for (const x of [bounds.min.x, bounds.max.x])
        for (const y of [bounds.min.y, bounds.max.y])
            for (const z of [bounds.min.z, bounds.max.z]) {
                const point = new THREE.Vector3(x, y, z).project(camera);
                points.push({ x: rect.left + (point.x + 1) * rect.width / 2, y: rect.top + (1 - point.y) * rect.height / 2 });
            }
    return { left: Math.min(...points.map(point => point.x)), right: Math.max(...points.map(point => point.x)), top: Math.min(...points.map(point => point.y)), bottom: Math.max(...points.map(point => point.y)) };
}
export interface ScreenProjection {
    points: {
        x: number;
        y: number;
    }[];
    left: number;
    top: number;
    width: number;
    height: number;
}
export function projectScreen(screen: THREE.Mesh, camera: THREE.Camera, canvas: HTMLCanvasElement): ScreenProjection {
    screen.updateWorldMatrix(true, false);
    camera.updateMatrixWorld();
    const rect = canvas.getBoundingClientRect();
    const box = screen.geometry.boundingBox ?? (screen.geometry.computeBoundingBox(), screen.geometry.boundingBox!);
    const points = [[box.min.x, box.max.y], [box.max.x, box.max.y], [box.max.x, box.min.y], [box.min.x, box.min.y]].map(([x, y]) => { const p = new THREE.Vector3(x, y, 0).applyMatrix4(screen.matrixWorld).project(camera); return { x: rect.left + (p.x + 1) * rect.width / 2, y: rect.top + (1 - p.y) * rect.height / 2 }; });
    const left = Math.min(...points.map(p => p.x)), top = Math.min(...points.map(p => p.y));
    return { points, left, top, width: Math.max(...points.map(p => p.x)) - left, height: Math.max(...points.map(p => p.y)) - top };
}
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/lib/textureFactory.ts">
<![CDATA[import * as THREE from 'three';
import type { Game } from '../data/games';
export function createLabelTexture(game: Game, renderer: THREE.WebGLRenderer) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d')!;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    function type() {
        ctx.fillStyle = '#171b22';
        ctx.fillRect(0, 780, 1024, 244);
        ctx.fillStyle = game.accent;
        ctx.font = 'bold 75px sans-serif';
        let size = 75;
        while (ctx.measureText(game.title.toUpperCase()).width > 930) {
            size -= 2;
            ctx.font = `bold ${size}px sans-serif`;
        }
        ctx.fillText(game.title.toUpperCase(), 44, 874);
        ctx.font = '25px monospace';
        ctx.fillStyle = '#f2f0e8';
        ctx.fillText(`${game.archiveSpecs.catalogCode}     ${game.year}`, 44, 963);
        texture.needsUpdate = true;
    }
    ctx.fillStyle = '#252934';
    ctx.fillRect(0, 0, 1024, 1024);
    type();
    let disposed = false;
    const img = new Image();
    const ready = new Promise<void>((resolve, reject) => {
        img.onload = () => {
            if (!disposed) {
                const cropH = img.height * .80;
                const cropW = Math.min(img.width, cropH * 1024 / 780);
                ctx.drawImage(img, (img.width - cropW) / 2, 0, cropW, cropH, 0, 0, 1024, 780);
                type();
            }
            resolve();
        };
        img.onerror = () => reject(new Error(`Unable to load ${game.labelUrl}`));
    });
    img.src = game.labelUrl;
    return { texture, ready, dispose() { disposed = true; img.onload = null; img.onerror = null; texture.dispose(); } };
}
export function createSpineTexture(game: Game) { const c = document.createElement('canvas'); c.width = 128; c.height = 1024; const x = c.getContext('2d')!; x.fillStyle = '#252934'; x.fillRect(0, 0, 128, 1024); x.fillStyle = game.accent; x.fillRect(0, 40, 128, 16); x.save(); x.translate(78, 100); x.rotate(Math.PI / 2); x.fillStyle = '#f2f0e8'; x.font = 'bold 39px sans-serif'; x.fillText(game.title.toUpperCase(), 0, 0); x.restore(); x.font = '29px monospace'; x.fillStyle = game.accent; x.fillText(game.indexNumber, 39, 964); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; }
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/models/createCartridgeModel.ts">
<![CDATA[import * as THREE from 'three';
import { box, part, polymer, enableAssembly } from './geometry';
let shared: ReturnType<typeof makeGeometries> | null = null;
let sharedMaterials: {
    plastic: THREE.MeshPhysicalMaterial;
    dark: THREE.MeshStandardMaterial;
    metal: THREE.MeshStandardMaterial;
} | null = null;
function getSharedMaterials() { return sharedMaterials ??= { plastic: polymer(), dark: new THREE.MeshStandardMaterial({ color: 0x1b1d22, roughness: .72 }), metal: new THREE.MeshStandardMaterial({ color: 0xa89159, metalness: .8, roughness: .36 }) }; }
export function resetSharedCartridgeResources() { shared = null; sharedMaterials = null; }
function makeGeometries() {
    const outline = new THREE.Shape();
    outline.moveTo(-.42, .14);
    outline.lineTo(.42, .14);
    outline.lineTo(.42, 1.06);
    outline.lineTo(.31, 1.17);
    outline.lineTo(-.36, 1.17);
    outline.quadraticCurveTo(-.42, 1.17, -.42, 1.11);
    outline.closePath();
    const shell = new THREE.ExtrudeGeometry(outline, { depth: .11, bevelEnabled: true, bevelSize: .012, bevelThickness: .015, bevelSegments: 3, steps: 1 });
    shell.translate(0, 0, -.055);
    return { shell, tongue: box(.70, .15, .09, .006), panel: new THREE.PlaneGeometry(.64, .65), recess: box(.73, .87, .012, .018), rear: box(.75, .88, .012, .018), spine: new THREE.PlaneGeometry(.105, .90), contact: box(.011, .027, .006, .001), well: new THREE.TorusGeometry(.021, .004, 5, 12), screw: new THREE.CylinderGeometry(.013, .013, .006, 8), molding: box(.008, .87, .009, .003) };
}
export function getSharedCartridgeGeometries() { return shared ??= makeGeometries(); }
export function createCartridgeModel(options: {
    labelMaterial?: THREE.MeshBasicMaterial;
    spineMaterial?: THREE.MeshStandardMaterial;
} = {}) {
    const geo = getSharedCartridgeGeometries(), group = new THREE.Group();
    group.name = 'universal-cartridge';
    const { plastic, dark, metal } = getSharedMaterials();
    const shell = part(group, 'shell', geo.shell, plastic, [0, 0, 0]);
    const tongue = part(group, 'connectorTongue', geo.tongue, plastic, [0, .075, 0]);
    const frontFrame = new THREE.Group();
    frontFrame.name = 'frontFrame';
    group.add(frontFrame);
    const recess = part(frontFrame, 'labelRecess', geo.recess, dark, [0, .675, .071]);
    recess.userData.explodeWithParent = true;
    const label = part(frontFrame, 'labelPanel', geo.panel, options.labelMaterial ?? new THREE.MeshBasicMaterial({ color: 0x252934, toneMapped: false }), [0, .70, .079]);
    label.userData.explodeWithParent = true;
    part(group, 'rearShell', geo.rear, plastic, [0, .675, -.075]);
    const spine = part(group, 'spine', geo.spine, options.spineMaterial ?? new THREE.MeshStandardMaterial({ color: 0x252934, roughness: .64 }), [-.433, .655, 0]);
    spine.rotation.y = -Math.PI / 2;
    const contacts = new THREE.Group();
    contacts.name = 'contacts';
    group.add(contacts);
    const screwWells = new THREE.Group();
    screwWells.name = 'screwWells';
    group.add(screwWells);
    const gripCorners = new THREE.Group();
    gripCorners.name = 'gripCorners';
    group.add(gripCorners);
    const seam = new THREE.Group();
    seam.name = 'seam';
    group.add(seam);
    const instances = (parent: THREE.Group, name: string, geometry: THREE.BufferGeometry, material: THREE.Material, positions: number[][], rotationX = 0) => { const mesh = new THREE.InstancedMesh(geometry, material, positions.length); mesh.name = name; const transform = new THREE.Object3D(); transform.rotation.x = rotationX; positions.forEach((position, index) => { transform.position.set(position[0], position[1], position[2]); transform.updateMatrix(); mesh.setMatrixAt(index, transform.matrix); }); parent.add(mesh); return mesh; };
    instances(contacts, 'contact-array', geo.contact, metal, Array.from({ length: 28 }, (_, i) => [-.31 + i * .023, .016, .047]));
    const screwPositions = [[-.30, .225], [.30, .225], [-.30, 1.065], [.30, 1.065]];
    instances(screwWells, 'well-array', geo.well, dark, screwPositions.map(([x, y]) => [x, y, -.075]));
    instances(screwWells, 'screw-array', geo.screw, dark, screwPositions.map(([x, y]) => [x, y, -.077]), Math.PI / 2);
    instances(seam, 'mold-seam-array', geo.molding, dark, [[-.378, .665, .068], [.378, .665, .068]]);
    instances(gripCorners, 'grip-array', box(.025, .009, .015, .002), dark, [-.38, .35].flatMap(x => Array.from({ length: 3 }, (_, i) => [x, 1.02 - i * .035, .068])));
    const connectorTongue = new THREE.Object3D();
    connectorTongue.name = 'connectorTip';
    group.add(connectorTongue);
    const parts = { shell, connectorTongue: tongue, frontFrame, labelPanel: label, labelRecess: recess, rearShell: group.getObjectByName('rearShell')!, spine, contacts, screwWells, gripCorners, seam };
    const assembly = enableAssembly(group, parts);
    const originals = new Map<THREE.Mesh, THREE.Material | THREE.Material[]>(), clones = new Map<THREE.Material, THREE.Material>();
    const clone = (material: THREE.Material) => {
        let copy = clones.get(material);
        if (!copy) {
            copy = material.clone();
            clones.set(material, copy);
        }
        return copy;
    };
    const setSpine = (texture: THREE.Texture) => { spine.material.map = texture; spine.material.color.set(0xffffff); spine.material.needsUpdate = true; };
    return { group, parts, assembly, anchors: { connectorTongue }, setSpine, setLabel(texture: THREE.Texture, spineTexture: THREE.Texture) { label.material.map = texture; label.material.color.set(0xffffff); label.material.needsUpdate = true; setSpine(spineTexture); }, setClipping(plane: THREE.Plane | null) {
            if (!plane) {
                for (const [mesh, material] of originals)
                    mesh.material = material;
                originals.clear();
                clones.forEach(material => material.dispose());
                clones.clear();
                return;
            }
            if (!originals.size)
                group.traverse(object => {
                    if (object instanceof THREE.Mesh) {
                        originals.set(object, object.material);
                        object.material = Array.isArray(object.material) ? object.material.map(clone) : clone(object.material);
                    }
                });
            clones.forEach(material => { material.clippingPlanes = [plane]; material.needsUpdate = true; });
        } };
}
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/models/createDeck01Model.ts">
<![CDATA[import * as THREE from 'three';
import { box, part, polymer, enableAssembly } from './geometry';
export const DECK_SLOT = { width: .99, depth: .18, entranceY: 1.075, z: -1.05, floorY: .76, dockY: .84 } as const;
export interface Deck01Anchors {
    slotEntrance: THREE.Object3D;
    slotAlignment: THREE.Object3D;
    slotFullyInserted: THREE.Object3D;
    screenPlane: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
}
export function createDeck01Model() {
    const group = new THREE.Group();
    group.name = 'DECK-01';
    const plastic = polymer(), cavity = new THREE.MeshStandardMaterial({ color: 0x090b10, roughness: .88 }), trim = new THREE.MeshStandardMaterial({ color: 0x17191e, roughness: .43 });
    const shell = new THREE.Group();
    shell.name = 'shell';
    group.add(shell);
    part(shell, 'lower-shell', box(2.4, .22, 2.745, .055), plastic, [0, .11, 0]);
    const profile = new THREE.Shape();
    profile.moveTo(-1.35, .20);
    profile.lineTo(1.35, .20);
    profile.lineTo(1.35, 1.08);
    profile.lineTo(.84, 1.08);
    profile.lineTo(-1.35, .30);
    profile.closePath();
    const cheekGeometry = new THREE.ExtrudeGeometry(profile, { depth: .14, bevelEnabled: true, bevelSize: .038, bevelThickness: .025, bevelSegments: 4, steps: 1 });
    cheekGeometry.rotateY(Math.PI / 2);
    part(shell, 'right-cheek', cheekGeometry, plastic, [1.06, 0, 0]);
    part(shell, 'left-cheek', cheekGeometry, plastic, [-1.20, 0, 0]);
    part(shell, 'rear-wall', box(2.15, .83, .09, .025), plastic, [0, .64, -1.31]);
    part(shell, 'front-lip', box(2.18, .14, .09, .025), plastic, [0, .265, 1.31]);
    const slope = Math.atan((1.08 - .30) / 2.19);
    const surfaceY = (z: number) => .30 + (1.35 - z) * Math.tan(slope);
    const slopedPanel = part(shell, 'inclined-panel', box(2.18, .05, 2.32, .02), plastic, [0, surfaceY(.245) - .026, .245]);
    slopedPanel.rotation.x = slope;
    // Closed overlapping frame segments keep the opening empty and avoid concave bevel folds.
    const rearDeck = new THREE.Group();
    rearDeck.name = 'rear-deck';
    shell.add(rearDeck);
    for (const sign of [-1, 1]) {
        part(rearDeck, `rear-frame-side-${sign < 0 ? 'left' : 'right'}`, box(.595, .045, .51, .008), plastic, [sign * .7925, 1.0475, DECK_SLOT.z]);
        part(rearDeck, `rear-frame-edge-${sign < 0 ? 'rear' : 'front'}`, box(1.05, .045, .165, .008), plastic, [0, 1.0475, DECK_SLOT.z + sign * .1725]);
    }
    const slotLip = new THREE.Group();
    slotLip.name = 'slotLip';
    group.add(slotLip);
    const slotInterior = new THREE.Group();
    slotInterior.name = 'slotInterior';
    group.add(slotInterior);
    for (const sign of [-1, 1]) {
        part(slotLip, `slot-edge-${sign < 0 ? 'rear' : 'front'}`, box(1.05, .018, .025, .005), trim, [0, DECK_SLOT.entranceY, DECK_SLOT.z + sign * .104]);
        part(slotLip, `slot-end-${sign < 0 ? 'left' : 'right'}`, box(.025, .018, .20, .005), trim, [sign * .516, DECK_SLOT.entranceY, DECK_SLOT.z]);
        part(slotInterior, `slot-wall-${sign < 0 ? 'rear' : 'front'}`, box(1.02, .28, .025, .005), cavity, [0, .91, DECK_SLOT.z + sign * .105]);
        part(slotInterior, `end-guide-${sign < 0 ? 'left' : 'right'}`, box(.025, .28, .18, .005), cavity, [sign * .509, .91, DECK_SLOT.z]);
    }
    part(slotInterior, 'slot-floor', box(.99, .035, .18, .005), cavity, [0, DECK_SLOT.floorY, DECK_SLOT.z]);
    const screenBezel = part(group, 'screenBezel', box(1.96, .036, 1.32, .035), trim, [0, surfaceY(.28) + .012, .28]);
    screenBezel.rotation.x = slope;
    const screenGlass = part(group, 'screenGlass', box(1.83, .018, 1.20, .018), new THREE.MeshPhysicalMaterial({ color: 0x11151b, roughness: .22, clearcoat: 1, clearcoatRoughness: .12 }), [0, surfaceY(.28) + .043, .28]);
    screenGlass.rotation.x = slope;
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.73, 1.05), new THREE.MeshBasicMaterial({ color: 0x080c12 }));
    screen.name = 'activeScreenPlane';
    screen.rotation.x = -Math.PI / 2 + slope;
    screen.position.set(0, surfaceY(.28) + .059, .28);
    group.add(screen);
    const anchor = (name: string, y: number) => { const object = new THREE.Object3D(); object.name = name; object.position.set(0, y, DECK_SLOT.z); group.add(object); return object; };
    const anchors: Deck01Anchors = { slotEntrance: anchor('slotEntrance', DECK_SLOT.entranceY), slotAlignment: anchor('slotAlignment', 1.55), slotFullyInserted: anchor('slotFullyInserted', DECK_SLOT.dockY), screenPlane: screen };
    const frontButtons = new THREE.Group();
    frontButtons.name = 'frontButtons';
    group.add(frontButtons);
    for (const x of [-.84, -.58, .58, .84])
        part(frontButtons, `button-${x < 0 ? 'left' : 'right'}-${Math.abs(x)}`, box(.17, .053, .035, .014), trim, [x, .275, 1.367]);
    const indicator = part(group, 'powerIndicator', new THREE.SphereGeometry(.018, 12, 8), new THREE.MeshStandardMaterial({ color: 0xcdf266, emissive: 0xcdf266, emissiveIntensity: .05 }), [.84, surfaceY(1.15) + .02, 1.15]);
    const baseSeam = part(group, 'baseSeam', box(2.37, .015, 2.71, .03), trim, [0, .22, 0]);
    const ventRibs = new THREE.Group();
    ventRibs.name = 'ventRibs';
    group.add(ventRibs);
    const dummy = new THREE.Object3D();
    const lowerVents = new THREE.InstancedMesh(box(.012, .105, .023, .004), cavity, 84);
    lowerVents.name = 'lower-vent-recesses';
    ventRibs.add(lowerVents);
    let instance = 0;
    for (const sign of [-1, 1])
        for (let i = 0; i < 42; i++) {
            dummy.position.set(sign * 1.205, .12, -1.23 + i * .06);
            dummy.updateMatrix();
            lowerVents.setMatrixAt(instance++, dummy.matrix);
        }
    const upperVents = new THREE.InstancedMesh(box(.09, .02, .026, .005), cavity, 28);
    upperVents.name = 'upper-vent-recesses';
    ventRibs.add(upperVents);
    instance = 0;
    for (const sign of [-1, 1])
        for (let i = 0; i < 14; i++) {
            const z = -1.27 + i * .038;
            dummy.position.set(sign * 1.155, z < -.84 ? 1.092 : surfaceY(z) + .018, z);
            dummy.updateMatrix();
            upperVents.setMatrixAt(instance++, dummy.matrix);
        }
    const contactMaterial = new THREE.MeshStandardMaterial({ color: 0xb29c6c, metalness: .8, roughness: .3 });
    for (let i = 0; i < 28; i++)
        part(slotInterior, `slot-contact-${i}`, box(.012, .025, .025, .002), contactMaterial, [-.33 + i * .024, .803, DECK_SLOT.z]);
    for (const x of [-.9, .9])
        for (const z of [-1.12, 1.12])
            part(shell, `rubber-foot-${x < 0 ? 'left' : 'right'}-${z < 0 ? 'rear' : 'front'}`, box(.21, .04, .18, .02), cavity, [x, -.01, z]);
    const parts = { shell, screenBezel, screenGlass, activeScreenPlane: screen, slotLip, slotInterior, ventRibs, frontButtons, powerIndicator: indicator, baseSeam };
    screen.userData.explodeWithParent = true;
    screenGlass.attach(screen);
    const assembly = enableAssembly(group, parts);
    return { group, anchors, parts, assembly, setBootState(state: number) { indicator.material.emissiveIntensity = state * 2 + .05; screen.material.color.set(state ? 0xcdf266 : 0x080c12); } };
}
]]>
    </file>
    <file path="src/app/(savepoint)/savepoint/models/geometry.ts">
<![CDATA[import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
export function box(width: number, height: number, depth: number, radius = .015) { return new RoundedBoxGeometry(width, height, depth, 2, Math.min(radius, width / 3, height / 3, depth / 3)); }
export function part<M extends THREE.Material>(parent: THREE.Object3D, name: string, geometry: THREE.BufferGeometry, material: M, position: [
    number,
    number,
    number
]) { const mesh = new THREE.Mesh(geometry, material); mesh.name = name; mesh.position.set(...position); mesh.userData.partId = name; parent.add(mesh); return mesh; }
let polymerMaps: {
    roughness: THREE.DataTexture;
    height: THREE.DataTexture;
} | null = null;
function getPolymerMaps() {
    if (polymerMaps)
        return polymerMaps;
    const size = 1024, roughness = new Uint8Array(size * size * 4), height = new Uint8Array(size * size * 4);
    let seed = 19341;
    const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) | 0; return (seed >>> 0) / 4294967296; };
    for (let y = 0; y < size; y++)
        for (let x = 0; x < size; x++) {
            const index = (y * size + x) * 4;
            const broad = Math.sin(x * .019) * Math.cos(y * .023);
            const rough = Math.round(224 + broad * 8 + (random() - .5) * 20);
            const grain = Math.round(128 + Math.sin(x * .35) * Math.sin(y * .29) * 5 + (random() - .5) * 24);
            for (let channel = 0; channel < 3; channel++) {
                roughness[index + channel] = rough;
                height[index + channel] = grain;
            }
            roughness[index + 3] = height[index + 3] = 255;
        }
    const make = (data: Uint8Array) => { const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat); texture.wrapS = texture.wrapT = THREE.RepeatWrapping; texture.repeat.set(3, 3); texture.needsUpdate = true; return texture; };
    return polymerMaps = { roughness: make(roughness), height: make(height) };
}
export const polymer = () => { const maps = getPolymerMaps(); return new THREE.MeshPhysicalMaterial({ color: 0x24262c, roughness: .66, roughnessMap: maps.roughness, bumpMap: maps.height, bumpScale: .0008, metalness: 0, clearcoat: .08, clearcoatRoughness: .48 }); };
export function disposePolymerMaps() { polymerMaps?.roughness.dispose(); polymerMaps?.height.dispose(); polymerMaps = null; }
export function enableAssembly(group: THREE.Group, parts: Record<string, THREE.Object3D>) {
    group.updateMatrixWorld(true);
    const center = new THREE.Box3().setFromObject(group).getCenter(new THREE.Vector3());
    const records = Object.values(parts).filter(object => !object.userData.explodeWithParent).map((object, index) => {
        const partCenter = new THREE.Box3().setFromObject(object).getCenter(new THREE.Vector3());
        const direction = partCenter.sub(center);
        if (direction.lengthSq() < .001)
            direction.set(0, index % 2 ? 1 : -1, 0);
        const clearance = direction.clone().normalize().multiplyScalar(.12);
        return { object, origin: object.position.clone(), offset: direction.add(clearance).add(new THREE.Vector3(0, (index % 2 ? 1 : -1) * index * .015, 0)) };
    });
    const lookup = new Map(Object.entries(parts).map(([name, object]) => [object, name]));
    const runtime = { nodes: parts, destructionGroups: Object.keys(parts), setExploded(amount: number) {
            const value = THREE.MathUtils.clamp(amount, 0, 1);
            for (const record of records)
                record.object.position.copy(record.origin).addScaledVector(record.offset, value);
            group.updateMatrixWorld(true);
        }, pickPart(hit: THREE.Object3D) {
            let object: THREE.Object3D | null = hit;
            while (object && object !== group) {
                const name = lookup.get(object);
                if (name && !object.userData.explodeWithParent)
                    return name;
                object = object.parent;
            }
            return null;
        } };
    group.userData.sculptRuntime = runtime;
    return runtime;
}
]]>
    </file>
  </files>
</template>
