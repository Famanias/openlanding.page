'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ensureGsapRegistered, usePrefersReducedMotion } from '../../lib/postmark/motion';

interface MotionTextProps {
  id?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div';
  lines: string[];
  className?: string;
  lineClassName?: string;
  mode?: 'mask-up' | 'paper-slice' | 'manual';
  delay?: number;
}

/**
 * Split-line editorial typography reveal component.
 * Uses overflow-clipped masks and subtle tracking compression rather than generic opacity fades.
 * Falls back cleanly to static visible text when reduced-motion is preferred or before JS hydrates.
 */
export const MotionText: React.FC<MotionTextProps> = ({
  id,
  as: Tag = 'h2',
  lines,
  className = '',
  lineClassName = '',
  mode = 'mask-up',
  delay = 0,
}) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || mode === 'manual') return;
    ensureGsapRegistered();
    const el = rootRef.current;
    if (!el) return;

    const innerLines = el.querySelectorAll<HTMLElement>('[data-motion-line]');
    if (!innerLines.length) return;

    const ctx = gsap.context(() => {
      if (mode === 'mask-up') {
        gsap.fromTo(
          innerLines,
          {
            yPercent: 112,
            rotateZ: 1.1,
            letterSpacing: '0.015em',
          },
          {
            yPercent: 0,
            rotateZ: 0,
            letterSpacing: '-0.02em',
            duration: 0.86,
            stagger: 0.13,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 84%',
              toggleActions: 'play none none none',
            },
          }
        );
      } else if (mode === 'paper-slice') {
        gsap.fromTo(
          innerLines,
          {
            clipPath: 'inset(0% 100% 0% 0%)',
            x: -18,
          },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            x: 0,
            duration: 0.92,
            stagger: 0.16,
            delay,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, el);

    return () => ctx.revert();
  }, [delay, mode, reducedMotion]);

  return (
    <Tag
      id={id}
      ref={rootRef as React.RefObject<never>}
      className={`text-balance ${className}`}
    >
      {lines.map((line, index) => (
        <span
          key={`${index}-${line}`}
          className="block overflow-hidden py-[0.04em] -my-[0.04em]"
        >
          <span
            data-motion-line={index}
            className={`block will-change-transform ${lineClassName}`}
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
};
