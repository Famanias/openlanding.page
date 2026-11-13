'use client';

import { CSSProperties, ReactNode, useEffect, useRef } from 'react';

interface RevealProps {
  children: ReactNode;
  variant?: 'rise' | 'mask' | 'wipe' | 'line';
  delayMs?: number;
  className?: string;
}

export default function Reveal({
  children,
  variant = 'rise',
  delayMs = 0,
  className = '',
}: RevealProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      inner.classList.add('is-visible');
      return;
    }

    const isNearViewport = () => {
      const rect = outer.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.98 && rect.bottom > 0;
    };

    if (isNearViewport()) {
      inner.classList.add('is-visible');
      return;
    }

    inner.classList.remove('is-visible');

    const reveal = () => {
      inner.classList.add('is-visible');
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };

    const onScroll = () => {
      if (isNearViewport()) {
        reveal();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting || isNearViewport()) {
          reveal();
        }
      },
      { threshold: 0.01, rootMargin: '60px 0px 60px 0px' },
    );

    observer.observe(outer);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const style = delayMs > 0 ? ({ '--mnw-delay': `${delayMs}ms` } as CSSProperties) : undefined;

  return (
    <div ref={outerRef}>
      <div
        ref={innerRef}
        data-reveal={variant}
        style={style}
        className={`mnw-reveal is-visible ${className}`.trim()}
      >
        {children}
      </div>
    </div>
  );
}
