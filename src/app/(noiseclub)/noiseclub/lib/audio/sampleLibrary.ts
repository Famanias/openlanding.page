export type SpecimenId = 'subway' | 'espresso' | 'rain' | 'footsteps' | 'coin';

export interface SampleSlice {
  index: number;
  code: string;
  label: string;
  role: 'LOW IMPACT' | 'TRANSIENT SNAP' | 'TEXTURE PULSE' | 'TONAL TAIL';
  startRatio: number;
  endRatio: number;
  po33Slot: string;
}

export interface SoundSpecimenData {
  id: SpecimenId;
  catalogId: string;
  fieldNote: string;
  title: string;
  subtitle: string;
  location: string;
  durationSec: number;
  durationLabel: string;
  sampleRateLabel: string;
  po33Bank: 'MELODIC [01-08]' | 'DRUM KIT [09-16]';
  po33SlotNumber: number;
  peakDb: string;
  description: string;
  captureMethod: string;
  slices: [SampleSlice, SampleSlice, SampleSlice, SampleSlice];
  defaultPattern: boolean[][]; // 4 tracks x 16 steps
}

export const SOUND_SPECIMENS: SoundSpecimenData[] = [
  {
    id: 'subway',
    catalogId: 'NC—001 / SPECIMEN 01',
    fieldNote: 'FIELD NOTE / 033-A',
    title: 'Subway Door Pneumatic',
    subtitle: 'Compressed air release & steel latch impact',
    location: 'Line U8 Platform, Alexanderplatz · 02:14',
    durationSec: 1.6,
    durationLabel: '00:01.60',
    sampleRateLabel: '24.0 kHz / 8-BIT',
    po33Bank: 'DRUM KIT [09-16]',
    po33SlotNumber: 9,
    peakDb: '-1.4 dBFS',
    description:
      'A dual-stage mechanical transient: a sharp solenoid latch click followed by a dense pressurized air burst and rubber seal thud.',
    captureMethod: 'PO-33 Built-in Knowels Electret Mic · 18cm distance',
    slices: [
      {
        index: 0,
        code: 'SLICE 01',
        label: 'Rubber Seal Thud',
        role: 'LOW IMPACT',
        startRatio: 0.0,
        endRatio: 0.24,
        po33Slot: 'SLOT 09 · PAD 01',
      },
      {
        index: 1,
        code: 'SLICE 02',
        label: 'Solenoid Latch Snap',
        role: 'TRANSIENT SNAP',
        startRatio: 0.24,
        endRatio: 0.48,
        po33Slot: 'SLOT 09 · PAD 05',
      },
      {
        index: 2,
        code: 'SLICE 03',
        label: 'Pneumatic Air Hiss',
        role: 'TEXTURE PULSE',
        startRatio: 0.48,
        endRatio: 0.76,
        po33Slot: 'SLOT 09 · PAD 09',
      },
      {
        index: 3,
        code: 'SLICE 04',
        label: 'Steel Frame Ring',
        role: 'TONAL TAIL',
        startRatio: 0.76,
        endRatio: 1.0,
        po33Slot: 'SLOT 09 · PAD 13',
      },
    ],
    defaultPattern: [
      [true, false, false, false, true, false, false, false, true, false, false, true, false, false, true, false],
      [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, true],
      [false, false, true, false, false, false, true, true, false, false, true, false, false, false, true, false],
      [true, false, false, false, false, false, true, false, false, true, false, false, false, false, false, true],
    ],
  },
  {
    id: 'espresso',
    catalogId: 'NC—001 / SPECIMEN 02',
    fieldNote: 'FIELD NOTE / 033-B',
    title: 'Ceramic Cup & Spoon',
    subtitle: 'Thick porcelain rim strike & harmonic ring',
    location: 'Kottbusser Tor Corner Bar · 09:42',
    durationSec: 1.4,
    durationLabel: '00:01.40',
    sampleRateLabel: '24.0 kHz / 8-BIT',
    po33Bank: 'MELODIC [01-08]',
    po33SlotNumber: 2,
    peakDb: '-2.1 dBFS',
    description:
      'High-pitched porcelain resonance with a woody zinc countertop knock underneath. Chromatically playable across 16 keys in Melodic Bank.',
    captureMethod: 'PO-33 Built-in Mic · Countertop contact proximity',
    slices: [
      {
        index: 0,
        code: 'SLICE 01',
        label: 'Saucer Base Thump',
        role: 'LOW IMPACT',
        startRatio: 0.0,
        endRatio: 0.22,
        po33Slot: 'SLOT 02 · KEY C3',
      },
      {
        index: 1,
        code: 'SLICE 02',
        label: 'Stainless Rim Clink',
        role: 'TRANSIENT SNAP',
        startRatio: 0.22,
        endRatio: 0.46,
        po33Slot: 'SLOT 02 · KEY E3',
      },
      {
        index: 2,
        code: 'SLICE 03',
        label: 'Steam Wand Burst',
        role: 'TEXTURE PULSE',
        startRatio: 0.46,
        endRatio: 0.74,
        po33Slot: 'SLOT 02 · KEY G3',
      },
      {
        index: 3,
        code: 'SLICE 04',
        label: 'Porcelain Bell Decay',
        role: 'TONAL TAIL',
        startRatio: 0.74,
        endRatio: 1.0,
        po33Slot: 'SLOT 02 · KEY B3',
      },
    ],
    defaultPattern: [
      [true, false, false, true, false, false, true, false, true, false, false, false, true, false, false, false],
      [false, false, true, false, true, false, false, false, false, false, true, false, true, false, true, false],
      [true, true, false, true, true, false, true, true, true, true, false, true, true, false, true, false],
      [false, false, false, true, false, false, false, true, false, false, true, false, false, false, false, true],
    ],
  },
  {
    id: 'rain',
    catalogId: 'NC—001 / SPECIMEN 03',
    fieldNote: 'FIELD NOTE / 033-C',
    title: 'Rain on Corrugated Zinc',
    subtitle: 'Heavy storm droplets striking hollow metal awning',
    location: 'Freight Courtyard, Kanalstraße · 19:08',
    durationSec: 1.8,
    durationLabel: '00:01.80',
    sampleRateLabel: '24.0 kHz / 8-BIT',
    po33Bank: 'DRUM KIT [09-16]',
    po33SlotNumber: 12,
    peakDb: '-1.8 dBFS',
    description:
      'Dense natural vinyl-crackle substitute combined with hollow metallic pings that slice cleanly into micro-percussion hats and shakers.',
    captureMethod: 'PO-33 3.5mm Line-In via Contact Piezo Disc',
    slices: [
      {
        index: 0,
        code: 'SLICE 01',
        label: 'Gutter Downspout Boom',
        role: 'LOW IMPACT',
        startRatio: 0.0,
        endRatio: 0.25,
        po33Slot: 'SLOT 12 · PAD 02',
      },
      {
        index: 1,
        code: 'SLICE 02',
        label: 'Direct Zinc Drop Ping',
        role: 'TRANSIENT SNAP',
        startRatio: 0.25,
        endRatio: 0.50,
        po33Slot: 'SLOT 12 · PAD 06',
      },
      {
        index: 2,
        code: 'SLICE 03',
        label: 'Sheet Wash Shimmer',
        role: 'TEXTURE PULSE',
        startRatio: 0.50,
        endRatio: 0.78,
        po33Slot: 'SLOT 12 · PAD 10',
      },
      {
        index: 3,
        code: 'SLICE 04',
        label: 'Hollow Awning Resonance',
        role: 'TONAL TAIL',
        startRatio: 0.78,
        endRatio: 1.0,
        po33Slot: 'SLOT 12 · PAD 14',
      },
    ],
    defaultPattern: [
      [true, false, false, false, false, false, true, false, true, false, false, false, false, true, false, false],
      [false, false, false, false, true, false, false, true, false, false, false, false, true, false, false, false],
      [true, false, true, true, false, true, true, false, true, false, true, true, false, true, true, true],
      [false, true, false, false, false, false, false, true, false, false, true, false, false, false, true, false],
    ],
  },
  {
    id: 'footsteps',
    catalogId: 'NC—001 / SPECIMEN 04',
    fieldNote: 'FIELD NOTE / 033-D',
    title: 'Concrete Stairwell Step',
    subtitle: 'Heavy rubber heel impact & grit scrape in Brutalist shaft',
    location: 'Parking Structure B, Level -3 · 23:51',
    durationSec: 1.5,
    durationLabel: '00:01.50',
    sampleRateLabel: '24.0 kHz / 8-BIT',
    po33Bank: 'DRUM KIT [09-16]',
    po33SlotNumber: 14,
    peakDb: '-0.9 dBFS',
    description:
      'Natural concrete chamber compression turns an ordinary boot stomp into a cavernous 90s boom-bap kick and gritty snare tail.',
    captureMethod: 'PO-33 Built-in Mic · Stairwell landing floor placement',
    slices: [
      {
        index: 0,
        code: 'SLICE 01',
        label: 'Sub-Concrete Heel Stomp',
        role: 'LOW IMPACT',
        startRatio: 0.0,
        endRatio: 0.26,
        po33Slot: 'SLOT 14 · PAD 01',
      },
      {
        index: 1,
        code: 'SLICE 02',
        label: 'Gravel Sole Crunch',
        role: 'TRANSIENT SNAP',
        startRatio: 0.26,
        endRatio: 0.52,
        po33Slot: 'SLOT 14 · PAD 04',
      },
      {
        index: 2,
        code: 'SLICE 03',
        label: 'Grit Sole Drag',
        role: 'TEXTURE PULSE',
        startRatio: 0.52,
        endRatio: 0.77,
        po33Slot: 'SLOT 14 · PAD 08',
      },
      {
        index: 3,
        code: 'SLICE 04',
        label: 'Shaft Slapback Echo',
        role: 'TONAL TAIL',
        startRatio: 0.77,
        endRatio: 1.0,
        po33Slot: 'SLOT 14 · PAD 16',
      },
    ],
    defaultPattern: [
      [true, false, false, false, false, false, false, true, true, false, true, false, false, false, false, false],
      [false, false, false, false, true, false, false, false, false, false, false, false, true, false, false, false],
      [false, true, true, false, false, true, false, false, false, true, true, false, false, true, true, false],
      [false, false, false, false, false, false, true, false, false, false, false, false, false, false, false, true],
    ],
  },
  {
    id: 'coin',
    catalogId: 'NC—001 / SPECIMEN 05',
    fieldNote: 'FIELD NOTE / 033-E',
    title: 'Dropped Brass Coin Spin',
    subtitle: 'Accelerating Euler’s disk oscillation on steel plate',
    location: 'Automat Ticket Kiosk, Warschauer Str. · 01:19',
    durationSec: 1.7,
    durationLabel: '00:01.70',
    sampleRateLabel: '24.0 kHz / 8-BIT',
    po33Bank: 'MELODIC [01-08]',
    po33SlotNumber: 5,
    peakDb: '-1.6 dBFS',
    description:
      'Starts with a sharp brass edge strike and accelerates into a pitched metallic trill before settling flat.',
    captureMethod: 'PO-33 Built-in Mic · 10cm above steel ticket tray',
    slices: [
      {
        index: 0,
        code: 'SLICE 01',
        label: 'Tray Impact Thud',
        role: 'LOW IMPACT',
        startRatio: 0.0,
        endRatio: 0.23,
        po33Slot: 'SLOT 05 · KEY C3',
      },
      {
        index: 1,
        code: 'SLICE 02',
        label: 'Brass Edge Strike',
        role: 'TRANSIENT SNAP',
        startRatio: 0.23,
        endRatio: 0.47,
        po33Slot: 'SLOT 05 · KEY F3',
      },
      {
        index: 2,
        code: 'SLICE 03',
        label: 'Accelerating Spin Wobble',
        role: 'TEXTURE PULSE',
        startRatio: 0.47,
        endRatio: 0.76,
        po33Slot: 'SLOT 05 · KEY G#3',
      },
      {
        index: 3,
        code: 'SLICE 04',
        label: 'High-Frequency Shudder',
        role: 'TONAL TAIL',
        startRatio: 0.76,
        endRatio: 1.0,
        po33Slot: 'SLOT 05 · KEY C4',
      },
    ],
    defaultPattern: [
      [true, false, false, false, true, false, false, false, true, false, false, false, true, false, true, false],
      [false, false, true, false, false, false, true, false, false, false, true, false, false, true, false, true],
      [false, true, false, true, false, true, false, true, false, true, false, true, false, false, true, false],
      [true, false, false, false, false, false, false, true, false, false, false, true, false, false, false, false],
    ],
  },
];

export const SPECIMEN_MAP: Record<SpecimenId, SoundSpecimenData> = SOUND_SPECIMENS.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<SpecimenId, SoundSpecimenData>
);
