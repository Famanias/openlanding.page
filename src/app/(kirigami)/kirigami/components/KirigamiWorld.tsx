'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  CameraFrame,
  DepthLayerId,
  computeResponsiveViewBox,
} from '../utils/sceneCoordinates';
import {
  PAPER_PALETTE,
  computeEffectiveShadowOpacity,
} from '../utils/paperTextures';
import { computeUnfoldState } from '../utils/unfoldMath';
import { PointerPosition, usePaperParallax } from '../hooks/usePaperParallax';
import { WindAnimatedRefs, useWindAnimation } from '../hooks/useWindAnimation';
import { UnfoldTargetRefs, useUnfoldTimeline } from '../hooks/useUnfoldTimeline';
import { PaperLayer } from './PaperLayer';
import { PaperSkyBackdrop, PaperSun } from './PaperSun';
import { PaperClouds } from './PaperClouds';
import { PaperFarMountains, PaperMidMountains } from './PaperMountains';
import { PaperRiver } from './PaperRiver';
import { PaperVillage } from './PaperVillage';
import { PaperTorii } from './PaperTorii';
import { PaperForegroundPines, PaperMidTrees } from './PaperTrees';
import { PaperForeground } from './PaperForeground';
import { CherryBlossoms, SakuraBranchKey } from './CherryBlossoms';

export interface KirigamiWorldProps {
  /** Normalized unfolding progress [0 = compressed folded book, 1 = fully opened reference world] */
  unfoldProgress?: number;
  ambientMotion?: boolean;
  parallaxEnabled?: boolean;
  petalsEnabled?: boolean;
  shadowsEnabled?: boolean;
  textureEnabled?: boolean;
  outlinesEnabled?: boolean;
  depthVisualization?: boolean;
  interactive?: boolean;
  windIntensity?: number;
  parallaxStrength?: number;
  shadowIntensity?: number;
  resetToken?: number;
  onFpsSample?: (fps: number) => void;
  onCameraChange?: (frame: CameraFrame) => void;
  className?: string;
}

export const KirigamiWorld: React.FC<KirigamiWorldProps> = ({
  unfoldProgress = 1,
  ambientMotion = true,
  parallaxEnabled = true,
  petalsEnabled = true,
  shadowsEnabled = true,
  textureEnabled = true,
  outlinesEnabled = false,
  depthVisualization = false,
  interactive = true,
  windIntensity = 1.0,
  parallaxStrength = 1.0,
  shadowIntensity = 1.0,
  resetToken = 0,
  onFpsSample,
  onCameraChange,
  className = '',
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [cameraFrame, setCameraFrame] = useState<CameraFrame>(() =>
    computeResponsiveViewBox(1600, 900)
  );

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  // Responsive viewport framing strategy (Desktop 16:9 / Tablet / Mobile portrait focus)
  useEffect(() => {
    const updateFrame = () => {
      const next = computeResponsiveViewBox(window.innerWidth, window.innerHeight);
      setCameraFrame(next);
      onCameraChange?.(next);
    };
    updateFrame();
    window.addEventListener('resize', updateFrame, { passive: true });
    return () => window.removeEventListener('resize', updateFrame);
  }, [onCameraChange]);

  // Layer refs for pointer parallax
  const layerRefs = useRef<Partial<Record<DepthLayerId, SVGGElement | null>>>({});
  const pointerRef = useRef<PointerPosition>({ normX: 0, normY: 0, clientX: 0, clientY: 0 });

  const registerLayer = useCallback((id: DepthLayerId, el: SVGGElement | null) => {
    layerRefs.current[id] = el;
  }, []);

  // Unfold timeline target refs
  const unfoldTargetsRef = useRef<UnfoldTargetRefs>({
    sun: null,
    clouds: null,
    farMountains: null,
    midMountains: null,
    riverValley: null,
    terraces: null,
    villageHouses: null,
    toriiGate: null,
    midTrees: null,
    foregroundRocks: null,
    cherryBlossomsLeft: null,
    cherryBlossomsRight: null,
  });

  // Ambient wind & pooled petal target refs
  const windRefs = useRef<WindAnimatedRefs>({
    blossomUpperRightMain: null,
    blossomUpperRightTwigA: null,
    blossomUpperRightTwigB: null,
    blossomMidLeftMain: null,
    blossomMidLeftTwig: null,
    blossomLowerRightMain: null,
    blossomLowerRightTwig: null,
    cloudGroups: [],
    bambooGroups: [],
    grassGroups: [],
    pineTips: [],
    petalNodes: [],
  });

  const getLayerElements = useCallback(() => layerRefs.current, []);
  const handlePointerChange = useCallback((pos: PointerPosition) => {
    pointerRef.current = pos;
  }, []);
  const getWindTargets = useCallback(() => windRefs.current, []);
  const getPointerPos = useCallback(() => pointerRef.current, []);

  // Activate 2.5D pointer parallax, GSAP pop-up timeline, and living wind loop
  usePaperParallax({
    enabled: parallaxEnabled,
    strength: parallaxStrength,
    reducedMotion,
    getLayerElements,
    onPointerChange: handlePointerChange,
  });

  useUnfoldTimeline({
    unfoldProgress,
    targetsRef: unfoldTargetsRef,
    reducedMotion,
  });

  useWindAnimation({
    ambientEnabled: ambientMotion,
    petalsEnabled,
    windIntensity,
    interactive,
    reducedMotion,
    getTargets: getWindTargets,
    getPointer: getPointerPos,
    onFpsSample,
  });

  // Compute dynamic shadow strength modulated by shadowsEnabled, shadowIntensity, and unfold separation
  const unfoldState = useMemo(() => computeUnfoldState(unfoldProgress), [unfoldProgress]);
  const effectiveShadowStrength = useMemo(() => {
    const base = computeEffectiveShadowOpacity(1.0, {
      enabled: shadowsEnabled,
      intensity: shadowIntensity,
      unfoldShadowFactor: reducedMotion ? 1 : unfoldState.shadowFactor,
    });
    return shadowsEnabled
      ? Number(
          (
            Math.max(0, Math.min(1.8, shadowIntensity)) *
            (reducedMotion ? 1 : unfoldState.shadowFactor)
          ).toFixed(3)
        )
      : base;
  }, [shadowsEnabled, shadowIntensity, reducedMotion, unfoldState.shadowFactor]);

  const handleRegisterBranch = useCallback(
    (key: SakuraBranchKey, el: SVGGElement | null) => {
      switch (key) {
        case 'upperRightMain':
          windRefs.current.blossomUpperRightMain = el;
          break;
        case 'upperRightTwigA':
          windRefs.current.blossomUpperRightTwigA = el;
          break;
        case 'upperRightTwigB':
          windRefs.current.blossomUpperRightTwigB = el;
          break;
        case 'midLeftMain':
          windRefs.current.blossomMidLeftMain = el;
          break;
        case 'midLeftTwig':
          windRefs.current.blossomMidLeftTwig = el;
          break;
        case 'lowerRightMain':
          windRefs.current.blossomLowerRightMain = el;
          break;
        case 'lowerRightTwig':
          windRefs.current.blossomLowerRightTwig = el;
          break;
      }
    },
    []
  );

  const stageClasses = [
    'kirigami-stage',
    outlinesEnabled ? 'kirigami-outlines-on' : '',
    depthVisualization ? 'kirigami-depth-on' : '',
    !ambientMotion || reducedMotion ? 'kirigami-ambient-paused' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={stageClasses}
      data-testid="kirigami-world"
      data-unfold={unfoldProgress.toFixed(2)}
      data-camera={cameraFrame.category}
      aria-label="Interactive Kirigami Japanese paper-cut landscape"
    >
      <div className="kirigami-viewport">
        <svg
          className="kirigami-svg-root"
          viewBox={cameraFrame.viewBox}
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="Handcrafted layered Japanese kirigami paper diorama with sun, ornamental clouds, mountain ranges, winding turquoise river, village houses, torii gate, terraces, pine trees, and cherry blossoms"
        >
          <defs>
            {/* ==================== CARDSTOCK GRADIENTS ==================== */}
            <linearGradient id="grad-sky-paper" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={PAPER_PALETTE.skyTop} />
              <stop offset="52%" stopColor={PAPER_PALETTE.skyMid} />
              <stop offset="100%" stopColor={PAPER_PALETTE.skyHorizon} />
            </linearGradient>

            <radialGradient id="grad-sun-halo" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#F5CCB0" stopOpacity="0.45" />
              <stop offset="55%" stopColor="#F6DFC9" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#F9ECDC" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="grad-sun-disc" x1="0.15" y1="0.1" x2="0.85" y2="0.95">
              <stop offset="0%" stopColor="#F1B495" />
              <stop offset="55%" stopColor={PAPER_PALETTE.sunMain} />
              <stop offset="100%" stopColor={PAPER_PALETTE.sunDeep} />
            </linearGradient>

            <linearGradient id="grad-mt-pale-sage" x1="0.2" y1="0" x2="0.85" y2="1">
              <stop offset="0%" stopColor="#B3C0A3" />
              <stop offset="60%" stopColor={PAPER_PALETTE.mtPaleSage} />
              <stop offset="100%" stopColor={PAPER_PALETTE.mtPaleSageShade} />
            </linearGradient>

            <linearGradient id="grad-mt-dusty-blue" x1="0.15" y1="0" x2="0.85" y2="1">
              <stop offset="0%" stopColor="#9AB2B1" />
              <stop offset="65%" stopColor={PAPER_PALETTE.mtDustyBlue} />
              <stop offset="100%" stopColor={PAPER_PALETTE.mtDustyBlueShade} />
            </linearGradient>

            <linearGradient id="grad-mt-olive-mid" x1="0.2" y1="0" x2="0.85" y2="1">
              <stop offset="0%" stopColor="#798E6C" />
              <stop offset="100%" stopColor={PAPER_PALETTE.mtOliveMidShade} />
            </linearGradient>

            <linearGradient id="grad-mt-forest-center" x1="0.15" y1="0" x2="0.85" y2="1">
              <stop offset="0%" stopColor="#5D7A60" />
              <stop offset="100%" stopColor={PAPER_PALETTE.mtForestCenterShade} />
            </linearGradient>

            <linearGradient id="grad-mt-deep-pine" x1="0.15" y1="0" x2="0.85" y2="1">
              <stop offset="0%" stopColor="#466357" />
              <stop offset="100%" stopColor={PAPER_PALETTE.mtDeepPineShade} />
            </linearGradient>
          </defs>

          {/* LAYER 0: Background Paper Sky */}
          <PaperLayer layerId={0} registerLayer={registerLayer}>
            <PaperSkyBackdrop />
          </PaperLayer>

          {/* LAYER 1: Celestial Elements (Sun) */}
          <PaperLayer layerId={1} registerLayer={registerLayer}>
            <PaperSun
              sunRef={(el) => {
                unfoldTargetsRef.current.sun = el;
              }}
              shadowStrength={effectiveShadowStrength}
            />
          </PaperLayer>

          {/* LAYER 2: Far Mountains & Ornamental Clouds */}
          <PaperLayer layerId={2} registerLayer={registerLayer}>
            <PaperFarMountains
              farMountainsRef={(el) => {
                unfoldTargetsRef.current.farMountains = el;
              }}
              shadowStrength={effectiveShadowStrength}
            />
            <PaperClouds
              cloudsUnfoldRef={(el) => {
                unfoldTargetsRef.current.clouds = el;
              }}
              registerCloudRef={(idx, el) => {
                windRefs.current.cloudGroups[idx] = el;
              }}
              shadowsEnabled={shadowsEnabled}
              interactive={interactive}
              resetToken={resetToken}
            />
          </PaperLayer>

          {/* LAYER 3: Middle Mountain Ridges & Foothill Forests */}
          <PaperLayer layerId={3} registerLayer={registerLayer}>
            <PaperMidMountains
              midMountainsRef={(el) => {
                unfoldTargetsRef.current.midMountains = el;
              }}
              shadowStrength={effectiveShadowStrength}
            />
          </PaperLayer>

          {/* LAYER 4: Central Winding River, Valley Meadow, Terraced Hills, Village Houses & Torii */}
          <PaperLayer layerId={4} registerLayer={registerLayer}>
            <PaperRiver
              riverValleyRef={(el) => {
                unfoldTargetsRef.current.riverValley = el;
              }}
              shadowStrength={effectiveShadowStrength}
              ambientEnabled={ambientMotion && !reducedMotion}
            />
            <PaperVillage
              terracesRef={(el) => {
                unfoldTargetsRef.current.terraces = el;
              }}
              villageHousesRef={(el) => {
                unfoldTargetsRef.current.villageHouses = el;
              }}
              registerBambooRef={(idx, el) => {
                windRefs.current.bambooGroups[idx] = el;
              }}
              shadowStrength={effectiveShadowStrength}
              interactive={interactive}
              resetToken={resetToken}
            />
            <PaperTorii
              toriiRef={(el) => {
                unfoldTargetsRef.current.toriiGate = el;
              }}
              shadowsEnabled={shadowsEnabled}
            />
          </PaperLayer>

          {/* LAYER 5: Nearby Valley Vegetation (Cypresses & Bonsai Pines) */}
          <PaperLayer layerId={5} registerLayer={registerLayer}>
            <PaperMidTrees
              midTreesRef={(el) => {
                unfoldTargetsRef.current.midTrees = el;
              }}
              shadowsEnabled={shadowsEnabled}
            />
          </PaperLayer>

          {/* LAYER 6: Foreground Terracotta & Cream Paper Cliffs, Grasses, Reeds, Ferns & Wildflowers */}
          <PaperLayer layerId={6} registerLayer={registerLayer}>
            <PaperForeground
              foregroundRocksRef={(el) => {
                unfoldTargetsRef.current.foregroundRocks = el;
              }}
              registerGrassRef={(idx, el) => {
                windRefs.current.grassGroups[idx] = el;
              }}
              shadowStrength={effectiveShadowStrength}
            />
          </PaperLayer>

          {/* LAYER 7: Framing Japanese Pines, Articulated Cherry Blossom Branches & Pooled Falling Petals */}
          <PaperLayer layerId={7} registerLayer={registerLayer}>
            <PaperForegroundPines
              registerPineTipRef={(idx, el) => {
                windRefs.current.pineTips[idx] = el;
              }}
              shadowsEnabled={shadowsEnabled}
            />
            <CherryBlossoms
              leftUnfoldRef={(el) => {
                unfoldTargetsRef.current.cherryBlossomsLeft = el;
              }}
              rightUnfoldRef={(el) => {
                unfoldTargetsRef.current.cherryBlossomsRight = el;
              }}
              onRegisterBranch={handleRegisterBranch}
              registerPetalNode={(idx, el) => {
                windRefs.current.petalNodes[idx] = el;
              }}
              shadowsEnabled={shadowsEnabled}
            />
          </PaperLayer>
        </svg>
      </div>

      {/* Subtle tactile paper grain overlay across entire viewport */}
      {textureEnabled && <div className="kirigami-paper-grain" aria-hidden="true" />}
    </div>
  );
};
