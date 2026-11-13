import type { PrintId } from '../config';
import type { RoomFamilyId } from './paletteHarmonizer';

export interface RoomFamilyMeta {
  id: RoomFamilyId;
  code: string;
  name: string;
  subtitle: string;
  decorVariant: string;
  lightingMode: string;
  transitionSignature: string;
}

export const PRINT_TO_ROOM_FAMILY: Record<PrintId, RoomFamilyId> = {
  bloom: 'botanicalAtelier',
  stripes: 'editorialLoft',
  landscape: 'panoramaSalon',
  waves: 'sculptedCoastalRoom',
  solid: 'architecturalShowroom',
  upload: 'curatedStudio',
};

export const ROOM_FAMILIES: Record<RoomFamilyId, RoomFamilyMeta> = {
  botanicalAtelier: {
    id: 'botanicalAtelier',
    code: 'ROOM 01',
    name: 'Botanical Atelier',
    subtitle: 'Soft plaster arch, sheer pleated scrim & ikebana vessel',
    decorVariant: 'arch-alcove-ikebana',
    lightingMode: 'Filtered afternoon sun through botanical leaves',
    transitionSignature: 'branch-path-draw-drape-unfurl',
  },
  editorialLoft: {
    id: 'editorialLoft',
    code: 'ROOM 02',
    name: 'Editorial Loft',
    subtitle: 'Linear architectural ribs, side-light blade & low gallery bench',
    decorVariant: 'vertical-ribs-blade-light',
    lightingMode: 'Crisp diagonal architectural side-light blade',
    transitionSignature: 'rib-fan-blade-sweep',
  },
  panoramaSalon: {
    id: 'panoramaSalon',
    code: 'ROOM 03',
    name: 'Panorama Salon',
    subtitle: 'Inset scenic paper niche, layered hill planes & oak ledge',
    decorVariant: 'framed-horizon-hills-ledge',
    lightingMode: 'Soft horizon glow over warm travertine stone',
    transitionSignature: 'panorama-parallax-mask-open',
  },
  sculptedCoastalRoom: {
    id: 'sculptedCoastalRoom',
    code: 'ROOM 04',
    name: 'Sculpted Coastal Room',
    subtitle: 'Undulating plaster relief, narrow arch & rounded plinth',
    decorVariant: 'scalloped-relief-rounded-plinth',
    lightingMode: 'Calm undulating coastal daylight wash',
    transitionSignature: 'spline-wave-relief-settle',
  },
  architecturalShowroom: {
    id: 'architecturalShowroom',
    code: 'ROOM 05',
    name: 'Architectural Showroom',
    subtitle: 'Honed monolith portal, stone plinth & tactile swatch sample',
    decorVariant: 'monolith-plinth-material-board',
    lightingMode: 'Focused gallery overhead wash & crisp floor shadow',
    transitionSignature: 'monolith-plane-slide',
  },
  curatedStudio: {
    id: 'curatedStudio',
    code: 'ROOM 06',
    name: 'Curated Studio',
    subtitle: 'Neutral tailored alcove harmonized to your artwork palette',
    decorVariant: 'tailored-alcove-plinth',
    lightingMode: 'Balanced neutral studio daylight',
    transitionSignature: 'tailored-alcove-reveal',
  },
};
