'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFold } from '../FoldProvider';
import { deriveRoomScene } from './deriveRoomScene';
import type { RoomFamilyId } from './paletteHarmonizer';
import { ArchitecturalShowroom } from './layers/ArchitecturalShowroom';
import { BotanicalAtelier } from './layers/BotanicalAtelier';
import { CuratedStudio } from './layers/CuratedStudio';
import { EditorialLoft } from './layers/EditorialLoft';
import { PanoramaSalon } from './layers/PanoramaSalon';
import { SculptedCoastalRoom } from './layers/SculptedCoastalRoom';

interface RoomSlot {
  family: RoomFamilyId;
  key: number;
}

interface RoomScene2D5Props {
  pointerOffset?: { x: number; y: number };
}

function renderFamilyLayer(family: RoomFamilyId, motifRatio: number): React.ReactNode {
  switch (family) {
    case 'botanicalAtelier':
      return <BotanicalAtelier />;
    case 'editorialLoft':
      return <EditorialLoft motifRatio={motifRatio} />;
    case 'panoramaSalon':
      return <PanoramaSalon />;
    case 'sculptedCoastalRoom':
      return <SculptedCoastalRoom />;
    case 'architecturalShowroom':
      return <ArchitecturalShowroom />;
    case 'curatedStudio':
    default:
      return <CuratedStudio />;
  }
}

export const RoomScene2D5: React.FC<RoomScene2D5Props> = ({
  pointerOffset = { x: 0, y: 0 },
}) => {
  const {
    design,
    view,
    env,
    effectiveOpening,
    uploadedArt,
    subscribeChainFrame,
    getLiveChainFrame,
  } = useFold();

  const recipe = useMemo(
    () =>
      deriveRoomScene({
        design: {
          ...design,
          opening: effectiveOpening,
        },
        view,
        hasUpload: Boolean(uploadedArt),
      }),
    [design, effectiveOpening, view, uploadedArt],
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keySeqRef = useRef(1);

  const [activeSlot, setActiveSlot] = useState<RoomSlot>({
    family: recipe.family,
    key: 1,
  });
  const [exitingSlot, setExitingSlot] = useState<RoomSlot | null>(null);

  // Interruptible latest-input-wins architectural room family transitions
  useEffect(() => {
    if (recipe.family === activeSlot.family) return;

    if (exitTimerRef.current) {
      clearTimeout(exitTimerRef.current);
      exitTimerRef.current = null;
    }

    const nextKey = ++keySeqRef.current;

    if (env.reducedMotion) {
      setExitingSlot(null);
      setActiveSlot({ family: recipe.family, key: nextKey });
      return;
    }

    setExitingSlot(activeSlot);
    setActiveSlot({ family: recipe.family, key: nextKey });

    exitTimerRef.current = setTimeout(() => {
      setExitingSlot(null);
      exitTimerRef.current = null;
    }, 620);
  }, [recipe.family, activeSlot, env.reducedMotion]);

  useEffect(() => {
    return () => {
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
      }
    };
  }, []);

  // Synchronize live 60Hz accordion chain opening to spatial --room-spread without re-rendering React
  useEffect(() => {
    const syncSpread = (openingPct: number) => {
      if (!rootRef.current) return;
      const spreadVal = Math.max(0, Math.min(1, openingPct / 100));
      rootRef.current.style.setProperty('--room-spread', spreadVal.toFixed(4));
    };

    const current = getLiveChainFrame();
    syncSpread(current ? current.averageOpening : effectiveOpening);

    return subscribeChainFrame((frame) => {
      syncSpread(frame ? frame.averageOpening : effectiveOpening);
    });
  }, [effectiveOpening, getLiveChainFrame, subscribeChainFrame]);

  const combinedBiasX = env.reducedMotion
    ? 0
    : Math.max(-1.25, Math.min(1.25, recipe.spatial.cameraBiasX + pointerOffset.x * 0.35));

  const cssVars = {
    '--room-spread': recipe.spatial.spread.toFixed(4),
    '--room-bias-x': combinedBiasX.toFixed(4),
    '--room-horizon-lift': env.reducedMotion ? '0px' : `${recipe.spatial.horizonLiftPx}px`,
    '--room-motif': recipe.spatial.motifRatio.toFixed(3),
  } as React.CSSProperties;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      data-testid="room-scene-2d5"
      data-room-family={recipe.family}
      data-room-code={recipe.code}
      data-dark-envelope={recipe.palette.isDarkEnvelope ? 'true' : 'false'}
      style={cssVars}
      className="srf-room-stage pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    >
      {/* Subtle architectural plaster grain texture across the room */}
      <div className="srf-room-plaster-grain absolute inset-0 z-20 pointer-events-none" />

      {/* At most ONE exiting architectural layer during rapid switches (zero ghost stacking) */}
      {exitingSlot && (
        <div
          key={`exit-${exitingSlot.family}-${exitingSlot.key}`}
          className="srf-room-slot srf-room-exiting absolute inset-0 z-10"
        >
          {renderFamilyLayer(exitingSlot.family, recipe.spatial.motifRatio)}
        </div>
      )}

      {/* Active architectural layer */}
      <div
        key={`active-${activeSlot.family}-${activeSlot.key}`}
        className={`srf-room-slot ${
          activeSlot.key === 1 ? 'srf-room-initial-enter' : 'srf-room-entering'
        } absolute inset-0 z-10`}
      >
        {renderFamilyLayer(activeSlot.family, recipe.spatial.motifRatio)}
      </div>
    </div>
  );
};
