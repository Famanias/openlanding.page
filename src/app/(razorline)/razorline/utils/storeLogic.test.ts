import { describe, it, expect } from 'vitest';
import {
  addToBag,
  updateBagQuantity,
  calculateBagTotals,
  validateLaunchSignup,
  stepLookbookIndex,
  computeScrollMarqueeOffset
} from './storeLogic';
import { RL01_COLLECTION } from '../data/catalog';

describe('Razorline Store Logic', () => {
  it('addToBag adds new model + size and increments existing key deterministically', () => {
    const voltage = RL01_COLLECTION[0];
    const cobalt = RL01_COLLECTION[1];

    let bag = addToBag([], voltage, 10.5, 1);
    expect(bag).toHaveLength(1);
    expect(bag[0].key).toBe('rl01-voltage::10.5');
    expect(bag[0].quantity).toBe(1);

    // Adding same model and size increments quantity
    bag = addToBag(bag, voltage, 10.5, 2);
    expect(bag).toHaveLength(1);
    expect(bag[0].quantity).toBe(3);

    // Adding different size or model creates distinct line item
    bag = addToBag(bag, cobalt, 9.0, 1);
    expect(bag).toHaveLength(2);

    const totals = calculateBagTotals(bag);
    expect(totals.itemCount).toBe(4);
    expect(totals.subtotal).toBe(240 * 3 + 240 * 1);
  });

  it('updateBagQuantity decrements and removes line item when reaching zero', () => {
    const voltage = RL01_COLLECTION[0];
    let bag = addToBag([], voltage, 10.0, 2);
    bag = updateBagQuantity(bag, 'rl01-voltage::10.0', -1);
    expect(bag[0].quantity).toBe(1);

    bag = updateBagQuantity(bag, 'rl01-voltage::10.0', -1);
    expect(bag).toHaveLength(0);
    expect(calculateBagTotals(bag).subtotal).toBe(0);
  });

  it('validateLaunchSignup rejects empty and malformed emails and normalizes valid emails', () => {
    const emptyRes = validateLaunchSignup('   ');
    expect(emptyRes.valid).toBe(false);
    expect(emptyRes.error).toBeTruthy();

    const badRes = validateLaunchSignup('not-an-email@');
    expect(badRes.valid).toBe(false);
    expect(badRes.error).toBeTruthy();

    const okRes = validateLaunchSignup('  Runner@Razorline.Lab ');
    expect(okRes.valid).toBe(true);
    expect(okRes.error).toBeNull();
    expect(okRes.normalizedEmail).toBe('runner@razorline.lab');
  });

  it('stepLookbookIndex wraps cleanly in both directions and computeScrollMarqueeOffset stays bounded', () => {
    expect(stepLookbookIndex(0, -1, 4)).toBe(3);
    expect(stepLookbookIndex(3, 1, 4)).toBe(0);
    expect(stepLookbookIndex(1, 1, 4)).toBe(2);

    const offset0 = computeScrollMarqueeOffset(0, 300);
    expect(offset0).toBe(0);
    const offsetMid = computeScrollMarqueeOffset(500, 300);
    expect(offsetMid).toBeLessThanOrEqual(0);
    expect(offsetMid).toBeGreaterThanOrEqual(-300);
  });
});
