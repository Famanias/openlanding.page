<template slug="perigee" name="PERIGEE">
  <dependencies>
    {
      "dependencies": {
        "three": "^0.186.1",
        "gsap": "^3.15.0",
        "lenis": "^1.3.27"
      }
    }
  </dependencies>
  <instructions>
    Recreate the following files in your Next.js App Router project preserving relative paths.
  </instructions>
  <files>
    <file path="src/app/(perigee)/layout.tsx">
<![CDATA[import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./perigee/perigee.css";

const sans = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "PERIGEE — Relativistic Black Hole Observatory",
  description:
    "At the edge of curved spacetime. A full-screen 3D relativistic Schwarzschild black hole scroll experience and geodesic telemetry observatory.",
  openGraph: {
    title: "PERIGEE — Relativistic Black Hole Observatory",
    description:
      "At the edge of curved spacetime. Relativistic geodesic telemetry array in orbit around a Schwarzschild black hole.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function PerigeeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-perigee-mode="experience" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="pg-body bg-[#000000] text-[#f6f1ea] antialiased selection:bg-[#ffb36b]/30">
        <noscript>
          <style>{`#perigee-fallback-root{position:static!important;width:auto!important;height:auto!important;clip:auto!important;overflow:visible!important;pointer-events:auto!important}#perigee-experience-root{display:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
]]>
    </file>
    <file path="src/app/(perigee)/perigee/assets.generated.ts">
<![CDATA[export const ASSETS: Record<string, { w: number; h: number }> = {};
]]>
    </file>
    <file path="src/app/(perigee)/perigee/assets.tsx">
<![CDATA[import { ASSETS } from "./assets.generated";

const BASE = "/templates/perigee";

export function assetSrc(key: string, width: 800 | 1600, format: "webp" | "avif" = "webp"): string | null {
  return key in ASSETS ? `${BASE}/${key}-${width}.${format}` : null;
}

type PictureProps = { assetKey: string; alt: string; className?: string; sizes?: string; priority?: boolean };

export function Picture({ assetKey, alt, className, sizes = "(min-width: 900px) 50vw, 100vw", priority }: PictureProps) {
  const webp800 = assetSrc(assetKey, 800);
  if (!webp800) {
    return (
      <div className={`pg-placeholder ${className ?? ""}`} role="img" aria-label={alt} data-asset={assetKey}>
        <span className="font-mono-tech">{assetKey}</span>
      </div>
    );
  }
  const { w, h } = ASSETS[assetKey];
  const set = (f: "webp" | "avif") => `${assetSrc(assetKey, 800, f)} 800w, ${assetSrc(assetKey, 1600, f)} 1600w`;
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <img
        src={webp800}
        srcSet={set("webp")}
        sizes={sizes}
        width={w}
        height={h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        data-asset={assetKey}
      />
    </picture>
  );
}
]]>
    </file>
    <file path="src/app/(perigee)/perigee/icon.svg">
<![CDATA[<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#000000"/>
  <circle cx="16" cy="16" r="10" fill="none" stroke="#FFB36B" stroke-width="1.5" stroke-dasharray="14 4"/>
  <ellipse cx="16" cy="16" rx="12" ry="5" fill="none" stroke="#FFB36B" stroke-width="1.2" opacity="0.85"/>
  <circle cx="16" cy="16" r="6.5" fill="#000000" stroke="#F6F1EA" stroke-width="0.8"/>
  <circle cx="23" cy="13" r="1.2" fill="#F6F1EA"/>
</svg>
]]>
    </file>
    <file path="src/app/(perigee)/perigee/opengraph-image.tsx">
<![CDATA[import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#000000",
        color: "#F6F1EA",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 28, letterSpacing: 5 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            display: "flex",
            border: "2px solid #FFB36B",
            background: "#000000",
          }}
        />
        PERIGEE
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", fontSize: 76, lineHeight: 1.05, fontWeight: 600 }}>
          At the edge of curved spacetime.
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#FFB36B", letterSpacing: 1 }}>
          Relativistic Schwarzschild Black Hole Telemetry Observatory
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 16,
          letterSpacing: 4,
          color: "#F6F1EA",
          opacity: 0.7,
        }}
      >
        <span>GEODESIC TRAJECTORY r = 38.0 → 1.0 Rs</span>
        <span>01 — 06 INTERACTIVE 3D</span>
      </div>
    </div>,
    size,
  );
}
]]>
    </file>
    <file path="src/app/(perigee)/perigee/page.tsx">
<![CDATA[import { StaticFallbackPage } from "./components/StaticFallbackPage";
import { Experience } from "./components/Experience";

export default function PerigeePage() {
  return (
    <>
      <div id="perigee-fallback-root">
        <StaticFallbackPage />
      </div>
      <Experience />
    </>
  );
}
]]>
    </file>
    <file path="src/app/(perigee)/perigee/perigee.css">
<![CDATA[@import "tailwindcss";

@layer base {
  :root {
    --font-sans: var(--font-sans, 'Inter Tight', -apple-system, BlinkMacSystemFont, sans-serif);
    --font-serif: var(--font-serif, 'Cormorant Garamond', Georgia, serif);
    --font-mono: var(--font-mono, 'JetBrains Mono', monospace);
    --color-void: #000000;
    --color-starlight: #f6f1ea;
    --color-amber: #ffb36b;
    --color-doppler-blue: #e6f0ff;
    --color-doppler-red: #ff8a3d;
  }

  html,
  body,
  .pg-body {
    background-color: #000000;
    color: #f6f1ea;
    font-family: var(--font-sans);
    margin: 0;
    padding: 0;
  }
}

.font-display {
  font-family: var(--font-sans);
}

.font-editorial {
  font-family: var(--font-serif);
}

.font-mono-tech {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
}

/* Fallback visibility management */
html[data-perigee-mode="experience"] #perigee-fallback-root {
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  #perigee-experience-root {
    display: none !important;
  }
  #perigee-fallback-root {
    position: static !important;
    width: auto !important;
    height: auto !important;
    clip: auto !important;
    overflow: visible !important;
    pointer-events: auto !important;
  }
}
]]>
    </file>
    <file path="src/app/(perigee)/perigee/audio/gravitationalAudio.ts">
<![CDATA[/**
 * Synthesized Web Audio API soundscape for PERIGEE:
 * - Deep relativistic gravitational sub-bass drone (modulated by orbital radius r and lensingMass)
 * - Geiger-like high-energy photon arrival clicks near the Photon Sphere & ISCO
 * - Geodesic launch & polar jet telemetry lock harmonics
 * Muted by default.
 */

class GravitationalAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;
  private isMuted = true;
  private geigerTimer: number | null = null;
  private currentRadiusRs = 38.0;

  public toggleMute(): boolean {
    if (this.isMuted) {
      this.enable();
    } else {
      this.disable();
    }
    return !this.isMuted;
  }

  public getEnabled(): boolean {
    return !this.isMuted;
  }

  private initContext() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtx();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.0;
    this.masterGain.connect(this.ctx.destination);

    this.droneFilter = this.ctx.createBiquadFilter();
    this.droneFilter.type = 'lowpass';
    this.droneFilter.frequency.value = 95;
    this.droneFilter.Q.value = 2.4;
    this.droneFilter.connect(this.masterGain);

    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sawtooth';
    this.droneOsc1.frequency.value = 42.0;

    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'sine';
    this.droneOsc2.frequency.value = 63.0;

    const subGain1 = this.ctx.createGain();
    subGain1.gain.value = 0.14;
    const subGain2 = this.ctx.createGain();
    subGain2.gain.value = 0.22;

    this.droneOsc1.connect(subGain1);
    this.droneOsc2.connect(subGain2);
    subGain1.connect(this.droneFilter);
    subGain2.connect(this.droneFilter);

    this.droneOsc1.start();
    this.droneOsc2.start();
  }

  public enable() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    this.isMuted = false;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setTargetAtTime(0.45, now, 0.35);
    this.scheduleGeigerLoop();
  }

  public disable() {
    this.isMuted = true;
    if (this.geigerTimer !== null) {
      window.clearTimeout(this.geigerTimer);
      this.geigerTimer = null;
    }
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setTargetAtTime(0.0, now, 0.15);
  }

  public updateTelemetry(rInRs: number, lensingMass: number) {
    this.currentRadiusRs = rInRs;
    if (this.isMuted || !this.ctx || !this.droneOsc1 || !this.droneOsc2 || !this.droneFilter) return;

    const proximity = Math.max(0, Math.min(1, (38 - rInRs) / 36.8));
    const baseFreq = 38 + proximity * 28 + (lensingMass - 1.5) * 8;
    const now = this.ctx.currentTime;
    this.droneOsc1.frequency.setTargetAtTime(baseFreq, now, 0.1);
    this.droneOsc2.frequency.setTargetAtTime(baseFreq * 1.498, now, 0.1);
    this.droneFilter.frequency.setTargetAtTime(75 + proximity * 190, now, 0.12);
  }

  private scheduleGeigerLoop = () => {
    if (this.isMuted) return;
    this.triggerPhotonClick();
    // Clicks become more frequent closer to the photon sphere (r ~ 1.5 Rs)
    const normR = Math.max(0.08, Math.min(1, this.currentRadiusRs / 25));
    const nextDelayMs = 110 + normR * 680 + Math.random() * 350;
    this.geigerTimer = window.setTimeout(this.scheduleGeigerLoop, nextDelayMs);
  };

  public triggerPhotonClick() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1800 + Math.random() * 1400, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 0.018);

    clickGain.gain.setValueAtTime(0.08, now);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.018);

    osc.connect(clickGain);
    clickGain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.02);
  }

  public triggerGeodesicLaunch(impactParameterB: number) {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    const startFreq = Math.max(220, Math.min(880, 520 - impactParameterB * 40));
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(startFreq * 1.85, now + 0.45);

    g.gain.setValueAtTime(0.16, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(g);
    g.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.52);
  }

  public triggerEphemerisLock() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    [440, 659.25, 880].forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);
      g.gain.setValueAtTime(0.12, now + idx * 0.09);
      g.gain.exponentialRampToValueAtTime(0.0008, now + idx * 0.09 + 0.65);
      osc.connect(g);
      g.connect(this.masterGain);
      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 0.7);
    });
  }
}

export const gravitationalAudio = new GravitationalAudioEngine();
]]>
    </file>
    <file path="src/app/(perigee)/perigee/brand/Logo.tsx">
<![CDATA[import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center gap-2.5 font-semibold tracking-[0.22em] uppercase text-[#f6f1ea] ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="w-4 h-4 text-[#ffb36b]"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" strokeDasharray="10 3" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="currentColor" strokeWidth="1" opacity="0.8" />
        <circle cx="12" cy="12" r="5" fill="#000000" stroke="#f6f1ea" strokeWidth="0.8" />
      </svg>
      <span>PERIGEE</span>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(perigee)/perigee/components/BlackHoleCanvas.tsx">
<![CDATA["use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BLACK_HOLE_FRAGMENT_SHADER, BLACK_HOLE_VERTEX_SHADER } from '../shader/blackHoleShader';
import { CameraRigState, sphericalToCartesian } from '../physics/geodesicMath';
import { InspectOverrideValues } from './HoldInspector';
import { ActivePhotonPulse } from './SlingshotOverlay';
import { gravitationalAudio } from '../audio/gravitationalAudio';

interface BlackHoleCanvasProps {
  rigRef: React.MutableRefObject<CameraRigState>;
  inspectRef: React.MutableRefObject<InspectOverrideValues>;
  pulseRef: React.MutableRefObject<ActivePhotonPulse>;
  polarJetPulseRef: React.MutableRefObject<number>;
  onDampedRigUpdate?: (liveRig: CameraRigState) => void;
}

export const BlackHoleCanvas: React.FC<BlackHoleCanvasProps> = ({
  rigRef,
  inspectRef,
  pulseRef,
  polarJetPulseRef,
  onDampedRigUpdate,
}) => {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const onDampedRigUpdateRef = useRef(onDampedRigUpdate);

  useEffect(() => {
    onDampedRigUpdateRef.current = onDampedRigUpdate;
  }, [onDampedRigUpdate]);

  useEffect(() => {
    const mountEl = canvasMountRef.current;
    if (!mountEl) return;

    // Detect software WebGL (SwiftShader / llvmpipe) per threejs skill guidelines
    const isSoftwareGl = (() => {
      const probeCanvas = document.createElement('canvas');
      const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      depth: false,
      stencil: false,
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const pixelRatio = isSoftwareGl ? 0.45 : Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.setAttribute('data-testid', 'black-hole-canvas');
    renderer.domElement.className = 'block w-full h-full';

    mountEl.innerHTML = '';
    mountEl.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const initialRig = rigRef.current;
    const drawBufferSize = new THREE.Vector2();
    renderer.getDrawingBufferSize(drawBufferSize);

    const uniforms = {
      uResolution: { value: new THREE.Vector2(drawBufferSize.x, drawBufferSize.y) },
      uTime: { value: 0 },
      uCamPos: {
        value: new THREE.Vector3(initialRig.camPos.x, initialRig.camPos.y, initialRig.camPos.z),
      },
      uCamTarget: {
        value: new THREE.Vector3(
          initialRig.camTarget.x,
          initialRig.camTarget.y,
          initialRig.camTarget.z
        ),
      },
      uRoll: { value: initialRig.roll },
      uFov: { value: initialRig.fov },
      uScreenOffset: {
        value: new THREE.Vector2(initialRig.screenOffset[0], initialRig.screenOffset[1]),
      },
      uLensingMass: { value: initialRig.lensingMass },
      uDopplerBoost: { value: initialRig.dopplerBoost },
      uDiskOpacity: { value: initialRig.diskOpacity },
      uJetIntensity: { value: initialRig.jetIntensity },
      uPulsePos: { value: new THREE.Vector3(0, 0, 0) },
      uPulseActive: { value: 0.0 },
      uSkyTex: { value: null as THREE.Texture | null },
      uSkyTexLoaded: { value: 0.0 },
    };

    const textureLoader = new THREE.TextureLoader();
    let loadedSkyTexture: THREE.Texture | null = null;
    textureLoader.load(
      '/templates/perigee/nebula-cluster.png',
      (tex) => {
        loadedSkyTexture = tex;
        tex.wrapS = THREE.MirroredRepeatWrapping;
        tex.wrapT = THREE.MirroredRepeatWrapping;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.needsUpdate = true;
        uniforms.uSkyTex.value = tex;
        uniforms.uSkyTexLoaded.value = 1.0;
      },
      undefined,
      () => {
        // Procedural fallback in sky(vec3 d) remains active
      }
    );

    const material = new THREE.RawShaderMaterial({
      vertexShader: BLACK_HOLE_VERTEX_SHADER,
      fragmentShader: BLACK_HOLE_FRAGMENT_SHADER,
      uniforms,
      depthTest: false,
      depthWrite: false,
    });

    const quadGeo = new THREE.PlaneGeometry(2, 2);
    const quadMesh = new THREE.Mesh(quadGeo, material);
    scene.add(quadMesh);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Damped state variables for smooth spring transitions & weighted inspect inertia
    const damped = {
      r: initialRig.r,
      opticalR: initialRig.opticalR,
      pitch: initialRig.pitch,
      yaw: initialRig.yaw,
      roll: initialRig.roll,
      fov: initialRig.fov,
      offsetX: initialRig.screenOffset[0],
      offsetY: initialRig.screenOffset[1],
      targetX: initialRig.camTarget.x,
      targetY: initialRig.camTarget.y,
      targetZ: initialRig.camTarget.z,
      lensingMass: 1.5,
      dopplerBoost: initialRig.dopplerBoost,
      diskOpacity: 1.0,
      jetIntensity: initialRig.jetIntensity,
    };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.getDrawingBufferSize(drawBufferSize);
      uniforms.uResolution.value.set(drawBufferSize.x, drawBufferSize.y);
    };
    window.addEventListener('resize', handleResize);

    let frameId = 0;
    let lastTime = performance.now();
    let elapsedSimTime = 0;
    let lastHudSyncTime = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            frameId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            frameId = window.setTimeout(cb, 80);
          }
        };
        frameId = window.setTimeout(poll, 5);
      } else {
        frameId = window.setTimeout(cb, 80);
      }
    }

    function tick() {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.28);
      lastTime = now;

      const targetRig = rigRef.current;
      const inspect = inspectRef.current;

      // In Chapter 5 (Innermost Stable Orbit), gravitational time dilation accelerates external starfield/disk spin
      const dilationSpeedMultiplier =
        targetRig.chapterIndex === 4 ? 2.65 : targetRig.chapterIndex === 3 ? 1.55 : 1.0;
      elapsedSimTime += dt * dilationSpeedMultiplier;

      const lambda = inspect.active ? 7.5 : 9.0;

      const desiredYaw = targetRig.yaw + (inspect.active ? inspect.yawDelta : 0) + elapsedSimTime * 0.012;
      const desiredPitch =
        inspect.active && inspect.targetPitch !== null ? inspect.targetPitch : targetRig.pitch;
      const desiredMass = inspect.active ? inspect.lensingMass : 1.5;
      const desiredDiskOpacity = inspect.active ? inspect.diskOpacity : 1.0;

      damped.r = THREE.MathUtils.damp(damped.r, targetRig.r, lambda, dt);
      damped.opticalR = THREE.MathUtils.damp(damped.opticalR, targetRig.opticalR, lambda, dt);
      damped.pitch = THREE.MathUtils.damp(damped.pitch, desiredPitch, lambda, dt);
      damped.yaw = THREE.MathUtils.damp(damped.yaw, desiredYaw, lambda, dt);
      damped.roll = THREE.MathUtils.damp(
        damped.roll,
        inspect.active ? 0.0 : targetRig.roll,
        lambda,
        dt
      );
      damped.fov = THREE.MathUtils.damp(damped.fov, targetRig.fov, lambda, dt);
      damped.offsetX = THREE.MathUtils.damp(
        damped.offsetX,
        inspect.active ? 0.0 : targetRig.screenOffset[0],
        lambda,
        dt
      );
      damped.offsetY = THREE.MathUtils.damp(
        damped.offsetY,
        inspect.active ? 0.0 : targetRig.screenOffset[1],
        lambda,
        dt
      );
      damped.targetX = THREE.MathUtils.damp(
        damped.targetX,
        inspect.active ? 0.0 : targetRig.camTarget.x,
        lambda,
        dt
      );
      damped.targetY = THREE.MathUtils.damp(
        damped.targetY,
        inspect.active ? 0.0 : targetRig.camTarget.y,
        lambda,
        dt
      );
      damped.targetZ = THREE.MathUtils.damp(
        damped.targetZ,
        inspect.active ? 0.0 : targetRig.camTarget.z,
        lambda,
        dt
      );
      damped.lensingMass = THREE.MathUtils.damp(damped.lensingMass, desiredMass, lambda, dt);
      damped.dopplerBoost = THREE.MathUtils.damp(
        damped.dopplerBoost,
        targetRig.dopplerBoost,
        lambda,
        dt
      );
      damped.diskOpacity = THREE.MathUtils.damp(damped.diskOpacity, desiredDiskOpacity, lambda, dt);
      damped.jetIntensity = THREE.MathUtils.damp(
        damped.jetIntensity,
        targetRig.jetIntensity,
        lambda,
        dt
      );

      const camPos = sphericalToCartesian(damped.opticalR, damped.pitch, damped.yaw);

      uniforms.uTime.value = elapsedSimTime;
      uniforms.uCamPos.value.set(camPos.x, camPos.y, camPos.z);
      uniforms.uCamTarget.value.set(damped.targetX, damped.targetY, damped.targetZ);
      uniforms.uRoll.value = damped.roll;
      uniforms.uFov.value = damped.fov;
      uniforms.uScreenOffset.value.set(damped.offsetX, damped.offsetY);
      uniforms.uLensingMass.value = damped.lensingMass;
      uniforms.uDopplerBoost.value = damped.dopplerBoost;
      uniforms.uDiskOpacity.value = damped.diskOpacity;
      uniforms.uJetIntensity.value = damped.jetIntensity;

      // Handle Geodesic Pulse in Ch.4 or Polar Jet Pulse in Ch.6
      if (polarJetPulseRef.current > 0.01) {
        polarJetPulseRef.current = Math.max(0, polarJetPulseRef.current - dt * 0.65);
        const jetY = (1 - polarJetPulseRef.current) * 16.0 + 1.2;
        uniforms.uPulseActive.value = 1.0;
        uniforms.uPulsePos.value.set(0, jetY, 0);
        uniforms.uJetIntensity.value = Math.min(1.65, damped.jetIntensity + polarJetPulseRef.current * 0.7);
      } else if (pulseRef.current.active) {
        uniforms.uPulseActive.value = 1.0;
        uniforms.uPulsePos.value.set(
          pulseRef.current.worldPos.x,
          pulseRef.current.worldPos.y,
          pulseRef.current.worldPos.z
        );
      } else {
        uniforms.uPulseActive.value = 0.0;
      }

      gravitationalAudio.updateTelemetry(damped.r, damped.lensingMass);

      renderer.render(scene, camera);

      // Throttle React HUD coordinate synchronization to ~10Hz per ultra-mode rules
      if (now - lastHudSyncTime > 95 && onDampedRigUpdateRef.current) {
        lastHudSyncTime = now;
        onDampedRigUpdateRef.current({
          r: damped.r,
          opticalR: damped.opticalR,
          pitch: damped.pitch,
          yaw: damped.yaw,
          camPos,
          camTarget: { x: damped.targetX, y: damped.targetY, z: damped.targetZ },
          roll: damped.roll,
          fov: damped.fov,
          screenOffset: [damped.offsetX, damped.offsetY],
          lensingMass: damped.lensingMass,
          dopplerBoost: damped.dopplerBoost,
          diskOpacity: damped.diskOpacity,
          jetIntensity: damped.jetIntensity,
          chapterIndex: targetRig.chapterIndex,
          chapterProgress: targetRig.chapterProgress,
        });
      }

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    frameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      if (loadedSkyTexture) loadedSkyTexture.dispose();
      quadGeo.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={canvasMountRef}
      className="fixed inset-0 w-screen h-screen z-0 pointer-events-none overflow-hidden bg-black"
    />
  );
};
]]>
    </file>
    <file path="src/app/(perigee)/perigee/components/Experience.tsx">
<![CDATA['use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  CHAPTERS,
  CameraRigState,
  computeGravitationalRedshift,
  computeTimeDilation,
  getChapter5CalloutPins,
  interpolateTimelineState,
  projectWorldToScreen,
} from '../physics/geodesicMath';
import { BlackHoleCanvas } from './BlackHoleCanvas';
import { HoldInspector, InspectOverrideValues } from './HoldInspector';
import { ActivePhotonPulse, SlingshotOverlay } from './SlingshotOverlay';
import { ObservationConsole } from './ObservationConsole';
import { initMasterScrollTimeline, ScrollControllerHandle } from '../scroll/timeline';
import { gravitationalAudio } from '../audio/gravitationalAudio';

const Volume2Icon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

const VolumeXIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="22" y1="9" x2="16" y2="15" />
    <line x1="16" y1="9" x2="22" y2="15" />
  </svg>
);

export const Experience: React.FC = () => {
  const initialRig = interpolateTimelineState(0.0);
  const [liveRig, setLiveRig] = useState<CameraRigState>(initialRig);
  const [isInspectLocked, setIsInspectLocked] = useState(false);
  const [hasUsedInspect, setHasUsedInspect] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isHeaderSettled, setIsHeaderSettled] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);

  const scrollTrackRef = useRef<HTMLDivElement | null>(null);
  const scrollCtrlRef = useRef<ScrollControllerHandle | null>(null);
  const rigRef = useRef<CameraRigState>(initialRig);
  const settleTimerRef = useRef<number | null>(null);
  const lastProgressRef = useRef<number>(0);
  const inspectRef = useRef<InspectOverrideValues>({
    active: false,
    yawDelta: 0,
    targetPitch: null,
    lensingMass: 1.5,
    diskOpacity: 1.0,
  });
  const pulseRef = useRef<ActivePhotonPulse>({
    active: false,
    worldPos: { x: 0, y: 0, z: 0 },
  });
  const polarJetPulseRef = useRef<number>(0);

  const wakeNarrativeHeader = () => {
    setIsHeaderSettled(false);
    if (settleTimerRef.current !== null) {
      window.clearTimeout(settleTimerRef.current);
    }
    settleTimerRef.current = window.setTimeout(() => {
      setIsHeaderSettled(true);
    }, 3500);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-perigee-mode', 'experience');
    wakeNarrativeHeader();
    return () => {
      document.documentElement.removeAttribute('data-perigee-mode');
      if (settleTimerRef.current !== null) {
        window.clearTimeout(settleTimerRef.current);
      }
    };
  }, []);

  // Initialize GSAP ScrollTrigger + Lenis timeline
  useEffect(() => {
    if (!scrollTrackRef.current) return;
    const ctrl = initMasterScrollTimeline(scrollTrackRef.current, {
      onProgress: (progress) => {
        if (Math.abs(progress - lastProgressRef.current) > 0.0005) {
          lastProgressRef.current = progress;
          wakeNarrativeHeader();
        }
        const nextRig = interpolateTimelineState(progress);
        rigRef.current = nextRig;
        setLiveRig((prev) => ({
          ...nextRig,
          lensingMass: inspectRef.current.active ? inspectRef.current.lensingMass : prev.lensingMass,
        }));
      },
      getIsLocked: () => inspectRef.current.active,
    });
    scrollCtrlRef.current = ctrl;

    return () => {
      ctrl.destroy();
      scrollCtrlRef.current = null;
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'SELECT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }
      if (inspectRef.current.active) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault();
        wakeNarrativeHeader();
        scrollCtrlRef.current?.stepChapter(1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft' || (e.key === ' ' && e.shiftKey)) {
        e.preventDefault();
        wakeNarrativeHeader();
        scrollCtrlRef.current?.stepChapter(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleInspectChange = (nextInspect: InspectOverrideValues) => {
    inspectRef.current = nextInspect;
    setIsInspectLocked(nextInspect.active);
    scrollCtrlRef.current?.setLocked(nextInspect.active);
  };

  const handleToggleSound = () => {
    const enabled = gravitationalAudio.toggleMute();
    setSoundEnabled(enabled);
  };

  const activeChapter = CHAPTERS[liveRig.chapterIndex] || CHAPTERS[0];
  const redshiftZ = computeGravitationalRedshift(liveRig.r);
  const timeDilationGamma = computeTimeDilation(liveRig.r);
  const aspect =
    typeof window !== 'undefined' ? window.innerWidth / Math.max(1, window.innerHeight) : 16 / 9;

  const ch5Callouts =
    activeChapter.id === 5 && !isInspectLocked
      ? getChapter5CalloutPins(liveRig).map((pin) => ({
          ...pin,
          screen: projectWorldToScreen(pin.worldPos, liveRig, aspect),
        }))
      : [];

  const isHeaderDimmed = isHeaderSettled && !isHeaderHovered;

  return (
    <div
      id="perigee-experience-root"
      data-chapter={activeChapter.id}
      data-inspect-locked={isInspectLocked ? 'true' : 'false'}
      className="relative min-h-screen bg-black text-[#f6f1ea] selection:bg-[#ffb36b]/30"
    >
      {/* 1. Fixed Full-Viewport WebGL Raymarched Schwarzschild Black Hole Canvas */}
      <BlackHoleCanvas
        rigRef={rigRef}
        inspectRef={inspectRef}
        pulseRef={pulseRef}
        polarJetPulseRef={polarJetPulseRef}
        onDampedRigUpdate={(dampedRig) => setLiveRig(dampedRig)}
      />

      {/* 2. Invisible Tall Scroll Track Driving Master GSAP Timeline (0 -> 1 across 6 chapters) */}
      <div
        ref={scrollTrackRef}
        aria-hidden="true"
        className="relative w-full h-[600vh] pointer-events-none"
      />

      {/* 3. Austere Astrophysics Instrument Overlay */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-10 py-4 pointer-events-none bg-gradient-to-b from-black/80 via-black/35 to-transparent">
        {/* Top-left: small "PERIGEE" wordmark and live Schwarzschild radial distance readout */}
        <div className="flex flex-wrap items-center gap-4 pointer-events-auto bg-black/70 border border-[#f6f1ea]/15 px-3.5 py-1.5">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              wakeNarrativeHeader();
              scrollCtrlRef.current?.scrollToChapter(0);
            }}
            className="text-sm font-semibold tracking-[0.22em] uppercase text-[#f6f1ea] whitespace-nowrap shrink-0"
          >
            PERIGEE
          </a>
          <span className="text-[#f6f1ea]/25" aria-hidden="true">
            |
          </span>
          <div
            data-testid="telemetry-readout"
            className="text-xs font-mono-tech text-[#f6f1ea]/90 tracking-wide whitespace-nowrap"
          >
            <span>r = {liveRig.r.toFixed(2)} Rs</span>
            <span className="mx-2 text-[#f6f1ea]/30">|</span>
            <span>z = {redshiftZ.toFixed(3)}</span>
            <span className="hidden sm:inline mx-2 text-[#f6f1ea]/30">|</span>
            <span className="hidden sm:inline text-[#ffb36b]">
              γ = {timeDilationGamma.toFixed(2)}×
            </span>
          </div>
        </div>

        {/* Top-right: Synthesized Web Audio API gravitational drone + Geiger photon click toggle */}
        <div className="pointer-events-auto">
          <button
            type="button"
            aria-label={soundEnabled ? 'Mute gravitational telemetry audio' : 'Enable gravitational telemetry audio'}
            aria-pressed={soundEnabled}
            onClick={handleToggleSound}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono-tech border border-[#f6f1ea]/15 bg-black/85 text-[#f6f1ea]/90 hover:border-[#ffb36b]/60 hover:text-[#f6f1ea] transition-colors cursor-pointer whitespace-nowrap"
          >
            {soundEnabled ? (
              <>
                <Volume2Icon className="w-3.5 h-3.5 text-[#ffb36b]" />
                <span>AUDIO TELEMETRY ON</span>
              </>
            ) : (
              <>
                <VolumeXIcon className="w-3.5 h-3.5 text-[#f6f1ea]/50" />
                <span>AUDIO MUTED</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* 4. Upper-Center Auto-Dimming Observatory Header Below Top Telemetry Bar */}
      <main
        data-testid="upper-center-narrative-header"
        data-header-dimmed={isHeaderDimmed ? 'true' : 'false'}
        onPointerEnter={() => setIsHeaderHovered(true)}
        onPointerLeave={() => setIsHeaderHovered(false)}
        className={`fixed top-16 left-1/2 -translate-x-1/2 z-20 w-[calc(100vw-2rem)] max-w-xl transition-opacity duration-500 ${
          isInspectLocked
            ? 'opacity-10 pointer-events-none'
            : isHeaderDimmed
            ? 'opacity-25 hover:opacity-100 pointer-events-auto'
            : 'opacity-100 pointer-events-auto'
        }`}
      >
        <div className="bg-black/80 border border-[#f6f1ea]/15 px-5 py-3 text-center">
          <div className="text-[11px] font-mono-tech text-[#ffb36b] tracking-widest uppercase mb-1">
            {activeChapter.subtitle}
          </div>

          {activeChapter.headline ? (
            <div className="mb-1">
              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#f6f1ea] leading-none">
                {activeChapter.headline}
              </h1>
              <p className="font-editorial italic text-sm md:text-base text-[#f6f1ea]/80 mt-0.5">
                At the edge of curved spacetime.
              </p>
            </div>
          ) : (
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-[#f6f1ea] mb-1 text-balance">
              {activeChapter.title}
            </h1>
          )}

          <p
            data-testid="chapter-narrative-copy"
            className="text-xs md:text-sm text-[#f6f1ea]/90 leading-relaxed max-w-lg mx-auto text-balance"
          >
            {activeChapter.copy}
          </p>
        </div>
      </main>

      {/* 5. Chapter 5 Anatomical Callout Labels (Event Horizon, Photon Sphere, ISCO, Secondary Image) */}
      {activeChapter.id === 5 && !isInspectLocked && (
        <div
          data-testid="chapter-5-callouts"
          className="fixed inset-0 z-20 pointer-events-none"
        >
          {ch5Callouts.map((callout) => (
            <div
              key={callout.id}
              style={{
                left: `${(callout.screen.x * 100).toFixed(2)}%`,
                top: `${(callout.screen.y * 100).toFixed(2)}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className="fixed flex items-center gap-2.5"
            >
              <span className="w-2 h-2 bg-[#ffb36b] shrink-0" />
              <div className="bg-black/85 border border-[#f6f1ea]/20 px-3 py-1.5">
                <div className="text-xs font-medium text-[#f6f1ea] whitespace-nowrap">
                  {callout.label}
                </div>
                <div className="text-[11px] font-mono-tech text-[#ffb36b] whitespace-nowrap">
                  {callout.metric}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 6. Hold-to-Inspect Singularity Lensing Inspector (Chapters 1, 3, and 5) */}
      <HoldInspector
        rig={liveRig}
        inspectableChapter={activeChapter.inspectable}
        isInspectLocked={isInspectLocked}
        onInspectChange={handleInspectChange}
        hasUsedInspect={hasUsedInspect}
        onMarkUsed={() => setHasUsedInspect(true)}
      />

      {/* 7. Signature Interaction in Chapter 4: Geodesic Slingshot Launcher */}
      <SlingshotOverlay
        rig={liveRig}
        active={activeChapter.id === 4 && !isInspectLocked}
        onPulseUpdate={(pulse) => {
          pulseRef.current = pulse;
        }}
      />

      {/* 8. Chapter 6: Polar Escape Observation Window / Telemetry Feed Console */}
      <ObservationConsole
        visible={activeChapter.id === 6 && !isInspectLocked}
        onFirePolarPulse={() => {
          polarJetPulseRef.current = 1.0;
        }}
      />

      {/* 9. Bottom-left Chapter Marker & Stepper Navigation */}
      <footer className="fixed bottom-6 left-6 md:left-10 z-30 flex flex-wrap items-center gap-4 pointer-events-auto">
        <div
          data-testid="chapter-marker"
          className="px-3.5 py-2 bg-black/85 border border-[#f6f1ea]/15 text-xs font-mono-tech text-[#f6f1ea] tracking-wider whitespace-nowrap"
        >
          {activeChapter.numberLabel} — {activeChapter.title}
        </div>

        <nav aria-label="Chapter Trajectory Navigation" className="flex items-center gap-1">
          {CHAPTERS.map((ch, idx) => {
            const isCurrent = idx === liveRig.chapterIndex;
            return (
              <button
                key={ch.id}
                type="button"
                aria-label={`Chapter ${ch.numberLabel}: ${ch.title}`}
                aria-current={isCurrent ? 'step' : undefined}
                onClick={() => {
                  wakeNarrativeHeader();
                  scrollCtrlRef.current?.scrollToChapter(idx);
                }}
                className={`px-2.5 py-2 text-xs font-mono-tech border transition-colors cursor-pointer whitespace-nowrap ${
                  isCurrent
                    ? 'bg-[#f6f1ea] text-black border-[#f6f1ea] font-medium'
                    : 'bg-black/80 text-[#f6f1ea]/60 border-[#f6f1ea]/15 hover:text-[#f6f1ea] hover:border-[#f6f1ea]/40'
                }`}
              >
                {ch.numberLabel}
              </button>
            );
          })}
        </nav>
      </footer>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(perigee)/perigee/components/HoldInspector.tsx">
<![CDATA["use client";

import React, { useEffect, useRef, useState } from 'react';
import {
  CameraRigState,
  clamp,
  computeInspectParametersFromDrag,
  getInspectAnatomicalPins,
  projectWorldToScreen,
} from '../physics/geodesicMath';

export interface InspectOverrideValues {
  active: boolean;
  yawDelta: number;
  targetPitch: number | null;
  lensingMass: number;
  diskOpacity: number;
}

interface HoldInspectorProps {
  rig: CameraRigState;
  inspectableChapter: boolean;
  isInspectLocked: boolean;
  onInspectChange: (state: InspectOverrideValues) => void;
  hasUsedInspect: boolean;
  onMarkUsed: () => void;
}

export const HoldInspector: React.FC<HoldInspectorProps> = ({
  rig,
  inspectableChapter,
  isInspectLocked,
  onInspectChange,
  hasUsedInspect,
  onMarkUsed,
}) => {
  const [holdProgress, setHoldProgress] = useState(0); // 0..1 during 350ms hold
  const [pointerPos, setPointerPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHoldingRing, setIsHoldingRing] = useState(false);
  const [dragMetrics, setDragMetrics] = useState({
    lensingMass: 1.5,
    diskOpacity: 1.0,
    inclinationDeg: (rig.pitch * 180) / Math.PI,
  });

  const holdStartRef = useRef<number | null>(null);
  const holdRafRef = useRef<number | null>(null);
  const pointerDownOriginRef = useRef<{ x: number; y: number } | null>(null);
  const isLockedRef = useRef(false);
  const keyboardNavRef = useRef({ normDx: 0, normDy: 0 });

  useEffect(() => {
    isLockedRef.current = isInspectLocked;
  }, [isInspectLocked]);

  // Project black hole center to screen for proximity check and hint placement
  const aspect = typeof window !== 'undefined' ? window.innerWidth / Math.max(1, window.innerHeight) : 16 / 9;
  const shadowScreen = projectWorldToScreen({ x: 0, y: 0, z: 0 }, rig, aspect);

  // Project the 6 anatomical pins when locked in Inspect mode
  const projectedPins = isInspectLocked
    ? getInspectAnatomicalPins(rig).map((pin) => ({
        ...pin,
        screen: projectWorldToScreen(pin.worldPos, rig, aspect),
      }))
    : [];

  const cancelHoldTimer = () => {
    holdStartRef.current = null;
    if (holdRafRef.current !== null) {
      cancelAnimationFrame(holdRafRef.current);
      holdRafRef.current = null;
    }
    setHoldProgress(0);
    setIsHoldingRing(false);
  };

  const exitInspectMode = () => {
    cancelHoldTimer();
    keyboardNavRef.current = { normDx: 0, normDy: 0 };
    setDragMetrics({
      lensingMass: 1.5,
      diskOpacity: 1.0,
      inclinationDeg: (rig.pitch * 180) / Math.PI,
    });
    onInspectChange({
      active: false,
      yawDelta: 0,
      targetPitch: null,
      lensingMass: 1.5,
      diskOpacity: 1.0,
    });
  };

  const engageInspectMode = (originX: number, originY: number) => {
    cancelHoldTimer();
    onMarkUsed();
    pointerDownOriginRef.current = { x: originX, y: originY };
    setDragMetrics({
      lensingMass: 1.5,
      diskOpacity: 0.75,
      inclinationDeg: (rig.pitch * 180) / Math.PI,
    });
    onInspectChange({
      active: true,
      yawDelta: 0,
      targetPitch: rig.pitch,
      lensingMass: 1.5,
      diskOpacity: 0.75,
    });
  };

  // Pointer handlers on the interactive horizon capture zone
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!inspectableChapter || e.button !== 0) return;

    const clientX = e.clientX;
    const clientY = e.clientY;
    setPointerPos({ x: clientX, y: clientY });
    pointerDownOriginRef.current = { x: clientX, y: clientY };

    if (isInspectLocked) {
      return;
    }

    setIsHoldingRing(true);
    holdStartRef.current = performance.now();

    const tickHold = (now: number) => {
      if (holdStartRef.current === null) return;
      const elapsed = now - holdStartRef.current;
      const p = clamp(elapsed / 350, 0, 1);
      setHoldProgress(p);
      if (p >= 1) {
        engageInspectMode(clientX, clientY);
      } else {
        holdRafRef.current = requestAnimationFrame(tickHold);
      }
    };

    holdRafRef.current = requestAnimationFrame(tickHold);
  };

  useEffect(() => {
    const handleGlobalPointerMove = (e: PointerEvent) => {
      if (!pointerDownOriginRef.current) return;
      const dx = e.clientX - pointerDownOriginRef.current.x;
      const dy = e.clientY - pointerDownOriginRef.current.y;

      // If still in the 350ms hold phase and user drags/swipes > 14px, cancel hold so ordinary scroll/swipe never triggers inspect
      if (!isLockedRef.current && holdStartRef.current !== null) {
        if (Math.hypot(dx, dy) > 14) {
          cancelHoldTimer();
          pointerDownOriginRef.current = null;
        }
        return;
      }

      if (isLockedRef.current) {
        setPointerPos({ x: e.clientX, y: e.clientY });
        const normDx = clamp(dx / (window.innerWidth * 0.38), -1, 1);
        const normDy = clamp(dy / (window.innerHeight * 0.38), -1, 1);
        const params = computeInspectParametersFromDrag(normDx, normDy, rig.pitch);

        setDragMetrics({
          lensingMass: params.lensingMass,
          diskOpacity: params.diskOpacity,
          inclinationDeg: (params.targetPitch * 180) / Math.PI,
        });

        onInspectChange({
          active: true,
          yawDelta: params.yawDelta,
          targetPitch: params.targetPitch,
          lensingMass: params.lensingMass,
          diskOpacity: params.diskOpacity,
        });
      }
    };

    const handleGlobalPointerUp = () => {
      if (holdStartRef.current !== null) {
        cancelHoldTimer();
      }
      if (isLockedRef.current && pointerDownOriginRef.current !== null) {
        pointerDownOriginRef.current = null;
        exitInspectMode();
      }
    };

    window.addEventListener('pointermove', handleGlobalPointerMove, { passive: true });
    window.addEventListener('pointerup', handleGlobalPointerUp);
    window.addEventListener('pointercancel', handleGlobalPointerUp);
    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove);
      window.removeEventListener('pointerup', handleGlobalPointerUp);
      window.removeEventListener('pointercancel', handleGlobalPointerUp);
    };
  }, [rig.pitch, inspectableChapter]);

  // Keyboard navigation while Inspect Singularity mode is active
  useEffect(() => {
    if (!isInspectLocked) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        exitInspectMode();
        return;
      }

      let handled = false;
      if (e.key === 'ArrowRight') {
        keyboardNavRef.current.normDx = clamp(keyboardNavRef.current.normDx + 0.15, -1, 1);
        handled = true;
      } else if (e.key === 'ArrowLeft') {
        keyboardNavRef.current.normDx = clamp(keyboardNavRef.current.normDx - 0.15, -1, 1);
        handled = true;
      } else if (e.key === 'ArrowUp') {
        keyboardNavRef.current.normDy = clamp(keyboardNavRef.current.normDy + 0.15, -1, 1);
        handled = true;
      } else if (e.key === 'ArrowDown') {
        keyboardNavRef.current.normDy = clamp(keyboardNavRef.current.normDy - 0.15, -1, 1);
        handled = true;
      }

      if (handled) {
        e.preventDefault();
        e.stopPropagation();
        const params = computeInspectParametersFromDrag(
          keyboardNavRef.current.normDx,
          keyboardNavRef.current.normDy,
          rig.pitch
        );
        setDragMetrics({
          lensingMass: params.lensingMass,
          diskOpacity: params.diskOpacity,
          inclinationDeg: (params.targetPitch * 180) / Math.PI,
        });
        onInspectChange({
          active: true,
          yawDelta: params.yawDelta,
          targetPitch: params.targetPitch,
          lensingMass: params.lensingMass,
          diskOpacity: params.diskOpacity,
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [isInspectLocked, rig.pitch]);

  if (!inspectableChapter && !isInspectLocked) {
    return null;
  }

  const shadowCssX = `${(shadowScreen.x * 100).toFixed(2)}%`;
  const shadowCssY = `${(shadowScreen.y * 100).toFixed(2)}%`;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 select-none">
      {/* Interactive Horizon Hold Zone around the Schwarzschild Shadow */}
      <div
        data-testid="horizon-hold-zone"
        onPointerDown={handlePointerDown}
        style={{
          left: shadowCssX,
          top: shadowCssY,
          transform: 'translate(-50%, -50%)',
        }}
        className={`pointer-events-auto absolute w-72 h-72 md:w-96 md:h-96 rounded-full flex items-center justify-center transition-opacity duration-300 ${
          isInspectLocked ? 'cursor-grabbing' : 'cursor-crosshair'
        }`}
      >
        {/* Subtle Horizon Hold Hint (fades after first use, hidden in Ch.5 where anatomical callouts are pinned) */}
        {!isInspectLocked && !isHoldingRing && rig.chapterIndex !== 4 && (
          <div
            className={`mt-64 md:mt-72 px-3 py-1.5 border border-[#f6f1ea]/15 bg-black/75 text-[#f6f1ea]/75 text-xs font-mono-tech tracking-wider transition-opacity duration-500 whitespace-nowrap ${
              hasUsedInspect ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            Hold on horizon to inspect spacetime
          </div>
        )}
      </div>

      {/* 350ms Vernier Ring Filling Around Pointer */}
      {isHoldingRing && !isInspectLocked && (
        <div
          style={{
            left: `${pointerPos.x}px`,
            top: `${pointerPos.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
          className="fixed pointer-events-none z-40 flex flex-col items-center"
        >
          <svg width="68" height="68" viewBox="0 0 68 68" className="-rotate-90">
            <circle
              cx="34"
              cy="34"
              r="28"
              fill="none"
              stroke="rgba(246, 241, 234, 0.16)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <circle
              cx="34"
              cy="34"
              r="28"
              fill="none"
              stroke="#ffb36b"
              strokeWidth="2"
              strokeDasharray={2 * Math.PI * 28}
              strokeDashoffset={2 * Math.PI * 28 * (1 - holdProgress)}
            />
          </svg>
          <span className="mt-1.5 text-[11px] font-mono-tech text-[#ffb36b] tracking-widest uppercase bg-black/80 px-2 py-0.5 border border-[#ffb36b]/30">
            LOCKING METRIC {(holdProgress * 100).toFixed(0)}%
          </span>
        </div>
      )}

      {/* 3D-Projected Anatomical Labels when Singularity Inspection Mode is Locked */}
      {isInspectLocked && (
        <>
          {projectedPins.map((pin) => {
            if (!pin.screen.visible) return null;
            return (
              <div
                key={pin.id}
                data-testid={`inspect-pin-${pin.id}`}
                style={{
                  left: `${(pin.screen.x * 100).toFixed(2)}%`,
                  top: `${(pin.screen.y * 100).toFixed(2)}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="fixed pointer-events-none transition-transform duration-75"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 border border-[#ffb36b] bg-black/90 shrink-0" />
                  <div className="px-2.5 py-1 bg-black/85 border border-[#f6f1ea]/20 text-left">
                    <div className="text-xs font-medium text-[#f6f1ea] whitespace-nowrap leading-tight">
                      {pin.label}
                    </div>
                    <div className="text-[11px] font-mono-tech text-[#ffb36b] whitespace-nowrap">
                      {pin.metric}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Active Singularity Lensing HUD Bar */}
          <div
            data-testid="singularity-inspect-hud"
            className="fixed top-16 left-1/2 -translate-x-1/2 pointer-events-auto bg-black/90 border border-[#f6f1ea]/20 px-4 py-2.5 flex items-center gap-4 text-xs font-mono-tech whitespace-nowrap max-w-[95vw] overflow-x-auto"
          >
            <div>
              <span className="text-[#f6f1ea]/55">MODE </span>
              <span className="text-[#ffb36b]">SINGULARITY LENSING</span>
            </div>
            <span className="text-[#f6f1ea]/20" aria-hidden="true">·</span>
            <div>
              <span className="text-[#f6f1ea]/55">MASS </span>
              <span className="text-[#f6f1ea]">{dragMetrics.lensingMass.toFixed(2)} M₀</span>
            </div>
            <span className="text-[#f6f1ea]/20" aria-hidden="true">·</span>
            <div>
              <span className="text-[#f6f1ea]/55">DISK OPACITY </span>
              <span className="text-[#f6f1ea]">{(dragMetrics.diskOpacity * 100).toFixed(0)}%</span>
            </div>
            <span className="text-[#f6f1ea]/20" aria-hidden="true">·</span>
            <div>
              <span className="text-[#f6f1ea]/55">INCLINATION </span>
              <span className="text-[#f6f1ea]">{dragMetrics.inclinationDeg.toFixed(1)}°</span>
            </div>
            <button
              type="button"
              onClick={exitInspectMode}
              className="ml-1 px-2.5 py-1 border border-[#f6f1ea]/25 text-[#f6f1ea] hover:border-[#ffb36b] hover:text-[#ffb36b] transition-colors cursor-pointer whitespace-nowrap"
            >
              Exit Inspect (Esc)
            </button>
          </div>
        </>
      )}

      {/* Focusable Keyboard-Accessible Inspect Singularity Button */}
      <div className="fixed bottom-6 right-6 pointer-events-auto z-30">
        <button
          type="button"
          aria-pressed={isInspectLocked}
          onClick={() => {
            if (isInspectLocked) {
              exitInspectMode();
            } else {
              engageInspectMode(window.innerWidth * 0.5, window.innerHeight * 0.5);
            }
          }}
          className={`px-3.5 py-2 text-xs font-mono-tech border transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#ffb36b] ${
            isInspectLocked
              ? 'bg-[#ffb36b] text-black border-[#ffb36b] font-medium'
              : 'bg-black/85 text-[#f6f1ea] border-[#f6f1ea]/20 hover:border-[#ffb36b]/70'
          }`}
        >
          {isInspectLocked ? 'Release Singularity Metric' : 'Inspect Singularity'}
        </button>
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(perigee)/perigee/components/ObservationConsole.tsx">
<![CDATA["use client";

import React, { useState } from 'react';
import { gravitationalAudio } from '../audio/gravitationalAudio';
import {
  TARGET_BANDS,
  validateObservationForm,
  type TargetBandOption,
  type ValidatedObservationRecord,
} from '../forms/observation';

export type { TargetBandOption };
export type EphemerisSubmission = ValidatedObservationRecord;

interface ObservationConsoleProps {
  visible: boolean;
  onFirePolarPulse: () => void;
}

export const ObservationConsole: React.FC<ObservationConsoleProps> = ({
  visible,
  onFirePolarPulse,
}) => {
  const [observerName, setObserverName] = useState('');
  const [institutionEmail, setInstitutionEmail] = useState('');
  const [targetBand, setTargetBand] = useState<TargetBandOption>('Optical Geodesic');
  const [inclinationAngle, setInclinationAngle] = useState('81.4');
  const [note, setNote] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lockedSubmission, setLockedSubmission] = useState<EphemerisSubmission | null>(null);

  if (!visible) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateObservationForm({
      observerName,
      institutionEmail,
      targetBand,
      inclinationAngle,
      note,
    });

    if (!result.ok) {
      const firstError = Object.values(result.errors)[0] ?? 'Invalid form submission.';
      setErrorMsg(firstError);
      return;
    }

    setErrorMsg(null);
    setLockedSubmission(result.value);
    gravitationalAudio.triggerEphemerisLock();
    onFirePolarPulse();
  };

  return (
    <section
      aria-label="Request Observation Window and Telemetry Feed"
      data-testid="observation-console"
      className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 w-[calc(100vw-3rem)] max-w-md bg-black/90 border border-[#f6f1ea]/20 p-6 text-[#f6f1ea] pointer-events-auto"
    >
      <div className="flex items-center justify-between border-b border-[#f6f1ea]/15 pb-3 mb-4">
        <div>
          <h2 className="text-base font-medium tracking-tight text-[#f6f1ea]">
            Request Observation Window / Telemetry Feed
          </h2>
          <p className="text-xs font-mono-tech text-[#f6f1ea]/60 mt-0.5">
            NORTH POLAR MAGNETIC AXIS · EPHEMERIS ALLOCATION
          </p>
        </div>
      </div>

      {lockedSubmission ? (
        <div data-testid="ephemeris-locked-state" className="space-y-4 py-2">
          <div className="p-3.5 border border-[#ffb36b]/45 bg-[#ffb36b]/10">
            <div className="text-xs font-mono-tech text-[#ffb36b] uppercase tracking-wider">
              ● Ephemeris locked. Telemetry stream active.
            </div>
            <p className="text-xs text-[#f6f1ea]/80 mt-1.5 leading-relaxed">
              Collimated polar jet relay aligned for{' '}
              <span className="text-[#f6f1ea] font-medium">{lockedSubmission.observerName}</span> (
              {lockedSubmission.institutionEmail}).
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono-tech border-t border-b border-[#f6f1ea]/15 py-3">
            <div>
              <div className="text-[#f6f1ea]/50">TARGET BAND</div>
              <div className="text-[#e6f0ff] mt-0.5">{lockedSubmission.targetBand}</div>
            </div>
            <div>
              <div className="text-[#f6f1ea]/50">INCLINATION</div>
              <div className="text-[#f6f1ea] mt-0.5">{lockedSubmission.inclinationAngle.toFixed(1)}°</div>
            </div>
            <div>
              <div className="text-[#f6f1ea]/50">LOCK EPOCH</div>
              <div className="text-[#f6f1ea] mt-0.5">{lockedSubmission.timestampIso}</div>
            </div>
            <div>
              <div className="text-[#f6f1ea]/50">POLAR FLUX</div>
              <div className="text-[#ffb36b] mt-0.5">1.42 × 10⁴³ erg/s</div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={onFirePolarPulse}
              className="px-4 py-2 text-xs font-mono-tech bg-[#ffb36b] text-black font-medium hover:bg-[#ff8a3d] transition-colors cursor-pointer whitespace-nowrap"
            >
              Fire Polar Jet Pulse
            </button>
            <button
              type="button"
              onClick={() => setLockedSubmission(null)}
              className="px-3 py-2 text-xs font-mono-tech border border-[#f6f1ea]/20 text-[#f6f1ea]/80 hover:text-[#f6f1ea] hover:border-[#f6f1ea]/40 transition-colors cursor-pointer whitespace-nowrap"
            >
              Modify Window
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-3.5 text-xs">
          <div>
            <label htmlFor="obs-name" className="block font-mono-tech text-[#f6f1ea]/70 mb-1">
              Observer Name
            </label>
            <input
              id="obs-name"
              type="text"
              value={observerName}
              onChange={(e) => setObserverName(e.target.value)}
              placeholder="Dr. Elena Vance"
              className="w-full bg-black border border-[#f6f1ea]/20 px-3 py-2 text-[#f6f1ea] placeholder:text-[#f6f1ea]/30 focus:outline-none focus:border-[#ffb36b]"
            />
          </div>

          <div>
            <label htmlFor="obs-email" className="block font-mono-tech text-[#f6f1ea]/70 mb-1">
              Institution / Email
            </label>
            <input
              id="obs-email"
              type="email"
              value={institutionEmail}
              onChange={(e) => setInstitutionEmail(e.target.value)}
              placeholder="vance@perimeter.observatory.org"
              className="w-full bg-black border border-[#f6f1ea]/20 px-3 py-2 text-[#f6f1ea] placeholder:text-[#f6f1ea]/30 focus:outline-none focus:border-[#ffb36b]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="obs-band" className="block font-mono-tech text-[#f6f1ea]/70 mb-1">
                Target Band
              </label>
              <select
                id="obs-band"
                value={targetBand}
                onChange={(e) => setTargetBand(e.target.value as TargetBandOption)}
                className="w-full bg-black border border-[#f6f1ea]/20 px-2.5 py-2 text-[#f6f1ea] focus:outline-none focus:border-[#ffb36b]"
              >
                <option value="Optical Geodesic">Optical Geodesic</option>
                <option value="X-Ray Accretion">X-Ray Accretion</option>
                <option value="Gravitational Wave">Gravitational Wave</option>
              </select>
            </div>

            <div>
              <label htmlFor="obs-angle" className="block font-mono-tech text-[#f6f1ea]/70 mb-1">
                Inclination Angle (0°–90°)
              </label>
              <input
                id="obs-angle"
                type="number"
                step="0.1"
                min="0"
                max="90"
                value={inclinationAngle}
                onChange={(e) => setInclinationAngle(e.target.value)}
                className="w-full bg-black border border-[#f6f1ea]/20 px-3 py-2 font-mono-tech text-[#f6f1ea] focus:outline-none focus:border-[#ffb36b]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="obs-note" className="block font-mono-tech text-[#f6f1ea]/70 mb-1">
              Optional Note
            </label>
            <input
              id="obs-note"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="VLBI baseline phase calibration"
              className="w-full bg-black border border-[#f6f1ea]/20 px-3 py-2 text-[#f6f1ea] placeholder:text-[#f6f1ea]/30 focus:outline-none focus:border-[#ffb36b]"
            />
          </div>

          {errorMsg && (
            <div
              role="alert"
              data-testid="observation-form-error"
              className="text-xs font-mono-tech text-[#ff8a3d] border border-[#ff8a3d]/40 bg-[#ff8a3d]/10 px-3 py-2"
            >
              ▲ {errorMsg}
            </div>
          )}

          <div className="pt-1">
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#f6f1ea] text-black font-mono-tech text-xs font-medium hover:bg-[#ffb36b] transition-colors cursor-pointer whitespace-nowrap"
            >
              Lock Ephemeris &amp; Ignite Polar Relay
            </button>
          </div>
        </form>
      )}
    </section>
  );
};
]]>
    </file>
    <file path="src/app/(perigee)/perigee/components/SlingshotOverlay.tsx">
<![CDATA["use client";

import React, { useEffect, useRef, useState } from 'react';
import {
  CameraRigState,
  Vec3,
  computeGeodesicTrajectory,
  projectWorldToScreen,
  screenDragToLaunchRay,
} from '../physics/geodesicMath';
import { gravitationalAudio } from '../audio/gravitationalAudio';

export interface ActivePhotonPulse {
  active: boolean;
  worldPos: Vec3;
}

interface SlingshotOverlayProps {
  rig: CameraRigState;
  active: boolean; // True when in Chapter 4 (The Photon Sphere)
  onPulseUpdate: (pulse: ActivePhotonPulse) => void;
}

interface LaunchedGeodesicRecord {
  id: number;
  points: Vec3[];
  outcome: 'CAPTURED' | 'SLINGSHOT' | 'DEFLECTED';
  impactParameterB: number;
  minRadius: number;
  headIndex: number;
}

export const SlingshotOverlay: React.FC<SlingshotOverlayProps> = ({
  rig,
  active,
  onPulseUpdate,
}) => {
  const [dragState, setDragState] = useState<{
    startX: number;
    startY: number;
    currX: number;
    currY: number;
    impactB: number;
    previewPoints: Vec3[];
    previewOutcome: 'CAPTURED' | 'SLINGSHOT' | 'DEFLECTED';
  } | null>(null);

  const [trails, setTrails] = useState<LaunchedGeodesicRecord[]>([]);
  const animRafRef = useRef<number | null>(null);
  const nextIdRef = useRef(1);

  const aspect =
    typeof window !== 'undefined' ? window.innerWidth / Math.max(1, window.innerHeight) : 16 / 9;

  // Animate active photon pulse along the most recently launched trajectory
  useEffect(() => {
    if (trails.length === 0) {
      onPulseUpdate({ active: false, worldPos: { x: 0, y: 0, z: 0 } });
      return;
    }

    const latest = trails[trails.length - 1];
    if (latest.headIndex >= latest.points.length - 1) {
      onPulseUpdate({ active: false, worldPos: { x: 0, y: 0, z: 0 } });
      return;
    }

    const timer = window.setTimeout(() => {
      setTrails((prev) =>
        prev.map((tr, idx) => {
          if (idx !== prev.length - 1) return tr;
          const nextIdx = Math.min(tr.points.length - 1, tr.headIndex + 4);
          const pt = tr.points[nextIdx];
          onPulseUpdate({
            active: nextIdx < tr.points.length - 1,
            worldPos: pt,
          });
          return { ...tr, headIndex: nextIdx };
        })
      );
    }, 28);

    return () => window.clearTimeout(timer);
  }, [trails]);

  useEffect(() => {
    return () => {
      if (animRafRef.current !== null) cancelAnimationFrame(animRafRef.current);
    };
  }, []);

  if (!active) return null;

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const normX = e.clientX / Math.max(1, window.innerWidth);
    const normY = e.clientY / Math.max(1, window.innerHeight);

    const { launchOrigin, launchDir, impactParameterB } = screenDragToLaunchRay(
      normX,
      normY,
      0,
      0,
      rig,
      aspect
    );
    const sim = computeGeodesicTrajectory(launchOrigin, launchDir, rig.lensingMass);

    setDragState({
      startX: e.clientX,
      startY: e.clientY,
      currX: e.clientX,
      currY: e.clientY,
      impactB: impactParameterB,
      previewPoints: sim.points,
      previewOutcome: sim.outcome,
    });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState) return;
    const normStartX = dragState.startX / Math.max(1, window.innerWidth);
    const normStartY = dragState.startY / Math.max(1, window.innerHeight);
    const normDx = (e.clientX - dragState.startX) / Math.max(1, window.innerWidth);
    const normDy = (e.clientY - dragState.startY) / Math.max(1, window.innerHeight);

    const { launchOrigin, launchDir, impactParameterB } = screenDragToLaunchRay(
      normStartX,
      normStartY,
      normDx,
      normDy,
      rig,
      aspect
    );
    const sim = computeGeodesicTrajectory(launchOrigin, launchDir, rig.lensingMass);

    setDragState({
      ...dragState,
      currX: e.clientX,
      currY: e.clientY,
      impactB: impactParameterB,
      previewPoints: sim.points,
      previewOutcome: sim.outcome,
    });
  };

  const handlePointerUp = () => {
    if (!dragState) return;
    const normStartX = dragState.startX / Math.max(1, window.innerWidth);
    const normStartY = dragState.startY / Math.max(1, window.innerHeight);
    const normDx = (dragState.currX - dragState.startX) / Math.max(1, window.innerWidth);
    const normDy = (dragState.currY - dragState.startY) / Math.max(1, window.innerHeight);

    const { launchOrigin, launchDir } = screenDragToLaunchRay(
      normStartX,
      normStartY,
      normDx,
      normDy,
      rig,
      aspect
    );
    const sim = computeGeodesicTrajectory(launchOrigin, launchDir, rig.lensingMass);

    gravitationalAudio.triggerGeodesicLaunch(sim.impactParameterB);

    const newRecord: LaunchedGeodesicRecord = {
      id: nextIdRef.current++,
      points: sim.points,
      outcome: sim.outcome,
      impactParameterB: sim.impactParameterB,
      minRadius: sim.minRadius,
      headIndex: 0,
    };

    setTrails((prev) => [...prev.slice(-3), newRecord]);
    setDragState(null);
  };

  const launchPresetGeodesic = (presetType: 'SLINGSHOT' | 'CAPTURED' | 'DEFLECTED') => {
    // Construct launch origin at r ~ 4.2 Rs in camera frame so all 3 regimes are clearly visible
    const dx = rig.camTarget.x - rig.camPos.x;
    const dy = rig.camTarget.y - rig.camPos.y;
    const dz = rig.camTarget.z - rig.camPos.z;
    const fLen = Math.hypot(dx, dy, dz) || 1;
    const fw = { x: dx / fLen, y: dy / fLen, z: dz / fLen };
    const worldUp = Math.abs(fw.y) > 0.99 ? { x: 0, y: 0, z: 1 } : { x: 0, y: 1, z: 0 };
    const rx = worldUp.y * fw.z - worldUp.z * fw.y;
    const ry = worldUp.z * fw.x - worldUp.x * fw.z;
    const rz = worldUp.x * fw.y - worldUp.y * fw.x;
    const rLen = Math.hypot(rx, ry, rz) || 1;
    const rt = { x: rx / rLen, y: ry / rLen, z: rz / rLen };

    // Back up along -fw to r = 5.0 Rs for a dramatic full-screen trajectory arc
    const launchOrigin = {
      x: -fw.x * 5.0 - rt.x * 0.4,
      y: 0.25,
      z: -fw.z * 5.0 - rt.z * 0.4,
    };

    const lateralFactor =
      presetType === 'CAPTURED' ? 0.18 : presetType === 'SLINGSHOT' ? 0.78 : 1.18;

    const launchDir = {
      x: fw.x + rt.x * lateralFactor,
      y: presetType === 'SLINGSHOT' ? 0.08 : -0.03,
      z: fw.z + rt.z * lateralFactor,
    };

    const sim = computeGeodesicTrajectory(launchOrigin, launchDir, rig.lensingMass);
    gravitationalAudio.triggerGeodesicLaunch(sim.impactParameterB);

    const newRecord: LaunchedGeodesicRecord = {
      id: nextIdRef.current++,
      points: sim.points,
      outcome: sim.outcome,
      impactParameterB: sim.impactParameterB,
      minRadius: sim.minRadius,
      headIndex: 0,
    };

    setTrails((prev) => [...prev.slice(-3), newRecord]);
  };

  const buildSvgPath = (pts: Vec3[], limitIdx?: number): string => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1440;
    const h = typeof window !== 'undefined' ? window.innerHeight : 900;
    const maxI = limitIdx !== undefined ? Math.min(limitIdx, pts.length) : pts.length;
    let d = '';
    for (let i = 0; i < maxI; i++) {
      const p2d = projectWorldToScreen(pts[i], rig, aspect);
      if (p2d.depth <= 0.05) continue;
      const sx = p2d.x * w;
      const sy = p2d.y * h;
      d += d === '' ? `M ${sx.toFixed(1)} ${sy.toFixed(1)}` : ` L ${sx.toFixed(1)} ${sy.toFixed(1)}`;
    }
    return d;
  };

  const latestTrail = trails.length > 0 ? trails[trails.length - 1] : null;

  return (
    <div
      data-testid="slingshot-launcher-surface"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="fixed inset-0 z-20 cursor-crosshair select-none"
    >
      {/* 3D Projected Geodesic Ribbon Trails */}
      <svg className="w-full h-full pointer-events-none overflow-visible">
        <defs>
          <linearGradient id="geodesicRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e6f0ff" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#ffb36b" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ff8a3d" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Preview Reticle & Geodesic Curve While Dragging */}
        {dragState && (
          <>
            <line
              x1={dragState.startX}
              y1={dragState.startY}
              x2={dragState.currX}
              y2={dragState.currY}
              stroke="rgba(246, 241, 234, 0.45)"
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />
            <circle
              cx={dragState.startX}
              cy={dragState.startY}
              r="6"
              fill="none"
              stroke="#ffb36b"
              strokeWidth="1.5"
            />
            <path
              d={buildSvgPath(dragState.previewPoints)}
              fill="none"
              stroke="#ffb36b"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.75"
            />
          </>
        )}

        {/* Active Launched 3D Geodesic Trails */}
        {trails.map((tr) => {
          const pathD = buildSvgPath(tr.points, tr.headIndex + 1);
          const headPt = tr.points[Math.min(tr.headIndex, tr.points.length - 1)];
          const headScreen = projectWorldToScreen(headPt, rig, aspect);
          const w = typeof window !== 'undefined' ? window.innerWidth : 1440;
          const h = typeof window !== 'undefined' ? window.innerHeight : 900;

          return (
            <g key={tr.id}>
              <path
                d={pathD}
                fill="none"
                stroke="url(#geodesicRibbonGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {headScreen.visible && (
                <circle
                  cx={headScreen.x * w}
                  cy={headScreen.y * h}
                  r="4.5"
                  fill="#e6f0ff"
                  stroke="#ffb36b"
                  strokeWidth="1.5"
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* Live Reticle Impact Parameter Readout While Dragging */}
      {dragState && (
        <div
          style={{
            left: `${dragState.currX + 16}px`,
            top: `${dragState.currY - 16}px`,
          }}
          className="fixed pointer-events-none bg-black/90 border border-[#f6f1ea]/20 px-3 py-1.5 text-xs font-mono-tech"
        >
          <div className="text-[#f6f1ea]">
            b = {dragState.impactB.toFixed(2)} Rs
          </div>
          <div className="text-[#ffb36b]">
            PREDICTED: {dragState.previewOutcome}
          </div>
        </div>
      )}

      {/* Compact Geodesic Slingshot Telemetry & Calibration Controls */}
      <div
        onPointerDown={(e) => e.stopPropagation()}
        className="fixed bottom-20 right-6 md:right-10 pointer-events-auto bg-black/85 border border-[#f6f1ea]/15 p-4 max-w-xs text-xs"
      >
        <div className="font-mono-tech text-[#ffb36b] tracking-wider uppercase mb-1">
          Geodesic Slingshot Launcher
        </div>
        <p className="text-[#f6f1ea]/70 leading-relaxed mb-3">
          Click and drag anywhere in space to fire a luminous test photon into the Schwarzschild potential, or trigger a calibrated impact parameter:
        </p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          <button
            type="button"
            onClick={() => launchPresetGeodesic('SLINGSHOT')}
            className="px-2.5 py-1.5 font-mono-tech text-[11px] border border-[#f6f1ea]/20 text-[#f6f1ea] hover:border-[#ffb36b] hover:text-[#ffb36b] transition-colors cursor-pointer whitespace-nowrap"
          >
            Fire Slingshot (b ≈ 2.1 Rs)
          </button>
          <button
            type="button"
            onClick={() => launchPresetGeodesic('CAPTURED')}
            className="px-2.5 py-1.5 font-mono-tech text-[11px] border border-[#f6f1ea]/20 text-[#f6f1ea] hover:border-[#ffb36b] hover:text-[#ffb36b] transition-colors cursor-pointer whitespace-nowrap"
          >
            Horizon Capture
          </button>
          <button
            type="button"
            onClick={() => launchPresetGeodesic('DEFLECTED')}
            className="px-2.5 py-1.5 font-mono-tech text-[11px] border border-[#f6f1ea]/20 text-[#f6f1ea] hover:border-[#ffb36b] hover:text-[#ffb36b] transition-colors cursor-pointer whitespace-nowrap"
          >
            Disk Deflection
          </button>
        </div>

        {latestTrail && (
          <div
            data-testid="geodesic-outcome-readout"
            className="pt-2.5 border-t border-[#f6f1ea]/15 font-mono-tech flex items-center justify-between text-[11px]"
          >
            <span className="text-[#f6f1ea]/60">
              b = {latestTrail.impactParameterB.toFixed(2)} Rs · r_min = {latestTrail.minRadius.toFixed(2)} Rs
            </span>
            <span className="text-[#e6f0ff] font-medium">{latestTrail.outcome}</span>
          </div>
        )}
      </div>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(perigee)/perigee/components/StaticFallbackPage.tsx">
<![CDATA[import React from 'react';
import {
  CHAPTERS,
  computeGravitationalRedshift,
  computeTimeDilation,
} from '../physics/geodesicMath';
import { ObservationForm } from '../forms/ObservationForm';

export const StaticFallbackPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-[#f6f1ea] px-6 py-12 md:px-16 selection:bg-[#ffb36b]/30">
      {/* Top Telemetry Header */}
      <header className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-4 border-b border-[#f6f1ea]/15 pb-6">
        <div className="flex items-center gap-4">
          <span className="text-xl font-semibold tracking-[0.22em] uppercase text-[#f6f1ea]">
            PERIGEE
          </span>
          <span className="text-[#f6f1ea]/25">|</span>
          <span className="text-xs font-mono-tech text-[#ffb36b] tracking-wider uppercase">
            SCHWARZSCHILD OBSERVATORY
          </span>
        </div>
        <div className="text-xs font-mono-tech text-[#f6f1ea]/70">
          EPHEMERIS: RA 17h 45m 40s · DEC -29° 00′ 28″ · M = 4.15 × 10⁶ M☉
        </div>
      </header>

      {/* Main Narrative Hero */}
      <main className="max-w-5xl mx-auto my-16 space-y-8">
        <div className="max-w-2xl">
          <div className="text-xs font-mono-tech text-[#ffb36b] tracking-widest uppercase mb-3">
            RELATIVISTIC GEODESIC TELEMETRY ARRAY
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-[#f6f1ea] leading-[1.05]">
            At the edge of curved spacetime.
          </h1>
          <p className="font-editorial italic text-xl md:text-2xl text-[#f6f1ea]/80 mt-3">
            Light does not travel in straight lines.
          </p>
          <p className="text-sm md:text-base text-[#f6f1ea]/80 mt-6 leading-relaxed">
            Positioned in bound orbit around a supermassive Schwarzschild black hole, PERIGEE pilots
            observers along an inbound relativistic geodesic trajectory—descending from a distant orbital
            vantage (r = 38 Rs) down through the shearing Keplerian plasma plane, across the Photon Sphere (r = 1.5 Rs),
            and ascending the north polar magnetic axis as a collimated relativistic jet ignites.
          </p>
        </div>

        {/* Six Observation Chapters */}
        <section aria-label="Geodesic Trajectory Chapters" className="border-t border-[#f6f1ea]/15 pt-12 space-y-12">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono-tech text-[#ffb36b] tracking-widest uppercase">
              INBOUND GEODESIC LOGBOOK · SIX RELATIVISTIC CHAPTERS
            </h2>
            <span className="text-xs font-mono-tech text-[#f6f1ea]/40">r = 38.0 → 1.0 Rs</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CHAPTERS.map((ch) => {
              const z = computeGravitationalRedshift(ch.rEnd);
              const gamma = computeTimeDilation(ch.rEnd);

              return (
                <article
                  key={ch.id}
                  className="bg-black border border-[#f6f1ea]/15 p-6 space-y-3 hover:border-[#ffb36b]/40 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-mono-tech text-[#ffb36b]">
                    <span>CHAPTER {ch.numberLabel}</span>
                    <span>r = {ch.rEnd.toFixed(2)} Rs</span>
                  </div>

                  <h3 className="text-xl font-medium tracking-tight text-[#f6f1ea]">
                    {ch.title}
                  </h3>

                  <div className="text-[11px] font-mono-tech text-[#f6f1ea]/50 uppercase tracking-wider">
                    {ch.subtitle}
                  </div>

                  <p className="text-xs text-[#f6f1ea]/80 leading-relaxed">
                    {ch.copy}
                  </p>

                  <div className="pt-3 border-t border-[#f6f1ea]/10 flex items-center justify-between text-[11px] font-mono-tech text-[#f6f1ea]/60">
                    <span>Redshift: z = {z.toFixed(3)}</span>
                    <span className="text-[#ffb36b]">Dilation: γ = {gamma.toFixed(2)}×</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Anatomical Structure Summary */}
        <section aria-label="Relativistic Structures" className="border-t border-[#f6f1ea]/15 pt-12 space-y-6">
          <h2 className="text-xs font-mono-tech text-[#ffb36b] tracking-widest uppercase">
            PRIMARY RELATIVISTIC BOUNDARIES & SIGNATURES
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono-tech">
            <div className="border border-[#f6f1ea]/15 p-4 bg-black">
              <div className="text-[#ffb36b] mb-1">EVENT HORIZON</div>
              <div className="text-sm font-semibold text-[#f6f1ea]">r = 1.00 Rs</div>
              <div className="text-[11px] text-[#f6f1ea]/60 mt-1">Schwarzschild boundary · infinite redshift</div>
            </div>

            <div className="border border-[#f6f1ea]/15 p-4 bg-black">
              <div className="text-[#ffb36b] mb-1">PHOTON SPHERE</div>
              <div className="text-sm font-semibold text-[#f6f1ea]">r = 1.50 Rs</div>
              <div className="text-[11px] text-[#f6f1ea]/60 mt-1">Unstable circular photon orbits · light trap</div>
            </div>

            <div className="border border-[#f6f1ea]/15 p-4 bg-black">
              <div className="text-[#ffb36b] mb-1">ISCO BOUNDARY</div>
              <div className="text-sm font-semibold text-[#f6f1ea]">r = 3.00 Rs</div>
              <div className="text-[11px] text-[#f6f1ea]/60 mt-1">Innermost stable circular matter orbit</div>
            </div>

            <div className="border border-[#f6f1ea]/15 p-4 bg-black">
              <div className="text-[#ffb36b] mb-1">DOPPLER BEAMING</div>
              <div className="text-sm font-semibold text-[#f6f1ea]">δ³ Intensification</div>
              <div className="text-[11px] text-[#f6f1ea]/60 mt-1">Approaching plasma blueshifts to ~10⁷ K</div>
            </div>
          </div>
        </section>

        {/* Static Observation Request Form */}
        <section aria-label="Request Observation Window" className="border-t border-[#f6f1ea]/15 pt-12 max-w-xl">
          <h2 className="text-xs font-mono-tech text-[#ffb36b] tracking-widest uppercase mb-2">
            TELEMETRY FEED & EPHEMERIS ALLOCATION
          </h2>
          <h3 className="text-2xl font-medium tracking-tight text-[#f6f1ea] mb-4">
            Request Observation Window
          </h3>
          <p className="text-xs text-[#f6f1ea]/70 mb-6 leading-relaxed">
            Submit observer credentials to book an orbital telemetry beam during the next polar alignment window.
          </p>

          <ObservationForm />
        </section>
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto border-t border-[#f6f1ea]/15 pt-8 mt-16 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-tech text-[#f6f1ea]/50">
        <div>PERIGEE DEEP SPACE OBSERVATORY · ORBITAL TELEMETRY ARRAY</div>
        <div>NO COPYRIGHT · PUBLIC DOMAIN ASTROPHYSICS SPEC</div>
      </footer>
    </div>
  );
};
]]>
    </file>
    <file path="src/app/(perigee)/perigee/forms/observation.ts">
<![CDATA[export const TARGET_BANDS = [
  "Optical Geodesic",
  "X-Ray Accretion",
  "Gravitational Wave",
] as const;

export type TargetBandOption = (typeof TARGET_BANDS)[number];

export interface ObservationFormInput {
  observerName: string;
  institutionEmail: string;
  targetBand: TargetBandOption;
  inclinationAngle: string;
  note?: string;
}

export type ObservationFormField = keyof ObservationFormInput;

export interface ValidatedObservationRecord {
  observerName: string;
  institutionEmail: string;
  targetBand: TargetBandOption;
  inclinationAngle: number;
  note: string;
  timestampIso: string;
}

export type ObservationFormResult =
  | { ok: true; value: ValidatedObservationRecord }
  | { ok: false; errors: Partial<Record<ObservationFormField, string>> };

export function validateObservationForm(input: ObservationFormInput): ObservationFormResult {
  const errors: Partial<Record<ObservationFormField, string>> = {};

  const name = input.observerName.trim();
  if (!name) {
    errors.observerName = "Observer Name is required to allocate an ephemeris slot.";
  }

  const email = input.institutionEmail.trim();
  if (!email || !email.includes("@")) {
    errors.institutionEmail = "Valid Institution / Email address is required.";
  }

  const angleNum = Number.parseFloat(input.inclinationAngle);
  if (Number.isNaN(angleNum) || angleNum < 0 || angleNum > 90) {
    errors.inclinationAngle = "Inclination Angle must be between 0.0° and 90.0°.";
  }

  if (!TARGET_BANDS.includes(input.targetBand)) {
    errors.targetBand = "Valid target observation band must be selected.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    value: {
      observerName: name,
      institutionEmail: email,
      targetBand: input.targetBand,
      inclinationAngle: angleNum,
      note: (input.note ?? "").trim(),
      timestampIso: new Date().toISOString().slice(11, 19) + " UTC",
    },
  };
}
]]>
    </file>
    <file path="src/app/(perigee)/perigee/forms/ObservationForm.tsx">
<![CDATA["use client";

import React, { useState } from "react";
import {
  TARGET_BANDS,
  validateObservationForm,
  type TargetBandOption,
  type ValidatedObservationRecord,
} from "./observation";

interface ObservationFormProps {
  onSuccess?: (record: ValidatedObservationRecord) => void;
  className?: string;
}

export const ObservationForm: React.FC<ObservationFormProps> = ({
  onSuccess,
  className = "",
}) => {
  const [observerName, setObserverName] = useState("");
  const [institutionEmail, setInstitutionEmail] = useState("");
  const [targetBand, setTargetBand] = useState<TargetBandOption>("Optical Geodesic");
  const [inclinationAngle, setInclinationAngle] = useState("81.4");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [lockedSubmission, setLockedSubmission] = useState<ValidatedObservationRecord | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateObservationForm({
      observerName,
      institutionEmail,
      targetBand,
      inclinationAngle,
      note,
    });

    if (!result.ok) {
      setErrors(result.errors as Record<string, string>);
      return;
    }

    setErrors({});
    setLockedSubmission(result.value);
    onSuccess?.(result.value);
  };

  if (lockedSubmission) {
    return (
      <div data-testid="ephemeris-locked-fallback" className="space-y-4 py-2 text-xs font-mono-tech">
        <div className="p-3.5 border border-[#ffb36b]/45 bg-[#ffb36b]/10">
          <div className="text-[#ffb36b] uppercase tracking-wider">
            ● Ephemeris locked. Telemetry stream active.
          </div>
          <p className="text-[#f6f1ea]/80 mt-1.5 leading-relaxed">
            Collimated polar jet relay aligned for{" "}
            <span className="text-[#f6f1ea] font-medium">{lockedSubmission.observerName}</span> (
            {lockedSubmission.institutionEmail}).
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-b border-[#f6f1ea]/15 py-3">
          <div>
            <div className="text-[#f6f1ea]/50">TARGET BAND</div>
            <div className="text-[#e6f0ff] mt-0.5">{lockedSubmission.targetBand}</div>
          </div>
          <div>
            <div className="text-[#f6f1ea]/50">INCLINATION</div>
            <div className="text-[#f6f1ea] mt-0.5">{lockedSubmission.inclinationAngle.toFixed(1)}°</div>
          </div>
          <div>
            <div className="text-[#f6f1ea]/50">LOCK EPOCH</div>
            <div className="text-[#f6f1ea] mt-0.5">{lockedSubmission.timestampIso}</div>
          </div>
          <div>
            <div className="text-[#f6f1ea]/50">POLAR FLUX</div>
            <div className="text-[#ffb36b] mt-0.5">1.42 × 10⁴³ erg/s</div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setLockedSubmission(null)}
          className="px-4 py-2 border border-[#f6f1ea]/20 text-[#f6f1ea]/80 hover:text-[#f6f1ea] hover:border-[#f6f1ea]/40 transition-colors cursor-pointer"
        >
          Modify Ephemeris Parameters
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={`space-y-4 text-xs font-mono-tech ${className}`}>
      <div>
        <label htmlFor="static-observer-name" className="block text-[#f6f1ea]/70 mb-1">
          OBSERVER NAME
        </label>
        <input
          id="static-observer-name"
          name="observerName"
          type="text"
          value={observerName}
          onChange={(e) => {
            setObserverName(e.target.value);
            if (errors.observerName) setErrors((prev) => ({ ...prev, observerName: "" }));
          }}
          placeholder="Dr. K. Thorne"
          className="w-full bg-black border border-[#f6f1ea]/20 px-3 py-2 text-[#f6f1ea] focus:border-[#ffb36b] outline-none"
        />
        {errors.observerName && (
          <p className="text-[#ff8a3d] text-[11px] mt-1">{errors.observerName}</p>
        )}
      </div>

      <div>
        <label htmlFor="static-observer-email" className="block text-[#f6f1ea]/70 mb-1">
          INSTITUTION / EMAIL
        </label>
        <input
          id="static-observer-email"
          name="institutionEmail"
          type="email"
          value={institutionEmail}
          onChange={(e) => {
            setInstitutionEmail(e.target.value);
            if (errors.institutionEmail) setErrors((prev) => ({ ...prev, institutionEmail: "" }));
          }}
          placeholder="observer@caltech.edu"
          className="w-full bg-black border border-[#f6f1ea]/20 px-3 py-2 text-[#f6f1ea] focus:border-[#ffb36b] outline-none"
        />
        {errors.institutionEmail && (
          <p className="text-[#ff8a3d] text-[11px] mt-1">{errors.institutionEmail}</p>
        )}
      </div>

      <div>
        <label htmlFor="static-target-band" className="block text-[#f6f1ea]/70 mb-1">
          TARGET BAND
        </label>
        <select
          id="static-target-band"
          name="targetBand"
          value={targetBand}
          onChange={(e) => setTargetBand(e.target.value as TargetBandOption)}
          className="w-full bg-black border border-[#f6f1ea]/20 px-3 py-2 text-[#f6f1ea] focus:border-[#ffb36b] outline-none"
        >
          {TARGET_BANDS.map((band) => (
            <option key={band} value={band} className="bg-black text-[#f6f1ea]">
              {band}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="static-inclination-angle" className="block text-[#f6f1ea]/70 mb-1">
          INCLINATION ANGLE (DEGREES, 0.0 - 90.0)
        </label>
        <input
          id="static-inclination-angle"
          name="inclinationAngle"
          type="text"
          value={inclinationAngle}
          onChange={(e) => {
            setInclinationAngle(e.target.value);
            if (errors.inclinationAngle) setErrors((prev) => ({ ...prev, inclinationAngle: "" }));
          }}
          className="w-full bg-black border border-[#f6f1ea]/20 px-3 py-2 text-[#f6f1ea] focus:border-[#ffb36b] outline-none"
        />
        {errors.inclinationAngle && (
          <p className="text-[#ff8a3d] text-[11px] mt-1">{errors.inclinationAngle}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full py-2.5 bg-[#f6f1ea] text-black font-semibold uppercase tracking-wider hover:bg-[#ffb36b] transition-colors cursor-pointer"
      >
        Allocate Ephemeris Slot
      </button>
    </form>
  );
};
]]>
    </file>
    <file path="src/app/(perigee)/perigee/physics/geodesicMath.ts">
<![CDATA[export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

export interface CameraRigState {
  r: number;
  opticalR: number;
  pitch: number;
  yaw: number;
  camPos: Vec3;
  camTarget: Vec3;
  roll: number;
  fov: number;
  screenOffset: [number, number];
  lensingMass: number;
  dopplerBoost: number;
  diskOpacity: number;
  jetIntensity: number;
  chapterIndex: number; // 0..5
  chapterProgress: number; // 0..1 within current chapter
}

export interface ChapterSpec {
  id: number;
  numberLabel: string;
  title: string;
  subtitle: string;
  headline?: string;
  copy: string;
  rStart: number;
  rEnd: number;
  pitchStart: number;
  pitchEnd: number;
  yawStart: number;
  yawEnd: number;
  rollStart: number;
  rollEnd: number;
  fovStart: number;
  fovEnd: number;
  offsetStart: [number, number];
  offsetEnd: [number, number];
  dopplerStart: number;
  dopplerEnd: number;
  jetStart: number;
  jetEnd: number;
  inspectable: boolean;
  restProgress: number; // normalized [0..1] scroll rest anchor for this chapter
}

export const CHAPTERS: ChapterSpec[] = [
  {
    id: 1,
    numberLabel: '01',
    title: 'The Shadow',
    subtitle: 'ORBITAL ESTABLISHER · r = 38.0 → 24.0 Rs',
    headline: 'PERIGEE',
    copy: 'Light does not travel in straight lines.',
    rStart: 38.0,
    rEnd: 24.0,
    pitchStart: 0.14,
    pitchEnd: 0.11,
    yawStart: 0.0,
    yawEnd: 0.45,
    rollStart: -0.15,
    rollEnd: -0.12,
    fovStart: 1.7,
    fovEnd: 1.7,
    offsetStart: [0.0, 0.0],
    offsetEnd: [0.0, 0.0],
    dopplerStart: 0.6,
    dopplerEnd: 0.65,
    jetStart: 0.0,
    jetEnd: 0.0,
    inspectable: true,
    restProgress: 0.0,
  },
  {
    id: 2,
    numberLabel: '02',
    title: 'Accretion Plane',
    subtitle: 'KEPLERIAN SHEAR ZONE · r = 24.0 → 9.0 Rs',
    copy: 'Matter in terminal orbit. Superheated plasma shearing at forty percent the speed of light.',
    rStart: 24.0,
    rEnd: 9.0,
    pitchStart: 0.11,
    pitchEnd: 0.03,
    yawStart: 0.45,
    yawEnd: 1.15,
    rollStart: -0.12,
    rollEnd: -0.02,
    fovStart: 1.7,
    fovEnd: 1.55,
    offsetStart: [0.0, 0.0],
    offsetEnd: [0.0, 0.0],
    dopplerStart: 0.65,
    dopplerEnd: 0.78,
    jetStart: 0.0,
    jetEnd: 0.0,
    inspectable: false,
    restProgress: 0.2,
  },
  {
    id: 3,
    numberLabel: '03',
    title: 'Doppler Limb',
    subtitle: 'RELATIVISTIC BEAMING WING · r = 9.0 → 4.8 Rs',
    copy: 'Relativistic beaming. What approaches blinds; what recedes fades into infrared.',
    rStart: 9.0,
    rEnd: 4.8,
    pitchStart: 0.03,
    pitchEnd: 0.08,
    yawStart: 1.15,
    yawEnd: 1.85,
    rollStart: -0.02,
    rollEnd: -0.32,
    fovStart: 1.55,
    fovEnd: 1.42,
    offsetStart: [0.0, 0.0],
    offsetEnd: [0.0, 0.0],
    dopplerStart: 0.78,
    dopplerEnd: 1.15,
    jetStart: 0.0,
    jetEnd: 0.0,
    inspectable: true,
    restProgress: 0.4,
  },
  {
    id: 4,
    numberLabel: '04',
    title: 'The Photon Sphere',
    subtitle: 'UNSTABLE LIGHT TRAP · r = 4.8 → 1.65 Rs',
    copy: 'The photon sphere. Where gravity traps light in a closed circular mirror.',
    rStart: 4.8,
    rEnd: 1.65,
    pitchStart: 0.08,
    pitchEnd: 0.05,
    yawStart: 1.85,
    yawEnd: 2.55,
    rollStart: -0.32,
    rollEnd: -0.08,
    fovStart: 1.42,
    fovEnd: 1.15,
    offsetStart: [0.0, 0.0],
    offsetEnd: [0.0, 0.0],
    dopplerStart: 1.15,
    dopplerEnd: 0.75,
    jetStart: 0.0,
    jetEnd: 0.0,
    inspectable: false,
    restProgress: 0.6,
  },
  {
    id: 5,
    numberLabel: '05',
    title: 'Innermost Stable Orbit',
    subtitle: 'EXTREME TIME DILATION · r = 1.65 → 1.18 Rs',
    copy: 'Beyond the ISCO boundary, no circular orbit survives. External starlight accelerates while local clocks freeze.',
    rStart: 1.65,
    rEnd: 1.18,
    pitchStart: 0.05,
    pitchEnd: 0.12,
    yawStart: 2.55,
    yawEnd: 3.25,
    rollStart: -0.08,
    rollEnd: 0.0,
    fovStart: 1.15,
    fovEnd: 1.05,
    offsetStart: [0.0, 0.0],
    offsetEnd: [0.0, 0.0],
    dopplerStart: 0.75,
    dopplerEnd: 0.65,
    jetStart: 0.0,
    jetEnd: 0.15,
    inspectable: true,
    restProgress: 0.8,
  },
  {
    id: 6,
    numberLabel: '06',
    title: 'Polar Escape',
    subtitle: 'NORTH MAGNETIC AXIS · r = 1.18 → 18.0 Rs',
    copy: 'Ascending the rotational pole as a collimated relativistic jet ignites along the magnetic spine.',
    rStart: 1.18,
    rEnd: 18.0,
    pitchStart: 0.12,
    pitchEnd: 1.42,
    yawStart: 3.25,
    yawEnd: 4.1,
    rollStart: 0.0,
    rollEnd: 0.08,
    fovStart: 1.05,
    fovEnd: 1.65,
    offsetStart: [0.0, 0.0],
    offsetEnd: [0.0, 0.0],
    dopplerStart: 0.65,
    dopplerEnd: 0.6,
    jetStart: 0.15,
    jetEnd: 1.0,
    inspectable: false,
    restProgress: 1.0,
  },
];

export function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1), 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * Computes gravitational redshift z = 1 / sqrt(1 - 1/r) - 1
 * where r is in Schwarzschild radii (Rs = 2GM/c^2 = 1.0 in shader units).
 */
export function computeGravitationalRedshift(rInRs: number): number {
  const safeR = Math.max(rInRs, 1.005);
  return 1 / Math.sqrt(1 - 1 / safeR) - 1;
}

/**
 * Computes local gravitational time dilation factor gamma = dt_infinity / d_tau = 1 / sqrt(1 - 1/r)
 */
export function computeTimeDilation(rInRs: number): number {
  const safeR = Math.max(rInRs, 1.005);
  return 1 / Math.sqrt(1 - 1 / safeR);
}

/**
 * Converts spherical camera coordinates (r, pitch, yaw) to Cartesian world position
 */
export function sphericalToCartesian(r: number, pitch: number, yaw: number): Vec3 {
  const cp = Math.cos(pitch);
  return {
    x: Math.sin(yaw) * cp * r,
    y: Math.sin(pitch) * r,
    z: Math.cos(yaw) * cp * r,
  };
}

/**
 * Deterministically computes the camera rig and shader uniform state for any scroll progress [0..1].
 * Progress 0.0 corresponds to Chapter 1 start (r = 38 Rs),
 * and each of the 6 chapters occupies 1/5th of the transitions or segments.
 * Specifically, we map scrollProgress [0..1] across the 6 chapters so that:
 * - At restProgress 0.0 -> Ch 1
 * - At restProgress 0.2 -> Ch 2
 * - At restProgress 0.4 -> Ch 3
 * - At restProgress 0.6 -> Ch 4
 * - At restProgress 0.8 -> Ch 5
 * - At restProgress 1.0 -> Ch 6
 */
export function interpolateTimelineState(scrollProgress: number, ambientYawOffset = 0): CameraRigState {
  const p = clamp(scrollProgress, 0, 1);

  // Map p [0..1] into 6 chapter segments [0..6]
  // Using 5 transitions between 6 chapter rest states, or 6 continuous chapter intervals.
  // Let's make each chapter span 1/6 of scroll or define keyframes at 0, 0.2, 0.4, 0.6, 0.8, 1.0
  // so that at each chapter rest point, the camera is at the exact signature pose of that chapter!
  const keyframes = [
    {
      // Ch 1: THE SHADOW (r = 38.0 Rs, dead-center singularity)
      r: 38.0,
      opticalR: 28.0,
      pitch: 0.13,
      yaw: 0.1,
      roll: -0.15,
      fov: 1.7,
      offset: [0.0, 0.0] as [number, number],
      doppler: 0.6,
      jet: 0.0,
      target: { x: 0, y: 0, z: 0 },
    },
    {
      // Ch 2: ACCRETION PLANE (r = 12.5 Rs, dead-center singularity)
      r: 12.5,
      opticalR: 16.5,
      pitch: 0.04,
      yaw: 0.85,
      roll: -0.02,
      fov: 1.55,
      offset: [0.0, 0.0] as [number, number],
      doppler: 0.72,
      jet: 0.0,
      target: { x: 0, y: 0, z: 0 },
    },
    {
      // Ch 3: DOPPLER LIMB (r = 5.6 Rs, dead-center singularity with relativistic banking)
      r: 5.6,
      opticalR: 12.8,
      pitch: 0.07,
      yaw: 1.65,
      roll: -0.32,
      fov: 1.42,
      offset: [0.0, 0.0] as [number, number],
      doppler: 1.15,
      jet: 0.0,
      target: { x: 0, y: 0, z: 0 },
    },
    {
      // Ch 4: THE PHOTON SPHERE (r = 1.65 Rs, full 360° photon ring centered)
      r: 1.65,
      opticalR: 10.6,
      pitch: 0.06,
      yaw: 2.4,
      roll: -0.06,
      fov: 1.25,
      offset: [0.0, 0.0] as [number, number],
      doppler: 0.78,
      jet: 0.0,
      target: { x: 0, y: 0, z: 0 },
    },
    {
      // Ch 5: INNERMOST STABLE ORBIT (r = 1.18 Rs, centered close-up of Horizon, Photon Sphere & ISCO)
      r: 1.18,
      opticalR: 9.2,
      pitch: 0.14,
      yaw: 3.15,
      roll: -0.11,
      fov: 1.18,
      offset: [0.0, 0.0] as [number, number],
      doppler: 0.88,
      jet: 0.16,
      target: { x: 0, y: 0, z: 0 },
    },
    {
      // Ch 6: POLAR ESCAPE (r = 18.0 Rs, pitch = 1.42 rad north polar ascent, jet = 1.0, centered)
      r: 18.0,
      opticalR: 18.0,
      pitch: 1.42,
      yaw: 4.0,
      roll: 0.06,
      fov: 1.65,
      offset: [0.0, 0.0] as [number, number],
      doppler: 0.6,
      jet: 1.0,
      target: { x: 0, y: 0, z: 0 },
    },
  ];

  const scaled = p * 5; // 0..5
  const segIdx = Math.min(Math.floor(scaled), 4);
  const localT = smoothstep(0, 1, scaled - segIdx);

  const k0 = keyframes[segIdx];
  const k1 = keyframes[segIdx + 1];

  const r = lerp(k0.r, k1.r, localT);
  const opticalR = lerp(k0.opticalR, k1.opticalR, localT);
  const pitch = lerp(k0.pitch, k1.pitch, localT);
  const yaw = lerp(k0.yaw, k1.yaw, localT) + ambientYawOffset;
  const roll = lerp(k0.roll, k1.roll, localT);
  const fov = lerp(k0.fov, k1.fov, localT);
  const screenOffset: [number, number] = [
    lerp(k0.offset[0], k1.offset[0], localT),
    lerp(k0.offset[1], k1.offset[1], localT),
  ];
  const dopplerBoost = lerp(k0.doppler, k1.doppler, localT);
  const jetIntensity = lerp(k0.jet, k1.jet, localT);

  const camPos = sphericalToCartesian(opticalR, pitch, yaw);
  const camTarget = {
    x: lerp(k0.target.x, k1.target.x, localT),
    y: lerp(k0.target.y, k1.target.y, localT),
    z: lerp(k0.target.z, k1.target.z, localT),
  };

  const chapterIndex = Math.min(Math.round(p * 5), 5);
  const chapterProgress = clamp(1 - Math.abs(p * 5 - chapterIndex), 0, 1);

  return {
    r,
    opticalR,
    pitch,
    yaw,
    camPos,
    camTarget,
    roll,
    fov,
    screenOffset,
    lensingMass: 1.5,
    dopplerBoost,
    diskOpacity: 1.0,
    jetIntensity,
    chapterIndex,
    chapterProgress,
  };
}

/**
 * Integrates a test photon trajectory through the exact same Schwarzschild potential
 * used inside the fragment shader: a = -uLensingMass * h^2 * r / |r|^5
 */
export function computeGeodesicTrajectory(
  startPos: Vec3,
  initialDir: Vec3,
  lensingMass = 1.5,
  maxSteps = 220
): {
  points: Vec3[];
  outcome: 'CAPTURED' | 'SLINGSHOT' | 'DEFLECTED';
  minRadius: number;
  impactParameterB: number;
} {
  const points: Vec3[] = [{ ...startPos }];
  let pos = { ...startPos };
  const dLen = Math.hypot(initialDir.x, initialDir.y, initialDir.z) || 1;
  let vel = { x: initialDir.x / dLen, y: initialDir.y / dLen, z: initialDir.z / dLen };

  // Specific angular momentum squared: h^2 = |pos x vel|^2
  const hx = pos.y * vel.z - pos.z * vel.y;
  const hy = pos.z * vel.x - pos.x * vel.z;
  const hz = pos.x * vel.y - pos.y * vel.x;
  const h2 = hx * hx + hy * hy + hz * hz;
  const impactParameterB = Math.sqrt(h2);

  let minRadius = Infinity;
  let captured = false;

  for (let i = 0; i < maxSteps; i++) {
    const r2 = pos.x * pos.x + pos.y * pos.y + pos.z * pos.z;
    const rl = Math.sqrt(r2);
    if (rl < minRadius) minRadius = rl;

    if (rl <= 1.02) {
      captured = true;
      break;
    }
    if (rl > 55.0) break;

    const dt = Math.min(Math.max(0.07 * rl, 0.02), 0.7);
    const factor = (-lensingMass * h2) / Math.pow(r2, 2.5);

    vel = {
      x: vel.x + factor * pos.x * dt,
      y: vel.y + factor * pos.y * dt,
      z: vel.z + factor * pos.z * dt,
    };
    pos = {
      x: pos.x + vel.x * dt,
      y: pos.y + vel.y * dt,
      z: pos.z + vel.z * dt,
    };
    points.push({ ...pos });
  }

  const outcome = captured
    ? 'CAPTURED'
    : minRadius < 2.95
    ? 'SLINGSHOT'
    : 'DEFLECTED';

  return { points, outcome, minRadius, impactParameterB };
}

/**
 * Projects a 3D world point (in Rs units) onto 2D normalized viewport coordinates [0..1]
 * matching the exact GLSL camera basis in BLACK_HOLE_FRAGMENT_SHADER.
 */
export function projectWorldToScreen(
  worldPt: Vec3,
  rig: CameraRigState,
  aspect: number
): { x: number; y: number; visible: boolean; depth: number } {
  const dx = rig.camTarget.x - rig.camPos.x;
  const dy = rig.camTarget.y - rig.camPos.y;
  const dz = rig.camTarget.z - rig.camPos.z;
  const fLen = Math.hypot(dx, dy, dz) || 1;
  const fw = { x: dx / fLen, y: dy / fLen, z: dz / fLen };

  const worldUp = Math.abs(fw.y) > 0.99 ? { x: 0, y: 0, z: 1 } : { x: 0, y: 1, z: 0 };
  const rx = worldUp.y * fw.z - worldUp.z * fw.y;
  const ry = worldUp.z * fw.x - worldUp.x * fw.z;
  const rz = worldUp.x * fw.y - worldUp.y * fw.x;
  const rLen = Math.hypot(rx, ry, rz) || 1;
  const rt = { x: rx / rLen, y: ry / rLen, z: rz / rLen };

  const up = {
    x: fw.y * rt.z - fw.z * rt.y,
    y: fw.z * rt.x - fw.x * rt.z,
    z: fw.x * rt.y - fw.y * rt.x,
  };

  const c = Math.cos(rig.roll);
  const s = Math.sin(rig.roll);
  const rt2 = { x: rt.x * c + up.x * s, y: rt.y * c + up.y * s, z: rt.z * c + up.z * s };
  const up2 = { x: up.x * c - rt.x * s, y: up.y * c - rt.y * s, z: up.z * c - rt.z * s };

  const vx = worldPt.x - rig.camPos.x;
  const vy = worldPt.y - rig.camPos.y;
  const vz = worldPt.z - rig.camPos.z;

  const zCam = vx * fw.x + vy * fw.y + vz * fw.z;
  if (zCam <= 0.1) return { x: 0.5, y: 0.5, visible: false, depth: zCam };

  const xCam = vx * rt2.x + vy * rt2.y + vz * rt2.z;
  const yCam = vx * up2.x + vy * up2.y + vz * up2.z;

  const uvX = (xCam / zCam) * rig.fov + rig.screenOffset[0];
  const uvY = (yCam / zCam) * rig.fov + rig.screenOffset[1];

  const screenX = 0.5 + uvX / aspect;
  const screenY = 0.5 - uvY; // top-down CSS coordinates

  return {
    x: screenX,
    y: screenY,
    visible: screenX >= 0.02 && screenX <= 0.98 && screenY >= 0.02 && screenY <= 0.98,
    depth: zCam,
  };
}

/**
 * Converts normalized screen coordinates (0..1) and drag vector into a 3D launch ray
 * aligned with the camera basis in BLACK_HOLE_FRAGMENT_SHADER.
 */
export function screenDragToLaunchRay(
  startScreenX: number,
  startScreenY: number,
  dragDxNormalized: number,
  dragDyNormalized: number,
  rig: CameraRigState,
  aspect: number
): { launchOrigin: Vec3; launchDir: Vec3; impactParameterB: number } {
  const dx = rig.camTarget.x - rig.camPos.x;
  const dy = rig.camTarget.y - rig.camPos.y;
  const dz = rig.camTarget.z - rig.camPos.z;
  const fLen = Math.hypot(dx, dy, dz) || 1;
  const fw = { x: dx / fLen, y: dy / fLen, z: dz / fLen };

  const worldUp = Math.abs(fw.y) > 0.99 ? { x: 0, y: 0, z: 1 } : { x: 0, y: 1, z: 0 };
  const rx = worldUp.y * fw.z - worldUp.z * fw.y;
  const ry = worldUp.z * fw.x - worldUp.x * fw.z;
  const rz = worldUp.x * fw.y - worldUp.y * fw.x;
  const rLen = Math.hypot(rx, ry, rz) || 1;
  const rt = { x: rx / rLen, y: ry / rLen, z: rz / rLen };

  const up = {
    x: fw.y * rt.z - fw.z * rt.y,
    y: fw.z * rt.x - fw.x * rt.z,
    z: fw.x * rt.y - fw.y * rt.x,
  };

  const c = Math.cos(rig.roll);
  const s = Math.sin(rig.roll);
  const rt2 = { x: rt.x * c + up.x * s, y: rt.y * c + up.y * s, z: rt.z * c + up.z * s };
  const up2 = { x: up.x * c - rt.x * s, y: up.y * c - rt.y * s, z: up.z * c - rt.z * s };

  // Convert screen point + pullback vector into ray direction
  const aimX = clamp(startScreenX - dragDxNormalized * 1.4, 0.05, 0.95);
  const aimY = clamp(startScreenY - dragDyNormalized * 1.4, 0.05, 0.95);

  const uvX = (aimX - 0.5) * aspect - rig.screenOffset[0];
  const uvY = 0.5 - aimY - rig.screenOffset[1];

  const rdx = fw.x * rig.fov + rt2.x * uvX + up2.x * uvY;
  const rdy = fw.y * rig.fov + rt2.y * uvX + up2.y * uvY;
  const rdz = fw.z * rig.fov + rt2.z * uvX + up2.z * uvY;
  const rdLen = Math.hypot(rdx, rdy, rdz) || 1;

  const launchDir = {
    x: rdx / rdLen,
    y: rdy / rdLen,
    z: rdz / rdLen,
  };

  // Start slightly ahead of camera so the ribbon is immediately visible in front of the lens
  const launchOrigin = {
    x: rig.camPos.x + fw.x * 0.35 + rt2.x * ((startScreenX - 0.5) * 0.4),
    y: rig.camPos.y + fw.y * 0.35 + up2.y * ((0.5 - startScreenY) * 0.4),
    z: rig.camPos.z + fw.z * 0.35,
  };

  const hx = launchOrigin.y * launchDir.z - launchOrigin.z * launchDir.y;
  const hy = launchOrigin.z * launchDir.x - launchOrigin.x * launchDir.z;
  const hz = launchOrigin.x * launchDir.y - launchOrigin.y * launchDir.x;
  const impactParameterB = Math.hypot(hx, hy, hz);

  return { launchOrigin, launchDir, impactParameterB };
}

/**
 * Pure state machine helper for Hold-to-Inspect Singularity Lensing Mode
 */
export interface HoldInspectState {
  isHolding: boolean;
  isLocked: boolean;
  holdProgress: number; // 0..1 over 350ms
  yawDelta: number;
  pitchDelta: number;
  lensingMass: number; // 0.3..2.8 (default 1.5)
  diskOpacity: number; // 0.15..1.0 (default 1.0)
}

export function computeInspectParametersFromDrag(
  normDx: number, // -1..1 horizontal drag across viewport
  normDy: number, // -1..1 vertical drag across viewport
  basePitch: number
): {
  yawDelta: number;
  targetPitch: number;
  lensingMass: number;
  diskOpacity: number;
} {
  const yawDelta = normDx * Math.PI * 0.85;
  const lensingMass = clamp(1.5 + normDx * 1.3, 0.3, 2.8);
  const targetPitch = clamp(basePitch + normDy * 0.85, -0.8, 0.8);
  const verticalMagnitude = clamp(Math.abs(normDy) * 1.6, 0, 1);
  const diskOpacity = lerp(1.0, 0.15, verticalMagnitude);

  return {
    yawDelta,
    targetPitch,
    lensingMass,
    diskOpacity,
  };
}

export interface AnatomicalPin3D {
  id: string;
  label: string;
  metric: string;
  worldPos: Vec3;
}

/**
 * Returns the 6 anatomical 3D pins for Hold-to-Inspect Singularity Lensing Mode
 * and the 4 architectural callout labels for Chapter 5 (Innermost Stable Orbit).
 */
export function getInspectAnatomicalPins(rig: CameraRigState): AnatomicalPin3D[] {
  const dx = -rig.camPos.x;
  const dy = -rig.camPos.y;
  const dz = -rig.camPos.z;
  const fLen = Math.hypot(dx, dy, dz) || 1;
  const fw = { x: dx / fLen, y: dy / fLen, z: dz / fLen };
  const worldUp = Math.abs(fw.y) > 0.99 ? { x: 0, y: 0, z: 1 } : { x: 0, y: 1, z: 0 };
  const rx = worldUp.y * fw.z - worldUp.z * fw.y;
  const ry = worldUp.z * fw.x - worldUp.x * fw.z;
  const rz = worldUp.x * fw.y - worldUp.y * fw.x;
  const rLen = Math.hypot(rx, ry, rz) || 1;
  const rt = { x: rx / rLen, y: ry / rLen, z: rz / rLen };

  // Scale radial offsets gently with camera distance so pins never bunch together at r = 38 Rs or clip off-screen at r = 1.2 Rs
  const scale = clamp((rig.opticalR || rig.r) / 20.0, 0.32, 1.45);

  return [
    {
      id: 'zenith-arch',
      label: 'Warped Zenith Arch',
      metric: 'Δθ = 180° Lensed',
      worldPos: { x: -rt.x * 0.6 * scale, y: 3.3 * scale, z: -rt.z * 0.6 * scale },
    },
    {
      id: 'photon-ring',
      label: 'Primary Photon Ring',
      metric: 'r = 1.50 Rs',
      worldPos: { x: rt.x * 2.5 * scale, y: 1.9 * scale, z: rt.z * 2.5 * scale },
    },
    {
      id: 'blue-wing',
      label: 'Approaching Blue-Shift Wing',
      metric: 'v ≈ +0.42c',
      worldPos: { x: -rt.x * 6.2 * scale, y: 0.35 * scale, z: -rt.z * 6.2 * scale },
    },
    {
      id: 'shadow',
      label: 'Schwarzschild Shadow',
      metric: 'r = 1.00 Rs',
      worldPos: { x: 0, y: 0.12 * scale, z: 0 },
    },
    {
      id: 'red-wing',
      label: 'Receding Red-Shift Wing',
      metric: 'v ≈ -0.42c',
      worldPos: { x: rt.x * 5.6 * scale, y: -0.35 * scale, z: rt.z * 5.6 * scale },
    },
    {
      id: 'isco-gap',
      label: 'Inner ISCO Gap',
      metric: 'r < 2.20 Rs',
      worldPos: { x: -rt.x * 2.4 * scale, y: -2.7 * scale, z: -rt.z * 2.4 * scale },
    },
  ];
}

export function getChapter5CalloutPins(rig: CameraRigState): AnatomicalPin3D[] {
  const dx = -rig.camPos.x;
  const dy = -rig.camPos.y;
  const dz = -rig.camPos.z;
  const fLen = Math.hypot(dx, dy, dz) || 1;
  const fw = { x: dx / fLen, y: dy / fLen, z: dz / fLen };
  const worldUp = Math.abs(fw.y) > 0.99 ? { x: 0, y: 0, z: 1 } : { x: 0, y: 1, z: 0 };
  const rx = worldUp.y * fw.z - worldUp.z * fw.y;
  const ry = worldUp.z * fw.x - worldUp.x * fw.z;
  const rz = worldUp.x * fw.y - worldUp.y * fw.x;
  const rLen = Math.hypot(rx, ry, rz) || 1;
  const rt = { x: rx / rLen, y: ry / rLen, z: rz / rLen };

  return [
    {
      id: 'ch5-secondary',
      label: 'Secondary Lensed Image',
      metric: 'n = 2 Einstein Ring',
      worldPos: { x: -rt.x * 2.15, y: 1.55, z: -rt.z * 2.15 },
    },
    {
      id: 'ch5-photon',
      label: 'Photon Sphere (1.5 Rs)',
      metric: 'b_crit = 2.60 Rs',
      worldPos: { x: rt.x * 2.55, y: 1.05, z: rt.z * 2.55 },
    },
    {
      id: 'ch5-horizon',
      label: 'Event Horizon (1.0 Rs)',
      metric: 'g₀₀ → 0.00',
      worldPos: { x: -rt.x * 0.45, y: -0.15, z: -rt.z * 0.45 },
    },
    {
      id: 'ch5-isco',
      label: 'ISCO Boundary (3.0 Rs)',
      metric: 'r_ms = 3.00 Rs',
      worldPos: { x: rt.x * 2.85, y: -1.65, z: rt.z * 2.85 },
    },
  ];
}
]]>
    </file>
    <file path="src/app/(perigee)/perigee/scroll/timeline.ts">
<![CDATA[import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { CHAPTERS, clamp } from '../physics/geodesicMath';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollControllerCallbacks {
  onProgress: (progress: number) => void;
  getIsLocked: () => boolean;
}

export interface ScrollControllerHandle {
  scrollToChapter: (chapterIndex: number) => void;
  stepChapter: (delta: number) => void;
  setLocked: (locked: boolean) => void;
  getProgress: () => number;
  destroy: () => void;
}

export function initMasterScrollTimeline(
  scrollContainerEl: HTMLElement,
  callbacks: ScrollControllerCallbacks
): ScrollControllerHandle {
  let currentProgress = 0;
  let isInspectLocked = false;
  let snapTimeout: number | null = null;

  const lenis = new Lenis({
    lerp: 0.09,
    smoothWheel: true,
    wheelMultiplier: 0.85,
  });

  const onLenisScroll = () => {
    ScrollTrigger.update();
  };

  lenis.on('scroll', onLenisScroll);

  const tickerFn = (time: number) => {
    if (!isInspectLocked && !callbacks.getIsLocked()) {
      lenis.raf(time * 1000);
    }
  };
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  const updateFromScroll = () => {
    const maxScroll = Math.max(1, scrollContainerEl.scrollHeight - window.innerHeight);
    const rawProgress = clamp(window.scrollY / maxScroll, 0, 1);
    currentProgress = rawProgress;
    callbacks.onProgress(currentProgress);

    // Debounced gentle chapter snap when scrolling settles
    if (snapTimeout !== null) {
      window.clearTimeout(snapTimeout);
    }
    snapTimeout = window.setTimeout(() => {
      if (isInspectLocked || callbacks.getIsLocked()) return;
      const nearestChapterIdx = Math.round(currentProgress * (CHAPTERS.length - 1));
      const targetProgress = nearestChapterIdx / (CHAPTERS.length - 1);
      if (Math.abs(currentProgress - targetProgress) > 0.012 && Math.abs(currentProgress - targetProgress) < 0.085) {
        const targetY = targetProgress * Math.max(1, scrollContainerEl.scrollHeight - window.innerHeight);
        lenis.scrollTo(targetY, { duration: 0.75 });
      }
    }, 320);
  };

  const st = ScrollTrigger.create({
    trigger: scrollContainerEl,
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      if (isInspectLocked || callbacks.getIsLocked()) return;
      currentProgress = clamp(self.progress, 0, 1);
      callbacks.onProgress(currentProgress);
    },
  });

  window.addEventListener('scroll', updateFromScroll, { passive: true });

  const scrollToChapter = (chapterIndex: number) => {
    if (isInspectLocked || callbacks.getIsLocked()) return;
    const clampedIdx = clamp(chapterIndex, 0, CHAPTERS.length - 1);
    const targetProgress = clampedIdx / (CHAPTERS.length - 1);
    const maxScroll = Math.max(1, scrollContainerEl.scrollHeight - window.innerHeight);
    const targetY = targetProgress * maxScroll;

    if (snapTimeout !== null) {
      window.clearTimeout(snapTimeout);
      snapTimeout = null;
    }

    currentProgress = targetProgress;
    callbacks.onProgress(currentProgress);
    lenis.scrollTo(targetY, { immediate: true });
    window.scrollTo({ top: targetY, behavior: 'auto' });
  };

  const stepChapter = (delta: number) => {
    if (isInspectLocked || callbacks.getIsLocked()) return;
    const activeIdx = Math.round(currentProgress * (CHAPTERS.length - 1));
    scrollToChapter(activeIdx + delta);
  };

  const setLocked = (locked: boolean) => {
    isInspectLocked = locked;
    if (locked) {
      lenis.stop();
    } else {
      lenis.start();
    }
  };

  return {
    scrollToChapter,
    stepChapter,
    setLocked,
    getProgress: () => currentProgress,
    destroy: () => {
      if (snapTimeout !== null) window.clearTimeout(snapTimeout);
      window.removeEventListener('scroll', updateFromScroll);
      st.kill();
      gsap.ticker.remove(tickerFn);
      lenis.destroy();
    },
  };
}
]]>
    </file>
    <file path="src/app/(perigee)/perigee/shader/blackHoleShader.ts">
<![CDATA[export const BLACK_HOLE_VERTEX_SHADER = `
  attribute vec3 position;
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

export const BLACK_HOLE_FRAGMENT_SHADER = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uCamPos;          // Camera world position in Rs units
uniform vec3 uCamTarget;       // Camera look-at target in Rs units
uniform float uRoll;           // Camera bank angle (radians)
uniform float uFov;            // Focal length multiplier (default 1.7)
uniform vec2 uScreenOffset;    // Viewport framing offset (e.g. vec2(0.18, 0.0) in Ch.1 -> vec2(0.0))
uniform float uLensingMass;    // Gravity multiplier (default 1.5; scrubbable 0.3..2.8 in Inspect mode)
uniform float uDopplerBoost;   // Relativistic beaming factor (default 0.6; boosts to 1.15 in Ch.3)
uniform float uDiskOpacity;    // Accretion disk density multiplier (default 1.0; dims to 0.15 in Inspect)
uniform float uJetIntensity;   // Polar relativistic jet emission (0.0 in Ch.1-5 -> 1.0 in Ch.6)
uniform vec3 uPulsePos;        // World-space XYZ of user-launched geodesic test photon
uniform float uPulseActive;    // 0.0 when inactive, 1.0 when flying
uniform sampler2D uSkyTex;     // Reference deep-space crimson & ice-blue star cluster texture
uniform float uSkyTexLoaded;   // 1.0 when texture is ready

float h21(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float n2(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n2(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}

vec2 mirrorUv(vec2 uv){
  vec2 f = fract(uv * 0.5) * 2.0;
  return 1.0 - abs(f - 1.0);
}

vec3 sampleSkyTexSeamless(vec3 d, float u, float v){
  // High-density spherical equirectangular projection with dual-offset seam crossfade
  vec2 uvA = mirrorUv(vec2(u * 3.2 + 0.15, v * 2.2 + 0.08));
  vec2 uvB = mirrorUv(vec2((u + 0.5) * 3.2 + 0.63, v * 2.2 + 0.41));
  float seamBlend = sin(u * 3.14159265);
  seamBlend = seamBlend * seamBlend;
  vec3 colEq = mix(texture2D(uSkyTex, uvB).rgb, texture2D(uSkyTex, uvA).rgb, seamBlend);

  // Polar cap blend to avoid pinching at |d.y| -> 1
  vec3 colPole = texture2D(uSkyTex, mirrorUv(d.xz * 1.8 + 0.37)).rgb;
  float poleWeight = smoothstep(0.72, 0.95, abs(d.y));
  return mix(colEq, colPole, poleWeight);
}

vec3 sky(vec3 d){
  float u = atan(d.z, d.x) / 6.2831853 + 0.5;
  float v = asin(clamp(d.y, -1.0, 1.0)) / 3.14159265 + 0.5;
  vec2 sp = vec2(u * 6.2831853 * 1.6, (v - 0.5) * 3.14159265 * 1.6);
  vec3 c = vec3(0.0);

  // 1. Sample the attached reference deep-space nebula & cluster image at crisp scale
  if(uSkyTexLoaded > 0.5){
    vec3 texCol = sampleSkyTexSeamless(d, u, v);
    // Preserve deep obsidian void while keeping crimson & icy-blue clusters vibrant
    texCol = pow(max(texCol, vec3(0.0)), vec3(1.35)) * 1.15;
    c += texCol;
  }

  // 2. Fine-scale domain-warped H-alpha crimson emission pockets & pale icy-blue cluster clouds
  vec2 warp = vec2(fbm(sp * 2.4 + vec2(1.2, 3.4)), fbm(sp * 2.4 + vec2(8.1, 2.7)));
  float nebCluster = fbm(sp * 3.2 + warp * 1.2);
  float redKnots = fbm(sp * 5.5 - warp * 1.1 + vec2(4.2, 1.9));
  float cyanClouds = fbm(sp * 4.4 + warp * 1.1 + vec2(9.4, 6.1));
  float darkVoidMask = smoothstep(0.36, 0.68, fbm(sp * 2.8 + vec2(2.3, 7.1)));

  // Scattered ruby / crimson H-alpha pockets
  float redMask = smoothstep(0.54, 0.80, redKnots) * smoothstep(0.38, 0.76, nebCluster);
  c += vec3(0.78, 0.12, 0.05) * pow(redMask, 1.7) * 0.46;
  float redCore = smoothstep(0.68, 0.88, redKnots) * redMask;
  c += vec3(0.96, 0.24, 0.10) * pow(redCore, 2.2) * 0.42;

  // Scattered icy cyan-white stellar dust clouds
  float cyanMask = smoothstep(0.52, 0.80, cyanClouds) * darkVoidMask;
  c += vec3(0.56, 0.76, 0.86) * pow(cyanMask, 1.75) * 0.36;

  // 3. Compact, tight stellar cores (small glowing cyan-white & ruby-orange knots with isotropic aspect)
  float cosLat = max(0.35, sqrt(max(0.0, 1.0 - d.y * d.y)));
  for(int m=0; m<2; m++){
    float bScale = m==0 ? 64.0 : 110.0;
    vec2 bg = vec2(u * bScale * 2.0 * cosLat, v * bScale);
    vec2 bid = floor(bg), bf = fract(bg) - 0.5;
    float bh = h21(bid + float(m)*19.7);
    vec2 bo = (vec2(h21(bid + 5.1), h21(bid + 13.3)) - 0.5) * 0.68;
    float dist = length(bf - bo);
    float coreGlow = exp(-dist * dist * 48.0) * step(0.89, bh);
    float isRedKnot = step(0.50, h21(bid + 29.1));
    vec3 knotCol = mix(vec3(0.78, 0.93, 1.0), vec3(0.95, 0.22, 0.10), isRedKnot);
    c += knotCol * coreGlow * 0.42;
  }

  // 4. Crisp multi-scale pinpoint stardust field concentrated inside nebula clusters
  for(int k=0; k<3; k++){
    float sc = k==0 ? 180.0 : (k==1 ? 360.0 : 720.0);
    vec2 g = vec2(u * sc * 2.0 * cosLat, v * sc), id = floor(g), f = fract(g) - 0.5;
    float h = h21(id + float(k)*31.0);
    vec2 o = (vec2(h21(id + 3.0), h21(id + 7.0)) - 0.5) * 0.75;
    float dStar = length(f - o);
    float thresh = k==2 ? 0.86 : 0.93;
    float radius = k==2 ? 0.14 : 0.10;
    float s = smoothstep(radius, 0.0, dStar) * step(thresh, h);
    float halo = exp(-dStar * dStar * 65.0) * step(0.975, h) * (k==0 ? 0.45 : 0.18);
    float colorSeed = h21(id + 11.0);
    vec3 starCol = mix(vec3(0.78, 0.90, 1.0), vec3(1.0, 0.90, 0.82), colorSeed);
    starCol = mix(starCol, vec3(1.0, 0.30, 0.14), step(0.82, colorSeed));
    float clusterMod = 0.25 + 0.95 * smoothstep(0.38, 0.74, max(cyanClouds, redKnots));
    c += starCol * (s + halo) * (0.20 + 0.90 * (h - thresh) / (1.0 - thresh)) * clusterMod;
  }

  return c;
}

vec4 disk(vec3 p, vec3 vdir){
  float rr=length(p.xz);
  if(rr<2.2||rr>12.5) return vec4(0.);
  float a=atan(p.z,p.x);
  float ar=a-uTime*5./pow(rr,1.5);
  vec2 q=vec2(cos(ar),sin(ar))*rr;
  float n=fbm(q*1.1+fbm(q*.6+uTime*.03)*1.5)*.6+fbm(q*3.4+7.)*.4;
  float rings=.78+.22*sin(rr*11.+n*7.);
  float dens=smoothstep(2.2,2.9,rr)*smoothstep(12.5,5.5,rr)*pow(n,1.6)*1.9*rings*uDiskOpacity;
  float temp=smoothstep(11.,2.3,rr);
  vec3 col=mix(vec3(1.,.32,.06),vec3(1.,.78,.5),temp);
  col=mix(col,vec3(.88,.94,1.),pow(temp,4.2)*.75);
  vec3 vel=normalize(vec3(-p.z,0.,p.x));
  float dop=dot(vel,-vdir);
  float beam=pow(clamp(1.+uDopplerBoost*dop,.15,2.3),3.);
  // Illuminate disk plasma when a user-launched geodesic photon passes nearby
  float pDist = length(p - uPulsePos);
  float pulseIllum = uPulseActive * exp(-pDist * pDist * 0.9) * 3.0;
  vec3 finalRgb = col*dens*beam*(.6+2.4*temp) + vec3(1.0, 0.85, 0.6) * pulseIllum * dens;
  return vec4(finalRgb, clamp(dens*1.2,0.,1.));
}

void main(){
  vec2 uv=(gl_FragCoord.xy-.5*uResolution)/uResolution.y;
  uv -= uScreenOffset;

  vec3 fw=normalize(uCamTarget - uCamPos);
  vec3 worldUp=abs(fw.y) > 0.99 ? vec3(0.,0.,1.) : vec3(0.,1.,0.);
  vec3 rt=normalize(cross(worldUp, fw));
  vec3 up=cross(fw, rt);
  vec3 rt2=rt*cos(uRoll)+up*sin(uRoll);
  vec3 up2=up*cos(uRoll)-rt*sin(uRoll);
  vec3 rd=normalize(fw*uFov+rt2*uv.x+up2*uv.y);

  vec3 pos=uCamPos, vel=rd;
  vec3 hc=cross(pos,vel);
  float h2=dot(hc,hc);
  vec3 col=vec3(0.);
  float alpha=0., glow=0., jetGlow=0.;
  bool hole=false;

  for(int i=0;i<260;i++){
    float r2=dot(pos,pos), rl=sqrt(r2);
    float dt=clamp(.07*rl,.02,.9);
    vel += -uLensingMass * h2 * pos / pow(r2, 2.5) * dt;
    vec3 np=pos+vel*dt;

    // Equatorial accretion disk crossing
    if(pos.y*np.y<0.){
      vec3 cp=mix(pos,np,pos.y/(pos.y-np.y));
      vec4 dc=disk(cp,normalize(vel));
      col+=(1.-alpha)*dc.rgb;
      alpha+=(1.-alpha)*dc.a;
    }

    // Photon ring accumulation at r = 1.5 - 1.6 Rs
    glow+=exp(-pow((rl-1.6)*3.,2.))*dt;

    // Relativistic polar jet along Y axis (active in Chapter 6)
    if(uJetIntensity > 0.001){
      float cylR = length(pos.xz);
      float coneWidth = 0.25 + abs(pos.y) * 0.08;
      float jetMask = exp(-pow(cylR / coneWidth, 2.0) * 2.5) * smoothstep(1.1, 2.5, abs(pos.y)) * exp(-abs(pos.y)*0.06);
      jetGlow += jetMask * dt * uJetIntensity;
    }

    // Glowing test photon in 3D space
    if(uPulseActive > 0.5){
      float dPulse = length(pos - uPulsePos);
      glow += exp(-dPulse * dPulse * 6.0) * dt * 4.5;
    }

    pos=np;
    if(rl<1.){hole=true;break;}
    if(rl>60.||alpha>.995)break;
  }

  if(!hole) col+=(1.-alpha)*sky(normalize(vel));
  col+=vec3(1.,.72,.48)*glow*.06*(1.-alpha*.6);
  col+=vec3(1.,.86,.68)*jetGlow*.35*(1.-alpha*.4);
  col*=1.15;
  col=(col*(2.51*col+.03))/(col*(2.43*col+.59)+.14); // ACES Filmic
  vec2 q=gl_FragCoord.xy/uResolution;
  col*=1.-.25*dot(q-.5,q-.5)*2.;
  col+=(h21(gl_FragCoord.xy+fract(uTime))-.5)*.012;
  gl_FragColor=vec4(clamp(col,0.,1.),1.);
}
`;
]]>
    </file>
  </files>
</template>
