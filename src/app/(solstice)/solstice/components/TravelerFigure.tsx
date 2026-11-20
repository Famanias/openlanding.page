'use client';

import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { DESERT_PALETTE } from '../utils/desertPalette';
import { SCENE_BLEED_X, SCENE_BLEED_Y, clamp } from '../utils/sceneLayout';
import {
  TRAVELER_BASE_X,
  TRAVELER_BASE_Y,
  type ArticulatedTravelerPose,
} from '../systems/TravelerAnimator';

export interface TravelerFigureHandle {
  applyPose: (pose: ArticulatedTravelerPose, travelerProgress: number) => void;
}

/**
 * Articulated 2D nested-joint solitary desert traveler standing on the central sunlit
 * canyon promontory ridge. Every limb/garment/parasol attaches cleanly to its parent
 * joint pivot (zero detached parts) and updates imperatively at 60Hz with zero React rerenders.
 */
export const TravelerFigure = React.memo(
  forwardRef<TravelerFigureHandle>((_, ref) => {
    const wrapperDivRef = useRef<HTMLDivElement | null>(null);
    const rootTranslateRef = useRef<SVGGElement | null>(null);
    const shadowGroupRef = useRef<SVGGElement | null>(null);
    const clipRectRef = useRef<SVGRectElement | null>(null);
    const backLegRef = useRef<SVGGElement | null>(null);
    const frontLegRef = useRef<SVGGElement | null>(null);
    const torsoGroupRef = useRef<SVGGElement | null>(null);
    const cloakGroupRef = useRef<SVGGElement | null>(null);
    const backArmRef = useRef<SVGGElement | null>(null);
    const headGroupRef = useRef<SVGGElement | null>(null);
    const parasolArmRef = useRef<SVGGElement | null>(null);
    const parasolGroupRef = useRef<SVGGElement | null>(null);
    const footDustGroupRef = useRef<SVGGElement | null>(null);
    const footDustCircleARef = useRef<SVGEllipseElement | null>(null);
    const footDustCircleBRef = useRef<SVGEllipseElement | null>(null);
    const isHiddenRef = useRef<boolean>(true);

    useImperativeHandle(ref, () => ({
      applyPose: (pose: ArticulatedTravelerPose, travelerProgress: number) => {
        const p = clamp(travelerProgress, 0, 1);

        if (p <= 0.005) {
          if (!isHiddenRef.current || wrapperDivRef.current?.style.visibility !== 'hidden') {
            isHiddenRef.current = true;
            if (wrapperDivRef.current) wrapperDivRef.current.style.visibility = 'hidden';
            if (rootTranslateRef.current) rootTranslateRef.current.style.opacity = '0';
            if (shadowGroupRef.current) shadowGroupRef.current.style.opacity = '0';
            if (footDustGroupRef.current) footDustGroupRef.current.style.opacity = '0';
          }
          return;
        }

        if (isHiddenRef.current) {
          isHiddenRef.current = false;
          if (wrapperDivRef.current) wrapperDivRef.current.style.visibility = 'visible';
        }

        // Reveal vertically upward from grounded boots -> cloak -> conical parasol during Stage 3
        if (clipRectRef.current) {
          const revealH = 88 * p;
          clipRectRef.current.setAttribute('y', String((8 - revealH).toFixed(2)));
          clipRectRef.current.setAttribute('height', String(revealH.toFixed(2)));
        }

        if (rootTranslateRef.current) {
          rootTranslateRef.current.setAttribute(
            'transform',
            `translate(${pose.x.toFixed(2)}, ${pose.y.toFixed(2)})`
          );
          rootTranslateRef.current.style.opacity = '1';
        }

        if (shadowGroupRef.current) {
          shadowGroupRef.current.setAttribute(
            'transform',
            `translate(${pose.x.toFixed(2)}, ${pose.y.toFixed(2)}) scale(${pose.shadowScaleX.toFixed(3)}, 1)`
          );
          shadowGroupRef.current.style.opacity = (p * 0.95).toFixed(3);
        }

        if (backLegRef.current) {
          backLegRef.current.setAttribute(
            'transform',
            `translate(0, -16) rotate(${pose.backLegDeg.toFixed(2)})`
          );
        }
        if (frontLegRef.current) {
          frontLegRef.current.setAttribute(
            'transform',
            `translate(0, -16) rotate(${pose.frontLegDeg.toFixed(2)})`
          );
        }
        if (torsoGroupRef.current) {
          torsoGroupRef.current.setAttribute(
            'transform',
            `translate(0, ${(-16 + pose.bodyBobY).toFixed(2)}) rotate(${pose.torsoLeanDeg.toFixed(2)})`
          );
        }
        if (cloakGroupRef.current) {
          cloakGroupRef.current.setAttribute(
            'transform',
            `translate(0, -28) skewX(${(pose.cloakFlutterDeg * 0.52).toFixed(2)}) scale(${pose.cloakBillowX.toFixed(3)}, 1)`
          );
        }
        if (backArmRef.current) {
          backArmRef.current.setAttribute(
            'transform',
            `translate(-3.5, -25) rotate(${pose.backArmDeg.toFixed(2)})`
          );
        }
        if (headGroupRef.current) {
          headGroupRef.current.setAttribute(
            'transform',
            `translate(0, -31) rotate(${pose.headTiltDeg.toFixed(2)})`
          );
        }
        if (parasolArmRef.current) {
          parasolArmRef.current.setAttribute(
            'transform',
            `translate(2.5, -25) rotate(${pose.parasolArmDeg.toFixed(2)})`
          );
        }
        if (parasolGroupRef.current) {
          parasolGroupRef.current.setAttribute(
            'transform',
            `translate(-2.5, ${(-11 + pose.parasolBobY).toFixed(2)}) rotate(${pose.parasolTiltDeg.toFixed(2)})`
          );
        }

        // Subtle grounded footfall dust puffs when taking occasional ridge steps
        if (footDustGroupRef.current && footDustCircleARef.current && footDustCircleBRef.current) {
          if (pose.footDust && p > 0.85) {
            const fd = pose.footDust;
            const driftX = fd.age * 16;
            const driftY = -fd.age * 5;
            footDustGroupRef.current.setAttribute(
              'transform',
              `translate(${(fd.x + driftX).toFixed(1)}, ${(fd.y + driftY).toFixed(1)})`
            );
            footDustGroupRef.current.style.opacity = (fd.intensity * 0.65).toFixed(3);
            footDustCircleARef.current.setAttribute('rx', (4 + fd.age * 7).toFixed(1));
            footDustCircleARef.current.setAttribute('ry', (2 + fd.age * 3.2).toFixed(1));
            footDustCircleBRef.current.setAttribute('cx', (5 + fd.age * 8).toFixed(1));
            footDustCircleBRef.current.setAttribute('rx', (3 + fd.age * 5.5).toFixed(1));
            footDustCircleBRef.current.setAttribute('ry', (1.6 + fd.age * 2.4).toFixed(1));
          } else {
            footDustGroupRef.current.style.opacity = '0';
          }
        }
      },
    }));

    // Generous compact box covering full ridge walk excursion (867..909) + shadow
    const boxLeft = SCENE_BLEED_X + 800;
    const boxTop = SCENE_BLEED_Y + 748;

    return (
      <div
        ref={wrapperDivRef}
        className="pointer-events-none absolute"
        data-layer="traveler-figure"
        aria-hidden="true"
        style={{
          left: boxLeft,
          top: boxTop,
          width: 240,
          height: 150,
          visibility: 'hidden',
        }}
      >
        <svg viewBox="800 748 240 150" className="h-full w-full">
          <defs>
            <linearGradient
              id="solstice-traveler-shadow"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="35%"
            >
              <stop
                offset="0%"
                stopColor={DESERT_PALETTE.inkDark}
                stopOpacity="0.6"
              />
              <stop
                offset="65%"
                stopColor={DESERT_PALETTE.deepUmber}
                stopOpacity="0.32"
              />
              <stop
                offset="100%"
                stopColor={DESERT_PALETTE.deepUmber}
                stopOpacity="0"
              />
            </linearGradient>
            <linearGradient
              id="solstice-hat-rim"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#9D684F" stopOpacity="0.82" />
              <stop
                offset="52%"
                stopColor={DESERT_PALETTE.charcoalUmber}
                stopOpacity="1"
              />
              <stop
                offset="100%"
                stopColor={DESERT_PALETTE.inkDark}
                stopOpacity="1"
              />
            </linearGradient>
            {/* Vertical reveal clip in traveler local space (-38..38, -78..8) */}
            <clipPath id="solstice-traveler-reveal-clip">
              <rect
                ref={clipRectRef}
                x="-38"
                y="8"
                width="76"
                height="0"
              />
            </clipPath>
          </defs>

          {/* Grounded cast shadow tracking traveler's feet & stance */}
          <g
            ref={shadowGroupRef}
            transform={`translate(${TRAVELER_BASE_X}, ${TRAVELER_BASE_Y})`}
            style={{ opacity: 0 }}
          >
            <path
              d="M -5 0 L 71 15 L 81 19 L 55 18 L -10 3 Z"
              fill="url(#solstice-traveler-shadow)"
            />
          </g>

          {/* Tiny painterly sand dust puff rising on walking footsteps */}
          <g ref={footDustGroupRef} style={{ opacity: 0 }}>
            <ellipse
              ref={footDustCircleARef}
              cx="0"
              cy="0"
              rx="4"
              ry="2"
              fill="#EAD0B4"
            />
            <ellipse
              ref={footDustCircleBRef}
              cx="5"
              cy="-2"
              rx="3"
              ry="1.6"
              fill="#DFBA98"
            />
          </g>

          {/* Articulated nested-joint traveler rig anchored cleanly at feet (0, 0) */}
          <g
            ref={rootTranslateRef}
            transform={`translate(${TRAVELER_BASE_X}, ${TRAVELER_BASE_Y})`}
            clipPath="url(#solstice-traveler-reveal-clip)"
            style={{ opacity: 0 }}
          >
            {/* Back leg pivoting cleanly at hip (0, -16) */}
            <g ref={backLegRef} transform="translate(0, -16)">
              <path
                d="M -2.6 0 L -3.8 15.8 L -0.9 16.2 L 0.2 0 Z"
                fill={DESERT_PALETTE.inkDark}
              />
            </g>

            {/* Front leg pivoting cleanly at hip (0, -16) */}
            <g ref={frontLegRef} transform="translate(0, -16)">
              <path
                d="M 0.6 0 L 2.2 15.6 L 4.8 15.4 L 3.4 0 Z"
                fill={DESERT_PALETTE.inkDark}
              />
            </g>

            {/* Torso group pivoting at hip (0, -16) -> holds cloak, arms, head & parasol */}
            <g ref={torsoGroupRef} transform="translate(0, -16)">
              {/* Core upper tunic connecting seamlessly into legs */}
              <path
                d="M -4.2 -28 C -5.2 -18, -5.8 -8, -5.2 2 L 5.4 1.5 C 5.8 -8, 5.2 -18, 4.2 -28 Z"
                fill={DESERT_PALETTE.inkDark}
              />

              {/* Trailing cloak / robe fluttering with wind from shoulder pivot */}
              <g ref={cloakGroupRef} transform="translate(0, -28)">
                <path
                  d="M -4.2 0
                     C -7.6 8, -10.8 18, -11.4 27
                     C -9.2 28.6, -7.2 27.6, -6.2 37.5
                     C -2.4 38.8, 3.8 38.6, 6.8 37.2
                     C 7.5 27, 9.0 25, 10.9 23.8
                     C 9.6 13.8, 7.6 6, 4.5 0 Z"
                  fill={DESERT_PALETTE.inkDark}
                />
                {/* Warm sunlit rim catchlight along sun-facing left cloak edge */}
                <path
                  d="M -4.8 3 C -7.4 11, -9.2 18, -9.7 25"
                  stroke="#955F49"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  fill="none"
                  opacity="0.58"
                />
              </g>

              {/* Subtle balancing back arm pivoting at left shoulder */}
              <g ref={backArmRef} transform="translate(-3.5, -25)">
                <path
                  d="M 0 0 C -2.8 4.5, -4.4 9.5, -4.8 14.2"
                  stroke={DESERT_PALETTE.inkDark}
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  fill="none"
                />
              </g>

              {/* Head pivoting at neck (0, -31) */}
              <g ref={headGroupRef} transform="translate(0, -31)">
                <ellipse
                  cx="0"
                  cy="0"
                  rx="4.2"
                  ry="4.5"
                  fill={DESERT_PALETTE.inkDark}
                />
              </g>

              {/* Forward arm holding parasol shaft + nested conical parasol silhouette */}
              <g ref={parasolArmRef} transform="translate(2.5, -25)">
                <path
                  d="M 0 0 C 2.4 3.5, 3.4 7.5, 2.2 11.2"
                  stroke={DESERT_PALETTE.inkDark}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Delicate dark shaft connecting raised hand seamlessly up into parasol apex */}
                <line
                  x1="1.6"
                  y1="4"
                  x2="-2.2"
                  y2="-14"
                  stroke={DESERT_PALETTE.charcoalUmber}
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
                {/* Iconic wide conical parasol / hat canopy pivoting cleanly from shaft top */}
                <g ref={parasolGroupRef} transform="translate(-2.5, -11)">
                  <path
                    d="M -25.8 0.5
                       C -15.6 -3.6, -5.6 -9.6, 0 -12.6
                       C 5.9 -9.4, 15.8 -3.4, 26.2 1.1
                       C 16.6 3.5, 8.1 4.1, 0 3.9
                       C -8.6 3.7, -16.9 2.7, -25.8 0.5 Z"
                    fill="url(#solstice-hat-rim)"
                  />
                  {/* Delicate golden sunlit rim highlight along sun-facing left brim */}
                  <path
                    d="M -24.2 0 C -14.6 -3.6, -5.5 -9, -0.5 -11.7"
                    stroke="#DDA97E"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.7"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>
    );
  })
);

TravelerFigure.displayName = 'TravelerFigure';
