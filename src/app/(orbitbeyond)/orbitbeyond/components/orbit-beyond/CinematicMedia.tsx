'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ORBIT_ASSETS } from '../../lib/orbit-beyond/assets';
import { usePrefersReducedMotion } from '../../lib/orbit-beyond/motion';

export interface CinematicMediaProps {
  /** Pauses background video while the teaser modal is open so two decodes do not run at once */
  pausedByModal: boolean;
  /** Callback fired if the hero video genuinely fails to load */
  onVideoUnavailable?: () => void;
}

export function CinematicMedia({ pausedByModal, onVideoUnavailable }: CinematicMediaProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [posterSrc, setPosterSrc] = useState<string>(ORBIT_ASSETS.heroPoster);
  const [videoSrc, setVideoSrc] = useState<string>(ORBIT_ASSETS.heroVideo);
  const [isVideoReady, setIsVideoReady] = useState<boolean>(false);
  const [hasVideoFailed, setHasVideoFailed] = useState<boolean>(false);
  const [isInViewport, setIsInViewport] = useState<boolean>(true);

  // Observe whether hero is within or near the viewport to pause/resume cleanly without resetting time
  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsInViewport(entry.isIntersecting);
        }
      },
      { rootMargin: '200px 0px', threshold: 0.01 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Control play/pause based on reduced motion, modal state, viewport visibility, and tab visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasVideoFailed) {
      return;
    }

    video.muted = true;

    const syncPlayback = () => {
      if (
        prefersReducedMotion ||
        pausedByModal ||
        !isInViewport ||
        document.visibilityState === 'hidden'
      ) {
        if (!video.paused) {
          video.pause();
        }
      } else {
        const playPromise = video.play();
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {
            // Autoplay blocked by browser or data-saver; clean poster remains visible underneath
          });
        }
      }
    };

    syncPlayback();

    const handleVisibilityChange = () => syncPlayback();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [prefersReducedMotion, pausedByModal, isInViewport, hasVideoFailed, videoSrc]);

  const handleVideoLoaded = () => {
    if (!prefersReducedMotion && !hasVideoFailed) {
      setIsVideoReady(true);
    }
  };

  const handleVideoError = () => {
    if (videoSrc === ORBIT_ASSETS.heroVideo) {
      setVideoSrc(ORBIT_ASSETS.heroVideoAltPath);
      return;
    }
    setHasVideoFailed(true);
    setIsVideoReady(false);
    onVideoUnavailable?.();
  };

  const handlePosterError = () => {
    if (posterSrc === ORBIT_ASSETS.heroPoster) {
      setPosterSrc(ORBIT_ASSETS.heroPosterAltPath);
    }
  };

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#030812] select-none"
      aria-hidden="true"
    >
      {/* Layer 1: Immediate clean poster image (no baked typography) */}
      <img
        src={posterSrc}
        alt=""
        fetchPriority="high"
        decoding="async"
        onError={handlePosterError}
        className="
          absolute inset-0 h-full w-full object-cover
          object-[54%_center] sm:object-[52%_center] lg:object-center
        "
      />

      {/* Layer 2: Self-looping 10-second hero video in the exact same box */}
      {!prefersReducedMotion && !hasVideoFailed && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onLoadedData={handleVideoLoaded}
          onCanPlay={handleVideoLoaded}
          onError={handleVideoError}
          className={`
            pointer-events-none absolute inset-0 h-full w-full object-cover
            object-[54%_center] sm:object-[52%_center] lg:object-center
            transition-opacity duration-500 ease-out
            ${isVideoReady ? 'opacity-100' : 'opacity-0'}
          `}
        />
      )}

      {/* Layer 3: Single scene-wide subtle atmospheric scrim for text contrast without hiding Earth, astronauts, dome, or rocket */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 68% 46% at 50% 46%, rgba(3, 8, 18, 0.42) 0%, rgba(3, 8, 18, 0.16) 58%, rgba(3, 8, 18, 0.48) 100%), linear-gradient(180deg, rgba(3, 8, 18, 0.52) 0%, rgba(3, 8, 18, 0.08) 28%, rgba(3, 8, 18, 0.14) 72%, rgba(3, 8, 18, 0.88) 100%)',
        }}
      />
    </div>
  );
}
