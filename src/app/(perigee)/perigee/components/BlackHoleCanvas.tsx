"use client";

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
