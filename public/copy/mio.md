<template slug="mio" name="Mio Hazuki">
  <dependencies>
    {
      "dependencies": {
        "lenis": "^1.3.27"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(mio)/layout.tsx">
<![CDATA[import type { Metadata } from "next";
import { Kaisei_Decol, Karla, Inconsolata } from "next/font/google";
import "./mio/mio.css";

const display = Kaisei_Decol({ weight: ["400", "500"], subsets: ["latin"], preload: false, variable: "--font-mh-kaisei" });
const body = Karla({ subsets: ["latin"], variable: "--font-mh-karla" });
const utility = Inconsolata({ subsets: ["latin"], variable: "--font-mh-inconsolata" });

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "Mio Hazuki — Little worlds, made just for you",
  description: "Original characters, quiet adventures, and a little everyday magic. Explore Mio Hazuki's illustrations and find a commission to call your own.",
};

export default function MioLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${display.variable} ${body.variable} ${utility.variable}`}>
    <body className="mh-body">{children}<noscript><style>{`.mh-js-only,.mh-form{display:none!important}[data-mh-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style></noscript></body>
  </html>;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/assets.generated.ts">
<![CDATA[// All illustrations are authored SVG; no raster media is required.
export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(mio)/mio/assets.tsx">
<![CDATA[import type { WorkKey } from "./data";
import { AfterRain } from "./art/AfterRain";
import { CloudKeeper } from "./art/CloudKeeper";
import { NightDelivery } from "./art/NightDelivery";
import { SummerRoom } from "./art/SummerRoom";

export function Picture({ assetKey, alt, className = "", prefix = "work" }: { assetKey: WorkKey; alt: string; className?: string; prefix?: string }) {
  return <div className={`mh-picture ${className}`} role="img" aria-label={alt} data-asset={assetKey}>
    {assetKey === "last-light" ? <AfterRain prefix={`${prefix}-light`}/> : assetKey === "cloud-keeper" ? <CloudKeeper/> : assetKey === "quiet-delivery" ? <NightDelivery/> : <SummerRoom/>}
  </div>;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/data.ts">
<![CDATA[export type WorkKey = "last-light" | "cloud-keeper" | "quiet-delivery" | "summer-room";
export type Work = { id: WorkKey; title: string; category: "Worlds" | "Characters"; year: string; description: string; format: string; note: string };
export const WORKS: readonly Work[] = [
  { id: "last-light", title: "Where the light stays", category: "Worlds", year: "2026", description: "A little house at the end of a long summer. An imagined place for the feeling of finally being home.", format: "Environmental illustration", note: "An original world study, with layers of sea air and the last gold of the day." },
  { id: "cloud-keeper", title: "The cloud keeper", category: "Characters", year: "2026", description: "She collects the clouds that get lost on their way to the sea. Her companion is rather less helpful than he thinks.", format: "Original character illustration", note: "Character design, a small story, and a curious little traveling companion." },
  { id: "quiet-delivery", title: "One last delivery", category: "Worlds", year: "2025", description: "The parcels can wait a moment. There's a warm light in the window, and someone has put the kettle on.", format: "Narrative illustration", note: "A quiet vignette about kindness at the end of an ordinary working day." },
  { id: "summer-room", title: "An afternoon, forever", category: "Worlds", year: "2026", description: "An open window, a sleeping cat, and absolutely nowhere else to be. Some adventures are very small.", format: "Interior illustration", note: "A personal study of the everyday places we wish we could keep forever." },
];
export const PACKAGES = [
  { id: "portrait", name: "A familiar face", kind: "Character portrait", price: 120, time: "1–2 weeks", description: "Your character, your favorite person, or a version of you from another world.", includes: ["One character, bust or waist-up", "A simple atmospheric background", "Two sketch revisions", "High-resolution digital file"] },
  { id: "moment", name: "A little moment", kind: "Character + a story", price: 280, time: "2–3 weeks", description: "A character in a place that means something. A memory, a daydream, a small adventure.", includes: ["One full-body character", "An illustrated setting & little details", "Two sketch revisions", "High-resolution digital file"] },
  { id: "world", name: "A world of your own", kind: "Full scene illustration", price: 560, time: "3–5 weeks", description: "Let's build somewhere you've never been, but somehow already miss.", includes: ["An intricate, full illustrated scene", "Up to two characters", "Three sketch revisions", "High-resolution file + wallpaper crop"] },
] as const;
export type PackageId = typeof PACKAGES[number]["id"];
export const PROCESS = [
  { title: "Tell me your daydream", text: "Share your idea, references, and the feeling you're hoping for. A messy description is a perfectly good start." },
  { title: "Find the shape of it", text: "I'll confirm the scope and quote. A 50% deposit reserves your place, then we explore the first sketches." },
  { title: "A little back-and-forth", text: "We refine your favorite sketch together. You'll see the colors take shape before the finishing touches." },
  { title: "A world, all yours", text: "After the remaining balance, your high-resolution artwork arrives, ready to keep, gift, or make your wallpaper." },
] as const;
]]>
    </file>
    <file path="src/app/(mio)/mio/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#232C49"/><g fill="none" stroke="#EDAD83" stroke-width="2"><path d="M25 10q7-5 14 0l5 28q-12 6-24 0Z"/><path d="M25 10q7 4 14 0M20 38q12-5 24 0M32 13v24m0 6q-5 4 0 8M9 55q7-5 15 0t16 0 15 0"/></g></svg>
]]>
    </file>
    <file path="src/app/(mio)/mio/mio.css">
<![CDATA[@import "tailwindcss";

@theme static {
  --mh-ink: #232C49;
  --mh-paper: #F5EFE4;
  --mh-hydrangea: #A8B1D1;
  --mh-sea: #526D89;
  --mh-apricot: #EDAD83;
  --mh-coral: #BC6268;
  --mh-plum: #654C65;
  --mh-cloud: #D8CAD9;
  --font-mh-display: var(--font-mh-kaisei), Georgia, serif;
  --font-mh-body: var(--font-mh-karla), sans-serif;
  --font-mh-utility: var(--font-mh-inconsolata), monospace;
  --ease-mh-out: cubic-bezier(.23, 1, .32, 1);
  --ease-mh-expo: cubic-bezier(.16, 1, .3, 1);
  --ease-mh-in-out: cubic-bezier(.77, 0, .175, 1);
  --ease-mh-spring: linear(0, .35 8%, .82 20%, 1.06 30%, 1.02 42%, .99 58%, 1);
  --dur-mh-instant: 90ms;
  --dur-mh-fast: 180ms;
  --dur-mh-base: 420ms;
  --dur-mh-slow: 800ms;
  --dur-mh-hero: 1200ms;
  --mh-stagger: 70ms;
  --mh-drift: 24s;
  --mh-sway: 12s;
  --mh-breathe: 18s;
}

html:has(.mh-body) { scroll-padding-top: 100px; scrollbar-color: var(--mh-sea) var(--mh-paper); }
.mh-body { margin: 0; color: var(--mh-ink); background: var(--mh-paper); font-family: var(--font-mh-body); font-size: 17px; line-height: 1.65; -webkit-font-smoothing: antialiased; }
.mh-site { --page-progress: 0; --hero-scroll: 0; --lantern-x: 0px; --lantern-y: 0px; --lantern-rotate: -4deg; overflow: clip; }
.mh-site *, .mh-site *::before, .mh-site *::after { box-sizing: border-box; }
.mh-site ::selection { color: var(--mh-ink); background: var(--mh-apricot); }
.mh-site :where(h1,h2,h3,p,figure) { margin: 0; }
.mh-site :where(a,button,input,select,textarea,summary) { -webkit-tap-highlight-color: transparent; }
.mh-site a { color: inherit; text-decoration: none; }
.mh-site button, .mh-site input, .mh-site select, .mh-site textarea { font: inherit; color: inherit; }
.mh-site button { cursor: pointer; }
.mh-site button:disabled { cursor: wait; opacity: .6; }
.mh-site :where(a,button,summary,input,select,textarea):focus-visible { outline: 2px solid currentColor; outline-offset: 6px; }
.mh-site h1, .mh-site h2, .mh-site h3 { font-family: var(--font-mh-display); font-weight: 400; letter-spacing: -.035em; text-wrap: balance; }
.mh-site h2 { font-size: clamp(36px, 4.2vw, 57px); line-height: 1.28; }
.mh-site h3 { font-size: 27px; line-height: 1.4; }
.mh-site svg { flex-shrink: 0; }
.mh-section { width: min(1240px, calc(100% - 112px)); margin-inline: auto; }
.mh-muted { color: color-mix(in srgb, var(--mh-ink) 78%, var(--mh-paper)); }
.mh-small { font-size: 12px; line-height: 1.7; }
.mh-skip-link { position: fixed; left: 24px; top: 12px; z-index: 100; padding: 12px 20px; color: var(--mh-paper)!important; background: var(--mh-ink); transform: translateY(-170%); }
.mh-skip-link:focus { transform: none; }
.mh-reading-progress { position: fixed; top: 0; left: 0; width: 100%; height: 3px; background: var(--mh-coral); transform: scaleX(var(--page-progress)); transform-origin: left; z-index: 80; pointer-events: none; }

/* The header lives in the sky, then takes on the color of the sketchbook. */
.mh-header { position: fixed; inset: 0 0 auto; height: 104px; padding: 0 clamp(24px, 4.3vw, 72px); display: flex; align-items: center; justify-content: space-between; gap: 28px; z-index: 40; transition: background var(--dur-mh-base) var(--ease-mh-out), transform var(--dur-mh-base) var(--ease-mh-out); }
.mh-header[data-scrolled="true"] { background: var(--mh-paper); border-bottom: 1px solid color-mix(in srgb, var(--mh-ink) 12%, transparent); }
.mh-logo { display: inline-flex; align-items: center; gap: 12px; line-height: 1.15; }
.mh-logo > span { font-family: var(--font-mh-display); font-size: 27px; letter-spacing: -.04em; white-space: nowrap; }
.mh-logo-caption { font-family: var(--font-mh-body); display: block; margin-top: 7px; font-size: 8px; font-weight: 500; letter-spacing: .15em; }
.mh-desktop-nav { display: flex; gap: clamp(22px, 2.6vw, 42px); margin-left: auto; margin-right: clamp(12px, 2.6vw, 45px); font-size: 14px; }
.mh-desktop-nav a { position: relative; padding-block: 8px; }
.mh-desktop-nav a::after, .mh-text-link::after { content: ""; position: absolute; bottom: 3px; left: 0; width: 100%; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: right; transition: transform var(--dur-mh-base) var(--ease-mh-out); }
.mh-desktop-nav a[data-active="true"]::after { transform: scaleX(1); transform-origin: left; }
.mh-header-cta { display: inline-flex; align-items: center; gap: 23px; font-size: 13px; border: 1px solid color-mix(in srgb, var(--mh-ink) 55%, transparent); border-radius: 50px; padding: 12px 20px; transition: background var(--dur-mh-base) var(--ease-mh-out), color var(--dur-mh-base) var(--ease-mh-out), transform var(--dur-mh-instant) var(--ease-mh-spring); }
.mh-mobile-menu { display: none; }

.mh-button { position: relative; isolation: isolate; display: inline-flex; justify-content: center; align-items: center; gap: 27px; padding: 17px 25px; border-radius: 100px; border: 1px solid var(--mh-ink); color: var(--mh-paper)!important; background: var(--mh-ink); font-size: 14px; font-weight: 500; line-height: 1.5; white-space: nowrap; overflow: hidden; transition: color var(--dur-mh-base) var(--ease-mh-out), transform var(--dur-mh-instant) var(--ease-mh-spring); }
.mh-button::before { content: ""; position: absolute; z-index: -1; inset: 0; background: var(--mh-plum); transform: translateX(-102%); transition: transform var(--dur-mh-base) var(--ease-mh-out); border-radius: inherit; }
.mh-button svg, .mh-header-cta svg, .mh-text-link > span { transition: transform var(--dur-mh-base) var(--ease-mh-out); }
.mh-button-outline { background: transparent; color: var(--mh-ink)!important; border-color: color-mix(in srgb, var(--mh-ink) 35%, transparent); }
.mh-button-outline::before { background: var(--mh-ink); }
.mh-button-light { background: var(--mh-apricot); color: var(--mh-ink)!important; border-color: var(--mh-apricot); }
.mh-button-light::before { background: var(--mh-paper); }
.mh-text-link { position: relative; display: inline-flex; align-items: center; gap: 18px; padding-block: 8px; font-size: 14px; line-height: 1.5; background: none; border: 0; }
.mh-text-link::after { transform: scaleX(1); }
.mh-text-link > span { display: inline-block; font-size: 21px; }
.mh-button:active, .mh-header-cta:active, .mh-text-link:active { transform: scale(.97); }

/* All hero imagery is layered, original SVG. */
.mh-hero { position: relative; height: max(820px, 100svh); max-height: 1100px; background: var(--mh-hydrangea); }
.mh-scene { position: absolute; inset: 0; overflow: hidden; }
.mh-harbor { width: 100%; height: 100%; display: block; }
.mh-hero-copy { position: relative; z-index: 2; padding-top: clamp(160px, 19vh, 215px); margin-left: clamp(32px, 6.6vw, 110px); width: 810px; max-width: calc(100% - 90px); }
.mh-availability { display: flex; align-items: center; gap: 9px; font-size: 11px; letter-spacing: .025em; font-weight: 500; }
.mh-availability > span:first-child { width: 6px; height: 6px; border-radius: 50%; background: var(--mh-ink); box-shadow: 0 0 0 4px color-mix(in srgb, var(--mh-ink) 8%, transparent); }
.mh-hero .mh-availability > svg { margin-left: 10px; width: 15px; height: 15px; }
.mh-hero h1 { font-size: clamp(56px, 5.7vw, 88px); line-height: 1.27; margin: 23px 0 24px; }
.mh-line { display: block; overflow: clip; padding-bottom: .08em; margin-bottom: -.08em; }
.mh-line > span { display: block; }
.mh-hero-description { font-size: clamp(16px, 1.26vw, 19px); line-height: 1.75; max-width: 500px; }
.mh-hero-actions { display: flex; align-items: center; gap: 27px; margin-top: 28px; }
.mh-hero-actions .mh-button { padding: 16px 24px; }
.mh-hero-note { margin-top: 19px!important; font-size: 11px; color: color-mix(in srgb, var(--mh-ink) 82%, transparent); }
.mh-hero-bottom { position: absolute; left: clamp(32px, 4.3vw, 72px); right: clamp(32px, 4.3vw, 72px); bottom: 58px; z-index: 3; display: flex; align-items: center; justify-content: space-between; color: var(--mh-paper); font-size: 11px; gap: 20px; }
.mh-scroll-note { display: flex; align-items: center; gap: 14px; }
.mh-scroll-line { height: 31px; width: 1px; display: inline-block; background: currentColor; position: relative; }
.mh-scroll-line::after { content: ""; position: absolute; bottom: 1px; left: -3px; width: 7px; height: 7px; border-bottom: 1px solid; border-right: 1px solid; transform: rotate(45deg); }
.mh-scene-note { position: absolute; left: 50%; transform: translateX(-50%); white-space: nowrap; font-size: 10px; color: var(--mh-paper); }
.mh-scene-control { display: flex; align-items: center; gap: 8px; background: var(--mh-ink); color: var(--mh-paper); border: 1px solid color-mix(in srgb, var(--mh-paper) 35%, transparent); border-radius: 50px; padding: 9px 13px; font-size: 10px; }
.mh-shoreline { position: absolute; inset: auto 0 -1px; height: 45px; pointer-events: none; z-index: 4; }
.mh-shoreline svg, .mh-contact-shore svg { width: 100%; height: 100%; display: block; }
.mh-distant-layer { transform: translateY(calc(var(--hero-scroll) * 25px)); }
.mh-middle-layer { transform: translateY(calc(var(--hero-scroll) * 13px)); }
.mh-lantern-scroll { transform: translate(var(--lantern-x), var(--lantern-y)) rotate(var(--lantern-rotate)); transform-box: fill-box; transform-origin: center; }
.mh-lantern-sway { transform-box: fill-box; transform-origin: 50% 30%; }

/* Open sketchbook: art has room to breathe. */
.mh-works { padding-block: 104px 100px; }
.mh-section-heading { display: flex; justify-content: space-between; align-items: end; gap: 45px; }
.mh-section-heading > :last-child { padding-bottom: 6px; max-width: 445px; }
.mh-section-heading p { font-size: 16px; line-height: 1.8; }
.mh-section-aside { display: block; margin-top: 19px; font-size: 11px; color: color-mix(in srgb, var(--mh-ink) 75%, var(--mh-paper)); }
.mh-work-filters { display: flex; gap: 26px; margin-top: 44px; margin-bottom: 39px; border-bottom: 1px solid color-mix(in srgb, var(--mh-ink) 16%, transparent); }
.mh-work-filters button { background: transparent; border: 0; border-bottom: 1px solid transparent; padding: 0 0 12px; display: flex; align-items: center; gap: 10px; margin-bottom: -1px; font-size: 12px; }
.mh-work-filters button[aria-pressed="true"] { border-bottom-color: var(--mh-ink); }
.mh-filter-dot { width: 4px; height: 4px; border-radius: 50%; background: currentColor; transform: scale(0); transition: transform var(--dur-mh-base) var(--ease-mh-out); }
.mh-work-filters button[aria-pressed="true"] .mh-filter-dot { transform: scale(1); }
.mh-work-grid { display: grid; grid-template-columns: 1.2fr 1fr; column-gap: 65px; row-gap: 36px; align-items: start; }
.mh-work { min-width: 0; position: relative; }
.mh-work:nth-child(2) { margin-top: 99px; }
.mh-work:nth-child(3) { margin-top: -78px; }
.mh-work:nth-child(4) { margin-top: 30px; }
.mh-work-grid[data-filter="Characters"] .mh-work, .mh-work-grid[data-filter="Worlds"] .mh-work { margin-top: 0; }
.mh-work-open { display: block; width: 100%; text-align: left; padding: 0; background: transparent; border: 0; }
.mh-work-art { position: relative; overflow: hidden; border-radius: 4px; transform: translateY(0); transition: transform var(--dur-mh-slow) var(--ease-mh-out); }
.mh-picture { width: 100%; aspect-ratio: 4 / 3; overflow: hidden; background: var(--mh-hydrangea); }
.mh-picture svg { display: block; width: 100%; height: 100%; transition: transform var(--dur-mh-slow) var(--ease-mh-out); }
.mh-work-cloud-keeper .mh-picture, [data-asset="cloud-keeper"] { aspect-ratio: 4 / 5; }
.mh-art-view { position: absolute; right: 18px; bottom: 18px; width: 43px; height: 43px; display: grid; place-items: center; border-radius: 50%; background: var(--mh-paper); opacity: 0; transform: translate(-8px, 8px); transition: opacity var(--dur-mh-base) var(--ease-mh-out), transform var(--dur-mh-base) var(--ease-mh-out); }
.mh-art-view > svg { transform: rotate(-35deg); }
.mh-work-caption { display: flex; align-items: start; justify-content: space-between; gap: 16px; padding-top: 19px; }
.mh-work-title { display: block; font-family: var(--font-mh-display); font-size: 22px; letter-spacing: -.035em; line-height: 1.4; }
.mh-work-category { display: block; margin-top: 5px; font-size: 11px; line-height: 1.5; color: color-mix(in srgb, var(--mh-ink) 78%, var(--mh-paper)); }
.mh-work-year { display: flex; align-items: center; gap: 18px; padding-top: 7px; font-family: var(--font-mh-utility); font-size: 12px; }
.mh-work-year svg { width: 17px; height: 17px; transform: rotate(-35deg); transition: transform var(--dur-mh-base) var(--ease-mh-out); }
.mh-art-annotation { display: flex; align-items: center; justify-content: end; gap: 11px; margin-top: 21px; font-size: 11px; font-style: italic; color: var(--mh-plum); }
.mh-art-annotation svg { width: 76px; height: 17px; }
.mh-work-closing { margin-top: 65px!important; display: flex; justify-content: center; align-items: center; gap: 20px; font-size: 14px; }
.mh-work-closing svg { width: 23px; height: 23px; color: var(--mh-coral); }

/* Native dialog keeps focus and Escape behavior for artwork inspection. */
.mh-work-dialog { color: var(--mh-ink); background: var(--mh-paper); border: 0; border-radius: 6px; padding: 0; width: min(1050px, calc(100vw - 48px)); max-height: calc(100svh - 60px); overflow: auto; }
.mh-work-dialog::backdrop { background: color-mix(in srgb, var(--mh-ink) 78%, transparent); }
.mh-dialog-content { display: grid; grid-template-columns: 1.05fr 1fr; position: relative; }
.mh-dialog-content > .mh-picture { height: 100%; min-height: 520px; aspect-ratio: auto; }
.mh-dialog-content > .mh-picture svg { object-fit: cover; }
.mh-dialog-copy { padding: 70px 38px 40px; }
.mh-dialog-copy h2 { font-size: 36px; margin: 14px 0 20px; }
.mh-dialog-copy p { font-size: 15px; margin: 15px 0; }
.mh-dialog-copy .mh-small { font-size: 11px; }
.mh-dialog-copy .mh-button { font-size: 12px; margin-top: 18px; padding: 15px 20px; gap: 16px; }
.mh-dialog-close { position: absolute; top: 17px; right: 17px; width: 38px; height: 38px; display: grid; place-items: center; z-index: 1; background: var(--mh-paper); border: 1px solid color-mix(in srgb, var(--mh-ink) 25%, transparent); border-radius: 50%; }

.mh-about { display: grid; grid-template-columns: .9fr 1fr; gap: 120px; align-items: center; padding: 91px 35px 121px; border-top: 1px solid color-mix(in srgb, var(--mh-ink) 16%, transparent); }
.mh-portrait-wrap { position: relative; padding-left: 17px; }
.mh-portrait { transform: rotate(-4deg); background: var(--mh-cloud); padding: 9px 9px 20px; }
.mh-portrait div { aspect-ratio: 5 / 6; }
.mh-portrait svg { display: block; width: 100%; height: 100%; }
.mh-portrait figcaption { text-align: center; font-size: 11px; margin-top: 8px; color: var(--mh-plum); }
.mh-portrait-doodle { display: flex; align-items: center; gap: 12px; position: absolute; bottom: -41px; left: 45px; font-size: 12px; font-style: italic; }
.mh-portrait-doodle svg { width: 24px; color: var(--mh-coral); }
.mh-about-copy h2 { font-size: clamp(32px, 3.35vw, 47px); margin-bottom: 26px; }
.mh-about-copy p { font-size: 16px; line-height: 1.85; margin-bottom: 19px; }
.mh-artist-signature { display: flex; align-items: center; gap: 12px; font-family: var(--font-mh-display); font-size: 43px; margin-top: 25px; flex-wrap: wrap; }
.mh-artist-signature span { flex: 0 0 100%; font-size: 11px; font-family: var(--font-mh-body); margin-top: -13px; }

.mh-pricing { padding: 85px 0 80px; border-top: 1px solid color-mix(in srgb, var(--mh-ink) 16%, transparent); }
.mh-pricing .mh-availability { margin-top: 21px; }
.mh-package-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 46px; }
.mh-package-grid > div { display: flex; min-width: 0; }
.mh-package-grid > div > .mh-reveal-inner { display: flex; width: 100%; }
.mh-package { width: 100%; padding: 29px 28px 26px; border: 1px solid color-mix(in srgb, var(--mh-ink) 22%, transparent); border-radius: 5px; display: flex; flex-direction: column; transition: transform var(--dur-mh-base) var(--ease-mh-out); }
.mh-package-featured { background: color-mix(in srgb, var(--mh-cloud) 40%, var(--mh-paper)); }
.mh-package-top { display: flex; justify-content: space-between; align-items: center; min-height: 24px; }
.mh-package-kind { font-size: 11px; }
.mh-package-top svg { width: 19px; height: 19px; color: var(--mh-plum); }
.mh-package h3 { font-size: 25px; margin: 15px 0 16px; }
.mh-package p { font-size: 14px; line-height: 1.8; min-height: 76px; }
.mh-price { display: flex; align-items: baseline; gap: 8px; margin: 25px 0 29px; font-family: var(--font-mh-utility); }
.mh-price span { font-size: 12px; }
.mh-price strong { font-weight: 400; font-size: 48px; line-height: 1; letter-spacing: -.05em; }
.mh-package ul { list-style: none; margin: 0; padding: 23px 0 0; border-top: 1px solid color-mix(in srgb, var(--mh-ink) 15%, transparent); }
.mh-package li { display: flex; align-items: start; gap: 9px; font-size: 12px; line-height: 1.6; margin-bottom: 12px; }
.mh-package li svg { margin-top: 3px; }
.mh-package-time { font-size: 11px; margin: 12px 0 24px; }
.mh-package .mh-button { width: 100%; justify-content: space-between; margin-top: auto; font-size: 13px; padding: 14px 20px; }
.mh-pricing-note { display: flex; justify-content: space-between; gap: 32px; margin-top: 28px; font-size: 11px; line-height: 1.9; }
.mh-pricing-note > :last-child { text-align: right; }

.mh-process { padding: 65px 0 105px; }
.mh-process h2 { font-size: clamp(33px, 3.5vw, 48px); }
.mh-process-list { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; list-style: none; margin: 48px 0 0; padding: 0; }
.mh-process-line { display: flex; align-items: center; gap: 15px; padding-right: 6px; margin-bottom: 19px; }
.mh-process-line span { font-family: var(--font-mh-utility); font-size: 11px; }
.mh-process-line svg { width: calc(100% - 32px); height: 20px; opacity: .4; }
.mh-process-list h3 { font-family: var(--font-mh-body); font-size: 15px; font-weight: 600; letter-spacing: -.02em; line-height: 1.6; margin-bottom: 12px; }
.mh-process-list p { font-size: 13px; line-height: 1.85; }

.mh-contact { position: relative; background: var(--mh-ink); color: var(--mh-paper); padding-top: 80px; }
.mh-contact-shore { position: absolute; top: -1px; left: 0; right: 0; height: 45px; }
.mh-contact-inner { display: grid; grid-template-columns: .9fr 1.1fr; gap: 110px; padding-block: 58px 95px; }
.mh-contact-copy h2 { color: var(--mh-apricot); font-size: clamp(42px, 4.25vw, 60px); }
.mh-contact-copy p { margin-top: 25px; font-size: 18px; }
.mh-contact-copy .mh-contact-note { font-size: 13px; line-height: 1.9; margin-top: 20px; color: color-mix(in srgb, var(--mh-paper) 80%, var(--mh-ink)); }
.mh-contact-illustration { width: 270px; height: 155px; position: relative; margin-top: 27px; color: var(--mh-apricot); }
.mh-contact-illustration > svg:first-child { width: 100%; height: 100%; opacity: .5; }
.mh-contact-illustration > svg:nth-child(2) { position: absolute; left: 185px; top: 0; width: 49px; height: 69px; transform: rotate(10deg); }
.mh-contact-illustration > svg:last-child { position: absolute; left: 30px; top: 35px; width: 16px; height: 16px; }
.mh-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; }
.mh-field { margin-bottom: 27px; min-width: 0; }
.mh-field label { display: block; font-size: 12px; margin-bottom: 10px; }
.mh-field input, .mh-field select, .mh-field textarea { display: block; width: 100%; padding: 13px 0 14px; background: transparent; border: 0; border-bottom: 1px solid color-mix(in srgb, var(--mh-paper) 35%, transparent); border-radius: 0; color: var(--mh-paper); font-size: 14px; line-height: 1.7; caret-color: var(--mh-apricot); transition: border-color var(--dur-mh-fast) var(--ease-mh-out); }
.mh-field textarea { resize: vertical; min-height: 125px; }
.mh-field select { cursor: pointer; }
.mh-field select option { background: var(--mh-ink); color: var(--mh-paper); }
.mh-field :is(input,textarea)::placeholder { color: color-mix(in srgb, var(--mh-paper) 67%, var(--mh-ink)); opacity: 1; }
.mh-field :is(input,select,textarea):focus-visible { outline-color: var(--mh-apricot); outline-offset: 5px; border-bottom-color: var(--mh-apricot); }
.mh-field:focus-within label { color: var(--mh-apricot); }
.mh-field-hint { font-size: 10px; color: color-mix(in srgb, var(--mh-paper) 75%, var(--mh-ink)); display: block; margin-top: 8px; }
.mh-error { display: block; margin-top: 10px; color: var(--mh-apricot); font-size: 12px; line-height: 1.6; }
.mh-field [aria-invalid="true"] { border-bottom-color: var(--mh-apricot); }
.mh-submit-row { display: flex; align-items: center; justify-content: space-between; gap: 17px; margin-top: 8px; }
.mh-submit-row > span { font-size: 10px; line-height: 1.7; }
.mh-submit-row .mh-button { padding: 16px 22px; gap: 23px; font-size: 13px; }
.mh-form-disclaimer { font-size: 10px; line-height: 1.8; color: color-mix(in srgb, var(--mh-paper) 73%, var(--mh-ink)); margin-top: 19px!important; }
.mh-form-success { padding-top: 23px; outline: none; }
.mh-success-lantern { color: var(--mh-apricot); height: 80px; margin-bottom: 20px; }
.mh-success-lantern svg { width: 54px; height: 75px; }
.mh-form-success h3 { color: var(--mh-apricot); font-size: 34px; margin-bottom: 24px; }
.mh-form-success > p { font-size: 14px; }
.mh-form-success .mh-form-disclaimer { max-width: 390px; font-size: 12px; }
.mh-form-success .mh-button { margin-top: 25px; }
.mh-form-success > .mh-text-link { display: flex; margin-top: 10px; font-size: 12px; }
.mh-brief-preview { margin-top: 25px; }
.mh-brief-preview summary { font-size: 12px; cursor: pointer; }
.mh-brief-preview pre { white-space: pre-wrap; overflow-wrap: anywhere; font-family: var(--font-mh-body); font-size: 12px; padding-top: 20px; }

.mh-faq { padding: 100px 0; display: grid; grid-template-columns: .9fr 1.1fr; gap: 110px; }
.mh-faq h2 { font-size: clamp(33px, 3.3vw, 46px); }
.mh-faq-item { border-bottom: 1px solid color-mix(in srgb, var(--mh-ink) 19%, transparent); }
.mh-faq-item summary { list-style: none; cursor: pointer; font-size: 14px; padding: 21px 0; display: flex; align-items: center; justify-content: space-between; gap: 22px; }
.mh-faq-item summary::-webkit-details-marker { display: none; }
.mh-faq-item summary > span { width: 15px; height: 15px; display: grid; place-items: center; position: relative; flex-shrink: 0; }
.mh-faq-item summary i { position: absolute; height: 1px; width: 13px; background: var(--mh-ink); transition: transform var(--dur-mh-base) var(--ease-mh-out); }
.mh-faq-item summary i:last-child { transform: rotate(90deg); }
.mh-faq-item[open] summary i:last-child { transform: rotate(0); }
.mh-faq-answer p { padding-bottom: 24px; font-size: 13px; line-height: 1.85; }
@supports (interpolate-size: allow-keywords) {
  .mh-faq-item { interpolate-size: allow-keywords; }
  .mh-faq-item::details-content { block-size: 0; overflow: clip; transition: block-size var(--dur-mh-base) var(--ease-mh-out), content-visibility var(--dur-mh-base) allow-discrete; }
  .mh-faq-item[open]::details-content { block-size: auto; }
}
.mh-footer { position: relative; background: var(--mh-paper); overflow: clip; }
.mh-footer-inner { position: relative; z-index: 1; padding-top: 24px; }
.mh-footer-line { height: 1px; background: color-mix(in srgb, var(--mh-ink) 18%, transparent); }
.mh-footer-grid { display: grid; grid-template-columns: 1.5fr .75fr .75fr; gap: 70px; padding: 56px 0 58px; }
.mh-footer-brand > .mh-reveal-inner { display: grid; gap: 20px; align-content: start; justify-items: start; }
.mh-footer-brand p { font-size: 13px; line-height: 1.8; max-width: 330px; }
.mh-footer-brand .mh-availability { margin-top: 6px; }
.mh-footer-label { margin-bottom: 14px; font-family: var(--font-mh-utility); font-size: 10px; letter-spacing: .14em; text-transform: uppercase; color: color-mix(in srgb, var(--mh-ink) 75%, var(--mh-paper)); }
.mh-footer ul { display: grid; gap: 4px; margin: 0; padding: 0; list-style: none; }
.mh-footer-link { position: relative; display: inline-block; padding-block: 6px; font-size: 13px; }
.mh-footer-link::after { content: ""; position: absolute; bottom: 4px; left: 0; width: 100%; height: 1px; background: currentColor; transform: scaleX(0); transform-origin: right; transition: transform var(--dur-mh-base) var(--ease-mh-out); }
.mh-footer-bottom { display: flex; justify-content: space-between; align-items: center; gap: 25px; padding-bottom: 38px; font-size: 11px; }
.mh-footer-bottom > span { margin-right: auto; }
.mh-back-top, .mh-footer-cta { display: flex; align-items: center; gap: 12px; font-size: 12px; }
.mh-footer-cta { font-weight: 600; }
.mh-footer-bottom svg { width: 16px; height: 16px; transition: transform var(--dur-mh-base) var(--ease-mh-out); }
.mh-back-top svg { transform: rotate(-90deg); }
.mh-footer-scene { position: relative; height: clamp(210px, 25vw, 360px); margin-top: -10px; pointer-events: none; }
.mh-footer-art { display: block; width: 100%; height: 100%; -webkit-mask-image: linear-gradient(to bottom, transparent 0, black 48%); mask-image: linear-gradient(to bottom, transparent 0, black 48%); }

@media (hover: hover) and (pointer: fine) {
  .mh-desktop-nav a:hover::after, .mh-text-link:hover::after { transform: scaleX(1); transform-origin: left; }
  .mh-header-cta:hover { background: var(--mh-ink); color: var(--mh-paper); }
  .mh-button:hover::before { transform: translateX(0); }
  .mh-button-outline:hover { color: var(--mh-paper)!important; }
  .mh-button:hover svg, .mh-header-cta:hover svg { transform: translateX(4px); }
  .mh-text-link:hover > span { transform: translate(3px, 3px); }
  .mh-work-open:hover .mh-work-art { transform: translateY(-5px); }
  .mh-work-open:hover .mh-picture svg { transform: scale(1.035); }
  .mh-work-open:hover .mh-art-view { opacity: 1; transform: translate(0); }
  .mh-work-open:hover .mh-work-year svg { transform: rotate(-35deg) translateX(4px); }
  .mh-package:hover { transform: translateY(-5px); }
  .mh-faq-item summary:hover { color: var(--mh-plum); }
  .mh-back-top:hover svg { transform: rotate(-90deg) translateX(5px); }
  .mh-footer-link:hover::after { transform: scaleX(1); transform-origin: left; }
  .mh-footer-cta:hover svg { transform: translateX(5px); }
}
.mh-footer-link:active, .mh-footer-cta:active, .mh-back-top:active { transform: scale(.97); }
.mh-work-open:focus-visible .mh-art-view { opacity: 1; transform: none; }
.mh-work-open:active .mh-work-art { transform: scale(.985); }
.mh-scene-control:active { transform: scale(.97); }

@media (prefers-reduced-motion: no-preference) {
  .mh-header { animation: mh-nav-enter var(--dur-mh-slow) var(--ease-mh-expo) both; animation-delay: calc(var(--mh-stagger) * 2); }
  .mh-hero .mh-availability { animation: mh-rise var(--dur-mh-slow) var(--ease-mh-expo) both; animation-delay: calc(var(--mh-stagger) * 3); }
  .mh-line > span { animation: mh-unfurl var(--dur-mh-hero) var(--ease-mh-expo) both; animation-delay: calc(var(--mh-stagger) * 4); }
  .mh-line:nth-child(2) > span { animation-delay: calc(var(--mh-stagger) * 5); }
  .mh-hero-description, .mh-hero-actions, .mh-hero-note { animation: mh-rise var(--dur-mh-slow) var(--ease-mh-expo) both; animation-delay: calc(var(--mh-stagger) * 8); }
  .mh-hero-actions { animation-delay: calc(var(--mh-stagger) * 9); }
  .mh-hero-note { animation-delay: calc(var(--mh-stagger) * 10); }
  .mh-clouds { animation: mh-drift var(--mh-drift) ease-in-out infinite alternate; }
  .mh-lantern-sway { animation: mh-sway var(--mh-sway) ease-in-out infinite alternate; }
  .mh-foreground-grass { transform-origin: bottom left; animation: mh-grass var(--mh-breathe) ease-in-out infinite alternate; }
  .mh-footer-lantern { transform-box: fill-box; transform-origin: 50% 0; animation: mh-float 9s ease-in-out infinite alternate; }
  [data-mh-reveal][data-observed="true"] { transition: transform var(--dur-mh-slow) var(--ease-mh-expo), opacity var(--dur-mh-slow) var(--ease-mh-out), clip-path var(--dur-mh-slow) var(--ease-mh-in-out); transition-delay: calc(var(--i, 0) * var(--mh-stagger)); }
  [data-mh-reveal="rise"][data-observed="true"]:not([data-in="true"]) { opacity: 0; transform: translateY(24px); }
  [data-mh-reveal][data-observed="true"] > .mh-reveal-inner { transition: transform var(--dur-mh-slow) var(--ease-mh-expo), clip-path var(--dur-mh-slow) var(--ease-mh-in-out); transition-delay: calc(var(--i, 0) * var(--mh-stagger)); }
  [data-mh-reveal="mask"][data-observed="true"]:not([data-in="true"]) > .mh-reveal-inner { clip-path: inset(0 0 100% 0); transform: translateY(15px); }
  [data-mh-reveal="wipe"][data-observed="true"]:not([data-in="true"]) > .mh-reveal-inner { clip-path: inset(0 100% 0 0); }
  [data-mh-reveal="scale"][data-observed="true"]:not([data-in="true"]) { opacity: 0; transform: translateY(28px) scale(.97); }
  [data-mh-reveal="draw"][data-observed="true"] > .mh-reveal-inner { transform-origin: left; }
  [data-mh-reveal="draw"][data-observed="true"]:not([data-in="true"]) > .mh-reveal-inner { transform: scaleX(0); }
  .mh-work-dialog[open] { animation: mh-dialog-in var(--dur-mh-base) var(--ease-mh-expo); }
  .mh-form-success { animation: mh-rise var(--dur-mh-slow) var(--ease-mh-out) both; }
  .mh-success-lantern svg { animation: mh-lantern-release var(--dur-mh-hero) var(--ease-mh-expo) both; }
  .mh-field [aria-invalid="true"] { animation: mh-shake var(--dur-mh-base) var(--ease-mh-out); }
  .mh-error { animation: mh-rise var(--dur-mh-base) var(--ease-mh-out); }
}
.mh-site[data-paused="true"] .mh-ambient, .mh-site[data-hidden="true"] .mh-ambient, [data-mh-ambient][data-visible="false"] .mh-ambient { animation-play-state: paused!important; }
@keyframes mh-nav-enter { from { opacity: 0; transform: translateY(-15px); } to { opacity: 1; transform: none; } }
@keyframes mh-unfurl { from { transform: translateY(110%); } to { transform: translateY(0); } }
@keyframes mh-rise { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: none; } }
@keyframes mh-drift { from { transform: translateX(-4px); } to { transform: translateX(20px); } }
@keyframes mh-sway { from { rotate: -5deg; } to { rotate: 6deg; } }
@keyframes mh-float { from { transform: translate(-6px, 7px) rotate(-3deg); } to { transform: translate(8px, -9px) rotate(3deg); } }
@keyframes mh-grass { from { transform: skewX(-.5deg); } to { transform: skewX(.8deg); } }
@keyframes mh-dialog-in { from { opacity: 0; transform: translateY(20px) scale(.985); } to { opacity: 1; transform: none; } }
@keyframes mh-shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 60% { transform: translateX(4px); } }
@keyframes mh-lantern-release { from { opacity: 0; transform: translate(-15px, 35px) rotate(-10deg); } to { opacity: 1; transform: translate(0, 0) rotate(4deg); } }

@media (min-width: 1700px) { .mh-hero-copy { margin-left: calc((100vw - 1390px) / 2); } }
@media (max-width: 1180px) {
  .mh-header { gap: 18px; padding-inline: 32px; }
  .mh-desktop-nav { gap: 23px; margin-right: 7px; font-size: 12px; }
  .mh-header-cta { padding: 11px 16px; font-size: 11px; gap: 15px; }
  .mh-logo > span { font-size: 25px; }
  .mh-logo-caption { font-size: 7px; }
  .mh-hero-copy { margin-left: 55px; padding-top: 174px; }
  .mh-hero h1 { font-size: 65px; }
  .mh-hero-actions { gap: 23px; }
  .mh-hero-actions .mh-button, .mh-hero-actions .mh-text-link { font-size: 12px; }
  .mh-scene-note { display: none; }
  .mh-work-grid { column-gap: 38px; }
  .mh-section { width: calc(100% - 80px); }
  .mh-about { gap: 65px; padding-inline: 10px; }
  .mh-package { padding: 25px 20px; }
  .mh-package h3 { font-size: 22px; }
  .mh-package p { min-height: 95px; }
  .mh-contact-inner, .mh-faq { gap: 65px; }
  .mh-submit-row { align-items: start; flex-direction: column; }
}
@media (max-width: 900px) {
  .mh-desktop-nav { display: none; }
  .mh-header-cta { margin-left: auto; }
  .mh-mobile-menu { display: block; }
  .mh-mobile-menu summary { list-style: none; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 6px; cursor: pointer; }
  .mh-mobile-menu summary::-webkit-details-marker { display: none; }
  .mh-mobile-menu summary > span { display: block; width: 21px; height: 1px; background: var(--mh-ink); transition: transform var(--dur-mh-base) var(--ease-mh-out); }
  .mh-mobile-menu[open] summary > span:first-child { transform: translateY(3.5px) rotate(45deg); }
  .mh-mobile-menu[open] summary > span:last-child { transform: translateY(-3.5px) rotate(-45deg); }
  .mh-mobile-menu nav { position: absolute; top: 90px; left: 24px; right: 24px; padding: 15px 24px; background: var(--mh-paper); border: 1px solid color-mix(in srgb, var(--mh-ink) 20%, transparent); border-radius: 5px; }
  .mh-mobile-menu nav a { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; font-size: 16px; }
  .mh-mobile-menu nav a + a { border-top: 1px solid color-mix(in srgb, var(--mh-ink) 10%, transparent); }
  .mh-hero h1 { font-size: 57px; }
  .mh-hero-copy { margin-left: 40px; }
  .mh-hero-description { font-size: 16px; }
  .mh-hero-actions { align-items: start; flex-direction: column; gap: 8px; }
  .mh-hero-note { display: none; }
  .mh-about { gap: 45px; }
  .mh-package-grid { gap: 12px; }
  .mh-package { padding: 24px 15px; }
  .mh-package h3 { font-size: 20px; }
  .mh-package p { font-size: 12px; min-height: 90px; }
  .mh-package li { font-size: 11px; }
  .mh-package .mh-button { font-size: 11px; padding: 13px 15px; gap: 5px; }
  .mh-process-list { gap: 22px; }
  .mh-process-list h3 { font-size: 13px; }
  .mh-process-list p { font-size: 12px; }
  .mh-footer-grid { gap: 40px; }
}
@media (max-width: 760px) {
  html:has(.mh-body) { scroll-padding-top: 92px; }
  .mh-body { font-size: 16px; }
  .mh-section { width: calc(100% - 44px); }
  .mh-header { height: 85px; padding-inline: 22px; gap: 8px; }
  .mh-logo { gap: 8px; }
  .mh-logo > svg { width: 31px; height: 36px; }
  .mh-logo > span { font-size: 24px; }
  .mh-logo-caption { font-size: 6px; margin-top: 6px; letter-spacing: .14em; }
  .mh-header-cta { font-size: 0; width: 38px; height: 38px; padding: 0; justify-content: center; gap: 0; border: 0; }
  .mh-header-cta svg { width: 20px; }
  .mh-mobile-menu summary { width: 32px; }
  .mh-mobile-menu nav { top: 78px; left: 16px; right: 16px; }
  .mh-hero { height: 910px; max-height: none; min-height: 100svh; }
  .mh-harbor { width: 1120px; height: 700px; max-width: none; position: absolute; right: -100px; bottom: 0; }
  .mh-scene { background: var(--mh-hydrangea); }
  .mh-hero-copy { padding-top: 138px; margin-left: 24px; max-width: calc(100% - 45px); width: 540px; }
  .mh-hero .mh-availability { font-size: 10px; gap: 9px; }
  .mh-hero .mh-availability > svg { margin-left: 5px; width: 13px; }
  .mh-hero h1 { font-size: clamp(37px, 9.7vw, 55px); line-height: 1.3; margin-top: 19px; margin-bottom: 20px; }
  .mh-hero-description { font-size: 14px; line-height: 1.9; max-width: 315px; }
  .mh-desktop-break { display: none; }
  .mh-hero-actions { gap: 10px; margin-top: 23px; }
  .mh-hero-actions .mh-button { font-size: 12px; padding: 14px 21px; }
  .mh-hero-actions .mh-text-link { font-size: 11px; }
  .mh-hero-bottom { left: 24px; right: 24px; bottom: 48px; font-size: 10px; }
  .mh-scroll-note { gap: 11px; }
  .mh-scene-control { font-size: 9px; padding: 8px 10px; }
  .mh-shoreline { height: 31px; }
  .mh-works { padding-block: 58px 65px; }
  .mh-section-heading { display: block; }
  .mh-section-heading h2 { font-size: 38px; }
  .mh-section-heading > :last-child { margin-top: 23px; padding: 0; }
  .mh-section-heading p { font-size: 14px; }
  .mh-section-heading p br { display: none; }
  .mh-section-aside { margin-top: 12px; font-size: 10px; }
  .mh-work-filters { margin-top: 30px; margin-bottom: 28px; gap: 24px; }
  .mh-work-filters button { font-size: 11px; }
  .mh-work-grid { display: block; }
  .mh-work { margin: 0 0 39px!important; }
  .mh-work-cloud-keeper { width: 84%; margin-left: auto!important; }
  .mh-work-summer-room { width: 93%; margin-left: auto!important; }
  .mh-work-title { font-size: 22px; }
  .mh-work-caption { padding-top: 15px; }
  .mh-work-category { font-size: 10px; }
  .mh-work-year { font-size: 11px; }
  .mh-art-annotation { margin-top: 13px; font-size: 10px; }
  .mh-art-view { opacity: 1; transform: none; width: 34px; height: 34px; bottom: 12px; right: 12px; }
  .mh-art-view svg { width: 17px; }
  .mh-work-closing { margin-top: 10px!important; font-size: 12px; gap: 13px; text-align: left; }
  .mh-work-closing svg { width: 19px; }
  .mh-work-dialog { width: calc(100vw - 28px); max-height: calc(100svh - 40px); }
  .mh-dialog-content { display: block; }
  .mh-dialog-content > .mh-picture { height: auto; min-height: 0; aspect-ratio: 4/3; }
  .mh-dialog-content > .mh-picture[data-asset="cloud-keeper"] { aspect-ratio: 4/5; }
  .mh-dialog-copy { padding: 28px 24px; }
  .mh-dialog-copy h2 { font-size: 30px; }
  .mh-dialog-copy p { font-size: 14px; }
  .mh-dialog-copy .mh-button { white-space: normal; }
  .mh-dialog-close { top: 12px; right: 12px; }
  .mh-about { grid-template-columns: 1fr; gap: 65px; padding: 60px 0 65px; }
  .mh-portrait-wrap { width: 80%; max-width: 350px; margin: 0 auto; padding-left: 0; }
  .mh-portrait-doodle { font-size: 10px; bottom: -35px; left: 15px; }
  .mh-about-copy h2 { font-size: 36px; }
  .mh-about-copy p { font-size: 15px; line-height: 1.9; }
  .mh-artist-signature { margin-top: 17px; }
  .mh-pricing { padding: 58px 0 35px; }
  .mh-pricing .mh-availability { font-size: 10px; margin-top: 18px; }
  .mh-package-grid { grid-template-columns: 1fr; gap: 18px; margin-top: 32px; }
  .mh-package { padding: 27px; }
  .mh-package h3 { font-size: 29px; margin-top: 13px; }
  .mh-package-kind { font-size: 11px; }
  .mh-package p { font-size: 14px; min-height: 0; }
  .mh-price { margin: 23px 0; }
  .mh-price strong { font-size: 47px; }
  .mh-package li { font-size: 12px; }
  .mh-package .mh-button { font-size: 13px; padding: 14px 20px; }
  .mh-package-time { font-size: 11px; }
  .mh-pricing-note { flex-direction: column; gap: 12px; font-size: 10px; }
  .mh-pricing-note > :last-child { text-align: left; }
  .mh-process { padding-block: 45px 65px; }
  .mh-process h2 { font-size: 35px; }
  .mh-process-list { grid-template-columns: 1fr 1fr; column-gap: 24px; row-gap: 28px; margin-top: 31px; }
  .mh-process-list h3 { font-size: 14px; }
  .mh-process-list p { font-size: 12px; }
  .mh-process-line { margin-bottom: 13px; }
  .mh-contact { padding-top: 45px; }
  .mh-contact-shore { height: 26px; }
  .mh-contact-inner { grid-template-columns: 1fr; gap: 34px; padding-block: 36px 60px; }
  .mh-contact-copy h2 { font-size: 43px; }
  .mh-contact-copy p { font-size: 17px; margin-top: 23px; }
  .mh-contact-copy .mh-contact-note { font-size: 12px; }
  .mh-contact-illustration { position: absolute; width: 120px; height: 80px; right: 20px; top: 190px; opacity: .6; }
  .mh-contact-illustration > svg:nth-child(2) { left: 75px; width: 29px; height: 43px; }
  .mh-contact-illustration > svg:last-child { width: 10px; left: 13px; top: 18px; }
  .mh-form-row { gap: 18px; }
  .mh-field { margin-bottom: 25px; }
  .mh-field label { font-size: 11px; }
  .mh-field input, .mh-field select, .mh-field textarea { font-size: 16px; }
  .mh-field input::placeholder { font-size: 13px; }
  .mh-field select { font-size: 13px; }
  .mh-field textarea { font-size: 14px; }
  .mh-submit-row { align-items: center; flex-direction: row; }
  .mh-submit-row .mh-button { font-size: 12px; gap: 14px; padding: 14px 18px; }
  .mh-submit-row > span { font-size: 8px; }
  .mh-form-disclaimer { font-size: 9px; }
  .mh-faq { grid-template-columns: 1fr; gap: 25px; padding-block: 60px; }
  .mh-faq h2 { font-size: 35px; }
  .mh-faq-item summary { font-size: 13px; padding-block: 19px; }
  .mh-footer-grid { grid-template-columns: 1fr 1fr; gap: 34px 20px; padding: 38px 0 36px; }
  .mh-footer-brand { grid-column: 1 / -1; }
  .mh-footer-brand p { font-size: 12px; }
  .mh-footer-link { font-size: 12px; }
  .mh-footer-bottom { flex-wrap: wrap; align-items: start; row-gap: 14px; padding-bottom: 28px; font-size: 10px; }
  .mh-footer-bottom > span { width: 100%; }
  .mh-back-top, .mh-footer-cta { gap: 9px; font-size: 11px; }
  .mh-footer-scene { height: 190px; }
}
@media (max-width: 370px) {
  .mh-hero-copy { margin-left: 22px; }
  .mh-hero h1 { font-size: 35px; }
  .mh-submit-row { align-items: start; flex-direction: column; }
  .mh-submit-row > span { font-size: 10px; }
  .mh-package { padding: 22px; }
}
@media (prefers-reduced-motion: reduce) {
  html:has(.mh-body) { scroll-behavior: auto!important; }
  .mh-site *, .mh-site *::before, .mh-site *::after, .mh-site *::backdrop { animation: none!important; transition: none!important; scroll-behavior: auto!important; }
  .mh-distant-layer, .mh-middle-layer, .mh-lantern-scroll { transform: none!important; }
  [data-mh-reveal], .mh-reveal-inner { opacity: 1!important; transform: none!important; clip-path: none!important; }
  .mh-scene-control { display: none; }
}
]]>
    </file>
    <file path="src/app/(mio)/mio/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";
export const alt = "Mio Hazuki — Little worlds, made just for you";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: "#A8B1D1", color: "#232C49" }}><div style={{ fontSize: 26, display: "flex" }}>mio hazuki · illustration & little worlds</div><div style={{ fontFamily: "serif", fontSize: 86, lineHeight: 1.14, display: "flex", flexDirection: "column" }}><span>A little wonder,</span><span>made just for you.</span></div><div style={{ display: "flex", justifyContent: "space-between", fontSize: 22 }}><span>Original illustrations · Personal commissions</span><span>Come dream a little →</span></div></div>, size);
}
]]>
    </file>
    <file path="src/app/(mio)/mio/page.tsx">
<![CDATA[import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Works } from "./sections/Works";
import { About } from "./sections/About";
import { Pricing } from "./sections/Pricing";
import { Process } from "./sections/Process";
import { Contact } from "./sections/Contact";
import { Faq } from "./sections/Faq";
import { Footer } from "./sections/Footer";
import { MotionDirector } from "./motion/MotionDirector";
import { SmoothScroll } from "./motion/SmoothScroll";
export default function MioPage() {
  return <div className="mh-site"><a className="mh-skip-link" href="#main">Skip to content</a><div className="mh-reading-progress" aria-hidden="true"/><Header/><main id="main"><Hero/><Works/><About/><Pricing/><Process/><Contact/><Faq/></main><Footer/><MotionDirector/><SmoothScroll/></div>;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/art/AfterRain.tsx">
<![CDATA[export function AfterRain({ prefix }: { prefix: string }) {
  return <svg viewBox="0 0 800 600" fill="none" aria-hidden="true">
    <defs><linearGradient id={`${prefix}-sky`} x2="0" y2="1"><stop stopColor="var(--mh-hydrangea)"/><stop offset="1" stopColor="var(--mh-apricot)"/></linearGradient><linearGradient id={`${prefix}-sea`} x2="0" y2="1"><stop stopColor="var(--mh-cloud)"/><stop offset="1" stopColor="var(--mh-sea)"/></linearGradient></defs>
    <path fill={`url(#${prefix}-sky)`} d="M0 0h800v600H0z"/>
    <path d="M-60 113c46-40 70-12 99-20C26 60 62 36 96 53c10-50 76-52 100-10 31-13 68 5 68 28 51-7 70 25 78 40-99 20-228 25-402 2Zm460 97c38-27 61-12 78-23-8-19 10-38 31-34 30-38 66-27 77 3 34-18 65-3 62 20 24-5 45 5 54 21-89 18-203 23-302 13Z" fill="var(--mh-paper)" opacity=".7"/>
    <circle cx="627" cy="140" r="32" fill="var(--mh-paper)" opacity=".7"/>
    <path d="m0 342 98-65 82 24 131-93 122 74 84-37 112 78 101-31 70 40v162H0Z" fill="var(--mh-hydrangea)"/>
    <path d="m0 358 130-38 71 17 70-38 90 41 161-43 100 51 178-29v161H0Z" fill="var(--mh-sea)" opacity=".5"/>
    <path d="M0 368q192 1 360-9t440 9v232H0Z" fill={`url(#${prefix}-sea)`}/>
    <path d="m0 388 126 2m20 26 147 2m-91 38 121 1m40-73 190 2m-88 42 228 3M39 509l264 5m125-30 184 2m-111 41 239 3" stroke="var(--mh-paper)" opacity=".5" strokeWidth="2" strokeLinecap="round"/>
    <path d="M800 324c-82-20-128 8-176 55-41 40-84 52-138 75-69 31-119 75-155 146h469Z" fill="var(--mh-plum)"/>
    <path d="M800 313c-82-20-140 10-189 61-40 41-79 55-135 82l-3 19c108-10 142-59 228-63 27-1 61 18 99 17Z" fill="var(--mh-sea)"/>
    <path d="M699 406c-71 49-60 81-127 109-68 28-66 54-88 85h49c-4-38 23-49 58-59 85-24 53-67 131-110Z" fill="var(--mh-apricot)"/>
    <g transform="translate(574 199)" stroke="var(--mh-ink)" strokeWidth="2" strokeLinejoin="round"><path d="M-3 98 68 23l100 23 30 61-30 12-97-65-58 62Z" fill="var(--mh-plum)"/><path d="m69 31-58 70h118l38-55 26 52 8 17-43 4-87-65-58 62-16-18Z" fill="var(--mh-coral)"/><path d="M15 105h115v99H15Z" fill="var(--mh-paper)"/><path d="m130 105 53 10v89h-53Z" fill="var(--mh-cloud)"/><path d="M30 126h35v42H30Zm55-2h30v43H85Z" fill="var(--mh-apricot)"/><path d="M48 127v40m-18-20h35m35-23v43M43 183h29v21H43"/><path d="M144 140h25v35h-25Z" fill="var(--mh-apricot)"/><path d="m15 177 115-3 55 11-9 8-46-10-115 2Z" fill="var(--mh-plum)"/><path d="M9 205h179M25 209h70"/><path d="M129 0h18v45h-18Z" fill="var(--mh-plum)"/><path d="m25 83 92-4M35 70l89-4M45 57l88-4M54 45l65 1" opacity=".4"/></g>
    <g transform="translate(569 465)" stroke="var(--mh-ink)" strokeWidth="2"><circle cy="-19" r="6" fill="var(--mh-plum)"/><path d="m-6-11-5 25h22L6-11Z" fill="var(--mh-coral)"/><path d="m-4 14-2 14m10-14 3 14m-14-36-7 17m23-18 8 15"/></g>
    <g stroke="var(--mh-ink)" strokeWidth="2" strokeLinecap="round"><path d="M0 498q41 24 70 102m-51-99 17 99m-4-45 41-27m-3 72q-1-51 30-77m-8 77q15-47 51-58m-16 58q26-24 67-17"/><path d="M0 544q38 8 57 56h159l-69-23-53-13-33-24-33 8Z" fill="var(--mh-ink)"/><path d="M741 600q-2-99 39-152m-23 93 40-26m-45 85q-29-83-17-117"/></g>
    <g fill="var(--mh-apricot)"><circle cx="736" cy="481" r="5"/><circle cx="780" cy="448" r="4"/><circle cx="108" cy="529" r="4"/></g>
    <path d="m364 182 6-8 7 6m-45 18 7-6 6 7" stroke="var(--mh-plum)" strokeWidth="2"/>
  </svg>;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/art/ArtistPortrait.tsx">
<![CDATA[export function ArtistPortrait() {
  return <svg viewBox="0 0 500 600" fill="none" aria-hidden="true">
    <path d="M0 0h500v600H0z" fill="var(--mh-cloud)"/><path d="M43 39h414v489H43Z" fill="var(--mh-paper)"/>
    <path d="M75 73h350v274H75Z" fill="var(--mh-hydrangea)"/><path d="M75 270q105-47 174-15 89-50 176-7v99H75Z" fill="var(--mh-sea)" opacity=".6"/>
    <g stroke="var(--mh-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M194 301q-68 10-94 83l-24 133h325l-26-130q-23-79-88-86Z" fill="var(--mh-sea)"/>
      <path d="M202 282h82v51l-43 35-39-37Z" fill="var(--mh-apricot)"/><path d="M169 187q-22-80 57-108 97-28 123 75l-13 169-49-14-100 22-30-34Z" fill="var(--mh-ink)"/>
      <path d="M182 189q-3 63 28 97 31 35 69 8 41-29 43-106l-80-59Z" fill="var(--mh-paper)"/>
      <path d="M184 203q-24-12-23 14 1 24 29 20m130-36q23-9 19 15-4 21-26 19" fill="var(--mh-apricot)"/>
      <path d="M187 198q42-10 57-58 20 48 79 57-4-74-63-85-55-5-73 86Z" fill="var(--mh-ink)"/>
      <path d="M209 221q9-9 18-1m49-1q10-9 19 0m-79 3v6m69-7v6m-37 5-5 11 7 2m-18 17q15 12 28-1" strokeWidth="1.5"/>
      <path d="M205 209h31v27h-31Zm62 0h33v27h-33Zm-31 6q16-10 31 0" strokeWidth="2.5"/>
      <path d="m194 312 46 53-28 37-37-73Zm90 0-44 53 32 36 32-74Z" fill="var(--mh-cloud)"/>
      <path d="M161 374 131 463l76 37 18-27-51-31 22-48m133-17 33 72-78 42-18-27 49-31-24-39" fill="var(--mh-sea)"/>
      <path d="m208 474 24-8q13-4 20 6 7 15-8 23l-24 5m63-36-22-8q-16-4-21 8-4 13 12 20l19 7" fill="var(--mh-paper)"/>
      <path d="m180 510 120-17 54 28-124 19Z" fill="var(--mh-paper)"/><path d="m300 493-70 47m-33-24 72-12m-58 20 49-9" strokeWidth="1"/>
      <path d="m251 461 25-50 4 1-23 53Z" fill="var(--mh-coral)"/>
      <path d="M61 518h379v13H61Z" fill="var(--mh-plum)"/>
      <path d="M353 469h43l-6 45h-31Z" fill="var(--mh-coral)"/><path d="M397 478q20 0 16 14-3 11-19 8"/>
      <path d="M60 49h381M250 75v71m-174 67h89m174 0h85" opacity=".35"/>
    </g>
    <path d="M72 553q36-5 58 1m8-2 21-1m185 1 46-3" stroke="var(--mh-plum)" strokeWidth="2" strokeLinecap="round"/>
  </svg>;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/art/CloudKeeper.tsx">
<![CDATA[export function CloudKeeper() {
  return <svg viewBox="0 0 640 800" fill="none" aria-hidden="true">
    <path fill="var(--mh-hydrangea)" d="M0 0h640v800H0z"/>
    <path d="M-30 212c33-28 55-25 82-19-7-37 31-62 61-40 11-43 65-45 88-7 36-22 76 3 67 37 42-2 59 20 64 35-112 18-242 14-362-6Zm383-98c11-27 33-29 54-23 9-37 59-40 75-5 28-10 46-2 50 19 33-5 58 9 66 23-81 15-172 9-245-14Z" fill="var(--mh-paper)" opacity=".7"/>
    <path d="M0 620q126-93 280-25 142-95 360-7v212H0Z" fill="var(--mh-sea)"/>
    <path d="M0 693q155-103 331-43 166-62 309-24v174H0Z" fill="var(--mh-plum)" opacity=".6"/>
    <g stroke="var(--mh-ink)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M243 415q-31 90-30 186l28 104 25-6-12-108 40-118 19 120 37 113 24-9-22-118 3-175Z" fill="var(--mh-sea)"/>
      <path d="m238 693-5 28q-25 10-31 25 30 14 63-5l4-43Zm112 2 5 38q22 24 46 18-2-18-28-43l-1-16" fill="var(--mh-ink)"/>
      <path d="M244 326c-39 20-58 86-68 133 45 30 120 25 170-9l-3-111Z" fill="var(--mh-coral)"/>
      <path d="M249 302q-69 17-78 81-15 92-53 145 91 25 153-5 45 27 124-10-46-96-50-155-8-52-49-57Z" fill="var(--mh-plum)"/>
      <path d="M249 302q-35 73-30 152l-46 74m122-225q26 66 41 150l40 62M252 324l20 46 22-45"/>
      <path d="M242 267h62v54q-27 25-62-1Z" fill="var(--mh-apricot)"/>
      <path d="M211 210q-11-62 48-82 63-16 90 41 18 58-10 92l-95 24Z" fill="var(--mh-ink)"/>
      <path d="M225 192q-4 53 24 84 22 23 48 2 35-26 34-85-27-24-62-34-12 20-44 33Z" fill="var(--mh-paper)"/>
      <path d="M224 204q-22-4-14 18 8 17 20 10m98-27q17-7 13 13-3 14-15 17" fill="var(--mh-apricot)"/>
      <path d="M247 215q7-6 14 0m33-2q6-7 14-1" strokeWidth="2"/>
      <path d="M255 216v6m46-9v6" strokeWidth="4"/><path d="m277 226-3 8 6 1m-13 12q9 8 18-1" strokeWidth="1.7"/>
      <path d="M220 197q34-8 45-39 20 26 70 39-6-65-65-58-46-2-50 58Z" fill="var(--mh-ink)"/>
      <path d="M215 187q-7 60 5 95l-20 14q-18-39-10-91m147-12q18 49-5 91l22 3q21-47 0-89" fill="var(--mh-ink)"/>
      <path d="M229 157q53-19 101 11" stroke="var(--mh-coral)" strokeWidth="7"/>
      <path d="M217 175q-16-49 14-73 34-33 88 0 24 20 27 60l-9 8q-54-30-120 5Z" fill="var(--mh-cloud)"/>
      <path d="M204 171q71-28 146-3l14 15q-76-26-171 8Z" fill="var(--mh-paper)"/>
      <path d="m210 363-30 61 20 9 38-50m98-26 42 52 44-14 8 21-58 27-46-35" fill="var(--mh-plum)"/>
      <path d="m416 395 21-13q17-5 23 10 3 11-9 18l-24 7Z" fill="var(--mh-paper)"/>
      <path d="M183 422q-23 10-16 24 8 10 20 0l13-14" fill="var(--mh-paper)"/>
      <path d="M436 326h52v82q-26 17-52 0Z" fill="var(--mh-paper)" fillOpacity=".2"/><path d="M431 324h62v9h-62Z" fill="var(--mh-apricot)"/><path d="M443 318q17-34 36 0"/>
      <path d="M443 377c-6-8 4-19 13-14 4-16 24-15 26 1 14-1 18 12 7 18-14 4-34 3-46-5Z" fill="var(--mh-paper)" stroke="none"/>
      <path d="M453 396v-7m22 8v-7" stroke="var(--mh-apricot)" strokeWidth="2"/>
      <path d="M419 659q8-37 24-55l14 25q34-8 54 14 28-17 49-11-2 36-31 45 5 42-33 59-37 14-65-8-25-19-12-69Z" fill="var(--mh-paper)"/>
      <path d="m443 613 9 22-18 7m55 19 12-18 12 24" fill="var(--mh-coral)" stroke="none"/>
      <path d="M432 674q10 16 27-1m-21-13 1 1m22-4 1 1m-18 13 5 4 3-5m-12 49-8 20m53-16 3 20"/>
      <path d="M507 699q36 6 36-42" stroke="var(--mh-cloud)" strokeWidth="15"/>
    </g>
    <g stroke="var(--mh-paper)" strokeWidth="1.5" opacity=".65"><path d="m72 337 4 10 10 4-10 4-4 10-4-10-10-4 10-4Zm452-113 3 7 7 3-7 3-3 7-3-7-7-3 7-3ZM392 490l4 10 10 4-10 4-4 10-4-10-10-4 10-4Z"/></g>
    <g fill="var(--mh-cloud)"><circle cx="128" cy="648" r="3"/><circle cx="109" cy="680" r="2"/><circle cx="562" cy="561" r="3"/><circle cx="548" cy="595" r="2"/></g>
    <path d="M0 766q78-25 132 5 89-36 168 3 84-30 173-5 99-35 167-2v33H0Z" fill="var(--mh-ink)" opacity=".5"/>
  </svg>;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/art/NightDelivery.tsx">
<![CDATA[export function NightDelivery() {
  return <svg viewBox="0 0 800 600" fill="none" aria-hidden="true">
    <path fill="var(--mh-ink)" d="M0 0h800v600H0z"/><circle cx="164" cy="107" r="32" fill="var(--mh-cloud)"/>
    <path d="M-30 245q123-93 246-6 142-80 277 9 152-72 307-11v183H0Z" fill="var(--mh-plum)"/><path d="M0 352q199-65 370-17t430 12v253H0Z" fill="var(--mh-sea)"/>
    <path d="m33 369 155 1m14 31 125 1m-272 41 119 2m47-70 95 1m-180 95 146 2" stroke="var(--mh-hydrangea)" opacity=".4"/>
    <path d="M0 527 800 443v157H0Z" fill="var(--mh-plum)"/>
    <path d="m256 482 84 12-58 106h518V449Z" fill="var(--mh-cloud)" opacity=".3"/>
    <g stroke="var(--mh-ink)" strokeWidth="2.5" strokeLinejoin="round"><path d="M335 119h370v356H335Z" fill="var(--mh-cloud)"/><path d="m705 119 95 35v326l-95-5Z" fill="var(--mh-plum)"/>
      <path d="m297 136 72-82 338 6 69 91-75 1-352-4Z" fill="var(--mh-coral)"/><path d="m321 111 421 5m-408-24 394 5m-375-24 360 5m-321-23-30 82m68-81-22 81m58-79-14 80m53-79-4 78m45-77 6 78m38-77 17 79m24-78 27 80" opacity=".5"/>
      <path d="M365 171h165v198H365Zm192 0h114v306H557Z" fill="var(--mh-ink)"/>
      <path d="M372 177h151v185H372Zm193 0h98v230h-98Z" fill="var(--mh-apricot)"/><path d="M447 177v184m-75-101h151M614 177v228m-49-116h98"/>
      <path d="m373 179 49-2-15 117-34 29m150-144h-41l10 116 31 27" fill="var(--mh-coral)"/>
      <path d="M381 342h128v17H381Z" fill="var(--mh-plum)"/><path d="M395 341v-30h21v30m26 0v-40h25v40m18 0v-19h14v19" fill="var(--mh-paper)"/>
      <path d="M555 409h118v68H555Z" fill="var(--mh-plum)"/><circle cx="651" cy="388" r="3" fill="var(--mh-plum)"/>
      <path d="M336 384h211v9H336Zm-13 94h395v10H323Z" fill="var(--mh-sea)"/>
      <path d="M335 407h197v8H335m42-28v86m108-86v86"/><path d="M399 420h60v52h-60Z" fill="var(--mh-plum)"/>
      <path d="M546 149v-52l-17-10"/><path d="m516 81 25 6 4 36-34-4Z" fill="var(--mh-apricot)"/>
      <path d="M536 416v-74m0 16-17-22m17 46 20-19" stroke="var(--mh-sea)" strokeWidth="4"/><path d="M515 419h43l-5 55h-31Z" fill="var(--mh-coral)"/>
    </g>
    <g stroke="var(--mh-ink)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><circle cx="244" cy="510" r="58" fill="var(--mh-cloud)" fillOpacity=".25"/><circle cx="421" cy="510" r="58" fill="var(--mh-cloud)" fillOpacity=".25"/><path d="m244 510 49-94 52 93h-101l73-67 104 68-41-119m-63 51 26 67 39-105m-109 12h50m48-26 20-11 22 3" stroke="var(--mh-coral)" strokeWidth="7"/><path d="m332 506 15 1m-24 23 15-1"/><path d="M384 405h70l-8 43h-49Z" fill="var(--mh-apricot)" strokeWidth="2"/><path d="M397 402v-28h37v28m-27-28v28m-11 18h54m-52 12h50m-35-24v38m14-38v38" strokeWidth="1.5"/><path d="M209 441h70l-5 14h-59Z" fill="var(--mh-ink)"/><path d="M232 407h52v30h-52Z" fill="var(--mh-paper)" strokeWidth="2"/><path d="M239 383h42v24h-42Z" fill="var(--mh-apricot)" strokeWidth="2"/><path d="m258 383 4 24m-8 1 3 27" strokeWidth="1.5"/></g>
    <g stroke="var(--mh-ink)" strokeWidth="2"><path d="M714 475h47l-7 47h-32Z" fill="var(--mh-coral)"/><path d="M739 475v-88m0 57-21-23m21 13 25-31"/><path d="M720 418q-27-31-37-11 9 18 37 11Zm43-18q14-34 30-20-1 18-30 20Z" fill="var(--mh-sea)"/><path d="M74 600q9-72 55-106m-26 62-33-28m52 72q-5-73 32-90" fill="var(--mh-ink)" strokeWidth="4"/></g>
    <g fill="var(--mh-apricot)"><circle cx="96" cy="168" r="2"/><circle cx="246" cy="83" r="2"/><circle cx="288" cy="202" r="2"/><circle cx="52" cy="93" r="1.5"/></g>
  </svg>;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/art/SummerRoom.tsx">
<![CDATA[export function SummerRoom() {
  return <svg viewBox="0 0 800 600" fill="none" aria-hidden="true">
    <path fill="var(--mh-apricot)" d="M0 0h800v600H0z"/><path d="M415 0h385v600H415Z" fill="var(--mh-paper)" opacity=".35"/>
    <path d="M123 38h524v421H123Z" fill="var(--mh-plum)"/><path d="M139 54h492v390H139Z" fill="var(--mh-hydrangea)"/>
    <path d="M139 292q97-68 205-17 147-66 287-12v181H139Z" fill="var(--mh-sea)"/><path d="M139 314q100-23 244 5t248-5v130H139Z" fill="var(--mh-cloud)"/><path d="m162 359 142 2m19 31 180 1m-68-50 167 3m-420 46 73 2" stroke="var(--mh-paper)" strokeWidth="2"/>
    <path d="M191 149c12-20 29-23 48-12-2-21 17-35 36-24 13-28 46-20 49 5 31-12 50 6 49 24 26-5 46 8 48 18-86 14-168 11-230-11Z" fill="var(--mh-paper)"/>
    <g stroke="var(--mh-ink)" strokeWidth="2" strokeLinejoin="round"><path d="M373 54h18v390h-18Z" fill="var(--mh-plum)"/><path d="M139 227h492v14H139Z" fill="var(--mh-plum)"/>
      <path d="m136 54-74 32v373l74-15Zm495 0 67 30v377l-67-17Z" fill="var(--mh-cloud)"/><path d="m77 98 43-20v341l-43 18Zm567-20 41 19v343l-41-21Z" fill="var(--mh-hydrangea)"/><path d="m78 238 42-5m524 0 40 5"/>
      <path d="M111 446h551v17H111Z" fill="var(--mh-paper)"/><path d="M0 481h800v119H0Z" fill="var(--mh-plum)"/><path d="M0 481h800v16H0Z" fill="var(--mh-apricot)"/>
      <path d="m31 517 73 5m176 2 197 3m95 8 178 3m-654 34 171 1m152-11 173 1m56 24h108" stroke="var(--mh-apricot)" opacity=".3"/>
      <path d="m187 499 132-14 104 40-142 20Z" fill="var(--mh-paper)"/><path d="m319 485-38 60m-83-40 111-12m-96 18 91-11m-69 27 32 3m55-20 65 12" stroke="var(--mh-sea)" strokeWidth="1"/>
      <path d="m282 559 108-24 37 14-109 27Z" fill="var(--mh-coral)"/><path d="m282 559 36 17-25-1Z" fill="var(--mh-apricot)"/>
      <path d="M582 443h69l-11 75h-49Z" fill="var(--mh-sea)"/><path d="M649 452q37-6 30 24-4 17-33 11" stroke="var(--mh-sea)" strokeWidth="7"/>
      <path d="M611 444v-83m4 56 22-32m-26 13-18-24m24 44-32-9" stroke="var(--mh-sea)" strokeWidth="2"/>
      <path d="M436 471c-16-33 3-61 40-70l-7-26 28 15 22-14 5 24c42 4 63 33 53 58-7 20-36 34-73 30-35 11-53 1-68-17Z" fill="var(--mh-apricot)"/>
      <path d="M478 404q21 16 46-3m-56 34q6 6 13 0m18 0q7 6 15-1m-31 13 8 5 6-6m-39 12-21-2m22 10-23 2m76-10 25-5m-27 12 29 2" strokeWidth="1.5"/>
      <path d="M540 418q-7 10-5 22m18-14q-6 11-4 18m-4 26q39 9 33-9" stroke="var(--mh-plum)" strokeWidth="7"/>
      <path d="M111 54q6 70 35 129l-38 144q-30-60-41-88V54Z" fill="var(--mh-paper)"/><path d="M128 54q8 66 24 121m-53-56 19 69-31 99" opacity=".3"/>
      <path d="M663 54q-6 73-27 131l39 142 66-39V54Z" fill="var(--mh-paper)"/><path d="M685 54q-9 73-35 135l35 91m34-226q-4 90-49 145" opacity=".3"/>
    </g>
    <g fill="var(--mh-coral)"><path d="M604 360q-19-1-14-13 8-5 15 4-2-18 11-14 8 8-2 16 17-5 17 6-4 12-18 3Z"/><path d="M637 385q-17-2-12-12 8-4 13 3-1-16 10-12 7 7-2 13 15-3 14 6-4 10-16 2Z"/><path d="M591 374q-16 0-12-11 7-4 13 4 0-16 11-11 6 7-3 13 15-2 13 7-5 9-16 0Z"/></g>
    <path d="m425 95 4 12 12 4-12 4-4 12-4-12-12-4 12-4Z" stroke="var(--mh-paper)" strokeWidth="1.5"/>
  </svg>;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/brand/Icons.tsx">
<![CDATA[import type { SVGProps } from "react";
type Props = SVGProps<SVGSVGElement>;
export function Arrow({ className, ...props }: Props) {
  return <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d="M4 12h15m-6-6 6 6-6 6" /></svg>;
}
export function Star({ className, ...props }: Props) {
  return <svg className={className} width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" {...props}><path d="m16 2 3.6 10.4L30 16l-10.4 3.6L16 30l-3.6-10.4L2 16l10.4-3.6Z" /></svg>;
}
export function Lantern({ className, ...props }: Props) {
  return <svg className={className} width="48" height="64" viewBox="0 0 48 64" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" {...props}><path d="M14 8q10-8 20 0l5 29q-15 10-30 0Z" fill="currentColor" fillOpacity=".12"/><path d="M14 8q10 4 20 0M9 37q15-6 30 0M20 7l-3 30m11-30 3 30M19 43q-7 9 2 15m8-15q8 9 1 17"/></svg>;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/brand/Logo.tsx">
<![CDATA[export function Logo({ mark = false }: { mark?: boolean }) {
  return <span className="mh-logo"><svg width="39" height="42" viewBox="0 0 44 48" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M17 5q5-4 10 0l4 21q-9 5-18 0Z"/><path d="M17 5q5 3 10 0M13 26q9-3 18 0M22 7v18m0 7q-5 4 0 8M3 39q6-5 12 0t12 0 14 0M8 45q7-4 14 0t14 0"/><path d="m36 5 1 3 3 1-3 1-1 3-1-3-3-1 3-1Z" fill="currentColor" stroke="none"/></svg>{!mark && <span>mio hazuki<span className="mh-logo-caption">ILLUSTRATION & LITTLE WORLDS</span></span>}</span>;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/forms/CommissionForm.tsx">
<![CDATA["use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { PACKAGES } from "../data";
import { Arrow, Lantern } from "../brand/Icons";
import { validateBrief, type Brief, type BriefErrors } from "./validate";
const EMPTY: Brief = { name: "", email: "", package: "unsure", story: "" };
export function CommissionForm() {
  const [brief, setBrief] = useState<Brief>(EMPTY);
  const [errors, setErrors] = useState<BriefErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const success = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const choose = (id: string | null | undefined) => { if (PACKAGES.some(item => item.id === id)) setBrief(current => ({ ...current, package: id! })); };
    choose(new URL(location.href).searchParams.get("commission"));
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest<HTMLAnchorElement>("a[data-mh-package]");
      if (!link) return;
      event.preventDefault();
      choose(link.dataset.mhPackage);
      history.pushState(null, "", link.href);
      document.getElementById("inquiry")?.scrollIntoView({ behavior: "instant", block: "start" });
    };
    document.addEventListener("click", onClick);
    return () => { document.removeEventListener("click", onClick); if (timer.current) clearTimeout(timer.current); };
  }, []);
  useEffect(() => { if (status === "success") success.current?.focus({ preventScroll: true }); }, [status]);
  const update = (key: keyof Brief, value: string) => { setBrief(current => ({ ...current, [key]: value })); if (errors[key]) setErrors(current => ({ ...current, [key]: undefined })); };
  function submit(event: FormEvent) {
    event.preventDefault();
    if (status !== "idle") return;
    const next = validateBrief(brief); setErrors(next);
    if (Object.keys(next).length) {
      const key = Object.keys(next)[0]; form.current?.querySelector<HTMLElement>(`[name="${key}"]`)?.focus(); return;
    }
    setStatus("loading");
    timer.current = setTimeout(() => setStatus("success"), 700);
  }
  const text = `Commission idea for Mio Hazuki\n\nName: ${brief.name.trim()}\nEmail: ${brief.email.trim()}\nCommission: ${PACKAGES.find(item => item.id === brief.package)?.name ?? "Not sure yet"}\n\n${brief.story.trim()}`;
  async function copyBrief() {
    try { await navigator.clipboard.writeText(text); setCopied(true); setCopyError(false); }
    catch { setCopyError(true); }
  }
  if (status === "success") return <div className="mh-form-success" ref={success} tabIndex={-1} role="status"><div className="mh-success-lantern"><Lantern/></div><h3>A small beginning.<br/>A world of possibilities.</h3><p>Your daydream is ready to share, {brief.name.trim()}.</p><p className="mh-form-disclaimer">This is a portfolio demo. Your message hasn&apos;t been sent or stored. Copy your brief below to keep it.</p><button className="mh-button mh-button-light" type="button" onClick={copyBrief}>{copied ? "Brief copied" : "Copy my commission brief"}<Arrow/></button>{copyError && <p className="mh-small">Copy isn&apos;t available in this browser. Select your brief below to save it.</p>}<details className="mh-brief-preview"><summary>Read my brief</summary><pre>{text}</pre></details><button className="mh-text-link" type="button" onClick={() => { setStatus("idle"); setCopied(false); setCopyError(false); setTimeout(() => form.current?.querySelector<HTMLElement>("input")?.focus(), 0); }}>Start another idea</button></div>;
  return <form className="mh-form" ref={form} onSubmit={submit} noValidate aria-label="Commission inquiry" aria-busy={status === "loading"}>
    <div className="mh-form-row"><div className="mh-field"><label htmlFor="mh-name">What should I call you?</label><input id="mh-name" name="name" autoComplete="name" placeholder="Your name" maxLength={100} value={brief.name} onChange={e => update("name", e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "mh-name-error" : undefined} required/>{errors.name && <span className="mh-error" id="mh-name-error">{errors.name}</span>}</div><div className="mh-field"><label htmlFor="mh-email">Where can I find you?</label><input id="mh-email" name="email" type="email" autoComplete="email" placeholder="you@somewhere.com" maxLength={254} value={brief.email} onChange={e => update("email", e.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "mh-email-error" : undefined} required/>{errors.email && <span className="mh-error" id="mh-email-error">{errors.email}</span>}</div></div>
    <div className="mh-field"><label htmlFor="mh-package">What are you dreaming of?</label><select id="mh-package" name="package" value={brief.package} onChange={e => update("package", e.target.value)} aria-invalid={Boolean(errors.package)} aria-describedby={errors.package ? "mh-package-error" : undefined}>{PACKAGES.map(item => <option key={item.id} value={item.id}>{item.name} — from ${item.price}</option>)}<option value="unsure">Not sure yet — let&apos;s figure it out</option></select>{errors.package && <span className="mh-error" id="mh-package-error">{errors.package}</span>}</div>
    <div className="mh-field"><label htmlFor="mh-story">Tell me a little about your idea</label><textarea id="mh-story" name="story" rows={4} maxLength={3000} placeholder="A character, a memory, a very specific kind of magic…" value={brief.story} onChange={e => update("story", e.target.value)} aria-invalid={Boolean(errors.story)} aria-describedby={errors.story ? "mh-story-error" : "mh-story-hint"} required/>{errors.story ? <span className="mh-error" id="mh-story-error">{errors.story}</span> : <span className="mh-field-hint" id="mh-story-hint">No perfect brief needed. Just a little spark.</span>}</div>
    <div className="mh-submit-row"><button className="mh-button mh-button-light" type="submit" disabled={status === "loading"}>{status === "loading" ? "Gathering your daydream…" : "Let's make a little magic"}<Arrow/></button><span>Made with care.<br/>Always, by a human.</span></div>
    <p className="mh-form-disclaimer">A working demo: this prepares your brief locally and doesn&apos;t send a message.</p>
  </form>;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/forms/validate.ts">
<![CDATA[import { PACKAGES } from "../data";
export type Brief = { name: string; email: string; package: string; story: string };
export type BriefErrors = Partial<Record<keyof Brief, string>>;
export function validateBrief(brief: Brief): BriefErrors {
  const errors: BriefErrors = {};
  if (brief.name.trim().length < 2 || brief.name.length > 100) errors.name = "A name between 2 and 100 characters, please.";
  if (brief.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(brief.email.trim())) errors.email = "Please enter an email address I can reply to.";
  if (!PACKAGES.some(item => item.id === brief.package) && brief.package !== "unsure") errors.package = "Choose a commission type, or pick ‘Not sure yet’.";
  if (brief.story.trim().length < 20 || brief.story.length > 3000) errors.story = "Tell me a little more—between 20 and 3,000 characters.";
  return errors;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/harbor/FooterScene.tsx">
<![CDATA[function Cloud({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}><path d="M0 48c17-17 32-14 48-14C41 9 66-5 91 10c9-34 60-33 74-2 29-15 64 4 57 31 31-9 51 5 59 18-71 8-195 12-281-9Z" fill="var(--mh-paper)"/><path d="M19 52c48 6 167 7 231-1" stroke="var(--mh-cloud)" strokeWidth="3" opacity=".6"/></g>;
}
function Cottage({ x, y, scale = 1, roof = "var(--mh-coral)" }: { x: number; y: number; scale?: number; roof?: string }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} stroke="var(--mh-ink)" strokeWidth="1.3" strokeLinejoin="round">
    <path d="M0-28h44V0H0Z" fill="var(--mh-cloud)"/><path d="M44-28h14V-2L44 0Z" fill="var(--mh-hydrangea)"/>
    <path d="M-7-27 22-52l31 25Z" fill={roof}/><path d="M22-52 53-27h8l-30-27Z" fill="var(--mh-plum)"/>
    <path d="M6-21h11v11H6Zm21 5h10V0H27Z" fill="var(--mh-apricot)"/><path d="M11.5-21v11M6-15.5h11M32-16V0"/>
  </g>;
}
function Lighthouse() {
  return <g stroke="var(--mh-ink)" strokeWidth="1.4" strokeLinejoin="round">
    <path d="M-17 0 -11-92h22L17 0Z" fill="var(--mh-paper)"/>
    <path d="M-13.1-60h26.2l.9 14h-28Zm-.9 30h30l.8 14h-31.6Z" fill="var(--mh-coral)"/>
    <path d="M-14-92h28v9h-28Z" fill="var(--mh-plum)"/>
    <path d="M-9-122h18v30h-18Z" fill="var(--mh-apricot)"/><path d="M-9-107h18M0-122v30"/>
    <path d="M-15-122h30l-15-18Z" fill="var(--mh-plum)"/><path d="M0-146v6" strokeLinecap="round"/>
    <path d="M-6-80h4v9h-4Zm8 0h4v9H2Z" fill="var(--mh-ink)" stroke="none" opacity=".75"/>
  </g>;
}
function Tree({ x, y, scale = 1, canopy = "var(--mh-sea)" }: { x: number; y: number; scale?: number; canopy?: string }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M-5 0q2-26-3-48l9-1q1 22 7 49Z" fill="var(--mh-ink)"/><path d="m1-32 18-18m-17 6-17-12" stroke="var(--mh-ink)" strokeWidth="3" strokeLinecap="round"/>
    <g fill={canopy}><circle cx="0" cy="-92" r="38"/><circle cx="-34" cy="-68" r="29"/><circle cx="36" cy="-70" r="31"/><circle cx="-4" cy="-52" r="33"/></g>
    <g fill="var(--mh-hydrangea)" opacity=".5"><circle cx="-10" cy="-106" r="22"/><circle cx="-40" cy="-76" r="14"/><circle cx="24" cy="-86" r="13"/></g>
    <g fill="var(--mh-ink)" opacity=".28"><circle cx="30" cy="-48" r="26"/><circle cx="-12" cy="-40" r="20"/></g>
    <g fill="var(--mh-apricot)"><circle cx="-18" cy="-80" r="2.8"/><circle cx="14" cy="-100" r="2.8"/><circle cx="34" cy="-72" r="2.8"/><circle cx="-38" cy="-60" r="2.8"/><circle cx="2" cy="-60" r="2.8"/><circle cx="-6" cy="-122" r="2.4"/></g>
  </g>;
}
function Tuft({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <path transform={`translate(${x} ${y}) scale(${scale})`} d="M0 0q-3-18-11-30 10 8 13 28 1-24 8-40-1 24 0 42 8-14 18-22-8 12-9 24Z" fill="var(--mh-ink)"/>;
}
function Flower({ x, y }: { x: number; y: number }) {
  return <g transform={`translate(${x} ${y})`}><path d="M0 0v-24" stroke="var(--mh-ink)" strokeWidth="2" strokeLinecap="round"/><g fill="var(--mh-coral)"><circle cx="0" cy="-30" r="4"/><circle cx="-5" cy="-24" r="4"/><circle cx="5" cy="-24" r="4"/></g><circle cx="0" cy="-26" r="2.2" fill="var(--mh-apricot)"/></g>;
}
export function FooterScene() {
  return <svg className="mh-footer-art" viewBox="0 0 1600 400" preserveAspectRatio="xMidYMax slice" fill="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="mh-foot-sky" x1="0" y1="0" x2="0" y2="262" gradientUnits="userSpaceOnUse"><stop stopColor="var(--mh-paper)"/><stop offset=".5" stopColor="var(--mh-cloud)"/><stop offset="1" stopColor="var(--mh-apricot)"/></linearGradient>
      <linearGradient id="mh-foot-sea" x1="0" y1="258" x2="0" y2="400" gradientUnits="userSpaceOnUse"><stop stopColor="var(--mh-hydrangea)"/><stop offset=".55" stopColor="var(--mh-sea)"/><stop offset="1" stopColor="var(--mh-ink)"/></linearGradient>
      <linearGradient id="mh-foot-land" x1="0" y1="270" x2="0" y2="400" gradientUnits="userSpaceOnUse"><stop stopColor="var(--mh-plum)"/><stop offset="1" stopColor="var(--mh-ink)"/></linearGradient>
      <radialGradient id="mh-foot-glow"><stop stopColor="var(--mh-apricot)" stopOpacity=".85"/><stop offset="1" stopColor="var(--mh-apricot)" stopOpacity="0"/></radialGradient>
    </defs>
    <path fill="url(#mh-foot-sky)" d="M0 0h1600v270H0z"/>
    <circle cx="1210" cy="170" r="26" fill="var(--mh-paper)" opacity=".9"/>
    <g className="mh-clouds mh-ambient"><Cloud x={110} y={92} scale={1.05}/><Cloud x={1040} y={46} scale={.8}/><Cloud x={380} y={170} scale={.6}/></g>
    <path d="M0 262V232q92-34 192-9t198-4q112-46 232-6t212-14q118-32 232 10t250-12q126-30 284 8V262Z" fill="var(--mh-hydrangea)"/>
    <path d="M0 262v-14q130-22 260-6t300-6q150-16 290 4t290-6q150-12 270 8v18Z" fill="var(--mh-sea)" opacity=".45"/>
    <path d="M0 256h1600v144H0Z" fill="url(#mh-foot-sea)"/>
    <g stroke="var(--mh-cloud)" strokeWidth="2" strokeLinecap="round" opacity=".5"><path d="M60 286h150m60 14h110m170-2h130M820 280h120m60 18h160m80-8h130M60 326h170m110 12h120m250-6h140m150 12h110m150-14h130"/></g>
    <g stroke="var(--mh-paper)" strokeWidth="2" strokeLinecap="round" opacity=".6"><path d="M320 290h60m90 16h80m190-10h70m150 26h60m140-18h60"/></g>
    <path d="M300 336c70-40 170-60 262-62 140-4 250-2 380 6 70 6 118 24 166 56l52 64H300Z" fill="url(#mh-foot-land)"/>
    <path d="M300 336c70-40 170-60 262-62 140-4 250-2 380 6 70 6 118 24 166 56" stroke="var(--mh-hydrangea)" strokeWidth="2" opacity=".35"/>
    <g opacity=".95">
      <Cottage x={500} y={300} scale={.95}/><Cottage x={572} y={289} scale={1.1} roof="var(--mh-plum)"/><Cottage x={660} y={283} scale={.9}/><Cottage x={738} y={285} scale={1.05} roof="var(--mh-plum)"/><Cottage x={822} y={292} scale={.85}/>
    </g>
    <circle cx="595" cy="278" r="30" fill="url(#mh-foot-glow)" opacity=".5"/><circle cx="760" cy="274" r="28" fill="url(#mh-foot-glow)" opacity=".5"/>
    <g transform="translate(944 300)"><Lighthouse/></g>
    <path d="M888 304q60-6 132-4l26 14H890Z" fill="var(--mh-ink)"/>
    <path d="M404 300h150l34 12H408Z" fill="var(--mh-ink)"/><path d="m424 302 3 22m36-22 3 22m36-22 3 22" stroke="var(--mh-ink)" strokeWidth="3"/>
    <g transform="translate(1088 318)"><path d="M0 0q36 12 76-2L64 16H12Z" fill="var(--mh-plum)"/><path d="M38-52V0m0-46L14-8h24Z" stroke="var(--mh-paper)" strokeWidth="1.3"/><path d="m41-44 22 32H41Z" fill="var(--mh-paper)" opacity=".85"/><path d="M-4 20q40 7 84 0" stroke="var(--mh-paper)" strokeWidth="2" opacity=".5" strokeLinecap="round"/></g>
    <g stroke="var(--mh-ink)" strokeWidth="2" strokeLinecap="round" opacity=".5"><path d="M330 188q8-9 15 0 7-9 15 0m340-34q7-8 13 0 6-8 13 0m500 68q6-7 12 0 6-7 12 0"/></g>
    <g transform="translate(770 112)"><g className="mh-footer-lantern mh-ambient">
      <circle cx="0" cy="26" r="62" fill="url(#mh-foot-glow)" opacity=".55"/>
      <g stroke="var(--mh-ink)" strokeWidth="1.5" strokeLinejoin="round"><path d="M-14 0q14-9 28 0l5 38q-19 11-38 0Z" fill="var(--mh-apricot)"/><path d="M-14 0q14 6 28 0M-19 38q19-6 38 0" fill="none"/><path d="M0 4v32" fill="none" opacity=".6"/><path d="M-12-1q12-8 24 0" fill="none"/></g>
      <path d="M0 46q-6 10 0 20" stroke="var(--mh-coral)" strokeWidth="2" strokeLinecap="round"/>
    </g></g>
    <path d="M0 400V326c52-22 150-30 230-8 62 18 98 44 130 82Z" fill="var(--mh-plum)"/>
    <path d="M1130 400c36-52 114-84 206-88 96-4 178 12 264-12v100Z" fill="var(--mh-plum)"/>
    <path d="M1010 400c70-30 170-48 280-48 126 0 220 6 310-14v62Z" fill="var(--mh-ink)"/>
    <path d="M0 400V356c60-18 150-14 220 10 50 18 84 22 126 34Z" fill="var(--mh-ink)"/>
    <g className="mh-foreground-grass mh-ambient">
      <Tree x={1330} y={318} scale={1.25}/><Tree x={1500} y={322} scale={.88} canopy="var(--mh-plum)"/><Tree x={1262} y={346} scale={.5}/><Tree x={118} y={338} scale={.9}/>
      <Tuft x={30} y={394} scale={1.4}/><Tuft x={92} y={400} scale={1.1}/><Tuft x={250} y={398} scale={1.3}/><Tuft x={1060} y={400} scale={1.2}/><Tuft x={1150} y={392} scale={1.5}/><Tuft x={1420} y={400} scale={1.4}/><Tuft x={1560} y={398} scale={1.2}/>
      <Flower x={52} y={396}/><Flower x={268} y={398}/><Flower x={1108} y={398}/><Flower x={1402} y={396}/><Flower x={1546} y={394}/>
    </g>
  </svg>;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/harbor/Harbor.tsx">
<![CDATA[function Cloud({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`}><path d="M0 48c17-17 32-14 48-14C41 9 66-5 91 10c9-34 60-33 74-2 29-15 64 4 57 31 31-9 51 5 59 18-71 8-195 12-281-9Z" fill="var(--mh-paper)"/><path d="M19 52c48 6 167 7 231-1-51 18-178 20-231 1Z" fill="var(--mh-cloud)" opacity=".65"/></g>;
}
function House({ x, y, scale = 1, tone = "var(--mh-cloud)" }: { x: number; y: number; scale?: number; tone?: string }) {
  return <g transform={`translate(${x} ${y}) scale(${scale})`} stroke="var(--mh-ink)" strokeWidth="1.5" strokeLinejoin="round">
    <path d="M11 49h93v76H11Z" fill={tone}/><path d="m104 49 33-7v78l-33 5Z" fill="var(--mh-plum)"/>
    <path d="M-4 51 28 9l99-7 26 42-50 12-30-31-30 30Z" fill="var(--mh-plum)"/><path d="m28 9 99-7-24 54-30-31-30 30-47-4" fill="var(--mh-coral)"/>
    <path d="m12 35 98-8M4 46l101-7M22 22l95-7M36 9 12 50M53 8 34 50M72 6 56 36M91 5 77 32" opacity=".4"/>
    <path d="M23 67h27v30H23Zm43-6h25v32H66Z" fill="var(--mh-apricot)"/><path d="M36 68v28m-13-14h27m28-21v32m-12-16h25"/><path d="M61 97h26v28H61Z" fill="var(--mh-ink)"/>
    <path d="M8 107h48v10H8Z" fill="var(--mh-sea)"/><path d="m20 107-3-13 7 7 5-10 5 12 7-5 3 9" fill="var(--mh-ink)"/>
    <path d="M115 64h12v25h-12Z" fill="var(--mh-apricot)"/><path d="M8 125h133M6 129h137"/>
  </g>;
}
export function Harbor() {
  return <svg className="mh-harbor" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice" fill="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="mh-sky" x1="800" y1="0" x2="800" y2="780" gradientUnits="userSpaceOnUse"><stop stopColor="var(--mh-hydrangea)"/><stop offset=".48" stopColor="var(--mh-cloud)"/><stop offset="1" stopColor="var(--mh-apricot)"/></linearGradient>
      <linearGradient id="mh-water" x1="0" y1="580" x2="0" y2="1000" gradientUnits="userSpaceOnUse"><stop stopColor="var(--mh-hydrangea)"/><stop offset=".6" stopColor="var(--mh-sea)"/><stop offset="1" stopColor="var(--mh-ink)"/></linearGradient>
      <linearGradient id="mh-cliff" x1="1250" y1="650" x2="1200" y2="1000" gradientUnits="userSpaceOnUse"><stop stopColor="var(--mh-plum)"/><stop offset="1" stopColor="var(--mh-ink)"/></linearGradient>
      <linearGradient id="mh-wall" x1="1130" y1="460" x2="1240" y2="740" gradientUnits="userSpaceOnUse"><stop stopColor="var(--mh-paper)"/><stop offset="1" stopColor="var(--mh-apricot)"/></linearGradient>
      <linearGradient id="mh-roof" x1="1200" y1="380" x2="1200" y2="530" gradientUnits="userSpaceOnUse"><stop stopColor="var(--mh-plum)"/><stop offset="1" stopColor="var(--mh-coral)"/></linearGradient>
      <radialGradient id="mh-lamp"><stop stopColor="var(--mh-paper)"/><stop offset="1" stopColor="var(--mh-apricot)"/></radialGradient>
      <pattern id="mh-tiles" width="22" height="15" patternUnits="userSpaceOnUse"><path d="M0 14h22M11 0v14" stroke="var(--mh-ink)" strokeWidth=".9" opacity=".28"/></pattern>
      <pattern id="mh-stone" width="61" height="35" patternUnits="userSpaceOnUse"><path d="M0 34h61M27 0v34M0 17h27" stroke="var(--mh-cloud)" strokeWidth="1.1" opacity=".15"/></pattern>
    </defs>
    <path fill="url(#mh-sky)" d="M0 0h1600v1000H0z"/>
    <g className="mh-distant-layer">
      <circle cx="1325" cy="198" r="29" fill="var(--mh-paper)" opacity=".9"/>
      <circle cx="1329" cy="193" r="22" fill="var(--mh-cloud)" opacity=".24"/>
      <g className="mh-clouds mh-ambient"><Cloud x={-90} y={163} scale={1.45}/><Cloud x={610} y={250} scale={.7}/><Cloud x={1170} y={301} scale={1.38}/><Cloud x={283} y={485} scale={1.1}/></g>
      <path d="m0 605 82-21 68 8 101-58 96 31 97-45 117 48 105-37 104 52 104-21 149 24 108-56 112 46 129-18 128 47v76H0Z" fill="var(--mh-hydrangea)"/>
      <path d="M0 644c114-36 132-10 218-39 94-34 117 29 244 15 99-12 109-30 208-9 51 11 123 8 185-3 173-32 148 43 270 15 122-28 196-26 305 8l170-15v87H0Z" fill="var(--mh-sea)" opacity=".5"/>
      <path d="M0 653c101-15 175-5 266 11 128 22 168-16 314-5 134 10 221 24 394 5 136-15 262 30 386-6 78-23 155-8 240 5v337H0Z" fill="url(#mh-water)"/>
      <path d="M0 697c110-4 202 15 304 3m166-2 191 1m35-23 127 2m-658 57 152 2m222 4 212 2m-375 50 131 2m153-26 211 3M58 826l255 3m151-5 221 1m-191 52 187 1m-374 29 237 2m227-90 138 2" stroke="var(--mh-cloud)" strokeWidth="2" opacity=".48" strokeLinecap="round"/>
      <g stroke="var(--mh-paper)" strokeLinecap="round" opacity=".7"><path d="m780 701 52 1m-34 14 73 1m-52 17 49 1m-76 22 128 2m-118 17 47 1m40 0 29 1m-93 20 83 2m-101 20 163 2m-143 20 57 1m24 1 82 1m-134 22 107 2"/></g>
    </g>
    <g className="mh-middle-layer">
      <path d="M1600 555c-162-50-234 63-327 32-122-40-211-29-302 21-70 40-153 36-241 61-88 24-151 26-202 46l-94-1 104 29c159 0 270-10 362-18 169-15 312 40 700 67Z" fill="var(--mh-plum)"/>
      <path d="M1600 578c-154-48-236 65-327 36-105-33-171-30-256 9-85 39-172 42-259 62-65 16-114 23-182 25 191 29 221 14 370 6 152-8 290 59 654 62Z" fill="var(--mh-sea)"/>
      <path d="m489 706 59-16 51-4 34-28 40 4 59-34 60 15 35-38 71 18 60 69-137 24Z" fill="var(--mh-hydrangea)"/>
      <g opacity=".8"><House x={566} y={642} scale={.35}/><House x={620} y={619} scale={.43}/><House x={692} y={594} scale={.49}/><House x={768} y={593} scale={.4}/><House x={829} y={603} scale={.44}/><House x={899} y={580} scale={.43}/></g>
      <path d="M580 704q143-3 257-16t218 6" stroke="var(--mh-ink)" strokeWidth="4"/>
      <path d="M526 715h291l61 14H535Z" fill="var(--mh-ink)"/><path d="m569 711 5 26m44-26 4 28m41-26 4 25m40-25 4 24m39-22 3 22m39-21 2 20" stroke="var(--mh-ink)" strokeWidth="4"/>
      <g transform="translate(365 755)"><path d="M0 0q40 14 83-1L69 18H15Z" fill="var(--mh-plum)"/><path d="M42-55V1m0-51L17-9h25" stroke="var(--mh-paper)" strokeWidth="1.3"/><path d="m45-47 24 33H45Z" fill="var(--mh-paper)" opacity=".8"/><path d="m5 26 66 1m-48 9 39 1" stroke="var(--mh-cloud)" opacity=".4"/></g>
      <g stroke="var(--mh-ink)" strokeLinecap="round" opacity=".55"><path d="M1050 354q9-10 17 0 8-10 17 0m-166 39q7-8 13 0 6-8 13 0m98 37q5-6 11 0 6-6 11 0" strokeWidth="2"/></g>
    </g>
    <g className="mh-near-layer">
      <path d="M1600 701c-118-51-189-22-262-19-153 7-200 12-280 65-60 41-102 62-169 98-71 38-183 24-225 62-23 22 9 54 48 93h888Z" fill="url(#mh-cliff)"/>
      <path d="M1600 701c-118-51-189-22-262-19-153 7-200 12-280 65-60 41-102 62-169 98-71 38-183 24-225 62-23 22 9 54 48 93h888Z" fill="url(#mh-stone)"/>
      <path d="M1600 681c-130-39-201-13-280-9-129 6-198 20-278 77-50 36-89 72-158 98-51 20-116 17-161 40l25 11c87-17 106-1 160-24 103-43 161-113 253-130 139-27 243 10 439 1Z" fill="var(--mh-ink)"/>
      <path d="M1384 729c-62 21-119 19-161 30-90 22-113 95-202 127-86 31-112 75-107 114h149c-67-52-16-63 55-93 85-36 86-90 145-110 50-17 71-14 121-17Z" fill="var(--mh-cloud)" opacity=".65"/>
      <path d="M1384 729c-62 21-119 19-161 30-90 22-113 95-202 127-86 31-112 75-107 114" stroke="var(--mh-paper)" strokeWidth="5" opacity=".5"/>
      <g transform="translate(1005 397)" stroke="var(--mh-ink)" strokeLinejoin="round">
        <path d="M58 123h224v203H58Z" fill="url(#mh-wall)" strokeWidth="2.5"/>
        <path d="m282 123 91 28v175h-91Z" fill="var(--mh-cloud)" strokeWidth="2.5"/>
        <path d="M42 145 146 43l148-9 99 116-114 19-94-91-93 78Z" fill="url(#mh-roof)" strokeWidth="3"/>
        <path d="m146 43 148-9 99 116-114 19-94-91-93 78-50-11Z" fill="url(#mh-tiles)" strokeWidth="2"/>
        <path d="m145 43 40 35 94 91 114-19m-333 5 33 1 91-78m104-44 103 116" strokeWidth="4"/>
        <path d="m116 113 69-66 79 76-15 7-64-58-55 56Z" fill="var(--mh-plum)" strokeWidth="2"/>
        <path d="M222 16h27v45l-27 2Z" fill="var(--mh-sea)" strokeWidth="2"/><path d="M218 13h35v9h-35Z" fill="var(--mh-plum)" strokeWidth="2"/>
        <path d="M176 112h29v34h-29Z" fill="var(--mh-apricot)" strokeWidth="3"/><path d="M190 112v34m-14-17h29" strokeWidth="2"/>
        <path d="M82 178h80v79H82Zm105 0h65v79h-65Z" fill="var(--mh-ink)" strokeWidth="3"/>
        <path d="M88 184h68v67H88Zm105 0h53v67h-53Z" fill="url(#mh-lamp)" stroke="none"/>
        <path d="M123 184v67m-35-34h68m64-33v67m-27-34h53" strokeWidth="2"/>
        <path d="m88 183 19 1-7 49-12 5m68-55h-17l6 49 11 6m37-55 15 1-5 49-10 4m53-54h-12l4 47 8 6" fill="var(--mh-coral)" strokeWidth=".8"/>
        <path d="M77 258h90v8H77Zm105 0h76v8h-76Z" fill="var(--mh-plum)" strokeWidth="2"/>
        <path d="M117 279h49v47h-49Z" fill="var(--mh-plum)" strokeWidth="2"/><path d="M122 284h39v42h-39Z" fill="var(--mh-ink)"/>
        <path d="M193 284h51v29h-51Z" fill="var(--mh-apricot)" strokeWidth="2"/><path d="M218 284v29" strokeWidth="2"/>
        <path d="m58 271 224-2 83 21-12 9-73-18-222 3Z" fill="var(--mh-plum)" strokeWidth="2"/>
        <path d="M300 179h49v67h-49Z" fill="var(--mh-plum)" strokeWidth="2"/><path d="M306 185h36v53h-36Z" fill="var(--mh-apricot)"/><path d="M324 185v53m-18-26h36"/>
        <path d="M286 305h90v21h-90Z" fill="var(--mh-sea)" strokeWidth="2"/>
        <path d="M55 326h325v12H51Z" fill="var(--mh-plum)" strokeWidth="2"/><path d="M100 337h86v10H95Zm-5 10h96v9H89Z" fill="var(--mh-cloud)" strokeWidth="2"/>
        <path d="M72 294h22l-3 27H76Z" fill="var(--mh-coral)"/><path d="M82 295v-21m0 9-10-6m11 10 10-10" strokeWidth="2"/><path d="m72 277 4-8 7 10 6-13 5 11-10 10Z" fill="var(--mh-sea)" strokeWidth="1"/>
        <path d="M267 300h13v24h-13Z" fill="var(--mh-plum)"/><path d="m269 300-4-15 8 7 2-12 5 10-2 10" fill="var(--mh-sea)"/>
        <path d="M67 154h204m-200 5h193M61 320h50m64 0h103m2-164v165m76-154v124" strokeWidth="1" opacity=".35"/>
        <path d="M267 273v-45l20-12" strokeWidth="2"/><path d="m281 215 17 5-4 25-20-5Z" fill="var(--mh-apricot)" strokeWidth="1.3"/>
      </g>
      <g className="mh-lantern-scroll"><g className="mh-lantern-sway mh-ambient" transform="translate(1306 588)">
        <path d="M-13-25q13-8 26 0l6 36q-19 10-38 0Z" fill="url(#mh-lamp)" stroke="var(--mh-plum)" strokeWidth="1.3"/>
        <path d="M-13-25q13 6 26 0M-19 11q19-6 38 0M-5-24-7 12m12-36 2 36M-6 20q-6 9 1 18m11-18q7 9 2 18" stroke="var(--mh-plum)" strokeWidth="1.2"/>
      </g></g>
      <g stroke="var(--mh-ink)" strokeWidth="3" strokeLinecap="round">
        <path d="M1464 731q-31-172 26-334m-24 216 65-85m-70 34-37-76m55-27 62-53m-76 181-63-35m63 86 77-51" strokeWidth="11"/>
        <path d="M1600 293c-45-17-58-3-78 12-32-31-73-14-78 14-35-12-67 11-62 41-31 17-22 46-3 60-15 25-5 50 28 57 9 32 41 39 68 25 38 16 69-1 82-29 23 3 34-1 43-12Z" fill="var(--mh-sea)" strokeWidth="2"/>
        <path d="M1600 295c-45-17-58-3-78 12-32-31-73-14-78 14-35-12-67 11-62 41 47-11 71-4 96-25 26 8 51 0 68-15l54 5" fill="var(--mh-hydrangea)" stroke="none" opacity=".45"/>
        <path d="M1420 439c23 7 40 1 52-13m20 39c26 10 52-1 61-22m-140-64c20-12 35-7 44 0m43-42c21-8 37-3 46 8" opacity=".3"/>
        <path d="M1538 743q-5-109 45-169m-37 104 38-22m-24-8-19-30" strokeWidth="6"/>
        <path d="M1544 559c-21-19-50-10-49 13-31-7-44 22-29 40-14 26 5 50 35 45 18 22 49 19 66-3 18 4 27-3 33-11V531c-25-12-51 2-56 28Z" fill="var(--mh-plum)" strokeWidth="2"/>
      </g>
      <g className="mh-foreground-grass mh-ambient" stroke="var(--mh-ink)" strokeWidth="3" strokeLinecap="round">
        <path d="M0 848q62 37 97 152M0 914q56-3 86 86M23 816q28 67 38 184m-49-39q76-78 109-82m-41 121q5-94 48-147m-14 147q36-74 99-99m-65 99q26-66 37-129m-8 129q54-42 101-42m-42 42q-6-61 25-112M0 813v187h250" fill="var(--mh-ink)"/>
        <path d="M21 823q-32-16-23-30 20-1 23 30Zm31 89q18-29 36-17-1 18-36 17Zm61-25q-27-25-16-40 20 3 16 40Zm32 88q24-27 43-15-6 19-43 15Zm50-29q-15-35 0-43 16 11 0 43Z" fill="var(--mh-ink)"/>
        <path d="M1315 1000q-34-99-11-163m31 163q8-70 56-114m-3 114q25-108 17-175m32 175q-8-67 39-128m-10 128q34-99 107-129m-23 129q-11-68 25-119m-263 119h300V862" fill="var(--mh-ink)"/>
      </g>
      <g fill="var(--mh-coral)"><circle cx="1305" cy="842" r="6"/><circle cx="1297" cy="835" r="5"/><circle cx="1312" cy="832" r="5"/><circle cx="1391" cy="885" r="6"/><circle cx="1398" cy="879" r="5"/><circle cx="1402" cy="890" r="5"/><circle cx="1480" cy="870" r="6"/><circle cx="1472" cy="865" r="5"/><circle cx="1483" cy="861" r="5"/><circle cx="264" cy="890" r="5"/><circle cx="258" cy="884" r="5"/><circle cx="271" cy="884" r="5"/></g>
      <g fill="var(--mh-apricot)"><circle cx="1306" cy="835" r="2"/><circle cx="1397" cy="885" r="2"/><circle cx="1479" cy="866" r="2"/><circle cx="264" cy="885" r="2"/></g>
      <g transform="translate(961 855) rotate(-13)" stroke="var(--mh-ink)" strokeWidth="2"><path d="M0 0h36v29H0Z" fill="var(--mh-cloud)"/><path d="M7 0q10-11 21 0M4 29l-3 32m30-32 3 32M-3 61h41" fill="none"/><path d="M7 10h22m-18 7h14" opacity=".55"/></g>
    </g>
  </svg>;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/harbor/lantern.ts">
<![CDATA[import { clamp } from "../motion/math";
export function lanternPose(amount: number) {
  const p = clamp(amount);
  return { x: p ? -45 * p : 0, y: p ? -170 * p : 0, rotate: -4 + 9 * p };
}
]]>
    </file>
    <file path="src/app/(mio)/mio/motion/math.ts">
<![CDATA[export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, Number.isFinite(value) ? value : min));
}
export function progress(value: number, start: number, end: number) {
  return end <= start ? 0 : clamp((value - start) / (end - start));
}
export function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * clamp(amount);
}
]]>
    </file>
    <file path="src/app/(mio)/mio/motion/MotionDirector.tsx">
<![CDATA["use client";
import { useEffect } from "react";
import { progress } from "./math";
import { lanternPose } from "../harbor/lantern";

export function MotionDirector() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".mh-site");
    const hero = document.querySelector<HTMLElement>(".mh-hero");
    const header = document.querySelector<HTMLElement>(".mh-header");
    if (!root || !hero) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let height = hero.offsetHeight;
    let pageHeight = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
    let frame = 0;
    const reveals = document.querySelectorAll<HTMLElement>("[data-mh-reveal]");
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.in = "true"; observer.unobserve(entry.target); }
    }), { threshold: 0.08, rootMargin: "0px 0px -25px 0px" });
    reveals.forEach(el => { el.dataset.observed = "true"; observer.observe(el); });
    const ambientObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      (entry.target as HTMLElement).dataset.visible = String(entry.isIntersecting);
    }), { threshold: 0 });
    document.querySelectorAll("[data-mh-ambient]").forEach(el => ambientObserver.observe(el));
    const sections = [...document.querySelectorAll<HTMLElement>("main > section[id]")].filter(el => document.querySelector(`.mh-desktop-nav a[href="#${el.id}"]`));
    const chapterObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll<HTMLAnchorElement>(".mh-desktop-nav a").forEach(link => {
        const active = link.hash === `#${entry.target.id}`;
        link.dataset.active = String(active);
        if (active) link.setAttribute("aria-current", "location"); else link.removeAttribute("aria-current");
      });
    }), { rootMargin: "-15% 0px -65% 0px" });
    sections.forEach(el => chapterObserver.observe(el));
    function update() {
      frame = 0;
      if (!root) return;
      const moving = !preference.matches && root.dataset.paused !== "true";
      const p = progress(scrollY, 0, height);
      root.style.setProperty("--page-progress", String(progress(scrollY, 0, pageHeight)));
      root.style.setProperty("--hero-scroll", String(moving ? p : 0));
      const pose = lanternPose(moving ? p : 0);
      root.style.setProperty("--lantern-x", `${pose.x}px`);
      root.style.setProperty("--lantern-y", `${pose.y}px`);
      root.style.setProperty("--lantern-rotate", `${pose.rotate}deg`);
      if (header) header.dataset.scrolled = String(scrollY > 70);
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const measure = () => { height = hero.offsetHeight; pageHeight = Math.max(document.documentElement.scrollHeight - innerHeight, 1); schedule(); };
    const resize = new ResizeObserver(measure); resize.observe(document.body);
    const pauseObserver = new MutationObserver(schedule); pauseObserver.observe(root, { attributes: true, attributeFilter: ["data-paused"] });
    const visibility = () => { root.dataset.hidden = String(document.hidden); };
    window.addEventListener("scroll", schedule, { passive: true }); window.addEventListener("resize", measure, { passive: true });
    document.addEventListener("visibilitychange", visibility); preference.addEventListener("change", schedule);
    document.fonts.ready.then(measure); update(); visibility();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); ambientObserver.disconnect(); chapterObserver.disconnect(); resize.disconnect(); pauseObserver.disconnect();
      window.removeEventListener("scroll", schedule); window.removeEventListener("resize", measure); document.removeEventListener("visibilitychange", visibility); preference.removeEventListener("change", schedule);
    };
  }, []);
  return null;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/motion/Reveal.tsx">
<![CDATA[import type { CSSProperties, ReactNode } from "react";
export function Reveal({ children, variant = "rise", className = "", index = 0 }: { children: ReactNode; variant?: "rise" | "mask" | "wipe" | "scale" | "draw"; className?: string; index?: number }) {
  return <div className={className} data-mh-reveal={variant} style={{ "--i": index } as CSSProperties}><div className="mh-reveal-inner">{children}</div></div>;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/motion/SceneControl.tsx">
<![CDATA["use client";
import { useState } from "react";
export function SceneControl() {
  const [paused, setPaused] = useState(false);
  function toggle() {
    const next = !paused;
    setPaused(next);
    const root = document.querySelector<HTMLElement>(".mh-site");
    if (root) root.dataset.paused = String(next);
  }
  return <button className="mh-scene-control mh-js-only" onClick={toggle} aria-pressed={paused} aria-label={paused ? "Play scenery motion" : "Pause scenery motion"}>
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{paused ? <path d="m5 3 7 5-7 5Z"/> : <path d="M5 3v10M11 3v10"/>}</svg>
    <span>{paused ? "A still moment" : "A little life"}</span>
  </button>;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/motion/SmoothScroll.tsx">
<![CDATA["use client";
import { useEffect } from "react";
export function SmoothScroll() {
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(pointer: fine)");
    let destroy: (() => void) | undefined;
    let generation = 0;
    async function setup() {
      const current = ++generation;
      destroy?.(); destroy = undefined;
      if (preference.matches || !fine.matches) return;
      const { default: Lenis } = await import("lenis");
      if (current !== generation) return;
      const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -85 }, autoRaf: true });
      destroy = () => lenis.destroy();
    }
    void setup();
    preference.addEventListener("change", setup); fine.addEventListener("change", setup);
    return () => { ++generation; destroy?.(); preference.removeEventListener("change", setup); fine.removeEventListener("change", setup); };
  }, []);
  return null;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/sections/About.tsx">
<![CDATA[import { ArtistPortrait } from "../art/ArtistPortrait";
import { Reveal } from "../motion/Reveal";
import { Star } from "../brand/Icons";
export function About() {
  return <section className="mh-about mh-section" id="about" aria-labelledby="mh-about-title">
    <div className="mh-portrait-wrap"><Reveal variant="wipe"><figure className="mh-portrait"><div role="img" aria-label="An illustration of Mio sketching in her little seaside studio"><ArtistPortrait/></div><figcaption>Usually drawing. Occasionally making tea.</figcaption></figure></Reveal><span className="mh-portrait-doodle" aria-hidden="true"><Star/>hello, from my little corner</span></div>
    <div className="mh-about-copy"><Reveal variant="mask"><h2 id="mh-about-title">A head full of clouds.<br/>A heart in the details.</h2></Reveal><Reveal><p>I&apos;m Mio, a digital illustrator who believes the best stories are hiding in the smallest things. A light left on. A cat at the window. That feeling of coming home.</p><p>My work lives somewhere between Japanese animation, old picture books, and the places I find on long walks. I draw characters with a life beyond the frame, and worlds you might like to get a little lost in.</p><p>Sometimes those worlds begin in my sketchbook.<br/>Sometimes, they begin with you.</p></Reveal><Reveal variant="draw"><div className="mh-artist-signature">Mio <svg width="84" height="20" viewBox="0 0 84 20" fill="none" aria-hidden="true"><path d="M2 14q33 6 79-8M65 3l17 3-11 9" stroke="currentColor" strokeWidth="1.2"/></svg><span>Illustrator. World-wanderer. Tea enthusiast.</span></div></Reveal></div>
  </section>;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/sections/Contact.tsx">
<![CDATA[import { CommissionForm } from "../forms/CommissionForm";
import { Reveal } from "../motion/Reveal";
import { Lantern, Star } from "../brand/Icons";
export function Contact() {
  return <section className="mh-contact" id="inquiry" aria-labelledby="mh-contact-title">
    <div className="mh-contact-shore" aria-hidden="true"><svg viewBox="0 0 1600 60" preserveAspectRatio="none"><path d="M0 0h1600v25c-223 37-357-14-524-1S752 56 555 31 233 55 0 29Z" fill="var(--mh-paper)"/></svg></div>
    <div className="mh-contact-inner mh-section"><div className="mh-contact-copy"><Reveal variant="mask"><h2 id="mh-contact-title">Your daydream.<br/>My paintbrush.</h2></Reveal><Reveal><p>Have a little world in mind?<br/>I&apos;d love to hear about it.</p><p className="mh-contact-note">Big ideas, small ideas, “I&apos;m not quite sure yet” ideas.<br/>They&apos;re all welcome here.</p></Reveal><div className="mh-contact-illustration" aria-hidden="true"><svg viewBox="0 0 300 150" fill="none"><path d="M0 131q53-9 107 0t108 0 85 0m-270 13q59-9 101 0m69 0q49-8 98 0" stroke="currentColor" strokeWidth="1"/><path d="M61 49q37-17 66 1t66-3" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6"/><path d="m167 39 27 7-21 14" stroke="currentColor" strokeWidth="1"/></svg><Lantern/><Star/></div></div><Reveal className="mh-contact-form-wrap"><CommissionForm/><noscript><p>This demo form needs JavaScript to prepare a commission brief. Explore the sample prices above to plan your idea.</p></noscript></Reveal></div>
  </section>;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/sections/Faq.tsx">
<![CDATA[import { Reveal } from "../motion/Reveal";
const FAQ = [
  ["Can I commission something that isn't listed?", "Of course. These three options are starting points. Book covers, a special gift, a bigger cast of characters—describe your idea and I'll work out a scope and a custom quote with you."],
  ["Can I use my illustration commercially?", "The sample prices cover personal use: gifts, personal prints, profile pictures, and wallpapers. If your artwork will appear on products, packaging, books, or anything sold, mention that in your brief so commercial rights can be quoted separately."],
  ["What if my idea changes along the way?", "Sketch revisions are included so we can find the right direction together. Once you approve the sketch, larger changes may need a revised quote. We'll always agree on that before any extra work begins."],
  ["How will I receive the finished piece?", "As a high-resolution digital PNG, suitable for personal printing, plus the agreed crops. No physical item is shipped. Exact size, delivery date, and any print requirements are agreed before we start."],
];
export function Faq() {
  return <section className="mh-faq mh-section" id="faq" aria-labelledby="mh-faq-title"><Reveal variant="mask"><h2 id="mh-faq-title">A few things<br/>you might wonder.</h2></Reveal><div>{FAQ.map(([question, answer]) => <Reveal key={question} variant="rise"><details className="mh-faq-item"><summary>{question}<span aria-hidden="true"><i/><i/></span></summary><div className="mh-faq-answer"><div><p>{answer}</p></div></div></details></Reveal>)}</div></section>;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/sections/Footer.tsx">
<![CDATA[import { Logo } from "../brand/Logo";
import { Arrow } from "../brand/Icons";
import { FooterScene } from "../harbor/FooterScene";
import { Reveal } from "../motion/Reveal";
const EXPLORE = [{ href: "#work", label: "Selected work" }, { href: "#about", label: "A little about me" }, { href: "#process", label: "How it works" }];
const COMMISSIONS = [{ href: "#commissions", label: "Sample prices" }, { href: "#faq", label: "Questions" }, { href: "#inquiry", label: "Send a brief" }];
function LinkColumn({ label, links, index }: { label: string; links: { href: string; label: string }[]; index: number }) {
  return <Reveal index={index}><nav aria-label={label}><p className="mh-footer-label" aria-hidden="true">{label}</p><ul>{links.map(link => <li key={link.href}><a className="mh-footer-link" href={link.href}>{link.label}</a></li>)}</ul></nav></Reveal>;
}
export function Footer() {
  return <footer className="mh-footer">
    <div className="mh-footer-inner mh-section">
      <Reveal className="mh-footer-rule" variant="draw"><div className="mh-footer-line"/></Reveal>
      <div className="mh-footer-grid">
        <Reveal className="mh-footer-brand"><a href="#home" aria-label="Mio Hazuki, back to the harbor"><Logo/></a><p>Thanks for finding your way here.<br/>I hope you stay a little curious.</p><p className="mh-availability"><span aria-hidden="true"/>A few commission spots open</p></Reveal>
        <LinkColumn label="Explore" links={EXPLORE} index={1}/>
        <LinkColumn label="Commissions" links={COMMISSIONS} index={2}/>
      </div>
      <div className="mh-footer-bottom"><span>© 2026 Mio Hazuki · A fictional artist portfolio</span><a className="mh-back-top" href="#home">Back to the harbor <Arrow/></a><a className="mh-footer-cta" href="#inquiry">Start a commission brief <Arrow/></a></div>
    </div>
    <div className="mh-footer-scene" data-mh-ambient aria-hidden="true"><FooterScene/></div>
  </footer>;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/sections/Header.tsx">
<![CDATA["use client";
import { useRef } from "react";
import { Logo } from "../brand/Logo";
import { Arrow } from "../brand/Icons";
const links = [{ href: "#work", label: "Selected work" }, { href: "#about", label: "A little about me" }, { href: "#commissions", label: "Commissions" }];
export function Header() {
  const menu = useRef<HTMLDetailsElement>(null);
  return <header className="mh-header" data-scrolled="false">
    <a className="mh-home" href="#home" aria-label="Mio Hazuki, back to the harbor"><Logo/></a>
    <nav className="mh-desktop-nav" aria-label="Main navigation">{links.map(link => <a href={link.href} key={link.href}>{link.label}</a>)}</nav>
    <a href="#inquiry" className="mh-header-cta">Let&apos;s make something <Arrow/></a>
    <details className="mh-mobile-menu" ref={menu} onKeyDown={event => { if (event.key === "Escape" && menu.current) { menu.current.open = false; menu.current.querySelector("summary")?.focus(); } }}>
      <summary aria-label="Open navigation"><span/><span/></summary>
      <nav aria-label="Mobile navigation">{links.map(link => <a href={link.href} key={link.href} onClick={() => { if (menu.current) menu.current.open = false; }}>{link.label}<Arrow/></a>)}<a href="#inquiry" onClick={() => { if (menu.current) menu.current.open = false; }}>Let&apos;s make something<Arrow/></a></nav>
    </details>
  </header>;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/sections/Hero.tsx">
<![CDATA[import { Harbor } from "../harbor/Harbor";
import { Arrow, Star } from "../brand/Icons";
import { SceneControl } from "../motion/SceneControl";
export function Hero() {
  return <section className="mh-hero" id="home" aria-labelledby="mh-hero-title" data-mh-ambient data-visible="true">
    <div className="mh-scene"><Harbor/></div>
    <div className="mh-hero-copy">
      <p className="mh-availability"><span/> A few commission spots open <Star/></p>
      <h1 id="mh-hero-title"><span className="mh-line"><span>A little wonder,</span></span><span className="mh-line"><span>made just for you.</span></span></h1>
      <p className="mh-hero-description">Hi, I&apos;m Mio. I draw quiet adventures, curious souls,<br className="mh-desktop-break"/> and places that feel a little like home.</p>
      <div className="mh-hero-actions"><a className="mh-button" href="#commissions">Bring your story to life <Arrow/></a><a className="mh-text-link" href="#work">Wander through my work <span aria-hidden="true">↘</span></a></div>
      <p className="mh-hero-note">A little imagination goes a long way.</p>
    </div>
    <div className="mh-hero-bottom"><a className="mh-scroll-note" href="#work"><span className="mh-scroll-line"/>Stay a while. Scroll a little.</a><span className="mh-scene-note">Somewhere between a memory & a daydream.</span><SceneControl/></div>
    <div className="mh-shoreline" aria-hidden="true"><svg viewBox="0 0 1600 70" preserveAspectRatio="none"><path d="M0 29C187 51 290 6 452 23S773 67 966 36 1336 9 1600 35V70H0Z" fill="var(--mh-paper)"/></svg></div>
  </section>;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/sections/Pricing.tsx">
<![CDATA[import { PACKAGES } from "../data";
import { Arrow, Star } from "../brand/Icons";
import { Reveal } from "../motion/Reveal";
export function Pricing() {
  return <section className="mh-pricing mh-section" id="commissions" aria-labelledby="mh-pricing-title">
    <div className="mh-section-heading"><Reveal variant="mask"><h2 id="mh-pricing-title">What shall we<br/>dream up together?</h2></Reveal><Reveal><p>A gift for someone you love. A character you&apos;ve imagined.<br/>A place that only exists in your head. Let&apos;s make it real.</p><span className="mh-availability"><span/> A small number of spots each month</span></Reveal></div>
    <div className="mh-package-grid">{PACKAGES.map((item, i) => <Reveal key={item.id} variant="scale" index={i}><article className={`mh-package ${i === 1 ? "mh-package-featured" : ""}`}>
      <div className="mh-package-top"><span className="mh-package-kind">{item.kind}</span>{i === 1 && <Star/>}</div><h3>{item.name}</h3><p>{item.description}</p><div className="mh-price"><span>from</span><strong>${item.price}</strong><span>USD</span></div><ul>{item.includes.map(text => <li key={text}><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="m3 8 3 3 7-7"/></svg>{text}</li>)}</ul><div className="mh-package-time">Usually {item.time}</div><a href={`?commission=${item.id}#inquiry`} className={`mh-button ${i === 1 ? "" : "mh-button-outline"}`} data-mh-package={item.id}>Let&apos;s make this <Arrow/></a>
    </article></Reveal>)}</div>
    <div className="mh-pricing-note"><p>Every piece is made just for you. Personal use included.<br/>For commercial work or something a little different, tell me your idea.</p><p>Sample prices · Final quote agreed before we begin<br/>50% to reserve your spot · 50% on completion</p></div>
  </section>;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/sections/Process.tsx">
<![CDATA[import { PROCESS } from "../data";
import { Reveal } from "../motion/Reveal";
export function Process() {
  return <section className="mh-process mh-section" id="process" aria-labelledby="mh-process-title">
    <Reveal variant="mask"><h2 id="mh-process-title">From a small idea<br/>to something you can keep.</h2></Reveal>
    <ol className="mh-process-list">{PROCESS.map((step, index) => <li key={step.title}><Reveal variant="draw"><div className="mh-process-line"><span>{String(index + 1).padStart(2, "0")}</span><svg viewBox="0 0 200 24" fill="none" aria-hidden="true"><path d="M2 12q48-11 95 0t100 0m-8-5 9 5-9 5" stroke="currentColor" strokeWidth="1"/></svg></div></Reveal><Reveal index={index}><h3>{step.title}</h3><p>{step.text}</p></Reveal></li>)}</ol>
  </section>;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/sections/Works.tsx">
<![CDATA[import { Reveal } from "../motion/Reveal";
import { WorkGallery } from "../works/WorkGallery";
export function Works() {
  return <section className="mh-works mh-section" id="work" aria-labelledby="mh-work-title">
    <div className="mh-section-heading"><Reveal variant="mask"><h2 id="mh-work-title">A few worlds<br/>I&apos;ve wandered into.</h2></Reveal><Reveal><p>For the daydreamers, the homebodies,<br/>and anyone who&apos;s ever taken the scenic route.</p><span className="mh-section-aside">Selected illustrations, 2025–26</span></Reveal></div>
    <WorkGallery/>
  </section>;
}
]]>
    </file>
    <file path="src/app/(mio)/mio/works/WorkGallery.tsx">
<![CDATA["use client";
import { useEffect, useRef, useState } from "react";
import { WORKS, type Work } from "../data";
import { Picture } from "../assets";
import { Arrow, Star } from "../brand/Icons";
export function WorkGallery() {
  const [category, setCategory] = useState("All work");
  const [selected, setSelected] = useState<Work | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const visible = WORKS.filter(work => category === "All work" || work.category === category);
  useEffect(() => {
    if (selected) dialog.current?.showModal();
  }, [selected]);
  function close() { dialog.current?.close(); }
  return <>
    <div className="mh-work-filters" role="group" aria-label="Filter artwork">{["All work", "Worlds", "Characters"].map(item => <button key={item} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}<span className="mh-filter-dot"/></button>)}</div>
    <div className="mh-work-grid" data-filter={category}>
      {visible.map((work, index) => <article className={`mh-work mh-work-${work.id}`} key={work.id}>
        <button type="button" className="mh-work-open" onClick={event => { opener.current = event.currentTarget; setSelected(work); }} aria-label={`View ${work.title}`}>
          <div className="mh-work-art"><Picture assetKey={work.id} alt={work.description}/><span className="mh-art-view"><Arrow/></span></div>
          <span className="mh-work-caption"><span><span className="mh-work-title">{work.title}</span><span className="mh-work-category">{work.format}</span></span><span className="mh-work-year">{work.year}<Arrow/></span></span>
        </button>
        <span className="mh-art-annotation" aria-hidden="true">{index === 0 ? "a place to return to" : work.id === "cloud-keeper" ? "a friend for the journey" : work.id === "quiet-delivery" ? "the ordinary, a little magical" : "the art of doing nothing"}<svg viewBox="0 0 110 20" fill="none"><path d="M3 10q47 10 99-3m-5-3 6 3-5 4" stroke="currentColor" strokeWidth="1"/></svg></span>
      </article>)}
    </div>
    <dialog ref={dialog} className="mh-work-dialog" aria-labelledby="mh-work-dialog-title" onClose={() => { setSelected(null); opener.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) close(); }} data-lenis-prevent>
      {selected && <div className="mh-dialog-content"><button className="mh-dialog-close" type="button" onClick={close} aria-label="Close artwork details"><svg width="22" height="22" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19"/></svg></button><Picture assetKey={selected.id} alt={selected.description} prefix="detail"/><div className="mh-dialog-copy"><span className="mh-work-category">{selected.format} · {selected.year}</span><h2 id="mh-work-dialog-title">{selected.title}</h2><p>{selected.description}</p><p className="mh-muted">{selected.note}</p><a href={`?commission=${selected.category === "Characters" ? "portrait" : "world"}#inquiry`} className="mh-button" data-mh-package={selected.category === "Characters" ? "portrait" : "world"} onClick={close}>Dream up something like this <Arrow/></a><p className="mh-small">Original sample artwork for this portfolio concept.</p></div></div>}
    </dialog>
    <p className="mh-work-closing"><Star/>Every little world begins with a feeling. What’s yours?</p>
  </>;
}
]]>
    </file>
  </files>
</template>
