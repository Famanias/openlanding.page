import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FooterGlassScene } from './FooterGlassScene';

export const FooterGlass: React.FC = () => {
  const artworkRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const artwork = artworkRef.current;
    if (!artwork) return;

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const update = () => {
      const shouldAnimate = visible && !motionPreference.matches;
      if (!shouldAnimate) setReady(false);
      setActive(shouldAnimate);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { rootMargin: '160px' });

    observer.observe(artwork);
    motionPreference.addEventListener('change', update);
    return () => {
      observer.disconnect();
      motionPreference.removeEventListener('change', update);
    };
  }, []);

  return (
    <div
      ref={artworkRef}
      aria-hidden="true"
      data-testid="footer-glass"
      data-ready={ready}
      className="lumen-footer-glass pointer-events-none absolute -bottom-2 -right-[35%] -z-10 h-[65%] w-[160%] md:-right-[6%] md:h-[95%] md:w-[85%]"
    >
      <Image
        src="/templates/lumen/footer-glass-cutout.webp"
        alt=""
        fill
        sizes="(max-width: 767px) 160vw, 85vw"
        className={`object-contain object-right-bottom transition-opacity duration-500 ${ready ? 'opacity-0' : 'opacity-100'}`}
      />
      {active && (
        <FooterGlassScene onReadyChange={setReady} />
      )}
    </div>
  );
};
