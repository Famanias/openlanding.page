import { useEffect, useRef, useCallback } from 'react';
import {
  SpotlightMode,
  stepSpotlightInertia,
  computeRelativePointerPosition,
  computeMaxCornerRadius,
  getResponsiveSpotlightRadius,
  resolveSpotlightRadius,
  buildRadialMaskGradient,
} from '../lib/motion';

interface UseSpotlightOptions {
  stageRef: React.RefObject<HTMLDivElement | null>;
  maskLayerRef: React.RefObject<HTMLDivElement | null>;
  scatterLayerRef: React.RefObject<HTMLDivElement | null>;
  cursorIndicatorRef: React.RefObject<HTMLDivElement | null>;
  reducedMotion: boolean;
  illuminationVisible: boolean;
  mode: SpotlightMode;
  onModeChange: (nextMode: SpotlightMode) => void;
  onFirstPointerMove?: () => void;
}

export function useSpotlight({
  stageRef,
  maskLayerRef,
  scatterLayerRef,
  cursorIndicatorRef,
  reducedMotion,
  illuminationVisible,
  mode,
  onModeChange,
  onFirstPointerMove,
}: UseSpotlightOptions) {
  // Imperative refs to prevent 60fps React re-renders
  const targetRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0, r: 260, opacity: 0.85 });
  const stageSizeRef = useRef({ width: 1440, height: 900, baseRadius: 260 });
  const pointerActiveRef = useRef(false);
  const hasInteractedRef = useRef(false);
  const introProgressRef = useRef(reducedMotion ? 1 : 0.15);
  const scrollProgressRef = useRef(0);
  const modeRef = useRef<SpotlightMode>(mode);
  const illuminationVisibleRef = useRef(illuminationVisible);
  const isVisibleInViewportRef = useRef(true);
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  modeRef.current = mode;
  illuminationVisibleRef.current = illuminationVisible;

  const applyMaskStyles = useCallback(
    (x: number, y: number, radiusPx: number, opacity: number, fullReveal: boolean) => {
      const maskEl = maskLayerRef.current;
      const scatterEl = scatterLayerRef.current;
      const cursorEl = cursorIndicatorRef.current;

      if (maskEl) {
        if (fullReveal) {
          maskEl.classList.add('is-full-reveal');
          maskEl.style.maskImage = 'none';
          maskEl.style.webkitMaskImage = 'none';
          maskEl.style.opacity = '1';
        } else {
          maskEl.classList.remove('is-full-reveal');
          const gradient = buildRadialMaskGradient(x, y, radiusPx);
          maskEl.style.setProperty('--spot-x', `${Math.round(x)}px`);
          maskEl.style.setProperty('--spot-y', `${Math.round(y)}px`);
          maskEl.style.setProperty('--spot-r', `${Math.round(radiusPx)}px`);
          maskEl.style.maskImage = gradient;
          maskEl.style.webkitMaskImage = gradient;
          maskEl.style.opacity = opacity.toFixed(3);
        }
      }

      if (scatterEl) {
        scatterEl.style.setProperty('--spot-x', `${Math.round(x)}px`);
        scatterEl.style.setProperty('--spot-y', `${Math.round(y)}px`);
        scatterEl.style.setProperty('--spot-r', `${Math.round(radiusPx)}px`);
        scatterEl.style.opacity = fullReveal ? '0.35' : (opacity * 0.9).toFixed(3);
      }

      if (cursorEl) {
        const showIndicator =
          pointerActiveRef.current &&
          !fullReveal &&
          scrollProgressRef.current < 0.08 &&
          !reducedMotion;
        cursorEl.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`;
        cursorEl.style.opacity = showIndicator ? '1' : '0';
      }
    },
    [maskLayerRef, scatterLayerRef, cursorIndicatorRef, reducedMotion]
  );

  const measureStage = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    const baseRadius = getResponsiveSpotlightRadius(window.innerWidth);
    stageSizeRef.current = { width, height, baseRadius };

    // Default architectural focal point: warm concrete cantilever & boulder gallery (52% X, 56% Y)
    if (!hasInteractedRef.current) {
      const defaultX = width * 0.52;
      const defaultY = height * 0.56;
      targetRef.current = { x: defaultX, y: defaultY };
      smoothRef.current.x = defaultX;
      smoothRef.current.y = defaultY;
      smoothRef.current.r = baseRadius * 0.85;
    }
  }, [stageRef]);

  // Expose imperative setter for GSAP ScrollTrigger progress (0..1)
  const setScrollProgress = useCallback(
    (progress: number) => {
      const clamped = Math.max(0, Math.min(1, progress));
      scrollProgressRef.current = clamped;

      if (illuminationVisibleRef.current) return;

      if (clamped >= 0.98) {
        if (modeRef.current !== 'complete') {
          modeRef.current = 'complete';
          onModeChange('complete');
        }
      } else if (clamped > 0.02) {
        if (modeRef.current !== 'scroll') {
          modeRef.current = 'scroll';
          onModeChange('scroll');
        }
      } else if (modeRef.current === 'scroll' || modeRef.current === 'complete') {
        modeRef.current = 'pointer';
        onModeChange('pointer');
      }

      // Immediately compute and apply when driven by scroll for zero-lag sync
      const { width, height, baseRadius } = stageSizeRef.current;
      const maxCornerRadius = computeMaxCornerRadius(
        smoothRef.current.x,
        smoothRef.current.y,
        width,
        height
      );
      const resolved = resolveSpotlightRadius({
        mode: modeRef.current,
        baseRadius,
        maxCornerRadius,
        scrollProgress: clamped,
        introProgress: introProgressRef.current,
        pointerActive: pointerActiveRef.current,
        illuminationVisible: illuminationVisibleRef.current,
      });

      applyMaskStyles(
        smoothRef.current.x,
        smoothRef.current.y,
        resolved.radiusPx,
        resolved.opacity,
        resolved.fullReveal
      );
    },
    [applyMaskStyles, onModeChange]
  );

  // Update pointer coordinates from hero-local pointer or touch events
  const updatePointerFromClient = useCallback(
    (clientX: number, clientY: number) => {
      const stage = stageRef.current;
      if (!stage) return;
      const rect = stage.getBoundingClientRect();
      const pos = computeRelativePointerPosition(clientX, clientY, rect);
      targetRef.current = { x: pos.x, y: pos.y };
      pointerActiveRef.current = true;

      if (!hasInteractedRef.current) {
        hasInteractedRef.current = true;
        onFirstPointerMove?.();
      }

      if (
        modeRef.current === 'intro' &&
        scrollProgressRef.current <= 0.02 &&
        !illuminationVisibleRef.current
      ) {
        modeRef.current = 'pointer';
        onModeChange('pointer');
      }
    },
    [stageRef, onFirstPointerMove, onModeChange]
  );

  const handlePointerLeave = useCallback(() => {
    pointerActiveRef.current = false;
  }, []);

  // Main animation loop & intro choreography
  useEffect(() => {
    measureStage();

    const handleResize = () => {
      measureStage();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Pause RAF when hero is scrolled completely out of view
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined' && stageRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry) {
            isVisibleInViewportRef.current = entry.isIntersecting;
          }
        },
        { threshold: 0.01 }
      );
      observer.observe(stageRef.current);
    }

    const startTimestamp = performance.now();
    lastTimeRef.current = startTimestamp;

    const tick = (now: number) => {
      const deltaSeconds = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;

      if (!document.hidden && isVisibleInViewportRef.current) {
        const elapsed = (now - startTimestamp) / 1000;
        if (!reducedMotion && introProgressRef.current < 1) {
          // Smoothly bloom initial architectural light over first 1.6s
          const rawIntro = Math.min(1, elapsed / 1.6);
          introProgressRef.current = 1 - Math.pow(1 - rawIntro, 3);
          if (rawIntro >= 1 && modeRef.current === 'intro') {
            modeRef.current = 'pointer';
          }
        } else {
          introProgressRef.current = 1;
        }

        const { width, height, baseRadius } = stageSizeRef.current;

        if (reducedMotion) {
          smoothRef.current.x = targetRef.current.x;
          smoothRef.current.y = targetRef.current.y;
        } else {
          // When pointer hasn't moved yet, impart a very subtle breathing drift around the architectural cantilever
          if (!hasInteractedRef.current && scrollProgressRef.current < 0.02) {
            targetRef.current.x = width * 0.52 + Math.sin(elapsed * 0.7) * 28;
            targetRef.current.y = height * 0.56 + Math.cos(elapsed * 0.55) * 14;
          }
          smoothRef.current.x = stepSpotlightInertia(
            smoothRef.current.x,
            targetRef.current.x,
            deltaSeconds,
            10
          );
          smoothRef.current.y = stepSpotlightInertia(
            smoothRef.current.y,
            targetRef.current.y,
            deltaSeconds,
            10
          );
        }

        const maxCornerRadius = computeMaxCornerRadius(
          smoothRef.current.x,
          smoothRef.current.y,
          width,
          height
        );

        const resolved = resolveSpotlightRadius({
          mode: modeRef.current,
          baseRadius,
          maxCornerRadius,
          scrollProgress: scrollProgressRef.current,
          introProgress: introProgressRef.current,
          pointerActive: pointerActiveRef.current,
          illuminationVisible: illuminationVisibleRef.current,
        });

        smoothRef.current.r = reducedMotion
          ? resolved.radiusPx
          : stepSpotlightInertia(smoothRef.current.r, resolved.radiusPx, deltaSeconds, 12);

        smoothRef.current.opacity = reducedMotion
          ? resolved.opacity
          : stepSpotlightInertia(smoothRef.current.opacity, resolved.opacity, deltaSeconds, 8);

        applyMaskStyles(
          smoothRef.current.x,
          smoothRef.current.y,
          smoothRef.current.r,
          smoothRef.current.opacity,
          resolved.fullReveal
        );
      }

      rafIdRef.current = window.requestAnimationFrame(tick);
    };

    rafIdRef.current = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (observer) observer.disconnect();
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [measureStage, applyMaskStyles, reducedMotion, stageRef]);

  return {
    updatePointerFromClient,
    handlePointerLeave,
    setScrollProgress,
  };
}
