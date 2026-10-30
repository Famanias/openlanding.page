import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  MORTA_ASSETS,
  computeHouseRingStudyPose,
} from '../utils/mortaLogic';
import {
  buildReliquaryRingModel,
  createDarkJewelleryStudioEnv,
  detectSoftwareGl,
  ReliquaryRingParts,
} from '../utils/reliquaryRingBuilder';
import { MortaImage } from './MortaImage';

interface HouseRingStudy3DProps {
  reducedMotion: boolean;
}

export const HouseRingStudy3D: React.FC<HouseRingStudy3DProps> = ({
  reducedMotion,
}) => {
  const figureRef = useRef<HTMLElement | null>(null);
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const [webglUnavailable, setWebglUnavailable] = useState<boolean>(false);
  const [showReferenceOverlay, setShowReferenceOverlay] =
    useState<boolean>(false);
  const [viewModified, setViewModified] = useState<boolean>(false);
  const [azimuthDeg, setAzimuthDeg] = useState<number>(40);
  const [elevationDeg, setElevationDeg] = useState<number>(23);

  const stateRef = useRef({
    reducedMotion,
    isInViewport: true,
    hasEnteredViewport: false,
    enterStartTime: 0,
    userAzimuthOffset: 0,
    userElevationOffset: 0,
    userHasInteracted: false,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    dragStartAzimuth: 0,
    dragStartElevation: 0,
    requestRender: () => {},
  });

  stateRef.current.reducedMotion = reducedMotion;

  const adjustStudyAngle = useCallback(
    (deltaAzimuthRad: number, deltaElevationRad: number) => {
      const st = stateRef.current;
      st.userHasInteracted = true;
      st.userAzimuthOffset = THREE.MathUtils.clamp(
        st.userAzimuthOffset + deltaAzimuthRad,
        -Math.PI * 1.25,
        Math.PI * 1.25
      );
      st.userElevationOffset = THREE.MathUtils.clamp(
        st.userElevationOffset + deltaElevationRad,
        -0.68,
        0.78
      );
      setViewModified(
        Math.abs(st.userAzimuthOffset) > 0.01 ||
          Math.abs(st.userElevationOffset) > 0.01
      );
      st.requestRender();
    },
    []
  );

  const resetStudyView = useCallback(() => {
    const st = stateRef.current;
    st.userAzimuthOffset = 0;
    st.userElevationOffset = 0;
    st.userHasInteracted = false;
    setViewModified(false);
    st.requestRender();
  }, []);

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareGl();
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: true,
        preserveDrawingBuffer: true,
      });
    } catch {
      setWebglUnavailable(true);
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2)
    );
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // Transparent clear color so the subtle circular calibration guides behind the canvas remain visible
    renderer.setClearColor(0x000000, 0);

    const width = Math.max(260, container.clientWidth || 440);
    const height = Math.max(260, container.clientHeight || 440);
    renderer.setSize(width, height, false);

    const canvas = renderer.domElement;
    canvas.className = 'w-full h-full block select-none relative z-10';
    canvas.style.touchAction = 'pan-y';
    container.innerHTML = '';
    container.appendChild(canvas);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(33, width / height, 0.1, 40);

    // Shared Dark Jewellery Studio Environment Reflection
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const studioEnv = createDarkJewelleryStudioEnv();
    const envTarget = pmremGenerator.fromScene(studioEnv.scene, 0.035);
    scene.environment = envTarget.texture;
    studioEnv.dispose();
    pmremGenerator.dispose();

    // Monochrome 3-Point Studio Lighting calibrated for 925 Sterling Silver
    const hemiLight = new THREE.HemisphereLight(0xd8e0ec, 0x0c0d10, 0.40);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffdf8, 2.25);
    keyLight.position.set(-3.2, 4.8, 4.4);
    scene.add(keyLight);

    const shoulderRimLight = new THREE.DirectionalLight(0xdce5f5, 1.90);
    shoulderRimLight.position.set(4.8, 1.6, 2.4);
    scene.add(shoulderRimLight);

    const backRimLight = new THREE.DirectionalLight(0xffffff, 1.45);
    backRimLight.position.set(0.4, -2.4, -4.4);
    scene.add(backRimLight);

    // Build the shared 5-part Reliquary Ring Model in its locked, assembled state
    const maxAniso = renderer.capabilities.getMaxAnisotropy() || 1;
    const ringModel: ReliquaryRingParts = buildReliquaryRingModel(maxAniso);
    // Hide the 3D axis lines because this study uses the subtle circular background reticle
    ringModel.guideLines.visible = false;
    scene.add(ringModel.rootGroup);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const baseRootY = 0;
    let frameId = 0;
    let renderBusy = false;
    let renderDirty = false;
    let lastHudUpdate = 0;

    stateRef.current.enterStartTime = performance.now();

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

    function applyPoseAndRender(now: number) {
      const st = stateRef.current;
      // Under software WebGL, treat initial pose as settled (elapsedSec = 2.0) so screenshots are immediately crisp and stable
      const elapsedSec = isSoftwareGl
        ? 2.0
        : Math.max(0, (now - st.enterStartTime) / 1000);

      const pose = computeHouseRingStudyPose(
        elapsedSec,
        st.userAzimuthOffset,
        st.userElevationOffset,
        st.reducedMotion || isSoftwareGl,
        st.userHasInteracted
      );

      ringModel.rootGroup.position.set(0, baseRootY + pose.settleOffsetY, 0);

      const cosElev = Math.cos(pose.elevation);
      const camX = Math.sin(pose.azimuth) * cosElev * pose.distance;
      const camY = Math.sin(pose.elevation) * pose.distance;
      const camZ = Math.cos(pose.azimuth) * cosElev * pose.distance;

      camera.position.set(camX, camY, camZ);
      camera.lookAt(0.05, 0.02, -0.02);

      if (now - lastHudUpdate > 140) {
        lastHudUpdate = now;
        setAzimuthDeg(Math.round((pose.azimuth * 180) / Math.PI));
        setElevationDeg(Math.round((pose.elevation * 180) / Math.PI));
      }

      renderer.render(scene, camera);
    }

    function requestRender() {
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      frameId = requestAnimationFrame((now) => {
        renderDirty = false;
        applyPoseAndRender(now);

        const st = stateRef.current;
        const shouldContinueLoop =
          st.isInViewport &&
          !st.reducedMotion &&
          !isSoftwareGl &&
          !st.userHasInteracted;

        const done = () => {
          renderBusy = false;
          if (renderDirty || shouldContinueLoop) {
            requestRender();
          }
        };

        if (isSoftwareGl) {
          afterDraw(done);
        } else {
          done();
        }
      });
    }

    stateRef.current.requestRender = requestRender;

    // Draw initial frame 0 synchronously so the canvas is immediately populated on mount
    applyPoseAndRender(performance.now());
    requestRender();

    // IntersectionObserver to trigger entrance settle on viewport entry and pause when off-screen
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const st = stateRef.current;
        const wasInViewport = st.isInViewport;
        st.isInViewport = entry.isIntersecting;

        if (entry.isIntersecting && !st.hasEnteredViewport) {
          st.hasEnteredViewport = true;
          st.enterStartTime = performance.now();
        }
        if (entry.isIntersecting && !wasInViewport) {
          requestRender();
        }
      },
      { threshold: 0.12 }
    );

    if (figureRef.current) {
      intersectionObserver.observe(figureRef.current);
    }

    // ResizeObserver for responsive sizing
    const handleResize = () => {
      if (!container) return;
      const w = Math.max(260, container.clientWidth || 440);
      const h = Math.max(260, container.clientHeight || 440);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      applyPoseAndRender(performance.now());
      requestRender();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Pointer drag handlers for 3D inspection (does not capture wheel or vertical touch scroll)
    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      const st = stateRef.current;
      st.isDragging = true;
      st.userHasInteracted = true;
      st.dragStartX = e.clientX;
      st.dragStartY = e.clientY;
      st.dragStartAzimuth = st.userAzimuthOffset;
      st.dragStartElevation = st.userElevationOffset;
      canvas.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      const st = stateRef.current;
      if (!st.isDragging) return;
      const dx = e.clientX - st.dragStartX;
      const dy = e.clientY - st.dragStartY;
      st.userAzimuthOffset = THREE.MathUtils.clamp(
        st.dragStartAzimuth - dx * 0.0085,
        -Math.PI * 1.25,
        Math.PI * 1.25
      );
      st.userElevationOffset = THREE.MathUtils.clamp(
        st.dragStartElevation + dy * 0.0065,
        -0.68,
        0.78
      );
      setViewModified(
        Math.abs(st.userAzimuthOffset) > 0.01 ||
          Math.abs(st.userElevationOffset) > 0.01
      );
      requestRender();
    };

    const onPointerUp = (e: PointerEvent) => {
      stateRef.current.isDragging = false;
      canvas.releasePointerCapture?.(e.pointerId);
    };

    const onContextLost = (e: Event) => {
      e.preventDefault();
      setWebglUnavailable(true);
    };
    const onContextRestored = () => {
      setWebglUnavailable(false);
      requestRender();
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);
    canvas.addEventListener('webglcontextlost', onContextLost);
    canvas.addEventListener('webglcontextrestored', onContextRestored);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      ringModel.dispose();
      envTarget.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    stateRef.current.requestRender();
  }, [reducedMotion]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = 0.18;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      adjustStudyAngle(-step, 0);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      adjustStudyAngle(step, 0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      adjustStudyAngle(0, step * 0.75);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      adjustStudyAngle(0, -step * 0.75);
    } else if (e.key === 'r' || e.key === 'R' || e.key === 'Home') {
      e.preventDefault();
      resetStudyView();
    }
  };

  return (
    <figure
      ref={figureRef}
      className="relative border border-white/25 bg-black flex flex-col"
    >
      {/* Top Catalogue Header Bar */}
      <div className="px-5 sm:px-7 py-4 border-b border-white/15 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-white/70 tracking-[0.16em]">
        <span>FIG. 01 · 3D MATERIAL &amp; FORM STUDY</span>
        <span className="tabular-nums">
          SCALE 2 : 1 · {azimuthDeg}° / {elevationDeg}°
        </span>
      </div>

      {/* Interactive 3D Study Stage with Subtle Background Calibration Reticle */}
      <div
        tabIndex={0}
        role="region"
        aria-label="Interactive 3D material and form study of the Reliquary signet ring in 925 sterling silver. Use Left, Right, Up, and Down arrow keys or drag to inspect the ring from different angles."
        onKeyDown={handleKeyDown}
        data-testid="house-3d-study-viewport"
        data-view-modified={viewModified ? 'true' : 'false'}
        className="relative w-full aspect-square max-h-[460px] bg-black overflow-hidden cursor-grab active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
      >
        {/* Subtle Circular Guides & Crosshairs Behind the 3D Model (Decorative, out of accessibility tree) */}
        {!webglUnavailable && !showReferenceOverlay && (
          <svg
            viewBox="0 0 360 360"
            className="pointer-events-none absolute inset-0 w-full h-full text-white z-0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Axis hairlines */}
            <line
              x1="180"
              y1="20"
              x2="180"
              y2="340"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="3 6"
              opacity="0.22"
            />
            <line
              x1="20"
              y1="180"
              x2="340"
              y2="180"
              stroke="currentColor"
              strokeWidth="0.5"
              strokeDasharray="3 6"
              opacity="0.22"
            />
            {/* Outer & inner calibration rings framing the 3D piece */}
            <circle
              cx="180"
              cy="180"
              r="146"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.18"
            />
            <circle
              cx="180"
              cy="180"
              r="108"
              stroke="currentColor"
              strokeWidth="0.6"
              strokeDasharray="2 5"
              opacity="0.24"
            />
            {/* Corner datum ticks */}
            <path
              d="M32 48 V32 H48 M312 32 H328 V48 M32 312 V328 H48 M312 328 H328 V312"
              stroke="currentColor"
              strokeWidth="0.7"
              opacity="0.28"
            />
          </svg>
        )}

        {/* Dedicated Three.js Canvas Mount */}
        <div
          ref={canvasMountRef}
          className={`w-full h-full relative z-10 ${
            webglUnavailable || showReferenceOverlay ? 'hidden' : 'block'
          }`}
        />

        {/* Static Reference / No-WebGL Fallback */}
        {(webglUnavailable || showReferenceOverlay) && (
          <div className="w-full h-full flex flex-col items-center justify-center bg-black p-6 relative z-10">
            <MortaImage
              asset={MORTA_ASSETS.reliquaryRing}
              priority={false}
              className="w-full max-w-[320px] border border-white/20"
            />
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-white/75 text-center">
              {webglUnavailable
                ? 'STATIC STUDY FALLBACK · 01 RELIQUARY SIGNET (925 STERLING)'
                : 'REFERENCE PHOTOGRAPH · 01 RELIQUARY SIGNET'}
            </p>
          </div>
        )}

        {/* Unobtrusive Inspection Prompt */}
        {!webglUnavailable && !showReferenceOverlay && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-4 top-3 z-20 flex items-center justify-between gap-2 text-[10px] sm:text-[11px] font-mono text-white/55 tracking-[0.12em]"
          >
            <span className="truncate">925 STERLING SILVER</span>
            <span className="hidden sm:inline">
              DRAG OR USE ARROW KEYS TO INSPECT
            </span>
            <span className="sm:hidden">DRAG / ARROWS</span>
          </div>
        )}
      </div>

      {/* Accessible Camera Orientation Controls */}
      <div className="px-4 sm:px-6 py-3 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 bg-black">
        <div
          role="group"
          aria-label="Reliquary study 3D orientation controls"
          className="flex flex-wrap items-center gap-1.5"
        >
          <button
            type="button"
            onClick={() => adjustStudyAngle(-0.32, 0)}
            aria-label="Rotate study ring left"
            className="px-2.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.12em] border border-white/30 text-white/85 hover:border-white hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors whitespace-nowrap shrink-0"
          >
            ← Rotate L
          </button>
          <button
            type="button"
            onClick={() => adjustStudyAngle(0.32, 0)}
            aria-label="Rotate study ring right"
            className="px-2.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.12em] border border-white/30 text-white/85 hover:border-white hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors whitespace-nowrap shrink-0"
          >
            Rotate R →
          </button>
          <button
            type="button"
            onClick={() => adjustStudyAngle(0, 0.22)}
            aria-label="Tilt study ring up"
            className="px-2.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.12em] border border-white/30 text-white/85 hover:border-white hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors whitespace-nowrap shrink-0"
          >
            ↑ Tilt Up
          </button>
          <button
            type="button"
            onClick={() => adjustStudyAngle(0, -0.22)}
            aria-label="Tilt study ring down"
            className="px-2.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.12em] border border-white/30 text-white/85 hover:border-white hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors whitespace-nowrap shrink-0"
          >
            ↓ Tilt Down
          </button>
          <button
            type="button"
            onClick={resetStudyView}
            disabled={!viewModified}
            aria-label="Reset study ring to original three-quarter view"
            className={`px-2.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.12em] border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
              viewModified
                ? 'bg-white text-black border-white hover:bg-black hover:text-white'
                : 'border-white/15 text-white/40 cursor-not-allowed'
            }`}
          >
            Reset view
          </button>
        </div>

        <button
          type="button"
          onClick={() => setShowReferenceOverlay((prev) => !prev)}
          aria-pressed={showReferenceOverlay}
          aria-label={
            showReferenceOverlay
              ? 'Return to 3D ring study'
              : 'View reference photograph for Reliquary ring study'
          }
          className="px-2.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.12em] border border-white/30 text-white/80 hover:border-white hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors whitespace-nowrap shrink-0"
        >
          {showReferenceOverlay ? 'Return to 3D' : 'Reference plate'}
        </button>
      </div>

      {/* Catalogue Caption Footer */}
      <figcaption className="px-5 sm:px-7 py-3.5 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-white/70">
        <span>STUDY I — 01 RELIQUARY SIGNET (THE UNSET CHAMBER)</span>
        <span className="tabular-nums">VOID Ø 18.2 MM · 24.6 G</span>
      </figcaption>
    </figure>
  );
};
