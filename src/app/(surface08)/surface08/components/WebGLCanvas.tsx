'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type {
  EffectControls,
  EffectId,
  Palette,
  TelemetryStats,
} from '../engine/effectTypes';
import { EffectController } from '../engine/EffectController';
import { InputField } from '../engine/InputField';
import { checkWebGL2Available, QualityManager } from '../engine/QualityManager';

export interface WebGLCanvasProps {
  activeEffectId: EffectId;
  controls: EffectControls;
  resetSignal: number;
  activePalette: Palette;
  onFirstInteraction: () => void;
  onTelemetryUpdate: (stats: TelemetryStats) => void;
}

export function WebGLCanvas({
  activeEffectId,
  controls,
  resetSignal,
  activePalette,
  onFirstInteraction,
  onTelemetryUpdate,
}: WebGLCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  // Store latest props in refs inside effects so React HUD updates never tear down the WebGL context
  const controlsRef = useRef<EffectControls>(controls);
  const activeEffectIdRef = useRef<EffectId>(activeEffectId);
  const controllerRef = useRef<EffectController | null>(null);
  const inputFieldRef = useRef<InputField | null>(null);
  const onFirstInteractionRef = useRef(onFirstInteraction);
  const onTelemetryUpdateRef = useRef(onTelemetryUpdate);

  useEffect(() => {
    controlsRef.current = controls;
    onFirstInteractionRef.current = onFirstInteraction;
    onTelemetryUpdateRef.current = onTelemetryUpdate;
  }, [controls, onFirstInteraction, onTelemetryUpdate]);

  // Trigger effect switch when activeEffectId changes
  useEffect(() => {
    activeEffectIdRef.current = activeEffectId;
    if (controllerRef.current) {
      controllerRef.current.switchTo(activeEffectId, controlsRef.current.reducedMotion);
    }
  }, [activeEffectId]);

  // Trigger reset when resetSignal increments
  useEffect(() => {
    if (resetSignal > 0) {
      controllerRef.current?.resetActive();
      inputFieldRef.current?.reset();
    }
  }, [resetSignal]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    if (!checkWebGL2Available()) {
      const id = requestAnimationFrame(() => setWebglUnavailable(true));
      return () => cancelAnimationFrame(id);
    }

    const qualityManager = new QualityManager();
    const isSoftwareGl = qualityManager.isSoftwareGl;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: false,
        preserveDrawingBuffer: true,
      });
    } catch {
      const id = requestAnimationFrame(() => setWebglUnavailable(true));
      return () => cancelAnimationFrame(id);
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    const initialWidth = Math.max(320, container.clientWidth || window.innerWidth);
    const initialHeight = Math.max(320, container.clientHeight || window.innerHeight);

    qualityManager.setPreset(controlsRef.current.quality);
    const initialQuality = qualityManager.getEffectiveSettings(window.devicePixelRatio || 1);

    renderer.setPixelRatio(initialQuality.dpr);
    renderer.setSize(initialWidth, initialHeight);
    renderer.domElement.className = 'block h-full w-full';
    renderer.domElement.setAttribute('data-testid', 'surface08-webgl-canvas');
    container.appendChild(renderer.domElement);

    const controller = new EffectController(activeEffectIdRef.current);
    controller.init({
      renderer,
      width: initialWidth,
      height: initialHeight,
      pixelRatio: initialQuality.dpr,
      isSoftwareGl,
    });
    controllerRef.current = controller;

    const inputField = new InputField(() => {
      onFirstInteractionRef.current();
    });
    inputField.attach(container);
    inputFieldRef.current = inputField;

    let currentDpr = initialQuality.dpr;
    const handleResize = () => {
      if (!container) return;
      const w = Math.max(240, container.clientWidth || window.innerWidth);
      const h = Math.max(240, container.clientHeight || window.innerHeight);
      const q = qualityManager.getEffectiveSettings(window.devicePixelRatio || 1);
      currentDpr = q.dpr;
      renderer.setPixelRatio(currentDpr);
      renderer.setSize(w, h);
      controller.resize(w, h, currentDpr);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setWebglUnavailable(true);
    };
    const handleContextRestored = () => {
      setWebglUnavailable(false);
      handleResize();
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);

    let isTabHidden = document.hidden;
    const handleVisibilityChange = () => {
      isTabHidden = document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    let frameId = 0;
    let timeoutId = 0;
    let lastTime = performance.now();
    let elapsedSim = 0;
    let lastTelemetryTime = 0;

    // Software WebGL fenceSync pacing so headless Chromium never stalls
    const afterDraw = (cb: () => void) => {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        timeoutId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (!sync) {
          timeoutId = window.setTimeout(cb, 80);
          return;
        }
        const state = gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          timeoutId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          timeoutId = window.setTimeout(cb, 80);
        }
      };
      timeoutId = window.setTimeout(poll, 5);
    };

    const tick = () => {
      const now = performance.now();
      const wallDt = Math.max(0.001, Math.min((now - lastTime) / 1000, 0.35));
      const rawDt = Math.max(0.001, Math.min(wallDt, 0.08));
      lastTime = now;

      if (!isTabHidden) {
        const ctrl = controlsRef.current;
        qualityManager.setPreset(ctrl.quality);
        qualityManager.recordFrame(wallDt);

        const qSettings = qualityManager.getEffectiveSettings(window.devicePixelRatio || 1);
        if (Math.abs(qSettings.dpr - currentDpr) > 0.05) {
          currentDpr = qSettings.dpr;
          const w = Math.max(240, container.clientWidth || window.innerWidth);
          const h = Math.max(240, container.clientHeight || window.innerHeight);
          renderer.setPixelRatio(currentDpr);
          renderer.setSize(w, h);
          controller.resize(w, h, currentDpr);
        }

        const inputState = inputField.update(rawDt, ctrl.reducedMotion);
        if (!ctrl.paused && !ctrl.reducedMotion) {
          elapsedSim += rawDt;
        } else if (ctrl.reducedMotion && elapsedSim === 0) {
          elapsedSim = 2.4;
        }

        controller.updateAndRender(renderer, rawDt, elapsedSim, inputState, ctrl, wallDt);

        // Throttle telemetry updates to ~4Hz so React UI stays effortless
        if (now - lastTelemetryTime > 260) {
          lastTelemetryTime = now;
          const { fps, frameTimeMs } = qualityManager.getMeasuredStats();
          const activeEff = controller.getActiveEffect();
          onTelemetryUpdateRef.current({
            fps,
            frameTimeMs,
            activeEffectId: activeEff.id,
            activeEffectLabel: activeEff.label,
            inTransition: controller.isInTransition(),
            transitionFamily: controller.transitionFamilyName,
            width: renderer.domElement.width,
            height: renderer.domElement.height,
            dpr: Math.round(currentDpr * 100) / 100,
            qualityTier: ctrl.quality,
            effectiveQuality: qSettings.effectiveTier,
            isSoftwareGl,
            drawCalls: renderer.info.render.calls,
            triangles: renderer.info.render.triangles,
            textures: renderer.info.memory.textures,
            geometries: renderer.info.memory.geometries,
            pointerUv: [
              Math.round(inputState.x * 100) / 100,
              Math.round(inputState.y * 100) / 100,
            ],
            pointerSpeed: Math.round(inputState.speed * 100) / 100,
          });
        }
      }

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
      inputField.detach();
      controller.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 h-full w-full overflow-hidden">
      {/* Dedicated empty mount ref for Three.js WebGLRenderer */}
      <div
        ref={mountRef}
        className="h-full w-full"
        aria-label="Interactive Three.js WebGL material background"
      />

      {/* Graceful static fallback if WebGL2 is unavailable or context is lost */}
      {webglUnavailable && (
        <div
          className="absolute inset-0 flex flex-col justify-end p-8 transition-colors duration-700"
          style={{
            background: `radial-gradient(circle at 68% 45%, ${activePalette.swatches[0]}55 0%, ${activePalette.swatches[1]}44 35%, ${activePalette.swatches[2]}33 65%, ${activePalette.bgHex} 100%)`,
          }}
          data-testid="webgl-fallback"
        >
          <div className="max-w-md rounded-lg border border-white/15 bg-[#0b0d14]/90 p-4 text-xs text-white/80">
            <p className="font-semibold text-white">WebGL2 Hardware Context Unavailable</p>
            <p className="mt-1 text-white/65">
              Displaying calibrated static chromatic fallback for {activePalette.name}. Enable WebGL2
              to interact with the live GPU shader field.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
