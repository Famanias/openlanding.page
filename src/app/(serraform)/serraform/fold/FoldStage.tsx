'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FOLD_CONSTANTS, PRINT_SPECS, STORY_CHAPTERS } from './config';
import { deriveFold, deriveFoldChain, formatMeters } from './geometry';
import { StageHostId, useFold } from './FoldProvider';
import type { FoldSceneController, RoomLightingState } from './FoldScene';
import { FoldStillCanvas } from './FoldStillCanvas';
import type { StageSlotRect } from './projection';
import { normalizeElevationDeg, normalizeYawDeg } from './state';
import type { UnfoldChoreographyFrame } from './unfold';

type GraphicsState = 'idle' | 'initializing' | 'live' | 'still' | 'error';

interface FoldStageProps {
  hostId: StageHostId;
  variant?: 'framed' | 'atelier';
  darkSurface?: boolean;
  roomLighting?: RoomLightingState;
  compact?: boolean;
  showStoryBadge?: boolean;
  showSpanBracket?: boolean;
  canvasPortalEl?: HTMLElement | null;
  useFullBleedPortal?: boolean;
  className?: string;
}

const CircularDragHintSvg: React.FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    className="srf-drag-arc shrink-0 text-current"
  >
    <path
      d="M20 12a8 8 0 1 1-2.34-5.66"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M20 4v4.5h-4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const FoldStage: React.FC<FoldStageProps> = ({
  hostId,
  variant = 'framed',
  darkSurface = false,
  roomLighting,
  compact = false,
  showStoryBadge = false,
  showSpanBracket = true,
  canvasPortalEl = null,
  useFullBleedPortal = false,
  className = '',
}) => {
  const {
    mode,
    design,
    view,
    effectiveOpening,
    chapter,
    env,
    choreographyMode,
    uploadedArt,
    activeWebglHost,
    acquireWebglHost,
    releaseWebglHost,
    setViewAngles,
    cancelChoreography,
    getLiveOpening,
    getLiveChainFrame,
    subscribeStoryFrame,
    subscribeChainFrame,
  } = useFold();

  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<FoldSceneController | null>(null);
  const spanTextRef = useRef<HTMLSpanElement>(null);
  const atelierReadoutSpanRef = useRef<HTMLSpanElement>(null);

  const [stillOpening, setStillOpening] = useState<number>(effectiveOpening);
  const [stillPanelOpenings, setStillPanelOpenings] = useState<readonly number[] | null>(
    () => getLiveChainFrame()?.panelOpenings ?? null,
  );
  const [graphicsState, setGraphicsState] = useState<GraphicsState>('idle');
  const [firstFrameReady, setFirstFrameReady] = useState(false);
  const [userStillRequested, setUserStillRequested] = useState(false);
  const [activationNonce, setActivationNonce] = useState(0);
  const [inViewport, setInViewport] = useState(hostId === 'hero');
  const [isDragging, setIsDragging] = useState(false);

  const [portalSlotRect, setPortalSlotRect] = useState<StageSlotRect | null>(null);
  const portalSlotRectRef = useRef<StageSlotRect | null>(null);

  const generationRef = useRef(0);
  const isVisibleRef = useRef(hostId === 'hero');

  const measurePortalLayout = useCallback((): {
    hostW: number;
    hostH: number;
    slotRect: StageSlotRect | null;
  } => {
    const vpEl = viewportRef.current;
    const hostEl = canvasHostRef.current;
    if (useFullBleedPortal && canvasPortalEl && vpEl) {
      const portalRect = canvasPortalEl.getBoundingClientRect();
      const vpRect = vpEl.getBoundingClientRect();
      const hostW = Math.round(portalRect.width);
      const hostH = Math.round(portalRect.height);
      const slotRect: StageSlotRect | null =
        vpRect.width >= 4 && vpRect.height >= 4
          ? {
              x: vpRect.left - portalRect.left,
              y: vpRect.top - portalRect.top,
              width: vpRect.width,
              height: vpRect.height,
            }
          : null;
      return { hostW, hostH, slotRect };
    }

    return {
      hostW: Math.round(hostEl?.clientWidth || vpEl?.clientWidth || 800),
      hostH: Math.round(hostEl?.clientHeight || vpEl?.clientHeight || 560),
      slotRect: null,
    };
  }, [useFullBleedPortal, canvasPortalEl]);

  // Keep latest reactive values accessible to async init/context-loss handlers without stale closures
  const latestDesignRef = useRef(design);
  latestDesignRef.current = design;
  const latestUploadRef = useRef(uploadedArt);
  latestUploadRef.current = uploadedArt;
  const latestViewRef = useRef(view);
  latestViewRef.current = view;
  const latestRoomLightingRef = useRef(roomLighting);
  latestRoomLightingRef.current = roomLighting;

  const isAtelier = variant === 'atelier';
  const fitPadding = isAtelier ? 1.01 : FOLD_CONSTANTS.cameraFitPadding;

  const updateDomSpan = useCallback((formatted: string) => {
    if (spanTextRef.current) {
      spanTextRef.current.textContent = formatted;
    }
    if (atelierReadoutSpanRef.current) {
      atelierReadoutSpanRef.current.textContent = formatted;
    }
  }, []);

  // Cleanup active WebGL instance cleanly and release singleton ownership
  const disposeController = useCallback(() => {
    generationRef.current += 1;
    if (controllerRef.current) {
      controllerRef.current.dispose();
      controllerRef.current = null;
    }
    setFirstFrameReady(false);
    setStillOpening(getLiveOpening());
    setStillPanelOpenings(getLiveChainFrame()?.panelOpenings ?? null);
    setGraphicsState((prev) => (prev === 'error' ? 'error' : 'still'));
    releaseWebglHost(hostId);
  }, [getLiveChainFrame, getLiveOpening, hostId, releaseWebglHost]);

  // Synchronize live opening during manual adjustments and story scroll
  useEffect(() => {
    const applyOpening = (openingValue: number) => {
      const pose = deriveFold(openingValue);
      updateDomSpan(formatMeters(pose.metrics.outerSpan));
      if (controllerRef.current) {
        controllerRef.current.setPose(openingValue);
      } else {
        setStillPanelOpenings(null);
        setStillOpening(openingValue);
      }
    };

    const activeChain = getLiveChainFrame();
    if (!activeChain) {
      applyOpening(getLiveOpening());
    }

    if (mode !== 'story') return;
    return subscribeStoryFrame((nextOpening) => {
      if (!getLiveChainFrame()) {
        applyOpening(nextOpening);
      }
    });
  }, [mode, effectiveOpening, getLiveOpening, getLiveChainFrame, subscribeStoryFrame, updateDomSpan]);

  // Synchronize mechanical hinge-chain unfolding choreography (entrance & "See how it folds")
  useEffect(() => {
    const applyChain = (frame: UnfoldChoreographyFrame | null) => {
      if (!frame) {
        const opening = getLiveOpening();
        const pose = deriveFold(opening);
        updateDomSpan(formatMeters(pose.metrics.outerSpan));
        if (controllerRef.current) {
          controllerRef.current.setPose(opening);
        } else {
          setStillPanelOpenings(null);
          setStillOpening(opening);
        }
        return;
      }

      const pose = deriveFoldChain(frame.panelOpenings);
      updateDomSpan(formatMeters(pose.metrics.outerSpan));
      if (controllerRef.current) {
        controllerRef.current.setChainPose(frame.panelOpenings, frame.glintProgress);
      } else {
        setStillPanelOpenings(frame.panelOpenings);
        setStillOpening(frame.averageOpening);
      }
    };

    const currentFrame = getLiveChainFrame();
    if (currentFrame) {
      applyChain(currentFrame);
    }

    return subscribeChainFrame(applyChain);
  }, [getLiveChainFrame, getLiveOpening, subscribeChainFrame, updateDomSpan]);

  // Sync design (colors, print, scale, opening, uploaded bitmap) to live WebGL controller
  useEffect(() => {
    if (!controllerRef.current) return;
    controllerRef.current.setDesign(
      { ...design, opening: getLiveOpening() },
      uploadedArt?.bitmap ?? null,
      env.reducedMotion,
    );
  }, [
    design.baseHex,
    design.designHex,
    design.print,
    design.motifScale,
    design.opening,
    uploadedArt,
    env.reducedMotion,
    getLiveOpening,
  ]);

  // Sync camera angles to live WebGL controller
  useEffect(() => {
    if (!controllerRef.current) return;
    controllerRef.current.setViewAngles(view, env.reducedMotion || isDragging);
  }, [view.yawDeg, view.elevationDeg, env.reducedMotion, isDragging]);

  // Sync room-derived light/shadow tint to live WebGL controller
  useEffect(() => {
    if (!controllerRef.current || !roomLighting) return;
    controllerRef.current.setRoomLighting(roomLighting, env.reducedMotion);
  }, [
    roomLighting?.lightTint,
    roomLighting?.ambientTint,
    roomLighting?.shadowTint,
    roomLighting?.floorBase,
    roomLighting?.isDarkEnvelope,
    env.reducedMotion,
  ]);

  // Dispose immediately if reduced motion becomes active
  useEffect(() => {
    if (!env.reducedMotion) return;
    disposeController();
  }, [env.reducedMotion, disposeController]);

  // Track viewport visibility for pausing offscreen + automatic Hero <-> Studio handoff
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const updateVisibility = () => {
      const visible = isVisibleRef.current && document.visibilityState === 'visible';
      controllerRef.current?.setActive(visible);
    };

    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(
            (entries) => {
              const intersecting = entries.some(
                (e) => e.isIntersecting && e.intersectionRatio >= 0.08,
              );
              isVisibleRef.current = intersecting;
              setInViewport(intersecting);
              updateVisibility();
            },
            { threshold: [0, 0.08, 0.25] },
          )
        : null;

    io?.observe(el);
    document.addEventListener('visibilitychange', updateVisibility);

    return () => {
      io?.disconnect();
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  // Manage singleton 3D WebGL lifecycle across Hero and Studio
  const canAutoStart =
    env.enhancedDesktop && !env.saveData && !env.isCoarsePointer;
  const explicitlyRequested = activationNonce > 0;
  const shouldHostAutoStart =
    inViewport &&
    canAutoStart &&
    !userStillRequested &&
    (hostId === 'studio' || activeWebglHost !== 'studio');
  const wantsWebgl =
    !env.reducedMotion &&
    !userStillRequested &&
    (explicitlyRequested || shouldHostAutoStart);

  // Keep full-bleed slot rect and stage resize synchronized across WebGL and 2D still view
  useEffect(() => {
    if (!useFullBleedPortal || !canvasPortalEl) return;

    const syncLayout = () => {
      const { hostW, hostH, slotRect } = measurePortalLayout();
      if (hostW < 4 || hostH < 4) return;
      const prev = portalSlotRectRef.current;
      const changed =
        (slotRect === null) !== (prev === null) ||
        (slotRect !== null &&
          prev !== null &&
          (Math.abs(slotRect.x - prev.x) >= 0.5 ||
            Math.abs(slotRect.y - prev.y) >= 0.5 ||
            Math.abs(slotRect.width - prev.width) >= 0.5 ||
            Math.abs(slotRect.height - prev.height) >= 0.5));
      if (changed) {
        portalSlotRectRef.current = slotRect;
        setPortalSlotRect(slotRect);
      }
      controllerRef.current?.resize(hostW, hostH, slotRect);
    };

    syncLayout();

    const ro =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(syncLayout) : null;
    ro?.observe(canvasPortalEl);
    if (viewportRef.current) ro?.observe(viewportRef.current);
    window.addEventListener('resize', syncLayout, { passive: true });

    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', syncLayout);
    };
  }, [useFullBleedPortal, canvasPortalEl, measurePortalLayout]);

  useEffect(() => {
    const stageEl = stageRef.current;
    const hostEl = canvasHostRef.current;
    if (!stageEl || !hostEl) return;
    if (useFullBleedPortal && !canvasPortalEl) return;

    if (!wantsWebgl) {
      if (controllerRef.current) {
        disposeController();
      } else {
        setFirstFrameReady(false);
        setStillOpening(getLiveOpening());
        setStillPanelOpenings(getLiveChainFrame()?.panelOpenings ?? null);
        setGraphicsState((prev) =>
          prev === 'error'
            ? 'error'
            : userStillRequested || env.reducedMotion
              ? 'still'
              : 'idle',
        );
      }
      return;
    }

    if (controllerRef.current) return;

    const gen = ++generationRef.current;
    let cancelled = false;
    let idleHandle = 0;
    let timeoutHandle: ReturnType<typeof globalThis.setTimeout> | 0 = 0;
    let resizeObserver: ResizeObserver | null = null;

    const handleForeignTakeover = () => {
      cancelled = true;
      generationRef.current += 1;
      if (idleHandle && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle) clearTimeout(timeoutHandle);
      resizeObserver?.disconnect();
      if (controllerRef.current) {
        controllerRef.current.dispose();
        controllerRef.current = null;
      }
      setFirstFrameReady(false);
      setStillOpening(getLiveOpening());
      setStillPanelOpenings(getLiveChainFrame()?.panelOpenings ?? null);
      setActivationNonce(0);
      setGraphicsState('still');
    };

    const startEngine = async () => {
      if (cancelled || gen !== generationRef.current) return;
      setGraphicsState('initializing');

      acquireWebglHost(hostId, handleForeignTakeover);

      try {
        const mod = await import('./FoldScene');
        if (cancelled || gen !== generationRef.current) {
          releaseWebglHost(hostId);
          return;
        }

        const chainFrame = getLiveChainFrame();
        const initialLayout = measurePortalLayout();
        if (initialLayout.slotRect) {
          portalSlotRectRef.current = initialLayout.slotRect;
        }
        const ctrl = mod.createFoldScene({
          container: hostEl,
          initialDesign: {
            ...latestDesignRef.current,
            opening: getLiveOpening(),
          },
          initialPanelOpenings: chainFrame?.panelOpenings,
          initialUpload: latestUploadRef.current?.bitmap ?? null,
          initialView: latestViewRef.current,
          initialRoomLighting: latestRoomLightingRef.current,
          isCoarsePointer: env.isCoarsePointer,
          fitPadding,
          atelierFraming: isAtelier,
          initialSlotRect: useFullBleedPortal ? initialLayout.slotRect : null,
          onFirstFrame: () => {
            if (cancelled || gen !== generationRef.current) return;
            setFirstFrameReady(true);
            setGraphicsState('live');
          },
          onContextLost: () => {
            if (cancelled || gen !== generationRef.current) return;
            generationRef.current += 1;
            ctrl.dispose();
            if (controllerRef.current === ctrl) {
              controllerRef.current = null;
            }
            setFirstFrameReady(false);
            setActivationNonce(0);
            setStillOpening(getLiveOpening());
            setStillPanelOpenings(getLiveChainFrame()?.panelOpenings ?? null);
            setGraphicsState('error');
            releaseWebglHost(hostId);
          },
        });

        if (cancelled || gen !== generationRef.current) {
          ctrl.dispose();
          releaseWebglHost(hostId);
          return;
        }

        controllerRef.current = ctrl;
        ctrl.setDesign(
          { ...latestDesignRef.current, opening: getLiveOpening() },
          latestUploadRef.current?.bitmap ?? null,
          env.reducedMotion,
        );
        ctrl.setViewAngles(latestViewRef.current, true);
        if (latestRoomLightingRef.current) {
          ctrl.setRoomLighting(latestRoomLightingRef.current, true);
        }
        ctrl.setActive(
          isVisibleRef.current && document.visibilityState === 'visible',
        );

        if (!useFullBleedPortal) {
          let lastObsW = Math.round(hostEl.clientWidth);
          let lastObsH = Math.round(hostEl.clientHeight);
          resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
              const width = Math.round(entry.contentRect.width);
              const height = Math.round(entry.contentRect.height);
              if (width >= 4 && height >= 4 && (width !== lastObsW || height !== lastObsH)) {
                lastObsW = width;
                lastObsH = height;
                ctrl.resize(width, height);
              }
            }
          });
          resizeObserver.observe(hostEl);
        } else {
          const synced = measurePortalLayout();
          if (synced.hostW >= 4 && synced.hostH >= 4) {
            ctrl.resize(synced.hostW, synced.hostH, synced.slotRect);
          }
        }
      } catch {
        if (!cancelled && gen === generationRef.current) {
          setFirstFrameReady(false);
          setActivationNonce(0);
          setStillOpening(getLiveOpening());
          setGraphicsState('error');
          releaseWebglHost(hostId);
        }
      }
    };

    if (explicitlyRequested) {
      void startEngine();
    } else if (typeof window.requestIdleCallback === 'function') {
      idleHandle = window.requestIdleCallback(() => void startEngine(), {
        timeout: 220,
      });
    } else {
      timeoutHandle = globalThis.setTimeout(() => void startEngine(), 32);
    }

    return () => {
      cancelled = true;
      generationRef.current += 1;
      if (idleHandle && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle) clearTimeout(timeoutHandle);
      resizeObserver?.disconnect();
      if (controllerRef.current) {
        controllerRef.current.dispose();
        controllerRef.current = null;
      }
      setFirstFrameReady(false);
      releaseWebglHost(hostId);
    };
    // Intentionally governed by eligibility, viewport ownership, and explicit user toggles
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    wantsWebgl,
    explicitlyRequested,
    env.isCoarsePointer,
    env.reducedMotion,
    userStillRequested,
    hostId,
    fitPadding,
    useFullBleedPortal,
    canvasPortalEl,
  ]);

  // Direct pointer drag orbit controller + idle hover parallax (works across both 3D & 2D fallback)
  const dragStateRef = useRef<{
    pointerId: number | null;
    startX: number;
    startY: number;
    startYaw: number;
    startElev: number;
    crossedThreshold: boolean;
    pointerType: string;
    latestYaw: number;
    latestElev: number;
    rafId: number;
  }>({
    pointerId: null,
    startX: 0,
    startY: 0,
    startYaw: view.yawDeg,
    startElev: view.elevationDeg,
    crossedThreshold: false,
    pointerType: 'mouse',
    latestYaw: view.yawDeg,
    latestElev: view.elevationDeg,
    rafId: 0,
  });

  const endDrag = useCallback(
    (commitFinal: boolean) => {
      const ds = dragStateRef.current;
      if (ds.rafId) {
        cancelAnimationFrame(ds.rafId);
        ds.rafId = 0;
      }
      if (ds.pointerId !== null) {
        const el = viewportRef.current;
        if (el) {
          try {
            if (el.hasPointerCapture(ds.pointerId)) {
              el.releasePointerCapture(ds.pointerId);
            }
          } catch {
            // ignore already released
          }
        }
        if (commitFinal && ds.crossedThreshold) {
          setViewAngles(ds.latestYaw, ds.latestElev);
        }
      }
      ds.pointerId = null;
      ds.crossedThreshold = false;
      setIsDragging(false);
    },
    [setViewAngles],
  );

  useEffect(() => {
    return () => endDrag(false);
  }, [endDrag, env.reducedMotion, graphicsState]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current.pointerId !== null) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    const ds = dragStateRef.current;
    ds.pointerId = e.pointerId;
    ds.startX = e.clientX;
    ds.startY = e.clientY;
    ds.startYaw = view.yawDeg;
    ds.startElev = view.elevationDeg;
    ds.latestYaw = view.yawDeg;
    ds.latestElev = view.elevationDeg;
    ds.crossedThreshold = false;
    ds.pointerType = e.pointerType;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // ignore if capture unsupported
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const ds = dragStateRef.current;

    if (ds.pointerId !== e.pointerId) {
      // Gentle pointer-responsive camera parallax (1–2.2°) while hovering atelier scene
      if (
        isAtelier &&
        ds.pointerId === null &&
        e.pointerType === 'mouse' &&
        viewportRef.current &&
        controllerRef.current
      ) {
        const rect = viewportRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
          const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
          controllerRef.current.setPointerParallax(nx, ny);
        }
      }
      return;
    }

    const dx = e.clientX - ds.startX;
    const dy = e.clientY - ds.startY;
    if (!ds.crossedThreshold) {
      if (Math.hypot(dx, dy) < 4) return;
      ds.crossedThreshold = true;
      setIsDragging(true);
      // Safe interruption if user drags model during entrance or fold demo
      if (choreographyMode !== 'idle') {
        cancelChoreography();
      }
    }

    const width = viewportRef.current?.clientWidth || 640;
    const yawSens = 360 / Math.max(300, width * 0.72);
    const nextYaw = normalizeYawDeg(ds.startYaw - dx * yawSens);
    const nextElev =
      ds.pointerType === 'touch'
        ? ds.startElev
        : normalizeElevationDeg(ds.startElev + dy * 0.16);

    ds.latestYaw = nextYaw;
    ds.latestElev = nextElev;

    if (controllerRef.current) {
      controllerRef.current.setViewAngles(
        { yawDeg: nextYaw, elevationDeg: nextElev },
        true,
      );
    }

    if (ds.rafId === 0) {
      ds.rafId = requestAnimationFrame(() => {
        ds.rafId = 0;
        setViewAngles(ds.latestYaw, ds.latestElev);
      });
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current.pointerId !== e.pointerId) return;
    endDrag(true);
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current.pointerId !== e.pointerId) return;
    endDrag(false);
  };

  const handlePointerEnter = () => {
    if (isAtelier) {
      controllerRef.current?.setHovered(true);
    }
  };

  const handlePointerLeave = () => {
    if (isAtelier) {
      controllerRef.current?.setHovered(false);
      controllerRef.current?.setPointerParallax(0, 0);
    }
  };

  const handleUseStill = () => {
    setUserStillRequested(true);
    setActivationNonce(0);
    disposeController();
  };

  const handleExplore3D = () => {
    if (env.reducedMotion) return;
    setUserStillRequested(false);
    setActivationNonce((n) => n + 1);
  };

  const effectiveNowOpening = controllerRef.current ? getLiveOpening() : stillOpening;
  const currentPose =
    stillPanelOpenings && stillPanelOpenings.length === 16
      ? deriveFoldChain(stillPanelOpenings)
      : deriveFold(effectiveNowOpening);
  const printSpec = PRINT_SPECS[design.print];
  const chapterCode = STORY_CHAPTERS[chapter]?.index ?? '01';
  const showWebglCanvas =
    graphicsState === 'live' && firstFrameReady && activeWebglHost === hostId;

  useEffect(() => {
    if (showWebglCanvas && controllerRef.current) {
      controllerRef.current.renderOnce();
    }
  }, [showWebglCanvas]);

  const accessibleDescription = [
    `Fold ${FOLD_CONSTANTS.panels} divider`,
    `${Math.round(effectiveNowOpening)} percent open`,
    `outer span ${formatMeters(currentPose.metrics.outerSpan)}`,
    `${printSpec.name} print`,
    `base ${design.baseHex}`,
    printSpec.usesDesignColor ? `design ${design.designHex}` : null,
    printSpec.usesScale ? `${printSpec.scaleLabel.toLowerCase()} ${design.motifScale}%` : null,
    design.print === 'upload' && uploadedArt
      ? `uploaded image ${uploadedArt.filename}`
      : null,
    `view ${Math.round(view.yawDeg)} degrees`,
  ]
    .filter(Boolean)
    .join(', ');

  const stageVisualLayer = (
    <>
      <div
        className={`absolute inset-0 ${
          showWebglCanvas
            ? 'opacity-0 pointer-events-none transition-opacity duration-200'
            : 'opacity-100'
        }`}
        aria-hidden={showWebglCanvas || undefined}
      >
        <FoldStillCanvas
          opening={effectiveNowOpening}
          panelOpenings={stillPanelOpenings}
          design={design}
          view={view}
          uploadedBitmap={uploadedArt?.bitmap ?? null}
          showBracket={showSpanBracket && !compact}
          atelierFraming={isAtelier}
          darkSurface={isAtelier && darkSurface}
          slotRect={useFullBleedPortal ? portalSlotRect : null}
          background={isAtelier ? null : undefined}
        />
      </div>

      <div
        ref={canvasHostRef}
        data-testid={`fold-canvas-host-${hostId}`}
        className={`absolute inset-0 ${
          showWebglCanvas
            ? 'opacity-100 transition-opacity duration-200'
            : 'opacity-0 pointer-events-none'
        }`}
      />
    </>
  );

  return (
    <div
      ref={stageRef}
      data-testid={`fold-stage-${hostId}`}
      data-variant={variant}
      data-graphics-state={showWebglCanvas ? 'live' : graphicsState}
      data-opening={Math.round(effectiveNowOpening)}
      className={
        isAtelier
          ? `relative w-full h-full bg-transparent overflow-visible flex flex-col justify-between pointer-events-none ${className}`
          : `relative w-full h-full rounded-[8px] border border-[var(--srf-hairline)] bg-[var(--srf-rose)] overflow-hidden flex flex-col justify-between ${className}`
      }
    >
      {/* Single accurate accessible description next to the visual representation */}
      <p className="sr-only" data-testid={`fold-stage-sr-${hostId}`}>
        {accessibleDescription}
      </p>

      {/* Top instrumentation & mode control */}
      <div
        className={`relative z-10 flex items-center justify-between gap-3 shrink-0 pointer-events-none ${
          isAtelier
            ? 'px-1 pt-1 sm:px-2 sm:pt-1.5'
            : compact
              ? 'px-3 pt-2'
              : 'px-3 pt-2 sm:px-5 sm:pt-4'
        }`}
      >
        {isAtelier ? (
          <div
            className="min-w-0 flex flex-wrap items-center gap-x-2 gap-y-0.5 srf-mono-caption select-none"
            style={{ color: 'var(--room-text-primary)' }}
          >
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <CircularDragHintSvg />
              <span>Drag to rotate</span>
            </span>
            <span
              className="hidden sm:inline opacity-65"
              style={{ color: 'var(--room-text-secondary)' }}
              aria-hidden="true"
            >
              ·
            </span>
            <span
              className="uppercase tracking-[0.04em] text-[11px] sm:text-xs"
              style={{ color: 'var(--room-text-secondary)' }}
              data-testid="hero-atelier-readout"
            >
              Fold {FOLD_CONSTANTS.panels} · {printSpec.name} · {design.baseHex} ·{' '}
              <span
                ref={atelierReadoutSpanRef}
                className="font-medium whitespace-nowrap"
                style={{ color: 'var(--room-text-primary)' }}
              >
                {formatMeters(currentPose.metrics.outerSpan)}
              </span>{' '}
              span
            </span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5 srf-mono-caption text-[var(--srf-mauve)] pointer-events-none select-none">
            <CircularDragHintSvg />
            <span>Drag to rotate</span>
            {showStoryBadge && mode === 'story' && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[var(--srf-oxblood)]">{chapterCode} / 03</span>
              </>
            )}
          </div>
        )}

        <div className="pointer-events-auto flex items-center gap-2 shrink-0">
          {!env.reducedMotion && (
            <>
              {showWebglCanvas ? (
                <button
                  type="button"
                  onClick={handleUseStill}
                  className={`srf-btn-secondary ${
                    isAtelier && darkSurface
                      ? 'bg-[#2B2426]/90 !text-[#F8F2EE] !border-[#F8F2EE]/30 hover:!border-[#F8F2EE]'
                      : 'bg-[var(--srf-rose)]/92'
                  } ${
                    compact || isAtelier
                      ? '!min-h-[34px] !py-1 !px-2.5 text-xs'
                      : '!min-h-[34px] sm:!min-h-[38px] !py-1 sm:!py-1.5 !px-2.5 sm:!px-3 text-xs'
                  }`}
                >
                  Use still view
                </button>
              ) : graphicsState === 'error' ? (
                <button
                  type="button"
                  onClick={handleExplore3D}
                  className={`srf-btn-secondary ${
                    isAtelier && darkSurface
                      ? 'bg-[#2B2426]/90 !text-[#F8F2EE] !border-[#F8F2EE]/30 hover:!border-[#F8F2EE]'
                      : 'bg-[var(--srf-rose)]/92'
                  } ${
                    compact || isAtelier
                      ? '!min-h-[34px] !py-1 !px-2.5 text-xs'
                      : '!min-h-[34px] sm:!min-h-[38px] !py-1 sm:!py-1.5 !px-2.5 sm:!px-3 text-xs'
                  }`}
                >
                  Try 3D again
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleExplore3D}
                  disabled={graphicsState === 'initializing'}
                  className={`srf-btn-secondary ${
                    isAtelier && darkSurface
                      ? 'bg-[#2B2426]/90 !text-[#F8F2EE] !border-[#F8F2EE]/30 hover:!border-[#F8F2EE]'
                      : 'bg-[var(--srf-rose)]/92'
                  } ${
                    compact || isAtelier
                      ? '!min-h-[34px] !py-1 !px-2.5 text-xs'
                      : '!min-h-[34px] sm:!min-h-[38px] !py-1 sm:!py-1.5 !px-2.5 sm:!px-3 text-xs'
                  }`}
                >
                  {graphicsState === 'initializing' ? 'Opening 3D…' : 'Explore in 3D'}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Direct drag viewport containing synced 2D still renderer & active WebGL host (or portal to full-bleed Hero layer) */}
      <div
        ref={viewportRef}
        data-testid={`fold-viewport-${hostId}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onLostPointerCapture={() => endDrag(false)}
        style={{ touchAction: 'pan-y pinch-zoom' }}
        className={`relative flex-1 min-h-0 w-full select-none pointer-events-auto ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {!useFullBleedPortal && stageVisualLayer}
      </div>

      {useFullBleedPortal &&
        canvasPortalEl &&
        createPortal(stageVisualLayer, canvasPortalEl)}

      {/* Framed studio caption bar (omitted on borderless atelier hero, where instrumentation lives cleanly above) */}
      {!isAtelier && (
        <div
          className={`relative z-10 shrink-0 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--srf-hairline)]/60 bg-[var(--srf-rose)] ${
            compact ? 'px-3 py-1.5' : 'px-3 py-1.5 sm:px-5 sm:py-3'
          }`}
        >
          <p className="srf-mono-caption text-[var(--srf-oxblood)] truncate">
            Fold {FOLD_CONSTANTS.panels} · {printSpec.name} · {design.baseHex} ·{' '}
            <span ref={spanTextRef} className="font-medium">
              {formatMeters(currentPose.metrics.outerSpan)}
            </span>{' '}
            span
          </p>

          {!compact && (
            <p className="hidden sm:block srf-mono-caption text-[var(--srf-mauve)] shrink-0">
              {env.reducedMotion
                ? 'Still view (reduced motion)'
                : graphicsState === 'error'
                  ? 'Still view (3D unavailable)'
                  : `${Math.round(view.yawDeg)}°`}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
