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
    <file path="src/app/(savepoint)/savepoint/MILESTONE_STATUS.json">
<![CDATA[{
  "milestones": {
    "1": "passed: assets, route scaffold, typed catalog and gallery registration",
    "2": "passed: both procedural hardware models completed all eight sculpt passes and final geometry/coverage gates",
    "3": "passed: 30-cartridge infinite rail, arrows, keyboard, drag/snap, raycast selection and directional captions",
    "4": "passed: world-space insertion, physical cavity occlusion, boot display, projected takeover, skip, reverse ejection, focus, history, reduced motion and context recovery",
    "5": "passed: hardware inspection, manifesto, ten-world filtered catalog, working shelf/boot actions, footer, fine-pointer cursor, design and complete rebuild documentation",
    "6": "passed: production build and TypeScript, isolation/palette/media, copy bundles, all 1260 unit tests, 12 production Playwright tests, five-size visual and content QA"
  },
  "route": "http://localhost:3100/savepoint",
  "milestones5And6Implemented": true,
  "checks": {
    "typescript": "repository-wide tsc --noEmit passed",
    "isolation": "passed",
    "approvedAssets": {
      "count": 26,
      "unchangedFromSource": true
    },
    "browser": {
      "errors": [],
      "httpFailures": [],
      "primaryCanvasCount": 1,
      "inspectionCanvasCount": 1,
      "horizontalOverflow": false,
      "viewports": [
        [
          1920,
          1080
        ],
        [
          1366,
          768
        ],
        [
          1024,
          768
        ],
        [
          768,
          1024
        ],
        [
          390,
          844
        ]
      ],
      "visualReport": "public/templates/savepoint/verification/milestone-6/browser-report.json"
    },
    "insertionCalibration": {
      "sampleCount": 22,
      "axisError": 0,
      "dockError": 0,
      "slotRay": {
        "name": "slot-contact-14",
        "point": [
          0,
          0.3935000000793672,
          -1.05
        ]
      },
      "slotEntrance": [
        0,
        0.655,
        -1.05
      ],
      "fullyInserted": [
        0,
        0.42,
        -1.05
      ],
      "projectedScreen": {
        "points": [
          {
            "x": 550.8272749399214,
            "y": 396.6322592011064
          },
          {
            "x": 821.8020282893688,
            "y": 404.2730326231883
          },
          {
            "x": 824.5817401196863,
            "y": 530.4232602509833
          },
          {
            "x": 524.8299173687851,
            "y": 520.0327312829656
          }
        ],
        "left": 524.8299173687851,
        "top": 396.6322592011064,
        "width": 299.75182275090117,
        "height": 133.79100104987685
      },
      "drawCalls": 74,
      "triangles": 63610
    },
    "framing": [
      {
        "viewport": {
          "width": 1366,
          "height": 768
        },
        "sampleCount": 407,
        "clippedFrames": 0,
        "firstClipped": []
      },
      {
        "viewport": {
          "width": 390,
          "height": 844
        },
        "sampleCount": 439,
        "clippedFrames": 0,
        "firstClipped": []
      }
    ],
    "productionBuild": {
      "exitCode": 0,
      "completedAt": "2026-11-04T15:20:34.213Z"
    },
    "unitTests": {
      "files": 232,
      "passed": 1260,
      "failed": 0
    },
    "savepointPlaywrightTests": {
      "passed": 12,
      "failed": 0,
      "skipped": 0,
      "channel": "msedge",
      "server": "production",
      "workers": 1,
      "trace": "off"
    },
    "copyBundles": "complete source and prompt generated with three, @types/three, gsap and zustand",
    "palette": "passed",
    "media": "passed",
    "contentAudit": "public/templates/savepoint/verification/milestone-6/content-audit.json"
  },
  "models": {
    "deck01": {
      "silhouetteIoU": 0.867,
      "partCoverageErrors": 0,
      "partCoverageWarnings": 0,
      "selfIntersection": false,
      "closedPrototypeVerticesSampled": 52893
    },
    "cartridge": {
      "silhouetteIoU": 0.9037,
      "partCoverageErrors": 0,
      "partCoverageWarnings": 0,
      "selfIntersection": false,
      "closedPrototypeVerticesSampled": 6334
    }
  },
  "evidenceDirectory": "public/templates/savepoint/verification",
  "limitations": [
    "Hardware dimensions, hidden sides and polymer micrograin are procedural approximations of the supplied renders.",
    "Self-intersection tests cover closed geometry prototypes; flat artwork carriers are excluded and shared instanced prototypes are evaluated once."
  ],
  "completedThroughMilestone": 6,
  "awaitingUserInstructions": true,
  "completedAt": "2026-11-04T15:24:21.276108+00:00"
}
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
    const camera = new THREE.PerspectiveCamera(38, 1, .05, 100);
    camera.position.set(0, .85, 3.2);
    camera.lookAt(0, .60, 0);
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
        camera.fov = r.width < 600 ? 45 : 38;
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
            timeline.to(camera.position, { x: 0, y: .85, z: 3.2, duration: .5, onUpdate: () => camera.lookAt(0, .60, 0) }, '<');
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
        timeline.to(camera.position, { x: 0, y: .85, z: 3.2, duration: .6, onUpdate: () => camera.lookAt(0, .60, 0) }, '<');
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
    <file path="src/app/(savepoint)/savepoint/models/cartridge-sculpt-spec.json">
<![CDATA[{
  "targetName": "cartridge",
  "targetId": "cartridge",
  "schemaVersion": "2.1",
  "terminologyProfile": {
    "domain": "real-time procedural Three.js asset",
    "geometryTerms": [
      "silhouette",
      "topology",
      "primitive",
      "bevel",
      "chamfer",
      "taper",
      "bend",
      "boolean cut",
      "edge loop",
      "surface normal",
      "displacement"
    ],
    "materialTerms": [
      "albedo",
      "baseColor",
      "roughness",
      "metalness",
      "normal map",
      "bump map",
      "ambient occlusion",
      "cavity dirt",
      "edge wear",
      "clearcoat"
    ],
    "lightingTerms": [
      "key light",
      "fill light",
      "rim light",
      "HDRI/environment reflection",
      "contact shadow"
    ],
    "descriptionRule": "Use measurable 3D graphics terms. Avoid vague words unless they are paired with concrete geometry/material/shader parameters."
  },
  "sourceImage": "public/templates/savepoint/cartridge-shell-three-quarter.png",
  "referenceCamera": {
    "solved": true,
    "fovDegrees": 34,
    "aspect": 0.7466666666666667,
    "orientation": {
      "yaw": 0.3,
      "pitch": 0.1,
      "roll": 0
    },
    "positionHint": [
      0.65,
      0.7,
      2.1
    ],
    "note": "Review camera is calibrated to the reference footprint. Runtime canvas capture awaits a rendered frame and recomputes the view offset after resizing."
  },
  "suitability": "pass",
  "scores": {
    "object_isolation": 3,
    "silhouette_readability": 3,
    "depth_inference": 3,
    "primitive_decomposition": 3,
    "material_procedurality": 3,
    "occlusion_risk": 3,
    "interaction_fit": 3
  },
  "preSpecAssessment": {
    "objectClass": {
      "primaryType": "hard-surface electronic hardware",
      "primaryDomain": "object",
      "formLanguage": [
        "hard-surface",
        "geometric"
      ],
      "structureKind": [
        "layered shell",
        "compound object"
      ],
      "motionPotential": [
        "whole-object transform",
        "detachable"
      ],
      "materialFamilies": [
        "plastic",
        "glass",
        "metal"
      ],
      "notes": "upright beveled slab with clipped upper shoulder and projecting narrow connector"
    },
    "complexity": {
      "tier": "complex",
      "scores": {
        "silhouetteComplexity": 2,
        "componentCount": 2,
        "hierarchyDepth": 2,
        "repetitionDensity": 2,
        "materialLayerCount": 2,
        "localDetailDensity": 2,
        "occlusionRisk": 2,
        "actionReadinessNeed": 2
      },
      "estimatedCounts": {
        "macroComponents": 4,
        "mesoComponents": 8,
        "microFeatureGroups": 6,
        "materialLayers": 4,
        "repetitionSystems": 2
      },
      "reasoning": [
        "Three views reveal a compound hard-surface shell, layered panels, repeated contact/vent/fastener systems and an action-ready hierarchy."
      ]
    },
    "specDepthDecision": {
      "requiredDepth": "complex",
      "minimumComponentLevels": [
        "macro",
        "meso",
        "micro"
      ],
      "needsRepetitionSystems": true,
      "needsMaterialLocalOverrides": true,
      "needsMultipleReviewViews": true,
      "needsActionReadyHierarchy": true,
      "rationale": "Separate shell, aperture and contact assemblies with repeated molded details."
    },
    "unknownsToResolveBeforeImplementation": [],
    "detailInventory": {
      "scanMethod": "component-zones",
      "targetMinDetails": 10,
      "details": [
        {
          "id": "shell",
          "kind": "bevel",
          "description": "shell authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "shell"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "connectorTongue",
          "kind": "bevel",
          "description": "connectorTongue authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "connectorTongue"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "frontFrame",
          "kind": "bevel",
          "description": "frontFrame authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "frontFrame"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "labelRecess",
          "kind": "bevel",
          "description": "labelRecess authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "labelRecess"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "labelPanel",
          "kind": "decal",
          "description": "labelPanel authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "labelPanel"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "rearShell",
          "kind": "bevel",
          "description": "rearShell authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "rearShell"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "spine",
          "kind": "decal",
          "description": "spine authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "spine"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "contacts",
          "kind": "bevel",
          "description": "contacts authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "contacts"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "contact-array",
          "kind": "bevel",
          "description": "contact-array authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "contact-array"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "screwWells",
          "kind": "fastener",
          "description": "screwWells authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "screwWells"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "well-array",
          "kind": "bevel",
          "description": "well-array authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "well-array"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "screw-array",
          "kind": "fastener",
          "description": "screw-array authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "screw-array"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "gripCorners",
          "kind": "bevel",
          "description": "gripCorners authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "gripCorners"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "grip-array",
          "kind": "bevel",
          "description": "grip-array authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "grip-array"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "seam",
          "kind": "bevel",
          "description": "seam authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "seam"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "mold-seam-array",
          "kind": "bevel",
          "description": "mold-seam-array authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "mold-seam-array"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "connectorTip",
          "kind": "bevel",
          "description": "connectorTip authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "connectorTip"
          },
          "evidenceRefs": [
            "full-object"
          ]
        }
      ]
    },
    "sourceImage": "public/templates/savepoint/cartridge-shell-three-quarter.png"
  },
  "qualityContract": {
    "qualityBar": "complex",
    "definitionOfDone": [
      "upright beveled slab with clipped upper shoulder and projecting narrow connector",
      "label inset inside front frame; tongue below shell; rear fasteners embedded",
      "Nine named physical assemblies with dielectric polymer, glass and contact metal; front, rear and orbit inspection."
    ],
    "minimumSpecDepth": {
      "macroComponents": 3,
      "mesoComponents": 8,
      "microFeatureGroups": 5,
      "materialLayers": 3,
      "repetitionSystems": 1,
      "reviewViewpoints": 4
    },
    "featureGroups": [
      {
        "id": "overall-silhouette",
        "name": "Overall silhouette and proportions",
        "required": true,
        "qualityCriteria": [
          "Bounding shape, dominant curves, negative spaces, and scale relationships are explicitly described."
        ],
        "evidenceRefs": [
          "full-object"
        ],
        "failureModes": [
          "model reads as a generic placeholder instead of the reference object",
          "major proportions are guessed without evidence"
        ]
      },
      {
        "id": "primary-structure",
        "name": "Primary structure and hierarchy",
        "required": true,
        "qualityCriteria": [
          "Major parts, joints, seams, contact points, and parent-child relationships are named before code generation."
        ],
        "evidenceRefs": [
          "full-object"
        ],
        "failureModes": [
          "large visible parts are merged into one mesh",
          "component hierarchy is too shallow for the observed complexity"
        ]
      },
      {
        "id": "attachment-joint-correctness",
        "name": "Attachment and joint correctness",
        "required": true,
        "qualityCriteria": [
          "Every visible child appendage, branch, limb, handle, connector, tube, cable, horn, wing, leg, or hinged part has an attachment contract with parent socket, localStart/localEnd, contact type, embed/overlap, and gap tolerance."
        ],
        "evidenceRefs": [
          "full-object"
        ],
        "failureModes": [
          "child part root floats away from the parent",
          "branch/limb/tube is centered in space instead of pivoting from its root",
          "parent-child transform mixes world and local coordinates"
        ]
      },
      {
        "id": "surface-material-response",
        "name": "Surface material response",
        "required": true,
        "qualityCriteria": [
          "Albedo zones, roughness, normal/bump/displacement intent, cavity dirt, edge wear, and local overrides are specified where visible.",
          "Important materials define independent albedo, roughness, height/normal, and AO responses instead of reusing one texture for unrelated PBR channels.",
          "Surface response is decomposed into macro, meso, and micro frequency bands with scale and amplitude tied to object scale."
        ],
        "evidenceRefs": [
          "full-object"
        ],
        "failureModes": [
          "surface looks like flat plastic",
          "local material variation is missing or not tied to image evidence"
        ]
      },
      {
        "id": "reference-lookdev",
        "name": "Reference color, material, and lighting response",
        "required": true,
        "qualityCriteria": [
          "Material-pass names the reference-derived albedo palette, roughness variation, tactile normal/bump/displacement response, and local masks.",
          "When a source image is available, run reference PBR extraction and require confidence >= 0.7 before treating maps as implementation-ready.",
          "Lighting-pass names key/fill/rim or environment light, exposure, tone mapping, background, and contact shadow behavior.",
          "Neutral, grazing-angle, and reference-matched renders prove that surface relief survives relighting and is not painted into albedo."
        ],
        "evidenceRefs": [
          "full-object"
        ],
        "failureModes": [
          "model has acceptable shape but reads as flat shaded or plastic",
          "colors are a generic average instead of reference-observed local color zones",
          "lighting is evenly ambient and cannot reproduce the source value range"
        ]
      }
    ],
    "visualDeltaChecks": [
      "silhouette and negative-space delta",
      "component hierarchy depth delta",
      "repetition density and distribution delta",
      "material albedo/roughness/normal response delta",
      "local feature placement and scale delta"
    ],
    "antiShallowSpecRules": [
      "Do not proceed to code if qualityContract.qualityBar is unassessed.",
      "Do not proceed to code if the spec only contains a root component for a moderate or complex object.",
      "Do not proceed to code if required featureGroups are not represented by componentTree, materials, or repetitionSystems.",
      "Do not proceed to code if visible local features are described only in prose and not attached to components/materials/evidenceRefs.",
      "Do not proceed past structural-pass if attached child parts lack attachment.parentSocket, localStart, localEnd, embedDepth/overlap, and gapTolerance.",
      "Do not pass material look-dev when albedo is reused as roughness, height, normal, or AO.",
      "Do not pass material look-dev without macro, meso, and micro surface frequency bands for close-up materials.",
      "Do not pass reference-fidelity material look-dev from a source image without usable referencePbr maps or an explicit documented limitation.",
      "Do not patch a spec with extracted PBR maps when extraction confidence is below the target threshold unless the user explicitly accepts lower fidelity.",
      "Do not place adjacent separate-geometry parts below 0.02 world-unit seam overlap (source: grimoire/build/geometry_patterns.md).",
      "Do not satisfy raised or recessed relief, fasteners, or grip structure with a map alone when the feature affects form; use geometry or displacement (source: grimoire/build/geometry_patterns.md).",
      "Adjacent components must overlap by at least 0.02 world units at shared seams (source: grimoire/build/geometry_patterns.md).",
      "Raised or recessed relief and fasteners must be geometry, instanced micro-parts, or displacement; a map alone is an approximation (source: grimoire/build/geometry_patterns.md)."
    ],
    "mustNotDo": [
      "Do not proceed to code if qualityContract.qualityBar is unassessed.",
      "Do not proceed to code if the spec only contains a root component for a moderate or complex object.",
      "Do not proceed to code if required featureGroups are not represented by componentTree, materials, or repetitionSystems.",
      "Do not proceed to code if visible local features are described only in prose and not attached to components/materials/evidenceRefs.",
      "Do not proceed past structural-pass if attached child parts lack attachment.parentSocket, localStart, localEnd, embedDepth/overlap, and gapTolerance.",
      "Do not pass material look-dev when albedo is reused as roughness, height, normal, or AO.",
      "Do not pass material look-dev without macro, meso, and micro surface frequency bands for close-up materials.",
      "Do not pass reference-fidelity material look-dev from a source image without usable referencePbr maps or an explicit documented limitation.",
      "Do not patch a spec with extracted PBR maps when extraction confidence is below the target threshold unless the user explicitly accepts lower fidelity.",
      "Do not place adjacent separate-geometry parts below 0.02 world-unit seam overlap (source: grimoire/build/geometry_patterns.md).",
      "Do not satisfy raised or recessed relief, fasteners, or grip structure with a map alone when the feature affects form; use geometry or displacement (source: grimoire/build/geometry_patterns.md).",
      "Adjacent components must overlap by at least 0.02 world units at shared seams (source: grimoire/build/geometry_patterns.md).",
      "Raised or recessed relief and fasteners must be geometry, instanced micro-parts, or displacement; a map alone is an approximation (source: grimoire/build/geometry_patterns.md)."
    ]
  },
  "qualityTargets": {
    "targetFidelity": 0.7,
    "mustMatch": [
      "macro silhouette and proportions",
      "primary material albedo/roughness response",
      "reference-derived PBR material response at or above 0.7 confidence when source pixels are usable",
      "most recognizable local features"
    ],
    "niceToHave": [
      "micro scratches, stains, chips, and dirt masks",
      "secondary lighting match"
    ],
    "fpsTarget": 60,
    "reviewViewpoints": [
      "front",
      "three-quarter",
      "side",
      "thickness-axis",
      "long-axis"
    ]
  },
  "selfCorrectLoop": {
    "enabled": true,
    "visualAcceptance": {
      "reviewer": "ai-vision",
      "threshold": 0.7,
      "comparisonArtifactRequired": true,
      "layerScoresRequired": true,
      "codePixelDiffIsAcceptanceAuthority": false,
      "scoringRule": "AI vision must inspect a side-by-side reference/render sheet and score the current pass from 0 to 1. Pixel-diff code may assist diagnostics but cannot approve a pass.",
      "requiredLayerScores": [
        "silhouetteProportion",
        "componentStructure",
        "formDetail",
        "materialSurface",
        "lightingCamera"
      ],
      "featureReviewPolicy": {
        "enabled": true,
        "reviewUnit": "semantic-subsystem",
        "maxCriticalFeaturesPerPass": 5,
        "maxImportantFeaturesPerPass": 3,
        "criticalDefaultThreshold": 0.8,
        "importantAverageThreshold": 0.65,
        "adaptiveEscalation": true,
        "singleImagePairOnly": true,
        "selectionRule": "Choose only the most visually salient, identity-defining, user-prioritized, or high-risk semantic systems. Group repeated parts instead of reviewing every mesh. AI vision scores every selected feature from the same full reference/render pair."
      }
    },
    "reviewAfterPasses": [
      "blockout",
      "structural-pass",
      "form-refinement",
      "material-pass",
      "surface-pass",
      "lighting-pass",
      "interaction-pass",
      "optimization-pass"
    ],
    "allowedActions": [
      "continue",
      "refine-spec",
      "refine-code",
      "request-input",
      "stop"
    ],
    "specRefineTriggers": [
      "missing component",
      "wrong primitive family",
      "wrong proportions",
      "material layer under-specified",
      "local feature not traceable to viewEvidence",
      "reference ambiguity discovered during implementation"
    ],
    "codeRefineTriggers": [
      "spec is adequate but generated geometry/material does not match",
      "browser render differs from reference",
      "performance budget exceeded",
      "lighting hides geometry or material response"
    ],
    "stopCriteria": [
      "target fidelity reached or user accepts current approximation",
      "remaining gaps require new reference images or manual art"
    ],
    "screenshotPolicy": {
      "requiredForPasses": [
        "blockout",
        "structural-pass",
        "form-refinement",
        "material-pass",
        "surface-pass",
        "lighting-pass",
        "interaction-pass"
      ],
      "preferredCapture": "in-app-browser-screenshot",
      "fallbackCapture": "user-supplied-screenshot-path",
      "minimumEvidence": "Each visual pass needs a reference image, rendered screenshot, side-by-side comparison sheet, AI vision score, layer scores, and critique before choosing continue.",
      "reviewPairRule": "Compare the same camera/viewpoint whenever possible; do not judge a front reference against a random render angle.",
      "acceptanceAuthority": "AI vision review of the comparison sheet. Code-generated pixel similarity is not sufficient evidence."
    }
  },
  "featureReviewTargets": [
    {
      "id": "silhouette",
      "name": "Stepped shell silhouette and connector proportions",
      "tier": "critical",
      "passIds": [
        "blockout"
      ],
      "threshold": 0.8,
      "evidenceRefs": [
        "full-object"
      ]
    },
    {
      "id": "stepped-shell",
      "name": "stepped-shell",
      "tier": "critical",
      "passIds": [
        "structural-pass"
      ],
      "minimumScore": 0.8,
      "evidenceRefs": [
        "full-object"
      ]
    },
    {
      "id": "recessed-label",
      "name": "recessed-label",
      "tier": "critical",
      "passIds": [
        "structural-pass"
      ],
      "minimumScore": 0.8,
      "evidenceRefs": [
        "full-object"
      ]
    },
    {
      "id": "contacts-and-fasteners",
      "name": "contacts-and-fasteners",
      "tier": "critical",
      "passIds": [
        "form-refinement"
      ],
      "minimumScore": 0.8,
      "evidenceRefs": [
        "full-object"
      ]
    },
    {
      "id": "polymer-label",
      "name": "polymer-label",
      "tier": "critical",
      "passIds": [
        "material-pass"
      ],
      "minimumScore": 0.8,
      "evidenceRefs": [
        "full-object"
      ]
    },
    {
      "id": "surface-response",
      "name": "surface-response",
      "tier": "critical",
      "passIds": [
        "surface-pass"
      ],
      "minimumScore": 0.8,
      "evidenceRefs": [
        "full-object"
      ]
    },
    {
      "id": "form-lighting",
      "name": "form-lighting",
      "tier": "critical",
      "passIds": [
        "lighting-pass"
      ],
      "minimumScore": 0.8,
      "evidenceRefs": [
        "full-object"
      ]
    },
    {
      "id": "connector-axis",
      "name": "connector-axis",
      "tier": "critical",
      "passIds": [
        "interaction-pass"
      ],
      "minimumScore": 0.8,
      "evidenceRefs": [
        "full-object"
      ]
    }
  ],
  "lookDevTargets": {
    "qualityPriority": "reference-fidelity",
    "materialPass": {
      "albedoPaletteRequired": true,
      "roughnessVariationRequired": true,
      "normalOrBumpRequired": true,
      "localOverridesRequired": true,
      "minimumTextureResolution": 1024,
      "preferredTextureResolution": 2048,
      "independentMapChannels": [
        "albedo",
        "roughness",
        "height",
        "normal",
        "ambient-occlusion"
      ],
      "requiredSurfaceFrequencyBands": [
        "macro",
        "meso",
        "micro"
      ],
      "geometryReliefRequiredWhenSilhouetteAffected": true,
      "referencePbrExtraction": {
        "requiredWhenSourceImagePresent": true,
        "targetThreshold": 0.7,
        "stopOnLowConfidence": true,
        "script": "forge/stage1_intake/extract_pbr_evidence.py",
        "acceptedLimitation": "single-image extraction is reference-derived inference, not exact photogrammetry"
      },
      "mustAvoid": [
        "single flat albedo per material",
        "uniform roughness",
        "albedo texture reused as roughness/height/normal/AO",
        "single-frequency random noise",
        "plastic-looking smooth bark, stone, cloth, foliage, or aged material",
        "local color/detail described only in prose without material masks",
        "claiming exact PBR recovery when confidence is below the target threshold"
      ]
    },
    "lightingPass": {
      "requiredTerms": [
        "key light",
        "fill light",
        "rim or environment light",
        "exposure",
        "tone mapping",
        "background",
        "contact shadow"
      ],
      "mustAvoid": [
        "ambient-only lighting",
        "flat value range",
        "missing contact shadow",
        "reference lighting copied without separating material readability"
      ]
    },
    "screenshotReview": [
      "Compare albedo palette and local color zones.",
      "Compare roughness/normal/bump response under light.",
      "Compare cavity dirt, edge wear, stains, moss, scratches, or other local masks.",
      "Compare key/fill/rim structure, exposure, tone mapping, background, and contact shadows.",
      "Capture a neutral-light render to verify material readability without reference lighting.",
      "Capture a grazing-light close-up to expose flat normals, uniform roughness, tiling, and plastic highlights.",
      "Capture a reference-matched render from the same camera framing as the source."
    ]
  },
  "actionReadiness": {
    "contract": "Every macro/meso component should be generated as a stable named Object3D pivot node with a mesh child, action metadata, optional sockets, collider proxy, and destruction metadata.",
    "defaultRigType": "action-ready-static-rig",
    "rootMotionNode": "root",
    "requiredComponentFields": [
      "id",
      "parent",
      "transform",
      "attachment for child appendages, connectors, limbs, tubes, handles, legs, horns, wings, branches, or cables",
      "actionProfile.animationRole",
      "actionProfile.pivot",
      "actionProfile.collider",
      "actionProfile.destruction"
    ],
    "transformChannels": [
      "translate",
      "rotate",
      "scale",
      "bend",
      "twist",
      "detach",
      "visibility",
      "material-state"
    ],
    "authoringRules": [
      "Do not collapse independently movable parts into one mesh.",
      "Put transforms on component pivot groups, not only on raw meshes.",
      "For attached child parts, put the pivot at the semantic root/socket and build visible geometry from localStart to localEnd.",
      "Represent hinge, socket, detachable, and breakable intent even when no animation is implemented yet.",
      "Use simplified collider proxies for runtime physics instead of visual mesh colliders by default."
    ],
    "destructionPolicy": {
      "defaultBreakable": false,
      "fractureGroupNaming": "Use stable semantic names such as body-shell, left-hinge, glass-panel, branch-segment.",
      "debrisStrategy": "Prefer detachable component groups and a small number of procedural fragments over random mesh explosion."
    }
  },
  "assumptions": [
    "Conceptual dimensions are inferred from approved renders; hidden electronics and manufacturing tolerances are not reconstructed.",
    "Polymer micrograin is procedural. The approved surface art is used verbatim as its own texture source."
  ],
  "coordinateFrame": {
    "front": "+Z",
    "up": "+Y",
    "scaleReference": "100 mm per scene unit; reference-derived proportions take precedence over approximate conceptual dimensions"
  },
  "silhouette": {
    "boundingShape": "upright beveled slab with clipped upper shoulder and projecting narrow connector",
    "aspectRatios": [
      0.84,
      0.96,
      0.14
    ],
    "symmetry": "bilateral",
    "dominantCurves": [
      "beveled edges"
    ],
    "negativeSpaces": [
      "label recess"
    ],
    "landmarks": [
      "shell",
      "rearShell",
      "labelRecess",
      "labelPanel",
      "connectorTongue",
      "contacts",
      "screwWells",
      "gripCorners",
      "seam"
    ]
  },
  "viewEvidence": [
    {
      "id": "full-object",
      "view": "primary",
      "imageRegion": {
        "x": 0.0,
        "y": 0.0,
        "width": 1.0,
        "height": 1.0,
        "units": "normalized"
      },
      "observations": [
        "label inset inside front frame; tongue below shell; rear fasteners embedded",
        "charcoal satin dielectric polymer, low roughness glass, metal contacts"
      ],
      "confidence": 0.95
    }
  ],
  "componentTree": [
    {
      "id": "universal-cartridge",
      "name": "universal-cartridge",
      "level": "macro",
      "role": "pivot",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": null,
      "attachment": null,
      "dimensions": {
        "width": 0.8650000112056733,
        "height": 1.1820000439882279,
        "depth": 0.16000000005215406,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "universal-cartridge",
          "type": "bevel",
          "description": "universal-cartridge authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "shell",
      "name": "shell",
      "level": "macro",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "universal-cartridge",
      "attachment": {
        "parentSocket": "universal-cartridge",
        "localStart": [
          0,
          0,
          0
        ],
        "localEnd": [
          0,
          0,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.8640000224113464,
        "height": 1.0540000349283218,
        "depth": 0.14000000059604645,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "shell",
          "type": "bevel",
          "description": "shell authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "connectorTongue",
      "name": "connectorTongue",
      "level": "macro",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "universal-cartridge",
      "attachment": {
        "parentSocket": "universal-cartridge",
        "localStart": [
          0,
          0.075,
          0
        ],
        "localEnd": [
          0,
          0.075,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.699999988079071,
        "height": 0.15000000596046448,
        "depth": 0.09000000357627869,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0.075,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "connectorTongue",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "connectorTongue",
          "type": "bevel",
          "description": "connectorTongue authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "frontFrame",
      "name": "frontFrame",
      "level": "meso",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "universal-cartridge",
      "attachment": {
        "parentSocket": "universal-cartridge",
        "localStart": [
          0,
          0,
          0
        ],
        "localEnd": [
          0,
          0,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.7300000190734863,
        "height": 0.8700000047683716,
        "depth": 0.014000000052154071,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "frontFrame",
          "type": "bevel",
          "description": "frontFrame authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "labelRecess",
      "name": "labelRecess",
      "level": "meso",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "frontFrame",
      "attachment": {
        "parentSocket": "frontFrame",
        "localStart": [
          0,
          0.675,
          0.071
        ],
        "localEnd": [
          0,
          0.675,
          0.071
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.7300000190734863,
        "height": 0.8700000047683716,
        "depth": 0.012000000104308128,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0.675,
          0.071
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "labelRecess",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "labelRecess",
          "type": "bevel",
          "description": "labelRecess authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "labelPanel",
      "name": "labelPanel",
      "level": "meso",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "plane-card",
      "topologyClass": "material-only",
      "topologyRationale": "Flat artwork/display carrier with explicit UV coordinates.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "frontFrame",
      "attachment": {
        "parentSocket": "frontFrame",
        "localStart": [
          0,
          0.7,
          0.079
        ],
        "localEnd": [
          0,
          0.7,
          0.079
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.6399999856948853,
        "height": 0.6499999761581421,
        "depth": 0.001,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0.7,
          0.079
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "labelPanel",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "label",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "labelPanel",
          "type": "decal",
          "description": "labelPanel authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "rearShell",
      "name": "rearShell",
      "level": "macro",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "universal-cartridge",
      "attachment": {
        "parentSocket": "universal-cartridge",
        "localStart": [
          0,
          0.675,
          -0.075
        ],
        "localEnd": [
          0,
          0.675,
          -0.075
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.75,
        "height": 0.8799999952316284,
        "depth": 0.012000000104308128,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0.675,
          -0.075
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "rearShell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "rearShell",
          "type": "bevel",
          "description": "rearShell authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "spine",
      "name": "spine",
      "level": "meso",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "plane-card",
      "topologyClass": "material-only",
      "topologyRationale": "Flat artwork/display carrier with explicit UV coordinates.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "universal-cartridge",
      "attachment": {
        "parentSocket": "universal-cartridge",
        "localStart": [
          -0.433,
          0.655,
          0
        ],
        "localEnd": [
          -0.433,
          0.655,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.001,
        "height": 0.8999999761581421,
        "depth": 0.10499999672174454,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          -0.433,
          0.655,
          0
        ],
        "rotation": [
          0,
          -1.5707963267948966,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "label",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "spine",
          "type": "decal",
          "description": "spine authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "contacts",
      "name": "contacts",
      "level": "meso",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "universal-cartridge",
      "attachment": {
        "parentSocket": "universal-cartridge",
        "localStart": [
          0,
          0,
          0
        ],
        "localEnd": [
          0,
          0,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.6319999918341637,
        "height": 0.027000000700354576,
        "depth": 0.006000000052154064,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "contacts",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "contacts",
          "type": "bevel",
          "description": "contacts authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "contact-array",
      "name": "contact-array",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "contacts",
      "attachment": {
        "parentSocket": "contacts",
        "localStart": [
          0,
          0,
          0
        ],
        "localEnd": [
          0,
          0,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.6319999918341637,
        "height": 0.027000000700354576,
        "depth": 0.006000000052154064,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "contact-array",
          "type": "bevel",
          "description": "contact-array authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "screwWells",
      "name": "screwWells",
      "level": "meso",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "universal-cartridge",
      "attachment": {
        "parentSocket": "universal-cartridge",
        "localStart": [
          0,
          0,
          0
        ],
        "localEnd": [
          0,
          0,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.650000024586916,
        "height": 0.8900000639259815,
        "depth": 0.008804222801700234,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "screwWells",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "screwWells",
          "type": "bevel",
          "description": "screwWells authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "well-array",
      "name": "well-array",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "screwWells",
      "attachment": {
        "parentSocket": "screwWells",
        "localStart": [
          0,
          0,
          0
        ],
        "localEnd": [
          0,
          0,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.650000024586916,
        "height": 0.8900000639259815,
        "depth": 0.007608452346175909,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "well-array",
          "type": "bevel",
          "description": "well-array authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "screw-array",
      "name": "screw-array",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "screwWells",
      "attachment": {
        "parentSocket": "screwWells",
        "localStart": [
          0,
          0,
          0
        ],
        "localEnd": [
          0,
          0,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.6260000243782997,
        "height": 0.8660000637173653,
        "depth": 0.006000000052154064,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "screw-array",
          "type": "bevel",
          "description": "screw-array authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "gripCorners",
      "name": "gripCorners",
      "level": "meso",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "universal-cartridge",
      "attachment": {
        "parentSocket": "universal-cartridge",
        "localStart": [
          0,
          0,
          0
        ],
        "localEnd": [
          0,
          0,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.754999989643693,
        "height": 0.07899999246001244,
        "depth": 0.014999999664723873,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "gripCorners",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "gripCorners",
          "type": "bevel",
          "description": "gripCorners authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "grip-array",
      "name": "grip-array",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "gripCorners",
      "attachment": {
        "parentSocket": "gripCorners",
        "localStart": [
          0,
          0,
          0
        ],
        "localEnd": [
          0,
          0,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.754999989643693,
        "height": 0.07899999246001244,
        "depth": 0.014999999664723873,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "grip-array",
          "type": "bevel",
          "description": "grip-array authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "seam",
      "name": "seam",
      "level": "meso",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "universal-cartridge",
      "attachment": {
        "parentSocket": "universal-cartridge",
        "localStart": [
          0,
          0,
          0
        ],
        "localEnd": [
          0,
          0,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.7639999827370048,
        "height": 0.8700000047683716,
        "depth": 0.008999999612569809,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "seam",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "seam",
          "type": "bevel",
          "description": "seam authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "mold-seam-array",
      "name": "mold-seam-array",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "seam",
      "attachment": {
        "parentSocket": "seam",
        "localStart": [
          0,
          0,
          0
        ],
        "localEnd": [
          0,
          0,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.7639999827370048,
        "height": 0.8700000047683716,
        "depth": 0.008999999612569809,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "mold-seam-array",
          "type": "bevel",
          "description": "mold-seam-array authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "connectorTip",
      "name": "connectorTip",
      "level": "micro",
      "role": "pivot",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "material-only",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "universal-cartridge",
      "attachment": {
        "parentSocket": "universal-cartridge",
        "localStart": [
          0,
          0,
          0
        ],
        "localEnd": [
          0,
          0,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.001,
        "height": 0.001,
        "depth": 0.001,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "connectorTip",
          "type": "bevel",
          "description": "connectorTip authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    }
  ],
  "materials": [
    {
      "id": "base",
      "name": "Base material",
      "type": "standard",
      "shaderModel": "MeshStandardMaterial / PBR approximation",
      "baseColor": "#24262c",
      "color": "#24262c",
      "albedo": {
        "dominant": "#303238",
        "secondary": [
          "#202228",
          "#41444b"
        ],
        "samplingNotes": "Neutral charcoal shell; highlights excluded from albedo"
      },
      "colorVariation": {
        "palette": [
          "#8A7A5F",
          "#6E614B",
          "#A08F70"
        ],
        "pattern": "mottled",
        "amplitude": 0.15,
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
          "frequency": 2.0,
          "amplitude": 0.42,
          "role": "broad color and height breakup"
        },
        {
          "id": "meso",
          "frequency": 12.0,
          "amplitude": 0.22,
          "role": "ridges, pores, grain, dents, or equivalent visible relief"
        },
        {
          "id": "micro",
          "frequency": 56.0,
          "amplitude": 0.08,
          "role": "highlight breakup visible under grazing light"
        }
      ],
      "roughness": {
        "base": 0.66,
        "variation": 0.06,
        "map": "independent 1024px deterministic roughness field"
      },
      "metalness": {
        "base": 0,
        "variation": 0
      },
      "normal": {
        "pattern": "derived-from-independent-height-field",
        "strength": 0.35,
        "scale": 24.0,
        "space": "tangent"
      },
      "bump": {
        "pattern": "independent molded grain height",
        "amplitude": 0.0008,
        "scale": 3
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
          "id": "cavity-darkening",
          "region": "labelRecess and screwWells",
          "baseColor": "#090b10",
          "roughness": 0.88,
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "shaderNotes": [
        "Prefer MeshPhysicalMaterial when clearcoat, sheen, transmission, or thin-surface response is observed; otherwise use MeshStandardMaterial-compatible PBR channels.",
        "Generate albedo, roughness, height/normal, and AO independently; never alias albedo into roughness.",
        "Use normal/bump/displacement only when they map to observed surface relief.",
        "Use displacement geometry when the observed relief changes the close-up silhouette; texture-only relief is insufficient there."
      ],
      "notes": "Reference-derived inference; authored scalars and geometry implement the visible response. No manufacturing accuracy is claimed.",
      "referencePbr": {
        "usable": true,
        "confidence": 0.843,
        "maps": {
          "albedo": {
            "path": "public/templates/savepoint/pbr/polymer/base_albedo.png",
            "url": "base_albedo.png",
            "channel": "albedo",
            "source": "reference-pixel-extraction"
          },
          "roughness": {
            "path": "public/templates/savepoint/pbr/polymer/base_roughness.png",
            "url": "base_roughness.png",
            "channel": "roughness",
            "source": "reference-pixel-extraction"
          },
          "height": {
            "path": "public/templates/savepoint/pbr/polymer/base_height.png",
            "url": "base_height.png",
            "channel": "height",
            "source": "reference-pixel-extraction"
          },
          "normal": {
            "path": "public/templates/savepoint/pbr/polymer/base_normal.png",
            "url": "base_normal.png",
            "channel": "normal",
            "source": "reference-pixel-extraction"
          },
          "ao": {
            "path": "public/templates/savepoint/pbr/polymer/base_ao.png",
            "url": "base_ao.png",
            "channel": "ao",
            "source": "reference-pixel-extraction"
          }
        },
        "sourceImage": "public/templates/savepoint/verification/polymer.png",
        "method": "reference-pixel-extraction",
        "hardLimit": "single-image PBR extraction is an estimate; 70%+ extraction confidence still needs render screenshot review"
      }
    },
    {
      "id": "glass",
      "name": "Display glass",
      "type": "standard",
      "shaderModel": "MeshStandardMaterial / PBR approximation",
      "baseColor": "#0b0d12",
      "color": "#0b0d12",
      "albedo": {
        "dominant": "#303238",
        "secondary": [
          "#202228",
          "#41444b"
        ],
        "samplingNotes": "Neutral charcoal shell; highlights excluded from albedo"
      },
      "colorVariation": {
        "palette": [
          "#8A7A5F",
          "#6E614B",
          "#A08F70"
        ],
        "pattern": "mottled",
        "amplitude": 0.15,
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
          "frequency": 2.0,
          "amplitude": 0.42,
          "role": "broad color and height breakup"
        },
        {
          "id": "meso",
          "frequency": 12.0,
          "amplitude": 0.22,
          "role": "ridges, pores, grain, dents, or equivalent visible relief"
        },
        {
          "id": "micro",
          "frequency": 56.0,
          "amplitude": 0.08,
          "role": "highlight breakup visible under grazing light"
        }
      ],
      "roughness": {
        "base": 0.75,
        "variation": 0.15,
        "map": "independent-procedural-field",
        "localResponse": "higher roughness in cavities, lower roughness on worn edges"
      },
      "metalness": {
        "base": 0.0,
        "variation": 0.0
      },
      "normal": {
        "pattern": "derived-from-independent-height-field",
        "strength": 0.35,
        "scale": 24.0,
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
          "id": "cavity-darkening",
          "region": "labelRecess and screwWells",
          "baseColor": "#090b10",
          "roughness": 0.88,
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "shaderNotes": [
        "Prefer MeshPhysicalMaterial when clearcoat, sheen, transmission, or thin-surface response is observed; otherwise use MeshStandardMaterial-compatible PBR channels.",
        "Generate albedo, roughness, height/normal, and AO independently; never alias albedo into roughness.",
        "Use normal/bump/displacement only when they map to observed surface relief.",
        "Use displacement geometry when the observed relief changes the close-up silhouette; texture-only relief is insufficient there."
      ],
      "notes": "Reference-derived inference; authored scalars and geometry implement the visible response. No manufacturing accuracy is claimed.",
      "referencePbr": {
        "usable": true,
        "confidence": 0.716,
        "maps": {
          "albedo": {
            "path": "public/templates/savepoint/pbr/glass/glass_albedo.png",
            "url": "glass_albedo.png",
            "channel": "albedo",
            "source": "reference-pixel-extraction"
          },
          "roughness": {
            "path": "public/templates/savepoint/pbr/glass/glass_roughness.png",
            "url": "glass_roughness.png",
            "channel": "roughness",
            "source": "reference-pixel-extraction"
          },
          "height": {
            "path": "public/templates/savepoint/pbr/glass/glass_height.png",
            "url": "glass_height.png",
            "channel": "height",
            "source": "reference-pixel-extraction"
          },
          "normal": {
            "path": "public/templates/savepoint/pbr/glass/glass_normal.png",
            "url": "glass_normal.png",
            "channel": "normal",
            "source": "reference-pixel-extraction"
          },
          "ao": {
            "path": "public/templates/savepoint/pbr/glass/glass_ao.png",
            "url": "glass_ao.png",
            "channel": "ao",
            "source": "reference-pixel-extraction"
          }
        },
        "sourceImage": "public/templates/savepoint/verification/glass.png",
        "method": "reference-pixel-extraction",
        "hardLimit": "single-image PBR extraction is an estimate; 70%+ extraction confidence still needs render screenshot review"
      }
    },
    {
      "id": "metal",
      "name": "Contact metal",
      "type": "standard",
      "shaderModel": "MeshStandardMaterial / PBR approximation",
      "baseColor": "#b49d66",
      "color": "#b49d66",
      "albedo": {
        "dominant": "#303238",
        "secondary": [
          "#202228",
          "#41444b"
        ],
        "samplingNotes": "Neutral charcoal shell; highlights excluded from albedo"
      },
      "colorVariation": {
        "palette": [
          "#8A7A5F",
          "#6E614B",
          "#A08F70"
        ],
        "pattern": "mottled",
        "amplitude": 0.15,
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
          "frequency": 2.0,
          "amplitude": 0.42,
          "role": "broad color and height breakup"
        },
        {
          "id": "meso",
          "frequency": 12.0,
          "amplitude": 0.22,
          "role": "ridges, pores, grain, dents, or equivalent visible relief"
        },
        {
          "id": "micro",
          "frequency": 56.0,
          "amplitude": 0.08,
          "role": "highlight breakup visible under grazing light"
        }
      ],
      "roughness": {
        "base": 0.75,
        "variation": 0.15,
        "map": "independent-procedural-field",
        "localResponse": "higher roughness in cavities, lower roughness on worn edges"
      },
      "metalness": {
        "base": 0.0,
        "variation": 0.0
      },
      "normal": {
        "pattern": "derived-from-independent-height-field",
        "strength": 0.35,
        "scale": 24.0,
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
          "id": "cavity-darkening",
          "region": "labelRecess and screwWells",
          "baseColor": "#090b10",
          "roughness": 0.88,
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "shaderNotes": [
        "Prefer MeshPhysicalMaterial when clearcoat, sheen, transmission, or thin-surface response is observed; otherwise use MeshStandardMaterial-compatible PBR channels.",
        "Generate albedo, roughness, height/normal, and AO independently; never alias albedo into roughness.",
        "Use normal/bump/displacement only when they map to observed surface relief.",
        "Use displacement geometry when the observed relief changes the close-up silhouette; texture-only relief is insufficient there."
      ],
      "notes": "Reference-derived inference; authored scalars and geometry implement the visible response. No manufacturing accuracy is claimed.",
      "referencePbr": {
        "usable": true,
        "confidence": 0.843,
        "maps": {
          "albedo": {
            "path": "public/templates/savepoint/pbr/polymer/base_albedo.png",
            "url": "base_albedo.png",
            "channel": "albedo",
            "source": "reference-pixel-extraction"
          },
          "roughness": {
            "path": "public/templates/savepoint/pbr/polymer/base_roughness.png",
            "url": "base_roughness.png",
            "channel": "roughness",
            "source": "reference-pixel-extraction"
          },
          "height": {
            "path": "public/templates/savepoint/pbr/polymer/base_height.png",
            "url": "base_height.png",
            "channel": "height",
            "source": "reference-pixel-extraction"
          },
          "normal": {
            "path": "public/templates/savepoint/pbr/polymer/base_normal.png",
            "url": "base_normal.png",
            "channel": "normal",
            "source": "reference-pixel-extraction"
          },
          "ao": {
            "path": "public/templates/savepoint/pbr/polymer/base_ao.png",
            "url": "base_ao.png",
            "channel": "ao",
            "source": "reference-pixel-extraction"
          }
        },
        "sourceImage": "public/templates/savepoint/verification/polymer.png",
        "method": "reference-pixel-extraction",
        "hardLimit": "single-image PBR extraction is an estimate; 70%+ extraction confidence still needs render screenshot review"
      }
    },
    {
      "id": "label",
      "name": "Approved label and display carrier",
      "type": "standard",
      "shaderModel": "MeshBasicMaterial with sRGB CanvasTexture",
      "baseColor": "#24262c",
      "color": "#24262c",
      "albedo": {
        "dominant": "#303238",
        "secondary": [
          "#202228",
          "#41444b"
        ],
        "samplingNotes": "Neutral charcoal shell; highlights excluded from albedo"
      },
      "colorVariation": {
        "palette": [
          "#8A7A5F",
          "#6E614B",
          "#A08F70"
        ],
        "pattern": "mottled",
        "amplitude": 0.15,
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
          "frequency": 2.0,
          "amplitude": 0.42,
          "role": "broad color and height breakup"
        },
        {
          "id": "meso",
          "frequency": 12.0,
          "amplitude": 0.22,
          "role": "ridges, pores, grain, dents, or equivalent visible relief"
        },
        {
          "id": "micro",
          "frequency": 56.0,
          "amplitude": 0.08,
          "role": "highlight breakup visible under grazing light"
        }
      ],
      "roughness": {
        "base": 0.66,
        "variation": 0.06,
        "map": "independent 1024px deterministic roughness field"
      },
      "metalness": {
        "base": 0,
        "variation": 0
      },
      "normal": {
        "pattern": "derived-from-independent-height-field",
        "strength": 0.35,
        "scale": 24.0,
        "space": "tangent"
      },
      "bump": {
        "pattern": "independent molded grain height",
        "amplitude": 0.0008,
        "scale": 3
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
          "id": "cavity-darkening",
          "region": "labelRecess and screwWells",
          "baseColor": "#090b10",
          "roughness": 0.88,
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "shaderNotes": [
        "Prefer MeshPhysicalMaterial when clearcoat, sheen, transmission, or thin-surface response is observed; otherwise use MeshStandardMaterial-compatible PBR channels.",
        "Generate albedo, roughness, height/normal, and AO independently; never alias albedo into roughness.",
        "Use normal/bump/displacement only when they map to observed surface relief.",
        "Use displacement geometry when the observed relief changes the close-up silhouette; texture-only relief is insufficient there."
      ],
      "notes": "Actual supplied label artwork and world plates are composed without stretching; UI title and catalog typography are rendered into the label band.",
      "referencePbr": {
        "usable": true,
        "confidence": 0.843,
        "maps": {
          "albedo": {
            "path": "public/templates/savepoint/pbr/polymer/base_albedo.png",
            "url": "base_albedo.png",
            "channel": "albedo",
            "source": "reference-pixel-extraction"
          },
          "roughness": {
            "path": "public/templates/savepoint/pbr/polymer/base_roughness.png",
            "url": "base_roughness.png",
            "channel": "roughness",
            "source": "reference-pixel-extraction"
          },
          "height": {
            "path": "public/templates/savepoint/pbr/polymer/base_height.png",
            "url": "base_height.png",
            "channel": "height",
            "source": "reference-pixel-extraction"
          },
          "normal": {
            "path": "public/templates/savepoint/pbr/polymer/base_normal.png",
            "url": "base_normal.png",
            "channel": "normal",
            "source": "reference-pixel-extraction"
          },
          "ao": {
            "path": "public/templates/savepoint/pbr/polymer/base_ao.png",
            "url": "base_ao.png",
            "channel": "ao",
            "source": "reference-pixel-extraction"
          }
        },
        "sourceImage": "public/templates/savepoint/verification/polymer.png",
        "method": "reference-pixel-extraction",
        "hardLimit": "single-image PBR extraction is an estimate; 70%+ extraction confidence still needs render screenshot review"
      },
      "qualityTier": "utility"
    }
  ],
  "repetitionSystems": [
    {
      "id": "repeated-hardware",
      "componentRef": "contacts",
      "count": 20,
      "distribution": "linear",
      "spacing": 0.035,
      "evidenceRefs": [
        "full-object"
      ]
    }
  ],
  "buildPasses": [
    {
      "id": "blockout",
      "goal": "Match macro silhouette and proportions.",
      "componentRefs": [
        "shell",
        "rearShell",
        "labelRecess",
        "labelPanel",
        "connectorTongue",
        "contacts",
        "screwWells",
        "gripCorners",
        "seam"
      ],
      "acceptance": [
        "Silhouette reads correctly without materials.",
        "Quality contract has named all required macro feature groups before code generation.",
        "AI vision comparison score meets selfCorrectLoop.visualAcceptance.threshold."
      ]
    },
    {
      "id": "structural-pass",
      "goal": "Build the component hierarchy implied by the pre-spec complexity assessment.",
      "componentRefs": [
        "shell",
        "rearShell",
        "labelRecess",
        "labelPanel",
        "connectorTongue",
        "contacts",
        "screwWells",
        "gripCorners",
        "seam"
      ],
      "acceptance": [
        "Macro, meso, and repeated structures meet qualityContract.minimumSpecDepth.",
        "Parent-child relations, joints, seams, sockets, and contact points are explicit.",
        "Every attached child appendage/connector has parentSocket, localStart/localEnd, contactType, embedDepth or overlap, and gapTolerance.",
        "AI vision comparison score meets selfCorrectLoop.visualAcceptance.threshold."
      ]
    },
    {
      "id": "form-refinement",
      "goal": "Refine shape, deformation, bevels, tapers, curves, asymmetry, and visible local geometry.",
      "componentRefs": [
        "shell",
        "rearShell",
        "labelRecess",
        "labelPanel",
        "connectorTongue",
        "contacts",
        "screwWells",
        "gripCorners",
        "seam"
      ],
      "acceptance": [
        "Important visible forms are represented in component geometryDescriptor, deformations, localFeatures, or repetitionSystems.",
        "Endpoint-based child parts are rooted at their attachment sockets and do not visibly float away from parents.",
        "AI vision comparison score meets selfCorrectLoop.visualAcceptance.threshold."
      ]
    },
    {
      "id": "material-pass",
      "goal": "Match material color, roughness, bump, and local variation.",
      "componentRefs": [
        "shell",
        "rearShell",
        "labelRecess",
        "labelPanel",
        "connectorTongue",
        "contacts",
        "screwWells",
        "gripCorners",
        "seam"
      ],
      "acceptance": [
        "Reference-derived albedo palette records dominant, secondary, and accent colors per visible material.",
        "Each important material defines roughness variation and at least one normal/bump/displacement response.",
        "Local material overrides, dirt/wear/stains/moss/chips/scratches or equivalent masks are tied to evidenceRefs.",
        "Thin, transparent, reflective, wet, or fibrous materials document alpha/transmission/clearcoat/metalness/fiber response when relevant.",
        "Generated preview uses procedural albedo/roughness/bump texture or vertex color variation instead of one flat color.",
        "Generated preview uses independent PBR maps at 1024px or higher for the quality-first tier.",
        "If source pixels are available, referencePbr extraction passed at confidence >= 0.7 or the pass is stopped/requesting better references.",
        "Macro, meso, and micro surface frequency bands are visible at the intended review distance without obvious tiling.",
        "AI vision comparison score meets selfCorrectLoop.visualAcceptance.threshold."
      ]
    },
    {
      "id": "surface-pass",
      "goal": "Add procedural surface locality such as normal/bump/displacement, AO, dirt, stains, chips, grain, moss, scratches, and wear.",
      "componentRefs": [
        "shell",
        "rearShell",
        "labelRecess",
        "labelPanel",
        "connectorTongue",
        "contacts",
        "screwWells",
        "gripCorners",
        "seam"
      ],
      "acceptance": [
        "Every required material feature group has local overrides or surfaceDetail tied to evidenceRefs.",
        "A grazing-angle close-up proves that normal/height detail breaks highlights naturally and does not read as smooth plastic.",
        "AI vision comparison score meets selfCorrectLoop.visualAcceptance.threshold."
      ]
    },
    {
      "id": "lighting-pass",
      "goal": "Make material and form readable under neutral turntable lighting plus optional reference lighting.",
      "componentRefs": [
        "shell",
        "rearShell",
        "labelRecess",
        "labelPanel",
        "connectorTongue",
        "contacts",
        "screwWells",
        "gripCorners",
        "seam"
      ],
      "acceptance": [
        "lightingFromPhoto identifies key light direction/color/intensity, fill light, rim or environment light, and ambient color.",
        "Exposure, tone mapping, background color/gradient, shadow softness, and contact shadow behavior are specified.",
        "Lighting does not hide geometry/material gaps and screenshots can be compared fairly to the reference.",
        "Neutral, grazing, and reference-matched lighting checks distinguish material errors from lighting errors.",
        "AI vision comparison score meets selfCorrectLoop.visualAcceptance.threshold."
      ]
    },
    {
      "id": "interaction-pass",
      "goal": "Make the model ready for future animation, transformation, physics, or destruction.",
      "componentRefs": [
        "shell",
        "rearShell",
        "labelRecess",
        "labelPanel",
        "connectorTongue",
        "contacts",
        "screwWells",
        "gripCorners",
        "seam"
      ],
      "acceptance": [
        "Macro and movable meso components have stable pivot nodes.",
        "Sockets, collider proxies, and destruction metadata are present for future runtime actions.",
        "AI vision comparison score meets selfCorrectLoop.visualAcceptance.threshold."
      ]
    },
    {
      "id": "optimization-pass",
      "goal": "Protect runtime performance after visual fidelity is accepted.",
      "componentRefs": [
        "shell",
        "rearShell",
        "labelRecess",
        "labelPanel",
        "connectorTongue",
        "contacts",
        "screwWells",
        "gripCorners",
        "seam"
      ],
      "acceptance": [
        "Triangle count, draw calls, instancing, LOD strategy, and FPS target are documented or verified.",
        "Repeated detail is instanced or simplified where possible without breaking silhouette/material believability."
      ]
    }
  ],
  "visualEvidence": [
    {
      "timestamp": "2026-11-04T09:04:13.042515+00:00",
      "passId": "blockout",
      "estimatedFidelity": 0.81,
      "aiVisionScore": 0.81,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.81,
        "componentStructure": 0.5,
        "formDetail": 0.4,
        "materialSurface": 0.5,
        "lightingCamera": 0.81
      },
      "featureReviews": [
        {
          "id": "silhouette",
          "score": 0.81,
          "visible": true,
          "notes": "Unlit map-stripped silhouette and physical thickness accepted for blockout only. The reference corner footprint and projecting connector read correctly. Recesses, slot cavity, molding and final materials belong to subsequent passes."
        }
      ],
      "referenceScreenshot": "public/templates/savepoint/cartridge-shell-three-quarter.png",
      "renderScreenshot": "public/templates/savepoint/verification/cartridge/blockout/small-35.png",
      "comparisonImage": "public/templates/savepoint/verification/cartridge/blockout/comparison.png",
      "cameraView": "",
      "notes": "",
      "aiVisionNotes": ""
    },
    {
      "timestamp": "2026-11-04T09:10:38.297805+00:00",
      "passId": "structural-pass",
      "estimatedFidelity": 0.81,
      "aiVisionScore": 0.81,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.81,
        "componentStructure": 0.81,
        "formDetail": 0.81,
        "materialSurface": 0.81,
        "lightingCamera": 0.81
      },
      "featureReviews": [
        {
          "id": "stepped-shell",
          "score": 0.81,
          "visible": true,
          "notes": "Structure accepted: the console has an inclined screen, discrete shell panels and an open cavity with walls and floor; cartridge has a stepped shell, projecting tongue and inset front label. Molded microgeometry and dielectric finish remain for form and material passes."
        },
        {
          "id": "recessed-label",
          "score": 0.81,
          "visible": true,
          "notes": "Structure accepted: the console has an inclined screen, discrete shell panels and an open cavity with walls and floor; cartridge has a stepped shell, projecting tongue and inset front label. Molded microgeometry and dielectric finish remain for form and material passes."
        }
      ],
      "referenceScreenshot": "public/templates/savepoint/cartridge-shell-three-quarter.png",
      "renderScreenshot": "public/templates/savepoint/verification/cartridge/structural-pass/small-35.png",
      "comparisonImage": "public/templates/savepoint/verification/cartridge/structural-pass/comparison.png",
      "cameraView": "",
      "notes": "",
      "aiVisionNotes": ""
    },
    {
      "timestamp": "2026-11-04T09:14:35.381432+00:00",
      "passId": "form-refinement",
      "estimatedFidelity": 0.82,
      "aiVisionScore": 0.82,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.82,
        "componentStructure": 0.82,
        "formDetail": 0.82,
        "materialSurface": 0.82,
        "lightingCamera": 0.82
      },
      "featureReviews": [
        {
          "id": "contacts-and-fasteners",
          "score": 0.82,
          "visible": true,
          "notes": "Form pass accepted: repeated vent recesses and contacts, front controls, softened shell edges, stepped grip corners, inset molding and rear screw wells are present across the orbit. Physical screen is landscape; exact molded grain and reflected studio response remain approximate."
        }
      ],
      "referenceScreenshot": "public/templates/savepoint/cartridge-shell-three-quarter.png",
      "renderScreenshot": "public/templates/savepoint/verification/cartridge/form-refinement/small-35.png",
      "comparisonImage": "public/templates/savepoint/verification/cartridge/form-refinement/comparison.png",
      "cameraView": "",
      "notes": "",
      "aiVisionNotes": ""
    },
    {
      "timestamp": "2026-11-04T09:19:27.222921+00:00",
      "passId": "material-pass",
      "estimatedFidelity": 0.8,
      "aiVisionScore": 0.8,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.8,
        "componentStructure": 0.8,
        "formDetail": 0.8,
        "materialSurface": 0.8,
        "lightingCamera": 0.8
      },
      "featureReviews": [
        {
          "id": "polymer-label",
          "score": 0.8,
          "visible": true,
          "notes": "Dielectric charcoal shell, darker cavity, low-roughness glass and metal contacts are distinct. Supplied label pixels retain their sRGB color without environment washout. Studio reflection strength still differs from the reference and will be bounded in the lighting pass."
        }
      ],
      "referenceScreenshot": "public/templates/savepoint/cartridge-shell-three-quarter.png",
      "renderScreenshot": "public/templates/savepoint/verification/cartridge/material-pass/small-35.png",
      "comparisonImage": "public/templates/savepoint/verification/cartridge/material-pass/comparison.png",
      "cameraView": "",
      "notes": "",
      "aiVisionNotes": ""
    },
    {
      "timestamp": "2026-11-04T09:22:50.956637+00:00",
      "passId": "surface-pass",
      "estimatedFidelity": 0.8,
      "aiVisionScore": 0.8,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.8,
        "componentStructure": 0.8,
        "formDetail": 0.8,
        "materialSurface": 0.8,
        "lightingCamera": 0.8
      },
      "featureReviews": [
        {
          "id": "surface-response",
          "score": 0.8,
          "visible": true,
          "notes": "Independent 1024px roughness and height fields provide restrained molded grain with deterministic seed 19341. Relief is subtle at archive distance and visible under grazing light. The procedural grain approximates the reference polymer; it does not claim exact microtexture recovery."
        }
      ],
      "referenceScreenshot": "public/templates/savepoint/cartridge-shell-three-quarter.png",
      "renderScreenshot": "public/templates/savepoint/verification/cartridge/surface-pass/small-35.png",
      "comparisonImage": "public/templates/savepoint/verification/cartridge/surface-pass/comparison.png",
      "cameraView": "",
      "notes": "",
      "aiVisionNotes": ""
    },
    {
      "timestamp": "2026-11-04T09:25:21.322919+00:00",
      "passId": "lighting-pass",
      "estimatedFidelity": 0.81,
      "aiVisionScore": 0.81,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.81,
        "componentStructure": 0.81,
        "formDetail": 0.81,
        "materialSurface": 0.81,
        "lightingCamera": 0.81
      },
      "featureReviews": [
        {
          "id": "form-lighting",
          "score": 0.81,
          "visible": true,
          "notes": "Reduced key, hemisphere and exposure preserve charcoal value and distinct glass response under a neutral studio environment. Four orbit views retain volume. Reference lighting is approximated; archive contact shadows use a bounded shadow map and only shell casters."
        }
      ],
      "referenceScreenshot": "public/templates/savepoint/cartridge-shell-three-quarter.png",
      "renderScreenshot": "public/templates/savepoint/verification/cartridge/lighting-pass/small-35.png",
      "comparisonImage": "public/templates/savepoint/verification/cartridge/lighting-pass/comparison.png",
      "cameraView": "",
      "notes": "",
      "aiVisionNotes": ""
    },
    {
      "timestamp": "2026-11-04T09:37:01.914942+00:00",
      "passId": "interaction-pass",
      "estimatedFidelity": 0.82,
      "aiVisionScore": 0.82,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.82,
        "componentStructure": 0.82,
        "formDetail": 0.82,
        "materialSurface": 0.82,
        "lightingCamera": 0.82
      },
      "featureReviews": [
        {
          "id": "connector-axis",
          "score": 0.82,
          "visible": true,
          "notes": "Runtime calibration sampled 22 insertion frames with zero lateral axis error and zero dock-position error. A downward ray through the actual aperture first hits internal slot-contact-14, below the lip. Separate closed rear-frame segments pass self-intersection; part coverage and action-ready pivots are retained."
        }
      ],
      "referenceScreenshot": "public/templates/savepoint/cartridge-shell-three-quarter.png",
      "renderScreenshot": "public/templates/savepoint/verification/cartridge/interaction-pass/small-35.png",
      "comparisonImage": "public/templates/savepoint/verification/cartridge/interaction-pass/comparison.png",
      "cameraView": "",
      "notes": "",
      "aiVisionNotes": ""
    },
    {
      "timestamp": "2026-11-04T09:51:46.205482+00:00",
      "passId": "optimization-pass",
      "estimatedFidelity": 0.82,
      "aiVisionScore": 0.82,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.82,
        "componentStructure": 0.82,
        "formDetail": 0.82,
        "materialSurface": 0.82,
        "lightingCamera": 0.82
      },
      "featureReviews": [],
      "referenceScreenshot": "public/templates/savepoint/cartridge-shell-three-quarter.png",
      "renderScreenshot": "public/templates/savepoint/verification/cartridge/optimization-pass/small-35.png",
      "comparisonImage": "public/templates/savepoint/verification/cartridge/optimization-pass/comparison.png",
      "cameraView": "",
      "notes": "",
      "aiVisionNotes": ""
    }
  ],
  "reviewHistory": [
    {
      "timestamp": "2026-11-04T09:04:13.042515+00:00",
      "passId": "blockout",
      "estimatedFidelity": 0.81,
      "aiVisionScore": 0.81,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.81,
        "componentStructure": 0.5,
        "formDetail": 0.4,
        "materialSurface": 0.5,
        "lightingCamera": 0.81
      },
      "featureReviews": [
        {
          "id": "silhouette",
          "score": 0.81,
          "visible": true,
          "notes": "Unlit map-stripped silhouette and physical thickness accepted for blockout only. The reference corner footprint and projecting connector read correctly. Recesses, slot cavity, molding and final materials belong to subsequent passes."
        }
      ],
      "action": "continue",
      "summary": "Unlit map-stripped silhouette and physical thickness accepted for blockout only. The reference corner footprint and projecting connector read correctly. Recesses, slot cavity, molding and final materials belong to subsequent passes.",
      "matched": [],
      "mismatches": [],
      "specFixes": [],
      "codeFixes": [],
      "evidence": [],
      "mapStrippedRender": "public/templates/savepoint/verification/cartridge/blockout/small-35.png",
      "visualEvidence": {
        "referenceScreenshot": "public/templates/savepoint/cartridge-shell-three-quarter.png",
        "renderScreenshot": "public/templates/savepoint/verification/cartridge/blockout/small-35.png",
        "comparisonImage": "public/templates/savepoint/verification/cartridge/blockout/comparison.png",
        "cameraView": "",
        "notes": "",
        "aiVisionNotes": ""
      }
    },
    {
      "timestamp": "2026-11-04T09:07:54.419805+00:00",
      "passId": "structural-pass",
      "estimatedFidelity": 0.79,
      "aiVisionScore": null,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {},
      "featureReviews": [],
      "action": "refine-code",
      "summary": "Stepped shell adds the specified molded shoulder to the bounding footprint. Increase the review camera distance from 2.40 to 2.45 to preserve reference framing; no model dimensions change.",
      "matched": [],
      "mismatches": [],
      "specFixes": [],
      "codeFixes": [],
      "evidence": []
    },
    {
      "timestamp": "2026-11-04T09:10:38.297805+00:00",
      "passId": "structural-pass",
      "estimatedFidelity": 0.81,
      "aiVisionScore": 0.81,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.81,
        "componentStructure": 0.81,
        "formDetail": 0.81,
        "materialSurface": 0.81,
        "lightingCamera": 0.81
      },
      "featureReviews": [
        {
          "id": "stepped-shell",
          "score": 0.81,
          "visible": true,
          "notes": "Structure accepted: the console has an inclined screen, discrete shell panels and an open cavity with walls and floor; cartridge has a stepped shell, projecting tongue and inset front label. Molded microgeometry and dielectric finish remain for form and material passes."
        },
        {
          "id": "recessed-label",
          "score": 0.81,
          "visible": true,
          "notes": "Structure accepted: the console has an inclined screen, discrete shell panels and an open cavity with walls and floor; cartridge has a stepped shell, projecting tongue and inset front label. Molded microgeometry and dielectric finish remain for form and material passes."
        }
      ],
      "action": "continue",
      "summary": "Structure accepted: the console has an inclined screen, discrete shell panels and an open cavity with walls and floor; cartridge has a stepped shell, projecting tongue and inset front label. Molded microgeometry and dielectric finish remain for form and material passes.",
      "matched": [],
      "mismatches": [],
      "specFixes": [],
      "codeFixes": [],
      "evidence": [],
      "visualEvidence": {
        "referenceScreenshot": "public/templates/savepoint/cartridge-shell-three-quarter.png",
        "renderScreenshot": "public/templates/savepoint/verification/cartridge/structural-pass/small-35.png",
        "comparisonImage": "public/templates/savepoint/verification/cartridge/structural-pass/comparison.png",
        "cameraView": "",
        "notes": "",
        "aiVisionNotes": ""
      }
    },
    {
      "timestamp": "2026-11-04T09:14:35.381432+00:00",
      "passId": "form-refinement",
      "estimatedFidelity": 0.82,
      "aiVisionScore": 0.82,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.82,
        "componentStructure": 0.82,
        "formDetail": 0.82,
        "materialSurface": 0.82,
        "lightingCamera": 0.82
      },
      "featureReviews": [
        {
          "id": "contacts-and-fasteners",
          "score": 0.82,
          "visible": true,
          "notes": "Form pass accepted: repeated vent recesses and contacts, front controls, softened shell edges, stepped grip corners, inset molding and rear screw wells are present across the orbit. Physical screen is landscape; exact molded grain and reflected studio response remain approximate."
        }
      ],
      "action": "continue",
      "summary": "Form pass accepted: repeated vent recesses and contacts, front controls, softened shell edges, stepped grip corners, inset molding and rear screw wells are present across the orbit. Physical screen is landscape; exact molded grain and reflected studio response remain approximate.",
      "matched": [],
      "mismatches": [],
      "specFixes": [],
      "codeFixes": [],
      "evidence": [],
      "visualEvidence": {
        "referenceScreenshot": "public/templates/savepoint/cartridge-shell-three-quarter.png",
        "renderScreenshot": "public/templates/savepoint/verification/cartridge/form-refinement/small-35.png",
        "comparisonImage": "public/templates/savepoint/verification/cartridge/form-refinement/comparison.png",
        "cameraView": "",
        "notes": "",
        "aiVisionNotes": ""
      }
    },
    {
      "timestamp": "2026-11-04T09:17:41.163081+00:00",
      "passId": "material-pass",
      "estimatedFidelity": 0.72,
      "aiVisionScore": null,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {},
      "featureReviews": [],
      "action": "refine-code",
      "summary": "Environment lighting washed out the approved printed label and caused the silhouette mask to classify its moon as a hole. Preserve the supplied artwork with an unlit sRGB label carrier while keeping the shell PBR.",
      "matched": [],
      "mismatches": [],
      "specFixes": [],
      "codeFixes": [],
      "evidence": []
    },
    {
      "timestamp": "2026-11-04T09:19:27.222921+00:00",
      "passId": "material-pass",
      "estimatedFidelity": 0.8,
      "aiVisionScore": 0.8,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.8,
        "componentStructure": 0.8,
        "formDetail": 0.8,
        "materialSurface": 0.8,
        "lightingCamera": 0.8
      },
      "featureReviews": [
        {
          "id": "polymer-label",
          "score": 0.8,
          "visible": true,
          "notes": "Dielectric charcoal shell, darker cavity, low-roughness glass and metal contacts are distinct. Supplied label pixels retain their sRGB color without environment washout. Studio reflection strength still differs from the reference and will be bounded in the lighting pass."
        }
      ],
      "action": "continue",
      "summary": "Dielectric charcoal shell, darker cavity, low-roughness glass and metal contacts are distinct. Supplied label pixels retain their sRGB color without environment washout. Studio reflection strength still differs from the reference and will be bounded in the lighting pass.",
      "matched": [],
      "mismatches": [],
      "specFixes": [],
      "codeFixes": [],
      "evidence": [],
      "visualEvidence": {
        "referenceScreenshot": "public/templates/savepoint/cartridge-shell-three-quarter.png",
        "renderScreenshot": "public/templates/savepoint/verification/cartridge/material-pass/small-35.png",
        "comparisonImage": "public/templates/savepoint/verification/cartridge/material-pass/comparison.png",
        "cameraView": "",
        "notes": "",
        "aiVisionNotes": ""
      }
    },
    {
      "timestamp": "2026-11-04T09:22:50.956637+00:00",
      "passId": "surface-pass",
      "estimatedFidelity": 0.8,
      "aiVisionScore": 0.8,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.8,
        "componentStructure": 0.8,
        "formDetail": 0.8,
        "materialSurface": 0.8,
        "lightingCamera": 0.8
      },
      "featureReviews": [
        {
          "id": "surface-response",
          "score": 0.8,
          "visible": true,
          "notes": "Independent 1024px roughness and height fields provide restrained molded grain with deterministic seed 19341. Relief is subtle at archive distance and visible under grazing light. The procedural grain approximates the reference polymer; it does not claim exact microtexture recovery."
        }
      ],
      "action": "continue",
      "summary": "Independent 1024px roughness and height fields provide restrained molded grain with deterministic seed 19341. Relief is subtle at archive distance and visible under grazing light. The procedural grain approximates the reference polymer; it does not claim exact microtexture recovery.",
      "matched": [],
      "mismatches": [],
      "specFixes": [],
      "codeFixes": [],
      "evidence": [],
      "visualEvidence": {
        "referenceScreenshot": "public/templates/savepoint/cartridge-shell-three-quarter.png",
        "renderScreenshot": "public/templates/savepoint/verification/cartridge/surface-pass/small-35.png",
        "comparisonImage": "public/templates/savepoint/verification/cartridge/surface-pass/comparison.png",
        "cameraView": "",
        "notes": "",
        "aiVisionNotes": ""
      }
    },
    {
      "timestamp": "2026-11-04T09:25:21.322919+00:00",
      "passId": "lighting-pass",
      "estimatedFidelity": 0.81,
      "aiVisionScore": 0.81,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.81,
        "componentStructure": 0.81,
        "formDetail": 0.81,
        "materialSurface": 0.81,
        "lightingCamera": 0.81
      },
      "featureReviews": [
        {
          "id": "form-lighting",
          "score": 0.81,
          "visible": true,
          "notes": "Reduced key, hemisphere and exposure preserve charcoal value and distinct glass response under a neutral studio environment. Four orbit views retain volume. Reference lighting is approximated; archive contact shadows use a bounded shadow map and only shell casters."
        }
      ],
      "action": "continue",
      "summary": "Reduced key, hemisphere and exposure preserve charcoal value and distinct glass response under a neutral studio environment. Four orbit views retain volume. Reference lighting is approximated; archive contact shadows use a bounded shadow map and only shell casters.",
      "matched": [],
      "mismatches": [],
      "specFixes": [],
      "codeFixes": [],
      "evidence": [],
      "visualEvidence": {
        "referenceScreenshot": "public/templates/savepoint/cartridge-shell-three-quarter.png",
        "renderScreenshot": "public/templates/savepoint/verification/cartridge/lighting-pass/small-35.png",
        "comparisonImage": "public/templates/savepoint/verification/cartridge/lighting-pass/comparison.png",
        "cameraView": "",
        "notes": "",
        "aiVisionNotes": ""
      }
    },
    {
      "timestamp": "2026-11-04T09:37:01.914942+00:00",
      "passId": "interaction-pass",
      "estimatedFidelity": 0.82,
      "aiVisionScore": 0.82,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.82,
        "componentStructure": 0.82,
        "formDetail": 0.82,
        "materialSurface": 0.82,
        "lightingCamera": 0.82
      },
      "featureReviews": [
        {
          "id": "connector-axis",
          "score": 0.82,
          "visible": true,
          "notes": "Runtime calibration sampled 22 insertion frames with zero lateral axis error and zero dock-position error. A downward ray through the actual aperture first hits internal slot-contact-14, below the lip. Separate closed rear-frame segments pass self-intersection; part coverage and action-ready pivots are retained."
        }
      ],
      "action": "continue",
      "summary": "Runtime calibration sampled 22 insertion frames with zero lateral axis error and zero dock-position error. A downward ray through the actual aperture first hits internal slot-contact-14, below the lip. Separate closed rear-frame segments pass self-intersection; part coverage and action-ready pivots are retained.",
      "matched": [],
      "mismatches": [],
      "specFixes": [],
      "codeFixes": [],
      "evidence": [],
      "visualEvidence": {
        "referenceScreenshot": "public/templates/savepoint/cartridge-shell-three-quarter.png",
        "renderScreenshot": "public/templates/savepoint/verification/cartridge/interaction-pass/small-35.png",
        "comparisonImage": "public/templates/savepoint/verification/cartridge/interaction-pass/comparison.png",
        "cameraView": "",
        "notes": "",
        "aiVisionNotes": ""
      }
    },
    {
      "timestamp": "2026-11-04T09:51:46.205482+00:00",
      "passId": "optimization-pass",
      "estimatedFidelity": 0.82,
      "aiVisionScore": 0.82,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.82,
        "componentStructure": 0.82,
        "formDetail": 0.82,
        "materialSurface": 0.82,
        "lightingCamera": 0.82
      },
      "featureReviews": [],
      "action": "continue",
      "summary": "Shared shell geometries and base materials, per-game label/spine materials, instanced contacts/fasteners and isolated clipping clones preserve the accepted appearance. Both models pass complete part coverage, self-intersection and reversible assembly/picking checks. Geometry and procedural surfaces remain approximate reconstructions of the approved renders.",
      "matched": [],
      "mismatches": [],
      "specFixes": [],
      "codeFixes": [],
      "evidence": [],
      "visualEvidence": {
        "referenceScreenshot": "public/templates/savepoint/cartridge-shell-three-quarter.png",
        "renderScreenshot": "public/templates/savepoint/verification/cartridge/optimization-pass/small-35.png",
        "comparisonImage": "public/templates/savepoint/verification/cartridge/optimization-pass/comparison.png",
        "cameraView": "",
        "notes": "",
        "aiVisionNotes": ""
      }
    }
  ],
  "lodPlan": [
    {
      "tier": "near",
      "distance": 0,
      "strategy": "full component tree and material layers"
    },
    {
      "tier": "far",
      "distance": 30,
      "strategy": "merge static components and reduce local feature geometry"
    }
  ],
  "performanceBudget": {
    "qualityPriority": "reference-fidelity",
    "targetTriangles": 80000,
    "maxDrawCalls": 100,
    "textureSize": 1024,
    "fpsTarget": 60,
    "optimizationPolicy": "Reach accepted visual fidelity first, then optimize without removing reference-critical geometry or surface layers."
  },
  "lightingFromPhoto": [
    "large upper-left key light",
    "soft fill light",
    "rear rim light",
    "ACES tone mapping exposure 1.2",
    "neutral background and contact shadow"
  ],
  "proceduralStrategy": [
    "Block out macro silhouette first.",
    "Add component hierarchy and joints.",
    "Create stable pivot groups, sockets, collider proxies, and destruction metadata before visual polish.",
    "Refine forms with bevels, tapers, bends, and procedural noise.",
    "Run reference PBR extraction for important source-image materials and stop when confidence is below the target threshold.",
    "Add material variation before adding expensive micro-geometry."
  ],
  "animationAnchors": [
    "root pivot node supports whole-object translation, rotation, scale, and visibility changes",
    "component pivot groups support later local transforms without rebuilding geometry"
  ],
  "destructionAnchors": [
    "actionProfile.destruction.fractureGroup marks detachable or breakable component sets",
    "component seams and sockets define plausible break points instead of random explosions"
  ],
  "risks": [],
  "localSpecSearch": {
    "collection": "core_3d",
    "query": "cartridge beveled hard surface plastic shell glass roughness",
    "index": {
      "status": "hit",
      "reason": "current",
      "fingerprint": "06f0b2ece2935e441653f5c3533f91b3a4d6163f2aec4267559d7d8419bdd040"
    },
    "matches": [
      {
        "record_id": "core.pbr-opacity-alpha",
        "file_path": "docs/raw/img2threejs-skill-dataset.json",
        "heading": null,
        "key_path": "categories.material_pbr[8]",
        "score": 6.173944048162,
        "snippets": [
          "... l\u00e0m k\u00eanh d\u1eef li\u1ec7u, kh\u00f4ng ph\u1ea3i \u0111\u1ed9 trong su\u1ed1t. Recognition cues: Standard opacity: soft edge fade or full transparency in glass/plastic parts; CS2-specific: alpha channel of the base color texture instead encodes a Wearness Mask, not visual ..."
        ],
        "source_refs": [
          {
            "path": "docs/raw/img2threejs-skill-dataset.json",
            "heading": null,
            "key_path": "categories.material_pbr[8]"
          }
        ],
        "evidence_refs": [
          {
            "kind": "source",
            "ref": "docs/raw/img2threejs-skill-dataset.json",
            "note": "img2threejs NotebookLM research distillation"
          }
        ]
      },
      {
        "record_id": "core.pbr-roughness",
        "file_path": "grimoire/glossary/3d_vocabulary.md",
        "heading": "Material And PBR",
        "key_path": null,
        "score": 4.20187819032,
        "snippets": [
          "Roughness is microfacet scatter: high roughness reads matte and low roughness reads glossy. Recognition cues: low roughness reads as a sharp, mirror-like, tight specular highlight; high roughness reads as a blurry, wide, dim highlight and matte ..."
        ],
        "source_refs": [
          {
            "path": "grimoire/glossary/3d_vocabulary.md",
            "heading": "Material And PBR",
            "key_path": null
          },
          {
            "path": "grimoire/intake/image_analysis.md",
            "heading": "Layer 5 \u2014 Materials & surface (PBR)",
            "key_path": null
          },
          {
            "path": "docs/raw/img2threejs-skill-dataset.json",
            "heading": null,
            "key_path": "categories.material_pbr[1]"
          }
        ],
        "evidence_refs": [
          {
            "kind": "source",
            "ref": "grimoire/glossary/3d_vocabulary.md"
          },
          {
            "kind": "notebooklm-research",
            "ref": "notebooklm:4b03c2f9-8393-411f-b5b4-039ab9532843",
            "note": "Validated generic schema vocabulary; numeric claims remain backed by local source_refs."
          },
          {
            "kind": "source",
            "ref": "docs/raw/img2threejs-skill-dataset.json",
            "note": "img2threejs NotebookLM research distillation \u2014 merged recognition cues + Three.js target instead of duplicating this entity."
          }
        ]
      },
      {
        "record_id": "core.description-honest-uncertainty-single-image-limits-convention",
        "file_path": "docs/raw/img2threejs-skill-dataset.json",
        "heading": null,
        "key_path": "categories.description_conventions[6]",
        "score": 3.986222861816,
        "snippets": [
          "... \u0111\u1ecbnh' thay v\u00ec b\u1ecba ra chi ti\u1ebft tr\u00f4ng h\u1ee3p l\u00fd nh\u01b0ng kh\u00f4ng th\u1ea5y trong \u1ea3nh tham chi\u1ebfu. Recognition cues: Any attribute for a surface not visible in the reference image should be flagged explicitly rather than filled with a guessed value; This is ..."
        ],
        "source_refs": [
          {
            "path": "docs/raw/img2threejs-skill-dataset.json",
            "heading": null,
            "key_path": "categories.description_conventions[6]"
          }
        ],
        "evidence_refs": [
          {
            "kind": "source",
            "ref": "docs/raw/img2threejs-skill-dataset.json",
            "note": "img2threejs NotebookLM research distillation"
          }
        ]
      }
    ]
  },
  "revision": {
    "number": 2,
    "authorization": "User approved revised specs and a new correction budget on 2026-11-04.",
    "previousEvidence": "Revision 01 retained in local .img2threejs history; revision 02 was authorized by the user."
  },
  "sculptPipeline": {
    "passGateMode": "locked-sequential",
    "passOrder": [
      "blockout",
      "structural-pass",
      "form-refinement",
      "material-pass",
      "surface-pass",
      "lighting-pass",
      "interaction-pass",
      "optimization-pass"
    ],
    "currentPass": "complete",
    "completedPasses": [
      "blockout",
      "structural-pass",
      "form-refinement",
      "material-pass",
      "surface-pass",
      "lighting-pass",
      "interaction-pass",
      "optimization-pass"
    ],
    "lastCompletedPass": "optimization-pass",
    "blockedReason": "all build passes completed",
    "nextRequiredEvidence": []
  },
  "tier1Results": [
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.9097,
        "aspectRatioDelta": 0.0386,
        "scaleDelta": 0.0721,
        "bilateralSymmetryError": 0.0963,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 1.06,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 1.06
            },
            {
              "componentId": null,
              "deltaE": 1.06
            },
            {
              "componentId": null,
              "deltaE": 1.06
            },
            {
              "componentId": null,
              "deltaE": 1.06
            },
            {
              "componentId": null,
              "deltaE": 1.06
            },
            {
              "componentId": null,
              "deltaE": 1.06
            },
            {
              "componentId": null,
              "deltaE": 1.06
            },
            {
              "componentId": null,
              "deltaE": 1.06
            },
            {
              "componentId": null,
              "deltaE": 1.06
            }
          ],
          "gated": false
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "bd1fd0860220e8e1",
      "passId": "blockout",
      "mapStrippedRender": "public/templates/savepoint/verification/cartridge/blockout/small-35.png"
    },
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.9097,
        "aspectRatioDelta": 0.0386,
        "scaleDelta": 0.0721,
        "bilateralSymmetryError": 0.0963,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 1.06,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 1.06
            },
            {
              "componentId": null,
              "deltaE": 1.06
            },
            {
              "componentId": null,
              "deltaE": 1.06
            },
            {
              "componentId": null,
              "deltaE": 1.06
            },
            {
              "componentId": null,
              "deltaE": 1.06
            },
            {
              "componentId": null,
              "deltaE": 1.06
            },
            {
              "componentId": null,
              "deltaE": 1.06
            },
            {
              "componentId": null,
              "deltaE": 1.06
            },
            {
              "componentId": null,
              "deltaE": 1.06
            }
          ],
          "gated": false
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "bd1fd0860220e8e1",
      "passId": "blockout",
      "mapStrippedRender": "public/templates/savepoint/verification/cartridge/blockout/small-35.png"
    },
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.9097,
        "aspectRatioDelta": 0.0386,
        "scaleDelta": 0.0721,
        "bilateralSymmetryError": 0.0963,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 1.06,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 1.06
            },
            {
              "componentId": null,
              "deltaE": 1.06
            },
            {
              "componentId": null,
              "deltaE": 1.06
            },
            {
              "componentId": null,
              "deltaE": 1.06
            },
            {
              "componentId": null,
              "deltaE": 1.06
            },
            {
              "componentId": null,
              "deltaE": 1.06
            },
            {
              "componentId": null,
              "deltaE": 1.06
            },
            {
              "componentId": null,
              "deltaE": 1.06
            },
            {
              "componentId": null,
              "deltaE": 1.06
            }
          ],
          "gated": false
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "bd1fd0860220e8e1",
      "passId": "blockout",
      "mapStrippedRender": "public/templates/savepoint/verification/cartridge/blockout/small-35.png"
    },
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.9116,
        "aspectRatioDelta": 0.0386,
        "scaleDelta": 0.0721,
        "bilateralSymmetryError": 0.0941,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 18.17,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 18.17
            },
            {
              "componentId": null,
              "deltaE": 18.17
            },
            {
              "componentId": null,
              "deltaE": 18.17
            },
            {
              "componentId": null,
              "deltaE": 18.17
            },
            {
              "componentId": null,
              "deltaE": 18.17
            },
            {
              "componentId": null,
              "deltaE": 18.17
            },
            {
              "componentId": null,
              "deltaE": 18.17
            },
            {
              "componentId": null,
              "deltaE": 18.17
            },
            {
              "componentId": null,
              "deltaE": 18.17
            }
          ],
          "gated": false
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "6c0eacb115d9a17f",
      "passId": "blockout",
      "mapStrippedRender": "public/templates/savepoint/verification/cartridge/blockout/small-35.png"
    },
    {
      "passed": false,
      "checks": {
        "silhouetteIoU": 0.8947,
        "aspectRatioDelta": 0.0462,
        "scaleDelta": 0.1144,
        "bilateralSymmetryError": 0.0943,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 0.57,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 0.57
            },
            {
              "componentId": null,
              "deltaE": 0.57
            },
            {
              "componentId": null,
              "deltaE": 0.57
            },
            {
              "componentId": null,
              "deltaE": 0.57
            },
            {
              "componentId": null,
              "deltaE": 0.57
            },
            {
              "componentId": null,
              "deltaE": 0.57
            },
            {
              "componentId": null,
              "deltaE": 0.57
            },
            {
              "componentId": null,
              "deltaE": 0.57
            },
            {
              "componentId": null,
              "deltaE": 0.57
            }
          ],
          "gated": false
        }
      },
      "failures": [
        "scale delta 0.114 exceeds threshold 0.08"
      ],
      "maskWarnings": [],
      "renderHash": "29b1cbc7260142b7",
      "passId": "structural-pass"
    },
    {
      "passed": false,
      "checks": {
        "silhouetteIoU": 0.9087,
        "aspectRatioDelta": 0.0557,
        "scaleDelta": 0.067,
        "bilateralSymmetryError": 0.0892,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 0.81,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 0.81
            },
            {
              "componentId": null,
              "deltaE": 0.81
            },
            {
              "componentId": null,
              "deltaE": 0.81
            },
            {
              "componentId": null,
              "deltaE": 0.81
            },
            {
              "componentId": null,
              "deltaE": 0.81
            },
            {
              "componentId": null,
              "deltaE": 0.81
            },
            {
              "componentId": null,
              "deltaE": 0.81
            },
            {
              "componentId": null,
              "deltaE": 0.81
            },
            {
              "componentId": null,
              "deltaE": 0.81
            }
          ],
          "gated": false
        }
      },
      "failures": [
        "aspect-ratio delta 0.056 exceeds threshold 0.05"
      ],
      "maskWarnings": [],
      "renderHash": "4695714d99be83a1",
      "passId": "structural-pass"
    },
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.9032,
        "aspectRatioDelta": 0.0325,
        "scaleDelta": 0.0659,
        "bilateralSymmetryError": 0.1018,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 0.75,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 0.75
            },
            {
              "componentId": null,
              "deltaE": 0.75
            },
            {
              "componentId": null,
              "deltaE": 0.75
            },
            {
              "componentId": null,
              "deltaE": 0.75
            },
            {
              "componentId": null,
              "deltaE": 0.75
            },
            {
              "componentId": null,
              "deltaE": 0.75
            },
            {
              "componentId": null,
              "deltaE": 0.75
            },
            {
              "componentId": null,
              "deltaE": 0.75
            },
            {
              "componentId": null,
              "deltaE": 0.75
            }
          ],
          "gated": false
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "060f55010a2e9c6b",
      "passId": "structural-pass"
    },
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.901,
        "aspectRatioDelta": 0.0435,
        "scaleDelta": 0.0547,
        "bilateralSymmetryError": 0.1015,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 0.73,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 0.73
            },
            {
              "componentId": null,
              "deltaE": 0.73
            },
            {
              "componentId": null,
              "deltaE": 0.73
            },
            {
              "componentId": null,
              "deltaE": 0.73
            },
            {
              "componentId": null,
              "deltaE": 0.73
            },
            {
              "componentId": null,
              "deltaE": 0.73
            },
            {
              "componentId": null,
              "deltaE": 0.73
            },
            {
              "componentId": null,
              "deltaE": 0.73
            },
            {
              "componentId": null,
              "deltaE": 0.73
            }
          ],
          "gated": false
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "f02cf1c7c887c48e",
      "passId": "form-refinement"
    },
    {
      "passed": false,
      "checks": {
        "silhouetteIoU": 0.819,
        "aspectRatioDelta": 0.0435,
        "scaleDelta": 0.0547,
        "bilateralSymmetryError": 0.1968,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 11.3,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 11.3
            },
            {
              "componentId": null,
              "deltaE": 11.3
            },
            {
              "componentId": null,
              "deltaE": 11.3
            },
            {
              "componentId": null,
              "deltaE": 11.3
            },
            {
              "componentId": null,
              "deltaE": 11.3
            },
            {
              "componentId": null,
              "deltaE": 11.3
            },
            {
              "componentId": null,
              "deltaE": 11.3
            },
            {
              "componentId": null,
              "deltaE": 11.3
            },
            {
              "componentId": null,
              "deltaE": 11.3
            }
          ],
          "gated": true
        }
      },
      "failures": [
        "silhouette IoU 0.819 is below threshold 0.85"
      ],
      "maskWarnings": [],
      "renderHash": "af9210a8152fb4c7",
      "passId": "material-pass"
    },
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.9037,
        "aspectRatioDelta": 0.0435,
        "scaleDelta": 0.0547,
        "bilateralSymmetryError": 0.098,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 15.07,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 15.07
            },
            {
              "componentId": null,
              "deltaE": 15.07
            },
            {
              "componentId": null,
              "deltaE": 15.07
            },
            {
              "componentId": null,
              "deltaE": 15.07
            },
            {
              "componentId": null,
              "deltaE": 15.07
            },
            {
              "componentId": null,
              "deltaE": 15.07
            },
            {
              "componentId": null,
              "deltaE": 15.07
            },
            {
              "componentId": null,
              "deltaE": 15.07
            },
            {
              "componentId": null,
              "deltaE": 15.07
            }
          ],
          "gated": true
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "ea637a3ff08c22bf",
      "passId": "material-pass"
    },
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.9037,
        "aspectRatioDelta": 0.0435,
        "scaleDelta": 0.0547,
        "bilateralSymmetryError": 0.0981,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 15.29,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 15.29
            },
            {
              "componentId": null,
              "deltaE": 15.29
            },
            {
              "componentId": null,
              "deltaE": 15.29
            },
            {
              "componentId": null,
              "deltaE": 15.29
            },
            {
              "componentId": null,
              "deltaE": 15.29
            },
            {
              "componentId": null,
              "deltaE": 15.29
            },
            {
              "componentId": null,
              "deltaE": 15.29
            },
            {
              "componentId": null,
              "deltaE": 15.29
            },
            {
              "componentId": null,
              "deltaE": 15.29
            }
          ],
          "gated": true
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "49ba14ea98d25820",
      "passId": "surface-pass"
    },
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.9037,
        "aspectRatioDelta": 0.0435,
        "scaleDelta": 0.0547,
        "bilateralSymmetryError": 0.0982,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 6.11,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            }
          ],
          "gated": true
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "df679ca92433dd73",
      "passId": "lighting-pass"
    },
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.9037,
        "aspectRatioDelta": 0.0435,
        "scaleDelta": 0.0547,
        "bilateralSymmetryError": 0.0982,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 6.11,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            }
          ],
          "gated": true
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "df679ca92433dd73",
      "passId": "interaction-pass"
    },
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.9037,
        "aspectRatioDelta": 0.0435,
        "scaleDelta": 0.0547,
        "bilateralSymmetryError": 0.0982,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 6.11,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            }
          ],
          "gated": true
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "df679ca92433dd73",
      "passId": "interaction-pass"
    },
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.9037,
        "aspectRatioDelta": 0.0435,
        "scaleDelta": 0.0547,
        "bilateralSymmetryError": 0.0982,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 6.11,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            },
            {
              "componentId": null,
              "deltaE": 6.11
            }
          ],
          "gated": true
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "882781b838bf741e",
      "passId": "optimization-pass"
    }
  ],
  "verification": {
    "revision": 2,
    "runtimePartCount": 18,
    "clearance": {
      "slotWidth": 0.99,
      "slotDepth": 0.18,
      "cartridgeWidth": 0.864,
      "cartridgeDepth": 0.14
    },
    "calibration": "public/templates/savepoint/verification/calibration.json",
    "selfIntersection": "Passed on all individually closed procedural prototypes; open artwork planes are excluded, repeated instance topology is tested once.",
    "attachmentGate": "Worn/held attachment gate is non-applicable; physical insertion is measured separately."
  }
}]]>
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
    <file path="src/app/(savepoint)/savepoint/models/deck01-sculpt-spec.json">
<![CDATA[{
  "targetName": "deck",
  "targetId": "deck",
  "schemaVersion": "2.1",
  "terminologyProfile": {
    "domain": "real-time procedural Three.js asset",
    "geometryTerms": [
      "silhouette",
      "topology",
      "primitive",
      "bevel",
      "chamfer",
      "taper",
      "bend",
      "boolean cut",
      "edge loop",
      "surface normal",
      "displacement"
    ],
    "materialTerms": [
      "albedo",
      "baseColor",
      "roughness",
      "metalness",
      "normal map",
      "bump map",
      "ambient occlusion",
      "cavity dirt",
      "edge wear",
      "clearcoat"
    ],
    "lightingTerms": [
      "key light",
      "fill light",
      "rim light",
      "HDRI/environment reflection",
      "contact shadow"
    ],
    "descriptionRule": "Use measurable 3D graphics terms. Avoid vague words unless they are paired with concrete geometry/material/shader parameters."
  },
  "sourceImage": "public/templates/savepoint/deck-01-three-quarter.png",
  "referenceCamera": {
    "solved": true,
    "fovDegrees": 34,
    "aspect": 1.3392857142857142,
    "orientation": {
      "yaw": 0.616,
      "pitch": 0.7,
      "roll": 0
    },
    "positionHint": [
      2.75,
      4.0,
      3.9
    ],
    "note": "Review camera is calibrated to the reference footprint. Runtime canvas capture awaits a rendered frame and recomputes the view offset after resizing."
  },
  "suitability": "pass",
  "scores": {
    "object_isolation": 3,
    "silhouette_readability": 3,
    "depth_inference": 3,
    "primitive_decomposition": 3,
    "material_procedurality": 3,
    "occlusion_risk": 3,
    "interaction_fit": 3
  },
  "preSpecAssessment": {
    "objectClass": {
      "primaryType": "hard-surface electronic hardware",
      "primaryDomain": "object",
      "formLanguage": [
        "hard-surface",
        "geometric"
      ],
      "structureKind": [
        "layered shell",
        "compound object"
      ],
      "motionPotential": [
        "whole-object transform",
        "detachable"
      ],
      "materialFamilies": [
        "plastic",
        "glass",
        "metal"
      ],
      "notes": "bilateral low extruded wedge, front +Z, rear elevated"
    },
    "complexity": {
      "tier": "complex",
      "scores": {
        "silhouetteComplexity": 2,
        "componentCount": 2,
        "hierarchyDepth": 2,
        "repetitionDensity": 2,
        "materialLayerCount": 2,
        "localDetailDensity": 2,
        "occlusionRisk": 2,
        "actionReadinessNeed": 2
      },
      "estimatedCounts": {
        "macroComponents": 4,
        "mesoComponents": 13,
        "microFeatureGroups": 55,
        "materialLayers": 4,
        "repetitionSystems": 2
      },
      "reasoning": [
        "Three views reveal a compound hard-surface shell, layered panels, repeated contact/vent/fastener systems and an action-ready hierarchy."
      ]
    },
    "specDepthDecision": {
      "requiredDepth": "complex",
      "minimumComponentLevels": [
        "macro",
        "meso",
        "micro"
      ],
      "needsRepetitionSystems": true,
      "needsMaterialLocalOverrides": true,
      "needsMultipleReviewViews": true,
      "needsActionReadyHierarchy": true,
      "rationale": "Separate shell, aperture and contact assemblies with repeated molded details."
    },
    "unknownsToResolveBeforeImplementation": [],
    "detailInventory": {
      "scanMethod": "component-zones",
      "targetMinDetails": 10,
      "details": [
        {
          "id": "shell",
          "kind": "bevel",
          "description": "shell authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "shell"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "lower-shell",
          "kind": "bevel",
          "description": "lower-shell authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "lower-shell"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "right-cheek",
          "kind": "bevel",
          "description": "right-cheek authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "right-cheek"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "left-cheek",
          "kind": "bevel",
          "description": "left-cheek authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "left-cheek"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "rear-wall",
          "kind": "bevel",
          "description": "rear-wall authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "rear-wall"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "front-lip",
          "kind": "bevel",
          "description": "front-lip authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "front-lip"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "inclined-panel",
          "kind": "bevel",
          "description": "inclined-panel authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "inclined-panel"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "rear-deck",
          "kind": "bevel",
          "description": "rear-deck authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "rear-deck"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "rear-frame-side-left",
          "kind": "bevel",
          "description": "rear-frame-side-left authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "rear-frame-side-left"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "rear-frame-edge-rear",
          "kind": "bevel",
          "description": "rear-frame-edge-rear authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "rear-frame-edge-rear"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "rear-frame-side-right",
          "kind": "bevel",
          "description": "rear-frame-side-right authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "rear-frame-side-right"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "rear-frame-edge-front",
          "kind": "bevel",
          "description": "rear-frame-edge-front authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "rear-frame-edge-front"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "rubber-foot-left-rear",
          "kind": "bevel",
          "description": "rubber-foot-left-rear authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "rubber-foot-left-rear"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "rubber-foot-left-front",
          "kind": "bevel",
          "description": "rubber-foot-left-front authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "rubber-foot-left-front"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "rubber-foot-right-rear",
          "kind": "bevel",
          "description": "rubber-foot-right-rear authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "rubber-foot-right-rear"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "rubber-foot-right-front",
          "kind": "bevel",
          "description": "rubber-foot-right-front authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "rubber-foot-right-front"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slotLip",
          "kind": "bevel",
          "description": "slotLip authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slotLip"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-edge-rear",
          "kind": "bevel",
          "description": "slot-edge-rear authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-edge-rear"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-end-left",
          "kind": "bevel",
          "description": "slot-end-left authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-end-left"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-edge-front",
          "kind": "bevel",
          "description": "slot-edge-front authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-edge-front"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-end-right",
          "kind": "bevel",
          "description": "slot-end-right authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-end-right"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slotInterior",
          "kind": "bevel",
          "description": "slotInterior authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slotInterior"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-wall-rear",
          "kind": "bevel",
          "description": "slot-wall-rear authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-wall-rear"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "end-guide-left",
          "kind": "bevel",
          "description": "end-guide-left authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "end-guide-left"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-wall-front",
          "kind": "bevel",
          "description": "slot-wall-front authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-wall-front"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "end-guide-right",
          "kind": "bevel",
          "description": "end-guide-right authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "end-guide-right"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-floor",
          "kind": "bevel",
          "description": "slot-floor authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-floor"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-0",
          "kind": "bevel",
          "description": "slot-contact-0 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-0"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-1",
          "kind": "bevel",
          "description": "slot-contact-1 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-1"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-2",
          "kind": "bevel",
          "description": "slot-contact-2 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-2"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-3",
          "kind": "bevel",
          "description": "slot-contact-3 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-3"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-4",
          "kind": "bevel",
          "description": "slot-contact-4 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-4"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-5",
          "kind": "bevel",
          "description": "slot-contact-5 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-5"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-6",
          "kind": "bevel",
          "description": "slot-contact-6 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-6"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-7",
          "kind": "bevel",
          "description": "slot-contact-7 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-7"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-8",
          "kind": "bevel",
          "description": "slot-contact-8 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-8"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-9",
          "kind": "bevel",
          "description": "slot-contact-9 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-9"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-10",
          "kind": "bevel",
          "description": "slot-contact-10 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-10"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-11",
          "kind": "bevel",
          "description": "slot-contact-11 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-11"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-12",
          "kind": "bevel",
          "description": "slot-contact-12 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-12"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-13",
          "kind": "bevel",
          "description": "slot-contact-13 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-13"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-14",
          "kind": "bevel",
          "description": "slot-contact-14 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-14"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-15",
          "kind": "bevel",
          "description": "slot-contact-15 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-15"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-16",
          "kind": "bevel",
          "description": "slot-contact-16 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-16"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-17",
          "kind": "bevel",
          "description": "slot-contact-17 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-17"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-18",
          "kind": "bevel",
          "description": "slot-contact-18 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-18"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-19",
          "kind": "bevel",
          "description": "slot-contact-19 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-19"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-20",
          "kind": "bevel",
          "description": "slot-contact-20 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-20"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-21",
          "kind": "bevel",
          "description": "slot-contact-21 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-21"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-22",
          "kind": "bevel",
          "description": "slot-contact-22 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-22"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-23",
          "kind": "bevel",
          "description": "slot-contact-23 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-23"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-24",
          "kind": "bevel",
          "description": "slot-contact-24 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-24"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-25",
          "kind": "bevel",
          "description": "slot-contact-25 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-25"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-26",
          "kind": "bevel",
          "description": "slot-contact-26 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-26"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slot-contact-27",
          "kind": "bevel",
          "description": "slot-contact-27 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slot-contact-27"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "screenBezel",
          "kind": "bevel",
          "description": "screenBezel authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "screenBezel"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "screenGlass",
          "kind": "bevel",
          "description": "screenGlass authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "screenGlass"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slotEntrance",
          "kind": "bevel",
          "description": "slotEntrance authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slotEntrance"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slotAlignment",
          "kind": "bevel",
          "description": "slotAlignment authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slotAlignment"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "slotFullyInserted",
          "kind": "bevel",
          "description": "slotFullyInserted authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "slotFullyInserted"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "frontButtons",
          "kind": "bevel",
          "description": "frontButtons authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "frontButtons"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "button-left-0.84",
          "kind": "bevel",
          "description": "button-left-0.84 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "button-left-0.84"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "button-left-0.58",
          "kind": "bevel",
          "description": "button-left-0.58 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "button-left-0.58"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "button-right-0.58",
          "kind": "bevel",
          "description": "button-right-0.58 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "button-right-0.58"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "button-right-0.84",
          "kind": "bevel",
          "description": "button-right-0.84 authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "button-right-0.84"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "powerIndicator",
          "kind": "bevel",
          "description": "powerIndicator authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "powerIndicator"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "baseSeam",
          "kind": "bevel",
          "description": "baseSeam authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "baseSeam"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "ventRibs",
          "kind": "ridge",
          "description": "ventRibs authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "ventRibs"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "lower-vent-recesses",
          "kind": "ridge",
          "description": "lower-vent-recesses authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "lower-vent-recesses"
          },
          "evidenceRefs": [
            "full-object"
          ]
        },
        {
          "id": "upper-vent-recesses",
          "kind": "ridge",
          "description": "upper-vent-recesses authored as a named runtime assembly with measured dimensions and transform.",
          "mapsTo": {
            "ref": "upper-vent-recesses"
          },
          "evidenceRefs": [
            "full-object"
          ]
        }
      ]
    },
    "sourceImage": "public/templates/savepoint/deck-01-three-quarter.png"
  },
  "qualityContract": {
    "qualityBar": "complex",
    "definitionOfDone": [
      "bilateral low extruded wedge, front +Z, rear elevated",
      "screen embedded in sloping shell; rear slot open to cavity",
      "Nine named physical assemblies with dielectric polymer, glass and contact metal; front, rear and orbit inspection."
    ],
    "minimumSpecDepth": {
      "macroComponents": 3,
      "mesoComponents": 8,
      "microFeatureGroups": 5,
      "materialLayers": 3,
      "repetitionSystems": 1,
      "reviewViewpoints": 4
    },
    "featureGroups": [
      {
        "id": "overall-silhouette",
        "name": "Overall silhouette and proportions",
        "required": true,
        "qualityCriteria": [
          "Bounding shape, dominant curves, negative spaces, and scale relationships are explicitly described."
        ],
        "evidenceRefs": [
          "full-object"
        ],
        "failureModes": [
          "model reads as a generic placeholder instead of the reference object",
          "major proportions are guessed without evidence"
        ]
      },
      {
        "id": "primary-structure",
        "name": "Primary structure and hierarchy",
        "required": true,
        "qualityCriteria": [
          "Major parts, joints, seams, contact points, and parent-child relationships are named before code generation."
        ],
        "evidenceRefs": [
          "full-object"
        ],
        "failureModes": [
          "large visible parts are merged into one mesh",
          "component hierarchy is too shallow for the observed complexity"
        ]
      },
      {
        "id": "attachment-joint-correctness",
        "name": "Attachment and joint correctness",
        "required": true,
        "qualityCriteria": [
          "Every visible child appendage, branch, limb, handle, connector, tube, cable, horn, wing, leg, or hinged part has an attachment contract with parent socket, localStart/localEnd, contact type, embed/overlap, and gap tolerance."
        ],
        "evidenceRefs": [
          "full-object"
        ],
        "failureModes": [
          "child part root floats away from the parent",
          "branch/limb/tube is centered in space instead of pivoting from its root",
          "parent-child transform mixes world and local coordinates"
        ]
      },
      {
        "id": "surface-material-response",
        "name": "Surface material response",
        "required": true,
        "qualityCriteria": [
          "Albedo zones, roughness, normal/bump/displacement intent, cavity dirt, edge wear, and local overrides are specified where visible.",
          "Important materials define independent albedo, roughness, height/normal, and AO responses instead of reusing one texture for unrelated PBR channels.",
          "Surface response is decomposed into macro, meso, and micro frequency bands with scale and amplitude tied to object scale."
        ],
        "evidenceRefs": [
          "full-object"
        ],
        "failureModes": [
          "surface looks like flat plastic",
          "local material variation is missing or not tied to image evidence"
        ]
      },
      {
        "id": "reference-lookdev",
        "name": "Reference color, material, and lighting response",
        "required": true,
        "qualityCriteria": [
          "Material-pass names the reference-derived albedo palette, roughness variation, tactile normal/bump/displacement response, and local masks.",
          "When a source image is available, run reference PBR extraction and require confidence >= 0.7 before treating maps as implementation-ready.",
          "Lighting-pass names key/fill/rim or environment light, exposure, tone mapping, background, and contact shadow behavior.",
          "Neutral, grazing-angle, and reference-matched renders prove that surface relief survives relighting and is not painted into albedo."
        ],
        "evidenceRefs": [
          "full-object"
        ],
        "failureModes": [
          "model has acceptable shape but reads as flat shaded or plastic",
          "colors are a generic average instead of reference-observed local color zones",
          "lighting is evenly ambient and cannot reproduce the source value range"
        ]
      }
    ],
    "visualDeltaChecks": [
      "silhouette and negative-space delta",
      "component hierarchy depth delta",
      "repetition density and distribution delta",
      "material albedo/roughness/normal response delta",
      "local feature placement and scale delta"
    ],
    "antiShallowSpecRules": [
      "Do not proceed to code if qualityContract.qualityBar is unassessed.",
      "Do not proceed to code if the spec only contains a root component for a moderate or complex object.",
      "Do not proceed to code if required featureGroups are not represented by componentTree, materials, or repetitionSystems.",
      "Do not proceed to code if visible local features are described only in prose and not attached to components/materials/evidenceRefs.",
      "Do not proceed past structural-pass if attached child parts lack attachment.parentSocket, localStart, localEnd, embedDepth/overlap, and gapTolerance.",
      "Do not pass material look-dev when albedo is reused as roughness, height, normal, or AO.",
      "Do not pass material look-dev without macro, meso, and micro surface frequency bands for close-up materials.",
      "Do not pass reference-fidelity material look-dev from a source image without usable referencePbr maps or an explicit documented limitation.",
      "Do not patch a spec with extracted PBR maps when extraction confidence is below the target threshold unless the user explicitly accepts lower fidelity.",
      "Do not place adjacent separate-geometry parts below 0.02 world-unit seam overlap (source: grimoire/build/geometry_patterns.md).",
      "Do not satisfy raised or recessed relief, fasteners, or grip structure with a map alone when the feature affects form; use geometry or displacement (source: grimoire/build/geometry_patterns.md).",
      "Adjacent components must overlap by at least 0.02 world units at shared seams (source: grimoire/build/geometry_patterns.md).",
      "Raised or recessed relief and fasteners must be geometry, instanced micro-parts, or displacement; a map alone is an approximation (source: grimoire/build/geometry_patterns.md)."
    ],
    "mustNotDo": [
      "Do not proceed to code if qualityContract.qualityBar is unassessed.",
      "Do not proceed to code if the spec only contains a root component for a moderate or complex object.",
      "Do not proceed to code if required featureGroups are not represented by componentTree, materials, or repetitionSystems.",
      "Do not proceed to code if visible local features are described only in prose and not attached to components/materials/evidenceRefs.",
      "Do not proceed past structural-pass if attached child parts lack attachment.parentSocket, localStart, localEnd, embedDepth/overlap, and gapTolerance.",
      "Do not pass material look-dev when albedo is reused as roughness, height, normal, or AO.",
      "Do not pass material look-dev without macro, meso, and micro surface frequency bands for close-up materials.",
      "Do not pass reference-fidelity material look-dev from a source image without usable referencePbr maps or an explicit documented limitation.",
      "Do not patch a spec with extracted PBR maps when extraction confidence is below the target threshold unless the user explicitly accepts lower fidelity.",
      "Do not place adjacent separate-geometry parts below 0.02 world-unit seam overlap (source: grimoire/build/geometry_patterns.md).",
      "Do not satisfy raised or recessed relief, fasteners, or grip structure with a map alone when the feature affects form; use geometry or displacement (source: grimoire/build/geometry_patterns.md).",
      "Adjacent components must overlap by at least 0.02 world units at shared seams (source: grimoire/build/geometry_patterns.md).",
      "Raised or recessed relief and fasteners must be geometry, instanced micro-parts, or displacement; a map alone is an approximation (source: grimoire/build/geometry_patterns.md)."
    ]
  },
  "qualityTargets": {
    "targetFidelity": 0.7,
    "mustMatch": [
      "macro silhouette and proportions",
      "primary material albedo/roughness response",
      "reference-derived PBR material response at or above 0.7 confidence when source pixels are usable",
      "most recognizable local features"
    ],
    "niceToHave": [
      "micro scratches, stains, chips, and dirt masks",
      "secondary lighting match"
    ],
    "fpsTarget": 60,
    "reviewViewpoints": [
      "front",
      "three-quarter",
      "side",
      "thickness-axis",
      "long-axis"
    ]
  },
  "selfCorrectLoop": {
    "enabled": true,
    "visualAcceptance": {
      "reviewer": "ai-vision",
      "threshold": 0.7,
      "comparisonArtifactRequired": true,
      "layerScoresRequired": true,
      "codePixelDiffIsAcceptanceAuthority": false,
      "scoringRule": "AI vision must inspect a side-by-side reference/render sheet and score the current pass from 0 to 1. Pixel-diff code may assist diagnostics but cannot approve a pass.",
      "requiredLayerScores": [
        "silhouetteProportion",
        "componentStructure",
        "formDetail",
        "materialSurface",
        "lightingCamera"
      ],
      "featureReviewPolicy": {
        "enabled": true,
        "reviewUnit": "semantic-subsystem",
        "maxCriticalFeaturesPerPass": 5,
        "maxImportantFeaturesPerPass": 3,
        "criticalDefaultThreshold": 0.8,
        "importantAverageThreshold": 0.65,
        "adaptiveEscalation": true,
        "singleImagePairOnly": true,
        "selectionRule": "Choose only the most visually salient, identity-defining, user-prioritized, or high-risk semantic systems. Group repeated parts instead of reviewing every mesh. AI vision scores every selected feature from the same full reference/render pair."
      }
    },
    "reviewAfterPasses": [
      "blockout",
      "structural-pass",
      "form-refinement",
      "material-pass",
      "surface-pass",
      "lighting-pass",
      "interaction-pass",
      "optimization-pass"
    ],
    "allowedActions": [
      "continue",
      "refine-spec",
      "refine-code",
      "request-input",
      "stop"
    ],
    "specRefineTriggers": [
      "missing component",
      "wrong primitive family",
      "wrong proportions",
      "material layer under-specified",
      "local feature not traceable to viewEvidence",
      "reference ambiguity discovered during implementation"
    ],
    "codeRefineTriggers": [
      "spec is adequate but generated geometry/material does not match",
      "browser render differs from reference",
      "performance budget exceeded",
      "lighting hides geometry or material response"
    ],
    "stopCriteria": [
      "target fidelity reached or user accepts current approximation",
      "remaining gaps require new reference images or manual art"
    ],
    "screenshotPolicy": {
      "requiredForPasses": [
        "blockout",
        "structural-pass",
        "form-refinement",
        "material-pass",
        "surface-pass",
        "lighting-pass",
        "interaction-pass"
      ],
      "preferredCapture": "in-app-browser-screenshot",
      "fallbackCapture": "user-supplied-screenshot-path",
      "minimumEvidence": "Each visual pass needs a reference image, rendered screenshot, side-by-side comparison sheet, AI vision score, layer scores, and critique before choosing continue.",
      "reviewPairRule": "Compare the same camera/viewpoint whenever possible; do not judge a front reference against a random render angle.",
      "acceptanceAuthority": "AI vision review of the comparison sheet. Code-generated pixel similarity is not sufficient evidence."
    }
  },
  "featureReviewTargets": [
    {
      "id": "silhouette",
      "name": "Chassis footprint and wedge slope",
      "tier": "critical",
      "passIds": [
        "blockout"
      ],
      "threshold": 0.8,
      "evidenceRefs": [
        "full-object"
      ]
    },
    {
      "id": "slot-cavity",
      "name": "slot-cavity",
      "tier": "critical",
      "passIds": [
        "structural-pass"
      ],
      "minimumScore": 0.8,
      "evidenceRefs": [
        "full-object"
      ]
    },
    {
      "id": "inclined-aperture",
      "name": "inclined-aperture",
      "tier": "critical",
      "passIds": [
        "structural-pass"
      ],
      "minimumScore": 0.8,
      "evidenceRefs": [
        "full-object"
      ]
    },
    {
      "id": "vent-and-controls",
      "name": "vent-and-controls",
      "tier": "critical",
      "passIds": [
        "form-refinement"
      ],
      "minimumScore": 0.8,
      "evidenceRefs": [
        "full-object"
      ]
    },
    {
      "id": "polymer-glass",
      "name": "polymer-glass",
      "tier": "critical",
      "passIds": [
        "material-pass"
      ],
      "minimumScore": 0.8,
      "evidenceRefs": [
        "full-object"
      ]
    },
    {
      "id": "surface-response",
      "name": "surface-response",
      "tier": "critical",
      "passIds": [
        "surface-pass"
      ],
      "minimumScore": 0.8,
      "evidenceRefs": [
        "full-object"
      ]
    },
    {
      "id": "form-lighting",
      "name": "form-lighting",
      "tier": "critical",
      "passIds": [
        "lighting-pass"
      ],
      "minimumScore": 0.8,
      "evidenceRefs": [
        "full-object"
      ]
    },
    {
      "id": "slot-calibration",
      "name": "slot-calibration",
      "tier": "critical",
      "passIds": [
        "interaction-pass"
      ],
      "minimumScore": 0.8,
      "evidenceRefs": [
        "full-object"
      ]
    }
  ],
  "lookDevTargets": {
    "qualityPriority": "reference-fidelity",
    "materialPass": {
      "albedoPaletteRequired": true,
      "roughnessVariationRequired": true,
      "normalOrBumpRequired": true,
      "localOverridesRequired": true,
      "minimumTextureResolution": 1024,
      "preferredTextureResolution": 2048,
      "independentMapChannels": [
        "albedo",
        "roughness",
        "height",
        "normal",
        "ambient-occlusion"
      ],
      "requiredSurfaceFrequencyBands": [
        "macro",
        "meso",
        "micro"
      ],
      "geometryReliefRequiredWhenSilhouetteAffected": true,
      "referencePbrExtraction": {
        "requiredWhenSourceImagePresent": true,
        "targetThreshold": 0.7,
        "stopOnLowConfidence": true,
        "script": "forge/stage1_intake/extract_pbr_evidence.py",
        "acceptedLimitation": "single-image extraction is reference-derived inference, not exact photogrammetry"
      },
      "mustAvoid": [
        "single flat albedo per material",
        "uniform roughness",
        "albedo texture reused as roughness/height/normal/AO",
        "single-frequency random noise",
        "plastic-looking smooth bark, stone, cloth, foliage, or aged material",
        "local color/detail described only in prose without material masks",
        "claiming exact PBR recovery when confidence is below the target threshold"
      ]
    },
    "lightingPass": {
      "requiredTerms": [
        "key light",
        "fill light",
        "rim or environment light",
        "exposure",
        "tone mapping",
        "background",
        "contact shadow"
      ],
      "mustAvoid": [
        "ambient-only lighting",
        "flat value range",
        "missing contact shadow",
        "reference lighting copied without separating material readability"
      ]
    },
    "screenshotReview": [
      "Compare albedo palette and local color zones.",
      "Compare roughness/normal/bump response under light.",
      "Compare cavity dirt, edge wear, stains, moss, scratches, or other local masks.",
      "Compare key/fill/rim structure, exposure, tone mapping, background, and contact shadows.",
      "Capture a neutral-light render to verify material readability without reference lighting.",
      "Capture a grazing-light close-up to expose flat normals, uniform roughness, tiling, and plastic highlights.",
      "Capture a reference-matched render from the same camera framing as the source."
    ]
  },
  "actionReadiness": {
    "contract": "Every macro/meso component should be generated as a stable named Object3D pivot node with a mesh child, action metadata, optional sockets, collider proxy, and destruction metadata.",
    "defaultRigType": "action-ready-static-rig",
    "rootMotionNode": "root",
    "requiredComponentFields": [
      "id",
      "parent",
      "transform",
      "attachment for child appendages, connectors, limbs, tubes, handles, legs, horns, wings, branches, or cables",
      "actionProfile.animationRole",
      "actionProfile.pivot",
      "actionProfile.collider",
      "actionProfile.destruction"
    ],
    "transformChannels": [
      "translate",
      "rotate",
      "scale",
      "bend",
      "twist",
      "detach",
      "visibility",
      "material-state"
    ],
    "authoringRules": [
      "Do not collapse independently movable parts into one mesh.",
      "Put transforms on component pivot groups, not only on raw meshes.",
      "For attached child parts, put the pivot at the semantic root/socket and build visible geometry from localStart to localEnd.",
      "Represent hinge, socket, detachable, and breakable intent even when no animation is implemented yet.",
      "Use simplified collider proxies for runtime physics instead of visual mesh colliders by default."
    ],
    "destructionPolicy": {
      "defaultBreakable": false,
      "fractureGroupNaming": "Use stable semantic names such as body-shell, left-hinge, glass-panel, branch-segment.",
      "debrisStrategy": "Prefer detachable component groups and a small number of procedural fragments over random mesh explosion."
    }
  },
  "assumptions": [
    "Conceptual dimensions are inferred from approved renders; hidden electronics and manufacturing tolerances are not reconstructed.",
    "Polymer micrograin is procedural. The approved surface art is used verbatim as its own texture source."
  ],
  "coordinateFrame": {
    "front": "+Z",
    "up": "+Y",
    "scaleReference": "100 mm per scene unit; reference-derived proportions take precedence over approximate conceptual dimensions"
  },
  "silhouette": {
    "boundingShape": "Beveled rectangular wedge, 2.4 X by 2.745 Z; front height .22 and rear height 1.10",
    "aspectRatios": [
      2.4,
      0.6,
      1.8
    ],
    "symmetry": "bilateral",
    "dominantCurves": [
      "beveled edges"
    ],
    "negativeSpaces": [
      "slot cavity"
    ],
    "landmarks": [
      "shell",
      "screenBezel",
      "screenGlass",
      "slotLip",
      "slotInterior",
      "ventRibs",
      "frontButtons",
      "powerIndicator",
      "baseSeam"
    ]
  },
  "viewEvidence": [
    {
      "id": "full-object",
      "view": "primary",
      "imageRegion": {
        "x": 0.0,
        "y": 0.0,
        "width": 1.0,
        "height": 1.0,
        "units": "normalized"
      },
      "observations": [
        "screen embedded in sloping shell; rear slot open to cavity",
        "charcoal satin dielectric polymer, low roughness glass, metal contacts"
      ],
      "confidence": 0.95
    }
  ],
  "componentTree": [
    {
      "id": "DECK-01",
      "name": "DECK-01",
      "level": "macro",
      "role": "pivot",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": null,
      "attachment": null,
      "dimensions": {
        "width": 2.4500000069290397,
        "height": 1.1480000300705433,
        "depth": 2.7760000228881836,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "DECK-01",
          "type": "bevel",
          "description": "DECK-01 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "shell",
      "name": "shell",
      "level": "macro",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "DECK-01",
      "attachment": {
        "parentSocket": "DECK-01",
        "localStart": [
          0,
          0,
          0
        ],
        "localEnd": [
          0,
          0,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 2.4500000069290397,
        "height": 1.1480000300705433,
        "depth": 2.7760000228881836,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "shell",
          "type": "bevel",
          "description": "shell authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "lower-shell",
      "name": "lower-shell",
      "level": "meso",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "shell",
      "attachment": {
        "parentSocket": "shell",
        "localStart": [
          0,
          0.11,
          0
        ],
        "localEnd": [
          0,
          0.11,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 2.4000000953674316,
        "height": 0.2199999988079071,
        "depth": 2.744999885559082,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0.11,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "lower-shell",
          "type": "bevel",
          "description": "lower-shell authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "right-cheek",
      "name": "right-cheek",
      "level": "meso",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "shell",
      "attachment": {
        "parentSocket": "shell",
        "localStart": [
          1.06,
          0,
          0
        ],
        "localEnd": [
          1.06,
          0,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.19000000692903996,
        "height": 0.956000030040741,
        "depth": 2.7760000228881836,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          1.06,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "right-cheek",
          "type": "bevel",
          "description": "right-cheek authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "left-cheek",
      "name": "left-cheek",
      "level": "meso",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "shell",
      "attachment": {
        "parentSocket": "shell",
        "localStart": [
          -1.2,
          0,
          0
        ],
        "localEnd": [
          -1.2,
          0,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.19000000692903996,
        "height": 0.956000030040741,
        "depth": 2.7760000228881836,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          -1.2,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "left-cheek",
          "type": "bevel",
          "description": "left-cheek authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "rear-wall",
      "name": "rear-wall",
      "level": "meso",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "shell",
      "attachment": {
        "parentSocket": "shell",
        "localStart": [
          0,
          0.64,
          -1.31
        ],
        "localEnd": [
          0,
          0.64,
          -1.31
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 2.1500000953674316,
        "height": 0.8299999833106996,
        "depth": 0.09000000357627869,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0.64,
          -1.31
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "rear-wall",
          "type": "bevel",
          "description": "rear-wall authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "front-lip",
      "name": "front-lip",
      "level": "meso",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "shell",
      "attachment": {
        "parentSocket": "shell",
        "localStart": [
          0,
          0.265,
          1.31
        ],
        "localEnd": [
          0,
          0.265,
          1.31
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 2.180000066757202,
        "height": 0.14000000059604645,
        "depth": 0.09000000357627869,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0.265,
          1.31
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "front-lip",
          "type": "bevel",
          "description": "front-lip authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "inclined-panel",
      "name": "inclined-panel",
      "level": "meso",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "shell",
      "attachment": {
        "parentSocket": "shell",
        "localStart": [
          0,
          0.6675616438356164,
          0.245
        ],
        "localEnd": [
          0,
          0.6675616438356164,
          0.245
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 2.180000066757202,
        "height": 0.8255052382634864,
        "depth": 2.202293632293811,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0.6675616438356164,
          0.245
        ],
        "rotation": [
          0.3421558850831803,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "inclined-panel",
          "type": "bevel",
          "description": "inclined-panel authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "rear-deck",
      "name": "rear-deck",
      "level": "meso",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "shell",
      "attachment": {
        "parentSocket": "shell",
        "localStart": [
          0,
          0,
          0
        ],
        "localEnd": [
          0,
          0,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 2.1800000286102295,
        "height": 0.04500000178813934,
        "depth": 0.510000006556511,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "rear-deck",
          "type": "bevel",
          "description": "rear-deck authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "rear-frame-side-left",
      "name": "rear-frame-side-left",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "rear-deck",
      "attachment": {
        "parentSocket": "rear-deck",
        "localStart": [
          -0.7925,
          1.0475,
          -1.05
        ],
        "localEnd": [
          -0.7925,
          1.0475,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.5950000286102295,
        "height": 0.04500000178813934,
        "depth": 0.5099999904632568,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          -0.7925,
          1.0475,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "rear-frame-side-left",
          "type": "bevel",
          "description": "rear-frame-side-left authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "rear-frame-edge-rear",
      "name": "rear-frame-edge-rear",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "rear-deck",
      "attachment": {
        "parentSocket": "rear-deck",
        "localStart": [
          0,
          1.0475,
          -1.2225000000000001
        ],
        "localEnd": [
          0,
          1.0475,
          -1.2225000000000001
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 1.0499999523162842,
        "height": 0.04500000178813934,
        "depth": 0.16500000655651093,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          1.0475,
          -1.2225000000000001
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "rear-frame-edge-rear",
          "type": "bevel",
          "description": "rear-frame-edge-rear authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "rear-frame-side-right",
      "name": "rear-frame-side-right",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "rear-deck",
      "attachment": {
        "parentSocket": "rear-deck",
        "localStart": [
          0.7925,
          1.0475,
          -1.05
        ],
        "localEnd": [
          0.7925,
          1.0475,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.5950000286102295,
        "height": 0.04500000178813934,
        "depth": 0.5099999904632568,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0.7925,
          1.0475,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "rear-frame-side-right",
          "type": "bevel",
          "description": "rear-frame-side-right authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "rear-frame-edge-front",
      "name": "rear-frame-edge-front",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "rear-deck",
      "attachment": {
        "parentSocket": "rear-deck",
        "localStart": [
          0,
          1.0475,
          -0.8775000000000001
        ],
        "localEnd": [
          0,
          1.0475,
          -0.8775000000000001
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 1.0499999523162842,
        "height": 0.04500000178813934,
        "depth": 0.16500000655651093,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          1.0475,
          -0.8775000000000001
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "rear-frame-edge-front",
          "type": "bevel",
          "description": "rear-frame-edge-front authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "rubber-foot-left-rear",
      "name": "rubber-foot-left-rear",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "shell",
      "attachment": {
        "parentSocket": "shell",
        "localStart": [
          -0.9,
          -0.01,
          -1.12
        ],
        "localEnd": [
          -0.9,
          -0.01,
          -1.12
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.20999999344348896,
        "height": 0.03999999910593033,
        "depth": 0.18000000715255737,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          -0.9,
          -0.01,
          -1.12
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "rubber-foot-left-rear",
          "type": "bevel",
          "description": "rubber-foot-left-rear authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "rubber-foot-left-front",
      "name": "rubber-foot-left-front",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "shell",
      "attachment": {
        "parentSocket": "shell",
        "localStart": [
          -0.9,
          -0.01,
          1.12
        ],
        "localEnd": [
          -0.9,
          -0.01,
          1.12
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.20999999344348896,
        "height": 0.03999999910593033,
        "depth": 0.18000000715255737,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          -0.9,
          -0.01,
          1.12
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "rubber-foot-left-front",
          "type": "bevel",
          "description": "rubber-foot-left-front authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "rubber-foot-right-rear",
      "name": "rubber-foot-right-rear",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "shell",
      "attachment": {
        "parentSocket": "shell",
        "localStart": [
          0.9,
          -0.01,
          -1.12
        ],
        "localEnd": [
          0.9,
          -0.01,
          -1.12
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.20999999344348896,
        "height": 0.03999999910593033,
        "depth": 0.18000000715255737,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0.9,
          -0.01,
          -1.12
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "rubber-foot-right-rear",
          "type": "bevel",
          "description": "rubber-foot-right-rear authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "rubber-foot-right-front",
      "name": "rubber-foot-right-front",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "shell",
      "attachment": {
        "parentSocket": "shell",
        "localStart": [
          0.9,
          -0.01,
          1.12
        ],
        "localEnd": [
          0.9,
          -0.01,
          1.12
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.20999999344348896,
        "height": 0.03999999910593033,
        "depth": 0.18000000715255737,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0.9,
          -0.01,
          1.12
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "rubber-foot-right-front",
          "type": "bevel",
          "description": "rubber-foot-right-front authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slotLip",
      "name": "slotLip",
      "level": "meso",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "DECK-01",
      "attachment": {
        "parentSocket": "DECK-01",
        "localStart": [
          0,
          0,
          0
        ],
        "localEnd": [
          0,
          0,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 1.057000000372529,
        "height": 0.017999999225139618,
        "depth": 0.2330000003725291,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "slotLip",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slotLip",
          "type": "bevel",
          "description": "slotLip authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-edge-rear",
      "name": "slot-edge-rear",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotLip",
      "attachment": {
        "parentSocket": "slotLip",
        "localStart": [
          0,
          1.075,
          -1.1540000000000001
        ],
        "localEnd": [
          0,
          1.075,
          -1.1540000000000001
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 1.0499999523162842,
        "height": 0.017999999225139618,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          1.075,
          -1.1540000000000001
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-edge-rear",
          "type": "bevel",
          "description": "slot-edge-rear authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-end-left",
      "name": "slot-end-left",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotLip",
      "attachment": {
        "parentSocket": "slotLip",
        "localStart": [
          -0.516,
          1.075,
          -1.05
        ],
        "localEnd": [
          -0.516,
          1.075,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.02500000037252903,
        "height": 0.017999999225139618,
        "depth": 0.20000000298023224,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          -0.516,
          1.075,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-end-left",
          "type": "bevel",
          "description": "slot-end-left authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-edge-front",
      "name": "slot-edge-front",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotLip",
      "attachment": {
        "parentSocket": "slotLip",
        "localStart": [
          0,
          1.075,
          -0.9460000000000001
        ],
        "localEnd": [
          0,
          1.075,
          -0.9460000000000001
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 1.0499999523162842,
        "height": 0.017999999225139618,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          1.075,
          -0.9460000000000001
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-edge-front",
          "type": "bevel",
          "description": "slot-edge-front authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-end-right",
      "name": "slot-end-right",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotLip",
      "attachment": {
        "parentSocket": "slotLip",
        "localStart": [
          0.516,
          1.075,
          -1.05
        ],
        "localEnd": [
          0.516,
          1.075,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.02500000037252903,
        "height": 0.017999999225139618,
        "depth": 0.20000000298023224,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0.516,
          1.075,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-end-right",
          "type": "bevel",
          "description": "slot-end-right authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slotInterior",
      "name": "slotInterior",
      "level": "macro",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "DECK-01",
      "attachment": {
        "parentSocket": "DECK-01",
        "localStart": [
          0,
          0,
          0
        ],
        "localEnd": [
          0,
          0,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 1.043000000372529,
        "height": 0.3075000006705524,
        "depth": 0.235000000372529,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "slotInterior",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slotInterior",
          "type": "bevel",
          "description": "slotInterior authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-wall-rear",
      "name": "slot-wall-rear",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          0,
          0.91,
          -1.155
        ],
        "localEnd": [
          0,
          0.91,
          -1.155
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 1.0199999809265137,
        "height": 0.280000001192093,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0.91,
          -1.155
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-wall-rear",
          "type": "bevel",
          "description": "slot-wall-rear authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "end-guide-left",
      "name": "end-guide-left",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          -0.509,
          0.91,
          -1.05
        ],
        "localEnd": [
          -0.509,
          0.91,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.02500000037252903,
        "height": 0.280000001192093,
        "depth": 0.18000000715255737,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          -0.509,
          0.91,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "end-guide-left",
          "type": "bevel",
          "description": "end-guide-left authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-wall-front",
      "name": "slot-wall-front",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          0,
          0.91,
          -0.9450000000000001
        ],
        "localEnd": [
          0,
          0.91,
          -0.9450000000000001
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 1.0199999809265137,
        "height": 0.280000001192093,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0.91,
          -0.9450000000000001
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-wall-front",
          "type": "bevel",
          "description": "slot-wall-front authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "end-guide-right",
      "name": "end-guide-right",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          0.509,
          0.91,
          -1.05
        ],
        "localEnd": [
          0.509,
          0.91,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.02500000037252903,
        "height": 0.280000001192093,
        "depth": 0.18000000715255737,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0.509,
          0.91,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "end-guide-right",
          "type": "bevel",
          "description": "end-guide-right authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-floor",
      "name": "slot-floor",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          0,
          0.76,
          -1.05
        ],
        "localEnd": [
          0,
          0.76,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.9900000095367432,
        "height": 0.03500000014901161,
        "depth": 0.18000000715255737,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0.76,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-floor",
          "type": "bevel",
          "description": "slot-floor authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-0",
      "name": "slot-contact-0",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          -0.33,
          0.803,
          -1.05
        ],
        "localEnd": [
          -0.33,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          -0.33,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-0",
          "type": "bevel",
          "description": "slot-contact-0 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-1",
      "name": "slot-contact-1",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          -0.306,
          0.803,
          -1.05
        ],
        "localEnd": [
          -0.306,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          -0.306,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-1",
          "type": "bevel",
          "description": "slot-contact-1 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-2",
      "name": "slot-contact-2",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          -0.28200000000000003,
          0.803,
          -1.05
        ],
        "localEnd": [
          -0.28200000000000003,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          -0.28200000000000003,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-2",
          "type": "bevel",
          "description": "slot-contact-2 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-3",
      "name": "slot-contact-3",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          -0.258,
          0.803,
          -1.05
        ],
        "localEnd": [
          -0.258,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          -0.258,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-3",
          "type": "bevel",
          "description": "slot-contact-3 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-4",
      "name": "slot-contact-4",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          -0.234,
          0.803,
          -1.05
        ],
        "localEnd": [
          -0.234,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          -0.234,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-4",
          "type": "bevel",
          "description": "slot-contact-4 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-5",
      "name": "slot-contact-5",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          -0.21000000000000002,
          0.803,
          -1.05
        ],
        "localEnd": [
          -0.21000000000000002,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          -0.21000000000000002,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-5",
          "type": "bevel",
          "description": "slot-contact-5 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-6",
      "name": "slot-contact-6",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          -0.186,
          0.803,
          -1.05
        ],
        "localEnd": [
          -0.186,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          -0.186,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-6",
          "type": "bevel",
          "description": "slot-contact-6 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-7",
      "name": "slot-contact-7",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          -0.162,
          0.803,
          -1.05
        ],
        "localEnd": [
          -0.162,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          -0.162,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-7",
          "type": "bevel",
          "description": "slot-contact-7 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-8",
      "name": "slot-contact-8",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          -0.138,
          0.803,
          -1.05
        ],
        "localEnd": [
          -0.138,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          -0.138,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-8",
          "type": "bevel",
          "description": "slot-contact-8 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-9",
      "name": "slot-contact-9",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          -0.11400000000000002,
          0.803,
          -1.05
        ],
        "localEnd": [
          -0.11400000000000002,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          -0.11400000000000002,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-9",
          "type": "bevel",
          "description": "slot-contact-9 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-10",
      "name": "slot-contact-10",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          -0.09000000000000002,
          0.803,
          -1.05
        ],
        "localEnd": [
          -0.09000000000000002,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          -0.09000000000000002,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-10",
          "type": "bevel",
          "description": "slot-contact-10 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-11",
      "name": "slot-contact-11",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          -0.066,
          0.803,
          -1.05
        ],
        "localEnd": [
          -0.066,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          -0.066,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-11",
          "type": "bevel",
          "description": "slot-contact-11 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-12",
      "name": "slot-contact-12",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          -0.04199999999999998,
          0.803,
          -1.05
        ],
        "localEnd": [
          -0.04199999999999998,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          -0.04199999999999998,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-12",
          "type": "bevel",
          "description": "slot-contact-12 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-13",
      "name": "slot-contact-13",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          -0.018000000000000016,
          0.803,
          -1.05
        ],
        "localEnd": [
          -0.018000000000000016,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          -0.018000000000000016,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-13",
          "type": "bevel",
          "description": "slot-contact-13 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-14",
      "name": "slot-contact-14",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          0.006000000000000005,
          0.803,
          -1.05
        ],
        "localEnd": [
          0.006000000000000005,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0.006000000000000005,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-14",
          "type": "bevel",
          "description": "slot-contact-14 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-15",
      "name": "slot-contact-15",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          0.02999999999999997,
          0.803,
          -1.05
        ],
        "localEnd": [
          0.02999999999999997,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0.02999999999999997,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-15",
          "type": "bevel",
          "description": "slot-contact-15 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-16",
      "name": "slot-contact-16",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          0.05399999999999999,
          0.803,
          -1.05
        ],
        "localEnd": [
          0.05399999999999999,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0.05399999999999999,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-16",
          "type": "bevel",
          "description": "slot-contact-16 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-17",
      "name": "slot-contact-17",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          0.07800000000000001,
          0.803,
          -1.05
        ],
        "localEnd": [
          0.07800000000000001,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0.07800000000000001,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-17",
          "type": "bevel",
          "description": "slot-contact-17 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-18",
      "name": "slot-contact-18",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          0.10199999999999998,
          0.803,
          -1.05
        ],
        "localEnd": [
          0.10199999999999998,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0.10199999999999998,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-18",
          "type": "bevel",
          "description": "slot-contact-18 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-19",
      "name": "slot-contact-19",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          0.126,
          0.803,
          -1.05
        ],
        "localEnd": [
          0.126,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0.126,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-19",
          "type": "bevel",
          "description": "slot-contact-19 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-20",
      "name": "slot-contact-20",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          0.14999999999999997,
          0.803,
          -1.05
        ],
        "localEnd": [
          0.14999999999999997,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0.14999999999999997,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-20",
          "type": "bevel",
          "description": "slot-contact-20 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-21",
      "name": "slot-contact-21",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          0.174,
          0.803,
          -1.05
        ],
        "localEnd": [
          0.174,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0.174,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-21",
          "type": "bevel",
          "description": "slot-contact-21 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-22",
      "name": "slot-contact-22",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          0.198,
          0.803,
          -1.05
        ],
        "localEnd": [
          0.198,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0.198,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-22",
          "type": "bevel",
          "description": "slot-contact-22 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-23",
      "name": "slot-contact-23",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          0.22200000000000003,
          0.803,
          -1.05
        ],
        "localEnd": [
          0.22200000000000003,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0.22200000000000003,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-23",
          "type": "bevel",
          "description": "slot-contact-23 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-24",
      "name": "slot-contact-24",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          0.24600000000000005,
          0.803,
          -1.05
        ],
        "localEnd": [
          0.24600000000000005,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0.24600000000000005,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-24",
          "type": "bevel",
          "description": "slot-contact-24 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-25",
      "name": "slot-contact-25",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          0.26999999999999996,
          0.803,
          -1.05
        ],
        "localEnd": [
          0.26999999999999996,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0.26999999999999996,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-25",
          "type": "bevel",
          "description": "slot-contact-25 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-26",
      "name": "slot-contact-26",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          0.294,
          0.803,
          -1.05
        ],
        "localEnd": [
          0.294,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0.294,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-26",
          "type": "bevel",
          "description": "slot-contact-26 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slot-contact-27",
      "name": "slot-contact-27",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "slotInterior",
      "attachment": {
        "parentSocket": "slotInterior",
        "localStart": [
          0.318,
          0.803,
          -1.05
        ],
        "localEnd": [
          0.318,
          0.803,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.012000000104308128,
        "height": 0.02500000037252903,
        "depth": 0.02500000037252903,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0.318,
          0.803,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "metal",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slot-contact-27",
          "type": "bevel",
          "description": "slot-contact-27 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "screenBezel",
      "name": "screenBezel",
      "level": "macro",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "DECK-01",
      "attachment": {
        "parentSocket": "DECK-01",
        "localStart": [
          0,
          0.693095890410959,
          0.28
        ],
        "localEnd": [
          0,
          0.693095890410959,
          0.28
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 1.9600000381469727,
        "height": 0.47679802059396703,
        "depth": 1.2555629654628628,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0.693095890410959,
          0.28
        ],
        "rotation": [
          0.3421558850831803,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "screenBezel",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "screenBezel",
          "type": "bevel",
          "description": "screenBezel authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "screenGlass",
      "name": "screenGlass",
      "level": "meso",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "DECK-01",
      "attachment": {
        "parentSocket": "DECK-01",
        "localStart": [
          0,
          0.724095890410959,
          0.28
        ],
        "localEnd": [
          0,
          0.724095890410959,
          0.28
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 1.8300000429153442,
        "height": 0.4195791620929208,
        "depth": 1.1364796012354097,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0.724095890410959,
          0.28
        ],
        "rotation": [
          0.3421558850831803,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "screenGlass",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "glass",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "screenGlass",
          "type": "bevel",
          "description": "screenGlass authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "activeScreenPlane",
      "name": "activeScreenPlane",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "plane-card",
      "topologyClass": "material-only",
      "topologyRationale": "Flat artwork/display carrier with explicit UV coordinates.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "screenGlass",
      "attachment": {
        "parentSocket": "screenGlass",
        "localStart": [
          0,
          0.015072536245633428,
          -0.005368300580636563
        ],
        "localEnd": [
          0,
          0.015072536245633428,
          -0.005368300580636563
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 1.7300000190734863,
        "height": 0.3522947096054949,
        "depth": 0.9891351462000424,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0.015072536245633428,
          -0.005368300580636563
        ],
        "rotation": [
          -1.5707963267948963,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "label",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "activeScreenPlane",
          "type": "decal",
          "description": "activeScreenPlane authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slotEntrance",
      "name": "slotEntrance",
      "level": "micro",
      "role": "pivot",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "material-only",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "DECK-01",
      "attachment": {
        "parentSocket": "DECK-01",
        "localStart": [
          0,
          1.075,
          -1.05
        ],
        "localEnd": [
          0,
          1.075,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.001,
        "height": 0.001,
        "depth": 0.001,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          1.075,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slotEntrance",
          "type": "bevel",
          "description": "slotEntrance authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slotAlignment",
      "name": "slotAlignment",
      "level": "micro",
      "role": "pivot",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "material-only",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "DECK-01",
      "attachment": {
        "parentSocket": "DECK-01",
        "localStart": [
          0,
          1.55,
          -1.05
        ],
        "localEnd": [
          0,
          1.55,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.001,
        "height": 0.001,
        "depth": 0.001,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          1.55,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slotAlignment",
          "type": "bevel",
          "description": "slotAlignment authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "slotFullyInserted",
      "name": "slotFullyInserted",
      "level": "micro",
      "role": "pivot",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "material-only",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "DECK-01",
      "attachment": {
        "parentSocket": "DECK-01",
        "localStart": [
          0,
          0.84,
          -1.05
        ],
        "localEnd": [
          0,
          0.84,
          -1.05
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.001,
        "height": 0.001,
        "depth": 0.001,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0.84,
          -1.05
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "slotFullyInserted",
          "type": "bevel",
          "description": "slotFullyInserted authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "frontButtons",
      "name": "frontButtons",
      "level": "meso",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "DECK-01",
      "attachment": {
        "parentSocket": "DECK-01",
        "localStart": [
          0,
          0,
          0
        ],
        "localEnd": [
          0,
          0,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 1.8500000017881393,
        "height": 0.05299999937415123,
        "depth": 0.03500000014901161,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "frontButtons",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "frontButtons",
          "type": "bevel",
          "description": "frontButtons authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "button-left-0.84",
      "name": "button-left-0.84",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "frontButtons",
      "attachment": {
        "parentSocket": "frontButtons",
        "localStart": [
          -0.84,
          0.275,
          1.367
        ],
        "localEnd": [
          -0.84,
          0.275,
          1.367
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.17000000178813934,
        "height": 0.05299999937415123,
        "depth": 0.03500000014901161,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          -0.84,
          0.275,
          1.367
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "button-left-0.84",
          "type": "bevel",
          "description": "button-left-0.84 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "button-left-0.58",
      "name": "button-left-0.58",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "frontButtons",
      "attachment": {
        "parentSocket": "frontButtons",
        "localStart": [
          -0.58,
          0.275,
          1.367
        ],
        "localEnd": [
          -0.58,
          0.275,
          1.367
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.17000000178813934,
        "height": 0.05299999937415123,
        "depth": 0.03500000014901161,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          -0.58,
          0.275,
          1.367
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "button-left-0.58",
          "type": "bevel",
          "description": "button-left-0.58 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "button-right-0.58",
      "name": "button-right-0.58",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "frontButtons",
      "attachment": {
        "parentSocket": "frontButtons",
        "localStart": [
          0.58,
          0.275,
          1.367
        ],
        "localEnd": [
          0.58,
          0.275,
          1.367
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.17000000178813934,
        "height": 0.05299999937415123,
        "depth": 0.03500000014901161,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0.58,
          0.275,
          1.367
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "button-right-0.58",
          "type": "bevel",
          "description": "button-right-0.58 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "button-right-0.84",
      "name": "button-right-0.84",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "frontButtons",
      "attachment": {
        "parentSocket": "frontButtons",
        "localStart": [
          0.84,
          0.275,
          1.367
        ],
        "localEnd": [
          0.84,
          0.275,
          1.367
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.17000000178813934,
        "height": 0.05299999937415123,
        "depth": 0.03500000014901161,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0.84,
          0.275,
          1.367
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "button-right-0.84",
          "type": "bevel",
          "description": "button-right-0.84 authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "powerIndicator",
      "name": "powerIndicator",
      "level": "meso",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "DECK-01",
      "attachment": {
        "parentSocket": "DECK-01",
        "localStart": [
          0.84,
          0.39123287671232887,
          1.15
        ],
        "localEnd": [
          0.84,
          0.39123287671232887,
          1.15
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 0.035999998450279236,
        "height": 0.035999998450279236,
        "depth": 0.035999998450279236,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0.84,
          0.39123287671232887,
          1.15
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "powerIndicator",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "powerIndicator",
          "type": "bevel",
          "description": "powerIndicator authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "baseSeam",
      "name": "baseSeam",
      "level": "meso",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "DECK-01",
      "attachment": {
        "parentSocket": "DECK-01",
        "localStart": [
          0,
          0.22,
          0
        ],
        "localEnd": [
          0,
          0.22,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 2.369999885559082,
        "height": 0.014999999664723873,
        "depth": 2.7100000381469727,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0.22,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "baseSeam",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "baseSeam",
          "type": "bevel",
          "description": "baseSeam authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "ventRibs",
      "name": "ventRibs",
      "level": "meso",
      "role": "panel",
      "importance": 0.9,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "DECK-01",
      "attachment": {
        "parentSocket": "DECK-01",
        "localStart": [
          0,
          0,
          0
        ],
        "localEnd": [
          0,
          0,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 2.4220000859349966,
        "height": 1.0345000084489584,
        "depth": 2.5245000002905726,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "ventRibs",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "ventRibs",
          "type": "bevel",
          "description": "ventRibs authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "lower-vent-recesses",
      "name": "lower-vent-recesses",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "ventRibs",
      "attachment": {
        "parentSocket": "ventRibs",
        "localStart": [
          0,
          0,
          0
        ],
        "localEnd": [
          0,
          0,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 2.4220000859349966,
        "height": 0.10499999672174454,
        "depth": 2.483000038191676,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "lower-vent-recesses",
          "type": "bevel",
          "description": "lower-vent-recesses authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    },
    {
      "id": "upper-vent-recesses",
      "name": "upper-vent-recesses",
      "level": "micro",
      "role": "panel",
      "importance": 0.6,
      "confidence": 0.86,
      "primitive": "box",
      "topologyClass": "assembled-solid",
      "topologyRationale": "Named manufactured rigid assembly; closed solids are exported for the self-intersection gate.",
      "geometryDescriptor": {
        "topologyIntent": "Manufactured beveled assembly with physical recesses and clearances.",
        "edgeTreatment": {
          "type": "bevel",
          "bevelRadius": 0.015,
          "segments": 3
        },
        "deformationStack": [],
        "uvStrategy": "generated procedural coordinates",
        "normalStrategy": "vertex normals from generated geometry"
      },
      "parent": "ventRibs",
      "attachment": {
        "parentSocket": "ventRibs",
        "localStart": [
          0,
          0,
          0
        ],
        "localEnd": [
          0,
          0,
          0
        ],
        "contactType": "embed",
        "embedDepth": 0.02,
        "gapTolerance": 0.001
      },
      "dimensions": {
        "width": 2.3999999463558197,
        "height": 0.03679456189274788,
        "depth": 0.5199999585747719,
        "units": "scene-units",
        "confidence": 0.85
      },
      "transform": {
        "position": [
          0,
          0,
          0
        ],
        "rotation": [
          0,
          0,
          0
        ],
        "scale": [
          1,
          1,
          1
        ]
      },
      "actionProfile": {
        "animationRole": "root",
        "pivot": {
          "mode": "center",
          "localPosition": [
            0,
            0,
            0
          ],
          "axis": [
            0,
            1,
            0
          ],
          "confidence": 0.5
        },
        "transformChannels": {
          "translate": true,
          "rotate": true,
          "scale": true,
          "bend": false,
          "twist": false,
          "detach": false,
          "visibility": true,
          "materialState": true
        },
        "sockets": [],
        "collider": {
          "type": "box",
          "offset": [
            0,
            0,
            0
          ],
          "scale": [
            1,
            1,
            1
          ],
          "isTrigger": false,
          "notes": "Measured box proxy for picking; rendering and slot clearance use the actual procedural surfaces."
        },
        "constraints": [],
        "destruction": {
          "breakable": false,
          "fractureGroup": "shell",
          "seamRefs": [],
          "detachableFragments": [],
          "breakImpulse": 0.0,
          "debrisMaterial": "base"
        }
      },
      "material": "base",
      "materialLayers": [
        "base"
      ],
      "deformations": [],
      "joints": [],
      "seams": [],
      "localFeatures": [
        {
          "id": "upper-vent-recesses",
          "type": "bevel",
          "description": "upper-vent-recesses authored as a named runtime assembly with measured dimensions and transform.",
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "surfaceDetail": {
        "macroRoughness": 0.66,
        "microRoughness": 0.05,
        "bumpAmplitude": 0.0008,
        "normalPattern": "independent deterministic molded grain",
        "displacementPattern": "none",
        "occlusionPattern": "physical cavity walls and shadow casters",
        "edgeWearPattern": "molded bevel highlights",
        "notes": "Seed 19341; independent 1024px roughness and height channels. Flat artwork carriers retain source colors."
      },
      "evidenceRefs": [
        "full-object"
      ],
      "details": [],
      "fidelityTier": "final",
      "colorMaterialRecipe": {
        "dominantAlbedo": "rgba(36,38,44,1)",
        "secondaryAlbedo": "rgba(9,11,16,1)",
        "materialClass": "plastic",
        "materialClassConfidence": 0.86
      }
    }
  ],
  "materials": [
    {
      "id": "base",
      "name": "Base material",
      "type": "standard",
      "shaderModel": "MeshStandardMaterial / PBR approximation",
      "baseColor": "#24262c",
      "color": "#24262c",
      "albedo": {
        "dominant": "#303238",
        "secondary": [
          "#202228",
          "#41444b"
        ],
        "samplingNotes": "Neutral charcoal shell; highlights excluded from albedo"
      },
      "colorVariation": {
        "palette": [
          "#8A7A5F",
          "#6E614B",
          "#A08F70"
        ],
        "pattern": "mottled",
        "amplitude": 0.15,
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
          "frequency": 2.0,
          "amplitude": 0.42,
          "role": "broad color and height breakup"
        },
        {
          "id": "meso",
          "frequency": 12.0,
          "amplitude": 0.22,
          "role": "ridges, pores, grain, dents, or equivalent visible relief"
        },
        {
          "id": "micro",
          "frequency": 56.0,
          "amplitude": 0.08,
          "role": "highlight breakup visible under grazing light"
        }
      ],
      "roughness": {
        "base": 0.66,
        "variation": 0.06,
        "map": "independent 1024px deterministic roughness field"
      },
      "metalness": {
        "base": 0,
        "variation": 0
      },
      "normal": {
        "pattern": "derived-from-independent-height-field",
        "strength": 0.35,
        "scale": 24.0,
        "space": "tangent"
      },
      "bump": {
        "pattern": "independent molded grain height",
        "amplitude": 0.0008,
        "scale": 3
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
          "id": "cavity-darkening",
          "region": "slotInterior and ventRibs",
          "baseColor": "#090b10",
          "roughness": 0.88,
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "shaderNotes": [
        "Prefer MeshPhysicalMaterial when clearcoat, sheen, transmission, or thin-surface response is observed; otherwise use MeshStandardMaterial-compatible PBR channels.",
        "Generate albedo, roughness, height/normal, and AO independently; never alias albedo into roughness.",
        "Use normal/bump/displacement only when they map to observed surface relief.",
        "Use displacement geometry when the observed relief changes the close-up silhouette; texture-only relief is insufficient there."
      ],
      "notes": "Reference-derived inference; authored scalars and geometry implement the visible response. No manufacturing accuracy is claimed.",
      "referencePbr": {
        "usable": true,
        "confidence": 0.843,
        "maps": {
          "albedo": {
            "path": "public/templates/savepoint/pbr/polymer/base_albedo.png",
            "url": "base_albedo.png",
            "channel": "albedo",
            "source": "reference-pixel-extraction"
          },
          "roughness": {
            "path": "public/templates/savepoint/pbr/polymer/base_roughness.png",
            "url": "base_roughness.png",
            "channel": "roughness",
            "source": "reference-pixel-extraction"
          },
          "height": {
            "path": "public/templates/savepoint/pbr/polymer/base_height.png",
            "url": "base_height.png",
            "channel": "height",
            "source": "reference-pixel-extraction"
          },
          "normal": {
            "path": "public/templates/savepoint/pbr/polymer/base_normal.png",
            "url": "base_normal.png",
            "channel": "normal",
            "source": "reference-pixel-extraction"
          },
          "ao": {
            "path": "public/templates/savepoint/pbr/polymer/base_ao.png",
            "url": "base_ao.png",
            "channel": "ao",
            "source": "reference-pixel-extraction"
          }
        },
        "sourceImage": "public/templates/savepoint/verification/polymer.png",
        "method": "reference-pixel-extraction",
        "hardLimit": "single-image PBR extraction is an estimate; 70%+ extraction confidence still needs render screenshot review"
      }
    },
    {
      "id": "glass",
      "name": "Display glass",
      "type": "standard",
      "shaderModel": "MeshStandardMaterial / PBR approximation",
      "baseColor": "#0b0d12",
      "color": "#0b0d12",
      "albedo": {
        "dominant": "#303238",
        "secondary": [
          "#202228",
          "#41444b"
        ],
        "samplingNotes": "Neutral charcoal shell; highlights excluded from albedo"
      },
      "colorVariation": {
        "palette": [
          "#8A7A5F",
          "#6E614B",
          "#A08F70"
        ],
        "pattern": "mottled",
        "amplitude": 0.15,
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
          "frequency": 2.0,
          "amplitude": 0.42,
          "role": "broad color and height breakup"
        },
        {
          "id": "meso",
          "frequency": 12.0,
          "amplitude": 0.22,
          "role": "ridges, pores, grain, dents, or equivalent visible relief"
        },
        {
          "id": "micro",
          "frequency": 56.0,
          "amplitude": 0.08,
          "role": "highlight breakup visible under grazing light"
        }
      ],
      "roughness": {
        "base": 0.75,
        "variation": 0.15,
        "map": "independent-procedural-field",
        "localResponse": "higher roughness in cavities, lower roughness on worn edges"
      },
      "metalness": {
        "base": 0.0,
        "variation": 0.0
      },
      "normal": {
        "pattern": "derived-from-independent-height-field",
        "strength": 0.35,
        "scale": 24.0,
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
          "id": "cavity-darkening",
          "region": "slotInterior and ventRibs",
          "baseColor": "#090b10",
          "roughness": 0.88,
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "shaderNotes": [
        "Prefer MeshPhysicalMaterial when clearcoat, sheen, transmission, or thin-surface response is observed; otherwise use MeshStandardMaterial-compatible PBR channels.",
        "Generate albedo, roughness, height/normal, and AO independently; never alias albedo into roughness.",
        "Use normal/bump/displacement only when they map to observed surface relief.",
        "Use displacement geometry when the observed relief changes the close-up silhouette; texture-only relief is insufficient there."
      ],
      "notes": "Reference-derived inference; authored scalars and geometry implement the visible response. No manufacturing accuracy is claimed.",
      "referencePbr": {
        "usable": true,
        "confidence": 0.716,
        "maps": {
          "albedo": {
            "path": "public/templates/savepoint/pbr/glass/glass_albedo.png",
            "url": "glass_albedo.png",
            "channel": "albedo",
            "source": "reference-pixel-extraction"
          },
          "roughness": {
            "path": "public/templates/savepoint/pbr/glass/glass_roughness.png",
            "url": "glass_roughness.png",
            "channel": "roughness",
            "source": "reference-pixel-extraction"
          },
          "height": {
            "path": "public/templates/savepoint/pbr/glass/glass_height.png",
            "url": "glass_height.png",
            "channel": "height",
            "source": "reference-pixel-extraction"
          },
          "normal": {
            "path": "public/templates/savepoint/pbr/glass/glass_normal.png",
            "url": "glass_normal.png",
            "channel": "normal",
            "source": "reference-pixel-extraction"
          },
          "ao": {
            "path": "public/templates/savepoint/pbr/glass/glass_ao.png",
            "url": "glass_ao.png",
            "channel": "ao",
            "source": "reference-pixel-extraction"
          }
        },
        "sourceImage": "public/templates/savepoint/verification/glass.png",
        "method": "reference-pixel-extraction",
        "hardLimit": "single-image PBR extraction is an estimate; 70%+ extraction confidence still needs render screenshot review"
      }
    },
    {
      "id": "metal",
      "name": "Contact metal",
      "type": "standard",
      "shaderModel": "MeshStandardMaterial / PBR approximation",
      "baseColor": "#b49d66",
      "color": "#b49d66",
      "albedo": {
        "dominant": "#303238",
        "secondary": [
          "#202228",
          "#41444b"
        ],
        "samplingNotes": "Neutral charcoal shell; highlights excluded from albedo"
      },
      "colorVariation": {
        "palette": [
          "#8A7A5F",
          "#6E614B",
          "#A08F70"
        ],
        "pattern": "mottled",
        "amplitude": 0.15,
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
          "frequency": 2.0,
          "amplitude": 0.42,
          "role": "broad color and height breakup"
        },
        {
          "id": "meso",
          "frequency": 12.0,
          "amplitude": 0.22,
          "role": "ridges, pores, grain, dents, or equivalent visible relief"
        },
        {
          "id": "micro",
          "frequency": 56.0,
          "amplitude": 0.08,
          "role": "highlight breakup visible under grazing light"
        }
      ],
      "roughness": {
        "base": 0.75,
        "variation": 0.15,
        "map": "independent-procedural-field",
        "localResponse": "higher roughness in cavities, lower roughness on worn edges"
      },
      "metalness": {
        "base": 0.0,
        "variation": 0.0
      },
      "normal": {
        "pattern": "derived-from-independent-height-field",
        "strength": 0.35,
        "scale": 24.0,
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
          "id": "cavity-darkening",
          "region": "slotInterior and ventRibs",
          "baseColor": "#090b10",
          "roughness": 0.88,
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "shaderNotes": [
        "Prefer MeshPhysicalMaterial when clearcoat, sheen, transmission, or thin-surface response is observed; otherwise use MeshStandardMaterial-compatible PBR channels.",
        "Generate albedo, roughness, height/normal, and AO independently; never alias albedo into roughness.",
        "Use normal/bump/displacement only when they map to observed surface relief.",
        "Use displacement geometry when the observed relief changes the close-up silhouette; texture-only relief is insufficient there."
      ],
      "notes": "Reference-derived inference; authored scalars and geometry implement the visible response. No manufacturing accuracy is claimed.",
      "referencePbr": {
        "usable": true,
        "confidence": 0.843,
        "maps": {
          "albedo": {
            "path": "public/templates/savepoint/pbr/polymer/base_albedo.png",
            "url": "base_albedo.png",
            "channel": "albedo",
            "source": "reference-pixel-extraction"
          },
          "roughness": {
            "path": "public/templates/savepoint/pbr/polymer/base_roughness.png",
            "url": "base_roughness.png",
            "channel": "roughness",
            "source": "reference-pixel-extraction"
          },
          "height": {
            "path": "public/templates/savepoint/pbr/polymer/base_height.png",
            "url": "base_height.png",
            "channel": "height",
            "source": "reference-pixel-extraction"
          },
          "normal": {
            "path": "public/templates/savepoint/pbr/polymer/base_normal.png",
            "url": "base_normal.png",
            "channel": "normal",
            "source": "reference-pixel-extraction"
          },
          "ao": {
            "path": "public/templates/savepoint/pbr/polymer/base_ao.png",
            "url": "base_ao.png",
            "channel": "ao",
            "source": "reference-pixel-extraction"
          }
        },
        "sourceImage": "public/templates/savepoint/verification/polymer.png",
        "method": "reference-pixel-extraction",
        "hardLimit": "single-image PBR extraction is an estimate; 70%+ extraction confidence still needs render screenshot review"
      }
    },
    {
      "id": "label",
      "name": "Approved label and display carrier",
      "type": "standard",
      "shaderModel": "MeshBasicMaterial with sRGB CanvasTexture",
      "baseColor": "#24262c",
      "color": "#24262c",
      "albedo": {
        "dominant": "#303238",
        "secondary": [
          "#202228",
          "#41444b"
        ],
        "samplingNotes": "Neutral charcoal shell; highlights excluded from albedo"
      },
      "colorVariation": {
        "palette": [
          "#8A7A5F",
          "#6E614B",
          "#A08F70"
        ],
        "pattern": "mottled",
        "amplitude": 0.15,
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
          "frequency": 2.0,
          "amplitude": 0.42,
          "role": "broad color and height breakup"
        },
        {
          "id": "meso",
          "frequency": 12.0,
          "amplitude": 0.22,
          "role": "ridges, pores, grain, dents, or equivalent visible relief"
        },
        {
          "id": "micro",
          "frequency": 56.0,
          "amplitude": 0.08,
          "role": "highlight breakup visible under grazing light"
        }
      ],
      "roughness": {
        "base": 0.66,
        "variation": 0.06,
        "map": "independent 1024px deterministic roughness field"
      },
      "metalness": {
        "base": 0,
        "variation": 0
      },
      "normal": {
        "pattern": "derived-from-independent-height-field",
        "strength": 0.35,
        "scale": 24.0,
        "space": "tangent"
      },
      "bump": {
        "pattern": "independent molded grain height",
        "amplitude": 0.0008,
        "scale": 3
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
          "id": "cavity-darkening",
          "region": "slotInterior and ventRibs",
          "baseColor": "#090b10",
          "roughness": 0.88,
          "evidenceRefs": [
            "full-object"
          ]
        }
      ],
      "shaderNotes": [
        "Prefer MeshPhysicalMaterial when clearcoat, sheen, transmission, or thin-surface response is observed; otherwise use MeshStandardMaterial-compatible PBR channels.",
        "Generate albedo, roughness, height/normal, and AO independently; never alias albedo into roughness.",
        "Use normal/bump/displacement only when they map to observed surface relief.",
        "Use displacement geometry when the observed relief changes the close-up silhouette; texture-only relief is insufficient there."
      ],
      "notes": "Actual supplied label artwork and world plates are composed without stretching; UI title and catalog typography are rendered into the label band.",
      "referencePbr": {
        "usable": true,
        "confidence": 0.843,
        "maps": {
          "albedo": {
            "path": "public/templates/savepoint/pbr/polymer/base_albedo.png",
            "url": "base_albedo.png",
            "channel": "albedo",
            "source": "reference-pixel-extraction"
          },
          "roughness": {
            "path": "public/templates/savepoint/pbr/polymer/base_roughness.png",
            "url": "base_roughness.png",
            "channel": "roughness",
            "source": "reference-pixel-extraction"
          },
          "height": {
            "path": "public/templates/savepoint/pbr/polymer/base_height.png",
            "url": "base_height.png",
            "channel": "height",
            "source": "reference-pixel-extraction"
          },
          "normal": {
            "path": "public/templates/savepoint/pbr/polymer/base_normal.png",
            "url": "base_normal.png",
            "channel": "normal",
            "source": "reference-pixel-extraction"
          },
          "ao": {
            "path": "public/templates/savepoint/pbr/polymer/base_ao.png",
            "url": "base_ao.png",
            "channel": "ao",
            "source": "reference-pixel-extraction"
          }
        },
        "sourceImage": "public/templates/savepoint/verification/polymer.png",
        "method": "reference-pixel-extraction",
        "hardLimit": "single-image PBR extraction is an estimate; 70%+ extraction confidence still needs render screenshot review"
      },
      "qualityTier": "utility"
    }
  ],
  "repetitionSystems": [
    {
      "id": "repeated-hardware",
      "componentRef": "ventRibs",
      "count": 20,
      "distribution": "linear",
      "spacing": 0.035,
      "evidenceRefs": [
        "full-object"
      ]
    }
  ],
  "buildPasses": [
    {
      "id": "blockout",
      "goal": "Match macro silhouette and proportions.",
      "componentRefs": [
        "shell",
        "screenBezel",
        "screenGlass",
        "slotLip",
        "slotInterior",
        "ventRibs",
        "frontButtons",
        "powerIndicator",
        "baseSeam"
      ],
      "acceptance": [
        "Silhouette reads correctly without materials.",
        "Quality contract has named all required macro feature groups before code generation.",
        "AI vision comparison score meets selfCorrectLoop.visualAcceptance.threshold."
      ]
    },
    {
      "id": "structural-pass",
      "goal": "Build the component hierarchy implied by the pre-spec complexity assessment.",
      "componentRefs": [
        "shell",
        "screenBezel",
        "screenGlass",
        "slotLip",
        "slotInterior",
        "ventRibs",
        "frontButtons",
        "powerIndicator",
        "baseSeam"
      ],
      "acceptance": [
        "Macro, meso, and repeated structures meet qualityContract.minimumSpecDepth.",
        "Parent-child relations, joints, seams, sockets, and contact points are explicit.",
        "Every attached child appendage/connector has parentSocket, localStart/localEnd, contactType, embedDepth or overlap, and gapTolerance.",
        "AI vision comparison score meets selfCorrectLoop.visualAcceptance.threshold."
      ]
    },
    {
      "id": "form-refinement",
      "goal": "Refine shape, deformation, bevels, tapers, curves, asymmetry, and visible local geometry.",
      "componentRefs": [
        "shell",
        "screenBezel",
        "screenGlass",
        "slotLip",
        "slotInterior",
        "ventRibs",
        "frontButtons",
        "powerIndicator",
        "baseSeam"
      ],
      "acceptance": [
        "Important visible forms are represented in component geometryDescriptor, deformations, localFeatures, or repetitionSystems.",
        "Endpoint-based child parts are rooted at their attachment sockets and do not visibly float away from parents.",
        "AI vision comparison score meets selfCorrectLoop.visualAcceptance.threshold."
      ]
    },
    {
      "id": "material-pass",
      "goal": "Match material color, roughness, bump, and local variation.",
      "componentRefs": [
        "shell",
        "screenBezel",
        "screenGlass",
        "slotLip",
        "slotInterior",
        "ventRibs",
        "frontButtons",
        "powerIndicator",
        "baseSeam"
      ],
      "acceptance": [
        "Reference-derived albedo palette records dominant, secondary, and accent colors per visible material.",
        "Each important material defines roughness variation and at least one normal/bump/displacement response.",
        "Local material overrides, dirt/wear/stains/moss/chips/scratches or equivalent masks are tied to evidenceRefs.",
        "Thin, transparent, reflective, wet, or fibrous materials document alpha/transmission/clearcoat/metalness/fiber response when relevant.",
        "Generated preview uses procedural albedo/roughness/bump texture or vertex color variation instead of one flat color.",
        "Generated preview uses independent PBR maps at 1024px or higher for the quality-first tier.",
        "If source pixels are available, referencePbr extraction passed at confidence >= 0.7 or the pass is stopped/requesting better references.",
        "Macro, meso, and micro surface frequency bands are visible at the intended review distance without obvious tiling.",
        "AI vision comparison score meets selfCorrectLoop.visualAcceptance.threshold."
      ]
    },
    {
      "id": "surface-pass",
      "goal": "Add procedural surface locality such as normal/bump/displacement, AO, dirt, stains, chips, grain, moss, scratches, and wear.",
      "componentRefs": [
        "shell",
        "screenBezel",
        "screenGlass",
        "slotLip",
        "slotInterior",
        "ventRibs",
        "frontButtons",
        "powerIndicator",
        "baseSeam"
      ],
      "acceptance": [
        "Every required material feature group has local overrides or surfaceDetail tied to evidenceRefs.",
        "A grazing-angle close-up proves that normal/height detail breaks highlights naturally and does not read as smooth plastic.",
        "AI vision comparison score meets selfCorrectLoop.visualAcceptance.threshold."
      ]
    },
    {
      "id": "lighting-pass",
      "goal": "Make material and form readable under neutral turntable lighting plus optional reference lighting.",
      "componentRefs": [
        "shell",
        "screenBezel",
        "screenGlass",
        "slotLip",
        "slotInterior",
        "ventRibs",
        "frontButtons",
        "powerIndicator",
        "baseSeam"
      ],
      "acceptance": [
        "lightingFromPhoto identifies key light direction/color/intensity, fill light, rim or environment light, and ambient color.",
        "Exposure, tone mapping, background color/gradient, shadow softness, and contact shadow behavior are specified.",
        "Lighting does not hide geometry/material gaps and screenshots can be compared fairly to the reference.",
        "Neutral, grazing, and reference-matched lighting checks distinguish material errors from lighting errors.",
        "AI vision comparison score meets selfCorrectLoop.visualAcceptance.threshold."
      ]
    },
    {
      "id": "interaction-pass",
      "goal": "Make the model ready for future animation, transformation, physics, or destruction.",
      "componentRefs": [
        "shell",
        "screenBezel",
        "screenGlass",
        "slotLip",
        "slotInterior",
        "ventRibs",
        "frontButtons",
        "powerIndicator",
        "baseSeam"
      ],
      "acceptance": [
        "Macro and movable meso components have stable pivot nodes.",
        "Sockets, collider proxies, and destruction metadata are present for future runtime actions.",
        "AI vision comparison score meets selfCorrectLoop.visualAcceptance.threshold."
      ]
    },
    {
      "id": "optimization-pass",
      "goal": "Protect runtime performance after visual fidelity is accepted.",
      "componentRefs": [
        "shell",
        "screenBezel",
        "screenGlass",
        "slotLip",
        "slotInterior",
        "ventRibs",
        "frontButtons",
        "powerIndicator",
        "baseSeam"
      ],
      "acceptance": [
        "Triangle count, draw calls, instancing, LOD strategy, and FPS target are documented or verified.",
        "Repeated detail is instanced or simplified where possible without breaking silhouette/material believability."
      ]
    }
  ],
  "visualEvidence": [
    {
      "timestamp": "2026-11-04T09:04:10.245273+00:00",
      "passId": "blockout",
      "estimatedFidelity": 0.81,
      "aiVisionScore": 0.81,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.81,
        "componentStructure": 0.5,
        "formDetail": 0.4,
        "materialSurface": 0.5,
        "lightingCamera": 0.81
      },
      "featureReviews": [
        {
          "id": "silhouette",
          "score": 0.81,
          "visible": true,
          "notes": "Unlit map-stripped silhouette and physical thickness accepted for blockout only. The reference corner footprint and projecting connector read correctly. Recesses, slot cavity, molding and final materials belong to subsequent passes."
        }
      ],
      "referenceScreenshot": "public/templates/savepoint/deck-01-three-quarter.png",
      "renderScreenshot": "public/templates/savepoint/verification/deck/blockout/small-35.png",
      "comparisonImage": "public/templates/savepoint/verification/deck/blockout/comparison.png",
      "cameraView": "",
      "notes": "",
      "aiVisionNotes": ""
    },
    {
      "timestamp": "2026-11-04T09:10:35.393878+00:00",
      "passId": "structural-pass",
      "estimatedFidelity": 0.81,
      "aiVisionScore": 0.81,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.81,
        "componentStructure": 0.81,
        "formDetail": 0.81,
        "materialSurface": 0.81,
        "lightingCamera": 0.81
      },
      "featureReviews": [
        {
          "id": "slot-cavity",
          "score": 0.81,
          "visible": true,
          "notes": "Structure accepted: the console has an inclined screen, discrete shell panels and an open cavity with walls and floor; cartridge has a stepped shell, projecting tongue and inset front label. Molded microgeometry and dielectric finish remain for form and material passes."
        },
        {
          "id": "inclined-aperture",
          "score": 0.81,
          "visible": true,
          "notes": "Structure accepted: the console has an inclined screen, discrete shell panels and an open cavity with walls and floor; cartridge has a stepped shell, projecting tongue and inset front label. Molded microgeometry and dielectric finish remain for form and material passes."
        }
      ],
      "referenceScreenshot": "public/templates/savepoint/deck-01-three-quarter.png",
      "renderScreenshot": "public/templates/savepoint/verification/deck/structural-pass/small-35.png",
      "comparisonImage": "public/templates/savepoint/verification/deck/structural-pass/comparison.png",
      "cameraView": "",
      "notes": "",
      "aiVisionNotes": ""
    },
    {
      "timestamp": "2026-11-04T09:14:32.693595+00:00",
      "passId": "form-refinement",
      "estimatedFidelity": 0.82,
      "aiVisionScore": 0.82,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.82,
        "componentStructure": 0.82,
        "formDetail": 0.82,
        "materialSurface": 0.82,
        "lightingCamera": 0.82
      },
      "featureReviews": [
        {
          "id": "vent-and-controls",
          "score": 0.82,
          "visible": true,
          "notes": "Form pass accepted: repeated vent recesses and contacts, front controls, softened shell edges, stepped grip corners, inset molding and rear screw wells are present across the orbit. Physical screen is landscape; exact molded grain and reflected studio response remain approximate."
        }
      ],
      "referenceScreenshot": "public/templates/savepoint/deck-01-three-quarter.png",
      "renderScreenshot": "public/templates/savepoint/verification/deck/form-refinement/small-35.png",
      "comparisonImage": "public/templates/savepoint/verification/deck/form-refinement/comparison.png",
      "cameraView": "",
      "notes": "",
      "aiVisionNotes": ""
    },
    {
      "timestamp": "2026-11-04T09:19:24.122105+00:00",
      "passId": "material-pass",
      "estimatedFidelity": 0.8,
      "aiVisionScore": 0.8,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.8,
        "componentStructure": 0.8,
        "formDetail": 0.8,
        "materialSurface": 0.8,
        "lightingCamera": 0.8
      },
      "featureReviews": [
        {
          "id": "polymer-glass",
          "score": 0.8,
          "visible": true,
          "notes": "Dielectric charcoal shell, darker cavity, low-roughness glass and metal contacts are distinct. Supplied label pixels retain their sRGB color without environment washout. Studio reflection strength still differs from the reference and will be bounded in the lighting pass."
        }
      ],
      "referenceScreenshot": "public/templates/savepoint/deck-01-three-quarter.png",
      "renderScreenshot": "public/templates/savepoint/verification/deck/material-pass/small-35.png",
      "comparisonImage": "public/templates/savepoint/verification/deck/material-pass/comparison.png",
      "cameraView": "",
      "notes": "",
      "aiVisionNotes": ""
    },
    {
      "timestamp": "2026-11-04T09:22:47.547230+00:00",
      "passId": "surface-pass",
      "estimatedFidelity": 0.8,
      "aiVisionScore": 0.8,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.8,
        "componentStructure": 0.8,
        "formDetail": 0.8,
        "materialSurface": 0.8,
        "lightingCamera": 0.8
      },
      "featureReviews": [
        {
          "id": "surface-response",
          "score": 0.8,
          "visible": true,
          "notes": "Independent 1024px roughness and height fields provide restrained molded grain with deterministic seed 19341. Relief is subtle at archive distance and visible under grazing light. The procedural grain approximates the reference polymer; it does not claim exact microtexture recovery."
        }
      ],
      "referenceScreenshot": "public/templates/savepoint/deck-01-three-quarter.png",
      "renderScreenshot": "public/templates/savepoint/verification/deck/surface-pass/small-35.png",
      "comparisonImage": "public/templates/savepoint/verification/deck/surface-pass/comparison.png",
      "cameraView": "",
      "notes": "",
      "aiVisionNotes": ""
    },
    {
      "timestamp": "2026-11-04T09:25:18.056088+00:00",
      "passId": "lighting-pass",
      "estimatedFidelity": 0.81,
      "aiVisionScore": 0.81,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.81,
        "componentStructure": 0.81,
        "formDetail": 0.81,
        "materialSurface": 0.81,
        "lightingCamera": 0.81
      },
      "featureReviews": [
        {
          "id": "form-lighting",
          "score": 0.81,
          "visible": true,
          "notes": "Reduced key, hemisphere and exposure preserve charcoal value and distinct glass response under a neutral studio environment. Four orbit views retain volume. Reference lighting is approximated; archive contact shadows use a bounded shadow map and only shell casters."
        }
      ],
      "referenceScreenshot": "public/templates/savepoint/deck-01-three-quarter.png",
      "renderScreenshot": "public/templates/savepoint/verification/deck/lighting-pass/small-35.png",
      "comparisonImage": "public/templates/savepoint/verification/deck/lighting-pass/comparison.png",
      "cameraView": "",
      "notes": "",
      "aiVisionNotes": ""
    },
    {
      "timestamp": "2026-11-04T09:36:58.624218+00:00",
      "passId": "interaction-pass",
      "estimatedFidelity": 0.82,
      "aiVisionScore": 0.82,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.82,
        "componentStructure": 0.82,
        "formDetail": 0.82,
        "materialSurface": 0.82,
        "lightingCamera": 0.82
      },
      "featureReviews": [
        {
          "id": "slot-calibration",
          "score": 0.82,
          "visible": true,
          "notes": "Runtime calibration sampled 22 insertion frames with zero lateral axis error and zero dock-position error. A downward ray through the actual aperture first hits internal slot-contact-14, below the lip. Separate closed rear-frame segments pass self-intersection; part coverage and action-ready pivots are retained."
        }
      ],
      "referenceScreenshot": "public/templates/savepoint/deck-01-three-quarter.png",
      "renderScreenshot": "public/templates/savepoint/verification/deck/interaction-pass/small-35.png",
      "comparisonImage": "public/templates/savepoint/verification/deck/interaction-pass/comparison.png",
      "cameraView": "",
      "notes": "",
      "aiVisionNotes": ""
    },
    {
      "timestamp": "2026-11-04T09:51:42.555335+00:00",
      "passId": "optimization-pass",
      "estimatedFidelity": 0.82,
      "aiVisionScore": 0.82,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.82,
        "componentStructure": 0.82,
        "formDetail": 0.82,
        "materialSurface": 0.82,
        "lightingCamera": 0.82
      },
      "featureReviews": [],
      "referenceScreenshot": "public/templates/savepoint/deck-01-three-quarter.png",
      "renderScreenshot": "public/templates/savepoint/verification/deck/optimization-pass/small-35.png",
      "comparisonImage": "public/templates/savepoint/verification/deck/optimization-pass/comparison.png",
      "cameraView": "",
      "notes": "",
      "aiVisionNotes": ""
    }
  ],
  "reviewHistory": [
    {
      "timestamp": "2026-11-04T08:57:46.273671+00:00",
      "passId": "blockout",
      "estimatedFidelity": 0.65,
      "aiVisionScore": null,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {},
      "featureReviews": [],
      "action": "refine-spec",
      "summary": "Reference side-wall thickness was missing from the landmark fit. Raise the rear wedge from .67 to 1.10 and fit the lower rear corner as well as top corners.",
      "matched": [],
      "mismatches": [],
      "specFixes": [],
      "codeFixes": [],
      "evidence": []
    },
    {
      "timestamp": "2026-11-04T09:04:10.245273+00:00",
      "passId": "blockout",
      "estimatedFidelity": 0.81,
      "aiVisionScore": 0.81,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.81,
        "componentStructure": 0.5,
        "formDetail": 0.4,
        "materialSurface": 0.5,
        "lightingCamera": 0.81
      },
      "featureReviews": [
        {
          "id": "silhouette",
          "score": 0.81,
          "visible": true,
          "notes": "Unlit map-stripped silhouette and physical thickness accepted for blockout only. The reference corner footprint and projecting connector read correctly. Recesses, slot cavity, molding and final materials belong to subsequent passes."
        }
      ],
      "action": "continue",
      "summary": "Unlit map-stripped silhouette and physical thickness accepted for blockout only. The reference corner footprint and projecting connector read correctly. Recesses, slot cavity, molding and final materials belong to subsequent passes.",
      "matched": [],
      "mismatches": [],
      "specFixes": [],
      "codeFixes": [],
      "evidence": [],
      "mapStrippedRender": "public/templates/savepoint/verification/deck/blockout/small-35.png",
      "visualEvidence": {
        "referenceScreenshot": "public/templates/savepoint/deck-01-three-quarter.png",
        "renderScreenshot": "public/templates/savepoint/verification/deck/blockout/small-35.png",
        "comparisonImage": "public/templates/savepoint/verification/deck/blockout/comparison.png",
        "cameraView": "",
        "notes": "",
        "aiVisionNotes": ""
      }
    },
    {
      "timestamp": "2026-11-04T09:10:35.393878+00:00",
      "passId": "structural-pass",
      "estimatedFidelity": 0.81,
      "aiVisionScore": 0.81,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.81,
        "componentStructure": 0.81,
        "formDetail": 0.81,
        "materialSurface": 0.81,
        "lightingCamera": 0.81
      },
      "featureReviews": [
        {
          "id": "slot-cavity",
          "score": 0.81,
          "visible": true,
          "notes": "Structure accepted: the console has an inclined screen, discrete shell panels and an open cavity with walls and floor; cartridge has a stepped shell, projecting tongue and inset front label. Molded microgeometry and dielectric finish remain for form and material passes."
        },
        {
          "id": "inclined-aperture",
          "score": 0.81,
          "visible": true,
          "notes": "Structure accepted: the console has an inclined screen, discrete shell panels and an open cavity with walls and floor; cartridge has a stepped shell, projecting tongue and inset front label. Molded microgeometry and dielectric finish remain for form and material passes."
        }
      ],
      "action": "continue",
      "summary": "Structure accepted: the console has an inclined screen, discrete shell panels and an open cavity with walls and floor; cartridge has a stepped shell, projecting tongue and inset front label. Molded microgeometry and dielectric finish remain for form and material passes.",
      "matched": [],
      "mismatches": [],
      "specFixes": [],
      "codeFixes": [],
      "evidence": [],
      "visualEvidence": {
        "referenceScreenshot": "public/templates/savepoint/deck-01-three-quarter.png",
        "renderScreenshot": "public/templates/savepoint/verification/deck/structural-pass/small-35.png",
        "comparisonImage": "public/templates/savepoint/verification/deck/structural-pass/comparison.png",
        "cameraView": "",
        "notes": "",
        "aiVisionNotes": ""
      }
    },
    {
      "timestamp": "2026-11-04T09:14:32.693595+00:00",
      "passId": "form-refinement",
      "estimatedFidelity": 0.82,
      "aiVisionScore": 0.82,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.82,
        "componentStructure": 0.82,
        "formDetail": 0.82,
        "materialSurface": 0.82,
        "lightingCamera": 0.82
      },
      "featureReviews": [
        {
          "id": "vent-and-controls",
          "score": 0.82,
          "visible": true,
          "notes": "Form pass accepted: repeated vent recesses and contacts, front controls, softened shell edges, stepped grip corners, inset molding and rear screw wells are present across the orbit. Physical screen is landscape; exact molded grain and reflected studio response remain approximate."
        }
      ],
      "action": "continue",
      "summary": "Form pass accepted: repeated vent recesses and contacts, front controls, softened shell edges, stepped grip corners, inset molding and rear screw wells are present across the orbit. Physical screen is landscape; exact molded grain and reflected studio response remain approximate.",
      "matched": [],
      "mismatches": [],
      "specFixes": [],
      "codeFixes": [],
      "evidence": [],
      "visualEvidence": {
        "referenceScreenshot": "public/templates/savepoint/deck-01-three-quarter.png",
        "renderScreenshot": "public/templates/savepoint/verification/deck/form-refinement/small-35.png",
        "comparisonImage": "public/templates/savepoint/verification/deck/form-refinement/comparison.png",
        "cameraView": "",
        "notes": "",
        "aiVisionNotes": ""
      }
    },
    {
      "timestamp": "2026-11-04T09:19:24.122105+00:00",
      "passId": "material-pass",
      "estimatedFidelity": 0.8,
      "aiVisionScore": 0.8,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.8,
        "componentStructure": 0.8,
        "formDetail": 0.8,
        "materialSurface": 0.8,
        "lightingCamera": 0.8
      },
      "featureReviews": [
        {
          "id": "polymer-glass",
          "score": 0.8,
          "visible": true,
          "notes": "Dielectric charcoal shell, darker cavity, low-roughness glass and metal contacts are distinct. Supplied label pixels retain their sRGB color without environment washout. Studio reflection strength still differs from the reference and will be bounded in the lighting pass."
        }
      ],
      "action": "continue",
      "summary": "Dielectric charcoal shell, darker cavity, low-roughness glass and metal contacts are distinct. Supplied label pixels retain their sRGB color without environment washout. Studio reflection strength still differs from the reference and will be bounded in the lighting pass.",
      "matched": [],
      "mismatches": [],
      "specFixes": [],
      "codeFixes": [],
      "evidence": [],
      "visualEvidence": {
        "referenceScreenshot": "public/templates/savepoint/deck-01-three-quarter.png",
        "renderScreenshot": "public/templates/savepoint/verification/deck/material-pass/small-35.png",
        "comparisonImage": "public/templates/savepoint/verification/deck/material-pass/comparison.png",
        "cameraView": "",
        "notes": "",
        "aiVisionNotes": ""
      }
    },
    {
      "timestamp": "2026-11-04T09:22:47.547230+00:00",
      "passId": "surface-pass",
      "estimatedFidelity": 0.8,
      "aiVisionScore": 0.8,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.8,
        "componentStructure": 0.8,
        "formDetail": 0.8,
        "materialSurface": 0.8,
        "lightingCamera": 0.8
      },
      "featureReviews": [
        {
          "id": "surface-response",
          "score": 0.8,
          "visible": true,
          "notes": "Independent 1024px roughness and height fields provide restrained molded grain with deterministic seed 19341. Relief is subtle at archive distance and visible under grazing light. The procedural grain approximates the reference polymer; it does not claim exact microtexture recovery."
        }
      ],
      "action": "continue",
      "summary": "Independent 1024px roughness and height fields provide restrained molded grain with deterministic seed 19341. Relief is subtle at archive distance and visible under grazing light. The procedural grain approximates the reference polymer; it does not claim exact microtexture recovery.",
      "matched": [],
      "mismatches": [],
      "specFixes": [],
      "codeFixes": [],
      "evidence": [],
      "visualEvidence": {
        "referenceScreenshot": "public/templates/savepoint/deck-01-three-quarter.png",
        "renderScreenshot": "public/templates/savepoint/verification/deck/surface-pass/small-35.png",
        "comparisonImage": "public/templates/savepoint/verification/deck/surface-pass/comparison.png",
        "cameraView": "",
        "notes": "",
        "aiVisionNotes": ""
      }
    },
    {
      "timestamp": "2026-11-04T09:25:18.056088+00:00",
      "passId": "lighting-pass",
      "estimatedFidelity": 0.81,
      "aiVisionScore": 0.81,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.81,
        "componentStructure": 0.81,
        "formDetail": 0.81,
        "materialSurface": 0.81,
        "lightingCamera": 0.81
      },
      "featureReviews": [
        {
          "id": "form-lighting",
          "score": 0.81,
          "visible": true,
          "notes": "Reduced key, hemisphere and exposure preserve charcoal value and distinct glass response under a neutral studio environment. Four orbit views retain volume. Reference lighting is approximated; archive contact shadows use a bounded shadow map and only shell casters."
        }
      ],
      "action": "continue",
      "summary": "Reduced key, hemisphere and exposure preserve charcoal value and distinct glass response under a neutral studio environment. Four orbit views retain volume. Reference lighting is approximated; archive contact shadows use a bounded shadow map and only shell casters.",
      "matched": [],
      "mismatches": [],
      "specFixes": [],
      "codeFixes": [],
      "evidence": [],
      "visualEvidence": {
        "referenceScreenshot": "public/templates/savepoint/deck-01-three-quarter.png",
        "renderScreenshot": "public/templates/savepoint/verification/deck/lighting-pass/small-35.png",
        "comparisonImage": "public/templates/savepoint/verification/deck/lighting-pass/comparison.png",
        "cameraView": "",
        "notes": "",
        "aiVisionNotes": ""
      }
    },
    {
      "timestamp": "2026-11-04T09:32:57.391505+00:00",
      "passId": "interaction-pass",
      "estimatedFidelity": 0.78,
      "aiVisionScore": null,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {},
      "featureReviews": [],
      "action": "refine-code",
      "summary": "The 3D self-intersection check identified six invalid normals/vertices at the concave bevel corners of the extruded rear-deck aperture. Replace the single holed extrusion with four overlapping closed frame segments, preserving the exact receiving clearances.",
      "matched": [],
      "mismatches": [],
      "specFixes": [],
      "codeFixes": [],
      "evidence": []
    },
    {
      "timestamp": "2026-11-04T09:36:58.624218+00:00",
      "passId": "interaction-pass",
      "estimatedFidelity": 0.82,
      "aiVisionScore": 0.82,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.82,
        "componentStructure": 0.82,
        "formDetail": 0.82,
        "materialSurface": 0.82,
        "lightingCamera": 0.82
      },
      "featureReviews": [
        {
          "id": "slot-calibration",
          "score": 0.82,
          "visible": true,
          "notes": "Runtime calibration sampled 22 insertion frames with zero lateral axis error and zero dock-position error. A downward ray through the actual aperture first hits internal slot-contact-14, below the lip. Separate closed rear-frame segments pass self-intersection; part coverage and action-ready pivots are retained."
        }
      ],
      "action": "continue",
      "summary": "Runtime calibration sampled 22 insertion frames with zero lateral axis error and zero dock-position error. A downward ray through the actual aperture first hits internal slot-contact-14, below the lip. Separate closed rear-frame segments pass self-intersection; part coverage and action-ready pivots are retained.",
      "matched": [],
      "mismatches": [],
      "specFixes": [],
      "codeFixes": [],
      "evidence": [],
      "visualEvidence": {
        "referenceScreenshot": "public/templates/savepoint/deck-01-three-quarter.png",
        "renderScreenshot": "public/templates/savepoint/verification/deck/interaction-pass/small-35.png",
        "comparisonImage": "public/templates/savepoint/verification/deck/interaction-pass/comparison.png",
        "cameraView": "",
        "notes": "",
        "aiVisionNotes": ""
      }
    },
    {
      "timestamp": "2026-11-04T09:50:02.690336+00:00",
      "passId": "optimization-pass",
      "estimatedFidelity": 0.81,
      "aiVisionScore": null,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {},
      "featureReviews": [],
      "action": "refine-code",
      "summary": "Full part coverage found sign-only node names collapse under its punctuation-insensitive normalization. Give left/right and front/rear frame members semantic names, preserving all geometry and transforms.",
      "matched": [],
      "mismatches": [],
      "specFixes": [],
      "codeFixes": [],
      "evidence": []
    },
    {
      "timestamp": "2026-11-04T09:51:42.555335+00:00",
      "passId": "optimization-pass",
      "estimatedFidelity": 0.82,
      "aiVisionScore": 0.82,
      "visualAcceptanceThreshold": 0.7,
      "layerScores": {
        "silhouetteProportion": 0.82,
        "componentStructure": 0.82,
        "formDetail": 0.82,
        "materialSurface": 0.82,
        "lightingCamera": 0.82
      },
      "featureReviews": [],
      "action": "continue",
      "summary": "Shared shell geometries and base materials, per-game label/spine materials, instanced contacts/fasteners and isolated clipping clones preserve the accepted appearance. Both models pass complete part coverage, self-intersection and reversible assembly/picking checks. Geometry and procedural surfaces remain approximate reconstructions of the approved renders.",
      "matched": [],
      "mismatches": [],
      "specFixes": [],
      "codeFixes": [],
      "evidence": [],
      "visualEvidence": {
        "referenceScreenshot": "public/templates/savepoint/deck-01-three-quarter.png",
        "renderScreenshot": "public/templates/savepoint/verification/deck/optimization-pass/small-35.png",
        "comparisonImage": "public/templates/savepoint/verification/deck/optimization-pass/comparison.png",
        "cameraView": "",
        "notes": "",
        "aiVisionNotes": ""
      }
    }
  ],
  "lodPlan": [
    {
      "tier": "near",
      "distance": 0,
      "strategy": "full component tree and material layers"
    },
    {
      "tier": "far",
      "distance": 30,
      "strategy": "merge static components and reduce local feature geometry"
    }
  ],
  "performanceBudget": {
    "qualityPriority": "reference-fidelity",
    "targetTriangles": 80000,
    "maxDrawCalls": 100,
    "textureSize": 1024,
    "fpsTarget": 60,
    "optimizationPolicy": "Reach accepted visual fidelity first, then optimize without removing reference-critical geometry or surface layers."
  },
  "lightingFromPhoto": [
    "large upper-left key light",
    "soft fill light",
    "rear rim light",
    "ACES tone mapping exposure 1.2",
    "neutral background and contact shadow"
  ],
  "proceduralStrategy": [
    "Block out macro silhouette first.",
    "Add component hierarchy and joints.",
    "Create stable pivot groups, sockets, collider proxies, and destruction metadata before visual polish.",
    "Refine forms with bevels, tapers, bends, and procedural noise.",
    "Run reference PBR extraction for important source-image materials and stop when confidence is below the target threshold.",
    "Add material variation before adding expensive micro-geometry."
  ],
  "animationAnchors": [
    "root pivot node supports whole-object translation, rotation, scale, and visibility changes",
    "component pivot groups support later local transforms without rebuilding geometry"
  ],
  "destructionAnchors": [
    "actionProfile.destruction.fractureGroup marks detachable or breakable component sets",
    "component seams and sockets define plausible break points instead of random explosions"
  ],
  "risks": [],
  "localSpecSearch": {
    "collection": "core_3d",
    "query": "deck beveled hard surface plastic shell glass roughness",
    "index": {
      "status": "hit",
      "reason": "current",
      "fingerprint": "06f0b2ece2935e441653f5c3533f91b3a4d6163f2aec4267559d7d8419bdd040"
    },
    "matches": [
      {
        "record_id": "core.pbr-opacity-alpha",
        "file_path": "docs/raw/img2threejs-skill-dataset.json",
        "heading": null,
        "key_path": "categories.material_pbr[8]",
        "score": 6.173944048162,
        "snippets": [
          "... l\u00e0m k\u00eanh d\u1eef li\u1ec7u, kh\u00f4ng ph\u1ea3i \u0111\u1ed9 trong su\u1ed1t. Recognition cues: Standard opacity: soft edge fade or full transparency in glass/plastic parts; CS2-specific: alpha channel of the base color texture instead encodes a Wearness Mask, not visual ..."
        ],
        "source_refs": [
          {
            "path": "docs/raw/img2threejs-skill-dataset.json",
            "heading": null,
            "key_path": "categories.material_pbr[8]"
          }
        ],
        "evidence_refs": [
          {
            "kind": "source",
            "ref": "docs/raw/img2threejs-skill-dataset.json",
            "note": "img2threejs NotebookLM research distillation"
          }
        ]
      },
      {
        "record_id": "core.pbr-roughness",
        "file_path": "grimoire/glossary/3d_vocabulary.md",
        "heading": "Material And PBR",
        "key_path": null,
        "score": 4.20187819032,
        "snippets": [
          "Roughness is microfacet scatter: high roughness reads matte and low roughness reads glossy. Recognition cues: low roughness reads as a sharp, mirror-like, tight specular highlight; high roughness reads as a blurry, wide, dim highlight and matte ..."
        ],
        "source_refs": [
          {
            "path": "grimoire/glossary/3d_vocabulary.md",
            "heading": "Material And PBR",
            "key_path": null
          },
          {
            "path": "grimoire/intake/image_analysis.md",
            "heading": "Layer 5 \u2014 Materials & surface (PBR)",
            "key_path": null
          },
          {
            "path": "docs/raw/img2threejs-skill-dataset.json",
            "heading": null,
            "key_path": "categories.material_pbr[1]"
          }
        ],
        "evidence_refs": [
          {
            "kind": "source",
            "ref": "grimoire/glossary/3d_vocabulary.md"
          },
          {
            "kind": "notebooklm-research",
            "ref": "notebooklm:4b03c2f9-8393-411f-b5b4-039ab9532843",
            "note": "Validated generic schema vocabulary; numeric claims remain backed by local source_refs."
          },
          {
            "kind": "source",
            "ref": "docs/raw/img2threejs-skill-dataset.json",
            "note": "img2threejs NotebookLM research distillation \u2014 merged recognition cues + Three.js target instead of duplicating this entity."
          }
        ]
      },
      {
        "record_id": "core.description-honest-uncertainty-single-image-limits-convention",
        "file_path": "docs/raw/img2threejs-skill-dataset.json",
        "heading": null,
        "key_path": "categories.description_conventions[6]",
        "score": 3.986222861816,
        "snippets": [
          "... \u0111\u1ecbnh' thay v\u00ec b\u1ecba ra chi ti\u1ebft tr\u00f4ng h\u1ee3p l\u00fd nh\u01b0ng kh\u00f4ng th\u1ea5y trong \u1ea3nh tham chi\u1ebfu. Recognition cues: Any attribute for a surface not visible in the reference image should be flagged explicitly rather than filled with a guessed value; This is ..."
        ],
        "source_refs": [
          {
            "path": "docs/raw/img2threejs-skill-dataset.json",
            "heading": null,
            "key_path": "categories.description_conventions[6]"
          }
        ],
        "evidence_refs": [
          {
            "kind": "source",
            "ref": "docs/raw/img2threejs-skill-dataset.json",
            "note": "img2threejs NotebookLM research distillation"
          }
        ]
      }
    ]
  },
  "revision": {
    "number": 2,
    "authorization": "User approved revised specs and a new correction budget on 2026-11-04.",
    "previousEvidence": "Revision 01 retained in local .img2threejs history; revision 02 was authorized by the user."
  },
  "sculptPipeline": {
    "passGateMode": "locked-sequential",
    "passOrder": [
      "blockout",
      "structural-pass",
      "form-refinement",
      "material-pass",
      "surface-pass",
      "lighting-pass",
      "interaction-pass",
      "optimization-pass"
    ],
    "currentPass": "complete",
    "completedPasses": [
      "blockout",
      "structural-pass",
      "form-refinement",
      "material-pass",
      "surface-pass",
      "lighting-pass",
      "interaction-pass",
      "optimization-pass"
    ],
    "lastCompletedPass": "optimization-pass",
    "blockedReason": "all build passes completed",
    "nextRequiredEvidence": []
  },
  "tier1Results": [
    {
      "passed": false,
      "checks": {
        "silhouetteIoU": 0.8098,
        "aspectRatioDelta": 0.0602,
        "scaleDelta": 0.0114,
        "bilateralSymmetryError": 0.2156,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 2.26,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 2.26
            },
            {
              "componentId": null,
              "deltaE": 2.26
            },
            {
              "componentId": null,
              "deltaE": 2.26
            },
            {
              "componentId": null,
              "deltaE": 2.26
            },
            {
              "componentId": null,
              "deltaE": 2.26
            },
            {
              "componentId": null,
              "deltaE": 2.26
            },
            {
              "componentId": null,
              "deltaE": 2.26
            },
            {
              "componentId": null,
              "deltaE": 2.26
            },
            {
              "componentId": null,
              "deltaE": 2.26
            }
          ],
          "gated": false
        }
      },
      "failures": [
        "silhouette IoU 0.810 is below threshold 0.85",
        "aspect-ratio delta 0.060 exceeds threshold 0.05"
      ],
      "maskWarnings": [],
      "renderHash": "d1b5411c36ad1dde",
      "passId": "blockout",
      "mapStrippedRender": "public/templates/savepoint/verification/deck/blockout/small-35.png"
    },
    {
      "passed": false,
      "checks": {
        "silhouetteIoU": 0.4863,
        "aspectRatioDelta": 0.0052,
        "scaleDelta": 0.3264,
        "bilateralSymmetryError": 0.0022,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 11.6,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 11.6
            },
            {
              "componentId": null,
              "deltaE": 11.6
            },
            {
              "componentId": null,
              "deltaE": 11.6
            },
            {
              "componentId": null,
              "deltaE": 11.6
            },
            {
              "componentId": null,
              "deltaE": 11.6
            },
            {
              "componentId": null,
              "deltaE": 11.6
            },
            {
              "componentId": null,
              "deltaE": 11.6
            },
            {
              "componentId": null,
              "deltaE": 11.6
            },
            {
              "componentId": null,
              "deltaE": 11.6
            }
          ],
          "gated": false
        }
      },
      "failures": [
        "silhouette IoU 0.486 is below threshold 0.85",
        "scale delta 0.326 exceeds threshold 0.08"
      ],
      "maskWarnings": [
        "render: image is not clearly isolated from background; using most pixels as material evidence"
      ],
      "renderHash": "e09832af18bbb545",
      "passId": "blockout",
      "mapStrippedRender": "public/templates/savepoint/verification/deck/blockout/small-35.png"
    },
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.8667,
        "aspectRatioDelta": 0.0001,
        "scaleDelta": 0.0207,
        "bilateralSymmetryError": 0.1717,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 3.22,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 3.22
            },
            {
              "componentId": null,
              "deltaE": 3.22
            },
            {
              "componentId": null,
              "deltaE": 3.22
            },
            {
              "componentId": null,
              "deltaE": 3.22
            },
            {
              "componentId": null,
              "deltaE": 3.22
            },
            {
              "componentId": null,
              "deltaE": 3.22
            },
            {
              "componentId": null,
              "deltaE": 3.22
            },
            {
              "componentId": null,
              "deltaE": 3.22
            },
            {
              "componentId": null,
              "deltaE": 3.22
            }
          ],
          "gated": false
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "455ed199d75bc179",
      "passId": "blockout",
      "mapStrippedRender": "public/templates/savepoint/verification/deck/blockout/small-35.png"
    },
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.8667,
        "aspectRatioDelta": 0.0001,
        "scaleDelta": 0.0207,
        "bilateralSymmetryError": 0.1717,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 17.85,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 17.85
            },
            {
              "componentId": null,
              "deltaE": 17.85
            },
            {
              "componentId": null,
              "deltaE": 17.85
            },
            {
              "componentId": null,
              "deltaE": 17.85
            },
            {
              "componentId": null,
              "deltaE": 17.85
            },
            {
              "componentId": null,
              "deltaE": 17.85
            },
            {
              "componentId": null,
              "deltaE": 17.85
            },
            {
              "componentId": null,
              "deltaE": 17.85
            },
            {
              "componentId": null,
              "deltaE": 17.85
            }
          ],
          "gated": false
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "8d54e5c2cd037ec9",
      "passId": "blockout",
      "mapStrippedRender": "public/templates/savepoint/verification/deck/blockout/small-35.png"
    },
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.8656,
        "aspectRatioDelta": 0.0052,
        "scaleDelta": 0.0155,
        "bilateralSymmetryError": 0.1399,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 2.08,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 2.08
            },
            {
              "componentId": null,
              "deltaE": 2.08
            },
            {
              "componentId": null,
              "deltaE": 2.08
            },
            {
              "componentId": null,
              "deltaE": 2.08
            },
            {
              "componentId": null,
              "deltaE": 2.08
            },
            {
              "componentId": null,
              "deltaE": 2.08
            },
            {
              "componentId": null,
              "deltaE": 2.08
            },
            {
              "componentId": null,
              "deltaE": 2.08
            },
            {
              "componentId": null,
              "deltaE": 2.08
            }
          ],
          "gated": false
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "eb0ec40f5875d24d",
      "passId": "structural-pass"
    },
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.8656,
        "aspectRatioDelta": 0.0052,
        "scaleDelta": 0.0155,
        "bilateralSymmetryError": 0.1399,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 2.08,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 2.08
            },
            {
              "componentId": null,
              "deltaE": 2.08
            },
            {
              "componentId": null,
              "deltaE": 2.08
            },
            {
              "componentId": null,
              "deltaE": 2.08
            },
            {
              "componentId": null,
              "deltaE": 2.08
            },
            {
              "componentId": null,
              "deltaE": 2.08
            },
            {
              "componentId": null,
              "deltaE": 2.08
            },
            {
              "componentId": null,
              "deltaE": 2.08
            },
            {
              "componentId": null,
              "deltaE": 2.08
            }
          ],
          "gated": false
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "eb0ec40f5875d24d",
      "passId": "structural-pass"
    },
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.8656,
        "aspectRatioDelta": 0.0052,
        "scaleDelta": 0.0155,
        "bilateralSymmetryError": 0.1399,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 2.08,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 2.08
            },
            {
              "componentId": null,
              "deltaE": 2.08
            },
            {
              "componentId": null,
              "deltaE": 2.08
            },
            {
              "componentId": null,
              "deltaE": 2.08
            },
            {
              "componentId": null,
              "deltaE": 2.08
            },
            {
              "componentId": null,
              "deltaE": 2.08
            },
            {
              "componentId": null,
              "deltaE": 2.08
            },
            {
              "componentId": null,
              "deltaE": 2.08
            },
            {
              "componentId": null,
              "deltaE": 2.08
            }
          ],
          "gated": false
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "eb0ec40f5875d24d",
      "passId": "structural-pass"
    },
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.8691,
        "aspectRatioDelta": 0.0052,
        "scaleDelta": 0.0259,
        "bilateralSymmetryError": 0.1391,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 3.66,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 3.66
            },
            {
              "componentId": null,
              "deltaE": 3.66
            },
            {
              "componentId": null,
              "deltaE": 3.66
            },
            {
              "componentId": null,
              "deltaE": 3.66
            },
            {
              "componentId": null,
              "deltaE": 3.66
            },
            {
              "componentId": null,
              "deltaE": 3.66
            },
            {
              "componentId": null,
              "deltaE": 3.66
            },
            {
              "componentId": null,
              "deltaE": 3.66
            },
            {
              "componentId": null,
              "deltaE": 3.66
            }
          ],
          "gated": false
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "293128162135413f",
      "passId": "form-refinement"
    },
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.8691,
        "aspectRatioDelta": 0.0052,
        "scaleDelta": 0.0259,
        "bilateralSymmetryError": 0.1392,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 3.38,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 3.38
            },
            {
              "componentId": null,
              "deltaE": 3.38
            },
            {
              "componentId": null,
              "deltaE": 3.38
            },
            {
              "componentId": null,
              "deltaE": 3.38
            },
            {
              "componentId": null,
              "deltaE": 3.38
            },
            {
              "componentId": null,
              "deltaE": 3.38
            },
            {
              "componentId": null,
              "deltaE": 3.38
            },
            {
              "componentId": null,
              "deltaE": 3.38
            },
            {
              "componentId": null,
              "deltaE": 3.38
            }
          ],
          "gated": true
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "0a62a1c5c9950cd4",
      "passId": "material-pass"
    },
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.8691,
        "aspectRatioDelta": 0.0052,
        "scaleDelta": 0.0259,
        "bilateralSymmetryError": 0.1392,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 3.38,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 3.38
            },
            {
              "componentId": null,
              "deltaE": 3.38
            },
            {
              "componentId": null,
              "deltaE": 3.38
            },
            {
              "componentId": null,
              "deltaE": 3.38
            },
            {
              "componentId": null,
              "deltaE": 3.38
            },
            {
              "componentId": null,
              "deltaE": 3.38
            },
            {
              "componentId": null,
              "deltaE": 3.38
            },
            {
              "componentId": null,
              "deltaE": 3.38
            },
            {
              "componentId": null,
              "deltaE": 3.38
            }
          ],
          "gated": true
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "0a62a1c5c9950cd4",
      "passId": "material-pass"
    },
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.869,
        "aspectRatioDelta": 0.0052,
        "scaleDelta": 0.0259,
        "bilateralSymmetryError": 0.1392,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 3.39,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 3.39
            },
            {
              "componentId": null,
              "deltaE": 3.39
            },
            {
              "componentId": null,
              "deltaE": 3.39
            },
            {
              "componentId": null,
              "deltaE": 3.39
            },
            {
              "componentId": null,
              "deltaE": 3.39
            },
            {
              "componentId": null,
              "deltaE": 3.39
            },
            {
              "componentId": null,
              "deltaE": 3.39
            },
            {
              "componentId": null,
              "deltaE": 3.39
            },
            {
              "componentId": null,
              "deltaE": 3.39
            }
          ],
          "gated": true
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "dea396137575326a",
      "passId": "surface-pass"
    },
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.8691,
        "aspectRatioDelta": 0.0052,
        "scaleDelta": 0.0259,
        "bilateralSymmetryError": 0.1392,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 2.93,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 2.93
            },
            {
              "componentId": null,
              "deltaE": 2.93
            },
            {
              "componentId": null,
              "deltaE": 2.93
            },
            {
              "componentId": null,
              "deltaE": 2.93
            },
            {
              "componentId": null,
              "deltaE": 2.93
            },
            {
              "componentId": null,
              "deltaE": 2.93
            },
            {
              "componentId": null,
              "deltaE": 2.93
            },
            {
              "componentId": null,
              "deltaE": 2.93
            },
            {
              "componentId": null,
              "deltaE": 2.93
            }
          ],
          "gated": true
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "478e7d36c78fdc4d",
      "passId": "lighting-pass"
    },
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.8691,
        "aspectRatioDelta": 0.0052,
        "scaleDelta": 0.0259,
        "bilateralSymmetryError": 0.1392,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 2.93,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 2.93
            },
            {
              "componentId": null,
              "deltaE": 2.93
            },
            {
              "componentId": null,
              "deltaE": 2.93
            },
            {
              "componentId": null,
              "deltaE": 2.93
            },
            {
              "componentId": null,
              "deltaE": 2.93
            },
            {
              "componentId": null,
              "deltaE": 2.93
            },
            {
              "componentId": null,
              "deltaE": 2.93
            },
            {
              "componentId": null,
              "deltaE": 2.93
            },
            {
              "componentId": null,
              "deltaE": 2.93
            }
          ],
          "gated": true
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "478e7d36c78fdc4d",
      "passId": "interaction-pass"
    },
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.867,
        "aspectRatioDelta": 0.0052,
        "scaleDelta": 0.0259,
        "bilateralSymmetryError": 0.1374,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 2.84,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 2.84
            },
            {
              "componentId": null,
              "deltaE": 2.84
            },
            {
              "componentId": null,
              "deltaE": 2.84
            },
            {
              "componentId": null,
              "deltaE": 2.84
            },
            {
              "componentId": null,
              "deltaE": 2.84
            },
            {
              "componentId": null,
              "deltaE": 2.84
            },
            {
              "componentId": null,
              "deltaE": 2.84
            },
            {
              "componentId": null,
              "deltaE": 2.84
            },
            {
              "componentId": null,
              "deltaE": 2.84
            }
          ],
          "gated": true
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "a698bbbe786d7762",
      "passId": "interaction-pass"
    },
    {
      "passed": true,
      "checks": {
        "silhouetteIoU": 0.867,
        "aspectRatioDelta": 0.0052,
        "scaleDelta": 0.0259,
        "bilateralSymmetryError": 0.1374,
        "colorDelta": {
          "checked": 9,
          "maxDeltaE": 2.84,
          "perComponent": [
            {
              "componentId": null,
              "deltaE": 2.84
            },
            {
              "componentId": null,
              "deltaE": 2.84
            },
            {
              "componentId": null,
              "deltaE": 2.84
            },
            {
              "componentId": null,
              "deltaE": 2.84
            },
            {
              "componentId": null,
              "deltaE": 2.84
            },
            {
              "componentId": null,
              "deltaE": 2.84
            },
            {
              "componentId": null,
              "deltaE": 2.84
            },
            {
              "componentId": null,
              "deltaE": 2.84
            },
            {
              "componentId": null,
              "deltaE": 2.84
            }
          ],
          "gated": true
        }
      },
      "failures": [],
      "maskWarnings": [],
      "renderHash": "a698bbbe786d7762",
      "passId": "optimization-pass"
    }
  ],
  "verification": {
    "revision": 2,
    "runtimePartCount": 72,
    "clearance": {
      "slotWidth": 0.99,
      "slotDepth": 0.18,
      "cartridgeWidth": 0.864,
      "cartridgeDepth": 0.14
    },
    "calibration": "public/templates/savepoint/verification/calibration.json",
    "selfIntersection": "Passed on all individually closed procedural prototypes; open artwork planes are excluded, repeated instance topology is tested once.",
    "attachmentGate": "Worn/held attachment gate is non-applicable; physical insertion is measured separately."
  }
}]]>
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
