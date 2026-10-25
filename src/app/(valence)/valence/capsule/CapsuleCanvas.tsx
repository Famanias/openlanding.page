"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { lerp } from "../motion/math";
import { onIdle } from "../motion/mode";
import { useReducedMotion } from "../motion/useReducedMotion";
import {
  computeCapsuleTransforms,
  computeUnlockedDepthPercent,
} from "./logic";
import { valenceStore } from "./store";

type CapsuleCanvasProps = {
  scrollProgress?: number;
  compact?: boolean;
  className?: string;
};

export function CapsuleCanvas({
  scrollProgress = 0,
  compact = false,
  className = "",
}: CapsuleCanvasProps) {
  const snapshot = useSyncExternalStore(
    valenceStore.subscribe,
    valenceStore.getSnapshot,
    valenceStore.getSnapshot,
  );
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasHostRef = useRef<HTMLDivElement | null>(null);

  const [webglActive, setWebglActive] = useState(false);
  const [touchRequested3D, setTouchRequested3D] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const pose = computeCapsuleTransforms(
    snapshot.activeTier,
    snapshot.unlocked,
    scrollProgress,
  );
  const depthPercent = computeUnlockedDepthPercent(snapshot.unlocked);

  const poseRef = useRef(pose);
  poseRef.current = pose;

  const pausedRef = useRef(snapshot.ambientPaused);
  pausedRef.current = snapshot.ambientPaused;

  useEffect(() => {
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    setIsTouchDevice(touch);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setWebglActive(false);
      return;
    }

    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (touch && !touchRequested3D) {
      return;
    }

    const host = canvasHostRef.current;
    const container = containerRef.current;
    if (!host || !container) return;

    let disposed = false;
    let rafId = 0;
    let inViewport = true;
    let cleanupThree: (() => void) | null = null;

    const cancelIdle = onIdle(() => {
      import("three")
        .then((THREE) => {
          if (disposed || !host) return;

          let renderer: InstanceType<typeof THREE.WebGLRenderer>;
          try {
            renderer = new THREE.WebGLRenderer({
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            });
          } catch {
            return;
          }

          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
          renderer.toneMapping = THREE.ACESFilmicToneMapping;
          renderer.toneMappingExposure = 1.08;

          const width = Math.max(host.clientWidth, 260);
          const height = Math.max(host.clientHeight, 260);
          renderer.setSize(width, height, false);

          host.innerHTML = "";
          renderer.domElement.setAttribute("data-testid", "valence-3d-canvas");
          renderer.domElement.style.width = "100%";
          renderer.domElement.style.height = "100%";
          renderer.domElement.style.display = "block";
          host.appendChild(renderer.domElement);

          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 50);
          camera.position.set(0, 0.35, 6.4);
          camera.lookAt(0, 0, 0);

          const ambient = new THREE.AmbientLight("#FBF9F5", 1.85);
          scene.add(ambient);

          const keyLight = new THREE.DirectionalLight("#FBF9F5", 2.1);
          keyLight.position.set(3.5, 5.2, 4.5);
          scene.add(keyLight);

          const fillLight = new THREE.DirectionalLight("#E8E0F8", 1.25);
          fillLight.position.set(-4.0, -2.2, 3.0);
          scene.add(fillLight);

          const rimLight = new THREE.PointLight("#5B46E8", 2.4, 12);
          rimLight.position.set(0, 2.2, -2.5);
          scene.add(rimLight);

          const rootGroup = new THREE.Group();
          scene.add(rootGroup);

          // Matte-ceramic pastel materials
          const lavenderMat = new THREE.MeshPhysicalMaterial({
            color: "#E8E0F8",
            roughness: 0.32,
            metalness: 0.04,
            clearcoat: 0.45,
            clearcoatRoughness: 0.25,
          });

          const mintMat = new THREE.MeshPhysicalMaterial({
            color: "#D9F2E6",
            roughness: 0.3,
            metalness: 0.05,
            clearcoat: 0.5,
            clearcoatRoughness: 0.2,
          });

          const peachMat = new THREE.MeshPhysicalMaterial({
            color: "#FCE2D5",
            roughness: 0.28,
            metalness: 0.05,
            clearcoat: 0.52,
            clearcoatRoughness: 0.2,
          });

          const irisMat = new THREE.MeshPhysicalMaterial({
            color: "#5B46E8",
            emissive: "#5B46E8",
            emissiveIntensity: 0.22,
            roughness: 0.2,
            metalness: 0.12,
            clearcoat: 0.8,
          });

          const inkTrimMat = new THREE.MeshStandardMaterial({
            color: "#1E1B2E",
            roughness: 0.4,
            metalness: 0.2,
          });

          // Central calibrated spindle
          const spindleGeo = new THREE.CylinderGeometry(0.05, 0.05, 3.3, 24);
          const spindleMesh = new THREE.Mesh(spindleGeo, inkTrimMat);
          rootGroup.add(spindleMesh);

          // Tier 01: Outer Lavender Splash Ring + Dome Cap
          const outerGroup = new THREE.Group();
          const outerTorus = new THREE.Mesh(
            new THREE.TorusGeometry(1.32, 0.24, 28, 72),
            lavenderMat,
          );
          outerTorus.rotation.x = Math.PI / 2;
          const outerCap = new THREE.Mesh(
            new THREE.CylinderGeometry(0.95, 1.18, 0.38, 48),
            lavenderMat,
          );
          outerCap.position.y = 0.32;
          const outerTrim = new THREE.Mesh(
            new THREE.TorusGeometry(1.12, 0.025, 16, 64),
            inkTrimMat,
          );
          outerTrim.rotation.x = Math.PI / 2;
          outerTrim.position.y = 0.14;
          outerGroup.add(outerTorus, outerCap, outerTrim);
          rootGroup.add(outerGroup);

          // Tier 02: Middle Pistachio Squeeze Ring
          const middleGroup = new THREE.Group();
          const middleTorus = new THREE.Mesh(
            new THREE.TorusGeometry(1.02, 0.22, 28, 72),
            mintMat,
          );
          middleTorus.rotation.x = Math.PI / 2;
          const middleCollar = new THREE.Mesh(
            new THREE.CylinderGeometry(0.84, 0.84, 0.42, 48),
            mintMat,
          );
          const middleTrim = new THREE.Mesh(
            new THREE.TorusGeometry(0.86, 0.025, 16, 64),
            inkTrimMat,
          );
          middleTrim.rotation.x = Math.PI / 2;
          middleGroup.add(middleTorus, middleCollar, middleTrim);
          rootGroup.add(middleGroup);

          // Tier 03: Inner Peach Sorbet Base + Periwinkle Iris Core Dossier Orb
          const baseGroup = new THREE.Group();
          const baseCup = new THREE.Mesh(
            new THREE.CylinderGeometry(1.12, 0.86, 0.56, 48),
            peachMat,
          );
          baseCup.position.y = -0.58;
          const baseTorus = new THREE.Mesh(
            new THREE.TorusGeometry(1.14, 0.18, 24, 64),
            peachMat,
          );
          baseTorus.rotation.x = Math.PI / 2;
          baseTorus.position.y = -0.34;
          baseGroup.add(baseCup, baseTorus);
          rootGroup.add(baseGroup);

          const coreGroup = new THREE.Group();
          const coreOrb = new THREE.Mesh(new THREE.SphereGeometry(0.46, 36, 36), irisMat);
          const orbitRing = new THREE.Mesh(
            new THREE.TorusGeometry(0.68, 0.032, 16, 64),
            inkTrimMat,
          );
          orbitRing.rotation.x = Math.PI / 3;
          orbitRing.rotation.y = Math.PI / 6;
          coreGroup.add(coreOrb, orbitRing);
          rootGroup.add(coreGroup);

          setWebglActive(true);

          // Pointer drag-to-orbit state
          let isDragging = false;
          let prevX = 0;
          let prevY = 0;
          let userRotY = 0.35;
          let userRotX = 0.18;
          let velY = 0;

          const onPointerDown = (e: PointerEvent) => {
            isDragging = true;
            prevX = e.clientX;
            prevY = e.clientY;
          };

          const onPointerMove = (e: PointerEvent) => {
            if (!isDragging) return;
            const dx = e.clientX - prevX;
            const dy = e.clientY - prevY;
            prevX = e.clientX;
            prevY = e.clientY;
            velY = dx * 0.008;
            userRotY += velY;
            userRotX = Math.max(-0.55, Math.min(0.65, userRotX + dy * 0.006));
          };

          const onPointerUp = () => {
            isDragging = false;
          };

          const domEl = renderer.domElement;
          domEl.addEventListener("pointerdown", onPointerDown, { passive: true });
          window.addEventListener("pointermove", onPointerMove, { passive: true });
          window.addEventListener("pointerup", onPointerUp, { passive: true });

          let curOuterLift = poseRef.current.outerLift;
          let curMiddleLift = poseRef.current.middleLift;
          let curCoreScale = poseRef.current.coreScale;
          let curRingRot = poseRef.current.ringRotationRad;

          const renderFrame = (now: number) => {
            if (disposed) return;
            if (!inViewport) {
              rafId = 0;
              return;
            }

            const target = poseRef.current;
            curOuterLift = lerp(curOuterLift, target.outerLift, 0.09);
            curMiddleLift = lerp(curMiddleLift, target.middleLift, 0.09);
            curCoreScale = lerp(curCoreScale, target.coreScale, 0.09);
            curRingRot = lerp(curRingRot, target.ringRotationRad, 0.08);

            if (!isDragging) {
              velY *= 0.94;
              const idleSpin = pausedRef.current ? 0 : 0.0032;
              userRotY += velY + idleSpin;
            }

            const breathe = pausedRef.current ? 0 : Math.sin(now * 0.0016) * 0.05;

            outerGroup.position.y = 0.55 + curOuterLift * 0.72 + breathe;
            outerGroup.rotation.y = curRingRot * 0.6;

            middleGroup.position.y = 0.05 + curMiddleLift * 0.35 - breathe * 0.5;
            middleGroup.rotation.y = -curRingRot * 0.85;

            baseGroup.position.y = -0.32 - curOuterLift * 0.28;

            coreGroup.scale.setScalar(curCoreScale);
            coreGroup.rotation.y = now * (pausedRef.current ? 0 : 0.0012);

            rootGroup.rotation.y = userRotY;
            rootGroup.rotation.x = userRotX;

            renderer.render(scene, camera);
            rafId = window.requestAnimationFrame(renderFrame);
          };

          const io = new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                inViewport = entry.isIntersecting;
                if (inViewport && !rafId) {
                  rafId = window.requestAnimationFrame(renderFrame);
                }
              }
            },
            { threshold: 0.05 },
          );
          io.observe(container);

          const onResize = () => {
            if (!host) return;
            const w = Math.max(host.clientWidth, 260);
            const h = Math.max(host.clientHeight, 260);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h, false);
          };
          window.addEventListener("resize", onResize, { passive: true });
          const ro = new ResizeObserver(onResize);
          ro.observe(host);
          onResize();

          rafId = window.requestAnimationFrame(renderFrame);

          cleanupThree = () => {
            if (rafId) window.cancelAnimationFrame(rafId);
            io.disconnect();
            ro.disconnect();
            window.removeEventListener("resize", onResize);
            domEl.removeEventListener("pointerdown", onPointerDown);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
            lavenderMat.dispose();
            mintMat.dispose();
            peachMat.dispose();
            irisMat.dispose();
            inkTrimMat.dispose();
            spindleGeo.dispose();
            renderer.dispose();
          };
        })
        .catch(() => {
          setWebglActive(false);
        });
    });

    return () => {
      disposed = true;
      cancelIdle();
      cleanupThree?.();
    };
  }, [reducedMotion, touchRequested3D]);

  const outerOffsetPx = Math.round(pose.outerLift * 26);
  const middleOffsetPx = Math.round(pose.middleLift * 18);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-[32px] border border-[#1E1B2E]/15 bg-[#FBF9F5] p-5 ${className}`}
      data-active-tier={snapshot.activeTier}
      data-unseal-percent={depthPercent}
    >
      {/* Top status bar inside the 3D capsule stage */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-3">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#E8E0F8] px-3.5 py-1.5 vl-mono text-[11px] font-medium text-[#1E1B2E]">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: "#5B46E8" }}
          />
          CAPSULE DOSSIER · {depthPercent}% UNSEALED
        </span>
        <span className="rounded-full bg-[#D9F2E6] px-3 py-1 vl-mono text-[11px] text-[#1E1B2E]">
          ACTIVE RING: {snapshot.activeTier.toUpperCase()}
        </span>
      </div>

      {/* 3D Canvas + SVG Poster / Reduced-Motion Layer */}
      <div
        className={`relative mx-auto flex items-center justify-center ${
          compact ? "h-[290px]" : "h-[360px] sm:h-[400px]"
        }`}
      >
        <div
          ref={canvasHostRef}
          className={`absolute inset-0 z-10 cursor-grab active:cursor-grabbing transition-opacity duration-500 ${
            webglActive && !reducedMotion ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden="true"
        />

        {/* Always-present accessible SVG schematic (visible when reducedMotion, before WebGL idle mount, or on touch until tapped) */}
        <svg
          viewBox="0 0 400 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label={`Valence 3-ring pastel capsule dossier at ${depthPercent}% unsealed`}
          className={`w-full h-full max-w-[360px] transition-opacity duration-300 ${
            webglActive && !reducedMotion ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          data-testid="valence-capsule-svg"
        >
          {/* Central calibrated spindle */}
          <line
            x1="200"
            y1="26"
            x2="200"
            y2="334"
            stroke="#1E1B2E"
            strokeWidth="3"
            strokeDasharray="6 6"
          />

          {/* Tier 01: Outer Lavender Mist Ring (Splash Gate) */}
          <g
            style={{
              transform: `translateY(${-outerOffsetPx}px)`,
              transition: "transform 420ms cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            <rect
              x="76"
              y="56"
              width="248"
              height="68"
              rx="34"
              fill="#E8E0F8"
              stroke="#1E1B2E"
              strokeWidth="2.5"
            />
            <text
              x="200"
              y="87"
              textAnchor="middle"
              fill="#1E1B2E"
              fontFamily="JetBrains Mono, monospace"
              fontSize="11"
              fontWeight="600"
            >
              RING 01 · SPLASH GATE
            </text>
            <text
              x="200"
              y="106"
              textAnchor="middle"
              fill="#645D7A"
              fontFamily="Plus Jakarta Sans, sans-serif"
              fontSize="11"
            >
              {snapshot.unlocked.splash ? "Unlatched · Cohort Routed" : "0 Fields · 1-Click Enter"}
            </text>
          </g>

          {/* Tier 02: Middle Pistachio Mint Ring (Squeeze Fast-Lane) */}
          <g
            style={{
              transform: `translateY(${-Math.round(middleOffsetPx * 0.4)}px)`,
              transition: "transform 420ms cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            <rect
              x="92"
              y="144"
              width="216"
              height="68"
              rx="34"
              fill="#D9F2E6"
              stroke="#1E1B2E"
              strokeWidth="2.5"
            />
            <text
              x="200"
              y="175"
              textAnchor="middle"
              fill="#1E1B2E"
              fontFamily="JetBrains Mono, monospace"
              fontSize="11"
              fontWeight="600"
            >
              RING 02 · SQUEEZE PAGE
            </text>
            <text
              x="200"
              y="194"
              textAnchor="middle"
              fill="#645D7A"
              fontFamily="Plus Jakarta Sans, sans-serif"
              fontSize="11"
            >
              {snapshot.unlocked.squeeze ? "Unsealed · Digest Ready" : "1 Field · Instant Synthesis"}
            </text>
          </g>

          {/* Tier 03: Inner Peach Sorbet & Periwinkle Iris Core (Lead Capture Dossier) */}
          <g
            style={{
              transform: `translateY(${outerOffsetPx}px)`,
              transition: "transform 420ms cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            <rect
              x="76"
              y="232"
              width="248"
              height="74"
              rx="37"
              fill="#FCE2D5"
              stroke="#1E1B2E"
              strokeWidth="2.5"
            />
            <circle cx="116" cy="269" r="20" fill="#5B46E8" />
            <text
              x="116"
              y="273"
              textAnchor="middle"
              fill="#FBF9F5"
              fontFamily="JetBrains Mono, monospace"
              fontSize="11"
              fontWeight="700"
            >
              03
            </text>
            <text
              x="216"
              y="264"
              textAnchor="middle"
              fill="#1E1B2E"
              fontFamily="JetBrains Mono, monospace"
              fontSize="11"
              fontWeight="600"
            >
              CORE · LEAD CAPTURE
            </text>
            <text
              x="216"
              y="284"
              textAnchor="middle"
              fill="#645D7A"
              fontFamily="Plus Jakarta Sans, sans-serif"
              fontSize="11"
            >
              {snapshot.unlocked["lead-gen"]
                ? `Key ${snapshot.dossierKey ?? "VL-2026-MINTED"}`
                : "4 Fields · Full Audit & Report"}
            </text>
          </g>
        </svg>
      </div>

      {/* Interactive Ring Controls & Touch 3D Trigger */}
      <div className="relative z-10 mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-[#1E1B2E]/10 pt-3">
        <div
          className="inline-flex flex-wrap items-center gap-1.5"
          role="group"
          aria-label="Inspect capsule ring by capture format"
        >
          {(
            [
              { id: "splash", label: "01 Splash", bg: "#E8E0F8" },
              { id: "squeeze", label: "02 Squeeze", bg: "#D9F2E6" },
              { id: "lead-gen", label: "03 Lead Gen", bg: "#FCE2D5" },
            ] as const
          ).map((item) => {
            const active = snapshot.activeTier === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => valenceStore.setActiveTier(item.id)}
                aria-pressed={active}
                className="rounded-full px-3.5 py-1.5 vl-mono text-[11px] font-medium transition-transform active:scale-95 cursor-pointer"
                style={{
                  backgroundColor: active ? "#1E1B2E" : item.bg,
                  color: active ? "#FBF9F5" : "#1E1B2E",
                  border: "1.5px solid #1E1B2E",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {isTouchDevice && !reducedMotion && !touchRequested3D ? (
          <button
            type="button"
            onClick={() => setTouchRequested3D(true)}
            className="rounded-full bg-[#5B46E8] px-3.5 py-1.5 vl-mono text-[11px] text-[#FBF9F5]"
          >
            Tap for 3D Orbit
          </button>
        ) : (
          <span className="vl-mono text-[11px] text-[#645D7A]">
            {reducedMotion ? "STATIC SCHEMATIC MODE" : "DRAG TO ORBIT · 3 RINGS"}
          </span>
        )}
      </div>
    </div>
  );
}
