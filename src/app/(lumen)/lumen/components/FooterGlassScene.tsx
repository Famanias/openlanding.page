import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createFooterParticles } from './FooterParticles';
import { createFooterDroplets } from './FooterDroplets';

interface FooterGlassSceneProps {
  onReadyChange: (ready: boolean) => void;
}

/** An image-derived relief mesh. Its depth is estimated from the generated artwork. */
export const FooterGlassScene: React.FC<FooterGlassSceneProps> = ({ onReadyChange }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      onReadyChange(false);
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.domElement.className = 'block h-full w-full';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-2.4, 2.4, 1, -1, 0.1, 30);
    camera.position.z = 10;
    const motion = { value: 0 };
    const localPointer = { value: new THREE.Vector2(0, 0) };
    const pointerStrength = { value: 0 };
    const pointerTarget = new THREE.Vector2(0, 0);
    let targetStrength = 0;
    const particles = createFooterParticles(motion, renderer.getPixelRatio(), localPointer, pointerStrength);
    const droplets = createFooterDroplets();
    scene.add(particles, droplets.group);
    let sculpture: THREE.Group | null = null;
    let disposed = false;
    let frameId = 0;
    let lastFrame = 0;
    let elapsed = 0;
    const pointer = { x: 0, y: 0 };
    const currentPointer = { x: 0, y: 0 };

    const resize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      const aspect = width / height;
      const viewHeight = Math.max(2, 4.8 / aspect);
      const viewWidth = viewHeight * aspect;
      renderer.setSize(width, height, false);
      camera.left = -viewWidth / 2;
      camera.right = viewWidth / 2;
      camera.top = viewHeight / 2;
      camera.bottom = -viewHeight / 2;
      camera.updateProjectionMatrix();
      const offsetX = (viewWidth - 4.8) / 2;
      const offsetY = -(viewHeight - 2) / 2;
      particles.position.set(offsetX, offsetY, 0);
      droplets.group.position.set(offsetX, offsetY, 0);
      if (sculpture) sculpture.position.set(offsetX, offsetY, 0);
    };

    const disposeModel = (model: THREE.Object3D) => {
      model.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => {
          if (material instanceof THREE.MeshBasicMaterial && material.map) {
            const image = material.map.source.data;
            if (typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap) image.close();
            material.map.dispose();
          }
          material.dispose();
        });
      });
    };

    const pointInArtwork = (clientX: number, clientY: number) => {
      const rect = mount.getBoundingClientRect();
      const footer = mount.closest('footer')?.getBoundingClientRect();
      if (
        rect.width === 0 || rect.height === 0 ||
        clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom ||
        !footer || clientX < footer.left || clientX > footer.right || clientY < footer.top || clientY > footer.bottom
      ) return null;
      return {
        x: camera.left + ((clientX - rect.left) / rect.width) * (camera.right - camera.left) - particles.position.x,
        y: camera.top - ((clientY - rect.top) / rect.height) * (camera.top - camera.bottom) - particles.position.y,
      };
    };
    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / Math.max(1, window.innerWidth) - 0.5) * 2;
      pointer.y = (event.clientY / Math.max(1, window.innerHeight) - 0.5) * 2;
      const point = pointInArtwork(event.clientX, event.clientY);
      if (point) {
        pointerTarget.set(point.x, point.y);
        if (pointerStrength.value < 0.01) localPointer.value.copy(pointerTarget);
        targetStrength = 1;
      } else {
        targetStrength = 0;
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || (event.target instanceof Element && event.target.closest('a, button, input, textarea, select, [role="button"]'))) return;
      const point = pointInArtwork(event.clientX, event.clientY);
      if (point) droplets.burst(point.x, point.y, elapsed);
    };
    const onPointerEnd = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') targetStrength = 0;
    };
    const clearPointer = () => { targetStrength = 0; };
    const onPointerOut = (event: PointerEvent) => {
      if (!event.relatedTarget) clearPointer();
    };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      onReadyChange(false);
    };
    const onContextRestored = () => {
      if (sculpture) {
        renderer.render(scene, camera);
        onReadyChange(true);
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerEnd, { passive: true });
    window.addEventListener('pointercancel', onPointerEnd, { passive: true });
    window.addEventListener('pointerout', onPointerOut, { passive: true });
    window.addEventListener('blur', clearPointer);
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);
    renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();

    const animate = (now: number) => {
      if (disposed) return;
      frameId = requestAnimationFrame(animate);
      if (document.hidden || now - lastFrame < 33) return;
      const delta = lastFrame ? Math.min((now - lastFrame) / 1000, 0.1) : 0;
      lastFrame = now;
      elapsed += delta;
      motion.value = elapsed;
      currentPointer.x += (pointer.x - currentPointer.x) * Math.min(1, delta * 2);
      currentPointer.y += (pointer.y - currentPointer.y) * Math.min(1, delta * 2);
      localPointer.value.lerp(pointerTarget, Math.min(1, delta * 5));
      pointerStrength.value += (targetStrength - pointerStrength.value) * Math.min(1, delta * 5);
      droplets.update(elapsed, localPointer.value, pointerStrength.value);
      if (sculpture) {
        sculpture.rotation.y = Math.sin(elapsed * 0.31) * 0.055 + currentPointer.x * 0.025;
        sculpture.rotation.x = Math.sin(elapsed * 0.23) * 0.025 + currentPointer.y * 0.015;
        renderer.render(scene, camera);
      }
    };

    new GLTFLoader().load(
      '/templates/lumen/footer-glass-mesh.glb',
      (gltf) => {
        if (disposed) {
          disposeModel(gltf.scene);
          return;
        }
        sculpture = gltf.scene;
        sculpture.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          object.geometry.computeVertexNormals();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => {
            material.depthWrite = true;
            material.alphaTest = 0.01;
            material.onBeforeCompile = (shader: THREE.WebGLProgramParametersWithUniforms) => {
              shader.uniforms.uFooterTime = motion;
              shader.vertexShader = `uniform float uFooterTime;\nvarying vec3 vFooterNormal;\n${shader.vertexShader}`.replace(
                '#include <begin_vertex>',
                `#include <begin_vertex>
                vFooterNormal = normalize(normalMatrix * normal);
                float drift = sin(position.x * 1.6 + position.y * 1.3 + uFooterTime * 0.65);
                transformed.z += drift * 0.11;
                transformed.y += sin(position.x * 1.2 - uFooterTime * 0.42) * 0.035;`
              );
              shader.fragmentShader = `uniform float uFooterTime;\nvarying vec3 vFooterNormal;\n${shader.fragmentShader}`.replace(
                '#include <map_fragment>',
                `#include <map_fragment>
                vec3 lightDirection = normalize(vec3(sin(uFooterTime * 0.24) * 0.45, 0.35, 1.0));
                float glint = pow(max(dot(normalize(vFooterNormal), lightDirection), 0.0), 12.0);
                diffuseColor.rgb += glint * 0.055;`
              );
            };
            material.needsUpdate = true;
          });
        });
        scene.add(sculpture);
        resize();
        droplets.update(0, localPointer.value, 0);
        renderer.render(scene, camera);
        onReadyChange(true);
        frameId = requestAnimationFrame(animate);
      },
      undefined,
      () => {
        if (!disposed) onReadyChange(false);
      }
    );

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerEnd);
      window.removeEventListener('pointercancel', onPointerEnd);
      window.removeEventListener('pointerout', onPointerOut);
      window.removeEventListener('blur', clearPointer);
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);
      if (sculpture) disposeModel(sculpture);
      particles.geometry.dispose();
      particles.material.dispose();
      droplets.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, [onReadyChange]);

  return <div ref={mountRef} aria-hidden="true" data-mode="live" className="absolute inset-0" />;
};
