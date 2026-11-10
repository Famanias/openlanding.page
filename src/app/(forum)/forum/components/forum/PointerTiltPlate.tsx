'use client';
import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { isCoarseOrTouchDevice, motionTokens } from '../../lib/forum/motion';

interface PointerTiltPlateProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export const PointerTiltPlate: React.FC<PointerTiltPlateProps> = ({
  children,
  className = '',
  disabled = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  // Normalized pointer coordinates [-0.5, 0.5]
  const normX = useMotionValue(0);
  const normY = useMotionValue(0);

  // Pixel offset for the radial glow center
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const glowOpacity = useMotionValue(0);

  const springNormX = useSpring(normX, motionTokens.hoverSpring);
  const springNormY = useSpring(normY, motionTokens.hoverSpring);
  const springGlowX = useSpring(glowX, { stiffness: 220, damping: 26, mass: 0.5 });
  const springGlowY = useSpring(glowY, { stiffness: 220, damping: 26, mass: 0.5 });
  const springGlowOpacity = useSpring(glowOpacity, { stiffness: 180, damping: 24 });

  const rotateX = useTransform(
    springNormY,
    [-0.5, 0.5],
    [motionTokens.tiltMaxDeg, -motionTokens.tiltMaxDeg]
  );
  const rotateY = useTransform(
    springNormX,
    [-0.5, 0.5],
    [-motionTokens.tiltMaxDeg, motionTokens.tiltMaxDeg]
  );

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || reducedMotion || isCoarseOrTouchDevice()) return;
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;

    const nx = Math.max(-0.5, Math.min(0.5, relX / rect.width - 0.5));
    const ny = Math.max(-0.5, Math.min(0.5, relY / rect.height - 0.5));

    normX.set(nx);
    normY.set(ny);
    glowX.set(relX - 180);
    glowY.set(relY - 180);
    glowOpacity.set(1);
  };

  const handlePointerLeave = () => {
    normX.set(0);
    normY.set(0);
    glowOpacity.set(0);
  };

  return (
    <div style={{ perspective: '900px' }} className={className}>
      <motion.div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={
          reducedMotion || disabled
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }
        }
        className="relative h-full w-full overflow-hidden border border-[#B9B28A]/35 bg-[#0E100C] transition-colors duration-200 hover:border-[#B9B28A]/75"
      >
        {/* GPU-friendly pointer-following radial khaki glow */}
        {!reducedMotion && !disabled && (
          <motion.div
            aria-hidden="true"
            style={{
              x: springGlowX,
              y: springGlowY,
              opacity: springGlowOpacity,
              background:
                'radial-gradient(circle, rgba(185, 178, 138, 0.22) 0%, rgba(185, 178, 138, 0.06) 45%, transparent 72%)',
            }}
            className="pointer-events-none absolute top-0 left-0 z-20 h-[360px] w-[360px] rounded-full mix-blend-screen"
          />
        )}

        {children}
      </motion.div>
    </div>
  );
};
