'use client';
/* eslint-disable react-hooks/immutability */

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  BASE_CAMERA_POSITION,
  BASE_CAMERA_TARGET,
  clamp,
  computeCameraRigTarget,
  dampValue,
} from '../../lib/spaceSceneMath';
import type { PointerRefState } from './CelestialLayers';

export interface SpaceCameraRigProps {
  motionEnabled: boolean;
  parallaxEnabled: boolean;
  wireframe: boolean;
  resetTrigger: number;
  isSoftwareGl: boolean;
  pointerRef: React.MutableRefObject<PointerRefState>;
  timeRef: React.MutableRefObject<number>;
}

// Scratch target vector outside render loop (zero GC)
const _currentLookAt = new THREE.Vector3(
  BASE_CAMERA_TARGET.x,
  BASE_CAMERA_TARGET.y,
  BASE_CAMERA_TARGET.z,
);

/**
 * Manages studio RoomEnvironment reflections, smooth damped camera parallax +
 * subtle drag/zoom inspection + Reset Camera, simulation time clock, and
 * non-blocking afterDraw pacing on software WebGL (SwiftShader).
 */
export function SpaceCameraRig({
  motionEnabled,
  parallaxEnabled,
  wireframe,
  resetTrigger,
  isSoftwareGl,
  pointerRef,
  timeRef,
}: SpaceCameraRigProps) {
  const { camera, gl, scene, size, invalidate } = useThree();

  const dragOffsetRef = useRef({ x: 0, y: 0, zoom: 0 });
  const isDraggingRef = useRef(false);
  const lastDragPointRef = useRef({ x: 0, y: 0 });
  const lastResetRef = useRef(resetTrigger);
  const initializedRef = useRef(false);

  // Build procedural RoomEnvironment reflections once for rich PBR shading
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const envTarget = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    // Keep reflections subtle in deep space so dark faces remain dramatic and velvety
    scene.environmentIntensity = 0.14;
    pmrem.dispose();

    return () => {
      scene.environment = null;
      envTarget.dispose();
    };
  }, [gl, scene]);

  // Set initial neutral camera framing immediately on mount
  useEffect(() => {
    if (!initializedRef.current) {
      const aspect = size.width / Math.max(1, size.height);
      const initial = computeCameraRigTarget({
        aspect,
        pointerX: 0,
        pointerY: 0,
        dragOffsetX: 0,
        dragOffsetY: 0,
        zoomOffset: 0,
        elapsedTime: 0,
        motionEnabled: false,
        parallaxEnabled: false,
      });
      camera.position.set(initial.position.x, initial.position.y, initial.position.z);
      _currentLookAt.set(initial.lookAt.x, initial.lookAt.y, initial.lookAt.z);
      camera.lookAt(_currentLookAt);
      initializedRef.current = true;
      invalidate();
    }
  }, [camera, size.width, size.height, invalidate]);

  // Reset Camera handler: smoothly return drag, zoom, and pointer offset to neutral
  useEffect(() => {
    if (resetTrigger !== lastResetRef.current) {
      lastResetRef.current = resetTrigger;
      dragOffsetRef.current.x = 0;
      dragOffsetRef.current.y = 0;
      dragOffsetRef.current.zoom = 0;
      pointerRef.current.x = 0;
      pointerRef.current.y = 0;
      invalidate();
    }
  }, [resetTrigger, pointerRef, invalidate]);

  // Re-render on demand when debug state toggles change
  useEffect(() => {
    invalidate();
  }, [motionEnabled, parallaxEnabled, wireframe, size.width, size.height, invalidate]);

  // Subtle pointer parallax + gentle optional drag/wheel exploration (zero React state updates)
  useEffect(() => {
    const domEl = gl.domElement;

    const handleWindowPointerMove = (e: PointerEvent) => {
      const nx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      const ny = -((e.clientY / Math.max(1, window.innerHeight)) * 2 - 1);
      pointerRef.current.x = clamp(nx, -1, 1);
      pointerRef.current.y = clamp(ny, -1, 1);

      if (isDraggingRef.current) {
        const dx = (e.clientX - lastDragPointRef.current.x) / Math.max(1, window.innerWidth);
        const dy = (e.clientY - lastDragPointRef.current.y) / Math.max(1, window.innerHeight);
        lastDragPointRef.current.x = e.clientX;
        lastDragPointRef.current.y = e.clientY;
        dragOffsetRef.current.x = clamp(dragOffsetRef.current.x - dx * 7.5, -4.5, 4.5);
        dragOffsetRef.current.y = clamp(dragOffsetRef.current.y + dy * 5.2, -2.5, 2.5);
      }
      if (isSoftwareGl) invalidate();
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      isDraggingRef.current = true;
      lastDragPointRef.current.x = e.clientX;
      lastDragPointRef.current.y = e.clientY;
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      dragOffsetRef.current.zoom = clamp(
        dragOffsetRef.current.zoom + e.deltaY * 0.0035,
        -3.5,
        5.5,
      );
      if (isSoftwareGl) invalidate();
    };

    window.addEventListener('pointermove', handleWindowPointerMove, { passive: true });
    domEl.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    domEl.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('pointermove', handleWindowPointerMove);
      domEl.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      domEl.removeEventListener('wheel', handleWheel);
    };
  }, [gl, pointerRef, isSoftwareGl, invalidate]);

  // Software-WebGL (SwiftShader) non-blocking afterDraw pacing loop
  useEffect(() => {
    if (!isSoftwareGl) return;

    let cancelled = false;
    let timerId = 0;

    const scheduleNext = () => {
      if (cancelled) return;
      const context = gl.getContext() as WebGL2RenderingContext | null;
      if (context && typeof context.fenceSync === 'function') {
        const sync = context.fenceSync(context.SYNC_GPU_COMMANDS_COMPLETE, 0);
        context.flush();
        const poll = () => {
          if (cancelled) {
            if (sync) context.deleteSync(sync);
            return;
          }
          const status = sync ? context.getSyncParameter(sync, context.SYNC_STATUS) : context.SIGNALED;
          if (status === context.UNSIGNALED) {
            timerId = window.setTimeout(poll, 8);
          } else {
            if (sync) context.deleteSync(sync);
            timerId = window.setTimeout(() => {
              if (!cancelled && motionEnabled) {
                invalidate();
                scheduleNext();
              }
            }, 85);
          }
        };
        timerId = window.setTimeout(poll, 8);
      } else {
        timerId = window.setTimeout(() => {
          if (!cancelled && motionEnabled) {
            invalidate();
            scheduleNext();
          }
        }, 100);
      }
    };

    if (motionEnabled) {
      invalidate();
      scheduleNext();
    }

    return () => {
      cancelled = true;
      window.clearTimeout(timerId);
    };
  }, [isSoftwareGl, motionEnabled, gl, invalidate]);

  useFrame((_, delta) => {
    const safeDelta = clamp(delta, 0, 0.08);
    if (motionEnabled) {
      timeRef.current += safeDelta;
    }

    const aspect = size.width / Math.max(1, size.height);
    const target = computeCameraRigTarget({
      aspect,
      pointerX: pointerRef.current.x,
      pointerY: pointerRef.current.y,
      dragOffsetX: dragOffsetRef.current.x,
      dragOffsetY: dragOffsetRef.current.y,
      zoomOffset: dragOffsetRef.current.zoom,
      elapsedTime: timeRef.current,
      motionEnabled,
      parallaxEnabled,
    });

    const dampSpeed = 3.8;
    camera.position.x = dampValue(camera.position.x, target.position.x, dampSpeed, safeDelta);
    camera.position.y = dampValue(camera.position.y, target.position.y, dampSpeed, safeDelta);
    camera.position.z = dampValue(camera.position.z, target.position.z, dampSpeed, safeDelta);

    _currentLookAt.x = dampValue(_currentLookAt.x, target.lookAt.x, dampSpeed, safeDelta);
    _currentLookAt.y = dampValue(_currentLookAt.y, target.lookAt.y, dampSpeed, safeDelta);
    _currentLookAt.z = dampValue(_currentLookAt.z, target.lookAt.z, dampSpeed, safeDelta);
    camera.lookAt(_currentLookAt);

    // On software WebGL when motion is paused, keep stepping until camera settles
    if (isSoftwareGl && !motionEnabled) {
      const dist =
        Math.abs(camera.position.x - target.position.x) +
        Math.abs(camera.position.y - target.position.y) +
        Math.abs(camera.position.z - target.position.z);
      if (dist > 0.015) {
        window.setTimeout(() => invalidate(), 60);
      }
    }
  });

  // Expose base pose reference for clean external inspection
  void BASE_CAMERA_POSITION;

  return null;
}
