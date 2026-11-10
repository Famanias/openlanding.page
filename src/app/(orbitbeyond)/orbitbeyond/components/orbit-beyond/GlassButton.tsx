'use client';

import React, { forwardRef, useRef, useState } from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { usePrefersReducedMotion } from '../../lib/orbit-beyond/motion';

export interface GlassButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'glass' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  function GlassButton(
    {
      variant = 'glass',
      size = 'md',
      className = '',
      children,
      onMouseMove,
      onMouseLeave,
      ...props
    },
    externalRef
  ) {
    const prefersReducedMotion = usePrefersReducedMotion();
    const internalRef = useRef<HTMLButtonElement | null>(null);
    const [glintCoords, setGlintCoords] = useState<{ x: number; y: number } | null>(null);

    const setRefs = (node: HTMLButtonElement | null) => {
      internalRef.current = node;
      if (typeof externalRef === 'function') {
        externalRef(node);
      } else if (externalRef && 'current' in externalRef) {
        externalRef.current = node;
      }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!prefersReducedMotion && internalRef.current) {
        const rect = internalRef.current.getBoundingClientRect();
        setGlintCoords({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
      onMouseMove?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setGlintCoords(null);
      onMouseLeave?.(e);
    };

    const sizeClasses =
      size === 'sm'
        ? 'px-4 py-2 text-xs tracking-[0.14em]'
        : size === 'lg'
        ? 'px-7 py-4 text-xs sm:text-sm tracking-[0.16em]'
        : 'px-5 py-3 text-xs tracking-[0.15em]';

    const variantClasses =
      variant === 'primary'
        ? 'bg-[#178CFA] text-[#EDF6FD] border border-[#8DE9FF]/45 shadow-[0_0_28px_rgba(23,140,250,0.42),inset_0_1px_1px_rgba(255,255,255,0.35)] hover:bg-[#2298FF] hover:shadow-[0_0_38px_rgba(141,233,255,0.52),inset_0_1px_1px_rgba(255,255,255,0.5)]'
        : variant === 'subtle'
        ? 'bg-[#091525]/70 text-[#AAB7C4] hover:text-[#EDF6FD] border border-white/12 hover:border-white/25'
        : 'liquid-glass text-[#EDF6FD] hover:border-white/25';

    return (
      <motion.button
        ref={setRefs}
        whileHover={prefersReducedMotion ? undefined : { scale: 1.025 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group relative inline-flex items-center justify-center gap-2.5 rounded-full font-semibold uppercase whitespace-nowrap shrink-0 cursor-pointer select-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DE9FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030812] disabled:opacity-50 disabled:pointer-events-none overflow-hidden ${sizeClasses} ${variantClasses} ${className}`}
        {...props}
      >
        {!prefersReducedMotion && glintCoords && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-opacity duration-200"
            style={{
              background: `radial-gradient(120px circle at ${glintCoords.x}px ${glintCoords.y}px, rgba(141, 233, 255, 0.22), transparent 70%)`,
            }}
          />
        )}
        <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
      </motion.button>
    );
  }
);
