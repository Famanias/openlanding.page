'use client';

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { hexToRgba } from '../utils/desertPalette';
import { drawDryBrushStroke, getPaperGrainDataUrl } from '../utils/brushTextures';
import { clamp } from '../utils/sceneLayout';
import type { DesertWindField, PointerWindImpulse } from '../systems/DesertWindField';
import { DustWashSystem } from '../systems/DustWashSystem';

export interface AtmosphereRenderState {
  t: number;
  dt: number;
  windField: DesertWindField;
  dustEnabled: boolean;
  heatShimmerEnabled: boolean;
  brushAnimationEnabled: boolean;
  pointerEnabled: boolean;
  windStrength: number;
  motionIntensity: number;
  brushActivity: number;
  scrollHazeMultiplier: number;
  passageDustBoost: number;
  scrollGustBoost: number;
  cliffLightShift: number;
  geologicalScrollReveal: number;
  lifeBlend: number;
  sunProgress: number;
  pointerX: number;
  pointerY: number;
  pointerActive: boolean;
  pointerWind: PointerWindImpulse | null;
}

export interface AtmosphereLayerHandle {
  renderFrame: (state: AtmosphereRenderState) => void;
}

interface AtmosphereLayerProps {
  texturesEnabled: boolean;
}

// Compact live canvas upscaled cleanly for painterly atmospheric dust, cliff light & mirage waves
const HAZE_W = 640;
const HAZE_H = 360;

export const AtmosphereLayer = React.memo(
  forwardRef<AtmosphereLayerHandle, AtmosphereLayerProps>(
    ({ texturesEnabled }, ref) => {
      const canvasRef = useRef<HTMLCanvasElement | null>(null);
      const underpaintRef = useRef<HTMLCanvasElement | null>(null);
      const scratchRef = useRef<HTMLCanvasElement | null>(null);
      const dustSystemRef = useRef<DustWashSystem | null>(null);
      const [paperUrl, setPaperUrl] = useState<string>('');

      useEffect(() => {
        setPaperUrl(getPaperGrainDataUrl());
        dustSystemRef.current = new DustWashSystem(8821);

        // Pre-render subtle dry-brush underpainting strokes onto a compact offscreen canvas ONCE
        const underpaint = document.createElement('canvas');
        underpaint.width = HAZE_W;
        underpaint.height = HAZE_H;
        const uctx = underpaint.getContext('2d');
        if (uctx) {
          uctx.scale(HAZE_W / 1920, HAZE_H / 1080);
          const revealStrokes: Array<{
            pts: Array<[number, number]>;
            w: number;
            col: string;
            sec: string;
            seed: number;
          }> = [
            {
              pts: [[1590, 20], [1545, 220], [1485, 420]],
              w: 58,
              col: '#F4DAB9',
              sec: '#B85A39',
              seed: 5101,
            },
            {
              pts: [[1735, 10], [1680, 220], [1605, 450]],
              w: 52,
              col: '#F4D8B6',
              sec: '#9E4B2F',
              seed: 5129,
            },
            {
              pts: [[1320, 610], [1660, 548], [1940, 502]],
              w: 52,
              col: '#F2D5B3',
              sec: '#A64E32',
              seed: 5167,
            },
            {
              pts: [[1240, 700], [1600, 635], [1940, 582]],
              w: 48,
              col: '#F3DAB8',
              sec: '#8F432C',
              seed: 5197,
            },
            {
              pts: [[720, 638], [1020, 560], [1310, 480]],
              w: 44,
              col: '#F3D9BA',
              sec: '#AE5638',
              seed: 5231,
            },
            {
              pts: [[820, 845], [1220, 935], [1740, 1045]],
              w: 46,
              col: '#F5DFC5',
              sec: '#9D4B30',
              seed: 5273,
            },
            {
              pts: [[40, 960], [280, 845], [560, 755]],
              w: 48,
              col: '#F2D7B9',
              sec: '#AD5738',
              seed: 5309,
            },
          ];

          for (const s of revealStrokes) {
            drawDryBrushStroke(uctx, s.pts, {
              width: s.w,
              color: s.col,
              secondaryColor: s.sec,
              opacity: 0.72,
              bristles: 22,
              dryness: 0.72,
              taperStart: 0.16,
              taperEnd: 0.22,
              seed: s.seed,
            });
          }
        }

        const scratch = document.createElement('canvas');
        scratch.width = HAZE_W;
        scratch.height = HAZE_H;

        underpaintRef.current = underpaint;
        scratchRef.current = scratch;
      }, []);

      useImperativeHandle(ref, () => ({
        renderFrame: (s: AtmosphereRenderState) => {
          const canvas = canvasRef.current;
          const dust = dustSystemRef.current;
          if (!canvas || !dust) return;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          const scaleX = HAZE_W / 1920;
          const scaleY = HAZE_H / 1080;

          ctx.clearRect(0, 0, HAZE_W, HAZE_H);

          // 1. Localized pigment reactivation revealing subtle underpainting brushwork near cursor/scroll
          const underpaint = underpaintRef.current;
          const scratch = scratchRef.current;
          if (
            s.brushAnimationEnabled &&
            underpaint &&
            scratch &&
            s.lifeBlend > 0.15
          ) {
            const rsCtx = scratch.getContext('2d');
            if (rsCtx) {
              const pointerBoost =
                s.pointerEnabled && s.pointerActive ? 0.34 : 0;
              const baseScroll = s.geologicalScrollReveal * 0.28;
              const revealAlpha = clamp(
                (baseScroll + pointerBoost) *
                  clamp(s.brushActivity, 0.2, 2) *
                  s.lifeBlend,
                0,
                0.56
              );

              if (revealAlpha > 0.02) {
                const cx = (s.pointerActive ? s.pointerX : 1480) * scaleX;
                const cy = (s.pointerActive ? s.pointerY : 520) * scaleY;
                const radius = HAZE_W * (0.24 + s.geologicalScrollReveal * 0.34);

                rsCtx.globalCompositeOperation = 'source-over';
                rsCtx.clearRect(0, 0, HAZE_W, HAZE_H);
                rsCtx.drawImage(underpaint, 0, 0);

                rsCtx.globalCompositeOperation = 'destination-in';
                const maskGrad = rsCtx.createRadialGradient(
                  cx,
                  cy,
                  radius * 0.12,
                  cx,
                  cy,
                  radius
                );
                maskGrad.addColorStop(0, `rgba(0,0,0,${revealAlpha.toFixed(3)})`);
                maskGrad.addColorStop(
                  0.58,
                  `rgba(0,0,0,${(revealAlpha * 0.52).toFixed(3)})`
                );
                maskGrad.addColorStop(1, 'rgba(0,0,0,0)');
                rsCtx.fillStyle = maskGrad;
                rsCtx.fillRect(0, 0, HAZE_W, HAZE_H);

                ctx.drawImage(scratch, 0, 0);
              }
            }
          }

          // 2. Subtle warm golden sunlight modulation gliding across upper-right cliff shelves
          if (s.lifeBlend > 0.15 && s.motionIntensity > 0.05) {
            const lightWave = 0.5 + 0.5 * Math.sin(s.t * 0.24);
            const lx = (1460 + lightWave * 210 - s.cliffLightShift * 140) * scaleX;
            const ly = (260 + lightWave * 130 + s.cliffLightShift * 180) * scaleY;
            const lr = 240 * scaleX;
            const lightAlpha = (0.055 + 0.035 * lightWave) * s.lifeBlend;

            const lGrad = ctx.createRadialGradient(lx, ly, lr * 0.1, lx, ly, lr);
            lGrad.addColorStop(0, hexToRgba('#F8E2BE', lightAlpha));
            lGrad.addColorStop(0.55, hexToRgba('#EBC69A', lightAlpha * 0.45));
            lGrad.addColorStop(1, hexToRgba('#EBC69A', 0));
            ctx.fillStyle = lGrad;
            ctx.beginPath();
            ctx.arc(lx, ly, lr, 0, Math.PI * 2);
            ctx.fill();
          }

          // 3. Subtle warm atmospheric halo breathing around the golden sun
          if (s.sunProgress > 0.2 && s.dustEnabled) {
            const breath = 0.5 + 0.5 * Math.sin(s.t * 0.38);
            const sx = 468 * scaleX;
            const sy = 486 * scaleY;
            const sr = (185 + breath * 22) * scaleX;
            const haloAlpha = (0.045 + breath * 0.04) * s.sunProgress;
            const sGrad = ctx.createRadialGradient(sx, sy, sr * 0.52, sx, sy, sr);
            sGrad.addColorStop(0, hexToRgba('#EED096', haloAlpha));
            sGrad.addColorStop(0.6, hexToRgba('#F3DFBE', haloAlpha * 0.45));
            sGrad.addColorStop(1, hexToRgba('#F3E9DA', 0));
            ctx.fillStyle = sGrad;
            ctx.beginPath();
            ctx.arc(sx, sy, sr, 0, Math.PI * 2);
            ctx.fill();
          }

          // 4. Directional painted dust washes, sun-dust veils, canyon gusts & sandstone motes
          if (s.dustEnabled) {
            dust.step(s.dt, s.t, s.windField, {
              windStrength: s.windStrength,
              motionIntensity: s.motionIntensity,
              scrollHazeMultiplier: s.scrollHazeMultiplier,
              passageDustBoost: s.passageDustBoost,
              scrollGustBoost: s.scrollGustBoost,
              pointerWind: s.pointerWind,
              pointerEnabled: s.pointerEnabled,
              lifeBlend: Math.max(s.sunProgress * 0.55, s.lifeBlend),
            });

            const dustVisibility = clamp(
              Math.max(s.sunProgress * 0.6, s.lifeBlend),
              0,
              1
            );

            for (const w of dust.washes) {
              const alpha = w.opacity * dustVisibility;
              if (alpha <= 0.005) continue;

              const rx = w.x * scaleX;
              const ry = w.y * scaleY;
              const halfLen = w.length * 0.5 * scaleX;
              const halfThick = w.thickness * 0.5 * scaleY;

              ctx.save();
              ctx.translate(rx, ry);
              ctx.rotate((w.currentAngleDeg * Math.PI) / 180);

              const grad = ctx.createRadialGradient(
                0,
                0,
                halfThick * 0.14,
                0,
                0,
                halfLen
              );
              grad.addColorStop(0, hexToRgba(w.color, alpha));
              grad.addColorStop(0.55, hexToRgba(w.color, alpha * 0.46));
              grad.addColorStop(1, hexToRgba(w.color, 0));

              ctx.scale(1, halfThick / halfLen);
              ctx.fillStyle = grad;
              ctx.beginPath();
              ctx.arc(0, 0, halfLen, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }

            // Loose warm sandstone pigment motes drifting coherently with wind
            if (s.lifeBlend > 0.2) {
              for (const f of dust.flecks) {
                const alpha =
                  f.opacity *
                  s.lifeBlend *
                  (0.6 + 0.4 * Math.sin(s.t * 1.1 + f.phase));
                if (alpha <= 0.01) continue;
                ctx.fillStyle = hexToRgba(f.color, alpha);
                ctx.beginPath();
                ctx.arc(f.x * scaleX, f.y * scaleY, f.radius * 0.68, 0, Math.PI * 2);
                ctx.fill();
              }
            }

            // Localized pointer breeze dust wisps
            for (const sw of dust.swirlWisps) {
              const u = sw.life / sw.maxLife;
              const env = Math.sin(u * Math.PI);
              const alpha = 0.24 * env * dustVisibility;
              if (alpha <= 0.006) continue;

              const angle = Math.atan2(sw.vy, sw.vx);
              const halfLen = sw.length * (0.65 + u * 0.45) * 0.5 * scaleX;
              const halfThick = sw.thickness * 0.5 * scaleY;

              ctx.save();
              ctx.translate(sw.x * scaleX, sw.y * scaleY);
              ctx.rotate(angle);
              ctx.scale(1, halfThick / Math.max(4, halfLen));
              const g = ctx.createRadialGradient(0, 0, 1, 0, 0, halfLen);
              g.addColorStop(0, hexToRgba(sw.color, alpha));
              g.addColorStop(1, hexToRgba(sw.color, 0));
              ctx.fillStyle = g;
              ctx.beginPath();
              ctx.arc(0, 0, halfLen, 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          }

          // 5. Localized warm desert heat shimmer strictly over distant sunlit valley & shelves
          //    (never distorts traveler at y=838 or foreground promontory)
          if (s.heatShimmerEnabled && s.lifeBlend > 0.25) {
            const shimmerAlpha = clamp(
              0.052 * s.scrollHazeMultiplier * s.lifeBlend * Math.min(1.4, s.motionIntensity),
              0,
              0.11
            );
            if (shimmerAlpha > 0.008) {
              ctx.save();
              ctx.lineCap = 'round';
              for (let band = 0; band < 4; band++) {
                const baseY = (565 + band * 44) * scaleY;
                const startX = (380 + band * 55) * scaleX;
                const endX = (1180 + band * 25) * scaleX;
                const driftPhase = s.t * (1.15 + band * 0.28) + band * 1.9;

                ctx.beginPath();
                for (let x = startX; x <= endX; x += 18) {
                  const norm = (x - startX) / (endX - startX);
                  const env = Math.sin(norm * Math.PI);
                  const yWave =
                    Math.sin(x * 0.045 - driftPhase) * 2.8 * env +
                    Math.cos(x * 0.085 + driftPhase * 0.7) * 1.1 * env;
                  const py = baseY + yWave;
                  if (x === startX) ctx.moveTo(x, py);
                  else ctx.lineTo(x, py);
                }
                ctx.strokeStyle = hexToRgba('#F6EADA', shimmerAlpha);
                ctx.lineWidth = 4.2 - band * 0.55;
                ctx.stroke();
              }
              ctx.restore();
            }
          }
        },
      }));

      return (
        <>
          <canvas
            ref={canvasRef}
            width={HAZE_W}
            height={HAZE_H}
            data-layer="atmosphere-haze"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          />

          {texturesEnabled && (
            <div
              className="pointer-events-none absolute inset-0 z-20"
              data-layer="paper-texture-overlay"
              aria-hidden="true"
            >
              {paperUrl && (
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${paperUrl})`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '256px 256px',
                    opacity: 0.12,
                  }}
                />
              )}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse at 45% 48%, rgba(243,233,218,0) 62%, rgba(138,76,56,0.06) 100%)',
                }}
              />
            </div>
          )}
        </>
      );
    }
  )
);

AtmosphereLayer.displayName = 'AtmosphereLayer';
