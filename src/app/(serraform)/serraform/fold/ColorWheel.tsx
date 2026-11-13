'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { hexToHsv, hsvToHex, normalizeHex } from './color';
import { COLOR_PRESETS, PRINT_SPECS } from './config';
import { useFold } from './FoldProvider';

type ColorTarget = 'base' | 'design';

const WHEEL_SIZE = 204;
const WHEEL_CENTER = WHEEL_SIZE / 2;
const OUTER_RADIUS = 96;
const INNER_RADIUS = 72;
const SV_HALF = Math.floor((INNER_RADIUS - 7) / Math.SQRT2);
const SV_LEFT = Math.round(WHEEL_CENTER - SV_HALF);
const SV_SIZE = SV_HALF * 2;

export const ColorWheel: React.FC<{ idPrefix?: string }> = ({ idPrefix = 'srf' }) => {
  const { design, setBaseHex, setDesignHex } = useFold();
  const printSpec = PRINT_SPECS[design.print];
  const designDisabled = !printSpec.usesDesignColor;

  const [target, setTarget] = useState<ColorTarget>('base');
  const activeHex = target === 'base' ? design.baseHex : design.designHex;
  const activeDisabled = target === 'design' && designDisabled;

  // Preserve hue independently across zero-saturation edits (black/white/gray)
  const hueMemoryRef = useRef<{ base: number; design: number }>({
    base: hexToHsv(design.baseHex, 34).h,
    design: hexToHsv(design.designHex, 346).h,
  });

  const activeHsv = hexToHsv(activeHex, hueMemoryRef.current[target]);

  const [draftHex, setDraftHex] = useState<string>(activeHex);
  const [hexError, setHexError] = useState<string | null>(null);
  const isEditingHexRef = useRef(false);

  // Sync draft field when switching target or dragging wheel/sliders/chips
  useEffect(() => {
    if (!isEditingHexRef.current) {
      setDraftHex(activeHex);
      setHexError(null);
    }
    const parsed = hexToHsv(activeHex, hueMemoryRef.current[target]);
    if (parsed.s > 0) {
      hueMemoryRef.current[target] = parsed.h;
    }
  }, [activeHex, target]);

  const commitHexForTarget = useCallback(
    (nextHex: string, explicitTarget: ColorTarget = target) => {
      if (explicitTarget === 'base') {
        setBaseHex(nextHex);
      } else if (!designDisabled) {
        setDesignHex(nextHex);
      }
    },
    [target, designDisabled, setBaseHex, setDesignHex],
  );

  const commitHsv = useCallback(
    (h: number, s: number, v: number) => {
      const normH = ((Math.round(h) % 360) + 360) % 360;
      const clampS = Math.max(0, Math.min(100, Math.round(s)));
      const clampV = Math.max(0, Math.min(100, Math.round(v)));
      hueMemoryRef.current[target] = normH;
      const nextHex = hsvToHex(normH, clampS, clampV);
      commitHexForTarget(nextHex);
    },
    [target, commitHexForTarget],
  );

  // Draw the HSV wheel canvas (hue ring + current hue SV square + crisp crosshairs)
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ringTileRef = useRef<HTMLCanvasElement | null>(null);

  const renderWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pxSize = WHEEL_SIZE * dpr;
    if (canvas.width !== pxSize || canvas.height !== pxSize) {
      canvas.width = pxSize;
      canvas.height = pxSize;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Cache static hue ring once at 1x resolution and draw smoothly
    if (!ringTileRef.current) {
      const tile = document.createElement('canvas');
      tile.width = pxSize;
      tile.height = pxSize;
      const tCtx = tile.getContext('2d');
      if (tCtx) {
        tCtx.scale(dpr, dpr);
        for (let deg = 0; deg < 360; deg += 1) {
          const a0 = ((deg - 0.6 - 90) * Math.PI) / 180;
          const a1 = ((deg + 0.9 - 90) * Math.PI) / 180;
          tCtx.beginPath();
          tCtx.arc(WHEEL_CENTER, WHEEL_CENTER, OUTER_RADIUS, a0, a1);
          tCtx.arc(WHEEL_CENTER, WHEEL_CENTER, INNER_RADIUS, a1, a0, true);
          tCtx.closePath();
          tCtx.fillStyle = hsvToHex(deg, 100, 100);
          tCtx.fill();
        }
        // Subtle hairline framing for crisp separation on warm rose background
        tCtx.strokeStyle = 'rgba(75, 32, 42, 0.22)';
        tCtx.lineWidth = 1;
        tCtx.beginPath();
        tCtx.arc(WHEEL_CENTER, WHEEL_CENTER, OUTER_RADIUS, 0, Math.PI * 2);
        tCtx.stroke();
        tCtx.beginPath();
        tCtx.arc(WHEEL_CENTER, WHEEL_CENTER, INNER_RADIUS, 0, Math.PI * 2);
        tCtx.stroke();
      }
      ringTileRef.current = tile;
    }

    ctx.save();
    ctx.clearRect(0, 0, pxSize, pxSize);
    ctx.drawImage(ringTileRef.current, 0, 0);
    ctx.scale(dpr, dpr);

    // Inner S/V square: pure white -> hue horizontal gradient overlaid with transparent -> black vertical gradient
    const huePure = hsvToHex(activeHsv.h, 100, 100);
    const gradX = ctx.createLinearGradient(SV_LEFT, 0, SV_LEFT + SV_SIZE, 0);
    gradX.addColorStop(0, '#FFFFFF');
    gradX.addColorStop(1, huePure);
    ctx.fillStyle = gradX;
    ctx.fillRect(SV_LEFT, SV_LEFT, SV_SIZE, SV_SIZE);

    const gradY = ctx.createLinearGradient(0, SV_LEFT, 0, SV_LEFT + SV_SIZE);
    gradY.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradY.addColorStop(1, 'rgba(0, 0, 0, 1)');
    ctx.fillStyle = gradY;
    ctx.fillRect(SV_LEFT, SV_LEFT, SV_SIZE, SV_SIZE);

    ctx.strokeStyle = 'rgba(75, 32, 42, 0.28)';
    ctx.lineWidth = 1;
    ctx.strokeRect(SV_LEFT + 0.5, SV_LEFT + 0.5, SV_SIZE - 1, SV_SIZE - 1);

    // Hue ring marker (0° red at top, increasing clockwise)
    const hueRad = ((activeHsv.h - 90) * Math.PI) / 180;
    const midR = (OUTER_RADIUS + INNER_RADIUS) * 0.5;
    const hx = WHEEL_CENTER + Math.cos(hueRad) * midR;
    const hy = WHEEL_CENTER + Math.sin(hueRad) * midR;

    ctx.beginPath();
    ctx.arc(hx, hy, 7, 0, Math.PI * 2);
    ctx.fillStyle = huePure;
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#FFFCF8';
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#4B202A';
    ctx.stroke();

    // Inner SV reticle
    const sx = SV_LEFT + (activeHsv.s / 100) * SV_SIZE;
    const sy = SV_LEFT + (1 - activeHsv.v / 100) * SV_SIZE;
    ctx.beginPath();
    ctx.arc(sx, sy, 6.5, 0, Math.PI * 2);
    ctx.fillStyle = activeHex;
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#FFFCF8';
    ctx.stroke();
    ctx.lineWidth = 1.25;
    ctx.strokeStyle = '#2B2426';
    ctx.stroke();

    ctx.restore();
  }, [activeHex, activeHsv.h, activeHsv.s, activeHsv.v]);

  useEffect(() => {
    renderWheel();
  }, [renderWheel]);

  // Wheel pointer interaction with capture & rAF throttling
  const dragRef = useRef<{
    pointerId: number | null;
    zone: 'hue' | 'sv' | null;
    rafId: number;
    pendingHsv: { h: number; s: number; v: number } | null;
  }>({
    pointerId: null,
    zone: null,
    rafId: 0,
    pendingHsv: null,
  });

  const pointToHsv = (clientX: number, clientY: number, zone: 'hue' | 'sv') => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * WHEEL_SIZE;
    const y = ((clientY - rect.top) / rect.height) * WHEEL_SIZE;

    if (zone === 'hue') {
      const dx = x - WHEEL_CENTER;
      const dy = y - WHEEL_CENTER;
      // 0° top (negative Y), increasing clockwise
      let deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      deg = ((deg % 360) + 360) % 360;
      return {
        h: Math.round(deg) % 360,
        s: activeHsv.s,
        v: activeHsv.v,
      };
    }

    const s = Math.max(0, Math.min(100, ((x - SV_LEFT) / SV_SIZE) * 100));
    const v = Math.max(0, Math.min(100, (1 - (y - SV_LEFT) / SV_SIZE) * 100));
    return {
      h: hueMemoryRef.current[target],
      s: Math.round(s),
      v: Math.round(v),
    };
  };

  const endWheelDrag = useCallback(
    (commit: boolean) => {
      const d = dragRef.current;
      if (d.rafId) {
        cancelAnimationFrame(d.rafId);
        d.rafId = 0;
      }
      if (commit && d.pendingHsv) {
        commitHsv(d.pendingHsv.h, d.pendingHsv.s, d.pendingHsv.v);
      }
      if (d.pointerId !== null && canvasRef.current) {
        try {
          if (canvasRef.current.hasPointerCapture(d.pointerId)) {
            canvasRef.current.releasePointerCapture(d.pointerId);
          }
        } catch {
          // ignore
        }
      }
      d.pointerId = null;
      d.zone = null;
      d.pendingHsv = null;
    },
    [commitHsv],
  );

  useEffect(() => {
    return () => endWheelDrag(false);
  }, [endWheelDrag]);

  const handleWheelPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (activeDisabled) return;
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * WHEEL_SIZE;
    const y = ((e.clientY - rect.top) / rect.height) * WHEEL_SIZE;
    const dist = Math.hypot(x - WHEEL_CENTER, y - WHEEL_CENTER);

    let zone: 'hue' | 'sv' | null = null;
    if (dist >= INNER_RADIUS - 4 && dist <= OUTER_RADIUS + 8) {
      zone = 'hue';
    } else if (
      x >= SV_LEFT - 4 &&
      x <= SV_LEFT + SV_SIZE + 4 &&
      y >= SV_LEFT - 4 &&
      y <= SV_LEFT + SV_SIZE + 4
    ) {
      zone = 'sv';
    }
    if (!zone) return;

    const d = dragRef.current;
    d.pointerId = e.pointerId;
    d.zone = zone;
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const next = pointToHsv(e.clientX, e.clientY, zone);
    if (next) {
      d.pendingHsv = next;
      commitHsv(next.h, next.s, next.v);
    }
  };

  const handleWheelPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const d = dragRef.current;
    if (d.pointerId !== e.pointerId || !d.zone) return;
    const next = pointToHsv(e.clientX, e.clientY, d.zone);
    if (!next) return;
    d.pendingHsv = next;

    if (d.rafId === 0) {
      d.rafId = requestAnimationFrame(() => {
        d.rafId = 0;
        if (d.pendingHsv) {
          commitHsv(d.pendingHsv.h, d.pendingHsv.s, d.pendingHsv.v);
        }
      });
    }
  };

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDraftHex(val);
    const normalized = normalizeHex(val);
    if (normalized) {
      setHexError(null);
      commitHexForTarget(normalized);
    }
  };

  const handleHexCommit = () => {
    isEditingHexRef.current = false;
    const normalized = normalizeHex(draftHex);
    if (normalized) {
      setDraftHex(normalized);
      setHexError(null);
      commitHexForTarget(normalized);
    } else {
      setHexError('Enter a hex color such as #9A463D.');
    }
  };

  return (
    <div className="space-y-4">
      {/* Base vs Design target selector */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          aria-pressed={target === 'base'}
          onClick={() => setTarget('base')}
          className={`flex items-center gap-2.5 p-2.5 rounded-[8px] border text-left transition-colors min-h-[52px] ${
            target === 'base'
              ? 'border-[var(--srf-oxblood)] bg-[var(--srf-surface-soft)] ring-2 ring-[var(--srf-oxblood)]/25'
              : 'border-[var(--srf-hairline)] hover:border-[var(--srf-hairline-strong)]'
          }`}
        >
          <span
            className="w-7 h-7 rounded-full border border-[var(--srf-oxblood)]/25 shrink-0"
            style={{ backgroundColor: design.baseHex }}
            aria-hidden="true"
          />
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-medium text-[var(--srf-oxblood)]">
              Base color
            </span>
            <span className="block srf-mono-caption text-[var(--srf-mauve)] truncate">
              {design.baseHex}
            </span>
          </span>
          {target === 'base' && (
            <Check className="w-4 h-4 text-[var(--srf-oxblood)] shrink-0" aria-hidden="true" />
          )}
        </button>

        <button
          type="button"
          disabled={designDisabled}
          aria-pressed={!designDisabled && target === 'design'}
          onClick={() => {
            if (!designDisabled) setTarget('design');
          }}
          className={`flex items-center gap-2.5 p-2.5 rounded-[8px] border text-left transition-colors min-h-[52px] ${
            designDisabled
              ? 'border-[var(--srf-hairline)] opacity-55 cursor-not-allowed bg-[var(--srf-rose)]'
              : target === 'design'
                ? 'border-[var(--srf-oxblood)] bg-[var(--srf-surface-soft)] ring-2 ring-[var(--srf-oxblood)]/25'
                : 'border-[var(--srf-hairline)] hover:border-[var(--srf-hairline-strong)]'
          }`}
        >
          <span
            className="w-7 h-7 rounded-full border border-[var(--srf-oxblood)]/25 shrink-0"
            style={{ backgroundColor: design.designHex }}
            aria-hidden="true"
          />
          <span className="min-w-0 flex-1">
            <span className="block text-xs font-medium text-[var(--srf-oxblood)]">
              Design color
            </span>
            <span className="block srf-mono-caption text-[var(--srf-mauve)] truncate">
              {design.designHex}
            </span>
          </span>
          {!designDisabled && target === 'design' && (
            <Check className="w-4 h-4 text-[var(--srf-oxblood)] shrink-0" aria-hidden="true" />
          )}
        </button>
      </div>

      {designDisabled && (
        <p className="srf-mono-caption text-[var(--srf-mauve)]">
          {design.print === 'solid'
            ? `Design color (${design.designHex}) is saved when you pick a pattern.`
            : `Design color (${design.designHex}) does not tint uploaded artwork, and stays saved for patterns.`}
        </p>
      )}

      {/* Wheel + Accessible HSV Sliders + Hex */}
      <div className="p-4 rounded-[8px] border border-[var(--srf-hairline)] bg-[var(--srf-surface-soft)] space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="shrink-0 flex flex-col items-center">
            <canvas
              ref={canvasRef}
              width={WHEEL_SIZE}
              height={WHEEL_SIZE}
              data-testid="srf-color-wheel-canvas"
              onPointerDown={handleWheelPointerDown}
              onPointerMove={handleWheelPointerMove}
              onPointerUp={(e) => {
                if (dragRef.current.pointerId === e.pointerId) endWheelDrag(true);
              }}
              onPointerCancel={(e) => {
                if (dragRef.current.pointerId === e.pointerId) endWheelDrag(false);
              }}
              onLostPointerCapture={() => endWheelDrag(false)}
              style={{
                width: 'min(204px, 100%)',
                height: 'auto',
                aspectRatio: '1 / 1',
                touchAction: 'none',
              }}
              className={activeDisabled ? 'opacity-50 pointer-events-none' : 'cursor-crosshair'}
              aria-hidden="true"
            />
          </div>

          <div className="w-full min-w-0 flex-1 space-y-3">
            {/* Hex text field */}
            <div>
              <label
                htmlFor={`${idPrefix}-hex-input`}
                className="block srf-mono-caption text-[var(--srf-oxblood)] mb-1"
              >
                Hex color ({target === 'base' ? 'Base' : 'Design'})
              </label>
              <input
                id={`${idPrefix}-hex-input`}
                type="text"
                value={draftHex}
                disabled={activeDisabled}
                onFocus={() => {
                  isEditingHexRef.current = true;
                }}
                onChange={handleHexInputChange}
                onBlur={handleHexCommit}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleHexCommit();
                  }
                }}
                aria-invalid={hexError ? 'true' : undefined}
                aria-describedby={hexError ? `${idPrefix}-hex-error` : undefined}
                placeholder="#9A463D"
                className="w-full min-h-[40px] px-3 py-1.5 rounded-[4px] border border-[var(--srf-hairline-strong)] bg-[var(--srf-porcelain)] text-sm font-[family-name:var(--font-mono)] uppercase text-[var(--srf-oxblood)]"
              />
              {hexError && (
                <p
                  id={`${idPrefix}-hex-error`}
                  className="mt-1 text-xs font-medium text-[var(--srf-clay)]"
                >
                  {hexError}
                </p>
              )}
            </div>

            {/* Labeled keyboard-accessible HSV sliders */}
            <div className="space-y-2">
              <div>
                <div className="flex justify-between srf-mono-caption text-[var(--srf-oxblood)]">
                  <label htmlFor={`${idPrefix}-hue-slider`}>Hue</label>
                  <span>{activeHsv.h}°</span>
                </div>
                <input
                  id={`${idPrefix}-hue-slider`}
                  type="range"
                  min={0}
                  max={359}
                  step={1}
                  disabled={activeDisabled}
                  value={activeHsv.h}
                  onChange={(e) =>
                    commitHsv(Number(e.target.value), activeHsv.s, activeHsv.v)
                  }
                  className="srf-range !h-8"
                />
              </div>

              <div>
                <div className="flex justify-between srf-mono-caption text-[var(--srf-oxblood)]">
                  <label htmlFor={`${idPrefix}-sat-slider`}>Saturation</label>
                  <span>{activeHsv.s}%</span>
                </div>
                <input
                  id={`${idPrefix}-sat-slider`}
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  disabled={activeDisabled}
                  value={activeHsv.s}
                  onChange={(e) =>
                    commitHsv(hueMemoryRef.current[target], Number(e.target.value), activeHsv.v)
                  }
                  className="srf-range !h-8"
                />
              </div>

              <div>
                <div className="flex justify-between srf-mono-caption text-[var(--srf-oxblood)]">
                  <label htmlFor={`${idPrefix}-val-slider`}>Brightness</label>
                  <span>{activeHsv.v}%</span>
                </div>
                <input
                  id={`${idPrefix}-val-slider`}
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  disabled={activeDisabled}
                  value={activeHsv.v}
                  onChange={(e) =>
                    commitHsv(hueMemoryRef.current[target], activeHsv.s, Number(e.target.value))
                  }
                  className="srf-range !h-8"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 10 Curated felt swatch shortcuts (always including Clay, Flax, Sage) */}
        <div>
          <div className="srf-mono-caption text-[var(--srf-mauve)] mb-2">
            Felt shortcuts for {target === 'base' ? 'base' : 'design'}
          </div>
          <div className="flex flex-wrap gap-2">
            {COLOR_PRESETS.map((preset) => {
              const matched = activeHex.toUpperCase() === preset.hex.toUpperCase();
              return (
                <button
                  key={preset.id}
                  type="button"
                  disabled={activeDisabled}
                  aria-label={`${preset.name} (${preset.hex})`}
                  aria-pressed={matched}
                  title={`${preset.name} · ${preset.hex}`}
                  onClick={() => {
                    setHexError(null);
                    setDraftHex(preset.hex);
                    commitHexForTarget(preset.hex);
                  }}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 min-h-[36px] rounded-[6px] border text-xs transition-colors ${
                    matched
                      ? 'border-[var(--srf-oxblood)] bg-[var(--srf-porcelain)] ring-1 ring-[var(--srf-oxblood)] text-[var(--srf-oxblood)] font-medium'
                      : 'border-[var(--srf-hairline)] bg-[var(--srf-porcelain)]/70 hover:border-[var(--srf-oxblood)] text-[var(--srf-oxblood)]'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-[var(--srf-oxblood)]/25 shrink-0"
                    style={{ backgroundColor: preset.hex }}
                    aria-hidden="true"
                  />
                  <span>{preset.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
