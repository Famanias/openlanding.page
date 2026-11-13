'use client';

import { useEffect, useRef, type ChangeEvent } from 'react';
import { normalizeHex } from './color';

export interface NativeColorInputProps {
  id?: string;
  testId?: string;
  value: string;
  disabled?: boolean;
  ariaLabel: string;
  className?: string;
  onHexChange: (hex: string) => void;
}

/**
 * Uncontrolled wrapper around `<input type="color">` to prevent React 19 / Chromium
 * feedback loops caused by uppercase `#RRGGBB` props vs. lowercase `#rrggbb` DOM values
 * and synchronous native picker drag events.
 */
export function NativeColorInput({
  id,
  testId,
  value,
  disabled = false,
  ariaLabel,
  className,
  onHexChange,
}: NativeColorInputProps) {
  const normalizedUpper = normalizeHex(value) ?? '#000000';
  const normalizedLower = normalizedUpper.toLowerCase();

  const inputRef = useRef<HTMLInputElement>(null);
  const lastEmittedRef = useRef<string>(normalizedUpper);
  const pendingHexRef = useRef<string | null>(null);
  const rafRef = useRef<number | null>(null);
  const onHexChangeRef = useRef(onHexChange);
  const propLowerRef = useRef(normalizedLower);
  const propUpperRef = useRef(normalizedUpper);

  onHexChangeRef.current = onHexChange;
  propLowerRef.current = normalizedLower;
  propUpperRef.current = normalizedUpper;

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    // Never write `.value` while the native picker owns focus; Chromium can re-fire `input`.
    if (document.activeElement === el) return;
    if (el.value.toLowerCase() !== normalizedLower) {
      el.value = normalizedLower;
    }
    if (pendingHexRef.current === null) {
      lastEmittedRef.current = normalizedUpper;
    }
  }, [normalizedLower, normalizedUpper]);

  useEffect(() => {
    if (disabled && rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      pendingHexRef.current = null;
    }
  }, [disabled]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const next = normalizeHex(e.target.value);
    if (!next || next === lastEmittedRef.current) return;
    lastEmittedRef.current = next;
    pendingHexRef.current = next;

    if (typeof requestAnimationFrame === 'function') {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
          const pending = pendingHexRef.current;
          pendingHexRef.current = null;
          if (pending) {
            onHexChangeRef.current(pending);
          }
        });
      }
    } else {
      pendingHexRef.current = null;
      onHexChangeRef.current(next);
    }
  };

  const handleBlur = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      const pending = pendingHexRef.current;
      pendingHexRef.current = null;
      if (pending && !disabled) {
        onHexChangeRef.current(pending);
        return;
      }
    }

    const el = inputRef.current;
    if (el && el.value.toLowerCase() !== propLowerRef.current) {
      el.value = propLowerRef.current;
      lastEmittedRef.current = propUpperRef.current;
    }
  };

  return (
    <input
      ref={inputRef}
      id={id}
      data-testid={testId}
      type="color"
      defaultValue={normalizedLower}
      disabled={disabled}
      onChange={handleChange}
      onBlur={handleBlur}
      aria-label={ariaLabel}
      className={className}
    />
  );
}
