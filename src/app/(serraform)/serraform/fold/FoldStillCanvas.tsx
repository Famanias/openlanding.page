'use client';

import React, { useEffect, useRef } from 'react';
import { getBitmapKey, renderTextileToCanvas } from './artwork';
import { mixHex } from './color';
import { PALETTE, ViewId, ViewState } from './config';
import { deriveFold, deriveFoldChain } from './geometry';
import { projectFold, StageSlotRect } from './projection';
import type { DesignState } from './state';

interface FoldStillCanvasProps {
  opening: number;
  panelOpenings?: readonly number[] | null;
  design: Pick<DesignState, 'baseHex' | 'designHex' | 'print' | 'motifScale'>;
  view: ViewState | ViewId;
  uploadedBitmap?: ImageBitmap | null;
  showBracket?: boolean;
  atelierFraming?: boolean;
  darkSurface?: boolean;
  slotRect?: StageSlotRect | null;
  background?: string | null; // CSS hex color, or null for transparent (used in RoomStudies & atelier hero)
  className?: string;
}

interface Pt {
  x: number;
  y: number;
}

interface Uv {
  u: number;
  v: number;
}

/**
 * Draws one projected textured triangle cleanly into the 2D canvas using a slightly
 * centroid-expanded clip triangle so adjacent triangle seams remain hairline-free.
 */
function drawTexturedTriangle(
  ctx: CanvasRenderingContext2D,
  texCanvas: HTMLCanvasElement,
  p0: Pt,
  p1: Pt,
  p2: Pt,
  uv0: Uv,
  uv1: Uv,
  uv2: Uv,
) {
  const tw = texCanvas.width;
  const th = texCanvas.height;

  const u0 = uv0.u * tw;
  const v0 = uv0.v * th;
  const u1 = uv1.u * tw;
  const v1 = uv1.v * th;
  const u2 = uv2.u * tw;
  const v2 = uv2.v * th;

  const du1 = u1 - u0;
  const dv1 = v1 - v0;
  const du2 = u2 - u0;
  const dv2 = v2 - v0;
  const det = du1 * dv2 - du2 * dv1;
  if (Math.abs(det) < 1e-4) return;

  const dx1 = p1.x - p0.x;
  const dy1 = p1.y - p0.y;
  const dx2 = p2.x - p0.x;
  const dy2 = p2.y - p0.y;

  const invDet = 1 / det;
  const a = (dx1 * dv2 - dx2 * dv1) * invDet;
  const b = (dy1 * dv2 - dy2 * dv1) * invDet;
  const c = (du1 * dx2 - du2 * dx1) * invDet;
  const d = (du1 * dy2 - du2 * dy1) * invDet;
  const e = p0.x - a * u0 - c * v0;
  const f = p0.y - b * u0 - d * v0;

  // Subtly expand clip triangle by 0.4px from centroid to avoid subpixel seams between diagonal triangles
  const cx = (p0.x + p1.x + p2.x) / 3;
  const cy = (p0.y + p1.y + p2.y) / 3;
  const expand = (p: Pt): Pt => {
    const vx = p.x - cx;
    const vy = p.y - cy;
    const len = Math.hypot(vx, vy) || 1;
    return { x: p.x + (vx / len) * 0.45, y: p.y + (vy / len) * 0.45 };
  };
  const cp0 = expand(p0);
  const cp1 = expand(p1);
  const cp2 = expand(p2);

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(cp0.x, cp0.y);
  ctx.lineTo(cp1.x, cp1.y);
  ctx.lineTo(cp2.x, cp2.y);
  ctx.closePath();
  ctx.clip();
  ctx.transform(a, b, c, d, e, f);
  ctx.drawImage(texCanvas, 0, 0);
  ctx.restore();
}

export const FoldStillCanvas: React.FC<FoldStillCanvasProps> = ({
  opening,
  panelOpenings = null,
  design,
  view,
  uploadedBitmap = null,
  showBracket = true,
  atelierFraming = false,
  darkSurface = false,
  slotRect = null,
  background = PALETTE.rose,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textureCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastTexKeyRef = useRef<string>('');
  const sizeRef = useRef<{ w: number; h: number }>({ w: 640, h: 460 });
  const paintRef = useRef<() => void>(() => {});

  // Draw function kept cleanly reusable for both state changes and resize events
  const paint = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const liveRect = canvas.getBoundingClientRect();
    if (liveRect.width >= 4 && liveRect.height >= 4) {
      sizeRef.current = { w: liveRect.width, h: liveRect.height };
    }

    const cssW = Math.max(8, sizeRef.current.w);
    const cssH = Math.max(8, sizeRef.current.h);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const pixelW = Math.round(cssW * dpr);
    const pixelH = Math.round(cssH * dpr);

    if (canvas.width !== pixelW || canvas.height !== pixelH) {
      canvas.width = pixelW;
      canvas.height = pixelH;
    }

    if (!textureCanvasRef.current) {
      textureCanvasRef.current = document.createElement('canvas');
      textureCanvasRef.current.width = 1024;
      textureCanvasRef.current.height = 569;
    }

    const texKey = `${design.baseHex}|${design.designHex}|${design.print}|${design.motifScale}|${getBitmapKey(uploadedBitmap)}`;
    if (texKey !== lastTexKeyRef.current) {
      lastTexKeyRef.current = texKey;
      renderTextileToCanvas(textureCanvasRef.current, design, uploadedBitmap);
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.save();
    ctx.scale(dpr, dpr);

    if (background) {
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, cssW, cssH);
    } else {
      ctx.clearRect(0, 0, cssW, cssH);
    }

    const pose =
      panelOpenings && panelOpenings.length === 16
        ? deriveFoldChain(panelOpenings)
        : deriveFold(opening);
    const projected = projectFold(
      pose,
      view,
      cssW / cssH,
      cssW,
      cssH,
      atelierFraming ? opening : undefined,
      slotRect ?? undefined,
    );

    // 1. Soft floor contact shadow
    const sh = projected.shadowEllipse;
    ctx.save();
    ctx.translate(sh.cx, sh.cy);
    ctx.scale(sh.rx, sh.ry);
    const grad = ctx.createRadialGradient(0, 0, 0.05, 0, 0, 1);
    grad.addColorStop(0, 'rgba(75, 32, 42, 0.25)');
    grad.addColorStop(0.62, 'rgba(75, 32, 42, 0.09)');
    grad.addColorStop(1, 'rgba(75, 32, 42, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 2. Depth-sorted projected faces
    const texCanvas = textureCanvasRef.current;
    const edgeDark = mixHex(design.baseHex, '#201014', 0.28);
    const edgeLight = mixHex(design.baseHex, '#FFFCF8', 0.22);

    ctx.lineJoin = 'round';
    for (const face of projected.faces) {
      const pts = face.points;
      if (pts.length < 3) continue;

      if (face.kind === 'felt' && face.uvs && face.uvs.length >= 4 && pts.length >= 4) {
        drawTexturedTriangle(ctx, texCanvas, pts[0], pts[1], pts[2], face.uvs[0], face.uvs[1], face.uvs[2]);
        drawTexturedTriangle(ctx, texCanvas, pts[0], pts[2], pts[3], face.uvs[0], face.uvs[2], face.uvs[3]);

        // Directional studio pleat shading glaze
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i = 1; i < pts.length; i += 1) ctx.lineTo(pts[i].x, pts[i].y);
        ctx.closePath();

        if (face.shade < 0.86) {
          const shadowAlpha = Math.min(0.26, (0.86 - face.shade) * 0.85);
          ctx.fillStyle = `rgba(34, 16, 20, ${shadowAlpha.toFixed(3)})`;
          ctx.fill();
        } else if (face.shade > 0.91) {
          const hiAlpha = Math.min(0.1, (face.shade - 0.91) * 0.9);
          ctx.fillStyle = `rgba(255, 252, 248, ${hiAlpha.toFixed(3)})`;
          ctx.fill();
        }

        // Subtle pleat crease stroke
        ctx.strokeStyle = edgeDark;
        ctx.globalAlpha = 0.22;
        ctx.lineWidth = 0.75;
        ctx.stroke();
        ctx.globalAlpha = 1;
        continue;
      }

      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i += 1) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.closePath();

      if (face.kind === 'foot') {
        const f = Math.min(1.08, 0.72 + face.shade * 0.34);
        ctx.fillStyle = `rgb(${Math.min(255, Math.round(75 * f))}, ${Math.min(255, Math.round(32 * f))}, ${Math.min(255, Math.round(42 * f))})`;
        ctx.fill();
        ctx.strokeStyle = PALETTE.oxblood;
        ctx.globalAlpha = 0.65;
        ctx.lineWidth = 0.75;
        ctx.stroke();
        ctx.globalAlpha = 1;
      } else if (face.kind === 'top') {
        ctx.fillStyle = edgeLight;
        ctx.fill();
        ctx.strokeStyle = edgeDark;
        ctx.globalAlpha = 0.28;
        ctx.lineWidth = 0.65;
        ctx.stroke();
        ctx.globalAlpha = 1;
      } else {
        // End cap remains clean base felt color
        const t = Math.max(0, Math.min(1, (face.shade - 0.56) / 0.44));
        ctx.fillStyle =
          t < 0.55
            ? mixHex(edgeDark, design.baseHex, t / 0.55)
            : mixHex(design.baseHex, edgeLight, (t - 0.55) / 0.45);
        ctx.fill();
        ctx.strokeStyle = edgeDark;
        ctx.globalAlpha = 0.25;
        ctx.lineWidth = 0.7;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    // 3. Dimension bracket below feet (omitted on compact mobile sticky heights)
    if (showBracket && cssH >= 170 && projected.spanBracket.visible) {
      const br = projected.spanBracket;
      const by = Math.min(cssH - 10, br.y);
      ctx.strokeStyle = darkSurface ? '#F8F2EE' : PALETTE.oxblood;
      ctx.globalAlpha = darkSurface ? 0.72 : 0.68;
      ctx.lineWidth = 1.15;
      ctx.beginPath();
      ctx.moveTo(br.leftX, by);
      ctx.lineTo(br.rightX, by);
      ctx.moveTo(br.leftX, by - 5);
      ctx.lineTo(br.leftX, by + 5);
      ctx.moveTo(br.rightX, by - 5);
      ctx.lineTo(br.rightX, by + 5);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    ctx.restore();
  };

  paintRef.current = paint;

  // Track container dimensions cleanly with ResizeObserver using latest paintRef
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const measure = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width >= 4 && rect.height >= 4) {
        sizeRef.current = { w: rect.width, h: rect.height };
        paintRef.current();
      }
    };
    measure();

    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => measure())
        : null;
    ro?.observe(canvas);
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  useEffect(() => {
    paintRef.current();
  }, [opening, panelOpenings, design.baseHex, design.designHex, design.print, design.motifScale, view, uploadedBitmap, showBracket, atelierFraming, darkSurface, slotRect, background]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      tabIndex={-1}
      className={`block w-full h-full select-none ${className}`}
    />
  );
};
