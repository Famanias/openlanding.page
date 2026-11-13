import { DEFAULT_DESIGN, DEFAULT_VIEW, PrintId, ViewState } from '../config';
import { normalizeOpening } from '../geometry';
import { DesignState, normalizeElevationDeg, normalizeMotifScale, normalizeYawDeg } from '../state';
import { harmonizeRoomPalette, HarmonizedRoomPalette, RoomFamilyId } from './paletteHarmonizer';
import { PRINT_TO_ROOM_FAMILY, ROOM_FAMILIES } from './sceneFamilies';

export interface RoomSpatialMetrics {
  spread: number; // 0..1 normalized fold openness driving floor rug & prop spacing
  stageDepth: number; // 0.9..1.25 subtle depth emphasis from camera elevation & openness
  cameraBiasX: number; // -1..1 parallax bias derived from view yawDeg (without fighting orbit drag)
  horizonLiftPx: number; // subtle vertical floor shift in px derived from camera elevationDeg
  motifRatio: number; // 0.5..2.0 normalized motif scale affecting architectural rhythm
}

export interface RoomSceneRecipe {
  family: RoomFamilyId;
  code: string;
  name: string;
  subtitle: string;
  palette: HarmonizedRoomPalette;
  spatial: RoomSpatialMetrics;
  decorVariant: string;
  lightingMode: string;
  transitionSignature: string;
}

export interface DeriveRoomSceneInput {
  design: Pick<DesignState, 'opening' | 'baseHex' | 'designHex' | 'print' | 'motifScale'>;
  view?: ViewState;
  hasUpload?: boolean;
}

/**
 * Pure deterministic function deriving the complete 2.5D room environment from the
 * single authoritative divider configuration. Zero randomness, zero DOM reads.
 */
export function deriveRoomScene(input: DeriveRoomSceneInput): RoomSceneRecipe {
  const printId: PrintId =
    input.design.print in PRINT_TO_ROOM_FAMILY
      ? input.design.print
      : DEFAULT_DESIGN.print;

  // If print === 'upload' or custom image active, always route cleanly to CuratedStudio
  const family: RoomFamilyId =
    printId === 'upload'
      ? 'curatedStudio'
      : PRINT_TO_ROOM_FAMILY[printId];

  const meta = ROOM_FAMILIES[family];
  const opening = normalizeOpening(input.design.opening);
  const spread = opening / 100;

  const motifScale = normalizeMotifScale(input.design.motifScale);
  const motifRatio = motifScale / 100;

  const view = input.view ?? DEFAULT_VIEW;
  const yawDeg = normalizeYawDeg(view.yawDeg);
  const elevDeg = normalizeElevationDeg(view.elevationDeg);

  // Bounded sin-based horizontal parallax hint across 360° yaw (gentle ±1.0 range)
  const yawRad = (yawDeg * Math.PI) / 180;
  const cameraBiasX = Math.sin(yawRad);

  // Slight elevation-linked horizon lift so divider feet and floor perspective remain anchored
  const elevNorm = (elevDeg - 18) / 12; // approx -1.08 .. +1.0
  const horizonLiftPx = Math.round(elevNorm * 14);
  const stageDepth = Number((0.94 + spread * 0.16 + Math.abs(elevNorm) * 0.06).toFixed(3));

  const palette = harmonizeRoomPalette(
    family,
    input.design.baseHex,
    input.design.designHex,
  );

  return {
    family,
    code: meta.code,
    name: meta.name,
    subtitle: meta.subtitle,
    palette,
    spatial: {
      spread,
      stageDepth,
      cameraBiasX,
      horizonLiftPx,
      motifRatio,
    },
    decorVariant: meta.decorVariant,
    lightingMode: meta.lightingMode,
    transitionSignature: meta.transitionSignature,
  };
}
