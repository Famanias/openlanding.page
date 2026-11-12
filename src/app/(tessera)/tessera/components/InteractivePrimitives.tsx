'use client';

import React, { useEffect, useRef, useState } from 'react';
import { playTactileClick } from '../utils/acousticAudio';

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
  cursorLabel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  href,
  type = 'button',
  variant = 'primary',
  className = '',
  ariaLabel,
  disabled = false,
  cursorLabel,
}) => {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent) => {
    if (reducedMotion || disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    setOffset({
      x: Math.max(-9, Math.min(9, dx * 0.22)),
      y: Math.max(-6, Math.min(6, dy * 0.22)),
    });
  };

  const handlePointerLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (disabled) return;
    playTactileClick(240);
    onClick?.(e);
  };

  const baseStyles =
    'inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 font-medium tracking-wide rounded-md transition-[transform,background-color,border-color,color,opacity] duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C89D66] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0D10] select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none';

  const variantStyles = {
    primary:
      'bg-[#C89D66] text-[#0B0D10] hover:bg-[#D5AD7A] px-5 py-2.5 text-sm font-semibold',
    secondary:
      'bg-[#161A21] text-[#F1F5F9] border border-slate-200/15 hover:border-[#C89D66]/60 hover:text-white px-5 py-2.5 text-sm',
    ghost:
      'bg-transparent text-[#94A3B8] hover:text-[#F1F5F9] border border-transparent hover:border-slate-200/10 px-4 py-2 text-sm',
  }[variant];

  const transformStyle = reducedMotion
    ? undefined
    : { transform: `translate3d(${offset.x.toFixed(1)}px, ${offset.y.toFixed(1)}px, 0)` };

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        data-cursor={cursorLabel}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick}
        style={transformStyle}
        className={`${baseStyles} ${variantStyles} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      data-cursor={cursorLabel}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      style={transformStyle}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
};

interface TiltSurfaceProps {
  children: React.ReactNode;
  className?: string;
  maxTiltDeg?: number;
  cursorLabel?: string;
}

export const TiltSurface: React.FC<TiltSurfaceProps> = ({
  children,
  className = '',
  maxTiltDeg = 5,
  cursorLabel,
}) => {
  const reducedMotion = usePrefersReducedMotion();
  const surfaceRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = surfaceRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    el.style.setProperty('--spot-x', `${(px * 100).toFixed(1)}%`);
    el.style.setProperty('--spot-y', `${(py * 100).toFixed(1)}%`);
    el.style.setProperty('--spot-opacity', '1');

    if (!reducedMotion) {
      const rotY = (px - 0.5) * maxTiltDeg * 2;
      const rotX = (0.5 - py) * maxTiltDeg * 2;
      el.style.transform = `perspective(1100px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(0)`;
    }
  };

  const handlePointerLeave = () => {
    const el = surfaceRef.current;
    if (!el) return;
    el.style.setProperty('--spot-opacity', '0');
    el.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  };

  return (
    <div
      ref={surfaceRef}
      data-cursor={cursorLabel}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`radial-spotlight transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle = 'Architectural Acoustic Installation',
}) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#161A21] via-[#111419] to-[#0B0D10] border border-slate-200/10 p-8 text-center ${className}`}
      >
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          aria-hidden="true"
          className="mb-3 text-[#C89D66]/80"
        >
          <rect x="6" y="6" width="20" height="20" stroke="currentColor" strokeWidth="1.2" />
          <path d="M6 26L26 6" stroke="currentColor" strokeWidth="1.2" />
          <rect x="30" y="6" width="20" height="20" stroke="currentColor" strokeWidth="1.2" />
          <path d="M30 6L50 26" stroke="currentColor" strokeWidth="1.2" />
          <rect x="6" y="30" width="20" height="20" stroke="currentColor" strokeWidth="1.2" />
          <path d="M6 30L26 50" stroke="currentColor" strokeWidth="1.2" />
          <rect x="30" y="30" width="20" height="20" stroke="currentColor" strokeWidth="1.2" />
          <path d="M30 50L50 30" stroke="currentColor" strokeWidth="1.2" />
        </svg>
        <span className="font-display text-lg text-[#F1F5F9]">{fallbackTitle}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

export const CustomReticleCursor: React.FC = () => {
  const reducedMotion = usePrefersReducedMotion();
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined' || !window.matchMedia) {
      setEnabled(false);
      return;
    }
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    setEnabled(finePointer);
  }, [reducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let hasMoved = false;
    let rafId = 0;

    const onPointerMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!hasMoved) {
        currentX = targetX;
        currentY = targetY;
        hasMoved = true;
        if (ringRef.current) {
          ringRef.current.style.opacity = '1';
        }
      }

      const targetEl = e.target as HTMLElement | null;
      const cursorHost = targetEl?.closest('[data-cursor]') as HTMLElement | null;
      const interactiveHost = targetEl?.closest('button, a, input, select, textarea');

      if (ringRef.current && labelRef.current) {
        const text = cursorHost?.getAttribute('data-cursor') ?? '';
        labelRef.current.textContent = text;
        if (text) {
          ringRef.current.dataset.mode = 'labeled';
        } else if (interactiveHost) {
          ringRef.current.dataset.mode = 'interactive';
        } else {
          ringRef.current.dataset.mode = 'default';
        }
      }
    };

    const onPointerLeaveWindow = () => {
      if (ringRef.current) {
        ringRef.current.style.opacity = '0';
      }
      hasMoved = false;
    };

    const tick = () => {
      if (hasMoved && ringRef.current) {
        currentX += (targetX - currentX) * 0.26;
        currentY += (targetY - currentY) * 0.26;
        ringRef.current.style.transform = `translate3d(${currentX.toFixed(1)}px, ${currentY.toFixed(1)}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeaveWindow);
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeaveWindow);
      cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      data-mode="default"
      style={{ opacity: 0 }}
      className="fixed top-0 left-0 z-50 pointer-events-none hidden lg:flex items-center justify-center rounded-full border border-[#C89D66]/45 transition-[width,height,background-color,border-color,opacity] duration-150 ease-out w-5 h-5 data-[mode=interactive]:w-8 data-[mode=interactive]:h-8 data-[mode=interactive]:border-[#C89D66]/35 data-[mode=labeled]:w-22 data-[mode=labeled]:h-7 data-[mode=labeled]:rounded-md data-[mode=labeled]:bg-[#111419]/95 data-[mode=labeled]:border-[#C89D66]/80"
    >
      <span
        ref={labelRef}
        className="font-mono-tabular text-[10px] tracking-wider text-[#F1F5F9] whitespace-nowrap px-1.5"
      />
    </div>
  );
};
