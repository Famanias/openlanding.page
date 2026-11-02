import { describe, it, expect } from 'vitest';
import {
  updateBagItems,
  calculateBagSummary,
  filterJournalArticles,
  validateNewsletterEmail,
  estimateCountertopConditions
} from './storeLogic';
import { MUSHROOM_KITS, JOURNAL_ARTICLES } from '../data/poppyPatchData';

describe('storeLogic', () => {
  it('updateBagItems adds, increments, and removes kits accurately', () => {
    const firstSprout = MUSHROOM_KITS[0]; // $34
    const oysterParty = MUSHROOM_KITS[1]; // $48

    let bag = updateBagItems([], firstSprout, 1);
    expect(bag.length).toBe(1);
    expect(bag[0].quantity).toBe(1);

    bag = updateBagItems(bag, firstSprout, 1);
    expect(bag[0].quantity).toBe(2);

    bag = updateBagItems(bag, oysterParty, 1);
    expect(bag.length).toBe(2);

    bag = updateBagItems(bag, firstSprout, -2);
    expect(bag.length).toBe(1);
    expect(bag[0].kit.id).toBe('oyster-party');
  });

  it('calculateBagSummary computes subtotal and free shipping threshold ($55)', () => {
    const firstSprout = MUSHROOM_KITS[0]; // $34
    const singleBag = [{ kit: firstSprout, quantity: 1 }];
    const summary1 = calculateBagSummary(singleBag);

    expect(summary1.totalItems).toBe(1);
    expect(summary1.subtotal).toBe(34);
    expect(summary1.qualifiesForFreeShipping).toBe(false);
    expect(summary1.amountToFreeShipping).toBe(21);
    expect(summary1.shippingEstimate).toBe(7);
    expect(summary1.grandTotal).toBe(41);

    const doubleBag = [{ kit: firstSprout, quantity: 2 }]; // $68
    const summary2 = calculateBagSummary(doubleBag);
    expect(summary2.subtotal).toBe(68);
    expect(summary2.qualifiesForFreeShipping).toBe(true);
    expect(summary2.shippingEstimate).toBe(0);
    expect(summary2.grandTotal).toBe(68);
  });

  it('filterJournalArticles filters by category and returns all when All is selected', () => {
    const all = filterJournalArticles(JOURNAL_ARTICLES, 'All');
    expect(all.length).toBe(JOURNAL_ARTICLES.length);

    const careOnly = filterJournalArticles(JOURNAL_ARTICLES, 'Care');
    expect(careOnly.length).toBeGreaterThan(0);
    expect(careOnly.every((a) => a.category === 'Care')).toBe(true);

    const recipesOnly = filterJournalArticles(JOURNAL_ARTICLES, 'Recipes');
    expect(recipesOnly.length).toBeGreaterThan(0);
    expect(recipesOnly.every((a) => a.category === 'Recipes')).toBe(true);
  });

  it('validateNewsletterEmail rejects empty and invalid emails and normalizes valid ones', () => {
    const emptyRes = validateNewsletterEmail('   ');
    expect(emptyRes.valid).toBe(false);
    expect(emptyRes.error).toBeDefined();

    const invalidRes = validateNewsletterEmail('not-an-email');
    expect(invalidRes.valid).toBe(false);
    expect(invalidRes.error).toBeDefined();

    const validRes = validateNewsletterEmail('  Clara@PoppyPatch.org ');
    expect(validRes.valid).toBe(true);
    expect(validRes.normalizedEmail).toBe('clara@poppypatch.org');
  });

  it('estimateCountertopConditions adapts timeline to temperature and misting frequency', () => {
    const ideal = estimateCountertopConditions(68, 2);
    expect(ideal.harvestWindowDays).toBe('10–14 days (typical)');

    const cool = estimateCountertopConditions(60, 2);
    expect(cool.harvestWindowDays).toBe('14–18 days (cooler room pace)');

    const warm = estimateCountertopConditions(76, 1);
    expect(warm.harvestWindowDays).toBe('9–12 days (warmer room pace)');
  });
});
