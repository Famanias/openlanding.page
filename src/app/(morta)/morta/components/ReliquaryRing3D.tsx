import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Assembly3DState, MORTA_ASSETS } from '../utils/mortaLogic';
import {
  buildReliquaryRingModel,
  createDarkJewelleryStudioEnv,
  detectSoftwareGl,
  ReliquaryRingParts,
} from '../utils/reliquaryRingBuilder';
import { MortaImage } from './MortaImage';

interface ReliquaryRing3DProps {
  assembly3D: Assembly3DState;
  reducedMotion: boolean;
}

export const ReliquaryRing3D: React.FC<ReliquaryRing3DProps> = ({
  assembly3D,
  reducedMotion,
}) => {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const [webglUnavailable, setWebglUnavailable] = useState<boolean>(false);
  const [showReferenceOverlay, setShowReferenceOverlay] =
    useState<boolean>(false);
  const [viewModified, setViewModified] = useState<boolean>(false);
  const [azimuthDeg, setAzimuthDeg] = useState<number>(37);
  const [elevationDeg, setElevationDeg] = useState<number>(18);

  // Mutable ref holding latest props & user camera offset so we never tear down the WebGL context
  const stateRef = useRef({
    targetAssembly: assembly3D,
    reducedMotion,
    userAzimuthOffset: 0,
    userElevationOffset: 0,
    userZoomOffset: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    dragStartAzimuth: 0,
    dragStartElevation: 0,
    requestRender: () => {},
  });

  stateRef.current.targetAssembly = assembly3D;
  stateRef.current.reducedMotion = reducedMotion;

  const adjustInspectionAngle = useCallback(
    (deltaAzimuthRad: number, deltaElevationRad: number) => {
      const st = stateRef.current;
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

  const resetInspectionView = useCallback(() => {
    const st = stateRef.current;
    st.userAzimuthOffset = 0;
    st.userElevationOffset = 0;
    st.userZoomOffset = 0;
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
    renderer.toneMappingExposure = 1.05;
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2)
    );
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);

    const width = Math.max(280, container.clientWidth || 520);
    const height = Math.max(280, container.clientHeight || 520);
    renderer.setSize(width, height, false);

    const canvas = renderer.domElement;
    canvas.className = 'w-full h-full block select-none';
    canvas.style.touchAction = 'pan-y';
    container.innerHTML = '';
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.038);

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 40);

    // High-contrast Dark Jewellery Studio Environment Reflection
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const studioEnv = createDarkJewelleryStudioEnv();
    const envTarget = pmremGenerator.fromScene(studioEnv.scene, 0.035);
    scene.environment = envTarget.texture;
    studioEnv.dispose();
    pmremGenerator.dispose();

    // Controlled 3-Point Studio Lighting for Sterling Silver against Black
    const hemiLight = new THREE.HemisphereLight(0xd8e0ec, 0x0c0d10, 0.38);
    scene.add(hemiLight);

    // 1. Key Light (upper-left front softbox direction)
    const keyLight = new THREE.DirectionalLight(0xfffdf8, 2.2);
    keyLight.position.set(-3.2, 4.8, 4.4);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.set(1024, 1024);
      keyLight.shadow.camera.near = 1;
      keyLight.shadow.camera.far = 14;
      const d = 2.6;
      keyLight.shadow.camera.left = -d;
      keyLight.shadow.camera.right = d;
      keyLight.shadow.camera.top = d;
      keyLight.shadow.camera.bottom = -d;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    // 2. Grazing Right Shoulder Light (rakes across the intaglio gothic trefoil engraving and inner hoop)
    const shoulderRimLight = new THREE.DirectionalLight(0xdce5f5, 1.85);
    shoulderRimLight.position.set(4.8, 1.6, 2.4);
    scene.add(shoulderRimLight);

    // 3. Back Edge Separation Rim Light (keeps dark silver silhouette legible against pure black)
    const backRimLight = new THREE.DirectionalLight(0xffffff, 1.45);
    backRimLight.position.set(0.4, -2.4, -4.4);
    scene.add(backRimLight);

    // Soft radial contact shadow disc grounding the ring from below
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d');
    if (sCtx) {
      const grad = sCtx.createRadialGradient(64, 64, 6, 64, 64, 62);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.035)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 128, 128);
    }
    const pedestalTex = new THREE.CanvasTexture(shadowCanvas);
    const pedestalGeo = new THREE.CircleGeometry(2.3, 48);
    pedestalGeo.rotateX(-Math.PI / 2);
    pedestalGeo.translate(0, -1.28, -0.12);
    const pedestalMat = new THREE.MeshBasicMaterial({
      map: pedestalTex,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
    const pedestalMesh = new THREE.Mesh(pedestalGeo, pedestalMat);
    scene.add(pedestalMesh);

    // Build the 5-part Reliquary Ring Model
    const maxAniso = renderer.capabilities.getMaxAnisotropy() || 1;
    const ringModel: ReliquaryRingParts = buildReliquaryRingModel(maxAniso);
    scene.add(ringModel.rootGroup);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // Current interpolated state (pre-allocated to avoid GC in render loop)
    const initialTarget = stateRef.current.targetAssembly;
    const currentParts = {
      outerBezel: {
        pos: [...initialTarget.parts.outerBezel.position] as [number, number, number],
        rot: [...initialTarget.parts.outerBezel.rotation] as [number, number, number],
      },
      recessedChamber: {
        pos: [...initialTarget.parts.recessedChamber.position] as [number, number, number],
        rot: [...initialTarget.parts.recessedChamber.rotation] as [number, number, number],
      },
      leftShoulder: {
        pos: [...initialTarget.parts.leftShoulder.position] as [number, number, number],
        rot: [...initialTarget.parts.leftShoulder.rotation] as [number, number, number],
      },
      rightShoulder: {
        pos: [...initialTarget.parts.rightShoulder.position] as [number, number, number],
        rot: [...initialTarget.parts.rightShoulder.rotation] as [number, number, number],
      },
      lowerShank: {
        pos: [...initialTarget.parts.lowerShank.position] as [number, number, number],
        rot: [...initialTarget.parts.lowerShank.rotation] as [number, number, number],
      },
    };

    let currentAzimuth =
      initialTarget.cameraOrbitOffset.azimuth +
      stateRef.current.userAzimuthOffset;
    let currentElevation =
      initialTarget.cameraOrbitOffset.elevation +
      stateRef.current.userElevationOffset;
    let currentDistance =
      initialTarget.cameraOrbitOffset.distance +
      stateRef.current.userZoomOffset;

    let frameId = 0;
    let renderBusy = false;
    let renderDirty = false;
    let lastTime = performance.now();
    let lastHudUpdate = 0;

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

    function stepPart(
      curr: { pos: [number, number, number]; rot: [number, number, number] },
      targ: { position: [number, number, number]; rotation: [number, number, number] },
      group: THREE.Group,
      dt: number,
      snapImmediate: boolean
    ): number {
      let maxDelta = 0;
      for (let i = 0; i < 3; i++) {
        if (snapImmediate) {
          curr.pos[i] = targ.position[i];
          curr.rot[i] = targ.rotation[i];
        } else {
          curr.pos[i] = THREE.MathUtils.damp(
            curr.pos[i],
            targ.position[i],
            9.5,
            dt
          );
          curr.rot[i] = THREE.MathUtils.damp(
            curr.rot[i],
            targ.rotation[i],
            9.5,
            dt
          );
          maxDelta = Math.max(
            maxDelta,
            Math.abs(curr.pos[i] - targ.position[i]),
            Math.abs(curr.rot[i] - targ.rotation[i])
          );
        }
      }
      group.position.set(curr.pos[0], curr.pos[1], curr.pos[2]);
      group.rotation.set(curr.rot[0], curr.rot[1], curr.rot[2]);
      return maxDelta;
    }

    function requestRender() {
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      frameId = requestAnimationFrame((now) => {
        renderDirty = false;
        const dt = Math.min(0.06, Math.max(0.001, (now - lastTime) / 1000));
        lastTime = now;

        const st = stateRef.current;
        const target = st.targetAssembly;
        const snap = st.reducedMotion || isSoftwareGl;

        let maxResidual = 0;
        maxResidual = Math.max(
          maxResidual,
          stepPart(
            currentParts.outerBezel,
            target.parts.outerBezel,
            ringModel.outerBezel,
            dt,
            snap
          ),
          stepPart(
            currentParts.recessedChamber,
            target.parts.recessedChamber,
            ringModel.recessedChamber,
            dt,
            snap
          ),
          stepPart(
            currentParts.leftShoulder,
            target.parts.leftShoulder,
            ringModel.leftShoulder,
            dt,
            snap
          ),
          stepPart(
            currentParts.rightShoulder,
            target.parts.rightShoulder,
            ringModel.rightShoulder,
            dt,
            snap
          ),
          stepPart(
            currentParts.lowerShank,
            target.parts.lowerShank,
            ringModel.lowerShank,
            dt,
            snap
          )
        );

        const targetAzimuth =
          target.cameraOrbitOffset.azimuth + st.userAzimuthOffset;
        const targetElevation =
          target.cameraOrbitOffset.elevation + st.userElevationOffset;
        const targetDistance =
          target.cameraOrbitOffset.distance + st.userZoomOffset;

        if (snap) {
          currentAzimuth = targetAzimuth;
          currentElevation = targetElevation;
          currentDistance = targetDistance;
        } else {
          currentAzimuth = THREE.MathUtils.damp(
            currentAzimuth,
            targetAzimuth,
            10,
            dt
          );
          currentElevation = THREE.MathUtils.damp(
            currentElevation,
            targetElevation,
            10,
            dt
          );
          currentDistance = THREE.MathUtils.damp(
            currentDistance,
            targetDistance,
            10,
            dt
          );
          maxResidual = Math.max(
            maxResidual,
            Math.abs(currentAzimuth - targetAzimuth),
            Math.abs(currentElevation - targetElevation),
            Math.abs(currentDistance - targetDistance)
          );
        }

        // Fade architectural guide lines out once ring is locked
        const guideMat = ringModel.guideLines.material as THREE.LineBasicMaterial;
        guideMat.opacity = (1 - target.lockProgress) * 0.24;
        ringModel.guideLines.visible = guideMat.opacity > 0.01;

        // Spherical camera coordinates looking at the ring centre
        const cosElev = Math.cos(currentElevation);
        const camX = Math.sin(currentAzimuth) * cosElev * currentDistance;
        const camY = Math.sin(currentElevation) * currentDistance;
        const camZ = Math.cos(currentAzimuth) * cosElev * currentDistance;

        camera.position.set(camX, camY, camZ);
        camera.lookAt(0.05, 0.02, -0.02);

        if (now - lastHudUpdate > 120) {
          lastHudUpdate = now;
          setAzimuthDeg(Math.round((currentAzimuth * 180) / Math.PI));
          setElevationDeg(Math.round((currentElevation * 180) / Math.PI));
        }

        renderer.render(scene, camera);

        const done = () => {
          renderBusy = false;
          if (renderDirty || maxResidual > 0.0015) {
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

    // Apply initial pose and draw frame 0 synchronously so the canvas is never blank on initial mount
    stepPart(
      currentParts.outerBezel,
      initialTarget.parts.outerBezel,
      ringModel.outerBezel,
      0.016,
      true
    );
    stepPart(
      currentParts.recessedChamber,
      initialTarget.parts.recessedChamber,
      ringModel.recessedChamber,
      0.016,
      true
    );
    stepPart(
      currentParts.leftShoulder,
      initialTarget.parts.leftShoulder,
      ringModel.leftShoulder,
      0.016,
      true
    );
    stepPart(
      currentParts.rightShoulder,
      initialTarget.parts.rightShoulder,
      ringModel.rightShoulder,
      0.016,
      true
    );
    stepPart(
      currentParts.lowerShank,
      initialTarget.parts.lowerShank,
      ringModel.lowerShank,
      0.016,
      true
    );
    const initCosElev = Math.cos(currentElevation);
    camera.position.set(
      Math.sin(currentAzimuth) * initCosElev * currentDistance,
      Math.sin(currentElevation) * currentDistance,
      Math.cos(currentAzimuth) * initCosElev * currentDistance
    );
    camera.lookAt(0.05, 0.02, -0.02);
    renderer.render(scene, camera);

    requestRender();

    // Resize observer
    const handleResize = () => {
      if (!container) return;
      const w = Math.max(280, container.clientWidth || 520);
      const h = Math.max(280, container.clientHeight || 520);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
      renderer.render(scene, camera);
      requestRender();
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Pointer drag handlers for 3D inspection (does not capture wheel scroll)
    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      const st = stateRef.current;
      st.isDragging = true;
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

    // Context loss safety
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
      resizeObserver.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      ringModel.dispose();
      pedestalGeo.dispose();
      pedestalMat.dispose();
      pedestalTex.dispose();
      envTarget.dispose();
      renderer.dispose();
    };
  }, []);

  // Trigger render whenever assembly3D or reducedMotion changes
  useEffect(() => {
    stateRef.current.requestRender();
  }, [assembly3D, reducedMotion]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = 0.18;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      adjustInspectionAngle(-step, 0);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      adjustInspectionAngle(step, 0);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      adjustInspectionAngle(0, step * 0.75);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      adjustInspectionAngle(0, -step * 0.75);
    } else if (e.key === 'r' || e.key === 'R' || e.key === 'Home') {
      e.preventDefault();
      resetInspectionView();
    }
  };

  return (
    <div className="flex flex-col border border-white/25 bg-black">
      {/* Top Viewport Header Bar */}
      <div className="px-4 sm:px-6 py-3.5 border-b border-white/15 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-white/70">
        <div className="flex items-center gap-2">
          <span>FIG. 02 · 3D RELIQUARY SIGNET ASSEMBLY</span>
        </div>
        <div className="flex items-center gap-3 tabular-nums">
          <span>
            VIEW {azimuthDeg}° / {elevationDeg}°
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {assembly3D.isLocked ? 'STATUS: LOCKED' : 'STATUS: ASSEMBLING'}
          </span>
        </div>
      </div>

      {/* Interactive 3D Canvas Stage (with keyboard operation & fallback) */}
      <div
        tabIndex={0}
        role="region"
        aria-label={`Interactive 3D Reliquary signet ring assembly. Current stage: ${assembly3D.stageTitle}. Use Left, Right, Up, and Down arrow keys or drag to inspect the ring. Press R or Home to reset the view.`}
        onKeyDown={handleKeyDown}
        data-testid="reliquary-3d-viewport"
        data-stage-index={assembly3D.stageIndex}
        data-view-modified={viewModified ? 'true' : 'false'}
        className="relative w-full aspect-square max-h-[520px] morta-ring-light overflow-hidden cursor-grab active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
      >
        {/* Dedicated empty mount div for Three.js WebGL canvas */}
        <div
          ref={canvasMountRef}
          className={`w-full h-full ${
            webglUnavailable || showReferenceOverlay ? 'hidden' : 'block'
          }`}
        />

        {/* Fallback or Reference Comparison Plate */}
        {(webglUnavailable || showReferenceOverlay) && (
          <div className="w-full h-full flex flex-col items-center justify-center bg-black p-6">
            <MortaImage
              asset={MORTA_ASSETS.reliquaryRing}
              priority={false}
              className="w-full max-w-[360px] border border-white/20"
            />
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-white/75 text-center">
              {webglUnavailable
                ? 'STATIC REFERENCE FALLBACK · 01 RELIQUARY SIGNET (925 STERLING)'
                : 'REFERENCE PHOTOGRAPH · 01 RELIQUARY SIGNET'}
            </p>
          </div>
        )}

        {/* Understated corner guide callouts (pointer-events-none so they never obstruct 3D drag) */}
        {!webglUnavailable && !showReferenceOverlay && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-4 top-3 flex items-center justify-between text-[11px] font-mono text-white/55 tracking-[0.14em]"
          >
            <span>925 STERLING SILVER</span>
            <span>DRAG OR USE ARROW KEYS TO INSPECT</span>
          </div>
        )}
      </div>

      {/* Bottom Accessible Inspection & Camera Control Strip */}
      <div className="px-4 sm:px-6 py-3.5 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 bg-black">
        <button
          type="button"
          onClick={() => setShowReferenceOverlay((prev) => !prev)}
          aria-pressed={showReferenceOverlay}
          className="px-2.5 py-1.5 text-[11px] font-mono uppercase tracking-[0.12em] border border-white/30 text-white/80 hover:border-white hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors whitespace-nowrap shrink-0"
        >
          {showReferenceOverlay ? 'Return to 3D model' : 'Reference plate'}
        </button>
      </div>
    </div>
  );
};
