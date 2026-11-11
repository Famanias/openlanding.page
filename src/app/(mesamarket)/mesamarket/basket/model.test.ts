import { describe, it, expect } from 'vitest';
import {
  INITIAL_BASKET_STATE,
  PRODUCE_CATALOG,
  MEAL_KIT_PRESETS,
  basketReducer,
  calculateBasketTotals,
  BasketState,
} from './model';

describe('Mesa Market basket model', () => {
  it('initializes with default basket items', () => {
    expect(INITIAL_BASKET_STATE.quantities.tomato).toBe(1);
    expect(INITIAL_BASKET_STATE.quantities.bread).toBe(1);
    const totals = calculateBasketTotals(INITIAL_BASKET_STATE.quantities);
    expect(totals.totalCount).toBe(2);
    expect(totals.sampleSubtotal).toBe(14.0); // 5.5 + 8.5
  });

  it('adds produce and updates count and announcement', () => {
    let state: BasketState = INITIAL_BASKET_STATE;
    state = basketReducer(state, { type: 'ADD', productId: 'lemon' });
    expect(state.quantities.lemon).toBe(1);
    expect(state.lastAnnouncement).toContain('Added Meyer Orchard Lemons');

    state = basketReducer(state, { type: 'ADD', productId: 'lemon' });
    expect(state.quantities.lemon).toBe(2);
  });

  it('respects maxQty limits', () => {
    let state: BasketState = { quantities: { bread: 4 }, lastAnnouncement: '' };
    const bread = PRODUCE_CATALOG.find((p) => p.id === 'bread')!;
    expect(bread.maxQty).toBe(4);

    state = basketReducer(state, { type: 'ADD', productId: 'bread' });
    expect(state.quantities.bread).toBe(4);
    expect(state.lastAnnouncement).toContain('Maximum sample limit (4) reached');
  });

  it('decrements and removes items when reaching 0', () => {
    let state: BasketState = { quantities: { apple: 2 }, lastAnnouncement: '' };
    state = basketReducer(state, { type: 'DECREMENT', productId: 'apple' });
    expect(state.quantities.apple).toBe(1);

    state = basketReducer(state, { type: 'DECREMENT', productId: 'apple' });
    expect(state.quantities.apple).toBeUndefined();
    expect(state.lastAnnouncement).toContain('Removed Pink Pearl & Gravenstein Apples');
  });

  it('removes item directly', () => {
    let state: BasketState = { quantities: { tomato: 3, kale: 1 }, lastAnnouncement: '' };
    state = basketReducer(state, { type: 'REMOVE', productId: 'tomato' });
    expect(state.quantities.tomato).toBeUndefined();
    expect(state.quantities.kale).toBe(1);
  });

  it('clears all items from basket', () => {
    let state: BasketState = { quantities: { tomato: 2, bread: 1, kale: 3 }, lastAnnouncement: '' };
    state = basketReducer(state, { type: 'CLEAR' });
    expect(state.quantities).toEqual({});
    const totals = calculateBasketTotals(state.quantities);
    expect(totals.totalCount).toBe(0);
    expect(totals.sampleSubtotal).toBe(0);
    expect(totals.lines).toHaveLength(0);
  });

  it('adds full meal kits atomically', () => {
    let state: BasketState = { quantities: {}, lastAnnouncement: '' };
    const kit = MEAL_KIT_PRESETS[0]; // sheet-pan-ratatouille
    state = basketReducer(state, { type: 'ADD_KIT', kitId: kit.id });
    for (const item of kit.items) {
      expect(state.quantities[item.productId]).toBe(item.qty);
    }
    const totals = calculateBasketTotals(state.quantities);
    expect(totals.totalCount).toBe(5);
    expect(totals.sampleSubtotal).toBeGreaterThan(0);
  });
});
