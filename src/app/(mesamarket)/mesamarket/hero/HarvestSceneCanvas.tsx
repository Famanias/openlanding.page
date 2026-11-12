'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import gsap from 'gsap';
import {
  CRATE_SPEC,
  PRODUCE_CATALOG,
  SOURCE_ANCHORS,
  evaluateFlightArc,
  getDefaultAnchorForProduce,
  type BasketItemInstance,
  type ProduceId,
  type SourceAnchorSpec,
} from './basketState';
import {
  buildAllProduceTextures,
  buildAnnotationTextures,
  sampleAlphaMask,
} from './artworkTextures';
import {
  buildAnnotationsGroup,
  buildProduceGroup,
  buildWoodenCrateGroup,
  type ProduceMeshUserData,
} from './sceneBuilders';

interface HarvestSceneCanvasProps {
  items: BasketItemInstance[];
  onAddProduce: (produceId: ProduceId, sourceAnchorId?: string) => void;
  onRemoveInstance: (instanceId: string) => void;
  onHoverHintChange?: (hint: string | null) => void;
}

interface SourceNodeRecord {
  spec: SourceAnchorSpec;
  group: THREE.Group;
  shadowMesh: THREE.Mesh | null;
  hitMeshes: THREE.Mesh[];
}

interface BasketNodeRecord {
  item: BasketItemInstance;
  group: THREE.Group;
  hitMeshes: THREE.Mesh[];
  landed: boolean;
  exiting: boolean;
  timeline: gsap.core.Timeline | null;
}

const isSoftwareGl = (() => {
  if (typeof document === 'undefined') return false;
  const gl = document.createElement('canvas').getContext('webgl2');
  if (!gl) return true;
  const ext = gl.getExtension('WEBGL_debug_renderer_info');
  const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
  const gpu = String(gl.getParameter(param));
  gl.getExtension('WEBGL_lose_context')?.loseContext();
  return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
})();

const _pointerNdc = new THREE.Vector2();

export default function HarvestSceneCanvas({
  items,
  onAddProduce,
  onRemoveInstance,
  onHoverHintChange,
}: HarvestSceneCanvasProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  const callbacksRef = useRef({
    onAddProduce,
    onRemoveInstance,
    onHoverHintChange,
  });
  useEffect(() => {
    callbacksRef.current = {
      onAddProduce,
      onRemoveInstance,
      onHoverHintChange,
    };
  }, [onAddProduce, onRemoveInstance, onHoverHintChange]);

  const engineRef = useRef<{
    syncItems: (nextItems: BasketItemInstance[]) => void;
  } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(
      isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2)
    );
    renderer.shadowMap.enabled = false;

    const canvas = renderer.domElement;
    canvas.className = 'w-full h-full block touch-none select-none';
    canvas.setAttribute('data-testid', 'mesa-harvest-canvas');
    container.appendChild(canvas);

    const scene = new THREE.Scene();

    // Subtle studio environment reflection per Three.js guidelines
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envRT = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;
    scene.environmentIntensity = 0.22;
    pmremGenerator.dispose();

    // Warm/cool color-temperature balanced illumination calibrated for gouache & oak planks
    const hemiLight = new THREE.HemisphereLight(0xfffcf5, 0xe8d9be, 2.35);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff5e4, 0.75);
    keyLight.position.set(-4.5, 8.5, 7.5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xf5ead6, 0.35);
    rimLight.position.set(5.5, 4.0, -4.0);
    scene.add(rimLight);

    const baseCamOffset = new THREE.Vector3(-0.06, 4.25, 9.45);
    const camLookTarget = new THREE.Vector3(-0.06, 0.16, 0.52);

    const camera = new THREE.PerspectiveCamera(31, 1, 0.1, 60);

    // Master diorama root (supports gentle 2.5D pointer parallax)
    const stageGroup = new THREE.Group();
    scene.add(stageGroup);

    const maxAnisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
    const produceTextures = buildAllProduceTextures(maxAnisotropy);
    const annotationTextures = buildAnnotationTextures(maxAnisotropy);

    const crateGroup = buildWoodenCrateGroup(maxAnisotropy);
    stageGroup.add(crateGroup);

    const annotationsGroup = buildAnnotationsGroup(annotationTextures);
    stageGroup.add(annotationsGroup);

    const basketItemsGroup = new THREE.Group();
    stageGroup.add(basketItemsGroup);

    const foregroundSourceGroup = new THREE.Group();
    stageGroup.add(foregroundSourceGroup);

    // Occluder list (crate slats & posts) so clicks on front wooden slats don't pierce through wood
    const crateOccluderMeshes: THREE.Object3D[] = [];
    crateGroup.traverse((child) => {
      if ((child as THREE.Mesh).isMesh && child.position.y > -0.78) {
        crateOccluderMeshes.push(child);
      }
    });

    // Build all 12 interactive foreground source anchors
    const sourceRecords = new Map<string, SourceNodeRecord>();
    const sourceHitMeshes: THREE.Mesh[] = [];

    for (const spec of SOURCE_ANCHORS) {
      const texSet = produceTextures[spec.produceId];
      const built = buildProduceGroup(spec.produceId, texSet, 'source', {
        anchorId: spec.anchorId,
        variant: spec.variant,
      });
      built.group.position.set(
        spec.worldPosition[0],
        spec.worldPosition[1],
        spec.worldPosition[2]
      );
      built.group.rotation.set(
        spec.worldRotation[0],
        spec.worldRotation[1],
        spec.worldRotation[2]
      );
      built.group.scale.setScalar(spec.worldScale);
      foregroundSourceGroup.add(built.group);

      sourceRecords.set(spec.anchorId, {
        spec,
        group: built.group,
        shadowMesh: built.shadowMesh,
        hitMeshes: built.hitMeshes,
      });
      sourceHitMeshes.push(...built.hitMeshes);
    }

    const basketRecords = new Map<string, BasketNodeRecord>();

    // Coalesced on-demand renderer with software-WebGL fence pacing
    let unmounted = false;
    let frameId = 0;
    let timeoutId = 0;
    let renderBusy = false;
    let renderDirty = false;

    const targetParallax = { x: 0, y: 0 };
    const currentParallax = { x: 0, y: 0 };

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== 'function') {
        timeoutId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (unmounted) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          timeoutId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          timeoutId = window.setTimeout(cb, 80);
        }
      };
      timeoutId = window.setTimeout(poll, 5);
    }

    function requestRender() {
      if (unmounted) return;
      if (renderBusy) {
        renderDirty = true;
        return;
      }
      renderBusy = true;
      frameId = requestAnimationFrame(() => {
        if (unmounted) return;
        renderDirty = false;

        // Exponentially damp subtle 2.5D stage parallax
        const dx = targetParallax.x - currentParallax.x;
        const dy = targetParallax.y - currentParallax.y;
        if (Math.abs(dx) > 0.0004 || Math.abs(dy) > 0.0004) {
          currentParallax.x += dx * 0.18;
          currentParallax.y += dy * 0.18;
          stageGroup.rotation.y = currentParallax.x * 0.045;
          stageGroup.rotation.x = currentParallax.y * 0.028;
          annotationsGroup.position.x = currentParallax.x * 0.06;
          annotationsGroup.position.y = -currentParallax.y * 0.04;
          renderDirty = true;
        }

        renderer.render(scene, camera);

        const done = () => {
          renderBusy = false;
          if (renderDirty && !unmounted) {
            requestRender();
          }
        };

        if (isSoftwareGl) afterDraw(done);
        else done();
      });
    }

    function updateSize() {
      if (!container || unmounted) return;
      const width = Math.max(1, container.clientWidth);
      const height = Math.max(1, container.clientHeight);
      const aspect = width / height;

      camera.aspect = aspect;
      // Scale distance smoothly on narrower viewports so horizontal composition never clips
      const minComfortAspect = 1.15;
      const fitScale = aspect < minComfortAspect ? minComfortAspect / aspect : 1;

      camera.position
        .copy(camLookTarget)
        .addScaledVector(
          baseCamOffset.clone().sub(camLookTarget),
          fitScale
        );
      camera.lookAt(camLookTarget);
      camera.updateProjectionMatrix();

      renderer.setSize(width, height, false);
      requestRender();
    }

    updateSize();
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    // Raycasting & Hover / Click Interaction
    const raycaster = new THREE.Raycaster();
    let hoveredKey: string | null = null;

    function getActiveRaycastTargets(): THREE.Object3D[] {
      const targets: THREE.Object3D[] = [...sourceHitMeshes, ...crateOccluderMeshes];
      for (const rec of basketRecords.values()) {
        if (rec.landed && !rec.exiting) {
          targets.push(...rec.hitMeshes);
        }
      }
      return targets;
    }

    function pickInteractiveHit(clientX: number, clientY: number): ProduceMeshUserData | null {
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return null;

      _pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      _pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(_pointerNdc, camera);
      const hits = raycaster.intersectObjects(getActiveRaycastTargets(), false);

      for (const hit of hits) {
        const uData = hit.object.userData as Partial<ProduceMeshUserData> | undefined;
        if (!uData || !uData.interactiveRole) {
          // Hit an opaque wooden crate wall before anything behind it!
          return null;
        }
        const alpha = sampleAlphaMask(uData.alphaMask, hit.uv);
        if (alpha > 42) {
          return uData as ProduceMeshUserData;
        }
      }
      return null;
    }

    function setHoverVisual(key: string | null, active: boolean) {
      if (!key) return;
      if (key.startsWith('source:')) {
        const anchorId = key.slice('source:'.length);
        const rec = sourceRecords.get(anchorId);
        if (!rec) return;
        gsap.to(rec.group.position, {
          y: rec.spec.worldPosition[1] + (active ? 0.11 : 0),
          duration: 0.22,
          ease: 'power2.out',
          overwrite: 'auto',
          onUpdate: requestRender,
        });
        gsap.to(rec.group.scale, {
          x: rec.spec.worldScale * (active ? 1.07 : 1),
          y: rec.spec.worldScale * (active ? 1.07 : 1),
          z: rec.spec.worldScale * (active ? 1.07 : 1),
          duration: 0.22,
          ease: 'power2.out',
          overwrite: 'auto',
          onUpdate: requestRender,
        });
        if (rec.shadowMesh) {
          const mat = rec.shadowMesh.material as THREE.MeshBasicMaterial;
          gsap.to(mat, {
            opacity: active ? 0.36 : 0.65,
            duration: 0.22,
            overwrite: 'auto',
            onUpdate: requestRender,
          });
        }
      } else if (key.startsWith('basket:')) {
        const instanceId = key.slice('basket:'.length);
        const rec = basketRecords.get(instanceId);
        if (!rec || !rec.landed || rec.exiting) return;
        const basePos = rec.item.slot.worldPosition;
        const baseScale = rec.item.slot.scale;
        gsap.to(rec.group.position, {
          y: basePos[1] + (active ? 0.12 : 0),
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto',
          onUpdate: requestRender,
        });
        gsap.to(rec.group.scale, {
          x: baseScale * (active ? 1.08 : 1),
          y: baseScale * (active ? 1.08 : 1),
          z: baseScale * (active ? 1.08 : 1),
          duration: 0.2,
          ease: 'power2.out',
          overwrite: 'auto',
          onUpdate: requestRender,
        });
      }
    }

    let lastHoverStamp = 0;
    function handlePointerMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        targetParallax.x = (((e.clientX - rect.left) / rect.width) * 2 - 1) * 0.85;
        targetParallax.y = (((e.clientY - rect.top) / rect.height) * 2 - 1) * 0.65;
        requestRender();
      }

      const now = performance.now();
      if (now - lastHoverStamp < 32) return;
      lastHoverStamp = now;

      const hit = pickInteractiveHit(e.clientX, e.clientY);
      const nextKey = hit
        ? hit.interactiveRole === 'source'
          ? `source:${hit.anchorId}`
          : `basket:${hit.instanceId}`
        : null;

      if (nextKey !== hoveredKey) {
        setHoverVisual(hoveredKey, false);
        hoveredKey = nextKey;
        setHoverVisual(hoveredKey, true);

        canvas.classList.toggle('cursor-pointer', Boolean(hoveredKey));
        if (hit) {
          const spec = PRODUCE_CATALOG[hit.produceId];
          callbacksRef.current.onHoverHintChange?.(
            hit.interactiveRole === 'source'
              ? `Add ${spec.shortName}`
              : `Remove ${spec.shortName}`
          );
        } else {
          callbacksRef.current.onHoverHintChange?.(null);
        }
      }
    }

    function handlePointerLeave() {
      targetParallax.x = 0;
      targetParallax.y = 0;
      if (hoveredKey) {
        setHoverVisual(hoveredKey, false);
        hoveredKey = null;
      }
      canvas.classList.remove('cursor-pointer');
      callbacksRef.current.onHoverHintChange?.(null);
      requestRender();
    }

    let pointerDownPos: { x: number; y: number } | null = null;
    function handlePointerDown(e: PointerEvent) {
      pointerDownPos = { x: e.clientX, y: e.clientY };
    }

    function handlePointerUp(e: PointerEvent) {
      if (pointerDownPos) {
        const moved = Math.hypot(
          e.clientX - pointerDownPos.x,
          e.clientY - pointerDownPos.y
        );
        pointerDownPos = null;
        if (moved > 14) return;
      }

      const hit = pickInteractiveHit(e.clientX, e.clientY);
      if (!hit) return;

      if (hit.interactiveRole === 'source' && hit.anchorId) {
        // Tactile spring pulse on the foreground source item
        const srcRec = sourceRecords.get(hit.anchorId);
        if (srcRec) {
          const s = srcRec.spec.worldScale;
          gsap.fromTo(
            srcRec.group.scale,
            { x: s * 0.88, y: s * 0.88, z: s * 0.88 },
            {
              x: s,
              y: s,
              z: s,
              duration: 0.42,
              ease: 'back.out(2.2)',
              overwrite: 'auto',
              onUpdate: requestRender,
            }
          );
        }
        callbacksRef.current.onAddProduce(hit.produceId, hit.anchorId);
      } else if (hit.interactiveRole === 'basket-instance' && hit.instanceId) {
        const rec = basketRecords.get(hit.instanceId);
        if (rec && rec.landed && !rec.exiting) {
          if (hoveredKey === `basket:${hit.instanceId}`) {
            hoveredKey = null;
            canvas.classList.remove('cursor-pointer');
            callbacksRef.current.onHoverHintChange?.(null);
          }
          callbacksRef.current.onRemoveInstance(hit.instanceId);
        }
      }
    }

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);
    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);

    function disposeGroup(group: THREE.Group) {
      group.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material?.dispose();
          }
        }
      });
    }

    // Reconcile deterministic React BasketItemInstance[] with 2.5D Three.js + GSAP motion
    function syncItems(nextItems: BasketItemInstance[]) {
      const nextIds = new Set(nextItems.map((i) => i.instanceId));

      // 1. Animate out any removed instances
      for (const [id, rec] of basketRecords.entries()) {
        if (!nextIds.has(id) && !rec.exiting) {
          rec.exiting = true;
          rec.landed = false;
          rec.timeline?.kill();

          const anchor =
            sourceRecords.get(rec.item.sourceAnchorId)?.spec ??
            getDefaultAnchorForProduce(rec.item.produceId);

          const startPos: [number, number, number] = [
            rec.group.position.x,
            rec.group.position.y,
            rec.group.position.z,
          ];
          const startRot: [number, number, number] = [
            rec.group.rotation.x,
            rec.group.rotation.y,
            rec.group.rotation.z,
          ];
          const startScale = rec.group.scale.x || rec.item.slot.scale;

          const proxy = { t: 0 };
          const tl = gsap.timeline({
            onUpdate: requestRender,
            onComplete: () => {
              basketItemsGroup.remove(rec.group);
              disposeGroup(rec.group);
              basketRecords.delete(id);
              requestRender();
            },
          });

          tl.to(proxy, {
            t: 1,
            duration: 0.66,
            ease: 'power2.inOut',
            onUpdate: () => {
              const sample = evaluateFlightArc(
                startPos,
                anchor.worldPosition,
                startRot,
                anchor.worldRotation,
                proxy.t,
                'out-of-basket'
              );
              rec.group.position.set(
                sample.position[0],
                sample.position[1],
                sample.position[2]
              );
              rec.group.rotation.set(
                sample.rotation[0],
                sample.rotation[1],
                sample.rotation[2]
              );
              const fadeTail = proxy.t > 0.72 ? 1 - (proxy.t - 0.72) / 0.28 : 1;
              const s = startScale * sample.scaleMultiplier * Math.max(0.05, fadeTail);
              rec.group.scale.setScalar(s);
            },
          });

          rec.timeline = tl;
        }
      }

      // 2. Spawn and fly in any newly added instances
      for (const item of nextItems) {
        if (basketRecords.has(item.instanceId)) continue;

        const texSet = produceTextures[item.produceId];
        const built = buildProduceGroup(
          item.produceId,
          texSet,
          'basket-instance',
          { instanceId: item.instanceId }
        );

        const anchor =
          sourceRecords.get(item.sourceAnchorId)?.spec ??
          getDefaultAnchorForProduce(item.produceId);

        built.group.position.set(
          anchor.worldPosition[0],
          anchor.worldPosition[1],
          anchor.worldPosition[2]
        );
        built.group.rotation.set(
          anchor.worldRotation[0],
          anchor.worldRotation[1],
          anchor.worldRotation[2]
        );
        built.group.scale.setScalar(anchor.worldScale);
        basketItemsGroup.add(built.group);

        const record: BasketNodeRecord = {
          item,
          group: built.group,
          hitMeshes: built.hitMeshes,
          landed: false,
          exiting: false,
          timeline: null,
        };
        basketRecords.set(item.instanceId, record);

        const proxy = { t: 0 };
        const targetPos = item.slot.worldPosition;
        const targetRot = item.slot.worldRotation;
        const targetScale = item.slot.scale;

        const tl = gsap.timeline({
          onUpdate: requestRender,
        });

        // Smooth lift + curved 3D trajectory + perspective rotation
        tl.to(proxy, {
          t: 1,
          duration: 0.78,
          ease: 'power2.inOut',
          onUpdate: () => {
            const sample = evaluateFlightArc(
              anchor.worldPosition,
              targetPos,
              anchor.worldRotation,
              targetRot,
              proxy.t,
              'into-basket'
            );
            built.group.position.set(
              sample.position[0],
              sample.position[1],
              sample.position[2]
            );
            built.group.rotation.set(
              sample.rotation[0],
              sample.rotation[1],
              sample.rotation[2]
            );
            const lerpedBaseScale =
              anchor.worldScale + (targetScale - anchor.worldScale) * proxy.t;
            built.group.scale.setScalar(lerpedBaseScale * sample.scaleMultiplier);
          },
          onComplete: () => {
            record.landed = true;
          },
        });

        // Soft cushioned landing inside the crate + subtle crate weight settle
        tl.fromTo(
          built.group.position,
          { y: targetPos[1] - 0.055 },
          {
            y: targetPos[1],
            duration: 0.28,
            ease: 'back.out(2.4)',
          }
        );
        tl.fromTo(
          built.group.scale,
          {
            x: targetScale * 1.06,
            y: targetScale * 0.93,
            z: targetScale,
          },
          {
            x: targetScale,
            y: targetScale,
            z: targetScale,
            duration: 0.28,
            ease: 'back.out(2.2)',
          },
          '<'
        );

        tl.call(
          () => {
            gsap.fromTo(
              crateGroup.position,
              { y: CRATE_SPEC.center[1] - 0.026 },
              {
                y: CRATE_SPEC.center[1],
                duration: 0.26,
                ease: 'power2.out',
                overwrite: 'auto',
                onUpdate: requestRender,
              }
            );
          },
          undefined,
          '-=0.28'
        );

        record.timeline = tl;
        requestRender();
      }
    }

    engineRef.current = { syncItems };

    return () => {
      unmounted = true;
      engineRef.current = null;
      resizeObserver.disconnect();
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);

      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);

      for (const rec of basketRecords.values()) {
        rec.timeline?.kill();
      }
      gsap.killTweensOf(crateGroup.position);

      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.isMesh) {
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material?.dispose();
          }
        }
      });
      envRT.dispose();
      renderer.dispose();
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    };
  }, []);

  useEffect(() => {
    engineRef.current?.syncItems(items);
  }, [items]);

  return (
    <div className="relative w-full h-full">
      <div ref={mountRef} className="w-full h-full" />

      {/* Keyboard & assistive-technology controls (visually hidden until keyboard-focused) */}
      <div
        aria-label="Interactive Harvest Crate Controls"
        className="sr-only focus-within:not-sr-only focus-within:absolute focus-within:bottom-3 focus-within:left-3 focus-within:right-3 focus-within:z-20 focus-within:rounded-2xl focus-within:border focus-within:border-[#1E1A17] focus-within:bg-[#F7F1E5] focus-within:p-3 focus-within:shadow-md"
      >
        <p className="text-xs font-medium text-[#1E1A17] mb-2">
          Add seasonal produce to your crate:
        </p>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {SOURCE_ANCHORS.map((anchor) => (
            <button
              key={anchor.anchorId}
              type="button"
              onClick={() => onAddProduce(anchor.produceId, anchor.anchorId)}
              className="rounded-full border border-[#1E1A17] px-2.5 py-1 text-xs font-medium text-[#1E1A17] focus-visible:outline-2 focus-visible:outline-[#D85432]"
            >
              {anchor.label}
            </button>
          ))}
        </div>
        {items.length > 0 && (
          <div>
            <p className="text-xs font-medium text-[#1E1A17] mb-1.5">
              Items currently in crate (activate to remove):
            </p>
            <div className="flex flex-wrap gap-1.5">
              {items.map((inst) => (
                <button
                  key={inst.instanceId}
                  type="button"
                  onClick={() => onRemoveInstance(inst.instanceId)}
                  className="rounded-full bg-[#D85432] px-2.5 py-1 text-xs font-medium text-[#FDF9F2] focus-visible:outline-2 focus-visible:outline-[#1E1A17]"
                >
                  Remove {PRODUCE_CATALOG[inst.produceId].shortName} #{inst.addedSeq}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
