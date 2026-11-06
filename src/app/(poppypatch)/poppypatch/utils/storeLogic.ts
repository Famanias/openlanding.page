import { JournalArticle, JournalCategory, MushroomKit } from '../data/poppyPatchData';

export interface BagItem {
  kit: MushroomKit;
  quantity: number;
}

export interface BagSummary {
  totalItems: number;
  subtotal: number;
  freeShippingThreshold: number;
  amountToFreeShipping: number;
  qualifiesForFreeShipping: boolean;
  shippingEstimate: number;
  grandTotal: number;
}

export const FREE_SHIPPING_THRESHOLD = 55;
export const STANDARD_SHIPPING_FEE = 7;

export function updateBagItems(
  currentItems: BagItem[],
  kit: MushroomKit,
  delta: number
): BagItem[] {
  const existingIndex = currentItems.findIndex((item) => item.kit.id === kit.id);

  if (existingIndex === -1) {
    if (delta <= 0) return [...currentItems];
    return [...currentItems, { kit, quantity: delta }];
  }

  const nextQuantity = currentItems[existingIndex].quantity + delta;
  if (nextQuantity <= 0) {
    return currentItems.filter((item) => item.kit.id !== kit.id);
  }

  return currentItems.map((item, idx) =>
    idx === existingIndex ? { ...item, quantity: nextQuantity } : item
  );
}

export function calculateBagSummary(items: BagItem[]): BagSummary {
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce(
    (acc, item) => acc + item.kit.price * item.quantity,
    0
  );
  const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingEstimate =
    totalItems === 0 ? 0 : qualifiesForFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const grandTotal = subtotal + shippingEstimate;

  return {
    totalItems,
    subtotal,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    amountToFreeShipping,
    qualifiesForFreeShipping,
    shippingEstimate,
    grandTotal
  };
}

export function filterJournalArticles(
  articles: JournalArticle[],
  activeCategory: 'All' | JournalCategory
): JournalArticle[] {
  if (activeCategory === 'All') {
    return articles;
  }
  return articles.filter((article) => article.category === activeCategory);
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  normalizedEmail?: string;
}

export function validateNewsletterEmail(rawEmail: string): ValidationResult {
  const trimmed = rawEmail.trim();
  if (!trimmed) {
    return {
      valid: false,
      error: 'Please enter your email address so we know where to send your growing notes.'
    };
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailPattern.test(trimmed)) {
    return {
      valid: false,
      error: 'Please enter a complete email address (like clara@kitchenpatch.com).'
    };
  }

  return {
    valid: true,
    normalizedEmail: trimmed.toLowerCase()
  };
}

export interface HarvestConditionEstimate {
  pinningDays: string;
  harvestWindowDays: string;
  capTextureNote: string;
  careRecommendation: string;
}

export function estimateCountertopConditions(
  roomTempF: number,
  mistsPerDay: 1 | 2 | 3
): HarvestConditionEstimate {
  const isCool = roomTempF < 64;
  const isWarm = roomTempF > 74;

  let pinningDays = 'Days 5–7';
  let harvestWindowDays = '10–14 days (typical)';

  if (isCool) {
    pinningDays = 'Days 7–10';
    harvestWindowDays = '14–18 days (cooler room pace)';
  } else if (isWarm) {
    pinningDays = 'Days 4–6';
    harvestWindowDays = '9–12 days (warmer room pace)';
  }

  let capTextureNote = 'Plump, velvety caps with supple ruffled margins';
  let careRecommendation =
    'Your room conditions are right in the cozy countertop sweet spot! Keep misting morning and evening.';

  if (mistsPerDay === 1) {
    capTextureNote = 'Slightly lighter caps that may crinkle at the outer rim if air is dry';
    careRecommendation =
      'With once-daily misting, tuck the box away from drafts and add an evening spritz once pins appear.';
  } else if (mistsPerDay === 3 && !isWarm) {
    capTextureNote = 'Extra-lush, dewy bouquets with deep coral and pearl coloring';
    careRecommendation =
      'Great for winter heating or air-conditioned homes—just make sure water never pools inside the bag.';
  } else if (isWarm && mistsPerDay < 3) {
    capTextureNote = 'Fast-expanding fans that drink moisture quickly';
    careRecommendation =
      'Warmer kitchens evaporate mist faster; consider 3 light spritzes daily and harvest before caps flatten.';
  }

  return {
    pinningDays,
    harvestWindowDays,
    capTextureNote,
    careRecommendation
  };
}
