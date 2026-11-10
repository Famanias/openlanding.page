'use client';
import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { isCoarseOrTouchDevice, motionTokens } from '../../lib/forum/motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'ivory-dark' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  ariaLabel?: string;
  ariaPressed?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: React.ReactNode;
  dataTestId?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  ariaLabel,
  ariaPressed,
  type = 'button',
  disabled = false,
  icon,
  dataTestId,
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const reducedMotion = useReducedMotion();
  const [pulseKey, setPulseKey] = useState<number>(0);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, motionTokens.hoverSpring);
  const springY = useSpring(rawY, motionTokens.hoverSpring);

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled || reducedMotion || isCoarseOrTouchDevice()) return;
    const el = buttonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.22;
    const deltaY = (e.clientY - centerY) * 0.28;

    const clampedX = Math.max(
      -motionTokens.magneticMaxPx,
      Math.min(motionTokens.magneticMaxPx, deltaX)
    );
    const clampedY = Math.max(
      -motionTokens.magneticMaxPx,
      Math.min(motionTokens.magneticMaxPx, deltaY)
    );

    rawX.set(clampedX);
    rawY.set(clampedY);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (!reducedMotion) {
      setPulseKey((prev) => prev + 1);
    }
    onClick?.(e);
  };

  const sizeStyles =
    size === 'sm'
      ? 'px-3.5 py-2 text-xs min-h-[38px]'
      : size === 'lg'
      ? 'px-6 py-3.5 text-sm sm:text-[15px] min-h-[48px]'
      : 'px-5 py-3 text-xs sm:text-sm min-h-[44px]';

  const variantStyles =
    variant === 'primary'
      ? 'bg-[#B9B28A] text-[#0E100C] border border-[#B9B28A] hover:bg-[#D7D1B8] hover:border-[#F6F3EA]'
      : variant === 'secondary'
      ? 'bg-[#0E100C]/85 text-[#D7D1B8] border border-[#B9B28A]/55 hover:border-[#F6F3EA] hover:text-[#F6F3EA] hover:bg-[#171814]'
      : variant === 'ivory-dark'
      ? 'bg-[#171814] text-[#F6F3EA] border border-[#171814] hover:bg-[#0E100C] hover:border-[#8C876B]'
      : 'bg-transparent text-[#B9B28A] border border-[#B9B28A]/35 hover:border-[#B9B28A] hover:text-[#F6F3EA]';

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      data-testid={dataTestId}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onBlur={handlePointerLeave}
      onClick={handleClick}
      style={reducedMotion ? undefined : { x: springX, y: springY }}
      whileTap={reducedMotion || disabled ? undefined : { scale: motionTokens.press.scale }}
      transition={{ duration: motionTokens.press.duration }}
      className={`group relative inline-flex items-center justify-center gap-2.5 font-doto-ui uppercase whitespace-nowrap shrink-0 select-none cursor-pointer transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F6F3EA] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E100C] disabled:opacity-45 disabled:cursor-not-allowed ${sizeStyles} ${variantStyles} ${className}`}
    >
      {/* Subtle architectural corner glint on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 border border-transparent group-hover:border-[#F6F3EA]/35 transition-colors duration-200"
      />

      {/* Tactile outward concentric pulse on click */}
      {pulseKey > 0 && !reducedMotion && (
        <motion.span
          key={pulseKey}
          aria-hidden="true"
          initial={{ opacity: 0.55, scale: 0.96 }}
          animate={{ opacity: 0, scale: 1.14 }}
          transition={{ duration: 0.38, ease: 'easeOut' }}
          className="pointer-events-none absolute inset-0 border border-[#B9B28A]"
        />
      )}

      <span className="relative z-10 inline-flex items-center gap-2">
        <span>{children}</span>
        {icon && (
          <span
            aria-hidden="true"
            className="inline-flex items-center transition-transform duration-200 group-hover:translate-x-1"
          >
            {icon}
          </span>
        )}
      </span>
    </motion.button>
  );
};
