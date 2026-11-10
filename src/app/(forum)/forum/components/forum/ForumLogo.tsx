'use client';
import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ForumLogoProps {
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  showDescriptor?: boolean;
}

const PIXEL_CELLS = [
  { row: 0, col: 0, active: true, delay: 0.02, initX: -6, initY: -6 },
  { row: 0, col: 1, active: false, delay: 0, initX: 0, initY: 0 },
  { row: 0, col: 2, active: true, delay: 0.08, initX: 6, initY: -4 },
  { row: 1, col: 0, active: false, delay: 0, initX: 0, initY: 0 },
  { row: 1, col: 1, active: true, delay: 0.14, initX: 0, initY: 5 },
  { row: 1, col: 2, active: false, delay: 0, initX: 0, initY: 0 },
  { row: 2, col: 0, active: true, delay: 0.19, initX: -5, initY: 6 },
  { row: 2, col: 1, active: false, delay: 0, initX: 0, initY: 0 },
  { row: 2, col: 2, active: false, delay: 0, initX: 0, initY: 0 },
];

export const ForumLogo: React.FC<ForumLogoProps> = ({
  onClick,
  size = 'md',
  showDescriptor = true,
}) => {
  const reducedMotion = useReducedMotion();

  const iconSize = size === 'lg' ? 33 : size === 'sm' ? 21 : 27;
  const wordmarkClass =
    size === 'lg'
      ? 'text-3xl sm:text-4xl tracking-tight'
      : size === 'sm'
      ? 'text-xl tracking-tight'
      : 'text-2xl sm:text-[28px] tracking-tight';

  return (
    <a
      href="#top"
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className="group inline-flex items-center gap-3.5 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B9B28A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0E100C]"
      aria-label="FORUM — Revenue Intelligence System, return to top"
    >
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 overflow-visible"
        aria-hidden="true"
      >
        {PIXEL_CELLS.map((cell, idx) => {
          if (!cell.active) return null;
          const x = cell.col * 10;
          const y = cell.row * 10;
          return (
            <motion.rect
              key={idx}
              x={x}
              y={y}
              width={9}
              height={9}
              fill={cell.row === 0 && cell.col === 2 ? '#D7D1B8' : '#B9B28A'}
              initial={
                reducedMotion
                  ? false
                  : { opacity: 0, x: cell.initX, y: cell.initY, scale: 0.65 }
              }
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{
                duration: 0.24,
                delay: cell.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="transition-colors duration-200 group-hover:fill-[#F6F3EA]"
            />
          );
        })}
      </svg>

      <div className="flex items-center gap-3">
        <span
          className={`font-doto-hero text-[#F6F3EA] leading-none uppercase select-none whitespace-nowrap ${wordmarkClass}`}
        >
          FORUM
        </span>
        {showDescriptor && (
          <span className="font-mono-tech text-[9px] sm:text-[10px] leading-[1.15] tracking-[0.12em] text-[#B9B28A] uppercase select-none border-l border-[#B9B28A]/35 pl-2.5 py-0.5">
            REVENUE
            <br />
            INTELLIGENCE
            <br />
            SYSTEM
          </span>
        )}
      </div>
    </a>
  );
};
