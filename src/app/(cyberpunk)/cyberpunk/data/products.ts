export type ProductCategory = 'shells' | 'bottoms' | 'gear';
export type SizeOption = 'S' | 'M' | 'L' | 'XL';
export type ColorwayOption = 'STEALTH BLACK' | 'OXIDE SLATE' | 'NEON NOIR';
export type CurrencyCode = 'USD' | 'JPY' | 'EUR';

export interface ProductSpec {
  id: number;
  code: string;
  title: string;
  category: ProductCategory;
  priceUsd: number;
  image: string;
  fallbackImageName: string;
  waterproofLabel: string;
  breathabilityLabel: string;
  weightLabel: string;
  waterproofRatingMm: number; // Numeric rating for sorting & telemetry bars
  breathabilityScore: number; // 0-100 normalized
  weightGrams: number; // Numeric weight in grams for sorting & bundle telemetry
  waterproofBarPct: number;
  breathabilityBarPct: number;
  weightBarPct: number;
  composition: string;
  stockBySize: Record<SizeOption, number>;
}

export interface HeroHotspot {
  id: string;
  number: string;
  title: string;
  code: string;
  priceUsd?: number;
  xPct: number;
  yPct: number;
  waterproofSpec: string;
  breathabilitySpec: string;
  membraneSpec: string;
  productId?: number;
}

export const CURRENCY_CONFIG: Record<CurrencyCode, { symbol: string; rate: number; label: string }> = {
  USD: { symbol: '$', rate: 1, label: 'USD $' },
  JPY: { symbol: '¥', rate: 154, label: 'JPY ¥' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR €' },
};

export const HERO_IMAGE_PATH = '/assets/aistudio/hero_1ea255fd.png';

export const HERO_HOTSPOTS: HeroHotspot[] = [
  {
    id: 'hotspot-01',
    number: '01',
    title: '01 // BALLISTIC RESPIRATOR & HUD VISOR',
    code: 'ACC-10B',
    priceUsd: 195,
    xPct: 68,
    yPct: 22,
    waterproofSpec: 'WINDSTOP / IPX6 SEAL',
    breathabilitySpec: 'DUAL HEPA-VALVE EXHAUST',
    membraneSpec: 'POLYCARBONATE ANTI-FOG + WINDSTOPPER®',
    productId: 10,
  },
  {
    id: 'hotspot-02',
    number: '02',
    title: '02 // 3L GORE-TEX® PRO STORM SHELL',
    code: 'JKT-01A',
    priceUsd: 680,
    xPct: 64,
    yPct: 40,
    waterproofSpec: '28,000mm HYDROSTATIC HEAD',
    breathabilitySpec: 'RET < 4.5 VAPOR FLUX',
    membraneSpec: '3-LAYER ePTFE + 200D CORDURA®',
    productId: 1,
  },
  {
    id: 'hotspot-03',
    number: '03',
    title: '03 // FIDLOCK® V-BUCKLE CHEST RIG',
    code: 'VST-03C',
    priceUsd: 460,
    xPct: 72,
    yPct: 52,
    waterproofSpec: '15,000mm DWR SHELL',
    breathabilitySpec: 'RET < 6.0 SPACER MESH',
    membraneSpec: '500D BALLISTIC LASER-CUT MOLLE',
    productId: 3,
  },
  {
    id: 'hotspot-04',
    number: '04',
    title: '04 // REFLECTIVE SEAM & AQUAGUARD® ZIPS',
    code: 'SPEC-04X',
    xPct: 78,
    yPct: 65,
    waterproofSpec: 'YKK® AQUAGUARD® MATTE',
    breathabilitySpec: '14MM ULTRASONIC WELDED TAPE',
    membraneSpec: '3M™ SCOTCHLITE™ 680 LUMEN PIPING',
    productId: 1,
  },
];

export const PRODUCTS: ProductSpec[] = [
  {
    id: 1,
    code: 'JKT-01A',
    title: 'Stealth 3L Gore-Tex Storm Shell',
    category: 'shells',
    priceUsd: 680,
    image: '/assets/aistudio/prod-01_b53ab8b2.png',
    fallbackImageName: 'prod-01.png',
    waterproofLabel: '28,000mm',
    breathabilityLabel: 'RET < 4.5',
    weightLabel: '640g',
    waterproofRatingMm: 28000,
    breathabilityScore: 95,
    weightGrams: 640,
    waterproofBarPct: 98,
    breathabilityBarPct: 94,
    weightBarPct: 56,
    composition: '3L ePTFE Membrane / 80D Micro-Ripstop Nylon',
    stockBySize: { S: 3, M: 5, L: 2, XL: 4 },
  },
  {
    id: 2,
    code: 'JKT-02B',
    title: 'Oxide Slate Modular Field Parka',
    category: 'shells',
    priceUsd: 740,
    image: '/assets/aistudio/prod-02_309a216d.png',
    fallbackImageName: 'prod-02.png',
    waterproofLabel: '28,000mm',
    breathabilityLabel: 'RET < 5.0',
    weightLabel: '820g',
    waterproofRatingMm: 28000,
    breathabilityScore: 90,
    weightGrams: 820,
    waterproofBarPct: 98,
    breathabilityBarPct: 88,
    weightBarPct: 72,
    composition: '3L Gore-Tex Pro / Detachable Storm Hood & Fidlock Array',
    stockBySize: { S: 2, M: 4, L: 3, XL: 1 },
  },
  {
    id: 3,
    code: 'VST-03C',
    title: 'Ballistic Utility Harness & Liner Vest',
    category: 'shells',
    priceUsd: 460,
    image: '/assets/aistudio/prod-03_349d3d07.png',
    fallbackImageName: 'prod-03.png',
    waterproofLabel: '15,000mm',
    breathabilityLabel: 'RET < 6.0',
    weightLabel: '590g',
    waterproofRatingMm: 15000,
    breathabilityScore: 82,
    weightGrams: 590,
    waterproofBarPct: 68,
    breathabilityBarPct: 82,
    weightBarPct: 52,
    composition: '500D Cordura® Ballistic / Primaloft® Gold Active Thermal Core',
    stockBySize: { S: 6, M: 3, L: 4, XL: 2 },
  },
  {
    id: 4,
    code: 'PNT-04A',
    title: 'Articulated Drop-Crotch Cargo Pant',
    category: 'bottoms',
    priceUsd: 420,
    image: '/assets/aistudio/prod-04_170fa82a.png',
    fallbackImageName: 'prod-04.png',
    waterproofLabel: '18,000mm',
    breathabilityLabel: 'RET < 5.5',
    weightLabel: '510g',
    waterproofRatingMm: 18000,
    breathabilityScore: 86,
    weightGrams: 510,
    waterproofBarPct: 75,
    breathabilityBarPct: 86,
    weightBarPct: 45,
    composition: 'Schoeller® Dryskin 4-Way Stretch / 3D Knee Gussets',
    stockBySize: { S: 4, M: 7, L: 3, XL: 5 },
  },
  {
    id: 5,
    code: 'PNT-05B',
    title: 'Cryo-Slate Weatherproof Shell Trouser',
    category: 'bottoms',
    priceUsd: 450,
    image: '/assets/aistudio/prod-05_c11603c5.png',
    fallbackImageName: 'prod-05.png',
    waterproofLabel: '28,000mm',
    breathabilityLabel: 'RET < 4.8',
    weightLabel: '480g',
    waterproofRatingMm: 28000,
    breathabilityScore: 92,
    weightGrams: 480,
    waterproofBarPct: 98,
    breathabilityBarPct: 91,
    weightBarPct: 42,
    composition: '3L ePTFE Taped Shell / Full-Length AquaGuard® Side Gussets',
    stockBySize: { S: 2, M: 5, L: 2, XL: 3 },
  },
  {
    id: 6,
    code: 'PNT-06C',
    title: 'Modular Kilt-Overlay Tactical Pant',
    category: 'bottoms',
    priceUsd: 490,
    image: '/assets/aistudio/prod-06_6d9a4d18.png',
    fallbackImageName: 'prod-06.png',
    waterproofLabel: '20,000mm',
    breathabilityLabel: 'RET < 6.2',
    weightLabel: '670g',
    waterproofRatingMm: 20000,
    breathabilityScore: 80,
    weightGrams: 670,
    waterproofBarPct: 80,
    breathabilityBarPct: 79,
    weightBarPct: 60,
    composition: 'Dyneema® Ripstop Kilt Apron / Cobra® Quick-Release Belt',
    stockBySize: { S: 3, M: 2, L: 4, XL: 2 },
  },
  {
    id: 7,
    code: 'BAG-07A',
    title: '3A-X-Pac® Messenger Stabilizer Sling',
    category: 'gear',
    priceUsd: 290,
    image: '/assets/aistudio/prod-07_d66d70d0.png',
    fallbackImageName: 'prod-07.png',
    waterproofLabel: '100% WP',
    breathabilityLabel: '14L CAP',
    weightLabel: '430g',
    waterproofRatingMm: 30000,
    breathabilityScore: 88,
    weightGrams: 430,
    waterproofBarPct: 100,
    breathabilityBarPct: 84,
    weightBarPct: 38,
    composition: 'VX21 X-Pac® Sailcloth / 3-Point Fidlock® Cross-Body Harness',
    stockBySize: { S: 8, M: 8, L: 6, XL: 6 },
  },
  {
    id: 8,
    code: 'BAG-08B',
    title: 'Hardshell Exo-Spine 24L Daypack',
    category: 'gear',
    priceUsd: 380,
    image: '/assets/aistudio/prof-08_1cd980b6.png',
    fallbackImageName: 'prod-08.png',
    waterproofLabel: '100% WP',
    breathabilityLabel: '24L CAP',
    weightLabel: '1120g',
    waterproofRatingMm: 30000,
    breathabilityScore: 85,
    weightGrams: 1120,
    waterproofBarPct: 100,
    breathabilityBarPct: 80,
    weightBarPct: 95,
    composition: 'Thermoformed Polycarbonate Dorsal Plate / 1000D Cordura®',
    stockBySize: { S: 4, M: 5, L: 3, XL: 4 },
  },
  {
    id: 9,
    code: 'FTW-09A',
    title: 'High-Top Boa® Vibram Exo-Boot',
    category: 'gear',
    priceUsd: 520,
    image: '/assets/aistudio/prod-09_5a47d632.png',
    fallbackImageName: 'prod-09.png',
    waterproofLabel: 'GORE-TEX',
    breathabilityLabel: 'BOA® LACE',
    weightLabel: '940g',
    waterproofRatingMm: 28000,
    breathabilityScore: 89,
    weightGrams: 940,
    waterproofBarPct: 96,
    breathabilityBarPct: 88,
    weightBarPct: 82,
    composition: 'BOA® M4 Steel Dial / Vibram® Arctic Grip Lug Sole',
    stockBySize: { S: 3, M: 4, L: 2, XL: 3 },
  },
  {
    id: 10,
    code: 'ACC-10B',
    title: 'Acoustic Storm Gaiter & Glove Kit',
    category: 'gear',
    priceUsd: 195,
    image: '/assets/aistudio/prod-10_6b125d50.png',
    fallbackImageName: 'prod-10.png',
    waterproofLabel: 'WINDSTOP',
    breathabilityLabel: 'CONDUCTIVE',
    weightLabel: '210g',
    waterproofRatingMm: 16000,
    breathabilityScore: 94,
    weightGrams: 210,
    waterproofBarPct: 72,
    breathabilityBarPct: 94,
    weightBarPct: 22,
    composition: 'Gore-Tex Infinium™ Windstopper / Capacitive Thumb & Index Tips',
    stockBySize: { S: 9, M: 6, L: 5, XL: 4 },
  },
];
