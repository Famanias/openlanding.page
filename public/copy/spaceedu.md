<template slug="spaceedu" name="SpaceEdu">
  <dependencies>
    {
      "dependencies": {}
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(spaceedu)/layout.tsx">
<![CDATA[import type { Metadata } from "next";
import { Hanken_Grotesk, Poppins, Prata } from "next/font/google";
import "./spaceedu/spaceedu.css";
import "./spaceedu/spaceedu-overrides.css";

const serif = Prata({ variable: "--font-serif", subsets: ["latin"], weight: "400", display: "swap" });
const body = Hanken_Grotesk({ variable: "--font-body", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const logo = Poppins({ variable: "--font-logo", subsets: ["latin"], weight: ["500", "600"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://openlandingpage.vercel.app"),
  title: "SpaceEdu · Explore the nearest black holes",
  description: "Explore real black holes through interactive astrophysics lessons from SpaceEdu.",
  openGraph: {
    title: "SpaceEdu · Explore the nearest black holes",
    description: "Explore real black holes through interactive astrophysics lessons from SpaceEdu.",
    type: "website",
  },
};

export default function SpaceEduLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${body.variable} ${logo.variable} spaceedu-body`}>{children}</body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(spaceedu)/spaceedu/page.tsx">
<![CDATA[import SpaceEduExperience from "./SpaceEduExperience";

export default function SpaceEduPage() {
  return <SpaceEduExperience />;
}
]]>
    </file>
    <file path="src/app/(spaceedu)/spaceedu/spaceedu-overrides.css">
<![CDATA[/* Keep edge object controls above the full frame hit layer. */
.planet { z-index: 1 !important; }
.cta > a,
.label { position: relative; z-index: 2; }

html:has(.spaceedu-page),
body.spaceedu-body { overflow-x: hidden; overflow-y: auto; }
.spaceedu-page { min-height: 100svh; background: #04101f; }
.spaceedu-page .stage { position: relative; height: 100svh; min-height: 100svh; }
.spaceedu-section { position: relative; min-height: 100svh; padding: 96px 7vw; background: #08162a; color: #fff; }
.spaceedu-section--enroll { background: #04101f; }
.spaceedu-section__inner { max-width: 960px; margin: 0 auto; }
.spaceedu-section__eyebrow { margin: 0 0 24px; color: #79dce8; font: 600 12px/1.2 var(--font-body); letter-spacing: .22em; text-transform: uppercase; }
.spaceedu-section h2 { max-width: 720px; margin: 0; font: 400 clamp(2.5rem, 7vw, 6rem)/1 var(--font-serif); text-wrap: balance; }
.spaceedu-section__inner > p:not(.spaceedu-section__eyebrow) { max-width: 620px; margin: 28px 0 0; color: rgba(255,255,255,.78); font: 400 18px/1.6 var(--font-body); text-wrap: pretty; }
.spaceedu-cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 64px; }
.spaceedu-cards article { min-height: 250px; padding: 24px; border: 1px solid rgba(255,255,255,.18); background: #0b2239; }
.spaceedu-cards span { color: #79dce8; font: 600 12px/1 var(--font-body); letter-spacing: .14em; }
.spaceedu-cards h3 { margin: 64px 0 12px; font: 600 24px/1.1 var(--font-body); }
.spaceedu-cards p { color: rgba(255,255,255,.72); font: 400 15px/1.5 var(--font-body); }
.spaceedu-enroll { padding-top: 12vh; }
.spaceedu-enroll form { max-width: 620px; margin-top: 48px; }
.spaceedu-enroll label { display: block; margin-bottom: 12px; color: rgba(255,255,255,.72); font: 500 14px/1.2 var(--font-body); }
.spaceedu-enroll form div { display: flex; gap: 12px; }
.spaceedu-enroll input { flex: 1; min-width: 0; height: 48px; padding: 0 16px; border: 1px solid rgba(255,255,255,.28); border-radius: 4px; background: #08162a; color: #fff; font: 400 16px/1 var(--font-body); }
.spaceedu-enroll button { min-height: 48px; padding: 0 20px; border: 0; border-radius: 999px; background: #fff; color: #071227; font: 600 14px/1 var(--font-body); cursor: pointer; }
.spaceedu-back { display: inline-block; margin-top: 48px; color: #79dce8; font: 500 14px/1 var(--font-body); text-decoration: none; }
@media (max-width: 700px) { .spaceedu-section { padding: 72px 24px; } .spaceedu-cards { grid-template-columns: 1fr; margin-top: 40px; } .spaceedu-cards article { min-height: 180px; } .spaceedu-cards h3 { margin-top: 36px; } .spaceedu-enroll form div { flex-direction: column; } }
]]>
    </file>
    <file path="src/app/(spaceedu)/spaceedu/spaceedu.css">
<![CDATA[@import "tailwindcss";

:root{--dw:1353;--dh:1163;--gutter:25;--u:max(min(.72px,calc(100vh / 700)),min(calc(100vw / 1353),calc(100vh / 1163)));--dh-px:calc(1163 * var(--u));--vshift:calc(max(0px,(100vh - var(--dh-px)) * .42));--ink:#fff;--cyan:#79dce8;--cyan-logo:#5fd0e1;--rule:rgba(255,255,255,.23);--btn-ink:#071227}
@supports(height:100dvh){:root{--u:max(min(.72px,calc(100dvh / 700)),min(calc(100vw / 1353),calc(100dvh / 1163)));--vshift:calc(max(0px,(100dvh - var(--dh-px)) * .42))}}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}html,body{height:100%;overflow:hidden}body{background:#04101f;color:var(--ink);font-family:var(--font-body);-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision}button,a{ -webkit-tap-highlight-color:transparent}button:focus-visible,a:focus-visible{outline:calc(2 * var(--u)) solid var(--cyan);outline-offset:calc(3 * var(--u))}
.stage{position:fixed;inset:0;overflow:hidden;isolation:isolate;background:#04101f;color:#fff}.sky{position:absolute;inset:0;z-index:0;background:radial-gradient(circle at 50% 45%,#0b2239 0%,#04101f 70%)}.sky canvas{position:absolute;inset:0;width:100%;height:100%;display:block}.ui{position:absolute;inset:0;z-index:3}.copy{position:absolute;inset:0;transform:translateY(var(--vshift));pointer-events:none}.copy a,.copy button{pointer-events:auto}.col{position:absolute;left:0;right:calc(var(--gutter) * var(--u));text-align:center}.navbar{position:absolute;top:0;left:0;right:0;z-index:6;height:calc(88 * var(--u))}.navbar::after{content:"";position:absolute;left:calc(25 * var(--u));right:calc(49 * var(--u));top:calc(86 * var(--u));height:calc(2 * var(--u));background:var(--rule)}.navrow{position:absolute;left:calc(25 * var(--u));right:calc(49 * var(--u));top:0;height:calc(86 * var(--u));display:flex;align-items:center;justify-content:space-between}.logo{font-family:var(--font-logo);font-weight:600;font-size:calc(18.4 * var(--u));letter-spacing:calc(-.15 * var(--u));line-height:1;color:#fff;text-decoration:none;white-space:nowrap;position:relative;top:calc(-1 * var(--u))}.logo i{font-style:normal;color:var(--cyan-logo)}.links{display:flex;align-items:center}.links a{position:relative;display:flex;align-items:center;height:calc(86 * var(--u));font-size:calc(18.4 * var(--u));font-weight:400;line-height:1;color:#fff;text-decoration:none;padding:0 calc(17.5 * var(--u));letter-spacing:calc(-1 * var(--u));white-space:nowrap}.links a[aria-current=page]::after{content:"";position:absolute;left:0;right:0;top:calc(83.5 * var(--u));height:calc(4 * var(--u));background:var(--cyan);border-radius:calc(1 * var(--u))}.links a:nth-child(2){margin-left:calc(24 * var(--u))}.links a:nth-child(3){margin-left:calc(26 * var(--u));letter-spacing:calc(-1.75 * var(--u))}.links a:nth-child(4){margin-left:calc(27 * var(--u))}.links a.enroll{margin-left:calc(28.5 * var(--u));width:calc(107 * var(--u));height:calc(38 * var(--u));border-radius:calc(19 * var(--u));display:flex;align-items:center;justify-content:center;font-size:calc(17 * var(--u));font-weight:600;color:var(--btn-ink);padding-top:calc(2 * var(--u));background:linear-gradient(180deg,#fff 0%,#d8ecfe 9%,#dceefe 72%,#f4f9ff 100%);box-shadow:0 calc(3 * var(--u)) calc(14 * var(--u)) rgba(255,255,255,.22),inset 0 0 0 calc(1.5 * var(--u)) rgba(255,255,255,.92)}.burger{display:none;position:relative;width:calc(46 * var(--u));height:calc(46 * var(--u));padding:0;border:0;background:none;cursor:pointer;flex-direction:column;align-items:center;justify-content:center;gap:calc(6 * var(--u))}.burger span{display:block;width:calc(24 * var(--u));height:calc(2 * var(--u));border-radius:calc(2 * var(--u));background:#fff;transition:transform .28s cubic-bezier(.22,1,.36,1),opacity .2s}.navrow[data-open=true] .burger span:nth-child(1){transform:translateY(calc(8 * var(--u))) rotate(45deg)}.navrow[data-open=true] .burger span:nth-child(2){opacity:0}.navrow[data-open=true] .burger span:nth-child(3){transform:translateY(calc(-8 * var(--u))) rotate(-45deg)}
.eyebrow{top:calc(188.8 * var(--u));font-size:calc(30.45 * var(--u));font-weight:500;line-height:1;letter-spacing:calc(4 * var(--u));text-indent:calc(4 * var(--u));color:#fff}.title{top:calc(268 * var(--u));font-family:var(--font-serif);font-weight:400;font-size:calc(112.4 * var(--u));line-height:1;letter-spacing:calc(2 * var(--u));text-indent:calc(2 * var(--u));color:#fff}.rule{top:calc(405.5 * var(--u));height:calc(5 * var(--u));font-size:0;line-height:0;padding-right:calc(2 * var(--u))}.rule span{display:inline-block;vertical-align:top;width:calc(100 * var(--u));height:100%;border-radius:calc(2.5 * var(--u));background:var(--cyan)}.lede{top:calc(433.2 * var(--u));font-size:calc(18.36 * var(--u));font-weight:400;line-height:calc(30 * var(--u));color:rgba(255,255,255,.95);text-wrap:balance}.cta{top:calc(597 * var(--u));height:calc(66 * var(--u));isolation:isolate}.cta>a{display:inline-flex;align-items:center;justify-content:center;width:calc(216 * var(--u));height:calc(66 * var(--u));border-radius:calc(33 * var(--u));font-size:calc(17 * var(--u));font-weight:700;line-height:1;color:var(--btn-ink);text-decoration:none;padding-top:calc(2 * var(--u));background:linear-gradient(180deg,#fff 0%,#d6e8f8 4%,#d9ecfe 72%,#fff 100%);box-shadow:0 calc(10 * var(--u)) calc(18 * var(--u)) calc(-8 * var(--u)) rgba(255,255,255,.5),0 0 calc(26 * var(--u)) rgba(255,255,255,.18),inset 0 0 0 calc(2 * var(--u)) rgba(255,255,255,.9);transition:transform 500ms cubic-bezier(.22,1,.36,1),box-shadow 300ms cubic-bezier(.22,1,.36,1)}.cta>a:hover{transform:translateY(calc(-2 * var(--u)));box-shadow:0 calc(12 * var(--u)) calc(24 * var(--u)) calc(-8 * var(--u)) rgba(255,255,255,.55),0 0 calc(30 * var(--u)) rgba(255,255,255,.24),inset 0 0 0 calc(2 * var(--u)) rgba(255,255,255,.9)}.cta>a:active{transform:scale(.98)}.label{position:absolute;top:calc(33 * var(--u));font-family:var(--font-serif);font-weight:400;font-size:calc(17.8 * var(--u));letter-spacing:calc(4.6 * var(--u));line-height:1;color:#fff;white-space:nowrap}.label-l{left:calc(111 * var(--u))}.label-r{right:calc(104 * var(--u))}.planet{position:absolute;z-index:-1;padding:0;border:0;background:none;appearance:none;line-height:0;cursor:pointer;transition:transform 500ms cubic-bezier(.22,1,.36,1)}.planet canvas{display:block;width:100%;height:auto;aspect-ratio:1}.planet:hover{transform:scale(1.045)}.planet:active{transform:scale(.99)}.planet-l{width:calc(143 * var(--u));left:calc(-69.5 * var(--u));top:calc(-38.3 * var(--u))}.planet-r{width:calc(143 * var(--u));right:calc(-64.7 * var(--u));top:calc(-40.6 * var(--u))}.scroll{position:absolute;z-index:4;left:50%;margin-left:calc((-48 - (var(--gutter) / 2)) * var(--u));bottom:calc(68 * var(--u));width:calc(96 * var(--u));height:calc(96 * var(--u));border-radius:50%;background:rgba(24,30,42,.7);backdrop-filter:blur(calc(6 * var(--u)));border:0;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform 500ms cubic-bezier(.22,1,.36,1),background-color 300ms cubic-bezier(.22,1,.36,1)}.scroll:hover{transform:translateY(calc(-4 * var(--u)));background:rgba(35,53,73,.82)}.scroll:active{transform:scale(.98)}.scroll svg{width:calc(20 * var(--u));height:calc(25 * var(--u));display:block}
.ent-mask,.ent-line{display:block}.anim .ent-mask{overflow:hidden;padding-top:.18em;margin-top:-.18em}.anim .ent-line{transform:translateY(115%);will-change:transform}.anim .navbar::after,.anim .links a[aria-current=page]::after,.anim .rule span{transform:scaleX(0)}.anim .logo,.anim .links a,.anim .burger,.anim .lede,.anim .label,.anim .cta>a,.anim .scroll,.anim .sky{opacity:0}.play .sky{animation:ent-fade 1.6s cubic-bezier(.4,0,.2,1) .25s both}.play .navbar::after{animation:ent-draw .9s cubic-bezier(.16,1,.3,1) .12s both}.play .logo{animation:ent-rise .6s cubic-bezier(.22,1,.36,1) .2s both}.play .links a{animation:ent-rise .55s cubic-bezier(.22,1,.36,1) both}.play .links a:nth-child(1){animation-delay:.26s}.play .links a:nth-child(2){animation-delay:.31s}.play .links a:nth-child(3){animation-delay:.36s}.play .links a:nth-child(4){animation-delay:.41s}.play .links a.enroll,.play .burger{animation:ent-settle .6s cubic-bezier(.22,1,.36,1) .46s both}.play .eyebrow .ent-line{animation:ent-reveal .75s cubic-bezier(.16,1,.3,1) .3s both}.play .title .ent-line{animation:ent-reveal .95s cubic-bezier(.16,1,.3,1) .44s both}.play .rule span{animation:ent-draw .65s cubic-bezier(.16,1,.3,1) .78s both}.play .lede{animation:ent-rise .7s cubic-bezier(.22,1,.36,1) .86s both}.play .label-l{animation:ent-rise .6s cubic-bezier(.22,1,.36,1) 1.04s both}.play .label-r{animation:ent-rise .6s cubic-bezier(.22,1,.36,1) 1.1s both}.play .cta>a{animation:ent-settle .7s cubic-bezier(.22,1,.36,1) 1.14s both}.play .scroll{animation:ent-settle .6s cubic-bezier(.22,1,.36,1) 1.42s both}@keyframes ent-reveal{from{transform:translateY(115%)}to{transform:translateY(0)}}@keyframes ent-rise{from{opacity:0;transform:translateY(calc(8 * var(--u)))}to{opacity:1;transform:none}}@keyframes ent-settle{from{opacity:0;transform:translateY(calc(8 * var(--u))) scale(.965)}to{opacity:1;transform:none}}@keyframes ent-draw{from{transform:scaleX(0)}to{transform:scaleX(1)}}@keyframes ent-fade{from{opacity:0}to{opacity:1}}
@media(max-width:1030px),(max-height:620px){.navrow{left:calc(25 * var(--u));right:calc(25 * var(--u))}.burger{display:flex}.links{position:absolute;top:calc(96 * var(--u));right:0;z-index:5;width:min(calc(324 * var(--u)),calc(100vw - 50 * var(--u)));flex-direction:column;align-items:stretch;padding:calc(12 * var(--u));border-radius:calc(20 * var(--u));background:rgba(9,21,42,.9);backdrop-filter:blur(calc(18 * var(--u)));border:calc(1 * var(--u)) solid rgba(255,255,255,.14);box-shadow:0 calc(18 * var(--u)) calc(44 * var(--u)) rgba(2,8,20,.55);opacity:0;visibility:hidden;transform:translateY(calc(-10 * var(--u)));transition:opacity 300ms cubic-bezier(.22,1,.36,1),transform 500ms cubic-bezier(.22,1,.36,1),visibility 300ms}.navrow[data-open=true] .links{opacity:1;visibility:visible;transform:none}.links a:nth-child(n){margin-left:0;height:auto;justify-content:flex-start;padding:calc(14 * var(--u)) calc(16 * var(--u));font-size:calc(19 * var(--u));letter-spacing:calc(-.6 * var(--u))}.links a+a{border-top:calc(1 * var(--u)) solid rgba(255,255,255,.08)}.links a[aria-current=page]::after{top:auto;bottom:calc(9 * var(--u));left:calc(16 * var(--u));right:auto;width:calc(26 * var(--u));height:calc(3 * var(--u))}.links a.enroll{margin:calc(14 * var(--u)) 0 calc(2 * var(--u));width:100%;height:calc(46 * var(--u));border-radius:calc(23 * var(--u));justify-content:center;font-size:calc(18 * var(--u));border-top:0}}
@media(max-width:579px),(max-height:620px){:root{--gutter:0;--u:max(min(.92px,calc(100vh / 620)),min(calc(100vw / 430),calc(100vh / 880)));--dh-px:calc(880 * var(--u));--vshift:calc(max(0px,(100vh - var(--dh-px)) * .34))}.navbar{height:calc(76 * var(--u))}.navbar::after{left:calc(24 * var(--u));right:calc(24 * var(--u));top:calc(74 * var(--u))}.navrow{left:calc(24 * var(--u));right:calc(24 * var(--u));height:calc(74 * var(--u))}.links{top:calc(84 * var(--u))}.copy{top:calc(76 * var(--u));display:flex;flex-direction:column;align-items:center;padding:calc(56 * var(--u)) calc(26 * var(--u)) 0}.col{position:static;width:100%;right:auto}.eyebrow{font-size:calc(20 * var(--u));letter-spacing:calc(5 * var(--u));text-indent:calc(5 * var(--u))}.title{font-size:calc(86 * var(--u));margin-top:calc(15 * var(--u))}.rule{margin-top:calc(20 * var(--u));height:calc(5 * var(--u));padding-right:0}.rule span{width:calc(84 * var(--u))}.lede{margin-top:calc(19 * var(--u));font-size:calc(15.5 * var(--u));line-height:calc(26 * var(--u));max-width:calc(400 * var(--u));text-wrap:balance}.lede br{display:none}.cta{top:auto;margin-top:calc(32 * var(--u));height:calc(60 * var(--u));position:relative}.cta>a{width:calc(190 * var(--u));height:calc(60 * var(--u));border-radius:calc(30 * var(--u))}.label{top:50%;transform:translateY(-50%);font-size:calc(16 * var(--u));letter-spacing:calc(4 * var(--u))}.label-l{left:calc(56 * var(--u))}.label-r{right:calc(60 * var(--u))}.planet-l{width:calc(89 * var(--u));left:calc(-44.5 * var(--u));top:calc(-17 * var(--u))}.planet-r{width:calc(89 * var(--u));right:calc(-44.5 * var(--u));top:calc(-18.3 * var(--u))}.scroll{width:calc(74 * var(--u));height:calc(74 * var(--u));margin-left:calc(-37 * var(--u));bottom:calc(49 * var(--u))}.scroll svg{width:calc(15.5 * var(--u));height:calc(19.5 * var(--u))}}
@media(max-height:660px){.scroll{display:none}}@media(max-height:620px){:root{--u:max(min(.85px,calc(100vh / 470)),min(calc(100vw / 640),calc(100vh / 560)));--dh-px:calc(560 * var(--u));--vshift:0px}.copy{padding-top:calc(26 * var(--u))}.title{font-size:calc(64 * var(--u));margin-top:calc(8 * var(--u))}.rule{margin-top:calc(12 * var(--u))}.lede{margin-top:calc(12 * var(--u))}.cta{margin-top:calc(20 * var(--u))}}@media(max-width:500px){.label{top:calc(100% + 34 * var(--u));transform:none;font-size:calc(15 * var(--u))}.label-l{left:calc(6 * var(--u))}.label-r{right:calc(6 * var(--u))}}@media(prefers-reduced-motion:reduce){.planet,.scroll,.links,.burger span{transition:none}.planet:hover,.planet:active,.scroll:hover,.scroll:active{transform:none}.anim .ent-line{transform:none}.anim .sky,.anim .logo,.anim .links,.anim .burger,.anim .lede,.anim .label,.anim .cta>a,.anim .scroll{opacity:1}.scroll{display:none}}
]]>
    </file>
    <file path="src/app/(spaceedu)/spaceedu/SpaceEduExperience.tsx">
<![CDATA["use client";

import { useEffect, useRef, useState } from "react";

type PlanetKey = "gaia" | "cygnus" | "sgra";
type Planet = { name: string; lede: string; colors: [string, string]; density: number; jet: number; tilt: number; glow: number };

const ORDER: PlanetKey[] = ["gaia", "cygnus", "sgra"];
const PLANETS: Record<PlanetKey, Planet> = {
  gaia: {
    name: "GAIA BH1",
    lede: "Discover the nearest known black hole to Earth, a dormant ten solar mass singularity<br>just 1,560 light years away in Ophiuchus. Course enrollment starts today, don’t miss out!",
    colors: ["#c9fbff", "#58bddb"], density: 0.82, jet: 0.06, tilt: 0.24, glow: 0.5,
  },
  cygnus: {
    name: "CYGNUS X 1",
    lede: "Explore a fierce stellar mass X ray binary stripping superheated plasma from a blue<br>supergiant companion star. Course enrollment starts today, don’t miss out!",
    colors: ["#d4fbff", "#5576ff"], density: 1.3, jet: 0.72, tilt: 0.38, glow: 0.3,
  },
  sgra: {
    name: "SGR A*",
    lede: "Journey to the supermassive four million solar mass gravitational anchor at the heart<br>of our Milky Way galaxy. Course enrollment starts today, don’t miss out!",
    colors: ["#ffe0a1", "#e65a2c"], density: 1.8, jet: 0.35, tilt: 0.14, glow: 0.9,
  },
};

const VERTEX = `attribute vec2 a_position; void main(){ gl_Position=vec4(a_position,0.0,1.0); }`;
const FRAGMENT = `precision highp float;
uniform vec2 u_resolution; uniform float u_time; uniform float u_mix; uniform float u_type; uniform float u_side; uniform vec2 u_pointer;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y);}
vec3 palette(float t){vec3 a=vec3(.48,.76,.82),b=vec3(.24,.20,.16);if(u_type>1.5){a=vec3(1.,.63,.22);b=vec3(.55,.10,.03);}else if(u_type>.5){a=vec3(.32,.58,1.);b=vec3(.24,.10,.85);}return mix(a,b,t);}
void main(){
 vec2 p=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y); p.x+=u_pointer.x*.08; p.y+=u_pointer.y*.05;
 float r=length(p); float ang=atan(p.y,p.x); float tilt=.2+u_type*.08; float disk=exp(-pow((abs(p.y+sin(ang)*tilt)-.075)/(0.035+u_type*.018),2.));
 float spiral=0.5+0.5*sin(ang*9.0-r*28.0-u_time*(1.2+u_type*.4));
 float ring=exp(-pow((r-(.2+u_type*.035))/(.018+u_type*.006),2.));
 float horizon=smoothstep(.145,.115,r); float stars=step(.996,hash(floor((p+u_pointer*.02)*90.0)))*(1.0-smoothstep(.2,.95,r));
 vec3 col=vec3(.008,.025,.065); col+=stars*vec3(.52,.76,1.); col+=palette(spiral)*disk*(.55+u_type*.22); col+=palette(.18)*ring*(1.3+u_type*.25);
 col*=horizon; float jet=exp(-pow(abs(p.x)/(0.015+u_type*.005),2.))*exp(-pow(abs(p.y-.01)/(0.45+u_type*.1),2.))*(.05+u_type*.24); col+=palette(.1)*jet;
 float vignette=1.0-smoothstep(.45,1.0,r); col*=vignette; if(u_side>.5){col*=1.25; col+=ring*palette(.05)*.3;}
 gl_FragColor=vec4(col, u_side>.5 ? max(max(col.r,col.g),col.b) : 1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source); gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

function makeRenderer(canvas: HTMLCanvasElement, side: boolean) {
  const gl = (canvas.getContext("webgl", { alpha: side, premultipliedAlpha: false, antialias: true }) || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
  if (!gl) return null;
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX); const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  if (!vertex || !fragment) return null;
  const program = gl.createProgram(); if (!program) return null;
  gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "a_position"); const uniforms = { resolution: gl.getUniformLocation(program,"u_resolution"), time: gl.getUniformLocation(program,"u_time"), mix: gl.getUniformLocation(program,"u_mix"), type: gl.getUniformLocation(program,"u_type"), side: gl.getUniformLocation(program,"u_side"), pointer: gl.getUniformLocation(program,"u_pointer") };
  const resize = () => { const dpr = Math.min(window.devicePixelRatio || 1, side ? 2 : 1.6); const width = Math.max(1, Math.floor(canvas.clientWidth*dpr)); const height = Math.max(1, Math.floor(canvas.clientHeight*dpr)); if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;gl.viewport(0,0,width,height);} };
  const draw = (time: number, type: number, blend: number, pointer: [number,number]) => { resize(); gl.useProgram(program); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0); gl.uniform2f(uniforms.resolution,canvas.width,canvas.height); gl.uniform1f(uniforms.time,time*.001); gl.uniform1f(uniforms.mix,blend); gl.uniform1f(uniforms.type,type); gl.uniform1f(uniforms.side,side?1:0); gl.uniform2f(uniforms.pointer,pointer[0],pointer[1]); gl.drawArrays(gl.TRIANGLES,0,6); };
  return { draw, resize };
}
type Renderer = NonNullable<ReturnType<typeof makeRenderer>>;

function favicon() {
  const canvas = document.createElement("canvas"); canvas.width = canvas.height = 64; const ctx = canvas.getContext("2d"); if (!ctx) return;
  ctx.fillStyle = "#04101f"; ctx.fillRect(0,0,64,64); ctx.strokeStyle = "#79dce8"; ctx.lineWidth = 5; ctx.shadowBlur = 12; ctx.shadowColor = "#79dce8"; ctx.beginPath(); ctx.arc(32,32,21,0,Math.PI*2); ctx.stroke(); ctx.shadowBlur = 0; ctx.fillStyle="#000"; ctx.beginPath(); ctx.arc(32,32,13,0,Math.PI*2); ctx.fill();
  const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]') || document.head.appendChild(Object.assign(document.createElement("link"), { rel: "icon" })); link.href = canvas.toDataURL("image/png");
}

export default function SpaceEduExperience() {
  const rootRef = useRef<HTMLElement>(null); const skyRef = useRef<HTMLCanvasElement>(null); const leftRef = useRef<HTMLCanvasElement>(null); const rightRef = useRef<HTMLCanvasElement>(null);
  const [featured, setFeatured] = useState<PlanetKey>("gaia");
  const featuredRef = useRef<PlanetKey>("gaia");
  const currentRef = useRef<PlanetKey>("gaia"); const targetRef = useRef<PlanetKey>("gaia"); const pointerRef = useRef<[number,number]>([0,0]);
  const transitionStartRef = useRef(0);
  const renderersRef = useRef<{ main: Renderer; left: Renderer; right: Renderer } | null>(null);
  useEffect(() => {
    favicon(); const root = rootRef.current; const sky = skyRef.current; const left = leftRef.current; const right = rightRef.current; if (!root || !sky || !left || !right) return;
    const main = makeRenderer(sky,false); const sideL = makeRenderer(left,true); const sideR = makeRenderer(right,true); if(!main||!sideL||!sideR) return;
    renderersRef.current = { main, left: sideL, right: sideR };
    let frame = 0; let from = 0; let to = 0; let blend = 1; transitionStartRef.current = performance.now(); const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const draw = (time:number) => {
      const target = ORDER.indexOf(targetRef.current);
      const active = ORDER.indexOf(currentRef.current);
      if (target !== active && !reduced) {
        from = active; to = target;
        const t=Math.min(1,(time-transitionStartRef.current)/450); blend=t*t*(3-2*t);
        if(t===1){currentRef.current=targetRef.current; blend=1;}
      } else blend=1;
      const slots = ORDER.filter((key)=>key!==featuredRef.current);
      main.draw(time,from+(to-from)*blend,blend,pointerRef.current);
      sideL.draw(time,ORDER.indexOf(slots[0] || "cygnus"),1,pointerRef.current);
      sideR.draw(time,ORDER.indexOf(slots[1] || "sgra"),1,pointerRef.current);
      if(!reduced) frame=requestAnimationFrame(draw);
    };
    const setInitial = () => { main.draw(0,0,1,[0,0]); sideL.draw(0,1,1,[0,0]); sideR.draw(0,2,1,[0,0]); };
    setInitial(); frame=requestAnimationFrame(draw);
    const onMove=(event:PointerEvent)=>{pointerRef.current=[(event.clientX/window.innerWidth-.5)*2,(event.clientY/window.innerHeight-.5)*-2];}; window.addEventListener("pointermove",onMove); root.dataset.ready="true";
    const animateIntro=()=>{ if(reduced) return; document.documentElement.classList.add("anim"); requestAnimationFrame(()=>requestAnimationFrame(()=>{document.documentElement.classList.add("play"); window.setTimeout(()=>document.documentElement.classList.remove("anim","play"),2150);}));}; animateIntro();
    return ()=>{cancelAnimationFrame(frame);window.removeEventListener("pointermove",onMove);document.documentElement.classList.remove("anim","play");renderersRef.current=null;};
  }, []);
  useEffect(() => {
    const renderers = renderersRef.current; if (!renderers) return;
    const slots = ORDER.filter((key)=>key!==featured);
    const now = performance.now();
    renderers.main.draw(now, ORDER.indexOf(featured), 1, pointerRef.current);
    renderers.left.draw(now, ORDER.indexOf(slots[0] || "cygnus"), 1, pointerRef.current);
    renderers.right.draw(now, ORDER.indexOf(slots[1] || "sgra"), 1, pointerRef.current);
  }, [featured]);
  const setNav = (next:boolean) => { const row=document.querySelector<HTMLElement>(".navrow"); const button=document.querySelector<HTMLButtonElement>(".burger"); if(row&&button){row.dataset.open=String(next);button.setAttribute("aria-expanded",String(next));button.setAttribute("aria-label",next?"Close navigation":"Open navigation");} };
  useEffect(() => {
    const close = () => { const row = document.querySelector<HTMLElement>(".navrow"); if (row?.dataset.open === "true") setNav(false); };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") close(); };
    const onDocumentClick = (event: MouseEvent) => { const target = event.target as Element; if (!target.closest(".navrow")) close(); };
    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onKey);
    const links = Array.from(document.querySelectorAll(".links a")); links.forEach((link) => link.addEventListener("click", close));
    return () => { document.removeEventListener("click", onDocumentClick); document.removeEventListener("keydown", onKey); links.forEach((link) => link.removeEventListener("click", close)); };
  }, []);
  const show = (next: PlanetKey) => { if(next===featuredRef.current)return; currentRef.current=featuredRef.current; targetRef.current=next; featuredRef.current=next; transitionStartRef.current=performance.now(); setFeatured(next); };
  const remaining = ORDER.filter((key)=>key!==featured);
  const planet = PLANETS[featured];
  return <div className="spaceedu-page">
  <main ref={rootRef} className="stage" aria-label="SpaceEdu interactive astrophysics lesson" id="spaceedu-hero">
    <div className="sky"><canvas id="sky-gl" ref={skyRef} aria-hidden="true" /></div>
    <div className="ui">
      <header className="navbar"><div className="navrow"><a className="logo" href="#spaceedu-hero" aria-label="SpaceEdu home">space<i>edu</i></a><nav className="links" id="site-nav"><a href="#objects" aria-current="page">Objects</a><a href="#tuition">Tution</a><a href="#tutorials">Tutorials</a><a href="#blog">Blog</a><a className="enroll" href="#enroll-form">Enroll</a></nav><button className="burger" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="site-nav" onClick={(e)=>{e.stopPropagation(); const row=e.currentTarget.closest<HTMLElement>(".navrow"); setNav(row?.dataset.open!=="true");}}><span/><span/><span/></button></div></header>
      <div className="copy" id="objects"><div className="col eyebrow"><span className="ent-mask"><span className="ent-line">SINGULARITY</span></span></div><h1 className="col title"><span className="ent-mask"><span className="ent-line">{planet.name}</span></span></h1><div className="col rule"><span /></div><p className="col lede" dangerouslySetInnerHTML={{__html:planet.lede}} /><div className="col cta"><button className="planet planet-l" type="button" data-planet={remaining[0]} aria-label={`Show ${PLANETS[remaining[0]].name}`} onClick={()=>show(remaining[0])}><canvas className="planet-gl" ref={leftRef} width={256} height={256} aria-hidden="true" /></button><button className="planet planet-r" type="button" data-planet={remaining[1]} aria-label={`Show ${PLANETS[remaining[1]].name}`} onClick={()=>show(remaining[1])}><canvas className="planet-gl" ref={rightRef} width={256} height={256} aria-hidden="true" /></button><a href="#enroll-form">GET STARTED</a><span className="label label-l">{PLANETS[remaining[0]].name}</span><span className="label label-r">{PLANETS[remaining[1]].name}</span></div></div>
    </div>
    <button className="scroll" type="button" aria-label="Scroll to learning path" onClick={()=>document.querySelector("#learning-path")?.scrollIntoView({behavior:"smooth"})}><svg viewBox="0 0 26 33" fill="none" aria-hidden="true"><path d="M13 1.5 V31.5 M1.9 20.4 L13 31.5 L24.1 20.4" stroke="#ffffff" strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter"/></svg></button>
    <noscript><style>{".stage{background:#04101f}.sky canvas{display:none}.copy{opacity:1!important}"}</style></noscript>
  </main>
  <section className="spaceedu-section spaceedu-section--path" id="learning-path" aria-labelledby="learning-path-title">
    <div className="spaceedu-section__inner"><p className="spaceedu-section__eyebrow">THE LEARNING PATH</p><h2 id="learning-path-title">See the physics behind the darkness.</h2><p>SpaceEdu turns real observations into short, visual lessons. Start with an object, follow its light, and build the language you need to read the universe with confidence.</p><div className="spaceedu-cards"><article id="tuition"><span>01</span><h3>Choose an object</h3><p>Compare a dormant stellar binary, a high energy X ray source, and the anchor at our galaxy’s center.</p></article><article id="tutorials"><span>02</span><h3>Trace the light</h3><p>Learn how an accretion disk, photon ring, and gravitational lensing reveal what cannot be seen directly.</p></article><article id="blog"><span>03</span><h3>Keep exploring</h3><p>Return to the sky whenever a new question appears. Every lesson starts from the same three objects.</p></article></div></div>
  </section>
  <section className="spaceedu-section spaceedu-section--enroll" id="enroll-form" aria-labelledby="enroll-title"><div className="spaceedu-section__inner spaceedu-enroll"><p className="spaceedu-section__eyebrow">COURSE ENROLLMENT</p><h2 id="enroll-title">Make the next observation yours.</h2><p>Get the first SpaceEdu lesson when the course opens. No payment details required.</p><form onSubmit={(event)=>event.preventDefault()}><label htmlFor="spaceedu-email">Email address</label><div><input id="spaceedu-email" name="email" type="email" placeholder="you@example.com" required /><button type="submit">Enroll for updates</button></div></form><a className="spaceedu-back" href="#spaceedu-hero">Back to the sky ↑</a></div></section>
  </div>;
}
]]>
    </file>
    <file path="src/app/(spaceedu)/spaceedu/data/chapters.ts">
<![CDATA[export const CHAPTERS = [
  { id: "hero", label: "Arrival", title: "SINGULARITY", description: "A lensed view of the selected black hole and the light around it." },
  { id: "lensing", label: "01 / Lensing", title: "Light takes the long way.", description: "Curved spacetime bends a ray around the shadow before it reaches the observer." },
  { id: "beaming", label: "02 / Beaming", title: "The ring is moving.", description: "Orbital motion shifts the approaching side blue and bright, while the receding side falls red." },
  { id: "time", label: "03 / Time", title: "Time runs slow.", description: "A clock near the horizon ticks at a fraction of a distant clock." },
  { id: "objects", label: "04 / Objects", title: "Pick your object.", description: "Compare three measured black holes and the scales that separate them." },
  { id: "lab", label: "05 / Lab", title: "Change the experiment.", description: "Adjust mass, inclination, temperature and distance to see the model respond." },
  { id: "syllabus", label: "06 / Syllabus", title: "A short course in the dark.", description: "Seven modules, one physical idea at a time." },
  { id: "enroll", label: "07 / Enroll", title: "Make the next observation yours.", description: "Join the next SpaceEdu lesson." },
] as const;
]]>
    </file>
    <file path="src/app/(spaceedu)/spaceedu/data/objects.ts">
<![CDATA[export type ObjectKey = "gaia" | "cygnus" | "sgra";

export type SpaceObject = {
  key: ObjectKey;
  name: string;
  mass: number;
  schwarzschildKm: number;
  distanceLy: number;
  companion: string;
  orbit: string;
  state: string;
  palette: [string, string];
  disk: boolean;
  inclination: number;
};

export const OBJECTS: Record<ObjectKey, SpaceObject> = {
  gaia: { key: "gaia", name: "GAIA BH1", mass: 9.6, schwarzschildKm: 28, distanceLy: 1560, companion: "Sun like star", orbit: "186 day orbit", state: "Dormant binary", palette: ["#d7fbff", "#62b9d2"], disk: false, inclination: 80 },
  cygnus: { key: "cygnus", name: "CYGNUS X 1", mass: 21, schwarzschildKm: 63, distanceLy: 7200, companion: "Blue supergiant HDE 226868", orbit: "5.6 day orbit", state: "Feeding X ray binary", palette: ["#e0f7ff", "#4a6dff"], disk: true, inclination: 70 },
  sgra: { key: "sgra", name: "SGR A*", mass: 4_300_000, schwarzschildKm: 12_700_000, distanceLy: 26_700, companion: "None", orbit: "Galactic center", state: "Low luminosity flow", palette: ["#ffd58c", "#cf3f2f"], disk: true, inclination: 70 },
};

export const OBJECT_ORDER: ObjectKey[] = ["gaia", "cygnus", "sgra"];
]]>
    </file>
    <file path="src/app/(spaceedu)/spaceedu/data/syllabus.ts">
<![CDATA[export const SYLLABUS = [
  ["01", "The long way around", "Read a bent ray in Schwarzschild spacetime."],
  ["02", "The ring that moves", "Follow Doppler beaming across the disk."],
  ["03", "A slower clock", "Compare proper time near and far away."],
  ["04", "Three scales", "Put the event horizon beside a city and a solar system."],
  ["05", "The lab", "Build a hypothetical disk around a dormant hole."],
  ["06", "Read the sky", "Turn observations into a physical story."],
  ["07", "Keep looking", "Return to the same objects with better questions."],
] as const;
]]>
    </file>
    <file path="src/app/(spaceedu)/spaceedu/director/camera.ts">
<![CDATA[export type CameraState = { distance: number; inclination: number; azimuth: number; exposure: number; timeScale: number };
export const CAMERA_KEYFRAMES: CameraState[] = [
  { distance: 40, inclination: 80, azimuth: 0, exposure: 1, timeScale: 1 },
  { distance: 25, inclination: 60, azimuth: 6, exposure: 1.05, timeScale: 1 },
  { distance: 14, inclination: 70, azimuth: 12, exposure: 1.1, timeScale: .9 },
  { distance: 3, inclination: 72, azimuth: 16, exposure: .92, timeScale: .35 },
  { distance: 30, inclination: 64, azimuth: 18, exposure: 1, timeScale: .8 },
  { distance: 18, inclination: 68, azimuth: 22, exposure: 1.08, timeScale: 1 },
  { distance: 50, inclination: 76, azimuth: 26, exposure: .95, timeScale: .7 },
  { distance: 40, inclination: 80, azimuth: 30, exposure: 1, timeScale: 1 },
];
export function cameraAt(progress: number): CameraState {
  const p = Math.max(0, Math.min(1, progress)) * (CAMERA_KEYFRAMES.length - 1);
  const i = Math.min(CAMERA_KEYFRAMES.length - 2, Math.floor(p)); const t = p - i; const a = CAMERA_KEYFRAMES[i]; const b = CAMERA_KEYFRAMES[i + 1];
  const smooth = t * t * (3 - 2 * t);
  return { distance: a.distance + (b.distance - a.distance) * smooth, inclination: a.inclination + (b.inclination - a.inclination) * smooth, azimuth: a.azimuth + (b.azimuth - a.azimuth) * smooth, exposure: a.exposure + (b.exposure - a.exposure) * smooth, timeScale: a.timeScale + (b.timeScale - a.timeScale) * smooth };
}
export function springStep(current: number, target: number, velocity: number, dt: number, stiffness = 170, damping = 26) {
  const acceleration = (target - current) * stiffness - velocity * damping;
  const nextVelocity = velocity + acceleration * dt;
  return { value: current + nextVelocity * dt, velocity: nextVelocity };
}
]]>
    </file>
    <file path="src/app/(spaceedu)/spaceedu/director/scroll.ts">
<![CDATA[export function scrollProgress(scrollY: number, pageHeight: number, viewportHeight: number) {
  return Math.max(0, Math.min(1, scrollY / Math.max(pageHeight - viewportHeight, 1)));
}
export function chapterIndex(progress: number, count: number) { return Math.max(0, Math.min(count - 1, Math.round(progress * (count - 1)))); }
]]>
    </file>
    <file path="src/app/(spaceedu)/spaceedu/physics/geodesic.ts">
<![CDATA[export type Vec3 = { x: number; y: number; z: number };
const add = (a: Vec3, b: Vec3): Vec3 => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z });
const scale = (a: Vec3, s: number): Vec3 => ({ x: a.x * s, y: a.y * s, z: a.z * s });
const dot = (a: Vec3, b: Vec3) => a.x * b.x + a.y * b.y + a.z * b.z;
const cross = (a: Vec3, b: Vec3): Vec3 => ({ x: a.y * b.z - a.z * b.y, y: a.z * b.x - a.x * b.z, z: a.x * b.y - a.y * b.x });
const length = (a: Vec3) => Math.sqrt(dot(a, a));
const normalize = (a: Vec3) => scale(a, 1 / Math.max(length(a), 1e-9));

export type RayResult = { captured: boolean; escaped: boolean; position: Vec3; direction: Vec3; steps: number };

export function traceSchwarzschild(origin: Vec3, direction: Vec3, maxSteps = 512): RayResult {
  let pos = origin;
  let vel = normalize(direction);
  const h = cross(pos, vel);
  const h2 = dot(h, h);
  for (let step = 0; step < maxSteps; step += 1) {
    const r2 = dot(pos, pos);
    const r = Math.sqrt(r2);
    if (r < 1) return { captured: true, escaped: false, position: pos, direction: vel, steps: step };
    if (r > 60 && dot(pos, vel) > 0) return { captured: false, escaped: true, position: pos, direction: vel, steps: step };
    const dt = Math.min(0.28, Math.max(0.012, 0.025 * (r - 0.9)));
    const acceleration = scale(pos, -1.5 * h2 / Math.max(r2 * r2 * r, 1e-6));
    vel = normalize(add(vel, scale(acceleration, dt)));
    pos = add(pos, scale(vel, dt));
  }
  return { captured: false, escaped: false, position: pos, direction: vel, steps: maxSteps };
}

export function criticalImpactParameter() { return 1.5 * Math.sqrt(3); }
export function impactParameter(origin: Vec3, direction: Vec3) { return length(cross(origin, normalize(direction))); }
export { add, cross, dot, length, normalize, scale };
]]>
    </file>
    <file path="src/app/(spaceedu)/spaceedu/physics/kinematics.ts">
<![CDATA[export const gravitationalRedshift = (r: number) => Math.sqrt(Math.max(1 - 1 / Math.max(r, 1), 0));
export const orbitalSpeed = (r: number) => Math.sqrt(0.5 / Math.max(r - 1, 0.05));
export const dopplerFactor = (r: number, approaching: boolean) => {
  const beta = Math.min(0.92, orbitalSpeed(r));
  const gamma = 1 / Math.sqrt(1 - beta * beta);
  return 1 / (gamma * (1 - (approaching ? beta : -beta)));
};
export const clockRate = gravitationalRedshift;
]]>
    </file>
    <file path="src/app/(spaceedu)/spaceedu/render/blackbody.ts">
<![CDATA[export function blackbodyRgb(temperature: number): [number, number, number] {
  const t = Math.max(1000, Math.min(40_000, temperature)) / 100;
  const red = t <= 66 ? 255 : 329.698727446 * Math.pow(t - 60, -0.1332047592);
  const green = t <= 66 ? 99.4708025861 * Math.log(t) - 161.1195681661 : 288.1221695283 * Math.pow(t - 60, -0.0755148492);
  const blue = t >= 66 ? 255 : t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  return [Math.max(0, Math.min(1, red / 255)), Math.max(0, Math.min(1, green / 255)), Math.max(0, Math.min(1, blue / 255))];
}

export function buildBlackbodyLut(size = 256) {
  return new Uint8Array(Array.from({ length: size }, (_, i) => blackbodyRgb(1000 + (i / (size - 1)) * 39_000).map((v) => Math.round(v * 255))).flat());
}
]]>
    </file>
    <file path="src/app/(spaceedu)/spaceedu/render/engine.ts">
<![CDATA[import { createSceneProgram, type SceneUniforms } from "./gl";
import { chooseQuality } from "./quality";

export type ViewRect = { x: number; y: number; width: number; height: number; object: number };
export function createEngine(canvas: HTMLCanvasElement, views: () => ViewRect[], reduced: boolean) {
  const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "high-performance" });
  if (!gl) return null;
  const scene = createSceneProgram(gl); const quality = chooseQuality(window.innerWidth, window.innerHeight, navigator.hardwareConcurrency || 4); let frame = 0; let visible = true;
  const resize = () => { const dpr = Math.min(window.devicePixelRatio || 1, 1.5); const w = Math.max(1, Math.floor(canvas.clientWidth*dpr)); const h = Math.max(1, Math.floor(canvas.clientHeight*dpr)); if (canvas.width !== w || canvas.height !== h) { canvas.width=w; canvas.height=h; gl.viewport(0,0,w,h); } };
  const drawView = (time: number, rect: ViewRect, uniforms: SceneUniforms) => { const dpr=Math.min(window.devicePixelRatio||1,1.5); gl.viewport(Math.floor(rect.x*dpr),Math.floor((canvas.clientHeight-rect.y-rect.height)*dpr),Math.floor(rect.width*dpr),Math.floor(rect.height*dpr)); gl.scissor(Math.floor(rect.x*dpr),Math.floor((canvas.clientHeight-rect.y-rect.height)*dpr),Math.floor(rect.width*dpr),Math.floor(rect.height*dpr)); gl.enable(gl.SCISSOR_TEST); gl.useProgram(scene.program); gl.bindBuffer(gl.ARRAY_BUFFER,scene.buffer); gl.enableVertexAttribArray(scene.position); gl.vertexAttribPointer(scene.position,2,gl.FLOAT,false,0,0); const u=scene.uniforms; gl.uniform2f(u.u_resolution,rect.width*dpr,rect.height*dpr); gl.uniform1f(u.u_time,time*.001); gl.uniform1f(u.u_distance,uniforms.distance); gl.uniform1f(u.u_inclination,uniforms.inclination); gl.uniform1f(u.u_azimuth,uniforms.azimuth); gl.uniform1f(u.u_exposure,uniforms.exposure); gl.uniform1f(u.u_lensing,uniforms.lensing); gl.uniform1f(u.u_beaming,uniforms.beaming); gl.uniform1f(u.u_redshift,uniforms.redshift); gl.uniform1f(u.u_feed,uniforms.feed); gl.uniform1f(u.u_diskTemp,uniforms.diskTemp); gl.uniform1f(u.u_mass,uniforms.mass); gl.uniform1f(u.u_object,rect.object); gl.uniform1f(u.u_pointer,uniforms.pointer); gl.uniform1i(u.u_steps,uniforms.steps); gl.drawArrays(gl.TRIANGLES,0,6); };
  const render = (time: number, uniforms: SceneUniforms) => { if (!visible) return; resize(); gl.clearColor(.002,.004,.012,1); gl.clear(gl.COLOR_BUFFER_BIT); for (const rect of views()) drawView(time,rect,uniforms); gl.disable(gl.SCISSOR_TEST); };
  const loop = (time: number) => { if (!reduced) { render(time, current); frame=requestAnimationFrame(loop); } };
  let current: SceneUniforms = { distance:40,inclination:80,azimuth:0,exposure:1,lensing:1,beaming:1,redshift:1,feed:1,diskTemp:16000,mass:1,object:0,pointer:0,steps:quality.mainSteps };
  const setUniforms = (next: Partial<SceneUniforms>) => { current={...current,...next}; if(reduced) render(performance.now(),current); };
  const onVisibility = () => { visible=document.visibilityState !== "hidden"; if(visible && !reduced){cancelAnimationFrame(frame);frame=requestAnimationFrame(loop);} };
  document.addEventListener("visibilitychange",onVisibility); canvas.addEventListener("webglcontextlost",(event)=>event.preventDefault());
  if (!reduced) frame=requestAnimationFrame(loop); else render(0,current);
  return { canvas, gl, render, setUniforms, dispose: () => { cancelAnimationFrame(frame); document.removeEventListener("visibilitychange",onVisibility); } };
}
]]>
    </file>
    <file path="src/app/(spaceedu)/spaceedu/render/gl.ts">
<![CDATA[import { SCENE_SHADER } from "./shaders/scene.glsl";
import { VERTEX_SHADER } from "./shaders/vertex.glsl";

export type SceneUniforms = { distance: number; inclination: number; azimuth: number; exposure: number; lensing: number; beaming: number; redshift: number; feed: number; diskTemp: number; mass: number; object: number; pointer: number; steps: number };
export function createSceneProgram(gl: WebGL2RenderingContext) {
  const compile = (type: number, source: string) => { const shader = gl.createShader(type); if (!shader) throw new Error("shader allocation failed"); gl.shaderSource(shader, source); gl.compileShader(shader); if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || "shader compile failed"); return shader; };
  const program = gl.createProgram(); if (!program) throw new Error("program allocation failed");
  gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX_SHADER)); gl.attachShader(program, compile(gl.FRAGMENT_SHADER, SCENE_SHADER)); gl.linkProgram(program); if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || "shader link failed");
  const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "a_position");
  const names = ["u_resolution","u_time","u_distance","u_inclination","u_azimuth","u_exposure","u_lensing","u_beaming","u_redshift","u_feed","u_diskTemp","u_mass","u_object","u_pointer","u_steps"] as const;
  const uniforms = Object.fromEntries(names.map((name) => [name, gl.getUniformLocation(program, name)])) as Record<(typeof names)[number], WebGLUniformLocation | null>;
  return { program, buffer, position, uniforms };
}
]]>
    </file>
    <file path="src/app/(spaceedu)/spaceedu/render/quality.ts">
<![CDATA[export type QualityTier = { scale: number; mainSteps: number; sideSteps: number; sideFps: number };
export function chooseQuality(width: number, height: number, hardwareConcurrency = 4): QualityTier {
  if (width < 600 || height < 700) return { scale: .5, mainSteps: 48, sideSteps: 24, sideFps: 15 };
  if (hardwareConcurrency <= 4) return { scale: .7, mainSteps: 72, sideSteps: 36, sideFps: 30 };
  return { scale: .9, mainSteps: 96, sideSteps: 48, sideFps: 30 };
}
]]>
    </file>
    <file path="src/app/(spaceedu)/spaceedu/render/shaders/scene.glsl.ts">
<![CDATA[export const SCENE_SHADER = `#version 300 es
precision highp float;
in vec2 v_uv; out vec4 outColor;
uniform vec2 u_resolution; uniform float u_time; uniform float u_distance; uniform float u_inclination; uniform float u_azimuth; uniform float u_exposure; uniform float u_lensing; uniform float u_beaming; uniform float u_redshift; uniform float u_feed; uniform float u_diskTemp; uniform float u_mass; uniform float u_object; uniform float u_pointer; uniform int u_steps;
const float PI=3.14159265359; const float R_IN=3.0; const float R_OUT=14.0;
float hash21(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}
float hash31(vec3 p){return fract(sin(dot(p,vec3(17.1,71.7,113.3)))*43758.5453123);}
float noise3(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);float n=mix(mix(mix(hash31(i),hash31(i+vec3(1,0,0)),f.x),mix(hash31(i+vec3(0,1,0)),hash31(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash31(i+vec3(0,0,1)),hash31(i+vec3(1,0,1)),f.x),mix(hash31(i+vec3(0,1,1)),hash31(i+vec3(1,1,1)),f.x),f.y),f.z);return n;}
vec3 blackbody(float t){t=clamp(t,0.,1.);vec3 warm=vec3(1.,.17,.025);vec3 white=vec3(1.,.9,.7);vec3 blue=vec3(.42,.72,1.);return t<.52?mix(warm,white,t*1.92):mix(white,blue,(t-.52)*2.08);}
vec3 sky(vec3 d){float band=exp(-abs(d.y+d.x*.12+d.z*.08)*8.);float stars=step(.9983,hash31(normalize(d)*320.));float orange=hash31(normalize(d)*190.+3.);vec3 star=mix(vec3(.7,.86,1.),vec3(1.,.52,.28),orange);return vec3(.006,.012,.03)+band*vec3(.035,.07,.11)+stars*star*2.;}
vec4 diskSample(vec3 p, vec3 vel){float r=length(p.xz);float phi=atan(p.z,p.x);float temp=clamp((u_diskTemp*pow(max(r/R_IN,.1),-.75)*pow(max(1.-sqrt(R_IN/r),0.),.25)-1800.)/28000.,0.,1.);float orbit=sqrt(.5/max(r-1.,.05));vec3 tangent=normalize(vec3(-p.z,0.,p.x));float dop=1./(inversesqrt(max(1.-orbit*orbit,.05))*(1.-u_beaming*dot(orbit*tangent,-vel)));float grav=sqrt(max(1.-1./r,0.));float g=dop*(u_redshift*grav+(1.-u_redshift));float turbulence=.55+.45*noise3(vec3(cos(phi-u_time*pow(r,-1.5)*.7),sin(phi-u_time*pow(r,-1.5)*.7),log(r)*2.));float thickness=exp(-p.y*p.y/(.015+.006*r));vec3 col=blackbody(clamp(temp*g,0.,1.))*pow(max(g,.1),3.)*turbulence;float edge=smoothstep(R_OUT,R_OUT-1.,r)*smoothstep(R_IN,R_IN+.5,r);return vec4(col,thickness*edge*.8);}
vec4 march(vec3 pos,vec3 vel,out vec3 escapeDir){float h2=dot(cross(pos,vel),cross(pos,vel));vec3 light=vec3(0);float trans=1.;escapeDir=vel;vec3 prev=pos;for(int i=0;i<128;i++){if(i>=u_steps)break;float r2=dot(pos,pos),r=sqrt(r2);if(r<1.){trans=0.;break;}if(r>60.&&dot(pos,vel)>0.){escapeDir=vel;break;}float dt=clamp(.025*(r-.9),.012,.28);vec3 a=-1.5*h2*pos/max(r2*r2*r,.0001);vel=normalize(vel+a*dt);prev=pos;pos+=vel*dt;if(prev.y*pos.y<0.){float t=prev.y/(prev.y-pos.y);vec3 hit=mix(prev,pos,t);float rr=length(hit.xz);if(rr>R_IN&&rr<R_OUT){vec4 d=diskSample(hit,vel);light+=trans*d.rgb*u_feed;trans*=1.-d.a;}}}return vec4(light,trans);}
void main(){vec2 q=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);float inc=radians(u_inclination),az=radians(u_azimuth);vec3 target=vec3(0);vec3 cam=vec3(sin(inc)*cos(az),cos(inc),sin(inc)*sin(az))*u_distance;vec3 forward=normalize(target-cam);vec3 right=normalize(cross(forward,vec3(0,1,0)));vec3 up=normalize(cross(right,forward));vec3 ray=normalize(forward+q.x*right+q.y*up);vec3 pos=cam;vec3 escape;vec4 hit=march(pos,ray,escape);vec3 col=sky(escape)*(1.-hit.a)+hit.rgb;float r=length(q);float ring=exp(-pow((r-.12)/.009,2.))*1.8;vec3 ringCol=u_object>1.5?vec3(1.,.42,.08):u_object>.5?vec3(.25,.5,1.):vec3(.42,.95,1.);col+=ring*ringCol;col*=smoothstep(1.15,.1,r);col=col/(col+vec3(1.));col=pow(col,vec3(.4545))*u_exposure;outColor=vec4(col,1.);}`;
]]>
    </file>
    <file path="src/app/(spaceedu)/spaceedu/render/shaders/vertex.glsl.ts">
<![CDATA[export const VERTEX_SHADER = `#version 300 es
in vec2 a_position;
out vec2 v_uv;
void main(){v_uv=a_position*.5+.5;gl_Position=vec4(a_position,0.0,1.0);}`;
]]>
    </file>
  </files>
</template>
