import { describe, it, expect } from 'vitest';
import { PRODUCTS } from '../data/products';
import {
  calculateBiometricFit,
  calculateBundleTelemetry,
  calculateCartTotals,
  convertCurrency,
  filterAndSortProducts,
  formatPrice,
  getAuxPlaneTransform,
  getCameraPoseForZone,
  getFabricCameraPose,
  getFabricLayerOpacities,
  getFabricSlabGap,
  getVariantSku,
  verifyNfcChipCode,
} from './storeLogic';

describe('Synapxe Store Logic', () => {
  it('currency conversion and formatting works for USD, JPY, and EUR', () => {
    expect(convertCurrency(680, 'USD')).toBe(680);
    expect(convertCurrency(680, 'JPY')).toBe(104720);
    expect(convertCurrency(680, 'EUR')).toBe(626);
    expect(formatPrice(680, 'USD')).toBe('$680');
    expect(formatPrice(680, 'JPY')).toBe('¥104,720');
    expect(formatPrice(680, 'EUR')).toBe('€626');
  });

  it('filterAndSortProducts filters by category and sorts accurately', () => {
    const shells = filterAndSortProducts(PRODUCTS, 'shells', 'PRICE: LOW-HIGH');
    expect(shells).toHaveLength(3);
    expect(shells[0].code).toBe('VST-03C');
    expect(shells[2].code).toBe('JKT-02B');

    const lightestAll = filterAndSortProducts(PRODUCTS, 'all', 'WEIGHT: LIGHTEST');
    expect(lightestAll).toHaveLength(10);
    expect(lightestAll[0].code).toBe('ACC-10B'); // 210g
    expect(lightestAll[9].code).toBe('BAG-08B'); // 1120g
  });

  it('calculateBundleTelemetry computes total mass and 15% discount', () => {
    const shell = PRODUCTS[0]; // JKT-01A, $680, 640g
    const bottom = PRODUCTS[3]; // PNT-04A, $420, 510g
    const gear = PRODUCTS[6]; // BAG-07A, $290, 430g

    const telemetry = calculateBundleTelemetry(shell, bottom, gear);
    expect(telemetry.totalMassGrams).toBe(1580);
    expect(telemetry.totalMassKg).toBe('1.58');
    expect(telemetry.baseSubtotalUsd).toBe(1390);
    expect(telemetry.discountAmountUsd).toBe(208.5);
    expect(telemetry.finalBundlePriceUsd).toBe(1181.5);
  });

  it('calculateBiometricFit recommends S, M, L, XL across biometric ranges', () => {
    const smallFit = calculateBiometricFit(162, 54, 88, 'ARTICULATED TACTICAL');
    expect(smallFit.recommendedSize).toBe('S');

    const largeFit = calculateBiometricFit(183, 80, 106, 'ARTICULATED TACTICAL');
    expect(largeFit.recommendedSize).toBe('L');
    expect(largeFit.summaryText).toBe(
      'RECOMMENDED SPEC: SIZE L // CHEST 114CM // SLEEVE 89CM'
    );

    const xlFit = calculateBiometricFit(195, 98, 115, 'OVERSIZED SHELL');
    expect(xlFit.recommendedSize).toBe('XL');
  });

  it('calculateCartTotals applies bundle discount, promo code, and free shipping threshold', () => {
    const cart = [
      {
        key: '1-L-STEALTH BLACK-bundle',
        product: PRODUCTS[0], // $680, 640g
        size: 'L' as const,
        colorway: 'STEALTH BLACK' as const,
        quantity: 1,
        isBundleDiscounted: true,
      },
      {
        key: '4-L-STEALTH BLACK-std',
        product: PRODUCTS[3], // $420, 510g
        size: 'L' as const,
        colorway: 'STEALTH BLACK' as const,
        quantity: 1,
        isBundleDiscounted: false,
      },
    ];

    const totals = calculateCartTotals(cart, 'CYBER26');
    expect(totals.itemCount).toBe(2);
    expect(totals.totalWeightGrams).toBe(1150);
    expect(totals.rawSubtotalUsd).toBe(1100);
    expect(totals.bundleDiscountUsd).toBe(102); // 15% of 680
    // After bundle: 1100 - 102 = 998. Promo 10% of 998 = 99.80
    expect(totals.promoDiscountUsd).toBe(99.8);
    expect(totals.finalTotalUsd).toBe(898.2);
    expect(totals.isFreeShippingUnlocked).toBe(true);
    expect(totals.freeShippingProgressPct).toBe(100);
  });

  it('verifyNfcChipCode authenticates valid archive codes and getVariantSku formats SKU', () => {
    const res1 = verifyNfcChipCode('JKT-01A', PRODUCTS);
    expect(res1.valid).toBe(true);
    expect(res1.message).toContain('AUTHENTICATED // GENUINE KINETIX ARCHIVE UNIT — BATCH FW26');

    const res2 = verifyNfcChipCode('KNX-8849', PRODUCTS);
    expect(res2.valid).toBe(true);

    expect(getVariantSku('JKT-01A', 'OXIDE SLATE', 'L')).toBe('JKT-01A-OXD-L');
  });

  it('getAuxPlaneTransform and getCameraPoseForZone return accurate 3D coordinates', () => {
    const bagTransform = getAuxPlaneTransform('BAG-07A');
    expect(bagTransform.position).toEqual([1.05, 0.65, 0.45]);
    expect(Math.abs(bagTransform.rotationY - (-12 * Math.PI) / 180)).toBeLessThan(0.0001);

    const bootTransform = getAuxPlaneTransform('FTW-09A');
    expect(bootTransform.position).toEqual([0.95, -1.55, 0.45]);
    expect(bootTransform.rotationY).toBe(0);

    const visorTransform = getAuxPlaneTransform('ACC-10B');
    expect(visorTransform.position).toEqual([-0.95, 1.25, 0.45]);

    const upperCam = getCameraPoseForZone('UPPER SHELL', 'BAG-07A');
    expect(upperCam.position).toEqual([-0.35, 0.85, 3.1]);
    expect(upperCam.target).toEqual([0, 0.8, 0]);
    expect(upperCam.readout).toBe('ZONE: UPPER SHELL // 3D LOCK');

    const lowerCam = getCameraPoseForZone('LOWER RIG', 'BAG-07A');
    expect(lowerCam.position).toEqual([0.35, -0.9, 3.1]);
    expect(lowerCam.target).toEqual([0, -0.9, 0]);
    expect(lowerCam.readout).toBe('ZONE: LOWER RIG // 3D LOCK');

    const fullCam = getCameraPoseForZone('FULL RIG', 'BAG-07A');
    expect(fullCam.position).toEqual([0, 0.0, 5.2]);
    expect(fullCam.target).toEqual([0, -0.05, 0]);
    expect(fullCam.readout).toBe('ZONE: FULL RIG // OVERVIEW');
  });

  it('getFabricSlabGap, getFabricLayerOpacities, and getFabricCameraPose compute 3D Fabric Lab state accurately', () => {
    expect(getFabricSlabGap(65)).toBe(0.6);
    expect(getFabricSlabGap(100)).toBeGreaterThan(getFabricSlabGap(0));

    expect(getFabricLayerOpacities(null)).toEqual([1.0, 1.0, 1.0]);
    expect(getFabricLayerOpacities(1)).toEqual([1.0, 0.15, 0.15]);
    expect(getFabricLayerOpacities(2)).toEqual([0.15, 1.0, 0.15]);
    expect(getFabricLayerOpacities(3)).toEqual([0.15, 0.15, 1.0]);

    const l1Pose = getFabricCameraPose(1, 65);
    expect(l1Pose.readout).toContain('L01');
    const l2Pose = getFabricCameraPose(2, 65);
    expect(l2Pose.readout).toContain('5000X');
    const l3Pose = getFabricCameraPose(3, 65);
    expect(l3Pose.readout).toContain('L03');
  });
});
