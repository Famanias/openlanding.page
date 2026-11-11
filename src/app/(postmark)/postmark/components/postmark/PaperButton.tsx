'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { prefersReducedMotionNow } from '../../lib/postmark/motion';

export interface PaperButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'parchment' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  magnetic?: boolean;
  children: React.ReactNode;
}

export const PaperButton = React.forwardRef<HTMLButtonElement, PaperButtonProps>(
  function PaperButton(
    {
      variant = 'primary',
      size = 'md',
      magnetic = true,
      className = '',
      onClick,
      onPointerMove,
      onPointerLeave,
      children,
      type = 'button',
      ...rest
    },
    forwardedRef
  ) {
    const innerRef = useRef<HTMLButtonElement | null>(null);
    const [rippleKey, setRippleKey] = useState<number | null>(null);

    const setRefs = (node: HTMLButtonElement | null) => {
      innerRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
      onPointerMove?.(e);
      if (!magnetic || e.pointerType === 'touch' || prefersReducedMotionNow()) return;
      const el = innerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      gsap.to(el, {
        x: Math.max(-6, Math.min(6, relX * 5.5)),
        y: Math.max(-5, Math.min(5, relY * 4.5)),
        duration: 0.22,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handlePointerLeave = (e: React.PointerEvent<HTMLButtonElement>) => {
      onPointerLeave?.(e);
      const el = innerRef.current;
      if (!el || prefersReducedMotionNow()) return;
      gsap.to(el, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.32,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!prefersReducedMotionNow() && innerRef.current) {
        setRippleKey((prev) => (prev === null ? 1 : prev + 1));
        gsap.fromTo(
          innerRef.current,
          { scale: 0.965 },
          { scale: 1, duration: 0.34, ease: 'back.out(1.6)', overwrite: 'auto' }
        );
      }
      onClick?.(e);
    };

    const variantStyles: Record<NonNullable<PaperButtonProps['variant']>, string> = {
      primary:
        'bg-[var(--pm-red)] text-[#FFF9EF] border border-[var(--pm-red-deep)] hover:bg-[#C74B37] shadow-[0_6px_18px_rgba(216,87,67,0.24)]',
      outline:
        'bg-transparent text-[var(--pm-ink)] border border-[var(--pm-ink)]/75 hover:bg-[var(--pm-parchment)]/65',
      parchment:
        'bg-[var(--pm-ivory)] text-[var(--pm-brown)] border border-[var(--pm-brown)]/30 hover:bg-[var(--pm-parchment)] shadow-[0_4px_12px_rgba(75,52,35,0.08)]',
      ghost:
        'bg-transparent text-[var(--pm-brown)] border border-transparent hover:bg-[var(--pm-parchment)]/55',
    };

    const sizeStyles: Record<NonNullable<PaperButtonProps['size']>, string> = {
      sm: 'min-h-[40px] px-4 py-2 text-xs tracking-[0.06em]',
      md: 'min-h-[46px] px-6 py-2.5 text-sm tracking-[0.02em]',
      lg: 'min-h-[52px] px-7 py-3.5 text-[15px] tracking-[0.01em]',
    };

    return (
      <button
        ref={setRefs}
        type={type}
        onClick={handleClick}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={`group relative inline-flex items-center justify-center gap-2 rounded-full font-ui font-medium whitespace-nowrap shrink-0 cursor-pointer select-none overflow-hidden transition-colors duration-150 disabled:opacity-50 disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...rest}
      >
        {rippleKey !== null && (
          <span
            key={rippleKey}
            aria-hidden="true"
            className="pm-stamp-ripple-ring pointer-events-none absolute left-1/2 top-1/2 h-10 w-10 rounded-full border border-current"
          />
        )}
        <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">
          {children}
        </span>
      </button>
    );
  }
);
