import {
  CURRENCY_CONFIG,
  ColorwayOption,
  CurrencyCode,
  ProductCategory,
  ProductSpec,
  SizeOption,
} from '../data/products';

export type FilterCategory = 'all' | ProductCategory;
export type SortOption = 'PRICE: LOW-HIGH' | 'WEIGHT: LIGHTEST' | 'WATERPROOF RATING';
export type FitPreference = 'ARTICULATED TACTICAL' | 'OVERSIZED SHELL';

export interface CartItem {
  key: string; // `${productId}-${size}-${colorway}-${isBundle ? 'bundle' : 'std'}`
  product: ProductSpec;
  size: SizeOption;
  colorway: ColorwayOption;
  quantity: number;
  isBundleDiscounted?: boolean; // 15% off from Loadout Builder
}

export function convertCurrency(usdAmount: number, currency: CurrencyCode): number {
  const rate = CURRENCY_CONFIG[currency].rate;
  return Math.round(usdAmount * rate);
}

export function formatPrice(usdAmount: number, currency: CurrencyCode): string {
  const { symbol } = CURRENCY_CONFIG[currency];
  const converted = convertCurrency(usdAmount, currency);
  return `${symbol}${converted.toLocaleString('en-US')}`;
}

export function getVariantSku(code: string, colorway: ColorwayOption, size: SizeOption): string {
  const colorCode =
    colorway === 'STEALTH BLACK' ? 'BLK' : colorway === 'OXIDE SLATE' ? 'OXD' : 'NNR';
  return `${code}-${colorCode}-${size}`;
}

export function filterAndSortProducts(
  products: ProductSpec[],
  category: FilterCategory,
  sortBy: SortOption
): ProductSpec[] {
  const filtered =
    category === 'all' ? [...products] : products.filter((p) => p.category === category);

  return filtered.sort((a, b) => {
    if (sortBy === 'PRICE: LOW-HIGH') {
      return a.priceUsd - b.priceUsd;
    }
    if (sortBy === 'WEIGHT: LIGHTEST') {
      return a.weightGrams - b.weightGrams;
    }
    if (sortBy === 'WATERPROOF RATING') {
      return b.waterproofRatingMm - a.waterproofRatingMm;
    }
    return 0;
  });
}

export interface BundleTelemetry {
  totalMassKg: string;
  totalMassGrams: number;
  combinedWaterproofMm: string;
  baseSubtotalUsd: number;
  discountAmountUsd: number;
  finalBundlePriceUsd: number;
}

export function calculateBundleTelemetry(
  shell: ProductSpec,
  bottom: ProductSpec,
  gear: ProductSpec
): BundleTelemetry {
  const totalMassGrams = shell.weightGrams + bottom.weightGrams + gear.weightGrams;
  const totalMassKg = (totalMassGrams / 1000).toFixed(2);
  const avgWp = Math.round(
    (shell.waterproofRatingMm + bottom.waterproofRatingMm + gear.waterproofRatingMm) / 3
  );
  const baseSubtotalUsd = shell.priceUsd + bottom.priceUsd + gear.priceUsd;
  const discountAmountUsd = Math.round(baseSubtotalUsd * 0.15 * 100) / 100;
  const finalBundlePriceUsd = Math.round((baseSubtotalUsd - discountAmountUsd) * 100) / 100;

  return {
    totalMassKg,
    totalMassGrams,
    combinedWaterproofMm: `${avgWp.toLocaleString('en-US')}mm AVG`,
    baseSubtotalUsd,
    discountAmountUsd,
    finalBundlePriceUsd,
  };
}

export interface BiometricFitResult {
  recommendedSize: SizeOption;
  chestSpecCm: number;
  sleeveSpecCm: number;
  inseamSpecCm: number;
  summaryText: string;
}

export function calculateBiometricFit(
  heightCm: number,
  massKg: number,
  chestCm: number,
  preference: FitPreference
): BiometricFitResult {
  // Composite index combining chest expansion, height, and mass
  const baseIndex =
    (chestCm - 85) * 1.35 + (heightCm - 155) * 0.65 + (massKg - 45) * 0.55;
  const adjustedIndex =
    preference === 'OVERSIZED SHELL' ? baseIndex + 16 : baseIndex;

  let recommendedSize: SizeOption = 'M';
  let chestSpecCm = 108;
  let sleeveSpecCm = 86;
  let inseamSpecCm = 79;

  if (adjustedIndex < 32) {
    recommendedSize = 'S';
    chestSpecCm = 102;
    sleeveSpecCm = 83;
    inseamSpecCm = 76;
  } else if (adjustedIndex < 62) {
    recommendedSize = 'M';
    chestSpecCm = 108;
    sleeveSpecCm = 86;
    inseamSpecCm = 79;
  } else if (adjustedIndex < 92) {
    recommendedSize = 'L';
    chestSpecCm = 114;
    sleeveSpecCm = 89;
    inseamSpecCm = 82;
  } else {
    recommendedSize = 'XL';
    chestSpecCm = 122;
    sleeveSpecCm = 92;
    inseamSpecCm = 85;
  }

  return {
    recommendedSize,
    chestSpecCm,
    sleeveSpecCm,
    inseamSpecCm,
    summaryText: `RECOMMENDED SPEC: SIZE ${recommendedSize} // CHEST ${chestSpecCm}CM // SLEEVE ${sleeveSpecCm}CM`,
  };
}

export interface CartTotals {
  itemCount: number;
  totalWeightGrams: number;
  totalWeightKg: string;
  rawSubtotalUsd: number;
  bundleDiscountUsd: number;
  promoDiscountUsd: number;
  finalTotalUsd: number;
  freeShippingProgressPct: number;
  amountToFreeShippingUsd: number;
  isFreeShippingUnlocked: boolean;
  promoValid: boolean;
}

export const FREE_SHIPPING_THRESHOLD_USD = 800;

export function calculateCartTotals(items: CartItem[], promoCode: string): CartTotals {
  let itemCount = 0;
  let totalWeightGrams = 0;
  let rawSubtotalUsd = 0;
  let bundleDiscountUsd = 0;

  for (const item of items) {
    itemCount += item.quantity;
    totalWeightGrams += item.product.weightGrams * item.quantity;
    const lineRaw = item.product.priceUsd * item.quantity;
    rawSubtotalUsd += lineRaw;
    if (item.isBundleDiscounted) {
      bundleDiscountUsd += lineRaw * 0.15;
    }
  }

  bundleDiscountUsd = Math.round(bundleDiscountUsd * 100) / 100;
  const afterBundleUsd = Math.max(0, rawSubtotalUsd - bundleDiscountUsd);

  const normalizedPromo = promoCode.trim().toUpperCase();
  const promoValid = normalizedPromo === 'CYBER26' || normalizedPromo === 'ARCHIVE10';
  const promoDiscountUsd = promoValid ? Math.round(afterBundleUsd * 0.1 * 100) / 100 : 0;

  const finalTotalUsd = Math.round(Math.max(0, afterBundleUsd - promoDiscountUsd) * 100) / 100;
  const freeShippingProgressPct = Math.min(
    100,
    Math.round((finalTotalUsd / FREE_SHIPPING_THRESHOLD_USD) * 100)
  );
  const amountToFreeShippingUsd = Math.max(
    0,
    Math.round((FREE_SHIPPING_THRESHOLD_USD - finalTotalUsd) * 100) / 100
  );

  return {
    itemCount,
    totalWeightGrams,
    totalWeightKg: (totalWeightGrams / 1000).toFixed(2),
    rawSubtotalUsd,
    bundleDiscountUsd,
    promoDiscountUsd,
    finalTotalUsd,
    freeShippingProgressPct,
    amountToFreeShippingUsd,
    isFreeShippingUnlocked: finalTotalUsd >= FREE_SHIPPING_THRESHOLD_USD,
    promoValid,
  };
}

export interface NfcVerificationResult {
  valid: boolean;
  code: string;
  message: string;
  batchId: string;
  timestamp: string;
}

export function verifyNfcChipCode(input: string, products: ProductSpec[]): NfcVerificationResult {
  const cleaned = input.trim().toUpperCase();
  if (!cleaned) {
    return {
      valid: false,
      code: 'NULL',
      message: 'ERROR // NO SERIAL CODE DETECTED IN NFC BUFFER',
      batchId: 'N/A',
      timestamp: new Date().toISOString(),
    };
  }

  const matchedProduct = products.find(
    (p) => p.code.toUpperCase() === cleaned || cleaned.startsWith(p.code.toUpperCase())
  );
  const isKnxCode = /^KNX-[A-Z0-9-]{3,}$/.test(cleaned);

  if (matchedProduct || isKnxCode) {
    const unitLabel = matchedProduct ? `${matchedProduct.code} (${matchedProduct.title})` : cleaned;
    return {
      valid: true,
      code: cleaned,
      message: `AUTHENTICATED // GENUINE KINETIX ARCHIVE UNIT — BATCH FW26 [${unitLabel}]`,
      batchId: 'KNX-2026-09-FW26',
      timestamp: new Date().toISOString(),
    };
  }

  // Per spec: "An input box where users can type any product code (e.g., JKT-01A or KNX-8849) and click [VERIFY CHIP] to run a 1.5s cryptographic scan animation returning AUTHENTICATED // GENUINE KINETIX ARCHIVE UNIT — BATCH FW26"
  if (cleaned.length >= 4) {
    return {
      valid: true,
      code: cleaned,
      message: `AUTHENTICATED // GENUINE KINETIX ARCHIVE UNIT — BATCH FW26 [${cleaned}]`,
      batchId: 'KNX-2026-09-FW26',
      timestamp: new Date().toISOString(),
    };
  }

  return {
    valid: false,
    code: cleaned,
    message: 'UNRECOGNIZED SIGNATURE // ENTER VALID SERIAL (E.G. JKT-01A OR KNX-8849)',
    batchId: 'ERR-00',
    timestamp: new Date().toISOString(),
  };
}

export function generateTrackingHash(seed = Date.now()): string {
  const hex = ((seed * 2654435761) >>> 0).toString(16).toUpperCase().padStart(8, '0');
  return `0xKNX-FW26-${hex}-SEC09`;
}

export type HologramCameraZone =
  | 'FULL RIG'
  | 'UPPER SHELL'
  | 'LOWER RIG'
  | 'CARRY / FOOTWEAR';

export interface AuxPlaneTransform {
  position: [number, number, number];
  rotationY: number;
  anchorPoint: [number, number, number];
}

export interface CameraPose {
  position: [number, number, number];
  target: [number, number, number];
  readout: string;
}

export function getAuxPlaneTransform(productCode: string): AuxPlaneTransform {
  const code = productCode.trim().toUpperCase();
  if (code.startsWith('FTW-09A') || code.startsWith('FTW')) {
    return {
      position: [0.95, -1.55, 0.45],
      rotationY: 0,
      anchorPoint: [0.22, -1.75, -0.25],
    };
  }
  if (code.startsWith('ACC-10B') || code.startsWith('ACC')) {
    return {
      position: [-0.95, 1.25, 0.45],
      rotationY: 0,
      anchorPoint: [-0.08, 1.38, -0.25],
    };
  }
  // Default: BAG-07A or BAG-08B at upper-right shoulder offset tilted -12deg on Y-axis
  return {
    position: [1.05, 0.65, 0.45],
    rotationY: (-12 * Math.PI) / 180,
    anchorPoint: [0.28, 0.85, -0.25],
  };
}

export function getCameraPoseForZone(
  zone: HologramCameraZone,
  auxProductCode: string
): CameraPose {
  if (zone === 'UPPER SHELL') {
    return {
      position: [-0.35, 0.85, 3.1],
      target: [0, 0.8, 0],
      readout: 'ZONE: UPPER SHELL // 3D LOCK',
    };
  }
  if (zone === 'LOWER RIG') {
    return {
      position: [0.35, -0.9, 3.1],
      target: [0, -0.9, 0],
      readout: 'ZONE: LOWER RIG // 3D LOCK',
    };
  }
  if (zone === 'CARRY / FOOTWEAR') {
    const aux = getAuxPlaneTransform(auxProductCode);
    const [ax, ay, az] = aux.position;
    const camX = ax >= 0 ? ax + 0.25 : ax - 0.25;
    return {
      position: [camX, ay, 2.85],
      target: [ax * 0.85, ay, az * 0.5],
      readout: 'ZONE: CARRY & AUX // 3D LOCK',
    };
  }
  return {
    position: [0, 0.0, 5.2],
    target: [0, -0.05, 0],
    readout: 'ZONE: FULL RIG // OVERVIEW',
  };
}

export type FabricWeatherMode = 'TYPHOON' | 'GALE' | 'VAPOR';
export type FabricFocusLayer = null | 1 | 2 | 3;

export interface FabricCameraPose {
  position: [number, number, number];
  target: [number, number, number];
  readout: string;
}

/**
 * Computes vertical distance between adjacent 3D fabric slabs.
 * At 65% default slider, gap is 0.60 units (per spec).
 * Scales smoothly from 0.14 (0% laminated seal) to 0.88 (100% full exploded CAD).
 */
export function getFabricSlabGap(explodePct: number): number {
  const clamped = Math.max(0, Math.min(100, explodePct));
  // At clamped = 65, 0.145 + (65 / 100) * 0.70 = 0.60
  return Number((0.145 + (clamped / 100) * 0.7).toFixed(3));
}

/**
 * Returns target opacity [layer1, layer2, layer3] based on focused card.
 * When a specific layer is focused, non-focused layers dim to 15% opacity (0.15).
 */
export function getFabricLayerOpacities(focus: FabricFocusLayer): [number, number, number] {
  if (focus === 1) return [1.0, 0.15, 0.15];
  if (focus === 2) return [0.15, 1.0, 0.15];
  if (focus === 3) return [0.15, 0.15, 1.0];
  return [1.0, 1.0, 1.0];
}

/**
 * Computes the 3D camera position and target for the Fabric Lab based on focused layer and current slab gap.
 */
export function getFabricCameraPose(
  focus: FabricFocusLayer,
  explodePct: number
): FabricCameraPose {
  const gap = getFabricSlabGap(explodePct);
  if (focus === 1) {
    // Macro grazing angle over Layer 01 (200D Ballistic Cordura + rain shockwaves)
    return {
      position: [1.55, gap + 0.62, 2.05],
      target: [0, gap + 0.04, 0],
      readout: 'OPTICAL LOCK: L01 // 200D BALLISTIC CORDURA® (GRAZING MACRO)',
    };
  }
  if (focus === 2) {
    // 5000x macro view diving between the slabs to frame Layer 02 ePTFE lattice
    return {
      position: [1.35, 0.12, 1.75],
      target: [0, 0.0, 0],
      readout: 'OPTICAL LOCK: L02 // ePTFE VORONOI LATTICE (5000X INTER-SLAB)',
    };
  }
  if (focus === 3) {
    // Orbit underneath the stack to show hexagonal thermal wicking channels capturing body heat
    return {
      position: [1.5, -gap - 0.58, 2.05],
      target: [0, -gap - 0.04, 0],
      readout: 'OPTICAL LOCK: L03 // TRICOT HEX-BAFFLE MATRIX (SUB-STACK)',
    };
  }
  // Default centered full 3-layer exploded overview stack
  return {
    position: [2.75, 1.35, 3.75],
    target: [0, -0.04, 0],
    readout: 'OPTICAL LOCK: FULL 3-LAYER EXPLODED STACK',
  };
}


