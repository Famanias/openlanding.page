'use client';

import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { DESERT_PALETTE } from '../utils/desertPalette';
import { clamp, createSeededRandom, smoothstep } from '../utils/sceneLayout';
import type { DesertWindField, PointerWindImpulse } from '../systems/DesertWindField';
import {
  computeGrassBladeAngleDeg,
  computeShrubBranchAngleDeg,
  type GrassBladeWindParams,
} from '../systems/VegetationAnimator';

export interface VegetationUpdateOptions {
  enabled: boolean;
  windStrength: number;
  motionIntensity: number;
  scrollGustBoost: number;
  pointerWind: PointerWindImpulse | null;
  pointerEnabled: boolean;
  lifeBlend: number;
}

export interface DesertVegetationHandle {
  applyWind: (
    t: number,
    windField: DesertWindField,
    options: VegetationUpdateOptions,
    vegetationProgress: number
  ) => void;
}

interface GrassBladeSpec {
  id: string;
  rootX: number;
  rootY: number;
  /** Local SVG path starting cleanly at (0, 0) root and curving upward */
  d: string;
  length: number;
  color: string;
  strokeWidth: number;
  opacity: number;
  wind: GrassBladeWindParams;
  revealDelay: number;
}

interface ShrubTwigSpec {
  id: string;
  anchorX: number;
  anchorY: number;
  d: string;
  length: number;
  strokeWidth: number;
  phase: number;
}

interface ShrubMidBranchSpec {
  id: string;
  anchorX: number;
  anchorY: number;
  d: string;
  length: number;
  strokeWidth: number;
  phase: number;
  twigs: ShrubTwigSpec[];
}

interface ShrubSpec {
  id: string;
  x: number;
  y: number;
  scale: number;
  darkColor: string;
  lightColor: string;
  trunkD: string;
  trunkLength: number;
  phase: number;
  branches: ShrubMidBranchSpec[];
}

function buildShrubSpec(
  id: string,
  x: number,
  y: number,
  scale: number,
  darkColor: string,
  lightColor: string,
  seed: number
): ShrubSpec {
  const rand = createSeededRandom(seed);
  const branches: ShrubMidBranchSpec[] = [];
  const mainStems = 4;

  for (let i = 0; i < mainStems; i++) {
    const baseAngle = -Math.PI * 0.5 + (i / (mainStems - 1) - 0.5) * 1.48 + (rand() - 0.5) * 0.16;
    const len = 24 + rand() * 20;
    const ax = (rand() - 0.5) * 8;
    const ay = 0;
    const cx = Math.cos(baseAngle) * len * 0.5 + (rand() - 0.5) * 5;
    const cy = Math.sin(baseAngle) * len * 0.5 + (rand() - 0.5) * 4;
    const ex = Math.cos(baseAngle) * len;
    const ey = Math.sin(baseAngle) * len;

    const twigs: ShrubTwigSpec[] = [];
    const twigCount = 2 + (rand() > 0.45 ? 1 : 0);
    for (let j = 0; j < twigCount; j++) {
      const f = 0.45 + (j / twigCount) * 0.5;
      const tx0 = ex * f;
      const ty0 = ey * f;
      const spread = (j % 2 === 0 ? -1 : 1) * (0.34 + rand() * 0.34);
      const tAng = baseAngle + spread;
      const tLen = 13 + rand() * 14;
      const tcx = Math.cos(tAng) * tLen * 0.55 + (rand() - 0.5) * 3;
      const tcy = Math.sin(tAng) * tLen * 0.55 + (rand() - 0.5) * 3;
      const tex = Math.cos(tAng) * tLen;
      const tey = Math.sin(tAng) * tLen;

      twigs.push({
        id: `${id}-b${i}-t${j}`,
        anchorX: Number(tx0.toFixed(1)),
        anchorY: Number(ty0.toFixed(1)),
        d: `M 0 0 Q ${tcx.toFixed(1)} ${tcy.toFixed(1)} ${tex.toFixed(1)} ${tey.toFixed(1)}`,
        length: Math.ceil(tLen * 1.25),
        strokeWidth: 1.05,
        phase: rand() * Math.PI * 2,
      });
    }

    branches.push({
      id: `${id}-b${i}`,
      anchorX: Number(ax.toFixed(1)),
      anchorY: ay,
      d: `M 0 0 Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`,
      length: Math.ceil(len * 1.2),
      strokeWidth: 1.75,
      phase: rand() * Math.PI * 2,
      twigs,
    });
  }

  return {
    id,
    x,
    y,
    scale,
    darkColor,
    lightColor,
    trunkD: 'M -5 2 Q -1 -5 0 -10 M 4 2 Q 1 -4 0 -9',
    trunkLength: 28,
    phase: rand() * Math.PI * 2,
    branches,
  };
}

function buildGrassClump(
  clumpId: string,
  cx: number,
  cy: number,
  bladeCount: number,
  heightScale: number,
  primaryColor: string,
  accentColor: string,
  seed: number
): GrassBladeSpec[] {
  const rand = createSeededRandom(seed);
  const blades: GrassBladeSpec[] = [];

  for (let i = 0; i < bladeCount; i++) {
    const u = bladeCount === 1 ? 0 : (i / (bladeCount - 1)) * 2 - 1;
    const rx = cx + u * (16 * heightScale) + (rand() - 0.5) * 5;
    const ry = cy + Math.abs(u) * 3 + (rand() - 0.5) * 2;
    const h = (24 + rand() * 34) * heightScale * (1 - Math.abs(u) * 0.25);
    const lean = u * (16 + rand() * 14) * heightScale + (rand() - 0.5) * 8;
    const ctrlX = lean * 0.42 + (rand() - 0.5) * 6;
    const ctrlY = -h * 0.54;
    const useAccent = i % 3 === 1;

    blades.push({
      id: `${clumpId}-${i}`,
      rootX: Number(rx.toFixed(1)),
      rootY: Number(ry.toFixed(1)),
      d: `M 0 0 Q ${ctrlX.toFixed(1)} ${ctrlY.toFixed(1)} ${lean.toFixed(1)} ${(-h).toFixed(1)}`,
      length: Math.ceil(Math.hypot(lean, h) * 1.18),
      color: useAccent ? accentColor : primaryColor,
      strokeWidth: useAccent ? 1.2 : 1.55 + rand() * 0.35,
      opacity: useAccent ? 0.68 : 0.88,
      wind: {
        freq: 2.0 + rand() * 2.1,
        phase: rand() * Math.PI * 2,
        flex: 0.68 + (h / (58 * heightScale)) * 0.62,
      },
      revealDelay: rand() * 0.24,
    });
  }
  return blades;
}

/**
 * Rooted desert grasses and hierarchical woody shrubs rendered cleanly in SVG so:
 * 1) Stage 3 draws grasses from roots outward and grows shrub trunks -> mid branches -> twigs.
 * 2) Continuous canyon wind & localized pointer breeze bend blades asynchronously from roots
 *    while keeping woody shrub trunks steady and outer twigs trembling delicately.
 */
export const DesertVegetation = React.memo(
  forwardRef<DesertVegetationHandle>((_, ref) => {
    const shrubs = useMemo<ShrubSpec[]>(
      () => [
        buildShrubSpec('shrub-left', 604, 1012, 1.52, DESERT_PALETTE.dryGrassDark, '#D7B395', 4101),
        buildShrubSpec('shrub-mid', 608, 694, 0.58, '#6A3B2F', '#DFBE9F', 4129),
        buildShrubSpec('shrub-ridge', 1014, 822, 0.78, DESERT_PALETTE.dryGrassDark, '#E2C2A6', 4153),
        buildShrubSpec('shrub-right', 1772, 784, 1.76, '#39201D', '#F1DEC8', 4177),
      ],
      []
    );

    const grassBlades = useMemo<GrassBladeSpec[]>(
      () => [
        ...buildGrassClump('t1', 1196, 864, 9, 0.82, DESERT_PALETTE.dryGrassLight, DESERT_PALETTE.dryGrassDark, 6101),
        ...buildGrassClump('t2', 1318, 992, 12, 1.22, DESERT_PALETTE.dryGrassDark, '#D8AC88', 6203),
        ...buildGrassClump('t3', 1642, 788, 7, 0.76, DESERT_PALETTE.dryGrassLight, DESERT_PALETTE.dryGrassDark, 6307),
        ...buildGrassClump('t4', 1678, 852, 8, 0.68, DESERT_PALETTE.dryGrassDark, '#7B4635', 6409),
        ...buildGrassClump('t5', 1826, 926, 12, 1.28, DESERT_PALETTE.dryGrassDark, '#E6C6A6', 6511),
      ],
      []
    );

    const wrapperDivRef = useRef<HTMLDivElement | null>(null);
    const bladeGroupRefs = useRef<Array<SVGGElement | null>>([]);
    const bladePathRefs = useRef<Array<SVGPathElement | null>>([]);

    const shrubTrunkGroupRefs = useRef<Array<SVGGElement | null>>([]);
    const shrubTrunkPathRefs = useRef<Array<SVGPathElement | null>>([]);
    const shrubMidGroupRefs = useRef<Map<string, SVGGElement | null>>(new Map());
    const shrubMidPathRefs = useRef<Map<string, SVGPathElement | null>>(new Map());
    const shrubTwigGroupRefs = useRef<Map<string, SVGGElement | null>>(new Map());
    const shrubTwigPathRefs = useRef<Map<string, SVGPathElement | null>>(new Map());
    const wasHiddenRef = useRef<boolean>(true);

    useImperativeHandle(ref, () => ({
      applyWind: (
        t: number,
        windField: DesertWindField,
        options: VegetationUpdateOptions,
        vegetationProgress: number
      ) => {
        const vp = clamp(vegetationProgress, 0, 1);

        if (vp <= 0.005) {
          if (!wasHiddenRef.current || wrapperDivRef.current?.style.visibility !== 'hidden') {
            wasHiddenRef.current = true;
            if (wrapperDivRef.current) wrapperDivRef.current.style.visibility = 'hidden';
            for (let i = 0; i < grassBlades.length; i++) {
              const p = bladePathRefs.current[i];
              if (p) p.style.opacity = '0';
            }
            for (let s = 0; s < shrubs.length; s++) {
              const g = shrubTrunkGroupRefs.current[s];
              if (g) g.style.opacity = '0';
            }
          }
          return;
        }
        if (wasHiddenRef.current) {
          wasHiddenRef.current = false;
          if (wrapperDivRef.current) wrapperDivRef.current.style.visibility = 'visible';
        }

        // 1. Update every rooted grass blade (root-to-tip reveal + asynchronous root bend)
        for (let i = 0; i < grassBlades.length; i++) {
          const blade = grassBlades[i];
          const grp = bladeGroupRefs.current[i];
          const path = bladePathRefs.current[i];
          if (!grp || !path) continue;

          const localReveal = smoothstep(
            blade.revealDelay,
            Math.min(1, blade.revealDelay + 0.62),
            vp
          );

          if (localReveal <= 0.005) {
            path.style.opacity = '0';
            continue;
          }

          path.style.opacity = (blade.opacity * Math.min(1, localReveal * 1.4)).toFixed(3);
          path.style.strokeDashoffset = (blade.length * (1 - localReveal)).toFixed(1);

          const wind = windField.sampleAt(blade.rootX, blade.rootY, t, {
            windStrength: options.windStrength,
            motionIntensity: options.motionIntensity,
            scrollGustBoost: options.scrollGustBoost,
            pointerWind: options.pointerWind,
            pointerEnabled: options.pointerEnabled,
          });
          const angle = computeGrassBladeAngleDeg(t, wind, blade.wind, {
            enabled: options.enabled,
            motionIntensity: options.motionIntensity,
            lifeBlend: options.lifeBlend,
          });
          grp.setAttribute(
            'transform',
            `translate(${blade.rootX}, ${blade.rootY}) rotate(${angle.toFixed(2)})`
          );
        }

        // 2. Update hierarchical desert shrubs (stiff trunk -> mid branches -> trembling twigs)
        const trunkReveal = smoothstep(0.0, 0.38, vp);
        const midReveal = smoothstep(0.22, 0.72, vp);
        const twigReveal = smoothstep(0.5, 1.0, vp);

        for (let s = 0; s < shrubs.length; s++) {
          const shrub = shrubs[s];
          const wind = windField.sampleAt(shrub.x, shrub.y, t, {
            windStrength: options.windStrength,
            motionIntensity: options.motionIntensity,
            scrollGustBoost: options.scrollGustBoost,
            pointerWind: options.pointerWind,
            pointerEnabled: options.pointerEnabled,
          });

          const trunkAngle = computeShrubBranchAngleDeg(t, wind, 'trunk', shrub.phase, {
            enabled: options.enabled,
            motionIntensity: options.motionIntensity,
            lifeBlend: options.lifeBlend,
          });

          const tGrp = shrubTrunkGroupRefs.current[s];
          const tPath = shrubTrunkPathRefs.current[s];
          if (tGrp) {
            tGrp.setAttribute(
              'transform',
              `translate(${shrub.x}, ${shrub.y}) scale(${shrub.scale}) rotate(${trunkAngle.toFixed(2)})`
            );
            tGrp.style.opacity = vp <= 0.005 ? '0' : '1';
          }
          if (tPath) {
            tPath.style.strokeDashoffset = (shrub.trunkLength * (1 - trunkReveal)).toFixed(1);
          }

          for (const br of shrub.branches) {
            const mGrp = shrubMidGroupRefs.current.get(br.id);
            const mPath = shrubMidPathRefs.current.get(br.id);
            const midAngle = computeShrubBranchAngleDeg(t, wind, 'mid', br.phase, {
              enabled: options.enabled,
              motionIntensity: options.motionIntensity,
              lifeBlend: options.lifeBlend,
            });
            if (mGrp) {
              mGrp.setAttribute(
                'transform',
                `translate(${br.anchorX}, ${br.anchorY}) rotate(${midAngle.toFixed(2)})`
              );
            }
            if (mPath) {
              mPath.style.strokeDashoffset = (br.length * (1 - midReveal)).toFixed(1);
              mPath.style.opacity = midReveal <= 0.01 ? '0' : '0.9';
            }

            for (const tw of br.twigs) {
              const twGrp = shrubTwigGroupRefs.current.get(tw.id);
              const twPath = shrubTwigPathRefs.current.get(tw.id);
              const twigAngle = computeShrubBranchAngleDeg(t, wind, 'twig', tw.phase, {
                enabled: options.enabled,
                motionIntensity: options.motionIntensity,
                lifeBlend: options.lifeBlend,
              });
              if (twGrp) {
                twGrp.setAttribute(
                  'transform',
                  `translate(${tw.anchorX}, ${tw.anchorY}) rotate(${twigAngle.toFixed(2)})`
                );
              }
              if (twPath) {
                twPath.style.strokeDashoffset = (tw.length * (1 - twigReveal)).toFixed(1);
                twPath.style.opacity = twigReveal <= 0.01 ? '0' : '0.86';
              }
            }
          }
        }
      },
    }));

    return (
      <div
        ref={wrapperDivRef}
        className="pointer-events-none absolute"
        data-layer="desert-vegetation"
        aria-hidden="true"
        style={{
          left: 140 + 540,
          top: 90 + 620,
          width: 1380,
          height: 440,
          visibility: 'hidden',
        }}
      >
        <svg
          viewBox="540 620 1380 440"
          className="h-full w-full"
        >
          {/* Hierarchical branching desert shrubs */}
          {shrubs.map((shrub, sIdx) => (
            <g
              key={shrub.id}
              ref={(el) => {
                shrubTrunkGroupRefs.current[sIdx] = el;
              }}
              transform={`translate(${shrub.x}, ${shrub.y}) scale(${shrub.scale})`}
              style={{ opacity: 0 }}
            >
              <path
                ref={(el) => {
                  shrubTrunkPathRefs.current[sIdx] = el;
                }}
                d={shrub.trunkD}
                stroke={shrub.darkColor}
                strokeWidth="2.3"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={`${shrub.trunkLength} ${shrub.trunkLength + 10}`}
                strokeDashoffset={shrub.trunkLength}
              />

              {shrub.branches.map((br) => (
                <g
                  key={br.id}
                  ref={(el) => {
                    shrubMidGroupRefs.current.set(br.id, el);
                  }}
                  transform={`translate(${br.anchorX}, ${br.anchorY})`}
                >
                  {/* Subtle pale sunlit rim shadow behind main woody branch */}
                  <path
                    d={br.d}
                    transform="translate(-1.2, -0.8)"
                    stroke={shrub.lightColor}
                    strokeWidth={br.strokeWidth * 0.9}
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.45"
                  />
                  <path
                    ref={(el) => {
                      shrubMidPathRefs.current.set(br.id, el);
                    }}
                    d={br.d}
                    stroke={shrub.darkColor}
                    strokeWidth={br.strokeWidth}
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={`${br.length} ${br.length + 10}`}
                    strokeDashoffset={br.length}
                    style={{ opacity: 0 }}
                  />

                  {/* Fine outer twigs nested inside mid-branch coordinate space */}
                  {br.twigs.map((tw) => (
                    <g
                      key={tw.id}
                      ref={(el) => {
                        shrubTwigGroupRefs.current.set(tw.id, el);
                      }}
                      transform={`translate(${tw.anchorX}, ${tw.anchorY})`}
                    >
                      <path
                        ref={(el) => {
                          shrubTwigPathRefs.current.set(tw.id, el);
                        }}
                        d={tw.d}
                        stroke={shrub.darkColor}
                        strokeWidth={tw.strokeWidth}
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray={`${tw.length} ${tw.length + 10}`}
                        strokeDashoffset={tw.length}
                        style={{ opacity: 0 }}
                      />
                    </g>
                  ))}
                </g>
              ))}
            </g>
          ))}

          {/* Root-anchored desert grass blades */}
          {grassBlades.map((blade, idx) => (
            <g
              key={blade.id}
              ref={(el) => {
                bladeGroupRefs.current[idx] = el;
              }}
              transform={`translate(${blade.rootX}, ${blade.rootY})`}
            >
              <path
                ref={(el) => {
                  bladePathRefs.current[idx] = el;
                }}
                d={blade.d}
                stroke={blade.color}
                strokeWidth={blade.strokeWidth}
                strokeLinecap="round"
                fill="none"
                strokeDasharray={`${blade.length} ${blade.length + 10}`}
                strokeDashoffset={blade.length}
                style={{ opacity: 0 }}
              />
            </g>
          ))}
        </svg>
      </div>
    );
  })
);

DesertVegetation.displayName = 'DesertVegetation';
