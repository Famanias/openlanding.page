import { ProductModel } from '../data/catalog';

export interface BagItem {
  key: string;
  modelId: string;
  name: string;
  code: string;
  colorway: string;
  size: number;
  unitPrice: number;
  quantity: number;
  image: string;
  accentHex: string;
}

export interface BagTotals {
  itemCount: number;
  subtotal: number;
  shippingLabel: string;
  total: number;
}

export interface ValidationResult {
  valid: boolean;
  error: string | null;
  normalizedEmail: string;
}

export function addToBag(
  items: BagItem[],
  model: ProductModel,
  size: number,
  quantityToAdd: number = 1
): BagItem[] {
  const safeQty = Math.max(1, Math.floor(quantityToAdd));
  const key = `${model.id}::${size.toFixed(1)}`;
  const existingIndex = items.findIndex((item) => item.key === key);

  if (existingIndex >= 0) {
    return items.map((item, idx) =>
      idx === existingIndex
        ? { ...item, quantity: Math.min(10, item.quantity + safeQty) }
        : item
    );
  }

  const nextItem: BagItem = {
    key,
    modelId: model.id,
    name: model.name,
    code: model.code,
    colorway: model.colorway,
    size,
    unitPrice: model.price,
    quantity: safeQty,
    image: model.heroImage,
    accentHex: model.accentHex
  };

  return [...items, nextItem];
}

export function updateBagQuantity(
  items: BagItem[],
  key: string,
  delta: number
): BagItem[] {
  return items
    .map((item) => {
      if (item.key !== key) return item;
      const nextQty = item.quantity + delta;
      return { ...item, quantity: Math.min(10, nextQty) };
    })
    .filter((item) => item.quantity > 0);
}

export function calculateBagTotals(items: BagItem[]): BagTotals {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  return {
    itemCount,
    subtotal,
    shippingLabel: subtotal > 0 ? 'COMPLIMENTARY EXPRESS (DEMO)' : '—',
    total: subtotal
  };
}

export function validateLaunchSignup(rawInput: string): ValidationResult {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      valid: false,
      error: 'Enter an email address to reserve RL-01 drop dispatches.',
      normalizedEmail: ''
    };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return {
      valid: false,
      error: 'Enter a valid email format (e.g., runner@razorline.lab).',
      normalizedEmail: ''
    };
  }
  return {
    valid: true,
    error: null,
    normalizedEmail: trimmed.toLowerCase()
  };
}

export function stepLookbookIndex(current: number, delta: number, total: number): number {
  if (total <= 0) return 0;
  return ((current + delta) % total + total) % total;
}

export function computeScrollMarqueeOffset(scrollY: number, maxRange: number = 360): number {
  if (!Number.isFinite(scrollY) || scrollY <= 0) return 0;
  const raw = (scrollY * 0.22) % (maxRange * 2);
  return raw <= maxRange ? -raw : -(maxRange * 2 - raw);
}
