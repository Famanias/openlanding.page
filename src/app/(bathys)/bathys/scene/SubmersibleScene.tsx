"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "../motion/useReducedMotion";
import { clamp, lerp } from "../motion/math";
import { computePose, type Pose } from "./pose";
import { MODEL_WIDTH, buildSubmersible, type Palette } from "./buildSubmersible";

/**
 * Fixed WebGL layer that carries the BATHYS H-11 through the whole page:
 * large and three-quarter-on beside the hero copy, then a slowly turning
 * companion in the right gutter as you scroll. Floodlights brighten and the
 * key light dims as the dive deepens. Under reduced motion (or without WebGL)
 * the layer never mounts and the hero simply shows the water column.
 */

const CALLOUTS = [
  { label: "SYNTACTIC FOAM FAIRING", sub: "0.54 G/CM³", dx: 34, dy: -12 },
  { label: "TI-6AL-4V PRESSURE SPHERE", sub: "Ø 1,800 MM · 64 MM WALL", dx: 34, dy: 0 },
  { label: "COLD-WHITE FLOODLIGHTS", sub: "2 × FORWARD ARRAY", dx: 40, dy: -14 },
  { label: "MULTIBEAM TRANSDUCER", sub: "SYNTHETIC APERTURE", dx: 84, dy: 34 },
];

const FOV = 32;
const CAMERA_Z = 12;
const PALETTE_KEYS: (keyof Palette)[] = ["trench", "navy", "titanium", "cyan", "amber", "glass", "slate", "mist"];

export function SubmersibleScene() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const calloutsRef = useRef<HTMLDivElement | null>(null);
  const calloutEls = useRef<(HTMLDivElement | null)[]>([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    const calloutHost = calloutsRef.current;
    if (!canvas || !calloutHost) return;

    let disposed = false;
    let teardown: () => void = () => {};

    (async () => {
      const [T, rbModule, envModule] = await Promise.all([
        import("three"),
        import("three/examples/jsm/geometries/RoundedBoxGeometry.js"),
        import("three/examples/jsm/environments/RoomEnvironment.js"),
      ]);
      if (disposed) return;

      let renderer: InstanceType<typeof T.WebGLRenderer>;
      try {
        renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
      } catch {
        return; // no WebGL: the SVG submersible in HeroScene stays
      }

      const style = getComputedStyle(document.documentElement);
      const palette = Object.fromEntries(
        PALETTE_KEYS.map((k) => [k, style.getPropertyValue(`--color-${k}`).trim()]),
      ) as Palette;
      const fontFamily = getComputedStyle(document.body).getPropertyValue("--font-mono").trim() || "monospace";

      let vw = window.innerWidth;
      let vh = window.innerHeight;
      const small = vw < 700;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75));
      renderer.setSize(vw, vh, false);
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = T.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;

      const scene = new T.Scene();
      const camera = new T.PerspectiveCamera(FOV, vw / vh, 0.1, 60);
      camera.position.set(0, 0, CAMERA_Z);

      const pmrem = new T.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new envModule.RoomEnvironment(), 0.04).texture;
      scene.environment = envTex;

      const hemi = new T.HemisphereLight(new T.Color(palette.mist), new T.Color(palette.trench), 0.6);
      const key = new T.DirectionalLight(new T.Color(palette.titanium), 2.6);
      key.position.set(-2.5, 6, 5);
      const rim = new T.DirectionalLight(new T.Color(palette.cyan), 1.1);
      rim.position.set(4, 2, -4);
      scene.add(hemi, key, rim);

      const sub = buildSubmersible({
        THREE: T,
        RoundedBox: rbModule.RoundedBoxGeometry,
        palette,
        fontFamily,
        detail: small ? "low" : "high",
      });
      const stage = new T.Group();
      stage.add(sub.root);
      scene.add(stage);

      // Sonar pings: camera-facing rings that expand from the pressure sphere.
      const pingGroup = new T.Group();
      scene.add(pingGroup);
      const pings = [0, 1, 2].map((i) => {
        const mat = new T.MeshBasicMaterial({
          color: new T.Color(palette.cyan),
          transparent: true,
          depthWrite: false,
          blending: T.AdditiveBlending,
        });
        const mesh = new T.Mesh(new T.RingGeometry(0.985, 1, 96), mat);
        pingGroup.add(mesh);
        return { mesh, mat, offset: i / 3 };
      });

      const heroEl = () => document.getElementById("hero");
      const readTarget = (): Pose => {
        const docMax = document.documentElement.scrollHeight - vh;
        return computePose({
          scrollY: window.scrollY,
          heroHeight: heroEl()?.offsetHeight ?? vh,
          docMax,
          vw,
          vh,
        });
      };

      const cur = readTarget();
      cur.opacity = 0; // fade in
      let lastScroll = window.scrollY;
      let velocity = 0;
      let last = performance.now();
      let raf = 0;
      const v3 = new T.Vector3();

      const onResize = () => {
        vw = window.innerWidth;
        vh = window.innerHeight;
        renderer.setSize(vw, vh, false);
        camera.aspect = vw / vh;
        camera.updateProjectionMatrix();
      };

      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        const time = now / 1000;

        const target = readTarget();
        const k = 1 - Math.exp(-dt * 6);
        cur.cx = lerp(cur.cx, target.cx, k);
        cur.cy = lerp(cur.cy, target.cy, k);
        cur.width = lerp(cur.width, target.width, k);
        cur.yaw = lerp(cur.yaw, target.yaw, k);
        cur.pitch = lerp(cur.pitch, target.pitch, k);
        cur.opacity = lerp(cur.opacity, target.opacity, 1 - Math.exp(-dt * 2.5));
        cur.callouts = lerp(cur.callouts, target.callouts, 1 - Math.exp(-dt * 8));

        const y = window.scrollY;
        const dive = clamp(y / Math.max(document.documentElement.scrollHeight - vh, 1), 0, 1);
        velocity = lerp(velocity, Math.abs(y - lastScroll) / Math.max(dt, 0.001), 1 - Math.exp(-dt * 5));
        lastScroll = y;

        // Screen pixels -> world units at the camera's focal plane
        const pxPerUnit = vh / (2 * Math.tan((FOV * Math.PI) / 360) * CAMERA_Z);
        const s = cur.width / (MODEL_WIDTH * pxPerUnit);
        stage.position.set((cur.cx - vw / 2) / pxPerUnit, -(cur.cy - vh / 2) / pxPerUnit, 0);
        stage.scale.setScalar(s);
        sub.root.rotation.set(cur.pitch, cur.yaw + Math.sin(time * 0.3) * 0.06, Math.sin(time * 0.6) * 0.015);
        sub.root.position.y = Math.sin(time * 0.9) * 0.08;

        // Deeper = less surface light, stronger floodlights
        const deep = clamp(dive * 2.2, 0, 1);
        key.intensity = lerp(2.6, 0.55, deep);
        hemi.intensity = lerp(0.6, 0.18, deep);
        scene.environmentIntensity = lerp(0.4, 0.14, deep);
        sub.setLight(lerp(0.15, 1, deep));
        sub.update(time, clamp(velocity / 1800, 0, 1));

        pingGroup.position.copy(stage.position);
        for (const p of pings) {
          const phase = (time / 4.2 + p.offset) % 1;
          p.mesh.scale.setScalar(s * (1.3 + phase * 5.5));
          p.mat.opacity = (1 - phase) * (1 - phase) * 0.45 * (0.25 + cur.callouts * 0.75);
        }

        canvas.style.opacity = cur.opacity.toFixed(3);

        stage.updateMatrixWorld(true);
        const showCallouts = cur.callouts > 0.01;
        calloutHost.style.opacity = showCallouts ? cur.callouts.toFixed(3) : "0";
        if (showCallouts) {
          sub.anchors.forEach((a, i) => {
            const el = calloutEls.current[i];
            if (!el) return;
            a.getWorldPosition(v3).project(camera);
            const sx = (v3.x * 0.5 + 0.5) * vw;
            const sy = (-v3.y * 0.5 + 0.5) * vh;
            el.style.transform = `translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 0)`;
          });
        }

        renderer.render(scene, camera);
      };

      const onVisibility = () => {
        cancelAnimationFrame(raf);
        if (document.hidden) return;
        last = performance.now();
        raf = requestAnimationFrame(frame);
      };
      const onContextLost = (e: Event) => {
        e.preventDefault();
        cancelAnimationFrame(raf);
      };

      window.addEventListener("resize", onResize);
      document.addEventListener("visibilitychange", onVisibility);
      canvas.addEventListener("webglcontextlost", onContextLost);
      onVisibility();

      teardown = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVisibility);
        canvas.removeEventListener("webglcontextlost", onContextLost);
        sub.dispose();
        for (const p of pings) {
          p.mesh.geometry.dispose();
          p.mat.dispose();
        }
        envTex.dispose();
        pmrem.dispose();
        renderer.dispose();
      };
    })();

    return () => {
      disposed = true;
      teardown();
    };
  }, [reduced]);

  return (
    <div ref={rootRef} aria-hidden="true" className="bat-sub pointer-events-none fixed inset-0 z-[5]">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-0" />
      <div ref={calloutsRef} className="absolute inset-0 hidden opacity-0 xl:block">
        {CALLOUTS.map((c, i) => {
          const length = Math.hypot(c.dx, c.dy);
          const angle = (Math.atan2(c.dy, c.dx) * 180) / Math.PI;
          return (
            <div
              key={c.label}
              ref={(el) => {
                calloutEls.current[i] = el;
              }}
              className="bat-callout"
            >
              <span className="bat-callout-dot" />
              <span className="bat-callout-line" style={{ width: length, transform: `rotate(${angle}deg)` }} />
              <span className="bat-callout-text" style={{ left: c.dx + 8, top: c.dy - 7 }}>
                {c.label}
                <small>{c.sub}</small>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
