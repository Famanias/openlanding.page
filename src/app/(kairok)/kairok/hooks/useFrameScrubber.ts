import { RefObject, useEffect, useRef, useState } from 'react';
import {
  KAIRO_ASSETS,
  SEQUENCE_FRAME_COUNT,
  getSequenceFrameUrl,
} from '../lib/assets';

export interface FrameScrubberStatus {
  ready: boolean;
  loadedFramesCount: number;
  usingVideoFallback: boolean;
}

function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  source: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number,
  canvasWidth: number,
  canvasHeight: number
) {
  if (!sourceWidth || !sourceHeight || !canvasWidth || !canvasHeight) return;
  const scale = Math.max(canvasWidth / sourceWidth, canvasHeight / sourceHeight);
  const drawW = sourceWidth * scale;
  const drawH = sourceHeight * scale;
  const offsetX = (canvasWidth - drawW) * 0.5;
  const offsetY = (canvasHeight - drawH) * 0.5;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(source, offsetX, offsetY, drawW, drawH);
}

export function useFrameScrubber(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  videoRef: RefObject<HTMLVideoElement | null>,
  sequenceFrame: number,
  videoTimeSec: number,
  disabled = false
): FrameScrubberStatus {
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const [ready, setReady] = useState(false);
  const [loadedFramesCount, setLoadedFramesCount] = useState(0);
  const [usingVideoFallback, setUsingVideoFallback] = useState(false);
  const lastDrawnFrameRef = useRef<number>(-1);
  const seekingRef = useRef<boolean>(false);
  const pendingTimeRef = useRef<number | null>(null);

  // Preload boundary posters and sequence frames in priority tiers
  useEffect(() => {
    if (disabled || typeof window === 'undefined') return;
    let cancelled = false;
    const cache = imagesRef.current;

    const loadSingleFrame = (index: number, urlOverride?: string): Promise<HTMLImageElement | null> => {
      if (cache.has(index)) {
        return Promise.resolve(cache.get(index) || null);
      }
      return new Promise((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.src = urlOverride || getSequenceFrameUrl(index);
        img.onload = () => {
          if (cancelled) {
            resolve(null);
            return;
          }
          cache.set(index, img);
          setLoadedFramesCount(cache.size);
          if (index === 1 || cache.size >= 4) {
            setReady(true);
          }
          resolve(img);
        };
        img.onerror = () => {
          resolve(null);
        };
      });
    };

    const runPreload = async () => {
      // Tier 1: Exact first and last frames immediately so endpoints are rock-solid
      const firstImg = await loadSingleFrame(1, KAIRO_ASSETS.videoFirst);
      await loadSingleFrame(SEQUENCE_FRAME_COUNT, KAIRO_ASSETS.videoLast);

      if (!firstImg && !cancelled) {
        // Sequence files unavailable — activate <video> seek fallback
        setUsingVideoFallback(true);
        setReady(true);
        return;
      }

      // Tier 2: Keyframes every 6 frames across the 120-frame sequence
      const tier2: number[] = [];
      for (let i = 1; i <= SEQUENCE_FRAME_COUNT; i += 6) {
        if (!cache.has(i)) tier2.push(i);
      }
      await Promise.all(tier2.map((idx) => loadSingleFrame(idx)));

      if (cancelled) return;

      // Tier 3: Remaining intermediate frames in small non-blocking batches of 10
      const remaining: number[] = [];
      for (let i = 1; i <= SEQUENCE_FRAME_COUNT; i++) {
        if (!cache.has(i)) remaining.push(i);
      }
      for (let b = 0; b < remaining.length; b += 10) {
        if (cancelled) break;
        const batch = remaining.slice(b, b + 10);
        await Promise.all(batch.map((idx) => loadSingleFrame(idx)));
      }
    };

    runPreload();

    return () => {
      cancelled = true;
    };
  }, [disabled]);

  // Draw the closest available frame to the canvas whenever sequenceFrame or viewport size changes
  useEffect(() => {
    if (disabled || typeof window === 'undefined') return;

    const renderFrameToCanvas = (force = false) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const targetW = Math.max(1, Math.round(rect.width * dpr));
      const targetH = Math.max(1, Math.round(rect.height * dpr));

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        force = true;
      }

      // Find exact frame or nearest cached frame
      const cache = imagesRef.current;
      let chosenImg = cache.get(sequenceFrame);
      let chosenIdx = sequenceFrame;

      if (!chosenImg && cache.size > 0) {
        let bestDist = Infinity;
        for (const [idx, img] of cache.entries()) {
          const dist = Math.abs(idx - sequenceFrame);
          if (dist < bestDist) {
            bestDist = dist;
            chosenImg = img;
            chosenIdx = idx;
          }
        }
      }

      if (chosenImg && (force || lastDrawnFrameRef.current !== chosenIdx)) {
        drawCoverImage(
          ctx,
          chosenImg,
          chosenImg.naturalWidth || 1280,
          chosenImg.naturalHeight || 720,
          canvas.width,
          canvas.height
        );
        lastDrawnFrameRef.current = chosenIdx;
      }
    };

    renderFrameToCanvas(false);

    const handleResize = () => renderFrameToCanvas(true);
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef, sequenceFrame, loadedFramesCount, disabled]);

  // Coalesced <video> seek controller for fallback or supplemental sync
  useEffect(() => {
    const video = videoRef.current;
    if (!video || disabled) return;

    const applySeek = (targetSec: number) => {
      if (!Number.isFinite(video.duration) || video.readyState < 1) return;
      const safeTime = Math.max(0, Math.min(video.duration - 0.04, targetSec));
      if (Math.abs(video.currentTime - safeTime) < 0.03) return;

      if (seekingRef.current) {
        pendingTimeRef.current = safeTime;
        return;
      }

      seekingRef.current = true;
      try {
        video.currentTime = safeTime;
      } catch {
        seekingRef.current = false;
      }
    };

    const handleSeeked = () => {
      seekingRef.current = false;
      if (pendingTimeRef.current !== null) {
        const nextTime = pendingTimeRef.current;
        pendingTimeRef.current = null;
        applySeek(nextTime);
      }
    };

    video.addEventListener('seeked', handleSeeked);
    applySeek(videoTimeSec);

    return () => {
      video.removeEventListener('seeked', handleSeeked);
    };
  }, [videoRef, videoTimeSec, disabled]);

  return {
    ready,
    loadedFramesCount,
    usingVideoFallback,
  };
}
