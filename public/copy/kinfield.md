<template slug="kinfield" name="KINFIELD">
  <dependencies>
    {
      "dependencies": {
        "gsap": "^3.15.0"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(kinfield)/layout.tsx">
<![CDATA[import type { Metadata } from "next";
import "./kinfield/kinfield.css";

export const metadata: Metadata = {
  title: "KINFIELD — Move in your own rhythm",
  description: "A fictional movement studio and an interactive study in finding your own rhythm.",
};

export default function KinfieldLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="kf-body">{children}</body></html>;
}
]]>
    </file>
    <file path="src/app/(kinfield)/kinfield/assets.ts">
<![CDATA[export const assets = {
  poseA: "/assets/kinfield/01-movement-triptych-a.webp",
  poseB: "/assets/kinfield/02-triptych-b.webp",
  poseC: "/assets/kinfield/03-triptych-c.webp",
  instructorA: "/assets/kinfield/04-instructor-a.webp",
  instructorB: "/assets/kinfield/04-instructor-b.webp",
  studio: "/assets/kinfield/06-studio-room.webp",
  motion: "/assets/kinfield/07-movement-loop.mp4",
} as const;

export function responsivePhoto(src: string): string {
  const variant = (width: number) => src.replace(/\.webp$/, "-" + width + ".webp");
  return variant(480) + " 480w, " + variant(896) + " 896w" + (src === assets.studio ? ", " + src + " 1376w" : "");
}
]]>
    </file>
    <file path="src/app/(kinfield)/kinfield/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#554352"/><path d="M19 14v36m0-17 25-19M23 30l23 20" fill="none" stroke="#F4EEE6" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>
]]>
    </file>
    <file path="src/app/(kinfield)/kinfield/kinfield.css">
<![CDATA[.kf-body{margin:0;background:#F4EEE6}
.kinfield{--kf-bone:#F4EEE6;--kf-olive:#777F5E;--kf-aubergine:#554352;--kf-melon:#EFAE97;--kf-cocoa:#352C2C;--kf-radius-xl:32px;--kf-radius-lg:24px;--kf-radius-md:16px;--kf-radius-sm:12px;--kf-ease:cubic-bezier(.22,1,.36,1);color:var(--kf-cocoa);background:var(--kf-bone);font-family:Arial,sans-serif;overflow:clip}
.kinfield *{box-sizing:border-box}
.kinfield h1,.kinfield h2,.kinfield h3,.kinfield p{margin:0}
.kinfield h1,.kinfield h2,.kinfield h3{font-family:"Arial Narrow","Helvetica Neue",Arial,sans-serif}
.kinfield button,.kinfield input,.kinfield select{font:inherit}
.kinfield button,.kinfield a{touch-action:manipulation}
.kinfield button{cursor:pointer}
.kinfield a{color:inherit;text-decoration:none}
.kinfield button:focus-visible,.kinfield a:focus-visible,.kinfield input:focus-visible,.kinfield select:focus-visible,.kinfield [tabindex]:focus-visible{outline:3px solid var(--kf-melon);outline-offset:4px}
.kinfield img{display:block;max-width:100%}
.kinfield em{font-family:Georgia,"Times New Roman",serif;font-weight:400}
.kf-skip{position:fixed;z-index:101;top:8px;left:8px;padding:12px;background:var(--kf-bone);border-radius:12px;transform:translateY(-150%)}
.kf-skip:focus{transform:none}
.kf-section{padding:0 4.2%;margin:0 auto;max-width:1920px}
.kf-section-heading,.kf-panel-top,.kf-panel-bottom,.kf-small-label,.kf-eyebrow,.kf-tiny,.kf-atlas-topline,.kf-atlas-detail-head,.kf-routine-heading,.kf-level-title,.kf-routine-label,.kf-schedule-columns,.kf-schedule-top>p,.kf-teacher-caption span,.kf-booking-top,.kf-review-top,.kf-review-details span,.kf-review-bottom,.kf-closing-top,.kf-closing-copy>span,.kf-closing-bottom,.kf-figure-note,.kf-fiction-note,.kf-demo-note{font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:10px;line-height:1.45;letter-spacing:.075em}
.kf-section-heading{display:flex;justify-content:space-between;gap:20px;padding:23px 2px;border-top:1px solid color-mix(in srgb,var(--kf-cocoa) 35%,transparent)}
.kf-section-heading span:last-child{text-align:right}
.kf-eyebrow{font-size:10px}
.kf-dot{display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--kf-olive);margin-right:7px}
.kf-button{display:inline-flex;align-items:center;justify-content:space-between;gap:32px;min-height:52px;padding:0 19px;border:1px solid transparent;border-radius:999px;font-size:13px;font-weight:600;transition:transform .2s var(--kf-ease),background .3s,color .3s}
.kf-button span,.kf-text-link span{display:inline-block;transition:transform .3s var(--kf-ease)}
.kf-button:hover span,.kf-button:focus-visible span,.kf-text-link:hover span,.kf-text-link:focus-visible span{transform:translate(3px,-3px)}
.kf-button:active{transform:scale(.97)}
.kf-button-dark{background:var(--kf-cocoa);color:var(--kf-bone)!important}
.kf-button-dark:hover{background:var(--kf-aubergine)}
.kf-button-light{background:var(--kf-bone);color:var(--kf-cocoa)!important}
.kf-text-link{display:inline-flex;align-items:center;gap:20px;padding:9px 0;border:0;border-radius:8px;background:none;font-size:12px;font-weight:600;text-decoration:underline!important;text-underline-offset:5px}
.kf-dock{position:fixed;z-index:30;left:12px;top:50%;transform:translateY(-50%);width:42px;min-height:176px;border:1px solid color-mix(in srgb,var(--kf-bone) 50%,transparent);border-radius:999px;background:var(--kf-cocoa);color:var(--kf-bone);display:flex;align-items:center;flex-direction:column;gap:20px;padding:16px 0;box-shadow:0 6px 25px rgb(53 44 44 / .1)}
.kf-dock-lines{display:grid;gap:4px;margin-top:2px}.kf-dock-lines i{width:16px;height:1px;background:currentColor;display:block}
.kf-dock-label{writing-mode:vertical-rl;font:9px ui-monospace,monospace;letter-spacing:.14em}.kf-dock-num{font:9px ui-monospace,monospace}
.kf-drawer{position:fixed;inset:0 auto 0 0;margin:auto 0 auto 12px;width:min(430px,calc(100vw - 24px));max-width:none;max-height:calc(100dvh - 24px);height:calc(100dvh - 24px);border:0;border-radius:24px;background:var(--kf-aubergine);color:var(--kf-bone);padding:26px;box-shadow:0 20px 80px rgb(53 44 44 / .25)}
.kf-drawer::backdrop{background:rgb(53 44 44 / .5)}
.kf-drawer-top,.kf-drawer-note{font:10px ui-monospace,monospace;letter-spacing:.1em}.kf-drawer-top{display:flex;justify-content:space-between;align-items:center}
.kf-close{border:1px solid currentColor;background:transparent;color:inherit;border-radius:50%;width:42px;height:42px;font-size:25px}
.kf-drawer-title{font-size:clamp(45px,6vw,76px);line-height:.98;letter-spacing:-.06em;margin:50px 0!important}
.kf-drawer nav{display:grid}.kf-drawer nav a{display:grid;grid-template-columns:45px 1fr auto;gap:10px;padding:15px 0;border-bottom:1px solid rgb(244 238 230 / .3);font-size:18px}.kf-drawer nav a span{font:10px ui-monospace,monospace;align-self:center}.kf-drawer nav a:hover{color:var(--kf-melon)}
.kf-drawer-note{margin-top:30px!important;opacity:.75}
.kf-hero{height:170svh;padding:16px 16px 0}
.kf-hero-sticky{position:sticky;top:16px;height:calc(100svh - 32px)}
.kf-hero-grid{position:relative;height:100%;width:100%;isolation:isolate}
.kf-hero-image{position:absolute;inset:0;border-radius:var(--kf-radius-xl);overflow:hidden;background:color-mix(in srgb,var(--kf-bone) 75%,var(--kf-cocoa));clip-path:inset(0 19.4% 0 23.4% round 32px);touch-action:pan-y}
.kf-hero-pose{position:absolute;left:23.4%;top:0;width:57.2%;height:100%;object-fit:cover;object-position:center 50%}
.kf-pose-1,.kf-pose-2{opacity:0}
.kf-photo-caption{position:absolute;bottom:25px;left:26%;right:22%;display:flex;justify-content:space-between;color:var(--kf-bone);text-shadow:0 1px 6px rgb(53 44 44 / .65);font:9px ui-monospace,monospace;letter-spacing:.08em}
.kf-manifesto,.kf-hero-ledger{position:absolute;top:0;bottom:0;display:flex;flex-direction:column;justify-content:space-between;z-index:2;padding:25px;border-radius:var(--kf-radius-xl)}
.kf-manifesto{left:0;width:22.7%;padding-left:48px;background:var(--kf-bone);border:1px solid color-mix(in srgb,var(--kf-cocoa) 22%,transparent)}
.kf-hero-ledger{right:0;width:18.7%;background:var(--kf-aubergine);color:var(--kf-bone)}
.kf-panel-top,.kf-panel-bottom{display:flex;justify-content:space-between;gap:10px}
.kf-panel-bottom{opacity:.7}
.kf-manifesto-copy{padding:20px 0}
.kf-manifesto h1{margin:21px 0!important;font-family:"Arial Narrow","Helvetica Neue",Arial,sans-serif;font-stretch:condensed;letter-spacing:-.075em;line-height:.94;font-size:clamp(45px,5.1vw,96px);font-weight:500}
.kf-manifesto h1 span{display:block}.kf-manifesto h1 em{letter-spacing:-.075em}
.kf-intro{font-size:clamp(12px,1vw,15px);line-height:1.6;margin-bottom:26px!important}
.kf-manifesto-copy .kf-text-link{display:flex;width:max-content;margin-top:12px}
.kf-ledger-intro p{font-size:clamp(30px,3.2vw,55px);line-height:1.01;letter-spacing:-.06em;margin:22px 0!important}
.kf-drawn-star{font-size:45px;color:var(--kf-melon)}
.kf-hero-entries div{display:flex;justify-content:space-between;gap:8px;padding:13px 0;border-top:1px solid rgb(244 238 230 / .35);font-size:13px}.kf-hero-entries div span{font:9px ui-monospace,monospace}
.kf-tiny{opacity:.7}
.kf-sideword{position:absolute;z-index:3;left:24.8%;top:25px;writing-mode:vertical-rl;font-weight:700;letter-spacing:.15em;font-size:14px;color:var(--kf-cocoa)}
.kf-sideword span{font-size:8px}.kf-pose-controls,.kf-mobile-hero-copy{display:none}
.kf-practice{padding-top:120px;padding-bottom:140px}
.kf-practice-intro,.kf-atlas-header,.kf-ledger-heading,.kf-teachers-title,.kf-session-heading{display:flex;justify-content:space-between;align-items:end;gap:40px;padding:48px 0 56px}
.kf-practice-intro h2,.kf-atlas-header h2,.kf-ledger-heading h2,.kf-teachers-title h2,.kf-session-heading h2{font-size:clamp(50px,7vw,112px);font-weight:500;line-height:.94;letter-spacing:-.075em}
.kf-practice-intro>p,.kf-atlas-header>p,.kf-ledger-heading>p,.kf-teachers-title>p,.kf-session-heading>p{width:min(300px,30%);font-size:15px;line-height:1.6}
.kf-practice-stage{height:min(780px,62vw);min-height:550px;position:relative;overflow:hidden;border-radius:var(--kf-radius-xl);background:var(--kf-olive)}
.kf-practice-stage>.kf-practice-room{width:100%;height:100%;object-fit:cover}
.kf-practice-stage>.kf-practice-person{position:absolute;right:5%;top:6%;width:38%;height:88%;object-fit:cover;object-position:center;border-radius:var(--kf-radius-lg)}
.kf-practice-arc{position:absolute;left:37%;top:5%;width:38%;height:80%;fill:none;stroke:var(--kf-melon);stroke-width:1.5;transition:transform .6s var(--kf-ease);filter:drop-shadow(0 1px 2px rgb(53 44 44 / .2))}.kf-arc-1{transform:rotate(25deg)}.kf-arc-2{transform:rotate(62deg) scale(.86)}
.kf-practice-card{position:absolute;left:28px;top:28px;bottom:28px;width:min(390px,38%);padding:26px;display:flex;flex-direction:column;justify-content:space-between;border-radius:var(--kf-radius-lg);background:var(--kf-bone)}
.kf-practice-card-top{display:flex;justify-content:space-between;gap:10px;font:9px ui-monospace,monospace;letter-spacing:.06em}
.kf-principle-copy h3{font-size:clamp(40px,4.7vw,74px);font-weight:500;line-height:.96;letter-spacing:-.07em;margin:20px 0!important}
.kf-principle-copy>p:last-child{font-size:14px;line-height:1.6;max-width:270px}
.kf-tabs,.kf-levels{display:flex;flex-wrap:wrap;gap:6px}.kf-tabs button,.kf-levels button{border:1px solid color-mix(in srgb,var(--kf-cocoa) 30%,transparent);border-radius:999px;background:transparent;color:inherit;padding:10px 13px;font-size:11px;min-height:42px;transition:background .25s,color .25s,transform .2s}
.kf-tabs button[aria-pressed=true],.kf-levels button[aria-pressed=true]{background:var(--kf-cocoa);color:var(--kf-bone)}.kf-tabs button:active,.kf-levels button:active{transform:scale(.96)}
.kf-stage-label{position:absolute;right:28px;bottom:28px;color:var(--kf-bone);font:10px ui-monospace,monospace;text-align:right;text-shadow:0 1px 4px rgb(53 44 44 / .8)}
.kf-atlas-section{padding-bottom:150px}.kf-atlas-header{padding-top:48px}
.kf-atlas{display:grid;grid-template-columns:1.05fr 1.05fr .7fr;gap:10px;padding:10px;border-radius:var(--kf-radius-xl);background:var(--kf-aubergine);min-height:700px}
.kf-figure-panel,.kf-atlas-detail,.kf-atlas-still{border-radius:var(--kf-radius-lg);overflow:hidden}
.kf-figure-panel{background:var(--kf-bone);padding:23px;display:flex;flex-direction:column;min-width:0}
.kf-atlas-topline,.kf-atlas-detail-head,.kf-routine-heading,.kf-level-title,.kf-routine-label{display:flex;justify-content:space-between;gap:12px}
.kf-figure-wrap{position:relative;flex:1;min-height:460px;color:var(--kf-olive)}
.kf-figure-wrap svg{display:block;width:100%;height:100%;max-height:560px;margin:auto}
.kf-figure-guides{opacity:.34}.kf-atlas-arc{color:var(--kf-melon);transform-origin:50% 50%;transition:transform .55s var(--kf-ease)}.kf-figure-wrap[data-zone=hips] .kf-atlas-arc{transform:rotate(75deg)}.kf-figure-wrap[data-zone=spine] .kf-atlas-arc{transform:rotate(38deg)}
.kf-halo{color:var(--kf-olive);transition:cy .5s var(--kf-ease)}
.kf-hotspot{position:absolute;left:50%;transform:translate(-50%,-50%);width:48px;height:48px;display:grid;place-items:center;background:transparent;border:0;border-radius:50%}.kf-hotspot span{width:12px;height:12px;background:var(--kf-olive);border:2px solid var(--kf-bone);border-radius:50%;box-shadow:0 0 0 1px var(--kf-olive);transition:transform .3s}.kf-hotspot:hover span,.kf-hotspot[aria-pressed=true] span{transform:scale(1.45)}
.kf-figure-note{position:absolute;color:var(--kf-cocoa);opacity:.7}.kf-note-a{left:2%;top:25%}.kf-note-b{right:2%;bottom:20%}
.kf-zone-buttons{display:flex;gap:5px;flex-wrap:wrap}.kf-zone-buttons button{flex:1;border:1px solid color-mix(in srgb,var(--kf-cocoa) 25%,transparent);border-radius:999px;background:none;padding:12px 8px;color:var(--kf-cocoa);font-size:12px;text-transform:capitalize;white-space:nowrap}.kf-zone-buttons button span{font:9px ui-monospace,monospace;opacity:.6}.kf-zone-buttons button[aria-pressed=true]{background:var(--kf-olive);color:var(--kf-bone);border-color:var(--kf-olive)}
.kf-atlas-detail{background:color-mix(in srgb,var(--kf-bone) 94%,var(--kf-melon));padding:25px;display:flex;flex-direction:column;min-width:0}
.kf-atlas-detail-head button{border:0;background:none;text-decoration:underline;text-underline-offset:4px;color:inherit;font:inherit}.kf-routine-heading{margin-top:50px}.kf-atlas-detail h3{text-transform:capitalize;font-size:clamp(49px,5vw,80px);font-weight:500;letter-spacing:-.07em;margin:10px 0!important;display:flex;justify-content:space-between;align-items:center}.kf-flower{font-size:35px;color:var(--kf-olive)}
.kf-detail-desc{font-size:13px;line-height:1.5}.kf-level-title{align-items:end;margin:34px 0 10px}.kf-level-title button{border:0;border-radius:50%;background:transparent;width:36px;height:36px;color:inherit}.kf-level-title button:disabled{opacity:.25;cursor:default}
.kf-routine{margin-top:40px}.kf-routine-label{padding-bottom:12px;border-bottom:1px solid color-mix(in srgb,var(--kf-cocoa) 38%,transparent)}.kf-routine ol{list-style:none;margin:0;padding:0}.kf-routine li{display:grid;grid-template-columns:30px 1fr 15px;gap:10px;align-items:center;min-height:53px;border-bottom:1px solid color-mix(in srgb,var(--kf-cocoa) 20%,transparent);font-size:13px}.kf-routine li span{font:10px ui-monospace,monospace}.kf-atlas-disclaimer{margin-top:auto!important;padding-top:24px;font-size:11px;line-height:1.5;opacity:.75}
.kf-atlas-still{position:relative;background:var(--kf-olive)}.kf-atlas-still img{width:100%;height:100%;object-fit:cover}.kf-atlas-still>div{position:absolute;left:18px;right:18px;bottom:20px;color:var(--kf-bone);display:flex;justify-content:space-between;font:9px ui-monospace,monospace;text-shadow:0 1px 5px var(--kf-cocoa)}
.kf-programs{padding-bottom:145px}.kf-ledger-heading .kf-eyebrow,.kf-session-heading .kf-eyebrow{margin-bottom:25px}
.kf-schedule{background:color-mix(in srgb,var(--kf-bone) 90%,var(--kf-melon));border-radius:var(--kf-radius-xl);padding:40px;overflow:hidden}
.kf-schedule-top{display:flex;justify-content:space-between;align-items:end;gap:30px;padding-bottom:40px}.kf-schedule-top h3{font-size:clamp(42px,5vw,72px);font-weight:500;letter-spacing:-.07em;margin-top:20px}.kf-schedule-top h3 span{font:11px ui-monospace,monospace;letter-spacing:0}
.kf-schedule-top>p{text-align:right}.kf-schedule-columns{display:grid;grid-template-columns:1fr 2fr 1fr 50px;padding:14px 18px;border-top:1px solid var(--kf-cocoa);border-bottom:1px solid var(--kf-cocoa)}
.kf-schedule-list{display:grid;gap:6px;margin:8px 0}.kf-schedule-item{position:relative;background:rgb(244 238 230 / .55);border-radius:16px;transition:background .3s}.kf-schedule-item[data-selected=true]{background:color-mix(in srgb,var(--kf-bone) 72%,var(--kf-olive))}
.kf-schedule-row{position:relative;display:grid;grid-template-columns:1fr 2fr 1fr 50px;align-items:center;width:100%;padding:18px;text-align:left;color:inherit;border:0;border-radius:16px;background:none;min-height:90px}
.kf-class-time b,.kf-class-time small,.kf-class-name small{display:block}.kf-class-time b{font:12px ui-monospace,monospace}.kf-class-time small,.kf-class-name small{font:10px ui-monospace,monospace;margin-top:7px}.kf-class-name{font-size:clamp(23px,2.4vw,36px);letter-spacing:-.05em}.kf-class-intensity{font-size:13px}.kf-class-plus{font-size:25px;text-align:right}
.kf-hinge{position:absolute;right:65px;top:0;transform-origin:top;transform:perspective(300px) rotateX(-90deg);opacity:0;padding:6px 10px;border-radius:0 0 10px 10px;background:var(--kf-olive);color:var(--kf-bone);font:9px ui-monospace,monospace;transition:transform .35s var(--kf-ease),opacity .2s}
.kf-schedule-row:hover .kf-hinge,.kf-schedule-row:focus-visible .kf-hinge,.kf-schedule-row[aria-expanded=true] .kf-hinge{transform:perspective(300px) rotateX(0);opacity:1}
.kf-class-detail{padding:0 18px 18px;display:flex;gap:20px;justify-content:space-between;font-size:12px}.kf-class-detail[hidden]{display:none}.kf-class-detail a{text-decoration:underline;text-underline-offset:4px}
.kf-schedule-footer{display:flex;justify-content:space-between;align-items:center;gap:20px;padding-top:25px;font-size:12px}
.kf-teachers{padding-bottom:155px}.kf-teacher-spread{display:grid;grid-template-columns:1fr .3fr .8fr;align-items:start;gap:18px}.kf-teacher-two{padding-top:170px}.kf-teacher-image{position:relative;overflow:hidden;border-radius:var(--kf-radius-lg);background:var(--kf-olive);aspect-ratio:4/5}.kf-teacher-two .kf-teacher-image{aspect-ratio:4/5.4}.kf-teacher-image img{width:100%;height:100%;object-fit:cover;transition:transform .7s var(--kf-ease)}.kf-teacher-image:hover img,.kf-teacher-image:focus-visible img{transform:scale(1.035)}.kf-teacher-image>span{position:absolute;left:18px;bottom:18px;color:var(--kf-bone);font:9px ui-monospace,monospace;text-shadow:0 1px 4px var(--kf-cocoa)}
.kf-teacher-caption{display:flex;justify-content:space-between;gap:25px;padding:20px 0}.kf-teacher-caption h3{font-size:clamp(24px,3vw,40px);font-weight:500;letter-spacing:-.05em}.kf-teacher-caption span{display:block;margin-top:8px}.kf-teacher-caption p{max-width:230px;font:italic 18px/1.4 Georgia,serif}.kf-bridge{align-self:center;color:var(--kf-olive)}.kf-bridge>span{font-size:35px}.kf-bridge svg{width:100%;fill:none;stroke:var(--kf-olive);stroke-width:1}.kf-bridge small{font:9px ui-monospace,monospace}.kf-fiction-note{margin-top:25px!important;opacity:.7}
.kf-session-section{padding-bottom:140px}.kf-booking{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:10px;background:var(--kf-olive);border-radius:var(--kf-radius-xl)}.kf-booking-form,.kf-booking-review{border-radius:var(--kf-radius-lg);padding:38px;min-width:0}.kf-booking-form{background:var(--kf-bone)}.kf-booking-review{background:var(--kf-aubergine);color:var(--kf-bone);display:flex;flex-direction:column}
.kf-booking-top,.kf-review-top{display:flex;justify-content:space-between;align-items:center}.kf-booking-form h3,.kf-booking-review h3{font-size:clamp(44px,5vw,78px);font-weight:500;letter-spacing:-.07em;line-height:.97;margin:60px 0 22px!important}.kf-booking-form>p{font-size:14px;line-height:1.5}.kf-booking-form form{display:grid;gap:10px;margin-top:42px}.kf-booking-form label{font:10px ui-monospace,monospace;letter-spacing:.06em;margin-top:15px}.kf-booking-form select,.kf-booking-form input{width:100%;min-height:54px;padding:12px 15px;border:1px solid color-mix(in srgb,var(--kf-cocoa) 35%,transparent);border-radius:12px;background:transparent;color:var(--kf-cocoa)}.kf-input-hint,.kf-error{font-size:11px;line-height:1.4}.kf-error{font-weight:700;color:var(--kf-aubergine)}.kf-booking-form form .kf-button{margin-top:20px;width:100%}.kf-demo-note{margin-top:25px!important;font-size:9px!important}
.kf-review-top span:last-child{font-size:30px;color:var(--kf-melon)}.kf-review-body,.kf-confirmation{flex:1}.kf-review-body>.kf-small-label,.kf-confirmation>.kf-small-label{display:block;margin-top:70px}.kf-review-body>p:last-child,.kf-confirmation>p:last-of-type{max-width:290px;font-size:14px;line-height:1.6}.kf-review-details{margin-top:45px}.kf-review-details div{display:flex;justify-content:space-between;gap:20px;align-items:center;border-top:1px solid rgb(244 238 230 / .35);padding:17px 0}.kf-review-details strong{font-size:13px;font-weight:500;text-align:right}.kf-review-bottom{display:flex;justify-content:space-between;border-top:1px solid rgb(244 238 230 / .35);padding-top:17px}.kf-stamp{float:right;display:grid;place-items:center;width:92px;height:92px;border:1px solid var(--kf-melon);border-radius:50%;color:var(--kf-melon);text-align:center;font:10px ui-monospace,monospace;transform:rotate(12deg)}.kf-confirmation .kf-text-link{color:var(--kf-bone);margin-top:18px}
.kf-closing{position:relative;padding-bottom:16px}.kf-closing-arc{position:absolute;top:-100px;left:0;width:100%;height:180px;fill:none;stroke:var(--kf-melon);stroke-width:2;pointer-events:none}.kf-closing-panel{position:relative;min-height:640px;border-radius:var(--kf-radius-xl);background:var(--kf-aubergine);color:var(--kf-bone);padding:36px;display:flex;flex-direction:column;justify-content:space-between;overflow:hidden}.kf-closing-top,.kf-closing-bottom{display:flex;justify-content:space-between;gap:25px}.kf-closing-copy{padding:70px 0}.kf-closing-copy h2{font-size:clamp(55px,9vw,145px);line-height:.9;font-weight:500;letter-spacing:-.075em;margin:25px 0 35px!important}.kf-closing-bottom{align-items:end}.kf-closing-bottom strong{font:bold clamp(32px,5vw,72px)/.8 "Helvetica Neue",Arial,sans-serif;letter-spacing:-.07em}.kf-closing-bottom strong span{font:10px ui-monospace,monospace;vertical-align:top}.kf-closing-bottom div{display:grid;gap:7px}.kf-noscript{padding:20px;text-align:center}
@media (prefers-reduced-motion:no-preference){
 .kf-manifesto{animation:kf-enter-left .9s var(--kf-ease) both}.kf-hero-ledger{animation:kf-enter-right 1s var(--kf-ease) both}.kf-manifesto h1 span{animation:kf-type-in .8s var(--kf-ease) both}.kf-manifesto h1 span:nth-child(2){animation-delay:.1s}.kf-manifesto h1 span:nth-child(3){animation-delay:.2s}
 .kf-hero-pose{animation:kf-photo-in 1.1s var(--kf-ease) both}.kf-hero-entries div{animation:kf-type-in .7s var(--kf-ease) both}.kf-hero-entries div:nth-child(2){animation-delay:.12s}.kf-hero-entries div:nth-child(3){animation-delay:.24s}
 .kf-drawer[open]{animation:kf-drawer-in .42s var(--kf-ease) both}.kf-drawer[open] nav a{animation:kf-nav-in .35s var(--kf-ease) both}.kf-drawer[open] nav a:nth-child(2){animation-delay:.04s}.kf-drawer[open] nav a:nth-child(3){animation-delay:.08s}.kf-drawer[open] nav a:nth-child(4){animation-delay:.12s}.kf-drawer[open] nav a:nth-child(5){animation-delay:.16s}.kf-drawer[open] nav a:nth-child(6){animation-delay:.2s}
 .kf-principle-copy,.kf-routine ol{animation:kf-baseline-in .45s var(--kf-ease) both}.kf-confirmation{animation:kf-stamp-in .45s var(--kf-ease) both}
 @keyframes kf-enter-left{from{opacity:0;transform:translateX(-25px)}to{opacity:1;transform:none}}
 @keyframes kf-enter-right{from{opacity:0;transform:translateX(25px)}to{opacity:1;transform:none}}
 @keyframes kf-type-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
 @keyframes kf-photo-in{from{transform:scale(1.04);clip-path:inset(0 8% 0 8% round 24px)}to{transform:none;clip-path:inset(0 round 0)}}
 @keyframes kf-drawer-in{from{transform:translateX(-20px);clip-path:inset(0 100% 0 0 round 24px)}to{transform:none;clip-path:inset(0 round 24px)}}
 @keyframes kf-nav-in{from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:none}}
 @keyframes kf-baseline-in{from{transform:translateY(8px);clip-path:inset(0 0 100% 0)}to{transform:none;clip-path:inset(0)}}
 @keyframes kf-stamp-in{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:none}}
}
@media(max-width:1190px){.kf-manifesto,.kf-hero-ledger{padding:18px}.kf-manifesto{padding-left:45px}.kf-manifesto h1{font-size:clamp(36px,4.5vw,54px)}.kf-manifesto .kf-button{gap:10px;padding:0 14px;font-size:12px}.kf-atlas{grid-template-columns:1fr 1fr}.kf-atlas-still{display:none}.kf-schedule{padding:30px}}
@media(max-width:1023px){
 .kf-dock{left:10px;top:20px;transform:none;width:46px;min-height:46px;height:46px;padding:0;justify-content:center}.kf-dock-label,.kf-dock-num{display:none}
 .kf-hero{height:auto;padding:10px 10px 0}.kf-hero-sticky{height:auto;position:relative;top:auto}.kf-hero-grid{height:72svh;min-height:520px}.kf-hero-image{clip-path:none;border-radius:24px}.kf-hero-pose{left:0;width:100%;object-fit:cover;object-position:center 52%;transition:opacity .45s}.kf-hero-pose[data-active=true]{opacity:1}.kf-hero-pose[data-active=false]{opacity:0}
 .kf-manifesto,.kf-hero-ledger{display:none}.kf-sideword{left:20px;top:20px;writing-mode:horizontal-tb;font-size:15px;margin-left:55px}.kf-photo-caption{left:20px;right:20px;bottom:25px}.kf-pose-controls{display:flex;position:absolute;right:15px;top:15px;gap:3px}.kf-pose-controls button{display:grid;place-items:center;width:44px;height:44px;border:0;border-radius:50%;background:rgb(244 238 230 / .8)}.kf-pose-controls button span{height:7px;width:7px;border-radius:50%;background:var(--kf-cocoa);opacity:.35}.kf-pose-controls button[aria-pressed=true] span{opacity:1;transform:scale(1.4)}
 .kf-mobile-hero-copy{display:block;padding:35px 12px 55px}.kf-mobile-hero-copy h2{font-size:clamp(60px,11vw,105px);font-weight:500;line-height:.93;letter-spacing:-.075em;margin:17px 0 25px}.kf-mobile-hero-copy>div{display:flex;align-items:center;gap:25px;flex-wrap:wrap}
 .kf-practice{padding-top:40px}.kf-practice-stage{min-height:620px}.kf-practice-card{width:45%}.kf-teacher-caption{display:block}.kf-teacher-caption p{margin-top:16px}
}
@media(max-width:700px){
 .kf-section{padding-left:16px;padding-right:16px}.kf-section-heading{font-size:9px}.kf-section-heading span:last-child{max-width:45%}
 .kf-hero-grid{height:min(68svh,calc((100vw - 20px) * 1.34));min-height:380px;max-height:700px}.kf-hero-pose{object-position:center 48%}.kf-sideword{top:24px}.kf-photo-caption{font-size:8px}
 .kf-mobile-hero-copy{padding:30px 7px 50px}.kf-mobile-hero-copy h2{font-size:clamp(58px,14vw,88px)}
 .kf-practice,.kf-atlas-section,.kf-programs,.kf-teachers,.kf-session-section{padding-bottom:90px}.kf-practice{padding-top:10px}
 .kf-practice-intro,.kf-atlas-header,.kf-ledger-heading,.kf-teachers-title,.kf-session-heading{display:block;padding:35px 0}.kf-practice-intro h2,.kf-atlas-header h2,.kf-ledger-heading h2,.kf-teachers-title h2,.kf-session-heading h2{font-size:clamp(47px,10.8vw,75px)}
 .kf-practice-intro>p,.kf-atlas-header>p,.kf-ledger-heading>p,.kf-teachers-title>p,.kf-session-heading>p{width:auto;max-width:320px;margin-top:22px;font-size:14px}
 .kf-practice-stage{min-height:0;height:auto;padding:210px 10px 10px}.kf-practice-stage>.kf-practice-room{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.kf-practice-stage>.kf-practice-person{top:10px;right:10px;width:42%;height:190px;object-position:center 45%;border-radius:16px}.kf-practice-card{position:relative;inset:auto;width:100%;min-height:380px;padding:22px}.kf-principle-copy{padding:42px 0}.kf-practice-arc{left:35%;top:0;width:60%;height:240px}.kf-stage-label{display:none}
 .kf-atlas{display:flex;flex-direction:column}.kf-figure-panel,.kf-atlas-detail{padding:18px}.kf-figure-wrap{min-height:430px;max-height:520px}.kf-atlas-detail{min-height:530px}.kf-routine-heading{margin-top:30px}.kf-atlas-detail h3{font-size:58px}.kf-routine{margin-top:28px}.kf-atlas-disclaimer{padding-top:28px}
 .kf-schedule{padding:20px 12px;border-radius:24px}.kf-schedule-top{display:block;padding:0 4px 28px}.kf-schedule-top>p{text-align:left;margin-top:15px}.kf-schedule-columns{grid-template-columns:70px 1fr 36px;font-size:8px;padding:12px 8px}.kf-schedule-columns span:nth-child(3){display:none}.kf-schedule-row{grid-template-columns:70px 1fr 36px;min-height:80px;padding:12px 8px}.kf-class-intensity{display:none}.kf-class-name{font-size:24px}.kf-class-time b{font-size:10px}.kf-class-detail{display:grid;gap:7px;padding:0 10px 15px;font-size:11px}.kf-schedule-footer{align-items:start;flex-direction:column}
 .kf-teacher-spread{grid-template-columns:1fr;gap:15px}.kf-teacher-one{width:90%}.kf-teacher-two{padding-top:0;width:82%;justify-self:end}.kf-bridge{width:45%;height:70px;margin-left:35%;overflow:hidden}.kf-bridge svg{height:50px}.kf-bridge small,.kf-bridge>span{display:none}.kf-teacher-caption{display:block}.kf-teacher-caption h3{font-size:29px}.kf-teacher-caption p{font-size:16px}.kf-fiction-note{font-size:9px}
 .kf-booking{grid-template-columns:1fr}.kf-booking-form,.kf-booking-review{padding:24px}.kf-booking-form h3,.kf-booking-review h3{font-size:55px;margin:45px 0 20px!important}.kf-booking-review{min-height:520px}.kf-review-body>.kf-small-label,.kf-confirmation>.kf-small-label{margin-top:45px}
 .kf-closing{padding-bottom:10px}.kf-closing-panel{min-height:570px;padding:22px;border-radius:24px}.kf-closing-top{font-size:8px}.kf-closing-copy h2{font-size:clamp(51px,11vw,78px)}.kf-closing-bottom{flex-wrap:wrap;align-items:end}.kf-closing-bottom strong{width:100%;font-size:48px}.kf-closing-bottom div,.kf-closing-bottom a{font-size:8px}
}
@media(min-width:600px) and (max-width:1023px){.kf-hero-image::before{content:"";position:absolute;inset:-20px;background:url("/assets/kinfield/01-movement-triptych-a-480.webp") center/cover;filter:blur(18px);opacity:.65}.kf-hero-pose{object-fit:contain}}
@media(max-width:380px){.kf-sideword{left:16px;margin-left:48px;font-size:12px;letter-spacing:.1em}}
@media(prefers-reduced-motion:reduce){
 .kinfield *, .kinfield *::before,.kinfield *::after{animation-duration:.001ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:.001ms!important}
 .kf-hero{height:auto}.kf-hero-sticky{position:relative}.kf-hero-pose[data-active=false]{opacity:0!important}
}
]]>
    </file>
    <file path="src/app/(kinfield)/kinfield/page.tsx">
<![CDATA[import { KinfieldExperience } from "./sections/KinfieldExperience";

export default function KinfieldPage() {
  return <KinfieldExperience />;
}
]]>
    </file>
    <file path="src/app/(kinfield)/kinfield/motion/MotionDirector.tsx">
<![CDATA['use client';

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MotionDirector() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = document.querySelector<HTMLElement>(".kinfield");
    if (!root) return;
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: { trigger: ".kf-hero", start: "top top", end: "bottom bottom", scrub: 0.5, invalidateOnRefresh: true },
        });
        timeline
          .to(".kf-pose-1", { opacity: 1, duration: 0.16, ease: "none" }, 0.25)
          .to(".kf-pose-2", { opacity: 1, duration: 0.16, ease: "none" }, 0.48)
          .to(".kf-manifesto", { xPercent: -108, duration: 0.45, ease: "none" }, 0.48)
          .to(".kf-hero-ledger", { xPercent: 108, duration: 0.45, ease: "none" }, 0.48)
          .to(".kf-hero-image", { clipPath: "inset(0% 0% 0% 0% round 32px)", duration: 0.45, ease: "none" }, 0.48)
          .to(".kf-sideword", { autoAlpha: 0, duration: 0.16, ease: "none" }, 0.56);
      });
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".kf-practice-stage", { clipPath: "inset(4% 10% 4% 10% round 32px)", ease: "none", scrollTrigger: { trigger: ".kf-practice-stage", start: "top 95%", end: "top 45%", scrub: true } });
        gsap.from(".kf-atlas", { clipPath: "inset(0 5% 0 5% round 32px)", y: 35, ease: "none", scrollTrigger: { trigger: ".kf-atlas", start: "top 95%", end: "top 55%", scrub: true } });
        gsap.from(".kf-schedule", { y: 55, rotation: -1.2, ease: "none", scrollTrigger: { trigger: ".kf-schedule", start: "top 95%", end: "top 55%", scrub: true } });
        gsap.from(".kf-schedule-item", { y: 20, stagger: 0.08, duration: 0.55, ease: "power2.out", scrollTrigger: { trigger: ".kf-schedule-list", start: "top 88%", once: true } });
        gsap.from(".kf-teacher-one .kf-teacher-image", { clipPath: "inset(0 0 100% 0 round 24px)", ease: "none", scrollTrigger: { trigger: ".kf-teacher-spread", start: "top 90%", end: "top 42%", scrub: true } });
        gsap.from(".kf-teacher-two .kf-teacher-image", { clipPath: "inset(0 100% 0 0 round 24px)", ease: "none", scrollTrigger: { trigger: ".kf-teacher-spread", start: "top 70%", end: "top 20%", scrub: true } });
        gsap.from(".kf-booking", { y: 45, rotate: 0.7, ease: "none", scrollTrigger: { trigger: ".kf-booking", start: "top 95%", end: "top 55%", scrub: true } });
        gsap.from(".kf-closing-panel", { clipPath: "inset(0 100% 0 0 round 32px)", ease: "none", scrollTrigger: { trigger: ".kf-closing-panel", start: "top 98%", end: "top 55%", scrub: true } });
      });
      return () => media.revert();
    }, root);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });
    return () => { window.removeEventListener("load", refresh); context.revert(); };
  }, []);
  return null;
}
]]>
    </file>
    <file path="src/app/(kinfield)/kinfield/sections/Atlas.tsx">
<![CDATA['use client';

import { useState } from "react";
import { assets, responsivePhoto } from "../assets";
import { levels, moveLevel, routines, zones, type Level, type Zone } from "../study/model";

const figureImages: Record<Zone, string> = { shoulders: assets.poseA, hips: assets.poseC, spine: assets.poseB };
const positions: Record<Zone, number> = { shoulders: 30, hips: 52, spine: 42 };

export function Atlas() {
  const [zone, setZone] = useState<Zone>("shoulders");
  const [level, setLevel] = useState<Level>("new");
  const routine = routines[zone][level];
  return (
    <section className="kf-section kf-atlas-section" id="atlas">
      <div className="kf-section-heading"><span>02 / MOVEMENT ATLAS</span><span>A LITTLE STUDY OF YOU</span></div>
      <div className="kf-atlas-header"><h2>Get to know<br /><em>your movement.</em></h2><p>There is a whole world of movement in the details. Choose an area, find your level and begin gently.</p></div>
      <div className="kf-atlas">
        <div className="kf-figure-panel">
          <div className="kf-atlas-topline"><span>FIG. 01 / HUMAN FORM</span><span>SELECT A POINT ↓</span></div>
          <div className="kf-figure-wrap" data-zone={zone}>
            <svg viewBox="0 0 340 580" role="img" aria-label="Illustrative standing figure">
              <g className="kf-figure-lines" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M170 25c-28 0-35 19-34 40 1 18 9 29 17 35l-3 14c-22 8-45 11-56 32l-27 102c-4 14 0 22 8 24 9 2 14-6 18-18l26-70-5 69c0 23 9 40 16 55l-3 97-13 115c-1 12 6 20 15 20s14-6 16-18l18-108 7-75 7 75 18 108c2 12 7 18 16 18s16-8 15-20l-13-115-3-97c7-15 16-32 16-55l-5-69 26 70c4 12 9 20 18 18 8-2 12-10 8-24l-27-102c-11-21-34-24-56-32l-3-14c8-6 16-17 17-35 1-21-6-40-34-40Z" />
                <path d="M135 123c14 13 55 13 70 0M124 282c29 13 63 13 92 0M170 127v170M151 101c12 7 26 7 38 0" opacity=".45" />
              </g>
              <g className="kf-figure-guides" fill="none" stroke="currentColor"><path d="M23 187h294M23 300h294M170 8v550" strokeDasharray="3 7" /><circle cx="170" cy="290" r="138" strokeDasharray="2 8" /></g>
              <path className="kf-atlas-arc" d="M69 300A104 104 0 0 1 215 165" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle className="kf-halo" cx="170" cy={zone === "shoulders" ? 160 : zone === "hips" ? 300 : 232} r="29" fill="none" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            {zones.map((item) => <button key={item} className="kf-hotspot" style={{ top: positions[item] + "%" }} aria-label={"Select " + item} aria-pressed={zone === item} onClick={() => setZone(item)}><span /></button>)}
            <span className="kf-figure-note kf-note-a">A /<br />MOVEMENT<br />STUDY</span><span className="kf-figure-note kf-note-b">NOT TO<br />SCALE<br />↗</span>
          </div>
          <div className="kf-zone-buttons" aria-label="Choose a body area">{zones.map((item, index) => <button key={item} aria-pressed={zone === item} onClick={() => setZone(item)}><span>0{index + 1}</span> {item}</button>)}</div>
        </div>
        <div className="kf-atlas-detail">
          <div className="kf-atlas-detail-head"><span>YOUR MOVEMENT NOTES</span><button onClick={() => { setZone("shoulders"); setLevel("new"); }}>Reset atlas ↺</button></div>
          <div className="kf-routine-heading"><span>STUDY / 0{zones.indexOf(zone) + 1}</span><span>{routine.minutes} MIN</span></div>
          <h3>{zone}<span className="kf-flower" aria-hidden="true">✳</span></h3>
          <p className="kf-detail-desc">A small sequence to explore, at your own pace.</p>
          <div className="kf-level-title"><span>YOUR EXPERIENCE</span><div><button onClick={() => setLevel(moveLevel(level, -1))} aria-label="Previous experience level" disabled={level === "new"}>←</button><button onClick={() => setLevel(moveLevel(level, 1))} aria-label="Next experience level" disabled={level === "experienced"}>→</button></div></div>
          <div className="kf-levels" role="group" aria-label="Experience level" onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              setLevel(moveLevel(level, event.key === "ArrowRight" ? 1 : -1));
            }
          }}>{levels.map((item) => <button key={item} onClick={() => setLevel(item)} aria-pressed={level === item}>{item}</button>)}</div>
          <div className="kf-routine" aria-live="polite">
            <div className="kf-routine-label"><span>THE SEQUENCE</span><span>{routine.minutes} MIN / {level.toUpperCase()}</span></div>
            <ol key={zone + "-" + level}>{routine.steps.map((step, index) => <li key={step}><span>0{index + 1}</span>{step}<span aria-hidden="true">↗</span></li>)}</ol>
          </div>
          <p className="kf-atlas-disclaimer">Move within a comfortable range. This is an illustrative practice, not medical guidance.</p>
        </div>
        <div className="kf-atlas-still"><img key={zone} src={figureImages[zone]} srcSet={responsivePhoto(figureImages[zone])} sizes="30vw" alt="" width="896" height="1200" loading="lazy" /><div><span>MOVEMENT IN PRACTICE</span><span>0{zones.indexOf(zone) + 1} / 03</span></div></div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(kinfield)/kinfield/sections/Closing.tsx">
<![CDATA['use client';

export function Closing() {
  return (
    <footer className="kf-section kf-closing">
      <svg className="kf-closing-arc" viewBox="0 0 1200 180" preserveAspectRatio="none" aria-hidden="true"><path d="M0 170C300 160 350 10 1200 40" /></svg>
      <div className="kf-closing-panel">
        <div className="kf-closing-top"><span>KINFIELD / MOVEMENT & RECOVERY</span><span>ONE LAST BREATH ↗</span></div>
        <div className="kf-closing-copy"><span>AN OPEN INVITATION / 085</span><h2>Movement begins<br /><em>where you are.</em></h2><a className="kf-button kf-button-light" href="#session">Find a session <span>↗</span></a></div>
        <div className="kf-closing-bottom"><strong>KINFIELD<span>®</span></strong><div><span>A FICTIONAL STUDIO DEMO</span><span>OPENLANDING / 085</span></div><a href="#top">BACK TO TOP ↑</a></div>
      </div>
    </footer>
  );
}
]]>
    </file>
    <file path="src/app/(kinfield)/kinfield/sections/Hero.tsx">
<![CDATA['use client';

import { useRef, useState } from "react";
import { assets, responsivePhoto } from "../assets";

const poses = [assets.poseA, assets.poseB, assets.poseC];

export function Hero() {
  const [pose, setPose] = useState(0);
  const touchStart = useRef(0);
  return (
    <section className="kf-hero" aria-labelledby="kf-title">
      <div className="kf-hero-sticky">
        <div className="kf-hero-grid">
          <div className="kf-hero-image" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => {
            const delta = event.changedTouches[0].clientX - touchStart.current;
            if (Math.abs(delta) > 55) setPose((current) => Math.max(0, Math.min(2, current + (delta < 0 ? 1 : -1))));
          }}>
            {poses.map((src, index) => <img key={src} className={"kf-hero-pose kf-pose-" + index} data-active={pose === index} src={src} srcSet={responsivePhoto(src)} sizes="(min-width: 1024px) 58vw, 100vw" alt={index === 0 ? "A dancer moving slowly in a sunlit studio" : ""} width="896" height="1200" loading={index === 0 ? "eager" : "lazy"} fetchPriority={index === 0 ? "high" : "auto"} />)}
            <div className="kf-photo-caption"><span>STUDY 01 / THE BODY IN MOTION</span><span>01 — 03</span></div>
            <div className="kf-pose-controls" role="group" aria-label="Select a movement portrait">
              {poses.map((_, index) => <button key={index} aria-label={"Portrait " + (index + 1)} aria-pressed={pose === index} onClick={() => setPose(index)}><span /></button>)}
            </div>
          </div>
          <div className="kf-manifesto">
            <div className="kf-panel-top"><span>EST. FOR EVERY BODY</span><span>© 085</span></div>
            <div className="kf-manifesto-copy">
              <p className="kf-eyebrow"><span className="kf-dot" /> A MOVEMENT STUDIO</p>
              <h1 id="kf-title"><span>Move in</span><span>your own</span><span><em>rhythm.</em></span></h1>
              <p className="kf-intro">A little more room to move.<br />A little more room to be.</p>
              <a className="kf-button kf-button-dark" href="#session">Find a session <span aria-hidden="true">↗</span></a>
              <a className="kf-text-link" href="#practice">Explore the practice <span aria-hidden="true">↘</span></a>
            </div>
            <div className="kf-panel-bottom"><span>MOVEMENT<br />& RECOVERY</span><span>TAKE YOUR TIME<br />YOU ARE HERE</span></div>
          </div>
          <aside className="kf-hero-ledger" aria-label="Studio introduction">
            <div className="kf-panel-top"><span>THE KINFIELD WAY</span><span>↗</span></div>
            <div className="kf-ledger-intro"><span className="kf-small-label">AN OPEN INVITATION</span><p>Come as<br />you are.<br /><em>Move as<br />you feel.</em></p><span className="kf-drawn-star" aria-hidden="true">✳</span></div>
            <div className="kf-hero-entries"><div><span>01</span> Grounding <span>↗</span></div><div><span>02</span> Range <span>↗</span></div><div><span>03</span> Recovery <span>↗</span></div></div>
            <p className="kf-tiny">A STUDY IN<br />FEELING GOOD TO MOVE.</p>
          </aside>
          <div className="kf-sideword" aria-label="Kinfield">KINFIELD<span>®</span></div>
        </div>
        <div className="kf-mobile-hero-copy"><span className="kf-eyebrow">A MOVEMENT STUDIO / 085</span><h2>Move in your<br />own <em>rhythm.</em></h2><div><a className="kf-button kf-button-dark" href="#session">Find a session <span>↗</span></a><a className="kf-text-link" href="#practice">Explore the practice ↘</a></div></div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(kinfield)/kinfield/sections/KinfieldExperience.tsx">
<![CDATA['use client';

import { useState } from "react";
import { SideDock } from "./SideDock";
import { Hero } from "./Hero";
import { Practice } from "./Practice";
import { Atlas } from "./Atlas";
import { Ledger } from "./Ledger";
import { Teachers } from "./Teachers";
import { SessionPicker } from "./SessionPicker";
import { Closing } from "./Closing";
import { MotionDirector } from "../motion/MotionDirector";
import type { ClassId } from "../study/model";

export function KinfieldExperience() {
  const [selectedClass, setSelectedClass] = useState<ClassId>("groundwork");
  return (
    <main className="kinfield" id="top">
      <a className="kf-skip" href="#practice">Skip to the practice</a>
      <MotionDirector />
      <SideDock />
      <Hero />
      <Practice />
      <Atlas />
      <Ledger selectedClass={selectedClass} onSelect={setSelectedClass} />
      <Teachers />
      <SessionPicker selectedClass={selectedClass} onSelect={setSelectedClass} />
      <Closing />
      <noscript><div className="kf-noscript">This is a fictional studio. JavaScript enables the interactive atlas and session preview; no reservation is made.</div></noscript>
    </main>
  );
}
]]>
    </file>
    <file path="src/app/(kinfield)/kinfield/sections/Ledger.tsx">
<![CDATA['use client';

import { useState } from "react";
import { classes, type ClassId } from "../study/model";

export function Ledger({ selectedClass, onSelect }: { selectedClass: ClassId; onSelect: (id: ClassId) => void }) {
  const [expanded, setExpanded] = useState<ClassId | null>(null);
  return (
    <section className="kf-section kf-programs" id="programs">
      <div className="kf-section-heading"><span>03 / THE PROGRAM</span><span>A LITTLE SOMETHING FOR EVERY BODY</span></div>
      <div className="kf-ledger-heading"><div><p className="kf-eyebrow">FIND YOUR KIND OF MOVEMENT</p><h2>Make a date<br /><em>with yourself.</em></h2></div><p>A thoughtful mix of movement and stillness. Find the kind of practice that meets you where you are.</p></div>
      <div className="kf-schedule">
        <div className="kf-schedule-top"><div><span className="kf-small-label">KINFIELD / THE WEEKLY STUDY</span><h3>The program<span> / 01—04</span></h3></div><p>AN ILLUSTRATIVE TIMETABLE<br />DEMO ONLY — NO RESERVATION IS MADE.</p></div>
        <div className="kf-schedule-columns" aria-hidden="true"><span>DAY / TIME</span><span>THE PRACTICE</span><span>INTENSITY</span><span>MORE</span></div>
        <div className="kf-schedule-list">{classes.map((item, index) => {
          const open = expanded === item.id;
          return <div className="kf-schedule-item" key={item.id} data-selected={selectedClass === item.id}>
            <button className="kf-schedule-row" onClick={() => { setExpanded(open ? null : item.id); onSelect(item.id); }} aria-expanded={open} aria-controls={"kf-class-" + item.id}>
              <span className="kf-class-time"><b>{item.day}</b><small>{item.time}</small></span>
              <span className="kf-class-name">{item.name}<small>0{index + 1} / {item.focus}</small></span>
              <span className="kf-class-intensity">{item.intensity}</span><span className="kf-class-plus">{open ? "−" : "+"}</span>
              <span className="kf-hinge" aria-hidden="true">{item.duration} / {item.focus}</span>
            </button>
            <div className="kf-class-detail" id={"kf-class-" + item.id} hidden={!open}><span>{item.duration} · {item.focus} · {item.intensity}</span><span>Illustrative availability</span><a href="#session" onClick={() => onSelect(item.id)}>Preview session ↗</a></div>
          </div>;
        })}</div>
        <div className="kf-schedule-footer"><p>All classes and times are fictional examples.</p><a className="kf-button kf-button-dark" href="#session">Preview a session <span>↗</span></a></div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(kinfield)/kinfield/sections/Practice.tsx">
<![CDATA['use client';

import { useState } from "react";
import { assets, responsivePhoto } from "../assets";

const principles = [
  { name: "Grounding", number: "01", title: "Begin where<br />you are.", text: "Find your footing. Let the floor hold you as you notice the small movements that bring you back to yourself." },
  { name: "Range", number: "02", title: "Make a little<br />more room.", text: "Explore the space around you at a pace that feels right. Curiosity is more useful here than perfection." },
  { name: "Recovery", number: "03", title: "Rest is part<br />of the rhythm.", text: "Give the quiet moments their place. A softer pace is a practice in listening to what you need today." },
] as const;

export function Practice() {
  const [active, setActive] = useState(0);
  const principle = principles[active];
  return (
    <section className="kf-section kf-practice" id="practice">
      <div className="kf-section-heading"><span>01 / THE PRACTICE</span><span>AN APPROACH, NOT A FORMULA</span></div>
      <div className="kf-practice-intro"><h2>There is no<br /><em>one way to move.</em></h2><p>Some days call for energy. Others ask for ease. We make space for all of it.</p></div>
      <div className="kf-practice-stage">
        <img className="kf-practice-room" src={assets.studio} srcSet={responsivePhoto(assets.studio)} sizes="100vw" alt="A quiet, light-filled movement studio" width="1376" height="768" loading="lazy" />
        <img className="kf-practice-person" src={assets.poseC} srcSet={responsivePhoto(assets.poseC)} sizes="40vw" alt="A dancer exploring a gentle reach" width="896" height="1200" loading="lazy" />
        <svg className={"kf-practice-arc kf-arc-" + active} viewBox="0 0 400 300" aria-hidden="true"><path d="M35 260C100 30 280 0 370 130" /><circle cx="35" cy="260" r="5" /></svg>
        <div className="kf-practice-card">
          <div className="kf-practice-card-top"><span>THE KINFIELD APPROACH</span><span>{principle.number} / 03</span></div>
          <div className="kf-principle-copy" key={principle.name}><p className="kf-small-label">{principle.name}</p><h3>{active === 0 ? <>Begin where<br /><em>you are.</em></> : active === 1 ? <>Make a little<br /><em>more room.</em></> : <>Rest is part<br /><em>of the rhythm.</em></>}</h3><p>{principle.text}</p></div>
          <div className="kf-tabs" role="group" aria-label="Practice principles">{principles.map((item, index) => <button key={item.name} onClick={() => setActive(index)} aria-pressed={active === index}>{item.name}</button>)}</div>
        </div>
        <div className="kf-stage-label">A PRACTICE FOR<br />THE LIFE YOU LIVE.</div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(kinfield)/kinfield/sections/SessionPicker.tsx">
<![CDATA['use client';

import { useEffect, useState } from "react";
import { classes, validatePreview, type ClassId } from "../study/model";

function localDate() {
  const date = new Date();
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
}

export function SessionPicker({ selectedClass, onSelect }: { selectedClass: ClassId; onSelect: (id: ClassId) => void }) {
  const [date, setDate] = useState("");
  const [today, setToday] = useState("");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<{ classId: ClassId; date: string } | null>(null);
  const selected = classes.find((item) => item.id === selectedClass) ?? classes[0];
  const confirmed = preview?.classId === selectedClass && preview.date === date;

  useEffect(() => { setToday(localDate()); }, []);

  return (
    <section className="kf-section kf-session-section" id="session">
      <div className="kf-section-heading"><span>05 / MAKE SOME SPACE</span><span>THIS ONE IS FOR YOU</span></div>
      <div className="kf-session-heading"><div><p className="kf-eyebrow">A MOMENT, JUST FOR YOU</p><h2>Let&apos;s make<br /><em>some room.</em></h2></div><p>See how a session could fit into your day. This is a preview, with no reservation or payment.</p></div>
      <div className="kf-booking">
        <div className="kf-booking-form">
          <div className="kf-booking-top"><span>KINFIELD / SESSION SHEET</span><span>NO. 085</span></div>
          <h3>Your practice,<br /><em>your pace.</em></h3>
          <p>Choose a class and a date to make an illustrative preview.</p>
          <form noValidate onSubmit={(event) => {
            event.preventDefault();
            const problem = validatePreview(date, selectedClass, localDate());
            setError(problem);
            if (!problem) setPreview({ classId: selectedClass, date });
          }}>
            <label htmlFor="kf-class">01 / CHOOSE YOUR PRACTICE</label>
            <select id="kf-class" value={selectedClass} onChange={(event) => { onSelect(event.target.value as ClassId); setPreview(null); }}>
              {classes.map((item) => <option value={item.id} key={item.id}>{item.name} — {item.duration}</option>)}
            </select>
            <label htmlFor="kf-date">02 / CHOOSE A DATE</label>
            <input id="kf-date" type="date" min={today || undefined} value={date} aria-describedby={error ? "kf-date-error" : "kf-date-hint"} aria-invalid={Boolean(error)} onChange={(event) => { setDate(event.target.value); setError(""); setPreview(null); }} />
            <p className="kf-input-hint" id="kf-date-hint">Any date today or later. This does not indicate availability.</p>
            {error && <p className="kf-error" id="kf-date-error" role="alert">{error}</p>}
            <button className="kf-button kf-button-dark" type="submit">Review your preview <span>↗</span></button>
          </form>
          <p className="kf-demo-note">DEMO ONLY — NO RESERVATION IS MADE.</p>
        </div>
        <div className="kf-booking-review" aria-live="polite">
          <div className="kf-review-top"><span>YOUR SESSION / PREVIEW</span><span>✳</span></div>
          {confirmed ? <div className="kf-confirmation"><span className="kf-stamp">PREVIEW<br />ONLY</span><p className="kf-small-label">A LITTLE SPACE FOR YOU</p><h3>Looks like<br /><em>your kind of time.</em></h3><p>Preview only — no reservation made.</p><button className="kf-text-link" onClick={() => setPreview(null)}>Adjust your selection ↗</button></div> : <div className="kf-review-body"><span className="kf-small-label">A MOMENT TO MOVE</span><h3>{selected.name}<br /><em>at your pace.</em></h3><p>Every practice is an invitation to meet yourself where you are.</p></div>}
          <div className="kf-review-details"><div><span>YOUR PRACTICE</span><strong>{selected.name}</strong></div><div><span>YOUR DATE</span><strong>{date || "Choose a date"}</strong></div><div><span>DURATION / FOCUS</span><strong>{selected.duration} / {selected.focus}</strong></div></div>
          <div className="kf-review-bottom"><span>THIS IS AN ILLUSTRATIVE DEMO</span><span>↗</span></div>
        </div>
      </div>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(kinfield)/kinfield/sections/SideDock.tsx">
<![CDATA['use client';

import { useEffect, useRef, useState } from "react";

const chapters = [
  ["top", "Introduction"], ["practice", "The practice"], ["atlas", "Movement atlas"],
  ["programs", "The program"], ["teachers", "Our teachers"], ["session", "Session preview"],
] as const;

export function SideDock() {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const previousOverflow = useRef<string | null>(null);
  const [active, setActive] = useState("top");

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-25% 0px -55% 0px", threshold: 0 });
    chapters.forEach(([id]) => { const element = document.getElementById(id); if (element) observer.observe(element); });
    return () => {
      observer.disconnect();
      if (previousOverflow.current !== null) document.body.style.overflow = previousOverflow.current;
    };
  }, []);

  return (
    <>
      <button ref={opener} className="kf-dock" onClick={() => {
        if (!dialog.current) return;
        previousOverflow.current = document.body.style.overflow;
        dialog.current.showModal();
        document.body.style.overflow = "hidden";
      }} aria-label="Open chapter navigation" aria-haspopup="dialog">
        <span className="kf-dock-lines" aria-hidden="true"><i /><i /></span>
        <span className="kf-dock-label">INDEX</span><span className="kf-dock-num">0{Math.max(1, chapters.findIndex(([id]) => id === active) + 1)}</span>
      </button>
      <dialog className="kf-drawer" ref={dialog} aria-labelledby="kf-nav-title" onClose={() => {
        if (previousOverflow.current !== null) document.body.style.overflow = previousOverflow.current;
        previousOverflow.current = null;
        opener.current?.focus();
      }} onClick={(event) => {
        if (event.target === dialog.current) dialog.current?.close();
      }}>
        <div className="kf-drawer-top"><span id="kf-nav-title">KINFIELD / INDEX</span><button className="kf-close" onClick={() => dialog.current?.close()} aria-label="Close navigation">×</button></div>
        <p className="kf-drawer-title">Find your<br /><em>way in.</em></p>
        <nav aria-label="Chapters">
          {chapters.map(([id, label], index) => <a key={id} href={"#" + id} onClick={() => dialog.current?.close()}><span>0{index + 1}</span>{label}<span aria-hidden="true">↗</span></a>)}
        </nav>
        <p className="kf-drawer-note">A practice in being here. / 085</p>
      </dialog>
    </>
  );
}
]]>
    </file>
    <file path="src/app/(kinfield)/kinfield/sections/Teachers.tsx">
<![CDATA['use client';

import { assets, responsivePhoto } from "../assets";

export function Teachers() {
  return (
    <section className="kf-section kf-teachers" id="teachers">
      <div className="kf-section-heading"><span>04 / PEOPLE & PRACTICE</span><span>A HUMAN WAY TO MOVE</span></div>
      <div className="kf-teachers-title"><h2>Good movement<br /><em>is a shared thing.</em></h2><p>Different rhythms. A shared belief that movement can feel like coming home.</p></div>
      <div className="kf-teacher-spread">
        <article className="kf-teacher kf-teacher-one">
          <div className="kf-teacher-image" tabIndex={0}><img src={assets.instructorA} srcSet={responsivePhoto(assets.instructorA)} sizes="(min-width: 701px) 50vw, 90vw" alt="A movement teacher sitting in the studio" width="896" height="1200" loading="lazy" /><span>01 / TEACHER STUDY</span></div>
          <div className="kf-teacher-caption"><div><h3>Mara Ellis</h3><span>GROUNDING / RANGE</span></div><p>“I like to start with what feels possible, and let curiosity do the rest.”</p></div>
        </article>
        <div className="kf-bridge" aria-hidden="true"><span>✳</span><svg viewBox="0 0 250 160"><path d="M0 130 C80 130 90 5 250 25" /></svg><small>WE MOVE<br />TOGETHER</small></div>
        <article className="kf-teacher kf-teacher-two">
          <div className="kf-teacher-image" tabIndex={0}><img src={assets.instructorB} srcSet={responsivePhoto(assets.instructorB)} sizes="(min-width: 701px) 40vw, 82vw" alt="A movement teacher stretching in the studio" width="896" height="1200" loading="lazy" /><span>02 / TEACHER STUDY</span></div>
          <div className="kf-teacher-caption"><div><h3>June Vale</h3><span>REST / RECOVERY</span></div><p>“There is a lot to discover when we give ourselves time to slow down.”</p></div>
        </article>
      </div>
      <p className="kf-fiction-note">KINFIELD and its teachers are fictional. Portraits are supplied creative assets.</p>
    </section>
  );
}
]]>
    </file>
    <file path="src/app/(kinfield)/kinfield/study/model.ts">
<![CDATA[export const zones = ["shoulders", "hips", "spine"] as const;
export const levels = ["new", "familiar", "experienced"] as const;
export type Zone = typeof zones[number];
export type Level = typeof levels[number];
type Routine = { steps: readonly [string, string, string]; minutes: number };

export const routines: Record<Zone, Record<Level, Routine>> = {
  shoulders: {
    new: { steps: ["Slow shoulder rolls", "Gentle wall slides", "Relaxed arm reaches"], minutes: 6 },
    familiar: { steps: ["Controlled scapular circles", "Standing wall angels", "Cross-body reach sequence"], minutes: 9 },
    experienced: { steps: ["Long-lever arm arcs", "Controlled overhead reaches", "Slow eccentric lowering"], minutes: 12 },
  },
  hips: {
    new: { steps: ["Supported hip circles", "Easy standing marches", "Seated figure-four mobility"], minutes: 6 },
    familiar: { steps: ["Standing hip hinges", "Side-to-side weight shifts", "Controlled lunging reach"], minutes: 9 },
    experienced: { steps: ["Deep supported hip transitions", "Slow lateral lunge pulses", "Single-leg balance arcs"], minutes: 12 },
  },
  spine: {
    new: { steps: ["Seated torso turns", "Gentle cat-cow sequence", "Relaxed standing extensions"], minutes: 6 },
    familiar: { steps: ["Segmental spinal waves", "Open-book rotations", "Controlled roll-downs"], minutes: 9 },
    experienced: { steps: ["Slow articulated roll-downs", "Multi-plane rotation sequence", "Controlled extension-to-flexion"], minutes: 12 },
  },
};

export function moveLevel(level: Level, direction: -1 | 1): Level {
  return levels[Math.max(0, Math.min(levels.length - 1, levels.indexOf(level) + direction))];
}

export const classes = [
  { id: "groundwork", name: "Groundwork", day: "MON", time: "08:30", duration: "45 min", focus: "Mobility", intensity: "Gentle" },
  { id: "range", name: "Range Lab", day: "TUE", time: "17:30", duration: "50 min", focus: "Controlled movement", intensity: "Moderate" },
  { id: "strength", name: "Slow Strength", day: "THU", time: "09:00", duration: "45 min", focus: "Mindful load", intensity: "Moderate" },
  { id: "unwind", name: "Unwind", day: "SAT", time: "10:30", duration: "40 min", focus: "Restoration", intensity: "Gentle" },
] as const;
export type ClassId = typeof classes[number]["id"];

export function validatePreview(date: string, classId: string, today: string): string {
  if (!classes.some((item) => item.id === classId)) return "Choose a class to preview.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return "Choose a date for your preview.";
  const parsed = new Date(date + "T00:00:00Z");
  if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== date) return "Choose a valid date.";
  if (date < today) return "Choose today or a later date.";
  return "";
}
]]>
    </file>
  </files>
</template>
