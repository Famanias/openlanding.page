export type BagLine = { sku: string; size: string; qty: number };
export type Bag = { lines: BagLine[] };
export type BagAction = { type: "add" | "remove"; sku: string; size: string };

export const EMPTY_BAG: Bag = { lines: [] };

export function bagReducer(bag: Bag, action: BagAction): Bag {
  const index = bag.lines.findIndex((line) => line.sku === action.sku && line.size === action.size);
  if (action.type === "add") {
    if (index === -1) return { lines: [...bag.lines, { sku: action.sku, size: action.size, qty: 1 }] };
    return { lines: bag.lines.map((line, i) => (i === index ? { ...line, qty: line.qty + 1 } : line)) };
  }
  if (index === -1) return bag;
  const line = bag.lines[index];
  if (line.qty <= 1) return { lines: bag.lines.filter((_, i) => i !== index) };
  return { lines: bag.lines.map((l, i) => (i === index ? { ...l, qty: l.qty - 1 } : l)) };
}

export const bagCount = (bag: Bag) => bag.lines.reduce((sum, line) => sum + line.qty, 0);

export function bagSubtotal(bag: Bag, prices: Record<string, number>): number {
  return bag.lines.reduce((sum, line) => sum + (prices[line.sku] ?? 0) * line.qty, 0);
}

export const formatGBP = (amount: number) => `£${amount.toLocaleString("en-GB")}`;
