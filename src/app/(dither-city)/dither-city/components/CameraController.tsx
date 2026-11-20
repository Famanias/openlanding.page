'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { computeCameraFrame } from '../lib/cityConfig';

interface CameraControllerProps {
  parallaxEnabled: boolean;
  scrollProgress: number;
  resetCameraToken: number;
  onPlanetTransform?: (offset: [number, number, number], scale: number) => void;
}

const _targetPos = new THREE.Vector3();
const _targetLook = new THREE.Vector3();
const _currentLook = new THREE.Vector3(1.9, 9.8, 0.0);

export default function CameraController({
  parallaxEnabled,
  scrollProgress,
  resetCameraToken,
  onPlanetTransform,
}: CameraControllerProps) {
  const { size } = useThree();

  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const pointerCurrentRef = useRef({ x: 0, y: 0 });
  const isTouchRef = useRef(false);
  const initializedRef = useRef(false);
  const lastAspectRef = useRef(-1);

  // Detect coarse pointer (touch devices) so desktop hover parallax isn't forced on mobile
  useEffect(() => {
    if (typeof window === 'undefined') return;
    isTouchRef.current =
      window.matchMedia('(pointer: coarse)').matches ||
      ('ontouchstart' in window && window.innerWidth < 900);

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const nx = (e.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
      const ny = (e.clientY / Math.max(1, window.innerHeight)) * 2 - 1;
      pointerTargetRef.current.x = THREE.MathUtils.clamp(nx, -1, 1);
      pointerTargetRef.current.y = THREE.MathUtils.clamp(ny, -1, 1);
    };

    const handlePointerLeave = () => {
      pointerTargetRef.current.x = 0;
      pointerTargetRef.current.y = 0;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  // Reset camera smoothly when triggered from debug panel
  useEffect(() => {
    if (resetCameraToken > 0) {
      pointerTargetRef.current.x = 0;
      pointerTargetRef.current.y = 0;
    }
  }, [resetCameraToken]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const aspect = size.width / Math.max(1, size.height);
    const activeCamera = state.camera;

    // Smooth exponential damping for pointer parallax
    const damp = 1 - Math.exp(-5.2 * dt);
    const targetPx = parallaxEnabled && !isTouchRef.current ? pointerTargetRef.current.x : 0;
    const targetPy = parallaxEnabled && !isTouchRef.current ? pointerTargetRef.current.y : 0;

    pointerCurrentRef.current.x += (targetPx - pointerCurrentRef.current.x) * damp;
    pointerCurrentRef.current.y += (targetPy - pointerCurrentRef.current.y) * damp;

    const frame = computeCameraFrame({
      aspect,
      pointerX: pointerCurrentRef.current.x,
      pointerY: pointerCurrentRef.current.y,
      scrollProgress,
      parallaxEnabled,
      isTouchDevice: isTouchRef.current,
    });

    // Notify planet responsive transform only when aspect meaningfully changes
    if (onPlanetTransform && Math.abs(aspect - lastAspectRef.current) > 0.015) {
      lastAspectRef.current = aspect;
      onPlanetTransform(frame.planetOffset, frame.planetScale);
    }

    _targetPos.set(frame.position[0], frame.position[1], frame.position[2]);
    _targetLook.set(frame.lookAt[0], frame.lookAt[1], frame.lookAt[2]);

    if (!initializedRef.current) {
      activeCamera.position.copy(_targetPos);
      _currentLook.copy(_targetLook);
      initializedRef.current = true;
    } else {
      const camDamp = 1 - Math.exp(-6.5 * dt);
      activeCamera.position.lerp(_targetPos, camDamp);
      _currentLook.lerp(_targetLook, camDamp);
    }

    if (activeCamera instanceof THREE.PerspectiveCamera) {
      if (Math.abs(activeCamera.fov - frame.fov) > 0.05) {
        activeCamera.fov = THREE.MathUtils.lerp(activeCamera.fov, frame.fov, 1 - Math.exp(-8 * dt));
        activeCamera.updateProjectionMatrix();
      }
    }

    activeCamera.lookAt(_currentLook);
  });

  return null;
}
