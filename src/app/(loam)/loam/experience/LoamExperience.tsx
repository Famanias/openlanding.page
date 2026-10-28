'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  CHAPTERS,
  DEFAULT_SUNLIGHT,
  computeCameraPoseAtProgress,
  computeSunlightState,
  getChapterStateAtProgress,
  type ChapterProgressState,
  type InspectableObjectId,
} from '../logic/chapters';
import { generateMyceliumNetwork } from '../logic/networkGenerator';
import { createProceduralTextures } from '../scene/textures';
import { buildParasolMushroom } from '../scene/models/mushroomModel';
import { buildMyceliumClump } from '../scene/models/clumpModel';
import { buildPackagingTray } from '../scene/models/trayModel';
import { buildStudioSet } from '../scene/models/studioSet';
import { buildProductFamily } from '../scene/models/productFamily';
import { buildForestAndSoil } from '../scene/forestAndSoil';
import { buildMyceliumNetworkScene } from '../scene/myceliumNetwork';
import {
  createRendererAndPostStack,
  isWebGLAvailable,
} from '../scene/rendererAndPost';
import {
  createInspectController,
  type InspectUIFrameState,
} from '../scene/inspectController';
import {
  createScrollController,
  type ScrollController,
} from '../scene/scrollTimeline';
import {
  createSoundController,
  type SoundController,
} from '../scene/soundSynth';
import { OverlayUI } from '../components/OverlayUI';

function applyRootSunlightCssVars(sunlightValue: number) {
  if (typeof document === 'undefined') return;
  const { cssVars } = computeSunlightState(sunlightValue);
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty('--page-bg', cssVars['--page-bg']);
  rootStyle.setProperty('--sky-ambient', cssVars['--sky-ambient']);
  rootStyle.setProperty('--text-contrast', cssVars['--text-contrast']);
  rootStyle.setProperty('--sun-accent', cssVars['--sun-accent']);
}

export function LoamExperience() {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const scrollTrackRef = useRef<HTMLDivElement | null>(null);

  // Check if reduced-motion or WebGL2 is unavailable; if so, engine never mounts.
  const [canMount] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const reducedMotion = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    return !reducedMotion && isWebGLAvailable();
  });

  const [webglActive, setWebglActive] = useState(false);

  const [chapterState, setChapterState] = useState<ChapterProgressState>(() =>
    getChapterStateAtProgress(0),
  );
  const [inspectUI, setInspectUI] = useState<InspectUIFrameState>({
    phase: 'idle',
    targetObject: null,
    holdProgress: 0,
    pointerX: 0,
    pointerY: 0,
    hasUsedInspect: false,
    keyboardMode: false,
    pins: [],
    trayCallouts: [],
  });
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [sunlight, setSunlight] = useState<number>(DEFAULT_SUNLIGHT);
  const targetSunlightRef = useRef<number>(DEFAULT_SUNLIGHT);

  const scrollControllerRef = useRef<ScrollController | null>(null);
  const inspectControllerRef = useRef<ReturnType<
    typeof createInspectController
  > | null>(null);
  const soundControllerRef = useRef<SoundController | null>(null);

  const handleSunlightChange = (nextValue: number) => {
    const clamped = Math.max(0, Math.min(1, nextValue));
    targetSunlightRef.current = clamped;
    setSunlight(clamped);
    if (!webglActive) {
      applyRootSunlightCssVars(clamped);
    }
  };

  useEffect(() => {
    if (!canMount) return;
    const container = canvasMountRef.current;
    const scrollTrack = scrollTrackRef.current;
    if (!container || !scrollTrack) return;

    let stack: ReturnType<typeof createRendererAndPostStack>;
    try {
      stack = createRendererAndPostStack(container);
    } catch (err) {
      console.warn('LOAM: WebGL initialization failed; staying on static specimen sheet', err);
      return;
    }

    // Switch page mode to experience: hides the static specimen sheet
    document.documentElement.dataset.loamMode = 'experience';
    document.getElementById('loam-specimen-root')?.setAttribute('inert', '');
    setWebglActive(true);

    const { renderer, scene, camera, isSoftwareGl } = stack;

    // Handle context loss
    renderer.domElement.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      document.documentElement.dataset.loamMode = 'specimen';
      document.getElementById('loam-specimen-root')?.removeAttribute('inert');
      setWebglActive(false);
    });

    const textures = createProceduralTextures(renderer);

    // 1. Hero Mushroom (Chapter 1 & 2 & 6) mounted inside a center-pivoted inspect group at y = 1.9
    const mushroomPivot = new THREE.Group();
    mushroomPivot.position.set(0, 1.9, 0);
    scene.add(mushroomPivot);

    const heroMushroom = buildParasolMushroom(textures, 101, true, 'open');
    heroMushroom.group.position.set(0, -1.9, 0);
    heroMushroom.setBioluminescence(0);
    mushroomPivot.add(heroMushroom.group);

    // 2. Mycelium Network & Neighboring Mushrooms (Chapter 4)
    const networkData = generateMyceliumNetwork(4208);
    const forestAndSoil = buildForestAndSoil(
      textures,
      networkData.neighborMushrooms,
      2026,
    );
    scene.add(forestAndSoil.rootGroup);

    const myceliumNetwork = buildMyceliumNetworkScene(networkData);
    scene.add(myceliumNetwork.group);

    // 3. Fist-sized Mycelium Clump Specimen (Chapter 4a inspectable object at [0, -2.55, 0])
    const clumpPivot = new THREE.Group();
    clumpPivot.position.set(0, -2.55, 0);
    scene.add(clumpPivot);

    const clumpModel = buildMyceliumClump(textures, 304);
    clumpPivot.add(clumpModel.group);

    // 4. Molded Packaging Tray, Studio Sweep Set & Supporting Product Family (Chapter 5)
    const studioSet = buildStudioSet();
    scene.add(studioSet.group);

    const productFamily = buildProductFamily(textures);
    scene.add(productFamily.group);

    const trayPivot = new THREE.Group();
    trayPivot.position.set(0, -5.45, 0);
    scene.add(trayPivot);

    const trayModel = buildPackagingTray(textures, 505, isSoftwareGl);
    trayPivot.add(trayModel.group);

    // Pre-warm shaders
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const soundCtrl = createSoundController();
    soundControllerRef.current = soundCtrl;

    let currentMasterProgress = 0;
    let currentChapterState = getChapterStateAtProgress(0);
    const pointerWorld = new THREE.Vector3(0, -999, 0);
    const timer = new THREE.Timer();

    // Initialize Hold-to-Inspect controller
    const inspectCtrl = createInspectController({
      canvas: renderer.domElement,
      camera,
      pivotGroups: {
        mushroom: mushroomPivot,
        clump: clumpPivot,
        tray: trayPivot,
      },
      hitProxies: {
        mushroom: heroMushroom.hitProxy,
        clump: clumpModel.hitProxy,
        tray: trayModel.hitProxy,
      },
      getActiveChapterInspectable: () =>
        currentChapterState.activeChapter.inspectableObject,
      getActiveChapterIndex: () => currentChapterState.activeChapterIndex,
      onInspectActiveChange: (locked) => {
        scrollControllerRef.current?.setScrollPaused(locked);
      },
      onNetworkClick: (worldPt) => {
        myceliumNetwork.triggerPulseAt(
          worldPt,
          timer.getElapsed(),
          (mushroomIndex) => {
            forestAndSoil.triggerMushroomGlow(mushroomIndex);
          },
        );
        soundCtrl.playPulseChime();
      },
      onNetworkHover: (worldPt) => {
        pointerWorld.copy(worldPt);
      },
      networkHitPlane: myceliumNetwork.hitPlane,
    });
    inspectControllerRef.current = inspectCtrl;

    // Initialize ScrollTimeline controller
    const scrollCtrl = createScrollController({
      scrollTrackElement: scrollTrack,
      onProgressUpdate: (prog) => {
        currentMasterProgress = prog;
      },
      isInspectLocked: () => inspectCtrl.getState().phase === 'inspecting',
    });
    scrollControllerRef.current = scrollCtrl;

    // Smoothed camera & sunlight state for exponential damping in the render loop
    const smoothedCamPos = new THREE.Vector3(0, 2.38, 6.25);
    const smoothedCamTarget = new THREE.Vector3(0, 1.92, 0);
    let smoothedFov = 36;
    let smoothedInspectStrength = 0;
    let smoothedSunlight = targetSunlightRef.current;

    let frameId = 0;
    let lastUiSyncMs = 0;

    const tick = (nowMs: number) => {
      frameId = requestAnimationFrame(tick);
      timer.update(nowMs);
      const dtSec = Math.min(0.1, timer.getDelta());
      const elapsedSec = timer.getElapsed();

      scrollCtrl.tickLenis(nowMs);

      // Exponential damping on camera pose and sunlight time-of-day slider
      const dampFactor = 1 - Math.exp(-11.0 * Math.max(0.008, dtSec));
      const sunDampFactor = 1 - Math.exp(-9.5 * Math.max(0.008, dtSec));

      smoothedSunlight +=
        (targetSunlightRef.current - smoothedSunlight) * sunDampFactor;
      applyRootSunlightCssVars(smoothedSunlight);

      currentChapterState = getChapterStateAtProgress(currentMasterProgress);
      const targetPose = computeCameraPoseAtProgress(currentMasterProgress);

      smoothedCamPos.lerp(
        _tempVecA.set(
          targetPose.position[0],
          targetPose.position[1],
          targetPose.position[2],
        ),
        dampFactor,
      );
      smoothedCamTarget.lerp(
        _tempVecB.set(
          targetPose.target[0],
          targetPose.target[1],
          targetPose.target[2],
        ),
        dampFactor,
      );
      smoothedFov += (targetPose.fov - smoothedFov) * dampFactor;

      camera.position.copy(smoothedCamPos);
      camera.lookAt(smoothedCamTarget);
      if (Math.abs(camera.fov - smoothedFov) > 0.05) {
        camera.fov = smoothedFov;
        camera.updateProjectionMatrix();
      }

      // Update Hold-to-Inspect controller
      inspectCtrl.tick(
        dtSec * 1000,
        currentChapterState.activeChapter.inspectableObject,
      );
      const inspectState = inspectCtrl.getState();
      const targetInspectStrength =
        inspectState.phase === 'inspecting' ? 1 : 0;
      smoothedInspectStrength +=
        (targetInspectStrength - smoothedInspectStrength) * dampFactor;
      stack.setInspectVisualState(smoothedInspectStrength);

      // Update scene atmosphere & models as a pure function of progress and smoothed sunlight
      stack.setAtmosphereAtProgress(
        currentChapterState.undergroundFactor,
        currentChapterState.networkGrowth,
        elapsedSec,
        currentChapterState.traySolidOpacity,
        smoothedSunlight,
        currentChapterState.studioLightness,
      );
      soundCtrl.updateProgress(currentChapterState.undergroundFactor);

      heroMushroom.setBioluminescence(0);

      forestAndSoil.updateAtProgress({
        progress: currentMasterProgress,
        undergroundFactor: currentChapterState.undergroundFactor,
        gillSporeIntensity: currentChapterState.gillSporeIntensity,
        fairyRingGrowth: currentChapterState.fairyRingGrowth,
        elapsedSec,
        sunlight: smoothedSunlight,
      });

      myceliumNetwork.updateNetwork({
        growth: currentChapterState.networkGrowth,
        convergence: currentChapterState.trayMorphProgress,
        undergroundFactor: currentChapterState.undergroundFactor,
        elapsedSec,
        pointerWorld,
      });

      clumpModel.setRevealAndGlow(
        currentChapterState.clumpReveal,
        currentChapterState.networkGrowth,
      );

      studioSet.updateStudio(
        currentChapterState.studioLightness,
        smoothedInspectStrength,
      );

      productFamily.updateFamily(
        currentChapterState.productFamilySlide,
        currentChapterState.studioLightness,
        smoothedInspectStrength,
      );

      trayModel.updateMorphAndOpacity(
        currentChapterState.trayMorphProgress,
        currentChapterState.traySolidOpacity,
        elapsedSec,
        currentChapterState.fragileObjectSettle,
        currentChapterState.foxfireGlowFade,
      );

      stack.renderFrame();

      // Sync React overlay state
      const isInteractiveOrLeaderLines =
        inspectState.phase !== 'idle' ||
        currentChapterState.chapterOpacities[4] > 0.01;
      if (nowMs - lastUiSyncMs > (isInteractiveOrLeaderLines ? 28 : 60)) {
        lastUiSyncMs = nowMs;
        setChapterState(currentChapterState);
        setInspectUI(inspectCtrl.getUIFrameState());
      }
    };

    const handleResize = () => {
      stack.resize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      document.documentElement.dataset.loamMode = 'specimen';
      document.getElementById('loam-specimen-root')?.removeAttribute('inert');
      inspectCtrl.dispose();
      scrollCtrl.dispose();
      soundCtrl.dispose();
      stack.dispose();
      timer.dispose();
    };
  }, [canMount]);

  // If reduced-motion is requested or WebGL is unsupported, the 3D engine never mounts.
  if (!canMount) {
    return null;
  }

  return (
    <div
      id="top"
      className="relative w-full"
      style={{
        backgroundColor: 'var(--page-bg, #080604)',
        color: 'var(--text-contrast, #f0e8d8)',
      }}
    >
      {/* Fixed full-viewport 3D WebGL Canvas behind the thin HTML overlay */}
      <div
        ref={canvasMountRef}
        data-testid="loam-webgl-canvas"
        className="fixed inset-0 z-0 h-screen w-screen overflow-hidden"
      />

      {/* Thin HTML Overlay */}
      {webglActive && (
        <OverlayUI
          chapterState={chapterState}
          inspectUI={inspectUI}
          soundEnabled={soundEnabled}
          sunlight={sunlight}
          onSunlightChange={handleSunlightChange}
          onToggleSound={() => {
            if (soundControllerRef.current) {
              setSoundEnabled(soundControllerRef.current.toggle());
            }
          }}
          onStepChapter={(dir) => {
            scrollControllerRef.current?.stepChapter(dir);
          }}
          onJumpToChapter={(idx) => {
            if (CHAPTERS[idx]) {
              scrollControllerRef.current?.scrollToProgress(
                CHAPTERS[idx].restProgress,
                false,
              );
            }
          }}
          onTriggerKeyboardInspect={(target: InspectableObjectId) => {
            inspectControllerRef.current?.triggerKeyboardInspect(target);
            if (inspectControllerRef.current) {
              setInspectUI(inspectControllerRef.current.getUIFrameState());
            }
          }}
          onExitInspect={() => {
            inspectControllerRef.current?.exitInspect();
            if (inspectControllerRef.current) {
              setInspectUI(inspectControllerRef.current.getUIFrameState());
            }
          }}
        />
      )}

      {/* Invisible tall scroll track driving the master GSAP timeline from progress 0 -> 1 */}
      <div
        ref={scrollTrackRef}
        aria-hidden="true"
        className="pointer-events-none relative z-0 h-[750vh] w-full"
      />
    </div>
  );
}

const _tempVecA = new THREE.Vector3();
const _tempVecB = new THREE.Vector3();
