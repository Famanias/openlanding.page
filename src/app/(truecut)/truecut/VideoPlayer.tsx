"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type VideoPlayerProps = {
  videoKey: string;
  desktop: string;
  mobile: string;
  label: string;
  className: string;
  children: ReactNode;
};

export function VideoPlayer({ videoKey, desktop, mobile, label, className, children }: VideoPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const manual = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const phone = window.matchMedia("(max-width: 699px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let visible = false;
    const sync = () => {
      const source = phone.matches ? mobile : desktop;
      if (video.getAttribute("src") !== source) {
        video.src = source;
        setReady(false);
      }
      if (!visible || reduced.matches || phone.matches || connection?.saveData) {
        video.pause();
        if (reduced.matches) setReady(false);
      } else if (!manual.current) {
        void video.play().catch(() => { /* Autoplay can be blocked; the play button remains available. */ });
      }
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.1 });
    observer.observe(video);
    phone.addEventListener("change", sync);
    reduced.addEventListener("change", sync);
    sync();
    return () => {
      observer.disconnect();
      phone.removeEventListener("change", sync);
      reduced.removeEventListener("change", sync);
      video.pause();
    };
  }, [desktop, mobile]);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    manual.current = true;
    if (video.paused) void video.play().catch(() => setPlaying(false));
    else video.pause();
  };

  return (
    <div className={`tc-video-frame ${className}`} data-video={videoKey}>
      <div className="tc-video-visual">
        {children}
        <video
          ref={ref}
          className="tc-video"
          data-ready={ready && !failed}
          muted loop playsInline preload="none"
          width={1600} height={900}
          aria-label={label}
          onLoadedData={() => setReady(true)}
          onPlay={() => { setPlaying(true); setReady(true); }}
          onPause={() => setPlaying(false)}
          onError={() => { setFailed(true); setPlaying(false); }}
        />
      </div>
      {!failed && <button className="tc-video-control" type="button" onClick={toggle} aria-label={`${playing ? "Pause" : "Play"} ${label}`}>
        {playing ? "Pause reel" : "Play reel"}
      </button>}
    </div>
  );
}
